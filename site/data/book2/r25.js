FRM.register({
  book: 2, reading: 25,
  session: "Credit Risk Estimation",
  title: "Estimating Default Probabilities",
  tagline: "Arguably the single most important reading in Book 2 — the toolbox every later quant reading draws from.",

  teaches: `<p>Altman's Z-score, rating migration matrices (cumulative/marginal PD), hazard rates, CDS mechanics and spreads, the CDS-bond basis, real-world vs. risk-neutral PDs, and the precise numerical Merton model. Budget real time here.</p>`,

  why: `<p>Every downstream quant reading — Credit VaR (R26), portfolio credit risk (R27), structured credit (R28), CVA (R29, R37), credit derivatives (R30) — needs a default probability as an input. This reading is where you learn every method of actually producing one, and crucially, when to use which.</p>`,

  intuition: `<p>There are fundamentally three ways to estimate PD: from a firm's financial STATEMENTS (Altman's Z-score — a discriminant function on balance-sheet ratios), from historical RATING BEHAVIOR (migration matrices — cumulative/marginal PD read off transition tables), or from MARKET PRICES (hazard rates backed out of credit spreads, or the Merton model backed out of equity value and volatility). Each answers a slightly different question and lives in a different part of the curriculum.</p>
  <p>The single most important conceptual fact: RISK-NEUTRAL PD (backed out of market spreads) is systematically HIGHER than REAL-WORLD PD (based on historical default rates) for the same firm — because market prices embed a risk premium for bearing systematic, illiquidity, and unsystematic risk that isn't captured by pure historical frequency. Use risk-neutral PDs for valuation/pricing; use real-world PDs for scenario analysis.</p>`,

  visual: `<div class="widget" data-widget="merton"></div>`,

  formulas: [
    { name: "Altman's Z-score (public manufacturers)", math: "Z = 1.2X_{1} + 1.4X_{2} + 3.3X_{3} + 0.6X_{4} + 0.999X_{5}", note: "X1=WC/TA, X2=RE/TA, X3=EBIT/TA, X4=MV equity/BV liabilities, X5=Sales/TA. Z>3: safe · 2.7-3: potential default · 1.8-2.7: reasonable PD · <1.8: high likelihood." },
    { name: "Constant hazard rate", math: "Q(t) = 1 - e^{-}\\lambda^{t}", note: "PD by time t under a constant default intensity \\(\\lambda\\)." },
    { name: "Hazard rate from credit spread (bond near par)", math: "\\lambda \\approx s(T) / (1 - RR)", note: "s(T) = credit spread (annual expected loss). The ancestor formula of R30's CDS pricing and R37's CVA." },
    { name: "CDS-bond basis", math: "\\text{CDS-bond basis} = \\text{CDS spread} - \\text{bond yield spread}", note: "Should ≈ 0 in theory; nonzero in practice due to specific named frictions." },
    { name: "Merton setup (precise numeric)", math: "E_0 = \\text{Black-Scholes call on }V_0;\\quad \\sigma_E\\,E_0 = N(d_1)\\,\\sigma_V\\,V_0", note: "Solve simultaneously for V0 (asset value) and \\(\\sigma V\\) (asset volatility) given observable E0 and \\(\\sigma E\\)." }
  ],

  concepts: [
    {
      name: "Altman's Z-score",
      def: "A linear discriminant function on five balance-sheet ratios predicting bankruptcy likelihood for public manufacturers.",
      example: "Z>3: no default likely. 2.7-3: potential default. 1.8-2.7: reasonable probability of default. <1.8: high likelihood of default.",
      related: [{ r: 21, label: "R21 — the empirical/judgmental model family this belongs to" }]
    },
    {
      name: "Rating migration matrices",
      def: "Cumulative PD is read straight off the matrix; marginal PD in year t = cumulative(t) − cumulative(t−1).",
      pitfall: "Investment-grade marginal PD tends to RISE in early years (stable-looking issuers can deteriorate); low-grade (junk) marginal PD tends to FALL after early years (survivors of the risky early period are self-selected as sturdier). This directional asymmetry is a classic trap if you assume marginal PD always behaves the same way.",
      related: ["Hazard rate (default intensity)"],
      memory: "IG PD rises early (surprise deterioration); junk PD falls after early years (survivorship self-selection)."
    },
    {
      name: "Hazard rate (default intensity)",
      def: "Q(t) = \\(1- e^{- \\lambda t}\\) for constant hazard rate \\(\\lambda\\). Approximate: \\(\\lambda\\) ≈ s(T)/(1−RR) for a bond priced near par.",
      example: "3/5/10-yr CDS spreads = 80/90/110bps, RR=65%: avg hazard(3yr)=2.29%, avg hazard(5yr)=2.57%, avg hazard(10yr)=3.14%. Forward hazard rate Yr3-5: [(5×2.57%)−(3×2.29%)]/2 = 2.99%.",
      pitfall: "A more precise hazard-rate calc (for bonds priced away from par) compares risk-free vs. risky bond prices; the price gap equals PV of expected loss, set equal to \\(\\Sigma (discounted\\) LGD×Q) and solved for Q.",
      related: [{ r: 30, label: "R30 — the full CDS spread valuation this formula anchors" }, { r: 37, label: "R37 — CVA's discounting engine, built on this same hazard rate" }]
    },
    {
      name: "Recovery rates",
      def: "Trading price (as % of face) roughly one month after default. Senior debt recovers more than subordinated.",
      pitfall: "Recovery rate is NEGATIVELY correlated with default rate — weak economies produce both more defaults AND lower recoveries on those defaults (a double-whammy that shows up again in R28's tranche analysis).",
      related: [{ r: 23, label: "R23 — the same double-whammy mechanism in retail's 'dark side'" }],
      memory: "Bad times: more defaults AND worse recovery on each one — the double-whammy."
    },
    {
      name: "CDS mechanics",
      def: "Protection buyer pays a periodic spread (quarterly, in arrears, standard dates Mar/Jun/Sep/Dec 20) until maturity or credit event. On default: physical settlement (buyer delivers cheapest-to-deliver bond) or cash settlement (par minus CTD's post-default price).",
      example: "Standardized coupon = 100bps for investment grade; gap between fair spread and fixed coupon settled as an up-front premium. CDS spread > coupon → buyer pays seller PV(spread−coupon) up front; spread < coupon → seller pays buyer.",
      related: ["CDS-bond basis"]
    },
    {
      name: "CDS-bond basis",
      def: "CDS-bond basis = CDS spread − bond yield spread, should ≈ 0 by arbitrage logic. If CDS spread < bond yield spread: buy bond + buy CDS protection → earn more than risk-free. If CDS spread > bond yield spread: sell bond + sell CDS protection → borrow below risk-free.",
      pitfall: "Basis can be nonzero in practice for SPECIFIC named reasons: bonds trading away from par, CDS counterparty risk, the CTD option (positive basis), CDS excluding accrued interest (negative basis), restructuring clauses (positive basis). The exam sometimes asks which DIRECTION a specific friction pushes the basis — know the list, not just that 'frictions exist.'",
      related: [{ r: 30, label: "R30 — full CDS pricing mechanics" }]
    },
    {
      name: "Real-world vs. risk-neutral PD",
      def: "Risk-neutral PD assumes assets grow at the risk-free rate; real-world PD assumes assets grow at risk-free + risk premium — so real-world asset values are higher, hence real-world PD is LOWER than risk-neutral PD for the same debt level.",
      pitfall: "Use RISK-NEUTRAL PDs for valuation/pricing; use REAL-WORLD PDs for scenario analysis. Bond-implied (risk-neutral) hazard rates run far above historical (real-world) hazard rates — the gap is compensation for systematic risk, illiquidity, and unsystematic risk that can't be fully diversified in a bond book.",
      related: [{ r: 29, label: "R29 — the guidance table on which PD to use where" }],
      memory: "Risk-neutral PD (market-implied) > real-world PD (historical) — always, for the same firm at the same time."
    },
    {
      name: "Merton model — precise numeric version",
      def: "E_T = max(V_T − D, 0); solve simultaneously E0 = Black-Scholes call on V0, and \\(\\sigma_E\\cdot E0\\) = \\(N(d1)\\cdot \\sigma_V\\cdot V0\\).",
      example: "E0=$3M, \\(\\sigma E=80\\)%, D=$10M, T=1yr, r=5% → V0=$12.40M, \\(\\sigma V=21.23\\)%, N(d1)=0.9117, N(d2)=0.873. Risk-neutral PD = N(−d2) = 12.7%. Distance to default d2=1.1408. Expected loss on debt = (9.51−9.40)/9.51 = 1.2% of no-default value.",
      related: [{ r: 21, label: "R21 — the conceptual Merton model this makes precise" }]
    }
  ],

  connections: {
    from: [
      { r: 21, why: "This reading makes Merton's conceptual introduction precise and numerical, and generalizes the rest of the PD toolkit." }
    ],
    to: [
      { r: 26, why: "Credit VaR needs a PD input for every asset — every method here feeds it." },
      { r: 29, why: "The risk-neutral-vs-real-world PD distinction resurfaces explicitly in R29's guidance table." },
      { r: 30, why: "\\(\\lambda \\approx s/(1- RR)\\) is the direct ancestor of R30's full CDS-spread valuation." },
      { r: 37, why: "The hazard-rate discounting engine feeds directly into the CVA formula." }
    ],
    confused: [
      { what: "Risk-neutral PD vs real-world PD", how: "Risk-neutral (assets grow at rf) is used for PRICING; real-world (assets grow at rf+risk premium, hence lower PD) is used for SCENARIO/stress analysis. Never swap the use case." },
      { what: "IG marginal PD trend vs junk marginal PD trend", how: "IG marginal PD tends to RISE early (surprise deterioration); junk marginal PD tends to FALL after early years (survivorship). Opposite directional patterns for opposite reasons." }
    ]
  },

  misconceptions: [
    { wrong: "\"Marginal default probability always rises or always falls over time regardless of credit quality.\"", right: "Investment-grade marginal PD tends to RISE in early years (deterioration surprises); junk marginal PD tends to FALL after early years (survivorship self-selection). The direction depends on starting credit quality." },
    { wrong: "\"Risk-neutral and real-world PD should be used interchangeably.\"", right: "Risk-neutral PD (market-implied, always higher) is for VALUATION/PRICING; real-world PD (historical, lower) is for SCENARIO ANALYSIS. Using the wrong one for the wrong purpose is a common, tested error." },
    { wrong: "\"The CDS-bond basis should always equal exactly zero.\"", right: "It should ≈0 in theory, but specific named frictions (par mismatch, CDS counterparty risk, CTD option, accrued interest exclusion, restructuring clauses) push it nonzero in practice — and each friction has a specific, testable direction." },
    { wrong: "\"Recovery rate and default rate are independent of each other.\"", right: "They're NEGATIVELY correlated — weak economies produce both more defaults and lower recoveries simultaneously, a double-whammy for credit losses." }
  ],

  highYield: [
    { stars: 5, what: "\\(\\lambda\\) ≈ s(T)/(1−RR) and full hazard rate mechanics (worked CDS spread example).", why: "The most-repeated formula thread in Book 2 — ancestor of R30's CDS pricing and R37's CVA." },
    { stars: 5, what: "Risk-neutral vs. real-world PD: which is higher, why, and which to use for pricing vs. scenario analysis.", why: "A foundational distinction reused explicitly in R29 and implicitly throughout the book." },
    { stars: 4, what: "Merton precise numerical solution: solving simultaneously for \\(V0/\\sigma V\\), then PD=N(−d2).", why: "The calculation backbone of this reading, directly testable as a multi-step numeric problem." },
    { stars: 4, what: "CDS-bond basis: the five named frictions and their direction.", why: "A precise list-based question format GARP favors — know the list, not just 'frictions exist.'" },
    { stars: 3, what: "Recovery rate negatively correlated with default rate.", why: "A compact, high-value fact that resurfaces in R28's tranche analysis." },
    { stars: 3, what: "IG vs junk marginal PD trend asymmetry.", why: "A subtle directional trap worth memorizing as a pair." }
  ],

  recall: [
    { q: "A 5-year CDS trades at 90bps with RR=65%. Estimate the average hazard rate.", a: "\\(\\lambda\\) ≈ s/(1−RR) = 0.90%/(1−0.65) = 0.90%/0.35 ≈ 2.57% — the approximate constant hazard rate consistent with this credit spread and recovery assumption." },
    { q: "Why is risk-neutral PD systematically higher than real-world PD for the same firm?", a: "Risk-neutral PD assumes assets grow at the risk-free rate; real-world PD assumes assets grow at risk-free PLUS a risk premium, giving a higher expected asset value path and hence a LOWER probability of falling below the default threshold. The gap between the two compensates for systematic risk, illiquidity, and unsystematic risk that can't be fully diversified away." },
    { q: "Why might a CDS-bond basis be persistently positive rather than zero?", a: "The cheapest-to-deliver (CTD) option embedded in physically-settled CDS gives the protection buyer a valuable choice among deliverable bonds, and broad restructuring clauses add extra triggering scenarios — both push CDS spreads up relative to the bond yield spread, creating a positive basis." },
    { q: "Explain why investment-grade bonds show RISING marginal default probability in early years while junk bonds show FALLING marginal probability after the early years.", a: "IG issuers start from a position of apparent strength; the passage of time reveals which ones are actually deteriorating, so marginal PD creeps up as hidden problems surface. Junk issuers start already risky; the ones that survive the dangerous early period are self-selected as the sturdier survivors, so their marginal PD tends to fall thereafter." }
  ],

  hooks: [
    { title: "Three routes to the same number", text: "Statements (Z-score), history (migration matrices), market prices (hazard rates, Merton) — three completely different data sources converging on the same target: PD. Know which route a question is using before reaching for a formula." },
    { title: "The market always charges a premium", text: "Risk-neutral PD > real-world PD, always — the market prices in a premium for bearing risk that history alone doesn't show. Use the market number to price, the history number to stress-test." },
    { title: "The double-whammy of bad times", text: "Recovery rates fall exactly when default rates rise — weak economies hit you twice, not once." }
  ],

  summary: `<p><strong>Altman's Z-score</strong>: 5-ratio discriminant, Z>3 safe, <1.8 high default likelihood. <strong>Migration matrices</strong>: marginal PD = cumulative(t)−cumulative(t−1); IG marginal PD rises early, junk falls after early years. <strong>Hazard rate</strong>: \\(Q(t)=1- e^{- \\lambda t}\\); \\(\\lambda \\approx s(T)/(1- RR)\\) from credit spreads. <strong>Recovery rate</strong> negatively correlated with default rate. <strong>CDS mechanics</strong>: periodic spread, physical/cash settlement, up-front premium for coupon gaps. <strong>CDS-bond basis</strong> ≈0 in theory; five named frictions push it off zero in practice. <strong>Risk-neutral PD</strong> (pricing) > <strong>real-world PD</strong> (scenario analysis) always, for the same firm. <strong>Merton</strong> (precise): solve simultaneously for V0, \\(\\sigma V\\) from observable E0, \\(\\sigma E\\); PD_RN=N(−d2).</p>`
});
