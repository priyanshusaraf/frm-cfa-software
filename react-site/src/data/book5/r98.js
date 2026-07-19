export default ({
  book: 5,
  reading: 98,
  session: "Current Issues in Financial Markets",
  title: "Climate-Related Financial Risks — Measurement Methodologies",
  tagline: "How do you put a number on a risk that hasn't happened yet, is missing its own data, and might take 30 years to arrive?",

  teaches: "This reading is the 'now measure it' sequel to R97 (which mapped how climate risk transmits into credit/market/liquidity/operational risk). Here the Basel Committee's 2021 report asks: given those transmission channels, what data do banks and supervisors actually need, what modeling approaches exist today (IAMs, CGE, DSGE, ABMs, stress testing), what broad measurement approaches are banks using (ratings/scores, scenario analysis, climate VaR, natural capital analysis), and — critically — where does the whole measurement enterprise still fall short (data gaps, time-horizon mismatches, comparability across jurisdictions).",

  why: "Every other climate reading (R97, and the disclosure/scenario material elsewhere) assumes measurement is possible. This reading is the reality check: climate risk measurement is still in its infancy, existing models systematically understate tail/extreme-event severity, and there is no common accounting standard for climate data. For the exam, this reading is a taxonomy-heavy one — expect matching questions (top-down vs bottom-up, gross vs net exposure, IAM vs ABM vs CGE) and 'which of the following is NOT a challenge' questions.",

  intuition: "Think of climate risk measurement as building a bridge between two things that don't naturally talk to each other: (1) physical/climate science (temperature paths, flood probabilities, carbon budgets) and (2) financial risk parameters (PD, LGD, EAD, VaR). Every methodology in this reading is an attempt at that translation, and every one of them leaks somewhere — either the physical science is uncertain (data gaps, model-based uncertainty), the translation step is crude (top-down averages, gross vs net), or the time horizon (up to 30 years) exceeds anything financial models were built to handle. The five Basel findings essentially say: we're translating transition risk into credit risk reasonably well; everything else (physical risk, non-credit risk categories, long-horizon nonstandard issues) is still underdeveloped.",

  eli5: "<p>Imagine your town's flood-insurance office is trying to write policies for houses that won't be built for another 30 years, using a weather forecast that only reliably works about a week out, and a rulebook nobody has agreed on yet — some inspectors measure flood risk by street address, others just say \"that whole zip code is risky,\" and none of them can agree on what counts as \"flood damage\" in the first place. That's the position banks and their supervisors are in with climate risk: they're trying to price and reserve against a decades-out hazard using science that's uncertain, data that's patchy or inconsistent across providers, and models (temperature-and-economy simulators, agent simulations, stress tests) that were never built for a 30-year horizon in the first place. In finance terms: the \"flood-insurance office\" is a bank's risk function, the \"rulebook nobody agreed on\" is the missing common accounting standard for climate data, and the mismatch between a one-week forecast and a 30-year policy is the time-horizon gap between climate science and 2-5 year capital planning.</p>",

  thinkLike: "<p>A risk manager reading this Basel report does not treat it as a finished measurement toolkit — they treat it as an honest progress report with a clear frontier: transition risk mapped into credit risk is the most-developed corner of the map, and everything else (physical risk, other risk types, anything beyond a 5-year horizon) is still being sketched in. So the practitioner's first move on any climate exposure is to ask four questions in sequence, mirroring the reading's own risk-assessment framework: What is the risk driver and how does it transmit (identification, R97's job)? Where and how much am I exposed (mapping/measurement — pick a granularity and a top-down-or-bottom-up approach that fits the decision, not just the data you happen to have)? What number does that translate to (quantification — and be honest that the model, whichever one you pick, was very likely built assuming climate loosely resembles the historical past, which it does not)? And what do I do about it (management/mitigation, tracked separately from the raw gross exposure so the mitigation itself doesn't quietly disappear from view)? On the exam, GARP tests this discipline directly: it rewards you for keeping gross exposure and net exposure as two distinct numbers, for matching granularity to the decision rather than defaulting to 'more detail is always better,' and for correctly locating which of the many stated weaknesses (IAMs understating tail risk, no common accounting standard, supervisory reports lacking granularity) belongs to which tool — conflating any two of these named limitations is the most common trap in this reading's question bank.</p>",

  breakdown: [
    {
      title: "The five Basel Committee findings (2021 report)",
      points: [
        "Forward-looking, granular measurement methodologies are needed because climate-related financial risk has unique features that traditional financial risk methods (built on historical loss data) were not designed to capture.",
        "Banks and supervisors have concentrated their efforts on mapping near-term transition risk drivers into portfolio and counterparty exposures — this is the most mature part of the measurement toolkit so far.",
        "Of the financial risk categories, credit risk is the one banks and supervisors have most successfully translated climate exposures into — liquidity, market, and operational risk lag behind.",
        "The pace of translating climate-related risk into quantifiable financial risk has been increasing, i.e., the field is moving, not static.",
        "Future work is still needed to close measurement gaps (data, risk classification methods) and to build methodologies for nonstandard, long-term climate issues that don't fit the 2-5 year capital-planning mold."
      ]
    },
    {
      title: "Three areas of uncertainty in climate risk measurement",
      points: [
        "Intrinsic uncertainty in physical and transition risk driver projections — the underlying climate science itself has a range of possible outcomes.",
        "Data gaps that create measurement uncertainty — even where the science is settled, banks often lack the granular data to apply it to their specific book.",
        "Model-based uncertainty — every model (IAM, CGE, ABM, etc.) is a simplification of a very complex climate-economy system, so the model itself is a source of error independent of the data feeding it."
      ]
    },
    {
      title: "The four-stage risk assessment framework",
      points: [
        "Risk identification — pinpoint the risk drivers and transmission channels (this is R97's job, not R98's).",
        "Exposure mapping and measurement — build the metrics and indicators that show where and how much a bank is exposed (this reading's main focus, Module 100.2).",
        "Risk quantification — apply economic models and forward-looking assessment approaches to put a number on the exposure (this reading's other main focus, Module 100.2-100.3).",
        "Risk management — decide how to manage and mitigate the exposures once they're identified, mapped, and quantified (covered elsewhere in the curriculum)."
      ]
    },
    {
      title: "Modeling approaches for translating climate drivers into economic/financial outcomes",
      points: [
        "Integrated Assessment Models (IAMs) — combine economic growth, energy, and climate modeling to link emissions and transition drivers to economic growth; explicitly have NOT captured extreme-weather economic impacts and tend to understate future severity.",
        "Sensitivity analysis — shows the volatility of projected losses arising from tail-event probabilities, but like IAMs, also tends to underestimate tail/extreme risk.",
        "Input-output models — estimate the economic impact of a policy shift on a specific region or industry by tracing how spending in one sector ripples through others.",
        "Computable general equilibrium (CGE) models — test policy experiments across a system of interacting agents and sectors, but are limited by the complexity of representing all those interactions realistically.",
        "Dynamic stochastic general equilibrium (DSGE) models — manage that complexity with a formal stochastic framework, at high computational cost.",
        "Overlapping generations (OLG) models — transparently model how an economy evolves over the long term as different generations of agents enter and exit, useful for long-horizon macro questions.",
        "Agent-based models (ABMs) — simulate individual and institutional interactions directly; handle complexity and uncertainty well, but are computation- and data-hungry, and their internal mechanisms are described as 'somewhat unclear' — an opacity problem for regulatory use.",
        "Stress testing — links portfolio-level risk directly to the outputs of these underlying modeling approaches."
      ]
    },
    {
      title: "Broad risk measurement approaches banks/supervisors actually report with",
      points: [
        "Climate risk ratings/scores — grade exposures (countries, companies, portfolios, assets) using qualitative and/or quantitative criteria; can be built in-house or bought from a third party — it is NOT an exclusively external tool.",
        "Scenario analysis — projects impacts under physical/transition scenarios and links them to financial risk; contains stress testing (tests resiliency to shocks; macroprudential = system-wide, microprudential = single-entity solvency) and sensitivity analysis (isolates the impact of one variable, useful for transition/policy questions) as forms within it, not as separate parallel categories.",
        "Natural capital analysis — a third-party approach assessing how the degradation of finite natural resources (water, soil, biodiversity) affects an institution at the portfolio level.",
        "Climate VaR — a third-party approach applying the standard Value-at-Risk framework to the climate-related impact on a bank's balance sheet."
      ]
    },
    {
      title: "Three data categories that feed climate risk quantification",
      points: [
        "Physical/transition risk driver data translated into economic risk factors — sourced from commercial providers, academic organizations, and government agencies (NOT retail brokerage firms).",
        "Data linking climate-adjusted economic risk factors to specific exposures (vulnerability data) — geospatial data for physical risk, sector/carbon-sensitivity data for transition risk.",
        "Financial exposure data that translates economic risk into financial risk — valuations, cash flows, portfolio composition, and funding behavior (for liquidity impact)."
      ]
    },
    {
      title: "Three co-equal challenge areas in climate risk model design",
      points: [
        "Capturing economic effects — models struggle with nonlinearity, alternative scenario paths, extreme weather/future disruption, and coarse damage functions; historical data is a poor predictor of a future that looks structurally different from the past.",
        "Long-term horizon assessments — projections up to 30 years out become progressively more uncertain the further they extend, and future portfolio composition itself is uncertain over that horizon.",
        "Operational assessment challenges — implementing any of this requires real investment in IT/data infrastructure and interdisciplinary expertise (in-house risk staff plus outsourced climate-science expertise), a distinct barrier from the modeling challenge itself."
      ]
    }
  ],

  formulas: [
    {
      name: "Gross exposure vs. net exposure",
      math: "\\text{Net exposure} = \\text{Gross exposure} - (\\text{insurance benefit} + \\text{derivatives (hedging) benefit})",
      note: "Gross exposure is the climate risk impact BEFORE any mitigation is applied — it should still be modeled and disclosed separately even when mitigants exist, because mitigants can lapse, fail, or change over time. Net exposure nets out insurance and derivatives hedging benefits. Both numbers matter; reporting only net exposure hides fragility if the mitigation disappears.",
      plain: "This formula says: what you're actually left holding after insurance and hedges pay out (net exposure) equals the raw, unmitigated dollar impact of the climate risk (gross exposure) minus whatever those protections are expected to cover.",
      derivation: "<p>Start from the raw estimate of climate-related financial impact — this is \\(\\text{gross exposure}\\), computed with no credit given to any protective arrangement. A bank then identifies its proactive risk-mitigation tools and their expected payouts:</p><ul><li>\\(\\text{Insurance benefit}\\) — the expected claim payout from an insurance policy covering the climate-driven loss (e.g., flood or storm coverage on collateral).</li><li>\\(\\text{Derivatives benefit}\\) — the expected payoff from a hedge, such as a weather derivative or catastrophe swap, that offsets the loss.</li></ul><p>Subtracting both from gross exposure gives the residual, or \\(\\text{net exposure}\\):</p>\\[\\text{Net exposure} = \\text{Gross exposure} - \\text{Insurance benefit} - \\text{Derivatives benefit}\\]<p>Worked example from the module quiz: gross exposure \\(=\\$35\\,\\text{million}\\), insurance benefit \\(=\\$15\\,\\text{million}\\), derivatives benefit \\(=\\$3\\,\\text{million}\\). Net exposure \\(=\\$35\\text{mm} - \\$15\\text{mm} - \\$3\\text{mm} = \\$17\\,\\text{million}\\). But if the question asks for GROSS exposure specifically, the mitigation numbers are a distractor — the answer is still \\(\\$35\\,\\text{million}\\), because gross exposure by definition never subtracts mitigation.</p>"
    }
  ],

  concepts: [
    {
      name: "Five Basel Committee findings (2021 report)",
      def: "(1) Forward-looking, granular methodologies are needed because climate risk is unlike traditional financial risk; (2) banks/supervisors have focused on mapping near-term transition risk into portfolio/counterparty exposures; (3) the primary financial risk category translated so far is credit risk; (4) the pace of translation into quantifiable risk has increased; (5) future work is needed on measurement gaps and nonstandard, long-term issues.",
      intuition: "Read this as a progress report: transition risk → credit risk is the frontier that's furthest along. Everything else (physical risk, other risk categories, long-horizon issues) is behind.",
      example: "A bank that has built a granular carbon-intensity-based credit scoring overlay for its corporate loan book is doing exactly what finding #2/#3 describe — but if it has no equivalent framework for physical risk to its mortgage book, that gap is exactly what finding #5 flags.",
      counter: "It would be wrong to assume progress on transition-risk-to-credit-risk means climate risk measurement generally is mature — the report explicitly says other risk categories (liquidity, operational) and physical risk lag far behind.",
      pitfall: "Exam trap: the five findings are about DIRECTION of progress (what's been done, what's next), not a ranking of risk severity. Physical risk isn't 'less important' — it's just methodologically less developed.",
      related: ["Three uncertainty areas", "Transition vs physical risk measurement"],
      memory: "Findings 2-3-4 are basically 'transition risk → credit risk, and we're getting faster at it'; finding 5 is 'but everything else is still unsolved.'"
    },
    {
      name: "Three areas of uncertainty",
      def: "(1) Intrinsic uncertainty in physical/transition risk driver projections; (2) data gaps creating measurement uncertainty; (3) model-based uncertainty.",
      intuition: "Three independent reasons a climate risk number could be wrong: the underlying science itself is uncertain, you don't have the data you need even if the science were certain, and your model of how climate maps to financial outcomes is itself a simplification.",
      example: "Even with perfect emissions data (removing #2), you still don't know how severe a 2°C world's flood frequency will be in your specific region (#1), and even with a good flood forecast, your damage function mapping flood depth to mortgage default probability is a crude approximation (#3).",
      counter: "These aren't the same as garden-variety financial model risk — the time horizons (decades) and lack of historical precedent make climate model uncertainty structurally worse than, say, credit risk model uncertainty calibrated on decades of loss data.",
      pitfall: "Don't collapse all three into 'data problems' — model-based uncertainty persists even with perfect data, because the model itself simplifies complex climate-economy interactions.",
      related: ["Sources of uncertainty", "Damage functions"],
      memory: "Science uncertain, data missing, model crude — three separate leaks in the same pipe."
    },
    {
      name: "Risk assessment framework: four components",
      def: "(1) Risk identification (drivers and transmission channels — the subject of R97); (2) exposure mapping and measurement (metrics/indicators); (3) risk quantification (economic models, forward-looking assessment); (4) risk management (mitigation).",
      intuition: "This is the pipeline: first figure out WHAT could hurt you and HOW (R97), then figure out WHERE you're exposed and by HOW MUCH, then put a NUMBER on it, then decide what to DO about it.",
      example: "A bank first identifies that transition risk affects its oil & gas loan book (identification), then maps which specific loans/counterparties are carbon-intensive (exposure mapping), then runs a scenario analysis estimating credit losses under a disorderly transition (quantification), then adjusts underwriting standards or exits the sector (management).",
      counter: null,
      pitfall: "This reading (R98) is almost entirely about stages 2 and 3 (mapping/measurement and quantification) — stage 1 was R97's job, stage 4 is covered elsewhere. Don't confuse which reading owns which stage on the exam.",
      related: ["Five Basel findings"],
      memory: "Identify → Map → Quantify → Manage."
    },
    {
      name: "Transition risk vs. physical risk measurement",
      def: "Transition risk arises from the shift from a high-carbon to low-carbon economy. Physical risk drivers/hazards apply to financial exposures through damage functions, which are driven by time horizon, hazard severity, location, and sector. Though often assessed separately, they have dependencies — rising physical risk can create policy pressure that raises transition risk.",
      intuition: "A damage function is the translator: 'this much flooding, in this location, in this sector, over this time horizon → this much financial damage.' It's the physical-risk equivalent of a PD model.",
      example: "If sea levels rise faster than expected (physical risk materializing), governments may accelerate carbon regulation in response (transition risk rising) — the two aren't independent.",
      counter: "Don't assume assessing them 'in tandem' means combining them into one number — the reading says dependencies 'may merit' joint assessment, not that separate assessment is wrong.",
      pitfall: "A classic exam wrong-answer pattern: implying physical and transition risk are always independent, or always must be modeled jointly. The correct nuance is 'usually separate, but interdependencies matter.'",
      related: ["Damage function", "Five Basel findings"],
      memory: "Physical risk arrives through nature; transition risk arrives through policy — but nature can trigger policy."
    },
    {
      name: "Exposure granularity (and the granularity trade-off)",
      def: "The level of detail at which exposures are assessed — individual household/corporate/counterparty level (high granularity) vs. aggregated sector/portfolio level (low granularity). Driven by data availability, risk driver type, computational complexity, and the decision the assessment supports.",
      intuition: "More granular = more accurate for a specific decision (like underwriting one loan) but more expensive and data-hungry. Less granular = cheaper and more robust to sporadic data, but blunt — good for strategic/portfolio-level decisions, useless for pricing one deal.",
      example: "A bank pricing a single mortgage in a flood zone needs high-granularity, property-level flood data. A bank deciding whether to reduce overall oil & gas sector exposure by 10% can use low-granularity, sector-average carbon intensity data.",
      counter: "High granularity isn't strictly 'better' — the reading explicitly says higher granularity models 'suffer from input data quality' and are more complex; the right granularity depends on the use case.",
      pitfall: "Module quiz trap: 'strategic planning purposes' → LOW granularity, LOW complexity is the correct match (not high granularity). Don't default to 'more detail is always better.'",
      related: ["Top-down vs bottom-up", "Heterogeneities"],
      memory: "Underwriting = zoom in (granular). Strategy = zoom out (aggregate)."
    },
    {
      name: "Top-down vs. bottom-up approaches",
      def: "Top-down: measure risk at an aggregated level (e.g., industry/sector averages) then apply down to individual exposures, assuming within-sector differences are minimal. Bottom-up: measure risk at the individual loan/counterparty level and aggregate up to portfolio/sector views; challenge is capturing correlations among exposures.",
      intuition: "Top-down is 'assume everyone in this sector looks alike.' Bottom-up is 'assess everyone individually, then add it up' — more accurate per-exposure, but you have to worry about how those exposures move together (correlation), which top-down implicitly ignores.",
      example: "Top-down: applying an 'oil & gas sector' transition risk score to every oil & gas loan uniformly. Bottom-up: scoring each individual oil & gas borrower's specific transition exposure and summing.",
      counter: "Bottom-up sounds obviously superior but isn't free — the correlation-estimation challenge it introduces is nontrivial, and it's far more data- and computation-intensive.",
      pitfall: "This maps directly onto the granularity trade-off (top-down ≈ low granularity, bottom-up ≈ high granularity) — expect the exam to test both framings of the same idea.",
      related: ["Exposure granularity"],
      memory: "Top-down: average, then apply. Bottom-up: assess each, then add — and mind the correlations."
    },
    {
      name: "Gross exposure vs. net exposure",
      def: "Gross exposure = climate risk impact with no mitigation applied. Net exposure = climate risk impact after subtracting proactive mitigation (insurance, hedging/derivatives). Both should ideally be modeled — separately.",
      intuition: "Gross tells you the worst case / raw magnitude; net tells you what you're actually exposed to today. Modeling them separately matters because mitigation strategies 'may change, lapse, or fail to function as designed' — net exposure alone hides that fragility.",
      example: "See the worked module quiz: $35mm gross risk, minus $15mm insurance benefit, minus $3mm derivatives benefit → gross exposure is still $35 million (the question asks for GROSS, which ignores mitigation entirely); net would be $17 million.",
      counter: "A common trap is computing net exposure when the question asks for gross, or vice versa — read the question stem carefully for which one is being asked.",
      pitfall: "MODULE QUIZ 100.1 Q1 asks for GROSS exposure given $35mm total risk, $15mm insurance, $3mm derivatives — the answer is D ($35 million), because gross exposure by definition ignores mitigation benefits entirely.",
      related: ["Risk mitigation and risk reduction"],
      memory: "Gross = before umbrella. Net = after umbrella actually catches the rain."
    },
    {
      name: "Heterogeneities",
      def: "Because each bank's portfolio and each client/counterparty's exposure differs (geography, technology, political environment, sector, location), heterogeneity affects which measurement approach is appropriate. Climate risk is fairly similar within a sector even if individual clients differ; policy/regulation can differ by client.",
      intuition: "No one-size-fits-all measurement approach exists because the underlying risk itself is heterogeneous across geography and counterparty — this is WHY top-down/bottom-up and granularity choices matter so much.",
      example: null,
      counter: null,
      pitfall: "Don't confuse 'heterogeneity' (why methodology choice varies) with 'uncertainty' (why any given estimate might be wrong) — they're related but distinct considerations from LO 100.a's list.",
      related: ["Exposure granularity", "Sources of uncertainty"],
      memory: "Different banks, different books, different geographies — no universal ruler."
    },
    {
      name: "Three data categories for climate-related financial risk",
      def: "(1) Physical/transition risk driver data translated into economic risk factors (from commercial/academic/government sources); (2) data linking climate-adjusted economic risk factors to exposures (vulnerability data — geospatial for physical, sector/carbon sensitivity for transition); (3) financial exposure data to translate economic risk into financial risk (valuations, cash flows, portfolio composition, funding behavior for liquidity impact).",
      intuition: "This is a three-stage data pipeline mirroring the four-stage framework: raw climate data → exposure/vulnerability data → financial impact data. Each stage requires progressively more bank-specific, proprietary information.",
      example: "Stage 1: a flood-hazard map from a government agency. Stage 2: overlaying that map onto the geospatial locations of a bank's mortgage collateral. Stage 3: translating flood-damaged collateral into expected loss and liquidity impact.",
      counter: null,
      pitfall: "MODULE QUIZ 100.2 Q1: sources for stage-1 driver data include government agencies, academic organizations, and commercial third parties — NOT retail brokerage firms (the correct 'except' answer is B).",
      related: ["Risk assessment framework", "Climate risk classification"],
      memory: "Raw climate data → who's vulnerable → what it costs in dollars."
    },
    {
      name: "Climate risk classification scheme drivers",
      def: "Geographic location is the primary driver of physical risk differentiation (proximity/vulnerability to hazards). Jurisdiction is the primary driver of transition risk differentiation (laws, regulations, energy grids, markets). Economic sector is another differentiating factor for both.",
      intuition: "Physical risk is about WHERE you are; transition risk is about WHOSE RULES you live under. Sector matters for both because emissions/vulnerability cluster by industry even though individual firms within a sector differ.",
      example: "A property in a Gulf Coast flood zone: physical risk driven by geography. A coal-fired utility in a jurisdiction about to impose a carbon tax: transition risk driven by jurisdiction/policy.",
      counter: null,
      pitfall: "Exam trap: swapping the primary driver — geography is NOT the primary driver of transition risk, and jurisdiction is NOT the primary driver of physical risk. Keep them paired correctly.",
      related: ["Transition vs physical risk measurement"],
      memory: "Physical risk = geography. Transition risk = jurisdiction."
    },
    {
      name: "Modeling approaches (IAM, CGE, DSGE, OLG, ABM, input-output, sensitivity analysis)",
      def: "Integrated Assessment Models (IAMs) combine economic growth, energy, and climate modeling to link emissions/transition drivers to economic growth, but understate extreme-weather impacts and future severity. Sensitivity analysis shows volatility of projected losses from tail-event probabilities but also underestimates tail risk. Input-output models estimate economic impact of policy shifts on a region/industry. Computable general equilibrium (CGE) models test policy experiments with complex agent/sector interactions but are limited by complexity. Dynamic stochastic general equilibrium (DSGE) models manage complexity at high computational cost. Overlapping generation (OLG) models transparently model long-term macro evolution. Agent-based models (ABMs) simulate individual/institutional interactions and handle complexity/uncertainty well, but are computation- and data-hungry with unclear internal mechanisms. Stress testing links portfolio risk to these modeling approaches.",
      intuition: "Each model is a different trade-off between realism, transparency, and computational tractability. None of them handle extreme/tail climate events well — that's the recurring weakness across IAMs and sensitivity analysis specifically.",
      example: "A central bank wanting a transparent, long-horizon view of how an economy evolves under a carbon tax over 40 years might favor an OLG model; a modeler wanting to capture emergent, hard-to-predict interactions between firms and consumers reacting to climate policy might use an ABM instead.",
      counter: "ABMs being 'highly flexible' doesn't mean they're the best choice universally — their opacity ('underlying mechanisms... somewhat unclear') is a real drawback for regulatory use where explainability matters.",
      pitfall: "The recurring exam trap: IAMs 'have NOT captured extreme weather economic impacts' and 'tend to understate severity' — don't assume IAMs are comprehensive just because they're described first/most prominently.",
      related: ["Climate risk ratings/scores", "Scenario analysis"],
      memory: "IAM = growth+energy+climate combo (weak on extremes). ABM = simulate the agents (strong on complexity, weak on transparency). OLG = long-run transparency. CGE/DSGE = policy experiments at a complexity cost."
    },
    {
      name: "Broad risk measurement approaches (ratings/scores, scenario analysis, natural capital analysis, climate VaR)",
      def: "Climate risk ratings/scores grade exposures (countries, companies, portfolios, assets) using qualitative/quantitative criteria. Scenario analysis identifies projected impacts via physical/transition scenarios, links them to financial risk, assesses sensitivities, and extrapolates to aggregate loss/exposure measures — includes stress testing (resiliency to shocks; macroprudential = system-wide, microprudential = entity solvency) and sensitivity analysis (impact of one variable, useful for transition/policy). Natural capital analysis (third-party) assesses how degradation of finite natural resources impacts an institution at the portfolio level. Climate VaR (third-party) applies the VaR framework to climate impacts on a balance sheet.",
      intuition: "These are the 'output layer' approaches banks actually report with, built on top of the underlying models (IAM/ABM/etc.) from the previous concept.",
      example: "A traffic-light climate risk score (red = high exposure, green = low) is a ratings/scores approach; a bank running its balance sheet through an NGFS 'disorderly transition' scenario is doing scenario analysis.",
      counter: "Stress testing and sensitivity analysis are described as forms/tools WITHIN scenario analysis, not fully separate categories — a common point of confusion.",
      pitfall: "MODULE QUIZ 100.2 Q2: 'Stress testing is a form of scenario analysis' is the correct (most accurate) statement — ratings/scores are NOT necessarily an external/third-party-only approach (banks do them in-house too), and climate VaR is explicitly a real, applied framework (not inapplicable).",
      related: ["Modeling approaches", "Scenario dimensions"],
      memory: "Ratings/scores = grade it. Scenario analysis = story-test it (stress test + sensitivity test inside). Natural capital = nature's balance sheet. Climate VaR = climate's version of market VaR."
    },
    {
      name: "Two scenario dimensions and time horizon challenge",
      def: "Climate scenarios vary along (1) climate outcome (temperature increase) and (2) transition type (gradual vs. abrupt emissions reduction and technology availability). Scenarios come from in-house models or external sources (NGFS, IEA), but drawbacks include lacking detailed physical-risk economic damages and lacking extreme-event impacts. Time horizons for climate risk (up to 30 years) vastly exceed typical capital planning (2-3 years) and strategic planning (3-5 years) horizons. Balance sheets can be modeled as static (illustrates current exposure, less reliable long-term) or dynamic (captures strategic adjustments).",
      intuition: "Traditional stress testing horizons are years; climate horizons are decades. This mismatch is why climate scenario analysis needs its own toolkit rather than reusing macro stress-test infrastructure directly.",
      example: "NGFS 'Net Zero 2050' vs. 'Delayed Transition' scenarios differ on both dimensions — final temperature outcome and how abrupt the emissions path is.",
      counter: null,
      pitfall: "Don't conflate macro stress testing (2-5 year financial statement focus, capital-need estimation) with climate scenario analysis (specific exposures, longer/variable horizons, strategy/risk-profile focus) — the reading explicitly contrasts these.",
      related: ["Broad risk measurement approaches", "Long-term horizon assessments"],
      memory: "Two dials: how hot, how fast. And the clock runs to 2050, not 2028."
    },
    {
      name: "Bank-level exposure mapping categories",
      def: "Portfolio/sector exposures (physical vulnerability of collateral, carbon/emission intensity, energy efficiency distributions); transition risk metrics (financed emissions, greenness, alignment approaches measuring gap to climate-target-consistent portfolios, green vs. brown activities); physical risk (geographic concentration, hazard type/probability/severity, geospatial mapping); client/project ratings and scores (in-house or external, e.g. traffic-light red/green, complementing traditional credit scores).",
      intuition: "This is the bank's internal toolkit for turning the broad approaches above into loan-book-level actions — every loan or counterparty eventually gets tagged with some combination of these metrics.",
      example: "'Financed emissions' is literally the carbon footprint attributable to a bank's lending/investment book — a bank could report financed emissions the way it reports total assets.",
      counter: null,
      pitfall: "Sectors most at risk for transition are utilities, transportation, oil & gas, construction, metals/mining — a specific list worth memorizing since 'except' questions test it directly.",
      related: ["Supervisor-level methodologies"],
      memory: "Alignment = gap to target. Green vs. brown = which side of the ledger. Traffic light = red bad, green good."
    },
    {
      name: "Supervisor-level methodologies",
      def: "Transition risk: assessed via ad hoc surveys/regulatory information, sector-level view using carbon footprint/emission intensity/policy sensitivity indicators (real estate less analyzed here). Physical risk: assessed via publicly available data and commercial climate scores; indicators include flood maps, water stress near industrial facilities, population below elevation thresholds, agriculture % of GDP; can be done at counterparty/activity/sector/country granularity.",
      intuition: "Supervisors mirror bank-level approaches but operate one level up — assessing system-wide/jurisdiction-wide vulnerability rather than individual loan books.",
      example: "MODULE QUIZ 100.3 Q1: the sectors flagged from the 2020 bank outreach workshops as relevant for PHYSICAL risk are utilities, agriculture, real estate, retail mortgages — NOT construction (construction is a TRANSITION risk sector). So the 'except' answer is C.",
      counter: null,
      pitfall: "Don't cross the wires between the transition-risk sector list (utilities, transportation, oil/gas, construction, metals/mining) and the physical-risk sector list (utilities, agriculture, real estate, retail mortgages) — utilities appears on BOTH, construction only on transition.",
      related: ["Bank-level exposure mapping categories"],
      memory: "Transition sectors = heavy emitters. Physical sectors = exposed-to-weather (ag, real estate, mortgages)."
    },
    {
      name: "2020 survey takeaways (banks vs. supervisors)",
      def: "Banks: climate risk not fully priced into markets yet; transition risk focus on high-carbon sectors; physical risk focus on utilities/agriculture/real estate/retail mortgages; data from public sources, rating agencies, internal client data; heatmaps useful; still in piloting stage. Supervisors: transition risk is HIGHER priority than physical risk; focus on both macro (banking system) and micro (individual bank) dimensions; mapping/measuring exposures is primary, with stress tests/scenario analysis also heavily used; third-party scenarios most used currently, in-house planned for future; sectoral approach primary for transition risk (emissions/intensity as indicator); aggregate climate risk indicator primary for physical risk (storms/floods/droughts, mostly at country/regional level); short horizons used for transition risk ONLY, long horizons used for BOTH transition and physical risk (5-30 years).",
      intuition: "The banks' survey and supervisors' survey are two independent 'key takeaways' lists — the exam can quote either one, so the time-horizon asymmetry (transition can be short OR long horizon; physical is long horizon only) is a specific, testable detail.",
      example: null,
      counter: null,
      pitfall: "MODULE QUIZ 100.3 Q2 asks which time horizon supervisors are LEAST likely to apply — the answer is C, 'short time horizons for physical risks only,' because physical risk is always assessed with LONG time horizons (short horizons are only used for transition risk).",
      related: ["Two scenario dimensions and time horizon challenge"],
      memory: "Supervisors: transition risk gets both short AND long horizons; physical risk only gets long horizons — physical risk never gets the 'short horizon only' treatment."
    },
    {
      name: "Gaps and challenges: risk differentiation and comparability",
      def: "Aggregate risk classifications (using public sector/country vulnerability data) are simple but may lack granularity for counterparty differentiation. Comparability obstacles: (1) jurisdiction comparability — no baseline cross-jurisdictional standard for methods/metrics; (2) aggregation perspectives — hard to model large multi-jurisdictional banks consistently since group-wide policy may conflict with location-specific climate risk.",
      intuition: "You want risk scores that are comparable ACROSS banks (so regulators/investors can benchmark), but the more comparable/standardized you make them, the less they capture bank- or counterparty-specific nuance — a direct echo of the granularity trade-off.",
      example: "A globally active bank's group-wide lending policy might treat all 'oil & gas' exposures the same, even though the transition-risk-relevant regulatory environment differs sharply between, say, the EU and a jurisdiction with no carbon policy.",
      counter: null,
      pitfall: "MODULE QUIZ 100.4 Q2 asks for the exception among comparability obstacles: 'undefined damage functions related to physical risks' is NOT listed as a comparability obstacle (it's a data/complexity challenge instead) — the true comparability obstacles are jurisdiction comparability, aggregation perspectives, and complexity/granularity needs.",
      related: ["Data availability limitations"],
      memory: "Comparability wants sameness; risk differentiation wants nuance — they pull in opposite directions."
    },
    {
      name: "Data availability limitations",
      def: "Transition/physical risk driver data can fall outside traditional financial data ranges, may be incomplete/insufficiently granular/infrequently updated. Third-party providers try to fill gaps but end users have limited insight into their data scrubbing methods, and comparability across providers is a challenge. Counterparties may provide proprietary data, but smaller counterparties tend to provide more QUALITATIVE than quantitative data, and banks may struggle to update data post-underwriting. Public information quality/quantity correlates with company size. No common accounting standards for climate data exist. Supervisory reports add standardized data but may lack needed granularity.",
      intuition: "Data problems compound at every link of the chain: the raw data is imperfect, the vendors filling gaps are opaque, the counterparties supplying proprietary data skew qualitative (especially smaller ones), and once a loan is underwritten the data often goes stale.",
      example: null,
      counter: null,
      pitfall: "MODULE QUIZ 100.4 Q1: the correct statement is B, 'supervisory reports often lack the granularity needed to assess climate risk' — the others are all FALSE per the text (no established accounting standards exist; banks often CANNOT easily get updated data post-underwriting; SMALLER counterparties provide more qualitative, not quantitative, data).",
      related: ["Gaps and challenges: risk differentiation and comparability"],
      memory: "Every step of the data chain leaks: raw data imperfect → vendors opaque → small counterparties give you words not numbers → data goes stale after underwriting."
    },
    {
      name: "Climate-related financial risk complexity: three challenge areas",
      def: "(1) Capturing economic effects — models struggle with nonlinearity, alternative scenarios, extreme weather/future disruption, and coarse damage functions; historical data is a poor predictor of the future. (2) Long-term horizon assessments — up to 30-year horizons make projections increasingly uncertain the further out they extend; future portfolio composition uncertainty needs addressing. (3) Operational assessment challenges — requires IT/data infrastructure investment and interdisciplinary (in-house + outsourced climate) expertise.",
      intuition: "This is the 'why is this so hard' summary: the economics are nonlinear and undocumented historically, the time horizon breaks normal capital-planning assumptions, and the operational lift (systems, talent) is its own separate barrier from the modeling challenge itself.",
      example: null,
      counter: null,
      pitfall: "Don't treat 'operational assessment challenges' as an afterthought — it's explicitly one of the three co-equal challenge areas, distinct from modeling/economic-effects challenges.",
      related: ["Sources of uncertainty", "Data availability limitations"],
      memory: "Economics too nonlinear, horizon too long, operations too underbuilt."
    }
  ],

  connections: {
    from: [
      { r: 97, why: "This reading directly continues R97's transmission-channel taxonomy (physical/transition risk drivers, micro/macro channels) by asking how those channels get measured and quantified." },
      { r: 63, why: "Concepts like gross vs. net exposure and time-horizon mismatches echo the ALM/liquidity risk measurement toolkit from Book 4, applied to a much longer and more uncertain horizon." }
    ],
    to: [
      { r: 99, why: "The next reading (Crypto Ecosystem) is a completely different emerging-risk topic, but shares this reading's theme of measuring a risk category where data, definitions, and models are still immature." }
    ],
    confused: [
      { what: "R97 vs. R98", how: "R97 covers WHICH channels transmit climate risk into financial risk categories (the 'what'); R98 (this reading) covers HOW banks and supervisors measure and quantify those channels (the 'how'). Check whether an exam stem is asking about a transmission mechanism (R97) or a measurement methodology/data source (R98)." }
    ]
  },

  misconceptions: [
    { wrong: "IAMs are comprehensive climate models that capture the full range of climate impacts.", right: "IAMs understate extreme weather impacts and future severity — this is an explicitly named weakness, not a minor caveat." },
    { wrong: "'Gross exposure' means exposure after some adjustments have already been applied.", right: "Gross exposure is specifically the PRE-mitigation figure; net exposure is the post-mitigation figure. A question giving insurance/hedge benefit numbers and asking for GROSS exposure wants those numbers ignored entirely." },
    { wrong: "Higher granularity is always the better modeling choice.", right: "For strategic planning purposes, LOW granularity and LOW complexity is actually the more appropriate (and correct exam answer) choice, not high granularity." },
    { wrong: "Stress testing is a separate, parallel category to scenario analysis.", right: "Stress testing is explicitly described as a FORM of scenario analysis, not a distinct category." },
    { wrong: "Climate risk ratings/scores are exclusively an external/third-party tool.", right: "Banks perform climate risk ratings/scoring in-house as well as relying on external providers." },
    { wrong: "Supervisors assess physical risk using short time horizons.", right: "Physical risk is assessed using ONLY long time horizons (5-30 years); short horizons apply to transition risk only." },
    { wrong: "Construction is one of the sectors banks flagged as most relevant for PHYSICAL risk.", right: "Construction is a transition-risk-relevant sector (high carbon footprint); the physical-risk sector list is utilities, agriculture, real estate, retail mortgages." },
    { wrong: "Common accounting standards for climate data exist, similar to established financial reporting standards.", right: "There is no established common accounting standard for climate data — don't assume standardization exists just because disclosure regimes are discussed elsewhere in the curriculum." },
    { wrong: "Smaller counterparties tend to provide more quantitative, easier-to-model data.", right: "Smaller counterparties tend to provide MORE qualitative and LESS quantitative data — the opposite of what might be intuitively assumed." }
  ],

  highYield: [
    { stars: 5, what: "Gross vs. net exposure calculation.", why: "A specific, calculation-style module quiz question exists on this exact distinction; expect a numeric problem giving mitigation benefits and asking for gross (ignore mitigation) or net (subtract mitigation)." },
    { stars: 5, what: "Granularity/complexity matching for use case.", why: "High granularity+high complexity for underwriting/valuation, low granularity+low complexity for strategic planning/portfolio allocation — a frequently tested pairing." },
    { stars: 4, what: "Sector lists: transition-risk vs. physical-risk sectors.", why: "Transition: utilities, transportation, oil & gas, construction, metals/mining. Physical: utilities, agriculture, real estate, retail mortgages. Utilities is the only overlap." },
    { stars: 4, what: "Time horizon asymmetry.", why: "Transition risk can use SHORT or LONG horizons; physical risk uses LONG horizons only (5-30 years) — a specific 'least likely' trap." },
    { stars: 4, what: "IAMs understate extreme weather/future severity.", why: "A named, specific weakness that shows up as a 'which model has this weakness' question." },
    { stars: 3, what: "Stress testing is a FORM of scenario analysis.", why: "Not a separate category — a frequently tested 'most accurate statement' item." },
    { stars: 3, what: "Data gap facts.", why: "No common accounting standards for climate data; supervisory reports often lack granularity; smaller counterparties provide more qualitative than quantitative data; banks can't easily update data post-underwriting." },
    { stars: 3, what: "Geography drives physical risk classification; jurisdiction drives transition risk classification.", why: "Don't swap these — a recurring exam trap." },
    { stars: 2, what: "Comparability obstacles.", why: "Jurisdiction comparability and aggregation perspectives (plus complexity/granularity trade-offs) — 'undefined damage functions' is a data/complexity challenge, not a named comparability obstacle." }
  ],

  recall: [
    { q: "A CFO estimates climate-related financial risk at $35 million, with $15 million of insurance benefit and $3 million of derivatives benefit. What is the GROSS exposure?", a: "$35 million — gross exposure by definition excludes any mitigation benefits; only net exposure would subtract the $15mm + $3mm." },
    { q: "A bank wants a methodology for strategic planning purposes. What granularity and complexity should it favor?", a: "Low granularity and low complexity — strategic/portfolio-level decisions tolerate sporadic data and don't need counterparty-level precision." },
    { q: "Name three sources of uncertainty in climate risk measurement.", a: "Intrinsic uncertainty in physical/transition risk driver projections; data gaps; model-based uncertainty." },
    { q: "What is a damage function and what four factors drive it?", a: "A function translating physical hazard impacts into financial cash-flow effects, driven by time horizon, hazard severity, location uniqueness, and relevant sector." },
    { q: "Which financial risk category has banks/supervisors most successfully translated climate exposures into, per the Basel Committee's five findings?", a: "Credit risk — transition risk mapped into portfolio/counterparty credit exposures is the most developed area." },
    { q: "Which sectors did the 2020 outreach workshops flag as most relevant for PHYSICAL risk (not transition risk)?", a: "Utilities, agriculture, real estate, and retail mortgages." },
    { q: "True or false: supervisors apply short time horizons to physical risk assessment.", a: "False — physical risk is assessed only with long time horizons (5-30 years); short horizons apply to transition risk only." },
    { q: "Name the two dimensions along which climate scenarios vary.", a: "The climate outcome (temperature increase) and the type of transition (gradual vs. abrupt emissions reduction / technology availability)." },
    { q: "Is climate risk ratings/scoring necessarily a third-party/external approach?", a: "No — it can be done in-house by banks as well as by external providers; it is not exclusively third-party." },
    { q: "What is the key weakness shared by Integrated Assessment Models (IAMs) and sensitivity analysis?", a: "Both tend to understate/underestimate the severity and probability of extreme or tail climate events." },
    { q: "What are the three future-development focus areas for climate risk modeling frameworks?", a: "Data availability, modeling complexity, and conceptual challenges (including risk differentiation/comparability)." },
    { q: "Which two factors are the PRIMARY drivers of physical risk classification and transition risk classification, respectively?", a: "Geographic location for physical risk; jurisdiction for transition risk." }
  ],

  hooks: [
    { title: "Umbrella test", text: "Gross vs. net = 'before the umbrella' vs. 'after the umbrella actually works.'" },
    { title: "The model spectrum", text: "IAM, CGE, DSGE, OLG, ABM — remember them as a spectrum from 'transparent but rigid' (OLG) to 'flexible but opaque' (ABM), with IAM as the popular-but-flawed default that misses extremes." },
    { title: "Geography vs. jurisdiction", text: "Physical risk = where you stand (geography). Transition risk = whose rules you're under (jurisdiction)." },
    { title: "Prix fixe vs. menu", text: "Supervisors: transition risk gets a menu of horizons (short AND long); physical risk is prix fixe long-horizon only." }
  ],

  summary: "The Basel Committee's 2021 report finds climate risk measurement most mature where transition risk maps into credit risk, and still immature everywhere else — physical risk, other risk categories, and long-horizon nonstandard issues. Three data categories feed the pipeline: raw climate/hazard data, exposure-vulnerability data, and financial-impact data. A wide toolkit of models exists (IAM, sensitivity analysis, input-output, CGE, DSGE, OLG, ABM, stress testing), each trading off realism, transparency, and computational cost — and all of them tend to understate extreme/tail events. Broad measurement approaches (ratings/scores, scenario analysis — which contains stress testing and sensitivity analysis as forms — natural capital analysis, climate VaR) turn these models into bank- and supervisor-facing outputs. Key structural challenges recur throughout: the granularity/complexity trade-off (high for underwriting, low for strategy), gross vs. net exposure (model both), a stark time-horizon mismatch (climate horizons up to 30 years vs. 2-5 year capital/strategic planning), persistent data gaps (no common accounting standards, opaque third-party scrubbing, qualitative-heavy small-counterparty data), and comparability obstacles across jurisdictions and consolidated banking groups.",

  quiz: [
    {
      q: "A CFO reports total climate-related financial risk of $35 million, with an expected insurance benefit of $15 million and an expected derivatives (hedging) benefit of $3 million. What is the bank's GROSS exposure?",
      options: ["$35 million", "$20 million", "$17 million", "$32 million"],
      answer: 0,
      why: "Gross exposure is defined as the climate risk impact before any mitigation is applied, so it ignores the insurance and derivatives benefits entirely — the answer is still $35 million. $17 million ($35mm − $15mm − $3mm) is the tempting distractor because it is the correct NET exposure, not gross; the question specifically asks for gross."
    },
    {
      q: "A bank is designing a methodology purely to support strategic, portfolio-level planning decisions (e.g., whether to reduce sector exposure by 10%), not to price an individual loan. What granularity and complexity should it favor?",
      options: [
        "High granularity, high complexity, for maximum precision",
        "Low granularity, low complexity",
        "High granularity, low complexity",
        "Granularity and complexity are irrelevant to strategic decisions"
      ],
      answer: 1,
      why: "Low granularity/low complexity methods are more tolerant of sporadic data and cheaper to run, which suits strategic/portfolio-level decisions; high granularity is reserved for underwriting and valuation of individual exposures, where the extra data and complexity cost is justified by the precision needed. The exam consistently rewards this use-case-driven answer over the intuitive-but-wrong 'more detail is always better.'"
      },
    {
      q: "Which financial risk category have banks and supervisors most successfully translated climate-related exposures into, per the Basel Committee's five findings?",
      options: ["Liquidity risk", "Operational risk", "Credit risk", "Market risk"],
      answer: 2,
      why: "Finding #3 states banks and supervisors have primarily focused on credit risk assessments when translating climate exposures into financial risk categories — this is the most mature translation to date. Liquidity, operational, and market risk are all explicitly less developed, making them tempting but incorrect choices for 'most successful.'"
    },
    {
      q: "Which of the following is NOT one of the three primary areas of uncertainty in climate risk measurement identified in the reading?",
      options: [
        "Intrinsic uncertainty in physical/transition risk driver projections",
        "Data gaps that create measurement uncertainty",
        "Model-based uncertainty",
        "Regulatory uncertainty about future disclosure requirements"
      ],
      answer: 3,
      why: "The three named areas are intrinsic driver-projection uncertainty, data gaps, and model-based uncertainty. Regulatory/disclosure uncertainty is a real concern in the broader climate-risk literature but is not one of the three areas this specific report names — a classic 'sounds plausible but not in the source' distractor."
    },
    {
      q: "Which statement about Integrated Assessment Models (IAMs) is most accurate?",
      options: [
        "IAMs fully capture extreme-weather economic impacts and are the most comprehensive climate model available",
        "IAMs combine economic growth, energy, and climate modeling but tend to understate extreme-weather impacts and future severity",
        "IAMs are used exclusively by supervisors, never by banks",
        "IAMs eliminate model-based uncertainty because they integrate multiple data sources"
      ],
      answer: 1,
      why: "IAMs link emissions/transition drivers to economic growth by combining economic, energy, and climate modeling, but the reading explicitly flags that they have NOT captured extreme-weather economic impacts and tend to understate future severity — a named, testable weakness. Describing them as fully comprehensive or as eliminating uncertainty inverts this stated limitation."
    },
    {
      q: "A candidate reads that 'stress testing is a separate, parallel category to scenario analysis.' Is this correct?",
      options: [
        "Yes, they are two independent and unrelated broad measurement approaches",
        "No, stress testing is explicitly described as a form of scenario analysis, along with sensitivity analysis",
        "No, scenario analysis is a form of stress testing, not the other way around",
        "Yes, but only for physical risk, not transition risk"
      ],
      answer: 1,
      why: "The reading places stress testing and sensitivity analysis inside scenario analysis as forms/tools it uses, not as separate parallel categories. Reversing the hierarchy (making scenario analysis a subset of stress testing) or claiming full independence both contradict the text; the physical/transition carve-out in the last option is also unsupported."
    }
  ],

  sources: [
    { title: "Basel Committee on Banking Supervision — Climate-related risk drivers and their transmission channels (BIS)", url: "https://www.bis.org/bcbs/publ/d517.htm", note: "The companion 2021 BIS publication (this reading's sister report) laying out the transmission-channel taxonomy that R98's measurement methodologies build on." },
    { title: "Bank for International Settlements — homepage", url: "https://www.bis.org/", note: "Starting point for locating the Basel Committee's climate-risk publications and follow-up guidance." },
    { title: "Investopedia — Value at Risk (VaR)", url: "https://www.investopedia.com/terms/v/var.asp", note: "Background on the standard VaR framework that 'climate VaR' repurposes for climate-related balance-sheet impacts." },
    { title: "NGFS (Network for Greening the Financial System) — Scenarios Portal", url: "https://www.ngfs.net/ngfs-scenarios-portal/", note: "The external scenario source referenced in the reading (e.g., Net Zero 2050 vs. Delayed Transition) used by banks and supervisors for climate scenario analysis." }
  ],

  pdf: { book: 5, query: "This report reflects on five critical findings" }
});
