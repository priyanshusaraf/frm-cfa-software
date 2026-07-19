FRM.register({
  book: 3, reading: 56,
  session: "Capital and Regulatory Frameworks",
  title: "Risk Capital Attribution and Risk-Adjusted Performance Measurement",
  tagline: "RAROC answers one question with real teeth: is this loan, project, or business unit actually worth the capital it ties up?",

  teaches: `<p>Risk capital vs. economic capital vs. regulatory capital, basic and detailed RAROC equations, the three judgment calls (time horizon, default probability, confidence level), hurdle rate and adjusted RAROC, diversification benefits (stand-alone/fully diversified/marginal capital), and RAROC best practices.</p>`,

  why: `<p>This reading builds RAROC from the ground up and closes with the genuinely hard part: diversification benefits are real, but allocating them fairly across business units is contested and political. It's the quant payoff of Book 3, directly reusing the EL/UL logic from Credit Risk Book 2.</p>`,

  intuition: `<p>RAROC's core idea: don't just ask "did this loan make money?" — ask "did it make ENOUGH money to justify the capital it tied up?" A loan can generate positive revenue and still be a bad decision if the capital it consumes could earn more elsewhere. The DETAILED RAROC formula makes this precise: revenue minus costs minus expected losses minus taxes, plus a return on the economic capital itself, all divided by that economic capital.</p>
  <p>Diversification benefit is real (combined capital needs are less than the sum of standalone requirements) but allocating that benefit fairly is contested — three different capital concepts (stand-alone, fully diversified, marginal) serve three different purposes and none is simply "more correct" than the others.</p>`,

  visual: `<div class="widget" data-widget="raroc" data-raroc='{"revenue":105,"cost":75,"expectedLoss":7.5,"capital":120,"hurdle":0.09}'></div>`,

  formulas: [
    { name: "Basic RAROC", math: "\\text{RAROC} = \\dfrac{\\text{risk-adjusted return}}{\\text{risk-adjusted (economic) capital}}", note: "The simplest form." },
    { name: "Detailed RAROC (capital budgeting)", math: "\\text{RAROC} = \\dfrac{\\text{revenues} - \\text{costs} - \\text{EL} - \\text{taxes} + \\text{return on econ. capital} - \\text{transfers}}{\\text{economic capital}}", note: "$1.5B portfolio example: RAROC = [(105−75−7.5+1.2)×(1−0.25)]/120 = 8.56% after-tax." },
    { name: "Hurdle rate (after-tax)", math: "h_{\\text{AT}} = \\text{after-tax weighted average cost of equity capital (via CAPM)}", note: "RAROC > hurdle rate → accept; RAROC < hurdle rate → reject." },
    { name: "Adjusted RAROC (ARAROC)", math: "\\text{ARAROC} = \\text{RAROC} - \\beta\\times(\\text{market return} - r_f)", note: "RAROC=12%, rf=5%, market return=11%, \\(\\beta =1.5\\) → ARAROC=12%−1.5×6%=3% < 5% → reject." },
    { name: "Diversification benefit (2-activity example)", math: "\\text{Benefit} = (\\text{stand-alone }A + \\text{stand-alone }B) - \\text{combined capital}", note: "A=$50, B=$60, combined=$90 → benefit=$20, allocated pro-rata." }
  ],

  concepts: [
    {
      name: "Risk capital vs. economic capital vs. regulatory capital",
      def: "Economic capital = risk capital + strategic risk capital. Regulatory capital differs from risk capital in three ways: only applies to regulated industries, set by industry-wide benchmarks (usually well below true risk capital), and within a firm's divisions, risk capital and regulatory capital can diverge even if they match at the firm level.",
      pitfall: "Allocate the GREATER of risk capital and regulatory capital per division — don't default to just one or the other.",
      related: [{ r: 20, label: "R20 — EL/UL, the building blocks of risk capital" }]
    },
    {
      name: "Risk capital and strategic risk capital",
      def: "Risk capital ≈ the firm's one-year VaR at a high confidence level (usually ≥95%) — the buffer against unexpected loss specifically. Strategic risk capital = goodwill (excess purchase price over fair value of net assets) + burned-out capital (start-up spend at risk if a venture is abandoned, amortized over time).",
      related: []
    },
    {
      name: "The detailed RAROC equation",
      def: "RAROC = [expected revenues − costs − expected losses (EL) − taxes + return on economic capital − transfers] / economic capital.",
      example: "$1.5B loan portfolio, 7% pre-tax return, $10M opex, funded by $1.5B deposits at 5%, EL=0.5%/yr, UL=8% ($120M economic capital), risk-free rate 1%, tax rate 25%. Expected revenue=$105M, interest expense=$75M, EL=$7.5M, return on econ. capital=$1.2M. RAROC = [(105−75−7.5+1.2)×(1−0.25)]/120 = 8.56% after-tax.",
      related: ["Hurdle rate and adjusted RAROC"]
    },
    {
      name: "Time horizon, default probability, confidence level — the three judgment calls",
      def: "Time horizon: usually one year; the square-root-of-time rule scales 1-day VaR to annual, adjusted for 'time to reduce' risk to a core level. Default probability: point-in-time (PIT) for short-term pricing/expected loss; through-the-cycle (TTC) for economic capital, profitability, and strategic decisions. Confidence level: must match the firm's target credit rating (AA/AAA needs >99.95%).",
      example: "Daily VaR=80, core risk=60, 10 days to reduce (2/day), 252 business days: annualized VaR = \\(80\\times \\sqrt{252}\\) = 1,269.96. Required risk capital ≈ 75.6% of annualized VaR (blending the reduction path with the core-risk floor).",
      pitfall: "A LONGER RAROC time horizon isn't automatically 'better' — risk and return data over one year quickly becomes unreliable, which is exactly why one year remains the default despite the appeal of capturing a 'full business cycle.' TTC produces LOWER economic-capital volatility since ratings change less often under a TTC lens. Lowering the confidence level cuts required capital MOST DRAMATICALLY for firms whose big losses are rare (op/credit/settlement risk-heavy books).",
      related: [{ r: 22, label: "R22 — through-the-cycle vs point-in-time ratings, the same concept" }],
      memory: "PIT for pricing (react fast); TTC for capital/strategy (smooth, stable)."
    },
    {
      name: "Hurdle rate and adjusted RAROC",
      def: "Hurdle rate h_AT = after-tax weighted average cost of equity capital (via CAPM). Decision rule: RAROC > hurdle rate → accept; RAROC < hurdle rate → reject.",
      pitfall: "This basic rule ignores that high-RAROC projects can still be high-risk, and low-RAROC projects can be low-risk and value-preserving — hence adjusted RAROC (ARAROC), which nets out systematic risk via CAPM. ARAROC decision rule: ARAROC > risk-free rate → accept; ARAROC < risk-free rate → reject.",
      example: "RAROC=12%, rf=5%, market return=11%, \\(\\beta =1.5\\). ARAROC = 12% − 1.5×6% = 3%. Since 3% < 5% (rf), reject the project — despite RAROC exceeding the simple hurdle rate comparison might have suggested acceptance.",
      related: [],
      memory: "Simple RAROC vs hurdle rate can approve a project that ARAROC (accounting for systematic risk) correctly rejects."
    },
    {
      name: "Diversification benefits — stand-alone, fully diversified, marginal capital",
      def: "Activity A alone needs $50, B alone needs $60, together $90. Diversification benefit = 50+60−90 = $20, allocated pro-rata: A gets $9.1, B gets $10.9 → fully diversified capital: A=$40.9, B=$48.1. Marginal capital: A's marginal = 90−60=$30; B's marginal = 90−50=$40 (marginal capital sums to less than total capital — this is normal and expected).",
      pitfall: "Use cases differ by concept: stand-alone capital → incentive pay; fully diversified capital → solvency and minimum capital requirements; marginal capital → active portfolio/business-mix decisions. Correlations can COLLAPSE toward ±1 in a crisis, wiping out assumed diversification benefits exactly when you need them most.",
      related: [{ r: 20, label: "R20 — the same diversification logic in credit portfolio UL" }],
      memory: "Three capital concepts, three different jobs: stand-alone pays bonuses, fully-diversified sets solvency floors, marginal guides portfolio decisions."
    },
    {
      name: "RAROC best practices",
      def: "Senior management buy-in and active promotion, clear communication/education for buy-in across management levels, ongoing consultation via a cross-functional metrics-review committee, centralized data quality control (RAROC team owns collection/computation/reporting; business units own data accuracy controls), complement RAROC with a qualitative four-quadrant (return × earnings-quality) assessment, active capital management via quarterly limit requests reviewed collaboratively.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 46, why: "RAROC was previewed there as part of ERM's fourth (financial-firm-specific) pillar." },
      { r: 20, why: "The EL/UL machinery from Credit Risk Book 2 is directly reused as RAROC's numerator/denominator building blocks." }
    ],
    to: [
      { r: 57, why: "Economic capital's practical challenges and limitations get their own dedicated treatment." }
    ],
    confused: [
      { what: "RAROC vs Adjusted RAROC decision rules", how: "RAROC compares to the HURDLE RATE (after-tax WACC); ARAROC compares to the RISK-FREE RATE, after subtracting a CAPM-based systematic risk adjustment. A project can pass the RAROC test and still fail the ARAROC test." },
      { what: "Stand-alone vs fully diversified vs marginal capital", how: "Stand-alone: each activity's OWN capital need in isolation. Fully diversified: total combined capital, allocated pro-rata (accounts for diversification benefit). Marginal: the capital added by ONE activity given the other already exists (marginal amounts sum to less than the total — expected, not an error)." },
      { what: "Point-in-time vs through-the-cycle default probability", how: "PIT reacts fast, used for short-term pricing/EL. TTC smooths across the cycle, used for economic capital and strategic decisions — same distinction as R22's rating philosophies." }
    ]
  },

  misconceptions: [
    { wrong: "\"A project with RAROC above the hurdle rate should always be accepted.\"", right: "The simple RAROC-vs-hurdle-rate rule ignores systematic risk exposure — a project can pass this test yet fail the ARAROC test (which nets out systematic risk via CAPM and compares to the risk-free rate), correctly identifying it as value-destroying once risk is properly priced in." },
    { wrong: "\"Marginal capital for each activity should sum to exactly the total combined capital.\"", right: "Marginal capital amounts NORMALLY sum to LESS than total combined capital — this is expected and correct, not an error, because marginal capital measures each activity's incremental contribution GIVEN the others already exist, and these increments overlap in how they capture shared diversification benefit." },
    { wrong: "\"A longer RAROC time horizon (e.g., a full business cycle) would give more reliable risk-adjusted performance measures.\"", right: "Risk and return data over periods longer than about one year quickly become unreliable — this is exactly why one year remains the standard default despite the conceptual appeal of capturing a full business cycle." },
    { wrong: "\"Diversification benefits assumed in economic capital models are stable and can be relied upon in a crisis.\"", right: "Correlations can COLLAPSE toward ±1 in a crisis, wiping out assumed diversification benefits exactly when the firm needs them most — a crucial caution for economic capital modeling." }
  ],

  highYield: [
    { stars: 5, what: "Detailed RAROC formula and full worked calculation fluency.", why: "The core computational skill of this reading — directly testable as a multi-step numeric problem." },
    { stars: 5, what: "Adjusted RAROC (ARAROC) and its CAPM-based systematic risk adjustment, decision rule vs. risk-free rate.", why: "A frequently tested formula that corrects RAROC's key blind spot (ignoring systematic risk level)." },
    { stars: 4, what: "Stand-alone / fully diversified / marginal capital — definitions, use cases, and why marginal sums to less than total.", why: "A precise three-way distinction with clear, separately testable use cases." },
    { stars: 4, what: "PIT vs TTC default probability for different RAROC purposes; confidence level tied to target credit rating.", why: "Reuses R22's rating philosophy distinction in a new capital-allocation context." },
    { stars: 3, what: "Risk capital vs regulatory capital: allocate the GREATER of the two per division.", why: "A precise, specific rule frequently tested as a standalone fact." }
  ],

  recall: [
    { q: "A project shows RAROC of 12% against a hurdle rate of 9% (accept signal), but its beta is 1.5, risk-free rate is 5%, and market return is 11%. Should the firm proceed?", a: "Compute ARAROC = 12% − 1.5×(11%−5%) = 12%−9% = 3%. Since 3% < 5% (risk-free rate), REJECT the project — despite passing the simple RAROC-vs-hurdle-rate test, the project doesn't adequately compensate for its systematic risk exposure once properly adjusted via CAPM." },
    { q: "Why does marginal capital for two activities (A and B) sum to LESS than their combined fully-diversified capital, and why is this not an error?", a: "Marginal capital measures each activity's incremental capital contribution GIVEN the other already exists in the portfolio — both activities' marginal calculations 'take credit for' the shared diversification benefit from the other's presence, causing double-counting when summed. This is expected: marginal capital answers 'what does adding this ONE activity change,' not 'what's this activity's fair share of the total,' which is what fully diversified (pro-rata allocated) capital answers instead." },
    { q: "Why would a bank use point-in-time default probabilities for RAROC's expected loss calculation but through-the-cycle default probabilities for its economic capital sizing?", a: "Expected loss for pricing/short-term decisions needs to reflect CURRENT credit conditions accurately (PIT), since that's what's actually being priced into a specific transaction today. Economic capital, meant to be a stable strategic buffer against unexpected loss over time, benefits from the smoother, less volatile TTC default probability estimates, since ratings (and hence required capital) change less often under a TTC lens — avoiding needless capital churn from short-term credit fluctuations." },
    { q: "Why might correlations assumed in an economic capital model provide a false sense of security?", a: "Correlations often COLLAPSE toward ±1 during a genuine crisis — exactly when diversification benefit is needed most, it tends to evaporate, because previously uncorrelated risks start moving together under systemic stress. A model built on 'normal times' correlations can dramatically understate capital needs in exactly the tail scenario it's meant to protect against." }
  ],

  hooks: [
    { title: "Two hurdles, not one", text: "RAROC clears the first hurdle (beats the WACC-based rate). ARAROC clears a second, sneakier hurdle (beats the risk-free rate, AFTER subtracting a systematic-risk toll). A project can clear the first and trip on the second." },
    { title: "Three capital concepts, three jobs", text: "Stand-alone capital pays the bonus. Fully diversified capital sets the solvency floor. Marginal capital guides 'should we grow this business line.' Same portfolio, three different numbers, three different questions." },
    { title: "Correlation's disappearing act", text: "Diversification benefit is a magic trick that vanishes exactly when you need it most — correlations rush toward 1 in a crisis, and the 'benefit' the model promised evaporates." }
  ],

  summary: `<p><strong>Economic capital</strong> = risk capital + strategic risk capital; allocate the GREATER of risk capital and regulatory capital per division. <strong>Detailed RAROC</strong> = [revenue−costs−EL−taxes+return on econ capital−transfers]/economic capital. Three judgment calls: <strong>time horizon</strong> (1yr default, longer horizons unreliable), <strong>default probability</strong> (PIT for pricing, TTC for capital/strategy), <strong>confidence level</strong> (tied to target credit rating). <strong>RAROC vs hurdle rate</strong> (after-tax CAPM WACC) ignores systematic risk level; <strong>ARAROC</strong> = \\(RAROC- \\beta (market\\) return−rf), compared to rf, corrects this. <strong>Stand-alone</strong> (incentive pay) / <strong>fully diversified</strong> (solvency, pro-rata allocated) / <strong>marginal</strong> (portfolio decisions, sums to less than total — expected) capital serve different purposes. Correlations can collapse to ±1 in a crisis, erasing assumed diversification benefit.</p>`
});
