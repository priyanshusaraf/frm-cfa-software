export default ({
  book: 3, reading: 49,
  session: "Operational Risk Focus Areas",
  title: "Case Study: Financial Crime and Fraud",
  tagline: "AML/CFT is the three-lines-of-defense model applied to knowing your customer well enough to stop criminal money — anchored by the $140 million 2022 USAA fine for weak controls, not proven theft.",

  teaches: `<p>This reading builds a precise vocabulary for financial crime, then tests it against one real case. You will learn: the umbrella definition of <strong>financial crime</strong> (fraud, money laundering, and terrorism financing together); the exact Basel Committee definitions of <strong>internal fraud</strong> and <strong>external fraud</strong>, including their sub-categories; the <strong>three lines of defense</strong> as applied specifically to anti-money-laundering / countering the financing of terrorism (AML/CFT), not just operational risk in general; the <strong>customer due-diligence (CDD)</strong> factors and identification documents banks must collect under FATF standards; how a <strong>cross-border banking group</strong> must run AML/CFT consistently across jurisdictions; money laundering's <strong>three phases</strong> — placement, layering, integration — with the actual techniques criminals use at each step (e.g. "smurfing"); the shared <strong>four-control framework</strong> (selection, prevention, detection, deterrents) that both fraud and AML programs are built from; and the <strong>USAA Federal Savings Bank</strong> case: a $140 million fine from FinCEN and the OCC, imposed for control failures with no proven theft.</p>`,

  why: `<p>The USAA case is the cleanest illustration in the book that regulatory penalties can follow from CONTROL DEFICIENCIES ALONE — no proven theft or loss is required. This matters because it recalibrates how you should think about "is our AML program good enough" — the bar is control adequacy, not just absence of losses. It also matters for the exam because GARP consistently sets up trap answers that assume a fine must trace to an actual criminal event; knowing the USAA facts cold (five years of gaps, a broken alert system, understaffed review) is what lets you eliminate those traps confidently rather than by guessing.</p>`,

  intuition: `<p>Money laundering follows a predictable three-phase journey. <strong>Placement</strong> is getting illicit cash into the legal financial system in the first place — for example depositing it through cash transfers, false invoicing, or shell structures like trusts and offshore companies. Because criminals know that a single very large cash deposit trips automatic reporting thresholds, they often use <strong>smurfing</strong>: breaking one large sum into many small transactions (multiple deposits, multiple accounts, multiple people) that each individually looks unremarkable. This is the phase where the money is most physically exposed and therefore the easiest for a bank to catch — cash moving through tellers and branches leaves a visible, structurable pattern. <strong>Layering</strong> comes next: the criminal deliberately runs the money through a chain of complex transactions and accounts, often across jurisdictions, purely to sever the paper trail between the funds and their criminal source. This is the hardest phase to catch, precisely because that is the phase's whole design goal — every extra hop is engineered to make "where did this come from" unanswerable. <strong>Integration</strong> is the last step: the now-laundered money is reintroduced into the legitimate economy — buying real assets, paying "consulting fees," making fake payroll, dividend, or loan payments — so that by the time it surfaces, it looks exactly like ordinary legitimate wealth with no distinguishing trace left. AML controls are strongest and most effective at placement, weakest at layering, and largely irrelevant by integration — which is exactly why regulators focus so much supervisory attention on transaction monitoring at the deposit/onboarding stage rather than trying to trace money after it has already been laundered.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Financial crime (the umbrella term)",
      def: "The U.K. Financial Conduct Authority defines financial crime broadly as any criminal conduct relating to money or financial services/markets, including: (a) fraud or dishonesty, (b) misconduct in or misuse of information relating to a financial market, (c) handling the proceeds of crime, or (d) financing of terrorism. Internal fraud, external fraud, money laundering (ML), and terrorism financing (TF) all fall under this umbrella, and all four are also covered by the Basel Committee's definition of operational risk.",
      intuition: "Think of 'financial crime' as the parent category and 'internal fraud,' 'external fraud,' 'money laundering,' and 'terrorism financing' as its four named children — this reading works through each child in turn.",
      related: [{ r: 40, label: "R40 — the Basel operational-risk event-type taxonomy this sits inside" }]
    },
    {
      name: "Internal fraud vs. external fraud (precise Basel definitions)",
      def: "Internal fraud: 'losses due to acts of a type intended to defraud, misappropriate property or circumvent regulations, the law or company policy, excluding diversity/discrimination events, which involve at least one internal party.' It splits into unauthorized activities (employees knowingly breaking laws/policy — unauthorized transactions, not reporting transactions, mismarking trading positions, sharing passwords or confidential client data) and theft and fraud (embezzlement, extortion, bribery, forgery, smuggling, tax evasion). External fraud: 'losses due to acts of a type intended to defraud, misappropriate property or circumvent the law, by a third party' — identical intent, but committed with no internal complicity. It splits into theft and fraud (robbery, forgery) and systems security (hacking, stealing information, cybersecurity breaches).",
      intuition: "Ask one question: was even one employee, contractor, or insider complicit? If yes, however small their role, it's internal fraud. If the act was carried out entirely by outsiders, it's external fraud.",
      example: "A trader hiding losing positions from risk management (unauthorized activity, internal) versus a criminal ring phishing customer login credentials to drain accounts (systems security, external).",
      pitfall: "The 'excluding diversity/discrimination events' clause in the internal fraud definition is a specific, testable carve-out — a discrimination lawsuit against the firm is NOT classified as internal fraud under this Basel definition even though it involves internal parties acting improperly.",
      related: [{ r: 40, label: "R40 — internal/external fraud as two of the seven Basel event categories" }]
    },
    {
      name: "Three lines of defense for AML/CFT",
      def: "Line 1 — business units (front office / customer-facing staff, e.g. tellers and branch managers): identify, assess, and control ML/FT risk day to day, following written, communicated policies, trained to spot and report suspicious transactions. Line 2 — the chief AML/CFT officer: engages in ongoing monitoring, is the internal/external point of contact for AML/CFT issues (including financial intelligence units), and — to avoid a conflict of interest — must NOT also hold business-line responsibilities or own data protection/internal audit; may double as chief risk officer and reports directly to senior management or the board. Line 3 — internal audit (with external audit playing a supporting role): audits the bank's AML/CFT policies and their adherence.",
      intuition: "This is the exact same Line 1/Line 2/Line 3 shape from R41's general operational-risk governance model, just staffed with AML-specific roles: the people who touch the customer, the specialist who watches the whole program, and the auditor who checks that both did their job.",
      pitfall: "Line 1 staff (tellers, branch managers) are sometimes mistaken for 'unimportant' junior employees — but they ARE the first line of defense and their suspicious-activity reporting is the front-line control the whole AML program depends on.",
      related: [{ r: 41, label: "R41 — the three lines of defense model this reapplies" }]
    },
    {
      name: "Customer risk factors & identification (FATF standards)",
      def: "To assess ML/FT risk, a bank must weigh a customer's: background; occupation (including public/high-profile figures); business activities; sources of income and wealth; country of origin; country of residence (if different); choice and use of the bank's products/services; nature and purpose of the account; and linked accounts. FATF Recommendation 10 defines a 'customer' as anyone entering a business relationship or an occasional transaction with the bank. Identification/verification documentation includes passports, ID cards, driving licenses, and account files such as transaction records and business correspondence.",
      intuition: "The bank is trying to build a normal-behavior profile for each customer BEFORE the account opens, so that later transactions that deviate from that profile stand out as unusual or suspicious.",
      pitfall: "Banks must also identify/verify persons acting ON BEHALF OF beneficial owners — not just the named account holder. A written declaration of a beneficial owner's identity is allowed but the bank may NOT rely solely on that declaration, and inability to interview the customer in person is never a valid reason to skip identification.",
      example: "Enhanced due diligence is specifically required for accounts with large balances plus regular cross-border wire transfers, and for politically exposed persons (PEPs) — especially foreign PEPs — because their public profile and access to public funds raises corruption/bribery risk.",
      related: []
    },
    {
      name: "Cross-border AML/CFT groups",
      def: "A banking group operating in multiple jurisdictions must: integrate customer/beneficial-owner/fund information group-wide; monitor significant relationships on a consolidated basis regardless of on-/off-balance-sheet treatment (including assets under management or fiduciary bases); appoint one group-wide chief AML/CFT officer who ensures compliance across all borders; and coordinate group-wide information sharing (subject to local data-protection law), with the head office kept informed about high-risk customers. If the host jurisdiction's rules are stricter than the home country's, the branch/subsidiary must adopt the STRICTER host-jurisdiction rules. If a host country actively blocks proper implementation of FATF standards, the chief AML/CFT officer must inform home supervisors — and the bank may ultimately need to close operations there.",
      intuition: "The group can't let its weakest-regulated branch become the soft entry point for launderers — policies flow group-wide, and wherever local law is tougher than the home standard, the tougher rule wins.",
      example: "Supervisors follow FATF Recommendation 26 and the Core Principles for Effective Banking Supervision, applying a risk-based approach, and must make sure the stricter of two jurisdictions' requirements is the one actually applied.",
      related: []
    },
    {
      name: "Money laundering's three phases",
      def: "Placement (introduce illicit funds into the financial system, typically via cash transfers, false invoicing, trusts, or offshore companies; criminals often use 'smurfing' — many small transactions instead of one large one — to stay below AML reporting thresholds) → layering (obscure the funds' origin through a deliberately complex chain of transactions and multiple accounts, to break the audit trail) → integration (reintroduce the now-'clean' funds into the legitimate economy through asset purchases, or fake payroll/loan/dividend payments designed to look like ordinary income).",
      related: [{ r: 40, label: "R40 — money laundering as one of the seven Basel operational-risk event categories" }],
      memory: "Placement: get it in. Layering: hide the trail. Integration: spend it clean."
    },
    {
      name: "Terrorism financing (TF)",
      def: "Providing or using funds with the intent or knowledge that they will be used for terrorist activities. Distinct from money laundering (which conceals the origin of already-illicit funds), TF can involve funds from entirely legitimate sources that are then directed toward an illegitimate, violent purpose — which is why AML and CFT (countering the financing of terrorism) are always paired together in bank policy even though the two risks are conceptually different.",
      related: []
    },
    {
      name: "Four-control framework (shared: internal fraud, external fraud, AML)",
      def: "Selection (screen who you let in — for AML this is know-your-customer/KYC due diligence and verifying the origin of customer funds; for staff, this is background-checking employees, contractors, and third parties before onboarding) → prevention (segregate duties, limit access and authorizations, apply a risk-based approach with tiered customer risk categories — low/medium/high — and employee training) → detection (strong governance, a working transaction-monitoring system, alerts for abnormal activity, data reconciled against sanctions lists such as OFAC's) → deterrents (sanctions, lawsuits, disciplinary action, account closure, or referral to financial intelligence agencies).",
      intuition: "The same four-step shape — who do we let in, how do we stop bad acts before they happen, how do we catch what slips through, how do we punish it — is reused across internal fraud, external fraud, and AML because they are all, structurally, the same control problem: keep bad actors and bad money out, and catch what gets past the gate.",
      example: "RegTech firms now automate much of the 'Selection' step with machine-learning-driven customer profiling, which speeds up onboarding and PEP-list screening; fully digital 'challenger banks' lean heavily on this automation, which is exactly why regulators scrutinize the quality of their controls more closely.",
      related: []
    },
    {
      name: "USAA FSB (March 2022)",
      def: "USAA Federal Savings Bank — the banking arm of USAA, a Texas-based financial services group founded in 1922 that primarily serves U.S. military members — was fined $140 million by U.S. federal regulators (FinCEN, the Financial Crimes Enforcement Network, and the OCC, the Office of the Comptroller of the Currency, the national banking regulator). The fine responded to at least five years (2016–2021) of an AML program that regulators said 'willfully' failed to meet Bank Secrecy Act (BSA)/AML minimum standards, with inadequate monitoring and reporting of suspicious activity as the bank's compliance program failed to keep pace with its account growth.",
      example: "Concretely: due to staffing shortages the bank used third-party contractors to monitor accounts but failed to adequately train them in AML compliance; a new transaction-monitoring system introduced in 2021 was overly sensitive and generated far more alerts than staff could review — by year-end 2021 there were close to 90,000 unreviewed alerts and nearly 7,000 unreviewed cases. Following the sanctions, firms typically run AML remediation programs ('lookbacks') reviewing client information and re-reporting suspicious activity.",
      pitfall: "The USAA fine is a clean example that regulatory penalties can follow from CONTROL DEFICIENCIES ALONE — no proven theft or loss event is required. Don't assume a regulatory fine implies an actual quantifiable loss occurred; the fine was for the program being inadequate, not for any specific case of fraud or laundering being proven.",
      related: [],
      memory: "USAA was fined for having weak locks, not for proving anyone actually broke in."
    }
  ],

  connections: {
    from: [
      { r: 41, why: "The three lines of defense model is directly reapplied to the AML/CFT context." },
      { r: 40, why: "Internal and external fraud were already named as two of the seven Basel event categories." }
    ],
    to: [
      { r: 51, why: "Third-party risk management connects to KYC-style due diligence obligations." }
    ],
    confused: [
      { what: "Internal fraud vs external fraud", how: "Internal fraud requires at least ONE internal party's involvement; external fraud is committed by third parties ONLY, with no internal complicity." },
      { what: "Regulatory fine vs proven loss event", how: "A fine (like USAA's) can result purely from CONTROL DEFICIENCIES — no proven theft, fraud, or quantifiable loss is required for a bank to be penalized." },
      { what: "Money laundering vs terrorism financing", how: "Money laundering hides the criminal ORIGIN of already-illicit funds; terrorism financing is about the intended criminal USE of funds, which can start out perfectly legitimate — the two risks are conceptually different even though AML/CFT programs address them together." },
      { what: "Placement vs. smurfing", how: "Smurfing is not a separate fourth phase — it is a specific TECHNIQUE (many small transactions instead of one large one) used within the placement phase to dodge reporting thresholds." }
    ]
  },

  misconceptions: [
    { wrong: "\"A bank can only be fined for AML failures if a specific instance of money laundering is proven.\"", right: "USAA was fined for failing to meet BSA/AML minimum standards and inadequate suspicious-activity monitoring — CONTROL DEFICIENCIES ALONE were sufficient grounds for the penalty, with no specific proven theft or laundering event required." },
    { wrong: "\"Money laundering's three phases are equally easy (or hard) for regulators to detect.\"", right: "Placement is generally the riskiest phase for launderers and easiest to detect (cash entering the system is conspicuous and subject to reporting thresholds); layering is the hardest to catch (complex, multi-account transactions are deliberately designed to obscure origin); by integration, the funds look like ordinary wealth." },
    { wrong: "\"USAA's fine was primarily about a specific fraud loss that occurred in 2021.\"", right: "The regulators' findings centered on a persistent, multi-year (2016–2021) deficiency in AML controls — an overwhelmed alert system and undertrained contractors — not any single proven theft, fraud, or laundering loss." },
    { wrong: "\"Smurfing means breaking one crime into several different criminal schemes.\"", right: "Smurfing specifically means splitting one large sum of money into many small transactions or deposits, made to stay under AML reporting thresholds during the placement phase." }
  ],

  highYield: [
    { stars: 4, what: "USAA case: fined $140 million by FinCEN/OCC for control deficiencies alone (2016-2021), no proven loss required.", why: "The single most important takeaway of this reading — a precise, frequently tested principle, including the specific regulators and dollar figure." },
    { stars: 4, what: "Money laundering's three phases (placement/layering/integration), including smurfing at placement.", why: "A foundational AML vocabulary, reliably tested — expect a question that asks you to identify which phase a described activity belongs to." },
    { stars: 3, what: "Internal vs. external fraud precise definitions and their sub-categories.", why: "A clean two-way distinction with a specific inclusion/exclusion rule (discrimination events excluded) and named sub-types (unauthorized activities/theft-and-fraud vs. theft-and-fraud/systems security)." },
    { stars: 3, what: "Enhanced due diligence triggers: large-balance cross-border wire accounts and politically exposed persons (PEPs).", why: "A specific, testable pair of trigger conditions the exam likes to test with a scenario question." },
    { stars: 2, what: "Three lines of defense for AML/CFT and cross-border group requirements (stricter jurisdiction wins).", why: "Supporting structural detail, reapplies R41's framework with AML-specific roles." },
    { stars: 2, what: "Four-control framework: selection → prevention → detection → deterrents.", why: "Reused across internal fraud, external fraud, and AML — recognizing this shared shape saves memorization effort." }
  ],

  recall: [
    { q: "USAA Federal Savings Bank was fined in 2022 without any specific proven theft or laundering incident being cited. What does this reveal about regulatory enforcement standards?", a: "It shows that regulators can and do penalize banks purely for CONTROL DEFICIENCIES — failing to meet BSA/AML minimum standards and having inadequate suspicious-activity monitoring/reporting processes is sufficient grounds for a fine, independent of whether any actual money laundering or loss is proven to have occurred." },
    { q: "Why is the 'layering' phase of money laundering considered the hardest to detect, compared to placement and integration?", a: "Placement involves illicit cash physically entering the financial system, which is relatively conspicuous and subject to reporting thresholds. Layering deliberately obscures the funds' origin through complex, multi-step transactions specifically designed to break the audit trail — making it the phase where detection is intentionally hardest. By integration, the funds already appear as legitimate wealth, blending into normal economic activity." },
    { q: "What specific technique do criminals use during the placement phase to avoid triggering AML reporting thresholds, and how does it work?", a: "Smurfing: splitting what would be one large transaction into many small transactions or deposits, each individually below the reporting threshold, so the activity does not automatically trigger regulatory scrutiny." },
    { q: "A bank employee mismarks trading positions to hide losses from risk management, with no outside party involved. Is this internal or external fraud, and why does that classification matter for the four-control framework?", a: "Internal fraud — it is an 'unauthorized activity' committed by an employee (at least one internal party is involved, and it is not a diversity/discrimination event). The classification matters because internal fraud management leans more heavily on the 'selection' control (screening who you hire) and 'prevention' controls like segregation of duties, whereas external fraud management focuses more on detection and law-enforcement partnership against outside criminals." }
  ],

  hooks: [
    { title: "Weak locks, not proven burglary", text: "USAA's fine is the reading's central lesson: regulators can penalize you for having weak locks on the door, whether or not anyone actually broke in." },
    { title: "Get it in, hide the trail, spend it clean", text: "Placement, layering, integration — three phases, each progressively harder for regulators to catch, ending with money that looks completely legitimate." },
    { title: "90,000 alerts nobody read", text: "USAA's own transaction-monitoring system flagged the risk — it just couldn't be reviewed fast enough, leaving almost 90,000 alerts and nearly 7,000 cases sitting unreviewed by the end of 2021. A control that fires but is never checked is functionally no control at all." }
  ],

  eli5: `<p>Imagine an apartment building whose management company installs door alarms on every unit but then never actually staffs the front desk to respond when an alarm goes off — alarms keep beeping, nobody checks, and the pile of unanswered alerts just grows. When the city inspector shows up, they don't need to find an actual burglary to write the building up: an unmonitored alarm system is itself a violation, because it means the building was never really protected, whether or not a break-in happened to occur. That is exactly USAA's situation — its transaction-monitoring "alarm system" kept firing (eventually tens of thousands of unreviewed alerts), but the staff and training behind it couldn't keep up, so regulators fined the bank for the broken process itself, not for a proven theft.</p>`,

  thinkLike: `<p>A risk manager reading this case does not ask "did USAA actually launder money for a criminal?" — that question is beside the point, and answering it is not the regulator's job in this action. The question that matters is "did the bank's control framework — selection, prevention, detection, deterrents — actually operate as designed, at the scale the business had grown to?" USAA's account base grew faster than its compliance capacity; the monitoring system existed on paper (and even technically functioned, generating alerts) but the humans behind it were understaffed and undertrained, so the control existed in name only. That gap between "we have a policy/system" and "the policy/system actually gets executed" is the single most tested idea across this whole operational-risk study session (see also the Equifax patch-management case in R48) — GARP consistently rewards candidates who can distinguish a documented (directive) control from one that is actually operating (preventive/detective).</p><p>On the exam, this framing shows up as scenario questions designed to tempt you into picking an answer that requires a proven loss or a specific criminal act — resist that pull. If the facts describe understaffing, an overwhelmed alert queue, undertrained contractors, or a compliance function that didn't scale with growth, the correct answer is almost always "persistent/systemic control deficiency," not "a specific fraud event."</p>`,

  breakdown: [
    {
      title: "Money laundering's three phases",
      points: [
        "Placement — get illicit funds physically into the financial system, often via cash transfers, false invoicing, trusts, or offshore companies; smurfing (many small transactions) is used to dodge reporting thresholds. Riskiest phase for the launderer, easiest for the bank to detect.",
        "Layering — run the funds through a deliberately complex chain of transactions and multiple accounts to sever the audit trail back to the criminal source. The hardest phase for a bank or regulator to catch, by design.",
        "Integration — reintroduce the now-'clean' money into the legitimate economy via asset purchases, or fake payroll, loan, or dividend payments, so it is indistinguishable from ordinary legitimate wealth."
      ]
    },
    {
      title: "The four-control framework (internal fraud, external fraud, and AML all share this shape)",
      points: [
        "Selection — screen who gets in: due diligence on employees/contractors/third parties before hiring; for AML, this is know-your-customer (KYC) verification and confirming the legitimate origin of customer funds.",
        "Prevention — stop bad acts before they happen: segregate duties, limit access rights and authorizations, apply a risk-based approach with tiered customer risk categories, and train staff.",
        "Detection — catch what gets through: strong governance, a working transaction-monitoring system, alerts on abnormal activity, and reconciliation against external sanctions lists (e.g. OFAC).",
        "Deterrents — punish and discourage: sanctions, lawsuits, disciplinary action, account closure, or referral to financial intelligence agencies."
      ]
    },
    {
      title: "Three lines of defense for AML/CFT",
      points: [
        "Line 1 — business units (front office, customer-facing staff, e.g. tellers and branch managers): identify, assess, and control ML/FT risk day to day per written policy; report suspicious transactions.",
        "Line 2 — chief AML/CFT officer: ongoing monitoring, internal/external point of contact, must be independent of business-line duties, data protection, and internal audit; reports to senior management or the board.",
        "Line 3 — internal audit (with external audit in a supporting role): audits the bank's AML/CFT policies and how consistently they are actually followed."
      ]
    },
    {
      title: "Cross-border AML/CFT group obligations",
      points: [
        "Integrate customer, beneficial-owner, and transaction fund information group-wide.",
        "Monitor significant relationships, balances, and activity on a consolidated basis regardless of on-/off-balance-sheet treatment (including AUM or fiduciary bases).",
        "Appoint one group-wide chief AML/CFT officer responsible for cross-border compliance.",
        "Coordinate group-wide information sharing, subject to local data-protection law, with the head office informed of high-risk customers.",
        "Apply the STRICTER of the home-country and host-country rules wherever they differ; if a host country blocks proper FATF implementation, escalate to home supervisors (and, if necessary, close operations there)."
      ]
    }
  ],

  quiz: [
    {
      q: "USAA Federal Savings Bank was fined $140 million in March 2022. What was the primary basis for the fine?",
      options: [
        "A confirmed, specific case of money laundering totaling $140 million",
        "Persistent deficiencies in its AML program that failed to meet Bank Secrecy Act minimum standards, with no proven theft or loss required",
        "A single major cybersecurity breach that exposed customer account data",
        "Failure to appoint any chief AML/CFT officer for a five-year period"
      ],
      answer: 1,
      why: "USAA was fined for control deficiencies alone — an ineffective, under-resourced AML program (2016-2021) that didn't meet BSA/AML minimum standards, evidenced by tens of thousands of unreviewed alerts. The 'confirmed $140 million money laundering case' answer is the classic trap: it assumes a proven loss event, which the reading explicitly says was NOT the basis for the fine. The 'cybersecurity breach' answer confuses this case with a cyber-risk case study (a different reading). The 'never appointed a chief AML/CFT officer' answer is factually wrong — USAA had AML processes and even a monitoring system, they were simply inadequate."
    },
    {
      q: "Which sequence correctly states the three phases of money laundering, in order?",
      options: [
        "Layering, placement, integration",
        "Placement, integration, layering",
        "Placement, layering, integration",
        "Integration, layering, placement"
      ],
      answer: 2,
      why: "The correct order is placement (funds enter the system) → layering (origin obscured through complex transactions) → integration (funds re-enter the legitimate economy). Any answer that puts integration before layering, or layering before placement, reverses the logical flow: you cannot obscure the trail of money that hasn't entered the system yet, and you cannot spend 'clean' money before it has actually been cleaned."
    },
    {
      q: "A customer makes a series of frequent, small deposits into a business account, each individually below the bank's AML reporting threshold. This behavior is most likely an example of:",
      options: [
        "Layering",
        "Smurfing during the placement phase",
        "Integration via fake payroll",
        "A politically exposed person's enhanced due diligence trigger"
      ],
      answer: 1,
      why: "This is the textbook description of smurfing: splitting a large sum into many small transactions to stay under reporting thresholds, which occurs during placement (getting the money into the system). It is not layering, because layering is about obscuring an already-placed fund's origin through complex multi-account transactions, not about the initial deposit pattern. It has nothing to do with PEP status or fake payroll (an integration technique)."
    },
    {
      q: "Under the Basel Committee's precise definition, which of the following would NOT be classified as internal fraud?",
      options: [
        "An employee sharing confidential client information with an outside party",
        "A trader mismarking positions to hide losses",
        "A diversity/discrimination lawsuit filed against the firm by an employee",
        "An employee embezzling company funds"
      ],
      answer: 2,
      why: "The Basel definition of internal fraud explicitly EXCLUDES diversity/discrimination events, even though such events involve internal parties. The other three options are textbook internal fraud: sharing confidential data and mismarking positions are 'unauthorized activities,' and embezzlement is 'theft and fraud' — both subcategories of internal fraud."
    },
    {
      q: "Within the four-control framework shared by internal fraud, external fraud, and AML programs, know-your-customer (KYC) due diligence belongs to which control?",
      options: [
        "Prevention",
        "Detection",
        "Selection",
        "Deterrents"
      ],
      answer: 2,
      why: "Selection is about screening who you let into the relationship in the first place — for AML, that is exactly what KYC does: verify identity and the legitimate origin of funds before or as the account relationship begins. Prevention is about controls that operate once the relationship exists (segregation of duties, risk-based tiering); detection is ongoing monitoring for abnormal activity; deterrents are the consequences imposed after something is caught."
    },
    {
      q: "A U.S. banking group's branch operates in a host country whose AML/CFT rules are stricter than the group's home-country standards. According to the reading, what should the branch do?",
      options: [
        "Apply the home-country's standards, since the group's policies should be applied uniformly regardless of local rules",
        "Adopt the stricter host-country requirements",
        "Apply whichever standard the branch's local management prefers, subject to head-office approval",
        "Suspend AML monitoring at that branch until the group can align both jurisdictions' rules"
      ],
      answer: 1,
      why: "The rule is explicit: wherever a host jurisdiction's requirements are stricter than the home country's, the branch or subsidiary must adopt the host jurisdiction's (stricter) standards. Applying the home standard would let the branch under-comply with local law; letting local management choose the standard contradicts the requirement for a group-wide, centrally coordinated policy; and suspending monitoring is never an acceptable response to a jurisdictional conflict."
    }
  ],

  sources: [
    { title: "Money laundering — Wikipedia", url: "https://en.wikipedia.org/wiki/Money_laundering", note: "Background on the placement/layering/integration model and common laundering techniques, including structuring/smurfing." },
    { title: "Financial Crimes Enforcement Network (FinCEN)", url: "https://www.fincen.gov/", note: "The U.S. Treasury bureau that, alongside the OCC, fined USAA FSB — see its enforcement actions page for BSA/AML case details." },
    { title: "Bank Secrecy Act — Investopedia", url: "https://www.investopedia.com/terms/b/bank-secrecy-act.asp", note: "Plain-language explainer of the BSA requirements USAA was found to have violated." },
    { title: "FATF Recommendations — Financial Action Task Force", url: "https://www.fatf-gafi.org/en/topics/fatf-recommendations.html", note: "The source standards (including Recommendation 10 on customer due diligence and Recommendation 26 on supervision) referenced throughout this reading." }
  ],

  pdf: { book: 3, query: "we look at the components of financial crimes and fraud" },

  summary: `<p><strong>Financial crime</strong> is the umbrella term (fraud, dishonesty, market misconduct, handling criminal proceeds, terrorism financing) covering internal fraud, external fraud, money laundering, and terrorism financing. <strong>Internal fraud</strong> (≥1 internal party; excludes discrimination events; splits into unauthorized activities and theft-and-fraud) vs <strong>external fraud</strong> (third party only; splits into theft-and-fraud and systems security). <strong>Three lines of defense</strong> reapplied to AML/CFT: Line 1 (front office, policy execution), Line 2 (chief AML/CFT officer, independent monitoring), Line 3 (audit). <strong>Customer identification</strong> (FATF): background, occupation, income source, country, product usage, beneficial owners — with enhanced due diligence for large cross-border accounts and PEPs. <strong>Cross-border groups</strong>: consolidated monitoring, group-wide AML officer, stricter-jurisdiction-wins, FATF Rec. 26. <strong>Money laundering</strong>: placement (smurfing; easiest to catch) → layering (hardest to catch) → integration (looks clean). <strong>Terrorism financing</strong>: funding intended for terrorist use, potentially from legitimate sources. <strong>Four-control framework</strong> (shared across internal fraud, external fraud, AML): selection (KYC) → prevention → detection → deterrents. <strong>USAA (March 2022)</strong>: fined $140 million by FinCEN/OCC for BSA/AML control deficiencies ALONE over 2016-2021 (understaffed contractors, ~90,000 unreviewed alerts) — no proven theft required, the reading's central lesson.</p>`
});
