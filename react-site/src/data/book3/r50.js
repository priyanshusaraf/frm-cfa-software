export default ({
  book: 3, reading: 50,
  session: "Operational Risk Focus Areas",
  title: "Guidance on Managing Outsourcing Risk",
  tagline: "The regulatory-guidance counterpart to R51's real-world case study — six risk categories, six program elements, and the specific contract clauses regulators expect to see.",

  teaches: `<p>Six risks from outsourcing, the six-part outsourcing risk management program, three due diligence review areas, and the long, testable list of contract provisions.</p>`,

  why: `<p>Outsourcing doesn't eliminate risk — it transforms operational risk into vendor management risk, plus adds concentration and reputational dimensions that a purely internal process wouldn't carry. This reading gives you the regulator's checklist for managing that transformation responsibly.</p><p>The underlying reason regulators care this much: when a bank pays a third party to run part of its operation, the bank is still the one holding the banking license, still the one whose name is on the customer's statement, and still the one the deposit-insurance and consumer-protection regime looks to when something breaks. A vendor cannot be sued by a regulator for violating the Bank Secrecy Act on the bank's behalf — the bank can. So every risk that used to sit inside the bank's own four walls, where the bank could see it and control it directly, now sits one contractual layer removed, at a firm the bank does not employ, does not directly supervise day-to-day, and may not even be able to visit. This reading is the U.S. Federal Reserve's (Board of Governors, "Guidance on Managing Outsourcing Risk," December 2013) answer to the question: given that you cannot see or directly control what the vendor does, what structure of assessment, contract, and monitoring lets you still be accountable for the outcome?</p>`,

  intuition: `<p>You can outsource the ACTIVITY but not the ACCOUNTABILITY — the six-part program (assess, diligence, contract, incentive review, monitor, continuity plan) exists precisely because regulators hold the outsourcing bank responsible for outcomes, regardless of who's actually performing the work.</p><p>Think of it as a chain with three links: <strong>before</strong> you sign anything (risk assessment — should this even be outsourced, and to whom? — plus due diligence on the specific candidate vendor), <strong>at the moment</strong> you sign (the contract, which is where every risk you identified gets converted into an enforceable clause), and <strong>after</strong> you sign (incentive-compensation review, ongoing oversight/monitoring, and a continuity plan for when the vendor itself fails). Miss any one link and the chain doesn't hold: skip the "before" step and you might outsource something that never should have left the building, or pick a vendor nobody vetted; skip the "at signing" step and even a well-chosen vendor has no enforceable obligation to do the things you assumed it would; skip the "after" step and a vendor that looked fine on day one can quietly degrade for years before you notice.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Six risks from outsourcing",
      def: "Compliance, concentration, reputation, country, operational, legal.",
      intuition: "Each risk answers a different question about what could go wrong when someone else does the work: is the vendor breaking rules (compliance)? are you dangerously reliant on too few vendors (concentration)? will the vendor's mistakes make customers blame you (reputation)? is the vendor's home country itself a risk (country)? will the vendor's internal breakdowns cost you money directly (operational)? will you get sued because of what the vendor did (legal)?",
      example: "Bank Inc. (based in the United States) hires Service Co. (based in France) to manage a large volume of confidential customer data. A computer glitch at Service Co. causes an accidental public disclosure of that data. Bank faces: compliance risk (data-privacy rules were breached), country risk (Service Co. operates under French law and is subject to French economic/political conditions), legal risk (affected customers or regulators may sue or fine Bank), and operational risk (the loss itself, from the control breakdown at the vendor). Concentration risk is not directly triggered by this single incident — it would only apply if Bank relied on very few vendors or vendors clustered in one region for this function.",
      pitfall: "Compliance risk specifically means the SERVICE PROVIDER failing to comply with laws/regulations relevant to the outsourced activity — it is not simply \"any regulatory risk.\" Don't confuse it with legal risk (lawsuits/costs from the provider's negligent acts) or operational risk (losses from the provider's internal control breaches and human error).",
      related: [{ r: 51, label: "R51 — these risks manifesting concretely in real cases" }]
    },
    {
      name: "Compliance risk",
      def: "The risk that the service provider does not operate in compliance with the relevant local laws and regulations governing the outsourced activity.",
      example: "A payment-processing vendor fails to follow anti-money-laundering reporting rules that apply to the transactions it processes on the bank's behalf.",
      related: []
    },
    {
      name: "Concentration risk",
      def: "The risk of having very few service providers to choose from for a given activity, or of the available service providers being clustered in only a few geographic areas.",
      intuition: "If every bank in the industry outsources the same function to the same handful of vendors (or vendors all headquartered in the same region), a single vendor's failure or a single regional disruption can cascade across many institutions at once — the individual bank has lost its ability to diversify away from that single point of failure.",
      related: []
    },
    {
      name: "Reputational risk",
      def: "The risk that a service provider executes its tasks in a substandard manner, resulting in a negative public perception of the financial institution.",
      intuition: "Customers don't distinguish between \"the bank\" and \"the bank's vendor\" — a badly handled customer-service call or a data breach at the vendor reads to the public as the bank's failure, because the bank's name and brand are the ones the customer trusts.",
      related: []
    },
    {
      name: "Country risk",
      def: "The risk of using a service provider based in a foreign country, which subjects the financial institution to potential economic and political risks in that country.",
      example: "A vendor's home government imposes capital controls, changes data-localization law, or experiences political instability that disrupts the vendor's ability to keep servicing the contract.",
      related: []
    },
    {
      name: "Operational risk (as an outsourcing risk)",
      def: "Potential losses sustained by a financial institution as a result of internal control breaches and human error caused by a service provider.",
      pitfall: "This is a narrower use of \"operational risk\" than the book's overall definition — here it specifically means losses flowing FROM the vendor's own control breakdowns, as one of the six risk categories that outsourcing creates, not the general umbrella category covering all of operational risk.",
      related: []
    },
    {
      name: "Legal risk (as an outsourcing risk)",
      def: "The risk of subjecting the financial institution to lawsuits and other costs due to potentially negligent activities of a service provider.",
      related: []
    },
    {
      name: "Six-part outsourcing risk management program",
      def: "Risk assessments, due diligence in selecting providers, contract provisions, incentive compensation review, oversight/monitoring, business continuity/contingency plans.",
      intuition: "Read as a timeline: risk assessment and due diligence happen BEFORE you sign a contract (should you outsource this at all, and if so, to which vendor?); contract provisions happen AT the moment of signing (converting every identified risk into an enforceable clause); incentive review, oversight/monitoring, and continuity planning happen AFTER signing, for the life of the relationship.",
      example: "A bank considering outsourcing its call-center operations first performs a risk assessment (is this activity better done in-house or externally, given the bank's objectives?) and a cost-benefit/risk analysis of candidate vendors, asking two key questions: do qualified and experienced service providers actually exist for this activity, and is the bank itself sufficiently qualified to oversee the relationship once it exists? Only after answering both \"yes\" does it move to due diligence on a specific vendor, then contract negotiation, then ongoing monitoring.",
      related: ["Due diligence — three review areas"]
    },
    {
      name: "Due diligence — three review areas",
      def: "Business background, reputation, and strategy; financial performance and condition; operations and internal controls.",
      intuition: "The three areas map to three different failure modes: is this a competent, well-run, trustworthy organization (background/reputation/strategy)? can it survive financially long enough to fulfill a multi-year contract (financial condition)? and will its day-to-day systems and controls actually protect your data and process your transactions correctly (operations/internal controls)?",
      example: "For \"business background, reputation, and strategy\": the bank reviews the vendor's past business history, its key management's track record, evidence of an adequate employee background-check system, its strategy and service philosophy, and it contacts references and confirms licenses/certifications and any past legal or compliance problems. For \"financial performance and condition\": the bank obtains the vendor's most recent financial statements (and annual report if applicable) to assess assets, liabilities, liquidity, and operating performance, including financial information on any subcontractors, and it evaluates the vendor's insurance coverage and long-term survival prospects (how long it has operated, market-share growth, ability to staff and capitalize the contract for its full length). For \"operations and internal controls\": the bank evaluates the vendor's internal controls, IT systems development/support, IT security, staff training, disaster-recovery processes, and record-keeping — and confirms the vendor itself performs employee background checks.",
      related: []
    },
    {
      name: "Contract provisions",
      def: "Scope, cost/compensation, incentive compensation, right to audit, performance standards, oversight/monitoring, confidentiality/security, ownership and license, indemnification, default/termination, dispute resolution, limits on liability, insurance, customer complaints, provider's own business resumption plan, foreign-based provider considerations, subcontracting rights.",
      intuition: "Every one of these 16 clauses is the contractual answer to a specific risk identified upstream in due diligence — the contract is where a vague worry (\"what if they subcontract to someone we've never vetted?\") becomes an enforceable obligation (\"the provider must disclose and justify any subcontracting, and remains fully responsible for the subcontractor's work\").",
      example: "Confidentiality/security: in the U.S., contracts must follow FFIEC guidance and section 501(b) of the Gramm-Leach-Bliley Act, and must address access, security, retention of nonpublic personal information (NPPI), and require the vendor to notify the bank of any data breach. Right to audit: the contract may require receipt of specific third-party audit reports at set intervals, such as an AICPA (American Institute of Certified Public Accountants) Service Organization Control 2 (SOC 2) report or an FFIEC Technology Service Provider examination report. Ownership and license: for purchased software, the contract may require an escrow agreement so the bank can access the vendor's source code if the vendor stops supporting the product or becomes insolvent. Foreign-based providers: the contract can specify that only one jurisdiction's law (the bank's own) governs enforcement and dispute resolution, avoiding conflicts with a foreign vendor's local law. Subcontracting: the contract must state the primary vendor remains fully responsible for all work performed by any subcontractor, list which tasks may be subcontracted, and require the vendor to document how it performs financial due diligence on its own subcontractors.",
      pitfall: "This is a LONG, testable list — the exam can ask which specific clause addresses a described scenario (e.g., 'what if the provider itself subcontracts the work further' → subcontracting rights clause). A commonly tested distinction: performance metrics/standards ('establishment and monitoring of performance standards') is different from 'right to audit' — metrics define what \"good performance\" measurably looks like, while audit rights let the bank verify compliance and obtain reports.",
      related: [],
      memory: "The contract is where accountability gets written down in enforceable detail — every risk in the six-category list should map to a specific clause."
    }
  ],

  connections: {
    from: [
      { r: 42, why: "Third-party failure was one of the risks promoted to Level-1 status under the ORX taxonomy, foreshadowing this dedicated treatment." }
    ],
    to: [
      { r: 51, why: "The generic guidance here becomes concrete in Capital One and Morgan Stanley's real failures." }
    ],
    confused: [
      { what: "Six risks (compliance/concentration/reputation/country/operational/legal) vs six-part program (assess/diligence/contract/incentive/monitor/continuity)", how: "The six RISKS are what can go wrong; the six-part PROGRAM is what the bank does to manage those risks — don't conflate the risk list with the response framework." }
    ]
  },

  misconceptions: [
    { wrong: "\"Outsourcing an activity also outsources the accountability for that activity's outcomes.\"", right: "Regulators hold the outsourcing bank accountable regardless of who performs the work — you can outsource the activity, never the accountability. Outsourcing is a form of risk transfer, but because the bank cannot fully transfer accountability, it is often more accurate to call it risk sharing rather than pure risk transfer." },
    { wrong: "\"A vendor contract mainly needs to specify scope and cost.\"", right: "Regulators expect a long, specific list of provisions: audit rights, performance standards, confidentiality, indemnification, termination, liability limits, insurance, subcontracting rights, and more — scope and cost are just two of many essential clauses." },
    { wrong: "\"Insurance coverage sufficiency is checked under the 'operations and internal controls' due-diligence review area, since it's about risk protection.\"", right: "Insurance coverage sufficiency is actually assessed under 'financial performance and condition,' because adequate insurance protects the vendor's own financial ability to survive claims and continue operating — it's a financial-health question, not an operational-controls question." },
    { wrong: "\"Outsourcing to a much more capable, more secure specialist firm always reduces the bank's total risk.\"", right: "It reduces some risks (e.g., the specialist's superior security may lower operational/control risk) but can raise net financial cost and always introduces incremental third-party risk, since the bank must now rely on that firm's controls operating properly rather than its own." }
  ],

  highYield: [
    { stars: 3, what: "Six risks from outsourcing (compliance, concentration, reputation, country, operational, legal).", why: "A clean six-item list, frequently tested for classification of a described risk scenario." },
    { stars: 3, what: "Contract provisions list — especially audit rights, subcontracting rights, and business resumption planning.", why: "GARP likes testing which specific clause addresses a described contractual gap." },
    { stars: 2, what: "Six-part outsourcing risk management program and three due diligence review areas.", why: "Supporting structural detail." },
    { stars: 2, what: "The order of the six-part program: risk assessment and due diligence come BEFORE contracting; incentive review, oversight, and continuity planning come AFTER.", why: "Exam questions test whether you can place a described activity (e.g., 'establishing limits on outsourcing') into the correct stage of the program." }
  ],

  recall: [
    { q: "A bank outsources loan servicing to a vendor. The vendor later fails to meet regulatory standards, and the bank is fined. Why is the bank held responsible rather than just the vendor?", a: "Accountability cannot be outsourced — regulators hold the originating bank responsible for outcomes in outsourced activities, since customers and the financial system are ultimately affected by the bank's choices regardless of which entity performs the underlying work." },
    { q: "A vendor contract doesn't specify whether the vendor can further subcontract the work to a fourth party. What risk does this create, and what contract provision addresses it?", a: "It creates uncontrolled visibility risk — the bank may lose track of who's actually handling its data/processes if the vendor subcontracts without restriction. The 'subcontracting rights' contract provision specifically addresses this by defining whether and how further subcontracting is permitted and disclosed, and by holding the primary provider fully responsible for the subcontractor's work." },
    { q: "During due diligence, where would a bank confirm that a candidate vendor's disaster-recovery processes and record-keeping methods are adequate?", a: "Under the 'operations and internal controls' review area — this covers IT systems, IT security, staff training, service support, and disaster-recovery/record-keeping processes, as distinct from the financial-condition or background/reputation reviews." },
    { q: "Why might a bank choose incentive compensation review as one of the six program elements, specifically for vendors that sell products on the bank's behalf?", a: "Because the vendor's own incentive structure could push it to prioritize earning higher fees over placing suitable financial products in customers' interests, or to take on excessive risk on the bank's behalf — the bank must retain contractual rights to review and adjust vendor incentive compensation to keep those incentives aligned with customer and bank interests." }
  ],

  hooks: [
    { title: "You can hire the work, not the blame", text: "Outsourcing lets you hire someone else to DO the work. It never lets you hire someone else to TAKE the blame when it goes wrong." }
  ],

  eli5: `<p>Imagine you hire a catering company to run the food at your restaurant instead of cooking in-house. If a customer gets food poisoning, they don't sue the caterer — they sue YOUR restaurant, because your name is on the sign and the customer trusted your restaurant, not some company they've never heard of. So before you ever sign with a caterer, you'd check their kitchen's health record, their finances (will they still be in business next year?), and their staff training (background review). Then your contract with them would spell out exactly who's liable if something goes wrong, how often you can inspect their kitchen (audit rights), what happens if their supplier goes bankrupt (subcontracting), and what they'll do if their kitchen burns down mid-service (business resumption plan). <strong>In finance terms: the restaurant is the bank, the caterer is the outsourced service provider, food poisoning liability is legal/reputational risk landing on the outsourcing institution regardless of who cooked, and the pre-contract checks and contract clauses are exactly the due diligence and contract provisions this reading covers.</strong></p>`,

  thinkLike: `<p>A risk manager reviewing an outsourcing arrangement doesn't ask "is this vendor good?" in the abstract — they ask a sequence of narrower questions that map directly onto the six-part program: Should this activity even leave the building (risk assessment)? Among available vendors, which one survives scrutiny on background, finances, and controls (due diligence)? Once we pick one, does the contract convert every risk we found into an enforceable, specific clause — not just "the vendor will behave," but "the vendor must provide a SOC 2 report annually" (contract provisions)? Once live, does the incentive structure the vendor operates under actually align with our customers' interests (incentive compensation review)? Are we watching for early warning signs — declining financial statements, missed performance metrics — closely enough to escalate before a small problem becomes a large loss (oversight/monitoring)? And if the vendor suddenly can't operate at all, do we have a plan to keep serving customers (continuity)?</p><p>On the exam, GARP tends to test this reading in two ways: (1) classification questions that give you a scenario (a data breach at a foreign vendor, a subcontractor doing unauthorized work) and ask which of the six risks or which specific contract clause is implicated — the trap distractors are usually a plausible-but-wrong risk category (e.g., calling something "compliance risk" when it's really "legal risk"), and (2) sequencing questions that test whether you know due diligence and risk assessment happen before contracting, while incentive review, monitoring, and continuity planning are ongoing, post-signing obligations.</p>`,

  breakdown: [
    {
      title: "Six risks from outsourcing",
      points: [
        "Compliance risk — the service provider fails to operate in compliance with relevant local laws and regulations.",
        "Concentration risk — too few service providers to choose from, or providers clustered in only a few geographic areas.",
        "Reputational risk — the provider performs substandard work, creating negative public perception of the financial institution.",
        "Country risk — the provider is based in a foreign country, exposing the institution to that country's economic and political risks.",
        "Operational risk — losses from the provider's internal control breaches and human error.",
        "Legal risk — lawsuits and costs from the provider's negligent activities."
      ]
    },
    {
      title: "Six-part outsourcing risk management program",
      points: [
        "1. Risk assessments — determine whether an activity is best kept in-house or outsourced, including whether qualified providers exist and whether the institution can adequately oversee the relationship.",
        "2. Due diligence in selecting service providers — vet the specific candidate vendor across the three review areas.",
        "3. Contract provisions — convert every identified risk into an enforceable clause.",
        "4. Incentive compensation review — ensure the provider's pay structure doesn't push it against customer or institution interests.",
        "5. Oversight and monitoring of service providers — ongoing tracking of performance and financial health, escalating when deficiencies appear.",
        "6. Business continuity and contingency plans — ensure services can continue if the provider suffers a major disruption."
      ]
    },
    {
      title: "Due diligence — three review areas",
      points: [
        "Business background, reputation, and strategy — past business history, management track record, background-check system, references, licenses/certifications, and any legal/compliance history.",
        "Financial performance and condition — recent financial statements, assets/liabilities/liquidity/operating performance, subcontractor financials, insurance coverage, and long-term survival prospects.",
        "Operations and internal controls — internal controls, IT systems and security, staff training, service support, employee background checks, record-keeping, and disaster-recovery processes."
      ]
    },
    {
      title: "Contract provisions (the long, testable list)",
      points: [
        "Scope — duration, support/maintenance/customer service, employee training, subcontracting policy, insurance coverage, use of the institution's assets/employees.",
        "Cost and compensation — who pays equipment, legal, and audit fees; all forms of provider compensation.",
        "Incentive compensation — right to review appropriateness of the provider's incentive structure.",
        "Right to audit — ability to audit the provider and/or receive audit reports (e.g., SOC 2, FFIEC TSP exam report) at set intervals.",
        "Establishment and monitoring of performance standards — specific, measurable performance metrics.",
        "Oversight and monitoring — provider must supply annual financials; institution can escalate monitoring when problems appear.",
        "Confidentiality and security of information — extensive NPPI and data-security provisions, incl. FFIEC guidance / Gramm-Leach-Bliley §501(b) in the U.S., and breach-notification duties.",
        "Ownership and license — rights to use the institution's property; data/software ownership; escrow agreements for source code.",
        "Indemnification — provider must hold the institution harmless for its own negligence.",
        "Default and termination — what constitutes default, remedies, termination notice requirements, and return of the institution's data/property.",
        "Dispute resolution — an agreed process to resolve disputes quickly.",
        "Limits on liability — provider may cap liability, subject to board/management approval.",
        "Insurance — provider must carry and evidence sufficient coverage, and disclose significant coverage changes.",
        "Customer complaints — which party handles complaints, and reporting if it's the provider.",
        "Provider's own business resumption/contingency plan — how the provider continues critical services after a major disaster.",
        "Foreign-based provider considerations — specifying a single governing jurisdiction (the institution's own) to avoid conflicting foreign law.",
        "Subcontracting — subcontractors held to the same terms; primary provider remains fully responsible; contract lists permissible subcontracted tasks and the provider's subcontractor due-diligence process."
      ]
    }
  ],

  quiz: [
    {
      q: "Bank Inc. (U.S.) outsources customer-data management to Service Co. (France). A computer glitch at Service Co. causes accidental public disclosure of confidential customer data. Which risk is Bank LEAST likely to face as a direct result of this specific incident?",
      options: ["Compliance risk", "Concentration risk", "Legal risk", "Operational risk"],
      answer: 1,
      why: "Concentration risk refers to relying on too few providers or providers clustered geographically — it isn't triggered by a single data-breach incident at one vendor. This one event does directly implicate compliance risk (data-privacy rule violations), legal risk (potential lawsuits/fines), and operational risk (losses from the vendor's control breakdown). Country risk (not listed here) would also be implicated because the provider operates under French law."
    },
    {
      q: "Which statement about outsourcing risk management programs is correct?",
      options: [
        "The program should focus primarily on business continuity and contingency plans",
        "The program should contain more detail when there are only a few outsourced activities to established, reliable providers",
        "The program should contain adequate oversight and controls over all activities that materially impact the institution's finances and operations",
        "Risk mitigation techniques, not risk assessments, should be updated regularly"
      ],
      answer: 2,
      why: "The program must provide adequate oversight and controls proportional to an activity's impact on the institution — this is the core design principle. The 'focus primarily on business continuity' answer wrongly elevates one of six equally weighted elements. The 'more detail for few activities to established, reliable providers' answer inverts the actual rule: depth/complexity should be LOWER, not higher, when there are few outsourced activities to established, reliable providers. The 'risk mitigation techniques, not risk assessments, should be updated' answer reverses the causality — risk assessments are updated as a result of updated risk MITIGATION techniques, and mitigation techniques themselves flow from ongoing risk assessments; the program requires both to stay current, not one instead of the other."
    },
    {
      q: "When performing due diligence on a service provider, ascertaining the sufficiency of its insurance coverage falls under which review category?",
      options: ["Business background, reputation, and strategy", "Financial performance and condition", "Operations and internal controls", "Oversight and monitoring"],
      answer: 1,
      why: "Insurance sufficiency is assessed under financial performance and condition, since it bears on the provider's ability to absorb claims and remain financially viable. It's tempting to place it under 'operations and internal controls' because insurance feels operational, but that category actually covers IT systems, IT security, staff training, and disaster-recovery processes — not the provider's financial resilience. 'Oversight and monitoring' is not one of the three due-diligence review areas at all; it's a separate, later element of the six-part program."
    },
    {
      q: "A contract requires the service provider to maintain specific, measurable metrics for turnaround time and error rates on the work it performs. This requirement most appropriately falls under which contract provision?",
      options: ["Customer complaints", "Default and termination", "Indemnification", "Establishment and monitoring of performance standards"],
      answer: 3,
      why: "Performance standards are exactly the specific, measurable metrics (e.g., turnaround time, error rates) a contract sets to define acceptable provider performance. 'Right to audit' (a tempting distractor, not listed as an option here but often confused with this) is about verifying compliance via inspections/reports, not about defining the metrics themselves. 'Default and termination' only becomes relevant once those standards are breached, not for establishing them in the first place."
    },
    {
      q: "Which of the following would a financial institution LEAST likely need to include as a contract provision with a third-party service provider?",
      options: ["Establishment and monitoring of performance standards", "Indemnification", "Ownership and license", "None of these — all three are standard contract provisions"],
      answer: 3,
      why: "All three named items (performance standards, indemnification, and ownership/license) are standard, commonly expected contract provisions from the reading's list — there is no basis in the source material to single one out as unnecessary. This question checks that you recognize the full breadth of the provisions list rather than assuming any one item is optional or unusual."
    },
    {
      q: "A bank's outsourcing contract requires the primary service provider to remain fully responsible for all work performed by any subcontractor, and requires the provider to document how it performs financial due diligence on its subcontractors. Which contract provision does this describe?",
      options: ["Foreign-based service providers", "Subcontracting", "Dispute resolution", "Limits on liability"],
      answer: 1,
      why: "This is precisely the subcontracting provision: subcontractors are held to the same contract terms, the primary provider remains ultimately responsible for all work (its own and its subcontractors'), and the contract requires documentation of the provider's due-diligence process on subcontractors. 'Foreign-based service providers' instead deals with which jurisdiction's law governs the contract, and 'limits on liability' deals with the provider capping its own liability subject to board approval — neither addresses subcontractor accountability."
    }
  ],

  sources: [
    { title: "Guidance on Managing Outsourcing Risk — Board of Governors of the Federal Reserve System (Dec. 2013)", url: "https://www.federalreserve.gov/supervisionreg/srletters/sr1319a1.pdf", note: "The primary regulatory guidance this reading is built on — the original source for the six risks, the six-part program, and the full contract-provisions list." },
    { title: "Third-party risk management — Wikipedia", url: "https://en.wikipedia.org/wiki/Vendor_risk_management", note: "General background on vendor/third-party risk management concepts and terminology referenced throughout this reading." },
    { title: "Outsourcing — Investopedia", url: "https://www.investopedia.com/terms/o/outsourcing.asp", note: "Plain-language overview of what outsourcing is and the tradeoffs (cost savings vs. loss of direct control) that motivate this reading's risk framework." },
    { title: "Gramm-Leach-Bliley Act — Federal Trade Commission", url: "https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act", note: "Background on the U.S. privacy law (specifically section 501(b), cited in the confidentiality/security contract provision) governing financial institutions' handling of nonpublic personal information." }
  ],

  pdf: { book: 3, query: "This short and nontechnical reading begins by examining the general risks" },

  summary: `<p><strong>Six outsourcing risks</strong>: compliance, concentration, reputation, country, operational, legal. <strong>Six-part program</strong>: risk assessment, due diligence, contract provisions, incentive compensation review, oversight/monitoring, business continuity plans — the first two happen before signing, the last three are ongoing after signing. <strong>Due diligence</strong>: business background/strategy, financial condition, operations/controls. <strong>Contract provisions</strong> (long, testable list): scope, cost, incentive compensation, audit rights, performance standards, oversight/monitoring, confidentiality, ownership, indemnification, termination, dispute resolution, liability limits, insurance, complaints, provider's own BCP, foreign-provider considerations, subcontracting rights. The thread tying it all together: outsourcing transfers the ACTIVITY, never the ACCOUNTABILITY — regulators hold the bank responsible regardless of who performed the work, which is why this entire structure exists.</p>`
});
