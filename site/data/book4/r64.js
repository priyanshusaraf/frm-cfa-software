FRM.register({
  book: 4, reading: 64,
  session: "Liquidity Risk Management",
  title: "Liquidity and Leverage",
  tagline: "Formalizes the transactions-liquidity/funding-liquidity split from R63 and adds the piece that makes it dangerous: leverage.",

  teaches: `<p>Transactions vs funding liquidity risk, fractional-reserve banking and liquidity transformation, collateral markets (haircuts, rehypothecation, margin loans, repos, securities lending, TRS), the leverage ratio and leverage effect on ROE, economic balance sheets measuring implicit leverage, and transactions liquidity risk mechanics with the LVaR position-liquidation formula.</p>`,

  why: `<p>Leverage amplifies BOTH returns and liquidity fragility — the same multiplier that boosts ROE when ROA exceeds the cost of debt equally amplifies losses when it doesn't. The "economic balance sheet" tool reveals implicit leverage hidden inside short sales and derivatives that a simple balance sheet would miss entirely.</p>`,

  intuition: `<p>Maturity mismatch (funding long-term assets with short-term liabilities) is PROFITABLE in normal times — short-term lenders bear less risk and demand a lower rate — but it creates rollover (cliff) risk: refinancing might not be available, or only at escalating rates. The two liquidity risk types feed each other: tighter collateral terms (funding risk) can force an early, lossy unwind (transactions risk); being forced to sell illiquid assets first (to preserve liquid ones) can deepen realized losses, worsening funding risk further.</p>
  <p>The economic balance sheet reveals hidden leverage: a short sale shows leverage ratio 2.0 (higher than an equivalent margin-loan long position's 1.5) because the FULL value of the borrowed stock counts as an asset — leverage is INHERENT in a short, a CHOICE in a long. Options are represented at their delta-equivalent value, not full notional, since they're nonlinear with nonzero NPV.</p>`,

  visual: `<div class="widget" data-widget="spiral"></div>`,

  formulas: [
    { name: "Leverage ratio and ROE effect", math: "L = \\dfrac{\\text{total assets}}{\\text{equity}};\\quad r_E = L\\,r_A - (L-1)\\,r_D", note: "ROA=5%, cost of debt=2%: L=2 → ROE=8%; L=4 → ROE=14%. Amplifies gains AND losses." },
    { name: "Effect of a change in leverage", math: "\\Delta\\text{ROE} = \\Delta L\\times(\\text{ROA} - \\text{cost of debt})", note: "Leverage only helps if ROA > cost of debt — the same multiplier hurts when ROA < cost of debt." },
    { name: "Expected transactions cost & spread risk factor", math: "\\text{expected cost} = \\dfrac{\\text{mid}\\times s}{2};\\quad \\text{spread risk factor} = \\tfrac{1}{2}(s + 2.33\\,\\sigma_s)", note: "Ask=$100, bid=$99, \\(\\sigma s=0.0002\\): expected cost=$0.50, spread risk factor=0.5258%." },
    { name: "Corrected T-day liquidation VaR", math: "\\text{VaR}(T)_{\\text{adjusted}} = \\text{VaR(1-day)}\\times\\sqrt{\\tfrac{1}{T}\\sum_i i^{2}}", note: "T=4 → multiplier 1.3693 (+37%), much less than naive \\(\\sqrt{4}=2.0\\) (+100%)." }
  ],

  concepts: [
    {
      name: "Transactions liquidity risk vs. funding liquidity risk",
      def: "Transactions (market) liquidity risk: the act of trading itself moves the price against you. Funding (balance sheet) liquidity risk: your own (or perceived) creditworthiness deteriorates, so creditors withdraw or reprice credit.",
      pitfall: "Maturity mismatch is PROFITABLE (short-term lenders demand less compensation) but creates rollover (cliff) risk. The two risk types feed each other — tighter collateral terms force a lossy unwind; forced illiquid-asset sales deepen losses further. Severe stress can cascade into SYSTEMIC risk via payment/clearing/settlement systems.",
      related: [{ r: 63, label: "R63 — the original split this reading formalizes" }],
      memory: "Transactions risk and funding risk are a vicious feedback loop, not two independent categories."
    },
    {
      name: "Fractional-reserve banking & liquidity transformation",
      def: "Banks take in $100 of deposits, hold a fraction ($10) for redemptions, lend the rest ($90) — asset-liability management (ALM), works because deposits are 'sticky.'",
      example: "Off-balance-sheet vehicles (ABCP conduits, SIVs) extended this same logic pre-crisis, funding longer-maturity assets with short-term ABCP — profitable on the spread, but didn't eliminate risk, just moved it off-balance-sheet. MMMFs use amortized-cost accounting (SEC Rule 2a-7) with a fixed $1.00 NAV — 'breaking the buck' is when credit write-downs or a run push NAV below $1.00.",
      related: [],
      memory: "Off-balance-sheet vehicles didn't eliminate risk, they hid it — a lesson that recurs throughout 2007-09."
    },
    {
      name: "Collateral markets",
      def: "Haircut: gap between collateral value and amount lent. Variation margin/remargining: additional collateral posted as values move. Rehypothecation: pledged collateral gets re-loaned/re-pledged, circulating through the system.",
      example: "Margin loans: Fed Reg T sets initial margin at 50%. Repos: collateralized short-term sale-with-buyback. Securities lending: loan securities for a fee ('rebate'). TRS: pay a fee for the total return of a reference asset without owning it.",
      related: []
    },
    {
      name: "Leverage ratio and the leverage effect (ROE)",
      def: "L = total assets/equity. r_E = L×r_A − (L−1)×r_D.",
      example: "ROA=5%, cost of debt=2%: Assets=$2, equity=$1 (L=2): ROE=2(5%)−1(2%)=8%. Assets=$4, equity=$1 (L=4): ROE=4(5%)−3(2%)=14%.",
      pitfall: "Leverage amplifies ROE ONLY as long as ROA > cost of debt — it's a double-edged sword: the same multiplier amplifies LOSSES when ROA < cost of debt.",
      related: ["Effect of a change in leverage"]
    },
    {
      name: "Economic balance sheets — measuring implicit leverage",
      def: "Margin loan (50% haircut): $100 equity + $50 margin loan buys $150 stock → leverage ratio = 150/100 = 1.5. Short sale: borrow $100 stock, sell it, post $50 margin → economic balance sheet shows $200 assets over $100 equity → leverage ratio = 2.0.",
      pitfall: "Short-sale leverage is HIGHER than the equivalent long-margin case because the FULL value of the borrowed stock is counted — leverage is INHERENT in a short, a CHOICE in a long. Gross leverage (all assets incl. short-sale proceeds/capital) overstates true risk if the short is a hedge — use NET leverage (longs−shorts)/capital instead in that case.",
      example: "Derivatives: futures/forwards/swaps (linear, zero NPV) represented at full notional; options (nonlinear, nonzero NPV) represented at the DELTA-EQUIVALENT value, not full notional (a 50-delta call on $100 index ≈ a $50 synthetic long financed by a $50 broker loan).",
      related: [],
      memory: "A long is a choice about how much to leverage; a short is leverage you can't opt out of."
    },
    {
      name: "Systematic funding liquidity risk (2007-09 case studies)",
      def: "LBOs/leveraged loans: 'hung loans' undistributed when CLO/CDO demand dried up. Merger arbitrage: losses when deals were abandoned as financing disappeared (systematic, not idiosyncratic). Convertible arbitrage: funding evaporation plus redemption-driven forced selling widened the gap between convertible prices and replicating portfolios without drawing in arbitrage capital.",
      related: []
    },
    {
      name: "Transactions liquidity risk mechanics & LVaR",
      def: "Market microstructure frictions: trade processing costs, inventory management, adverse selection ('lemons' risk), differences of opinion (harder to find a counterparty in a crisis when everyone agrees things are bad).",
      example: "Expected cost = mid×s/2. Spread risk factor = ½\\((s+2.33\\sigma s)\\). Naive T-day VaR \\((\\sqrt{T}\\) scaling) OVERSTATES risk for a position liquidated evenly over T days; the corrected formula gives a smaller adjustment (T=4 → 1.3693× vs naive 2.0×).",
      pitfall: "The corrected T-day liquidation VaR formula gives a SMALLER adjustment than naive square-root-of-time scaling — don't default to \\(\\sqrt{T}\\) when a position is actually being unwound gradually rather than held intact for the full period.",
      related: [{ r: 1, label: "R1 — the √t scaling convention this corrects for gradual liquidation" }],
      memory: "Holding the whole period: use \\(\\sqrt{T}\\). Unwinding gradually: use the smaller corrected multiplier."
    },
    {
      name: "Measuring market liquidity: tightness, depth, resiliency",
      def: "Tightness (width): round-trip cost = bid-ask spread + commissions. Depth: how large an order can be absorbed without moving price. Resiliency: how fast the market snaps back to equilibrium after a lumpy order.",
      example: "Hedge funds manage funding liquidity via cash, unpledged assets ('assets in the box' — only Treasury bills proved reliably acceptable as crisis collateral), and unused borrowing capacity (revocable — haircuts can rise or collateral can be refused right when needed).",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 63, why: "This reading formalizes the transactions/funding liquidity risk split with full mechanics and adds leverage." }
    ],
    to: [
      { r: 65, why: "Early warning indicators watch for exactly the deterioration signals this reading's leverage/liquidity feedback loops produce." },
      { r: 70, why: "Dealer bank failure is a real-world case of the funding-liquidity-risk feedback loop this reading formalizes." }
    ],
    confused: [
      { what: "Margin loan leverage vs short sale leverage", how: "Long via margin: leverage is a CHOICE (you pick the margin %). Short sale: leverage is INHERENT (the full stock value is borrowed regardless of margin posted) — short-sale leverage ratio (2.0) exceeds equivalent long-margin leverage (1.5)." },
      { what: "Gross leverage vs net leverage", how: "Gross leverage counts ALL assets including short-sale proceeds; net leverage nets longs against shorts — if the short is a HEDGE, gross leverage overstates true risk by ignoring the offset." },
      { what: "Naive √T scaling vs corrected T-day liquidation VaR", how: "Naive \\(\\sqrt{T}\\) assumes the position is held intact for T days; the corrected formula assumes GRADUAL liquidation over T days and gives a smaller (more accurate) risk estimate." }
    ]
  },

  misconceptions: [
    { wrong: "\"A short sale and an equivalent margin-loan long position carry the same leverage.\"", right: "The short sale carries HIGHER leverage (2.0 vs 1.5 in the example) because the full value of the borrowed stock is counted as an economic-balance-sheet asset — leverage is inherent in a short, a choice in a long." },
    { wrong: "\"Gross leverage always gives the most accurate risk picture.\"", right: "If a short position is a HEDGE, gross leverage overstates true risk by ignoring the offsetting long position — net leverage (longs minus shorts, over capital) is more appropriate in that case." },
    { wrong: "\"A position being liquidated gradually over T days should use naive \\(\\sqrt{T}-scaled\\) VaR.\"", right: "The naive \\(\\sqrt{T}\\) scaling OVERSTATES risk for gradual liquidation — the corrected formula (using \\(\\sqrt{(1/T)\\Sigma i^{2}})\\) gives a smaller, more accurate multiplier since exposure to each day's risk shrinks as the position is progressively sold down." },
    { wrong: "\"Off-balance-sheet vehicles like ABCP conduits and SIVs eliminated liquidity risk by removing it from the bank's balance sheet.\"", right: "They didn't eliminate risk, they MOVED it off-balance-sheet while still exposing the bank to it (often via implicit support or reputational commitments), directly feeding 2007-09 fragility when these vehicles needed rescuing." }
  ],

  highYield: [
    { stars: 5, what: "Leverage ratio and ROE effect formula, full worked calculation, and the double-edged-sword nature (amplifies losses too).", why: "The core quantitative concept of this reading and a frequent calculation target." },
    { stars: 5, what: "Economic balance sheet: short sale leverage (2.0) exceeds margin-loan leverage (1.5), and why.", why: "The signature conceptual insight distinguishing inherent vs. chosen leverage." },
    { stars: 4, what: "Corrected T-day liquidation VaR vs naive \\(\\sqrt{T}\\) scaling — the smaller, more accurate multiplier.", why: "A precise, frequently tested correction to a common shortcut formula." },
    { stars: 4, what: "Gross vs net leverage, and when gross overstates risk (hedged shorts).", why: "A clean conceptual distinction with real practical implications." },
    { stars: 3, what: "Options represented at delta-equivalent value (not full notional) on the economic balance sheet.", why: "Connects derivatives pricing concepts to the leverage-measurement framework." }
  ],

  recall: [
    { q: "A bank has ROA=6% and cost of debt=3%. Compare ROE at leverage ratios of 3 and 5.", a: "At L=3: ROE=3(6%)−2(3%)=12%. At L=5: ROE=5(6%)−4(3%)=18%. Leverage amplifies ROE as long as ROA>cost of debt — but the same formula would show ROE falling faster than ROA at higher leverage if ROA dropped below the cost of debt." },
    { q: "Why does a short sale show economic-balance-sheet leverage of 2.0 while an equivalent long position financed via a 50% margin loan shows only 1.5?", a: "In the short sale, the FULL value of the borrowed stock ($100) is sold and its proceeds held as restricted collateral, plus $50 margin is posted — the economic balance sheet shows $200 of assets over $100 of equity (leverage=2.0). In the long-margin case, only $150 of stock is purchased against $100 equity (leverage=1.5) — the short inherently requires borrowing the FULL stock value, while the long's leverage is a discretionary choice of how much to borrow." },
    { q: "A trader plans to liquidate a position evenly over 4 days rather than exit all at once. Should they use \\(VaR(1-day)\\times \\sqrt{4}\\) or the corrected formula, and why?", a: "The corrected formula \\((VaR(1-day)\\times \\sqrt{(1/4)\\Sigma i^{2}}\\) ≈ ×1.3693) — naive \\(\\sqrt{4}\\) scaling (×2.0) assumes the FULL position is held intact and exposed to risk for all 4 days, while gradual liquidation means less and less of the position remains exposed as days pass, making the corrected, smaller multiplier more accurate." },
    { q: "A hedge fund is long $100M of stock and short $80M of a closely related stock as a hedge. Why might gross leverage overstate the fund's true risk compared to net leverage?", a: "Gross leverage would count both the $100M long and $80M short as separate exposures (total $180M over capital), ignoring that the short substantially OFFSETS the long's risk as a hedge. Net leverage ($100M−$80M=$20M over capital) better reflects the fund's true, much smaller net market exposure." }
  ],

  hooks: [
    { title: "Leverage: the double-edged coin", text: "Flip it right (ROA>cost of debt): leverage multiplies your gains. Flip it wrong (ROA<cost of debt): the SAME multiplier multiplies your losses. It's not a one-way amplifier." },
    { title: "A short can't opt out of leverage", text: "A long position chooses its leverage (how much margin to use). A short position is BORN leveraged — you're always borrowing the full value of what you sold, no matter how much margin you post." },
    { title: "Gradual exit needs a gentler multiplier", text: "\\(\\sqrt{T}\\) assumes you're standing still in the storm for T days. The corrected formula assumes you're walking out the door the whole time — less exposure, smaller multiplier." }
  ],

  summary: `<p><strong>Transactions vs funding liquidity risk</strong> feed each other in a vicious loop. <strong>Maturity mismatch</strong> is profitable but creates rollover risk. <strong>Fractional-reserve banking</strong>: ALM works because deposits are sticky; off-balance-sheet vehicles (ABCP, SIVs) moved (not eliminated) risk pre-crisis; MMMFs can 'break the buck.' <strong>Leverage ratio</strong> L=assets/equity; r_E=L×r_A−(L−1)×r_D — amplifies gains AND losses. <strong>Economic balance sheets</strong>: short sale leverage (2.0) > margin-loan leverage (1.5) since shorts inherently borrow full value; gross leverage overstates risk for hedged shorts (use net); options represented at delta-equivalent value. <strong>Corrected T-day liquidation VaR</strong> < naive √T scaling for gradually-liquidated positions. Market liquidity: tightness, depth, resiliency.</p>`
});
