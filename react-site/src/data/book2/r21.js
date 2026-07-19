export default ({
  book: 2, reading: 21,
  session: "Credit Risk Analysis",
  title: "Introduction to Credit Risk Modeling and Assessment",
  tagline: "Three jobs in one reading: CAMEL (bank health-check), the IRB regulatory capital formula, and the three families of default-prediction models — with Merton as the star.",

  teaches: `<p>This reading does three separate jobs, and the exam treats each as fair game. First, <strong>CAMEL</strong>, a five-part mnemonic examiners use to score a bank's overall financial health (Capital adequacy, Asset quality, Management, Earnings, Liquidity). Second, the <strong>capital adequacy ratio (CAR)</strong> — the regulatory minimum amount of loss-absorbing capital a bank must hold relative to its risk-weighted assets — and the <strong>internal ratings-based (IRB) capital charge formula</strong> that a bank uses to translate a single borrower's PD and LGD into a dollar capital requirement. Third, the <strong>three families of default-prediction models</strong> (judgmental, empirical, financial/market), with the <strong>Merton model</strong> as the star: the idea that a shareholder's stake in a levered firm behaves exactly like a call option on the firm's assets, and its "cousin" models (Moody's-KMV, CreditMetrics, CreditRisk+) that extend or replace pieces of that logic. Finally, <strong>RAROC</strong>, the ratio banks use to decide whether an individual loan is actually worth making once its risk-adjusted cost of capital is accounted for.</p>`,

  why: `<p>Merton is the single most important model in the whole book — it comes back in R25 (precise numerical form, where you actually solve for asset value and volatility) and R29 (inside CVA, pricing counterparty default risk on derivatives). Get comfortable with the CONCEPT here (equity = call option on assets) so R25's algebra feels like a continuation, not new material. The IRB formula also matters beyond this reading: it is literally how regulatory capital gets set for every corporate loan a bank holds, and its comparative statics (which direction R and \\(\\beta\\) move) are tested again and again because they're easy to get backwards under exam pressure.</p>`,

  intuition: `<p>Merton's insight starts from a simple observation about how a levered firm's ownership actually works. Imagine a firm with exactly one loan outstanding, face value \\(L\\), due at time \\(T\\). At maturity, shareholders face a binary choice: if the firm's assets \\(A_T\\) are worth more than \\(L\\), it makes economic sense to pay off the debt and keep the residual value; if assets are worth less than \\(L\\), shareholders have no obligation to make up the shortfall out of their own pocket (limited liability) — they simply walk away, and creditors are left holding assets worth less than what they're owed. Written as a payoff, shareholders get \\(\\max(A_T - L, 0)\\) — which is exactly the payoff of a European call option on the firm's assets, struck at the debt's face value. That equivalence is the entire model: equity is a call option on the firm, and creditors are effectively short a put (they bear the downside below \\(L\\)). Because the payoff shape matches a call option, the Black-Scholes-Merton option-pricing formula can be used, unmodified, to price both the market value of equity and the probability of default. Default itself is just the event that the call option expires worthless — assets end up below the debt owed.</p>
  <p>The IRB capital formula has two exam-favorite comparative statics, and both come from the same underlying idea: asset correlation \\(R\\) measures how tied a borrower's fortunes are to the broad economy versus firm-specific (idiosyncratic) events. \\(R\\) DECREASES as PD increases — a borrower already in financial trouble is usually in trouble for firm-specific reasons (a bad product launch, fraud, a lost lawsuit), not because the whole economy turned down, so its asset correlation with the market is lower. \\(R\\) INCREASES with firm size — large, diversified firms (think a multinational conglomerate) have their fortunes driven mostly by macroeconomic conditions, while a small firm's fate more often hinges on something specific to it. The maturity adjustment \\(\\beta\\) is higher for LOW-PD borrowers: a currently-safe, investment-grade borrower has much more room to deteriorate over a long loan term than an already-risky borrower does (who is closer to default already), so a bank locking in a long maturity to a safe-looking borrower is taking on more "downgrade risk" over that horizon — capital requirements therefore rise with maturity.</p>`,

  formulas: [
    { name: "Capital Adequacy Ratio", math: "\\text{CAR} = \\dfrac{\\text{Tier 1 Capital} + \\text{Tier 2 Capital}}{\\text{Risk-Weighted Assets}}", note: "Minimum \\(\\alpha\\) = 8% (Basel II) or 10.5% (Basel III).", plain: "CAR says: for every dollar of risk-weighted assets a bank holds, how many cents of loss-absorbing capital stand behind it — regulators require at least 8 (Basel II) or 10.5 (Basel III) cents on the dollar." },
    { name: "IRB capital charge K", math: "K = \\text{LGD}\\times\\left[N\\!\\left(\\sqrt{\\dfrac{1}{1-R}}\\,N^{-1}(\\text{PD}) + \\sqrt{\\dfrac{R}{1-R}}\\,N^{-1}(0.999)\\right) - \\text{PD}\\right]\\times \\beta\\,(\\text{maturity adj.})", note: "R (asset correlation) falls as PD rises; rises with firm size. \\(\\beta\\) (maturity adj.) is higher for low-PD borrowers.", plain: "K is the capital a bank must hold per dollar lent to one borrower: it takes the borrower's PD, stretches it through a normal-distribution formula that adds in systematic (asset-correlation) risk at a 99.9% confidence level, subtracts the expected loss already priced into the loan, and scales the result by LGD and a maturity adjustment.", derivation: "<p>Start from the single-factor (Vasicek) credit model, where a borrower's asset return decomposes into a systematic (market-wide) piece and an idiosyncratic (firm-specific) piece, tied together by the asset correlation \\(R\\):</p><p>\\[ \\text{PD}_{99.9\\%} = N\\!\\left(\\sqrt{\\dfrac{1}{1-R}}\\,N^{-1}(\\text{PD}) + \\sqrt{\\dfrac{R}{1-R}}\\,N^{-1}(0.999)\\right) \\]</p><p>This is the conditional (stressed) probability of default if the systematic factor takes its worst 99.9%-confidence value — i.e. a severe, one-in-a-thousand-year downturn. Unexpected loss is this stressed default rate minus the PD already embedded in loan pricing (expected loss), and multiplying by \\(\\text{LGD}\\) converts a default-rate gap into a loss-rate gap. The maturity adjustment \\(\\beta\\) then scales this up further for longer-dated loans, since a low-PD borrower held for many years has more time to be downgraded before maturity.</p>" },
    { name: "Equity value (Black-Scholes-Merton)", math: "E = A\\cdot N(d_1) - L\\cdot e^{-rT}\\cdot N(d_2)", note: "Equity as a call option on firm assets A, struck at debt face value L.", plain: "Equity value equals what you'd pay for a call option on the firm's assets, struck at the face value of the debt: the asset value scaled down by the option's delta, minus the present value of the debt scaled down by the risk-neutral probability that the option finishes in the money.", derivation: "<p>Suppose a firm has one zero-coupon loan of face value \\(L\\) maturing at time \\(T\\). At maturity, shareholders' net worth is:</p><p>\\[ \\text{Equity}_T = \\max(A_T - L,\\ 0) \\]</p><p>because if assets \\(A_T\\) exceed the debt \\(L\\), owners pay off the loan and keep the residual; if assets fall short, they walk away (limited liability) and creditors seize the (insufficient) assets. This payoff is identical in shape to a European call option on the assets \\(A\\), struck at \\(L\\), expiring at \\(T\\) — so the Black-Scholes-Merton call formula prices equity directly, with \\(d_1 = \\dfrac{\\ln(A/L) + (r + \\sigma_A^2/2)T}{\\sigma_A\\sqrt{T}}\\) and \\(d_2 = d_1 - \\sigma_A\\sqrt{T}\\).</p>" },
    { name: "Risk-neutral PD (Merton)", math: "PD_{RN} = N(-d_2)", note: "Real-world PD: replace r with \\(\\mu\\) (expected asset return) inside d2 — real-world PD is lower since \\(\\mu\\) > r typically.", plain: "N(−d2) is the risk-neutral probability that the option expires worthless — i.e. that firm assets end up below the debt's face value at maturity, so shareholders default rather than repay." },
    { name: "Distance to default", math: "\\text{DD} = d_2", note: "Uses the real-world d2 (with \\(\\mu\\) in place of r). DD is the number of standard deviations of asset value that separate the firm from its default point.", plain: "Distance to default measures, in standard-deviation units of asset volatility, how far the firm's current asset value sits above the debt it owes — a bigger DD means a safer firm.", derivation: "<p>\\[ d_2 = \\dfrac{\\ln(A/L) + \\left(\\mu - \\dfrac{\\sigma_A^2}{2}\\right)T}{\\sigma_A\\sqrt{T}} \\]</p><p>Replacing the risk-free rate \\(r\\) with the firm's expected asset return \\(\\mu\\) converts the risk-neutral \\(d_2\\) into its real-world counterpart. Because \\(\\mu > r\\) in practice (investors demand a risk premium above the risk-free rate for holding risky assets), the real-world \\(d_2\\) is larger than the risk-neutral \\(d_2\\), which makes the real-world default probability \\(N(-d_2)\\) smaller than the risk-neutral one — real-world PD is lower than risk-neutral PD.</p>" },
    { name: "RAROC", math: "\\text{RAROC} = \\dfrac{\\text{Loan revenue}}{\\text{Capital at risk}}", note: "Loan revenue = Loan value × (spread + fees − losses − costs) × (1−tax). Loan profitable if RAROC > bank's cost of capital.", plain: "RAROC restates a loan's after-tax profit as a percentage of the capital the bank must set aside against it, so loans of very different sizes and risk levels can be compared on one scale.", derivation: "<p>Numerator — loan revenue:</p><p>\\[ \\text{Loan revenue} = \\text{Loan value} \\times (s + f - l - c) \\times (1 - x) \\]</p><p>where \\(s\\) is the spread between the loan rate and the bank's cost of capital, \\(f\\) is fee income, \\(l\\) is expected loan losses, \\(c\\) is operating cost, and \\(x\\) is the tax rate — this is simply the loan's pre-tax net margin, after-taxed.</p><p>Denominator — capital at risk, one common way to estimate it uses (modified) duration to capture how much the loan's market value would fall if rates rose:</p><p>\\[ \\Delta L = -\\,\\dfrac{D \\times L \\times \\Delta i}{1 + i} \\]</p><p>where \\(D\\) is the loan's duration, \\(L\\) its value, \\(i\\) the current interest rate, and \\(\\Delta i\\) the assumed adverse rate move. The bank treats the resulting drop \\(|\\Delta L|\\) as the capital it must hold against the loan. A second method instead uses the unexpected loan loss, \\(\\alpha \\times \\text{LGD} \\times \\text{EAD}\\), where \\(\\alpha\\) scales a chosen confidence level to a number of standard deviations of the historical default-rate distribution (\\(\\alpha \\approx 2.6\\) at 99.5% confidence under a normal assumption, but 5–6 in practice since loan-loss distributions are skewed, not normal).</p>" }
  ],

  concepts: [
    {
      name: "CAMEL",
      def: "A five-part scoring framework examiners use to evaluate a bank's overall financial condition: Capital adequacy (does the bank hold enough loss-absorbing capital, judged against historical and current positioning?), Asset quality (are the bank's loans performing, or showing signs of delinquency — including the interest-rate and liquidity risk embedded in those assets?), Management (the quality of risk-management structure: business strategy, financial performance, internal controls and policies), Earnings (stability of core earnings, net interest margin, return on assets, and future earnings potential, with an eye toward stressed economic scenarios), and Liquidity (exposure to interest-rate risk in investments plus the risk of a short-term liquidity event that could threaten the bank's viability).",
      intuition: "Think of CAMEL as a doctor's full physical for a bank — not one vital sign, but five, each catching a different way a bank can fail: too little capital cushion, a loan book quietly rotting, weak leadership, earnings that look fine until you stress them, or a cash crunch even while solvent.",
      pitfall: "'Asset quality' is the delinquent-loan bucket specifically — a frequent quiz target for which CAMEL letter maps to which concept. Don't confuse it with 'Earnings' (profitability trend) or 'Liquidity' (short-term funding risk).",
      related: []
    },
    {
      name: "CAR and the IRB capital formula",
      def: "CAR = (Tier 1 Capital + Tier 2 Capital) / Risk-Weighted Assets (RWA), minimum 8% (Basel II) or 10.5% (Basel III). RWA can be derived two ways: the standardized approach (a supervisor prescribes fixed risk weights per asset category — simple to apply but typically set conservatively high because it can't reflect any one bank's actual risk profile) or the internal ratings-based (IRB) approach (a bank's own historical data and internal credit models estimate PD and LGD per borrower, feeding the asymptotic single risk factor (ASRF) model, which assumes the loan portfolio is diversified enough that only systematic — market-wide — risk remains). Under IRB, the capital charge K depends on LGD, PD, asset correlation R, and a maturity adjustment \\(\\beta\\).",
      example: "R decreases as PD increases (higher-PD firms more idiosyncratic); R increases with firm size (bigger firms track the broad economy more). \\(\\beta\\) is higher for low-PD borrowers (more room to deteriorate); capital rises with maturity. Basel III raised CAR from 8% to 10.5%, and separately added liquidity/leverage requirements, sharper focus on counterparty and securitization risk, and a formal stress-testing/model-validation program.",
      pitfall: "Both comparative statics (R vs PD, R vs size) are exam favorites — know the DIRECTION of each, not just that they're related. Also don't confuse the standardized approach (regulator-set weights) with the IRB approach (bank-modeled inputs) — a question describing 'predetermined weights set by a supervisory authority' is testing the standardized approach, not IRB.",
      related: [{ r: 20, label: "R20 — the EL/UL logic this formula is built on" }],
      memory: "R falls as PD rises (risky firms are idiosyncratic); R rises with size (big firms move with the market)."
    },
    {
      name: "Three families of default models",
      def: "Judgmental (also called the qualitative or expert-system approach; the '5C' framework — Character: the borrower's personality/reputation; Capacity: ability to repay on time; Capital: how much of the borrower's own money is at risk in the deal; Collateral: any secondary claim backing the loan; Conditions: the business environment and loan-specific circumstances — relies on expert judgment, usable for both consumer and corporate loans, and is most valuable when little or no historical data exists, e.g., project finance, where each project is too unique for statistical comparison. Weaknesses: hard to validate, slow to update, not transparent or consistent). Empirical (mines historical data — accepted/rejected loans, good-standing/defaulted loans — for statistical patterns, increasingly via machine learning, which can surface new risk factors like corporate-governance quality; usable for consumer and corporate loans; more transparent and empirically testable than judgmental methods, and can update in real time; weakness is that historical patterns may not hold in unprecedented conditions, and not all inputs — e.g. quarterly financial statements — update as fast as market data). Financial/market models (grounded in economic theory, hence 'normative,' and reliant on market data, so usable for corporate borrowers ONLY, unlike the other two families; split into structural models, where default is an endogenous consequence of the firm's own capital structure — the Merton model — versus reduced-form models, where default is driven by a random exogenous event such as a Poisson jump process, calibrated off credit-derivative and bond market data).",
      related: ["The Merton model"]
    },
    {
      name: "The Merton model",
      def: "Equity is a call option on firm assets, struck at the face value of debt L. If assets A_T > L at maturity, shareholders exercise (repay debt); otherwise they walk away and creditors get the assets. Shareholders play the role of the call option's buyer; creditors are effectively the option's writer, who temporarily 'own' the firm but have handed shareholders the right to buy it back by repaying the loan.",
      example: "E = A·N(d1) − \\(L\\cdot e^{-rT}\\cdot N(d2)\\); risk-neutral PD = N(−d2) (assumes assets grow at the risk-free rate r); real-world PD replaces r with μ, the firm's expected asset return, inside d2; distance to default DD = d2 computed with μ (standard deviations of asset value above the default point). To actually solve the model you need five known inputs — market value of equity E (the borrower's market cap), equity volatility σE (estimated from historical market data), time to maturity T, face value of debt L (in practice, usually the borrower's short-term debt), and the risk-free rate r — and then solve simultaneously for the two unknowns, asset value A and asset volatility σA (R25 covers this simultaneous-solving machinery precisely).",
      pitfall: "Because Merton's PD comes out of an option-pricing model, it is a RISK-NEUTRAL probability, not a real-world one — an easy detail to miss when a question mixes the two.",
      related: [{ r: 25, label: "R25 — the precise numerical Merton machinery" }, { r: 29, label: "R29 — Merton reused inside the CVA/derivatives context" }],
      memory: "Equity = a call option on the firm. Default = the option expiring worthless."
    },
    {
      name: "Merton's cousins",
      def: "Moody's-KMV EDF: uses historical (not normal) default distribution; default point = short-term debt + ½ long-term debt (more closely approximating actual loan obligations than Merton's short-term-only debt figure). CreditMetrics (from JPMorgan): a mark-to-market model that prices a loan via 'peer set analysis' — comparing the borrower to the default and rating-migration records of similarly-rated peers, using a rating transition matrix, historical recovery rates, and bond-market yield margins; it is explicitly NOT a rating tool itself, just a way to turn existing ratings into risk measures; it evaluates risk in three stages — building reporting profiles across a wide range of instruments (bonds, non-performing loans, letters of credit, swaps), capturing volatility from rating changes and defaults via the transition matrix, and aggregating individual loan valuations into portfolio-level correlations. CreditRisk+ (developed by Credit Suisse in 1997): ignores capital structure entirely — it doesn't care WHY a firm might default, only that some small, independent probability of default exists — and models purely a binary default/no-default outcome via a Poisson process (chosen because a Poisson distribution sets the average default rate equal to its variance, matching how rare, independent default events actually behave); it needs the least data of the three cousins because it discards ratings and capital-structure detail altogether.",
      pitfall: "Merton's default point uses ONLY short-term debt; Moody's-KMV adds half of long-term debt. This is the most commonly tested Merton-vs-KMV distinction — don't mix it up with the OTHER difference (historical vs. standard normal distribution). Also don't confuse CreditMetrics (accounts for ALL loans and rating migrations, i.e. upgrades AND downgrades) with CreditRisk+ (only cares about bankruptcy/bad-credit scenarios, i.e. default only).",
      related: [{ r: 26, label: "R26 — CreditMetrics and CreditRisk+ resurface as full Credit VaR models" }],
      memory: "KMV = Merton + half the long-term debt + real (not normal) historical data."
    },
    {
      name: "RAROC",
      def: "Risk-adjusted return on capital = loan revenue / capital at risk. Loan revenue = loan value × (spread s + fees f − expected losses l − operating costs c) × (1 − tax rate x). Capital at risk can be estimated two ways: via duration, \\(\\Delta L = -\\dfrac{D\\times L\\times \\Delta i}{1+i}\\) (the estimated drop in the loan's market value if rates rise by \\(\\Delta i\\)), or via unexpected loss, \\(\\alpha \\times LGD\\times EAD\\) \\((\\alpha \\approx 2.6\\sigma\\) at 99.5% under a normal assumption, but 5–6\\(\\sigma\\) in practice since loan-loss distributions are skewed, not normal).",
      example: "Worked example from the source: a $1,000,000 loan carries a 0.1% commission, a 0.65% spread over the bank's cost of capital, 0.2% operating costs, and an 11.1% tax rate — loan revenue = $1,000,000 × (0.0065 + 0.001 − 0.002) × (1 − 0.111) = $4,889.50. The loan has duration 3.75, current rate 10.5%, and rates are expected to rise 1.5%: capital at risk = 3.75 × $1,000,000 × 0.015 / 1.105 ≈ $50,905. RAROC = $4,889.50 / $50,905 ≈ 9.61%. The loan is profitable as long as the bank's own cost of capital is below 9.61%.",
      pitfall: "A loan is profitable if RAROC exceeds the bank's OWN cost of capital — not some universal hurdle rate. Also, don't forget the duration-based capital-at-risk formula divides by (1 + i), not just \\(D\\times L\\times \\Delta i\\) alone — dropping that denominator is a common calculation slip.",
      related: [{ r: 20, label: "R20 — economic capital, the denominator's conceptual twin" }]
    }
  ],

  connections: {
    from: [
      { r: 20, why: "The EL/UL machinery here becomes the input to the IRB capital formula and RAROC's capital-at-risk denominator." }
    ],
    to: [
      { r: 25, why: "The Merton model gets its precise numerical treatment — solving simultaneously for asset value and volatility." },
      { r: 26, why: "CreditMetrics and CreditRisk+ resurface here as full portfolio Credit VaR models." },
      { r: 29, why: "Merton reappears inside the CVA/derivatives credit risk context." }
    ],
    confused: [
      { what: "Merton's default point vs Moody's-KMV's default point", how: "Merton uses ONLY short-term debt as the default threshold; KMV adds half of long-term debt — a distinct fact from KMV's separate use of historical (not normal) default distributions." },
      { what: "CAR minimum under Basel II vs Basel III", how: "8% under Basel II; 10.5% under Basel III (includes the capital conservation buffer) — don't cite the wrong regime's number." }
    ]
  },

  misconceptions: [
    { wrong: "\"Asset correlation R in the IRB formula rises as PD rises.\"", right: "R FALLS as PD rises — higher-PD (riskier) firms tend to be more idiosyncratic, less tied to broad economic movements." },
    { wrong: "\"Merton's default point and Moody's-KMV's default point are the same.\"", right: "Merton uses only short-term debt; KMV adds half of long-term debt to the default point — the most commonly tested Merton-vs-KMV distinction." },
    { wrong: "\"CreditRisk+ models rating migrations like CreditMetrics.\"", right: "CreditRisk+ ignores capital structure entirely and models only a binary default/no-default outcome via a Poisson process — it needs the LEAST data of the three cousin models but captures the least detail." },
    { wrong: "\"A loan is profitable if its RAROC is positive.\"", right: "A loan is profitable only if RAROC exceeds the bank's OWN cost of capital — a positive but sub-hurdle RAROC still destroys value relative to the bank's required return." }
  ],

  highYield: [
    { stars: 5, what: "Merton model: equity as a call option, \\(E=A\\cdot N(d1)- L\\cdot e^{-rT}\\cdot N(d2)\\), risk-neutral PD=N(−d2).", why: "The single most important model in Book 2 — reused with increasing precision in R25 and R29." },
    { stars: 4, what: "Merton vs. Moody's-KMV: default point (short-term debt only vs. + half long-term debt) and distribution assumption (normal vs. historical).", why: "The most commonly tested Merton-vs-KMV distinction, explicitly flagged as easy to conflate." },
    { stars: 4, what: "IRB formula comparative statics: R falls with PD, R rises with size; \\(\\beta\\) higher for low-PD borrowers.", why: "A clean set of directional facts, reliably tested as 'which way does R move.'" },
    { stars: 3, what: "Three default model families (judgmental/empirical/financial) and when each applies.", why: "Straightforward classification question, useful as a quick conceptual anchor." },
    { stars: 3, what: "RAROC formula and the 'profitable if RAROC > cost of capital' rule.", why: "A clean decision-rule fact, easily tested with a numeric RAROC vs. hurdle-rate comparison." }
  ],

  recall: [
    { q: "Why does asset correlation R fall as a borrower's PD rises, in the IRB formula?", a: "Higher-PD firms tend to be more idiosyncratic — their fortunes are driven more by firm-specific troubles than by broad economic movements, so their asset value correlation with the general market (and hence with other firms) is lower." },
    { q: "State precisely how Merton's default point differs from Moody's-KMV's default point.", a: "Merton's default point uses only short-term debt. Moody's-KMV adds half of long-term debt to the default point — a separate fact from KMV's other distinguishing feature (using an empirical/historical, not standard normal, default distribution)." },
    { q: "A bank's loan generates RAROC of 12%, and its cost of capital is 14%. Is the loan a good business decision?", a: "No — despite a positive RAROC, 12% is below the bank's 14% cost of capital, meaning the loan destroys economic value relative to what the bank's capital could otherwise earn. Profitability requires RAROC to exceed the cost of capital, not just be positive." },
    { q: "Why is CreditRisk+ described as needing the least data among the three Merton-cousin models?", a: "It ignores capital structure entirely and models only a binary default/no-default event via a Poisson process — it doesn't need equity volatility, asset values, or rating transition matrices, just default rate and its variability, making it the most data-parsimonious of the three." }
  ],

  hooks: [
    { title: "Equity as a lottery ticket on the firm", text: "Merton's whole model in one image: shareholders hold a call option on firm value, struck at the debt owed. Assets beat debt → cash the option in. Assets miss → walk away, let creditors have what's left." },
    { title: "KMV = Merton plus half a debt load", text: "Moody's-KMV is Merton's cousin who counts half of long-term debt toward the default point, and trusts real history over the normal curve." }
  ],

  summary: `<p><strong>CAMEL</strong>: Capital, Asset quality, Management, Earnings, Liquidity. <strong>CAR</strong> = Capital/RWA (min 8% Basel II, 10.5% Basel III). <strong>IRB charge K</strong>: R falls as PD rises, rises with size; \\(\\beta\\) (maturity adj.) higher for low-PD borrowers. <strong>Three default model families</strong>: judgmental (5C), empirical, financial (Merton structural / reduced-form). <strong>Merton</strong>: equity = call option on assets struck at debt L; \\(E=A\\cdot N(d1)- L\\cdot e^{-rT}\\cdot N(d2)\\); PD_RN=N(−d2); DD=d2. <strong>KMV</strong> adds ½ long-term debt to the default point + uses historical distribution. <strong>CreditMetrics</strong>: mark-to-market via rating transitions. <strong>CreditRisk+</strong>: Poisson default-only, least data needed. <strong>RAROC</strong> = loan revenue/capital at risk; profitable only if RAROC > bank's cost of capital.</p>`,

  eli5: `<p>Imagine your friend wants to borrow $100 to start a lemonade stand, using only the stand itself (not their own savings) as collateral. If the lemonade stand does well and is worth $150 by summer's end, your friend sells it, pays you back your $100, and pockets the extra $50 — a clear win they'd always take. But if the stand flops and is only worth $60, your friend can just hand you the stand and walk away owing nothing more, even though you only get $60 back on a $100 loan. Notice the shape of your friend's outcome: they either get "stand's value minus what they owe" when things go well, or "zero" when things go badly — they never actually lose money beyond what they put in, because there wasn't much of their own money in it to begin with. That is exactly Merton's model of a levered company: shareholders (your friend) hold something that behaves like a bet with no downside beyond their stake and unlimited upside, which is precisely the payoff of a call option, while the lender (you) absorbs the loss when the "stand" (the firm's assets) is worth less than what's owed.</p>`,

  thinkLike: `<p>A bank credit officer sizing up a single corporate loan is really answering two separate questions in sequence, and the exam tests both independently. The first question is regulatory: "how much capital am I legally required to hold against this specific loan?" — that's the IRB formula, and a good risk manager keeps the comparative statics in their head as reflexes, not lookups: a riskier (higher-PD) borrower actually needs a LOWER asset-correlation input because its trouble is usually company-specific, a bigger borrower needs a HIGHER one because its fate tracks the whole economy, and a long-maturity loan to a currently-safe borrower needs MORE capital, not less, because that borrower has more room to fall before the loan matures. The second question is commercial: "even after holding that capital, does this loan make the bank money?" — that's RAROC, and the practitioner's mental model is simple: compute the after-tax margin the loan throws off, divide by whatever capital the first question said you must set aside, and compare the resulting percentage to the bank's own cost of capital, not some external benchmark. Examiners love to test the difference between "profitable" and "RAROC is merely positive" — a 9% RAROC against an 11% cost of capital is a loan that should never be booked, even though the raw number looks fine in isolation. Underneath both questions sits Merton: a risk manager treats a firm's equity price as continuously-updated market information about how close that firm is to default, because equity IS a call option on the firm's assets, and a call option's price falls as the underlying gets closer to being worthless.</p>`,

  breakdown: [
    {
      title: "CAMEL — the five components of a bank health-check",
      points: [
        "Capital adequacy: does the bank hold enough loss-absorbing capital, judged against its own historical and current positioning (not just today's snapshot)?",
        "Asset quality: are the bank's loans performing or delinquent, factoring in the interest-rate and liquidity risk embedded in those assets specifically?",
        "Management: the quality of the bank's risk-management structure — its business strategy, financial performance, and internal controls and policies.",
        "Earnings: the stability of core earnings, net interest margin, return on assets, and future earnings potential, with attention to how earnings would hold up under stressed economic conditions.",
        "Liquidity: exposure to interest-rate risk in the bank's investments plus the risk of a short-term funding crunch that could threaten the bank's viability even if it is solvent on paper."
      ]
    },
    {
      title: "Two routes to risk-weighted assets (RWA)",
      points: [
        "Standardized approach: a supervisory authority prescribes fixed, predetermined risk weights per asset category. Easy for any bank to apply, but because the weights are set externally (not tailored to one bank's actual portfolio), they are set conservatively high — usually costlier in capital terms than a bank's true risk would justify.",
        "Internal ratings-based (IRB) approach: the bank itself estimates PD and LGD per borrower using its own historical data and internal credit scoring, then feeds those into the asymptotic single risk factor (ASRF) model — which assumes the loan portfolio is diversified enough that idiosyncratic (firm-specific) risk has been diversified away, leaving only systematic (market-wide) risk to capitalize against."
      ]
    },
    {
      title: "Three families of default-prediction models",
      points: [
        "Judgmental (qualitative/expert-system): the 5C framework — Character, Capacity, Capital, Collateral, Conditions — relies on expert judgment rather than statistics; best when little historical data exists (e.g. one-off project finance deals); weak on validation, speed, and consistency.",
        "Empirical: mines historical loan data (accepted vs. rejected, good-standing vs. defaulted) for statistical patterns, increasingly via machine learning; works for both consumer and corporate loans, is transparent and testable, but can fail in unprecedented conditions its training data never saw.",
        "Financial/market models: theory-driven ('normative') and reliant on market data, so usable for corporate borrowers only; split into structural models where default is an endogenous result of the firm's own capital structure (Merton) versus reduced-form models where default is a random exogenous event (e.g. a Poisson jump), calibrated off credit-derivative and bond-market prices."
      ]
    },
    {
      title: "Merton's three 'cousin' models",
      points: [
        "Moody's-KMV EDF: keeps Merton's option logic but sets the default point at short-term debt plus half of long-term debt (closer to real loan obligations), and uses an empirical/historical default distribution instead of the standard normal curve.",
        "CreditMetrics (JPMorgan): a mark-to-market model built on 'peer set analysis' — pricing a loan off the historical default and rating-migration record of similarly-rated peers, using a rating transition matrix, recovery rates, and bond-market yield spreads; it captures both defaults AND rating migrations (upgrades and downgrades).",
        "CreditRisk+ (Credit Suisse, 1997): ignores capital structure and the 'why' of default entirely, modeling only a binary default/no-default outcome as a Poisson process (a natural fit because a Poisson distribution's mean equals its variance, matching how rare, largely independent default events behave); needs the least data of the three because it discards ratings and balance-sheet detail."
      ]
    }
  ],

  quiz: [
    {
      q: "In the IRB capital formula, why does asset correlation R fall as a borrower's PD rises?",
      options: [
        "Riskier borrowers are usually in trouble for firm-specific (idiosyncratic) reasons rather than broad economic downturns",
        "Regulators impose a lower R by policy to reduce capital charges on distressed borrowers",
        "Higher PD always signals a larger firm, and larger firms have higher R",
        "R is mathematically forced downward whenever N⁻¹(PD) increases"
      ],
      answer: 0,
      why: "A borrower already struggling is usually struggling for company-specific reasons (a bad product, fraud, a lost lawsuit), which lowers how tied its fortunes are to the broad economy. The 'higher PD always means a larger firm' answer reverses the well-known size relationship (R rises WITH size, unrelated to PD directly); the 'regulatory policy' answer invents a motive not in the source; the 'mathematically forced by N⁻¹(PD)' answer describes the mechanics of the formula, not the economic reason for R's value."
    },
    {
      q: "A firm has assets currently worth more than its debt's face value, and shareholders in the Merton model are described as holding a call option on those assets. What does 'exercising' that option correspond to economically?",
      options: [
        "Shareholders selling their equity stake to creditors",
        "Shareholders repaying the debt at maturity and keeping the residual firm value",
        "Creditors seizing the firm's assets before maturity",
        "The firm issuing new equity to raise cash"
      ],
      answer: 1,
      why: "The call option's 'exercise' is shareholders paying off the loan (the strike price, L) and keeping whatever assets are left over — exactly max(A_T − L, 0). The 'creditors seize assets before maturity' answer describes what happens when shareholders instead let the option expire (default), not exercise; the 'selling equity to creditors' and 'issuing new equity' answers are not part of the Merton payoff logic at all."
    },
    {
      q: "How does Moody's-KMV's default point differ from Merton's original default point?",
      options: [
        "KMV uses only long-term debt; Merton uses only short-term debt",
        "KMV adds half of long-term debt to short-term debt; Merton uses only short-term debt",
        "KMV and Merton use identical default points but different volatility estimates",
        "KMV ignores debt maturity entirely and uses total assets as the default point"
      ],
      answer: 1,
      why: "KMV's default point is short-term debt plus half of long-term debt, a closer approximation of when a firm actually starts missing obligations; Merton's original default point is short-term debt alone. The 'KMV uses only long-term debt' answer reverses the two; the 'identical default points' answer wrongly claims they're identical (a common conflation the source explicitly flags); the 'ignores maturity, uses total assets' answer fabricates a rule not in the source."
    },
    {
      q: "A $1,000,000 loan carries a 0.65% spread over the bank's cost of capital, 0.1% fee income, 0.2% operating costs, and an 11.1% tax rate, with no expected losses. What is the loan revenue?",
      options: [
        "$5,500.00",
        "$4,889.50",
        "$6,500.00",
        "$3,900.00"
      ],
      answer: 1,
      why: "Loan revenue = $1,000,000 × (0.0065 + 0.001 − 0) × (1 − 0.111) = $1,000,000 × 0.0075 × 0.889 = $4,889.50 (as worked in the source example). The $6,500 answer omits the tax adjustment; the $5,500 answer uses the wrong pre-tax margin; the $3,900 answer applies too large a tax haircut."
    },
    {
      q: "A bank's loan produces a RAROC of 12%, and the bank's own cost of capital is 14%. Is the loan a good business decision?",
      options: [
        "Yes — any positive RAROC signals a profitable loan",
        "No — RAROC must exceed the bank's own cost of capital, and 12% falls short of 14%",
        "Yes — RAROC only needs to exceed the risk-free rate, which it clearly does",
        "Cannot be determined without knowing the loan's LGD"
      ],
      answer: 1,
      why: "The profitability rule is RAROC > the bank's OWN cost of capital, not merely RAROC > 0 (the 'any positive RAROC' answer) or RAROC > the risk-free rate (the 'exceeds the risk-free rate' answer) — both are classic exam traps. LGD (the 'cannot be determined' answer) is irrelevant once RAROC has already been computed."
    },
    {
      q: "Why does CreditRisk+ require the least data among Merton, Moody's-KMV, CreditMetrics, and CreditRisk+ itself?",
      options: [
        "It uses a normal distribution instead of a historical one, which simplifies calibration",
        "It captures rating migrations instead of defaults, which need fewer data points",
        "It ignores capital structure and rating information entirely, modeling only a binary default/no-default outcome via a Poisson process",
        "It relies on equity market prices only, which are the cheapest data source"
      ],
      answer: 2,
      why: "CreditRisk+ deliberately discards capital-structure detail and rating-transition information, treating default as a simple Poisson event described by just a default rate and its variability — the minimal data footprint of the four models. The 'captures rating migrations' answer reverses CreditRisk+ and CreditMetrics (CreditMetrics is the one that captures migrations); the 'normal distribution' and 'equity market prices only' answers describe unrelated or incorrect mechanics."
    }
  ],

  sources: [
    { title: "Merton model — Wikipedia", url: "https://en.wikipedia.org/wiki/Merton_model", note: "Overview of the structural credit-risk model treating equity as a call option on firm assets." },
    { title: "CAMELS rating system — Wikipedia", url: "https://en.wikipedia.org/wiki/CAMELS_rating_system", note: "Background on the bank-supervision rating framework (CAMEL plus the later 'S' for sensitivity to market risk)." },
    { title: "Basel III: international regulatory framework for banks — BIS", url: "https://www.bis.org/bcbs/basel3.htm", note: "Primary-source summary of the Basel III capital, liquidity, and leverage requirements referenced in the CAR discussion." },
    { title: "Capital Adequacy Ratio (CAR) — Investopedia", url: "https://www.investopedia.com/terms/c/capitaladequacyratio.asp", note: "Plain-language walkthrough of CAR, Tier 1/Tier 2 capital, and risk-weighted assets." }
  ],

  pdf: { book: 2, query: "This topic focuses on modeling credit risk and credit risk assessment approaches" }
});
