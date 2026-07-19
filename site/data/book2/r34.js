FRM.register({
  book: 2, reading: 34,
  session: "Counterparty Risk Management",
  title: "Margin (Collateral) and Settlement",
  tagline: "If netting shrinks exposure by combining trades, collateral shrinks exposure by actually posting assets against it.",

  teaches: `<p>The Credit Support Annex (CSA) — the collateral rulebook: what can be posted, how it's valued, when it moves, and trigger events. Key parameters: threshold, minimum transfer amount, initial margin. Also collateral disputes and their resolution process.</p>`,

  why: `<p>The CSA's parameters are exactly the levers that reappear quantitatively in R36 (exposure profiles) and R37 (CVA) when exposure and CVA get calculated — threshold and minimum transfer amount specifically create windows of uncollateralized exposure that directly raise CVA.</p>`,

  intuition: `<p>Collateral posting isn't automatic or continuous — it's governed by specific parameters that create gaps. THRESHOLD is the amount of exposure allowed to go uncollateralized before any collateral is called at all. MINIMUM TRANSFER AMOUNT prevents tiny, operationally wasteful collateral movements. Both parameters, while operationally sensible, create windows of real uncollateralized exposure that a naive "we have a CSA so we're covered" assumption would miss.</p>`,

  formulas: [
    { name: "Credit support amount (variation margin)", math: "\\text{Credit support amount} = \\text{Exposure} - \\text{Threshold}", note: "Collateral is called if positive, up to the threshold; a negative result means no posting is currently required." }
  ],

  concepts: [
    {
      name: "Credit Support Annex (CSA)",
      def: "The collateral rulebook: defines what can be posted, how it's valued, when it moves, and what happens on trigger events. Key parameters: threshold, minimum transfer amount, initial margin.",
      related: ["Credit support amount"]
    },
    {
      name: "Credit support amount (variation margin)",
      def: "Credit support amount = Exposure − Threshold. Collateral is called if positive, up to the threshold.",
      pitfall: "A negative result means POSTING IS REQUIRED (i.e., the exposure hasn't yet crossed the threshold, so no call is made) — read the sign convention carefully in context; the key operational point is that exposure below the threshold goes uncollateralized by design.",
      related: []
    },
    {
      name: "Roles and collateral types",
      def: "Valuation agent: calls for collateral, handles exposure/market-value/credit-support-amount calculations. Collateral types: cash (most common), government/agency securities, MBS, corporate bonds/CP, letters of credit, equity.",
      related: []
    },
    {
      name: "Collateral disputes",
      def: "Arise from valuation differences, market-data timing mismatches, netting-rule disagreements, or disputes over previously-posted collateral.",
      example: "Resolution: notify by end of next business day → transfer undisputed amounts → for unresolved amounts, request independent third-party quotes.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 33, why: "Collateral is the next lever after netting for shrinking bilateral exposure." }
    ],
    to: [
      { r: 36, why: "CSA parameters (threshold, MTA, initial margin) become quantitative inputs to exposure profile calculations." },
      { r: 37, why: "Threshold and minimum transfer amount directly raise CVA by creating uncollateralized exposure windows." }
    ],
    confused: [
      { what: "Threshold vs minimum transfer amount", how: "Threshold is the exposure LEVEL below which no collateral is called at all; minimum transfer amount is the smallest INCREMENT of collateral that will actually be moved once a call is triggered." }
    ]
  },

  misconceptions: [
    { wrong: "\"A CSA with a threshold and minimum transfer amount fully eliminates counterparty exposure.\"", right: "Both parameters deliberately create windows of UNCOLLATERALIZED exposure (below threshold, or below the minimum transfer amount) — a CSA reduces but does not eliminate exposure, and these gaps directly raise CVA (R37)." },
    { wrong: "\"Collateral disputes are rare and don't need a formal resolution process.\"", right: "Disputes routinely arise from valuation differences, timing mismatches, and netting disagreements — the formal process (notify by next business day → transfer undisputed amounts → third-party quotes for the rest) exists because disputes are a normal, expected occurrence." }
  ],

  highYield: [
    { stars: 4, what: "CSA parameters (threshold, minimum transfer amount, initial margin) and how each creates residual exposure.", why: "Directly quantified later in R36/R37 — a foundational concept for the CVA calculations ahead." },
    { stars: 2, what: "Collateral dispute resolution process (notify → transfer undisputed → third-party quotes).", why: "A straightforward procedural fact, occasionally tested." }
  ],

  recall: [
    { q: "Why does a CSA with a nonzero threshold not fully eliminate a bank's exposure to its counterparty?", a: "The threshold defines an amount of exposure that is allowed to remain UNCOLLATERALIZED before any collateral call is triggered — exposure below the threshold has no collateral protecting it at all, creating a real residual risk that a CSA's existence alone doesn't eliminate." },
    { q: "What operational problem does a minimum transfer amount solve, and what residual risk does it create?", a: "It prevents small, operationally wasteful collateral movements (e.g., transferring $500 back and forth daily). The residual risk is that exposure changes smaller than the MTA go uncollateralized even though a threshold might otherwise be breached — another source of uncollateralized exposure alongside the threshold itself." }
  ],

  hooks: [
    { title: "The gaps collateral leaves behind", text: "Threshold and minimum transfer amount sound like small print, but they're literally windows of uncollateralized exposure — the CSA's fine print IS the risk that CVA has to price." }
  ],

  summary: `<p><strong>CSA</strong>: the collateral rulebook — what's posted, how valued, when it moves. Key parameters: <strong>threshold</strong> (exposure allowed uncollateralized before any call), <strong>minimum transfer amount</strong> (smallest collateral movement made), <strong>initial margin</strong> (reduces exposure further, acts like a 'negative threshold'). <strong>Credit support amount</strong> = Exposure − Threshold. Collateral types: cash (most common), govt/agency securities, MBS, corporate bonds, letters of credit, equity. <strong>Disputes</strong>: notify by next business day → transfer undisputed amounts → third-party quotes for the rest.</p>`
});
