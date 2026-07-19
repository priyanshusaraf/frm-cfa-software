FRM.register({
  book: 4, reading: 77,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Liquidity Transfer Pricing: A Guide to Better Practice",
  tagline: "Answers a deceptively simple question: how much should a business unit be charged (or credited) for the liquidity it uses (or provides)? Pre-crisis, many banks answered 'nothing.'",

  teaches: `<p>LTP process/governance best practices, pre-crisis deficiencies, four LTP approaches in ascending order of quality (ending at matched-maturity marginal cost), and contingent liquidity pricing for undrawn commitments.</p>`,

  why: `<p>This is the reading's signature "marginal, matched-maturity beats every flat/average shortcut" lesson, applied specifically to internal fund pricing. Getting this wrong (as many banks did pre-crisis) means systematically underpricing long-term illiquid assets — funding them on cheap overnight money while ignoring the real liquidity risk.</p>`,

  intuition: `<p>The four LTP approaches form a quality ladder: zero cost (liquidity treated as free — the worst approach) → pooled average cost (one flat spread for all maturities — undercharges long-tenor, overcharges short) → separate average cost (different flat spreads for assets vs. liabilities, but still maturity-blind) → matched-maturity marginal cost (spread varies BY MATURITY, based on the bank's actual current market cost of funds — the best practice).</p>
  <p>The worked example makes the stakes vivid: Bank MMM charges 1bp for a 1-year loan and 80bps for a 5-year loan (correctly pricing the much higher liquidity risk of longer-tenor lending), while Bank AVG charges a flat 2bps regardless of maturity — underpricing the 5-year loan by 4×. That mispricing is a systematic subsidy someone eventually exploits.</p>`,

  formulas: [
    { name: "Worked example: matched-maturity vs average cost", math: "\\text{Bank MMM: }1\\text{bp(1yr)}=\\$10,\\ 80\\text{bps(5yr)}=\\$80.\\quad \\text{Bank AVG: flat }2\\text{bps}=\\$20\\text{ for BOTH}", note: "The 5-year loan is underpriced by 4× under the average approach." },
    { name: "WAL method (uncertain-cash-flow amortizing pools)", math: "\\text{Charge} = \\text{matched-maturity rate at portfolio's WAL}\\times\\text{portfolio balance}", note: "$1B of 15yr loans, WAL=8yr, 8yr rate=58bps → charge=$5.8M." },
    { name: "Contingent commitment charge rate", math: "\\text{Rate} = \\dfrac{\\text{prob. of drawdown}\\times\\text{undrawn amount}\\times\\text{cushion cost}}{\\text{total credit line amount}}", note: "$20M line, $15M undrawn, 70% draw prob, 15bps cushion cost → rate=0.07875% → charge=$15,750." }
  ],

  concepts: [
    {
      name: "LTP process and governance best practices",
      def: "LTP should be centrally managed by a group treasury, using the marginal cost of funds matched to product maturity (historically LIBOR/swap curve; going forward, SOFR-based). Loans (assets) are charged a liquidity premium; deposits (liabilities) are credited for the liquidity they provide, based on maturity.",
      example: "Pre-crisis deficiencies: decentralized funding with weak controls, LMIS unable to compute granular costs, compensation schemes rewarding profits that ignored liquidity cost, underpricing via zero/average-cost approaches, no stress-test-based sizing of the liquidity cushion, illiquid long-term assets funded on cheap overnight money, flat average charges that ignored business-line-specific contingent risk.",
      related: []
    },
    {
      name: "Four LTP approaches (ascending quality)",
      def: "Zero cost: rate=swap curve, no spread added at all — liquidity treated as free, massively underprices long-term illiquid assets. Pooled average cost: one flat spread above/below swap curve for all maturities — undercharges long-tenor assets, overcharges short; distorts loan-to-deposit ratio if spread is adjusted. Separate average cost: different flat spread for assets vs. liabilities, still flat across maturities — same maturity-blindness, just for two curves instead of one. Matched-maturity marginal cost (best practice): spread varies by maturity, based on the bank's actual current market cost of funds — operationally harder to build/maintain, but prices risk correctly.",
      example: "Bank MMM charges 1bp/1yr and 80bps/5yr on $100,000 loans → $10 and $80. Bank AVG charges flat 2bps regardless of maturity → $20 for BOTH the 1-year and 5-year loan. The 5-year loan is underpriced by 4× under the average approach.",
      related: ["Amortizing loan tranching approach"],
      memory: "Zero cost (worst) → pooled average → separate average → matched-maturity marginal (best) — each step adds more precision about WHO actually bears the liquidity cost."
    },
    {
      name: "Amortizing loan (tranching approach)",
      def: "A 5-year, $500,000 loan repaying $100,000 principal/year is treated as five separate $100,000 bullet loans at 1,2,3,4,5 years and summed.",
      pitfall: "The total charge lands close to (but UNDER) a pure 5-year bullet loan's charge, reflecting that principal is returned progressively, not all at maturity.",
      related: ["Weighted-average life (WAL) method"]
    },
    {
      name: "Weighted-average life (WAL) method",
      def: "For uncertain-cash-flow amortizing pools: Charge = matched-maturity rate at the portfolio's WAL × portfolio balance.",
      example: "$1B of 15-year amortizing loans expected to actually repay (via prepayment behavior) over a WAL of 8 years; current 8-year matched-maturity rate=58bps → charge=0.0058×$1B=$5.8 million.",
      pitfall: "Deposits mirror the asset-side logic: 'sticky' (term deposits) vs. 'hot/volatile' (demand deposits, savings, transaction accounts) — credit given should reflect ACTUAL expected duration of the funding.",
      related: []
    },
    {
      name: "Contingent liquidity risk pricing",
      def: "Rate charged = (probability of drawdown × undrawn amount × liquidity cushion cost) / total credit line amount.",
      example: "$20M line, $5M drawn, $15M undrawn with 70% probability of draw, liquidity cushion cost=15bps. Rate = (0.70×$15M×0.0015)/$20M = 0.07875% → charge = 0.0007875×$20M = $15,750.",
      pitfall: "The liquidity cushion itself (per LCR/NSFR) should be built from cash and government securities — NOT overnight funding — and its cost should be attributed to the business activities MOST LIKELY to draw on it, rather than spread as a flat average across all assets.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 76, why: "Repo market rates are the actual observable cost-of-funds curve that matched-maturity marginal cost pricing is calibrated against." }
    ],
    to: [],
    confused: [
      { what: "Pooled average cost vs separate average cost", how: "Pooled: ONE flat spread for all assets and liabilities combined. Separate: TWO flat spreads (one for assets, one for liabilities) — but both remain maturity-blind, unlike matched-maturity marginal cost." },
      { what: "The matched-maturity curve relative to average cost — always higher?", how: "It sits ABOVE the average cost curve for long-tenor assets but BELOW it for short-tenor assets — not simply 'always higher.' It correctly reprices risk in both directions relative to a flat average." }
    ]
  },

  misconceptions: [
    { wrong: "\"The matched-maturity marginal cost of funds curve is always higher than the average cost curve.\"", right: "It sits ABOVE average cost for long-tenor assets but BELOW it for short-tenor assets — it correctly reprices risk in BOTH directions relative to a flat average, not simply 'always higher.'" },
    { wrong: "\"Zero-cost and pooled-average-cost LTP approaches are reasonably close substitutes for matched-maturity marginal cost.\"", right: "Zero-cost treats liquidity as entirely free (massively underprices long-term illiquid assets); pooled average cost applies one flat spread regardless of maturity (undercharging long-tenor, overcharging short). Both are meaningfully inferior to matched-maturity marginal cost, which is the recommended best practice specifically because it prices maturity-specific risk correctly." },
    { wrong: "\"The liquidity cushion should be funded with cheap overnight money to minimize cost.\"", right: "The liquidity cushion itself (per LCR/NSFR) should be built from CASH AND GOVERNMENT SECURITIES, not overnight funding — using cheap overnight money to fund the very buffer meant to protect against a funding crisis defeats its purpose." }
  ],

  highYield: [
    { stars: 5, what: "Four LTP approaches in ascending quality order, and the worked example showing 4× underpricing of long-tenor loans under average cost.", why: "The signature lesson of this reading and a direct application of the book's recurring 'marginal beats average' theme." },
    { stars: 4, what: "WAL method for uncertain-cash-flow pools, and the amortizing-loan tranching approach.", why: "Specific, calculation-testable methods for handling non-bullet cash flow structures." },
    { stars: 4, what: "Contingent commitment charge rate formula and full worked calculation.", why: "A precise, multi-input formula frequently tested with new numbers." },
    { stars: 3, what: "Matched-maturity curve sits above average cost for long tenor, below for short tenor (not simply 'always higher').", why: "A precise directional nuance, explicitly flagged as a common misunderstanding." }
  ],

  recall: [
    { q: "A bank uses pooled average cost LTP with a flat 3bps spread. Why does this systematically underprice a 7-year loan while overpricing a 3-month loan?", a: "Pooled average cost applies ONE flat spread regardless of maturity, essentially averaging the true (maturity-varying) liquidity cost across all tenors. Since longer-tenor assets carry genuinely higher liquidity risk (and thus should command a higher spread) while shorter-tenor assets carry lower risk (and should command a lower spread), the flat average necessarily UNDERcharges the long-tenor loan and OVERcharges the short-tenor one relative to their true, maturity-specific liquidity costs." },
    { q: "A $1B pool of 20-year amortizing loans is expected, via historical prepayment behavior, to actually repay over a weighted-average life of 6 years. The current 6-year matched-maturity rate is 45bps. Compute the LTP charge.", a: "Charge = 0.0045 × $1,000,000,000 = $4,500,000." },
    { q: "A $30M credit line has $10M drawn and $20M undrawn, with a 60% probability of the undrawn portion being drawn under stress, and a liquidity cushion cost of 20bps. Compute the contingent commitment charge.", a: "Rate = (0.60×$20M×0.0020)/$30M = $24,000/$30,000,000 = 0.08%. Charge = 0.0008×$30,000,000 = $24,000." },
    { q: "Why should the liquidity cushion held against contingent commitments be built from cash and government securities rather than funded with cheap overnight borrowing?", a: "The whole PURPOSE of the liquidity cushion is to be reliably available during a funding stress event. If the cushion itself were funded with overnight borrowing, that funding could evaporate in the very same stress scenario the cushion is meant to protect against — undermining its reliability exactly when needed. Cash and government securities are stable, unencumbered, and don't depend on continued market access to remain available." }
  ],

  hooks: [
    { title: "4× underpriced, and nobody notices until it's too late", text: "Bank AVG's flat 2bps charge for both a 1-year and 5-year loan looks harmless on a spreadsheet — until you realize the 5-year loan's TRUE cost was 80bps, four times what was charged. That gap is where pre-crisis liquidity risk hid in plain sight." },
    { title: "A cushion that disappears in a storm isn't a cushion", text: "Funding your emergency liquidity buffer with the same overnight money that vanishes in a crisis is like keeping your life jacket glued to the boat that's sinking." }
  ],

  summary: `<p><strong>LTP</strong> should be centrally managed, using marginal cost of funds matched to maturity. <strong>Four approaches</strong> (ascending quality): zero cost (liquidity=free) → pooled average cost (one flat spread) → separate average cost (two flat spreads) → <strong>matched-maturity marginal cost</strong> (best practice — spread varies by maturity, correctly above average for long tenor, below for short). Worked example: flat 2bps underprices a 5-year loan by 4× vs. the correct 80bps. <strong>Amortizing loans</strong>: tranche into bullet-equivalent pieces; <strong>WAL method</strong> for uncertain-cash-flow pools: charge=matched-maturity rate at WAL×balance. <strong>Contingent commitment charge</strong> = (draw probability×undrawn×cushion cost)/total line; the liquidity cushion itself must be cash/govt securities, not overnight funding.</p>`
});
