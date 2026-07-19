FRM.register({
  book: 4, reading: 71,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Liquidity Stress Testing",
  tagline: "Builds the formal liquidity stress-testing framework: four funding-liquidity categories, one core sufficiency formula, and six design dimensions that determine whether a stress test is useful or just theater.",

  teaches: `<p>Four categories of funding liquidity, the stressed liquidity asset buffer formula, and six stress test design dimensions.</p>`,

  why: `<p>A stress test's usefulness depends entirely on its DESIGN — scope, scenario development, assumptions, outputs, governance, and integration with other models. Get any of these six wrong and the test becomes theater rather than genuine risk management.</p>`,

  intuition: `<p>Reverse stress tests flip the usual logic: instead of picking a scenario and forecasting its impact, you assume FAILURE first and work backward to find the critical drivers that would cause it — a useful supplement to forward-looking hypotheticals, since it can reveal vulnerabilities a forward-looking scenario might never think to test.</p>
  <p>"Garbage in, garbage out" is the reading's warning about assumptions: the whole stress test is only as good as its key assumptions (investment portfolio haircuts, deposit outflows, unsecured wholesale funding, collateral requirements, contingent liabilities, business reduction) — a technically sophisticated model built on unrealistic assumptions produces a false sense of security.</p>`,

  formulas: [
    { name: "Stressed liquidity asset buffer", math: "\\text{stressed buffer} = \\text{(normal) liquidity asset buffer} - \\text{stressed cash outflows} + \\text{stressed cash inflows}", note: "Sufficiency check: does the buffer stay positive under stress?" }
  ],

  concepts: [
    {
      name: "Four categories of funding liquidity",
      def: "Operational: day-to-day operating needs. Contingent: high-quality liquid assets + credit facilities held for stressed scenarios. Strategic: funds reserved for investment opportunities. Restricted: liquid assets with predetermined, fixed operational uses (not freely available).",
      pitfall: "'Restricted' liquid assets are NOT freely available despite technically being liquid — a subtle but testable distinction from contingent/strategic buffers.",
      related: [],
      memory: "Operational: day-to-day. Contingent: for stress. Strategic: for opportunities. Restricted: liquid but locked."
    },
    {
      name: "Stressed liquidity asset buffer",
      def: "Stressed buffer = normal buffer − stressed cash outflows + stressed cash inflows.",
      related: []
    },
    {
      name: "Six stress test design dimensions",
      def: "Scope: consolidated firm-wide as the starting point, but also parent-only, subsidiary-level, business-line, or business-unit tests. Scenario development: establish a benchmark first; historical (real but few examples) vs. hypothetical (forward-looking); systemic-only/idiosyncratic-only/combined scenarios; reverse stress tests assume failure and work backward. Assumptions: 'garbage in, garbage out' — key assumptions are investment portfolio haircuts, deposit outflows, unsecured wholesale funding, collateral requirements, other contingent liabilities, business reduction. Outputs: stress assumptions, current liquidity position metrics, future liquidity position metrics, capital/performance metrics. Governance: ALCO, treasury (1st line), risk management (2nd line), internal audit (3rd line), model risk management. Integration with other models: capital stress testing, ALM, and funds transfer pricing (FTP) should all be consistent with the liquidity stress test.",
      pitfall: "Reverse stress tests are a USEFUL SUPPLEMENT to forward-looking hypotheticals, not a replacement — know both directions of stress test design.",
      related: [{ r: 55, label: "R55 — reverse testing as one of ERM's three stress-testing approaches" }],
      memory: "Six dimensions: who's tested (scope), what happens (scenario), what's assumed (assumptions), what comes out (outputs), who's accountable (governance), and does it match other models (integration)."
    }
  ],

  connections: {
    from: [
      { r: 69, why: "Liquidity stress testing shocks exactly the cash-flow term structures monitored there under adverse scenarios." },
      { r: 55, why: "Reverse stress testing, previewed generally there, gets applied specifically to liquidity here." }
    ],
    to: [
      { r: 72, why: "This reading's stress framework gets attached to specific named reports and cadences." },
      { r: 73, why: "The contingency funding plan's scenarios must be consistent with this reading's stress test scenarios." }
    ],
    confused: [
      { what: "Contingent vs restricted liquid assets", how: "Contingent assets are HELD for stress scenarios (available when needed); restricted assets have predetermined, fixed uses and are NOT freely available despite being liquid." },
      { what: "Historical vs hypothetical scenarios", how: "Historical: based on real past events (fewer examples available). Hypothetical: forward-looking, using best available information — not tied to a specific past event." }
    ]
  },

  misconceptions: [
    { wrong: "\"Restricted liquid assets can be freely used to cover any funding shortfall, since they are liquid.\"", right: "Restricted liquid assets have PREDETERMINED, FIXED operational uses and are NOT freely available for general funding needs, despite technically being liquid." },
    { wrong: "\"Reverse stress tests replace the need for forward-looking hypothetical scenarios.\"", right: "Reverse stress tests are a USEFUL SUPPLEMENT to forward-looking hypotheticals, not a replacement — both approaches serve complementary purposes in a comprehensive stress-testing framework." }
  ],

  highYield: [
    { stars: 4, what: "Four funding liquidity categories (operational, contingent, strategic, restricted) and their distinct availability.", why: "A precise four-way classification frequently tested via scenario matching." },
    { stars: 4, what: "Six stress test design dimensions, especially assumptions ('garbage in, garbage out') and reverse stress testing.", why: "The comprehensive framework this reading builds — a recurring source of conceptual questions." },
    { stars: 3, what: "Stressed liquidity asset buffer formula.", why: "A simple, direct calculation worth quick fluency." }
  ],

  recall: [
    { q: "A bank holds $50M in liquid assets, but $20M of that is contractually earmarked for a specific planned capital expenditure. How should this $20M be categorized, and why does it matter for stress testing?", a: "It should be categorized as RESTRICTED liquidity — technically liquid, but with a predetermined, fixed operational use that makes it unavailable for general funding shortfalls. In a liquidity stress test, only the unrestricted $30M should be counted as genuinely available buffer capacity; including the restricted $20M would overstate the bank's true stress resilience." },
    { q: "Why is a reverse stress test a valuable complement to a standard forward-looking hypothetical scenario test?", a: "A forward-looking hypothetical scenario test starts from an assumed shock and forecasts its impact — it can only reveal vulnerabilities the scenario designer thought to test. A reverse stress test starts from an assumed FAILURE outcome and works backward to identify what combination of circumstances would cause it — this can surface critical vulnerabilities and failure paths that scenario designers might never have thought to construct forward, providing a genuinely different angle of insight." }
  ],

  hooks: [
    { title: "Garbage in, garbage out", text: "A stress test is only as trustworthy as its assumptions — haircuts, deposit outflows, wholesale funding behavior. Sophisticated modeling on unrealistic assumptions is theater, not risk management." },
    { title: "Working backward from the grave", text: "Reverse stress testing starts at the tombstone and works backward to find the cause of death — a genuinely different angle than guessing scenarios forward and hoping one matches reality." }
  ],

  summary: `<p><strong>Four funding liquidity categories</strong>: operational (day-to-day), contingent (stress-scenario buffer), strategic (opportunities), restricted (liquid but locked to fixed uses). <strong>Stressed buffer</strong> = normal buffer − stressed outflows + stressed inflows. <strong>Six design dimensions</strong>: scope (firm-wide to business-unit), scenario development (historical/hypothetical/reverse), assumptions ('garbage in, garbage out'), outputs, governance (ALCO, 3 lines), integration with other models (capital stress testing, ALM, FTP).</p>`
});
