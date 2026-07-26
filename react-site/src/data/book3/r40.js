export default ({
  book: 3, reading: 40,
  session: "Operational Risk Overview",
  title: "Introduction to Operational Risk and Resilience",
  tagline: "Operational risk is defined by exclusion as much as inclusion: the risk of loss from failed processes, people, systems, and external events, everything that isn't market or credit risk, but still hits the P&L.",

  teaches: `<p>The Basel Committee's formal definition of operational risk, the four-step risk-management cycle that turns that definition into an actual management process (identify → assess → mitigate → monitor), the seven Basel II event-type categories used to classify every operational loss a firm records, the four "extra" risk types operational risk pulls in (legal, compliance, reputational, strategic), the five characteristics that make op risk uniquely hard to manage compared with market or credit risk, and operational resilience, the newer regulatory idea that some disruptions cannot be prevented, only survived, plus the specific guidance issued by the UK, the US Federal Reserve, the Basel Committee, the ECB, and Singapore's MAS.</p>`,

  why: `<p>This reading gives you the classification skeleton that structures the entire book. Every later reading, governance (R41), identification (R42), measurement (R43), mitigation (R44), reporting (R45), capital models (R57 to R63), assumes you already know the seven event-type categories and the five characteristics cold. Understanding WHY op risk is hard (heterogeneous, idiosyncratic, heavy-tailed, interconnected, dynamic) explains why it needs a completely different toolkit than market or credit risk's clean statistical models, and why regulators eventually gave up trying to make banks quantify it with a sophisticated internal model (Basel's Advanced Measurement Approach) and moved to the simpler, more formulaic Standardized Measurement Approach you'll meet in R63.</p>`,

  intuition: `<p>Market and credit risk have relatively clean statistical structures, prices move up or down, borrowers default or don't, and you can build a probability distribution from decades of price or default history. Operational risk is different: the Basel Committee on Banking Supervision (BCBS) defines it as "the risk or loss resulting from inadequate or failed internal processes, people, systems, and external events." That's a definition by exclusion, it's everything that can go wrong that ISN'T a market price move or a borrower default: a rogue trader hiding losses, a hacker draining customer accounts, a hurricane knocking out a data center, a clerk fat-fingering a trade, a lawsuit over misselling. It's a genuinely heterogeneous grab-bag with no single unifying statistical shape, which is exactly why it resisted quantification for so long and why regulators eventually settled for a simple, standardized capital formula rather than a model-driven one.</p>
  <p>Operational RESILIENCE is a mindset shift layered on top of ordinary operational risk management: instead of "prevent all disruptions" (impossible for genuine tail events, you cannot stop every hurricane or every zero-day cyberattack), assume severe, infrequent disruptions WILL happen, and make sure the firm's most critical services survive them with acceptable downtime. It's the difference between building a levee to stop every flood and building a house that keeps functioning even when the water gets in.</p>`,

  eli5: `<p>Imagine you run a corner shop. Some things that can go wrong are predictable and small: a cashier occasionally miscounts change, a delivery is a day late, a customer trips and wants compensation, these happen constantly but each one costs you very little. Other things are rare but devastating: the shop burns down, or an employee is caught secretly stealing from the till for years, or a regulator fines you a fortune for selling something you weren't licensed to sell. You cannot manage the small stuff and the catastrophic stuff the same way, the small stuff you just budget for as a cost of doing business, while the catastrophic stuff needs insurance, backup plans, and a "what do we do if this happens" playbook. That messy pile of "everything that can go wrong that isn't a customer not paying you back (credit risk) or the price of your goods swinging (market risk)" is operational risk, and having a plan for surviving the catastrophic version (keeping the shop's essential functions running even through a fire or a scandal) is operational resilience.</p>`,

  thinkLike: `<p>A risk manager's first job on this reading is classification discipline, not clever math: every operational loss event that happens anywhere in the firm has to be mapped to exactly one (occasionally more than one) of the seven Basel event-type categories, using a documented, consistent rule. The exam setter cares far more about whether you can correctly classify a described event ("a trader deliberately mismarks a position to hide losses" → internal fraud; "a hurricane destroys a branch" → damage to physical assets; "a clerk enters the wrong settlement date" → EDPM) than about any formula, because there isn't one in this reading, the entire module is about vocabulary and taxonomy that gets reused for the next 23 readings.</p>
  <p>Second, think about WHY each of the five characteristics (heterogeneous, idiosyncratic, heavy-tailed, interconnected, dynamic) makes op risk hard, not just what the words mean, the exam likes to give you a scenario and ask which characteristic it illustrates. A trading error that also causes a market-risk loss is testing "interconnected" (specifically the concept of a boundary event). A firm that can't just buy insurance and walk away from its residual risk is testing "idiosyncratic." A distribution dominated by a handful of catastrophic losses is testing "heavy-tailed." Finally, for resilience, think like a regulator: the exam tests recall of WHICH body issued WHICH guidance (UK's FCA/PRA/BoE in 2018, the US Fed in 2020, BCBS's seven principles in 2021, the EU's DORA, Singapore's MAS/ABS in 2021) more than the substance of any one framework, so tag each guidance to its issuer and year.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Operational risk: the Basel definition and the ORM framework's four-step cycle",
      def: "The Basel Committee defines operational risk as \"the risk or loss resulting from inadequate or failed internal processes, people, systems, and external events.\" An operational risk management (ORM) framework is everything a firm does to control it, and it runs as a cycle rather than a checklist: identify, assess, mitigate, monitor, then back to identify. The cycle matters more than the four labels. Probability and severity both drift over time, so a risk assessed once is assessed wrongly.",
      intuition: "This four-step cycle is the generic risk-management loop applied specifically to operational risk, it's the scaffolding that R42 (identification), R43 (assessment), and R44 (mitigation) each expand into a full reading.",
      example: "A bank notices a spike in failed trade settlements (identification via incident reports), estimates the probability and dollar cost of continued failures using historical data and a scenario where settlement volumes triple (assessment), rewrites its settlement-matching controls and buys operational-error insurance (mitigation), then tracks a key risk indicator (the failed-trade rate) every month to confirm the fix worked (monitoring).",
      pitfall: "The exam likes to ask which step a given tool (stress testing, scenario analysis, KRI tracking, group brainstorming) belongs to, scenario analysis and stress testing are RISK ASSESSMENT tools, not mitigation or monitoring tools, even though they sound like they belong later in the cycle.",
      related: [{ r: 42, label: "R42: risk identification, step 1, in full detail" }, { r: 43, label: "R43: risk measurement and assessment, step 2, in full detail" }, { r: 44, label: "R44: risk mitigation, step 3, in full detail" }],
      memory: "Identify → Assess → Mitigate → Monitor, then loop back if monitoring finds a problem, it's a cycle, not a one-time checklist."
    },
    {
      name: "The seven Basel II event-type categories",
      def: "The seven buckets every operational loss gets classified into: internal fraud, external fraud, employment practices and workplace safety, clients/products/business practices, damage to physical assets, business disruption and system failures, and execution/delivery/process management. Two of them carry most of the money: clients/products/business practices runs about 52% of industry loss severity and execution/delivery/process management about 27%, so the pair worth knowing cold is CPBP and EDPM.",
      intuition: "Every loss event a firm records has to be mapped to one of these seven Level-1 categories per the firm's own ORM policy. Some events genuinely straddle more than one category, but consistency of classification matters more than perfect accuracy, if the firm quietly changes how it classifies similar events from year to year, its loss-history statistics and regulatory reporting both become unreliable. That's why firms perform a comprehensive risk-mapping exercise across every major business process before assigning categories.",
      example: "Based on aggregated bank operational loss data from 2014 to 2019, CPBP accounted for roughly 52% of total loss severity industry-wide (by far the largest share of any category) followed by EDPM at roughly 27%. Together those two categories drove about four-fifths of all operational loss severity in that period, even though several other categories (external fraud, for instance) occur more often in raw event count.",
      counter: "A widely repeated shorthand claims 'EDPM is high-frequency/low-severity paper cuts, CPBP is low-frequency/high-severity lawsuits.' That pairing overstates the contrast: per the Basel/Schweser category table, BOTH EDPM and CPBP are high-frequency categories, the real distinguishing fact is that CPBP's severity is very high (52% of aggregate severity) while EDPM's is merely high (27%), and the genuinely low-frequency, low-severity categories are internal fraud, damage to physical assets, and business disruption/system failures.",
      pitfall: "Do not assume every category with high frequency has low severity, or vice versa, the exam tests the exact frequency AND severity pairing per category, and CPBP is the one category that is simultaneously high on both dimensions.",
      related: [{ r: 42, label: "R42: the taxonomy one level deeper (Level 2/3 subcategories)" }],
      memory: "CPBP is the worst of both worlds: frequent AND the single biggest severity driver (52%). EDPM is close behind on severity (27%) despite feeling like small paper cuts individually."
    },
    {
      name: "Legal, compliance, reputational, and strategic risk: the four risk types op risk pulls in",
      def: "Operational risk always contains legal risk and compliance risk, and pulls in strategic risk and reputational risk on an as-needed basis. The distinction that gets tested: compliance risk is the NARROWER one, failing to follow your own policies and procedures, while legal risk is the broader exposure to contracts being enforced or unfulfilled.",
      intuition: "These four aren't separate risk types sitting next to operational risk, they're subsets OF operational risk, which is why an ORM framework has to reach into legal, compliance, and even strategic decision-making rather than staying confined to 'processes and systems.'",
      example: "A bank pays a large regulatory fine for inadequate anti-money-laundering controls: that's compliance risk (CPBP event) with a reputational-risk overlay if it makes headlines, and it may also reveal a legal-risk exposure if clients then sue over related contract breaches.",
      related: [{ r: 49, label: "R49: AML/financial crime risk, a compliance-risk deep dive" }, { r: 53, label: "R53: investor protection and compliance risk case study" }],
      memory: "Legal ↔ contracts. Compliance ↔ policies/procedures (narrower than legal). Reputational ↔ indirect standing loss. Strategic ↔ senior management's decisions and execution."
    },
    {
      name: "Five characteristics that make op risk hard to manage",
      def: "Five properties that together explain why operational risk cannot borrow market risk's toolkit. It is heterogeneous (a typo and a rogue trader are the same category), idiosyncratic (firm-specific, so it cannot be hedged or centralized away), heavy-tailed (many trivial losses plus rare catastrophic ones), interconnected (events share causes, so they arrive together), and dynamic (the risk landscape shifts with technology and business model).",
      intuition: "Each characteristic maps to a specific management headache: heterogeneous → hard to categorize; idiosyncratic → can't be hedged away, always residual risk; heavy-tailed → hard to measure the tail; interconnected → hard to isolate and quantify boundary effects; dynamic → hard to model in advance, forces reactive management.",
      example: "A trading error (operational risk) that produces an unwanted open position which then loses money as the market moves against it (market risk) is a textbook boundary event, illustrating the 'interconnected' characteristic.",
      pitfall: "Don't confuse 'idiosyncratic' with 'heterogeneous': heterogeneous is about the VARIETY of event types, idiosyncratic is about op risk being undiversifiable/unhedgeable and firm-specific, meaning some residual risk always survives even the best controls.",
      related: [],
      memory: "H-I-H-I-D: Heterogeneous, Idiosyncratic, Heavy-tailed, Interconnected, Dynamic."
    },
    {
      name: "Operational resilience and its five elements",
      def: "Operational resilience is how firms and industries anticipate, react to, and recover from business disruptions, a mindset shift from 'prevent all disruptions' to 'assume severe, infrequent disruptions WILL happen; make sure the firm survives them.' Its five elements: business continuity (minimizing disruption to business processes); key (important) services (identifying and protecting the absolute most critical services so they continue with little or no disruption); impact tolerance levels (the acceptable disruption time for a key service, or the time needed to recover from an incident); disruption processes (how the firm responds to disruptions, retains stakeholder confidence, and communicates effectively during them); and feedback (learning from past incidents to prevent recurrence, continually improving the firm's ability to handle unexpected high-impact events).",
      example: "BCBS's 2021 seven principles of operational resilience: (1) governance, (2) operational risk management, (3) business continuity planning and testing, (4) mapping interconnections and interdependencies, (5) third-party dependency management, (6) incident management, and (7) information and communications technology (ICT), including cybersecurity.",
      related: [{ r: 43, label: "R43: the seven-step operational resilience process in full mechanical detail" }],
      memory: "'Important business services' and 'impact tolerances' get their full mechanical process in R43, this reading gives vocabulary, R43 gives the process."
    },
    {
      name: "Regulatory guidance on operational resilience: who said what, and when",
      def: "Five regulators wrote resilience guidance between 2018 and 2021, and the through-line is that prevention alone was never going to be enough. The UK moved first (2018) on IT continuity after cyber incidents, the Federal Reserve framed resilience as the OUTPUT of a working ORM framework (2020), the Basel Committee issued its seven principles (2021), the ECB proposed DORA to harmonize IT requirements across the EU (2020), and Singapore's MAS addressed remote-work risk (2021).",
      intuition: "As of May 2022, the UK, US, and BCBS are described as the three KEY regulators with formal resilience guidance, the ECB (DORA, still proposed at that point) and MAS/ABS guidance are important but supplementary.",
      pitfall: "The exam can ask you to identify which regulator is LEAST likely to be a 'key' resilience regulator, or to match a specific detail (WFH focus, IT-service continuity focus, the seven-principle list, DORA) back to its issuing body and rough year.",
      related: [],
      memory: "UK 2018 = IT-service continuity after cyber incidents (+ COVID WFH add-on). US Fed 2020 = ORM framework's overall RESULT is resilience. BCBS 2021 = seven principles. ECB DORA = harmonized EU IT rules. MAS/ABS 2021 = WFH-specific."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 41, why: "Governance (who's in charge) is the natural next question after defining what op risk is." },
      { r: 42, why: "The Basel taxonomy introduced here gets a level deeper (Level 2/3 categories), and risk identification is step 1 of the four-step cycle introduced here." },
      { r: 43, why: "The resilience vocabulary here gets its full seven-step process, and risk assessment is step 2 of the four-step cycle introduced here." },
      { r: 44, why: "Risk mitigation is step 3 of the four-step cycle introduced here." },
      { r: 49, why: "Compliance risk, introduced here as a subset of op risk, is explored in depth via AML/financial crime." }
    ],
    confused: [
      { what: "EDPM vs CPBP frequency/severity", how: "Both are HIGH-FREQUENCY categories, not opposites. The real contrast is severity: CPBP is very high severity (about 52% of aggregate loss severity industry-wide) while EDPM is high but somewhat lower severity (about 27%). The genuinely low-frequency/low-severity categories are internal fraud, damage to physical assets, and business disruption/system failures, those are the true opposite end of the spectrum from CPBP, not EDPM." },
      { what: "Business continuity management (BCM) vs operational resilience", how: "BCM is broader, covering continuity for all processes; resilience is narrower, focused specifically on 'important business services' and impact tolerances, clarified further in R43." },
      { what: "Legal risk vs compliance risk", how: "Legal risk is broader (any loss from contract enforcement/nonfulfillment, tied to EPWS and EDPM events); compliance risk is narrower, specifically about adherence to policies/procedures, tied to CPBP events." }
    ]
  },

  misconceptions: [
    { wrong: "\"Execution/delivery/process management (EDPM) events are low-frequency; clients/products/business practices (CPBP) events are low-frequency but high-severity.\"", right: "Per the Basel category table, BOTH EDPM and CPBP are HIGH-FREQUENCY categories. The real distinguishing fact is severity: CPBP is very high severity (≈52% of aggregate loss severity), EDPM is high but somewhat lower severity (≈27%). Low-frequency, low-severity categories are internal fraud, damage to physical assets, and business disruption/system failures." },
    { wrong: "\"Operational resilience means preventing all operational disruptions.\"", right: "Resilience explicitly ACCEPTS that severe, infrequent disruptions will happen, the goal shifts from prevention to ensuring survival and continuity of important services through the disruption." },
    { wrong: "\"Idiosyncratic and heterogeneous mean basically the same thing, 'op risk is varied.'\"", right: "Heterogeneous describes the VARIETY of event types (a typo vs. a hurricane). Idiosyncratic describes the fact that op risk is firm-specific and cannot be centralized or fully hedged away, some residual risk always remains no matter how strong the controls." },
    { wrong: "\"Scenario analysis and stress testing belong to the risk-mitigation step of the ORM cycle.\"", right: "They are RISK ASSESSMENT tools (used to estimate probability and severity for prioritization) which is step 2 of the four-step cycle (identify → assess → mitigate → monitor), not step 3." }
  ],

  highYield: [
    { stars: 5, what: "The seven Basel event-type categories, memorized cold, with examples AND correct frequency/severity per category.", why: "The foundational classification skeleton for the entire book: every later reading assumes fluency here, and the exam tests the exact frequency/severity pairing, not just the category names." },
    { stars: 4, what: "CPBP (very high severity, ≈52%) vs EDPM (high severity, ≈27%): both high-frequency, but CPBP is the single largest severity contributor.", why: "A precise, frequently tested directional pairing that many candidates get backwards by assuming EDPM must be 'low severity.'" },
    { stars: 4, what: "The four-step ORM cycle: identification → assessment → mitigation → monitoring, plus which tools belong to which step.", why: "A clean process the exam likes to test by describing a tool (scenario analysis, KRI tracking) and asking which step it belongs to." },
    { stars: 3, what: "Five characteristics that make op risk hard to manage.", why: "A clean five-item list, good for quick conceptual recall, and each one maps to a specific management headache the exam can probe." },
    { stars: 3, what: "Legal, compliance, reputational, and strategic risk as subsets pulled into operational risk.", why: "Tests whether you know op risk's scope extends beyond 'processes and systems' into these four adjacent risk types." },
    { stars: 2, what: "BCBS's seven principles of operational resilience, and which regulator (UK/US Fed/BCBS/ECB/MAS) issued which guidance and roughly when.", why: "Supporting detail and useful context for R43's deeper process, and a stem can name a guidance document and ask which body issued it." }
  ],

  recall: [
    { q: "A bank experiences thousands of small data-entry errors each year, and separately faces a rare but massive mis-selling lawsuit. Which Basel event-type category does each belong to, and is it accurate to call the data-entry errors 'low severity'?", a: "Data-entry errors are execution, delivery & process management (EDPM), high frequency AND high severity (≈27% of aggregate loss severity industry-wide), not low severity. The mis-selling lawsuit is clients, products & business practices (CPBP), also high frequency, but very high severity (≈52%, the largest single contributor). Together they illustrate that CPBP and EDPM are the two biggest severity drivers in the whole taxonomy, not opposite ends of a frequency/severity spectrum." },
    { q: "Why does operational resilience represent a mindset shift rather than just 'more of the same' risk management?", a: "Traditional risk management tries to PREVENT bad outcomes. Resilience accepts that some severe, infrequent disruptions are effectively unpreventable, and instead focuses on ensuring the firm's most important services can survive and recover from them, a shift from prevention to survival planning, organized around business continuity, key services, impact tolerance levels, disruption processes, and feedback." },
    { q: "A trading desk's data-entry error creates an unintended open position that then loses money as prices move. What is this called, and which of op risk's five characteristics does it illustrate?", a: "This is a boundary event: an operational-risk event (the entry error) that spills over into market risk (the P&L loss from the open position). It illustrates the 'interconnected' characteristic: operational risks correlate with and can trigger losses classified under other risk types." },
    { q: "A firm has excellent internal controls, extensive insurance, and a strong compliance culture. Can it reduce its operational risk to zero?", a: "No. Operational risk's 'idiosyncratic' characteristic means it is diffuse, firm/employee-specific, and cannot be centralized or fully hedged away like market or credit risk, some residual risk always remains no matter how strong the controls, insurance, or culture." }
  ],

  hooks: [
    { title: "Everything else", text: "Op risk is the 'everything else' bucket: not market moves, not credit defaults, but everything from a hacker to a hurricane to a fat-fingered trade. Its heterogeneity IS its defining trait." },
    { title: "Two heavyweight categories, not opposites", text: "Forget 'paper cuts vs. lawsuits' as opposites: CPBP and EDPM are both high-frequency, and together they drive roughly 80% of aggregate loss severity industry-wide (52% + 27%). CPBP just edges out EDPM as the single biggest severity contributor." },
    { title: "Boundary events", text: "When an operational-risk event (a trading error, a system glitch) spills over and causes a market- or credit-risk loss, that's a boundary event, the concrete illustration of op risk's 'interconnected' characteristic." }
  ],

  breakdown: [
    {
      title: "The four-step ORM risk-management cycle",
      points: [
        "Risk identification: find as many relevant risks as possible using tools like group brainstorming and staff interviews (expanded fully in R42).",
        "Risk assessment: determine each risk's probability and severity to prioritize it, using tools like stress testing and scenario analysis; recognize both change over time and by situation (expanded fully in R43).",
        "Risk mitigation: reduce or eliminate high-probability or high-severity risks via internal controls, insurance, or minimizing exposure (expanded fully in R44).",
        "Risk monitoring: verify the process is working via incident-report reviews and key risk indicators; if it isn't, loop back into remedial identification/assessment/mitigation before monitoring again."
      ]
    },
    {
      title: "Basel II event-type categories, with a typical example and its frequency/severity profile",
      points: [
        "Internal fraud (IF): employee defalcation, rogue trading bypassing controls. Low frequency, low severity.",
        "External fraud (EF): credit card fraud, hacking losses. High frequency, low severity.",
        "Employment practices & workplace safety (EPWS): termination disputes, discrimination claims. Moderate frequency, low severity.",
        "Clients, products & business practices (CPBP): misselling, fiduciary breaches, regulatory fines, and errors that generate client complaints requiring compensation. High frequency, VERY HIGH severity (≈52% of aggregate loss severity).",
        "Damage to physical assets (DPA): weather events, terrorism, natural disasters, negligence. Low frequency, low severity.",
        "Business disruption & system failures (BDSF): IT problems, hardware and software failures, service interruptions, utility outages. Low frequency, low severity.",
        "Execution, delivery & process management (EDPM): clerical errors, insufficient documentation. High frequency, HIGH severity (≈27% of aggregate loss severity)."
      ]
    },
    {
      title: "Characteristics that make op risk hard to manage",
      points: [
        "Heterogeneous: a huge range of dissimilar event types resists a single clean statistical model.",
        "Idiosyncratic: diffuse and firm-specific; cannot be centralized or fully hedged away; residual risk always remains.",
        "Heavy-tailed: many small losses plus a few catastrophic ones produce a fat-tailed, left-skewed loss distribution that's hard to measure.",
        "Interconnected: correlates through shared causes and can spill into market/credit risk via boundary events.",
        "Dynamic: the risk profile evolves with business/technology change, forcing reactive rather than proactive management."
      ]
    },
    {
      title: "Risk types operational risk pulls in",
      points: [
        "Legal risk (always included): loss from the enforcement or nonfulfillment of contracts. Most of it originates in EPWS (Type 3) and EDPM (Type 7) events.",
        "Compliance risk (always included): narrower than legal risk, specifically failing to adhere to applicable policies and procedures. Shows up in CPBP (Type 4) events, and the fines attached to it have risen enough over the past decade that many firms now run dedicated compliance departments.",
        "Reputational risk (as needed): the indirect, subjective damage to standing that follows a significant operational event. Needs both prevention and post-incident management, though some firms deliberately accept it in particular product lines or geographies in pursuit of profit.",
        "Strategic risk (as needed): loss from a poor strategic decision, or from poor implementation of a good one. Its common denominator is personnel, specifically senior management, so it turns on skill, information reliability, and governance strength."
      ]
    },
    {
      title: "Operational resilience guidance, by jurisdiction",
      points: [
        "United Kingdom (2018): the FCA, PRA, and Bank of England jointly layered resilience-specific rules on top of existing ORM regulation, initially aimed at continuity of IT services after a cyber incident. COVID-19 forced further adjustment in 2020 for work-from-home handling of sensitive transactions.",
        "United States (2020): the Federal Reserve concluded that an effective ORM framework should PRODUCE operational resilience as its result. Governance is the starting point and ORM the central element, supported by third-party risk management and scenario analysis, with business continuity management and IT systems resiliency alongside, all under ongoing surveillance.",
        "Basel Committee (2021): the seven principles of operational resilience.",
        "European Central Bank (2020, proposed): the Digital Operational Resilience Act (DORA), harmonizing IT-related requirements across EU financial institutions.",
        "Monetary Authority of Singapore and the Association of Banks in Singapore (2021): resilience guidance for remote-work settings, covering operations, IT, fraud, legal, and regulatory risk, plus employee education on work-from-home cyber and fraud risk."
      ]
    },
    {
      title: "Elements of operational resilience",
      points: [
        "Business continuity: minimizing disruption to business processes.",
        "Key (important) services: identifying and protecting the most critical services so they continue with little or no disruption.",
        "Impact tolerance levels: the acceptable disruption time, or recovery time, for a key service.",
        "Disruption processes: how the firm responds to disruptions, retains stakeholder confidence, and communicates during them.",
        "Feedback: learning from past incidents to continuously improve the firm's ability to handle future high-impact events."
      ]
    },
    {
      title: "BCBS's seven principles of operational resilience (2021)",
      points: [
        "Governance: resilience is managed within the firm's existing overall risk-management governance.",
        "Operational risk management: resilience builds on the standard ORM framework.",
        "Business continuity planning and testing: continuity plans must exist and actually be tested.",
        "Mapping interconnections and interdependencies: know how the firm's processes, systems, and third parties connect.",
        "Third-party dependency management: control risk arising from outsourced/vendor relationships.",
        "Incident management: an established process to respond to and recover from incidents.",
        "Information and communications technology (ICT), including cybersecurity, IT systems must be developed to maximize resiliency."
      ]
    }
  ],

  lists: [
    {
      id: "orm-cycle",
      title: "Four-step ORM risk-management cycle",
      axis: "The cycle is sequential and self-correcting: each step feeds the next, and a monitoring failure loops the process back to identification rather than ending it.",
      items: [
        "Identify: find relevant risks using group brainstorming and staff interviews",
        "Assess: determine probability and severity using stress testing and scenario analysis",
        "Mitigate: reduce or eliminate high-priority risks via controls, insurance, or exposure reduction",
        "Monitor: verify the process works via incident reports and key risk indicators"
      ]
    },
    {
      id: "basel-event-types",
      title: "Basel II event-type categories",
      axis: "The order follows Basel's own Type 1 through Type 7 numbering, the fixed reference sequence used industry-wide so loss events are classified and reported consistently from firm to firm.",
      items: [
        "Internal fraud (IF): employee defalcation, rogue trading; low frequency, low severity",
        "External fraud (EF): credit card fraud, hacking losses; high frequency, low severity",
        "Employment practices & workplace safety (EPWS): termination disputes, discrimination claims; moderate frequency, low severity",
        "Clients, products & business practices (CPBP): misselling, fiduciary breaches, regulatory fines; high frequency, very high severity, about 52% of aggregate severity",
        "Damage to physical assets (DPA): natural disasters, negligence; low frequency, low severity",
        "Business disruption & system failures (BDSF): IT failures, utility outages; low frequency, low severity",
        "Execution, delivery & process management (EDPM): clerical errors, insufficient documentation; high frequency, high severity, about 27% of aggregate severity"
      ]
    },
    {
      id: "resilience-elements",
      title: "Elements of operational resilience",
      axis: "The elements move from broad goal to specific mechanics to continuous improvement: name the aim, narrow to what matters most, quantify how much disruption is tolerable, execute the response, then close the loop by learning from it.",
      items: [
        "Business continuity: minimizing disruption to business processes",
        "Key (important) services: identifying and protecting the most critical services",
        "Impact tolerance levels: the acceptable disruption or recovery time for a key service",
        "Disruption processes: how the firm responds, retains confidence, and communicates during disruption",
        "Feedback: learning from past incidents to improve future handling"
      ]
    },
    {
      id: "bcbs-resilience-principles",
      title: "BCBS's seven principles of operational resilience (2021)",
      axis: "The principles move from foundational governance down to the concrete operational capabilities that make resilience real: framework first, then mapping, vendors, incidents, and technology.",
      items: [
        "Governance: resilience managed within the firm's existing risk-management governance",
        "Operational risk management: resilience builds on the standard ORM framework",
        "Business continuity planning and testing: continuity plans must exist and be tested",
        "Mapping interconnections and interdependencies: know how processes, systems, and third parties connect",
        "Third-party dependency management: control risk from outsourced and vendor relationships",
        "Incident management: an established process to respond to and recover from incidents",
        "Information and communications technology (ICT), including cybersecurity: IT systems built to maximize resiliency"
      ]
    }
  ],

  pairs: [
    { left: "BCBS (Basel Committee on Banking Supervision)", right: "Defines operational risk and issued the seven principles of operational resilience in 2021." },
    { left: "UK FCA, PRA, and Bank of England (2018)", right: "Joint resilience rules initially focused on IT-service continuity after cyber incidents." },
    { left: "US Federal Reserve (2020)", right: "Guidance concluding an effective ORM framework should produce operational resilience as its overall result." },
    { left: "European Central Bank / DORA (2020, proposed)", right: "Harmonized IT-related resilience requirements across EU financial institutions." },
    { left: "MAS and ABS, Singapore (2021)", right: "Guidance on resilience specifically in remote-work settings, covering operations, IT, fraud, legal, and regulatory risk." }
  ],

  topicTags: ["op-risk", "basel", "cyber", "governance"],

  quiz: [
    {
      q: "Per the Basel Committee's definition, operational risk is the risk of loss resulting from all of the following EXCEPT:",
      options: ["Inadequate or failed internal processes", "Adverse movements in market prices", "People (e.g., fraud or error)", "External events (e.g., natural disasters)"],
      answer: 1,
      why: "The BCBS definition is 'inadequate or failed internal processes, people, systems, and external events', market price moves are market risk, not operational risk. Operational risk is defined partly BY excluding market and credit risk."
    },
    {
      q: "A risk manager runs a scenario analysis estimating the probability and dollar impact of a prolonged IT outage. Which step of the four-step ORM cycle is this?",
      options: ["Risk identification", "Risk assessment", "Risk mitigation", "Risk monitoring"],
      answer: 1,
      why: "Scenario analysis and stress testing are risk-ASSESSMENT tools, used to estimate probability and severity for prioritization. A common trap is placing them in mitigation (since they sound forward-looking) or monitoring (since they involve tracking), but they belong to step 2, not steps 3 or 4."
    },
    {
      q: "Based on aggregated bank operational loss data (2014 to 2019), which event-type category contributed the largest share of total loss severity?",
      options: ["Execution, delivery & process management (EDPM), at ≈27%", "Clients, products & business practices (CPBP), at ≈52%", "External fraud (EF), due to high frequency", "Internal fraud (IF), due to catastrophic single events"],
      answer: 1,
      why: "CPBP accounted for roughly 52% of aggregate loss severity, the largest of all seven categories, followed by EDPM at roughly 27%. External fraud is high-frequency but low-severity, and internal fraud is low-frequency and low-severity, so neither dominates aggregate severity."
    },
    {
      q: "A trading error creates an unwanted open position, which then loses money as the market moves against it before it can be closed. This is best described as an example of which characteristic of operational risk?",
      options: ["Heterogeneous", "Idiosyncratic", "Interconnected (a boundary event)", "Dynamic"],
      answer: 2,
      why: "This is a boundary event: an operational-risk event (the entry error) that spills over into market risk (the P&L loss). That illustrates 'interconnected', op risk's correlation with, and potential to trigger, losses in other risk categories. 'Dynamic' is the tempting wrong answer because it also sounds forward-looking, but dynamic refers to the risk profile evolving over time with business/technology change, not to a single event crossing risk-type boundaries."
    },
    {
      q: "Which characteristic of operational risk best explains why a firm can never reduce it to zero, even with strong internal controls, insurance, and hedging?",
      options: ["Heterogeneous", "Idiosyncratic", "Heavy-tailed", "Dynamic"],
      answer: 1,
      why: "Idiosyncratic captures the fact that op risk is diffuse and firm-specific, it cannot be centralized or fully transferred/hedged away, so some residual risk always remains regardless of controls. Heterogeneous is about variety of event types, not about the impossibility of full elimination, which is the frequent distractor here."
    },
    {
      q: "In 2020, the U.S. Federal Reserve's guidance concluded that an effective operational risk management framework produces which overall result, supported by third-party risk management and scenario analysis?",
      options: ["Zero operational losses", "Full regulatory capital relief", "Operational resilience", "Elimination of reputational risk"],
      answer: 2,
      why: "The Fed's 2020 guidance framed operational resilience as the overall RESULT of an effective ORM framework, with governance as the starting point and third-party risk management (supply-chain resiliency) plus scenario analysis (anticipating low-probability, high-severity events) as key supports. Resilience does not mean zero losses (that contradicts the whole point of the resilience mindset shift) or capital relief."
    }
  ],

  sources: [
    { title: "BIS: Principles for the Sound Management of Operational Risk", url: "https://www.bis.org/publ/bcbs195.htm", note: "The BCBS source publication behind the operational risk definition and the event-type taxonomy referenced in this reading." },
    { title: "BIS: Principles for Operational Resilience", url: "https://www.bis.org/bcbs/publ/d516.htm", note: "The 2021 BCBS document containing the seven principles of operational resilience covered in this reading." },
    { title: "Federal Reserve: Supervision and Regulation guidance", url: "https://www.federalreserve.gov/supervisionreg.htm", note: "Portal to Federal Reserve supervisory guidance, including the 2020 operational-resilience guidance referenced in this reading." }
  ],

  pdf: { book: 3, query: "risk or loss resulting from inadequate or failed internal processes" },

  summary: `<p>Op risk (BCBS definition) = loss from inadequate or failed internal processes, people, systems, external events, everything that isn't market or credit risk. The ORM framework runs an <strong>iterative four-step cycle</strong>: identify → assess (probability/severity, using scenario analysis and stress testing) → mitigate (controls, insurance, exposure reduction) → monitor (incident reports, KRIs). <strong>Seven Basel categories</strong>, with correct frequency/severity: internal fraud (low/low), external fraud (high/low), employment practices & workplace safety (moderate/low), CPBP (high/very high, ≈52% of aggregate severity), damage to physical assets (low/low), business disruption/system failures (low/low), EDPM (high/high, ≈27% of aggregate severity), CPBP and EDPM together drive roughly 80% of total severity. Op risk also pulls in <strong>legal, compliance, reputational, and strategic risk</strong>. <strong>Five hard-to-manage characteristics</strong>: heterogeneous, idiosyncratic, heavy-tailed, interconnected (boundary events), dynamic. <strong>Operational resilience</strong>: shift from prevention to survival (business continuity, key services, impact tolerances, disruption processes, feedback) with specific guidance from the UK (2018/2020), US Fed (2020), BCBS (seven principles, 2021), ECB's DORA, and Singapore's MAS/ABS (2021).</p>`
});
