export default ({
  book: 2, reading: 36,
  session: "Counterparty Risk Management",
  title: "Future Value and Exposure",
  tagline: "R37 prices counterparty risk. This is the reading that produces the number R37 prices.",

  teaches: `<p>How to answer one question: if this counterparty defaults at some point in the future, how much will I actually be out? A loan answers it trivially. A derivative does not, because its value keeps moving, and the same trade can be an asset to you one month and a liability the next. So you build a vocabulary for a moving number: expected mark-to-market, expected exposure, potential future exposure, maximum potential future exposure, expected positive exposure, expected negative exposure, and effective expected exposure. Then you learn the shapes those numbers trace out for different products, and the two things that shrink them, netting and collateral.</p>`,

  why: `<p>R31 through R35 gave you the risk-mitigation toolkit qualitatively. Here it becomes arithmetic, and every number you produce here is an input to the credit value adjustment (CVA) formula in R37. Get the exposure vocabulary wrong and every CVA calculation downstream is wrong in a way that is very hard to trace back. The profile shapes carry as much weight as the arithmetic: a question can hand you a graph and ask which product drew it, or hand you a product and ask what its graph looks like.</p>`,

  intuition: `<p>Start with a loan. You have lent a company $100 million. How much do you lose if they default tomorrow? The loan agreement tells you: $100 million, less whatever you recover. Now replace the loan with a five-year interest rate swap struck at the going market rate. Today it is worth nothing to either side, so today the answer is zero. Ask the same question about a date three years out and there is no single answer any more, only a distribution. Rates might have moved your way, in which case the counterparty owes you and their default costs you real money. Rates might have moved their way, in which case you owe them. Counterparty exposure is the business of putting numbers on that distribution.</p>
  <p>Two facts organize everything that follows. First, <strong>only the scenarios where they owe YOU can hurt you.</strong> If you are the one in the red and your counterparty fails, you still owe the money; their failure costs you nothing. So every exposure measure begins by throwing away the negative half of the value distribution. Second, <strong>one date is not enough.</strong> A swap can be harmless for two years and dangerous in year four, so exposure is a curve through time, not a scalar, and different questions read different things off that curve.</p>
  <p>The metric family is just the list of sensible questions you can ask about that curve. "What is this trade worth on average at that date, counting both directions?" gives <strong>expected mark-to-market (expected MtM)</strong>, which can be negative. "Same date, but only counting the scenarios where they owe me" gives <strong>expected exposure (EE)</strong>, which is never negative and is always at least as large as expected MtM, because the losing half has been dropped rather than averaged in. "Same date, but the bad tail rather than the average" gives <strong>potential future exposure (PFE)</strong>, a high-confidence worst case; the word that distinguishes it from its look-alikes is FUTURE. "Across the whole life, what is the single worst PFE?" gives <strong>maximum PFE</strong>, one point picked off the PFE curve. "Across the whole life, what is my average EE?" gives <strong>expected positive exposure (EPE)</strong>, the single summary number a risk report quotes; the word that distinguishes EPE from PFE is POSITIVE, and mixing those two up is the classic slip. "What does this look like from their side?" gives <strong>expected negative exposure (ENE)</strong>, the mirror image of EPE built from the negative future values. And <strong>effective EE</strong>, with its average <strong>effective EPE</strong>, is EE forced never to fall as time passes, which exists so that a short trade cannot look safe just because it matures inside a year when in practice it gets rolled into a fresh one.</p>
  <p>Once you can read one curve, the useful skill is recognizing whole silhouettes. A bond or a loan sits roughly flat at notional, because the money at risk is the principal and it does not wander much. An interest rate swap makes a hump: uncertainty about future rates pushes exposure up as you look further out, while each payment that settles removes one more cash flow from the remaining trade and pulls exposure back down. Early on the first force wins, later the second does, and the peak is where they cross. A foreign exchange or cross-currency swap climbs the whole way, because a large notional amount changes hands at the very end and no amount of waiting makes that final number more certain. A long option position climbs until exercise, since it can always drift further into the money. A long-protection credit default swap (CDS) drifts up as the reference credit's spread widens, then jumps at a credit event to notional less recovery.</p>
  <p>Underneath those silhouettes are four building blocks. <strong>Future uncertainty</strong>: a contract that pays once, at the end (a foreign exchange forward, a forward rate agreement), lets doubt about that single final number accumulate all the way to maturity, so exposure keeps climbing. <strong>Periodic cash flows</strong>: a contract that pays regularly settles part of the position each time and caps how much doubt can pile up, though if those payments are themselves variable (a floating leg whose rate resets) some of the uncertainty comes back. <strong>Combination of profiles</strong>: some products are two risk factors stacked, so their exposure is the sum of two shapes. A cross-currency swap is an interest rate swap plus a foreign exchange forward on the final notional exchange, which is exactly why its profile is a hump riding on a ramp. <strong>Optionality</strong>: when one side gets to choose whether to exercise, that choice is worth something in the states where it matters, and that value shows up as extra exposure right up until the choice is made.</p>`,

  visual: `<div class="widget" data-widget="exposure"></div>`,

  formulas: [
    {
      name: "Netting factor",
      math: "\\text{Netting factor} = \\sqrt{\\dfrac{1+(n-1)\\rho}{n}}",
      note: "At \\(\\rho=1\\) the factor is 100% (no benefit). At \\(\\rho=0\\): 71% for n=2, 50% for n=4. More trades and lower correlation both help.",
      plain: "Netted exposure has a standard deviation smaller than the sum of the individual standard deviations, and this ratio says by how much. It depends on only two things: how many trades sit inside the netting set (n) and how correlated their values are (\\(\\rho\\)). More trades, and lower or negative correlation, push the ratio toward zero, which means a bigger netting benefit.",
      derivation: `<p>Give each of the n trade exposures the same volatility \\(\\sigma\\), and give every pair the same correlation \\(\\rho\\). The variance of the netted (summed) exposure is the ordinary portfolio-variance expression: n variance terms each contributing \\(\\sigma^{2}\\), and \\(n(n-1)\\) covariance terms each contributing \\(\\rho\\sigma^{2}\\):</p>
      \\[ \\text{Var}\\!\\left(\\sum_{i=1}^{n} X_i\\right) = n\\sigma^{2} + n(n-1)\\rho\\sigma^{2} = n\\sigma^{2}\\big(1+(n-1)\\rho\\big) \\]
      <p>So the netted standard deviation is \\(\\sigma\\sqrt{n\\big(1+(n-1)\\rho\\big)}\\). Compare that against the case with no netting benefit at all, where the trades always move together and the worst case is simply the straight sum of the n individual standard deviations, \\(n\\sigma\\). The netting factor is the ratio:</p>
      \\[ \\text{Netting factor} = \\dfrac{\\sigma\\sqrt{n\\big(1+(n-1)\\rho\\big)}}{n\\sigma} = \\sqrt{\\dfrac{1+(n-1)\\rho}{n}} \\]
      <p>Set \\(\\rho = 1\\) and the fraction collapses to \\(\\sqrt{n/n}=1\\). Perfect positive correlation means the trades always move the same way, so netting removes nothing. Push \\(\\rho\\) below zero and the numerator shrinks, and the factor keeps improving right down to \\(\\rho = -1/(n-1)\\). That is a hard floor, not a rounding convention: below it the expression under the square root would be negative, which no variance can be. This is why perfect negative correlation, not zero correlation, is the true best case.</p>`
    },
    {
      name: "EE and PFE during the margin period of risk",
      math: "\\text{EE(MPoR)} = \\text{current exposure} \\times \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}}; \\quad \\text{PFE(MPoR)} = z \\times \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}}",
      note: "10-day MPoR, 7% annual volatility, 99% confidence (z = 2.33): PFE = \\(2.33\\times 0.07\\times \\sqrt{10/250}\\), about 3.3% of notional.",
      plain: "Both lines do the same first step: take an annual volatility and shrink it to the length of the gap between calling for collateral and actually having it, using the square-root-of-time rule. They differ in the second step. EE multiplies that shrunken volatility by the exposure you currently have on the books, giving an expected move in money terms. PFE multiplies it by a confidence multiplier z instead, giving a worst-case move as a percentage that you then apply to notional.",
      derivation: `<p>Annual volatility describes how far a position's value can travel over a full year of 250 trading days. To get the move over just the margin period of risk (MPoR), say 10 days, scale it down with the square-root-of-time rule, which assumes day-to-day returns are independent so that variance, not volatility, grows linearly with time:</p>
      \\[ \\sigma_{\\text{MPoR}} = \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}} \\]
      <p>PFE at a chosen confidence level is that short-window volatility multiplied by the z-score for the level you picked (2.33 for 99%), exactly the parametric VaR construction:</p>
      \\[ \\text{PFE(MPoR)} = z \\times \\sigma_{\\text{MPoR}} = z \\times \\text{vol} \\times \\sqrt{\\dfrac{\\text{MPoR}}{250}} \\]
      <p>Worked through with 7% annual volatility, a 10-day MPoR and 99% confidence:</p>
      \\[ \\text{PFE} = 2.33 \\times 0.07 \\times \\sqrt{\\dfrac{10}{250}} = 2.33 \\times 0.07 \\times 0.2 \\approx 3.3\\% \\text{ of notional} \\]
      <p>Notice that \\(\\sqrt{10/250}\\) is exactly 0.2, so a 10-day window carries a fifth of a year's volatility, not a fortieth. That is the whole reason a few days of delay is worth modelling at all.</p>`
    },
    {
      name: "Collateral volatility with correlation",
      math: "\\sigma_{\\text{overall}} = \\sqrt{\\sigma_{\\text{trade}}^{2} + \\sigma_{\\text{collateral}}^{2} - 2\\rho\\, \\sigma_{\\text{trade}}\\, \\sigma_{\\text{collateral}}}",
      note: "With no correlation the cross term drops out and this reduces to \\(\\sqrt{\\sigma_{\\text{trade}}^{2}+\\sigma_{\\text{collateral}}^{2}}\\).",
      plain: "Once you hold something other than cash as collateral, the collateral has a price of its own that can fall. So the risk that actually remains is the risk of the gap between the trade's value and the collateral's value, which is why this is a variance-of-a-difference. Positive correlation between the two is helpful here: the minus sign means the more the collateral moves with the trade, the smaller the leftover risk.",
      derivation: `<p>The collateral is meant to offset the trade's exposure, but it can lose value on its own, so what is left over is the variance of (trade value minus collateral value):</p>
      \\[ \\sigma_{\\text{overall}}^{2} = \\sigma_{\\text{trade}}^{2} + \\sigma_{\\text{collateral}}^{2} - 2\\rho\\, \\sigma_{\\text{trade}}\\, \\sigma_{\\text{collateral}} \\]
      <p>Take an uncorrelated case (\\(\\rho = 0\\)), with noncash collateral at 8% volatility posted against an underlying exposure at 5%. The cross term vanishes and the two volatilities add in quadrature:</p>
      \\[ \\sigma_{\\text{overall}} = \\sqrt{0.08^{2} + 0.05^{2}} = \\sqrt{0.0064+0.0025} = \\sqrt{0.0089} \\approx 9.43\\% \\]
      <p>That 9.43% is higher than either input on its own, and the point is worth sitting with. Taking volatile noncash collateral genuinely lowers your average exposure, because you are holding something valuable, and at the same time it raises the day-to-day uncertainty of the collateralized position, because now two prices are moving instead of one. That is why the PFE formula has to be fed \\(\\sigma_{\\text{overall}}\\) rather than \\(\\sigma_{\\text{trade}}\\) as soon as the collateral is anything but cash.</p>
      <p>The correlation term is what makes collateral selection a real decision. A 10-year swap collateralized with a 15-year government bond has volatilities of 4% and 6%, and because both instruments respond to the same interest rates, \\(\\rho\\) is well above zero and the subtraction does real work. Choose collateral that moves with the trade and the leftover risk shrinks; choose collateral unrelated to it and you are simply stacking a second source of noise on top of the first.</p>`
    }
  ],

  concepts: [
    {
      name: "The exposure metric family",
      def: "The set of numbers describing what a counterparty could owe you at future dates. Expected mark-to-market is the plain average of the trade's future value and can be negative. Every other member first discards the scenarios in which you owe them, so none of the others ever can be. They then differ along two axes: one date or the whole life, and average or tail.",
      intuition: "Expected exposure and potential future exposure are the average and the tail of the same one-date picture. Expected positive exposure and maximum PFE are what you get when you collapse each of those curves to a single number across the whole life, an average in one case and a peak in the other.",
      example: "A five-year swap might have EE of $3 million at the two-year point and PFE of $11 million at the same point, with maximum PFE of $14 million occurring at year three and EPE of $2.6 million describing the whole trade.",
      pitfall: "EE keeps only the positive part of the distribution, so it is not the same object as expected MtM and cannot be negative. Separately, do not read PFE and maximum PFE as synonyms: PFE is a curve with one value per future date, and maximum PFE is the single highest point on it.",
      related: [{ r: 37, label: "R37: these metrics feed the CVA formula" }],
      memory: "Expected MtM can go negative. EE cannot, because it has already been filtered down to the days you are owed money."
    },
    {
      name: "Credit exposure versus value at risk",
      def: "Value at risk (VaR) and credit exposure are both tail-flavoured loss measures, but exposure carries three burdens VaR does not: it prices as well as measures, it runs over years rather than days (so drift, long-run volatility, co-dependence and path dependency all matter), and it has to model risk mitigants, meaning netting rules and future collateral whose type and timing are not yet known.",
      intuition: "A one-day VaR can ignore drift because nothing drifts far in a day. Exposure cannot, because five years is long enough for the trend in a rate to matter more than its wiggle.",
      pitfall: "The subjectivity in exposure is not sloppiness. Future collateral genuinely has to be assumed rather than observed, which is why two banks can compute honest but different exposures for the same trade."
    },
    {
      name: "Credit exposure profile factors",
      def: "The four forces that decide what shape an exposure profile takes: future uncertainty (doubt about a single final payout accumulates with time), periodic cash flows (regular settlement caps how much doubt can accumulate), combination of profiles (a product built from two risk factors inherits both shapes), and optionality (an unmade exercise decision carries value, and therefore exposure, until it is made).",
      example: "A cross-currency swap's exposure is literally the interest-rate hump plus the foreign exchange ramp added together, with the uncertainty about the final notional exchange dominating and the interest-rate component a smaller add-on riding on top.",
      pitfall: "\"Periodic cash flows reduce exposure\" only holds while those payments are roughly equal each period. Once the amounts are variable, as on a floating leg whose rate resets, some of the uncertainty comes straight back.",
      related: [{ r: 32, label: "R32: the qualitative version of this uncertainty" }],
      memory: "Uncertainty builds, cash flows reset it, combinations stack, options add a choice."
    },
    {
      name: "Exposure profile shapes by product",
      def: "Bonds, loans and repos sit roughly flat at notional. Interest rate swaps peak in the middle, because rising rate uncertainty and shrinking remaining cash flows pull opposite ways. Foreign exchange and cross-currency swaps rise the whole way, driven by the notional exchange at the end. Long options rise until exercise. Long-protection credit default swaps drift up, then jump at a credit event.",
      example: "A fixed-rate bond gets a little extra exposure above notional from interest-rate risk, since a fall in rates makes its fixed coupon more valuable. A floating-rate loan can go the other way and decline over time as borrowers prepay. On a credit default swap with a 45% recovery rate, the jump at default takes exposure to 55% of notional.",
      pitfall: "Payment frequency shifts the profile: receiving more often than you pay reduces exposure, so a swap receiving floating quarterly while paying fixed semiannually is less exposed than the equal-frequency version, and paying more often than you receive does the reverse. Exercise dates flip the ranking: a swap-settled swaption carries more exposure than the matching forward swap before the exercise date, and less after it.",
      related: [{ r: 11, label: "R11: the option and bond pricing under these shapes" }],
      memory: "Four silhouettes: flat for bonds, a hump for swaps, a ramp for foreign exchange and options, a ramp with a cliff at the end for credit default swaps."
    },
    {
      name: "Netting factor",
      def: "The ratio of netted exposure risk to the risk you would carry with no netting benefit at all, given by \\(\\sqrt{(1+(n-1)\\rho)/n}\\). It answers how much of your gross exposure the netting agreement actually removes.",
      example: "At \\(\\rho=1\\) the factor is 100%, meaning nothing is removed. At \\(\\rho=0\\) it is 71% for two trades and 50% for four.",
      pitfall: "More trades and lower correlation both increase the benefit, and the best case is perfect negative correlation, not zero correlation: the factor keeps improving as \\(\\rho\\) goes below zero. There is a floor, though. Correlation cannot fall below \\(-1/(n-1)\\) or the expression under the square root turns negative, which is impossible for a variance. For two trades that floor is exactly \\(\\rho=-1\\); for four trades it is only \\(\\rho=-1/3\\).",
      related: [{ r: 33, label: "R33: the netting mechanics this quantifies" }]
    },
    {
      name: "Margin period of risk (MPoR)",
      def: "The stretch of time between calling for collateral and actually having usable collateral in hand, also called the remargin period. It is treated as a window of elevated exposure rather than mere administrative delay, because the prudent assumption is that the counterparty who owes the collateral defaults during it. Five steps make it up: valuation and margin call, receiving collateral, settlement, grace period, and liquidation with re-hedging.",
      example: "Settlement alone varies by what was posted: cash can move intraday, government bonds take about a day, corporate bonds about three, using Basel II minimums. With 7% annual volatility, a 10-day MPoR and 99% confidence, PFE works out at about 3.3% of notional.",
      pitfall: "MPoR is a function of the collateral agreement, the counterparty, legal terms and the firm's own operations, so it is not a constant you can memorize. A firm may also go easy on a valued client and let the period run longer than the paperwork allows.",
      related: [{ r: 34, label: "R34: the CSA terms that set the collateral clock" }]
    },
    {
      name: "Collateral parameters that create residual exposure",
      def: "Even a fully documented collateral agreement leaves some exposure uncovered, and five named parameters are where it hides: the margin period of risk, the threshold, the minimum transfer amount, initial margin, and rounding. Four of the five create exposure; initial margin is the one that reduces it.",
      intuition: "Thresholds and minimum transfer amounts exist because nobody wants to move $4,000 of collateral back and forth every afternoon. The operational relief is real, and the price of it is a permanently uncollateralized band.",
      example: "With a $10 million threshold and a $1 million minimum transfer amount, an exposure of $10.4 million triggers no call at all: it is only $0.4 million over the threshold, which is below the minimum block that can move. You are carrying the full $10.4 million uncollateralized.",
      pitfall: "Collateral is path-dependent, so today's call depends on what was posted in the past and not just on today's exposure level. And a PFE analysis quietly assumes a strongly collateralized position, which means it ignores wrong-way risk, uncertainty in the collateral's own value, and liquidity or liquidation risk. Those three specific omissions are the answer when a question asks what PFE misses.",
      related: [{ r: 37, label: "R37: wrong-way risk in full" }]
    },
    {
      name: "Funding exposure versus credit exposure",
      def: "Credit exposure asks what you lose if the counterparty defaults. Funding exposure asks what it costs to finance margin you have posted, or what you save by holding margin you received. Positive credit exposure carries a funding cost, negative credit exposure a funding benefit. The two diverge on five points: defining value, whether default is assumed, aggregation, wrong-way risk, and segregation.",
      intuition: "Credit exposure only ever crystallizes at a default, so it is netted counterparty by counterparty. Funding exposure exists every ordinary day, so it can be pooled across the whole book wherever margin can be reused.",
      example: "A funding delay does not require anybody to default, which is why a funding value adjustment can be zero while the credit value adjustment on the same trade is not.",
      pitfall: "Wrong-way risk has no funding counterpart. It is purely a credit-exposure idea, and importing it into funding analysis is a category error."
    },
    {
      name: "Collateral, segregation, and rehypothecation",
      def: "Whether a given piece of collateral helps counterparty risk, funding, or both comes down to two switches. Can the receiver reuse it (rehypothecation), and is it walled off from the receiver (segregation)? To get both benefits at once, the collateral must be reusable and must not carry wrong-way risk. Fail the first test and you keep only the counterparty-risk benefit; fail the second and you keep only the funding benefit.",
      example: "Unsegregated cash gives you both. Segregated collateral that cannot be reused protects you at default but finances nothing. The counterparty's own bonds, rehypothecated, finance a great deal and protect you at default not at all.",
      pitfall: "That last case is the trap worth remembering. Holding a counterparty's own debt against exposure to that same counterparty gives you collateral that becomes worthless at the precise moment you would go to seize it. It is wrong-way risk built into the collateral choice itself.",
      related: [{ r: 34, label: "R34: the CSA terms that grant these rights" }],
      memory: "Reusable and unsegregated helps both. Segregated and locked helps counterparty risk only. Their own bonds help funding only, and fail you exactly when you need them."
    }
  ],

  connections: {
    from: [
      { r: 32, why: "The uncertainty in counterparty exposure described qualitatively there gets a full quantitative vocabulary here." },
      { r: 33, why: "Netting concepts here get their precise quantitative formula (the netting factor)." },
      { r: 34, why: "CSA parameters (threshold, minimum transfer amount, initial margin) become quantitative inputs to exposure calculations." }
    ],
    to: [
      { r: 37, why: "Every exposure metric here is the direct input set to the CVA formula." }
    ],
    confused: [
      { what: "Expected MtM vs expected exposure (EE)", how: "Expected MtM is a raw average and can be negative. EE keeps only the positive part of the distribution, so it is never negative and is always at least as large as expected MtM." },
      { what: "EE vs PFE", how: "EE is a central-tendency measure, the average of the positive part at a given date. PFE is a tail measure, the high-confidence worst case at that same date. Same date, different question." },
      { what: "PFE vs EPE", how: "The look-alike pair. PFE is potential FUTURE exposure, a tail at one date. EPE is expected POSITIVE exposure, the time-average of EE across the whole trade. Say the distinguishing word out loud and the confusion goes away." },
      { what: "PFE vs maximum PFE", how: "PFE is a curve with one value per future date. Maximum PFE is the single highest point on that curve." },
      { what: "Swaption exposure before vs after the exercise date", how: "Before: the swaption carries more exposure, because the right to walk away from a bad outcome has value. After: the forward swap carries more, because there are scenarios where it still has positive value while the swaption was simply left unexercised and so has none." },
      { what: "Credit exposure vs funding exposure", how: "Credit exposure assumes the counterparty defaults during the MPoR and is netted per counterparty. Funding exposure needs no default at all and can be pooled across the portfolio wherever margin is reusable." }
    ]
  },

  misconceptions: [
    { wrong: "\"Expected exposure (EE) can be negative, just like expected mark-to-market.\"", right: "EE counts only the scenarios where the trade has positive value and the counterparty could default on you. It is non-negative by construction, unlike expected mark-to-market, which averages both directions and can come out below zero." },
    { wrong: "\"Receiving payments less frequently than you make them reduces counterparty exposure.\"", right: "It is the other way round. Receiving more often than you pay reduces exposure, because cash arrives faster than it goes out and less is left outstanding at any moment. Paying more often than you receive raises exposure." },
    { wrong: "\"A PFE analysis already models the worst case, so wrong-way risk is covered.\"", right: "PFE quietly assumes a strongly collateralized position and leaves out wrong-way risk, uncertainty in the collateral's own value, and liquidity or liquidation risk. Those three specific omissions are the answer to a question about PFE's limits, not a vague \"it is only an estimate\"." },
    { wrong: "\"Zero correlation \\((\\rho=0)\\) gives the maximum netting benefit.\"", right: "Perfect negative correlation does. The netting factor keeps falling as \\(\\rho\\) drops below zero, all the way to a floor of \\(\\rho=-1/(n-1)\\), because trades that reliably offset leave nothing to net." },
    { wrong: "\"Noncash collateral reduces the volatility of my position, since I now hold something against the exposure.\"", right: "It reduces your average exposure and increases the volatility of the collateralized position, because the collateral has a price of its own. Uncorrelated 8% collateral against a 5% exposure leaves overall volatility of 9.43%, higher than either input alone." },
    { wrong: "\"Taking a counterparty's own bonds as collateral protects me just like cash would.\"", right: "Those bonds are worth very little at the exact moment you would need to seize them, which is the counterparty's default. Rehypothecated, they can still help your funding costs, but as counterparty-risk protection they are close to useless." }
  ],

  highYield: [
    { stars: 5, what: "The exposure profile shapes by product: flat, hump, rising, rise-then-jump.", why: "These come up as a picture to name and as a name to picture, so recognition has to work in both directions." },
    { stars: 4, what: "EE, PFE, EPE and ENE definitions, especially EE's positive-part-only filter and the PFE-versus-EPE distinction.", why: "This is the vocabulary R37's CVA formula assumes you already have. Confuse two members and the CVA arithmetic breaks silently." },
    { stars: 4, what: "The netting factor formula and its two limits: \\(\\rho=1\\) gives no benefit, \\(\\rho\\to-1/(n-1)\\) gives the most.", why: "A short formula with clean boundary behaviour, which makes it easy to build a question around." },
    { stars: 3, what: "What a PFE analysis leaves out: wrong-way risk, collateral-value uncertainty, liquidity and liquidation risk.", why: "A named list of omissions is far more testable than a general caveat, and the specific three are what earns the mark." },
    { stars: 3, what: "Swaption versus forward swap exposure, before and after the exercise date.", why: "The ranking reverses at the exercise date, and a reversal is exactly the kind of detail that separates a careful reader from a quick one." },
    { stars: 3, what: "The five MPoR steps and the collateral parameters that leave exposure uncovered.", why: "Both are short closed lists with a natural order, which makes them cheap to memorize and easy to ask about." },
    { stars: 2, what: "Segregation and rehypothecation scenarios, and which benefit each one delivers.", why: "A four-row table of this shape lends itself to a matching or which-is-true question." }
  ],

  recall: [
    { q: "Why does an interest rate swap's exposure profile peak in the middle of its life rather than rising the whole way like a cross-currency swap's?", a: "Two forces pull against each other. Growing uncertainty about future rate paths pushes exposure up the further out you look, while every payment that settles removes a cash flow from the remaining trade and pulls exposure down. Early on the first force dominates, later the second does, and the peak sits where they cross. A cross-currency swap has a large notional exchange waiting at maturity, and no amount of elapsed time makes that final number more certain, so it climbs instead of turning over." },
    { q: "A netting agreement covers 4 trades with pairwise correlation 0. What is the netting factor, and what does it mean?", a: "\\(\\sqrt{(1+(4-1)\\times 0)/4} = \\sqrt{1/4} = 50\\%\\). Netted exposure carries about half the risk of the unnetted position, which is the diversification benefit of combining four uncorrelated exposures under one agreement." },
    { q: "What does a PFE analysis silently leave out?", a: "Wrong-way risk, uncertainty in the value of the collateral itself, and liquidity or liquidation risk. It assumes a strongly collateralized position, which is also why it breaks down under a large threshold or minimum transfer amount that leaves the position only partly collateralized." },
    { q: "Why does a swaption carry more exposure than an equivalent forward swap before the exercise date, and less after?", a: "Before exercise the swaption holder still has the right to walk away from an unfavourable swap, and that right has positive value in the bad states, so the swaption is worth more and exposes more than a forward swap that is committed regardless. After the exercise date that difference is resolved, and the forward swap carries the greater exposure because there are scenarios in which it still has positive value while the swaption was simply never exercised." },
    { q: "Name the four factors that shape a credit exposure profile, with an instrument for each.", a: "Future uncertainty, as in a foreign exchange forward or a forward rate agreement whose single final payout accumulates doubt to maturity. Periodic cash flows, as in a coupon bond or a swap leg where regular settlement caps the accumulation, unless the amounts are themselves variable. Combination of profiles, as in a cross-currency swap whose exposure is an interest-rate hump plus a foreign exchange ramp. Optionality, as in a swap-settled interest rate swaption, where the unmade exercise decision carries value until it is made." },
    { q: "Uncorrelated noncash collateral has 8% volatility and the underlying exposure has 5%. What is the overall volatility, and why is it larger than either?", a: "\\(\\sqrt{0.08^{2}+0.05^{2}} = \\sqrt{0.0089} \\approx 9.43\\%\\). Two prices are now moving instead of one, and with no correlation between them neither can offset the other, so the uncertainties add in quadrature. The collateral still lowers average exposure; what it raises is the day-to-day volatility of the collateralized position." },
    { q: "Why does taking a counterparty's own bonds as rehypothecated collateral help funding but not counterparty risk?", a: "It helps funding because the receiver can reuse the bonds to finance other obligations, which is a real cash saving in normal times. It fails as counterparty-risk protection because the moment you would need to seize the collateral is the counterparty's default, and at that moment their own bonds are in default too and worth a fraction of what you booked." }
  ],

  hooks: [
    { title: "Four silhouettes", text: "A flat line for bonds. A hump for swaps, where diffusion fights roll-off. A ramp for foreign exchange and options. A ramp that falls off a cliff at the end for credit default swaps. Learn the shapes, not just the names, because the shape is what a graph question actually shows you." },
    { title: "EE has already been through security", text: "Expected mark-to-market is the raw average and can go negative. Expected exposure has already been filtered: only the days you are owed money get through." },
    { title: "Say the middle word", text: "Potential FUTURE exposure is a tail at one date. Expected POSITIVE exposure is a time-average across the whole trade. The look-alike pair stops looking alike the moment you say the distinguishing word out loud." },
    { title: "Negative correlation is the jackpot, not zero", text: "The netting factor keeps improving past \\(\\rho=0\\). Trades that reliably offset each other are the real best case, and the only thing stopping you going further is the mathematical floor at \\(-1/(n-1)\\)." },
    { title: "Collateral that fails you exactly when you need it", text: "Taking a counterparty's own bonds against exposure to that counterparty is wrong-way risk you agreed to in the paperwork. It is worthless the moment you would go to cash it in." }
  ],

  eli5: `<p>You and a friend have a running bet on a fantasy football season, re-scored every week. Some weeks you are up, some weeks your friend is. If your friend went bankrupt in a week when you were UP, you would lose whatever they owed you at that moment. If THEY were up, their bankruptcy would cost you nothing, because you would still owe them and bankruptcy does not erase your debt to them. That asymmetry is the whole idea: only the weeks you are ahead can hurt you.</p>
  <p>Now ask three different questions about that running bet. "Across the weeks I might be ahead, how much would I typically lose if they went bust?" is <strong>expected exposure</strong>, the average over only the good-for-you weeks. "What is the worst single week this could ever get, at a level I am 99% confident about?" is <strong>potential future exposure</strong>. "Averaged over the whole season, how exposed am I?" is <strong>expected positive exposure</strong>. A derivatives desk asks exactly those three questions about every trade with every counterparty, every day, because unlike a loan, where you know roughly what you are owed, a derivative's value flips between an asset and a liability as the market moves.</p>`,

  thinkLike: `<p>A counterparty risk manager is not asking what the trade is worth today. That is the trading desk's question. The risk manager asks what happens if this counterparty vanishes tomorrow, or in six months, or in five years, and how that number evolves as the trade ages. That reframing is why exposure needs its own toolkit instead of borrowing VaR wholesale. A one-day or two-day VaR horizon lets you ignore drift, long-run volatility buildup and contractual quirks like exercise dates and payment resets. Exposure cannot ignore any of them, because the horizon is the whole remaining life of the trade, and because the answer does not just go into a risk report: it goes into the price, as the CVA charge in R37.</p>
  <p>That also changes how you should read a new product. Look at its cash flows before you look for a formula. A trade that pays once at maturity never settles anything along the way, so its exposure just keeps climbing; one that settles on a regular schedule is repeatedly reset back toward zero, which caps it. A second risk factor lays a second shape over the first. An exercise decision nobody has made yet leaves that option's value sitting inside the exposure until somebody makes it. Read those features off the contract and most exposure-profile questions answer themselves without any arithmetic. When arithmetic does turn up it is usually the netting factor, where the real work is remembering its two limits, or the margin period of risk scaling, which is nothing more exotic than volatility grown by the square root of time and pushed out to a confidence level by a z-score.</p>`,

  breakdown: [
    {
      title: "Exposure metric family",
      points: [
        { point: "Expected mark-to-market: the plain average value of the trade at a future date.", explain: "This is the only member of the family that can be negative, because it averages the whole distribution, the dates you are owed money and the dates you owe it. Every other metric below is built by throwing part of that distribution away." },
        { point: "Expected exposure (EE): the average of only the outcomes where the trade is in your favour.", explain: "The dates you are out of the money cost you nothing if the counterparty fails, because your debt to them survives their bankruptcy. So those outcomes are set to zero rather than counted as negatives. Discarding the negative half and keeping the positive half is why EE can never fall below zero, and why it always sits at or above expected mark-to-market." },
        { point: "Potential future exposure (PFE): the bad case at one specific future date, quoted at a confidence level.", explain: "Same date, same distribution as EE, different question. EE asks what you would lose on average; PFE asks how bad that one date gets when things go against you, typically at 95% or 99%. It is the tail where EE is the mean." },
        { point: "Maximum PFE: the single highest point on the PFE curve across the whole life of the trade.", explain: "PFE gives a value per date, so plotting it makes a curve. Maximum PFE is just its peak, which answers what the worst this trade could ever get is, at any date, rather than at a date you picked." },
        { point: "Expected positive exposure (EPE): the average of EE across time.", explain: "EE is one number per future date; EPE collapses that whole curve into one number for the trade. That is what makes it the input regulators and pricing desks want, because you cannot put a curve into a capital charge." },
        { point: "Expected negative exposure (ENE): EPE seen from the other side of the trade.", explain: "Built from the outcomes where the trade is against you, which are exactly the outcomes where your counterparty is exposed to YOU. Your ENE is their EPE, so the same trade generates a counterparty risk charge at both firms." },
        { point: "Effective EE: EE re-drawn so it is never allowed to fall.", explain: "Take the EE curve and, at each date, carry forward the highest level reached so far rather than letting it decline. The reason is rollover. A trade maturing in three months has an EE that falls to zero by month three, so averaging it across a year makes it look nearly riskless, when in reality the desk replaces it with a fresh three-month trade and keeps the exposure alive. Freezing the curve at its running peak stops a short trade looking safe just because it matures inside the year." },
        { point: "Effective EPE: the average of effective EE.", explain: "The same time-average that turns EE into EPE, applied to the flattened-out curve instead of the declining one. Because effective EE never falls, effective EPE is always at least as large as ordinary EPE, which is the entire point: it is the version that does not understate short-dated, rolled exposure." }
      ]
    },
    {
      title: "Credit exposure compared to VaR",
      points: [
        "Application: exposure is defined for pricing and for risk management, VaR only for risk management, so exposure may need two different calculations of the same position.",
        "Time horizon: VaR runs over days, exposure over years, which is why drift, underlying volatility and co-dependence matter for exposure and are irrelevant to VaR.",
        "Path dependency: exposure must account for future contractual events, exercise decisions, cash flows and cancellations, because future exposure depends on what happened earlier. VaR ignores them.",
        "Risk mitigants: netting rules add complexity, and future collateral adds real subjectivity, since its type and the time to receive it have to be assumed."
      ]
    },
    {
      title: "Factors shaping a credit exposure profile",
      points: [
        "Future uncertainty: contracts paying once at maturity, such as foreign exchange forwards and forward rate agreements, accumulate uncertainty about that single final value all the way to the end.",
        "Periodic cash flows: regular payments such as bond coupons or swap legs settle part of the position and cap the accumulation, unless the amounts are themselves variable, as on a floating leg.",
        "Combination of profiles: a product built from more than one risk factor inherits both shapes. A cross-currency swap is an interest rate swap plus a foreign exchange forward.",
        "Optionality: an exercise decision, as in a swap-settled interest rate swaption, adds exposure because the unmade choice carries value."
      ]
    },
    {
      title: "Exposure profile shapes by product",
      points: [
        "Bonds, loans and repos: roughly flat at notional. A fixed-coupon bond picks up a little extra from interest-rate risk when rates fall; a floating-rate loan can decline over time through prepayments.",
        "Interest rate swaps: a peak in the middle, from future payment uncertainty balanced against roll-off risk as payments settle.",
        "Foreign exchange and cross-currency swaps: monotonically increasing, driven by high FX volatility, long maturities and the large final notional payment.",
        "Long option positions: rising until exercise, because the option can always go further into the money. The exact shape shifts with moneyness but the direction does not.",
        "Long-protection credit default swaps: rising as the credit spread widens, then jumping at a credit event to notional less recovery. A 45% recovery rate leaves a 55% final exposure.",
        "Payment frequency: receiving more often than paying reduces exposure relative to equal frequencies; paying more often than receiving raises it.",
        "Exercise dates: a swap-settled swaption has more exposure than the matching forward swap before the exercise date and less after it."
      ]
    },
    {
      title: "Steps in the margin period of risk",
      points: [
        "Valuation and margin call: the time to compute current exposure and the market value of collateral, which is what establishes whether a call is valid.",
        "Receiving collateral: the gap between the counterparty receiving the request and actually releasing the collateral.",
        "Settlement: the time to turn the collateral into cash. Cash can move intraday, government bonds take about one day and corporate bonds about three, using Basel II minimums.",
        "Grace period: the window granted to the delivering counterparty before non-delivery is treated as a failure-to-pay credit event.",
        "Liquidation, close-out and re-hedge: the time to sell the collateral, close the position and put replacement hedges on."
      ]
    },
    {
      title: "Collateral parameters that create residual exposure",
      points: [
        "Margin period of risk: the delay itself is a window of elevated, uncollateralized exposure.",
        "Threshold: an exposure level below which no collateral is called at all, so that amount stays permanently uncovered.",
        "Minimum transfer amount: the smallest block collateral can move in, leaving anything smaller uncollateralized.",
        "Initial margin: posted independently of subsequent marks, and the one parameter on this list that reduces exposure rather than creating it.",
        "Rounding: call amounts get adjusted to an increment, leaving a small sliver uncovered depending on which way the rounding goes."
      ]
    },
    {
      title: "Differences between funding and credit exposure",
      points: [
        "Defining value: subjective for credit exposure, since it depends on close-out assumptions. Objective for funding exposure, since it is present in non-default situations too.",
        "Margin period of risk: it assumes counterparty default and belongs to credit exposure. A funding delay assumes no default, so a funding value adjustment can be zero while the credit value adjustment is not.",
        "Aggregation: credit exposure arises only at default, so it nets by counterparty. Funding exposure can be looked at across the whole portfolio, because margin from different counterparties can be reused.",
        "Wrong-way risk: a credit-exposure concept, and not a key consideration for funding.",
        "Segregation: it restricts the reuse of margin, and therefore hits credit and funding exposure differently."
      ]
    },
    {
      title: "Collateral segregation and rehypothecation scenarios",
      points: [
        "Cash that is not segregated: mitigates both counterparty risk and funding costs, because it is fully reusable.",
        "Securities that can be rehypothecated: mitigates both, provided the haircuts are large enough to cover the securities' own price risk.",
        "Cash or securities that must be segregated and cannot be rehypothecated: mitigates counterparty risk, but delivers no funding benefit, since it cannot be reused outside a default.",
        "Counterparty bonds that can be rehypothecated: helps funding costs, but is a poor counterparty-risk mitigant, because those bonds will themselves be in default when you need them."
      ]
    }
  ],

  quiz: [
    {
      q: "At a given future date, a trade's expected mark-to-market is −$2 million. Which statement about its expected exposure (EE) at that same date is correct?",
      options: [
        "EE is at least zero, and strictly positive if any scenario at that date leaves the counterparty owing the firm.",
        "EE is also −$2 million, because EE is the mean of the same value distribution.",
        "EE is exactly zero, because a negative expected mark-to-market means no scenario leaves the firm owed money.",
        "EE cannot be signed without knowing the counterparty's probability of default."
      ],
      answer: 0,
      why: "EE averages only the part of the distribution where the firm is owed money, so it is non-negative by construction and can never equal a negative expected mark-to-market. A negative mean does not empty the positive tail: a swap can average −$2 million and still have plenty of scenarios in which rates moved the firm's way, and each of those contributes to EE. Default probability scales an expected credit loss but plays no part in defining EE, which is an exposure measure conditional on default having happened."
    },
    {
      q: "Which product most likely shows a monotonically INCREASING potential future exposure profile rather than a flat or peaked one?",
      options: ["A cross-currency swap", "A fixed-rate bond", "A plain interest rate swap", "A repo"],
      answer: 0,
      why: "A cross-currency swap combines interest-rate risk with a large exchange of notional in a foreign currency at maturity, and the volatility of the FX rate applied to that final payment dominates, so exposure climbs the whole way. The plain interest rate swap is the trap: it is built from the same interest-rate uncertainty but exchanges no notional, so roll-off eventually overtakes diffusion and the profile peaks in the middle. Bonds and repos sit roughly flat at notional."
    },
    {
      q: "A netting agreement covers 3 trades with pairwise correlation of 0.3. What is the netting factor, to the nearest whole percent?",
      options: ["73%", "30%", "50%", "100%"],
      answer: 0,
      why: "Netting factor = \\(\\sqrt{(1+(n-1)\\rho)/n} = \\sqrt{(1+2\\times0.3)/3} = \\sqrt{1.6/3} = \\sqrt{0.533} \\approx 73\\%\\). The 30% answer just reports the correlation itself instead of running it through the formula. The 50% answer is the memorized result for four trades at zero correlation, applied to the wrong case. The 100% answer would require perfect positive correlation, where netting removes nothing."
    },
    {
      q: "A position has 10% annual volatility. Under a 5-day margin period of risk at 99% confidence (z = 2.33, 250 trading days per year), what is the approximate PFE as a percent of notional?",
      options: ["3.30%", "10.00%", "2.33%", "0.47%"],
      answer: 0,
      why: "PFE = \\(z \\times \\text{vol} \\times \\sqrt{\\text{MPoR}/250} = 2.33 \\times 0.10 \\times \\sqrt{5/250} = 2.33 \\times 0.10 \\times 0.1414 \\approx 3.30\\%\\). The 10.00% answer skips the time scaling and just restates annual volatility. The 2.33% answer drops the volatility term and reports the z-score. The 0.47% answer forgets the square root and uses 5/250 = 0.02 directly, which understates the move by a factor of seven."
    },
    {
      q: "A swap-settled interest rate swaption is compared with an equivalent forward swap. Which statement is correct?",
      options: [
        "The swaption has more exposure before the exercise date and less after it.",
        "The swaption has more exposure than the forward swap both before and after the exercise date.",
        "The forward swap has more exposure than the swaption both before and after the exercise date.",
        "Exposure is identical for both, since they reference the same underlying swap."
      ],
      answer: 0,
      why: "Before exercise, the swaption holder still has the right to walk away from an unfavourable swap, and that right carries positive value in the bad states, so the swaption exposes more than a forward swap that is committed regardless. After the exercise date the ranking reverses, because there are scenarios in which the forward swap still has positive value while the swaption was simply left unexercised and therefore carries no exposure at all. The always-higher answer is tempting precisely because it captures the first half and misses the reversal, which is the whole point of the comparison."
    },
    {
      q: "Which of the following is NOT captured by a standard potential future exposure analysis?",
      options: ["Wrong-way risk", "The notional amount of the trade", "The confidence level chosen for the tail estimate", "The maturity of the trade"],
      answer: 0,
      why: "A PFE calculation assumes a strongly collateralized position and does not model wrong-way risk, uncertainty in the collateral's own value, or liquidity and liquidation risk. Notional, confidence level and maturity are all direct inputs the calculation cannot run without, which is what makes them attractive wrong answers: the question rewards knowing which items are omissions rather than which items are merely present."
    },
    {
      q: "A dealer holds noncash collateral with 8% volatility against an exposure with 5% volatility, with no correlation between them. What happens to the position?",
      options: [
        "Average exposure falls, but the volatility of the collateralized position rises to about 9.43%.",
        "Both average exposure and the volatility of the position fall, to about 6.24%.",
        "Average exposure falls and volatility is unchanged at 5%, since the collateral offsets the trade.",
        "Average exposure rises, because posting volatile collateral increases the amount at risk."
      ],
      answer: 0,
      why: "The residual risk is the variance of the difference between the trade's value and the collateral's value, so with zero correlation the volatilities add in quadrature: \\(\\sqrt{0.08^{2}+0.05^{2}} = \\sqrt{0.0089} \\approx 9.43\\%\\), higher than either input on its own. Holding something valuable against the exposure does lower the average amount at risk, and at the same time a second moving price makes the net position bounce around more, which is exactly why the PFE calculation has to use the combined volatility rather than the trade's alone."
    }
  ],

  sources: [
    { title: "Basel Committee: The standardised approach for measuring counterparty credit risk exposures (BCBS 279)", url: "https://www.bis.org/publ/bcbs279.pdf", note: "The regulatory (SA-CCR) treatment of exposure and margin period of risk that this reading's framework underpins." }
  ],

  pdf: { book: 2, query: "we describe credit exposures for various security positions" },

  summary: `<p><strong>The exposure family.</strong> Expected mark-to-market is the raw average and can be negative. Everything else drops the scenarios where you owe them, so nothing else can be. Expected exposure (EE) is the average of what is left at one date; potential future exposure (PFE) is the tail at that same date; maximum PFE is the highest point on the PFE curve; expected positive exposure (EPE) is the time-average of EE; expected negative exposure (ENE) is the counterparty's mirror; effective EE and effective EPE force EE never to fall, capturing rollover risk under one year.</p>
  <p><strong>Against VaR.</strong> Exposure is used for pricing as well as risk, runs over years rather than days (so drift, volatility and co-dependence matter), is path-dependent through exercise and cash flows, and has to model netting and future collateral.</p>
  <p><strong>Four profile factors:</strong> future uncertainty, periodic cash flows, combination of profiles, optionality. <strong>Four silhouettes:</strong> bonds flat, swaps humped, foreign exchange and options rising, credit default swaps rising then jumping to notional less recovery. Receiving more often than you pay lowers exposure. A swaption exposes more than a forward swap before exercise and less after.</p>
  <p><strong>Netting factor</strong> = \\(\\sqrt{(1+(n-1)\\rho)/n}\\): 100% at \\(\\rho=1\\), best at \\(\\rho\\to-1/(n-1)\\). <strong>MPoR</strong> is call, then collateral release, then settlement, then grace, then liquidation and re-hedge; \\(PFE(MPoR)=z\\cdot vol\\cdot\\sqrt{MPoR/250}\\). PFE ignores wrong-way risk, collateral-value uncertainty and liquidity risk. Threshold, minimum transfer amount and rounding leave exposure uncovered; initial margin reduces it; collateral is path-dependent. <strong>Funding vs credit exposure</strong> differ on defining value, whether default is assumed, aggregation, wrong-way risk and segregation. <strong>Segregation and rehypothecation:</strong> unsegregated cash and rehypothecatable securities help both counterparty risk and funding; segregated collateral helps counterparty risk only; a counterparty's own rehypothecated bonds help funding only, and fail exactly at default.</p>`
});
