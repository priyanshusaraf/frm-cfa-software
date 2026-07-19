FRM.register({
  book: 4, reading: 69,
  session: "Liquidity Risk Management",
  title: "Monitoring Liquidity",
  tagline: "Closes Session 10 with the formal vocabulary for monitoring cash flows over time — a dense alphabet soup of 'term structure of X' concepts describing one idea: lay out expected cash flows date by date and check if the cumulative position ever goes negative.",

  teaches: `<p>Cash flow taxonomy, liquidity options, three components of liquidity risk, liquidity generation capacity (LGC), and the full family of term structures (TSECF/TSECCF, TSLGC/TSCLGC, TSAA, TSLaR).</p>`,

  why: `<p>A negative cumulated cash flow at some future date is a precursor to insolvency — this is the single most important number a Treasury department watches. This reading gives you the precise vocabulary to describe exactly WHERE and WHEN a liquidity gap would open up.</p>`,

  intuition: `<p>Think of TSECF/TSECCF as a maturity ladder: lay out every expected cash flow by date, then compute the running (cumulative) total. As long as the cumulative total stays positive at every future date, you're fine. The moment it would go negative at some date, you've found a real liquidity gap — the single most important number a treasurer watches.</p>
  <p>Repo and reverse repo are the one transaction type that moves TSAA (available assets) WITHOUT moving TSECF/TSECCF (cash flows) — because a repo is economically a secured LOAN, not a cash-flow-generating sale, even though a security's legal title changes hands. This is a frequently tested distinction since most other transactions hit all these measures together.</p>`,

  visual: `<div class="widget" data-widget="lcr"></div>`,

  formulas: [
    { name: "TSECF / TSECCF (maturity ladder)", math: "\\text{TSECF} = \\text{expected cash flows by date};\\quad \\text{TSECCF} = \\text{cumulative running total}", note: "Ideally stays positive at every date — negative TSECCF is a precursor to insolvency, the single most important number Treasury watches." }
  ],

  concepts: [
    {
      name: "Cash flow taxonomy",
      def: "Deterministic (known timing) vs. stochastic (random timing); deterministic vs. stochastic amount. Stochastic amounts split into: credit-related, behavioral (counterparty decisions), indexed/contingent (market-variable driven), and new-business driven.",
      related: []
    },
    {
      name: "Liquidity options",
      def: "The right to give/receive cash from the bank at preset terms (e.g., a prepayment option, a deposit withdrawal right). Exercise depends on the option-holder's OWN cash-flow needs (not necessarily bank profitability).",
      pitfall: "Has TWO effects on the bank: a balance-sheet effect (the repaid/withdrawn amount) AND a P&L effect (spread between contract terms and current market terms at exercise) — don't consider only one effect.",
      related: []
    },
    {
      name: "Three components of liquidity risk",
      def: "Quantitative liquidity risk: receiving less cash than expected (market liquidity risk — can't sell an asset quickly at fair value — is a component). Funding cost risk: paying more than expected to raise funds (spread over risk-free).",
      pitfall: "Together these form the FULL ECONOMIC liquidity risk — don't treat quantitative risk alone as the complete picture.",
      related: [],
      memory: "Quantitative risk: less cash IN than expected. Funding cost risk: more cost OUT than expected. Together: full economic liquidity risk."
    },
    {
      name: "Liquidity generation capacity (LGC)",
      def: "The bank's ability to generate cash beyond contractual inflows, from balance sheet expansion or shrinkage. Security-linked (BSL): secured debt issuance, secured credit-line draws, asset/repo sales. Security-unlinked: unsecured bond issuance, new unsecured deposits, unsecured credit-line draws.",
      example: "TSLGC (term structure of LGC): liquidity generatable by a given future date. TSCLGC (cumulated): running total up to that date.",
      related: ["The full family of term structures"]
    },
    {
      name: "The full family of term structures",
      def: "TSECF/TSECCF (the maturity ladder): expected cash flows by date, and their cumulative running total — ideally stays positive at every date. TSL0 (term structure of expected liquidity): whether the institution can cover negative cumulated cash flows at a given date. TSLaR (term structure of liquidity-at-risk): unexpected cash flows at each date — the gap between average and minimum (worst-case) levels, the 'at risk' analog of VaR applied to liquidity.",
      pitfall: "A NEGATIVE TSECCF at some future date is a precursor to insolvency — the single most important number a Treasury department watches.",
      related: ["Liquidity generation capacity (LGC)"],
      memory: "TSECCF going negative is Treasury's smoke alarm — the single most-watched number in this whole framework."
    },
    {
      name: "TSAA (term structure of available assets)",
      def: "Increases from: reverse repo, buy/sellback, security borrowing. Decreases from: repo, sell/buyback, security lending.",
      pitfall: "Possession (not ownership) drives whether an asset counts toward TSAA-based liquidity generation. Repo/reverse repo transactions affect TSAA and TSLGC but do NOT flow through TSECF/TSECCF — a frequently tested distinction, since most other transaction types (including outright purchases/sales) hit all of these measures together, because a repo is economically a secured LOAN, not a cash-flow-generating sale, even though a security's legal title changes hands.",
      related: [],
      memory: "Repo/reverse repo: moves TSAA, NOT TSECF/TSECCF — the single most tested exception in this reading."
    }
  ],

  connections: {
    from: [
      { r: 68, why: "Intraday-specific tracking generalizes here into the full multi-date cash-flow term structure." }
    ],
    to: [
      { r: 71, why: "Liquidity stress testing shocks exactly these cash-flow term structures under adverse scenarios." },
      { r: 76, why: "Repo mechanics, where the TSAA-not-TSECF distinction matters most concretely, gets its own full reading." }
    ],
    confused: [
      { what: "TSECF/TSECCF vs TSAA", how: "TSECF/TSECCF track actual CASH FLOWS by date. TSAA tracks AVAILABLE ASSETS (possession-based). Repo/reverse repo moves TSAA without moving TSECF/TSECCF — the key exception to memorize." },
      { what: "TSL0 vs TSLaR", how: "TSL0 asks CAN the institution cover a negative cumulated position at a date (a coverage question). TSLaR asks how much UNEXPECTED cash flow variation exists at each date (a VaR-like risk-measurement question)." }
    ]
  },

  misconceptions: [
    { wrong: "\"A repo transaction affects the cash-flow term structure (TSECF/TSECCF) the same way an outright asset sale would.\"", right: "Repo/reverse repo transactions affect TSAA and TSLGC but do NOT flow through TSECF/TSECCF — a repo is economically a secured loan (legal title changes hands, but it's not a cash-flow-generating sale), unlike an outright purchase/sale which hits all these measures together." },
    { wrong: "\"Ownership of an asset determines whether it counts toward TSAA-based liquidity generation.\"", right: "POSSESSION (not ownership) drives TSAA — an asset you possess (even if you don't legally own it, e.g., via reverse repo) can count toward available-asset-based liquidity generation." },
    { wrong: "\"Liquidity risk is fully captured by quantitative risk (receiving less cash than expected) alone.\"", right: "Full economic liquidity risk combines BOTH quantitative liquidity risk (less cash received than expected) AND funding cost risk (paying more than expected to raise funds) — quantitative risk alone is incomplete." }
  ],

  highYield: [
    { stars: 5, what: "Repo/reverse repo moves TSAA and TSLGC but NOT TSECF/TSECCF — the single most tested exception in this reading.", why: "Explicitly flagged as a frequently tested distinction, since it's the one transaction type that breaks the usual pattern." },
    { stars: 4, what: "TSECCF going negative as a precursor to insolvency — the single most important Treasury metric.", why: "The conceptual center of this entire reading's alphabet soup of term structures." },
    { stars: 3, what: "Three components of liquidity risk: quantitative + funding cost = full economic liquidity risk.", why: "A clean two-part decomposition, frequently tested as a definitional question." },
    { stars: 2, what: "Cash flow taxonomy (deterministic/stochastic timing and amount) and liquidity options' dual effect.", why: "Supporting vocabulary, useful for scenario classification questions." }
  ],

  recall: [
    { q: "A bank enters a reverse repo, receiving a security as collateral for a short-term cash loan. Which term structure measures are affected, and which are NOT?", a: "TSAA (available assets) increases, since the bank now possesses the security. TSLGC (liquidity generation capacity) is also affected, since the bank could re-use that security. However, TSECF/TSECCF (actual cash flow term structures) are NOT affected by the repo transaction itself — a repo is economically a secured loan, not a cash-flow-generating sale, so it doesn't flow through the cash-flow ladder the way an outright purchase or sale would." },
    { q: "Why is a negative TSECCF at some future date considered a precursor to insolvency rather than just a manageable liquidity hiccup?", a: "TSECCF is the CUMULATIVE running total of all expected cash flows up to that date. If it goes negative, it means the bank's total expected cash inflows, even accumulated over the entire period, fall short of total expected outflows — a structural shortfall that (absent new funding sources not yet captured) would leave the bank unable to meet its obligations on that date, which is functionally an insolvency event unless remediated in advance." }
  ],

  hooks: [
    { title: "The one that breaks the pattern", text: "Almost every transaction moves cash flows AND available assets together. Repo is the outlier: it moves possession of an asset (TSAA) while leaving the cash-flow ladder (TSECF/TSECCF) untouched — because it's a loan wearing a sale's clothing." },
    { title: "The most important negative number", text: "Everything in this reading's alphabet soup exists to answer one question: does the cumulative cash-flow line (TSECCF) ever dip below zero? That single crossing is Treasury's most-watched moment." }
  ],

  summary: `<p><strong>Cash flow taxonomy</strong>: deterministic/stochastic timing and amount (stochastic further split: credit, behavioral, indexed/contingent, new-business). <strong>Liquidity options</strong>: exercised per holder's own needs, dual balance-sheet + P&L effect. <strong>Three liquidity risk components</strong>: quantitative (less cash than expected) + funding cost (paying more than expected) = full economic liquidity risk. <strong>LGC</strong>: security-linked (BSL) vs security-unlinked capacity; TSLGC/TSCLGC track it over time. <strong>TSECF/TSECCF</strong>: the maturity ladder — negative TSECCF = insolvency precursor, THE key number. <strong>TSL0</strong>: can we cover a negative position? <strong>TSLaR</strong>: unexpected cash-flow variation (VaR-like). <strong>TSAA</strong>: possession-based available assets — repo/reverse repo moves TSAA/TSLGC but NOT TSECF/TSECCF, the reading's signature exception.</p>`
});
