export default ({
  book: 4, reading: 64,
  session: "Liquidity Risk Management",
  title: "Liquidity and Leverage",
  tagline: "Formalizes the transactions-liquidity/funding-liquidity split from R63 and adds the piece that makes it dangerous: leverage.",

  teaches: `<p>Transactions vs funding liquidity risk, fractional-reserve banking and liquidity transformation, collateral markets (haircuts, rehypothecation, margin loans, repos, securities lending, TRS), the leverage ratio and leverage effect on ROE, economic balance sheets measuring implicit leverage, and transactions liquidity risk mechanics with the LVaR position-liquidation formula.</p>`,

  why: `<p>Leverage amplifies BOTH returns and liquidity fragility — the same multiplier that boosts ROE when ROA exceeds the cost of debt equally amplifies losses when it doesn't. The "economic balance sheet" tool reveals implicit leverage hidden inside short sales and derivatives that a simple balance sheet would miss entirely.</p>`,

  intuition: `<p>Maturity mismatch (funding long-term assets with short-term liabilities) is PROFITABLE in normal times — short-term lenders bear less risk and demand a lower rate — but it creates rollover (cliff) risk: refinancing might not be available, or only at escalating rates. The two liquidity risk types feed each other: tighter collateral terms (funding risk) can force an early, lossy unwind (transactions risk); being forced to sell illiquid assets first (to preserve liquid ones) can deepen realized losses, worsening funding risk further.</p>
  <p>The economic balance sheet reveals hidden leverage: a short sale shows leverage ratio 2.0 (higher than an equivalent margin-loan long position's 1.5) because the FULL value of the borrowed stock counts as an asset — leverage is INHERENT in a short, a CHOICE in a long. Options are represented at their delta-equivalent value, not full notional, since they're nonlinear with nonzero NPV.</p>`,

  visual: `<div class="widget" data-widget="spiral"></div>`,

  eli5: `<p>Imagine you have $100 of your own money and you want to buy a $200 boat. If you put in $100 and borrow $100 from a friend, you now control a $200 asset with only $100 of "skin in the game" — that's a leverage ratio of 2.0, and if the boat's value rises 10% you make $20 on your $100 (a 20% return), but if it falls 10% you lose $20 (a 20% loss too) — the borrowing didn't create value, it just made your own money more sensitive to the boat's ups and downs. Now imagine instead you don't own a boat at all — you promise a friend you'll buy back their boat next month at today's price ("shorting" it) and immediately sell it for $100 cash, but you must set that $100 cash aside untouched (as collateral, in case you have to buy the boat back for more than you sold it for) and also put up an extra $50 of your own money as a safety cushion — now your balance sheet shows $150 of assets ($100 restricted cash + the $50) against only $100 of ownership stake once you count the boat you owe back as a $100 liability, and if you tally it fully you're carrying $200 of assets against $100 equity, the SAME leverage ratio as before but you never chose it — you were required to borrow the FULL value of the boat just to get in the trade at all. In finance: buying $150 of stock with a $50 margin loan is a leverage ratio of 1.5 (the leverage ratio, or L, is total assets divided by equity) that you picked yourself; shorting $100 of stock plus posting $50 margin produces a leverage ratio of 2.0 that's baked into the mechanics of the short sale, not a choice.</p>`,

  thinkLike: `<p>A risk manager building an "economic balance sheet" is asking one question over and over: <em>how much is this firm's fate riding on borrowed money, once every position — including the ones that don't show up on a standard accounting balance sheet — is converted into its cash-equivalent exposure?</em> A plain-vanilla long stock position and a short sale can look similarly sized in dollar terms but carry structurally different leverage: the long position's leverage is a dial the investor turns (how much margin to use), while the short position's leverage is fixed by the mechanics of borrowing and selling the full value of the stock. A derivatives book is the hardest case: a futures or forward contract is linear (zero NPV at initiation, so its economic-balance-sheet value is simply the notional of the underlying), but an option is nonlinear — its exposure changes as the underlying price moves, so a risk manager represents it at its delta-equivalent value (a 50-delta option is treated as a $50 position, financed the same way a $50 margin loan would be), not its full notional. GARP loves to test whether you can (1) tell transactions liquidity risk (the market moving against you as you trade) apart from funding liquidity risk (your creditors turning on you), (2) recognize that they feed each other in a loop rather than existing independently, (3) build an economic balance sheet from a word problem (margin loan vs. short sale vs. option) and read off the resulting leverage ratio, and (4) know that gross leverage — counting every asset including short-sale proceeds — overstates true risk when a short position is actually a hedge, in which case net leverage (longs minus shorts, over capital) is the more honest number.</p>`,

  formulas: [
    { name: "Leverage ratio and ROE effect", math: "L = \\dfrac{\\text{total assets}}{\\text{equity}};\\quad r_E = L\\,r_A - (L-1)\\,r_D", note: "ROA=5%, cost of debt=2%: L=2 → ROE=8%; L=4 → ROE=14%. Amplifies gains AND losses.",
      plain: "The leverage ratio is simply how many dollars of assets sit on top of each dollar of the owners' equity, and the ROE formula says a firm's return on equity is its return on assets multiplied up by that leverage, minus the cost of the borrowed portion of the balance sheet — so leverage is a magnifying lens applied to the gap between what assets earn and what debt costs.",
      derivation: `<p>Start from the accounting identity \\(\\text{assets} = \\text{equity} + \\text{debt}\\), so \\(\\text{debt} = \\text{assets} - \\text{equity} = (L-1)\\times\\text{equity}\\) once you divide through by equity, since \\(L=\\text{assets}/\\text{equity}\\). Total dollar profit to the firm is \\(r_A\\times\\text{assets}\\) (return on assets applied to all assets) minus \\(r_D\\times\\text{debt}\\) (the interest cost on the borrowed portion) — the equity holders keep what's left. Dividing that leftover dollar profit by equity to get a rate of return: \\[r_E = \\frac{r_A\\times\\text{assets} - r_D\\times\\text{debt}}{\\text{equity}} = r_A\\times L - r_D\\times (L-1),\\] which is exactly the leverage-effect formula. It says: for every $1 of equity, you earn ROA on the full \\(L\\) dollars of assets you control, but you must pay the cost of debt on the \\((L-1)\\) dollars that aren't your own.</p>` },
    { name: "Effect of a change in leverage", math: "\\Delta\\text{ROE} = \\Delta L\\times(\\text{ROA} - \\text{cost of debt})", note: "Leverage only helps if ROA > cost of debt — the same multiplier hurts when ROA < cost of debt.",
      plain: "If you dial leverage up or down by some amount, ROE moves by that same amount times the spread between what assets earn and what debt costs — a positive spread makes more leverage attractive, a negative spread makes more leverage destructive.",
      derivation: `<p>Take the leverage-effect formula \\(r_E = L\\,r_A - (L-1)\\,r_D\\) and hold \\(r_A\\) and \\(r_D\\) fixed while treating \\(L\\) as the variable you change: \\[\\frac{\\partial r_E}{\\partial L} = r_A - r_D,\\] so a discrete change \\(\\Delta L\\) moves ROE by \\(\\Delta L\\times(r_A-r_D)\\) — precisely because every extra dollar of leverage adds one more dollar earning \\(r_A\\) financed at cost \\(r_D\\), so the marginal effect on ROE is just the spread itself.</p>` },
    { name: "Leverage from a haircut (margin loan)", math: "L = \\dfrac{1}{h}", note: "Regulation T sets the minimum initial margin at h=50% for a margin-financed stock purchase, so L=1/0.5=2.0 is the maximum leverage a retail margin account can take on that position type; using only some of the available margin (e.g. h=66.7%, all-cash-plus-partial-borrowing) gives L=1/0.667≈1.5.",
      plain: "The haircut h is the fraction of the position's value you must fund yourself; leverage is just the reciprocal of that fraction, because the smaller the slice you're required to put up, the more the borrowed slice multiplies your exposure per dollar of your own money." },
    { name: "Expected transactions cost & spread risk factor", math: "\\text{expected cost} = \\dfrac{\\text{mid}\\times s}{2};\\quad \\text{spread risk factor} = \\tfrac{1}{2}(s + 2.33\\,\\sigma_s)", note: "Ask=$100, bid=$99, \\(\\sigma_s=0.0002\\): mid=$99.50, s=(100-99)/99.5=0.01005, expected cost=99.50×0.01005/2=$0.50, spread risk factor=½[0.01005+2.33(0.0002)]=0.5258%.",
      plain: "The expected cost of trading is simply half the proportional bid-ask spread applied to the mid-market value of the position — you 'lose' half the spread just crossing it — and the 99% spread risk factor adds a buffer of 2.33 standard deviations of spread volatility on top of the current half-spread, so it's a one-tailed confidence bound on how expensive the trade could get if the spread widens overnight." },
    { name: "Corrected T-day liquidation VaR", math: "\\text{VaR}(T)_{\\text{adjusted}} = \\text{VaR(1-day)}\\times\\sqrt{\\tfrac{1}{T}\\sum_i i^{2}}", note: "T=4 → multiplier 1.3693 (+37%), much less than naive \\(\\sqrt{4}=2.0\\) (+100%).",
      plain: "If you sell off an equal fraction of a position at the end of each of T days rather than holding the whole thing intact for T days, your risk shrinks day by day as less of the position remains exposed — this formula weights each day's contribution by how much of the position is still unsold on that day, which is why it produces a smaller multiplier than the naive square-root-of-time rule. Naive scaling (VaR(1-day)×√T) assumes the full position is held intact and exposed for all T days; for T=4 that gives a ×2.0 multiplier, versus the corrected ×1.3693 — memorize the number, the source does not walk through the intermediate algebra of the weighting scheme." }
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
      def: "An economic balance sheet restates every position — including off-balance-sheet derivatives — at its cash-equivalent (delta-adjusted, for nonlinear instruments) market value, so leverage can be measured consistently across margin loans, short sales, and derivatives. Worked margin-loan example: owners start with $100 of their own cash. They use half of it ($50) plus a $50 margin loan to buy $100 of stock, leaving $50 of cash still on hand. The full economic balance sheet then shows $100 of stock + $50 cash = $150 of assets over the original $100 of equity → leverage ratio = 150/100 = 1.5. Worked short-sale example: the firm borrows $100 of stock and sells it short; the $100 of proceeds must be held as restricted collateral (it cannot be spent), and the firm additionally posts $50 of margin — the economic balance sheet then shows $150 of restricted-cash/margin assets against a $100 short-stock liability, netting to $200 of total assets over $100 of equity → leverage ratio = 200/100 = 2.0.",
      pitfall: "Short-sale leverage is HIGHER than the equivalent long-margin case because the FULL value of the borrowed stock is counted — leverage is INHERENT in a short, a CHOICE in a long. Gross leverage (all assets incl. short-sale proceeds/capital) overstates true risk if the short is a hedge — use NET leverage (longs−shorts)/capital instead in that case.",
      example: "Derivatives are off-balance-sheet but still belong on the economic balance sheet at their cash-equivalent market value. Futures, forwards, and swaps are linear and zero-NPV at initiation, so they're represented at the full notional value of the underlying. Options are nonlinear and nonzero-NPV (their value splits into intrinsic value, which may be zero, plus time value, which usually isn't), so they're represented at the DELTA-EQUIVALENT value: a 3-month at-the-money call on a $100 stock index with a 50% delta is treated exactly like a $50 synthetic long stock-index position financed with a $50 broker loan — not the $100 full notional. Schweser's combined worked example puts all of this together for one firm with only $50 of cash: (1) a 1-month currency forward, short $100 against the euro; (2) the 50-delta call above, equivalent to a $50 synthetic long financed by a $50 loan; (3) a short equity position via a total return swap (TRS) on $100 of ABC stock — the firm pays the total return on ABC and receives a financing rebate, economically equivalent to a direct short of ABC; (4) $100 notional of credit protection sold via a 5-year credit default swap (CDS) on company XYZ, equivalent to a long position in a par 5-year floating-rate note (FRN) financed by a term loan. Adding these long and short synthetic exposures together, the firm's LONG-side leverage rises to 3.5, meaning it has gained economic exposure to $450 of securities using only $50 of actual cash — a leverage level invisible on a plain accounting balance sheet, which is exactly why the economic balance sheet exists.",
      related: [],
      memory: "A long is a choice about how much to leverage; a short is leverage you can't opt out of. A derivatives book can hide 9x the leverage a cash balance sheet shows."
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

  breakdown: [
    {
      title: "Four collateral-market transaction types",
      points: [
        "Margin loans — collateralized by the security itself, usually extended by the broker executing the trade; the broker holds the stock in a 'street name' account (registered in the broker's name, not the customer's), which lets the broker both seize/sell it quickly on a margin call AND re-lend it to other customers who want to short it. Regulation T sets the minimum initial margin at 50%.",
        "Repos (repurchase agreements) — a collateralized short-term loan structured as a sale-today/buyback-later at an agreed forward price; the implied interest is the spread between the spot and forward prices. Traditionally only Treasury bills were used as collateral, but by the mid-2000s acceptable collateral had expanded to whole loans, high-yield bonds, and structured credit products (ABS/CDO tranches) — a key channel that fed pre-crisis leverage growth.",
        "Securities lending — one party lends securities to another for a fee called a rebate; the lender keeps receiving the dividends/interest from the securities. Equity lenders (often hedge funds or large institutions) enable short sellers; fixed-income securities lending typically lends out Treasuries for cash, which the borrower reinvests in higher-yielding bonds to earn the spread.",
        "Total return swaps (TRS) — one party pays a fee in exchange for receiving the total return (income + capital gains) of a reference asset (typically a stock) without ever owning it; the party paying out the return is, economically, short the asset."
      ]
    },
    {
      title: "Market microstructure sources of transactions liquidity risk",
      points: [
        "Trade processing costs — the cost and time of finding a counterparty plus processing, clearing, and settlement; normally a minor liquidity-risk driver unless the trading infrastructure itself is disrupted.",
        "Inventory management — dealers must hold inventory (long or short) to provide immediacy to other traders, and demand a price concession (part of the spread) to compensate for the volatility risk of carrying that inventory.",
        "Adverse selection ('lemons risk') — dealers can't tell informed traders (who know the price is wrong) from uninformed/noise traders, so they widen the bid-ask spread to compensate for the risk of unknowingly trading with someone better informed.",
        "Differences of opinion — counterparties are easier to find when investors disagree about the correct price; liquidity dries up precisely when everyone agrees the outlook is bad (as in the 2007-09 crisis, when banks became reluctant to trade with each other at all)."
      ]
    },
    {
      title: "Three measures of market liquidity",
      points: [
        "Tightness (width) — the cost of a round-trip trade, measured by the bid-ask spread plus commissions; a narrower spread means a tighter, more liquid market.",
        "Depth — how large an order the market can absorb before it moves the price adversely; an individual investor's trade is usually absorbed with no impact, a large institutional trade usually isn't.",
        "Resiliency — how quickly the market snaps back to its equilibrium price after a large ('lumpy') order temporarily pushes it away."
      ]
    },
    {
      title: "How hedge funds manage funding liquidity risk",
      points: [
        "Cash — held in money market accounts or Treasury bills; not risk-free, since money market funds can suspend redemptions in a crisis and cash held at a broker is exposed if the broker itself fails.",
        "Unpledged assets ('assets in the box') — assets not currently pledged as collateral, often held at a broker, that can be sold or pledged for cash; during the 2007-09 crisis only Treasury bills (not even government agency securities) reliably remained acceptable collateral, and unpledged-asset prices themselves were often depressed exactly when needed.",
        "Unused borrowing capacity — a revocable buffer, since counterparties can raise haircuts or refuse to accept collateral on rollover right when a fund needs the credit most; these facilities are typically very short-term and can vanish quickly in a crisis."
      ]
    }
  ],

  quiz: [
    {
      q: "A firm's borrower has been consistently required to post more collateral to roll over the same repo, even though the firm's own financial condition hasn't changed. From the borrowing firm's perspective, this is best described as:",
      options: ["Transactions liquidity risk", "Adverse selection", "Systemic risk", "Balance sheet (funding) liquidity risk"],
      answer: 3,
      why: "Rising collateral demands on rollover are a funding/balance-sheet liquidity risk — the terms of credit are being repriced against the borrower even without a change in its own credit quality (often because market-wide conditions have deteriorated). It's not transactions liquidity risk (that's about trading moving the market price) and not systemic risk (which is about the whole financial system being impaired, not one firm's financing terms)."
    },
    {
      q: "A firm has ROA=6%, a leverage ratio of 4, and a cost of debt of 3%. What is its ROE?",
      options: ["3%", "9%", "15%", "24%"],
      answer: 2,
      why: "ROE = L×ROA − (L−1)×cost of debt = 4(6%) − 3(3%) = 24% − 9% = 15%. The tempting wrong answer 24% (just L×ROA) forgets to net out the interest cost of the (L−1) dollars of debt per dollar of equity; 9% miscalculates the debt term."
    },
    {
      q: "A U.S. hedge fund puts up the Federal Reserve's minimum required equity to take a $200,000 long equity position on margin. What is the margin loan amount and the resulting leverage ratio?",
      options: ["Margin loan = $100,000; leverage ratio = 2.0", "Margin loan = $200,000; leverage ratio = 2.0", "Margin loan = $100,000; leverage ratio = 1.0", "Margin loan = $0; leverage ratio = 1.0"],
      answer: 0,
      why: "Regulation T requires a minimum of 50% equity (h=0.5), so a $200,000 position needs $100,000 of the investor's own equity and a $100,000 margin loan; leverage ratio = 1/h = 1/0.5 = 2.0. The first distractor doubles the loan by ignoring the required equity; the last two understate the leverage a margin loan actually creates."
    },
    {
      q: "A firm shorts $100 of stock and posts an additional $50 of margin. Why is its economic-balance-sheet leverage ratio (2.0) higher than an otherwise-equivalent long position bought using a 50% margin loan (1.5)?",
      options: [
        "Short sales carry higher borrowing costs, which mechanically inflates the leverage ratio",
        "Regulators impose a higher haircut on short sales than on long margin purchases",
        "The short sale requires borrowing the full value of the stock being sold, which the investor cannot choose to reduce, while the long position's borrowed fraction is a discretionary choice",
        "The leverage ratios are actually identical once you account for the restricted cash from the short sale"
      ],
      answer: 2,
      why: "The short sale's leverage is inherent — the investor must borrow and sell the FULL value of the stock to enter the position at all, and that borrowed value shows up as an asset (with an offsetting short-stock liability) on the economic balance sheet regardless of how much margin is posted. A long position's leverage, by contrast, is a choice — the investor decides how much margin, if any, to use. It has nothing to do with a difference in haircut rules or borrowing costs, and the leverage ratios are genuinely different (2.0 vs 1.5), not equal."
    },
    {
      q: "A hedge fund is long $100M of Stock A and short $80M of closely correlated Stock B as a hedge against Stock A's sector risk. Which leverage measure best reflects the fund's true net market exposure?",
      options: ["Gross leverage, since it captures the full economic size of both positions", "Net leverage, which nets the long against the short before dividing by capital", "Neither — leverage ratios are meaningless once short positions are involved", "Gross leverage, but only after applying a 2.33 standard-deviation haircut to the short"],
      answer: 1,
      why: "When a short position functions as a hedge, gross leverage (which would sum $100M + $80M = $180M of exposure) overstates true risk by ignoring the risk-reducing offset the short provides. Net leverage — (long − short)/capital = $20M/capital — better reflects the fund's actual, much smaller net market exposure. Gross leverage is the tempting-but-wrong answer precisely because it's the more familiar, larger number."
    },
    {
      q: "A trader holds a position she plans to liquidate in equal fractions over 4 trading days rather than all at once. Compared to scaling the 1-day VaR by the naive √4 = 2.0 multiplier, the corrected liquidation-adjusted VaR multiplier of 1.3693 is:",
      options: [
        "Smaller, because less of the position remains exposed to market risk as each day's tranche is sold off",
        "Larger, because gradual liquidation extends the risk horizon",
        "Identical, since total dollar exposure over the 4 days is unchanged either way",
        "Not comparable, because the two formulas measure different types of risk entirely"
      ],
      answer: 0,
      why: "The corrected formula recognizes that only the full position is exposed on day 1; by day 4 only a small remaining fraction is still unsold, so the position's average daily risk exposure over the liquidation window is smaller than if the whole position sat exposed for all 4 days (what naive √T scaling assumes). That's why 1.3693 < 2.0. The 'larger' and 'identical' options both misread which scenario is actually riskier — holding the full position for the whole period is the riskier (naive) case, not the gradual-liquidation case."
    }
  ],

  sources: [
    { title: "Leverage (finance) — Wikipedia", url: "https://en.wikipedia.org/wiki/Leverage_(finance)", note: "Background on financial leverage, the leverage ratio, and how borrowing amplifies both gains and losses." },
    { title: "Repurchase Agreement (Repo) — Investopedia", url: "https://www.investopedia.com/terms/r/repurchaseagreement.asp", note: "Plain-language walkthrough of repo mechanics, haircuts, and collateral, complementing this reading's collateral-market section." },
    { title: "Rehypothecation — Investopedia", url: "https://www.investopedia.com/terms/r/rehypothecation.asp", note: "Explains how pledged collateral gets re-loaned through the system, the mechanism behind this reading's rehypothecation concept." },
    { title: "Total Return Swap — Investopedia", url: "https://www.investopedia.com/terms/t/totalreturnswap.asp", note: "Covers TRS mechanics used in this reading's economic-balance-sheet derivatives example." }
  ],

  pdf: { book: 4, query: "This reading analyzes the effects of liquidity and leverage on firm risk" },

  summary: `<p><strong>Transactions vs funding liquidity risk</strong> feed each other in a vicious loop. <strong>Maturity mismatch</strong> is profitable but creates rollover risk. <strong>Fractional-reserve banking</strong>: ALM works because deposits are sticky; off-balance-sheet vehicles (ABCP, SIVs) moved (not eliminated) risk pre-crisis; MMMFs can 'break the buck.' <strong>Leverage ratio</strong> L=assets/equity; r_E=L×r_A−(L−1)×r_D — amplifies gains AND losses. <strong>Economic balance sheets</strong>: short sale leverage (2.0) > margin-loan leverage (1.5) since shorts inherently borrow full value; gross leverage overstates risk for hedged shorts (use net); options represented at delta-equivalent value. <strong>Corrected T-day liquidation VaR</strong> < naive √T scaling for gradually-liquidated positions. Market liquidity: tightness, depth, resiliency.</p>`
});
