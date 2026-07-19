export default ({
  book: 5, reading: 94,
  session: "Current Issues in Financial Markets",
  title: "Artificial Intelligence and Bank Supervision",
  tagline: "How supervisors approach AI adoption in banking: five advantages, five disadvantages, and the specific regulatory tensions around bias, alternative data, and model opacity.",

  teaches: `<p>The historical evolution of AI and its common financial-sector applications; five advantages AI offers banks and customers; five disadvantages/difficulties; and the specific regulatory issues around AI in modeling/valuation (bias, alternative data, model opacity, overregulation risk).</p>`,

  why: `<p>This reading sets up the fuller AI governance treatment in R95-96 by first cataloging WHY banks are adopting AI and WHERE the friction points are — the foundation for understanding why explainability and formal risk-management frameworks (NIST AI RMF) become necessary.</p>`,

  intuition: `<p>Start with what "AI" actually means here before worrying about advantages and disadvantages. <strong>Artificial intelligence</strong> is intelligence generated directly by a computer rather than a human — the computer, not a person, is doing the reasoning. Two specific techniques matter for this reading: <strong>machine learning</strong>, where the computer effectively writes its own code by finding statistical patterns in training data (rather than a programmer hand-coding every rule), and <strong>neural networks</strong>, layered pattern-recognition structures used to classify text, images, or other unstructured data (e.g., reading a check image to extract a dollar amount, or deciding whether a transaction "looks like" fraud). You already use consumer versions of this every day — Google search ranking results, Netflix's recommendation engine, and ChatGPT's conversational interface are all everyday examples of the same underlying machine-learning/neural-network toolkit that banks are now applying to lending, service, and compliance.</p>
  <p>AI's five banking advantages (cost cutting, on-demand service, fraud detection, AML, KYC) all share a common thread: automating pattern-recognition tasks at a scale humans can't match — flagging one suspicious transaction among millions, or verifying one identity document among thousands, is exactly the kind of repetitive, data-heavy task computers do better and cheaper than people. Its five disadvantages (loss of personal touch, bias risk, opacity, evolving fraud sophistication, uncertain regulation) share an opposite thread: the very automation that creates the advantage also creates a black box that's hard to explain, audit, or regulate. It's the same coin, viewed from two sides — the reason AI is FAST and CHEAP (it reduces everything to numbers and pattern-matches without human judgment or hesitation) is also the reason it can be BIASED and OPAQUE (numbers-only pattern-matching has no innate concept of fairness, and the resulting decision path is often too complex for a human to trace step by step).</p>
  <p>The regulatory tension is genuinely two-sided: algorithmic bias is a real risk (AI can unintentionally perpetuate human biases baked into historical data, even without any explicit intent to discriminate), but overregulation is ALSO a real risk (regulators imposing excessive constraints on technology they don't yet fully understand could stifle beneficial innovation). Regulators are explicitly treating AI-infused models and traditional models as points along a SPECTRUM, not a binary choice — the same risk-management goal (properly monitored, controlled, documented risk) applies to both. That framing matters: a regulator isn't asking "is this an AI model, yes or no" but "how well is this model's risk actually being monitored, controlled, and documented," whatever technique built it.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Historical evolution and financial-sector AI applications",
      def: "Artificial intelligence (AI) is intelligence generated directly by a computer rather than a human. The concepts trace to Alan Turing's 1950 paper; IBM's Deep Blue supercomputer beat world chess champion Garry Kasparov in 1997, roughly 50 years later. Modern advances: machine learning (computers effectively write their own code by learning statistical patterns from data, rather than a person hand-coding every rule) and neural networks (layered pattern-recognition structures that classify text, images, or other data). Familiar consumer-facing examples of these same techniques: Google search ranking, Netflix's recommendation engine, and ChatGPT's human-computer interaction.",
      example: "2019 McKinsey survey: 36% of financial firms automate back-office processes with AI, 32% deploy AI chatbots, 25% use AI for fraud detection/creditworthiness evaluation. 2022 Cornerstone Advisors survey showed somewhat lower adoption (25% process automation, 18% chatbots) — different numbers, same conclusion: AI adoption is real and expected to ACCELERATE.",
      pitfall: "In March 2021, FIVE federal regulators (Fed, OCC, CFPB, FDIC, NCUA) JOINTLY issued a request for information (RFI) on AI's potential financial-sector implications — a notable example of coordinated, proactive regulatory interest even before widespread adoption.",
      related: []
    },
    {
      name: "Five AI advantages for banks and customers",
      def: "(1) Cost cutting — Deloitte estimates the top 2,000 U.S. banks spend $250B annually on customer support; AI chatbots could cut this considerably. (2) On-demand customer service — chatbots, text-recognition check deposits, digital transfers/bill pay, no branch visit required. (3) Fraud detection and prevention — algorithms flag suspicious transactions (e.g., out-of-state/online activity); ML adapts to evolving fraud tactics. (4) Anti-money laundering (AML) — Patriot Act (2001) AML obligations are complex; AI tools (e.g., Symphony AyasdiAI) flag potential AML alerts for human review. (5) Know your customer (KYC) — AI tools (e.g., Socure) streamline identity/address verification requirements.",
      pitfall: "AI does NOT 'stop all fraudulent transactions' — it flags SUSPICIOUS ones for review; fraud prevention is an ongoing arms race, not a solved problem. A common wrong-answer trap treats AI fraud detection as complete/absolute.",
      related: []
    },
    {
      name: "Five AI disadvantages/difficulties",
      def: "(1) Loss of personal touch — some customers strongly prefer human interaction; AI risks commoditizing the customer experience. (2) Lack of control over potential biases — algorithms reduce all data to numbers; UNINTENDED biases can hide in data inputs (e.g., credit scores). (3) Opaque models — many AI processes are a 'black box'; hard to explain HOW a result was derived, a problem for credit applicants seeking an explanation for a denial. (4) Evolving sophistication of fraudsters — as traditional fraud paths get blocked, fraudsters invest more in new schemes, requiring AI to constantly evolve too. (5) Uncertain regulatory landscape — regulation remains an evolving, uncertain backdrop until AI innovations are better understood.",
      pitfall: "Customer hesitancy about AI is driven specifically by PREFERENCE FOR HUMAN INTERACTION (personal touch) — not primarily by fraud-prevention being 'too restrictive' or by full understanding of algorithmic decisions (which are actually OPAQUE, the opposite of well-understood).",
      related: ["Regulatory issues in AI modeling/valuation"],
      memory: "Five advantages, five disadvantages — the SAME automation that creates the cost/speed advantage also creates the opacity/bias disadvantage. It's one coin, two sides."
    },
    {
      name: "Regulatory issues in AI modeling and valuation",
      def: "Regulators treat traditional and AI-infused models as points along a SPECTRUM (not a binary choice) — the goal is appropriately monitored, controlled, documented risk, regardless of model type.",
      example: "Potential for bias: algorithmic bias/discrimination occurs when code isn't explicitly designed with fairness in mind — the algorithm can unintentionally perpetuate human biases (e.g., racism) embedded in historical data, even with no discriminatory INTENT; the Equal Credit Opportunity Act is one existing consumer protection. Evolution in credit scores: AI can incorporate a much WIDER dataset than traditional models, potentially EXPANDING credit access — but the outcome depends entirely on WHAT data is used. Alternative datasets: nontraditional sources (rent/utility payment timeliness, bank account cash flow patterns) can expand credit access, but risk pushing into social media/web browsing data, raising PRIVACY concerns and potential conflicts with free-expression norms — some mortgage regulators (FHA, HUD, Fannie Mae, Freddie Mac) explicitly EXCLUDE alternative data from mortgage decisions, though many OTHER credit applications have no such limits. Model opacity: the black-box nature challenges regulators historically focused on BOTH process and outcome, not outcome alone. The urge to overregulate: regulators risk imposing EXCESSIVE constraints on technology not yet fully understood, potentially stifling beneficial innovation.",
      pitfall: "Algorithmic bias does NOT require intentional discriminatory design — it can arise UNINTENTIONALLY from the data inputs themselves, since 'algorithms are designed to crunch numbers, not promote fairness.' This is a critical distinction: bias risk exists even with entirely good-faith model design.",
      related: [],
      memory: "Overregulation and underregulation are BOTH live risks here — too little oversight lets algorithmic bias slip through unnoticed; too much oversight (on a technology regulators don't yet fully understand) can stifle genuinely beneficial innovation."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 95, why: "The opacity/bias tensions identified here directly motivate the explainable, trustworthy, responsible AI framework developed next." },
      { r: 96, why: "These same regulatory concerns (bias, data governance, opacity) become the structured NIST AI RMF categories (govern/map/measure/manage)." },
      { r: 53, why: "Model risk management's error-vs-misuse framework applies directly to AI model governance." }
    ],
    confused: [
      { what: "Algorithmic bias from intentional design vs. from data inputs", how: "The reading is explicit: bias typically arises UNINTENTIONALLY from data inputs (e.g., historical patterns embedding human bias), not from deliberate discriminatory code design — 'algorithms crunch numbers, they don't promote fairness' either way." },
      { what: "Model opacity vs. lack of regulation", how: "These are DISTINCT problems: opacity is a technical/structural feature of how AI models work (black box); regulatory uncertainty is a separate, evolving policy question about HOW to oversee that opacity — one doesn't cause the other, though opacity makes regulation harder." }
    ]
  },

  misconceptions: [
    { wrong: "\"AI fraud-detection algorithms can catch and stop all fraudulent transactions.\"", right: "AI flags SUSPICIOUS transactions for review — it does not stop all fraud, and fraud prevention is a continuously evolving arms race as fraudsters adapt their methods." },
    { wrong: "\"Algorithmic bias in AI credit models requires that the algorithm be intentionally designed to discriminate.\"", right: "Algorithmic bias typically arises UNINTENTIONALLY from the underlying data inputs (which may embed historical human biases) — the algorithm doesn't need to be deliberately designed to discriminate for biased outcomes to occur." },
    { wrong: "\"All credit applications are free to use alternative data sources like social media activity for underwriting decisions.\"", right: "Certain mortgage-specific regulators (FHA, HUD, Fannie Mae, Freddie Mac) explicitly EXCLUDE alternative data sources from mortgage decisions — though many OTHER (non-mortgage) credit applications currently have no such restriction." },
    { wrong: "\"Regulators should impose maximum oversight on AI in banking to minimize risk.\"", right: "The reading explicitly flags 'the urge to overregulate' as a genuine risk — excessive constraints on a technology regulators don't yet fully understand could stifle beneficial innovation; the goal is appropriately calibrated, not maximal, oversight." }
  ],

  highYield: [
    { stars: 4, what: "Five AI advantages and five disadvantages for banks — full lists, individually testable.", why: "The core organizing framework of this reading, frequently tested via classification questions." },
    { stars: 4, what: "Algorithmic bias as an UNINTENTIONAL consequence of data inputs, not deliberate design.", why: "The single most important conceptual nuance in the regulatory-issues section." },
    { stars: 3, what: "Alternative data sources' privacy/free-expression tension and mortgage-specific exclusions (FHA, HUD, Fannie Mae, Freddie Mac).", why: "A specific, precisely testable regulatory carve-out." },
    { stars: 3, what: "The overregulation risk alongside the bias risk — both are live concerns, not just one.", why: "A balanced, two-sided conceptual point frequently tested." }
  ],

  recall: [
    { q: "A bank's AI-driven credit scoring model shows a statistically detectable bias against a protected group, even though no one on the development team intended any discriminatory outcome. How does this happen?", a: "Algorithmic bias can arise entirely from the DATA INPUTS the model is trained on — if historical data embeds patterns reflecting past human bias (e.g., in lending, employment, or other outcomes), the algorithm will learn and perpetuate those patterns even without any intentional design to discriminate. Since algorithms are built to optimize numerical patterns, not to actively promote fairness, bias can emerge as an unintended byproduct of the data itself." },
    { q: "Why might including social media activity or web browsing history as 'alternative data' in a credit model be more controversial than including rent payment history?", a: "While alternative data sources like rent/utility payment timeliness are relatively narrow, financially-relevant signals, expanding into social media or web browsing activity raises broader consumer PRIVACY concerns and potential conflicts with free-expression norms, since it draws on personal behavior far removed from traditional financial signals. This is why some regulators (FHA, HUD, Fannie Mae, Freddie Mac) specifically exclude alternative data from mortgage decisions altogether, even as other credit contexts remain more permissive." },
    { q: "Why do regulators describe AI adoption in banking as presenting BOTH an under-regulation risk and an over-regulation risk?", a: "Under-regulation risk: algorithmic bias, model opacity, and data-privacy issues could go unchecked, harming consumers or creating systemic risks that go undetected due to the black-box nature of AI models. Over-regulation risk: because AI technology is still not fully understood by regulators, imposing excessive constraints too early could stifle genuinely beneficial innovation (cost savings, expanded credit access, better fraud detection) before its risks and benefits are properly balanced — regulators must calibrate carefully between these two failure modes." }
  ],

  hooks: [
    { title: "One coin, two faces", text: "Every AI advantage (speed, scale, pattern-detection) has a matching disadvantage (opacity, bias risk, depersonalization) — it's the same underlying automation, viewed from the customer's side and the regulator's side." },
    { title: "Bias without a villain", text: "Nobody has to WANT to discriminate for an AI model to end up doing so — biased historical data is enough on its own. The absence of bad intent doesn't mean the absence of bad outcomes." }
  ],

  summary: `<p><strong>AI adoption</strong>: accelerating in banking (back-office automation, chatbots, fraud/credit evaluation); five regulators jointly issued an RFI (March 2021). <strong>Five advantages</strong>: cost cutting, on-demand service, fraud detection, AML, KYC. <strong>Five disadvantages</strong>: loss of personal touch, bias risk, model opacity, evolving fraud sophistication, uncertain regulation. <strong>Regulatory issues</strong>: algorithmic bias (UNINTENTIONAL, arising from data inputs, not necessarily design), evolving credit scores (wider datasets, access-expanding but data-dependent), alternative datasets (privacy/free-expression tension; mortgage regulators exclude them, others don't), model opacity (black-box challenge to process-focused regulation), and the overregulation risk (stifling innovation on a not-yet-understood technology). Regulators treat AI and traditional models as a SPECTRUM, aiming for properly monitored/controlled/documented risk regardless of model type.</p>`,

  eli5: `<p>Imagine hiring a new bank teller who is superhumanly fast, never gets tired, and can check a thousand transactions a second for fraud — but who can't explain WHY they made any particular decision, and who learned everything they know by reading a giant pile of the bank's old paperwork, including whatever bad habits or unfair patterns were baked into that old paperwork. That teller is amazing at catching a stolen credit card being used at 3 a.m. in another state, and never needs a lunch break to verify your address for a new account. But if that teller quietly starts declining loan applications from one neighborhood more often — not because anyone told them to, but because the old paperwork they learned from happened to reflect decades of unequal lending — nobody can just ask them "why did you do that?" and get a straight answer, because even the teller doesn't fully know. In finance terms: the teller's speed and tirelessness are AI's advantages (cost cutting, on-demand service, fraud/AML/KYC automation), and the inability to explain a decision or notice its own learned biases is AI's core disadvantage (model opacity and unintended algorithmic bias) — the exact same "read a huge pile of past data and act fast" trait produces both.</p>`,

  thinkLike: `<p>A bank supervisor evaluating an AI-driven process doesn't start by asking "is this model AI or not?" — that's the wrong question, because regulators explicitly treat traditional models and AI-infused models as points on one SPECTRUM, not a binary. The real questions are always the same ones asked of any model: is the risk it creates properly MONITORED, CONTROLLED, and DOCUMENTED? Can someone explain, after the fact, roughly why a given output occurred? What data went into training it, and could that data itself be carrying forward a pattern of unfair treatment (even with zero intent to discriminate — "algorithms are designed to crunch numbers, not to ensure equal access")? A risk manager also has to hold two opposing worries simultaneously without collapsing into either one: under-regulating AI lets bias, opacity, and privacy problems go unchecked, while over-regulating a technology regulators "do not fully understand yet" can smother genuinely useful innovation (cheaper service, better fraud catches, wider credit access) before its risks are even well understood. On the exam, GARP tests this two-sidedness directly — expect a question that offers "regulators should maximize oversight" as a tempting-sounding but WRONG answer, and expect the bias-related questions to hinge on the UNINTENTIONAL nature of algorithmic bias (arising from data inputs, not from someone deliberately coding discrimination in).</p>`,

  breakdown: [
    {
      title: "Five AI advantages for banks and customers",
      points: [
        "Cost cutting — Deloitte estimates the top 2,000 U.S. banks spend $250 billion a year on customer support; AI chatbots can cut that materially.",
        "On-demand customer service — chatbots, check deposit via text/image recognition, and digital transfers/bill pay mean no branch visit or business-hours constraint.",
        "Fraud detection and prevention — algorithms flag suspicious activity (e.g., an out-of-state or online transaction) and adapt as fraud tactics evolve.",
        "Anti-money laundering (AML) — the Patriot Act (2001) imposes complex AML obligations; tools like Symphony AyasdiAI flag potential AML alerts for a human to review.",
        "Know your customer (KYC) — tools like Socure (New York-based) streamline identity and address verification requirements banks must meet."
      ]
    },
    {
      title: "Five AI disadvantages/difficulties",
      points: [
        "Loss of personal touch — some customers strongly prefer human interaction; heavy AI use risks commoditizing the customer experience and reducing differentiation between banks.",
        "Lack of control over potential biases — all inputs get reduced to numbers, and unintended biases can hide inside data like credit scores.",
        "Opaque models — many AI processes are a black box; hard to explain HOW a result was reached, which is a real problem when a denied credit applicant wants an explanation.",
        "Evolving sophistication of fraudsters — as traditional fraud paths get blocked, fraudsters invest more in new schemes, so AI defenses must keep evolving too.",
        "Uncertain regulatory landscape — regulation stays an evolving, uncertain backdrop until AI innovations are better understood by regulators."
      ]
    },
    {
      title: "Five regulatory issues in AI modeling and valuation",
      points: [
        "Potential for bias — algorithmic bias (a.k.a. algorithmic discrimination) can arise unintentionally from data inputs, even where an existing law like the Equal Credit Opportunity Act applies.",
        "Evolution in credit scores — AI can weigh a much wider dataset than traditional scoring, which could expand credit access, but the outcome depends entirely on what data is used.",
        "Use of alternative datasets — nontraditional signals (rent/utility payment timeliness, bank account cash-flow patterns) can expand access but risk pushing into social media or web-browsing data, raising privacy and free-expression concerns; mortgage regulators (FHA, HUD, Fannie Mae, Freddie Mac) explicitly exclude alternative data, but many other credit contexts do not.",
        "Model opacity — AI operates as a black box, challenging regulators who have historically scrutinized both the decision PROCESS and the outcome, not the outcome alone.",
        "The urge to overregulate — imposing excessive constraints on a technology regulators don't yet fully understand risks stifling beneficial innovation."
      ]
    }
  ],

  quiz: [
    {
      q: "According to the reading, artificial intelligence adoption in the financial sector is best described as:",
      options: ["A completely new idea regulators have not yet noticed", "Currently minimal and expected to stay flat", "Expanding, with regulators already taking proactive notice", "Fully adopted across all customer-service channels"],
      answer: 2,
      why: "Both cited surveys (McKinsey 2019, Cornerstone Advisors 2022) show meaningful but still partial adoption expected to accelerate, and five federal regulators jointly issued an RFI in March 2021 — proactive, not reactive, notice. 'Fully adopted' overstates the surveyed percentages (well under half of firms for any single use case), and 'not yet a focus of regulators' directly contradicts the joint RFI."
    },
    {
      q: "Which of the following is NOT one of the five advantages AI offers banks and their customers?",
      options: ["Stopping all fraudulent transactions with certainty", "Cutting customer-support costs via chatbots", "Streamlining KYC identity verification", "Flagging suspicious activity for anti-money-laundering review"],
      answer: 0,
      why: "AI flags SUSPICIOUS transactions for human review — it does not stop all fraud; fraud prevention is an ongoing arms race as fraudsters adapt. The other three (cost cutting, KYC, AML) are genuine listed advantages, making 'stopping all fraud with certainty' the one false/overstated claim."
    },
    {
      q: "A bank's AI credit-scoring model produces a statistically detectable bias against a protected group, even though no developer intended any discriminatory outcome. What does the reading say caused this?",
      options: ["The algorithm was deliberately coded to discriminate", "The bias arose unintentionally from patterns embedded in the historical training data", "Algorithmic bias cannot occur without explicit intent", "The model used only traditional, non-AI inputs, which are inherently unbiased"],
      answer: 1,
      why: "The reading is explicit that algorithms 'are designed to crunch numbers, not to ensure equal access to credit' — bias typically comes from the data inputs (which may embed historical human bias), with no deliberate discriminatory design required. Options claiming intent is required or that bias needs no explanation are the classic distractor pattern the exam uses here."
    },
    {
      q: "Why do FHA, HUD, Fannie Mae, and Freddie Mac specifically exclude alternative data sources (e.g., social media or web-browsing activity) from mortgage credit decisions, while many other credit applications do not have this restriction?",
      options: ["Alternative data is always illegal to use in any credit decision", "Mortgage regulators are simply more technologically advanced than other regulators", "These sources raise privacy and free-expression concerns severe enough to warrant an explicit mortgage-specific carve-out", "Rent and utility payment data is inherently less reliable than social media data"],
      answer: 2,
      why: "The reading ties the mortgage-specific exclusion directly to privacy concerns and potential conflicts with free-expression norms as alternative data pushes into social media/browsing behavior — a targeted carve-out, not a blanket ban across all credit products (which remains the trap in the other options)."
    },
    {
      q: "A colleague argues: 'Regulators should impose the maximum possible oversight on AI in banking to eliminate risk.' What is the strongest objection the reading raises to this position?",
      options: ["Regulators already fully understand AI, so no further oversight is needed", "Excessive constraints on a technology not yet fully understood by regulators risk stifling beneficial innovation", "AI in banking poses no risks that require oversight", "Maximum oversight is required by the Equal Credit Opportunity Act"],
      answer: 1,
      why: "The reading explicitly flags 'the urge to overregulate' as a live risk alongside underregulation — the goal is appropriately calibrated oversight, not maximal oversight, precisely because regulators do not yet fully understand the technology they'd be constraining. It never claims zero risk or full regulatory understanding."
    },
    {
      q: "Per Deloitte's estimate cited in the reading, roughly how much do the top 2,000 U.S. banks spend annually on customer support inquiries, a cost AI chatbots could considerably reduce?",
      options: ["$25 million", "$2.5 billion", "$250 billion", "$2.5 trillion"],
      answer: 2,
      why: "Deloitte estimates $250 billion annually across the top 2,000 U.S. banks. $25 million and $2.5 billion understate the figure by orders of magnitude, and $2.5 trillion overstates it by roughly 10x — a classic order-of-magnitude distractor set for a memorized figure."
    }
  ],

  sources: [
    { title: "Federal Reserve, OCC, CFPB, FDIC, NCUA — Request for Information on AI (March 2021)", url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20210329a.htm", note: "The original joint regulatory RFI referenced in the reading, showing the five agencies' proactive interest in AI's financial-sector implications." },
    { title: "Equal Credit Opportunity Act", url: "https://en.wikipedia.org/wiki/Equal_Credit_Opportunity_Act", note: "Background on the existing consumer-protection law the reading cites as relevant to algorithmic bias in credit decisions." },
    { title: "Algorithmic bias", url: "https://en.wikipedia.org/wiki/Algorithmic_bias", note: "Deeper background on how bias can enter automated decision systems unintentionally through training data, extending the reading's core regulatory concern." },
    { title: "Artificial Intelligence (AI) — Investopedia", url: "https://www.investopedia.com/terms/a/artificial-intelligence-ai.asp", note: "Accessible primer on machine learning and neural networks for readers who want the underlying technology explained further." }
  ],

  pdf: { book: 5, query: "Artificial intelligence (AI) is a form of intelligence" }
});
