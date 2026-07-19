export default ({
  book: 2, reading: 37,
  session: "Counterparty Risk Management",
  title: "CVA",
  tagline: "The capstone quant reading of Session 6: multiplies R36's exposure profiles by R25's default probabilities into a single price for counterparty risk.",

  teaches: `<p>The base CVA formula, CVA as a running spread (and how to convert an upfront CVA into a running spread charged on the trade), how credit spread/recovery assumptions move CVA, netting and collateral inside CVA, MPoR scaling, incremental vs. marginal CVA, bilateral CVA (BCVA) and DVA, the special challenges of pricing CVA for exotic/path-dependent products, and wrong-way/right-way risk — including the four modeling approaches and how collateral and CCPs interact with it.</p>`,

  why: `<p>Structurally, everything in this reading is a variation on one formula: \\[ \\text{CVA} = -(1-\\text{RR}) \\times \\Sigma_i\\, \\text{EE}(t_i) \\times q_i \\times \\text{DF}(t_i) \\] Understanding this as Expected Loss's derivatives-specific cousin (rather than a brand-new concept) makes the whole reading tractable: it is still "probability of default × loss given default × exposure," just computed at every future date instead of once.</p>
  <p>The bigger picture: a "risky" derivative like a swap is worth less than its risk-free textbook value, because there's a chance the counterparty won't pay. CVA is precisely that discount: \\(\\text{risky value} = \\text{risk-free value} - \\text{CVA}\\). Pricing a trade correctly means charging (or reserving) exactly this amount, which is why banks run dedicated CVA desks whose whole job is computing and hedging this number.</p>`,

  intuition: `<p>CVA is EL = PD×LGD×EAD, generalized to a TIME SERIES of exposures instead of one fixed EAD. A loan has one exposure amount that sits still until maturity; a derivative's value bounces around with the market, so instead of one EAD you need a whole curve of expected exposures EE(t) — one per future date — and instead of one PD you need q(t), the probability of defaulting in each particular future interval. CVA sums the discounted products of these two curves across all dates. Everything else in the reading — netting's reduction of exposure, collateral's reduction of EE, MPoR scaling, converting CVA into a running spread — is a variation on how exactly EE(t) and q(t) get computed or repackaged before you plug them into this one sum.</p>
  <p>A worked feel for the numbers: if a swap has an expected potential exposure (EPE) of 6% of notional and the counterparty's credit spread is 375bps (3.75%), then as a quick running-spread approximation, CVA spread ≈ −EPE × credit spread = −6% × 3.75% = −23bps. That's the annual charge, in basis points, a bank should shave off the deal's economics to cover the counterparty-default risk it's taking on — small numbers, but they add up across a derivatives book and were a multi-billion-dollar line item for major dealers after 2008.</p>
  <p>The trickiest asymmetry: incremental CVA answers "what does adding THIS new trade change CVA by" (pricing decision); marginal CVA answers "how much of the TOTAL netted CVA is attributable to each existing trade" (ex-post attribution). Same underlying machinery, different question, frequently confused.</p>`,

  eli5: `<p>Imagine you lend your neighbor your lawnmower every week, but each week the "value" of that favor to you changes — some weeks it's worth a lot to you (their yard is huge and overgrown), some weeks barely anything (light trim). Now imagine your neighbor sometimes doesn't pay you back for gas, and the chance they skip paying you also changes week to week. To fairly price "lending the mower to this particular neighbor," you can't just use one flat risk number — you'd want to multiply, for every single week, (how much you stand to lose that week) by (the odds they stiff you that week), and add it all up. That running total is exactly what CVA does for a bank's derivative with a counterparty: instead of one fixed loan amount and one fixed default chance, it has a whole timeline of exposure amounts and a whole timeline of default odds, multiplied together date by date and summed into one number — the fair "risk charge" for doing business with that particular counterparty.</p>`,

  thinkLike: `<p>A CVA desk trader treats every new derivative not as "priced at its textbook value" but as "priced at its textbook value minus what it costs to insure against this specific counterparty not paying." Before agreeing to a trade, the desk asks: what is the ΔEE (the extra expected exposure) this trade adds to everything else already on the books with this counterparty, given the netting agreement in place? A large standalone CVA on a trade that happens to offset existing exposures can be nearly free to add; a small standalone CVA on a trade that compounds existing exposure can be expensive. This is why incremental CVA, not standalone CVA, drives the actual pricing decision — and it's exactly the kind of "which number do you use, and why" distinction GARP loves to test, usually by describing a scenario (new trade vs. attribution of an existing book) and asking which metric applies.</p>
  <p>On wrong-way risk, the practitioner's frame is correlation-of-bad-outcomes, not correlation-of-returns: does the SAME macro shock that blows up your exposure also blow up the counterparty's chance of default? The exam tests this by feeding you a story (a Japanese bank's yen-funded USD swap after Lehman, a monoline insurer's CDS book in 2008, an out-of-the-money put on the counterparty's own stock) and expecting you to identify whether the co-movement is WWR or RWR, and — a favorite trap — to remember that higher credit quality counterparties can make WWR effects WORSE when they do materialize, precisely because a high-grade default is rarer and more likely tied to a systemic event.</p>`,

  visual: `<div class="widget" data-widget="exposure"></div>`,

  breakdown: [
    {
      title: "The full CVA toolkit, in build order",
      points: [
        "Base CVA — no WWR, no netting, no collateral: CVA = −(1−RR)×Σ EE(tᵢ)×qᵢ×DF(tᵢ). The starting-point formula everything else modifies.",
        "CVA as a running spread — divide upfront CVA by a risky annuity/duration to express the charge as an annual bps spread on the trade, easier for a trader to apply live.",
        "Credit spread & recovery sensitivity — how moving PD/RR inputs nonlinearly shifts CVA, including the settled-vs-actual recovery distinction.",
        "Netting and collateral — reduce CVA by shrinking exposure (netting) or EE (collateral); MPoR, threshold, MTA, and initial margin each push CVA a specific direction.",
        "Incremental vs. marginal CVA — pricing a new trade (incremental) vs. attributing existing CVA across trades (marginal).",
        "Exotic products & path dependency — CVA on Bermudans, swaptions, and other path-dependent instruments needs approximation techniques (e.g., Monte Carlo, treating a swaption as a forward swap) because the exposure profile itself is hard to compute.",
        "Bilateral CVA (BCVA) — adds DVA (the institution's own default risk) so the institution's counterparty can also default; can flip the sign versus unilateral CVA.",
        "Wrong-way/right-way risk — how exposure and default probability correlating (positively or negatively) changes CVA/DVA, plus the four ways to model that correlation and how collateral and CCPs interact with it."
      ]
    },
    {
      title: "WWR modeling approaches (4)",
      points: [
        "Hazard rate (intensity) approach — simulate credit spreads stochastically, then compute conditional EPE along paths where default occurred (usually paths with wider spreads). Easiest to implement, but tends to understate the true dependence between exposure and default, so it UNDERESTIMATES WWR.",
        "Structural approach — maps a joint (bivariate) distribution of default time and exposure directly; WWR shows up as a positive correlation between early default and higher exposure. Simpler than hazard-rate but leans on a pre-existing exposure distribution that may not be representative of the current regime.",
        "Parametric approach — a direct, purely historical/statistical link between portfolio exposure and credit spreads (higher portfolio values linked to above-average spreads signals WWR). Needs historical data that actually reflects current conditions to be reliable.",
        "Jump approach — models a jump (e.g., an FX devaluation) exactly at the moment of default, sized by a residual-value (RV) factor, so the currency depreciates by (1−RV). Best captures the 'cliff' nature of sovereign or large-firm WWR events, where the shock is sudden rather than gradual."
      ]
    },
    {
      title: "Four factors behind changes in CVA from spread/recovery assumptions",
      points: [
        "Credit spread level — higher spread generally raises CVA, but nonlinearly: PD is capped at 100%, so right at the edge of default CVA actually ticks down slightly, then falls to zero once default itself occurs.",
        "Shape of the credit spread curve — an upward-sloping curve (risk loaded later) produces a LOWER CVA than a flat or downward-sloping curve (risk loaded earlier/now, front-loaded).",
        "Recovery rate assumption — a higher assumed recovery rate raises the implied PD (from the same spread) but LOWERS overall CVA, because loss-given-default shrinks and that effect dominates.",
        "Settled vs. actual recovery basis risk — the settled recovery is what's used at default settlement; the actual recovery is what's ultimately realized on the claim. A higher ACTUAL recovery than the settled assumption produces a lower realized CVA than if both had been assumed equal from the start."
      ]
    }
  ],

  formulas: [
    {
      name: "Base CVA (no WWR, no netting, no collateral)",
      math: "\\text{CVA} = -(1-\\text{RR}) \\times \\Sigma_{i}\\, \\text{EE}(t_{i}) \\times q_{i} \\times \\text{DF}(t_{i})",
      note: "q_i = probability of default in interval i. Negative sign because CVA is a cost.",
      plain: "This says: for every future date, multiply the expected exposure at that date by the chance of defaulting in that interval and by the loss-given-default fraction, discount each product back to today, and add them all up — that sum (with a minus sign, because it's a cost) is CVA.",
      derivation: "<p>Start from single-period Expected Loss: \\( \\text{EL} = \\text{PD} \\times \\text{LGD} \\times \\text{EAD} \\), with \\( \\text{LGD} = 1-\\text{RR} \\). A derivative doesn't have one fixed EAD like a loan — its exposure changes with the market at every future date, so replace the single EAD with a whole curve of expected exposures \\( \\text{EE}(t_i) \\), and replace the single PD with the interval default probability \\( q_i \\) at each date \\( t_i \\). Discount each date's expected loss back to today with \\( \\text{DF}(t_i) \\) and sum across all dates: \\[ \\text{CVA} = -(1-\\text{RR}) \\sum_i \\text{EE}(t_i)\\, q_i\\, \\text{DF}(t_i) \\] The leading minus sign marks CVA as a cost (a reduction from risk-free value) rather than a gain."
    },
    {
      name: "CVA as a running spread (quick approximation)",
      math: "\\text{CVA spread} \\approx -\\,\\text{EPE} \\times \\text{credit spread}",
      note: "Assumes EPE constant over the profile, PD constant over the profile, and EE/PD symmetric over the profile. Example: EPE=6%, credit spread=375bps → −6%×3.75% = −23bps.",
      plain: "This is a shortcut: instead of building the full exposure-times-default-probability sum, just multiply the counterparty's average expected positive exposure by its credit spread to get a rough annual charge in basis points, fast enough to quote to a trader on a live deal."
    },
    {
      name: "Converting an upfront CVA into a running spread on a swap",
      math: "\\text{spread} = \\dfrac{\\text{CVA}}{\\text{risky duration} \\times \\text{notional}}",
      note: "5yr payer swap, notional=$100M, risky duration=3.75, standalone CVA=−$90,000 → spread = −90,000/(3.75×100,000,000) = −2.40bps. Solved recursively in practice, since adding the spread to the swap rate itself changes the contract's value and therefore its CVA.",
      plain: "This converts a one-time dollar cost (the upfront CVA) into an ongoing rate adjustment: divide the CVA by the trade's risky duration times its notional to get the extra spread that, charged every year over the life of the swap, has the same present value as the upfront charge."
    },
    {
      name: "MPoR scaling (square-root-of-time)",
      math: "\\text{CVA}(20\\text{-day MPoR}) \\approx \\text{CVA}(10\\text{-day MPoR}) \\times \\sqrt{2}",
      note: "At MPoR ≈ 40 days, collateralized CVA is roughly HALF the uncollateralized CVA.",
      plain: "This says CVA scales with the square root of the margin period of risk (MPoR, the number of days it takes to call, receive, and liquidate collateral after a default): double the MPoR and CVA grows by roughly √2, not by a full factor of 2, because exposure volatility itself scales with the square root of time."
    },
    {
      name: "Bilateral CVA (BCVA)",
      math: "\\text{BCVA} = \\text{CVA(counterparty)} + \\text{DVA(institution)}",
      note: "Can be positive if DVA > CVA. Symmetric: Party 1's BCVA = −Party 2's BCVA.",
      plain: "This says the total bilateral price of counterparty risk is the counterparty's default risk to you (CVA, a cost) PLUS your own default risk to them (DVA, a benefit to you, since if you default first you only pay them a fraction of what you owe)."
    },
    {
      name: "BCVA as a spread",
      math: "\\text{BCVA spread} = -(\\text{counterparty spread}\\times \\text{EPE}) - (-\\,\\text{institution spread}\\times \\text{ENE})",
      note: "EPE=5%, ENE=3%, counterparty spread=300bps, institution spread=200bps → BCVA=(−5%×300)−(−3%×200)=−9bps.",
      plain: "This says the bilateral running spread charge equals the unilateral CVA-spread charge (counterparty spread times your expected positive exposure) minus an offsetting credit for your own default risk (your spread times your expected NEGATIVE exposure, ENE — the exposure that runs in the counterparty's favor)."
    }
  ],

  concepts: [
    {
      name: "What CVA is, and why counterparty risk needs its own price",
      def: "CVA (credit value adjustment) is the expected cost of counterparty credit risk, expressed as a dollar (or spread) reduction from a derivative's risk-free value: risky value = risk-free value − CVA. Unlike a bond or loan, a bilateral derivative (e.g., an interest rate swap with fixed and floating legs) can owe money in either direction depending on where the market moves, so pricing its counterparty risk is harder than pricing a one-way instrument.",
      intuition: "A risk-free swap valuation assumes both sides always pay in full. CVA is the haircut you apply because one side (the counterparty) might not.",
      example: "A U.S. bank enters a 5-year interest rate swap with a corporate client. The swap's textbook (risk-free) value might be $0 at inception, but the bank still charges an upfront or running CVA fee, because there's a real chance the client defaults sometime in the next five years while the swap has positive value to the bank.",
      related: [{ r: 36, label: "R36 — EE, the exposure metric this formula multiplies" }, { r: 25, label: "R25 — the default probability qᵢ this formula multiplies" }]
    },
    {
      name: "The base CVA formula",
      def: "CVA = \\(- (1- RR)\\times \\Sigma_{i}\\) \\(EE(t_{i})\\times q_{i}\\times DF(t_{i})\\). Assumptions behind the running-spread shortcut: EPE constant over the profile, PD constant over the profile, EE/PD symmetric over the profile.",
      related: [{ r: 36, label: "R36 — EE, the exposure metric this formula multiplies" }, { r: 25, label: "R25 — the default probability qᵢ this formula multiplies" }]
    },
    {
      name: "CVA as a running spread — worked example",
      def: "The CVA can be re-expressed as an annual spread by dividing it by the unit premium of a risky annuity (like a CDS) for the trade's maturity — a common way to quote the CVA charge to a client on a live deal, since traders think in bps, not lump-sum dollars.",
      example: "The exposure management group estimates EPE = 6% for a swap, and the counterparty's credit spread is 375bps (3.75%). CVA spread ≈ −EPE × credit spread = −6% × 3.75% = −22.5bps ≈ −23bps — the amount the trader subtracts from the swap's rate leg as the CVA charge.",
      related: [{ r: 25, label: "R25 — where credit spreads get converted into hazard rates/PDs" }]
    },
    {
      name: "How credit spread & recovery assumptions move CVA",
      def: "↑ credit spread → ↑ CVA, but NONLINEARLY (PD is capped at 100%; right at default, CVA actually ticks down slightly, then hits zero in default itself).",
      example: "Curve shape: upward-sloping spread curve → LOWER CVA than flat or downward-sloping (front-loaded low risk). ↑ recovery rate → ↑ implied PD but ↓ CVA overall (less loss-given-default dominates). A settled recovery of 10% vs. an actual (realized) recovery of 40% produces a LOWER realized CVA than if both settled and actual recovery had been assumed at the same 40% from the start.",
      pitfall: "A higher ACTUAL recovery (vs. settled recovery) at the same settled assumption → lower CVA — don't confuse the ASSUMED recovery rate used in calibration with the ACTUAL recovery realized.",
      related: [{ r: 25, label: "R25 — RR/PD relationship in hazard rate calibration" }]
    },
    {
      name: "Netting and collateral inside CVA",
      def: "Netting reduces CVA because it reduces exposure at settlement: instead of paying gross on every trade individually, offsetting trades under a netting agreement settle to one net amount, so the counterparty's true worst-case owed amount shrinks. Collateral reduces CVA by shrinking EE (not by changing default probability): posted collateral (e.g., cash or high-quality government bonds) offsets the mark-to-market owed if the counterparty defaults.",
      pitfall: "Evaluate the CHANGE in CVA from a new trade, not just its standalone CVA, when deciding if it's worth doing — this is exactly the incremental CVA concept. Minimum transfer amount (MTA, the smallest collateral movement worth bothering to process) and threshold (the amount of exposure allowed to go uncollateralized before a call is triggered) INCREASE CVA, because both create windows of uncollateralized exposure; a higher initial margin (effectively a 'negative threshold,' collateral posted upfront before any exposure even exists) DECREASES CVA. CVA with netting is never higher than CVA without netting (netting can't increase exposure). Netting benefit SHRINKS with transaction size — incremental CVA approaches standalone CVA as the new trade gets large relative to the existing book. The margin period of risk (MPoR — the number of calendar days it takes to call, receive, and liquidate collateral after a missed margin call) scales CVA by roughly the square root of time; at an MPoR around 40 days, collateralized CVA is roughly half of uncollateralized CVA.",
      related: ["Incremental CVA vs. marginal CVA"]
    },
    {
      name: "Incremental CVA vs. marginal CVA",
      def: "Incremental CVA: what does adding THIS new trade change CVA by, given netting with the existing book? (pricing a new trade — the calculation substitutes ΔEE, the incremental exposure the new trade adds, into the CVA formula). Marginal CVA: how much of the TOTAL netted CVA is attributable to each individual trade? (ex-post attribution — the calculation substitutes each trade's marginal EE, letting the trade-level pieces sum back to the total netted CVA).",
      pitfall: "This is a frequently confused pair. If the question says 'which trades are driving this counterparty's CVA,' that's MARGINAL; if it says 'should we do this new trade,' that's INCREMENTAL.",
      related: [],
      memory: "Incremental = should we ADD this trade? Marginal = which EXISTING trades are the problem?"
    },
    {
      name: "Applying CVA to exotic products and path dependency",
      def: "Exotic derivatives (e.g., swaptions, Bermudan options) and path-dependent instruments (where the future exposure depends on the whole price path so far, not just the current level) make CVA harder to compute because valuing the underlying trade itself already requires simulation.",
      example: "Practitioners approximate: a swaption may be valued as if it were a forward-starting swap; a Bermudan option's payoff may be approximated using European-option techniques. For path-dependent exposure, assessing future exposure at any given date requires information on the entire path from today to that date, so approximations to the full path-dependent calculation are used in practice.",
      related: [{ r: 36, label: "R36 — Monte Carlo simulation methods for computing exposure profiles" }]
    },
    {
      name: "Bilateral CVA (BCVA)",
      def: "BCVA = CVA(of counterparty) + DVA(of the institution, its 'own CVA') — both sides can default. Prior to the 2007-09 crisis, CVA was typically calculated only unilaterally (favoring the stronger counterparty, usually a bank); the crisis forced the industry to recognize that the bank itself can also default, hence bilateral pricing.",
      pitfall: "Implications: (1) BCVA can be POSITIVE if DVA>CVA (institution riskier than counterparty) — standalone unilateral CVA can only be negative; (2) BCVA is symmetric — if Party 1's BCVA is +X, Party 2's is −X, meaning Party 2 owes Party 1 +X for its counterparty risk; (3) netting can be a DISADVANTAGE under BCVA if the institution's own DVA dominates, since without netting the institution could selectively settle only its favorable (positive MtM) contracts and treat unfavorable ones as ordinary bankruptcy liabilities; (4) in theory, if both sides agree on parameters, all market BCVAs net to zero (though this holds far more in theory than in practice).",
      example: "EPE=5%, ENE=3%, counterparty spread=300bps, institution spread=200bps → BCVA=(−5%×300)−(−3%×200)=−9bps (net charge to the counterparty). Note the standard BCVA formula excludes a survival-probability adjustment (the chance the institution itself defaults BEFORE the counterparty, in which case it wouldn't suffer the counterparty loss at all) — that refinement is layered in for stress testing in R38.",
      related: [{ r: 29, label: "R29 — CVA/DVA's first appearance" }],
      memory: "BCVA is symmetric — one side's gain is exactly the other's loss, like a zero-sum mirror."
    },
    {
      name: "Wrong-way risk (WWR) and right-way risk (RWR)",
      def: "WWR: exposure and PD positively correlated → ↑CVA, ↓DVA. RWR: negatively correlated → ↓CVA, ↑DVA. 'Normality' in derivatives markets is generally RWR: hedges exist precisely to work when you need them, so a coffee producer shorting futures, or a textile firm going long cotton derivatives, is implicitly relying on RWR-like behavior — the hedge paying off without the counterparty simultaneously becoming unable to pay.",
      example: "Classic scenarios, all sharing the same shape (a macro shock hits exposure and counterparty credit quality in the same direction at once): a long put option is WWR if exposure and counterparty PD both rise together (out-of-the-money puts show MORE WWR than in-the-money puts); the 2007-09 crisis (monoline insurers AMBAC and MBIA had taken concentrated positions selling CDS protection on mortgage-backed CDOs — as MBS/CDO issuers defaulted, insurer creditworthiness collapsed exactly as CDS payout claims flooded in, so CDS buyers' 'gains' never materialized); a cross-currency deal with an emerging-market bank (e.g., a U.S. bank swapping dollars for Uzbek local currency) where a sovereign debt crisis both depreciates the local currency, increasing the U.S. bank's exposure, and raises the local bank's default probability, at the same time; a Japanese bank's FX swap to fund USD via JPY became WWR post-Lehman as JPY appreciation increased exposure while U.S. counterparty credit quality deteriorated simultaneously; European sovereign debt crisis interest rate swaps, where falling policy rates both raised the fixed-rate receiver's exposure and raised the Italian fixed-rate-payer counterparties' default probability; a concentrated commodities dealer facing a flood of claims from airlines hedging oil (rising oil prices raise both the airlines' gains/dealer's exposure and, given the dealer's concentrated book, its default probability).",
      pitfall: "Counterintuitive fact: HIGHER credit quality actually AMPLIFIES WWR's impact, because a high-quality name defaulting is a rarer, more surprising (and often more correlated-with-catastrophe) event — a low-quality name defaulting is comparatively unsurprising and less likely to be tangled up with a broader systemic shock.",
      related: [{ r: 7, label: "R7 — wrong-way risk first introduced in CDS context" }],
      memory: "WWR modeling approaches: hazard rate (easiest, understates WWR), structural (joint distribution), parametric (historical link), jump (best for cliff-like sovereign/large-firm events)."
    },
    {
      name: "Collateral and CCPs under WWR",
      def: "Gradually rising exposure → collateral helps (time to call for more, and the benefit of collateral actually INCREASES as WWR increases, since additional collateral is relatively easy to request and receive along the way). A sudden jump in exposure (e.g., a currency devaluation tied to a sovereign default) → collateral can't be collected fast enough to help much.",
      example: "WWR collateral examples: a payer interest rate swap collateralized by a high-quality government bond (rates up → swap value up, which is good for the swap holder, but the bond's value/margin goes down at the same time — same direction of pain, reducing the net benefit); a cross-currency swap collateralized in the currency being paid, where an FX move simultaneously increases exposure and reduces collateral value; a firm posting its own bonds as collateral — the most direct case, since the collateral is worthless exactly when the firm itself is in trouble and the collateral is actually needed.",
      pitfall: "CCPs (central counterparties, which stand in the middle of previously bilateral OTC trades and act as buyer to every seller and seller to every buyer) are exposed to WWR through member margin and default-fund contributions; when a member defaults, the CCP performs novation — closing out the non-performing side of the contract with a new capable counterparty — and, if the defaulter's own posted margin and default-fund contribution aren't enough to cover losses, taps its own capital and the default funds of NON-defaulting members (loss mutualization, spreading losses across the whole membership rather than concentrating them on one party). Mitigation includes higher margin/default-fund requirements for high-credit-quality members and higher haircuts on risky posted collateral.",
      related: ["Wrong-way risk (WWR) and right-way risk (RWR)"]
    }
  ],

  connections: {
    from: [
      { r: 25, why: "The default probabilities computed there are a direct input to the CVA formula." },
      { r: 36, why: "Every quantitative concept there (EE, EPE, ENE, netting factor, MPoR) is the direct input set to this reading's formula." },
      { r: 29, why: "CVA/DVA's rushed first appearance there becomes this reading's fully developed BCVA framework." }
    ],
    to: [
      { r: 38, why: "This CVA machinery gets stress-tested next." }
    ],
    confused: [
      { what: "Incremental CVA vs marginal CVA", how: "Incremental: effect of ADDING a new trade (pricing decision). Marginal: attribution of TOTAL existing CVA to each trade (ex-post analysis). Different questions, same underlying exposure/PD machinery." },
      { what: "CVA (unilateral, always negative) vs BCVA (bilateral, can be positive)", how: "Standalone CVA prices only the counterparty's default risk (always a cost, negative). BCVA adds the institution's own DVA — if the institution is riskier than its counterparty (DVA>CVA), BCVA can flip positive." },
      { what: "Higher credit quality worsening WWR impact", how: "Counterintuitive: a HIGH-quality name defaulting is rarer and more surprising/catastrophic, so WWR's impact is actually amplified for high-quality names, not diminished." }
    ]
  },

  misconceptions: [
    { wrong: "\"If the standalone CVA of a new trade is small, adding it barely affects the counterparty's total CVA.\"", right: "You must evaluate the CHANGE in CVA (incremental CVA) given netting with the existing book — a small standalone CVA can still meaningfully change (increase OR decrease) the netted total, depending on correlation with existing exposures." },
    { wrong: "\"BCVA can only be negative, like standalone CVA.\"", right: "BCVA = CVA(counterparty) + DVA(institution) can be POSITIVE if the institution's own DVA exceeds the counterparty's CVA — meaning the institution is riskier than its counterparty." },
    { wrong: "\"Netting is always advantageous when computing BCVA.\"", right: "Netting can be a DISADVANTAGE under BCVA if the institution's own DVA dominates — without netting, the institution could selectively settle only its favorable (positive MtM) contracts, a flexibility netting removes." },
    { wrong: "\"Higher credit quality counterparties pose less wrong-way risk concern.\"", right: "Counterintuitively, HIGHER credit quality AMPLIFIES WWR's impact — a high-quality name defaulting is rarer and more surprising, often correlated with a broader catastrophe, making the joint bad outcome more severe when it does occur." },
    { wrong: "\"Netting increases CVA because it changes how trades settle.\"", right: "Netting REDUCES CVA — it lowers total exposure at settlement by offsetting gains and losses across trades with the same counterparty, and CVA with netting is never higher than CVA without it." },
    { wrong: "\"Collateralization doesn't really change CVA since it just adjusts exposure, not default probability.\"", right: "Collateralization DOES reduce CVA — CVA depends on expected exposure (EE) as well as default probability, and shrinking EE directly shrinks CVA even though the default probability itself is unchanged." }
  ],

  highYield: [
    { stars: 5, what: "Base CVA formula and its exposure/PD/discount-factor structure.", why: "The core formula of the reading — every other concept is a variation or extension of this." },
    { stars: 5, what: "Incremental CVA vs. marginal CVA — which question each answers.", why: "Explicitly flagged as a frequently confused pair; a reliable, precise exam discriminator." },
    { stars: 4, what: "BCVA: can be positive, symmetric across parties, netting can be a disadvantage.", why: "Three distinct, individually testable implications of the bilateral framework." },
    { stars: 4, what: "Wrong-way risk: definition, classic scenarios (2007-09 monolines, Lehman FX swap), and the higher-credit-quality-amplifies-WWR counterintuitive fact.", why: "A rich, scenario-based conceptual area GARP tests heavily." },
    { stars: 3, what: "How netting/collateral/threshold/MTA/initial margin each move CVA up or down.", why: "A set of clean directional facts, useful for quick-fire true/false style questions." },
    { stars: 3, what: "The four WWR modeling approaches and each one's chief weakness.", why: "A clean enumerable list GARP likes to test by matching approach to weakness or to best-use-case." },
    { stars: 2, what: "Converting an upfront CVA into a running spread using risky duration.", why: "A concrete numeric calculation type (the −90,000/(3.75×100M) = −2.40bps pattern) that shows up as a standalone calculation question." }
  ],

  recall: [
    { q: "A bank is deciding whether to add a new derivative trade with an existing counterparty. Should it look at the trade's standalone CVA or its incremental CVA, and why?", a: "Incremental CVA — the change in the counterparty's TOTAL netted CVA from adding this trade. Standalone CVA ignores netting with the existing book; the actual pricing decision depends on how this trade's exposure interacts with (offsets or compounds) existing exposures under the netting agreement." },
    { q: "Why can BCVA be positive even though standalone (unilateral) CVA can only ever be negative?", a: "BCVA = CVA(counterparty) + DVA(institution). DVA is a benefit (positive contribution) reflecting the institution's own default risk. If the institution's own credit risk (DVA) exceeds the counterparty's credit risk (CVA) — i.e., the institution is riskier than its counterparty — BCVA can flip positive, something impossible for unilateral CVA, which only ever prices the counterparty's risk as a cost." },
    { q: "Explain why higher credit quality can actually make wrong-way risk WORSE, not better.", a: "A high-quality counterparty defaulting is a rare, surprising event — and when it does happen, it's more likely tied to an extreme, correlated, catastrophic scenario (since ordinary conditions wouldn't have caused it). This makes the JOINT bad outcome (high exposure + default) more severe when it occurs, even though it occurs less often — amplifying WWR's impact conditional on the tail event." },
    { q: "A gradual currency depreciation vs. a sudden currency devaluation both increase counterparty exposure. Why does collateral help in one case but not the other?", a: "Collateral calls and settlement take time (the margin period of risk). A GRADUAL exposure increase allows time to call for and receive additional collateral before the exposure grows too large. A SUDDEN jump (devaluation) outpaces the collateral call/settlement cycle — by the time collateral could be collected, the damage (or default) has already occurred." },
    { q: "A swap has EPE = 6% and the counterparty's credit spread is 375bps. What is the approximate CVA as a running spread, and what three assumptions does this shortcut rely on?", a: "CVA spread ≈ −EPE × credit spread = −6% × 3.75% ≈ −23bps. The shortcut assumes EPE is constant over the exposure profile, the default probability is constant over the profile, and EE and default probability are symmetric over the profile." }
  ],

  hooks: [
    { title: "EL's derivatives cousin", text: "CVA is EL=PD×LGD×EAD, stretched across time: instead of one EAD, a whole time series of EE(t); instead of one PD, a time series of q(t). Same DNA, more moving parts." },
    { title: "Add vs. attribute", text: "Incremental CVA: 'if I add this LEGO piece, how does the tower's height change?' Marginal CVA: 'looking at the built tower, how much height did EACH piece contribute?' Same tower, two different questions." },
    { title: "The mirror that can tip", text: "BCVA is a mirror — usually the counterparty's risk dominates (CVA), but if YOU'RE the riskier one, the mirror tips and BCVA can flip positive." },
    { title: "Rare things break worse", text: "A blue-chip counterparty defaulting is like a lighthouse going dark — rare enough that when it happens, it's usually because something much bigger is wrong, which is exactly why WWR bites harder for high-quality names." }
  ],

  quiz: [
    {
      q: "A swap has an expected potential exposure (EPE) of 6% and the counterparty's credit spread is 375bps. Using the quick running-spread approximation, what is the CVA spread?",
      options: ["−2.25bps", "−22.5bps", "−62.5bps", "−375bps"],
      answer: 1,
      why: "CVA spread ≈ −EPE × credit spread = −6% × 3.75% = −0.225% = −22.5bps (≈−23bps). −2.25bps confuses percentage points with basis points on the multiplication; −62.5bps and −375bps ignore the multiplicative structure of the formula entirely."
    },
    {
      q: "A risk manager wants to know which existing trades with a counterparty are driving the counterparty's total CVA the most. Which metric should the manager use?",
      options: ["Incremental CVA, because it accounts for netting when pricing a new trade", "Marginal CVA, because it decomposes total netted CVA into each trade's contribution", "Standalone CVA, because it is calculated without reference to other trades", "BCVA, because it incorporates the institution's own DVA"],
      answer: 1,
      why: "Marginal CVA substitutes each trade's marginal EE into the CVA formula so the trade-level pieces sum back to the total — exactly the ex-post attribution the manager needs. Incremental CVA answers a different question (should we ADD a new trade), and standalone CVA ignores netting altogether, making it useless for attribution within a netted book."
    },
    {
      q: "Which of the following statements about the impact of netting and collateralization on CVA is correct?",
      options: ["Netting increases CVA because it reduces exposure when trades are settled", "Collateralization does not affect CVA because it changes only expected exposure, not default probability", "Netting reduces CVA, and collateralization also reduces CVA by shrinking expected exposure", "Both netting and collateralization increase CVA by adding operational complexity"],
      answer: 2,
      why: "Netting reduces CVA by reducing net exposure at settlement, and collateralization reduces CVA by shrinking expected exposure (EE) even though it leaves default probability unchanged — CVA depends on both EE and PD, so shrinking either input shrinks CVA. The first and last options invert the direction; the second wrongly assumes only PD-based inputs matter."
    },
    {
      q: "A financial institution's own credit spread is much wider than its counterparty's, meaning the institution's DVA exceeds the counterparty's CVA. What does this imply for BCVA?",
      options: ["BCVA must still be negative, since CVA always dominates DVA by construction", "BCVA can be positive, reflecting that the institution itself is the riskier party", "BCVA is undefined in this scenario because DVA cannot exceed CVA", "BCVA equals zero whenever DVA and CVA are both nonzero"],
      answer: 1,
      why: "BCVA = CVA(counterparty) + DVA(institution); DVA is a benefit-like term because if the institution defaults first, it only pays a fraction of what it owes. If DVA exceeds CVA, BCVA flips positive — a result impossible for unilateral CVA, which is always negative. The other options either misapply the unilateral-CVA rule to the bilateral case or invent a constraint the formula doesn't have."
    },
    {
      q: "A Japanese bank funds USD borrowing by pledging JPY in an FX swap with a U.S. counterparty. After Lehman's default, the yen appreciates sharply against the dollar while U.S. bank credit quality simultaneously deteriorates. From the Japanese bank's perspective, this is an example of:",
      options: ["Right-way risk, because the yen appreciation is favorable to the Japanese bank", "Wrong-way risk, because rising exposure and rising counterparty default probability move together", "Neither WWR nor RWR, since FX moves are unrelated to counterparty credit quality by definition", "Wrong-way risk only if the swap has embedded optionality"],
      answer: 1,
      why: "The Japanese bank's exposure rises (yen appreciation makes the swap worth more to it) at the same time the U.S. counterparty's default probability rises — a positive correlation between exposure and default probability, the definition of wrong-way risk. Being 'favorable' in isolated FX terms is irrelevant; WWR is about the exposure-PD co-movement specifically, and FX moves absolutely can be correlated with counterparty credit quality in a systemic crisis, contrary to the third option."
    },
    {
      q: "Which wrong-way risk modeling approach best captures the sudden, 'cliff-like' jump in exposure typically seen in sovereign or large-firm default events (e.g., a currency devaluation at the moment of default)?",
      options: ["Hazard rate (intensity) approach", "Structural approach", "Parametric approach", "Jump approach"],
      answer: 3,
      why: "The jump approach explicitly models a discontinuous jump (e.g., FX depreciation by (1−RV), the residual-value factor) exactly at the moment of default, making it best suited to cliff-like sovereign/large-firm events. The hazard rate approach tends to UNDERESTIMATE WWR (a common trap answer since it's the 'easiest' approach); the structural and parametric approaches model smoother joint distributions or historical links rather than a discrete jump at default."
    }
  ],

  sources: [
    { title: "Credit valuation adjustment — Wikipedia", url: "https://en.wikipedia.org/wiki/Credit_valuation_adjustment", note: "Overview of CVA, DVA, and bilateral CVA with the standard formula notation." },
    { title: "Counterparty Credit Risk — BIS", url: "https://www.bis.org/publ/bcbs279.htm", note: "Basel Committee standard on measuring counterparty credit risk exposure (SA-CCR), useful background on how regulators formalize exposure inputs to CVA." },
    { title: "Wrong-way risk — Investopedia", url: "https://www.investopedia.com/terms/w/wrong-way-risk.asp", note: "Plain-language definition and examples of wrong-way risk, a good companion to the reading's worked scenarios." },
    { title: "Central counterparty clearing house — Wikipedia", url: "https://en.wikipedia.org/wiki/Central_counterparty_clearing", note: "Background on CCP mechanics — novation, margin, and loss mutualization — referenced in the WWR-and-CCPs section." }
  ],

  pdf: { book: 2, query: "pricing of counterparty risk is a function of the credit exposure" },

  summary: `<p><strong>Base CVA</strong> = \\(- (1- RR)\\Sigma EE(t_{i})q_{i}DF(t_{i})\\) — EL's derivatives cousin, stretched across time. <strong>Running spread</strong>: CVA spread ≈ −EPE×credit spread (e.g., −6%×3.75%≈−23bps); an upfront CVA converts to a spread via CVA/(risky duration×notional), solved recursively. <strong>Spread/recovery</strong>: ↑spread→↑CVA nonlinearly (capped at PD=100%); ↑RR→↑implied PD but ↓CVA. <strong>Netting/collateral</strong>: both reduce CVA (netting via exposure, collateral via EE); threshold/MTA raise CVA, initial margin lowers it; MPoR scales CVA by √time. <strong>Incremental CVA</strong> (pricing a new trade) ≠ <strong>marginal CVA</strong> (attributing existing CVA) — a frequently confused pair. <strong>Exotic/path-dependent</strong> products need approximation techniques for both valuation and CVA. <strong>BCVA</strong> = CVA+DVA: can be positive (if institution riskier), symmetric across parties, netting can be a DISADVANTAGE if own DVA dominates. <strong>WWR</strong> (exposure & PD positively correlated: ↑CVA ↓DVA) vs <strong>RWR</strong> (mirror) — higher credit quality AMPLIFIES WWR impact, counterintuitively; four modeling approaches (hazard rate, structural, parametric, jump) trade off ease of use against how well they capture true dependence. Gradual exposure increases let collateral help; sudden jumps (and CCP member defaults, absorbed via novation and loss mutualization) outpace it.</p>`
});
