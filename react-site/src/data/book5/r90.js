export default ({
  book: 5, reading: 90,
  session: "Risk Management and Investment Management",
  title: "Performing Due Diligence on Specific Managers and Funds",
  tagline: "The checklist that catches frauds and failures before you invest — reasons past funds have failed, and the full due diligence toolkit across manager, risk, and operational dimensions.",

  teaches: `<p>Eight reasons hedge funds have failed historically; due diligence elements (manager, investment process, operations/business model); four manager-evaluation themes (strategy, ownership, track record, investment management); risk management process criteria; operational due diligence (internal controls, documents/disclosure, service providers); business model risk and fraud risk assessment; and due diligence questionnaire elements.</p>`,

  why: `<p>This reading is the practical antidote to R89's principal-agent risk-sharing asymmetry — a systematic checklist for catching problems (fraud, poor controls, excess leverage, business model fragility) BEFORE committing capital, rather than discovering them after a fund has already failed.</p>`,

  intuition: `<p>Fund failures cluster around eight recurring causes: poor investment decisions, fraud, extreme events, excess leverage, illiquidity, poor controls, insufficient questioning (groupthink/dominant-voice problems in committee decisions), and — counter-intuitively — INSUFFICIENT ATTENTION TO RETURNS (over-correcting into excessive controls/expenses that starve actual performance). The lesson: both too little AND too much risk-control rigor can kill a fund.</p>
  <p>Manager evaluation spans four themes: STRATEGY (what does the fund actually do, how has it evolved, what controls limit losses), OWNERSHIP (do the investment team members have skin in the game — the R89 alignment fix), TRACK RECORD (verified independently? staff still employed? performance vs. peers?), and INVESTMENT MANAGEMENT (interviews, reference checks across former employers/colleagues/investors, background checks via Form ADV, litigation/credit history).</p>
  <p>Business model risk and fraud risk are DISTINCT concerns: business model risk asks "can this firm survive operationally" (working capital, succession planning, revenue stability); fraud risk asks "is something being hidden" (related-party transactions, illiquid assets valued only by the manager, unreasonably high stated returns, personal trading mirroring fund positions).</p>`,

  formulas: [],

  eli5: `<p>Imagine you're about to lend your savings to a friend who says they run a small business and always pay great returns. Before you hand over a check, a sensible relative would tell you to do more than just admire the friend's nice car (the "track record"): go visit the shop (operational due diligence), ask their old business partners whether they were honest and reliable (reference and background checks), check whether anyone else audits their books or is it just the friend counting their own cash drawer (valuation independence — is a neutral bookkeeper or the friend themselves doing the tallying?), and ask what happens if the friend gets sick or the shop has a slow month (business model risk — succession planning, cash cushion). You'd also want to know if the "amazing returns" line up with a story that actually makes sense, or if it just sounds too good, with the friend quietly buying the same stocks they're managing for you on the side (fraud risk). In finance terms: due diligence is this same "trust but verify" checklist applied systematically to a hedge fund manager before an institution invests, because a great pitch and a good historical return chart are not, by themselves, evidence the fund is safe or honest.</p>`,

  thinkLike: `<p>A risk manager doing manager due diligence thinks in layers, not as a single pass/fail test: first, does the STRATEGY even make sense and is it explainable in plain language (if a manager can't clearly say what they do and why it should make money, that itself is a red flag); second, are INCENTIVES aligned (does the team have real skin in the game, or are they playing with someone else's money while collecting fees regardless of outcome — this is the R89 principal-agent problem showing up again); third, is anything independently VERIFIED, or does every important number — the valuation, the audit, the performance figure — trace back to the manager marking their own homework? The practitioner's mental habit is to always ask "who checks this, and are they independent of the person being checked?" — because fraud and business failure both hide behind unverified self-reporting.</p>
  <p>On the exam, GARP tests this reading less by asking you to recite the eight failure reasons from memory and more by giving you a SCENARIO — a fund manager valuing their own illiquid book, a firm with high fees justified by vague "alpha," a compliance manual nobody has audited — and asking you to identify which due diligence category (business model risk vs. fraud risk; documents vs. actual verification; strategy vs. track record) the red flag belongs to, or what the correct follow-up action is. Expect distractor answers that sound reasonable but violate the independence principle (e.g., "the fund manager's own valuation is fine as long as it's done regularly") or that confuse business-model sustainability questions with fraud-detection questions.</p>`,

  breakdown: [
    {
      title: "Eight reasons hedge funds have failed",
      points: [
        "Poor investment decisions — a single calculated risk gone wrong, or a chain of bad decisions (a 'domino effect').",
        "Fraud — accounting fraud (misstated book values/income), valuation fraud (misstated market values), or outright theft of fund assets.",
        "Extreme events — low-probability or unexpected market crashes and shocks the strategy wasn't built to survive.",
        "Excess leverage — leverage magnifies losses exactly as much as it magnifies gains, so a losing bet becomes fund-ending.",
        "Lack of liquidity — too many redemption requests hit at once, creating a cash squeeze the fund cannot meet.",
        "Poor controls — weak supervision lets fraud or excessive risk-taking go undetected until it's too large to absorb.",
        "Insufficient questioning — in committee decisions, a dominant voice or fear of dissent lets bad calls go unchallenged; the fix is having someone deliberately play devil's advocate early, before the committee stage.",
        "Insufficient attention to returns — the counter-intuitive one: over-correcting into excessive controls and compliance expense that starves actual investment performance, so the fund 'plays it too safe' into irrelevance or expense-driven decline."
      ]
    },
    {
      title: "Four themes of manager evaluation",
      points: [
        "Strategy — what the fund actually does: investment style, sector/security specializations, how the style has evolved, turnover and liquidity, loss-limiting mechanisms, how much quantitative modeling is used, whether short sales and derivatives are for hedging or speculation, how trades are executed, and any private-company exposure.",
        "Ownership — whether traders, portfolio managers, and analysts hold ownership interests in the firm itself, which aligns their financial interests with investors' and helps retain the people who generated the results.",
        "Track record — performance versus peers running a similar strategy, third-party (independent) verification of that performance, enough history to run trend/attribution analysis, performance specifically during market downturns, returns relative to the size of assets managed, and — critically — whether the staff who generated the past results are still employed at the firm.",
        "Investment management — structured interviews with the manager, reference checks (former employers, current/former colleagues and clients, current/former investors), and background checks (Form ADV review, litigation/criminal record checks via SEC and public databases, personal credit and bankruptcy checks, and corroboration with auditors/brokers who have worked with the manager)."
      ]
    },
    {
      title: "Risk management process evaluation criteria",
      points: [
        "Risk — systematic and unsystematic risk factors, written risk policies, existence and reporting frequency of a risk committee, the risk culture among staff day-to-day, reliability of the IT systems used to measure risk, and the existence/testing of formal risk models.",
        "Security valuation — what fraction of assets are objectively priced by the market versus subjectively priced by a broker or simulation; whether valuation is done by the (more independent) fund administrator or the (less independent) fund manager valuing their own book; and whether an override/documentation process exists.",
        "Portfolio leverage and liquidity — the sources and historical levels of leverage, and the current liquidity level and its trend, which matters directly for whether the fund can safely absorb more investor capital.",
        "Tail risk exposure — whether the return distribution shows skewness or kurtosis (fat tails), and a direct conversation with the manager about how tail risk is being mitigated.",
        "Risk reports — regular (monthly/quarterly/annual) reports, whether produced in-house or by a third party, benchmarked against comparable funds to spot unusual risk-taking.",
        "Consistency of fund terms with strategy — whether the fee structure matches peers, what high-water marks or hurdle rates apply, whether high fees are being paid for genuine skill-driven alpha (fair) versus disguised, cheaply replicable beta exposure (unfair), and any redemption limitations or blackout periods."
      ]
    },
    {
      title: "Operational due diligence: three focus areas",
      points: [
        "Internal control assessment — the qualifications and attitude of personnel (does leadership actually believe in the controls?), whether written policies exist (though these only show intention, not actual practice — an independent audit opinion on control effectiveness is the real evidence), the compliance system (code of ethics, employee trading restrictions), how counterparty risk from OTC derivatives is managed and monitored, and whether governance actually follows up on and remedies control breaches.",
        "Documents and disclosure — confirming the involvement and continued engagement of legal counsel, physically checking for post-dated document changes, cross-checking the offering memorandum against the Form ADV/subscription agreement/investment management agreement for consistency, scrutinizing unclear conflict-of-interest disclosures as a red flag, examining the scope of the manager's authority and indemnification limits, confirming an unqualified audit opinion, checking that the balance sheet and income statement are consistent with the stated strategy (e.g., a high-leverage fund should show high interest expense), examining audited footnotes for related-party details, scrutinizing incentive fees paid in loss years, and checking general partner net contributions/withdrawals.",
        "Service provider evaluation — reviewing the service providers' own internal control letters and audited financial statements, plus in-person discussions about their specific role in the fund's operations."
      ]
    },
    {
      title: "Business model risk vs. fraud risk — the assessment factors",
      points: [
        "Business model risk factors: stability of revenue and expenses; the percentage of revenue from variable incentive fees (which can vanish in a downturn); the gap between management fees and operating expenses; sufficiency of working capital/cash reserves; how often budgets are prepared; breakeven AUM/performance levels versus actual and projected figures; capacity to grow the asset base; and the existence of key-person insurance and a succession plan.",
        "Fraud risk factors: frequent related-party transactions (including a related-party broker or valuator); frequent illiquidity or concentration in assets valued only by the manager; frequent litigation as a defendant, especially fraud claims; unreasonably high stated returns; frequent personal trading by the manager mirroring the fund's own positions; and frequent shorting activity.",
        "Fraud-risk mitigation actions: check the SEC website for prior infractions, check court and bankruptcy records, inquire with service providers about their independence and competence, and perform extensive background checks — none of which fully eliminates fraud risk, only reduces it."
      ]
    },
    {
      title: "Due diligence questionnaire — the eight inquiry areas",
      points: [
        "General manager information — regulatory registration, ownership structure, key shareholders, reference checks, past performance, contact information.",
        "General fund information — fees, lockup periods, redemption policies, primary broker, fund director, administrator, compliance (auditor/legal advisor), AUM/investment capacity/historical performance, historical drawdown levels.",
        "Execution, trading, and service providers — speed and accuracy of transaction processing, and any red flags from related-party service providers.",
        "Third-party research policy — what sources of research the fund relies on, which speaks to the depth of its own investment due diligence.",
        "Compliance processes — in-house legal counsel involvement, anti-money-laundering policies and procedures.",
        "Business continuity — disaster recovery plans, insurance coverage, key-person provisions.",
        "Investment process and portfolio construction — enough detail to judge whether the fund's risk/return profile matches the investor's objectives.",
        "Risk controls and financial statements — leverage, liquidity, concentration, diversification, and market risk factors, plus audited (ideally unqualified) financial statements and unaudited interim statements for more timely information. Note: a returns attribution analysis is NOT itself a standard questionnaire item — it's a follow-on analysis built from the data the questionnaire collects."
      ]
    }
  ],

  quiz: [
    {
      q: "A fund's risk committee has tripled its compliance headcount and instituted five layers of trade approval, driving operating expenses sharply higher without any corresponding improvement in returns. Which documented reason for hedge fund failure does this best illustrate?",
      options: ["Poor investment decisions", "Excess leverage", "Insufficient attention to returns", "Insufficient questioning"],
      answer: 2,
      why: "This is 'insufficient attention to returns' — over-correcting for operational risk with excessive controls and expenses that starve actual performance. 'Insufficient questioning' is a distractor about groupthink in committee decisions, not about excessive control spending; the scenario describes too much rigor, not too little debate."
    },
    {
      q: "During due diligence you learn that the fund's own portfolio manager, rather than an independent administrator, personally values the fund's illiquid securities. What is the correct concern and preferred alternative?",
      options: [
        "No concern — as long as valuations happen on a consistent schedule, who performs them doesn't matter",
        "A concern: the fund manager valuing their own book has an obvious conflict of interest; an independent fund administrator is the more trustworthy arrangement",
        "A concern, but only if the securities are also illiquid; liquid securities valued by the manager are fine",
        "No concern — regulators require managers to value their own portfolios, so administrator valuation would actually be non-compliant"
      ],
      answer: 1,
      why: "Fund-administrator valuation is considered more independent than the fund manager valuing its own positions, which carries an obvious incentive to overstate value. The 'consistent schedule is all that matters' answer ignores the independence issue entirely; the 'regulators require self-valuation' answer inverts the actual practice (administrators, not self-valuation, are the trusted norm)."
    },
    {
      q: "Which of the following is LEAST likely to appear as a standard, explicit item on a hedge fund due diligence questionnaire?",
      options: ["Anti-money-laundering policy", "Disaster recovery and business continuity plans", "Returns attribution analysis", "Historical drawdown levels"],
      answer: 2,
      why: "Returns attribution analysis is a subsequent analysis performed using data gathered from the questionnaire (like historical performance), not itself a standard questionnaire line item. The other three are all standard questionnaire inquiries covered explicitly in the reading."
    },
    {
      q: "A hedge fund charges high performance fees and attributes its strong returns to manager 'skill.' What follow-up analysis best determines whether these high fees are fair or unfair?",
      options: [
        "A liquidity stress test of the fund's redemption terms",
        "An attribution analysis separating skill-driven alpha from replicable, systematic beta exposure",
        "A recalculation of the fund's Sharpe ratio using only the most recent quarter",
        "A comparison of the fund's AUM growth rate to its peer group"
      ],
      answer: 1,
      why: "High fees paid for genuine alpha (skill) are fair; the same fees paid for what is really just disguised beta exposure (available more cheaply elsewhere) are unfair — an attribution analysis is what distinguishes the two. The other options address liquidity, short-term performance, or asset growth, none of which speaks to the fee-fairness question."
    },
    {
      q: "You review a fund's detailed written policies and procedures manual describing strong internal controls. What should this alone tell you about the fund's actual risk management practices?",
      options: [
        "It provides strong assurance the controls are effective, since the manual is comprehensive",
        "It provides little assurance — the manual shows only the intention to have controls; an independent audit report on control effectiveness is the stronger signal",
        "It provides full assurance only if the manual has been updated within the past year",
        "It is irrelevant, since due diligence should rely solely on interviews with the manager"
      ],
      answer: 1,
      why: "Policy documents demonstrate intention, not actual practice — reading them provides little assurance controls are followed or effective. Only a proactively obtained independent audit report on control effectiveness gives real assurance. The 'assurance only if updated within the past year' answer's recency condition doesn't address whether the policies are actually followed."
    },
    {
      q: "An analyst is separating a fund's 'business model risk' from its 'fraud risk' during due diligence. Which factor belongs under business model risk rather than fraud risk?",
      options: [
        "Frequent related-party transactions with a broker",
        "Unreasonably high stated investment returns",
        "The sufficiency of working capital and existence of a succession plan",
        "Frequent personal trading by the manager mirroring fund holdings"
      ],
      answer: 2,
      why: "Business model risk asks whether the firm can operationally survive — working capital sufficiency and succession planning are classic business model risk factors. The other three options are all fraud risk red flags (hidden self-dealing or unreasonable claims), not survivability questions."
    }
  ],

  sources: [
    { title: "Hedge fund due diligence — Wikipedia", url: "https://en.wikipedia.org/wiki/Hedge_fund", note: "General background on hedge fund structures, fees, and the operational risks investors must diligence before committing capital." },
    { title: "Form ADV — U.S. Securities and Exchange Commission", url: "https://www.sec.gov/about/forms/formadv.pdf", note: "The actual regulatory filing referenced in the reading's background-check process; shows what information (fees, conflicts of interest, disciplinary history) it discloses." },
    { title: "Operational due diligence — Investopedia", url: "https://www.investopedia.com/terms/o/operational-risk.asp", note: "Accessible overview of operational risk assessment, useful context for the internal-controls and business-model-risk sections of this reading." },
    { title: "GARP — Global Association of Risk Professionals", url: "https://www.garp.org/", note: "The FRM program's home organization; useful for confirming current exam curriculum weighting on this topic." }
  ],

  pdf: { book: 5, query: "Investors should be familiar with the reasons past funds have failed" },

  concepts: [
    {
      name: "Eight reasons for past hedge fund failures",
      def: "(1) Poor investment decisions (domino effect or a single calculated risk gone wrong). (2) Fraud (accounting, valuation, theft). (3) Extreme events (low-probability/unexpected market crashes). (4) Excess leverage (magnifies losses as much as gains). (5) Lack of liquidity (redemption/withdrawal squeeze). (6) Poor controls (enables fraud/excessive risk). (7) Insufficient questioning (committee groupthink — a dominant voice or fear of raising valid concerns). (8) Insufficient attention to returns (over-correcting into excessive controls/expenses, starving actual performance).",
      pitfall: "Reason #8 is counter-intuitive — TOO MUCH risk-control rigor, not just too little, can also cause failure by generating excessive expenses without commensurate returns. A HEALTHY BALANCE between risk control and return generation is the goal, not maximum control.",
      related: [{ r: 89, label: "R89 — the risk-sharing asymmetry these failure modes often stem from" }],
      memory: "Two ways to fail: too little discipline (fraud, poor controls, excess leverage) OR too much discipline (excessive controls that starve returns) — it's a balance, not a maximization problem."
    },
    {
      name: "Due diligence elements",
      def: "Assess the manager (background, reputation, past performance — insufficient ALONE), the investment process/risk controls (prospectus/offering memorandum review, attribution analysis — was return generated by skill, luck, or factors beyond the manager's control?), and fund operations/business model (internal controls, segregation of duties, valuation process, fee structure, redemption limitations/blackout periods).",
      pitfall: "Investors must maintain an OBJECTIVE, UNBIASED mindset — don't get caught up in a manager's PAST successes, since past performance alone is insufficient due diligence.",
      related: []
    },
    {
      name: "Four manager-evaluation themes",
      def: "Strategy: investment style, current trends/specializations, style evolution, turnover/liquidity, loss-limiting mechanisms, quantitative modeling extent, short-sale/derivative usage (hedging vs speculation), trade execution process, private-company exposure. Ownership: do investment team members (traders, PMs, analysts) have OWNERSHIP INTERESTS in the firm — aligns interests, helps retain quality staff. Track record: performance vs. peers, THIRD-PARTY verification, sufficient history for trend/attribution analysis, performance DURING DOWNTURNS specifically, returns relative to asset size, whether the STAFF who generated past results are STILL EMPLOYED. Investment management: manager interviews (strategy, coping with tough periods), reference checks (former employers, current/former colleagues/clients, current/former investors), background checks (Form ADV review, litigation/criminal history via SEC/public databases, personal credit/bankruptcy reports, corroboration via auditors/brokers).",
      pitfall: "Track record verification specifically asks whether the STAFF who generated past results are STILL AT THE FIRM — a strong historical track record means little if the people responsible have since left.",
      related: [],
      memory: "Four themes: WHAT do they do (strategy), do they eat their own cooking (ownership), did they actually deliver and are the cooks still in the kitchen (track record), and who ARE they really (investment management/background checks)."
    },
    {
      name: "Risk management process evaluation criteria",
      def: "Risk (systematic + unsystematic factors, written policies/procedures, risk committee existence/reporting frequency, risk culture across employee types, IT resource reliability/consistency, risk model existence/inputs/testing). Security valuation (objective market prices vs. subjective broker/simulation-based valuation; INDEPENDENCE of valuation — fund administrator is MORE independent than the fund manager valuing its own positions; override process/documentation). Portfolio leverage and liquidity (sources and levels of leverage; current liquidity level and its trend — critical for assessing capacity to take on more capital). Tail risk exposure (skewness/kurtosis of return distribution; direct discussion with the manager about mitigation). Risk reports (regular — monthly/quarterly/annual — third-party or in-house; benchmarked against similar funds). Fund terms consistency (fee structure vs. peers; high-water mark/hurdle rate thresholds; are high fees paid for genuine ALPHA — fair — or disguised BETA — unfair; redemption limitations/blackout periods).",
      pitfall: "Fund-manager-performed valuation is LESS independent (and hence less trustworthy) than fund-ADMINISTRATOR-performed valuation — a manager valuing their own book has an obvious conflict of interest. Also: paying high fees for genuine ALPHA is fair; paying high fees for what's really just disguised BETA exposure is UNFAIR — a key distinction in assessing fee reasonableness.",
      related: [],
      memory: "Fund administrator valuing assets: independent, trustworthy. Fund manager valuing their OWN assets: a fox guarding the henhouse."
    },
    {
      name: "Operational due diligence: internal controls, documents/disclosure, service providers",
      def: "Internal control assessment: personnel qualifications/attitude (does the CEO actually believe in controls?), policies/procedures documentation (a DRAWBACK: documents show INTENTION only, not whether they're actually followed — a proactive AUDIT REPORT on control effectiveness is a strong positive signal), compliance system (code of ethics, employee trading restrictions), counterparty risk management (multiple counterparties? daily monitoring?), governance effectiveness (are control breaches actually remedied?). Documents and disclosure: confirm legal counsel's involvement/tenure, physically check documents for post-dating changes, corroborate offering memorandum terms against Form ADV/subscription agreement/investment management agreement, scrutinize disclosed conflicts of interest (unclear disclosure = red flag), examine manager's authority scope and indemnification limits, verify UNQUALIFIED audit opinion, check balance sheet/income statement CONSISTENCY with stated strategy (e.g., a high-leverage fund should show high interest expense/liabilities), scrutinize fees (especially incentive fees paid in LOSS years), check general partner net contributions/withdrawals. Service provider evaluation: examine service providers' own internal control letters and audited financials; in-person discussions on their specific role.",
      pitfall: "Reading policy/procedure DOCUMENTS alone provides LITTLE assurance they're actually followed or effective — only an independent AUDIT of control effectiveness (if available) provides real assurance. Any INCONSISTENCY between a fund's financial statements and its stated strategy (e.g., a supposedly low-leverage fund showing high interest expense) is a red flag requiring immediate follow-up.",
      related: [],
      memory: "A policy document is a promise. An audit report on the policy's effectiveness is a verification. Don't confuse the promise for the proof."
    },
    {
      name: "Business model risk vs. fraud risk",
      def: "Business model risk: can the firm operationally SURVIVE — assess revenue/expense stability, percentage of revenue from variable incentive fees (vanishes in downturns), gap between management fees and operating expenses, sufficiency of working capital/cash reserves, budget frequency, breakeven AUM/performance levels vs. actual/projected, capacity to grow the asset base, key-person insurance, succession planning. Fraud risk: is something being HIDDEN — frequent related-party transactions (including a related-party broker/valuator), frequent illiquidity/concentration in assets valued ONLY by the manager, frequent litigation as a defendant (especially fraud claims), unreasonably HIGH stated returns, frequent PERSONAL trading by the manager mirroring the fund's holdings, frequent shorting transactions.",
      pitfall: "Business model risk and fraud risk are DISTINCT concerns requiring different assessment approaches — one is about operational SUSTAINABILITY, the other about HONESTY/transparency. Mitigating fraud risk requires SEC website checks, court/bankruptcy record checks, service-provider competence/independence inquiries, and extensive background checks — due diligence never fully eliminates fraud risk, only reduces it.",
      related: [],
      memory: "Business model risk: 'can they keep the lights on?' Fraud risk: 'are they lying to me?' — two different questions needing two different investigations."
    },
    {
      name: "Due diligence questionnaire elements",
      def: "General manager info (regulatory registration, ownership structure, key shareholders, reference checks, past performance, contact info). General fund info (fees, lockup periods, redemption policies, primary broker, fund director, administrator, compliance/auditor/legal advisor, AUM/investment capacity/historical performance, historical drawdown levels). Execution/trading and service providers (transaction speed/accuracy, related-party service provider red flags). Third-party research policy. Compliance processes (in-house legal counsel involvement, anti-money-laundering policy). Disaster recovery/business continuity plans, insurance coverage, key-person provisions. Investment process/portfolio construction. Risk controls (leverage, liquidity, asset concentrations, diversification, market risk factors). Financial statements (ideally audited with an UNQUALIFIED opinion) and interim (not necessarily audited) statements for more timely assessment.",
      pitfall: "A RETURNS ATTRIBUTION ANALYSIS is generally NOT itself a standard questionnaire item — it's a SUBSEQUENT analysis performed USING information gathered FROM the questionnaire (e.g., historical performance data), not a line item on the questionnaire itself.",
      related: [{ r: 87, label: "R87 — return attribution, the analysis this questionnaire data eventually feeds" }],
      memory: "The questionnaire gathers raw materials (performance history, fee terms, drawdowns); attribution analysis is what you BUILD from those materials afterward — not itself a questionnaire item."
    }
  ],

  connections: {
    from: [
      { r: 89, why: "The risk-sharing asymmetry and incentive-fee conflicts identified there are exactly what this reading's due diligence process is designed to catch or mitigate." }
    ],
    to: [
      { r: 91, why: "Fraud prediction (Form ADV red flags) builds directly on this reading's background-check and fraud-risk-assessment framework." }
    ],
    confused: [
      { what: "Business model risk vs fraud risk", how: "Business model risk asks whether the firm can operationally SURVIVE (cash, succession, revenue stability); fraud risk asks whether something is being HIDDEN (related-party deals, self-valued illiquid assets, unreasonable returns) — distinct questions, distinct checklists." },
      { what: "Fund-administrator valuation vs fund-manager valuation", how: "Fund administrator valuation is MORE independent (a genuine check); fund manager valuing its own book is LESS independent (an obvious conflict of interest) — always prefer administrator-based valuation." },
      { what: "Reading policy documents vs. an independent audit of control effectiveness", how: "Policy documents show only the INTENTION to have good controls; an independent audit report verifies whether controls are ACTUALLY effective — documents alone are weak evidence." } ,
      { what: "High fees for alpha vs high fees for beta", how: "Paying high fees to access genuine alpha-generating skill is FAIR; paying the same high fees for what's really just disguised, hedgeable beta exposure is UNFAIR — the same fee level can be justified or not depending on what's actually being purchased." }
    ]
  },

  misconceptions: [
    { wrong: "\"A fund that has implemented extensive, rigorous controls is unlikely to fail.\"", right: "Insufficient attention to returns — over-correcting into EXCESSIVE controls and expenses that starve actual performance — is itself one of the eight documented reasons for fund failure. Both too little AND too much control rigor can be a failure mode." },
    { wrong: "\"A manager's strong historical track record is sufficient evidence to invest, regardless of current staffing.\"", right: "Track record evaluation must also confirm whether the STAFF who generated those past results are STILL employed at the firm — a great historical record means little if the people responsible have since departed." },
    { wrong: "\"It doesn't matter whether the fund manager or an independent fund administrator performs security valuations, as long as valuations happen regularly.\"", right: "WHO performs the valuation matters enormously — a fund administrator is considered MORE independent (and hence more trustworthy) than the fund manager valuing their own positions, which carries an obvious conflict of interest." },
    { wrong: "\"Reviewing a fund's written policies and procedures documents provides strong assurance that its internal controls are effective.\"", right: "These documents typically only demonstrate the INTENTION to have strong controls — reading them provides little assurance the policies are actually followed or effective. An independent AUDIT REPORT on control effectiveness (if obtained) is a much stronger signal." },
    { wrong: "\"A returns attribution analysis is a standard, explicit item on a due diligence questionnaire.\"", right: "It's generally NOT a standard questionnaire item — it's a subsequent analysis performed using data gathered from the questionnaire (like historical performance figures), not itself a line item requested on the questionnaire." }
  ],

  highYield: [
    { stars: 5, what: "Eight reasons for past hedge fund failures, especially the counter-intuitive 'insufficient attention to returns' (excessive controls) failure mode.", why: "A comprehensive, frequently tested list with a genuinely counter-intuitive inclusion." },
    { stars: 4, what: "Four manager-evaluation themes (strategy, ownership, track record, investment management) and their specific sub-questions.", why: "The core organizing framework of manager due diligence, frequently tested via scenario matching." },
    { stars: 4, what: "Risk management evaluation: valuation independence (administrator vs. manager) and fee fairness (alpha vs. disguised beta).", why: "Two precise, frequently tested conceptual distinctions with clear correct answers." },
    { stars: 3, what: "Business model risk vs. fraud risk as distinct assessment categories with distinct checklists.", why: "A clean conceptual separation, good for classification questions." },
    { stars: 3, what: "Policy documents (intention only) vs. independent audit of control effectiveness (actual verification).", why: "A precise, frequently tested distinction about the LIMITS of documentary evidence." },
    { stars: 2, what: "Due diligence questionnaire elements, especially that return attribution is NOT itself a standard item.", why: "A specific, testable exclusion from an otherwise long list." }
  ],

  recall: [
    { q: "A fund implements extensive compliance controls, hires a large risk-management staff, and imposes strict multi-layer approval processes for every trade. Why might this actually increase the fund's risk of failure rather than decrease it?", a: "This illustrates 'insufficient attention to returns' — one of the eight documented causes of hedge fund failure. Overcompensating for operational risk with excessive controls generates high expenses without necessarily generating commensurate returns, and if the fund can't generate strong enough performance to cover these costs, it can fail from an unhealthy risk-control-to-return balance, not from lack of discipline." },
    { q: "During due diligence, you learn that the fund's own portfolio manager personally values the illiquid securities in the portfolio, with no independent administrator involved. What concern does this raise, and what would be a better arrangement?", a: "This raises a significant valuation independence concern — a fund manager valuing their own positions has an obvious conflict of interest (an incentive to overstate values to boost reported performance and fees). A fund ADMINISTRATOR performing the valuation independently would be considered a much more trustworthy arrangement, since the administrator has no direct financial stake in the reported valuation." },
    { q: "A hedge fund charges high fees justified by claims of exceptional 'alpha generation.' What follow-up analysis would help determine whether these high fees are fair or unfair?", a: "An attribution analysis to determine whether the fund's excess returns are genuinely attributable to manager SKILL (alpha) or simply reflect exposure to systematic risk factors (beta) that could be replicated more cheaply elsewhere. If the high fees are compensating genuine alpha, they're fair; if the 'excess' returns are really just disguised beta exposure achievable at much lower cost through passive or factor-based strategies, the high fees are unfair." },
    { q: "You review a fund's policies and procedures manual, which describes robust risk controls in detail. Should this alone give you confidence in the fund's actual risk management practices?", a: "No — policy and procedure documents typically only demonstrate the INTENTION to have strong controls; merely reading them provides little assurance that the policies are actually being followed in practice or are effective. A much stronger signal would be an independent AUDIT REPORT specifically opining on the effectiveness of the fund's controls, if the fund has proactively obtained one." }
  ],

  hooks: [
    { title: "Two ways off the cliff", text: "Fund failure has two opposite roads: too little discipline (fraud, poor controls, reckless leverage) and too MUCH discipline (over-engineered controls that eat all the returns) — the failure list isn't just 'be more careful,' it's 'find the right balance.'" },
    { title: "The fox and the henhouse", text: "A fund manager valuing their own portfolio is the textbook fox-guarding-the-henhouse setup — always prefer the independent administrator's valuation over the manager's self-assessment." },
    { title: "A promise on paper, not a fact on the ground", text: "A beautifully written risk-control policy document is a PROMISE. Only an independent audit of whether that promise is actually kept turns it into a FACT worth trusting." }
  ],

  summary: `<p><strong>Eight failure causes</strong>: poor decisions, fraud, extreme events, excess leverage, illiquidity, poor controls, insufficient questioning (groupthink), insufficient attention to returns (over-controlled). <strong>Due diligence</strong> spans manager background, investment process/risk controls, and operations/business model — stay objective, don't over-weight past success. <strong>Four manager themes</strong>: strategy, ownership (skin in the game), track record (peer comparison, third-party verification, staff continuity), investment management (interviews, references, Form ADV/background checks). <strong>Risk management evaluation</strong>: risk culture/models, valuation independence (administrator > manager), leverage/liquidity trends, tail risk (skew/kurtosis), risk reports, fee fairness (alpha vs. disguised beta). <strong>Operational due diligence</strong>: internal controls (documents show intention only — audits verify effectiveness), documents/disclosure (Form ADV corroboration, conflict-of-interest scrutiny, financial statement consistency with strategy), service providers. <strong>Business model risk</strong> (operational survivability) vs. <strong>fraud risk</strong> (related-party transactions, self-valued illiquid assets, unreasonable returns, mirrored personal trading) are distinct assessments. <strong>Due diligence questionnaire</strong>: manager/fund general info, execution, compliance, business continuity, investment process, risk controls, financial statements — return attribution is a SUBSEQUENT analysis, not itself a questionnaire item.</p>`
});
