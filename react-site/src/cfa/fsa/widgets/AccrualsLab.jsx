import React, { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Play } from "lucide-react";
import { useTween, prefersReducedMotion } from "../components/motion.js";
import { fmt } from "../engine/ledger.js";

/* Accruals lab (LM14, LOS e and g).
   Two demo companies report the same net income with very different cash
   content. The student edits balance sheet and cash flow inputs; the widget
   computes net operating assets (NOA), the balance-sheet and cash-flow
   aggregate accruals and both accruals ratios exactly as the curriculum
   defines them. The lower chart is an ILLUSTRATIVE model only: persistence is
   tied to the cash-flow accruals ratio so the student can see the direction
   of the effect, not a curriculum estimate. */

const DEMO = [
  {
    id: "a",
    name: "Steadfast Brewing",
    blurb: "Profit mostly arrives as cash.",
    tone: "var(--accent)",
    d: { taB: 1300, cashB: 200, tlB: 600, debtB: 500, taE: 1340, cashE: 220, tlE: 620, debtE: 520, ni: 100, cfo: 130, cfi: -50 },
  },
  {
    id: "b",
    name: "Gilded Gadgets",
    blurb: "Same profit, built on growing receivables, inventory and capitalized costs.",
    tone: "var(--amber)",
    d: { taB: 1300, cashB: 200, tlB: 600, debtB: 500, taE: 1560, cashE: 180, tlE: 640, debtE: 500, ni: 100, cfo: 10, cfi: -150 },
  },
];

const STOCK_ROWS = [
  { k: "ta", label: "Total assets" },
  { k: "cash", label: "Cash and short-term investments" },
  { k: "tl", label: "Total liabilities" },
  { k: "debt", label: "Total debt" },
];
const FLOW_ROWS = [
  { k: "ni", label: "Net income" },
  { k: "cfo", label: "Cash from operations (CFO)" },
  { k: "cfi", label: "Cash from investing (CFI)" },
];

const YEARS = 8;
const PHI_MAX = 0.9;
const PHI_MIN = 0.2;

function calc(d) {
  const noaB = d.taB - d.cashB - (d.tlB - d.debtB);
  const noaE = d.taE - d.cashE - (d.tlE - d.debtE);
  const avg = (noaB + noaE) / 2;
  const bsAcc = noaE - noaB;
  const cfAcc = d.ni - d.cfo - d.cfi;
  const ok = Math.abs(avg) > 0.005;
  return { noaB, noaE, avg, bsAcc, cfAcc, bsRatio: ok ? bsAcc / avg : null, cfRatio: ok ? cfAcc / avg : null };
}

/* Illustrative persistence: 0.85 less 1.5 times the cash-flow accruals ratio,
   kept inside [0.2, 0.9]. More accruals, faster decay toward the mean. */
function persistence(ratio) {
  const r = ratio == null ? 0 : ratio;
  return Math.max(PHI_MIN, Math.min(PHI_MAX, 0.85 - 1.5 * r));
}

function useTweenArray(target, duration = 750) {
  const [shown, setShown] = useState(target);
  const ref = useRef(target);
  const key = target.map((x) => x.toFixed(4)).join(",");
  useEffect(() => {
    if (prefersReducedMotion()) { ref.current = target; setShown(target); return undefined; }
    const from = ref.current.length === target.length ? ref.current : target;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      const v = target.map((x, i) => from[i] + (x - from[i]) * e);
      ref.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration]);
  return shown;
}

function pct(x) {
  return x == null || !Number.isFinite(x) ? "n/a" : (x * 100).toFixed(1) + "%";
}

function TNum({ v, kind }) {
  const t = useTween(v == null || !Number.isFinite(v) ? 0 : v, 600);
  if (v == null || !Number.isFinite(v)) return <span>n/a</span>;
  return <span style={{ fontFamily: "var(--mono)" }}>{kind === "pct" ? pct(t) : fmt(Math.round(t))}</span>;
}

function NumIn({ value, onChange, label }) {
  const [txt, setTxt] = useState(String(value));
  useEffect(() => { setTxt(String(value)); }, [value]);
  return (
    <input
      className="fsa-in"
      type="number"
      aria-label={label}
      value={txt}
      onChange={(e) => {
        setTxt(e.target.value);
        const n = parseFloat(e.target.value);
        onChange(Number.isFinite(n) ? n : 0);
      }}
    />
  );
}

const cell = { padding: "0.22rem 0.4rem", borderTop: "1px solid var(--border)", background: "transparent" };

function CompanyCard({ co, d, setField, res }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderTop: "3px solid " + co.tone, borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.75rem 0.9rem", minWidth: 0 }}>
      <div style={{ fontWeight: 700, color: co.tone }}>{co.name}</div>
      <div className="fsa-dim" style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>{co.blurb}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ margin: 0, fontSize: "0.8rem", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ ...cell, borderTop: "none", textAlign: "left" }}>Balance sheet</th>
              <th style={{ ...cell, borderTop: "none", textAlign: "right" }}>Beginning</th>
              <th style={{ ...cell, borderTop: "none", textAlign: "right" }}>End</th>
            </tr>
          </thead>
          <tbody>
            {STOCK_ROWS.map((r) => (
              <tr key={r.k}>
                <td style={cell}>{r.label}</td>
                <td style={{ ...cell, textAlign: "right" }}><NumIn label={co.name + " " + r.label + " beginning"} value={d[r.k + "B"]} onChange={(n) => setField(r.k + "B", n)} /></td>
                <td style={{ ...cell, textAlign: "right" }}><NumIn label={co.name + " " + r.label + " end"} value={d[r.k + "E"]} onChange={(n) => setField(r.k + "E", n)} /></td>
              </tr>
            ))}
            <tr>
              <td style={{ ...cell, fontWeight: 650 }}>Net operating assets (NOA)</td>
              <td style={{ ...cell, textAlign: "right", fontWeight: 650 }}><TNum v={res.noaB} /></td>
              <td style={{ ...cell, textAlign: "right", fontWeight: 650 }}><TNum v={res.noaE} /></td>
            </tr>
            <tr>
              <th style={{ ...cell, textAlign: "left", paddingTop: "0.6rem" }} colSpan={3}>This year's flows</th>
            </tr>
            {FLOW_ROWS.map((r) => (
              <tr key={r.k}>
                <td style={cell}>{r.label}</td>
                <td style={cell} />
                <td style={{ ...cell, textAlign: "right" }}><NumIn label={co.name + " " + r.label} value={d[r.k]} onChange={(n) => setField(r.k, n)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.7rem" }}>
        <div style={{ background: "var(--bg-inset)", borderRadius: "var(--radius-sm)", padding: "0.5rem 0.6rem" }}>
          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 650 }}>Balance-sheet based</div>
          <div style={{ fontSize: "0.78rem" }}>Accruals = change in NOA: <TNum v={res.bsAcc} /></div>
          <div style={{ fontSize: "1.15rem", fontWeight: 700, color: co.tone }}><TNum v={res.bsRatio} kind="pct" /></div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>change in NOA / average NOA</div>
        </div>
        <div style={{ background: "var(--bg-inset)", borderRadius: "var(--radius-sm)", padding: "0.5rem 0.6rem" }}>
          <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 650 }}>Cash-flow based</div>
          <div style={{ fontSize: "0.78rem" }}>Accruals = NI - CFO - CFI: <TNum v={res.cfAcc} /></div>
          <div style={{ fontSize: "1.15rem", fontWeight: 700, color: co.tone }}><TNum v={res.cfRatio} kind="pct" /></div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>(NI - CFO - CFI) / average NOA</div>
        </div>
      </div>
    </div>
  );
}

export default function AccrualsLab() {
  const [data, setData] = useState(() => DEMO.map((c) => ({ ...c.d })));
  const [normal, setNormal] = useState(60);
  const [drawKey, setDrawKey] = useState(0);

  const results = useMemo(() => data.map(calc), [data]);
  const phis = results.map((r) => persistence(r.cfRatio));
  const paths = data.map((d, i) => {
    const out = [];
    for (let t = 0; t <= YEARS; t++) out.push(normal + (d.ni - normal) * Math.pow(phis[i], t));
    return out;
  });
  const flat = useTweenArray([...paths[0], ...paths[1], normal]);
  const shownA = flat.slice(0, YEARS + 1);
  const shownB = flat.slice(YEARS + 1, 2 * (YEARS + 1));
  const shownNormal = flat[flat.length - 1];

  const setField = (i) => (k, n) => setData((prev) => prev.map((d, j) => (j === i ? { ...d, [k]: n } : d)));
  const reset = () => { setData(DEMO.map((c) => ({ ...c.d }))); setNormal(60); setDrawKey((k) => k + 1); };

  /* chart geometry */
  const W = 640, H = 260, L = 48, R = 16, T = 18, B = 36;
  const all = [...shownA, ...shownB, shownNormal];
  let lo = Math.min(...all), hi = Math.max(...all);
  if (hi - lo < 1) { hi += 1; lo -= 1; }
  const pad = (hi - lo) * 0.12;
  lo -= pad; hi += pad;
  const x = (t) => L + (t / YEARS) * (W - L - R);
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const line = (arr) => arr.map((v, t) => (t ? "L" : "M") + x(t).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
  const ticks = [];
  const step = Math.max(1, Math.round((hi - lo) / 5 / 10) * 10);
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(v);
  const halfLife = (phi) => (phi > 0 && phi < 1 ? Math.log(0.5) / Math.log(phi) : null);

  return (
    <div className="fsa-theater">
      <style>{`
        .fsa-acl-draw { stroke-dasharray: 1; stroke-dashoffset: 0; animation: fsa-acl-draw 1.3s cubic-bezier(.3,.7,.2,1) both; }
        @keyframes fsa-acl-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) { .fsa-acl-draw { animation: none; } }
      `}</style>
      <div className="fsa-th-head">
        <div className="fsa-th-std">Accruals lab</div>
        <h3>Same net income, different cash content</h3>
        <div className="fsa-th-sum">
          Both companies report net income of 100. Edit any input: net operating assets, both aggregate accruals measures and both accruals ratios are recomputed from your numbers.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0.8rem", marginTop: "0.9rem" }}>
        {DEMO.map((co, i) => (
          <CompanyCard key={co.id} co={co} d={data[i]} setField={setField(i)} res={results[i]} />
        ))}
      </div>

      <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.6rem" }}>
        NOA = (total assets - cash and short-term investments) - (total liabilities - total debt). Operating assets minus operating liabilities: what is left once you strip out the financing side.
      </div>

      <div style={{ marginTop: "1.2rem", borderTop: "1px solid var(--border)", paddingTop: "0.9rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.8rem", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 650 }}>Where do the earnings go next?</div>
            <div className="fsa-dim" style={{ fontSize: "0.8rem" }}>Both start at 100. Competition pulls each back toward the industry-normal level; the accrual-heavy one gets there faster.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <label className="fsa-dim" style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Normal earnings
              <input type="range" min={0} max={150} step={5} value={normal} onChange={(e) => setNormal(parseFloat(e.target.value))} />
              <span style={{ fontFamily: "var(--mono)", minWidth: "2.2rem" }}>{normal}</span>
            </label>
            <button type="button" className="fsa-btn" onClick={() => setDrawKey((k) => k + 1)}><Play size={14} /> Replay</button>
            <button type="button" className="fsa-btn" onClick={reset}><RotateCcw size={14} /> Reset demo</button>
          </div>
        </div>

        <svg viewBox={"0 0 " + W + " " + H} style={{ width: "100%", height: "auto", marginTop: "0.6rem", display: "block" }} role="img" aria-label="Illustrative mean reversion of earnings for the two companies">
          {ticks.map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth="1" />
              <text x={L - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--text-faint)">{v}</text>
            </g>
          ))}
          {Array.from({ length: YEARS + 1 }, (_, t) => (
            <text key={t} x={x(t)} y={H - B + 16} textAnchor="middle" fontSize="11" fill="var(--text-faint)">{t === 0 ? "Now" : "+" + t}</text>
          ))}
          <text x={(L + W - R) / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--text-faint)">years ahead</text>
          <line x1={L} x2={W - R} y1={y(shownNormal)} y2={y(shownNormal)} stroke="var(--text-faint)" strokeDasharray="5 4" strokeWidth="1.5" />
          <text x={W - R} y={y(shownNormal) - 6} textAnchor="end" fontSize="11" fill="var(--text-dim)">industry-normal earnings</text>
          <g key={drawKey}>
            <path className="fsa-acl-draw" pathLength="1" d={line(shownA)} fill="none" stroke={DEMO[0].tone} strokeWidth="2.6" strokeLinejoin="round" />
            <path className="fsa-acl-draw" pathLength="1" d={line(shownB)} fill="none" stroke={DEMO[1].tone} strokeWidth="2.6" strokeLinejoin="round" style={{ animationDelay: ".15s" }} />
          </g>
          {shownA.map((v, t) => <circle key={"a" + t} cx={x(t)} cy={y(v)} r="3" fill={DEMO[0].tone} />)}
          {shownB.map((v, t) => <circle key={"b" + t} cx={x(t)} cy={y(v)} r="3" fill={DEMO[1].tone} />)}
          <text x={L + 6} y={T + 4} fontSize="11" fill="var(--text-faint)" fontStyle="italic">Illustrative model, not curriculum data</text>
        </svg>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.5rem", marginTop: "0.4rem" }}>
          {DEMO.map((co, i) => {
            const hl = halfLife(phis[i]);
            return (
              <div key={co.id} style={{ fontSize: "0.8rem", borderLeft: "3px solid " + co.tone, paddingLeft: "0.6rem" }}>
                <b style={{ color: co.tone }}>{co.name}</b>: cash-flow accruals ratio {pct(results[i].cfRatio)}, so the model's persistence is {phis[i].toFixed(2)} and half of the gap to normal earnings closes in about {hl == null ? "n/a" : hl.toFixed(1)} years.
              </div>
            );
          })}
        </div>
        <div className="fsa-dim" style={{ fontSize: "0.74rem", marginTop: "0.5rem" }}>
          Model used for the picture only: next year's gap to normal = persistence x this year's gap, with persistence = 0.85 - 1.5 x cash-flow accruals ratio, kept between {PHI_MIN} and {PHI_MAX}. The curriculum's claim is the direction (a larger accrual component means lower persistence and faster mean reversion), not these coefficients.
        </div>
      </div>
    </div>
  );
}
