export default ({
  book: 1, reading: 10,
  session: "Term Structures & Volatility",
  title: "Empirical Approaches to Risk Metrics and Hedging",
  tagline: "How different points on the interest rate curve move together, and how to hedge one bond position with another when they don't move in perfect lockstep.",

  teaches: `<p>Study Session 2 covered correlation between different assets. This reading takes that idea and asks a specific, practically important question: how does the yield curve co-move? You'll learn why naive DV01-neutral hedging fails, the regression hedge and its adjustment factor \\(\\beta\\), two-variable regression hedges, level-vs-change regression specifications, and PCA's decomposition of the whole curve into level, slope, and curvature.</p>
  <p>Concretely, this reading walks through two worked trades a real fixed-income desk runs. First, a nominal Treasury bond ("T-bond") shorted against a purchase of Treasury Inflation-Protected Securities ("TIPS"), where the T-bond's yield is a <em>nominal</em> yield (includes expected inflation) and the TIPS yield is a <em>real</em> yield (inflation stripped out). Second, an illiquid 20-year euro interest rate swap hedged with a blend of liquid 10-year and 30-year euro swaps. In both cases the naive approach, matching DV01 (dollar value of a one-basis-point move) one-for-one, turns out to be quietly wrong. Regression analysis on historical yield data is the fix.</p>`,

  why: `<p>Bond desks hedge constantly, but different points on the curve (or different instruments, like nominal vs real yields) don't move exactly 1-for-1. A naive DV01-neutral hedge silently assumes they do, leaving residual risk nobody priced. This reading is the practical toolkit that motivates the more theoretical term-structure models in Readings 11-15. It's what a desk does with historical data before reaching for a full model.</p>
  <p>It matters on the exam and in practice for the same reason. The calculations are short and mechanical (a hedge ratio, a face amount, a couple of regression coefficients), so they're cheap to test precisely, and they're exactly the kind of "get the face amount slightly wrong and the P&L doesn't hedge" mistake that costs real money on a trading desk.</p>`,

  intuition: `<p>If yields moved in perfect lockstep, DV01-matching would be a perfect hedge: sell $100 million of a bond, buy an offsetting face amount of another bond scaled so that a 1-basis-point move in yields produces equal and opposite dollar P&L on both legs. But nominal and real yields don't move 1-for-1. Empirically, the nominal T-bond yield moves by <em>more</em> than one basis point for every one-basis-point move in the TIPS (real) yield. The fix is to run an ordinary least squares (OLS) regression of the nominal yield's historical changes on the real yield's historical changes, and use the estimated SLOPE \\((\\beta)\\), not 1.0, to scale the DV01 hedge ratio. This also gives you something a naive DV01 hedge never provides: an \\(R^{2}\\) (how much of the nominal yield's variation the real yield explains) and a standard error of the regression, which tells you concretely how good the hedge actually is, not just its size.</p>
  <p>PCA (principal components analysis) takes this idea to its logical extreme. Instead of hedging one yield against one other yield, it decomposes ALL yield curve movements (say, 30 annual maturities from 1 year to 30 years) into a small number of uncorrelated statistical factors, ranked by how much variance each explains. The first three, conventionally interpreted as level (parallel up/down shift), slope (steepening/flattening), and curvature (bowing), usually explain the overwhelming majority of total curve variation. That lets a desk hedge the whole curve's risk with just three numbers instead of thirty separate maturity-by-maturity DV01 hedges.</p>`,

  formulas: [
    {
      name: "DV01-neutral hedge (naive, 1:1 assumption)",
      math: "F_{R} = F_{N} \\times \\dfrac{DV01_{N}}{DV01_{R}}",
      note: "The face amount of the hedge instrument (R) needed so a 1bp move produces equal and opposite dollar P&L to the hedged position (N), ASSUMING both yields move 1-for-1.",
      plain: "In other words: to offset a position's basis-point dollar sensitivity, buy an amount of the hedge instrument whose own DV01, per dollar of face value, scales up to match. It says nothing about whether the two yields actually move together.",
    },
    {
      name: "Regression hedge ratio (adjusted by β)",
      math: "F_{R} = F_{N} \\times \\dfrac{DV01_{N}}{DV01_{R}} \\times \\beta",
      note: "\\(\\beta\\) from regressing nominal yield changes on real yield changes (dependent = nominal, independent = real); it multiplies the naive DV01-neutral face amount.",
      plain: "Take the naive 1:1 DV01 hedge amount and scale it up (or down) by however much the hedged instrument's yield actually tends to move for every one-unit move in the hedge instrument's yield, as measured historically.",
      derivation: `<p>Start from the regression itself: over the historical sample, nominal yield changes \\(\\Delta y_{N}\\) and real yield changes \\(\\Delta y_{R}\\) are related by ordinary least squares as</p>
      \\[ \\Delta y_{N} = \\alpha + \\beta \\, \\Delta y_{R} + \\varepsilon \\]
      <p>where \\(\\alpha\\) is the intercept and \\(\\beta\\) is the slope of the best-fit line. A DV01-neutral hedge would be exactly correct only if \\(\\beta = 1\\) (every 1bp move in the real yield produces exactly a 1bp move in the nominal yield). Since the fitted \\(\\beta\\) is generally not 1, the correct hedge must produce dollar-for-dollar offsetting P&L for the AVERAGE relationship actually observed, not the assumed 1:1 relationship — so the naive DV01-neutral face amount is simply rescaled by \\(\\beta\\):</p>
      \\[ F_{R} \\times DV01_{R} \\times \\beta = F_{N} \\times DV01_{N} \\ \\Rightarrow\\ F_{R} = F_{N} \\times \\dfrac{DV01_{N}}{DV01_{R}} \\times \\beta \\]
      <p>Worked example from the reading: a trader shorts \\(F_{N} = \\$100\\,\\text{million}\\) of a nominal T-bond and hedges with TIPS. Regression of nominal yield changes on real (TIPS) yield changes gives \\(\\beta = 1.0198\\) — the nominal yield moves 1.0198bp for every 1bp move in the real yield. Applying \\(\\beta\\) to the DV01-neutral face amount produces a regression-hedge face amount of approximately \\(\\$82.55\\,\\text{million}\\) of TIPS (versus a somewhat larger, unadjusted DV01-neutral amount). Because \\(\\beta\\) was close to 1 in this example, the regression hedge did not move far from the naive DV01-neutral hedge — but the adjustment direction and size are only known once the regression is actually run.</p>`,
    },
    {
      name: "Two-variable regression hedge",
      math: "\\Delta y_{20} = \\alpha + \\beta_{10} \\, \\Delta y_{10} + \\beta_{30} \\, \\Delta y_{30} + \\varepsilon",
      note: "Regresses the illiquid maturity's yield change on TWO liquid maturities' yield changes; the fitted \\(\\beta_{10}\\) and \\(\\beta_{30}\\) become the risk weights (as a fraction of DV01) allocated to each hedge leg.",
      plain: "Instead of a single hedge ratio, split the hedge across two liquid instruments, weighting each by how much it historically explains the illiquid instrument's yield moves.",
      derivation: `<p>Worked example from the reading: a trader who receives the fixed rate on an illiquid 20-year euro interest rate swap wants to hedge with liquid 10-year and 30-year euro swaps. A five-year regression of changes in the 20-year swap rate on changes in the 10-year and 30-year swap rates yields \\(\\beta_{10} \\approx 0.2221\\) and \\(\\beta_{30} \\approx 0.7765\\). Because these two weights sum to approximately \\(1\\) (\\(0.2221 + 0.7765 \\approx 0.9986\\)), the combined DV01 of the two hedge legs, sized using these weights, comes out very close to the 20-year swap's own DV01: the trader hedges roughly 22.21% of the 20-year swap's DV01 with the 10-year swap and 77.65% of it with the 30-year swap.</p>`,
    },
    { name: "PCA variance identity", math: "\\sum_{i=1}^{n} \\text{Var}(PC_{i}) = \\sum_{i=1}^{n} \\text{Var}(r_{i})", note: "No information lost: PCA just re-expresses the same total variance across \\(n\\) individual rate changes \\(r_i\\) in \\(n\\) uncorrelated principal components \\(PC_i\\).", plain: "PCA doesn't destroy or manufacture variance. It just re-packages the exact same total variability of the curve into a new, uncorrelated set of factors." }
  ],

  concepts: [
    {
      name: "Why DV01-neutral hedging fails",
      def: "A DV01-neutral hedge assumes the hedge instrument's yield moves 1-for-1 with the hedged position's yield. It sizes the hedge face amount purely from the ratio of the two instruments' DV01s, with no adjustment for how the two yields actually co-move historically. In reality this ratio is rarely exactly 1.",
      intuition: "DV01 tells you how much a bond's price moves for a 1bp move IN ITS OWN yield. It says nothing about how correlated that yield is with a different instrument's yield. That's an empirical question a DV01 calculation alone can't answer.",
      example: "Nominal T-bond hedged with TIPS: a trader sells $100 million of the T-bond (nominal yield, includes inflation expectations) and buys TIPS (real yield, inflation stripped out) to hedge. Empirically the nominal T-bond yield typically moves by MORE than one basis point per basis point move in the TIPS real yield. The relationship isn't 1:1, so a naive DV01-neutral hedge leaves residual risk from that gap uncaptured.",
      pitfall: "It's tempting to think DV01-matching 'removes interest rate risk.' It only removes risk from a PARALLEL, 1:1 move between the two yields, which is exactly the assumption that fails between nominal and real yields.",
      related: ["Regression hedge & hedge adjustment factor β"]
    },
    {
      name: "Regression hedge & the hedge adjustment factor β",
      def: "Regress the hedged instrument's historical yield change (dependent variable) on the hedge instrument's historical yield change (independent variable) using ordinary least squares; the fitted slope \\(\\beta\\) becomes the hedge adjustment factor that multiplies the naive DV01-neutral face amount.",
      intuition: "Least squares finds the line of best fit through a scatterplot of paired historical yield changes. The intercept \\(\\alpha\\) captures any average drift between the two yields, and the slope \\(\\beta\\) captures how much one yield tends to move for every unit move in the other. That slope is exactly the number a DV01-neutral hedge implicitly (and wrongly) assumes equals 1.",
      example: "In the reading's worked trade, a trader shorts $100 million of a nominal T-bond and hedges with TIPS. Fitted \\(\\beta\\) = 1.0198, meaning the nominal yield moves 1.0198bp for every 1bp move in the real (TIPS) yield. Applying \\(\\beta\\) to the naive DV01-neutral face amount produces a regression-hedge purchase of approximately $82.55 million of TIPS.",
      pitfall: "The regression hedge assumes \\(\\beta\\) is CONSTANT over time, a known unrealistic simplification. The correct practical response is estimating \\(\\beta\\) over multiple time windows and comparing, NOT treating it as ever truly fixed.",
      related: [{ r: 13, label: "R13: term structure models formalize rate co-movement further" }],
      memory: "\\(\\beta\\) is the hedge's 'exchange rate' between two yields that don't move 1:1."
    },
    {
      name: "R² and standard error of the regression (SER) as hedge-quality readouts",
      def: "R² is the fraction of the hedged instrument's yield-change variance explained by the hedge instrument's yield changes; the standard error of the regression is the standard deviation of the regression's residual (unexplained) errors.",
      intuition: "A naive DV01-neutral hedge gives you a hedge SIZE but never tells you how RELIABLE that hedge actually is. R² and SER fill that gap. They let a trader estimate the volatility of the hedged portfolio's P&L in advance and decide whether the hedge is good enough to trade, before ever putting the position on.",
      related: ["Regression hedge & hedge adjustment factor β"]
    },
    {
      name: "Two-variable regression hedge",
      def: "Hedge an illiquid maturity (e.g., a 20-year swap) with two liquid maturities (e.g., 10-year and 30-year swaps) using a two-variable OLS regression of the illiquid maturity's yield change on both liquid maturities' yield changes; the fitted coefficients (risk weights, or \\(\\beta\\) values) split the hedge's DV01 between the two legs.",
      example: "A trader receives the fixed rate on an illiquid 20-year euro interest rate swap and hedges by selling a combination of 10-year and 30-year euro swaps. Regressing changes in the 20-year swap rate on changes in the 10- and 30-year rates over a five-year window gives risk weights of about 22.21% in the 10-year swap and 77.65% in the 30-year swap, weights that sum to roughly 1, so the combined hedge DV01 closely matches the 20-year position's own DV01.",
      pitfall: "Two-variable hedges generally improve \\(R^{2}\\) over a single-variable hedge, but they're NOT foolproof. They can fail badly in a genuine crisis (e.g., a financial crisis) when historical relationships between maturities break down.",
      related: ["Regression hedge & hedge adjustment factor β"]
    },
    {
      name: "Level vs change regressions",
      def: "Change-on-change regression (\\(\\Delta y\\) on \\(\\Delta x\\)) regresses the CHANGE in one yield on the CHANGE in another; level-on-level regression (\\(y\\) on \\(x\\)) regresses the raw LEVEL of one yield on the raw level of another. Both give unbiased, consistent coefficient estimates.",
      intuition: "'Unbiased and consistent' means both approaches get the coefficient right on average and converge to the true value with more data. But OLS needs more than that to be the BEST (most efficient, lowest-variance) estimator. It also needs the error terms to be independent of each other over time, and yields simply don't satisfy that in either specification.",
      pitfall: "In BOTH specifications the error terms are serially correlated over time (today's residual is related to yesterday's), meaning NEITHER approach is fully statistically efficient. A third specification exists that models this explicitly: today's error is assumed to equal some fraction of yesterday's error (for a constant correlation less than 1) plus a new, independent random shock, directly modeling the serial correlation instead of ignoring it.",
      related: ["PCA of the yield curve"]
    },
    {
      name: "PCA of the yield curve",
      def: "Principal components analysis re-expresses the correlated changes in rates across the whole curve (e.g., 30 annual maturities from 1 to 30 years) as a small number of UNCORRELATED statistical factors (principal components), ranked in order of how much of the total variance each one explains.",
      intuition: "Three defining properties. First, the sum of the variances of all the principal components equals the sum of the variances of all the individual rates: no information is lost, PCA is just a re-expression. Second, the principal components are mutually uncorrelated BY CONSTRUCTION, unlike raw maturities on the curve, which are highly correlated with each other. Third, each principal component is chosen to capture the MAXIMUM remaining variance given the components already chosen before it, so the first component captures more variance than any other single linear combination could, the second captures the most of what's left, and so on.",
      example: "For a set of swap rates at 1-through-30-year maturities, PCA produces 30 factors, but in practice the first 3 — conventionally interpreted as LEVEL (roughly parallel up/down movement of the whole curve), SLOPE (steepening or flattening), and CURVATURE (more or less bowing in the middle) — explain the overwhelming majority of yield curve variation. This lets a desk hedge against the whole curve's risk using just 3 factors instead of 30 separate maturity-by-maturity DV01 hedges.",
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
    { wrong: "\"A DV01-neutral hedge fully eliminates interest rate risk between two related instruments.\"", right: "Only if their yields move exactly 1-for-1, which is empirically rare (e.g., nominal T-bond yields vs TIPS real yields), leaving residual risk that a regression hedge would have caught." },
    { wrong: "\"The regression hedge ratio \\(\\beta\\) is a stable, permanent constant.\"", right: "It's explicitly a known-unrealistic simplification. Best practice re-estimates \\(\\beta\\) over multiple windows rather than trusting one fixed value." },
    { wrong: "\"Level-on-level and change-on-change regressions are both fully efficient once they're unbiased.\"", right: "Both are unbiased and consistent, but BOTH have serially correlated errors, meaning neither is fully statistically efficient." },
    { wrong: "\"A two-variable hedge is essentially foolproof since it improves \\(R^{2}\\) over a single-variable hedge.\"", right: "Better average fit does not guarantee crisis performance. Two-variable hedges can fail badly when historical relationships break down under stress (e.g., a financial crisis)." }
  ],

  highYield: [
    { stars: 3, what: "Why DV01-neutral hedging fails (nominal T-bond vs TIPS real-yield example) and how the regression \\(\\beta\\) fixes it, including computing the face amount of the offsetting position.", why: "A clean, frequently tested numeric-plus-conceptual combination. Expect a calculation, not just a definition." },
    { stars: 3, what: "PCA properties: variance identity, uncorrelated by construction, level/slope/curvature interpretation.", why: "Conceptual recall that connects to the mapping philosophy across the whole curriculum." },
    { stars: 2, what: "\\(\\beta\\) is assumed constant, a known limitation requiring re-estimation across windows.", why: "A compact, testable caveat." },
    { stars: 2, what: "Level-on-level vs change-on-change: both unbiased, both inefficient due to serial correlation.", why: "A precise, easily mixed-up two-part fact." },
    { stars: 2, what: "Two-variable regression hedge: computing risk weights (e.g., 22.21% in the 10Y, 77.65% in the 30Y) for an illiquid 20-year swap.", why: "Tests whether you can apply the same beta logic to a multi-instrument hedge, not just recall it conceptually." }
  ],

  recall: [
    { q: "Why doesn't matching DV01 between a nominal T-bond and a TIPS position guarantee a good hedge?", a: "DV01 matching implicitly assumes nominal and real yields move 1-for-1. Empirically nominal yields move by MORE than one basis point per basis point of real-yield movement, so a naive DV01-neutral hedge leaves residual risk uncaptured by the 1:1 assumption." },
    { q: "What extra information does a regression hedge give you that a naive DV01 hedge never provides?", a: "The regression's \\(R^{2}\\) and standard error: a direct measure of how much of the hedged position's risk the hedge actually explains, i.e., how good the hedge really is, letting a trader estimate the hedged portfolio's volatility in advance." },
    { q: "Why do both level-on-level and change-on-change regression specifications fail to be fully efficient?", a: "In both cases the error terms are serially correlated over time. Today's regression residual isn't independent of yesterday's, which violates an efficiency (not unbiasedness) condition of OLS." },
    { q: "What does it mean, technically, that PCA's first three components are 'level, slope, and curvature,' and why does this matter practically?", a: "They're the three uncorrelated linear combinations of yield changes that capture the most variance, in order. Practically, hedging against just these three factors captures nearly all real yield curve risk instead of needing 30 separate maturity hedges." },
    { q: "In the two-variable hedge of a 20-year euro swap with 10-year and 30-year swaps, why do the fitted risk weights (about 22.21% and 77.65%) approximately sum to 1?", a: "Because the 10-year and 30-year swaps together are being used to reconstruct the 20-year swap's sensitivity. Weights summing near 1 mean the combined DV01 of the two hedge legs, sized by those weights, closely matches the 20-year position's own DV01." }
  ],

  hooks: [
    { title: "The exchange rate between yields", text: "\\(\\beta\\) in a regression hedge is like an exchange rate between two currencies (nominal and real yield) that don't trade 1:1. Naive DV01 hedging assumes a fixed 1:1 exchange rate that doesn't exist." },
    { title: "Level, slope, curvature: the curve's big three", text: "Almost everything the yield curve does can be described by three questions: is it higher or lower overall (level), is it steeper or flatter (slope), or is it more or less bowed (curvature). Three numbers replace thirty maturities." }
  ],

  eli5: `<p>Imagine two friends who always seem to walk in the same direction, so you assume that if one takes exactly one step forward, the other does too. You'd hold their hands at a fixed one-to-one spacing to stay level with both. But watch them closely over many walks and you notice: whenever Friend A takes 1 step, Friend B actually tends to take about 1.02 steps. If you kept assuming 1-for-1 spacing, you'd slowly drift out of position relative to Friend B every single walk. So instead you clock their actual stride ratio over many past walks (a regression) and adjust your hand-spacing by that measured ratio (\\(\\beta\\)). You also get a sense of how RELIABLE that ratio is (how consistently B follows A, i.e., \\(R^2\\)), which a simple "assume 1:1" rule never gives you. In finance terms: Friend A is the real (TIPS) yield, Friend B is the nominal (T-bond) yield, the fixed one-to-one spacing is a naive DV01-neutral hedge, and the measured stride ratio is the regression hedge's \\(\\beta\\).</p>`,

  thinkLike: `<p>A fixed-income hedger never assumes two yields move together just because the instruments are related (Treasuries and TIPS both being U.S. government paper, or 10-, 20-, and 30-year points all sitting on the same swap curve). The first question is always empirical: "how have these two things actually co-moved historically, and how confident should I be in that relationship going forward?" That's why the regression hedge's \\(\\beta\\), \\(R^2\\), and standard error matter as much as the hedge's face amount. A trader who only computes the face amount and ignores \\(R^2\\) has sized a hedge without knowing how good it is.</p>
  <p>On the exam, GARP tends to test this reading with short, mechanical calculations. Given a DV01 ratio and a fitted \\(\\beta\\), compute the face amount to buy or sell. Given two swap-maturity betas, compute the risk-weighted split of a hedge. Or a conceptual question testing whether you know that \\(\\beta\\) is assumed CONSTANT (a limitation) and that BOTH level and change regressions are unbiased-but-inefficient due to serial correlation. Expect distractors built around plausible-but-wrong arithmetic (forgetting to multiply by \\(\\beta\\), or multiplying instead of dividing the DV01 ratio) and around swapping "unbiased" for "efficient."</p>`,

  breakdown: [
    {
      title: "The three empirical hedging tools, in order of sophistication",
      points: [
        "DV01-neutral hedge: sizes the offsetting face amount purely from the ratio of the two instruments' DV01s, assuming their yields move 1-for-1. Simplest, but silently wrong whenever that assumption fails (e.g., nominal T-bond vs TIPS).",
        "Single-variable regression hedge: regresses the hedged instrument's yield change on the hedge instrument's yield change, then scales the naive DV01 ratio by the fitted slope \\(\\beta\\), and additionally reports \\(R^2\\)/standard error as a hedge-quality readout.",
        "Two-variable regression hedge: regresses an illiquid maturity's yield change on TWO liquid maturities' yield changes (e.g., 20-year swap hedged with 10-year and 30-year swaps). The two fitted coefficients become risk weights splitting the hedge across both legs.",
        "Principal components analysis (PCA): instead of hedging pairwise, decomposes the ENTIRE curve's co-movement into a small number of uncorrelated statistical factors (level, slope, curvature), letting a desk hedge dozens of maturities at once with just three numbers."
      ]
    },
    {
      title: "PCA's three defining properties",
      points: [
        "Variance identity: the sum of the variances of all the principal components equals the sum of the variances of the individual rates. No information is created or destroyed, only re-expressed.",
        "Uncorrelated by construction: unlike raw maturities on the curve (which are highly correlated with each other), the principal components are mutually uncorrelated by design.",
        "Maximum remaining variance: each principal component is chosen to capture the largest possible share of variance left over after the earlier components, so the first three components (level, slope, curvature) typically capture almost all of the curve's total variance."
      ]
    },
    {
      title: "Level vs change regressions: the two schools of thought (plus the fix)",
      points: [
        "Change-on-change: regresses the CHANGE in one yield (\\(\\Delta y\\)) on the CHANGE in another (\\(\\Delta x\\)). Unbiased and consistent, but errors are serially correlated.",
        "Level-on-level: regresses the raw LEVEL of one yield (\\(y\\)) on the raw level of another (\\(x\\)). Also unbiased and consistent, and ALSO has serially correlated errors.",
        "Third specification (explicit serial correlation model): assumes today's error term equals some fraction (a constant correlation less than 1) of yesterday's error plus a new independent shock, directly modeling the autocorrelation that both simpler approaches ignore."
      ]
    }
  ],

  quiz: [
    {
      q: "A trader shorts $100 million of a nominal T-bond and wants to hedge with TIPS. A regression of nominal yield changes on real (TIPS) yield changes gives \\(\\beta = 1.0198\\). Compared to a naive DV01-neutral hedge, the regression-hedge face amount of TIPS purchased should be:",
      options: [
        "Smaller, because \\(\\beta > 1\\) means the nominal yield is less sensitive than the real yield",
        "Larger, scaled up by the factor 1.0198, because the nominal yield moves MORE than 1-for-1 with the real yield",
        "Identical, because \\(\\beta\\) only matters for two-variable hedges",
        "Smaller, scaled down by the factor 1/1.0198, to compensate for TIPS' higher DV01"
      ],
      answer: 1,
      why: "Since \\(\\beta = 1.0198 > 1\\), the nominal yield moves more than 1-for-1 with the real yield, so the DV01-neutral face amount is scaled UP by \\(\\beta\\) to fully offset that extra sensitivity (producing roughly $82.55 million of TIPS in the reading's example). The 'smaller' choices invert the direction of the adjustment, and the 'identical, β only matters for two-variable hedges' choice ignores that \\(\\beta\\) applies to single-variable hedges too."
    },
    {
      q: "What is the single biggest practical advantage a regression hedge offers over a plain DV01-neutral hedge?",
      options: [
        "It requires no historical data, only current market yields",
        "It guarantees zero P&L volatility on the hedged position",
        "It provides an estimate (via \\(R^2\\) and standard error) of how good the hedge actually is, which a DV01-neutral hedge never gives you",
        "It eliminates the need to know either instrument's DV01"
      ],
      answer: 2,
      why: "The regression's \\(R^2\\) and standard error quantify how much of the hedged instrument's risk the hedge instrument actually explains, which a DV01-neutral hedge never gives you. It still requires historical data and DV01s, and it cannot guarantee zero volatility (that requires \\(\\beta\\) to be perfectly stable and \\(R^2 = 1\\), which never holds in practice)."
    },
    {
      q: "A trader hedges an illiquid 20-year euro swap with 10-year and 30-year euro swaps. The two-variable regression gives risk weights of approximately 22.21% (10Y) and 77.65% (30Y). What does it mean that these weights sum to roughly 1?",
      options: [
        "The hedge is guaranteed to be crisis-proof since the weights are internally consistent",
        "The combined DV01 of the 10-year and 30-year legs, sized by these weights, closely matches the 20-year position's own DV01",
        "The trader should instead hedge 100% with the 30-year swap alone, since its weight is largest",
        "The weights summing to 1 proves the regression's \\(R^2\\) must also equal 1"
      ],
      answer: 1,
      why: "Weights summing near 1 means the reconstructed sensitivity of the two hedge legs approximates the 20-year swap's own DV01 well. It says nothing about crisis robustness (a two-variable hedge is explicitly NOT foolproof in a crisis), and nothing about \\(R^2\\), which is a separate goodness-of-fit statistic."
    },
    {
      q: "Which statement correctly compares level-on-level and change-on-change yield regressions?",
      options: [
        "Change-on-change has uncorrelated errors, but level-on-level's errors are serially correlated",
        "Both produce unbiased, consistent coefficients, but in BOTH cases the error terms are serially correlated, so neither is fully efficient",
        "Level-on-level is unbiased but inconsistent, while change-on-change is both unbiased and consistent",
        "Both are fully efficient once you confirm the coefficients are unbiased"
      ],
      answer: 1,
      why: "The reading is explicit that BOTH specifications give unbiased, consistent coefficients but BOTH have serially correlated error terms, so neither is efficient. A third specification exists precisely to model that serial correlation. The choices singling out just one specification as having correlated errors, or just one as inconsistent, wrongly treat one approach as flawed and the other as fine. The 'both fully efficient once unbiased' choice confuses unbiasedness with efficiency, a classic OLS distinction trap."
    },
    {
      q: "What is the defining property that lets PCA hedge a 30-maturity yield curve using only the first three principal components?",
      options: [
        "The first three components are chosen to be perfectly correlated with each other, capturing redundant risk",
        "PCA discards the variance in the remaining 27 components entirely, so it doesn't matter",
        "Each component is chosen to capture the maximum remaining variance given the earlier ones, so the first three (level, slope, curvature) capture the overwhelming majority of total curve variance",
        "The 30 individual maturities are already uncorrelated, so PCA simply relabels them"
      ],
      answer: 2,
      why: "PCA orders components by variance explained, each capturing the most variance left over after the prior ones, which is why the first three (level, slope, curvature) dominate. The 'perfectly correlated with each other' choice is backwards (PCA components are uncorrelated by construction, not correlated). The 'discards the remaining variance' choice is wrong because PCA doesn't discard variance, it just concentrates most of it in the first few components. The 'maturities are already uncorrelated' choice is wrong because raw maturities on the curve are HIGHLY correlated, which is exactly the problem PCA solves."
    },
    {
      q: "A risk manager insists the hedge adjustment factor \\(\\beta\\), once estimated from a five-year regression, can be treated as a fixed constant going forward. What is the correct critique per the reading?",
      options: [
        "\\(\\beta\\) is explicitly a known-unrealistic simplification; best practice re-estimates it over multiple time windows and compares results rather than trusting one fixed value",
        "\\(\\beta\\) should never be estimated from historical data at all, only from theoretical bond math",
        "The critique is unwarranted — the reading confirms \\(\\beta\\) is provably constant over any horizon",
        "\\(\\beta\\) only needs re-estimation if the two-variable hedge (not the single-variable hedge) is being used"
      ],
      answer: 0,
      why: "The reading flags the constant-\\(\\beta\\) assumption as a known limitation and recommends re-estimating over multiple windows for comparison. The 'β is provably constant' choice directly contradicts the text. The 'never estimated from historical data' choice misdescribes where \\(\\beta\\) comes from: it IS estimated from historical data, that's the whole method. The 'only needs re-estimation for two-variable hedges' choice wrongly restricts the limitation to only the two-variable case, but it applies to any regression hedge."
    }
  ],

  sources: [
    { title: "Treasury Inflation-Protected Securities (TIPS) — TreasuryDirect", url: "https://www.treasurydirect.gov/marketable-securities/tips/", note: "Official U.S. Treasury description of how TIPS' inflation-adjusted principal and real yield work, underlying the nominal-vs-real yield distinction central to this reading's main worked example." },
    { title: "Principal component analysis — Wikipedia", url: "https://en.wikipedia.org/wiki/Principal_component_analysis", note: "General mathematical background on how PCA decomposes correlated variables into uncorrelated, variance-ranked components, applicable beyond the yield-curve case in this reading." },
    { title: "Interest rate swap — Wikipedia", url: "https://en.wikipedia.org/wiki/Interest_rate_swap", note: "Background on how fixed-for-floating swaps at different maturities (e.g., the 10-, 20-, and 30-year euro swaps in the two-variable hedge example) are structured and quoted." },
    { title: "Autocorrelation — Wikipedia", url: "https://en.wikipedia.org/wiki/Autocorrelation", note: "Background on serial correlation in error terms, the statistical property that makes both level and change regressions inefficient in this reading." }
  ],

  pdf: { book: 1, query: "A standard DV01-neutral hedge assumes that the yield" },

  summary: `<p><strong>DV01-neutral hedging fails</strong> when yields don't move 1:1 (e.g., nominal T-bond vs TIPS). <strong>Regression hedge</strong>: \\(\\beta\\) from \\(\\Delta y_{hedged}\\) on \\(\\Delta y_{hedge}\\) scales the naive DV01 ratio (e.g., $100M T-bond short hedged with ~$82.55M TIPS at \\(\\beta\\)=1.0198), and gives \\(R^{2}/SE\\) as a hedge-quality readout. \\(\\beta\\) assumed constant is a known limitation, so re-estimate across windows. <strong>Two-variable hedges</strong> (e.g., 10Y+30Y euro swaps, weighted ~22%/78%, for a 20Y swap) improve \\(R^{2}\\) but aren't crisis-proof. <strong>Level-on-level vs change-on-change</strong>: both unbiased/consistent, both inefficient (serially correlated errors). <strong>PCA</strong>: decomposes the whole curve into uncorrelated factors, no variance lost; first three (level, slope, curvature) explain most curve variation, letting you hedge 30 maturities with 3 numbers.</p>`
});
