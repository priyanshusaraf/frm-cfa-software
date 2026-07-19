export default ({
  book: 4, reading: 71,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Liquidity Stress Testing",
  tagline: "Builds the formal liquidity stress-testing framework: four funding-liquidity categories, one core sufficiency formula, and six design dimensions that determine whether a stress test is useful or just theater.",

  teaches: `<p>This reading gives you the vocabulary and machinery a bank actually uses to answer one question: <strong>"If things go badly, do we have enough cash to survive?"</strong> It does this in two layers. First, it splits every dollar of a bank's liquidity into four categories — <strong>operational, contingent, strategic, and restricted</strong> — because not all "liquid" money is available for the same purpose, and confusing them is exactly how a firm overstates its own resilience. Second, it introduces the <strong>stressed liquidity asset buffer</strong>, a simple sufficiency check (start with what you hold, subtract what a crisis would force out the door, add what would still come in) and then walks through the <strong>six design dimensions</strong> — scope, scenario development, assumptions, outputs, governance, and integration with other models — that separate a stress test that genuinely protects a bank from one that is just a compliance exercise on a slide deck.</p>`,

  why: `<p>A stress test's usefulness depends entirely on its DESIGN — scope, scenario development, assumptions, outputs, governance, and integration with other models. Get any of these six wrong and the test becomes theater rather than genuine risk management. Concretely: if you only test the consolidated firm (wrong scope) you miss that cash is trapped in a foreign subsidiary that can't legally send it home; if your scenarios are generic (wrong scenario development) you miss the idiosyncratic risk that's actually most likely to sink you; if your deposit-outflow assumption is a guess instead of behavioral data (wrong assumptions) the whole exercise is "garbage in, garbage out"; if governance is fuzzy about who owns the scenarios versus who challenges them, no one is accountable when the model is wrong — and regulators (and the exam) test each of these failure points individually because each one has, in practice, caused a real institution to be blindsided.</p>`,

  intuition: `<p>Reverse stress tests flip the usual logic: instead of picking a scenario and forecasting its impact, you assume FAILURE first and work backward to find the critical drivers that would cause it — a useful supplement to forward-looking hypotheticals, since it can reveal vulnerabilities a forward-looking scenario might never think to test. The catch, which the source is explicit about, is that this is genuinely hard to do well: many different factors interact to cause a failure, and it would take an extraordinary combination of assumptions to make a genuinely liquid firm fail — so a reverse stress test that "succeeds" too easily is usually a sign the underlying assumptions were unrealistic, not that the firm is fragile.</p>
  <p>"Garbage in, garbage out" is the reading's warning about assumptions: the whole stress test is only as good as its key assumptions (investment portfolio haircuts, deposit outflows, unsecured wholesale funding, collateral requirements, contingent liabilities, business reduction) — a technically sophisticated model built on unrealistic assumptions produces a false sense of security. Walk through the buffer formula with real numbers to see why the design details matter: Firm A holds $1 billion in highly liquid assets (the normal buffer). A stress scenario hits: retail depositors pull $150 million (a stressed outflow), the firm faces $60 million in margin and collateral calls on its derivatives book as collateral values fall and volatility rises (another stressed outflow) — but retail customers also repay $80 million of loans on schedule (a stressed inflow), and the firm draws $90 million against its $100 million committed liquidity facility (another stressed inflow, since drawing a facility brings cash in even though it burns down available capacity). Stressed buffer = $1,000M − $150M − $60M + $80M + $90M = <strong>$960 million</strong>. Notice the buffer stayed positive — but only because $170M of inflows partially offset $210M of outflows; if the deposit run had been $250M instead of $150M, the same firm would have shown a shortfall. That sensitivity to a single assumption is exactly why "garbage in, garbage out" matters: change one input and the sufficiency verdict flips.</p>`,

  eli5: `<p>Think about your own bank accounts. You keep a checking account for rent and groceries — money you touch every week (that's <strong>operational</strong> liquidity). You also keep an emergency fund in a separate savings account that you only touch if you lose your job or have a medical bill — you deliberately don't spend it on anything else, so it's ready when you need it (that's <strong>contingent</strong> liquidity). You've also been saving up for a house down payment or a big trip — money that's liquid and technically grabbable in an emergency, but its normal purpose is an opportunity, not a crisis (that's <strong>strategic</strong> liquidity). And you might have money sitting in an escrow account for your mortgage closing, or a security deposit held by your landlord — it's cash, but it's legally locked to one specific future use and you can't spend it on this month's groceries even if you desperately wanted to (that's <strong>restricted</strong> liquidity). A liquidity stress test is you asking: "if I suddenly lost my job (an outflow) AND my car broke down (another outflow), but I got a tax refund and a friend paid me back (inflows), would my emergency fund — not my house-down-payment money, not my escrow money — still cover me?" That's precisely the stressed liquidity asset buffer calculation, just done at bank scale: the four categories map onto operational/contingent/strategic/restricted liquidity, and the stress test maps onto the buffer sufficiency formula.</p>`,

  thinkLike: `<p>A liquidity risk manager designing this test doesn't start by asking "will we survive?" — that question is unanswerable in isolation. They start by asking, dimension by dimension: <em>whom</em> am I testing (just the consolidated firm, or does a trapped foreign subsidiary need its own test because of transfer restrictions)? <em>What</em> combination of systemic and idiosyncratic shocks is realistic for us specifically, not just generically? <em>What</em> am I assuming about deposit behavior, and is that assumption backed by actual historical or market data, or is it a guess dressed up in a spreadsheet? <em>What</em> do the outputs need to show a board member in five minutes versus a regulator in a detailed report? <em>Who</em> owns the scenario (treasury), who independently challenges it (risk management, second line), and who checks the checkers (internal audit, third line, plus a separate model risk management function)? And finally, does this test's numbers reconcile with the capital stress test and the funds transfer pricing framework, or are different parts of the bank quietly assuming different worlds?</p>
  <p>The exam tests this reading in two very different registers. One is pure calculation: give you a normal buffer, a list of outflows and inflows, and ask you to compute the stressed buffer correctly — the trap is usually miscategorizing an item (is a facility draw an inflow or does it reduce future capacity? it's booked as an inflow now, per the source, even though it also uses up the facility). The other register is classification and scenario matching: describe a pool of money with a specific fixed purpose (an escrow account, posted collateral, funds committed to an acquisition) and ask which of the four liquidity categories it belongs to — the perennial trap is conflating "liquid" with "available," which is exactly the restricted-vs-contingent distinction this reading is built around.</p>`,

  formulas: [
    {
      name: "Stressed liquidity asset buffer",
      math: "\\text{stressed buffer} = \\text{(normal) liquidity asset buffer} - \\text{stressed cash outflows} + \\text{stressed cash inflows}",
      note: "Sufficiency check: does the buffer stay positive under stress?",
      plain: "This formula says a bank's usable liquidity cushion under stress equals what it currently holds in high-quality liquid assets, minus whatever cash a crisis would force out the door (deposit runs, collateral calls, lost funding, early debt repayment), plus whatever cash would still legitimately flow in (maturing investments, loan repayments, facility draws) even during that same crisis.",
      derivation: `<p>Take the Firm A example from the source, worked step by step:</p>
      <p>Start with the normal liquidity asset buffer — the pool of very high-quality, easily valued, actively traded assets the firm currently holds for exactly this purpose:</p>
      \\[ \\text{normal buffer} = \\$1{,}000\\,\\text{million} \\]
      <p>Subtract the stressed outflows. Here there are two: retail depositors withdrawing funds, and derivatives counterparties making margin/collateral calls as collateral values fall and volatility rises:</p>
      \\[ \\text{stressed outflows} = \\$150\\,\\text{million (deposit withdrawal)} + \\$60\\,\\text{million (collateral calls)} = \\$210\\,\\text{million} \\]
      <p>Add the stressed inflows. Here there are also two: scheduled loan repayments still coming in from retail customers, and cash drawn against the firm's committed liquidity facility (drawing the facility brings cash onto the balance sheet right now, even though it simultaneously uses up available future capacity):</p>
      \\[ \\text{stressed inflows} = \\$80\\,\\text{million (loan repayments)} + \\$90\\,\\text{million (facility draw)} = \\$170\\,\\text{million} \\]
      <p>Combine:</p>
      \\[ \\text{stressed buffer} = \\$1{,}000\\text{M} - \\$210\\text{M} + \\$170\\text{M} = \\$960\\,\\text{million} = \\$0.96\\,\\text{billion} \\]
      <p>The buffer survives — but the margin is thin (only $960M against a $1B starting point after $380M of gross cash movement). That thinness is the point: a single worse assumption, say a $250M deposit run instead of $150M, would push the buffer negative and flip the sufficiency verdict entirely.</p>`
    }
  ],

  concepts: [
    {
      name: "Four categories of funding liquidity",
      def: "Operational: funds required to cover the firm's regular day-to-day operational needs (e.g., clearing payment transactions); cannot be used for nonoperational liabilities. Contingent: (very high quality) liquid assets and credit facilities meant to satisfy general liabilities in stressed situations — estimated via the liquid asset buffer, and the main target of a liquidity stress test. Strategic: funds maintained to satisfy potential investment opportunities such as fixed asset purchases or mergers/acquisitions; not specifically meant for stress, though the most liquid portion could be reallocated to contingent needs if required. Restricted: liquid assets with stated, predetermined operational uses (such as collateralization) — they cannot be used to satisfy general operational needs.",
      intuition: "The four categories all describe money that is technically 'liquid' — but liquid does not mean available. The categorization answers a narrower question: available for WHAT, and WHEN?",
      example: "A bank posts $40M of government bonds as collateral to a derivatives counterparty under a credit support annex — that $40M is liquid (government bonds trade in deep markets) but it is restricted: it's contractually pledged to that counterparty and cannot be redeployed to cover a deposit run. Compare that to $40M of the same government bonds sitting unencumbered in the bank's liquidity buffer specifically reserved for a stress event — that portion is contingent liquidity.",
      counter: "It's tempting to think 'strategic' and 'contingent' are the same because both are held in reserve. They aren't: contingent liquidity's very high-quality assets are held specifically to absorb stress and are the direct input to the stressed buffer formula; strategic liquidity is held for opportunities (an acquisition, a fixed-asset purchase) and is only a secondary, partial fallback for stress — not the primary buffer.",
      pitfall: "'Restricted' liquid assets are NOT freely available despite technically being liquid — a subtle but testable distinction from contingent/strategic buffers.",
      related: [],
      memory: "Operational: day-to-day. Contingent: for stress. Strategic: for opportunities. Restricted: liquid but locked."
    },
    {
      name: "Stressed liquidity asset buffer",
      def: "Stressed buffer = normal buffer − stressed cash outflows + stressed cash inflows. The normal buffer must be assets that can withstand the most extreme stressed situations: little or no credit/market risk, easy to value, and actively traded in a deep market with many participants. Stressed outflows may require early settlement of liabilities or the inability to roll over debt — common examples are retail deposit withdrawals, reduction/loss of unsecured and secured funding, early settlement of derivatives transactions, and early debt repayment. Stressed inflows offset outflows and may themselves be reduced by market conditions — common examples are maturing investments, customer debt repayments, and draws on the firm's available liquidity sources.",
      intuition: "The formula is a net cash-flow survival check, not a balance-sheet snapshot: it deliberately nets the crisis-driven cash leaving against the crisis-era cash still arriving, because a firm that only counts outflows would understate its true resilience, and one that only counts the starting buffer without stressing it would overstate resilience.",
      example: "Firm A holds $1B in highly liquid assets. Under stress: $150M in retail deposit outflows, $60M in margin/collateral calls (outflows); $80M in retail loan repayments, $90M drawn on its $100M liquidity facility (inflows). Stressed buffer = $1,000M − $150M − $60M + $80M + $90M = $960M — positive, so the buffer is sufficient under this particular scenario.",
      counter: "Don't assume a positive stressed buffer means the firm is safe in general — it only means the buffer is sufficient under THIS scenario, with THESE assumptions. Change the deposit-outflow assumption and the answer can flip; that's the entire point of testing multiple scenarios (historical, hypothetical, reverse) rather than relying on one.",
      pitfall: "A facility draw is booked as a stressed INFLOW (cash comes in now) even though it simultaneously consumes the firm's remaining undrawn capacity — don't mistake it for a reduction in outflows.",
      related: []
    },
    {
      name: "Six stress test design dimensions",
      def: "Scope: consolidated firm-wide as the starting point, but also parent-only, subsidiary-level, business-line, or business-unit tests — complicated by liquidity transfer restrictions (liquidity may be legally trapped in a specific entity, e.g. a foreign subsidiary, and unable to move freely to the parent) and by multi-jurisdiction regulatory regimes that may require separate tests. Scenario development: establish a benchmark funding/liquidity level first; historical (real but few examples, and the past may not predict the future) vs. hypothetical (forward-looking, using best available information, distinguishing systemic-only, idiosyncratic-only, and combined shocks, at varying severities); each scenario should specify overall stress level, state of secured/unsecured funding markets, haircut changes by collateral type, sale-price impact on buffer assets, credit downgrade occurrence, deposit-withdrawal acceleration assumptions, derivatives margin/collateral impact of rating changes, drawdowns on unfunded facilities, and debt calls/buybacks; reverse stress tests assume failure and work backward. Assumptions: 'garbage in, garbage out' — key assumption areas are investment portfolio haircuts, deposit outflows, unsecured wholesale funding, collateral requirements, other contingent liabilities, business reduction; basic guideline is to build assumptions from historical/market data wherever possible, segment behaviorally down to the account level, and rank/score risk levels into assumption matrices that can be updated per scenario. Outputs: stress testing assumptions, current liquidity position metrics (tactical ~30 days vs. structural ~12 months survival horizon), future liquidity position metrics (available liquidity, wholesale funding dependence, funding concentration, timing of required transactions like capital infusions), capital/performance metrics (long-term viability, the liquid-vs-yield trade-off on required regulatory capital) — done at least quarterly. Governance: ALCO (owns the stress testing policy, scenarios, and risk limits), treasury (1st line — runs the process, suggests scenarios, analyzes balance-sheet liquidity, reports results), risk management (2nd line — independently challenges scenarios/assumptions, confirms regulatory consistency, approves stress-based limits, communicates the liquidity risk profile upward), internal audit (3rd line — checks the process and controls), model risk management (validates the model itself against the firm's model risk policy). Integration with other models: capital stress testing (liquidity tests must account for capital injections between parent and subsidiaries), asset-liability management (falling rates raise the value of bond-like liabilities; rising/steepening rates create disintermediation risk as depositors chase yield elsewhere), and funds transfer pricing (FTP must price the true cost of the cash-holding requirements the liquidity stress test generates).",
      intuition: "The six dimensions form a pipeline, not an independent checklist: scope decides WHO gets tested, scenario development decides WHAT happens to them, assumptions decide HOW BIG each shock is, outputs decide WHAT gets reported, governance decides WHO is accountable for each step, and integration decides whether the answer is consistent with what the rest of the bank's risk models are saying. A weakness in any single link — say, assumptions that ignore behavioral data — breaks the credibility of everything downstream, no matter how sophisticated the scope or outputs are.",
      example: "A bank with a foreign subsidiary discovers, when designing scope, that local regulation prevents that subsidiary's cash from being upstreamed to the parent during a crisis — so a single consolidated test would overstate the group's real resilience, and a separate subsidiary-level test is required specifically because of that transfer restriction.",
      pitfall: "Reverse stress tests are a USEFUL SUPPLEMENT to forward-looking hypotheticals, not a replacement — know both directions of stress test design.",
      related: [{ r: 55, label: "R55 — reverse testing as one of ERM's three stress-testing approaches" }],
      memory: "Six dimensions: who's tested (scope), what happens (scenario), what's assumed (assumptions), what comes out (outputs), who's accountable (governance), and does it match other models (integration)."
    }
  ],

  connections: {
    from: [
      { r: 69, why: "Liquidity stress testing shocks exactly the cash-flow term structures monitored there under adverse scenarios." },
      { r: 55, why: "Reverse stress testing, previewed generally there, gets applied specifically to liquidity here." }
    ],
    to: [
      { r: 72, why: "This reading's stress framework gets attached to specific named reports and cadences." },
      { r: 73, why: "The contingency funding plan's scenarios must be consistent with this reading's stress test scenarios." }
    ],
    confused: [
      { what: "Contingent vs restricted liquid assets", how: "Contingent assets are HELD for stress scenarios (available when needed); restricted assets have predetermined, fixed uses and are NOT freely available despite being liquid." },
      { what: "Historical vs hypothetical scenarios", how: "Historical: based on real past events (fewer examples available). Hypothetical: forward-looking, using best available information — not tied to a specific past event." }
    ]
  },

  misconceptions: [
    { wrong: "\"Restricted liquid assets can be freely used to cover any funding shortfall, since they are liquid.\"", right: "Restricted liquid assets have PREDETERMINED, FIXED operational uses (e.g., posted collateral) and are NOT freely available for general funding needs, despite technically being liquid." },
    { wrong: "\"Reverse stress tests replace the need for forward-looking hypothetical scenarios.\"", right: "Reverse stress tests are a USEFUL SUPPLEMENT to forward-looking hypotheticals, not a replacement — both approaches serve complementary purposes in a comprehensive stress-testing framework." },
    { wrong: "\"Strategic liquidity and contingent liquidity are effectively the same thing since both are 'reserve' funds.\"", right: "Contingent liquidity is the very high-quality asset/facility pool specifically dedicated to absorbing stress and is what the buffer formula measures; strategic liquidity is set aside for investment opportunities (acquisitions, fixed-asset purchases) and only its most liquid portion can be reallocated to stress needs as a secondary fallback." },
    { wrong: "\"Drawing down a committed liquidity facility during stress should be modeled as reducing the stressed outflows.\"", right: "A facility draw is modeled as a stressed INFLOW — cash actually enters the firm — even though it simultaneously consumes the facility's remaining undrawn capacity for future use." }
  ],

  highYield: [
    { stars: 4, what: "Four funding liquidity categories (operational, contingent, strategic, restricted) and their distinct availability.", why: "A precise four-way classification frequently tested via scenario matching." },
    { stars: 4, what: "Six stress test design dimensions, especially assumptions ('garbage in, garbage out') and reverse stress testing.", why: "The comprehensive framework this reading builds — a recurring source of conceptual questions." },
    { stars: 3, what: "Stressed liquidity asset buffer formula.", why: "A simple, direct calculation worth quick fluency — the exam has tested it with a multi-item numeric example (see the Firm A worked calculation)." },
    { stars: 3, what: "Governance's three lines of defense plus model risk management, and what each role owns.", why: "Distinguishing 'suggests scenarios' (treasury) from 'independently challenges scenarios' (risk management) from 'checks the process' (internal audit) is a common exam distinction." },
    { stars: 2, what: "Recommended minimum stress-testing frequency: at least quarterly, to feed the ALCO.", why: "A concrete, memorizable fact that shows up as a standalone question." }
  ],

  recall: [
    { q: "A bank holds $50M in liquid assets, but $20M of that is contractually earmarked for a specific planned capital expenditure. How should this $20M be categorized, and why does it matter for stress testing?", a: "It should be categorized as RESTRICTED liquidity — technically liquid, but with a predetermined, fixed operational use that makes it unavailable for general funding shortfalls. In a liquidity stress test, only the unrestricted $30M should be counted as genuinely available buffer capacity; including the restricted $20M would overstate the bank's true stress resilience." },
    { q: "Why is a reverse stress test a valuable complement to a standard forward-looking hypothetical scenario test?", a: "A forward-looking hypothetical scenario test starts from an assumed shock and forecasts its impact — it can only reveal vulnerabilities the scenario designer thought to test. A reverse stress test starts from an assumed FAILURE outcome and works backward to identify what combination of circumstances would cause it — this can surface critical vulnerabilities and failure paths that scenario designers might never have thought to construct forward, providing a genuinely different angle of insight." },
    { q: "Firm A holds $1,000M in highly liquid assets. Under stress it expects a $150M retail deposit outflow, an $80M retail loan repayment inflow, a $60M outflow from derivatives margin/collateral calls, and a $90M inflow from drawing its committed liquidity facility. Compute the stressed liquidity asset buffer and state whether it is sufficient.", a: "Stressed buffer = $1,000M − $150M − $60M + $80M + $90M = $960M. It is positive, so the buffer is sufficient under this scenario — but the margin is thin relative to the $210M of gross outflows, so a modestly worse deposit-outflow assumption could flip the result to insufficient." }
  ],

  hooks: [
    { title: "Garbage in, garbage out", text: "A stress test is only as trustworthy as its assumptions — haircuts, deposit outflows, wholesale funding behavior. Sophisticated modeling on unrealistic assumptions is theater, not risk management." },
    { title: "Working backward from the grave", text: "Reverse stress testing starts at the tombstone and works backward to find the cause of death — a genuinely different angle than guessing scenarios forward and hoping one matches reality." },
    { title: "Liquid isn't the same as available", text: "Government bonds posted as collateral are just as liquid as government bonds sitting unencumbered in the buffer — but only one of them can actually be sold to cover a deposit run. Restricted vs. contingent is a distinction about permission, not about tradability." }
  ],

  breakdown: [
    {
      title: "Four categories of funding liquidity",
      points: [
        "Operational — funds needed to cover regular day-to-day operating activity (e.g., clearing payments); cannot be diverted to non-operational needs.",
        "Contingent — very high-quality liquid assets and credit facilities held specifically to satisfy liabilities under stress; this is what the stressed liquidity asset buffer measures.",
        "Strategic — funds reserved for investment opportunities (fixed-asset purchases, M&A); not built for stress, but the most liquid slice can be reallocated to contingent needs if required.",
        "Restricted — liquid assets with a stated, predetermined, fixed use (e.g., posted collateral); not available to satisfy general operational or funding needs despite being liquid."
      ]
    },
    {
      title: "Six stress test design dimensions",
      points: [
        "Scope — start with the consolidated firm-wide test, then layer in parent-only, subsidiary, business-line, or business-unit tests where liquidity transfer restrictions or separate regulatory regimes make a consolidated view misleading.",
        "Scenario development — set a benchmark liquidity level first, then build historical scenarios (real but scarce data) and hypothetical scenarios (forward-looking, split into systemic-only, idiosyncratic-only, and combined shocks at varying severity), plus reverse stress tests that start from failure and work backward.",
        "Assumptions — 'garbage in, garbage out': build assumptions for haircuts, deposit outflows, unsecured wholesale funding, collateral requirements, other contingent liabilities, and business reduction from historical/market data wherever possible, segmented down to the account level.",
        "Outputs — deliver stress assumptions, current liquidity position metrics (tactical ~30-day vs. structural ~12-month survival), future liquidity position metrics (available liquidity, wholesale funding dependence, concentration), and capital/performance metrics, at least quarterly.",
        "Governance — ALCO owns the policy and limits; treasury (1st line) runs the process and proposes scenarios; risk management (2nd line) independently challenges assumptions and approves limits; internal audit (3rd line) checks the process; model risk management validates the model itself.",
        "Integration with other models — reconcile with capital stress testing (parent-to-subsidiary capital injections), asset-liability management (rate moves affecting bond-like liability values and deposit disintermediation), and funds transfer pricing (the true cost of stress-driven cash-holding requirements)."
      ]
    },
    {
      title: "Four outputs (deliverables) of a liquidity stress test",
      points: [
        "Stress testing assumptions — the general stress level, whether the scenario is systemic/idiosyncratic/combined, the contribution of each driver, and the resulting cash flows.",
        "Current liquidity position metrics — available liquidity versus net cash outflows, contrasting tactical (~30-day) survival with structural (~12-month) survival.",
        "Future liquidity position metrics — projected available liquidity, wholesale funding dependence, funding concentration, and the timing of any required transactions like a capital infusion.",
        "Capital and performance metrics — the bank's longer-term viability, including the liquidity-versus-yield trade-off on required regulatory capital and the capital impact of any liquidity support needed."
      ]
    },
    {
      title: "Governance: who owns which part of the stress test",
      points: [
        "ALCO (asset-liability committee) — owns the overall liquidity stress testing framework: finalizes the policy (scenarios, assumptions, roles, reporting, limits), finalizes scenarios, sets risk limits from the results, and escalates exceptions.",
        "Treasury (1st line of defense) — manages the day-to-day testing process, suggests scenarios, analyzes the balance sheet's liquidity features, and reports the results (with data ideally sourced independently of treasury for proper segregation of duties).",
        "Risk management (2nd line of defense) — independently reviews and challenges scenarios and assumptions, confirms consistency with regulation and industry practice, approves and oversees stress-based limits, and communicates the liquidity risk profile to the board and senior management.",
        "Internal audit (3rd line of defense) — performs regular checks on the stress testing process, procedures, and controls to confirm regulatory adherence.",
        "Model risk management — a separate group that validates the stress-testing model itself against the firm's model risk management policy."
      ]
    }
  ],

  quiz: [
    {
      q: "Which type of liquidity is specifically meant to fund potential investment opportunities such as fixed asset purchases or mergers and acquisitions?",
      options: ["Contingent liquidity", "Funding liquidity", "Restricted liquidity", "Strategic liquidity"],
      answer: 3,
      why: "Strategic liquidity is the funds a firm maintains for investment opportunities. Contingent liquidity is the wrong trap answer because it sounds similar (both are 'reserves') but contingent liquidity is dedicated to stressed situations, not opportunities; restricted liquidity is wrong because it has a fixed predetermined use like collateral, not investment flexibility."
    },
    {
      q: "Firm A holds $1 billion in highly liquid assets. Under a stress scenario it expects a $150 million retail deposit outflow, an $80 million retail loan repayment inflow, a $60 million outflow from derivatives margin and collateral calls, and a $90 million inflow from drawing down its committed liquidity facility. What is the stressed liquidity asset buffer?",
      options: ["$0.80 billion", "$0.88 billion", "$0.90 billion", "$0.96 billion"],
      answer: 3,
      why: "Stressed buffer = $1,000M − $150M − $60M + $80M + $90M = $960M = $0.96 billion. The '$0.80 billion' answer comes from netting only the two largest flows and forgetting the facility draw; the '$0.90 billion' answer comes from forgetting the loan repayment inflow; both are the kind of partial-netting error the calculation is designed to catch."
    },
    {
      q: "A bank has posted $40 million of government bonds as collateral under a derivatives credit support annex with a counterparty. How should this $40 million be classified for liquidity stress testing purposes?",
      options: ["Contingent liquidity, since government bonds are highly liquid", "Restricted liquidity, since the assets have a predetermined, fixed use and are not freely available", "Strategic liquidity, since it relates to a derivatives position", "Operational liquidity, since it supports ongoing trading activity"],
      answer: 1,
      why: "The assets are pledged to a specific counterparty for a specific purpose — that is the definition of restricted liquidity, regardless of how liquid the underlying government bonds are in a market sense. Calling it contingent liquidity (the tempting distractor) confuses tradability with availability; contingent liquidity must be freely deployable against general stress, and pledged collateral is not."
    },
    {
      q: "What is the primary purpose of a reverse liquidity stress test?",
      options: [
        "To replace forward-looking hypothetical scenario testing entirely",
        "To assume a firm's failure and work backward to identify the critical factors that would cause it",
        "To calculate the firm's regulatory Liquidity Coverage Ratio",
        "To determine the firm's day-to-day operational cash needs"
      ],
      answer: 1,
      why: "Reverse stress tests start from an assumed failure outcome and work backward to the critical drivers, revealing failure paths a forward-looking scenario might never have considered. The 'replaces forward-looking hypothetical testing' answer is the classic misconception this reading explicitly warns against: reverse stress tests are a supplement to forward-looking hypotheticals, never a replacement."
    },
    {
      q: "In the three-lines-of-defense governance structure for liquidity stress testing, which group is responsible for suggesting scenarios and analyzing the bank's assets and liabilities for their liquidity features, then reporting the results?",
      options: ["ALCO", "Treasury (first line of defense)", "Risk management (second line of defense)", "Internal audit (third line of defense)"],
      answer: 1,
      why: "Treasury, as the first line of defense, runs the day-to-day process: it proposes scenarios, analyzes the balance sheet's liquidity characteristics, and reports results. Risk management (the tempting distractor) is the SECOND line — it independently challenges treasury's scenarios and assumptions rather than proposing them, which is the key distinction the exam tests."
    },
    {
      q: "At what minimum frequency is a liquidity stress test generally recommended to be performed, so the asset-liability management committee can review it on a sufficiently regular basis?",
      options: ["Monthly", "Quarterly", "Semiannually", "Annually"],
      answer: 1,
      why: "At least quarterly is the recommended minimum, though many banks test more frequently (monthly or even daily) if they have the technology and resources. Monthly (the tempting distractor) describes what more sophisticated banks do voluntarily, but it is not the baseline minimum the reading specifies."
    }
  ],

  sources: [
    { title: "Bank for International Settlements — Principles for Sound Liquidity Risk Management and Supervision", url: "https://www.bis.org/publ/bcbs144.htm", note: "The Basel Committee's foundational supervisory guidance on liquidity risk management, including stress testing expectations, that this reading's framework builds on." },
    { title: "Federal Reserve — Supervisory Guidance on Liquidity Risk Management", url: "https://www.federalreserve.gov", note: "US regulatory expectations for how banks should structure liquidity stress testing, scenario design, and contingency funding planning." },
    { title: "Investopedia — Stress Testing", url: "https://www.investopedia.com/terms/s/stresstesting.asp", note: "A plain-language overview of stress testing concepts, useful as a refresher on the general mechanics before the liquidity-specific detail here." },
    { title: "Wikipedia — Bank run", url: "https://en.wikipedia.org/wiki/Bank_run", note: "Background on the deposit-outflow dynamics (retail withdrawals, confidence-driven acceleration) that liquidity stress test scenarios are built to model." }
  ],

  pdf: { book: 4, query: "This reading defines various types of liquidity and follows" },

  summary: `<p><strong>Four funding liquidity categories</strong>: operational (day-to-day), contingent (stress-scenario buffer), strategic (opportunities), restricted (liquid but locked to fixed uses). <strong>Stressed buffer</strong> = normal buffer − stressed outflows + stressed inflows (Firm A worked example: $1,000M − $150M − $60M + $80M + $90M = $960M). <strong>Six design dimensions</strong>: scope (firm-wide to business-unit, watch liquidity transfer restrictions), scenario development (historical/hypothetical/reverse), assumptions ('garbage in, garbage out'), outputs (four deliverables, at least quarterly), governance (ALCO, three lines of defense, plus model risk management), integration with other models (capital stress testing, ALM, FTP).</p>`
});
