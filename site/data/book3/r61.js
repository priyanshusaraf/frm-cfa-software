FRM.register({
  book: 3, reading: 61,
  session: "Capital and Regulatory Frameworks",
  title: "High-Level Summary of Basel III Reforms",
  tagline: "A deliberately brief bridge reading — the December 2017 reforms (effective 2022) that finalize Basel III, setting up R62's detailed SMA formula. Know the goals and big-picture shifts, don't get lost in mechanics.",

  teaches: `<p>The four goals of the December 2017 reforms, what changed by risk type, and the output floor rule.</p>`,

  why: `<p>GARP explicitly says: don't get lost in the mechanics here. This reading's job is to explain WHY the 2017 reforms exist (restrict internal models, standardize more, add an output floor) before R62 gives you the actual operational risk formula that resulted.</p>`,

  intuition: `<p>The 2017 reforms have a consistent philosophy across every risk type: RESTRICT internal models (banks were using them to shrink capital in ways regulators found hard to compare across institutions) and EXPAND standardized approaches (more comparable, harder to game). The output floor is the enforcement mechanism: no matter how favorable a bank's internal model result looks, its RWA can't fall below 72.5% of what the standardized approach would require — a hard backstop against model-shopping.</p>`,

  visual: `<div class="widget" data-widget="capitalstack"></div>`,

  formulas: [
    { name: "Output floor rule", math: "RWA = max(RWA under approved approach, 72.5\\% \\times RWA under standardized approach)", note: "Stops large banks from using internal models to shrink capital requirements far below the standardized approach." }
  ],

  concepts: [
    {
      name: "Four goals of the December 2017 reforms",
      def: "Expand the standardized approach's robustness/sensitivity (credit, CVA, operational risk); restrict internal model approaches for the same three risk types; add a G-SIB leverage ratio buffer; create a more risk-sensitive output floor.",
      related: ["What changed, by risk type"]
    },
    {
      name: "What changed, by risk type",
      def: "Standardized credit risk: more granular risk weights (e.g., mortgage risk weight now depends on LTV), reduced reliance on external ratings. IRB credit risk: A-IRB removed for large/mid corporates and financial institutions (forced to F-IRB); input floors added for PD/LGD/EAD. CVA risk: IRB approach removed entirely; must use standardized (SA-CVA) or basic (BA-CVA) approach. Operational risk: AMA and all prior SAs replaced by one single SA (the SMA, detailed in R62), driven by income + historical losses. Leverage ratio: new G-SIB leverage buffer, refined derivatives/off-balance-sheet exposure measure.",
      pitfall: "A-IRB wasn't eliminated everywhere — it was removed specifically for LARGE/MID corporates and financial institutions (forced to Foundation IRB), while smaller exposures may retain more flexibility. Don't overgeneralize the A-IRB restriction to all credit exposures.",
      related: [{ r: 62, label: "R62 — the SMA, operational risk's single new standardized approach" }],
      memory: "Every risk type gets the same medicine: more standardization, less internal-model freedom."
    },
    {
      name: "The output floor",
      def: "RWA = max(RWA under bank's approved approach, 72.5% × RWA under the standardized approach).",
      pitfall: "IRB approaches are EXPLICITLY BARRED from the output-floor calculation for EVERY risk type listed — including CVA risk, where the IRB option was removed from the framework altogether, not just from the floor calculation. Standardized building blocks used to compute the floor: SA for credit risk, SA-CCR for derivatives counterparty risk, SA-CVA/BA-CVA (or 100% of counterparty credit risk capital) for CVA, SEC-ERBA/SEC-SA/1,250% weight for securitization, and the plain SA for both market risk and operational risk.",
      related: [],
      memory: "72.5% is the floor — no matter how good your internal model looks, you can't fall below 72.5% of the standardized RWA."
    }
  ],

  connections: {
    from: [
      { r: 60, why: "The 2017 reforms are the next chapter in the same Basel reform wave that started with Basel 2.5/III." }
    ],
    to: [
      { r: 62, why: "This reading's summary of operational risk reform sets up the actual SMA formula." }
    ],
    confused: [
      { what: "A-IRB removal scope", how: "A-IRB was removed specifically for LARGE/MID corporates and financial institutions (forced to F-IRB) — not a blanket removal across all credit exposures." },
      { what: "Output floor vs IRB approaches", how: "IRB approaches are explicitly BARRED from the output floor calculation for every risk type — the floor is built entirely from standardized-approach building blocks." }
    ]
  },

  misconceptions: [
    { wrong: "\"The 2017 reforms eliminated A-IRB entirely across all credit exposure types.\"", right: "A-IRB was removed specifically for large/mid corporates and financial institutions (forced onto Foundation IRB) — not eliminated across every credit exposure category." },
    { wrong: "\"The output floor allows banks to use their IRB model results as part of the floor calculation.\"", right: "IRB approaches are explicitly BARRED from the output floor calculation for every risk type, including CVA (where IRB was removed from the framework entirely) — the floor is built purely from standardized-approach components." }
  ],

  highYield: [
    { stars: 4, what: "Output floor rule: RWA = max(approved approach, 72.5%×standardized) and IRB's exclusion from the floor calculation.", why: "The signature mechanism of the 2017 reforms, frequently tested with the exact 72.5% figure." },
    { stars: 3, what: "Four goals of the 2017 reforms and what changed by risk type (especially A-IRB's removal for large/mid corporates).", why: "A clean framework connecting this reading's summary to R62's detailed SMA mechanics." }
  ],

  recall: [
    { q: "A bank's internal model produces RWA of $80M for a portfolio, while the standardized approach would require $120M. What is the bank's actual required RWA under the output floor rule?", a: "Output floor = 72.5% × $120M = $87M. Since the bank's own model result ($80M) is below this floor, the bank must use $87M (max of $80M and $87M) as its required RWA." },
    { q: "Why does the 2017 reform package specifically restrict A-IRB for large and mid-sized corporates and financial institutions, rather than removing it for all credit exposures?", a: "These larger exposure categories showed the greatest cross-bank capital variation and were judged hardest to validate/compare reliably across institutions when banks used their own internal models — smaller or more standardized exposure categories didn't raise the same comparability concerns, so the restriction was targeted rather than universal." }
  ],

  hooks: [
    { title: "The 72.5% seatbelt", text: "No matter how good your internal model claims your risk is, the output floor is the seatbelt that stops you from claiming less than 72.5% of what the standardized approach says — model optimism has a hard limit." }
  ],

  summary: `<p><strong>Four goals</strong>: expand standardized approach robustness (credit, CVA, op risk), restrict internal models for the same three risk types, add G-SIB leverage buffer, create a risk-sensitive output floor. <strong>By risk type</strong>: standardized credit risk more granular (LTV-based mortgage weights); A-IRB removed for large/mid corporates & financial institutions (forced to F-IRB) with input floors added; CVA's IRB option removed entirely (SA-CVA/BA-CVA only); operational risk's AMA and all SAs replaced by the single SMA (R62). <strong>Output floor</strong>: RWA=max(approved approach, 72.5%×standardized) — IRB explicitly barred from the floor calculation for every risk type.</p>`
});
