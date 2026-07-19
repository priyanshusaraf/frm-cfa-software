export default ({
  book: 1, reading: 2,
  session: "Risk Measurement",
  title: "Non-Parametric Approaches",
  tagline: "Historical simulation, upgraded. You keep the 'let the data speak' philosophy, but stop treating a 3-year-old observation like yesterday's news.",

  teaches: `<p>Reading 1 left you with two extremes: assume nothing (historical simulation) or assume everything (a full parametric distribution). This reading builds the middle ground, four upgrades that keep HS's assumption-free character while fixing its two structural flaws. First, every observation in the window gets equal weight regardless of age or regime. Second, you can only read VaR at confidence levels your data happens to support.</p>
  <p>You'll learn <strong>bootstrapping</strong> (precision through resampling), <strong>density smoothing</strong> (VaR at any confidence level), and the four <strong>weighting schemes</strong>: age-weighted, volatility-weighted, correlation-weighted, and filtered historical simulation.</p>`,

  why: `<p>Plain HS has a failure mode called the <strong>ghost effect</strong>. A single crash day dominates VaR for exactly n days, then vanishes overnight the moment it rolls out of the window, even though nothing changed in the market that day. Risk numbers that jump for administrative reasons destroy credibility with traders and regulators alike. The weighting schemes exist to make HS's memory fade gradually, and to make its inputs reflect today's volatility regime rather than an average of stale ones.</p>`,

  intuition: `<p>Think of your historical window as a committee voting on today's risk. Plain HS gives every member an equal vote, including the member who joined 4 years ago in a different regime, then expels members abruptly on their n-th day. The fixes are all re-weightings of that committee.</p>
  <p><strong>Age-weighting</strong>: recent members get louder votes, fading geometrically \\((\\lambda )\\). <strong>Volatility-weighting</strong>: every member's testimony gets restated in today's units. That return happened when vol was 2x, so scale it down. <strong>Correlation-weighting</strong>: same restatement, applied to how assets co-move, not just how much each moves. <strong>Filtered HS</strong>: the full treatment. Strip each return down to its standardized shock, bootstrap the shocks, re-dress them in today's (GARCH-forecast) volatility. Only FHS can generate losses worse than anything in the historical record, because recombined shocks can land in configurations history never produced.</p>`,

  visual: `<div class="widget" data-widget="decay"></div>`,

  eli5: `<p>Picture a jury of 250 witnesses, one for each of the last 250 trading days, each testifying about how bad tomorrow could get. Plain historical simulation treats every witness's opinion as equally credible. The witness from 249 days ago, back when the market was in a totally different mood, gets exactly as loud a voice as the witness from yesterday. And the moment a witness's 250-day term expires, they're marched out of the room and never heard from again, even if nothing in the world actually changed that day. The fixes in this reading are all about running a fairer jury. <strong>Age-weighting</strong> lets older witnesses speak more softly the further back they testified from, instead of at full volume until they're suddenly evicted. <strong>Volatility-weighting</strong> asks each witness to restate their testimony in today's terms (a crash witnessed during a calm year should count for less than the same-size crash witnessed during a wild one). <strong>Bootstrapping</strong> polls the same jury thousands of times and averages the verdicts to smooth out noise from any one particular polling. Mapped to finance: the witnesses are historical daily P&L observations, the verdict is the VaR/ES estimate, and the reweighting schemes are ways of fixing which observations get how much say in that estimate.</p>`,

  thinkLike: `<p>A risk manager rolling weighted HS into production isn't choosing "the best" method in the abstract. They're choosing which flaw of plain HS they can least tolerate this quarter. If the desk just lived through a violent regime and the risk committee is worried that a 3-year-old crash observation is still propping up VaR, age-weighting is the natural fix, because it targets staleness directly. If the desk's real complaint is that markets have gotten calmer (or wilder) recently and the historical window hasn't caught up, volatility-weighting is the fix, since it targets the wrong-regime problem rather than the wrong-age problem, a distinction the exam leans on constantly. Filtered HS is the give-me-everything answer: a trading desk running FX or rates books with known volatility clustering (calm spells followed by clusters of turbulence) wants a method that can generate tail losses beyond anything literally observed, because plain and even volatility-weighted HS are mechanically bounded by history's worst day.</p>
  <p>On the exam, GARP tests this reading almost entirely as a matching exercise: given a described flaw (ghost effect, discrete confidence levels, stale correlations, regime mismatch, clustering), pick the one weighting scheme built to fix exactly that flaw, and reject the tempting "it also fixes X" distractor, because none of these schemes fix more than the specific weakness they target. The other recurring test pattern is the boundary case: what happens as \\(\\lambda\\to 1\\) or \\(\\lambda\\to 0\\), and whether a given method's calculated VaR can exceed the historical maximum loss (no for plain and volatility-weighted HS in the general case that GARP tests; yes for FHS).</p>`,

  formulas: [
    {
      name: "Age-weighted (hybrid) observation weight",
      math: "w(i) = \\dfrac{\\lambda^{i-1}(1-\\lambda )}{1-\\lambda^{n}}",
      note: "i = age in days (i=1 is yesterday). \\(\\lambda\\)→1 recovers equal weights (plain HS); small \\(\\lambda\\) means fast decay and reactive VaR.",
      plain: "Give yesterday's observation the biggest weight, shrink every older observation's weight geometrically by another factor of \\(\\lambda\\), then rescale everything so all n weights add up to exactly 1.",
      derivation: `<p>Boudoukh, Richardson, and Whitelaw define the weight on the observation from \\(i\\) days ago recursively: let \\(w(1)\\) be the weight on yesterday's observation, and let each older observation carry \\(\\lambda\\) times the weight of the observation one day more recent than it:</p>
      \\[ w(2) = \\lambda\\, w(1), \\quad w(3) = \\lambda^{2} w(1), \\quad \\ldots, \\quad w(i) = \\lambda^{i-1} w(1) \\]
      <p>Because the weights are a decision, not a measurement, they must be forced to sum to 1 over the whole window of \\(n\\) observations so they still form a valid probability distribution:</p>
      \\[ \\sum_{i=1}^{n} w(i) = w(1)\\sum_{i=1}^{n} \\lambda^{i-1} = w(1)\\left(\\dfrac{1-\\lambda^{n}}{1-\\lambda}\\right) = 1 \\]
      <p>Solving for \\(w(1)\\) gives \\(w(1) = \\dfrac{1-\\lambda}{1-\\lambda^{n}}\\), and substituting back into \\(w(i)=\\lambda^{i-1}w(1)\\) gives the general formula for the weight on any observation \\(i\\) days old: \\(w(i) = \\dfrac{\\lambda^{i-1}(1-\\lambda)}{1-\\lambda^{n}}\\). Setting \\(\\lambda = 1\\) in this construction collapses every weight back to \\(1/n\\); plain equal-weighted historical simulation is nested inside age-weighted HS as the no-decay limit.</p>`
    },
    {
      name: "Volatility-weighted return adjustment",
      math: "r^{*}_{t} = \\dfrac{\\sigma_{T}}{\\sigma_{t}} \\times r_{t}",
      note: "\\(\\sigma_T\\) = current (GARCH/EWMA) forecast, \\(\\sigma_t\\) = vol on the day the return occurred. The data changes; the VaR procedure doesn't.",
      plain: "Rescale a historical return by the ratio of today's forecast volatility to the volatility that actually prevailed on the day that return happened, so every return gets re-expressed in today's units before ordinary historical simulation runs on the adjusted numbers.",
      derivation: `<p>Take a historical return \\(r_{t}\\) observed on day \\(t\\), when the prevailing (GARCH- or EWMA-estimated) volatility was \\(\\sigma_{t}\\). Hull and White's insight is that the "shock size in standard-deviation units" is the economically meaningful, regime-independent quantity, not the raw percentage return:</p>
      \\[ z_{t} = \\dfrac{r_{t}}{\\sigma_{t}} \\]
      <p>To translate that same standardized shock into what it would look like if it happened today, under today's forecast volatility \\(\\sigma_{T}\\), multiply back by \\(\\sigma_{T}\\):</p>
      \\[ r^{*}_{t} = z_{t}\\,\\sigma_{T} = \\dfrac{\\sigma_{T}}{\\sigma_{t}}\\, r_{t} \\]
      <p>If today is calmer than day \\(t\\) was (\\(\\sigma_{T} < \\sigma_{t}\\)), the ratio is below 1 and the historical return is shrunk toward zero before it enters the VaR calculation. If today is more volatile (\\(\\sigma_{T} > \\sigma_{t}\\)), the ratio exceeds 1 and the historical return is amplified. Every historical return in the window gets rescaled this way, and then the entire adjusted data set is fed into the exact same plain-HS ranking-and-quantile procedure from Reading 1. Nothing about the VaR calculation step itself changes.</p>`
    }
  ],

  concepts: [
    {
      name: "Bootstrap historical simulation",
      def: "Resample the original data with replacement, compute VaR/ES on each resample, repeat many times, and average the estimates.",
      intuition: "It's like polling: instead of trusting one sample of 1,000 voters, you draw thousands of resamples from that same pool and average. You get a more stable estimate with no new data collected.",
      example: "Averaging 5,000 resampled VaRs smooths out the sampling noise a single sorted-list pass inherits from whichever observations happened to land near the quantile.",
      pitfall: "Bootstrapping improves precision (lower variance of the estimate). It does NOT fix stale data, regime changes, or unseen tails.",
      related: [{ r: 1, label: "R1: SE of quantile estimators (what bootstrapping shrinks)" }],
      memory: "Bootstrap = 'ask the same crowd a thousand times.'"
    },
    {
      name: "Non-parametric density estimation",
      def: "Connect the midpoints of adjacent histogram bars to smooth the empirical distribution, redistributing area between bars without losing total probability mass.",
      intuition: "With 100 observations you can only read VaR at 1%, 2%, 3%, and so on. Smoothing draws a continuous curve through the histogram so 95.5% (or any level) becomes readable.",
      pitfall: "The smoothing invents nothing new about the tails. It interpolates between observed points and can't extrapolate beyond the worst observation.",
      related: ["Historical simulation VaR"]
    },
    {
      name: "Age-weighted (hybrid) HS",
      def: "Weight observation i by \\(w(i) = \\lambda^{i-1}(1-\\lambda)/(1-\\lambda^{n})\\): geometric decay with age, normalized to sum to one.",
      intuition: "Yesterday matters more than last year. \\(\\lambda\\) is the memory dial: 0.98 gives roughly a few months of effective memory, 0.999 is nearly plain HS.",
      example: "\\(\\lambda\\)→1 recovers equal-weighted HS exactly. When \\(\\lambda\\) is small, only the last handful of days matter and VaR becomes hyper-reactive.",
      pitfall: "A small change in \\(\\lambda\\) can dramatically change VaR's reactivity. The extreme cases \\((\\lambda\\)→1, \\(\\lambda\\)→0) are the tested edges.",
      related: ["EWMA (Part I)", "Ghost effects"],
      memory: "\\(\\lambda\\) = 'loyalty to the past.' High \\(\\lambda\\), long loyalty."
    },
    {
      name: "Volatility-weighted HS (Hull-White)",
      def: "Rescale each historical return by \\(\\sigma_current/\\sigma_then\\) before running standard historical simulation on the adjusted returns.",
      intuition: "Translate every historical day into today's volatility units. A −3% day during a panic (vol 40%) becomes a smaller shock in today's calm (vol 15%), and vice versa.",
      pitfall: "The tested distinction: the historic RETURNS are adjusted, the VaR CALCULATION PROCEDURE is unchanged. The data changes, not the method. Exams offer 'the method changes' as a distractor.",
      related: [{ r: 1, label: "R1: plain HS this improves" }, "GARCH / EWMA forecasting"]
    },
    {
      name: "Correlation-weighted HS",
      def: "Extend volatility weighting to the full variance-covariance matrix: update diagonal (variances) AND off-diagonal (covariances) to current conditions.",
      intuition: "If today's crisis has correlations at 0.9 but your window averaged 0.5, the window understates joint moves. This fix restates history's co-movements in today's terms.",
      pitfall: "Strictly more general than volatility weighting; vol weighting is the diagonal-only special case. The exam asks which is broader.",
      related: [{ r: 7, label: "R7: why correlation shifts matter so much" }, { r: 8, label: "R8: evidence correlations move with regimes" }]
    },
    {
      name: "Filtered historical simulation (FHS)",
      def: "Standardize returns by conditional (GARCH-type) volatility, bootstrap the standardized residuals, then rescale by current volatility forecasts to simulate P&L paths.",
      intuition: "Disassemble history into pure shocks, shuffle them, reassemble in today's volatility clothing. Captures volatility clustering and asymmetric shocks.",
      example: "Because bootstrapped shocks recombine freely, FHS can produce losses OUTSIDE the historical range. It's the only HS variant that can.",
      pitfall: "'HS can never exceed the historical maximum loss' is true for PLAIN HS, mostly false for FHS. The exam tests this exact nuance.",
      related: ["Bootstrap", "Volatility-weighted HS", { r: 3, label: "R3: EVT, the other route past the historical maximum" }],
      memory: "FHS = Full House Special, every upgrade combined."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "Inherits historical simulation and its two structural weaknesses; everything here is a patch on R1." }
    ],
    to: [
      { r: 3, why: "Even weighted HS is calibrated to the bulk of the data. EVT handles the tail that history hasn't shown you." },
      { r: 4, why: "Whichever variant you choose, backtesting decides whether it actually works." },
      { r: 8, why: "Correlation-weighting anticipates R8's evidence that correlation itself moves with regimes." }
    ],
    confused: [
      { what: "Volatility-weighting vs GARCH VaR", how: "Vol-weighted HS uses a GARCH forecast to rescale inputs but stays non-parametric; a GARCH VaR model is fully parametric. One fixes the input, the other swaps the model." },
      { what: "Bootstrapping vs FHS", how: "Bootstrap resamples raw returns for precision. FHS bootstraps standardized residuals and re-scales them. Bootstrap is just one ingredient inside FHS." },
      { what: "Age-weighting vs EWMA volatility", how: "Same geometric-decay idea applied to different objects. Age-weighting decays observation weights in the VaR ranking; EWMA decays weights in a volatility estimate." }
    ]
  },

  misconceptions: [
    { wrong: "\"Volatility-weighted HS changes the VaR calculation method.\"", right: "It changes the INPUT DATA only. Returns are rescaled by \\(\\sigma_now/\\sigma_then\\), then plain HS runs unchanged. This precise wording has been tested." },
    { wrong: "\"No historical-simulation method can produce a loss bigger than the worst day in the window.\"", right: "True for plain HS, false for filtered HS, whose recombined standardized shocks can generate losses outside the historical range." },
    { wrong: "\"Age-weighting fixes fat tails.\"", right: "Age-weighting fixes staleness and ghost effects. Tails beyond the sample remain invisible; that's EVT's job (R3)." },
    { wrong: "\"Bootstrapping adds information.\"", right: "It reuses the same data to reduce estimator variance. Precision improves, but bias from an unrepresentative window remains fully intact." },
    { wrong: "\"Quiet historical window means conservative VaR.\"", right: "Backwards. A quiet window UNDERSTATES risk; a volatile window overstates it. HS inherits whatever regime the window contains." }
  ],

  highYield: [
    { stars: 5, what: "The four weighting approaches and exactly which flaw each one fixes.", why: "GARP's favorite format here is matching the method to the weakness: ghost effects to age, regime mismatch to volatility, co-movement staleness to correlation, everything plus clustering to FHS." },
    { stars: 4, what: "\\(\\lambda\\) extreme cases: \\(\\lambda\\)→1 = plain HS; \\(\\lambda\\)→0 = only-recent-data.", why: "Boundary-value questions are the standard trap format in this reading." },
    { stars: 4, what: "'Data adjusted, procedure unchanged' for Hull-White vol weighting.", why: "A verbatim tested distinction." },
    { stars: 3, what: "Advantages/disadvantages table of non-parametric methods.", why: "Conceptual multiple-choice fodder: no distribution assumed, handles skew, but window-dependent and understated after quiet periods." },
    { stars: 3, what: "FHS can exceed the historical maximum loss.", why: "The one HS variant that escapes the sample's boundary, a precise true/false discriminator." }
  ],

  recall: [
    { q: "What exactly is a ghost effect, and which fix addresses it?", a: "A large observation dominates VaR for exactly n days, then drops out of the window overnight with no market cause, so VaR jumps for administrative reasons. Age-weighting fixes it: weights fade geometrically instead of falling off a cliff." },
    { q: "Set \\(\\lambda\\) = 0.999 with n = 250. What does your age-weighted VaR approximately equal?", a: "Nearly plain equal-weighted HS. As \\(\\lambda\\)→1 the geometric weights flatten toward 1/n." },
    { q: "Current vol forecast is 12%; a −4% return occurred when vol was 30%. What return enters vol-weighted HS?", a: "−4% × (12/30) = −1.6%. Then ordinary HS runs on the adjusted returns." },
    { q: "Why can FHS produce losses beyond the historical maximum while plain HS cannot?", a: "Plain HS can only replay observed returns. FHS bootstraps standardized residuals and rescales them by current conditional vol, so shocks recombine into configurations never observed, including worse ones." },
    { q: "Your window covers only the calm 2017-2019 period. What sign of error should you expect in plain HS VaR, and why doesn't bootstrapping help?", a: "Understated VaR, because the window lacks stress observations. Bootstrapping resamples the same calm data, so it reduces variance, not window bias." }
  ],

  hooks: [
    { title: "The committee", text: "Plain HS: equal votes, abrupt expulsions. Age-weighting: seniority in reverse. Vol-weighting: testimony translated into today's units. Correlation-weighting: the committee's group dynamics restated. FHS: dissolve the committee into pure shocks and re-poll." },
    { title: "Ghost story", text: "A crash observation haunts your VaR for exactly n days, then vanishes at midnight. That's the ghost effect. Age weights are the exorcism: spirits fade gradually instead of disappearing on schedule." },
    { title: "λ dial", text: "One dial, two extremes. \\(\\lambda\\)→1 is plain HS (long loyal memory), \\(\\lambda\\)→0 is goldfish memory (yesterday only). Every age-weighting question sits somewhere on this dial." }
  ],

  summary: `<p>Plain HS has two flaws: equal weights (leading to ghost effects and regime blindness) and discrete confidence levels. The fixes are <strong>bootstrap</strong> (precision by resampling), <strong>density smoothing</strong> (any confidence level), <strong>age-weighted</strong> \\(w(i)=\\lambda^{i-1}(1-\\lambda)/(1-\\lambda^{n})\\) (fading memory; \\(\\lambda\\)→1 = plain HS), <strong>volatility-weighted</strong> \\(r^{*}=(\\sigma_{T}/\\sigma_{t})\\,r\\) (data adjusted, method unchanged), <strong>correlation-weighted</strong> (full covariance matrix updated, strictly broader), and <strong>FHS</strong> (GARCH-standardize, bootstrap, rescale; captures clustering; can exceed historical max loss). Non-parametric strengths: no distribution assumption, skew and fat tails handled naturally. Weaknesses: hostage to the window. A quiet window understates risk, a wild window overstates it.</p>`,

  breakdown: [
    {
      title: "The four weighting improvements to plain historical simulation, and the flaw each one targets",
      points: [
        "Age-weighted (hybrid): weight decays geometrically with age, \\(w(i)=\\lambda^{i-1}(1-\\lambda)/(1-\\lambda^{n})\\). Fixes ghost effects and staleness by letting influence fade gradually instead of vanishing at the n-th day cliff.",
        "Volatility-weighted (Hull-White): rescale each historical return by \\((\\sigma_{T}/\\sigma_{t})\\). Fixes regime mismatch, so a return from a calm (or volatile) historical day is restated in today's volatility terms; the calculation procedure itself is unchanged, only the input data is.",
        "Correlation-weighted: update the entire variance-covariance matrix (both diagonal variances and off-diagonal covariances) to current conditions. Fixes stale co-movement assumptions and is strictly more general than volatility-weighting, which only updates the diagonal.",
        "Filtered historical simulation (FHS): standardize returns by conditional (GARCH-type) volatility, bootstrap the standardized residuals, then rescale by today's volatility forecast. Fixes volatility clustering and asymmetric shocks, and is the only variant that can produce losses outside the historical range."
      ]
    },
    {
      title: "Advantages and disadvantages of non-parametric methods (Reading's LO 2.d table)",
      points: [
        "Advantage: intuitive and computationally simple, even on a spreadsheet, with no distributional assumption required.",
        "Advantage: handles skewness and fat tails naturally, without any adjustment for non-normality.",
        "Advantage: avoids estimating a full variance-covariance matrix, so there is no dimensionality problem as the number of assets grows.",
        "Advantage: methods can be combined, for example age-weighting plus volatility-weighting together.",
        "Disadvantage: entirely dependent on the historical window chosen; there is no way to see beyond what that window contains.",
        "Disadvantage: a volatile historical period causes VaR/ES to be overstated relative to current conditions.",
        "Disadvantage: a quiet historical period causes VaR/ES to be understated relative to current conditions.",
        "Disadvantage: structural shifts and regime changes in the data are difficult to detect from the historical window alone.",
        "Disadvantage: losses larger than the historical maximum are hard to capture (true for plain HS, less true for volatility-weighted and filtered HS)."
      ]
    }
  ],

  quiz: [
    {
      q: "A single large loss observation dominates a bank's 250-day historical simulation VaR, then vanishes overnight from the calculation once it falls outside the 250-day window, even though nothing in market conditions changed that day. This phenomenon is called:",
      options: ["A regime shift", "The ghost effect", "Volatility clustering", "A structural break"],
      answer: 1,
      why: "This is the textbook definition of the ghost effect. Plain HS gives every observation in the window equal weight and observations outside it zero weight, so a single extreme day dominates VaR for exactly n days and then disappears for purely administrative, not market, reasons. Regime shifts and structural breaks describe genuine changes in market behavior, and volatility clustering describes calm and turbulent periods grouping together; none of those describe an artifact of window mechanics."
    },
    {
      q: "Which single weighting scheme is specifically designed to fix the ghost effect described above?",
      options: ["Volatility-weighted HS", "Correlation-weighted HS", "Age-weighted (hybrid) HS", "Filtered historical simulation only"],
      answer: 2,
      why: "Age-weighting replaces the equal-weight/zero-weight cliff with geometric decay, so an observation's influence fades gradually as it ages instead of falling off a cliff on day n, directly targeting the ghost effect. Volatility- and correlation-weighting target regime and co-movement mismatch, not staleness, and while FHS also decays influence via bootstrapping standardized shocks, it isn't the scheme purpose-built for this specific flaw."
    },
    {
      q: "A risk manager applies Hull-White volatility-weighted historical simulation. Today's GARCH volatility forecast is 12%, and a historical −4% return occurred on a day when the prevailing volatility was 30%. What adjusted return enters the VaR calculation, and what happens to the VaR procedure itself?",
      options: [
        "The adjusted return is −10%, and the VaR calculation method changes to a parametric one",
        "The adjusted return is −1.6%, and the ordinary historical simulation procedure is applied unchanged to the adjusted data",
        "The adjusted return is −4%, unchanged, because volatility-weighting only affects future forecasts",
        "The adjusted return is −1.6%, but a new GARCH-based VaR formula must replace the historical simulation ranking step"
      ],
      answer: 1,
      why: "r* = (σ_T/σ_t) × r = (12/30) × (−4%) = −1.6%. GARP's exact tested distinction is that only the input data is rescaled; the VaR calculation procedure (sort the adjusted returns and read off the quantile, exactly as in plain HS) is unchanged. Inverting the ratio to get −10% and claiming a method change misreads the formula both ways, claiming a new GARCH-based formula replaces the ranking step wrongly assumes the ranking step gets replaced, and leaving the return at −4% ignores that the adjustment applies to historical, not future, data."
    },
    {
      q: "Which statement correctly distinguishes correlation-weighted HS from volatility-weighted HS?",
      options: [
        "Correlation-weighted HS updates only the off-diagonal covariance terms, leaving variances at their historical values",
        "Volatility-weighted HS is strictly more general because it updates the full covariance matrix",
        "Correlation-weighted HS updates both the diagonal (variances) and off-diagonal (covariances) elements of the variance-covariance matrix, making it strictly more general than volatility-weighting, which updates only the diagonal",
        "The two methods are mathematically identical, differing only in terminology"
      ],
      answer: 2,
      why: "Correlation-weighting extends volatility-weighting's logic to the full variance-covariance matrix: it updates variances (the diagonal, same as volatility-weighting) AND covariances (the off-diagonal, which volatility-weighting leaves untouched). That makes it the broader method. Claiming it updates only off-diagonal covariances gets the diagonal/off-diagonal split backwards, claiming volatility-weighted HS is the more general one reverses which method is broader, and calling the two methods mathematically identical wrongly claims equivalence."
    },
    {
      q: "Which statement about filtered historical simulation (FHS) is TRUE?",
      options: [
        "Like plain HS, FHS can never produce a simulated loss larger than the worst loss actually observed in the historical window",
        "FHS can produce simulated losses outside the historical range, because bootstrapped standardized shocks are rescaled by current volatility and can recombine into configurations never observed historically",
        "FHS is a fully parametric method because it relies on a GARCH volatility model",
        "FHS is identical to age-weighted HS but adds a volatility filter on top"
      ],
      answer: 1,
      why: "FHS standardizes returns by conditional (GARCH) volatility, bootstraps those standardized residuals, and rescales by today's volatility forecast. Because the bootstrapped shocks can combine freely, the resulting losses can exceed anything in the historical sample, unlike plain HS, which is bounded by the worst observed day. It stays non-parametric (it uses the empirical distribution of standardized shocks, not an assumed parametric loss distribution) despite using a GARCH volatility model as an input, so calling it fully parametric is wrong; it also isn't the same construction as age-weighted HS, so describing it as age-weighted HS plus a volatility filter is wrong too."
    },
    {
      q: "A trading desk restricts its historical simulation window to the unusually calm three-year period from 2017 to 2019, then applies bootstrapping to improve precision. What is the most likely consequence, and does bootstrapping fix it?",
      options: [
        "VaR/ES will be overstated because bootstrapping amplifies extreme resamples, and this is a real bias bootstrapping cannot fix",
        "VaR/ES will be understated because the window lacks stress observations, and bootstrapping does not fix this — it only reduces the variance of the estimate, not the bias from an unrepresentative window",
        "VaR/ES will be accurate because bootstrapping introduces new information by resampling with replacement",
        "VaR/ES will be understated, but bootstrapping fully corrects it by simulating stress scenarios the window never contained"
      ],
      answer: 1,
      why: "A quiet historical window understates VaR/ES relative to true current risk. That's the core non-parametric disadvantage. Bootstrapping resamples with replacement from the same calm data set, which lowers the variance (improves precision) of the estimate, but it reuses the exact same data, so it cannot introduce the stress observations the window never captured. Claiming the result is overstated because bootstrapping amplifies extreme resamples gets the direction of bias backwards, claiming it's accurate because bootstrapping introduces new information is wrong on its face, and claiming bootstrapping fully corrects the understatement wrongly assumes it can conjure scenarios absent from the data."
    }
  ],

  sources: [
    { title: "Historical simulation approach to VaR — Wikipedia", url: "https://en.wikipedia.org/wiki/Historical_simulation_(finance)", note: "Background on the historical simulation family this reading's weighting schemes all modify." },
    { title: "GARCH model — Wikipedia", url: "https://en.wikipedia.org/wiki/Autoregressive_conditional_heteroskedasticity", note: "The conditional volatility model underlying volatility-weighted and filtered historical simulation's rescaling step." },
    { title: "Value at Risk — Investopedia", url: "https://www.investopedia.com/terms/v/var.asp", note: "Plain-language refresher on VaR mechanics before layering on the non-parametric weighting variants." },
    { title: "Bootstrapping (statistics) — Wikipedia", url: "https://en.wikipedia.org/wiki/Bootstrapping_(statistics)", note: "The resampling-with-replacement technique behind bootstrap HS and the residual-resampling step inside FHS." }
  ],

  pdf: { book: 1, query: "Reading 1 gave you two extremes" }
});
