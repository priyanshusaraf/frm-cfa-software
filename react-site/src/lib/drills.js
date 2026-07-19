/* Randomized calculation drills — one generator per high-yield FRM Part II
   calculation. Each generator draws fresh numbers from a seeded RNG and returns
   { q, options: [4 strings], answer: 0-3, why } in the same shape the reading
   quizzes use, with distractors built from the classic wrong calculations. */
import { mulberry32 } from "./math.js";

/* ---------- formatting helpers ---------- */
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const fmtM = (x) => "$" + r2(x).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " million";
const fmtPct = (x, d = 2) => x.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: 0 }) + "%";
const fmtBps = (x) => Math.round(x).toLocaleString() + " bps";

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function rint(rng, lo, hi) { return lo + Math.floor(rng() * (hi - lo + 1)); }

/* Format correct + distractors, dedupe (nudging colliding distractors), shuffle. */
function finish(rng, q, why, correct, distractors, fmt) {
  const seen = new Set([fmt(correct)]);
  const opts = [{ v: fmt(correct), ok: true }];
  for (let d of distractors) {
    let s = fmt(d);
    let guard = 0;
    while (seen.has(s) && guard++ < 8) { d = d * 1.07 + 0.01; s = fmt(d); }
    if (seen.has(s)) continue;
    seen.add(s);
    opts.push({ v: s, ok: false });
  }
  while (opts.length < 4) {
    let d = correct * (0.5 + rng() * 1.4);
    let s = fmt(d);
    if (seen.has(s)) continue;
    seen.add(s);
    opts.push({ v: s, ok: false });
  }
  // seeded shuffle
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { q, why, options: opts.map((o) => o.v), answer: opts.findIndex((o) => o.ok) };
}

/* ---------- the drills ---------- */
export const DRILLS = [
  {
    id: "var-scaling",
    title: "VaR time-scaling",
    rn: 1,
    gen(rng) {
      const v = rint(rng, 2, 30);
      const T = pick(rng, [5, 10, 20, 25]);
      const correct = v * Math.sqrt(T);
      const q = `<p>A portfolio's 1-day VaR is <strong>${fmtM(v)}</strong>. Assuming i.i.d. returns, what is the <strong>${T}-day VaR</strong>?</p>`;
      const why = `Under i.i.d. returns volatility scales with the square root of time, so VaR does too: ${fmtM(v)} × √${T} = ${fmtM(correct)}. Multiplying by ${T} (linear scaling) is the classic trap — that would be right for variance, not volatility.`;
      return finish(rng, q, why, correct, [v * T, v * Math.sqrt(T) * Math.sqrt(T / 2), v * (1 + Math.sqrt(T) / 10)], fmtM);
    },
  },
  {
    id: "param-var",
    title: "Parametric (delta-normal) VaR",
    rn: 1,
    gen(rng) {
      const pos = rint(rng, 10, 200);
      const sig = rint(rng, 5, 25) / 10; // daily σ in %
      const conf = pick(rng, [{ z: 1.65, c: "95%" }, { z: 2.33, c: "99%" }]);
      const correct = (conf.z * sig / 100) * pos;
      const wrongZ = conf.z === 2.33 ? 1.65 : 2.33;
      const q = `<p>A <strong>${fmtM(pos)}</strong> position has daily return volatility of <strong>${sig}%</strong>. What is its 1-day <strong>${conf.c} VaR</strong> (zero mean)?</p>`;
      const why = `VaR = z × σ × position = ${conf.z} × ${sig}% × ${fmtM(pos)} = ${fmtM(correct)}. Using z = ${wrongZ} is the wrong confidence level; forgetting z entirely gives just σ × position.`;
      return finish(rng, q, why, correct, [(wrongZ * sig / 100) * pos, (sig / 100) * pos, (conf.z * sig / 100) * pos * Math.sqrt(10)], fmtM);
    },
  },
  {
    id: "expected-loss",
    title: "Expected loss (PD × LGD × EAD)",
    rn: 19,
    gen(rng) {
      const ead = rint(rng, 20, 500);
      const pd = rint(rng, 1, 8);
      const rr = pick(rng, [30, 40, 50, 60]);
      const lgd = 100 - rr;
      const correct = (pd / 100) * (lgd / 100) * ead;
      const q = `<p>A loan has EAD of <strong>${fmtM(ead)}</strong>, PD of <strong>${pd}%</strong>, and an expected <strong>recovery rate of ${rr}%</strong>. What is the expected loss?</p>`;
      const why = `LGD = 1 − recovery = ${lgd}%. EL = PD × LGD × EAD = ${pd}% × ${lgd}% × ${fmtM(ead)} = ${fmtM(correct)}. Multiplying by the recovery rate instead of LGD is the standard trap.`;
      return finish(rng, q, why, correct, [(pd / 100) * (rr / 100) * ead, (pd / 100) * ead, (lgd / 100) * ead], fmtM);
    },
  },
  {
    id: "credit-var",
    title: "Credit VaR (WCL − EL)",
    rn: 26,
    gen(rng) {
      const el = rint(rng, 2, 20);
      const wcl = el + rint(rng, 10, 80);
      const q = `<p>At the 99.9% confidence level a portfolio's worst-case credit loss is <strong>${fmtM(wcl)}</strong> and its expected loss is <strong>${fmtM(el)}</strong>. What is the <strong>credit VaR</strong>?</p>`;
      const why = `Credit VaR is the unexpected loss: WCL − EL = ${fmtM(wcl)} − ${fmtM(el)} = ${fmtM(wcl - el)}. Reporting the WCL itself ignores that EL is already priced/provisioned for; adding them double-counts.`;
      return finish(rng, q, why, wcl - el, [wcl, wcl + el, el], fmtM);
    },
  },
  {
    id: "pd-from-spread",
    title: "Risk-neutral PD from credit spread",
    rn: 25,
    gen(rng) {
      const spread = rint(rng, 8, 40) * 10; // bps
      const rr = pick(rng, [40, 50, 60]);
      const correct = (spread / 100) / (1 - rr / 100); // in %
      const q = `<p>A bond trades <strong>${fmtBps(spread)}</strong> over the risk-free curve and the expected recovery rate is <strong>${rr}%</strong>. What is the approximate annual <strong>risk-neutral default probability</strong>?</p>`;
      const why = `λ ≈ spread ⁄ (1 − recovery) = ${spread / 100}% ⁄ ${(100 - rr) / 100} = ${fmtPct(r2(correct))}. Dividing by the recovery rate (instead of 1 − recovery) or taking the spread itself as the PD are the common mistakes.`;
      return finish(rng, q, why, correct, [(spread / 100) / (rr / 100), spread / 100, (spread / 100) * (1 - rr / 100)], (x) => fmtPct(r2(x)));
    },
  },
  {
    id: "cds-spread",
    title: "CDS spread from hazard rate",
    rn: 30,
    gen(rng) {
      const lam = rint(rng, 1, 6); // %
      const rr = pick(rng, [30, 40, 60]);
      const correct = lam * (1 - rr / 100) * 100; // bps
      const q = `<p>A reference entity's hazard rate is <strong>${lam}%</strong> per year and expected recovery is <strong>${rr}%</strong>. What CDS spread (approximately) compensates the protection seller?</p>`;
      const why = `spread ≈ λ × (1 − R) = ${lam}% × ${(100 - rr) / 100} = ${fmtBps(correct)}. Using λ × R prices the recovery, not the loss; quoting λ itself ignores recovery altogether.`;
      return finish(rng, q, why, correct, [lam * (rr / 100) * 100, lam * 100, lam * (1 - rr / 100) * 10], fmtBps);
    },
  },
  {
    id: "hazard-cum-pd",
    title: "Cumulative PD from a hazard rate",
    rn: 25,
    gen(rng) {
      const lam = rint(rng, 1, 8); // %
      const t = pick(rng, [2, 3, 5]);
      const correct = (1 - Math.exp(-(lam / 100) * t)) * 100;
      const q = `<p>With a constant hazard rate of <strong>${lam}%</strong>, what is the probability the firm defaults <strong>within ${t} years</strong>?</p>`;
      const why = `Cumulative PD = 1 − e^(−λt) = 1 − e^(−${lam / 100} × ${t}) = ${fmtPct(r2(correct))}. Simply multiplying λ × t = ${fmtPct(lam * t)} overstates it (it ignores that you must survive to default later); 1 − λt is not a probability at all.`;
      return finish(rng, q, why, correct, [lam * t, (1 - Math.exp(-(lam / 100))) * 100, lam], (x) => fmtPct(r2(x)));
    },
  },
  {
    id: "two-period-pd",
    title: "Two-year cumulative PD",
    rn: 25,
    gen(rng) {
      const p1 = rint(rng, 2, 8);
      const p2 = rint(rng, 3, 10);
      const correct = (1 - (1 - p1 / 100) * (1 - p2 / 100)) * 100;
      const q = `<p>A firm's default probability is <strong>${p1}%</strong> in year 1 and <strong>${p2}%</strong> in year 2 (conditional on surviving year 1). What is the <strong>2-year cumulative PD</strong>?</p>`;
      const why = `P(default in 2y) = 1 − survival = 1 − (1 − ${p1}%)(1 − ${p2}%) = ${fmtPct(r2(correct))}. Adding ${p1}% + ${p2}% = ${fmtPct(p1 + p2)} double-counts the paths where the firm already defaulted in year 1.`;
      return finish(rng, q, why, correct, [p1 + p2, (p1 / 100) * (p2 / 100) * 100, p2], (x) => fmtPct(r2(x)));
    },
  },
  {
    id: "lcr",
    title: "Liquidity Coverage Ratio",
    rn: 63,
    gen(rng) {
      const out = rint(rng, 40, 200);
      const ratio = rint(rng, 90, 160);
      const hqla = r1((out * ratio) / 100);
      const q = `<p>A bank holds <strong>${fmtM(hqla)}</strong> of HQLA against total net cash outflows of <strong>${fmtM(out)}</strong> over a 30-day stress. What is its <strong>LCR</strong>?</p>`;
      const why = `LCR = HQLA ⁄ net cash outflows = ${fmtM(hqla)} ⁄ ${fmtM(out)} = ${fmtPct(r1((hqla / out) * 100), 1)}. The regulatory minimum is 100% — inverting the ratio is the usual error.`;
      const correct = (hqla / out) * 100;
      return finish(rng, q, why, correct, [(out / hqla) * 100, correct / 2, correct * (out > hqla ? 1.5 : 0.75)], (x) => fmtPct(r1(x), 1));
    },
  },
  {
    id: "nsfr",
    title: "Net Stable Funding Ratio",
    rn: 63,
    gen(rng) {
      const rsf = rint(rng, 50, 200);
      const ratio = rint(rng, 85, 140);
      const asf = r1((rsf * ratio) / 100);
      const correct = (asf / rsf) * 100;
      const q = `<p>Available stable funding is <strong>${fmtM(asf)}</strong> and required stable funding is <strong>${fmtM(rsf)}</strong>. What is the bank's <strong>NSFR</strong>, and does it comply?</p>`;
      const why = `NSFR = ASF ⁄ RSF = ${fmtPct(r1(correct), 1)} — ${correct >= 100 ? "compliant (≥ 100%)" : "below the 100% minimum"}. RSF ⁄ ASF is the inverted trap.`;
      return finish(rng, q, why, correct, [(rsf / asf) * 100, correct - 15, correct + 22], (x) => fmtPct(r1(x), 1));
    },
  },
  {
    id: "lvar",
    title: "Liquidity-adjusted VaR (constant spread)",
    rn: 63,
    gen(rng) {
      const varAmt = rint(rng, 5, 60);
      const pos = rint(rng, 50, 400);
      const spr = rint(rng, 2, 20) / 10; // spread in %
      const lc = 0.5 * (spr / 100) * pos;
      const correct = varAmt + lc;
      const q = `<p>A <strong>${fmtM(pos)}</strong> position has VaR of <strong>${fmtM(varAmt)}</strong>. The bid–ask spread is <strong>${spr}%</strong>. Using the constant-spread approach, what is the <strong>liquidity-adjusted VaR</strong>?</p>`;
      const why = `Liquidity cost = ½ × spread × position = ½ × ${spr}% × ${fmtM(pos)} = ${fmtM(lc)}; LVaR = VaR + LC = ${fmtM(correct)}. Using the full spread (not half — you only cross half of it to exit) doubles the add-on.`;
      return finish(rng, q, why, correct, [varAmt + 2 * lc, varAmt, lc], fmtM);
    },
  },
  {
    id: "ewma",
    title: "EWMA volatility update",
    rn: 2,
    gen(rng) {
      const lam = pick(rng, [0.9, 0.94]);
      const sig = rint(rng, 10, 25) / 10; // %
      const ret = rint(rng, 15, 45) / 10; // % move
      const correct = Math.sqrt(lam * sig * sig + (1 - lam) * ret * ret);
      const q = `<p>Yesterday's EWMA volatility estimate was <strong>${sig}%</strong> (daily) and today's return is <strong>${ret > sig ? "−" : ""}${ret}%</strong>. With λ = ${lam}, what is the updated daily volatility?</p>`;
      const why = `σ²_new = λσ² + (1 − λ)r² = ${lam} × ${r2(sig * sig)} + ${r2(1 - lam)} × ${r2(ret * ret)} = ${r2(lam * sig * sig + (1 - lam) * ret * ret)}, so σ_new = ${fmtPct(r2(correct))}. Forgetting the square root (reporting variance) and weighting r² by λ instead of 1 − λ are the classic slips.`;
      return finish(rng, q, why, correct, [lam * sig * sig + (1 - lam) * ret * ret, Math.sqrt((1 - lam) * sig * sig + lam * ret * ret), lam * sig + (1 - lam) * ret], (x) => fmtPct(r2(x)));
    },
  },
  {
    id: "raroc",
    title: "RAROC",
    rn: 56,
    gen(rng) {
      const ec = rint(rng, 20, 100);
      const rev = rint(rng, 8, 30);
      const cost = rint(rng, 2, Math.max(3, rev - 4));
      const el = rint(rng, 1, Math.max(2, rev - cost - 2));
      const correct = ((rev - cost - el) / ec) * 100;
      const q = `<p>A business line earns revenues of <strong>${fmtM(rev)}</strong>, with costs of <strong>${fmtM(cost)}</strong> and expected loss of <strong>${fmtM(el)}</strong>, against economic capital of <strong>${fmtM(ec)}</strong>. What is its <strong>RAROC</strong>?</p>`;
      const why = `RAROC = (revenues − costs − EL) ⁄ economic capital = (${rev} − ${cost} − ${el}) ⁄ ${ec} = ${fmtPct(r1(correct), 1)}. Forgetting to subtract EL — the "risk-adjusted" part of the numerator — is the trap; unexpected loss lives in the denominator via economic capital, not the numerator.`;
      return finish(rng, q, why, correct, [((rev - cost) / ec) * 100, ((rev - cost - el) / rev) * 100, ((rev - cost + el) / ec) * 100], (x) => fmtPct(r1(x), 1));
    },
  },
  {
    id: "info-ratio",
    title: "Information ratio",
    rn: 87,
    gen(rng) {
      const alpha = rint(rng, 5, 40) / 10; // %
      const te = rint(rng, 20, 80) / 10; // %
      const correct = alpha / te;
      const q = `<p>A fund's active return over its benchmark is <strong>${alpha}%</strong> with tracking error of <strong>${te}%</strong>. What is its <strong>information ratio</strong>?</p>`;
      const why = `IR = active return ⁄ tracking error = ${alpha} ⁄ ${te} = ${r2(correct)}. Dividing by total volatility (instead of the volatility of the <em>active</em> return) confuses the IR with the Sharpe ratio.`;
      return finish(rng, q, why, correct, [te / alpha, alpha, correct / 2], (x) => String(r2(x)));
    },
  },
];

/* Draw one drill instance. drillId "mixed" picks a random drill. */
export function makeQuestion(drillId, seed) {
  const rng = mulberry32(seed >>> 0);
  const drill = drillId === "mixed" ? DRILLS[Math.floor(rng() * DRILLS.length)] : DRILLS.find((d) => d.id === drillId);
  const inst = drill.gen(rng);
  return { drill, ...inst };
}
