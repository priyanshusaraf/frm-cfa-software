export default ({
  book: 3, reading: 53,
  session: "Operational Risk Focus Areas",
  title: "Supervisory Guidance on Model Risk Management",
  tagline: "Model risk is a distinct animal: not a single event, but a systematic risk baked into every decision the model informs. Two ways it bites: the model itself is wrong, or a correct model is used the wrong way.",

  teaches: `<p>What a "model" formally is (the Fed's SR 11-7 definition and its three moving parts: information inputs, processing, and reporting), the two distinct ways model risk arises (errors vs. misuse), how a bank sizes and manages that risk day to day (including the "effective challenge" concept), best practices for building and testing a model before it goes live, and — the exam's favorite target — the three elements of a strong model validation process, with backtesting's two-condition trap sitting inside the third element.</p>`,

  why: `<p>Model risk was promoted to Level-1 status under the ORX taxonomy (R42) — this reading gives it the dedicated treatment that promotion implied, and its errors-vs-misuse distinction repeats directly in R54's case studies. Banks run on models — VaR, credit scoring, pricing, stress testing — so a systematic failure mode here doesn't cost you one trade, it silently mis-prices every decision the model touches until someone notices.</p>`,

  intuition: `<p>A <strong>model</strong>, in the regulatory sense used here (the Fed's Supervision and Regulation letter SR 11-7 definition), is "a quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates." Strip the jargon: it's a machine you feed data into that spits out a number you then act on — a VaR figure, a credit score, a fair-value price. Every model has three moving parts: <strong>information inputs</strong> (the data and assumptions you feed in), <strong>processing</strong> (the math/logic that converts inputs into an estimate), and <strong>reporting</strong> (turning that raw estimate into something a human decision-maker can actually use). Because models are simplifications of reality built under cost-benefit constraints — you can't model every variable, so you approximate — they will <em>never</em> be perfectly accurate, and model risk is therefore never fully eliminable, only managed down.</p><p>A model can fail in two fundamentally different ways: it can simply be WRONG (a coding bug, a bad assumption, miscalibrated parameters — an <strong>error</strong>), or it can be CORRECT but used OUT OF CONTEXT — applied to a situation its designers never intended, where its assumptions quietly stop holding (<strong>misuse</strong>). The second failure mode is sneakier because nothing about the model itself is broken; the mismatch is between the model and its application. A textbook real-world instance the reading flags: correlation estimates between portfolio assets, calibrated from calm ("normal times") market data, systematically underestimate how correlated those same assets become during a crisis — the model isn't coded wrong, it's just being asked a question its calibration period never prepared it to answer.</p>`,

  eli5: `<p>Think of a GPS navigation app. It was built and tested using a database of roads, typical traffic patterns, and an algorithm that estimates travel time from your input (start point, destination, time of day). Two different things can go wrong with your trip. First, the app could just have a <strong>bug</strong> — it reads a one-way street as two-way and routes you the wrong way; that's a pure error, the tool itself is broken. Second, the app could be working exactly as designed but you use it <strong>out of context</strong> — you're driving a delivery truck that can't fit under low bridges, but the app was only ever tested and tuned for regular cars, so it happily routes you into a bridge you can't clear. Nothing is "wrong" with the app's code; it's simply being applied to a situation it was never built for. A bank's model risk works the same way: <strong>error</strong> is a model with a bug or bad assumption baked in, and <strong>misuse</strong> is a perfectly correct model pointed at a job it was never validated to do.</p>`,

  thinkLike: `<p>A model risk manager doesn't ask "is this model accurate?" as a yes/no question — they ask "how much could I lose if this specific model is wrong, given how it's used, and is that exposure proportional to the effort I'm putting into validating it?" That's why sizing model risk runs on three inputs: <strong>complexity</strong> (a simple linear regression is easier to sanity-check than a black-box machine-learning model), <strong>uncertainty in inputs/assumptions</strong> (garbage in, garbage out — and the garbage compounds through processing), and <strong>potential impact on users</strong> (a model that sets regulatory capital for a $50B portfolio deserves far more scrutiny than a spreadsheet used for an internal what-if analysis). This risk-tiering instinct — more materiality and more complexity buys you a stricter validation regime — is the same proportionality logic the exam tests again in R54's formal model-risk tiers.</p><p>On the exam, this reading is tested less as "recall the definition" and more as "classify the scenario." You'll be given a short vignette — a model performs badly on a new portfolio segment, or a backtest uses the wrong time window — and asked to identify which failure mode (error vs. misuse) or which validation element (conceptual soundness vs. ongoing monitoring vs. outcomes analysis) is implicated. The two-condition backtesting rule is the single most reliable trap: GARP loves giving you a backtest that satisfies only one of the two required conditions and asking whether it's valid.</p>`,

  formulas: [],

  concepts: [
    {
      name: "What a model is (SR 11-7 definition)",
      def: "A quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates (Federal Reserve Supervision and Regulation letter SR 11-7). Every model has three parts: information inputs (data and assumptions), processing (converting inputs into estimates), and reporting (converting estimates into information a decision-maker can use).",
      intuition: "A model turns raw data into a number you're expected to act on. The three-part breakdown matters because each part can fail independently — bad data (inputs), a coding/logic bug (processing), or a misleading presentation of a correct estimate (reporting) are three different problems with three different fixes.",
      example: "A VaR engine: portfolio positions and market data are the inputs, the historical-simulation or Monte Carlo calculation is the processing, and the daily VaR report handed to the trading desk is the reporting.",
      pitfall: "Because models must simplify reality under cost-benefit constraints, they can never be perfectly accurate — model risk cannot be eliminated, only managed down. Don't answer an exam question with 'eliminate model risk' as an achievable goal.",
      related: []
    },
    {
      name: "Sizing model risk",
      def: "Depends on model complexity, uncertainty in inputs/assumptions, and potential impact on users. Risk must be analyzed not just for stand-alone models but also in aggregate for models that are related to, or feed into, other models.",
      intuition: "Complexity and input uncertainty are about how likely the model is to be wrong; potential impact is about how much it matters if it is. A firm should spend its limited validation resources where the product of 'likely to be wrong' and 'costly if wrong' is highest.",
      pitfall: "Mitigation: restrict use, analyze performance, continually recalibrate, and always CONTEXTUALIZE model output against other information rather than treating it as gospel — a model's output is an input to a decision, not the decision itself.",
      related: []
    },
    {
      name: "Effective challenge",
      def: "An in-depth, independent, unbiased evaluation of a model by individuals with strong technical skills, who identify the model's weaknesses and assumptions and propose effective solutions. To be genuine, the people doing the challenging must be completely independent from model development — otherwise you get a self-review threat (the developer grading their own homework). A robust follow-through process, backed by senior management's authority, must then act on the issues the challenge surfaces.",
      intuition: "This is the core organizational mechanism that makes model risk management real rather than a checkbox: someone with no stake in the model's success has to be empowered to say 'this is broken' and be listened to.",
      pitfall: "A common exam distractor is a model reviewed by its own developers, or by a team that reports to the same person who built the model — both violate the independence requirement and are not effective challenge, regardless of how rigorous the review itself looks.",
      related: [{ r: 54, label: "R54's MRM team performs exactly this independent-challenge role at the organizational level, formalized into risk tiers." }]
    },
    {
      name: "Model development discipline",
      def: "Clear objective aligned with intended use, thorough documentation of strengths/weaknesses (including any data proxies or adjustments to external data, disclosed so users can judge the data's usefulness for themselves), and rigorous testing across both quantitative and qualitative aspects. Testing must span both normal and extreme (stressed) market states, including unusual-but-plausible conditions, and must use multiple tests rather than relying on a single test — a single statistical test always risks a Type I error (rejecting a true model as bad) or Type II error (accepting a bad model as good).",
      intuition: "A model that's only ever been tested against calm, 'normal' market data hasn't really been tested for the scenario risk managers care about most — the crisis. Testing across extreme states is how you find out where a model's assumptions quietly break down before a real crisis finds out for you.",
      pitfall: "Don't neglect the QUALITATIVE side of testing — model risk isn't purely a numbers problem; documentation quality and conceptual soundness matter as much as statistical fit. Quantitative outputs are often deliberately tempered with subjective, non-quantitative judgment to make them relevant, and that adjustment itself must be documented with a clear, logical basis.",
      related: ["Three elements of model validation"]
    },
    {
      name: "Three elements of model validation",
      def: "Conceptual soundness: documentation review, live testing, single/multi-variable sensitivity analysis, and stress testing (pushing inputs to extreme values to find where the model breaks or loses accuracy). Ongoing monitoring: process verification (checking that data inputs remain error-free/complete, that computer code is accurate and change-controlled, and reviewing any human overrides of model output — frequent overrides are themselves a red flag that the model needs amendment) + benchmarking (comparing the model's inputs/outputs against other comparable data or models; small variances suggest — but don't prove — reliability, and large variances don't automatically mean the model is faulty, since the benchmark may simply use a different methodology). Outcomes analysis: parallel analysis (side-by-side comparison of an original model and an amended model's estimates against actual outcomes, to confirm the amendment is really an improvement before fully replacing the old model) + backtesting (out-of-sample period, consistent with the model's forecast horizon; confidence intervals are set around the model's estimates, and results falling outside them are flagged as significant and investigated for missing factors or specification errors).",
      pitfall: "Backtesting for model validation must use a time period DIFFERENT FROM the one used to build the model, but CONSISTENT WITH the model's actual forecast horizon — both conditions are tested, not just one. A common error is satisfying only one condition (e.g., using a different period but a mismatched horizon). Note also that backtesting is specifically a form of OUTCOMES ANALYSIS, not ongoing monitoring — a classic exam classification trap.",
      related: [{ r: 54, label: "R54 — concrete tiering and failure modes built on this validation framework" }],
      memory: "Conceptual soundness = is the design sound? Ongoing monitoring = is it still behaving? Outcomes analysis = did it actually predict correctly, out-of-sample?"
    },
    {
      name: "Vendor and third-party model validation",
      def: "When a bank buys rather than builds a model (ranging from vendors supplying raw data up to entire third-party models), validation gets harder because the modeling activity is external and parts of it may be confidential. Vendors must supply enough construction detail and testing results to demonstrate the model is appropriate and effective for the buyer's intended use; because coding and implementation access is often limited, the bank's validation effort has to lean more heavily on sensitivity analysis and benchmarking. Any modifications the bank makes to a vendor model must be documented and explained during validation.",
      intuition: "You can't run 'ongoing monitoring's process verification (checking the code) on code you don't have access to — so vendor models push the validation burden toward the tests you CAN run externally: does the output move sensibly when you perturb inputs, and does it line up with comparable benchmarks.",
      pitfall: "A firm cannot outsource its model risk along with the model — using a vendor product does not reduce the bank's own responsibility to understand and validate it; in-depth knowledge of the vendor product is still required from the perspective of the institution's own internal controls.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 42, why: "Model risk's promotion to Level-1 status under the ORX taxonomy foreshadows this dedicated reading." }
    ],
    to: [
      { r: 54, why: "The formal tiering system and three concrete failure modes build directly on this reading's validation framework." },
      { r: 95, why: "AI risk management (Book 5) extends model risk concepts to AI/ML models specifically." }
    ],
    confused: [
      { what: "Model error vs model misuse", how: "A model ERROR means the model itself is wrong (bad code, bad assumptions). MODEL MISUSE means a correct model is applied out of the context it was designed for — different failure modes requiring different fixes." },
      { what: "Backtesting period requirements", how: "Must be BOTH a different period from model-building AND consistent with the model's forecast horizon — satisfying only one condition is an incomplete backtest." },
      { what: "Backtesting's place in the validation framework", how: "Backtesting is classified under OUTCOMES ANALYSIS, not ongoing monitoring — even though it feels like ongoing surveillance of the model, it's specifically about comparing final estimates against what actually happened." },
      { what: "Benchmarking vs. process verification", how: "Both sit under ongoing monitoring, but process verification checks that DATA INPUTS and CODE are accurate and complete, while benchmarking compares the model's OUTPUTS against other models/data sources — one looks inward at the plumbing, the other looks sideways for a second opinion." }
    ]
  },

  misconceptions: [
    { wrong: "\"Model risk only arises when a model contains an actual error or bug.\"", right: "Model risk also arises when a CORRECT model is used the wrong way — applied out of the context it was designed for, where its assumptions no longer hold. This misuse failure mode is just as important as outright errors." },
    { wrong: "\"Backtesting a model just requires using data from a period different than the one used to build it.\"", right: "It ALSO requires that the out-of-sample period be consistent with the model's actual forecast horizon — both conditions must hold, not just one." },
    { wrong: "\"Model validation is primarily a quantitative/statistical exercise.\"", right: "Rigorous testing must include both quantitative AND qualitative aspects — documentation quality and conceptual soundness matter alongside statistical performance." },
    { wrong: "\"With the right procedures and tools, model risk can eventually be eliminated.\"", right: "Because models are necessarily simplifications of reality (built under cost-benefit constraints), they will never be completely accurate — model risk can only be managed and reduced, never eliminated entirely." },
    { wrong: "\"A model built in-house by the risk team can be validated by that same team, as long as they're careful.\"", right: "Effective challenge requires genuine independence from model development — the same team validating its own model creates a self-review threat, regardless of how careful they are. Segregation of duties between developers and validators is a structural requirement, not just a best practice." }
  ],

  highYield: [
    { stars: 5, what: "Backtesting requirement: different period from model-building AND consistent with forecast horizon (both conditions).", why: "Explicitly flagged as a frequently tested dual-condition trap." },
    { stars: 4, what: "Model risk's two failure modes: the model is wrong (error) vs. a correct model misused out of context.", why: "The foundational conceptual distinction of this reading, repeated in R54's case studies." },
    { stars: 4, what: "Backtesting is a form of outcomes analysis, not ongoing monitoring.", why: "A specific classification question GARP has asked directly." },
    { stars: 3, what: "Three elements of model validation (conceptual soundness, ongoing monitoring, outcomes analysis).", why: "A clean three-part framework, good for classification questions." },
    { stars: 3, what: "Effective challenge requires independence from model development to avoid a self-review threat.", why: "Tests whether you understand WHY segregation of duties matters, not just that it's required." }
  ],

  recall: [
    { q: "A credit risk model performs well on the data used to build it, and is then tested on a completely different, more recent period — but that period covers only 3 months while the model is designed to forecast 12-month default rates. Is this a valid backtest?", a: "No — while the period is different from the model-building period (satisfying one condition), it is NOT consistent with the model's 12-month forecast horizon (failing the second condition). A valid backtest requires BOTH: a different time period AND consistency with the model's actual forecast horizon." },
    { q: "A statistically sound prepayment model, validated for prime residential mortgages, is applied without modification to a subprime portfolio and produces poor predictions. Is this a model error or model misuse?", a: "Model misuse — the model itself may be perfectly correct for its intended context (prime mortgages), but applying it out of context (subprime, with different borrower behavior) is a mismatch between the model and its application, not a flaw in the model's internal logic or coding." },
    { q: "Which of the three parts of a model — information inputs, processing, or reporting — is responsible for converting a raw statistical estimate into information a business user can actually act on?", a: "Reporting. Information inputs supply the data and assumptions; processing converts those inputs into a quantitative estimate; reporting converts that estimate into applied, usable information." },
    { q: "A firm's model developers also perform the final validation review of their own model, arguing they know the model best. Why does this fail the 'effective challenge' standard?", a: "Effective challenge requires the reviewers to be independent from model development to avoid a self-review threat — developers reviewing their own work, however technically capable, cannot provide the unbiased outside perspective the challenge is designed to produce." }
  ],

  hooks: [
    { title: "Wrong tool vs. right tool, wrong job", text: "A model ERROR is a broken hammer. Model MISUSE is a perfectly good hammer being used to drive a screw — nothing wrong with the hammer, everything wrong with the application." },
    { title: "The two-condition backtest", text: "A valid backtest needs BOTH a different time period AND a matching horizon — like testing a weather forecaster on a different week (not the training week) but still checking THEIR ACTUAL forecast window (not a mismatched one)." },
    { title: "Grading your own homework", text: "Effective challenge fails the moment the model's builder is also its grader — independence isn't a nicety, it's the whole point of the exercise." }
  ],

  breakdown: [
    {
      title: "The three parts of a model",
      points: [
        "Information inputs — the data and assumptions fed into the model; garbage in, garbage out applies directly here.",
        "Processing — the statistical/mathematical logic that converts those inputs into a quantitative estimate.",
        "Reporting — converting the raw estimate into applied information a decision-maker can actually use."
      ]
    },
    {
      title: "Two ways model risk arises",
      points: [
        "Error (execution risk) — the model has significant errors and produces faulty outputs, from bad coding to bad input data to an over-simplified design.",
        "Misuse (conceptual error) — the model is not used properly, not used for its intended purpose, or applied out of the context/environment it was designed and calibrated for."
      ]
    },
    {
      title: "Elements of managing model risk day to day",
      points: [
        "Set restrictions on model use, scoped to what the model was actually validated for.",
        "Analyze model performance on an ongoing basis rather than assuming it stays accurate forever.",
        "Continually calibrate and improve the model as data and conditions change.",
        "Place model output in the context of other relevant information, as a reasonability check rather than treating the output as gospel.",
        "Run 'effective challenge' — an independent, unbiased, technically strong review of the model's weaknesses, with real management follow-through on the issues raised."
      ]
    },
    {
      title: "Best practices for model development and implementation",
      points: [
        "Start with a clearly stated objective congruent with the model's eventual use.",
        "Thoroughly document supporting background, strengths, and weaknesses; disclose data proxies or external-data adjustments so users can judge data usefulness themselves.",
        "Compare against alternative models as a 'reasonability check' on the model's logic.",
        "Test across a reasonable range of inputs, in both normal and extreme (stressed, unusual-but-plausible) market states.",
        "Use multiple tests rather than a single test, to avoid Type I/Type II testing errors.",
        "Don't neglect the qualitative side of testing — documentation quality and conceptual soundness matter alongside statistical fit."
      ]
    },
    {
      title: "Three elements of model validation",
      points: [
        "Conceptual soundness — documentation review, live testing, single- and multi-variable sensitivity analysis, and stress testing.",
        "Ongoing monitoring — process verification (data/code integrity, override review) plus benchmarking (comparison against other models/data).",
        "Outcomes analysis — parallel analysis of amended vs. original models, plus backtesting (different period, same forecast horizon, confidence-interval breach investigation)."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank's VaR model is coded correctly and its documentation is sound, but it was calibrated using five years of calm, low-volatility market data. During a sudden market crisis, the model badly underestimates portfolio risk because correlations between assets spike far above their calm-period levels. What best describes this failure?",
      options: ["A pure model error, since the output was wrong", "Model misuse, since the model is being relied on outside the conditions its assumptions were built for", "A benchmarking failure", "A process verification failure"],
      answer: 1,
      why: "The model's code and assumptions weren't broken for the environment it was built on — the mismatch is between the model's calibration context (calm markets) and where it's now being applied (a crisis), which is exactly the misuse failure mode. 'Pure error' is the tempting distractor because the output was factually wrong, but error specifically means the model itself is flawed (bad code/bad math), not that it's being asked a question outside its valid domain."
    },
    {
      q: "A risk model is backtested using a period of data that was NOT used to build the model, but the test window is only 1 month long even though the model forecasts 12-month default rates. Is this backtest valid?",
      options: ["Yes, because using a different period is the only requirement", "No, because the test period is not consistent with the model's 12-month forecast horizon", "Yes, because shorter test periods are always more conservative", "No, because backtesting must always use exactly the same period used to build the model"],
      answer: 1,
      why: "A valid backtest requires BOTH a different period from model-building AND a period consistent with the model's actual forecast horizon; here only the first condition is met. The first distractor is the classic trap — many candidates stop checking after confirming 'different period' and miss that the horizon must also match."
    },
    {
      q: "Which of the following is LEAST likely to be a key consideration when testing a model during development?",
      options: ["Testing for potential weaknesses across a range of inputs", "Testing under extreme (stressed) market conditions", "Testing exclusively under normal market conditions to keep results comparable", "Testing other models that rely on the subject model's outputs as their inputs"],
      answer: 2,
      why: "Testing must span both normal AND extreme/stressed states (including unusual-but-plausible conditions) — restricting testing exclusively to normal conditions is precisely the gap that lets a model fail unexpectedly in a crisis. The other three are all explicitly cited as important considerations in model testing."
    },
    {
      q: "A model's internal validators are also the model's original developers, who argue their deep technical knowledge makes them the best-qualified reviewers. What principle does this violate?",
      options: ["Benchmarking", "Effective challenge / independence from model development", "Process verification", "Outcomes analysis"],
      answer: 1,
      why: "Effective challenge specifically requires reviewers to be independent from model development to avoid a self-review threat — technical expertise doesn't substitute for independence, since the concern is bias, not competence. Process verification and benchmarking are validation techniques, not the independence requirement being tested here."
    },
    {
      q: "Backtesting a model's estimates against actual outcomes, and comparing an original model against an amended version's estimates side by side, are both classified under which element of the validation process?",
      options: ["Conceptual soundness", "Ongoing monitoring", "Outcomes analysis", "Effective challenge"],
      answer: 2,
      why: "Both backtesting and parallel analysis of amended models sit under outcomes analysis — the common thread is comparing model output against what actually happened. Ongoing monitoring is the tempting distractor because backtesting 'feels' like continuous surveillance, but GARP specifically classifies it as outcomes analysis, not monitoring."
    },
    {
      q: "A bank licenses a third-party vendor's credit scoring model and has limited access to its underlying source code. Which validation techniques does the bank need to lean on most heavily as a result?",
      options: ["Process verification of the vendor's internal code", "Sensitivity analysis and benchmarking", "Segregation of duties within the vendor's own development team", "Ongoing recalibration of the vendor's proprietary algorithm"],
      answer: 1,
      why: "Because the bank typically can't access or verify the vendor's internal code directly, validation shifts toward sensitivity analysis (perturbing inputs and checking outputs) and benchmarking (comparing against other models/data) — techniques that work from the outside. Process verification of the vendor's own code is the trap answer since the bank usually lacks the access to perform it directly."
    }
  ],

  sources: [
    { title: "SR 11-7: Guidance on Model Risk Management (Federal Reserve)", url: "https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm", note: "The original supervisory letter this reading is built on — the formal definition of a model and the framework for model risk management." },
    { title: "Model risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Model_risk", note: "A concise overview of model risk, its sources, and mitigation approaches, with links to related regulatory guidance." },
    { title: "Backtesting — Investopedia", url: "https://www.investopedia.com/terms/b/backtesting.asp", note: "Plain-language explanation of backtesting mechanics, useful for grounding the out-of-sample/forecast-horizon requirement in this reading." },
    { title: "Federal Deposit Insurance Corporation — Model Risk Management guidance", url: "https://www.fdic.gov/", note: "The FDIC (this reading's GARP-assigned source institution) publishes complementary model risk supervisory material for FDIC-supervised institutions." }
  ],

  pdf: { book: 3, query: "This is a very specific reading on managing model risk from the perspective of a bank" },

  summary: `<p>A model is a system with three parts — information inputs, processing, and reporting — that transforms data into an estimate you're expected to act on; because models are necessarily simplified, model risk can be managed but never eliminated. Model risk bites two ways: the model is WRONG (error/execution risk), or a CORRECT model is MISUSED out of context (conceptual error). <strong>Sizing</strong>: complexity, input uncertainty, potential impact — mitigate via restricted use, performance analysis, recalibration, contextualizing output, and running genuine "effective challenge" (independent, unbiased review free of self-review threat). <strong>Development discipline</strong>: clear objective, thorough documentation (including disclosed data proxies/adjustments), rigorous quantitative AND qualitative testing across normal and stressed states, using multiple tests to avoid Type I/II errors. <strong>Three validation elements</strong>: conceptual soundness (documentation, live testing, single/multi-variable sensitivity analysis, stress testing), ongoing monitoring (process verification of data/code integrity plus benchmarking against comparable models), outcomes analysis (parallel analysis of amended models plus backtesting). <strong>Backtesting</strong> requires BOTH a different time period from model-building AND consistency with the model's forecast horizon — and is itself a form of outcomes analysis, not ongoing monitoring. Vendor/third-party models shift the validation burden toward sensitivity analysis and benchmarking since direct code access is usually limited, but the bank retains full responsibility for understanding and validating them.</p>`
});
