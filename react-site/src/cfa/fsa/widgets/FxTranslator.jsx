import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Footprints, Pause, Play, RotateCcw, X } from "lucide-react";
import { fmt } from "../engine/ledger.js";
import { useTween, flyChip, prefersReducedMotion } from "../components/motion.js";

/* FxTranslator: Kestrel Europe's euro statements translated into Pinnacle's
   US dollars, line by line, under the current rate method and the temporal
   method. Every translated number is derived here from the euro data and the
   rates; nothing is typed in. Rates are US dollars per euro, so a higher rate
   is a stronger euro.

   Default example (start at acquisition, so beginning retained earnings = 0):
     historical 1.20, average 1.10, current 1.00, ending inventory 1.05,
     dividend declared 1.04
     current rate method: NI 220, RE 168, CTA (218)
     temporal method:     NI 207 incl. remeasurement gain 62, RE 155 */

const EUR = {
  openCash: 300, openInv: 400, openPpe: 1000, openDebt: 700, sc: 1000,
  sales: 2000, purchases: 1300, endInv: 500, dep: 100, opex: 400, tax: 100, div: 50,
  rec: 300, ap: 400,
};
const DEFAULT_RATES = { H: 1.2, A: 1.1, C: 1.0, I: 1.05, D: 1.04 };

function localFigures(e) {
  const cogs = e.openInv + e.purchases - e.endInv;
  const ni = e.sales - cogs - e.dep - e.opex - e.tax;
  const cash = e.openCash + (e.sales - e.rec) - (e.purchases - e.ap) - e.opex - e.tax - e.div;
  const ppe = e.openPpe - e.dep;
  const v = {
    sales: e.sales, cogs: -cogs, dep: -e.dep, opex: -e.opex, fx: 0, tax: -e.tax, ni,
    cash, rec: e.rec, inv: e.endInv, ppe, ap: e.ap, debt: e.openDebt, sc: e.sc, re: ni - e.div, cta: 0,
  };
  return finish(v, { divs: e.div });
}

function finish(v, extra) {
  v.gp = v.sales + v.cogs;
  v.ta = v.cash + v.rec + v.inv + v.ppe;
  v.tl = v.ap + v.debt;
  v.te = v.sc + v.re + v.cta;
  v.tle = v.tl + v.te;
  return Object.assign(v, extra);
}

/* The two methods. Under the current rate method the income statement is
   translated first, retained earnings is rolled forward and the CTA is the
   plug. Under the temporal method the balance sheet comes first, retained
   earnings is the plug, and the remeasurement gain or loss is whatever makes
   net income agree with it. */
function translate(method, r, L, e) {
  const v = {};
  if (method === "crm") {
    v.sales = L.sales * r.A; v.cogs = L.cogs * r.A; v.dep = L.dep * r.A; v.opex = L.opex * r.A; v.tax = L.tax * r.A;
    v.fx = 0;
    v.ni = v.sales + v.cogs + v.dep + v.opex + v.tax;
    ["cash", "rec", "inv", "ppe", "ap", "debt"].forEach((k) => { v[k] = L[k] * r.C; });
    v.sc = L.sc * r.H;
    const divs = e.div * r.D;
    v.re = 0 + v.ni - divs;
    const ta = v.cash + v.rec + v.inv + v.ppe, tl = v.ap + v.debt;
    v.cta = ta - tl - v.sc - v.re;
    return finish(v, { divs, pre: v.ni });
  }
  v.cash = L.cash * r.C; v.rec = L.rec * r.C; v.inv = L.inv * r.I; v.ppe = L.ppe * r.H;
  v.ap = L.ap * r.C; v.debt = L.debt * r.C; v.sc = L.sc * r.H; v.cta = 0;
  const ta = v.cash + v.rec + v.inv + v.ppe, tl = v.ap + v.debt;
  v.re = ta - tl - v.sc;
  v.sales = L.sales * r.A;
  v.cogs = -(e.openInv * r.H + e.purchases * r.A - e.endInv * r.I);
  v.dep = L.dep * r.H; v.opex = L.opex * r.A; v.tax = L.tax * r.A;
  const pre = v.sales + v.cogs + v.dep + v.opex + v.tax;
  const divs = e.div * r.D;
  v.ni = v.re + divs;
  v.fx = v.ni - pre;
  return finish(v, { divs, pre });
}

/* ---------- rows ---------- */
const IS_ROWS = [
  { k: "sales", label: "Revenue" },
  { k: "cogs", label: "Cost of goods sold" },
  { k: "gp", label: "Gross profit", kind: "sub" },
  { k: "dep", label: "Depreciation" },
  { k: "opex", label: "Other operating expenses" },
  { k: "fx", label: "Remeasurement gain (loss)" },
  { k: "tax", label: "Income tax expense" },
  { k: "ni", label: "Net income", kind: "total" },
];
const BS_ROWS = [
  { k: "h-a", label: "Assets", kind: "head" },
  { k: "cash", label: "Cash" },
  { k: "rec", label: "Receivables" },
  { k: "inv", label: "Inventory (at cost)" },
  { k: "ppe", label: "PP&E, net" },
  { k: "ta", label: "Total assets", kind: "grand" },
  { k: "h-l", label: "Liabilities and equity", kind: "head" },
  { k: "ap", label: "Accounts payable" },
  { k: "debt", label: "Long-term debt" },
  { k: "tl", label: "Total liabilities", kind: "sub" },
  { k: "sc", label: "Share capital" },
  { k: "re", label: "Retained earnings" },
  { k: "cta", label: "Cumulative translation adjustment" },
  { k: "te", label: "Total equity", kind: "sub" },
  { k: "tle", label: "Total liabilities and equity", kind: "grand" },
];
const SUBTOTALS = new Set(["gp", "ni", "ta", "tl", "te", "tle"]);

const ORDER = {
  crm: ["sales", "cogs", "gp", "dep", "opex", "tax", "ni", "re", "cash", "rec", "inv", "ppe", "ta", "ap", "debt", "tl", "sc", "cta", "te", "tle"],
  tmp: ["cash", "rec", "inv", "ppe", "ta", "ap", "debt", "tl", "sc", "re", "te", "tle", "sales", "cogs", "gp", "dep", "opex", "tax", "ni", "fx"],
};
const NOT_USED = { crm: "fx", tmp: "cta" };

/* Which rate each line uses. t is the chip family; it is also the React key
   of the chip, so a chip only re-mounts (and flips) when the family changes. */
function rateOf(k, method, r, tv, L) {
  if (SUBTOTALS.has(k)) return { t: "sum", label: "Sum" };
  if (k === NOT_USED[method]) return { t: "none", label: "Not used" };
  if (method === "crm") {
    if (["sales", "cogs", "dep", "opex", "tax"].includes(k)) return { t: "A", label: "Average", rate: r.A };
    if (["cash", "rec", "inv", "ppe", "ap", "debt"].includes(k)) return { t: "C", label: "Current", rate: r.C };
    if (k === "sc") return { t: "H", label: "Historical", rate: r.H };
    if (k === "re") return { t: "roll", label: "Rolled forward" };
    if (k === "cta") return { t: "plug", label: "Plug (to OCI)" };
  } else {
    if (["sales", "opex", "tax"].includes(k)) return { t: "A", label: "Average", rate: r.A };
    if (["cash", "rec", "ap", "debt"].includes(k)) return { t: "C", label: "Current", rate: r.C };
    if (k === "inv") return { t: "H", label: "Historical", rate: r.I };
    if (k === "ppe" || k === "sc" || k === "dep") return { t: "H", label: "Historical", rate: r.H };
    if (k === "cogs") return { t: "mix", label: "Historical mix", rate: tv.cogs / L.cogs };
    if (k === "re") return { t: "plug", label: "Plug from BS" };
    if (k === "fx") return { t: "plug", label: "Plug (to profit)" };
  }
  return { t: "none", label: "" };
}

const f0 = (x) => fmt(Math.round(x * 100) / 100);
const rt = (x) => (x == null ? "" : x.toFixed(2));

function whyOf(k, method, r, tv, L, e) {
  const M = method === "crm";
  const eur = (x) => "EUR " + fmt(Math.abs(x));
  switch (k) {
    case "sales":
      return "Revenue is earned all year, so both methods use the average rate as a stand-in for the rate on each sale date: " + eur(L.sales) + " x " + rt(r.A) + " = USD " + f0(tv.sales) + ".";
    case "cogs":
      return M
        ? "Under the current rate method every income statement line uses the same average rate, cost of goods sold included: " + eur(L.cogs) + " x " + rt(r.A) + " = USD " + f0(-tv.cogs) + ". Because revenue used the same rate, the dollar gross margin equals the euro gross margin."
        : "COGS is the cost of inventory, a non-monetary asset, so it carries the historical rates of the inventory it came from: opening inventory EUR " + fmt(e.openInv) + " x " + rt(r.H) + " + purchases EUR " + fmt(e.purchases) + " x " + rt(r.A) + " - ending inventory EUR " + fmt(e.endInv) + " x " + rt(r.I) + " = USD " + f0(-tv.cogs) + ". That is an effective rate of " + (tv.cogs / L.cogs).toFixed(3) + ", not the average rate, so the gross margin moves.";
    case "gp":
      return M
        ? "Subtotal. Revenue and COGS used the same rate, so gross margin is " + pct(tv.gp / tv.sales) + ", exactly the euro margin."
        : "Subtotal. COGS used older rates than revenue, so the dollar gross margin (" + pct(tv.gp / tv.sales) + ") differs from the euro margin (" + pct(L.gp / L.sales) + ").";
    case "dep":
      return M
        ? "Depreciation uses the average rate too: " + eur(L.dep) + " x " + rt(r.A) + " = USD " + f0(-tv.dep) + ". The method does not care that the plant was bought at " + rt(r.H) + "."
        : "Depreciation spreads the cost of PP&E, and PP&E is held at its historical rate, so depreciation must use the same rate or the two statements would disagree about what the plant cost: " + eur(L.dep) + " x " + rt(r.H) + " = USD " + f0(-tv.dep) + ".";
    case "opex":
      return "Ordinary operating expenses are not the cost of a non-monetary asset, so both methods use the average rate: " + eur(L.opex) + " x " + rt(r.A) + " = USD " + f0(-tv.opex) + ".";
    case "tax":
      return "Income tax accrues through the year: average rate under both methods, " + eur(L.tax) + " x " + rt(r.A) + " = USD " + f0(-tv.tax) + ".";
    case "fx":
      return M
        ? "Not used. The current rate method has no remeasurement line on the income statement: the effect of the rate move goes to equity as the CTA."
        : "The plug that makes the income statement agree with the balance sheet: net income " + f0(tv.ni) + " less income before remeasurement " + f0(tv.pre) + " = " + f0(tv.fx) + ". It is reported IN net income. Its sign follows the net monetary position: Kestrel owes more euros than it holds, so a weaker euro is a gain and a stronger euro a loss.";
    case "ni":
      return M
        ? "Sum of the translated lines: USD " + f0(tv.ni) + ". Every line used the average rate, so this is simply euro net income x " + rt(r.A) + "."
        : "Worked BACKWARDS from retained earnings, because the balance sheet is translated first: ending retained earnings " + f0(tv.re) + " + dividends " + f0(tv.divs) + " - beginning retained earnings 0 = " + f0(tv.ni) + ".";
    case "re":
      return M
        ? "Never translated as a block. It is rolled forward: beginning retained earnings 0 (we start at acquisition) + net income " + f0(tv.ni) + " - dividends EUR " + fmt(e.div) + " x " + rt(r.D) + " (the rate when declared) = USD " + f0(tv.re) + "."
        : "You cannot roll retained earnings forward yet, because net income contains a remeasurement gain or loss you have not computed. So it is the balance sheet plug: total assets " + f0(tv.ta) + " - liabilities " + f0(tv.tl) + " - share capital " + f0(tv.sc) + " = " + f0(tv.re) + ".";
    case "cash":
    case "rec":
    case "ap":
    case "debt": {
      const name = { cash: "Cash", rec: "Receivables", ap: "Accounts payable", debt: "Debt" }[k];
      return M
        ? name + " goes at the current rate, like every asset and liability under this method: " + eur(L[k]) + " x " + rt(r.C) + " = USD " + f0(tv[k]) + "."
        : name + " is MONETARY: a fixed number of euros to be received or paid. Its dollar value genuinely changes with the rate, so even the temporal method uses the current rate: " + eur(L[k]) + " x " + rt(r.C) + " = USD " + f0(tv[k]) + ".";
    }
    case "inv":
      return M
        ? "Inventory goes at the current rate as well: " + eur(L.inv) + " x " + rt(r.C) + " = USD " + f0(tv.inv) + ". The current rate method treats Kestrel's whole net investment as exposed, so the purchase date does not matter."
        : "Inventory carried at cost is NON-monetary. Its cost was fixed in dollars the day it was bought, so it keeps that rate: " + eur(L.inv) + " x " + rt(r.I) + " = USD " + f0(tv.inv) + ". (Inventory written down to a market value would use the rate on the date that value was measured.)";
    case "ppe":
      return M
        ? "PP&E at the current rate: " + eur(L.ppe) + " x " + rt(r.C) + " = USD " + f0(tv.ppe) + ". This is why the current rate method's balance sheet moves so much when the euro moves."
        : "PP&E is non-monetary and carried at historical cost, so it keeps the acquisition rate whatever the euro does now: " + eur(L.ppe) + " x " + rt(r.H) + " = USD " + f0(tv.ppe) + ".";
    case "sc":
      return "Share capital stays at the historical rate of the day it was issued (" + rt(r.H) + ") under both methods: " + eur(L.sc) + " x " + rt(r.H) + " = USD " + f0(tv.sc) + ". It never moves after acquisition.";
    case "cta":
      return M
        ? "The balancing figure: total assets " + f0(tv.ta) + " - liabilities " + f0(tv.tl) + " - share capital " + f0(tv.sc) + " - retained earnings " + f0(tv.re) + " = " + f0(tv.cta) + ". It goes through OTHER COMPREHENSIVE INCOME into equity and never touches net income (until the subsidiary is sold)."
        : "Not used. Under the temporal method the whole rate effect has already gone through net income, so no translation adjustment appears in equity.";
    case "ta": return "Subtotal of the translated assets: USD " + f0(tv.ta) + ".";
    case "tl": return "Subtotal of the translated liabilities: USD " + f0(tv.tl) + ".";
    case "te": return "Share capital + retained earnings + CTA = USD " + f0(tv.te) + ".";
    case "tle": return "Liabilities + equity = USD " + f0(tv.tle) + (Math.abs(tv.tle - tv.ta) < 0.005 ? ", equal to total assets. The plug did its job." : ".");
    default: return "";
  }
}

function pct(x) { return Number.isFinite(x) ? (x * 100).toFixed(1) + "%" : "n/a"; }

/* ---------- small parts ---------- */
function Num({ v, pending }) {
  /* while a line is still hidden in step-through mode the tween target is 0,
     so the number counts up from zero when the line is revealed */
  const shown = useTween(pending ? 0 : v, 600);
  if (pending) return <span className="fsa-num"><span className="fsa-num-v fxt-pend">?</span></span>;
  const isInt = Math.abs(v - Math.round(v)) < 0.005;
  const dp = isInt ? 0 : Math.abs(v * 10 - Math.round(v * 10)) < 0.05 ? 1 : 2;
  const txt = fmt(isInt ? Math.round(shown) : shown, { dp });
  return <span className={"fsa-num" + (Math.abs(v) < 0.005 ? " is-zero" : "")}><span className="fsa-num-v">{txt}</span></span>;
}

function Chip({ spec, pending }) {
  if (!spec || !spec.label) return null;
  if (pending) return <span className="fxt-chip fxt-c-pend">...</span>;
  return (
    <span key={spec.t} className={"fxt-chip fxt-c-" + spec.t} title={spec.label}>
      {spec.label}
      {spec.rate != null && <b>{spec.t === "mix" ? spec.rate.toFixed(3) : spec.rate.toFixed(2)}</b>}
    </span>
  );
}

function Statement({ title, rows, L, tv, method, r, e, revealed, current, onPick, picked, glowParity, changedKeys }) {
  return (
    <section className="fsa-stmt fxt-stmt">
      <table>
        <thead>
          <tr>
            <th className="fsa-stmt-title">{title}</th>
            <th className="fsa-col-h"><span>Euro</span><small>Kestrel's books</small></th>
            <th className="fsa-col-h fxt-ratecol"><span>Rate</span><small>USD per EUR</small></th>
            <th className="fsa-col-h"><span>US dollars</span><small>translated</small></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            if (row.kind === "head") {
              return <tr key={row.k} className="fsa-r-head"><td colSpan={4}>{row.label}</td></tr>;
            }
            const unused = NOT_USED[method] === row.k;
            const pend = revealed && !revealed.has(row.k) && !unused;
            const spec = rateOf(row.k, method, r, tv, L);
            const changed = changedKeys.has(row.k);
            const cls = [
              "fsa-r-" + (row.kind || "line"),
              "fxt-row",
              spec.t === "plug" ? "fxt-plugrow" : "",
              unused ? "fxt-unused" : "",
              current === row.k ? "fxt-current" : "",
              picked === row.k ? "fxt-picked" : "",
            ].join(" ");
            const style = changed && !prefersReducedMotion() ? { animation: (glowParity ? "fxt-glowA" : "fxt-glowB") + " 1.6s ease-out" } : undefined;
            return (
              <tr
                key={row.k}
                data-row={row.k}
                className={cls}
                style={style}
                onClick={() => onPick(row.k)}
                role="button"
                tabIndex={0}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onPick(row.k); } }}
              >
                <td className="fsa-lbl">{row.label}</td>
                <td className="fsa-val"><Num v={L[row.k]} /></td>
                <td className="fxt-ratecell"><Chip spec={spec} pending={pend} /></td>
                <td className="fsa-val"><Num v={unused ? 0 : tv[row.k]} pending={pend} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

function ExposureChart({ r, L, e }) {
  const W = 320, H = 150, pad = { l: 40, r: 10, t: 12, b: 26 };
  const xs = [];
  for (let c = 0.7; c <= 1.5001; c += 0.02) xs.push(Math.round(c * 100) / 100);
  const pts = xs.map((c) => {
    const rr = { ...r, C: c };
    return { c, cta: translate("crm", rr, L, e).cta, fx: translate("tmp", rr, L, e).fx };
  });
  const ys = pts.flatMap((p) => [p.cta, p.fx]).concat([0]);
  const ymin = Math.min(...ys), ymax = Math.max(...ys);
  const X = (c) => pad.l + ((c - 0.7) / 0.8) * (W - pad.l - pad.r);
  const Y = (y) => pad.t + (1 - (y - ymin) / (ymax - ymin || 1)) * (H - pad.t - pad.b);
  const path = (key) => pts.map((p, i) => (i ? "L" : "M") + X(p.c).toFixed(1) + " " + Y(p[key]).toFixed(1)).join(" ");
  const nowCta = translate("crm", r, L, e).cta, nowFx = translate("tmp", r, L, e).fx;
  return (
    <svg viewBox={"0 0 " + W + " " + H} className="fxt-chart" role="img" aria-label="Translation adjustment and remeasurement gain as the current rate changes">
      <line x1={pad.l} x2={W - pad.r} y1={Y(0)} y2={Y(0)} style={{ stroke: "var(--border-strong)" }} />
      <line x1={X(r.H)} x2={X(r.H)} y1={pad.t} y2={H - pad.b} style={{ stroke: "var(--text-faint)", strokeDasharray: "3 3" }} />
      <text x={X(r.H) + 3} y={pad.t + 8} style={{ fill: "var(--text-faint)", fontSize: 9 }}>acquired at {r.H.toFixed(2)}</text>
      <path d={path("cta")} style={{ fill: "none", stroke: "var(--accent)", strokeWidth: 2 }} />
      <path d={path("fx")} style={{ fill: "none", stroke: "var(--purple)", strokeWidth: 2 }} />
      <circle cx={X(r.C)} cy={Y(nowCta)} r={4} style={{ fill: "var(--accent)", transition: "cx .3s, cy .3s" }} />
      <circle cx={X(r.C)} cy={Y(nowFx)} r={4} style={{ fill: "var(--purple)", transition: "cx .3s, cy .3s" }} />
      {[0.7, 0.9, 1.1, 1.3, 1.5].map((c) => (
        <text key={c} x={X(c)} y={H - 8} textAnchor="middle" style={{ fill: "var(--text-faint)", fontSize: 9 }}>{c.toFixed(2)}</text>
      ))}
      <text x={pad.l - 4} y={Y(ymax) + 3} textAnchor="end" style={{ fill: "var(--text-faint)", fontSize: 9 }}>{fmt(Math.round(ymax))}</text>
      <text x={pad.l - 4} y={Y(ymin) + 3} textAnchor="end" style={{ fill: "var(--text-faint)", fontSize: 9 }}>{fmt(Math.round(ymin))}</text>
      <text x={pad.l - 4} y={Y(0) + 3} textAnchor="end" style={{ fill: "var(--text-faint)", fontSize: 9 }}>0</text>
    </svg>
  );
}

/* ---------- main ---------- */
export default function FxTranslator({ startMethod = "crm" }) {
  const e = EUR;
  const L = useMemo(() => localFigures(e), [e]);
  const [method, setMethod] = useState(startMethod === "tmp" ? "tmp" : "crm");
  const [C, setC] = useState(DEFAULT_RATES.C);
  const [A, setA] = useState(DEFAULT_RATES.A);
  const [picked, setPicked] = useState(null);
  const [stepMode, setStepMode] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [parity, setParity] = useState(false);
  const [toggled, setToggled] = useState(false);
  const rootRef = useRef(null);
  const checkRef = useRef(null);

  const r = { ...DEFAULT_RATES, C, A };
  const tv = useMemo(() => translate(method, r, L, e), [method, C, A, L]); // eslint-disable-line react-hooks/exhaustive-deps
  const other = useMemo(() => translate(method === "crm" ? "tmp" : "crm", r, L, e), [method, C, A, L]); // eslint-disable-line react-hooks/exhaustive-deps
  const crmV = method === "crm" ? tv : other;
  const tmpV = method === "crm" ? other : tv;

  /* lines whose rate family differs between the two methods: these glow on a toggle */
  const changedKeys = useMemo(() => {
    if (!toggled) return new Set();
    const s = new Set();
    [...IS_ROWS, ...BS_ROWS].forEach((row) => {
      if (row.kind === "head" || SUBTOTALS.has(row.k)) return;
      if (rateOf(row.k, "crm", r, crmV, L).t !== rateOf(row.k, "tmp", r, tmpV, L).t) s.add(row.k);
    });
    return s;
  }, [toggled, crmV, tmpV]); // eslint-disable-line react-hooks/exhaustive-deps

  const order = ORDER[method];
  const revealed = stepMode ? new Set(order.slice(0, stepIdx + 1)) : null;
  const current = stepMode ? order[stepIdx] : null;
  const focusKey = current || picked;

  const switchMethod = (m) => {
    if (m === method) return;
    setMethod(m);
    setParity((p) => !p);
    setToggled(true);
    setStepIdx(0);
    setPlaying(false);
  };

  /* after a toggle, fly a chip from the balance check to the new plug line */
  useEffect(() => {
    if (!toggled || stepMode) return;
    const root = rootRef.current;
    const plugKey = method === "crm" ? "cta" : "fx";
    const val = method === "crm" ? tv.cta : tv.fx;
    const t = setTimeout(() => {
      const to = root && root.querySelector('[data-row="' + plugKey + '"] .fsa-num-v');
      flyChip(checkRef.current, to, (method === "crm" ? "CTA " : "gain ") + f0(val), val >= 0 ? "up" : "down", 750);
    }, 650);
    return () => clearTimeout(t);
  }, [method]); // eslint-disable-line react-hooks/exhaustive-deps

  /* auto-play in step-through mode */
  useEffect(() => {
    if (!stepMode || !playing) return;
    if (stepIdx >= order.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStepIdx((i) => i + 1), 2600);
    return () => clearTimeout(t);
  }, [stepMode, playing, stepIdx, order.length]);

  const balanced = Math.abs(tv.ta - tv.tle) < 0.005;
  const why = focusKey ? whyOf(focusKey, method, r, tv, L, e) : null;
  const focusLabel = focusKey ? ([...IS_ROWS, ...BS_ROWS].find((x) => x.k === focusKey) || {}).label : null;

  const netAssets = L.ta - L.tl;
  const netMon = L.cash + L.rec - L.ap - L.debt;
  const move = (C - r.H) / r.H;

  const ratios = [
    { label: "Current ratio", fn: (v) => (v.cash + v.rec + v.inv) / v.ap, kind: "x", pure: "BS" },
    { label: "Debt to equity", fn: (v) => v.debt / v.te, kind: "x", pure: "BS" },
    { label: "Gross margin", fn: (v) => v.gp / v.sales, kind: "pct", pure: "IS" },
    { label: "Net profit margin", fn: (v) => v.ni / v.sales, kind: "pct", pure: "IS" },
    { label: "Return on assets", fn: (v) => v.ni / v.ta, kind: "pct", pure: "mixed" },
    { label: "Total asset turnover", fn: (v) => v.sales / v.ta, kind: "x", pure: "mixed" },
  ];
  const showR = (x, kind) => (!Number.isFinite(x) ? "n/a" : kind === "pct" ? (x * 100).toFixed(1) + "%" : x.toFixed(2) + "x");
  const same = (a, b, kind) => showR(a, kind) === showR(b, kind);

  const reset = () => { setC(DEFAULT_RATES.C); setA(DEFAULT_RATES.A); };

  return (
    <div className="fsa-theater fxt" ref={rootRef}>
      <style>{CSS}</style>
      <header className="fsa-th-head">
        <div className="fsa-th-std">Translation workbench: Kestrel Europe (euro) into Pinnacle Corp (US dollar)</div>
        <h3>Watch every line pick its rate</h3>
        <p className="fsa-th-sum">
          Kestrel Europe's first year, starting on the acquisition date. Flip the method and watch which rate chips change, which numbers move, and where the balancing figure lands.
          Drag the current rate and the whole translation recomputes. Tap any line to see why it uses that rate.
        </p>
      </header>

      <div className="fxt-controls">
        <div className="fxt-seg" role="group" aria-label="Translation method">
          <button type="button" className={"fsa-btn" + (method === "crm" ? " fxt-on" : "")} aria-pressed={method === "crm"} onClick={() => switchMethod("crm")}>
            Current rate method <small>euro is functional</small>
          </button>
          <button type="button" className={"fsa-btn" + (method === "tmp" ? " fxt-on" : "")} aria-pressed={method === "tmp"} onClick={() => switchMethod("tmp")}>
            Temporal method <small>US dollar is functional</small>
          </button>
        </div>
        <div className="fxt-sliders">
          <label className="fxt-slider">
            <span>Current rate <b>{C.toFixed(2)}</b></span>
            <input type="range" min="0.70" max="1.50" step="0.01" value={C} onChange={(ev) => setC(parseFloat(ev.target.value))} aria-label="Current exchange rate, US dollars per euro" />
          </label>
          <label className="fxt-slider">
            <span>Average rate <b>{A.toFixed(2)}</b></span>
            <input type="range" min="0.80" max="1.40" step="0.01" value={A} onChange={(ev) => setA(parseFloat(ev.target.value))} aria-label="Average exchange rate for the year, US dollars per euro" />
          </label>
          <div className="fxt-fixed">
            Fixed: historical {r.H.toFixed(2)} (acquisition, opening inventory, share capital, PP&amp;E), ending inventory bought at {r.I.toFixed(2)}, dividend declared at {r.D.toFixed(2)}
          </div>
          <button type="button" className="fsa-btn" onClick={reset} title="Back to 1.00 and 1.10"><RotateCcw size={14} /> Reset rates</button>
        </div>
      </div>

      <div className="fxt-stepbar">
        {!stepMode ? (
          <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => { setStepMode(true); setStepIdx(0); setPlaying(false); }}>
            <Footprints size={15} /> Step through the {method === "crm" ? "current rate method" : "temporal method"} one line at a time
          </button>
        ) : (
          <>
            <button type="button" className="fsa-btn" onClick={() => { setPlaying(false); setStepIdx((i) => Math.max(0, i - 1)); }} disabled={stepIdx === 0}><ChevronLeft size={15} /></button>
            <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => { if (stepIdx >= order.length - 1) setStepIdx(0); setPlaying((p) => !p); }}>
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Play"}
            </button>
            <button type="button" className="fsa-btn" onClick={() => { setPlaying(false); setStepIdx((i) => Math.min(order.length - 1, i + 1)); }} disabled={stepIdx >= order.length - 1}>Next line <ChevronRight size={15} /></button>
            <span className="fxt-stepn">Line {stepIdx + 1} of {order.length}: <b>{focusLabel}</b></span>
            <button type="button" className="fsa-btn" onClick={() => { setStepMode(false); setPlaying(false); }}><X size={14} /> Show all</button>
            <span className="fxt-order">
              {method === "crm"
                ? "Order: income statement first, then retained earnings rolled forward, then the balance sheet, and the CTA last as the plug."
                : "Order: balance sheet first, retained earnings as the balance sheet plug, then the income statement, and the remeasurement gain or loss last as the income statement plug."}
            </span>
          </>
        )}
      </div>

      <div className="fxt-body">
        <div className="fxt-stmts">
          <Statement title="Income statement" rows={IS_ROWS} L={L} tv={tv} method={method} r={r} e={e} revealed={revealed} current={current} onPick={(k) => !stepMode && setPicked(k)} picked={stepMode ? null : picked} glowParity={parity} changedKeys={changedKeys} />
          <Statement title="Balance sheet" rows={BS_ROWS} L={L} tv={tv} method={method} r={r} e={e} revealed={revealed} current={current} onPick={(k) => !stepMode && setPicked(k)} picked={stepMode ? null : picked} glowParity={parity} changedKeys={changedKeys} />
          <div className="fsa-checks is-in">
            <span ref={checkRef} className={"fsa-check " + (balanced ? "ok" : "bad")}>
              {balanced ? "Balanced" : "Out of balance"}: assets {f0(tv.ta)} = liabilities {f0(tv.tl)} + equity {f0(tv.te)}
            </span>
            <span className="fsa-check ok">
              {method === "crm" ? "Balancing figure: CTA " + f0(tv.cta) + " in OCI" : "Balancing figure: remeasurement " + (tv.fx >= 0 ? "gain " : "loss ") + f0(Math.abs(tv.fx)) + " in net income"}
            </span>
          </div>
        </div>

        <aside className="fxt-side">
          <div className="fxt-card fxt-why" key={method + ":" + focusKey}>
            <div className="fxt-card-t">{focusKey ? "Why this rate: " + focusLabel : "Why this rate"}</div>
            {why ? <p>{why}</p> : <p className="fsa-dim">Tap any line of either statement, or step through, to see the rule and the arithmetic for that line.</p>}
          </div>

          <div className="fxt-card">
            <div className="fxt-card-t">{method === "crm" ? "Retained earnings: rolled forward" : "Retained earnings: plug first, net income second"}</div>
            {method === "crm" ? (
              <table className="fxt-mini"><tbody>
                <tr><td>Beginning retained earnings</td><td>0</td></tr>
                <tr><td>+ Net income (average rate)</td><td>{f0(tv.ni)}</td></tr>
                <tr><td>- Dividends: EUR {e.div} x {r.D.toFixed(2)}</td><td>({f0(tv.divs)})</td></tr>
                <tr className="last"><td>Ending retained earnings</td><td>{f0(tv.re)}</td></tr>
                <tr><td>CTA = assets - liabilities - share capital - RE</td><td>{f0(tv.cta)}</td></tr>
              </tbody></table>
            ) : (
              <table className="fxt-mini"><tbody>
                <tr><td>Retained earnings from the balance sheet</td><td>{f0(tv.re)}</td></tr>
                <tr><td>+ Dividends: EUR {e.div} x {r.D.toFixed(2)}</td><td>{f0(tv.divs)}</td></tr>
                <tr><td>- Beginning retained earnings</td><td>0</td></tr>
                <tr className="last"><td>= Net income</td><td>{f0(tv.ni)}</td></tr>
                <tr><td>Income before remeasurement</td><td>{f0(tv.pre)}</td></tr>
                <tr className="last"><td>Remeasurement gain (loss)</td><td>{f0(tv.fx)}</td></tr>
              </tbody></table>
            )}
          </div>

          <div className="fxt-card">
            <div className="fxt-card-t">Exposure: what the rate move hits</div>
            <p className="fxt-move">
              The euro is at {C.toFixed(2)}, {Math.abs(move) < 0.0005 ? "unchanged" : (move > 0 ? "up " : "down ") + Math.abs(move * 100).toFixed(1) + "%"} since acquisition at {r.H.toFixed(2)}.
            </p>
            <div className={"fxt-expo" + (method === "crm" ? " is-on" : "")}>
              <b>Current rate method:</b> exposure is net ASSETS, EUR {fmt(netAssets)}. A stronger euro gives a positive translation adjustment, a weaker euro a negative one. Now: CTA <b className={crmV.cta >= 0 ? "fxt-up" : "fxt-down"}>{f0(crmV.cta)}</b> in OCI.
            </div>
            <div className={"fxt-expo" + (method === "tmp" ? " is-on" : "")}>
              <b>Temporal method:</b> exposure is the net MONETARY position, cash {fmt(L.cash)} + receivables {fmt(L.rec)} - payables {fmt(L.ap)} - debt {fmt(L.debt)} = EUR {fmt(netMon)}, a net monetary {netMon < 0 ? "liability" : "asset"}. A stronger euro gives a remeasurement {netMon < 0 ? "loss" : "gain"}, a weaker euro a {netMon < 0 ? "gain" : "loss"}. Now: <b className={tmpV.fx >= 0 ? "fxt-up" : "fxt-down"}>{f0(tmpV.fx)}</b> in net income.
            </div>
            <ExposureChart r={r} L={L} e={e} />
            <div className="fxt-legend">
              <span><i style={{ background: "var(--accent)" }} /> CTA (current rate method)</span>
              <span><i style={{ background: "var(--purple)" }} /> Remeasurement gain or loss (temporal)</span>
            </div>
            <p className="fsa-dim fxt-note">Horizontal axis: year-end rate. The slope of each line is its exposure in euros: each 0.01 rise in the rate changes the CTA by 0.01 x EUR {fmt(netAssets)} = USD {f0(netAssets * 0.01)} and the remeasurement result by 0.01 x EUR {fmt(netMon)} = USD {f0(netMon * 0.01)}.</p>
          </div>
        </aside>
      </div>

      <div className="fsa-ratios">
        <table>
          <thead>
            <tr>
              <th>Ratio</th>
              <th>Euro (local)</th>
              <th>Current rate method</th>
              <th>Temporal method</th>
            </tr>
          </thead>
          <tbody>
            {ratios.map((q) => {
              const lv = q.fn(L), cv = q.fn(crmV), tv2 = q.fn(tmpV);
              return (
                <tr key={q.label}>
                  <td>{q.label} <small className="fxt-pure">{q.pure === "mixed" ? "mixed: income statement over balance sheet" : q.pure === "IS" ? "income statement only" : "balance sheet only"}</small></td>
                  <td>{showR(lv, q.kind)}</td>
                  <td className={same(lv, cv, q.kind) ? "fxt-same" : "fxt-diff"}>{showR(cv, q.kind)} {same(lv, cv, q.kind) ? "=" : ""}</td>
                  <td className={same(lv, tv2, q.kind) ? "fxt-same" : "fxt-diff"}>{showR(tv2, q.kind)} {same(lv, tv2, q.kind) ? "=" : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="fsa-dim fxt-note">
        "=" marks a ratio identical to the euro ratio. Under the current rate method every balance sheet line uses one rate and every income statement line another, so ratios built inside one statement survive; ratios that mix the two do not. The temporal method mixes rates inside each statement, so almost nothing survives.
      </p>
    </div>
  );
}

const CSS = `
.fxt .fxt-controls { display: flex; flex-wrap: wrap; gap: 0.9rem 1.4rem; align-items: flex-start; margin: 0.9rem 0 0.6rem; padding: 0.6rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.fxt .fxt-seg { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.fxt .fxt-seg .fsa-btn { flex-direction: column; align-items: flex-start; gap: 0; line-height: 1.2; }
.fxt .fxt-seg .fsa-btn small { font-weight: 400; font-size: 0.7rem; color: var(--text-faint); }
.fxt .fsa-btn.fxt-on { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
.fxt .fsa-btn.fxt-on small { color: var(--accent); }
.fxt .fxt-sliders { display: flex; flex-wrap: wrap; gap: 0.6rem 1.1rem; align-items: center; flex: 1; min-width: 260px; }
.fxt .fxt-slider { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.8rem; color: var(--text-dim); min-width: 170px; }
.fxt .fxt-slider b { font-family: var(--mono); color: var(--text); }
.fxt .fxt-slider input { accent-color: var(--accent); width: 100%; }
.fxt .fxt-fixed { font-size: 0.74rem; color: var(--text-faint); max-width: 420px; }
.fxt .fxt-stepbar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem; margin: 0.4rem 0 0.9rem; }
.fxt .fxt-stepn { font-size: 0.82rem; color: var(--text-dim); }
.fxt .fxt-order { flex-basis: 100%; font-size: 0.78rem; color: var(--text-faint); }
.fxt .fxt-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(260px, 340px); gap: 1.1rem; align-items: start; }
@media (max-width: 1080px) { .fxt .fxt-body { grid-template-columns: minmax(0, 1fr); } }
.fxt .fxt-stmts { display: grid; gap: 0.8rem; min-width: 0; }
.fxt .fxt-stmt tr.fxt-row { cursor: pointer; }
.fxt .fxt-stmt tr.fxt-row:hover { background: var(--bg-hover); }
.fxt .fxt-ratecol { text-align: center !important; }
.fxt .fxt-ratecell { text-align: center; white-space: nowrap; perspective: 300px; }
.fxt .fxt-chip { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.68rem; padding: 0.06rem 0.45rem; border-radius: 99px; border: 1px solid currentColor; font-weight: 600; animation: fxt-flip .5s cubic-bezier(.2,.8,.2,1); transform-origin: 50% 50%; }
.fxt .fxt-chip b { font-family: var(--mono); font-weight: 650; }
.fxt .fxt-c-C { color: var(--accent); background: var(--accent-soft); }
.fxt .fxt-c-A { color: var(--cyan); background: var(--cyan-soft); }
.fxt .fxt-c-H { color: var(--amber); background: var(--amber-soft); }
.fxt .fxt-c-mix { color: var(--amber); background: var(--amber-soft); border-style: dashed; }
.fxt .fxt-c-roll { color: var(--green); background: var(--green-soft); }
.fxt .fxt-c-plug { color: var(--purple); background: var(--purple-soft); }
.fxt .fxt-c-sum { color: var(--text-faint); border-color: transparent; font-weight: 500; }
.fxt .fxt-c-none { color: var(--text-faint); border-style: dotted; font-weight: 500; }
.fxt .fxt-c-pend { color: var(--text-faint); border-color: var(--border); animation: none; }
.fxt .fxt-pend { color: var(--text-faint); }
.fxt tr.fxt-plugrow { background: color-mix(in srgb, var(--purple) 8%, transparent); }
.fxt tr.fxt-plugrow .fsa-lbl { font-weight: 650; color: var(--purple); }
.fxt tr.fxt-unused .fsa-lbl, .fxt tr.fxt-unused .fsa-num-v { color: var(--text-faint); text-decoration: line-through; text-decoration-color: var(--border-strong); }
.fxt tr.fxt-current { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
.fxt tr.fxt-picked { box-shadow: inset 3px 0 0 var(--accent); }
@keyframes fxt-flip { from { transform: rotateX(90deg); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes fxt-glowA { 0% { background-color: color-mix(in srgb, var(--amber) 32%, transparent); } 100% { background-color: transparent; } }
@keyframes fxt-glowB { 0% { background-color: color-mix(in srgb, var(--amber) 32%, transparent); } 100% { background-color: transparent; } }
.fxt .fxt-side { display: grid; gap: 0.8rem; min-width: 0; }
.fxt .fxt-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); padding: 0.75rem 0.9rem; font-size: 0.85rem; }
.fxt .fxt-card p { margin: 0.35rem 0; line-height: 1.55; }
.fxt .fxt-card-t { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-faint); font-weight: 650; }
.fxt .fxt-why { border-left: 3px solid var(--accent); animation: fsa-slidein .35s ease-out; }
.fxt .fxt-mini { margin: 0.4rem 0 0; width: 100%; font-size: 0.8rem; }
.fxt .fxt-mini td { border: none; padding: 0.18rem 0; background: transparent !important; }
.fxt .fxt-mini td:last-child { text-align: right; font-family: var(--mono); white-space: nowrap; }
.fxt .fxt-mini tr.last td { font-weight: 650; border-top: 1px solid var(--border-strong); }
.fxt .fxt-move { font-size: 0.82rem; color: var(--text-dim); }
.fxt .fxt-expo { font-size: 0.8rem; padding: 0.4rem 0.55rem; border-radius: var(--radius-sm); margin: 0.35rem 0; color: var(--text-dim); border: 1px solid transparent; transition: all .3s; }
.fxt .fxt-expo.is-on { border-color: var(--border-strong); background: var(--bg-raised); color: var(--text); }
.fxt .fxt-up { color: var(--green); font-family: var(--mono); }
.fxt .fxt-down { color: var(--red); font-family: var(--mono); }
.fxt .fxt-chart { width: 100%; height: auto; margin-top: 0.4rem; }
.fxt .fxt-legend { display: flex; flex-wrap: wrap; gap: 0.3rem 0.9rem; font-size: 0.72rem; color: var(--text-dim); }
.fxt .fxt-legend i { display: inline-block; width: 0.8rem; height: 0.2rem; border-radius: 2px; vertical-align: middle; margin-right: 0.3rem; }
.fxt .fxt-note { font-size: 0.76rem; margin-top: 0.5rem; }
.fxt .fxt-pure { display: block; font-size: 0.68rem; color: var(--text-faint); }
.fxt .fsa-ratios td.fxt-same { color: var(--green); }
.fxt .fsa-ratios td.fxt-diff { color: var(--amber); }
@media (prefers-reduced-motion: reduce) {
  .fxt .fxt-chip, .fxt .fxt-why { animation: none !important; }
  .fxt tr.fxt-row { animation: none !important; }
}
`;
