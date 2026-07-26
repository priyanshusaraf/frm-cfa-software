export default ({
  book: 2, reading: 32,
  session: "Counterparty Risk Management",
  title: "Counterparty Risk and Beyond",
  tagline: "The key distinction: counterparty risk is bilateral and its future value is highly uncertain, unlike lending risk, which is unilateral and reasonably certain.",

  teaches: `<p>This reading defines <strong>counterparty risk</strong>, the risk that the other side of a derivative or securities-financing trade is unable or unwilling to honor its obligations, and drills into exactly how it differs from ordinary lending risk. It then walks through the concrete transactions that carry counterparty risk (repos, securities lending, interest rate swaps, FX forwards, credit default swaps), the terminology used to describe and quantify exposure (credit exposure, credit migration, mark-to-market, replacement cost, default probability, recovery rate, loss given default), the toolkit institutions use to manage and mitigate it (high-quality counterparties, cross-product netting, close-out, collateralization, walkaway features, diversification, central clearing), how counterparty risk is quantified at three different levels (trade, counterparty, portfolio) with CVA and credit limits as complementary tools, the lifetime economic costs of an OTC derivative, and the family of "xVA" adjustments (CVA, DVA, FVA, ColVA, KVA, MVA) that price those costs into a trade.</p>`,

  why: `<p>This uncertainty about WHO owes WHOM, and how much, is exactly why derivatives credit risk needs its own exposure-modeling machinery (R36) instead of just reusing loan EAD (exposure at default), a loan's exposure is basically fixed and known (the outstanding balance); a derivative's exposure is a distribution over possible future values that can flip sign as markets move. Everything downstream in this study session, netting (R33), collateral (R34), central clearing (R35), and the CVA formula itself (R37), exists specifically to shrink or price the bilateral, uncertain exposure this reading defines. Understanding the plumbing here (what a repo haircut actually does, why an interest rate swap has less counterparty risk than a loan of the same notional, why wrong-way risk makes CDS especially dangerous) is what lets the later, more mathematical readings make sense instead of feeling like abstract formulas.</p>`,

  intuition: `<p>Lending risk: you know roughly what you're owed (the loan balance), and only one party can owe the other: the borrower can default on the lender, but the lender can never "default" on the borrower in the same sense. Counterparty risk: either side could end up owing the other, and by how much depends entirely on where the market moves, a genuinely two-sided, uncertain-magnitude risk that a single EAD number cannot capture. Picture an interest rate swap between Bank A (pays fixed) and Bank B (pays floating). If rates rise, floating payments exceed fixed payments and the swap has positive value to A (B effectively owes A), but if rates had fallen instead, the swap would have positive value to B (A would owe B). Neither party knows in advance which of them will be "the lender" in this relationship, or by how much. That is the core idea this reading builds everything else on.</p>`,

  visual: `<div class="widget" data-widget="counterparty-vs-lending" data-caption="Lending risk (one direction, known amount) vs. counterparty risk (either direction, uncertain amount) as rates move."></div>`,

  formulas: [
    {
      name: "Repo haircut: collateral required for a given cash loan",
      math: "\\text{Collateral required} = \\dfrac{\\text{Loan amount}}{1 - \\text{Haircut}}",
      plain: "This says the amount of collateral securities a repo lender must demand is the cash loaned, grossed up by the haircut percentage, so that even if the collateral's market value falls by the haircut amount before the loan matures, the lender is still fully covered.",
      derivation: `<p>A haircut is a percentage buffer applied to collateral to protect the cash lender against (1) a decline in the collateral's market value and (2) the borrower failing to repurchase the securities at maturity. If \\( h \\) is the haircut and \\( L \\) is the cash loan amount, the lender wants collateral \\( C \\) such that even after the haircut is "used up," the remaining value still covers \\( L \\):</p>
      <p>\\[ L = C \\times (1 - h) \\quad\\Rightarrow\\quad C = \\dfrac{L}{1 - h} \\]</p>
      <p>Worked example: on a \\( \\$100 \\) million loan with a \\( 2\\% \\) haircut, \\( C = \\dfrac{\\$100\\,\\text{million}}{1 - 0.02} = \\dfrac{\\$100\\,\\text{million}}{0.98} \\approx \\$102.04 \\) million of securities must be posted as collateral, about \\( \\$2.04 \\) million more than the cash lent, which is exactly the cushion the haircut is meant to provide.</p>`,
      note: "A repo is a short-term (sometimes overnight) collateralized loan: the seller/borrower sells securities for cash and agrees to buy them back later at a set price; the repo rate paid is a risk-free rate plus a counterparty-risk charge. Even with a haircut, counterparty risk is not eliminated: the seller may fail to repurchase at maturity (forcing the buyer to liquidate the collateral), and the collateral's value can still fall below what's needed to make the lender whole."
    },
    {
      name: "Loss given default (LGD)",
      math: "\\text{LGD} = 1 - \\text{Recovery rate}",
      plain: "This says the fraction of an exposure you actually lose on default is one minus whatever fraction of your claim you manage to recover afterward.",
      note: "Example: a recovery rate of 70% implies LGD of 30%: meaning that if a counterparty defaults, the surviving party expects to recover 70 cents on the dollar of its claim and lose the remaining 30 cents. Recovery is usually ignored when pricing raw credit exposure (exposure is defined assuming zero recovery, i.e., the full replacement cost is treated as at risk), but recovery/LGD is essential once you move to actually pricing the expected loss (as in CVA, R37)."
    }
  ],

  concepts: [
    {
      name: "Bilateral, uncertain-value nature of counterparty risk",
      def: "The risk that a counterparty is unable or unwilling to meet its contractual obligations. Two things separate it from ordinary lending risk. It is bilateral, since either side can end up owing the other, and the amount at stake is not known in advance: it depends entirely on where markets travel over the life of the trade. Unless someone says otherwise, the term means PREsettlement risk, the risk of default between inception and the contract's end, rather than settlement risk, which is the brief spike while payments are actually exchanged.",
      intuition: "Think of an interest rate swap: at inception neither party knows whether rates will rise or fall over the swap's life, so neither party knows in advance whether it will end up 'owed' money (positive value) or 'owing' money (negative value) at any future date. The party that happens to be 'winning' (positive value) is the one exposed to the other's default, and which party that is can flip over the life of the trade.",
      example: "A mortgage loan: the bank knows the outstanding balance today and, absent prepayment, exactly what it's owed on any future date. Contrast a currency swap: the future value to either side depends on where the exchange rate ends up, which is unknown at inception and can favor either party.",
      pitfall: "This is exactly why derivatives credit risk needs its own exposure-modeling machinery (R36's expected exposure / potential future exposure framework) instead of reusing a loan's exposure-at-default (EAD), which is just the outstanding balance.",
      related: [{ r: 36, label: "R36: the exposure-modeling machinery this uncertainty demands" }],
      memory: "Lending: one-way street, known destination. Counterparty risk: two-way street, destination depends on the weather (market moves)."
    },
    {
      name: "Where counterparty risk shows up: securities financing transactions",
      def: "Securities financing transactions include repos and reverse repos, and securities borrowing and lending. A repo (\"repurchase agreement\") is a short-term lending agreement (as short as one day) secured by collateral: the seller/borrower sells securities to the buyer/lender for cash and agrees to repurchase those securities at a later date. The lender earns the repo rate, calculated as a risk-free rate plus a counterparty-risk charge. A haircut is applied to the collateral to protect against both the borrower's failure to repurchase and a decline in the collateral's market value before maturity. Securities borrowing and lending is economically the same transaction with securities (rather than cash) as the thing being lent, carrying similar counterparty risk.",
      intuition: "A haircut works like a security deposit that's bigger than the item's value: if you lend $100 million in cash, you don't just ask for $100 million of securities as collateral, you ask for a bit more (here, ~$102.04 million at a 2% haircut) so that even if the securities lose value or the borrower vanishes, you can sell the collateral and still get your $100 million back.",
      example: "On a $100 million loan with a 2% haircut, required collateral = $100M / (1 − 0.02) ≈ $102.04 million.",
      pitfall: "Collateral reduces but does NOT eliminate counterparty risk in a repo: the seller may still fail to repurchase at maturity (forcing the buyer to liquidate the collateral to recover cash), and the collateral's market value can decline below the level needed to make the lender whole even after the haircut.",
      related: []
    },
    {
      name: "Where counterparty risk shows up: OTC derivatives",
      def: "OTC (over-the-counter, i.e., privately negotiated rather than exchange-traded) derivatives include interest rate swaps (the bulk of the market by notional), foreign exchange transactions (especially FX forwards), and credit default swaps (CDS). Exchange-traded derivatives, by contrast, carry essentially NO counterparty risk to the trading parties because the exchange itself is the counterparty to every trade (via novation to a central counterparty), so this reading's focus is deliberately on OTC instruments and securities financing.",
      intuition: "Compare an interest rate swap to a plain loan of the same notional: the swap is much less risky because there's no exchange of principal, only the NET difference between the fixed and floating cash flows changes hands periodically (this is netting in miniature). If a counterparty defaults, the other side simply stops making its own payments too, so the maximum loss is far smaller than the notional.",
      example: "FX forwards carry LARGE counterparty risk despite this netting logic, because they typically DO involve exchange of full notional amounts (principal exchange) at maturity, and often have long maturities, which raises the probability that a default occurs at some point before settlement. CDS carry large counterparty risk both because of high volatility in the reference credit and because of wrong-way risk (see the misconceptions/high-yield sections): the CDS protection seller is often correlated with the very credit event being insured against.",
      pitfall: "Don't assume all OTC derivatives carry equal counterparty risk, interest rate swaps (no principal exchange, netting-friendly) are comparatively low-risk per unit of notional; FX forwards and CDS are comparatively high-risk.",
      related: [{ r: 37, label: "R37: CVA prices exactly this risk" }]
    },
    {
      name: "Wrong-way risk (introduced via the CDS example)",
      def: "Wrong-way risk is an increase in exposure to a counterparty that happens AT THE SAME TIME the counterparty's own credit quality is worsening, the two move together in the worst possible direction.",
      intuition: "The classic example: a firm holds Greek sovereign debt and buys credit protection (a CDS) on that debt from a Greek bank to hedge its risk. If Greek sovereign credit quality deteriorates, the firm is 'winning' on the CDS (its claim on the Greek bank grows), but the Greek bank's own ability to pay is ALSO impaired by the same deterioration in Greek sovereign credit, because the bank's fortunes are tied to its home sovereign. The hedge becomes least reliable exactly when it's needed most.",
      example: "Buying CDS protection on Greek debt from a Greek bank; buying protection on a homebuilder's debt from a regional bank heavily exposed to that same housing market.",
      pitfall: "Don't confuse wrong-way risk with simply 'the counterparty might default', it specifically refers to the CORRELATION between rising exposure and worsening counterparty credit quality, which makes CDS structurally more dangerous than a naive notional-based risk assessment would suggest.",
      related: [{ r: 37, label: "R37: wrong-way risk modeling methods are covered in full" }]
    },
    {
      name: "Institutions that take on counterparty risk: large, medium, small players",
      def: "Institutions taking on counterparty risk through trading (\"derivatives players\") fall into three tiers. Large players are large dealer banks trading with each other and many clients, covering a wide range of asset classes (commodities, equity, FX, interest rate, credit derivatives) with high trade volumes, and they post collateral against their positions. Medium players are smaller banks/financial institutions with high volume and many clients but narrower asset-class coverage than large players; they likely (but not definitely) post collateral. Small players are sovereigns, large corporations, or smaller financial institutions with narrow, specific derivatives needs, trading with only a few counterparties, holding few OTC positions, typically specializing in just one asset class, and if they post collateral at all, it is often illiquid.",
      intuition: "The 'small players' tier maps directly onto R31's 'end users': corporates/sovereigns hedging a narrow need who often don't post collateral, and therefore carry outsized counterparty risk relative to the size of their trades, because the dealer bank on the other side has little protection if the end user defaults.",
      example: "A global systemically important bank (large player) trading interest rate swaps with hundreds of counterparties across every asset class vs. a mid-sized regional airline (small player) that enters a single jet-fuel swap to hedge fuel costs with one dealer bank.",
      related: []
    },
    {
      name: "Counterparty risk terminology",
      def: "The vocabulary this whole topic is written in. Credit exposure is the loss CONDITIONAL on default, so it is the replacement cost of the position rather than the full principal. Credit migration is the counterparty's rating moving either way over the term. Mark-to-market is today's value of every contract with that counterparty, and replacement cost is what an equivalent position would actually cost to put on now, which differs from mark-to-market by transaction costs and bid-ask spread. Default probability comes in a historical flavour and a market-implied risk-neutral flavour. Recovery rate is what you get back, and loss given default is one minus that.",
      intuition: "On the term structure of default probability: empirically there is mean reversion in credit quality, strong-rated counterparties tend to drift DOWN over time (so their default probability RISES the further out you look), while weak-rated counterparties tend to drift UP or simply default earlier (so their per-period default probability tends to FALL for periods further in the future, since the ones that were going to default have often already done so by then). This is a frequently tested, counterintuitive point: near-term default probability for a low-quality name can be higher than its own longer-term default probability.",
      example: "A recovery rate of 70% implies an LGD of 30%: if a $10 million exposure counterparty defaults, the expected recoverable amount is $7 million and the expected loss is $3 million (before considering the probability of default itself).",
      pitfall: "Don't equate MtM with 'the risk': MtM by itself ignores netting, collateral, and hedging, all of which are exactly the mitigants this reading previews and later readings formalize.",
      related: [{ r: 36, label: "R36: turns exposure into a full time-profile (EE, PFE, EPE)" }],
      memory: "Exposure = conditional loss if they default. Recovery + LGD always sum to 1."
    },
    {
      name: "CVA and credit limits are complementary, not substitutes",
      def: "Two counterparty-risk controls that answer different questions and are easy to mistake for substitutes. Credit value adjustment (CVA) is a PRICE: the piece of a derivative's value that pays for the counterparty's possible default, applied at the trade and counterparty levels. A credit limit is a CAP: a hard ceiling on total exposure to one name, applied at the portfolio level. Because they sit at different levels they even pull in opposite directions. CVA rewards concentrating trades with fewer counterparties to maximize netting; credit limits reward spreading them across more counterparties to get diversification.",
      pitfall: "A trade can PASS a CVA charge and still be BLOCKED by breaching an aggregate limit, and vice versa, the two mechanisms operate independently and can disagree. This is one of the most frequently tested conceptual points in this reading.",
      related: [{ r: 37, label: "R37: CVA formalized in full" }],
      memory: "CVA prices the risk; limits cap the risk. Passing one doesn't guarantee passing the other."
    },
    {
      name: "Mitigation toolkit (preview of R33-35)",
      def: "Two lists worth keeping apart. Managing counterparty risk is about choosing not to take it: deal only with high-quality names, net across products, close out on default, take collateral, write in walkaway features, diversify, or push the trade to a central counterparty. Mitigating it is the narrower job of shrinking risk you have already taken, and only four tools do that: netting, collateralization, hedging (which trades the exposure for a new one on the hedge provider, plus market risk), and central counterparties.",
      intuition: "Trading only with high-quality counterparties works because a AAA-rated name is unlikely to default in the first place, so you don't need the operational overhead of collateral. Cross-product netting and close-out work because they collapse many separate exposures (some positive, some negative) into a single net number, which is smaller than the sum of only the positive legs. Collateral works by literally securing the exposure with posted assets. Walkaway features work asymmetrically, they only help the non-defaulting party, and only when that party currently owes money.",
      example: "Ondine Financial has an interest rate swap with Scarbo with a current MtM of −$1 million to Ondine (Ondine owes $1 million). If Scarbo defaults, a walkaway clause is the MOST advantageous mitigant for Ondine, because it lets Ondine cancel the $1 million liability rather than being forced to pay it out under netting or close-out.",
      pitfall: "Central counterparties don't eliminate counterparty risk so much as REDISTRIBUTE and CENTRALIZE it, and because they reduce each party's incentive to carefully monitor its counterparties, they introduce operational, liquidity, and systemic risk (a failure at the CCP itself can shock the whole system).",
      related: [{ r: 33, label: "R33: netting and close-out formalized" }]
    },
    {
      name: "Lifetime economic costs of an OTC derivative",
      def: "A trade's economic costs depend on whether its MtM is positive or negative. Positive MtM (in the money): counterparty risk and funding costs arise on the UNCOLLATERALIZED portion (the part not covered by posted collateral); for the collateralized portion, the COUNTERPARTY chooses what type of collateral to post. Negative MtM (out of the money): counterparty risk arises from the party's OWN potential default; a funding BENEFIT arises on any collateral not posted (you get to keep using that cash/assets elsewhere); for the collateralized portion, the party ITSELF chooses what collateral to post. In either case, funding costs also arise from the capital needed to support the transaction and any initial margin required.",
      intuition: "Whoever is 'in the money' on a trade cares about whether the other side will actually pay; whoever is 'out of the money' is the one whose own default risk matters to the counterparty. Costs and benefits mirror each other across the two sides of the same trade, this symmetry is exactly what motivates DVA (the mirror image of CVA) later in the reading.",
      related: [{ r: 37, label: "R37: DVA and bilateral CVA formalize this symmetry" }]
    },
    {
      name: "The xVA family",
      def: "Textbook derivative pricing quietly assumes four things that are all false: that your counterparty never defaults, that money to fund the position is free, that collateral is free and frictionless, and that regulatory capital costs nothing. Each assumption, once you charge for it, becomes one adjustment to the price. xVA is the collective name for that stack. You start from the idealised risk-free value and subtract the cost of each real-world friction to reach the price a desk can actually trade at.",
      intuition: "Take the four false assumptions one at a time and each adjustment writes itself. The counterparty might default while owing you: that expected loss is CVA, a cost. But the same logic runs the other way, because YOU might default while owing them, and from your own books that possibility is a benefit, since a defaulter does not pay in full. That is DVA. Money is not free: an uncollateralised trade that is in your favour has effectively lent cash to the counterparty, and you must fund that position at your own borrowing rate rather than the risk-free rate, which is FVA. Collateral is not frictionless: a collateral agreement usually lets the poster choose which currency or which securities to deliver, and a choice is an option with a value, which with any other non-standard collateral terms is ColVA. Capital is not free: the trade consumes regulatory capital for its whole life and shareholders want a return on that capital, so the present value of carrying it is KVA. Finally, initial margin has to be posted and, unlike variation margin, cannot be reused, so it must be funded separately for the life of the trade: MVA.",
      counter: "The signs are not uniform, and assuming they all reduce the price is the fastest way to get one wrong. CVA, KVA and MVA are costs. DVA is a benefit. FVA and ColVA cut both ways: FVA is a cost when you are in the money and must fund the position, and a benefit when you are out of the money and are effectively being funded by the counterparty (the two halves are sometimes split out as funding cost adjustment and funding benefit adjustment). Beyond Schweser, and flagged so you do not mistake it for something GARP will test: FVA and DVA overlap economically, because both partly price your own credit standing, and whether counting both double-counts was a genuine and public dispute among dealers when FVA was first adopted.",
      example: "Two pairs get mixed up constantly, and both are about WHAT is being funded or WHOSE default is in question. FVA against MVA: FVA funds your EXPOSURE, the money you are effectively out on an uncollateralised or variation-margined position; MVA funds your INITIAL MARGIN, a separate gross amount posted up front and held segregated, which is why it needs its own adjustment rather than folding into FVA. CVA against DVA: same event type, opposite defaulter. CVA is the counterparty defaulting on you, DVA is you defaulting on them.",
      pitfall: "Do not conflate CVA and DVA: CVA is the cost of the COUNTERPARTY defaulting on you; DVA is a benefit that arises from the possibility of YOUR OWN default (from the counterparty's perspective, you defaulting is bad for them but good for your own book value, which is the counterintuitive part explored fully in R37). The genuinely uncomfortable consequence, worth sitting with because it is what makes DVA memorable: as your own credit quality DETERIORATES, your DVA rises and your books record a gain. Nothing about your business improved. You simply became more likely to default on obligations you would then not have to settle in full.",
      related: [{ r: 37, label: "R37: CVA/DVA/BCVA calculated explicitly" }],
      memory: "C-D-F-Col-K-M: Credit, Debt, Funding, Collateral, Capital, Margin."
    }
  ],

  connections: {
    from: [
      { r: 31, why: "Establishes the derivatives context; this reading sharpens the specific bilateral-uncertainty distinction." }
    ],
    to: [
      { r: 36, why: "The exposure uncertainty described here becomes the exposure-modeling machinery (EE, PFE, EPE)." },
      { r: 37, why: "The CVA-vs-credit-limits complementary relationship gets fully priced out, along with DVA, wrong-way risk, and the xVA terms previewed here." },
      { r: 33, why: "Cross-product netting and close-out, only sketched here, get formalized with the ISDA Master Agreement and multilateral netting mechanics." },
      { r: 35, why: "Central counterparties, mentioned here as a mitigant, are examined in full (novation, loss waterfalls, margin)." }
    ],
    confused: [
      { what: "CVA vs credit limits", how: "CVA is a PRICE (trade/counterparty level); credit limits are a CAP (portfolio level). They're independent checks, a trade can pass one and fail the other." },
      { what: "Managing vs. mitigating counterparty risk", how: "There are two overlapping but distinct lists: 'managing' includes high-quality counterparties, netting, close-out, collateral, walkaway, diversification, and CCPs; 'mitigating' is a narrower operational list (netting, collateral, hedging, CCPs) describing HOW existing exposure is reduced once it exists. Don't treat them as one undifferentiated list on the exam, walkaway features and trading only with high-quality counterparties are 'managing' tools, not typically framed as 'mitigating' tools." },
      { what: "CVA vs DVA", how: "CVA prices the risk that the COUNTERPARTY defaults on you (a cost to you); DVA prices the risk that YOU default (a benefit to your own book value, mirroring the cost to the counterparty)." }
    ]
  },

  misconceptions: [
    { wrong: "\"If a trade passes its CVA charge, it will also be approved under the bank's credit limits.\"", right: "CVA and credit limits are complementary but INDEPENDENT checks, a trade can pass its CVA pricing and still be blocked by an aggregate portfolio-level limit breach, or vice versa." },
    { wrong: "\"Counterparty risk in derivatives is unilateral, like lending risk.\"", right: "It's BILATERAL: either party could end up owing the other, and the magnitude is highly uncertain, depending on future market moves. This is fundamentally different from a loan's roughly known, one-directional exposure." },
    { wrong: "\"Exchange-traded derivatives carry MORE counterparty risk than OTC derivatives because more parties are involved.\"", right: "The opposite: exchange-traded derivatives carry essentially no counterparty risk to either party because the EXCHANGE (via its clearing mechanism) becomes the counterparty to every trade. This reading's entire focus is OTC derivatives and securities financing precisely because exchange-traded instruments are set aside." },
    { wrong: "\"A CSD/repo haircut of 2% means you post $100 million of collateral to borrow $98 million.\"", right: "It's the reverse: you post MORE than the loan amount. On a $100 million LOAN with a 2% haircut, you post collateral of $100M / (1 − 0.02) ≈ $102.04 million, the haircut is applied to shrink the loan-to-collateral ratio for the lender's protection, not to shrink the collateral amount itself." },
    { wrong: "\"Wrong-way risk just means the counterparty might default: it's the same idea as ordinary counterparty risk.\"", right: "Wrong-way risk specifically means exposure to the counterparty INCREASES at the same time the counterparty's own credit quality WORSENS, a correlation between the two, not simply the existence of default risk. The Greek-sovereign/Greek-bank CDS example shows the hedge failing exactly when it's needed most." }
  ],

  highYield: [
    { stars: 3, what: "Counterparty risk's bilateral, uncertain nature vs. lending risk's unilateral, certain nature.", why: "The conceptual foundation for why R36's exposure machinery is necessary at all." },
    { stars: 3, what: "CVA and credit limits as complementary, independent checks operating at different levels (trade/counterparty vs. portfolio).", why: "A clean, frequently tested 'these are not substitutes' conceptual point, often tested with a scenario where one passes and the other fails." },
    { stars: 2, what: "Repo haircut mechanics and the worked calculation (collateral = loan / (1 − haircut)).", why: "A concrete, calculable LO that shows up as a numeric question." },
    { stars: 2, what: "Wrong-way risk, illustrated via the Greek sovereign CDS example.", why: "Tests whether you understand the CORRELATION concept, not just the vocabulary word; also a bridge into R37's wrong-way-risk modeling section." },
    { stars: 2, what: "Walkaway feature is only advantageous when your OWN MtM is negative and the counterparty defaults.", why: "Frequently tested as an applied scenario question (e.g., the Ondine/Scarbo swap example) rather than a definition question." },
    { stars: 1, what: "The three tiers of derivatives players (large/medium/small) and their collateral-posting habits.", why: "Occasionally tested for recognition of which tier a described institution belongs to." }
  ],

  recall: [
    { q: "Why can't a bank simply use a loan's EAD concept to measure a derivative's counterparty exposure?", a: "A loan's exposure is roughly fixed and known (the outstanding balance), and only one party can be owed. A derivative's value can be positive or negative for either party depending on market moves, the exposure is bilateral and genuinely uncertain in magnitude, requiring a full exposure DISTRIBUTION (R36's EE/PFE/EPE) rather than a single known number." },
    { q: "A proposed trade has an acceptable CVA charge but would push the bank's aggregate exposure to that counterparty over its credit limit. What happens, and what does this reveal about CVA vs. credit limits?", a: "The trade is blocked despite passing its CVA pricing: this reveals that CVA (trade/counterparty-level pricing) and credit limits (portfolio-level caps) are complementary, INDEPENDENT controls, not substitutes for each other. Passing one doesn't guarantee passing the other." },
    { q: "On a $100 million cash loan with a 2% haircut, how much collateral must the borrower post, and why is it MORE than $100 million?", a: "Collateral = $100M / (1 − 0.02) ≈ $102.04 million. It's more than the loan because the haircut is a cushion: if the collateral's market value falls or the borrower fails to repurchase, the lender needs the extra buffer to still recover the full $100 million." },
    { q: "Why does an interest rate swap carry less counterparty risk than a loan of the same notional?", a: "A swap involves no exchange of principal: only the net difference between fixed and floating cash flows is exchanged periodically (an informal form of netting), and if the counterparty defaults, the other side simply stops making its own payments. A loan's full principal is at risk of not being repaid." },
    { q: "What is wrong-way risk, and how does the Greek sovereign CDS example illustrate it?", a: "Wrong-way risk is an increase in exposure to a counterparty at the same time that counterparty's own credit quality worsens. In the example, a firm buys CDS protection on Greek sovereign debt from a Greek bank; if Greek credit deteriorates, the firm's claim on the bank grows (it's 'winning') but the Greek bank's own ability to pay is simultaneously impaired by the same deterioration, the hedge weakens exactly when it's needed most." },
    { q: "Ondine has a swap with Scarbo currently worth −$1 million to Ondine (Ondine owes money). Scarbo defaults. Which mitigation technique is most advantageous to Ondine, and why?", a: "A walkaway feature: it lets Ondine cancel the transaction and avoid paying the $1 million it currently owes, since Scarbo (the defaulter) can no longer enforce the claim. Netting and close-out would instead require Ondine to actually make that $1 million payment; collateralization isn't relevant to this specific scenario." }
  ],

  hooks: [
    { title: "Two-way street vs one-way street", text: "Lending risk is a one-way street: you know who owes whom. Counterparty risk is a two-way street where the direction and size of the debt depend on which way the market wind blows." },
    { title: "The haircut cushion", text: "A haircut doesn't shrink the collateral you post: it GROWS it. Think of it as the lender saying: 'I want more security than the cash I'm handing over, in case that security loses value before I get my cash back.'" },
    { title: "Wrong-way risk = the umbrella that melts in the rain", text: "You buy an umbrella (CDS) from a shop that only makes money when it's sunny. The day it rains hardest (exactly when you need the umbrella) is the day the shop is most likely to be unable to sell you one. That's wrong-way risk." }
  ],

  eli5: `<p>Imagine you and a friend make a bet on next week's weather, whoever loses owes the winner $50. Right now, neither of you knows who will end up owing whom, because it depends on something (the weather) that hasn't happened yet. That's completely different from a normal loan, where you already know exactly who owes whom and how much (you borrowed $500, you owe $500). Now imagine your friend is also broke and might not be able to pay even if they lose the bet, and worse, imagine the exact same bad luck that makes your friend "lose" the bet (say, a storm that ruins both the bet's outcome and your friend's finances) also makes it more likely your friend can't pay up. That two-sided uncertainty (who owes whom, plus whether they can actually pay, potentially at the worst possible moment) is exactly what counterparty risk in derivatives trading is, as opposed to a plain loan, where only the borrower can default and the amount owed never changes.</p>`,

  thinkLike: `<p>A counterparty risk manager's job starts with a mental habit worth drilling: for every OTC trade, ask "which of us could end up owing the other, and does that answer change if the market moves?", not "who owes whom right now?" Keeping that question live is most of the work, and it is exactly what a question probes when it describes a transaction and asks whether the risk is bilateral or unilateral, or whether a specific mitigant (walkaway, netting, collateral) actually helps in the SPECIFIC MtM scenario given (recall the Ondine/Scarbo question: the "right" mitigant depends entirely on whether your own MtM is currently positive or negative).</p><p>The second habit: treat CVA and credit limits as two independent gates a trade must clear, not one combined check, Expect scenario questions where a trade clears one gate and fails the other, precisely because in practice trading desks and credit risk committees really do run these as separate, sometimes conflicting, processes (CVA desks want fewer, bigger counterparty relationships for netting efficiency; credit officers want more, smaller ones for diversification). When you see a question describing a trade's status against "the CVA charge" and separately against "the counterparty's credit limit," expect the answer to hinge on treating these as genuinely separate constraints.</p>`,

  breakdown: [
    {
      title: "Transactions that carry counterparty risk",
      points: [
        "Repos and reverse repos: short-term, collateralized cash loans against securities; counterparty risk remains even after a haircut, since the seller may fail to repurchase or the collateral may lose value.",
        "Securities borrowing and lending: economically a repo with securities (not cash) as the item lent; similar counterparty risk profile.",
        "Interest rate swaps: the bulk of the OTC derivatives market by notional; lower counterparty risk than a loan of equal notional because there's no principal exchange, only net cash-flow differences.",
        "FX forwards: carry large counterparty risk because they typically DO involve exchange of full notional amounts, and often have long maturities, raising the odds a default occurs at some point before maturity.",
        "Credit default swaps (CDS): carry large counterparty risk due to high volatility in the reference credit and wrong-way risk (exposure and counterparty credit quality can deteriorate together)."
      ]
    },
    {
      title: "Tiers of institutions that take on counterparty risk",
      points: [
        "Large players: large dealer banks; trade with each other and many clients; wide asset-class coverage (commodities, equity, FX, rates, credit); high volume; DO post collateral.",
        "Medium players: smaller banks/financial institutions; high volume, many clients, but narrower asset-class coverage than large players; likely (not certain) to post collateral.",
        "Small players: sovereigns, large corporates, or smaller financial institutions with a narrow hedging need; few counterparties, few trades, usually specialize in one asset class; collateral, if posted at all, is often illiquid."
      ]
    },
    {
      title: "Counterparty risk terminology",
      points: [
        "Credit exposure: the loss conditional on the counterparty defaulting; combines current exposure, future exposure, and contingent liabilities, using replacement cost (assuming zero recovery), not the full notional.",
        "Credit migration: the possibility a counterparty's credit rating deteriorates or improves over the contract term; mean reversion means strong ratings tend to drift down (rising future default probability) and weak ratings tend to drift up or default early (falling future default probability further out).",
        "Recovery / recovery rate: the portion of a claim actually recovered after default (e.g., 70% recovery).",
        "Mark-to-market (MtM): the current value of all contracts with a counterparty; a proxy for replacement cost that ignores netting, collateral, and hedging.",
        "Replacement cost: what it would cost to replace the position today; close to but not identical to MtM (transaction costs, bid-ask spreads create the gap).",
        "Default probability: real/historical measure (actual observed probability) vs. risk-neutral measure (theoretical, market-implied probability).",
        "Loss given default (LGD): 1 minus the recovery rate; the fraction actually lost on default."
      ]
    },
    {
      title: "Methods to manage counterparty risk",
      points: [
        "Trade only with high-quality counterparties: simplest method; typically AAA-rated names that may not even need to post collateral.",
        "Cross-product netting: aggregate positive- and negative-value trades with a counterparty into one net figure on default, reducing risk for both sides (subject to legal enforceability risk).",
        "Close-out: immediately close all contracts with a defaulted counterparty and net MtM values into a single payment or claim.",
        "Collateralization (margining): require collateral sufficient, in theory, to reduce net exposure to zero; posted periodically to limit transaction costs, but carries market, operational, and legal risk.",
        "Walkaway features: let a party cancel the transaction on the counterparty's default; advantageous specifically when your own MtM is negative.",
        "Diversification: spread trades across more counterparties to limit exposure to any single name's default.",
        "Exchanges and central counterparties (CCPs): take on the counterparty role for every trade, removing bilateral counterparty risk but potentially redistributing it into systemic risk."
      ]
    },
    {
      title: "Ways to mitigate counterparty risk once it exists (narrower operational list)",
      points: [
        "Netting: offset each party's required payments so only the net-owing party pays; effectiveness depends on how easily the payments can be offset.",
        "Collateralization: taking collateral ≥ notional theoretically eliminates counterparty risk, but adds administrative cost, liquidity risk (collateral may need to be sold at a discount), and legal risk (taking title can be slow).",
        "Hedging: using credit derivatives shifts counterparty exposure to your own clients onto a competitor's clients instead, which generates market risk in exchange.",
        "Central counterparties: centralize and settle risk, reducing bilateral exposure, but reduce parties' incentive to monitor counterparty risk carefully, generating operational, liquidity, and systemic risk."
      ]
    },
    {
      title: "The xVA family",
      points: [
        { point: "CVA (credit value adjustment): a cost. The counterparty's default risk to you.", explain: "The expected loss from the counterparty failing at a moment when the trade is in your favour and they owe you. Only the in-your-favour outcomes matter, because a default on a trade you are losing on costs you nothing." },
        { point: "DVA (debt value adjustment): a benefit. Your own default risk, seen from their side.", explain: "The counterparty runs the identical CVA calculation against you. What is a cost on their books appears as a benefit on yours, because a firm that defaults does not settle in full. It is the mirror image, not a separate risk." },
        { point: "FVA (funding value adjustment): cost or benefit. Funding the position itself.", explain: "An uncollateralised trade that is in your favour has effectively lent cash to the counterparty, and you fund that at your own borrowing rate, not the risk-free rate the textbook price assumed. In the money it is a cost; out of the money the counterparty is funding you, so it is a benefit." },
        { point: "ColVA (collateral value adjustment): cost or benefit. The optionality buried in the collateral agreement.", explain: "Collateral agreements usually let the poster choose the currency or the securities delivered, and choice is an option with real value: the poster delivers whatever is cheapest at the time. ColVA prices that embedded optionality along with any other non-standard collateral terms." },
        { point: "KVA (capital value adjustment): a cost. Carrying regulatory capital for the trade's life.", explain: "The trade consumes capital that must be held for as long as it lives, and shareholders expect a return on capital that is tied up. KVA is the present value of that carrying cost. It is the one adjustment that is not about cash changing hands." },
        { point: "MVA (margin value adjustment): a cost. Funding the initial margin.", explain: "Initial margin is posted up front, is held segregated and cannot be reused, so it has to be funded for the whole life of the trade. That is why it is separate from FVA: FVA funds the exposure, MVA funds the margin." }
      ]
    },
    {
      title: "Levels at which counterparty risk is quantified",
      points: [
        "Trade level: the nature of the specific trade and its own risk factors.",
        "Counterparty level: risk-mitigating factors (netting, collateral) applied for that individual counterparty.",
        "Portfolio level: overall counterparty risk across the book, recognizing only a small share of counterparties will default in any given period; this is where credit limits operate."
      ]
    }
  ],

  quiz: [
    {
      q: "Which of the following most accurately distinguishes counterparty risk from lending risk?",
      options: [
        "Counterparty risk is unilateral; lending risk is bilateral.",
        "Counterparty risk is bilateral and its future value is highly uncertain; lending risk is unilateral and its principal is reasonably certain.",
        "Counterparty risk only applies to exchange-traded derivatives; lending risk applies to OTC derivatives.",
        "There is no meaningful distinction: both are simply the risk that the other side defaults."
      ],
      answer: 1,
      why: "Counterparty risk is bilateral (either party could end up owing the other) and uncertain in magnitude because a derivative's value moves with the market. Lending risk is unilateral (only the borrower can default) and the principal at risk is known. The 'counterparty risk is unilateral; lending risk is bilateral' answer reverses the correct pairing; the 'counterparty risk only applies to exchange-traded derivatives' answer is wrong because exchange-traded derivatives largely avoid counterparty risk (the exchange is the counterparty), the opposite of what's stated; the 'no meaningful distinction' answer ignores the bilateral/uncertain distinction that is the entire point of the reading."
    },
    {
      q: "A cash lender in a repo transaction requires $100 million in cash to be secured by collateral, applying a 2% haircut. Approximately how much collateral must the borrower post?",
      options: [
        "$98.00 million",
        "$100.00 million",
        "$102.04 million",
        "$104.08 million"
      ],
      answer: 2,
      why: "Collateral = Loan / (1 − haircut) = $100M / (1 − 0.02) = $100M / 0.98 ≈ $102.04 million. The $98.00 million answer mistakenly subtracts the haircut from the loan rather than dividing by (1 − h); the $100.00 million answer ignores the haircut entirely; the $104.08 million answer roughly doubles the haircut's effect."
    },
    {
      q: "A trade's CVA charge is within acceptable limits, but booking it would push the bank's aggregate exposure to that counterparty over its portfolio-level credit limit. What is the most accurate conclusion?",
      options: [
        "The trade will be approved because CVA and credit limits measure the same thing, so passing CVA is sufficient.",
        "The trade will likely be blocked, illustrating that CVA (trade/counterparty level) and credit limits (portfolio level) are complementary, independent checks.",
        "The credit limit is irrelevant once CVA has been priced into the trade.",
        "This scenario is impossible because CVA already incorporates the portfolio-level credit limit."
      ],
      answer: 1,
      why: "CVA and credit limits operate at different levels (trade/counterparty vs. portfolio) and are complementary but independent, a trade can pass one and fail the other. The 'CVA and credit limits measure the same thing' and 'this scenario is impossible' answers wrongly assume the two measures are equivalent or that one subsumes the other; the 'credit limit is irrelevant' answer ignores that both checks are applied in practice."
    },
    {
      q: "Which of the following best illustrates wrong-way risk?",
      options: [
        "A firm buys CDS protection on Greek sovereign debt from a Greek bank; as Greek credit quality worsens, the Greek bank's own ability to pay is simultaneously impaired.",
        "A firm buys CDS protection on Greek sovereign debt from a highly-rated U.S. bank with no exposure to Greece.",
        "A bank lends to a borrower whose loan balance is fixed regardless of market conditions.",
        "An interest rate swap counterparty posts additional collateral as rates move against it."
      ],
      answer: 0,
      why: "Wrong-way risk is exposure that rises at the same time the counterparty's own credit quality deteriorates, the Greek bank/Greek sovereign CDS example is the textbook illustration because the protection seller's ability to pay is correlated with the very event being insured against. The 'protection from a highly-rated U.S. bank with no exposure to Greece' answer is actually the OPPOSITE (right-way or at least uncorrelated) since the U.S. bank's credit is unrelated to Greek sovereign risk; the 'fixed loan balance' answer describes plain lending risk, not wrong-way risk; the 'posts additional collateral as rates move against it' answer describes ordinary collateral mechanics, not a correlation between exposure and counterparty credit quality."
    },
    {
      q: "Ondine has an interest rate swap with Scarbo. Ondine's current position is a −$1 million mark-to-market value (Ondine owes Scarbo). Scarbo defaults. Which mitigation technique is most advantageous to Ondine in this specific scenario?",
      options: [
        "Close-out",
        "Collateralization",
        "Netting",
        "A walkaway feature"
      ],
      answer: 3,
      why: "Because Ondine currently owes money (negative MtM) and Scarbo is the one defaulting, a walkaway feature lets Ondine cancel the transaction and avoid paying the $1 million it owes. Close-out and netting would instead require Ondine to actually make that net payment; collateralization is not the relevant mitigant here since the question is about what happens upon default, not about ongoing collateral posting."
    },
    {
      q: "Which of the following methods of managing or mitigating counterparty risk is most likely to generate systemic risk?",
      options: [
        "Cross-product netting",
        "Collateralization",
        "Hedging with credit derivatives",
        "Central counterparties (CCPs)"
      ],
      answer: 3,
      why: "Central counterparties centralize counterparty risk into a small number of highly interconnected entities; if a CCP itself experiences distress, the shock can propagate across the whole financial system, which is precisely what systemic risk means. Cross-product netting and collateralization primarily create legal/operational/liquidity risk at the bilateral level rather than system-wide risk; hedging with credit derivatives shifts risk to a different counterparty's book and generates market risk, not systemic risk in the way a centralized CCP does."
    }
  ],

  sources: [
    { title: "OTC derivatives statistics: Bank for International Settlements", url: "https://www.bis.org/statistics/derstats.htm", note: "Source-quality data on the scale of the OTC derivatives market referenced when comparing interest rate swaps, FX forwards, and CDS by notional." }
  ],

  pdf: { book: 2, query: "Counterparty risk is the risk that a counterparty is unable or unwilling" },

  summary: `<p>Counterparty risk is <strong>bilateral</strong> (either side could owe the other) and <strong>highly uncertain in magnitude</strong> (depends on market moves), unlike lending risk's unilateral, roughly-known exposure; it typically refers to <strong>presettlement risk</strong>. It shows up in <strong>securities financing</strong> (repos, secured with haircut-adjusted collateral, e.g. ~$102.04M collateral on a $100M loan at a 2% haircut) and <strong>OTC derivatives</strong> (interest rate swaps, the bulk of the market and comparatively low-risk since no principal changes hands; FX forwards, high-risk due to principal exchange and long maturities; CDS, high-risk due to volatility and <strong>wrong-way risk</strong>, illustrated by the Greek sovereign/Greek bank CDS example). Institutions taking on this risk fall into <strong>large, medium, and small</strong> tiers based on volume, asset-class coverage, and collateral posting. Core terminology: <strong>credit exposure</strong> (conditional loss, using replacement cost), <strong>credit migration</strong>, <strong>MtM</strong>, <strong>replacement cost</strong>, <strong>default probability</strong> (real vs. risk-neutral), <strong>recovery rate</strong>, and <strong>LGD = 1 − recovery</strong>. Counterparty risk is quantified at the <strong>trade, counterparty, and portfolio</strong> levels; <strong>CVA</strong> (trade/counterparty-level pricing) and <strong>credit limits</strong> (portfolio-level caps) are complementary, independent checks, passing one doesn't guarantee passing the other, and they pull in opposite directions (CVA favors fewer counterparties for netting; limits favor more for diversification). Management toolkit: high-quality counterparties, netting, close-out, collateral, walkaway features (best when your own MtM is negative), diversification, CCPs. Mitigation toolkit: netting, collateral, hedging, CCPs, each trading one risk for another (legal, liquidity, market, or systemic risk). The lifetime economic costs of an OTC derivative split by whether MtM is positive or negative, motivating the <strong>xVA family</strong>: CVA, DVA, FVA, ColVA, KVA, MVA.</p>`
});
