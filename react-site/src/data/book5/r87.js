export default ({
  book: 5, reading: 87,
  session: "Risk Management and Investment Management",
  title: "Risk Monitoring and Performance Measurement",
  tagline: "Three connected dimensions of risk management: planning (set expectations), budgeting (allocate capital to meet them), monitoring (catch deviations) — plus the risk management unit and performance measurement toolkit.",

  teaches: `<p>The three dimensions of risk management (planning, budgeting, monitoring) and their VaR/tracking-error link; five risk planning objectives; quantitative methods in risk budgeting; risk monitoring's role in internal controls; sources of risk consciousness; the risk management unit (RMU); the liquidity duration statistic; and the performance measurement toolkit (comparison with expectations, return attribution, Sharpe/information ratio, benchmark/peer-group regression with alpha/beta).</p>`,

  why: `<p>Risk is the "cost" of returns — the amount of risk taken ultimately drives the level of returns achieved. This reading gives you the organizational scaffolding (plan → budget → monitor, plus the RMU) that makes that cost-of-returns relationship deliberate rather than accidental.</p>`,

  intuition: `<p>Think of the three dimensions as a project management cycle applied to risk instead of a construction schedule. <strong>Planning</strong> is the design phase: before anyone allocates a dollar, the firm's most senior people decide what "success" and "failure" even mean — how much value-at-risk (VaR, the largest loss possible at a given confidence level over a given horizon — e.g. "95% confident we won't lose more than $5 million over the next 10 days") and how much tracking error (the standard deviation of excess return, i.e. portfolio return minus benchmark return) the firm is willing to tolerate; what counts as an acceptable return on risk capital (RORC); how self-insurance vs. buying protection (e.g. put options) trades off against catastrophic-loss scenarios; and which people, contracts, or funding lines are so critical that losing them threatens the whole firm. <strong>Budgeting</strong> is the construction phase: it takes that plan and turns it into actual numbers — a VaR figure assigned to each business line or asset class, with an expected return attached, so RORC can be computed line by line and in aggregate. <strong>Monitoring</strong> is the ongoing inspection: it compares what is actually happening against what was budgeted, and flags meaningful deviations before they turn into losses nobody planned for. Skip planning and budgeting becomes guesswork; skip monitoring and the first two steps are just wishful thinking on paper.</p>
  <p>Risk decomposition matters because overall tracking error alone can HIDE style drift — a value manager who hits the overall tracking-error target but has actually shifted most of the risk INTO growth investments looks fine on the aggregate number while violating the stated mandate entirely. The fix is mechanical: instead of looking at one tracking-error number for the whole portfolio, break it down ("decompose" it) by style, sector, industry, or country, and check that each slice's risk contribution matches what the mandate says it should be. A single clean aggregate number is not proof of anything except that the pluses and minuses happened to cancel out.</p>
  <p>Alpha and beta from a benchmark regression separate manager SKILL (alpha, tested for statistical significance — is the excess return distinguishable from zero, or could it just be noise?) from LEVERAGE/exposure choices (beta — how much market exposure the manager is running, i.e. over- or under-weighting the market relative to the benchmark). The regression itself is simple: you regress the portfolio's excess return (portfolio return minus the risk-free rate, or minus the benchmark) against the benchmark's excess return over many periods; the intercept is alpha, the slope is beta. Peer-group regressions run the same mechanics but against a peer universe instead of a clean benchmark, and that swap introduces two problems the benchmark doesn't have: SURVIVORSHIP BIAS (funds that performed badly enough to shut down simply vanish from the peer database, so the surviving peer group's average return is flattered) and a wide range of assets-under-management sizes among the peers, both of which reduce how comparable the regression result really is.</p>`,

  eli5: `<p>Imagine you run a household budget: first you decide (planning) how much you can afford to lose on a bad month before it's a real crisis, and what "doing well" even looks like; then you actually split your paycheck into buckets — rent, groceries, savings (budgeting) — with a target for what each bucket should return you; then at the end of the month you check your bank statement against what you planned (monitoring) to see if you overspent on takeout without noticing. An investment firm does the exact same three steps with risk instead of a paycheck — plan the acceptable loss and return goals, budget capital across strategies to hit them, and monitor actual results against the budget to catch drift before it becomes a real problem.</p>`,

  thinkLike: `<p>A risk manager reading this material treats the plan-budget-monitor cycle as a checklist for catching two failure modes, not one: too much risk (a big loss to chase returns nobody needed) and too little risk (paying for active management and getting closet-indexing in return). Both are treated as failures — the exam likes to test that "less risk" is not automatically "safer" from a governance standpoint if the mandate calls for active risk-taking.</p>
  <p>The examiner's favorite trap in this reading is swapping techniques or actors: mean-variance optimization (not scenario analysis) sets asset-class weights in risk budgeting, while scenario analysis belongs to risk planning (exploring failure sources); an RMU must have an independent reporting line, and any answer choice suggesting it reports through the desks it monitors is wrong; and peer-group alpha is systematically less trustworthy than benchmark alpha because of survivorship bias and AUM heterogeneity, not because the regression math itself differs. When you see a question describing "risk taken in unintended areas despite a good aggregate number," think style drift and risk decomposition immediately — it is one of the most re-tested single ideas in this whole study session.</p>`,

  breakdown: [
    {
      title: "The five risk planning objectives",
      points: [
        "Set expected return and volatility goals — specify acceptable VaR and tracking error for a period, and use scenario analysis to find potential sources of failure and how to respond to them.",
        "Define quantitative measures of success or failure — state concrete guidelines, e.g. an acceptable return on equity (ROE) or return on risk capital (RORC), so regulators and management can assess performance objectively.",
        "Generalize how risk capital will be used to meet objectives — define the minimum acceptable RORC for each activity funded from the risk budget, and consider the correlations between those RORCs for entity-wide diversification.",
        "Distinguish ordinary damage from serious damage — formulate specific responses to events that threaten the entity's long-term survival, even if unlikely, and weigh external insurance (e.g. buying put options) against self-insurance on a cost-benefit basis.",
        "Identify mission-critical resources and contingency plans — name key employees, financing sources, and other resources the entity depends on, and use scenario analysis (including adverse events that cluster together) to assess what happens if those resources are jeopardized."
      ]
    },
    {
      title: "Quantitative methods used in risk budgeting",
      points: [
        "Set minimum acceptable RORC and ROE levels over various time periods — checks whether the firm is being adequately compensated for the risk it is taking.",
        "Apply mean-variance optimization (or similar quantitative methods) to determine the weight assigned to each asset class.",
        "Simulate portfolio performance under the chosen weights across several time periods, then apply sensitivity analysis to see how results change as return and covariance estimates change."
      ]
    },
    {
      title: "The three sources of growing risk consciousness",
      points: [
        "Banks — lenders who fund investors care where those funds actually get invested, adding an external check on risk-taking.",
        "Boards, senior management, and plan sponsors — these groups have become more versed in risk oversight and more aware of the need to actively supervise asset management activities.",
        "Investors — end investors are more knowledgeable about their own choices; for example, defined-contribution (DC) plan beneficiaries are directly responsible for selecting their own pension investments, so they demand better risk information."
      ]
    },
    {
      title: "The RMU's objectives (what an independent risk management unit actually does)",
      points: [
        "Gather, monitor, analyze, and distribute risk data to managers, clients, and senior management — with accurate, relevant information reaching the right people at the right time.",
        "Help formulate a systematic, rigorous method for identifying and dealing with risk, and promote the firm's risk culture and best practices.",
        "Go beyond passive reporting — proactively research risk topics relevant to the firm rather than waiting to be asked.",
        "Continuously monitor risk trends and promptly flag unusual events to management before they become significant problems.",
        "Promote firm-wide discussion of risk data and issues, and build a process for how that discussion happens.",
        "Build a broader sense of risk awareness (risk culture) across the entity.",
        "Confirm authorized transactions are consistent with the guidance given to management and with client expectations.",
        "Identify and develop risk measurement and performance-attribution analytical tools.",
        "Gather risk data used in assessing both individual portfolio managers and the broader market environment.",
        "Give management the information needed to understand risk in individual portfolios and the sources of performance.",
        "Measure how consistent portfolio managers are with product objectives, management expectations, and client objectives — flagging significant deviations for correction."
      ]
    },
    {
      title: "The four-part performance measurement framework",
      points: [
        "Comparison of performance with expectations — assess managers both on producing the targeted risk profile (e.g. tracking error near target) and on their ability to earn excess returns; Goldman Sachs' green/yellow/red zone system is a concrete example of pre-defining acceptable deviation bands.",
        "Return attribution — use variance analysis to break down which securities, industries, sectors, or countries drove performance, confirming returns came from intended risk-taking rather than luck.",
        "Sharpe ratio and information ratio — risk-adjusted return measures, easy to compare across managers/sectors/countries, but weakened by insufficient data and by using realized (rather than potential) risk, which can overstate performance.",
        "Comparisons with benchmark portfolios and peer groups — regress excess returns against a benchmark (clean) or against a peer group (contaminated by survivorship bias and wide AUM variation) to separate alpha (skill) from beta (leverage/exposure)."
      ]
    }
  ],

  formulas: [
    { name: "Sharpe ratio", math: "\\text{Sharpe} = \\dfrac{R_p - R_f}{\\sigma_p}", note: "A risk-adjusted return measure vs. the risk-free benchmark.", plain: "It states how much extra return the portfolio earned above the risk-free rate, per unit of the portfolio's own total volatility.", derivation: "<p>The numerator is the portfolio's actual return \\( R_p \\) minus the risk-free rate \\( R_f \\) — this is the reward the manager earned for taking any risk at all rather than holding cash. The denominator, \\( \\sigma_p \\), is the portfolio's own total standard deviation, capturing all of its volatility (both systematic and idiosyncratic). Dividing reward by total risk gives a single number that lets you compare very differently-sized portfolios: \\[ \\text{Sharpe} = \\dfrac{R_p - R_f}{\\sigma_p} \\] A higher Sharpe ratio means the manager earned more excess return for each unit of total risk taken.</p>" },
    { name: "Information ratio", math: "\\text{IR} = \\dfrac{R_p - R_b}{\\text{TE}}", note: "A risk-adjusted return measure vs. an active benchmark; denominator is tracking error, not total SD.", plain: "It states how much excess return the manager generated over the chosen benchmark, per unit of the tracking error (active risk) taken to get there.", derivation: "<p>The numerator here is different from the Sharpe ratio's: instead of return minus the risk-free rate, it is the portfolio's return \\( R_p \\) minus the benchmark's return \\( R_b \\) — i.e. the excess return, sometimes also called alpha. The denominator is tracking error (TE), the standard deviation of that same excess return series over time, capturing only the ACTIVE risk taken relative to the benchmark rather than total portfolio volatility: \\[ \\text{IR} = \\dfrac{R_p - R_b}{\\text{TE}} \\] Because the denominator isolates active risk, the information ratio answers a narrower question than the Sharpe ratio: not \"was this a good use of risk overall\" but \"was this manager's deviation from the benchmark worth taking.\"</p>" }
  ],

  concepts: [
    {
      name: "Three dimensions of risk management, linked to VaR and tracking error",
      def: "VaR: the largest loss possible at a given confidence level over a specific period. Tracking error: SD of excess returns (portfolio return − benchmark return). Risk PLANNING creates expectations (VaR/tracking error targets); risk BUDGETING allocates capital to meet those expectations; risk MONITORING identifies deviations from budget.",
      pitfall: "Too much risk (VaR too high) means accepting large losses to chase unnecessarily high returns; too little risk means insufficient active management — both are failures, not just the high-risk case.",
      related: [],
      memory: "Plan (set the goal) → Budget (fund the goal) → Monitor (check you're on track) — three stages, one continuous process."
    },
    {
      name: "Five risk planning objectives",
      def: "(1) Set expected return/volatility goals (VaR, tracking error targets; scenario analysis for failure sources). (2) Define quantitative success/failure measures (e.g., acceptable ROE/RORC). (3) Generalize how risk capital will be used to meet objectives (minimum RORC per activity, considering correlations for diversification). (4) Distinguish ordinary vs. serious damage events (insurance/self-insurance cost-benefit for catastrophic downside). (5) Identify mission-critical resources (key employees, financing sources) and contingency plans if jeopardized.",
      pitfall: "The risk planning process requires ACTIVE input from the entity's HIGHEST level of management — not something that can be delegated entirely to risk staff.",
      related: []
    },
    {
      name: "Risk budgeting and quantitative methods",
      def: "The risk budget QUANTIFIES the risk plan — a structured process allocating risk capital with attached return expectations and their variability.",
      example: "Quantitative methods: (1) set minimum acceptable RORC/ROE levels (risk-adjusted profitability check), (2) apply mean-variance optimization to determine asset-class weights, (3) simulate portfolio performance across time periods and apply sensitivity analysis to return/covariance estimate changes.",
      pitfall: "Mean-variance optimization (not scenario analysis) is the method used to determine asset-class WEIGHTS — a commonly tested mix-up.",
      related: []
    },
    {
      name: "Risk monitoring and sources of risk consciousness",
      def: "Risk monitoring seeks/investigates SIGNIFICANT VARIANCES from budget within the internal control environment, ensuring timely detection before ROE/RORC targets are threatened.",
      example: "Three sources of growing risk consciousness: (1) banks lending funds care where they're invested, (2) boards/senior management/plan sponsors increasingly versed in risk oversight, (3) investors more knowledgeable about their own choices (e.g., DC plan beneficiaries selecting their own investments).",
      related: []
    },
    {
      name: "Risk management unit (RMU)",
      def: "Monitors portfolio risk exposure, ensures exposures are authorized and consistent with risk budgets. MUST have an INDEPENDENT reporting line to senior management (proper segregation of duties).",
      example: "Objectives: gather/monitor/analyze/distribute risk data; formulate systematic risk identification methods; proactively research relevant risk topics (not just report passively); monitor trends and flag unusual events BEFORE they become significant; promote risk-aware culture; ensure transactions match guidance/client expectations; develop risk measurement/performance attribution tools; measure manager consistency with objectives.",
      pitfall: "Also called an 'Independent Risk Oversight Unit' in some sources — same concept, same independence requirement.",
      related: [{ r: 41, label: "R41 — the three lines of defense, the same independence logic applied to op risk governance" }],
      memory: "The RMU's defining feature is INDEPENDENCE — a reporting line to senior management that bypasses the business units it oversees."
    },
    {
      name: "Confirming investment activities match expectations",
      def: "Two checks: (1) Is the manager generating forecasted tracking error consistent with the target (compared to budget via predetermined green/yellow/red-zone-style guidelines)? (2) Is risk capital allocated to the EXPECTED areas (via risk decomposition into subsections)?",
      pitfall: "STYLE DRIFT: a manager can hit the overall tracking-error target while allocating most of the risk somewhere UNINTENDED (e.g., a 'value' manager whose risk is actually concentrated in growth investments) — only risk DECOMPOSITION (not the aggregate tracking-error number alone) catches this.",
      example: "Goldman Sachs' color-zone system: green (normal, expected deviation), yellow (unusual but expected to occur with some regularity), red (truly unusual, requires immediate investigation) — predefined zones give clear, actionable expectations.",
      related: [],
      memory: "Aggregate tracking error can look perfectly on-target while risk decomposition reveals the manager is betting on something completely different than intended — that's style drift."
    },
    {
      name: "Liquidity duration statistic",
      def: "An approximation of the number of days needed to dispose of a portfolio's holdings WITHOUT significant market impact — a key input to stress testing, since a portfolio's liquidity profile can change dramatically in volatile/downturn conditions.",
      related: []
    },
    {
      name: "Performance measurement framework",
      def: "Compares actual manager results to benchmarks/peer groups, seeking to determine consistent risk-adjusted outperformance (skill, not luck) and whether returns are commensurate with risk taken.",
      example: "Four components: (1) comparison of performance with expectations (both risk-level and return-level assessment), (2) return attribution (variance analysis by security/industry/sector/country — did returns come from INTENDED risk-taking, not luck?), (3) Sharpe ratio and information ratio (both risk-adjusted measures — strengths: easy relative comparison, easy sector/country application; weaknesses: insufficient data, REALIZED (not potential) risk can overstate performance), (4) benchmark/peer-group regression.",
      related: []
    },
    {
      name: "Alpha, beta, and peer-group comparison via regression",
      def: "Regress excess returns against benchmark excess returns: alpha (tested for statistical significance) separates SKILL/LUCK; beta measures LEVERAGE used or market over/underweighting relative to the benchmark.",
      pitfall: "A peer-group regression is similar in mechanics but suffers from SURVIVORSHIP BIAS (failed peer funds disappear from the comparison universe) and a WIDE RANGE of AUM sizes among peers, both reducing comparability relative to a clean benchmark regression.",
      related: [{ r: 83, label: "R83 — alpha/beta regression mechanics, developed in full there" }, { r: 90, label: "R90 — hedge fund database survivorship bias, the same mechanism" }],
      memory: "Alpha isolates skill-vs-luck against a benchmark; the SAME regression against peers instead is contaminated by survivorship bias — dead funds don't get to vote."
    }
  ],

  connections: {
    from: [
      { r: 86, why: "Risk budgeting across managers/asset classes, developed there, is formalized here into the plan-budget-monitor cycle and the RMU's institutional role." },
      { r: 83, why: "Alpha, tracking error, information ratio — all defined there — are the core metrics this reading's performance measurement framework applies." }
    ],
    to: [
      { r: 88, why: "Portfolio performance evaluation builds out the Sharpe/information ratio and attribution themes introduced here in full depth." },
      { r: 90, why: "Survivorship bias in peer-group comparisons reappears as a central theme in hedge fund database analysis." }
    ],
    confused: [
      { what: "Risk budgeting's use of mean-variance optimization vs. scenario analysis", how: "Mean-variance optimization determines asset-class WEIGHTS; scenario analysis is used elsewhere (risk planning) to explore failure sources — don't swap the two techniques' roles." },
      { what: "Aggregate tracking error vs. risk decomposition", how: "Aggregate tracking error can hit its target while STYLE DRIFT hides underneath — only decomposing risk by subsection/category reveals whether risk is actually where it's supposed to be." },
      { what: "Alpha from benchmark regression vs. alpha from peer-group regression", how: "Benchmark regression alpha is relatively clean; peer-group regression alpha is contaminated by SURVIVORSHIP BIAS (failed funds vanish from peer databases) and AUM-size heterogeneity." }
    ]
  },

  misconceptions: [
    { wrong: "\"A manager hitting the overall tracking-error target is definitely investing consistently with the stated mandate.\"", right: "Style drift can hide beneath an on-target aggregate tracking error — a value manager could be allocating most risk to growth investments while the OVERALL number still looks fine. Only risk decomposition into subsections reveals this." },
    { wrong: "\"Scenario analysis is the primary quantitative method for determining asset-class weights in risk budgeting.\"", right: "Mean-variance optimization is the method used to determine asset-class weights; scenario analysis serves a different purpose (exploring failure sources in risk planning)." },
    { wrong: "\"A peer-group regression is just as reliable as a benchmark regression for isolating manager skill (alpha).\"", right: "Peer-group regressions suffer from SURVIVORSHIP BIAS (failed peer funds vanish from the comparison universe) and wide AUM-size variation among peers — both reduce the comparability and reliability relative to a clean benchmark regression." },
    { wrong: "\"The risk management unit (RMU) should report through the same management chain as the trading/portfolio management desks it monitors.\"", right: "The RMU requires an INDEPENDENT reporting line to senior management, precisely to ensure proper segregation of duties — reporting through the same chain as the units it monitors would undermine its oversight function." }
  ],

  highYield: [
    { stars: 4, what: "Style drift: how aggregate tracking error can mask misallocated risk, and why decomposition is necessary to catch it.", why: "A precise, frequently tested conceptual mechanism connecting risk monitoring to real manager-behavior detection." },
    { stars: 4, what: "RMU's independence requirement and its full list of objectives.", why: "A foundational governance concept, echoing the three-lines-of-defense independence theme from Book 3." },
    { stars: 3, what: "Alpha/beta via benchmark regression vs. peer-group regression's survivorship bias contamination.", why: "Connects directly to R90's hedge fund database bias discussion — a valuable synthesis point." },
    { stars: 3, what: "Five risk planning objectives and the plan→budget→monitor sequence.", why: "A clean five-item framework, good for structural recall." },
    { stars: 2, what: "Liquidity duration statistic as a stress-testing input.", why: "A compact, specific concept worth quick recall." }
  ],

  recall: [
    { q: "A value-oriented portfolio manager reports tracking error exactly at the target level for the quarter. Why might this NOT confirm the manager is investing consistently with the stated mandate?", a: "The AGGREGATE tracking error number can mask style drift — the manager could be hitting the overall target while having actually shifted the bulk of the portfolio's risk into growth investments rather than value investments. Only decomposing the tracking error into subsections (by style, sector, etc.) would reveal this misallocation; the aggregate number alone is insufficient to confirm consistency with the mandate." },
    { q: "Why must a risk management unit (RMU) have an independent reporting line to senior management rather than reporting through the trading desks it oversees?", a: "Reporting through the same chain as the units being monitored would create a conflict of interest and undermine proper segregation of duties — the RMU's core function is to verify that risk exposures are authorized and consistent with budgets, which requires independence from the very activities it's checking, similar to the three-lines-of-defense principle in operational risk governance." },
    { q: "Why is alpha derived from a peer-group regression generally considered less reliable than alpha derived from a benchmark regression?", a: "Peer-group comparisons suffer from survivorship bias — funds that performed poorly and shut down disappear from the peer database, inflating the apparent average performance of the surviving peer group and distorting the comparison. Peer groups also typically span a wide range of assets under management, further reducing comparability. A benchmark (like the S&P 500) doesn't suffer from these specific distortions." }
  ],

  hooks: [
    { title: "Plan, fund, watch", text: "Three verbs, one cycle: PLAN the goal, BUDGET (fund) the goal, MONITOR whether you're actually hitting it. Skip any one step and the other two become guesswork." },
    { title: "The value manager who isn't", text: "Style drift is the reading's cautionary tale: a manager can hit every aggregate risk number perfectly while quietly betting on something completely different than what clients signed up for — decomposition is the only way to catch it." },
    { title: "Dead funds don't vote", text: "Peer-group comparisons have a silent bias: the funds that failed and shut down aren't in the room to drag down the average — survivorship bias flatters whoever's left standing." }
  ],

  summary: `<p><strong>Three dimensions</strong>: planning (set VaR/tracking-error expectations, 5 objectives) → budgeting (quantify via mean-variance optimization, simulation, sensitivity analysis) → monitoring (catch variances). <strong>Risk consciousness sources</strong>: banks, boards/sponsors, investors. <strong>RMU</strong>: independent reporting line; gathers/monitors/analyzes risk data, promotes risk culture, ensures authorized/consistent exposures. <strong>Confirming consistency</strong>: forecasted tracking error vs. target (green/yellow/red zones), PLUS risk decomposition to catch style drift (aggregate numbers can hide misallocated risk). <strong>Liquidity duration</strong>: days to unwind without market impact — a stress-test input. <strong>Performance measurement</strong>: expectations comparison, return attribution, Sharpe/information ratio (realized-risk weakness), benchmark regression (alpha=skill, beta=leverage/exposure) vs. peer-group regression (survivorship bias, AUM heterogeneity — less reliable).</p>`,

  quiz: [
    {
      q: "A value-oriented portfolio manager reports overall tracking error exactly at the target level for the quarter. Which additional step is necessary to confirm the manager is truly investing consistently with the stated value mandate?",
      options: [
        "None — hitting the aggregate tracking-error target is sufficient confirmation",
        "Decompose the tracking error into subsections (e.g. by style or sector) to check risk is concentrated where expected",
        "Recompute the Sharpe ratio using potential rather than realized risk",
        "Switch from a benchmark regression to a peer-group regression for a second opinion"
      ],
      answer: 1,
      why: "Aggregate tracking error can mask style drift — a value manager could hit the overall target while having shifted most of the portfolio's risk into growth investments. Only decomposing risk into subsections reveals this. The 'hitting the aggregate target is sufficient' answer is the classic trap the reading is built to expose; the 'cross-check against peer-group regression' answer is backwards, since peer-group regressions are LESS reliable than benchmark regressions, not a valid cross-check."
    },
    {
      q: "Which quantitative method is used in risk budgeting to determine the weights assigned to each asset class?",
      options: [
        "Scenario analysis",
        "Mean-variance optimization",
        "Regression against a peer group",
        "The liquidity duration statistic"
      ],
      answer: 1,
      why: "Mean-variance optimization (or a similar quantitative method) sets asset-class weights in risk budgeting. Scenario analysis is used instead in risk planning, to explore potential sources of failure — a commonly tested mix-up between the two techniques' roles."
    },
    {
      q: "Why must a risk management unit (RMU) have an independent reporting line to senior management rather than reporting through the trading desks it oversees?",
      options: [
        "Independence is not actually required, only recommended as a best practice",
        "It lets the RMU set its own budget without senior management approval",
        "Reporting through the same chain as the units it monitors would undermine proper segregation of duties",
        "It allows the RMU to bypass client reporting requirements"
      ],
      answer: 2,
      why: "The RMU's core function is to check that risk exposures are authorized and consistent with budgets, which requires independence from the very activities it oversees — reporting through the desks it monitors would create a conflict of interest and defeat that segregation of duties. It is a firm requirement in the source, not merely a best practice."
    },
    {
      q: "A manager's excess returns are regressed against a peer group's excess returns instead of against a clean benchmark. What two issues specifically reduce the reliability of this regression compared to a benchmark regression?",
      options: [
        "Insufficient data and use of realized risk instead of potential risk",
        "Survivorship bias and a wide range of assets under management among the peers",
        "Non-normal return distributions and autocorrelation in returns",
        "Style drift and inadequate risk decomposition"
      ],
      answer: 1,
      why: "Peer-group regressions suffer from survivorship bias (funds that failed and shut down vanish from the peer database, flattering the surviving group's average) and from a wide range of AUM sizes among peers, both of which reduce comparability. The 'insufficient data and use of realized risk instead of potential risk' answer describes weaknesses of the Sharpe/information ratio, not the peer-group regression specifically."
    },
    {
      q: "A portfolio earns a return of 9%, versus a risk-free rate of 2% and a benchmark return of 6%. The portfolio's total standard deviation is 12% and its tracking error versus the benchmark is 4%. What is the information ratio?",
      options: ["0.583", "0.75", "1.75", "1.5"],
      answer: 1,
      why: "Information ratio = (portfolio return − benchmark return) / tracking error = (9% − 6%) / 4% = 3% / 4% = 0.75. The tempting wrong answer 0.583 comes from mistakenly using the Sharpe ratio's numerator (9% − 2% = 7%) divided by the total standard deviation of 12%, which mixes up the two ratios' distinct numerators and denominators."
    },
    {
      q: "According to the reading, which of the following is one of the five risk planning objectives?",
      options: [
        "Simulating portfolio performance across time periods using sensitivity analysis",
        "Distinguishing between events causing ordinary damage versus serious damage, including a cost-benefit choice between external insurance and self-insurance",
        "Gathering and distributing risk data to managers, clients, and senior management",
        "Regressing excess returns against a peer group to test for survivorship bias"
      ],
      answer: 1,
      why: "Distinguishing ordinary from serious/catastrophic damage events, and weighing external insurance against self-insurance, is one of the five risk PLANNING objectives. The 'simulating portfolio performance using sensitivity analysis' answer describes risk BUDGETING's quantitative methods, and the RMU-objective answer describes an RMU objective — both belong to later stages of the plan-budget-monitor cycle, not planning itself."
    }
  ],

  sources: [
    { title: "Value at risk (VaR) — overview", url: "https://en.wikipedia.org/wiki/Value_at_risk", note: "Background on the VaR concept this reading uses to define risk planning targets." },
    { title: "Tracking error", url: "https://www.investopedia.com/terms/t/trackingerror.asp", note: "Plain-language explanation of tracking error as the standard deviation of excess returns." },
    { title: "Survivorship bias", url: "https://en.wikipedia.org/wiki/Survivorship_bias", note: "The general statistical bias underlying why peer-group performance comparisons overstate average results." },
    { title: "Sharpe ratio", url: "https://www.investopedia.com/terms/s/sharperatio.asp", note: "Reference on the risk-adjusted return measure covered in this reading's formulas." }
  ],

  pdf: { book: 5, query: "Value at risk (VaR) is defined to be the" }
});
