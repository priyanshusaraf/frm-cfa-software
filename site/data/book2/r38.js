FRM.register({
  book: 2, reading: 38,
  session: "Counterparty Risk Management",
  title: "The Evolution of Stress Testing Counterparty Exposures",
  tagline: "What happens to R36's exposure metrics and R37's CVA when you shock the world — equity crashes, rate shocks, credit events.",

  teaches: `<p>Four CCR exposure measures (recap with stress framing), treating counterparty credit risk (CCR) as credit risk vs. market risk vs. both, two shortcomings of stress-testing current exposure, and stressed expected loss for loan vs. derivatives portfolios.</p>`,

  why: `<p>Shorter and more conceptual than R36/R37, but it reuses their vocabulary directly. Stress testing exposes a specific analytical gap: a static market shock says nothing about whether exposure and default probability move TOGETHER — the exact wrong-way risk blind spot R37 flagged.</p>`,

  intuition: `<p>Stressing "current exposure" alone (a snapshot today) has two structural shortcomings: aggregation across many counterparties ignores each one's credit quality (a $10M exposure to a AAA counterparty and a $10M exposure to a CCC counterparty get treated identically), and a static shock provides zero information about wrong-way risk — it can't tell you whether THIS shock scenario is exactly the one where your counterparty is also more likely to default.</p>`,

  formulas: [
    { name: "Stressed expected loss (loan portfolio)", math: "\\text{EL} = \\sum_i \\text{PD}_i\\times \\text{EAD}_i\\times \\text{LGD}_i;\\quad \\text{stress loss} = \\text{EL}_{\\text{stressed}} - \\text{EL}", note: "Shock PD to get EL_stressed." }
  ],

  concepts: [
    {
      name: "Four CCR exposure measures (recap with stress framing)",
      def: "Current exposure (replacement cost): max(0, market value) on default TODAY, assuming zero recovery. Peak exposure: high percentile (95%/99%) of the exposure distribution at a future date. Expected exposure: mean of the exposure distribution at a future date. EPE: time-weighted average of expected exposures.",
      related: [{ r: 36, label: "R36 — these same metrics without the stress framing" }]
    },
    {
      name: "CCR as credit risk, market risk, or both",
      def: "Treat as credit risk → exposed to CVA volatility if CVA isn't marked. Treat as market risk → can hedge market moves but stays exposed to counterparty default/creditworthiness decline.",
      pitfall: "Treating it as BOTH is the prudent (if operationally harder) approach — neither lens alone captures the full risk.",
      related: []
    },
    {
      name: "Stress testing current exposure — two shortcomings",
      def: "(1) Aggregation is hard and ignores counterparty credit quality entirely; (2) it provides no information about wrong-way risk (a static market shock says nothing about whether exposure and PD move together).",
      pitfall: "These are the SPECIFIC, named shortcomings — a generic 'it's just a snapshot' answer misses the tested content.",
      related: [{ r: 37, label: "R37 — wrong-way risk, the exact blind spot named here" }],
      memory: "Static shocks are blind to credit quality AND blind to whether exposure and default move together (WWR)."
    },
    {
      name: "Stressed expected loss",
      def: "Loan portfolio: EL_i = PD_i×EAD_i×LGD_i, summed across the portfolio; stress by shocking PD to get EL_stressed, and the stress loss is EL_stressed − EL.",
      example: "Derivatives portfolio: EL_i is a function of PD_i, LGD_i, and EPE_i multiplied by an alpha factor \\((\\alpha )\\) that scales EPE up to account for portfolio effects.",
      related: [{ r: 20, label: "R20 — the original EL formula this stresses" }],
      memory: "Loan stress: shock PD directly. Derivatives stress: shock via EPE, scaled by an alpha factor for portfolio effects."
    }
  ],

  connections: {
    from: [
      { r: 36, why: "Reuses the exposure vocabulary (current/peak/expected exposure, EPE) with a stress-testing lens." },
      { r: 37, why: "Extends CVA's wrong-way risk concern into the stress-testing context specifically." }
    ],
    to: [
      { r: 55, why: "Bank-wide stress testing (Book 3) generalizes this counterparty-specific stress framework." }
    ],
    confused: [
      { what: "Current exposure vs peak exposure", how: "Current exposure is TODAY's replacement cost (zero recovery assumed); peak exposure is a high-percentile FUTURE exposure at some later date — a tail measure, not a snapshot." }
    ]
  },

  misconceptions: [
    { wrong: "\"Stressing current exposure captures wrong-way risk since it's a worst-case scenario.\"", right: "A static market shock provides NO information about whether exposure and default probability move TOGETHER — that's precisely what wrong-way risk requires, and stressed current exposure structurally cannot capture it." },
    { wrong: "\"Treating CCR purely as market risk (hedging market moves) fully manages the risk.\"", right: "Market-risk hedging leaves the bank exposed to counterparty default/creditworthiness decline — a credit-risk dimension that pure market-risk hedging doesn't address. Prudent practice treats CCR as BOTH." }
  ],

  highYield: [
    { stars: 3, what: "The two named shortcomings of stressing current exposure (aggregation ignoring credit quality; no WWR information).", why: "A precise, specific pair of shortcomings — the tested answer, not a generic critique." },
    { stars: 2, what: "Stressed EL for loan portfolios (shock PD) vs. derivatives portfolios (shock via EPE with alpha factor).", why: "A clean two-case distinction, occasionally tested for which shock mechanism applies to which portfolio type." }
  ],

  recall: [
    { q: "Why doesn't stressing current exposure to a severe market shock tell you anything about wrong-way risk?", a: "A static market shock only recomputes exposure under a hypothetical market state — it says nothing about whether the COUNTERPARTY'S default probability also rises in that same scenario. Wrong-way risk specifically requires modeling the joint relationship between exposure and default probability, which a one-off exposure recalculation cannot capture." },
    { q: "How does stress testing expected loss differ between a loan portfolio and a derivatives portfolio?", a: "For a loan portfolio, you directly shock PD in the EL=PD×EAD×LGD formula and compare to baseline EL. For a derivatives portfolio, EAD isn't fixed — you instead shock EPE (which itself depends on the stressed market scenario) and scale it by an alpha factor that accounts for portfolio-level effects, since derivatives exposure is inherently a function of market conditions rather than a static loan balance." }
  ],

  hooks: [
    { title: "A snapshot can't see the future correlation", text: "Stressing current exposure is like photographing a stormy sky — it shows you the storm, but not whether your ship's captain (the counterparty) is more likely to abandon post in exactly this kind of storm. That's the WWR blind spot." }
  ],

  summary: `<p><strong>Four CCR measures</strong>: current exposure (today's replacement cost), peak exposure (high-percentile future tail), expected exposure (mean future), EPE (time-weighted average). CCR should be treated as BOTH credit risk and market risk — neither lens alone suffices. Stressing current exposure has two named shortcomings: ignores counterparty credit quality in aggregation, and provides no wrong-way risk information. <strong>Stressed EL</strong>: loan portfolios shock PD directly; derivatives portfolios shock via EPE scaled by an alpha factor for portfolio effects.</p>`
});
