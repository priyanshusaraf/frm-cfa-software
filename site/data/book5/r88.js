FRM.register({
  book: 5, reading: 88,
  session: "Risk Management and Investment Management",
  title: "Portfolio Performance Evaluation",
  tagline: "The full toolkit: time- vs. dollar-weighted returns, Sharpe/Treynor/Jensen's alpha/information ratio/M², statistical significance of alpha, hedge fund evaluation challenges, dynamic-risk manipulation, market timing measurement, and Sharpe's style analysis.",

  teaches: `<p>Time-weighted vs. dollar-weighted returns; Sharpe ratio, Treynor measure, Jensen's alpha, information ratio, and \\(M^{2}\\); the statistical significance test for alpha; hedge fund performance measurement challenges; performance manipulation via dynamic risk; measuring market timing (regression and call-option approaches); and Sharpe's style analysis (asset allocation vs. selection attribution).</p>`,

  why: `<p>Different performance measures answer different questions and can DISAGREE with each other. Knowing when Sharpe and Treynor diverge (a diversification signal), why dollar-weighted returns penalize bad market timing, and how a manager can game the Sharpe ratio by switching risk levels mid-evaluation — these are the practical, frequently-tested traps in performance evaluation.</p>`,

  intuition: `<p><strong>Time-weighted</strong> return isolates the MANAGER's skill by removing the effect of cash-flow timing (which the manager often doesn't control). <strong>Dollar-weighted</strong> return (IRR) gives MORE WEIGHT to periods when more money was invested — so it reflects the INVESTOR's actual experience, including their own (or the manager's) timing luck. If a manager has genuine market-timing skill (adding money right before good periods), dollar-weighted return will EXCEED time-weighted return.</p>
  <p>Sharpe (risk = total \\(\\sigma )\\) vs. Treynor (risk = \\(\\beta\\) only) DIVERGE exactly when diversification is imperfect — a poorly-diversified portfolio can rank HIGHER under Treynor (which ignores unsystematic risk) than under Sharpe (which penalizes it), and the SIZE of that ranking gap is itself a signal of how undiversified the portfolio is.</p>
  <p>The Sharpe ratio can be GAMED by dynamic risk-shifting: a manager who runs a low-risk strategy one year (Sharpe 0.333, "beats" the market's 0.3) and a high-risk strategy the next year (Sharpe again 0.333, still "beats" the market) can show a COMBINED two-year Sharpe ratio of only 0.2727 — WORSE than the market — because volatility compounds nonlinearly across regime changes. Evaluating year-by-year and combined can give opposite conclusions.</p>
  <p>Sharpe's style analysis found (Magellan Fund, 1985-89) that 97.3% of returns were explained by STYLE (asset allocation) bets, only 2.7% by SELECTION (security-picking/market-timing) bets — a landmark finding that asset allocation dominates, and that timing/selection skill is rare and often not worth its costs.</p>`,

  visual: `<div class="widget" data-widget="perfmeas"></div>`,

  formulas: [
    { name: "Sharpe ratio", math: "Sharpe = (R_P - R_F) / \\sigma_P", note: "Risk = total risk (SD). Rewards diversification implicitly." },
    { name: "Treynor measure", math: "Treynor = (R_P - R_F) / \\beta_P", note: "Risk = systematic risk (beta) only — ignores diversification." },
    { name: "Jensen's alpha", math: "\\alpha_J = R_P - [R_F + \\beta_P(R_M-R_F)]", note: "Actual return minus CAPM-required return. Direct measure — no comparison needed." },
    { name: "Information ratio", math: "IR = (R_P - R_B) / \\sigma (R_P-R_B)", note: "Surplus return over a BENCHMARK (not risk-free rate), divided by tracking error." },
    { name: "M² measure", math: "M^2 = R_{P'} - R_M,\\ \\text{where }P' = w\\,P + (1-w)\\,R_F\\text{ scaled so }\\sigma_{P'} = \\sigma_M", note: "Rescales the managed portfolio to match market volatility exactly, then compares returns directly." },
    { name: "Alpha t-statistic", math: "t = \\alpha / SE(\\alpha )", note: "Reject \\(H_{0}\\) (true alpha=0) if |t|≥~2 at 95% confidence. Small sample alpha estimates are often NOT statistically significant." },
    { name: "Market timing regression", math: "R_P-R_F = \\alpha + \\beta_P(R_M-R_F) + M_P\\times D\\times (R_M-R_F) + \\varepsilon", note: "D=1 in up markets, 0 in down markets. M_P>0 (up-market beta exceeds down-market beta) indicates successful timing — empirically often NEGATIVE." },
    { name: "Sharpe style analysis attribution", math: "\\% from asset allocation = R^{2}; \\% from selection = 1-R^{2}", note: "Asset allocation attribution + selection attribution = aggregate contribution." }
  ],

  concepts: [
    {
      name: "Dollar-weighted vs. time-weighted return",
      def: "Dollar-weighted (IRR): accounts for ALL cash inflows/outflows, weighting periods by how much money was actually invested. Time-weighted: compounds the holding-period return of each SUBPERIOD (split at each cash flow date) via geometric mean — removes the effect of cash-flow timing entirely.",
      example: "Buy 1 share $100 (t=0), buy 1 more $120 (t=1, after $2 dividend), sell both $130 each (t=2, after $2 dividend each): dollar-weighted IRR=13.86%; time-weighted=15.84% (Year 1 HPR=22%, Year 2 HPR=10%, geometric mean). The gap exists because dollar-weighting gives MORE weight to Year 2 (when more capital — $220 — was invested) which had the LOWER 10% return.",
      pitfall: "Time-weighted is the PREFERRED method for evaluating a manager's skill (not affected by cash-flow timing usually outside the manager's control). Dollar-weighted is more appropriate when the INVESTOR controls the cash flows. A manager with genuine superior MARKET TIMING ability will show dollar-weighted return EXCEEDING time-weighted return.",
      related: [],
      memory: "Time-weighted: isolates the driver's skill, ignoring when passengers got on/off. Dollar-weighted: reflects what passengers actually experienced, including boarding-time luck."
    },
    {
      name: "Sharpe ratio vs. Treynor measure",
      def: "Sharpe = \\((R_P- R_F)/\\sigma_P\\) (total risk). Treynor = \\((R_P- R_F)/\\beta_P\\) (systematic risk only).",
      pitfall: "For a WELL-diversified portfolio, total risk ≈ systematic risk, so Sharpe and Treynor rankings converge. For a POORLY-diversified portfolio, Treynor (ignoring unsystematic risk) can rank it HIGHER than Sharpe does (which penalizes the extra, undiversified risk) — the SIZE of the ranking discrepancy is itself a signal of how undiversified the portfolio is.",
      related: [],
      memory: "Sharpe punishes you for ANY risk, diversified or not. Treynor only cares about market risk — a poorly-diversified fund gets a free pass under Treynor that Sharpe won't give it."
    },
    {
      name: "Jensen's alpha",
      def: "\\(\\alpha_J\\) = R_P − \\([R_F+\\beta_P(R_M- R_F)]\\) — the actual return minus the CAPM-required return for that level of systematic risk.",
      pitfall: "A DIRECT performance measure (doesn't require comparing to other portfolios, unlike Sharpe/Treynor rankings). Like Treynor, only accounts for SYSTEMATIC risk — gives NO indication of diversification. Jensen's alpha and Treynor will generally agree in RANKING (both use beta only) — just as Sharpe and \\(M^{2}\\) will generally agree (both use total risk) — but Jensen's/Treynor can DISAGREE with \\(Sharpe/M^{2}\\) when a manager carries a large proportion of unsystematic relative to systematic risk.",
      related: [],
      memory: "Jensen's alpha and Treynor are cousins (both beta-based); Sharpe and \\(M^{2}\\) are cousins (both total-risk-based) — the two families can disagree when diversification is poor."
    },
    {
      name: "Information ratio",
      def: "IR = \\((R_P- R_B)/\\sigma (R_P- R_B)\\) — surplus return over a chosen BENCHMARK (not necessarily the risk-free rate), divided by tracking error.",
      pitfall: "It's essentially the Sharpe ratio with the benchmark swapped in for the risk-free rate — measures risk-adjusted 'active bet' performance rather than absolute risk-adjusted performance.",
      related: []
    },
    {
      name: "M² (Modigliani-squared) measure",
      def: "Rescales the managed portfolio (mixing it with the risk-free asset) to match the MARKET's standard deviation exactly, then compares the rescaled portfolio's return directly to the market's return.",
      example: "Portfolio P has higher \\(\\sigma\\) than the market; blend P with the risk-free asset (e.g., 50/50) to create P' with \\(\\sigma_P'=\\sigma_market\\); \\(M^{2}=R_P'- R_M\\). If P provides a return 5 percentage points below the market after this risk-matching, \\(M^{2}\\) = −5%, meaning P is a poor performer once risk is properly equalized.",
      pitfall: "'M-squared' is just the Modiglianis' NAME (Leah and Franco Modigliani) — there are NO squared terms in the actual calculation, a common point of confusion. \\(M^{2}\\) and Sharpe ALWAYS produce the same RANKING conclusions (both use total risk) — a discrepancy with Jensen's/Treynor signals unsystematic risk is a large factor.",
      related: [],
      memory: "\\(M^{2}\\) is named after people, not math — don't look for a squared term in the formula."
    },
    {
      name: "Statistical significance of alpha",
      def: "t = \\(\\alpha /SE(\\alpha )\\). Test \\(H_{0}\\): true alpha=0 vs. H_A: true alpha≠0. Reject \\(H_{0}\\) (conclude genuine skill) if |t|≥~2 at 95% confidence.",
      example: "Alpha=0.09%, SE=0.093% → t=0.97 < 2 → FAIL to reject \\(H_{0}\\) — no statistical evidence of skill (or lack thereof), despite the positive alpha number.",
      pitfall: "By the time you're CONFIDENT (statistically) that a manager's returns reflect genuine skill rather than luck, the manager may have already moved on — a practical limitation of using statistical inference for real-time manager evaluation.",
      related: []
    },
    {
      name: "Measuring hedge fund performance — three complications",
      def: "(1) Hedge fund risk is NOT constant over time (nonlinear risk from option-like strategies). (2) Hedge fund holdings are often illiquid (data smoothing via estimated, non-transaction-based prices). (3) Hedge fund sensitivity to traditional markets INCREASES in crises and DECREASES in market strength (correlation itself is regime-dependent).",
      pitfall: "The illiquidity-driven use of ESTIMATED (not transaction-based) prices unduly SMOOTHS reported hedge fund values, inducing SERIAL CORRELATION into any statistical analysis of the data — the same stale-pricing bias seen in Book 4's illiquid asset reading.",
      related: [{ r: 80, label: "R80 — the identical stale-pricing/serial-correlation bias in illiquid asset return reporting" }, { r: 89, label: "R89 — hedge fund strategies where this measurement problem manifests concretely" }],
      memory: "Portable alpha: a market-neutral (zero-beta) long-short hedge fund's alpha doesn't depend on broad market performance, so it can be 'ported' onto any existing portfolio without disturbing its beta exposure."
    },
    {
      name: "Performance manipulation via dynamic risk",
      def: "The Sharpe ratio works cleanly for a CONSTANT risk/return profile (passive strategy) but can be GAMED (or simply misleading) when risk/return characteristics change dynamically across the evaluation period.",
      example: "Year 1: low-risk strategy, alpha=1%, \\(\\sigma =3\\)%, Sharpe=0.333 (beats market's 0.3). Year 2: high-risk strategy, alpha=5%, \\(\\sigma =15\\)%, Sharpe=0.333 (still beats market). But evaluated over BOTH years combined: average excess return=3%, combined volatility=11%, Sharpe=0.2727 — WORSE than the market, the opposite conclusion from either single year alone.",
      pitfall: "This is a genuine, tested measurement pitfall, not a hypothetical — combining periods with genuinely different risk regimes can bias the Sharpe ratio DOWNWARD even when both individual periods showed superior risk-adjusted performance.",
      related: [],
      memory: "Two years, each individually 'beating the market' on a Sharpe basis, can combine into a WORSE-than-market two-year Sharpe ratio — the whole (combined volatility) is not simply the sum of its parts."
    },
    {
      name: "Measuring market timing ability",
      def: "Regression approach: R_P−R_F = \\(\\alpha +\\beta_P(R_M- R_F)+M_P\\times D\\times (R_M- R_F)+\\varepsilon\\), D=1 up-market/0 down-market. M_P (the difference between up-market and down-market betas) should be POSITIVE for a successful timer — empirically, M_P is often NEGATIVE, suggesting little genuine timing skill exists among fund managers on average.",
      example: "Call-option model: an investor with PERFECT market-timing foresight (100% T-bills or 100% equities, correctly chosen each period) has a return profile IDENTICAL to holding T-bills PLUS a call option on the market index (struck at the T-bill-grown value) — so the 'value' or fair fee for perfect market-timing foresight equals the PRICE of that call option.",
      pitfall: "A market timer holds HIGH beta in anticipated up-markets and LOW beta in anticipated down-markets — this creates a nonlinear (option-like) return pattern that ordinary linear regression alone would understate without the dummy-variable extension.",
      related: [],
      memory: "Perfect market timing = holding T-bills + a call option on the market. If you want to know what perfect timing is 'worth,' price that call option."
    },
    {
      name: "Sharpe's style analysis and performance attribution",
      def: "Regress portfolio returns against an EXHAUSTIVE, MUTUALLY EXCLUSIVE set of asset-class indices, with weights constrained to be NONNEGATIVE and sum to 100% (interpreted as 'effective' style allocations).",
      example: "Magellan Fund study (Jan 1985-Dec 1989): 97.3% of returns explained by STYLE/asset-allocation bets \\((R^{2})\\), only 2.7% by SELECTION bets (security selection + market timing, \\(1- R^{2})\\) — a landmark finding that asset allocation dominates fund returns, and market timing/selection skill is minimal at best.",
      pitfall: "Asset allocation attribution = 0 if the manager's effective weights match the BENCHMARK's weights (i.e., no active allocation bet). Selection attribution = 0 if the manager shows no ability to pick winners within each asset class (returns match the benchmark's asset-class returns). Asset allocation attribution + selection attribution = the aggregate contribution.",
      related: [],
      memory: "97.3% style, 2.7% selection — the single most quoted empirical finding in this reading: WHERE you invest dwarfs WHAT you pick within each category."
    }
  ],

  connections: {
    from: [
      { r: 83, why: "Alpha, information ratio, and tracking error — introduced there — get their fullest calculation and comparison treatment here." },
      { r: 87, why: "Sharpe/information ratio and benchmark/peer-group regression, previewed there, are developed fully with worked examples here." }
    ],
    to: [
      { r: 89, why: "Hedge fund performance measurement challenges here directly motivate the strategy-specific due diligence covered next." }
    ],
    confused: [
      { what: "Time-weighted vs dollar-weighted returns", how: "Time-weighted isolates manager skill (ignores cash-flow timing); dollar-weighted (IRR) reflects the investor's actual experience (weighted by how much capital was invested when) — a manager with genuine timing skill shows dollar-weighted > time-weighted." },
      { what: "Sharpe/M² family vs Treynor/Jensen's alpha family", how: "Sharpe and \\(M^{2}\\) use TOTAL risk (agree with each other); Treynor and Jensen's alpha use SYSTEMATIC risk only (agree with each other) — the two families can disagree when a portfolio carries significant unsystematic risk." },
      { what: "Single-period Sharpe ratios vs. a combined multi-period Sharpe ratio under dynamic risk", how: "Each period can individually show a Sharpe ratio beating the market, while the COMBINED multi-period Sharpe ratio (accounting for the volatility of shifting between risk regimes) can show underperformance — don't assume period-by-period conclusions generalize to the combined evaluation." }
    ]
  },

  misconceptions: [
    { wrong: "\"Time-weighted and dollar-weighted returns should always be equal or very close.\"", right: "They can diverge significantly when cash flows are timed around performance — dollar-weighted gives more weight to periods with more invested capital, so if a large contribution happens right before a weak period, dollar-weighted return will be depressed relative to time-weighted." },
    { wrong: "\"Sharpe and Treynor measures will always rank portfolios in the same order.\"", right: "They only converge for WELL-diversified portfolios. For portfolios with meaningful unsystematic risk, Treynor (ignoring that risk) can rank a portfolio much higher than Sharpe does — the discrepancy itself signals how undiversified the portfolio is." },
    { wrong: "\"\\(M^{2}\\) involves squaring some term in its calculation, hence the name.\"", right: "There are NO squared terms — 'M-squared' simply refers to the last names of its originators, Leah and Franco Modigliani." },
    { wrong: "\"If a strategy shows a superior Sharpe ratio in each individual year of a multi-year period, it must also show a superior Sharpe ratio over the combined period.\"", right: "Not necessarily — the worked example shows a strategy beating the market's Sharpe ratio in BOTH Year 1 (low-risk) and Year 2 (high-risk) individually, yet UNDERPERFORMING on a combined two-year Sharpe ratio, because combined volatility across regime changes isn't simply additive." },
    { wrong: "\"Empirical studies generally find that fund managers exhibit meaningful market-timing skill.\"", right: "The market-timing regression coefficient (M_P) is empirically often NEGATIVE across mutual fund data — researchers have concluded fund managers show little, if any, genuine market-timing ability on average." },
    { wrong: "\"Sharpe's style analysis found that security selection and market timing explain the majority of a typical fund's returns.\"", right: "The landmark Magellan Fund study found the OPPOSITE — 97.3% of returns were explained by asset-allocation/style bets, only 2.7% by selection/timing bets." }
  ],

  highYield: [
    { stars: 5, what: "Time-weighted vs. dollar-weighted return — full worked calculation and the market-timing-skill implication.", why: "A calculation-heavy, frequently tested pair with a clear conceptual payoff (dollar-weighted > time-weighted signals genuine timing skill)." },
    { stars: 5, what: "Sharpe/Treynor/Jensen's alpha/information \\(ratio/M^{2}\\) — definitions, formulas, and which 'family' (total risk vs. systematic risk) each belongs to.", why: "The core quantitative toolkit of this reading, tested via multi-fund ranking calculations." },
    { stars: 4, what: "Sharpe ratio manipulation via dynamic risk-shifting — the two-year vs. single-year worked example.", why: "A precise, memorable, frequently tested performance-manipulation mechanism." },
    { stars: 4, what: "Sharpe's style analysis: 97.3%/2.7% finding, \\(R^{2}\\) attribution, and asset-allocation vs. selection attribution formulas.", why: "The single most quoted empirical result in this reading — a guaranteed high-value fact." },
    { stars: 3, what: "Alpha's statistical significance test \\((t=\\alpha /SE(\\alpha )\\), threshold ~2) and the practical difficulty of confirming skill in real time.", why: "Connects statistical rigor to a genuine practitioner challenge." },
    { stars: 3, what: "Hedge fund performance measurement's three complications (nonlinear risk, illiquidity/smoothing, regime-dependent correlation).", why: "Sets up R89's hedge fund strategy discussion directly." }
  ],

  recall: [
    { q: "A manager contributes a large sum to a client's account right before a period of unusually poor performance, entirely due to a client-directed timing decision the manager didn't control. Which return measure will be unfairly depressed, and which measure should be used to fairly evaluate the manager?", a: "The dollar-weighted (IRR) return will be depressed, since it weights the poor-performing period more heavily due to the larger capital base invested during it. The time-weighted return removes this distortion by treating each subperiod's return equally regardless of capital size, providing a fairer measure of the manager's actual security-selection skill, independent of client-driven cash-flow timing." },
    { q: "A portfolio ranks much higher under the Treynor measure than under the Sharpe ratio. What does this discrepancy suggest about the portfolio?", a: "It suggests the portfolio is NOT well-diversified — Treynor only penalizes systematic (beta) risk, while Sharpe penalizes total risk (including unsystematic/diversifiable risk). A large ranking gap between the two indicates a meaningful amount of unsystematic risk is being carried, which Sharpe punishes but Treynor ignores entirely." },
    { q: "A manager's Sharpe ratio is 0.333 in each of two individual years (low-risk then high-risk strategy), both beating the market's 0.3. Yet the combined two-year Sharpe ratio is only 0.2727. How is this possible, and what lesson does it teach about performance evaluation?", a: "Each year in isolation showed a favorable excess-return-to-volatility ratio. But combining the two very different risk regimes into one period doesn't simply average their Sharpe ratios — the COMBINED volatility (reflecting the swing between low-risk and high-risk states) rises disproportionately relative to the combined average excess return, dragging the overall ratio below the market's. The lesson: dynamic (changing) risk levels across an evaluation period can bias the Sharpe ratio in ways that produce misleading conclusions if you only look at sub-period results or only the combined result in isolation." },
    { q: "What did Sharpe's style analysis of the Fidelity Magellan Fund (1985-1989) conclude about the sources of the fund's returns, and what practical implication does this carry?", a: "97.3% of the fund's returns were explained by style bets (asset allocation across asset classes), while only 2.7% were attributable to selection bets (individual security picking and market timing). The practical implication: long-run asset allocation decisions dominate investment outcomes, while security selection and market timing contribute little — and their benefits may not even be sufficient to cover the associated operating expenses and trading costs of pursuing them actively." }
  ],

  hooks: [
    { title: "Two kinds of 'return'", text: "Time-weighted asks 'how good is the driver?' Dollar-weighted asks 'how good was the passenger's boarding timing?' A manager with real market-timing skill shows dollar-weighted return beating time-weighted — the boarding timing itself added value." },
    { title: "Two families, one disagreement", text: "Sharpe and \\(M^{2}\\) are cousins (total risk). Treynor and Jensen's alpha are cousins (systematic risk only). When the cousins disagree on a ranking, it's because someone in the family isn't diversified." },
    { title: "The Sharpe ratio's magic trick", text: "Beat the market in Year 1. Beat the market in Year 2. Combine them, and somehow you're now LOSING to the market — dynamic risk-shifting is the Sharpe ratio's blind spot, and it's not a hypothetical, it's exactly how the formula behaves." },
    { title: "97.3% and 2.7%", text: "Sharpe's Magellan Fund finding, compressed to two numbers: almost all of a fund's return story is decided by WHERE it invests (asset allocation), barely any by WHAT it picks within each category." }
  ],

  summary: `<p><strong>Time-weighted</strong> (geometric mean of subperiod HPRs, isolates skill) vs. <strong>dollar-weighted</strong> (IRR, weights by capital invested — superior timing skill shows dollar-weighted>time-weighted). <strong>Sharpe</strong>\\(=(R_P- R_F)/\\sigma_P\\) (total risk) and <strong>\\(M^{2}\\)</strong> (rescale to market \\(\\sigma\\), compare returns) are cousins; <strong>Treynor</strong>\\(=(R_P- R_F)/\\beta_P\\) and <strong>Jensen's alpha</strong>=R_P−CAPM(R_P) (systematic risk only) are cousins — families disagree when unsystematic risk is large. <strong>Information ratio</strong>=(R_P−R_B)/tracking error. <strong>Alpha significance</strong>: \\(t=\\alpha /SE(\\alpha )\\), reject \\(H_{0}\\) if |t|≥~2. <strong>Hedge funds</strong>: nonlinear risk, illiquidity-driven smoothing/serial correlation, regime-dependent correlation complicate evaluation. <strong>Dynamic risk</strong> can bias Sharpe ratio (combined multi-period ratio can underperform even when every sub-period outperformed). <strong>Market timing</strong>: regression (M_P>0 for success, empirically often negative) or call-option-equivalence (perfect timing = T-bills + a call option, priced accordingly). <strong>Sharpe's style analysis</strong>: \\(R^{2}=\\)% from asset allocation, \\(1- R^{2}=\\)% from selection; Magellan Fund: 97.3% style, 2.7% selection.</p>`
});
