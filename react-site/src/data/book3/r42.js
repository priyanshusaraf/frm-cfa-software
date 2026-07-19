export default ({
  book: 3, reading: 42,
  session: "Operational Risk Overview",
  title: "Risk Identification",
  tagline: "Before you can measure or mitigate a risk, you have to find it — two directions to look (top-down, bottom-up), scenario analysis, and the Basel taxonomy one level deeper.",

  teaches: `<p>This reading is the first of four building blocks in the operational risk management framework (ORMF): (1) <strong>identification</strong> — this reading, (2) measurement and assessment (R43), (3) mitigation (R44), and (4) reporting (R45). Once a risk has been found, a bank has to decide whether to accept it and price/capitalize for it, or reject it and mitigate it — but none of that decision-making is possible until the risk has actually been surfaced. R42 teaches three things: (1) the <strong>top-down</strong> and <strong>bottom-up</strong> approaches to finding operational risks, and the specific tools that live under each; (2) the structured process for running <strong>scenario analysis</strong> and scenario workshops, which turn "what could go wrong" into a defined, assessable list of extreme events; and (3) the Basel operational risk taxonomy pushed one level deeper than R40's introduction — Level 1 (7 broad categories) down to Level 2 (20 specific categories) and Level 3 (concrete examples) — plus the newer ORX taxonomy that restructures it into 14 Level-1 categories.</p>`,

  why: `<p>Combining top-down (strategic/emerging risks senior management sees) with bottom-up (operational detail business units see) gives a more complete picture than either alone — a bank that only does one is structurally blind to an entire class of risk. The exam leans less on memorizing which tool is "top-down" versus "bottom-up" in isolation and more on recognizing what each tool is good at spotting, so you can answer questions like "which tool would the CRO recommend for X" (a real module-quiz question type shown below). Scenario analysis matters because it is the bridge from qualitative risk identification into the quantitative assessment machinery of R43 — a scenario workshop's output (a short list of extreme, plausible, financially severe events) becomes the raw material that gets modeled with fault trees, FAIR, and loss distributions in the next reading. And the ORX taxonomy's elevation of model risk and cyber risk to Level-1 status directly explains why R47-48 (cyber) and R53-54 (model risk) get entire dedicated readings later — those risks earned their own spotlight specifically because they no longer fit neatly as sub-items buried inside a broader Basel Level-1 category.</p>`,

  intuition: `<p>Top-down identification is like a satellite view — it catches strategic and emerging risks a business unit embedded in daily operations might miss entirely. Bottom-up is like a ground-level walkthrough — it catches the operational detail (a specific process gap, a specific control weakness) that senior management, working at altitude, simply can't see. Neither view alone is complete; the two are complements, not substitutes. Concretely: the top-down approach cascades down three levels — board and senior management, then divisions/business units, then individual business processes — using tools like brainstorming sessions, a "risk wheel," and exposure/vulnerability analysis. The bottom-up approach is not firmwide; it lives inside a specific business unit or process, typically run as part of a risk and control self-assessment (RCSA), and is done by the people actually doing the work — lower and middle management, not the board. Think of it this way: a bank expanding into a new automated financial-advisor product is a risk a satellite (senior management) would spot from altitude — "this is a new strategic direction with IT and conduct risk." But the specific data-entry error pattern in the trade-confirmation process is something only the ground crew (the business unit doing the confirmations) would notice.</p>`,

  eli5: `<p>Imagine a hospital trying to prevent patient harm. The hospital board and chief medical officer periodically step back and ask big-picture questions — "are we expanding into a risky new surgery type, is our IT system aging, is a pandemic coming?" — that's <strong>top-down</strong>: strategic, infrequent, done by people at the top who see the whole landscape but not the daily details. Meanwhile, each ward's nursing staff fills out a checklist every shift noting near-misses — a medication almost given at the wrong dose, a monitor that beeped late — that's <strong>bottom-up</strong>: granular, frequent, done by the people actually doing the work who would never get noticed from the boardroom. Neither the board's big-picture scan nor the ward's daily checklist alone would catch everything; you need both. In banking, "the board" maps to senior management doing top-down risk identification (risk wheel, exposure/vulnerability analysis, emerging-risk scanning), and "the ward checklist" maps to business-unit-level bottom-up tools (RCSA, process mapping, loss/near-miss data analysis).</p>`,

  thinkLike: `<p>A risk manager treats identification as an inventory-building exercise, not a one-time event: the goal is to populate the bank's <strong>risk register</strong> (also called the risk inventory or risk universe) as completely as possible, because a risk that never gets identified can never be measured, mitigated, or reported — it just sits there as an unpriced tail exposure until it materializes as a loss. A practitioner asks, for every candidate risk-identification exercise, "which altitude am I working at, and what is this tool structurally blind to?" A risk wheel run in a top-down brainstorming session is good at surfacing causal chains (a weather event triggers a service outage which triggers reputational damage) but will never catch a specific process-level data-entry error — that needs process mapping or RCSA at the bottom-up level. The exam tests this by describing a scenario (e.g., "the CRO wants risk assessed at a more local, detailed level — which tool is he LEAST likely to recommend?") and expecting you to correctly sort the tools into their top-down/bottom-up buckets rather than treating them as an undifferentiated list. On scenario analysis, think like a regulator worried about gameable results: the entire emphasis on neutrality, documented rationale, and structured generation-then-selection phases exists because regulators want scenario outputs that are reproducible and defensible across iterations, not a number a business unit backed into to minimize its own capital charge. On taxonomy, think like an analyst building a mapping table: Basel's 7 Level-1 categories are what regulators require for reporting; the ORX taxonomy's 14 categories are what many banks actually use internally because specific risks (cyber, model risk, third-party failure) had grown too large and distinct to stay buried as sub-items — recognizing WHY a risk gets promoted (its scale/severity outgrew its old home) is more testable than memorizing the list itself.</p>`,

  visual: ``,

  formulas: [],

  breakdown: [
    {
      title: "Top-down risk identification tools (3)",
      points: [
        "<strong>Exposures and vulnerabilities analysis</strong> — exposures are what the bank has at stake (major clients, key revenue sources, distribution channels, suppliers, key persons, IT systems, regulations); vulnerabilities are weak spots (obsolete processes, control weaknesses, overdue maintenance/testing, neglected oversight of peripheral units). The dangerous case is where a vulnerability lines up with a significant exposure — e.g., an unmonitored rogue trader — because that combination can produce very large losses or even bankruptcy.",
        "<strong>Risk wheel</strong> — a circular diagram of interconnected risk 'cogs' (business objectives, labor market, reputation, technology, regulation, economy, natural events, data/information, business continuity) used in brainstorming sessions to trace causal chains: e.g., a weather event (natural events cog) causes a multi-day outage (business continuity cog) which, if prolonged, damages the bank's reputation (reputation cog). This causal, root-cause view is proactive rather than merely reactive to symptoms.",
        "<strong>Analyzing emerging risks</strong> — split into predictable risks (cyber, regulatory, climate change — tracked via horizon scanning, including PESTLE analysis: political, economic, social, technological, legal, environmental) and unpredictable risks (e.g., a global pandemic), where the only real defense is overall preparedness and resilience rather than specific forecasting."
      ]
    },
    {
      title: "Bottom-up risk identification tools (3)",
      points: [
        "<strong>Event and loss data analysis</strong> — internal losses (which cluster by transaction volume/size, typically starting in the back office, then financial markets, then retail, then IT) reveal concentration; external losses (via consortia like ORX) show what happened at other banks and prompt a 'could this happen to us' review; <strong>near misses</strong> — incidents that had the potential to become a loss but didn't, purely due to luck rather than a working control — cost nothing in dollars but are cheap, valuable early-warning signals and should always be logged and reported.",
        "<strong>Risk and control self-assessment (RCSA)</strong> — a self-evaluation (by the entire bank, a business unit, or a department) of key operational risks, the controls addressing them, and control strength, typically run by the second line of defense looking at first-line risks, usually annually (and after major risk-profile changes). It measures both inherent risk (before controls) and residual risk (after controls); running it too often turns it into a rote checklist rather than an insightful exercise.",
        "<strong>Process mapping</strong> — laying out a process's individual steps and tying each step's control(s) to the specific risk(s) it is meant to mitigate, revealing whether a risk is under-controlled or over-controlled. Too much detail makes it slow and focused on trivia; too little detail makes it uninformative — the right level ties each key action to its control."
      ]
    },
    {
      title: "Scenario workshop process — two phases",
      points: [
        "<strong>Generation</strong> — facilitators (usually operational risk management specialists, not board members) run brainstorming with upper-management participants from across business units, asking carefully worded questions about past and potential future losses, and may use 'silent voting' (participants privately write down concerns) to avoid one dominant personality skewing the discussion. Scenarios are then classified by risk type or impact.",
        "<strong>Selection</strong> — scenarios that produce the same effect via different causes get combined (e.g., damage to tangible assets from a weather event vs. from civil unrest); scenarios with immaterial impact get dropped; scenarios with material financial impact are retained or added. A midsized bank might generate roughly 30 scenarios and keep about half after selection, with the count scaling up or down for larger or smaller banks.",
        "Banks often cross-check their final scenario list against those published by the Operational Riskdata eXchange (ORX) or the Operational Risk Insurance Consortium (ORIC) to catch omissions — but only AFTER their own generation process, to avoid anchoring bias."
      ]
    },
    {
      title: "Basel taxonomy — three levels",
      points: [
        "<strong>Level 1</strong> — 7 broad event categories (from R40): internal fraud, external fraud, employment practices and workplace safety (EPWS), clients/products/business practices (CPBP), damage to physical assets (DPA), business disruption and system failures (BDSF), and execution/delivery/process management (EDPM). Basel treats Levels 1 and 2 as the mandatory regulatory reporting categories.",
        "<strong>Level 2</strong> — 20 more specific subcategories nested under the 7 Level-1 categories; EDPM and CPBP get the most Level-2 subcategories because they carry the highest frequency/severity of losses among financial firms.",
        "<strong>Level 3</strong> — concrete real-world examples nested under each Level-2 subcategory (e.g., under EDPM: data entry errors from high transaction volume; under BDSF: a funding system crash that forces a bank to arrange $30 billion in emergency funding at above-market cost after the money markets have closed)."
      ]
    },
    {
      title: "ORX taxonomy — what changed vs. Basel",
      points: [
        "Released in 2019, built by ORX with Oliver Wyman, incorporating feedback from banking and insurance practitioners on where the Basel scheme had become inconsistent across firms.",
        "Expands from 7 to 14 Level-1 categories by PROMOTING six specific Basel Level-2 risks up to their own Level-1 status: third-party failure risk, statutory reporting and tax risk, business continuity risk, data management risk, information security risk (including cyber risk), and model risk.",
        "Motivation: practitioners found the same item classified inconsistently across banks (e.g., cyber risk sometimes filed under external fraud, sometimes under IT risk; third-party risk sometimes stand-alone, sometimes under IT) — the ORX taxonomy exists to create an 'international standard' that removes that ambiguity.",
        "The ORX taxonomy is not (yet) used for mandatory regulatory reporting — Basel Levels 1-2 remain the reporting standard; ORX is a widely used internal/analytical supplement."
      ]
    }
  ],

  concepts: [
    {
      name: "Top-down vs. bottom-up identification",
      def: "Top-down: analyzing exposures & vulnerabilities, risk wheel, analyzing emerging risks — run by the board, senior management, business-unit leaders, and department heads (e.g., legal/compliance), typically via brainstorming sessions held quarterly or semiannually (more often if the bank is in emerging/complex technology areas). Bottom-up: event and loss data analysis, risk and control self-assessment (RCSA), process mapping — run at the business-unit or process level by lower and middle management, not the board.",
      intuition: "The single cleanest test to tell them apart: WHO is doing the identifying, not what tool is nominally involved. If it's senior management/the board looking firmwide, it's top-down. If it's the people actually running the process, it's bottom-up.",
      example: "A bank's decision to expand into automated financial advice (a strategic move) surfaces IT and conduct risk via top-down brainstorming. Meanwhile a specific spike in mismatched trade confirmations in the back office surfaces via bottom-up process mapping or RCSA — senior management would likely never see this level of detail directly.",
      pitfall: "Combining both gives a more complete picture than either alone — don't treat one as sufficient on its own. A CRO who wants risk assessed 'at a more local and detailed level' would recommend process mapping, near-miss analysis, or RCSA (bottom-up), and would NOT recommend a risk wheel (top-down, firmwide, brainstorming-based).",
      related: [{ r: 43, label: "R43 — RCSA formalized with full mechanics" }],
      memory: "Top-down: satellite view, catches strategic risks. Bottom-up: ground view, catches operational detail."
    },
    {
      name: "Exposures and vulnerabilities",
      def: "Exposures are what the bank has significant stake in — major clients, key revenue sources, distribution channels, suppliers, key persons, service providers (IT systems, transaction processing), and regulations. Vulnerabilities are weak spots within the firm — obsolete processes, control weaknesses, overdue maintenance/testing/updating, or neglected oversight of peripheral business units.",
      intuition: "Exposures alone aren't dangerous, and vulnerabilities alone aren't dangerous — the risk materializes specifically where a vulnerability lines up with a significant exposure.",
      example: "An unmonitored rogue trader is the textbook case: the exposure is a large trading book (significant capital at stake); the vulnerability is inadequate oversight of that trader's positions. The combination is what produces catastrophic loss potential, not either factor alone.",
      related: [{ r: 41, label: "R41 — the control-oversight structures that are supposed to close this gap" }]
    },
    {
      name: "Risk wheel",
      def: "A top-down brainstorming tool that arranges common bank risks as interconnected 'cogs' in a circle — e.g., business objectives, labor market, reputation, technology, regulation, economy, natural events, data and information, business continuity — to visualize how one risk category causally triggers another.",
      example: "A weather-related disaster (natural events cog) causes a multi-day service outage (business continuity cog); if the outage persists, it damages the bank's reputation (reputation cog). Tracing this causal chain is proactive risk management — it gets at the root cause rather than reacting only to the symptom (the outage itself).",
      pitfall: "The risk wheel is a firmwide, brainstorming-based, top-down tool — it is not designed to surface granular, process-level detail, so it's the wrong answer whenever a question asks for a 'more local and detailed' identification method."
    },
    {
      name: "Near misses",
      def: "Incidents that had the potential to become an operational loss but did not — the key point is that luck, not a working control, is what prevented the loss.",
      intuition: "Near misses carry no monetary cost, which is exactly what makes them valuable: they're the cheapest possible source of information about control weaknesses, since you get the diagnostic insight without having to pay for the lesson.",
      pitfall: "Don't dismiss near misses as 'nothing happened, so nothing to report' — the whole point is that something nearly did happen, and reporting/logging them is how a bank continually improves its control system without waiting for an actual loss to force the issue."
    },
    {
      name: "Scenario analysis & scenario workshops",
      def: "Scenarios are extreme, financially severe, plausible-but-unlikely events (e.g., natural disasters, global pandemics, major cyberattacks, major business disruptions) used to bridge risk identification into quantitative assessment. BCBS guidance defines this as 'low probability and high severity events, some of which could result in severe operational risk losses.' Neutrality is critical (regulators want consistent results across iterations) — achieved through empirical evidence and documented, written rationale for each scenario's development.",
      example: "Scenario workshops run in two phases: generation (facilitators — typically operational risk specialists, not board members — run brainstorming with upper-management participants across business units, sometimes using 'silent voting' to avoid one strong personality dominating) and selection (combine scenarios that share an effect but differ in cause, drop immaterial scenarios, add/retain scenarios with material financial impact). A midsized bank might generate around 30 scenarios and retain roughly half after selection.",
      pitfall: "External participants (outside risk specialists) are rarely used but are valuable specifically because they counter 'myopia' — the tendency to overweight recent events and forget older ones — and because many of a bank's most significant losses (rogue trading, internal IT malfunctions) are actually internal, not external, so an internally-biased panel can under-rate internal-cause scenarios.",
      related: [{ r: 43, label: "R43 — quantitative assessment methods applied to these scenarios" }]
    },
    {
      name: "The Basel taxonomy, one level deeper",
      def: "Three levels: Level 1 = the seven broad event categories (from R40: internal fraud, external fraud, EPWS, CPBP, DPA, BDSF, EDPM); Level 2 = 20 more specific categories nested under those seven; Level 3 = concrete examples nested under Level 2. Basel treats Levels 1 and 2 as mandatory regulatory reporting categories — regulated banks must report operational risk using this structure.",
      example: "EDPM losses: small dollar amount per event, very high frequency (financial firms process huge transaction volumes daily, so miscommunications and data-entry errors are common — even a few days' delay finalizing a large FX transaction can be costly since counterparties require compensation for use of funds). CPBP losses: infrequent, but very large — driven by client/counterparty disputes and regulatory fines for negligent business practices or breaches of advisory/fiduciary duty; litigation-heavy jurisdictions like the U.S. see especially high severity here. A concrete BDSF example: a bank's funding system crashes early in the day and doesn't come back until after money markets close (4:00pm ET); the bank must arrange an extra $30 billion in emergency funding from counterparties at a much higher cost than its normal daily funding rate.",
      pitfall: "The ORX taxonomy elevating 'model risk' and 'information security/cyber risk' to Level-1 status reflects exactly WHY R47-48 (cyber) and R53-54 (model risk) get entire dedicated readings later — these risks earned their own spotlight because they didn't fit neatly in the original 7-category Basel scheme.",
      related: [{ r: 47, label: "R47 — cyber risk, elevated to Level 1 under ORX" }, { r: 53, label: "R53 — model risk, elevated to Level 1 under ORX" }],
      memory: "ORX = Basel's 7 categories, split finer into 14 — cyber and model risk graduate to their own category."
    }
  ],

  connections: {
    from: [
      { r: 41, why: "Once governance roles are established, the next step is actually finding the risks to govern." },
      { r: 40, why: "The Level-1 Basel taxonomy introduced there gets extended to Levels 2 and 3 here." }
    ],
    to: [
      { r: 43, why: "Scenario analysis here feeds directly into R43's quantitative assessment machinery." },
      { r: 47, why: "Cyber risk's promotion to Level-1 under ORX foreshadows its dedicated reading." },
      { r: 53, why: "Model risk's promotion to Level-1 under ORX foreshadows its dedicated reading." }
    ],
    confused: [
      { what: "Top-down vs bottom-up identification", how: "Top-down catches strategic/emerging risks (satellite view); bottom-up catches operational/process-level detail (ground view) — complements, not substitutes." },
      { what: "Basel taxonomy vs ORX taxonomy", how: "Basel has 7 Level-1 categories; ORX (2019) expands to 14 by promoting specific Level-2 risks (cyber, model risk, third-party failure, etc.) up to their own Level-1 status." },
      { what: "Near misses vs. actual losses", how: "A near miss has zero dollar cost by definition — it's a warning signal caught by luck, not a working control. Treat it as data about control weakness, not as something to ignore because 'nothing happened.'" }
    ]
  },

  misconceptions: [
    { wrong: "\"Bottom-up risk identification alone is sufficient since it captures the real operational detail.\"", right: "Top-down identification catches strategic and emerging risks that business-unit-level bottom-up analysis might miss entirely — the two approaches are complements, and combining both gives a more complete picture." },
    { wrong: "\"The ORX taxonomy is just a renamed version of the Basel taxonomy with the same structure.\"", right: "ORX genuinely restructures the taxonomy, expanding from 7 to 14 Level-1 categories by PROMOTING specific risks (cyber, model risk, third-party failure, etc.) that were buried as Level-2 items under Basel, up to their own Level-1 status." },
    { wrong: "\"A risk wheel is the right tool when a CRO wants a more local, granular view of risk.\"", right: "A risk wheel is a top-down, firmwide brainstorming tool for tracing causal chains between risk categories — for local/granular detail you want bottom-up tools like process mapping, RCSA, or near-miss analysis." },
    { wrong: "\"Near misses don't need to be reported because no loss actually occurred.\"", right: "Near misses are valuable precisely because they reveal a control weakness at zero monetary cost — they should always be logged and reported as an inexpensive early-warning system." }
  ],

  highYield: [
    { stars: 3, what: "Top-down vs. bottom-up identification methods and why combining both matters.", why: "A clean two-way comparison, frequently tested as matching or 'which approach catches X' questions, including scenario-based CRO questions." },
    { stars: 3, what: "ORX taxonomy's promotion of cyber and model risk (and 4 other risks) to Level-1 status, and why.", why: "Directly explains the existence of later dedicated readings — a valuable synthesis insight, and the exact list of 6 promoted risks is testable recall." },
    { stars: 2, what: "Three-level Basel taxonomy structure (7 broad → 20 specific → concrete examples) and worked examples (EDPM, CPBP, BDSF).", why: "Straightforward structural recall, plus the qualitative frequency/severity pattern (EDPM high-frequency/low-severity, CPBP low-frequency/high-severity) is a recurring exam distinction." },
    { stars: 2, what: "Scenario workshop's generation → selection phase structure and the role of neutrality/documentation.", why: "Tests whether you understand WHY the process is structured this way (regulatory demand for consistent, reproducible results) rather than just memorizing the two phase names." }
  ],

  recall: [
    { q: "Why might a bank's bottom-up risk identification process miss an emerging risk that top-down analysis would catch?", a: "Bottom-up identification (RCSA, process mapping, loss data analysis) is grounded in existing business unit operations and historical events — it's poorly suited to spotting genuinely NEW, strategic, or emerging risks that haven't yet manifested in unit-level processes or loss data. Top-down analysis, done at a more strategic/enterprise level, is specifically designed to scan for these emerging and cross-cutting risks." },
    { q: "Why did the ORX taxonomy promote cyber risk and model risk to Level-1 status rather than leaving them as Level-2 categories under Basel's original scheme?", a: "These risks had grown significant and distinctive enough that treating them as sub-items buried under a broader Level-1 category (like 'business disruption & system failures' for cyber, or a modeling sub-item elsewhere) understated their importance and made them harder to track/report on their own — promoting them to Level-1 gives them the visibility and dedicated attention their growing significance warrants, foreshadowing why they get entire dedicated readings later in the book." },
    { q: "Why is a near miss valuable even though it produced zero dollar loss?", a: "A near miss shows a control weakness was exposed and the only reason no loss occurred was luck, not a functioning control — reporting it lets the bank fix the gap before luck runs out, at effectively zero cost compared to learning the same lesson from an actual loss event." },
    { q: "Why does regulatory guidance emphasize 'neutrality' in scenario analysis, and how is it achieved?", a: "Regulators require scenario analysis results to remain consistent across repeated iterations, so a process that's vulnerable to behavioral bias or inconsistent methodology would produce unreliable, ungameable-by-design capital inputs. Neutrality is achieved through empirical evidence, documented explanations for how/why each scenario was developed, and detailed write-ups supporting the assumptions and methodology used." }
  ],

  hooks: [
    { title: "Satellite view vs. ground view", text: "Top-down: fly high, see the whole landscape, spot emerging threats on the horizon. Bottom-up: walk the factory floor, see the crack in this specific pipe. Neither view alone tells the whole story." },
    { title: "Graduation day for cyber and model risk", text: "ORX's taxonomy is basically a graduation ceremony: cyber risk and model risk, once buried as sub-items, get promoted to their own Level-1 category — a promotion that foreshadows their own dedicated readings later in the book." },
    { title: "The $30 billion late-night funding scramble", text: "A funding system crashes before markets close; by the time it's back, money markets are shut. The bank has to scrounge $30 billion from counterparties at a premium rate — a single BDSF event, purely from timing, not fraud or negligence." }
  ],

  summary: `<p><strong>Top-down</strong> (exposures/vulnerabilities, risk wheel, emerging risks — strategic view, run by the board/senior management) vs. <strong>bottom-up</strong> (event/loss data, RCSA, process mapping — operational view, run by business units); combine both. Top-down tools: exposure/vulnerability analysis, risk wheel (causal 'cogs'), emerging-risk scanning (predictable via horizon scanning/PESTLE, unpredictable via preparedness). Bottom-up tools: event/loss data analysis (internal, external via ORX, and near misses — zero-cost early warnings), RCSA (inherent vs. residual risk), process mapping (tying controls to risks). <strong>Scenario analysis</strong>: extreme, plausible-but-unlikely events; neutrality via empirical evidence + documented rationale; workshops run generation (brainstorm, silent voting) → selection (combine/drop/add) phases; ~30 scenarios generated, ~half retained for a midsized bank. <strong>Basel taxonomy</strong>: Level 1 (7 broad categories: internal fraud, external fraud, EPWS, CPBP, DPA, BDSF, EDPM) → Level 2 (20 specific) → Level 3 (examples); EDPM small/frequent, CPBP infrequent/large, illustrated by a $30B emergency-funding BDSF example. <strong>ORX taxonomy</strong> (2019): expands to 14 Level-1 categories, promoting third-party failure, statutory reporting/tax, business continuity, data management, information security/cyber, and model risk — directly explaining why these topics earn dedicated readings later.</p>`,

  quiz: [
    {
      q: "Which of the following is most likely to be classified as a vulnerability rather than an exposure, in the context of top-down risk identification?",
      options: ["Critical third-party suppliers", "Main drivers of revenue", "Stand-alone, obsolete IT systems", "The bank's principal regulator"],
      answer: 2,
      why: "Vulnerabilities are internal weak spots — obsolete processes, control weaknesses, or systems overdue for updating — not the things the bank has significant stake in (exposures like key suppliers, revenue drivers, or its regulator). Stand-alone/obsolete IT systems fit the definition of a vulnerability; the other three are examples of exposures."
    },
    {
      q: "A CRO wants operational risk assessed at a more local, granular, business-unit level. Which tool is the CRO LEAST likely to recommend?",
      options: ["Process mapping", "Risk and control self-assessment (RCSA)", "Analysis of near misses", "Risk wheel"],
      answer: 3,
      why: "The risk wheel is a top-down, firmwide brainstorming tool for tracing causal chains between broad risk categories — it is not designed for local, granular detail. Process mapping, RCSA, and near-miss analysis are all bottom-up tools that operate at the business-unit or process level, which is exactly what the CRO wants."
    },
    {
      q: "Which statement about scenario analysis workshops is most accurate?",
      options: [
        "Assumptions must be based only on real-life historical data, never expert judgment",
        "Facilitators should be drawn from the board of directors and senior management",
        "Participants should span a full range of seniority levels within different business units",
        "A 'preparation pack' of documents is most commonly withheld until after the generation phase to reduce bias"
      ],
      answer: 3,
      why: "The most accurate statement is that documents are often deliberately withheld from participants until after the generation phase specifically to avoid biasing initial brainstorming. Facilitators are typically operational risk management specialists (not board members); participants are typically upper management (not a full range of seniority); and assumptions rely on empirical evidence plus documented rationale, not exclusively real-life data."
    },
    {
      q: "The ORX taxonomy (2019) expands the Basel taxonomy from 7 to 14 Level-1 risk categories. This expansion is achieved primarily by:",
      options: [
        "Inventing six entirely new risk types that did not exist under Basel",
        "Promoting six specific Basel Level-2 risks (e.g., cyber, model risk, third-party failure) up to Level-1 status",
        "Splitting the existing 7 Basel categories exactly in half",
        "Replacing Basel's regulatory reporting categories entirely, since ORX is now mandatory for reporting"
      ],
      answer: 1,
      why: "ORX promotes specific risks that were previously buried as Level-2 sub-items under Basel's broader Level-1 categories — third-party failure, statutory reporting/tax, business continuity, data management, information security/cyber, and model risk — up to their own Level-1 status. It does not invent new risk types from scratch, does not split categories evenly, and is explicitly NOT (yet) used for mandatory regulatory reporting, which still relies on Basel."
    },
    {
      q: "A bank's execution, delivery, and process management (EDPM) losses and clients, products, and business practices (CPBP) losses typically differ in which pattern?",
      options: [
        "EDPM: infrequent and large; CPBP: frequent and small",
        "EDPM: frequent and small; CPBP: infrequent and large",
        "Both categories show similarly high frequency and similarly high severity",
        "Both categories show similarly low frequency and similarly low severity"
      ],
      answer: 1,
      why: "EDPM losses (data entry errors, transaction miscommunications) occur at high frequency but each event is typically small in dollar terms, driven by financial firms' huge daily transaction volumes. CPBP losses (client/counterparty disputes, regulatory fines for negligent practices) are far less frequent but can be very large, especially in litigation-heavy jurisdictions like the U.S. This frequency/severity contrast is a frequently tested distinction, not the reverse pattern (\"EDPM infrequent and large, CPBP frequent and small\")."
    },
    {
      q: "Why are near misses considered a valuable input to risk identification even though they generate no financial loss?",
      options: [
        "They are a regulatory reporting requirement under Basel Level 1",
        "They reveal a control weakness at essentially zero cost, since the loss was avoided only by luck rather than a functioning control",
        "They automatically get converted into a scenario for the scenario workshop's generation phase",
        "They indicate that the bank's controls are working exactly as designed"
      ],
      answer: 1,
      why: "A near miss means a loss almost happened and was avoided by luck, not because an existing control caught it — so it exposes a real control gap without costing the bank anything to learn about it. It is not a Basel Level-1 reporting requirement, does not automatically feed the scenario workshop, and (crucially) indicates a control WEAKNESS, not controls working as designed — the tempting \"controls are working exactly as designed\" answer inverts the actual lesson."
    }
  ],

  sources: [
    { title: "Operational risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Operational_risk", note: "Background on the definition of operational risk and how identification fits into the broader risk-management framework." },
    { title: "Basel II: International Convergence of Capital Measurement and Capital Standards (BCBS, Annex 9)", url: "https://www.bis.org/publ/bcbs128.htm", note: "The original source of the 7-category, Level 1/2 Basel operational risk event-type taxonomy referenced throughout this reading." },
    { title: "Risk register — Wikipedia", url: "https://en.wikipedia.org/wiki/Risk_register", note: "Explains the risk inventory/risk register/risk universe concept that top-down and bottom-up identification tools feed into." },
    { title: "GARP — Global Association of Risk Professionals", url: "https://www.garp.org/", note: "Publisher of the FRM curriculum and the GARP Operational Risk and Resilience text this reading is drawn from." }
  ],

  pdf: { book: 3, query: "There are two approaches to consider for identifying operational risks" }
});
