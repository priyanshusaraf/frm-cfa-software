FRM.register({
  book: 4, reading: 67,
  session: "Liquidity Risk Management",
  title: "Liquidity and Reserves Management: Strategies and Policies",
  tagline: "The bank treasurer's actual day job: measuring the net liquidity position, choosing a management strategy, estimating liquidity needs with four named approaches, and managing legal reserve requirements.",

  teaches: `<p>Net liquidity position, three liquidity management strategies, four approaches to estimating liquidity requirements, liquidity indicator ratios, and legal reserves mechanics.</p>`,

  why: `<p>The four estimation approaches and the reserve formula are the testable core. This reading gives you the practical toolkit a treasurer actually uses day-to-day to answer "do we have enough liquidity right now, and where does more come from if not?"</p>`,

  intuition: `<p>Net liquidity position is simple arithmetic: supplies of liquidity minus demands for liquidity. Negative means you have a deficit and must raise funds; positive means you have a surplus to invest. The four estimation approaches are four different LENSES on the same question: sources-and-uses tracks deposit/loan flows directly; structure-of-funds splits funding by withdrawal likelihood (hot money vs. core deposits); liquidity indicator uses benchmarked ratios; market signals watches external confidence signals (stock price, borrowing risk premiums).</p>`,

  formulas: [
    { name: "Net liquidity position", math: "L = \\text{supplies of liquidity} - \\text{demands for liquidity}", note: "L<0: deficit, must raise funds. L>0: surplus, invest the excess." },
    { name: "Total required legal reserves", math: "= reservable liabilities \\times applicable reserve ratio (summed across categories)", note: "Excess reserves = legal reserves > required; deficit = legal reserves < required." }
  ],

  concepts: [
    {
      name: "Net liquidity position",
      def: "L = supplies of liquidity − demands for liquidity. L<0: liquidity deficit, must raise funds. L>0: liquidity surplus, invest the excess.",
      example: "Costs of managing liquidity: search/transaction costs, interest costs on borrowed funds, opportunity costs of liquidating assets.",
      related: []
    },
    {
      name: "Three liquidity management strategies",
      def: "Asset conversion (hold liquid assets, convert to cash as needed: T-bills, CDs, munis, interbank deposits, repos, Eurocurrency loans, fed funds, agency securities). Liability management (borrow to cover needs: jumbo negotiable CDs, repos, Eurocurrency issuance, fed funds borrowing, discount window, FHLB advances). Balanced approach (blend of both).",
      related: []
    },
    {
      name: "Four approaches to estimating liquidity requirements",
      def: "Sources and uses of funds: deposit increases ↑ liquidity, loan increases ↓ liquidity — positive gap=surplus, negative gap=deficit. Structure of funds: split funding into hot money/vulnerable funds/core deposits by withdrawal likelihood, reserve each per an operating rule; can extend to best/likely/worst-case scenario probabilities. Liquidity indicator: ratio-based, benchmarked to industry experience. Market signals (discipline): watch public confidence, stock price, forced asset sales, borrowing risk premiums, central bank borrowing, credit commitments.",
      pitfall: "Liquidity indicator ratios split into TWO directions: higher = more liquid (cash position, liquid securities, core deposit ratio, hot money ratio, net fed funds/repo position) vs. higher = LESS liquid (capacity ratio, loan commitments ratio, pledged securities ratio, deposit composition ratio, deposit brokerage index). Memorize which bucket each named ratio falls into rather than assuming 'higher is always safer.'",
      related: [],
      memory: "Four lenses, one question: sources/uses tracks flows, structure-of-funds sorts by stickiness, liquidity indicator uses ratios, market signals watches the crowd's confidence."
    },
    {
      name: "Legal reserves",
      def: "Total required legal reserves = reservable liabilities × the applicable reserve ratio (summed across each reservable category).",
      example: "Reserve computation period, then a maintenance period starting 30 days after the computation period begins. Excess reserves = legal reserves > required; deficit = legal reserves < required — the goal is zero excess and zero (penalty-triggering) deficit.",
      pitfall: "A clearing balance is reserve held VOLUNTARILY at the Fed to cover debit items — distinct from required legal reserves. The fed funds market is the cheap-but-volatile go-to for covering a deficit; alternatives: sell liquid securities, draw balances at other institutions, use repos, borrow Eurocurrency, sell time deposits.",
      related: [],
      memory: "The goal isn't maximum reserves — it's exactly zero excess AND zero deficit, since both cost something."
    }
  ],

  connections: {
    from: [
      { r: 66, why: "The investment portfolio described there becomes part of the liquid-asset toolkit managed here." }
    ],
    to: [
      { r: 68, why: "Intraday liquidity management is this reading's day-to-day treasury function, zoomed into the finest time scale." },
      { r: 75, why: "Deposit categorization (structure of funds: hot money vs core deposits) reappears in deposit pricing strategy." }
    ],
    confused: [
      { what: "Higher-is-more-liquid vs higher-is-less-liquid indicator ratios", how: "Cash position/liquid securities/core deposit ratio/hot money ratio/net fed funds position: higher=more liquid. Capacity ratio/loan commitments ratio/pledged securities ratio/deposit composition ratio/deposit brokerage index: higher=LESS liquid — memorize which bucket, don't assume direction." }
    ]
  },

  misconceptions: [
    { wrong: "\"A higher value for any liquidity indicator ratio always signals a more liquid, safer position.\"", right: "Ratios split into two directions: cash position, liquid securities, core deposit ratio, hot money ratio, and net fed funds/repo position are higher=more liquid; but capacity ratio, loan commitments ratio, pledged securities ratio, deposit composition ratio, and deposit brokerage index are higher=LESS liquid." },
    { wrong: "\"A bank's goal should be to maximize its legal reserves held.\"", right: "The goal is ZERO excess AND zero deficit — both excess reserves (opportunity cost of idle funds) and deficits (penalty-triggering) are costly; the target is precise adequacy, not maximization." }
  ],

  highYield: [
    { stars: 4, what: "Liquidity indicator ratios: which direction (higher=more liquid vs. higher=less liquid) each named ratio falls into.", why: "Explicitly flagged as a memorization trap — 'higher is always safer' is the wrong instinct." },
    { stars: 3, what: "Four approaches to estimating liquidity requirements and their distinct logics.", why: "A clean four-way classification, good for matching-style questions." },
    { stars: 2, what: "Net liquidity position formula and legal reserves formula.", why: "Simple, direct calculation fluency." }
  ],

  recall: [
    { q: "A bank's 'loan commitments ratio' rises significantly quarter over quarter. Does this signal improving or deteriorating liquidity?", a: "Deteriorating — the loan commitments ratio is one of the ratios where HIGHER values signal LESS liquidity (more undrawn commitments represent potential future funding demands the bank must be prepared to meet)." },
    { q: "Why does the reading emphasize that a bank's legal reserves target is zero excess AND zero deficit, rather than simply 'as much reserve as possible'?", a: "Excess reserves represent idle funds not earning a return (an opportunity cost), while a deficit triggers regulatory penalties — both are costly in different ways. The optimal target is precise adequacy: exactly meeting the requirement, neither more nor less, to avoid both costs." }
  ],

  hooks: [
    { title: "Two directions, one list", text: "Half these ratios say 'more is safer,' half say 'more is scarier' — the trap is assuming they all point the same way. Sort them into buckets, not a single scale." }
  ],

  summary: `<p><strong>Net liquidity position</strong> L=supplies−demands; negative=deficit, positive=surplus. <strong>Three strategies</strong>: asset conversion, liability management, balanced. <strong>Four estimation approaches</strong>: sources/uses of funds, structure of funds (hot money/vulnerable/core), liquidity indicator (ratio-based), market signals (confidence-based). <strong>Liquidity ratios</strong> split into higher=more-liquid vs higher=less-liquid buckets — memorize which. <strong>Legal reserves</strong> = reservable liabilities×ratio; target zero excess AND zero deficit; clearing balance is voluntary Fed-held reserve; fed funds market is the cheap-but-volatile deficit-covering tool.</p>`
});
