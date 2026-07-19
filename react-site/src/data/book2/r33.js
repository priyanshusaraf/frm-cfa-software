export default ({
  book: 2, reading: 33,
  session: "Counterparty Risk Management",
  title: "Netting, Close-Out, and Related Aspects",
  tagline: "Netting is the single biggest lever for reducing bilateral counterparty exposure — instead of summing only positive-value trades, sum ALL trades into one net figure.",

  teaches: `<p><strong>Payment netting vs. close-out netting</strong>, <strong>bilateral vs. multilateral netting</strong>, the <strong>ISDA Master Agreement</strong> that makes all of this legally enforceable, <strong>termination features</strong> (reset agreements, break clauses / additional termination events, walkaway clauses), and <strong>trade compression</strong>.</p>
  <p>Concretely: without any agreement, if you have two trades with the same counterparty worth +$10 and −$10, your exposure is $10 — because on default you must still pay the $10 you owe in full, while you only recover a fraction of the $10 you're owed (you become an unsecured creditor standing in line with everyone else). Netting fixes this by collapsing all trade values with one counterparty into a single number before measuring exposure, so the +$10 and −$10 cancel and your exposure becomes $0. The <strong>ISDA Master Agreement</strong> is the standard legal contract that makes this enforceable across jurisdictions, and <strong>close-out</strong> is the mechanical process — triggered by default — of terminating every outstanding contract and settling the single net amount.</p>`,

  why: `<p>Netting only helps if trades can have NEGATIVE mark-to-market (MtM) value — a portfolio of only long option positions bought with an up-front premium (e.g., a purchased equity call, a purchased FX option, a purchased cap) is always worth ≥0 to you, so there is nothing negative in the pool to offset against, and netting delivers exactly zero benefit. Understanding this boundary condition prevents overestimating netting's power: it is not a magic exposure-eraser, it is an offsetting mechanism that needs offsetting material to work with.</p>
  <p>It also matters because regulators and risk managers size collateral, capital, and CVA off NET exposure, not gross notional — so knowing precisely when netting does and doesn't apply is the difference between a defensible exposure number and a wildly wrong one.</p>`,

  intuition: `<p>Without netting, if a defaulting counterparty owes you on some trades and you owe them on others, you'd still have to pay your obligations in full while only recovering a fraction of what they owe you (as an unsecured creditor, behind secured creditors in the bankruptcy queue). Netting fixes this asymmetry: on default, ALL trades (positive and negative MtM) collapse into one net termination amount — so you only owe (or are owed) the difference, not the gross amounts.</p>
  <p>Concrete numeric example from the source: a bank has four uncollateralized transactions with one counterparty, currently valued at +$5 million, −$7 million, +$10 million, and −$2 million. Without netting, only the positive trades count as exposure (the negative ones aren't owed to the bank, so they don't reduce anything) — exposure = $5M + $10M = <strong>$15 million</strong>. With netting, all four values are summed algebraically: 5 − 7 + 10 − 2 = <strong>$6 million</strong>. Netting turned a $15M exposure into a $6M exposure using the exact same four trades — nothing about the trades changed, only how exposure is measured and legally enforced changed.</p>
  <p>A second example makes the boundary condition concrete: five transactions valued at +5, −4, +2, +3, −6. Without netting, exposure = sum of positives only = 5 + 2 + 3 = 10. With netting, exposure = 5 − 4 + 2 + 3 − 6 = 0. Netting can take exposure all the way to zero — but only because there were negative values in the mix to absorb the positives.</p>`,

  visual: ``,

  formulas: [],

  concepts: [
    {
      name: "ISDA Master Agreement",
      def: "A standardized legal contract published by the International Swaps and Derivatives Association (ISDA) that governs the terms of OTC derivatives trading between two parties — covering collateral, netting, and termination events — as a single legal contract with an indefinite term covering all future trades between them.",
      intuition: "Instead of negotiating a fresh legal contract for every single swap or option trade, two counterparties sign ONE Master Agreement once, then each individual trade is just a short confirmation referencing it. This is what makes close-out netting legally enforceable in a bankruptcy — without a legally sound netting agreement, a bankruptcy court might not honor the netting and could instead let the liquidator 'cherry-pick' (enforce the trades in the estate's favor and disclaim the rest).",
      example: "ISDA has obtained legal opinions confirming enforceability of the Master Agreement's netting provisions in most major jurisdictions, which is precisely why banks insist on one before trading derivatives with a new counterparty.",
      related: [{ r: 32, label: "R32 — the counterparty-risk toolkit this legal framework supports" }],
      memory: "ISDA Master Agreement = the legal plumbing that makes netting actually stick in bankruptcy."
    },
    {
      name: "Payment netting vs. close-out netting",
      def: "Payment netting (also called set-off): combines the cash flows from different contracts with a counterparty into a single net payment — routine and ongoing, reduces settlement risk and boosts operational efficiency. Close-out netting: netting of contract VALUES with a counterparty specifically triggered by that counterparty's default, collapsing all outstanding contracts into one net termination amount.",
      intuition: "Payment netting happens every payment date regardless of anyone's credit quality — it's just efficient plumbing. Close-out netting only fires once, at the moment of default, and its purpose is entirely about credit risk: it stops you from having to pay in full on losing trades while only getting a fractional recovery on winning trades.",
      pitfall: "Payment netting reduces settlement/operational risk but does NOT reduce presettlement (counterparty default) risk — for that you need close-out netting. This exact distinction is the basis of a GARP practice question: a firm worried about presettlement risk should ask for close-out netting, not payment netting.",
      related: ["Bilateral vs multilateral netting"]
    },
    {
      name: "Bilateral vs multilateral netting",
      def: "Bilateral netting: netting arrangements between exactly two entities — used for OTC derivatives, repo transactions, and balance-sheet loans/deposits. Multilateral netting: netting among many parties simultaneously, typically achieved through a central entity such as an exchange or clearinghouse that handles valuation, settlement, and collateralization for everyone.",
      intuition: "Picture entity A owing B, B owing C, and C owing A the same amount. Bilaterally, each pair still has to settle in full — three separate gross settlements. A central hub can net all three exposures at once and leave (in this symmetric case) nobody owing anybody. That's the multilateral netting benefit: it nets across an entire network, not just one pair.",
      pitfall: "Multilateral netting has real costs: it mutualizes counterparty risk (everyone is now exposed to the health of the central hub, and to each other indirectly), reduces individual firms' incentive to monitor each other's credit quality (since the hub absorbs the risk), can let redundant trading positions accumulate because no one entity sees the whole picture, and requires trading disclosure to the central entity that firms may want to keep confidential.",
      related: [{ r: 35, label: "R35 — central clearing achieves multilateral netting via a CCP" }],
      memory: "Bilateral = two parties, direct. Multilateral = many parties, via a central hub (exchange/CCP)."
    },
    {
      name: "Netting's boundary condition (netting effectiveness)",
      def: "A trading instrument benefits from netting only if it CAN have a negative mark-to-market (MtM) value at some point during its life. Instruments with only ever-positive MtM (bought options with an up-front premium — e.g., a purchased equity option, an FX option, a swaption, a cap or floor) get essentially no netting benefit, because there's nothing negative to offset them against.",
      intuition: "Netting is arithmetic offsetting — it needs both signs present to do anything. Give it only positive numbers and summing them nets to the same total as summing them individually; nothing cancels.",
      example: "Instruments that CAN swing negative (and so DO benefit from netting) include long options bought WITHOUT an up-front premium, many interest rate swaps, many FX forwards, cross-currency swaps, off-market instruments, and wrong-way-risk instruments — because their MtM can cross zero and go negative depending on where the underlying moves, even if it's statistically more likely to stay positive for some of these.",
      counter: "Even for instruments whose MtM is always (or almost always) positive, netting can still be worth including in the agreement for three practical reasons the source gives: (1) future trades with negative MtM could later offset the positive MtM of these instruments; (2) inclusion of ALL trades under one agreement is necessary for effective collateralization (partial coverage undermines the collateral calculation); (3) if the position ever needs to be unwound with an offsetting mirror trade against the same counterparty, having it under the netting agreement ensures zero residual counterparty risk from that unwind.",
      pitfall: "Don't assume netting always meaningfully reduces exposure — it depends entirely on the portfolio's composition of MtM signs. Netting can reduce exposure or leave it unchanged, but it can NEVER increase exposure above the gross (sum-of-positives) figure.",
      related: [{ r: 36, label: "R36 — the netting factor formula, which reflects exactly this logic mathematically" }],
      memory: "Netting needs SOME negative-value trades to net against — all-positive (bought-premium option) portfolios get zero benefit."
    },
    {
      name: "Termination features: reset agreements, break clauses (ATEs), walkaway clauses",
      def: "Termination events let an institution exit a trade before its counterparty actually goes bankrupt. A reset agreement readjusts a trade that has drifted heavily in-the-money back to at-the-money on scheduled reset dates. An additional termination event (ATE), also called a break clause or liquidity put, lets a party terminate a transaction at a specified future date at its replacement value if the counterparty's creditworthiness declines. A walkaway clause lets the NON-defaulting party avoid paying its own net liabilities to a defaulting counterparty while still collecting what it's owed — asymmetric and largely phased out since the 1992 ISDA Master Agreement.",
      intuition: "A reset agreement is worked example from the source: a resettable cross-currency swap exchanges the swap's MtM value at each reset date AND resets the FX rate used to determine the swap's value to the current spot rate — this effectively changes the notional on one leg and prevents the trade from ever drifting far from at-the-money, capping how much exposure can build up between resets.",
      example: "Break clauses come in three flavors based on WHEN they can be exercised: (1) Mandatory — the transaction automatically terminates on the break date, no choice involved; (2) Optional — one or both counterparties have the CHOICE to terminate on the pre-specified date; (3) Trigger-based — a specific event, most commonly a ratings downgrade, must occur before the break clause can be exercised at all.",
      pitfall: "Break clauses are theoretically valuable but have never been popular in practice, for two reasons the source names explicitly. First, a break clause is really just a discrete (point-in-time) form of collateralization, and continuous collateral posting achieves the same protection more smoothly. Second — the 'banker's paradox' — for a break clause to actually protect you, you'd need to exercise it EARLY, before the counterparty's credit has visibly deteriorated; but firms are reluctant to exercise early because doing so damages the relationship and can itself trigger the very distress they're trying to avoid, so in practice break clauses tend to get exercised too late (if at all) to be useful.",
      related: [{ r: 32, why: "R32's toolkit list previews termination features as one exposure-mitigation lever" }],
      memory: "Reset = periodic MtM-to-zero refresh. Break clause = optional/mandatory/trigger-based exit at replacement value. Walkaway = one-sided 'I keep what's owed to me, I skip what I owe you.'"
    },
    {
      name: "Trade compression",
      def: "A technique that cancels redundant, offsetting derivative trades across counterparties and replaces them with fewer, smaller trades that reproduce the same net cash-flow profile — cutting GROSS notional exposure and the number of outstanding trades while preserving NET exposure exactly.",
      intuition: "Multilateral netting needs a membership organization (a CCP) to net exposures live; trade compression achieves a similar cleanup WITHOUT needing a central clearing membership — it's a batch, opt-in process where participants submit eligible trades plus their risk tolerance, the trades get matched across counterparties, and offsetting positions are torn up and replaced by a single net contract per counterparty.",
      example: "Worked example from the source: an institution holds three single-name CDS contracts on the SAME reference entity and maturity, but with three different counterparties (some long protection, some short). Trade compression nets the long and short notionals against each other and sets the coupon on the resulting single net contract to the notional-weighted average of the three original coupons. In the source's Figure 33.1 example, after compression Counterparty X ends up holding the net contract position with a notional exposure of 25 (down from the sum of the three gross contracts). A related numeric illustration: 10 offsetting transactions between Party A and B with gross exposure of $1 million and net exposure of $250,000 can be compressed to roughly 5 transactions with gross exposure reduced to about $350,000 — while the net exposure stays $250,000 throughout.",
      counter: "TriOptima is named in the source as a real trade-compression service used to reduce OTC derivatives exposures across interest rate, commodity, and credit derivatives portfolios; standardized CDS coupons and maturity dates (post-crisis market reforms) have made CDS compression easier to run.",
      pitfall: "Trade compression changes GROSS exposure and counterparty/trade count but NOT net exposure — it's an operational and capital-efficiency cleanup (fewer trades means lower initial margin requirements, less regulatory capital tied up, and less administrative burden), not a risk-reduction tool in the net-exposure sense.",
      related: [{ r: 35, why: "R35 formalizes compression vs. multilateral offset as two distinct paths to a leaner derivatives book" }],
      memory: "Compression: fewer trades, smaller gross notional, IDENTICAL net exposure — an operational cleanup, not a risk reduction."
    }
  ],

  connections: {
    from: [
      { r: 32, why: "Formalizes the netting mitigation tool previewed in the R32 toolkit list." }
    ],
    to: [
      { r: 34, why: "Collateral (R34) is the next lever after netting for shrinking exposure further." },
      { r: 35, why: "R35 shows central clearing achieving multilateral netting/offset via a CCP, and contrasts it with trade compression." },
      { r: 36, why: "The netting factor formula in R36 directly quantifies this reading's diversification logic." }
    ],
    confused: [
      { what: "Payment netting vs close-out netting", how: "Payment netting is routine, ongoing (combining cash flows on payment dates, reducing settlement/operational risk); close-out netting is triggered specifically by DEFAULT (combining all contract VALUES into one termination amount, addressing presettlement/credit risk). Payment netting does NOT reduce presettlement risk — only close-out netting does." },
      { what: "Trade compression vs netting", how: "Compression physically cancels offsetting trades, reducing GROSS exposure and counterparty count while preserving NET exposure — it doesn't reduce net risk the way a netting agreement's exposure calculation does; it's an operational/capital-efficiency tool." },
      { what: "Close-out clauses vs acceleration clauses", how: "An acceleration clause lets a creditor make future payments immediately due on a credit event (e.g., a downgrade) but does NOT terminate/cancel the contracts. A close-out clause goes further: it terminates all contracts between the solvent and insolvent party outright and creates a single claim for compensation." },
      { what: "Break clause vs walkaway clause", how: "A break clause is a scheduled, priced, often-bilateral option to exit at replacement value before actual bankruptcy — a legitimate risk-management tool. A walkaway clause only activates AT default, is asymmetric (only the solvent party benefits), and has been largely phased out since the 1992 ISDA Master Agreement due to moral-hazard criticism." }
    ]
  },

  misconceptions: [
    { wrong: "\"Netting always meaningfully reduces exposure to a counterparty.\"", right: "Only if the portfolio has trades with BOTH positive and negative potential MtM. A portfolio of only bought, premium-paid option positions (always ≥0) gets zero netting benefit — there's nothing negative to offset. Netting can reduce exposure or leave it unchanged, but it can never increase it above the gross figure." },
    { wrong: "\"Trade compression reduces net exposure to a counterparty.\"", right: "It reduces GROSS exposure and the number of outstanding trades, while preserving NET exposure exactly — it's an operational simplification that lowers margin, capital, and administrative burden, not a net risk reduction tool." },
    { wrong: "\"Walkaway clauses are symmetric — both parties can invoke them equally.\"", right: "They're explicitly asymmetric and controversial: they let the NON-defaulting party walk away from its own liabilities to the defaulter while still claiming what it's owed. They've been largely phased out since the 1992 ISDA Master Agreement for creating moral hazard." },
    { wrong: "\"Payment netting protects a firm against presettlement (counterparty default) risk.\"", right: "Payment netting only reduces settlement and operational risk from ongoing cash flows. To address presettlement/default risk, you need close-out netting, which is specifically triggered by the counterparty's default." },
    { wrong: "\"A break clause's banker's paradox means firms exercise it too early, panicking the counterparty.\"", right: "The paradox runs the other way: to be genuinely useful, a break clause should be exercised EARLY (before credit quality visibly deteriorates), but firms are reluctant to exercise early because it damages the relationship — so in practice the option tends to be used too late (or not at all) to meaningfully protect against the eventual default." }
  ],

  highYield: [
    { stars: 4, what: "Netting's boundary condition: no benefit if all trades are same-signed (e.g., all bought, premium-paid options).", why: "A precise, frequently tested limitation that prevents overestimating netting's universal power." },
    { stars: 4, what: "Numeric netting exposure calculation: sum ALL signed MtM values for netted exposure; sum only POSITIVE MtM values for gross (un-netted) exposure.", why: "GARP loves a direct 4-5 number arithmetic question here (e.g., +5, −4, +2, +3, −6 → netted = 0, gross = 10) — memorize the mechanic, not just the concept." },
    { stars: 3, what: "Payment netting vs. close-out netting — timing, trigger, and which risk each addresses (settlement/operational vs. presettlement/credit).", why: "A clean two-way distinction, good matching-question material, and the basis of a common practice-exam trap." },
    { stars: 3, what: "Trade compression reduces gross exposure/counterparty count, NOT net exposure.", why: "A specific, testable distinction between operational and risk-reducing tools." },
    { stars: 3, what: "Bilateral (2 parties) vs. multilateral (many parties, via a central hub) netting, and multilateral netting's disadvantages: mutualized risk, reduced monitoring incentive, redundant-position accumulation, confidentiality loss.", why: "Tests whether you understand netting isn't a free lunch as it scales beyond two counterparties." },
    { stars: 2, what: "Break clause types: mandatory, optional, trigger-based (e.g., ratings downgrade) — and the 'banker's paradox' explaining their unpopularity.", why: "A named, quotable concept GARP likes to test with a scenario question." }
  ],

  recall: [
    { q: "A hedge fund holds only long call and put option positions (bought with an up-front premium) against a single counterparty, so all values ≥0. How much does netting reduce its exposure to that counterparty?", a: "Zero benefit. Netting relies on offsetting positive and negative trade values — with an all-bought-options portfolio, every trade has non-negative value, so there's nothing negative to net against, and gross exposure equals net exposure." },
    { q: "Distinguish payment netting from close-out netting in terms of when each applies and which risk each addresses.", a: "Payment netting operates continuously in normal operations, combining periodic cash flows from different contracts into one net payment — it reduces settlement and operational risk. Close-out netting is triggered specifically by a counterparty's DEFAULT, combining the values of ALL outstanding contracts into a single net termination amount owed — it addresses presettlement (credit) risk." },
    { q: "Why does trade compression reduce gross exposure without reducing net exposure?", a: "Compression identifies and cancels REAL offsetting trades (e.g., three CDS contracts on the same reference entity with different counterparties, some long and some short protection), replacing many trades with fewer that produce the same net cash-flow profile using a notional-weighted average coupon. Since the offsetting trades were already netting against each other economically, canceling them removes gross notional and counterparty complexity without changing the underlying net exposure." },
    { q: "Four uncollateralized trades with one counterparty are valued at +$5M, −$7M, +$10M, and −$2M. What is the exposure with netting, and without netting?", a: "With netting: 5 − 7 + 10 − 2 = $6 million. Without netting: only the positive-value trades count as exposure (you can't net a positive claim against an obligation you separately owe in full), so exposure = $5M + $10M = $15 million." },
    { q: "What is the 'banker's paradox' regarding break clauses, and why does it make them unpopular in practice?", a: "For a break clause to genuinely protect the exercising party, it should be exercised EARLY, before the counterparty's credit quality has visibly declined. But firms are reluctant to exercise this early — doing so can damage the counterparty relationship and may itself accelerate the counterparty's distress — so break clauses tend to be exercised too late (if at all) to be as useful as their design suggests." },
    { q: "What is a walkaway clause, and why has its use declined since 1992?", a: "A walkaway clause lets a non-defaulting party avoid paying its own net liabilities to a defaulting counterparty while still being able to claim any amount owed to it — an asymmetric benefit for the solvent party. It has become less common since the 1992 ISDA Master Agreement because it creates moral hazard and additional costs for the defaulting counterparty, and because the walkaway feature, if not disclosed, can hide risk that should be priced into the transaction." }
  ],

  hooks: [
    { title: "Nothing to net against", text: "Netting is a seesaw — it needs weight on both sides (positive AND negative trade values) to balance out exposure. An all-bought-options portfolio only has weight on one side; the seesaw can't do anything." },
    { title: "The queue you don't want to stand in", text: "Without netting, on a counterparty's default you're stuck at the FRONT of the line paying what you owe in full, but you're stuck at the BACK of the line as an unsecured creditor collecting what's owed to you. Netting merges the two lines into one net number so you're not double-punished." },
    { title: "Compression is decluttering, not dieting", text: "Trade compression is like consolidating five overlapping subscriptions into one bill for the same total spend — your gross clutter (number of line items) shrinks, but your net monthly cost (net exposure) is unchanged." }
  ],

  eli5: `<p>Imagine you and a friend run a small tab at the same bar across several nights: one night you owe him $7, another night he owes you $5, another he owes you $10, another you owe him $2. If the bar suddenly closes for good tonight (the "default"), and there's no netting agreement, the strict rule might say: you must pay every dollar you owe RIGHT NOW ($7 + $2 = $9), but you only get to collect a fraction of what's owed to you later, if ever, standing in a long line of other people the bar owes money to. That's brutally unfair to you. Netting is the house rule that says: before anyone pays or collects anything, just add up ALL the nights together (−7 + 5 + 10 − 2 = $6 owed to you) and settle THAT single number. In finance terms: the "nights" are individual derivative trades with the same counterparty, "the bar closing" is the counterparty defaulting, and the single settled number is the net termination amount produced by close-out netting under an ISDA Master Agreement.</p>`,

  thinkLike: `<p>A counterparty-risk manager doesn't ask "how much are we owed?" — they ask "if this counterparty defaulted at 3pm today, what would we actually recover, and what would we actually still owe?" That reframes exposure measurement around the NET position under the legal netting agreement in force, not the gross sum of winning trades. The first thing a risk manager checks before onboarding a new derivatives counterparty is whether a legally sound ISDA Master Agreement with close-out netting is in place and enforceable in that counterparty's jurisdiction — without it, exposure must be measured GROSS (sum of positive MtM only), which can be many multiples of the netted figure, as the $15M-vs-$6M worked example shows.</p>
  <p>The exam tests this reading along three axes: (1) can you correctly compute netted vs. gross exposure from a list of signed MtM values (pure arithmetic, always double-check whether the question asks "with netting" or "without netting"); (2) can you correctly classify a scenario into payment netting vs. close-out netting, bilateral vs. multilateral, and identify which specific risk (settlement, operational, or presettlement/credit) each tool addresses; and (3) can you spot the traps around termination features — that trade compression preserves net exposure, that walkaway clauses are asymmetric and disfavored, and that the banker's paradox means break clauses are underused because early exercise is uncomfortable, not because they don't work in theory. When a question describes a firm worried specifically about "presettlement risk" or "counterparty default before settlement," the answer is almost always close-out netting, not payment netting.</p>`,

  breakdown: [
    {
      title: "Netting toolkit — bilateral vs. multilateral, payment vs. close-out",
      points: [
        "Payment netting (set-off): combines cash flows from different contracts into one net payment on an ongoing basis — reduces settlement and operational risk, not credit/presettlement risk.",
        "Close-out netting: nets contract VALUES with a counterparty specifically upon that counterparty's default, collapsing everything into one net termination amount — this is what addresses presettlement/credit risk.",
        "Bilateral netting: between exactly two entities; used for OTC derivatives, repos, and balance-sheet loans/deposits.",
        "Multilateral netting: among many parties via a central entity (exchange or clearinghouse) that handles valuation, settlement, and collateralization; comes with tradeoffs — mutualized risk, weaker monitoring incentives, possible redundant-position buildup, and required trade disclosure."
      ]
    },
    {
      title: "Netting's advantages (why firms want it) — 4 reasons from the source",
      points: [
        "Exposure reduction: offsetting exposures reduces risk and improves operational efficiency (though netted exposures can still be volatile, making them harder to control moment-to-moment).",
        "Unwinding positions: netting lets a firm exit an illiquid trade by executing a reverse trade WITH THE SAME counterparty, removing both market risk and residual counterparty risk (versus unwinding with a different counterparty, which removes market risk but leaves counterparty/operational risk).",
        "Multiple positions: trading many products with the same counterparty under one netting agreement can reduce counterparty risk, secure better trade terms, and lower collateral requirements.",
        "Stability: without netting, firms trading with a troubled counterparty would rush to cease trading and terminate contracts, worsening that counterparty's distress; netting removes this incentive to pile on, making continued trading with a shaky counterparty more workable."
      ]
    },
    {
      title: "Termination events — the 3 break-clause trigger types",
      points: [
        "Mandatory: the transaction automatically terminates on the specified break date — no choice for either party.",
        "Optional: one or both counterparties HAVE THE CHOICE to terminate the transaction on the pre-specified date.",
        "Trigger-based: a specific event (most commonly a ratings downgrade) must occur before the break clause can be exercised at all."
      ]
    },
    {
      title: "When netting is worthwhile even for mostly-positive-MtM instruments — 3 reasons",
      points: [
        "Future trades with negative MtM could arise later and offset the current positive MtM instruments under the same agreement.",
        "Effective collateralization requires ALL trades to be included in the agreement — partial inclusion undermines the collateral calculation.",
        "If the position ever needs unwinding via an offsetting mirror trade with the same counterparty, having it under netting ensures zero residual counterparty risk from that unwind."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank has four uncollateralized trades with one counterparty valued at +$5M, −$7M, +$10M, and −$2M. Under a close-out netting agreement, what is the bank's exposure to this counterparty?",
      options: ["$15 million", "$6 million", "$0", "$9 million"],
      answer: 1,
      why: "Netted exposure sums ALL signed values: 5 − 7 + 10 − 2 = $6 million. $15 million is the WITHOUT-netting figure (sum of positive values only, 5+10); $9 million wrongly sums only the absolute values of the negative trades plus something else — it isn't a meaningful calculation here."
    },
    {
      q: "Riggs Resources is worried specifically about presettlement risk — the risk that a counterparty defaults BEFORE a trade settles. Which tool most directly addresses this?",
      options: ["Payment netting", "Close-out netting", "Trade compression", "A reset agreement"],
      answer: 1,
      why: "Close-out netting is triggered by default and nets contract VALUES, directly addressing presettlement/credit risk. Payment netting only reduces settlement and operational risk from routine cash flows, not default risk — a common exam trap. Trade compression and reset agreements don't target presettlement risk either."
    },
    {
      q: "Which of the following trading instruments would have the LEAST beneficial effect on netting?",
      options: ["An interest rate swap", "A cross-currency swap", "An equity option bought with an up-front premium", "An FX forward"],
      answer: 2,
      why: "An equity option bought with an up-front premium can only ever have a non-negative MtM to the buyer (worst case it expires worthless at 0), so there's nothing negative for it to net against — no benefit. Swaps and FX forwards can swing to negative MtM depending on market moves, so they DO benefit from netting."
    },
    {
      q: "Under trade compression, an institution has three CDS contracts on the same reference entity and maturity with three different counterparties, and these are compressed into a single net contract. What happens to gross and net exposure?",
      options: [
        "Both gross and net exposure fall",
        "Gross exposure falls; net exposure is unchanged",
        "Gross exposure is unchanged; net exposure falls",
        "Both gross and net exposure rise"
      ],
      answer: 1,
      why: "Compression cancels real offsetting trades and replaces them with fewer, smaller ones reproducing the same net cash-flow profile — gross notional and trade count fall, but net exposure is preserved exactly. It is an operational/capital-efficiency tool, not a net-risk-reduction tool — the most common wrong answer conflates it with netting's risk-reduction effect."
    },
    {
      q: "A walkaway clause is invoked when Counterparty A defaults on its trades with solvent Counterparty B. What can B do under this clause?",
      options: [
        "B must pay both its own net liabilities and collect what it's owed",
        "B can walk away from its own net liabilities to A while still claiming what A owes B",
        "B and A both get to walk away from their liabilities to each other",
        "B must cancel all trades and receive nothing"
      ],
      answer: 1,
      why: "Walkaway clauses are explicitly asymmetric — only the non-defaulting party (B) benefits, avoiding its own liabilities while still collecting what it's owed. The 'both parties get to walk away from their liabilities' answer wrongly makes it symmetric; this asymmetry (plus moral hazard) is why the clause has been largely phased out since the 1992 ISDA Master Agreement."
    },
    {
      q: "An investment bank has a trigger-based break clause with a counterparty, triggered by a ratings downgrade. The CEO worries about the 'banker's paradox.' What is the paradox?",
      options: [
        "The break clause should be exercised early, before credit quality visibly worsens, but firms are reluctant to exercise it that early",
        "The break clause should never be exercised because it always damages the relationship",
        "The break clause is exercised too early and creates unnecessary systemic risk",
        "The weak counterparty typically recovers financially right after the break clause is used"
      ],
      answer: 0,
      why: "The banker's paradox: for a break clause to truly protect the exercising party, it needs to be used EARLY — before the decline is severe — but firms hesitate to act that early because it can damage the relationship and even accelerate the counterparty's distress, so in practice break clauses tend to be used too late (if at all). The 'exercised too early and creates systemic risk' answer inverts the timing problem; the 'never exercise' and 'counterparty recovers after use' answers are not what the source describes."
    }
  ],

  sources: [
    { title: "ISDA Master Agreement — Wikipedia", url: "https://en.wikipedia.org/wiki/ISDA_Master_Agreement", note: "Background on the standardized legal contract that underpins netting and close-out enforceability across OTC derivatives." },
    { title: "Netting — Investopedia", url: "https://www.investopedia.com/terms/n/netting.asp", note: "Plain-language overview of payment netting and close-out netting with basic examples." },
    { title: "Close-out netting — BIS", url: "https://www.bis.org/publ/cgfs76.htm", note: "Bank for International Settlements committee material touching on close-out netting's role in reducing counterparty credit risk in derivatives markets." },
    { title: "Trade compression services (TriOptima background) — Wikipedia", url: "https://en.wikipedia.org/wiki/Portfolio_compression", note: "Overview of portfolio/trade compression mechanics referenced in the reading's CDS compression example." }
  ],

  pdf: { book: 2, query: "In this reading, we further discuss ways to mitigate counterparty risk" },

  summary: `<p><strong>ISDA Master Agreement</strong> standardizes OTC derivative terms (collateral, netting, termination) into one indefinite-term legal contract. <strong>Payment netting</strong> (ongoing cash flows, reduces settlement/operational risk) vs. <strong>close-out netting</strong> (triggered by default, nets ALL contract values, addresses presettlement/credit risk). <strong>Bilateral</strong> (2 parties) vs. <strong>multilateral</strong> (many, via a central hub) netting — multilateral trades monitoring incentives and confidentiality for scale. Netting's benefit REQUIRES trades with both positive and negative potential MtM — an all-bought-options portfolio gets zero netting benefit (worked example: +5,−7,+10,−2 → $15M gross vs. $6M netted). <strong>Termination features</strong>: reset agreements refresh MtM to at-the-money; break clauses (mandatory/optional/trigger-based) exit at replacement value but are underused due to the banker's paradox; <strong>walkaway clauses</strong> asymmetrically let the non-defaulting party keep what's owed while walking from its own liabilities (largely phased out since 1992). <strong>Trade compression</strong>: cuts gross exposure/counterparty count (e.g., three CDS contracts → one net contract, notional-weighted coupon), preserves net exposure exactly (operational, not risk-reducing).</p>`
});
