import React, { useMemo, useState } from "react";
import { RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* Share-based compensation forecast lab (lm11, LOS c). Every output is
   computed from the inputs: a five-year forecast of share-based compensation
   (SBC) expense, the restricted stock unit (RSU) award roll-forward, the
   unrecognized compensation cost, basic shares and treasury stock method
   diluted shares, then the per-share value under the two consistent DCF
   treatments and the inconsistent mix. Defaults reproduce the Pinnacle demo in
   content/lm11.js: year 1 SBC 400, basic 1,002, diluted 1,015.5; values per
   share 39.74 (cash expense), 39.77 (add back, more shares), 46.31 (mix).

   Modeling simplifications, stated so nothing looks like a rule: revenue and
   the share price grow at the same rate from year 2; forfeited units remove
   half their grant value from unrecognized cost (forfeited mid-vesting);
   free cash flow before SBC is a fixed 30% of revenue; the terminal value
   grows at 3% after year 5. */

const FIXED = { rev1: 10000, margin: 0.3, wacc: 0.09, gT: 0.03, netDebt: 3000, basic0: 1000, unvested0: 30 };
const DEFAULTS = { g: 3, s: 4, grant: 12, forf: 2, settle: 10, P0: 40, unrec0: 600, buyback: 8 };

const FIELDS = [
  { group: "Expense drivers", key: "g", label: "Revenue growth from year 2", min: -5, max: 30, step: 0.5, pct: true },
  { group: "Expense drivers", key: "s", label: "SBC as % of revenue", min: 0, max: 20, step: 0.25, pct: true },
  { group: "Award activity (millions of units a year)", key: "grant", label: "RSUs granted", min: 0, max: 40, step: 1 },
  { group: "Award activity (millions of units a year)", key: "forf", label: "RSUs forfeited", min: 0, max: 10, step: 0.5 },
  { group: "Award activity (millions of units a year)", key: "settle", label: "RSUs vested and settled", min: 0, max: 40, step: 1 },
  { group: "Shares and price", key: "P0", label: "Share price today", min: 10, max: 100, step: 1 },
  { group: "Shares and price", key: "unrec0", label: "Unrecognized compensation cost today", min: 0, max: 2000, step: 20 },
  { group: "Shares and price", key: "buyback", label: "Shares repurchased a year (millions)", min: 0, max: 40, step: 1 },
];

function pv(flows, w, gT) {
  let v = 0;
  flows.forEach((cf, i) => { v += cf / Math.pow(1 + w, i + 1); });
  const last = flows[flows.length - 1];
  return v + (last * (1 + gT)) / (w - gT) / Math.pow(1 + w, flows.length);
}

function compute(x) {
  const g = x.g / 100, s = x.s / 100;
  const rows = [];
  let U = FIXED.unvested0, unrec = x.unrec0, B = FIXED.basic0;
  for (let t = 1; t <= 5; t++) {
    const rev = FIXED.rev1 * Math.pow(1 + g, t - 1);
    const price = x.P0 * Math.pow(1 + g, t - 1);
    const sbc = s * rev;
    const forf = Math.min(x.forf, U + x.grant);
    const settle = Math.min(x.settle, U + x.grant - forf);
    const Uend = U + x.grant - forf - settle;
    const unrecEnd = Math.max(0, unrec + x.grant * price - sbc - forf * price * 0.5);
    const Bend = Math.max(1, B + settle - x.buyback);
    const avgB = (B + Bend) / 2, avgU = (U + Uend) / 2, avgUnrec = (unrec + unrecEnd) / 2;
    const tsm = avgUnrec / price;
    const diluted = avgB + Math.max(0, avgU - tsm);
    rows.push({ t, rev, price, sbc, grant: x.grant, forf, settle, Uend, unrecEnd, Bend, tsm, diluted, buybackCash: x.buyback * price, fcfAdd: FIXED.margin * rev, fcfCash: FIXED.margin * rev - sbc });
    U = Uend; unrec = unrecEnd; B = Bend;
  }
  const ev1 = pv(rows.map((r) => r.fcfCash), FIXED.wacc, FIXED.gT);
  const ev2 = pv(rows.map((r) => r.fcfAdd), FIXED.wacc, FIXED.gT);
  const pvSbc = pv(rows.map((r) => r.sbc), FIXED.wacc, FIXED.gT);
  const d0 = FIXED.basic0 + Math.max(0, FIXED.unvested0 - x.unrec0 / x.P0);
  const future = Math.max(0, pvSbc - x.unrec0) / x.P0;
  const sh2 = FIXED.basic0 + FIXED.unvested0 + future;
  const v1 = (ev1 - FIXED.netDebt) / d0;
  const v2 = (ev2 - FIXED.netDebt) / sh2;
  const vMix = (ev2 - FIXED.netDebt) / d0;
  return { rows, ev1, ev2, pvSbc, d0, future, sh2, v1, v2, vMix };
}

const num = (n, dp = 0) => (n < 0 ? "(" : "") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp }) + (n < 0 ? ")" : "");

function Tw({ v, dp = 0 }) {
  const t = useTween(v, 550);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{num(t, dp)}</span>;
}

export default function SbcForecastLab() {
  const [x, setX] = useState(DEFAULTS);
  const motion = useMemo(() => !prefersReducedMotion(), []);
  const k = useMemo(() => compute(x), [x]);
  const set = (key, val) => {
    const n = parseFloat(val);
    if (Number.isFinite(n)) setX((p) => ({ ...p, [key]: n }));
  };
  const groups = [...new Set(FIELDS.map((f) => f.group))];
  const tr = motion ? "width .55s cubic-bezier(.3,.7,.2,1), background-color .3s" : "none";

  const lines = [
    ["Revenue", (r) => r.rev, 0],
    ["SBC expense (inside operating expenses)", (r) => r.sbc, 0],
    ["RSUs granted", (r) => r.grant, 1],
    ["RSUs forfeited", (r) => -r.forf, 1],
    ["RSUs vested and settled in shares", (r) => -r.settle, 1],
    ["Unvested RSUs, end of year", (r) => r.Uend, 1],
    ["Unrecognized compensation cost, end of year", (r) => r.unrecEnd, 0],
    ["Average share price", (r) => r.price, 2],
    ["Basic shares, end of year", (r) => r.Bend, 1],
    ["TSM shares assumed repurchased", (r) => -r.tsm, 1],
    ["Diluted shares (average, TSM)", (r) => r.diluted, 1],
    ["Cash spent on repurchases (financing)", (r) => -r.buybackCash, 0],
  ];

  const vals = [
    { label: "Treatment 1: SBC as a cash expense", sub: "FCF after SBC; today's diluted shares " + num(k.d0, 1), v: k.v1, tone: "var(--green)" },
    { label: "Treatment 2: add back SBC, count more shares", sub: "FCF before SBC; basic + all unvested + " + num(k.future, 1) + " future-award shares", v: k.v2, tone: "var(--purple)" },
    { label: "Inconsistent mix: add back, today's diluted shares", sub: "Charges for the employees' slice nowhere", v: k.vMix, tone: "var(--red)" },
  ];
  const vmax = Math.max(1, ...vals.map((v) => Math.abs(v.v)));
  const gap = k.v1 !== 0 ? Math.abs(k.v2 / k.v1 - 1) : 0;
  const mixOver = k.v1 !== 0 ? k.vMix / k.v1 - 1 : 0;

  return (
    <div className="fsa-theater" style={{ padding: "1rem 1.1rem" }}>
      <div className="fsa-th-std">Interactive lab</div>
      <h3 style={{ margin: "0.15rem 0 0.3rem", fontSize: "1.12rem" }}>Share-based pay forecast lab: expense, shares, and value per share</h3>
      <p className="fsa-th-sum" style={{ margin: "0 0 0.8rem" }}>
        Pinnacle's five-year model, in millions. Set the drivers: the lab forecasts share-based compensation (SBC) as a percentage of revenue, rolls the restricted stock units (RSUs) forward, builds basic shares and treasury stock method (TSM) diluted shares, then values a share three ways. The two consistent treatments land close together whenever the model's value is near today's share price, and the gap explains itself below; the inconsistent mix is wrong by construction.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.6rem 1.1rem", marginBottom: "0.6rem" }}>
        {groups.map((gname) => (
          <div key={gname} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.7rem", background: "var(--bg)" }}>
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-faint)", fontWeight: 650, marginBottom: "0.3rem" }}>{gname}</div>
            {FIELDS.filter((f) => f.group === gname).map((f) => (
              <label key={f.key} style={{ display: "block", fontSize: "0.78rem", color: "var(--text-dim)", margin: "0.35rem 0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                  <span>{f.label}</span>
                  <b style={{ fontFamily: "var(--mono)", color: "var(--text)", whiteSpace: "nowrap" }}>{f.pct ? x[f.key].toFixed(2) + "%" : num(x[f.key], f.step < 1 ? 1 : 0)}</b>
                </span>
                <input type="range" min={f.min} max={f.max} step={f.step} value={x[f.key]} onChange={(e) => set(f.key, e.target.value)} style={{ width: "100%", accentColor: "var(--accent)" }} aria-label={f.label} />
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="fsa-dim" style={{ fontSize: "0.76rem", marginBottom: "0.9rem" }}>
        Held fixed: year 1 revenue 10,000; free cash flow before SBC 30% of revenue; weighted average cost of capital 9%; growth after year 5 of 3%; net debt 3,000; today 1,000 basic shares and 30 unvested RSUs. Share price grows with revenue. Forfeited units are assumed lost halfway through vesting.
      </div>

      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.35rem" }}>Five-year forecast</div>
      <div className="fsa-ratios" style={{ marginTop: 0 }}>
        <table>
          <thead>
            <tr><th>Line</th>{k.rows.map((r) => <th key={r.t}>Year {r.t}</th>)}</tr>
          </thead>
          <tbody>
            {lines.map(([label, fn, dp]) => (
              <tr key={label} style={label.startsWith("Diluted") || label.startsWith("SBC expense") ? { fontWeight: 700 } : undefined}>
                <td style={{ whiteSpace: "normal" }}>{label}</td>
                {k.rows.map((r) => <td key={r.t}><Tw v={fn(r)} dp={dp} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fsa-dim" style={{ fontSize: "0.76rem", margin: "0.35rem 0 1rem" }}>
        Basic shares: beginning + vested - repurchased. Diluted shares: average basic + average unvested - average unrecognized cost / average price (never below basic). Only vested units become shares, and RSU vesting brings in no cash; the repurchases are where the dilution turns into cash.
      </div>

      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.45rem" }}>Value per share</div>
      <div style={{ display: "grid", gap: "0.45rem" }}>
        {vals.map((v) => (
          <div key={v.label} style={{ display: "grid", gridTemplateColumns: "minmax(9rem, 38%) 1fr 4.6rem", gap: "0.6rem", alignItems: "center", fontSize: "0.8rem" }}>
            <span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>{v.label}</span>
              <span style={{ display: "block", color: "var(--text-faint)", fontSize: "0.72rem" }}>{v.sub}</span>
            </span>
            <span style={{ position: "relative", height: "1rem", background: "var(--bg-inset)", borderRadius: 4, overflow: "hidden" }}>
              <span style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: Math.max(0, (v.v / vmax) * 100) + "%", background: "color-mix(in srgb, " + v.tone + " 60%, transparent)", borderRadius: 3, transition: tr }} />
            </span>
            <b style={{ textAlign: "right", color: v.tone }}><Tw v={v.v} dp={2} /></b>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "0.9rem", padding: "0.7rem 0.9rem", borderRadius: "var(--radius-sm)",
          border: "1px solid " + (gap < 0.02 ? "var(--green)" : "var(--amber)"),
          background: gap < 0.02 ? "var(--green-soft)" : "var(--amber-soft)",
          transition: motion ? "background-color .4s, border-color .4s" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: "0.86rem", color: gap < 0.02 ? "var(--green)" : "var(--amber)" }}>
          {gap < 0.02 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />} The two consistent treatments differ by <Tw v={gap * 100} dp={1} />%
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text)", marginTop: "0.3rem", lineHeight: 1.6 }}>
          Present value of all future SBC: <Tw v={k.pvSbc} />. Treatment 2 converts that, less the <Tw v={x.unrec0} /> already tied to today's unvested units, into shares at today's price. The gap widens when the model's value moves far from the share price, because Treatment 2 always lands between the two. The inconsistent mix overstates Treatment 1 by <b><Tw v={mixOver * 100} dp={1} />%</b>.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>
          Try it: push SBC to 10% of revenue. Treatments 1 and 2 both fall, one through the cash flows and one through the share count; the inconsistent mix does not move at all, which is exactly the error.
        </span>
        <button type="button" className="fsa-btn" onClick={() => setX(DEFAULTS)}><RotateCcw size={14} /> Reset to Pinnacle</button>
      </div>
    </div>
  );
}
