FRM.register({
  book: 5, reading: 85,
  session: "Risk Management and Investment Management",
  title: "Portfolio Risk: Analytical Methods",
  tagline: "Decomposing portfolio risk into marginal, incremental, and component VaR — the toolkit for actually managing (not just measuring) a multi-position portfolio's risk.",

  teaches: `<p>Diversified vs undiversified vs individual VaR, the role of correlation (uncorrelated and perfectly-correlated bounds), marginal VaR, incremental VaR (and its shortcut approximation), component VaR, using marginal VaR to find the risk-minimizing portfolio, and the excess-return-to-marginal-VaR ratio for finding the OPTIMAL (not just minimum-risk) portfolio.</p>`,

  why: `<p>This is Book 1's VaR machinery (R1, R5) applied to the specific job of managing a live multi-asset portfolio: which position should I trim, which should I add to, and where's the genuinely optimal (not just lowest-risk) allocation?</p>`,

  intuition: `<p>Correlation sets the BOUNDS on portfolio VaR: \\(\\rho =0\\) gives the lower bound \\((VaR_P=\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}})\\), \\(\\rho =1\\) gives the upper bound \\((VaR_P=VaR_{1}+VaR_{2}\\), the "undiversified" case). Everything in between reflects partial diversification benefit.</p>
  <p>MARGINAL VaR is the per-unit-change sensitivity (∂VaR_P/∂position) — conveniently expressed as (VaR_P/portfolio \\(value)\\times \\beta_i\\). INCREMENTAL VaR is the ACTUAL change in VaR from adding a whole new position — in principle needs full portfolio revaluation (expensive, especially with hundreds of positions), but can be approximated cheaply using the marginal VaR shortcut for SMALL additions. COMPONENT VaR (=MVaR_i × dollar weight = \\(VaR_P\\times \\beta_i\\times w_i)\\) answers "how much would total VaR fall if I removed this position entirely" — and component VaRs SUM EXACTLY to total portfolio VaR, a clean decomposition.</p>
  <p>The critical distinction for portfolio MANAGEMENT (not just risk measurement): setting all marginal VaRs EQUAL gives you the MINIMUM-VARIANCE portfolio — but that's not the OPTIMAL portfolio. The optimal portfolio equates the EXCESS-RETURN-TO-MARGINAL-VAR ratio across all positions (the VaR-based analogue of the Sharpe ratio's tangency condition) — a portfolio can have the lowest possible risk and still leave return on the table.</p>`,

  visual: `<div class="widget" data-widget="compvar" data-unit="$" data-compvar='[{"label":"Asset A ($4M, σ=6%, MVaR=0.0644)","cvar":257713},{"label":"Asset B ($2M, σ=14%, MVaR=0.1754)","cvar":350777}]'></div>`,

  formulas: [
    { name: "Individual VaR", math: "VaR_{i} = Z_c \\times \\sigma_{i} \\times |w_{i}| \\times P", note: "Absolute value of weight — both long and short positions carry risk." },
    { name: "Portfolio VaR — uncorrelated (lower bound)", math: "VaR_P = \\sqrt{VaR_{1}^{2} + VaR_{2}^{2}}", note: "\\(\\rho =0\\). \\(VaR_{1}=\\)$2.4M, \\(VaR_{2}=\\)$1.6M → \\(VaR_P=\\sqrt{2.4^{2}+1.6^{2}}=\\)$2.88M." },
    { name: "Portfolio VaR — perfectly correlated (upper bound)", math: "VaR_P = VaR_{1} + VaR_{2} (undiversified VaR)", note: "\\(\\rho =1\\), no diversification benefit — the sum of individual VaRs." },
    { name: "Marginal VaR", math: "MVaR_{i} = (VaR_P / portfolio value) \\times \\beta_{i}", note: "\\(\\beta_{i}\\) from regressing position i's return on total portfolio return." },
    { name: "Incremental VaR (shortcut)", math: "IVaR \\approx [new position's risk-factor vector] \\cdot [vector of marginal VaRs]", note: "Cheaper than full portfolio revaluation for small position additions." },
    { name: "Component VaR", math: "CVaR_{i} = MVaR_{i} \\times (w_{i}\\times P) = VaR_P \\times \\beta_{i} \\times w_{i}", note: "Sums exactly across all i to total portfolio VaR — a clean decomposition." },
    { name: "Risk-minimizing condition", math: "\\text{MVaR}_i = \\text{MVaR}_j\\quad\\text{for all }i,j", note: "Equal marginal VaRs → global minimum-VARIANCE portfolio (NOT necessarily optimal)." },
    { name: "Optimal (not just minimum-risk) portfolio condition", math: "\\dfrac{\\text{excess return}_i}{\\text{MVaR}_i} = \\dfrac{\\text{excess return}_j}{\\text{MVaR}_j}\\quad\\text{for all }i,j", note: "Equating excess-return-to-marginal-VaR ratios gives the OPTIMAL portfolio — the VaR-based Sharpe-tangency condition." }
  ],

  concepts: [
    {
      name: "Diversified, undiversified, and individual VaR",
      def: "Diversified VaR: portfolio VaR accounting for correlation/diversification effects. Undiversified VaR: sum of individual position VaRs (the \\(\\rho =1\\) case, no diversification credit). Individual VaR: VaR of one position considered in isolation, \\(VaR_{i}=Z_c\\times \\sigma_{i}\\times |w_{i}|\\times P\\).",
      pitfall: "The absolute value on weight matters — SHORT positions carry risk too, and VaR cannot be negative.",
      related: [{ r: 5, label: "R5 — undiversified/diversified VaR, the same concept from Book 1's mapping reading" }]
    },
    {
      name: "The role of correlation — bounds on portfolio VaR",
      def: "\\(\\rho =0\\) gives the LOWER bound: \\(VaR_P=\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}}\\). \\(\\rho =1\\) gives the UPPER bound: \\(VaR_P=VaR_{1}+VaR_{2}\\) (undiversified VaR).",
      example: "\\(VaR_{1}=\\)$2.4M, \\(VaR_{2}=\\)$1.6M: uncorrelated \\(VaR_P=\\sqrt{2.4^{2}+1.6^{2}}\\approx\\)$2.88M; perfectly correlated VaR_P=$4.0M. Actual VaR_P for any real (partial) correlation sits between these two bounds.",
      related: []
    },
    {
      name: "Marginal VaR",
      def: "The per-unit change in portfolio VaR from an additional investment in a position — ∂VaR_P/∂(position). Conveniently expressed as \\(MVaR_{i}=(VaR_P/portfolio\\) \\(value)\\times \\beta_{i}\\), where \\(\\beta_{i}\\) comes from regressing position i's returns on total portfolio returns.",
      example: "Portfolio X, VaR=€400,000, 4 equally-weighted €1M assets, Asset A beta=1.2: MVaR_A=(400,000/4,000,000)×1.2=0.12 — VaR changes by €0.12 per €1 change in Asset A.",
      related: ["Component VaR"]
    },
    {
      name: "Incremental VaR",
      def: "The ACTUAL change in VaR from adding a whole NEW position — generally larger than marginal VaR and can include nonlinear effects marginal VaR assumes away.",
      pitfall: "Precise incremental VaR requires FULL PORTFOLIO REVALUATION (measuring both the new position's risk AND the change in every existing position's risk) — expensive for large portfolios. The shortcut: (1) estimate the new position's risk-factor vector, (2) get the portfolio's vector of marginal VaRs for those risk factors (often already known), (3) take the cross (dot) product — much cheaper since managers typically already have MVaR estimates on hand.",
      example: "Assets A ($4M, \\(\\sigma =6\\)%) and B ($2M, \\(\\sigma =14\\)%), uncorrelated, z=1.65: adding $10,000 to A → incremental VaR ≈ $10,000×0.064428 = $644.28 (using A's marginal VaR).",
      related: [],
      memory: "Marginal VaR: the instantaneous slope. Incremental VaR: the actual change for a real (possibly nonlinear) addition — marginal VaR is the cheap shortcut approximation to it."
    },
    {
      name: "Component VaR",
      def: "\\(CVaR_{i}\\) = \\(MVaR_{i}\\times (w_{i}\\times P)\\) = \\(VaR_P\\times \\beta_{i}\\times w_{i}\\) — the amount portfolio VaR would fall if position i were REMOVED entirely.",
      example: "Portfolio X, VaR=€400,000, Asset A \\((\\beta =1.2\\), €1M of €4M total, w=0.25): CVaR_A = MVaR_A×(w×P) = 0.12×€1,000,000 = €120,000 — removing Asset A would cut portfolio VaR by €120,000. Assets A ($4M, MVaR=0.064428) and B ($2M, MVaR=0.175388): CVaR_A=0.064428×$4M=$257,713; CVaR_B=0.175388×$2M=$350,777.",
      pitfall: "Component VaRs sum EXACTLY to total portfolio VaR — \\(\\Sigma\\) \\(CVaR_{i}\\) = VaR_P, a clean, complete decomposition (unlike individual/undiversified VaR, which overstates by ignoring diversification).",
      related: [],
      memory: "Component VaR answers 'what would I lose (in VaR reduction) if I deleted this position' — and all the components add up perfectly to the whole."
    },
    {
      name: "Non-elliptical distributions: historical component VaR",
      def: "For non-normal (non-elliptical) return distributions, use historical sorting instead: (1) sort historical portfolio returns, (2) find the portfolio return R_P(VaR) corresponding to the chosen VaR confidence level, (3) find each position's return on the date(s) R_P(VaR) occurred, (4) use those position-level returns as the component VaR estimates — averaging over nearby dates improves the estimate.",
      related: []
    },
    {
      name: "Risk-minimizing vs. return-optimizing portfolios",
      def: "Setting all marginal VaRs EQUAL \\((MVaR_{i}=MVaR_{j}\\) for all i,j) finds the GLOBAL MINIMUM-VARIANCE portfolio — but risk management (minimizing risk) is NOT the same as portfolio management (optimizing risk-adjusted return).",
      pitfall: "The truly OPTIMAL portfolio equates the EXCESS-RETURN-TO-MARGINAL-VAR ratio across positions: (excess \\(return_{i})/MVaR_{i}\\) = (excess \\(return_{j})/MVaR_{j}\\) — this is the VaR-based analogue of the Sharpe-ratio tangency portfolio on the efficient frontier. A portfolio with equal marginal VaRs (minimum variance) is generally NOT the same portfolio as the one with equal excess-return-to-MVaR ratios (optimal).",
      example: "Assets A ($4M, excess return 6%, MVaR≈0.0644) and B ($2M, excess return 11%, MVaR≈0.1754): ratio for A = 0.06/0.0644≈0.93; ratio for B = 0.11/0.1754≈0.63 — A's ratio is HIGHER, so the portfolio should shift ALLOCATION TOWARD A (increase to $4.5M) and away from B (decrease to $1.5M) to move toward optimal, even though this doesn't minimize variance.",
      related: [],
      memory: "Equal marginal VaRs = lowest RISK. Equal excess-return/MVaR ratios = highest RISK-ADJUSTED RETURN. These are two different destinations — don't confuse minimizing risk with optimizing the portfolio."
    }
  ],

  connections: {
    from: [
      { r: 5, why: "Undiversified/diversified VaR and matrix-based portfolio VaR calculation are the direct ancestors of this reading's machinery." },
      { r: 84, why: "Portfolio construction's active risk aversion and alpha refinement directly consume this reading's marginal/component VaR outputs." }
    ],
    to: [
      { r: 86, why: "Risk budgeting allocates a total risk budget across managers/asset classes using exactly this component VaR decomposition." }
    ],
    confused: [
      { what: "Marginal VaR vs incremental VaR", how: "Marginal VaR is the instantaneous per-unit sensitivity (a partial derivative, assumes linearity). Incremental VaR is the actual change from adding a real, discrete new position (can include nonlinear effects) — marginal VaR is the CHEAP APPROXIMATION to incremental VaR for small additions." },
      { what: "Equal marginal VaRs vs equal excess-return-to-MVaR ratios", how: "Equal MVaRs → minimum-VARIANCE portfolio (lowest risk, ignores return). Equal excess-return/MVaR ratios → OPTIMAL portfolio (best risk-adjusted return) — these are generally different allocations." },
      { what: "Component VaR vs individual VaR", how: "Individual VaR ignores diversification (each position's stand-alone risk); component VaR incorporates the position's actual correlation with the rest of the portfolio via beta, and component VaRs sum exactly to total portfolio VaR (individual VaRs do not — they overstate)." }
    ]
  },

  misconceptions: [
    { wrong: "\"The portfolio with all marginal VaRs equal is the optimal portfolio.\"", right: "Equal marginal VaRs give the MINIMUM-VARIANCE portfolio — the OPTIMAL (best risk-adjusted return) portfolio instead equates the excess-return-to-marginal-VaR ratio across positions. Minimizing risk and optimizing the portfolio are different objectives with different solutions." },
    { wrong: "\"Component VaRs for individual positions, summed together, generally exceed total portfolio VaR.\"", right: "Component VaRs sum EXACTLY to total portfolio VaR \\((\\Sigma CVaR_{i}=VaR_P)\\) — this is a defining, clean property of the component VaR decomposition, unlike individual (stand-alone) VaRs which DO overstate when summed (ignoring diversification)." },
    { wrong: "\"Incremental VaR and marginal VaR are the same measure with different names.\"", right: "Marginal VaR is a per-unit sensitivity (a derivative); incremental VaR is the actual VaR change from a discrete new position addition, generally larger and possibly nonlinear — marginal VaR is only an approximation to incremental VaR, valid for small additions." },
    { wrong: "\"Computing incremental VaR via full portfolio revaluation is generally cheaper and just as accurate as the marginal VaR shortcut.\"", right: "Full revaluation is MORE COSTLY (requires re-measuring the whole covariance structure) but MORE ACCURATE. The marginal VaR shortcut is less costly (managers often already have MVaR estimates) but less accurate for large or nonlinear position additions." }
  ],

  highYield: [
    { stars: 5, what: "Uncorrelated \\((\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}})\\) and perfectly correlated \\((VaR_{1}+VaR_{2})\\) portfolio VaR bounds — full worked calculations.", why: "The most frequently and directly calculation-tested formula pair in this reading." },
    { stars: 5, what: "Marginal VaR formula (VaR_P/portfolio value × \\(\\beta )\\) and full worked calculation.", why: "The core building block for incremental and component VaR — master this first." },
    { stars: 5, what: "Optimal portfolio condition: equal excess-return-to-marginal-VaR ratios (NOT equal marginal VaRs) — and the worked reallocation example.", why: "The single most conceptually important — and most frequently confused — result in this reading." },
    { stars: 4, what: "Component VaR formula and the property that components sum exactly to total VaR.", why: "A clean, elegant decomposition, frequently tested via calculation." },
    { stars: 3, what: "Incremental VaR's shortcut approximation (risk-factor vector · marginal VaR vector) vs. full revaluation trade-off (cost vs accuracy).", why: "A precise conceptual trade-off, frequently tested." }
  ],

  recall: [
    { q: "Two uncorrelated positions have \\(VaR_{1}=\\)$10 million and \\(VaR_{2}=\\)$20 million. What is portfolio VaR?", a: "VaR_P = \\(\\sqrt{10^{2}+20^{2}}\\) = \\(\\sqrt{500}\\) ≈ $22.36 million." },
    { q: "A manager notices Position A's marginal VaR is much lower than Position B's, and shifts capital from B to A until the two marginal VaRs are equal. Has the manager found the optimal portfolio?", a: "No — equalizing marginal VaRs finds the MINIMUM-VARIANCE portfolio, not necessarily the optimal one. To find the truly optimal portfolio, the manager needs to equate each position's EXCESS-RETURN-TO-MARGINAL-VAR ratio, not just its marginal VaR alone. A position could have a low marginal VaR but also a low expected excess return, making it a poor allocation choice on a risk-adjusted basis despite its small marginal VaR." },
    { q: "Why is incremental VaR generally more expensive to compute accurately than marginal VaR, and when is the marginal VaR shortcut most appropriate?", a: "Precise incremental VaR requires FULL REVALUATION of the entire portfolio after adding the new position — remeasuring not just the new position's own risk but how it changes the risk contribution of every existing position (via the covariance matrix). This is expensive for portfolios with many positions. The marginal VaR shortcut (using the new position's risk-factor vector dotted with the portfolio's existing marginal VaR vector) is much cheaper and reasonably accurate for SMALL additions to the portfolio, where nonlinear effects are minimal." },
    { q: "A portfolio has Position X (excess return 9%, MVaR 0.06) and Position Y (excess return 12%, MVaR 0.075). Which position's allocation should increase to move toward the optimal portfolio?", a: "Compute the ratios: X = 0.09/0.06 = 1.5; Y = 0.12/0.075 = 1.6. Since Y's ratio is higher, the portfolio should increase its allocation to Y (and/or decrease X) to move toward the point where both ratios are equal — the optimal portfolio condition." }
  ],

  hooks: [
    { title: "Two bounds, one truth between them", text: "\\(\\rho =0\\) and \\(\\rho =1\\) aren't just special cases — they're the floor and ceiling. Real-world portfolio VaR always lands somewhere between the uncorrelated square-root-of-sum-of-squares and the fully-additive undiversified sum." },
    { title: "Equal risk isn't the finish line", text: "Chasing equal marginal VaRs across positions feels like 'balancing' the portfolio — but it only balances RISK, ignoring RETURN entirely. The finish line is equal excess-return-per-unit-of-marginal-risk, not equal risk itself." },
    { title: "Components that add up perfectly", text: "Component VaR is the rare risk decomposition that's actually TRUE arithmetic — every position's slice, summed, equals the whole pie exactly. No double-counting, no leftover crumbs." }
  ],

  summary: `<p><strong>Individual VaR</strong>\\(=Z\\times \\sigma \\times |w|\\times P\\). <strong>Bounds</strong>: uncorrelated \\(VaR_P=\\sqrt{\\Sigma VaR_{i}^{2}}\\) (lower); perfectly \\(correlated=\\Sigma VaR_{i}\\) (upper, "undiversified"). <strong>Marginal VaR</strong>=(VaR_P/portfolio \\(value)\\times \\beta_{i}\\) — the per-unit sensitivity. <strong>Incremental VaR</strong>=actual change from a new position (needs full revaluation for precision; MVaR-based dot-product shortcut for small additions). <strong>Component VaR</strong>\\(=MVaR_{i}\\times (w_{i}\\times P)=VaR_P\\times \\beta_{i}\\times w_{i}\\) — sums EXACTLY to total portfolio VaR. <strong>Risk-minimizing</strong> portfolio: equal marginal VaRs \\((MVaR_{i}=MVaR_{j})\\). <strong>Optimal</strong> portfolio: equal excess-return-to-marginal-VaR ratios — a DIFFERENT, more valuable condition than simply minimizing risk. Non-elliptical distributions: use historical-return sorting to estimate component VaR instead of the beta-based formula.</p>`
});
