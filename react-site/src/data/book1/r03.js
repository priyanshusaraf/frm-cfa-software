export default ({
  book: 1, reading: 3,
  session: "Risk Measurement",
  title: "Parametric Approaches (II): Extreme Value Theory",
  tagline: "Stop fitting the whole distribution and hoping the tail comes out right. Fit the tail itself.",

  teaches: `<p>Everything in Readings 1–2 is calibrated to the bulk of the data, the 'normal' 95% of days. But the days that bankrupt institutions are 1-in-1000 events that barely appear in any sample. EVT takes a different statistical approach: fit a distribution <strong>only to the extreme observations</strong>, using theorems that tell you what shape tails must converge to no matter what the parent distribution looks like.</p>
  <p>Two frameworks do this. <strong>GEV</strong> (block maxima, the worst observation per period) and <strong>POT</strong> (peaks over threshold, every observation beyond a cutoff u, converging to the Generalized Pareto distribution). Both share the same tail-index parameter, <strong>\\(\\xi\\)</strong>. The reading closes with multivariate EVT, joint extremes across assets, and the curse of dimensionality that comes with it.</p>`,

  why: `<p>The central limit theorem, the justification behind normal-based models, is a statement about <em>averages</em>. Risk management's nightmares are <em>maxima</em>. The Fisher-Tippett theorem is the CLT's counterpart for the tail: it says sample maxima converge to exactly one family (GEV), regardless of the parent distribution. That gives you a principled way to extrapolate beyond the worst thing that's happened in your sample, which is precisely what historical simulation can't do.</p>`,

  intuition: `<p>Imagine studying floods. Averaging all daily river levels tells you almost nothing about the once-a-century flood. You'd rather study only the yearly peaks. EVT formalizes this instinct: throw away the unremarkable days and model the extremes directly.</p>
  <p>The single most important object here is <strong>\\(\\xi\\) (xi), the shape or tail index</strong>. \\(\\xi\\) > 0 gives you Fréchet, heavy power-law tails (t-distribution, Pareto, the realistic case for markets). \\(\\xi\\) = 0 gives you Gumbel, light exponential tails (normal, lognormal). \\(\\xi\\) < 0 gives you Weibull, bounded tails, which is rare in finance. In practice FRM narrows the world down to "is ξ positive or zero," and when you're unsure, you assume ξ > 0 to stay conservative.</p>
  <p>POT's core tension is the threshold u. Set it too high and your estimates are theoretically clean but data-starved. Set it too low and you have plenty of data that isn't genuinely extreme. That bias-variance trade-off is the exam question.</p>`,

  visual: `<div class="widget" data-widget="evt"></div>`,

  formulas: [
    { name: "POT VaR (Generalized Pareto)", math: "\\text{VaR} = u + \\dfrac{\\beta}{\\xi} \\times \\left[ \\left(\\dfrac{n}{N_{u}} \\times (1-c)\\right)^{-\\xi} - 1 \\right]",
      plain: "The loss you'd need to exceed at confidence c equals the threshold u plus an adjustment: how many multiples of the scale \\(\\beta\\) you add on top of u, stretched by the shape \\(\\xi\\) and by how much rarer confidence level c is than the threshold-crossing frequency \\(N_u/n\\).",
      derivation: "<p>Worked example straight from the reading: \\(\\beta = 0.75\\), \\(\\xi = 0.25\\), \\(u = 1\\%\\), \\(N_u/n = 5\\%\\) (so \\(n/N_u = 20\\)), confidence \\(c = 99\\%\\) (so \\(1-c = 0.01\\)).</p><p>Step 1 — form the ratio inside the brackets: \\[ \\frac{n}{N_u}\\times(1-c) = 20 \\times 0.01 = 0.2 \\]</p><p>Step 2 — raise it to the power \\(-\\xi\\): \\[ 0.2^{-0.25} \\approx 1.495 \\]</p><p>Step 3 — subtract 1, then scale by \\(\\beta/\\xi = 0.75/0.25 = 3\\): \\[ 3 \\times (1.495 - 1) \\approx 1.486 \\]</p><p>Step 4 — add the threshold: \\[ \\text{VaR} = 1\\% + 1.486\\% \\approx 2.49\\% \\]</p><p>Notice the whole adjustment term is zero only if \\(N_u/n = 1-c\\) exactly — i.e. VaR collapses to u only when the confidence level you're testing happens to equal the exceedance frequency you calibrated on. Any tighter confidence pushes VaR above u.</p>",
      note: "u = threshold, \\(\\beta\\) = scale, \\(\\xi\\) = shape, \\(N_u/n\\) = fraction of observations above u, c = confidence. Get the ratio the right way up: it's \\(n/N_u\\) (a number \\(\\geq 1\\)) times \\((1-c)\\), not the reverse." },
    { name: "POT Expected Shortfall", math: "\\text{ES} = \\dfrac{\\text{VaR}}{1-\\xi} + \\dfrac{\\beta - \\xi u}{1-\\xi}",
      plain: "Expected shortfall, the average loss on the days VaR is breached, is just VaR scaled up by a factor that depends only on \\(\\xi\\), plus a small correction term. You never need to re-run the whole POT VaR calculation to get it.",
      derivation: "<p>Continuing the worked example (\\(\\text{VaR} \\approx 2.486\\%\\), \\(\\beta = 0.75\\), \\(\\xi = 0.25\\), \\(u = 1\\%\\)):</p><p>\\[ \\text{ES} = \\frac{2.486\\%}{1-0.25} + \\frac{0.75\\% - 0.25 \\times 1\\%}{1-0.25} = \\frac{2.486\\%}{0.75} + \\frac{0.5\\%}{0.75} \\approx 3.31\\% + 0.67\\% \\approx 3.98\\% \\]</p><p>Because \\(1-\\xi = 0.75 < 1\\) whenever \\(\\xi>0\\), dividing by it always inflates VaR. That's the algebraic reason ES/VaR \\(>1\\) exactly when the tail is fat (Fréchet). If \\(\\xi=0\\) (Gumbel), the formula is undefined in this exact form, because the underlying GP distribution becomes the exponential and the ES/VaR gap shrinks toward a fixed constant instead of growing with \\(\\xi\\).</p>",
      note: "ES is a LINEAR function of VaR. Given VaR, never re-derive from scratch. ES/VaR > 1 whenever \\(\\xi\\) > 0." },
    { name: "GEV shape cases", math: "\\xi > 0:\\ \\text{Fréchet}\\qquad \\xi = 0:\\ \\text{Gumbel}\\qquad \\xi < 0:\\ \\text{Weibull}",
      plain: "This isn't an equation to solve, it's a lookup rule. The sign of the single shape parameter \\(\\xi\\) tells you which of the three GEV sub-families you're in, and therefore whether the tail is fat, thin, or bounded.",
      note: "Fréchet ↔ fat tails (markets). Weibull ↔ bounded; 'rare in finance' is the tested phrase." }
  ],

  concepts: [
    {
      name: "Why extremes are statistically hard",
      def: "By definition there are few extreme observations, and some plausible extremes have never occurred in the sample at all. Any assumed distribution carries unverifiable error because the true tail is unobservable.",
      intuition: "You're asked to describe a country you've only seen three postcards of. EVT's answer: don't guess the whole country, use theorems about what all coastlines look like.",
      related: [{ r: 1, label: "R1: SE explodes where data thins" }]
    },
    {
      name: "GEV and the Fisher-Tippett theorem",
      def: "As sample size grows, the distribution of block MAXIMA converges to the Generalized Extreme Value distribution with parameters \\(\\mu\\) (location), \\(\\sigma\\) (scale), \\(\\xi\\) (shape), regardless of the parent distribution.",
      intuition: "The CLT for maxima. Averages converge to normal; maxima converge to GEV. One theorem, one family, no exceptions.",
      example: "Three testable decision rules for Fréchet vs Gumbel: (1) you're confident the parent is fat-tailed (e.g., t), so \\(\\xi\\)>0; (2) a test fails to reject \\(\\xi =0\\), so Gumbel; (3) you're in doubt, so assume \\(\\xi\\)>0, the conservative choice.",
      pitfall: "\\(\\mu\\) and \\(\\sigma\\) are related to, but not identical to, the mean and standard deviation. Estimation methods: maximum likelihood, regression on ordered extremes, or the semi-parametric Hill estimator, whose main challenge is choosing how many tail observations to include (the same trade-off as choosing u).",
      related: ["Peaks-over-threshold", { r: 15, label: "R15: markets pricing fat tails via smiles" }],
      memory: "GEV = 'Greatest Every Vintage', one maximum per block."
    },
    {
      name: "Peaks-over-threshold (POT) & Generalized Pareto",
      def: "Model EVERY observation exceeding threshold u. The GPBdH theorem: as u grows, excess losses converge to the Generalized Pareto distribution with scale \\(\\beta\\) and shape \\(\\xi\\).",
      intuition: "GEV keeps one observation per block and discards the rest, which is wasteful. POT keeps all sufficiently extreme observations, using data more efficiently at the cost of having to choose u.",
      example: "Worked mechanics: (1) compute (Nᵤ/n)/(1−c) in the orientation the formula uses, (2) raise to \\(- \\xi\\), (3) plug into the bracket, (4) feed the resulting VaR into the linear ES formula.",
      pitfall: "The threshold trade-off: u too high means few exceedances and noisy parameters, but an accurate approximation. u too low means lots of data, but the GP approximation breaks because observations aren't genuinely extreme. Classic exam question.",
      related: ["GEV and Fisher-Tippett", "Hill estimator"],
      memory: "POT keeps everything over the pot rim; GEV keeps one trophy per season."
    },
    {
      name: "GEV vs POT: when and why",
      def: "GEV: 3 parameters \\((\\mu\\), \\(\\sigma\\), \\(\\xi )\\), models block maxima, can discard lots of data. POT: 2 parameters \\((\\beta\\), \\(\\xi )\\) plus a threshold choice, uses all data above u. \\(\\xi\\) has the identical interpretation in both.",
      intuition: "Same tail, two sampling philosophies. POT is usually more data-efficient; GEV avoids the threshold choice.",
      pitfall: "\\(\\xi\\) is the shared parameter. A question can ask what carries the same meaning across both frameworks: the tail index.",
      related: ["POT & Generalized Pareto"]
    },
    {
      name: "Multivariate EVT & tail dependence",
      def: "Modeling JOINT extremes across assets. Standard tools (elliptical distributions, covariance matrices) fail for joint tails; the solution is copulas from the extreme-value copula family.",
      intuition: "Extreme events travel in packs. An oil-infrastructure attack hits oil companies and global risk sentiment at once. Correlation matrices describe co-movement in the bulk; tail dependence describes co-crashing, a different quantity entirely.",
      example: "Curse of dimensionality arithmetic, tested with these exact numbers: univariate 1-in-100 extremes give a joint extreme for 2 independent variables of about 1-in-10,000, and for 3 about 1-in-1,000,000. Parameters multiply while genuinely extreme joint observations vanish.",
      pitfall: "This is the same bias-variance tension as the POT threshold, promoted to higher dimensions.",
      related: [{ r: 9, label: "R9: the Gaussian copula's tail-dependence failure" }, { r: 7, label: "R7: correlation risk in crises" }],
      memory: "100 × 100 = 10,000. Multiply the rarities."
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
      { r: 26, why: "Credit loss distributions are all tail; EVT thinking pervades credit VaR." },
      { r: 43, why: "Operational risk severity modeling leans on heavy-tailed distributions and the same data-scarcity problem." }
    ],
    confused: [
      { what: "GEV vs GPD", how: "GEV is the limit law for block MAXIMA (3 params); the Generalized Pareto is the limit law for threshold EXCEEDANCES (2 params + u). They share \\(\\xi\\)." },
      { what: "ξ = 0 meaning", how: "\\(\\xi =0\\) is Gumbel, meaning LIGHT (exponential) tails like the normal. It does not mean 'no tail.' Fréchet \\((\\xi\\)>0) is the fat-tail case." },
      { what: "Tail dependence vs correlation", how: "Correlation measures average co-movement; tail dependence measures co-crashing probability. Gaussian dependence has zero tail dependence even at high \\(\\rho\\)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Pick the threshold u as high as possible for theoretical purity.\"", right: "u too high starves the estimator: few exceedances mean noisy \\(\\beta\\), \\(\\xi )\\). The choice is a bias-variance trade-off with no free lunch, and that trade-off is the tested content." },
    { wrong: "\"\\(\\xi\\) < 0 (Weibull) is a common case to consider for asset returns.\"", right: "It's explicitly rare in finance. FRM narrows the real decision to Fréchet \\((\\xi\\)>0) vs Gumbel \\((\\xi =0)\\), with 'assume \\(\\xi\\)>0 when in doubt' as the conservative rule." },
    { wrong: "\"To get ES under POT, redo the whole calculation at deeper confidence.\"", right: "ES is a linear function of VaR: ES = \\(VaR/(1- \\xi )\\) + \\((\\beta - \\xi u)/(1- \\xi )\\). Given VaR, ES is one step. Recomputing from scratch wastes exam time and signals confusion." },
    { wrong: "\"High correlation between assets means their extremes will coincide.\"", right: "Correlation is a bulk property. Joint tail behavior needs tail dependence, which Gaussian-style dependence lacks entirely, the R9 disaster in embryo." },
    { wrong: "\"\\(\\mu\\) and \\(\\sigma\\) in GEV are the mean and standard deviation.\"", right: "They are location and scale parameters, related to but not identical to the mean and SD." }
  ],

  highYield: [
    { stars: 5, what: "\\(\\xi\\) cases: Fréchet/Gumbel/Weibull, which distributions each matches, and the three decision rules.", why: "This is the single most reliable EVT exam question format." },
    { stars: 5, what: "The threshold u trade-off (bias vs variance).", why: "Tested directly and conceptually, often nearly verbatim from the text." },
    { stars: 4, what: "POT VaR mechanics and ES as a linear function of VaR.", why: "Calculation questions hand you \\(\\beta\\), \\(\\xi\\), u, Nᵤ/n. Know the plug order and the shortcut." },
    { stars: 4, what: "GEV vs POT comparison table (what each models, parameter counts, shared \\(\\xi )\\).", why: "Compare-contrast is a recurring one-mark format." },
    { stars: 3, what: "Curse of dimensionality: 1-in-100 → 1-in-10,000 → 1-in-1,000,000.", why: "If you see these numbers on the exam, it's testing this multiplication." }
  ],

  recall: [
    { q: "Why is EVT called 'the CLT for maxima'? What theorem plays the CLT's role?", a: "Fisher-Tippett: sample maxima converge in distribution to the GEV family regardless of the parent distribution, the same universality the CLT gives averages, but for extremes." },
    { q: "You're unsure whether \\(\\xi\\) is 0 or positive. What do you assume and why?", a: "Assume \\(\\xi\\) > 0 (Fréchet). Understating tail risk is the costly error, so assuming fat tails is the conservative, model-risk-aware default." },
    { q: "State the two failure modes of threshold choice in POT.", a: "u too high: too few exceedances, so imprecise parameter estimates (variance). u too low: exceedances aren't genuinely extreme, so the GP approximation is invalid (bias)." },
    { q: "Given POT VaR = 3.1%, \\(\\xi\\) = 0.25, \\(\\beta\\) = 0.75, u = 1%: how do you get ES, and roughly why is it bigger?", a: "ES = \\(VaR/(1- \\xi )\\) + \\((\\beta - \\xi u)/(1- \\xi )\\) = 3.1/0.75 + (0.75−0.25)/0.75 ≈ 4.8%. It's bigger because with \\(\\xi\\)>0 the tail beyond VaR is fat, so the average exceedance sits well past the threshold." },
    { q: "Two markets each have 1-in-250 extreme days. If independent, how often do they have a joint extreme day, and what does this do to estimation?", a: "About 1-in-62,500. Joint extremes are quadratically rarer while the parameters to estimate multiply, which is the curse of dimensionality that makes multivariate EVT hard and motivates copulas." }
  ],

  hooks: [
    { title: "Flood engineering", text: "Nobody designs a dam from average river levels; they design from the yearly peaks. EVT is dam engineering for portfolios: model the peaks, ignore the placid days." },
    { title: "ξ is the villain's fingerprint", text: "One Greek letter tells you the tail's species. \\(\\xi\\)>0 is fat (Fréchet, 'F for Fat and Finance'), \\(\\xi =0\\) is thin (Gumbel, Gaussian-ish), \\(\\xi\\)<0 is bounded (Weibull, 'walled')." },
    { title: "Postcards of a country", text: "Estimating tails from 3 observations is like describing a country from 3 postcards. EVT's move: use theorems about what all coastlines must look like instead of guessing this one's." }
  ],

  summary: `<p>EVT fits the tail directly instead of hoping a bulk-fitted model gets it right. <strong>GEV</strong> (Fisher-Tippett): block maxima, 3 params \\((\\mu\\), \\(\\sigma\\), \\(\\xi )\\). <strong>POT</strong> (GPBdH): exceedances over u, Generalized Pareto, 2 params \\((\\beta\\), \\(\\xi )\\) plus a threshold choice, more data-efficient. <strong>\\(\\xi\\)</strong> is shared and decisive: >0 is Fréchet/fat (markets), =0 is Gumbel/light, <0 is Weibull/bounded (rare in finance); when in doubt, assume ξ>0. Threshold u: high means accurate but starved, low means plentiful but biased. POT VaR = u + \\((\\beta /\\xi )[(n/N\\)ᵤ\\((1- c))^- \\xi\\) −1]; ES is linear in VaR. Multivariate: joint extremes are multiplicatively rarer (100×100), covariance tools fail, and EV copulas are required, the exact blind spot that sank Gaussian-copula CDO models (R9).</p>`,

  eli5: `<p>A dam engineer doesn't design the spillway by averaging every day's river level for the last 50 years. The average tells you almost nothing about how high the river will get in the one-in-a-century flood. Instead, they collect only the yearly high-water marks (or every reading above some dangerous height) and fit a special "worst-case" curve just to those numbers, because floods have their own statistical rules that ordinary rainfall data doesn't follow. Extreme Value Theory does exactly this for portfolio losses. Instead of fitting one distribution to every trading day and hoping it also happens to describe the crash days, it throws out the ordinary days and fits a dedicated distribution, GEV or the Generalized Pareto, only to the block maxima or the threshold-crossing losses. The reasoning behind this isn't a guess, it's a proven theorem: extreme values always converge to one of a small number of "shapes," no matter what the ordinary data looks like.</p>`,

  thinkLike: `<p>A market risk manager reaches for EVT specifically when someone asks "what's our loss at 99.9% confidence?" and the honest answer is "we have maybe two or three observations that bad in our entire dataset." Historical simulation (R2) can't answer that question at all; its worst possible VaR is capped at the worst day that happened to occur in the sample. EVT lets you extrapolate past the worst day you've seen, using a theorem (Fisher-Tippett / GPBdH) rather than a guess. The manager's real judgment call is the threshold u. Set it too high and the tail estimate is theoretically clean but statistically noisy (few data points). Set it too low and you get plenty of data, but it's contaminated by observations that aren't really extreme, breaking the approximation the theorem relies on. On calibration day, this trade-off, not the algebra, is what a manager actually agonizes over, and it's also exactly what GARP tests. Expect a conceptual question phrased as "what happens if the threshold is set too high/too low," plus a numeric question that hands you β, ξ, u, and Nᵤ/n and asks you to plug them into the POT VaR formula, then get ES for free as a linear function of that VaR rather than re-deriving it. The exam also loves the sign of ξ as a stand-alone concept question. Know the Fréchet/Gumbel/Weibull mapping cold, and default to ξ>0 whenever the question doesn't hand you a reason to think otherwise, because assuming light tails when they're actually fat is the error that gets institutions killed.</p>`,

  breakdown: [
    { title: "The three GEV shape regimes (by sign of ξ)", points: [
      "ξ > 0 gives you the Fréchet distribution: heavy, power-law tails, matching the t-distribution and Pareto distribution, the realistic case for financial market returns.",
      "ξ = 0 gives you the Gumbel distribution: light, exponential-type tails, matching the normal and lognormal distributions.",
      "ξ < 0 gives you the Weibull distribution: tails lighter/thinner than normal, effectively bounded, and explicitly rare in finance, so FRM narrows the practical choice to Fréchet vs. Gumbel."
    ]},
    { title: "Three decision rules for choosing ξ > 0 vs. ξ = 0", points: [
      "You're confident about the parent distribution: if you know or believe returns are t-distributed, you assume ξ > 0.",
      "You run a statistical test and can't reject the null hypothesis that ξ = 0, so you use the Gumbel (ξ = 0) assumption.",
      "You're unsure, so you conservatively assume ξ > 0, because understating tail risk (using Gumbel when the truth is Fréchet) is the costlier mistake and this avoids that model risk."
    ]},
    { title: "Three estimation methods for GEV/POT parameters (μ, σ, ξ or β, ξ)", points: [
      "Maximum likelihood (ML): the most rigorous approach, maximizes a likelihood/log-likelihood function over the extreme observations.",
      "Regression method: simpler, order the extreme observations from lowest to highest and regress to fit the parameters.",
      "Semi-parametric method (Hill estimator): the most common way to estimate just the tail index ξ. Its main practical challenge is choosing how many tail observations to include, the same bias-variance question as choosing the POT threshold u."
    ]},
    { title: "GEV vs. POT: the compare/contrast table", points: [
      "What each models: GEV models the distribution of block maxima (the single worst observation per period); POT models the distribution of every observation that exceeds a threshold u.",
      "Parameter count: GEV needs 3 (μ, σ, ξ); POT needs 2 (β, ξ) plus the separate practical choice of u.",
      "Shared parameter: ξ, the tail index, has the identical interpretation and identical Fréchet/Gumbel/Weibull cutoffs in both frameworks.",
      "Data efficiency: GEV discards a lot of data (one maximum per block, everything else thrown away); POT uses every observation above the threshold, so it's generally more data-efficient."
    ]},
    { title: "The four steps to compute POT VaR and ES from given parameters", points: [
      "Step 1: form the ratio (n/N_u) × (1−c), which tells you how many multiples of the exceedance frequency the target confidence level represents.",
      "Step 2: raise that ratio to the power −ξ.",
      "Step 3: subtract 1 and scale by β/ξ to get the adjustment above the threshold.",
      "Step 4: add the threshold u to get VaR, then plug VaR (plus β, ξ, u) directly into the linear ES formula. Don't recompute VaR-style algebra to get ES."
    ]}
  ],

  quiz: [
    { q: "A risk manager fits a distribution to only the ten worst monthly losses out of a 10-year sample, rather than to all monthly returns. Which statistical philosophy is this?",
      options: ["Historical simulation", "Extreme Value Theory (GEV, block-maxima approach)", "Exponentially weighted moving average", "Filtered historical simulation"],
      answer: 1,
      why: "Fitting a distribution only to the per-period maxima is exactly the GEV/block-maxima approach. Historical simulation uses the whole return sample, not just the extremes; EWMA and filtered HS are volatility-weighting schemes, not tail-only fitting methods." },
    { q: "A test on your return data fails to reject the null hypothesis ξ = 0. What should you conclude and do?",
      options: ["Assume ξ > 0 and use the Fréchet distribution to be conservative", "Assume ξ = 0 and use the Gumbel distribution", "The test is inconclusive; always default to Weibull", "Discard EVT entirely and rely on historical simulation"],
      answer: 1,
      why: "This is one of the reading's three explicit decision rules: if a statistical test can't reject ξ = 0, you use the Gumbel assumption. Defaulting to ξ>0 when in doubt only applies when you have no test result to lean on, and here you do have one, and it says ξ = 0. Weibull is explicitly rare in finance and not a default." },
    { q: "Given β = 0.75, ξ = 0.25, u = 1%, N_u/n = 5%, and confidence c = 99%, what is the POT VaR (nearest 0.1%)?",
      options: ["1.0%", "1.5%", "2.5%", "4.0%"],
      answer: 2,
      why: "Compute (n/N_u)×(1−c) = 20×0.01 = 0.2; raise to −0.25: 0.2^(−0.25) ≈ 1.495; subtract 1 and scale by β/ξ = 3: 3×0.495 ≈ 1.486%; add u = 1%: VaR ≈ 2.49% ≈ 2.5%. 1.0% is just the threshold u with no adjustment added, the trap of forgetting the bracket term entirely. 4.0% is roughly the ES figure, not VaR, a common mix-up between the two linked quantities." },
    { q: "Given the VaR ≈ 2.49% computed above (β = 0.75, ξ = 0.25, u = 1%), what is the correct way to get Expected Shortfall?",
      options: ["Recompute the full POT VaR formula at a deeper confidence level, e.g. c = 99.9%", "ES = VaR/(1−ξ) + (β − ξu)/(1−ξ), a linear function of the VaR already computed", "ES equals VaR because POT already accounts for shortfall", "ES = VaR × ξ"],
      answer: 1,
      why: "ES under POT is a simple linear function of VaR: given VaR, β, ξ, u, you compute it directly (≈2.49/0.75 + 0.5/0.75 ≈ 3.98%) without re-running the VaR derivation. Recomputing from scratch wastes exam time and is the exact trap the reading calls out. Setting ES = VaR contradicts 'ES ≥ VaR' from Reading 1, and the remaining option isn't the formula at all." },
    { q: "Which statement about the parameters μ and σ in the GEV distribution is correct?",
      options: ["μ and σ are exactly the sample mean and standard deviation", "μ and σ are location and scale parameters, related to but not identical to the mean and standard deviation", "μ is the tail index and σ is the threshold", "μ and σ only exist in the POT approach, not GEV"],
      answer: 1,
      why: "The reading is explicit that μ (location) and σ (scale) are related to, but not the same as, the mean and standard deviation, a frequently tested trap. One wrong option states the common assumption directly; another confuses μ/σ with ξ and u, which belong to different frameworks and roles; the last is backwards, since μ and σ are GEV parameters, while POT uses β and ξ instead." },
    { q: "Two markets each independently have a 1-in-100 extreme day. Roughly how often do both markets have a joint extreme day on the same day, and what does this imply for multivariate EVT?",
      options: ["1-in-100, because the events are correlated by market extremity", "1-in-200, since you simply add the frequencies", "1-in-10,000, illustrating that genuinely extreme joint observations vanish while parameters to estimate multiply", "1-in-1,000,000, the number reserved for three independent variables"],
      answer: 2,
      why: "For independent 1-in-100 events, joint occurrence is 100×100 = 1-in-10,000, the curse-of-dimensionality arithmetic the reading tests directly. Adding frequencies misapplies probability rules for independent joint events; 1-in-1,000,000 is the three-variable case, not two; and assuming correlation rather than independence changes the calculation entirely." }
  ],

  sources: [
    { title: "Extreme value theory", url: "https://en.wikipedia.org/wiki/Extreme_value_theory", note: "Background on the Fisher-Tippett-Gnedenko theorem, GEV, and the generalized Pareto distribution underlying this reading." },
    { title: "Peaks over threshold", url: "https://en.wikipedia.org/wiki/Peaks_over_threshold", note: "Overview of the POT method and the threshold-selection trade-off tested in this reading." },
    { title: "Generalized Pareto distribution", url: "https://en.wikipedia.org/wiki/Generalized_Pareto_distribution", note: "Formal definition and properties of the GP distribution used for POT VaR/ES." },
    { title: "Fisher–Tippett–Gnedenko theorem", url: "https://en.wikipedia.org/wiki/Fisher%E2%80%93Tippett%E2%80%93Gnedenko_theorem", note: "The theorem behind GEV convergence for block maxima — the 'CLT for maxima' analogy used in this reading." }
  ],

  pdf: { book: 1, query: "Extreme values are important for risk management because they are associated with catastrophic events" }
});
