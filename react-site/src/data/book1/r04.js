export default ({
  book: 1, reading: 4,
  session: "Risk Measurement",
  title: "Backtesting VaR",
  tagline: "Three readings gave you ways to produce a risk number. This one answers the only question a regulator cares about: how do you know it can be trusted?",

  teaches: `<p>Backtesting compares predicted VaR against realized losses. You learn the vocabulary (<strong>exceptions</strong>, failure rates), the statistics (z-test, <strong>Kupiec unconditional coverage LR test</strong>, Christoffersen conditional coverage), the error taxonomy (Type I vs Type II and who bears each cost), and the regulatory implementation (<strong>Basel traffic-light zones</strong> with capital multipliers).</p>
  <p>This is the reading most likely to appear as a 'which statistic tests what' conceptual question. The map of tests matters more than any single formula.</p>`,

  why: `<p>A VaR model that never gets audited is a story, not a measurement. Banks hold capital as a multiple of VaR, so a bank whose model understates risk holds too little capital while looking compliant. Basel's answer: count the days actual losses exceeded 99% VaR over 250 days; more than 4 and the capital multiplier starts rising. The statistics exist because randomness is noisy. Even a perfect model produces bad-luck exception streaks, and even a broken model can get lucky. The tests separate luck from defect, imperfectly, which is exactly what the Type I/II framework quantifies.</p>`,

  intuition: `<p>Your VaR model is a weather forecaster claiming '5% chance of a storm-level loss each day.' Over 252 days you expect ≈12.6 storms. If you observe 22, is the forecaster broken or unlucky? That's a coin-flip question in disguise, a binomial test on the exception count. The z-statistic and Kupiec LR are two dress codes for the same binomial logic.</p>
  <p>But counting storms isn't enough. Twelve storms scattered randomly is consistent with a good model. Twelve storms in one month means the model failed to adapt when the climate shifted, even though the COUNT looks fine. That's why conditional coverage (independence of exceptions over time) exists as a separate test.</p>`,

  eli5: `<p>Imagine a smoke detector that is supposed to sound roughly once for every 20 times you seriously burn toast (a "5% chance of a beep per burn"). If it goes off way more than that, it's an oversensitive, annoying detector that will get ignored: the electronics equivalent of a VaR model that cries wolf and gets its warnings dismissed. If it almost never goes off, even when the kitchen is genuinely smoky, it's a broken, dangerously under-sensitive detector, the equivalent of a VaR model that understates risk. Now imagine it also stays silent for months and then beeps ten times in one smoky week. The total beep-count over the year might look "about right," but the pattern reveals the detector failed to react when conditions actually changed. Counting beeps is the <strong>unconditional</strong> test (did it go off the right number of times?); checking whether the beeps cluster around real danger is the <strong>conditional</strong> test (did it go off at the right times?). A bank's VaR model is graded on both.</p>`,

  thinkLike: `<p>A market-risk backtesting analyst does not ask "did my model produce exactly the textbook number of exceptions?" Noise guarantees it usually won't. The real question is a hypothesis test: given the number of exceptions actually observed, is it more consistent with "the model is fine and this is ordinary sampling variation" or with "the model is miscalibrated"? That reframing is why every tool in this reading, the z-test, Kupiec's LR, Christoffersen's LR, is a formal statistical test with a null hypothesis (the model is correctly calibrated) and a rejection rule, not a simple threshold count.</p>
  <p>The exam tests this reading almost entirely as a "which statistic catches what" map, not as heavy computation. You should be able to instantly answer: does this test see the exception count, the timing, or both? Which error type (Type I or Type II) is the question describing? Which of the four Basel yellow-zone causes is being hinted at, and is "small sample size" being planted as bait? A practitioner internalizes that regulators are asymmetric. They would rather occasionally punish an unlucky-but-correct model (Type I) than let a genuinely broken one keep operating with too little capital behind it (Type II), because the systemic cost of the latter is much larger. Every design choice in the Basel framework (penalties starting at just 5 exceptions, the 99% confidence mandate) follows from that asymmetry, so when a question asks "why does Basel do X," the answer is almost always "to guard against Type II risk."</p>`,

  visual: `<div class="widget" data-widget="traffic"></div>`,

  pdf: { book: 1, query: "the process of comparing losses predicted by" },

  breakdown: [
    {
      title: "The three backtesting statistics, and what each one actually looks at",
      points: [
        "Failure-rate z-test: treats each day as a coin flip (exception or not) and asks whether the observed exception COUNT is a plausible draw from that coin, using the normal approximation to the binomial. Fast, mechanical, and the most likely 'compute this' question.",
        "Kupiec unconditional coverage (LRuc): a likelihood-ratio version of the same count question. It compares the likelihood of the data under the model's stated p versus under the observed rate N/T. Same binomial logic as the z-test, dressed as a \\(\\chi^{2}(1)\\) test; 3.84 = 1.96².",
        "Christoffersen conditional coverage (LRcc = LRuc + LRind): adds a second test, LRind, that checks whether exceptions are independent over time rather than clustered. A model can pass the count (Kupiec) and still fail conditional coverage if all its exceptions bunch into one turbulent stretch. Clustering signals the model didn't adapt when conditions changed."
      ]
    },
    {
      title: "The four official Basel yellow-zone causes (5–9 exceptions, 250 days, 99% VaR)",
      points: [
        "Basic integrity of the model is lacking: the model is poorly specified, or the data/code feeding it is flawed; a penalty applies.",
        "Model accuracy needs to be improved: the approximations used are simply not precise enough for the risk taken; a penalty applies.",
        "Intraday trading activity: the portfolio changed during the day, so the static end-of-day VaR no longer describes the risk actually run; a penalty may be considered case-by-case.",
        "Bad luck, or markets moved in an unforeseeable way: the model may be fine and the bank was unlucky; no automatic penalty guidance is given. ('Small sample size' is NOT one of these four; it is the classic wrong-answer distractor.)"
      ]
    },
    {
      title: "Basel traffic-light zones: boundaries and capital multipliers",
      points: [
        "Green zone: 0–4 exceptions out of 250 days at 99% VaR. Multiplier k stays at its floor of 3.00; the regulator treats this range as consistent with a correctly calibrated model.",
        "Yellow zone: 5–9 exceptions. Multiplier k rises on a sliding scale from 3.40 to 3.85, and supervisors use discretion (informed by the four causes above) about whether to penalize.",
        "Red zone: 10+ exceptions. Multiplier k jumps to 4.00 automatically. At this point the regulator presumes the model is broken, not merely unlucky."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank runs 95% VaR over 500 trading days and observes 35 exceptions. What does the z-test conclude?",
      options: [
        "z ≈ 2.05 > 1.96 → reject: the model understates risk",
        "z ≈ 2.05 < 1.96 → fail to reject: the model is well calibrated",
        "z ≈ 1.05, inconclusive because the test confidence level was never specified",
        "The z-test cannot be run because 35 exceptions exceeds the Basel red-zone threshold"
      ],
      answer: 0,
      why: "Expected exceptions = 0.05 × 500 = 25; SE = √(0.05×0.95×500) ≈ 4.87; z = (35−25)/4.87 ≈ 2.05, which exceeds the 1.96 critical value at 95% test confidence, so the model is rejected as understating risk. The tempting wrong answer, the 'fail to reject' conclusion, comes from misreading which side of 1.96 counts as rejection. The 'test cannot be run' answer wrongly imports the Basel 99%/250-day framework into a problem that uses different parameters (95%/500 days)."
    },
    {
      q: "A VaR model produces exactly the expected number of exceptions over a year, but all of them occur in a single volatile month. Which statement is correct?",
      options: [
        "It fails both Kupiec and Christoffersen, since exceptions are excessive",
        "It passes Kupiec (unconditional coverage) but fails the independence component of Christoffersen (conditional coverage)",
        "It passes both tests, since the total count is what backtesting measures",
        "It fails Kupiec but passes Christoffersen, since Christoffersen ignores the count"
      ],
      answer: 1,
      why: "Kupiec's LRuc only looks at the total exception COUNT, which is on target here, so it passes. Christoffersen's LRcc = LRuc + LRind adds LRind, which specifically tests whether exceptions are independent over time. Clustering all of them into one month fails that independence test, so conditional coverage fails even though unconditional coverage does not. The 'fails both tests' answer wrongly assumes any clustering inflates the count; the 'fails Kupiec but passes Christoffersen' answer reverses which test ignores what."
    },
    {
      q: "Why do bank regulators structurally accept a meaningful false-alarm (Type I) rate on genuinely good VaR models rather than setting a much higher exception trigger?",
      options: [
        "Because Type I errors are statistically impossible to reduce below 10%",
        "Because a higher trigger would make Type II errors — letting a truly miscalibrated model pass undetected — more likely, and regulators view the systemic cost of that as larger",
        "Because Basel requires exactly 5 exceptions regardless of model quality",
        "Because banks prefer more false alarms since it lowers their capital requirement"
      ],
      answer: 1,
      why: "The z-test/Kupiec framework's whole design (thresholds set low enough that a genuinely correct model still triggers scrutiny about 10.8% of the time) reflects a deliberate regulatory asymmetry: missing a bad model (Type II) risks under-capitalized systemic losses, which regulators judge far more costly than occasionally flagging a correct model (Type I). The 'statistically impossible to reduce' answer is false; the rate is a designed trade-off, not a floor. The 'banks prefer more false alarms' answer is backwards, since more flagged exceptions raises, not lowers, scrutiny and potential capital penalties."
    },
    {
      q: "Which of the following is NOT one of the Basel Committee's four official causes of yellow-zone exceptions?",
      options: [
        "Basic integrity of the model is lacking",
        "Model accuracy needs to be improved",
        "Small sample size",
        "Intraday trading activity"
      ],
      answer: 2,
      why: "The four official causes are: integrity lacking, accuracy needs improvement, intraday trading effects, and bad luck. 'Small sample size' is not one of them. It's a commonly planted wrong answer designed to catch test-takers who assume statistical power issues are the official explanation."
    },
    {
      q: "A bank's 99% VaR model over 250 days lands in the Basel red zone with 11 exceptions. What capital multiplier applies, and what does the red zone signify about the model?",
      options: [
        "k = 3.00; the model is presumed correctly calibrated",
        "k = 3.40–3.85; supervisors use discretion on whether to penalize",
        "k = 4.00; the regulator presumes the model itself is defective, not merely unlucky",
        "No multiplier applies; red-zone models are simply shut down with no capital calculation"
      ],
      answer: 2,
      why: "10 or more exceptions out of 250 days at 99% VaR puts the model in the red zone, where the scaling factor k is fixed at 4.00 and applied automatically. The regulator no longer entertains 'bad luck' as an explanation. The '3.40–3.85, discretion' answer describes the yellow zone (5–9 exceptions), and the 'k = 3.00, presumed correctly calibrated' answer describes the green zone (0–4)."
    },
    {
      q: "Why is the Kupiec test's rejection threshold of 3.84 described as 'the same test in different dress' as the z-test's 1.96 critical value?",
      options: [
        "Because 3.84 is roughly double 1.96, reflecting Kupiec's use of two-tailed testing",
        "Because 3.84 = 1.96², since a \\(\\chi^{2}(1)\\) random variable is by construction the square of a standard normal variable",
        "Because both numbers were set independently by the Basel Committee and only coincide by chance",
        "Because Kupiec's test uses a 90% confidence level while the z-test uses 95%"
      ],
      answer: 1,
      why: "A \\(\\chi^{2}\\) distribution with 1 degree of freedom is mathematically the distribution of a squared standard normal variable, so the Kupiec LR test's 95%-confidence rejection threshold (3.84) is exactly the square of the z-test's 95%-confidence critical value (1.96). Both encode the identical binomial-exception logic, just expressed through different test statistics. The 'roughly double, two-tailed' answer misstates the relationship as additive/doubling rather than squaring; the 'coincidence' answer misses that this is a mathematical identity, not a coincidence."
    }
  ],

  sources: [
    { title: "Backtesting (Wikipedia)", url: "https://en.wikipedia.org/wiki/Backtesting", note: "General background on backtesting methodology and its use in validating quantitative models, including risk models." },
    { title: "Value at Risk (Investopedia)", url: "https://www.investopedia.com/terms/v/var.asp", note: "Refresher on VaR itself — the confidence level, holding period, and what the number is meant to predict — useful context before auditing it." },
    { title: "Basel Committee on Banking Supervision — Amendment to the Capital Accord to Incorporate Market Risks", url: "https://www.bis.org/publ/bcbs24.htm", note: "The original BIS document introducing the traffic-light backtesting framework and capital multiplier zones referenced in this reading." },
    { title: "Type I and type II errors (Wikipedia)", url: "https://en.wikipedia.org/wiki/Type_I_and_type_II_errors", note: "Formal statistical definitions of the error taxonomy this reading applies to regulatory model validation." }
  ],

  formulas: [
    { name: "Failure-rate z-test", math: "z = \\dfrac{x - pT}{\\sqrt{p(1-p)T}}", note: "x = exceptions, p = 1−VaR confidence, T = days. |z| > 1.96 → reject unbiasedness at 95%.",
      plain: "This is an ordinary standardized-score (z-score) test: it measures how many standard deviations the observed exception count x sits away from the number pT you'd expect if the model's stated failure probability p were exactly correct.",
      derivation: `<p>Each day is a Bernoulli trial: an exception happens with probability \\(p = 1 - \\text{confidence}\\), or it doesn't. Over \\(T\\) independent days, the total exception count \\(x\\) is Binomial\\((T, p)\\), which has:</p>
      \\[ E[x] = pT, \\qquad \\text{Var}(x) = p(1-p)T \\]
      <p>For large \\(T\\) the binomial is well approximated by a normal distribution (the Central Limit Theorem), so standardizing \\(x\\) the usual way — subtract its mean, divide by its standard deviation — gives:</p>
      \\[ z = \\dfrac{x - pT}{\\sqrt{p(1-p)T}} \\sim N(0,1) \\text{ under the null that the model is correctly calibrated} \\]
      <p>Compare \\(|z|\\) to the normal critical value (1.96 at 95% test confidence) to decide whether the deviation is too large to be explained by ordinary sampling noise.</p>` },
    { name: "Kupiec unconditional coverage", math: "LR_{uc} \\sim \\chi^{2}(1); \\text{ reject if } LR_{uc} > 3.84", note: "3.84 = \\(1.96^{2}\\); the \\(\\chi^{2}\\) threshold is literally the squared normal critical value. The exam likes this 'aha.'",
      plain: "This is a likelihood-ratio statistic: it compares how likely the observed exception count is under the model's stated failure probability p versus under the failure rate that was actually observed (N/T); a big gap between those two likelihoods signals miscalibration.",
      derivation: `<p>Kupiec's statistic is the standard likelihood-ratio form, comparing the likelihood of the data under the null (true failure probability equals the model's stated \\(p\\)) against the likelihood under the unconstrained maximum-likelihood estimate of the failure rate, \\(\\hat p = N/T\\):</p>
      \\[ LR_{uc} = -2\\ln\\!\\left[(1-p)^{\\,T-N}\\,p^{\\,N}\\right] + 2\\ln\\!\\left[\\left(1-\\dfrac{N}{T}\\right)^{T-N}\\left(\\dfrac{N}{T}\\right)^{N}\\right] \\]
      <p>The first bracket is the likelihood of seeing \\(N\\) exceptions in \\(T\\) days if the true failure probability really is the model's \\(p\\). The second bracket is the likelihood using the best-fitting failure rate given the data itself, \\(N/T\\). If the model is well calibrated the two likelihoods are close and \\(LR_{uc}\\) is small; if they diverge, \\(LR_{uc}\\) grows. Under the null, \\(-2\\) times this log-likelihood ratio is asymptotically \\(\\chi^{2}\\) with 1 degree of freedom — and since a \\(\\chi^{2}(1)\\) variable is just a squared standard normal, the 3.84 rejection threshold is exactly \\(1.96^{2}\\), the same critical value used by the z-test above. Same binomial logic, different dress code.</p>` },
    { name: "Christoffersen conditional coverage", math: "LR_{cc} = LR_{uc} + LR_{ind}; \\text{ reject if } LR_{cc} > 5.99 \\ (\\chi^{2}, 2\\,\\text{df})", note: "LR_ind alone: reject independence if > 3.84 \\((\\chi^{2}\\), 1df). You need what each tests, not hand computation.",
      plain: "This statistic bolts a second likelihood-ratio test onto Kupiec's: LRind separately tests whether exceptions are independent over time (not clustered), and LRcc simply adds that independence test to the count test so that a model can only pass if it gets both the total number of exceptions AND their timing right." }
  ],

  concepts: [
    {
      name: "Exceptions and failure rates",
      def: "An exception is a day whose actual loss exceeds the predicted VaR. The failure rate x/T should be close to p = 1 − confidence level if the model is calibrated.",
      intuition: "Too many exceptions means the model understates risk (dangerous). Too few means the model is over-conservative (expensive: misallocated capital). Both directions are failures. 'Too safe' is also wrong.",
      example: "Basel baseline: 99% VaR over 250 days → expect 2.5 exceptions; penalties begin at 5.",
      pitfall: "Over-conservatism is a real failure mode, not a virtue. A question describing 0 exceptions in 3 years is hinting at a wastefully conservative model.",
      related: [{ r: 1, label: "R1, the VaR being audited" }]
    },
    {
      name: "Why backtesting is hard (dirty P&L)",
      def: "VaR is computed on a static portfolio snapshot, but actual P&L includes intraday trading, fees, commissions, and spread income the model never saw.",
      intuition: "You're grading a forecast of a portfolio that no longer exists by lunchtime. Fixes: short (daily) holding periods, 'cleaned' returns with non-risk P&L items removed, and tracking BOTH actual and hypothetical (static-portfolio) returns.",
      pitfall: "'Intraday trading activity' is one of Basel's four named yellow-zone causes. This concept feeds directly into the regulatory framework below.",
      related: [{ r: 16, label: "R16, FRTB's P&L attribution formalizes this" }]
    },
    {
      name: "The z-test on failure rates",
      def: "Model the exception count as binomial(T, p); \\(z = (x - pT)/\\sqrt{p(1-p)T}\\) against the standard normal.",
      example: "95% VaR, 252 days, 22 exceptions: z = (22 − 12.6)/3.46 ≈ 2.72 > 1.96 → reject; the model understates risk.",
      pitfall: "TWO different confidence levels coexist: the VaR confidence (95%) and the TEST confidence (also often 95% → 1.96). Separate choices that needn't match. Questions deliberately set them different to catch conflation.",
      related: ["Kupiec LR test"]
    },
    {
      name: "Type I vs Type II errors, and who pays",
      def: "Type I: reject a CORRECT model (bank penalized unfairly). Type II: fail to reject a BAD model (regulator misses systemic danger).",
      intuition: "Regulators structurally fear Type II more. A dangerous model slipping through beats an unlucky bank in their nightmare ranking. That's why penalties start at just 5 exceptions even though a correct model lands there ≈10.8% of the time.",
      example: "Numbers worth recognizing: ≈10.8% Type I at 5+ exceptions (99% VaR); ≈12.8% Type II in the standard illustration (evaluated at 97% coverage).",
      pitfall: "Also know: 99% VaR requires ≈1.24× the capital of 97.5%. Banks have an incentive to game confidence levels downward, which is why Basel mandates 99%.",
      related: [{ r: 53, label: "R53, model risk management generalizes this audit mindset" }],
      memory: "Type I = Innocent punished. Type II = Threat missed. Regulators dread II."
    },
    {
      name: "Kupiec unconditional coverage (LRuc)",
      def: "Likelihood-ratio test on the exception COUNT against binomial expectation; \\(\\chi^{2}(1)\\) under the null; reject above 3.84.",
      intuition: "The z-test's likelihood-ratio twin. 3.84 = \\(1.96^{2}\\) is not a coincidence: same test, squared geometry.",
      example: "T=252, p=0.05, N=12 vs expected 12.6 → LRuc far below 3.84 → fail to reject; model validated.",
      pitfall: "'Unconditional' = only the COUNT matters; timing is invisible. That blindness is the whole reason conditional coverage exists.",
      related: ["Christoffersen conditional coverage"]
    },
    {
      name: "Conditional coverage & exception clustering",
      def: "Christoffersen splits model validation into count (LRuc) plus independence over time (LRind): LRcc = LRuc + LRind.",
      intuition: "Eight exceptions in one turbulent month with zero elsewhere can pass the count test while screaming that the model failed to adapt. Clustering means correlations shifted or the book changed and VaR didn't keep up.",
      pitfall: "You are NOT required to compute LRind by hand. Know what it tests (independence/clustering) and the thresholds: LRcc > 5.99 (2df), LRind > 3.84 (1df).",
      related: [{ r: 8, label: "R8, why correlations shift in regimes" }]
    },
    {
      name: "Basel traffic-light zones",
      def: "250 days, 99% VaR. Green 0–4 exceptions: k = 3.00. Yellow 5–9: k = 3.40–3.85, supervisor discretion. Red 10+: k = 4.00, automatic penalty.",
      intuition: "A regulatory implementation of the Type I/II compromise: green tolerates bad luck, red presumes defect, yellow is the judgment zone.",
      example: "The FOUR named yellow-zone causes: (1) basic integrity lacking (bad data/code, penalty applies), (2) accuracy needs improvement (penalty applies), (3) intraday trading effects (penalty considered), (4) bad luck (no penalty guidance).",
      pitfall: "'Small sample size' is a classic WRONG distractor. It is NOT one of the four official causes.",
      related: [{ r: 16, label: "R16, FRTB's harsher successor rules" }, { r: 60, label: "R60, the Basel capital context" }],
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
      { what: "Type I vs Type II", how: "I punishes the innocent model; II frees the guilty one. Regulators bias against II, hence penalties at exception counts a good model hits 10.8% of the time." }
    ]
  },

  misconceptions: [
    { wrong: "\"Fewer exceptions is always better.\"", right: "Too few exceptions = over-conservative model = wasted capital. Calibration means the RIGHT number of exceptions, not zero." },
    { wrong: "\"5 exceptions at 99% over 250 days proves the model is broken.\"", right: "A correct model produces ≥5 exceptions ≈10.8% of the time. That's why yellow is a discretion zone, not an automatic penalty." },
    { wrong: "\"Small sample size is an official cause of yellow-zone exceptions.\"", right: "It's the planted WRONG answer. The four causes: integrity failure, accuracy needs improvement, intraday trading, bad luck." },
    { wrong: "\"Passing Kupiec means the model is validated.\"", right: "Kupiec sees only the count. Clustered exceptions can pass Kupiec while failing independence, so you need conditional coverage for the full verdict." },
    { wrong: "\"The 3.84 and 5.99 thresholds are arbitrary.\"", right: "3.84 = \\(1.96^{2}\\) = \\(\\chi^{2}(1)\\) at 95%; 5.99 = \\(\\chi^{2}(2)\\) at 95% because LRcc stacks two component tests (count + independence), consuming 2 degrees of freedom." }
  ],

  highYield: [
    { stars: 5, what: "z-test computation start to finish (expected exceptions, SE, compare 1.96).", why: "The standard calculation question in this reading: fast, mechanical, frequently placed." },
    { stars: 5, what: "Traffic-light zones: boundaries (0–4/5–9/10+), multipliers (3.00/3.40–3.85/4.00), and the four yellow-zone causes.", why: "Pure memorization with a planted distractor ('small sample'); reliable points." },
    { stars: 4, what: "What LRuc vs LRind vs LRcc each test, with thresholds 3.84/3.84/5.99.", why: "'Which statistic detects clustering?' is a recurring one-liner." },
    { stars: 4, what: "Type I/II definitions, who bears each cost, and the ≈10.8%/12.8% illustrative rates.", why: "Conceptual staple; the regulator-fears-Type-II asymmetry is the tested insight." },
    { stars: 3, what: "Dirty P&L problem and its fixes (cleaned returns, hypothetical returns, daily horizon).", why: "Feeds both a direct question and the FRTB P&L attribution story." }
  ],

  recall: [
    { q: "95% VaR, 500 days, 35 exceptions. Run the z-test and conclude.", a: "Expected = 25, SE = \\(\\sqrt{0.05\\cdot 0.95\\cdot 500}\\) ≈ 4.87, z = (35−25)/4.87 ≈ 2.05 > 1.96 → reject: too many exceptions, model understates risk." },
    { q: "Why do regulators accept a 10.8% false-alarm rate on good models?", a: "Because the alternative, loosening the trigger, raises Type II risk: flawed models slipping through with too little capital behind them. Regulators price systemic misses as costlier than unfair penalties." },
    { q: "A model shows exactly the expected number of exceptions, but all in one quarter. Which tests pass and fail, and what does it mean?", a: "Kupiec (count) passes; independence (LRind) fails, so conditional coverage fails. The model didn't adapt to a regime shift. The count is fine, the timing is damning." },
    { q: "Name the four Basel yellow-zone causes and the classic non-cause distractor.", a: "Integrity lacking; accuracy needs improvement; intraday trading; bad luck. Distractor: 'small sample size.'" },
    { q: "Why does Basel mandate 99% VaR rather than letting banks choose?", a: "Capital at 99% ≈ 1.24× capital at 97.5%. Banks would game the confidence level down to save capital, so mandating removes the dial." }
  ],

  hooks: [
    { title: "The storm forecaster", text: "A VaR model claims '5% storm chance daily.' Count the storms: ≈13 in a year is honest, 22 is a broken forecaster, 0 is a forecaster crying storm-danger to inflate their budget. Clustered storms mean the climate changed and the forecast didn't." },
    { title: "1.96² = 3.84", text: "The Kupiec threshold is the z-critical squared: the \\(\\chi^{2}(1)\\) is a squared normal. Two tests, one geometry. If you remember 1.96, you already remember 3.84." },
    { title: "Traffic lights", text: "GREEN 0–4 drive on (k=3). YELLOW 5–9 pull over, officer's discretion (k up to 3.85). RED 10+ license suspended (k=4). And 'small sample size' is never a valid excuse to the officer." }
  ],

  summary: `<p>Backtesting audits VaR by counting <strong>exceptions</strong> (loss > VaR). Binomial logic gives the <strong>z-test</strong>: \\(z=(x- pT)/\\sqrt{p(1- p)T}\\) vs 1.96. <strong>Kupiec LRuc</strong> \\((\\chi^{2}(1)\\), reject >3.84) tests the count; <strong>Christoffersen</strong> adds independence: LRcc = LRuc + LRind, reject >5.99; clustering fails independence even when the count passes. <strong>Type I</strong> (punish good model) vs <strong>Type II</strong> (miss bad model, regulators' bigger fear). <strong>Basel</strong>: 250 days, 99% VaR: green 0–4 (k=3.00), yellow 5–9 (k=3.40–3.85, four named causes, 'small sample' is a distractor), red 10+ (k=4.00). Dirty-P&L problem: static-portfolio VaR vs traded-portfolio reality, fixed by using cleaned/hypothetical returns. Two confidence levels (VaR's and the test's) are separate dials.</p>`
});
