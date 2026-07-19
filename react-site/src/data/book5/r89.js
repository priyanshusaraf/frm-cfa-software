export default ({
  book: 5, reading: 89,
  session: "Risk Management and Investment Management",
  title: "Hedge Funds",
  tagline: "Strategies, database biases, alpha-beta separation, and what hedge fund returns really contain — plus why diversification across strategies fails exactly when you need it most.",

  teaches: `<p>Hedge fund characteristics vs. mutual funds; database biases and industry evolution (1994 Fed shock, LTCM 1998, dot-com 2001); institutional investor impact; alpha-beta separation; the named hedge fund strategies and their risk characteristics; historical performance analysis; convergence of risk factors during stress; and risk-sharing asymmetry between managers and investors.</p>`,

  why: `<p>Hedge fund returns are often misunderstood as pure "alpha" when much of it is disguised beta exposure or compensation for specific, named tail risks (deal risk, credit risk, liquidity risk). This reading teaches you to decompose hedge fund returns into their actual risk-factor content rather than taking "hedge fund alpha" at face value.</p>`,

  intuition: `<p>Hedge funds differ from mutual funds in being private, unregulated, highly leveraged, and taking both long AND short positions — with a fee structure (management fee + 10-20% of profits) that creates a genuine principal-agent conflict: managers are incentivized to take outsized risk (upside is shared, but a blown-up fund can simply be restarted under a new name), which investors can partially counter by preferring managers with significant personal capital in the fund.</p>
  <p>The most important structural lesson: hedge fund strategies that LOOK diversified in normal times CONVERGE in risk during genuine market-wide stress (1994 Fed shock, 1998 LTCM, 2007-08 crisis) — nearly all strategies lost money simultaneously in each event, EXCEPT short sellers and (usually) managed futures. Diversifying across hedge fund STRATEGIES doesn't protect you from a genuine systemic funding crisis, because the common thread — leverage and forced liquidation — hits everyone at once.</p>
  <p>ALPHA-BETA SEPARATION is the key analytical tool: identify how much return comes from bearing systematic risk (beta) vs. genuine active skill (alpha), then actively manage them independently (e.g., hedge out unwanted beta via futures while pursuing alpha) — separating alpha and beta lets a manager target a SPECIFIC beta (e.g., 1.0 to a benchmark) while independently optimizing for alpha.</p>`,

  formulas: [],

  eli5: `<p>Picture two restaurants. One (the "mutual fund") lets any customer walk in, posts its menu and prices publicly, and a health inspector checks the kitchen every quarter. The other (the "hedge fund") is a private members' club — you need an invitation, the chef won't tell you the recipes (so competitors can't copy them), and the chef keeps a fixed salary PLUS 15-20% of any extra profit the club makes above its previous high point, but pays nothing back if the club loses money — worse, if the club closes, the chef can just open a new club next door under a new name. Some "club critics" (funds-of-hedge-funds) eat at every club in town and publish an average score, and it turns out their scores track the official published averages closely, so fears that only good clubs report their scores turn out to be mostly overblown. And here's the catch: in normal times each club has a different specialty (steak, sushi, dessert) so a food critic touring five different clubs gets a varied, "diversified" meal — but during a genuine citywide food-supply shortage (a funding crisis), EVERY club runs out of ingredients at once, because they all secretly depended on the same trucking company (leverage/funding), and only the "salad-only" club (short sellers) stays open. In finance terms: hedge funds are private, leveraged, incentive-fee-driven vehicles whose apparent strategy diversification collapses into simultaneous losses exactly when a market-wide liquidity/funding crisis hits.</p>`,

  thinkLike: `<p>A risk manager evaluating a hedge fund allocation never takes a manager's quoted "alpha" at face value — the first move is always <strong>alpha-beta separation</strong>: regress the fund's returns against a multi-factor model (equity, bond, credit-spread, emerging-market, volatility factors) and see how much of the return survives after stripping out compensation for systematic risk. A merger-arb fund that looks like it generates smooth "alpha" every month except for occasional large losses after equity sell-offs isn't magic — it's short a tail risk (deal risk) that simply hasn't been priced into a linear beta yet, which is exactly the kind of nonlinear, option-like exposure that fools naive Sharpe-ratio comparisons (see R88's nonlinear-payoff problem). Second, the practitioner asks: "what happens to this book of strategies in a genuine funding crisis, not just a garden-variety drawdown?" — because strategy labels (managed futures, merger arb, convertible arb, long/short equity) that look uncorrelated in calm markets are frequently all quietly leveraged bets on continued market liquidity, and 1994, 1998, and 2007-08 all showed the SAME pattern: everything but short sellers (and usually managed futures) got hit together. The examiner tests this by presenting a "diversified basket of hedge fund strategies" scenario and asking what happens in a systemic stress event — the correct answer is never "diversification protects the portfolio," it's "convergence of risk factors erodes the expected diversification benefit." Third, on manager selection: because the incentive-fee structure (15-20% of profits above a high-water mark) gives the manager a call option on the fund's performance — upside shared, downside mostly not — the practitioner's due-diligence checklist always includes "how much of the manager's own net worth is in this fund," since that is the most direct, if imperfect, fix for the principal-agent asymmetry.</p>`,

  concepts: [
    {
      name: "Hedge fund characteristics and database biases",
      def: "Hedge funds: private, unregulated (unlike mutual funds), highly leveraged, both long and short positions, low transparency, fee = management fee + 10-20% of new profits.",
      pitfall: "SELECTION (self-reporting) bias exists because some hedge funds don't participate in commercial databases — but evidence suggests this bias is actually SMALL, since funds-of-hedge-funds (FoFs, which invest across ALL hedge funds, not just database-reported ones) show returns highly correlated with commercial database averages. Hedge fund index returns became increasingly RELIABLE beginning in 1996.",
      related: [{ r: 80, label: "R80 — survivorship and sample selection bias, the same mechanisms applied to illiquid assets generally" }],
      memory: "Selection bias sounds scary but is empirically small — funds-of-funds (which see the WHOLE universe) track the reported database averages closely."
    },
    {
      name: "Evolution of the hedge fund industry — landmark events",
      def: "Early 1994: Fed rate-policy shock caused dramatic hedge fund losses, prompting the development of hedge fund databases. LTCM collapse (1998): a watershed event — a reminder that higher returns come with higher risk, with a much greater effect on HEDGE FUND performance than on equities generally. Dot-com collapse (2000-01): hedge funds outperformed the S&P 500 with HALF its volatility, triggering a wave of institutional capital inflow.",
      pitfall: "AUM grew 10× from 1997-2010 while fund count only quadrupled — meaning average fund SIZE grew substantially, partly driven by the institutional capital wave post-dot-com.",
      related: []
    },
    {
      name: "Impact of institutional investors",
      def: "Beginning 1999, institutional capital (foundations, endowments, pensions, insurers) flowed into hedge funds — AUM grew from $197B (1999) to $1.39T (2007).",
      pitfall: "Institutional investors accepted a MUCH HIGHER fee environment for access — with institutional scrutiny came greater demands for operational integrity and governance. There is genuine CONCERN that no identifiable alpha exists in aggregate hedge fund investing, making manager differentiation increasingly important.",
      related: [],
      memory: "Institutions paid MORE (higher fees) for LESS certainty of genuine alpha — access and diversification, not guaranteed skill, was often the real product being bought."
    },
    {
      name: "Alpha-beta separation",
      def: "Alpha: return in excess of compensation for risk (skill-driven). Beta: systematic risk exposure. DISTINGUISHING alpha from beta means identifying how much of a return comes from each; SEPARATING alpha from beta means actively managing them independently (e.g., hedging out unwanted systematic risk via derivatives while pursuing alpha).",
      example: "A manager benchmarked to the S&P 500 pursues alpha opportunities that create unwanted beta exposure — he uses futures to hedge all systematic risk EXCEPT S&P 500 exposure, forcing portfolio beta to exactly 1.0 relative to the benchmark, while independently optimizing for alpha.",
      related: [],
      memory: "Distinguish = diagnose how much is skill vs risk. Separate = actively engineer them into two independent dials you can each turn on purpose."
    },
    {
      name: "Named hedge fund strategies",
      def: "Managed futures/global macro: systematic trend-following across bonds/equities/commodities/currencies, high leverage, no net long/short bias; payoff resembles a lookback straddle; global macro does best during EXTREME currency moves; both are 'asset allocation' strategies with LOW equity correlation. Merger (risk) arbitrage: captures M&A spreads; primary risk = DEAL RISK (deal fails to close); largest negative returns follow large S&P declines (mergers more likely called off in a downturn — 'long deal risk'). Distressed securities: invests across the capital structure of financially/operationally distressed firms, LONG bias, exposed to low-credit-rating corporate risk (proxy: high-yield bonds, \\(\\rho \\approx 0.55\\) with the DJCS Distressed index). Fixed-income arbitrage: exploits pricing anomalies between related fixed-income securities (swap spread, yield-curve spread, mortgage spread, fixed-income volatility, capital structure/credit arbitrage trades). Convertible arbitrage: long convertible bonds, short the underlying stock at a delta-neutral ratio; return = liquidity premium paid by issuers for holding/hedging the convertible. Long/short equity (30-40% of hedge funds): both long and short equity positions, highly IDIOSYNCRATIC manager-dependent performance; directional market exposure PLUS long-small/short-large exposure. Dedicated short bias: net short equities, negatively correlated with equities. Emerging markets: LONG bias (shorting is harder in emerging markets). Equity market neutral: targets ZERO beta(s) against equity indices; no single common risk factor across different equity-market-neutral funds' strategies.",
      pitfall: "Merger arbitrage and distressed securities are BOTH event-driven strategies with NONLINEAR return characteristics — tail risk shows up under EXTREME conditions specifically (unlike trend-following strategies, which are typically HELPED, not hurt, by extreme market movements).",
      intuition: "A 'lookback straddle' (the payoff shape of managed futures) is a hypothetical option combo — a lookback CALL that lets you buy at the LOWEST price seen during the period, plus a lookback PUT that lets you sell at the HIGHEST price seen — so the combined payoff captures the full range of a big price swing, in EITHER direction. That's exactly what a trend-following systematic trader is trying to approximate mechanically: ride whichever direction (up or down) the trend moves, entering near the bottom and exiting near the top of the move — which is why the strategy profits from big directional swings and does poorly in flat, range-bound markets.",
      related: [{ r: 83, label: "R83 — nonlinear strategies' false-positive alpha problem, exactly the merger-arb/convertible-arb issue flagged there" }],
      memory: "Trend-following strategies (managed futures, global macro) LOVE extreme moves. Event-driven strategies (merger arb, distressed) FEAR them — opposite reactions to the same kind of shock."
    },
    {
      name: "Historical hedge fund performance",
      def: "A study of 27 large hedge funds (2000) regressed against an 8-factor model found NO significant exposure to stocks/bonds, persistent EMERGING MARKETS exposure, and a large equally-weighted alpha of 1.48%/month — though alpha DECLINED over time (more competition).",
      example: "A later top-50-large-hedge-fund study (2002-2010): the 'lower/upper bound' portfolio (rebalanced yearly, no foresight) showed NO significant alpha; the 'foresight-assisted' portfolio (selected using 2010 year-end data) showed a statistically significant 0.53%/month alpha. Both top-50 portfolio versions showed SIGNIFICANT alpha relative to broad hedge fund INDICES (DJCSI, HFRI) — buying LARGE hedge funds beats just buying the index.",
      pitfall: "The 2002-2010 alpha DECLINE (vs. pre-2002) is consistent with increasing COMPETITION in the hedge fund industry — but there was NO significant NEGATIVE alpha, so hedge funds still weren't destroying value, just generating less excess return than in earlier, less crowded years.",
      related: [],
      memory: "Big hedge funds beat the hedge fund INDEX — but even big hedge funds show declining alpha over time as more competitors crowd the same trades."
    },
    {
      name: "Convergence of risk factors during stress",
      def: "Diversification across hedge fund STRATEGIES theoretically protects investors — but certain market-wide events cause seemingly diverse strategies to CONVERGE in risk simultaneously.",
      example: "1994 Fed shock: 7 of 10 DJCS style sub-indices lost money over two months (short sellers and managed futures were exceptions). August 1998 (pre-LTCM collapse): 8 of 10 sub-indices had large losses (short sellers, managed futures again spared) — driven by market-wide liquidation of risky assets amplified by LTCM's own high leverage. August 2007 and July-October 2008: ALL (or nearly all) specialist style sub-indices lost money simultaneously — only short sellers were consistently positive.",
      pitfall: "The common driver across ALL these convergence events: leverage magnifies both gains and losses, and a market-wide FUNDING crisis makes diversification across strategies fail, because forced liquidation of leveraged positions hits every strategy at once. Managed futures showed a CONVEX performance profile relative to other strategies — a partial (not complete) solution to this convergence problem.",
      related: [{ r: 63, label: "R63 — liquidity black holes and positive feedback trading, the same market-wide contagion mechanism" }],
      memory: "Strategy diversification works — until a genuine funding crisis hits, at which point 'diversified' hedge fund strategies reveal they were all secretly the same leveraged bet on market liquidity."
    },
    {
      name: "Risk-sharing asymmetry (principal-agent problem)",
      def: "The incentive fee (15-20% of profits above a high-water mark) encourages managers to take OUTSIZED risk — since upside is shared with the manager but downside mostly falls on investors, and a failed fund's manager can simply START A NEW FUND.",
      pitfall: "There IS some opportunity cost to fund failure (reputational/track-record damage) — but this does NOT fully mitigate the basic principal-agent conflict. The best (though imperfect) investor safeguard: prefer managers who have SIGNIFICANT PERSONAL WEALTH invested in their own fund, aligning incentives more directly.",
      related: [],
      memory: "Heads the manager wins big (20% of profits); tails, investors lose and the manager can just start a new fund — asymmetric enough that personal skin-in-the-game is the best available fix."
    }
  ],

  connections: {
    from: [
      { r: 82, why: "Value/momentum factor exposures reappear as hidden beta content inside many hedge fund strategies." },
      { r: 88, why: "The nonlinear-payoff alpha measurement problem flagged there is exactly why merger arbitrage and convertible arbitrage complicate performance evaluation." },
      { r: 63, why: "Liquidity black holes/positive feedback trading is the same mechanism driving risk-factor convergence during hedge fund stress events." }
    ],
    to: [
      { r: 90, why: "Due diligence on specific managers directly addresses the risk-sharing asymmetry and operational concerns raised here." }
    ],
    confused: [
      { what: "Distinguishing alpha and beta vs separating alpha and beta", how: "Distinguishing is DIAGNOSTIC (how much return is skill vs risk); separating is ACTIVE MANAGEMENT (using derivatives to independently target both a specific beta and optimize alpha simultaneously)." },
      { what: "Trend-following strategies vs event-driven strategies under extreme market moves", how: "Trend-following (managed futures, global macro) BENEFITS from extreme moves; event-driven (merger arb, distressed) is HURT by extreme moves — opposite payoff shapes." },
      { what: "Strategy diversification in normal times vs during a funding crisis", how: "Hedge fund strategies genuinely diversify each other in normal conditions, but CONVERGE in risk during market-wide funding crises — a well-diversified-looking hedge fund portfolio can still carry hidden systemic tail risk." }
    ]
  },

  misconceptions: [
    { wrong: "\"Selection/self-reporting bias significantly distorts hedge fund database returns.\"", right: "Evidence suggests this bias is actually SMALL — funds-of-hedge-funds (which invest across the full universe, not just database-reporting funds) show returns highly correlated with commercial database averages." },
    { wrong: "\"Diversifying across different hedge fund strategies fully protects a portfolio from systemic risk.\"", right: "Strategies that appear diversified in normal times CONVERGE in risk during genuine market-wide funding crises (1994, 1998, 2007-08) — nearly all strategies except short sellers (and often managed futures) lose money simultaneously in these events." },
    { wrong: "\"Merger arbitrage and distressed securities strategies, like trend-following strategies, benefit from extreme market movements.\"", right: "The opposite — these are event-driven strategies HURT by extreme conditions (large equity declines increase deal-failure risk for merger arb; big short-rate moves hurt distressed strategies), unlike trend-following strategies which thrive on extreme moves." },
    { wrong: "\"Hedge fund alpha has remained constant or increased from the 1990s to the 2002-2010 period.\"", right: "Alpha DECLINED in the 2002-2010 period relative to earlier years, consistent with increased competition in the industry — though it did not turn significantly negative." },
    { wrong: "\"A hedge fund manager who fails and closes a fund faces no meaningful consequence, fully validating the principal-agent risk concern.\"", right: "There IS a real opportunity cost — reputational damage and harm to the manager's track record — though this cost does NOT fully mitigate the underlying incentive conflict, since managers can still start new funds." }
  ],

  highYield: [
    { stars: 5, what: "Convergence of risk factors during market-wide stress events (1994, 1998, 2007-08) and why strategy diversification fails in a genuine funding crisis.", why: "The single most important systemic-risk lesson in this reading, connecting directly to Book 4's liquidity spiral theme." },
    { stars: 4, what: "Named hedge fund strategies: their core mechanics, risk characteristics, and trend-following vs. event-driven reaction to extreme moves.", why: "A rich classification framework, frequently tested via scenario-to-strategy matching." },
    { stars: 4, what: "Risk-sharing asymmetry: the incentive fee structure's principal-agent problem and the personal-capital mitigant.", why: "A precise, frequently tested governance/incentive concept." },
    { stars: 3, what: "Alpha-beta distinguishing vs. separating, and the futures-hedging worked example.", why: "A clean conceptual distinction with a concrete illustrative mechanism." },
    { stars: 3, what: "Historical performance: 27-fund study (1.48%/month alpha, declining over time) and top-50 fund studies (foresight-assisted vs. lower/upper-bound portfolios).", why: "Specific, quotable empirical findings frequently tested." },
    { stars: 2, what: "Selection bias being empirically small (contrary to intuition), verified via funds-of-hedge-funds correlation.", why: "A counter-intuitive fact worth a quick recall check." }
  ],

  recall: [
    { q: "During the 2007-08 financial crisis, nearly all hedge fund strategy sub-indices lost money simultaneously, despite representing supposedly diversified strategies. Why did diversification fail here?", a: "A market-wide funding crisis creates a common driver across virtually all leveraged strategies: forced liquidation of positions as funding disappears. Since most hedge fund strategies rely on leverage to generate returns, when a systemic funding crisis hits, ALL leveraged strategies face simultaneous margin calls and forced deleveraging — the risk factors that seemed diversified in normal times CONVERGE because the underlying vulnerability (dependence on continued leverage/funding availability) was shared all along, just not visible until the crisis exposed it." },
    { q: "Why does merger arbitrage show its largest negative returns specifically following large negative S&P 500 returns, rather than during calm markets?", a: "Merger arbitrage's primary risk is DEAL RISK — the risk that an announced merger fails to close. When the broader market experiences a large decline, pending mergers are more likely to be called off (financing dries up, strategic rationale weakens, or acquirer confidence drops) — this makes merger arbitrage effectively 'long deal risk,' meaning it's exposed to a correlated failure mode precisely when equity markets are already stressed." },
    { q: "A hedge fund manager wants to pursue an alpha-generating strategy that happens to create unwanted exposure to interest rate and currency risk beyond the fund's intended beta target. How can the manager address this while still pursuing the strategy?", a: "This is 'separating alpha and beta' — the manager can use derivatives (e.g., futures or swaps) to hedge out the UNWANTED systematic exposures (interest rate, currency risk) while retaining the specific alpha-generating position, effectively isolating and preserving the alpha bet while independently controlling the fund's overall beta profile to match its target." },
    { q: "Why might an institutional investor specifically seek out hedge fund managers who have a significant portion of their own personal wealth invested in the fund?", a: "This addresses the risk-sharing asymmetry (principal-agent problem) inherent in typical hedge fund fee structures — managers earning 15-20% of profits above a high-water mark have an incentive to take outsized risks, since they share in the upside but a failed fund's downside mostly falls on outside investors (and the manager can often start a new fund afterward). A manager with substantial personal capital at stake bears real downside risk alongside investors, better aligning incentives." }
  ],

  hooks: [
    { title: "Fair weather diversification", text: "Hedge fund strategy diversification works beautifully — right up until a systemic funding crisis arrives, at which point every strategy quietly reveals it was leaning on the same leverage-and-liquidity crutch all along." },
    { title: "Heads I win, tails you lose (and I start over)", text: "The hedge fund fee structure's asymmetry in one sentence: the manager keeps 15-20% of the upside, investors absorb most of the downside, and if the fund blows up, the manager can simply launch a new one under a different name." },
    { title: "Trend-followers love chaos, event-driven funds fear it", text: "Managed futures and global macro strategies THRIVE on extreme currency/rate moves. Merger arb and distressed strategies DREAD them — same market shock, opposite reaction, because their whole business models bet on opposite things (momentum vs. deal completion)." }
  ],

  summary: `<p><strong>Hedge funds</strong>: private, unregulated, leveraged, long+short, fee=mgmt+10-20% profits; selection bias in databases is empirically SMALL. <strong>Evolution</strong>: 1994 Fed shock (databases emerge) → 1998 LTCM (leverage's dark side) → 2001 dot-com (institutional inflow triggered by strong risk-adjusted performance). <strong>Alpha-beta separation</strong>: distinguish (diagnose skill vs risk) vs. separate (actively hedge unwanted beta while pursuing alpha). <strong>Strategies</strong>: managed futures/global macro (trend-following, asset allocation, low equity correlation, benefits from extremes); merger arb (deal risk, hurt by market declines); distressed (long credit risk, high-yield bond proxy); fixed-income arb (yield-curve/swap-spread/mortgage/vol trades); convertible arb (liquidity premium); long/short equity (idiosyncratic); dedicated short bias; emerging markets (long-biased); equity market neutral (zero beta target). <strong>Performance</strong>: large hedge funds show declining but still-positive alpha over time (more competition); big funds beat hedge fund INDICES. <strong>Convergence</strong>: strategies diversify in normal times, CONVERGE during systemic funding crises (1994, 1998, 2007-08) — managed futures' convex profile is a partial hedge. <strong>Risk-sharing asymmetry</strong>: incentive fees encourage outsized risk-taking — prefer managers with real personal capital at stake.</p>`,

  breakdown: [
    {
      title: "The named hedge fund strategy universe (LO 91.e)",
      points: [
        "Managed futures — systematic trend-following in bond/equity/commodity/currency futures, high leverage, no net long/short bias; payoff resembles a lookback straddle (captures the full swing of a big directional move).",
        "Global macro — discretionary directional bets on rates, FX, commodities, and stock indices; does best in EXTREME currency moves; both managed futures and global macro are 'asset allocation' strategies with low equity correlation.",
        "Merger (risk) arbitrage — captures the spread between a target's market price and the announced deal price; primary risk is DEAL RISK (deal falls through); largest losses follow large S&P declines because deals get called off more often in downturns.",
        "Distressed securities — invests across the capital structure of financially/operationally distressed or bankrupt firms; long-biased; proxy is high-yield bonds (correlation ≈ 0.55 with the DJCS Distressed index); tail risk = a big move in short-term rates.",
        "Fixed-income arbitrage — exploits pricing anomalies between related fixed-income instruments (see the fixed-income arbitrage sector breakdown below); hedges out interest-rate risk to isolate the relative-value bet.",
        "Convertible arbitrage — long convertible bonds, short the underlying stock at a delta-neutral ratio; return is the liquidity premium issuers pay hedge funds for holding and hedging the convertible.",
        "Long/short equity — 30-40% of all hedge funds; both long and short equity positions across sectors/regions/caps; highly idiosyncratic, manager-dependent performance; has both directional market exposure AND a long-small-cap/short-large-cap tilt.",
        "Dedicated short bias — net short equities, often via forward sales, with offsetting longs and stop-losses to manage risk; returns are negatively correlated with equities.",
        "Emerging markets — invests in currencies, debt, and equities of developing economies (China, India, Latin America, SE Asia, parts of Eastern Europe/Africa); long-biased because shorting is harder in these markets.",
        "Equity market neutral — targets zero beta(s) against a broad set of equity indices; no single common risk factor links different managers' approaches to reaching that target."
      ]
    },
    {
      title: "Fixed-income arbitrage sector trades",
      points: [
        "Swap spread trade — a bet that the fixed leg of a swap stays higher than the floating leg and remains within a historically normal range.",
        "Yield-curve spread trade — a bet that a bond's price deviates from the overall yield curve only briefly and reverts to normal spreads over time.",
        "Mortgage spread trade — a bet on the path of prepayment rates on mortgage-backed securities.",
        "Fixed-income volatility trade — a bet that the implied volatility of instruments like interest-rate caps tends to run higher than the realized volatility of a related instrument (e.g., Eurodollar futures).",
        "Capital structure / credit arbitrage trade — capitalizes on relative mispricing between different securities of the same issuer (e.g., its equity vs. its debt)."
      ]
    },
    {
      title: "Landmark stress events showing convergence of risk factors (LO 91.g)",
      points: [
        "March–April 1994 (Fed rate-policy shock) — 7 of 10 DJCS style sub-indices lost money over two months; only short sellers and managed futures were spared (merger arb was positive in March, equity market neutral positive in April).",
        "August 1998 (pre-LTCM collapse) — 8 of 10 DJCS sub-indices had large losses, driven by market-wide liquidation of risky assets amplified by LTCM's own high leverage; short sellers and managed futures again avoided losses.",
        "August 2007 — for the first time, ALL nine specialist style sub-indices lost money simultaneously; only short sellers were positive.",
        "July–October 2008 (financial crisis peak) — July–September brought losses across every hedge fund style except short sellers, as forced liquidation of leveraged positions drove losses market-wide.",
        "Common thread across all four events — leverage magnifies gains AND losses, and a market-wide funding crisis makes cross-strategy diversification fail because every leveraged strategy faces forced deleveraging at once; managed futures' convex payoff profile is only a partial offset."
      ]
    }
  ],

  quiz: [
    {
      q: "A fund-of-hedge-funds (FoF), which invests across the full universe of hedge funds rather than only those reporting to commercial databases, shows returns highly correlated with commercial database averages. What does this tell you about selection (self-reporting) bias in hedge fund databases?",
      options: [
        "Selection bias is severe and database returns should be discounted heavily",
        "Selection bias is empirically small, since the FoF universe (which sees non-reporting funds too) tracks the database averages closely",
        "Selection bias cannot be assessed without knowing every non-reporting fund's exact return",
        "FoFs eliminate selection bias by definition, so this comparison is meaningless"
      ],
      answer: 1,
      why: "The FoF-to-database correlation is exactly the empirical test the reading cites: since FoFs invest across the WHOLE universe (including non-database funds) yet still track reported averages closely, the bias from funds that don't report must be small. The 'selection bias is severe' answer is the common intuitive-but-wrong assumption (self-reporting sounds like it should be a big problem); the 'cannot be assessed' and 'meaningless by definition' answers are distractors that misstate what a correlation test can and can't show."
    },
    {
      q: "Following the dot-com bubble collapse (2000-01), hedge funds attracted a large wave of institutional capital. What performance fact specifically drove this inflow?",
      options: [
        "Hedge funds returned exactly the same as the S&P 500 with lower fees",
        "Hedge funds outperformed the S&P 500 while carrying about half its standard deviation",
        "Hedge funds became newly regulated, reassuring institutional risk committees",
        "Hedge fund AUM quadrupled overnight due to a change in SEC rules"
      ],
      answer: 1,
      why: "The reading is specific: hedge funds outperformed the S&P 500 with roughly half its volatility during the dot-com collapse, a striking risk-adjusted result that triggered the institutional inflow (AUM grew from $197B in 1999 to $1.39T by 2007). The 'newly regulated' answer is false — hedge funds remained comparatively unregulated; the 'AUM quadrupled from SEC rules' answer confuses AUM growth (10x from 1997-2010) with a regulatory story."
    },
    {
      q: "A manager benchmarked to the S&P 500 wants to pursue an alpha strategy that also creates unwanted interest-rate and currency exposure. She uses futures to hedge out every systematic exposure except S&P 500 risk, forcing portfolio beta to exactly 1.0 relative to the benchmark, while independently pursuing the alpha trade. What is she doing?",
      options: [
        "Distinguishing alpha from beta",
        "Separating alpha from beta",
        "Achieving equity market neutrality",
        "Engaging in dedicated short bias hedging"
      ],
      answer: 1,
      why: "This is the textbook example of SEPARATING alpha and beta — actively using derivatives to independently manage/target a specific beta while independently optimizing alpha. The 'distinguishing alpha from beta' answer is the tempting distractor because it sounds similar, but distinguishing is only DIAGNOSTIC (measuring how much return is skill vs. risk), not the active hedging action described. The 'equity market neutrality' answer is wrong because her target beta is 1.0, not zero."
    },
    {
      q: "Why does merger arbitrage typically post its largest negative monthly returns right after a large negative return in the S&P 500, rather than during calm, range-bound markets?",
      options: [
        "Merger arbitrage funds are forced to sell target-company shares to meet redemptions during equity sell-offs",
        "The strategy is effectively 'long deal risk' — large market declines increase the chance that pending mergers get called off",
        "Merger arbitrage funds hold large net short equity positions that lose money in market declines",
        "Rising volatility mechanically widens convertible bond conversion premiums, hurting merger arb returns"
      ],
      answer: 1,
      why: "The mechanism is deal risk: when markets decline sharply, financing conditions tighten and acquirer confidence drops, making pending deals more likely to be called off — this is what 'long deal risk' means. The 'net short equity positions' answer is a distractor confusing merger arb with dedicated short bias; the 'conversion premium' answer confuses merger arb with convertible arbitrage, an unrelated strategy."
    },
    {
      q: "A distressed-securities hedge fund's returns show roughly 0.55 correlation with the DJCS Distressed index using which asset class as the empirical proxy?",
      options: [
        "Investment-grade corporate bonds",
        "Emerging market equities",
        "Publicly traded high-yield bonds",
        "Convertible bonds"
      ],
      answer: 2,
      why: "The reading specifically identifies publicly traded high-yield bonds as the proxy (correlation ≈ 0.55), because distressed strategies carry long exposure to the credit risk of low-rated corporations — the same risk high-yield bonds bear. Convertible bonds are the proxy asset for a DIFFERENT strategy (convertible arbitrage), a common mix-up the exam tests directly."
    },
    {
      q: "During the August 2007 and July–October 2008 stress episodes, nearly every specialist hedge fund style sub-index lost money at the same time — a pattern that also appeared, though less completely, in 1994 and 1998. Which strategy was the most consistent exception across ALL of these convergence events?",
      options: [
        "Long/short equity",
        "Convertible arbitrage",
        "Short sellers",
        "Emerging markets"
      ],
      answer: 2,
      why: "Short sellers were positive (or at least spared losses) in every one of the cited events (1994, 1998, 2007, 2008) because a market-wide sell-off/liquidation is directly what a net-short strategy profits from. Managed futures was ALSO usually spared but is not listed here as an option; long/short equity, convertible arb, and emerging markets all suffered losses alongside the rest in these episodes."
    }
  ],

  sources: [
    { title: "Hedge fund — Wikipedia", url: "https://en.wikipedia.org/wiki/Hedge_fund", note: "Background on hedge fund structure, fee conventions (2-and-20), and regulatory status relative to mutual funds." },
    { title: "Long-Term Capital Management — Wikipedia", url: "https://en.wikipedia.org/wiki/Long-Term_Capital_Management", note: "Detailed account of the 1998 LTCM collapse referenced as the industry's watershed leverage event." },
    { title: "Merger Arbitrage — Investopedia", url: "https://www.investopedia.com/terms/m/mergerarbitrage.asp", note: "Plain-language explanation of deal risk and how risk arbitrageurs price pending M&A transactions." },
    { title: "Convertible Arbitrage — Investopedia", url: "https://www.investopedia.com/terms/c/convertiblearbitrage.asp", note: "Explains the long-convertible/short-stock delta-neutral construction and the liquidity-premium return source." }
  ],

  pdf: { book: 5, query: "important distinctions between hedge funds and mutual funds" }
});
