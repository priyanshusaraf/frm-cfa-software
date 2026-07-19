export default ({
  book: 3, reading: 41,
  session: "Operational Risk Overview",
  title: "Risk Governance",
  tagline: "Who's in charge of operational risk? Three levels: the regulatory framework, the committee structure, and the three lines of defense — the single most-recycled framework in this entire book.",

  teaches: `<p>Basel II's three pillars applied to operational risk (including the actual Pillar 1 capital formula — business indicator, business indicator component, internal loss multiplier), the risk committee structure (bottom → middle → top) and the board's specific duties, the three lines of defense in full mechanics (including the "corporate operational risk function" and the "Line 1.5" risk-specialist role), and how a bank builds and documents risk appetite and risk culture.</p>`,

  why: `<p>The three lines of defense, first seen in Credit Risk Book 2, gets its fullest treatment here — and reapplies nearly verbatim across cyber risk (R47), AML/CFT, and ERM generally (R46). Master it here once and you answer governance questions in almost any later reading without relearning the framework. The Pillar 1 capital formula (BI → BIC → ILM → ORC) is also directly testable arithmetic, not just narrative recall — expect a numeric question.</p>`,

  intuition: `<p>Think of the three lines as a factory floor, a quality inspector, and an external auditor. Line 1 (the floor workers — the traders, loan officers, and operations staff who actually generate the bank's risk by doing its business) generates and manages risk day-to-day: they build the widget, and they're also the ones who first notice when a machine is jamming. Line 2 (the quality inspector — formally called the corporate operational risk function, or CORF) independently monitors Line 1's work: writes the rulebook, checks the floor workers followed it, and reports up. Critically, the inspector must never pick up a wrench and fix the machine themselves — if Line 2 helps design a control and then later reviews that same control, it is grading its own homework, which is called a "self-review threat" and destroys the entire point of having a second, independent set of eyes. Line 3 (the external auditor — internal audit) doesn't inspect the floor directly at all; it checks that BOTH the floor workers (Line 1) AND the quality inspector (Line 2) are doing their jobs properly, and it keeps its own independent list of what it thinks the bank's biggest risks are, precisely so it isn't just parroting Line 2's opinion back to the board.</p>`,

  eli5: `<p>Imagine a school kitchen. The cooks (Line 1) make the food and are responsible for following the recipe and food-safety rules as they cook. A health inspector employed by the school (Line 2) watches how the kitchen runs, writes the safety rules, and checks the cooks are following them — but the inspector is never allowed to actually cook or plate a dish, because if they did, they'd end up inspecting their own cooking and would look the other way on their own mistakes. Once a year, an outside auditor from the school district (Line 3) shows up, unannounced, and checks BOTH that the cooks followed the rules AND that the health inspector was actually doing real inspections and not just rubber-stamping everything — and this outside auditor keeps their own private list of what they think the biggest risks in that kitchen are, rather than just trusting the in-house inspector's list. In finance: the cooks are the business units generating risk (Line 1), the school health inspector is the corporate operational risk function (Line 2), and the district auditor is internal audit (Line 3) — three separate, hierarchically independent checks so that no single group is both doing the work and grading it.</p>`,

  thinkLike: `<p>A risk manager reading an org chart asks one question first: "who actually owns this risk, and who is checking the owner without also being the owner?" If you can't draw a clean line between the people managing a risk day-to-day and the people independently reviewing that management, the control structure is broken no matter how many committees exist on paper. The exam loves to test this with a scenario where a Line 2 person does something helpful-sounding — sits in on a control-design meeting, "coaches" Line 1 on the right answer, drafts part of a policy Line 1 will later be graded against — and asks you to spot the self-review threat. The correct instinct is: Line 2 can train, question, and challenge Line 1 after Line 1 has already produced its own answer, but Line 2 must never supply the answer itself.</p><p>On the capital side, think of Pillar 1's standardized approach as a two-stage machine: first a size-based estimate of exposure (the business indicator component, BIC, which scales up in percentage terms as the bank gets bigger — 12%, then 15%, then 18% — because regulators believe operational risk grows faster than proportionally with size), then an experience-based adjustment (the internal loss multiplier, ILM, which pushes required capital up if the bank's own 10-year loss history has been worse than its BIC would predict, and down if it's been better). The examiner will hand you raw income-statement-style numbers and expect you to correctly bucket them into ILDC, SC, and FC before summing to BI — the trap is always in which items get "higher of" treatment versus straight addition.</p>`,

  formulas: [
    {
      name: "Business Indicator (BI) — standardized approach",
      math: "\\text{BI} = \\text{ILDC} + \\text{SC} + \\text{FC}",
      note: "ILDC = interest, lease, and dividend component. SC = services component = (higher of fee income, fee expense) + (higher of other operating income, other operating expense). FC = financial component = |net income/loss of banking book| + |net income/loss of trading book|.",
      plain: "BI is a single size-of-business-activity number built by adding together three income-statement-based components, each designed so that gains and losses in the same category can't cancel each other out and understate the bank's true operating scale.",
      derivation: `<p>Each component is deliberately built from absolute values or "higher of" pairs so that a bank cannot shrink its measured BI (and therefore its capital charge) just by netting gains against losses:</p>
      <p>\\[ \\text{SC} = \\max(\\text{fee income}, \\text{fee expense}) + \\max(\\text{other operating income}, \\text{other operating expense}) \\]</p>
      <p>\\[ \\text{FC} = \\left|\\text{net income/loss}_{\\text{banking book}}\\right| + \\left|\\text{net income/loss}_{\\text{trading book}}\\right| \\]</p>
      <p>Summing all three gives the overall activity-size measure: \\( \\text{BI} = \\text{ILDC} + \\text{SC} + \\text{FC} \\).</p>`
    },
    {
      name: "Business Indicator Component (BIC)",
      math: "\\text{BIC} = \\text{BI} \\times \\text{marginal BI coefficient}",
      note: "Coefficient by BI band: 12% for BI < EUR 1 billion; 15% for EUR 1 billion \\le BI \\le EUR 30 billion; 18% for BI > EUR 30 billion. Larger banks face a higher percentage because regulators view operational risk as growing faster than proportionally with size.",
      plain: "BIC converts the size measure BI into a capital-relevant number by applying a bigger percentage the larger the bank's business activity is."
    },
    {
      name: "Loss Component (LC) and Internal Loss Multiplier (ILM)",
      math: "\\text{LC} = 15 \\times \\text{average annual operational losses over the last 10 years}, \\qquad \\text{ILM} = \\ln\\!\\left(e - 1 + \\dfrac{\\text{LC}}{\\text{BIC}}\\right)",
      note: "If LC = BIC, ILM = 1 (the common simplifying assumption regulators use in practice). If LC > BIC (worse-than-typical loss history), ILM > 1 and more capital is required. If LC < BIC, ILM < 1 and less capital is required.",
      plain: "The ILM adjusts the size-based capital estimate up or down depending on whether the bank's own actual 10-year loss experience has been worse or better than what its BIC alone would imply.",
      derivation: `<p>Check the self-consistency the exam relies on: if \\( \\text{LC} = \\text{BIC} \\), then \\( \\dfrac{\\text{LC}}{\\text{BIC}} = 1 \\), so \\[ \\text{ILM} = \\ln(e - 1 + 1) = \\ln(e) = 1 \\] — confirming that a bank whose historical losses exactly match its size-implied estimate gets no adjustment at all.</p>`
    },
    {
      name: "Operational Risk Capital (ORC) — standardized approach",
      math: "\\text{ORC} = \\text{ILM} \\times \\text{BIC}",
      note: "The final Pillar 1 regulatory capital charge for operational risk: the size-based estimate (BIC) scaled by the loss-experience adjustment (ILM).",
      plain: "ORC is the final capital number a bank must hold for operational risk: the size-based BIC estimate multiplied by an experience-based correction factor."
    }
  ],

  concepts: [
    {
      name: "Basel II's three pillars, applied to operational risk",
      def: "Pillar 1 (regulatory capital): minimum capital for unexpected op-risk losses, minimum liquidity coverage ratios, and the BCBS's Principles for Sound Management of Operational Risk — 12 principles covering board-directed culture, a robust ORMF, board sign-off on risk appetite, clear senior-management responsibilities, secure controls, reliable IT, business continuity plans consistent with the ORMF, and external disclosure. Pillar 2 (supervisory review): extra capital for risks not captured in Pillar 1 (concentration, compliance, governance risk, rapid growth), plus voluntary disclosure/self-assessment reviewed by regulators; supervisors also assess solvency, resilience to sudden events, governance processes, and the quality of risk reporting. Pillar 3 (market discipline): mandatory quarterly/annual financial and risk disclosures.",
      intuition: "Pillar 1 is 'how much capital, calculated by formula.' Pillar 2 is 'regulators layer on judgment for anything the formula misses.' Pillar 3 is 'the market gets to see enough to judge you too.'",
      example: "Five of the Basel Core Principles for Effective Banking Supervision are singled out as most relevant to ORM: Principle 8 (forward-looking risk assessment relative to systemic importance), Principle 14 (strong corporate governance), Principle 15 (a risk program that can determine, quantify, assess, monitor, report, and manage significant risks in a timely manner), Principle 25 (an ORMF that considers risk appetite, risk profile, market, and macro factors), and Principle 26 (sufficient internal controls for the bank's risk profile).",
      related: [{ r: 59, label: "R59 — the full Basel II framework in depth" }]
    },
    {
      name: "Pillar 1 capital calculation — standardized approach (SA)",
      def: "Since January 2023, operational risk regulatory capital (ORC) under the SA is calculated in three steps: (1) build the Business Indicator (BI) from income-statement data — BI = ILDC (interest/lease/dividend component) + SC (services component) + FC (financial component); (2) convert BI into the Business Indicator Component (BIC) by multiplying by a percentage that rises with bank size — 12% below EUR 1bn, 15% from EUR 1bn to EUR 30bn, 18% above EUR 30bn; (3) apply the Internal Loss Multiplier (ILM), which scales BIC up or down based on the bank's own 10-year average annual operational losses (via the loss component, LC = 15 × those losses), giving ORC = ILM × BIC.",
      intuition: "Two separate questions get combined into one number: 'how big is this bank's business activity' (BI/BIC) and 'has this specific bank actually lost more or less than a bank its size typically would' (ILM). A big bank with a clean loss history can end up with a smaller final capital charge than a smaller bank that has had repeated large losses.",
      example: "A bank with BI = EUR 900 million (so BIC uses the 12% band) and LC = 15 × EUR 80 million = EUR 1,200 million has LC > BIC, so ILM > 1 and it must hold more capital than the BIC alone would suggest — its own bad loss history is penalizing it.",
      pitfall: "The 'higher of' and absolute-value rules inside SC and FC are easy to get wrong under time pressure — SC adds the higher of fee income/fee expense to the higher of other operating income/expense (it does not net them), and FC uses the absolute value of each book's net income or loss (a trading loss still adds a positive number to FC).",
      related: []
    },
    {
      name: "Committee structure: bottom → middle → top",
      def: "Lowest: numerous small committees per business activity (e.g., personal banking, trading, asset management) or per country, feeding data upward and escalating crucial issues. Middle: the organization risk committee aggregates firm-wide operational risk and reports it regularly to the executive risk committee and board risk committee. Top: the board (enterprise) risk committee oversees both lower levels, gives recommendations to the full board on risk exposures and key risk decisions, evaluates major incidents, handles escalated issues, and must have members with current, relevant risk management experience. 'Enterprise risk' is a large bank's umbrella term spanning operational, fraud, information security, legal/compliance, credit, and market risk together.",
      example: "A committee's mandate is written down in a terms of reference (TOR) document: mission and objective, membership duties, and meeting frequency. Careful documentation of agendas, actions, and the justification for those actions in meeting minutes is itself how a committee demonstrates adequate risk governance to supervisors.",
      related: []
    },
    {
      name: "Board of directors — specific ORM and resilience duties",
      def: "For operational risk management, the board must: approve the ORMF, ensure it is updated on an ongoing basis, and ensure senior management actually executes its policies and procedures at every level of the bank — plus create and articulate a risk-aware culture, supported by training for both board members and staff. For operational resilience specifically, the board must articulate the bank's approach and goals, integrate the bank's risk tolerance with its capacity to withstand disruption, account for how the bank keeps operating under harsh-but-foreseeable stress, receive periodic reports from senior management (especially on major issues), and direct sufficient funding and support toward resilience. Ultimate responsibility for both ORM and resilience sits with the board, not the chief risk officer or senior management, who only carry out delegated tasks.",
      pitfall: "A common trap answer is 'the chief risk officer is ultimately responsible for operational risk' — the CRO is part of senior management and executes delegated tasks, but final accountability sits with the board of directors.",
      related: []
    },
    {
      name: "Three lines of defense — full mechanics",
      def: "Line 1 (the front line / business unit management): the risk owners who generate, measure, and manage their own risk — e.g., the head of the trading desk 'owns' the bank's trading risk, not the risk management department. A proper Line 1 identifies its significant operational risks, builds controls for them, tests whether those controls work, and reports on operational risk within its own business line; when it can't handle a risk itself, or discovers a control weakness, it must escalate to Line 2. Some larger banks add a 'risk champion' or 'risk specialist' role — informally 'Line 1.5' — who sits inside a business group as its risk spokesperson, gathers incident/loss data, and anticipates key risks and controls, but this role stays inside Line 1 and doesn't dilute the business unit's own responsibility. Line 2 (independent risk management, formally the corporate operational risk function, or CORF): develops ORM policy and training, cross-examines Line 1's work with fresh eyes, and expands the bank's monitoring/reporting — and must have ZERO involvement in Line 1's actual risk-taking or control-design work, or it creates a 'self-review threat' where Line 2 ends up grading its own homework. Line 3 (internal audit): a fully independent review of BOTH Lines 1 and 2, kept independent partly by maintaining its own list of the bank's significant risks (which may differ from Line 2's list) and typically by reporting to a nonexecutive board director; per IIA guidance, internal audit should not fully rely on Lines 1/2's own work and instead performs its own independent sampling, only leaning on others' work after first assessing its reliability.",
      intuition: "Line 2 can train, coach through workshops, and challenge Line 1 — but only after Line 1 has already produced its own answer. The moment Line 2 supplies the 'correct' answer up front instead of just reacting to Line 1's answer, independence is gone.",
      example: "A legal department can straddle Line 1 and Line 2 at once: drafting business contracts is a Line 1 (risk-taking/business) activity, while advising on litigation arising from those same contracts is a Line 2 (oversight) activity. Because smaller banks often can't staff two separate legal teams, the same department may do both — but it must then prove independence internally, e.g. by ensuring the employees who wrote the contract are not the same employees who later litigate disputes about it.",
      pitfall: "Line 2 must have ZERO involvement in Line 1 work to avoid a 'self-review threat' — a subtle but frequently tested independence requirement. Also: some areas (legal/compliance, IT security) genuinely straddle multiple lines and can't be cleanly classified into just one, especially at smaller banks facing staffing constraints.",
      related: [{ r: 47, label: "R47 — the same three-lines model applied to cyber risk" }, { r: 18, label: "R18 — the same framework first introduced in Credit Risk" }],
      memory: "Line 1 does. Line 2 watches (with zero hands-on involvement). Line 3 audits both."
    },
    {
      name: "Risk appetite and risk culture",
      def: "The board sets risk appetite — the permitted level of risk, including nonfinancial risks (a genuinely hard problem, since there's no clean dollar-loss metric to anchor to). Setting it requires evaluating the bank's significant risks, defining limits that distinguish acceptable from unacceptable outcomes, and establishing controls tied to those limits; the board risk committee and risk management department carry out the resulting monitoring and testing. Risk appetite statements should be simple, explain WHY certain risks are accepted/declined/minimized (accepting risk earns returns; declining it has an opportunity cost — so appetite is fundamentally a risk-return tradeoff), stay consistent with actual bank operations (a stated 'low tolerance for processing errors' must be backed by real controls, not just words), and increasingly include disruption/impact tolerances for key business services. Underlying metrics are called boundaries or key risk indicators (KRIs) and can be quantitative or qualitative. Governance cascades risk ownership down: risk owners manage the risks named in the appetite statement, controls owners build and run the controls, and metrics owners gather and report the KRIs.",
      example: "Risk culture is linked to ethics ('tone at the top' — board and senior management leading by visible example), a board-level code of conduct binding all board members and employees, and a compensation structure that discourages excessive risk-taking: paying managers significantly in stock options tends to make them more cautious (their own downside is now at stake), while bonus targets tied to unreasonably aggressive growth or profit goals tend to push toward risky, even toxic, behavior.",
      pitfall: "A risk appetite statement is not a running tally of expected losses — expected losses are a modeling output, not a statement of what risk the bank has chosen to accept; the statement itself is built from exposure limits, key controls, and tolerated-incident thresholds.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 40, why: "Establishes what op risk is; this reading establishes who's accountable for managing it." },
      { r: 18, why: "The three lines of defense framework was first introduced in Credit Risk governance." }
    ],
    to: [
      { r: 42, why: "Once governance roles are clear, the next step is actually identifying risk." },
      { r: 47, why: "The three lines of defense reapplies nearly verbatim to cyber risk governance." },
      { r: 46, why: "ERM's governance triad builds directly on this reading's three lines of defense." }
    ],
    confused: [
      { what: "Line 2's independence requirement", how: "Line 2 must have ZERO involvement in Line 1's actual risk-taking work — not just 'limited' involvement — to avoid a self-review threat where the reviewer is checking its own work." }
    ]
  },

  misconceptions: [
    { wrong: "\"Line 2 can have some limited involvement in Line 1's work, as long as it maintains overall independence.\"", right: "Line 2 must have ZERO involvement in Line 1 work — any involvement creates a self-review threat that undermines the entire independence structure. Line 2 may train, question, and challenge Line 1's own answers after the fact, but must never supply those answers itself." },
    { wrong: "\"Every risk area (legal, IT security, etc.) can be cleanly assigned to exactly one line of defense.\"", right: "Some areas (legal/compliance, IT security) genuinely straddle multiple lines and resist clean classification into just one — especially at smaller banks that lack the staff for fully separate teams, where independence must instead be demonstrated internally (e.g., different employees handling the Line 1 vs. Line 2 pieces of the same function)." },
    { wrong: "\"The chief risk officer is ultimately responsible for operational risk management.\"", right: "The board of directors bears ultimate responsibility; the CRO and senior management execute risk management duties that the board delegates to them." },
    { wrong: "\"Risk champions ('Line 1.5') are a fourth, separate line of defense.\"", right: "Risk champions/specialists sit inside Line 1 as a bridge to Line 2 — they are informally called 'Line 1.5' but are formally counted as part of Line 1, and their presence doesn't shift responsibility for the risk away from the business unit itself." }
  ],

  highYield: [
    { stars: 5, what: "Three lines of defense: exact roles, and Line 2's zero-involvement independence requirement.", why: "The most-recycled framework in the entire book — reapplied in R47 (cyber) and R46 (ERM) nearly verbatim." },
    { stars: 4, what: "Pillar 1 standardized-approach capital calculation: BI = ILDC + SC + FC, then BIC (size-tiered %), then ILM (loss-experience adjustment), then ORC = ILM × BIC.", why: "This is real testable arithmetic, not just narrative recall — module quizzes ask you to compute BI from raw income-statement figures and to determine whether ILM is above or below 1." },
    { stars: 3, what: "Basel II's three pillars applied specifically to operational risk.", why: "Sets up the fuller Basel II treatment in R59." },
    { stars: 2, what: "Committee structure (bottom/middle/top), board duties, and risk appetite/culture basics.", why: "Straightforward supporting recall, including that ultimate accountability sits with the board, not the CRO." }
  ],

  recall: [
    { q: "A Line 2 risk manager occasionally helps a business unit design a new trading control, in addition to independently reviewing that unit's risk reports. What governance principle does this violate?", a: "Line 2 must have ZERO involvement in Line 1's actual risk-taking/control-design work to avoid a 'self-review threat.' By helping design the control, the Line 2 manager would later be reviewing (in part) their own work, undermining the independence the three-lines structure is meant to guarantee." },
    { q: "Why can't legal/compliance or IT security always be cleanly assigned to a single line of defense?", a: "These functions often perform both risk-taking/advisory activities (Line 1-like) and independent oversight/policy-setting activities (Line 2-like) simultaneously, depending on context — their dual nature means they can genuinely straddle multiple lines rather than fitting neatly into one. Smaller banks especially may have to combine both roles into a single hybrid department and instead demonstrate independence internally." },
    { q: "A bank has BI = EUR 900 million and a loss component (LC) of EUR 1,200 million (15 × EUR 80 million average annual losses). What happens to its capital requirement, and why?", a: "Because BI is below EUR 1 billion, BIC uses the 12% band. Since LC (EUR 1,200 million) exceeds BIC, the internal loss multiplier ILM is greater than 1, so the bank's Operational Risk Capital (ORC = ILM × BIC) is pushed above the size-based BIC estimate — its own worse-than-typical 10-year loss history increases its required capital." }
  ],

  hooks: [
    { title: "Floor, inspector, auditor", text: "Line 1 works the floor. Line 2 inspects — but never touches the machinery. Line 3 audits whether the floor AND the inspector are both doing their jobs honestly." },
    { title: "Size, then experience", text: "ORC is built in two moves: first size you up (BI → BIC), then adjust for your own track record (ILM). A big clean bank can end up safer, capital-wise, than a smaller bank with a bad loss history." }
  ],

  breakdown: [
    {
      title: "Basel II's three pillars, applied to operational risk",
      points: [
        "Pillar 1 — Regulatory capital: minimum capital for unexpected op-risk losses, minimum liquidity coverage ratios, and the BCBS's 12 Principles for Sound Management of Operational Risk.",
        "Pillar 2 — Supervisory review: extra capital for risks Pillar 1 doesn't capture (concentration, compliance, governance, rapid growth), plus voluntary disclosure/self-assessment reviewed by regulators.",
        "Pillar 3 — Market discipline: mandatory quarterly and annual financial and risk disclosures so the market itself can impose discipline."
      ]
    },
    {
      title: "Risk committee structure: bottom → middle → top",
      points: [
        "Lowest level — numerous small committees per business activity or country, feeding firm-wide data upward and escalating crucial issues.",
        "Middle level — the organization risk committee aggregates firm-wide operational risk and reports it regularly to the executive and board risk committees.",
        "Top level — the board (enterprise) risk committee oversees both lower levels, recommends decisions to the full board, evaluates major incidents, and must have members with current, relevant risk experience."
      ]
    },
    {
      title: "Three lines of defense",
      points: [
        "Line 1 (front line / business unit, plus informal 'Line 1.5' risk champions) — generates, measures, and manages its own risk; escalates weaknesses to Line 2.",
        "Line 2 (corporate operational risk function, CORF) — sets ORM policy, independently cross-examines Line 1's work, must have ZERO hands-on involvement in Line 1's work to avoid a self-review threat.",
        "Line 3 (internal audit) — fully independent review of both Lines 1 and 2, keeps its own separate list of significant risks, typically reports to a nonexecutive board director."
      ]
    },
    {
      title: "Pillar 1 capital calculation steps (standardized approach)",
      points: [
        "Step 1 — Build the Business Indicator: BI = ILDC + SC + FC, using 'higher of' pairs and absolute values so netting can't shrink the measure.",
        "Step 2 — Convert to the Business Indicator Component: BIC = BI × a percentage that rises with size (12% / 15% / 18%).",
        "Step 3 — Apply the Internal Loss Multiplier: ILM = ln(e − 1 + LC/BIC), where LC = 15 × the bank's own 10-year average annual operational losses.",
        "Step 4 — Compute Operational Risk Capital: ORC = ILM × BIC."
      ]
    }
  ],

  quiz: [
    {
      q: "Under the three lines of defense model, why must Line 2 have zero involvement in Line 1's actual risk-taking work?",
      options: [
        "Because regulators cap the total headcount allowed in risk management functions",
        "Because any involvement would create a self-review threat, where Line 2 ends up independently reviewing work it helped produce",
        "Because Line 1 employees are not permitted to communicate with Line 2 under banking secrecy rules",
        "Because Line 2's only legal duty is external financial reporting, not internal risk oversight"
      ],
      answer: 1,
      why: "Involvement in Line 1's work means Line 2 would later be reviewing its own contribution, destroying the independence the whole structure depends on. The 'headcount cap' and 'external reporting only' answers are not real rules; the 'banking secrecy' answer confuses independence with a communication ban — Line 2 and Line 1 must communicate (e.g., in training and challenge sessions), they just can't co-produce the work being reviewed."
    },
    {
      q: "A bank's legal department both drafts business contracts and litigates disputes arising from those same contracts, because the bank is too small to staff two separate teams. What must the bank demonstrate to satisfy BCBS expectations?",
      options: [
        "That the legal department is renamed to avoid confusion with Line 1 or Line 2",
        "That the same employees who draft the contracts also litigate disputes about them, for continuity",
        "That the drafting (Line 1) and litigation (Line 2) duties are independent within the department, e.g. performed by different employees",
        "That the legal department reports only to Line 3 internal audit"
      ],
      answer: 2,
      why: "The BCBS mandates clarity in delineating duties and demonstrating independence even inside a combined/hybrid function — typically by ensuring different employees perform the Line 1 and Line 2 pieces of the work. The 'same employees do both, for continuity' answer is the opposite of what's required; the renaming and audit-reporting answers aren't real requirements from the source."
    },
    {
      q: "A bank has BI = EUR 900 million and average annual operational losses of EUR 80 million over the last 10 years. What is the loss component (LC), and is the resulting ILM above, at, or below 1?",
      options: [
        "LC = EUR 80 million; ILM below 1",
        "LC = EUR 1,200 million; ILM above 1, since LC exceeds BIC",
        "LC = EUR 900 million; ILM exactly 1, since LC equals BI",
        "LC = EUR 1,200 million; ILM below 1, since losses reduce required capital"
      ],
      answer: 1,
      why: "LC = 15 × EUR 80 million = EUR 1,200 million. With BI = EUR 900 million (under the EUR 1bn threshold), BIC uses the 12% band, so BIC = EUR 108 million, which is far less than LC. Since LC > BIC, ILM > 1, meaning the bank's capital requirement is scaled UP, not down — the 'ILM below 1, since losses reduce required capital' answer reverses the direction of the adjustment, a very common trap."
    },
    {
      q: "For a large bank, BI = EUR 1,070 million, made up of ILDC = EUR 740 million, and a services component built from fee income of EUR 185 million, fee expense of EUR 60 million, other operating income of EUR 45 million, and other operating expense of EUR 30 million. What is the services component (SC)?",
      options: [
        "EUR 340 million (sum of all four figures)",
        "EUR 230 million (higher of fee income/fee expense, plus higher of other operating income/expense)",
        "EUR 125 million (fee income minus fee expense, plus other operating income minus expense)",
        "EUR 185 million (fee income only)"
      ],
      answer: 1,
      why: "SC = max(fee income, fee expense) + max(other operating income, other operating expense) = EUR 185m + EUR 45m = EUR 230 million. The formula deliberately does not net income against expense (ruling out the 'fee income minus fee expense' answer) and does not simply sum every figure (ruling out the 'sum of all four figures' answer) or take only one line item (ruling out the 'fee income only' answer) — it takes the higher side of each pair."
    },
    {
      q: "Which of the following is a role of internal audit (Line 3) that most clearly distinguishes it from Line 2?",
      options: [
        "Internal audit develops the bank's ORM policies and procedures",
        "Internal audit maintains its own separate list of the bank's significant risks, which may differ from Line 2's list",
        "Internal audit is responsible for training Line 1 employees on risk management tools",
        "Internal audit approves the bank's risk appetite statement on behalf of the board"
      ],
      answer: 1,
      why: "Keeping an independent risk list (rather than simply adopting Line 2's list) is a specific mechanism the IIA guidance highlights for preserving Line 3's independence from risk management. The 'develops ORM policy' and 'trains Line 1' answers describe Line 2 duties, and 'approves risk appetite' is a board duty, not an internal audit function."
    },
    {
      q: "Which statement about a bank's risk appetite statement is most accurate?",
      options: [
        "It should include a running total of the bank's expected losses across all business lines",
        "It should explain why the bank accepts, declines, or minimizes specific risks, framed around the risk-return tradeoff",
        "It is set independently by the chief risk officer without board involvement",
        "It applies only to financial risks, since nonfinancial risks cannot be captured in a risk appetite framework"
      ],
      answer: 1,
      why: "Per BCBS guidance, risk appetite statements should explain the reasoning behind accepting, declining, or minimizing risks because accepting risk earns returns and declining risk has an opportunity cost. A running total of expected losses is not a standard component of the statement itself; the board — not the CRO alone — sets risk appetite (ruling out the 'CRO sets it independently' answer); and nonfinancial risks are explicitly acknowledged as a hard but necessary part of appetite-setting (ruling out the 'financial risks only' answer)."
    }
  ],

  sources: [
    { title: "Basel Committee — Principles for the Sound Management of Operational Risk", url: "https://www.bis.org/publ/bcbs195.htm", note: "The BCBS source document behind the 12 Pillar-1 principles referenced in this reading." },
    { title: "Three lines of defense model — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_lines_of_defence", note: "General background on the governance model, useful for cross-checking terminology against other risk domains (e.g., credit risk in Book 2)." },
    { title: "Basel III: Finalising post-crisis reforms (operational risk standardized approach)", url: "https://www.bis.org/bcbs/publ/d424.htm", note: "The BIS text introducing the standardized approach (BI, BIC, ILM) used for the Pillar 1 capital calculation." },
    { title: "Federal Reserve — Supervisory guidance on governance and risk management", url: "https://www.federalreserve.gov/supervisionreg/topics/risk-management.htm", note: "A regulator's-eye view of board and committee risk-governance expectations, complementary to the BCBS material in this reading." }
  ],

  pdf: { book: 3, query: "R41 answers \"who's in charge of operational risk?\" at three levels" },

  summary: `<p><strong>Basel II pillars for op risk</strong>: Pillar 1 (capital — including the standardized-approach formula: BI = ILDC + SC + FC → BIC = BI × size-tiered % → ILM = ln(e − 1 + LC/BIC) → ORC = ILM × BIC), Pillar 2 (supervisory review, extra capital for uncaptured risks), Pillar 3 (disclosure). <strong>Committee structure</strong>: bottom (per-business/country small committees) → middle (organization risk committee) → top (board risk committee, ultimate accountability). <strong>Three lines of defense</strong>: Line 1 (risk owners, plus informal "Line 1.5" risk champions, generate/manage risk), Line 2 (corporate operational risk function, independent oversight, ZERO involvement in Line 1 work — avoids self-review threat), Line 3 (internal audit, independently reviews both prior lines, own risk list, typically reports to a nonexecutive director). Some functions (legal, IT security) genuinely straddle multiple lines, especially at smaller banks. <strong>Risk appetite/culture</strong>: board sets limits and tolerances framed around the risk-return tradeoff; culture tied to ethics, tone at the top, and non-perverse compensation.</p>`
});
