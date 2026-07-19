FRM.register({
  book: 2, reading: 30,
  session: "Credit Risk Estimation",
  title: "Credit Derivatives",
  tagline: "Puts a precise price on the CDS spread you've been treating as a given input since R25. Everything else here is a variation on one balance equation: PV(payments) = PV(payoff).",

  teaches: `<p>The CDS spread balance equation, risk-neutral PD implied by market spreads, marking CDS to market, binary CDS, credit indices, fixed coupons/up-front payments, CDS forwards and options, total return swaps, and synthetic CDOs.</p>`,

  why: `<p>Every prior reading (R25 onward) treated the CDS spread as a given number. This reading shows where that number actually comes from — solved by setting the PV of what the protection buyer pays equal to the PV of what they might receive, and solving for the breakeven spread.</p>`,

  intuition: `<p>A CDS is a bet with a very specific balance sheet: the buyer pays a stream of premiums (PV of expected payments + accrual) in exchange for a contingent payoff if the reference entity defaults (PV of expected payoff). The market spread is whatever number makes these two sides EQUAL in present value. Once you have that spread, you can back out the RISK-NEUTRAL PD implied by the market — not the "true" PD, just whatever hazard rate reconciles the model spread with the quoted market spread.</p>
  <p>A useful shortcut: the recovery rate assumption barely matters for matching a given spread, because risk-neutral PD ≈ proportional to 1/(1−RR) — a higher assumed RR just implies a correspondingly higher RN PD, netting out in the final spread.</p>`,

  formulas: [
    { name: "CDS spread balance equation", math: "\\text{PV(expected premium payments + accrual)} = \\text{PV(expected payoff)}", note: "Solve for spread s. Everything else in this reading is a variation on this one equation." },
    { name: "Up-front payment", math: "\\text{Up-front} = (\\text{spread} - \\text{fixed coupon})\\times \\text{duration}\\times \\text{notional}", note: "Spread > coupon → seller pays buyer is WRONG; verify direction from the worked example — spread<coupon → seller pays buyer the difference." },
    { name: "Breakeven synthetic CDO spread", math: "s \\times (A + B) = C", note: "A = PV(notional outstanding over life), B = PV(final accrual on losses), C = PV(expected credit losses)." },
    { name: "CPR from SMM", math: "CPR = 1 - (1-SMM)^{12}", note: "Constant prepayment rate annualized from single monthly mortality." }
  ],

  concepts: [
    {
      name: "CDS spread — the core balance equation",
      def: "Set PV(expected premium payments + accrual) = PV(expected payoff) and solve for spread s.",
      example: "3-yr CDS, \\(\\lambda =3\\)%, RR=35%, r=4%, annual settlement, default mid-year: survival probs Yr1=97.045%, Yr2=94.176%, Yr3=91.393%. PV(payments)=2.6123s, PV(accrual)=0.0406s, total=2.6529s. Solving PV(payments)=PV(payoff) → s=1.99%.",
      related: ["Risk-neutral PD implied by market spread"]
    },
    {
      name: "Risk-neutral PD implied by market spread",
      def: "The PD used is not the 'true' PD — it's whatever hazard rate makes the model spread match the quoted market spread (solved by iteration/Solver).",
      pitfall: "Convenient result: the recovery rate ASSUMPTION barely matters for matching a given market spread, because RN PD ≈ proportional to 1/(1−RR) — a higher assumed RR just implies a correspondingly higher RN PD, netting out. Don't assume you need a precise, independently-verified RR to back out a usable PD from spreads.",
      related: [{ r: 25, label: "R25 — risk-neutral vs real-world PD distinction" }]
    },
    {
      name: "Marking CDS to market",
      def: "MtM (to protection seller) = PV(expected payments at original spread) − PV(expected payoff at current market parameters).",
      pitfall: "If the spread has WIDENED since inception, the protection BUYER gains and the SELLER loses (protection is now worth more) — get the direction right, it's tested both ways.",
      related: []
    },
    {
      name: "Binary CDS",
      def: "Pays full notional on default regardless of recovery (RR effectively = 0% in the payoff calc only).",
      pitfall: "Because the payoff side is bigger (no recovery offset), a binary CDS spread is ALWAYS higher than the equivalent vanilla CDS spread (e.g., 3.06% binary vs. 1.99% vanilla in the worked example).",
      related: ["The CDS spread balance equation"],
      memory: "Binary = no recovery cushion on payoff = bigger promised payout = bigger spread charged for it."
    },
    {
      name: "Credit indices (CDX NA IG, iTraxx Europe)",
      def: "125 equally-weighted investment-grade names. On one default: contract continues with 124 names, protection seller pays (1−RR)×notional for that name, and the ongoing annual payment shrinks proportionally (divide by 125, subtract). Updated twice a year to roll out fallen angels.",
      related: []
    },
    {
      name: "Fixed coupons & up-front payments",
      def: "Standardized contracts trade with a fixed coupon (e.g., 100bps IG); the gap between market spread and fixed coupon is settled as an up-front payment.",
      example: "Fixed coupon=100bps, market spread=65bps, duration=4.125, notional=$100,000. Price>100 (since coupon>spread) → protection SELLER pays BUYER the up-front difference.",
      pitfall: "Direction rule: if market spread < fixed coupon, the contract is worth MORE than par to the buyer (they're overpaying the fixed coupon relative to fair value), so the SELLER compensates the BUYER up front. Memorize via the worked example's direction, not an abstract rule alone.",
      related: []
    },
    {
      name: "CDS forwards & options",
      def: "Forwards: lock a spread for a CDS starting later; ceases if the reference entity defaults before start. Options: pay a premium for the right (not obligation) to enter at a strike spread.",
      pitfall: "Forwards at market rates require NO premium; options ALWAYS require a premium — a clean, testable distinction.",
      related: []
    },
    {
      name: "Total return swaps (TRS) vs. CDS",
      def: "TRS pays the total return (price change + coupons) of a bond in exchange for a floating rate.",
      pitfall: "TRS hedges BOTH credit risk AND interest-rate risk (unlike a pure CDS, which only hedges credit risk), and functions as a financing tool (synthetic leverage on the bond).",
      related: [],
      memory: "CDS hedges credit only. TRS hedges credit AND rates — plus gives you synthetic leverage."
    },
    {
      name: "Synthetic CDOs and tranche spreads",
      def: "Breakeven spread: s×(A+B)=C, where A=PV(notional outstanding), B=PV(final accrual on losses), C=PV(expected credit losses).",
      example: "$100M notional, 25 bonds×$4M, avg CDS spread=2% → annual spread income=$2M. Equity (5%, $5M): 10%/yr ($0.5M). Mezzanine (20%, $20M): 5.625%/yr ($1.125M). Senior (75%, $75M): 0.5%/yr ($0.375M).",
      pitfall: "One-factor Gaussian copula approach: assumes homogeneous default-time distribution Q(t) and a single constant pairwise correlation \\(\\rho\\); conditional PD given the common factor F used with the binomial distribution for probability of exactly k defaults by time t. At inception, tranches are priced to earn a spread CONSISTENT WITH THEIR SENIORITY, not equally — equity earns far more per dollar of notional than senior, reflecting its much higher expected loss, NOT an arbitrage.",
      related: [{ r: 28, label: "R28 — the tranche structure this prices" }],
      memory: "Different spreads by tranche isn't a pricing error — it's compensation matching each tranche's very different expected loss."
    },
    {
      name: "Implied correlation (compound vs. base)",
      def: "Compound (tranche) correlation: iterative search matching one tranche's model spread to its market spread — shows a 'correlation smile.' Base correlation: cumulative, built from compound correlations — shows a 'correlation skew,' rising with seniority.",
      pitfall: "Alternatives to the one-factor Gaussian copula exist precisely because of this model-fit imperfection: heterogeneous models, other copulas (Student's t, Archimedean, Clayton, Marshall-Olkin), random recovery rates, implied copula models, dynamic (structural/reduced-form) models.",
      related: [{ r: 28, label: "R28 — the same smile/skew vocabulary introduced" }]
    }
  ],

  connections: {
    from: [
      { r: 25, why: "This reading prices the CDS spread that R25 treated as an input to the hazard rate formula." },
      { r: 28, why: "Synthetic CDO tranche pricing directly extends the single-factor tranche machinery." }
    ],
    to: [],
    confused: [
      { what: "Binary CDS spread vs vanilla CDS spread", how: "Binary CDS spread is ALWAYS higher — its payoff has no recovery offset, so it promises a bigger payout per unit of default probability, requiring a bigger premium to balance the equation." },
      { what: "CDS forwards vs CDS options", how: "Forwards at market rates need no premium (a fair bet); options always need a premium (paying for the right, not obligation, to enter)." },
      { what: "Compound correlation vs base correlation", how: "Compound is tranche-specific and shows a smile; base is cumulative (built up from compound correlations) and shows a monotonic skew with seniority." }
    ]
  },

  misconceptions: [
    { wrong: "\"A binary CDS should trade at a lower spread than an equivalent vanilla CDS, since 'binary' sounds simpler/safer.\"", right: "Binary CDS spreads are ALWAYS HIGHER — the payoff has no recovery-rate offset (full notional paid regardless of recovery), so the bigger promised payout requires a bigger premium to balance the pricing equation." },
    { wrong: "\"Different spreads across CDO tranches at inception suggest a mispricing or arbitrage opportunity.\"", right: "Tranches are deliberately priced to earn spreads CONSISTENT WITH THEIR SENIORITY — equity earning far more than senior per dollar of notional reflects its far higher expected loss, not an arbitrage." },
    { wrong: "\"The recovery rate assumption significantly changes the risk-neutral PD backed out from a given market CDS spread.\"", right: "It barely matters — RN PD is approximately proportional to 1/(1−RR), so a higher assumed RR just implies a correspondingly higher RN PD, largely netting out in the final spread calibration." }
  ],

  highYield: [
    { stars: 5, what: "The core CDS balance equation (PV payments = PV payoff) and the full worked spread calculation.", why: "Every other concept in this reading is a variation on this one equation — master it and the rest follows." },
    { stars: 4, what: "Binary CDS spread always exceeds vanilla CDS spread, and why.", why: "A clean, frequently tested directional fact with clear underlying logic." },
    { stars: 4, what: "Synthetic CDO tranche pricing: breakeven spread formula and why different tranches earn very different spreads (not an arbitrage).", why: "Connects directly to R28's tranche framework — a high-value synthesis question." },
    { stars: 3, what: "Up-front payment mechanics and direction (who pays whom when spread ≠ fixed coupon).", why: "A precise, easy-to-flip-the-direction-on calculation, worth memorizing via the worked example." },
    { stars: 3, what: "CDS forwards (no premium) vs options (always a premium).", why: "A clean, compact distinction, reliably tested." }
  ],

  recall: [
    { q: "Why does a binary CDS always trade at a higher spread than an economically identical vanilla CDS on the same reference entity?", a: "A binary CDS pays the FULL notional on default with no recovery offset, while a vanilla CDS payoff is reduced by the recovery rate (payoff = (1−RR)×notional). Since the binary payoff is larger for the same default probability, the balance equation (PV payments = PV payoff) requires a higher premium (spread) to compensate for the bigger promised payout." },
    { q: "A synthetic CDO's equity tranche earns 10%/year while its senior tranche earns only 0.5%/year on the same underlying pool. Is this evidence of mispricing?", a: "No — tranches are deliberately priced to reflect their very different expected losses. The equity tranche absorbs losses first and has a far higher expected loss per dollar of notional, so it must earn a correspondingly higher spread to be a fair investment. Different tranche spreads reflect seniority-consistent risk compensation, not an arbitrage opportunity." },
    { q: "A CDS trades with a fixed coupon of 100bps, but the current market spread is 150bps. Who pays the up-front payment, and why?", a: "The market spread (150bps) exceeds the fixed coupon (100bps), meaning the fixed-coupon contract is UNDER-compensating the protection seller relative to fair value — so the protection BUYER pays the SELLER an up-front amount equal to PV of the spread-coupon gap, to make the seller whole for accepting a below-market fixed coupon." },
    { q: "Why does the choice of recovery rate assumption have surprisingly little effect on the risk-neutral PD backed out from a quoted market CDS spread?", a: "Risk-neutral PD is approximately proportional to 1/(1−RR) in the spread-implied hazard rate relationship. A higher assumed RR mechanically implies a correspondingly higher implied PD to still match the same observed market spread — the two assumptions move together, largely netting out their combined effect on the final calibrated spread." }
  ],

  hooks: [
    { title: "One balance equation, many costumes", text: "PV(payments) = PV(payoff) is the whole reading's DNA. Binary CDS, up-front payments, synthetic CDOs — all just this same equation solved with different payoff assumptions." },
    { title: "No recovery cushion, bigger bill", text: "Binary CDS = the insurer promises to pay the FULL amount, no recovery discount. Naturally the premium (spread) has to be bigger to match that bigger promise." }
  ],

  summary: `<p>Core equation: <strong>PV(expected payments) = PV(expected payoff)</strong>, solved for spread s. <strong>Risk-neutral PD</strong> from market spreads is calibrated, not 'true'; RR assumption barely matters (RN PD ∝ 1/(1−RR)). <strong>MtM</strong>: spread widening since inception benefits the BUYER, hurts the SELLER. <strong>Binary CDS</strong> spread always exceeds vanilla (no recovery offset on payoff). <strong>Credit indices</strong>: 125 names, defaults shrink the pool and the ongoing payment. <strong>Up-front payments</strong> reconcile fixed coupon vs. market spread gaps. <strong>Forwards</strong> (no premium) vs. <strong>options</strong> (always a premium). <strong>TRS</strong> hedges credit AND rate risk, unlike pure CDS. <strong>Synthetic CDO</strong>: s(A+B)=C; different tranche spreads reflect seniority-consistent risk, not mispricing. <strong>Implied correlation</strong>: compound (smile) vs. base (skew) — either pattern reveals one-factor Gaussian model imperfection.</p>`
});
