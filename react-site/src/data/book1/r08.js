export default ({
  book: 1, reading: 8,
  session: "Correlation Risk",
  title: "Empirical Properties of Correlation",
  tagline: "Correlation matters everywhere. This reading asks how it actually behaves across the business cycle, over time, and in its statistical distribution.",

  teaches: `<p>The evidence base for why later models (R9 onward) need to update correlations rather than assume they're static: correlation across business-cycle regimes, mean reversion and autocorrelation, and best-fit distributions for different correlation types.</p>
  <p>The reading is built around one landmark empirical study. Researchers took the 30 common stocks in the Dow Jones Industrial Average (Dow) and, every month from 1972 to 2017 (534 months), computed the full 30×30 pairwise correlation matrix: 900 correlations per month, so 900 × 534 = <strong>480,600</strong> monthly correlation observations in total. They sliced those observations by the state of the U.S. economy, defined using GDP growth, and separately fit statistical distributions to the correlation values themselves. Everything you need for the exam, the level/volatility split, the mean-reversion identity, the best-fit distributions, comes directly out of that one dataset. Understanding how it was built makes the results much easier to remember than if you just tried to memorize them as isolated facts.</p>`,

  why: `<p>If correlation were constant, one estimate would do forever. It isn't. This reading supplies the empirical facts that justify every "correlation needs updating" argument in the curriculum, from volatility-weighted historical simulation (R2) to copula recalibration (R9) to the liquidity spiral (R63-64).</p>
  <p>Put yourself in the seat of a risk manager who has just computed a correlation matrix for a trading book (for VaR, for a correlation swap, for pricing a basket option). The number you get today is a point estimate of something that systematically shifts with the business cycle, mean-reverts over time in a mathematically predictable way, and is <em>not</em> normally distributed, so confidence intervals built assuming normality will misstate your risk. This reading is the empirical justification for treating "the correlation" as a moving, imperfectly normal target rather than a fixed input.</p>`,

  intuition: `<p>The single most counter-intuitive, heavily tested result here: correlation LEVEL is highest in recessions (crashes move everything together), but correlation VOLATILITY, how much correlation itself jumps around from month to month, is highest in NORMAL times, not recessions. The full three-state picture from the Dow study: correlation <strong>level</strong> was 37.0% in recessions, 33.0% in normal periods, and only 27.5% in expansions. Stocks move together most when they're falling together, and least when each company's own story (earnings, industry trends) is what's driving its price. Correlation <strong>volatility</strong>, by contrast, was 80.5% in recessions, <strong>83.0%</strong> in normal periods, and just 71.2% in expansions.</p>
  <p>Why does volatility peak in the "boring" middle state rather than the dramatic one? During a recession or an expansion, direction is at least broadly expected. Everyone agrees stocks should be falling (recession) or rising (expansion), so the correlation estimate sits high (or moderately low) and stays relatively stable there. In normal times nobody agrees on where the market is headed next: some data point to acceleration, some to a slowdown. So the correlation estimate itself swings around more from month to month, even though its average level is lower. That's why the "obvious" answer choice on the exam, that correlation and correlation volatility are both highest in recessions, is a trap. Level and volatility are two different statistics that peak in two different regimes.</p>`,

  formulas: [
    {
      name: "Mean reversion rate (deterministic form)",
      math: "S_t - S_{t-1} = a(\\mu - S_{t-1})",
      note: "The stochastic (random-shock) term of the full mean-reversion process is dropped for this LO; only the deterministic pull back toward the mean matters here.",
      plain: "The expected change in a variable from one period to the next equals the mean reversion rate a multiplied by how far the variable currently sits below (or above) its long-run mean μ.",
      derivation: `<p>The full continuous-time mean-reversion process (the type used later for interest rates, e.g. Vasicek/CIR in R13–R14) has the form \\( dS_t = a(\\mu - S_{t-1})\\,dt + \\text{(stochastic term)} \\). For this reading's purpose, estimating the mean reversion rate empirically, the stochastic term is dropped and \\( \\Delta t = 1 \\) is assumed, leaving:</p>
      <p>\\[ S_t - S_{t-1} = a(\\mu - S_{t-1}) \\]</p>
      <p>Distributing \\(a\\) on the right-hand side:</p>
      <p>\\[ S_t - S_{t-1} = a\\mu - aS_{t-1} \\]</p>
      <p>This is exactly a standard linear regression equation \\( Y = \\alpha + \\beta X \\), with \\(Y = S_t - S_{t-1}\\), \\(X = S_{t-1}\\), intercept \\(\\alpha = a\\mu\\), and slope \\(\\beta = -a\\). Regressing the period-over-period change against the prior level therefore hands you the mean reversion rate directly: \\(a = -\\beta\\).</p>`
    },
    { name: "Mean reversion rate + 1-period autocorrelation identity", math: "a + \\text{AC}(\\rho_t, \\rho_{t-1}) = 1", note: "Know one and you get the other for free, no separate calculation needed. This holds because mean reversion (pull away from the current value, back toward the long-run mean) and autocorrelation (persistence, i.e. pull toward the recent past value) are complementary tendencies of the same series.", plain: "The mean reversion rate and the one-period autocorrelation of a series always sum to exactly 1 (100%)." },
    { name: "Estimating mean reversion via regression", math: "\\text{regress } (S_t - S_{t-1}) \\text{ on } S_{t-1}; \\quad \\beta = -a", note: "Larger a (faster reversion) → deviations from the long-run mean die out quickly. In the Dow study, the fitted regression was \\(Y = 0.256 - 0.7903X\\), so \\(a = 0.7903\\), i.e. a 79.03% mean reversion rate for equity correlation.", plain: "Run Y = (this period's value minus last period's value) against X = last period's value; the negative of the resulting slope coefficient is the mean reversion rate." }
  ],

  concepts: [
    {
      name: "Correlation level vs correlation volatility across regimes",
      def: "Correlation LEVEL peaks in recessions (37.0%), is middling in normal periods (33.0%), and is lowest in expansions (27.5%). Correlation VOLATILITY peaks in NORMAL periods (83.0%), is nearly as high in recessions (80.5%), and is lowest in expansions (71.2%).",
      intuition: "In a recession, common stocks tend to crash together, driven by shared macroeconomic shocks (falling demand, credit tightening, rising unemployment) rather than company-specific news, so correlation sits high. In an expansion, valuations are driven more by industry- and company-specific information, so stocks move more independently and correlation is lowest. Volatility of correlation is a different question. In a recession or expansion, the market's overall direction is at least broadly expected by investors, so the correlation estimate is high (or low) and relatively stable month to month. In normal times, investors genuinely disagree about whether the economy is about to accelerate or slow down, so the measured correlation itself swings around more from month to month, even though its average level is lower than in a recession.",
      example: "Using the Dow 1972–2017 study's exact figures: recession gives level 37.0%, volatility 80.5%. Normal gives level 33.0%, volatility 83.0% (the peak). Expansion gives level 27.5%, volatility 71.2% (the trough for both statistics).",
      pitfall: "The single most heavily tested counter-intuitive result in this reading: don't assume 'highest in recession' applies to both level and volatility. It only applies to level. Correlation volatility is highest in NORMAL periods.",
      related: [{ r: 7, label: "R7: why correlation spikes matter for VaR and hedges" }],
      memory: "Recessions: correlation is HIGH and CALM. Normal times: correlation is LOWER but JUMPY. Expansions: correlation is LOWEST and CALMEST."
    },
    {
      name: "Mean reversion and autocorrelation",
      def: "Correlation itself mean-reverts toward a long-run average; the mean reversion rate a is estimated by regressing (S_t − S_{t-1}) on S_{t-1}, with slope = −a. Autocorrelation measures the opposite tendency, the degree to which a variable's current value is still correlated with (i.e. 'pulled toward') its own past values, and the two rates always sum to 1.",
      example: "Oct 2022 correlation 30%, long-run mean 35%, mean reversion rate 78%, so Nov 2022 expected correlation = 30% + 0.78×(35%−30%) = 33.9%. One-period autocorrelation = 1 − 0.78 = 22%, no separate calculation needed once you have one of the two. Sanity-check example from the source: if a variable sits at 50 with a long-run mean of 80, a mean reversion rate of 0 implies zero expected change; a rate of 0.5 implies an expected change of +15 (0.5 × (80−50)); a rate of 1.0 implies a full expected snap-back of +30 to the mean in one period.",
      intuition: "Mean reversion pulls a variable away from wherever it currently sits and back toward the long-run mean. Autocorrelation pulls it toward its own recent past value (persistence). A series that snaps back to its mean quickly (high mean reversion) is, by definition, not very sticky to its recent past, so it has low autocorrelation, and vice versa. In the Dow equity-correlation study, one-period autocorrelation computed directly (20.97%) matched 1 minus the regression-estimated mean reversion rate (1 − 0.7903 ≈ 20.97%) almost exactly, confirming the identity empirically. Interestingly, autocorrelation was not monotonically decreasing with lag length: the highest autocorrelation observed (26%) was actually at a 2-month lag, before decaying gradually to roughly 10% at a 10-month lag.",
      pitfall: "A high mean reversion rate means a fast snap-back to the mean, which sounds like it should imply high autocorrelation, but it's the opposite. Mean reversion plus autocorrelation equals 1, so high reversion means low autocorrelation.",
      related: ["Correlation level vs volatility across regimes"],
      memory: "Reversion and autocorrelation are two sides of a coin that must sum to 1: high one, low the other."
    },
    {
      name: "Best-fit distributions by correlation type",
      def: "Equity correlation: best fit Johnson SB (a four-parameter distribution with two shape parameters, one location parameter, and one scale parameter), high mean reversion (~79%). Bond correlation: best fit Generalized Extreme Value (normal also decent), low mean reversion (~26%). Default probability correlation: best fit Johnson SB, low mean reversion (~30%, closer to bond).",
      example: "Underlying sample sizes and averages from the source studies: equity correlation was based on the 480,600-observation Dow dataset (77% of all pairwise correlations were positive), with average correlation and volatility figures reported per economic state above. Bond correlations were studied across 7,645 observed bond-pair correlations, averaging 42% with 64% correlation volatility. Default probability correlations were studied across 4,655 observations, averaging 30% with 88% correlation volatility, the highest volatility of the three correlation types, even though its mean reversion rate (30%) is low, much closer to bonds' 26% than to equity's 79%.",
      pitfall: "Normal, lognormal, and beta distributions are explicitly called out as poor fits for equity correlations. If an answer choice offers 'normal distribution' for equity correlation, it's a distractor. Also notice the interesting split: equity and default correlations share the same best-fit family (Johnson SB) despite very different underlying economics, while bonds are the outlier (GEV, though normal is also described as a good fit for bonds specifically).",
      related: [{ r: 3, label: "R3: GEV appearing again, now for bond correlation itself" }],
      memory: "Equity & default correlation: Johnson SB twins. Bonds: the GEV outlier (where normal is at least a decent understudy)."
    }
  ],

  connections: {
    from: [
      { r: 7, why: "Establishes correlation matters; this reading supplies the empirical facts about HOW it behaves." }
    ],
    to: [
      { r: 9, why: "Copula models must be recalibrated precisely because correlation is regime-dependent and mean-reverting, not static." },
      { r: 27, why: "Default correlation's low mean reversion (~30%) feeds directly into portfolio credit risk assumptions." },
      { r: 63, why: "Correlation spiking in crises (even if 'expected' by level) is a component of the liquidity spiral mechanism." }
    ],
    confused: [
      { what: "Correlation level vs correlation volatility", how: "Level is how high correlation sits (peaks in recession, 37.0%). Volatility is how much correlation itself jumps around (peaks in NORMAL times, 83.0%). These are different statistics with different regime patterns." },
      { what: "Mean reversion rate vs autocorrelation", how: "They are complementary (sum to 1), not independent facts to memorize separately. A fast reverter has low autocorrelation." }
    ]
  },

  misconceptions: [
    { wrong: "\"Correlation is most unstable/volatile during recessions.\"", right: "Correlation LEVEL is highest in recessions (37.0%), but correlation VOLATILITY is highest in NORMAL times (83.0% vs. 80.5% in recessions). Investors are more uncertain about direction when nothing dramatic is happening." },
    { wrong: "\"High mean reversion implies high autocorrelation.\"", right: "They sum to 1. High mean reversion (fast snap-back) means low one-period autocorrelation. A 79% mean reversion rate implies only a 21% one-period autocorrelation." },
    { wrong: "\"Normal distribution is a reasonable fit for equity correlation.\"", right: "It's explicitly called out as a poor fit. Johnson SB is the best fit for equity (and default) correlation; GEV (with normal as a genuinely decent alternative, unlike for equity) fits bond correlation." },
    { wrong: "\"Correlation volatility is lowest during recessions since everyone agrees the market is falling.\"", right: "It's lowest during expansions (71.2%), not recessions (80.5%, actually the second-highest of the three states). Recessions still carry meaningfully elevated correlation volatility, just not the highest." }
  ],

  highYield: [
    { stars: 3, what: "Level-vs-volatility three-state split (recession 37.0%/80.5%, normal 33.0%/83.0%, expansion 27.5%/71.2%).", why: "The signature counter-intuitive result GARP likes precisely because it's easy to mis-remember under pressure." },
    { stars: 3, what: "Mean reversion + autocorrelation = 1 identity, with worked calculation.", why: "A one-step numeric question that trades on knowing the identity rather than deriving it." },
    { stars: 2, what: "Best-fit distribution table (Johnson SB for equity/default, GEV for bonds; normal is a poor fit for equity but a good fit for bonds).", why: "Pure recall, occasionally tested with 'normal' as a distractor answer for equity correlation." }
  ],

  recall: [
    { q: "Explain why correlation VOLATILITY peaks in normal times rather than during a recession.", a: "During a recession (or expansion), market direction is broadly agreed upon, so correlation stays consistently high (or low). In normal times, investors disagree about where the market is headed, so measured correlation swings around more even though its average level (33.0%) is lower than in a recession (37.0%)." },
    { q: "If mean reversion rate is estimated at 65%, what is the one-period autocorrelation, and how did you get it without a separate regression?", a: "35%, because mean reversion rate + one-period autocorrelation = 1 by identity. No second calculation is needed." },
    { q: "Why is it surprising that equity correlation and default probability correlation share the same best-fit distribution family?", a: "They come from very different underlying economics (market co-movement vs credit event co-movement), yet both are best fit by Johnson SB. It's a reminder that statistical shape and economic mechanism don't have to align intuitively." },
    { q: "A variable sits at 50 with a long-run mean of 80. What is the expected change over the next period if the mean reversion rate is 0.5?", a: "+15, i.e. 0.5 × (80 − 50). A mean reversion rate of 0 would imply no expected change; a rate of 1.0 would imply a full expected snap-back of +30." }
  ],

  hooks: [
    { title: "Calm in the storm, jumpy on a sunny day", text: "Recession: correlation is high but boringly stable, since everyone agrees things are bad. Normal times: correlation is lower but restless, since nobody agrees on direction. Memorize it as the opposite of what intuition suggests." },
    { title: "Two sides, one coin", text: "Mean reversion and autocorrelation are the same coin. Flip toward fast reversion and you flip away from persistence. They can never both be high." }
  ],

  eli5: `<p>Imagine tracking whether your city's neighborhoods all wake up at the same time. On a stormy morning (a "recession"), the whole city hits snooze together and everyone's alarm-clock times cluster tightly. High agreement, and that agreement barely changes from one stormy morning to the next. On a gorgeous sunny morning (an "expansion"), people wake whenever they feel like it. Low agreement, and it stays low and predictable. But on an ordinary cloudy-then-maybe-sunny morning (a "normal" day), some people guess it'll rain and sleep in, others guess it'll clear up and rise early. Nobody's sure what kind of day it is, so the spread of wake-up times swings wildly from one ordinary day to the next, even though on average it isn't as extreme as the stormy-day clustering. Mapped back to finance: the "agreement in wake-up times" is correlation LEVEL (highest in recessions, because macro shocks hit everyone at once), and the "swing in that agreement from day to day" is correlation VOLATILITY (highest in normal periods, because investors are least sure which way the economy is heading).</p>`,

  thinkLike: `<p>A risk manager doesn't ask "what is the correlation?" as a single-number question. They ask "what regime am I in, and how far might this month's correlation estimate wander from that regime's typical level before I recalibrate?" That means holding two separate mental dials: one for the current LEVEL (which regime, recession, normal, or expansion, sets my baseline expectation), and one for the current VOLATILITY of that level (how much noise should I expect around the baseline before treating a change as meaningful). A manager calibrating VaR or stress-testing a correlation-sensitive book (a correlation swap, a basket option, a CDO tranche) during a recession should expect correlations to sit high, and to stay high, because recession-period correlation is comparatively stable. The same manager operating in a "normal" macro environment should expect more month-to-month churn in their correlation estimate even though its average is lower, and should widen the confidence interval around any single correlation estimate rather than trusting it too literally.</p>
  <p>The exam tests this by presenting the obvious wrong answer (recession = highest level AND highest volatility) alongside the correct, counter-intuitive pairing (recession = highest level; normal = highest volatility), and by giving you a regression output (a slope coefficient) and asking you to convert it into a mean reversion rate, an expected next-period value, and/or a one-period autocorrelation, all from the same underlying number, via the a + AC = 1 identity. It also likes to swap in "normal distribution" as a distractor for the equity correlation best-fit question, banking on the fact that normal is the intuitive default guess for any statistical distribution.</p>`,

  breakdown: [
    {
      title: "Correlation level vs. volatility across the three economic states (Dow, 1972–2017)",
      points: [
        "Recession (two consecutive quarters of negative GDP growth): correlation level 37.0% (highest), correlation volatility 80.5% (second-highest).",
        "Normal period (GDP growth between 0% and 3.5%): correlation level 33.0% (middle), correlation volatility 83.0% (highest, the counter-intuitive result).",
        "Expansion (GDP growth above 3.5%): correlation level 27.5% (lowest), correlation volatility 71.2% (lowest)."
      ]
    },
    {
      title: "Best-fit distributions and mean reversion rates by correlation type",
      points: [
        "Equity correlation (480,600 Dow observations, 1972–2017): best fit Johnson SB; mean reversion rate ~79% (high, snaps back to the mean quickly); normal, lognormal, and beta are explicit poor fits.",
        "Bond correlation (7,645 observations, average correlation 42%, volatility 64%): best fit Generalized Extreme Value (GEV); normal is also a good fit; mean reversion rate ~26% (low, slow to revert).",
        "Default probability correlation (4,655 observations, average correlation 30%, volatility 88%, the highest of the three): best fit Johnson SB (same family as equity, different economics); mean reversion rate ~30% (low, closer to bonds than to equity)."
      ]
    }
  ],

  quiz: [
    {
      q: "Based on the 1972–2017 study of Dow stock correlations, which statement correctly characterizes correlation levels and correlation volatilities across recessions, normal periods, and expansions?",
      options: [
        "Correlations and correlation volatility are both highest during recessions.",
        "Correlations are highest during normal periods, and correlation volatility is highest during recessions.",
        "Correlations are highest during recessions, and correlation volatility is highest during normal periods.",
        "Correlations and correlation volatility are both highest during expansionary periods."
      ],
      answer: 2,
      why: "Correlation level peaks in recessions (37.0%) because stocks crash together on shared macro shocks, but correlation volatility peaks in normal periods (83.0%) because investors are least certain of market direction then. The 'both peak together during recessions' answer is the tempting but wrong assumption; the reading explicitly warns against it."
    },
    {
      q: "A variable's value at time t−1 is 30, and its long-run mean is 40. Ignoring the stochastic term, what is the expected change in the variable over the next period if the mean reversion rate is 0.4?",
      options: ["−10", "−4", "4", "10"],
      answer: 2,
      why: "Expected change = a × (μ − S_{t-1}) = 0.4 × (40 − 30) = 4. The distractor '−4' comes from reversing the sign of the gap; '10' and '−10' come from forgetting to multiply by the mean reversion rate at all."
    },
    {
      q: "A regression of (S_t − S_{t-1}) on S_{t-1} for a correlation series produces the equation Y = 0.24 − 0.75X. The long-run mean correlation is 32%, and this period's observed correlation is 36%. What is the expected correlation next period?",
      options: ["32%", "33%", "35%", "37%"],
      answer: 1,
      why: "The slope is −0.75, so the mean reversion rate a = 0.75. The gap from the mean is 32% − 36% = −4%. Expected change = 0.75 × (−4%) = −3%, so next period's expected correlation = 36% − 3% = 33%. Choosing 32% (the long-run mean itself) ignores that mean reversion is partial, not complete."
    },
    {
      q: "A regression estimates a mean reversion rate of 77% (beta coefficient of −0.77) for a correlation series. What is the corresponding one-period autocorrelation?",
      options: ["19%", "23%", "27%", "77%"],
      answer: 1,
      why: "Mean reversion rate + one-period autocorrelation = 1 (100%), so autocorrelation = 100% − 77% = 23%. Selecting 77% confuses autocorrelation with the mean reversion rate itself, exactly the misconception this identity exists to prevent."
    },
    {
      q: "Which best-fit distributions did the empirical study identify for equity correlation, bond correlation, and default probability correlation, respectively?",
      options: [
        "Lognormal, generalized extreme value, and normal",
        "Johnson SB, generalized extreme value, and Johnson SB",
        "Beta, normal, and beta",
        "Johnson SB, normal, and beta"
      ],
      answer: 1,
      why: "Equity and default probability correlations are both best fit by the Johnson SB distribution despite arising from very different economics; bond correlations are best fit by the Generalized Extreme Value distribution (though normal is also a decent fit for bonds specifically, not for equity or default correlation)."
    },
    {
      q: "Which correlation type in the study had the highest correlation volatility overall, higher even than equity correlation's normal-period peak of 83.0%?",
      options: [
        "Bond correlation, at 64% volatility",
        "Default probability correlation, at 88% volatility",
        "Equity correlation during expansions, at 71.2% volatility",
        "Equity correlation during recessions, at 80.5% volatility"
      ],
      answer: 1,
      why: "Default probability correlation had the highest correlation volatility of all the figures in the reading, at 88%, despite having a low mean reversion rate (~30%) similar to bonds. Bond correlation volatility (64%) is actually the lowest of the correlation-type figures given, which is a common point of confusion since bonds also have the lowest mean reversion rate."
    }
  ],

  sources: [
    { title: "Autocorrelation - Wikipedia", url: "https://en.wikipedia.org/wiki/Autocorrelation", note: "Background on how autocorrelation is defined and computed, including the ARCH/GARCH context referenced in the reading." },
    { title: "Mean Reversion - Investopedia", url: "https://www.investopedia.com/terms/m/meanreversion.asp", note: "Accessible explanation of mean reversion as a general concept, applicable beyond correlation to prices, spreads, and volatility." },
    { title: "Generalized Extreme Value Distribution - Wikipedia", url: "https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution", note: "The GEV distribution identified as the best fit for bond correlations; connects back to the EVT material in Reading 3." },
    { title: "Correlation Risk Modeling and Management - GARP", url: "https://www.garp.org/", note: "GARP's FRM curriculum page, source organization for this reading's underlying text (Meissner, Correlation Risk Modeling and Management, 2nd Edition)." }
  ],

  pdf: { book: 1, query: "Correlation LEVEL is highest in recessions" },

  summary: `<p>Correlation <strong>level</strong> peaks in recessions (37.0%), middling in normal periods (33.0%), lowest in expansions (27.5%). Correlation <strong>volatility</strong> peaks in NORMAL times (83.0%), close behind in recessions (80.5%), lowest in expansions (71.2%): don't conflate the two. <strong>Mean reversion rate + one-period autocorrelation = 1</strong>, an identity, so get one and derive the other (equity's ~79% mean reversion implies ~21% autocorrelation). Best-fit distributions — <strong>equity</strong> (480,600 Dow observations) and <strong>default probability</strong> (4,655 observations) correlation go to Johnson SB (high ~79% and low ~30% mean reversion respectively); <strong>bond</strong> correlation (7,645 observations) goes to GEV (normal a decent alternative), low ~26% mean reversion. Normal/lognormal/beta are explicitly poor fits for equity correlation. Default probability correlation carries the highest correlation volatility of the three types studied, at 88%.</p>`
});
