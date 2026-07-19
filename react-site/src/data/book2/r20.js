export default ({
  book: 2, reading: 20,
  session: "Credit Risk Analysis",
  title: "Capital Structure in Banks",
  tagline: "The first genuinely computational reading in the book: if I know a loan's PD and loss rate, what's my average loss (EL), and how much worse could it plausibly get (UL)?",

  teaches: `<p>EL for a single asset and a portfolio; UL for a single asset and a portfolio (where diversification shows up via correlation cross-terms); risk contribution (each asset's slice of portfolio UL); and economic capital as a multiple of portfolio UL. Nearly every later Credit VaR reading (26, 27, 29) is a more sophisticated version of the same question asked here first.</p>
  <p>Concretely, the reading (Schroeck, <em>Risk Management and Value Creation in Financial Institutions</em>, Ch. 5) walks through a <strong>bottom-up</strong> approach to economic capital: start from a single loan's three risk drivers — probability of default (PD), exposure amount (EA), and loss rate (LR) — build up EL and UL for that one loan, then aggregate across a whole loan book to get portfolio EL and portfolio UL. "Bottom-up" matters as a label because later readings (e.g. R56) contrast it with top-down capital allocation approaches that start from firm-wide capital and push it down to business lines instead of building it up from individual asset risk.</p>`,

  why: `<p>The punchline: portfolio UL is much smaller than the sum of individual ULs — diversification is doing real work — and the leftover gap between "worst case" and "expected case" is exactly what economic capital exists to cover. This is the foundational computational reading; EL = PD×LGD×EAD is the single most-repeated formula in the entire book.</p>
  <p>There's also a balance-sheet reason banks care about this split, not just a statistical one. Regulators and internal risk committees require banks to hold two separate cushions: <strong>loan loss reserves</strong> (an accounting provision) sized to absorb EL — because EL is a predictable cost of doing business, like inventory shrinkage in a retail store — and <strong>economic capital</strong> (real equity capital) sized to absorb UL, because UL is the part that could genuinely bankrupt the bank in a bad year if it weren't pre-funded. Get the EL/UL split wrong and you either under-reserve (an accounting problem that understates true earnings) or under-capitalize (a solvency problem that can trigger bank failure).</p>`,

  intuition: `<p>EL is what you'd lose ON AVERAGE if you ran this loan book a thousand times — it's a cost of doing business, priced into spreads and reserves. UL is how much WORSE a particular bad year could be than that average — the thing capital exists to absorb. When you pool many loans together, their ULs don't simply add up (unless correlation is 1) — some of the bad luck in one loan gets cancelled out by good luck in another, which is exactly why portfolio UL < sum of individual ULs whenever correlation is imperfect.</p>
  <p>Credit losses are modeled with a BETA distribution (bounded 0-100%, flexible skew), not normal — because credit losses are inherently skewed: capped upside (get paid back in full) and a fat left tail (default).</p>
  <p>Push one level deeper on WHY the loss on a single loan is variable at all — this is the part the source spends real time on. A loan's terminal value at some horizon date H fluctuates for two separate reasons: (1) <strong>default risk</strong> — the borrower may or may not actually default, a binary event with some probability PD, and (2) <strong>credit migration risk</strong> — even short of outright default, the borrower's creditworthiness can deteriorate (a downgrade, which lowers the loan's mark-to-market value and signals a higher chance of future default) or improve (an upgrade). Both sources of variability get folded into the UL formula's two variance terms: \\(\\sigma_{PD}^{2}\\) captures "did it default or not" uncertainty, and \\(\\sigma_{LR}^{2}\\) captures "if it does default, how much do we actually recover" uncertainty. If both of those were known with total certainty (\\(\\sigma_{PD}^{2}=0\\) and \\(\\sigma_{LR}^{2}=0\\)), UL would be exactly zero — there'd be nothing "unexpected" left, because EL itself would be a fixed, certain number every single time.</p>`,

  eli5: `<p>Think about running a small delivery business with 50 vans. Every year, a predictable few vans get minor dents and scrapes — you know roughly how much that costs on average, so you just build it into your prices and set aside a small repair fund (that's EL, and the repair fund is the loan loss reserve). But once in a while, in a genuinely bad year, three vans get totaled in accidents in the same week — way more than the "average" bad year would suggest (that's UL, the swing above and beyond the expected cost). Because you can't know in advance which bad year is coming, you keep a much bigger emergency fund on top of the ordinary repair fund, sized to survive even a freak unlucky year (that's economic capital). And critically, if your 50 vans are driven on completely different, unrelated routes rather than all following the same icy mountain road, a terrible week for one van (icy patch, deer strike) doesn't mean a terrible week for all of them — the fleet's total bad-year risk is much less than 50× one van's bad-year risk, which is precisely why diversification shrinks portfolio UL below the naive sum of individual ULs. In finance terms: EL is the reserve for the loans you expect to lose money on, UL is the extra cushion for a genuinely bad year across the whole portfolio, and low correlation between borrowers (like unrelated delivery routes) is what makes that cushion smaller than "worst case times every loan."</p>`,

  thinkLike: `<p>A credit portfolio manager reading this framework does not ask "will this loan default?" as a yes/no question — they ask "how much of this loan's risk is idiosyncratic (this specific borrower's bad luck) versus systematic (something that would also hit my other borrowers at the same time)?" That's the diversifiable-vs-undiversifiable-risk distinction the source draws directly: in a large, well-diversified portfolio, firm-specific risk washes out (good luck in one loan offsets bad luck in another), but the residual risk contribution — the piece correlated with the rest of the book — cannot be diversified away, no matter how many more loans you add. A risk manager's entire job in capital allocation is pricing and limiting exposure to that undiversifiable residual, not the gross UL of any single loan in isolation.</p>
  <p>On the exam, this reading is tested three ways, and you should drill all three: (1) pure calculation — plug numbers into EL = EA×PD×LR and UL = EA√[PD·σ²LR + LR²·σ²PD], including recognizing that σ²PD = PD(1−PD) under the binomial assumption; (2) directional/conceptual traps — a question that changes PD and RR (recovery rate) simultaneously and asks you to sign the net effect on EL correctly (both a PD decrease and an RR increase lower EL — they don't cancel, they reinforce); and (3) "what happens to portfolio UL as correlation falls" — a purely qualitative question testing whether you understand that UL_P < ΣUL_i whenever ρ<1, and that UL_P = ΣUL_i only in the special, unrealistic case where every pairwise correlation equals exactly 1.</p>`,

  formulas: [
    { name: "Expected loss (single asset)", math: "EL = EA \\times PD \\times LR", note: "EA = exposure amount (EAD), PD = probability of default, LR = loss rate (LGD) = 1 − recovery rate.",
      plain: "Expected loss is just the dollar exposure multiplied by the chance of default multiplied by how much of that exposure you'd actually lose if default happens — the single-number 'average cost of doing business' on this loan.",
      derivation: `<p>EL is the mean of a two-state (default / no-default) loss random variable. Let \\(L\\) be the dollar loss on the loan at the horizon: with probability \\(PD\\), the loan defaults and the loss is \\(EA \\times LR\\); with probability \\((1-PD)\\), the loan does not default and the loss is \\(0\\). The expected value is:</p>
      \\[ E[L] = PD \\times (EA \\times LR) + (1-PD)\\times 0 = EA \\times PD \\times LR \\]
      <p>So EL is nothing more than the probability-weighted average of the two possible outcomes — no default (loss = 0) and default (loss = \\(EA\\times LR\\)).</p>` },
    { name: "Unexpected loss (single asset)", math: "UL = EA \\times \\sqrt{PD\\cdot \\sigma_{LR}^{2} + LR^{2}\\cdot \\sigma_{PD}^{2}}", note: "\\(\\sigma_{PD}^{2}\\) = PD(1−PD) under a binomial default assumption.",
      plain: "Unexpected loss is the standard deviation of that same loss variable — it measures how far a bad year's actual loss could plausibly swing away from the average (EL), driven jointly by uncertainty in whether default happens and uncertainty in how severe it is if it does.",
      derivation: `<p>UL is simply the standard deviation of the same terminal loan value / loss variable used to derive EL — the reading is explicit that this is "merely applying the basic definition of standard deviation" to the horizon-date value of the risky asset. Starting from \\(Var(L) = E[L^2] - (E[L])^2\\) and treating \\(PD\\) and \\(LR\\) as independent random variables (each with its own mean and variance, \\(\\sigma_{PD}^{2}\\) and \\(\\sigma_{LR}^{2}\\)), algebra reduces the variance of the loss to:</p>
      \\[ Var(L) = EA^{2}\\left( PD\\cdot \\sigma_{LR}^{2} + LR^{2}\\cdot \\sigma_{PD}^{2} \\right) \\]
      <p>Taking the square root gives the UL formula. Because default is modeled as a two-state (binomial) outcome — default or no default — the variance of \\(PD\\) itself is the ordinary binomial variance:</p>
      \\[ \\sigma_{PD}^{2} = PD\\,(1-PD) \\]
      <p>Notice every term inside the square root is at most 1, so UL is always some fraction of exposure amount, never larger than EA itself. And in the degenerate case where both \\(\\sigma_{PD}^{2}=0\\) and \\(\\sigma_{LR}^{2}=0\\) (default and recovery both known with total certainty), UL collapses to exactly zero — confirming that EL would then be a fixed, certain number with no variability left to capture.</p>` },
    { name: "Portfolio UL", math: "UL_{P}^{2} = \\sum_{i}\\sum_{j} \\rho_{ij}\\, UL_{i}\\, UL_{j}", note: "If every pairwise \\(\\rho =1\\), UL_P = \\(\\sum UL_i\\) (no diversification). In every realistic case \\(\\rho<1\\), so UL_P < \\(\\sum UL_i\\).",
      plain: "Portfolio unexpected loss is not a simple sum of each loan's UL — it is built from every pairwise combination of assets weighted by how correlated their defaults are, so lowly-correlated loans partially cancel each other's variability out." },
    { name: "Risk contribution (2-asset)", math: "RC_{1} = \\dfrac{UL_{1}^{2} + \\rho_{12}\\,UL_{1}\\,UL_{2}}{UL_{P}}", note: "\\(RC_{1}\\) + \\(RC_{2}\\) = UL_P — each asset's slice sums exactly to total portfolio UL.",
      plain: "Risk contribution answers 'how much of the total portfolio's UL is this specific asset responsible for?' — it is the partial derivative of portfolio UL with respect to that asset's own UL, so it captures both the asset's standalone risk and its correlation with everything else in the book.",
      derivation: `<p>Risk contribution is formally defined as the sensitivity of portfolio UL to a marginal increase in asset \\(i\\)'s own UL — the partial derivative \\(RC_i = \\dfrac{\\partial UL_P}{\\partial UL_i}\\). Differentiating the two-asset version of \\(UL_P^{2} = UL_1^{2} + UL_2^{2} + 2\\rho_{12}UL_1UL_2\\) with respect to \\(UL_1\\) and simplifying yields:</p>
      \\[ RC_{1} = \\dfrac{UL_{1}^{2} + \\rho_{12}\\,UL_{1}\\,UL_{2}}{UL_{P}} \\]
      <p>and symmetrically for \\(RC_2\\). Because the two contributions are derived from differentiating the same quadratic, they always sum exactly back to total portfolio UL: \\(RC_1 + RC_2 = UL_P\\) — no risk is created or lost in the decomposition, it is only reattributed down to the asset level.</p>` },
    { name: "Economic capital", math: "EC = CM \\times UL_{P}", note: "CM (capital multiplier) = distance from expected outcome to a chosen extreme confidence level (typically 99.97%), expressed as a multiple of UL_P.",
      plain: "Economic capital is portfolio UL scaled up by a multiplier that reaches deep into the tail of the loss distribution — it is the size of the buffer a bank must hold, beyond its reserve for EL, to survive an extreme (e.g. 99.97th percentile) bad year without becoming insolvent." }
  ],

  concepts: [
    {
      name: "The three credit risk factors: PD, EA, LR",
      def: "Probability of default (PD, also called expected default frequency / EDF) is the likelihood a borrower defaults. Exposure amount (EA, also called exposure at default / EAD) is the dollar (or percentage) amount at risk — e.g. the loan balance outstanding, or the drawn portion of a credit line. Loss rate (LR, also called loss given default / LGD) is the percentage of exposure actually lost if default occurs, and by definition LR = 1 − recovery rate (RR).",
      intuition: "PD alone is not enough to worry a creditor: a borrower can briefly miss a payment and quickly cure it with no real economic loss. What actually matters is the combination — how likely default is, how much money is on the table, and how much of that money would actually be lost if default happens and sticks.",
      example: "A $20,000,000 credit facility with $18,000,000 currently drawn: EA = $18,000,000 (the outstanding balance, not the full commitment). If PD = 2% and the collateral has limited resale value so LR = 80%, EL = 18,000,000 × 0.02 × 0.80 = $288,000.",
      pitfall: "EA is the drawn/outstanding balance, not the full committed facility size — a common exam trap is using the $20M commitment instead of the $18M actually outstanding.",
      related: [{ r: 21, label: "R21 — EAD reappears as an input to the IRB capital formula and RAROC" }]
    },
    {
      name: "Expected loss (single asset)",
      def: "EL = EA × PD × LR — the 'average' loss over many repetitions.",
      intuition: "EL is a mean, not a worst case. Formally it's the probability-weighted average of the two possible outcomes at the horizon: no default (loss = $0, probability 1−PD) and default (loss = EA×LR, probability PD).",
      example: "$1,800,000 outstanding, PD=1%, LR=40%: EL = 1,800,000 × 0.01 × 0.40 = $7,200.",
      related: [{ r: 26, label: "R26 — Credit VaR builds directly on this EL baseline" }]
    },
    {
      name: "Unexpected loss (single asset)",
      def: "UL = EA × \\(\\sqrt{PD\\cdot \\sigma_{LR}^{2} + LR^{2}\\cdot \\sigma_{PD}^{2}}\\), with \\(\\sigma_{PD}^{2}\\) = PD(1−PD) under a binomial default assumption.",
      intuition: "UL is the standard deviation of the same loss variable EL describes the mean of. It is driven by two separate sources of uncertainty in a single loan's value: (1) default risk — whether the borrower actually defaults or not, a binary event, and (2) credit migration risk — deterioration or improvement in the borrower's creditworthiness short of outright default, which changes the loan's mark-to-market value and its future default odds.",
      example: "Same loan: PD=1%, LR=40%, \\(\\sigma_{PD}=10\\%\\), \\(\\sigma_{LR}=30\\%\\): UL = 1,800,000 × \\(\\sqrt{0.01\\times 0.3^{2} + 0.4^{2}\\times 0.1^{2}}\\) = $90,000 (5% of exposure).",
      pitfall: "Increasing recovery rate DECREASES LR, which decreases EL — but the exam likes to combine a recovery-rate change with a PD change in the same question and ask for net direction. Both a PD decrease and an RR increase point the SAME way (EL down) — watch for sign-flipping one of them.",
      related: ["Portfolio UL"]
    },
    {
      name: "Portfolio EL and UL — where diversification shows up",
      def: "Portfolio EL just adds up \\((\\sum EL_i)\\). Portfolio UL involves cross-terms: \\(UL_P^{2} = \\sum \\sum \\rho_{ij}\\, UL_i\\, UL_j\\).",
      intuition: "If every pairwise \\(\\rho =1\\), UL_P = \\(\\sum UL_i\\) (no diversification benefit at all). In every realistic case \\(\\rho<1\\), so UL_P < \\(\\sum UL_i\\).",
      example: "A 20-asset portfolio has 190 unique correlation pairs, computed as \\(n(n-1)/2\\); a 100-asset portfolio has 4,950 — exactly why practitioners collapse pairwise correlation into one representative number instead of estimating each pair. In the source's own worked example, a two-loan portfolio's UL_P falls as the assumed pairwise correlation drops — moving from \\(\\rho=0.3\\) to \\(\\rho=0.1\\) shrinks UL_P to $346,118, even though portfolio EL is completely unchanged (correlation has zero effect on EL_P, since expected loss simply sums regardless of how the two loans co-move).",
      related: [{ r: 27, label: "R27 — the single-factor model that operationalizes this at scale" }],
      memory: "Diversification benefit lives entirely in the cross-terms — kill correlation \\((\\rho\\)→0) and UL_P shrinks well below the naive sum."
    },
    {
      name: "Diversifiable vs. undiversifiable risk, and concentration risk",
      def: "Any single asset held in isolation carries both diversifiable risk (firm-specific — bad news unique to that one borrower) and undiversifiable risk (systematic/market-wide risk shared with other borrowers). In a large, well-built portfolio, diversifiable risk washes out toward zero as good and bad firm-specific outcomes cancel across many holdings; undiversifiable risk is exactly the residual captured by risk contribution (RC) — the piece that cannot be diversified away no matter how many more loans are added.",
      intuition: "This is the same logic as idiosyncratic vs. systematic risk in equity portfolio theory (CAPM), applied to credit: the more your loans move together (higher correlation), the more of their risk is undiversifiable, and the closer the bank comes to concentration risk — a scenario where default on one asset (say, from an industry-wide shock) spills over and triggers correlated losses across many other assets in the book at once.",
      example: "A bank that lends only to oil-and-gas drillers in one region has high correlation among its borrowers (an oil price shock hits them all together) — its portfolio UL sits much closer to the naive sum of individual ULs than a bank lending across unrelated industries and geographies, because there is little diversifiable risk to cancel out.",
      related: [{ r: 27, label: "R27 — single-factor models formalize systematic vs. idiosyncratic default risk" }],
      memory: "Diversifiable risk cancels out in a big enough book; undiversifiable (correlated) risk is the irreducible core that risk contribution measures."
    },
    {
      name: "Risk contribution",
      def: "Each asset's slice of portfolio UL: \\(RC_{1} = (UL_{1}^{2} + \\rho_{12}UL_{1}UL_{2})/UL_P\\) (two-asset case), with \\(RC_{1}+RC_{2}=UL_P\\). Formally it's the partial derivative of UL_P with respect to that asset's own UL — also called the unexpected loss contribution (ULC).",
      intuition: "Risk contribution decomposes total portfolio risk back down to the asset level — useful for pricing (RAROC) and limit-setting. It isolates the incremental risk of adding a specific asset to an existing portfolio, given everything else already held.",
      related: ["Portfolio EL and UL"]
    },
    {
      name: "Economic capital",
      def: "The distance between the expected outcome and a chosen extreme confidence level (typically 99.97%), expressed as a multiple of UL_P: EC = CM × UL_P.",
      intuition: "EL is covered by an accounting reserve (loan loss reserves) — it's a predictable, budgeted cost. UL is covered by real equity capital held aside specifically for extreme, low-probability bad years — that reserve is economic capital. A bank that under-holds economic capital relative to UL risks insolvency the first time an unusually bad year actually arrives.",
      pitfall: "Credit losses are modeled with a BETA distribution (bounded 0-100%, flexible skew) rather than normal — credit losses are inherently skewed: capped upside (get paid back in full), fat left tail (default). Using a normal distribution here would misprice the tail. When the beta distribution's two shape parameters (α and β) are equal, the distribution is symmetric and its mean and variance equal EL_P and UL_P respectively; in practice, fitting the extreme tail of the loss distribution is difficult enough that firms often combine the beta distribution with Monte Carlo simulation.",
      related: [{ r: 56, label: "R56 — economic capital generalized across all risk types" }],
      memory: "EC is the gap between 'what we expect to lose' and 'what we could lose in a genuinely bad year' — capital exists precisely to bridge that gap."
    },
    {
      name: "Challenges to quantifying credit risk (bottom-up framework)",
      def: "Three practical limitations of this bottom-up approach: (1) credits are treated as illiquid assets, so a loan's risk contribution to the portfolio is measured without the continuous market-price feedback that correlated risk factors get in liquid markets; (2) credit risk models used in practice typically use only a one-year estimation horizon, even though credit quality changes unfold over several years and a shorter window can understate longer-run risk; (3) credit risk is measured and managed in a separate department from market risk and operational risk, even though in reality these risks can interact and compound during a genuine crisis.",
      intuition: "These aren't abstract critiques — each one is a reason the bottom-up EL/UL/EC framework in this reading is a useful first approximation, not a complete picture, which is exactly why later readings (R26 onward) build fuller loss-distribution and portfolio models on top of it.",
      related: [{ r: 26, label: "R26 — Credit VaR addresses the one-year-horizon and full-distribution limitations directly" }]
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
      { what: "Portfolio UL vs sum of individual ULs", how: "They're equal ONLY if correlation is 1. Realistically \\(\\rho\\)<1, so portfolio UL is meaningfully smaller — diversification benefit lives in this gap." },
      { what: "Loan loss reserves vs economic capital", how: "Reserves are the accounting cushion sized to cover EL (a predictable, budgeted cost); economic capital is the equity cushion sized to cover UL (the extreme, unpredictable swing) — mixing these up misidentifies which pool of money is meant to absorb which kind of loss." },
      { what: "Diversifiable risk vs risk contribution", how: "Diversifiable (firm-specific) risk shrinks toward zero in a large portfolio and isn't what risk contribution measures; risk contribution measures the residual, undiversifiable (correlated) risk that remains no matter how large the portfolio gets." }
    ]
  },

  misconceptions: [
    { wrong: "\"Portfolio UL equals the sum of individual asset ULs.\"", right: "Only true if every pairwise correlation is exactly 1. In every realistic case \\((\\rho\\)<1), portfolio UL is LESS than the sum — the cross-terms in \\(UL_P^{2} = \\sum \\sum \\rho_{ij}\\, UL_i\\, UL_j\\) capture real diversification benefit." },
    { wrong: "\"A PD decrease and a recovery-rate increase might offset each other on EL.\"", right: "They point the SAME direction — both LOWER EL (lower PD directly reduces EL; higher recovery rate lowers LR, which also reduces EL). A question combining both is testing whether you correctly sign both effects the same way, not whether they cancel." },
    { wrong: "\"Credit losses are well-approximated by a normal distribution, like market returns.\"", right: "Credit losses are modeled with a BETA distribution — bounded 0-100%, capped upside, fat left tail. Normal distributions don't capture this inherent skew." },
    { wrong: "\"Exposure amount (EA) is always the full committed facility size, e.g. the total credit line approved.\"", right: "EA/EAD is the amount actually outstanding (drawn) at the horizon, which can be well below the committed facility — using the committed amount instead of the drawn balance overstates EL and UL." },
    { wrong: "\"Correlation between two loans affects both their combined expected loss and their combined unexpected loss.\"", right: "Correlation affects ONLY portfolio UL (through the cross-terms), never portfolio EL — portfolio EL is always just the simple sum of individual ELs, regardless of how correlated the underlying assets are." }
  ],

  highYield: [
    { stars: 5, what: "EL = EA×PD×LR and UL = \\(EA\\sqrt{PD\\cdot \\sigma_{LR}^{2}+LR^{2}\\cdot \\sigma_{PD}^{2}}\\) — full worked calculation fluency.", why: "The single most-repeated formula pair in the entire book — resurfaces in R21, R28, R37, R38 with only notation changes." },
    { stars: 5, what: "Portfolio UL cross-terms and why UL_P < \\(\\sum UL_i\\) whenever \\(\\rho\\)<1.", why: "The core diversification insight tested repeatedly across credit-portfolio questions." },
    { stars: 4, what: "Risk contribution formula and \\(RC_{1}+RC_{2}=UL_P\\) identity.", why: "A clean decomposition formula, testable both as calculation and as a 'why does this sum' concept check." },
    { stars: 4, what: "Economic capital = CM × UL_P, and why beta (not normal) models credit losses.", why: "Connects directly to Book 3's economic capital framework — a high-value conceptual bridge." },
    { stars: 3, what: "The PD-decrease + RR-increase same-direction trap.", why: "A compact, frequently combined two-variable question." },
    { stars: 3, what: "Diversifiable vs. undiversifiable risk, and concentration risk from correlated defaults.", why: "Tests the conceptual 'why' behind the diversification math, not just the arithmetic." }
  ],

  recall: [
    { q: "A $5M loan has PD=2%, LR=50%, \\(\\sigma_{PD}\\) and \\(\\sigma_{LR}\\) given. If recovery rate rises from 40% to 55%, what happens to EL, and why doesn't this offset a simultaneous PD increase?", a: "LR = 1−RR falls from 60% to 45%, which lowers EL (since EL=EA×PD×LR). A simultaneous PD increase raises EL. These are independent, separately-signed effects on the same EL formula — they don't automatically cancel; you must compute (or at least sign) each change separately and combine them." },
    { q: "Explain, without formulas, why a 100-asset credit portfolio's UL is dramatically smaller than 100 times a single asset's UL.", a: "Portfolio UL depends on correlated cross-terms, not a simple sum. With realistic (well below 1) pairwise default correlation, bad outcomes in some loans are statistically offset by good outcomes in others — the portfolio's aggregate loss variability shrinks far below what summing each loan's individual UL would suggest. This diversification benefit is exactly what economic capital models are built to quantify." },
    { q: "Why does economic capital use a beta distribution instead of a normal distribution for credit losses?", a: "Credit losses are inherently skewed: there's a hard cap on the upside (full repayment, loss=0) but a fat left tail (default can wipe out most or all of the exposure). A beta distribution, bounded on [0,1] with flexible skew, captures this shape; a normal distribution would misprice both the cap and the tail." },
    { q: "What does \\(RC_{1}\\) (risk contribution of asset 1 in a two-asset portfolio) actually measure, and why must \\(RC_{1}+RC_{2}\\) = UL_P?", a: "\\(RC_{1}\\) measures how much of the TOTAL portfolio UL is attributable to asset 1, accounting for its own risk and its correlation with asset 2. By construction the formula \\(RC_{1}=(UL_{1}^{2}+\\rho_{12}UL_{1}UL_{2})/UL_P\\) decomposes the portfolio UL exactly, so the two risk contributions must sum to the total — no risk is created or destroyed by the decomposition, only reattributed." },
    { q: "Big Bank has a $20,000,000 credit facility with Upstart Corp., of which $18,000,000 is currently outstanding, a 2% one-year PD, and an 80% loss rate. What is the expected loss, and what is the single most common mistake in this calculation?", a: "EL = EA × PD × LR = $18,000,000 × 0.02 × 0.80 = $288,000. The most common mistake is using the $20,000,000 committed facility size instead of the $18,000,000 actually outstanding balance as EA — EA is the drawn/outstanding amount, not the total commitment." },
    { q: "Why does a change in the correlation between two loans affect portfolio UL but never portfolio EL?", a: "Portfolio EL is always the simple sum of individual ELs — it depends only on each loan's own PD, LR, and EA, with no cross-terms. Portfolio UL, by contrast, is built from cross-terms \\(\\sum\\sum \\rho_{ij}UL_iUL_j\\) that explicitly involve pairwise correlation, so lowering correlation shrinks UL_P (more diversification) while leaving EL_P completely unchanged." }
  ],

  hooks: [
    { title: "The two-loss story", text: "EL is the bill you expect and budget for. UL is how much worse the bill could get in a bad year. Capital is savings set aside specifically for that second, scarier number." },
    { title: "Cross-terms are where diversification lives", text: "Portfolio UL isn't a sum, it's a sum PLUS cross-terms weighted by correlation. Kill the correlation, and the cross-terms — where all the double-counted risk was hiding — shrink toward zero." },
    { title: "Capped upside, fat left tail", text: "Credit losses look like a ski slope: a flat plateau at zero (get paid back) that suddenly drops off a cliff (default). Beta distribution, not the symmetric bell curve of market returns." },
    { title: "Reserves fund the expected; capital funds the unexpected", text: "Two different pools of money for two different jobs: an accounting reserve pre-pays for the loss you already know is coming (EL); real equity capital stands guard for the loss you hope never comes (UL)." }
  ],

  breakdown: [
    {
      title: "The three inputs to every EL/UL calculation",
      points: [
        "Probability of default (PD / EDF) — the likelihood the borrower defaults; on its own it's not the full risk picture, since brief, quickly-cured defaults matter far less than permanent ones.",
        "Exposure amount (EA / EAD) — the dollar amount actually at risk, typically the drawn/outstanding balance of a loan or credit line (not the full committed facility size).",
        "Loss rate (LR / LGD) — the percentage of exposure actually lost given that default occurs; by definition LR = 1 − recovery rate (RR), so anything that raises expected recovery lowers LR."
      ]
    },
    {
      title: "Three challenges to quantifying credit risk in the bottom-up framework",
      points: [
        "Illiquidity of credit assets — risk contribution is computed without the continuous market-price feedback loop that correlated risk factors get in liquid markets, unlike equities or bonds that trade freely.",
        "Short (one-year) estimation horizon — credit quality changes genuinely play out over multi-year periods, but in practice models compress this into a single year for tractability, which can understate longer-run risk.",
        "Siloed risk management — credit risk is measured and managed separately from market risk and operational risk in different bank departments, even though these risks can interact and compound during a real crisis."
      ]
    }
  ],

  quiz: [
    {
      q: "XYZ Bank determines there will be a 75% loss on a loan if the borrower does not perform its financial obligation. Which risk measure is this?",
      options: ["Probability of default", "Loss rate", "Unexpected loss", "Exposure amount"],
      answer: 1,
      why: "This is the loss rate (LR/LGD) — the percentage of exposure lost given default. It is not PD (that's the chance of default happening at all, not the severity), not UL (a variability measure requiring both PD and LR uncertainty), and not exposure amount (a dollar figure, not a percentage severity)."
    },
    {
      q: "Which statement about expected loss (EL) and unexpected loss (UL) is correct?",
      options: [
        "Expected loss always exceeds unexpected loss",
        "Unexpected loss always exceeds expected loss",
        "EL and UL are parameterized by exactly the same set of variables",
        "Expected loss is directly related to exposure amount"
      ],
      answer: 3,
      why: "EL rises directly with exposure amount (EL = EA×PD×LR). UL is not guaranteed to always exceed EL or vice versa in every case — both go to zero when PD is zero, and UL additionally depends on variance terms (\\(\\sigma_{PD}^{2}\\), \\(\\sigma_{LR}^{2}\\)) that EL does not use at all, so the claim that 'EL and UL share exactly the same set of variables' is false — they are not parameterized identically."
    },
    {
      q: "Big Bank has a $20,000,000 credit facility with Upstart Corp., of which $18,000,000 is currently outstanding. Big Bank estimates a one-year PD of 2% and, due to limited resale value of the collateral, an 80% loss rate. The expected loss (EL) is closest to:",
      options: ["$68,000", "$72,000", "$272,000", "$288,000"],
      answer: 3,
      why: "EL = EA × PD × LR = $18,000,000 × 0.02 × 0.80 = $288,000, using the $18M outstanding balance as EA. The $72,000 answer is a common trap from mistakenly using only PD without LR, e.g. $18M×0.02×0.02, or otherwise mixing up which figure is EA; the key discipline is always using the drawn/outstanding amount, not the full commitment."
    },
    {
      q: "If the recovery rate (RR) increases and the probability of default (PD) decreases, all else equal, what happens to expected loss (EL)?",
      options: [
        "EL increases, since higher recovery encourages more lending and PD changes are unrelated",
        "EL is unaffected, since the two effects offset",
        "The net effect on EL cannot be determined without more information",
        "EL decreases, since both effects push EL in the same direction"
      ],
      answer: 3,
      why: "A higher recovery rate lowers the loss rate (LR = 1−RR), which lowers EL; a lower PD independently also lowers EL (EL = EA×PD×LR). Both effects point the same way — down — so EL unambiguously decreases. The tempting 'they offset and EL is unaffected' answer is wrong because these are not opposing effects on the same formula; they reinforce each other."
    },
    {
      q: "In the portfolio UL formula \\(UL_P^{2} = \\sum\\sum \\rho_{ij}\\,UL_i\\,UL_j\\), under what condition does portfolio UL equal the simple sum of individual asset ULs, \\(\\sum UL_i\\)?",
      options: [
        "Whenever the portfolio has more than 20 assets",
        "Only when every pairwise correlation \\(\\rho_{ij}\\) equals exactly 1",
        "Whenever PD and LR are both known with certainty for every asset",
        "Never — portfolio UL is always strictly less than the sum of individual ULs"
      ],
      answer: 1,
      why: "The cross-terms in \\(UL_P^2\\) collapse to a perfect sum only in the special, unrealistic case where every pairwise correlation is exactly 1 (no diversification benefit at all). In every realistic case, \\(\\rho<1\\), so UL_P is strictly less than the sum — but the question asks for the boundary condition where equality DOES hold, which is \\(\\rho=1\\), not 'never equal' (that answer describes the realistic case, not the theoretical boundary the formula allows for)."
    },
    {
      q: "A bank's two-loan portfolio has an unexpected loss (UL_P) of $423,000 when the correlation between the loans is assumed to be 0.3. If the assumed correlation is instead lowered to 0.1 with everything else unchanged, what happens to portfolio expected loss (EL_P) and portfolio unexpected loss (UL_P)?",
      options: [
        "Both EL_P and UL_P fall, since lower correlation reduces overall portfolio risk",
        "EL_P stays exactly the same; UL_P falls (to $346,118 in the source's own worked example)",
        "EL_P falls; UL_P stays exactly the same, since correlation only affects expected outcomes",
        "Both EL_P and UL_P stay exactly the same, since correlation is a diversification concept that doesn't affect either measure"
      ],
      answer: 1,
      why: "Correlation appears only in the UL_P cross-terms formula, never in the EL_P formula (which is always a simple sum of individual ELs regardless of how the assets co-move). So EL_P is completely unaffected by the correlation assumption, while UL_P falls as correlation falls — exactly the diversification effect this reading is built around. The most tempting distractor is the 'both EL_P and UL_P fall' answer, which conflates 'diversification helps' with 'diversification affects every risk measure,' but EL has no correlation term to begin with."
    }
  ],

  sources: [
    { title: "Expected loss — Wikipedia", url: "https://en.wikipedia.org/wiki/Expected_loss", note: "Background on the EL = PD×LGD×EAD decomposition used across banking risk management, not just this one reading." },
    { title: "Economic capital — Wikipedia", url: "https://en.wikipedia.org/wiki/Economic_capital", note: "Overview of economic capital as a buffer against unexpected losses, including the confidence-level/capital-multiplier framing used here." },
    { title: "Loss given default — Investopedia", url: "https://www.investopedia.com/terms/l/loss_given_default.asp", note: "Plain-language explanation of loss given default (loss rate) and its relationship to recovery rate." },
    { title: "Basel Committee on Banking Supervision — publications", url: "https://www.bis.org/bcbs/index.htm", note: "BIS/Basel Committee's own materials on credit risk capital frameworks, useful background for how EL/UL/economic capital connect to regulatory capital in R21 and beyond." }
  ],

  pdf: { book: 2, query: "This reading discusses a bottom-up approach to calculating economic capital" },

  summary: `<p><strong>EL</strong> = EA×PD×LR (average loss). <strong>UL</strong> = \\(EA\\sqrt{PD\\cdot \\sigma_{LR}^{2}+LR^{2}\\cdot \\sigma_{PD}^{2}}\\) (variability around EL), \\(\\sigma_{PD}^{2}=PD(1-PD)\\). <strong>Portfolio EL</strong> just sums; <strong>portfolio UL</strong> involves correlation cross-terms \\((UL_P^{2}=\\sum \\sum \\rho_{ij}UL_iUL_j)\\) — diversification benefit is real whenever \\(\\rho<1\\), vanishes only at ρ=1. <strong>Risk contribution</strong> decomposes UL_P back to the asset level \\((RC_{1}+RC_{2}=UL_P)\\), isolating each asset's undiversifiable (correlated) residual risk. <strong>Economic capital</strong> = CM×UL_P, the gap between expected and extreme-confidence (typically 99.97%) loss — modeled via a BETA distribution (capped upside, fat left tail) since credit losses are inherently skewed, not normal. Loan loss reserves fund EL; economic capital funds UL — mixing up which pool covers which is the single most consequential conceptual error in this reading.</p>`
});
