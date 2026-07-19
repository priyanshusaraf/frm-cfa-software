export default ({
  book: 2, reading: 25,
  session: "Credit Risk Estimation",
  title: "Estimating Default Probabilities",
  tagline: "Arguably the single most important reading in Book 2 — the toolbox every later quant reading draws from.",

  teaches: `<p>Altman's Z-score, rating migration matrices (cumulative/marginal PD), hazard rates, CDS mechanics and spreads, the CDS-bond basis, real-world vs. risk-neutral PDs, and the precise numerical Merton model. Budget real time here.</p>
  <p>Concretely: a firm's probability of default (PD) — the chance it fails to pay what it owes over a given horizon — can be estimated four different ways, and this reading walks through all four in sequence: (1) run its financial statements through a scoring formula (Altman's Z-score), (2) read historical default frequency off a table of past rating outcomes (a migration matrix), (3) back a default rate out of the price of credit protection in the market (a hazard rate from a CDS or bond spread), or (4) treat the firm's equity as an option on its assets and solve for the implied default probability (the Merton model). Each method uses a different slice of information — accounting data, historical statistics, or market prices — and each is the "right" tool for a different job later in the curriculum.</p>`,

  why: `<p>Every downstream quant reading — Credit VaR (R26), portfolio credit risk (R27), structured credit (R28), CVA (R29, R37), credit derivatives (R30) — needs a default probability as an input. This reading is where you learn every method of actually producing one, and crucially, when to use which.</p>`,

  intuition: `<p>There are fundamentally three ways to estimate PD: from a firm's financial STATEMENTS (Altman's Z-score — a discriminant function on balance-sheet ratios), from historical RATING BEHAVIOR (migration matrices — cumulative/marginal PD read off transition tables), or from MARKET PRICES (hazard rates backed out of credit spreads, or the Merton model backed out of equity value and volatility). Each answers a slightly different question and lives in a different part of the curriculum.</p>
  <p>The single most important conceptual fact: RISK-NEUTRAL PD (backed out of market spreads) is systematically HIGHER than REAL-WORLD PD (based on historical default rates) for the same firm — because market prices embed a risk premium for bearing systematic, illiquidity, and unsystematic risk that isn't captured by pure historical frequency. Use risk-neutral PDs for valuation/pricing; use real-world PDs for scenario analysis.</p>
  <p>Why does the premium exist at all? Bond defaults aren't independent draws — they cluster with the business cycle, so holding corporate bonds exposes an investor to <em>systematic</em> risk that can't be diversified away, plus a residual of unsystematic risk that's harder to diversify in a bond book than in an equity book, plus an illiquidity premium (corporate bonds trade less easily than Treasuries). The market compensates investors for all three, so the spread-implied ("risk-neutral") hazard rate runs well above the pure historical ("real-world") default frequency — and the gap widens as credit quality worsens and during periods of market stress.</p>`,

  visual: `<div class="widget" data-widget="merton"></div>`,

  formulas: [
    { name: "Altman's Z-score (public manufacturers)", math: "Z = 1.2X_{1} + 1.4X_{2} + 3.3X_{3} + 0.6X_{4} + 0.999X_{5}", note: "X1=WC/TA, X2=RE/TA, X3=EBIT/TA, X4=MV equity/BV liabilities, X5=Sales/TA. Z>3: safe · 2.7-3: potential default · 1.8-2.7: reasonable PD · <1.8: high likelihood.",
      plain: "This is a weighted blend of five balance-sheet ratios — liquidity, cumulative profitability, operating profitability, leverage (market-based), and asset turnover — that collapses a firm's whole financial statement into one number the analyst can compare against fixed cutoffs to judge default risk.",
      derivation: `<p>The weights (1.2, 1.4, 3.3, 0.6, 0.999) are not derived from theory — they come from linear discriminant analysis (LDA), a statistical technique that finds the linear combination of input ratios that best <em>separates</em> a historical sample of firms that later defaulted from firms that didn't. Altman estimated these weights empirically on a sample of manufacturers and then tested them out-of-sample, finding few Type I errors (calling a defaulter safe) and few Type II errors (calling a safe firm risky) — which is why the cutoffs (Z&gt;3 safe, Z&lt;1.8 high risk) are treated as reliable rules of thumb rather than arbitrary lines.</p>` },
    { name: "Constant hazard rate", math: "Q(t) = 1 - e^{-\\lambda t}", note: "PD by time t under a constant default intensity \\(\\lambda\\).",
      plain: "This says the chance a firm has defaulted by some future time t, assuming defaults arrive at a constant intensity \\(\\lambda\\) per year, rises smoothly toward 100% the longer you wait — it is exactly the CDF of an exponential waiting-time distribution.",
      derivation: `<p>Define \\(S(t)\\) as the survival probability — the chance the firm has <em>not</em> defaulted by time \\(t\\). If defaults arrive with constant hazard (intensity) \\(\\lambda\\), the chance of surviving an instant \\(dt\\) longer, given survival so far, is \\((1-\\lambda\\,dt)\\). Chaining this over \\([0,t]\\) gives the standard exponential survival function:
      \\[ S(t) = e^{-\\lambda t} \\]
      The cumulative default probability is simply the complement of survival, \\(Q(t) = 1 - S(t) = 1 - e^{-\\lambda t}\\). Plugging in \\(\\lambda=2\\%\\), for example, gives \\(Q(1)=1-e^{-0.02}=1.98\\%\\) and \\(Q(5)=1-e^{-0.10}=9.52\\%\\) — matching the source's worked figures.</p>` },
    { name: "Hazard rate from credit spread (bond near par)", math: "\\lambda \\approx \\dfrac{s(T)}{1 - \\text{RR}}", note: "s(T) = credit spread (annual expected loss). The ancestor formula of R30's CDS pricing and R37's CVA.",
      plain: "A credit spread is compensation the market demands for expected annual credit loss; dividing that spread by the loss actually suffered per default (one minus the recovery rate) backs out the annualized probability of the default event itself.",
      derivation: `<p>Annual expected credit loss ≈ (probability of default per year) × (loss given default), i.e. \\(s(T) \\approx \\lambda \\times (1-\\text{RR})\\) for a bond priced near par (so the spread purely reflects expected loss, with no material price-versus-yield distortion). Rearranging for \\(\\lambda\\) gives the formula. Worked example from the source: a 5-year credit spread of 210bps with an assumed 30% recovery rate implies \\(\\lambda = 0.021/(1-0.30) = 3.0\\%\\) per year, conditional on no earlier default.</p>` },
    { name: "CDS-bond basis", math: "\\text{CDS-bond basis} = \\text{CDS spread} - \\text{bond yield spread}", note: "Should ≈ 0 in theory; nonzero in practice due to specific named frictions.",
      plain: "This is simply the gap between what the CDS market charges for protection and what the bond market charges in extra yield for the same credit risk — arbitrage logic says the two prices for the same risk should coincide, so a nonzero basis signals a friction (or a mispricing) somewhere." },
    { name: "Merton setup (precise numeric)", math: "E_0 = \\text{Black-Scholes call on }V_0;\\quad \\sigma_E\\,E_0 = N(d_1)\\,\\sigma_V\\,V_0", note: "Solve simultaneously for V0 (asset value) and \\(\\sigma V\\) (asset volatility) given observable E0 and \\(\\sigma E\\).",
      plain: "Equity behaves like a call option on the firm's own assets, struck at the face value of its debt — this pair of equations lets you back out the two things you can't observe directly (total asset value and asset volatility) from the two things you can observe (equity value and equity volatility).",
      derivation: `<p>Because equity holders only get paid after debt is repaid, equity payoff at maturity is \\(E_T = \\max(V_T - D, 0)\\) — exactly the payoff of a call option on the firm's assets \\(V\\) with strike \\(D\\) (the debt due) and maturity \\(T\\). Black-Scholes-Merton therefore prices today's equity as a call:
      \\[ E_0 = V_0\\,N(d_1) - D\\,e^{-rT}\\,N(d_2) \\]
      That is one equation in two unknowns (\\(V_0,\\sigma_V\\)), since \\(d_1,d_2\\) both depend on \\(\\sigma_V\\). A second equation comes from Itô's lemma: equity's instantaneous volatility equals its option delta times asset volatility, scaled by relative size, i.e. \\(\\sigma_E\\,E_0 = N(d_1)\\,\\sigma_V\\,V_0\\). Two equations, two unknowns — solved numerically (e.g. by Solver/iteration) to get \\(V_0\\) and \\(\\sigma_V\\), after which \\(d_2\\), \\(N(-d_2)\\) (the risk-neutral default probability) and the distance to default (\\(d_2\\) itself) all follow directly. Worked example: \\(E_0=\\$3\\text{M}\\), \\(\\sigma_E=80\\%\\), \\(D=\\$10\\text{M}\\), \\(T=1\\), \\(r=5\\%\\) solves to \\(V_0=\\$12.40\\text{M}\\), \\(\\sigma_V=21.23\\%\\), giving \\(N(d_1)=0.9117\\), \\(N(d_2)=0.873\\), so risk-neutral \\(PD=N(-d_2)=12.7\\%\\) and distance to default \\(d_2=1.1408\\).</p>` }
  ],

  concepts: [
    {
      name: "Altman's Z-score",
      def: "A linear discriminant function on five balance-sheet ratios predicting bankruptcy likelihood for public manufacturers.",
      intuition: "Instead of reading five separate ratios and guessing how they combine, Z-score forces them through one formula so every firm gets one comparable number. It was built by statistically finding the weights that best separated firms that later defaulted from firms that didn't, on a large historical sample of manufacturers.",
      example: "Z>3: no default likely. 2.7-3: potential default. 1.8-2.7: reasonable probability of default. <1.8: high likelihood of default. The five inputs are X1 = working capital/total assets (short-term liquidity), X2 = retained earnings/total assets (cumulative profitability and firm age/maturity), X3 = EBIT/total assets (core operating profitability), X4 = market value of equity/book value of total liabilities (a market-based leverage cushion — how far equity can fall before liabilities exceed assets), and X5 = sales/total assets (asset turnover/efficiency).",
      counter: "It was calibrated on publicly traded manufacturers, so applying the same weights and cutoffs unmodified to, say, a private services firm or a bank is a misuse of the model — Altman himself produced adapted versions for private manufacturers precisely because the original weights don't generalize automatically.",
      pitfall: "The cutoffs are empirical rules of thumb from out-of-sample testing (few Type I/Type II errors), not exact probability thresholds — a Z-score of 2.9 is not literally '3% away from safe.'",
      related: [{ r: 21, label: "R21 — the empirical/judgmental model family this belongs to" }]
    },
    {
      name: "Rating migration matrices",
      def: "Cumulative PD is read straight off the matrix; marginal PD in year t = cumulative(t) − cumulative(t−1).",
      intuition: "A migration matrix is just a big historical table, built by rating agencies from decades of real outcomes, that answers 'of all the bonds that started at rating X, what fraction had defaulted by the end of year 1, year 2, year 3...?' Because it's cumulative, you have to subtract consecutive years to isolate the risk of default happening specifically in one particular year.",
      example: "S&P's table shows an AA-rated bond has a 0.02% chance of defaulting by the end of Year 1, 0.06% by the end of Year 2, and 0.11% by the end of Year 3 — all cumulative from time zero. The marginal (year-3-specific) default probability is 0.11% − 0.06% = 0.05%: the extra risk of failing specifically during Year 3, given it survived Years 1 and 2.",
      pitfall: "Investment-grade marginal PD tends to RISE in early years (stable-looking issuers can deteriorate); low-grade (junk) marginal PD tends to FALL after early years (survivors of the risky early period are self-selected as sturdier). This directional asymmetry is a classic trap if you assume marginal PD always behaves the same way. Concretely, the source's B-rated example shows marginal PDs of 3.34%, 4.46%, 3.95%, 3.24% in Years 1–4 — rising then falling, because the initial years are when the weakest junk names get shaken out.",
      related: ["Hazard rate (default intensity)"],
      memory: "IG PD rises early (surprise deterioration); junk PD falls after early years (survivorship self-selection)."
    },
    {
      name: "Hazard rate (default intensity)",
      def: "Q(t) = \\(1- e^{- \\lambda t}\\) for constant hazard rate \\(\\lambda\\). Approximate: \\(\\lambda\\) ≈ s(T)/(1−RR) for a bond priced near par.",
      intuition: "The hazard rate is the instantaneous 'speed' at which default risk accumulates — think of it like a probability per unit time, similar to a mortality rate in actuarial tables. If one year is short enough that the risk of default doesn't change much within it, the conditional default probability over that year and the hazard rate become approximately the same number.",
      example: "3/5/10-yr CDS spreads = 80/90/110bps, RR=65%: avg hazard(3yr)=2.29%, avg hazard(5yr)=2.57%, avg hazard(10yr)=3.14%. Forward hazard rate Yr3-5: [(5×2.57%)−(3×2.29%)]/2 = 2.99%. A second worked example straight from historical migration data: a BB-rated bond has cumulative default probabilities of 3.46% by Year 3 and 4.99% by Year 4. The unconditional (marginal) Year-4 default probability is 4.99%−3.46%=1.53%; the probability of surviving to Year 3 is 100%−3.46%=96.54%; so the conditional Year-4 default probability (= the hazard rate, if a year is 'short') is 1.53%/96.54%=1.58%.",
      pitfall: "A more precise hazard-rate calc (for bonds priced away from par) compares risk-free vs. risky bond prices; the price gap equals PV of expected loss, set equal to \\(\\Sigma (discounted\\) LGD×Q) and solved for Q. Worked numeric version: a 5-year 6%-coupon corporate bond yielding 7% prices at 95.34, while an otherwise-identical risk-free bond yielding 5% prices at 104.09 — the 8.75 price gap is the PV of expected default loss. Splitting that loss across the bond's five annual dates (with a 40% recovery rate assumption) and summing the discounted loss-given-default at each date gives a total of 288.48×Q, so solving 8.75 = 288.48×Q gives Q ≈ 3.03% (the constant per-period default probability consistent with both bond prices).",
      related: [{ r: 30, label: "R30 — the full CDS spread valuation this formula anchors" }, { r: 37, label: "R37 — CVA's discounting engine, built on this same hazard rate" }]
    },
    {
      name: "Recovery rates",
      def: "Trading price (as % of face) roughly one month after default. Senior debt recovers more than subordinated.",
      example: "Moody's data across 1983–2021 shows more senior claims recover more: first-lien bonds average 54.6% recovery versus subordinated bonds averaging 32.1% — because seniority determines who gets paid first out of the same shrunken pool of recoverable assets.",
      pitfall: "Recovery rate is NEGATIVELY correlated with default rate — weak economies produce both more defaults AND lower recoveries on those defaults (a double-whammy that shows up again in R28's tranche analysis). The mortgage analogy makes the mechanism concrete: more mortgage defaults mean more foreclosed properties dumped on the market at once, which itself pushes property prices down, which then lowers the recovery rate lenders get on each foreclosure — the same collateral-price feedback loop applies to corporate bond recoveries in a weak economy.",
      related: [{ r: 23, label: "R23 — the same double-whammy mechanism in retail's 'dark side'" }],
      memory: "Bad times: more defaults AND worse recovery on each one — the double-whammy."
    },
    {
      name: "CDS mechanics",
      def: "Protection buyer pays a periodic spread (quarterly, in arrears, standard dates Mar/Jun/Sep/Dec 20) until maturity or credit event. On default: physical settlement (buyer delivers cheapest-to-deliver bond) or cash settlement (par minus CTD's post-default price).",
      intuition: "A CDS is bond default insurance sold as a standalone contract: you don't need to own the underlying bond to buy protection on it (though most protection buyers do own it, using the CDS as a hedge). The protection buyer's payments look like an insurance premium; the protection seller's payout on default looks like an insurance claim.",
      example: "Concretely: FI Advisors (FIA) owns $200 million par value of bonds issued by ELF Corp and wants credit protection. FIA buys a five-year CDS from Market Makers, Inc. (MM) at a CDS spread of 75 basis points on the $200 million notional. FIA pays MM roughly $1.5 million a year ($200M × 0.75%), split into quarterly installments of about $375,000, due on the standard dates of March 20, June 20, September 20, and December 20. If ELF never defaults, FIA collects nothing from the swap — the payments were the cost of insurance. If ELF defaults on, say, July 20, 2028 (mid-quarter), two things happen: (1) MM pays FIA the full $200 million notional and receives the ELF bonds in exchange (physical settlement) — or, under cash settlement, if the cheapest-to-deliver ELF bond is trading at $0.40 on the dollar, MM instead pays FIA 60% of face, i.e. $120 million; and (2) FIA still owes MM a final prorated accrual payment (about $125,000, covering the one-third of the quarter from June 20 to the July 20 default) before payments cease for good.",
      pitfall: "When physical settlement is used, the CDS contract typically allows delivery of any bond from a list of eligible obligations of similar seniority — but those eligible bonds don't all trade at the same price. The protection buyer will rationally deliver whichever eligible bond is cheapest to acquire, called the cheapest-to-deliver (CTD) bond, which is exactly the option that creates the CTD-driven component of the CDS-bond basis below.",
      related: ["CDS-bond basis"]
    },
    {
      name: "Credit indices (CDX and iTraxx)",
      def: "Standardized baskets of 125 equally-weighted single-name CDS on investment-grade reference entities, traded as one liquid contract instead of 125 separate bilateral trades.",
      example: "CDX NA IG covers 125 North American investment-grade names; iTraxx Europe covers 125 European investment-grade names. Suppose the 5-year iTraxx Europe index is quoted bid 150bps / ask 152bps, and an investor buys protection on €500,000 notional per name. Using the ask side, total annual payments are 0.0152 × €500,000 × 125 = €950,000. If one reference entity then defaults, the investor both receives the appropriate default payoff on that name AND sees future annual payments shrink by €950,000/125 = €7,600 — because the index now only has 124 live names left to pay protection on.",
      related: ["CDS mechanics"]
    },
    {
      name: "CDS-bond basis",
      def: "CDS-bond basis = CDS spread − bond yield spread, should ≈ 0 by arbitrage logic. If CDS spread < bond yield spread: buy bond + buy CDS protection → earn more than risk-free. If CDS spread > bond yield spread: sell bond + sell CDS protection → borrow below risk-free.",
      intuition: "In theory the CDS market and the bond market are pricing the same underlying credit risk, so an investor should be able to combine a corporate bond with an offsetting CDS position and be left holding something close to a risk-free return — any persistent gap between the two spreads is either a real arbitrage or evidence of a friction that blocks the arbitrage from being fully exploited.",
      pitfall: "Basis can be nonzero in practice for SPECIFIC named reasons: bonds trading well away from par (a bond priced above par pushes basis negative, below par pushes it positive), CDS counterparty risk (negative basis — the protection itself carries credit risk, so it's worth less than a 'perfect' hedge), the CTD option (positive basis — the protection seller is giving the buyer a valuable delivery choice, so protection costs more), CDS payoffs excluding accrued interest (negative basis), restructuring clauses that let a CDS pay out even without an outright default (positive basis), and using a risk-free reference rate for the bond yield spread that differs from the one embedded in CDS pricing. Illiquidity in either market can also prevent the arbitrage from being fully exploited even when it exists on paper. The exam sometimes asks which DIRECTION a specific friction pushes the basis — know the list, not just that 'frictions exist.' Historically the basis was broadly positive before the 2007–2009 financial crisis and has generally been negative and smaller since.",
      related: [{ r: 30, label: "R30 — full CDS pricing mechanics" }]
    },
    {
      name: "Real-world vs. risk-neutral PD",
      def: "Risk-neutral PD assumes assets grow at the risk-free rate; real-world PD assumes assets grow at risk-free + risk premium — so real-world asset values are higher, hence real-world PD is LOWER than risk-neutral PD for the same debt level.",
      intuition: "These are two different lenses on the same firm, not two competing 'guesses' at one true number. Risk-neutral PD answers 'what default probability is consistent with the price the market is actually charging for credit risk' — useful for pricing, because it already contains whatever premium the market demands. Real-world PD answers 'how often has a firm like this actually defaulted historically' — useful for stress-testing and scenario analysis, where you want the honest empirical frequency, not a price that's inflated by a risk premium.",
      pitfall: "Use RISK-NEUTRAL PDs for valuation/pricing; use REAL-WORLD PDs for scenario analysis. Bond-implied (risk-neutral) hazard rates run far above historical (real-world) hazard rates — the gap is compensation for systematic risk, illiquidity, and unsystematic risk that can't be fully diversified in a bond book. The gap is proportionally LARGER for lower credit quality and during periods of market stress, since both the diversifiable-risk premium and the illiquidity premium widen exactly when credit fear rises.",
      related: [{ r: 29, why: "R29 — the guidance table on which PD to use where" }, { r: 21, label: "R21" }],
      memory: "Risk-neutral PD (market-implied) > real-world PD (historical) — always, for the same firm at the same time."
    },
    {
      name: "Merton model — precise numeric version",
      def: "E_T = max(V_T − D, 0); solve simultaneously E0 = Black-Scholes call on V0, and \\(\\sigma_E\\cdot E0\\) = \\(N(d1)\\cdot \\sigma_V\\cdot V0\\).",
      intuition: "Equity holders have limited liability — the worst that can happen to them is losing everything, they can never owe more than their investment. That payoff shape (unlimited upside, floored downside at zero) is exactly a call option's payoff, with the firm's assets as the underlying and the face value of debt as the strike price. Once you accept that framing, all of option-pricing theory (Black-Scholes) becomes directly applicable to estimating a firm's default probability from nothing more than its stock price, stock volatility, and debt schedule.",
      example: "E0=$3M, \\(\\sigma E=80\\)%, D=$10M, T=1yr, r=5% → V0=$12.40M, \\(\\sigma V=21.23\\)%, N(d1)=0.9117, N(d2)=0.873. Risk-neutral PD = N(−d2) = 12.7%. Distance to default d2=1.1408. Expected loss on debt = (9.51−9.40)/9.51 = 1.2% of no-default value. The current market value of debt is V0−E0 = 12.40−3 = 9.40; the discounted present value of the promised debt repayment is 10e^(−0.05×1) = 9.51 — the (9.51−9.40)/9.51 = 1.2% gap between what the debt is 'promised' to be worth and what it's actually worth today is the expected credit loss embedded in the debt's price.",
      pitfall: "The Merton model's raw output is a risk-neutral PD (because it comes straight out of an option-pricing framework) — commercial implementations built on this idea, Moody's-KMV and the Kamakura model, take that same Merton machinery and recalibrate/restate the output as a real-world PD, which is exactly why they exist as separate, licensed products rather than free calculators.",
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
    { wrong: "\"The CDS-bond basis should always equal exactly zero.\"", right: "It should ≈0 in theory, but specific named frictions (par mismatch, CDS counterparty risk, CTD option, accrued interest exclusion, restructuring clauses, mismatched risk-free benchmarks) push it nonzero in practice — and each friction has a specific, testable direction." },
    { wrong: "\"Recovery rate and default rate are independent of each other.\"", right: "They're NEGATIVELY correlated — weak economies produce both more defaults and lower recoveries simultaneously, a double-whammy for credit losses." },
    { wrong: "\"A CDS requires you to already own the underlying bond, like a normal insurance policy on a specific asset you hold.\"", right: "A CDS is a standalone derivative contract on a named reference entity; a protection buyer does not need to own the reference entity's debt at all — many CDS positions are purely speculative or used to hedge indirect/correlated exposure." }
  ],

  highYield: [
    { stars: 5, what: "\\(\\lambda\\) ≈ s(T)/(1−RR) and full hazard rate mechanics (worked CDS spread example).", why: "The most-repeated formula thread in Book 2 — ancestor of R30's CDS pricing and R37's CVA." },
    { stars: 5, what: "Risk-neutral vs. real-world PD: which is higher, why, and which to use for pricing vs. scenario analysis.", why: "A foundational distinction reused explicitly in R29 and implicitly throughout the book." },
    { stars: 4, what: "Merton precise numerical solution: solving simultaneously for \\(V0/\\sigma V\\), then PD=N(−d2).", why: "The calculation backbone of this reading, directly testable as a multi-step numeric problem." },
    { stars: 4, what: "CDS-bond basis: the named frictions and their direction.", why: "A precise list-based question format GARP favors — know the list, not just 'frictions exist.'" },
    { stars: 3, what: "Recovery rate negatively correlated with default rate.", why: "A compact, high-value fact that resurfaces in R28's tranche analysis." },
    { stars: 3, what: "IG vs junk marginal PD trend asymmetry.", why: "A subtle directional trap worth memorizing as a pair." }
  ],

  recall: [
    { q: "A 5-year CDS trades at 90bps with RR=65%. Estimate the average hazard rate.", a: "\\(\\lambda\\) ≈ s/(1−RR) = 0.90%/(1−0.65) = 0.90%/0.35 ≈ 2.57% — the approximate constant hazard rate consistent with this credit spread and recovery assumption." },
    { q: "Why is risk-neutral PD systematically higher than real-world PD for the same firm?", a: "Risk-neutral PD assumes assets grow at the risk-free rate; real-world PD assumes assets grow at risk-free PLUS a risk premium, giving a higher expected asset value path and hence a LOWER probability of falling below the default threshold. The gap between the two compensates for systematic risk, illiquidity, and unsystematic risk that can't be fully diversified away." },
    { q: "Why might a CDS-bond basis be persistently positive rather than zero?", a: "The cheapest-to-deliver (CTD) option embedded in physically-settled CDS gives the protection buyer a valuable choice among deliverable bonds, and broad restructuring clauses add extra triggering scenarios — both push CDS spreads up relative to the bond yield spread, creating a positive basis." },
    { q: "Explain why investment-grade bonds show RISING marginal default probability in early years while junk bonds show FALLING marginal probability after the early years.", a: "IG issuers start from a position of apparent strength; the passage of time reveals which ones are actually deteriorating, so marginal PD creeps up as hidden problems surface. Junk issuers start already risky; the ones that survive the dangerous early period are self-selected as the sturdier survivors, so their marginal PD tends to fall thereafter." },
    { q: "A firm has E0=$3M, equity volatility 80%, debt due of $10M in one year, and r=5%. What does solving the Merton model give for V0 and the risk-neutral PD, and how is 'expected loss on debt' computed from those numbers?", a: "Solving the two Merton equations simultaneously gives asset value V0=$12.40M and asset volatility 21.23%, from which N(d1)=0.9117 and N(d2)=0.873, so risk-neutral PD = N(−d2) = 12.7%. Expected loss on debt compares the discounted promised repayment (10e^(−0.05×1)=9.51) to the actual market value of debt today (V0−E0=9.40): (9.51−9.40)/9.51 ≈ 1.2% of the no-default value." }
  ],

  hooks: [
    { title: "Three routes to the same number", text: "Statements (Z-score), history (migration matrices), market prices (hazard rates, Merton) — three completely different data sources converging on the same target: PD. Know which route a question is using before reaching for a formula." },
    { title: "The market always charges a premium", text: "Risk-neutral PD > real-world PD, always — the market prices in a premium for bearing risk that history alone doesn't show. Use the market number to price, the history number to stress-test." },
    { title: "The double-whammy of bad times", text: "Recovery rates fall exactly when default rates rise — weak economies hit you twice, not once." }
  ],

  eli5: `<p>Imagine three different friends trying to guess whether your neighbor will default on a loan they owe you. One friend peeks at your neighbor's checkbook and bank statements and runs the numbers through a scorecard (that's the Z-score). A second friend pulls up a big spreadsheet of "what happened to thousands of other neighbors who looked similar in the past" and reads off how often people in that exact situation eventually stopped paying (that's the migration matrix / historical PD). A third friend looks at how much other people are currently charging to insure against your neighbor defaulting — if insurance is expensive, the market clearly thinks the risk is high (that's the hazard rate / CDS spread route, and it always comes out a bit scarier than the historical friend's number, because insurance sellers charge extra for the *uncertainty* of not knowing, not just the average outcome). In finance terms: the scorecard is Altman's Z-score, the spreadsheet-of-history is a rating migration matrix producing a real-world PD, and the insurance-market price is a hazard rate/CDS spread producing a risk-neutral PD — and the risk-neutral number is always higher because it prices in a premium for bearing the uncertainty, not just the historical average.</p>`,

  thinkLike: `<p>A credit risk manager treats "what is the PD?" as a question with a follow-up question attached: PD <em>for what purpose</em>? If you're pricing a bond, a CDS, or a loan today, you reach for a risk-neutral PD (from spreads or Merton), because that's the number consistent with what the market will actually pay or charge — using a lower, "friendlier" real-world PD to price a trade would mean systematically underpricing the risk you're taking on. If you're running a stress test or deciding how much regulatory capital to hold against a loan book, you reach for a real-world PD (from historical migration data), because you want the honest empirical frequency of default, not a number inflated by a market risk premium that has nothing to do with how often the bad outcome actually occurs.</p>
  <p>On the exam, GARP tests this reading in three recognizable shapes: (1) a straight plug-and-chug calculation — hazard rate from a spread, a migration-matrix marginal PD, or a full Merton solve, so you must be fluent with the arithmetic, not just the concept; (2) a "which PD / which model for which purpose" question, where the trap is picking the mathematically-correct-looking number for the wrong use case; and (3) a "name the friction and its direction" question on the CDS-bond basis, where partial knowledge (knowing frictions exist) scores zero — you need the specific list and which way each one pushes the basis.</p>`,

  breakdown: [
    {
      title: "The three routes to a default probability",
      points: [
        "From financial STATEMENTS — Altman's Z-score runs five balance-sheet ratios (liquidity, cumulative profitability, operating profitability, market-based leverage, asset turnover) through empirically-fitted weights to produce one score, compared against fixed cutoffs.",
        "From historical RATING BEHAVIOR — a rating migration matrix reports the actual cumulative fraction of similarly-rated issuers that defaulted by each future year; subtracting consecutive years isolates the marginal (single-year) default probability.",
        "From MARKET PRICES via credit spreads — a hazard rate is backed out of a CDS or bond credit spread using \\(\\lambda \\approx s/(1-\\text{RR})\\) (or a more precise bond-price-comparison method for bonds away from par).",
        "From MARKET PRICES via option theory — the Merton model treats equity as a call option on firm assets and solves simultaneously for the unobservable asset value and asset volatility, from which the risk-neutral default probability N(−d2) follows."
      ]
    },
    {
      title: "Named frictions behind a nonzero CDS-bond basis",
      points: [
        "Bond trading away from par — a bond priced well above par pushes the basis negative; a bond priced below par pushes it positive.",
        "CDS counterparty risk — the protection itself carries credit risk, making protection worth less than a perfect hedge (negative basis).",
        "The cheapest-to-deliver (CTD) option — the protection buyer's choice among eligible bonds to deliver on default is valuable, so protection costs more (positive basis).",
        "CDS payoffs exclude accrued interest — the CDS payout is smaller than a bond-equivalent claim would be (negative basis).",
        "Restructuring clauses — broader CDS definitions of a credit event (beyond outright default) mean protection can pay out more easily, so it costs more (positive basis).",
        "Mismatched risk-free benchmark — the bond yield spread and CDS pricing may reference different 'risk-free' rates, introducing a basis unrelated to credit risk itself.",
        "Illiquidity in either market — even where a basis represents a genuine arbitrage on paper, illiquidity can prevent it from being fully exploited and eliminated."
      ]
    },
    {
      title: "Solving the precise Merton model, step by step",
      points: [
        "Write equity's terminal payoff as a call option: E_T = max(V_T − D, 0), with strike equal to the debt D due at time T.",
        "Price today's equity as a Black-Scholes call on firm assets: E0 = V0·N(d1) − D·e^(−rT)·N(d2) — one equation, two unknowns (V0, σV).",
        "Add the volatility-matching equation from Itô's lemma: σE·E0 = N(d1)·σV·V0 — now two equations, two unknowns.",
        "Solve the pair numerically (iteration/Solver) for V0 and σV.",
        "Compute d1, d2, N(d1), N(−d2) from the solved V0 and σV — N(−d2) is the risk-neutral default probability, and d2 itself is the distance to default.",
        "Compare the discounted promised debt repayment to the actual market value of debt (V0 − E0) to get the expected loss on debt as a percentage."
      ]
    },
    {
      title: "Up-front premium: the three CDS-coupon cases",
      points: [
        "CDS spread = fixed coupon → no up-front premium changes hands; the standardized coupon happens to equal the fair market spread.",
        "CDS spread > fixed coupon → the protection buyer pays the seller an up-front premium equal to the present value of (spread − coupon), because the buyer is getting protection cheaper than fair value on an ongoing basis.",
        "CDS spread < fixed coupon → the protection seller pays the buyer an up-front premium equal to the present value of (spread − coupon), because the buyer is overpaying on an ongoing basis relative to fair value."
      ]
    }
  ],

  quiz: [
    {
      q: "A firm's 5-year credit spread is 210bps and the expected recovery rate is 30%. Using the approximate hazard-rate formula, what is the implied average annual (conditional) default probability?",
      options: ["2.1%", "3.0%", "6.3%", "0.63%"],
      answer: 1,
      why: "\\(\\lambda \\approx s/(1-\\text{RR}) = 0.021/(1-0.30) = 0.021/0.70 = 3.0\\%\\). The tempting wrong answer 2.1% just restates the raw spread without dividing by loss-given-default; 6.3% comes from multiplying instead of dividing by (1−RR)."
    },
    {
      q: "Which named friction, on its own, tends to push the CDS-bond basis NEGATIVE?",
      options: ["The cheapest-to-deliver (CTD) option embedded in physical settlement", "Broad restructuring clauses in the CDS definition", "CDS payoffs excluding accrued interest", "A bond trading well below par"],
      answer: 2,
      why: "Excluding accrued interest from the CDS payoff makes the CDS payout smaller relative to an equivalent bond claim, which pushes CDS spreads down relative to the bond yield spread — a negative basis. The CTD option and restructuring clauses both push the basis positive (they make protection more valuable/costly), and a bond trading below par also tends to push the basis positive, not negative — the reverse of what's asked."
    },
    {
      q: "A risk manager needs a default probability to price a new corporate bond issue today. Which type of PD should be used, and why?",
      options: ["Real-world PD, because it reflects actual historical default frequency", "Risk-neutral PD, because it's consistent with the price the market currently charges for bearing the risk", "Either, since they converge for investment-grade names", "Real-world PD, because risk-neutral PD only applies to derivatives"],
      answer: 1,
      why: "Pricing/valuation requires risk-neutral PD, since it embeds the same risk premium the market is charging, making it internally consistent with market prices. Real-world PD is systematically lower (it excludes the risk premium) and is the right tool for scenario/stress analysis, not pricing — using it here would understate the credit risk actually priced into the market."
    },
    {
      q: "A firm's equity is $3 million with 80% equity volatility, its debt of $10 million is due in one year, and the risk-free rate is 5%. Solving the Merton model gives V0=$12.40M and σV=21.23%, with N(d2)=0.873. What is the risk-neutral probability of default?",
      options: ["87.3%", "12.7%", "21.23%", "N(d1) = 91.17%"],
      answer: 1,
      why: "Risk-neutral PD = N(−d2) = 1 − N(d2) = 1 − 0.873 = 12.7%. Answering 87.3% mistakenly reports the survival probability N(d2) itself rather than its complement; N(d1)=91.17% is the equity option's delta, not a default probability at all."
    },
    {
      q: "For an investment-grade issuer, what typically happens to its MARGINAL (year-specific) default probability during the first few years after issuance?",
      options: ["It falls steadily as the issuer proves itself", "It stays flat by regulatory construction", "It tends to rise, as hidden financial deterioration surfaces over time", "It spikes in year 1 then never changes again"],
      answer: 2,
      why: "Investment-grade issuers start from a position of apparent strength, so early years tend to show a rising marginal PD as underlying weaknesses are revealed with time. The 'falls steadily' pattern is instead the classic junk-bond pattern (survivorship self-selection after a risky early period) — mixing up the two directions is the single most common trap on this topic."
    },
    {
      q: "A bank buys 5-year CDS protection on $50 million notional at a CDS spread of 120bps, paid quarterly in arrears. What is the approximate quarterly premium payment (ignoring day-count adjustments)?",
      options: ["$600,000", "$150,000", "$60,000", "$50,000"],
      answer: 1,
      why: "Annual premium = $50,000,000 × 0.0120 = $600,000; split into four quarterly payments gives $600,000/4 = $150,000 per quarter. $600,000 is the annual figure, not the quarterly one; $60,000 and $50,000 come from misapplying the spread or notional."
    }
  ],

  sources: [
    { title: "Altman Z-Score — Investopedia", url: "https://www.investopedia.com/terms/a/altman.asp", note: "Plain-language walkthrough of the five Z-score ratios, the cutoff bands, and its history and limitations." },
    { title: "Credit Default Swap (CDS) — Investopedia", url: "https://www.investopedia.com/terms/c/creditdefaultswap.asp", note: "Overview of CDS mechanics, protection buyer/seller roles, and settlement types (physical vs. cash)." },
    { title: "Merton Model — Wikipedia", url: "https://en.wikipedia.org/wiki/Merton_model", note: "Background on treating firm equity as a call option on assets, and the origins of the distance-to-default concept." },
    { title: "Hazard Function — Wikipedia", url: "https://en.wikipedia.org/wiki/Failure_rate", note: "General mathematical background on hazard/failure rates and their link to exponential survival distributions, underlying the constant-hazard-rate PD formula." }
  ],

  pdf: { book: 2, query: "This topic discusses various approaches for estimating default probabilities" },

  summary: `<p><strong>Altman's Z-score</strong>: 5-ratio discriminant, Z>3 safe, <1.8 high default likelihood. <strong>Migration matrices</strong>: marginal PD = cumulative(t)−cumulative(t−1); IG marginal PD rises early, junk falls after early years. <strong>Hazard rate</strong>: \\(Q(t)=1- e^{- \\lambda t}\\); \\(\\lambda \\approx s(T)/(1- RR)\\) from credit spreads. <strong>Recovery rate</strong> negatively correlated with default rate. <strong>CDS mechanics</strong>: periodic spread, physical/cash settlement, up-front premium for coupon gaps. <strong>CDS-bond basis</strong> ≈0 in theory; several named frictions push it off zero in practice. <strong>Risk-neutral PD</strong> (pricing) > <strong>real-world PD</strong> (scenario analysis) always, for the same firm. <strong>Merton</strong> (precise): solve simultaneously for V0, \\(\\sigma V\\) from observable E0, \\(\\sigma E\\); PD_RN=N(−d2).</p>`
});
