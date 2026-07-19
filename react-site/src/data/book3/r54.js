export default ({
  book: 3, reading: 54,
  session: "Operational Risk Focus Areas",
  title: "Case Study: Model Risk and Model Validation",
  tagline: "Puts numbers and tiers around R53's abstractions: a formal model risk tiering system, and three concrete failure modes drawn from real cases.",

  teaches: `<p>What a "model" formally is (the Federal Reserve's SR 11-7 definition), the two-way split of model risk into <strong>execution risk</strong> and <strong>conceptual errors</strong>, the job of the model risk management (MRM) function and the four factors that set a model's risk tier, and — the heart of the reading — three real, named case studies (the Gaussian copula CDO pricing model, the Barclays–Lehman bid spreadsheet, and NASA's Mars Climate Orbiter) that each illustrate a different one of three concrete failure modes: invalid assumptions, implementation error, and input measurement error.</p>`,

  why: `<p>Every quantitative risk model a bank runs — VaR, credit scoring, CDO pricing, capital models — is only as good as its assumptions, its code, and its inputs. This reading exists because "the model said so" has caused real, headline losses: a mispriced multi-trillion-dollar CDO market, a $1.1 billion trading-desk mistake in a bankruptcy auction, and a $125 million satellite gone. The exam wants you to be able to take a short narrative you've never seen before and correctly bucket it into invalid assumptions vs. implementation error vs. input measurement error — the three failure modes are R53's "execution risk vs. conceptual error" split, cut one level more granular so it maps directly onto real incidents.</p>`,

  intuition: `<p>A model is a machine with three moving parts: <strong>assumptions</strong> (the theory about how the world works), <strong>logic/code</strong> (the instructions that turn inputs into an output), and <strong>inputs</strong> (the data fed in). Each of the three case studies in this reading breaks a different part while leaving the other two intact:</p>
  <ul>
    <li><strong>Invalid assumptions</strong> fail at the design stage — the foundational premise doesn't match reality. The <em>Gaussian copula</em> assumed the correlation between mortgage defaults observed in calm markets would hold in a crisis; it didn't, and the model was still "running correctly" on that wrong premise.</li>
    <li><strong>Implementation error</strong> fails at the execution stage — the design might be perfectly sound, but a human or a process didn't carry it out correctly. <em>Barclays</em>' bid spreadsheet had the right idea (exclude 179 unwanted positions) but a junior associate's file-conversion step revealed them anyway.</li>
    <li><strong>Input measurement error</strong> fails at the data stage — the model's logic and assumptions are both fine, but what gets fed in is wrong. <em>NASA's Mars Climate Orbiter</em> team wrote correct navigation software; one contractor's numbers were in pound-force seconds, not the newton-seconds the software expected.</li>
  </ul>
  <p>Notice none of these are "the model was badly built" in a generic sense — each is a precise, different place in the pipeline where things went wrong, and each demands a different fix (challenge the assumption; re-check the code/process; validate the data).</p>`,

  formulas: [],

  concepts: [
    {
      name: "What a model is, and the two broad types of model risk",
      def: "The Federal Reserve's SR 11-7 guidance defines a model as \"a quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates.\" A model's output is always an estimate or forecast, never a certainty — it is subject to estimation error by construction. Model risk itself splits two ways: (1) execution risk — the model doesn't function as intended because of errors in input data or in the coding of the model; (2) conceptual errors — the assumptions underlying the model are invalid (don't represent reality) or the wrong modeling technique was used for the problem.",
      intuition: "VaR is the textbook example of a model in this sense: it takes inputs (position sizes, volatilities, correlations), applies a theory (usually a normal or historical-simulation approach), and produces an estimate (a dollar loss threshold) — not a guarantee.",
      example: "A correlation-based risk model built on data from calm markets will systematically understate correlations in a crisis, because correlations tend to spike when everything sells off together — this is exactly the failure that broke the Gaussian copula (below).",
      pitfall: "Conceptual errors are the harder of the two to catch, because a model with a wrong assumption can still run, produce plausible-looking numbers, and pass ordinary checks for years — it only fails once the world stops matching the assumption (e.g., a housing downturn). Execution risk failures (bad code, bad data) are comparatively easier to catch with routine QA.",
      related: [{ r: 53, label: "R53 — the execution-risk / conceptual-error split this reading applies to concrete cases" }],
      memory: "Execution risk = the machine broke (bad code or bad data). Conceptual error = the blueprint was wrong (bad assumption or wrong technique)."
    },
    {
      name: "Model risk management (MRM) and tiering",
      def: "A model risk management (MRM) team is a group of experts INDEPENDENT of the original model developers, charged with mitigating model risk. MRM teams set the standards for model documentation, data quality, and model version control, and those standards are set PROPORTIONAL to a model's risk tier. The tier depends on four factors: (1) materiality of model output (dollar value of loss if the model fails), (2) model complexity, (3) whether the model is client-facing, and (4) whether the model is used for regulatory compliance.",
      intuition: "This is a cost-benefit rule: not every model deserves the same scrutiny, so MRM concentrates its limited review capacity on the models where a failure would hurt most or reach the most people.",
      example: "The highest-risk tiers require more frequent validation — typically every 2–3 years — plus comprehensive backtesting of model output, while lower tiers get a lighter-touch review. Regardless of tier, EVERY model still gets an annual review of environment changes, input-data quality, and other factors that could materially change performance — tiering changes the depth of review, not whether review happens at all.",
      pitfall: "MRM oversight should be a CONTINUOUS process, not just a scheduled periodic check-in — a model can quietly stop working between review dates, and continuous monitoring catches that earlier. The existence of an MRM team is also not a license for complacency: model users and developers (the first line of defense) remain responsible for catching problems, not just the independent MRM reviewers.",
      related: [{ r: 53, label: "R53 — the validation framework applied more strictly at higher tiers" }],
      memory: "Higher materiality, complexity, client-facing exposure, or regulatory use → stricter, more frequent validation, set by an INDEPENDENT MRM team, on an ONGOING basis."
    },
    {
      name: "Three failure modes, illustrated by three real case studies",
      def: "Invalid assumptions: the model's foundational premises don't hold in the real world. Implementation error: the model logic is coded/executed incorrectly. Input measurement error: the data feeding the model is wrong or mismeasured.",
      example: `<strong>Gaussian copula and CDO pricing (invalid assumptions):</strong> in the 2000s, quant David X. Li built a collateralized debt obligation (CDO) pricing model using a Gaussian copula function. Li's model inferred the correlation among mortgage defaults in a collateral pool — nicknamed the "Gaussian constant" — from current credit default swap (CDS) prices, on the assumption that CDS markets were efficient and therefore correctly priced. Historically, residential mortgage defaults were LOW-correlated (homeowners don't default in lockstep). But as housing prices fell in 2008, CDS prices spiked, reflecting a jump in true correlation — and the model only incorporated that rise WITH A LAG. The mismatch between the model's stale, low-correlation assumption and reality helped drive the collapse of the CDO market. The fix MRM should have pushed for: more transparency to users (many of whom lacked the quant background to see the assumption's weakness) about the model's limitations.<br><br>
      <strong>Barclays' acquisition of Lehman Brothers assets (implementation error):</strong> during Lehman Brothers' 2008 bankruptcy liquidation, Barclays bid to buy a subset of Lehman's assets and trading positions. A few hours before the bid deadline, Barclays sent a 1,000-row spreadsheet to its lawyers at Cleary Gottlieb, with 179 unwanted positions hidden in rows that were meant to stay hidden. A junior law associate converted the spreadsheet to PDF for the court filing — not realizing the conversion process REVEALED the hidden rows. The error wasn't caught until days later, after the bid was approved, forcing Barclays to file a legal motion to exclude those unwanted contracts. The spreadsheet itself isn't a "model," but the failure to correctly execute the intended exclusion (hide, don't reveal) is a textbook implementation error.<br><br>
      <strong>NASA's Mars Climate Orbiter (input measurement error):</strong> Lockheed Martin's engineering team calculated spacecraft thruster data in English units (pound-force seconds), while NASA's navigation software expected metric units (newton-seconds) per its own convention. Neither team's logic or code was wrong on its own terms — the mismatch was purely in the UNITS of the input data. The result was a $125 million satellite lost. MRM's job here would have been rigorous testing of assumptions AND inputs — including something as seemingly mundane as unit conventions.`,
      pitfall: "These three failure modes map onto R53's 'error vs. misuse' (execution risk vs. conceptual error) split, cut one level finer: invalid assumptions is a conceptual error; implementation error and input measurement error are BOTH execution risk, just split by whether the break is in the code/process (implementation) or in the data (input) — input measurement error is closer to a data-quality (R43-style loss-data) problem wearing a model-risk label than it is to a 'the model is broken' problem.",
      related: [{ r: 53, label: "R53 — the errors-vs-misuse framing this reframes" }, { r: 43, label: "R43 — data quality issues, the same root cause wearing a different label" }],
      memory: "Gaussian copula = wrong ASSUMPTION (design). Barclays spreadsheet = wrong EXECUTION (build/process). Mars Orbiter = wrong INPUT (data/units)."
    }
  ],

  connections: {
    from: [
      { r: 53, why: "Applies the abstract validation/error framework to a concrete tiering system and named failure modes." }
    ],
    to: [
      { r: 95, why: "AI risk management's governance framework builds on this same model-risk foundation." }
    ],
    confused: [
      { what: "Invalid assumptions vs implementation error", how: "Invalid assumptions: the DESIGN premise itself is wrong (e.g., assuming defaults stay low-correlated when in a crisis they don't — the Gaussian copula). Implementation error: the design might be fine, but the CODE/PROCESS/EXECUTION doesn't correctly carry it out (e.g., a spreadsheet conversion step that reveals rows meant to stay hidden — Barclays)." },
      { what: "Implementation error vs input measurement error", how: "Implementation error is a CODE/PROCESS/LOGIC problem — the instructions were carried out wrong. Input measurement error is a DATA problem — the instructions and logic were carried out exactly right, but on the wrong numbers (e.g., correct navigation software fed thruster data in the wrong units — Mars Climate Orbiter)." },
      { what: "Execution risk vs conceptual error (the two-way split) vs the three case-study failure modes", how: "Execution risk and conceptual error are the two BROAD categories from LO 55.a/R53. This reading's three failure modes REFINE execution risk into two sub-cases: implementation error (code/process) and input measurement error (data) — while invalid assumptions IS the conceptual-error category, just renamed for the case-study context." }
    ]
  },

  misconceptions: [
    { wrong: "\"All model risk tiers require the same validation rigor.\"", right: "Validation strictness scales with tier, which is driven by materiality of output, model complexity, whether it's client-facing, and whether it's used for regulatory compliance — higher-tier models demand more frequent validation (every 2–3 years), comprehensive backtesting, and stricter documentation, data-quality, and version-control standards. But EVERY model, regardless of tier, still gets an annual review." },
    { wrong: "\"Input measurement error is fundamentally a model-design problem.\"", right: "It's closer to a data-quality problem (similar to R43's loss-data quality concerns) wearing a model-risk label — the model's logic and assumptions could be entirely sound (as in the Mars Climate Orbiter's navigation software) while the data feeding it is simply wrong or mismeasured (units, in that case)." },
    { wrong: "\"The Gaussian copula CDO model failed because of a coding bug.\"", right: "It failed because of an invalid ASSUMPTION — that CDS-implied default correlations from calm markets would hold in a crisis. The model's code executed the (flawed) design correctly; the design itself was the problem." },
    { wrong: "\"An independent MRM team means model developers no longer need to watch for errors.\"", right: "MRM's existence should NOT create complacency among model users and developers — they remain the first line of defense. MRM review should also be continuous/ongoing, not just a scheduled periodic check, precisely because problems can emerge between reviews." }
  ],

  highYield: [
    { stars: 4, what: "Three failure modes: invalid assumptions, implementation error, input measurement error — and which pipeline stage each occurs at.", why: "The core case-study taxonomy of this reading, directly testable via scenario matching." },
    { stars: 4, what: "The three named case studies (Gaussian copula/CDOs, Barclays/Lehman spreadsheet, NASA Mars Climate Orbiter) and which failure mode each illustrates.", why: "GARP's Module Quiz for this reading tests these cases directly by name — you need to recall the specific mechanism, not just the label." },
    { stars: 3, what: "Model risk tiering factors (materiality, complexity, client-facing, regulatory use).", why: "A clean four-factor list driving proportional validation rigor." },
    { stars: 2, what: "Execution risk vs. conceptual error (the two broad LO 55.a/R53 categories) and how the three case-study failure modes nest inside them.", why: "Tests whether you can move between the coarse two-way split and the finer three-way case-study split without conflating them." }
  ],

  recall: [
    { q: "A pricing model correctly implements its designed logic in code, and the underlying theoretical assumptions are sound, but the market data feeding the model contains stale, mismeasured prices. Which failure mode is this, and how does it differ from an implementation error?", a: "This is an input measurement error — the model's code and assumptions are both fine; the problem is purely in the DATA quality. An implementation error, by contrast, would mean the code itself doesn't correctly execute the intended (and otherwise sound) model logic — a coding/execution problem, not a data problem." },
    { q: "Why would a highly complex, client-facing model used for regulatory capital calculations require stricter validation than a simple internal reporting tool?", a: "Model risk tiering scales validation rigor with materiality of output, complexity, client-facing exposure, and regulatory use — all four factors point toward HIGH tiering for this model, demanding more frequent validation, comprehensive backtesting, and stricter documentation, data-quality, and version-control standards than a low-tier internal tool where errors have limited impact and no regulatory consequence." },
    { q: "David X. Li's Gaussian copula model for CDO pricing inferred asset correlations from current CDS prices, assuming markets were efficient. Which failure mode does this illustrate, and what exactly broke when housing prices fell in 2008?", a: "Invalid assumptions. Historical mortgage-default correlations were low, and the model's assumption (that current CDS-implied correlations, from calm markets, would hold going forward) didn't survive contact with a crisis: as housing prices fell, CDS prices spiked, correlations rose sharply, and the model only incorporated that change with a lag — the model's design premise, not its code or its data feed, was the point of failure." },
    { q: "In the Barclays–Lehman Brothers bankruptcy bid, why is the spreadsheet-to-PDF conversion error classified as an implementation error rather than an invalid assumption?", a: "Barclays' underlying intent (exclude 179 specific positions from the bid) was a sound plan, not a flawed premise — the failure was in EXECUTING that plan: converting the spreadsheet to PDF revealed the hidden rows instead of keeping them concealed. The process step, not the underlying logic or theory, broke." }
  ],

  hooks: [
    { title: "Three places to trip", text: "Design (wrong assumptions), build (wrong code/process), input (wrong data) — a model can trip at any one of three stages along its pipeline, and each trip needs a different fix." },
    { title: "Three names to remember", text: "Gaussian copula = assumption. Barclays spreadsheet = implementation. Mars Orbiter = input. If you can match all three case names to their failure mode from memory, you've got this reading." }
  ],

  eli5: `<p>Imagine your GPS app getting you lost in three completely different ways. First: it assumes all the roads on its map are still open, but a bridge washed out last week and nobody updated the map — the app's underlying assumption about the world is now wrong, even though the app itself works perfectly. Second: the app's routing logic is sound, but a software update accidentally swapped the "turn left" and "turn right" instructions — the design is fine, but the execution of it is broken. Third: the app and its map are both totally correct, but your phone's GPS chip is reporting your location a mile off — the logic is fine, the assumptions are fine, but the INPUT DATA feeding the system is wrong. In finance, the "GPS app" is a risk model (like a VaR model or the Gaussian copula CDO pricing model): the washed-out-bridge case maps to <strong>invalid assumptions</strong>, the swapped-instructions case maps to <strong>implementation error</strong>, and the bad-GPS-chip case maps to <strong>input measurement error</strong> — three different reasons the same model can lead you to a wrong, and sometimes very expensive, destination.</p>`,

  thinkLike: `<p>A model risk manager's first question on hearing about any model failure is never "was the model wrong?" — it's "WHERE in the pipeline did it break: the assumption, the execution, or the input?" That single triage question determines the fix: a bad assumption needs a redesign and better disclosure to users about the model's limits; a bad implementation needs stronger code review, process controls, and testing; a bad input needs data-quality controls (unit checks, source validation, staleness checks) rather than touching the model itself at all. The same triage question also drives tiering decisions upfront: a risk manager sizing how much validation rigor a NEW model deserves is really asking "if this model breaks in one of those three ways, how much would it cost us, and how many people would it reach?" — which is exactly the materiality / complexity / client-facing / regulatory-use checklist.</p>
  <p>On the exam, this reading is tested almost entirely through short case narratives you haven't seen phrased exactly this way before — GARP will describe a scenario (a spreadsheet bug, a unit-conversion slip, a correlation assumption that didn't hold) and ask you to correctly classify it. The trap is conflating the two-way split (execution risk vs. conceptual error) with the three-way split (invalid assumptions / implementation error / input measurement error) — remember invalid assumptions IS the conceptual-error bucket, while implementation error and input measurement error are BOTH sub-cases of execution risk, split by whether the break is in the process/code or in the data.</p>`,

  breakdown: [
    {
      title: "The two broad types of model risk (LO 55.a)",
      points: [
        "Execution risk — the model fails to function as intended because of errors in input data or in the coding of the model.",
        "Conceptual errors — the model's underlying assumptions are invalid (don't match reality), or the wrong modeling technique was used for the problem at hand; harder to detect than execution risk because the model can keep producing plausible output for years before the mismatch surfaces."
      ]
    },
    {
      title: "The four factors that set a model's risk tier",
      points: [
        "Materiality of model output — the dollar value of loss if the model fails.",
        "Model complexity — more complex models are harder to fully validate and more prone to hidden errors.",
        "Whether the model is client-facing — errors reach external parties, not just internal decision-makers.",
        "Whether the model is used for regulatory compliance — errors carry regulatory, not just financial, consequences."
      ]
    },
    {
      title: "The three case studies and their failure modes (LO 55.c)",
      points: [
        "Gaussian copula CDO pricing model (David X. Li, 2000s) → invalid assumptions: inferred asset correlations from current CDS prices, assuming markets were efficient; historically low mortgage-default correlations spiked in the 2008 crisis, and the model only caught up with a lag.",
        "Barclays' bid for Lehman Brothers assets (2008 bankruptcy) → implementation error: 179 unwanted positions, hidden in spreadsheet rows, were unintentionally revealed during a PDF conversion by a junior law associate, forcing a later legal motion to exclude them.",
        "NASA's Mars Climate Orbiter → input measurement error: Lockheed Martin's engineering data used English units (pound-force seconds) while NASA's software expected metric units (newton-seconds); correct code and correct assumptions, wrong-unit input, $125 million satellite lost."
      ]
    }
  ],

  quiz: [
    {
      q: "Which of the three case studies in this reading illustrates an invalid-assumptions failure?",
      options: [
        "NASA's Mars Climate Orbiter",
        "Barclays' bid for Lehman Brothers assets",
        "The Gaussian copula CDO pricing model",
        "None of the three — all are implementation errors"
      ],
      answer: 2,
      why: "The Gaussian copula model assumed CDS-implied, calm-market default correlations would hold going forward; that design premise broke in the 2008 crisis. The Mars Orbiter case is an input measurement error (unit mismatch, not a bad assumption or bad code), and Barclays is an implementation error (a process/execution failure, not a flawed premise) — both distractors are plausible because all three cases involve a real, costly 'model' failure, but only the copula case is about the underlying theory being wrong."
    },
    {
      q: "Per the Federal Reserve's SR 11-7 guidance, which of the following best describes what a 'model' is?",
      options: [
        "A system that always produces a precise, error-free numerical output",
        "A quantitative method, system, or approach applying statistical, economic, financial, or mathematical theories and assumptions to process input data into quantitative estimates",
        "Any spreadsheet used by a financial institution for calculations",
        "A regulatory filing template used to compute capital ratios"
      ],
      answer: 1,
      why: "This is the SR 11-7 definition verbatim in substance: a model produces an ESTIMATE, not a precise or error-free output — that's precisely why model risk exists. The 'always produces a precise, error-free output' answer is the tempting trap because it sounds like what a 'good' model should do, but the reading stresses the opposite: outputs are forecasts subject to estimation error by construction. A plain spreadsheet or a regulatory template isn't automatically a model unless it applies theory/assumptions to transform inputs into estimates."
    },
    {
      q: "A junior associate converts a spreadsheet with hidden rows into a PDF for a legal filing, and the conversion process unintentionally reveals rows that were meant to stay hidden, resulting in the wrong assets being included in a bid. This is an example of:",
      options: [
        "Invalid assumptions",
        "Input measurement error",
        "Implementation error",
        "Model risk tiering failure"
      ],
      answer: 2,
      why: "The underlying plan (exclude specific positions) was sound; the failure occurred in EXECUTING that plan via the file-conversion step — a process/implementation error, exactly the Barclays–Lehman case. It is not invalid assumptions (the premise wasn't wrong) or input measurement error (no data was mismeasured) — it's a pure execution failure, and 'model risk tiering failure' isn't a failure mode at all, just a tempting-sounding distractor built from other reading vocabulary."
    },
    {
      q: "Which four factors together determine a model's risk tier?",
      options: [
        "Materiality of output, model complexity, client-facing status, regulatory-compliance use",
        "Model age, developer seniority, materiality of output, client-facing status",
        "Model complexity, backtesting frequency, documentation length, regulatory-compliance use",
        "Materiality of output, model complexity, client-facing status, IT infrastructure cost"
      ],
      answer: 0,
      why: "The four tiering factors are materiality of output, model complexity, whether it's client-facing, and whether it's used for regulatory compliance. The distractors swap in plausible-sounding but wrong factors — backtesting frequency and documentation length are CONSEQUENCES of tiering (what higher tiers require), not inputs into setting the tier itself, and model age/developer seniority/IT cost never appear in the source's tiering criteria."
    },
    {
      q: "NASA's Mars Climate Orbiter was lost because Lockheed Martin's engineering team supplied thruster data in English units (pound-force seconds) while NASA's navigation software expected metric units (newton-seconds). Why is this classified as an input measurement error rather than an implementation error?",
      options: [
        "Because the navigation software itself contained a coding bug",
        "Because NASA's underlying orbital-mechanics assumptions were invalid",
        "Because the software's code and design were correct, but the data fed into it was in the wrong units",
        "Because NASA failed to set an appropriate model risk tier for the mission"
      ],
      answer: 2,
      why: "The software correctly executed its designed logic on whatever numbers it received — the code wasn't buggy and the orbital-mechanics theory wasn't wrong; the DATA itself carried the wrong units. That's the defining feature of input measurement error: model logic and assumptions are sound, but the input is mismeasured. A coding bug would make it implementation error, and a flawed theory would make it invalid assumptions — neither happened here."
    },
    {
      q: "An MRM team assigns a model to its highest risk tier. According to this reading, what does that most directly require?",
      options: [
        "The model is retired and replaced with a simpler alternative",
        "More frequent validation (roughly every 2–3 years) and comprehensive backtesting, on top of the annual review every model already gets",
        "The model skips independent MRM review entirely, since developers already know it best",
        "The model is exempted from documentation and version-control standards to speed up its use"
      ],
      answer: 1,
      why: "Higher tiers mean MORE scrutiny, not less: more frequent full validation (every 2–3 years) plus comprehensive backtesting, layered on top of the annual review every model gets regardless of tier. The reading never says high-tier models are retired or exempted from documentation — that's backwards; stricter documentation, data-quality, and version-control standards are exactly what higher tiers demand. Independent MRM review is required precisely because developers, however knowledgeable, are not independent of their own model."
    }
  ],

  sources: [
    { title: "Federal Reserve SR 11-7: Guidance on Model Risk Management", url: "https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm", note: "The original supervisory letter defining a 'model' and setting expectations for model risk management — the source of this reading's core definition." },
    { title: "Wikipedia: Gaussian copula", url: "https://en.wikipedia.org/wiki/Gaussian_copula", note: "Background on David X. Li's copula function and its role in CDO pricing and the 2008 financial crisis." },
    { title: "Wikipedia: Mars Climate Orbiter", url: "https://en.wikipedia.org/wiki/Mars_Climate_Orbiter", note: "Full account of the 1999 unit-conversion failure (pound-force seconds vs. newton-seconds) that destroyed the $125 million spacecraft." },
    { title: "Investopedia: Model Risk", url: "https://www.investopedia.com/terms/m/model-risk.asp", note: "A concise overview of model risk and why financial institutions build dedicated model risk management functions." }
  ],

  pdf: { book: 3, query: "Models are sophisticated tools used widely in finance" },

  summary: `<p><strong>A model</strong> (per the Fed's SR 11-7) processes input data through theory-driven assumptions into an estimate — never a certainty. <strong>Model risk</strong> splits into execution risk (bad code or bad data) and conceptual errors (bad assumptions or wrong technique). <strong>Model risk tiering</strong> scales validation rigor with materiality, complexity, client-facing exposure, and regulatory use, run by an independent MRM team on a continuous basis. <strong>Three case-study failure modes</strong>: invalid assumptions (the Gaussian copula CDO model — a design-stage premise failure), implementation error (Barclays' Lehman bid spreadsheet — a code/process-execution failure), and input measurement error (NASA's Mars Climate Orbiter — a data-stage unit-mismatch failure, closer to a data-quality problem than a model problem) — mapping onto R53's error-vs-misuse split from a different angle.</p>`
});
