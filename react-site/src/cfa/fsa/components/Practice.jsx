import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, Loader2, Star, Eye, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";
import Html from "../../../components/Html.jsx";
import { runScenario, fmt } from "../engine/ledger.js";
import { practiceSpec, gradeRound1, gradeRound2, confirmationRuns, starsFor, practiceKey } from "../engine/practice.js";
import { recordFsaPractice } from "../../../lib/store.js";
import Statements from "./Statements.jsx";
import { sleep } from "./motion.js";

/* Reconstruct the statements. Three rounds on one journal event:
     1. Where does it hit?     click every line you expect to move
     2. Post the numbers       type the new value of every line that moved
     3. Confirmation runs      the platform audits YOUR numbers: do your lines
                               foot, does your balance sheet balance, does
                               retained earnings roll, does cash tie
   Grading lives in engine/practice.js (unit-tested); this file is only UI. */

function StarRow({ n }) {
  return (
    <span className="fsa-stars" aria-label={n + " of 3 stars"}>
      {[1, 2, 3].map((i) => <Star key={i} size={18} className={i <= n ? "on" : ""} fill={i <= n ? "currentColor" : "none"} />)}
    </span>
  );
}

export default function Practice({ scenario, colId, stepIdx, onNext }) {
  const run = useMemo(() => runScenario(scenario), [scenario]);
  const col = colId || run.base[0].id;
  const spec = useMemo(() => practiceSpec(run, col, stepIdx), [run, col, stepIdx]);
  const step = scenario.steps[stepIdx - 1];
  const colMeta = run.columns.find((c) => c.id === col);

  const [round, setRound] = useState(1);
  const [picks, setPicks] = useState(() => new Set());
  const [g1, setG1] = useState(null);
  const [inputs, setInputs] = useState({});
  const [g2, setG2] = useState(null);
  const [tries, setTries] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const [runs, setRuns] = useState([]);
  const [runIdx, setRunIdx] = useState(-1);
  const [stars, setStars] = useState(null);

  useEffect(() => {
    setRound(1); setPicks(new Set()); setG1(null); setInputs({}); setG2(null); setTries(0);
    setRevealed(false); setHint(false); setRuns([]); setRunIdx(-1); setStars(null);
  }, [scenario.id, col, stepIdx]);

  const togglePick = (k) => {
    if (g1) return;
    setPicks((prev) => { const n = new Set(prev); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  };

  const checkR1 = () => setG1(gradeRound1(spec, picks));
  const toR2 = () => setRound(2);

  const checkR2 = () => {
    const g = gradeRound2(spec, inputs);
    setG2(g);
    setTries((t) => t + 1);
  };
  const reveal = () => {
    const all = {};
    spec.inputKeys.forEach((k) => { all[k] = fmt(spec.after[k] || 0); });
    setInputs(all);
    setRevealed(true);
    setG2(gradeRound2(spec, all));
  };

  const startRuns = async () => {
    setRound(3);
    const rs = confirmationRuns(spec, inputs);
    setRuns(rs);
    for (let i = 0; i < rs.length; i++) { setRunIdx(i); await sleep(520); }
    setRunIdx(rs.length);
    const s = starsFor({ r1Perfect: g1 && g1.perfect, r2FirstTry: tries <= 1, hintUsed: hint, revealed });
    setStars(s);
    recordFsaPractice(practiceKey(scenario.id, col, stepIdx), s, Date.now());
  };

  const cols = [{ id: "before", label: "Before" }, { id: "after", label: round === 1 ? "After" : "After (you)" }];
  const inputSet = new Set(spec.inputKeys);

  const value = (c, k) => {
    if (c === "before") return spec.before[k] || 0;
    return spec.before[k] || 0;
  };

  const cell = (c, k) => {
    if (c !== "after") return undefined;
    if (round === 1) return <span className="fsa-num is-ghost"><span className="fsa-num-v">?</span></span>;
    if (!inputSet.has(k)) {
      /* A subtotal that moved but is not an input (total non-current assets,
         total liabilities and equity) would give the answer away, so it stays
         hidden until every input cell is green. */
      const moved = Math.abs((spec.after[k] || 0) - (spec.before[k] || 0)) > 0.005;
      const hide = moved && !(g2 && g2.allRight);
      return <span className="fsa-num is-ghost"><span className="fsa-num-v">{hide ? "?" : fmt(spec.after[k] || 0)}</span></span>;
    }
    const st = g2 && g2.res[k];
    const locked = st === "right" || revealed || round === 3;
    return (
      <input
        className={"fsa-in" + (st === "right" ? " ok" : st === "wrong" ? " bad" : st === "empty" && g2 ? " bad" : "")}
        value={inputs[k] || ""}
        inputMode="decimal"
        placeholder="?"
        disabled={locked}
        aria-label={"New value for " + k}
        onChange={(e) => { const v = e.target.value; setInputs((p) => ({ ...p, [k]: v })); }}
        onKeyDown={(e) => { if (e.key === "Enter") checkR2(); }}
      />
    );
  };

  const rowProps = (k, r) => {
    if (round !== 1 || r.kind !== "line" || !spec.candidates.includes(k)) return null;
    const res = g1 && g1.res[k];
    const cls = ["fsa-pick"];
    if (picks.has(k)) cls.push("is-picked");
    if (res) cls.push("res-" + res);
    return {
      className: cls.join(" "),
      onClick: () => togglePick(k),
      pressed: picks.has(k),
      badge: res ? <span className={"fsa-pick-badge " + res}>{res === "right" ? "moves" : res === "wrong" ? "does not move" : "missed"}</span> : null,
    };
  };

  const r2Done = g2 && g2.allRight;

  return (
    <div className="fsa-practice">
      <div className="fsa-pr-head">
        <div>
          <div className="fsa-th-std">{scenario.title}{run.columns.length > 1 ? " · " + colMeta.label : ""}</div>
          <h3>{step.prompt ? <Html as="span" html={step.prompt} /> : step.title}</h3>
          <p className="fsa-dim">
            The Before column shows the statements just before this event. {round === 1 && "Round 1: click every line you think will change, then check."}
            {round === 2 && "Round 2: type the new value of every line that moves. Totals count. Use (30) or -30 for negatives."}
            {round === 3 && "Round 3: confirmation runs. The platform audits your own numbers the way an accountant would before signing off."}
          </p>
        </div>
        <ol className="fsa-pr-rounds">
          {["Where does it hit?", "Post the numbers", "Confirmation runs"].map((t, i) => (
            <li key={i} className={round === i + 1 ? "is-on" : round > i + 1 ? "is-done" : ""}><span>{i + 1}</span>{t}</li>
          ))}
        </ol>
      </div>

      {stepIdx > 1 || scenario.summary ? (
        <details className="fsa-recall fsa-pr-context">
          <summary>Context: the company and what happened before this event</summary>
          <div>
            {scenario.summary && <Html html={scenario.summary} />}
            {stepIdx > 1 && (
              <ol className="fsa-pr-past">
                {scenario.steps.slice(0, stepIdx - 1).map((st, i) => (
                  <li key={i}>
                    {st.title}
                    {st.memo && (
                      <table className="fsa-pr-memo">
                        <tbody>{st.memo.rows.map((r, j) => <tr key={j}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody>
                      </table>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </details>
      ) : null}

      {hint && (
        <div className="fsa-callout tone-insight">
          <b>Hint: the journal entry</b>
          <ul className="fsa-hint-je">
            {run.entriesFor(step, col).map((p, i) => (
              <li key={i}>{p.cr ? "Cr" : "Dr"} {run.accMap[p.a].label} {fmt(p.dr || p.cr)}{p.cf ? " (" + p.cf + ")" : ""}</li>
            ))}
          </ul>
        </div>
      )}

      <Statements
        layout={spec.layout}
        cols={cols}
        value={value}
        cell={cell}
        rowProps={rowProps}
        show={scenario.show || {}}
      />

      <div className="fsa-pr-bar">
        {round === 1 && !g1 && (
          <>
            <span className="fsa-dim">{picks.size} line{picks.size === 1 ? "" : "s"} picked</span>
            <button type="button" className="fsa-btn fsa-btn-primary" onClick={checkR1} disabled={!picks.size}>Check my picks</button>
          </>
        )}
        {round === 1 && g1 && (
          <>
            <span className={g1.perfect ? "fsa-good" : "fsa-warn"}>
              {g1.perfect ? "Perfect. Every line that moves, and nothing else." : g1.right + " right, " + g1.errors + " to learn from. Amber rows are lines you missed."}
            </span>
            <button type="button" className="fsa-btn fsa-btn-primary" onClick={toR2}>Post the numbers <ArrowRight size={15} /></button>
          </>
        )}
        {round === 2 && (
          <>
            {!hint && !r2Done && <button type="button" className="fsa-btn" onClick={() => setHint(true)}><Lightbulb size={14} /> Show journal entry</button>}
            {!r2Done && <button type="button" className="fsa-btn" onClick={reveal}><Eye size={14} /> Reveal</button>}
            {g2 && !r2Done && <span className="fsa-warn">{spec.inputKeys.filter((k) => g2.res[k] !== "right").length} cell(s) not right yet. Fix the red ones.</span>}
            {!r2Done && <button type="button" className="fsa-btn fsa-btn-primary" onClick={checkR2}>Check numbers</button>}
            {r2Done && (
              <>
                <span className="fsa-good">{revealed ? "Answers revealed." : "Every cell is green."}</span>
                <button type="button" className="fsa-btn fsa-btn-primary" onClick={startRuns}>Run confirmations <ArrowRight size={15} /></button>
              </>
            )}
          </>
        )}
      </div>

      {round === 3 && (
        <div className="fsa-runs">
          {runs.map((r, i) => (
            <div key={r.id} className={"fsa-run" + (i < runIdx ? (r.ok ? " ok" : " bad") : i === runIdx ? " running" : " queued")}>
              {i < runIdx ? (r.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />) : i === runIdx ? <Loader2 size={16} className="spin" /> : <span className="fsa-run-dot" />}
              <span className="fsa-run-l">{r.label}</span>
              {i < runIdx && <code>{r.detail}</code>}
            </div>
          ))}
          {stars != null && (
            <div className="fsa-pr-result">
              <StarRow n={stars} />
              <div>
                <b>{revealed ? "Reviewed with the answer key. Replay it from memory for more stars." : stars === 3 ? "Clean sign-off: every line found and every number right first time." : stars === 2 ? "Signed off, with one correction." : "Signed off after corrections. Replay it for three stars."}</b>
                <Html className="fsa-th-text" html={step.html} />
                {step.insight && <div className="fsa-callout tone-insight"><b>What to notice</b><Html html={step.insight} /></div>}
              </div>
              <div className="fsa-pr-next">
                <button type="button" className="fsa-btn" onClick={() => {
                  setRound(1); setPicks(new Set()); setG1(null); setInputs({}); setG2(null); setTries(0); setRevealed(false); setHint(false); setRuns([]); setRunIdx(-1); setStars(null);
                }}><RotateCcw size={14} /> Retry</button>
                {onNext && <button type="button" className="fsa-btn fsa-btn-primary" onClick={onNext}>Next round <ArrowRight size={15} /></button>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
