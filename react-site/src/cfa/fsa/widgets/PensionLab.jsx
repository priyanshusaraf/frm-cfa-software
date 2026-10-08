import React, { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { fmt } from "../engine/ledger.js";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* Defined benefit pension lab. Every output is computed from the inputs:
   the obligation and plan asset roll-forwards, the funded status, the IFRS and
   US GAAP split of periodic pension cost between profit and OCI, and total
   periodic pension cost (TPPC) computed three independent ways. Defaults are
   the Pinnacle year used in the lm11-db-ifrs-vs-gaap scenario. Past service
   cost is assumed to arise at year end, so it carries no interest this year. */

const DEFAULTS = {
  pbo0: 1000, r: 5, sc: 60, psc: 50, bp: 70, al: 40,
  pa0: 900, er: 7, ar: 50, c: 80, amort: 0,
};

const FIELDS = [
  { group: "Obligation", key: "pbo0", label: "Beginning obligation (PBO)", min: 200, max: 3000, step: 10 },
  { group: "Obligation", key: "r", label: "Discount rate", min: 0.5, max: 10, step: 0.1, pct: true },
  { group: "Obligation", key: "sc", label: "Current service cost", min: 0, max: 300, step: 5 },
  { group: "Obligation", key: "psc", label: "Past service cost (amendment at year end)", min: 0, max: 300, step: 5 },
  { group: "Obligation", key: "al", label: "Actuarial loss (negative = gain)", min: -200, max: 200, step: 5 },
  { group: "Obligation", key: "bp", label: "Benefits paid by the plan", min: 0, max: 300, step: 5 },
  { group: "Plan assets", key: "pa0", label: "Beginning plan assets", min: 0, max: 3000, step: 10 },
  { group: "Plan assets", key: "ar", label: "Actual return on plan assets", min: -300, max: 300, step: 5 },
  { group: "Plan assets", key: "c", label: "Employer contributions", min: 0, max: 400, step: 5 },
  { group: "US GAAP only", key: "er", label: "Expected return on plan assets", min: 0, max: 12, step: 0.1, pct: true },
  { group: "US GAAP only", key: "amort", label: "Amortization out of AOCI (prior service cost, corridor excess)", min: 0, max: 100, step: 1 },
];

function compute(x) {
  const r = x.r / 100, er = x.er / 100;
  const ic = r * x.pbo0;
  const pbo1 = x.pbo0 + x.sc + ic + x.psc + x.al - x.bp;
  const pa1 = x.pa0 + x.ar + x.c - x.bp;
  const fs0 = x.pa0 - x.pbo0, fs1 = pa1 - pbo1;
  const intInc = r * x.pa0;
  const netInt = r * (x.pbo0 - x.pa0);
  const expRet = er * x.pa0;
  const ifrsPL = x.sc + x.psc + netInt;
  const ifrsOCI = x.al - (x.ar - intInc);
  const gaapPL = x.sc + ic - expRet + x.amort;
  const gaapOCI = x.al + (expRet - x.ar) + x.psc - x.amort;
  const tppcCash = x.c - (fs1 - fs0);
  const tppcComp = x.sc + ic + x.psc + x.al - x.ar;
  return { ic, pbo1, pa1, fs0, fs1, intInc, netInt, expRet, ifrsPL, ifrsOCI, gaapPL, gaapOCI, tppcCash, tppcComp };
}

function Num({ v, dp }) {
  const t = useTween(v, 550);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{fmt(t, dp != null ? { dp } : { dp: Math.abs(v - Math.round(v)) < 0.005 ? 0 : 1 })}</span>;
}

/* A horizontal waterfall: each row is a floating bar from the running total
   before the item to the running total after it. Positions animate with a
   CSS transition, so dragging a slider makes the bars glide. */
function Waterfall({ title, rows, scale, motion }) {
  const tr = motion ? "left .5s cubic-bezier(.3,.7,.2,1), width .5s cubic-bezier(.3,.7,.2,1), background-color .3s" : "none";
  return (
    <div style={{ flex: "1 1 300px", minWidth: 0 }}>
      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.35rem" }}>{title}</div>
      {rows.map((row, i) => {
        const a = Math.min(row.from, row.to), b = Math.max(row.from, row.to);
        const left = Math.max(0, (a / scale) * 100);
        const width = Math.max(row.total ? 0.6 : 0.3, ((b - Math.max(0, a)) / scale) * 100);
        const color = row.total ? "var(--accent)" : row.tone === "up" ? "var(--green)" : "var(--red)";
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(7.5rem, 40%) 1fr 4.2rem", gap: "0.45rem", alignItems: "center", padding: "0.16rem 0", fontSize: "0.8rem", borderTop: row.total && i > 0 ? "1px solid var(--border)" : "none" }}>
            <span style={{ color: row.total ? "var(--text)" : "var(--text-dim)", fontWeight: row.total ? 650 : 400 }}>{row.label}</span>
            <span style={{ position: "relative", height: "0.95rem", background: "var(--bg-inset)", borderRadius: 4, overflow: "hidden" }}>
              <span
                style={{
                  position: "absolute", top: 0, bottom: 0, left: left + "%", width: Math.min(100 - left, width) + "%",
                  background: "color-mix(in srgb, " + color + " " + (row.total ? 75 : 60) + "%, transparent)",
                  borderRadius: 3, transition: tr,
                }}
              />
            </span>
            <span style={{ textAlign: "right", color: row.total ? "var(--text)" : color, fontWeight: row.total ? 650 : 500 }}>
              {!row.total && (row.delta >= 0 ? "+" : "")}<Num v={row.total ? row.to : row.delta} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function PensionLab() {
  const [x, setX] = useState(DEFAULTS);
  const motion = useMemo(() => !prefersReducedMotion(), []);
  const k = useMemo(() => compute(x), [x]);
  const set = (key, val) => {
    const n = parseFloat(val);
    if (Number.isFinite(n)) setX((p) => ({ ...p, [key]: n }));
  };

  const pboRows = [];
  let run = x.pbo0;
  pboRows.push({ label: "Beginning obligation", from: 0, to: run, total: true });
  [["Current service cost", x.sc], ["Interest cost (r x PBO)", k.ic], ["Past service cost", x.psc], [x.al >= 0 ? "Actuarial loss" : "Actuarial gain", x.al], ["Benefits paid", -x.bp]].forEach(([label, d]) => {
    pboRows.push({ label, from: run, to: run + d, delta: d, tone: d >= 0 ? "down" : "up" });
    run += d;
  });
  pboRows.push({ label: "Ending obligation", from: 0, to: run, total: true });

  const paRows = [];
  let run2 = x.pa0;
  paRows.push({ label: "Beginning plan assets", from: 0, to: run2, total: true });
  [["Actual return", x.ar], ["Employer contributions", x.c], ["Benefits paid", -x.bp]].forEach(([label, d]) => {
    paRows.push({ label, from: run2, to: run2 + d, delta: d, tone: d >= 0 ? "up" : "down" });
    run2 += d;
  });
  paRows.push({ label: "Ending plan assets", from: 0, to: run2, total: true });

  const scale = Math.max(1, ...pboRows.map((r) => Math.max(r.from, r.to)), ...paRows.map((r) => Math.max(r.from, r.to))) * 1.04;

  const ifrsTot = k.ifrsPL + k.ifrsOCI, gaapTot = k.gaapPL + k.gaapOCI;
  const tol = 0.01;
  const allTie = Math.abs(k.tppcCash - k.tppcComp) < tol && Math.abs(ifrsTot - k.tppcCash) < tol && Math.abs(gaapTot - k.tppcCash) < tol;

  const cell = (v) => (v == null ? <span style={{ color: "var(--text-faint)" }}>-</span> : <Num v={v} />);
  const split = [
    ["Current service cost", x.sc, null, x.sc, null],
    ["Past service cost", x.psc, null, null, x.psc],
    ["IFRS net interest: r x (PBO - plan assets)", k.netInt, null, null, null],
    ["US GAAP interest cost: r x PBO", null, null, k.ic, null],
    ["US GAAP expected return on plan assets", null, null, -k.expRet, null],
    ["Actuarial loss (gain)", null, x.al, null, x.al],
    ["Return on assets vs benchmark (IFRS: interest income, US GAAP: expected)", null, k.intInc - x.ar, null, k.expRet - x.ar],
    ["US GAAP amortization out of AOCI", null, null, x.amort, -x.amort],
  ];

  const groups = [...new Set(FIELDS.map((f) => f.group))];

  return (
    <div className="fsa-theater" style={{ padding: "1rem 1.1rem" }}>
      <div className="fsa-th-std">Interactive lab</div>
      <h3 style={{ margin: "0.15rem 0 0.3rem", fontSize: "1.12rem" }}>Pension lab: one year of a defined benefit plan</h3>
      <p className="fsa-th-sum" style={{ margin: "0 0 0.8rem" }}>
        Drag any assumption. The obligation and plan assets roll forward, the funded status updates, and the year's cost is split between profit and other comprehensive income (OCI) under each standard. Positive cost numbers are expenses. Watch the bottom panel: however you set the inputs, total periodic pension cost comes out the same three ways and under both standards. The standards only move the cost between profit and OCI.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "0.6rem 1.1rem", marginBottom: "1rem" }}>
        {groups.map((g) => (
          <div key={g} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.7rem", background: "var(--bg)" }}>
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-faint)", fontWeight: 650, marginBottom: "0.3rem" }}>{g}</div>
            {FIELDS.filter((f) => f.group === g).map((f) => (
              <label key={f.key} style={{ display: "block", fontSize: "0.78rem", color: "var(--text-dim)", margin: "0.35rem 0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                  <span>{f.label}</span>
                  <b style={{ fontFamily: "var(--mono)", color: "var(--text)", whiteSpace: "nowrap" }}>{f.pct ? x[f.key].toFixed(1) + "%" : fmt(x[f.key])}</b>
                </span>
                <input
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={x[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                  aria-label={f.label}
                />
              </label>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", marginBottom: "0.9rem" }}>
        <Waterfall title="Obligation roll-forward (red raises what Pinnacle owes)" rows={pboRows} scale={scale} motion={motion} />
        <Waterfall title="Plan asset roll-forward" rows={paRows} scale={scale} motion={motion} />
      </div>

      <div className="fsa-ratios" style={{ marginTop: 0 }}>
        <table>
          <thead>
            <tr><th>Funded status</th><th>Beginning</th><th>Ending</th></tr>
          </thead>
          <tbody>
            <tr><td>Plan assets - obligation</td><td><Num v={k.fs0} /></td><td className={k.fs1 >= k.fs0 ? "up" : "down"}><Num v={k.fs1} /></td></tr>
            <tr>
              <td>On the balance sheet</td>
              <td>{k.fs0 < 0 ? "Net liability " : "Net asset "}<Num v={Math.abs(k.fs0)} /></td>
              <td>{k.fs1 < 0 ? "Net liability " : "Net asset "}<Num v={Math.abs(k.fs1)} /></td>
            </tr>
          </tbody>
        </table>
      </div>
      {k.fs1 > 0 && (
        <div className="fsa-callout tone-gaap" style={{ marginTop: "0.6rem" }}>
          <b>IFRS asset ceiling</b>
          The plan is in surplus. Under IFRS the net pension asset is capped at the asset ceiling: the present value of refunds or reductions in future contributions available to Pinnacle. US GAAP has no ceiling.
        </div>
      )}

      <div className="fsa-ratios">
        <table>
          <thead>
            <tr><th>Component of the year's cost</th><th>IFRS profit</th><th>IFRS OCI</th><th>US GAAP profit</th><th>US GAAP OCI</th></tr>
          </thead>
          <tbody>
            {split.map((row, i) => (
              <tr key={i}><td style={{ whiteSpace: "normal" }}>{row[0]}</td>{row.slice(1).map((v, j) => <td key={j}>{cell(v)}</td>)}</tr>
            ))}
            <tr style={{ fontWeight: 700 }}>
              <td>Total</td><td><Num v={k.ifrsPL} /></td><td><Num v={k.ifrsOCI} /></td><td><Num v={k.gaapPL} /></td><td><Num v={k.gaapOCI} /></td>
            </tr>
            <tr style={{ fontWeight: 700 }}>
              <td>Profit + OCI</td><td colSpan={2} style={{ textAlign: "center" }}><Num v={ifrsTot} /></td><td colSpan={2} style={{ textAlign: "center" }}><Num v={gaapTot} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "0.9rem", padding: "0.75rem 0.9rem", borderRadius: "var(--radius-sm)",
          border: "1px solid " + (allTie ? "var(--green)" : "var(--red)"),
          background: allTie ? "var(--green-soft)" : "var(--red-soft)", transition: motion ? "background-color .4s, border-color .4s" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: "0.88rem", color: allTie ? "var(--green)" : "var(--red)" }}>
          {allTie ? <CheckCircle2 size={16} /> : <XCircle size={16} />} Total periodic pension cost reconciles
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--text)", marginTop: "0.35rem", lineHeight: 1.7 }}>
          <div>From cash: contributions - change in funded status = <Num v={x.c} /> - (<Num v={k.fs1} /> - <Num v={k.fs0} />) = <b><Num v={k.tppcCash} /></b></div>
          <div>From components: service cost + interest cost + past service cost + actuarial loss - actual return = <b><Num v={k.tppcComp} /></b></div>
          <div>IFRS profit + OCI = <b><Num v={ifrsTot} /></b>; US GAAP profit + OCI = <b><Num v={gaapTot} /></b></div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>
          Try it: raise the expected return. US GAAP profit improves, US GAAP OCI worsens by the same amount, and nothing else moves.
        </span>
        <button type="button" className="fsa-btn" onClick={() => setX(DEFAULTS)}><RotateCcw size={14} /> Reset to Pinnacle</button>
      </div>
    </div>
  );
}
