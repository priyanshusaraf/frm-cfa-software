FRM.register({
  book: 4, reading: 76,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Repurchase Agreements and Financing",
  tagline: "Repos are the workhorse of short-term secured funding — built from the settlement formula up through their starring role in two 2008 collapses to the specials-trading mechanics that make Treasury auction dynamics tradeable.",

  teaches: `<p>Repo mechanics and settlement, borrower/lender motivations, counterparty vs. liquidity risk in repos, Lehman and Bear Stearns as 2008 case studies, general vs. special collateral, and the special spread/Treasury auction cycle.</p>`,

  why: `<p>Dense and calculation-heavy — budget real time here. Repos underpin an enormous share of short-term secured funding in the financial system, and their failure mechanics were central to both Bear Stearns' and Lehman's 2008 collapses.</p>`,

  intuition: `<p>A repo is economically a secured loan dressed as a sale-with-buyback: you sell a security today and agree to buy it back later at a slightly higher price — that price difference IS the implied interest. Repo (borrower/seller's side) and reverse repo (lender/buyer's side) are the same trade viewed from opposite sides.</p>
  <p>General collateral (GC) trades get the highest repo rate because the lender doesn't care WHICH specific security they get — any bond in the broad category will do. Special collateral trades get a LOWER "special rate" because the lender specifically wants THAT bond (for shorting or financing purposes) and is willing to accept less interest in exchange for guaranteed access to it. The special spread (GC rate − special rate) narrows right after a Treasury auction (fresh supply) and widens before the next one (scarcity as shorts must roll into the still-scarce current issue).</p>`,

  formulas: [
    { name: "Repurchase price", math: "\\text{Repurchase price} = \\text{Contract price}\\times\\left[1 + \\text{repo rate}\\times\\tfrac{\\text{days}}{360}\\right]", note: "$11M for 31 days at 0.3% → $11,002,842. Actual/360 day count, annualized rate." },
    { name: "Net replacement ratio", math: "\\text{NRR} = \\dfrac{\\text{current exposure with netting}}{\\text{current exposure without netting}}", note: "See R59 for full worked example — netting benefit quantification." },
    { name: "Special spread", math: "\\text{Special spread} = \\text{GC rate} - \\text{special rate}", note: "Narrows right after an auction (fresh OTR supply); widens before the next (scarcity)." },
    { name: "Financing value of a special bond", math: "\\text{Value} = \\$100\\times\\text{special spread}\\times\\tfrac{\\text{days}}{360}", note: "Special spread=0.18%, 90 days → $0.045 per $100 (4.5 cents) of financing value." }
  ],

  concepts: [
    {
      name: "Repo mechanics and settlement",
      def: "Repurchase price = Contract price × [1+repo rate×(days/360)]. Repo = the transaction from the borrower/seller's side; reverse repo = same trade from the lender/buyer's side.",
      pitfall: "Rates are always quoted ANNUALIZED, actual/360 day count (standard money-market convention) — don't forget the day-count adjustment when computing repurchase price.",
      related: []
    },
    {
      name: "Motivations: borrowers vs. lenders",
      def: "Borrowers: cheap secured funding (vs. unsecured) and bond-position financing (roll/renew via back-to-back repo trades). The tradeoff between repo's cheap-but-unstable financing and equity's stable-but-expensive financing is liquidity management. Lenders: cash management (reverse repo as a low-risk short-term investment) or short position financing (obtain specific bond collateral via reverse repo, then short-sell it).",
      related: []
    },
    {
      name: "Counterparty risk vs. liquidity risk in repos",
      def: "Counterparty (credit) risk: borrower default — mitigated by collateral (lender simply sells it). Liquidity risk: adverse change in collateral value/liquidity during the repo term — mitigated by haircuts, margin calls, shorter terms, higher-quality collateral.",
      pitfall: "Repos are short-term and secured, so credit risk is USUALLY MINOR; liquidity risk (collateral value/liquidity during stress) is the MORE PERSISTENT concern — don't over-weight counterparty risk relative to liquidity risk in a repo context.",
      related: []
    },
    {
      name: "Lehman and Bear Stearns — the 2008 case studies",
      def: "Lehman Brothers: JPM (tri-party repo agent) lent intraday on secured, initially haircut-free terms; as risk rose (Aug 2008), JPM phased in haircuts, exposure exceeding $100B in the final week. Lehman alleged JPM abused insider access to drain ~$14B in collateral while already overcollateralized. Bear Stearns: shifted from unsecured commercial paper to secured term repo pre-2007 (seemingly more stable) — but as lenders grew unwilling to roll term repos in the crisis, terms shortened, haircuts grew, and a March 2008 confidence-driven run led to mass non-rollover and collapse.",
      pitfall: "Both cases illustrate that even SECURED, seemingly-stable financing (repo) can evaporate under confidence-driven stress — 'secured' doesn't mean 'immune to a run.'",
      related: [{ r: 70, label: "R70 — the dealer bank failure mechanism these cases exemplify" }],
      memory: "Bear thought moving from unsecured CP to secured repo made them safer — it didn't, because the run was about CONFIDENCE, not collateral quality."
    },
    {
      name: "General collateral vs. special collateral",
      def: "General collateral (GC): lender cares only about the broad security category, gets the highest repo rate (the 'GC rate'). Fed funds-GC spread widens when Treasuries are scarce or during stress. Special collateral: lender wants a SPECIFIC security (for shorting/financing purposes) — accepts a lower 'special rate' in exchange for getting that exact bond.",
      pitfall: "The fed funds-GC spread (funds rate vs. GC rate) and the special spread (GC rate vs. special rate) are TWO DIFFERENT spreads measuring different things — don't conflate them when a question describes market stress widening 'the spread.'",
      related: ["Special spreads and the Treasury auction cycle"],
      memory: "GC rate: highest (nobody cares which bond). Special rate: lower (you get exactly the bond you want, in exchange for accepting less interest)."
    },
    {
      name: "Special spreads and the Treasury auction cycle",
      def: "Special spread = GC rate − special rate. On-the-run (OTR) = most recently issued (most liquid); off-the-run (OFR) = everything else. OTR issues are the preferred short-covering vehicle, so they see the widest special spreads.",
      example: "Pattern: spreads NARROW right after an auction (fresh OTR supply depresses the special rate further) and WIDEN before the next auction (shorts must roll into the still-scarce current OTR issue). Special spread=0.18%, expected special period=90 days: Value = 100×0.0018×(90/360) = $0.045 per $100 (4.5 cents) of financing value.",
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
    { wrong: "\"Special collateral repo rates are higher than general collateral rates, since the lender is getting a specific bond they want.\"", right: "Special rates are LOWER than the GC rate — the lender accepts less interest specifically because they're getting the exact bond they want (for shorting/financing purposes), not more." }
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
    { q: "Distinguish the fed funds-GC spread from the special spread, and explain why a question describing 'the spread widening during stress' needs careful reading.", a: "The fed funds-GC spread measures the gap between the fed funds rate and the general collateral repo rate (driven by overall Treasury scarcity or market stress). The special spread measures GC rate minus a SPECIFIC bond's special rate (driven by demand for that particular security). Both can widen during stress for different reasons — a careful reader must identify which specific spread a question is describing, since they respond to different underlying drivers." }
  ],

  hooks: [
    { title: "Secured doesn't mean run-proof", text: "Bear Stearns thought secured term repo was safer than unsecured CP. It wasn't — a run is about confidence, not collateral. The lesson repeats throughout this book: cash-timing mismatches don't care how 'safe' your financing structure looks on paper." },
    { title: "The auction cycle's breathing pattern", text: "Special spreads breathe with the auction calendar: exhale (narrow) right after fresh supply arrives, inhale (widen) as the next auction approaches and scarcity returns." }
  ],

  summary: `<p><strong>Repurchase price</strong> = contract price×[1+rate×(days/360)]. <strong>Repo</strong> (borrower side) / <strong>reverse repo</strong> (lender side). <strong>Counterparty risk</strong> (minor, collateral-mitigated) vs. <strong>liquidity risk</strong> (persistent concern — collateral value/liquidity during stress). <strong>Bear Stearns/Lehman</strong>: secured repo financing still ran under confidence-driven stress — secured ≠ run-proof. <strong>GC rate</strong> (highest, indifferent to specific bond) vs. <strong>special rate</strong> (lower, lender wants a specific bond). <strong>Special spread</strong> = GC−special rate; narrows post-auction, widens pre-auction; bounded [0%, GC rate], tighter post-2009 via failed-trade penalty. <strong>Financing value</strong> = $100×spread×(days/360). Fed funds-GC spread ≠ special spread — two different measures.</p>`
});
