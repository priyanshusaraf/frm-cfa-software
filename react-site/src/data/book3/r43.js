export default ({
  book: 3, reading: 43,
  session: "Operational Risk Overview",
  title: "Risk Measurement and Assessment",
  tagline: "The quant heart of Session 7 — where op risk gets numbers attached. Qualitative assessment, quantitative assessment (FTA, FAIR), the loss distribution approach, and the seven-step resilience process.",

  teaches: `<p>Operational loss data regulatory requirements (how banks collect and classify the incidents they lose money on), qualitative assessment tools (RCSAs, KRIs/KPIs/KCIs, likelihood/impact heatmaps), quantitative assessment tools (fault tree analysis, root-cause analysis, the 5-whys technique, the bow tie diagram, the FAIR model, the Swiss cheese model), the loss distribution approach (LDA) that historically underlay operational risk capital, why extreme value theory has a poor fit for operational risk, how banks combine internal and external loss data, and the seven-step operational resilience process that ties the whole reading together.</p>`,

  why: `<p>This is the reading where op risk transitions from "here is a list of bad things that can happen" (R41, R42) to "here is how you attach numbers to those bad things." The loss distribution approach specifically is the direct ancestor of the SMA (Standardized Measurement Approach) formula that closes the book in R63: the SMA's Business Indicator and Loss Component are essentially a simplified, non-model-based replacement for what LDA tried to do by fitting frequency and severity distributions bank by bank. Even though the SMA now technically eliminates the *requirement* to model operational risk for regulatory capital, banks still use LDA-style thinking internally — for Pillar 2's ICAAP (internal capital adequacy assessment process), for stress testing, and for scenario analysis. So this reading is tested both for its own mechanics (fault tree calculations are a classic numeric question type) and as the conceptual bridge to R63.</p>`,

  intuition: `<p>Think of this reading as answering four separate questions a risk manager asks about operational losses, in order:</p>
  <p><strong>1. What data do I even have to work with?</strong> Before you can measure anything, you need a clean, complete internal loss database — which is why regulators (the BCBS) set minimums: at least 10 years of history, a €20,000 reporting floor (losses smaller than that are too costly to track individually), and four dates tracked per loss event (occurrence, discovery, reporting, accounting) so you can see how quickly your controls catch problems.</p>
  <p><strong>2. How risky do I judge myself to be, before I run any numbers?</strong> This is qualitative assessment — RCSAs (risk and control self-assessments) where business-unit staff sit down and rate, in their own judgment, "how likely is this risk, and how bad would it be." No math here, just structured judgment turned into a heatmap.</p>
  <p><strong>3. Can I estimate a probability from first principles, without waiting for enough historical losses to build a statistical distribution?</strong> This is quantitative-but-not-statistical assessment: fault tree analysis (multiply the failure probabilities of each control layer that would all have to fail together) and the FAIR model (break a risk into named factors, measure each, and combine them, usually via Monte Carlo simulation). The Swiss cheese model is the mental corrective here — it warns you that FTA's independence assumption is usually optimistic, because real control layers often share a hole (a common vulnerability) rather than failing at random.</p>
  <p><strong>4. If I have enough historical loss data, can I fit an actual statistical model and compute a capital number?</strong> This is the Loss Distribution Approach (LDA). It splits losses into FREQUENCY (how often do losses happen — a discrete count, modeled with a Poisson distribution) and SEVERITY (how bad is each one — a continuous, fat-tailed variable, modeled with a lognormal distribution). You model each piece separately because they have genuinely different statistical shapes and are driven by different things, then you combine ("convolute") them — usually via Monte Carlo simulation, which just means: draw a random frequency, draw that many random severities, sum them, repeat this millions of times, and read off the resulting distribution of total annual losses. The 99.9th percentile of that simulated aggregate-loss distribution becomes the capital requirement — the same 99.9% one-year confidence level used elsewhere in Basel capital rules.</p>
  <p>Fault tree analysis multiplies INDEPENDENT control-failure probabilities together (this is an "AND condition" — every listed control has to fail for the bad outcome to occur) — but real controls are rarely fully independent (they're often designed together by the same team, so a flaw in one design philosophy shows up in several "independent" layers at once), so naive multiplication can dramatically UNDERSTATE the true joint failure probability. The Swiss cheese model captures this better as an intuition-builder (it is not itself a calculation method): imagine each control as a slice of Swiss cheese with holes in it that open, close, and drift around over time. A bad outcome slips through only when the holes in several slices happen to line up at the same moment. The defense is keeping the holes' locations uncorrelated across layers — i.e., designing each control independently enough that a single design flaw can't create holes in the same place in every layer at once.</p>`,

  visual: `<div class="widget" data-widget="lossdist"></div>`,

  formulas: [
    {
      name: "Fault tree analysis (independent AND conditions)",
      math: "P(\\text{loss}) = P(A) \\times P(B) \\times P(C) \\times \\cdots",
      plain: "If a chain of control failures must ALL occur together for a loss to happen, and the failures are independent, the joint probability is just the product of each control's individual failure (or pass-through) probability.",
      note: "Phishing 99% × firewall fails 5% × employee fails 10% × detection fails 3% × exit 1% = 0.0001485%. Assumes independence — often unrealistic.",
      derivation: `<p>Worked example straight from the module quiz — a nonmalicious data-leakage scenario with five sequential conditions, each treated as independent:</p>
      <ul>
        <li>P(employee receives phishing email) = 99%</li>
        <li>P(firewall fails to block it) = 5%</li>
        <li>P(employee fails to delete/report it) = 10%</li>
        <li>P(detective controls for suspicious network activity fail) = 3%</li>
        <li>P(the leaked information actually exits the bank) = 1%</li>
      </ul>
      <p>Multiplying under the independence assumption:</p>
      \\[ 0.99 \\times 0.05 \\times 0.10 \\times 0.03 \\times 0.01 = 0.0000001485 = 0.0001485\\% \\]
      <p>That tiny percentage is a PER-EMPLOYEE, per-period figure. Scale it up: with 50,000 employees at the bank and a consistent failure rate assumption, the bank-wide likelihood of at least one such leakage becomes roughly \\( 0.0001485\\% \\times 50{,}000 \\approx 7.4\\% \\) using a simple linear scaling (the source text's own worked illustration uses a similar scaling logic with different inputs to show that a tiny per-event probability times a large number of employees or transactions produces a MATERIAL aggregate likelihood — the tail-risk-looking number at the individual level is not the risk manager's real exposure).</p>`
    },
    {
      name: "LDA aggregate loss",
      math: "\\text{Aggregate loss} = \\text{Frequency} \\otimes \\text{Severity}",
      plain: "The total operational loss over a period is built by combining how MANY loss events occurred (frequency) with how LARGE each one was (severity) — modeled as two separate distributions and then mixed together (convoluted), not as one single distribution fit to total losses directly.",
      note: "Frequency ~ Poisson(λ); severity ~ lognormal. Convoluted via Monte Carlo. 99.9th percentile of the aggregate distribution = standalone capital requirement.",
      derivation: `<p>Mechanically, Monte Carlo convolution works like this, repeated millions of times to build up the aggregate distribution:</p>
      <ol>
        <li>Draw a random count of loss events for the year, \\( n \\), from the fitted frequency distribution — typically \\( n \\sim \\text{Poisson}(\\lambda) \\), where \\( \\lambda \\) is both the mean AND the variance of the Poisson distribution (its single parameter does double duty).</li>
        <li>Draw \\( n \\) independent random severities \\( S_1, S_2, \\ldots, S_n \\) from the fitted severity distribution — typically lognormal, chosen because it is continuous, always positive, and fat-tailed (many small losses, a few huge ones).</li>
        <li>Sum them: \\( L = S_1 + S_2 + \\cdots + S_n \\) is one simulated year of total operational loss.</li>
        <li>Repeat steps 1–3 millions of times to build up the full simulated aggregate loss distribution.</li>
      </ol>
      <p>The capital requirement is then read off as the \\( 99.9^{\\text{th}} \\) percentile of that simulated distribution — the loss level exceeded, on average, only once in a thousand years.</p>`
    }
  ],

  concepts: [
    {
      name: "Operational loss data — regulatory requirements",
      def: "BCBS minimums: ≥10 years of data, minimum collection threshold of €20,000, internal losses classified to Basel event types, occurrence and recovery dates reported. Four relevant dates per event: occurrence → discovery → reporting → accounting.",
      intuition: "Regulators need enough history and enough completeness that a loss database is actually usable for capital modeling and comparison across banks — a database with 2 years of data, or one that silently drops small losses inconsistently, tells you almost nothing reliable about tail risk.",
      example: "A bank employee manipulates a suspense (transitory) account for years before anyone notices. The gap between occurrence and discovery here can stretch to years — which is exactly why the four-date framework exists: it separately measures how fast a problem is FOUND (occurrence→discovery, a visibility measure), how fast it's ESCALATED once found (discovery→reporting, a timeliness measure), and how long it takes to close out financially (reporting→accounting/settlement, which can itself run three to five years for incidents with legal or regulatory tails).",
      pitfall: "Boundary events occur in one risk class but are caused by another (e.g., a credit loss caused by human/operational error). Boundary events tied to CREDIT risk are treated as credit risk (already in RWA, not double-counted in op risk); boundary events tied to MARKET risk stay in operational losses.",
      related: [{ r: 62, label: "R62 — this data feeds the SMA's loss component" }],
      memory: "Boundary event tied to credit → stays credit (no double count). Tied to market → stays operational."
    },
    {
      name: "RCSAs, KRIs, KPIs, KCIs",
      def: "RCSA (risk and control self-assessment) examines inherent risk (no controls) and residual risk (after controls), primarily qualitative and judgment-based, typically annual (or quarterly for very significant risks). KRI measures exposure level (e.g., transactions processed per employee, or an increase in trader transaction limits). KPI measures how effectively the bank operates (e.g., customer complaint count, average IT system downtime). KCI measures how effectively controls operate (e.g., number of overdue business continuity plan reviews, error rates surviving two rounds of independent review).",
      intuition: "These three indicators overlap on purpose — the same underlying control failure can simultaneously be a KRI (it raises the bank's risk exposure), a KPI (it signals the bank is running less effectively), and a KCI (it shows the control itself isn't working). A useful way to keep them straight: KRI asks 'am I becoming MORE exposed?', KPI asks 'am I running WELL?', KCI asks 'is my CONTROL working?' — three different lenses on the same event.",
      example: "A transaction keeps processing incorrectly despite multiple checks, including automated edit checks. The KCI is the inaccurate processing surviving the checks (the control itself failing); the KRI is the increased risk of customer litigation that failure creates; the KPI is what it reveals about weak back-office capability.",
      pitfall: "Backtesting RCSAs against actual incidents tends to reveal UNDERESTIMATED likelihood and OVERESTIMATED severity — a specific, testable directional bias. Heatmaps (likelihood × impact → green/yellow/amber/red) are QUALITATIVE labels, not numbers to be multiplied together. It is mathematically wrong to compare a 'remote × extreme' risk (say, ratings 1×3=3) to a 'possible × low' risk (ratings 3×1=3) as if the equal product made them equivalent — the ratings are ordinal labels, not cardinal numbers.",
      related: [{ r: 42, label: "R42 — RCSA introduced as a bottom-up identification tool" }],
      memory: "KRI = exposure. KPI = performance. KCI = control effectiveness. Three different questions, three different letters."
    },
    {
      name: "Fault tree analysis (FTA)",
      def: "A form of deductive failure analysis: fault trees break a major failure event down into the external and internal conditions required for it to happen. Conditions can be joined by AND (all must occur together) or OR (any one is sufficient) logic. Under the AND/independence assumption, joint probability is the product of the individual probabilities.",
      example: "Phishing received 99% × firewall fails 5% × employee fails to catch it 10% × detection fails 3% × information exits 1% = 0.0001485%. Scaled up across 50,000 employees at a consistent per-employee failure rate, that tiny percentage becomes a materially large bank-wide annual likelihood — illustrating why exposure (headcount, transaction volume) matters as much as the raw per-event probability.",
      pitfall: "In reality, controls are RARELY fully independent (they're often designed together, e.g. by the same IT team) — conditional (Bayesian) probabilities give a more realistic estimate, since failure in one control makes failure in a related control more likely, not equally likely. Scaling matters too: a tiny per-event probability times a large number of employees/transactions can still produce a material AGGREGATE likelihood.",
      related: ["FAIR model & the Swiss cheese model"]
    },
    {
      name: "Root-cause analysis, the 5-whys, and the bow tie diagram",
      def: "Root-cause analysis is performed by the first line of defense on significant incidents and near misses (with the second line reviewing/challenging it), looking for the deeper causes behind a loss rather than stopping at the symptom. The 5-whys technique operationalizes this: ask 'why did this happen?' at least five times in sequence, each answer prompting the next 'why', until you reach an underlying systemic cause rather than a surface-level trigger. The bow tie diagram visualizes the result: the risk event sits in the center, with CAUSES and PREVENTIVE controls laid out on the left side (before the event), and IMPACTS plus DETECTIVE/CORRECTIVE controls laid out on the right side (after the event).",
      example: "An IT outage (the center of the bow tie) traces left to causes like a failed software deployment and preventive controls like change-management sign-off; it traces right to impacts like delayed customer transactions and corrective controls like a failover system and a customer-communication plan.",
      intuition: "The bow tie shape literally mirrors the logic: left side = 'what could make this happen, and what stops it before it does', right side = 'once it happens, how bad does it get, and what limits the damage'. This makes it a natural tool for estimating both expected frequency (left side, driven by preventive-control strength) and expected severity (right side, driven by detective/corrective-control strength) in one diagram, and for spotting additional KRIs worth monitoring.",
      related: []
    },
    {
      name: "FAIR model & the Swiss cheese model",
      def: "FAIR (Factor Analysis of Information Risk): (1) determine risk factors and how they interrelate, (2) measure each factor, (3) computationally combine them (often via Monte Carlo simulation) into a loss distribution for the scenario. Every input is stated as a distribution, not a single point estimate, so the output is itself a distribution of simulated losses rather than a single number.",
      example: "Swiss cheese model: each control layer has holes; bad outcomes happen only when holes in multiple layers momentarily align. Defense: keep control failure rates uncorrelated (design each layer independently, ideally by different teams) and maintain compensating controls that can catch what another layer misses, with periodic reviews to confirm the layers stay independent and reliable over time.",
      related: []
    },
    {
      name: "Loss distribution approach (LDA)",
      def: "Splits losses into frequency (discrete, usually Poisson — one parameter \\(\\lambda\\) equals both the mean and the variance) and severity (continuous, fat-tailed, usually lognormal), modeled independently then convoluted (often via Monte Carlo simulation) into an aggregate loss distribution.",
      example: "The 99.9th percentile of that aggregate distribution is the stand-alone capital requirement under LDA, matching the 99.9%/one-year confidence level used elsewhere in Basel capital rules. Effective units of measure (UoM) — the loss buckets LDA is applied to — might be external fraud events, internal fraud events per business unit, or processing error events; each UoM should group losses that share similar drivers so they plausibly follow one distribution.",
      pitfall: "Units of measure (UoM) should be homogeneous (similar loss drivers) but homogeneity trades off against data volume — finer UoMs mean less data per bucket, which means less reliable fitted distributions. Copulas (a generalization of correlation) aggregate across UoMs, capturing tail dependence — the tendency for extreme losses in different UoMs to happen together more often than a simple correlation coefficient would suggest. LDA also assumes losses are independent and identically distributed within a class and that frequency and severity are independent of each other — both assumptions are questionable, since empirical data often shows high-frequency/low-severity and low-frequency/high-severity events clustering in ways that violate strict independence.",
      related: [{ r: 62, label: "R62 — the SMA, LDA's non-model-based successor" }],
      memory: "Frequency (Poisson) × Severity (lognormal), convoluted → 99.9th percentile = capital."
    },
    {
      name: "Extreme value theory (EVT) for operational risk",
      def: "Block maxima (Fisher-Tippett): the maximum loss per equally-spaced time period per UoM. Peaks-over-threshold (POT): losses above a high threshold considered 'sufficiently large', fit with the generalized Pareto distribution (GPD).",
      pitfall: "EVT only really works when there's ONE dominant underlying cause generating losses that will keep generating even-larger future losses (e.g., a single volatility regime driving market crashes) — a poor fit for operational risk's genuinely HETEROGENEOUS loss drivers (fraud, IT failure, natural disaster, human error, litigation all generate losses through completely different mechanisms), which severely limits its practical usefulness here. Don't assume EVT (so powerful in Book 1's market risk) transfers cleanly to op risk — alternatives like scenario analysis, causal modeling, fixed multipliers, and macro determinants of operational risk are used instead where LDA alone can't handle the very high skewness of the loss data.",
      related: [{ r: 3, label: "R3 — EVT's full market-risk treatment, contrasted with its limited op-risk fit" }]
    },
    {
      name: "Combining internal and external loss data",
      def: "Scaling (size and inflation adjustments so external or old losses are comparable to the bank's current size and prices), cut-off mix (blend in external data above a threshold where internal data thins out, since a bank's own history of very large losses is usually sparse), filtering (explicit inclusion/exclusion rules to prevent manipulation of which losses enter the model).",
      example: "Internal loss data is the natural starting point for LDA and gives the most bank-specific, detailed information — particularly for the 'critical mass' of high-frequency, moderate-severity events. But it alone rarely contains enough truly extreme events to fit a reliable tail, so external data (from public sources, members-only industry databases, or associations such as the Operational Riskdata eXchange Association) fills that gap — at the cost of being less detailed and less directly comparable to the bank's own risk profile.",
      related: []
    },
    {
      name: "Operational resilience — the seven steps",
      def: "(1) Determine important business services (IBSs). (2) Establish impact tolerances for each IBS. (3) Map IBSs and the resources needed to deliver them. (4) Design harsh-but-realistic scenarios to test vulnerabilities. (5) If tolerances are breached, review lessons learned and remediate. (6) Ensure communication plans are ready to execute. (7) Perform an annual board-approved self-assessment.",
      example: "Business impact analysis (BIA) underpins step 2: a BIA report examines the operational and financial fallout from a disruption (lost or delayed sales, extra costs and penalties, lost customers) and recommends that recovery be prioritized for the processes with the biggest operational/financial stakes. Single points of failure (SPOFs) — e.g., a key cybersecurity employee whose specialist knowledge is undocumented and hard to replace, or a supplier of IT/data/internet services with no substitute — are treated as resilience KRIs; where they can't be eliminated through backups and redundancy, they must instead be built explicitly into the impact-tolerance thresholds and stress tests.",
      pitfall: "Resilience is NOT the same as business continuity management (BCM). BCM covers every business process's continuity/recovery broadly; resilience is narrower — it applies specifically to 'important business services' under non-extreme conditions and impact tolerances. 'Intolerable impacts' that breach tolerances fall OUTSIDE resilience's scope by definition — resilience only concerns itself with IBSs staying within tolerance, not with catastrophic breaches beyond it.",
      related: [{ r: 40, label: "R40 — the resilience vocabulary this process formalizes" }],
      memory: "BCM = broad continuity for everything. Resilience = narrow, specifically important services within tolerance."
    }
  ],

  connections: {
    from: [
      { r: 42, why: "Scenario analysis and RCSA identification feed directly into this reading's quantitative assessment methods." },
      { r: 40, why: "The resilience vocabulary introduced there gets its full seven-step mechanical process here." }
    ],
    to: [
      { r: 62, why: "The LDA's frequency/severity split is the conceptual ancestor of the SMA's business indicator + loss multiplier approach." },
      { r: 55, why: "Model risk validation reuses this reading's rigor around data quality and backtesting." }
    ],
    confused: [
      { what: "KRI vs KPI vs KCI", how: "KRI tracks EXPOSURE level (how risky are we becoming); KPI tracks OPERATIONAL effectiveness (how well do we run); KCI tracks CONTROL effectiveness (how well do our controls work) — three distinct questions, though one metric can satisfy more than one label at once." },
      { what: "Fault tree analysis vs Swiss cheese model", how: "FTA assumes independence and multiplies probabilities (often understating true risk); Swiss cheese explicitly models how correlated/aligned holes across layers create the failure — a more realistic mental model of the same joint-failure problem, but not itself a calculation method." },
      { what: "Resilience vs BCM", how: "BCM is broad (all processes); resilience is narrow (specifically 'important business services' within tolerance) — intolerable impacts fall outside resilience's defined scope." },
      { what: "RCSA vs RCA vs RRSA", how: "RCSA covers both inherent and residual risk; RCA (risk and control assessment) documents tests of controls and compares actual losses to peers; RRSA (residual risk self-assessment) skips inherent risk entirely and focuses only on what's left after controls are applied." }
    ]
  },

  misconceptions: [
    { wrong: "\"Fault tree analysis, by multiplying independent probabilities, gives an accurate estimate of joint control failure.\"", right: "Real controls are RARELY fully independent (often designed together) — naive multiplication can significantly understate true joint failure probability. Conditional (Bayesian) probabilities are more realistic." },
    { wrong: "\"Backtesting RCSAs tends to reveal that likelihood was overestimated and severity underestimated.\"", right: "The opposite directional bias is typical: RCSAs tend to UNDERESTIMATE likelihood and OVERESTIMATE severity when backtested against actual incidents." },
    { wrong: "\"Extreme value theory works as well for operational risk as it does for market risk.\"", right: "EVT requires one dominant underlying cause generating losses — op risk's heterogeneous loss drivers make it a poor fit, limiting its practical usefulness compared to market risk (R3)." },
    { wrong: "\"Operational resilience and business continuity management (BCM) are the same thing.\"", right: "BCM is broader (all business processes); resilience is narrower, focused specifically on 'important business services' and impact tolerances — intolerable impacts fall outside resilience's defined scope." },
    { wrong: "\"A heatmap's likelihood and impact scores should be multiplied together for a precise risk score.\"", right: "Heatmap categories (remote/unlikely/possible/likely/highly likely × low/medium/high/very high/extreme) are QUALITATIVE labels combined into color zones (green/yellow/amber/red) — not numbers meant for multiplication; two risks with the same numeric 'product' (e.g., a remote/extreme risk and a possible/low risk) are not equivalent." },
    { wrong: "\"A boundary event caused by operational failure but landing in the credit book should be reported and capitalized as operational risk.\"", right: "Boundary events tied to CREDIT risk are treated as credit risk and left in risk-weighted assets (RWA) precisely so they are NOT double-counted in operational risk capital — only boundary events tied to MARKET risk stay classified as operational losses." }
  ],

  highYield: [
    { stars: 5, what: "LDA: frequency (Poisson) × severity (lognormal) convoluted to the 99.9th percentile for capital.", why: "The core quantitative model of operational risk — direct ancestor of the SMA capital formula in R62/R63." },
    { stars: 4, what: "Fault tree analysis mechanics and the independence-assumption trap.", why: "A calculation-based question type with a clear conceptual pitfall (real controls aren't independent) — the phishing-email worked example is a favorite exam template." },
    { stars: 4, what: "Boundary events: credit-linked stays credit (no double-count), market-linked stays operational.", why: "A precise, frequently tested classification rule." },
    { stars: 3, what: "KRI vs KPI vs KCI definitions and examples.", why: "A clean three-way distinction, good matching-question material." },
    { stars: 3, what: "The seven-step operational resilience process, and resilience vs. BCM.", why: "Connects R40's vocabulary to concrete mechanics — a valuable synthesis area." },
    { stars: 2, what: "EVT's limited fit for op risk (needs one dominant cause).", why: "A useful contrast with Book 1's EVT treatment." }
  ],

  recall: [
    { q: "A bank's fault tree analysis multiplies five independent control-failure probabilities to estimate a 0.0001485% chance of a successful phishing attack. Why might this significantly understate the true risk?", a: "The analysis assumes all five controls (firewall, employee vigilance, detection systems, etc.) fail independently. In reality, controls are often designed together and share common vulnerabilities or blind spots (e.g., the same IT team designs both the firewall and detection system) — true joint failure probability, accounting for this correlation, is likely higher than the naive multiplication suggests." },
    { q: "Under the loss distribution approach, why are frequency and severity modeled separately before being combined?", a: "Frequency (how often losses occur) and severity (how large each loss is) are driven by different underlying processes and have different statistical shapes — frequency is discrete and typically well-modeled by a single-parameter Poisson distribution, while severity is continuous and fat-tailed, typically lognormal. Modeling them separately, then convoluting (e.g., via Monte Carlo), captures the true aggregate loss distribution more accurately than trying to fit one distribution to the combined data." },
    { q: "A rogue employee's fraud causes a credit loss when a mismarked position leads to an uncollectible receivable. Is this loss captured in operational risk capital, credit risk capital, both, or neither?", a: "This is a boundary event tied to CREDIT risk — it's treated as credit risk (already captured in credit RWA) and is NOT double-counted in operational risk capital, even though the root cause (mismarking) is operational in nature." },
    { q: "Why does the reading caution that extreme value theory (EVT) is less useful for operational risk than for market risk?", a: "EVT's theoretical justification works best when there's ONE dominant underlying cause generating extreme losses (e.g., market crashes driven by a shared volatility regime). Operational risk losses come from genuinely heterogeneous causes (fraud, system failure, natural disaster, human error) with no single unifying generative process, undermining EVT's core assumption and limiting its practical fit." },
    { q: "What is the bow tie diagram used for, and how does its left side differ from its right side?", a: "It visualizes root-cause analysis around a single risk event placed at the center. The left side lays out the CAUSES of the event and the PREVENTIVE controls meant to stop it before it happens; the right side lays out the resulting IMPACTS and the DETECTIVE/CORRECTIVE controls meant to catch and limit damage after it happens — letting an analyst estimate both frequency (left side) and severity (right side) in one picture." }
  ],

  hooks: [
    { title: "Two questions, one number", text: "LDA asks 'how often' (frequency) and 'how bad' (severity) as two SEPARATE questions, then mashes the answers together (convolution) into one aggregate distribution — and the 99.9th percentile of THAT becomes your capital number." },
    { title: "Swiss cheese, not fault tree, for realism", text: "Fault tree analysis pretends the cheese slices' holes are randomly placed (independent). Swiss cheese model admits the holes might actually LINE UP (correlated) — a more honest picture of how failures cascade." },
    { title: "The narrow slice of resilience", text: "BCM is the whole pie (all business processes). Resilience is one slice — important business services, within tolerance. Breach the tolerance, and you've fallen off resilience's plate entirely." },
    { title: "A bow tie has two sides for a reason", text: "Left side = what causes it and what prevents it (frequency levers). Right side = what it costs and what limits the damage (severity levers). The risk event is the knot in the middle." }
  ],

  summary: `<p><strong>Loss data</strong>: ≥10yr, €20,000 threshold, 4 dates (occurrence→discovery→reporting→accounting); boundary events tied to credit stay credit, tied to market stay operational. <strong>RCSA</strong> (inherent vs residual risk, qualitative, annual) tends to UNDERESTIMATE likelihood, OVERESTIMATE severity when backtested; alternatives are RCA and RRSA. <strong>KRI</strong> (exposure) / <strong>KPI</strong> (performance) / <strong>KCI</strong> (control effectiveness). <strong>Fault tree analysis</strong>: multiplies independent probabilities — unrealistic since real controls correlate; <strong>root-cause analysis</strong>, the <strong>5-whys</strong>, and the <strong>bow tie diagram</strong> (causes/preventive controls on the left, impacts/detective-corrective controls on the right) dig into WHY and HOW BAD. <strong>Swiss cheese model</strong> captures FTA's blind spot better. <strong>FAIR model</strong>: factors → measure → Monte Carlo combine. <strong>LDA</strong>: frequency (Poisson) × severity (lognormal), convoluted, 99.9th percentile = capital; UoM homogeneity trades off data volume; copulas capture cross-UoM tail dependence. <strong>EVT</strong> poorly fits op risk's heterogeneous causes. <strong>Combining loss data</strong>: scaling, cut-off mix, filtering. Capital modeling now centers on Pillar 2's <strong>ICAAP</strong> since the SMA removed the LDA modeling requirement. <strong>Resilience</strong> (7 steps: IBS → tolerances → mapping → scenarios → remediate → communicate → annual self-assessment) is narrower than BCM.</p>`,

  eli5: `<p>Imagine your house has five separate locks and alarms guarding the front door — a fence, a gate lock, a motion sensor, a door lock, and a dog. If you assume each one works completely on its own and calculate the odds a burglar gets past ALL five by multiplying their individual failure chances, you'll get a tiny, reassuring number. But if the same lazy handyman installed the fence, the gate lock, AND the motion sensor all at once, a flaw in his work could quietly break all three at the same time — so the real odds of a break-in are higher than your tidy multiplication suggested, because the "independent" defenses secretly share a weakness. That's exactly the trap fault tree analysis falls into (multiplying probabilities as if control failures are unrelated) and exactly what the Swiss cheese model is designed to remind you of: your defensive layers have holes that drift around, and disaster strikes only when several holes happen to line up at once — which is more likely than pure multiplication implies whenever the layers aren't truly independent.</p>`,

  thinkLike: `<p>A quantitative operational risk analyst treats every "independence" assumption as a claim to be interrogated, not accepted at face value. When you see a fault tree with five multiplied probabilities, the exam wants you to notice two things in sequence: first, compute the naive product correctly (that's the calculation half of the question); second, immediately flag that real controls sharing a designer, a vendor, or an IT platform are correlated, so the true joint failure probability is understated — and remember to check the SCALE of exposure (number of employees, transactions, accounts) before declaring a tiny probability "immaterial," because a tiny per-event chance times a huge exposure base can still be a large aggregate risk.</p>
  <p>When you see LDA, think in two separate modeling jobs, not one: fit a frequency model (how many events this year — Poisson, one parameter doing double duty as mean and variance) and fit a severity model (how big is each one — lognormal, fat right tail) completely independently, THEN combine them via simulation. The examiner will test whether you know WHICH distribution goes with WHICH piece (frequency = discrete = Poisson; severity = continuous/fat-tailed = lognormal), and whether you know the punchline number — the 99.9th percentile of the resulting aggregate distribution is the capital figure, not the mean, not the median. On the resilience side, think like a regulator auditing a bank's self-assessment: is the bank's list of "important business services" actually narrow and prioritized, or did it just relabel its whole BCM plan as "resilience"? The exam rewards knowing that resilience explicitly excludes intolerable impacts (that's BCM's job) and applies only within impact tolerances for a curated list of IBSs.</p>`,

  breakdown: [
    {
      title: "The seven steps of operational resilience",
      points: [
        "1. Determine important business services (IBSs) — narrow the focus to the services whose disruption would matter most, not every process the bank runs.",
        "2. Establish impact tolerances for each IBS — set the maximum disruption (often expressed in time and severity) the bank will tolerate before harm becomes unacceptable.",
        "3. Map IBSs and the resources needed to deliver them — trace dependencies (people, systems, third parties) so you know what actually has to keep working.",
        "4. Design harsh-but-realistic scenarios to test vulnerabilities — stress the mapped services against severe-but-plausible disruptions, not token exercises.",
        "5. If tolerances are breached, review lessons learned and remediate — treat test failures as inputs to fix gaps, not just a report to file.",
        "6. Ensure communication plans are ready to execute — internal and external messaging must be pre-built, not improvised mid-crisis.",
        "7. Perform an annual board-approved self-assessment — senior governance signs off on the whole exercise at least once a year."
      ]
    },
    {
      title: "The three steps of the FAIR model",
      points: [
        "1. Determine risk factors and how they interrelate — break the scenario into its component drivers (asset at risk, threat, threat type, resulting loss if it occurs).",
        "2. Measure each factor — express each driver as a distribution (a range with likelihoods), not a single point guess.",
        "3. Computationally combine all factors — usually via Monte Carlo simulation, producing a full loss distribution for the scenario rather than one number."
      ]
    },
    {
      title: "Three methods for combining internal and external loss data",
      points: [
        "Scaling — adjust external or historical losses for size (bank's asset base) and inflation so they're comparable to the bank's current profile.",
        "Cut-off mix — below a threshold, rely on internal data; above it, where internal data thins out, blend in external data for a more reliable tail.",
        "Filtering — apply explicit, pre-set rules for which losses are included or excluded, so the dataset can't be quietly manipulated to lower capital."
      ]
    },
    {
      title: "Four concentric circles of the ORM framework (data → assessment → monitoring → learning)",
      points: [
        "1. Incident/loss database — the raw record of what actually happened.",
        "2. Assessment through RCSAs — structured judgment about inherent and residual risk levels.",
        "3. Monitoring through KRIs — ongoing tracking of whether exposure is rising or falling.",
        "4. Takeaways from major loss events or high-risk exposures — feeding lessons learned back into governance and controls."
      ]
    }
  ],

  quiz: [
    {
      q: "A fault tree analysis assumes four independent controls each have a 5% chance of failing simultaneously. What is the probability that all four fail together, and what is the single biggest reason this figure likely understates real-world risk?",
      options: [
        "0.05^4 = 0.000625%; it understates risk because real controls are often designed together and share common vulnerabilities, so failures are correlated, not independent",
        "0.05 × 4 = 20%; it overstates risk because controls usually reinforce each other",
        "0.05^4 = 0.000625%; it is accurate because independence is a safe assumption for bank controls",
        "1 − 0.95^4 ≈ 18.5%; this is the correct joint failure probability under independence"
      ],
      answer: 0,
      why: "Multiplying independent probabilities gives 0.05×0.05×0.05×0.05 = 0.00000625 = 0.000625%, correctly computed under the (optimistic) independence assumption. The distractor at 1−0.95^4 computes the probability that AT LEAST ONE fails (an OR condition), not that ALL fail together (the AND condition FTA actually models) — a common mix-up. The key conceptual point is that real controls sharing a designer or platform are correlated, so 0.000625% likely understates the true joint failure probability."
    },
    {
      q: "Under the Loss Distribution Approach (LDA), which pairing of statistical distributions is standard, and why?",
      options: [
        "Frequency ~ normal, severity ~ normal, because both are symmetric and easy to convolute",
        "Frequency ~ Poisson (discrete counts), severity ~ lognormal (continuous, fat-tailed, always positive)",
        "Frequency ~ lognormal, severity ~ Poisson, reversing the usual convention for market risk models",
        "Frequency ~ generalized Pareto, severity ~ uniform, matching the extreme value theory approach"
      ],
      answer: 1,
      why: "Frequency counts whole loss events per year, so it needs a discrete distribution — Poisson, whose single parameter λ is both the mean and variance. Severity is continuous, always positive, and fat-tailed (many small losses, a few huge ones), which lognormal captures well. Swapping them (the 'frequency lognormal, severity Poisson' answer) or using symmetric normal distributions for both ignores the actual shape of operational loss data; the generalized-Pareto/uniform pairing belongs to the EVT peaks-over-threshold method, not standard LDA."
    },
    {
      q: "A bank's RCSA rated a particular operational risk as 'possible' likelihood with 'low' impact, and a separate risk as 'remote' likelihood with 'high' impact. A junior analyst assigns numeric scores (possible=3, low=1, remote=1, high=3) and concludes both risks are equally severe because 3×1 = 1×3 = 3. What is wrong with this reasoning?",
      options: [
        "Nothing — multiplying heatmap ratings is the standard way to compare risk severity",
        "The scores should be added, not multiplied, to get a comparable severity index",
        "Heatmap likelihood and impact ratings are qualitative ordinal labels, not cardinal numbers meant for arithmetic — equal products don't imply equivalent risk",
        "The analyst used the wrong likelihood scale; heatmaps only use three categories, not five"
      ],
      answer: 2,
      why: "The reading explicitly warns that heatmap categories are qualitative labels combined into color zones (green/yellow/amber/red), not numbers to be multiplied together — a remote/high risk and a possible/low risk are not truly equivalent just because an arbitrary numeric encoding produces the same product. The 'add instead of multiply' answer is equally invalid for the same reason. The five-point scales (remote/unlikely/possible/likely/highly likely and low/medium/high/very high/extreme) are standard, so the 'wrong number of categories' answer is factually wrong."
    },
    {
      q: "A mismarked trading position, caused by an employee's operational error, ultimately produces an uncollectible receivable that is booked as a credit loss. How should this boundary event be classified for capital purposes?",
      options: [
        "As operational risk, since the root cause (mismarking) was operational in nature",
        "As both operational and credit risk, to ensure full capital coverage of the loss",
        "As credit risk only — it stays in credit risk-weighted assets and is not double-counted in operational risk capital",
        "As neither, since boundary events fall outside both frameworks by definition"
      ],
      answer: 2,
      why: "The BCBS rule is that boundary events tied to credit risk are classified and capitalized as credit risk (already captured in RWA), specifically to avoid double-counting the same loss in operational risk capital too. Classifying it as operational risk alone, or as both operational and credit risk, would double-count it; boundary events are explicitly covered by classification rules, not excluded from both frameworks (ruling out the 'neither' answer)."
    },
    {
      q: "Why does the reading conclude that extreme value theory (EVT), despite its power in market risk (see R3), has limited practical use for operational risk?",
      options: [
        "EVT requires at least 20 years of loss data, which most banks lack for operational losses",
        "EVT only produces reliable estimates when losses come from one dominant underlying cause, but operational losses arise from genuinely heterogeneous causes (fraud, IT failure, human error, disasters)",
        "EVT cannot be applied to any distribution other than the normal distribution, which never fits loss data",
        "EVT is a purely qualitative technique and cannot generate numeric capital estimates"
      ],
      answer: 1,
      why: "EVT's block maxima and peaks-over-threshold methods are theoretically justified by extreme losses sharing one generative process — a single dominant cause. Operational risk's causes are genuinely heterogeneous, undermining that assumption. The 'needs 20 years of data' claim isn't the reading's stated reason, and EVT is a genuinely quantitative, distribution-fitting technique (ruling out the 'normal distribution only' and 'purely qualitative' answers)."
    },
    {
      q: "What is the key structural difference between the left side and the right side of a bow tie diagram used in root-cause analysis?",
      options: [
        "The left side shows quantitative data, the right side shows qualitative judgment",
        "The left side covers causes and preventive controls (before the event); the right side covers impacts and detective/corrective controls (after the event)",
        "The left side is used only for market risk events, the right side only for operational risk events",
        "There is no meaningful difference — both sides show the same information for redundancy"
      ],
      answer: 1,
      why: "The risk event sits at the center; causes and preventive controls (aimed at stopping the event before it happens) are laid out on the left, while impacts and detective/corrective controls (aimed at limiting damage after the event occurs) are laid out on the right — letting an analyst reason about frequency levers (left) separately from severity levers (right). It is not a qualitative/quantitative split, nor is it risk-type-specific."
    }
  ],

  sources: [
    { title: "Operational risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Operational_risk", note: "General background on operational risk categories and management approaches." },
    { title: "Basel Committee on Banking Supervision — BIS", url: "https://www.bis.org/bcbs/index.htm", note: "The BCBS's home page for the standards (including loss-data and operational-resilience guidance) referenced throughout this reading." },
    { title: "Swiss cheese model — Wikipedia", url: "https://en.wikipedia.org/wiki/Swiss_cheese_model", note: "Background on James Reason's original accident-causation model that operational risk borrows for control-layer thinking." },
    { title: "Monte Carlo method — Wikipedia", url: "https://en.wikipedia.org/wiki/Monte_Carlo_method", note: "The simulation technique used to convolute frequency and severity distributions in LDA and in the FAIR model." }
  ],

  pdf: { book: 3, query: "After the identification stage, operational risk must be assessed" }
});
