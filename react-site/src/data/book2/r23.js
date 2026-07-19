export default ({
  book: 2, reading: 23,
  session: "Credit Risk Analysis",
  title: "Credit Scoring and Retail Credit Risk Management",
  tagline: "Retail credit risk (mortgages, cards, auto loans) behaves differently from corporate credit risk: any single default barely moves the needle, but the 'dark side' is correlated, portfolio-wide deterioration.",

  teaches: `<p>How retail credit risk differs from corporate credit risk; the other risks (beyond credit risk) that retail banking generates; the "dark side" of retail credit risk and the regulatory response (the Consumer Financial Protection Act's qualified-mortgage and ability-to-repay rules); the three types of credit scoring models (credit bureau, pooled, custom) and what goes into a credit file; the key variables in a mortgage credit assessment and how cutoff scores translate a score into a lending decision; scorecard evaluation using the cumulative accuracy profile (CAP) and accuracy ratio (AR); the customer relationship cycle and the creditworthiness-vs-profitability tradeoff; and risk-based pricing (RBP).</p>`,

  why: `<p>2008 was fundamentally a retail credit story — the "dark side" scenario (falling home prices + rising defaults simultaneously) is exactly what makes granular, individually-tiny retail exposures capable of producing systemic losses. Understanding this prevents the common error of assuming "small individual exposure" means "low portfolio risk." The exam also leans hard on the mechanical vocabulary of this reading — cutoff scores, CAP/AR, the documentation types, and the implied-PD formula (loss rate ÷ LGD) — because it is testable with a single clean numeric or definitional question.</p>`,

  intuition: `<p>Retail lenders have an advantage corporate lenders often lack: they can act preemptively — tighten underwriting standards or raise cutoff scores before a downturn fully arrives, since the portfolio is granular and each new loan is a fresh decision point (a bank underwrites thousands of new mortgages a month, so it can simply say "no" more often starting tomorrow). Corporate lenders, by contrast, are often locked into existing large exposures already on the books — a $500 million syndicated loan to one borrower cannot be "tightened" after the fact the way next month's mortgage originations can — and so they see warning signs too late to act.</p>
  <p>But this advantage evaporates in the "dark side" scenario: a systemic shock (like a housing crash) hits asset VALUES and DEFAULT RATES simultaneously — collateral values fall exactly as borrowers default more, a double blow that no amount of granularity protects against. Granularity diversifies away idiosyncratic risk (the risk that any one specific borrower, for reasons unique to them, stops paying); it does nothing against systematic risk (a factor that pushes every borrower in the pool toward default at the same time). The 2007–08 subprime crisis is the textbook case: in the run-up, lenders offered products borrowers could not really afford (high loan-to-value mortgages to borrowers with weak credit), so when home prices fell, loan balances suddenly exceeded property values for a huge swath of the pool simultaneously, and defaults spiked at exactly the moment recovery values collapsed.</p>`,

  formulas: [
    {
      name: "Implied probability of default from loss rate and LGD",
      math: "\\text{PD} = \\dfrac{\\text{Loss rate}}{\\text{LGD}}",
      note: "Example from the reading: a portfolio subgroup with a 3% loss rate and 75% LGD implies PD = 3%/75% = 4%.",
      plain: "The expected loss rate a bank observes on a score-band subgroup is just PD times LGD, so if you know the loss rate and the LGD you can back out the implied PD by dividing the loss rate by the LGD.",
      derivation: `<p>Expected loss on a subgroup is the standard decomposition (ignoring EAD, i.e. expressing everything as a rate on exposure):</p>
      \\[ \\text{Loss rate} = \\text{PD} \\times \\text{LGD} \\]
      <p>Solving for PD:</p>
      \\[ \\text{PD} = \\dfrac{\\text{Loss rate}}{\\text{LGD}} \\]
      <p>Worked example: a bank groups its mortgage portfolio into score bands as required by the Basel Accord, and observes a historical loss rate of 3% on one band, with an LGD of 75% (i.e. the bank recovers 25 cents on the dollar on defaulted loans in that band). Then \\( \\text{PD} = 0.03 / 0.75 = 0.04 \\), i.e. an implied 4% probability of default for loans in that band.</p>`
    },
    {
      name: "Accuracy ratio (AR)",
      math: "\\text{AR} = \\dfrac{\\text{AR (area)}}{\\text{AP}}",
      note: "AP = area between the perfect-model line and the random-model line on a CAP chart; AR (area) = area between the observed cumulative-default line and the random-model line. Closer to 1 means the scorecard discriminates well; closer to 0 means it discriminates no better than random.",
      plain: "The accuracy ratio compares how much better the actual scorecard is than a coin-flip ranking, expressed as a fraction of how much better a theoretically perfect scorecard would be.",
      derivation: `<p>A cumulative accuracy profile (CAP) chart plots the cumulative percentage of the population (x-axis, ranked from riskiest score to safest) against the cumulative percentage of actual defaults captured (y-axis). Three lines appear on it:</p>
      <ul>
        <li><strong>Random model line</strong>: a 45° diagonal — if you rank borrowers randomly, the riskiest 20% of the population "catches" 20% of the defaults, the riskiest 50% catches 50%, and so on.</li>
        <li><strong>Perfect model line</strong>: rises as steeply as possible — if the bank's true default rate is 5%, then the riskiest 5% of the population (by the perfect model's ranking) accounts for 100% of the defaults, so the line shoots up to 100% almost immediately and then flattens.</li>
        <li><strong>Observed (actual) cumulative default line</strong>: where the bank's real scorecard falls, somewhere between the random line and the perfect line.</li>
      </ul>
      <p>Define \\( \\text{AP} \\) as the area between the perfect-model line and the random-model line (the maximum possible improvement over random), and \\( \\text{AR (area)} \\) as the area between the observed line and the random-model line (the improvement the actual scorecard achieves). Then:</p>
      \\[ \\text{AR} = \\dfrac{\\text{AR (area)}}{\\text{AP}} \\]
      <p>An AR near 1 means the observed line hugs the perfect-model line (the scorecard is nearly as good as an oracle at concentrating defaults among the scores it labels riskiest); an AR near 0 means the observed line sits on the random line (the score carries no discriminatory information at all).</p>`
    }
  ],

  concepts: [
    {
      name: "Retail banking risks (beyond credit risk)",
      def: "Retail banking (accepting deposits from and lending to consumers/small businesses — home mortgages, home equity lines of credit (HELOCs), installment loans like auto loans and credit cards, and small business loans (SBLs)) is exposed to credit risk as its biggest risk, but also to operational risk (day-to-day risk of running the business), business risk (strategic risk from new products/trends, and volume risk, e.g. mortgage origination volume swinging with rate changes), reputation risk (with customers and regulators), interest rate risk (the bank's asset and liability rates move against market rates), and asset valuation risk (a form of market risk on the value of assets/liabilities/collateral — e.g. prepayment risk on mortgages when rates fall, or a car dealer's assumed residual value on a leased vehicle turning out too high).",
      intuition: "Credit risk gets the headline, but a retail bank is really running a small conglomerate of risks — a car lease's residual-value assumption going wrong is a market/valuation risk, not a credit risk, even though it shows up on the same balance sheet as auto loans.",
      pitfall: "Don't lump every retail-banking loss into 'credit risk' — the exam distinguishes prepayment/residual-value exposure (asset valuation risk) and mortgage-volume swings (business risk) from actual borrower default (credit risk).",
      example: "A car dealer leases a vehicle assuming it will be worth $15,000 at lease-end; if used-car prices fall and it's actually worth $11,000, that $4,000 shortfall is asset valuation risk, not a credit event — the lessee never missed a payment.",
      related: []
    },
    {
      name: "Retail vs corporate credit risk",
      def: "Any single retail default barely moves the needle (small, granular exposures pooled into large portfolios, so a bank can treat the expected default rate as a predictable cost of doing business and price it into what it charges), but lenders CAN act preemptively (tighten underwriting, adjust cutoff scores, or raise rates for higher-risk segments) whereas corporate lenders often see warning signs too late. Corporate/commercial credit portfolios, by contrast, consist of large individual exposures that can matter to an entire industry or economy, and losses exceeding the expected threshold can cripple the bank outright.",
      pitfall: "Don't confuse retail's 'small exposures, minimal single-default impact' with 'low risk overall' — the dark-side scenario is precisely about correlated, portfolio-wide deterioration, which retail portfolios are not immune to.",
      example: "A $300,000 mortgage defaulting is a rounding error against a bank's billion-dollar mortgage book; a single large corporate borrower defaulting on a $500 million syndicated loan can visibly move the bank's earnings and even ripple through the sector it lent to.",
      related: ["The 'dark side' of retail credit"],
      memory: "Granularity protects against ONE bad borrower, not against everyone getting worse at once."
    },
    {
      name: "The 'dark side' of retail credit",
      def: "When an unexpected, systematic risk factor pushes losses beyond an estimated threshold by hitting asset/collateral values and default rates simultaneously — the 2008 housing example: falling home prices (lower collateral value, lower recovery) + rising defaults, at once.",
      intuition: "Falling collateral values mean lower recovery exactly when more borrowers are defaulting — a double-whammy correlated shock that granularity cannot diversify away.",
      example: "In the run-up to 2007–08, lenders wrote high-LTV mortgages to weaker-credit borrowers; when home prices fell, many loan balances exceeded the properties' value at the same moment default rates rose — the mechanism that, applied across an entire portfolio simultaneously, is the dark side.",
      pitfall: "The dark side is a description of a systematic/correlated shock, not a claim that retail credit is riskier than corporate credit in normal times — in normal markets retail's granularity genuinely does make it safer and more predictable.",
      related: [{ r: 25, label: "R25 — recovery rate negatively correlated with default rate, the same mechanism" }]
    },
    {
      name: "Causes of the dark side, and the regulatory response (CFPA)",
      def: "The reading lists four primary causes that can perpetuate dark-side risk: (1) lack of historical loss data because a product is relatively new; (2) an across-the-board rise in economy-wide risk factors causing retail products to behave unexpectedly (i.e., a systematic shock); (3) an evolving social/legal environment that inadvertently 'encourages' default (e.g. social acceptance of walking away from a mortgage, or legal changes that make default less costly for the borrower); (4) an operational flaw in the largely automated, semi-automated credit-granting process that ends up extending credit to higher-risk individuals than intended. In response, the Consumer Financial Protection Act (CFPA) requires mortgage originators to evaluate whether a mortgage is a 'qualified mortgage' and to verify the borrower's 'ability to repay.'",
      intuition: "Note what is NOT on the causes list: 'capital set aside to protect the bank' is a defensive response to the dark side, not a cause of it — a classic exam trap (see Module Quiz 23.1, Q2 in the source, whose correct answer excludes 'capital held' from the list of perpetuating factors).",
      example: "A qualified mortgage caps debt payments at roughly 45% of income, bars excessive upfront fees/points, and cannot be a balloon-payment, interest-only, negative-amortization, or longer-than-30-year loan; assessing 'ability to repay' means checking the borrower's credit history, current income/assets, employment status, projected mortgage payments (including escrowed insurance and property taxes), other property-related loan payments, other debt obligations, and the resulting debt-to-income ratio.",
      pitfall: "Don't mix up 'qualified mortgage' (a set of structural loan-feature limits: DTI cap, no balloon/interest-only/neg-am, term ≤30yr, capped fees) with 'ability to repay' (a separate underwriting-standards checklist about the borrower's actual capacity to pay) — the exam can ask you to identify which list a given item belongs to.",
      related: []
    },
    {
      name: "Capital and regulatory reporting for retail portfolios",
      def: "Because retail credit is predictable and relatively safe in normal markets (a large, granular pool behaves like an actuarial book of business), banks are required to set aside a relatively SMALL amount of risk capital against it compared to the capital required against corporate/commercial loans. In exchange for that lighter capital treatment, regulators require banks to segment their retail portfolios into differentiated groups and report specific statistics for each segment: probability of default (PD), exposure at default (EAD), and loss given default (LGD).",
      intuition: "Lighter capital is the reward for granularity and predictability in normal times — but it is exactly this same 'small capital cushion' that becomes dangerously thin if the dark-side scenario hits, since the cushion was sized for ordinary, uncorrelated losses, not a systemic shock.",
      pitfall: "Do not confuse 'banks hold less capital against retail than corporate exposures' (true, and a reason retail is normally viewed as lower-risk) with the earlier point that capital held against default is a defensive RESPONSE to the dark side, not one of its causes — these are two separate, non-contradictory facts about capital.",
      related: []
    },
    {
      name: "Credit risk scoring model types",
      def: "A credit risk scoring model converts applicant information into a single number: the higher the score, the higher the probability of repayment and the lower the risk (and, typically, the lower the interest rate offered). Three model types exist: (1) credit bureau scores — an applicant's FICO score, fast/cheap/easy to use, typically ranging 300 (highest risk) to 850 (lowest risk); (2) pooled models — built by an outside vendor across many lenders' data, more costly than a bureau score but tailorable to a specific industry; (3) custom models — built by the lender itself from its own applicant/customer data, letting it evaluate applicants specifically for its own products.",
      intuition: "A scorecard works from a 'characteristic' (a question, e.g. 'years with current employer') and an 'attribute' (the applicant's actual answer, e.g. '10 years'); the model has pre-weighted each attribute by its historical association with repayment, so plugging in the applicant's attributes produces a weighted score.",
      example: "A credit file compiled for scoring contains: personal identifying information (not itself used in scoring), a record of recent credit inquiries (new-credit requests are visible to other lenders), collections data, public legal records (bankruptcies, tax liens, judgments), and account/trade-line information reported to the bureaus by other lenders.",
      pitfall: "A pooled model is NOT the same as a credit bureau (FICO) score — only credit bureau scores run on the standardized 300–850 scale; pooled and custom models use their own internal scales built from their own data.",
      related: []
    },
    {
      name: "Mortgage underwriting variables and cutoff scores",
      def: "Key mortgage credit-assessment variables: FICO score (numerical measure of default risk from credit history), loan-to-value (LTV) ratio (mortgage amount ÷ appraised property value), debt-to-income (DTI) ratio (monthly debt payments ÷ monthly gross income), payment type (adjustable-rate, fixed-rate, etc.), and documentation type — full doc (income and assets verified), stated income (employment verified, income not), no ratio (employment verified, income not, and DTI is not even calculated), no income/no asset (income and assets are stated on the application but not lender-verified, apart from the source of income), and no doc (no verification of income or assets at all). Cutoff scores are the pass/fail thresholds that translate a score into an approval/decline decision and into pricing terms.",
      intuition: "Setting the cutoff score too LOW admits riskier borrowers than intended (higher expected default losses); setting it too HIGH turns away borrowers who would actually have been profitable, low-risk customers (lost revenue) — the cutoff is a lever a bank tunes, ideally against loss-rate data spanning a full economic cycle rather than just recent good years.",
      example: "Under the Basel Accord, banks must group their portfolios into score-band subgroups sharing similar loss characteristics and estimate PD and LGD for each band; if a band shows a 3% historical loss rate and a 75% LGD, the implied PD for that band is 3%/75% = 4%.",
      pitfall: "'No ratio' and 'no income/no asset' documentation types are easy to confuse: 'no ratio' means DTI is not even calculated (income unverified), while 'no income/no asset' means income and assets are stated on the application but simply not lender-verified — a more borderline case than 'no doc' (nothing provided at all).",
      related: [{ r: 22, label: "R22 — the underlying scoring philosophies feeding these variables" }]
    },
    {
      name: "Scorecard evaluation: CAP and AR",
      def: "The cumulative accuracy profile (CAP) is a chart plotting the cumulative percentage of the (risk-ranked) population against the cumulative percentage of actual defaults captured, with three reference lines: the perfect model (the riskiest X% of the population accounts for 100% of defaults as fast as mathematically possible), the random model (a 45° line — the riskiest X% of the population captures X% of defaults), and the observed model (the bank's actual scorecard). The accuracy ratio (AR) is a single summary statistic: the area between the observed line and the random line, divided by the area between the perfect line and the random line — closer to 1 is a better-discriminating model, closer to 0 means the scorecard adds no discriminatory power over random ranking.",
      intuition: "CAP/AR answer the question 'if I rank borrowers by this scorecard from riskiest to safest, how efficiently does the riskiest slice of the population concentrate the actual bad accounts?' — a scorecard is only useful to the extent it front-loads defaults into the segment it labels 'risky.'",
      pitfall: "AR is a RATIO of two areas (observed-vs-random area divided by perfect-vs-random area), not a raw area itself — don't report the numerator area alone as 'the AR.'",
      example: "A scorecard is never a 'set it and forget it' tool: the reading stresses that a bank must monitor scorecard performance on a regular, ongoing basis, because the underlying applicant population and the lender's product mix both keep shifting — a scorecard trained on last decade's applicants can silently lose discriminatory power as the pool it now sees changes underneath it.",
      related: []
    },
    {
      name: "Customer relationship cycle and creditworthiness-vs-profitability tradeoff",
      def: "The customer relationship cycle: market (sell new products or tailor existing ones to new/existing customers) → screen (accept/reject applications using scorecards and price the accepted ones) → manage (pricing, credit-line authorizations/modifications/renewals, principal/interest collection) → cross-sell (offer existing customers additional lender products). Beyond default scoring, lenders also use profitability-oriented scorecards: revenue scores (existing-customer profitability), application scores (extend-credit decisions for new applicants), response scores (likelihood a customer responds to an offer), insurance scores (likelihood of a claim), behavior scores (existing-customer credit usage/delinquency history), tax authority scores (audit targeting), and attrition scores (likelihood an existing customer reduces/pays off outstanding debt).",
      intuition: "Creditworthiness and profitability can pull in opposite directions: a very high-FICO cardholder who always pays the statement balance in full is extremely creditworthy but generates zero interest income for the issuer, while a lower-FICO cardholder who carries a balance is riskier but more profitable if they keep paying — a lender has to score BOTH dimensions, not just default risk.",
      example: "A 'response score' predicts whether a targeted customer will accept a pre-approved credit-card offer at all — a marketing-stage tool, distinct from an 'application score,' which is used once someone has actually applied and needs an accept/decline decision.",
      related: []
    },
    {
      name: "Risk-based pricing (RBP)",
      def: "Charging different customers different prices (interest rates/fees) based on their individual assessed risk, rather than one flat price for everyone. Motivated by adverse selection: a single flat price attracts high-risk customers (who see the price as a bargain relative to their own risk) while pushing away low-risk customers (who see it as overpriced relative to their own low risk) — RBP counters this by tiering price to risk. The reading notes RBP is still in the relatively early stages of adoption across retail financial services generally, but it has already been used more heavily in three specific lending lines: credit cards, home mortgages, and auto loans.",
      intuition: "Key inputs feeding an RBP tier: probability of take-up (will the customer accept the offered terms at all), PD, LGD, EAD, the lender's cost of equity capital, capital allocated to the transaction, and the lender's operating expenses; prices are then set by score band and mapped against metrics like profit/loss, revenue, market share, and risk-adjusted return.",
      example: "A borrower in a lower (safer) score band is charged a lower mortgage rate; a borrower in a higher-risk band is charged a higher rate — the opposite of flat, one-price-for-everyone pricing.",
      pitfall: "RBP means a HIGHER probability of default gets a HIGHER price, and a LOWER (safer) relative score band gets a LOWER price — reversing this direction is the single most common wrong-answer trap on RBP questions.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 22, why: "Applies the general scoring concepts specifically to mortgage/card/auto underwriting." }
    ],
    to: [
      { r: 25, why: "The recovery-rate/default-rate negative correlation mechanism reappears explicitly." },
      { r: 39, why: "Loss curves and prepayment tools for securitized retail pools build directly on these underwriting variables." }
    ],
    confused: [
      { what: "Retail 'small exposure' vs 'low risk'", how: "Small individual exposure limits single-default impact, but says nothing about correlated, systemic (dark-side) risk across the whole portfolio." },
      { what: "Qualified mortgage vs. ability-to-repay", how: "'Qualified mortgage' is a checklist of structural loan features (DTI cap ~45%, no balloon/interest-only/negative-amortization, term ≤30 years, limited fees); 'ability to repay' is a separate checklist about verifying the borrower's actual capacity to pay (credit history, income, employment, all debt obligations)." },
      { what: "AR (area) vs. AR (accuracy ratio)", how: "The letters 'AR' label both the raw area between the observed and random CAP lines AND the final ratio statistic (that area divided by AP) — the exam's AR is always the ratio, not the raw area." }
    ]
  },

  misconceptions: [
    { wrong: "\"Retail credit portfolios are inherently low-risk because individual loans are small.\"", right: "Individual granularity limits single-default impact, but the 'dark side' scenario — a systemic shock hitting values and defaults simultaneously — can devastate the whole portfolio at once, as 2008 demonstrated." },
    { wrong: "\"Retail lenders have no advantage over corporate lenders in managing credit risk.\"", right: "Retail lenders CAN act preemptively (tighten cutoffs, adjust underwriting) before a downturn fully materializes — an advantage corporate lenders, often locked into existing large exposures, frequently lack." },
    { wrong: "\"Capital set aside for defaults is one of the causes of the 'dark side' of retail credit risk.\"", right: "Holding capital against default is a defensive RESPONSE to the dark side, not a cause of it. The actual perpetuating causes are: lack of historical loss data on new products, economy-wide systematic shocks, an evolving social/legal environment that eases the stigma of default, and operational flaws in automated credit-granting." },
    { wrong: "\"Risk-based pricing means charging a higher price to lower-risk (higher-FICO) customers to maximize revenue from your best customers.\"", right: "Risk-based pricing charges MORE to HIGHER-risk customers (higher PD) and LESS to lower-risk customers, precisely to counter adverse selection — pricing it backward is the classic wrong answer." },
    { wrong: "\"A pooled credit scoring model produces a score on the standard 300–850 FICO scale.\"", right: "Only credit bureau (FICO) scores use the 300–850 scale. Pooled models (built by outside vendors across multiple lenders, tailored to an industry) and custom models (built by the lender from its own data) use their own internal scoring scales." }
  ],

  highYield: [
    { stars: 3, what: "The 'dark side' of retail credit: correlated shock to values AND defaults simultaneously.", why: "The central conceptual trap of this reading — small exposure ≠ low systemic risk." },
    { stars: 3, what: "The four causes of the dark side vs. the (non-cause) defensive response of holding capital.", why: "A recurring 'except' question format: name the item on the list that does NOT belong." },
    { stars: 2, what: "CAP/AR scorecard evaluation and mortgage underwriting variables (FICO, LTV, DTI, documentation types).", why: "Straightforward recall, occasionally paired with a scorecard-comparison question or an implied-PD calculation (loss rate ÷ LGD)." },
    { stars: 2, what: "Risk-based pricing direction: higher PD → higher price; lower relative score band → lower price.", why: "Easy points if you keep the direction straight; a common source of flipped-answer distractors." }
  ],

  recall: [
    { q: "Why doesn't the granularity of a retail loan portfolio protect against the 'dark side' scenario?", a: "Granularity protects against idiosyncratic, single-borrower risk — one default barely affects the whole pool. But the dark-side scenario is a SYSTEMATIC shock hitting asset values and default rates simultaneously across the entire portfolio at once — no amount of diversification across individually small loans helps when the shock is common to all of them." },
    { q: "What preemptive action can a retail lender take that a corporate lender typically cannot, and why?", a: "A retail lender can tighten underwriting standards or raise cutoff scores for NEW originations quickly, since retail lending is a continuous flow of small, fresh decisions. A corporate lender is often locked into large existing exposures already on the books, with less ability to preemptively adjust before warning signs become undeniable." },
    { q: "A score-band subgroup shows a historical loss rate of 3% and an LGD of 75%. What is the implied PD?", a: "PD = loss rate / LGD = 3% / 75% = 4%." },
    { q: "List the four primary causes of the dark side of retail credit risk (and name one item that is NOT a cause).", a: "Causes: (1) lack of historical loss data on new products, (2) an across-the-board rise in economy-wide risk factors, (3) an evolving social/legal environment that eases the stigma of default, (4) operational flaws in the automated credit-granting process. Capital held against default losses is a defensive response, not a cause." },
    { q: "In a CAP chart, what does the 'perfect model' line look like, and how does the accuracy ratio (AR) use it?", a: "The perfect model line rises as steeply as mathematically possible: if the true default rate is 5%, the riskiest 5% of the population (per the perfect model's ranking) accounts for 100% of defaults. AR = (area between the observed line and the random 45° line) / (area between the perfect line and the random line) — closer to 1 means the actual scorecard nearly matches the perfect model's discriminatory power." }
  ],

  hooks: [
    { title: "The double blow", text: "The dark side isn't one bad thing — it's two bad things at once: home prices fall (less recovery) AND defaults rise (more losses) simultaneously. That simultaneity is what makes 'small loans' add up to a systemic crisis." },
    { title: "Capital is the shield, not the sword", text: "When a question asks which item is NOT a cause of the dark side, remember: capital held against default is what protects the bank AFTER the shock — it's the defensive response, never one of the four perpetuating causes." }
  ],

  eli5: `<p>Imagine a school cafeteria selling lunch on credit to 2,000 students, tracked with a simple point system: kids who've reliably paid back small tabs before get a high score and can run a bigger tab; kids who've bounced checks before get a low score and have to pay upfront or not eat on credit at all. If one kid skips town without paying, the cafeteria barely notices — it's one lunch out of thousands. The cafeteria can also react fast: if it notices a rough patch coming (say, a lot of families losing jobs), it can tighten the rules for new tabs starting tomorrow. But if the ENTIRE TOWN loses its main employer at once, suddenly hundreds of kids can't pay their tabs in the very same week — and the cafeteria's "one bad apple barely matters" math breaks down completely, because now it's not one apple, it's the whole barrel going bad together. In finance terms: the cafeteria's point system is a <strong>credit score</strong>, the credit limit is the <strong>cutoff score</strong>, "one kid skipping town barely matters" is why retail credit risk is normally low-impact per default, and "the whole town losing its job at once" is the <strong>dark side</strong> — a systematic shock hitting everyone's ability to pay simultaneously.</p>`,

  thinkLike: `<p>A retail credit risk manager thinks in two separate registers at once. In "normal times" mode, retail credit is treated almost like an actuarial, insurance-style business: given a large enough, sufficiently granular pool, the expected default rate is a predictable number you can price into your interest rates and hold modest capital against — you are managing an average, not worrying about any one borrower. But a good risk manager never forgets there is a second register: "systemic shock" mode, where the pool's granularity stops helping because the shock is common to every borrower at once, and losses can blow through the modeled threshold. The exam tests this by making you distinguish "why is retail normally lower-risk than corporate" (small, granular, preemptable) from "why can retail still blow up" (the dark side, a correlated shock to both collateral values and default rates).</p>
  <p>Practically, this reading also wants you to think like an underwriter running a production line, not a single deal: every applicant gets converted into a number (the score), a threshold decides who gets in (the cutoff score), and the whole system is continuously audited for whether it's still ranking risk correctly (CAP/AR) — because a scorecard trained on old data can silently degrade as the underlying population or product mix shifts. The examiner likes to test the boundary cases: which factors are causes of the dark side versus which are the regulatory/capital response to it, which documentation type verifies what, and whether you can correctly say that risk-based pricing charges MORE for MORE risk (a surprisingly common flip-the-direction trap).</p>`,

  breakdown: [
    {
      title: "Other retail banking risks beyond credit risk",
      points: [
        "Operational risk — day-to-day risk of running the business (processing errors, fraud, systems failures).",
        "Business risk — strategic risk from new products/market trends, plus volume risk (e.g. mortgage origination volume swinging with interest-rate changes).",
        "Reputation risk — the bank's standing with customers and regulators.",
        "Interest rate risk — the bank's asset and liability rates moving against changing market rates.",
        "Asset valuation risk — a market-risk-flavored exposure on the value of assets/liabilities/collateral, e.g. mortgage prepayment risk when rates fall, or a car dealer's assumed lease-end residual value turning out too high."
      ]
    },
    {
      title: "The four causes of the 'dark side' of retail credit risk",
      points: [
        "Lack of historical loss data — a product is too new to have a reliable loss track record.",
        "Economy-wide systematic shock — an across-the-board rise in risk factors makes retail products behave unexpectedly all at once.",
        "Evolving social/legal environment — changing norms or laws inadvertently make defaulting easier or more socially acceptable.",
        "Operational flaw in the credit process — the largely automated origination process ends up granting credit to higher-risk individuals than intended.",
        "(NOT a cause) Capital set aside for defaults — this is the bank's defensive response to the dark side, not one of its causes; a frequent exam 'except' trap."
      ]
    },
    {
      title: "Three types of credit risk scoring models",
      points: [
        "Credit bureau scores — the applicant's FICO score; fast, cheap, easy to implement; standardized 300–850 scale, higher = lower risk and better rates.",
        "Pooled model — built by an outside vendor using data pooled across lenders; costlier than a bureau score but can be tailored to a specific industry.",
        "Custom model — built in-house by the lender from its own applicant/customer data; lets the lender tune scoring specifically to its own products."
      ]
    },
    {
      title: "Mortgage documentation types (income/asset verification levels)",
      points: [
        "Full doc — evidence of both assets and income is required and verified.",
        "Stated income — employment is verified, but the borrower's stated income is not verified.",
        "No ratio — like stated income (employment verified, income not verified), and the debt-to-income ratio is not even calculated.",
        "No income/no asset — income and assets are stated on the application but not lender-verified (apart from confirming the source of income).",
        "No doc — no documentation of income or assets is provided at all."
      ]
    },
    {
      title: "The customer relationship cycle",
      points: [
        "Market — sell new products or tailor existing ones to both new and existing customers.",
        "Screen — accept or reject applications using scorecards, and price accepted applications.",
        "Manage — handle product pricing, credit-line authorizations/modifications/renewals, and principal/interest collections on existing accounts.",
        "Cross-sell — offer existing customers additional lender products that meet their needs."
      ]
    },
    {
      title: "Scorecard variants used across the customer relationship cycle",
      points: [
        "Revenue scores — evaluate existing customers' potential profitability.",
        "Application scores — support the accept/decline decision on a new applicant.",
        "Response scores — probability a customer responds to a marketing offer.",
        "Insurance scores — probability of a future claim by the insured.",
        "Behavior scores — assess existing customers' credit usage and delinquency history.",
        "Tax authority scores — predict where audits should be targeted for revenue collection.",
        "Attrition scores — probability an existing customer reduces or eliminates outstanding debt."
      ]
    },
    {
      title: "Inputs to risk-based pricing (RBP)",
      points: [
        "Probability of take-up — likelihood the customer accepts the offered terms.",
        "Probability of default (PD).",
        "Loss given default (LGD).",
        "Exposure at default (EAD).",
        "Cost of equity capital to the lender.",
        "Capital allocated to the transaction.",
        "Operating expenses of the lender."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank's mortgage subgroup shows a historical loss rate of 3% and an LGD of 75%. What is the implied probability of default (PD)?",
      options: ["2.25%", "4.0%", "0.75%", "78%"],
      answer: 1,
      why: "PD = loss rate / LGD = 3% / 75% = 4%. The 2.25% distractor comes from multiplying (3% × 75%) instead of dividing, which actually computes a hypothetical loss rate from a PD and LGD, not the reverse. 78% wrongly adds the two percentages."
    },
    {
      q: "Which of the following is NOT one of the primary causes of the 'dark side' of retail credit risk?",
      options: [
        "Lack of historical loss data for a relatively new product",
        "An operational flaw in the automated credit process that grants credit to higher-risk individuals",
        "Capital set aside to protect the bank in the event of default",
        "An evolving social and legal environment that eases the stigma of default"
      ],
      answer: 2,
      why: "Holding capital against default losses is the bank's defensive RESPONSE to the dark side, not one of its causes. The actual causes are: lack of historical data on new products, economy-wide systematic shocks, an evolving social/legal environment, and operational flaws in the credit-granting process."
    },
    {
      q: "Why can retail lenders often act more preemptively against rising credit risk than corporate lenders?",
      options: [
        "Retail loans carry government guarantees that corporate loans lack",
        "Retail portfolios consist of a continuous flow of small, fresh origination decisions, so a lender can tighten standards for new loans quickly",
        "Retail borrowers are contractually required to disclose financial distress in advance",
        "Corporate lenders are legally barred from adjusting credit terms once a loan is issued"
      ],
      answer: 1,
      why: "Because retail lending is granular and continuous, a lender can raise cutoff scores or tighten underwriting for tomorrow's originations. Corporate lenders are typically locked into large existing exposures already on the books and often see distress signals only after it's too late to act — not because of any legal restriction, which is what the 'legally barred from adjusting credit terms' answer wrongly implies."
    },
    {
      q: "In a cumulative accuracy profile (CAP) chart, what does the 'random model' line represent?",
      options: [
        "The riskiest X% of the population accounts for 100% of actual defaults",
        "The riskiest X% of the population captures exactly X% of actual defaults",
        "The bank's actual observed default distribution",
        "The point at which AR equals 1"
      ],
      answer: 1,
      why: "The random model line is the 45° diagonal: ranking borrowers with no skill at all, the riskiest X% of the population captures X% of defaults (proportional to population share). The 'riskiest X% accounts for 100% of defaults' answer describes the perfect model line instead; the 'bank's actual observed default distribution' answer describes the observed line; AR = 1 would describe a scorecard matching the perfect model, not the random model."
    },
    {
      q: "A bank rolls out risk-based pricing (RBP) on its mortgage book. Which pricing outcome is consistent with RBP as described in the reading?",
      options: [
        "A customer with a higher probability of default is charged a higher interest rate",
        "A customer with a higher FICO score is charged a higher interest rate",
        "All customers are charged the same rate regardless of score band, to avoid adverse selection",
        "A customer positioned on a lower (safer) relative score band is charged a higher interest rate"
      ],
      answer: 0,
      why: "RBP charges customers according to their assessed risk: higher PD gets a higher price, lower relative (safer) score bands get lower prices. The 'higher FICO score charged more' and 'safer band charged higher rate' answers reverse the correct direction, and the 'all customers charged the same rate' answer describes flat, single pricing — the very practice RBP is meant to replace because it causes adverse selection."
    },
    {
      q: "A mortgage applicant's employment is verified but neither their income nor their debt-to-income ratio is examined at all. Which documentation type is this?",
      options: ["Full doc", "Stated income", "No ratio", "No income/no asset"],
      answer: 2,
      why: "'No ratio' documentation verifies employment but not income, and specifically does not calculate the DTI ratio at all. The 'stated income' answer also leaves income unverified but does not say the DTI calculation is skipped. The 'no income/no asset' answer involves income and assets being stated but not lender-verified (aside from confirming the income source), a different (and looser) verification standard."
    }
  ],

  sources: [
    { title: "Consumer Financial Protection Bureau — Ability-to-Repay and Qualified Mortgage Rule", url: "https://www.consumerfinance.gov/rules-policy/regulations/1026/43/", note: "The actual regulatory text behind the 'qualified mortgage' and 'ability to repay' requirements discussed in this reading." },
    { title: "Investopedia — FICO Score", url: "https://www.investopedia.com/terms/f/ficoscore.asp", note: "Background on the 300–850 credit bureau scoring scale used as the baseline retail credit scoring model." },
    { title: "Investopedia — Loan-to-Value (LTV) Ratio", url: "https://www.investopedia.com/terms/l/loantovalue.asp", note: "Definition and worked examples of LTV, one of the core mortgage underwriting variables in this reading." },
    { title: "Investopedia — Risk-Based Pricing", url: "https://www.investopedia.com/terms/r/riskbasedpricing.asp", note: "Overview of risk-based pricing and how it counters adverse selection in lending." }
  ],

  pdf: { book: 2, query: "This reading examines credit risk management, primarily from the perspective" },

  summary: `<p>Retail credit: small individual exposures limit single-default impact, and lenders can act preemptively (tighten cutoffs) — but the <strong>'dark side'</strong> is a systemic shock hitting asset values AND default rates simultaneously (2008 housing), which granularity cannot protect against. The CFPA responds with 'qualified mortgage' and 'ability-to-repay' rules. Three scoring model types: credit bureau (FICO, 300–850), pooled, and custom. <strong>CAP/AR</strong> evaluate scorecard discrimination power. Mortgage underwriting: FICO, LTV, DTI, payment/documentation type (full doc, stated income, no ratio, no income/no asset, no doc), cutoff scores; implied PD = loss rate ÷ LGD. The customer relationship cycle runs market → screen → manage → cross-sell. <strong>Risk-based pricing</strong> charges by risk band (higher PD, higher price) to counter adverse selection.</p>`
});
