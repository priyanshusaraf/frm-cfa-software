FRM.register({
  book: 1, reading: 1,
  session: "Risk Measurement",
  title: "Estimating Market Risk Measures",
  tagline: "How to turn a pile of P&L data into one defensible number: 'this is how much we could lose.' Everything else in Part II calibrates, stress-tests, or regulates this number.",

  teaches: `<p>This is the foundation reading of the entire curriculum. It teaches you to compute <strong>Value at Risk (VaR)</strong> three ways — directly from sorted historical data, from a normal distribution, and from a lognormal distribution — and then to fix VaR's biggest blind spot with <strong>Expected Shortfall (ES)</strong>. It closes with two honesty tools: standard errors (how precise is my risk number?) and QQ plots (is my distributional assumption even right?).</p>
  <p>Think of this reading as building a ruler. The rest of Book 1 calibrates the ruler (R2), extends it to catastrophes (R3), audits it (R4), and finally replaces its markings by regulation (R16).</p>`,

  why: `<p>Every risk management decision — how much capital to hold, whether a trade is too risky, whether a bank's model is trustworthy — starts with a single question: <strong>"how much could we lose, and how confident are we in that number?"</strong> Before VaR existed, firms described risk position-by-position with Greeks and notionals that couldn't be added up. VaR was invented to give one firm-wide, probability-based loss number a CEO or regulator can act on. ES was invented roughly a decade later because VaR turned out to answer the wrong question about tails — and that gap between the two is now written into bank regulation (FRTB, R16).</p>`,

  intuition: `<p>Line up your last 1,000 daily P&L outcomes from worst to best. Walk in 5% of the way from the worst end. The loss you're standing on is your 95% VaR: <em>"on 95% of days we do better than this."</em></p>
  <p>Now notice what VaR ignores: everything to your left. Whether the worst 5% of days lose a little more than VaR or lose ten times VaR — VaR is identical. <strong>ES walks into that left tail and takes the average.</strong> That's the whole conceptual difference: VaR is a threshold, ES is the average severity beyond the threshold. Two portfolios can have identical VaR and wildly different ES — and it's the ES-difference that kills institutions.</p>
  <p>The parametric versions just replace the sorted data with a smooth curve (normal for P&L, lognormal when prices can't go negative) so the quantile comes from a formula instead of a ranking.</p>`,

  visual: `<div class="widget" data-widget="quantile"></div>`,

  formulas: [
    { name: "Historical simulation VaR — rank", math: "\\text{rank} = (\\alpha \\times n) + 1", note: "1,000 obs at 95% → 0.05×1000+1 = 51st worst observation. Some past exams use \\(\\alpha \\times n\\) = 50th. Follow the question's convention; \\((\\alpha n)+1\\) is the book answer." },
    { name: "Normal VaR (P&L form)", math: "\\text{VaR} = -\\mu_{P\\&L} + \\sigma_{P\\&L} \\times z_\\alpha", note: "z = 1.65 (95%), 2.33 (99%). Mean profit reduces VaR — don't drop the \\(- \\mu\\) term." },
    { name: "Lognormal VaR", math: "\\text{VaR} = P_0\\left[\\,1 - e^{\\,\\mu_R - \\sigma_R\\, z_\\alpha}\\right]", note: "Guarantees the implied worst-case price stays positive. For small \\(\\sigma\\) and short horizons it converges to normal VaR (e^x ≈ 1+x)." },
    { name: "Expected Shortfall", math: "\\text{ES} = E\\!\\left[\\,L \\mid L > \\text{VaR}\\,\\right] = \\text{average of tail VaRs}", note: "Slice the tail into n equal-probability pieces, average the slice VaRs; as n→∞ this converges to true ES." },
    { name: "Standard error of a quantile", math: "\\text{SE}(q) = \\dfrac{\\sqrt{p(1-p)/n}}{f(q)}", note: "More data (n↑) → tighter. Wider bins (f(q)↑) → tighter. Drives the 'how much can I trust this VaR' confidence interval." }
  ],

  concepts: [
    {
      name: "Arithmetic vs geometric returns",
      def: "Arithmetic return: simple P&L over the period, no reinvestment of interim payments. Geometric (continuously compounded) return: ln-based, assumes reinvestment, and guarantees the implied price can never go negative.",
      intuition: "Arithmetic is fine when the horizon is short and moves are small. Geometric is the honest choice for longer horizons — and it's the mathematical cousin of the lognormal VaR model.",
      example: "For small returns the two are nearly identical (ln(1.02) ≈ 0.0198). The gap widens with big moves and long horizons.",
      pitfall: "Sign convention: FRM quotes VaR and losses as positive numbers even though the quantile is mathematically negative. An answer choice with the wrong sign is automatically wrong — a free point.",
      related: ["Lognormal VaR", { r: 12, label: "R12 — convexity of 1/(1+r)" }],
      memory: "Geometric = 'growth' — can't grow below zero."
    },
    {
      name: "Historical simulation VaR",
      def: "Sort the n historical returns worst-to-best; VaR is the observation at rank \\((\\alpha \\times n)+1\\) — the loss that cuts the worst \\(\\alpha\\)% off.",
      intuition: "Zero distributional assumptions: the data IS the distribution. That's its strength (handles skew and fat tails automatically) and its weakness (it can't imagine anything worse than what already happened).",
      example: "1,000 monthly returns, 95% → 51st worst. If that return is −15.5% on a $1,000,000 position, monthly VaR = $155,000.",
      counter: "An IPO with 3 months of history, or a market that just shifted regimes — HS has nothing valid to sort. That failure motivates mapping (R5) and weighting (R2).",
      pitfall: "The 50th-vs-51st observation ambiguity has genuinely been tested both ways. Know both conventions and follow the question.",
      related: [{ r: 2, label: "R2 — weighted HS fixes equal weighting" }, { r: 3, label: "R3 — EVT fixes the unseen-tail problem" }],
      memory: "HS = 'History Sorted.'"
    },
    {
      name: "Parametric VaR (normal / lognormal)",
      def: "Assume a distribution for P&L (normal) or returns (lognormal); VaR falls out of the distribution's quantile formula instead of the empirical ranking.",
      intuition: "You trade data-hunger for assumption-risk. The formula needs only \\(\\mu\\) and \\(\\sigma\\) — but if the true tail is fatter than normal, your VaR is systematically too small in exactly the states that matter.",
      example: "Annual P&L ~ N($15M, $\\(10M^{2})\\): VaR(5%) = −15 + 10(1.65) = $1.5M; VaR(1%) = −15 + 10(2.33) = $8.3M. Deeper confidence ⇒ larger VaR, always.",
      counter: "If a question shows VaR(99%) < VaR(95%), that's an impossibility being tested, not a computation.",
      pitfall: "Normal and lognormal VaR converge for small \\(\\sigma\\) and short horizons (e^x ≈ 1+x). Don't be surprised when the two 'agree' — recognizing the convergence IS the question.",
      related: ["QQ plots — checking the assumption", { r: 15, label: "R15 — the market itself rejects lognormal (smiles)" }]
    },
    {
      name: "Expected Shortfall",
      def: "The probability-weighted average loss GIVEN that the VaR threshold has been breached: ES = E[L | L > VaR].",
      intuition: "VaR asks 'where does the tail start?'; ES asks 'how bad is it in there, on average?' Computed as the average of VaRs at deeper and deeper confidence levels within the tail.",
      example: "Slice the 5% tail into 5 equal slices, read the VaR at each boundary, average them. More slices → converges to true ES.",
      pitfall: "ES ≥ VaR at the same confidence level, always, for any distribution — an average of losses each at least as bad as VaR cannot be smaller than VaR.",
      related: [{ r: 16, label: "R16 — FRTB makes 97.5% ES the law" }, "Coherent risk measures"],
      memory: "VaR is the door to the tail; ES is the average temperature inside."
    },
    {
      name: "Coherent risk measures",
      def: "A weighted average of quantiles across the ENTIRE distribution, with weights given by a chosen risk-aversion function. ES is the special case where the weight is 1/(1−c) inside the tail and zero elsewhere.",
      intuition: "The general recipe says: express how much you dislike each part of the loss distribution, then average with those dislikes as weights. ES's 'dislike function' is an indicator: only the tail counts, equally.",
      pitfall: "'Coherent risk measure' ≠ 'ES.' ES is ONE example. The general coherent measure weights every quantile, not just tail quantiles — the exam uses them as if interchangeable to catch you.",
      related: [{ r: 6, label: "R6 — spectral measures & subadditivity" }],
      memory: "Coherent = whole distribution, chosen weights; ES = tail only, flat weights."
    },
    {
      name: "Standard errors & confidence intervals for risk estimates",
      def: "An estimated VaR/ES is a statistic with sampling error: SE(q) = \\(\\sqrt{p(1- p)/n}/f(q)\\), giving a confidence band around the risk number itself.",
      intuition: "A VaR of $10M estimated from 100 observations and one from 10,000 observations are not equally trustworthy — the SE quantifies exactly how much.",
      example: "Comparative statics the exam tests: n↑ → SE↓. Bin width h↑ → f(q)↑ → SE↓. p toward 0.5 → p(1−p)↑ → SE↑.",
      pitfall: "Deep-tail quantiles have few data points supporting them — the tension that motivates EVT (R3).",
      related: [{ r: 3, label: "R3 — EVT for data-starved tails" }]
    },
    {
      name: "QQ plots",
      def: "Plot empirical quantiles against theoretical quantiles of a reference distribution. Same family → straight 45° line; fat tails → matches in the middle, diverges at the ends.",
      intuition: "It's a face-to-face lineup of 'what my data did' vs 'what the model says it should have done', quantile by quantile. The divergence pattern in the tails is the visual signature of crash risk the normal understates.",
      pitfall: "QQ plots are a visual/diagnostic tool only — they 'identify' or 'inspect', they do NOT 'test' or 'prove' a distributional assumption. That verb distinction is a tested trap.",
      related: [{ r: 3, label: "R3 — what to do once you see fat tails" }]
    }
  ],

  connections: {
    from: [
      { label: "FRM Part I", why: "Normal distribution, z-scores, and quantiles are assumed fluent. If z=1.65/2.33 isn't instant recall, drill that first." }
    ],
    to: [
      { r: 2, why: "Non-parametric fixes for historical simulation's equal-weighting problem." },
      { r: 3, why: "EVT replaces 'hope the tail is normal' with a distribution built only for tails." },
      { r: 4, why: "Backtesting audits whether the VaR you computed here actually works." },
      { r: 5, why: "Mapping lets this machinery run on real many-position portfolios." },
      { r: 16, why: "FRTB writes the VaR→ES upgrade into law at 97.5% confidence." },
      { r: 26, why: "Credit VaR reuses the quantile-minus-mean logic on a skewed loss distribution." },
      { r: 85, why: "Book 5 decomposes exactly this portfolio VaR into marginal/component pieces." }
    ],
    confused: [
      { what: "VaR confidence level vs backtest confidence level", how: "The 95% used to compute VaR and the 95% used to test exception counts are separate choices that happen to share a number (see R4)." },
      { what: "ES vs coherent risk measure", how: "ES is one member of the coherent family — the tail-only, equal-weight member." },
      { what: "P&L data vs return data", how: "Normal VaR formula uses \\(- \\mu +\\sigma z\\) on P&L; lognormal works on returns then converts through \\(P_{0}\\). Mixing the two forms is a classic calculation error." }
    ]
  },

  misconceptions: [
    { wrong: "\"VaR tells you how bad losses can get at the 95% level.\"", right: "VaR tells you the best of the worst 5% — a threshold, not a worst case. It says nothing about severity beyond itself; that's ES's job." },
    { wrong: "\"VaR(99%) < VaR(95%) is possible if the data is weird.\"", right: "Never. Deeper confidence always means an equal-or-larger VaR. Answer choices that reverse the ordering are automatically wrong." },
    { wrong: "\"The QQ plot proves returns are non-normal.\"", right: "QQ plots are visual diagnostics — they suggest, identify, inspect. 'Test' or 'prove' language is the trap." },
    { wrong: "\"Lognormal VaR and normal VaR should give clearly different answers.\"", right: "For small \\(\\sigma\\) and short horizons they converge (e^x ≈ 1+x). Recognizing convergence is itself a tested skill." },
    { wrong: "\"More extreme quantiles are always estimated less precisely.\"", right: "SE depends on \\(p(1- p)/f(q)^{2}\\) — p(1−p) is maximized at p=0.5. The real problem with deep tails is fewer supporting data points, which is the EVT motivation, not the SE formula per se." }
  ],

  highYield: [
    { stars: 5, what: "Normal VaR = \\(- \\mu\\) + \\(\\sigma z\\) and the two z-values (1.65, 2.33).", why: "Appears in more questions across Part II than any other formula — market VaR, credit VaR inputs, portfolio VaR, FRTB comparisons." },
    { stars: 5, what: "ES = average tail loss, ES ≥ VaR always, and WHY VaR's tail-blindness matters.", why: "The conceptual spine of R6 (subadditivity), R16 (FRTB), and multiple 'which measure is better' questions." },
    { stars: 4, what: "Historical simulation ranking: \\((\\alpha n)+1\\) convention, and the 50th/51st ambiguity.", why: "A cheap calculation question with a deliberately planted convention trap." },
    { stars: 4, what: "SE comparative statics (n, h, p directions).", why: "Tested as 'what happens to the confidence interval if…' — no computation, pure direction." },
    { stars: 3, what: "Lognormal VaR formula and its convergence to normal VaR.", why: "Less frequent, but the convergence insight is a recurring distractor." },
    { stars: 3, what: "Coherent risk measure = whole-distribution weighted quantiles.", why: "One-line concept check; the ES-is-a-special-case distinction earns the point." }
  ],

  recall: [
    { q: "Explain to a non-quant colleague why two portfolios with identical 95% VaR can have very different risk.", a: "VaR only marks the threshold where the worst 5% begins. One portfolio's tail might lose 1.1× VaR on bad days, another's 10× VaR. ES exposes this because it averages the tail; VaR is blind to it by construction." },
    { q: "You have 500 daily returns and want 99% HS VaR. Which observation do you take, and what's the ambiguity?", a: "0.01×500 = 5 tail observations; book convention takes the (5+1) = 6th worst. Some exams use the 5th worst \\((\\alpha n)\\). Follow the stated convention; default to \\((\\alpha n)+1\\)." },
    { q: "Why does the lognormal model guarantee prices can't go negative — and when does that guarantee stop mattering numerically?", a: "Returns are modeled as \\(ln(P_{1}/P_{0})\\), so the implied price is \\(P_{0}\\cdot e^r\\) > 0 always. For small \\(\\sigma /short\\) horizons e^x ≈ 1+x, so lognormal and normal VaR converge — the guarantee is there but the numbers barely differ." },
    { q: "What happens to the SE of a quantile estimate if you increase the bin width h?", a: "Wider bins capture more probability mass, raising f(q), which sits in the denominator — so SE falls and the confidence interval narrows." },
    { q: "Why is ES described as 'the average of VaRs'? What limit makes this exact?", a: "Slice the tail into n equal-probability slices and average the VaR at each slice boundary; as n→∞ the average converges to E[L | L > VaR], the true ES." }
  ],

  hooks: [
    { title: "The ruler", text: "R1 builds a ruler for risk. R2 sands its rough edges, R3 extends it past the last marking, R4 checks it against reality, R16 makes the government stamp it. When lost anywhere in Book 1, ask: what is this reading doing to the ruler?" },
    { title: "The door and the room", text: "VaR is the door into the tail-room; ES is the average temperature inside the room. Regulators eventually decided they cared about the room, not the door (FRTB)." },
    { title: "51, not 50", text: "1,000 observations at 95%: 50 observations belong to the tail, so the VaR observation is the 51st — the first one NOT in the tail. 'The tail has 50 residents; VaR is the doorman.'" }
  ],

  summary: `<p><strong>VaR</strong> = the loss threshold at a confidence level; compute it by ranking history (HS), or from \\(- \\mu +\\sigma z\\) (normal P&L), or \\(P_{0}[1- e^{\\mu - \\sigma z}]\\) (lognormal returns). <strong>ES</strong> = average loss beyond VaR; always ≥ VaR; it's the tail-severity fix and the future regulatory standard. <strong>Coherent measures</strong> generalize ES with arbitrary quantile weights. Every estimate carries a <strong>standard error</strong> — know the n/h/p directions. <strong>QQ plots</strong> visually diagnose (never 'prove') distributional fit and reveal the fat tails that motivate the rest of the book. Sign convention: losses quoted positive. Ranking convention: \\((\\alpha n)+1\\), but follow the question.</p>`
});
