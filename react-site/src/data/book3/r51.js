export default ({
  book: 3, reading: 51,
  session: "Operational Risk Focus Areas",
  title: "Case Study: Third-Party Risk Management",
  tagline: "Extends R50's outsourcing framework into full TPRM — including fourth- and fifth-party exposures (your vendor's vendors) — anchored by Capital One and Morgan Stanley failures.",

  teaches: `<p>The TPRM lifecycle (five stages), and the single lesson both Capital One and Morgan Stanley illustrate: accountability cannot be outsourced.</p>
  <p>Start with the vocabulary, because the exam leans on it. A <strong>third party</strong> is any outside entity your firm pays to do work for it — a vendor, a contractor, a cloud host like Amazon Web Services (AWS), a supplier, a business partner. <strong>Third-party risk management (TPRM)</strong> is the discipline of identifying, evaluating, monitoring, and (when necessary) exiting those relationships so that the risk they introduce stays within the firm's appetite. Firms use third parties for two reasons, and both matter for understanding why TPRM exists at all: (1) cost savings — a specialist vendor has systems and scale a bank would be inefficient building itself, and (2) risk reduction — an expert vendor can make fewer process and data errors than the bank would make doing the same work in-house. TPRM exists precisely because reason (2) can flip: the vendor relationship that was supposed to reduce risk becomes the source of it.</p>`,

  why: `<p>This is the concrete, real-world payoff of R50's abstract guidance. Both cases share the same root lesson despite different technical failures — a vendor's failure remains the bank's regulatory and reputational problem, full stop.</p>
  <p>It also matters because the risk has been growing, not shrinking. Financial firms have pushed more and more of their core processes out to third parties — loan and mortgage servicing, electronic fund transfers, payroll and treasury management, bill payment, account aggregation — and many of those vendors sit in other countries, layering on country risk and cross-border legal/compliance risk on top of the base operational risk. The source material cites the scale of the exposure directly: nearly 60% of firms surveyed had experienced a data breach through a third party, 77% of firms report limited visibility into their third parties, and 80% had experienced at least one third-party-related breach in the prior year. TPRM isn't a theoretical checklist item — it is managing a risk that materializes at most firms, most years.</p>`,

  intuition: `<p>Third-party risk doesn't stop at your direct vendor — it extends to YOUR VENDOR'S VENDORS (fourth-party) and beyond (fifth-party), a chain of dependency that's often invisible until something breaks. Capital One and Morgan Stanley are different technical failures (one a cloud misconfiguration, one decommissioned hardware disposal) but the same governance lesson: you own the outcome regardless of how many layers of vendors sit between you and the failure.</p>
  <p>Picture the supply chain as a series of links you can see progressively less of. Your <strong>third party</strong> is the vendor you signed a contract with — you can audit them, you can read their SLA, you know their name. Their <strong>fourth party</strong> is a subcontractor <em>they</em> hired to help deliver the service to you — you likely never negotiated anything with this firm and may not even know it exists. A <strong>fifth party</strong> is one layer further still — a contractor working for your vendor's subcontractor. The source material's own illustration of how unglamorous the entry point for this risk can be: the self-service convenience company Avanti Markets was hacked <em>through its vending machines</em> — an Internet of Things (IoT) device most people would never think of as an attack surface. The point isn't that vending machines are dangerous; it's that risk enters through whatever component in the chain has the weakest control, and that component is often several layers removed from where you're looking.</p>`,

  formulas: [],

  concepts: [
    {
      name: "TPRM lifecycle (five stages)",
      def: "(1) Business model decision — what should even be outsourced. (2) Evaluation, risk rating, due diligence — proportional to relationship complexity/length. (3) Contracts, SLAs, contract management — periodically reviewed. (4) Ongoing monitoring — reassessment triggers defined in advance. (5) Remediation or termination — grievance period, exit/termination clause.",
      intuition: "Read it as a relationship's full life, not a one-time gate: you decide whether to outsource at all, vet the specific partner, formalize the deal in writing, keep watching the relationship after signing, and eventually wind it down — cleanly, on your terms, not the vendor's.",
      example: "Stage 1, business model decision: the firm decides its call-center function is a good candidate for outsourcing but core underwriting decisions are not — the decision depends on the firm's risk appetite, not just on cost. Stage 2, due diligence is proportional: a long-term cloud hosting vendor (like AWS for Capital One) gets deep diligence into financial condition, operations, and internal controls; a consultant running a one-day training session gets a light-touch check. Stage 3, contracts: before signing, best practice is to assess and remediate all open issues first, then review the contract periodically afterward — contract management got real teeth during COVID-19, when U.S. and European firms with offshore call centers in India and the Philippines had to renegotiate contracts to let third-party staff work fully remote. Stage 4, ongoing monitoring: reassessment triggers include not just calendar dates but data breaches, regulatory changes, M&A activity, and — a lesson COVID-19 taught the industry — 'acts of God' (natural, unavoidable disruptions). Stage 5, remediation or termination: contracts should include a grievance period and a clean exit/termination clause, plus a well-defined process for transferring intellectual property back in-house when the relationship ends.",
      pitfall: "Do not confuse 'contract provisions' (the long list from R50: scope, cost, audit rights, confidentiality, indemnification, subcontracting rights, etc.) with the lifecycle stage 'contracts, SLAs, contract management' — the provisions are the CONTENTS of stage 3's output; the stage itself also includes reviewing and maintaining that contract over time.",
      related: [{ r: 50, label: "R50 — the outsourcing risk framework this extends" }],
      memory: "Decide → Diligence → Contract → Monitor → Remediate/Exit — a full lifecycle, not a one-time decision."
    },
    {
      name: "Fourth- and fifth-party exposure",
      def: "Your vendor's vendors (fourth-party) and beyond (fifth-party) — a chain of dependency often invisible until something breaks.",
      intuition: "TPRM doesn't stop where your contract stops. It applies to the entire supply chain: fourth parties are third parties of your third parties, and fifth parties are contractors dealing with the entities your fourth parties deal with. Your visibility and control both shrink with each additional link, even though your accountability does not.",
      example: "A bank contracts a payroll vendor (third party). That payroll vendor outsources its data-hosting to a cloud provider (fourth party from the bank's perspective). If that cloud provider uses a specialized subcontractor for physical data-center security (fifth party), the bank likely has zero direct contractual relationship with — or visibility into — that fifth party, yet a breach originating there is still, per this reading's core lesson, the bank's problem.",
      pitfall: "Visibility into sub-outsourcing relationships is exactly the third-party cyber risk dimension named in R47 — the concern isn't hypothetical, it's a recurring named risk category. Firms should build limits on outsourcing to fourth parties and secure audit rights over vendors as part of continuous monitoring, precisely because visibility does not happen automatically.",
      related: [{ r: 47, label: "R47 — visibility into sub-outsourcing named as a third-party cyber risk dimension" }]
    },
    {
      name: "The shared lesson: accountability cannot be outsourced",
      def: "The single lesson GARP wants from both Capital One and Morgan Stanley cases: even when the underlying FUNCTION can be outsourced, accountability for the outcome cannot.",
      intuition: "A firm can hand off the WORK of running a data center, staffing a call center, or disposing of old hardware. It cannot hand off who gets fined, who gets named in the regulatory order, and whose reputation absorbs the damage when that work goes wrong. The regulator's order lands on the bank's letterhead, not the vendor's.",
      example: "Capital One (2019 breach, reported publicly; $80M OCC fine in 2020) — a former AWS employee exploited a firewall misconfiguration to steal data on 100 million U.S. customers, including 140,000 Social Security numbers and 80,000 bank account numbers. Both Capital One and AWS knew the systems were vulnerable to this class of attack, yet continued storing the data unencrypted, which is what let the attacker immediately use what she stole. The OCC's finding wasn't 'AWS was careless' — it was that Capital One had weak risk-management controls and failed to detect and fix known vulnerabilities, a gap so persistent that even a 2015 internal audit missed several of the same control weaknesses. Morgan Stanley (fined $60M by the OCC in 2020) — the failure was mundane by comparison but no less costly: in decommissioning two wealth-management data servers (in 2016 and again in 2019), the firm (1) failed to properly assess and manage the risks of the hardware decommissioning process itself, (2) failed to properly assess third-party/subcontractor risk or adequately monitor their performance, and (3) failed to maintain a proper inventory of customer data. The failure surfaced when Morgan Stanley had to notify wealth-management clients in July 2019 that disposed-of hardware still held their confidential data.",
      pitfall: "A vendor's failure is STILL the bank's regulatory and reputational problem — this is the single most important takeaway of the reading, worth memorizing as a standalone principle. On the exam, any answer choice that assigns the fine or the ultimate accountability to the vendor, the subcontractor, or a 'shared' split is wrong; the OCC fined the banks, not AWS or the hardware-disposal contractor.",
      related: [{ r: 50, label: "R50 — the same principle stated in the guidance reading" }],
      memory: "Two different companies, two different technical failures, one identical lesson: you can't outsource the blame."
    }
  ],

  connections: {
    from: [
      { r: 50, why: "Applies the generic outsourcing risk management guidance to concrete, real failures." }
    ],
    to: [],
    confused: [
      { what: "Third-party vs fourth-party vs fifth-party risk", how: "Third-party is your direct vendor; fourth-party is your vendor's vendor; fifth-party goes one layer further — visibility and accountability get progressively harder to maintain at each remove." },
      { what: "Capital One's failure vs Morgan Stanley's failure", how: "Capital One was a cloud misconfiguration compounded by unencrypted data (a technical/data-security lapse enabled by a third-party cloud host, AWS). Morgan Stanley was improper hardware decommissioning plus inadequate subcontractor oversight and poor data inventory (an operational/process lapse, not a hack). Different mechanisms, same regulator (the OCC), same conclusion: accountability sits with the bank." }
    ]
  },

  misconceptions: [
    { wrong: "\"If a vendor's failure caused a data breach, the vendor bears primary regulatory responsibility, not the bank.\"", right: "Accountability cannot be outsourced — even when the underlying function/failure originates with a vendor, the bank remains regulatorily and reputationally responsible for the outcome. Both OCC fines (Capital One $80M, Morgan Stanley $60M) landed on the banks, not on AWS or the banks' subcontractors." },
    { wrong: "\"Third-party risk management only needs to consider your direct vendors.\"", right: "TPRM must also consider fourth-party (your vendor's vendors) and fifth-party exposures — dependency chains extend beyond your direct contractual relationships and are often invisible until something breaks. The source cites 77% of firms reporting limited visibility into their own third parties, before even getting to the fourth-party layer." },
    { wrong: "\"Establishing outsourcing limits on fourth parties belongs under 'evaluation and due diligence' since it's about assessing risk.\"", right: "Limits on outsourcing to third- and fourth-party vendors are placed under the 'contracts, SLAs, and contract management' stage — they are formalized as contractual terms (along with audit rights), not as a standalone due-diligence step." }
  ],

  highYield: [
    { stars: 4, what: "The shared lesson: accountability cannot be outsourced, illustrated by Capital One and Morgan Stanley.", why: "Explicitly flagged as the single most important takeaway from both cases combined." },
    { stars: 3, what: "TPRM five-stage lifecycle.", why: "A clean process framework, good for sequencing/matching questions." },
    { stars: 2, what: "Fourth- and fifth-party exposure concept.", why: "Extends R47's third-party cyber risk dimension into a fuller vendor-chain concept." },
    { stars: 2, what: "Capital One and Morgan Stanley case specifics — dollar fines, regulator (OCC), and the specific control failures named.", why: "GARP case-study readings are tested on the concrete facts (who, how much, what specifically failed), not just the abstract lesson — expect a question that asks you to match the fine amount or failure type to the right bank." }
  ],

  recall: [
    { q: "Two banks suffer very different technical failures involving third-party vendors, yet both draw the same regulatory consequence. What's the shared lesson?", a: "Accountability cannot be outsourced — regardless of the specific technical cause (a vendor's cloud misconfiguration, improper hardware disposal, or any other failure), the originating bank remains responsible for the outcome in the eyes of regulators and the public. Outsourcing the FUNCTION never outsources the ACCOUNTABILITY." },
    { q: "Why might a bank's third-party risk management program fail to catch a risk that ultimately causes a major incident, even after thorough due diligence on its direct vendor?", a: "The risk may originate at the fourth-party or fifth-party level — a subcontractor of the bank's direct vendor, invisible to the bank's own due diligence process unless the contract specifically requires visibility into and audit rights over sub-outsourcing relationships." },
    { q: "What specifically went wrong in the Capital One breach, and what regulator fined the bank, how much?", a: "A former employee of Capital One's cloud vendor, AWS, exploited a firewall weakness to steal data on 100 million U.S. customers (140,000 SSNs, 80,000 bank accounts); the data was unencrypted despite both firms knowing of the vulnerability. The OCC fined Capital One $80 million in 2020 for failing to identify and manage vendor risk beforehand — including an internal 2015 audit that had already missed the control weaknesses." },
    { q: "What three specific failures did the OCC cite when fining Morgan Stanley, and for what underlying event?", a: "Morgan Stanley was fined $60 million (2020) for deficiencies related to decommissioning wealth-management data servers in 2016 and 2019: (1) failing to properly assess and address hardware decommissioning risk, (2) failing to properly assess or monitor third-party/subcontractor risk, and (3) failing to maintain a proper inventory of customer data. Disposed hardware still contained confidential client data." }
  ],

  hooks: [
    { title: "The vendor's vendor's vendor", text: "Third-party, fourth-party, fifth-party — each link in the chain is a place risk can hide. Capital One and Morgan Stanley both learned that the chain doesn't end where your contract does." },
    { title: "It even got in through the vending machine", text: "Avanti Markets, a self-service snack company, was hacked through its Internet-connected vending machines. Risk doesn't announce itself as a headline threat — it slips in through the least glamorous device in the chain." }
  ],

  eli5: `<p>Imagine you hire a moving company to pack and ship your grandmother's china to your new house. The moving company subcontracts the actual truck driving to a freight partner, and that freight partner uses a warehouse run by yet another company for overnight storage. If the china arrives shattered because the warehouse forklift driver was careless, you don't get to shrug and say "not my problem, blame the warehouse guy." You hired the moving company; the moving company is who you paid, and it's who you'll go after — and if the moving company's reputation with you depends on your china arriving whole, it's on the hook regardless of how many subcontractors were actually holding the box when it broke. That's exactly the logic behind TPRM: a bank can outsource cloud hosting (like Capital One did with AWS) or hardware disposal (like Morgan Stanley did), but when something breaks three layers down the subcontracting chain, the regulator and the public still hold the bank — not the vendor's vendor's vendor — accountable.</p>`,

  thinkLike: `<p>A risk manager reviewing a third-party relationship asks a version of the same question at every stage of the lifecycle: "if this vendor — or their vendor, or their vendor's vendor — fails, who absorbs the loss, and would I have seen it coming?" That means treating due diligence proportionally (a one-day training consultant does not need the scrutiny a cloud-hosting provider handling customer PII needs), insisting on audit rights and subcontracting-visibility clauses in contracts rather than assuming a vendor's own controls are sufficient, and defining monitoring triggers in advance — data breaches, regulatory changes, M&A, even "acts of God" — rather than waiting for the annual calendar review to catch a problem that's been live for months.</p>
  <p>On the exam, GARP tests this reading two ways. First, sequencing/matching questions: given a TPRM activity (e.g., "establishing limits on fourth-party outsourcing"), identify which of the five lifecycle stages it belongs to (answer: contracts, SLAs, and contract management — because limits get formalized as contractual terms, not evaluated as a separate step). Second, case-study fact questions that test whether you internalized the "accountability cannot be outsourced" conclusion and can attach the right details (regulator = OCC, fine amounts = $80M Capital One / $60M Morgan Stanley, failure type = cloud data breach vs. hardware decommissioning) to the right bank rather than mixing them up.</p>`,

  breakdown: [
    {
      title: "TPRM lifecycle — the five stages",
      points: [
        "Business model decision — decide whether and which activities should even be outsourced to a third party; depends on the firm's risk appetite.",
        "Evaluation, risk rating, and due diligence — vet the specific partner proportionally to how long/complex the relationship will be (a cloud vendor gets deep diligence; a one-day trainer does not).",
        "Contracts, SLAs, and contract management — formalize responsibilities, quality, and timing in writing; resolve open issues before signing; review the contract periodically afterward; this is also where outsourcing limits and audit rights get written in.",
        "Ongoing monitoring — reassess on a calendar schedule AND on defined triggers (breaches, regulatory change, M&A, acts of God); the stronger the earlier stages, the less reassessment is needed.",
        "Remediation or termination — build in a grievance period and a clean exit/termination clause, plus a defined process for transferring intellectual property back in-house."
      ]
    },
    {
      title: "The two case studies — what actually happened",
      points: [
        "Capital One (2019 breach, $80M OCC fine in 2020): a former AWS employee exploited a firewall weakness to steal data on 100 million U.S. customers (140,000 SSNs, 80,000 bank accounts); both firms knew of the vulnerability but kept the data unencrypted; a 2015 internal audit had already missed the control weaknesses.",
        "Morgan Stanley ($60M OCC fine in 2020): improper decommissioning of wealth-management data servers in 2016 and 2019 — failed to assess decommissioning risk, failed to assess/monitor subcontractor risk, and failed to maintain a proper customer-data inventory; disposed hardware still held confidential client data.",
        "Shared conclusion: certain FUNCTIONS can be transferred to third parties, but ultimate accountability is not transferable — both banks, not their vendors, were the ones fined."
      ]
    },
    {
      title: "Why third parties are used, and the risk categories that follow",
      points: [
        "Reason 1 — cost savings: outsourcing to a specialist vendor with a competitive-advantage systems/process edge.",
        "Reason 2 — risk mitigation: contracting with experts can reduce process and data errors versus doing the work in-house.",
        "Key risks introduced: service quality issues, service disruptions, fraud, data and compliance breaches, leaks of sensitive/confidential information, intellectual property theft, and even espionage.",
        "Cross-border vendors add layers: country risk, plus legal and compliance risk from operating under a different jurisdiction."
      ]
    }
  ],

  quiz: [
    {
      q: "Establishing limits on outsourcing to third- and fourth-party vendors is properly addressed under which stage of the TPRM lifecycle?",
      options: ["Business model decision", "Evaluation, risk rating, and due diligence", "Contracts, SLAs, and contract management", "Ongoing monitoring"],
      answer: 2,
      why: "Outsourcing limits are formalized as contractual terms (alongside audit rights), which places them in the contracts/SLA/contract-management stage. Due diligence (the tempting distractor) assesses the risk of a specific relationship before it's formalized — it doesn't set the ongoing structural limits on how much can be outsourced further down the chain."
    },
    {
      q: "Which of the following is NOT one of the five TPRM lifecycle stages?",
      options: ["Business model decision", "Evaluation, risk rating, and due diligence", "Management of third- and fourth-party vendor relationships", "Remediation or termination"],
      answer: 2,
      why: "The five stages are: business model decision; evaluation/risk rating/due diligence; contracts/SLAs/contract management; ongoing monitoring; remediation or termination. 'Management of third- and fourth-party vendor relationships' sounds plausible because it echoes TPRM language generally, but it is not one of the named five stages — it's a distractor built from real vocabulary used out of its correct structural place."
    },
    {
      q: "A key conclusion drawn from the Capital One and Morgan Stanley case studies is that accountability for the underlying operational risk:",
      options: ["Ultimately rests with the third-party vendor that experienced the technical failure", "Is a fully shared responsibility between the bank and its third-party vendors", "Is not transferable — it remains with the bank regardless of which vendor's failure caused it", "Rests with whichever party — bank, vendor, or subcontractor — the contract's indemnification clause names"],
      answer: 2,
      why: "Both OCC fines landed on the banks (Capital One, Morgan Stanley), not on AWS or Morgan Stanley's hardware-decommissioning subcontractors — the reading's explicit conclusion is that accountability is not transferable even though the underlying function can be outsourced. The 'shared responsibility' and 'indemnification clause' options are tempting because contracts do allocate financial liability between parties privately, but that private allocation does not change who the regulator holds accountable."
    },
    {
      q: "What amount was Capital One fined by the OCC, and in what year?",
      options: ["$60 million in 2020", "$80 million in 2020", "$100 million in 2019", "$140 million in 2020"],
      answer: 1,
      why: "The OCC fined Capital One $80 million in 2020 for failing to identify and manage vendor risk ahead of the 2019 breach. $60 million in 2020 is the Morgan Stanley fine — a classic case-study mix-up the exam exploits by swapping the two banks' numbers."
    },
    {
      q: "The Capital One breach was ultimately enabled by which combination of factors?",
      options: ["A phishing attack on a bank employee combined with weak password policy", "A former AWS employee exploiting a firewall weakness, combined with the bank storing data unencrypted despite known vulnerability", "A ransomware attack on Capital One's internal servers", "A fourth-party subcontractor's employee stealing physical hard drives from a data center"],
      answer: 1,
      why: "A former AWS employee exploited a firewall weakness to access files on the AWS database; the theft was immediately usable because Capital One (and AWS) continued storing the data unencrypted despite both firms knowing of the vulnerability. The other options describe plausible-sounding but factually different breach mechanisms (phishing, ransomware, physical theft) that do not match this specific, named case."
    },
    {
      q: "What was the specific operational failure underlying the Morgan Stanley fine — as distinct from Capital One's?",
      options: ["A cloud-hosting misconfiguration exposing customer records", "Improper decommissioning of data servers combined with inadequate subcontractor oversight and poor customer-data inventory", "A phishing attack that compromised wealth-management client login credentials", "Failure to encrypt customer wire-transfer instructions"],
      answer: 1,
      why: "Morgan Stanley's failure was operational/process-based, not a hack: disposed-of hardware from two data-center decommissionings (2016, 2019) still held confidential customer data, compounded by inadequate assessment/monitoring of the subcontractors handling the disposal and a poor data inventory. The 'cloud-hosting misconfiguration' answer is Capital One's failure mode, not Morgan Stanley's — mixing the two banks' mechanisms is the most common trap on this material."
    }
  ],

  sources: [
    { title: "OCC enforcement action against Capital One (2020) — Wikipedia summary of the breach", url: "https://en.wikipedia.org/wiki/Capital_One#2019_data_breach", note: "Background on the 2019 breach, the AWS connection, and the subsequent $80 million OCC fine." },
    { title: "Third-Party Risk Management — Investopedia", url: "https://www.investopedia.com/terms/t/third-party-risk-management-tprm.asp", note: "Plain-language overview of TPRM concepts, useful as a refresher on why firms outsource and what risks follow." },
    { title: "Office of the Comptroller of the Currency (OCC)", url: "https://www.occ.gov", note: "The U.S. banking regulator that fined both Capital One and Morgan Stanley; browse enforcement actions for primary-source context." },
    { title: "Bank for International Settlements (BIS) — operational resilience and outsourcing principles", url: "https://www.bis.org", note: "Home of the Basel Committee's broader guidance on operational risk and third-party/outsourcing risk that this case study operationalizes." }
  ],

  pdf: { book: 3, query: "third-party vendor arrangements, contractors, or other service providers" },

  summary: `<p><strong>TPRM lifecycle</strong> (5 stages): business model decision → evaluation/due diligence → contracts/SLAs → ongoing monitoring → remediation/termination. <strong>Fourth- and fifth-party exposure</strong>: risk chains extend beyond direct vendors, often invisible without explicit sub-outsourcing visibility and audit rights. <strong>Shared lesson</strong> (Capital One + Morgan Stanley): accountability cannot be outsourced — a vendor's failure remains the bank's regulatory and reputational problem, regardless of the specific technical cause. <strong>Concretely</strong>: Capital One was fined $80M (OCC, 2020) after a former AWS employee stole data on 100M customers via a firewall weakness and unencrypted storage; Morgan Stanley was fined $60M (OCC, 2020) for improper data-server decommissioning, inadequate subcontractor oversight, and poor customer-data inventory.</p>`
});
