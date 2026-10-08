import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, CheckCircle2, XCircle, Gauge } from "lucide-react";
import Html from "../../../components/Html.jsx";
import { runScenario, checksFor, fmt, lineKeyForPosting, ratioCtx, fmtRatio } from "../engine/ledger.js";
import { buildLayout, postingDisplayDelta } from "../engine/layout.js";
import Statements from "./Statements.jsx";
import { flyChip, sleep, prefersReducedMotion } from "./motion.js";

/* The Statement Theater: steps through a scenario one journal entry at a time.

   Animation contract for a forward step (idx -> idx + 1):
     1. the event card swaps in;
     2. each posting chip flies from its journal row to the statement line it
        hits, and only THAT line switches to its new value when the chip lands;
     3. once every posting has landed, the subtotals, net income, retained
        earnings and totals settle together and the integrity checks run.
   Any other navigation (back, jump, restart) settles instantly. A token ref
   cancels a sequence that is still in flight when the student moves on. */

const SPEEDS = [0.5, 1, 1.5, 2];

function JournalTable({ colId, label, postings, accMap, activePost, note, multi }) {
  return (
    <div className="fsa-je">
      {multi && <div className="fsa-je-col">{label}</div>}
      {postings.length === 0 ? (
        <div className="fsa-je-none">No journal entry in this column.</div>
      ) : (
        <table>
          <tbody>
            {postings.map((p, i) => {
              const acc = accMap[p.a] || {};
              const isCr = (p.cr || 0) > 0;
              const where = acc.cash ? p.cf : acc.type === "revenue" || acc.type === "expense" ? "IS" : acc.type === "oci" ? "OCI" : acc.type === "nci" ? "IS" : acc.type === "dividend" ? "Equity" : "BS";
              return (
                <tr key={i} data-post={colId + ":" + i} className={(isCr ? "cr" : "dr") + (activePost === colId + ":" + i ? " is-active" : "")}>
                  <td className="fsa-je-acct">
                    <span className="fsa-je-side">{isCr ? "Cr" : "Dr"}</span>
                    {acc.label || p.a}
                    <span className="fsa-je-where">{where}</span>
                  </td>
                  <td className="fsa-je-amt">{isCr ? "" : fmt(p.dr)}</td>
                  <td className="fsa-je-amt">{isCr ? fmt(p.cr) : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {note && <Html className="fsa-je-note" html={note} />}
    </div>
  );
}

function Memo({ memo }) {
  if (!memo) return null;
  return (
    <div className="fsa-memo">
      <div className="fsa-memo-t">{memo.title}</div>
      <table>
        <tbody>
          {memo.rows.map((r, i) => (
            <tr key={i} className={i === memo.rows.length - 1 ? "last" : ""}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Theater({ scenario, compact }) {
  const run = useMemo(() => runScenario(scenario), [scenario]);
  const layout = useMemo(() => buildLayout(run), [run]);
  const steps = scenario.steps || [];
  const last = steps.length;
  const single = run.columns.length === 1;
  const mainId = run.columns[0].id;

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("settled");
  const [landed, setLanded] = useState(() => new Set());
  const [activePost, setActivePost] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const rootRef = useRef(null);
  const tokenRef = useRef(0);

  const goTo = useCallback((n, animate) => {
    const target = Math.max(0, Math.min(last, n));
    tokenRef.current++;
    setActivePost(null);
    setLanded(new Set());
    setIdx(target);
    setPhase(animate && target > 0 && !prefersReducedMotion() ? "posting" : "settled");
  }, [last]);

  /* the flight sequence */
  useEffect(() => {
    if (phase !== "posting") return;
    const token = tokenRef.current;
    const step = steps[idx - 1];
    const root = rootRef.current;
    let cancelled = false;
    (async () => {
      await sleep(420 / speed);
      const perCol = run.base.map(async (c) => {
        const ps = run.entriesFor(step, c.id);
        for (let i = 0; i < ps.length; i++) {
          if (cancelled || token !== tokenRef.current) return;
          const p = ps[i];
          const acc = run.accMap[p.a];
          const targets = [lineKeyForPosting(p, run.accMap)];
          if (acc && acc.cash) targets.push("CF:" + p.cf + "|" + p.l);
          setActivePost(c.id + ":" + i);
          const d = postingDisplayDelta(p, acc);
          const from = root && root.querySelector('[data-post="' + c.id + ":" + i + '"]');
          await Promise.all(targets.map((t) => {
            const to = root && root.querySelector('[data-cell="' + c.id + "|" + t + '"] .fsa-num-v');
            return flyChip(from, to, (d >= 0 ? "+" : "-") + fmt(Math.abs(d)), d >= 0 ? "up" : "down", 680 / speed);
          }));
          if (cancelled || token !== tokenRef.current) return;
          setLanded((prev) => {
            const next = new Set(prev);
            targets.forEach((t) => next.add(c.id + "|" + t));
            return next;
          });
          await sleep(140 / speed);
        }
      });
      await Promise.all(perCol);
      if (cancelled || token !== tokenRef.current) return;
      setActivePost(null);
      await sleep(180 / speed);
      if (token === tokenRef.current) setPhase("settled");
    })();
    return () => { cancelled = true; };
  }, [phase, idx, run, steps, speed]);

  /* autoplay waits for each step to settle, then lingers long enough to read */
  useEffect(() => {
    if (!playing || phase !== "settled") return;
    if (idx >= last) { setPlaying(false); return; }
    const t = setTimeout(() => goTo(idx + 1, true), (idx === 0 ? 900 : 3200) / speed);
    return () => clearTimeout(t);
  }, [playing, phase, idx, last, speed, goTo]);

  const snap = run.snaps[idx];
  const prevSnap = idx > 0 ? run.snaps[idx - 1] : null;
  const value = (colId, key) => {
    if (colId === "__start") return run.snaps[0].cols[mainId].flat[key] || 0;
    const now = snap.cols[colId].flat[key] || 0;
    if (phase === "posting" && prevSnap) {
      return landed.has(colId + "|" + key) ? now : prevSnap.cols[colId].flat[key] || 0;
    }
    return now;
  };
  const delta = (colId, key) => {
    if (colId === "__start" || idx === 0) return null;
    if (phase === "posting" && !landed.has(colId + "|" + key)) return null;
    return run.deltas[idx][colId][key] ?? null;
  };
  const hit = (colId, key) => delta(colId, key) != null;

  const cols = single ? [{ id: mainId, label: "Now" }] : run.columns.map((c) => ({ id: c.id, label: c.label, sub: c.sub }));
  const bsCols = single ? [{ id: "__start", label: "Start", ghost: true }, { id: mainId, label: "Now" }] : null;

  const step = idx > 0 ? steps[idx - 1] : null;
  const checks = useMemo(() => {
    const out = {};
    run.columns.forEach((c) => {
      const ps = step && !c.sumOf ? run.entriesFor(step, c.id) : null;
      out[c.id] = checksFor(snap.cols[c.id].stmts, ps && ps.length ? ps : null);
    });
    return out;
  }, [run, snap, step]);
  const checkIds = ["drcr", "ale", "cash"];
  const checkLabels = { drcr: "Debits = credits", ale: "Assets = liabilities + equity", cash: "Cash flow ties to cash" };

  const onKey = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); goTo(idx + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); goTo(idx - 1, false); }
  };

  const multi = !single;
  const period = snap.cols[mainId].period;

  return (
    <div className={"fsa-theater" + (compact ? " is-compact" : "")} ref={rootRef} tabIndex={0} onKeyDown={onKey} aria-label={"Animated scenario: " + scenario.title}>
      <header className="fsa-th-head">
        <div>
          {scenario.standard && <div className="fsa-th-std">{scenario.standard}</div>}
          <h3>{scenario.title}</h3>
          {scenario.summary && <Html className="fsa-th-sum" html={scenario.summary} />}
        </div>
      </header>

      <div className="fsa-th-controls">
        <div className="fsa-th-btns">
          <button type="button" className="fsa-btn" onClick={() => { setPlaying(false); goTo(0, false); }} title="Restart"><RotateCcw size={15} /></button>
          <button type="button" className="fsa-btn" onClick={() => { setPlaying(false); goTo(idx - 1, false); }} disabled={idx === 0} title="Previous step (Left arrow)"><ChevronLeft size={16} /></button>
          <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => {
            if (playing) { setPlaying(false); return; }
            if (idx >= last) goTo(0, false);
            setPlaying(true);
          }}>
            {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : idx >= last ? "Replay" : "Play"}
          </button>
          <button type="button" className="fsa-btn" onClick={() => { setPlaying(false); goTo(idx + 1, true); }} disabled={idx >= last} title="Next step (Right arrow)">Next <ChevronRight size={16} /></button>
        </div>
        <ol className="fsa-th-steps">
          {[{ title: "Opening balances" }, ...steps].map((s, i) => (
            <li key={i}>
              <button
                type="button"
                className={"fsa-dot" + (i === idx ? " is-on" : "") + (i < idx ? " is-past" : "")}
                onClick={() => { setPlaying(false); goTo(i, i === idx + 1); }}
                title={i === 0 ? "Opening balances" : "Step " + i + ": " + s.title}
              >
                {i === 0 ? "0" : i}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="fsa-btn fsa-speed" onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])} title="Animation speed">
          <Gauge size={14} /> {speed}x
        </button>
      </div>

      <div className="fsa-th-body">
        <aside className="fsa-th-event" key={idx}>
          <div className="fsa-th-stepno">{idx === 0 ? "Before anything happens" : "Step " + idx + " of " + last}</div>
          <h4>{idx === 0 ? "Opening balance sheet" : step.title}</h4>
          {idx === 0 ? (
            <p className="fsa-dim">
              This is where every column starts. Press Play, or Next, and follow each journal line as it lands on the statements.
              Use the arrow keys when this panel has focus.
            </p>
          ) : (
            <>
              <Html className="fsa-th-text" html={step.html} />
              <Memo memo={step.memo} />
              <div className="fsa-je-wrap">
                <div className="fsa-je-h">Journal entry</div>
                {run.base.map((c) => (
                  <JournalTable
                    key={c.id}
                    colId={c.id}
                    label={c.label}
                    multi={multi}
                    postings={run.entriesFor(step, c.id)}
                    accMap={run.accMap}
                    activePost={activePost}
                    note={step.notes && step.notes[c.id]}
                  />
                ))}
                {step.close && <div className="fsa-je-none">Closing entries: income statement to retained earnings, OCI to accumulated OCI.</div>}
              </div>
              {step.insight && (
                <div className="fsa-callout tone-insight"><b>What to notice</b><Html html={step.insight} /></div>
              )}
              {step.exam && (
                <div className="fsa-callout tone-exam"><b>Exam angle</b><Html html={step.exam} /></div>
              )}
            </>
          )}
        </aside>

        <div className="fsa-th-main">
          <Statements
            layout={layout}
            cols={cols}
            bsCols={bsCols}
            value={value}
            delta={delta}
            hit={hit}
            show={scenario.show || {}}
            period={period}
          />
          <div className={"fsa-checks" + (phase === "settled" ? " is-in" : "")}>
            {checkIds.map((id) => {
              const rows = run.columns.map((c) => ({ c, ck: (checks[c.id] || []).find((x) => x.id === id) })).filter((r) => r.ck);
              if (!rows.length) return null;
              const ok = rows.every((r) => r.ck.ok);
              return (
                <div key={id} className={"fsa-check " + (ok ? "ok" : "bad")} title={rows.map((r) => (multi ? r.c.label + ": " : "") + r.ck.detail).join("\n")}>
                  {ok ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                  <span>{checkLabels[id]}</span>
                  {!multi && <small>{rows[0].ck.detail}</small>}
                </div>
              );
            })}
          </div>
          {scenario.ratios && scenario.ratios.length > 0 && (
            <div className="fsa-ratios">
              <table>
                <thead>
                  <tr>
                    <th>Analyst view</th>
                    {run.columns.map((c) => <th key={c.id}>{single ? "Now" : c.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {scenario.ratios.map((r, i) => (
                    <tr key={i}>
                      <td>{r.label}</td>
                      {run.columns.map((c) => {
                        let v = null, pv = null;
                        try { v = r.fn(ratioCtx(snap.cols[c.id], run.accMap)); } catch { v = null; }
                        try { pv = prevSnap ? r.fn(ratioCtx(prevSnap.cols[c.id], run.accMap)) : null; } catch { pv = null; }
                        const moved = phase === "settled" && pv != null && v != null && Number.isFinite(v) && Number.isFinite(pv) && Math.abs(v - pv) > 1e-9;
                        return (
                          <td key={c.id} className={moved ? (v > pv ? "up" : "down") : ""}>
                            {fmtRatio(phase === "posting" && pv != null ? pv : v, r.fmt)}
                            {moved && <span className="fsa-ratio-arrow">{v > pv ? "▲" : "▼"}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
