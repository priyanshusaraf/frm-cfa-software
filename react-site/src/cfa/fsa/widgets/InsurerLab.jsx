import React, { useMemo, useState } from "react";
import { useTween } from "../components/motion.js";

/* Insurance ratio lab. Property and casualty (P&C) panel defaults to Granite
   Insurance; the life and health (L&H) panel to Juniper Life. Every ratio and
   bar is computed from the inputs; presets only change inputs. */

const GRANITE = { npw: 1050, npe: 1000, losses: 610, lae: 90, uw: 273, divs: 10, inv: 75, assets: 2000 };
const PRESETS = [
  { id: "base", label: "Granite, base year", v: GRANITE },
  { id: "soft", label: "Soft market: prices cut 10%", v: { ...GRANITE, npw: 945, npe: 900 } },
  { id: "cat", label: "Catastrophe year", v: { ...GRANITE, losses: 820, lae: 110 } },
  { id: "growth", label: "Fast growth: writes far more than it earns", v: { ...GRANITE, npw: 1400, uw: 364 } },
];
const JUNIPER = { npw: 800, deposits: 200, benefits: 620, commExp: 210 };

const pct = (x, dp = 1) => (Number.isFinite(x) ? (x * 100).toFixed(dp) + "%" : "n/a");
const num = (x) => {
  if (!Number.isFinite(x)) return "n/a";
  const dp = Math.abs(x - Math.round(x)) < 0.05 ? 0 : 1;
  const s = Math.abs(x).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
  return x < -0.04 ? "(" + s + ")" : s;
};

function Field({ label, value, onChange, hint }) {
  return (
    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", padding: "0.2rem 0" }}>
      <span>
        {label}
        {hint && <span style={{ display: "block", fontSize: "0.68rem", color: "var(--text-faint)" }}>{hint}</span>}
      </span>
      <input
        className="fsa-in" type="number" min="0" step="1" value={value}
        onChange={(e) => { const n = parseFloat(e.target.value); onChange(Number.isFinite(n) && n >= 0 ? n : 0); }}
      />
    </label>
  );
}

function RatioRow({ label, value, formula, scale = 1.3, line, lineLabel, strong, dp = 1 }) {
  const v = useTween(Number.isFinite(value) ? value : 0, 600);
  const over = line != null && Number.isFinite(value) && value > line;
  const tone = line == null ? "var(--accent)" : over ? "var(--red)" : "var(--green)";
  return (
    <div style={{ margin: "0.4rem 0 0.55rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: strong ? 700 : 500 }}>
        <span>{label}</span>
        <span style={{ fontFamily: "var(--mono)", color: tone }}>{Number.isFinite(value) ? pct(v, dp) : "n/a"}</span>
      </div>
      <div style={{ position: "relative", height: strong ? 10 : 7, background: "var(--bg-inset)", borderRadius: 99, margin: "0.25rem 0 0.1rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: 99, background: tone, opacity: 0.85, width: Math.max(0, Math.min(1, v / scale)) * 100 + "%" }} />
        {line != null && (
          <span title={lineLabel} style={{ position: "absolute", top: -3, bottom: -3, width: 2, background: "var(--text-dim)", left: "calc(" + (line / scale) * 100 + "% - 1px)" }} />
        )}
      </div>
      <div style={{ fontSize: "0.68rem", color: "var(--text-faint)", fontFamily: "var(--mono)" }}>{formula}</div>
    </div>
  );
}

/* Diverging bar around a centre zero: underwriting result, investment
   income, and their sum. Widths tween so the student sees the swing. */
function OpBar({ label, value, scale, tone }) {
  const v = useTween(value, 650);
  const frac = Math.max(-1, Math.min(1, v / scale));
  const left = frac < 0 ? 50 + frac * 50 : 50;
  const width = Math.abs(frac) * 50;
  const col = tone || (value < 0 ? "var(--red)" : "var(--green)");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(110px, 160px) 1fr 4.5rem", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", margin: "0.3rem 0" }}>
      <span>{label}</span>
      <div style={{ position: "relative", height: 14, background: "var(--bg-inset)", borderRadius: 4 }}>
        <span style={{ position: "absolute", left: "50%", top: -3, bottom: -3, width: 1, background: "var(--text-faint)" }} />
        <div style={{ position: "absolute", top: 2, bottom: 2, left: left + "%", width: width + "%", background: col, borderRadius: 3, opacity: 0.85 }} />
      </div>
      <span style={{ fontFamily: "var(--mono)", textAlign: "right", color: col }}>{num(v)}</span>
    </div>
  );
}

export default function InsurerLab() {
  const [p, setP] = useState(GRANITE);
  const [l, setL] = useState(JUNIPER);
  const set = (k) => (n) => setP((o) => ({ ...o, [k]: n }));
  const setLh = (k) => (n) => setL((o) => ({ ...o, [k]: n }));

  const r = useMemo(() => {
    const lossR = (p.losses + p.lae) / p.npe;
    const expR = p.uw / p.npw;
    const comb = lossR + expR;
    const divR = p.divs / p.npe;
    const combDiv = comb + divR;
    const uwResult = p.npe - p.losses - p.lae - p.uw - p.divs;
    const implied = (1 - combDiv) * p.npe;
    const yieldR = p.inv / p.assets;
    return { lossR, expR, comb, divR, combDiv, uwResult, implied, yieldR, op: uwResult + p.inv };
  }, [p]);
  const lh = useMemo(() => ({ ben: l.benefits / (l.npw + l.deposits), exp: l.commExp / (l.npw + l.deposits) }), [l]);
  const scale = Math.max(50, Math.abs(r.uwResult) + Math.abs(p.inv), Math.abs(r.op)) * 1.1;
  const gap = r.uwResult - r.implied;

  return (
    <div className="fsa-theater">
      <div className="fsa-th-head">
        <div className="fsa-th-std">Interactive: insurance ratios</div>
        <h3>Insurer lab: is the company making money on underwriting, on investing, or both?</h3>
        <div className="fsa-th-sum">
          Change any input or load a preset. The combined ratio tells you whether underwriting alone is profitable (below 100%); the operating bar shows how much the investment portfolio adds on top.
        </div>
      </div>

      <div className="fsa-tabs" style={{ margin: "0.8rem 0" }}>
        {PRESETS.map((x) => (
          <button key={x.id} type="button" className="fsa-btn" onClick={() => setP(x.v)}>{x.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem" }}>
          <div className="fsa-je-h">Property and casualty inputs</div>
          <Field label="Net premiums written" value={p.npw} onChange={set("npw")} hint="business sold this year, net of reinsurance" />
          <Field label="Net premiums earned" value={p.npe} onChange={set("npe")} hint="cover actually provided this year" />
          <Field label="Losses incurred" value={p.losses} onChange={set("losses")} />
          <Field label="Loss adjustment expenses" value={p.lae} onChange={set("lae")} hint="cost of investigating and settling claims" />
          <Field label="Underwriting expenses" value={p.uw} onChange={set("uw")} hint="commissions, premium taxes, policy costs" />
          <Field label="Dividends to policyholders" value={p.divs} onChange={set("divs")} />
          <Field label="Net investment income" value={p.inv} onChange={set("inv")} hint="interest and dividends" />
          <Field label="Average invested assets" value={p.assets} onChange={set("assets")} />
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem" }}>
          <div className="fsa-je-h">Underwriting ratios</div>
          <RatioRow label="Loss and LAE ratio" value={r.lossR} formula="(losses + LAE) / net premiums earned" />
          <RatioRow label="Underwriting expense ratio" value={r.expR} formula="underwriting expenses / net premiums WRITTEN" />
          <RatioRow label="Combined ratio" value={r.comb} formula="loss and LAE ratio + expense ratio" line={1} lineLabel="100%" strong />
          <RatioRow label="Dividends to policyholders ratio" value={r.divR} formula="policyholder dividends / net premiums earned" />
          <RatioRow label="Combined ratio after dividends" value={r.combDiv} formula="combined ratio + dividends ratio" line={1} lineLabel="100%" strong />
          <RatioRow label="Investment yield" value={r.yieldR} scale={0.1} dp={2} formula="net investment income / average invested assets" />
          <div style={{ fontSize: "0.8rem", marginTop: "0.4rem", color: r.combDiv < 1 ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
            {r.combDiv < 1 ? "Below 100%: an underwriting profit on the ratio basis." : r.combDiv > 1 ? "Above 100%: underwriting loses money; investment income has to cover it." : "Exactly 100%: underwriting breaks even."}
          </div>
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem", marginTop: "1rem" }}>
        <div className="fsa-je-h">Operating result: underwriting + investing</div>
        <OpBar label="Underwriting result" value={r.uwResult} scale={scale} />
        <OpBar label="Net investment income" value={p.inv} scale={scale} tone="var(--cyan)" />
        <OpBar label="Pre-tax operating result" value={r.op} scale={scale} tone={r.op < 0 ? "var(--red)" : "var(--accent)"} />
        <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>
          Underwriting result = premiums earned - losses - LAE - underwriting expenses - policyholder dividends = {num(p.npe)} - {num(p.losses)} - {num(p.lae)} - {num(p.uw)} - {num(p.divs)} = <b>{num(r.uwResult)}</b>.
          {" "}The ratio basis implies (100% - {pct(r.combDiv)}) x {num(p.npe)} = <b>{num(r.implied)}</b>.
          {Math.abs(gap) >= 0.5
            ? " The two differ by " + num(Math.abs(gap)) + " because the expense ratio divides by premiums written (" + num(p.npw) + ") while the result uses premiums earned (" + num(p.npe) + ")."
            : " Written and earned premiums are close enough that the two agree."}
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", padding: "0.7rem 0.9rem", marginTop: "1rem" }}>
        <div className="fsa-je-h">Life and health insurer (Juniper Life)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <div>
            <Field label="Net premiums written" value={l.npw} onChange={setLh("npw")} />
            <Field label="Deposits (annuity and investment-type contracts)" value={l.deposits} onChange={setLh("deposits")} />
            <Field label="Total benefits paid" value={l.benefits} onChange={setLh("benefits")} />
            <Field label="Commissions + expenses" value={l.commExp} onChange={setLh("commExp")} />
          </div>
          <div>
            <RatioRow label="Total benefits paid / (net premiums written + deposits)" value={lh.ben} formula={num(l.benefits) + " / " + num(l.npw + l.deposits)} />
            <RatioRow label="(Commissions + expenses) / (net premiums written + deposits)" value={lh.exp} formula={num(l.commExp) + " / " + num(l.npw + l.deposits)} />
            <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>
              There is no combined ratio for a life insurer: benefits are paid over decades and priced with investment returns built in, so the analyst watches these two ratios over time and against peers instead of against 100%.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
