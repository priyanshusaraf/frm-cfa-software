export default ({
  book: 2, reading: 31,
  session: "Counterparty Risk Management",
  title: "Derivatives",
  tagline: "Opens Session 6 by re-grounding counterparty risk in derivatives specifically: a hybrid of market risk (value swings) and credit risk (the other side not paying).",

  teaches: `<p>What a <strong>derivative</strong> is (a contractual agreement between two parties to buy or sell an underlying, or to make a future payment, whose value can be zero at inception but swings over the contract's life); how that value-swinging creates <strong>counterparty credit risk</strong> — a hybrid of market risk (the value moves) and credit risk (the other side might not pay when it owes); the exchange-traded vs. OTC split and the four-way classification of derivatives by transaction/collateral type; who trades derivatives (large players, medium players, end users) and how collateral behavior differs sharply across those tiers; the ISDA Master Agreement as the legal chassis for bilateral OTC trades, including its four components and the eight events of default; credit derivatives (CDS, total return swaps, credit spread options) as a special case where the derivative itself hedges credit risk while creating new counterparty risk; the central counterparty (CCP) — its roles, benefits, and shortfalls; margin requirements for cleared vs. bilateral trades; four historical risk-mitigating entity structures (SPV, DPC, monoline, CDPC) and why each one eventually broke down in the 2007–2009 crisis; and the quantitative toolkit (VaR, PFE, expected shortfall) used to model derivatives risk.</p>`,

  why: `<p>Derivatives counterparty risk can be managed either bilaterally (netting, collateral) or through a central counterparty (CCP) — the fork in the road that R32-35 walk down both branches of. This reading sets up that fork, and it also plants the vocabulary (ISDA, CSA, CCP, PFE, ES) that every later reading in Session 6 assumes you already have. The historical failures baked into this reading — monolines, DPCs, SPV consolidation risk — are exactly the kind of "why did the old risk-mitigation structures fail" question the exam likes to ask, because they show that a AAA rating or a bankruptcy-remote label is not the same thing as being genuinely free of counterparty risk.</p>`,

  intuition: `<p>Counterparty risk in derivatives is unusual among credit risks because the exposure itself is uncertain in DIRECTION — unlike a loan (where you know you're the lender and roughly what's owed), a derivative's value can flip between positive and negative for either party as markets move. Picture an interest-rate swap: today you might be "in the money" (the counterparty owes you if the contract closed out now), but if rates move against you over the next year, you could just as easily end up owing them. This bilateral, market-driven uncertainty is why derivatives credit risk needs its own dedicated toolkit (VaR-style exposure models, netting, collateral, central clearing) rather than reusing loan-style credit risk models, which only ever have to worry about one direction of loss.</p><p>The whole reading is organized around one question asked at increasing levels of institutional sophistication: <em>who bears the risk that my counterparty can't pay, and what mechanism reduces it?</em> Bilateral trading answers that question with paperwork (the ISDA Master Agreement) and posted assets (collateral); central clearing answers it by inserting a well-capitalized middleman (the CCP) that becomes everyone's counterparty at once; and the older, now largely discredited answers (SPVs, DPCs, monolines, CDPCs) tried to answer it by wrapping the risk in a supposedly bankruptcy-remote or AAA-rated box — a solution that looked robust until the 2007–2009 crisis tested it and, in most cases, broke it.</p>`,

  eli5: `<p>Imagine you and a friend make a bet on next week's weather: if it rains, you owe your friend $20; if it's sunny, your friend owes you $20. Right now the bet is worth $0 to both of you — but by Friday, one of you will owe the other, and you won't know who until the week plays out. That's exactly what a derivative is: a contract whose value can flip between "they owe me" and "I owe them" as conditions change, which is why the person who might end up owed money has to worry the other person might not pay. Now scale that up: instead of a casual bet between friends, it's a bank and a corporation with a multi-year interest-rate swap worth millions, and instead of trusting each other's word, they either write a detailed legal contract (the <strong>ISDA Master Agreement</strong>) specifying what happens if one side can't pay, or they route the bet through a trusted referee (a <strong>central counterparty</strong>) who collects a deposit from both sides upfront and steps in as the new counterparty to each of them.</p>`,

  thinkLike: `<p>A derivatives risk manager's first instinct on seeing any new trade is to ask two separate questions, not one: "how might the value of this contract move against me?" (market risk) and, layered on top, "if it moves against me and my counterparty is the one who now owes money, will they actually pay?" (credit risk). The reading trains you to keep those two questions distinct even though they interact — a derivative can have huge potential market-risk swings but low counterparty risk (if it's centrally cleared and fully collateralized), or modest market-risk swings but high counterparty risk (an uncollateralized OTC trade with a thinly capitalized end user). The practitioner move is to classify every trade along two axes at once: standardized vs. customized (exchange-traded vs. OTC), and collateralized vs. not (the four-way split: exchange-traded, OTC centrally cleared, OTC collateralized, OTC uncollateralized) — because it's that second axis, not the first, that actually drives how much counterparty risk survives.</p><p>On the exam, this reading is tested less by calculation and more by "which entity/mechanism does X" recall and by classic trap questions: does central clearing eliminate counterparty risk (no — it reduces it, and it introduces new risks such as CCP failure and legal-jurisdiction conflicts); do end users post as much collateral as dealer banks (usually not, which is exactly why their small trades carry outsized relative risk); can you tell VaR, PFE, and ES apart (VaR = worst loss at a confidence level over a short horizon; PFE = the same idea over a long horizon, applied to credit exposure from gains; ES = the average loss beyond VaR). Expect a scenario question that asks you to correctly interpret a stated VaR number (e.g., "no more than $X, 95% of the time" — not "an average of $X").</p>`,

  formulas: [
    {
      name: "Value at Risk (VaR)",
      math: "\\text{VaR}_{\\alpha} = \\inf\\{\\, \\ell : P(L > \\ell) \\le 1-\\alpha \\,\\}",
      note: "L is the loss over the horizon; \\(\\alpha\\) is the confidence level (e.g. 99%). VaR is the smallest loss level that is exceeded with probability no greater than \\(1-\\alpha\\).",
      plain: "VaR answers: 'over this holding period, what loss will I not exceed with (say) 99% probability?' — equivalently, there is only a 1% chance the loss is worse than the VaR number.",
      derivation: `<p>Read it as a two-step statement, exactly the way the reading's example does: "a one-month VaR of \\(\\$100{,}000\\) at a 99% confidence level" means</p><p>\\[ P(L > \\$100{,}000) \\le 1 - 0.99 = 0.01 \\]</p><p>i.e. there is a 99% probability the maximum loss over the month is \\(\\$100{,}000\\), or equivalently a 1% probability the loss exceeds it. Note VaR only fixes the boundary — it says nothing about how bad the loss could be inside that worst 1% tail, which is exactly the gap Expected Shortfall closes.</p>`
    },
    {
      name: "Expected Shortfall (ES)",
      math: "\\text{ES}_{\\alpha} = E\\big[\\, L \\mid L > \\text{VaR}_{\\alpha} \\,\\big]",
      note: "The expected (average) loss, conditional on the loss already exceeding the VaR threshold.",
      plain: "ES asks: 'given that we're already in the bad 1% of outcomes, what's the average loss in there?' — it fixes VaR's blind spot about tail severity."
    }
  ],

  concepts: [
    {
      name: "Derivative & counterparty credit risk",
      def: "A derivative is a contractual agreement between two parties to buy or sell an underlying security, or to make a payment in the future; many derivatives have zero value at inception but their value changes over the contract's life. That value-swinging creates counterparty credit risk: a hybrid of market risk (the contract's value moves) and credit risk (the party who now owes money might not pay).",
      intuition: "Think of it as market risk with a trigger: the market move determines WHO owes WHOM and HOW MUCH; the credit risk only bites once that direction is set against your counterparty.",
      example: "A farmer worried wheat prices will fall by harvest sells (goes short) wheat futures expiring in six months, locking in today's price — a textbook commodity-price hedge using an exchange-traded, standardized contract.",
      related: [{ r: 36, label: "R36 — turns this uncertain future value into a quantified exposure profile" }]
    },
    {
      name: "Exchange-traded vs. OTC",
      def: "Exchange-traded: standardized terms (specific prices, expiry dates, notional amounts set by the exchange), central/margined clearing, easy unwind, generally very liquid — futures and many options. OTC: customized, privately negotiated contracts traded on informal dealer networks — forwards and swaps — that can be tailored precisely to a counterparty's need but can be difficult or costly to unwind.",
      intuition: "Standardization is a liquidity/flexibility trade-off: the exchange sacrifices customization for the ability to net, clear, and exit easily; OTC sacrifices easy exit for a contract that fits the exact risk you're hedging.",
      example: "A computer manufacturer needing exactly 1,241 ounces of copper delivered in 133 days can't get that from a standardized exchange contract sized in round lots with fixed expiries — it has to find a dealer willing to write a custom OTC forward for that exact quantity and date.",
      counter: "OTC does not mean unhedgeable or always illiquid — some OTC markets (notably FX) are extremely liquid despite being customized and dealer-based.",
      pitfall: "If the OTC counterparty IS the dealer, the dealer can't simply buy the derivative at one price and simultaneously resell it to someone else at a better price the way a market maker can flip a standardized contract — unwinding requires either the original counterparty's cooperation or, in some cases, novating (assigning) the contract to a new party, itself needing the original counterparty's permission.",
      related: [{ r: 35, label: "R35 — central clearing, the CCP alternative to bilateral OTC" }]
    },
    {
      name: "Clearing vs. settlement",
      def: "Clearing is the process BEFORE settlement of recording the counterparties' identities and computing/facilitating margin and payment obligations — the period between executing and settling a transaction. Settlement is the later process of actually facilitating payment and transferring money/assets when the contract is closed out, satisfying the legal obligations.",
      intuition: "Execution → Clearing → Settlement is the full lifecycle: you agree to the trade (execution), the paperwork/margin math gets sorted out (clearing), and money/assets actually move (settlement).",
      example: "In a bilateral market the original counterparty never changes and each side manages its own risk throughout; in a centrally cleared market, the CCP steps into the middle and becomes the new counterparty to each side, taking over the risk-management function as well as the clearing function.",
      related: [{ r: 33, label: "R33 — the close-out process that follows a default" }]
    },
    {
      name: "Four-way transaction/collateral classification",
      def: "Beyond exchange-traded vs. OTC, derivatives split into four groups by how they're transacted and collateralized: (1) exchange traded — under 10% of the market, centrally cleared, daily margin, minimal counterparty risk; (2) OTC centrally cleared — complex/illiquid trades unsuited to an exchange but still centrally cleared with daily variation margin; (3) OTC collateralized — bilateral trades where each side posts cash or securities; (4) OTC uncollateralized — bilateral trades with no collateral, usually because a party can't or won't lock up cash/securities, making these the riskiest.",
      intuition: "Posting collateral reduces counterparty risk, but it's not free — it introduces legal and operational risk (disputes, valuation timing) and funding costs (the cost of sourcing and locking up the posted assets).",
      pitfall: "It's tempting to treat 'exchange-traded vs OTC' and 'collateralized vs not' as the same axis — they aren't. OTC trades can be just as thoroughly collateralized as exchange-traded ones (OTC centrally cleared, OTC collateralized); only the fourth bucket, OTC uncollateralized, is genuinely high-risk.",
      related: [{ r: 34, label: "R34 — collateral posting mechanics (CSA, thresholds) this classification sets up" }]
    },
    {
      name: "Market participant tiers",
      def: "Large players (typically large global banks with huge, diversified derivatives portfolios trading nearly every product type — FX, rates, equities, commodities, credit — and controlling roughly 80% of OTC notional value as dealers/liquidity providers); medium players (smaller banks/financial institutions, often regional, with a fair volume of OTC trades but a narrower product range — typically no credit derivatives, commodities, or exotics); end users (small financial institutions, large corporations, sovereigns/supranationals with a narrow, often single-purpose hedging need).",
      pitfall: "End users typically transact with only a small number of counterparties and tend to avoid posting collateral frequently, or post only illiquid collateral — so they carry outsized counterparty risk relative to their trade size, a frequently tested asymmetry. (Exception: some very high-credit-quality sovereigns/supranationals can flip this and dictate that THEIR bank counterparty post collateral while they post none.)",
      example: "A pension fund that only needs interest-rate swaps to hedge its floating-rate liabilities, or a mining company that only needs commodity forwards to hedge its output price — both are end users with narrow, specific hedging needs and typically minimal collateral posting.",
      related: [{ r: 34, label: "R34 — collateral posting mechanics this asymmetry connects to" }]
    },
    {
      name: "ISDA Master Agreement",
      def: "The industry-standard legal document (introduced 1985, widely used since 1992, developed by the International Swaps and Derivatives Association) that governs bilateral OTC trades. It standardizes four things: (1) contractual terms for posting collateral, (2) events of default and termination, (3) netting of obligations, and (4) the close-out process. Governed typically under English or New York law; the main agreement is standard but attached to a negotiable schedule.",
      intuition: "The legal chassis that every later reading in this session (R33, R34) elaborates on piece by piece — netting formalizes point (3), the CSA formalizes point (1), close-out formalizes point (4).",
      example: "Structurally, an ISDA package has four parts: the master agreement itself, a schedule (adjustable terms), credit support (typically the Credit Support Annex, or 'CSA', defining collateral terms), and confirmation (the trade-specific details).",
      related: [{ r: 33, label: "R33 — netting and close-out formalized" }, { r: 34, label: "R34 — the CSA, a component of this agreement" }]
    },
    {
      name: "Events of default under the ISDA Master Agreement",
      def: "A default terminates the agreement and triggers the close-out process. The events of default are: failure to pay or deliver; breach of agreement; credit support default; misrepresentation; default under a specified transaction; cross-default (a default on another, unrelated obligation of the same counterparty); bankruptcy; and merger without assumption. Failure to pay/deliver and bankruptcy are the most common.",
      pitfall: "Cross-default is easy to underestimate: it means a counterparty can be put in default under THIS derivative contract because it defaulted on a completely unrelated loan or bond elsewhere — the trigger doesn't have to occur inside the derivative itself.",
      related: [{ r: 33, label: "R33 — what actually happens once a default event fires" }]
    },
    {
      name: "Credit derivatives",
      def: "Derivatives that hedge exposure to credit risk itself. The most common is the credit default swap (CDS); other types include total return swaps and credit spread options. In a CDS, the credit protection buyer seeks protection against a third party's default, and the credit protection seller provides it in exchange for a premium.",
      pitfall: "A CDS is meant to hedge credit risk on a THIRD party, but it simultaneously creates new counterparty credit risk BETWEEN the protection buyer and seller themselves — if the protection seller can't pay when the third party defaults, the hedge fails exactly when it's needed most. This dynamic (visible in AIG's near-collapse during the GFC) is one of the key reasons regulators pushed OTC derivatives, including CDS, toward central clearing.",
      related: [{ r: 39, label: "R39 — securitization, where credit derivatives are frequently embedded" }]
    },
    {
      name: "Central counterparty (CCP) — roles, benefits, shortfalls",
      def: "A CCP inserts itself between counterparties as the buyer to every seller and the seller to every buyer, becoming the new counterparty to both sides after a trade (novation). Its core roles: setting standards/rules for clearing members; closing out defaulting members' positions; requiring initial margin, variation margin, and default-fund contributions; and planning for extreme events (e.g., top-up calls, haircutting variation margin).",
      intuition: "Benefits: multilateral netting keeps the CCP market-neutral; posted collateral and mark-to-market reduce theoretical system-wide risk; loss mutualization spreads a defaulting member's shortfall across all non-defaulting members rather than concentrating it on one counterparty; and the CCP facilitates an orderly close-out via auction.",
      pitfall: "Shortfalls: a CCP itself must be extremely well-capitalized because ITS failure would be a systemic shock; central clearing reduces counterparty risk for derivatives users but can do so at the expense of other stakeholders (e.g., a CCP's claim priority can disadvantage bondholders); and CCPs with cross-border membership face conflicting legal and regulatory regimes. Central clearing REDUCES counterparty risk — it does not eliminate it.",
      related: [{ r: 35, label: "R35 — central clearing mechanics in full depth" }]
    },
    {
      name: "Margin requirements: cleared vs. bilateral",
      def: "Centrally cleared trades require initial margin (covering potential future default losses, required on every trade) and variation margin (covering realized daily mark-to-market changes), plus a default-fund contribution. Historically, noncentrally cleared bilateral trades had little or no margin requirement, but post-crisis regulation has been pushing bilateral trades toward similar margin regimes.",
      related: [{ r: 34, label: "R34 — margin/collateral mechanics (threshold, MTA, CSA) in depth" }]
    },
    {
      name: "SPV, DPC, monoline, CDPC — legacy risk-mitigating entities",
      def: "Special purpose vehicle (SPV / SPE): an off-balance-sheet, bankruptcy-remote entity separate from its sponsor; investors get creditor priority (a 'flip provision'); in essence transforms counterparty risk into legal risk (will a bankruptcy court consolidate the SPV's assets back with the sponsor?). Derivatives product company (DPC): set up by a financial institution to obtain a very high (often AAA) rating via separate capitalization from its parent, minimizing market risk by trading offsetting (mirrored) contracts; its rating depends on (1) minimizing market risk, (2) support from the parent, and (3) internal credit risk management/operational guidelines. Monoline insurance company: a highly leveraged insurer with a single business line — guaranteeing (via 'credit wraps') bond repayments to enhance ratings — that historically did NOT post collateral in normal conditions. Credit derivative product company (CDPC): similar to a DPC in structure but with a monoline-like business model, selling credit derivative protection for profit; also does not post collateral in normal conditions and is highly leveraged.",
      intuition: "All four structures are attempts to answer 'how do I make my counterparty's promise more trustworthy without actually collateralizing every trade?' — via bankruptcy remoteness (SPV), mirrored trading plus parental distance (DPC), or simply a very high rating relied on instead of collateral (monoline, CDPC).",
      pitfall: "Each structure's real-world failure mode surfaced in the 2007–2009 crisis: US courts have historically been willing to consolidate an SPV's assets back with its bankrupt sponsor (as happened with Lehman, where the US ruled the flip provision unenforceable — while UK courts, applying a different legal tradition, upheld it, a direct contradiction that shows the SPV's protection is jurisdiction-dependent, not absolute); Lehman's and Bear Stearns's DPCs did NOT unwind in the orderly fashion they were designed for (two Lehman DPCs filed Chapter 11; Bear Stearns's DPCs were wound down by JPMorgan); and monolines/CDPCs, which relied on never having to post collateral, were forced to post it (and lost their AAA ratings) exactly when their insured losses were mounting — the worst possible timing, and several failed as a result.",
      example: "A DPC engineered to be 'market neutral' by mirroring every trade with an offsetting one still carries legal risk (can it really be separated from a failing parent?), market risk (were the mirrored trades genuinely offsetting?), and operational risk — three separate risk types hiding behind one AAA label.",
      related: [{ r: 39, label: "R39 — securitization, which relies on the same SPV bankruptcy-remoteness logic" }]
    },
    {
      name: "Modeling derivatives risk: VaR, PFE, and expected shortfall",
      def: "Value at risk (VaR): the worst loss over a specified (typically short) period at a given confidence level — e.g., a 1-month 99% VaR of $100,000 means a 99% probability the month's maximum loss is $100,000 (equivalently, a 1% probability of losing more). Potential future exposure (PFE): the credit-risk equivalent of VaR, applied over a much longer horizon (often years) and measuring credit exposure arising from GAINS (money owed TO you) rather than losses. Expected shortfall (ES): the average loss given that the loss already exceeds the VaR threshold — it fills in what VaR is silent about.",
      pitfall: "VaR does not reveal anything about how bad losses get beyond the confidence level (a 99% VaR of $100,000 is consistent with a worst-case loss of $100,001 OR $5,000,000 — VaR can't tell them apart), and VaR may not be subadditive (the VaR of a combined portfolio is not guaranteed to be less than or equal to the sum of the VaRs of its parts, which would be the intuitively 'diversification helps' result). Also watch the classic misreading: 'X% VaR of $1 million' means you expect to lose NO MORE than $1 million (1-X)% of the time — not that you expect to lose exactly/on average $1 million.",
      intuition: "Both VaR and ES are typically implemented via historical simulation (recalculating outcomes under real historical scenarios) and then backtested ex post to check predictive power; correlation/dependence assumptions layered on top of them are a known weak point because historical correlations are poor predictors of the future and tend to break down exactly during stress, when you need them most.",
      related: [{ r: 36, label: "R36 — turns PFE and related exposure measures into full exposure profiles (EE, EPE)" }]
    }
  ],

  connections: {
    from: [
      { r: 29, why: "Introduced CVA/DVA in a derivatives context; this reading zooms out to the full derivatives counterparty risk landscape." }
    ],
    to: [
      { r: 32, why: "Formalizes the bilateral/uncertain nature of counterparty risk this reading introduces." },
      { r: 33, why: "Netting and close-out mechanics formalize the ISDA Master Agreement's third and fourth components introduced here." },
      { r: 34, why: "The CSA and margin parameters (threshold, minimum transfer amount, initial margin) build directly on the collateral concepts sketched here." },
      { r: 35, why: "Central clearing is the structural alternative to the bilateral ISDA framework introduced here, covered here at a summary level and in full depth in R35." },
      { r: 36, why: "PFE and the VaR-style modeling toolkit introduced here get turned into precise exposure profiles (EE, EPE, PFE curves)." },
      { r: 39, why: "SPVs, introduced here as a counterparty-risk mitigant, reappear as the core structural building block of securitization." }
    ],
    confused: [
      { what: "Exchange-traded vs OTC", how: "Exchange-traded is standardized and centrally margined (easy to unwind); OTC is customized and typically bilateral (harder to unwind), though it CAN be centrally cleared by choice. This axis is separate from collateralized vs. uncollateralized — the four-way classification captures both axes together." },
      { what: "VaR vs. PFE vs. Expected Shortfall", how: "VaR = worst loss at a confidence level over a short horizon; PFE = the same logic applied over a long horizon to credit exposure from GAINS; ES = the average loss conditional on being beyond the VaR threshold (fills VaR's tail-severity blind spot)." },
      { what: "Central clearing reduces vs. eliminates counterparty risk", how: "A CCP significantly REDUCES counterparty risk via multilateral netting, margin, and loss mutualization — it does not eliminate it, and the CCP itself becomes a new source of systemic risk if it fails." }
    ]
  },

  misconceptions: [
    { wrong: "\"End users (corporates/sovereigns) typically post as much collateral as large dealer banks.\"", right: "End users often DON'T post collateral at all, or post only infrequently/with illiquid assets, carrying outsized counterparty risk relative to their trade size — a key asymmetry in the market. (High-credit-quality sovereigns/supranationals are the exception, sometimes dictating that their counterparty post collateral while they post none.)" },
    { wrong: "\"OTC derivatives can never be centrally cleared.\"", right: "OTC derivatives CAN be centrally cleared by choice — the OTC/exchange-traded distinction is about customization of terms, not exclusively about clearing mechanism. The four-way classification (exchange traded, OTC centrally cleared, OTC collateralized, OTC uncollateralized) makes this explicit." },
    { wrong: "\"Central clearing through a CCP eliminates counterparty risk.\"", right: "A CCP significantly reduces counterparty risk through multilateral netting, margining, and loss mutualization, but it does not eliminate it — the CCP itself must be very strongly capitalized because its own failure would be a systemic shock, and CCPs can disadvantage other stakeholders (e.g., bondholders) and face cross-border legal conflicts." },
    { wrong: "\"A 95% one-week VaR of $1 million means you'll lose an average of $1 million per week 5% of the time.\"", right: "It means you expect to lose NO MORE than $1 million in a week 95% of the time (equivalently, at least $1 million 5% of the time) — VaR is a threshold/boundary statement, not an average-loss statement. (Expected shortfall is the average-loss-beyond-the-threshold statement.)" },
    { wrong: "\"A bankruptcy-remote SPV or a AAA-rated DPC/monoline guarantees the counterparty risk is gone.\"", right: "All four legacy structures (SPV, DPC, monoline, CDPC) transform counterparty risk into some other risk (legal risk for SPVs/DPCs, or reliance on an untested AAA rating for monolines/CDPCs) rather than eliminating it — and each broke down in real-world stress during 2007–2009 (Lehman's SPV flip provision was unenforceable in the US but enforceable in the UK; Lehman/Bear Stearns DPCs failed to unwind in orderly fashion; monolines and CDPCs lost their ratings and were forced to post collateral exactly as their insured losses mounted)." }
  ],

  highYield: [
    { stars: 3, what: "End users often don't post collateral, creating outsized counterparty risk relative to trade size.", why: "A frequently tested asymmetry connecting to collateral/CVA discussions later." },
    { stars: 3, what: "The four events-of-default families under the ISDA Master Agreement's default article — with failure to pay/deliver and bankruptcy the most common — and how cross-default (default elsewhere) can trigger this agreement.", why: "Directly testable recall, and the mechanism (any counterparty default triggers termination + close-out) is foundational for R33." },
    { stars: 3, what: "VaR vs. PFE vs. Expected Shortfall — definitions, horizons, and correct interpretation of a stated VaR figure ('no more than X, (1-alpha)% of the time', not an average).", why: "A classic exam trap on interpretation, and the direct conceptual bridge to R36's exposure metrics." },
    { stars: 2, what: "The four SPV/DPC/monoline/CDPC structures and how each one's protection actually broke down in the GFC.", why: "The exam likes 'which structure failed how' recall — these are concrete, memorable crisis case studies." },
    { stars: 2, what: "Exchange-traded vs OTC comparison (standardization, clearing, unwind flexibility) and the four-way transaction/collateral classification layered on top of it.", why: "Foundational classification, straightforward recall, and the basis for later CVA/exposure discussions." },
    { stars: 2, what: "CCP roles, benefits, and shortfalls — especially that central clearing REDUCES, not eliminates, counterparty risk.", why: "A recurring exam distractor pattern (overstating what a risk-mitigation mechanism achieves)." }
  ],

  recall: [
    { q: "Why do end users (corporates, sovereigns) often carry outsized counterparty risk relative to their derivative trade size?", a: "End users frequently don't post collateral against their derivative positions (unlike large dealer banks), so their actual uncollateralized exposure can be large relative to the trade's notional or economic purpose, even though their overall derivatives book is narrow and hedging-focused." },
    { q: "Can an OTC derivative be centrally cleared? What does this imply about the exchange-traded/OTC distinction?", a: "Yes — OTC derivatives can be centrally cleared by choice. The exchange-traded/OTC distinction is fundamentally about contract STANDARDIZATION (exchange-traded is standardized; OTC is customized), not strictly about clearing mechanism, since OTC trades can still route through a CCP — hence the separate four-way transaction/collateral classification." },
    { q: "What are the four components the ISDA Master Agreement standardizes, and which two events of default are most common?", a: "It standardizes (1) collateral posting terms, (2) events of default and termination, (3) netting of obligations, and (4) the close-out process. Failure to pay or deliver, and bankruptcy, are the most common events of default (out of eight total, including cross-default, misrepresentation, breach of agreement, credit support default, default under a specified transaction, and merger without assumption)." },
    { q: "A risk manager states a one-week 95% VaR of $1 million. What does this actually mean, and how does Expected Shortfall differ?", a: "It means the fund expects to lose no more than $1 million in a week 95% of the time (equivalently, at least $1 million 5% of the time) — a threshold statement, not an average. Expected Shortfall instead measures the AVERAGE loss conditional on already being in that worst 5% tail, filling in the severity information VaR is silent about." },
    { q: "How did the SPV, DPC, and monoline/CDPC structures each fail to fully insulate counterparties from risk during the 2007–2009 crisis?", a: "SPVs transform counterparty risk into legal risk: US courts have consolidated SPV assets back into a bankrupt sponsor's estate (Lehman's flip provision was ruled unenforceable in the US, though enforceable in the UK). Lehman's and Bear Stearns's DPCs did not unwind in the pre-arranged orderly fashion (two Lehman DPCs filed Chapter 11; JPMorgan wound down Bear Stearns's). Monolines and CDPCs relied on never posting collateral and keeping AAA ratings, but as GFC losses mounted they lost their ratings and were forced to post collateral at the worst possible time, driving several into failure." }
  ],

  hooks: [
    { title: "The fork in the road", text: "This reading is the fork: bilateral (ISDA, netting, collateral — R32-34) on one path, central clearing (CCP — R35) on the other. Everything downstream picks one path or compares both." },
    { title: "A label is not a guarantee", text: "SPV, DPC, monoline, CDPC — four different labels, one shared lesson: none of them eliminate counterparty risk, they just relabel it as legal risk or park it behind a rating that can be downgraded at the worst possible moment. When the exam describes an entity 'designed to be bankruptcy remote' or 'rated AAA without posting collateral,' your antenna should go up, not down." }
  ],

  breakdown: [
    {
      title: "Four-way classification of derivatives by transaction/collateral type",
      points: [
        "Exchange traded — under 10% of the market; standardized, centrally cleared, and margined daily; lowest counterparty risk.",
        "OTC centrally cleared — customized/complex trades unsuited to an exchange, but still routed through a CCP with daily variation margin.",
        "OTC collateralized — bilateral trades where each side voluntarily posts cash or securities to reduce counterparty risk.",
        "OTC uncollateralized — bilateral trades with no collateral posted, usually because a party can't or won't lock up assets; the riskiest bucket."
      ]
    },
    {
      title: "Three market participant tiers",
      points: [
        "Large players — big global banks with huge, diversified derivatives books across nearly every product, acting as dealers and controlling roughly 80% of OTC notional value.",
        "Medium players — smaller/regional banks and financial institutions trading a fair volume of OTC derivatives but a narrower product range (typically excluding credit derivatives, commodities, exotics).",
        "End users — corporates, sovereigns, and small financial institutions with narrow, often single-purpose hedging needs; typically deal with few counterparties and often don't post collateral, creating outsized relative risk."
      ]
    },
    {
      title: "Four components standardized by the ISDA Master Agreement",
      points: [
        "Contractual terms for posting collateral — later elaborated in the Credit Support Annex (CSA).",
        "Events of default and termination — the eight triggers (failure to pay/deliver, breach of agreement, credit support default, misrepresentation, default under a specified transaction, cross-default, bankruptcy, merger without assumption).",
        "Netting of obligations — combining offsetting amounts into one net figure instead of settling each trade gross.",
        "The close-out process — how the agreement is unwound and a termination amount determined once a default occurs."
      ]
    },
    {
      title: "CCP roles, benefits, and shortfalls",
      points: [
        "Roles: set standards/rules for clearing members; close out defaulting members' positions; require initial margin, variation margin, and default-fund contributions; plan for extreme events (top-ups, haircuts).",
        "Benefits: multilateral netting keeps the CCP market-neutral; collateralized mark-to-market lowers system-wide theoretical risk; loss mutualization spreads a default's cost across all members; facilitates orderly close-out via auction.",
        "Shortfalls: the CCP itself must be extremely well-capitalized (its failure would be systemic); can benefit derivatives counterparties at the expense of other stakeholders (e.g., bondholders); cross-border membership creates conflicting legal/regulatory exposure."
      ]
    },
    {
      title: "Four legacy risk-mitigating entity structures — and how each one broke down",
      points: [
        "SPV (special purpose vehicle) — bankruptcy-remote, off-balance-sheet entity; transforms counterparty risk into legal risk; Lehman's SPV flip provision was unenforceable in the US but enforceable in the UK, a direct jurisdictional contradiction.",
        "DPC (derivatives product company) — separately capitalized AAA subsidiary trading mirrored (offsetting) positions; rating depends on minimizing market risk, parental support, and internal risk controls; Lehman's and Bear Stearns's DPCs did not unwind in the planned orderly fashion.",
        "Monoline insurance company — highly leveraged, single-business-line insurer guaranteeing bond repayments via credit wraps; historically posted no collateral; lost AAA ratings and was forced to post collateral exactly as GFC losses mounted, causing several failures.",
        "CDPC (credit derivative product company) — DPC structure with a monoline-like business selling credit protection for profit; highly leveraged, no offsetting positions, no collateral in normal times; many failed during or after the GFC."
      ]
    },
    {
      title: "Three quantitative models for derivatives risk",
      points: [
        "Value at risk (VaR) — worst loss over a short horizon at a stated confidence level; simple, single-number, distribution-shape-agnostic, but silent on tail severity and not always subadditive.",
        "Potential future exposure (PFE) — the credit-risk analogue of VaR over a long horizon, measuring exposure arising from gains owed to you.",
        "Expected shortfall (ES) — the average loss conditional on being beyond the VaR threshold, filling in what VaR can't say about the tail."
      ]
    }
  ],

  quiz: [
    {
      q: "A computer manufacturer needs exactly 1,241 ounces of copper delivered in 133 days — a quantity and date that don't match any standardized exchange contract. Which market feature lets it get this exact hedge?",
      options: [
        "Exchange-traded futures, because exchanges always allow custom notional amounts on request",
        "OTC derivatives, because contracts are privately negotiated and can be tailored precisely to a counterparty's need",
        "Central clearing, because CCPs create bespoke contracts for end users",
        "It cannot be hedged at all outside of standardized lot sizes"
      ],
      answer: 1,
      why: "OTC (over-the-counter) derivatives are customized and privately negotiated between two parties or with a dealer, so a manufacturer can get an exact quantity/date match as long as a counterparty is willing to take the other side. The 'exchanges always allow custom notional amounts' answer is wrong because exchange-traded contracts are standardized precisely because that standardization is what enables their liquidity and easy clearing — you cannot get an arbitrary custom size there. The 'CCPs create bespoke contracts' answer confuses central clearing (a clearing mechanism) with a source of custom terms."
    },
    {
      q: "Which market participant tier is MOST likely to carry outsized counterparty risk relative to the economic size of its derivatives trades?",
      options: [
        "Large players, because they trade the largest notional volumes",
        "Medium players, because they trade a narrower product range",
        "End users, because they often don't post collateral and deal with few counterparties",
        "All tiers carry proportionally identical counterparty risk once netting is applied"
      ],
      answer: 2,
      why: "End users (corporates, sovereigns, small financial institutions) typically transact with few counterparties and often avoid posting collateral frequently (or post only illiquid collateral), so their uncollateralized exposure can be large relative to their narrow, hedging-focused trade size. The 'large players trade the largest notional volumes' answer is wrong because large players are the most collateralized, active participants and generally manage this risk best precisely because of their scale and dealer role."
    },
    {
      q: "A counterparty defaults on an unrelated bank loan that has nothing to do with your derivatives contract with them. Under a standard ISDA Master Agreement, can this still trigger default on YOUR contract?",
      options: [
        "No — only a failure to pay or deliver under this specific contract can trigger default",
        "Yes, via the cross-default provision, which allows a default on another, unrelated obligation to trigger default here too",
        "No — bankruptcy is the only event of default that can be triggered by external obligations",
        "Yes, but only if the counterparty also breaches the schedule's negotiated terms"
      ],
      answer: 1,
      why: "Cross-default is one of the eight events of default under the ISDA Master Agreement and specifically allows a default on another, unrelated obligation of the same counterparty to trigger termination of this agreement. The 'only a failure to pay/deliver under this specific contract' answer wrongly assumes default can only arise from within the contract itself; the 'only bankruptcy' answer incorrectly limits external triggers to bankruptcy only."
    },
    {
      q: "A risk manager reports a one-month 99% VaR of $500,000. What does this figure actually mean?",
      options: [
        "The fund expects to lose an average of $500,000 per month, 99% of the time",
        "The fund expects to lose no more than $500,000 in a month, 99% of the time (i.e., a 1% chance of losing more)",
        "The fund's maximum possible loss in any month is capped at $500,000",
        "The fund will lose exactly $500,000 in the worst 1% of months"
      ],
      answer: 1,
      why: "VaR is a threshold statement: there is a 99% probability the month's maximum loss will not exceed $500,000, equivalently a 1% probability the loss exceeds it. The 'average loss of $500,000' answer confuses VaR with an average-loss statement (that's closer to what Expected Shortfall measures within the tail). The 'maximum possible loss is capped' answer is wrong because VaR does not cap the loss — it says nothing about how bad losses can get beyond the threshold, which is exactly the gap Expected Shortfall fills. The 'will lose exactly $500,000 in the worst 1% of months' answer wrongly implies a single fixed loss value rather than a probability boundary."
    },
    {
      q: "Which of the following is NOT a benefit of central clearing through a CCP relative to bilateral trading?",
      options: [
        "Multilateral netting keeps the CCP market-neutral across all cleared trades",
        "Loss mutualization spreads a defaulting member's shortfall across the surviving membership",
        "Central clearing completely eliminates counterparty credit risk for all participants",
        "The CCP facilitates an orderly close-out process, typically via auction of the defaulter's positions"
      ],
      answer: 2,
      why: "Central clearing significantly REDUCES counterparty risk through multilateral netting, margining, and loss mutualization, but it does not eliminate it — the CCP itself becomes a concentrated point of risk that must be extremely well-capitalized, since its own failure would be a systemic shock. The multilateral netting, loss mutualization, and orderly close-out answers are all genuine, source-supported benefits of the CCP structure."
    },
    {
      q: "A monoline insurance company guarantees bond repayments via credit wraps and, in normal conditions, posts no collateral while holding a AAA rating. What happened to monolines during the 2007–2009 crisis?",
      options: [
        "They were unaffected because their AAA ratings were contractually guaranteed regardless of losses",
        "As insurance losses mounted, they lost their high ratings and were forced to post collateral at the worst possible time, contributing to several failures",
        "They were converted into CCPs by regulators to absorb systemic losses",
        "Their bankruptcy-remote structure fully protected policyholders from any losses"
      ],
      answer: 1,
      why: "Monolines relied on never posting collateral under normal conditions, but as GFC-era insurance valuation losses mounted, they lost their AAA ratings and were consequently forced to post collateral exactly when their insured losses were increasing — the worst possible timing — which drove several monolines to fail. The 'bankruptcy-remote structure fully protected policyholders' answer describes SPV bankruptcy-remoteness logic, not monolines, and is also not fully accurate even for SPVs (US courts sometimes consolidated SPV assets with the sponsor)."
    }
  ],

  sources: [
    { title: "Central counterparty clearing (Wikipedia)", url: "https://en.wikipedia.org/wiki/Central_counterparty_clearing", note: "Overview of how CCPs interpose themselves between counterparties, novation, and margin/default-fund mechanics." },
    { title: "ISDA Master Agreement (Investopedia)", url: "https://www.investopedia.com/terms/i/isda.asp", note: "Plain-language walkthrough of what the ISDA Master Agreement standardizes and why it matters for OTC derivatives." },
    { title: "Value at Risk (VaR) (Investopedia)", url: "https://www.investopedia.com/terms/v/var.asp", note: "Definition, interpretation, and common pitfalls of VaR — useful for correctly reading VaR statements like the ones tested here." },
    { title: "OTC derivatives statistics (BIS)", url: "https://www.bis.org/statistics/derstats.htm", note: "Bank for International Settlements data on the scale and composition of the global OTC derivatives market referenced by the large-player/medium-player/end-user breakdown." }
  ],

  pdf: { book: 2, query: "Traditional, noncleared markets rely on bilateral trades" },

  summary: `<p><strong>Exchange-traded</strong> (standardized, centrally margined, easy unwind) vs. <strong>OTC</strong> (customized, bilateral or centrally cleared by choice, potentially costly unwind) — and the finer four-way split by collateralization (exchange traded, OTC centrally cleared, OTC collateralized, OTC uncollateralized). <strong>Market tiers</strong>: large players (~80% of OTC notional), medium players, end users (often don't post collateral — outsized risk relative to trade size). <strong>ISDA Master Agreement</strong> governs bilateral OTC trades: collateral terms, eight events of default (failure to pay/deliver and bankruptcy most common), netting, close-out — the legal chassis R33-34 build on. <strong>Credit derivatives</strong> (CDS, TRS, credit spread options) hedge third-party credit risk while creating new counterparty risk between the two derivative parties. The <strong>CCP</strong> reduces (not eliminates) counterparty risk via multilateral netting, margin, and loss mutualization, but carries its own systemic and legal risks. <strong>SPVs, DPCs, monolines, and CDPCs</strong> are legacy structures that relabel rather than eliminate counterparty risk — and each failed in characteristic ways during 2007–2009. <strong>VaR, PFE, and expected shortfall</strong> round out the quantitative toolkit for modeling this risk, each with its own horizon, target, and blind spot.</p>`
});
