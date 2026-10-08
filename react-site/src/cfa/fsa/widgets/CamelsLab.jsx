import React, { useMemo, useState } from "react";
import { useTween } from "../components/motion.js";

/* CAMELS lab for Harbor Bank (year 2 figures, in millions).
   Every number on screen is computed from the base figures below and the
   three stress controls; nothing is typed in. Regulatory minimums are the
   Basel III figures the curriculum presents (CET1 4.5%, Tier 1 6%, total
   capital 8%, conservation buffer 2.5%, LCR and NSFR 100%). Everything else
   marked "illustrative" is a teaching benchmark, not a rule. */

const BASE = {
  loans: 640, npl: 20, allow: 16, ni: 10.5, tax: 0.25,
  cet1: 64, at1: 6, t2: 12, rwa: 640, ta: 960, eq: 76,
  cash: 60, gov: 120, otherSec: 120, otherAssets: 36,
  dep: 720, wholesale: 80, ltd: 84,
  runDep: 0.10, runWs: 0.60,
  asfDep: 0.90, rsfGov: 0.05, rsfSec: 0.50, rsfLoans: 0.85,
  lgd: 0.5, nii: 30, earning: 940,
  gap: -100, durA: 2.0, durL: 1.0, liab: 884,
};

function calc(shockPct, runPct, bp) {
  const B = BASE;
  const s = shockPct / 100, r = runPct / 100;
  const prov = s * B.loans;
  const afterTax = prov * (1 - B.tax);
  const ni = B.ni - afterTax;
  const cet1 = B.cet1 - afterTax;
  const t1 = cet1 + B.at1;
  const tc = t1 + B.t2;
  const withdrawn = r * B.dep;
  const cashUsed = Math.min(B.cash, withdrawn);
  const govUsed = withdrawn - cashUsed;
  const cash = B.cash - cashUsed;
  const gov = B.gov - govUsed;
  const hqla = cash + gov;
  const dep = B.dep - withdrawn;
  const outflows = B.runDep * dep + B.runWs * B.wholesale;
  const eq = B.eq - afterTax;
  const ta = B.ta - afterTax - withdrawn;
  const asf = B.asfDep * dep + B.ltd + eq;
  const rsf = B.rsfGov * gov + B.rsfSec * B.otherSec + B.rsfLoans * B.loans + B.otherAssets;
  const npl = B.npl + prov / B.lgd;
  const allow = B.allow + prov;
  const dy = bp / 10000;
  return {
    prov, afterTax, ni, cet1, t1, tc, withdrawn, hqla, dep, outflows, eq, ta, asf, rsf, npl, allow,
    cet1R: cet1 / B.rwa, t1R: t1 / B.rwa, tcR: tc / B.rwa, lev: t1 / ta,
    lcr: hqla / outflows, nsfr: asf / rsf, ldr: B.loans / dep,
    nplR: npl / B.loans, cov: allow / npl, allowR: allow / B.loans,
    roa: ni / ta, roe: ni / eq, nim: B.nii / B.earning,
    dNii: B.gap * dy, dEve: -(B.durA * B.earning - B.durL * B.liab) * dy,
  };
}

const CAPITAL_TESTS = [
  { id: "cet1buf", label: "CET1 + conservation buffer (7.0%)", key: "cet1R", min: 0.07 },
  { id: "cet1", label: "CET1 minimum (4.5%)", key: "cet1R", min: 0.045 },
  { id: "t1", label: "Tier 1 minimum (6.0%)", key: "t1R", min: 0.06 },
  { id: "tc", label: "Total capital minimum (8.0%)", key: "tcR", min: 0.08 },
  { id: "lev", label: "Leverage ratio (3.0%)", key: "lev", min: 0.03 },
];
const LIQ_TESTS = [
  { id: "lcr", label: "Liquidity coverage ratio (100%)", key: "lcr", min: 1 },
  { id: "nsfr", label: "Net stable funding ratio (100%)", key: "nsfr", min: 1 },
];

/* Smallest shock (credit) or run-off (liquidity) that breaks each test,
   holding the other controls where the student left them. */
function thresholds(tests, scan, maxPct) {
  return tests.map((t) => {
    for (let x = 0; x <= maxPct + 1e-9; x += 0.01) {
      if (scan(x)[t.key] < t.min - 1e-12) return { ...t, at: x };
    }
    return { ...t, at: null };
  }).sort((a, b) => (a.at == null ? 1e9 : a.at) - (b.at == null ? 1e9 : b.at));
}

const pct = (x, dp = 1) => (Number.isFinite(x) ? (x * 100).toFixed(dp) + "%" : "n/a");
const num = (x, dp = 1) => {
  if (!Number.isFinite(x)) return "n/a";
  const s = Math.abs(x).toFixed(dp);
  return x < -0.0005 ? "(" + s + ")" : s;
};

function T({ value, f }) {
  const v = useTween(value, 600);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{f(v)}</span>;
}

/* A horizontal gauge. dir "min": the value must stay at or above `min`;
   dir "max": at or below. `warn` is an optional second line (a buffer). */
function Gauge({ label, value, f, scale, min, warn, dir = "min", note }) {
  const v = useTween(value, 600);
  const w = Math.max(0, Math.min(1, v / scale));
  const bad = dir === "min" ? value < min - 1e-12 : value > min + 1e-12;
  const amber = !bad && warn != null && (dir === "min" ? value < warn - 1e-12 : value > warn + 1e-12);
  const tone = bad ? "var(--red)" : amber ? "var(--amber)" : "var(--green)";
  const tick = (x, strong) => (
    <span
      style={{
        position: "absolute", top: -3, bottom: -3, width: 2, left: "calc(" + Math.min(100, (x / scale) * 100) + "% - 1px)",
        background: strong ? "var(--text-dim)" : "var(--text-faint)", borderRadius: 1,
      }}
    />
  );
  return (
    <div style={{ margin: "0.45rem 0 0.6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.8rem" }}>
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ fontFamily: "var(--mono)", color: tone, fontWeight: 650 }}>{f(v)}</span>
      </div>
      <div style={{ position: "relative", height: 8, borderRadius: 99, background: "var(--bg-inset)", margin: "0.3rem 0 0.15rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: w * 100 + "%", background: tone, borderRadius: 99, opacity: 0.85 }} />
        {tick(min, true)}
        {warn != null && tick(warn, false)}
      </div>
      <div style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>{note}</div>
    </div>
  );
}

function Card({ letter, title, children, alert }) {
  return (
    <div
      style={{
        border: "1px solid " + (alert ? "var(--red)" : "var(--border)"), borderRadius: "var(--radius)", background: "var(--bg)",
        padding: "0.7rem 0.85rem", transition: "border-color .4s",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.2rem" }}>
        <span style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: "1.3rem", color: alert ? "var(--red)" : "var(--accent)", transition: "color .4s" }}>{letter}</span>
        <span style={{ fontWeight: 650, fontSize: "0.88rem" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function ChainBox({ label, value, f, bad, sub }) {
  return (
    <div
      style={{
        flex: "1 1 120px", minWidth: 110, border: "1px solid " + (bad ? "var(--red)" : "var(--border)"), borderRadius: "var(--radius-sm)",
        padding: "0.45rem 0.55rem", background: bad ? "var(--red-soft)" : "var(--bg)", transition: "background .4s, border-color .4s",
      }}
    >
      <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)" }}>{label}</div>
      <div style={{ fontSize: "1.02rem", fontWeight: 700, color: bad ? "var(--red)" : "var(--text)" }}><T value={value} f={f} /></div>
      {sub && <div style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{sub}</div>}
    </div>
  );
}

const Arrow = () => <span aria-hidden="true" style={{ alignSelf: "center", color: "var(--text-faint)", fontSize: "1rem" }}>→</span>;

function Slider({ label, value, set, min, max, step, show }) {
  return (
    <label style={{ display: "block", flex: "1 1 220px", fontSize: "0.82rem" }}>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <b style={{ fontFamily: "var(--mono)" }}>{show(value)}</b>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "var(--accent)" }}
      />
    </label>
  );
}

export default function CamelsLab() {
  const [shock, setShock] = useState(0);
  const [run, setRun] = useState(0);
  const [bp, setBp] = useState(0);
  const m = useMemo(() => calc(shock, run, bp), [shock, run, bp]);
  const base = useMemo(() => calc(0, 0, 0), []);
  const capOrder = useMemo(() => thresholds(CAPITAL_TESTS, (x) => calc(x, run, bp), 10), [run, bp]);
  const liqOrder = useMemo(() => thresholds(LIQ_TESTS, (x) => calc(shock, x, bp), 20), [shock, bp]);
  const capBreach = CAPITAL_TESTS.filter((t) => m[t.key] < t.min - 1e-12 && t.id !== "cet1buf");
  const bufBreach = m.cet1R < 0.07 - 1e-12;
  const liqBreach = LIQ_TESTS.filter((t) => m[t.key] < t.min - 1e-12);

  return (
    <div className="fsa-theater">
      <div className="fsa-th-head">
        <div className="fsa-th-std">Interactive: Harbor Bank, year 2 (millions)</div>
        <h3>CAMELS lab: stress the bank and watch what breaks first</h3>
        <div className="fsa-th-sum">
          Push a credit loss through the income statement into capital, or let deposits run and watch liquid assets drain. The capital and liquidity minimums are the Basel III figures; benchmarks marked illustrative are teaching yardsticks, not rules.
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", margin: "0.9rem 0", padding: "0.6rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Slider label="Credit loss shock (% of loans)" value={shock} set={setShock} min={0} max={10} step={0.25} show={(v) => v.toFixed(2) + "%"} />
        <Slider label="Deposit run-off (% of deposits)" value={run} set={setRun} min={0} max={20} step={0.5} show={(v) => v.toFixed(1) + "%"} />
        <Slider label="Parallel rate shock (basis points)" value={bp} set={setBp} min={-200} max={300} step={25} show={(v) => (v > 0 ? "+" : "") + v + " bp"} />
        <button type="button" className="fsa-btn" style={{ alignSelf: "center" }} onClick={() => { setShock(0); setRun(0); setBp(0); }}>Reset</button>
      </div>

      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 600 }}>Credit shock: from provision to capital ratio</div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.35rem 0 0.8rem" }}>
        <ChainBox label="Extra provision" value={-m.prov} f={(v) => num(v)} sub={pct(shock / 100, 2) + " x 640 of loans"} />
        <Arrow />
        <ChainBox label="Net income" value={m.ni} f={(v) => num(v)} bad={m.ni < 0} sub={"after 25% tax shield; base " + num(base.ni)} />
        <Arrow />
        <ChainBox label="Retained earnings change" value={-m.afterTax} f={(v) => num(v)} sub="vs no shock" />
        <Arrow />
        <ChainBox label="CET1 capital" value={m.cet1} f={(v) => num(v)} bad={m.cet1R < 0.045} sub={"base " + num(base.cet1)} />
        <Arrow />
        <ChainBox label="CET1 ratio" value={m.cet1R} f={(v) => pct(v, 2)} bad={m.cet1R < 0.07} sub="CET1 / RWA of 640" />
      </div>

      <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 600 }}>Deposit run: from withdrawals to the 30-day survival test</div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", margin: "0.35rem 0 1rem" }}>
        <ChainBox label="Deposits withdrawn" value={-m.withdrawn} f={(v) => num(v)} sub={pct(run / 100) + " x 720"} />
        <Arrow />
        <ChainBox label="High-quality liquid assets" value={m.hqla} f={(v) => num(v)} bad={m.lcr < 1} sub="cash first, then government bonds" />
        <Arrow />
        <ChainBox label="Stressed 30-day outflows" value={m.outflows} f={(v) => num(v)} sub="10% of deposits + 60% of 80 wholesale" />
        <Arrow />
        <ChainBox label="LCR" value={m.lcr} f={(v) => pct(v)} bad={m.lcr < 1} sub="HQLA / outflows, minimum 100%" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.7rem" }}>
        <Card letter="C" title="Capital adequacy" alert={capBreach.length > 0}>
          <Gauge label="CET1 ratio" value={m.cet1R} f={(v) => pct(v, 2)} scale={0.16} min={0.045} warn={0.07} note="Minimum 4.5% (dark line); 7.0% with the conservation buffer (light line)" />
          <Gauge label="Tier 1 ratio" value={m.t1R} f={(v) => pct(v, 2)} scale={0.16} min={0.06} note="Minimum 6.0%" />
          <Gauge label="Total capital ratio" value={m.tcR} f={(v) => pct(v, 2)} scale={0.16} min={0.08} note="Minimum 8.0%" />
          <Gauge label="Leverage ratio (Tier 1 / total assets)" value={m.lev} f={(v) => pct(v, 2)} scale={0.1} min={0.03} note="3% Basel III leverage minimum; total assets used as the exposure measure (simplified)" />
        </Card>
        <Card letter="A" title="Asset quality">
          <Gauge label="Non-performing loans / loans" value={m.nplR} f={(v) => pct(v, 2)} scale={0.25} min={0.05} warn={0.02} dir="max" note="Lower is better. Illustrative lines at 2% and 5%, not regulatory" />
          <Gauge label="Allowance / non-performing loans" value={m.cov} f={(v) => pct(v)} scale={1.6} min={0.5} warn={1} note="Coverage of problem loans. Illustrative lines at 50% and 100%" />
          <Gauge label="Allowance / gross loans" value={m.allowR} f={(v) => pct(v, 2)} scale={0.15} min={0} note="Rises as the shock is provided for (no threshold)" />
          <div style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>Assumes 50% loss given default, so each 1 of new provision means 2 of loans turning non-performing.</div>
        </Card>
        <Card letter="M" title="Management capabilities">
          <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", margin: "0.3rem 0" }}>
            No ratio exists for this letter. The analyst judges governance, the board's oversight of risk, internal controls, compliance record, and whether insiders or related parties get favourable loans. No slider moves it, which is the point: it is assessed from disclosures and conduct, not computed.
          </p>
        </Card>
        <Card letter="E" title="Earnings" alert={m.ni < 0}>
          <Gauge label="Return on assets" value={m.roa} f={(v) => pct(v, 2)} scale={0.025} min={0} warn={0.01} note="Illustrative peer line at 1.0%; loss below zero" />
          <Gauge label="Return on equity" value={m.roe} f={(v) => pct(v, 1)} scale={0.25} min={0} warn={0.1} note="Illustrative 10% cost of equity line" />
          <Gauge label="Net interest margin" value={m.nim} f={(v) => pct(v, 2)} scale={0.06} min={0} warn={0.03} note="NII 30 / earning assets 940. Illustrative 3% peer line" />
        </Card>
        <Card letter="L" title="Liquidity" alert={liqBreach.length > 0}>
          <Gauge label="Liquidity coverage ratio" value={m.lcr} f={(v) => pct(v)} scale={2} min={1} note="Basel III minimum 100%" />
          <Gauge label="Net stable funding ratio" value={m.nsfr} f={(v) => pct(v)} scale={2} min={1} note="Basel III minimum 100%" />
          <Gauge label="Loans / deposits" value={m.ldr} f={(v) => pct(v)} scale={1.5} min={1} warn={0.9} dir="max" note="Illustrative: above 100% the bank leans on wholesale funding" />
        </Card>
        <Card letter="S" title="Sensitivity to market risk">
          <div style={{ fontSize: "0.8rem", margin: "0.3rem 0" }}>
            One-year repricing gap: <b style={{ fontFamily: "var(--mono)" }}>{num(BASE.gap, 0)}</b> (rate-sensitive assets 400 minus rate-sensitive liabilities 500)
          </div>
          <div style={{ fontSize: "0.8rem", margin: "0.3rem 0" }}>
            Change in next-year net interest income: <b style={{ fontFamily: "var(--mono)", color: m.dNii < 0 ? "var(--red)" : "var(--green)" }}><T value={m.dNii} f={(v) => num(v, 2)} /></b>
            {" "}(<T value={m.dNii / BASE.nii} f={(v) => pct(v)} /> of 30)
          </div>
          <div style={{ fontSize: "0.8rem", margin: "0.3rem 0" }}>
            Change in economic value of equity: <b style={{ fontFamily: "var(--mono)", color: m.dEve < 0 ? "var(--red)" : "var(--green)" }}><T value={m.dEve} f={(v) => num(v, 2)} /></b>
            {" "}(<T value={m.dEve / BASE.eq} f={(v) => pct(v)} /> of equity of 76)
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>
            Economic value change = -(asset duration 2.0 x 940 - liability duration 1.0 x 884) x rate change. Illustrative durations. These are economic effects; with banking-book assets at amortized cost they do not hit reported CET1 directly.
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.7rem", marginTop: "0.9rem" }}>
        <div className="fsa-callout tone-exam">
          <b>Which capital line breaks first as the credit shock grows?</b>
          <ol style={{ margin: "0.3rem 0 0", paddingLeft: "1.2rem", fontSize: "0.84rem" }}>
            {capOrder.map((t) => (
              <li key={t.id}>{t.label}: {t.at == null ? "holds up to a 10% shock" : "breaks at " + t.at.toFixed(2) + "% of loans"}</li>
            ))}
          </ol>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.3rem" }}>
            Total capital breaks before CET1 because every ratio loses the same currency amount, but the total capital ratio has the least room above its minimum.
          </div>
        </div>
        <div className="fsa-callout tone-exam">
          <b>Which liquidity line breaks first as deposits run?</b>
          <ol style={{ margin: "0.3rem 0 0", paddingLeft: "1.2rem", fontSize: "0.84rem" }}>
            {liqOrder.map((t) => (
              <li key={t.id}>{t.label}: {t.at == null ? "holds up to a 20% run" : "breaks at " + t.at.toFixed(2) + "% of deposits"}</li>
            ))}
          </ol>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.3rem" }}>
            The LCR is a 30-day test paid out of the liquid asset buffer, so a run hits it directly. The NSFR is a one-year structural test where deposits and loans both carry partial weights, so it moves slowly.
          </div>
        </div>
      </div>

      <div style={{ marginTop: "0.8rem", fontSize: "0.82rem", color: (capBreach.length || liqBreach.length) ? "var(--red)" : bufBreach ? "var(--amber)" : "var(--green)" }}>
        {capBreach.length || liqBreach.length
          ? "Breached now: " + [...capBreach, ...liqBreach].map((t) => t.label).join("; ") + "."
          : bufBreach
            ? "Above every minimum, but inside the conservation buffer: distributions such as dividends and bonuses would be restricted."
            : "Every minimum and the conservation buffer are met."}
      </div>
      <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginTop: "0.4rem" }}>
        Simplifications: risk-weighted assets held at 640; the tax shield assumes the bank can use the loss; withdrawals are paid from cash and then government bonds at par; the rate shock does not feed into the capital or liquidity chains.
      </div>
    </div>
  );
}
