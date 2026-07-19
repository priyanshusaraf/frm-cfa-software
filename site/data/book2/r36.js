FRM.register({
  book: 2, reading: 36,
  session: "Counterparty Risk Management",
  title: "Future Value and Exposure",
  tagline: "Builds the exposure vocabulary that R37's CVA formula plugs directly into — treat this as 'R37's input data.'",

  teaches: `<p>The full exposure metric family (expected MtM, EE, PFE, EPE, ENE, effective EE/EPE), how credit exposure differs from VaR, exposure profile shapes by product type, the netting factor formula, and margin period of risk (MPoR) mechanics.</p>`,

  why: `<p>Get the SHAPE of exposure profiles for different product types memorized — it's tested visually and verbally, not just numerically. Everything quantitative in R31-35 (netting, collateral parameters, CCP margin) becomes numerical input here.</p>`,

  intuition: `<p>The core distinction: EXPECTED EXPOSURE (EE) is the average of the potential-loss part of the value distribution (only counting scenarios where you're owed money) — a central-tendency measure. POTENTIAL FUTURE EXPOSURE (PFE) is a high-confidence WORST CASE at one specific point in time — a tail measure, like VaR but for exposure rather than loss.</p>
  <p>Exposure profile SHAPES differ by product because of different underlying forces: bonds/loans stay flat at notional; interest rate swaps HUMP (rising rate uncertainty vs. shrinking remaining cash flows fighting each other); FX/cross-currency swaps rise MONOTONICALLY (large final notional exchange dominates); long options rise until exercise (time value + moneyness potential); long-protection CDS rises then JUMPS at a credit event (spread widening, then the default payoff itself).</p>`,

  visual: `<div class="widget" data-widget="exposure"></div>`,

  formulas: [
    { name: "Netting factor", math: "Netting factor = \\sqrt{(1 + (n-1)\\rho ) / n}", note: "\\(\\rho =1\\) → factor=100% (no benefit). \\(\\rho =0\\), n=2 → 71%. \\(\\rho =0\\), n=4 → 50%. More exposures + lower correlation = bigger benefit." },
    { name: "EE/PFE during MPoR", math: "\\text{EE(MPoR)} = \\text{current exposure}\\times\\sqrt{\\tfrac{\\text{MPoR}}{250}}\\times\\text{vol};\\quad \\text{PFE(MPoR)} = z\\times\\text{vol}\\times\\sqrt{\\tfrac{\\text{MPoR}}{250}}", note: "10-day MPoR, 7% annual vol, 99% (z=2.33): PFE = \\(2.33\\times 0.07\\times \\sqrt{10/250}\\) = 3.27% of notional." },
    { name: "Collateral volatility with correlation", math: "\\sigma_overall = \\sqrt{\\sigma_trade^{2} + \\sigma_collateral^{2} - 2\\rho \\sigma_trade\\sigma_collateral}", note: "Uncorrelated case simplifies to \\(\\sqrt{\\sigma_collateral^{2}+\\sigma_exposure^{2}}\\)." }
  ],

  concepts: [
    {
      name: "The exposure metric family",
      def: "Expected MtM: expected value at a future date (can be negative). Expected exposure (EE): expected loss if MtM positive AND counterparty defaults (only positive part counts). Potential future exposure (PFE): high-confidence worst-case MtM at a specific future date. Expected positive exposure (EPE): average of EE across time. Expected negative exposure (ENE): mirror of EPE from counterparty's perspective. Effective EE/EPE: non-decreasing EE (captures rollover risk on sub-1-year trades).",
      pitfall: "EE only counts the POSITIVE part of the value distribution — it's not the same as expected MtM, which can be negative.",
      related: [{ r: 37, label: "R37 — these metrics feed directly into the CVA formula" }],
      memory: "Expected MtM can go negative; EE never can — it's already filtered to 'only when it's positive.'"
    },
    {
      name: "Credit exposure vs. VaR — three extra considerations",
      def: "Application: exposure used for BOTH pricing and risk management (VaR is risk management only). Time horizon: exposure spans many future dates (drift, vol, co-dependence all matter); VaR's short horizon lets you ignore them. Risk mitigants: netting and (especially future, uncertain) collateral must be modeled into exposure in a way VaR doesn't need to worry about.",
      related: []
    },
    {
      name: "Exposure profile shapes by product",
      def: "Bonds/loans/repos: ≈flat at notional (PFE tracks notional ~1:1). Interest rate swaps: peaked/hump (rising rate uncertainty vs. shrinking remaining cash flows). FX/cross-currency swaps: monotonically increasing (high FX vol + large final notional exchange dominates). Long options: rising until exercise (time value + potential to move deep ITM). Long-protection CDS: rises then jumps to (1−RR) at a credit event.",
      pitfall: "Payment frequency: receiving more often than paying REDUCES exposure. Exercise dates: a swaption has HIGHER exposure than the equivalent forward swap BEFORE exercise (optionality to walk away adds value/exposure), but LOWER exposure AFTER (the forward swap doesn't have that walk-away option).",
      related: [{ r: 11, label: "R11 — option/bond pricing mechanics underlying these shapes" }],
      memory: "Know the SILHOUETTES: flat (bonds), hump (swaps), rising (FX/options), rise-then-jump (CDS)."
    },
    {
      name: "Netting factor",
      def: "Netting factor = \\(\\sqrt{(1+(n- 1)\\rho )/n}\\). \\(\\rho =1\\) → 100% (no benefit). \\(\\rho =0\\), n=2 → 71%. \\(\\rho =0\\), n=4 → 50%.",
      pitfall: "More exposures + lower correlation = bigger netting benefit. Perfect negative correlation gives the MAXIMUM benefit (trades fully offset) — don't assume \\(\\rho =0\\) is the best case; \\(\\rho\\)→−1 is even better.",
      related: [{ r: 33, label: "R33 — the netting concept this formula quantifies" }]
    },
    {
      name: "Margin period of risk (MPoR)",
      def: "Five steps: (1) valuation/margin call → (2) receiving collateral → (3) settlement (cash: intraday; govt bonds: ~1 day; corporate bonds: ~3 days) → (4) grace period → (5) liquidation/close-out/re-hedge.",
      example: "7% annual vol, 10-day MPoR, 99% confidence (z=2.33): PFE = \\(2.33\\times 0.07\\times \\sqrt{10/250}\\) = 3.27% of notional.",
      related: ["Collateral parameters that create residual exposure"]
    },
    {
      name: "Collateral parameters that create residual exposure",
      def: "MPoR, threshold, minimum transfer amount, initial margin (reduces exposure), rounding. Collateral is PATH-DEPENDENT — today's required collateral depends on what was already posted.",
      example: "Funding exposure vs. credit exposure — five differences: defining value (subjective/close-out-dependent for credit, objective for funding), MPoR (assumes default for credit; funding delay doesn't require default), aggregation (credit nets by counterparty; funding can reuse margin across the whole portfolio), wrong-way risk (a credit-only concept), segregation (restricts reuse, affects both differently).",
      pitfall: "PFE analysis silently assumes a strongly collateralized position and ignores wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk — when a question asks for PFE's limitations, these SPECIFIC omissions (not 'it's just an estimate') are the tested answer.",
      related: [{ r: 37, label: "R37 — wrong-way risk fully developed" }]
    }
  ],

  connections: {
    from: [
      { r: 32, why: "The uncertainty in counterparty exposure described qualitatively there gets a full quantitative vocabulary here." },
      { r: 33, why: "Netting concepts here get their precise quantitative formula (the netting factor)." },
      { r: 34, why: "CSA parameters (threshold, MTA, initial margin) become quantitative inputs to exposure calculations." }
    ],
    to: [
      { r: 37, why: "Every exposure metric here (EE, EPE, ENE, netting factor, MPoR) is the direct input set to the CVA formula." }
    ],
    confused: [
      { what: "Expected MtM vs Expected Exposure (EE)", how: "Expected MtM can be negative (it's a raw average); EE only counts the POSITIVE part of the value distribution (already filtered for 'only when we're owed money')." },
      { what: "EE vs PFE", how: "EE is a CENTRAL-TENDENCY measure (average of the positive part); PFE is a TAIL measure (high-confidence worst case at one specific date) — like the difference between an average and a VaR." },
      { what: "Swaption exposure before vs after exercise date", how: "Before: swaption has HIGHER exposure than the forward swap (the option to walk away from a bad outcome adds value). After: LOWER exposure (once exercised or lapsed, it either becomes the swap or ceases — the forward swap lacks that early flexibility, so it stays exposed longer in a bad state)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Expected exposure (EE) can be negative, just like expected MtM.\"", right: "EE only counts the POSITIVE part of the value distribution (loss if MtM>0 AND counterparty defaults) — it's non-negative by construction, unlike expected MtM which can be negative." },
    { wrong: "\"Receiving payments less frequently than paying them reduces counterparty exposure.\"", right: "The opposite — RECEIVING more often than paying REDUCES exposure, since cash comes in faster than it's owed out, shrinking the average outstanding exposure window." },
    { wrong: "\"PFE analysis fully accounts for wrong-way risk since it already models worst-case exposure.\"", right: "PFE analysis explicitly IGNORES wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk — it silently assumes a strongly collateralized position. These specific omissions are the tested limitations, not a vague 'it's just an estimate.'" },
    { wrong: "\"Zero correlation \\((\\rho =0)\\) gives the maximum netting benefit.\"", right: "Perfect NEGATIVE correlation \\((\\rho\\)→−1) gives the maximum benefit (trades fully offset) — the netting factor formula shows benefit keeps improving as \\(\\rho\\) falls below zero, not just to zero." }
  ],

  highYield: [
    { stars: 5, what: "The exposure profile shapes by product (flat/hump/rising/rise-then-jump) — visual and verbal recognition.", why: "Explicitly flagged as tested visually AND verbally, not just numerically — a distinctive, high-value study target." },
    { stars: 4, what: "EE vs PFE vs EPE vs ENE definitions, especially EE's 'positive part only' filter.", why: "The core vocabulary R37's CVA formula assumes fluent — get this wrong and CVA calculations break." },
    { stars: 4, what: "Netting factor formula and its extremes \\((\\rho =1\\) no benefit, \\(\\rho\\)→−1 maximum benefit).", why: "A clean, frequently tested formula with clear boundary behavior." },
    { stars: 3, what: "PFE's silent assumptions/limitations (ignores WWR, collateral uncertainty, liquidity risk).", why: "A precise 'what's missing' question format GARP favors." },
    { stars: 3, what: "Swaption vs forward swap exposure before/after the exercise date.", why: "A subtle, well-defined comparison connecting option theory to exposure profiles." }
  ],

  recall: [
    { q: "Why does an interest rate swap's exposure profile peak in the middle of its life rather than rising monotonically like an FX swap's?", a: "Two forces fight: rising uncertainty about future rate paths pushes exposure up over time (diffusion), while the shrinking number of remaining cash flows as maturity approaches pulls exposure down (amortization/roll-off). Early on diffusion dominates; later, roll-off dominates, producing a hump. An FX swap lacks this offsetting roll-off force as strongly, since its terminal notional exchange dominates and grows with time." },
    { q: "A netting agreement covers 4 trades with pairwise correlation 0. What is the netting factor, and what does it mean?", a: "Netting factor = \\(\\sqrt{(1+(4- 1)\\times 0)/4}\\) = \\(\\sqrt{1/4}\\) = 50%. This means netted exposure is roughly half of what gross (unnetted) exposure would be — reflecting substantial diversification benefit from combining 4 uncorrelated exposures." },
    { q: "List the specific risks that PFE analysis is known to silently ignore.", a: "Wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk. PFE analysis assumes a strongly collateralized position and doesn't model these — these specific omissions are the standard tested answer when asked about PFE's limitations." },
    { q: "Why does a swaption have HIGHER exposure than an equivalent forward swap before the exercise date, but LOWER exposure after?", a: "Before exercise, the swaption holder retains the OPTION to walk away if the swap would be unfavorable — this optionality itself has positive value in bad states, adding exposure relative to a forward swap that's locked in regardless. After the exercise date (once exercised into a swap, or lapsed), the swaption's distinguishing optionality is gone; the forward swap, having been obligated all along, can accumulate more downside exposure in adverse scenarios that the (now-decided) swaption already avoided by not exercising." }
  ],

  hooks: [
    { title: "Silhouettes to memorize", text: "Flat line (bonds), a hump (swaps — diffusion fights roll-off), a rising ramp (FX/options), a ramp that jumps at the end (CDS pre-default). Four shapes, four stories — memorize the SILHOUETTE, not just the name." },
    { title: "EE already filtered", text: "Expected MtM is the raw average — can go negative. EE has already been through airport security: only the positive part gets through." },
    { title: "Negative correlation is the jackpot, not zero", text: "The netting factor formula keeps improving past \\(\\rho =0\\) — perfect negative correlation (trades that always offset) is the actual best case, not just 'no correlation.'" }
  ],

  summary: `<p><strong>Exposure family</strong>: Expected MtM (can be negative) → EE (positive part only) → PFE (tail, high-confidence worst case) → EPE (time-average of EE) → ENE (counterparty's mirror) → effective EE/EPE (non-decreasing, captures rollover risk). Exposure vs VaR: used for pricing AND risk management, spans many future dates, must model netting/collateral. <strong>Profile shapes</strong>: bonds flat, swaps hump, FX/options rising, CDS rise-then-jump. <strong>Netting factor</strong> = \\(\\sqrt{(1+(n- 1)\\rho )/n}\\) — \\(\\rho =1\\) no benefit, \\(\\rho\\)→−1 maximum benefit. <strong>MPoR</strong>: 5-step process (call→collateral→settlement→grace→liquidation); \\(PFE(MPoR)=z\\cdot vol\\cdot \\sqrt{MPoR/250}\\). PFE ignores wrong-way risk, collateral-value uncertainty, liquidity risk. Collateral is path-dependent.</p>`
});
