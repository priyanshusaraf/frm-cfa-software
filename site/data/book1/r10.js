FRM.register({
  book: 1, reading: 10,
  session: "Term Structures & Volatility",
  title: "Empirical Approaches to Risk Metrics and Hedging",
  tagline: "How different points on the interest rate curve move together, and how to hedge one bond position with another when they don't move in perfect lockstep.",

  teaches: `<p>Study Session 2 was about correlation between different assets. This reading turns to a specific, practically important correlation question: yield curve co-movement. You learn why naive DV01-neutral hedging fails, the regression hedge and its adjustment factor \\(\\beta\\), two-variable regression hedges, level-vs-change regression specifications, and PCA's decomposition of the whole curve into level/slope/curvature.</p>`,

  why: `<p>Bond desks hedge constantly, but different points on the curve (or different instruments — nominal vs real yields) don't move exactly 1-for-1. A naive DV01-neutral hedge silently assumes they do, leaving residual risk nobody priced. This reading is the practical toolkit that motivates the more theoretical term-structure models in Readings 11-15 — it's what a desk does with historical data BEFORE reaching for a full model.</p>`,

  intuition: `<p>If yields moved in perfect lockstep, DV01-matching would be a perfect hedge. They don't — a nominal T-bond yield typically moves by MORE than one basis point per basis point move in a real (TIPS) yield. The fix: run a regression of one yield change on the other, and use the SLOPE \\((\\beta )\\), not 1.0, as your hedge ratio. This also gives you something a naive DV01 hedge never provides: an \\(R^{2}\\) telling you how good the hedge actually is.</p>
  <p>PCA takes this idea to its logical extreme: instead of hedging one yield against one other yield, decompose ALL yield curve movements (30 maturities) into a small number of uncorrelated factors, ranked by variance explained. The first three — level, slope, curvature — usually explain the overwhelming majority of curve variation, letting you hedge the whole curve with just three numbers instead of thirty.</p>`,

  formulas: [
    { name: "Regression hedge ratio", math: "F_{R} \\times DV01_{R} \\times \\beta = F_{N} \\times DV01_{N}", note: "\\(\\beta\\) from regressing nominal yield changes on real yield changes; solve for the hedge face amount F_R." },
    { name: "PCA variance identity", math: "\\Sigma (PC variances) = \\Sigma (individual rate variances)", note: "No information lost — PCA just re-expresses the same total variance in uncorrelated components." }
  ],

  concepts: [
    {
      name: "Why DV01-neutral hedging fails",
      def: "A DV01-neutral hedge assumes the hedge instrument's yield moves 1-for-1 with the hedged position's yield. In reality this ratio is rarely exactly 1.",
      example: "Nominal T-bond hedged with TIPS: nominal yield typically moves by MORE than one basis point per basis point move in the real yield — the relationship isn't 1:1, leaving residual risk in a naive DV01 hedge.",
      related: ["Regression hedge & hedge adjustment factor β"]
    },
    {
      name: "Regression hedge & the hedge adjustment factor β",
      def: "Regress the hedged instrument's yield change on the hedge instrument's yield change; the slope \\(\\beta\\) becomes the hedge adjustment factor multiplying the naive DV01 ratio.",
      example: "\\(\\beta\\) = 1.0198 (nominal moves 1.0198bp per 1bp real move): selling $100M T-bond → buy $100M × (DV01_N/DV01_R) × 1.0198 ≈ $82.55M TIPS.",
      pitfall: "The regression hedge assumes \\(\\beta\\) is CONSTANT over time — a known unrealistic simplification. The correct practical response is estimating \\(\\beta\\) over multiple time windows and comparing, NOT treating it as ever truly fixed.",
      related: [{ r: 13, label: "R13 — term structure models formalize rate co-movement further" }],
      memory: "\\(\\beta\\) is the hedge's 'exchange rate' between two yields that don't move 1-for-1."
    },
    {
      name: "Two-variable regression hedge",
      def: "Hedge an illiquid maturity (e.g., 20-year swap) with two liquid maturities (10Y and 30Y) using a two-variable regression; resulting risk weights \\((\\beta\\) coefficients) split the hedge.",
      example: "Resulting weights might be 22% in the 10Y, 78% in the 30Y.",
      pitfall: "Two-variable hedges generally improve \\(R^{2}\\) over a single-variable hedge, but are NOT foolproof — they can fail badly in a genuine crisis when historical relationships break down.",
      related: ["Regression hedge & hedge adjustment factor β"]
    },
    {
      name: "Level vs change regressions",
      def: "Change-on-change \\((\\Delta y\\) on \\(\\Delta x)\\) vs level-on-level (y on x) both give unbiased, consistent coefficients.",
      pitfall: "In BOTH specifications the error terms are serially correlated over time, meaning NEITHER approach is fully statistically efficient. A third specification allows today's error to partly carry over from yesterday's error plus a new shock — explicitly modeling this serial correlation.",
      related: ["PCA of the yield curve"]
    },
    {
      name: "PCA of the yield curve",
      def: "Re-expresses correlated rate changes across the whole curve (e.g., 30 maturities) as a small number of UNCORRELATED factors, ranked by variance explained.",
      intuition: "Properties: (1) sum of PC variances = sum of individual rate variances (no information lost), (2) PCs are mutually uncorrelated by construction, (3) each PC captures the maximum remaining variance given the earlier ones.",
      example: "The first 3 PCs — commonly interpreted as LEVEL, SLOPE, and CURVATURE — explain the overwhelming majority of yield curve variation, letting you hedge against the whole curve with just 3 factors instead of 30.",
      related: [{ r: 5, label: "R5 — VaR mapping's philosophy of compressing many risk factors into few" }],
      memory: "Level, slope, curvature — PCA's 'big three' that explain almost everything the curve does."
    }
  ],

  connections: {
    from: [
      { r: 5, why: "Mapping already established 'compress many factors into few'; PCA is the yield-curve-specific version of that idea." },
      { r: 7, why: "Correlation basics generalized; this reading specializes correlation analysis to the interest-rate curve." }
    ],
    to: [
      { r: 11, why: "Having hedged empirically with historical regressions, R11 builds the theoretical machinery (trees) underneath rate evolution." },
      { r: 79, why: "ALM duration-gap analysis in Book 4 reuses level/slope/curvature-style curve risk thinking." }
    ],
    confused: [
      { what: "DV01-neutral vs regression hedge", how: "DV01-neutral assumes a 1:1 yield relationship; regression hedge uses the empirically estimated \\(\\beta\\), which is rarely exactly 1." },
      { what: "PCA factors vs risk-factor mapping (R5)", how: "R5 maps positions onto EXTERNALLY chosen risk factors (an index, a maturity bucket); PCA DERIVES the factors statistically from the data itself, guaranteeing they're uncorrelated." }
    ]
  },

  misconceptions: [
    { wrong: "\"A DV01-neutral hedge fully eliminates interest rate risk between two related instruments.\"", right: "Only if their yields move exactly 1-for-1, which is empirically rare (e.g., nominal vs real yields) — leaving residual risk a regression hedge would have caught." },
    { wrong: "\"The regression hedge ratio \\(\\beta\\) is a stable, permanent constant.\"", right: "It's explicitly a known-unrealistic simplification — best practice re-estimates \\(\\beta\\) over multiple windows rather than trusting one fixed value." },
    { wrong: "\"Level-on-level and change-on-change regressions are both fully efficient once they're unbiased.\"", right: "Both are unbiased and consistent, but BOTH have serially correlated errors, meaning neither is fully statistically efficient." },
    { wrong: "\"A two-variable hedge is essentially foolproof since it improves \\(R^{2}\\) over a single-variable hedge.\"", right: "Better average fit does not guarantee crisis performance — two-variable hedges can fail badly when historical relationships break down under stress." }
  ],

  highYield: [
    { stars: 3, what: "Why DV01-neutral hedging fails (nominal vs real yield example) and how the regression \\(\\beta\\) fixes it.", why: "A clean, frequently tested numeric-plus-conceptual combination." },
    { stars: 3, what: "PCA properties: variance identity, uncorrelated by construction, level/slope/curvature interpretation.", why: "Conceptual recall that connects to the mapping philosophy across the whole curriculum." },
    { stars: 2, what: "\\(\\beta\\) is assumed constant — a known limitation requiring re-estimation across windows.", why: "A compact, testable caveat." },
    { stars: 2, what: "Level-on-level vs change-on-change: both unbiased, both inefficient due to serial correlation.", why: "A precise, easily mixed-up two-part fact." }
  ],

  recall: [
    { q: "Why doesn't matching DV01 between a nominal T-bond and a TIPS position guarantee a good hedge?", a: "DV01 matching implicitly assumes nominal and real yields move 1-for-1. Empirically nominal yields move by MORE than one basis point per basis point of real-yield movement, so a naive DV01-neutral hedge leaves residual risk uncaptured by the 1:1 assumption." },
    { q: "What extra information does a regression hedge give you that a naive DV01 hedge never provides?", a: "The regression's \\(R^{2}\\) and standard error — a direct measure of how much of the hedged position's risk the hedge actually explains, i.e., how good the hedge really is." },
    { q: "Why do both level-on-level and change-on-change regression specifications fail to be fully efficient?", a: "In both cases the error terms are serially correlated over time — today's regression residual isn't independent of yesterday's, violating an efficiency (not unbiasedness) condition of OLS." },
    { q: "What does it mean, technically, that PCA's first three components are 'level, slope, and curvature,' and why does this matter practically?", a: "They're the three uncorrelated linear combinations of yield changes that capture the most variance, in order — practically, hedging against just these three factors captures nearly all real yield curve risk instead of needing 30 separate maturity hedges." }
  ],

  hooks: [
    { title: "The exchange rate between yields", text: "\\(\\beta\\) in a regression hedge is like an exchange rate between two currencies (nominal and real yield) that don't trade 1:1. Naive DV01 hedging assumes a fixed 1:1 exchange rate that doesn't exist." },
    { title: "Level, slope, curvature — the curve's big three", text: "Almost everything the yield curve does can be described by: is it higher or lower overall (level), is it steeper or flatter (slope), or is it more or less bowed (curvature). Three numbers replace thirty maturities." }
  ],

  summary: `<p><strong>DV01-neutral hedging fails</strong> when yields don't move 1:1 (e.g., nominal vs TIPS). <strong>Regression hedge</strong>: \\(\\beta\\) from \\(\\Delta y_hedged\\) on \\(\\Delta y_hedge\\) scales the naive DV01 ratio; gives \\(R^{2}/SE\\) as a hedge-quality readout; \\(\\beta\\) assumed constant is a known limitation — re-estimate across windows. <strong>Two-variable hedges</strong> (e.g., 10Y+30Y for a 20Y) improve \\(R^{2}\\) but aren't crisis-proof. <strong>Level-on-level vs change-on-change</strong>: both unbiased/consistent, both inefficient (serially correlated errors). <strong>PCA</strong>: decomposes the whole curve into uncorrelated factors, no variance lost; first three (level, slope, curvature) explain most curve variation, letting you hedge 30 maturities with 3 numbers.</p>`
});
