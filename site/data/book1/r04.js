FRM.register({
  book: 1, reading: 4,
  session: "Risk Measurement",
  title: "Backtesting VaR",
  tagline: "Three readings gave you ways to produce a risk number. This one answers the only question a regulator cares about: how do you know it can be trusted?",

  teaches: `<p>Backtesting compares predicted VaR against realized losses. You learn the vocabulary (<strong>exceptions</strong>, failure rates), the statistics (z-test, <strong>Kupiec unconditional coverage LR test</strong>, Christoffersen conditional coverage), the error taxonomy (Type I vs Type II and who bears each cost), and the regulatory implementation (<strong>Basel traffic-light zones</strong> with capital multipliers).</p>
  <p>This is the reading most likely to appear as a 'which statistic tests what' conceptual question — the map of tests matters more than any single formula.</p>`,

  why: `<p>A VaR model that never gets audited is a story, not a measurement. Banks hold capital as a multiple of VaR — so a bank whose model understates risk holds too little capital while looking compliant. Basel's answer: count the days actual losses exceeded 99% VaR over 250 days; more than 4 and the capital multiplier starts rising. The statistics exist because randomness is noisy: even a perfect model produces bad-luck exception streaks, and even a broken model can get lucky. The tests separate luck from defect — imperfectly, which is exactly what the Type I/II framework quantifies.</p>`,

  intuition: `<p>Your VaR model is a weather forecaster claiming '5% chance of a storm-level loss each day.' Over 252 days you expect ≈12.6 storms. If you observe 22, is the forecaster broken or unlucky? That's a coin-flip question in disguise — a binomial test on the exception count. The z-statistic and Kupiec LR are two dress codes for the same binomial logic.</p>
  <p>But counting storms isn't enough. Twelve storms scattered randomly is consistent with a good model; twelve storms in one month means the model failed to adapt when the climate shifted — even though the COUNT looks fine. That's why conditional coverage (independence of exceptions over time) exists as a separate test.</p>`,

  visual: `<div class="widget" data-widget="traffic"></div>`,

  formulas: [
    { name: "Failure-rate z-test", math: "z = (x - pT) / \\sqrt{p(1-p)T}", note: "x = exceptions, p = 1−VaR confidence, T = days. |z| > 1.96 → reject unbiasedness at 95%." },
    { name: "Kupiec unconditional coverage", math: "LR_{uc} ~ \\chi^{2}(1); reject if LR_{uc} > 3.84", note: "3.84 = \\(1.96^{2}\\) — the \\(\\chi^{2}\\) threshold is literally the squared normal critical value. The exam likes this 'aha.'" },
    { name: "Christoffersen conditional coverage", math: "LR_{cc} = LR_{uc} + LR_{ind}; reject if > 5.99 (\\chi^{2}, 2df)", note: "LR_ind alone: reject independence if > 3.84 \\((\\chi^{2}\\), 1df). You need what each tests, not hand computation." }
  ],

  concepts: [
    {
      name: "Exceptions and failure rates",
      def: "An exception is a day whose actual loss exceeds the predicted VaR. The failure rate x/T should be close to p = 1 − confidence level if the model is calibrated.",
      intuition: "Too many exceptions → model understates risk (dangerous). Too few → model is over-conservative (expensive: misallocated capital). Both directions are failures — 'too safe' is also wrong.",
      example: "Basel baseline: 99% VaR over 250 days → expect 2.5 exceptions; penalties begin at 5.",
      pitfall: "Over-conservatism is a real failure mode, not a virtue. A question describing 0 exceptions in 3 years is hinting at a wastefully conservative model.",
      related: [{ r: 1, label: "R1 — the VaR being audited" }]
    },
    {
      name: "Why backtesting is hard (dirty P&L)",
      def: "VaR is computed on a static portfolio snapshot, but actual P&L includes intraday trading, fees, commissions, and spread income the model never saw.",
      intuition: "You're grading a forecast of a portfolio that no longer exists by lunchtime. Fixes: short (daily) holding periods, 'cleaned' returns with non-risk P&L items removed, and tracking BOTH actual and hypothetical (static-portfolio) returns.",
      pitfall: "'Intraday trading activity' is one of Basel's four named yellow-zone causes — this concept feeds directly into the regulatory framework below.",
      related: [{ r: 16, label: "R16 — FRTB's P&L attribution formalizes this" }]
    },
    {
      name: "The z-test on failure rates",
      def: "Model the exception count as binomial(T, p); z = (x − \\(pT)/\\sqrt{p(1- p)T}\\) against the standard normal.",
      example: "95% VaR, 252 days, 22 exceptions: z = (22 − 12.6)/3.46 ≈ 2.72 > 1.96 → reject; the model understates risk.",
      pitfall: "TWO different confidence levels coexist: the VaR confidence (95%) and the TEST confidence (also often 95% → 1.96) — separate choices that needn't match. Questions deliberately set them different to catch conflation.",
      related: ["Kupiec LR test"]
    },
    {
      name: "Type I vs Type II errors — and who pays",
      def: "Type I: reject a CORRECT model (bank penalized unfairly). Type II: fail to reject a BAD model (regulator misses systemic danger).",
      intuition: "Regulators structurally fear Type II more — a dangerous model slipping through beats an unlucky bank in their nightmare ranking. That's why penalties start at just 5 exceptions even though a correct model lands there ≈10.8% of the time.",
      example: "Numbers worth recognizing: ≈10.8% Type I at 5+ exceptions (99% VaR); ≈12.8% Type II in the standard illustration (evaluated at 97% coverage).",
      pitfall: "Also know: 99% VaR requires ≈1.24× the capital of 97.5% — banks have an incentive to game confidence levels downward, which is why Basel mandates 99%.",
      related: [{ r: 53, label: "R53 — model risk management generalizes this audit mindset" }],
      memory: "Type I = Innocent punished. Type II = Threat missed. Regulators dread II."
    },
    {
      name: "Kupiec unconditional coverage (LRuc)",
      def: "Likelihood-ratio test on the exception COUNT against binomial expectation; \\(\\chi^{2}(1)\\) under the null; reject above 3.84.",
      intuition: "The z-test's likelihood-ratio twin. 3.84 = \\(1.96^{2}\\) is not a coincidence — same test, squared geometry.",
      example: "T=252, p=0.05, N=12 vs expected 12.6 → LRuc far below 3.84 → fail to reject; model validated.",
      pitfall: "'Unconditional' = only the COUNT matters; timing is invisible. That blindness is the whole reason conditional coverage exists.",
      related: ["Christoffersen conditional coverage"]
    },
    {
      name: "Conditional coverage & exception clustering",
      def: "Christoffersen splits model validation into count (LRuc) plus independence over time (LRind): LRcc = LRuc + LRind.",
      intuition: "Eight exceptions in one turbulent month with zero elsewhere can pass the count test while screaming that the model failed to adapt — clustering means correlations shifted or the book changed and VaR didn't keep up.",
      pitfall: "You are NOT required to compute LRind by hand — know what it tests (independence/clustering) and the thresholds: LRcc > 5.99 (2df), LRind > 3.84 (1df).",
      related: [{ r: 8, label: "R8 — why correlations shift in regimes" }]
    },
    {
      name: "Basel traffic-light zones",
      def: "250 days, 99% VaR. Green 0–4 exceptions: k = 3.00. Yellow 5–9: k = 3.40–3.85, supervisor discretion. Red 10+: k = 4.00, automatic penalty.",
      intuition: "A regulatory implementation of the Type I/II compromise: green tolerates bad luck, red presumes defect, yellow is the judgment zone.",
      example: "The FOUR named yellow-zone causes: (1) basic integrity lacking (bad data/code — penalty applies), (2) accuracy needs improvement (penalty applies), (3) intraday trading effects (penalty considered), (4) bad luck (no penalty guidance).",
      pitfall: "'Small sample size' is a classic WRONG distractor — it is NOT one of the four official causes.",
      related: [{ r: 16, label: "R16 — FRTB's harsher successor rules" }, { r: 60, label: "R60 — the Basel capital context" }],
      memory: "Traffic lights: 4 is fine, 5 alarms, 10 condemns."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "The VaR numbers being audited come from R1's estimators." },
      { r: 3, why: "EVT-based VaR gets backtested with exactly the same exception logic." }
    ],
    to: [
      { r: 16, why: "FRTB tightens this regime: 12+ exceptions at 99% forces the standardized approach; P&L attribution adds a second audit." },
      { r: 53, why: "SR 11-7 model validation is this reading's mindset applied to every model in the bank." },
      { r: 55, why: "Stress testing complements backtesting: backtests audit normal times, stress tests probe hypotheticals." }
    ],
    confused: [
      { what: "Unconditional vs conditional coverage", how: "Unconditional: is the COUNT right? Conditional: is the count right AND are exceptions independent over time? Clustering fails only the second." },
      { what: "VaR confidence vs test confidence", how: "One sets the loss threshold (99% VaR), the other sets the evidence bar for rejecting the model (95% test). Distinct dials." },
      { what: "Type I vs Type II", how: "I punishes the innocent model; II frees the guilty one. Regulators bias against II — hence penalties at exception counts a good model hits 10.8% of the time." }
    ]
  },

  misconceptions: [
    { wrong: "\"Fewer exceptions is always better.\"", right: "Too few exceptions = over-conservative model = wasted capital. Calibration means the RIGHT number of exceptions, not zero." },
    { wrong: "\"5 exceptions at 99% over 250 days proves the model is broken.\"", right: "A correct model produces ≥5 exceptions ≈10.8% of the time. That's why yellow is a discretion zone, not an automatic penalty." },
    { wrong: "\"Small sample size is an official cause of yellow-zone exceptions.\"", right: "It's the planted WRONG answer. The four causes: integrity failure, accuracy needs improvement, intraday trading, bad luck." },
    { wrong: "\"Passing Kupiec means the model is validated.\"", right: "Kupiec sees only the count. Clustered exceptions can pass Kupiec while failing independence — you need conditional coverage for the full verdict." },
    { wrong: "\"The 3.84 and 5.99 thresholds are arbitrary.\"", right: "3.84 = \\(1.96^{2}\\) = \\(\\chi^{2}(1)\\) at 95%; 5.99 = \\(\\chi^{2}(2)\\) at 95% because LRcc stacks two component tests (count + independence), consuming 2 degrees of freedom." }
  ],

  highYield: [
    { stars: 5, what: "z-test computation start to finish (expected exceptions, SE, compare 1.96).", why: "The standard calculation question in this reading — fast, mechanical, frequently placed." },
    { stars: 5, what: "Traffic-light zones: boundaries (0–4/5–9/10+), multipliers (3.00/3.40–3.85/4.00), and the four yellow-zone causes.", why: "Pure memorization with a planted distractor ('small sample'); reliable points." },
    { stars: 4, what: "What LRuc vs LRind vs LRcc each test, with thresholds 3.84/3.84/5.99.", why: "'Which statistic detects clustering?' is a recurring one-liner." },
    { stars: 4, what: "Type I/II definitions, who bears each cost, and the ≈10.8%/12.8% illustrative rates.", why: "Conceptual staple; the regulator-fears-Type-II asymmetry is the tested insight." },
    { stars: 3, what: "Dirty P&L problem and its fixes (cleaned returns, hypothetical returns, daily horizon).", why: "Feeds both a direct question and the FRTB P&L attribution story." }
  ],

  recall: [
    { q: "95% VaR, 500 days, 35 exceptions. Run the z-test and conclude.", a: "Expected = 25, SE = \\(\\sqrt{0.05\\cdot 0.95\\cdot 500}\\) ≈ 4.87, z = (35−25)/4.87 ≈ 2.05 > 1.96 → reject: too many exceptions, model understates risk." },
    { q: "Why do regulators accept a 10.8% false-alarm rate on good models?", a: "Because the alternative — loosening the trigger — raises Type II risk: flawed models slipping through with too little capital behind them. Regulators price systemic misses as costlier than unfair penalties." },
    { q: "A model shows exactly the expected number of exceptions, but all in one quarter. Which tests pass and fail, and what does it mean?", a: "Kupiec (count) passes; independence (LRind) fails, so conditional coverage fails. The model didn't adapt to a regime shift — the count is fine, the timing is damning." },
    { q: "Name the four Basel yellow-zone causes and the classic non-cause distractor.", a: "Integrity lacking; accuracy needs improvement; intraday trading; bad luck. Distractor: 'small sample size.'" },
    { q: "Why does Basel mandate 99% VaR rather than letting banks choose?", a: "Capital at 99% ≈ 1.24× capital at 97.5% — banks would game the confidence level down to save capital. Mandating removes the dial." }
  ],

  hooks: [
    { title: "The storm forecaster", text: "A VaR model claims '5% storm chance daily.' Count the storms: ≈13 in a year is honest, 22 is a broken forecaster, 0 is a forecaster crying storm-danger to inflate their budget. Clustered storms mean the climate changed and the forecast didn't." },
    { title: "1.96² = 3.84", text: "The Kupiec threshold is the z-critical squared — the \\(\\chi^{2}(1)\\) is a squared normal. Two tests, one geometry. If you remember 1.96, you already remember 3.84." },
    { title: "Traffic lights", text: "GREEN 0–4 drive on (k=3). YELLOW 5–9 pull over, officer's discretion (k up to 3.85). RED 10+ license suspended (k=4). And 'small sample size' is never a valid excuse to the officer." }
  ],

  summary: `<p>Backtesting audits VaR by counting <strong>exceptions</strong> (loss > VaR). Binomial logic → <strong>z-test</strong>: \\(z=(x- pT)/\\sqrt{p(1- p)T}\\) vs 1.96. <strong>Kupiec LRuc</strong> \\((\\chi^{2}(1)\\), reject >3.84) tests the count; <strong>Christoffersen</strong> adds independence — LRcc = LRuc + LRind, reject >5.99; clustering fails independence even when the count passes. <strong>Type I</strong> (punish good model) vs <strong>Type II</strong> (miss bad model — regulators' bigger fear). <strong>Basel</strong>: 250 days, 99% VaR: green 0–4 (k=3.00), yellow 5–9 (k=3.40–3.85, four named causes, 'small sample' is a distractor), red 10+ (k=4.00). Dirty-P&L problem: static-portfolio VaR vs traded-portfolio reality → use cleaned/hypothetical returns. Two confidence levels (VaR's and the test's) are separate dials.</p>`
});
