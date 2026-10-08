import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTween } from "../components/motion.js";
import { fmt } from "../engine/ledger.js";

/* AdjustmentsLab: Pinnacle Corp's latest reported statements (20X5, US GAAP,
   year-end balances) and six analyst adjustments. Typed inputs are the
   reported lines and the note disclosures in PARAMS; every adjusted line,
   journal amount, total and ratio is computed from them. Each adjustment's
   balance sheet deltas balance on their own, so any combination keeps
   assets = liabilities + equity. */

const PARAMS = {
  t: 0.25,
  lifo: { beg: 240, end: 300 },
  commit: { rate: 0.06, life: 10, payment: 108 },
  stake: 0.3,
  kestrelDebt: 2000,
  restructuring: 160,
  gain: 200,
};

const BS = [
  { id: "cash", label: "Cash", side: "A", grp: "ca", v: 900 },
  { id: "rec", label: "Receivables", side: "A", grp: "ca", v: 1400 },
  { id: "inv", label: "Inventory", side: "A", grp: "ca", v: 1100 },
  { id: "ppe", label: "Property, plant and equipment", side: "A", grp: "nca", v: 6300 },
  { id: "assoc", label: "Investment in associate (Kestrel)", side: "A", grp: "nca", v: 2300 },
  { id: "gw", label: "Goodwill", side: "A", grp: "nca", v: 1200 },
  { id: "commitA", label: "Capitalized supply commitment", side: "A", grp: "nca", v: 0, adj: true },
  { id: "kA", label: "Share of Kestrel's assets (debt-financed)", side: "A", grp: "nca", v: 0, adj: true },
  { id: "ap", label: "Accounts payable", side: "L", grp: "cl", v: 1500 },
  { id: "std", label: "Short-term debt", side: "L", grp: "cl", v: 500, debt: true },
  { id: "ltd", label: "Long-term debt", side: "L", grp: "ncl", v: 3600, debt: true },
  { id: "commitL", label: "Supply commitment (treated as debt)", side: "L", grp: "ncl", v: 0, debt: true, adj: true },
  { id: "penD", label: "Pension deficit (treated as debt)", side: "L", grp: "ncl", v: 0, debt: true, adj: true },
  { id: "kD", label: "Share of Kestrel's debt", side: "L", grp: "ncl", v: 0, debt: true, adj: true },
  { id: "pen", label: "Net pension liability", side: "L", grp: "ncl", v: 400 },
  { id: "dtl", label: "Deferred tax liability", side: "L", grp: "ncl", v: 300 },
  { id: "eq", label: "Shareholders' equity", side: "E", grp: "eq", v: 6900 },
];

const IS = [
  { id: "rev", label: "Revenue", v: 11000 },
  { id: "opex", label: "Cost of sales and operating expenses", v: 9800, neg: true },
  { id: "restr", label: "Restructuring charge", v: 160, neg: true },
  { id: "int", label: "Interest expense", v: 140, neg: true },
  { id: "gain", label: "Gain on sale of division", v: 200 },
  { id: "ei", label: "Share of profit of associate", v: 400 },
];

const P = PARAMS;
/* Present value of the disclosed payments, an ordinary annuity at the
   borrowing rate, rounded to a whole number as an analyst would. */
P.commit.pv = Math.round((P.commit.payment * (1 - Math.pow(1 + P.commit.rate, -P.commit.life))) / P.commit.rate);
const base = (id) => BS.find((l) => l.id === id).v;
const pct = (x) => Math.round(x * 1000) / 10 + "%";
const ADJ = [
  {
    id: "commit",
    label: "Capitalize off-balance-sheet commitments",
    hint: "Take-or-pay supply contract in the notes",
    bs: { commitA: P.commit.pv, commitL: P.commit.pv },
    is: { opex: -P.commit.payment + P.commit.pv / P.commit.life, int: P.commit.pv * P.commit.rate },
    journal: [
      ["Dr", "Capitalized supply commitment", P.commit.pv],
      ["Cr", "Supply commitment (debt)", P.commit.pv],
      ["Out of operating expenses", "Annual payment", P.commit.payment],
      ["Into operating expenses", "Amortization: " + P.commit.pv + " / " + P.commit.life + " years", P.commit.pv / P.commit.life],
      ["Into interest expense", "Interest: " + pct(P.commit.rate) + " x " + P.commit.pv, P.commit.pv * P.commit.rate],
    ],
    why: "Pinnacle must pay " + P.commit.payment + " a year for " + P.commit.life + " years whether or not it takes the packaging. That is a fixed claim like a bond, so the analyst discounts the payments at the " + pct(P.commit.rate) + " borrowing rate and records the present value (" + P.commit.pv + ") as debt and as an asset, and re-splits the payment the way pre-2019 operating leases were capitalized: amortization above EBIT, interest below it. EBIT rises, interest rises more, net income dips.",
  },
  {
    id: "pension",
    label: "Add the pension deficit to debt",
    hint: "Already a liability; reclassify it",
    bs: { pen: -base("pen"), penD: base("pen") },
    is: {},
    journal: [
      ["Dr", "Net pension liability", base("pen")],
      ["Cr", "Pension deficit (treated as debt)", base("pen")],
    ],
    why: "Both US GAAP and IFRS already put the funded status on the balance sheet, so total liabilities do not change. The adjustment is about what counts as DEBT: an underfunded plan is a fixed obligation the company must fund with cash, so credit analysts treat it like borrowing. Debt ratios rise; nothing else moves.",
  },
  {
    id: "lifo",
    label: "LIFO to FIFO",
    hint: "Reserve " + P.lifo.beg + " to " + P.lifo.end + ", tax " + pct(P.t),
    bs: { inv: P.lifo.end, dtl: P.lifo.end * P.t, eq: P.lifo.end * (1 - P.t) },
    is: { opex: -(P.lifo.end - P.lifo.beg) },
    journal: [
      ["Dr", "Inventory (+ ending LIFO reserve)", P.lifo.end],
      ["Cr", "Deferred tax liability (reserve x t)", P.lifo.end * P.t],
      ["Cr", "Shareholders' equity (reserve x (1 - t))", P.lifo.end * (1 - P.t)],
      ["Out of cost of sales", "Increase in the reserve (" + P.lifo.end + " - " + P.lifo.beg + ")", P.lifo.end - P.lifo.beg],
    ],
    why: "Puts Pinnacle's inventory on the FIFO basis its IFRS peers must use. Inventory gains the whole reserve; the tax slice goes to a deferred tax liability (LIFO conformity means no tax is due unless old layers are liquidated); equity gets the rest. Cost of sales falls by the increase in the reserve, so EBIT and taxes rise.",
  },
  {
    id: "goodwill",
    label: "Write off goodwill (tangible book value)",
    hint: "Remove goodwill from assets and equity",
    bs: { gw: -base("gw"), eq: -base("gw") },
    is: {},
    journal: [
      ["Dr", "Shareholders' equity", base("gw")],
      ["Cr", "Goodwill", base("gw")],
    ],
    why: "Goodwill cannot be sold separately or pledged to a lender, and its size depends on past acquisition prices. Removing it gives tangible book value. Net income does not change (goodwill is not amortized), so ROA and ROE rise on the smaller base, and debt to equity rises.",
  },
  {
    id: "assoc",
    label: "Proportionately consolidate Kestrel's debt",
    hint: pct(P.stake) + " of Kestrel's " + fmt(P.kestrelDebt) + " of debt",
    bs: { kA: P.stake * P.kestrelDebt, kD: P.stake * P.kestrelDebt },
    is: {},
    journal: [
      ["Dr", "Share of Kestrel's assets", P.stake * P.kestrelDebt],
      ["Cr", "Share of Kestrel's debt", P.stake * P.kestrelDebt],
    ],
    why: "The equity method nets Kestrel's debt inside one investment line. Pinnacle's 30% share of that debt is economically Pinnacle's exposure, so the analyst grosses it up: the debt and the assets it financed both come onto the balance sheet. A full proportionate consolidation would also bring in 30% of Kestrel's revenue and expenses, leaving net income unchanged; this lab shows the balance sheet effect only.",
  },
  {
    id: "normalize",
    label: "Normalize one-off items",
    hint: "Restructuring " + P.restructuring + ", disposal gain " + P.gain,
    bs: {},
    is: { restr: -P.restructuring, gain: -P.gain },
    journal: [
      ["Out of EBIT", "Restructuring charge added back", P.restructuring],
      ["Out of pretax income", "Gain on sale of division removed", P.gain],
      ["Tax effect", "Tax falls by " + pct(P.t) + " x (" + P.gain + " - " + P.restructuring + ")", P.t * (P.gain - P.restructuring)],
    ],
    why: "Neither item will recur. Adding back the charge raises EBIT; removing the gain lowers pretax income. Tax follows both. The balance sheet does not move: the gain, the provision and the cash all happened, the analyst only refuses to capitalize them in a valuation multiple.",
  },
];

/* Statements from a set of active adjustments. Tax is recomputed as t x the
   pretax income Pinnacle itself is taxed on (Kestrel's share arrives taxed). */
function build(active) {
  const bs = {};
  BS.forEach((l) => { bs[l.id] = l.v; });
  const is = {};
  IS.forEach((l) => { is[l.id] = l.v; });
  ADJ.forEach((a) => {
    if (!active[a.id]) return;
    Object.entries(a.bs).forEach(([k, d]) => { bs[k] += d; });
    Object.entries(a.is).forEach(([k, d]) => { is[k] += d; });
  });
  const sum = (pred) => BS.filter(pred).reduce((s, l) => s + bs[l.id], 0);
  const tot = {
    ca: sum((l) => l.grp === "ca"), nca: sum((l) => l.grp === "nca"),
    cl: sum((l) => l.grp === "cl"), ncl: sum((l) => l.grp === "ncl"),
    ta: sum((l) => l.side === "A"), tl: sum((l) => l.side === "L"), te: sum((l) => l.side === "E"),
    debt: sum((l) => l.debt),
  };
  const ebit = is.rev - is.opex - is.restr;
  const pretax = ebit - is.int + is.gain + is.ei;
  const tax = P.t * (pretax - is.ei);
  const ni = pretax - tax;
  return { bs, is: { ...is, ebit, pretax, tax, ni }, tot };
}

const RATIOS = [
  { label: "Debt / equity", fn: (s) => s.tot.debt / s.tot.te, k: "x", good: "down" },
  { label: "Debt / capital", fn: (s) => s.tot.debt / (s.tot.debt + s.tot.te), k: "pct", good: "down" },
  { label: "Return on assets", fn: (s) => s.is.ni / s.tot.ta, k: "pct", good: "up" },
  { label: "Return on equity", fn: (s) => s.is.ni / s.tot.te, k: "pct", good: "up" },
  { label: "Current ratio", fn: (s) => s.tot.ca / s.tot.cl, k: "x", good: "up" },
  { label: "Interest coverage (EBIT / interest)", fn: (s) => s.is.ebit / s.is.int, k: "x", good: "up" },
  { label: "EBIT margin", fn: (s) => s.is.ebit / s.is.rev, k: "pct", good: "up" },
];

const fr = (v, k) => (k === "pct" ? (v * 100).toFixed(1) + "%" : v.toFixed(2) + "x");

function TNum({ v }) {
  const shown = useTween(v, 650);
  return <>{fmt(Math.abs(shown - v) < 1e-6 ? v : Math.round(shown))}</>;
}

function TRatio({ v, k }) {
  const shown = useTween(v, 650);
  return <>{fr(shown, k)}</>;
}

function Row({ label, rep, adj, cls, hit, ind }) {
  const d = adj - rep;
  return (
    <tr className={(cls || "") + (hit ? " is-hit" : "")}>
      <td className={"fsa-lbl" + (ind ? " ind" : "")}>{label}</td>
      <td className="fsa-val"><span className="fsa-num"><span className="fsa-num-v">{fmt(rep)}</span></span></td>
      <td className="fsa-val">
        <span className="fsa-num">
          {Math.abs(d) > 0.005 && <span className={"fsa-delta " + (d > 0 ? "up" : "down")}>{(d > 0 ? "+" : "-") + fmt(Math.abs(d))}</span>}
          <span className="fsa-num-v" data-hit={hit ? "" : undefined}><TNum v={adj} /></span>
        </span>
      </td>
    </tr>
  );
}

export default function AdjustmentsLab() {
  const [active, setActive] = useState({});
  const [last, setLast] = useState(null);
  const [hit, setHit] = useState({ keys: new Set() });
  const timer = useRef(null);

  const rep = useMemo(() => build({}), []);
  const adj = useMemo(() => build(active), [active]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toggle = (a) => {
    const next = { ...active, [a.id]: !active[a.id] };
    const before = build(active), after = build(next);
    const keys = new Set();
    BS.forEach((l) => { if (Math.abs(after.bs[l.id] - before.bs[l.id]) > 0.005) keys.add("BS:" + l.id); });
    Object.keys(after.tot).forEach((k) => { if (Math.abs(after.tot[k] - before.tot[k]) > 0.005) keys.add("T:" + k); });
    Object.keys(after.is).forEach((k) => { if (Math.abs(after.is[k] - before.is[k]) > 0.005) keys.add("IS:" + k); });
    setActive(next);
    setLast(next[a.id] ? a.id : null);
    /* clear first, then re-apply on a later tick, so a line hit by two
       toggles in a row pulses again instead of staying lit */
    clearTimeout(timer.current);
    setHit({ keys: new Set() });
    timer.current = setTimeout(() => {
      setHit({ keys });
      timer.current = setTimeout(() => setHit({ keys: new Set() }), 1600);
    }, 30);
  };

  const anyOn = ADJ.some((a) => active[a.id]);
  const balanced = Math.abs(adj.tot.ta - adj.tot.tl - adj.tot.te) < 0.005;
  const H = (k) => hit.keys.has(k);
  const shown = (l) => !l.adj || Math.abs(adj.bs[l.id]) > 0.005;
  const order = [...ADJ.filter((a) => active[a.id] && a.id === last), ...ADJ.filter((a) => active[a.id] && a.id !== last)];

  const bsRows = (grp) => BS.filter((l) => l.grp === grp && shown(l)).map((l) => (
    <Row key={l.id} label={l.label + (l.debt ? " *" : "")} rep={rep.bs[l.id]} adj={adj.bs[l.id]} hit={H("BS:" + l.id)} ind />
  ));
  const head = (t) => <tr className="fsa-r-head"><td colSpan={3}>{t}</td></tr>;

  return (
    <div className="fsa-theater" style={{ marginTop: "1.2rem" }}>
      <div className="fsa-th-head">
        <div className="fsa-th-std">Interactive lab · Pinnacle Corp, 20X5, US GAAP</div>
        <h3>Analyst adjustments, one switch at a time</h3>
        <div className="fsa-th-sum">
          Turn on an adjustment and watch the lines it touches flash, the numbers move, and the ratios respond. The journal below explains every amount. Balance sheet figures are year-end; ratios use them directly.
        </div>
      </div>

      <div className="fsa-th-controls" style={{ flexWrap: "wrap" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.45rem", flex: 1 }}>
          {ADJ.map((a) => {
            const on = !!active[a.id];
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(a)}
                className={"fsa-btn" + (on ? " fsa-btn-primary" : "")}
                style={{ justifyContent: "flex-start", textAlign: "left", flexDirection: "column", alignItems: "flex-start", gap: "0.1rem" }}
              >
                <span>{on ? "On: " : "Off: "}{a.label}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 400, opacity: 0.8 }}>{a.hint}</span>
              </button>
            );
          })}
        </div>
        <button type="button" className="fsa-btn" disabled={!anyOn} onClick={() => { setActive({}); setLast(null); }}>Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "0.9rem", alignItems: "start" }}>
        <div className="fsa-stmt">
          <table>
            <thead>
              <tr>
                <th className="fsa-stmt-title">Balance sheet<span className="fsa-stmt-sub">* counted as debt</span></th>
                <th className="fsa-col-h">Reported</th>
                <th className="fsa-col-h">Adjusted</th>
              </tr>
            </thead>
            <tbody>
              {head("Current assets")}
              {bsRows("ca")}
              <Row label="Total current assets" rep={rep.tot.ca} adj={adj.tot.ca} cls="fsa-r-sub" hit={H("T:ca")} />
              {head("Non-current assets")}
              {bsRows("nca")}
              <Row label="Total assets" rep={rep.tot.ta} adj={adj.tot.ta} cls="fsa-r-grand" hit={H("T:ta")} />
              {head("Current liabilities")}
              {bsRows("cl")}
              <Row label="Total current liabilities" rep={rep.tot.cl} adj={adj.tot.cl} cls="fsa-r-sub" hit={H("T:cl")} />
              {head("Non-current liabilities")}
              {bsRows("ncl")}
              <Row label="Total liabilities" rep={rep.tot.tl} adj={adj.tot.tl} cls="fsa-r-total" hit={H("T:tl")} />
              {head("Equity")}
              {bsRows("eq")}
              <Row label="Total liabilities and equity" rep={rep.tot.tl + rep.tot.te} adj={adj.tot.tl + adj.tot.te} cls="fsa-r-grand" hit={H("T:tl") || H("T:te")} />
              <Row label="Memo: total debt" rep={rep.tot.debt} adj={adj.tot.debt} cls="fsa-r-sub" hit={H("T:debt")} />
            </tbody>
          </table>
        </div>

        <div>
          <div className="fsa-stmt">
            <table>
              <thead>
                <tr>
                  <th className="fsa-stmt-title">Income statement</th>
                  <th className="fsa-col-h">Reported</th>
                  <th className="fsa-col-h">Adjusted</th>
                </tr>
              </thead>
              <tbody>
                <Row label="Revenue" rep={rep.is.rev} adj={adj.is.rev} hit={H("IS:rev")} />
                <Row label="Cost of sales and operating expenses" rep={-rep.is.opex} adj={-adj.is.opex} hit={H("IS:opex")} ind />
                <Row label="Restructuring charge" rep={-rep.is.restr} adj={-adj.is.restr} hit={H("IS:restr")} ind />
                <Row label="EBIT" rep={rep.is.ebit} adj={adj.is.ebit} cls="fsa-r-sub" hit={H("IS:ebit")} />
                <Row label="Interest expense" rep={-rep.is.int} adj={-adj.is.int} hit={H("IS:int")} ind />
                <Row label="Gain on sale of division" rep={rep.is.gain} adj={adj.is.gain} hit={H("IS:gain")} ind />
                <Row label="Share of profit of associate" rep={rep.is.ei} adj={adj.is.ei} hit={H("IS:ei")} ind />
                <Row label="Pretax income" rep={rep.is.pretax} adj={adj.is.pretax} cls="fsa-r-sub" hit={H("IS:pretax")} />
                <Row label={"Income tax (" + pct(P.t) + ", excluding associate)"} rep={-rep.is.tax} adj={-adj.is.tax} hit={H("IS:tax")} ind />
                <Row label="Net income" rep={rep.is.ni} adj={adj.is.ni} cls="fsa-r-grand" hit={H("IS:ni")} />
              </tbody>
            </table>
          </div>

          <div className="fsa-ratios">
            <table>
              <thead>
                <tr><th>Ratio</th><th>Reported</th><th>Adjusted</th></tr>
              </thead>
              <tbody>
                {RATIOS.map((r) => {
                  const a = r.fn(rep), b = r.fn(adj);
                  const moved = Math.abs(b - a) > 1e-9;
                  const dir = !moved ? "" : b > a ? "up" : "down";
                  const tone = !moved ? "" : dir === r.good ? "up" : "down";
                  return (
                    <tr key={r.label}>
                      <td>{r.label}</td>
                      <td>{fr(a, r.k)}</td>
                      <td className={tone} title={!moved ? "" : tone === "up" ? "Looks stronger after adjustment" : "Looks weaker after adjustment"}>
                        <TRatio v={b} k={r.k} />
                        {moved && <span className="fsa-ratio-arrow" aria-label={dir === "up" ? "higher" : "lower"}>{dir === "up" ? "▲" : "▼"}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={"fsa-check " + (balanced ? "ok" : "bad")} style={{ marginTop: "0.6rem" }}>
            Assets = Liabilities + Equity <small>{fmt(adj.tot.ta)} = {fmt(adj.tot.tl)} + {fmt(adj.tot.te)}</small>
          </div>
        </div>
      </div>

      <div className="fsa-je-wrap" style={{ marginTop: "1rem" }}>
        <div className="fsa-je-h">Adjustment journal</div>
        {!anyOn && <div className="fsa-je-none">No adjustments on. Switch one on above to see its journal and the reasoning behind each amount.</div>}
        {order.map((a) => (
          <div key={a.id} className="fsa-je" style={{ border: "1px solid " + (a.id === last ? "var(--accent)" : "var(--border)"), borderRadius: "var(--radius-sm)", padding: "0.5rem 0.7rem", background: "var(--bg)" }}>
            <div className="fsa-je-col">{a.label}</div>
            <table>
              <tbody>
                {a.journal.map((j, i) => (
                  <tr key={i} className={j[0] === "Cr" ? "cr" : "dr"}>
                    <td className="fsa-je-acct"><span className="fsa-je-side">{j[0]}</span>{j[1]}</td>
                    <td className="fsa-je-amt">{fmt(j[2])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="fsa-je-note">{a.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
