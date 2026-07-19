export default ({
  book: 4, reading: 65,
  session: "Liquidity Risk Management",
  title: "Early Warning Indicators",
  tagline: "EWIs are the dashboard warning lights for liquidity risk — short and conceptual: what makes a good EWI, whose guidance shapes them, and how escalation works in practice.",

  teaches: `<p>What makes an EWI (early warning indicator) useful, the five-part EWI framework (measures, escalation, reporting, integrated systems, thresholds), the concrete regulatory guidance shaping them (OCC 2012, BCBS 2008, BCBS 2012, Fed SR 10-6) with the actual example indicators each cites, and how the green/amber/red stoplight escalation mechanism is calibrated and backtested in practice.</p>`,

  why: `<p>An EWI system is only as good as its ability to give ADVANCE notice — a backward-looking indicator tells you about a crisis after it's already begun, which defeats the entire point of calling it "early." This reading is short because the underlying idea is simple: build indicators that lead rather than lag, wire them into a clear escalation plan with numeric thresholds, and report them often enough that management can actually act before the liquidity position deteriorates further. What makes this reading testable despite its brevity is the specificity of the regulatory guidance — GARP likes to ask "which regulator's guidance addresses X," so the who-said-what matters as much as the what.</p>`,

  intuition: `<p>Think of EWIs as a car's dashboard: you want the check-engine light to come on <strong>before</strong> the engine seizes, not after smoke is already pouring out. A single warning light isn't enough on its own — the driver also needs to know what to do when it comes on (pull over now vs. schedule a service visit next week). That's exactly the two halves of an EWI system: (1) a <strong>measure</strong> that changes ahead of the problem (the light itself), and (2) an <strong>escalation plan</strong> that tells someone what action that change requires (what the driver does about it). A useful EWI is forward-looking (predicts trouble before it fully materializes, rather than confirming a loss that already happened), covers both internal (bank-specific balance-sheet) and external (market-wide, macroeconomic) measures, is leading rather than lagging, is granular enough to cut through noise, and spans multiple time horizons — because some liquidity problems build over months (a slow deposit outflow) and others erupt in hours (an intraday payment shortfall), and a single-horizon indicator will miss whichever kind it isn't built for.</p>`,

  eli5: `<p>Imagine you're driving cross-country and your car has three different warning lights: one that turns on when the tank hits a quarter-full (long runway — you have time to find any gas station), one that flashes when the engine temperature creeps up over several minutes (medium runway — pull off at the next exit), and one that screams instantly if the brakes fail (zero runway — stop right now). You wouldn't want just the "brakes failed" light and nothing else, because by the time it fires it's often too late to do anything graceful — and you also wouldn't want just the fuel gauge, because it says nothing about the engine. A bank's EWI system is the same idea applied to its ability to pay its bills: some indicators watch slow-building problems (rising loan losses, a shrinking core deposit base) over weeks, others watch fast-moving ones (a spike in overnight borrowing costs, an intraday payment gridlock) over hours, and the "stoplight" (green/amber/red) is just the dashboard telling you how urgently to react — exactly like a fuel gauge, temperature gauge, and brake-failure light sitting side by side on the same panel, each tuned to a different speed of disaster.</p>`,

  thinkLike: `<p>A liquidity risk manager treats an EWI framework as a pipeline with five stages that must all work, not just a list of ratios: <strong>measures</strong> (pick metrics that actually lead the event, not lag it) → <strong>thresholds</strong> (calibrate green/amber/red boundaries off historical volatility, using a long enough lookback — roughly a year — to be statistically reliable, but recent enough to reflect current conditions) → <strong>reporting</strong> (daily, or intraday/hourly for trading-heavy banks) → <strong>integrated systems</strong> (so data from lending, trading, and treasury desks feeds one dashboard instead of three disconnected spreadsheets) → <strong>escalation</strong> (a named person or committee is obligated to act when a light turns amber or red — a threshold with no owner is just decoration). The examiner tests this reading two ways: (1) conceptual "which characteristic makes an EWI useful" questions where the trap answers swap in plausible-sounding but wrong virtues (accuracy, comprehensiveness, being backward-looking/lagging), and (2) a "which regulator said what" matching exercise — OCC 2012 is the embedded-option one, BCBS 2008 is the general-deterioration one, BCBS 2012 is the intraday-specific one, and Fed SR 10-6 is the firm-tailored-triggers one. Memorize the one distinguishing word for each (embedded options / general / intraday / firm-specific) rather than trying to recall paragraphs.</p>`,

  formulas: [],

  breakdown: [
    {
      title: "The five-part EWI framework",
      points: [
        "Measures — the actual indicators tracked; must be forward-looking, internal + external, leading, granular, and span multiple time horizons.",
        "Thresholds — the numeric boundaries (typically calibrated from the historical standard deviation of the measure, using roughly a year of data) that separate green/amber/red.",
        "Reporting — how often the measures are reported to management; timely (often daily, or intraday/hourly for trading-heavy banks) reporting is what makes 'early' warning possible.",
        "Integrated systems — a single data-processing system pulling from multiple internal sources, so EWI dashboards are consistent and complete rather than assembled from disconnected spreadsheets.",
        "Escalation — the defined action plan that fires when a threshold is breached; without this, measures and thresholds are just numbers nobody is obligated to act on."
      ]
    },
    {
      title: "What makes an EWI measure useful",
      points: [
        "Forward-looking — built to anticipate a liquidity problem before it fully develops, not to confirm one that already happened.",
        "Internal AND external — internal measures track the bank's own balance sheet (e.g., deposit outflows in a specific client segment); external measures track macroeconomic/market conditions (e.g., broad credit spreads). An effective EWI should ideally catch internal stress before it becomes publicly visible.",
        "Leading, not lagging — a leading indicator provides a signal before the event; a lagging one only confirms it afterward, leaving no time to react.",
        "Granular — sharp enough to stand out against background noise. Example from the source: 'general bank deposits are falling' is a usable EWI, but 'deposits from a specific group of institutional clients are falling' is a far more effective one because it isolates the actual source of stress.",
        "Multiple time horizons — hourly, daily, weekly, and monthly indicators together, because the bank's assets and liabilities have different durations and a single-horizon indicator will miss problems that build (or erupt) on a different timescale."
      ]
    },
    {
      title: "Regulatory EWI guidance — who said what",
      points: [
        "OCC (2012) — focuses on embedded-option instruments (e.g., callable debt): EWIs should flag when an embedded option is likely to be exercised, or any contingent liability tied to it. Also lists example EWIs: reduced lender financing, tougher long-term debt issuance requirements, forthcoming regulatory changes, CAMELS rating downgrades, spread increases on fixed income/swap products, falling stock price, higher normal-market borrowing rates, reduced deposits from portfolio managers/funds, and higher required margins.",
        "BCBS (2008) — general guidance: banks need indicators that signal liquidity deterioration or increased funding need. Example EWIs: a very sharp increase in assets, more concentrated assets or liabilities, more currency mismatches, lower liability durations, and frequent breaches (or near-breaches) of internal limits.",
        "BCBS (2012) — narrower and later: focuses specifically on intraday liquidity indicators. Examples: daily maximum liquidity usage, intraday liquidity availability, total intraday payments (including their timing), key time-sensitive obligations, payments made on behalf of financial-institution customers, and intraday credit lines extended to financial-institution customers.",
        "Fed SR 10-6 — EWIs and event triggers should be consistent with the firm's own liquidity risk profile (i.e., firm-specific, not one-size-fits-all). Example EWIs: bad publicity around specific assets the firm holds, a worsening balance sheet (falling assets, rising liabilities), and rising spreads on fixed income/swap products."
      ]
    }
  ],

  concepts: [
    {
      name: "What makes an EWI useful",
      def: "Forward-looking (not backward-looking), covering both internal and external measures, leading rather than lagging, granular, and spanning multiple time horizons.",
      intuition: "Each characteristic solves a different failure mode: forward-looking and leading both fight the risk of finding out too late; internal+external fights the risk of a blind spot (a bank-only view misses market-wide stress, a market-only view misses bank-specific problems); granular fights the risk of the signal being drowned in noise; multiple time horizons fights the risk of catching a slow-building problem too late or missing a fast one entirely.",
      example: "'General bank deposits are declining' vs. 'deposits from portfolio-manager and fund clients specifically are declining' — the second is the same underlying data made granular, and it points straight at where the outflow is coming from instead of just that an outflow exists.",
      pitfall: "Do not assume 'more accurate' or 'more comprehensive' is what makes an EWI good — the defining virtue tested here is specifically forward-looking/leading, because a perfectly accurate but lagging indicator still fails at the one job an early warning indicator has.",
      related: []
    },
    {
      name: "The EWI framework (measures → escalation → reporting → integrated systems → thresholds)",
      def: "The full pipeline a bank needs for EWIs to actually change behavior: measures that lead the event, thresholds calibrated from historical data, reporting frequent enough to matter, an integrated system pulling data from multiple sources consistently, and an escalation plan obligating specific people to act.",
      intuition: "A number without an owner is not a warning system. If a metric crosses a red threshold but no one is required to respond, the framework has failed even though the 'measure' stage worked perfectly — this is why escalation is treated as a separate, mandatory component rather than an afterthought.",
      related: []
    },
    {
      name: "Regulatory guidance",
      def: "OCC (2012): EWIs for embedded-option instruments (e.g., callable debt) flagging likely exercise/contingent liability, plus a named list of example indicators (lender financing reductions, CAMELS downgrades, spread widening, falling stock price, higher margins, etc.). BCBS (2008): general deterioration/funding-need signals (sharp asset growth, concentration, currency mismatches, limit breaches). BCBS (2012): intraday liquidity indicators specifically (daily max liquidity, intraday availability, payment timing, time-sensitive obligations). Fed SR 10-6: EWIs and event triggers consistent with the firm's own liquidity risk profile, giving advance notice to prepare and communicate internally/externally (bad publicity on specific assets, worsening balance sheet, spread widening).",
      pitfall: "Know which regulator/year said what — a specific, testable list where questions ask 'which guidance addresses intraday liquidity specifically' (BCBS 2012) vs. 'which addresses embedded options' (OCC 2012). Note BCBS issued two separate, differently-scoped documents four years apart — don't conflate them.",
      related: [{ r: 68, label: "R68 — intraday liquidity risk management, the topic BCBS 2012 addresses" }],
      memory: "OCC: embedded options. BCBS 2008: general deterioration. BCBS 2012: intraday specifically. Fed SR 10-6: firm-specific triggers."
    },
    {
      name: "Escalation mechanics",
      def: "Green/amber/red stoplight thresholds: green = no action, amber = follow-up required, red = immediate action to remedy a serious problem.",
      intuition: "The critical calibration point is the green-to-amber boundary specifically: set it too tight and management drowns in false alarms (alert fatigue, so real warnings get ignored); set it too loose and a genuine problem goes undetected until it's already amber-turning-red. Thresholds are typically calibrated using the historical standard deviation of the measure over a lookback period long enough to be statistically reliable (the source suggests roughly a year) but recent enough to reflect current market conditions, and they should be periodically backtested and recalibrated as conditions change.",
      example: "Timely (often daily, or intraday/hourly for trading-heavy banks) reporting through an integrated data system, feeding into EWI dashboards, is increasingly standard practice — banks build these dashboards partly to satisfy supervisors and partly to genuinely improve internal risk reporting.",
      related: [{ r: 4, label: "R4 — the traffic-light framework analogy from Basel backtesting" }]
    }
  ],

  connections: {
    from: [
      { r: 64, why: "EWIs watch for exactly the deterioration signals the leverage/liquidity feedback loops in R64 produce." }
    ],
    to: [
      { r: 73, why: "Contingency funding planning's monitoring/escalation component builds directly on EWI mechanics." }
    ],
    confused: [
      { what: "BCBS 2008 vs BCBS 2012 guidance", how: "BCBS 2008: general deterioration/funding-need signals (asset growth, concentration, currency mismatches, limit breaches). BCBS 2012: intraday liquidity indicators specifically (daily max liquidity, intraday availability, payment timing) — a later, narrower-scope guidance document." }
    ]
  },

  misconceptions: [
    { wrong: "\"A good EWI is primarily backward-looking, drawing on confirmed historical loss data.\"", right: "A useful EWI is FORWARD-looking and leading, not lagging — it should predict trouble before it fully materializes, not just report on losses that have already occurred." },
    { wrong: "\"BCBS's 2008 and 2012 guidance address the same liquidity risk topics.\"", right: "BCBS 2008 addresses GENERAL deterioration/funding-need signals; BCBS 2012 addresses INTRADAY liquidity indicators specifically — a narrower, later-developed guidance area." },
    { wrong: "\"The more granular an EWI is, the more accurate it automatically becomes.\"", right: "Granularity makes a signal sharper and harder to miss amid noise, but it is a separate property from accuracy — a granular indicator can still be miscalibrated or poorly thresholded." },
    { wrong: "\"EWIs should focus on external, market-wide metrics over internal, bank-specific ones, because market data is more reliable.\"", right: "A useful EWI framework needs BOTH internal and external measures — internal measures catch bank-specific stress (ideally before it's publicly visible), while external measures catch broader market/macro conditions; neither substitutes for the other." },
    { wrong: "\"A threshold breach is itself the end goal of an EWI system.\"", right: "The end goal is escalation — getting management to acknowledge the situation, discuss it, and act, with the action documented. A threshold with no defined escalation plan behind it does not actually improve liquidity risk management." }
  ],

  highYield: [
    { stars: 3, what: "What makes an EWI useful: forward-looking, internal+external, leading, granular, multi-horizon.", why: "The core conceptual checklist of this reading, and the source of most 'which characteristic' single-answer questions." },
    { stars: 2, what: "Regulatory guidance sources and their specific focus (OCC embedded options, BCBS 2008 general vs. BCBS 2012 intraday, Fed SR 10-6 firm-specific).", why: "A specific matching-question list — GARP has directly tested 'which guideline addresses X' in past module quizzes." },
    { stars: 2, what: "Green/amber/red escalation stoplight mechanics, and that thresholds are calibrated from historical standard deviation and backtested periodically.", why: "A simple, quick-recall framework, but also testable on the calibration mechanics (lookback length, backtesting)." },
    { stars: 1, what: "The five-part EWI framework: measures, thresholds, reporting, integrated systems, escalation.", why: "Useful for 'which component represents X' questions — e.g., escalation is the component representing the ultimate desired management response." }
  ],

  recall: [
    { q: "Why is 'forward-looking' listed as a defining characteristic of a useful EWI, rather than 'accurate' or 'comprehensive'?", a: "An EWI's entire purpose is to give ADVANCE WARNING before a liquidity crisis fully develops — a backward-looking or lagging indicator, however accurate or comprehensive, would only confirm a problem after it's already underway, defeating the purpose of an 'early' warning system." },
    { q: "A bank wants guidance specifically on monitoring intraday liquidity risk. Which regulatory document should it consult?", a: "BCBS (2012) — this guidance specifically addresses intraday liquidity indicators, distinct from BCBS's broader 2008 guidance on general deterioration/funding-need signals." },
    { q: "Why does the source treat 'granular' as a separate virtue from 'internal vs. external'? Give the deposit example.", a: "Internal/external is about WHERE you look (bank balance sheet vs. macro market data); granularity is about how SHARPLY you look once you've picked a source. 'General bank deposits are falling' is internal but coarse; 'deposits from a specific portfolio-manager/fund client segment are falling' is internal AND granular — it isolates the actual source of stress instead of just flagging that something, somewhere, is wrong." },
    { q: "What is the escalation framework component that most EWI questions treat as the 'ultimate desired outcome' when a measure signals trouble?", a: "Escalation — getting the issue to relevant management personnel and applying an appropriate remedy based on severity. Measures, thresholds, reporting, and integrated systems all exist to feed into this step; without it, a threshold breach changes nothing." }
  ],

  hooks: [
    { title: "The check-engine light, not the smoke", text: "A good EWI is the check-engine light that comes on before the engine seizes — not the smoke that appears after." }
  ],

  summary: `<p><strong>Useful EWIs</strong>: forward-looking, internal+external coverage, leading (not lagging), granular, multi-horizon. <strong>Framework</strong>: measures → thresholds → reporting → integrated systems → escalation, each stage necessary for the system to actually change behavior. <strong>Regulatory guidance</strong>: OCC 2012 (embedded-option instruments, e.g. callable debt), BCBS 2008 (general deterioration signals — asset growth, concentration, currency mismatches, limit breaches), BCBS 2012 (intraday liquidity specifically — daily max liquidity, payment timing), Fed SR 10-6 (firm-specific triggers — bad publicity, worsening balance sheet, spread widening). <strong>Escalation</strong>: green (no action) / amber (follow-up) / red (immediate action) stoplight thresholds, calibrated from historical standard deviation over roughly a year and periodically backtested, fed by timely (often daily, or intraday for trading-heavy banks) integrated reporting.</p>`,

  quiz: [
    {
      q: "Which characteristic is emphasized as the defining virtue of a useful EWI, above traits like accuracy or comprehensiveness?",
      options: ["Being forward-looking / leading rather than lagging", "Being based on the largest possible dataset", "Being externally audited by a third party", "Being expressed as a single composite score"],
      answer: 0,
      why: "The reading's core point is that an EWI must give advance notice — a lagging (backward-looking) indicator, no matter how accurate or comprehensive, only confirms a problem after it has occurred, which defeats the purpose of an early warning system. 'Largest dataset' and 'single composite score' are not properties the source names at all, and 'externally audited' confuses governance with the indicator's own timing property."
    },
    {
      q: "A bank wants supervisory guidance specifically addressing EWIs for securities and derivatives with embedded options, such as callable debt. Which guidance should it consult?",
      options: ["BCBS (2008)", "BCBS (2012)", "OCC (2012)", "Federal Reserve SR 10-6"],
      answer: 2,
      why: "OCC (2012) specifically addresses EWIs for embedded-option instruments (e.g., callable debt), flagging likely exercise or associated contingent liabilities. BCBS (2008) is general deterioration guidance, BCBS (2012) is intraday-liquidity-specific, and SR 10-6 is about firm-specific triggers — none of these three name embedded options."
    },
    {
      q: "Which guidance document focuses specifically on intraday liquidity indicators, such as daily maximum liquidity usage and the timing of intraday payments?",
      options: ["OCC (2012)", "BCBS (2008)", "BCBS (2012)", "Federal Reserve SR 10-6"],
      answer: 2,
      why: "BCBS (2012) is the later, narrower-scope Basel document focused specifically on intraday liquidity indicators. BCBS (2008) is a broader, earlier document on general deterioration/funding-need signals — the two are easy to confuse because they're from the same committee, which is exactly why the reading flags this as a trap."
    },
    {
      q: "A risk manager notes that 'general bank deposits are declining' but a colleague points out that 'deposits from a specific group of institutional fund clients are declining' is a more effective EWI using the same underlying data. Which EWI property does this illustrate?",
      options: ["The indicator became more externally focused", "The indicator became more granular", "The indicator became more lagging", "The indicator switched from quantitative to qualitative"],
      answer: 1,
      why: "Granularity is about sharpness/specificity — isolating a signal from background noise so it stands out and points at the actual source of stress. The example stays internal (bank balance sheet data) throughout, doesn't become lagging (it's still forward-looking), and both versions are quantitative, so those three distractors each swap in a different, unrelated EWI property."
    },
    {
      q: "Under the green/amber/red stoplight escalation approach, which threshold transition does the source say requires the most careful calibration?",
      options: ["Amber to red", "Green to amber", "Red back to green", "There is no meaningful difference between the transitions"],
      answer: 1,
      why: "The green-to-amber transition is highlighted as the one needing careful calibration: set too tight, it generates excessive false alerts (alert fatigue); set too loose, real problems go undetected. The source does not single out amber-to-red or red-to-green calibration as the critical point, and it explicitly does treat calibration as meaningful, ruling out the 'no difference' option."
    },
    {
      q: "A bank has well-designed EWI measures with properly calibrated green/amber/red thresholds, but no defined plan for who must act, or what action to take, when a threshold turns red. According to the EWI framework, what has this bank failed to build?",
      options: ["An integrated data system", "An escalation process", "A reporting schedule", "A set of external measures"],
      answer: 1,
      why: "Escalation is the framework component that turns a threshold breach into an actual management response — it defines who is obligated to act and what remedy to apply. The scenario specifies the measures and thresholds are already well-built, so the gap described is neither an integrated system, a reporting cadence, nor a missing category of measure; it's specifically the missing action plan, which is escalation."
    }
  ],

  sources: [
    { title: "Early warning system (economics)", url: "https://en.wikipedia.org/wiki/Early-warning_system", note: "General background on early warning systems as a concept, useful context for why 'leading vs. lagging' matters across risk domains, not just banking liquidity." },
    { title: "Basel Committee on Banking Supervision (BCBS)", url: "https://www.bis.org/bcbs/", note: "Home page of the standard-setting body behind the BCBS 2008 and 2012 guidance documents referenced in this reading." },
    { title: "Federal Reserve Supervisory Letters (SR letters)", url: "https://www.federalreserve.gov/supervisionreg/srletters/srletters.htm", note: "Index of Federal Reserve Supervision and Regulation (SR) letters, the series that includes SR 10-6 on liquidity EWIs and event triggers." },
    { title: "Office of the Comptroller of the Currency (OCC)", url: "https://www.occ.gov/", note: "Home page of the U.S. bank regulator behind the OCC 2012 guidance on embedded-option EWIs cited in this reading." }
  ],

  pdf: { book: 4, query: "early warning indicators (EWIs) are analogous to warning lights on a car dashboard" }
});
