FRM.register({
  book: 3, reading: 43,
  session: "Operational Risk Overview",
  title: "Risk Measurement and Assessment",
  tagline: "The quant heart of Session 7 — where op risk gets numbers attached. Qualitative assessment, quantitative assessment (FTA, FAIR), the loss distribution approach, and the seven-step resilience process.",

  teaches: `<p>Operational loss data regulatory requirements, RCSAs/KRIs/KPIs/KCIs, fault tree analysis, the FAIR model and Swiss cheese model, the loss distribution approach (LDA), extreme value theory's limited fit for op risk, combining internal/external loss data, and the seven-step operational resilience process.</p>`,

  why: `<p>This is the reading where op risk transitions from qualitative frameworks to actual numbers — the LDA specifically underlies operational risk capital modeling, a direct ancestor of the SMA formula that closes the book (R62).</p>`,

  intuition: `<p>The Loss Distribution Approach splits losses into two independently-modeled pieces: FREQUENCY (how often do losses happen — discrete, usually Poisson) and SEVERITY (how bad is each one — continuous, fat-tailed, usually lognormal). Model each separately, then convolute them (often via Monte Carlo) into an aggregate loss distribution. The 99.9th percentile of THAT aggregate distribution becomes the capital requirement.</p>
  <p>Fault tree analysis multiplies INDEPENDENT control failure probabilities together (AND conditions) — but real controls are rarely fully independent (they're often designed together), so naive multiplication can dramatically UNDERSTATE true joint failure probability. The Swiss cheese model captures this better: each control layer has holes, and bad outcomes happen only when holes in MULTIPLE layers momentarily align — the defense is keeping failure rates uncorrelated across layers.</p>`,

  visual: `<div class="widget" data-widget="lossdist"></div>`,

  formulas: [
    { name: "Fault tree analysis (independent AND conditions)", math: "P(loss) = P(A) \\times P(B) \\times P(C) \\times ...", note: "Phishing 99% × firewall fails 5% × employee fails 10% × detection fails 3% × exit 1% = 0.0001485%. Assumes independence — often unrealistic." },
    { name: "LDA aggregate loss", math: "Aggregate loss = frequency (Poisson, \\lambda ) \\otimes severity (lognormal)", note: "Convoluted via Monte Carlo. 99.9th percentile of the aggregate distribution = standalone capital requirement." }
  ],

  concepts: [
    {
      name: "Operational loss data — regulatory requirements",
      def: "BCBS minimums: ≥10 years of data, minimum collection threshold of €20,000, internal losses classified to Basel event types, occurrence and recovery dates reported. Four relevant dates per event: occurrence → discovery → reporting → accounting.",
      pitfall: "Boundary events occur in one risk class but are caused by another (e.g., a credit loss caused by human/operational error). Boundary events tied to CREDIT risk are treated as credit risk (already in RWA, not double-counted in op risk); boundary events tied to MARKET risk stay in operational losses.",
      related: [{ r: 62, label: "R62 — this data feeds the SMA's loss component" }],
      memory: "Boundary event tied to credit → stays credit (no double count). Tied to market → stays operational."
    },
    {
      name: "RCSAs, KRIs, KPIs, KCIs",
      def: "RCSA examines inherent risk (no controls) and residual risk (after controls), primarily qualitative, typically annual. KRI measures exposure level (e.g., transactions processed per employee). KPI measures how effectively the bank operates (e.g., customer complaint count). KCI measures how effectively controls operate (e.g., overdue BCP reviews).",
      pitfall: "Backtesting RCSAs against actual incidents tends to reveal UNDERESTIMATED likelihood and OVERESTIMATED severity — a specific, testable directional bias. Heatmaps (likelihood × impact → green/yellow/amber/red) are QUALITATIVE labels, not numbers to be multiplied together.",
      related: [{ r: 42, label: "R42 — RCSA introduced as a bottom-up identification tool" }],
      memory: "KRI = exposure. KPI = performance. KCI = control effectiveness. Three different questions, three different letters."
    },
    {
      name: "Fault tree analysis (FTA)",
      def: "Independent control failures multiply together for a joint probability (AND conditions).",
      example: "Phishing received 99% × firewall fails 5% × employee fails to catch it 10% × detection fails 3% × information exits 1% = 0.0001485%.",
      pitfall: "In reality, controls are RARELY fully independent (they're often designed together) — conditional (Bayesian) probabilities give a more realistic estimate. Scaling matters too: a tiny per-event probability times a large number of employees/transactions can still produce a material AGGREGATE likelihood.",
      related: ["FAIR model & the Swiss cheese model"]
    },
    {
      name: "FAIR model & the Swiss cheese model",
      def: "FAIR (Factor Analysis of Information Risk): (1) determine risk factors and interrelations, (2) measure each factor, (3) computationally combine them (often via Monte Carlo) into a loss distribution.",
      example: "Swiss cheese model: each control layer has holes; bad outcomes happen only when holes in multiple layers momentarily align. Defense: keep control failure rates uncorrelated and maintain compensating controls.",
      related: []
    },
    {
      name: "Loss distribution approach (LDA)",
      def: "Splits losses into frequency (discrete, usually Poisson — one parameter \\(\\lambda\\) = both mean and variance) and severity (continuous, fat-tailed, usually lognormal), modeled independently then convoluted (often via Monte Carlo) into an aggregate loss distribution.",
      example: "The 99.9th percentile of that aggregate distribution is the stand-alone capital requirement under LDA.",
      pitfall: "Units of measure (UoM) should be homogeneous (similar loss drivers) but homogeneity trades off against data volume — finer UoMs mean less data per bucket. Copulas aggregate across UoMs, capturing tail dependence.",
      related: [{ r: 62, label: "R62 — the SMA, LDA's non-model-based successor" }],
      memory: "Frequency (Poisson) × Severity (lognormal), convoluted → 99.9th percentile = capital."
    },
    {
      name: "Extreme value theory (EVT) for operational risk",
      def: "Block maxima (Fisher-Tippett): max loss per equally-spaced period per UoM. Peaks-over-threshold (POT): losses above a high threshold, fit with the generalized Pareto distribution (GPD).",
      pitfall: "EVT only really works when there's ONE dominant underlying cause generating losses — a poor fit for operational risk's genuinely HETEROGENEOUS loss drivers, which limits its practical usefulness here. Don't assume EVT (so powerful in Book 1's market risk) transfers cleanly to op risk.",
      related: [{ r: 3, label: "R3 — EVT's full market-risk treatment, contrasted with its limited op-risk fit" }]
    },
    {
      name: "Combining internal and external loss data",
      def: "Scaling (size/inflation adjustments), cut-off mix (blend in external data above a threshold where internal data thins out), filtering (explicit inclusion/exclusion rules to prevent manipulation).",
      related: []
    },
    {
      name: "Operational resilience — the seven steps",
      def: "(1) Determine important business services (IBSs). (2) Establish impact tolerances for each IBS. (3) Map IBSs and the resources needed to deliver them. (4) Design harsh-but-realistic scenarios to test vulnerabilities. (5) If tolerances are breached, review lessons learned and remediate. (6) Ensure communication plans are ready to execute. (7) Perform an annual board-approved self-assessment.",
      example: "Business impact analysis (BIA) underpins step 2. Single points of failure (SPOFs) — e.g., a key employee with undocumented specialist knowledge, or a supplier with no substitute — are treated as resilience KRIs.",
      pitfall: "Resilience is NOT the same as business continuity management (BCM). BCM covers every business process's continuity/recovery broadly; resilience is narrower — it applies specifically to 'important business services' under non-extreme conditions and impact tolerances. 'Intolerable impacts' that breach tolerances fall OUTSIDE resilience's scope by definition.",
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
      { what: "KRI vs KPI vs KCI", how: "KRI tracks EXPOSURE level (how risky are we becoming); KPI tracks OPERATIONAL effectiveness (how well do we run); KCI tracks CONTROL effectiveness (how well do our controls work) — three distinct questions." },
      { what: "Fault tree analysis vs Swiss cheese model", how: "FTA assumes independence and multiplies probabilities (often understating true risk); Swiss cheese explicitly models how correlated/aligned holes across layers create the failure — a more realistic mental model of the same joint-failure problem." },
      { what: "Resilience vs BCM", how: "BCM is broad (all processes); resilience is narrow (specifically 'important business services' within tolerance) — intolerable impacts fall outside resilience's defined scope." }
    ]
  },

  misconceptions: [
    { wrong: "\"Fault tree analysis, by multiplying independent probabilities, gives an accurate estimate of joint control failure.\"", right: "Real controls are RARELY fully independent (often designed together) — naive multiplication can significantly understate true joint failure probability. Conditional (Bayesian) probabilities are more realistic." },
    { wrong: "\"Backtesting RCSAs tends to reveal that likelihood was overestimated and severity underestimated.\"", right: "The opposite directional bias is typical: RCSAs tend to UNDERESTIMATE likelihood and OVERESTIMATE severity when backtested against actual incidents." },
    { wrong: "\"Extreme value theory works as well for operational risk as it does for market risk.\"", right: "EVT requires one dominant underlying cause generating losses — op risk's heterogeneous loss drivers make it a poor fit, limiting its practical usefulness compared to market risk (R3)." },
    { wrong: "\"Operational resilience and business continuity management (BCM) are the same thing.\"", right: "BCM is broader (all business processes); resilience is narrower, focused specifically on 'important business services' and impact tolerances — intolerable impacts fall outside resilience's defined scope." },
    { wrong: "\"A heatmap's likelihood and impact scores should be multiplied together for a precise risk score.\"", right: "Heatmap categories (remote/unlikely/possible/likely/highly likely × low/medium/high/very high/extreme) are QUALITATIVE labels combined into color zones (green/yellow/amber/red) — not numbers meant for multiplication." }
  ],

  highYield: [
    { stars: 5, what: "LDA: frequency (Poisson) × severity (lognormal) convoluted to the 99.9th percentile for capital.", why: "The core quantitative model of operational risk — direct ancestor of the SMA capital formula in R62." },
    { stars: 4, what: "Fault tree analysis mechanics and the independence-assumption trap.", why: "A calculation-based question type with a clear conceptual pitfall (real controls aren't independent)." },
    { stars: 4, what: "Boundary events: credit-linked stays credit (no double-count), market-linked stays operational.", why: "A precise, frequently tested classification rule." },
    { stars: 3, what: "KRI vs KPI vs KCI definitions and examples.", why: "A clean three-way distinction, good matching-question material." },
    { stars: 3, what: "The seven-step operational resilience process, and resilience vs. BCM.", why: "Connects R40's vocabulary to concrete mechanics — a valuable synthesis area." },
    { stars: 2, what: "EVT's limited fit for op risk (needs one dominant cause).", why: "A useful contrast with Book 1's EVT treatment." }
  ],

  recall: [
    { q: "A bank's fault tree analysis multiplies five independent control-failure probabilities to estimate a 0.0001485% chance of a successful phishing attack. Why might this significantly understate the true risk?", a: "The analysis assumes all five controls (firewall, employee vigilance, detection systems, etc.) fail independently. In reality, controls are often designed together and share common vulnerabilities or blind spots (e.g., the same IT team designs both the firewall and detection system) — true joint failure probability, accounting for this correlation, is likely higher than the naive multiplication suggests." },
    { q: "Under the loss distribution approach, why are frequency and severity modeled separately before being combined?", a: "Frequency (how often losses occur) and severity (how large each loss is) are driven by different underlying processes and have different statistical shapes — frequency is discrete and typically well-modeled by a single-parameter Poisson distribution, while severity is continuous and fat-tailed, typically lognormal. Modeling them separately, then convoluting (e.g., via Monte Carlo), captures the true aggregate loss distribution more accurately than trying to fit one distribution to the combined data." },
    { q: "A rogue employee's fraud causes a credit loss when a mismarked position leads to an uncollectible receivable. Is this loss captured in operational risk capital, credit risk capital, both, or neither?", a: "This is a boundary event tied to CREDIT risk — it's treated as credit risk (already captured in credit RWA) and is NOT double-counted in operational risk capital, even though the root cause (mismarking) is operational in nature." },
    { q: "Why does the reading caution that extreme value theory (EVT) is less useful for operational risk than for market risk?", a: "EVT's theoretical justification works best when there's ONE dominant underlying cause generating extreme losses (e.g., market crashes driven by a shared volatility regime). Operational risk losses come from genuinely heterogeneous causes (fraud, system failure, natural disaster, human error) with no single unifying generative process, undermining EVT's core assumption and limiting its practical fit." }
  ],

  hooks: [
    { title: "Two questions, one number", text: "LDA asks 'how often' (frequency) and 'how bad' (severity) as two SEPARATE questions, then mashes the answers together (convolution) into one aggregate distribution — and the 99.9th percentile of THAT becomes your capital number." },
    { title: "Swiss cheese, not fault tree, for realism", text: "Fault tree analysis pretends the cheese slices' holes are randomly placed (independent). Swiss cheese model admits the holes might actually LINE UP (correlated) — a more honest picture of how failures cascade." },
    { title: "The narrow slice of resilience", text: "BCM is the whole pie (all business processes). Resilience is one slice — important business services, within tolerance. Breach the tolerance, and you've fallen off resilience's plate entirely." }
  ],

  summary: `<p><strong>Loss data</strong>: ≥10yr, €20,000 threshold, 4 dates (occurrence→discovery→reporting→accounting); boundary events tied to credit stay credit, tied to market stay operational. <strong>RCSA</strong> (inherent vs residual risk, qualitative, annual) tends to UNDERESTIMATE likelihood, OVERESTIMATE severity when backtested. <strong>KRI</strong> (exposure) / <strong>KPI</strong> (performance) / <strong>KCI</strong> (control effectiveness). <strong>Fault tree analysis</strong>: multiplies independent probabilities — unrealistic since real controls correlate; <strong>Swiss cheese model</strong> captures this better. <strong>FAIR model</strong>: factors → measure → Monte Carlo combine. <strong>LDA</strong>: frequency (Poisson) × severity (lognormal), convoluted, 99.9th percentile = capital; UoM homogeneity trades off data volume; copulas capture cross-UoM tail dependence. <strong>EVT</strong> poorly fits op risk's heterogeneous causes. <strong>Combining loss data</strong>: scaling, cut-off mix, filtering. <strong>Resilience</strong> (7 steps: IBS → tolerances → mapping → scenarios → remediate → communicate → annual self-assessment) is narrower than BCM.</p>`
});
