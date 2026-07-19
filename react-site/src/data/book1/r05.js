export default ({
  book: 1, reading: 5,
  session: "Risk Measurement",
  title: "VaR Mapping",
  tagline: "Real portfolios have thousands of positions. Mapping replaces each one with its exposure to a small set of common risk factors, so the machinery from Readings 1-4 can run on a manageable number of variables.",

  teaches: `<p>Mapping is the bridge between the single-P&L-series machinery of Readings 1-4 and real, thousand-position portfolios. You'll see why mapping is necessary, the general-vs-specific risk trade-off, three fixed-income mapping methods of increasing precision (with a fully worked two-bond example), stress testing via undiversified VaR, tracking error VaR against a benchmark (with a worked barbell-vs-bullet example), and how mapping extends to derivatives: forwards, FRAs, swaps, and options, using real worked numbers from an FX forward, a 6×12 FRA, and a short-horizon option.</p>`,

  why: `<p>You cannot backtest, stress-test, or even estimate a covariance matrix for 5,000 individual stocks. That would require roughly [5,000 × (5,000 − 1)] / 2 ≈ 12.5 million pairwise covariance terms, which is computationally infeasible and statistically unreliable besides (you'd need far more historical data than exists to estimate that many parameters accurately). Mapping exists so the VaR/ES/backtesting machinery built in Readings 1-4 can be applied to a manageable handful of risk factors, an equity index, a set of yield curve points, an FX rate, instead of every individual position. It solves two other real problems too. An asset with no history of its own (a fresh IPO) can borrow the history of a risk factor that has traded for years, and positions whose exposures drift over time (a bond rolling down the yield curve as it ages) can be re-mapped instead of re-modeled from scratch.</p>`,

  intuition: `<p>Mapping is a translation exercise. Instead of describing a bond by its unique cash flows, you describe it by its exposure to a handful of shared risk factors: points on the yield curve, an equity index, a currency. The process has two steps. Step 1: measure every current position's market value (its "MV"). Step 2: allocate each position's market value across a small, common set of risk factors using "factor exposures." A stock's market value, for instance, splits into a market-index exposure (via its beta) and a leftover firm-specific piece. Once every position speaks the same risk-factor language, you can add, net, and correlate them using ordinary covariance-matrix algebra, the same way Readings 1-4 already handle a single P&L series.</p>
  <p>The central trade-off is <strong>precision vs manageability</strong>: more risk factors shrink the unexplained ("specific") risk but cost more computation. Specific risk is not a fixed property of an asset. It shrinks every time you add a finer risk factor (duration-only, then +credit factor, then +currency factor). Fixed-income mapping shows this literally. Principal mapping is crudest, one number, ignores every coupon. Duration mapping is better but still collapses the bond to one zero-coupon-equivalent number. Full cash-flow mapping is most precise: it treats every individual coupon and principal payment as its own exposure and captures genuine diversification across maturities via their actual correlations.</p>`,

  visual: `<div class="widget" data-widget="bars" data-title="Fixed-income mapping precision ranking (same $200M bond portfolio)" data-caption="More precision (right to left) almost always means a LOWER, more realistic VaR — because it captures diversification cruder methods miss." data-bars='{"items":[{"l":"Principal mapping","v":2.968,"d":"$2.968M","c":"#ef7b7b"},{"l":"Duration mapping","v":2.737,"d":"$2.737M","c":"#e8b45a"},{"l":"Cash flow (undiversified)","v":2.674,"d":"$2.674M","c":"#5fd4d0"},{"l":"Cash flow (diversified)","v":2.615,"d":"$2.615M","c":"#4ecf8e"}]}'></div>`,

  formulas: [
    {
      name: "Undiversified VaR (ρ = 1)",
      math: "\\text{VaR}_{\\text{undiv}} = \\sum_i |x_i|\\,V_i",
      plain: "Add up the absolute-value VaR of every individually mapped exposure. This is what you get if you (wrongly) assume every risk factor moves in lockstep, correlation of 1, so it's always the largest, most conservative VaR estimate.",
      note: "Sum of each mapped exposure's own VaR, assuming perfect correlation. Always at least as large as the diversified figure.",
      derivation: `<p>Here \\(x_i\\) is the present value (dollar amount) mapped to risk factor \\(i\\), and \\(V_i\\) is that risk factor's own VaR percentage (e.g., the VaR% of a zero-coupon bond of matching maturity). If every risk factor were perfectly correlated (\\(\\rho = 1\\) for every pair), the portfolio's worst-case move would simply be the sum of every individual worst-case move — there is no offsetting or netting benefit, because "perfectly correlated" means every factor loses value on the same bad day. That is exactly why undiversified VaR is also a convenient stress-testing shortcut: you can compute it by revaluing each zero-coupon bond at its own VaR-adjusted price and summing the resulting portfolio value change, with no matrix algebra required — you get the identical number as \\(\\sum_i |x_i| V_i\\).</p>`
    },
    {
      name: "Diversified VaR",
      math: "\\text{VaR}_{\\text{div}} = \\sqrt{x'\\,R\\,x}\\quad(\\text{using correlation matrix } R)",
      plain: "Instead of assuming perfect correlation, plug the real correlation matrix between risk factors into matrix algebra. Real risk factors aren't perfectly correlated, so this number is almost always lower than undiversified VaR, and it's the more realistic risk estimate.",
      note: "Full matrix algebra across mapped factor exposures. Captures the genuine diversification benefit.",
      derivation: `<p>Let \\(x\\) be the vector of dollar exposures mapped to each risk factor (e.g., the present value of cash flows landing at each maturity), and let \\(R\\) be the correlation matrix between those risk factors' returns. The quadratic form \\(x'Rx\\) is the standard portfolio-variance calculation you'd use for any set of correlated assets — off-diagonal terms in \\(R\\) are less than 1 whenever risk factors don't move in perfect lockstep, so they subtract from what the undiversified sum would give you. In the two-bond worked example below, this drops VaR from \\(\\$2.674\\,\\text{million}\\) (cash-flow undiversified, \\(\\rho=1\\) assumed) to \\(\\$2.615\\,\\text{million}\\) (cash-flow diversified, true correlations) — the gap is pure diversification benefit that the cruder methods cannot see.</p>`
    }
  ],

  concepts: [
    {
      name: "Why mapping is necessary",
      def: "Mapping is needed when: (1) too many positions to model individually, (2) a common risk-factor language is needed across different instrument types, (3) an asset lacks sufficient history (e.g., a recent IPO) and must borrow history from factors that have it, (4) exposures change over time (e.g., bonds rolling down the curve).",
      intuition: "Mapping runs in two mechanical steps. First you measure the current market value (MV) of every position in the portfolio. Second, you split each position's MV across a small shared set of risk factors using factor exposures (a stock's return, for example, decomposes via its beta into a market-index piece plus a leftover firm-specific piece). Once every position has been rewritten this way, the portfolio's total exposure to each risk factor is just the column sum across all positions: a handful of numbers instead of thousands.",
      example: "A 5,000-stock portfolio needs [5,000 × (5,000 − 1)] / 2 ≈ 12.5 million pairwise covariances stock-by-stock. Mapping each stock to a market index via \\(\\beta\\) collapses this to essentially one factor, because diversification is assumed to wash out each stock's firm-specific component, leaving only the shared market-risk (beta) component to model.",
      related: [{ r: 10, label: "R10 — PCA compresses the yield curve the same way" }]
    },
    {
      name: "General vs specific risk",
      def: "More risk factors → smaller specific (residual/idiosyncratic) risk but more computation. General risk is what the common factors explain; specific risk is what's left over.",
      intuition: "Think of a bond portfolio's total risk as a pie. If your only risk factor is duration, a large slice of the pie is unexplained ('specific'). Add a credit-spread factor and a slice of that 'specific' pie gets relabeled as 'general' (explained). Add a currency factor and another slice moves over. The total pie, total risk, never changes. Only how much of it you've chosen to explain with named, modeled factors versus leave as an unexplained residual changes.",
      pitfall: "Specific risk is not a fixed, intrinsic property of an asset. It's a function of how finely you define general risk. Adding a credit factor, then a currency factor, to a bond model keeps shrinking 'specific risk' further. Treating it as unchangeable is the tested trap.",
      related: ["Fixed-income mapping methods"]
    },
    {
      name: "Fixed-income mapping: three methods",
      def: "Principal mapping: only principal repayment at the weighted-average life (simplest, least precise). Duration mapping: whole portfolio to a zero-coupon bond of matching duration (better, still one number). Cash-flow mapping: every cash flow mapped to its own maturity zero, including inter-maturity correlations (most precise, most complex).",
      intuition: "Principal mapping asks only 'when does the principal come back?' and ignores every coupon along the way. Crude, but a one-line calculation. Duration mapping is more honest about timing: it replaces the whole bond with a single hypothetical zero-coupon bond whose maturity equals the portfolio's Macaulay duration (a coupon-weighted average time to receive cash flows), so it implicitly credits the earlier coupon payments for reducing effective maturity. Cash-flow mapping is the most honest of all. It treats every single payment date as its own mini zero-coupon bond, computes each one's present value and its own VaR%, and, critically, accounts for the fact that a 1-year zero and a 5-year zero don't move in perfect lockstep. That captures real diversification the other two methods structurally cannot see.",
      example: "Two par bonds: $100M 1-year (3.5% coupon) + $100M 5-year (5% coupon), VaR% (95% CL) known for 1- through 5-year zeros. Principal mapping: weighted-average life = 0.50(1) + 0.50(5) = 3 years, so VaR = $200M × 1.4841% = $2.968M. Duration mapping: Macaulay duration = $553.69M / $200M = 2.768 years; interpolating the 2-year (0.9868%) and 3-year (1.4841%) VaR% gives 1.3687%, so VaR = $200M × 1.3687% = $2.737M. Cash-flow mapping (undiversified, ρ=1 assumed): sum each cash flow's present value times its own maturity-matched zero's VaR% = $2.674M. Cash-flow mapping (diversified, true inter-maturity correlation matrix applied via \\(x'Rx\\)): $2.615M. Ranking: principal ($2.968M) ≥ duration ($2.737M) ≥ cash-flow undiversified ($2.674M) ≥ cash-flow diversified ($2.615M).",
      pitfall: "More precision means lower VaR almost always, because it captures diversification cruder methods miss, not because the underlying risk changed.",
      related: ["Undiversified vs diversified VaR"],
      memory: "Principal to duration to cash flow: coarse to fine, expensive to cheap-sounding-VaR."
    },
    {
      name: "Stress testing & tracking error VaR",
      def: "Stressing each mapped zero by its own VaR (assuming \\(\\rho =1)\\) reproduces undiversified VaR without matrix algebra, but breaks down the moment correlations aren't perfect. Tracking error VaR measures a portfolio's VaR relative to a BENCHMARK.",
      intuition: "Stress testing here means, instead of doing the sum-of-VaRs formula, actually marking down each zero-coupon bond's price by its own VaR% (a 1-year zero discounted at 3.5%, say, has a present-value factor of 1/1.035 = 0.9662; its 95% VaR% of 0.4696% drags it down to 0.9662 × (1 − 0.4696/100) = 0.9616), revaluing the whole portfolio at the stressed prices, and taking the difference from the unstressed value. That dollar difference is numerically identical to the undiversified-VaR formula. It's the same calculation performed by full revaluation instead of by summing VaR% terms. For tracking error VaR, imagine you're benchmarking a $100M bond portfolio with duration 4.77 against a two-zero-coupon-bond proxy also duration-matched to 4.77 (a mix of a 4-year and 5-year zero, say). Even though both portfolios share the same duration, they can have very different curve exposure, because duration only pins down one number (the weighted-average maturity), not the full shape of cash flows across the curve.",
      example: "In the benchmarking example, a $100M benchmark with duration 4.77 is compared to five alternative 2-zero-coupon-bond portfolios (A through E) all duration-matched to 4.77. The benchmark's absolute VaR is $1.99M. Portfolio C (built mostly from a 2-year zero, matching where the benchmark actually concentrates its cash flows) has the smallest tracking error at $0.17M and a variance improvement of 1 − (0.17/1.99)² = 99.3%. Portfolio E is a barbell, heavily weighted to the very short and very long ends of the curve with little in the middle, and it happens to have the lowest absolute VaR of the five but the highest tracking error versus the benchmark, because its cash-flow shape diverges the most from the bulleted benchmark even though its own risk is small.",
      pitfall: "Minimizing tracking error is not the same objective as minimizing absolute VaR. A portfolio can have the lowest absolute VaR and simultaneously the highest tracking error (classic example: a barbell portfolio vs a bulleted benchmark).",
      related: [{ r: 86, label: "R86 — risk budgeting reuses tracking-error logic" }]
    },
    {
      name: "Mapping derivatives",
      def: "Forwards, FRAs, and swaps decompose into linear combinations of basic building blocks (e.g., currency forward = long foreign bill + short domestic bill + spot FX), and delta-normal applies cleanly. Options are nonlinear.",
      intuition: "A currency forward to buy euros with dollars in one year is economically equivalent to three simultaneous positions: a short position in a U.S. Treasury bill (you're implicitly borrowing dollars), a long position in a one-year euro bill (you're implicitly investing in euros), and a long spot-FX position (the EUR/USD exchange rate itself). Once you've decomposed the derivative into these building blocks, each one maps onto a standard risk factor with known volatility and correlation data, and you compute undiversified VaR (sum of each block's own VaR) and diversified VaR (matrix algebra with the correlation matrix) exactly as with any other mapped portfolio. An interest rate swap follows the same logic: it's a short position in a fixed-rate coupon bond (the leg you pay) plus a long position in a floating-rate note (the leg you receive, which resets to par at each reset date and so behaves like it matures at the next reset). FRAs decompose similarly. A 6×12 FRA (locking in a rate for months 6 through 12) is equivalent to borrowing for 6 months and investing for 12 months. Options break this pattern. Their payoff is nonlinear in the underlying, so a first-order (delta-only) mapping is only a local approximation, valid when the horizon is short enough that delta itself doesn't move much.",
      example: "FX forward to buy $100M of EUR for $126.5M in one year: mapped as a long EUR-bill position worth $122.911M today and a short USD T-bill position worth $122.911M today. Undiversified VaR = $6.01M, diversified VaR (using the correlation matrix between the EUR bill, USD bill, and spot FX rate) = $5.588M. 6×12 FRA on $100M (borrow 6-month at 4.1%, invest 12-month at 4.5%, implied forward rate ≈4.8%): present value of the notional = $100M / 1.0205 = $97.991M; undiversified VaR = $0.62M, diversified VaR = $0.348M. Option example: strike $100, volatility 25%, one-day horizon at the 95% confidence level gives a worst-case one-day loss of about $2.59, taking the position down to $97.41. This linear (delta) approximation is only reliable because the horizon (one day) is short enough that delta doesn't have time to shift materially.",
      pitfall: "Delta-normal VaR for options is a first-order (linear) local approximation, valid only over short horizons where delta is roughly stable. Long horizons or large price moves make it understate true option risk, which is exactly why FRTB and other frameworks lean on full revaluation or delta-gamma for options books.",
      related: [{ r: 16, label: "R16 — FRTB's response to exactly this limitation" }],
      memory: "Delta-normal is a snapshot; options need a movie."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "Mapping applies R1's VaR/ES machinery to real portfolios instead of a single P&L series." }
    ],
    to: [
      { r: 10, why: "PCA is mapping's spiritual successor for the yield curve, compressing many maturities into a few factors." },
      { r: 16, why: "FRTB's liquidity-horizon waterfall and delta-vs-full-revaluation choices both build on mapping concepts." },
      { r: 85, why: "Component/marginal VaR in Book 5 decomposes portfolio risk using the same mapped-factor structure." }
    ],
    confused: [
      { what: "Undiversified vs diversified VaR", how: "Undiversified sums individual VaRs assuming \\(\\rho =1\\), a stress-test shortcut. Diversified uses the true correlation matrix and is always at most as large as undiversified." },
      { what: "Specific risk vs idiosyncratic risk vs general risk", how: "Same thing: the part not explained by your chosen risk factors. It shrinks as your factor set grows finer and is not a fixed asset property." },
      { what: "Delta-normal VaR vs full revaluation", how: "Delta-normal is a fast linear approximation, accurate only for small moves or short horizons. Full revaluation actually reprices the option under each scenario and captures convexity." }
    ]
  },

  misconceptions: [
    { wrong: "\"Specific risk is an intrinsic property of an asset.\"", right: "It's a function of how finely general risk factors are defined. Add factors and specific risk shrinks. It's a modeling choice, not a fixed quantity." },
    { wrong: "\"Minimizing tracking error also minimizes absolute VaR.\"", right: "They can point in opposite directions. A barbell portfolio can have the lowest absolute VaR and the highest tracking error versus a bulleted benchmark." },
    { wrong: "\"Delta-normal VaR is fine for options at any horizon.\"", right: "It's a first-order local approximation. Long horizons or large moves make delta itself shift meaningfully, understating true risk, which is why full revaluation and delta-gamma exist." },
    { wrong: "\"More precise mapping methods always show MORE risk.\"", right: "The opposite is typical: more precision captures genuine diversification, usually lowering the VaR estimate relative to cruder methods." },
    { wrong: "\"'Present value mapping' is one of the three fixed-income mapping methods.\"", right: "It is not. The three official methods are principal mapping, duration mapping, and cash-flow mapping. 'Present value mapping' is a classic distractor name on the exam." }
  ],

  highYield: [
    { stars: 4, what: "The four reasons mapping is necessary (too many positions, common language, insufficient history, changing exposures).", why: "Straightforward conceptual recall, frequently tested as 'which of the following is NOT a reason.'" },
    { stars: 4, what: "Three fixed-income mapping methods, their precision ranking, and why they disagree.", why: "A calculation-adjacent conceptual question. Know the ranking logic even without redoing the worked numbers." },
    { stars: 4, what: "Specific risk is not fixed, it depends on factor granularity.", why: "A compact, frequently tested conceptual trap." },
    { stars: 3, what: "Tracking error VaR vs absolute VaR can diverge (barbell vs bullet example).", why: "The counter-intuitive divergence is exactly the point GARP likes to test." },
    { stars: 3, what: "Delta-normal VaR's first-order limitation for options.", why: "Sets up FRTB's rationale later. Recognize the mechanism, not just the label." },
    { stars: 3, what: "The principal-mapping calculation: weighted-average life × VaR% of the matching zero.", why: "A directly testable numeric question, as in the module quiz (a 2-year + 4-year bond example)." }
  ],

  recall: [
    { q: "Why can't you just run historical simulation on 5,000 individual stock positions directly?", a: "You'd need the full covariance structure across 5,000 assets (roughly 12.5 million pairwise covariances), which is computationally and statistically infeasible. Mapping each stock to a factor (market \\(\\beta )\\), for instance) collapses this to a tractable few factors." },
    { q: "A bond portfolio's duration-only model shows high 'specific risk.' You add a credit-spread factor. What happens to specific risk, and why doesn't this mean the bond became less risky?", a: "Specific risk shrinks, since some of what was unexplained is now captured by the new factor. Total risk is unchanged; you've just relabeled part of 'specific' as 'general.' Specific risk is a modeling artifact, not an asset property." },
    { q: "Why does cash-flow mapping (diversified) produce a lower VaR than principal mapping for the same bond portfolio?", a: "Principal mapping crudely lumps everything at one weighted-average maturity, implicitly assuming perfect co-movement. Diversified cash-flow mapping captures the true (imperfect) correlation between different points on the curve, revealing real diversification benefit that cruder methods hide." },
    { q: "Explain how a portfolio can have the lowest absolute VaR yet the highest tracking error against its benchmark.", a: "Absolute VaR depends on the portfolio's own risk; tracking error depends on how differently it moves from the benchmark. A very low-risk portfolio built very differently from a higher-risk benchmark (a barbell vs bullet duration profile, say) can minimize its own VaR while maximizing its divergence from the benchmark." },
    { q: "Why does delta-normal VaR understate risk for options over a long horizon?", a: "Delta-normal is a linear (first-order) approximation valid only while delta itself stays roughly constant. Over a long horizon or big price move, delta shifts meaningfully (a gamma effect), so the linear approximation misses the actual nonlinear payoff risk." },
    { q: "A $100M 2-year bond and a $100M 4-year bond are combined into a portfolio. Using principal mapping, what maturity zero-coupon bond's VaR% do you use, and why?", a: "The weighted-average life: 0.50(2) + 0.50(4) = 3 years, so you use the 3-year zero's VaR% multiplied by the $200M total market value. Principal mapping ignores all coupons and timing detail beyond this single blended maturity." },
    { q: "Why is a currency forward mapped as three separate positions (short domestic bill, long foreign bill, long spot FX) rather than modeled directly as one instrument?", a: "This decomposition rewrites the forward as a linear combination of building blocks that already have known volatilities and correlations (T-bill rates, foreign bill rates, spot FX), letting the delta-normal method apply cleanly and letting the position share risk-factor data with every other mapped instrument in the portfolio." }
  ],

  hooks: [
    { title: "Translation service", text: "Mapping is a translator. Every position, no matter how exotic, gets restated in the same handful of risk-factor languages (rates, equities, FX) so they can finally be compared and combined." },
    { title: "The shrinking leftover", text: "Specific risk is the pizza slices left after everyone (each risk factor) has taken a bite. Add another eater and the leftover shrinks. It was never a fixed size to begin with." },
    { title: "Snapshot vs movie", text: "Delta-normal VaR is a single photograph of an option's sensitivity. A big move or long horizon needs the whole movie, full revaluation, to see how that sensitivity itself changes." }
  ],

  eli5: `<p>Imagine you run a huge lending library with 5,000 different books, and you want to know how likely it is that a random shelf collapses under too much weight. Weighing and tracking every single book individually, and every pairwise combination of books that might get piled together, is an impossible amount of bookkeeping. So instead, you sort books into a handful of categories by average weight: "hardcover," "paperback," "textbook." Now you only need to track a few category weights and how often categories get shelved together, and you can still get a very good estimate of collapse risk without ever weighing an individual book again. In finance, the "books" are individual positions (stocks, bonds, swaps), the "categories" are risk factors (an equity index, a yield-curve point, an FX rate), and mapping is the act of sorting every position into those categories so the risk machinery only has to work with a manageable handful of numbers.</p>`,

  thinkLike: `<p>A risk manager staring at a portfolio with thousands of lines never asks "what is the VaR of position #4,832?" They ask "what does this position have in common, risk-wise, with everything else I hold?" That reframing is the whole point of mapping: it converts a bookkeeping problem (thousands of unique instruments) into a statistics problem (a handful of shared risk factors with known volatilities and correlations). The practitioner's judgment call is always about the precision/cost trade-off. A trading desk running intraday risk on a huge book will often accept duration mapping's crudeness for speed, while a risk committee sizing regulatory capital for a fixed-income book will insist on full cash-flow mapping, because the extra precision changes the capital number materially.</p>
  <p>On the exam, GARP tests this reading in three recurring shapes. First, "which of the following is NOT a reason for mapping" or "NOT one of the three fixed-income methods" style questions: memorize the exact lists so a plausible-sounding decoy (like "present value mapping") doesn't fool you. Second, a numeric principal-mapping or ranking question using a two-bond setup structurally identical to the $100M/$100M worked example: practice reproducing the weighted-average-life calculation cold. Third, a conceptual trap question pairing two things that sound like they should move together but don't, specific risk treated as fixed, or minimizing tracking error confused with minimizing absolute VaR (the barbell-vs-bullet case). Expect the exam to describe a scenario and ask you to identify which of these traps it illustrates, rather than asking you to name the trap directly.</p>`,

  breakdown: [
    {
      title: "The four reasons mapping is necessary",
      points: [
        "Too many positions to model individually. The pairwise covariance count explodes combinatorially (5,000 stocks ≈ 12.5 million covariance terms), making direct modeling computationally and statistically infeasible.",
        "A common risk-factor 'language' is needed across very different instrument types. A bond, a stock, and an FX forward can't be directly compared unless restated in terms of shared factors like rates, equity indices, and FX rates.",
        "Insufficient historical data for the asset itself, a recent IPO with no price history, say. Mapping borrows the history of a risk factor (like a sector index) that has traded long enough to estimate volatility and correlation.",
        "Exposures change over time. A bond rolling down the yield curve as it ages, or an option's delta shifting as the underlying moves, means the mapping must be periodically refreshed rather than fixed once and forgotten."
      ]
    },
    {
      title: "The three fixed-income mapping methods (coarse to fine)",
      points: [
        "Principal mapping considers only the principal repayment at the portfolio's weighted-average life, ignoring every coupon payment. Simplest and least precise.",
        "Duration mapping replaces the whole portfolio with a single zero-coupon bond whose maturity equals the portfolio's Macaulay duration. More precise than principal mapping but still collapses everything to one number.",
        "Cash-flow mapping maps every individual cash flow (coupon and principal) to its own maturity-matched zero-coupon bond and incorporates the true inter-maturity correlation matrix. Most precise and most computationally complex, and 'highly unlikely to show up on the exam' as a full calculation because of that complexity."
      ]
    },
    {
      title: "Mapping approaches for derivatives",
      points: [
        "Forwards decompose into a short domestic-currency bill, a long foreign-currency bill, and a spot FX position; delta-normal applies cleanly because the payoff is linear in the underlying risk factors.",
        "Forward rate agreements (FRAs) decompose into an implied borrowing leg and an implied investing leg over the two relevant periods (a 6×12 FRA implies borrowing for 6 months and investing for 12 months).",
        "Interest rate swaps decompose into a short fixed-rate coupon bond (the leg you pay) and a long floating-rate note (the leg you receive, effectively resetting to par at each reset date).",
        "Options are nonlinear in the underlying, so the delta-normal method is only a first-order local approximation. It's reasonably accurate over short horizons (one day, say) where delta itself doesn't move much, but understates risk over long horizons or large price moves, which is why full revaluation or delta-gamma methods are used instead."
      ]
    }
  ],

  quiz: [
    {
      q: "Which of the following is NOT one of the three official approaches for mapping a portfolio of fixed-income securities onto risk factors?",
      options: ["Principal mapping", "Duration mapping", "Present value mapping", "Cash flow mapping"],
      answer: 2,
      why: "The three official methods are principal, duration, and cash-flow mapping. 'Present value mapping' sounds plausible because present value is used inside cash-flow mapping's calculations, but it isn't a named method in its own right. A classic decoy that borrows real vocabulary from the correct answer."
    },
    {
      q: "A bond portfolio consists of a $100 million bond maturing in 2 years and a $100 million bond maturing in 4 years. The 95% VaR% for a 3-year zero-coupon bond is 1.4841%. Using principal mapping, what is the portfolio's VaR?",
      options: ["$1.484 million", "$1.974 million", "$2.769 million", "$2.968 million"],
      answer: 3,
      why: "Weighted-average life = 0.50(2) + 0.50(4) = 3 years, matching the given 3-year VaR%. VaR = $200 million × 1.4841% = $2.968 million. The $1.484 million figure mistakenly applies the VaR% to only $100 million instead of the full $200 million portfolio."
    },
    {
      q: "You build a portfolio using duration mapping instead of principal mapping for the same underlying bonds. What should you expect to happen to the estimated VaR, and why?",
      options: [
        "It typically falls, because duration mapping better reflects the earlier timing of coupon cash flows that principal mapping ignores",
        "It typically rises, because duration mapping adds more risk factors and therefore more measured risk",
        "It stays exactly the same, because both methods reduce the portfolio to a single number",
        "It becomes undefined, because duration mapping requires cash-flow mapping to be run first"
      ],
      answer: 0,
      why: "In the worked example, duration mapping ($2.737M) gives a lower VaR than principal mapping ($2.968M) because duration mapping credits early coupon payments for shortening the portfolio's effective maturity, capturing more real information than the crude weighted-average-life-of-principal approach. More precision usually lowers, not raises, the VaR estimate. The tempting-but-wrong intuition is that 'more sophisticated methods must show more risk.'"
    },
    {
      q: "A duration-only model of a corporate bond portfolio shows a large amount of 'specific risk.' A risk manager adds a credit-spread factor and then a currency factor. What is the best description of what happens?",
      options: [
        "The bonds have genuinely become safer with each added factor",
        "Specific risk shrinks with each added factor because more of total risk is now explained by named general factors, while total risk is unchanged",
        "Specific risk is unaffected, since it is a fixed, intrinsic property of each bond",
        "General risk shrinks while specific risk grows, since more factors dilute the explanatory power of any one factor"
      ],
      answer: 1,
      why: "Specific risk is only the unexplained residual after your chosen general risk factors. It's a modeling artifact, not a property of the bonds. As you add finer factors, more of total risk gets relabeled from 'specific' to 'general,' but total risk itself does not change. The idea that specific risk is fixed and intrinsic to each bond is the classic tested misconception."
    },
    {
      q: "A portfolio manager builds a barbell portfolio (heavily weighted at the very short and very long ends of the curve, little in the middle) that is duration-matched to a bulleted (mid-curve concentrated) benchmark. Which outcome is most consistent with the reading's worked example?",
      options: [
        "The barbell has both the lowest absolute VaR and the lowest tracking error",
        "The barbell has the highest absolute VaR and the highest tracking error",
        "The barbell has the lowest absolute VaR but the highest tracking error",
        "Duration-matching guarantees the barbell and benchmark have identical VaR and zero tracking error"
      ],
      answer: 2,
      why: "In the benchmarking example, the barbell portfolio (Portfolio E) had the lowest absolute VaR of the five alternatives yet the highest tracking error against the bulleted benchmark. Its low own-risk and its high divergence from the benchmark's cash-flow shape are separate, sometimes opposite-signed, quantities. Matching duration only pins down one summary statistic, not the full curve shape, which is why tracking error can still be large."
    },
    {
      q: "An option with strike $100 and 25% volatility is being risk-managed using the delta-normal method. Under which scenario is the delta-normal VaR estimate most likely to significantly understate the option's true risk?",
      options: [
        "A one-day risk horizon with small expected price moves",
        "A long risk horizon or a large expected price move, where delta itself shifts meaningfully",
        "Any horizon, since delta-normal is always exact for options by construction",
        "Only when the option is exactly at-the-money and volatility is zero"
      ],
      answer: 1,
      why: "Delta-normal VaR is a first-order (linear) local approximation that assumes delta stays roughly constant. Over long horizons or large price moves, delta shifts meaningfully (a gamma effect), so the linear approximation understates the true, nonlinear option risk. This is exactly why full revaluation or delta-gamma methods are used for longer-horizon or larger-move scenarios, and it foreshadows FRTB's approach in Reading 16. A one-day horizon with small expected price moves describes the case where delta-normal is actually reasonably accurate, the opposite of what the question asks about."
    }
  ],

  sources: [
    { title: "Value at risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Value_at_risk", note: "Background on VaR mechanics and its limitations, including subadditivity, that underpin why mapping and diversified/undiversified VaR matter." },
    { title: "Tracking error — Wikipedia", url: "https://en.wikipedia.org/wiki/Tracking_error", note: "General definition and calculation of tracking error, the concept extended here to 'tracking error VaR' relative to a benchmark portfolio." },
    { title: "Bond duration — Investopedia", url: "https://www.investopedia.com/terms/d/duration.asp", note: "Explains Macaulay duration, the concept duration mapping uses to collapse a bond portfolio to a single zero-coupon-equivalent maturity." },
    { title: "Fundamental Review of the Trading Book (FRTB) — BIS", url: "https://www.bis.org/bcbs/publ/d457.htm", note: "The regulatory framework (covered in Reading 16) that responds directly to delta-normal VaR's limitations for options, referenced in this reading's derivatives section." }
  ],

  pdf: { book: 1, query: "Value at risk (VaR) mapping involves replacing the current" },

  summary: `<p>Mapping replaces many positions with exposures to a handful of shared risk factors so R1-4's machinery becomes tractable. <strong>General vs specific risk</strong>: specific risk shrinks as factors get finer; it is not fixed. <strong>Fixed-income mapping</strong>, coarse to fine: principal (weighted-avg life), then duration (single zero match), then cash-flow (every payment mapped, correlations included). Precision typically lowers VaR by revealing diversification. <strong>Undiversified VaR</strong> \\((\\Sigma |x_{i}|V_{i}\\), \\(\\rho =1)\\) is a stress-test upper bound; <strong>diversified VaR</strong> uses the true correlation matrix. <strong>Tracking error VaR</strong> (vs benchmark) can move opposite to absolute VaR; barbell vs bullet is the classic case. <strong>Derivatives</strong>: linear instruments (forwards/FRAs/swaps) map cleanly into building blocks like bills and bonds, while options need delta-normal (fast, first-order, breaks down over long horizons) or full revaluation/delta-gamma.</p>`
});
