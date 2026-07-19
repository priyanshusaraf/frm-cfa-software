FRM.register({
  book: 4, reading: 63,
  session: "Liquidity Risk Management",
  title: "Liquidity Risk",
  tagline: "Opens the book with the two faces of liquidity risk everything else builds on: can I exit this position without moving the price against myself, and can I roll my financing before it comes due?",

  teaches: `<p>The LVaR formula machinery (normal and stressed cost of liquidation), six sources of funding liquidity, three unforgettable case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft), Basel III liquidity ratios, and liquidity black holes.</p>`,

  why: `<p>Every other reading in Book 4 is an elaboration of the split introduced here: transactions (market) liquidity risk vs. funding liquidity risk. The three case studies teach the book's most important lesson — an economically sound position can still bankrupt you on a cash-timing mismatch.</p>`,

  intuition: `<p>Cost of liquidation in normal markets is just half the bid-ask spread times position value. In STRESSED markets, that spread itself widens and becomes uncertain — so stressed cost uses the spread's mean PLUS a confidence-multiple of its standard deviation, producing a cost that in the reading's own example comes out roughly 3.7× the normal-market figure. LVaR = ordinary VaR + this liquidation cost — a risk number that acknowledges you might not get to exit at the mid-price.</p>
  <p>The three case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft) all teach the SAME lesson despite completely different mechanisms: the hedge or asset can be economically sound — even profitable on paper — and still bankrupt you on a cash-timing mismatch. Margin calls are due in cash, now, regardless of whether the underlying position is "right."</p>`,

  visual: `<div class="widget" data-widget="lvar"></div>`,

  formulas: [
    { name: "Cost of liquidation (normal markets)", math: "\\text{cost} = \\sum_i \\dfrac{\\alpha_i\\, s_i}{2}", note: "s = spread/mid-price. 2M ABC shares + 500K XYZ shares example → cost ≈ $1,874,961." },
    { name: "Stressed cost of liquidation", math: "\\text{cost}_{\\text{stressed}} = \\sum_i \\dfrac{\\alpha_i\\,[\\mu_i + \\gamma\\sigma_i]}{2}", note: "\\(\\gamma\\) = confidence z-score. Same position at 95% confidence → $7,015,577, ≈3.7× the normal-market cost." },
    { name: "Liquidity-adjusted VaR", math: "\\text{LVaR} = \\text{VaR} + \\text{Cost of liquidation (normal or stressed)}", note: "Quick unwind: less market-risk exposure, more spread-widening exposure. Slow unwind: the reverse." }
  ],

  concepts: [
    {
      name: "Cost of liquidation — normal and stressed markets",
      def: "Normal: cost = \\(s\\times (\\alpha /2)\\) per position, s=spread/mid-price. Stressed: cost = \\([\\mu +\\gamma \\sigma ]/2\\) per position, using the spread's mean, SD, and a confidence z-score.",
      example: "2M shares ABC (bid $25.50, offer $27.00) + 500K shares XYZ (bid $45.00, offer $46.50): normal cost ≈ $1,874,961. Same positions at 95% confidence stressed: cost ≈ $7,015,577 — roughly 3.7× the normal-market cost.",
      related: ["Liquidity-adjusted VaR (LVaR)"]
    },
    {
      name: "Liquidity-adjusted VaR (LVaR)",
      def: "LVaR = VaR + Cost of liquidation (normal or stressed).",
      pitfall: "Trade-off in unwind speed: quick unwind → less market-risk (mid-price-moves-against-you) exposure but more spread-widening exposure; slow unwind → the reverse. Amihud's liquidity measure (2002) compares |daily return| to daily dollar volume — lower liquidity is empirically associated with HIGHER expected returns (illiquidity is compensated).",
      related: [{ r: 6, label: "R6 — exogenous/endogenous liquidity, the conceptual seed of LVaR" }],
      memory: "LVaR = ordinary VaR plus the toll you pay to actually get out the door."
    },
    {
      name: "Six sources of funding liquidity",
      def: "Cash and treasuries; retail/wholesale deposits (both surprisingly UNSTABLE — easy to move between institutions chasing rate); trading book liquidation (works less well precisely when markets are stressed); securitization (dried up almost overnight in 2007); borrowing ability (rates/tenors worsen exactly when needed most); central bank borrowing (expensive, haircut-laden, negative signaling cost).",
      pitfall: "Retail/wholesale deposits are frequently assumed to be a 'stable' funding source because they're insured or long-relationship — but the reading is explicit that they've become LESS stable over time as depositors easily rate-shop across institutions.",
      related: [],
      memory: "The 'stable' sources (deposits) are actually the least reliably stable — a genuinely counter-intuitive, tested fact."
    },
    {
      name: "Three case studies",
      def: "Northern Rock (2007): funded long-term mortgages with short-term debt; a public emergency-funding request triggered a visible bank run (£2B withdrawn in a week); nationalized. Ashanti Goldfields (1999): short gold forwards to hedge shareholders; a surprise 15-central-bank gold-sale moratorium spiked gold prices 25%+; margin calls on the illiquid physical hedge couldn't be met in cash. Metallgesellschaft: long near-dated oil futures hedging long-dated fixed-price supply contracts; falling oil prices triggered margin calls; the firm unwound at a $1.3B loss under cash-flow pressure.",
      pitfall: "All three share one lesson: the hedge or asset can be economically sound (or even profitable on paper) and still bankrupt you on a cash-timing mismatch — margin calls are due in cash, now, regardless of whether the underlying position is 'right.'",
      related: [{ r: 76, label: "R76 — Bear Stearns and Lehman, the same lesson in the 2008 repo context" }, { r: 80, label: "R80 — Harvard's endowment, the same lesson in illiquid portfolios" }],
      memory: "Right about the asset, dead anyway — the single most repeated lesson across this entire book."
    },
    {
      name: "Basel III liquidity ratios",
      def: "LCR = HQLA / net cash outflows over 30 days ≥ 100%. NSFR = available stable funding / required stable funding ≥ 100%.",
      example: "17 BIS principles span five buckets: fundamental principle, governance, measurement/management (cash-flow projection, diversified funding, intraday positions, collateral management, stress testing, CFP, HQLA buffer), disclosure, supervisory responsibilities.",
      related: [{ r: 60, label: "R60 — the full LCR/NSFR mechanics and worked examples" }]
    },
    {
      name: "Liquidity black holes and positive feedback trading",
      def: "Negative feedback traders (buy dips, sell rallies) stabilize markets. Positive feedback traders (buy as prices rise, sell as they fall) destabilize markets when they dominate.",
      example: "Causes: stop-loss rules, trend/breakout trading, predatory trading, delta-hedging large short option positions, unmet margin calls forcing liquidation into an already-falling market. Black Monday (Oct 19, 1987): portfolio insurance programs mechanically sold into the decline, with $12B of required selling only $4B executed by Friday's close — the backlog compounded into Monday's crash.",
      pitfall: "Leveraging/deleveraging is a reinforcing loop (more credit → higher asset demand → higher prices → higher collateral value → more credit, and the reverse). Uniform regulation across very different institution types can ITSELF create black holes — everyone forced to react identically to the same shock at the same time; diversity of regulatory treatment is a STABILIZING feature, not a bug.",
      related: [],
      memory: "Uniform rules for everyone sounds fair — but it means everyone sells at once. Diversity of rules is a stabilizer, not an inefficiency."
    }
  ],

  connections: {
    from: [
      { r: 6, why: "Exogenous/endogenous liquidity risk, introduced conceptually in Book 1, gets its full quantitative LVaR treatment here." }
    ],
    to: [
      { r: 64, why: "Leverage is the piece that makes liquidity risk genuinely dangerous — formalized next." },
      { r: 70, why: "Dealer bank failure mechanics are this reading's funding-liquidity-risk story, applied to a specific institution type." },
      { r: 60, why: "The LCR/NSFR ratios introduced here get their full worked-calculation treatment in Basel III (Book 3)." }
    ],
    confused: [
      { what: "Transactions (market) liquidity risk vs funding liquidity risk", how: "Transactions risk: can I exit this position without moving the price? Funding risk: can I roll my financing before it's due? Related but distinct — the whole book keeps re-splitting this pair." },
      { what: "Negative feedback vs positive feedback trading", how: "Negative feedback (buy dips, sell rallies) stabilizes; positive feedback (buy rising, sell falling) destabilizes and dominates during liquidity black holes." }
    ]
  },

  misconceptions: [
    { wrong: "\"Retail and wholesale deposits are inherently stable funding sources due to deposit insurance and long customer relationships.\"", right: "The reading is explicit that they've become LESS stable over time — depositors easily rate-shop across institutions, making deposits a surprisingly unstable funding source despite the intuitive 'sticky' assumption." },
    { wrong: "\"Uniform regulation across all financial institution types reduces systemic risk.\"", right: "Uniform regulation can itself CREATE liquidity black holes, since it forces very different institution types (banks, pension funds, insurers) to react identically to the same shock at the same time — diversity of regulatory treatment is a stabilizing feature." },
    { wrong: "\"An economically sound hedge or asset position protects you from a liquidity crisis.\"", right: "All three case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft) show that being right about an asset's long-run value provides no protection against a margin call or funding need due in cash, right now." }
  ],

  highYield: [
    { stars: 5, what: "LVaR formula (normal and stressed cost of liquidation) with full worked calculations.", why: "The signature formula of this reading and one of the most calculation-heavy in the book." },
    { stars: 5, what: "The three case studies' shared lesson: economically sound positions can still cause bankruptcy via cash-timing mismatch.", why: "The single most repeated thematic lesson across the entire book — recognize it in R76, R80 too." },
    { stars: 4, what: "Six sources of funding liquidity, especially deposits' surprising instability.", why: "A specific, frequently tested counter-intuitive fact." },
    { stars: 3, what: "Liquidity black holes: positive vs negative feedback trading, and regulatory uniformity as a destabilizer.", why: "A rich conceptual area connecting to 1987's crash and broader systemic risk themes." }
  ],

  recall: [
    { q: "Why is stressed-market liquidation cost roughly 3.7× the normal-market cost in the reading's worked example, rather than just modestly higher?", a: "Stressed cost uses the spread's mean PLUS a confidence-multiple \\((\\gamma \\times \\sigma )\\) of its standard deviation — under stress, spreads don't just have a higher average, they also become far more volatile/uncertain, and the confidence-adjustment term compounds this into a dramatically larger liquidation cost than simply scaling the normal-market mean spread." },
    { q: "Explain the shared lesson across Northern Rock, Ashanti Goldfields, and Metallgesellschaft despite their very different underlying positions.", a: "In each case, the underlying economic position (mortgage book, gold hedge, oil hedge) may have been sound or even eventually profitable — but a cash-timing mismatch (a funding run, an unexpected price spike triggering margin calls, falling prices triggering margin calls) forced action or collapse before the position's fundamental soundness could matter. Margin calls and funding withdrawals are due in cash, immediately, regardless of the position's paper value." },
    { q: "Why might uniform liquidity regulation across banks, pension funds, and insurers actually increase systemic risk rather than reduce it?", a: "If all institution types are forced to hold the same liquid assets or react identically to the same market shock, they all become forced sellers (or buyers) of the same assets at the same time — removing the diversity of behavior that would otherwise cushion a shock, since different institution types with different rules would naturally act at different times and in different ways." }
  ],

  hooks: [
    { title: "The 3.7x reveal", text: "Normal cost to liquidate: manageable. Same position, stressed market: 3.7× the pain — because spreads don't just widen, they become genuinely uncertain, and LVaR has to price both effects." },
    { title: "Right about the asset, dead anyway", text: "Northern Rock, Ashanti Goldfields, Metallgesellschaft — three completely different businesses, one identical epitaph: 'the position was fine, the timing wasn't.'" },
    { title: "Sameness is the danger", text: "When every institution type follows the same rulebook, they all reach for the exit at the same moment — diversity of regulation is a shock absorber, not red tape." }
  ],

  summary: `<p><strong>LVaR</strong> = VaR + cost of liquidation; normal \\(cost=\\Sigma [\\alpha \\times s/2]\\), stressed \\(cost=\\Sigma\\){\\(\\alpha \\times [\\mu +\\gamma \\sigma ]/2\\)} (≈3.7× normal in the worked example). <strong>Six funding-liquidity sources</strong>: cash/treasuries, deposits (surprisingly unstable), trading book liquidation, securitization, borrowing ability, central bank borrowing. <strong>Three case studies</strong> (Northern Rock, Ashanti Goldfields, Metallgesellschaft): economically sound positions bankrupted by cash-timing mismatches — the book's central recurring lesson. <strong>Basel III</strong>: LCR=HQLA/30-day outflow≥100%, NSFR=ASF/RSF≥100%. <strong>Liquidity black holes</strong>: positive feedback trading (stop-losses, delta-hedging, forced liquidation) destabilizes; uniform regulation across institution types can itself create black holes — regulatory diversity stabilizes.</p>`
});
