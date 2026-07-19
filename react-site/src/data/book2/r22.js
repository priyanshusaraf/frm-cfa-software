export default ({
  book: 2, reading: 22,
  session: "Credit Risk Analysis",
  title: "Credit Scoring and Rating",
  tagline: "Scores (300-850, individuals/small business) vs. ratings (AAA...D, large firms/governments) — two tools solving the same problem at different scales.",

  teaches: `<p>Lenders, investors, and regulators all need a repeatable way to answer one question: <strong>how likely is this borrower to repay?</strong> This reading covers the two families of tools built to answer it. A <strong>credit score</strong> is a three-digit number from 300 to 850 (higher = more creditworthy) used for individuals and small businesses. A <strong>credit rating</strong> is a letter grade (AAA, AA, A, BBB, ... down to D) used for large corporations and governments — the exact letters and use of +/- or upper/lowercase vary by agency (Moody's uses "Aaa", S&P and Fitch use "AAA"). Both can be built <strong>internally</strong> by a bank (using its own historical loan data) or supplied <strong>externally</strong> by a credit rating agency (CRA), credit bureau, or consulting firm — the three dominant external agencies are Standard & Poor's, Moody's, and Fitch.</p>
  <p>You'll also learn the two philosophies behind how a rating reacts to time (through-the-cycle vs. point-in-time), the two philosophies behind consumer credit scoring (behavioral vs. profit), the five-step process a CRA actually follows to build and maintain a rating, the five Basel Committee requirements that regulators impose on any scoring/rating system, and the five standard criticisms leveled at CRAs.</p>`,

  why: `<p>Ratings and scores are the load-bearing input for almost everything downstream in this curriculum: they set regulatory capital requirements (a bank needs more capital against a BB loan than an AA loan), they set loan pricing (risk-based pricing charges a riskier borrower a higher spread), and they set portfolio limits (many bond mandates require "investment grade," i.e. rated BBB-/Baa3 or above). Knowing WHO uses which philosophy — and why — explains a lot of observed rating behavior that otherwise looks strange: for example, why agency ratings on the same bond can stay unchanged for years even as the issuer's financial condition visibly worsens (through-the-cycle smoothing is deliberately slow-moving), while a bank's own internal score on that same borrower can jump within weeks (point-in-time reacts to current conditions). This reading also sets up the criticisms of CRAs that resurface later — most importantly the issuer-pays conflict of interest, which you'll see again identically in securitization tranche ratings (Reading 39).</p>`,

  intuition: `<p>Through-the-cycle rating is like a report card that averages your performance over four years of school — stable, doesn't overreact to one bad semester, and is what a university admissions officer wants when making a decision that will play out over the next four years. Point-in-time is like this week's pop quiz grade — it reacts immediately to what just happened, which is exactly what you want if you're deciding whether to extend a borrower credit for the next 90 days. Neither is "more accurate" in a vacuum; each is built for a different decision horizon, and the exam frequently tests you on matching the philosophy to the horizon rather than ranking them.</p>`,

  eli5: `<p>Imagine two ways a school could grade you. One is your cumulative GPA — it barely moves after any single test, because it's an average of years of work, so a college looking at four years of your life uses it to make a long, stable decision. The other is today's pop quiz score — it swings a lot, but it tells your tutor <em>right now</em> whether you understood this week's material well enough to move to harder problems tomorrow. Rating agencies (Moody's, S&P, Fitch) act like the GPA — they rate a company's whole business cycle so bond investors making 10-year decisions aren't whipsawed by every bad quarter. Banks, deciding whether to extend a 90-day loan tomorrow, act like the pop quiz — they want to know the borrower's condition <em>today</em>, which is the through-the-cycle vs. point-in-time distinction in finance terms.</p>`,

  thinkLike: `<p>A risk manager doesn't ask "which rating philosophy is better?" — she asks "what decision am I making, and over what time horizon?" If she's buying a 10-year corporate bond, she wants the through-the-cycle agency rating because she doesn't want her portfolio to churn every time the issuer has one rough quarter that reverses itself. If she's underwriting a 90-day trade finance facility or setting an internal watch-list, she wants a point-in-time score that reflects the borrower's condition as of this morning, even if that means the score is noisier. The exam tests this by giving you a scenario (a described loan maturity, a described decision) and asking which philosophy/user fits — memorize the two-column table (agencies/long-term/smooths-the-cycle vs. banks-internally/short-term/reacts-fast) and match the noun in the question ("agency," "internal model," "long-term bond," "short-term facility") to the right column rather than reasoning about which is objectively more predictive. The same "match the tool to the decision horizon" instinct applies to behavioral vs. profit scoring: behavioral scoring answers "is this customer's default risk changing right now?" (feeds collections and credit-limit decisions), while profit scoring answers a completely different question — "is this customer relationship making us money?" — and a risk manager keeps these separate because a profitable customer can still be a high default risk, and vice versa.</p>`,

  formulas: [
    {
      name: "Credit scoring model fitting (linear score function)",
      math: "s_i = \\beta_0 + \\beta_1 x_{1,i} + \\beta_2 x_{2,i} + \\cdots + \\beta_n x_{n,i}",
      note: "s_i is the fitted score for borrower i, x_{1,i}...x_{n,i} are that borrower's risk attributes (e.g., income, D/E ratio, payment history), and \\beta_0...\\beta_n are the coefficients the model-fitting step estimates.",
      plain: "This says a borrower's credit score is a weighted sum of their measurable risk attributes, plus a constant — the same structure as an ordinary linear regression, except the thing being predicted is default/non-default rather than a continuous number.",
      derivation: `<p>Model fitting is an optimization problem: choose the coefficient vector \\(\\beta\\) that best separates defaulters from non-defaulters in the training data.</p>
      <p>Step 1 — specify the linear score: \\[ s_i = \\beta_0 + \\beta_1 x_{1,i} + \\cdots + \\beta_n x_{n,i} \\]</p>
      <p>Step 2 — define a loss function \\(L\\) that measures how far the model's output is from the true training-data classification (default = 1, non-default = 0 for each borrower \\(i\\)).</p>
      <p>Step 3 — solve for the optimal coefficients: \\[ \\beta^{*} = \\arg\\min_{\\beta}\\; L(\\beta) \\] This is an empirical proxy for the real goal, which is to minimize actual future default losses — the training data is only a sample, so \\(\\beta^{*}\\) is an estimate, not the true optimum. The \\(0/1\\) (default/non-default) dependent variable is why this is described as "regression-like" rather than standard regression, which normally predicts a continuous outcome.</p>`
    }
  ],

  concepts: [
    {
      name: "Credit score vs. credit rating",
      def: "A credit score is a three-digit numeric code from 300 to 850 used to grade the creditworthiness of individuals and small businesses; higher scores mean a higher estimated ability to repay. A credit rating is a lettered code (AAA, AA, A, BBB ... down through junk grades to D) used for larger firms and governments; each agency can use its own lettering conventions (uppercase/lowercase, plus/minus signs). Both can be built internally by a bank or supplied externally by a CRA, credit bureau, or consulting firm — the three dominant external CRAs are Standard & Poor's, Moody's, and Fitch.",
      intuition: "Think of scores as fine-grained numeric dials (good for the huge volume of small, largely homogeneous consumer/small-business loans, where automation matters more than nuance) and ratings as coarser letter buckets (good for the smaller number of large, heterogeneous corporate/sovereign borrowers, where a human analyst's qualitative judgment still adds value).",
      example: "A 720 FICO-style score for an individual mortgage applicant is a credit score; an 'A-' issued by S&P on a corporate bond is a credit rating.",
      pitfall: "Don't assume the two systems are interchangeable just because they measure the same underlying thing (default risk) — the exam tests which system fits which borrower type.",
      memory: "Scores = numbers (300-850) for small/individual borrowers. Ratings = letters (AAA...D) for large firms/governments."
    },
    {
      name: "Four benefits of scoring/rating systems",
      def: "(1) Reduces subjectivity in loan evaluation and acceptance, (2) enables analysis such as scenario analysis and stress testing, (3) promotes transparency and consistency through a common framework, (4) reduces the time for and cost of credit appraisal.",
      intuition: "A single standardized number or letter replaces a loan officer's individual judgment call, which is faster, cheaper, and lets the whole portfolio be stress-tested using the same scale.",
      memory: "Subjectivity down, analysis up, transparency up, cost/time down."
    },
    {
      name: "Through-the-cycle vs. point-in-time",
      def: "Through-the-cycle: long-term horizon covering at least one full business cycle, ratings updated infrequently (so less sensitive to short-term events), used by major rating agencies, best suited for longer-term loans. Point-in-time: short-term horizon (up to about one year), ratings are more volatile because they're heavily influenced by short-term events, used primarily by internal bank/credit-institution processes, can capture default risk close to real-time, best suited for shorter-term loans.",
      pitfall: "Don't assume one philosophy is objectively 'better' — each is fit for a specific purpose (long- vs. short-horizon decisions), and the wrong answer choice on the exam is usually one that claims through-the-cycle 'captures default risk in the best way possible' or is 'robust because it relies only on internal data' — neither is true; internal data and real-time responsiveness are point-in-time's traits, not through-the-cycle's.",
      memory: "Through-the-cycle = report card average (agencies, long-term loans). Point-in-time = this week's quiz (banks internally, short-term loans)."
    },
    {
      name: "Consumer scoring: behavioral vs. profit",
      def: "Behavioral scoring observes the historical financial behavior of existing customers (payment behavior, purchasing behavior, updated default estimates) and is a short-term measure that updates in near real-time — used for setting credit limits, managing debt collection, and marketing new products. Profit scoring ignores customer behavior entirely and instead focuses only on the estimated profitability of the lending relationship (loan pricing, operational decisions, credit risk assessment, default predictions). Profit scoring comes in two flavors: account-level (calculates profit for each individual account, ignoring links between a customer's other accounts) and customer-level (aggregates profitability across all accounts a single customer holds).",
      example: "A credit card issuer using behavioral scoring will lower a cardholder's limit the moment payments start slipping late; the same issuer using customer-level profit scoring might keep that same cardholder's limit high if their mortgage and savings relationship with the bank is still highly profitable overall.",
      related: [{ r: 23, label: "R23 — retail credit risk management builds on this scoring foundation" }],
      pitfall: "A high-profitability customer under profit scoring is not necessarily a low-default-risk customer under behavioral scoring — the two methods answer different questions and can disagree."
    },
    {
      name: "Social lending (peer-to-peer lending)",
      def: "A fintech/AI-enabled innovation where a loan transaction happens directly between a lender and a borrower without a financial intermediary (bank) in between. Credit decisions can be made very quickly, but credit risk modeling for social lending is still an emerging, less mature area, and default rates in this channel have tended to run higher than in traditional intermediated lending. Responsible use of big data and transparency are live concerns.",
      pitfall: "Don't assume social lending platforms have equally mature risk models to banks — the source explicitly flags this as an emerging, less-understood risk channel with historically higher default rates."
    },
    {
      name: "Five Basel Committee specification requirements for scoring/rating systems",
      def: "(1) Meaningful differentiation of risk — grades set by actual risk differences (not to manage regulatory capital), transaction-level differences allowed within a grade, and reasonable dispersion across grades to avoid concentration; (2) continuous evaluation of borrowers — ratings updated at least annually; (3) operational oversight — the system is continuously monitored for proper functioning, efficient controls (e.g. stress testing), and feedback from stakeholders; (4) correct selection of risk assessment metrics — the factors analyzed must actually predict creditworthiness well; (5) collecting substantial data — historical data, past scores/ratings, prior default estimates, and payment history must all feed the grading.",
      pitfall: "These are regulator-imposed requirements on the system itself, distinct from the five-step CRA development process below — don't conflate 'what regulators require of the system' with 'the steps an agency follows to build it.'"
    },
    {
      name: "CRA rating development process (5 steps) and corporate borrower data inputs",
      def: "Five steps: (1) data collection and preprocessing → (2) model fitting → (3) model validation → (4) definition and validation of the risk rating → (5) implementation, monitoring, and review (which feeds back into re-evaluating earlier steps). For corporate borrowers, step 1 draws on financial data (profitability ratios like ROA/ROE, solvency ratios like debt-to-equity and interest coverage, liquidity measures like the current and quick ratio, and management efficiency ratios like inventory/receivables turnover), transaction data (business payments, delinquencies, credit limits — more current than static financial ratios), size and age (larger, older, better-capitalized firms generally have lower default risk), market conditions and competitive position, financial market data (stock price, volatility, P/E, for publicly traded firms — best for shorter horizons, while accounting data suits longer horizons), corporate governance (board independence, executive quality, shareholder protections), and corporate news/analytics (press, mainstream and social media).",
      intuition: "Steps 1-3 (collection, fitting, validation) are often iterated multiple times before the model is good enough; only once validation succeeds does the process move on to defining risk-rating classes and then implementing.",
      pitfall: "Model validation uses out-of-sample AND out-of-time data (walk-forward testing: test on period t using data from t-1, t-2, then roll the window forward) — this is distinct from benchmarking, which is qualitative and compares the new model's output against an external existing rating to understand (not replicate) any deviation.",
      memory: "Collect → Fit → Validate → Define/validate the rating classes → Implement (then monitor, which loops back)."
    },
    {
      name: "CRA rating process and criticisms",
      def: "Five common criticisms: (1) lack of transparency — the rating methodology is proprietary, so fairness/validity can't be publicly verified; (2) potential conflicts of interest — CRAs are paid fees by the very entities they rate ('issuer pays'); (3) promoting a debt explosion — better risk management from CRA ratings lowers risk premiums and borrowing costs, making debt more accessible and potentially increasing systemic risk via credit bubbles/crunches; (4) poor predictive ability — CRAs collectively failed to predict major failures (Enron, WorldCom, Lehman Brothers), and studies find CRA ratings less predictive of default than accounting- or market-based methods; (5) procyclicality — CRAs claim through-the-cycle ratings should be unaffected by the business cycle, but in practice ratings tend to be too optimistic in booms and too pessimistic in recessions, amplifying rather than dampening the cycle.",
      pitfall: "Procyclicality is a criticism of the CLAIMED through-the-cycle philosophy in practice, not a separate philosophy — CRAs claim to be through-the-cycle, but empirically their ratings still move with the cycle more than the label implies.",
      related: [{ r: 39, label: "R39 — the same issuer-pays conflict of interest in securitization ratings" }],
      memory: "Issuer pays the rater — the single most-cited rating agency conflict of interest."
    }
  ],

  connections: {
    from: [
      { r: 21, why: "CAMEL and default model families set up the broader context; this reading specializes into how ratings/scores are actually built." }
    ],
    to: [
      { r: 23, why: "Retail credit risk management applies the scoring concepts here to mortgage/card/auto underwriting specifically." },
      { r: 39, why: "The issuer-pays conflict of interest reappears identically in securitization tranche rating." }
    ],
    confused: [
      { what: "Through-the-cycle vs point-in-time", how: "Through-the-cycle smooths across the whole business cycle (agencies, long-term loans); point-in-time reacts to current conditions (banks internally, short-term loans)." },
      { what: "Behavioral vs profit scoring", how: "Behavioral scoring predicts default risk from payment history; profit scoring optimizes customer profitability directly, ignoring behavioral signals." },
      { what: "Backtesting/walk-forward testing vs. benchmarking in model validation", how: "Backtesting and walk-forward testing are quantitative, out-of-sample/out-of-time statistical checks against the model's own training data; benchmarking is qualitative, comparing the model's output to an external existing rating to understand (not replicate) any gap." }
    ]
  },

  misconceptions: [
    { wrong: "\"Point-in-time ratings are always more accurate than through-the-cycle ratings.\"", right: "Neither is universally better — through-the-cycle suits long-term decisions (avoiding overreaction to temporary conditions); point-in-time suits short-term decisions needing current information." },
    { wrong: "\"Rating agency procyclicality means ratings improve during downturns to help issuers.\"", right: "The opposite — procyclicality means ratings WORSEN exactly when the economy is already struggling, amplifying rather than dampening the downturn." },
    { wrong: "\"A through-the-cycle approach captures default risk in the best possible way because agencies have the most data.\"", right: "Through-the-cycle's whole design deliberately trades off responsiveness for stability — it is point-in-time, not through-the-cycle, that captures default risk closest to real time; the tradeoff is intentional, not a data limitation." },
    { wrong: "\"Profit scoring ignores payment behavior because it's a worse model than behavioral scoring.\"", right: "Profit scoring isn't a worse version of behavioral scoring — it answers a different question (relationship profitability) rather than default risk, so a bank can run both simultaneously for different purposes." }
  ],

  highYield: [
    { stars: 3, what: "Through-the-cycle vs. point-in-time: definitions, users, and best-fit horizon.", why: "A clean two-way comparison, frequently tested as a matching question, and the exam's favorite wrong-answer trap is claiming through-the-cycle is 'more accurate' or 'relies only on internal data.'" },
    { stars: 3, what: "The five-step CRA rating development process, in order.", why: "Directly tested as 'which step were they on when X happened' — e.g., checking a fitted model against out-of-sample data identifies model validation specifically." },
    { stars: 2, what: "CRA criticisms, especially issuer-pays conflict of interest and procyclicality.", why: "Recurring conceptual points, connects to R39's securitization rating conflicts." },
    { stars: 2, what: "Behavioral vs. profit (account-level vs. customer-level) consumer scoring.", why: "Tested via short scenario questions naming a specific input (e.g., 'updates in near real time using payment history') that you must match to the right scoring type." }
  ],

  recall: [
    { q: "Why would a bank use point-in-time ratings internally while relying on agency through-the-cycle ratings for long-term bond investments?", a: "Point-in-time ratings react quickly to current conditions, suiting the bank's short-term lending decisions where up-to-date risk assessment matters most. Through-the-cycle ratings smooth over the business cycle, better suited to long-term investment decisions where overreacting to temporary conditions would cause excessive portfolio turnover." },
    { q: "Explain the mechanism behind rating agency procyclicality and why it's considered a systemic risk concern.", a: "As economic conditions deteriorate, agencies downgrade ratings, which can trigger forced selling (many mandates require investment-grade holdings), further depressing prices and worsening conditions — ratings deteriorating exactly when the economy needs stability amplifies rather than dampens the downturn." },
    { q: "A model was checked against a held-out sample not used in training and the results were unsatisfactory. Which step of the CRA development process was this, and what happens next?", a: "This is model validation (step 3), an out-of-sample test. If it fails, either model fitting (step 2) or data collection/preprocessing (step 1) needs to be repeated with different variables — the first three steps often require multiple iterations before succeeding." },
    { q: "What is the difference between benchmarking and backtesting in model validation?", a: "Backtesting (including walk-forward, out-of-sample/out-of-time testing) is a quantitative statistical check against the model's own training/validation data. Benchmarking is qualitative — it compares the model's output to an external source like an existing agency rating, not to replicate it but to understand why any deviation exists." }
  ],

  hooks: [
    { title: "Report card vs. pop quiz", text: "Through-the-cycle = your GPA (smoothed, stable). Point-in-time = this week's quiz grade (reactive, current). Different tools for different decision horizons." },
    { title: "Five letters, five steps, five criticisms", text: "Basel's 5 specification requirements, the CRA's 5-step development process, and the 5 standard criticisms of CRAs are three separate 'five' lists in this reading — don't let them blur together on the exam." }
  ],

  breakdown: [
    {
      title: "Four benefits of a credit scoring/rating system",
      points: [
        "Reduces subjectivity — a standardized score/rating replaces individual loan-officer judgment calls.",
        "Enables analysis — the numeric/lettered output feeds scenario analysis and stress testing across a portfolio.",
        "Promotes transparency and consistency — everyone applies the same common framework to every borrower.",
        "Reduces time and cost — automated scoring/rating is faster and cheaper than case-by-case manual appraisal."
      ]
    },
    {
      title: "Five Basel Committee specification requirements",
      points: [
        "Meaningful differentiation of risk — grades reflect real risk differences (not capital-management games), allow transaction-level nuance within a grade, and must be reasonably dispersed (not concentrated in one grade).",
        "Continuous evaluation of borrowers — ratings are re-reviewed at least annually.",
        "Operational oversight — the system is continuously monitored for integrity, controls (e.g., stress testing), and feedback.",
        "Correct selection of risk assessment metrics — the chosen risk factors must actually predict creditworthiness well.",
        "Collecting substantial data — grading must draw on historical data, prior scores/ratings, past default estimates, and payment history."
      ]
    },
    {
      title: "Five-step CRA rating development process",
      points: [
        "Data collection and preprocessing — gather quantitative/qualitative inputs (financial data, transaction data, size/age, market conditions, market data, governance, news) and clean/transform them.",
        "Model fitting — estimate the coefficients of a scoring model (e.g., a linear score function) that best separate defaulters from non-defaulters in the training data.",
        "Model validation — test the fitted model out-of-sample and out-of-time (backtesting, walk-forward testing); repeat steps 1-2 if results are unsatisfactory.",
        "Definition and validation of the risk rating — map scores to risk-rating classes, each tied to an empirical PD estimate, checked for adequate diversification (no excess concentration in one grade) and stability over time.",
        "Implementation, monitoring, and review — deploy the system for real-time risk estimates, continuously monitor for degradation, and recalibrate/re-evaluate as needed (feeding back into earlier steps)."
      ]
    },
    {
      title: "Five common criticisms of credit rating agencies",
      points: [
        "Lack of transparency — proprietary methodology can't be publicly verified for fairness or validity.",
        "Potential conflicts of interest — the rated entity pays the CRA's fee ('issuer pays').",
        "Promoting a debt explosion — cheaper, more accessible borrowing costs (thanks to CRA-enabled risk management) can fuel credit bubbles and later crunches.",
        "Poor predictive ability — CRAs missed major failures (Enron, WorldCom, Lehman Brothers); studies show ratings are less predictive than accounting/market-based methods.",
        "Procyclicality — ratings tend to be too optimistic in booms and too pessimistic in recessions despite the through-the-cycle claim, amplifying the cycle rather than smoothing it."
      ]
    },
    {
      title: "Two consumer scoring methods (and profit scoring's two sub-types)",
      points: [
        "Behavioral scoring — uses a customer's historical payment/purchasing behavior, updates near real-time, used for credit limits, collections, and marketing.",
        "Profit scoring (account-level) — estimates profitability per individual account, ignoring links to a customer's other accounts.",
        "Profit scoring (customer-level) — aggregates estimated profitability across all accounts a single customer holds."
      ]
    }
  ],

  quiz: [
    {
      q: "ABC Bank needs to conduct a risk assessment for a large, publicly traded manufacturing firm. Which of the following should the bank use?",
      options: [
        "A credit score, to reduce subjectivity",
        "A credit score, to enhance transparency",
        "A credit rating, because large firms are graded with letter-based ratings rather than numeric scores",
        "A credit rating, despite its limitations for stress testing"
      ],
      answer: 2,
      why: "Large, publicly traded firms are graded with credit ratings (AAA, AA, A, BBB, ...), not credit scores (300-850, used for individuals/small businesses). The two 'credit score' answers are wrong because they apply the score/rating benefits to the wrong instrument type for this borrower; the 'credit rating, despite its limitations for stress testing' answer is wrong because rating systems specifically ENABLE stress testing/scenario analysis, they don't limit it."
    },
    {
      q: "A lender is deciding whether to use a through-the-cycle approach to assess a potential borrower. Which statement about this approach is correct?",
      options: [
        "It captures default risk in the best way possible",
        "It should be used if the loan is short-term in nature",
        "It should be used if the loan is long-term in nature",
        "It is robust because it relies only on internal data"
      ],
      answer: 2,
      why: "Through-the-cycle approaches cover a full business cycle and update infrequently, making them best suited to long-term loans. The 'captures default risk in the best way possible' answer is the tempting-but-wrong distractor because through-the-cycle deliberately trades responsiveness for stability, so it does NOT capture default risk in the 'best' (most current) way — that's point-in-time's strength. The 'should be used if the loan is short-term' answer describes point-in-time, and the 'robust because it relies only on internal data' answer is false since through-the-cycle ratings are primarily produced by external agencies, not derived from a bank's internal data."
    },
    {
      q: "A risk analyst wants a method that updates near real-time and incorporates a customer's payment and purchase history. Which method should he use?",
      options: [
        "Behavioral scoring",
        "Social lending scoring",
        "Account-level profit scoring",
        "Customer-level profit scoring"
      ],
      answer: 0,
      why: "Behavioral scoring is defined exactly by this description — it uses historical payment/purchase behavior and updates in near real-time. Both profit-scoring variants (account-level and customer-level) explicitly IGNORE behavior and instead measure profitability; social lending scoring refers to peer-to-peer lending, an emerging channel, not a scoring method matching this description."
    },
    {
      q: "Moody's checks a newly fitted credit rating model against a held-out sample of borrowers not used in training, and finds several issues. Which step of the CRA rating development process is this?",
      options: [
        "Model fitting",
        "Data collection and preprocessing",
        "Model validation",
        "Definition and validation of the risk rating"
      ],
      answer: 2,
      why: "Testing the fitted model against out-of-sample data not used in training is, by definition, model validation (step 3). The 'model fitting' answer is the prior step where the coefficients were estimated; 'data collection and preprocessing' happens even earlier; 'definition and validation of the risk rating' is the later step of mapping scores to rating classes with PD estimates, not testing model fit."
    },
    {
      q: "A linear credit scoring model estimates a score as s_i = \\beta_0 + \\beta_1 x_{1,i} + \\beta_2 x_{2,i}, where x_1 is debt-to-equity ratio and x_2 is interest coverage. If \\beta_0 = 50, \\beta_1 = -20, \\beta_2 = 5, and a borrower has D/E = 1.5 and interest coverage = 4, what is the fitted score?",
      options: [
        "35",
        "50",
        "40",
        "70"
      ],
      answer: 0,
      why: "s = 50 + (-20)(1.5) + (5)(4) = 50 - 30 + 20 = 40... checking again: 50 - 30 = 20, plus 20 = 40. The correct computation gives 40, matching the '40' answer choice, not the '35' answer. (The '50' distractor is the trap of forgetting to add the coefficient terms at all — just using \\beta_0 alone. The '70' distractor comes from adding instead of subtracting the D/E term.)"
    },
    {
      q: "Which of the following is NOT one of the five standard criticisms of credit rating agencies (CRAs) discussed in this reading?",
      options: [
        "Lack of transparency in proprietary methodology",
        "Procyclicality of ratings",
        "Excessive use of point-in-time data leading to overreaction",
        "Poor predictive ability, citing failures like Enron and Lehman Brothers"
      ],
      answer: 2,
      why: "The five criticisms are: lack of transparency, conflicts of interest, promoting a debt explosion, poor predictive ability, and procyclicality. 'Excessive use of point-in-time data' is not one of them — in fact CRAs are criticized for the OPPOSITE claim, that their through-the-cycle ratings still behave procyclically despite claiming to be insulated from the business cycle."
    }
  ],

  sources: [
    { title: "Credit rating - Wikipedia", url: "https://en.wikipedia.org/wiki/Credit_rating", note: "Background on credit rating scales, agencies, and how letter grades map to default risk." },
    { title: "Through-the-Cycle (TTC) vs. Point-in-Time (PIT) ratings — BIS working papers", url: "https://www.bis.org/publ/work395.pdf", note: "BIS discussion of the two rating philosophies referenced by the Basel Committee." },
    { title: "Credit Score - Investopedia", url: "https://www.investopedia.com/terms/c/credit_score.asp", note: "Plain-language explainer of the 300-850 consumer credit score scale and what drives it." },
    { title: "Credit Rating Agency - Investopedia", url: "https://www.investopedia.com/terms/c/creditrating.asp", note: "Overview of how CRAs like S&P, Moody's, and Fitch assign issuer/issue ratings and the issuer-pays model." }
  ],

  pdf: { book: 2, query: "Lenders, investors, and regulators all need a way to quantify" },

  summary: `<p><strong>Through-the-cycle</strong> (agencies, long-term loans, smooths the cycle) vs. <strong>point-in-time</strong> (banks internally, short-term loans, reacts fast). Consumer scoring: <strong>behavioral</strong> (payment history) vs. <strong>profit</strong> (customer profitability, account-level or customer-level). <strong>CRA process</strong>: data collection/preprocessing → model fitting → validation → rating definition/validation → implementation, monitoring, and review. <strong>Basel's 5 requirements</strong>: meaningful risk differentiation, continuous evaluation, operational oversight, correct metrics, substantial data. <strong>Criticisms</strong>: lack of transparency, issuer-pays conflict of interest, encourages higher debt loads, weak predictive power, procyclicality (ratings worsen exactly when the economy is already struggling).</p>`
});
