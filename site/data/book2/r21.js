FRM.register({
  book: 2, reading: 21,
  session: "Credit Risk Analysis",
  title: "Introduction to Credit Risk Modeling and Assessment",
  tagline: "Three jobs in one reading: CAMEL (bank health-check), the IRB regulatory capital formula, and the three families of default-prediction models — with Merton as the star.",

  teaches: `<p>CAMEL mnemonic for bank health; the capital adequacy ratio (CAR) and IRB capital charge formula; three families of default models (judgmental, empirical, financial/market); the Merton model conceptually (equity as a call option on firm assets) and its cousins (Moody's-KMV, CreditMetrics, CreditRisk+); and RAROC.</p>`,

  why: `<p>Merton is the single most important model in the whole book — it comes back in R25 (precise numerical form) and R29 (inside CVA). Get comfortable with the CONCEPT here (equity = call option on assets) so R25's algebra feels like a continuation, not new material.</p>`,

  intuition: `<p>Merton's insight: shareholders effectively hold a call option on the firm's assets, struck at the face value of debt L. If assets exceed L at maturity, shareholders "exercise" by repaying debt and keeping the residual; if assets fall short, they walk away and creditors get the (insufficient) assets. This single idea — equity as a call option — is why option-pricing machinery (Black-Scholes) can price corporate default risk.</p>
  <p>The IRB capital formula has two exam-favorite comparative statics: asset correlation R DECREASES as PD increases (higher-PD firms are more idiosyncratic, less tied to the broad economy), and R INCREASES with firm size (bigger firms move more with the broad economy). Maturity adjustment \\(\\beta\\) is higher for LOW-PD borrowers (more room to deteriorate) — capital requirements rise with maturity.</p>`,

  formulas: [
    { name: "Capital Adequacy Ratio", math: "\\text{CAR} = \\dfrac{\\text{Tier 1} + \\text{Tier 2 Capital}}{\\text{Risk-Weighted Assets}}", note: "Minimum \\(\\alpha\\) = 8% (Basel II) or 10.5% (Basel III)." },
    { name: "IRB capital charge K", math: "K = \\text{LGD}\\times\\left[N\\!\\left(\\sqrt{\\tfrac{1}{1-R}}\\,N^{-1}(\\text{PD}) + \\sqrt{\\tfrac{R}{1-R}}\\,N^{-1}(0.999)\\right) - \\text{PD}\\right]\\times \\beta\\,(\\text{maturity adj.})", note: "R (asset correlation) falls as PD rises; rises with firm size. \\(\\beta\\) (maturity adj.) is higher for low-PD borrowers." },
    { name: "Equity value (Black-Scholes-Merton)", math: "E = A\\cdot N(d1) - L\\cdot e^{-rT}\\cdot N(d2)", note: "Equity as a call option on firm assets A, struck at debt face value L." },
    { name: "Risk-neutral PD (Merton)", math: "PD_{RN} = N(-d2)", note: "Real-world PD: replace r with \\(\\mu\\) (expected asset return) inside d2 — real-world PD is lower since \\(\\mu\\) > r typically." },
    { name: "RAROC", math: "\\text{RAROC} = \\dfrac{\\text{Loan revenue}}{\\text{Capital at risk}}", note: "Loan revenue = Loan value × (spread + fees − losses − costs) × (1−tax). Loan profitable if RAROC > bank's cost of capital." }
  ],

  concepts: [
    {
      name: "CAMEL",
      def: "Capital adequacy, Asset quality, Management, Earnings, Liquidity — a bank health-check mnemonic.",
      pitfall: "'Asset quality' is the delinquent-loan bucket specifically — a frequent quiz target for which CAMEL letter maps to which concept.",
      related: []
    },
    {
      name: "CAR and the IRB capital formula",
      def: "CAR = Capital/RWA, minimum 8% (Basel II) or 10.5% (Basel III). IRB capital charge K depends on LGD, PD, asset correlation R, and a maturity adjustment \\(\\beta\\).",
      example: "R decreases as PD increases (higher-PD firms more idiosyncratic); R increases with firm size (bigger firms track the broad economy more). \\(\\beta\\) is higher for low-PD borrowers (more room to deteriorate); capital rises with maturity.",
      pitfall: "Both comparative statics (R vs PD, R vs size) are exam favorites — know the DIRECTION of each, not just that they're related.",
      related: [{ r: 20, label: "R20 — the EL/UL logic this formula is built on" }],
      memory: "R falls as PD rises (risky firms are idiosyncratic); R rises with size (big firms move with the market)."
    },
    {
      name: "Three families of default models",
      def: "Judgmental (5C: Character, Capacity, Capital, Collateral, Conditions — expert opinion; best when no history exists, e.g., project finance). Empirical (historical data, ML pattern-finding). Financial/market models (structural — Merton; or reduced-form — Poisson jump; corporate only, needs market data).",
      related: ["The Merton model"]
    },
    {
      name: "The Merton model",
      def: "Equity is a call option on firm assets, struck at the face value of debt L. If assets A_T > L at maturity, shareholders exercise (repay debt); otherwise they walk away and creditors get the assets.",
      example: "E = A·N(d1) − \\(L\\cdot e^{-rT}\\cdot N(d2)\\); risk-neutral PD = N(−d2); distance to default DD = d2 (standard deviations of asset value above the default point).",
      related: [{ r: 25, label: "R25 — the precise numerical Merton machinery" }, { r: 29, label: "R29 — Merton reused inside the CVA/derivatives context" }],
      memory: "Equity = a call option on the firm. Default = the option expiring worthless."
    },
    {
      name: "Merton's cousins",
      def: "Moody's-KMV EDF: uses historical (not normal) default distribution; default point = short-term debt + ½ long-term debt. CreditMetrics: mark-to-market, uses a rating transition matrix + credit spreads (not a rating tool itself). CreditRisk+: ignores capital structure entirely, models only default/no-default via a Poisson process; needs the least data.",
      pitfall: "Merton's default point uses ONLY short-term debt; Moody's-KMV adds half of long-term debt. This is the most commonly tested Merton-vs-KMV distinction — don't mix it up with the OTHER difference (historical vs. standard normal distribution).",
      related: [{ r: 26, label: "R26 — CreditMetrics and CreditRisk+ resurface as full Credit VaR models" }],
      memory: "KMV = Merton + half the long-term debt + real (not normal) historical data."
    },
    {
      name: "RAROC",
      def: "Risk-adjusted return on capital = loan revenue / capital at risk. Loan revenue = loan value × (spread + fees − losses − costs) × (1−tax). Capital at risk ≈ \\(\\alpha \\times LGD\\times EAD\\) \\((\\alpha \\approx 2.6\\sigma\\) at 99.5% under normality, but \\(5-6\\sigma\\) in practice given skew) or via duration: \\(\\Delta L=- D\\times L\\times \\Delta i\\).",
      pitfall: "A loan is profitable if RAROC exceeds the bank's OWN cost of capital — not some universal hurdle rate.",
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

  summary: `<p><strong>CAMEL</strong>: Capital, Asset quality, Management, Earnings, Liquidity. <strong>CAR</strong> = Capital/RWA (min 8% Basel II, 10.5% Basel III). <strong>IRB charge K</strong>: R falls as PD rises, rises with size; \\(\\beta\\) (maturity adj.) higher for low-PD borrowers. <strong>Three default model families</strong>: judgmental (5C), empirical, financial (Merton structural / reduced-form). <strong>Merton</strong>: equity = call option on assets struck at debt L; \\(E=A\\cdot N(d1)- L\\cdot e^{-rT}\\cdot N(d2)\\); PD_RN=N(−d2); DD=d2. <strong>KMV</strong> adds ½ long-term debt to the default point + uses historical distribution. <strong>CreditMetrics</strong>: mark-to-market via rating transitions. <strong>CreditRisk+</strong>: Poisson default-only, least data needed. <strong>RAROC</strong> = loan revenue/capital at risk; profitable only if RAROC > bank's cost of capital.</p>`
});
