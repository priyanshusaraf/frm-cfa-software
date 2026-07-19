FRM.register({
  book: 1, reading: 16,
  session: "Term Structures & Volatility",
  title: "Fundamental Review of the Trading Book (FRTB)",
  tagline: "The capstone: every earlier thread in Book 1 gets cashed in by regulation. Here is what banks must actually hold capital against, and why the old answer wasn't good enough.",

  teaches: `<p>This reading is where VaR's non-subadditivity and blindness to tail severity (R1, R6) directly motivate FRTB's replacement of VaR with Expected Shortfall. Backtesting weaknesses (R4) shape FRTB's specific backtesting and P&L attribution rules. Correlation-across-liquidity-horizons (Study Session 2) motivates the multi-horizon liquidity structure. You'll learn liquidity horizons, trading book vs banking book classification, backtesting/P&L attribution under FRTB, and credit risk/securitization treatment.</p>`,

  why: `<p>If Study Session 1 asked "how do we measure risk," Reading 16 is regulators' final answer: "here is what banks must actually hold capital against, and why the old answer wasn't good enough." Every conceptual flaw flagged earlier in the book — VaR's blindness to tail severity, non-subadditivity, single-horizon assumptions, weak backtesting — gets a specific regulatory fix here.</p>`,

  intuition: `<p>The canonical motivating case makes the whole chapter's purpose vivid: a $950M bond portfolio, 2% annual default probability, discretized as 3-in-5 chance of $0 loss, 2-in-5 chance of total ($950M) loss conditional on being in the bad tail. At 95% confidence, VaR = $0 (default probability is below 5%, so the threshold loss is zero) — VaR says "no problem." But ES = 40% × $950M = $380M — ES correctly captures that IF you're in the tail, the loss is catastrophic. This gap between a reassuring VaR and an alarming ES is exactly the scenario FRTB was designed to prevent regulators from missing.</p>
  <p>Under a normal distribution, 99% VaR and 97.5% ES are numerically very close \\((2.326\\sigma\\) vs \\(2.338\\sigma\\) above the mean) — but they diverge sharply under fat-tailed distributions, which is the whole point of preferring ES.</p>`,

  visual: `<div class="widget" data-widget="frtb"></div>`,

  formulas: [
    { name: "VaR vs ES under normality (near-equivalence)", math: "VaR_{99}\\% \\approx \\mu + 2.326\\sigma \\approx ES_{97}._{5}\\% \\approx \\mu + 2.338\\sigma", note: "Nearly identical under normal returns — the two diverge sharply only when tails are fat, which is precisely why the choice matters in practice." }
  ],

  concepts: [
    {
      name: "VaR to ES: the canonical motivating case",
      def: "A $950M bond portfolio, 2% annual default probability: at 95% confidence VaR = $0 (default risk is below the 5% threshold), but ES = 40% × $950M = $380M once you average over the conditional bad-tail outcome.",
      pitfall: "This is the single clearest illustration in the whole curriculum of why VaR can say 'no problem' while ES screams danger — memorize the mechanism (default prob below the confidence threshold → VaR reads zero) not just the punchline.",
      related: [{ r: 1, label: "R1 — ES defined to fix VaR's blindness to tail severity" }, { r: 6, label: "R6 — VaR's non-subadditivity, the same family of flaw" }],
      memory: "VaR asks 'will it happen 5% of the time?' ES asks 'and if it does, how bad?' — this example is the gap between those two questions in dollars."
    },
    {
      name: "Liquidity horizons",
      def: "Five categories (10/20/40/60/120 days) replace a single 10-day horizon for everything. The internal models-based approach (IMA) computes a waterfall of shocks \\(ES_{1}\\) through \\(ES_{5}\\).",
      example: "\\(ES_{1}\\) shocks ALL categories together; \\(ES_{2}\\) holds category 1 fixed and shocks 2-5; and so on — then combines them scaled by the square root of the horizon differences (a direct echo of the \\(\\sqrt{t}\\) scaling rule from Reading 1's return-horizon conventions).",
      related: [{ r: 1, label: "R1 — the √t scaling convention this generalizes" }, { r: 6, label: "R6 — no universal VaR horizon, the conceptual seed of this fix" }],
      memory: "One horizon for everything (old) → five horizons, waterfall-combined (FRTB)."
    },
    {
      name: "Trading book vs banking book classification",
      def: "Dual test for trading-book classification: (1) the bank must be able to actually trade the asset, AND (2) the trading desk must actively manage its risk.",
      pitfall: "Once classified, reclassification is heavily restricted (extraordinary circumstances only) — specifically to shut down regulatory arbitrage where banks moved assets between books to get more favorable capital treatment.",
      related: [{ r: 39, label: "R39 — securitization assets straddle this classification question" }]
    },
    {
      name: "Backtesting and P&L attribution under FRTB",
      def: "Stressed ES itself is NOT backtested (the extreme conditions it targets won't recur with predictable frequency) — instead, VaR is still backtested (1-day horizon, latest 12 months, at 99% or 97.5% confidence).",
      example: "More than 12 exceptions at 99%, or more than 30 at 97.5%, forces a bank onto the standardized approach. Separately, P&L attribution compares actual vs model P&L: ratio D/A should stay within ±10%, and Var(D)/Var(A) should stay under 20%; four or more breaches in 12 months again forces the standardized approach.",
      pitfall: "Two SEPARATE audit mechanisms coexist: backtesting (exception counting, inherited from R4) and P&L attribution (a NEW FRTB-specific test comparing actual vs. risk-model P&L). Don't merge them into one test.",
      related: [{ r: 4, label: "R4 — the backtesting machinery this reading extends" }],
      memory: "Two audits: backtesting counts exceptions (like R4); P&L attribution checks whether the model's OWN P&L story matches the actual desk's."
    },
    {
      name: "Credit risk and securitizations under FRTB",
      def: "The incremental risk charge (IRC, from Basel II.5) addresses two distinct risks: credit spread risk (mark-to-market impact of spread changes, handled via ES) and jump-to-default risk (measured via 99% VaR, one-year horizon).",
      pitfall: "Don't merge the '97.5% ES for general market risk' framework with the '99% VaR for jump-to-default' framework — they are two DIFFERENT measures, at two DIFFERENT confidence levels, for two conceptually different risks (continuous spread risk vs. discrete default risk), coexisting within the same overall FRTB capital calculation. Securitizations move from bank-specific internal models (which created large cross-bank capital variation under Basel II.5's CRM charge) to a single standardized approach under FRTB.",
      related: [{ r: 26, label: "R26 — credit VaR's own confidence-level and horizon choices" }],
      memory: "Spread risk is continuous and gets ES; default is a discrete jump and gets its own 99% VaR — different risks, different rulers."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "ES was defined here specifically to fix VaR's tail-blindness; FRTB makes that fix regulatory law." },
      { r: 4, why: "Backtesting weaknesses directly shape FRTB's specific backtesting AND P&L attribution rules." },
      { r: 6, why: "VaR's non-subadditivity is the single biggest theoretical argument FRTB acts on by replacing VaR with ES." }
    ],
    to: [],
    confused: [
      { what: "Backtesting vs P&L attribution", how: "Backtesting counts VaR exceptions (inherited from R4's framework); P&L attribution is a NEW, separate FRTB test comparing the risk model's predicted P&L to the desk's actual P&L (via the D/A ratio and variance ratio)." },
      { what: "97.5% ES (general market risk) vs 99% VaR (jump-to-default)", how: "Two entirely separate measures within FRTB, for two conceptually different risk types — continuous spread risk (ES) vs discrete default risk (VaR) — never merge them into one number." },
      { what: "Liquidity horizon waterfall vs simple horizon scaling", how: "FRTB's \\(ES_{1}\\) through \\(ES_{5}\\) waterfall holds different risk-factor categories fixed at different stages, then combines via \\(\\sqrt{t}-style\\) scaling — a genuinely more granular version of R1's simple single-horizon scaling." }
    ]
  },

  misconceptions: [
    { wrong: "\"FRTB simply swaps the word VaR for ES everywhere, with no other changes.\"", right: "FRTB is a comprehensive overhaul: multi-horizon liquidity waterfalls, new trading-book/banking-book classification rules, P&L attribution (an entirely new test), and a separate 99% VaR jump-to-default charge alongside the 97.5% ES general market risk charge." },
    { wrong: "\"Stressed ES gets backtested the same way regular VaR does.\"", right: "Stressed ES is explicitly NOT backtested (its extreme conditions won't recur with testable frequency) — ordinary VaR is still what gets backtested, at 99% or 97.5% confidence over the latest 12 months." },
    { wrong: "\"P&L attribution and backtesting are the same test with different names.\"", right: "They are two separate, coexisting audits: backtesting counts exception days against VaR; P&L attribution compares the risk model's overall predicted P&L to the desk's actual P&L via the D/A ratio and variance ratio." },
    { wrong: "\"Once an asset is classified into the trading book, banks can freely reclassify it later for capital advantage.\"", right: "Reclassification is heavily restricted to extraordinary circumstances only — specifically to prevent the regulatory arbitrage of moving assets between books for favorable capital treatment." }
  ],

  highYield: [
    { stars: 5, what: "The $950M motivating example: why VaR reads $0 while ES reads $380M.", why: "The single clearest illustration of the entire book's central theme (VaR's tail-blindness) — extremely likely to reappear as a numeric or conceptual question." },
    { stars: 5, what: "Liquidity horizons (10/20/40/60/120 days) and the \\(ES_{1}-ES_{5}\\) waterfall logic.", why: "FRTB's signature structural innovation; frequently tested as 'what does each ES_k hold fixed.'" },
    { stars: 4, what: "Backtesting (99%/97.5%, 12/30 exception limits) vs P&L attribution (±10% D/A, 20% variance ratio) as two separate audits.", why: "A precise, easily conflated pair of rules — GARP tests the distinction directly." },
    { stars: 4, what: "97.5% ES (general market risk) vs 99% VaR (jump-to-default) as separate, coexisting measures.", why: "The 'don't merge these two frameworks' trap is explicitly flagged and reliably tested." },
    { stars: 3, what: "Trading book vs banking book dual classification test and reclassification restrictions.", why: "A clean two-part conceptual rule with a clear regulatory-arbitrage rationale." }
  ],

  recall: [
    { q: "Walk through why the $950M portfolio example gives VaR = $0 at 95% confidence despite a real risk of catastrophic loss.", a: "The annual default probability is 2%, which is below the 5% tail cutoff at 95% confidence — so the 95th percentile loss outcome falls in the 'no default' scenario, giving VaR = $0. ES, by averaging over the WHOLE tail (including the 2% default scenario), correctly captures the 40% conditional loss probability × $950M = $380M expected tail loss." },
    { q: "What does \\(ES_{3}\\) specifically hold fixed and shock, in the FRTB liquidity-horizon waterfall?", a: "\\(ES_{3}\\) holds liquidity categories 1 and 2 fixed (not re-shocked) while shocking categories 3, 4, and 5 — each successive ES_k in the waterfall retires an earlier, shorter-horizon category from being re-shocked, reflecting that its risk has already been captured at its own (shorter) horizon." },
    { q: "A bank has 15 VaR exceptions at 99% confidence over the past 12 months, and its P&L attribution D/A ratio is within ±10%. What happens?", a: "15 exceptions exceeds the 12-exception limit at 99% confidence, so the bank is forced onto the standardized approach for backtesting purposes — regardless of the P&L attribution result, since these are two separate, independently-failing tests." },
    { q: "Why does FRTB use a 99% VaR (not ES) specifically for jump-to-default risk, separate from the 97.5% ES general market risk charge?", a: "Default is a discrete, binary jump event rather than a continuous mark-to-market process — a fundamentally different risk shape than spread risk. FRTB deliberately keeps these as two separate measures at two separate confidence levels rather than forcing one framework to describe both risk types." }
  ],

  hooks: [
    { title: "The $950M reveal", text: "VaR says $0. ES says $380M. Same portfolio, same day — this single number pair is the entire book's argument for ES, compressed into one memorable example." },
    { title: "The waterfall", text: "\\(ES_{1}\\) shocks everything. \\(ES_{2}\\) 'retires' the fastest-moving category and shocks the rest. \\(ES_{3}\\) retires two, shocks the remaining three. Each step peels off a faster liquidity horizon like a waterfall dropping down a level." },
    { title: "Two report cards", text: "Backtesting is the exception-count report card (inherited from R4). P&L attribution is a NEW, separate report card asking 'does the model's whole P&L story match reality?' Two report cards, two ways to fail." }
  ],

  summary: `<p>FRTB is the regulatory capstone cashing in every Book 1 thread. <strong>Motivating case</strong>: 2% default prob portfolio → \\(VaR_{95}\\)%=$0, ES=$380M — VaR's tail-blindness (R1, R6) made concrete. <strong>Liquidity horizons</strong>: 10/20/40/60/120 days replace one horizon; IMA computes \\(ES_{1}-ES_{5}\\) waterfall, \\(\\sqrt{t}-scaled\\). <strong>Trading vs banking book</strong>: dual test (can trade + actively managed); reclassification heavily restricted (anti-arbitrage). <strong>Backtesting</strong> (VaR exceptions, 99%/97.5%, 12/30 limits) is SEPARATE from <strong>P&L attribution</strong> (D/A ratio ±10%, variance ratio <20%) — two independent audits. <strong>Credit risk</strong>: 97.5% ES for spread risk vs 99% VaR (1-year) for jump-to-default — two different measures for two different risk shapes; securitizations move to a standardized approach.</p>`
});
