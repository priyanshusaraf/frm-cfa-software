export default ({
  book: 1, reading: 1,
  session: "Risk Measurement",
  title: "Estimating Market Risk Measures",
  tagline: "How to turn a pile of P&L data into one defensible number: 'this is how much we could lose.' Everything else in Part II calibrates, stress-tests, or regulates this number.",

  teaches: `<p>This is the foundation reading for the whole curriculum. It teaches you to compute <strong>Value at Risk (VaR)</strong> three ways: directly from sorted historical data, from a normal distribution, and from a lognormal distribution. Then it fixes VaR's biggest blind spot with <strong>Expected Shortfall (ES)</strong>. It closes with two honesty tools: standard errors (how precise is my risk number, really?) and QQ plots (is my distributional assumption even right?).</p>
  <p>Picture this reading as building a ruler. The rest of Book 1 calibrates that ruler (R2), stretches it out to catastrophes (R3), audits it (R4), and eventually has regulation replace its markings entirely (R16).</p>`,

  why: `<p>Every risk management decision, how much capital to hold, whether a trade is too risky, whether a bank's model can be trusted, comes down to one question: <strong>"how much could we lose, and how confident are we in that number?"</strong> Before VaR existed, firms described risk position by position, in Greeks and notionals that couldn't be added up. VaR was invented to give one firm-wide, probability-based loss number that a CEO or regulator could actually act on. ES came about roughly a decade later, because VaR turned out to answer the wrong question about tails. That gap between the two measures is now written directly into bank regulation (FRTB, R16).</p>`,

  intuition: `<p>Line up your last 1,000 daily P&L outcomes from worst to best. Walk in 5% of the way from the worst end. The loss you're standing on is your 95% VaR: <em>"on 95% of days we do better than this."</em></p>
  <p>Now notice what VaR ignores: everything to your left. Whether the worst 5% of days lose a little more than VaR or ten times VaR, VaR reports the same number either way. <strong>ES walks into that left tail and takes the average.</strong> That's the whole conceptual difference: VaR is a threshold, ES is the average severity beyond it. Two portfolios can share identical VaR and have wildly different ES, and that difference is often what actually sinks an institution.</p>
  <p>The parametric versions just swap the sorted data for a smooth curve (normal for P&L, lognormal when prices can't go negative), so the quantile comes from a formula instead of a ranking.</p>`,

  eli5: `<p>Say you're a school nurse who has recorded how many students visited the sick bay every day for the past four years, about 1,000 school days. Sort those daily counts from calmest to worst, and you can say "on 95% of days, sick-bay visits stayed below this number." That's <strong>VaR</strong>: a threshold pulled straight from the sorted history. But the threshold tells you nothing about the worst 5% of days themselves. Was the worst day 20 visits or 200? To find out you'd have to go look at those bad days and average how bad they really were. That's <strong>Expected Shortfall</strong>: the average severity once you're already having a bad day. And if, instead of using the sorted real data, you assumed sick-bay visits follow a bell curve (a normal distribution) and calculated the threshold from a formula rather than counting, that's the <strong>parametric</strong> version of the same idea. Same question, just answered from a formula instead of raw history.</p>`,

  thinkLike: `<p>A market risk manager doesn't ask "what number can I report?" She asks "what decision does this number let me make, and what does it hide?" VaR is the number a CEO or regulator wants, because it's a single, comparable figure: "we could lose $1.5M with 95% confidence." A good risk manager immediately asks the follow-up the CEO didn't: <em>"and if we're wrong, if we land in that unlucky 5%, how bad does it actually get?"</em> That follow-up is Expected Shortfall. The fact that regulators eventually made ES the legal standard (FRTB, R16) tells you the exam treats "VaR is blind past its own threshold" as the single most important idea in this reading.</p>
  <p>On the exam, this reading is tested less as heavy computation and more as <strong>trap recognition</strong>: sign conventions (losses are always positive numbers), impossible orderings (VaR(99%) can never be less than VaR(95%)), verb precision (QQ plots "identify," never "prove" or "test"), and convention ambiguity (the 50th vs. 51st observation). A practitioner internalizes these as reflexes, because in a live risk report a sign error or an impossible VaR ordering is exactly the kind of mistake that gets a model pulled from production.</p>`,

  visual: `<div class="widget" data-widget="quantile"></div>`,

  formulas: [
    { name: "Historical simulation VaR — rank", math: "\\text{rank} = (\\alpha \\times n) + 1", note: "1,000 obs at 95% → 0.05×1000+1 = 51st worst observation. Some past exams use \\(\\alpha \\times n\\) = 50th. Follow the question's convention; \\((\\alpha n)+1\\) is the book answer.", plain: "Sort your n historical P&L or return observations from worst to best; the rank formula tells you which position in that sorted list is the VaR cutoff: the first observation that falls outside the α-tail." },
    { name: "Normal VaR (P&L form)", math: "\\text{VaR} = -\\mu_{\\text{P\\&L}} + \\sigma_{\\text{P\\&L}} \\times z_\\alpha", note: "z = 1.65 (95%), 2.33 (99%). Mean profit reduces VaR, so don't drop the \\(- \\mu\\) term.", plain: "The loss you're 95%/99% confident of not exceeding equals minus the average P&L plus a multiple (the z-score) of the P&L's standard deviation. A positive mean shrinks the loss; a wider spread of outcomes grows it.", derivation: "<p>Start from the normal quantile itself. If \\(X \\sim N(\\mu, \\sigma^2)\\) is P&L, the \\(\\alpha\\)-quantile of \\(X\\) (the point with \\(\\alpha\\) probability below it) is \\[ x_\\alpha = \\mu + \\sigma z_\\alpha \\] where \\(z_\\alpha\\) is the (negative, left-tail) standard normal critical value — e.g. \\(z_{0.05} = -1.65\\). VaR is defined as the positive loss number, i.e. \\(\\text{VaR} = -x_\\alpha\\), so \\[ \\text{VaR} = -(\\mu + \\sigma z_\\alpha) = -\\mu - \\sigma z_\\alpha \\] Substituting the convention that \\(z_\\alpha\\) is already reported as the positive critical value (1.65, 2.33, …) flips the sign on the second term, giving the working formula \\(\\text{VaR} = -\\mu + \\sigma z_\\alpha\\).</p>" },
    { name: "Lognormal VaR", math: "\\text{VaR} = P_0\\left[\\,1 - e^{\\,\\mu_R - \\sigma_R\\, z_\\alpha}\\right]", note: "Guarantees the implied worst-case price stays positive. For small \\(\\sigma\\) and short horizons it converges to normal VaR (e^x ≈ 1+x).", plain: "The dollar loss equals today's price times the fraction of value you'd lose if the price fell to its worst-case (lognormal) level, and that worst-case price can never fall below zero.", derivation: "<p>Assume the continuously-compounded return \\(R = \\ln(P_1/P_0)\\) is normal: \\(R \\sim N(\\mu_R, \\sigma_R^2)\\). The worst-case return at significance \\(\\alpha\\) is the normal quantile \\(R_\\alpha = \\mu_R - \\sigma_R z_\\alpha\\) (using the positive convention for \\(z_\\alpha\\)). Because \\(P_1 = P_0 e^{R}\\), the worst-case price is \\[ P_1^{\\alpha} = P_0\\, e^{\\,\\mu_R - \\sigma_R z_\\alpha} \\] which is always strictly positive no matter how bad \\(R_\\alpha\\) is — this is exactly why the lognormal model is chosen. The dollar VaR is the drop from today's price to that worst-case price: \\[ \\text{VaR} = P_0 - P_1^{\\alpha} = P_0\\left[\\,1 - e^{\\,\\mu_R - \\sigma_R z_\\alpha}\\right] \\]</p>" },
    { name: "Expected Shortfall", math: "\\text{ES} = E\\!\\left[\\,L \\mid L > \\text{VaR}\\,\\right] = \\text{average of tail VaRs}", note: "Slice the tail into n equal-probability pieces, average the slice VaRs; as n→∞ this converges to true ES.", plain: "ES is the average size of a loss on the days that are already worse than VaR: the expected severity once you're already in the bad-outcome region.", derivation: "<p>Divide the \\(\\alpha\\)-tail into \\(n\\) equal-probability slices (e.g. \\(n=5\\) slices of a 5% tail gives boundaries at 1%, 2%, 3%, 4%). Compute the VaR at each of the \\(n-1\\) interior boundaries, then average: \\[ \\text{ES} \\approx \\dfrac{1}{n-1}\\sum_{i=1}^{n-1} \\text{VaR}_{\\,i/n \\cdot \\alpha} \\] Worked example from the source: at \\(n=5\\), the four boundary VaRs average to 2.003; increasing \\(n\\) drives the estimate toward the true value of 2.063 (the exact conditional tail mean). As \\(n \\to \\infty\\), the sum becomes the integral \\(E[L \\mid L > \\text{VaR}]\\), the formal definition of ES.</p>" },
    { name: "Standard error of a quantile", math: "\\text{SE}(q) = \\dfrac{\\sqrt{p(1-p)/n}}{f(q)}", note: "More data (n↑) → tighter. Wider bins (f(q)↑) → tighter. Drives the 'how much can I trust this VaR' confidence interval.", plain: "The precision of an estimated quantile depends on how much data you have (n), how likely that tail probability is (p), and how much probability mass is packed around that point on the density (f(q)). More data and a fatter local density both shrink the error." }
  ],

  concepts: [
    {
      name: "Arithmetic vs geometric returns",
      def: "Arithmetic return: simple P&L over the period, no reinvestment of interim payments. Geometric (continuously compounded) return: ln-based, assumes reinvestment, and guarantees the implied price can never go negative.",
      intuition: "Arithmetic is fine when the horizon is short and moves are small. Geometric is the honest choice for longer horizons, and it's the mathematical cousin of the lognormal VaR model.",
      example: "For small returns the two are nearly identical (ln(1.02) ≈ 0.0198). The gap widens with big moves and long horizons.",
      pitfall: "Sign convention: FRM quotes VaR and losses as positive numbers even though the quantile is mathematically negative. An answer choice with the wrong sign is automatically wrong, an easy point if you catch it.",
      related: ["Lognormal VaR", { r: 12, label: "R12 — convexity of 1/(1+r)" }],
      memory: "Geometric = 'growth': can't grow below zero."
    },
    {
      name: "Historical simulation VaR",
      def: "Sort the n historical returns worst-to-best; VaR is the observation at rank \\((\\alpha \\times n)+1\\), the loss that cuts the worst \\(\\alpha\\)% off.",
      intuition: "Zero distributional assumptions: the data IS the distribution. That's its strength (handles skew and fat tails automatically) and its weakness (it can't imagine anything worse than what already happened).",
      example: "1,000 monthly returns, 95% → 51st worst. If that return is −15.5% on a $1,000,000 position, monthly VaR = $155,000.",
      counter: "An IPO with three months of history, or a market that just shifted regimes: HS has nothing valid to sort. That failure motivates mapping (R5) and weighting (R2).",
      pitfall: "The 50th-vs-51st observation ambiguity has genuinely been tested both ways. Know both conventions and follow the question.",
      related: [{ r: 2, label: "R2 — weighted HS fixes equal weighting" }, { r: 3, label: "R3 — EVT fixes the unseen-tail problem" }],
      memory: "HS = 'History Sorted.'"
    },
    {
      name: "Parametric VaR (normal / lognormal)",
      def: "Assume a distribution for P&L (normal) or returns (lognormal); VaR falls out of the distribution's quantile formula instead of the empirical ranking.",
      intuition: "You trade data-hunger for assumption-risk. The formula needs only \\(\\mu\\) and \\(\\sigma\\), but if the true tail is fatter than normal, your VaR ends up systematically too small in exactly the states that matter.",
      example: "XYZ's annual P&L is normal with mean $15M, SD $10M. VaR(5%) = −$15M + $10M×1.65 = $1.5M; VaR(1%) = −$15M + $10M×2.33 = $8.3M. Deeper confidence ⇒ larger VaR, always. Same formula on arithmetic returns instead of dollar P&L: a $100 portfolio whose return is normal with mean 10%, SD 20% gives VaR(5%) = −[0.10 − 0.20×1.65]×$100 = $23, i.e. 23% of the position at risk at 95% confidence.",
      counter: "If a question shows VaR(99%) < VaR(95%), that's an impossibility being tested, not a computation.",
      pitfall: "Normal and lognormal VaR converge for small \\(\\sigma\\) and short horizons (e^x ≈ 1+x). Don't be surprised when the two 'agree': recognizing the convergence is itself the question.",
      related: ["QQ plots — checking the assumption", { r: 15, label: "R15 — the market itself rejects lognormal (smiles)" }]
    },
    {
      name: "Expected Shortfall",
      def: "The probability-weighted average loss GIVEN that the VaR threshold has been breached: ES = E[L | L > VaR].",
      intuition: "VaR asks 'where does the tail start?'; ES asks 'how bad is it in there, on average?' Computed as the average of VaRs at deeper and deeper confidence levels within the tail.",
      example: "Slice the 5% tail into 5 equal slices, read the VaR at each boundary, average them. More slices → converges to true ES.",
      pitfall: "ES ≥ VaR at the same confidence level, always, for any distribution: an average of losses each at least as bad as VaR cannot be smaller than VaR.",
      related: [{ r: 16, label: "R16 — FRTB makes 97.5% ES the law" }, "Coherent risk measures"],
      memory: "VaR is the door to the tail; ES is the average temperature inside."
    },
    {
      name: "Coherent risk measures",
      def: "A weighted average of quantiles across the ENTIRE distribution, with weights given by a chosen risk-aversion function. ES is the special case where the weight is 1/(1−c) inside the tail and zero elsewhere.",
      intuition: "The general recipe says: express how much you dislike each part of the loss distribution, then average with those dislikes as weights. ES's 'dislike function' is an indicator: only the tail counts, equally.",
      pitfall: "'Coherent risk measure' ≠ 'ES.' ES is ONE example. The general coherent measure weights every quantile, not just tail quantiles. The exam treats them as interchangeable to catch you out.",
      example: "Worked illustration from the source with n=10: split the whole loss distribution (not just the tail) into 9 equal-probability slices at the 10%, 20%, …, 90% quantiles. Under a standard normal, the 10% quantile is −1.2816, the 20% quantile is −0.8416, …, the 90% quantile is +1.2816. Multiply each quantile by the analyst's own risk-aversion weight (not equal weights, unlike ES) and average; that average is the coherent risk measure. To decide how many slices (n) is enough, start small and keep doubling n. Each doubling halves the slice width, and you track the resulting change in the estimate (the 'halving error'). Once the halving error is near zero, the estimate has converged and you can stop.",
      related: [{ r: 6, label: "R6 — spectral measures & subadditivity" }],
      memory: "Coherent = whole distribution, chosen weights; ES = tail only, flat weights."
    },
    {
      name: "Standard errors & confidence intervals for risk estimates",
      def: "An estimated VaR/ES is a statistic with sampling error: SE(q) = \\(\\sqrt{p(1- p)/n}/f(q)\\), giving a confidence band around the risk number itself.",
      intuition: "A VaR of $10M estimated from 100 observations and one estimated from 10,000 are not equally trustworthy, and the SE quantifies exactly how much. Note that the confidence interval around the quantile is a two-tailed construction (a critical value on each side), even though VaR itself is a one-tailed concept. A 90% CI leaves 5% probability in each tail of the CI, which is why it happens to reuse the same z=1.65 critical value as the 5% VaR in the worked example below (a coincidence of the numbers chosen, not a rule).",
      example: "Worked example from the source: build a 90% CI for the 5% VaR (the 95% quantile) of a standard normal, with bin width h=0.1 and n=500 observations. The quantile itself is q=1.65. The bin sits at q±h/2, i.e. between 1.60 and 1.70. From the z-table, P(Z>1.70)=0.045 and P(Z<1.60)=0.945, so the probability mass inside the bin is f(q)=1−0.045−0.945=0.01. Plug p=0.05 (the tail probability), n=500, and f(q)=0.01 into SE(q)=√[p(1−p)/n]/f(q) to get the standard error, then build the CI as q±1.65×SE(q). Comparative statics the exam tests: n↑ → SE↓. Bin width h↑ → f(q)↑ → SE↓. p toward 0.5 → p(1−p)↑ → SE↑ (maximized exactly at p=0.5).",
      pitfall: "Deep-tail quantiles have few data points supporting them, which is the tension that motivates EVT (R3). Don't confuse this with the SE formula's own behavior: the formula says SE can actually be *smaller* at extreme p, because p(1−p) shrinks as p moves away from 0.5. The real problem with deep tails is data scarcity, not the formula.",
      related: [{ r: 3, label: "R3 — EVT for data-starved tails" }]
    },
    {
      name: "QQ plots",
      def: "Plot empirical quantiles against theoretical quantiles of a reference distribution. Same family → straight 45° line; fat tails → matches in the middle, diverges at the ends.",
      intuition: "It's a face-to-face lineup of 'what my data did' vs 'what the model says it should have done', quantile by quantile. The divergence pattern in the tails is the visual signature of crash risk the normal understates.",
      example: "Comparing a standard normal (theoretical) to a fat-tailed t-distribution (empirical): at 95% confidence the normal critical value is z=−1.65 while the t-distribution (≈40 degrees of freedom) sits further out at ≈−1.68; at 97.5% confidence the gap widens further, normal z=−1.96 vs t≈−2.02. Near the median (50% quantile) both plot almost exactly at zero, so the QQ line is straight in the middle and bends away from the 45° line only at the ends. That bend is the diagnostic signature of fat tails.",
      pitfall: "QQ plots are a visual, diagnostic tool only: they 'identify' or 'inspect', not 'test' or 'prove', a distributional assumption. That verb distinction is a tested trap.",
      related: [{ r: 3, label: "R3 — what to do once you see fat tails" }]
    }
  ],

  connections: {
    from: [
      { label: "FRM Part I", why: "Normal distribution, z-scores, and quantiles are assumed fluent. If z=1.65/2.33 isn't instant recall, drill that first." }
    ],
    to: [
      { r: 2, why: "Non-parametric fixes for historical simulation's equal-weighting problem." },
      { r: 3, why: "EVT replaces 'hope the tail is normal' with a distribution built only for tails." },
      { r: 4, why: "Backtesting audits whether the VaR you computed here actually works." },
      { r: 5, why: "Mapping lets this machinery run on real many-position portfolios." },
      { r: 16, why: "FRTB writes the VaR→ES upgrade into law at 97.5% confidence." },
      { r: 26, why: "Credit VaR reuses the quantile-minus-mean logic on a skewed loss distribution." },
      { r: 85, why: "Book 5 decomposes exactly this portfolio VaR into marginal/component pieces." }
    ],
    confused: [
      { what: "VaR confidence level vs backtest confidence level", how: "The 95% used to compute VaR and the 95% used to test exception counts are separate choices that happen to share a number (see R4)." },
      { what: "ES vs coherent risk measure", how: "ES is one member of the coherent family: the tail-only, equal-weight member." },
      { what: "P&L data vs return data", how: "Normal VaR formula uses \\(- \\mu +\\sigma z\\) on P&L; lognormal works on returns then converts through \\(P_{0}\\). Mixing the two forms is a classic calculation error." }
    ]
  },

  misconceptions: [
    { wrong: "\"VaR tells you how bad losses can get at the 95% level.\"", right: "VaR tells you the best of the worst 5%, a threshold, not a worst case. It says nothing about severity beyond itself; that's ES's job." },
    { wrong: "\"VaR(99%) < VaR(95%) is possible if the data is weird.\"", right: "Never. Deeper confidence always means an equal-or-larger VaR. Answer choices that reverse the ordering are automatically wrong." },
    { wrong: "\"The QQ plot proves returns are non-normal.\"", right: "QQ plots are visual diagnostics: they suggest, identify, inspect. 'Test' or 'prove' language is the trap." },
    { wrong: "\"Lognormal VaR and normal VaR should give clearly different answers.\"", right: "For small \\(\\sigma\\) and short horizons they converge (e^x ≈ 1+x). Recognizing convergence is itself a tested skill." },
    { wrong: "\"More extreme quantiles are always estimated less precisely.\"", right: "SE depends on \\(p(1- p)/f(q)^{2}\\), and p(1−p) is maximized at p=0.5. The real problem with deep tails is fewer supporting data points, which is the EVT motivation, not the SE formula per se." }
  ],

  highYield: [
    { stars: 5, what: "Normal VaR = \\(- \\mu\\) + \\(\\sigma z\\) and the two z-values (1.65, 2.33).", why: "Appears in more questions across Part II than any other formula: market VaR, credit VaR inputs, portfolio VaR, FRTB comparisons." },
    { stars: 5, what: "ES = average tail loss, ES ≥ VaR always, and WHY VaR's tail-blindness matters.", why: "The conceptual spine of R6 (subadditivity), R16 (FRTB), and multiple 'which measure is better' questions." },
    { stars: 4, what: "Historical simulation ranking: \\((\\alpha n)+1\\) convention, and the 50th/51st ambiguity.", why: "A cheap calculation question with a deliberately planted convention trap." },
    { stars: 4, what: "SE comparative statics (n, h, p directions).", why: "Tested as 'what happens to the confidence interval if…', with no computation, pure direction." },
    { stars: 3, what: "Lognormal VaR formula and its convergence to normal VaR.", why: "Less frequent, but the convergence insight is a recurring distractor." },
    { stars: 3, what: "Coherent risk measure = whole-distribution weighted quantiles.", why: "One-line concept check; the ES-is-a-special-case distinction earns the point." }
  ],

  recall: [
    { q: "Explain to a non-quant colleague why two portfolios with identical 95% VaR can have very different risk.", a: "VaR only marks the threshold where the worst 5% begins. One portfolio's tail might lose 1.1× VaR on bad days, another's 10× VaR. ES exposes this because it averages the tail; VaR is blind to it by construction." },
    { q: "You have 500 daily returns and want 99% HS VaR. Which observation do you take, and what's the ambiguity?", a: "0.01×500 = 5 tail observations; book convention takes the (5+1) = 6th worst. Some exams use the 5th worst \\((\\alpha n)\\). Follow the stated convention; default to \\((\\alpha n)+1\\)." },
    { q: "Why does the lognormal model guarantee prices can't go negative, and when does that guarantee stop mattering numerically?", a: "Returns are modeled as \\(ln(P_{1}/P_{0})\\), so the implied price is \\(P_{0}\\cdot e^r\\) > 0 always. For small \\(\\sigma /short\\) horizons e^x ≈ 1+x, so lognormal and normal VaR converge: the guarantee is there but the numbers barely differ." },
    { q: "What happens to the SE of a quantile estimate if you increase the bin width h?", a: "Wider bins capture more probability mass, raising f(q), which sits in the denominator, so SE falls and the confidence interval narrows." },
    { q: "Why is ES described as 'the average of VaRs'? What limit makes this exact?", a: "Slice the tail into n equal-probability slices and average the VaR at each slice boundary; as n→∞ the average converges to E[L | L > VaR], the true ES." }
  ],

  hooks: [
    { title: "The ruler", text: "R1 builds a ruler for risk. R2 sands its rough edges, R3 extends it past the last marking, R4 checks it against reality, R16 makes the government stamp it. When lost anywhere in Book 1, ask: what is this reading doing to the ruler?" },
    { title: "The door and the room", text: "VaR is the door into the tail-room; ES is the average temperature inside the room. Regulators eventually decided they cared about the room, not the door (FRTB)." },
    { title: "51, not 50", text: "1,000 observations at 95%: 50 observations belong to the tail, so the VaR observation is the 51st, the first one not in the tail. 'The tail has 50 residents; VaR is the doorman.'" }
  ],

  breakdown: [
    {
      title: "The three ways to compute VaR",
      points: [
        "Historical simulation: sort n real historical P&L/return observations worst-to-best and read off the observation at rank (α×n)+1. Zero distributional assumption, but only as imaginative as the data you already have.",
        "Normal (parametric) VaR: assume P&L is normally distributed with mean μ and SD σ; VaR = −μ + σ×z_α, using z=1.65 (95%) or z=2.33 (99%). Needs only two numbers, but is only as good as the normality assumption.",
        "Lognormal (parametric) VaR: assume the continuously-compounded RETURN is normal; VaR = P0×[1 − e^(μ_R − σ_R×z_α)]. Guarantees the implied worst-case price can never fall below zero, which the normal P&L version doesn't guarantee."
      ]
    },
    {
      title: "VaR vs Expected Shortfall vs coherent risk measure",
      points: [
        "VaR: weights a single point (the threshold quantile) and nothing else; not coherent (fails subadditivity, covered in R6).",
        "Expected Shortfall: weights only the tail, and weights every point inside the tail equally (weight = 1/(1−c)); IS coherent.",
        "Coherent risk measure (general): weights the ENTIRE distribution, using whatever risk-aversion weighting function the analyst chooses; ES is the special case where that weighting function happens to be an indicator function (1 inside the tail, 0 outside)."
      ]
    },
    {
      title: "Standard-error comparative statics (the 'what happens if…' drill)",
      points: [
        "More data, n↑ → standard error falls → the confidence interval around your VaR/ES estimate narrows (more trustworthy number).",
        "Wider histogram bin, h↑ → more probability mass is captured near the quantile, so f(q)↑ → standard error falls → narrower interval.",
        "Tail probability p moves toward 0.5 (a less extreme quantile) → p(1−p) rises (it's maximized exactly at p=0.5) → standard error rises → wider interval; deep-tail quantiles are technically 'more precise' by this formula, but in practice have far fewer supporting data points, which is the real motivation for EVT (R3)."
      ]
    }
  ],

  quiz: [
    {
      q: "You have 1,000 sorted daily P&L observations (worst to best) and want 95% historical simulation VaR using the book's rank convention. Which observation is VaR?",
      options: ["The 50th worst observation", "The 51st worst observation", "The 500th worst observation", "The 950th worst observation"],
      answer: 1,
      why: "Rank = (α×n)+1 = (0.05×1000)+1 = 51. The 50th-worst answer is the other convention that has also appeared on past exams, not wrong knowledge, but not the book's default; know both and follow whichever the question specifies."
    },
    {
      q: "XYZ's annual P&L is normally distributed with mean $15M and SD $10M. What is the 99% VaR?",
      options: ["$1.5 million", "$8.3 million", "$15 million", "$25 million"],
      answer: 1,
      why: "VaR = −μ + σz = −15 + 10×2.33 = $8.3M. $1.5M is the 95% VaR (uses z=1.65), a tempting distractor if you grab the wrong z-value. $25M double-counts by adding instead of using the z-multiple correctly, and $15M ignores the SD term entirely."
    },
    {
      q: "Portfolio A and Portfolio B report identical 95% VaR. What can you conclude about their risk?",
      options: ["They have identical risk in every respect", "They have identical tail severity beyond the 95% threshold", "Nothing about tail severity — ES could differ enormously even though VaR matches", "Portfolio B must have a fatter tail than Portfolio A"],
      answer: 2,
      why: "VaR only marks where the tail begins; it is blind to everything beyond it. Two portfolios can share a VaR while one's tail losses average 1.1×VaR and the other's average 10×VaR, and that gap only shows up in ES. The 'identical risk in every respect' and 'identical tail severity' answers wrongly assume VaR captures severity; the 'B must have a fatter tail' answer assumes a difference the question gives no basis for."
    },
    {
      q: "Which statement about Expected Shortfall (ES) and VaR is always true, for any distribution?",
      options: ["VaR ≥ ES at the same confidence level", "ES ≥ VaR at the same confidence level", "ES and VaR are equal for normal distributions only", "ES can be less than VaR if the tail is thin enough"],
      answer: 1,
      why: "ES is an average of losses that are each already at least as bad as VaR, so the average cannot be smaller than VaR. ES ≥ VaR always, by construction, regardless of the distribution. Any answer allowing ES < VaR is describing a mathematical impossibility."
    },
    {
      q: "A coherent risk measure is best described as:",
      options: ["Another name for Expected Shortfall", "A weighted average of quantiles across the entire loss distribution, with user-chosen weights", "A risk measure that only applies to normally distributed returns", "A measure that ignores the tail of the distribution entirely"],
      answer: 1,
      why: "Coherent risk measures generalize ES: they weight every quantile of the distribution (not just the tail) using a risk-aversion function the analyst specifies. ES is one particular coherent risk measure (indicator weighting, tail-only); treating 'coherent' and 'ES' as synonyms is the exact trap the exam sets."
    },
    {
      q: "A QQ plot comparing empirical returns to a normal distribution matches closely near the median but diverges sharply in both tails. What is the correct way to describe this result?",
      options: ["The QQ plot proves the data is not normally distributed", "The QQ plot tests and rejects the normality assumption at the 5% level", "The QQ plot visually identifies that the empirical data has fatter tails than the normal distribution", "The QQ plot confirms the data follows a lognormal distribution"],
      answer: 2,
      why: "QQ plots are a visual diagnostic: they let you identify or inspect distributional characteristics, never 'prove' or formally 'test' them (that requires an actual statistical test). Divergence only in the tails, with the middle matching, is the textbook signature of fat tails, not a claim about lognormality, which the plot says nothing about here."
    }
  ],

  sources: [
    { title: "Value at Risk (VaR) — Investopedia", url: "https://www.investopedia.com/terms/v/var.asp", note: "Plain-language walkthrough of VaR's definition, the three estimation methods, and its main criticisms — a good pre-read before the formulas." },
    { title: "Expected Shortfall — Wikipedia", url: "https://en.wikipedia.org/wiki/Expected_shortfall", note: "Formal definition of ES as a conditional tail expectation, with the coherence (subadditivity) proof sketch referenced in this reading." },
    { title: "Coherent risk measure — Wikipedia", url: "https://en.wikipedia.org/wiki/Coherent_risk_measure", note: "The four axioms (monotonicity, subadditivity, homogeneity, translation invariance) that define coherence — useful background for why VaR fails and ES passes." },
    { title: "Minimum capital requirements for market risk (FRTB) — BIS", url: "https://www.bis.org/bcbs/publ/d457.htm", note: "The regulatory document that later replaces VaR with 97.5% ES as the standard capital measure — the destination this reading's ruler is built for (see R16)." }
  ],

  pdf: { book: 1, query: "the focus is on the estimation of market risk measures" },

  summary: `<p><strong>VaR</strong> = the loss threshold at a confidence level; compute it by ranking history (HS), or from \\(- \\mu +\\sigma z\\) (normal P&L), or \\(P_{0}[1- e^{\\mu - \\sigma z}]\\) (lognormal returns). <strong>ES</strong> = average loss beyond VaR; always ≥ VaR; it's the tail-severity fix and the future regulatory standard. <strong>Coherent measures</strong> generalize ES with arbitrary quantile weights. Every estimate carries a <strong>standard error</strong>, so know the n/h/p directions. <strong>QQ plots</strong> visually diagnose (never 'prove') distributional fit and reveal the fat tails that motivate the rest of the book. Sign convention: losses quoted positive. Ranking convention: \\((\\alpha n)+1\\), but follow the question.</p>`
});
