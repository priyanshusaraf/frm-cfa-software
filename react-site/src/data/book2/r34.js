export default ({
  book: 2, reading: 34,
  session: "Counterparty Risk Management",
  title: "Margin (Collateral) and Settlement",
  tagline: "If netting shrinks exposure by combining trades, collateral shrinks exposure by actually posting assets against it.",

  teaches: `<p>The <strong>Credit Support Annex (CSA)</strong> — the collateral rulebook attached to an ISDA Master Agreement. Two counterparties who trade OTC derivatives (forwards, swaps) will, at any given moment, have one side with a positive mark-to-market (MtM) value and the other with a negative one. The CSA is the legal document that forces the losing side to post collateral — cash or securities — to the winning side, so that if the losing side later defaults, the winner isn't left with an unsecured claim. Collateral is, in Schweser's own phrase, "an asset supporting a risk in a legally enforceable way."</p>
<p>You need to know: (1) the seven parameters every CSA defines — threshold, initial margin, minimum transfer amount, rounding, haircut, credit quality linkage, and credit support amount; (2) the mechanics — who calculates the numbers (the valuation agent), what can be posted (collateral types), and how disputes over those numbers get resolved; (3) the structural choice between a one-way CSA (only one side ever posts) and a two-way CSA (both sides post, but possibly on different terms); (4) collateral's darker side — rehypothecation and segregation, and the six distinct risks (market, operational, liquidity/liquidation, funding liquidity, default, FX) that collateralization itself introduces even as it reduces credit exposure; and (5) the post-2011 G20/regulatory push for mandatory bilateral variation and initial margin on non-cleared OTC derivatives.</p>`,

  why: `<p>The CSA's parameters are exactly the levers that reappear quantitatively in R36 (exposure profiles) and R37 (CVA) when exposure and CVA get calculated — threshold and minimum transfer amount specifically create windows of uncollateralized exposure that directly raise CVA, while initial margin (a "negative threshold") lowers it. Haircuts, rehypothecation, and segregation resurface in R36's discussion of funding costs and in the broader xVA framework (FVA, the funding valuation adjustment).</p>`,

  intuition: `<p>Collateral posting isn't automatic or continuous — it's governed by specific parameters that create gaps. <strong>THRESHOLD</strong> is the amount of exposure allowed to go uncollateralized before any collateral is called at all: a threshold of zero means every dollar of exposure gets collateralized immediately, while a threshold of infinity means the position is never collateralized (economically equivalent to having no CSA). <strong>MINIMUM TRANSFER AMOUNT (MTA)</strong> prevents tiny, operationally wasteful collateral movements — nobody wants to wire $500 back and forth every day just because the market twitched. Crucially, threshold and MTA are <em>additive</em>: exposure has to climb above the sum of both before any collateral actually moves. <strong>INITIAL MARGIN</strong> (also called the independent amount) works in the opposite direction from threshold — it's collateral posted upfront, before any exposure exists, so it can be thought of as a "negative threshold" that overcollateralizes the receiving party from day one. Because threshold and initial margin pull against each other, in practice when a CSA uses meaningful initial margin, the threshold is usually set to zero. All three parameters, while operationally sensible, create windows of real uncollateralized (or precisely-sized) exposure that a naive "we have a CSA so we're covered" assumption would miss.</p>`,

  formulas: [
    {
      name: "Credit support amount (variation margin, one-sided)",
      math: "\\text{Credit support amount} = \\max\\big(\\text{Exposure} - \\text{Threshold},\\, 0\\big)",
      note: "Collateral is called only on the portion of exposure that exceeds the threshold; a result of zero means no posting is currently required.",
      plain: "This says the required collateral is exactly the exposure that spills over the threshold — nothing is called for exposure sitting below it, and the call can never be negative.",
      derivation: `<p>Worked from the book's own margin-calculation example (Figure 34.1, without initial margin): suppose at Time 2 the portfolio's exposure is \\(225\\) and the threshold is \\(100\\). The required credit support amount is</p>
      <p>\\[ \\max(225 - 100,\\, 0) = 125. \\]</p>
      <p>The book notes that if only \\(150\\) has already been posted against a required \\(125\\), the position is actually overcollateralized relative to the threshold rule — the source describes this scenario as the portfolio being "uncollateralized by 75 (\\(=225-150\\))" relative to full notional coverage, then a further call of \\(25\\) up to the \\(100\\) threshold level, illustrating that the threshold — not the raw exposure — is the benchmark the CSA actually enforces.</p>`
    },
    {
      name: "Credit support amount (with initial margin, one-sided)",
      math: "\\text{Credit support amount} = \\max\\big(\\text{Exposure} - \\text{Threshold},\\, 0\\big) - \\text{Initial margin}",
      note: "Initial margin subtracts directly from the amount that would otherwise be called, because it is already-posted overcollateralization sitting independently of the variation-margin calculation.",
      plain: "This says threshold and initial margin pull in opposite directions on the same number — threshold delays collateral calls, initial margin pre-funds them — so a CSA rarely uses large amounts of both at once.",
      derivation: `<p>The book's Figure 34.2 example (with initial margin) shows the mechanism: at Time 1, adding initial margin on top of the threshold-based calculation leaves the portfolio <em>overcollateralized</em>. At Time 2, the portfolio's value rises enough to create a variation-margin deficit of \\(25\\) — but because that \\(25\\) move is smaller than the initial margin cushion already posted, no new collateral needs to move. Note that initial margin is <strong>not netted</strong> against variation-margin changes; it is computed and held independently (hence its other name, the "independent amount"), and if both counterparties post initial margin, their two initial-margin amounts are never netted against each other either.</p>`
    },
    {
      name: "Credit support amount (two-way / bilateral CSA)",
      math: "\\text{Credit support amount} = \\max\\big(E_A - TH_A,\\, 0\\big) - \\max\\big(-E_A - TH_B,\\, 0\\big)",
      note: "E_A is Party A's exposure (positive or negative); TH_A and TH_B are the thresholds that apply to A and B respectively. A positive result means A can call margin from B; a negative result means A must post margin to B. These conditions hold once the amount exceeds the minimum transfer amount.",
      plain: "This is the same call-above-threshold logic applied from both sides at once: whichever party currently has the positive exposure calls collateral from the other, each measured against its own negotiated threshold, since a two-way CSA can set different thresholds for a stronger and a weaker counterparty."
    },
    {
      name: "Collateral needed to post given a haircut",
      math: "\\text{Collateral to post} = \\dfrac{\\text{Collateral call amount}}{1 - \\text{Haircut}}",
      note: "A haircut is a discount applied to the market value of non-cash collateral to account for the risk that its price falls between the last valuation and a future default; cash typically has a 0% haircut (100% credit given).",
      plain: "This says that because the receiving party only gives you credit for a fraction (1 − haircut) of what you post, you must post more than the dollar amount of the call to satisfy it in full.",
      derivation: `<p>Straight from the book's worked example: a sovereign bond carries a \\(2\\%\\) haircut, and a collateral call is made for \\(\\$100{,}000\\). Only \\(98\\%\\) of the bond's market value counts toward satisfying the call, so the poster must deliver</p>
      <p>\\[ \\dfrac{\\$100{,}000}{1 - 0.02} = \\dfrac{\\$100{,}000}{0.98} \\approx \\$102{,}041 \\]</p>
      <p>of that sovereign bond (versus exactly \\(\\$100{,}000\\) if cash were posted instead, since cash has no haircut).</p>`
    }
  ],

  concepts: [
    {
      name: "Credit Support Annex (CSA)",
      def: "The document, incorporated into an ISDA Master Agreement, that lets two counterparties mitigate credit risk by defining exactly how collateral is posted between them: what can be posted, how it's valued, when it moves, and what happens on trigger events.",
      intuition: "ISDA documentation standardized collateral management starting in 1994 — before that, collateral terms were negotiated ad hoc with no common legal template. The CSA exists because, without a legally enforceable, fully-specified agreement, collateral is just a handshake that falls apart exactly when you need it most (a counterparty default).",
      example: "The ISDA Master Agreement itself has four parts: the master agreement, a schedule, credit support (the CSA), and confirmation. The CSA specifically governs collateral eligibility, interest-rate payments on posted cash, timing/mechanics of transfers, credit-support-amount calculations, haircuts, substitutions, valuation methods, reuse of collateral, dispute handling, and trigger events.",
      related: ["Credit support amount", "Threshold"]
    },
    {
      name: "Threshold",
      def: "The level of MtM exposure below which no collateral is called at all; only the exposure above the threshold gets collateralized.",
      intuition: "A threshold of zero means every dollar of exposure is collateralized; a threshold of infinity means the position is effectively uncollateralized. Thresholds exist mainly to reduce the operational burden of calling tiny amounts of collateral constantly.",
      pitfall: "Thresholds are usually tiered to credit ratings, with weaker-rated counterparties getting lower (or zero) thresholds — but linking collateral terms directly to a rating creates a 'death spiral' risk: right when a counterparty is downgraded and most financially stressed, it also gets hit with a wave of new collateral calls, which can push it toward the very default the CSA was meant to protect against.",
      related: ["Initial margin", "Minimum transfer amount"]
    },
    {
      name: "Initial margin (independent amount)",
      def: "Extra collateral posted upfront, independent of the ongoing exposure calculation, that pre-funds against future adverse moves — a form of overcollateralization also called the 'independent amount' in bilateral markets.",
      intuition: "Because it's independent, initial margin is never netted against variation-margin changes — even if both parties post initial margin, the two amounts stay separate and are never offset against each other.",
      example: "Initial margin can be thought of as converting counterparty risk into gap risk: it guarantees the stronger party stays overcollateralized by that fixed amount, but the risk that remains is that the weaker counterparty's portfolio value gaps down by more than the initial margin cushion between the last collateral call and default — hence initial margins should be sized to cover plausible large, sudden value moves.",
      pitfall: "Initial margin scales the opposite way from threshold when tiered to credit rating: a lower-rated counterparty gets a HIGHER initial-margin requirement (more overcollateralization demanded of it), whereas a lower-rated counterparty gets a LOWER threshold. Don't mix up the direction.",
      related: ["Threshold", "Credit support amount"]
    },
    {
      name: "Minimum transfer amount (MTA)",
      def: "The smallest amount of collateral that can actually be transferred at any one time, used to avoid the operational cost of moving trivially small amounts.",
      intuition: "Threshold and MTA are additive — exposure must exceed the SUM of both before a collateral call is triggered at all. A $50 threshold plus a $20 MTA means nothing moves until exposure tops $70.",
      pitfall: "MTAs are also typically tiered to credit rating, but in the OPPOSITE direction from threshold: higher-rated (stronger) counterparties get larger minimum transfer amounts, since operational convenience matters more than tight risk control for names that are already low-risk.",
      related: ["Threshold"]
    },
    {
      name: "Rounding",
      def: "Collateral calls and returns are typically rounded to a convenient increment (e.g., the nearest thousand) to avoid transferring awkward, precise amounts.",
      related: []
    },
    {
      name: "Haircut",
      def: "A discount applied to the market value of posted non-cash collateral, to account for the risk that the collateral's price falls between the last valuation and a future counterparty default. A haircut of x% means only (1−x)% of a security's value counts as credit.",
      intuition: "Cash normally has a 0% haircut (100% valuation credit). Riskier, more volatile, less liquid securities carry progressively higher haircuts — roughly in order of increasing riskiness: cash, then high-quality government bonds, then AAA corporate bonds, then structured notes/products, then equities and commodities.",
      example: "A $100,000 collateral call satisfied with a bond carrying a 2% haircut requires posting $100,000 / 0.98 ≈ $102,041 of that bond, since only 98% of its face value counts.",
      related: ["Credit support amount"]
    },
    {
      name: "Credit quality linkage",
      def: "CSA parameters (threshold, initial margin, MTA) are commonly tied to a counterparty's credit quality so terms automatically tighten as that counterparty's risk rises, without renegotiating the whole agreement.",
      intuition: "Credit ratings are the most common trigger, but ratings-linked terms create the 'death spiral' problem described under Threshold. Alternatives that avoid this — linking instead to credit spreads, market value of equity, or net asset value — are often preferable precisely because they respond to deteriorating credit more continuously and don't hinge on a single discrete ratings-agency action.",
      related: ["Threshold", "Initial margin"]
    },
    {
      name: "Valuation agent",
      def: "The party (or third party) responsible for calling for collateral and performing all related calculations: credit exposure, market values, credit support amounts, and the delivery/return of collateral.",
      intuition: "Larger, more sophisticated counterparties often insist on being the valuation agent when facing smaller counterparties. When counterparties are similarly sized, both may act as valuation agents (each calling collateral when it has positive exposure) — but this dual-agent setup is more prone to disputes and delays, which is why a neutral third-party valuation agent is sometimes used instead, handling substitutions, dispute resolution, and daily valuation reports independently.",
      related: []
    },
    {
      name: "Collateral types",
      def: "What can actually be posted as collateral, ranked roughly by how commonly they're used: cash (most common — though supply can tighten in stressed markets), government/agency securities, mortgage-backed securities (MBS), corporate bonds and commercial paper, letters of credit, and equity.",
      pitfall: "Agency securities are often favored for liquidity, but their true riskiness has been questioned after past market events; noncash collateral generally also raises rehypothecation risk and price-uncertainty concerns that cash simply doesn't have.",
      related: ["Haircut"]
    },
    {
      name: "One-way vs. two-way CSA",
      def: "A two-way CSA requires both counterparties to post collateral (though key parameters like threshold and initial margin can still differ by side, based on each party's relative risk). A one-way CSA requires only ONE counterparty to post — either immediately or triggered by an event such as a ratings downgrade.",
      intuition: "Two-way CSAs are typical between counterparties of broadly similar credit standing, since both sides benefit roughly symmetrically. One-way CSAs arise when counterparties differ significantly in size or risk — the stronger party benefits (it receives collateral without posting any itself) while the weaker party bears the extra risk of being the sole poster.",
      example: "A bank facing a hedge fund would most likely negotiate a one-way CSA in the bank's own favor, given the bank's typically stronger credit rating — the hedge fund posts collateral to the bank, not the other way around.",
      related: ["Credit Support Annex (CSA)"]
    },
    {
      name: "Rehypothecation",
      def: "Transferring collateral you've received from one counterparty on to another counterparty as your own collateral, rather than holding it.",
      intuition: "Rehypothecation is capital-efficient (the same collateral can effectively secure multiple obligations) but creates a compounding risk: if Party A pledges collateral to Party B, and Party B rehypothecates it to Party C, and Party C then defaults, Party B suffers TWO losses at once — it loses the collateral it can no longer recover from C, AND it still owes Party A its original collateral back. Rehypothecation was widespread before the 2007–2009 credit crisis but has become much less common since, with cash collateral increasingly preferred instead.",
      pitfall: "Rehypothecation and segregation work in opposite directions: rehypothecation reuses posted collateral (raising risk to the original poster), while segregation legally protects it (reducing that risk but potentially creating funding costs since the collateral can no longer be reused).",
      related: ["Segregation"]
    },
    {
      name: "Segregation",
      def: "Legally protecting posted collateral so it can be returned to the original poster even if the receiving counterparty becomes insolvent, rather than being tied up (or rehypothecated away) in that counterparty's bankruptcy.",
      intuition: "Segregation reduces counterparty risk on the collateral itself, but it comes at a cost: because segregated collateral cannot be rehypothecated or otherwise reused, the receiving party loses the funding benefit it would have gotten from reusing that collateral elsewhere.",
      related: ["Rehypothecation"]
    },
    {
      name: "Collateral disputes",
      def: "Disagreements over the trade population, trade valuation, market data/closing times, netting rules, or the value of previously-posted collateral.",
      example: "Resolution process: (1) the disputing party notifies its counterparty of its intent to dispute by the end of the day following the collateral call; (2) all undisputed amounts are transferred immediately, and the reason for the dispute is identified; (3) for amounts that remain unresolved, the parties request quotes from several market makers — usually four — for the mark-to-market value.",
      intuition: "Firms reduce dispute frequency by regularly reconciling trades, including 'dummy' (practice) reconciliations before trading begins and periodic (weekly or monthly) reconciliations once trading is underway. It can also be preferable to leave hard-to-value trades — complex exotic options, illiquid credit derivatives — out of the collateral agreement altogether, or to handle problematic regions/asset classes separately, rather than let one unvaluable trade hold up collateral flows on an otherwise-healthy portfolio.",
      related: []
    },
    {
      name: "Collateral agreement risks",
      def: "Six distinct risks that collateralization itself introduces, even though its overall effect is to reduce credit exposure: market risk, operational risk, liquidity/liquidation risk, funding liquidity risk, default risk, and FX risk.",
      intuition: "Collateral is a double-edged sword: managed well it mitigates counterparty risk, but managed poorly it creates fresh risks of its own — it should always be viewed as a supplement to, never a replacement for, ongoing credit-quality and exposure due diligence.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 33, why: "Collateral is the next lever after netting for shrinking bilateral exposure." }
    ],
    to: [
      { r: 36, why: "CSA parameters (threshold, MTA, initial margin) become quantitative inputs to exposure profile calculations, and the margin period of risk shapes how much residual risk collateral leaves behind." },
      { r: 37, why: "Threshold and minimum transfer amount directly raise CVA by creating uncollateralized exposure windows; initial margin, as a 'negative threshold,' lowers CVA." }
    ],
    confused: [
      { what: "Threshold vs minimum transfer amount", how: "Threshold is the exposure LEVEL below which no collateral is called at all; minimum transfer amount is the smallest INCREMENT of collateral that will actually be moved once a call is triggered. They are additive — exposure must clear the sum of both." },
      { what: "Rehypothecation vs segregation", how: "Rehypothecation is the receiving party REUSING your posted collateral elsewhere (raises risk to you, the poster); segregation is legally RING-FENCING your posted collateral so it can't be reused and must be returned to you (lowers risk to you, but removes the funding benefit of reuse). They point in opposite directions." },
      { what: "Threshold vs initial margin, direction with credit rating", how: "As a counterparty's credit rating worsens, its THRESHOLD typically falls (less uncollateralized exposure allowed), while its required INITIAL MARGIN typically rises (more upfront overcollateralization demanded) — both changes tighten terms on the weaker party, but they move in numerically opposite directions." }
    ]
  },

  misconceptions: [
    { wrong: "\"A CSA with a threshold and minimum transfer amount fully eliminates counterparty exposure.\"", right: "Both parameters deliberately create windows of UNCOLLATERALIZED exposure (below threshold, or below the minimum transfer amount) — a CSA reduces but does not eliminate exposure, and these gaps directly raise CVA (R37)." },
    { wrong: "\"Collateral disputes are rare and don't need a formal resolution process.\"", right: "Disputes routinely arise from valuation differences, timing mismatches, and netting disagreements — the formal process (notify by next business day → transfer undisputed amounts → third-party quotes for the rest) exists because disputes are a normal, expected occurrence." },
    { wrong: "\"A haircut reduces the dollar amount of collateral you have to post.\"", right: "A haircut does the opposite — it reduces how much CREDIT a given piece of collateral is given, which means you must post MORE of it (in market-value terms) to satisfy a given collateral call. A 2% haircut on a $100,000 call requires posting about $102,041 of that security, not less." },
    { wrong: "\"Tying collateral terms to credit ratings is a free lunch — it just makes stronger counterparties post less and weaker ones post more, automatically.\"", right: "Rating-linked terms can trigger a 'death spiral': a downgrade hits a counterparty with fresh collateral calls at precisely the moment it's least able to fund them, which can push a merely-stressed counterparty into actual default — this is exactly why some CSAs link terms to credit spreads or equity value instead of ratings." },
    { wrong: "\"Rehypothecated collateral is just as safe as segregated collateral, since it's still 'yours' on paper.\"", right: "Rehypothecated collateral has been passed on to a third party — if that third party defaults, the original poster faces a double loss: it may not get its collateral back AND the intermediary still owes it in full. Segregation avoids this by legally ring-fencing the collateral so it can't be rehypothecated away." }
  ],

  highYield: [
    { stars: 4, what: "CSA parameters (threshold, minimum transfer amount, initial margin) and how each creates residual exposure.", why: "Directly quantified later in R36/R37 — a foundational concept for the CVA calculations ahead." },
    { stars: 4, what: "The credit support amount formulas — one-sided with/without initial margin, and the two-way bilateral version — including which direction (call vs. post) a positive/negative result implies.", why: "This is explicitly an exam-calculable LO (34.c) with worked figures in the source; expect a numeric question." },
    { stars: 3, what: "One-way vs. two-way CSA, and which structure a stronger-vs-weaker credit pair would negotiate.", why: "Frequently tested as an applied scenario question (e.g., bank vs. hedge fund)." },
    { stars: 3, what: "Rehypothecation's double-loss mechanism and how segregation reverses it.", why: "A named mechanism the exam likes to test with a 3-party scenario (A pledges to B, B rehypothecates to C)." },
    { stars: 2, what: "Haircut mechanics — the formula for how much collateral must actually be posted given a haircut percentage.", why: "A straightforward, calculation-testable fact that appears directly in Schweser's own module quiz." },
    { stars: 2, what: "Collateral dispute resolution process (notify → transfer undisputed → third-party quotes from ~4 market makers).", why: "A straightforward procedural fact, occasionally tested." },
    { stars: 2, what: "The six collateral agreement risks (market, operational, liquidity/liquidation, funding liquidity, default, FX) and what distinguishes each.", why: "Tested as 'which of the following is NOT an example of X risk' style questions." }
  ],

  recall: [
    { q: "Why does a CSA with a nonzero threshold not fully eliminate a bank's exposure to its counterparty?", a: "The threshold defines an amount of exposure that is allowed to remain UNCOLLATERALIZED before any collateral call is triggered — exposure below the threshold has no collateral protecting it at all, creating a real residual risk that a CSA's existence alone doesn't eliminate." },
    { q: "What operational problem does a minimum transfer amount solve, and what residual risk does it create?", a: "It prevents small, operationally wasteful collateral movements (e.g., transferring $500 back and forth daily). The residual risk is that exposure changes smaller than the MTA go uncollateralized even though a threshold might otherwise be breached — another source of uncollateralized exposure alongside the threshold itself." },
    { q: "A sovereign bond has a 2% haircut. How much of that bond must be posted to satisfy a $100,000 collateral call, and why is it more than $100,000?", a: "About $102,041 (= $100,000 / 0.98). Because only 98% of the bond's market value is credited toward the call (the haircut), you must post enough face value that 98% of it equals $100,000 — meaning you always post MORE market value of a haircut-bearing security than the cash-equivalent call amount." },
    { q: "Why would a bank facing a hedge fund most likely negotiate a one-way CSA rather than a two-way CSA?", a: "Because of the large difference in credit quality — the bank's stronger credit rating means it can insist on receiving collateral from the hedge fund without having to post any itself, which is exactly the asymmetric structure a one-way CSA provides. Two-way CSAs are reserved for counterparties of broadly similar risk." },
    { q: "Party A posts collateral to Party B, who rehypothecates it to Party C. Party C then defaults. What TWO losses does Party B face, and how would segregation have prevented this?", a: "Party B loses the collateral it can no longer recover from the now-defaulted Party C, AND it still owes Party A the return of its original collateral — a double loss. Had the collateral instead been segregated (legally ring-fenced, not reusable), Party B could never have rehypothecated it to C in the first place, eliminating this specific failure mode (though segregation would have cost Party B the funding benefit of reusing that collateral)." },
    { q: "Why is linking collateral terms to a counterparty's credit rating sometimes criticized as creating a 'death spiral'?", a: "Because a downgrade triggers new collateral calls at exactly the moment a counterparty is under the most financial stress and least able to fund them — the resulting cash drain can itself push a struggling counterparty into default, which is why some CSAs link terms to credit spreads, equity value, or net asset value instead of discrete rating actions." }
  ],

  hooks: [
    { title: "The gaps collateral leaves behind", text: "Threshold and minimum transfer amount sound like small print, but they're literally windows of uncollateralized exposure — the CSA's fine print IS the risk that CVA has to price." },
    { title: "Collateral doesn't just reduce risk — it creates new risk", text: "Rehypothecation, segregation trade-offs, haircuts, FX mismatches: a CSA is a double-edged sword. Manage it well and exposure shrinks; manage it poorly and you've just swapped credit risk for operational, liquidity, and funding risk." }
  ],

  eli5: `<p>Imagine you and a friend keep a running tab of who owes whom money on a series of bets, re-totaled every day. Instead of trusting each other to pay up whenever the tab finally closes (maybe years from now), you agree: whoever is currently losing has to hand over some cash or valuables to the other person as a deposit, right now, today. But you don't want to hand over a dollar every single time the tab wiggles by a penny — that's exhausting — so you agree on a "wiggle room" amount (the threshold) below which no deposit changes hands, and a minimum deposit size (the minimum transfer amount) so you're not constantly swapping five-dollar bills back and forth. If your friend hands you a slightly-risky asset instead of cash — say, a watch instead of dollars — you'd only count it as worth, say, 95 cents on the dollar, because its value could drop before you get to cash it in (that's the haircut). And if your friend then lends YOUR watch to someone else as their own deposit (rehypothecation), you're suddenly exposed to that third person's honesty too — unless you'd insisted your watch stay locked in a safe with your name on it the whole time (segregation). This maps directly onto counterparty credit risk: the "tab" is the derivatives portfolio's mark-to-market value, the "deposit" is collateral, the wiggle-room and minimum-deposit rules are the CSA's threshold and minimum transfer amount, and the watch-lending problem is exactly the rehypothecation risk that hit markets hard before 2008.</p>`,

  thinkLike: `<p>A collateral/counterparty risk manager doesn't ask "do we have a CSA with this counterparty?" as a yes/no question — they ask "how much of our exposure to this counterparty is actually protected by that CSA, right now, given its specific threshold, minimum transfer amount, and initial margin?" Two counterparties can both have "a CSA" and have wildly different residual risk depending on whether the threshold is $0 or $50 million. The practitioner's real question is always: what's the largest loss we'd take if this counterparty defaulted a split second after the last collateral call, given the gaps these parameters deliberately leave open? That same lens extends to the structural choices — is this a one-way or two-way CSA, and does that match the actual relative credit quality of the two sides? Is the collateral we're holding cash (clean, no haircut, no rehypothecation headache) or something we'd have to sell at a discount in a hurry? And if we've rehypothecated collateral we received, have we quietly created a hidden liability to the original poster that only shows up when a third party defaults?</p>
<p>The exam tests this by making you trace numbers through the CSA machinery: given an exposure, a threshold, and possibly an initial margin, compute the credit support amount and say whether margin gets called or posted. It also loves scenario questions that hinge on relative credit quality (who negotiates a one-way CSA, and in whose favor?) and on naming which of the six collateral-related risks (market, operational, liquidity/liquidation, funding liquidity, default, FX) a described situation illustrates — so practice mapping a short story ("the bond posted as collateral just got downgraded below the CSA's eligibility criteria") to the correct risk category (default risk) rather than a vaguer one (market risk).</p>`,

  breakdown: [
    {
      title: "The CSA's seven core parameters",
      points: [
        "Threshold — the exposure level below which no collateral is called; represents the uncollateralized portion of exposure.",
        "Initial margin (independent amount) — extra collateral posted upfront, independent of ongoing exposure; a form of overcollateralization that acts like a 'negative threshold.'",
        "Minimum transfer amount — the smallest amount of collateral that can be transferred at once; additive with the threshold.",
        "Rounding — collateral calls/returns rounded to a convenient size (e.g., nearest thousand) to avoid awkward amounts.",
        "Haircut — a discount to the value of posted non-cash collateral, reflecting the risk its price falls before a future default.",
        "Credit quality — as a counterparty's credit quality declines, the importance (and typically the strictness) of collateral terms increases.",
        "Credit support amount — the actual amount of collateral that may be called by either counterparty at a given point in time, computed from the other six parameters."
      ]
    },
    {
      title: "Four motivations for managing collateral",
      points: [
        "Reduce credit exposure — enabling more trading capacity with a given counterparty.",
        "Enable trading at all — some counterparties (e.g., below a rating threshold) can only be traded with on a collateralized basis.",
        "Reduce regulatory capital requirements — collateralized exposure typically attracts lower capital charges than uncollateralized exposure.",
        "Allow more competitive pricing of counterparty risk — a lower expected loss (via collateral) means a smaller CVA charge built into the trade's price."
      ]
    },
    {
      title: "Collateral dispute resolution — the three steps",
      points: [
        "Notify — the disputing party notifies its counterparty of its intent to dispute the exposure/collateral amount by the end of the business day following the collateral call.",
        "Transfer undisputed amounts — any portion of the call that is NOT in dispute is transferred immediately, and the specific reason for the dispute is identified.",
        "Third-party quotes — for the amount that remains unresolved, the parties request quotes from several market makers (typically four) for the disputed mark-to-market value."
      ]
    },
    {
      title: "The six risks collateralization itself introduces",
      points: [
        "Market risk — adverse market moves since the last collateral posting leave a temporary gap; small compared to being fully uncollateralized, but hard to hedge/quantify.",
        "Operational risk — missed collateral calls, failed deliveries, computer/human error, or fraud in the collateral process itself.",
        "Liquidity and liquidation risk — the cost (bid-ask spread, price impact) of actually selling posted collateral to realize its value, especially if it's large relative to the security's trading volume.",
        "Funding liquidity risk — the poster's ability to meet frequent collateral-call funding needs, especially painful when markets are illiquid and funding costs spike.",
        "Default risk — the posted collateral itself defaults or is downgraded below eligibility, losing value the haircut wasn't sized to cover.",
        "Foreign exchange risk — arises whenever the collateral's currency differs from the exposure's currency, requiring separate FX hedging in spot/forward markets."
      ]
    }
  ],

  quiz: [
    {
      q: "A counterparty's exposure to a bank is currently $180, and the CSA specifies a threshold of $120 with no initial margin. What is the credit support amount, and what does it mean operationally?",
      options: [
        "$180 — the full exposure must be collateralized immediately",
        "$60 — collateral must be posted for the amount of exposure above the threshold",
        "$120 — the threshold amount itself must always be posted as a floor",
        "$0 — thresholds mean no collateral is ever required below full notional"
      ],
      answer: 1,
      why: "Credit support amount = max(Exposure − Threshold, 0) = max(180 − 120, 0) = 60. Only the exposure exceeding the threshold gets called. The 'full $180 must be collateralized' answer ignores the threshold entirely; the '$120 threshold itself must always be posted as a floor' answer confuses the threshold (a floor for NON-collateralization) with a required minimum posting; the 'thresholds mean no collateral is ever required' answer conflates 'threshold exists' with 'nothing is ever collateralized.'"
    },
    {
      q: "Which pair of CSA parameters are described in the reading as additive — meaning exposure must exceed the SUM of both before any collateral actually moves?",
      options: [
        "Initial margin and haircut",
        "Threshold and minimum transfer amount",
        "Rounding and credit quality",
        "Initial margin and threshold"
      ],
      answer: 1,
      why: "Threshold and minimum transfer amount are explicitly additive per the source. Initial margin and threshold instead work in OPPOSITE directions (the 'initial margin and threshold' answer is a common confusion, since both parameters affect the required collateral level, just with opposite sign); haircut and rounding, and rounding and credit quality, are unrelated mechanics that don't combine this way."
    },
    {
      q: "A collateral call for $100,000 is satisfied with a security carrying a 5% haircut. Approximately how much of that security must be posted?",
      options: [
        "$95,000",
        "$100,000",
        "$105,263",
        "$110,000"
      ],
      answer: 2,
      why: "Collateral to post = Call amount / (1 − haircut) = $100,000 / 0.95 ≈ $105,263. The $95,000 answer is the mistake of applying the haircut in the wrong direction — that's how much of a $100,000-FACE-VALUE security would be CREDITED, not how much must be posted to satisfy a $100,000 call. The $100,000 answer ignores the haircut altogether."
    },
    {
      q: "A bank (strong credit rating) is negotiating a collateral agreement with a hedge fund (weaker, more volatile credit profile). Which structure would the bank most likely push for?",
      options: [
        "A two-way CSA with identical thresholds on both sides",
        "A one-way CSA requiring only the hedge fund to post collateral to the bank",
        "A one-way CSA requiring only the bank to post collateral to the hedge fund",
        "No CSA at all, relying solely on netting"
      ],
      answer: 1,
      why: "Large credit-quality differences typically produce a one-way CSA favoring the stronger party — the bank receives collateral without having to post any itself. The 'two-way CSA with identical thresholds' answer is more typical when counterparties are of similar credit standing, not when there's a large gap. The 'one-way CSA requiring only the bank to post' answer reverses who benefits. The 'no CSA at all' answer ignores that the whole point of the CSA is to secure the exposure beyond what netting alone achieves."
    },
    {
      q: "Party A posts collateral to Party B. Party B rehypothecates that collateral to Party C, and Party C subsequently defaults. What happens to Party B?",
      options: [
        "Party B is unaffected, since the collateral was never legally Party B's own",
        "Party B loses only the ability to return Party A's collateral, but owes nothing further",
        "Party B suffers a double loss: it cannot recover the collateral from C, and it still owes Party A the return of the original collateral",
        "Party B automatically recovers the loss from Party A through the CSA's dispute process"
      ],
      answer: 2,
      why: "Rehypothecation compounds losses: Party B loses the collateral it can no longer get back from the defaulted Party C, AND it remains obligated to return Party A's original collateral — a double hit. The 'B only loses the ability to return A's collateral' answer understates the loss by omitting the unrecoverable collateral from C; the 'B is unaffected' answer ignores that B took on a real liability by rehypothecating; the 'B automatically recovers the loss through the dispute process' answer confuses this default scenario with the unrelated valuation-dispute process."
    },
    {
      q: "Why is linking a CSA's threshold to a counterparty's credit rating sometimes criticized, even though it seems to make collateral terms appropriately risk-sensitive?",
      options: [
        "Credit ratings update too frequently, causing excessive operational workload",
        "It can trigger a 'death spiral' — a downgrade forces new collateral calls exactly when the counterparty is least able to fund them, worsening its distress",
        "Rating agencies are legally barred from being referenced in derivatives contracts",
        "It eliminates the need for a minimum transfer amount entirely"
      ],
      answer: 1,
      why: "The 'death spiral' risk is the specific criticism: a downgrade-triggered collateral call drains cash from an already-stressed counterparty, which can push it toward the very default the CSA aimed to protect against — this is why some CSAs link terms to credit spreads or equity value instead. Rating changes are actually infrequent (contradicting the 'ratings update too frequently' answer); the 'rating agencies are legally barred' answer is false; the 'eliminates the need for a minimum transfer amount' answer is unrelated — MTA remains a separate parameter regardless of what triggers threshold changes."
    }
  ],

  sources: [
    { title: "ISDA Master Agreement — Wikipedia", url: "https://en.wikipedia.org/wiki/ISDA_Master_Agreement", note: "Background on the four-part structure (agreement, schedule, credit support, confirmation) that the CSA sits within." },
    { title: "Rehypothecation — Wikipedia", url: "https://en.wikipedia.org/wiki/Rehypothecation", note: "Deeper background on how rehypothecation works and why it became less common after the 2007–2009 crisis." },
    { title: "Margin requirements for non-centrally cleared derivatives — BIS/BCBS-IOSCO", url: "https://www.bis.org/bcbs/publ/d499.htm", note: "The regulatory framework (referenced in this reading's LO 34.k) requiring bilateral variation and initial margin on non-cleared OTC derivatives." },
    { title: "Collateral (finance) — Investopedia", url: "https://www.investopedia.com/terms/c/collateral.asp", note: "A plain-language primer on collateral concepts before diving into CSA-specific mechanics." }
  ],

  pdf: { book: 2, query: "collateral management is often bilateral, where either side" },

  summary: `<p><strong>CSA</strong>: the collateral rulebook, incorporated into an ISDA Master Agreement — what's posted, how valued, when it moves. Key parameters: <strong>threshold</strong> (exposure allowed uncollateralized before any call), <strong>initial margin</strong> (upfront, independent overcollateralization — a 'negative threshold'), <strong>minimum transfer amount</strong> (smallest collateral movement made; additive with threshold), <strong>rounding</strong>, <strong>haircut</strong> (discount on non-cash collateral's value), and <strong>credit quality</strong> linkage (often tiered to ratings, with death-spiral risk). <strong>Credit support amount</strong> = max(Exposure − Threshold, 0) one-sided, minus initial margin if present, or the bilateral max()−max() version when both sides can call. Collateral types: cash (most common), govt/agency securities, MBS, corporate bonds, letters of credit, equity. A <strong>one-way CSA</strong> has only one side post (favoring the stronger-credit party); a <strong>two-way CSA</strong> has both sides post, possibly on different terms. <strong>Rehypothecation</strong> (reusing received collateral) creates double-loss risk if the intermediary's counterparty defaults; <strong>segregation</strong> (ring-fencing collateral) reverses this at the cost of funding flexibility. <strong>Disputes</strong>: notify by next business day → transfer undisputed amounts → third-party quotes (≈4 market makers) for the rest. Collateralization itself introduces six risks: market, operational, liquidity/liquidation, funding liquidity, default, and FX.</p>`
});
