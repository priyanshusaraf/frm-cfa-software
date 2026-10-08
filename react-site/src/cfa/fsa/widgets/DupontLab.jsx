import React, { useMemo, useState } from "react";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* DupontLab: Pinnacle Corp's five-factor DuPont decomposition over four
   years, as reported and with the 30% associate (Kestrel) stripped out.
   Only the raw inputs below are typed in; every factor, ROE, product check,
   attribution and sentence of commentary is computed from them. */

const TAX_RATE = 0.25;
const YEARS = [
  { y: "20X1", rev: 10000, ebit: 1200, int: 100, ei: 150, avgTA: 12000, avgInv: 1500, avgEq: 6000 },
  { y: "20X2", rev: 10300, ebit: 1190, int: 110, ei: 230, avgTA: 12500, avgInv: 1750, avgEq: 6150 },
  { y: "20X3", rev: 10600, ebit: 1160, int: 120, ei: 310, avgTA: 12900, avgInv: 2000, avgEq: 6250 },
  { y: "20X4", rev: 10800, ebit: 1130, int: 130, ei: 380, avgTA: 13300, avgInv: 2250, avgEq: 6350 },
];

const FACTORS = [
  { k: "tb", label: "Tax burden", sub: "NI / EBT", kind: "x", ref1: true },
  { k: "ib", label: "Interest burden", sub: "EBT / EBIT", kind: "x", ref1: true },
  { k: "m", label: "EBIT margin", sub: "EBIT / revenue", kind: "pct" },
  { k: "at", label: "Asset turnover", sub: "revenue / avg assets", kind: "x" },
  { k: "lev", label: "Leverage", sub: "avg assets / avg equity", kind: "x" },
];

/* Kestrel's profit arrives already taxed, so Pinnacle's tax is on its own
   pretax profit only; removing the associate therefore leaves tax unchanged. */
function compute(d, ex) {
  const tax = TAX_RATE * (d.ebit - d.int);
  const ebt = d.ebit - d.int + (ex ? 0 : d.ei);
  const ni = ebt - tax;
  const ta = d.avgTA - (ex ? d.avgInv : 0);
  const eq = d.avgEq - (ex ? d.avgInv : 0);
  const f = { tb: ni / ebt, ib: ebt / d.ebit, m: d.ebit / d.rev, at: d.rev / ta, lev: ta / eq };
  return { y: d.y, d, tax, ebt, ni, ta, eq, f, roe: ni / eq, prod: f.tb * f.ib * f.m * f.at * f.lev };
}

const fx = (v, kind, dp) => (kind === "pct" ? (v * 100).toFixed(dp == null ? 1 : dp) + "%" : v.toFixed(dp == null ? 3 : dp));
const pp = (v) => (v >= 0 ? "+" : "-") + Math.abs(v * 100).toFixed(2) + " pp";
const n0 = (v) => Math.round(v).toLocaleString("en-US");

function TweenNum({ value, kind, dp }) {
  const v = useTween(value, 600);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{fx(v, kind, dp)}</span>;
}

/* Contribution of each factor to the change in ROE. Log changes add up to the
   log change in ROE exactly; scaling by the logarithmic mean of the two ROEs
   turns them into percentage points that add up to the ROE change exactly. */
function attribution(a, b) {
  const dRoe = b.roe - a.roe;
  const lnTot = Math.log(b.roe / a.roe);
  const L = Math.abs(lnTot) < 1e-12 ? b.roe : dRoe / lnTot;
  const parts = FACTORS.map((F) => ({ ...F, c: L * Math.log(b.f[F.k] / a.f[F.k]), from: a.f[F.k], to: b.f[F.k] }));
  const top = parts.reduce((m, p) => (Math.abs(p.c) > Math.abs(m.c) ? p : m), parts[0]);
  return { dRoe, parts, top, sum: parts.reduce((s, p) => s + p.c, 0) };
}

const panel = { border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.6rem 0.7rem 0.5rem" };
const tiny = { fontSize: "0.7rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 };

function MiniBars({ title, sub, kind, ref1, values, ghost, color, scaleMax }) {
  const reduced = prefersReducedMotion();
  const H = 96;
  return (
    <div style={panel}>
      <div style={{ fontWeight: 650, fontSize: "0.86rem" }}>{title}</div>
      <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginBottom: "0.4rem" }}>{sub}</div>
      <div style={{ position: "relative", height: H, display: "grid", gridTemplateColumns: "repeat(" + values.length + ", 1fr)", gap: "0.35rem", alignItems: "end", borderBottom: "1px solid var(--border-strong)" }}>
        {ref1 && (
          <div title="1.0: above this line, something is ADDING income" style={{ position: "absolute", left: 0, right: 0, bottom: (1 / scaleMax) * H, borderTop: "1px dashed var(--amber)", pointerEvents: "none" }}>
            <span style={{ position: "absolute", right: 0, top: -14, fontSize: "0.6rem", color: "var(--amber)", fontFamily: "var(--mono)" }}>1.0</span>
          </div>
        )}
        {values.map((v, i) => {
          const over = ref1 && v.val > 1;
          const g = ghost ? ghost[i] : null;
          return (
            <div key={v.y} style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              {g != null && (
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "8%", right: "8%", bottom: 0, height: (g / scaleMax) * H, border: "1px dashed var(--text-faint)", borderBottom: "none", borderRadius: "3px 3px 0 0", transition: reduced ? "none" : "height .6s cubic-bezier(.3,.7,.2,1)" }}
                />
              )}
              <div
                style={{
                  width: "70%",
                  height: Math.max(1, (v.val / scaleMax) * H),
                  background: over ? "var(--amber)" : color,
                  opacity: 0.85,
                  borderRadius: "3px 3px 0 0",
                  transition: reduced ? "none" : "height .6s cubic-bezier(.3,.7,.2,1), background-color .4s",
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + values.length + ", 1fr)", gap: "0.35rem", marginTop: "0.25rem", textAlign: "center" }}>
        {values.map((v) => (
          <div key={v.y} style={{ fontSize: "0.72rem", lineHeight: 1.25 }}>
            <TweenNum value={v.val} kind={kind} dp={kind === "pct" ? 2 : 3} />
            <div style={{ color: "var(--text-faint)", fontSize: "0.64rem" }}>{v.y}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DupontLab() {
  const [ex, setEx] = useState(false);
  const [pair, setPair] = useState([0, 3]);
  const [showInputs, setShowInputs] = useState(false);

  const rep = useMemo(() => YEARS.map((d) => compute(d, false)), []);
  const core = useMemo(() => YEARS.map((d) => compute(d, true)), []);
  const rows = ex ? core : rep;

  /* One fixed scale per factor across BOTH views, so toggling moves the bars
     honestly instead of rescaling them. */
  const scale = useMemo(() => {
    const s = {};
    [...FACTORS, { k: "roe" }].forEach((F) => {
      const all = [...rep, ...core].map((r) => (F.k === "roe" ? r.roe : r.f[F.k]));
      s[F.k] = Math.max(...all, F.ref1 ? 1 : 0) * 1.08;
    });
    return s;
  }, [rep, core]);

  const att = attribution(rows[pair[0]], rows[pair[1]]);
  const r0 = rep[0], r3 = rep[rep.length - 1], c0 = core[0], c3 = core[core.length - 1];
  const assocRet = YEARS.map((d) => d.ei / d.avgInv);
  const pairs = [[0, 1], [1, 2], [2, 3], [0, 3]];

  return (
    <div className="fsa-theater" style={{ marginTop: "1.2rem" }}>
      <div className="fsa-th-head">
        <div className="fsa-th-std">Interactive lab</div>
        <h3>Pinnacle's ROE, factor by factor</h3>
        <div className="fsa-th-sum">
          Five factors that multiply back to ROE, for four years. Toggle the associate out and watch which bars move. Dashed outlines show the as-reported value, so you can see exactly what the associate was adding.
        </div>
      </div>

      <div className="fsa-th-controls" role="group" aria-label="View">
        <div className="fsa-th-btns">
          <button type="button" className={"fsa-btn" + (!ex ? " fsa-btn-primary" : "")} aria-pressed={!ex} onClick={() => setEx(false)}>As reported</button>
          <button type="button" className={"fsa-btn" + (ex ? " fsa-btn-primary" : "")} aria-pressed={ex} onClick={() => setEx(true)}>Exclude the associate</button>
        </div>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>
          {ex
            ? "Equity income removed from NI and EBT; investment removed from average assets and average equity; tax unchanged."
            : "Kestrel's share of profit sits between EBIT and pretax income; the investment sits in total assets."}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.6rem" }}>
        {FACTORS.map((F) => (
          <MiniBars
            key={F.k}
            title={F.label}
            sub={F.sub}
            kind={F.kind}
            ref1={F.ref1}
            values={rows.map((r) => ({ y: r.y, val: r.f[F.k] }))}
            ghost={ex ? rep.map((r) => r.f[F.k]) : null}
            color={ex ? "var(--purple)" : "var(--accent)"}
            scaleMax={scale[F.k]}
          />
        ))}
        <MiniBars
          title="ROE"
          sub="product of the five"
          kind="pct"
          values={rows.map((r) => ({ y: r.y, val: r.roe }))}
          ghost={ex ? rep.map((r) => r.roe) : null}
          color="var(--green)"
          scaleMax={scale.roe}
        />
      </div>

      <div className="fsa-ratios">
        <table>
          <thead>
            <tr>
              <th>Reconciliation</th>
              <th>Tax burden</th>
              <th>× Interest burden</th>
              <th>× EBIT margin</th>
              <th>× Asset turnover</th>
              <th>× Leverage</th>
              <th>= Product</th>
              <th>NI / avg equity</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const ok = Math.abs(r.prod - r.roe) < 1e-9;
              return (
                <tr key={r.y}>
                  <td>{r.y}</td>
                  <td><TweenNum value={r.f.tb} kind="x" /></td>
                  <td><TweenNum value={r.f.ib} kind="x" /></td>
                  <td><TweenNum value={r.f.m} kind="pct" dp={2} /></td>
                  <td><TweenNum value={r.f.at} kind="x" /></td>
                  <td><TweenNum value={r.f.lev} kind="x" /></td>
                  <td><TweenNum value={r.prod} kind="pct" dp={2} /></td>
                  <td>{n0(r.ni)} / {n0(r.eq)} = <TweenNum value={r.roe} kind="pct" dp={2} /></td>
                  <td className={ok ? "up" : "down"}>{ok ? "ties" : "off"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ ...panel, marginTop: "0.9rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
          <span style={tiny}>What drove the change in ROE?</span>
          {pairs.map((p) => {
            const on = p[0] === pair[0] && p[1] === pair[1];
            return (
              <button key={p.join("-")} type="button" className={"fsa-btn" + (on ? " fsa-btn-primary" : "")} aria-pressed={on} style={{ padding: "0.25rem 0.55rem", fontSize: "0.78rem" }} onClick={() => setPair(p)}>
                {YEARS[p[0]].y} to {YEARS[p[1]].y}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: "0.86rem", marginBottom: "0.5rem" }}>
          ROE {fx(rows[pair[0]].roe, "pct", 2)} to {fx(rows[pair[1]].roe, "pct", 2)} ({pp(att.dRoe)}). Largest mover: <b>{att.top.label}</b>, {fx(att.top.from, att.top.kind, att.top.kind === "pct" ? 2 : 3)} to {fx(att.top.to, att.top.kind, att.top.kind === "pct" ? 2 : 3)}, worth {pp(att.top.c)} of ROE.
        </div>
        {(() => {
          const maxAbs = Math.max(...att.parts.map((p) => Math.abs(p.c)), 1e-9);
          return att.parts.map((p) => {
            const w = (Math.abs(p.c) / maxAbs) * 50;
            const pos = p.c >= 0;
            const isTop = p.k === att.top.k;
            return (
              <div key={p.k} style={{ display: "grid", gridTemplateColumns: "8.5rem minmax(0,1fr) 5.5rem", alignItems: "center", gap: "0.5rem", margin: "0.22rem 0", fontSize: "0.8rem" }}>
                <span style={{ fontWeight: isTop ? 700 : 400 }}>{p.label}</span>
                <div style={{ position: "relative", height: 14, background: "var(--bg-inset)", borderRadius: 3 }}>
                  <div style={{ position: "absolute", left: "50%", top: -2, bottom: -2, borderLeft: "1px solid var(--border-strong)" }} />
                  <div
                    style={{
                      position: "absolute", top: 2, bottom: 2,
                      left: pos ? "50%" : 50 - w + "%",
                      width: w + "%",
                      background: pos ? "var(--green)" : "var(--red)",
                      opacity: isTop ? 1 : 0.6,
                      borderRadius: 2,
                      transition: prefersReducedMotion() ? "none" : "left .6s cubic-bezier(.3,.7,.2,1), width .6s cubic-bezier(.3,.7,.2,1)",
                    }}
                  />
                </div>
                <span style={{ fontFamily: "var(--mono)", textAlign: "right", color: pos ? "var(--green)" : "var(--red)" }}>{pp(p.c)}</span>
              </div>
            );
          });
        })()}
        <div style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginTop: "0.4rem" }}>
          Each factor's share is its log change times the logarithmic mean of the two ROEs, so the shares add up exactly: sum {pp(att.sum)}, change in ROE {pp(att.dRoe)}.
        </div>
      </div>

      <div className={"fsa-callout " + (ex ? "tone-exam" : "tone-trap")} style={{ marginTop: "0.9rem", maxWidth: "none" }}>
        <b>{ex ? "What the operating business is doing" : "What the reported numbers seem to say"}</b>
        {ex ? (
          <p>
            Without Kestrel the tax burden is flat at {fx(c0.f.tb, "x")} (one minus the {fx(TAX_RATE, "pct", 0)} tax rate) and the interest burden sits below 1.0, sliding from {fx(c0.f.ib, "x")} to {fx(c3.f.ib, "x")}. The EBIT margin fell from {fx(c0.f.m, "pct", 2)} to {fx(c3.f.m, "pct", 2)}, and leverage rising from {fx(c0.f.lev, "x")} to {fx(c3.f.lev, "x")}, with a smaller lift from asset turnover ({fx(c0.f.at, "x")} to {fx(c3.f.at, "x")}), held core ROE at {fx(c0.roe, "pct", 2)} to {fx(c3.roe, "pct", 2)}. Every point of the reported ROE improvement came from the associate, whose return on its carrying amount rose from {fx(assocRet[0], "pct", 1)} to {fx(assocRet[assocRet.length - 1], "pct", 1)}.
          </p>
        ) : (
          <p>
            Reported ROE rose from {fx(r0.roe, "pct", 2)} to {fx(r3.roe, "pct", 2)} while the EBIT margin fell from {fx(r0.f.m, "pct", 2)} to {fx(r3.f.m, "pct", 2)}. The "improvement" came through the interest burden ({fx(r0.f.ib, "x")} to {fx(r3.f.ib, "x")}, above 1.0 although Pinnacle pays interest every year) and the tax burden ({fx(r0.f.tb, "x")} to {fx(r3.f.tb, "x")}). Both are Kestrel's already-taxed profit, sitting between EBIT and pretax income. Toggle it out.
          </p>
        )}
      </div>

      <div style={{ marginTop: "0.6rem" }}>
        <button type="button" className="fsa-link" aria-expanded={showInputs} onClick={() => setShowInputs((s) => !s)}>
          {showInputs ? "Hide" : "Show"} the inputs and the {ex ? "adjusted" : "reported"} income lines
        </button>
        {showInputs && (
          <div className="fsa-ratios">
            <table>
              <thead>
                <tr>
                  <th>{ex ? "Excluding the associate" : "As reported"}</th>
                  {rows.map((r) => <th key={r.y}>{r.y}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Revenue", (r) => r.d.rev],
                  ["EBIT", (r) => r.d.ebit],
                  ["Interest expense", (r) => r.d.int],
                  ["Share of profit of associate", (r) => (ex ? 0 : r.d.ei)],
                  ["Pretax income (EBT)", (r) => r.ebt],
                  ["Income tax (" + fx(TAX_RATE, "pct", 0) + " of EBIT less interest)", (r) => r.tax],
                  ["Net income", (r) => r.ni],
                  ["Average total assets", (r) => r.ta],
                  ["Average equity", (r) => r.eq],
                  ["Average investment in associate (removed: " + (ex ? "yes" : "no") + ")", (r) => r.d.avgInv],
                ].map(([label, get]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    {rows.map((r) => <td key={r.y}>{n0(get(r))}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
