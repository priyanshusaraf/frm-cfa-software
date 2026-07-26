export default ({
  book: 3, reading: 45,
  session: "Operational Risk Overview",
  title: "Risk Reporting",
  tagline: "Closes the loop: identify → measure → mitigate → report, so the right people at the right altitude get the right information to act on.",
  topicTags: ["op-risk", "governance", "basel", "capital"],

  teaches: `<p>The organizational committees that consume operational risk reports and what each one needs (risk committee, audit committee, ExCo, central operational risk function, business line managers), the "reporting cake" (three tiers matching report detail to audience seniority), the seven components of a comprehensive internal ORM report, the specific challenges of op risk reporting (data asymmetry, escalation, small frequent losses, benchmarking, non-normal distributions, qualitative aggregation), and external reporting: Pillar 3 disclosure plus regulatory notification triggers and combined assurance.</p>`,

  why: `<p>A report with the wrong altitude for its audience is useless: a board doesn't need daily transaction-level KRI detail, and a front-line manager can't act on a high-level board summary. Reporting is the final, and easiest to get wrong, step in the risk management chain: you can identify risks well (R42), measure them well (R43), and mitigate them well (R44), and still fail the firm if the information never reaches the person with the authority and context to act on it: or reaches them buried in noise. Getting the "reporting cake" right, matching each committee's mandate to its report, and being honest about what operational loss data actually looks like (skewed, not bell-shaped) is what makes the entire identify-measure-mitigate pipeline actually useful instead of just an exercise in paperwork.</p>`,

  intuition: `<p>Start from who is reading the report and what they are allowed to do about it: that's the whole logic of this reading. A <strong>business line manager</strong> owns a specific process day-to-day, so they get the raw, full data set, refreshed daily: at this level there's no real distinction between "monitoring" (watching the numbers) and "reporting" (writing them up): it's the same activity. The <strong>central operational risk function</strong> (the second line of defense) sits above all the business lines: it collects and aggregates what they report, so it can spot patterns no single business line would see on its own, and passes an aggregated picture up to the <strong>operational risk committee</strong> and the <strong>risk committee</strong>. The <strong>risk committee</strong> (a board of directors subcommittee) needs enough detail to confirm controls are actually working and the firm is inside its board-approved risk appetite, so it gets summaries plus the detail on the events that matter (KRIs, large-event investigations, frequency/severity). The <strong>audit committee</strong> is a step removed again: it doesn't monitor risk day-to-day, it receives independent assurance from internal audit (the third line of defense) that the first two lines are doing their jobs. The <strong>executive committee (ExCo)</strong> is the board's steering group: it needs the same broad picture (exposures, trends, events, action plans, culture) but framed for decision-making and governance, not operational detail.</p>
<p>Once you have that audience logic, the "reporting cake" is just the same idea formalized into three named tiers, from the ground up: Tier 1 (business line managers: everything, daily), Tier 2 (operational risk committee: only what needs a decision, monthly/quarterly), Tier 3 (executive/board risk committee: high-level trends and strategic progress only). Detail shrinks as you move up, because the cost of reading noise scales with how many other things that reader is responsible for.</p>
<p>The reporting <em>challenges</em> section is really one big idea applied several ways: operational loss data does not look like the tidy, symmetric distributions used in most finance formulas. A handful of catastrophic events dominate; most events are small and frequent and barely move the needle; and even "risk scores" (red/amber/yellow/green) can't be averaged the way numbers can. Every specific challenge in Module 45.3 (data asymmetry, escalation, small losses, benchmarking, non-normal distributions, qualitative aggregation) is a different symptom of that same underlying fact, and the fix in each case is the same instinct: don't collapse the data into one deceptively simple summary statistic (a mean, an average color) without checking whether that statistic actually represents anything real.</p>`,

  visual: `<div class="widget" data-widget="reportingcake"></div>`,

  lists: [
    {
      id: "reporting-cake",
      title: "The reporting cake, three tiers",
      axis: "Detail shrinks as you move up because the cost of reading noise scales with how many other things that reader is responsible for.",
      items: [
        "Tier 1: business line managers and risk champions, full metric set, daily",
        "Tier 2: operational risk committee, only items that need a decision, monthly or quarterly",
        "Tier 3: executive and board risk committee, high-level trends and strategic progress only"
      ]
    },
    {
      id: "reporting-audiences",
      title: "Internal reporting audiences, closest to the risk to farthest",
      axis: "Each audience sits at a different remove from the actual risk, and the level of detail it receives drops as that distance grows.",
      items: [
        "Business line managers and risk champions: first line, own the process day-to-day",
        "Central operational risk function: second line, aggregates every business line's data",
        "Risk committee: board subcommittee, confirms controls work and appetite is respected",
        "Audit committee: board subcommittee, gets independent assurance via internal audit",
        "Executive committee (ExCo): the board's own steering group, decides and governs"
      ]
    },
    {
      id: "orm-report-components",
      title: "Components of a comprehensive internal ORM report",
      axis: "The seven pieces move from what's already known (top risks, heatmap) through what's being watched right now (appetite, KRIs, events) to response and lookahead (action plans, emerging risks).",
      items: [
        "Prioritized risks and outlook: top-10 list with likelihood, severity, rating, outlook",
        "Heatmap and risk register: likelihood plotted against severity, colored red/amber/yellow/green",
        "Risk appetite metrics: KRIs measuring compliance with board-set limits",
        "KRIs and issue monitoring: forward-looking indicators and early-warning issues",
        "Risk events and near misses: counts, trends, and narratives above materiality",
        "Action plans and remediation: corrective, detective, and preventive plans",
        "Emerging risks and horizon scanning: new risks bucketed by time horizon"
      ]
    },
    {
      id: "three-lines-assurance",
      title: "Combined assurance: the three lines of defense",
      axis: "Assurance gets more independent as you move from the people doing the work up to periodic outside audit.",
      items: [
        "First line: assesses its own risks and controls, tests them, attests they work",
        "Second line: oversees the first line, runs sample testing, does deeper dives",
        "Third line (internal audit): periodic independent audit reviews on the audit cycle"
      ]
    }
  ],

  pairs: [
    { left: "Risk committee", right: "Board subcommittee that monitors the whole risk management framework and confirms the firm operates within board-set risk appetite." },
    { left: "Audit committee", right: "Board subcommittee that receives independent, third-line assurance from internal audit rather than monitoring risk directly." },
    { left: "Executive committee (ExCo)", right: "The board's own steering group of senior executives; prioritizes issues and makes decisions between board meetings or during a crisis." },
    { left: "Central operational risk function", right: "Second line of defense; collects and aggregates action-plan, control, and event data from every business line." },
    { left: "Business line managers and risk champions", right: "First line of defense; monitor their own KRIs, action-plan progress, and risk impacts daily." }
  ],

  formulas: [],

  concepts: [
    {
      name: "Internal reporting audiences: the five organizational committees",
      def: "Five audiences, ordered by distance from the risk. Business line managers and risk champions (first line) sit closest to it and monitor their own metrics daily. The central operational risk function (second line), and the operational risk committee it supports, aggregates every business line's data and passes it both up and back down. The risk committee, a board subcommittee, monitors the firm's entire risk management framework and issues directives to the ExCo. The audit committee, also a board subcommittee, takes independent assurance from internal audit (the third line) instead of monitoring risk itself. The executive committee (ExCo) is the board's own steering group, deciding and governing between board meetings.",
      intuition: "Each committee's report is shaped entirely by what decision that committee is empowered to make. A business line manager can fix a broken process today, so they need today's full data. A board risk committee can only set risk appetite and demand action, so it needs confirmation the framework works, not the raw feed.",
      example: "A cyberattack near-miss would show up in a business line manager's daily dashboard immediately (Tier 1), get escalated to the operational risk committee as an action item once assessed as significant (Tier 2), and appear in the board risk committee's quarterly report only as a line in the 'emerging risks / trends' summary unless it crossed a materiality threshold (Tier 3).",
      pitfall: "Getting report sizing wrong in either direction defeats the purpose: reports that try to include everything cause readers to miss the critical items buried in the noise, while reports that are too condensed/aggregated lose the detail needed to actually decide anything.",
      related: [{ r: 41, label: "R41: the three-lines-of-defense governance structure these committees sit inside" }],
      memory: "Risk committee = board watchdog on the whole framework. Audit committee = independent check via internal audit (3rd line). ExCo = board's own decision-making steering group. Central op risk function = the 2nd-line aggregator. Business line managers = the 1st line, closest to the risk, full detail daily."
    },
    {
      name: "The reporting cake",
      def: "A three-tier model (coined by Chapelle, 2015) describing how much information different stakeholders should receive. Tier 1 (bottom): business line managers, risk champions: full metric set, monitored daily; at this level monitoring and reporting are the same activity. Tier 2 (middle): operational risk committee: only items that require an action (fixing a process, budget discussions, early interventions); everything else is summarized monthly/quarterly. Tier 3 (top): executive & board risk committee: high-level only: leading indicators, performance trends, progress on strategic plans, and risk impacts relative to objectives.",
      example: "A comprehensive internal ORM report includes seven components: (1) prioritized risks (top-10 + outlook), (2) heatmap/risk register, (3) risk appetite metrics, (4) KRIs and issue monitoring, (5) risk events/near misses, (6) action plans/remediation, and (7) emerging risks/horizon scanning.",
      related: [],
      memory: "Bottom: everything, daily. Middle: action items, monthly. Top: headlines only."
    },
    {
      name: "The seven components of a comprehensive ORM report",
      def: "Seven components, moving from what is already known through what is being watched to what comes next: (1) prioritized risks and outlook, (2) heatmap and risk register, (3) risk appetite metrics, (4) KRIs and issue monitoring, (5) risk events and near misses, (6) action plans and remediation, and (7) emerging risks and horizon scanning. The risk register itself is built from RCSA (risk and control self-assessment) exercises and lists every operational risk alongside the controls that take it from inherent to residual; the heatmap is its visual form, plotting likelihood against severity in red (urgent), amber (above acceptable), yellow (approaching limits), and green (within appetite).",
      example: "A firm's GRC (governance, risk, and compliance) system is the software layer that actually makes all seven components possible at scale: it collects and collates the underlying risk data, links individual risks to the specific controls meant to mitigate them, and auto-generates the tier-appropriate reports for each audience.",
      related: [{ r: 42, label: "R42: risk identification techniques (including RCSA) feed the risk register and heatmap here" }],
      memory: "Top-10, Heatmap, Appetite, KRIs, Events, Actions, Emerging: the seven pieces of a full ORM report."
    },
    {
      name: "Reporting challenges specific to op risk",
      def: "Every reporting decision first has to pass a cost-benefit test on three checks: the cost of collecting the data must be less than its value, the content must align with the entity's priorities, and the report must be capable of influencing a decision, even a decision to do nothing. Past that gate, the challenges all trace back to one fact: operational loss data is lopsided rather than bell-shaped. A few high-severity, low-frequency events dominate the loss budget while a mass of small, frequent losses barely moves it, so averages mislead, benchmarks need a common yardstick, escalation rules have to catch the rare big event, and qualitative scores cannot simply be averaged.",
      pitfall: "Reporting a simple MEAN of op risk losses is misleading given the fat-tailed, asymmetric distribution shape: median/quartile-based reporting is more honest. Also don't average qualitative risk scores directly: an extreme risk (Level 1) and a low risk (Level 3) do not average to a moderate risk (Level 2): the categories aren't a real numeric scale.",
      related: [{ r: 43, label: "R43: the LDA's fat-tailed severity assumption, the root cause of this reporting challenge" }],
      memory: "Op risk losses are lopsided: report the median, not the mean, or a few catastrophic events will distort the picture. Three ways to aggregate qualitative scores: convert-to-money, color-categorize, or worst-case."
    },
    {
      name: "External reporting (Pillar 3) & combined assurance",
      def: "Pillar 3 is the Basel framework's public-disclosure pillar. Banks using the standardized approach must disclose three things: qualitative information about how operational risk is governed and measured, ten years of aggregate historical losses with the resulting capital calculations, and the business indicator with its subcomponents, drawn from the last three years of data (the BI machinery itself is detailed in R62). Separately from Pillar 3, firms must notify regulators of significant events under four trigger criteria: reputation, resilience, materiality, and stability.",
      example: "Combined assurance aligns all three lines of defense so senior management/the audit committee get ONE coherent picture rather than three overlapping ones. It works through a combined assurance map (owned by the ORM function) that lists each risk type and assessment scope and color-codes each line of defense's review of it: green (satisfactory), yellow (needs attention), red (unsatisfactory). The three lines' specific roles in that map are: first line: assesses its own risks and controls, tests them, and attests they're working as intended; second line: oversees the first line's work, runs sample control testing, and does deeper dives into specific risk types; third line (internal audit): periodic independent audit reviews on the audit cycle.",
      related: [{ r: 62, label: "R62: the business indicator this disclosure references" }],
      memory: "Pillar 3 tells the outside world how we manage it (qualitative), what it's cost us (10 years of losses), and what it costs now (the business indicator)."
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
      { what: "Tier 1 vs Tier 2 vs Tier 3 reporting content", how: "Tier 1: full detail, daily. Tier 2: action-required items, monthly/quarterly. Tier 3: high-level only: the DETAIL LEVEL decreases as you go up, not just the frequency." },
      { what: "Mean vs median reporting for op risk losses", how: "Op risk losses are fat-tailed and asymmetric: a mean can be distorted by a few catastrophic events; median/quartiles give a more representative picture of the 'typical' loss experience." },
      { what: "Risk committee vs audit committee vs ExCo", how: "The risk committee monitors the risk management framework directly and sets/enforces risk appetite. The audit committee gets independent assurance through internal audit (arm's-length, third line of defense) rather than monitoring risk itself. The ExCo is the board's own steering/decision-making body, not an oversight committee: it executes and governs, it doesn't audit." },
      { what: "Corrective vs detective vs preventive action plans", how: "Corrective = reactive, after a surprise loss already happened. Detective = designed to catch an incident before it becomes a loss. Preventive = proactive, put in place before any problem exists at all." }
    ]
  },

  misconceptions: [
    { wrong: "\"The board risk committee should receive the same level of granular detail as business line managers, just less frequently.\"", right: "The reporting cake reduces DETAIL LEVEL, not just frequency, as you go up: the board gets high-level information only, while business line managers get the full metric set." },
    { wrong: "\"Reporting the average (mean) operational loss gives an accurate picture of typical risk exposure.\"", right: "Op risk losses are asymmetric and fat-tailed: a few high-severity events can distort the mean. Median/quartile-based reporting gives a more honest picture of typical exposure." },
    { wrong: "\"The central operational risk function is the third line of defense, since it's independent of the business lines.\"", right: "The central operational risk function is the SECOND line of defense: it oversees and aggregates business-line (first-line) reporting. Internal audit, reporting to the audit committee, is the third line." },
    { wrong: "\"You can average two qualitative risk ratings, e.g. a Level 1 (extreme) and a Level 3 (low) risk average out to a Level 2 (moderate) risk.\"", right: "Qualitative risk categories are not a true numeric scale: they can't be averaged that way. Firms instead use conversion-to-money, color categorization, or worst-case reporting to aggregate qualitative scores." }
  ],

  highYield: [
    { stars: 4, what: "The reporting cake: three tiers, their audiences, and content detail level.", why: "The organizing framework of this reading, frequently tested as 'which tier gets what.'" },
    { stars: 4, what: "The five internal reporting audiences (risk committee, audit committee, ExCo, central op risk function, business line managers) and what each receives.", why: "LO 45.a is tested directly as 'which committee does X': e.g. distinguishing the risk committee's oversight role from the audit committee's independent-assurance role, or identifying the second line of defense." },
    { stars: 3, what: "Op risk reporting challenges: event data asymmetry, escalation, small frequent losses, benchmarking, distribution shape (mean vs median), qualitative aggregation.", why: "A specific, named set of challenges: good for 'which challenge is this describing' scenario questions." },
    { stars: 3, what: "Pillar 3 disclosure: qualitative information, 10 years of historical losses, business indicator/subcomponents; plus the four regulatory notification triggers (reputation, resilience, materiality, stability).", why: "Exact numbers (10 years, 3 years for BIC) and the named trigger list are classic recall targets." },
    { stars: 2, what: "Combined assurance aligning all three lines of defense into one coherent report, with the color-coded combined assurance map.", why: "A useful synthesis concept connecting back to R41's governance framework." }
  ],

  recall: [
    { q: "Why shouldn't the board risk committee receive the same detailed daily KRI reports that business line managers receive?", a: "The reporting cake matches detail to audience altitude: the board needs high-level, strategic information to oversee the firm's overall risk posture, not the operational noise of daily transaction-level metrics. Giving the board too much granular detail would bury the signals that actually require board-level decisions." },
    { q: "Why is reporting the mean operational loss potentially misleading, and what's the better alternative?", a: "Operational risk losses are asymmetric and fat-tailed: a small number of catastrophic, high-severity events can dramatically inflate or distort a simple average, making 'typical' losses look worse (or better) than they really are. Median and quartile-based reporting better represents the actual, typical loss experience without being skewed by rare extreme events." },
    { q: "What distinguishes the audit committee's role from the risk committee's role in operational risk oversight?", a: "The risk committee directly monitors the firm's risk management framework and receives operational reports (summaries plus detailed KRIs/event data) to confirm the firm operates within board-set risk appetite. The audit committee instead receives independent, third-line assurance: findings from internal audit's regular reviews of controls and operational risk functionality: rather than monitoring risk directly itself." },
    { q: "A business line has many small, frequent operational losses that individually barely affect the budget. Should risk management ignore them?", a: "No: while any single small loss is immaterial, the pattern across many small losses should be regularly analyzed, because a recurring cluster can reveal a structural control gap or process flaw that needs remediation, even though no individual event would trigger escalation on its own." }
  ],

  hooks: [
    { title: "The reporting cake", text: "Bottom layer: everything, fresh daily. Middle layer: only what needs a decision. Top layer: the headline, once a quarter. Feed the board the whole cake and they'll choke on crumbs that don't matter." },
    { title: "Five audiences, one truth, different altitudes", text: "The risk committee wants proof the framework works. The audit committee wants an outsider's proof of that proof. The ExCo wants to know what to decide. The central op risk function is the one gluing all the raw business-line data together. The business line manager just wants today's numbers." }
  ],

  eli5: `<p>Imagine a hospital at shift-change. The nurse on the floor needs the full chart on every patient right now: vitals, meds, everything, refreshed every few hours, because they're the one adjusting a drip today. The head of nursing for the ward only needs to hear about patients whose situation actually requires a decision from her: a bed transfer, a doctor call: summarized once a shift, not every vital sign. The hospital's board doesn't want any of that detail; they want to know infection rates are trending down and the new wing is on schedule, once a quarter. Nobody is lying to anybody, and nobody is being kept in the dark: each person just gets the amount of detail they can actually act on, at the altitude they operate at. That's exactly the "reporting cake": business line managers (the nurse) get the full daily feed, the operational risk committee (the ward head) gets only action-required items, and the board risk committee (the hospital board) gets the high-level headline.</p>`,

  thinkLike: `<p>A risk manager building an ORM report starts from one question: <em>what decision is this reader empowered to make, and what's the minimum data that lets them make it well?</em> That single question is what forces detail down at the top (a board can't act on a transaction log) and forces completeness at the bottom (a business line manager without full daily data can't actually fix anything). It is also why "which tier gets what" and "which committee gets X" are the standard question shapes here: they test whether you see that reporting is designed around decision rights, not around who is senior.</p>
<p>The second instinct a practitioner needs is statistical honesty about the shape of operational loss data. Most of finance assumes symmetric, roughly normal distributions where the mean is a sensible summary. Op risk data almost never looks like that: it's dominated by a few catastrophic tail events sitting on top of a mass of trivial small losses: so a risk manager who reports "average loss per quarter" without checking the distribution shape is quietly hiding the exact thing that matters, which is the tail. The standard question hands you a distorted-looking average and asks either why it misleads or what to report instead, and the answer is median and quartiles.</p>`,

  breakdown: [
    {
      title: "Internal reporting audiences",
      points: [
        "Risk committee (board subcommittee): monitors the whole risk framework; gets summary exposures/trends plus detailed KRIs, large-event investigations, and event frequency/severity; issues directives to the ExCo.",
        "Audit committee (board subcommittee): third-level, independent oversight via internal audit (third line of defense), which reviews controls regularly and reports findings to the audit committee and ExCo.",
        "Executive committee (ExCo): the board's own steering committee of senior executives and elected board members; prioritizes issues, oversees governance/policy, makes decisions between board meetings or in a crisis; receives exposures, trends, events, action plans, culture, and remediation.",
        "Central operational risk function / operational risk committee (second line of defense): collects and aggregates data from every business line, reports up to the risk committee and back down to business line managers.",
        "Business line managers and risk champions (first line of defense): closest to the actual risk; monitor their own KRIs, action-plan progress, and impacts daily; benchmark against firmwide or peer-line averages."
      ]
    },
    {
      title: "The reporting cake: three tiers",
      points: [
        "Tier 1 (bottom): business line managers and risk champions: full metric set, monitored daily; monitoring and reporting are the same activity here.",
        "Tier 2 (middle): operational risk committee: only action-required items (fixing a process, budget discussions, early interventions); everything else summarized monthly/quarterly.",
        "Tier 3 (top): executive and board risk committee: high level only: leading indicators, performance trends, strategic-plan progress, risk impact relative to objectives."
      ]
    },
    {
      title: "Components of a comprehensive internal ORM report",
      points: [
        "1) Prioritized risks and outlook: top-10 list ranked by inherent risk (before mitigation) and/or residual risk (after it), each with likelihood, severity, rating, and outlook (improving/worsening/status quo). Common entries: technology breakdowns, cyberattacks, data loss, regulatory and compliance breaches, and transformation-project risk.",
        "2) Heatmap and risk register: register built from RCSA exercises; heatmap plots likelihood vs. severity, colored red/amber/yellow/green.",
        "3) Risk appetite metrics: KRIs measuring compliance with board risk limits: type, name, threshold, actual value, overall score.",
        "4) KRIs and issue monitoring: forward-looking indicators drawn from HR (compliance-training attendance, disciplinary cases), risk control (percent of action plans completed, timeliness of incident reporting), audit (timeliness of responses to findings, number of findings), and compliance (percent of complaint responses on time, conflicts of interest reported). 'Issues' are the early-warning signals, such as process delays and IT problems, that precede actual incidents.",
        "5) Risk events and near misses: counts, frequency/severity trends, and narratives above materiality; near misses teach lessons without an actual loss.",
        "6) Action plans and remediation: corrective (reactive, triggered by a surprise loss or a discovered gap), detective (catch an incident before it becomes a loss), and preventive (proactive, before problems start) plans. The target is a 'zero objective': no overdue action plans and no overdue audit recommendations, with 'discipline indicators' tracking exactly those overdue items.",
        "7) Emerging risks and horizon scanning: forward-looking identification of new risks and trends, reported monthly or quarterly to the board risk committee, bucketed by expected time horizon (within 1 year, 1-3 years, beyond 3 years), with particular attention to the regulatory and compliance environment."
      ]
    },
    {
      title: "Reporting challenges specific to op risk",
      points: [
        "Cost-benefit test: cost of collecting data < its value; content aligns with priorities; reporting must be able to influence a decision.",
        "Event data asymmetry: a few high-severity, low-frequency events dominate; high-frequency low-severity events barely move the loss budget.",
        "Large event escalation: events/near-misses above tolerance go to upper management with root-cause analysis and an action plan.",
        "Small, frequent losses: individually immaterial, but reviewed for patterns revealing structural control gaps.",
        "Operational loss benchmarking: compare losses in basis points of regulatory capital or as a percentage of gross income/budget so different-sized entities are comparable.",
        "Non-normal distributions: op risk losses aren't symmetric/bell-shaped, so mean is misleading; use median and quartiles instead (applies to KPIs/KRIs and ratings too).",
        "Concentrations, outliers, and scenarios: outliers carry real information and are where ORM's value actually comes from, so examine distributions in full and by subcategory rather than only in summary; high/medium/low-risk scenario analysis, for instance climate-related scenarios, belongs here too.",
        "Qualitative data aggregation, three methods: conversion and addition (translate qualitative factors such as reputational damage into a monetary figure, then sum them), categorization (color or score bands such as red/amber/yellow/green, often shown as a bar chart), and worst-case reporting (the whole group is flagged red if even one component is red, which is conservative but can overstate concern)."
      ]
    },
    {
      title: "External reporting: Pillar 3 disclosure requirements",
      points: [
        "Qualitative information: governance/control structure, policies, procedures, and the data/systems used to measure operational risk.",
        "Historical losses: 10 years of aggregate operational losses plus resulting capital calculations, with narrative alongside the numbers.",
        "Business indicator and subcomponents: the primary input to op risk capital, using the last 3 years of data (for the BIC), with narrative on significant changes and key drivers."
      ]
    },
    {
      title: "Regulatory notification triggers (independent of Pillar 3)",
      points: [
        "Reputation criteria: events that could significantly damage firm reputation.",
        "Resilience criteria: events that could harm customers or disrupt goods/services delivered to them.",
        "Materiality criteria: events that exceed a defined loss/materiality threshold.",
        "Stability criteria: events that could threaten the wider financial system or the firm's ability to keep operating."
      ]
    },
    {
      title: "Combined assurance: the three lines of defense",
      points: [
        "First line: assesses its own risks/controls, tests them, and attests they're operating as intended.",
        "Second line: oversees the first line's activities, runs sample control testing, and does deeper dives into specific risk types.",
        "Third line (internal audit): periodic independent audit reviews on the standard audit cycle."
      ]
    }
  ],

  quiz: [
    {
      q: "Using the reporting cake model, which tier receives leading indicators and progress on strategic plans?",
      options: ["Tier 1", "Tier 2", "Tier 3", "There is no such tier: leading indicators aren't reported"],
      answer: 2,
      why: "Tier 3 (executive and board risk committee) receives high-level data including leading indicators, performance trends, and strategic-plan progress. Tier 1 gets the full daily metric set, and Tier 2 gets only action-required items: neither is the 'high-level, strategic' altitude leading indicators belong at."
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
      why: "Op risk losses are heavily skewed: a handful of catastrophic, low-frequency events can pull the mean up or down and make 'typical' exposure look different than it is. The fix is median/first-and-third-quartile reporting. The other options either assert something false about means in general or invent unsupported claims about reporting bias/period length."
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
        "The KRIs must be reported individually: worst-case reporting cannot aggregate them"
      ],
      answer: 2,
      why: "Worst-case reporting is explicitly the most conservative aggregation method: the entire group is flagged with the worst color present, even if only one component is red. Averaging the group's scores isn't valid for qualitative categories, and a majority-vote approach is not how worst-case reporting works by definition."
    },
    {
      q: "Under Basel Pillar 3 operational risk disclosure requirements, how many years of aggregate historical operational losses must generally be disclosed?",
      options: ["3 years", "5 years", "10 years", "15 years"],
      answer: 2,
      why: "Pillar 3 requires 10 years of aggregate historical operational losses (paired with the resulting capital calculations). This differs from the business indicator component, which uses the last 3 years of data, and the two numbers are easy to swap under pressure."
    },
    {
      q: "A significant operational risk event has occurred that could disrupt the goods and services a bank delivers to its retail customers, though it does not yet exceed the firm's materiality threshold. Under which regulatory notification trigger would this event most likely still require notification?",
      options: ["Materiality criteria", "Functional criteria", "Resilience criteria", "Stability criteria"],
      answer: 2,
      why: "Resilience criteria cover events that could negatively impact the goods or services provided to customers or cause them harm: independent of whether a materiality threshold is crossed. 'Functional criteria' is not one of the four named triggers, which are reputation, resilience, materiality, and stability. Stability criteria concern the wider financial system, not an individual customer-facing disruption."
    }
  ],

  sources: [
    { title: "Basel III: Finalising post-crisis reforms (operational risk, Pillar 3 disclosure)", url: "https://www.bis.org/bcbs/publ/d424.htm", note: "The BIS text establishing the standardized approach and the Pillar 3 disclosure requirements referenced here." },
    { title: "GARP: Financial Risk Manager (FRM) Program", url: "https://www.garp.org/frm", note: "Official FRM program page for exam structure and learning objectives." }
  ],

  pdf: { book: 3, query: "As the final step of risk management, risk monitoring provides organizational leaders" },

  summary: `<p><strong>Internal audiences</strong>: risk committee (framework oversight, sets/enforces appetite), audit committee (independent assurance via internal audit, 3rd line), ExCo (board's steering/decision body), central operational risk function (2nd line, aggregator), business line managers (1st line, full daily detail). <strong>Reporting cake</strong>: Tier 1 (business line, full detail, daily) → Tier 2 (ORM committee, action-required only, monthly/quarterly) → Tier 3 (board, high-level only). Comprehensive ORM report: top-10 risks, heatmap/risk register, appetite metrics, KRIs/issue monitoring, events/near-misses, action plans (corrective/detective/preventive, toward a zero objective), emerging risks. <strong>Challenges</strong>: cost-benefit test, event data asymmetry (rare severe events distort averages), escalation needs, small frequent losses (control-gap signal), benchmarking (bp of capital or % of income), asymmetric distribution (use median/quartiles not mean), outliers/scenarios, qualitative aggregation (conversion, categorization, worst-case). <strong>Pillar 3</strong>: qualitative info + 10yr loss history + business indicator (3yr) disclosure; separate notification triggers: reputation, resilience, materiality, stability. <strong>Combined assurance</strong> aligns all three lines (1st: self-assess/attest, 2nd: oversight/deep dives, 3rd: internal audit cycle) into one coherent, color-coded picture.</p>`
});
