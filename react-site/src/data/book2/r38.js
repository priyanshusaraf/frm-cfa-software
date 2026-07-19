export default ({
  book: 2, reading: 38,
  session: "Counterparty Risk Management",
  title: "The Evolution of Stress Testing Counterparty Exposures",
  tagline: "What happens to R36's exposure metrics and R37's CVA when you shock the world — equity crashes, rate shocks, credit events.",

  teaches: `<p>Four CCR (counterparty credit risk) exposure measures (recap with stress framing); treating CCR as credit risk vs. market risk vs. both; the two named shortcomings of stress-testing current exposure; stressed expected loss for a loan portfolio vs. a derivatives portfolio; stressed CVA (unilateral) and stressed BCVA/DVA (bilateral, including expected negative exposure and the institution's own survival probability); and the four named pitfalls institutions make when stress testing CCR.</p>`,

  why: `<p>Shorter and more conceptual than R36/R37, but it reuses their vocabulary directly — this reading is "take everything R36 and R37 built and ask: what happens to each number when the world shocks?" Stress testing exposes a specific analytical gap: a static market shock says nothing about whether exposure and default probability move TOGETHER — the exact wrong-way risk blind spot R37 flagged. The exam rewards knowing the SPECIFIC named shortcomings and pitfalls here, not a generic "stress testing has limitations" answer.</p>`,

  intuition: `<p>Stressing "current exposure" alone (a snapshot today) has two structural shortcomings: aggregation across many counterparties ignores each one's credit quality (a $10M exposure to a AAA counterparty and a $10M exposure to a CCC counterparty get treated identically — summing them as if they were the same risk), and a static shock provides zero information about wrong-way risk — it can't tell you whether THIS shock scenario is exactly the one where your counterparty is also more likely to default. A market shock recomputes trade values; it says nothing about the counterparty's ability or willingness to pay.</p>
  <p>The reading then walks the SAME logic — "take a baseline number, apply a stress, take the difference" — across three different quantities in turn: expected loss (credit-risk lens), CVA (market-risk lens, unilateral), and BCVA/DVA (market-risk lens, bilateral — both sides can default). Each time, the mechanics of what gets shocked and why differ, but the shape of the exercise (baseline → stressed → stress loss = stressed − baseline) repeats. Recognizing that repeating shape is the fastest way to hold the whole reading in your head.</p>`,

  formulas: [
    {
      name: "Stressed expected loss (loan portfolio)",
      math: "\\text{EL} = \\sum_i \\text{PD}_i\\times \\text{EAD}_i\\times \\text{LGD}_i;\\quad \\text{EL}_{S} = \\sum_i \\text{PD}_{i,S}\\times \\text{EAD}_i\\times \\text{LGD}_i;\\quad \\text{stress loss} = \\text{EL}_{S} - \\text{EL}",
      note: "Only PD is shocked (subscript S = stressed); EAD and LGD are held at their baseline values in the loan-portfolio stress.",
      plain: "This says: expected loss on a loan book is the sum, across all counterparties, of default probability times the dollar amount owed at default times the fraction lost if default happens — and a stress test just re-runs that same sum after pushing PD up (e.g. because unemployment or an exchange rate is shocked), then reports the gap between the stressed and baseline totals as the stress loss.",
      derivation: `<p>Start from the ordinary expected-loss decomposition for counterparty \\(i\\):</p>
      \\[ \\text{EL}_i = \\text{PD}_i \\times \\text{EAD}_i \\times \\text{LGD}_i \\]
      <p>Sum across the portfolio for the baseline EL:</p>
      \\[ \\text{EL} = \\sum_i \\text{PD}_i\\times \\text{EAD}_i\\times \\text{LGD}_i \\]
      <p>PD is itself a function of macro/balance-sheet drivers such as the unemployment rate or an exchange rate. A stress scenario shocks those drivers, which pushes each \\(\\text{PD}_i\\) up to a stressed value \\(\\text{PD}_{i,S}\\), holding \\(\\text{EAD}_i\\) and \\(\\text{LGD}_i\\) fixed at baseline (a loan's committed balance and collateral terms don't move with the macro shock the way a derivative's mark-to-market does):</p>
      \\[ \\text{EL}_{S} = \\sum_i \\text{PD}_{i,S}\\times \\text{EAD}_i\\times \\text{LGD}_i \\]
      <p>The stress loss is simply the difference between the two totals: \\(\\text{stress loss} = \\text{EL}_{S} - \\text{EL}\\).</p>`
    },
    {
      name: "Stressed expected loss (derivatives portfolio)",
      math: "\\text{EL}_i = \\text{PD}_i \\times \\text{LGD}_i \\times \\alpha \\times \\text{EPE}_i;\\quad \\text{stress loss} = \\text{EL}_{S} - \\text{EL}",
      note: "EAD is replaced by \\(\\alpha \\times \\text{EPE}_i\\) since a derivative's exposure is stochastic and market-driven, not a fixed loan balance.",
      plain: "This says the same expected-loss formula applies to a derivatives book, but since there's no fixed \\'amount owed at default\\' the way there is for a loan, you substitute expected positive exposure (EPE, from R36) scaled up by an alpha factor that adjusts for portfolio effects, and you can stress this number either by shocking PD (as with loans) or by shocking the market variables (swap rates, equity prices) that drive EPE itself."
    },
    {
      name: "Stressed CVA and stress loss on CVA",
      math: "\\text{CVA} = -(1-\\text{RR})\\sum_i \\text{EE}(t_i)\\times q_i \\times \\text{DF}(t_i);\\quad \\text{stress loss} = \\text{CVA}_{S} - \\text{CVA}",
      note: "This is R37's base (unilateral) CVA formula. Stressing it means instantaneously shocking the market variables that drive EE(t) and the risk-neutral marginal default probability q, then re-summing.",
      plain: "This says CVA (the market price of counterparty credit risk on a derivatives book) is a discounted sum of expected exposure times default probability across future dates, and a stress test shocks the underlying market variables — credit spreads, rates, FX, derivative values — that feed EE(t) and q, then reports the difference between the shocked and unshocked totals as the CVA stress loss."
    },
    {
      name: "Stressed BCVA / DVA",
      math: "\\text{BCVA} = -(1-\\text{RR}_C)\\sum_i \\text{EE}(t_i)\\, q_{C,i}\\, S_{I}(t_i)\\, \\text{DF}(t_i) \\;+\\; (1-\\text{RR}_I)\\sum_i \\text{ENE}(t_i)\\, q_{I,i}\\, S_{C}(t_i)\\, \\text{DF}(t_i)",
      note: "First term = CVA-side loss if the counterparty (C) defaults first, weighted by the institution's (I) own survival probability \\(S_I\\). Second term = DVA — the institution's OWN option to default, weighted by expected negative exposure (ENE) and the counterparty's survival probability \\(S_C\\).",
      plain: "This says the two-sided (bilateral) version of CVA adds a mirror-image term: alongside the usual expected-exposure-times-default-probability loss if the counterparty defaults, it subtracts a gain the institution would realize if IT defaults first (which only matters in scenarios where the counterparty is still solvent to be owed money) — and stressing BCVA means shocking both the counterparty's and the institution's own credit spreads (which drive q and S) plus market variables (which drive EE and ENE), then comparing stressed BCVA to baseline BCVA."
    }
  ],

  concepts: [
    {
      name: "Four CCR exposure measures (recap with stress framing)",
      def: "Current exposure (replacement cost): the greater of zero or the market value of a transaction (or portfolio) that would be lost if the counterparty defaulted TODAY and nothing was recovered in bankruptcy. Peak exposure: a high percentile (95%/99%) of the exposure distribution at a given FUTURE date, generated across many future dates up to the maturity of the longest transaction in the netting group. Expected exposure: the MEAN of that same future-date distribution. Expected positive exposure (EPE): the time-weighted average of expected exposures — weighted by the proportion of the total time interval each date represents — measured over the first year or the life of the longest contract for regulatory capital purposes.",
      intuition: "Current exposure is a photograph of today; peak and expected exposure are photographs of one specific future date (a tail percentile vs. an average); EPE is a single number that blends the whole future filmstrip of expected-exposure photographs into one time-weighted figure.",
      example: "A 5-year interest rate swap with zero current market value has zero current exposure today, but its expected exposure typically rises over the first couple of years (as rate paths diverge) before declining toward maturity (as remaining cash flows shrink) — the classic 'hump' shape referenced in R37.",
      related: [{ r: 36, label: "R36 — these same metrics without the stress framing" }]
    },
    {
      name: "CCR as credit risk, market risk, or both",
      def: "Treat CCR as credit risk: manage it mainly at trade inception and via collateral, focus on credit evaluation and mitigation, but stay exposed to swings in CVA if CVA isn't marked and monitored — a derivatives portfolio valued without CVA can swing wildly in market value when counterparty credit deteriorates. Treat CCR as market risk: price CCR into CVA, hedge market-risk components of CVA, and can even actively reduce exposure to a deteriorating counterparty by replacing (novating) trades proportional to that counterparty's rising probability of default — but this lens alone still leaves the institution exposed to an outright default event.",
      example: "Replacing trades proportional to PD: a counterparty with a low, stable PD has only a small slice of its trades periodically replaced/moved to other counterparties; a counterparty whose credit is visibly deteriorating has a much larger share of its trades replaced faster, shrinking the institution's remaining exposure to it before default actually happens.",
      pitfall: "Treating it as BOTH is the prudent (if operationally harder) approach — neither lens alone captures the full risk. Classifying CCR as both credit and market risk also multiplies the NUMBER of stress results an institution must produce: at least twice the number of counterparties plus one (per-counterparty stresses under each lens, plus the aggregate portfolio), and at least double again if instantaneous shocks are considered alongside stressed risk measures.",
      related: []
    },
    {
      name: "Stress testing current exposure — mechanics and two shortcomings",
      def: "Stress testing current exposure is the MOST COMMON stress test performed on counterparty risk. Institutions reprice each counterparty's portfolio under a scenario of risk-factor changes (e.g., a 25% equity market decline, a credit event, an interest-rate shock), then rank counterparties by their stressed current exposure and report the largest ones — along with credit ratings, mark-to-market values, and collateral values — to senior management. Different stress scenarios typically surface different counterparties as the most vulnerable. But this approach suffers TWO named shortcomings: (1) aggregating results across counterparties is not meaningful — simply summing stressed exposures assumes every counterparty defaults simultaneously (an unlikely joint event) and ignores each counterparty's credit quality entirely, treating a stressed exposure to a AAA name identically to the same dollar exposure to a CCC name; (2) it provides NO information about wrong-way risk — because credit quality was already stripped out of the exercise, the stress result cannot say anything about whether exposure and the counterparty's probability of default move together in that same scenario.",
      pitfall: "These are the SPECIFIC, named shortcomings — a generic 'it's just a snapshot' answer misses the tested content. Be ready to state both by name: (1) aggregation ignoring credit quality, (2) no wrong-way risk information.",
      related: [{ r: 37, label: "R37 — wrong-way risk, the exact blind spot named here" }],
      memory: "Static shocks are blind to credit quality AND blind to whether exposure and default move together (WWR)."
    },
    {
      name: "Stressed expected loss",
      def: "Loan portfolio: EL_i = PD_i×EAD_i×LGD_i, summed across the portfolio; stress by shocking PD (which itself is driven by macro/balance-sheet variables like the unemployment rate or an exchange rate) to get EL_stressed, and the stress loss is EL_stressed − EL. Derivatives portfolio: EL_i is a function of PD_i, LGD_i, and expected positive exposure EPE_i multiplied by an alpha factor (α) that scales EPE up to account for portfolio effects — because a derivative's 'exposure at default' is stochastic and market-driven rather than a fixed committed balance the way a loan's EAD is.",
      example: "For the derivatives case, stresses can be applied either to PD (same lever as loans) or directly to the market variables that drive EPE — swap rates, equity prices. Because a firm's derivatives book has a directional bias (it may be net long or short particular rate/FX exposures) and different counterparties are margined differently, the SAME market shock can push EL up for some counterparties and down for others — unlike a loan portfolio, where stresses tend to move all counterparties' EL in the same direction because loan exposures aren't sensitive to market variables at all.",
      pitfall: "Because loans are not sensitive to market variables, an institution running EPE stresses on its derivatives book does NOT need to separately aggregate those stresses with its loan portfolio's PD-driven stress results — the two stress channels are independent by construction.",
      related: [{ r: 20, label: "R20 — the original EL formula this stresses" }],
      memory: "Loan stress: shock PD directly, all counterparties move together. Derivatives stress: shock via EPE (scaled by alpha), counterparties can move in different directions depending on portfolio direction and margining."
    },
    {
      name: "Stress testing CVA (unilateral) and BCVA/DVA (bilateral)",
      def: "Financial institutions typically only stress-test UNILATERAL CVA — the possibility that the counterparty defaults to the institution — by shocking market variables (credit spreads, market spreads, derivatives values) that feed into discounted expected exposure and the risk-neutral marginal default probability, then comparing the resulting stressed CVA to baseline CVA. But institutions should ALSO consider that they themselves could default to their counterparty — captured by the BILATERAL CVA (BCVA), which adds the debt value adjustment (DVA): the value of the institution's own option to default. The BCVA formula differs from unilateral CVA in two ways: (1) it uses expected NEGATIVE exposure (ENE, from the counterparty's perspective — the mirror image of EE) for the DVA term, and (2) because the institution can only benefit from its own default if the counterparty is still alive to be owed money, BCVA must weight the DVA term by the counterparty's SURVIVAL probability, and symmetrically weight the CVA term by the institution's OWN survival probability.",
      example: "The institution's survival probability is derived from ITS OWN credit spreads (typically via CDS spreads). This produces a genuinely counterintuitive result: if the institution's own credit quality IMPROVES, its survival probability rises, DVA (the value of its default option) falls, and — holding everything else fixed — this can show up as a LOSS in the stress P&L, purely because the institution became less likely to walk away from its obligations.",
      pitfall: "The benefit of moving to BCVA is that it lets CCR be treated fully as a market risk — gains/losses from stressing BCVA can be added directly into the institution's broader market-risk stress-testing framework, something unilateral CVA alone doesn't cleanly support.",
      related: [{ r: 37, label: "R37 — the full BCVA/DVA machinery this reading stresses" }, { r: 29, label: "R29 — CVA/DVA's first appearance" }],
      memory: "Unilateral CVA = only they can default to us. BCVA/DVA = both sides can default; DVA needs ENE and the counterparty's survival probability, CVA needs the institution's own survival probability."
    },
    {
      name: "Four named pitfalls in stress testing CCR",
      def: "(1) Stress testing CCR is still a relatively new discipline, and institutions typically FAIL to aggregate CCR stress results with their loan portfolio or trading position stress tests, understating total stressed loss. (2) When institutions DO try to combine CCR losses with loan or trading-position stresses, they typically (and mistakenly) use CURRENT exposure rather than expected exposure or expected positive exposure — current exposure is a poor proxy for the loss that would actually materialize over the relevant horizon. (3) Using current exposure is especially error-prone for AT-THE-MONEY derivatives, where a small market move can flip the trade from an asset to a liability (or vice versa), so current exposure is highly unstable exactly where precision matters most. (4) Calculating changes in exposure using DELTA sensitivities is unreliable for CCR because delta itself is nonlinear over large moves — LINEARIZING a nonlinear sensitivity to approximate a large stress shock can produce significant errors.",
      pitfall: "This is the most literal 'list' item in the reading — the exam can ask you to identify which of these four is being described in a scenario, so know all four by their distinguishing feature (new/unaggregated discipline; wrong exposure measure used; at-the-money instability; delta linearization error) rather than a vague 'stress testing has flaws.'",
      related: [],
      memory: "Not aggregated · wrong exposure measure (current, not EE/EPE) · at-the-money current-exposure instability · delta linearization error."
    }
  ],

  connections: {
    from: [
      { r: 36, why: "Reuses the exposure vocabulary (current/peak/expected exposure, EPE) with a stress-testing lens." },
      { r: 37, why: "Extends CVA's wrong-way risk concern, and the full BCVA/DVA formula, into the stress-testing context specifically." },
      { r: 20, why: "The underlying EL = PD×EAD×LGD decomposition that the loan-portfolio stress test shocks." }
    ],
    to: [
      { r: 55, why: "Bank-wide stress testing (Book 3) generalizes this counterparty-specific stress framework." }
    ],
    confused: [
      { what: "Current exposure vs peak exposure", how: "Current exposure is TODAY's replacement cost (zero recovery assumed); peak exposure is a high-percentile FUTURE exposure at some later date — a tail measure, not a snapshot." },
      { what: "Unilateral CVA stress vs. BCVA/DVA stress", how: "Unilateral CVA stress only asks 'what if the counterparty defaults' and shocks EE and the counterparty's own default probability. BCVA/DVA stress adds a second, mirror-image term for 'what if WE default' — which requires ENE (not EE) and the counterparty's survival probability, plus the institution's own survival probability in the CVA term." },
      { what: "Stressing EL for loans vs. for derivatives", how: "Loan EL stress shocks only PD (EAD/LGD held fixed) and moves all counterparties in the same direction since loans aren't market-sensitive. Derivatives EL stress can shock PD OR the market variables driving EPE, and can push different counterparties' EL in different directions depending on portfolio positioning and margining." }
    ]
  },

  misconceptions: [
    { wrong: "\"Stressing current exposure captures wrong-way risk since it's a worst-case scenario.\"", right: "A static market shock provides NO information about whether exposure and default probability move TOGETHER — that's precisely what wrong-way risk requires, and stressed current exposure structurally cannot capture it because credit quality was never in the calculation to begin with." },
    { wrong: "\"Treating CCR purely as market risk (hedging market moves) fully manages the risk.\"", right: "Market-risk hedging leaves the bank exposed to counterparty default/creditworthiness decline — a credit-risk dimension that pure market-risk hedging doesn't address. Prudent practice treats CCR as BOTH." },
    { wrong: "\"BCVA is just CVA but using EPE instead of EE.\"", right: "BCVA differs from unilateral CVA by adding a DVA term that uses expected NEGATIVE exposure (ENE, not EPE) from the counterparty's perspective, and by weighting each term with the relevant party's SURVIVAL probability — it is not a simple exposure-measure swap." },
    { wrong: "\"When institutions combine CCR stress losses with loan/trading stress losses, they correctly use expected exposure.\"", right: "The reading names this as a specific pitfall: institutions typically (and incorrectly) use CURRENT exposure for this purpose, when expected exposure or expected positive exposure would be the more accurate measure of the loss likely to actually occur." },
    { wrong: "\"An improvement in a bank's own credit quality can only ever reduce its stressed losses.\"", right: "Because DVA depends on the institution's own survival probability, an improvement in the institution's own credit spread can actually show up as a LOSS in a BCVA stress test — a genuinely counterintuitive result the reading calls out explicitly." }
  ],

  highYield: [
    { stars: 3, what: "The two named shortcomings of stressing current exposure (aggregation ignoring credit quality; no WWR information).", why: "A precise, specific pair of shortcomings — the tested answer, not a generic critique." },
    { stars: 3, what: "The four named pitfalls of stress testing CCR (not aggregated with other books; wrong exposure measure used; at-the-money instability; delta linearization error).", why: "A commonly tested enumerable list — expect a scenario question asking which pitfall is being illustrated." },
    { stars: 2, what: "Stressed EL for loan portfolios (shock PD) vs. derivatives portfolios (shock via EPE with alpha factor).", why: "A clean two-case distinction, occasionally tested for which shock mechanism applies to which portfolio type." },
    { stars: 2, what: "BCVA/DVA stress adds ENE and survival probabilities on top of unilateral CVA's EE and default probability.", why: "Tests whether you can distinguish unilateral from bilateral mechanics precisely, not just by name." }
  ],

  recall: [
    { q: "Why doesn't stressing current exposure to a severe market shock tell you anything about wrong-way risk?", a: "A static market shock only recomputes exposure under a hypothetical market state — it says nothing about whether the COUNTERPARTY'S default probability also rises in that same scenario. Wrong-way risk specifically requires modeling the joint relationship between exposure and default probability, which a one-off exposure recalculation cannot capture." },
    { q: "How does stress testing expected loss differ between a loan portfolio and a derivatives portfolio?", a: "For a loan portfolio, you directly shock PD in the EL=PD×EAD×LGD formula and compare to baseline EL, holding EAD and LGD fixed; all counterparties tend to move in the same direction. For a derivatives portfolio, EAD isn't fixed — you instead use EPE (which itself depends on the stressed market scenario) scaled by an alpha factor that accounts for portfolio-level effects, and different counterparties can move in different directions depending on the book's directional bias and each counterparty's margining." },
    { q: "What two changes does the BCVA formula make relative to the unilateral CVA formula, and why is each one necessary?", a: "First, it adds a DVA term using expected NEGATIVE exposure (ENE, from the counterparty's perspective) because the institution can also default and owe the counterparty nothing further. Second, each term must be weighted by the relevant counterparty's SURVIVAL probability — the institution can only realize the DVA benefit if the counterparty is still alive to have been owed money, and the counterparty can only realize the CVA loss if the institution is still alive to have owed it money." },
    { q: "Name the four pitfalls of stress testing CCR listed in this reading.", a: "(1) CCR stress results are typically not aggregated with loan portfolio or trading position stress tests. (2) When they are combined, institutions typically use current exposure rather than the more accurate expected exposure/EPE. (3) Current exposure is especially unreliable for at-the-money derivatives. (4) Delta-sensitivity linearization, used to approximate exposure changes, breaks down because delta is nonlinear over large stress moves." }
  ],

  hooks: [
    { title: "A snapshot can't see the future correlation", text: "Stressing current exposure is like photographing a stormy sky — it shows you the storm, but not whether your ship's captain (the counterparty) is more likely to abandon post in exactly this kind of storm. That's the WWR blind spot." },
    { title: "BCVA is a two-way mirror", text: "Unilateral CVA only asks 'what if they die owing me.' BCVA adds the mirror question — 'what if I die owing them' — and that mirror image needs its own exposure measure (ENE, not EE) and its own survival-probability weighting, because you only collect on either side of the mirror if the other party is still standing." }
  ],

  eli5: `<p>Imagine you run a small lending club with ten friends, and you want to know how much trouble you'd be in if the stock market crashed 25% tomorrow. Just adding up "what everyone would owe me in that scenario" is misleading in two ways: it pretends all ten friends default at once (unlikely), and it treats your reliable friend with a steady job exactly the same as your friend who's already behind on rent — the raw dollar number hides who's actually likely to pay you back. On top of that, the crash scenario itself doesn't tell you whether your shakiest friend's situation gets WORSE specifically because of a stock crash (maybe their job depends on the stock market) — that hidden link between "the bad thing happening" and "the person owing you getting less likely to pay" is wrong-way risk, and a single "what-if" snapshot can't see it. In finance terms: current-exposure stress testing recomputes trade values under a shock but structurally can't capture whether exposure and counterparty default probability move together.</p>`,

  thinkLike: `<p>A counterparty-risk manager treats a stress test result as a starting point for a conversation, not a final number. The first question after seeing "counterparty X has the largest stressed current exposure under the equity-crash scenario" is never "how big is that number" — it's "how good is X's credit, and would X's credit have gotten WORSE in exactly this scenario?" Since the stress test itself can't answer that second question, the practitioner has to bring outside judgment: sector concentration, correlation between the shocked risk factor and the counterparty's business, and whether the counterparty is the kind of name (a monoline insurer, an FX-funding bank) where the 2007-09-style wrong-way pattern could apply.</p>
  <p>On the exam, this reading is tested less through calculation-heavy problems than through "which named shortcoming/pitfall does this scenario describe" questions — you'll be given a paragraph describing an institution's stress-testing practice and asked to identify which of the two current-exposure shortcomings, or which of the four CCR stress-testing pitfalls, it illustrates. The safest prep is to memorize each list by its distinguishing keyword (aggregation vs. WWR; not-aggregated vs. wrong-exposure-measure vs. at-the-money vs. delta-linearization) rather than trying to reason it out fresh under time pressure.</p>`,

  breakdown: [
    {
      title: "The four CCR exposure measures",
      points: [
        "Current exposure (replacement cost): max(0, market value) if the counterparty defaults today with zero recovery — a snapshot of today.",
        "Peak exposure: a high percentile (95%/99%) of the exposure distribution at a specific future date, generated across many future dates — a future tail measure.",
        "Expected exposure: the mean of that same future-date distribution — a future average, not a tail.",
        "Expected positive exposure (EPE): the time-weighted average of expected exposures across dates, measured over the first year or the life of the longest contract for regulatory capital."
      ]
    },
    {
      title: "Two shortcomings of stressing current exposure",
      points: [
        "Aggregation is not meaningful: summing exposures across counterparties assumes simultaneous default (unrealistic) and ignores each counterparty's credit quality entirely.",
        "No wrong-way-risk information: because credit quality is stripped from the calculation, the stress result cannot reveal whether exposure and default probability move together in that scenario."
      ]
    },
    {
      title: "Stressed expected loss: loan vs. derivatives portfolio",
      points: [
        "Loan portfolio: shock PD only (EAD, LGD held fixed); stress loss = EL_stressed − EL; all counterparties tend to move the same direction since loans aren't market-sensitive.",
        "Derivatives portfolio: EAD is replaced by α×EPE; shock either PD or the market variables driving EPE (swap rates, equity prices); different counterparties can move in different directions depending on portfolio bias and margining; no need to separately aggregate these EPE stresses with loan-portfolio stresses since loans don't respond to market variables."
      ]
    },
    {
      title: "Four named pitfalls in stress testing CCR",
      points: [
        "CCR stress results are typically NOT aggregated with loan portfolio or trading-position stress tests — a relatively new discipline that hasn't caught up.",
        "When combined, institutions typically (mistakenly) use current exposure instead of expected exposure or EPE.",
        "Current exposure is especially unreliable for at-the-money derivatives, where small market moves flip the sign of the trade's value.",
        "Delta-sensitivity linearization breaks down for large stress moves because delta itself is nonlinear."
      ]
    }
  ],

  quiz: [
    {
      q: "Which exposure measure is defined as the greater of zero or the market value that would be lost if the counterparty defaulted today with no recovery?",
      options: ["Peak exposure", "Current exposure", "Expected exposure", "Expected positive exposure (EPE)"],
      answer: 1,
      why: "Current exposure (replacement cost) is explicitly today's snapshot value. Peak and expected exposure are both FUTURE-date measures (a tail percentile and a mean, respectively), and EPE is a time-weighted average of expected exposures — none of those three are 'today.'"
    },
    {
      q: "An institution stress tests its current exposure under a 25% equity crash and ranks counterparties by stressed exposure. What is the single biggest limitation of using this ranking to estimate total portfolio loss?",
      options: [
        "It cannot be computed for interest rate swaps",
        "It ignores counterparty credit quality and cannot reveal wrong-way risk",
        "It always understates exposure relative to peak exposure",
        "It requires Monte Carlo simulation to compute"
      ],
      answer: 1,
      why: "The reading names exactly two shortcomings — meaningless aggregation (ignoring credit quality) and no wrong-way-risk information — and both trace back to the fact that credit quality is never part of the current-exposure calculation. Current exposure being lower than peak exposure is true but is not a named 'shortcoming' of the stress test; it's just a property of the two different measures."
    },
    {
      q: "A loan portfolio has baseline EL = PD × EAD × LGD, summed to $4.2M. A stress scenario doubles every PD_i while leaving EAD_i and LGD_i unchanged, producing a stressed EL of $7.9M. What is the stress loss?",
      options: ["$4.2M", "$7.9M", "$3.7M", "$12.1M"],
      answer: 2,
      why: "Stress loss is defined as EL_stressed − EL = $7.9M − $4.2M = $3.7M. $4.2M and $7.9M are just the two raw totals themselves, not the difference, and $12.1M is their (irrelevant) sum."
    },
    {
      q: "Why does an institution stressing expected positive exposure (EPE) on its derivatives portfolio NOT need to separately aggregate that stress with its loan portfolio's stress results?",
      options: [
        "Loans are not sensitive to market variables, so EPE shocks don't change loan exposures",
        "EPE and loan exposures are always perfectly negatively correlated, so they cancel",
        "Regulators prohibit aggregating derivatives and loan stress results",
        "Loan portfolios do not have an expected loss measure"
      ],
      answer: 0,
      why: "Loan exposures (EAD) are contractual balances that don't move with market variables like swap rates or equity prices, so a market-variable shock to EPE simply has nothing to act on in the loan book — the two stress channels are independent, not because of correlation (the 'always perfectly negatively correlated' answer misstates the actual reason) or a regulatory rule (the 'regulators prohibit aggregating' answer, not in the source)."
    },
    {
      q: "How does the bilateral CVA (BCVA) formula differ mechanically from the unilateral CVA formula it stress-tests as an extension of R37?",
      options: [
        "BCVA replaces EE with EPE and drops the discount factor",
        "BCVA adds a DVA term using expected negative exposure (ENE) and weights each term by the relevant party's survival probability",
        "BCVA is identical to CVA but computed under the physical (real-world) measure instead of risk-neutral",
        "BCVA only applies to centrally cleared trades and is irrelevant for bilateral OTC counterparties"
      ],
      answer: 1,
      why: "BCVA = CVA(weighted by the institution's own survival probability) + DVA (using ENE, weighted by the counterparty's survival probability) — a genuine structural addition, not a measure swap or a change of probability convention. The 'replaces EE with EPE' answer, the 'physical measure' answer, and the 'only applies to centrally cleared trades' answer all misstate what actually changes."
    },
    {
      q: "Which of the four named pitfalls in stress testing CCR does this scenario illustrate: 'A bank stress tests an at-the-money interest rate swap using its delta sensitivity linearly extrapolated to a large 300bp rate shock, and the estimated exposure change is far off from the fully repriced value'?",
      options: [
        "Failure to aggregate CCR with loan/trading stress tests",
        "Using current exposure instead of expected exposure",
        "At-the-money instability of current exposure",
        "Linearization error from using delta sensitivities for large, nonlinear moves"
      ],
      answer: 3,
      why: "The scenario specifically describes extrapolating a linear delta sensitivity across a large shock and getting an inaccurate result — that is exactly the fourth named pitfall (delta is nonlinear; linearizing it for large stresses causes significant errors). Being at-the-money is mentioned as context but the failure described is the linearization, not the exposure-measure choice or aggregation gap."
    }
  ],

  sources: [
    { title: "Counterparty Credit Risk — overview", url: "https://en.wikipedia.org/wiki/Counterparty_risk", note: "Background on counterparty credit risk concepts including exposure measures." },
    { title: "Credit Valuation Adjustment (CVA)", url: "https://www.investopedia.com/terms/c/cva.asp", note: "Plain-language explanation of CVA as the market price of counterparty default risk, useful context before the stress-testing extension." },
    { title: "Basel Committee — The standardised approach for measuring counterparty credit risk exposures", url: "https://www.bis.org/publ/bcbs279.htm", note: "Regulatory framework document showing how current/peak/expected exposure concepts are used in bank capital rules." },
    { title: "Wrong-way risk", url: "https://en.wikipedia.org/wiki/Wrong-way_risk", note: "Definition and examples of the exposure-PD correlation problem this reading says static stress tests cannot capture." }
  ],

  pdf: { book: 2, query: "we take a detailed look at counterparty credit risk measurement" },

  summary: `<p><strong>Four CCR measures</strong>: current exposure (today's replacement cost), peak exposure (high-percentile future tail), expected exposure (mean future), EPE (time-weighted average). CCR should be treated as BOTH credit risk and market risk — neither lens alone suffices, though doing both multiplies the number of stress results required. Stressing current exposure has two named shortcomings: ignores counterparty credit quality in aggregation, and provides no wrong-way risk information. <strong>Stressed EL</strong>: loan portfolios shock PD directly (EAD/LGD fixed); derivatives portfolios shock via EPE scaled by an alpha factor for portfolio effects, or shock market variables directly. <strong>Stressed CVA</strong> shocks the market variables driving EE and default probability; institutions typically only do this for UNILATERAL CVA. <strong>Stressed BCVA/DVA</strong> adds the institution's own default option, requiring expected negative exposure (ENE) and both parties' survival probabilities — and can counterintuitively show a stress LOSS when the institution's own credit quality improves. Four named <strong>pitfalls</strong>: CCR stresses not aggregated with loan/trading stresses; current exposure used instead of expected exposure/EPE; at-the-money instability; delta-linearization error on large moves.</p>`
});
