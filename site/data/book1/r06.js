FRM.register({
  book: 1, reading: 6,
  session: "Risk Measurement",
  title: "Messages From the Academic Literature",
  tagline: "A conceptual bridge chapter — the research verdict on VaR's blind spots, previewing themes that get built out fully in later books.",

  teaches: `<p>Almost entirely qualitative, no heavy formulas. This reading previews liquidity risk, stressed VaR, integrated capital, and VaR's mathematical flaws — themes that Books 1-5 will build out fully. Treat it as the research-summary chapter between the VaR toolkit (R1-5) and correlation risk (R7-9).</p>`,

  why: `<p>Regulators and risk managers don't just need formulas — they need to know where the formulas' assumptions break. This reading collects the academic community's verdict on VaR's mathematical flaws (non-subadditivity), the liquidity dimension VaR ignores, and the aggregation question (does compartmentalized risk measurement over- or under-state true risk?). Every theme here resurfaces as a fully built-out topic later.</p>`,

  intuition: `<p>Think of this as the research memo a regulator reads before deciding to replace VaR with ES (R16). The single most important idea: <strong>VaR is not subadditive</strong> — a merged portfolio's VaR can exceed the sum of its parts' VaRs. That's a mathematical failure, not just a practical inconvenience: it means VaR can penalize diversification, the opposite of what a risk measure should do. ES fixes this by construction.</p>`,

  formulas: [],

  concepts: [
    {
      name: "VaR time horizon — no universal answer",
      def: "There is no single 'correct' VaR horizon — it depends on portfolio liquidity and purpose. The common 10-day convention is a regulatory convention, not a law of nature.",
      pitfall: "Don't treat the \\(\\sqrt{10}\\) scaling rule as universally valid — it assumes i.i.d. returns, which real markets violate especially in stress.",
      related: [{ r: 16, label: "R16 — FRTB's multiple liquidity horizons directly address this" }]
    },
    {
      name: "Time-varying volatility",
      def: "Ignoring volatility clustering understates risk in calm-before-storm periods; incorporating it makes VaR procyclical (rises exactly when capital is scarce) and estimation noisier.",
      related: [{ r: 2, label: "R2 — volatility-weighted and filtered HS respond to this" }]
    },
    {
      name: "Exogenous vs endogenous liquidity risk",
      def: "Exogenous liquidity = market-wide bid/ask cost, independent of your trade size (→ liquidity-adjusted VaR, LVaR). Endogenous liquidity = YOUR OWN trade size moves the price — most relevant for large, complex, illiquid positions in stressed conditions.",
      pitfall: "Don't conflate the two: exogenous is a market feature you can price in with a spread add-on; endogenous requires modeling your own price impact, a fundamentally harder problem.",
      related: [{ r: 63, label: "R63 — full liquidity risk framework" }],
      memory: "Exogenous = the market's toll booth. Endogenous = your truck is too big for the road."
    },
    {
      name: "VaR vs ES vs spectral risk measures",
      def: "VaR is NOT subadditive — a merged portfolio's VaR can exceed the sum of its parts' VaRs, a genuine mathematical flaw. ES is always subadditive and captures tail severity. Spectral risk measures generalize ES further with a full risk-aversion weighting function (ES is the special 'flat tail weight' case).",
      pitfall: "'VaR is not subadditive' is one of the single most-tested one-liners in the whole book — it's the core theoretical argument for preferring ES in a regulatory context.",
      related: [{ r: 1, label: "R1 — coherent risk measures, of which ES is one" }, { r: 16, label: "R16 — FRTB replaces VaR with ES precisely because of this" }],
      memory: "Subadditive = 'diversification should never look worse.' VaR can violate this; ES cannot."
    },
    {
      name: "Unified vs compartmentalized risk aggregation",
      def: "Basel is compartmentalized — separate market + credit + op risk capital, summed. This non-integrated approach ignores interaction/diversification effects across risk types, which can mis-measure true risk in EITHER direction.",
      related: [{ r: 56, label: "R56 — economic capital tries to integrate across risk types" }]
    },
    {
      name: "Top-down vs bottom-up aggregation",
      def: "Top-down studies (aggregate historical loss data across risk types) tend to find diversification (ratio < 1). Bottom-up studies (build up from individual risk components) are mixed — some find risk COMPOUNDING (ratio > 1), especially when risks aren't cleanly separable.",
      pitfall: "Don't assume aggregation always finds diversification benefit — the bottom-up literature is genuinely mixed, and compounding is a real, tested possibility.",
      related: [{ r: 56, label: "R56 — diversification benefit in economic capital" }]
    },
    {
      name: "Leverage and procyclicality",
      def: "Leverage is inversely related to net worth. Booms loosen VaR-based capital constraints (more room to borrow); busts tighten them (forced asset sales) — a feedback loop that VaR-based capital regulation can actually AMPLIFY rather than dampen.",
      intuition: "VaR-based capital rules were meant to make the system safer, but by construction they force selling exactly when prices are already falling (deleveraging into a falling market) — a self-reinforcing spiral.",
      related: [{ r: 63, label: "R63 — the liquidity spiral mechanism this describes" }, { r: 64, label: "R64 — leverage and liquidity risk in depth" }],
      memory: "Procyclical = the regulation breathes with the cycle instead of against it."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "This reading is the academic verdict on the tools R1 just built." },
      { r: 4, why: "Backtesting's practical difficulties feed the broader 'can we trust VaR' theme here." }
    ],
    to: [
      { r: 16, why: "FRTB is the direct regulatory response: ES replaces VaR, multiple liquidity horizons replace one." },
      { r: 63, why: "Exogenous/endogenous liquidity and the leverage-procyclicality spiral are built out fully in Book 4." },
      { r: 56, why: "The unified-vs-compartmentalized aggregation question becomes the economic capital diversification debate." }
    ],
    confused: [
      { what: "Procyclicality vs volatility clustering", how: "Volatility clustering is a statistical property of returns; procyclicality is what happens when a REGULATORY RULE reacts to that clustering by forcing deleveraging in downturns." },
      { what: "Exogenous vs endogenous liquidity", how: "Exogenous is priced by the bid-ask spread regardless of who you are; endogenous appears only because YOUR trade is large enough to move the market." }
    ]
  },

  misconceptions: [
    { wrong: "\"A merged portfolio's VaR can never exceed the sum of its parts' VaRs.\"", right: "It can — VaR is not subadditive. This is a genuine mathematical failure of VaR as a risk measure, and it's the central argument for ES." },
    { wrong: "\"10-day VaR is the objectively correct horizon.\"", right: "It's a convention, not a law — the right horizon depends on the portfolio's liquidity and the risk measurement's purpose." },
    { wrong: "\"Aggregating risk types always reveals diversification benefit.\"", right: "Top-down studies mostly find diversification; bottom-up studies are mixed and sometimes find compounding (ratio > 1) when risks aren't cleanly separable." },
    { wrong: "\"VaR-based capital regulation stabilizes the system.\"", right: "It can amplify procyclicality — tightening exactly when deleveraging is already underway, forcing more asset sales into a falling market." }
  ],

  highYield: [
    { stars: 5, what: "VaR is not subadditive — meaning and consequence.", why: "The single most-tested one-liner in Book 1; directly justifies FRTB's ES replacement in R16." },
    { stars: 4, what: "Exogenous vs endogenous liquidity risk.", why: "A clean conceptual distinction reused throughout Book 4's liquidity framework." },
    { stars: 3, what: "Leverage, procyclicality, and the VaR-driven deleveraging spiral.", why: "Connects directly to R63-64's liquidity spiral mechanism — recognizing the link earns synthesis-question points." },
    { stars: 2, what: "Top-down vs bottom-up risk aggregation findings.", why: "Lower formula density but a recurring 'which finding is correct' conceptual question." }
  ],

  recall: [
    { q: "Give a concrete scenario where VaR violates subadditivity.", a: "Two positions each with small VaR individually (e.g., digital options with small probability of large loss) can combine into a merged position whose VaR captures a scenario neither alone triggers, making merged VaR exceed the sum — precisely the failure ES avoids by averaging over the whole tail." },
    { q: "Why is 'ignoring time-varying volatility' and 'incorporating time-varying volatility' both criticized in the literature?", a: "Ignoring it understates risk in a volatility upswing (using a stale, low-vol estimate). Incorporating it makes VaR procyclical and jumpier — right before a crisis it may spike, right after may fall too fast; there's no clean free lunch." },
    { q: "Distinguish exogenous and endogenous liquidity risk with an example each.", a: "Exogenous: the bid-ask spread on a stock, the same for any trader regardless of size — priced via LVaR spread add-on. Endogenous: a hedge fund trying to unwind a position so large it moves the price against itself — requires modeling its own price impact." },
    { q: "Explain the leverage-procyclicality feedback loop in one sentence.", a: "Booms raise net worth, loosening VaR-based capital constraints and enabling more borrowing; busts shrink net worth, tightening constraints and forcing asset sales into an already-falling market, which is a spiral VaR-based regulation can amplify rather than dampen." }
  ],

  hooks: [
    { title: "The subadditivity flag", text: "'VaR is not subadditive' is Book 1's single most reusable exam sentence — plant it early. Every time ES appears as 'the fix,' this is the flaw being fixed." },
    { title: "Toll booth vs oversized truck", text: "Exogenous liquidity is the toll booth everyone pays; endogenous liquidity is your truck being too big for the road — a problem only you create." }
  ],

  summary: `<p>Qualitative bridge reading. <strong>No universal VaR horizon</strong> — 10-day is convention. <strong>Time-varying volatility</strong>: ignore it → understated risk; model it → procyclical, noisier VaR. <strong>Exogenous liquidity</strong> (market-wide spread, LVaR) vs <strong>endogenous liquidity</strong> (your own trade moves the price). <strong>VaR is not subadditive</strong> (can penalize diversification) — ES is always subadditive; spectral measures generalize ES with a full weighting function. Basel's <strong>compartmentalized</strong> risk aggregation ignores cross-risk-type interactions. <strong>Top-down</strong> aggregation studies find diversification; <strong>bottom-up</strong> studies are mixed, sometimes finding compounding. <strong>Leverage-procyclicality</strong>: VaR-based capital rules can amplify boom-bust cycles via forced deleveraging.</p>`
});
