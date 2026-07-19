export default ({
  book: 3, reading: 45,
  session: "Operational Risk Overview",
  title: "Risk Reporting",
  tagline: "Closes the loop: identify → measure → mitigate → report, so the right people at the right altitude get the right information to act on.",

  teaches: `<p>The organizational committees that consume operational risk reports and what each one needs (risk committee, audit committee, ExCo, central operational risk function, business line managers), the "reporting cake" (three tiers matching report detail to audience seniority), the seven components of a comprehensive internal ORM report, the specific challenges of op risk reporting (data asymmetry, escalation, small frequent losses, benchmarking, non-normal distributions, qualitative aggregation), and external reporting — Pillar 3 disclosure plus regulatory notification triggers and combined assurance.</p>`,

  why: `<p>A report with the wrong altitude for its audience is useless — a board doesn't need daily transaction-level KRI detail, and a front-line manager can't act on a high-level board summary. Reporting is the final, and easiest to get wrong, step in the risk management chain: you can identify risks well (R42), measure them well (R43), and mitigate them well (R44), and still fail the firm if the information never reaches the person with the authority and context to act on it — or reaches them buried in noise. Getting the "reporting cake" right, matching each committee's mandate to its report, and being honest about what operational loss data actually looks like (skewed, not bell-shaped) is what makes the entire identify-measure-mitigate pipeline actually useful instead of just an exercise in paperwork.</p>`,

  intuition: `<p>Start from who is reading the report and what they are allowed to do about it — that's the whole logic of this reading. A <strong>business line manager</strong> owns a specific process day-to-day, so they get the raw, full data set, refreshed daily: at this level there's no real distinction between "monitoring" (watching the numbers) and "reporting" (writing them up) — it's the same activity. The <strong>central operational risk function</strong> (the second line of defense) sits above all the business lines: it collects and aggregates what they report, so it can spot patterns no single business line would see on its own, and passes an aggregated picture up to the <strong>operational risk committee</strong> and the <strong>risk committee</strong>. The <strong>risk committee</strong> (a board of directors subcommittee) needs enough detail to confirm controls are actually working and the firm is inside its board-approved risk appetite — so it gets summaries plus the detail on the events that matter (KRIs, large-event investigations, frequency/severity). The <strong>audit committee</strong> is a step removed again: it doesn't monitor risk day-to-day, it receives independent assurance from internal audit (the third line of defense) that the first two lines are doing their jobs. The <strong>executive committee (ExCo)</strong> is the board's steering group — it needs the same broad picture (exposures, trends, events, action plans, culture) but framed for decision-making and governance, not operational detail.</p>
<p>Once you have that audience logic, the "reporting cake" is just the same idea formalized into three named tiers, from the ground up: Tier 1 (business line managers — everything, daily), Tier 2 (operational risk committee — only what needs a decision, monthly/quarterly), Tier 3 (executive/board risk committee — high-level trends and strategic progress only). Detail shrinks as you move up, because the cost of reading noise scales with how many other things that reader is responsible for.</p>
<p>The reporting <em>challenges</em> section is really one big idea applied several ways: operational loss data does not look like the tidy, symmetric distributions used in most finance formulas. A handful of catastrophic events dominate; most events are small and frequent and barely move the needle; and even "risk scores" (red/amber/yellow/green) can't be averaged the way numbers can. Every specific challenge in Module 45.3 — data asymmetry, escalation, small losses, benchmarking, non-normal distributions, qualitative aggregation — is a different symptom of that same underlying fact, and the fix in each case is the same instinct: don't collapse the data into one deceptively simple summary statistic (a mean, an average color) without checking whether that statistic actually represents anything real.</p>`,

  visual: `<div class="widget" data-widget="reportingcake"></div>`,

  formulas: [],

  concepts: [
    {
      name: "Internal reporting audiences: the five organizational committees",
      def: "Risk committee (board subcommittee): monitors the firm's entire risk management framework — receives summary exposures/trends/emerging risks plus detailed KRIs, large-event investigations, and event frequency/severity; issues directives to the ExCo. Audit committee (board subcommittee): third-level, independent oversight, run through the internal audit function (the third line of defense), which reviews controls and operational risk regularly and reports findings to both the audit committee and the ExCo. Executive committee (ExCo): the board's own steering committee — senior executives and elected board members who prioritize issues, oversee governance and board policy, and make decisions between board meetings or during a crisis; receives exposures, trends, events, action plans, culture, and remediation efforts. Central operational risk function (second line of defense) and the operational risk committee it supports: collects and aggregates risk exposure, action-plan status, controls, and event data from every business line, then reports it up to both the risk committee and back down to business line managers. Business line managers and risk champions: the closest level to the actual risk — they monitor their own KRIs, action-plan progress, and risk types/impacts daily, and benchmark themselves against firmwide averages or peer business lines.",
      intuition: "Each committee's report is shaped entirely by what decision that committee is empowered to make. A business line manager can fix a broken process today, so they need today's full data. A board risk committee can only set risk appetite and demand action, so it needs confirmation the framework works, not the raw feed.",
      example: "A cyberattack near-miss would show up in a business line manager's daily dashboard immediately (Tier 1), get escalated to the operational risk committee as an action item once assessed as significant (Tier 2), and appear in the board risk committee's quarterly report only as a line in the 'emerging risks / trends' summary unless it crossed a materiality threshold (Tier 3).",
      pitfall: "Getting report sizing wrong in either direction defeats the purpose: reports that try to include everything cause readers to miss the critical items buried in the noise, while reports that are too condensed/aggregated lose the detail needed to actually decide anything.",
      related: [{ r: 41, why: "R41 defines the three-lines-of-defense governance structure these committees sit inside." }],
      memory: "Risk committee = board watchdog on the whole framework. Audit committee = independent check via internal audit (3rd line). ExCo = board's own decision-making steering group. Central op risk function = the 2nd-line aggregator. Business line managers = the 1st line, closest to the risk, full detail daily."
    },
    {
      name: "The reporting cake",
      def: "A three-tier model (coined by Chapelle, 2015) describing how much information different stakeholders should receive. Tier 1 (bottom): business line managers, risk champions — full metric set, monitored daily; at this level monitoring and reporting are the same activity. Tier 2 (middle): operational risk committee — only items that require an action (fixing a process, budget discussions, early interventions); everything else is summarized monthly/quarterly. Tier 3 (top): executive & board risk committee — high-level only: leading indicators, performance trends, progress on strategic plans, and risk impacts relative to objectives.",
      example: "A comprehensive internal ORM report includes seven components: (1) prioritized risks (top-10 + outlook), (2) heatmap/risk register, (3) risk appetite metrics, (4) KRIs and issue monitoring, (5) risk events/near misses, (6) action plans/remediation, and (7) emerging risks/horizon scanning.",
      related: [],
      memory: "Bottom: everything, daily. Middle: action items, monthly. Top: headlines only."
    },
    {
      name: "The seven components of a comprehensive ORM report",
      def: "1) Prioritized risks and outlook: typically a top-10 list ranked by inherent risk (no mitigation) and/or residual risk (net of mitigation), each shown with likelihood, severity, rating, and outlook (improving / worsening / status quo); common entries are technology breakdowns, cyberattacks, data loss, regulatory/compliance breaches, and transformation-project risk. 2) Heatmap and risk register: the risk register (built from RCSA — risk and control self-assessment — exercises) lists every operational risk plus the controls that take it from inherent to residual; the heatmap is the visual version, plotting likelihood against severity, usually colored red (urgent) / amber (above acceptable) / yellow (approaching limits) / green (within appetite). 3) Risk appetite metrics: KRIs that specifically measure compliance with board-set risk limits, shown with type, name, threshold, actual value versus threshold, and an overall score. 4) KRIs and issue monitoring: forward-looking indicators drawn from HR (compliance-training attendance, disciplinary cases), risk control (percent of action plans completed, timeliness of incident reporting), audit (timeliness of responses to findings, number of findings), and compliance (percent of complaint responses on time, conflicts of interest reported); 'issues' are the early-warning signals — process delays, IT problems — that precede actual incidents. 5) Risk events and near misses: number/size of events, frequency and severity per period, trends over time, and narratives for events above materiality thresholds; near misses matter because they teach the same lessons as a loss without the loss actually happening. 6) Action plans and remediation: corrective plans (reactive, triggered by a surprise loss or a discovered gap), detective controls (designed to catch incidents before they become losses), and preventive plans (proactive, before problems start); the target is a 'zero objective' — no overdue action plans, no overdue audit recommendations — and 'discipline indicators' track exactly those overdue items. 7) Emerging risks and horizon scanning: forward-looking identification of new risks/trends, reported monthly or quarterly to the board risk committee, bucketed by expected time horizon (within 1 year, 1–3 years, beyond 3 years), with particular attention to the regulatory and compliance environment.",
      example: "A firm's GRC (governance, risk, and compliance) system is the software layer that actually makes all seven components possible at scale: it collects and collates the underlying risk data, links individual risks to the specific controls meant to mitigate them, and auto-generates the tier-appropriate reports for each audience.",
      related: [{ r: 42, why: "R42's risk identification techniques (including RCSA) feed the risk register and heatmap here." }],
      memory: "Top-10, Heatmap, Appetite, KRIs, Events, Actions, Emerging — the seven pieces of a full ORM report."
    },
    {
      name: "Reporting challenges specific to op risk",
      def: "Cost-benefit test first: any reporting decision should pass three checks — the cost of collecting the data must be less than its value, the content must actually align with entity priorities, and the report must be capable of influencing a decision (even a decision to do nothing). Beyond that: Event data asymmetry: losses are heavily skewed away from the mean — a few high-severity, low-frequency events dominate, while many high-frequency, low-severity events barely affect the loss budget, so resources should target the big rare events, not the visible-but-trivial ones. Large event escalation: events and near-misses above the firm's risk tolerance must go to upper management with root-cause analysis and a documented action plan. Small, frequent losses: individually immaterial to the budget, but worth regular review since a pattern of them can reveal a structural control gap. Operational loss benchmarking: comparing losses across business lines/entities using a common yardstick — basis points of regulatory capital, or percentage of gross income/budget — so entities of different sizes are comparable. Distribution shape: op risk losses are not symmetric or bell-shaped, so the mean is misleading; median and first/third quartiles describe the 'typical' loss more honestly, and the same applies to risk ratings, KPIs, and KRIs, not just losses. Concentrations, outliers, and scenarios: outliers carry real information (they're where ORM's value actually comes from), so distributions should be examined in full and by subcategory, not just summarized; high/medium/low-risk scenario analysis (e.g., climate-related scenarios) is part of this. Qualitative data aggregation: three ways to combine non-numeric risk scores — conversion and addition (translate qualitative factors like reputational damage into a monetary figure, then sum them), categorization (color/score bands, e.g., red-amber-yellow-green, shown as a bar chart), or worst-case reporting (the whole group is flagged red if even one component in it is red — conservative, but can overstate concern).",
      pitfall: "Reporting a simple MEAN of op risk losses is misleading given the fat-tailed, asymmetric distribution shape — median/quartile-based reporting is more honest. Also don't average qualitative risk scores directly: an extreme risk (Level 1) and a low risk (Level 3) do not average to a moderate risk (Level 2) — the categories aren't a real numeric scale.",
      related: [{ r: 43, why: "R43 — the LDA's fat-tailed severity assumption, the root cause of this reporting challenge" }],
      memory: "Op risk losses are lopsided — report the median, not the mean, or a few catastrophic events will distort the picture. Three ways to aggregate qualitative scores: convert-to-money, color-categorize, or worst-case."
    },
    {
      name: "External reporting (Pillar 3) & combined assurance",
      def: "Pillar 3 (the Basel framework's public-disclosure pillar) requires banks using the standardized approach to disclose three things: qualitative information (governance/control structure, policies, and the systems used to measure op risk), historical losses (10 years of aggregate operational losses plus the resulting capital calculations, with narrative alongside the numbers), and the business indicator and its subcomponents (the primary input to the operational risk capital calculation — data drawn from the last 3 years — with narrative on significant changes and key drivers; the exact BI machinery is detailed later in R62). Separately from Pillar 3, firms must notify regulators of significant events under four trigger criteria: reputation (events that could materially damage the firm's reputation), resilience (events that could harm customers or disrupt the goods/services delivered to them), materiality (events that exceed a defined loss/materiality threshold), and stability (events that could threaten the wider financial system or the firm's ability to keep operating).",
      example: "Combined assurance aligns all three lines of defense so senior management/the audit committee get ONE coherent picture rather than three overlapping ones. It works through a combined assurance map (owned by the ORM function) that lists each risk type and assessment scope and color-codes each line of defense's review of it: green (satisfactory), yellow (needs attention), red (unsatisfactory). The three lines' specific roles in that map are: first line — assesses its own risks and controls, tests them, and attests they're working as intended; second line — oversees the first line's work, runs sample control testing, and does deeper dives into specific risk types; third line (internal audit) — periodic independent audit reviews on the audit cycle.",
      related: [{ r: 62, why: "R62 — the business indicator this disclosure references" }]
    }
  ],

  connections: {
    from: [
      { r: 44, why: "Mitigation actions and their effectiveness are exactly what gets communicated up the reporting cake." }
    ],
    to: [
      { r: 46, why: "Reporting feeds into the integrated, enterprise-wide risk management picture." },
      { r: 62, why: "Pillar 3 disclosure's business indicator gets its full formula treatment." }
    ],
    confused: [
      { what: "Tier 1 vs Tier 2 vs Tier 3 reporting content", how: "Tier 1: full detail, daily. Tier 2: action-required items, monthly/quarterly. Tier 3: high-level only — the DETAIL LEVEL decreases as you go up, not just the frequency." },
      { what: "Mean vs median reporting for op risk losses", how: "Op risk losses are fat-tailed and asymmetric — a mean can be distorted by a few catastrophic events; median/quartiles give a more representative picture of the 'typical' loss experience." },
      { what: "Risk committee vs audit committee vs ExCo", how: "The risk committee monitors the risk management framework directly and sets/enforces risk appetite. The audit committee gets independent assurance through internal audit (arm's-length, third line of defense) rather than monitoring risk itself. The ExCo is the board's own steering/decision-making body, not an oversight committee — it executes and governs, it doesn't audit." },
      { what: "Corrective vs detective vs preventive action plans", how: "Corrective = reactive, after a surprise loss already happened. Detective = designed to catch an incident before it becomes a loss. Preventive = proactive, put in place before any problem exists at all." }
    ]
  },

  misconceptions: [
    { wrong: "\"The board risk committee should receive the same level of granular detail as business line managers, just less frequently.\"", right: "The reporting cake reduces DETAIL LEVEL, not just frequency, as you go up — the board gets high-level information only, while business line managers get the full metric set." },
    { wrong: "\"Reporting the average (mean) operational loss gives an accurate picture of typical risk exposure.\"", right: "Op risk losses are asymmetric and fat-tailed — a few high-severity events can distort the mean. Median/quartile-based reporting gives a more honest picture of typical exposure." },
    { wrong: "\"The central operational risk function is the third line of defense, since it's independent of the business lines.\"", right: "The central operational risk function is the SECOND line of defense — it oversees and aggregates business-line (first-line) reporting. Internal audit, reporting to the audit committee, is the third line." },
    { wrong: "\"You can average two qualitative risk ratings, e.g. a Level 1 (extreme) and a Level 3 (low) risk average out to a Level 2 (moderate) risk.\"", right: "Qualitative risk categories are not a true numeric scale — they can't be averaged that way. Firms instead use conversion-to-money, color categorization, or worst-case reporting to aggregate qualitative scores." }
  ],

  highYield: [
    { stars: 4, what: "The reporting cake: three tiers, their audiences, and content detail level.", why: "The organizing framework of this reading, frequently tested as 'which tier gets what.'" },
    { stars: 4, what: "The five internal reporting audiences (risk committee, audit committee, ExCo, central op risk function, business line managers) and what each receives.", why: "LO 45.a is tested directly as 'which committee does X' — e.g. distinguishing the risk committee's oversight role from the audit committee's independent-assurance role, or identifying the second line of defense." },
    { stars: 3, what: "Op risk reporting challenges: event data asymmetry, escalation, small frequent losses, benchmarking, distribution shape (mean vs median), qualitative aggregation.", why: "A specific, named set of challenges — good for 'which challenge is this describing' scenario questions." },
    { stars: 3, what: "Pillar 3 disclosure: qualitative information, 10 years of historical losses, business indicator/subcomponents; plus the four regulatory notification triggers (reputation, resilience, materiality, stability).", why: "Exact numbers (10 years, 3 years for BIC) and the named trigger list are classic recall targets." },
    { stars: 2, what: "Combined assurance aligning all three lines of defense into one coherent report, with the color-coded combined assurance map.", why: "A useful synthesis concept connecting back to R41's governance framework." }
  ],

  recall: [
    { q: "Why shouldn't the board risk committee receive the same detailed daily KRI reports that business line managers receive?", a: "The reporting cake matches detail to audience altitude — the board needs high-level, strategic information to oversee the firm's overall risk posture, not the operational noise of daily transaction-level metrics. Giving the board too much granular detail would bury the signals that actually require board-level decisions." },
    { q: "Why is reporting the mean operational loss potentially misleading, and what's the better alternative?", a: "Operational risk losses are asymmetric and fat-tailed — a small number of catastrophic, high-severity events can dramatically inflate or distort a simple average, making 'typical' losses look worse (or better) than they really are. Median and quartile-based reporting better represents the actual, typical loss experience without being skewed by rare extreme events." },
    { q: "What distinguishes the audit committee's role from the risk committee's role in operational risk oversight?", a: "The risk committee directly monitors the firm's risk management framework and receives operational reports (summaries plus detailed KRIs/event data) to confirm the firm operates within board-set risk appetite. The audit committee instead receives independent, third-line assurance — findings from internal audit's regular reviews of controls and operational risk functionality — rather than monitoring risk directly itself." },
    { q: "A business line has many small, frequent operational losses that individually barely affect the budget. Should risk management ignore them?", a: "No — while any single small loss is immaterial, the pattern across many small losses should be regularly analyzed, because a recurring cluster can reveal a structural control gap or process flaw that needs remediation, even though no individual event would trigger escalation on its own." }
  ],

  hooks: [
    { title: "The reporting cake", text: "Bottom layer: everything, fresh daily. Middle layer: only what needs a decision. Top layer: the headline, once a quarter. Feed the board the whole cake and they'll choke on crumbs that don't matter." },
    { title: "Five audiences, one truth, different altitudes", text: "The risk committee wants proof the framework works. The audit committee wants an outsider's proof of that proof. The ExCo wants to know what to decide. The central op risk function is the one gluing all the raw business-line data together. The business line manager just wants today's numbers." }
  ],

  eli5: `<p>Imagine a hospital at shift-change. The nurse on the floor needs the full chart on every patient right now — vitals, meds, everything, refreshed every few hours, because they're the one adjusting a drip today. The head of nursing for the ward only needs to hear about patients whose situation actually requires a decision from her — a bed transfer, a doctor call — summarized once a shift, not every vital sign. The hospital's board doesn't want any of that detail; they want to know infection rates are trending down and the new wing is on schedule, once a quarter. Nobody is lying to anybody, and nobody is being kept in the dark — each person just gets the amount of detail they can actually act on, at the altitude they operate at. That's exactly the "reporting cake": business line managers (the nurse) get the full daily feed, the operational risk committee (the ward head) gets only action-required items, and the board risk committee (the hospital board) gets the high-level headline.</p>`,

  thinkLike: `<p>A risk manager building an ORM report starts from one question: <em>what decision is this reader empowered to make, and what's the minimum data that lets them make it well?</em> That single question is what forces detail down at the top (a board can't act on a transaction log) and forces completeness at the bottom (a business line manager without full daily data can't actually fix anything). It's also why the exam leans so hard on "which tier / which committee gets X" scenario questions — GARP is testing whether you understand that reporting is designed around decision rights, not just around "who is senior."</p>
<p>The second instinct a practitioner needs is statistical honesty about the shape of operational loss data. Most of finance assumes symmetric, roughly normal distributions where the mean is a sensible summary. Op risk data almost never looks like that — it's dominated by a few catastrophic tail events sitting on top of a mass of trivial small losses — so a risk manager who reports "average loss per quarter" without checking the distribution shape is quietly hiding the exact thing that matters (the tail). Expect exam questions that give you a distorted-looking average and ask you to identify why it's misleading, or ask you to pick median/quartile reporting as the fix.</p>`,

  breakdown: [
    {
      title: "The five internal reporting audiences (LO 45.a)",
      points: [
        "Risk committee (board subcommittee) — monitors the whole risk framework; gets summary exposures/trends plus detailed KRIs, large-event investigations, and event frequency/severity; issues directives to the ExCo.",
        "Audit committee (board subcommittee) — third-level, independent oversight via internal audit (third line of defense), which reviews controls regularly and reports findings to the audit committee and ExCo.",
        "Executive committee (ExCo) — the board's own steering committee of senior executives; prioritizes issues, oversees governance/policy, makes decisions between board meetings or in a crisis; receives exposures, trends, events, action plans, culture, and remediation.",
        "Central operational risk function / operational risk committee (second line of defense) — collects and aggregates data from every business line, reports up to the risk committee and back down to business line managers.",
        "Business line managers and risk champions (first line of defense) — closest to the actual risk; monitor their own KRIs, action-plan progress, and impacts daily; benchmark against firmwide or peer-line averages."
      ]
    },
    {
      title: "The reporting cake — three tiers",
      points: [
        "Tier 1 (bottom): business line managers and risk champions — full metric set, monitored daily; monitoring and reporting are the same activity here.",
        "Tier 2 (middle): operational risk committee — only action-required items (fixing a process, budget discussions, early interventions); everything else summarized monthly/quarterly.",
        "Tier 3 (top): executive and board risk committee — high level only: leading indicators, performance trends, strategic-plan progress, risk impact relative to objectives."
      ]
    },
    {
      title: "The seven components of a comprehensive internal ORM report",
      points: [
        "1) Prioritized risks and outlook — top-10 list with inherent/residual likelihood, severity, rating, and outlook (improving/worsening/status quo).",
        "2) Heatmap and risk register — register built from RCSA exercises; heatmap plots likelihood vs. severity, colored red/amber/yellow/green.",
        "3) Risk appetite metrics — KRIs measuring compliance with board risk limits: type, name, threshold, actual value, overall score.",
        "4) KRIs and issue monitoring — forward-looking indicators from HR, risk control, audit, and compliance sources; issues are early-warning signals that precede incidents.",
        "5) Risk events and near misses — counts, frequency/severity trends, and narratives above materiality; near misses teach lessons without an actual loss.",
        "6) Action plans and remediation — corrective (reactive), detective (catch before loss), preventive (proactive) plans; targets a zero objective, tracked via discipline indicators.",
        "7) Emerging risks and horizon scanning — forward-looking, reported monthly/quarterly to the board risk committee, bucketed by time horizon (<1yr, 1–3yr, >3yr)."
      ]
    },
    {
      title: "Reporting challenges specific to op risk (LO 45.c)",
      points: [
        "Cost-benefit test: cost of collecting data < its value; content aligns with priorities; reporting must be able to influence a decision.",
        "Event data asymmetry — a few high-severity, low-frequency events dominate; high-frequency low-severity events barely move the loss budget.",
        "Large event escalation — events/near-misses above tolerance go to upper management with root-cause analysis and an action plan.",
        "Small, frequent losses — individually immaterial, but reviewed for patterns revealing structural control gaps.",
        "Operational loss benchmarking — compare losses in basis points of regulatory capital or as a percentage of gross income/budget so different-sized entities are comparable.",
        "Non-normal distributions — op risk losses aren't symmetric/bell-shaped, so mean is misleading; use median and quartiles instead (applies to KPIs/KRIs and ratings too).",
        "Concentrations, outliers, and scenarios — outliers carry real information; analyze full distributions and by subcategory; run high/medium/low-risk scenario analysis.",
        "Qualitative data aggregation — three methods: conversion and addition (convert to money and sum), categorization (color/score bands), worst-case reporting (whole group flagged by its worst component)."
      ]
    },
    {
      title: "External reporting: Pillar 3 disclosure requirements",
      points: [
        "Qualitative information — governance/control structure, policies, procedures, and the data/systems used to measure operational risk.",
        "Historical losses — 10 years of aggregate operational losses plus resulting capital calculations, with narrative alongside the numbers.",
        "Business indicator and subcomponents — the primary input to op risk capital, using the last 3 years of data (for the BIC), with narrative on significant changes and key drivers."
      ]
    },
    {
      title: "Regulatory notification triggers (independent of Pillar 3)",
      points: [
        "Reputation criteria — events that could significantly damage firm reputation.",
        "Resilience criteria — events that could harm customers or disrupt goods/services delivered to them.",
        "Materiality criteria — events that exceed a defined loss/materiality threshold.",
        "Stability criteria — events that could threaten the wider financial system or the firm's ability to keep operating."
      ]
    },
    {
      title: "Combined assurance: the three lines of defense",
      points: [
        "First line — assesses its own risks/controls, tests them, and attests they're operating as intended.",
        "Second line — oversees the first line's activities, runs sample control testing, and does deeper dives into specific risk types.",
        "Third line (internal audit) — periodic independent audit reviews on the standard audit cycle."
      ]
    }
  ],

  quiz: [
    {
      q: "Using the reporting cake model, which tier receives leading indicators and progress on strategic plans?",
      options: ["Tier 1", "Tier 2", "Tier 3", "There is no such tier — leading indicators aren't reported"],
      answer: 2,
      why: "Tier 3 (executive and board risk committee) receives high-level data including leading indicators, performance trends, and strategic-plan progress. Tier 1 gets the full daily metric set, and Tier 2 gets only action-required items — neither is the 'high-level, strategic' altitude leading indicators belong at."
    },
    {
      q: "A risk manager reports that the average (mean) operational loss last quarter was $40,000, and concludes exposure is well controlled. What is the most likely flaw in this conclusion?",
      options: [
        "The mean is always the correct summary statistic for financial data",
        "Operational loss distributions are typically asymmetric and fat-tailed, so a small number of high-severity events can distort the mean; median/quartiles would be more representative",
        "The mean understates risk because operational losses are always understated by firms",
        "Quarterly reporting periods are too short to compute a meaningful mean"
      ],
      answer: 1,
      why: "Op risk losses are heavily skewed — a handful of catastrophic, low-frequency events can pull the mean up or down and make 'typical' exposure look different than it is. The fix is median/first-and-third-quartile reporting. The other options either assert something false about means in general or invent unsupported claims about reporting bias/period length."
    },
    {
      q: "Which committee is most directly responsible for providing INDEPENDENT assurance (via internal audit) that a firm's operational risk controls are functioning as intended?",
      options: ["The risk committee", "The audit committee", "The executive committee (ExCo)", "The central operational risk function"],
      answer: 1,
      why: "The audit committee receives third-level, independent assurance through the internal audit function (the third line of defense). The risk committee monitors the framework directly rather than through an independent audit lens; the ExCo is the board's decision-making steering group, not an assurance provider; the central operational risk function is the second line, which oversees but is not independent of the first-line business units the way internal audit is."
    },
    {
      q: "A group of five KRIs is reported to the board. Four are green and one is red. Under 'worst-case reporting,' how should this group be aggregated and presented?",
      options: [
        "As green, since a majority of the KRIs are green",
        "As yellow, as an average of the group's scores",
        "As red, because the group is reported using the worst individual result in it",
        "The KRIs must be reported individually — worst-case reporting cannot aggregate them"
      ],
      answer: 2,
      why: "Worst-case reporting is explicitly the most conservative aggregation method: the entire group is flagged with the worst color present, even if only one component is red. Averaging the group's scores isn't valid for qualitative categories, and a majority-vote approach is not how worst-case reporting works by definition."
    },
    {
      q: "Under Basel Pillar 3 operational risk disclosure requirements, how many years of aggregate historical operational losses must generally be disclosed?",
      options: ["3 years", "5 years", "10 years", "15 years"],
      answer: 2,
      why: "Pillar 3 requires 10 years of aggregate historical operational losses (paired with the resulting capital calculations). Note this differs from the business indicator component, which uses the last 3 years of data — a common source of confusion on the exam."
    },
    {
      q: "A significant operational risk event has occurred that could disrupt the goods and services a bank delivers to its retail customers, though it does not yet exceed the firm's materiality threshold. Under which regulatory notification trigger would this event most likely still require notification?",
      options: ["Materiality criteria", "Functional criteria", "Resilience criteria", "Stability criteria"],
      answer: 2,
      why: "Resilience criteria cover events that could negatively impact the goods or services provided to customers or cause them harm — independent of whether a materiality threshold is crossed. 'Functional criteria' is not one of the four named triggers (reputation, resilience, materiality, stability) — a distractor with no basis in the source. Stability criteria concern the wider financial system, not an individual customer-facing disruption."
    }
  ],

  sources: [
    { title: "Three lines of defense (risk management model)", url: "https://en.wikipedia.org/wiki/Three_lines_of_defence", note: "Background on the first/second/third line structure that underlies the committee roles and combined assurance in this reading." },
    { title: "Basel III: Finalising post-crisis reforms (operational risk, Pillar 3 disclosure)", url: "https://www.bis.org/bcbs/publ/d424.htm", note: "The BIS text establishing the standardized approach and the Pillar 3 disclosure requirements referenced here." },
    { title: "Key risk indicator (KRI)", url: "https://en.wikipedia.org/wiki/Key_risk_indicator", note: "General background on how KRIs are defined and used in risk dashboards." },
    { title: "GARP — Financial Risk Manager (FRM) Program", url: "https://www.garp.org/frm", note: "Official FRM program page for exam structure and learning objectives." }
  ],

  pdf: { book: 3, query: "As the final step of risk management, risk monitoring provides organizational leaders" },

  summary: `<p><strong>Internal audiences</strong>: risk committee (framework oversight, sets/enforces appetite), audit committee (independent assurance via internal audit, 3rd line), ExCo (board's steering/decision body), central operational risk function (2nd line, aggregator), business line managers (1st line, full daily detail). <strong>Reporting cake</strong>: Tier 1 (business line, full detail, daily) → Tier 2 (ORM committee, action-required only, monthly/quarterly) → Tier 3 (board, high-level only). Comprehensive ORM report: top-10 risks, heatmap/risk register, appetite metrics, KRIs/issue monitoring, events/near-misses, action plans (corrective/detective/preventive, toward a zero objective), emerging risks. <strong>Challenges</strong>: cost-benefit test, event data asymmetry (rare severe events distort averages), escalation needs, small frequent losses (control-gap signal), benchmarking (bp of capital or % of income), asymmetric distribution (use median/quartiles not mean), outliers/scenarios, qualitative aggregation (conversion, categorization, worst-case). <strong>Pillar 3</strong>: qualitative info + 10yr loss history + business indicator (3yr) disclosure; separate notification triggers: reputation, resilience, materiality, stability. <strong>Combined assurance</strong> aligns all three lines (1st: self-assess/attest, 2nd: oversight/deep dives, 3rd: internal audit cycle) into one coherent, color-coded picture.</p>`
});
