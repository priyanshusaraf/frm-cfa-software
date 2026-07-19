FRM.register({
  book: 1, reading: 3,
  session: "Risk Measurement",
  title: "Parametric Approaches (II): Extreme Value Theory",
  tagline: "Stop fitting the whole distribution and hoping the tail comes out right. Fit the tail itself.",

  teaches: `<p>Everything in Readings 1–2 is calibrated to the bulk of the data — the 'normal' 95% of days. But the days that bankrupt institutions are 1-in-1000 events that barely appear in any sample. EVT is a different statistical philosophy: fit a distribution <strong>only to the extreme observations</strong>, using theorems that say what shape tails must converge to regardless of the parent distribution.</p>
  <p>Two frameworks: <strong>GEV</strong> (block maxima — the worst observation per period) and <strong>POT</strong> (peaks over threshold — every observation beyond a cutoff u, converging to the Generalized Pareto distribution). Both share the crucial tail-index parameter <strong>\\(\\xi\\)</strong>. The reading ends with multivariate EVT — joint extremes — and the curse of dimensionality.</p>`,

  why: `<p>Why does this exist? Because the central limit theorem — the justification for normal-based models — is a statement about <em>averages</em>, and risk management's nightmares are <em>maxima</em>. The Fisher-Tippett theorem is the CLT's dark twin: it says sample maxima converge to exactly one family (GEV) no matter the parent distribution. That gives you a principled way to extrapolate beyond the worst thing in your sample — the very thing HS structurally cannot do.</p>`,

  intuition: `<p>Imagine studying floods. Averaging all daily river levels tells you almost nothing about the once-a-century flood; you'd rather study only the yearly peaks. EVT formalizes this: throw away the unremarkable days, model the extremes directly.</p>
  <p>The single most important object is <strong>\\(\\xi\\) (xi), the shape/tail index</strong>: \\(\\xi\\) > 0 → Fréchet, heavy power-law tails (t-distribution, Pareto — the realistic case for markets); \\(\\xi\\) = 0 → Gumbel, light exponential tails (normal, lognormal); \\(\\xi\\) < 0 → Weibull, bounded tails (rare in finance). Practically, FRM narrows the world to 'is ξ positive or zero,' and when in doubt you assume ξ > 0 to be conservative.</p>
  <p>POT's core tension: choose threshold u too high and you have theory-perfect but data-starved estimates; too low and you have plenty of data that isn't genuinely extreme. This bias-variance trade-off IS the exam question.</p>`,

  visual: `<div class="widget" data-widget="evt"></div>`,

  formulas: [
    { name: "POT VaR (Generalized Pareto)", math: "VaR = u + (\\beta /\\xi ) \\times [ (n/N_{u} \\times (1-c))^{-\\xi } - 1 ]", note: "u = threshold, \\(\\beta\\) = scale, \\(\\xi\\) = shape, Nᵤ/n = fraction of observations above u, c = confidence." },
    { name: "POT Expected Shortfall", math: "ES = VaR/(1-\\xi ) + (\\beta - \\xi u)/(1-\\xi )", note: "ES is a LINEAR function of VaR — given VaR, never re-derive from scratch. ES/VaR > 1 whenever \\(\\xi\\) > 0." },
    { name: "GEV shape cases", math: "\\xi > 0:\\ \\text{Fréchet}\\qquad \\xi = 0:\\ \\text{Gumbel}\\qquad \\xi < 0:\\ \\text{Weibull}", note: "Fréchet ↔ fat tails (markets). Weibull ↔ bounded — 'rare in finance' is the tested phrase." }
  ],

  concepts: [
    {
      name: "Why extremes are statistically hard",
      def: "By definition there are few extreme observations, and some plausible extremes have never occurred in the sample at all; any assumed distribution carries unverifiable error because the true tail is unobservable.",
      intuition: "You are asked to describe a country you've only seen three postcards of. EVT's answer: don't guess the whole country — use theorems about what all coastlines look like.",
      related: [{ r: 1, label: "R1 — SE explodes where data thins" }]
    },
    {
      name: "GEV and the Fisher-Tippett theorem",
      def: "As sample size grows, the distribution of block MAXIMA converges to the Generalized Extreme Value distribution with parameters \\(\\mu\\) (location), \\(\\sigma\\) (scale), \\(\\xi\\) (shape) — regardless of the parent distribution.",
      intuition: "The CLT for maxima. Averages → normal; maxima → GEV. One theorem, one family, no exceptions.",
      example: "Decision rules for Fréchet vs Gumbel, all testable: (1) confident the parent is fat-tailed (e.g., t) → \\(\\xi\\)>0; (2) a test fails to reject \\(\\xi =0\\) → Gumbel; (3) in doubt → assume \\(\\xi\\)>0, the conservative choice.",
      pitfall: "\\(\\mu\\) and \\(\\sigma\\) are related to, but NOT identical to, the mean and standard deviation. Estimation: maximum likelihood, regression on ordered extremes, or the semi-parametric Hill estimator (whose main challenge is choosing how many tail observations to include — the same trade-off as choosing u).",
      related: ["Peaks-over-threshold", { r: 15, label: "R15 — markets pricing fat tails via smiles" }],
      memory: "GEV = 'Greatest Every Vintage' — one maximum per block."
    },
    {
      name: "Peaks-over-threshold (POT) & Generalized Pareto",
      def: "Model EVERY observation exceeding threshold u. The GPBdH theorem: as u grows, excess losses converge to the Generalized Pareto distribution with scale \\(\\beta\\) and shape \\(\\xi\\).",
      intuition: "GEV keeps one observation per block and discards the rest — wasteful. POT keeps all sufficiently extreme observations, using data more efficiently at the cost of having to choose u.",
      example: "Worked mechanics: (1) compute (Nᵤ/n)/(1−c) in the orientation the formula uses, (2) raise to \\(- \\xi\\), (3) plug into the bracket, (4) feed the resulting VaR into the linear ES formula.",
      pitfall: "The threshold trade-off: u too HIGH → few exceedances, noisy parameters, but accurate approximation. u too LOW → lots of data, but the GP approximation breaks because observations aren't genuinely extreme. Classic exam question.",
      related: ["GEV and Fisher-Tippett", "Hill estimator"],
      memory: "POT keeps everything 'over the pot rim'; GEV keeps one trophy per season."
    },
    {
      name: "GEV vs POT — when and why",
      def: "GEV: 3 parameters \\((\\mu\\), \\(\\sigma\\), \\(\\xi )\\), models block maxima, can discard lots of data. POT: 2 parameters \\((\\beta\\), \\(\\xi )\\) plus a threshold choice, uses all data above u. \\(\\xi\\) has the identical interpretation in both.",
      intuition: "Same tail, two sampling philosophies. POT is usually more data-efficient; GEV avoids the threshold choice.",
      pitfall: "\\(\\xi\\) is the SHARED parameter — a question can ask what carries the same meaning across both frameworks. Answer: the tail index.",
      related: ["POT & Generalized Pareto"]
    },
    {
      name: "Multivariate EVT & tail dependence",
      def: "Modeling JOINT extremes across assets. Standard tools (elliptical distributions, covariance matrices) fail for joint tails; the solution is copulas from the extreme-value copula family.",
      intuition: "Extreme events travel in packs — an oil-infrastructure attack hits oil companies AND global risk sentiment. Correlation matrices describe co-movement in the bulk; tail dependence describes co-crashing, a different quantity entirely.",
      example: "Curse of dimensionality arithmetic (tested with these numbers): univariate 1-in-100 extremes → joint extreme for 2 independent variables ≈ 1-in-10,000; for 3 ≈ 1-in-1,000,000. Parameters multiply while genuinely extreme joint observations vanish.",
      pitfall: "This is the same bias-variance tension as the POT threshold, promoted to higher dimensions.",
      related: [{ r: 9, label: "R9 — the Gaussian copula's tail-dependence failure" }, { r: 7, label: "R7 — correlation risk in crises" }],
      memory: "100 × 100 = 10,000 — multiply the rarities."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "R1's QQ plots reveal fat tails; R1's SE analysis shows deep-tail estimates are data-starved. EVT is the principled response to both." },
      { r: 2, why: "Even the smartest weighted HS is trapped inside the sample's worst day. EVT extrapolates past it." }
    ],
    to: [
      { r: 9, why: "The Gaussian copula's failure is precisely a failure to model the tail dependence multivariate EVT warns about." },
      { r: 16, why: "FRTB's stressed ES exists because regulators internalized that tails need dedicated treatment." },
      { r: 26, why: "Credit loss distributions are all tail — EVT thinking pervades credit VaR." },
      { r: 43, why: "Operational risk severity modeling leans on heavy-tailed distributions and the same data-scarcity problem." }
    ],
    confused: [
      { what: "GEV vs GPD", how: "GEV is the limit law for block MAXIMA (3 params); the Generalized Pareto is the limit law for threshold EXCEEDANCES (2 params + u). Shared: \\(\\xi\\)." },
      { what: "ξ = 0 meaning", how: "\\(\\xi =0\\) is Gumbel — LIGHT (exponential) tails like the normal. It does not mean 'no tail.' Fréchet \\((\\xi\\)>0) is the fat-tail case." },
      { what: "Tail dependence vs correlation", how: "Correlation measures average co-movement; tail dependence measures co-crashing probability. Gaussian dependence has zero tail dependence even at high \\(\\rho\\)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Pick the threshold u as high as possible for theoretical purity.\"", right: "u too high starves the estimator (few exceedances → noisy \\(\\beta\\), \\(\\xi )\\). The choice is a bias-variance trade-off with no free lunch — that trade-off is the tested content." },
    { wrong: "\"\\(\\xi\\) < 0 (Weibull) is a common case to consider for asset returns.\"", right: "Explicitly rare in finance. FRM narrows the real decision to Fréchet \\((\\xi\\)>0) vs Gumbel \\((\\xi =0)\\), with 'assume \\(\\xi\\)>0 when in doubt' as the conservative rule." },
    { wrong: "\"To get ES under POT, redo the whole calculation at deeper confidence.\"", right: "ES is a linear function of VaR: ES = \\(VaR/(1- \\xi )\\) + \\((\\beta - \\xi u)/(1- \\xi )\\). Given VaR, ES is one step — recomputing from scratch wastes exam time and signals confusion." },
    { wrong: "\"High correlation between assets means their extremes will coincide.\"", right: "Correlation is a bulk property. Joint tail behavior needs tail dependence, which Gaussian-style dependence lacks entirely — the R9 disaster in embryo." },
    { wrong: "\"\\(\\mu\\) and \\(\\sigma\\) in GEV are the mean and standard deviation.\"", right: "They are location and scale parameters — related to, but not identical to, the mean and SD." }
  ],

  highYield: [
    { stars: 5, what: "\\(\\xi\\) cases: Fréchet/Gumbel/Weibull, which distributions each matches, and the three decision rules.", why: "The single most reliable EVT exam question format." },
    { stars: 5, what: "The threshold u trade-off (bias vs variance).", why: "Tested directly and conceptually, often verbatim." },
    { stars: 4, what: "POT VaR mechanics and ES-as-linear-function-of-VaR.", why: "Calculation questions provide \\(\\beta\\), \\(\\xi\\), u, Nᵤ/n — know the plug order and the shortcut." },
    { stars: 4, what: "GEV vs POT comparison table (what each models, parameter counts, shared \\(\\xi )\\).", why: "Compare-contrast is a recurring one-mark format." },
    { stars: 3, what: "Curse of dimensionality: 1-in-100 → 1-in-10,000 → 1-in-1,000,000.", why: "If you see these numbers, it's testing this multiplication." }
  ],

  recall: [
    { q: "Why is EVT called 'the CLT for maxima'? What theorem plays the CLT's role?", a: "Fisher-Tippett: sample maxima converge in distribution to the GEV family regardless of the parent distribution — the same universality the CLT gives averages, but for extremes." },
    { q: "You're unsure whether \\(\\xi\\) is 0 or positive. What do you assume and why?", a: "Assume \\(\\xi\\) > 0 (Fréchet). Understating tail risk is the costly error; assuming fat tails is the conservative, model-risk-aware default." },
    { q: "State the two failure modes of threshold choice in POT.", a: "u too high: too few exceedances → imprecise parameter estimates (variance). u too low: exceedances aren't genuinely extreme → GP approximation invalid (bias)." },
    { q: "Given POT VaR = 3.1%, \\(\\xi\\) = 0.25, \\(\\beta\\) = 0.75, u = 1%: how do you get ES, and roughly why is it bigger?", a: "ES = \\(VaR/(1- \\xi )\\) + \\((\\beta - \\xi u)/(1- \\xi )\\) = 3.1/0.75 + (0.75−0.25)/0.75 ≈ 4.8%. Bigger because with \\(\\xi\\)>0 the tail beyond VaR is fat — the average exceedance sits well past the threshold." },
    { q: "Two markets each have 1-in-250 extreme days. If independent, how often do they have a joint extreme day, and what does this do to estimation?", a: "≈1-in-62,500. Joint extremes are quadratically rarer while the parameters to estimate multiply — the curse of dimensionality that makes multivariate EVT hard and motivates copulas." }
  ],

  hooks: [
    { title: "Flood engineering", text: "Nobody designs a dam from average river levels; they design from the yearly peaks. EVT is dam engineering for portfolios — model the peaks, ignore the placid days." },
    { title: "ξ is the villain's fingerprint", text: "One Greek letter tells you the tail's species: \\(\\xi\\)>0 fat (Fréchet — 'F for Fat and Finance'), \\(\\xi =0\\) thin (Gumbel — Gaussian-ish), \\(\\xi\\)<0 bounded (Weibull — 'walled')." },
    { title: "Postcards of a country", text: "Estimating tails from 3 observations is describing a country from 3 postcards. EVT's move: use theorems about what all coastlines must look like instead of guessing this one's." }
  ],

  summary: `<p>EVT fits the tail directly instead of hoping a bulk-fitted model gets it right. <strong>GEV</strong> (Fisher-Tippett): block maxima → 3 params \\((\\mu\\), \\(\\sigma\\), \\(\\xi )\\). <strong>POT</strong> (GPBdH): exceedances over u → Generalized Pareto, 2 params \\((\\beta\\), \\(\\xi )\\) + threshold choice; more data-efficient. <strong>\\(\\xi\\)</strong> is shared and decisive: >0 Fréchet/fat (markets), =0 Gumbel/light, <0 Weibull/bounded (rare in finance); in doubt assume ξ>0. Threshold u: high = accurate-but-starved, low = plentiful-but-biased. POT VaR = u + \\((\\beta /\\xi )[(n/N\\)ᵤ\\((1- c))^- \\xi\\) −1]; ES is linear in VaR. Multivariate: joint extremes are multiplicatively rarer (100×100), covariance tools fail, EV copulas required — the exact blind spot that sank Gaussian-copula CDO models (R9).</p>`
});
