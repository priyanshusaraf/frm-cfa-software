FRM.register({
  book: 1, reading: 2,
  session: "Risk Measurement",
  title: "Non-Parametric Approaches",
  tagline: "Historical simulation, upgraded: keep the 'let the data speak' philosophy but stop treating a 3-year-old observation like yesterday's news.",

  teaches: `<p>Reading 1 left you with two extremes: assume nothing (historical simulation) or assume everything (a full parametric distribution). This reading builds the middle ground — four upgrades that keep HS's assumption-free character while fixing its two structural flaws: (1) every observation in the window gets equal weight regardless of age or regime, and (2) you can only read VaR at confidence levels your data happens to support.</p>
  <p>You learn <strong>bootstrapping</strong> (precision through resampling), <strong>density smoothing</strong> (VaR at any confidence level), and the four <strong>weighting schemes</strong>: age-weighted, volatility-weighted, correlation-weighted, and filtered historical simulation.</p>`,

  why: `<p>Plain HS has a failure mode called the <strong>ghost effect</strong>: a single crash day dominates VaR for exactly n days, then vanishes overnight the moment it rolls out of the window — even though nothing changed in the market that day. Risk numbers that jump for administrative reasons destroy credibility with traders and regulators alike. The weighting schemes exist to make HS's memory fade gradually and to make its inputs reflect today's volatility regime, not an average of stale ones.</p>`,

  intuition: `<p>Think of your historical window as a committee voting on today's risk. Plain HS gives every member an equal vote — including the member who joined 4 years ago in a different regime — then expels members abruptly on their n-th day. The fixes are all re-weightings of the committee:</p>
  <p><strong>Age-weighting</strong>: recent members get louder votes, fading geometrically \\((\\lambda )\\). <strong>Volatility-weighting</strong>: every member's testimony is restated in today's units — 'that return happened when vol was 2×, so scale it down.' <strong>Correlation-weighting</strong>: same restatement, applied to how assets co-move, not just how much each moves. <strong>Filtered HS</strong>: the full treatment — strip each return down to its standardized shock, bootstrap the shocks, re-dress them in today's (GARCH-forecast) volatility. Only FHS can generate losses worse than anything in the historical record, because recombined shocks can land in configurations history never produced.</p>`,

  visual: `<div class="widget" data-widget="decay"></div>`,

  formulas: [
    { name: "Age-weighted (hybrid) observation weight", math: "w(i) = \\lambda^{i-1}(1-\\lambda ) / (1-\\lambda^{n})", note: "i = age in days (i=1 is yesterday). \\(\\lambda\\)→1 recovers equal weights (plain HS); small \\(\\lambda\\) = fast decay, reactive VaR." },
    { name: "Volatility-weighted return adjustment", math: "r*_{t} = (\\sigma_{T} / \\sigma_{t}) \\times r_{t}", note: "\\(\\sigma_T\\) = current (GARCH/EWMA) forecast, \\(\\sigma_t\\) = vol on the day the return occurred. Data changes, VaR procedure unchanged." }
  ],

  concepts: [
    {
      name: "Bootstrap historical simulation",
      def: "Resample the original data with replacement, compute VaR/ES on each resample, repeat many times, and average the estimates.",
      intuition: "Polling analogy: instead of trusting one sample of 1,000 voters, draw thousands of resamples from that same pool and average — a more stable estimate with no new data collected.",
      example: "Averaging 5,000 resampled VaRs smooths out the sampling noise a single sorted-list pass inherits from whichever observations happened to land near the quantile.",
      pitfall: "Bootstrapping improves precision (lower variance of the estimate); it does NOT fix stale data, regime changes, or unseen tails.",
      related: [{ r: 1, label: "R1 — SE of quantile estimators (what bootstrapping shrinks)" }],
      memory: "Bootstrap = 'ask the same crowd a thousand times.'"
    },
    {
      name: "Non-parametric density estimation",
      def: "Connect the midpoints of adjacent histogram bars to smooth the empirical distribution, redistributing area between bars without losing total probability mass.",
      intuition: "With 100 observations you can only read VaR at 1%, 2%, 3%… Smoothing draws a continuous curve through the histogram so 95.5% (or any level) becomes readable.",
      pitfall: "The smoothing invents nothing new about the tails — it interpolates between observed points; it can't extrapolate beyond the worst observation.",
      related: ["Historical simulation VaR"]
    },
    {
      name: "Age-weighted (hybrid) HS",
      def: "Weight observation i by \\(\\lambda^{i- 1}(1- \\lambda )/(1- \\lambda\\)ⁿ): geometric decay with age, normalized to sum to one.",
      intuition: "Yesterday matters more than last year. \\(\\lambda\\) is the memory dial: 0.98 ≈ a few months of effective memory; 0.999 ≈ nearly plain HS.",
      example: "\\(\\lambda\\)→1: recovers equal-weighted HS exactly. \\(\\lambda\\) small: only the last handful of days matter — VaR becomes hyper-reactive.",
      pitfall: "A small change in \\(\\lambda\\) can dramatically change VaR's reactivity — the extreme cases \\((\\lambda\\)→1, \\(\\lambda\\)→0) are the tested edges.",
      related: ["EWMA (Part I)", "Ghost effects"],
      memory: "\\(\\lambda\\) = 'loyalty to the past.' High \\(\\lambda\\), long loyalty."
    },
    {
      name: "Volatility-weighted HS (Hull-White)",
      def: "Rescale each historical return by \\(\\sigma_current/\\sigma_then\\) before running standard historical simulation on the adjusted returns.",
      intuition: "Translate every historical day into today's volatility units. A −3% day during a panic (vol 40%) becomes a smaller shock in today's calm (vol 15%) — and vice versa.",
      pitfall: "THE tested distinction: the historic RETURNS are adjusted; the VaR CALCULATION PROCEDURE is unchanged. 'The data changes, not the method.' Exams offer 'the method changes' as a distractor.",
      related: [{ r: 1, label: "R1 — plain HS this improves" }, "GARCH / EWMA forecasting"]
    },
    {
      name: "Correlation-weighted HS",
      def: "Extend volatility weighting to the full variance-covariance matrix: update diagonal (variances) AND off-diagonal (covariances) to current conditions.",
      intuition: "If today's crisis has correlations at 0.9 but your window averaged 0.5, the window understates joint moves. This fix restates history's co-movements in today's terms.",
      pitfall: "Strictly more general than volatility weighting — vol weighting is the diagonal-only special case. Exam asks which is broader.",
      related: [{ r: 7, label: "R7 — why correlation shifts matter so much" }, { r: 8, label: "R8 — evidence correlations move with regimes" }]
    },
    {
      name: "Filtered historical simulation (FHS)",
      def: "Standardize returns by conditional (GARCH-type) volatility, bootstrap the standardized residuals, then rescale by current volatility forecasts to simulate P&L paths.",
      intuition: "Disassemble history into pure shocks, shuffle, reassemble in today's volatility clothing. Captures volatility clustering and asymmetric shocks.",
      example: "Because bootstrapped shocks recombine freely, FHS can produce losses OUTSIDE the historical range — the only HS variant that can.",
      pitfall: "'HS can never exceed the historical maximum loss' is true for PLAIN HS, mostly false for FHS. The exam tests this exact nuance.",
      related: ["Bootstrap", "Volatility-weighted HS", { r: 3, label: "R3 — EVT, the other route past the historical maximum" }],
      memory: "FHS = Full House Special — every upgrade combined."
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
      { what: "Volatility-weighting vs GARCH VaR", how: "Vol-weighted HS uses a GARCH forecast to rescale inputs but stays non-parametric; a GARCH VaR model is fully parametric. Input-fix vs model-swap." },
      { what: "Bootstrapping vs FHS", how: "Bootstrap resamples raw returns for precision; FHS bootstraps standardized residuals and re-scales — bootstrap is one ingredient inside FHS." },
      { what: "Age-weighting vs EWMA volatility", how: "Same geometric-decay idea applied to different objects: age-weighting decays observation weights in the VaR ranking; EWMA decays weights in a volatility estimate." }
    ]
  },

  misconceptions: [
    { wrong: "\"Volatility-weighted HS changes the VaR calculation method.\"", right: "It changes the INPUT DATA only — returns are rescaled by \\(\\sigma_now/\\sigma_then\\), then plain HS runs unchanged. This precise wording has been tested." },
    { wrong: "\"No historical-simulation method can produce a loss bigger than the worst day in the window.\"", right: "True for plain HS; false for filtered HS, whose recombined standardized shocks can generate losses outside the historical range." },
    { wrong: "\"Age-weighting fixes fat tails.\"", right: "Age-weighting fixes staleness and ghost effects. Tails beyond the sample remain invisible — that's EVT's job (R3)." },
    { wrong: "\"Bootstrapping adds information.\"", right: "It reuses the same data to reduce estimator variance. Precision improves; bias from an unrepresentative window remains fully intact." },
    { wrong: "\"Quiet historical window → conservative VaR.\"", right: "Backwards: a quiet window UNDERSTATES risk; a volatile window overstates it. HS inherits whatever regime the window contains." }
  ],

  highYield: [
    { stars: 5, what: "The four weighting approaches and exactly which flaw each one fixes.", why: "GARP's favorite format here: match the method to the weakness (ghost effects → age; regime mismatch → volatility; co-movement staleness → correlation; all + clustering → FHS)." },
    { stars: 4, what: "\\(\\lambda\\) extreme cases: \\(\\lambda\\)→1 = plain HS; \\(\\lambda\\)→0 = only-recent-data.", why: "Boundary-value questions are the standard trap format in this reading." },
    { stars: 4, what: "'Data adjusted, procedure unchanged' for Hull-White vol weighting.", why: "A verbatim tested distinction." },
    { stars: 3, what: "Advantages/disadvantages table of non-parametric methods.", why: "Conceptual multiple-choice fodder: no distribution assumed, handles skew; but window-dependent, understates after quiet periods." },
    { stars: 3, what: "FHS can exceed the historical maximum loss.", why: "The one HS variant that escapes the sample's boundary — a precise true/false discriminator." }
  ],

  recall: [
    { q: "What exactly is a ghost effect, and which fix addresses it?", a: "A large observation dominates VaR for exactly n days, then drops out of the window overnight with no market cause — VaR jumps for administrative reasons. Age-weighting fixes it: weights fade geometrically instead of falling off a cliff." },
    { q: "Set \\(\\lambda\\) = 0.999 with n = 250. What does your age-weighted VaR approximately equal?", a: "Nearly plain equal-weighted HS — as \\(\\lambda\\)→1 the geometric weights flatten toward 1/n." },
    { q: "Current vol forecast is 12%; a −4% return occurred when vol was 30%. What return enters vol-weighted HS?", a: "−4% × (12/30) = −1.6%. Then ordinary HS runs on adjusted returns." },
    { q: "Why can FHS produce losses beyond the historical maximum while plain HS cannot?", a: "Plain HS can only replay observed returns. FHS bootstraps standardized residuals and rescales them by current conditional vol — shocks recombine into configurations never observed, including worse ones." },
    { q: "Your window covers only the calm 2017-2019 period. What sign of error should you expect in plain HS VaR, and why doesn't bootstrapping help?", a: "Understated VaR — the window lacks stress observations. Bootstrapping resamples the same calm data; it reduces variance, not window bias." }
  ],

  hooks: [
    { title: "The committee", text: "Plain HS: equal votes, abrupt expulsions. Age-weighting: seniority in reverse. Vol-weighting: testimony translated into today's units. Correlation-weighting: the committee's group dynamics restated. FHS: dissolve the committee into pure shocks and re-poll." },
    { title: "Ghost story", text: "A crash observation haunts your VaR for exactly n days, then vanishes at midnight — that's the 'ghost effect.' Age weights are the exorcism: spirits fade gradually instead of disappearing on schedule." },
    { title: "λ dial", text: "One dial, two extremes: \\(\\lambda\\)→1 is plain HS (long loyal memory), \\(\\lambda\\)→0 is goldfish memory (yesterday only). Every age-weighting question is somewhere on this dial." }
  ],

  summary: `<p>Plain HS has two flaws: equal weights (→ ghost effects, regime blindness) and discrete confidence levels. Fixes: <strong>bootstrap</strong> (precision by resampling), <strong>density smoothing</strong> (any confidence level), <strong>age-weighted</strong> \\(w(i)=\\lambda^{i- 1}(1- \\lambda )/(1- \\lambda\\)ⁿ) (fading memory; \\(\\lambda\\)→1 = plain HS), <strong>volatility-weighted</strong> r* = \\((\\sigma_now/\\sigma_then)r\\) (data adjusted, method unchanged), <strong>correlation-weighted</strong> (full covariance matrix updated — strictly broader), and <strong>FHS</strong> (GARCH-standardize → bootstrap → rescale; captures clustering; can exceed historical max loss). Non-parametric strengths: no distribution assumption, skew/fat-tails handled naturally. Weaknesses: hostage to the window — quiet window understates, wild window overstates.</p>`
});
