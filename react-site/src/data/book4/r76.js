export default ({
  book: 4, reading: 76,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Repurchase Agreements and Financing",
  tagline: "Repos are the workhorse of short-term secured funding — built from the settlement formula up through their starring role in two 2008 collapses to the specials-trading mechanics that make Treasury auction dynamics tradeable.",

  teaches: `<p>Repo mechanics and settlement, borrower/lender motivations, counterparty vs. liquidity risk in repos, Lehman and Bear Stearns as 2008 case studies, general vs. special collateral, and the special spread/Treasury auction cycle.</p>`,

  why: `<p>Dense and calculation-heavy — budget real time here. Repos underpin an enormous share of short-term secured funding in the financial system, and their failure mechanics were central to both Bear Stearns' and Lehman's 2008 collapses.</p>`,

  intuition: `<p>A repo is economically a secured loan dressed as a sale-with-buyback: you sell a security today and agree to buy it back later at a slightly higher price — that price difference IS the implied interest. Concretely: on May 1, Counterparty A wants to borrow $11 million for 31 days. A owns an ABC bond with a $10 million face value and an $11 million market value. A <em>sells</em> that bond to Counterparty B for $11 million cash today, and simultaneously agrees to buy it back on June 1 for $11 million plus 30 basis points (0.3%) of interest. B has effectively lent A $11 million, secured by the bond; A has effectively borrowed $11 million, posting the bond as collateral. Legally it is two sales, not a loan — which matters because it lets B (the collateral holder) rehypothecate or even resell the bond if A fails to repay, rather than going through a lengthy secured-lender foreclosure process.</p>
  <p><strong>Repo</strong> (borrower/seller's side) and <strong>reverse repo</strong> (lender/buyer's side) are the same trade viewed from opposite sides — A did a repo, B did a reverse repo.</p>
  <p>General collateral (GC) trades get the highest repo rate because the lender doesn't care WHICH specific security they get — any bond in the broad category (e.g., "any on-the-run Treasury") will do. Special collateral trades get a LOWER "special rate" because the lender specifically wants THAT bond (for shorting or financing purposes) and is willing to accept less interest in exchange for guaranteed access to it — think of it as the lender paying an implicit fee (in the form of a lower rate charged) for the privilege of borrowing exactly the security they need. The special spread (GC rate − special rate) narrows right after a Treasury auction (fresh supply makes the bond easier to obtain, so lenders no longer need to accept as low a rate to attract it) and widens before the next one (scarcity as shorts must roll into the still-scarce current issue, bidding the special rate down further below GC).</p>`,

  eli5: `<p>Imagine you need $50 for the weekend, and you own a rare trading card worth $55. Instead of asking a friend for an unsecured loan (which they might refuse, or charge you a high rate for, since they're trusting your word alone), you "sell" your friend the card for $50 today, with a handshake deal that you'll buy it back on Monday for $50.20 — that 20 cents is the rent you're paying for the money. Your friend isn't really buying the card as a collector; they're happy to give it back Monday, but holding it in the meantime means if you vanish, they keep a $55 card for the $50 they handed over — so they're protected, and that protection is why they'll do this deal at a friendlier rate than a plain IOU. If your friend specifically wanted <em>that exact card</em> for a weekend trade show (not just any card), they might even let you borrow the $50 cheaper than usual, just to guarantee they get your card rather than someone else's. That's a repo (you) and reverse repo (your friend): the "sell it now, buy it back later at a slightly higher price" structure is a loan disguised as two trades, the card is the collateral, and a friend who cares about that specific card versus any card is exactly the general-vs-special-collateral distinction.</p>`,

  thinkLike: `<p>A repo desk trader or a bank's liquidity risk manager doesn't ask "is this financing secured?" and stop there — they ask "secured against what, for how long, and how confident am I that both the collateral AND the counterparty relationship survive to maturity?" That's why this reading pairs the mechanical settlement math with two failure case studies: the formula tells you the cost of financing in normal times, but Lehman and Bear Stearns show that the real risk in repo isn't a borrower defaulting on a well-collateralized loan (rare) — it's a lender simply refusing to roll the trade tomorrow, which turns an ostensibly short-term facility into an immediate funding cliff. A practitioner tracks the GC rate, the special rate on specific issues, and the fed funds-GC spread daily as sentiment gauges: a widening fed funds-GC spread signals general Treasury market stress or scarcity, while a widening special spread on one specific bond signals concentrated demand to borrow that bond (often short-covering ahead of an auction).</p>
  <p>On the exam, GARP loves to test the "secured therefore safe" trap using Bear Stearns (moved to secured term repo, still collapsed from a confidence-driven run) and the "which spread is this describing" trap (fed funds-GC spread vs. special spread — two related but distinct numbers). Expect a numeric settlement or financing-value calculation nearly every sitting, and expect a scenario question that requires you to correctly identify whether GC or special collateral rates would be higher, and why.</p>`,

  breakdown: [
    {
      title: "Repo motivations — borrowers vs. lenders (why each side does the trade)",
      points: [
        "Borrower — cheap secured funding: repos let a borrower access short-term cash at a lower rate than unsecured borrowing, because the lender bears less credit risk once collateral backs the loan.",
        "Borrower — bond-position financing: a dealer that just bought a bond (hoping to resell it for a profit) needs cash to finance holding it until a buyer is found; it repos the bond out overnight and rolls (renews) the trade daily until the position is sold, using back-to-back repo trades with a new counterparty if the original counterparty won't renew.",
        "Borrower — liquidity management tradeoff: repo financing is cheap but unstable (must be repaid/rolled on a short fuse and is sensitive to market sentiment); equity financing is stable but expensive (no repayment obligation, no dividend requirement, but investors demand a high expected return). Balancing this cost-vs-stability tradeoff across all funding sources IS liquidity management.",
        "Lender — cash management: money market funds and municipalities hold surplus cash and need a low-risk, short-maturity place to park it; a reverse repo is exactly that — collateral-secured, short-term, and (for municipalities, who are often barred from riskier investments) compliant with restrictions on acceptable investments.",
        "Lender — short position financing: an investment manager who believes rates will rise (bond prices will fall) obtains a specific bond via reverse repo (lending cash to get that bond as collateral), immediately short-sells the borrowed bond, and plans to buy it back cheaper later to return it and profit from the price decline."
      ]
    },
    {
      title: "Counterparty risk vs. liquidity risk in a repo — two distinct, differently-weighted risks",
      points: [
        "Counterparty (credit) risk: the risk the borrower defaults or fails to repay. Mitigated by collateral itself — if the borrower defaults, the lender simply keeps/sells the collateral, so this risk is usually MINOR in a repo.",
        "Liquidity risk: the risk that the collateral's value or marketability deteriorates during the repo's term, so that if the lender ever needs to sell it, the proceeds fall short. This is the MORE PERSISTENT concern in repo markets, especially under stress.",
        "Mitigants for liquidity risk: haircuts (lending less cash than the collateral's market value, e.g., $10.5M cash against $11M of collateral), daily margin calls (borrower posts more collateral if its value falls, or gets excess back if it rises), shorter repo terms, and restricting collateral to higher-quality securities."
      ]
    },
    {
      title: "Lehman and Bear Stearns — how 'secured' financing still produced a run (the 2008 case studies)",
      points: [
        "Lehman Brothers / JPMorgan Chase: JPM was Lehman's tri-party repo clearing agent — an outsourced custodian handling collateral selection, payment, and settlement between two counterparties without itself bearing trade risk. Because Lehman's overnight tri-party repos matured every morning, Lehman needed intraday funding to bridge the gap until the next overnight trade was struck; JPM provided this as secured intraday lending, initially with no haircut at all.",
        "As risk rose through August 2008, JPM began phasing in haircuts on those intraday advances, and JPM's exposure to Lehman exceeded $100 billion in the final week before bankruptcy. Lehman later alleged JPM abused its insider access (as both agent and lender, privy to Lehman's true financial condition) to drain roughly $14 billion in additional collateral in the final days despite Lehman already being overcollateralized; JPM countered that it acted in good faith against genuinely deteriorating and overstated collateral values.",
        "On Lehman's final day, JPM also invoked its contractual 'full right of offset' as clearing bank — using Lehman's own cash balances to offset JPM's exposure and refusing to process further Lehman payments that would take Lehman's account negative — which directly forced Lehman into bankruptcy that day.",
        "Bear Stearns: pre-2007, funded itself mainly with short-term unsecured commercial paper. By 2007 it deliberately shifted toward longer-term, secured repo financing, reasoning that high-quality collateral and 'term' (not overnight) structure would make it more resilient to a liquidity event. As the crisis intensified, lenders grew unwilling to provide term repo at all, forcing terms shorter, haircuts larger, and collateral-quality demands higher.",
        "In early March 2008, a general loss of confidence in Bear Stearns triggered a bank run: lenders refused to roll over even the shortened, well-collateralized repos, cash and unencumbered assets were withdrawn en masse, and Bear Stearns collapsed within days — first bailed out by the Federal Reserve Bank of New York, then sold to JPMorgan Chase."
      ]
    },
    {
      title: "General collateral vs. special collateral (why the same repo market has two different rate structures)",
      points: [
        "General collateral (GC): the lender only cares that the collateral falls within a broad accepted category (e.g., 'any Treasury'), not which specific security. Because demand isn't concentrated on one bond, lenders extract the highest repo rate — the 'GC rate.' The overnight GC rate on Treasury collateral is typically just below the fed funds rate; the gap (fed funds-GC spread) widens when Treasuries are scarce generally or during market stress.",
        "Special collateral: the lender specifically wants one particular security — to cover a short sale, or to finance inventory/proprietary positions. Because the lender is chasing a specific bond rather than accepting any acceptable bond, they must accept a lower 'special rate' as the cost of guaranteeing they get that bond. This trade is called a 'specials trade.'",
        "Important nuance: demand for a bond as loan collateral is not the same as demand for the bond itself in the cash market — a bond in high demand to own outright may not be in high demand as specials collateral, and vice versa."
      ]
    },
    {
      title: "Special spreads and the Treasury auction cycle (the tradeable pattern)",
      points: [
        "On-the-run (OTR) = the most recently auctioned issue of a given maturity (most liquid, lowest bid-ask spread, easiest to trade in size); off-the-run (OFR) = every older issue of that maturity. OTR issues are the preferred vehicle for covering short positions, so they carry the widest special spreads.",
        "Special spread = GC rate − special rate for a given bond and term. The spread narrows immediately after an auction, because the fresh supply of the new OTR issue makes it easier to source, pushing the special rate (and thus the spread) down further; it widens again as the next auction approaches, because shorts must keep rolling into the same, now-scarcer OTR issue, bidding the special rate down (spread up).",
        "The spread is bounded: floored effectively at a 0% special rate (a trader who fails to deliver on a short sale would rather borrow the bond for free than fail, but no lender will pay to lend a bond, so the rate cannot go negative), and capped at the GC rate (above the GC rate, a borrower would simply source GC collateral instead). Since 2009, a failed-trade penalty rate — max(3% − fed funds rate, 0) — sets a tighter effective ceiling on how wide the special spread can get, because a trader can always choose to fail on the delivery and pay the penalty instead of paying an even higher special-collateral cost."
      ]
    }
  ],

  formulas: [
    { name: "Repurchase price", math: "\\text{Repurchase price} = \\text{Contract price}\\times\\left[1 + \\text{repo rate}\\times\\dfrac{\\text{days}}{360}\\right]", note: "$11M for 31 days at 0.3% → $11,002,842. Actual/360 day count, annualized rate.", plain: "The price you pay to buy the security back equals the price you sold it for, plus interest at the quoted annualized repo rate prorated for the actual number of days the trade is outstanding, using a 360-day year (the standard money-market convention).", derivation: `<p>Counterparty A sells a $10 million face-value ABC bond (market value $11 million) to Counterparty B on May 1, agreeing to repurchase it on June 1 (31 days later) at 0.3% annualized interest:</p>
      <p>\\[ \\text{Repurchase price} = \\$11{,}000{,}000 \\times \\left[1 + 0.003 \\times \\dfrac{31}{360}\\right] \\]</p>
      <p>\\[ = \\$11{,}000{,}000 \\times \\left[1 + 0.0002583\\right] = \\$11{,}000{,}000 \\times 1.0002583 = \\$11{,}002{,}842 \\]</p>
      <p>The $2,842 difference between the sale price ($11,000,000) and the repurchase price ($11,002,842) is the implied interest — the lender's (Counterparty B's) return for the 31 days of secured financing provided.</p>` },
    { name: "Net replacement ratio", math: "\\text{NRR} = \\dfrac{\\text{current exposure with netting}}{\\text{current exposure without netting}}", note: "See R59 for full worked example — netting benefit quantification.", plain: "NRR expresses how much of your gross counterparty exposure survives after netting agreements are applied — a lower ratio means netting is doing more work to shrink your exposure." },
    { name: "Special spread", math: "\\text{Special spread} = \\text{GC rate} - \\text{special rate}", note: "Narrows right after an auction (fresh OTR supply); widens before the next (scarcity).", plain: "The special spread is simply how much cheaper it is to borrow cash against one specific bond (the special rate) than against general collateral (the GC rate) — the bigger the gap, the more the market is paying up (in the form of accepting a lower financing rate) to get that one bond." },
    { name: "Financing value of a special bond", math: "\\text{Value} = \\$100\\times\\text{special spread}\\times\\dfrac{\\text{days}}{360}", note: "Special spread=0.18%, 90 days → $0.045 per $100 (4.5 cents) of financing value.", plain: "This converts the special spread into a dollar amount per $100 of bond market value — the extra profit a holder of the special bond earns by lending it out at the low special rate while reinvesting the cash received at the higher GC rate, over the expected number of days the bond stays special.", derivation: `<p>An OTR bond issued January 1 trades at a special spread of 0.18%. A trader expects it to keep trading special (not revert to GC rates) through March 31 — 90 days. The financing value of holding $100 market value of that bond over those 90 days is:</p>
      <p>\\[ \\text{Value} = \\$100 \\times 0.0018 \\times \\dfrac{90}{360} = \\$100 \\times 0.0018 \\times 0.25 = \\$0.045 \\]</p>
      <p>So the bond earns its holder an extra 4.5 cents of financing value per $100 of market value over that 90-day special period — value that comes on top of the bond's ordinary coupon and price return, purely from its ability to be lent out cheap while the proceeds are reinvested at the higher GC rate.</p>` }
  ],

  concepts: [
    {
      name: "Repo mechanics and settlement",
      def: "Repurchase price = Contract price × [1+repo rate×(days/360)]. Repo = the transaction from the borrower/seller's side; reverse repo = same trade from the lender/buyer's side.",
      intuition: "Mechanically, it's two sales that economically function as one loan: the borrower sells a security today (receiving cash equal to its market value) and simultaneously commits to buying it back at a fixed future date for a slightly higher price. Structuring it as two sales — rather than a loan with the security pledged as collateral — matters legally, because it lets the party holding the collateral (the lender/buyer) treat it as fully theirs during the trade: they can rehypothecate it (re-lend or re-post it elsewhere) or, if the borrower defaults, sell it immediately rather than going through a lengthy secured-creditor foreclosure process.",
      example: "Counterparty A sells a $10M face / $11M market-value ABC bond to Counterparty B on May 1 for $11M cash, agreeing to repurchase it June 1 (31 days later) at 0.3% annualized: repurchase price = $11,002,842.",
      pitfall: "Rates are always quoted ANNUALIZED, actual/360 day count (standard money-market convention) — don't forget the day-count adjustment when computing repurchase price.",
      related: []
    },
    {
      name: "Motivations: borrowers vs. lenders",
      def: "Borrowers: cheap secured funding (vs. unsecured) and bond-position financing (roll/renew via back-to-back repo trades). The tradeoff between repo's cheap-but-unstable financing and equity's stable-but-expensive financing is liquidity management. Lenders: cash management (reverse repo as a low-risk short-term investment) or short position financing (obtain specific bond collateral via reverse repo, then short-sell it).",
      intuition: "On the borrower side, think of a dealer who just bought a bond from a client hoping to flip it to another investor: until that buyer is found, the dealer needs cash to hold the position, so it repos the bond out overnight, pledging it as collateral. If it can't sell the bond the next day, it must roll the repo — renew it with the same counterparty, or, if that counterparty won't renew, first unwind the trade and enter a fresh repo with a new counterparty (a 'back-to-back' repo trade). On the lender side, a money market fund or a municipality with surplus cash from tax revenue can't just let that cash sit idle, but is also barred (by mandate or regulation) from risky investments — a reverse repo gives them a safe, short-term, collateral-secured place to park cash and earn a return. A lender who instead wants to bet on falling bond prices can use a reverse repo purely to obtain a specific bond (by lending cash against it), immediately short-sell that borrowed bond, and later buy it back cheaper to return it and pocket the price decline.",
      example: "An investment manager who believes rates will rise takes a reverse repo, receiving a specific bond as collateral for the cash it lends; it immediately short-sells that bond, planning to repurchase it later at a lower price to close the short and profit from the rate move.",
      related: []
    },
    {
      name: "Counterparty risk vs. liquidity risk in repos",
      def: "Counterparty (credit) risk: borrower default — mitigated by collateral (lender simply sells it). Liquidity risk: adverse change in collateral value/liquidity during the repo term — mitigated by haircuts, margin calls, shorter terms, higher-quality collateral.",
      example: "A haircut in practice: against $11 million market value of ABC bonds, Counterparty B might lend only $10.5 million in cash — the $0.5 million haircut is a cushion against the collateral's value falling before the repo unwinds.",
      pitfall: "Repos are short-term and secured, so credit risk is USUALLY MINOR; liquidity risk (collateral value/liquidity during stress) is the MORE PERSISTENT concern — don't over-weight counterparty risk relative to liquidity risk in a repo context.",
      related: []
    },
    {
      name: "Lehman and Bear Stearns — the 2008 case studies",
      def: "Lehman Brothers: JPM (tri-party repo agent) lent intraday on secured, initially haircut-free terms; as risk rose (Aug 2008), JPM phased in haircuts, exposure exceeding $100B in the final week. Lehman alleged JPM abused insider access to drain ~$14B in collateral while already overcollateralized. Bear Stearns: shifted from unsecured commercial paper to secured term repo pre-2007 (seemingly more stable) — but as lenders grew unwilling to roll term repos in the crisis, terms shortened, haircuts grew, and a March 2008 confidence-driven run led to mass non-rollover and collapse.",
      intuition: "A tri-party repo agent (here, JPM for Lehman) is an outsourced custodian: the two actual counterparties still negotiate and own the trade, but the agent handles collateral selection, payment, and settlement, and does not itself bear the trade's credit risk. Lehman's overnight tri-party repos matured every single morning, so Lehman needed a bridge loan for daytime hours until the next overnight repo was struck — that bridge was JPM's intraday secured lending, which started haircut-free and only later (as Lehman's risk became apparent) had haircuts phased in. On Lehman's final day, JPM also exercised its contractual 'full right of offset,' using Lehman's own cash balances to net down JPM's exposure and cutting off further payments — a decisive blow that pushed Lehman into bankruptcy that day.",
      example: "Bear Stearns believed moving from unsecured commercial paper to secured term repo (with high-quality collateral, favorable term-based rates) made it more resilient. Instead, when confidence collapsed in March 2008, lenders simply refused to roll even well-collateralized repos — the run was driven by doubt about the FIRM, not about the collateral.",
      pitfall: "Both cases illustrate that even SECURED, seemingly-stable financing (repo) can evaporate under confidence-driven stress — 'secured' doesn't mean 'immune to a run.'",
      related: [{ r: 70, label: "R70 — the dealer bank failure mechanism these cases exemplify" }],
      memory: "Bear thought moving from unsecured CP to secured repo made them safer — it didn't, because the run was about CONFIDENCE, not collateral quality."
    },
    {
      name: "General collateral vs. special collateral",
      def: "General collateral (GC): lender cares only about the broad security category, gets the highest repo rate (the 'GC rate'). Fed funds-GC spread widens when Treasuries are scarce or during stress. Special collateral: lender wants a SPECIFIC security (for shorting/financing purposes) — accepts a lower 'special rate' in exchange for getting that exact bond.",
      intuition: "The overnight GC rate on U.S. Treasury collateral is typically slightly BELOW the fed funds rate, because Treasury-collateralized lending is considered safer than the unsecured interbank lending the fed funds rate reflects — lenders will accept a bit less return for the added safety. When Treasuries generally become scarcer (fewer available to post as collateral) or the market is under stress, the fed funds-GC spread widens, since lenders now demand relatively more to give up the Treasury-secured safety cushion, or GC rates fall as collateral becomes prized.",
      pitfall: "The fed funds-GC spread (funds rate vs. GC rate) and the special spread (GC rate vs. special rate) are TWO DIFFERENT spreads measuring different things — don't conflate them when a question describes market stress widening 'the spread.'",
      related: ["Special spreads and the Treasury auction cycle"],
      memory: "GC rate: highest (nobody cares which bond). Special rate: lower (you get exactly the bond you want, in exchange for accepting less interest)."
    },
    {
      name: "Special spreads and the Treasury auction cycle",
      def: "Special spread = GC rate − special rate. On-the-run (OTR) = most recently issued (most liquid); off-the-run (OFR) = everything else. OTR issues are the preferred short-covering vehicle, so they see the widest special spreads.",
      example: "Pattern: spreads NARROW right after an auction (fresh OTR supply depresses the special rate further) and WIDEN before the next auction (shorts must roll into the still-scarce current OTR issue). Special spread=0.18%, expected special period=90 days: Value = 100×0.0018×(90/360) = $0.045 per $100 (4.5 cents) of financing value. Second worked example: special spread=0.25%, expected special period=122 days: Value = 100×0.0025×(122/360) = $0.085 per $100.",
      pitfall: "Spread is bounded: floor at 0% special rate (below that, no one would lend the bond — free financing has a limit), cap at the GC rate; post-2009, a failed-trade penalty rate = max(3%−fed funds rate, 0) sets a tighter effective cap.",
      related: [],
      memory: "Narrows after auction (fresh supply), widens before the next (scarcity) — a predictable cycle traders actively watch."
    }
  ],

  connections: {
    from: [
      { r: 70, why: "Bear Stearns and Lehman are exactly the dealer-bank-failure mechanism this reading develops in full repo-market detail." },
      { r: 69, why: "The TSAA-not-TSECF distinction for repos is exactly the mechanics developed fully here." }
    ],
    to: [
      { r: 77, why: "Liquidity transfer pricing charges business units for exactly the funding costs repo markets reveal." }
    ],
    confused: [
      { what: "Fed funds-GC spread vs special spread", how: "Fed funds-GC spread: funds rate vs. GC rate (widens with Treasury scarcity/stress generally). Special spread: GC rate vs. special rate (driven by demand for a SPECIFIC bond) — two different spreads, don't conflate them." },
      { what: "General collateral vs special collateral repo rates", how: "GC rate is HIGHER (lender indifferent to which bond); special rate is LOWER (lender specifically wants that bond and accepts less interest to get it)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Repo financing, being secured, is immune to the kind of confidence-driven run that hits unsecured funding.\"", right: "Bear Stearns' 2008 collapse shows secured term repo can still evaporate under confidence-driven stress — lenders grew unwilling to roll term repos, terms shortened, haircuts grew, and a run occurred despite the financing being 'secured.'" },
    { wrong: "\"The fed funds-GC spread and the special spread measure the same underlying phenomenon.\"", right: "They are two DIFFERENT spreads: fed funds-GC reflects general Treasury scarcity/stress; special spread (GC rate − special rate) reflects demand for a SPECIFIC bond — don't conflate them when a question describes 'the spread' widening." },
    { wrong: "\"Special collateral repo rates are higher than general collateral rates, since the lender is getting a specific bond they want.\"", right: "Special rates are LOWER than the GC rate — the lender accepts less interest specifically because they're getting the exact bond they want (for shorting/financing purposes), not more." },
    { wrong: "\"A repo is legally a secured loan, with the security pledged as collateral the way a car is pledged against an auto loan.\"", right: "Mechanically, a repo is structured as two SALES (a sale today, a repurchase later), not a pledge — which is precisely what lets the cash lender rehypothecate or immediately sell the collateral on a default, rather than going through a secured-creditor foreclosure process." }
  ],

  highYield: [
    { stars: 5, what: "Repurchase price formula and full worked calculation (actual/360 day count).", why: "The foundational calculation of this reading — near-guaranteed to appear in some numeric form." },
    { stars: 5, what: "Special spread mechanics: narrows after auction, widens before next; GC rate > special rate; the two-different-spreads trap.", why: "The signature conceptual/numeric combination of this reading, frequently tested." },
    { stars: 4, what: "Bear Stearns and Lehman mechanisms — secured financing still ran under confidence-driven stress.", why: "A rich case-study area connecting to R70's dealer-bank-failure theme." },
    { stars: 4, what: "Counterparty risk (minor, collateral-mitigated) vs. liquidity risk (persistent concern) in repos.", why: "A precise, frequently tested risk-prioritization fact." },
    { stars: 3, what: "Financing value of a special bond formula.", why: "A direct calculation, good for quick fluency." }
  ],

  recall: [
    { q: "A bank borrows $25M via repo for 45 days at a 0.4% annualized rate. Compute the repurchase price.", a: "Repurchase price = $25,000,000 × [1 + 0.004×(45/360)] = $25,000,000 × 1.0005 = $25,012,500." },
    { q: "Why did Bear Stearns' shift from unsecured commercial paper to secured term repo pre-2007 fail to protect it from a funding crisis?", a: "The crisis wasn't about collateral quality — it was a confidence-driven run. As market confidence in Bear Stearns deteriorated, lenders became unwilling to ROLL (renew) term repos regardless of the collateral backing them, terms shortened, haircuts grew, and a March 2008 run led to mass non-rollover — demonstrating that 'secured' financing isn't immune to a funding run driven by counterparty confidence rather than collateral risk." },
    { q: "Why does the special spread on an on-the-run Treasury issue typically narrow immediately after a Treasury auction and widen again before the next one?", a: "Right after an auction, fresh supply of the newly-issued (OTR) security floods the market, making it easier to obtain and depressing the special repo rate further below GC (narrowing the spread). As the next auction approaches, that same issue becomes scarcer relative to demand from short-sellers needing to roll their positions into it, widening the special spread again — a predictable supply-driven cycle." },
    { q: "Distinguish the fed funds-GC spread from the special spread, and explain why a question describing 'the spread widening during stress' needs careful reading.", a: "The fed funds-GC spread measures the gap between the fed funds rate and the general collateral repo rate (driven by overall Treasury scarcity or market stress). The special spread measures GC rate minus a SPECIFIC bond's special rate (driven by demand for that particular security). Both can widen during stress for different reasons — a careful reader must identify which specific spread a question is describing, since they respond to different underlying drivers." },
    { q: "What role did JPMorgan Chase's 'full right of offset' play on Lehman's final day, and why does this matter for understanding tri-party repo risk?", a: "As Lehman's clearing/tri-party agent bank, JPM held Lehman's cash account and used its contractual right of offset to net its exposure against Lehman's cash while refusing to process further payments that would take the account negative — effectively cutting off Lehman's ability to fund itself that day and forcing it into bankruptcy. It shows that the tri-party clearing bank's own contractual rights, not just collateral adequacy, can be a decisive liquidity-risk lever in a crisis." }
  ],

  hooks: [
    { title: "Secured doesn't mean run-proof", text: "Bear Stearns thought secured term repo was safer than unsecured CP. It wasn't — a run is about confidence, not collateral. The lesson repeats throughout this book: cash-timing mismatches don't care how 'safe' your financing structure looks on paper." },
    { title: "The auction cycle's breathing pattern", text: "Special spreads breathe with the auction calendar: exhale (narrow) right after fresh supply arrives, inhale (widen) as the next auction approaches and scarcity returns." }
  ],

  quiz: [
    {
      q: "A dealer borrows $18 million via repo for 21 days at a 0.45% annualized repo rate, actual/360 convention. What is the repurchase price?",
      options: ["$18,047,250", "$18,004,725", "$18,157,500", "$18,000,945"],
      answer: 1,
      why: "Repurchase price = $18,000,000 × [1 + 0.0045×(21/360)] = $18,000,000 × 1.0002625 = $18,004,725. The $18,047,250 distractor mistakenly uses 365 instead of 360 days scaled up, and $18,157,500 mistakenly applies the full 0.45% rate rather than prorating for 21 days — both skip the actual/360 day-count adjustment that this reading explicitly flags as easy to forget."
    },
    {
      q: "A money market fund with surplus cash it must invest safely and a private investment manager who wants to short a specific corporate bond both use reverse repos, but for different reasons. Which best describes this pairing?",
      options: [
        "Both are using reverse repo for cash management, since both hold cash that needs a return",
        "The fund is doing cash management (investing surplus cash safely); the manager is doing short position financing (obtaining a specific bond to short-sell)",
        "The fund is doing short position financing; the manager is doing cash management",
        "Both are technically doing repos, not reverse repos, since they are the ones initiating the trade"
      ],
      answer: 1,
      why: "Lenders (reverse-repo side) use repo markets for two distinct motivations: cash management (parking surplus cash safely and earning a return — the fund's case) or short position financing (obtaining a specific bond as collateral in order to short-sell it — the manager's case). Both are indeed on the reverse repo (lender) side, so the 'both are repos not reverse repos' distractor is wrong, and swapping the two motivations (the 'fund does short financing, manager does cash management' answer) reverses the correct pairing."
    },
    {
      q: "Which statement correctly ranks counterparty risk and liquidity risk in a typical repo transaction?",
      options: [
        "Counterparty risk is the dominant concern, since the lender is fully exposed to borrower default",
        "Both risks are roughly equal in a repo, since collateral does not meaningfully change the risk profile",
        "Counterparty risk is usually minor because collateral lets the lender simply sell it on default; liquidity risk (adverse changes in collateral value/liquidity during the term) is the more persistent concern",
        "Liquidity risk is irrelevant in repo because haircuts eliminate it entirely"
      ],
      answer: 2,
      why: "Because repos are short-term and secured, counterparty (credit) risk is usually minor — the lender can simply sell the collateral if the borrower defaults. Liquidity risk (the collateral's value or marketability deteriorating during the repo's term) is the more persistent, harder-to-eliminate concern, mitigated (not eliminated) by haircuts, margin calls, shorter terms, and higher-quality collateral — so the 'eliminates it entirely' distractor overstates what haircuts do."
    },
    {
      q: "In the Lehman Brothers case study, what specific action did JPMorgan Chase take on Lehman's final day that directly contributed to forcing Lehman into bankruptcy?",
      options: [
        "JPM refused to act as tri-party repo agent for any further Lehman trades",
        "JPM immediately liquidated all collateral it held from Lehman in the open market",
        "JPM invoked its 'full right of offset,' using Lehman's own cash balances to offset its exposure and halting payments that would take Lehman's account negative",
        "JPM demanded Lehman post 100% additional collateral on all outstanding repo trades within one hour"
      ],
      answer: 2,
      why: "JPM, as Lehman's clearing bank, exercised its contractual full right of offset — netting its exposure against Lehman's own cash and refusing to process Lehman payments that would push the account below zero, which cut off Lehman's funding and precipitated the bankruptcy filing. The other options describe plausible-sounding but factually incorrect actions not documented in the case study."
    },
    {
      q: "Why do general collateral (GC) repo rates tend to be higher than special collateral repo rates?",
      options: [
        "GC collateral is typically lower credit quality, so lenders demand more compensation",
        "Special collateral trades have longer terms on average, so their rates are structurally lower",
        "GC lenders are indifferent to which specific security they receive, so they extract the highest available rate; special-collateral lenders accept a lower rate because they specifically want that one bond",
        "Special rates are set by regulation at a fixed discount to GC rates"
      ],
      answer: 2,
      why: "GC lenders don't care which specific bond they receive within the broad accepted category, so competition among borrowers to source acceptable collateral keeps the GC rate as the highest available repo rate. A specials trader is chasing one specific bond and will accept a lower 'special rate' as the cost of guaranteeing they get exactly that bond. GC collateral quality and term length are not the drivers here, and there is no regulatory fixed discount."
    },
    {
      q: "An OTR Treasury bond trades at a special spread of 0.30% and is expected to remain special for 60 days. What is the financing value of $100 market value of this bond over that period?",
      options: ["$0.30", "$0.05", "$0.18", "$1.80"],
      answer: 1,
      why: "Value = $100 × 0.0030 × (60/360) = $100 × 0.0030 × 0.1667 = $0.05. The $0.30 distractor forgets to prorate by the day-count fraction at all; $0.18 mistakenly uses 90 days (from the reading's other worked example) instead of the 60 days given; $1.80 mistakenly multiplies rather than fractionally scales the days term."
    }
  ],

  sources: [
    { title: "Repurchase agreement — Wikipedia", url: "https://en.wikipedia.org/wiki/Repurchase_agreement", note: "General overview of repo mechanics, day-count conventions, and market participants." },
    { title: "Repurchase Agreement (Repo) — Investopedia", url: "https://www.investopedia.com/terms/r/repurchaseagreement.asp", note: "Plain-language explainer of repo/reverse repo, haircuts, and typical uses." },
    { title: "The Lehman Brothers Bankruptcy — Federal Reserve Bank of San Francisco / Federal Reserve", url: "https://www.federalreserve.gov", note: "Federal Reserve materials and speeches covering the Lehman collapse and tri-party repo market reforms that followed." },
    { title: "Tri-Party Repo Infrastructure Reform — Federal Reserve Bank of New York", url: "https://www.newyorkfed.org/tripartyrepo", note: "Background on the tri-party repo market structure referenced in the Lehman case study, and post-crisis reforms." }
  ],

  pdf: { book: 4, query: "sells a security at a specified price with a commitment" },

  summary: `<p><strong>Repurchase price</strong> = contract price×[1+rate×(days/360)]. <strong>Repo</strong> (borrower side) / <strong>reverse repo</strong> (lender side). <strong>Counterparty risk</strong> (minor, collateral-mitigated) vs. <strong>liquidity risk</strong> (persistent concern — collateral value/liquidity during stress). <strong>Bear Stearns/Lehman</strong>: secured repo financing still ran under confidence-driven stress — secured ≠ run-proof. <strong>GC rate</strong> (highest, indifferent to specific bond) vs. <strong>special rate</strong> (lower, lender wants a specific bond). <strong>Special spread</strong> = GC−special rate; narrows post-auction, widens pre-auction; bounded [0%, GC rate], tighter post-2009 via failed-trade penalty. <strong>Financing value</strong> = $100×spread×(days/360). Fed funds-GC spread ≠ special spread — two different measures.</p>`
});
