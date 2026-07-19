FRM.register({
  book: 2, reading: 27,
  session: "Credit Risk Estimation",
  title: "Portfolio Credit Risk",
  tagline: "Where the single-factor model gets built from scratch — the same model underlying Vasicek (R26), CDO copula pricing (R30), and the Gaussian copula (R29).",

  teaches: `<p>Default correlation for a two-firm portfolio, Credit VaR at the correlation extremes \\((\\rho =1\\), \\(\\rho =0\\) with varying granularity), the single-factor model (conditional independence), and Credit VaR by simulation (the copula method).</p>`,

  why: `<p>The intuition to hold onto throughout: default correlation doesn't change a portfolio's EXPECTED loss, but it massively changes the SHAPE of the loss distribution — specifically the fat tail that Credit VaR is trying to measure. This single-factor model, unchanged, is exactly what R28 uses for tranche behavior and R30 uses to price synthetic CDO tranches.</p>`,

  intuition: `<p>Build intuition at the correlation extremes first. At \\(\\rho =1\\), a portfolio of many credits behaves like ONE credit — either everything defaults or nothing does, so Credit VaR is essentially binary (either $0 at low confidence, or nearly total loss at high confidence). At \\(\\rho =0\\), the law of large numbers takes over: with many independent credits, realized losses cluster tightly around expected loss (binomial), and MORE credits at the same total exposure (finer granularity) shrinks Credit VaR further, because idiosyncratic bad luck in one credit gets diluted across many others.</p>
  <p>The single-factor model formalizes this: each firm's asset return a_i = \\(\\beta_i\\cdot m\\) + \\(\\sqrt{1- \\beta_i^{2}}\\cdot \\varepsilon_i\\), defaulting if a_i ≤ k_i. The magic is CONDITIONAL INDEPENDENCE — once the common market factor m is realized, defaults across firms become independent (all the correlation lives in shared exposure to m). This is why simulating just ONE common factor, then treating each firm independently conditional on it, correctly reproduces the full correlated default structure.</p>`,

  visual: `<div class="widget" data-widget="tranche"></div>`,

  formulas: [
    { name: "Default correlation (two-firm)", math: "\\rho_{12} = (\\pi_{12} - \\pi_{1}\\pi_{2}) / \\sqrt{\\pi_{1}(1-\\pi_{1})\\cdot \\pi_{2}(1-\\pi_{2})}", note: "Explodes combinatorially for n firms: 2ⁿ outcomes, n(n−1)/2 pairwise correlations." },
    { name: "Single-factor asset return", math: "a_i = \\beta_i\\cdot m + \\sqrt{1-\\beta_i^{2}}\\cdot \\varepsilon_i; default if a_i \\le k_i", note: "Conditional on m, default distribution is \\(Normal(\\beta_i\\cdot m\\), \\(\\sqrt{1- \\beta_i^{2}})\\) — less variance than the unconditional SD of 1." },
    { name: "Pairwise default correlation (equal parameters)", math: "\\rho_default = [N_{2}(k,k,\\beta^{2}) - \\pi^{2}] / [\\pi (1-\\pi )]", note: "\\(N_{2}\\) = bivariate normal CDF." }
  ],

  concepts: [
    {
      name: "Default correlation for a two-firm portfolio",
      def: "\\(\\rho_{12}\\) = \\((\\pi_{12}\\) − \\(\\pi_{1}\\pi_{2})/\\sqrt{\\pi_{1}(1- \\pi_{1})\\cdot \\pi_{2}(1- \\pi_{2})}\\).",
      pitfall: "Drawbacks of the full correlation-based framework: explodes combinatorially (2ⁿ outcomes, n(n−1)/2 pairwise correlations — 10 firms = 1,024 outcomes, 45 pairs), doesn't fit option-like credit positions (guarantees, revolvers, convertibles), and defaults are rare so correlation estimates are noisy (typical assumed value ≈0.05).",
      related: ["The single-factor model"]
    },
    {
      name: "Credit VaR at the correlation extremes",
      def: "\\(\\rho =1\\): portfolio acts like one credit. \\(\\rho =0\\), large n: binomial, granularity kicks in and shrinks VaR further.",
      example: "$1,000,000 portfolio, PD=2%, RR=0%: \\(\\rho =1\\) → 98% chance $0 loss, 2% chance total $1M loss, EL=$20,000, VaR(99%)=$980,000. \\(\\rho =0\\), n=50: 95th percentile defaults=3 → loss=$60,000, VaR(95%)=$40,000. \\(\\rho =0\\), n=1,000: 95th percentile defaults=28 → loss=$28,000, VaR(95%)=$8,000.",
      pitfall: "Granularity effect: more (smaller) credits → LOWER credit VaR, because the law of large numbers pulls realized loss toward expected loss. This effect is WEAKER when PD itself is very low.",
      related: ["The single-factor model"],
      memory: "\\(\\rho =1\\): one giant credit. \\(\\rho =0\\) + many names: the law of large numbers tames the tail."
    },
    {
      name: "The single-factor model",
      def: "a_i = \\(\\beta_i\\cdot m\\) + \\(\\sqrt{1- \\beta_i^{2}}\\cdot \\varepsilon_i\\), default if a_i ≤ k_i. Conditional independence: once m is realized, defaults across firms are independent — all correlation lives in shared exposure to m.",
      intuition: "Conditional on m, the default distribution is Normal with mean \\(\\beta_i\\cdot m\\) and SD \\(\\sqrt{1- \\beta_i^{2}}\\) — less than the unconditional SD of 1, because conditioning on the common factor removes some uncertainty.",
      example: "\\(\\beta =0.25\\), confidence=99% → default threshold z=−2.33. Realized market factor for this target loss level = \\((k- \\sqrt{1- \\beta^{2}}\\cdot z)/\\beta\\) ≈ −0.296.",
      related: [{ r: 26, label: "R26 — Vasicek's WCDR, the same model in different notation" }, { r: 28, label: "R28 — tranche pricing built on this exact model" }, { r: 30, label: "R30 — synthetic CDO pricing via the same one-factor Gaussian copula" }],
      memory: "This model, unchanged, IS R28's tranche machinery and R30's CDO pricing engine — learn it once here."
    },
    {
      name: "Credit VaR by simulation (copula method)",
      def: "Four steps: (1) define the copula function (usually normal/Gaussian), (2) simulate default times, (3) get portfolio P&L per scenario, (4) aggregate into a loss distribution and read off the VaR quantile.",
      pitfall: "Granularity reduces Credit VaR by shrinking IDIOSYNCRATIC noise — it does NOT reduce SYSTEMATIC (correlation-driven) risk. A highly granular portfolio with high pairwise correlation can still have large Credit VaR. Don't let 'more loans = automatically safer' become your default assumption.",
      related: [{ r: 9, label: "R9 — the copula machinery this applies" }],
      memory: "Granularity kills idiosyncratic risk, not systematic risk — 1,000 correlated loans are still 1,000 correlated loans."
    }
  ],

  connections: {
    from: [
      { r: 26, why: "Vasicek's WCDR formula gets rebuilt from first principles as the single-factor model here." },
      { r: 9, why: "The Gaussian copula machinery introduced abstractly there gets its concrete application here." }
    ],
    to: [
      { r: 28, why: "R28 applies this exact single-factor machinery to tranched products." },
      { r: 30, why: "Synthetic CDO pricing uses the identical one-factor Gaussian copula." }
    ],
    confused: [
      { what: "Granularity effect vs correlation effect", how: "Granularity (more, smaller loans) shrinks IDIOSYNCRATIC risk only. Correlation (systematic risk) is untouched by granularity — a large, granular, highly-correlated portfolio can still have huge Credit VaR." },
      { what: "Conditional vs unconditional default distribution", how: "Unconditionally, asset return has SD 1. CONDITIONAL on the common factor m, SD shrinks to \\(\\sqrt{1- \\beta^{2}}\\) — conditioning removes exactly the systematic component of uncertainty." }
    ]
  },

  misconceptions: [
    { wrong: "\"More loans in a portfolio always means lower Credit VaR.\"", right: "Only true for the IDIOSYNCRATIC component. If pairwise default correlation is high, granularity does nothing to reduce the systematic risk — a large, highly-correlated portfolio can still have substantial Credit VaR." },
    { wrong: "\"At \\(\\rho =1\\), Credit VaR is just the sum of individual asset VaRs.\"", right: "At \\(\\rho =1\\), the portfolio behaves like ONE credit — either everyone defaults together or no one does. VaR at low confidence can be $0 (below the default-probability threshold), jumping to nearly total loss at high confidence — a binary, not additive, structure." },
    { wrong: "\"Conditioning on the common market factor m increases uncertainty about individual defaults.\"", right: "It DECREASES it — conditional on m, each firm's default distribution has SD \\(\\sqrt{1- \\beta^{2}}\\), strictly less than the unconditional SD of 1, because the systematic component of uncertainty has been resolved by observing m." }
  ],

  highYield: [
    { stars: 5, what: "Credit VaR at correlation extremes \\((\\rho =1\\) vs \\(\\rho =0\\), varying n) — full worked mechanics and the granularity effect.", why: "The core intuition-building exercise of this reading, frequently tested with new numbers plugged into the same setup." },
    { stars: 5, what: "The single-factor model and conditional independence — the engine behind R26, R28, and R30.", why: "Master this once and three other readings become relabeling exercises rather than new learning." },
    { stars: 4, what: "Granularity reduces idiosyncratic risk only, NOT systematic (correlation-driven) risk.", why: "The single most heavily tested conceptual trap in this reading." },
    { stars: 3, what: "Default correlation formula and the combinatorial explosion problem (2ⁿ outcomes, n(n−1)/2 pairs).", why: "Sets up why the single-factor model is necessary in the first place — a good 'why' question." }
  ],

  recall: [
    { q: "A $2,000,000 portfolio has PD=2%, RR=0%, and perfect correlation \\((\\rho =1)\\) across all names. What is the 95% Credit VaR?", a: "At \\(\\rho =1\\) the portfolio behaves as one credit: 98% chance of $0 loss, 2% chance of total $2,000,000 loss. EL=$40,000. At 95% confidence, the loss quantile is $0 (default probability 2% < 5% tail), so Credit VaR = 0−40,000, interpreted as $0 Credit VaR (loss doesn't exceed EL at that confidence level)." },
    { q: "Why does increasing the number of (equally-sized) credits in a zero-correlation portfolio reduce Credit VaR, and why does this effect weaken at very low PD?", a: "With independent defaults, the law of large numbers pulls realized portfolio loss toward its expected value as n grows — idiosyncratic bad luck in any one credit gets diluted across many others. At very low PD, though, defaults are so rare that even a large n doesn't fully smooth out the possibility of a small but nonzero cluster of defaults relative to the tiny expected loss, so the granularity benefit is muted." },
    { q: "In the single-factor model, why does conditioning on the market factor m make defaults independent across firms?", a: "By construction, all correlation between firms' asset returns is channeled through their shared exposure to the common factor m (via \\(\\beta_i)\\). The idiosyncratic term \\(\\varepsilon_i\\) is independent across firms by assumption. Once m is fixed (known), the only remaining source of variation in each firm's asset return is its own independent \\(\\varepsilon_i\\) — so defaults become conditionally independent." },
    { q: "A highly granular portfolio (1,000 small, equal-sized loans) has default correlation \\(\\rho =0.4\\). Does its Credit VaR resemble the \\(\\rho =0\\), n=1,000 case from the reading?", a: "No — granularity only reduces IDIOSYNCRATIC risk. With \\(\\rho =0.4\\) (substantial systematic risk), the loss distribution retains a fat tail driven by the common factor, regardless of how many independent-seeming small loans make up the pool. Credit VaR would be much closer to a high-correlation scenario than the near-riskless \\(\\rho =0\\) granular case." }
  ],

  hooks: [
    { title: "One credit in disguise", text: "At \\(\\rho =1\\), a thousand loans are secretly one loan wearing a thousand costumes — they all default together or not at all." },
    { title: "The dial that granularity can't turn", text: "Granularity is a volume knob for idiosyncratic noise — turn it down by adding more loans. But it's not connected to the SYSTEMATIC risk dial at all; that one only turns with correlation." },
    { title: "The shared weather", text: "Think of m as the shared weather everyone's asset return partially depends on. Once you know the weather (m), each firm's remaining fate \\((\\varepsilon_i)\\) is its own private business, independent of everyone else's." }
  ],

  summary: `<p><strong>Default correlation</strong> (two-firm): \\(\\rho_{12}=(\\pi_{12}- \\pi_{1}\\pi_{2})/\\sqrt{\\pi_{1}(1- \\pi_{1})\\pi_{2}(1- \\pi_{2})}\\) — explodes combinatorially for n firms. <strong>Correlation extremes</strong>: \\(\\rho =1\\) → portfolio acts like ONE credit (binary VaR); \\(\\rho =0\\) + large n → binomial, granularity shrinks VaR via the law of large numbers (weaker at very low PD). <strong>Single-factor model</strong>: \\(a_i=\\beta_im+\\sqrt{1- \\beta_i^{2}}\\varepsilon_{i}\\), default if a_i≤k_i — conditional independence given m is the key property, conditional \\(SD=\\sqrt{1- \\beta^{2}}\\)<1. <strong>Credit VaR by simulation</strong>: define copula → simulate default times → portfolio P&L → aggregate to loss distribution. Granularity reduces IDIOSYNCRATIC risk only — systematic (correlation) risk survives no matter how many loans you add.</p>`
});
