FRM.register({
  book: 2, reading: 20,
  session: "Credit Risk Analysis",
  title: "Capital Structure in Banks",
  tagline: "The first genuinely computational reading in the book: if I know a loan's PD and loss rate, what's my average loss (EL), and how much worse could it plausibly get (UL)?",

  teaches: `<p>EL for a single asset and a portfolio; UL for a single asset and a portfolio (where diversification shows up via correlation cross-terms); risk contribution (each asset's slice of portfolio UL); and economic capital as a multiple of portfolio UL. Nearly every later Credit VaR reading (26, 27, 29) is a more sophisticated version of the same question asked here first.</p>`,

  why: `<p>The punchline: portfolio UL is much smaller than the sum of individual ULs — diversification is doing real work — and the leftover gap between "worst case" and "expected case" is exactly what economic capital exists to cover. This is the foundational computational reading; EL = PD×LGD×EAD is the single most-repeated formula in the entire book.</p>`,

  intuition: `<p>EL is what you'd lose ON AVERAGE if you ran this loan book a thousand times — it's a cost of doing business, priced into spreads and reserves. UL is how much WORSE a particular bad year could be than that average — the thing capital exists to absorb. When you pool many loans together, their ULs don't simply add up (unless correlation is 1) — some of the bad luck in one loan gets cancelled out by good luck in another, which is exactly why portfolio UL < sum of individual ULs whenever correlation is imperfect.</p>
  <p>Credit losses are modeled with a BETA distribution (bounded 0-100%, flexible skew), not normal — because credit losses are inherently skewed: capped upside (get paid back in full) and a fat left tail (default).</p>`,

  formulas: [
    { name: "Expected loss (single asset)", math: "EL = EA \\times PD \\times LR", note: "EA = exposure amount (EAD), PD = probability of default, LR = loss rate (LGD) = 1 − recovery rate." },
    { name: "Unexpected loss (single asset)", math: "UL = EA \\times \\sqrt{PD\\cdot \\sigma_{LR}^{2} + LR^{2}\\cdot \\sigma_{PD}^{2}}", note: "\\(\\sigma_PD^{2}\\) = PD(1−PD) under a binomial default assumption." },
    { name: "Portfolio UL", math: "UL_{P}^{2} = \\Sigma \\Sigma \\rho_{ij} UL_{i} UL_{j}", note: "If every pairwise \\(\\rho =1\\), UL_P = \\(\\Sigma UL_i\\) (no diversification). In every realistic case \\(\\rho\\)<1, so UL_P < \\(\\Sigma UL_i\\)." },
    { name: "Risk contribution (2-asset)", math: "RC_{1} = (UL_{1}^{2} + \\rho_{12}UL_{1}UL_{2}) / UL_{P}", note: "\\(RC_{1}\\) + \\(RC_{2}\\) = UL_P — each asset's slice sums exactly to total portfolio UL." },
    { name: "Economic capital", math: "EC = CM \\times UL_{P}", note: "CM (capital multiplier) = distance from expected outcome to a chosen extreme confidence level (typically 99.97%), expressed as a multiple of UL_P." }
  ],

  concepts: [
    {
      name: "Expected loss (single asset)",
      def: "EL = EA × PD × LR — the 'average' loss over many repetitions.",
      example: "$1,800,000 outstanding, PD=1%, LR=40%: EL = 1,800,000 × 0.01 × 0.40 = $7,200.",
      related: [{ r: 26, label: "R26 — Credit VaR builds directly on this EL baseline" }]
    },
    {
      name: "Unexpected loss (single asset)",
      def: "UL = EA × \\(\\sqrt{PD\\cdot \\sigma_LR^{2}}\\) + \\(LR^{2}\\cdot \\sigma_PD^{2}]\\), with \\(\\sigma_PD^{2}\\) = PD(1−PD) under a binomial default assumption.",
      example: "Same loan: PD=1%, LR=40%, \\(\\sigma PD=10\\)%, \\(\\sigma LR=30\\)%: UL = 1,800,000 × \\(\\sqrt{0.01\\times 0.3^{2}}\\) + \\(0.4^{2}\\times 0.1^{2}]\\) = $90,000 (5% of exposure).",
      pitfall: "Increasing recovery rate DECREASES LR, which decreases EL — but the exam likes to combine a recovery-rate change with a PD change in the same question and ask for net direction. Both a PD decrease and an RR increase point the SAME way (EL down) — watch for sign-flipping one of them.",
      related: ["Portfolio UL"]
    },
    {
      name: "Portfolio EL and UL — where diversification shows up",
      def: "Portfolio EL just adds up \\((\\Sigma EL_i)\\). Portfolio UL involves cross-terms: \\(UL_P^{2}\\) = \\(\\Sigma \\Sigma \\rho_ij\\) UL_i UL_j.",
      intuition: "If every pairwise \\(\\rho =1\\), UL_P = \\(\\Sigma UL_i\\) (no diversification benefit at all). In every realistic case \\(\\rho\\)<1, so UL_P < \\(\\Sigma UL_i\\).",
      example: "A 20-asset portfolio has 190 unique correlation pairs; a 100-asset portfolio has 4,950 — exactly why practitioners collapse pairwise correlation into one representative number instead of estimating each pair.",
      related: [{ r: 27, label: "R27 — the single-factor model that operationalizes this at scale" }],
      memory: "Diversification benefit lives entirely in the cross-terms — kill correlation \\((\\rho\\)→0) and UL_P shrinks well below the naive sum."
    },
    {
      name: "Risk contribution",
      def: "Each asset's slice of portfolio UL: \\(RC_{1}\\) = \\((UL_{1}^{2}\\) + \\(\\rho_{12}UL_{1}UL_{2})/UL_P\\) (two-asset case), with \\(RC_{1}+RC_{2}=UL_P\\).",
      intuition: "Risk contribution decomposes total portfolio risk back down to the asset level — useful for pricing (RAROC) and limit-setting.",
      related: ["Portfolio EL and UL"]
    },
    {
      name: "Economic capital",
      def: "The distance between the expected outcome and a chosen extreme confidence level (typically 99.97%), expressed as a multiple of UL_P: EC = CM × UL_P.",
      pitfall: "Credit losses are modeled with a BETA distribution (bounded 0-100%, flexible skew) rather than normal — credit losses are inherently skewed: capped upside (get paid back in full), fat left tail (default). Using a normal distribution here would misprice the tail.",
      related: [{ r: 56, label: "R56 — economic capital generalized across all risk types" }],
      memory: "EC is the gap between 'what we expect to lose' and 'what we could lose in a genuinely bad year' — capital exists precisely to bridge that gap."
    }
  ],

  connections: {
    from: [
      { r: 19, why: "EL/UL were introduced qualitatively here; this reading gives them formulas and standard deviations." }
    ],
    to: [
      { r: 21, why: "The IRB capital formula reuses this reading's EL/UL logic in a regulatory capital context." },
      { r: 26, why: "Credit VaR is this reading's UL concept, formalized with a full loss distribution and confidence level." },
      { r: 28, why: "Tranche loss modeling reuses EL = PD×LGD×EAD, just applied to pool-level cash flows." },
      { r: 37, why: "CVA's formula is structurally this reading's EL logic, applied per-period to derivatives exposure." }
    ],
    confused: [
      { what: "EL vs UL", how: "EL is the AVERAGE loss (priced into spreads/reserves); UL is the VARIABILITY around that average (what capital protects against)." },
      { what: "Portfolio UL vs sum of individual ULs", how: "They're equal ONLY if correlation is 1. Realistically \\(\\rho\\)<1, so portfolio UL is meaningfully smaller — diversification benefit lives in this gap." }
    ]
  },

  misconceptions: [
    { wrong: "\"Portfolio UL equals the sum of individual asset ULs.\"", right: "Only true if every pairwise correlation is exactly 1. In every realistic case \\((\\rho\\)<1), portfolio UL is LESS than the sum — the cross-terms in \\(UL_P^{2}\\) = \\(\\Sigma \\Sigma \\rho_ij\\) UL_i UL_j capture real diversification benefit." },
    { wrong: "\"A PD decrease and a recovery-rate increase might offset each other on EL.\"", right: "They point the SAME direction — both LOWER EL (lower PD directly reduces EL; higher recovery rate lowers LR, which also reduces EL). A question combining both is testing whether you correctly sign both effects the same way, not whether they cancel." },
    { wrong: "\"Credit losses are well-approximated by a normal distribution, like market returns.\"", right: "Credit losses are modeled with a BETA distribution — bounded 0-100%, capped upside, fat left tail. Normal distributions don't capture this inherent skew." }
  ],

  highYield: [
    { stars: 5, what: "EL = EA×PD×LR and UL = \\(EA\\sqrt{PD\\cdot \\sigma LR^{2}+LR^{2}\\cdot \\sigma PD^{2}}\\) — full worked calculation fluency.", why: "The single most-repeated formula pair in the entire book — resurfaces in R21, R28, R37, R38 with only notation changes." },
    { stars: 5, what: "Portfolio UL cross-terms and why UL_P < \\(\\Sigma UL_i\\) whenever \\(\\rho\\)<1.", why: "The core diversification insight tested repeatedly across credit-portfolio questions." },
    { stars: 4, what: "Risk contribution formula and \\(RC_{1}+RC_{2}=UL_P\\) identity.", why: "A clean decomposition formula, testable both as calculation and as a 'why does this sum' concept check." },
    { stars: 4, what: "Economic capital = CM × UL_P, and why beta (not normal) models credit losses.", why: "Connects directly to Book 3's economic capital framework — a high-value conceptual bridge." },
    { stars: 3, what: "The PD-decrease + RR-increase same-direction trap.", why: "A compact, frequently combined two-variable question." }
  ],

  recall: [
    { q: "A $5M loan has PD=2%, LR=50%, \\(\\sigma PD\\) and \\(\\sigma LR\\) given. If recovery rate rises from 40% to 55%, what happens to EL, and why doesn't this offset a simultaneous PD increase?", a: "LR = 1−RR falls from 60% to 45%, which lowers EL (since EL=EA×PD×LR). A simultaneous PD increase raises EL. These are independent, separately-signed effects on the same EL formula — they don't automatically cancel; you must compute (or at least sign) each change separately and combine them." },
    { q: "Explain, without formulas, why a 100-asset credit portfolio's UL is dramatically smaller than 100 times a single asset's UL.", a: "Portfolio UL depends on correlated cross-terms, not a simple sum. With realistic (well below 1) pairwise default correlation, bad outcomes in some loans are statistically offset by good outcomes in others — the portfolio's aggregate loss variability shrinks far below what summing each loan's individual UL would suggest. This diversification benefit is exactly what economic capital models are built to quantify." },
    { q: "Why does economic capital use a beta distribution instead of a normal distribution for credit losses?", a: "Credit losses are inherently skewed: there's a hard cap on the upside (full repayment, loss=0) but a fat left tail (default can wipe out most or all of the exposure). A beta distribution, bounded on [0,1] with flexible skew, captures this shape; a normal distribution would misprice both the cap and the tail." },
    { q: "What does \\(RC_{1}\\) (risk contribution of asset 1 in a two-asset portfolio) actually measure, and why must \\(RC_{1}+RC_{2}\\) = UL_P?", a: "\\(RC_{1}\\) measures how much of the TOTAL portfolio UL is attributable to asset 1, accounting for its own risk and its correlation with asset 2. By construction the formula \\(RC_{1}=(UL_{1}^{2}+\\rho_{12}UL_{1}UL_{2})/UL_P\\) decomposes the portfolio UL exactly, so the two risk contributions must sum to the total — no risk is created or destroyed by the decomposition, only reattributed." }
  ],

  hooks: [
    { title: "The two-loss story", text: "EL is the bill you expect and budget for. UL is how much worse the bill could get in a bad year. Capital is savings set aside specifically for that second, scarier number." },
    { title: "Cross-terms are where diversification lives", text: "Portfolio UL isn't a sum, it's a sum PLUS cross-terms weighted by correlation. Kill the correlation, and the cross-terms — where all the double-counted risk was hiding — shrink toward zero." },
    { title: "Capped upside, fat left tail", text: "Credit losses look like a ski slope: a flat plateau at zero (get paid back) that suddenly drops off a cliff (default). Beta distribution, not the symmetric bell curve of market returns." }
  ],

  summary: `<p><strong>EL</strong> = EA×PD×LR (average loss). <strong>UL</strong> = \\(EA\\sqrt{PD\\cdot \\sigma LR^{2}+LR^{2}\\cdot \\sigma PD^{2}}\\) (variability around EL), \\(\\sigma PD^{2}=PD(1- PD)\\). <strong>Portfolio EL</strong> just sums; <strong>portfolio UL</strong> involves correlation cross-terms \\((UL_P^{2}=\\Sigma \\Sigma \\rho_ijUL_iUL_j)\\) — diversification benefit is real whenever \\(\\rho\\)<1, vanishes only at ρ=1. <strong>Risk contribution</strong> decomposes UL_P back to the asset level \\((RC_{1}+RC_{2}=UL_P)\\). <strong>Economic capital</strong> = CM×UL_P, the gap between expected and extreme-confidence (typically 99.97%) loss — modeled via a BETA distribution (capped upside, fat left tail) since credit losses are inherently skewed, not normal.</p>`
});
