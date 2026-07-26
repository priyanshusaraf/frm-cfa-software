export default ({
  book: 3, reading: 48,
  session: "Operational Risk Focus Areas",
  title: "Case Study: Cyberthreats and Information Security Risks",
  tagline: "A framework overview paired with the 2017 Equifax breach as the illustrative failure. The work is connecting specific control gaps to the generic frameworks named here.",

  teaches: `<p><strong>Information security risk</strong> is broader than "cyber risk": it covers the loss, theft, or exposure of any sensitive information, digital or paper, whether caused by a malicious outsider hacking in, an employee deliberately leaking data, or someone accidentally emailing a spreadsheet of customer Social Security numbers to the wrong address. The reading teaches you to sort every such incident along two independent axes: <strong>internal vs. external</strong> (did the failure originate inside the firm or outside it?) and <strong>intentional vs. unintentional</strong> (was it a deliberate attack/theft or a mistake?), producing a four-quadrant map (an external hacker breaching a server is external+intentional; an employee mistakenly emailing customer data is internal+unintentional).</p>
<p>It then covers three real, named cybersecurity frameworks firms actually adopt, <strong>NIST CSF</strong>, the <strong>CIS Critical Security Controls</strong>, and <strong>ISO 27001</strong>, explaining what each one is, who publishes it, whether it is mandatory, and what it concretely tells a firm to do. It defines the <strong>CIA triad</strong> (confidentiality, integrity, availability) as the three things information security protects, and splits the controls that protect them into <strong>behavioral controls</strong> (aimed at human behavior: training, password hygiene, sanctions) and <strong>technical controls</strong>, which further split into preventive (firewalls, encryption, patching), detective (data-loss-prevention monitoring), and mitigating (offline backups/redundancy) controls.</p>
<p>Finally it walks through the <strong>2017 Equifax breach</strong> in full, concrete detail: the specific software vulnerability exploited (Apache Struts, an open-source web-application framework), the scale (147 million customers), the timeline (breach in March 2017, discovered late July, disclosed to the public September 7), the prior warning signs (an 8,500-item unpatched-vulnerability backlog found in a 2015 internal audit, plus a separate 2016 breach of 430,000 customers), and the five specific institutional failures that let it happen, then draws the exam's central lesson: Equifax did not lack a framework or a policy; it failed to <em>execute</em> one it already had.</p>`,

  why: `<p>Equifax's core failure wasn't a lack of framework: it was failing to EXECUTE a known patch management policy. This is the clearest real-world illustration in the book of the directive-vs-operating control distinction from R44: having a policy on paper isn't the same as an operating control that actually prevents the bad outcome. That is what makes a worked example worth more than a definition here: the skill being built is looking at a real, messy institutional failure and naming which control (a patch management policy) existed only as a directive control and never became an operating one.</p>`,

  intuition: `<p>Equifax had the frameworks and policies in place: the failure was execution. A known vulnerability existed (Apache Struts, rated maximum criticality, a vulnerability score of 10, by NIST), a patch was available, and the patch management POLICY existed on paper (directive control), but it wasn't actually applied across all of Equifax's systems (no operating preventive control). Compounding this, Equifax's own 2015 internal audit had already found 8,500 unpatched vulnerabilities sitting unresolved, and the firm had already suffered a separate breach in 2016 affecting 430,000 customers, so this was not a one-off surprise but a known, recurring weakness that the firm's own governance process had already flagged and failed to fix. This is precisely the R44 lesson: directive controls (policies, training, guidance) tell you what SHOULD happen; preventive/detective controls actually MAKE it happen or catch it when it doesn't. Once the breach began, the failure compounded further: an expired SSL certificate meant Equifax could not properly monitor its own encrypted traffic, so the intrusion went undetected for three months, and when it was finally found, the public communication was slow and poorly handled (customers weren't notified until September 7, nearly six weeks after discovery).</p>`,

  formulas: [],

  concepts: [
    {
      name: "Information security risk typology (the four-quadrant map)",
      def: "Information security risk is broader than 'cyber risk': it includes loss or theft of paper documents as well as digital data. Every incident can be classified on two independent axes: internal (caused by someone inside the firm, e.g. an employee) vs. external (caused by an outside party, e.g. a hacker), and intentional (a deliberate act, e.g. theft or hacking) vs. unintentional (a mistake, e.g. accidentally emailing sensitive data to the wrong recipient). Crossing these two axes gives four quadrants of incident type.",
      intuition: "Two independent yes/no questions, who caused it and did they mean to, sort every information-security incident into one of four boxes, and placing a described scenario in the right quadrant is the whole exercise.",
      example: "An employee who steals and leaks customer data = internal + intentional. An outside hacker breaching an email server = external + intentional. An employee who accidentally sends a file with customer Social Security numbers to the wrong external address = internal + unintentional.",
      related: [],
      memory: "Two axes, four boxes: who (internal/external) crossed with why (intentional/unintentional)."
    },
    {
      name: "Three cybersecurity frameworks",
      def: "NIST CSF, CIS Critical Security Controls, and ISO 27001 are the three named cybersecurity frameworks this reading covers (full detail in the breakdown below). NIST CSF is a voluntary, five-step U.S. government framework, originally built for critical infrastructure and later generalized to any business. CIS Critical Security Controls is a continuously updated technical control checklist that firms use to build or review their cybersecurity protocol, complementing NIST or feeding into ISO 27001 certification. ISO 27001 is the key global CERTIFIABLE standard: it gives a checklist of what a firm must achieve, including operating an Information Security Management System (ISMS), rather than direct technical instructions.",
      intuition: "Think of the three as increasingly concrete layers: NIST CSF gives you the big five-step process, CIS gives you the specific technical control checklist to execute that process, and ISO 27001 is the certification you can actually earn (and show a regulator or client) once your controls are good enough.",
      pitfall: "NIST CSF is voluntary and process-oriented; it is not the certifiable standard: that is ISO 27001. Don't swap the two.",
      related: [],
      memory: "NIST = 5-step voluntary process. CIS = technical checklist. ISO 27001 = certifiable standard with an ISMS."
    },
    {
      name: "NIST CSF's five steps in detail",
      def: "Identify: build a complete inventory of all IT/technology equipment, software, and data (including electronic, mobile, and point-of-sale devices), and create/share a cybersecurity policy defining roles and responsibilities of employees, vendors, and third parties. Protect: restrict network/device access, use security software to encrypt and back up data, have policies for safe disposal of files, keep security software updated, and train employees. Detect: monitor computers, software, and hardware for unauthorized access or unusual activity. Respond: have a business-continuity plan, notify stakeholders, investigate and report attacks to authorities, and update policies with lessons learned. Recover: repair and restore impacted equipment/data and keep employees and customers informed.",
      intuition: "This is structurally the same shape as an operational risk management framework (identify, assess, mitigate, monitor): NIST CSF is essentially that same identify-assess-mitigate-monitor loop, specialized for cyber risk, with a 'recover' step tacked on at the end for after an incident happens.",
      example: "Equifax's failure maps directly onto 'Identify' (it had an insufficient inventory of its IT assets, so it didn't fully know what needed patching) and 'Protect' (the patch management policy existed but wasn't enforced).",
      related: [],
      memory: "IPDRR: Identify, Protect, Detect, Respond, Recover."
    },
    {
      name: "Core protection triad (CIA) and control types",
      def: "Protecting information has three components: confidentiality, integrity, and availability (CIA). Confidentiality and integrity relate to information security itself; availability relates to business continuity, whether the system stays accessible when needed. Controls protecting the CIA triad split into behavioral controls (human behavior: awareness campaigns, training, password management, supervision, sanctions) and technical controls, which further split into preventive, detective, and mitigating controls (full breakdown below). Each firm weighs the cost, convenience, and speed of controls against the benefit of risk reduction, often through a dedicated information security department separate from IT.",
      related: [{ r: 44, label: "R44: control types (preventive/detective/corrective/directive) applied to cyber specifically" }],
      memory: "CIA = confidentiality, integrity, availability. Controls = behavioral (people) + technical (prevent / detect / mitigate)."
    },
    {
      name: "Equifax (2017): five failure points",
      def: "Equifax, one of the three main U.S. credit bureaus, suffered a major breach beginning March 2017, a few days after applying a patch to Apache Struts, an open-source web-application framework it used. Attackers exploited a vulnerability in that very patch to move through Equifax's network and steal names, addresses, birthdays, Social Security numbers, and credit card data for 147 million customers, one of the largest cyberattacks on record. The breach went unnoticed for three months (discovered late July 2017) and the public wasn't alerted until September 7, 2017. Its five specific failure points ran from insufficient asset inventory through poor crisis communication (full list in the breakdown below).",
      pitfall: "Equifax's core failure wasn't a lack of a FRAMEWORK: it was failing to EXECUTE a known patch management policy. Having a policy on paper (directive control) is not the same as an operating (preventive or detective) control, and that gap is the point of the case. Also note: this was not Equifax's first warning, a 2015 internal audit had already found 8,500 unpatched vulnerabilities, and a smaller 2016 breach (430,000 customers) had already occurred, and NIST had already scored the Apache Struts vulnerability a maximum-criticality 10.",
      related: [{ r: 44, label: "R44: directive vs preventive/detective control distinction, illustrated concretely here" }],
      memory: "Five failure points: didn't know what assets they had, didn't patch what they knew about, didn't communicate internally, let a certificate expire (so couldn't detect the breach), and communicated badly afterward: a full-stack breakdown from prevention through detection through crisis response."
    },
    {
      name: "Aftermath and consequences",
      def: "Equifax's negligence led to a drop in its share price, high-profile resignations (its CEO, CSO, and CIO all departed), and multiple regulatory investigations, fines, and lawsuits. It ultimately paid $700 million in fines and compensation, including $300 million paid directly to affected individuals, and subsequently overhauled its IT security systems and management.",
      related: [],
      memory: "$700M total, $300M of it straight to affected customers: plus the C-suite (CEO, CSO, CIO) resigned."
    }
  ],

  connections: {
    from: [
      { r: 47, why: "Applies the generic cyber-resilience categories to a real, dissected case." },
      { r: 44, why: "The directive-vs-operating control distinction is concretely illustrated by Equifax's actual failure mode." }
    ],
    to: [],
    confused: [
      { what: "Having a policy vs. executing a policy", how: "Equifax had a written patch management POLICY (directive control) but failed to ACTUALLY PATCH the vulnerability (missing preventive/operating control): a policy on paper is not the same as an enforced control." }
    ]
  },

  misconceptions: [
    { wrong: "\"Equifax's breach happened because they lacked a cybersecurity framework or policy.\"", right: "Equifax had a patch management POLICY in place: the failure was EXECUTION. This illustrates that a directive control (a policy document) is not the same as an operating preventive control that actually gets applied." },
    { wrong: "\"NIST CSF is a mandatory, certifiable standard like ISO 27001.\"", right: "NIST CSF is VOLUNTARY (five steps: identify, protect, detect, respond, recover); ISO 27001 is the certifiable ISMS standard: don't conflate the two frameworks' mandate status." },
    { wrong: "\"Information security risk is the same thing as cyber risk.\"", right: "Information security risk is broader: it includes loss/theft of nondigital (paper) data and unintentional disclosures, not just malicious digital attacks. Cyber risk is one important subset of information security risk." },
    { wrong: "\"The expired SSL certificate was what let the attackers in.\"", right: "The attackers got in by exploiting the Apache Struts vulnerability (an unpatched software flaw). The expired SSL certificate is a separate failure that prevented Equifax from monitoring its encrypted traffic, which is why the breach went undetected for three months: it explains the delayed detection, not the initial entry." }
  ],

  highYield: [
    { stars: 4, what: "Equifax's five failure points, especially the patch-management-policy-existed-but-wasn't-executed lesson.", why: "The signature case study lesson of this reading: directly tests understanding of directive vs. operating controls from R44." },
    { stars: 3, what: "Three cybersecurity frameworks (NIST CSF voluntary 5-step, CIS technical checklist, ISO 27001 certifiable).", why: "A clean three-way classification, good for the 'which of these is X' question shape." },
    { stars: 3, what: "The four-quadrant information security risk typology (internal/external x intentional/unintentional).", why: "A simple classification, tested by giving a one-line scenario and asking which quadrant it belongs in." },
    { stars: 2, what: "CIA triad and behavioral vs. technical control split (with technical further split into preventive/detective/mitigating).", why: "Foundational vocabulary, straightforward recall, and reusable for other op-risk readings on controls." }
  ],

  recall: [
    { q: "Equifax had a documented patch management policy before its 2017 breach. Why did the breach still happen, and what governance lesson does this illustrate?", a: "The policy existed on paper (a directive control) but was not actually EXECUTED: the known Apache Struts vulnerability wasn't patched in practice, despite an internal audit having already flagged 8,500 unpatched vulnerabilities. This illustrates that directive controls (policies, guidance) are necessary but not sufficient; they must be paired with operating preventive/detective controls that actually enforce the intended behavior." },
    { q: "Distinguish NIST CSF from ISO 27001 in terms of mandate and structure.", a: "NIST CSF is a VOLUNTARY framework organized around five steps (identify, protect, detect, respond, recover). ISO 27001 is a CERTIFIABLE standard for an Information Security Management System (ISMS): organizations can be formally certified against it, unlike NIST CSF." },
    { q: "Why did Equifax's breach go undetected for three months after it began in March 2017?", a: "Equifax was using an expired SSL certificate, which prevented it from adequately monitoring its own encrypted network traffic: a detective-control failure separate from the initial preventive-control failure (the unpatched vulnerability) that let the attackers in." },
    { q: "Classify 'an employee accidentally emails a spreadsheet of customer Social Security numbers to an external vendor' using the four-quadrant information security risk typology.", a: "Internal + unintentional: the source is inside the firm (an employee), but the act was a mistake rather than a deliberate theft or attack." }
  ],

  hooks: [
    { title: "The policy that stayed on paper", text: "Equifax's patch policy was real: printed, filed, presumably read by someone. It just never made it into the actual server. A directive control that never becomes an operating control is a policy for show." },
    { title: "One patch away", text: "The attackers didn't need to break new ground: they exploited a vulnerability in the very patch Equifax had just applied to Apache Struts, days earlier. Even the fix became the way in, because the surrounding process (inventory, enforcement, monitoring) wasn't there to back it up." },
    { title: "Three frameworks, three jobs", text: "If you forget which framework is which, rebuild it from concreteness: NIST CSF is the plan (five steps), CIS is the tool (a checklist of specific controls), ISO 27001 is the proof (a certificate you can show a regulator). Process, then execution detail, then evidence." }
  ],

  eli5: `<p>Imagine an apartment building whose landlord posts a sign in the lobby saying "All units must have working smoke detectors", but never actually goes unit to unit to check batteries, and doesn't even have a complete list of which units exist. A fire starts in one apartment (started, in fact, right after a "fire-safety upgrade" that itself had a flaw), spreads because nobody notices for months (the building's fire alarm system was also broken and unmonitored), and only becomes public once tenants smell smoke everywhere. The landlord's sign: the policy: was completely correct advice; the failure was that nobody enforced it, tracked what needed checking, or noticed the fire in time. In finance terms: Equifax's written patch management policy (the sign in the lobby) was a <strong>directive control</strong>, but the missing IT asset inventory, unenforced patching, and broken monitoring (the expired SSL certificate) were failures of the <strong>preventive and detective controls</strong> that were supposed to turn that policy into reality.</p>`,

  thinkLike: `<p>A risk manager reading a cyber case study is not looking for "what went wrong technically": Apache Struts vulnerabilities get discovered constantly, and no framework prevents every zero-day. The question a risk manager actually asks is: <em>at which layer of defense did this firm's controls fail, and was that a policy gap or an execution gap?</em> Equifax is instructive precisely because the policy layer was fine: the gap was entirely in execution (asset inventory, patch enforcement, internal communication) and in detection (the expired certificate blinded them to their own network for three months). A practitioner uses this case to build a checklist: do we know every asset we have? Is our patch policy actually enforced with evidence, not just documented? Can we detect a breach in near-real-time, or would we also go blind for months? Is our crisis communication plan rehearsed, not just written?</p>
<p>That framing shows up as scenarios describing a firm with a seemingly adequate policy and asking where the actual control gap sits: the answer is almost always "the operating, preventive, or detective control was missing or not enforced", not "the firm lacked a framework". The other two shapes to be ready for are matching the three frameworks (which is voluntary, which is certifiable, which is a technical checklist) and classifying an incident with the internal/external, intentional/unintentional typology.</p>`,

  breakdown: [
    {
      title: "Cybersecurity frameworks",
      points: [
        "NIST CSF: voluntary, five-step process (identify, protect, detect, respond, recover); U.S. government-originated, generalized from critical infrastructure to any business.",
        "CIS Critical Security Controls: a detailed, continuously updated technical checklist firms use to build or review their cybersecurity protocol; complements NIST or feeds into ISO 27001 certification.",
        "ISO 27001: the certifiable global standard; requires an Information Security Management System (ISMS) and gives firms a checklist to achieve formal certification, rather than direct technical how-to advice."
      ]
    },
    {
      title: "NIST CSF's five steps (Identify, Protect, Detect, Respond, Recover)",
      points: [
        "Identify: inventory all IT assets (electronic, mobile, point-of-sale) and create/share a cybersecurity policy with defined roles.",
        "Protect: restrict access, encrypt/back up data, set safe-disposal policies, keep software updated, train employees.",
        "Detect: monitor for unauthorized access and investigate unusual activity.",
        "Respond: maintain a continuity plan, notify stakeholders, investigate/report incidents, update policies with lessons learned.",
        "Recover: repair and restore affected systems/data, keep employees and customers informed."
      ]
    },
    {
      title: "Behavioral vs. technical controls (protecting the CIA triad)",
      points: [
        "Behavioral controls: address human behavior: awareness training, rules of conduct, password management, supervision, sanctions.",
        "Technical: preventive controls: firewalls, encryption, passwords, patching; stop external threats before they succeed.",
        "Technical: detective controls: data loss prevention and detection (DLPD) tools that flag unauthorized data disclosures.",
        "Technical: mitigating controls: offline backups and redundancies that limit damage once something has already gone wrong."
      ]
    },
    {
      title: "Equifax's five failure points in the 2017 breach",
      points: [
        "1. Insufficient IT asset inventory: didn't fully know what systems it had, so couldn't patch quickly.",
        "2. Failed to enforce its own patch management policy: the vulnerable Apache Struts flaw went unpatched.",
        "3. Inefficient/insufficient employee communication: warnings missed key staff.",
        "4. Used an expired SSL certificate: couldn't monitor encrypted traffic, so the breach ran undetected for three months.",
        "5. Poor public/external crisis communication: customers weren't alerted until September 7, 2017, well after discovery."
      ]
    }
  ],

  lists: [
    {
      id: "frameworks",
      title: "Cybersecurity frameworks",
      axis: "Each framework sits one layer more concrete than the last: process, then technical checklist, then certifiable standard.",
      items: [
        "NIST CSF: voluntary five-step process (identify, protect, detect, respond, recover)",
        "CIS Critical Security Controls: technical checklist that implements a chosen process",
        "ISO 27001: certifiable global standard requiring an Information Security Management System (ISMS)"
      ]
    },
    {
      id: "nist-steps",
      title: "NIST CSF's five steps (IPDRR)",
      axis: "The steps trace the incident timeline: know what you have, stop the attack, catch it, react to it, rebuild after it.",
      items: [
        "Identify: inventory IT assets and define roles/responsibilities",
        "Protect: restrict access, encrypt and back up data, patch, train employees",
        "Detect: monitor for unauthorized access and unusual activity",
        "Respond: run the continuity plan, notify stakeholders, investigate and report, update policy",
        "Recover: repair and restore systems, keep employees and customers informed"
      ]
    },
    {
      id: "control-timing",
      title: "Controls protecting the CIA triad, by timing",
      axis: "Controls line up along the incident timeline: behavioral controls run continuously, preventive acts before an attack, detective acts during it, mitigating acts after damage is done.",
      items: [
        "Behavioral: ongoing, human-focused (training, password hygiene, sanctions)",
        "Preventive (technical): firewalls, encryption, patching, stop the attack before it succeeds",
        "Detective (technical): DLPD monitoring flags disclosures as they happen",
        "Mitigating (technical): offline backups and redundancy limit damage after the fact"
      ]
    },
    {
      id: "equifax-failures",
      title: "Equifax's five failure points, in cascade order",
      axis: "Each failure enabled the next: not knowing your assets means you can't patch them, not patching leaves you vulnerable, poor communication means warnings never land, no monitoring means you don't detect the breach, and poor crisis communication compounds the damage once it is found.",
      items: [
        "1. Insufficient IT asset inventory, so the firm didn't know what needed patching",
        "2. Failed to enforce its own patch management policy",
        "3. Inefficient internal communication, warnings missed key staff",
        "4. Expired SSL certificate blocked monitoring of encrypted traffic",
        "5. Poor public crisis communication after discovery"
      ]
    }
  ],

  pairs: [
    { left: "NIST CSF", right: "Voluntary five-step process (identify, protect, detect, respond, recover); U.S. government-originated, generalized from critical infrastructure to any business" },
    { left: "CIS Critical Security Controls", right: "Continuously updated technical control checklist; complements NIST CSF or feeds into ISO 27001 certification" },
    { left: "ISO 27001", right: "Certifiable global standard requiring an Information Security Management System (ISMS)" },
    { left: "DLPD (data loss prevention and detection)", right: "Detective technical control that monitors for and flags unauthorized data disclosures" }
  ],

  topicTags: ["cyber", "op-risk", "governance"],

  quiz: [
    {
      q: "What is the single biggest lesson the Equifax 2017 breach teaches about controls?",
      options: [
        "Equifax lacked any documented cybersecurity framework",
        "A directive control (a written policy) is not the same as an executed operating/preventive control",
        "ISO 27001 certification would have automatically prevented the breach",
        "The breach was caused entirely by an external, unpreventable zero-day exploit with no internal contributing factors"
      ],
      answer: 1,
      why: "Equifax had a patch management policy on paper (a directive control) but failed to enforce it in practice: policy existence and control execution are different things, and that is the central point. The 'lacked any documented framework' answer is the classic tempting-but-wrong distractor (it did have a framework/policy); the 'ISO 27001 would have automatically prevented it' answer overstates what certification guarantees; the 'entirely external, unpreventable zero-day' answer ignores that the attack succeeded because of internal execution failures (asset inventory, enforcement, monitoring), not just an external exploit."
    },
    {
      q: "Which of the three cybersecurity frameworks discussed is the only one that is formally certifiable?",
      options: ["NIST CSF", "CIS Critical Security Controls", "ISO 27001", "All three are equally certifiable"],
      answer: 2,
      why: "ISO 27001 is the certifiable global standard, requiring an Information Security Management System (ISMS). NIST CSF is explicitly voluntary and process-oriented, not certifiable; CIS is a technical control checklist that can support ISO 27001 certification but isn't itself a certification."
    },
    {
      q: "An employee at a bank, by mistake, forwards a spreadsheet containing customer account numbers to a personal email address. Using the four-quadrant information security risk typology, how should this incident be classified?",
      options: ["External, intentional", "Internal, intentional", "Internal, unintentional", "External, unintentional"],
      answer: 2,
      why: "The employee is inside the firm (internal) and the act was accidental, not deliberate (unintentional). The tempting distractor is the 'internal, intentional' answer, but the scenario specifies 'by mistake,' which rules out intent."
    },
    {
      q: "Which NIST CSF step corresponds to building a complete inventory of IT/technology equipment, software, and data, and defining roles and responsibilities?",
      options: ["Protect", "Detect", "Identify", "Respond"],
      answer: 2,
      why: "'Identify' is the first step and covers asset inventory and policy/role definition. The 'Protect' answer covers access restriction and encryption; this is a common mix-up because both feel like 'setting things up,' but Identify specifically means knowing what you have before you defend it, which is exactly what Equifax lacked."
    },
    {
      q: "Why specifically did Equifax's 2017 breach go undetected for roughly three months?",
      options: [
        "Equifax had no NIST CSF framework in place",
        "An expired SSL certificate prevented monitoring of encrypted network traffic",
        "The attackers used a zero-day exploit with no known vulnerability score",
        "Equifax's employees were never trained on cybersecurity awareness"
      ],
      answer: 1,
      why: "The expired SSL certificate blocked Equifax from monitoring its own encrypted traffic, which is the specific, sourced reason detection was delayed. The 'unscored zero-day' answer is wrong because NIST had already scored the Apache Struts vulnerability a maximum-criticality 10, so it was a known flaw, not an unscored zero-day; the 'no NIST framework' and 'no employee training' answers describe plausible-sounding generic failures rather than the specific cause of the detection delay."
    },
    {
      q: "Approximately how much did Equifax ultimately pay in fines and compensation following the breach, and how much of that went directly to affected individuals?",
      options: ["$700 million total, $300 million directly to individuals", "$300 million total, $700 million directly to individuals", "$147 million total, matching the number of affected customers", "$1 billion total, with no direct payments to individuals"],
      answer: 0,
      why: "Equifax paid $700 million in total fines and compensation, of which $300 million went directly to affected individuals. The '$147 million, matching customer count' answer confuses the 147 million figure (number of customers impacted) with a dollar amount: a classic distractor built from mixing up two real numbers from the case."
    }
  ],

  sources: [
    { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", note: "The official NIST source for the five-function (Identify, Protect, Detect, Respond, Recover) voluntary framework referenced in this reading." },
    { title: "ISO/IEC 27001: Information security management", url: "https://www.iso.org/standard/27001", note: "ISO's own overview of the certifiable information security management system (ISMS) standard." },
    { title: "CIS Critical Security Controls", url: "https://www.cisecurity.org/controls", note: "The Center for Internet Security's page describing the continuously updated technical control checklist discussed in this reading." }
  ],

  pdf: { book: 3, query: "Equifax experienced a major cyber breach in March 2017" },

  summary: `<p><strong>Three frameworks</strong>: NIST CSF (voluntary, 5 steps: identify, protect, detect, respond, recover), CIS Critical Security Controls (technical checklist), ISO 27001 (certifiable ISMS standard). <strong>Four-quadrant typology</strong>: internal/external x intentional/unintentional. <strong>CIA triad</strong>: confidentiality, integrity, availability; controls split behavioral/technical, with technical further split preventive/detective/mitigating. <strong>Equifax (2017)</strong>: an unpatched Apache Struts vulnerability exposed 147 million customers' data; insufficient asset inventory, failed patch enforcement, poor internal communication, an expired SSL certificate (three-month detection delay), and poor public communication were its five failure points; it paid $700 million in fines/compensation. The core lesson: a directive control (policy) without operating enforcement (preventive/detective) is not a real control.</p>`
});
