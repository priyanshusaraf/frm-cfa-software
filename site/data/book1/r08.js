FRM.register({
  book: 1, reading: 8,
  session: "Correlation Risk",
  title: "Empirical Properties of Correlation",
  tagline: "Correlation matters everywhere — but how does it actually behave across the business cycle, over time, and in its statistical distribution?",

  teaches: `<p>The evidence base for why later models (R9 onward) need to update correlations rather than assume they're static: correlation across business-cycle regimes, mean reversion and autocorrelation, and best-fit distributions for different correlation types.</p>`,

  why: `<p>If correlation were constant, one estimate would do forever. It isn't. This reading supplies the empirical facts that justify every "correlation needs updating" argument in the curriculum — from volatility-weighted historical simulation (R2) to copula recalibration (R9) to the liquidity spiral (R63-64).</p>`,

  intuition: `<p>The single most counter-intuitive, heavily tested result here: correlation LEVEL is highest in recessions (crashes move everything together), but correlation VOLATILITY (how much correlation itself jumps around) is highest in NORMAL times, not recessions. During a recession or expansion, direction is at least "expected" — correlation sits high and stays there. In normal times, nobody agrees on where the market is headed, so correlation estimates swing more.</p>`,

  formulas: [
    { name: "Mean reversion + 1-period autocorrelation identity", math: "\\text{mean reversion rate }(a) + \\text{1-period autocorrelation} = 1", note: "Know one, get the other for free — no separate calculation needed." },
    { name: "Estimating mean reversion via regression", math: "regress (S_{t} - S_{t-1}) on S_{t-1}; slope \\beta = -a", note: "Larger a (faster reversion) → deviations from the long-run mean die out quickly." }
  ],

  concepts: [
    {
      name: "Correlation level vs correlation volatility across regimes",
      def: "Correlation LEVEL peaks in recessions (~37.0%) as assets crash together. Correlation VOLATILITY peaks in NORMAL periods (~83.0%), not recessions (~80.5%).",
      intuition: "In a recession or expansion, the market's direction is at least broadly agreed upon, so correlation is high AND stable. In normal times, investors disagree about direction, so correlation estimates swing more even though the average level is lower.",
      pitfall: "The single most heavily tested counter-intuitive result in this reading: don't assume 'highest in recession' applies to BOTH level and volatility — it only applies to level.",
      related: [{ r: 7, label: "R7 — why correlation spikes matter for VaR and hedges" }],
      memory: "Recessions: correlation is HIGH and CALM. Normal times: correlation is LOWER but JUMPY."
    },
    {
      name: "Mean reversion and autocorrelation",
      def: "Correlation itself mean-reverts toward a long-run average; the mean reversion rate a is estimated by regressing (S_t − S_{t-1}) on S_{t-1}, with slope = −a.",
      example: "Oct 2022 correlation 30%, long-run mean 35%, mean reversion rate 78% → Nov 2022 expected correlation = 30% + 0.78×(35%−30%) = 33.9%. One-period autocorrelation = 1 − 0.78 = 22% — no separate calculation needed once you have one of the two.",
      pitfall: "High mean reversion rate = FAST snap-back to the mean, which sounds like it should imply HIGH autocorrelation, but it's the opposite: mean reversion + autocorrelation = 1, so high reversion means LOW autocorrelation.",
      related: ["Correlation level vs volatility across regimes"],
      memory: "Reversion and autocorrelation are two sides of a coin that must sum to 1 — high one, low the other."
    },
    {
      name: "Best-fit distributions by correlation type",
      def: "Equity correlation: best fit Johnson SB, high mean reversion (~79%). Bond correlation: best fit Generalized Extreme Value (normal also decent), low mean reversion (~26%). Default probability correlation: best fit Johnson SB, low mean reversion (~30%, closer to bond).",
      pitfall: "Normal, lognormal, and beta distributions are explicitly called out as POOR fits for equity correlations — if an answer choice offers 'normal distribution' for equity correlation, it's a distractor. Also notice the interesting split: equity and default correlations share the same best-fit family (Johnson SB) despite very different underlying economics, while bonds are the outlier (GEV).",
      related: [{ r: 3, label: "R3 — GEV appearing again, now for bond correlation itself" }],
      memory: "Equity & default correlation: Johnson SB twins. Bonds: the GEV outlier."
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
      { what: "Correlation level vs correlation volatility", how: "Level = how high correlation sits (peaks in recession). Volatility = how much correlation itself jumps around (peaks in NORMAL times) — these are different statistics with different regime patterns." },
      { what: "Mean reversion rate vs autocorrelation", how: "They are complementary (sum to 1), not independent facts to memorize separately — a fast reverter has LOW autocorrelation." }
    ]
  },

  misconceptions: [
    { wrong: "\"Correlation is most unstable/volatile during recessions.\"", right: "Correlation LEVEL is highest in recessions, but correlation VOLATILITY is highest in NORMAL times — investors are more uncertain about direction when nothing dramatic is happening." },
    { wrong: "\"High mean reversion implies high autocorrelation.\"", right: "They sum to 1 — high mean reversion (fast snap-back) means LOW one-period autocorrelation." },
    { wrong: "\"Normal distribution is a reasonable fit for equity correlation.\"", right: "Explicitly called out as a POOR fit — Johnson SB is the best fit for equity (and default) correlation; GEV (with normal as a decent alternative) fits bond correlation." }
  ],

  highYield: [
    { stars: 3, what: "Level-vs-volatility recession/normal-times split (37.0%/83.0%/80.5% figures).", why: "The signature counter-intuitive result GARP likes precisely because it's easy to mis-remember under pressure." },
    { stars: 3, what: "Mean reversion + autocorrelation = 1 identity, with worked calculation.", why: "A one-step numeric question that trades on knowing the identity rather than deriving it." },
    { stars: 2, what: "Best-fit distribution table (Johnson SB for equity/default, GEV for bonds; normal is a poor fit for equity).", why: "Pure recall, occasionally tested with 'normal' as a distractor answer." }
  ],

  recall: [
    { q: "Explain why correlation VOLATILITY peaks in normal times rather than during a recession.", a: "During a recession (or expansion), market direction is broadly agreed upon — correlation stays consistently high. In normal times, investors disagree about where the market is headed, so measured correlation swings around more even though its average level is lower." },
    { q: "If mean reversion rate is estimated at 65%, what is the one-period autocorrelation, and how did you get it without a separate regression?", a: "35% — because mean reversion rate + one-period autocorrelation = 1 by identity; no second calculation is needed." },
    { q: "Why is it surprising that equity correlation and default probability correlation share the same best-fit distribution family?", a: "They come from very different underlying economics (market co-movement vs credit event co-movement), yet both are best fit by Johnson SB — a reminder that statistical shape and economic mechanism don't have to align intuitively." }
  ],

  hooks: [
    { title: "Calm in the storm, jumpy on a sunny day", text: "Recession: correlation is high but boringly stable (everyone agrees things are bad). Normal times: correlation is lower but restless (nobody agrees on direction) — memorize as the opposite of what intuition suggests." },
    { title: "Two sides, one coin", text: "Mean reversion and autocorrelation are the same coin. Flip toward fast reversion, and you flip away from persistence — they can never both be high." }
  ],

  summary: `<p>Correlation <strong>level</strong> peaks in recessions (~37%); correlation <strong>volatility</strong> peaks in NORMAL times (~83% vs ~80.5% in recession) — don't conflate the two. <strong>Mean reversion rate + one-period autocorrelation = 1</strong> (identity — get one, derive the other). Best-fit distributions: <strong>equity</strong> and <strong>default probability</strong> correlation → Johnson SB (high ~79% and low ~30% mean reversion respectively); <strong>bond</strong> correlation → GEV (normal decent alternative), low ~26% mean reversion. Normal/lognormal/beta are explicitly poor fits for equity correlation.</p>`
});
