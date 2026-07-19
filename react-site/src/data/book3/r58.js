export default ({
  book: 3, reading: 58,
  session: "Capital and Regulatory Frameworks",
  title: "Capital Planning at Large Bank Holding Companies",
  tagline: "Takes everything conceptual from R57 and shows how one real supervisory regime — the Federal Reserve's Capital Plan Rule — operationalizes it for large U.S. bank holding companies.",

  teaches: `<p>A <strong>bank holding company (BHC)</strong> is a corporate parent that owns one or more banks — think Citigroup or JPMorgan Chase & Co. as the holding company sitting above the actual chartered bank subsidiaries. Capital is the cushion of shareholder-funded resources (common equity plus other qualifying instruments) that absorbs unexpected losses so the bank can keep operating instead of failing — and a BHC "failing" means its liabilities exceed its assets, i.e., negative capital, which historically has meant a taxpayer bailout or a hit to deposit insurance funds. Because a failure at one large BHC can cascade through the financial system, the Federal Reserve doesn't just watch capital levels after the fact — it requires large BHCs to run an ongoing internal process, the <strong>capital adequacy process (CAP)</strong>, that continuously tests whether their capital would survive a severe stress scenario. This reading teaches the Fed's <strong>Capital Plan Rule</strong> (which BHCs it applies to, and the seven principles the Fed uses to judge whether a BHC's internal process is good enough), the detailed practices the Fed expects within each principle (risk identification, model review, governance, capital policy, stress-scenario design, loss/revenue/expense estimation), and the specific mechanics of projecting <strong>pre-provision net revenue (PPNR)</strong> — net revenue before subtracting loss provisions — over the 9-quarter planning horizon the rule requires.</p>`,

  why: `<p>This is the micro-level implementation of exactly the macro-to-micro stress testing challenge R55 raised in the abstract — R58 is what that translation looks like inside one bank's actual capital planning process. Read this as "R57's checklist, now with a named regulator and named process." Where R57 asked "how good is your economic capital model in principle?", the Capital Plan Rule asks the same question but attaches a specific asset threshold ($50 billion), a specific supervisory review (CCAR — the Comprehensive Capital Analysis and Review, the Fed's annual program for evaluating capital plans), and seven specific, individually testable principles a BHC must satisfy.</p>`,

  intuition: `<p>Picture the Fed asking a giant BHC one question every year: "If a severe recession hit tomorrow, would you still have enough capital to keep lending and stay solvent — and can you prove it with a rigorous, internally-consistent process, not just an optimistic guess?" The Capital Plan Rule is the formal version of that question. It applies specifically to top-tier U.S. BHCs with $50B+ in consolidated assets — smaller community banks are not in scope. To pass, a BHC must run a capital adequacy process (CAP) that satisfies seven principles spanning the full lifecycle of the exercise: (1) find every risk you're exposed to firm-wide, (2) know how much capital resource you'd have left after a shock, (3) estimate how much you'd lose in that shock, (4) combine (2) and (3) to judge whether you'd still be adequately capitalized, (5) have a policy for what you'll do with capital (issue it, use it, distribute it) under both normal and stressed conditions, (6) have internal controls — independent model review, documentation, audit — verifying all of the above is done rigorously, and (7) have the board and senior management actually engaged in overseeing it, not rubber-stamping it. This is essentially R41's governance framework and R57's economic capital challenges, now codified into a specific regulatory requirement with a named regulator, a named threshold, and named deliverables.</p>`,

  formulas: [
    {
      name: "Pre-provision net revenue (PPNR)",
      math: "\\text{PPNR} = \\text{Net Interest Income} + \\text{Noninterest Income} - \\text{Noninterest Expense}",
      note: "PPNR is net revenue before loss provisions are subtracted — it isolates the bank's core earnings power under a stress scenario, separately from how much it sets aside for expected credit losses.",
      plain: "This formula says PPNR is what's left of a bank's revenue after subtracting its operating expenses, but before subtracting the money it sets aside to cover expected loan losses — it measures the bank's underlying earnings engine, not its bottom-line profit.",
      derivation: `<p>PPNR is built up from three separately-projected — but not independently-projected — pieces, each of which must be internally consistent with the same stress scenario and the same underlying balance sheet assumptions:</p>
        <p>\\[ \\text{PPNR} = \\underbrace{\\text{Net Interest Income}}_{\\text{interest earned} - \\text{interest paid}} + \\underbrace{\\text{Noninterest Income}}_{\\text{fees, trading, brokerage, MSRA revenue}} - \\underbrace{\\text{Noninterest Expense}}_{\\text{operating costs, e.g. credit-collection costs}} \\]</p>
        <p>The reason this cannot be three separate spreadsheet rows summed together is that all three inputs are driven by the <em>same</em> underlying balance sheet and macroeconomic path. For example, net interest income projections must use the same balance sheet assumptions (loan volumes, deposit mix, prepayment rates) as the loss estimates derived from that same balance sheet — if a recession scenario shrinks the loan book and raises delinquencies, both net interest income and loss provisions must reflect that shrinkage and that stress consistently, not one stressed and the other left at baseline.</p>`
    }
  ],

  concepts: [
    {
      name: "The Capital Plan Rule & the seven CAP principles",
      def: "A Federal Reserve rule requiring all top-tier, U.S.-domiciled bank holding companies (BHCs) with total consolidated assets of $50 billion or more to develop and maintain an ongoing internal capital plan and a process — the capital adequacy process (CAP) — for assessing and enhancing their capital adequacy under stress scenarios on a firm-wide basis. The Fed evaluates capital plans annually through CCAR (the Comprehensive Capital Analysis and Review). The seven CAP principles the Fed grades the BHC against are: (1) risk management foundation, (2) resource estimation methods, (3) loss estimation methods, (4) impact on capital adequacy, (5) capital planning policy, (6) internal controls, and (7) effective oversight.",
      intuition: "Think of the seven principles as an audit checklist running end-to-end through the exercise: first find your risks, then estimate what capital you'd have and what you'd lose, then combine those to judge adequacy, then have a policy for what to do about it, then verify the whole process with independent controls, then have the board actually own it.",
      example: "A $75B-asset BHC is squarely in scope (above the $50B threshold); a $30B-asset community bank is not. Note this is a size test, not a business-model or risk test — it applies regardless of whether the BHC is domestically focused or globally active, as long as it clears $50B in consolidated assets.",
      pitfall: "Don't confuse the seven CAP principles with generic 'good governance' bullet points — the exam tests the specific list, and specific wrong answers (e.g., 'oversight from peer BHCs' or 'annual reporting to the stock exchange') are deliberately plausible-sounding distractors that are NOT among the seven.",
      related: [{ r: 41, label: "R41 — the governance foundation this codifies" }],
      memory: "Foundation → Resources → Losses → Adequacy → Policy → Controls → Oversight: identify risk, measure what you have and what you'd lose, judge if that's enough, plan what to do, verify it, and have the board own it."
    },
    {
      name: "Risk identification",
      def: "BHCs must have a process to identify all risk exposures — from stress conditions, changing economic/financial environments, and both on- and off-balance-sheet items — and their impact on capital adequacy. This includes critically scrutinizing assumptions about risk reduction from risk mitigation or risk transfer techniques (e.g., not just assuming a hedge will work as intended in a crisis).",
      intuition: "Some risks — reputational, strategic, compliance risk — are hard to quantify and don't fit neatly into a firm-wide stress scenario. The source calls these 'other risks.' They can't be ignored just because they resist modeling; BHCs use tools like internal capital targets (holding extra capital as a buffer) to account for risks that can't be precisely stress-tested.",
      example: "A BHC concentrated in commercial real estate lending in one region must build region-specific risk identification into its process, not just apply the Fed's generic supervisory scenario off the shelf.",
      pitfall: "It's tempting to think scenario-based stress testing captures everything. The source is explicit that it does not — 'other risks' like reputational and strategic risk must still be identified and accounted for through separate methods even though they're difficult to quantify.",
      related: [{ r: 57, label: "R57 — the economic capital challenges this operationalizes" }],
      memory: "'Other risks' = reputational, strategic, compliance — hard to model, but still must be identified and accounted for, often via internal capital targets."
    },
    {
      name: "Internal controls (model review, documentation, audit)",
      def: "BHCs must maintain a detailed, organized documentation system covering all dimensions of capital planning (risk identification, loss estimation, capital adequacy, capital decisions), and must subject every model used for internal capital planning to a thorough, independent, and regular review and validation — checking both conceptual soundness and process verification. The validation team must have the required technical skill set AND complete independence from both the business areas and the model developers whose work they're reviewing.",
      intuition: "Independence is the whole point here: if the people validating a credit-loss model report to the same manager whose bonus depends on that model showing low expected losses, the validation isn't trustworthy. That's why the source stresses the validation team must be independent from BOTH business lines and model developers, not just one or the other.",
      example: "An internal audit team scrutinizes internal control data for accuracy before it goes to senior management and the board — this is a gate, not a formality: an efficient management information system (MIS) is required so the audit team can actually collect and analyze the relevant data quickly and accurately.",
      pitfall: "Models should be validated not only under normal conditions but also under stress conditions — a model that performs fine on ordinary data can still fail exactly when it matters most (during the tail scenario the whole exercise exists to test). BHCs should disclose their validation process and outcomes, and restrict use of models that haven't been validated.",
      memory: "Validation independence = independent from BOTH the business line AND the model developer — not just one."
    },
    {
      name: "Governance",
      def: "Boards must have sufficient expertise and involvement to fully understand and evaluate the information senior management provides about capital planning — risk exposures, loss estimates, revenue/loss determinants, underlying models and assumptions, and the plan's weaknesses and strengths. Under the Capital Plan Rule, management must furnish the board with underlying assumptions, stress testing results, internal audit outcomes, and model review/validation checks before the board approves the internal capital adequacy plan. Detailed minutes of board meetings must be kept, describing the issues raised and the information used to reach decisions.",
      intuition: "The distinction being tested is 'active, informed approval' versus 'passive rubber stamp.' A board that receives a summary slide and signs off is not meeting the standard; a board that is given the underlying assumptions and stress results, and can meaningfully challenge them, is.",
      example: "Senior management is expected to evaluate the capital plan on an ongoing basis (not just once a year at approval time), and to make adjustments and remediation if the review process reveals shortcomings.",
      related: [{ r: 41, label: "R41 — board oversight structure this reading applies specifically to capital planning" }]
    },
    {
      name: "Capital policy",
      def: "A capital policy clearly defines principles and guidelines for capital goals, issuance, usage, and distributions, and spells out the BHC's decision rules for capital usage, distribution, and financing, tailored to the BHC's specific needs while incorporating supervisory expectations. Policies on common-stock dividends and share repurchases must specify: (1) the key metrics driving the size/timing/form of distributions, (2) the materials used to make distribution decisions, (3) the specific scenarios that would cause a distribution to be reduced or suspended, (4) the situations that would trigger replacing common equity with other forms of capital, and (5) the roles and responsibilities of the people producing materials, recommending distributions, and reviewing the analysis.",
      intuition: "Capital goals must be compatible with the BHC's risk tolerance, risk profile, regulatory requirements, and stakeholder expectations (shareholders, creditors, supervisors, rating agencies). Capital TARGETS must be set above capital GOALS for adequacy under stress — the target is the buffer above the minimum goal that accounts for the possibility of a bad scenario actually happening.",
      example: "Contingency planning is part of capital policy too: BHCs need realistic, feasible options for dealing with capital shortfalls, based on forward-looking assumptions rather than over-reliance on history, plus capital 'triggers' — early-warning signals of capital deterioration — grounded in projected results and stakeholder expectations.",
      pitfall: "Don't confuse capital policy with governance policy: dividend/repurchase suspension rules are a capital-policy matter, not a governance-policy matter — a subtle distinction the exam tests directly (see Module Quiz 59.2 Q2 in the source, where mixing these up is the trap)."
    },
    {
      name: "Stress testing and stress scenario design",
      def: "Scenario design must focus on the BHC's own unique situation — its asset/liability mix, portfolio composition, business lines, and geography — not just apply the supervisor's general guidelines off the shelf; a BHC's own scenario design should go above and beyond the baseline. Scenarios must not use assumptions that are optimistic or favorable to the BHC, and must impose a strong strain on revenue and income. BHCs should use both an internal model and expert judgment (an outside expert's opinion); if only a third-party model is used, it must be tailored to the BHC's specific risk profile and business model.",
      example: "A BHC concentrated in a particular region, business line, or industry should include variables specific to that region/business/industry in its stress model — a generic macro scenario alone would miss firm-specific vulnerabilities.",
      pitfall: "Scenarios that only stress broad macro variables (GDP, unemployment) without addressing the BHC's own specific weaknesses (e.g., concentration in one sector) fail this principle."
    },
    {
      name: "Estimating losses, revenues, and expenses (quantitative and qualitative)",
      def: "BHCs should prefer internal data but may use external data when it reflects the underlying risk profile of the business lines (with necessary adjustments). Line-of-business/portfolio segmentation should use common risk characteristics (e.g., credit-score ranges) with sufficient data per segment for meaningful estimates. Because past relationships between losses, revenues, expenses, and their drivers may not hold in the future, sensitivity analysis (answering 'what if' questions) is required alongside models built on historical relationships. Qualitative methods — expert judgment, management overlay — are used as a substitute or complement to quantitative methods, but must be based on sound, externally-reviewable assumptions, and supervisors expect conservative (not favorable-to-the-BHC) assumptions throughout.",
      example: "For loss estimation specifically, BHCs use either an economic loss approach (expected losses, decomposed into PD/LGD/EAD — probability of default, loss given default, exposure at default) or an accounting-based approach (charge-off and recovery). Long-run historical averages for PD, LGD, and EAD should NOT be used for stress scenarios, because those averages blend downturn and upturn periods and dilute the severity a stress test needs to capture; LGD should instead be linked to underlying risk factors like a fall in collateral value under stress, and EAD should vary with macroeconomic conditions.",
      pitfall: "Retail loan losses typically rely on internal data; wholesale loss estimation typically supplements internal data with external data — reversing that default (e.g., leaning entirely on external data for retail) is a red flag in the source's framing.",
      memory: "PD/LGD/EAD, never long-run averages for stress — long-run averages smooth away exactly the severity a stress scenario is supposed to capture."
    },
    {
      name: "Market risk and counterparty credit risk (CCR)",
      def: "BHCs involved in trading face counterparty credit risk from changes in exposure value and counterparty creditworthiness under stress. To estimate potential loss, BHCs use a probabilistic approach (produces a full probability distribution of expected portfolio losses; must show evidence of generating scenarios more severe than past observed historical events, and must explain how tail-loss scenarios are used to detect firm-specific risks) or a deterministic approach (produces point estimates of expected portfolio loss; must demonstrate use of a wide range of scenarios covering key risk exposures, including mark-to-market positions under firm-specific or market-wide stress, with assumptions and remediation clearly documented).",
      intuition: "Market shock scenarios by themselves do not directly incorporate the DEFAULT of a counterparty — they model price/value changes. Some BHCs go further and explicitly model a key counterparty's default (using PD/LGD/EAD estimates for that counterparty) via a probabilistic approach, which lets them isolate losses from defaults of counterparties to which they have large exposure specifically.",
      pitfall: "Any assumptions about future risk mitigation (e.g., assuming you can always hedge or unwind a position) must be conservative — in a real stress scenario, a BHC's ability to take its desired risk-reducing actions may be limited (markets can freeze, hedges can fail to perform).",
      related: [{ r: 57, why: "the counterparty credit risk challenges this operationalizes" }]
    },
    {
      name: "PPNR projection methodologies",
      def: "PPNR — pre-provision net revenue, i.e., net revenue before loss provisions are subtracted — must be projected over the planning horizon the Capital Plan Rule requires: the next nine quarters. Projections must be based on coherent, clearly defined relationships among revenues, expenses, and balance sheet items WITHIN a given scenario (e.g., loan-origination assumptions must be the same across loans, fees, costs, and losses), not built as independently-projected line items.",
      example: "Net interest income projections must incorporate ongoing changes in current and projected balance sheet positions — including embedded options, prepayment rates, loan performance, and repricing rates — and must use the SAME balance sheet assumptions used elsewhere in the plan (e.g., for loss estimates). Noninterest income projections must reflect the stated scenario and business strategy — for example, an asset management group projects noninterest income using methods specific to that business, like brokerage and money-management revenue, and BHCs holding mortgage servicing rights assets (MSRAs) must build scenario-specific default, prepayment, and delinquency assumptions.",
      pitfall: "PPNR isn't the sum of independently projected line items. A BHC that projects net interest income, fee income, and expenses as if they don't interact — ignoring, say, that a recession that cuts credit-card fee revenue (because consumers spend less) should also show up as a decline in noninterest income — has produced a weak, internally inconsistent projection. The classic weak-practice example from the source: a BHC not showing a sufficient decline in revenue under stress despite an obvious macro relationship (e.g., credit-card fee income should fall in a strong recession because consumer spending falls, and a projection that doesn't reflect that is a red flag).",
      related: [{ r: 57, label: "R57 — the counterparty credit risk challenges this operationalizes" }],
      memory: "PPNR isn't a sum of independently-projected line items — revenue, expense, and balance sheet drivers must move together, consistently, within the scenario, using the SAME underlying assumptions."
    },
    {
      name: "Generating balance sheet and RWA projections",
      def: "BHCs need a well-defined, well-documented process for projecting the size and composition of on- and off-balance-sheet items and risk-weighted assets (RWAs) over the stress horizon. Projecting balance sheet changes (e.g., changes in assets and funding) directly, without identifying the underlying drivers of those changes, is a weak practice; RWA projections must be consistent with the projected risk exposures of on- and off-balance-sheet items. A centralized group should aggregate loss, revenue, expense, balance sheet, and RWA projections firm-wide, with strong governance to scrutinize assumptions and methods.",
      pitfall: "If an enterprise-wide scenario analysis produces post-stress results that look MORE favorable than the baseline (no-stress) case, that is itself a red flag requiring the BHC to critically re-examine the underlying assumptions across business lines — a stress scenario should not, by construction, look better than the baseline."
    }
  ],

  connections: {
    from: [
      { r: 55, why: "The macro-to-micro stress testing challenge raised in the abstract there becomes this concrete supervisory process." },
      { r: 57, why: "Economic capital's challenges (validation, dependency modeling, CCR) get operationalized into named regulatory requirements here." }
    ],
    to: [
      { r: 59, why: "Basel capital regulation's origin story provides the broader regulatory context this US-specific process sits within." }
    ],
    confused: [
      { what: "Probabilistic vs deterministic counterparty credit risk approaches", how: "Probabilistic: produces a full probability distribution of losses; must show scenarios AT LEAST AS SEVERE as past observed events. Deterministic: produces point estimates of expected loss; must span a WIDE RANGE of stress scenarios — different validation standards for different approach types." },
      { what: "Capital policy vs governance policy", how: "Capital policy governs WHAT the BHC does with capital — goals, issuance, usage, distributions, dividend/repurchase suspension triggers. Governance policy governs HOW decisions get made and overseen — board expertise, information flow to the board, minutes. Dividend suspension rules are a capital-policy item, not a governance-policy item, even though both involve the board." },
      { what: "Economic loss approach vs accounting-based loss approach", how: "Economic loss approach = expected losses, decomposed into PD, LGD, EAD. Accounting-based approach = charge-off and recovery data. Both estimate credit losses, but from different underlying data and methodology." }
    ]
  },

  misconceptions: [
    { wrong: "\"PPNR projections can be built by independently projecting each revenue and expense line item.\"", right: "PPNR projections must capture the INTERRELATIONSHIPS among revenue, expense, and on/off-balance-sheet drivers WITHIN a scenario — independent, siloed projections would miss how these drivers move together under stress, using the same underlying balance sheet and macro assumptions throughout." },
    { wrong: "\"The Capital Plan Rule applies to all U.S. bank holding companies regardless of size.\"", right: "It applies specifically to top-tier U.S. BHCs with $50B+ in consolidated assets — a size-based threshold, not a universal requirement." },
    { wrong: "\"Using long-run historical averages for PD, LGD, and EAD is a sound, conservative way to estimate stress losses.\"", right: "Long-run averages blend together both downturn and upturn periods, which dilutes exactly the severity that a stress scenario is supposed to isolate — they should NOT be used for stress loss estimation; LGD and EAD should instead be linked to how underlying risk factors (collateral values, macro conditions) actually move under stress." },
    { wrong: "\"A dividend or share-repurchase suspension policy is part of the BHC's governance policy.\"", right: "It falls under the BHC's capital policy, not its governance policy — a distinction the exam tests directly by mixing the two labels." },
    { wrong: "\"Scenario-based stress testing captures every risk a BHC faces, so nothing else needs separate treatment.\"", right: "Some risks — reputational, strategic, compliance risk, collectively called 'other risks' in the source — are difficult to quantify and don't fit into integrated firm-wide scenarios, yet must still be identified and accounted for, often via internal capital targets." }
  ],

  highYield: [
    { stars: 3, what: "Capital Plan Rule's $50B threshold and the seven CAP principles' scope.", why: "A specific, testable regulatory threshold and framework structure." },
    { stars: 3, what: "PPNR projections must capture interrelationships among revenue/expense/balance-sheet drivers, not siloed projections.", why: "A precise, frequently tested methodological requirement." },
    { stars: 2, what: "Probabilistic vs. deterministic counterparty credit risk approaches and their distinct validation standards.", why: "A clean two-way distinction for a specific risk type." },
    { stars: 2, what: "Long-run PD/LGD/EAD averages should NOT be used for stress-scenario loss estimation.", why: "A specific, easily-tested 'don't do this' rule that examiners like to flip into a plausible-sounding wrong answer." },
    { stars: 1, what: "Capital policy vs. governance policy — dividend/repurchase suspension is a capital-policy item.", why: "A subtle classification distinction the source's own quiz bank tests directly." }
  ],

  recall: [
    { q: "Why can't a bank's PPNR stress projection simply sum independently-forecasted revenue and expense line items?", a: "PPNR projections must capture the INTERRELATIONSHIPS among revenue, expense, and on/off-balance-sheet drivers within the given stress scenario — these drivers move together in economically consistent ways under stress (e.g., falling revenue often coincides with rising credit losses and changing funding costs), and independently projecting each line item would miss these real, scenario-consistent interactions." },
    { q: "A bank chooses a deterministic approach for modeling counterparty credit risk under its capital plan. What validation standard must this approach meet?", a: "The deterministic approach must span a WIDE RANGE of stress scenarios — as opposed to the probabilistic approach, which must instead demonstrate scenarios at least as severe as past observed historical events." },
    { q: "Why should a BHC avoid using long-run historical averages for PD, LGD, and EAD when estimating stress losses?", a: "Long-run averages blend together both economic downturn and upturn periods, which dilutes the severity a stress scenario is meant to capture — they are not suitable for scenario testing under stress conditions. LGD should instead be linked to underlying risk factors like collateral value declines, and EAD should vary with macroeconomic conditions." },
    { q: "What is the key independence requirement for the team that validates a BHC's internal capital planning models?", a: "The validation team must have the required technical skill set AND complete independence from BOTH all business areas of the BHC AND the model developers — independence from only one side would not be sufficient to produce an unbiased, credible validation." }
  ],

  hooks: [
    { title: "Not just adding up the pieces", text: "PPNR isn't a spreadsheet where you sum independent rows — revenue, expenses, and balance sheet items are all holding hands under stress, and the projection has to respect that they move together." },
    { title: "Seven checkpoints, one story", text: "Find the risk, measure what you have and what you'd lose, judge if it's enough, plan what you'll do about it, verify it independently, and make sure the board actually understands it — that's the seven CAP principles as one continuous story, not seven disconnected rules." }
  ],

  thinkLike: `<p>A capital planning manager at a large BHC doesn't ask "did we pass the stress test?" as a yes/no question — they ask "can I defend every assumption in this plan to an independent model-validation team, and then to the board, and then to Fed examiners?" That means never letting a projection stand on its own: if net interest income assumes a certain balance sheet path, the loss estimate for that same portfolio must use the identical balance sheet path, and if a scenario is supposed to be severe, no individual line item — noninterest income, RWAs, PPNR — is allowed to quietly come out looking better than the calm baseline case. The moment a post-stress number beats the baseline, that's not good news; it's a signal something in the assumptions is wrong.</p>
    <p>The examiner tends to test this reading in two ways. First, matching specifics: which of the seven CAP principles covers X, or which of the listed practices (risk identification vs. internal controls vs. capital policy vs. governance) a given scenario belongs to — plausible-sounding distractors are built by swapping labels (e.g., calling a capital-policy item a governance-policy item). Second, "which one does NOT belong" questions built from the source's own list — e.g., testing whether you know that "oversight from peer BHCs" and "reporting to a stock exchange" are NOT among the seven CAP principles, even though they sound institutionally plausible. Read every enumerated list in this reading as a closed set: if an answer choice isn't explicitly on the list, it's not one of the seven, five, or however many the question is asking about.</p>`,

  eli5: `<p>Imagine a huge company car-rental fleet that has to survive not just normal driving, but a worst-case pile-up scenario every single year — and a regulator (like a state inspector) requires them to prove, with real numbers and independent inspectors (not the fleet's own mechanics grading their own work), that after the pile-up they'd still have enough working cars, cash, and spare parts to keep renting cars to customers. The regulator doesn't just want a single "we're fine" statement — they want to see how the fleet identified every possible way cars could break down (the risk identification step), how much they'd have left afterward (resources), how much they'd lose (losses), whether that's enough (adequacy), what they'd do about repairs and replacement priorities (capital policy), whether an independent inspector double-checked the math (internal controls), and whether the fleet's board of directors actually understood and signed off on the whole plan (oversight). Mapped back to finance: the "fleet" is a large bank holding company, the "pile-up scenario" is the Fed's stress scenario, and the seven inspection checkpoints are the seven CAP principles under the Federal Reserve's Capital Plan Rule.</p>`,

  summary: `<p><strong>Capital Plan Rule</strong>: applies to U.S. BHCs with $50B+ assets, requires the capital adequacy process (CAP) — seven principles spanning risk management foundation, resource estimation, loss estimation, capital adequacy, capital planning policy, internal controls, and effective oversight (governance). CCAR is the Fed's annual supervisory review of capital plans. <strong>Key mechanics</strong>: comprehensive firm-wide risk identification (including hard-to-quantify "other risks" like reputational/strategic risk), independent model review/validation (independent from both business lines and model developers), active board evaluation/approval with detailed minutes, defined capital policy (goals, issuance, usage, distributions, dividend/repurchase suspension triggers, contingency planning). <strong>Loss estimation</strong>: sound theoretical/empirical grounds, quantitative+qualitative blend, PD/LGD/EAD decomposition (never long-run averages for stress) or accounting-based (charge-off/recovery). <strong>CCR</strong>: probabilistic (≥ past severe events, full loss distribution) or deterministic (wide scenario range, point estimate) approaches. <strong>PPNR</strong> = net interest income + noninterest income − noninterest expense, projected over 9 quarters, must capture interrelationships among revenue/expense/balance-sheet drivers within a scenario using consistent assumptions — not independently-projected line items. Balance sheet and RWA projections must be driver-based, not extrapolated directly; post-stress results beating the baseline is a red flag requiring re-examination.</p>`,

  breakdown: [
    {
      title: "The seven CAP principles",
      points: [
        "Risk management foundation — an effective, firm-wide plan to identify, evaluate, measure, and control all key risk exposures.",
        "Resource estimation methods — a plan to clearly define and estimate available capital resources over the stress scenario time horizon.",
        "Loss estimation methods — a process to estimate and aggregate potential losses firm-wide over the stress scenario time horizon.",
        "Impact on capital adequacy — a process combining loss estimates and capital resources to judge whether stated capital-level and composition goals are met.",
        "Capital planning policy — a sound policy defining capital goals, appropriate levels/composition, distribution actions, and contingency plans.",
        "Internal controls — independent review, model validation, documentation, and internal audit of the whole capital adequacy process.",
        "Effective oversight — a board and senior management that thoroughly oversee methods, processes, assessments, validations, reviews, documentation, infrastructure, resources, goals, limitations, and capital decisions."
      ]
    },
    {
      title: "The seven key practices for a strong CAP (Module 59.2)",
      points: [
        "Risk identification — capturing on/off-balance-sheet items, risk mitigation/transfer assumptions, and changes in risk profile under stress, including hard-to-quantify 'other risks' (reputational, strategic, compliance).",
        "Internal controls, including model review and valuation — independent, regular validation of every model, with documentation covering the whole planning process.",
        "Corporate governance — an informed, actively involved board receiving full information (assumptions, stress results, audit outcomes, model validation) before approving the plan.",
        "Capital policy, including goals/targets and contingency planning — clear rules for issuance, usage, distributions, and what triggers a distribution cut or a capital-composition change.",
        "Stress testing and stress scenario design — BHC-specific scenarios (not just the supervisor's generic baseline) using both internal models and outside expert judgment.",
        "Estimating losses, revenues, and expenses (quantitative and qualitative) — internal data preferred, sensitivity analysis required, conservative assumptions expected.",
        "Assessing the impact of capital adequacy, including RWA and balance sheet projections — driver-based, internally consistent projections, not direct extrapolation."
      ]
    },
    {
      title: "Two approaches to counterparty credit risk (CCR) estimation",
      points: [
        "Probabilistic approach — produces a full probability distribution of expected portfolio losses; must demonstrate scenarios at least as severe as past observed historical events, and explain use of tail-loss scenarios for firm-specific risk.",
        "Deterministic approach — produces point estimates of expected portfolio loss; must demonstrate a wide range of scenarios covering key risk exposures (including mark-to-market positions) under firm-specific or market-wide stress."
      ]
    },
    {
      title: "Two approaches to credit loss estimation",
      points: [
        "Economic loss approach (expected losses) — decomposed into probability of default (PD), loss given default (LGD), and exposure at default (EAD); long-run averages should not be used for stress scenarios.",
        "Accounting-based loss approach — uses charge-off and recovery data; charge-off models should include variables representing the underlying portfolio's risk characteristics."
      ]
    }
  ],

  quiz: [
    {
      q: "Under the Federal Reserve's Capital Plan Rule, which bank holding companies (BHCs) are required to maintain a capital adequacy process (CAP)?",
      options: [
        "All U.S. and non-U.S. domiciled BHCs, regardless of size",
        "BHCs with more than five years of operational history",
        "Top-tier, U.S.-domiciled BHCs with total consolidated assets of $50 billion or more",
        "BHCs with net annual income exceeding $5 billion"
      ],
      answer: 2,
      why: "The Capital Plan Rule applies specifically to top-tier, U.S.-domiciled BHCs with total consolidated assets equal to or greater than $50 billion — a size-based asset threshold. The other options (jurisdiction-agnostic, operational history, net income) are plausible-sounding but are not the actual criterion the source specifies."
    },
    {
      q: "Which of the following is one of the Federal Reserve's seven principles of an effective capital adequacy process (CAP)?",
      options: [
        "Oversight from peer BHCs",
        "Annual reporting to the stock exchange where the BHC's stock is listed",
        "Loss estimation methods",
        "Third-party credit rating agency approval of the capital plan"
      ],
      answer: 2,
      why: "Loss estimation methods is one of the seven CAP principles. Peer-BHC oversight and stock-exchange reporting are not among the seven principles — they are deliberately plausible-sounding distractors built to sound institutionally reasonable while not actually appearing on the Fed's list; a rating-agency approval requirement is similarly not part of the CAP."
    },
    {
      q: "A BHC's stress-loss model for its wholesale credit portfolio uses long-run historical averages for probability of default (PD), loss given default (LGD), and exposure at default (EAD). What is the primary problem with this approach?",
      options: [
        "Long-run averages are computationally too expensive to calculate for large portfolios",
        "Long-run averages blend both downturn and upturn periods, diluting the severity that a stress scenario is meant to capture",
        "Long-run averages can only be applied to retail portfolios, not wholesale portfolios",
        "PD, LGD, and EAD cannot legally be estimated using historical data under the Capital Plan Rule"
      ],
      answer: 1,
      why: "Long-run averages for PD, LGD, and EAD reflect a mix of both economic downturn and upturn periods, which dilutes the severity a stress test is designed to isolate — they are not suitable for stress-scenario testing. The other options are not real objections raised in the source; there is no legal prohibition on using historical data generally, and the retail/wholesale distinction concerns data source preference (internal vs. external), not which loss-estimation method can be used."
    },
    {
      q: "A BHC's stress-testing team is deciding between a probabilistic and a deterministic approach for estimating counterparty credit risk (CCR) losses. What validation standard applies specifically to the deterministic approach?",
      options: [
        "It must demonstrate scenarios at least as severe as past observed historical events",
        "It must produce a full probability distribution of expected portfolio losses",
        "It must span a wide range of stress scenarios adequately covering key risk exposures, including mark-to-market positions",
        "It must rely exclusively on external rating-agency default probabilities"
      ],
      answer: 2,
      why: "The deterministic approach yields point estimates and must be validated by demonstrating a wide range of stress scenarios covering key risk exposures, including mark-to-market positions under firm-specific or market-wide stress. 'Scenarios at least as severe as past events' and 'produces a full probability distribution' both describe the probabilistic approach instead — swapping these two standards is the classic distractor here. Reliance on external rating agencies is not a stated validation requirement for either approach."
    },
    {
      q: "A BHC's PPNR projection shows net interest income falling under a stress scenario, but its noninterest income (including credit-card fee revenue) stays flat despite the scenario assuming a steep recession with sharply reduced consumer spending. What is the most likely criticism of this projection?",
      options: [
        "PPNR should never include noninterest income, only net interest income",
        "The projection fails to capture the interrelationship between the macro scenario (reduced consumer spending) and a revenue driver (credit-card fee income) that should logically decline together with it",
        "Noninterest income projections are not required under the Capital Plan Rule",
        "The nine-quarter forecast horizon is too short to project noninterest income accurately"
      ],
      answer: 1,
      why: "PPNR projections must reflect coherent, internally consistent relationships among revenue, expense, and balance sheet drivers within a given scenario — the source specifically flags a failure to show a sufficient decline in credit-card fee revenue during a recession (despite an obvious macro relationship to reduced consumer spending) as a weak practice. PPNR does include both net interest income and noninterest income by definition, noninterest income projections are explicitly required, and the nine-quarter horizon is the rule's actual mandated planning window, not a stated limitation."
    },
    {
      q: "Given Net Interest Income = $8.2 billion, Noninterest Income = $3.1 billion, and Noninterest Expense = $5.4 billion for a BHC's stress-quarter projection, what is the projected pre-provision net revenue (PPNR)?",
      options: [
        "$16.7 billion",
        "$5.9 billion",
        "$10.9 billion",
        "$0.3 billion"
      ],
      answer: 1,
      why: "PPNR = Net Interest Income + Noninterest Income − Noninterest Expense = $8.2B + $3.1B − $5.4B = $5.9 billion. $16.7B comes from summing all three figures without subtracting expense; $10.9B comes from adding net interest income and expense while forgetting to subtract; $0.3B comes from an arithmetic slip (e.g., mistakenly using $8.2B − $5.4B − $2.5B instead of the correct inputs)."
    }
  ],

  sources: [
    { title: "Bank Holding Company Act — Federal Reserve supervision overview", url: "https://en.wikipedia.org/wiki/Bank_holding_company", note: "Background on what a bank holding company is and why the Federal Reserve supervises BHCs specifically." },
    { title: "Comprehensive Capital Analysis and Review (CCAR)", url: "https://www.federalreserve.gov/supervisionreg/ccar.htm", note: "The Federal Reserve's own page on CCAR, the annual supervisory program that evaluates BHC capital plans under the Capital Plan Rule." },
    { title: "Dodd-Frank Act Stress Testing (DFAST)", url: "https://www.federalreserve.gov/supervisionreg/dfast-archive.htm", note: "The related Fed stress-testing program that shares much of the same stress-scenario and loss-estimation machinery described in this reading." },
    { title: "Pre-provision net revenue", url: "https://en.wikipedia.org/wiki/Pre-provision_net_revenue", note: "A concise definition and context for the PPNR metric central to this reading's formula." }
  ],

  pdf: { book: 3, query: "Bank holding companies (BHCs) must have adequate and sufficient capital" }
});
