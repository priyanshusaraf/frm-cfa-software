FRM.register({
  book: 1, reading: 5,
  session: "Risk Measurement",
  title: "VaR Mapping",
  tagline: "Real portfolios have thousands of positions. Mapping replaces each one with its exposure to a small set of common risk factors, so the Reading 1-4 machinery can run on a manageable number of variables.",

  teaches: `<p>Mapping is the bridge between the single-P&L-series machinery of Readings 1-4 and real, thousand-position portfolios. You learn why mapping is necessary, the general-vs-specific risk trade-off, three fixed-income mapping methods of increasing precision, stress testing via undiversified VaR, tracking error VaR, and how mapping extends to derivatives.</p>`,

  why: `<p>You cannot backtest, stress-test, or even estimate a covariance matrix for 5,000 individual stocks — that's ~12.5 million pairwise covariances. Mapping exists so that all the VaR/ES/backtesting machinery built in Readings 1-4 can be applied to a manageable handful of risk factors (an equity index, a set of yield curve points, an FX rate) instead of every individual position.</p>`,

  intuition: `<p>Mapping is a translation exercise: instead of describing a bond by its unique cash flows, describe it by its exposure to a handful of shared risk factors — points on the yield curve, an equity index, a currency. Once every position speaks the same risk-factor language, you can add, net, and correlate them.</p>
  <p>The central trade-off is <strong>precision vs manageability</strong>: more risk factors shrink the unexplained ("specific") risk but cost more computation. Specific risk is NOT a fixed property of an asset — it shrinks every time you add a finer risk factor (duration-only → +credit factor → +currency factor). Fixed-income mapping shows this literally: principal mapping (crudest, one number) → duration mapping (better) → full cash-flow mapping (most precise, captures genuine diversification across maturities).</p>`,

  visual: `<div class="widget" data-widget="bars" data-title="Fixed-income mapping precision ranking (same $200M bond portfolio)" data-caption="More precision (right to left) almost always means a LOWER, more realistic VaR — because it captures diversification cruder methods miss." data-bars='{"items":[{"l":"Principal mapping","v":2.968,"d":"$2.968M","c":"#ef7b7b"},{"l":"Duration mapping","v":2.737,"d":"$2.737M","c":"#e8b45a"},{"l":"Cash flow (undiversified)","v":2.674,"d":"$2.674M","c":"#5fd4d0"},{"l":"Cash flow (diversified)","v":2.615,"d":"$2.615M","c":"#4ecf8e"}]}'></div>`,

  formulas: [
    { name: "Undiversified VaR (ρ = 1)", math: "VaR_{undiv} = \\Sigma |x_{i}| V_{i}", note: "Sum of each mapped exposure's own VaR — assumes perfect correlation, always ≥ the diversified figure." },
    { name: "Diversified VaR", math: "\\text{VaR}_{\\text{div}} = \\sqrt{x'\\,R\\,x}\\quad(\\text{using correlation matrix }R)", note: "Full matrix algebra across mapped factor exposures; captures genuine diversification benefit." }
  ],

  concepts: [
    {
      name: "Why mapping is necessary",
      def: "Mapping is needed when: (1) too many positions to model individually, (2) a common risk-factor language is needed across different instrument types, (3) an asset lacks sufficient history (e.g., a recent IPO) and must borrow history from factors that have it, (4) exposures change over time (e.g., bonds rolling down the curve).",
      example: "A 5,000-stock portfolio needs ~12.5 million pairwise covariances stock-by-stock; mapping each stock to a market index via \\(\\beta\\) collapses this to essentially one factor.",
      related: [{ r: 10, label: "R10 — PCA compresses the yield curve the same way" }]
    },
    {
      name: "General vs specific risk",
      def: "More risk factors → smaller specific (residual/idiosyncratic) risk but more computation. General risk is what the common factors explain; specific risk is what's left over.",
      pitfall: "Specific risk is NOT a fixed, intrinsic property of an asset — it's a function of how finely you define general risk. Adding a credit factor, then a currency factor, to a bond model keeps shrinking 'specific risk' further. Treating it as unchangeable is the tested trap.",
      related: ["Fixed-income mapping methods"]
    },
    {
      name: "Fixed-income mapping: three methods",
      def: "Principal mapping: only principal repayment at the weighted-average life (simplest, least precise). Duration mapping: whole portfolio to a zero-coupon bond of matching duration (better, still one number). Cash-flow mapping: every cash flow mapped to its own maturity zero, including inter-maturity correlations (most precise, most complex).",
      example: "$100M 1-year (3.5% coupon) + $100M 5-year (5% coupon): principal mapping avg life 3yr → VaR $2.968M; duration mapping (duration 2.768yr) → $2.737M; cash-flow undiversified → $2.674M; cash-flow diversified (true correlations) → $2.615M. Ranking: principal ≥ duration ≥ cash-flow undiv ≥ cash-flow div.",
      pitfall: "More precision → lower VaR almost always, because it captures diversification cruder methods miss — not because the underlying risk changed.",
      related: ["Undiversified vs diversified VaR"],
      memory: "Principal → Duration → Cash flow: coarse to fine, expensive to cheap-sounding-VaR."
    },
    {
      name: "Stress testing & tracking error VaR",
      def: "Stressing each mapped zero by its own VaR (assuming \\(\\rho =1)\\) reproduces undiversified VaR without matrix algebra, but breaks down the moment correlations aren't perfect. Tracking error VaR measures a portfolio's VaR relative to a BENCHMARK.",
      pitfall: "Minimizing tracking error is NOT the same objective as minimizing absolute VaR — a portfolio can have the lowest absolute VaR and simultaneously the HIGHEST tracking error (classic example: a barbell portfolio vs a bulleted benchmark).",
      related: [{ r: 86, label: "R86 — risk budgeting reuses tracking-error logic" }]
    },
    {
      name: "Mapping derivatives",
      def: "Forwards, FRAs, and swaps decompose into linear combinations of basic building blocks (e.g., currency forward = long foreign bill + short domestic bill + spot FX) — delta-normal applies cleanly. Options are nonlinear.",
      pitfall: "Delta-normal VaR for options is a first-order (linear) local approximation, valid only over short horizons where delta is roughly stable. Long horizons or large price moves make it understate true option risk — exactly why FRTB and other frameworks lean on full revaluation or delta-gamma for options books.",
      related: [{ r: 16, label: "R16 — FRTB's response to exactly this limitation" }],
      memory: "Delta-normal is a snapshot; options need a movie."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "Mapping applies R1's VaR/ES machinery to real portfolios instead of a single P&L series." }
    ],
    to: [
      { r: 10, why: "PCA is mapping's spiritual successor for the yield curve — compress many maturities into a few factors." },
      { r: 16, why: "FRTB's liquidity-horizon waterfall and delta-vs-full-revaluation choices both build on mapping concepts." },
      { r: 85, why: "Component/marginal VaR in Book 5 decomposes portfolio risk using the same mapped-factor structure." }
    ],
    confused: [
      { what: "Undiversified vs diversified VaR", how: "Undiversified sums individual VaRs assuming \\(\\rho =1\\) (a stress-test shortcut); diversified uses the true correlation matrix and is always ≤ undiversified." },
      { what: "Specific risk vs idiosyncratic risk vs general risk", how: "Same thing — the part NOT explained by your chosen risk factors. It shrinks as your factor set grows finer; it is not a fixed asset property." },
      { what: "Delta-normal VaR vs full revaluation", how: "Delta-normal is a fast linear approximation, accurate only for small moves/short horizons; full revaluation actually reprices the option under each scenario and captures convexity." }
    ]
  },

  misconceptions: [
    { wrong: "\"Specific risk is an intrinsic property of an asset.\"", right: "It's a function of how finely general risk factors are defined — add factors, specific risk shrinks. It's a modeling choice, not a fixed quantity." },
    { wrong: "\"Minimizing tracking error also minimizes absolute VaR.\"", right: "They can point in opposite directions — a barbell portfolio can have the lowest absolute VaR and the highest tracking error versus a bulleted benchmark." },
    { wrong: "\"Delta-normal VaR is fine for options at any horizon.\"", right: "It's a first-order local approximation. Long horizons or large moves make delta itself shift meaningfully — understating true risk, which is why full revaluation/delta-gamma exist." },
    { wrong: "\"More precise mapping methods always show MORE risk.\"", right: "The opposite is typical: more precision captures genuine diversification, usually LOWERING the VaR estimate relative to cruder methods." }
  ],

  highYield: [
    { stars: 4, what: "The four reasons mapping is necessary (too many positions, common language, insufficient history, changing exposures).", why: "Straightforward conceptual recall, frequently tested as 'which of the following is NOT a reason.'" },
    { stars: 4, what: "Three fixed-income mapping methods, their precision ranking, and why they disagree.", why: "Calculation-adjacent conceptual question; know the ranking logic even without redoing the worked numbers." },
    { stars: 4, what: "Specific risk is not fixed — depends on factor granularity.", why: "A compact, frequently tested conceptual trap." },
    { stars: 3, what: "Tracking error VaR vs absolute VaR can diverge (barbell vs bullet example).", why: "The counter-intuitive divergence is the exact point GARP likes to test." },
    { stars: 3, what: "Delta-normal VaR's first-order limitation for options.", why: "Sets up FRTB's rationale later — recognize the mechanism, not just the label." }
  ],

  recall: [
    { q: "Why can't you just run historical simulation on 5,000 individual stock positions directly?", a: "You'd need the full covariance structure across 5,000 assets (~12.5M pairwise covariances) — computationally and statistically infeasible. Mapping each stock to a factor (e.g., market \\(\\beta )\\) collapses this to a tractable few factors." },
    { q: "A bond portfolio's duration-only model shows high 'specific risk.' You add a credit-spread factor. What happens to specific risk, and why doesn't this mean the bond became less risky?", a: "Specific risk shrinks — some of what was unexplained is now captured by the new factor. Total risk is unchanged; you've just relabeled part of 'specific' as 'general.' Specific risk is a modeling artifact, not an asset property." },
    { q: "Why does cash-flow mapping (diversified) produce a lower VaR than principal mapping for the same bond portfolio?", a: "Principal mapping crudely lumps everything at one weighted-average maturity, implicitly assuming perfect co-movement. Diversified cash-flow mapping captures the true (imperfect) correlation between different points on the curve, revealing real diversification benefit that cruder methods hide." },
    { q: "Explain how a portfolio can have the lowest absolute VaR yet the highest tracking error against its benchmark.", a: "Absolute VaR depends on the portfolio's own risk; tracking error depends on how differently it moves from the BENCHMARK. A very low-risk portfolio built very differently from a higher-risk benchmark (e.g., barbell vs bullet duration profile) can minimize its own VaR while maximizing its divergence from the benchmark." },
    { q: "Why does delta-normal VaR understate risk for options over a long horizon?", a: "Delta-normal is a linear (first-order) approximation valid only while delta itself stays roughly constant. Over a long horizon or big price move, delta shifts meaningfully (gamma effects), so the linear approximation misses the actual nonlinear payoff risk." }
  ],

  hooks: [
    { title: "Translation service", text: "Mapping is a translator: every position, no matter how exotic, gets restated in the same handful of risk-factor languages (rates, equities, FX) so they can finally be compared and combined." },
    { title: "The shrinking leftover", text: "Specific risk is the pizza slices left after everyone (each risk factor) has taken a bite. Add another eater (factor), the leftover shrinks — it was never a fixed size to begin with." },
    { title: "Snapshot vs movie", text: "Delta-normal VaR is a single photograph of an option's sensitivity; a big move or long horizon needs the whole movie (full revaluation) to see how that sensitivity itself changes." }
  ],

  summary: `<p>Mapping replaces many positions with exposures to a handful of shared risk factors so R1-4's machinery becomes tractable. <strong>General vs specific risk</strong>: specific risk shrinks as factors get finer — it is not fixed. <strong>Fixed-income mapping</strong>, coarse to fine: principal (weighted-avg life) → duration (single zero match) → cash-flow (every payment mapped, correlations included) — precision typically lowers VaR by revealing diversification. <strong>Undiversified VaR</strong> \\((\\Sigma |x_{i}|V_{i}\\), \\(\\rho =1)\\) is a stress-test upper bound; <strong>diversified VaR</strong> uses the true correlation matrix. <strong>Tracking error VaR</strong> (vs benchmark) can move opposite to absolute VaR — barbell vs bullet is the classic case. <strong>Derivatives</strong>: linear instruments (forwards/swaps) map cleanly; options need delta-normal (fast, first-order, breaks down over long horizons) or full revaluation/delta-gamma.</p>`
});
