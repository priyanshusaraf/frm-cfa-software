export default ({
  book: 2, reading: 36,
  session: "Counterparty Risk Management",
  title: "Future Value and Exposure",
  tagline: "Builds the exposure vocabulary that R37's CVA formula plugs directly into — treat this as 'R37's input data.'",

  teaches: `<p>The full exposure metric family (expected MtM, EE, PFE, maximum PFE, EPE, ENE, effective EE/EPE), how credit exposure differs from VaR, the four factors that shape a credit exposure profile (future uncertainty, periodic cash flows, combination of profiles, optionality), exposure profile shapes by product type, the netting factor formula, margin period of risk (MPoR) mechanics, the parameters that keep collateral from fully eliminating exposure, how funding exposure differs from credit exposure, and how segregation/rehypothecation rules determine whether a given type of collateral helps counterparty risk, funding, or both.</p>`,

  why: `<p>Get the SHAPE of exposure profiles for different product types memorized — it's tested visually and verbally, not just numerically. Everything quantitative in R31-35 (netting, collateral parameters, CCP margin) becomes numerical input here.</p>`,

  intuition: `<p>The core distinction: EXPECTED EXPOSURE (EE) is the average of the potential-loss part of the value distribution (only counting scenarios where you're owed money) — a central-tendency measure. POTENTIAL FUTURE EXPOSURE (PFE) is a high-confidence WORST CASE at one specific point in time — a tail measure, like VaR but for exposure rather than loss. MAXIMUM PFE is simply the single highest PFE value across the whole life of the trade — the one number a risk committee wants when it asks "what's the worst this could ever get?"</p>
  <p>Exposure profile SHAPES differ by product because of different underlying forces: bonds/loans stay flat at notional; interest rate swaps HUMP (rising rate uncertainty vs. shrinking remaining cash flows fighting each other); FX/cross-currency swaps rise MONOTONICALLY (large final notional exchange dominates); long options rise until exercise (time value + moneyness potential); long-protection CDS rises then JUMPS at a credit event (spread widening, then the default payoff itself).</p>
  <p>Underneath every one of those silhouettes are the same four building-block FACTORS the source calls out explicitly: (1) <strong>future uncertainty</strong> — contracts with a single payout at the very end (an FX forward, a forward rate agreement/FRA) accumulate uncertainty about that one final number the whole way to maturity, so exposure keeps climbing; (2) <strong>periodic cash flows</strong> — a contract that pays regularly (a bond coupon, a swap's periodic leg) "resets the clock" each payment date, which caps how much uncertainty can build up, though if those periodic payments are themselves variable (a floating-rate swap leg) some of that risk creeps back in; (3) <strong>combination of profiles</strong> — some products are really two risk factors stacked together, e.g. a cross-currency swap is an interest-rate swap PLUS an FX forward on the final notional exchange, so its exposure profile is the sum of an IRS-shaped hump and an FX-shaped ramp; (4) <strong>optionality</strong> — whenever a party can choose whether to exercise (a swap-settled interest rate swaption), that choice itself has value in bad states, and that added value shows up as added exposure until the choice is made.</p>`,

  visual: `<div class="widget" data-widget="exposure"></div>`,

  formulas: [
    {
      name: "Netting factor",
      math: "\\text{Netting factor} = \\sqrt{\\dfrac{1+(n-1)\\rho}{n}}",
      note: "\\(\\rho =1\\) → factor=100% (no benefit). \\(\\rho =0\\), n=2 → 71%. \\(\\rho =0\\), n=4 → 50%. More exposures + lower correlation = bigger benefit.",
      plain: "This says the standard deviation of n netted exposures, expressed as a fraction of what the standard deviation would be with zero netting benefit (perfect positive correlation), depends only on how many trades are netted (n) and how correlated their values are (\\(\\rho\\)) — more trades and lower (or negative) correlation shrink the ratio toward zero.",
      derivation: `<p>Model each of the n trade exposures as having the same volatility \\(\\sigma\\), with every pair sharing the same correlation \\(\\rho\\). The variance of the NETTED (summed) exposure is the usual portfolio-variance expression: each of the n variance terms contributes \\(\\sigma^{2}\\), and each of the \\(n(n-1)\\) covariance terms contributes \\(\\rho\\sigma^{2}\\):</p>
      \\[ \\text{Var}\\!\\left(\\sum_{i=1}^{n} X_i\\right) = n\\sigma^{2} + n(n-1)\\rho\\sigma^{2} = n\\sigma^{2}\\big(1+(n-1)\\rho\\big) \\]
      <p>so the netted standard deviation is \\(\\sigma\\sqrt{n\\big(1+(n-1)\\rho\\big)}\\). Compare this to the GROSS (no-netting) case, where every trade always moves the same way — the worst case is simply the straight sum of the n individual standard deviations, \\(n\\sigma\\). The netting factor is the ratio of the two:</p>
      \\[ \\text{Netting factor} = \\dfrac{\\sigma\\sqrt{n\\big(1+(n-1)\\rho\\big)}}{n\\sigma} = \\sqrt{\\dfrac{1+(n-1)\\rho}{n}} \\]
      <p>Set \\(\\rho = 1\\) and the fraction collapses to \\(\\sqrt{n/n}=1\\): full correlation means the trades always move together, so netting removes zero risk. As \\(\\rho\\) falls below zero the numerator shrinks, and the factor keeps improving all the way to \\(\\rho \\to -1/(n-1)\\), the theoretical bound below which the expression under the square root would turn negative (impossible for a variance) — this is why perfect NEGATIVE correlation, not zero correlation, is the true best case.</p>`
    },
    {
      name: "EE/PFE during MPoR",
      math: "\\text{EE(MPoR)} = \\text{current exposure} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}} \\times \\text{vol}; \\quad \\text{PFE(MPoR)} = z \\times \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}}",
      note: "10-day MPoR, 7% annual vol, 99% (z=2.33): PFE = \\(2.33\\times 0.07\\times \\sqrt{10/250}\\) = 3.27% of notional.",
      plain: "Both formulas scale an ANNUAL volatility down to the short window between a margin call and actually receiving the collateral (the MPoR) using the square-root-of-time rule, then convert that scaled volatility into either an average loss estimate (EE) or a high-confidence worst case (PFE, via the z-multiplier).",
      derivation: `<p>Annual volatility ("vol") describes how much a position's value can move over a full year of 250 trading days. To find how much it can move over just the MPoR (say, 10 days), scale the annual volatility down using the square-root-of-time rule, which assumes returns are independent day to day so variance (not volatility) scales linearly with time:</p>
      \\[ \\sigma_{\\text{MPoR}} = \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}} \\]
      <p>PFE at a chosen confidence level is then this short-window volatility scaled by the z-score for that confidence level (e.g. \\(z=2.33\\) for 99%), the same logic as parametric VaR:</p>
      \\[ \\text{PFE(MPoR)} = z \\times \\sigma_{\\text{MPoR}} = z \\times \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}} \\]
      <p>Worked example from the source: 7% annual volatility, a 10-day MPoR, 99% confidence (\\(z=2.33\\)):</p>
      \\[ \\text{PFE} = 2.33 \\times 0.07 \\times \\sqrt{\\dfrac{10}{250}} = 2.33 \\times 0.07 \\times 0.2 = 3.27\\% \\text{ of notional} \\]`
    },
    {
      name: "Collateral volatility with correlation",
      math: "\\sigma_{\\text{overall}} = \\sqrt{\\sigma_{\\text{trade}}^{2} + \\sigma_{\\text{collateral}}^{2} - 2\\rho\\, \\sigma_{\\text{trade}}\\, \\sigma_{\\text{collateral}}}",
      note: "Uncorrelated case simplifies to \\(\\sqrt{\\sigma_{\\text{collateral}}^{2}+\\sigma_{\\text{trade}}^{2}}\\).",
      plain: "This is claiming that when noncash collateral (e.g. a government bond) is posted against a trade, the volatility of the NET position isn't just the trade's own volatility — it also picks up the collateral's own price volatility, reduced only to the extent the two move together (correlation \\(\\rho\\)).",
      derivation: `<p>This is the standard two-asset variance-of-a-difference formula: the collateral is meant to offset the trade's exposure, but the collateral itself can lose value, so the residual risk is the variance of (trade value − collateral value):</p>
      \\[ \\sigma_{\\text{overall}}^{2} = \\sigma_{\\text{trade}}^{2} + \\sigma_{\\text{collateral}}^{2} - 2\\rho\\, \\sigma_{\\text{trade}}\\, \\sigma_{\\text{collateral}} \\]
      <p>When trade and collateral are uncorrelated (\\(\\rho = 0\\)) the cross term vanishes and the volatilities simply add in quadrature — worked example from the source, noncash collateral volatility 8% against an underlying exposure volatility of 5%:</p>
      \\[ \\sigma_{\\text{overall}} = \\sqrt{0.08^{2} + 0.05^{2}} = \\sqrt{0.0064+0.0025} = \\sqrt{0.0089} \\approx 9.43\\% \\]
      <p>Note this is HIGHER than either volatility alone — collateralizing with a volatile noncash asset reduces the average exposure but can increase the day-to-day uncertainty of the net (collateralized) position, which is exactly why the PFE formula needs \\(\\sigma_{\\text{overall}}\\), not just \\(\\sigma_{\\text{trade}}\\), once collateral volatility matters.</p>`
    }
  ],

  concepts: [
    {
      name: "The exposure metric family",
      def: "Expected MtM: expected value at a future date (can be negative). Expected exposure (EE): expected loss if MtM positive AND counterparty defaults (only positive part counts). Potential future exposure (PFE): high-confidence worst-case MtM at a specific future date. Maximum PFE: the single highest PFE value across the entire stated time horizon of the trade — the answer to 'what's the worst this position could ever expose me to?' Expected positive exposure (EPE): average of EE across time. Expected negative exposure (ENE): mirror of EPE from counterparty's perspective. Effective EE/EPE: non-decreasing EE (captures rollover risk on sub-1-year trades).",
      pitfall: "EE only counts the POSITIVE part of the value distribution — it's not the same as expected MtM, which can be negative. Also don't confuse PFE (worst case AT A GIVEN DATE) with maximum PFE (worst case ACROSS ALL DATES) — PFE is a curve, maximum PFE is one point picked off that curve.",
      related: [{ r: 37, label: "R37 — these metrics feed directly into the CVA formula" }],
      memory: "Expected MtM can go negative; EE never can — it's already filtered to 'only when it's positive.'"
    },
    {
      name: "Credit exposure vs. VaR — three extra considerations",
      def: "Application: exposure used for BOTH pricing and risk management (VaR is risk management only). Time horizon: exposure spans many future dates (drift, vol, co-dependence all matter); VaR's short horizon lets you ignore them. Risk mitigants: netting and (especially future, uncertain) collateral must be modeled into exposure in a way VaR doesn't need to worry about.",
      related: []
    },
    {
      name: "Credit exposure profile factors",
      def: "Four factors shape any credit exposure profile: (1) FUTURE UNCERTAINTY — contracts with a single payout only at maturity (an FX forward, a forward rate agreement/FRA) let uncertainty about that final value keep building the whole time, so exposure rises with maturity; (2) PERIODIC CASH FLOWS — regular payments (a bond coupon, a swap leg) periodically 'true up' the position and cap how much exposure can accumulate, though unequal/variable periodic payments (e.g. a floating-rate leg on an interest rate swap) reintroduce some of that risk; (3) COMBINATION OF PROFILES — a product built from more than one risk factor combines their exposure shapes, e.g. a cross-currency swap is an interest-rate swap (hump-shaped) plus an FX forward on the final notional exchange (rising), so its profile is the sum of both; (4) OPTIONALITY — where a party can choose whether to exercise (e.g. a swap-settled interest rate swaption), that choice has positive value in bad-for-the-other-side states, and that adds exposure until the exercise decision is made.",
      example: "A cross-currency swap's exposure profile is literally the interest-rate-risk hump plus the FX-risk ramp added together — the source's Figure 36.7 shows the FX-driven final-notional-exchange uncertainty dominating the total, with the IR component a smaller add-on.",
      pitfall: "Don't treat 'periodic cash flows reduce exposure' as universal — it only holds when the periodic payments are roughly equal each period. Unequal/variable periodic payments (a floating leg with rate resets) can add exposure back.",
      related: [{ r: 32, label: "R32 — the qualitative uncertainty this reading turns into a factor list" }],
      memory: "Four factors, one mnemonic: 'Uncertainty builds, Cash flows reset it, Combinations stack, Options add a choice.'"
    },
    {
      name: "Exposure profile shapes by product",
      def: "Bonds/loans/repos: ≈flat at notional (PFE tracks notional ~1:1) — a bond's small extra exposure above notional comes from interest-rate risk on its fixed coupon (if rates fall, the fixed-rate bond becomes more valuable), while a floating-rate loan's exposure can actually decline over time from prepayments. Interest rate swaps: peaked/hump (rising rate uncertainty vs. shrinking remaining cash flows). FX/cross-currency swaps: monotonically increasing (high FX vol + large final notional exchange dominates). Long options: rising until exercise (time value + potential to move deep ITM). Long-protection CDS: rises then jumps to (1−RR) at a credit event — e.g. a 45% recovery rate (RR) implies a 55% jump in exposure at default.",
      pitfall: "Payment frequency: receiving more often than paying REDUCES exposure (e.g. receiving floating quarterly while paying fixed semiannually lowers exposure versus equal-frequency payments); paying more often than receiving does the reverse. Exercise dates: a swap-settled swaption has HIGHER exposure than the equivalent forward swap BEFORE exercise (optionality to walk away adds value/exposure), but LOWER exposure AFTER (the forward swap doesn't have that walk-away option and can carry positive value in scenarios where the swaption was never exercised).",
      related: [{ r: 11, label: "R11 — option/bond pricing mechanics underlying these shapes" }],
      memory: "Know the SILHOUETTES: flat (bonds), hump (swaps), rising (FX/options), rise-then-jump (CDS)."
    },
    {
      name: "Netting factor",
      def: "Netting factor = \\(\\sqrt{(1+(n-1)\\rho)/n}\\). \\(\\rho=1\\) → 100% (no benefit). \\(\\rho=0\\), n=2 → 71%. \\(\\rho=0\\), n=4 → 50%.",
      pitfall: "More exposures + lower correlation = bigger netting benefit. Perfect negative correlation gives the MAXIMUM benefit (trades fully offset) — don't assume \\(\\rho=0\\) is the best case; \\(\\rho\\)→−1 is even better. There is a mathematical floor: \\(\\rho\\) cannot go below \\(-1/(n-1)\\), or the expression under the square root turns negative (an impossible variance) — for n=2 trades the floor is \\(\\rho=-1\\) exactly, but for n=4 trades it's \\(\\rho=-1/3\\).",
      related: [{ r: 33, label: "R33 — the netting concept this formula quantifies" }]
    },
    {
      name: "Margin period of risk (MPoR)",
      def: "Five steps: (1) valuation/margin call — how long it takes to calculate current exposure and the market value of collateral needed to decide whether a call is valid → (2) receiving collateral — the delay between the counterparty getting the request and actually releasing the collateral → (3) settlement — the time to convert the collateral into usable form (cash: intraday; government bonds: ~1 day; corporate bonds: ~3 days, per Basel II minimums) → (4) grace period — a short window given to the delivering counterparty before a failure to deliver is treated as a failure-to-pay default → (5) liquidation/close-out and re-hedge — the time needed to sell the collateral, close out the position, and put on replacement hedges. A prudent analyst assumes the counterparty posting collateral DEFAULTS during the MPoR — that assumption is what makes MPoR a period of genuinely elevated exposure, not just administrative delay.",
      example: "7% annual vol, 10-day MPoR, 99% confidence (z=2.33): PFE = \\(2.33\\times 0.07\\times \\sqrt{10/250}\\) = 3.27% of notional.",
      related: ["Collateral parameters that create residual exposure"]
    },
    {
      name: "Collateral parameters that create residual exposure",
      def: "MPoR, threshold (an exposure level below which no collateral is called — leaves that amount permanently uncollateralized), minimum transfer amount/MTA (the smallest block collateral can move in — amounts below it stay uncollateralized), initial margin (posted independently of ongoing mark-to-market moves — reduces exposure), and rounding (call amounts get rounded to an increment, again leaving a sliver uncovered). Collateral is PATH-DEPENDENT — today's required collateral call depends on how much was already posted in the past, not just today's exposure level in isolation.",
      example: "Funding exposure vs. credit exposure — five differences: defining value (subjective/close-out-dependent for credit, objective for funding since it also exists in non-default states), MPoR (assumes default for credit; a funding delay doesn't require default at all, so a funding value adjustment can be zero even when a credit value adjustment is not), aggregation (credit exposure nets by counterparty because it only matters at default; funding exposure can reuse margin across the whole portfolio since no default is assumed), wrong-way risk (a credit-only concept — funding risk doesn't have an equivalent), segregation (restricts whether posted margin can be reused, which affects funding benefits and credit-risk mitigation differently).",
      pitfall: "PFE analysis silently assumes a strongly collateralized position and ignores wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk — when a question asks for PFE's limitations, these SPECIFIC omissions (not 'it's just an estimate') are the tested answer.",
      related: [{ r: 37, label: "R37 — wrong-way risk fully developed" }]
    },
    {
      name: "Collateral, segregation, and rehypothecation",
      def: "Whether a piece of collateral helps counterparty risk, funding, or both depends on two switches: can it be REHYPOTHECATED (reused by the party that received it, e.g. posted onward against the receiver's own obligations), and is it SEGREGATED (held apart, off-limits to the receiver)? Four scenarios: (1) cash that is NOT segregated — mitigates BOTH counterparty risk and funding costs (the receiver can freely reuse it); (2) securities that CAN be rehypothecated — mitigates BOTH, provided haircuts are large enough to cover the securities' own price risk; (3) cash or securities that MUST be segregated and cannot be rehypothecated — mitigates counterparty risk (it's there to seize on default) but gives NO funding benefit, because it can't be reused in a non-default scenario; (4) the counterparty's OWN bonds, rehypothecated — helps funding costs but is nearly useless for counterparty-risk mitigation, because exactly when you'd need to rely on that collateral (the counterparty's default), those bonds are worthless too.",
      pitfall: "Scenario (4) is the classic trap: posting a counterparty's own debt as collateral against exposure to that same counterparty gives you collateral that fails exactly when you need it — a form of wrong-way risk baked into the collateral choice itself.",
      related: [{ r: 34, label: "R34 — CSA terms that determine segregation and rehypothecation rights" }],
      memory: "Reusable + not segregated = helps both. Segregated + not reusable = helps counterparty risk only. Their own bonds = helps funding only, and fails you exactly when you'd need it."
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
      { what: "PFE vs Maximum PFE", how: "PFE is a curve — one value per future date. Maximum PFE is the single highest point on that curve across the whole horizon." },
      { what: "Swaption exposure before vs after exercise date", how: "Before: swaption has HIGHER exposure than the forward swap (the option to walk away from a bad outcome adds value). After: LOWER exposure (once exercised or lapsed, it either becomes the swap or ceases — the forward swap lacks that early flexibility, so it stays exposed longer in a bad state)." },
      { what: "Credit exposure vs funding exposure", how: "Credit exposure assumes the counterparty DEFAULTS during the MPoR and is measured for netting sets; funding exposure is about the cost/benefit of financing margin and doesn't require a default assumption, and can be measured across the whole portfolio." }
    ]
  },

  misconceptions: [
    { wrong: "\"Expected exposure (EE) can be negative, just like expected MtM.\"", right: "EE only counts the POSITIVE part of the value distribution (loss if MtM>0 AND counterparty defaults) — it's non-negative by construction, unlike expected MtM which can be negative." },
    { wrong: "\"Receiving payments less frequently than paying them reduces counterparty exposure.\"", right: "The opposite — RECEIVING more often than paying REDUCES exposure, since cash comes in faster than it's owed out, shrinking the average outstanding exposure window." },
    { wrong: "\"PFE analysis fully accounts for wrong-way risk since it already models worst-case exposure.\"", right: "PFE analysis explicitly IGNORES wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk — it silently assumes a strongly collateralized position. These specific omissions are the tested limitations, not a vague 'it's just an estimate.'" },
    { wrong: "\"Zero correlation \\((\\rho=0)\\) gives the maximum netting benefit.\"", right: "Perfect NEGATIVE correlation \\((\\rho\\)→−1) gives the maximum benefit (trades fully offset) — the netting factor formula shows benefit keeps improving as \\(\\rho\\) falls below zero, not just to zero, down to a floor of \\(\\rho=-1/(n-1)\\)." },
    { wrong: "\"Posting a counterparty's own bonds as collateral is just as good as posting cash for reducing my counterparty risk.\"", right: "The counterparty's own bonds are worthless exactly when you'd need the collateral most — at the counterparty's default. They can help with funding costs if rehypothecated, but they are a poor choice for mitigating counterparty risk." }
  ],

  highYield: [
    { stars: 5, what: "The exposure profile shapes by product (flat/hump/rising/rise-then-jump) — visual and verbal recognition.", why: "Explicitly flagged as tested visually AND verbally, not just numerically — a distinctive, high-value study target." },
    { stars: 4, what: "EE vs PFE vs EPE vs ENE definitions, especially EE's 'positive part only' filter.", why: "The core vocabulary R37's CVA formula assumes fluent — get this wrong and CVA calculations break." },
    { stars: 4, what: "Netting factor formula and its extremes \\((\\rho=1\\) no benefit, \\(\\rho\\)→−1 maximum benefit).", why: "A clean, frequently tested formula with clear boundary behavior." },
    { stars: 3, what: "PFE's silent assumptions/limitations (ignores WWR, collateral uncertainty, liquidity risk).", why: "A precise 'what's missing' question format GARP favors." },
    { stars: 3, what: "Swaption vs forward swap exposure before/after the exercise date.", why: "A subtle, well-defined comparison connecting option theory to exposure profiles." },
    { stars: 2, what: "Segregation/rehypothecation scenarios and which one(s) help counterparty risk vs. funding.", why: "A structured 4-scenario table GARP can test as a matching or 'which is true' question." }
  ],

  recall: [
    { q: "Why does an interest rate swap's exposure profile peak in the middle of its life rather than rising monotonically like an FX swap's?", a: "Two forces fight: rising uncertainty about future rate paths pushes exposure up over time (diffusion), while the shrinking number of remaining cash flows as maturity approaches pulls exposure down (amortization/roll-off). Early on diffusion dominates; later, roll-off dominates, producing a hump. An FX swap lacks this offsetting roll-off force as strongly, since its terminal notional exchange dominates and grows with time." },
    { q: "A netting agreement covers 4 trades with pairwise correlation 0. What is the netting factor, and what does it mean?", a: "Netting factor = \\(\\sqrt{(1+(4-1)\\times 0)/4}\\) = \\(\\sqrt{1/4}\\) = 50%. This means netted exposure is roughly half of what gross (unnetted) exposure would be — reflecting substantial diversification benefit from combining 4 uncorrelated exposures." },
    { q: "List the specific risks that PFE analysis is known to silently ignore.", a: "Wrong-way risk, collateral-value uncertainty, and liquidity/liquidation risk. PFE analysis assumes a strongly collateralized position and doesn't model these — these specific omissions are the standard tested answer when asked about PFE's limitations." },
    { q: "Why does a swaption have HIGHER exposure than an equivalent forward swap before the exercise date, but LOWER exposure after?", a: "Before exercise, the swaption holder retains the OPTION to walk away if the swap would be unfavorable — this optionality itself has positive value in bad states, adding exposure relative to a forward swap that's locked in regardless. After the exercise date (once exercised into a swap, or lapsed), the swaption's distinguishing optionality is gone; the forward swap, having been obligated all along, can accumulate more downside exposure in adverse scenarios that the (now-decided) swaption already avoided by not exercising." },
    { q: "Name the four factors that shape a credit exposure profile, and give one instrument example for each.", a: "(1) Future uncertainty — an FX forward or FRA, whose single final payout accumulates uncertainty all the way to maturity. (2) Periodic cash flows — a coupon-paying bond or a swap leg, where regular payments cap accumulated uncertainty (unless the periodic amounts are themselves variable). (3) Combination of profiles — a cross-currency swap, whose exposure is an interest-rate-swap hump plus an FX-forward ramp added together. (4) Optionality — a swap-settled interest rate swaption, whose exercise choice adds exposure until the decision is made." },
    { q: "Why does posting a counterparty's own bonds as rehypothecated collateral help funding but not counterparty-risk mitigation?", a: "It helps funding because the receiver can reuse the bonds to finance other obligations. It fails as counterparty-risk mitigation because exactly when you would need to rely on the collateral — the counterparty's default — those same bonds are also in default and worth far less, so the collateral disappears precisely when it's needed." }
  ],

  hooks: [
    { title: "Silhouettes to memorize", text: "Flat line (bonds), a hump (swaps — diffusion fights roll-off), a rising ramp (FX/options), a ramp that jumps at the end (CDS pre-default). Four shapes, four stories — memorize the SILHOUETTE, not just the name." },
    { title: "EE already filtered", text: "Expected MtM is the raw average — can go negative. EE has already been through airport security: only the positive part gets through." },
    { title: "Negative correlation is the jackpot, not zero", text: "The netting factor formula keeps improving past \\(\\rho=0\\) — perfect negative correlation (trades that always offset) is the actual best case, not just 'no correlation.'" },
    { title: "Collateral that fails you exactly when you need it", text: "A counterparty's own bonds as collateral is the collateral equivalent of wrong-way risk — worthless the moment you'd actually go to cash it in." }
  ],

  eli5: `<p>Imagine you and a friend have an ongoing running bet on a season of fantasy football that gets re-scored every week — some weeks you're up money, some weeks your friend is. If your friend suddenly went bankrupt on a week you were UP, you'd lose whatever they owed you at that moment; if THEY were up, you'd simply owe them and their bankruptcy wouldn't cost you anything (you'd still have to pay, bankruptcy doesn't erase your debt to them). Now ask three different questions about that running bet: "on average, across all the weeks I might be up, how much would I typically lose if they went bust?" (that's like <strong>expected exposure, EE</strong> — the average of only the weeks you're owed money); "what's the worst single week this could ever get, at a 99%-confident level?" (that's <strong>potential future exposure, PFE</strong>); and "across the whole season, what's my running average exposure?" (that's <strong>expected positive exposure, EPE</strong>). A derivatives desk asks exactly these three questions about every trade with every counterparty, every day, because unlike a loan (where you know roughly what you're owed), a derivative's value can flip between an asset and a liability as markets move.</p>`,

  thinkLike: `<p>A counterparty risk manager doesn't ask "what is this trade worth today?" — that's the trading desk's question. The risk manager asks "if this counterparty vanished tomorrow, or in six months, or in five years, how much would I actually be out, and how does that number evolve as the trade ages?" That reframing is why exposure needs its own toolkit instead of borrowing VaR wholesale: VaR answers "how much could I lose over the next day or two," which lets you ignore drift, long-run volatility buildup, and contractual quirks like exercise dates or payment resets. Exposure can't ignore any of those, because the relevant horizon is the whole remaining life of the trade, and the exposure itself is what feeds directly into pricing a CVA charge (R37) — not just a risk report.</p>
  <p>On the exam, this reading is tested less as arithmetic and more as PATTERN RECOGNITION: you'll be shown a graph shape (or asked to describe one) and have to name the product and the underlying force driving it — rate uncertainty vs. roll-off for a swap's hump, notional-exchange uncertainty for an FX product's ramp, the credit-event jump for a CDS. When numbers do show up, they're almost always one of two templates: the netting factor formula (know its two limiting cases, \\(\\rho=1\\) and \\(\\rho\\to-1/(n-1)\\)), or the MPoR scaling formula (square-root-of-time applied to volatility, then multiplied by a z-score). Practicing both templates cold, and being able to say in words WHY the shape or the formula behaves the way it does, is what separates a fast, confident answer from a guess.</p>`,

  breakdown: [
    {
      title: "Exposure metric family (LO 36.a)",
      points: [
        "Expected MtM — the plain average value of the trade at a future date; can be positive or negative.",
        "Expected exposure (EE) — expected loss if MtM is positive AND the counterparty defaults; only the positive part of the distribution counts, so EE ≥ 0 always.",
        "Potential future exposure (PFE) — a high-confidence worst-case MtM at one specific future date (a tail/VaR-style measure for exposure).",
        "Maximum PFE — the single highest PFE value across the entire stated time horizon of the trade.",
        "Expected positive exposure (EPE) — the time-weighted average of EE across the whole horizon, a single summary number.",
        "Expected negative exposure (ENE) — EPE's mirror image, computed from the counterparty's perspective (based on negative future values).",
        "Effective EE / effective EPE — EE forced to be non-decreasing over time (and the average of that), built specifically to capture rollover risk on transactions under one year."
      ]
    },
    {
      title: "Four factors shaping a credit exposure profile (LO 36.c)",
      points: [
        "Future uncertainty — single-payout-at-maturity contracts (FX forwards, FRAs) accumulate uncertainty about that one final value the whole way to maturity.",
        "Periodic cash flows — regular payments (bond coupons, swap legs) reset the position periodically and cap accumulated uncertainty, unless the periodic amounts are themselves variable (a floating-rate leg).",
        "Combination of profiles — products built from more than one risk factor (a cross-currency swap = interest-rate swap + FX forward) combine their exposure shapes.",
        "Optionality — an exercise decision (a swap-settled interest rate swaption) adds exposure because the choice itself has value in bad-for-the-counterparty states."
      ]
    },
    {
      title: "Exposure profile shapes by product (LO 36.d)",
      points: [
        "Bonds, loans, repos — approximately flat at notional; bonds get slight extra exposure from fixed-coupon interest-rate risk, floating-rate loans can decline from prepayments.",
        "Interest rate swaps — peaked/hump shape: rising rate uncertainty fights shrinking remaining cash flows (roll-off).",
        "FX and cross-currency swaps — monotonically increasing, driven mainly by uncertainty about the large final notional exchange.",
        "Long options — exposure rises until exercise, driven by time value and the potential to move deep in the money.",
        "Long-protection CDS — exposure rises with spread widening, then jumps at a credit event to (1 − recovery rate) of notional."
      ]
    },
    {
      title: "Five steps in computing the margin period of risk (MPoR)",
      points: [
        "Step 1 — Valuation/margin call: time to calculate current exposure and the market value of collateral needed to justify a call.",
        "Step 2 — Receiving collateral: delay between the counterparty getting the call and actually releasing collateral.",
        "Step 3 — Settlement: time to convert collateral into usable form (cash: intraday; government bonds: ~1 day; corporate bonds: ~3 days, per Basel II minimums).",
        "Step 4 — Grace period: window before a failure to deliver collateral is treated as a failure-to-pay default.",
        "Step 5 — Liquidation/close-out and re-hedge: time to sell collateral, close out the position, and put on replacement hedges."
      ]
    },
    {
      title: "Five collateral parameters that create residual (uncollateralized) exposure",
      points: [
        "Margin period of risk (MPoR) — the delay itself is a window of elevated, uncollateralized exposure.",
        "Threshold — an exposure level below which no collateral is called at all; that amount stays permanently uncollateralized.",
        "Minimum transfer amount (MTA) — the smallest block collateral can move in; amounts below it aren't collateralized.",
        "Initial margin — posted independently of ongoing marks; reduces exposure (a positive factor, unlike the others).",
        "Rounding — call amounts get rounded to an increment, leaving a small sliver uncollateralized."
      ]
    },
    {
      title: "Five differences between funding exposure and credit exposure (LO 36.g)",
      points: [
        "Defining value — subjective/close-out-dependent for credit exposure; objective for funding exposure (it exists in non-default states too).",
        "Margin period of risk — assumes counterparty default for credit exposure; a funding delay doesn't require a default assumption, so the funding value adjustment can be zero when the credit value adjustment isn't.",
        "Aggregation — credit exposure nets by counterparty (only matters at default); funding exposure can reuse margin across the whole portfolio.",
        "Wrong-way risk — a credit-exposure-only concept; not a key consideration for funding.",
        "Segregation — restricts reuse of posted margin, affecting credit and funding exposure differently."
      ]
    },
    {
      title: "Four collateral segregation/rehypothecation scenarios and their effect (LO 36.i)",
      points: [
        "Cash, not segregated — mitigates BOTH counterparty risk and funding costs (fully reusable).",
        "Securities that can be rehypothecated — mitigates BOTH, provided haircuts are sufficient to cover the securities' own price risk.",
        "Cash or securities that must be segregated and cannot be rehypothecated — mitigates counterparty risk only; no funding benefit since it can't be reused absent default.",
        "Counterparty's own bonds, rehypothecated — helps funding costs but is a poor counterparty-risk mitigant, since those bonds are also worthless exactly when the counterparty defaults."
      ]
    }
  ],

  quiz: [
    {
      q: "A trade's expected mark-to-market (MtM) at a future date is –$2 million. What is its expected exposure (EE) at that date?",
      options: ["–$2 million", "$0", "$2 million", "Cannot be determined without more information"],
      answer: 1,
      why: "EE only counts the positive part of the MtM distribution — scenarios where the firm is owed money and the counterparty could default. A negative expected MtM alone doesn't fix EE at exactly $0 in general (EE is computed from the full distribution, not just its mean), but conceptually EE can never be negative, ruling out –$2 million; among the choices, $0 reflects that a negative-mean position typically has EE close to zero if the positive tail is thin, and the key teaching point is that EE ≠ expected MtM and EE is never negative. The tempting wrong answer, –$2 million, comes from confusing EE with expected MtM, which is exactly the trap this question tests."
    },
    {
      q: "Which product typically shows a monotonically INCREASING potential future exposure (PFE) profile, rather than a flat or peaked one?",
      options: ["A fixed-rate bond", "An interest rate swap", "A cross-currency swap", "A repo"],
      answer: 2,
      why: "Cross-currency swaps combine interest-rate risk with a large final notional exchange in foreign currency, and FX volatility plus that large terminal payment dominate, producing a monotonically rising PFE. The tempting distractor is 'interest rate swap' — but a plain interest rate swap (no cross-currency notional exchange) shows a PEAKED/hump shape, since diffusion (rising rate uncertainty) is eventually overtaken by roll-off (shrinking remaining cash flows) — it's the missing notional exchange that keeps a same-currency swap from ever ramping up monotonically the way a cross-currency swap does."
    },
    {
      q: "A netting agreement covers 3 trades with pairwise correlation of 0.3. What is the netting factor (round to the nearest whole percent)?",
      options: ["30%", "50%", "73%", "100%"],
      answer: 2,
      why: "Netting factor = \\(\\sqrt{(1+(n-1)\\rho)/n} = \\sqrt{(1+2\\times0.3)/3} = \\sqrt{1.6/3} = \\sqrt{0.533} \\approx 73\\%\\). The distractor '30%' comes from simply reporting the correlation itself instead of plugging it into the formula; '50%' is the answer for n=4 at \\(\\rho=0\\) (a different, commonly memorized case) mistakenly reused here; '100%' would only be correct if \\(\\rho=1\\)."
    },
    {
      q: "A position has 10% annual volatility. Under a 5-day margin period of risk (MPoR) at 99% confidence (z = 2.33, 250 trading days/year), what is the approximate PFE(MPoR) as a percent of notional?",
      options: ["10.00%", "2.33%", "3.30%", "0.47%"],
      answer: 2,
      why: "PFE(MPoR) = \\(z \\times \\text{vol} \\times \\sqrt{\\text{MPoR}/250} = 2.33 \\times 0.10 \\times \\sqrt{5/250} = 2.33 \\times 0.10 \\times 0.1414 \\approx 3.30\\%\\). '10.00%' ignores the time-scaling entirely (just restates annual vol); '2.33%' drops the volatility term and reports the z-score-scaled figure incorrectly; '0.47%' comes from forgetting to take the square root of the 5/250 ratio (using 5/250 = 0.02 directly instead of \\(\\sqrt{0.02}\\))."
    },
    {
      q: "An interest rate swaption (swap-settled) is compared to an equivalent forward swap. Which statement is correct?",
      options: [
        "The swaption always has higher exposure than the forward swap, both before and after the exercise date.",
        "The swaption has higher exposure before the exercise date, but lower exposure after it.",
        "The forward swap always has higher exposure than the swaption, both before and after the exercise date.",
        "Exposure is identical for both instruments at all times, since they reference the same underlying swap."
      ],
      answer: 1,
      why: "Before exercise, the swaption holder retains the option to walk away from an unfavorable swap, and that optionality itself carries positive value in bad states, giving the swaption higher exposure than the forward swap (which is obligated regardless). After the exercise date, that distinguishing optionality is resolved — the forward swap, having been locked in the whole time, can carry more downside exposure in scenarios where the swaption was never exercised. The tempting distractor, 'always higher,' ignores that the reversal after exercise is the entire point the source emphasizes."
    },
    {
      q: "Which of the following is explicitly NOT captured by a standard potential future exposure (PFE) analysis?",
      options: ["The notional amount of the trade", "Wrong-way risk", "The confidence level chosen for the tail estimate", "The maturity of the trade"],
      answer: 1,
      why: "PFE analysis silently assumes a strongly collateralized position and does not model wrong-way risk, collateral-value uncertainty, or liquidity/liquidation risk. Notional, confidence level, and maturity are all direct, necessary INPUTS to a PFE calculation, not omissions — the trap is picking one of the actual inputs instead of recognizing wrong-way risk as the specific, commonly tested gap in PFE."
    }
  ],

  sources: [
    { title: "Credit valuation adjustment (Wikipedia)", url: "https://en.wikipedia.org/wiki/Credit_valuation_adjustment", note: "Background on how expected exposure (EE) and expected positive exposure (EPE) feed into CVA — useful bridge to R37." },
    { title: "Netting (Wikipedia)", url: "https://en.wikipedia.org/wiki/Netting", note: "General background on netting agreements and close-out netting mechanics referenced by the netting factor formula." },
    { title: "Basel Committee — The standardised approach for measuring counterparty credit risk exposures (BCBS 279)", url: "https://www.bis.org/publ/bcbs279.pdf", note: "The regulatory (SA-CCR) treatment of exposure and margin period of risk that this reading's academic framework underpins." },
    { title: "Counterparty Risk (Investopedia)", url: "https://www.investopedia.com/terms/c/counterpartyrisk.asp", note: "Plain-language refresher on counterparty risk before diving into the exposure metrics." }
  ],

  pdf: { book: 2, query: "we describe credit exposures for various security positions" },

  summary: `<p><strong>Exposure family</strong>: Expected MtM (can be negative) → EE (positive part only) → PFE (tail, high-confidence worst case) → maximum PFE (single worst point across the horizon) → EPE (time-average of EE) → ENE (counterparty's mirror) → effective EE/EPE (non-decreasing, captures rollover risk). Exposure vs VaR: used for pricing AND risk management, spans many future dates, must model netting/collateral. <strong>Four profile factors</strong>: future uncertainty, periodic cash flows, combination of profiles, optionality. <strong>Profile shapes</strong>: bonds flat, swaps hump, FX/options rising, CDS rise-then-jump. <strong>Netting factor</strong> = \\(\\sqrt{(1+(n-1)\\rho)/n}\\) — \\(\\rho=1\\) no benefit, \\(\\rho\\to-1/(n-1)\\) maximum benefit. <strong>MPoR</strong>: 5-step process (call→collateral→settlement→grace→liquidation); \\(PFE(MPoR)=z\\cdot vol\\cdot\\sqrt{MPoR/250}\\). PFE ignores wrong-way risk, collateral-value uncertainty, liquidity risk. Collateral is path-dependent. <strong>Funding vs credit exposure</strong> differ in value definition, MPoR use, aggregation, wrong-way risk, and segregation. <strong>Segregation/rehypothecation</strong>: unsegregated cash and rehypothecatable securities help both counterparty risk and funding; segregated collateral helps only counterparty risk; a counterparty's own rehypothecated bonds help only funding (and fail exactly at default).</p>`
});
