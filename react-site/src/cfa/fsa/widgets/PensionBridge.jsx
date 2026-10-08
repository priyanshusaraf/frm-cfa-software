import React, { useMemo, useState } from "react";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* Enterprise value to equity value bridge with pensions (lm11, LOS e). Every
   number is computed: free cash flow after service cost (and, only if the
   student asks for the mistake, after net interest too), a growing-perpetuity
   enterprise value, then debt, cash, the underfunded plan's deficit (pre-tax
   or after tax) and, only as a mistake, the overfunded plan's surplus.
   Defaults are the Pinnacle bridge in content/lm11.js: EV 20,000, equity
   16,400 (16,550 with the deficit after 25% tax), 16.40 per share. */

const DEFAULTS = { fcfPre: 1500, sc: 100, wacc: 9, g: 2, debt: 4000, cash: 1000, deficit: 600, surplus: 200, r: 5, tax: 25, shares: 1000 };
const DEFAULT_TOGGLES = { afterTax: false, dblInt: false, addSurplus: false };

const FIELDS = [
  { group: "Free cash flow", key: "fcfPre", label: "Free cash flow before pension items", min: 200, max: 4000, step: 50 },
  { group: "Free cash flow", key: "sc", label: "Pension service cost", min: 0, max: 500, step: 10 },
  { group: "Free cash flow", key: "wacc", label: "Weighted average cost of capital", min: 5, max: 14, step: 0.25, pct: true },
  { group: "Free cash flow", key: "g", label: "Long-term growth", min: 0, max: 4, step: 0.25, pct: true },
  { group: "Bridge", key: "debt", label: "Debt", min: 0, max: 10000, step: 100 },
  { group: "Bridge", key: "cash", label: "Cash", min: 0, max: 5000, step: 100 },
  { group: "Pension plans", key: "deficit", label: "Deficit of the underfunded plan", min: 0, max: 4000, step: 50 },
  { group: "Pension plans", key: "surplus", label: "Surplus of the overfunded plan", min: 0, max: 2000, step: 50 },
  { group: "Pension plans", key: "r", label: "Discount rate (for net interest)", min: 1, max: 8, step: 0.25, pct: true },
  { group: "Pension plans", key: "tax", label: "Tax rate", min: 0, max: 40, step: 1, pct: true },
];

function compute(x, o) {
  const w = x.wacc / 100, g = x.g / 100;
  const netInt = (x.r / 100) * x.deficit;
  const fcf = x.fcfPre - x.sc - (o.dblInt ? netInt : 0);
  const fcfRight = x.fcfPre - x.sc;
  const ok = w - g > 0.0001;
  const ev = ok ? fcf / (w - g) : NaN;
  const evRight = ok ? fcfRight / (w - g) : NaN;
  const defDeduct = o.afterTax ? x.deficit * (1 - x.tax / 100) : x.deficit;
  const surplusAdd = o.addSurplus ? x.surplus : 0;
  const equity = ev - x.debt + x.cash - defDeduct + surplusAdd;
  const equityRight = evRight - x.debt + x.cash - defDeduct;
  return { netInt, fcf, ev, defDeduct, surplusAdd, equity, equityRight, perShare: equity / x.shares, perShareRight: equityRight / x.shares, ok };
}

const num = (n, dp = 0) => (!Number.isFinite(n) ? "n/a" : (n < 0 ? "(" : "") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp }) + (n < 0 ? ")" : ""));

function Tw({ v, dp = 0 }) {
  const t = useTween(Number.isFinite(v) ? v : 0, 550);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{Number.isFinite(v) ? num(t, dp) : "n/a"}</span>;
}

function Toggle({ on, onClick, children, wrong }) {
  return (
    <button
      type="button"
      className="fsa-btn"
      aria-pressed={on}
      onClick={onClick}
      style={{
        borderColor: on ? (wrong ? "var(--red)" : "var(--accent)") : "var(--border)",
        color: on ? (wrong ? "var(--red)" : "var(--accent)") : "var(--text-dim)",
        background: on ? (wrong ? "var(--red-soft)" : "var(--accent-soft)") : "transparent",
      }}
    >
      {children}
    </button>
  );
}

export default function PensionBridge() {
  const [x, setX] = useState(DEFAULTS);
  const [o, setO] = useState(DEFAULT_TOGGLES);
  const motion = useMemo(() => !prefersReducedMotion(), []);
  const k = useMemo(() => compute(x, o), [x, o]);
  const set = (key, val) => {
    const n = parseFloat(val);
    if (Number.isFinite(n)) setX((p) => ({ ...p, [key]: n }));
  };
  const flip = (key) => setO((p) => ({ ...p, [key]: !p[key] }));
  const groups = [...new Set(FIELDS.map((f) => f.group))];
  const tr = motion ? "left .55s cubic-bezier(.3,.7,.2,1), width .55s cubic-bezier(.3,.7,.2,1), background-color .3s" : "none";

  const rows = [];
  let run = k.ev;
  rows.push({ label: "Enterprise value", from: 0, to: run, total: true });
  [
    ["Less debt", -x.debt],
    ["Add cash", x.cash],
    [o.afterTax ? "Less pension deficit, after tax" : "Less pension deficit", -k.defDeduct],
    [o.addSurplus ? "Add pension surplus (the mistake)" : "Pension surplus: excluded", k.surplusAdd],
  ].forEach(([label, d]) => {
    rows.push({ label, from: run, to: run + d, delta: d });
    run += d;
  });
  rows.push({ label: "Equity value", from: 0, to: run, total: true });
  const scale = Math.max(1, ...rows.map((r) => Math.max(r.from, r.to))) * 1.04;
  const wrong = o.dblInt || o.addSurplus;

  return (
    <div className="fsa-theater" style={{ padding: "1rem 1.1rem" }}>
      <div className="fsa-th-std">Interactive lab</div>
      <h3 style={{ margin: "0.15rem 0 0.3rem", fontSize: "1.12rem" }}>Pension bridge: from enterprise value to equity value</h3>
      <p className="fsa-th-sum" style={{ margin: "0 0 0.8rem" }}>
        Pinnacle's valuation in millions. Free cash flow is charged for service cost and nothing else from the pension; the deficit comes off in the bridge as debt; the surplus stays out. Flip the two red switches to make the classic mistakes and watch what they cost.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.6rem 1.1rem", marginBottom: "0.8rem" }}>
        {groups.map((gname) => (
          <div key={gname} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.7rem", background: "var(--bg)" }}>
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-faint)", fontWeight: 650, marginBottom: "0.3rem" }}>{gname}</div>
            {FIELDS.filter((f) => f.group === gname).map((f) => (
              <label key={f.key} style={{ display: "block", fontSize: "0.78rem", color: "var(--text-dim)", margin: "0.35rem 0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                  <span>{f.label}</span>
                  <b style={{ fontFamily: "var(--mono)", color: "var(--text)", whiteSpace: "nowrap" }}>{f.pct ? x[f.key].toFixed(2) + "%" : num(x[f.key])}</b>
                </span>
                <input type="range" min={f.min} max={f.max} step={f.step} value={x[f.key]} onChange={(e) => set(f.key, e.target.value)} style={{ width: "100%", accentColor: "var(--accent)" }} aria-label={f.label} />
              </label>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.9rem" }}>
        <Toggle on={o.afterTax} onClick={() => flip("afterTax")}>Deduct the deficit after tax</Toggle>
        <Toggle on={o.dblInt} onClick={() => flip("dblInt")} wrong>Mistake: also deduct net interest from free cash flow</Toggle>
        <Toggle on={o.addSurplus} onClick={() => flip("addSurplus")} wrong>Mistake: add the surplus</Toggle>
      </div>

      <div className="fsa-ratios" style={{ marginTop: 0, marginBottom: "0.9rem" }}>
        <table>
          <tbody>
            <tr><td>Free cash flow before pension items</td><td><Tw v={x.fcfPre} /></td></tr>
            <tr><td>Less service cost (cost of future employee work)</td><td><Tw v={-x.sc} /></td></tr>
            <tr style={o.dblInt ? { background: "var(--red-soft)" } : undefined}>
              <td>Net interest on the deficit: <Tw v={x.r} dp={2} />% x <Tw v={x.deficit} /> = <Tw v={k.netInt} dp={1} /></td>
              <td>{o.dblInt ? <span style={{ color: "var(--red)" }}><Tw v={-k.netInt} dp={1} /></span> : "excluded"}</td>
            </tr>
            <tr style={{ fontWeight: 700 }}><td>Free cash flow used in the valuation</td><td><Tw v={k.fcf} dp={1} /></td></tr>
            <tr style={{ fontWeight: 700 }}><td>Enterprise value: free cash flow / (cost of capital - growth)</td><td><Tw v={k.ev} /></td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.35rem" }}>The bridge</div>
      {rows.map((row, i) => {
        const a = Math.min(row.from, row.to), b = Math.max(row.from, row.to);
        const left = Math.max(0, (a / scale) * 100);
        const width = Math.max(row.total ? 0.6 : 0.3, ((b - Math.max(0, a)) / scale) * 100);
        const color = row.total ? "var(--accent)" : row.delta > 0 ? "var(--green)" : row.delta < 0 ? "var(--red)" : "var(--text-faint)";
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(8rem, 38%) 1fr 4.6rem", gap: "0.45rem", alignItems: "center", padding: "0.16rem 0", fontSize: "0.8rem", borderTop: row.total && i > 0 ? "1px solid var(--border)" : "none" }}>
            <span style={{ color: row.total ? "var(--text)" : "var(--text-dim)", fontWeight: row.total ? 650 : 400 }}>{row.label}</span>
            <span style={{ position: "relative", height: "0.95rem", background: "var(--bg-inset)", borderRadius: 4, overflow: "hidden" }}>
              <span style={{ position: "absolute", top: 0, bottom: 0, left: left + "%", width: Math.min(100 - left, width) + "%", background: "color-mix(in srgb, " + color + " " + (row.total ? 75 : 60) + "%, transparent)", borderRadius: 3, transition: tr }} />
            </span>
            <span style={{ textAlign: "right", color: row.total ? "var(--text)" : color, fontWeight: row.total ? 650 : 500 }}>
              <Tw v={row.total ? row.to : row.delta} />
            </span>
          </div>
        );
      })}

      <div
        style={{
          marginTop: "0.9rem", padding: "0.7rem 0.9rem", borderRadius: "var(--radius-sm)",
          border: "1px solid " + (wrong ? "var(--red)" : "var(--green)"),
          background: wrong ? "var(--red-soft)" : "var(--green-soft)",
          transition: motion ? "background-color .4s, border-color .4s" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: "0.88rem", color: wrong ? "var(--red)" : "var(--green)" }}>
          {wrong ? <XCircle size={16} /> : <CheckCircle2 size={16} />} Value per share: <Tw v={k.perShare} dp={2} /> on <Tw v={x.shares} /> million shares
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text)", marginTop: "0.3rem", lineHeight: 1.6 }}>
          {wrong ? (
            <>
              The consistent answer is <b><Tw v={k.perShareRight} dp={2} /></b>, so the mistakes move the value by <b><Tw v={k.perShare - k.perShareRight} dp={2} /></b> a share.
              {o.dblInt && <> Deducting net interest charges for the deficit twice: once in the bridge at its present value, and again as the unwinding of that same present value.</>}
              {o.addSurplus && <> Adding the surplus counts money that sits in trust for employees and is generally not available to capital providers.</>}
            </>
          ) : (
            <>Deficit deducted {o.afterTax ? "after tax, because contributions are usually tax-deductible" : "in full, as debt"}; net interest left out of free cash flow; surplus excluded. This is the consistent treatment.</>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.8rem" }}>
        <button type="button" className="fsa-btn" onClick={() => { setX(DEFAULTS); setO(DEFAULT_TOGGLES); }}><RotateCcw size={14} /> Reset to Pinnacle</button>
      </div>
    </div>
  );
}
