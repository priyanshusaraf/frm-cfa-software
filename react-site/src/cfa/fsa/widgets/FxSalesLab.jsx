import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { fmt } from "../engine/ledger.js";
import { useTween } from "../components/motion.js";

/* FxSalesLab: two small models of how currency moves reach reported results.
   part="growth": decompose Pinnacle's reported sales growth into organic
     volume, price, acquisitions and currency translation.
   part="mix": Pinnacle earns revenue and incurs costs in several currencies;
     a slider per currency shows translated revenue, cost and margin, and how
     a currency with matching revenue and cost hedges itself.
   Every figure is computed from the inputs below. */

function N({ v, dp = 0, pct }) {
  const s = useTween(v, 500);
  if (pct) return <span className="fsa-num"><span className="fsa-num-v">{(s * 100).toFixed(dp)}%</span></span>;
  return <span className="fsa-num"><span className="fsa-num-v">{fmt(dp === 0 ? Math.round(s) : s, { dp })}</span></span>;
}

function Slider({ label, value, min, max, step, onChange, show }) {
  return (
    <label className="fxs-slider">
      <span>{label} <b>{show(value)}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} aria-label={label} />
    </label>
  );
}

const sgn = (x, dp = 1) => (x >= 0 ? "+" : "-") + Math.abs(x * 100).toFixed(dp) + "%";

/* ---------------- growth decomposition ---------------- */
const PRIOR = { home: 6000, eur: 4000, r0: 1.0 };

function Growth() {
  const [vol, setVol] = useState(0.03);
  const [price, setPrice] = useState(0.02);
  const [acq, setAcq] = useState(500);
  const [r1, setR1] = useState(1.1);

  const g = useMemo(() => {
    const prior = PRIOR.home + PRIOR.eur * PRIOR.r0;
    const org = (1 + vol) * (1 + price);
    const homeNow = PRIOR.home * org;
    const eurOrg = PRIOR.eur * org;
    const reported = homeNow + (eurOrg + acq) * r1;
    const parts = [
      { id: "vol", label: "Organic volume", v: prior * vol, tone: "green", sus: "Most sustainable: more units sold to real customers." },
      { id: "price", label: "Organic price", v: prior * (1 + vol) * price, tone: "cyan", sus: "Sustainable only as far as pricing power lasts; inflation pass-through can stop or reverse." },
      { id: "acq", label: "Acquisitions", v: acq * PRIOR.r0, tone: "purple", sus: "Not organic. It will not repeat next year unless Pinnacle keeps buying, and it was paid for with capital." },
      { id: "fx", label: "Currency translation", v: (eurOrg + acq) * (r1 - PRIOR.r0), tone: "amber", sus: "Not sustainable: no extra units or prices, and exchange rates can just as easily reverse." },
    ];
    const total = parts.reduce((s, p) => s + p.v, 0);
    return { prior, reported, parts, total, growth: reported / prior - 1, cc: (reported - parts[3].v) / prior - 1, organic: (parts[0].v + parts[1].v) / prior, eurLocalG: (eurOrg + acq) / PRIOR.eur - 1, eurUsdG: ((eurOrg + acq) * r1) / (PRIOR.eur * PRIOR.r0) - 1 };
  }, [vol, price, acq, r1]);

  const scale = Math.max(1, ...g.parts.map((p) => Math.abs(p.v))) ;
  return (
    <div className="fxs-part">
      <div className="fxs-card-t">Part 1: where did the sales growth come from?</div>
      <p className="fxs-lead">
        Last year Pinnacle sold USD {fmt(PRIOR.home)} at home and EUR {fmt(PRIOR.eur)} in Europe at {PRIOR.r0.toFixed(2)} USD per euro: USD {fmt(g.prior)} in total. Set this year's volume and price growth (applied to both regions), the euro sales of a business acquired this year, and this year's average euro rate.
      </p>
      <div className="fxs-sliders">
        <Slider label="Volume growth" value={vol} min={-0.1} max={0.15} step={0.005} onChange={setVol} show={(x) => sgn(x)} />
        <Slider label="Price growth" value={price} min={-0.05} max={0.1} step={0.005} onChange={setPrice} show={(x) => sgn(x)} />
        <Slider label="Acquired sales (euros)" value={acq} min={0} max={2000} step={50} onChange={setAcq} show={(x) => "EUR " + fmt(x)} />
        <Slider label="Average euro rate this year" value={r1} min={0.8} max={1.3} step={0.01} onChange={setR1} show={(x) => x.toFixed(2) + " (" + sgn(x / PRIOR.r0 - 1) + ")"} />
      </div>

      <div className="fxs-headline">
        <div><small>Reported sales</small><b><N v={g.reported} /></b></div>
        <div><small>Reported growth</small><b><N v={g.growth} pct dp={1} /></b></div>
        <div><small>Constant-currency growth</small><b><N v={g.cc} pct dp={1} /></b></div>
        <div><small>Organic growth</small><b><N v={g.organic} pct dp={1} /></b></div>
      </div>

      <div className="fxs-bridge" role="img" aria-label="Sales bridge from last year to this year">
        {g.parts.map((p) => (
          <div key={p.id} className="fxs-brow">
            <span className="fxs-blabel">{p.label}</span>
            <span className="fxs-btrack">
              <span className="fxs-bzero" />
              <span
                className="fxs-bfill"
                style={{
                  background: "var(--" + p.tone + ")",
                  width: (Math.abs(p.v) / scale) * 50 + "%",
                  left: p.v >= 0 ? "50%" : 50 - (Math.abs(p.v) / scale) * 50 + "%",
                }}
              />
            </span>
            <span className="fxs-bval"><N v={p.v} /> <small>{sgn(p.v / g.prior)}</small></span>
            <span className="fxs-bsus">{p.sus}</span>
          </div>
        ))}
      </div>
      <p className="fsa-dim fxs-note">
        Check: {fmt(g.prior)} + {g.parts.map((p) => fmt(p.v, { dp: 1 })).join(" + ")} = {fmt(g.prior + g.total, { dp: 1 })}, the reported figure. Volume, price and acquisitions are measured at last year's rate; the currency line is this year's euro sales x the change in the rate.
        European sales grew {sgn(g.eurLocalG)} in euros and {sgn(g.eurUsdG)} in dollars: (1 + local growth) x (1 + currency change) - 1.
      </p>
    </div>
  );
}

/* ---------------- multi-currency mix ---------------- */
const MIX = [
  { id: "USD", label: "United States", cur: "US dollar", rev: 5000, cost: 3800, fixed: true },
  { id: "EUR", label: "Eurozone", cur: "euro", rev: 3000, cost: 2800 },
  { id: "GBP", label: "United Kingdom", cur: "pound sterling", rev: 1500, cost: 300 },
  { id: "CNY", label: "China, factory", cur: "renminbi", rev: 500, cost: 2100 },
];

function Mix() {
  const [chg, setChg] = useState({ EUR: 0, GBP: 0, CNY: 0 });
  const set = (id, v) => setChg((c) => ({ ...c, [id]: v }));
  const allBy = (v) => setChg({ EUR: v, GBP: v, CNY: v });

  const m = useMemo(() => {
    const rows = MIX.map((c) => {
      const k = 1 + (c.fixed ? 0 : chg[c.id]);
      return { ...c, k, revT: c.rev * k, costT: c.cost * k, net: (c.rev - c.cost) * k, effect: (c.rev - c.cost) * (k - 1), hedge: Math.min(c.rev, c.cost) / Math.max(c.rev, c.cost) };
    });
    const sum = (key) => rows.reduce((s, r) => s + r[key], 0);
    const baseRev = MIX.reduce((s, c) => s + c.rev, 0), baseCost = MIX.reduce((s, c) => s + c.cost, 0);
    const rev = sum("revT"), cost = sum("costT");
    const fRev = MIX.filter((c) => !c.fixed).reduce((s, c) => s + c.rev, 0), fCost = MIX.filter((c) => !c.fixed).reduce((s, c) => s + c.cost, 0);
    return { rows, rev, cost, op: rev - cost, margin: (rev - cost) / rev, baseRev, baseCost, baseOp: baseRev - baseCost, baseMargin: (baseRev - baseCost) / baseRev, fRev, fCost };
  }, [chg]);

  return (
    <div className="fxs-part">
      <div className="fxs-card-t">Part 2: one company, four currencies</div>
      <p className="fxs-lead">
        Pinnacle's revenue and costs, translated at last year's rates, by currency. Move each foreign currency against the dollar (positive means that currency strengthens). Watch the euro: revenue and costs nearly match, so its moves barely touch profit. Sterling is mostly revenue; the renminbi is mostly cost.
      </p>
      <div className="fxs-sliders">
        {MIX.filter((c) => !c.fixed).map((c) => (
          <Slider key={c.id} label={c.label + " (" + c.cur + ")"} value={chg[c.id]} min={-0.3} max={0.3} step={0.01} onChange={(v) => set(c.id, v)} show={(x) => sgn(x, 0)} />
        ))}
        <div className="fxs-btns">
          <button type="button" className="fsa-btn" onClick={() => allBy(-0.1)}>Dollar 10% stronger against all</button>
          <button type="button" className="fsa-btn" onClick={() => allBy(0.1)}>Dollar 10% weaker against all</button>
          <button type="button" className="fsa-btn" onClick={() => allBy(0)}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>

      <section className="fsa-stmt">
        <table>
          <thead>
            <tr>
              <th className="fsa-stmt-title">US dollars</th>
              <th className="fsa-col-h"><span>Revenue</span></th>
              <th className="fsa-col-h"><span>Costs</span></th>
              <th className="fsa-col-h"><span>Profit</span></th>
              <th className="fsa-col-h"><span>Effect of the move</span><small>on profit</small></th>
              <th className="fsa-col-h"><span>Natural hedge</span><small>smaller / larger side</small></th>
            </tr>
          </thead>
          <tbody>
            {m.rows.map((r) => (
              <tr key={r.id} className="fsa-r-line">
                <td className="fsa-lbl">{r.label} <small className="fxs-cur">{r.id}</small></td>
                <td className="fsa-val"><N v={r.revT} /></td>
                <td className="fsa-val"><N v={-r.costT} /></td>
                <td className="fsa-val"><N v={r.net} /></td>
                <td className={"fsa-val " + (r.effect > 0.5 ? "fxs-up" : r.effect < -0.5 ? "fxs-down" : "")}>{r.fixed ? <span className="fsa-dim">home currency</span> : <N v={r.effect} />}</td>
                <td className="fsa-val">{r.fixed ? <span className="fsa-dim">n/a</span> : <span className="fxs-hedge"><span style={{ width: r.hedge * 100 + "%" }} /></span>}{!r.fixed && <small className="fxs-cur">{Math.round(r.hedge * 100)}%</small>}</td>
              </tr>
            ))}
            <tr className="fsa-r-total">
              <td className="fsa-lbl">Total</td>
              <td className="fsa-val"><N v={m.rev} /></td>
              <td className="fsa-val"><N v={-m.cost} /></td>
              <td className="fsa-val"><N v={m.op} /></td>
              <td className={"fsa-val " + (m.op - m.baseOp > 0.5 ? "fxs-up" : m.op - m.baseOp < -0.5 ? "fxs-down" : "")}><N v={m.op - m.baseOp} /></td>
              <td />
            </tr>
          </tbody>
        </table>
      </section>
      <div className="fxs-headline">
        <div><small>Revenue change</small><b>{sgn(m.rev / m.baseRev - 1)}</b></div>
        <div><small>Operating profit change</small><b>{sgn(m.op / m.baseOp - 1)}</b></div>
        <div><small>Operating margin</small><b><N v={m.margin} pct dp={1} /></b><small>was {(m.baseMargin * 100).toFixed(1)}%</small></div>
      </div>
      <p className="fsa-dim fxs-note">
        Each currency's effect on profit is (its revenue - its costs) x its change. A currency where Pinnacle earns and spends about the same amount is a natural hedge: the move shows up in revenue and cost, and largely cancels in profit, although the margin percentage still shifts because revenue is a bigger base. Foreign costs ({fmt(m.fCost)}) {m.fCost > m.fRev ? "exceed" : "fall short of"} foreign revenue ({fmt(m.fRev)}) here, so a broadly stronger dollar {m.fCost > m.fRev ? "slightly RAISES" : "LOWERS"} profit even as reported revenue falls.
      </p>
    </div>
  );
}

export default function FxSalesLab({ part = "both" }) {
  return (
    <div className="fsa-theater fxs">
      <style>{CSS}</style>
      <header className="fsa-th-head">
        <div className="fsa-th-std">Currency and the top line</div>
        <h3>{part === "mix" ? "Countries of operation: who wins when the dollar moves?" : part === "growth" ? "Sales growth, taken apart" : "Sales growth and countries of operation"}</h3>
      </header>
      {part !== "mix" && <Growth />}
      {part !== "growth" && <Mix />}
    </div>
  );
}

const CSS = `
.fxs .fxs-part { margin-top: 0.8rem; }
.fxs .fxs-part + .fxs-part { border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1.2rem; }
.fxs .fxs-card-t { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); font-weight: 650; }
.fxs .fxs-lead { font-size: 0.88rem; color: var(--text-dim); max-width: 860px; margin: 0.35rem 0 0.7rem; line-height: 1.55; }
.fxs .fxs-sliders { display: flex; flex-wrap: wrap; gap: 0.7rem 1.4rem; align-items: flex-end; margin-bottom: 0.9rem; }
.fxs .fxs-slider { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.8rem; color: var(--text-dim); min-width: 190px; flex: 1; }
.fxs .fxs-slider b { font-family: var(--mono); color: var(--text); }
.fxs .fxs-slider input { accent-color: var(--accent); width: 100%; }
.fxs .fxs-btns { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.fxs .fxs-headline { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 0.6rem 0; }
.fxs .fxs-headline > div { border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg); padding: 0.45rem 0.75rem; min-width: 140px; }
.fxs .fxs-headline small { display: block; font-size: 0.7rem; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.05em; }
.fxs .fxs-headline b { font-family: var(--mono); font-size: 1.05rem; }
.fxs .fxs-bridge { display: grid; gap: 0.45rem; margin: 0.7rem 0; }
.fxs .fxs-brow { display: grid; grid-template-columns: 10rem minmax(120px, 1fr) 7.5rem minmax(0, 1.4fr); gap: 0.6rem; align-items: center; font-size: 0.8rem; }
@media (max-width: 900px) { .fxs .fxs-brow { grid-template-columns: 8rem minmax(0, 1fr) 6.5rem; } .fxs .fxs-bsus { grid-column: 1 / -1; } }
.fxs .fxs-blabel { font-weight: 600; }
.fxs .fxs-btrack { position: relative; height: 0.9rem; background: var(--bg-inset); border-radius: 4px; overflow: hidden; }
.fxs .fxs-bzero { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: var(--border-strong); }
.fxs .fxs-bfill { position: absolute; top: 0; bottom: 0; border-radius: 3px; transition: width .45s cubic-bezier(.2,.7,.2,1), left .45s cubic-bezier(.2,.7,.2,1); }
.fxs .fxs-bval { text-align: right; font-family: var(--mono); }
.fxs .fxs-bval small { color: var(--text-faint); margin-left: 0.25rem; }
.fxs .fxs-bsus { color: var(--text-dim); font-size: 0.76rem; line-height: 1.35; }
.fxs .fxs-note { font-size: 0.76rem; max-width: 900px; }
.fxs .fxs-cur { font-family: var(--mono); font-size: 0.68rem; color: var(--text-faint); margin-left: 0.3rem; }
.fxs td.fxs-up .fsa-num-v { color: var(--green); }
.fxs td.fxs-down .fsa-num-v { color: var(--red); }
.fxs .fxs-hedge { display: inline-block; vertical-align: middle; width: 4rem; height: 0.45rem; border-radius: 99px; background: var(--bg-inset); overflow: hidden; }
.fxs .fxs-hedge span { display: block; height: 100%; background: var(--green); transition: width .4s; }
@media (prefers-reduced-motion: reduce) { .fxs .fxs-bfill, .fxs .fxs-hedge span { transition: none; } }
`;
