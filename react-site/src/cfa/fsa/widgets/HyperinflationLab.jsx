import React, { useMemo, useState } from "react";
import { RotateCcw, Scale } from "lucide-react";
import { fmt } from "../engine/ledger.js";
import { useTween } from "../components/motion.js";

/* HyperinflationLab: one subsidiary in a hyperinflationary economy, three
   ways into US dollars.
     1. Naive current rate on unrestated local amounts (NOT permitted; shown
        so the "disappearing plant" is visible).
     2. US GAAP: highly inflationary, so the parent's currency is functional
        and the temporal method applies (remeasurement gain or loss in NI).
     3. IFRS (IAS 29): restate the local statements for inflation with a
        general price index, then translate EVERYTHING at the current rate.
   Simplifying assumptions, stated in the UI: the price index and the exchange
   rate move evenly through the year, so the average index and the average
   rate are the midpoints of the beginning and ending values. All figures are
   computed from the local data below. */

const LCU = { openCash: 200, ppe0: 1000, debt: 800, sc: 400, revenue: 1200, cashExp: 750, dep: 100 };
const S0 = 0.4;
const GPI0 = 100;

function model(infl, deval) {
  const gEnd = GPI0 * (1 + infl);
  const gAvg = (GPI0 + gEnd) / 2;
  const fE = gEnd / GPI0;
  const fA = gEnd / gAvg;
  const S1 = S0 * (1 - deval);
  const Sa = (S0 + S1) / 2;

  const cash = LCU.openCash + LCU.revenue - LCU.cashExp;
  const ppe = LCU.ppe0 - LCU.dep;
  const nmpBeg = LCU.openCash - LCU.debt;
  const flows = LCU.revenue - LCU.cashExp;

  const fin = (v) => {
    v.ta = v.cash + v.ppe;
    v.te = v.sc + v.re + (v.cta || 0);
    v.tle = v.debt + v.te;
    return v;
  };

  const naive = { cash: cash * S1, ppe: ppe * S1, debt: LCU.debt * S1, sc: LCU.sc * S0, revenue: LCU.revenue * Sa, exp: -LCU.cashExp * Sa, dep: -LCU.dep * Sa, mon: 0 };
  naive.ni = naive.revenue + naive.exp + naive.dep;
  naive.re = naive.ni;
  naive.cta = naive.cash + naive.ppe - naive.debt - naive.sc - naive.re;
  fin(naive);

  const gaap = { cash: cash * S1, ppe: ppe * S0, debt: LCU.debt * S1, sc: LCU.sc * S0, revenue: LCU.revenue * Sa, exp: -LCU.cashExp * Sa, dep: -LCU.dep * S0, cta: 0 };
  gaap.re = gaap.cash + gaap.ppe - gaap.debt - gaap.sc;
  gaap.pre = gaap.revenue + gaap.exp + gaap.dep;
  gaap.ni = gaap.re;
  gaap.mon = gaap.ni - gaap.pre;
  fin(gaap);

  const rs = { cash, ppe: ppe * fE, debt: LCU.debt, sc: LCU.sc * fE, revenue: LCU.revenue * fA, exp: -LCU.cashExp * fA, dep: -LCU.dep * fE, cta: 0 };
  rs.mon = -nmpBeg * (fE - 1) - flows * (fA - 1);
  rs.ni = rs.revenue + rs.exp + rs.dep + rs.mon;
  rs.re = rs.ni;
  fin(rs);
  const ifrs = {};
  Object.keys(rs).forEach((k) => { ifrs[k] = rs[k] * S1; });

  return { gEnd, gAvg, fE, fA, S1, Sa, cash, ppe, nmpBeg, flows, naive, gaap, rs, ifrs, local: { cash, ppe, ni: LCU.revenue - LCU.cashExp - LCU.dep } };
}

function N({ v, dp }) {
  const s = useTween(v, 550);
  const d = dp != null ? dp : Math.abs(v - Math.round(v)) < 0.005 ? 0 : 1;
  return <span className="fsa-num"><span className="fsa-num-v">{fmt(d === 0 ? Math.round(s) : s, { dp: d })}</span></span>;
}

function Bar({ label, v, max, tone }) {
  const w = Math.max(0, Math.min(100, (v / max) * 100));
  return (
    <div className="hyp-bar">
      <span className="hyp-bar-l">{label}</span>
      <span className="hyp-bar-track"><span className="hyp-bar-fill" style={{ width: w + "%", background: "var(--" + tone + ")" }} /></span>
      <span className="hyp-bar-v"><N v={v} /></span>
    </div>
  );
}

const ROWS = [
  { k: "h1", label: "Balance sheet (year end)", head: true },
  { k: "cash", label: "Cash (monetary)" },
  { k: "ppe", label: "PP&E, net (non-monetary)" },
  { k: "ta", label: "Total assets", total: true },
  { k: "debt", label: "Debt (monetary)" },
  { k: "sc", label: "Share capital" },
  { k: "re", label: "Retained earnings" },
  { k: "cta", label: "Translation adjustment (equity)" },
  { k: "tle", label: "Total liabilities and equity", total: true },
  { k: "h2", label: "Income statement", head: true },
  { k: "revenue", label: "Revenue" },
  { k: "exp", label: "Cash operating expenses" },
  { k: "dep", label: "Depreciation" },
  { k: "mon", label: "Gain (loss) on net monetary position" },
  { k: "ni", label: "Net income", total: true },
];

export default function HyperinflationLab() {
  const [infl, setInfl] = useState(1.0);
  const [deval, setDeval] = useState(0.6);
  const m = useMemo(() => model(infl, deval), [infl, deval]);
  const ppp = infl / (1 + infl);

  const cols = [
    { id: "naive", label: "No adjustment", sub: "not permitted", v: m.naive, cls: "hyp-col-bad" },
    { id: "gaap", label: "US GAAP", sub: "temporal, USD functional", v: m.gaap },
    { id: "ifrs", label: "IFRS (IAS 29)", sub: "restate, then current rate", v: m.ifrs },
  ];
  const ratios = [
    { label: "Net profit margin", fn: (v) => v.ni / v.revenue, kind: "pct" },
    { label: "Return on assets", fn: (v) => v.ni / v.ta, kind: "pct" },
    { label: "Debt to equity", fn: (v) => v.debt / v.te, kind: "x" },
  ];
  const showR = (x, kind) => (!Number.isFinite(x) ? "n/a" : kind === "pct" ? (x * 100).toFixed(1) + "%" : x.toFixed(2) + "x");
  const maxPpe = Math.max(m.naive.ppe, m.gaap.ppe, m.ifrs.ppe) * 1.05;
  const gap = deval - ppp;
  const verdict =
    Math.abs(gap) < 0.005
      ? "The currency fell exactly as much as inflation implies (purchasing power parity). Restating and then translating at the current rate lands on the SAME balance sheet as the temporal method: PP&E is worth the same in dollars either way. The income statements still differ line by line."
      : gap > 0
        ? "The currency fell FASTER than local inflation. The IFRS figure for PP&E (restated up, then translated at the collapsed rate) is below the US GAAP historical-rate figure."
        : "The currency fell SLOWER than local inflation. Restating PP&E by the price index lifts it above the US GAAP historical-rate figure.";

  return (
    <div className="fsa-theater hyp">
      <style>{CSS}</style>
      <header className="fsa-th-head">
        <div className="fsa-th-std">Hyperinflation lab: US GAAP vs IFRS</div>
        <h3>Kestrel Sur: a factory in a currency that is melting</h3>
        <p className="fsa-th-sum">
          Kestrel Sur starts the year with cash of LCU {fmt(LCU.openCash)} (local currency units), a building bought that day for LCU {fmt(LCU.ppe0)} (10-year life), debt of LCU {fmt(LCU.debt)} and share capital of LCU {fmt(LCU.sc)}.
          During the year it earns revenue of LCU {fmt(LCU.revenue)} and pays cash expenses of LCU {fmt(LCU.cashExp)}. The opening rate is USD {S0.toFixed(2)} per LCU. Push inflation and devaluation and watch what each method reports.
        </p>
      </header>

      <div className="hyp-controls">
        <label className="hyp-slider">
          <span>Local inflation this year <b>{Math.round(infl * 100)}%</b></span>
          <input type="range" min="0" max="3" step="0.05" value={infl} onChange={(e) => setInfl(parseFloat(e.target.value))} aria-label="Local inflation rate for the year" />
          <small>Price index 100 to {fmt(m.gEnd)}; average {fmt(m.gAvg)}</small>
        </label>
        <label className="hyp-slider">
          <span>Fall in the local currency <b>{Math.round(deval * 100)}%</b></span>
          <input type="range" min="0" max="0.9" step="0.01" value={deval} onChange={(e) => setDeval(parseFloat(e.target.value))} aria-label="Devaluation of the local currency against the US dollar" />
          <small>Rate {S0.toFixed(2)} to {m.S1.toFixed(3)} USD per LCU; average {m.Sa.toFixed(3)}</small>
        </label>
        <div className="hyp-btns">
          <button type="button" className="fsa-btn" onClick={() => setDeval(Math.round(ppp * 100) / 100)} title="Set the devaluation that purchasing power parity implies">
            <Scale size={14} /> Match inflation ({Math.round(ppp * 100)}%)
          </button>
          <button type="button" className="fsa-btn" onClick={() => { setInfl(1); setDeval(0.6); }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <div className="hyp-body">
        <section className="fsa-stmt">
          <table>
            <thead>
              <tr>
                <th className="fsa-stmt-title">US dollars<span className="fsa-stmt-sub">year end</span></th>
                {cols.map((c) => (
                  <th key={c.id} className={"fsa-col-h " + (c.cls || "")}><span>{c.label}</span><small>{c.sub}</small></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => r.head ? (
                <tr key={r.k} className="fsa-r-head"><td colSpan={4}>{r.label}</td></tr>
              ) : (
                <tr key={r.k} className={(r.total ? "fsa-r-total" : "fsa-r-line") + (r.k === "ppe" ? " hyp-hl" : "") + (r.k === "mon" || r.k === "cta" ? " hyp-plug" : "")}>
                  <td className="fsa-lbl">{r.label}</td>
                  {cols.map((c) => <td key={c.id} className={"fsa-val " + (c.cls || "")}><N v={c.v[r.k] || 0} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="hyp-side">
          <div className="hyp-card">
            <div className="hyp-card-t">Where did the plant go?</div>
            <Bar label="No adjustment" v={m.naive.ppe} max={maxPpe} tone="red" />
            <Bar label="US GAAP (dollars paid, depreciated)" v={m.gaap.ppe} max={maxPpe} tone="amber" />
            <Bar label="IFRS (IAS 29)" v={m.ifrs.ppe} max={maxPpe} tone="accent" />
            {deval > 0.0005 ? (
              <p>
                Translating LCU {fmt(m.ppe)} of cost at the collapsed rate shrinks the building to USD {fmt(Math.round(m.naive.ppe))}, {Math.round((1 - m.naive.ppe / m.gaap.ppe) * 100)}% below the dollars Pinnacle actually paid for it (after one year of depreciation). Nothing happened to the building: the measuring stick shrank. IFRS first restates the cost by the price index (x {m.fE.toFixed(2)}) and then translates at a rate that is {(1 - deval).toFixed(2)} times the opening rate; the two effects cancel only when the devaluation matches inflation.
              </p>
            ) : (
              <p>
                With no devaluation, the current rate equals the historical rate, so translating the unrestated cost gives the same USD {fmt(Math.round(m.gaap.ppe))} as US GAAP. IFRS still restates the cost by the price index (x {m.fE.toFixed(2)}) before translating, so it shows a larger figure.
              </p>
            )}
            <p className="hyp-verdict">{verdict}</p>
          </div>

          <div className="hyp-card">
            <div className="hyp-card-t">IFRS step 1: restate in local currency (index 100 to {fmt(m.gEnd)})</div>
            <table className="hyp-mini"><tbody>
              <tr><td>Cash: monetary, not restated</td><td>{fmt(Math.round(m.rs.cash))}</td></tr>
              <tr><td>PP&amp;E: {fmt(m.ppe)} x {m.fE.toFixed(2)}</td><td>{fmt(Math.round(m.rs.ppe))}</td></tr>
              <tr><td>Share capital: {fmt(LCU.sc)} x {m.fE.toFixed(2)}</td><td>{fmt(Math.round(m.rs.sc))}</td></tr>
              <tr><td>Revenue: {fmt(LCU.revenue)} x {fmt(m.gEnd)}/{fmt(m.gAvg)}</td><td>{fmt(m.rs.revenue, { dp: 1 })}</td></tr>
              <tr><td>Gain on opening net monetary liability {fmt(-m.nmpBeg)} x {(m.fE - 1).toFixed(2)}</td><td>{fmt(-m.nmpBeg * (m.fE - 1), { dp: 1 })}</td></tr>
              <tr><td>Loss on monetary inflows {fmt(m.flows)} x {(m.fA - 1).toFixed(3)}</td><td>({fmt(m.flows * (m.fA - 1), { dp: 1 })})</td></tr>
              <tr className="last"><td>Purchasing power gain (loss), in profit</td><td>{fmt(m.rs.mon, { dp: 1 })}</td></tr>
            </tbody></table>
            <div className="hyp-card-t" style={{ marginTop: "0.6rem" }}>IFRS step 2: translate every line at the current rate {m.S1.toFixed(3)}</div>
            <p className="fsa-dim">Assets, liabilities, equity, revenue and expenses all use the same closing rate, which is why no translation adjustment appears.</p>
          </div>
        </aside>
      </div>

      <div className="fsa-ratios">
        <table>
          <thead><tr><th>Ratio</th>{cols.map((c) => <th key={c.id}>{c.label}</th>)}</tr></thead>
          <tbody>
            {ratios.map((q) => (
              <tr key={q.label}><td>{q.label}</td>{cols.map((c) => <td key={c.id}>{showR(q.fn(c.v), q.kind)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="fsa-dim hyp-note">
        Simplifications: the price index and the exchange rate move evenly through the year, so the averages are midpoints; the building is the only non-monetary asset and there are no dividends. The sliders go down to zero so you can see the mechanics, but these treatments apply only once the economy is hyperinflationary (under US GAAP, cumulative inflation of about 100% or more over three years); otherwise the ordinary functional currency rules apply. Under US GAAP the gain on the net monetary position is a remeasurement gain from the exchange rate; under IFRS it is a purchasing power gain from inflation. Both reach net income.
      </p>
    </div>
  );
}

const CSS = `
.hyp .hyp-controls { display: flex; flex-wrap: wrap; gap: 0.9rem 1.6rem; align-items: flex-end; margin: 0.9rem 0; padding: 0.6rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.hyp .hyp-slider { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.82rem; color: var(--text-dim); min-width: 220px; flex: 1; }
.hyp .hyp-slider b { font-family: var(--mono); color: var(--text); }
.hyp .hyp-slider small { font-size: 0.72rem; color: var(--text-faint); font-family: var(--mono); }
.hyp .hyp-slider input { accent-color: var(--accent); width: 100%; }
.hyp .hyp-btns { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.hyp .hyp-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(260px, 360px); gap: 1.1rem; align-items: start; }
@media (max-width: 1080px) { .hyp .hyp-body { grid-template-columns: minmax(0, 1fr); } }
.hyp .hyp-col-bad { color: var(--text-faint); }
.hyp .hyp-col-bad small { color: var(--red) !important; }
.hyp tr.hyp-hl { background: color-mix(in srgb, var(--accent) 8%, transparent); }
.hyp tr.hyp-hl .fsa-lbl { font-weight: 650; }
.hyp tr.hyp-plug .fsa-lbl { color: var(--purple); }
.hyp .hyp-side { display: grid; gap: 0.8rem; min-width: 0; }
.hyp .hyp-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); padding: 0.75rem 0.9rem; font-size: 0.84rem; }
.hyp .hyp-card p { margin: 0.4rem 0; line-height: 1.55; }
.hyp .hyp-card-t { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); font-weight: 650; margin-bottom: 0.3rem; }
.hyp .hyp-verdict { border-left: 3px solid var(--purple); padding-left: 0.6rem; }
.hyp .hyp-bar { display: grid; grid-template-columns: minmax(0, 9rem) minmax(0, 1fr) 3.6rem; gap: 0.5rem; align-items: center; font-size: 0.76rem; margin: 0.25rem 0; }
.hyp .hyp-bar-l { color: var(--text-dim); line-height: 1.2; }
.hyp .hyp-bar-track { height: 0.6rem; background: var(--bg-inset); border-radius: 99px; overflow: hidden; }
.hyp .hyp-bar-fill { display: block; height: 100%; border-radius: 99px; transition: width .5s cubic-bezier(.2,.7,.2,1); }
.hyp .hyp-bar-v { text-align: right; }
.hyp .hyp-mini { margin: 0.3rem 0 0; width: 100%; font-size: 0.78rem; }
.hyp .hyp-mini td { border: none; padding: 0.16rem 0; background: transparent !important; }
.hyp .hyp-mini td:last-child { text-align: right; font-family: var(--mono); white-space: nowrap; padding-left: 0.5rem; }
.hyp .hyp-mini tr.last td { font-weight: 650; border-top: 1px solid var(--border-strong); }
.hyp .hyp-note { font-size: 0.76rem; margin-top: 0.5rem; }
@media (prefers-reduced-motion: reduce) { .hyp .hyp-bar-fill { transition: none; } }
`;
