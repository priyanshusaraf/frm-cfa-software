import React, { useMemo, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw, ChevronRight, Eye } from "lucide-react";
import { prefersReducedMotion } from "../components/motion.js";

/* Manipulation radar (LM14, LOS d, f, h, j, l): a "spot the red flags" game.
   Each demo company has three years of condensed statements with planted
   problems. The student taps the lines that look wrong, then reveals. An
   issue counts as found if ANY of its evidence lines was tapped; a tapped line
   that belongs to no issue is a false alarm. Subtotals and analyst ratios are
   computed from the raw lines, and every explanation computes its numbers from
   the same data, so editing a demo value keeps the story consistent. */

const YEARS = ["Year 1", "Year 2", "Year 3"];

const grow = (a, i) => a[i] / a[i - 1] - 1;
const pc = (x) => (x * 100).toFixed(1) + "%";
const n0 = (x) => Math.round(x).toLocaleString("en-US");
const n1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
const zip = (fn, ...arrs) => arrs[0].map((_, i) => fn(...arrs.map((a) => a[i])));

export const COMPANIES = [
  {
    id: "lumen",
    name: "Lumen Devices",
    blurb: "Consumer electronics maker. Management's letter celebrates a record year 3: net income up 60%.",
    sections: [
      {
        title: "Income statement",
        rows: [
          { id: "rev", label: "Revenue", vals: [1000, 1100, 1210] },
          { id: "cogs", label: "Cost of sales", vals: [600, 660, 726] },
          { id: "sga", label: "SG&A expense", vals: [250, 265, 289] },
          { id: "dep", label: "Depreciation", vals: [50, 55, 60] },
          { id: "gain", label: "Gain on sale of equipment", vals: [0, 0, 45] },
          { id: "op", label: "Operating income", sub: true, calc: (g) => zip((r, c, s, d, x) => r - c - s - d + x, g("rev"), g("cogs"), g("sga"), g("dep"), g("gain")) },
          { id: "int", label: "Interest expense", vals: [20, 20, 20] },
          { id: "ni", label: "Net income (taxes ignored)", sub: true, calc: (g) => zip((o, i) => o - i, g("op"), g("int")) },
        ],
      },
      {
        title: "Balance sheet (year end)",
        rows: [
          { id: "rec", label: "Accounts receivable", vals: [150, 200, 290] },
          { id: "inv", label: "Inventory", vals: [120, 150, 210] },
          { id: "ppe", label: "PP&E (net)", vals: [500, 520, 455] },
          { id: "oth", label: "Other assets", vals: [50, 52, 54] },
        ],
      },
      {
        title: "Cash flow statement",
        rows: [
          { id: "cfo", label: "Cash from operations (CFO)", vals: [110, 75, 25] },
          { id: "capex", label: "Capital expenditure", vals: [-60, -75, -70] },
          { id: "proc", label: "Proceeds from sale of equipment", vals: [0, 0, 120] },
        ],
      },
    ],
    helpers: [
      { label: "Revenue growth", calc: (g, i) => (i ? grow(g("rev"), i) : null), fmt: pc },
      { label: "Days sales outstanding", calc: (g, i) => (g("rec")[i] / g("rev")[i]) * 365, fmt: n1 },
      { label: "Days of inventory on hand", calc: (g, i) => (g("inv")[i] / g("cogs")[i]) * 365, fmt: n1 },
      { label: "CFO / net income", calc: (g, i) => g("cfo")[i] / g("ni")[i], fmt: (x) => x.toFixed(2) + "x" },
      { label: "Operating income excluding the gain", calc: (g, i) => g("op")[i] - g("gain")[i], fmt: n0 },
    ],
    issues: [
      {
        id: "rec", title: "Receivables racing ahead of sales", rows: ["rec"],
        why: (g) => "Receivables grew " + pc(grow(g("rec"), 1)) + " and then " + pc(grow(g("rec"), 2)) + " while revenue grew " + pc(grow(g("rev"), 2)) + " a year. Days sales outstanding went from " + n1(g("rec")[0] / g("rev")[0] * 365) + " to " + n1(g("rec")[2] / g("rev")[2] * 365) + " days: either customers are paying much more slowly, or some revenue was booked before it was earned (aggressive recognition, channel stuffing). This is the DSRI red flag in the Beneish model.",
      },
      {
        id: "inv", title: "Inventory build", rows: ["inv"],
        why: (g) => "Inventory rose " + pc(grow(g("inv"), 1)) + " and " + pc(grow(g("inv"), 2)) + " against " + pc(grow(g("cogs"), 2)) + " growth in cost of sales, so days of inventory went from " + n1(g("inv")[0] / g("cogs")[0] * 365) + " to " + n1(g("inv")[2] / g("cogs")[2] * 365) + ". Stock is piling up faster than it sells: possible obsolete inventory that has not been written down, which would overstate both assets and gross profit.",
      },
      {
        id: "gain", title: "A one-off gain inside operating income", rows: ["gain", "proc"],
        why: (g) => {
          const op = g("op"), gain = g("gain");
          return "The " + n0(gain[2]) + " gain on selling equipment is non-recurring and comes from an investing decision, yet it sits inside operating income. Without it, year 3 operating income is " + n0(op[2] - gain[2]) + ", up " + pc((op[2] - gain[2]) / op[1] - 1) + ", not " + n0(op[2]) + ", up " + pc(grow(op, 2)) + ". The cash from the sale (" + n0(g("proc")[2]) + ") correctly sits in investing, which is exactly why it does not belong in operating income.";
        },
      },
      {
        id: "cfo", title: "Cash from operations falling as profit rises", rows: ["cfo"],
        why: (g) => "Net income went " + n0(g("ni")[0]) + ", " + n0(g("ni")[1]) + ", " + n0(g("ni")[2]) + " while CFO went " + n0(g("cfo")[0]) + ", " + n0(g("cfo")[1]) + ", " + n0(g("cfo")[2]) + ". CFO / net income collapsed from " + (g("cfo")[0] / g("ni")[0]).toFixed(2) + "x to " + (g("cfo")[2] / g("ni")[2]).toFixed(2) + "x. Earnings made of accruals (receivables, inventory, a non-cash gain) are the least persistent kind.",
      },
    ],
  },
  {
    id: "northgate",
    name: "Northgate Logistics",
    blurb: "Trucking and warehousing. Margins have widened two years running and cash from operations looks healthy.",
    sections: [
      {
        title: "Income statement",
        rows: [
          { id: "rev", label: "Revenue", vals: [2000, 2100, 2200] },
          { id: "opex", label: "Operating expenses", vals: [1500, 1575, 1650] },
          { id: "dep", label: "Depreciation", vals: [200, 190, 160] },
          { id: "restr", label: "Restructuring charges (labelled non-recurring)", vals: [30, 35, 40] },
          { id: "op", label: "Operating income", sub: true, calc: (g) => zip((r, o, d, x) => r - o - d - x, g("rev"), g("opex"), g("dep"), g("restr")) },
          { id: "int", label: "Interest expense", vals: [50, 60, 75] },
          { id: "ni", label: "Net income (taxes ignored)", sub: true, calc: (g) => zip((o, i) => o - i, g("op"), g("int")) },
        ],
      },
      {
        title: "Balance sheet (year end)",
        rows: [
          { id: "rec", label: "Accounts receivable", vals: [250, 262, 275] },
          { id: "ppeG", label: "PP&E at cost (gross)", vals: [2000, 2200, 2400] },
          { id: "capdev", label: "Capitalized software and development costs", vals: [40, 110, 210] },
          { id: "debt", label: "Total debt", vals: [1000, 1200, 1500] },
        ],
      },
      {
        title: "Cash flow statement",
        rows: [
          { id: "cfo", label: "Cash from operations (CFO)", vals: [420, 418, 422] },
          { id: "capex", label: "Capital expenditure on PP&E", vals: [-200, -200, -200] },
          { id: "capdevCF", label: "Capitalized development costs paid", vals: [-40, -70, -100] },
        ],
      },
    ],
    helpers: [
      { label: "Depreciation / gross PP&E", calc: (g, i) => g("dep")[i] / g("ppeG")[i], fmt: pc },
      { label: "Implied useful life (gross PP&E / depreciation), years", calc: (g, i) => g("ppeG")[i] / g("dep")[i], fmt: n1 },
      { label: "Operating margin", calc: (g, i) => g("op")[i] / g("rev")[i], fmt: pc },
      { label: "CFO + all investing outflows", calc: (g, i) => g("cfo")[i] + g("capex")[i] + g("capdevCF")[i], fmt: n0 },
      { label: "Days sales outstanding", calc: (g, i) => (g("rec")[i] / g("rev")[i]) * 365, fmt: n1 },
    ],
    issues: [
      {
        id: "dep", title: "Depreciation falling while the fleet grows", rows: ["dep", "ppeG"],
        why: (g) => "Gross PP&E grew from " + n0(g("ppeG")[0]) + " to " + n0(g("ppeG")[2]) + " but depreciation fell from " + n0(g("dep")[0]) + " to " + n0(g("dep")[2]) + ". Depreciation as a share of gross PP&E dropped from " + pc(g("dep")[0] / g("ppeG")[0]) + " to " + pc(g("dep")[2] / g("ppeG")[2]) + ", so the implied useful life stretched from " + n1(g("ppeG")[0] / g("dep")[0]) + " to " + n1(g("ppeG")[2] / g("dep")[2]) + " years. Unless the trucks really last longer, management has lengthened lives to cut expense. This is what the Beneish DEPI picks up.",
      },
      {
        id: "cap", title: "Costs moving onto the balance sheet", rows: ["capdev", "capdevCF"],
        why: (g) => "Capitalized software and development costs went from " + n0(g("capdev")[0]) + " to " + n0(g("capdev")[2]) + ", " + (g("capdev")[2] / g("capdev")[0]).toFixed(1) + " times the year 1 balance, in a trucking company. Every unit capitalized is an expense that skipped the income statement and an outflow that left CFO for investing. That is why CFO looks steady: CFO plus all investing outflows is only " + n0(g("cfo")[2] + g("capex")[2] + g("capdevCF")[2]) + " in year 3. A growing share of soft assets is the Beneish AQI red flag.",
      },
      {
        id: "restr", title: "'Non-recurring' charges that recur", rows: ["restr"],
        why: (g) => "Restructuring charges of " + n0(g("restr")[0]) + ", " + n0(g("restr")[1]) + " and " + n0(g("restr")[2]) + " in three straight years are a cost of doing business, not a one-off. If management's 'adjusted' earnings add them back, recurring costs are being presented as non-recurring, which overstates sustainable earnings. Watch also for ordinary operating costs being reclassified into such charges (classification shifting).",
      },
    ],
  },
  {
    id: "crestline",
    name: "Crestline Foods",
    blurb: "Packaged foods, mature and slow growing. Year 3 brings a surprise: CFO nearly doubles and margins jump.",
    sections: [
      {
        title: "Income statement",
        rows: [
          { id: "rev", label: "Revenue", vals: [3000, 3060, 3120] },
          { id: "cogs", label: "Cost of sales", vals: [2100, 2142, 2184] },
          { id: "sga", label: "SG&A expense", vals: [600, 612, 560] },
          { id: "op", label: "Operating income", sub: true, calc: (g) => zip((r, c, s) => r - c - s, g("rev"), g("cogs"), g("sga")) },
          { id: "int", label: "Interest expense", vals: [40, 40, 40] },
          { id: "ni", label: "Net income (taxes ignored)", sub: true, calc: (g) => zip((o, i) => o - i, g("op"), g("int")) },
        ],
      },
      {
        title: "Balance sheet (year end)",
        rows: [
          { id: "rec", label: "Accounts receivable", vals: [400, 410, 250] },
          { id: "inv", label: "Inventory", vals: [300, 306, 312] },
          { id: "ap", label: "Accounts payable", vals: [280, 290, 420] },
          { id: "prov", label: "Warranty and restructuring provisions", vals: [120, 125, 70] },
        ],
      },
      {
        title: "Cash flow statement",
        rows: [
          { id: "cfo", label: "Cash from operations (CFO)", vals: [300, 290, 590] },
          { id: "capex", label: "Capital expenditure", vals: [-150, -150, -150] },
        ],
      },
    ],
    helpers: [
      { label: "Days sales outstanding", calc: (g, i) => (g("rec")[i] / g("rev")[i]) * 365, fmt: n1 },
      { label: "Days payables outstanding", calc: (g, i) => (g("ap")[i] / g("cogs")[i]) * 365, fmt: n1 },
      { label: "Days of inventory on hand", calc: (g, i) => (g("inv")[i] / g("cogs")[i]) * 365, fmt: n1 },
      { label: "SG&A / revenue", calc: (g, i) => g("sga")[i] / g("rev")[i], fmt: pc },
      { label: "CFO / net income", calc: (g, i) => g("cfo")[i] / g("ni")[i], fmt: (x) => x.toFixed(2) + "x" },
    ],
    issues: [
      {
        id: "rec", title: "Receivables vanish while sales grow", rows: ["rec"],
        why: (g) => "Revenue grew " + pc(grow(g("rev"), 2)) + " but receivables fell from " + n0(g("rec")[1]) + " to " + n0(g("rec")[2]) + ": days sales outstanding dropped from " + n1(g("rec")[1] / g("rev")[1] * 365) + " to " + n1(g("rec")[2] / g("rev")[2] * 365) + ". Collection time falling by " + pc(1 - (g("rec")[2] / g("rev")[2]) / (g("rec")[1] / g("rev")[1])) + " in one year is not how a mature business behaves. The likely story is receivables sold or securitized at year end, which pulls next year's collections into this year's CFO. Look for a factoring or securitization note.",
      },
      {
        id: "ap", title: "Suppliers paid much later", rows: ["ap"],
        why: (g) => "Payables jumped from " + n0(g("ap")[1]) + " to " + n0(g("ap")[2]) + " on cost of sales up only " + pc(grow(g("cogs"), 2)) + ". Days payables outstanding stretched from " + n1(g("ap")[1] / g("cogs")[1] * 365) + " to " + n1(g("ap")[2] / g("cogs")[2] * 365) + " days. Holding back supplier payments lifts CFO once and reverses when the bills are paid.",
      },
      {
        id: "jar", title: "A cookie jar being emptied", rows: ["prov", "sga"],
        why: (g) => "SG&A fell from " + n0(g("sga")[1]) + " to " + n0(g("sga")[2]) + " (" + pc(g("sga")[1] / g("rev")[1]) + " to " + pc(g("sga")[2] / g("rev")[2]) + " of revenue) in the same year provisions dropped from " + n0(g("prov")[1]) + " to " + n0(g("prov")[2]) + ". Releasing reserves built up in earlier years reduces expenses with no change in the business: the operating margin improves on paper only.",
      },
      {
        id: "cfo", title: "A CFO jump earnings cannot explain", rows: ["cfo"],
        why: (g) => "CFO went from " + n0(g("cfo")[1]) + " to " + n0(g("cfo")[2]) + " (+" + pc(grow(g("cfo"), 2)) + ") while net income rose " + pc(grow(g("ni"), 2)) + ". The extra cash comes from working capital moves (receivables down " + n0(g("rec")[1] - g("rec")[2]) + ", payables up " + n0(g("ap")[2] - g("ap")[1]) + "), which are one-off, not from a better business. Sustainable CFO comes from operations that repeat.",
      },
    ],
  },
];

export function resolver(company) {
  const raw = {};
  const calcs = {};
  company.sections.forEach((s) => s.rows.forEach((r) => { if (r.calc) calcs[r.id] = r.calc; else raw[r.id] = r.vals; }));
  const memo = {};
  const g = (id) => {
    if (raw[id]) return raw[id];
    if (memo[id]) return memo[id];
    if (!calcs[id]) return [NaN, NaN, NaN];
    memo[id] = calcs[id](g);
    return memo[id];
  };
  return g;
}

function fmtCell(x) {
  if (!Number.isFinite(x)) return "n/a";
  if (Math.abs(x) < 0.005) return "-";
  const s = Math.abs(Math.round(x)).toLocaleString("en-US");
  return x < 0 ? "(" + s + ")" : s;
}

export default function ManipulationRadar() {
  const [ci, setCi] = useState(0);
  const [picks, setPicks] = useState(() => new Set());
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const [totals, setTotals] = useState({ played: 0, score: 0, max: 0 });

  const co = COMPANIES[ci];
  const g = useMemo(() => resolver(co), [co]);
  const issueOf = useMemo(() => {
    const m = {};
    co.issues.forEach((is) => is.rows.forEach((r) => { m[r] = is.id; }));
    return m;
  }, [co]);

  const found = co.issues.filter((is) => is.rows.some((r) => picks.has(r)));
  const falseAlarms = [...picks].filter((r) => !issueOf[r]);
  const score = Math.max(0, found.length - falseAlarms.length - (hint ? 1 : 0));

  const toggle = (id) => {
    if (revealed) return;
    setPicks((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const reveal = () => {
    setRevealed(true);
    setTotals((t) => ({ played: t.played + 1, score: t.score + score, max: t.max + co.issues.length }));
  };
  const next = (step = 1) => {
    setCi((i) => (i + step + COMPANIES.length) % COMPANIES.length);
    setPicks(new Set()); setRevealed(false); setHint(false);
  };
  const replay = () => { setPicks(new Set()); setRevealed(false); setHint(false); };

  const rowState = (id) => {
    const picked = picks.has(id);
    if (!revealed) return picked ? "picked" : "";
    const iss = issueOf[id];
    if (iss && picked) return "hit";
    if (iss && !picked) return found.some((f) => f.id === iss) ? "hit-alt" : "missed";
    if (!iss && picked) return "false";
    return "";
  };
  const bgFor = { picked: "var(--accent-soft)", hit: "var(--green-soft)", "hit-alt": "var(--green-soft)", missed: "var(--amber-soft)", false: "var(--red-soft)" };

  const cellS = { padding: "0.26rem 0.6rem", borderTop: "1px solid var(--border)", background: "transparent" };

  return (
    <div className="fsa-theater">
      <div className="fsa-th-head">
        <div className="fsa-th-std">Manipulation radar · company {ci + 1} of {COMPANIES.length}</div>
        <h3>Spot the red flags: {co.name}</h3>
        <div className="fsa-th-sum">{co.blurb} Tap every line you think an analyst should question, then reveal. Each planted issue counts once; each clean line you tap is a false alarm.</div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", margin: "0.8rem 0" }}>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>{picks.size} line{picks.size === 1 ? "" : "s"} tapped</span>
        {!revealed && !hint && (
          <button type="button" className="fsa-btn" onClick={() => setHint(true)}><Eye size={14} /> Show analyst ratios (costs 1 point)</button>
        )}
        <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "var(--text-faint)", fontFamily: "var(--mono)" }}>
          Session: {totals.score} / {totals.max} over {totals.played} round{totals.played === 1 ? "" : "s"}
        </span>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", overflowX: "auto" }}>
        <table style={{ margin: 0, fontSize: "0.84rem", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ ...cellS, borderTop: "none", textAlign: "left", background: "var(--bg-inset)" }}>{co.name}</th>
              {YEARS.map((y) => <th key={y} style={{ ...cellS, borderTop: "none", textAlign: "right", background: "var(--bg-inset)", minWidth: "5rem" }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {co.sections.map((s) => (
              <React.Fragment key={s.title}>
                <tr><td colSpan={4} style={{ ...cellS, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-faint)", fontWeight: 650, paddingTop: "0.6rem" }}>{s.title}</td></tr>
                {s.rows.map((r) => {
                  const vals = g(r.id);
                  if (r.sub) {
                    return (
                      <tr key={r.id}>
                        <td style={{ ...cellS, fontWeight: 650, color: "var(--text-dim)" }}>{r.label}</td>
                        {vals.map((v, i) => <td key={i} style={{ ...cellS, textAlign: "right", fontFamily: "var(--mono)", fontWeight: 650, color: "var(--text-dim)" }}>{fmtCell(v)}</td>)}
                      </tr>
                    );
                  }
                  const st = rowState(r.id);
                  return (
                    <tr
                      key={r.id}
                      role="button"
                      tabIndex={revealed ? -1 : 0}
                      aria-pressed={picks.has(r.id)}
                      onClick={() => toggle(r.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(r.id); } }}
                      style={{ cursor: revealed ? "default" : "pointer", transition: prefersReducedMotion() ? "none" : "background-color .3s" }}
                    >
                      <td style={{ ...cellS, paddingLeft: "1.1rem", background: bgFor[st] || "transparent", color: st === "picked" ? "var(--accent)" : "var(--text)", fontWeight: st === "picked" ? 600 : 400 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                          {(st === "hit" || st === "hit-alt") && <CheckCircle2 size={13} style={{ color: "var(--green)" }} />}
                          {st === "missed" && <AlertTriangle size={13} style={{ color: "var(--amber)" }} />}
                          {st === "false" && <XCircle size={13} style={{ color: "var(--red)" }} />}
                          {r.label}
                        </span>
                      </td>
                      {vals.map((v, i) => <td key={i} style={{ ...cellS, textAlign: "right", fontFamily: "var(--mono)", background: bgFor[st] || "transparent" }}>{fmtCell(v)}</td>)}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            {(hint || revealed) && (
              <>
                <tr><td colSpan={4} style={{ ...cellS, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--purple)", fontWeight: 650, paddingTop: "0.6rem" }}>Analyst ratios (computed from the lines above)</td></tr>
                {co.helpers.map((h) => (
                  <tr key={h.label}>
                    <td style={{ ...cellS, color: "var(--purple)" }}>{h.label}</td>
                    {YEARS.map((_, i) => {
                      const v = h.calc(g, i);
                      return <td key={i} style={{ ...cellS, textAlign: "right", fontFamily: "var(--mono)", color: "var(--purple)" }}>{v == null || !Number.isFinite(v) ? "" : h.fmt(v)}</td>;
                    })}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {!revealed ? (
        <div className="fsa-pr-bar">
          <span className="fsa-dim">Hint: compare each line's growth with revenue's, and compare net income with cash from operations.</span>
          <button type="button" className="fsa-btn fsa-btn-primary" onClick={reveal}>Reveal the red flags</button>
        </div>
      ) : (
        <div style={{ marginTop: "1rem", animation: prefersReducedMotion() ? "none" : "fsa-slidein .4s" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 750, color: score === co.issues.length ? "var(--green)" : score > 0 ? "var(--amber)" : "var(--red)" }}>{score} / {co.issues.length}</span>
            <span className="fsa-dim">
              {found.length} of {co.issues.length} issues found, {falseAlarms.length} false alarm{falseAlarms.length === 1 ? "" : "s"}{hint ? ", 1 point for the ratios" : ""}.
            </span>
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {co.issues.map((is) => {
              const ok = found.some((f) => f.id === is.id);
              return (
                <div key={is.id} className={"fsa-callout " + (ok ? "tone-example" : "tone-flag")} style={{ maxWidth: "none" }}>
                  <b>{ok ? "Found: " : "Missed: "}{is.title}</b>
                  <div>{is.why(g)}</div>
                </div>
              );
            })}
            {falseAlarms.length > 0 && (
              <div className="fsa-callout tone-trap" style={{ maxWidth: "none" }}>
                <b>False alarms</b>
                <div>
                  {falseAlarms.map((id) => co.sections.flatMap((s) => s.rows).find((r) => r.id === id).label).join(", ")}: nothing planted here. A line that moves in step with revenue, or that the other statements explain, is not a red flag on its own.
                </div>
              </div>
            )}
          </div>
          <div className="fsa-pr-bar">
            <button type="button" className="fsa-btn" onClick={replay}><RotateCcw size={14} /> Try this company again</button>
            <button type="button" className="fsa-btn fsa-btn-primary" onClick={() => next(1)}>Next company <ChevronRight size={14} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
