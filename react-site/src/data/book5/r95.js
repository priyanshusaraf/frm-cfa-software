export default ({
  book: 5, reading: 95,
  session: "Current Issues in Financial Markets",
  title: "Financial Risk Management and Explainable, Trustworthy, Responsible AI",
  tagline: "Black-box models meet model-risk discipline: how to make self-learning AI models explainable, fair, and auditable — without simply oversimplifying them into uselessness.",

  teaches: `<p>Model bias and ethical considerations (the EU's AI Act, three self-learning-model focus areas); maintaining fairness (influenceable vs. non-influenceable fairness outcomes); technical validation of decision-making algorithms (the six-step self-learning-model deployment process); trustworthy AI (differential privacy, federated learning, synthetic data, explainable AI/XAI approaches, four-variable optimization); and an XAI credit-risk case study (SHAP clustering).</p>`,

  why: `<p>This reading directly extends R94's opacity/bias concerns into a practical framework — how do you actually validate, explain, and trust a self-learning model that's constantly evolving? The answer requires new tools (archiving, clustering, Pareto-frontier optimization) beyond traditional model validation (R53).</p>`,

  intuition: `<p>Fairness splits into two very different categories: fairness outcomes that CAN be influenced through model design (e.g., different health insurance premiums by gender based on cost data — a data/design choice), and fairness outcomes that CANNOT be influenced through model design (e.g., spillover gender bias in credit approval reflecting broader societal patterns the model didn't create and can't fix alone). Knowing which category a fairness problem falls into determines whether the FIX belongs inside the model or outside it.</p>
  <p>Self-learning models pose a unique validation challenge: because they constantly EVOLVE, you can't simply validate them once and move on — you need to ARCHIVE the full data history, parameters, and metadata at every version, so you can "rewind" the model to understand why a PAST decision was made. This is the technical backbone of explainability for models that never stop changing.</p>
  <p>Explainable AI (XAI) faces a genuine trade-off: making models interpretable BY DESIGN requires drastic simplification (often too crude for complex real relationships); post-hoc approaches (LIME, SHAP) instead APPROXIMATE what a complex model was doing using game theory — more computationally expensive (a whole SECOND model), but doesn't force the original model to be dumbed down. The optimization approach formalizes the underlying tension: explainability, fairness, accuracy, and speed often conflict, and a Pareto frontier lets you pick your preferred trade-off point rather than pretending you can maximize everything simultaneously.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Model bias and ethical considerations — the EU AI Act and three focus areas",
      def: "The EU's proposed Artificial Intelligence Act (AIA) targets ethical, unbiased AI use, connecting to Basel Pillar 1 (capital requirements) via traditional model-approval techniques (development, periodic validation, change management — covering both static and self-learning models, separating material vs. immaterial changes).",
      example: "Three self-learning-model focus areas: (1) Fraud detection/AML — self-learning AI keeps pace with evolving fraud tactics and REDUCES false alert flags. (2) Trading models — algorithmic trading/robo-advising make capital allocation decisions with LOW stakeholder explainability, making outcomes less trustworthy without process review. (3) Credit risk — extending/denying credit via AI raises major ethical/fairness concerns precisely BECAUSE the process is opaque; the extent of embedded bias is often simply unknown.",
      pitfall: "WANTED bias (intentional, appropriate risk-differentiation built into most risk prediction models) is distinct from unwanted ALGORITHMIC bias (unintentional discriminatory effects sneaking in via model inputs or methodology) — root causes of the latter include training-data errors (outliers, noise) and UNDERREPRESENTED/misrepresented populations in training data.",
      related: [{ r: 94, label: "R94 — algorithmic bias first introduced there as a general regulatory concern" }],
      memory: "Wanted bias = intentional risk differentiation (fine). Algorithmic bias = unintentional discriminatory leakage (the problem) — same word 'bias,' opposite moral status."
    },
    {
      name: "Maintaining fairness — influenceable vs. non-influenceable outcomes",
      def: "Fairness = ensuring equitable/just allocation of benefits and costs while minimizing bias/discrimination/stigma, WITH a built-in accountability layer (ability to contest or seek restitution for unfair decisions).",
      example: "Fairness outcomes CAN be influenced through model design: e.g., different health insurance premiums by gender, based on actual cost data — but with potential bias risk in the underlying data/analysis, addressable via model design choices. Fairness outcomes CANNOT be influenced through model design: e.g., spillover gender bias in credit approval reflecting a broader societal pattern the model didn't create — women receiving higher denial rates for reasons originating OUTSIDE the AI model itself, a bigger issue requiring solutions beyond model redesign.",
      pitfall: "Model developers CANNOT guarantee 'no bias in the final outcome' of a model — some fairness issues have root causes entirely OUTSIDE the model's control. Developers CAN control: limiting unfair biases where addressable, building in accountability mechanisms, and pursuing equitable cost/benefit distribution where the model itself is the source.",
      related: [],
      memory: "Some fairness problems live INSIDE the model (fixable via design); some live OUTSIDE it (in society, in history) — model redesign alone can't fix the second kind."
    },
    {
      name: "Technical validation of decision-making algorithms",
      def: "Validation must expand BEYOND conceptual soundness/plausibility to explicitly check FAIRNESS: review training data for outliers/noise/bias; focus testing on the actual PROBLEM being solved (e.g., AML alert models should focus on false-positive ratios, not just calibration); explicitly identify hard-to-test scenarios (historically unprecedented market conditions); weigh the institution's risk appetite against allowable residual risk; and prioritize EXPLAINABILITY for decisions with critical end-user impact (low explainability/transparency signals potential unfairness needing attention).",
      example: "Six-step self-learning-model deployment process: (1) create an incident management system for model malfunctions, (2) build infrastructure to monitor model/data DRIFT, (3) rigidly stress test, (4) archive ALL historical data/parameters/versions to enable explainability, (5) evaluate using the Pareto optimum (efficiency trade-off line), (6) incorporate identified risks/side effects into existing processes.",
      pitfall: "Self-learning models are constantly EVOLVING, making it genuinely hard to explain how a PAST outcome was derived — this makes retaining the FULL data history, all parameters, and all metadata VITALLY IMPORTANT (not optional), since examining PARAMETER JUMPS across model versions is the only way to 'rewind' and understand why a past decision occurred.",
      related: [{ r: 53, label: "R53 — traditional model validation's conceptual-soundness/backtesting framework, extended here for self-learning models" }],
      memory: "You can't validate a self-learning model once and be done — you have to archive EVERY version so you can rewind and re-examine any specific historical decision."
    },
    {
      name: "Trustworthy AI — privacy approaches",
      def: "Differential privacy: users cannot identify whether any single individual's data point was included/excluded from the dataset — both an anti-discrimination checkpoint AND a fairness-verification roadblock. Federated learning: enables multiple entities to share/combine training data for model testing WITHOUT physically sharing the underlying source information. Synthetic data: AI-generated data (via a GENERATIVE ADVERSARIAL NETWORK/GAN) replicating the real data's statistical properties, supporting collaboration between unaffiliated parties.",
      pitfall: "Synthetic data preserves PRIVACY but does NOT explicitly address FAIRNESS concerns — a common trap treating privacy-preservation and fairness-assurance as the same achievement. They are separate goals requiring separate tools.",
      related: [],
      memory: "Differential privacy, federated learning, synthetic data: three DIFFERENT privacy tools solving three different sharing/verification problems — none of them, individually, solves fairness."
    },
    {
      name: "Explainable AI (XAI) approaches",
      def: "Interpretable-by-design: simplify the model itself to be inherently understandable — flaw: requires TREMENDOUS simplification, often insufficient for complex real-world relationships. Post-hoc approaches — local interpretable model-agnostic explanations (LIME) or SHapley Additive exPlanations (SHAP): apply GAME THEORY to interpolate/approximate what a complex model was doing AFTER the fact — makes the model LESS OPAQUE rather than fully transparent. Concretely: SHAP treats each input variable (e.g., a borrower's debt-to-income ratio, or a trade's counterparty rating) like a 'player' in a cooperative game, and computes that variable's Shapley value — its fair share of credit or blame for pushing the model's output away from its average prediction, averaged across every possible order in which the variables could have been added. That is where the 'game theory' language comes from: it is literally the same mathematics used to split a payoff fairly among coalition members.",
      pitfall: "Post-hoc approaches (LIME/SHAP) require SIGNIFICANT computing power and introduce a SECOND model into the workflow (an approximation model explaining the original) — a genuine operational cost, not a free lunch. An innovative alternative: generate FORECASTED market data highly correlated with actual market data, letting users explore simulated outcomes for explainability using synthetic data resembling the real thing.",
      related: [],
      memory: "Interpretable-by-design: simple but shallow. Post-hoc (LIME/SHAP): powerful but expensive, and it's explaining an APPROXIMATION of the model, not the model itself."
    },
    {
      name: "Optimization: the four-variable Pareto frontier",
      def: "Optimize across FOUR variables simultaneously: explainability, fairness, model accuracy, and model speed (efficiency).",
      pitfall: "Explainability and accuracy typically CONFLICT — this method mathematically produces an efficient PARETO FRONTIER of choices (NONSMOOTH and NONCONVEX), letting users select their preferred trade-off combination (visualized as parallel-coordinate plot lines) rather than pretending all four variables can be maximized simultaneously. Many firms now incorporate FORMAL ETHICS REVIEWS (internal/external algorithmic audits) to verify trustworthiness.",
      related: [],
      memory: "A Pareto frontier doesn't eliminate the explainability-vs-accuracy trade-off — it just lets you CHOOSE which point on that trade-off curve fits your specific situation."
    },
    {
      name: "XAI case study: SHAP clustering in credit risk (EU insurance group)",
      def: "The EU Horizon 2020 project (FIN-TECH program) applied SHAP-based XAI to credit risk management for a European insurance group — grouping (clustering) portfolio constituents with similar outcomes/explanatory variables together (post-hoc explanatory information clustered by observed similarity).",
      example: "Data points at the INTERSECTION of two clusters warrant further investigation (representing 'fuzzy' decision-making). Clusters with NEARLY EQUAL 'yes'/'no' outcomes could indicate a MODEL ERROR (not model accuracy — a frequently tested reversal). The process uses Shapley value decomposition to break down each input variable's contribution to the final outcome — and is MODEL-AGNOSTIC (works regardless of the underlying model type).",
      pitfall: "This entire process can run using ONLY GPU MEMORY (RAPIDS — open-source Python libraries), making it computationally EFFICIENT despite the sophistication. Explainability here means: further information wouldn't increase understanding, the user CAN explain the decision to a third party, documentation exists for TRACEABILITY, the process fosters TRUST, and supervisors have what they need for compliance — explanations must be understandable to ALL stakeholders (developers, validators, risk managers, senior managers, supervisors, AND customers).",
      related: [],
      memory: "Clusters with near-equal 'yes'/'no' splits are a RED FLAG (possible model error), not evidence of balanced/fair decision-making — a frequently tested reversal of intuition."
    }
  ],

  connections: {
    from: [
      { r: 94, why: "Extends the algorithmic bias and opacity concerns raised there into a structured validation/explainability framework." },
      { r: 53, why: "Traditional model validation (conceptual soundness, backtesting) gets extended here specifically for self-learning, constantly-evolving models." }
    ],
    to: [
      { r: 96, why: "This reading's practical XAI/fairness tools become organized into the formal NIST AI Risk Management Framework's govern/map/measure/manage structure." }
    ],
    confused: [
      { what: "Fairness outcomes that CAN vs CANNOT be influenced by model design", how: "Some fairness problems (like a specific pricing variable choice) live INSIDE the model and are fixable via design; others (like broader societal bias patterns) live OUTSIDE the model and require solutions beyond redesigning it." },
      { what: "Interpretable-by-design vs post-hoc (LIME/SHAP) XAI approaches", how: "Interpretable-by-design simplifies the ORIGINAL model (risking oversimplification); post-hoc approaches build a SEPARATE approximation model to explain the original (computationally expensive, doesn't sacrifice the original model's complexity)." },
      { what: "Clusters with near-equal yes/no outcomes: error signal vs fairness signal", how: "Near-equal splits in a SHAP cluster suggest a possible MODEL ERROR requiring investigation — NOT evidence of fair, balanced decision-making, a commonly reversed intuition." }
    ]
  },

  misconceptions: [
    { wrong: "\"Model developers can always design AI models to eliminate all bias from the final outcome.\"", right: "Some fairness issues originate OUTSIDE the model's control (e.g., broader societal bias patterns reflected in credit approval spillover effects) — these cannot be fully addressed through model design alone, only through solutions beyond the model itself." },
    { wrong: "\"Synthetic data generated via a GAN fully resolves both privacy and fairness concerns.\"", right: "Synthetic data preserves PRIVACY (replicating statistical properties without exposing real individual data) but does NOT explicitly address FAIRNESS concerns — the two are separate goals requiring separate solutions." },
    { wrong: "\"Post-hoc XAI methods like LIME and SHAP make the original AI model fully transparent.\"", right: "These methods make the model LESS OPAQUE (via an approximating second model using game theory), not fully transparent — they interpolate what the model likely did, they don't reveal its exact internal logic." },
    { wrong: "\"A SHAP cluster showing a near-equal mix of 'yes' and 'no' outcomes indicates the model is behaving fairly and without bias.\"", right: "A near-equal 'yes'/'no' split within a cluster could actually indicate an ERROR in the self-learning AI model — it signals 'fuzzy,' inconsistent decision-making warranting further investigation, not evidence of balanced fairness." },
    { wrong: "\"Explainability, fairness, accuracy, and speed can all be simultaneously maximized in a well-designed AI model.\"", right: "These variables typically involve real trade-offs (especially explainability vs. accuracy) — the Pareto-frontier optimization approach helps CHOOSE a preferred combination, it doesn't eliminate the underlying trade-off." }
  ],

  highYield: [
    { stars: 5, what: "Fairness outcomes that CAN vs. CANNOT be influenced by model design — the health-insurance-premium vs. credit-approval-spillover examples.", why: "The core conceptual distinction of the fairness section, frequently tested via scenario classification." },
    { stars: 4, what: "Six-step self-learning model deployment process, especially archiving full history/parameters/versions for explainability.", why: "A precise, comprehensive checklist frequently tested for its specific steps." },
    { stars: 4, what: "SHAP clustering: near-equal yes/no clusters signal a MODEL ERROR, not fairness.", why: "A specific, counter-intuitive, frequently tested reversal from the case study." },
    { stars: 3, what: "Interpretable-by-design vs. post-hoc (LIME/SHAP) XAI trade-offs.", why: "A clean two-approach comparison with clear costs/benefits on each side." },
    { stars: 3, what: "Differential privacy, federated learning, synthetic data — distinct tools, and synthetic data's privacy-without-fairness limitation.", why: "A precise three-item list with an important caveat." },
    { stars: 2, what: "Four-variable Pareto frontier optimization (explainability, fairness, accuracy, speed).", why: "A conceptual framework for handling irreducible trade-offs, worth quick recall." }
  ],

  recall: [
    { q: "A credit model shows women receiving higher denial rates than men, and investigation reveals this reflects broader societal credit-history disparities rather than anything specific to the model's variable choices. Can this fairness issue be fixed through model redesign alone?", a: "No — this is an example of a fairness outcome that CANNOT be influenced through model design, since it originates from a broader societal pattern outside the model's control (analogous to the spillover gender bias example in credit approval). Addressing it requires solutions beyond simply redesigning the AI model — the root cause lies in the underlying data/societal conditions, not the model's construction." },
    { q: "Why is archiving the full data history, parameters, and metadata described as 'vitally important' (not merely good practice) for self-learning AI models specifically?", a: "Self-learning models are constantly evolving — unlike a static model, you cannot simply validate it once and trust that validation going forward. To understand WHY a specific past decision was made, you need to be able to 'rewind' the model to its state at that time, examining parameter jumps across versions. Without full historical archives, it becomes impossible to reconstruct or explain past decisions, undermining any fairness or accountability review." },
    { q: "A SHAP-based clustering analysis of a credit risk model shows one cluster with a nearly 50/50 split between 'approve' and 'deny' outcomes. What should this prompt, and why is it NOT evidence of balanced, fair decision-making?", a: "This should prompt further INVESTIGATION into a possible model ERROR — a near-equal split suggests inconsistent, 'fuzzy' decision-making for very similar cases, which is a red flag for a self-learning model malfunction rather than a sign of balanced fairness. Fair decision-making would show CONSISTENT outcomes for similar-profile cases within a cluster, not an essentially random 50/50 split." },
    { q: "Why do post-hoc XAI approaches like LIME and SHAP require significant additional computing power compared to interpretable-by-design models?", a: "Post-hoc approaches introduce a SECOND model into the workflow — a separate approximation model (using game theory) that interpolates what the original, complex model was likely doing to reach its outputs. This means running two computational processes (the original model plus its explanatory approximation) rather than one simplified, inherently interpretable model, at the cost of significant additional compute resources." }
  ],

  hooks: [
    { title: "Inside the model vs. outside the model", text: "Some fairness problems are a bug you can patch (inside the model — a variable choice, a data source). Some are a mirror reflecting the world as it already is (outside the model — societal bias baked into history) — no amount of model redesign fixes the second kind." },
    { title: "Rewind, don't just review", text: "A static model gets validated once. A self-learning model needs a TIME MACHINE — full archives of every parameter and version, so you can rewind to any past moment and ask 'why did it decide THAT, THEN?'" },
    { title: "50/50 isn't fair, it's confused", text: "A cluster split right down the middle between 'yes' and 'no' doesn't mean the model is being even-handed — it usually means the model doesn't actually know what it's doing for those cases, which is a red flag, not a virtue." }
  ],

  summary: `<p><strong>EU AI Act</strong> targets ethical/unbiased AI, ties to Basel Pillar 1; three self-learning focus areas: fraud detection/AML (reduces false alerts), trading models (low stakeholder explainability), credit risk (opaque, unknown bias extent). <strong>Wanted bias</strong> (intentional) vs. <strong>algorithmic bias</strong> (unintentional, from training-data errors/underrepresentation). <strong>Fairness</strong>: outcomes CAN be influenced by design (e.g., data-based pricing) or CANNOT (e.g., societal spillover bias) — know which. <strong>Technical validation</strong>: test the actual problem (not just calibration), identify hard-to-test scenarios, weigh risk appetite, prioritize explainability. <strong>Six-step deployment</strong>: incident management, drift monitoring, stress testing, ARCHIVING (data/parameters/versions), Pareto evaluation, risk incorporation. <strong>Trustworthy AI privacy tools</strong>: differential privacy, federated learning, synthetic data (privacy ≠ fairness). <strong>XAI</strong>: interpretable-by-design (simple but shallow) vs. post-hoc LIME/SHAP (powerful, computationally costly, approximates rather than reveals). <strong>Optimization</strong>: Pareto frontier across explainability/fairness/accuracy/speed. <strong>SHAP clustering case study</strong>: near-equal yes/no clusters signal a MODEL ERROR, not fairness; model-agnostic; explanations must serve ALL stakeholders.</p>`,

  eli5: `<p>Imagine a very experienced but tight-lipped loan officer who has processed a million applications and developed excellent instincts — but when you ask "why did you deny my loan?" she just shrugs and says "it felt wrong." That's a self-learning AI credit model: it may be highly accurate, but it can't easily explain itself, and you can't tell whether her "instincts" have quietly absorbed some unfair pattern (like penalizing a whole neighborhood) versus a genuinely risk-relevant one (like penalizing a genuinely thin credit history). The fix isn't to fire her and hire someone dumber who follows a simple checklist (that's interpretable-by-design — safer to explain, but misses nuance); it's to hire a second person who watches her work, session after session, and reconstructs a plausible explanation for each decision after the fact by testing what changes when you tweak one input at a time (that's post-hoc XAI — LIME/SHAP) — while also keeping a diary of everything she's learned and every case file she's seen, so if a decision is later questioned, you can rewind to exactly what she knew and believed at that moment (that's archiving for self-learning models). In finance terms: the loan officer is the black-box AI, her diary is the parameter/version archive required for explainability, and the second person's after-the-fact reconstruction is the post-hoc SHAP/LIME approximation model.</p>`,

  thinkLike: `<p>A model risk manager reviewing a self-learning AI system does not ask "is this model biased?" as a yes/no question — that question is unanswerable in the abstract. Instead, the manager asks a sequence of narrower, more tractable questions: Where does this specific fairness concern originate — inside the model (a variable, a data source, a threshold I can redesign) or outside it (a societal pattern the model is merely reflecting)? Can I reconstruct, from the archive, exactly what the model believed at the moment of any specific past decision? Does my explainability tooling (interpretable-by-design or post-hoc SHAP/LIME) actually let every relevant stakeholder — from the model developer up through the customer — understand the decision, or does it only satisfy the technical team? And when a diagnostic (like a SHAP cluster) looks suspiciously "balanced," is that actually evidence of fairness, or is it a symptom of the model being confused about genuinely similar cases?</p>
  <p>The exam tests this reading almost entirely through scenario classification and counter-intuitive reversals rather than definitions: a scenario describing societal spillover bias should be flagged as NOT fixable through model redesign alone; a near-50/50 SHAP cluster split should be flagged as a possible ERROR, not a fairness success; and "developers can eliminate all bias" or "synthetic data solves fairness too" should both be flagged as false. Read every scenario question for whether the described fix targets the actual root cause (inside vs. outside the model) before picking an answer.</p>`,

  breakdown: [
    {
      title: "Three self-learning-model focus areas (ethical concerns)",
      points: [
        "Fraud detection / AML — self-learning AI adapts as fraud tactics evolve and reduces false alert flags, but the same adaptiveness makes past decisions harder to explain.",
        "Trading models — algorithmic trading and robo-advising make capital allocation decisions with low explainability to stakeholders, so the outcome is less trustworthy without a way to review the process.",
        "Credit risk — AI extends or denies credit through an opaque process, raising major ethical/fairness concerns precisely because the extent of embedded bias is often simply unknown."
      ]
    },
    {
      title: "Six-step self-learning-model deployment process",
      points: [
        "1. Create an incident management system for when the model malfunctions or behaves unexpectedly.",
        "2. Build infrastructure to monitor model drift (performance degrading) and data drift (the input distribution shifting).",
        "3. Rigidly stress test the model against extreme and unusual scenarios.",
        "4. Archive all historical data, parameters, and versions — this is the only way to later 'rewind' and explain a past decision.",
        "5. Evaluate the model using the Pareto optimum — the efficiency frontier that shows trade-offs among competing goals.",
        "6. Incorporate identified risks and side effects into existing firm processes and requirements, rather than treating them as one-off findings."
      ]
    },
    {
      title: "Trustworthy AI — three privacy approaches",
      points: [
        "Differential privacy — users cannot tell whether any single individual's data point was included in or excluded from the dataset; both an anti-discrimination checkpoint and (paradoxically) a roadblock to verifying fairness, since you can't isolate an individual's outcome to check it.",
        "Federated learning — lets multiple entities combine training data for model testing without physically transferring the underlying source data between them.",
        "Synthetic data (via a generative adversarial network, GAN) — AI-generated data replicating the real data's statistical properties, enabling collaboration between unaffiliated parties; preserves privacy but does NOT by itself address fairness."
      ]
    },
    {
      title: "Two XAI (explainable AI) approaches",
      points: [
        "Interpretable-by-design — build the model itself to be inherently simple and understandable; the flaw is that this level of simplification is usually insufficient for genuinely complex real-world relationships.",
        "Post-hoc approaches (LIME, SHAP) — build a second, separate approximation model that uses game-theory-based methods to interpolate what the original complex model was likely doing; makes the model less opaque (not fully transparent), at the cost of significant extra compute."
      ]
    },
    {
      title: "Four-variable Pareto-frontier optimization",
      points: [
        "Explainability — can stakeholders understand why the model reached its decision.",
        "Fairness — does the model avoid unjust allocation of benefits/costs.",
        "Model accuracy — how well the model predicts the correct outcome.",
        "Model speed / efficiency — how quickly the model can be run and updated.",
        "These four typically conflict (especially explainability vs. accuracy); the Pareto frontier is nonsmooth and nonconvex, and users pick their preferred trade-off point rather than maximizing all four at once."
      ]
    }
  ],

  quiz: [
    {
      q: "A self-learning credit model shows women receiving higher denial rates than men, and investigation traces this to broader societal credit-history disparities rather than to any specific model variable or data source. What is the correct classification of this fairness issue?",
      options: [
        "A fairness outcome that CAN be influenced through model design, like the health-insurance-premium example",
        "A fairness outcome that CANNOT be influenced through model design alone, since its root cause lies outside the model",
        "Wanted bias, since it reflects intentional risk differentiation",
        "A data quality error that would be fixed by better outlier detection"
      ],
      answer: 1,
      why: "This matches the spillover-gender-bias-in-credit-approval example precisely: the root cause is a broader societal pattern the model did not create, so redesigning the model alone cannot fix it. The 'CAN be influenced through model design' answer is the wrong category (that describes issues like data-based pricing choices that ARE fixable via design); the 'wanted bias' answer misapplies that term, which means intentional risk differentiation, not an unaddressed societal spillover; the 'data quality error' answer wrongly reduces a structural fairness issue to a data-cleaning problem."
    },
    {
      q: "Why is archiving the full data history, parameters, and metadata described as 'vitally important' specifically for self-learning AI models?",
      options: [
        "Regulators require archived data for all financial models regardless of type",
        "It allows the firm to retrain the model faster after a system outage",
        "Self-learning models constantly evolve, so archiving is the only way to 'rewind' the model and explain why a specific past decision was made",
        "It reduces the computing power needed to run post-hoc SHAP explanations"
      ],
      answer: 2,
      why: "A static model can be validated once; a self-learning model changes continuously, so understanding a past decision requires reconstructing exactly what the model's parameters were at that point in time — only possible with a full archive. The 'regulators require it for all models' answer is too generic (this is specific to self-learning models per the reading); the 'faster retraining' and 'reduces SHAP compute' answers describe unrelated benefits not tied to the explainability rationale given in the source."
    },
    {
      q: "A SHAP-based clustering analysis of a credit risk model shows one cluster with a nearly 50/50 split between 'approve' and 'deny' outcomes. What does this most likely indicate?",
      options: [
        "The model is behaving fairly and without bias for that group of applicants",
        "A possible error or 'fuzzy,' inconsistent decision-making in the self-learning model that warrants investigation",
        "The cluster contains an unusually diverse set of borrower profiles, which is expected and desirable",
        "The model has successfully balanced its false-positive and false-negative rates"
      ],
      answer: 1,
      why: "The reading explicitly reverses the intuitive reading: a near-equal yes/no split within a cluster of SIMILAR cases suggests the model doesn't consistently know what to do with those cases, a red flag for a model error — not evidence of balanced fairness. The 'behaving fairly and without bias' answer is the classic tempting-but-wrong distractor (mistaking 'balanced outcomes' for 'fair/consistent outcomes'); the 'diverse borrower profiles' and 'balanced error rates' answers are not claims made anywhere in the reading."
    },
    {
      q: "Which statement correctly distinguishes the interpretable-by-design and post-hoc (LIME/SHAP) approaches to Explainable AI (XAI)?",
      options: [
        "Interpretable-by-design simplifies the original model itself; post-hoc approaches build a separate approximation model to explain the original, complex model, using game-theory-based methods",
        "Post-hoc approaches simplify the original model, while interpretable-by-design approaches always require more computing power",
        "Both approaches produce a fully transparent view of the model's exact internal logic",
        "Interpretable-by-design is only usable for self-learning models, while post-hoc approaches only work for static models"
      ],
      answer: 0,
      why: "Interpretable-by-design trades accuracy for built-in simplicity; post-hoc methods (LIME/SHAP) instead add a second, computationally expensive approximation model to interpret the original without shrinking it. The 'post-hoc simplifies the model' answer reverses which approach costs more compute; the 'fully transparent' answer is false — post-hoc approaches make the model 'less opaque,' not fully transparent; the 'restricted to self-learning/static models' answer fabricates a restriction not present in the source."
    },
    {
      q: "According to the reading, which of the following is NOT something an AI model developer can fully control or guarantee?",
      options: [
        "Building in an accountability mechanism to contest or seek restitution for unfair decisions",
        "Ensuring that no bias whatsoever exists in the final outcome of the model",
        "Limiting unfair biases in areas the model design can address",
        "Pursuing an equitable distribution of costs and benefits where the model itself is the source of the outcome"
      ],
      answer: 1,
      why: "Some fairness issues (like societal spillover bias) originate entirely outside the model's control, so developers cannot guarantee zero bias in the final outcome — they can only control the levers described in A, C, and D. This mirrors the official module quiz answer for this exact LO."
    },
    {
      q: "A firm is evaluating a self-learning trading model across explainability, fairness, accuracy, and speed using a Pareto-frontier optimization approach. What is the most accurate description of what this approach delivers?",
      options: [
        "It eliminates the trade-off between explainability and accuracy, allowing both to be maximized simultaneously",
        "It produces a smooth, convex frontier that guarantees a single optimal solution",
        "It produces a nonsmooth, nonconvex frontier of trade-off points, letting the firm select its preferred combination rather than maximizing all four variables at once",
        "It replaces the need for formal ethics reviews and algorithmic audits"
      ],
      answer: 2,
      why: "The reading is explicit that the frontier is nonsmooth and nonconvex, and that the method helps CHOOSE a preferred trade-off combination — it does not eliminate the underlying explainability-vs-accuracy conflict. The 'eliminates the trade-off' answer is the classic false-simultaneous-maximization trap; the 'smooth, convex frontier' answer misstates the frontier's shape; the 'replaces ethics reviews' answer contradicts the reading's note that firms are separately adding formal ethics reviews alongside optimization."
    }
  ],

  sources: [
    { title: "Explainable artificial intelligence (Wikipedia)", url: "https://en.wikipedia.org/wiki/Explainable_artificial_intelligence", note: "Background on interpretable-by-design vs. post-hoc XAI methods, including LIME and SHAP." },
    { title: "Fairness (machine learning) (Wikipedia)", url: "https://en.wikipedia.org/wiki/Fairness_(machine_learning)", note: "Overview of fairness definitions and metrics in ML, useful context for the 'influenceable vs. non-influenceable' distinction." },
    { title: "Differential privacy (Wikipedia)", url: "https://en.wikipedia.org/wiki/Differential_privacy", note: "Explains the formal privacy guarantee referenced in the trustworthy-AI privacy section." },
    { title: "Federated learning (Wikipedia)", url: "https://en.wikipedia.org/wiki/Federated_learning", note: "Explains how multiple parties can train a shared model without pooling raw data." }
  ],

  pdf: { book: 5, query: "proposed the first major regulation targeting artificial intelligence" }
});
