export default ({
  book: 2, reading: 30,
  session: "Credit Risk Estimation",
  title: "Credit Derivatives",
  tagline: "Puts a precise price on the CDS spread you've been treating as a given input since R25. Everything else here is a variation on one balance equation: PV(payments) = PV(payoff).",

  teaches: `<p>The CDS spread balance equation, risk-neutral PD implied by market spreads, marking CDS to market, binary CDS, credit indices, fixed coupons/up-front payments, CDS forwards and options, total return swaps, and synthetic CDOs.</p>
  <p><strong>Vocabulary first, because everything else hangs off it.</strong> A <strong>credit default swap (CDS)</strong> is a bilateral, over-the-counter contract in which the <strong>protection buyer</strong> (the "insured" party — someone who owns or is exposed to a bond and wants to hedge default risk on it) pays a periodic premium, the <strong>CDS spread</strong>, to the <strong>protection seller</strong> (the "insurer") in exchange for a payoff if a "credit event" (default, bankruptcy, or a specified restructuring) happens to a named <strong>reference entity</strong> before the swap matures. Unlike ordinary insurance, which is paid in advance, CDS premiums are paid <em>in arrears</em> — at the end of each settlement period — which is exactly why an <strong>accrual payment</strong> is needed when a default happens mid-period: the buyer still owes the seller for the partial period since the last payment date, even though protection is about to be paid out.</p>
  <p>Most CDS contracts follow ISDA standard terms: common maturities of 1, 3, 5, 7, and 10 years, with quarterly settlement on March 20, June 20, September 20, and December 20 every year. A contract initiated between two of these dates still settles on the next one — e.g., a CDS struck on April 15 has its first (partial) payment due June 20, covering April 15–June 20.</p>
  <p>On a credit event, if the contract settles by physical delivery, the protection seller pays the buyer the full face (notional) value of the bond and receives the defaulted bond in return. Because a firm can have many bonds of the same seniority outstanding, the buyer is free to deliver whichever eligible bond is cheapest to buy in the market — the <strong>cheapest-to-deliver (CTD) bond</strong>. That CTD bond's post-default market price is what actually defines the <strong>recovery rate (RR)</strong> used in CDS pricing: if the CTD trades at $53 per $100 of par right after default, RR = 53%.</p>`,

  why: `<p>Every prior reading (R25 onward) treated the CDS spread as a given number. This reading shows where that number actually comes from — solved by setting the PV of what the protection buyer pays equal to the PV of what they might receive, and solving for the breakeven spread.</p>
  <p>It also explains why credit derivatives exist at all beyond pure pricing mechanics. Consider two banks: Bank A specializes in lending to airlines, Bank B specializes in lending to energy companies. Airlines and energy firms tend to move in opposite directions with oil prices — when energy prices are high, energy firms thrive but airlines (a major fuel cost) struggle, and vice versa. Bank A and Bank B could diversify by directly selling each other 50% of their loan books, but that's operationally messy (loan sales require borrower consent, servicing transfer, etc.). Buying and selling CDS protection on each other's borrower concentrations achieves the same diversification far more cheaply and without disturbing the underlying lending relationships — this is the core economic case for credit derivatives: unbundling credit risk from the underlying asset so it can be transferred, hedged, or speculated on separately.</p>`,

  intuition: `<p>A CDS is a bet with a very specific balance sheet: the buyer pays a stream of premiums (PV of expected payments + accrual) in exchange for a contingent payoff if the reference entity defaults (PV of expected payoff). The market spread is whatever number makes these two sides EQUAL in present value. Once you have that spread, you can back out the RISK-NEUTRAL PD implied by the market — not the "true" PD, just whatever hazard rate reconciles the model spread with the quoted market spread.</p>
  <p>A useful shortcut: the recovery rate assumption barely matters for matching a given spread, because risk-neutral PD ≈ proportional to 1/(1−RR) — a higher assumed RR just implies a correspondingly higher RN PD, netting out in the final spread.</p>
  <p>There's also a no-arbitrage intuition for why the CDS spread should roughly equal the bond's credit spread over the risk-free (benchmark) rate: suppose you buy a 7-year corporate bond yielding 7%, which is 3% above the risk-free benchmark rate of 4%, and simultaneously buy 3% of CDS protection on the same issuer. Your net return is 7% − 3% = 4%, exactly the risk-free rate, whether or not the issuer defaults (if it does, the protection seller makes you whole at par). If the bond yield spread and the CDS spread ever drift apart, you can construct this same trade to earn more than the risk-free rate — that gap is the <strong>CDS-bond basis</strong> (CDS spread − bond yield spread), and arbitrage should push it toward zero.</p>`,

  formulas: [
    { name: "CDS spread balance equation", math: "\\text{PV(expected premium payments + accrual)} = \\text{PV(expected payoff)}", note: "Solve for spread s. Everything else in this reading is a variation on this one equation.",
      plain: "The CDS spread s is set at whatever level makes the present value of what the protection buyer will pay exactly equal to the present value of what the protection seller expects to pay out on default — a fair-bet, zero-NPV condition at inception.",
      derivation: `<p>Worked 3-year CDS: hazard rate \\(\\lambda = 3\\%\\), recovery rate \\(RR=35\\%\\), continuously-compounded risk-free rate \\(r=4\\%\\), annual settlement, default assumed mid-year.</p>
      <p><strong>Step 1 — survival probabilities</strong> from \\(PS(t)=e^{-\\lambda t}\\): \\(PS(1)=e^{-0.03}=97.045\\%\\), \\(PS(2)=e^{-0.06}=94.176\\%\\), \\(PS(3)=e^{-0.09}=91.393\\%\\). Unconditional default probabilities per year are the successive drops: \\(PD_1 = 1-0.97045=2.96\\%\\), \\(PD_2=0.97045-0.94176=2.87\\%\\), \\(PD_3=0.94176-0.91393=2.78\\%\\).</p>
      <p><strong>Step 2 — PV of expected premium payments</strong> (paid only while the reference entity survives, so weighted by \\(PS(t)\\) and discounted at \\(r\\)): summing \\(s\\times PS(t)\\times e^{-rt}\\) across the 3 years gives \\(\\text{PV(payments)} = 2.6123\\,s\\) per \\(\\$1\\) notional.</p>
      <p><strong>Step 3 — PV of expected accrual</strong> (only paid if default occurs, covering the half-year since the last settlement, so it's \\(\\tfrac{s}{2}\\) weighted by each year's \\(PD_t\\) and discounted to the mid-year default date): this adds \\(0.0406\\,s\\), for a grand total \\(\\text{PV(payments + accrual)} = 2.6529\\,s\\).</p>
      <p><strong>Step 4 — PV of expected payoff</strong> (paid only on default, sized at \\((1-RR)\\times\\$1\\) notional, weighted by each year's \\(PD_t\\) and discounted to the mid-year default date at \\(r\\)) sums to a fixed number (not dependent on s).</p>
      <p><strong>Step 5 — solve.</strong> Setting \\(2.6529\\,s = \\text{PV(payoff)}\\) and solving for \\(s\\) gives \\(s \\approx 1.99\\%\\).</p>` },
    { name: "Up-front payment", math: "\\text{Up-front} = (\\text{spread} - \\text{fixed coupon})\\times \\text{duration}\\times \\text{notional}", note: "Spread > coupon → seller pays buyer is WRONG; verify direction from the worked example — spread<coupon → seller pays buyer the difference.",
      plain: "Because standardized CDS contracts force everyone to pay the same fixed coupon (e.g., 100bps for investment grade) instead of the fair market spread, the gap between what's fair and what's actually paid has to be squared away as a single upfront cash transfer, sized as the PV of that annual gap (spread minus coupon, times duration) on the contract's notional.",
      derivation: `<p>Worked example: fixed coupon \\(=100\\,\\text{bps}\\), market spread \\(=65\\,\\text{bps}\\), duration \\(=4.125\\), notional \\(=\\$100{,}000\\). Since the coupon (100bps) exceeds the fair spread (65bps), the protection buyer is contractually locked into overpaying every year relative to fair value — so someone has to compensate the buyer up front for that. The price of the contract works out above par (>100), and the up-front amount, \\((100\\,\\text{bps}-65\\,\\text{bps})\\times 4.125\\times \\$100{,}000\\), is paid by the <strong>protection seller</strong> to the <strong>protection buyer</strong> to make the buyer whole for locking in the above-market fixed coupon.</p>` },
    { name: "Breakeven synthetic CDO spread", math: "s \\times (A + B) = C", note: "A = PV(notional outstanding over life), B = PV(final accrual on losses), C = PV(expected credit losses).",
      plain: "The fair tranche spread s is whatever rate makes the PV of the spread income the tranche investors collect (on the notional still outstanding, plus one final accrual period on any notional lost mid-year) exactly equal to the PV of the credit losses they must absorb.",
      derivation: `<p>This is the same balance-equation logic as the vanilla CDS spread, applied per tranche. \\(A\\) = PV of the spread payments on the tranche's outstanding notional principal in each period (the principal shrinks as tranche losses are absorbed). \\(B\\) = PV of the final accrual payment owed on the notional amount lost during a period (losses, like defaults, are assumed to occur mid-period). \\(C\\) = PV of the tranche's expected credit losses over its life, computed from the expected loss at each time \\(t\\) using the model's default-probability estimates (e.g., from the one-factor Gaussian copula). Setting inflows \\(s\\times(A+B)\\) equal to outflows \\(C\\) and solving for \\(s\\) gives the breakeven tranche spread.</p>` },
    { name: "CPR from SMM", math: "\\text{CPR} = 1 - (1-\\text{SMM})^{12}", note: "Constant prepayment rate annualized from single monthly mortality.",
      plain: "The annual constant prepayment rate is the compounded effect of the monthly prepayment rate (SMM) applied over 12 months, converted to an annualized percentage of the pool that prepays." }
  ],

  concepts: [
    {
      name: "The cheapest-to-deliver (CTD) bond sets the recovery rate",
      def: "Physically-settled CDS contracts let the protection buyer deliver any bond of the same seniority from the defaulted reference entity, so a rational buyer always delivers whichever eligible bond is cheapest to acquire — the CTD bond. The CTD's post-default market price is what defines the recovery rate used in CDS payoff calculations.",
      example: "If the CTD bond trades at $53 per $100 of par immediately after default, RR = 53%. A different, more expensive eligible bond trading at $60 would never be delivered — the buyer would buy the $53 bond, hand it over, and collect full par ($100) regardless of which bond they deliver.",
      intuition: "The protection buyer's payoff is always par value minus whatever the delivered bond cost — so profit-maximizing behavior naturally routes delivery to the cheapest eligible bond, which is exactly why 'recovery rate' in CDS math tracks the CTD bond's price, not some average across all the issuer's bonds.",
      related: ["CDS spread — the core balance equation"]
    },
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
      example: "CDX NA IG spread = 50bps, $100,000 notional protection per company: total annual payment across all 125 names = 125 × 0.005 × $100,000 = $62,500. If one company defaults, the contract continues with 124 names — the protection seller pays (1−RR)×$100,000 for the defaulted name, and the ongoing annual payment drops to 124 × 0.005 × $100,000 = $62,000 (a $500 reduction). Separately, a quoted iTraxx Europe index at bid 150bps / ask 152bps, with €500,000 of protection bought per firm, means total annual payments of 0.0152 × €500,000 × 125 = €950,000; selling the same protection at the bid produces receipts of 0.015 × €500,000 × 125 = €937,500.",
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
      example: "Forward: two parties agree today to enter a 5-year CDS at a spread of 100bps, starting one year from today — no premium changes hands at inception because it's a fair (market) forward rate. Option: a party buys an option to enter a 2-year CDS as protection buyer at a strike spread of 100bps; the holder pays an upfront option premium for this right and will only exercise it if the actual 2-year CDS spread at expiry is higher than 100bps (protection would then be cheaper via the option than at the prevailing market rate). In both cases, if the reference entity defaults before the forward/option's start or expiry, the contract ceases to exist — there's nothing left to protect.",
      pitfall: "Forwards at market rates require NO premium; options ALWAYS require a premium — a clean, testable distinction.",
      related: []
    },
    {
      name: "Total return swaps (TRS) vs. CDS",
      def: "TRS pays the total return (price change + coupons) of a bond in exchange for a floating rate.",
      example: "An investor wants $20 million of exposure to a corporate bond but doesn't want to fund the purchase outright. It enters a TRS to receive the bond's total return (coupon income plus any price appreciation) on a $20 million notional, and pays the TRS counterparty the market reference rate plus 50bps. Economically, the investor has borrowed $20 million at (reference rate + 50bps) to indirectly buy the bond — synthetic leverage without ever touching the cash market. The 50bps spread compensates the TRS payer (who does hold the bond) for the investor's own credit risk and its correlation with the bond's credit risk. At maturity, the TRS payer owes the investor any price appreciation; the investor owes the payer any price depreciation — so the investor bears the bond's full price risk (both credit-driven and rate-driven) without owning it.",
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

  summary: `<p>Core equation: <strong>PV(expected payments) = PV(expected payoff)</strong>, solved for spread s. <strong>Risk-neutral PD</strong> from market spreads is calibrated, not 'true'; RR assumption barely matters (RN PD ∝ 1/(1−RR)). <strong>MtM</strong>: spread widening since inception benefits the BUYER, hurts the SELLER. <strong>Binary CDS</strong> spread always exceeds vanilla (no recovery offset on payoff). <strong>Credit indices</strong>: 125 names, defaults shrink the pool and the ongoing payment. <strong>Up-front payments</strong> reconcile fixed coupon vs. market spread gaps. <strong>Forwards</strong> (no premium) vs. <strong>options</strong> (always a premium). <strong>TRS</strong> hedges credit AND rate risk, unlike pure CDS. <strong>Synthetic CDO</strong>: s(A+B)=C; different tranche spreads reflect seniority-consistent risk, not mispricing. <strong>Implied correlation</strong>: compound (smile) vs. base (skew) — either pattern reveals one-factor Gaussian model imperfection.</p>`,

  eli5: `<p>Think of a CDS like buying fire insurance on a house you don't even have to own. You (the protection buyer) pay the insurance company (the protection seller) a small premium every quarter, in arrears — like paying your phone bill at the end of the month rather than the start. If the house burns down (the company defaults), the insurer pays you out. But here's the twist real fire insurance doesn't have: if the house partially survives the fire (the bond recovers some value — say the wreckage is still worth 35 cents on the dollar), the insurer only pays you the difference, not the full rebuild cost — unless you bought a special "total-loss-only" policy (a binary CDS), which naturally costs more because the insurer is promising a bigger payout. And just like an insurance company sets its premium so that, on average, premiums collected equal claims paid out (plus a margin), the CDS spread is set so PV(premiums) = PV(expected payout) — that's the whole balance equation in one sentence. Mapping back: protection buyer = policyholder, protection seller = insurer, CDS spread = premium rate, recovery rate = "how much of the house survives the fire."</p>`,

  thinkLike: `<p>A credit risk manager or CDS trader treats every quoted CDS spread as a lens on the market's implied default risk, not as a "true" probability — the first move is always to back out the risk-neutral PD/hazard rate consistent with the quoted spread, remembering that the recovery rate assumption you plug in barely changes the answer because RN PD and RR move together to preserve the same spread. The second habitual move is directional: whenever a question involves "who pays whom," don't memorize an abstract rule — reconstruct it from the balance equation. Spread widened since a position was opened? The buyer (who locked in the old, cheaper price) is now sitting on a gain, because protection is worth more today than what they're paying for it. Fixed coupon exceeds the fair market spread? The buyer is over-paying relative to fair value, so the seller must compensate them upfront. Binary payoff has no recovery offset? The payout promise is bigger, so the premium must be bigger too. GARP loves testing this reading by flipping the direction of one of these relationships and asking you to catch it — so practice deriving the direction from the equation every time, rather than recalling a memorized rule under time pressure.</p>
  <p>On synthetic CDOs, the practitioner mindset is to resist the intuitive but wrong reaction that different tranche spreads signal mispricing. A risk manager instead asks: does the spread compensate this tranche for the credit losses it's actually expected to absorb, given its position in the waterfall? Equity absorbs the first, most likely losses and should earn the most; senior absorbs only tail losses and should earn the least. The exam tests this by dressing it up as an "arbitrage opportunity" trap.</p>`,

  breakdown: [
    {
      title: "The CDS spread balance equation, applied five ways",
      points: [
        "Vanilla CDS: PV(payments + accrual) = PV(payoff at (1−RR)×notional) — solve for the fair spread s.",
        "Risk-neutral PD calibration: fix s to the observed market spread and iteratively solve for the hazard rate λ that reproduces it (Solver/trial-and-error), rather than assuming λ upfront.",
        "Marking to market: revalue both legs at current market parameters, holding the ORIGINAL contractual spread fixed on the payments leg, to find the gain/loss to each side since inception.",
        "Binary CDS: repeat the same equation with RR forced to 0% only in the payoff leg — the payments leg formula is unchanged, only the promised payout is bigger.",
        "Synthetic CDO tranche: repeat the same equation per tranche, with A/B (PV of tranche notional and accrual) replacing the payments leg and C (PV of tranche credit losses) replacing the payoff leg."
      ]
    },
    {
      title: "Three cases for the up-front premium (standardized CDS)",
      points: [
        "CDS spread = fixed coupon: no up-front premium needed — the standardized coupon already equals fair value.",
        "CDS spread > fixed coupon: the buyer is under-paying relative to fair value, so the buyer pays the seller an up-front amount equal to the PV of (spread − coupon).",
        "CDS spread < fixed coupon: the buyer is locked into over-paying relative to fair value, so the seller pays the buyer an up-front amount equal to the PV of (coupon − spread)."
      ]
    },
    {
      title: "Five alternatives to the one-factor Gaussian copula",
      points: [
        "Heterogeneous models — let each reference entity have its own time-to-default distribution instead of assuming one shared Q(t), at the cost of losing the simple binomial default-count formula.",
        "Other copulas — Student's t, Archimedean, Clayton, and Marshall-Olkin copulas, chosen to better capture tail dependence than the Gaussian copula does.",
        "Random recovery rates and factor loadings — model the empirically observed negative relationship between default rates and recovery rates, instead of holding RR fixed.",
        "Implied copula models — back the copula/correlation structure directly out of observed market tranche prices rather than assuming a functional form upfront.",
        "Dynamic (structural or reduced-form) models — explicitly model how losses on the collateral pool evolve over time, rather than treating time-to-default as a single static draw."
      ]
    }
  ],

  quiz: [
    {
      q: "A protection buyer holds a 3-year CDS at a spread of 1.99%, valued using PV(payments)=2.6529s and PV(payoff)=0.0528 per $1 notional. Six months later, market conditions push the fair spread to 2.75% with the payoff leg unchanged. What happens to the position's value to the protection BUYER?",
      options: ["The buyer loses value, because the spread they must keep paying (1.99%) is now cheaper than fair value", "The buyer gains value, because they locked in a below-market spread and protection is now worth more", "The value is unchanged, since only the seller's position is marked to market", "The buyer must post additional up-front premium to keep the contract in force"],
      answer: 1,
      why: "The buyer is only obligated to keep paying the original 1.99% spread, which is now cheaper than the 2.75% fair market rate for equivalent protection — so the buyer's position has gained value (they're getting the same protection for less than what it now costs to buy fresh). The seller, who's receiving only 1.99% for now-riskier protection, loses. The 'buyer loses because their spread is now cheaper than fair value' answer reverses the direction; the 'unchanged' and 'must post additional up-front premium' answers misunderstand that mark-to-market is symmetric and doesn't require fresh cash unless collateral is called."
    },
    {
      q: "Using the standard worked example (3-year CDS, hazard rate 3%, recovery rate 35%, r=4%, vanilla spread = 1.99%), why is the equivalent binary CDS spread (3.06%) higher than the vanilla spread?",
      options: ["Binary CDS assumes a higher hazard rate for the reference entity", "Binary CDS pays out on default even if there's no formal credit event, unlike vanilla CDS", "Binary CDS has no recovery-rate offset on the payoff leg, so the promised payout per default is larger and the payments leg must be bigger to match it", "Binary CDS requires quarterly instead of annual settlement, which raises the effective spread"],
      answer: 2,
      why: "Setting RR=0% in the payoff calculation (while everything else — hazard rate, discounting, settlement frequency — stays identical) increases only the size of the promised payoff per default. To keep PV(payments)=PV(payoff), the premium (spread) must rise to match. The 'higher hazard rate', 'pays out without a formal credit event', and 'quarterly settlement' answers all introduce factors the worked example never changes."
    },
    {
      q: "A CDS index (CDX NA IG) has a market spread of 50bps and an investor has $100,000 of notional protection per company across all 125 names. One company defaults with a 40% recovery rate. What is the payoff on that one name, and what does the ongoing ANNUAL payment become on the surviving names?",
      options: ["Payoff = $40,000; ongoing payment = $62,500 (unchanged)", "Payoff = $60,000; ongoing payment drops to $62,000", "Payoff = $60,000; ongoing payment drops to $61,500", "Payoff = $40,000; ongoing payment drops to $61,875"],
      answer: 1,
      why: "The payoff on the defaulted name is (1−RR)×notional = (1−0.40)×$100,000 = $60,000. The index continues with 124 remaining names, so the ongoing annual payment is 124 × 0.005 × $100,000 = $62,000 (down $500 from the original 125 × 0.005 × $100,000 = $62,500). The most tempting wrong answer computes payoff as RR×notional instead of (1−RR)×notional, which gives the wrong $40,000 figure."
    },
    {
      q: "A standardized CDS has a fixed coupon of 100bps, but the current fair market CDS spread is only 65bps. Who pays the up-front settlement amount, and why?",
      options: ["The protection buyer pays the seller, because the buyer is receiving more protection than they're paying for", "The protection seller pays the buyer, to compensate the buyer for being locked into a fixed coupon (100bps) above fair value (65bps)", "No up-front payment is needed, because standardized coupons are always fair by construction", "The protection buyer pays the seller, equal to the full difference in notional terms, not present-valued"],
      answer: 1,
      why: "Because the fixed coupon (100bps) exceeds the fair spread (65bps), the buyer is contractually stuck overpaying every year relative to what protection is actually worth — so the seller compensates the buyer up front with the PV of that gap times duration times notional. The 'buyer pays seller' answer reverses the direction; the 'no up-front payment needed' answer ignores that fixed coupons are deliberately standardized (not spread-matched) precisely so an up-front payment is needed; the 'full difference, not present-valued' answer omits discounting via duration."
    },
    {
      q: "Which statement correctly distinguishes CDS forwards from CDS options?",
      options: ["Both require an upfront premium payment at initiation", "Forwards entered at market rates require no premium; options always require a premium for the right (not obligation) to enter", "Options entered at market rates require no premium; forwards always require a premium", "Neither requires a premium if entered at prevailing market rates"],
      answer: 1,
      why: "A forward locks in a fixed future obligation for both sides at a fair (market) rate, so at inception it's a zero-value contract — no premium changes hands. An option grants only the buyer the right, not the obligation, to enter later, and that optionality is always worth paying for upfront, regardless of whether the strike happens to equal the current market spread. The other answers reverse or misstate this asymmetry."
    },
    {
      q: "A risk analyst assumes a recovery rate of 60% instead of the 'true' 40% when backing out the risk-neutral default probability implied by an observed market CDS spread. What is the most accurate description of the effect on the analyst's results?",
      options: ["The implied risk-neutral PD will be substantially understated, making the credit look far safer than it is", "The implied risk-neutral PD will be substantially overstated, making the credit look far riskier than it is", "The implied risk-neutral PD will be roughly proportionally higher, but the two errors largely offset so the fitted model spread still matches the observed market spread", "The exercise is impossible without knowing the true recovery rate, since RR and PD cannot be jointly unidentified from a single spread observation"],
      answer: 2,
      why: "Risk-neutral PD is approximately proportional to 1/(1−RR), so assuming a higher RR (60% vs. 40%) mechanically forces a correspondingly higher implied PD to still reproduce the same observed market spread — the two assumptions move together and largely net out in the final calibration. This is exactly why the RR assumption 'barely matters' for spread-matching, even though it clearly isn't the single true value. The 'substantially understated' and 'substantially overstated' answers overstate the sensitivity; the 'impossible without knowing the true recovery rate' answer incorrectly claims the calibration is impossible, when in fact it's precisely because the errors offset that a workable (if not uniquely 'true') answer emerges."
    }
  ],

  sources: [
    { title: "Credit default swap — Wikipedia", url: "https://en.wikipedia.org/wiki/Credit_default_swap", note: "Background on CDS mechanics, history, and the role of CDS in the 2008 financial crisis, beyond the exam-focused scope of this reading." },
    { title: "Credit Default Swap (CDS) — Investopedia", url: "https://www.investopedia.com/terms/c/creditdefaultswap.asp", note: "An accessible walkthrough of protection buyer/seller roles and a plain-language recap of premium and payoff mechanics." },
    { title: "Collateralized debt obligation — Wikipedia", url: "https://en.wikipedia.org/wiki/Collateralized_debt_obligation", note: "More detail on tranching and the waterfall structure that synthetic CDOs replicate using CDS instead of cash bonds." },
    { title: "BIS statistics on OTC derivatives", url: "https://www.bis.org/statistics/derstats.htm", note: "Official market-size data for CDS and other OTC credit derivatives, useful for grounding how large this market actually is." }
  ],

  pdf: { book: 2, query: "credit default swaps, total return swaps, and collateralized debt obligations" }
});
