FRM.register({
  book: 2, reading: 26,
  session: "Credit Risk Estimation",
  title: "Credit Value at Risk",
  tagline: "The market-risk-VaR question ('how bad can losses get at confidence X?') for credit losses — with genuinely different mechanics: 1-year horizon, lumpy rare losses, heavier modeling machinery.",

  teaches: `<p>Market VaR vs Credit VaR contrasts; rating transition matrix multi-period math; a survey of the four main modeling families that fight it out across the rest of the book: Vasicek's Gaussian copula (also the Basel IRB engine), CreditRisk+, CreditMetrics, and the correlation model.</p>`,

  why: `<p>Credit losses are lumpy (defaults are discrete, rare events) and slow (1-year horizon, not 1-day) — so the smooth, high-frequency historical simulation approach from market risk (Book 1) doesn't work here. This reading surveys the specialized machinery built specifically for credit's different statistical texture.</p>`,

  intuition: `<p>Market VaR asks "what did daily P&L actually do over the last 1,000 days?" — plenty of data, smooth distribution. Credit VaR asks "what could a whole YEAR of defaults look like?" — defaults are rare, so you can't just look at history; you need a MODEL of how correlated defaults arise. The four families differ in what they capture: Vasicek/CreditRisk+ capture DEFAULTS ONLY; CreditMetrics captures BOTH defaults and downgrades (via Monte Carlo over a full rating transition matrix).</p>`,

  visual: `<div class="widget" data-widget="creditvar"></div>`,

  formulas: [
    { name: "Vasicek worst-case default rate (WCDR)", math: "WCDR(T,X) = N[(N^{-1}(PD) + \\sqrt{\\rho }\\cdot N^{-1}(X)) / \\sqrt{1-\\rho }]", note: "\\(\\rho\\) (credit correlation) proxied by ROA/ROE correlation. This is also the Basel IRB capital engine (R21)." }
  ],

  concepts: [
    {
      name: "Market VaR vs Credit VaR",
      def: "Market VaR: 1-day horizon, historical simulation. Credit VaR: 1-year horizon, elaborate models (transition matrices, copulas).",
      pitfall: "Don't apply market-risk intuitions (daily rebalancing, smooth distributions) to credit VaR — the underlying loss process is fundamentally lumpier and rarer.",
      related: [{ r: 1, label: "R1 — the market VaR machinery this contrasts with" }]
    },
    {
      name: "Rating transition matrices — multi-period math",
      def: "Extend a 1-year matrix to N years by raising it to the N-th power; for periods under 1 year, take the fractional root (e.g., 3 months = 4th root of the 1-year probability).",
      pitfall: "This assumes independence across periods, but RATING MOMENTUM (a recent downgrade raises the odds of another) violates that assumption in reality — the matrix math is a simplification, not a physical law.",
      related: ["Vasicek's Gaussian copula model"],
      memory: "Longer horizon → lower odds of keeping the same rating; shorter horizon → higher odds of staying put."
    },
    {
      name: "Vasicek's Gaussian copula model (Basel IRB engine)",
      def: "WCDR(T,X) = \\(N[(N^{-1}(PD)\\) + \\(\\sqrt{\\rho }\\cdot N^{-1}(X))/\\sqrt{1- \\rho }]\\). \\(\\rho\\) (credit correlation) proxied by correlation between firms' ROA/ROE.",
      pitfall: "Limitation: NO tail correlation — correlation is assumed constant, but real defaults cluster more violently in the tail than a \\(constant-\\rho\\) model predicts.",
      related: [{ r: 21, label: "R21 — the identical formula underlying the IRB capital charge" }, { r: 3, label: "R3 — the tail-dependence problem this constant-ρ assumption misses" }],
      memory: "This IS the Basel IRB formula — memorize once, recognize everywhere."
    },
    {
      name: "CreditRisk+ (Credit Suisse)",
      def: "Independent-default binomial → Poisson approximation (small PD, many loans) → if the expected number of defaults follows a gamma distribution, Poisson becomes negative binomial.",
      pitfall: "As uncertainty \\((\\sigma )\\) about the default rate rises, the chance of many simultaneous defaults rises and the loss distribution becomes positively skewed (vs. symmetric under low/no correlation).",
      related: ["CreditMetrics"]
    },
    {
      name: "CreditMetrics (JPMorgan)",
      def: "Unlike Vasicek/CreditRisk+, captures BOTH defaults and downgrades via Monte Carlo simulation over a rating transition matrix. Each trial: simulate year-end rating → if default, loss = EAD×LGD; if no default, loss = mark-to-market change using the credit-spread term structure for the new rating.",
      pitfall: "Vasicek and CreditRisk+ capture defaults ONLY; CreditMetrics captures defaults AND downgrades. When a question asks 'which model would you use if you also care about migration risk, not just default,' the answer is CreditMetrics.",
      related: [{ r: 21, label: "R21 — CreditMetrics introduced conceptually" }],
      memory: "CreditMetrics is the only one of the three that cares whether you got downgraded, not just whether you defaulted."
    },
    {
      name: "Correlation model & rebalancing strategy",
      def: "Rating changes for different firms are linked via a Gaussian copula, with copula correlation set equal to firms' equity return correlation — a direct bridge to R27's and R29's single-factor/copula machinery.",
      example: "Constant level of risk (sell downgraded bonds, replace with same-rated new ones) produces SMALLER credit VaR than buy-and-hold (ride out the downgrade), because buy-and-hold fully absorbs big downgrade/default losses instead of continuously refreshing back to target rating.",
      related: [{ r: 27, label: "R27 — the single-factor model this bridges to" }]
    }
  ],

  connections: {
    from: [
      { r: 25, why: "Every PD estimate produced there becomes an input into these portfolio-level credit loss models." },
      { r: 1, why: "The market VaR framework this reading explicitly contrasts against." }
    ],
    to: [
      { r: 27, why: "The single-factor model gets built from scratch, generalizing Vasicek's formula here." },
      { r: 21, why: "Vasicek's WCDR formula IS the IRB capital charge formula, just with different labels." }
    ],
    confused: [
      { what: "Vasicek/CreditRisk+ (default only) vs CreditMetrics (default + downgrade)", how: "If a question cares about migration/downgrade risk specifically, only CreditMetrics captures it; the others treat everything short of default as a non-event." },
      { what: "Constant-level-of-risk vs buy-and-hold rebalancing", how: "Constant-level-of-risk continuously refreshes the portfolio back to target rating (smaller VaR); buy-and-hold absorbs the full downgrade/default hit (larger VaR)." }
    ]
  },

  misconceptions: [
    { wrong: "\"CreditRisk+ and CreditMetrics capture the same risks.\"", right: "CreditRisk+ (like Vasicek) captures DEFAULTS ONLY. CreditMetrics uniquely captures BOTH defaults and downgrades via full rating-transition Monte Carlo simulation." },
    { wrong: "\"Rating transition matrices accurately capture real-world default dynamics over multiple periods.\"", right: "The matrix-power approach assumes independence across periods, but rating momentum (a downgrade raises the odds of another) violates this — a known, tested simplification." },
    { wrong: "\"A buy-and-hold credit strategy has lower Credit VaR than continuously rebalancing to target rating.\"", right: "The opposite — buy-and-hold has HIGHER Credit VaR because it fully absorbs downgrade/default losses; constant-level-of-risk rebalancing sells downgraded bonds and replaces them, producing smaller VaR." }
  ],

  highYield: [
    { stars: 5, what: "Vasicek WCDR formula — identical to the R21 IRB capital charge, just relabeled.", why: "One formula, two reading numbers — a guaranteed 'don't study twice' efficiency point." },
    { stars: 4, what: "Which models capture default-only vs. default+downgrade (Vasicek/CreditRisk+ vs. CreditMetrics).", why: "The single most heavily tested distinction in this reading." },
    { stars: 3, what: "Constant-level-of-risk vs. buy-and-hold Credit VaR comparison.", why: "A clean directional fact with intuitive reasoning behind it." },
    { stars: 3, what: "Rating momentum violating the independence assumption behind matrix-power math.", why: "A conceptual caveat frequently tested as 'what assumption does this method violate.'" }
  ],

  recall: [
    { q: "A risk manager wants a model that captures losses from BOTH downgrades and outright defaults. Which of the three named models should they use, and why?", a: "CreditMetrics — it uniquely simulates the full rating transition (not just default/no-default) via Monte Carlo, marking to market using the credit-spread term structure appropriate to whatever new rating each simulated path lands on. Vasicek and CreditRisk+ only model the binary default/no-default outcome." },
    { q: "Why does a buy-and-hold credit strategy produce higher Credit VaR than a constant-level-of-risk strategy?", a: "Buy-and-hold rides out downgrades and absorbs the full mark-to-market or default loss from deteriorating credits. Constant-level-of-risk continuously sells downgraded names and replaces them with fresh, same-rated bonds, effectively refreshing the portfolio's risk profile and avoiding the full accumulated loss from any single name's deterioration." },
    { q: "What key real-world phenomenon does the rating-transition-matrix-to-the-Nth-power approach fail to capture, and why does it matter?", a: "Rating momentum — the empirical fact that a recent downgrade raises the probability of a further downgrade. The matrix-power approach assumes each period's transition is independent of prior transitions, understating the true risk of a credit that's already begun deteriorating." }
  ],

  hooks: [
    { title: "One formula, two names", text: "Vasicek's WCDR and the Basel IRB capital charge (R21) are the SAME equation. Learn it once here, recognize it forever." },
    { title: "Two questions credit models ask", text: "'Did it default?' (Vasicek, CreditRisk+) vs. 'What's its rating NOW?' (CreditMetrics) — the second question is strictly richer, capturing downgrade pain the first ignores entirely." }
  ],

  summary: `<p><strong>Market VaR</strong> (1-day, historical sim) vs <strong>Credit VaR</strong> (1-year, elaborate models — lumpy, rare losses). <strong>Migration matrices</strong>: raise to the Nth power for multi-year, fractional root for sub-year — assumes independence, violated by rating momentum. <strong>Vasicek's Gaussian copula</strong> (=Basel IRB engine): WCDR(T,\\(X)=N[(N^{-1}(PD)+\\sqrt{\\rho }\\cdot N^{-1}(X))/\\sqrt{1- \\rho }]\\) — no tail correlation captured (constant \\(\\rho )\\). <strong>CreditRisk+</strong>: Poisson/negative-binomial, defaults only, needs least data. <strong>CreditMetrics</strong>: Monte Carlo over rating transitions, captures BOTH defaults AND downgrades — the answer whenever migration risk matters. <strong>Rebalancing</strong>: constant-level-of-risk < buy-and-hold in Credit VaR.</p>`
});
