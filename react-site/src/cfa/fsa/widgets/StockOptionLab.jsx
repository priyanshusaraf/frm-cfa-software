import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTween, prefersReducedMotion } from "../components/motion.js";

/* Employee stock option lab. Values a European call with the Black-Scholes-
   Merton model (continuous dividend yield), then turns the grant-date fair
   value into a straight-line expense schedule over the vesting period and the
   matching build-up of paid-in capital. The sensitivity strip re-prices the
   option with one input bumped at a time. Defaults are the Pinnacle grant in
   the lm11-stock-options scenario (fair value 6.00 per option). */

const DEFAULTS = { S: 25, K: 25, T: 5, vol: 30, r: 3, q: 2.5, n: 15000, vest: 3 };

const FIELDS = [
  { key: "S", label: "Share price at grant", min: 5, max: 100, step: 0.5, money: true },
  { key: "K", label: "Exercise price", min: 5, max: 100, step: 0.5, money: true },
  { key: "T", label: "Expected term (years)", min: 0.5, max: 10, step: 0.5 },
  { key: "vol", label: "Expected volatility", min: 5, max: 80, step: 1, pct: true },
  { key: "r", label: "Risk-free rate", min: 0, max: 10, step: 0.25, pct: true },
  { key: "q", label: "Expected dividend yield", min: 0, max: 8, step: 0.25, pct: true },
  { key: "n", label: "Number of options granted", min: 1000, max: 100000, step: 1000, count: true },
  { key: "vest", label: "Vesting period (years, cliff)", min: 1, max: 5, step: 1 },
];

/* Standard normal CDF, Abramowitz and Stegun 26.2.17 (error below 7.5e-8). */
function ncdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
}

function bsm({ S, K, T, vol, r, q }) {
  const v = vol / 100, rr = r / 100, qq = q / 100;
  if (T <= 0 || v <= 0 || S <= 0 || K <= 0) return Math.max(0, S - K);
  const sq = v * Math.sqrt(T);
  const d1 = (Math.log(S / K) + (rr - qq + (v * v) / 2) * T) / sq;
  const d2 = d1 - sq;
  return S * Math.exp(-qq * T) * ncdf(d1) - K * Math.exp(-rr * T) * ncdf(d2);
}

const money = (n, dp = 2) => (n < 0 ? "-" : "") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

function Tw({ v, dp = 0, sign }) {
  const t = useTween(v, 550);
  return <span style={{ fontFamily: "var(--mono)", fontVariantNumeric: "tabular-nums" }}>{sign && v > 0 ? "+" : ""}{money(t, dp)}</span>;
}

export default function StockOptionLab() {
  const [x, setX] = useState(DEFAULTS);
  const motion = useMemo(() => !prefersReducedMotion(), []);
  const set = (key, val) => {
    const n = parseFloat(val);
    if (Number.isFinite(n)) setX((p) => ({ ...p, [key]: n }));
  };

  const fv = bsm(x);
  const intrinsic = Math.max(0, x.S - x.K);
  const total = fv * x.n;
  const perYear = total / x.vest;
  const years = Array.from({ length: x.vest }, (_, i) => ({ year: i + 1, exp: perYear, cum: perYear * (i + 1) }));

  const bumps = [
    { key: "S", label: "Share price +10%", to: x.S * 1.1 },
    { key: "K", label: "Exercise price +10%", to: x.K * 1.1 },
    { key: "T", label: "Expected term +1 year", to: x.T + 1 },
    { key: "vol", label: "Volatility +5 points", to: x.vol + 5 },
    { key: "r", label: "Risk-free rate +1 point", to: x.r + 1 },
    { key: "q", label: "Dividend yield +1 point", to: x.q + 1 },
  ].map((b) => {
    const nv = bsm({ ...x, [b.key]: b.to });
    return { ...b, nv, dFv: nv - fv, dExp: ((nv - fv) * x.n) / x.vest };
  });
  const maxD = Math.max(0.0001, ...bumps.map((b) => Math.abs(b.dFv)));
  const tr = motion ? "height .5s cubic-bezier(.3,.7,.2,1), width .5s cubic-bezier(.3,.7,.2,1), left .5s cubic-bezier(.3,.7,.2,1)" : "none";

  const fmtField = (f) => (f.pct ? x[f.key].toFixed(f.step < 1 ? 2 : 0) + "%" : f.count ? x[f.key].toLocaleString("en-US") : f.money ? money(x[f.key]) : String(x[f.key]));

  return (
    <div className="fsa-theater" style={{ padding: "1rem 1.1rem" }}>
      <div className="fsa-th-std">Interactive lab</div>
      <h3 style={{ margin: "0.15rem 0 0.3rem", fontSize: "1.12rem" }}>Stock option lab: from model inputs to the income statement</h3>
      <p className="fsa-th-sum" style={{ margin: "0 0 0.8rem" }}>
        Set the grant-date assumptions. The lab values one option with the Black-Scholes-Merton model, multiplies by the number granted, and spreads that fixed cost evenly over the vesting period. Each year's expense is credited to paid-in capital, so equity in total never moves. The strip at the bottom re-prices the option with one assumption nudged at a time: management chooses most of these inputs, which is exactly why the analyst checks them.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.2rem 1.1rem", marginBottom: "1rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.8rem", background: "var(--bg)" }}>
        {FIELDS.map((f) => (
          <label key={f.key} style={{ display: "block", fontSize: "0.78rem", color: "var(--text-dim)", margin: "0.3rem 0" }}>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              <span>{f.label}</span>
              <b style={{ fontFamily: "var(--mono)", color: "var(--text)", whiteSpace: "nowrap" }}>{fmtField(f)}</b>
            </span>
            <input type="range" min={f.min} max={f.max} step={f.step} value={x[f.key]} onChange={(e) => set(f.key, e.target.value)} style={{ width: "100%", accentColor: "var(--accent)" }} aria-label={f.label} />
          </label>
        ))}
      </div>

      <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.6rem", marginBottom: "1rem" }}>
        {[
          ["Fair value per option", <Tw v={fv} dp={2} />, "Black-Scholes-Merton"],
          ["Intrinsic value at grant", <Tw v={intrinsic} dp={2} />, "max(share price - exercise price, 0)"],
          ["Total grant-date fair value", <Tw v={total} />, "fixed for good on the grant date"],
          ["Expense per year", <Tw v={perYear} />, "total / " + x.vest + (x.vest === 1 ? " year" : " years")],
        ].map(([lab, val, sub], i) => (
          <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.55rem 0.7rem", background: "var(--bg)" }}>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", fontWeight: 650 }}>{lab}</div>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0.15rem 0" }}>{val}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.35rem" }}>Expense schedule and paid-in capital build-up</div>
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-end", height: "11rem", padding: "0.5rem 0.6rem 0", borderBottom: "1px solid var(--border-strong)", overflowX: "auto" }}>
        {years.map((y) => (
          <div key={y.year} style={{ flex: "1 0 4.5rem", display: "flex", gap: "0.3rem", alignItems: "flex-end", height: "100%" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", alignItems: "center" }}>
              <span style={{ fontSize: "0.68rem", color: "var(--red)", fontFamily: "var(--mono)" }}><Tw v={y.exp} /></span>
              <span style={{ width: "100%", height: (y.exp / Math.max(1, total)) * 85 + "%", background: "color-mix(in srgb, var(--red) 60%, transparent)", borderRadius: "3px 3px 0 0", transition: tr }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", alignItems: "center" }}>
              <span style={{ fontSize: "0.68rem", color: "var(--accent)", fontFamily: "var(--mono)" }}><Tw v={y.cum} /></span>
              <span style={{ width: "100%", height: (y.cum / Math.max(1, total)) * 85 + "%", background: "color-mix(in srgb, var(--accent) 60%, transparent)", borderRadius: "3px 3px 0 0", transition: tr }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.8rem", padding: "0.25rem 0.6rem 0" }}>
        {years.map((y) => (
          <div key={y.year} style={{ flex: "1 0 4.5rem", textAlign: "center", fontSize: "0.74rem", color: "var(--text-dim)" }}>Year {y.year}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.76rem", color: "var(--text-dim)", margin: "0.4rem 0 1rem" }}>
        <span><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "color-mix(in srgb, var(--red) 60%, transparent)", marginRight: 4 }} />Compensation expense (Dr), reduces net income</span>
        <span><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "color-mix(in srgb, var(--accent) 60%, transparent)", marginRight: 4 }} />Paid-in capital: stock options (Cr), cumulative</span>
      </div>

      <div style={{ fontWeight: 650, fontSize: "0.86rem", marginBottom: "0.35rem" }}>Sensitivity: nudge one assumption, hold the rest</div>
      <div className="fsa-ratios" style={{ marginTop: 0 }}>
        <table>
          <thead>
            <tr><th>Assumption change</th><th>Value per option</th><th style={{ minWidth: "8rem" }}>Effect</th><th>Annual expense change</th></tr>
          </thead>
          <tbody>
            {bumps.map((b) => {
              const up = b.dFv >= 0;
              const w = (Math.abs(b.dFv) / maxD) * 50;
              return (
                <tr key={b.key} style={b.key === "q" ? { background: "var(--amber-soft)" } : undefined}>
                  <td style={{ whiteSpace: "normal" }}>{b.label}{b.key === "q" && <div style={{ fontSize: "0.72rem", color: "var(--amber)" }}>Higher assumed dividends LOWER the option value and the expense: dividends go to shareholders, not option holders.</div>}</td>
                  <td><Tw v={b.nv} dp={2} /></td>
                  <td>
                    <span style={{ position: "relative", display: "block", height: "0.8rem", background: "var(--bg-inset)", borderRadius: 3 }}>
                      <span style={{ position: "absolute", left: "50%", top: -2, bottom: -2, width: 1, background: "var(--border-strong)" }} />
                      <span style={{ position: "absolute", top: 0, bottom: 0, left: up ? "50%" : 50 - w + "%", width: w + "%", background: up ? "var(--green)" : "var(--red)", borderRadius: 2, transition: tr }} />
                    </span>
                  </td>
                  <td className={up ? "up" : "down"}><Tw v={b.dExp} sign /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.8rem" }}>
        <span className="fsa-dim" style={{ fontSize: "0.8rem" }}>
          Higher volatility, a longer expected term and a higher risk-free rate raise the value; a higher dividend yield lowers it. A company that wants a smaller expense has every incentive to pick a short term, low volatility and a high dividend yield.
        </span>
        <button type="button" className="fsa-btn" onClick={() => setX(DEFAULTS)}><RotateCcw size={14} /> Reset to Pinnacle</button>
      </div>
    </div>
  );
}
