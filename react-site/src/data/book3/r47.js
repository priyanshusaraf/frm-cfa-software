export default ({
  book: 3, reading: 47,
  session: "Operational Risk Focus Areas",
  title: "Cyber-Resilience: Range of Practices",
  tagline: "A survey of how regulators globally approach cyber risk — deliberately non-prescriptive, so the exam tests the categories of practice rather than one 'correct' standard.",

  teaches: `<p>This reading is based on a December 2018 Basel Committee on Banking Supervision report that surveyed how banking regulators around the world actually handle cyber risk. The Committee did not write a single global rulebook — instead it compared what dozens of jurisdictions (the U.S., EU, U.K., Japan, Singapore, Hong Kong, Australia, Brazil, and others) each require, and grouped their practices into recurring categories. You need four groupings: <strong>five areas of cyber-governance</strong> (strategy, roles &amp; responsibilities, awareness, architecture &amp; standards, workforce — who is responsible and how the organization is set up to manage cyber risk), <strong>four areas of cyber risk management &amp; response</strong> (supervision, information security controls, incident response &amp; recovery, metrics — what the institution and its regulator actually <em>do</em> day to day), <strong>five information-sharing channels</strong> (bank-to-bank, bank-to-regulator, regulator-to-regulator, regulator-to-bank, and bank/regulator-to-security-agency — how threat intelligence flows between parties), and the <strong>governance dimensions of third-party cyber risk</strong> (because banks now outsource so much IT infrastructure — cloud hosting, payment processors, software vendors — that a bank's own cyber-resilience is only as strong as its weakest vendor).</p>`,

  why: `<p>Cyber risk was promoted to Level-1 status under the ORX operational risk taxonomy (see R42) — meaning regulators stopped treating it as a sub-bullet under "external fraud" or "business disruption" and gave it its own top-level category. That promotion is exactly why this reading exists as a dedicated chapter: cyber risk doesn't behave like a generic operational risk. Losses can be sudden, systemic (one vulnerability can hit thousands of institutions simultaneously, as happened with several supply-chain software attacks), and adversarial — a fraud model or a broken process doesn't actively adapt to your defenses, but a hacker does. Regulators responded with a wave of new supervisory expectations post-2015, and the exam wants you to recognize the recurring shape of those expectations even though no two countries wrote identical rules.</p>`,

  intuition: `<p>Because practices vary so widely by jurisdiction — Hong Kong's guidance emphasizes effective risk management, Singapore's emphasizes detecting attacks, Brazil's emphasizes having a written cybersecurity policy, the EU's emphasizes common procedures and methodologies — there is no single correct answer to "what does cyber regulation require?" So the exam instead tests whether you know the <em>categories</em> regulators look at. Treat this reading like a checklist with four buckets: (1) <strong>governance</strong> — who inside the bank is accountable, from the board down to IT staff; (2) <strong>risk management &amp; response</strong> — what the bank and its supervisor actually do to detect, test, and recover from attacks; (3) <strong>information sharing</strong> — how threat intelligence moves between banks, regulators, and security agencies, and which of those flows are legally required versus purely voluntary; (4) <strong>third-party risk</strong> — because a bank rarely runs all its own IT anymore, what obligations exist around vendors, cloud providers, and sub-outsourcers. Almost every exam question is really just asking "which bucket, and which item within it, does this fact pattern describe?"</p>`,

  formulas: [],

  concepts: [
    {
      name: "Five areas of cyber governance",
      def: "The five areas regulators examine when assessing how a bank organizes itself to manage cyber risk: (1) cybersecurity strategy — does the institution have (or is it required to have) a defined strategy and does it align with the overall business strategy; (2) management roles & responsibilities — board and senior-management accountability, often mapped onto the three-lines-of-defense model; (3) awareness — training, background checks/NDAs for new staff, and a risk-aware culture; (4) architecture & standards — technical controls like content storage requirements and periodic self-assessments; (5) workforce — the skills, certifications, and defined responsibilities of the IT/cyber staff itself.",
      intuition: "Governance answers 'who is responsible and how is the organization set up' before any technical control is even discussed — regulators check the org chart and the policy documents first, because a bank with no clear ownership of cyber risk will fail at execution regardless of how good its firewalls are.",
      example: "Three distinct regulatory approaches to cybersecurity strategy specifically: (1) the regulator itself sets sector-wide cybersecurity requirements — common in emerging markets with a homogeneous banking system; (2) the bank writes its own strategy, which the regulator then reviews as part of broader risk-management supervision — the dominant U.S./Mexico model; (3) the regulator checks whether the bank's general IT strategy adequately covers cyber risk, without requiring a stand-alone cyber strategy document — common in Europe. Germany's BAIT (Banking Supervisory Requirements for IT) is a concrete named example covering IT strategy/governance, information risk and security management, user access agreements, and IT project management.",
      pitfall: "Do not assume every jurisdiction mandates a stand-alone cybersecurity strategy document — neither U.S. nor Mexican regulation specifically requires one; both instead review cyber risk as embedded within the institution's broader information security framework.",
      related: [{ r: 41, label: "R41 — the three lines of defense model reapplied here" }]
    },
    {
      name: "Four areas of cyber risk management & response",
      def: "The four operational buckets covering what a bank and its supervisor actually do about cyber risk day-to-day: (1) supervision of cyber-resilience — regulators trigger reviews from a bank's own self-assessments, inspection findings, or after actual incidents; (2) information security controls — mapping/classifying business assets, real-time threat detection, and penetration testing (a simulated attack used to find exploitable weaknesses before a real attacker does); (3) incident response and recovery — the policies for detecting, escalating, and recovering from an incident once it happens, plus joint public-private training exercises (e.g., G7 exercises, joint U.S.-U.K. drills); (4) cybersecurity & resilience metrics — how progress and readiness are actually measured.",
      intuition: "Read this as a timeline: supervision happens continuously in the background, controls are the preventive layer, response/recovery is what kicks in the moment something goes wrong, and metrics are how everyone — bank and regulator — judges whether any of this is actually working.",
      pitfall: "No standardized quantitative metrics exist yet for cybersecurity, unlike credit or market risk where regulators have decades of loss data and agreed formulas (VaR, expected loss, etc.). Backward-looking metrics (e.g., counting last year's incidents) can be useful when the threat environment is stable, but attackers actively adapt to a bank's defenses — so forward-looking indicators (e.g., trend analysis of vulnerabilities, threat intelligence) are increasingly valued precisely because a low incident count last year says nothing about readiness for a novel attack next year. A distributed denial-of-service (DDoS) attack — where a single system is flooded with traffic from many compromised sources simultaneously — is the textbook example of an evolving, coordinated threat that a backward-looking metric would miss.",
      related: []
    },
    {
      name: "Information-sharing channels",
      def: "The five directions cybersecurity information can flow: (1) bank-to-bank — sharing threat intelligence and incident details with peer institutions, entirely dependent on the level of trust between banks (research shows banks build this trust incrementally, starting with a small group before widening the circle); (2) bank-to-regulator — banks report cyber incidents to their supervisor; this is usually mandated by regulation and is one of the three most common channels; (3) regulator-to-regulator — domestic or cross-border information exchange between supervisory authorities; the least frequent channel because arrangements are ad hoc rather than systematic; (4) regulator-to-bank — supervisors who received incident data from banks anonymize or summarize it and share findings back out; uncommon, with little formal guidance in most jurisdictions; (5) banks/regulators-to-security-agencies — sharing with national security/law-enforcement bodies such as CERTs (Computer Emergency Readiness Teams); mostly voluntary, though some jurisdictions (Canada, Singapore, France, Spain) mandate it.",
      intuition: "The flow of information is asymmetric, not a two-way street with matching obligations on each side — regulation is far more comfortable compelling banks to report upward to supervisors than compelling supervisors or peer banks to report information back down or sideways. That asymmetry itself is a testable idea.",
      example: "Singapore illustrates that voluntary and mandatory sharing can coexist within one jurisdiction: the Monetary Authority of Singapore (MAS) mandates that banks report cybersecurity incidents to it, but the exchange of cyber risk information between MAS and Singapore's Cyber Security Agency (CSA) is voluntary. In the U.S., banks and regulators can submit cybersecurity information voluntarily through an online portal run by U.S. CERT and the National Cybersecurity and Communications Integration Center; Luxembourg has an analogous voluntary portal, the Computer Incident Response Center.",
      pitfall: "Know all five — a frequently tested list where the exam asks which channel is 'usually mandated' vs. 'mostly voluntary' vs. 'rare.' The three MOST COMMON channels are bank-to-bank, bank-to-regulator, and bank/regulator-to-security-agency; regulator-to-regulator and regulator-to-bank are both less frequent because their sharing arrangements are less systematic (ad hoc rather than routine).",
      related: [],
      memory: "Mandated: bank→regulator. Rare (least frequent, ad hoc): regulator↔regulator. Voluntary (mostly, some mandates): bank/regulator→security agencies."
    },
    {
      name: "Third-party cyber risk dimensions",
      def: "The six lenses regulators use to assess a bank's exposure to its vendors and interconnected counterparties: (1) governance of third-party interconnections — does the bank have a proper outsourcing framework defining roles, scope, risk analysis (covering strategic, compliance, security, business-continuity, vendor lock-in, counterparty, and access risks), and monitoring; (2) business continuity & availability — can critical activities be recovered, and are the vendor's own continuity policies aligned with the bank's; (3) information confidentiality & integrity — data protection, encryption, and access-limitation requirements covering data the vendor holds or processes; (4) visibility into third-party (and sub-outsourcing) relationships — does the bank maintain an inventory of outsourced functions and have insight into who its vendors, in turn, outsource to; (5) auditing/testing rights — does the bank (or its regulator) retain the contractual right to audit or inspect the vendor; (6) resources and skills — does the bank employ enough qualified staff (e.g., Certified Information Systems Security Professionals) to actually oversee these outsourcing relationships, including a backup/succession plan if a key person leaves.",
      intuition: "'Third parties' is broader than just outsourced IT functions — the source explicitly includes cloud computing, but also non-outsourcing dependencies like power supply and telecom lines, plus financial-market interconnections like payment/settlement systems, trading platforms, and central counterparties (CCPs). A bank can be cyber-exposed through a counterparty it never formally 'hired.'",
      example: "The EU's MiFID II directive gives supervisory authority over interactions between institutions, supervisors, and third-party providers, and EU rules may require banks to disclose the physical location of cloud data centers. Germany, Switzerland, and Singapore go further and require the bank retain a contractual right to intervene directly with the vendor if problems emerge — not just a right to audit after the fact.",
      related: [{ r: 50, label: "R50 — outsourcing risk generally, this cyber-specific lens applied there too" }]
    }
  ],

  connections: {
    from: [
      { r: 42, why: "Cyber risk's promotion to Level-1 status under the ORX taxonomy directly foreshadows this dedicated reading." },
      { r: 41, why: "The three lines of defense model reapplies here to cyber governance specifically." }
    ],
    to: [
      { r: 48, why: "The Equifax case study concretely illustrates these framework categories failing in practice." }
    ],
    confused: [
      { what: "Bank-to-regulator vs regulator-to-bank information sharing", how: "Bank-to-regulator is usually MANDATED; regulator-to-bank is uncommon with little formal guidance — the flow of information is asymmetric, not a two-way street with equal obligations." }
    ]
  },

  misconceptions: [
    { wrong: "\"There's a single global standard for cybersecurity practices that all regulators follow.\"", right: "Practices are deliberately non-prescriptive and vary significantly by jurisdiction — the exam tests the CATEGORIES of practice, not one universal rulebook." },
    { wrong: "\"Backward-looking cybersecurity metrics (like past incident counts) are the most valuable indicators.\"", right: "Forward-looking indicators are increasingly valued over backward-looking data, since standardized quantitative metrics don't yet exist and past incidents say little about emerging threat readiness — especially because attackers actively adapt, unlike a static credit or market risk." },
    { wrong: "\"Sharing among regulators is the most common information-sharing channel, since regulators trust each other more than they trust banks.\"", right: "Sharing among regulators is actually the LEAST frequent flow — arrangements between regulators are less systematic than bank-to-bank, bank-to-regulator, or bank/regulator-to-security-agency channels, which are the three most common." },
    { wrong: "\"Third-party cyber risk only covers formally outsourced IT functions like cloud hosting.\"", right: "It also covers non-outsourcing dependencies (power supply, telecom lines, commercial hardware/software) and financial-market interconnections (payment/settlement systems, trading platforms, central counterparties) — a bank can be cyber-exposed through counterparties it never formally hired." }
  ],

  highYield: [
    { stars: 3, what: "Five information-sharing channels and their relative mandate/frequency (mandated vs voluntary vs rare).", why: "A specific, memorizable list frequently tested for which channel is which." },
    { stars: 3, what: "Five areas of cyber governance and four areas of cyber risk management/response.", why: "The core classification structure of this reading." },
    { stars: 2, what: "Third-party cyber risk dimensions.", why: "Connects to the broader outsourcing risk theme (R50-51)." },
    { stars: 2, what: "The three approaches regulators take to cybersecurity strategy (regulator sets requirements / bank writes own strategy / regulator reviews existing IT strategy).", why: "Tests whether you can classify a described jurisdiction's approach correctly, e.g. 'emerging market with homogeneous banking system' maps to sector-wide regulator-set requirements." }
  ],

  recall: [
    { q: "Why does this reading emphasize categories of cyber risk practice rather than a single prescriptive standard?", a: "Cyber regulatory practices vary significantly by jurisdiction, with no single global standard — the framework is deliberately non-prescriptive, so understanding the CATEGORIES (governance areas, risk management areas, information-sharing channels) matters more than memorizing one specific regulatory regime's exact rules." },
    { q: "Which information-sharing channel is usually mandated, and which is typically voluntary?", a: "Bank-to-regulator sharing is usually MANDATED (banks must report to their supervisors). Banks/regulators-to-security-agencies sharing is mostly VOLUNTARY. Regulator-to-regulator sharing is rare and cross-border-dependent; regulator-to-bank sharing is uncommon with little formal guidance." },
    { q: "Country X's regulator sets sector-wide cybersecurity requirements that apply uniformly across all banks. What kind of banking system does this most likely indicate, and why?", a: "An emerging economy with a homogeneous banking system — sector-wide, regulator-imposed requirements work best where banks are structurally similar to each other; in more developed, fragmented systems regulators instead tend to review each institution's own strategy or its general IT strategy rather than impose one uniform rulebook." },
    { q: "Name the four areas of cyber risk management and incident response and recovery.", a: "(1) Supervision of cyber-resilience, (2) information security controls, (3) incident response and recovery, (4) cybersecurity and resilience metrics." }
  ],

  hooks: [
    { title: "No single rulebook", text: "Cyber regulation is a patchwork quilt, not a single blanket — different jurisdictions, different rules. Learn the CATEGORIES the quilt is stitched from, not any one square." },
    { title: "Asymmetric plumbing", text: "Picture cyber information as water in pipes: banks are required to pour their incident data uphill to regulators (mandated), but almost nothing is required to flow back downhill or sideways — the pipes going the 'wrong' direction are mostly voluntary or simply don't exist yet." }
  ],

  eli5: `<p>Imagine every school in a city has its own rules about fire drills — some schools are told exactly how often to run one by the city fire department, some schools write their own fire-safety plan and just show it to an inspector, and some schools are only checked to see if their general safety plan happens to cover fires too. There's no single citywide fire-drill rulebook, but every school's approach falls into one of those three patterns. That's exactly how cybersecurity strategy works across countries: regulators either (1) mandate the requirements directly, (2) let the bank write its own plan and review it, or (3) just check that the bank's broader IT plan happens to cover cyber risk — no single global standard, but a small number of repeating patterns you can recognize.</p>`,

  thinkLike: `<p>A risk manager reading this Basel Committee survey isn't looking for "the rule" — there isn't one — they're building a comparison matrix: for the jurisdictions their bank operates in, which of the five governance areas are prescriptive versus principles-based, which information-sharing obligations are mandatory versus voluntary, and where are the third-party oversight gaps. A bank operating across the EU, U.S., and Singapore has to satisfy all three regimes simultaneously, and the fragmentation itself (different reporting timeframes — 2, 4, or 72 hours; different taxonomies; different templates) is a real operational cost the risk manager has to budget for, not just a compliance footnote.</p><p>The examiner tests this by giving you a short fact pattern about one jurisdiction ("Country X mandates sector-wide requirements," "the MAS requires banks to report incidents but sharing with the CSA is voluntary") and asking you to classify it into the right bucket — which governance area, which of the four risk-management areas, which of the five sharing channels, or which third-party dimension. You are almost never asked to recall a country-specific rule from memory; you're asked to recognize which category a described practice belongs to.</p>`,

  breakdown: [
    {
      title: "Five areas of cyber governance",
      points: [
        "Cybersecurity strategy — whether a defined, board-reviewed strategy exists and aligns with overall business strategy; three regulatory approaches exist (regulator sets requirements / bank writes its own / regulator reviews existing IT strategy).",
        "Management roles & responsibilities — board and senior-management accountability, often (but not mandatorily) organized around the three-lines-of-defense model; supervision tends to focus on lines 1 and 2, which can weaken the model's effectiveness.",
        "Awareness — staff training, screening/background checks and NDAs for new hires, periodic reverification for existing staff, and building a common risk culture.",
        "Architecture & standards — technical controls such as content storage requirements and periodic self-assessments; few countries have detailed rules here.",
        "Workforce — skills and competencies of IT/cyber staff, assessed via on-site inspections of training, qualifications, and defined roles."
      ]
    },
    {
      title: "Four areas of cyber risk management & response",
      points: [
        "Supervision of cyber-resilience — reviews triggered by a bank's own risk assessments, inspection findings, or actual incidents; jurisdictions increasingly engage industry via conferences and discussion papers to influence behavior.",
        "Information security controls — mapping/classifying assets, real-time threat detection, penetration testing (simulated attacks to find weaknesses), often voluntarily funded by the institutions themselves.",
        "Incident response and recovery — policies for detection, escalation, and recovery; supplemented by joint public-private training exercises (e.g., G7, U.S.-U.K.).",
        "Cybersecurity & resilience metrics — no standardized quantitative metrics exist; forward-looking indicators are increasingly valued over backward-looking data because attackers adapt to defenses."
      ]
    },
    {
      title: "Five information-sharing channels",
      points: [
        "Bank-to-bank — trust-dependent, built incrementally (small group first, then wider); only Brazil, Japan, and Saudi Arabia mandate it.",
        "Bank-to-regulator — usually mandated; one of the three most common channels; purposes include systemic risk monitoring and improving regulatory oversight.",
        "Regulator-to-regulator — least frequent channel; domestic or cross-border (e.g., the 2018 Hong Kong Monetary Authority–MAS bilateral agreement).",
        "Regulator-to-bank — uncommon, little formal guidance; only China mandates it; Singapore and the U.K. do it voluntarily.",
        "Bank/regulator-to-security-agencies — mostly voluntary; mandatory in Canada, Singapore, France, and Spain; agencies include CERTs (Computer Emergency Readiness Teams)."
      ]
    },
    {
      title: "Third-party cyber risk dimensions",
      points: [
        "Governance of third-party interconnections — outsourcing framework covering roles, scope, and risk analysis (strategic, compliance, security, continuity, vendor lock-in, counterparty, access risks).",
        "Business continuity and availability — recovery plans for critical activities, alignment of vendor continuity policies with the bank's own; tested via annual scenario analysis.",
        "Information confidentiality and integrity — data protection agreements, encryption, access-limitation, and cloud data-location rules.",
        "Visibility into third-party (and sub-outsourcing) relationships — inventories of outsourced functions and insight into vendors' own sub-outsourcing.",
        "Auditing and testing — contractual rights to audit/inspect vendors, sometimes extended directly to the supervisor (France, Switzerland, Singapore).",
        "Resources and skills — adequate, qualified staff (e.g., CISSP-certified) to oversee outsourcing, plus succession planning for key personnel."
      ]
    }
  ],

  quiz: [
    {
      q: "A jurisdiction's banking regulator establishes uniform, sector-wide cybersecurity requirements that apply to every bank the same way. This is most consistent with which environment?",
      options: [
        "An emerging economy with a homogeneous banking system",
        "A developed economy with a fragmented banking system",
        "A developed economy with a homogeneous banking system",
        "An emerging economy with a fragmented banking system"
      ],
      answer: 0,
      why: "Sector-wide, regulator-imposed requirements work best where banks are structurally similar — this is common in emerging markets with homogeneous banking systems. A 'developed economy with a fragmented banking system' (the tempting distractor) is actually the setting where regulators are more likely to review each institution's individually developed strategy, since a single blanket rule fits poorly across diverse, fragmented institutions."
    },
    {
      q: "Which of the following is NOT one of the four areas of cyber risk management and incident response and recovery?",
      options: [
        "Supervision of cyber-resilience",
        "Architecture and standards",
        "Information security controls",
        "Cybersecurity and resilience metrics"
      ],
      answer: 1,
      why: "The four risk-management/response areas are supervision, information security controls, incident response and recovery, and metrics. 'Architecture and standards' is tempting because it sounds operational, but it actually belongs to the FIVE areas of cyber GOVERNANCE, not the four areas of risk management and response — a classic bucket-swap trap."
    },
    {
      q: "Which type of cybersecurity information-sharing practice is LEAST common?",
      options: [
        "Sharing among banks",
        "Sharing from banks to regulators",
        "Sharing among regulators",
        "Sharing with security agencies"
      ],
      answer: 2,
      why: "Sharing among regulators is the least frequent channel because these arrangements are less systematic (ad hoc bilateral deals rather than routine flows). Bank-to-bank, bank-to-regulator, and bank/regulator-to-security-agency are explicitly identified as the three MOST common channels, making them the tempting-but-wrong choices."
    },
    {
      q: "Which of the following risks would LEAST likely be covered in the risk analysis section of a bank's outsourcing framework, per the reading's list of covered risks?",
      options: [
        "Vendor lock-in risk",
        "Strategic risk",
        "Liquidity risk",
        "Compliance risk"
      ],
      answer: 2,
      why: "The reading's explicit list of risks covered in an outsourcing risk analysis is: strategic, compliance, security, business continuity, vendor lock-in, counterparty, and access risks. Liquidity risk is not on that list — it belongs to a different risk domain (funding/market liquidity) entirely, even though it sounds like a plausible generic 'bank risk' to include."
    },
    {
      q: "Singapore's Monetary Authority (MAS) requires banks to report cybersecurity incidents to it, but information exchange between MAS and Singapore's Cyber Security Agency (CSA) is not required by law. This scenario best illustrates which point about information sharing?",
      options: [
        "Sharing among regulators is always mandatory once a domestic regulator is involved",
        "A single jurisdiction can mix mandatory and voluntary sharing depending on which channel and which parties are involved",
        "Bank-to-regulator sharing is always voluntary unless a security agency is also involved",
        "Regulator-to-bank sharing is more common than bank-to-regulator sharing in Asia"
      ],
      answer: 1,
      why: "The Singapore example directly shows that mandatory and voluntary sharing coexist within one jurisdiction depending on the specific channel (bank-to-regulator is mandated here, while the regulator-to-security-agency link is voluntary). The 'sharing among regulators is always mandatory' answer overgeneralizes from one bilateral MAS-CSA relationship to all regulator sharing; the 'bank-to-regulator sharing is always voluntary unless a security agency is involved' answer inverts the actual (mandated) status of bank-to-regulator sharing; the 'regulator-to-bank sharing is more common in Asia' answer has no support in the text."
    },
    {
      q: "Why are forward-looking indicators increasingly valued over backward-looking data in cybersecurity and resilience metrics, according to the reading?",
      options: [
        "Backward-looking data is illegal to collect in most jurisdictions under data-protection law",
        "Standardized quantitative cybersecurity metrics comparable to financial risk metrics exist, but backward-looking ones are more expensive to compute",
        "Attackers continuously adapt to an institution's changing defenses, so past incident counts say little about readiness for emerging or evolving threats",
        "Regulators have banned the use of incident-report data in supervisory reviews"
      ],
      answer: 2,
      why: "The reading explains that 'adversaries' continuously adapt to institutions' changing defenses (e.g., coordinated DDoS attacks from multiple sources), so backward-looking indicators — useful only in a stable threat environment — lose predictive value; forward-looking indicators better capture emerging risk. The 'standardized metrics exist but backward-looking ones are more expensive' answer is the trap: the reading explicitly says standardized quantitative cybersecurity metrics do NOT yet exist, unlike financial risk metrics."
    }
  ],

  sources: [
    { title: "Cyber-resilience: Range of practices (Basel Committee on Banking Supervision, Dec 2018)", url: "https://www.bis.org/bcbs/publ/d454.htm", note: "The original BIS/BCBS report this reading condenses — the primary source for every jurisdictional example cited." },
    { title: "Distributed denial-of-service attack — Wikipedia", url: "https://en.wikipedia.org/wiki/Denial-of-service_attack", note: "Background on DDoS attacks, referenced in the reading's discussion of evolving threats that backward-looking metrics fail to capture." },
    { title: "Three lines of defense (risk management model) — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_lines_of_defence", note: "The governance model regulators often expect (but do not mandate) banks to apply to cyber-risk oversight; ties back to R41." },
    { title: "Cybersecurity — Investopedia", url: "https://www.investopedia.com/terms/c/cybersecurity.asp", note: "Plain-language overview of cybersecurity concepts and terminology used throughout this reading." }
  ],

  pdf: { book: 3, query: "Increasing automation and connectedness with third-party service providers" },

  summary: `<p><strong>Five governance areas</strong>: strategy, roles/responsibilities, awareness, architecture/standards, workforce. <strong>Four risk management/response areas</strong>: supervision, information security controls, incident response/recovery, metrics (no standard quantitative metrics yet; forward-looking valued over backward-looking). <strong>Five information-sharing channels</strong>: bank-to-bank (trust-dependent), bank-to-regulator (mandated), regulator-to-regulator (rare), regulator-to-bank (uncommon), banks/regulators-to-security agencies (voluntary). <strong>Third-party cyber risk</strong>: interconnection governance, continuity/availability, confidentiality/integrity, visibility into sub-outsourcing, audit rights, oversight staff resources.</p>`
});
