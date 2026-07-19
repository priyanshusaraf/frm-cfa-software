FRM.register({
  book: 4, reading: 75,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Managing Nondeposit Liabilities",
  tagline: "Closes Session 11 with the non-deposit half of bank funding: what sources exist, how to size the funding gap, and the two ways to estimate the bank's overall cost of funds.",

  teaches: `<p>Nondeposit funding sources, the available funds gap formula, and two approaches to estimating overall funding cost (historical average vs. pooled funds).</p>`,

  why: `<p>When deposits alone can't cover a bank's funding needs, nondeposit sources fill the gap — but each source has a different cost, risk profile, and regulatory treatment. The available funds gap formula is how a treasurer quantifies exactly how much nondeposit funding is actually needed.</p>`,

  intuition: `<p>The two cost-estimation approaches look in opposite directions: HISTORICAL AVERAGE COST is backward-looking — what did all our existing funding actually cost us? POOLED FUNDS is forward-looking — what's the minimum return we need to earn on NEW loans/securities to cover the cost of all NEW funds? A bank pricing a new loan should care about the forward-looking pooled-funds number, not the backward-looking historical average, since past funding costs are sunk.</p>`,

  visual: `<div class="widget" data-widget="ladder" data-ladder='[{"bucket":"Available funds gap","gap":80}]'></div>`,

  formulas: [
    { name: "Available funds gap", math: "= (\\text{current} + \\text{projected loans/investments}) - (\\text{current} + \\text{expected deposit inflows/available funds})", note: "A positive gap means nondeposit funding is needed to cover the shortfall." }
  ],

  concepts: [
    {
      name: "Nondeposit funding sources",
      def: "Fed funds (overnight interbank), repos (collateralized short-term), discount window (Fed loan, requires acceptable collateral), FHLB advances (historically mortgage-lender-focused), negotiable (jumbo) CDs (legally deposits, functionally money-market instruments), Eurocurrency deposits (Eurodollar = USD deposits at non-U.S. banks), commercial paper (days to 270 days, discount-issued), long-term nondeposit debt (more a secondary-capital source than a funding source).",
      pitfall: "Negotiable (jumbo) CDs are LEGALLY deposits but FUNCTIONALLY behave like money-market instruments — a subtle classification nuance worth remembering.",
      related: []
    },
    {
      name: "Available funds gap",
      def: "= (current + projected loans and other investments) − (current + expected deposit inflows and other available funds).",
      pitfall: "Choice among nondeposit sources depends on: relative cost, risk (interest rate risk, availability risk), needed maturity, and regulatory requirements — not just cost alone.",
      related: []
    },
    {
      name: "Two ways to estimate overall funding cost",
      def: "Historical average cost: backward-looking — cost of all funding raised to date (interest + noninterest costs + required shareholder return). Pooled funds: forward-looking — minimum return the bank must earn on NEW loans/securities to cover the cost of all new funds (deposits + nondeposit + equity).",
      pitfall: "A bank deciding whether to make a NEW loan should use the POOLED FUNDS (forward-looking) approach, not historical average cost — past funding costs are sunk and irrelevant to a forward-looking pricing decision.",
      related: [],
      memory: "Historical average: what did it cost us so far? Pooled funds: what must new business earn to cover new funding costs?"
    }
  ],

  connections: {
    from: [
      { r: 74, why: "Deposit pricing and nondeposit liability management are the two complementary halves of the bank's funding side." }
    ],
    to: [
      { r: 76, why: "Repurchase agreements, one of the nondeposit sources named here, get their own full mechanical treatment." }
    ],
    confused: [
      { what: "Historical average cost vs pooled funds approach", how: "Historical average is BACKWARD-looking (sunk costs of existing funding); pooled funds is FORWARD-looking (minimum return needed on new business to cover new funding costs) — use pooled funds for forward decisions like new loan pricing." }
    ]
  },

  misconceptions: [
    { wrong: "\"Negotiable (jumbo) CDs are functionally identical to retail deposits in how they behave in the market.\"", right: "They are LEGALLY deposits but FUNCTIONALLY behave like money-market instruments — a nuanced classification that matters for how they should be analyzed." },
    { wrong: "\"A bank should use historical average funding cost when pricing a new loan.\"", right: "A bank should use the POOLED FUNDS (forward-looking) approach for pricing NEW loans — historical average cost reflects sunk costs of past funding, irrelevant to the forward-looking economics of a new lending decision." }
  ],

  highYield: [
    { stars: 3, what: "Historical average cost (backward-looking) vs. pooled funds (forward-looking) — which to use for new lending decisions.", why: "A precise, frequently tested distinction with a clear correct-use-case answer." },
    { stars: 3, what: "Available funds gap formula.", why: "A direct, simple calculation worth quick fluency." },
    { stars: 2, what: "Nondeposit funding source list and the jumbo CD legal-vs-functional classification nuance.", why: "Supporting vocabulary, occasionally tested." }
  ],

  recall: [
    { q: "A bank is deciding what interest rate to charge on a new batch of commercial loans. Should it reference historical average funding cost or the pooled funds approach, and why?", a: "Pooled funds — this forward-looking approach calculates the minimum return the bank must earn on NEW loans/securities to cover the cost of all NEW funds being raised (deposits + nondeposit + equity). Historical average cost reflects the sunk cost of funding already raised, which is irrelevant to correctly pricing new, forward-looking lending decisions." },
    { q: "A bank projects $500M in loans/investments and expects $420M in available deposits and other funds. What is its available funds gap, and what does this imply?", a: "Available funds gap = $500M − $420M = $80M. This positive gap implies the bank needs to raise $80M through nondeposit funding sources (fed funds, repos, FHLB advances, CDs, etc.) to cover its projected loan/investment growth." }
  ],

  hooks: [
    { title: "Sunk cost vs. the road ahead", text: "Historical average cost looks in the rearview mirror — useful for understanding the past, useless for pricing what's next. Pooled funds looks through the windshield — what do NEW funds cost, and what must NEW business earn to cover them?" }
  ],

  summary: `<p><strong>Nondeposit sources</strong>: fed funds, repos, discount window, FHLB advances, negotiable (jumbo) CDs (legally deposits, functionally money-market instruments), Eurocurrency deposits, commercial paper, long-term nondeposit debt. <strong>Available funds gap</strong> = projected loans/investments − projected deposits/available funds; choice among sources depends on cost, risk, maturity, regulation. <strong>Funding cost estimation</strong>: historical average cost (backward-looking, sunk) vs. pooled funds (forward-looking, minimum return needed on new business) — use pooled funds for new lending decisions.</p>`
});
