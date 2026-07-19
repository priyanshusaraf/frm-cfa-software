export default ({
  book: 4, reading: 72,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Liquidity Risk Reporting and Stress Testing",
  tagline: "Takes R71's framework and attaches it to specific named reports with specific cadences — the FSA-derived best practices here are a common exam target since they're concrete and listable.",

  teaches: `<p>Reporting cadence (FSA-style best practice) and named reports, including the <strong>cash flow survival report</strong> — the single most important liquidity stress report. You'll also learn who governs this reporting process (the ALCO), which specific ratios and figures each named report feeds (loans-to-deposit ratio, liquidity gap, funding concentration limits), and the worked numeric interpretation questions the exam tends to ask of each report — reading a graph or table and drawing the right liquidity conclusion from it.</p>`,

  why: `<p>A stress-testing framework (R71) is only a set of design principles — it says nothing about what actually lands on a treasury manager's desk on a Tuesday morning. This reading gives you the concrete, named artifacts a bank's treasury and asset-liability committee (ALCO) actually produce: which report, how often, what it contains, and what a red flag in that report looks like. The exam likes this material precisely because it is concrete and listable — "which report shows X" and "given this graph, what should management do" are natural multiple-choice questions, unlike the more conceptual material in R71.</p>`,

  intuition: `<p>Reporting frequency scales with how quickly the underlying risk can change: daily for market-wide cash flow/maturity mismatch (fast-moving — market conditions can shift within a day), weekly for firm-specific stress tests and the wholesale liability report (slower-moving, since a firm-specific liquidity problem usually builds over days, not hours), monthly for buffer/concentration/off-balance-sheet items (structural — the composition of a bank's liquid asset buffer or its largest depositors doesn't change overnight), and quarterly for funding and currency analysis (strategic, slow-moving — these are portfolio-level trends, not daily cash positions).</p>
  <p>Think of the whole reporting suite as a funnel that starts broad (the deposit tracker, tracking the raw size of the deposit base) and narrows toward the single number regulators and senior management care about most: can this bank survive 30 days of severe stress? Every other report (daily liquidity report, maturity gap report, concentration report, undrawn commitment report) supplies an input into that final cash flow survival report. That is why the cash flow survival report is explicitly singled out as the most important report in the set — it is the place where every other report's information gets synthesized into a single, testable answer against the Basel III 30-day survival horizon (see R60).</p>`,

  eli5: `<p>Imagine you're managing a household budget during a period where you might lose your job any month. You wouldn't just check your bank balance once a year — you'd check your day-to-day spending money daily (fast-moving), review your credit card and loan balances weekly, review your savings-account diversification (is all your money in one risky account?) monthly, and review your overall financial strategy — should you refinance, change currencies if you work abroad — only quarterly, because that kind of decision doesn't need to be revisited every day. And if you ever had to answer one question above all others — "if I lost my job today, how many days could I survive on what I have?" — that one calculation (your survival horizon) would be the report you'd check obsessively. That's exactly the cash flow survival report: it answers "how many days can this bank survive a severe cash squeeze," which is precisely the question the Basel III 30-day liquidity coverage ratio (LCR, see R60) asks, just tracked day-by-day instead of computed as a single ratio.</p>`,

  thinkLike: `<p>A treasury risk manager reading this material asks two questions of every report: (1) <em>What decision does this report exist to trigger?</em> A deposit tracker report showing the loans-to-deposit (LTD) ratio breaching its limit triggers a decision to either grow deposits or shrink the loan book. A funding concentration report showing one depositor above the ALCO's single-source limit triggers a decision to cap or actively reduce that relationship. A cash flow survival report showing a horizon under 30 days triggers activation of the contingency funding plan (R73). (2) <em>Is this number before or after mitigating actions?</em> The reading repeatedly draws this business-as-usual (BAU) vs. post-mitigation distinction — a bank that only has an 8-day survival horizon under BAU but 21–27 days after drawing on contingent funding and liquidating securities is in a materially different position than a bank whose post-mitigation number is still under 30 days, and the exam tests exactly this by giving you a graph with two lines (dashed = BAU, solid = after adjustments) and asking you to read off both horizons and compare each to the 30-day Basel III requirement.</p>
  <p>The examiner also likes to test the specific FSA carve-outs (demand deposits as one-day tenor, derivatives excluded from liquidity ratios except pay-date coupons, undrawn commitments included as an outflow) as standalone "which statement is a best practice" questions, and likes to test report identification — given a description of a report's content, name which of the seven-plus named reports it is. Treat the named-reports list as a matching exercise you need cold, and treat the cash flow survival report's BAU-vs-adjusted, weekly-vs-daily cadence as the one calculation-style fact worth memorizing precisely.</p>`,

  formulas: [
    {
      name: "Loans-to-deposit (LTD) ratio",
      math: "\\text{LTD ratio} = \\dfrac{\\text{total customer loans}}{\\text{total customer deposits}}",
      note: "The key ratio computed from the deposit tracker report; banks set a board-approved target/limit (e.g. 85%) and monitor actual vs. forecasted values against it.",
      plain: "This ratio says what fraction of a bank's deposit base has already been lent out — the higher it is, the less of the deposit base remains as a liquidity cushion, so the board sets a ceiling on it.",
      derivation: `<p>The deposit tracker report is built directly from the balance sheet: each month it records (1) total customer deposits by type (current accounts, rolling accounts, fixed-term deposits, etc.) and (2) total customer loans/assets, both for actual historical months and forecasted future months. The LTD ratio is then simply:</p>
      \\[ \\text{LTD ratio} = \\dfrac{\\text{total customer loans}}{\\text{total customer deposits}} \\]
      <p>If the board's target LTD ratio is, say, 85% and the bank is currently above that limit, the report can also be flipped around to show what would need to change to get back under the limit: holding assets (loans) constant, by how much would liabilities (deposits) need to \\(\\text{increase}\\) to bring the ratio down to the target; or, holding liabilities constant, by how much would assets (loans) need to \\(\\text{decrease}\\). Both are just algebraic rearrangements of the same ratio solved for the numerator or denominator at the target level.</p>`
    },
    {
      name: "Liquidity gap (daily liquidity report)",
      math: "\\text{liquidity gap} = \\text{cumulative cash gap} - \\text{counterbalancing capacity}",
      note: "Cumulative cash gap = cumulative cash inflows − cumulative cash outflows over a given horizon; counterbalancing capacity is the sum of all liquid securities available to be sold/pledged to cover a sudden outflow.",
      plain: "This says: take the raw mismatch between cash coming in and cash going out, then net off however much of that mismatch the bank could cover by selling or pledging its liquid securities — what's left is the true liquidity gap.",
      derivation: `<p>The daily liquidity report starts from the balance sheet and buckets every asset and liability by maturity (tenor). From that bucketing it computes two intermediate figures:</p>
      \\[ \\text{cumulative cash gap} = \\sum(\\text{cash inflows}) - \\sum(\\text{cash outflows}) \\]
      <p>and separately, the <strong>counterbalancing capacity</strong> — the sum of all marketable/liquid securities (eligible central bank collateral, government securities, non-eligible bank securities, etc.) that the bank could liquidate on short notice to cover a shortfall. The liquidity gap nets these two together:</p>
      \\[ \\text{liquidity gap} = \\text{cumulative cash gap} - \\text{counterbalancing capacity} \\]
      <p>This same cumulative-cash-flow logic, extended out to a 30-day horizon and re-expressed as "how many days until cumulative cash flow turns negative," is exactly what the cash flow survival report tracks — the daily liquidity report and the funding maturity gap (mismatch) report are the raw inputs that the cash flow survival report is built from.</p>`
    }
  ],

  concepts: [
    {
      name: "Reporting governance: ALCO and ILAS firms",
      def: "The asset-liability committee (ALCO) is the bank leadership team responsible for overseeing the bank's liquidity risk and for setting limits such as the loans-to-deposit (LTD) target and single-depositor concentration limits. Regulators (in the UK, the Financial Services Authority, FSA) mandate the frequency and content of liquidity reports specifically for firms designated as individual liquidity adequacy standards (ILAS) firms — larger, systemically material banks. Smaller and foreign-subsidiary banks are not required to follow the full ILAS reporting regime, though they may still face firm-specific reporting requirements.",
      pitfall: "The FSA's specific reporting cadence and named-report requirements apply to ILAS firms — not automatically to every bank. Smaller/foreign-subsidiary banks are explicitly carved out of the full regime, even though similar principles are recommended more broadly.",
      related: [],
      memory: "ALCO sets the limits and owns the liquidity risk; ILAS firms are who the FSA's specific reporting rules bind."
    },
    {
      name: "Reporting cadence (FSA-style best practice)",
      def: "Daily: cash flows & maturity mismatch for market-wide stress tests. Weekly: cash flows & maturity mismatch for firm-specific tests; wholesale liability. Monthly: liquidity buffer, funding concentration, off-balance-sheet. Quarterly: funding and currency analysis.",
      pitfall: "FSA treatment rules: callable/demand deposits treated as ONE-DAY tenor (though up to 50% of stable retail deposits may qualify for a longer behavioral maturity under some regulatory allowances); derivatives EXCLUDED from liquidity ratio calculations (except pay-date coupons); undrawn commitments ARE included as a cash outflow. In practice, many bank internal models go further than the FSA minimum — e.g. including derivative collateral payable/receivable under an ISDA master agreement or credit support annex (CSA), not just pay-date coupons.",
      related: [],
      memory: "Faster-moving risk (market-wide, daily) gets reported faster; slower-moving structural risk (funding/currency, quarterly) gets reported less often."
    },
    {
      name: "Deposit tracker report",
      def: "Summarizes the current and forecasted size of deposits, broken down by type (current/rolling accounts, fixed-term, etc.), alongside total customer loans, for historical and forecasted months. Produced weekly and monthly. It is the source report for computing the loans-to-deposit (LTD) ratio, which the board sets a target/limit for (a worked example in the source uses an 85% limit).",
      example: "If a bank's deposit tracker shows the LTD ratio exceeded 85% in two of the last three months but forecasted months are projected to come back within limit, management is currently out of compliance but the trend is projected to self-correct — the report also lets you compute exactly how much liabilities would need to grow (holding assets constant) or assets would need to shrink (holding liabilities constant) to hit the target immediately.",
      pitfall: "A deposit tracker report can also break deposits down by division and by tenor (e.g. retail banking deposits sitting mostly in current/rolling accounts vs. corporate/local-authority deposits sitting mostly in fixed-term deposits) — regulators will not let short-term, freely-withdrawable private banking liabilities be treated as stable, liquid funding, even if that division's deposit base is large.",
      related: [],
      memory: "Deposit tracker → feeds the LTD ratio → board sets a limit (e.g. 85%) → management is judged on actual vs. forecast vs. limit."
    },
    {
      name: "Daily liquidity report and the liquidity gap",
      def: "Built from the bank's balance sheet. Summarizes liquid assets (marketable securities, non-marketable CDs by tenor, eligible-central-bank vs. non-eligible-bank vs. government securities), liabilities by maturity, and the cumulative liquidity position. From this the report computes the cumulative cash gap (cumulative inflows minus outflows), the counterbalancing capacity (the sum of liquid securities available to be liquidated to cover a sudden shortfall), and the liquidity gap = cumulative cash gap − counterbalancing capacity.",
      related: [],
      memory: "Daily liquidity report = the balance sheet re-sliced by maturity, netted against what could be sold to plug a hole."
    },
    {
      name: "Funding maturity gap (mismatch) report",
      def: "Shows the mismatch between all assets and liabilities across different time buckets — i.e., the timing of asset cash flows and liability cash flows does not offset each other bucket by bucket. Net inflows/outflows in each bucket are adjusted by available liquid securities to compute a cumulative mismatch across the buckets. This report's underlying data is the direct input used to build the cash flow survival report.",
      related: [],
      memory: "The mismatch report is the raw material; the cash flow survival report is the finished product built from it."
    },
    {
      name: "Cash flow survival report",
      def: "Tracks the bank's ability to meet the Basel III requirement of a thirty-day survival horizon by plotting cumulative cash flow over time. It shows two lines: cash flow survival under business-as-usual (BAU) conditions, and cash flow survival after mitigating actions (e.g. liquidating securities, drawing on contingent funding sources). The horizon is read as the day count where the cumulative line crosses (or would cross) zero. In the source's own worked example, a bank's survival horizon almost doubled — from 43 days under BAU to 86 days after mitigating actions — illustrating just how much contingent actions can move this number.",
      example: "If a cash flow survival report shows the cumulative cash flow line crossing zero at day 8 under BAU and at day 27 after adjustments, the bank does NOT meet the Basel III 30-day requirement either way — being closer to 30 after mitigation is still a fail, since the requirement is a hard 30-day threshold, not a 'made meaningful progress' threshold.",
      pitfall: "The CASH FLOW SURVIVAL REPORT is explicitly named as the single most important liquidity stress report — it tracks the Basel III 30-day survival horizon directly. It is due weekly for firm-specific stress events and daily for market-wide stress events. The wholesale pricing and volume report (a different, later report) is USED BY REGULATORS to flag banks of concern.",
      related: [{ r: 60, label: "R60 — the LCR's 30-day survival horizon this report tracks" }],
      memory: "Cash flow survival report = the single most important report in this whole reading — it's the LCR's 30-day question, made concrete, with a BAU line and a post-mitigation line."
    },
    {
      name: "Funding source concentration report",
      def: "Tracked by senior Treasury and relationship managers as a key metric for deposit diversity. Reports large depositors (e.g. defined as any single depositor above a stated dollar threshold, such as $50 million, or above a percentage-of-total-liabilities threshold — UK regulators suggest treating deposits above 5% of total liabilities as 'large'). The ALCO sets a maximum single-source concentration limit (e.g. 10%).",
      example: "If the ALCO's single-source limit is 10% and one customer's deposits represent 11.1% of total liabilities, the ALCO has a live breach: it should either grow total liabilities to dilute that customer's share back under 10%, or ask the customer to withdraw enough funds to bring the concentration back into compliance — simply hoping the number self-corrects is not a compliant response to a breached limit.",
      pitfall: "Banks should not be overly dependent on intragroup funds either — concentration risk includes both single external depositors and excessive reliance on the bank's own corporate group as a funding source.",
      related: [],
      memory: "Concentration report answers: 'if this one depositor pulled out tomorrow, how much trouble are we in?'"
    },
    {
      name: "Undrawn commitment report",
      def: "Monitors the bank's exposure to off-balance-sheet products — liquidity lines, letters of credit, revolving credit facilities, and guarantees — that customers may draw on suddenly during a stress event, dramatically increasing liquidity stress. The report tracks total exposure at the head/corporate office and at subsidiaries, and is useful for trend monitoring over time; it typically also breaks totals down into detailed customer-level commitments.",
      related: [],
      memory: "Undrawn ≠ zero risk: a credit line nobody has used yet can still be drawn all at once in a crisis, so it counts as a liability-in-waiting."
    },
    {
      name: "Liability profile",
      def: "A graph or table showing each type of liability as a percentage of total liabilities — e.g. individual (retail) customers making up the largest share (a source example uses 65%), followed by large enterprise customers (15%). Used to see at a glance which funding source the bank is most dependent on.",
      related: [],
      memory: "Liability profile = a pie chart of 'who is our money actually coming from.'"
    },
    {
      name: "Wholesale pricing and volume report",
      def: "Examines a bank's funding cost by comparing its firm-specific wholesale funding yield curves against peer banks, and separately reports funding volume broken down by product type and tenor bucket. Typically run quarterly, unless regulators request it more often. Regulators use this report to identify banks whose funding costs are rising significantly above peers — a market-based early-warning signal that a bank may be an emerging area of concern.",
      pitfall: "This is the one named report in the set that is explicitly regulator-facing as an early-warning tool, not just an internal management report — a bank paying noticeably more than peers to fund itself in wholesale markets is effectively telling the market (and the regulator watching that market) that something may be wrong.",
      related: [],
      memory: "Wholesale pricing/volume report = the market's own gossip about your credit standing, formalized into a quarterly report."
    },
    {
      name: "Summary liquidity report MI (management information)",
      def: "A one-page summary prepared for senior management, typically monthly, unless the ALCO requests it more frequently during a stress period. It condenses the key metrics from the other named reports into a single page to increase visibility for senior managers who don't need — or have time for — the full underlying detail.",
      related: [],
      memory: "Everything else in this reading, compressed onto one page for the people too senior to read the rest."
    },
    {
      name: "Stress test report content and observed behavioral forecasting (OBF)",
      def: "The FSA requires large banks' stress reports to include: wholesale funding, retail, intraday/three-day/five-day cash flows, cross-currency, intragroup, off-balance-sheet, marketable assets, non-marketable assets, and funding concentration. A separate component, observed behavioral forecasting (OBF), examines the 'stickiness' of liabilities — i.e., the tendency of a given funding source NOT to run off quickly under stress — and is applied to items like corporate deposits, government time deposits, interbank time deposits, and intragroup time deposits.",
      pitfall: "'Stickiness' is a behavioral, not contractual, concept: a demand deposit is contractually withdrawable at any time, but empirically some depositor bases (e.g. long-relationship retail customers) are 'stickier' — slower to actually withdraw under stress — than others (e.g. rate-sensitive wholesale depositors), and OBF is the discipline of measuring that empirically rather than assuming the worst-case contractual maturity for every liability.",
      related: [],
      memory: "OBF asks: which liabilities will actually run for the exits under stress, and which ones will just... stay?"
    },
    {
      name: "Quarterly line-by-line stress test report",
      def: "Required quarterly by the FSA (other regulators may require more often). Shows the impact on the liquidity ratio and the estimated probability of the shock occurring, for shocks graded as light, moderate, or severe across categories including reduction in liquid assets, decrease in liabilities, FX mismatch, and combined scenarios where multiple shocks occur simultaneously.",
      related: [],
      memory: "This is the one report that assigns a PROBABILITY to each severity of shock, not just an impact — it's a scenario-probability grid, not just a scenario-impact list."
    }
  ],

  breakdown: [
    {
      title: "FSA-style reporting cadence (4 frequencies)",
      points: [
        "Daily — cash flows and maturity mismatch for market-wide stress tests: the fastest-moving risk gets the fastest reporting.",
        "Weekly — cash flows and maturity mismatch for firm-specific stress tests, plus the wholesale liability report: firm-specific problems build more slowly than market-wide ones.",
        "Monthly — liquidity buffer, funding concentration, and off-balance-sheet exposure: structural items that don't shift meaningfully day to day.",
        "Quarterly — funding and currency analysis: the slowest-moving, most strategic-level reporting."
      ]
    },
    {
      title: "FSA treatment rules for nonmaturity / off-balance-sheet items",
      points: [
        "Callable and demand deposits are treated as having one-day tenor by regulators (with up to 50% of stable retail deposits potentially allowed a longer behavioral maturity).",
        "Derivatives are excluded from liquidity ratio calculations, except that coupons receivable or payable are included on their actual pay dates.",
        "Undrawn commitment exposure is included as a cash outflow in liquidity ratio calculations — it is not ignored just because it hasn't been drawn.",
        "In practice, many bank internal models go further than these FSA minimums — e.g. including derivative collateral payable/receivable under an ISDA master agreement/CSA, not just pay-date coupons."
      ]
    },
    {
      title: "Named liquidity reports (the full benchmark list)",
      points: [
        "Deposit tracker report — current/forecasted deposit size; drives the loans-to-deposit (LTD) ratio.",
        "Daily liquidity report — liquid assets, liabilities by maturity, cumulative liquidity position, and the liquidity gap.",
        "Funding maturity gap (mismatch) report — assets vs. liabilities by time bucket; feeds the cash flow survival report.",
        "Funding source concentration report — deposit diversity; watched by senior Treasury; ALCO sets a single-source limit.",
        "Undrawn commitment report — stress-scenario draw risk on credit lines, letters of credit, revolving facilities, guarantees.",
        "Liability profile — each liability type as a percentage of total liabilities.",
        "Cash flow survival report — the single most important report; tracks the Basel III 30-day survival horizon, BAU vs. post-mitigation.",
        "Wholesale pricing and volume report — funding cost vs. peers; used by regulators to flag banks of concern.",
        "Summary liquidity report MI — one-page senior-management summary, typically monthly."
      ]
    },
    {
      title: "Quarterly stress report shock categories (light / moderate / severe)",
      points: [
        "Reduction in liquid assets — how much the liquidity ratio moves if the liquid asset buffer is cut.",
        "Decrease in liabilities (funding runoff) — how much the ratio moves if funding sources shrink.",
        "FX mismatch — how much the ratio moves under a currency-mismatch shock.",
        "Combined scenarios — multiple shocks occurring simultaneously, each shown with an estimated probability of occurrence alongside its impact."
      ]
    }
  ],

  connections: {
    from: [
      { r: 71, why: "Attaches the abstract stress-testing framework to concrete named reports and cadences." }
    ],
    to: [
      { r: 73, why: "Contingency funding planning's data/reporting component builds on this reading's reporting cadence." }
    ],
    confused: [
      { what: "Daily vs weekly vs monthly vs quarterly report content", how: "Daily/weekly reports focus on cash flows/maturity mismatch (fast-moving); monthly covers structural items (buffer, concentration, off-balance-sheet); quarterly covers strategic funding/currency analysis (slowest-moving)." },
      { what: "Funding concentration report vs. liability profile", how: "The concentration report flags individual large depositors against a limit (a compliance/breach question); the liability profile shows the overall percentage mix of liability TYPES (retail vs. enterprise vs. wholesale) — one is about single counterparties, the other about the whole funding structure." }
    ]
  },

  misconceptions: [
    { wrong: "\"Derivatives are included in liquidity ratio calculations like other balance sheet items.\"", right: "FSA treatment rules explicitly EXCLUDE derivatives from liquidity ratio calculations (except pay-date coupons) — a specific, testable carve-out." },
    { wrong: "\"Undrawn credit commitments are excluded from liquidity stress calculations since they haven't been drawn yet.\"", right: "Undrawn commitments ARE included as a cash outflow under FSA treatment rules — the potential for drawdown under stress must be accounted for, not ignored just because it hasn't happened yet." },
    { wrong: "\"A bank whose cash flow survival horizon improves from 8 days (BAU) to 27 days after mitigating actions has satisfied Basel III.\"", right: "Basel III requires a full 30-day survival horizon. 27 days after mitigation is still a shortfall — improvement toward 30 is not the same as meeting the 30-day requirement, and the exam tests this distinction directly." }
  ],

  highYield: [
    { stars: 4, what: "The cash flow survival report as the single most important liquidity stress report, tracking the 30-day Basel III horizon, shown as BAU vs. post-mitigation lines.", why: "Explicitly flagged as the signature report of this reading — directly connects to R60's LCR, and the BAU/adjusted comparison is a recurring worked-example question type." },
    { stars: 3, what: "FSA treatment rules: callable/demand deposits as one-day tenor, derivatives excluded (except pay-date coupons), undrawn commitments included.", why: "A specific, precisely testable set of treatment rules, and the source's own Module Quiz asks exactly this." },
    { stars: 3, what: "Loans-to-deposit (LTD) ratio computed from the deposit tracker report, and how to solve for the asset or liability change needed to hit a target LTD.", why: "The reading's one genuinely calculation-style formula — a natural numeric question." },
    { stars: 2, what: "Reporting cadence (daily/weekly/monthly/quarterly) and the full named-reports list, including the funding concentration report's single-source limit and the wholesale pricing/volume report's regulator-facing role.", why: "Good for matching-style recall questions across the full set of named reports." }
  ],

  recall: [
    { q: "Why does the cash flow survival report hold special significance among all the named liquidity reports?", a: "It directly tracks the Basel III 30-day survival horizon — the same underlying question the LCR (liquidity coverage ratio) answers: can the institution survive 30 days of severe stress on its available liquid assets? Because this maps so directly onto the core regulatory liquidity standard, it's considered the single most important liquidity stress report." },
    { q: "Under FSA treatment rules, how should a bank treat an undrawn $10M credit line commitment to a corporate client in its liquidity stress calculations?", a: "It should be included AS A CASH OUTFLOW — even though undrawn, FSA rules require accounting for the potential that the client draws on the commitment during stress, rather than excluding it simply because it hasn't been drawn yet." },
    { q: "A bank's deposit tracker report shows total customer deposits of $2,000M and total customer loans of $1,800M this month, against a board-set LTD limit of 85%. Is the bank within its limit, and if not, how much would deposits need to grow (holding loans constant) to bring the ratio to exactly 85%?", a: "LTD ratio = 1,800 / 2,000 = 90%, which is above the 85% limit — the bank is out of compliance. To bring the ratio to exactly 85% holding loans constant at 1,800, solve 1,800 / D = 0.85, so D = 1,800 / 0.85 ≈ $2,118M — deposits would need to grow by roughly $118M." },
    { q: "The ALCO has set a single-source deposit concentration limit of 10% of total liabilities. A depositor's balance currently represents 11.1% of total liabilities. What should the ALCO do?", a: "This is a live breach of the concentration limit. The ALCO should either take action to grow total liabilities so this depositor's share dilutes back under 10%, or work with the customer to move a portion of funds elsewhere so the concentration falls back under the 10% limit — simply monitoring without action is not an adequate response to a breached limit." }
  ],

  hooks: [
    { title: "The 30-day report that matters most", text: "Among all the named reports, the cash flow survival report is the headline act — it's the LCR's 30-day question, tracked report-by-report instead of just computed as one ratio, and shown both before and after the bank fights back with mitigating actions." },
    { title: "Every report answers one management question", text: "Deposit tracker → 'are we lending too much relative to our deposits?' Concentration report → 'what happens if our biggest depositor leaves?' Undrawn commitment report → 'what if every customer draws their credit line at once?' Wholesale pricing report → 'does the market think we're in trouble?' Learn the reports by the question each one answers, not just its name." }
  ],

  summary: `<p><strong>Governance</strong>: the ALCO owns liquidity risk; FSA-style cadence and named-report requirements bind ILAS firms specifically. <strong>Reporting cadence</strong>: daily (market-wide cash flows/mismatch) → weekly (firm-specific, wholesale liability) → monthly (buffer, concentration, off-balance-sheet) → quarterly (funding/currency). <strong>FSA treatment rules</strong>: callable/demand deposits = one-day tenor; derivatives excluded from liquidity ratios (except pay-date coupons); undrawn commitments included as outflows. <strong>Named reports</strong>: deposit tracker (→ LTD ratio), daily liquidity report (→ liquidity gap = cumulative cash gap − counterbalancing capacity), funding maturity gap report, funding concentration report (ALCO single-source limit), undrawn commitment report, liability profile, <strong>cash flow survival report</strong> (the single most important — BAU vs. post-mitigation, tracks Basel III's 30-day horizon), wholesale pricing/volume report (regulators use this to flag concern), and the one-page summary liquidity report MI. <strong>Stress reports</strong> also cover observed behavioral forecasting (liability stickiness) and a quarterly light/moderate/severe shock-probability grid.</p>`,

  quiz: [
    {
      q: "Under FSA-style best practices, how should callable or demand deposits with no stated maturity date be treated for liquidity reporting purposes?",
      options: ["As having a one-week tenor", "As having a one-day tenor", "As having a one-month tenor", "As permanently stable, non-maturing funding"],
      answer: 1,
      why: "The FSA recommends treating callable/demand deposits as one-day tenor, the most conservative assumption, since they can contractually be withdrawn immediately. Treating them as stable (the last option) or giving them a multi-day/week/month tenor ignores their contractual withdrawal risk — though limited behavioral allowances exist for up to 50% of stable retail deposits."
    },
    {
      q: "Which of the following named liquidity reports is explicitly identified as the single most important liquidity stress report?",
      options: ["The funding source concentration report", "The wholesale pricing and volume report", "The deposit tracker report", "The cash flow survival report"],
      answer: 3,
      why: "The cash flow survival report tracks the bank's ability to meet the Basel III 30-day survival horizon directly, which is why it is singled out as the most important. The concentration and deposit tracker reports are important inputs but address narrower questions (single-depositor risk, LTD ratio); the wholesale pricing report is regulator-facing but addresses funding cost, not survival horizon."
    },
    {
      q: "A bank's cash flow survival report shows the cumulative cash flow line crossing zero at day 8 under business-as-usual (BAU) conditions and at day 27 after mitigating actions (liquidating securities, drawing contingent funding). Does this bank meet the Basel III requirement?",
      options: ["Yes, because the horizon nearly tripled after mitigating actions", "Yes, because 27 days is close enough to the 30-day standard", "No — even after mitigation, the survival horizon of 27 days is still short of the required 30-day threshold", "No, because BAU and post-mitigation horizons must both individually exceed 30 days"],
      answer: 2,
      why: "Basel III requires a full 30-day survival horizon; a post-mitigation horizon of 27 days is still below that threshold, so the bank does not meet the requirement. The improvement from 8 to 27 days is real progress but not compliance — 'close' or 'nearly tripled' are not the standard. The fourth option overstates the rule: only the relevant (typically post-mitigation) figure needs to clear 30 days, not both lines independently."
    },
    {
      q: "How does the FSA recommend treating derivatives in liquidity ratio calculations?",
      options: ["Fully included at notional value", "Fully excluded, with no exceptions", "Excluded, except that coupons receivable or payable are included on their pay dates", "Included only if collateralized under an ISDA master agreement"],
      answer: 2,
      why: "FSA best practice excludes derivatives from liquidity ratio calculations, except that pay-date coupons are included. The ISDA/CSA collateral treatment (the fourth option) is how many bank INTERNAL models go beyond the FSA minimum — it is not itself the FSA's stated rule. 'Fully excluded, no exceptions' misses the coupon carve-out, and 'fully included at notional' contradicts the exclusion entirely."
    },
    {
      q: "A bank's deposit tracker report shows total customer loans of $1,700M and total customer deposits of $2,000M. The board's target loans-to-deposit (LTD) limit is 85%. What is the bank's current LTD ratio, and is it in compliance?",
      options: ["117.6%, out of compliance", "85%, exactly at the limit", "82.35%, within compliance", "70%, well within compliance"],
      answer: 2,
      why: "LTD ratio = total loans / total deposits = 1,700 / 2,000 = 0.8235, or 82.35%, which is below the 85% limit and therefore within compliance. Inverting the ratio (loans/deposits vs. deposits/loans) gives the tempting-but-wrong 117.6%; miscalculating or rounding carelessly can produce the other distractors."
    },
    {
      q: "The ALCO has set a single-source funding concentration limit of 10% of total liabilities. The concentration report shows one depositor at 11.1% of total liabilities. What is the correct interpretation and appropriate response?",
      options: ["No action needed — a small breach like this is within normal tolerance", "This is a compliance breach; the ALCO should grow total liabilities or reduce the exposure to bring the share back under 10%", "This report is informational only and doesn't require ALCO action", "The bank should immediately close the account since any breach requires termination of the relationship"],
      answer: 1,
      why: "The funding source concentration report exists precisely so the ALCO can catch and act on breaches like this — a depositor above the set limit represents excess reliance on a single funding source. The correct response is to dilute the exposure (grow total liabilities) or actively reduce it (have the customer move funds), not to ignore a 'small' breach, treat the report as purely informational, or jump straight to terminating the relationship, which is a more extreme response than the source material describes."
    }
  ],

  sources: [
    { title: "Basel III: Liquidity Coverage Ratio and liquidity risk monitoring tools", url: "https://www.bis.org/publ/bcbs238.htm", note: "The BIS standard defining the Basel III 30-day survival horizon that the cash flow survival report is built to track." },
    { title: "Asset/liability management (ALM) — Wikipedia", url: "https://en.wikipedia.org/wiki/Asset/liability_management", note: "Background on the ALCO function and the broader asset-liability management context this reporting suite sits within." },
    { title: "Liquidity risk — Investopedia", url: "https://www.investopedia.com/terms/l/liquidityrisk.asp", note: "A plain-language refresher on liquidity risk concepts, useful context for interpreting these named reports." },
    { title: "Federal Reserve: Liquidity risk management guidance", url: "https://www.federalreserve.gov/supervisionreg/topics/liquidity_risk.htm", note: "A US regulator's perspective on liquidity risk reporting and stress testing expectations, complementary to the FSA (UK) framework this reading centers on." }
  ],

  pdf: { book: 4, query: "This reading emphasizes best practices in reporting bank liquidity" }
});
