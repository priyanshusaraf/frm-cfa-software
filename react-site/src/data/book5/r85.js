export default ({
  book: 5, reading: 85,
  session: "Risk Management and Investment Management",
  title: "Portfolio Risk: Analytical Methods",
  tagline: "Decomposing portfolio risk into marginal, incremental, and component VaR — the toolkit for actually managing (not just measuring) a multi-position portfolio's risk.",

  teaches: `<p>Diversified vs undiversified vs individual VaR, the role of correlation (uncorrelated and perfectly-correlated bounds), marginal VaR, incremental VaR (and its shortcut approximation), component VaR, using marginal VaR to find the risk-minimizing portfolio, and the excess-return-to-marginal-VaR ratio for finding the OPTIMAL (not just minimum-risk) portfolio.</p>`,

  why: `<p>This is Book 1's VaR machinery (R1, R5) applied to the specific job of managing a live multi-asset portfolio: which position should I trim, which should I add to, and where's the genuinely optimal (not just lowest-risk) allocation? A risk manager who can only report "our VaR is $2 million" is describing the portfolio; a risk manager who can say "cutting Position A by $1 would lower VaR by $0.12, and Position A is also delivering the best return per unit of that risk" is actually managing it. That is the entire point of this reading — turning one aggregate VaR number into a set of position-by-position dials the manager can actually turn.</p>`,

  intuition: `<p>Start with why portfolio VaR is even a hard problem: if you just added up each position's stand-alone VaR, you would badly overstate the portfolio's real risk, because positions rarely move in lockstep — some losses on one position are offset by gains on another. Correlation (\\(\\rho\\)) sets the BOUNDS on how much of that offsetting benefit you actually get. \\(\\rho =0\\) (the two positions' returns are statistically unrelated) gives the LOWER bound, \\(VaR_P=\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}}\\) — the same "add in quadrature" trick you'd use for any two independent random errors. \\(\\rho =1\\) (the two positions always move together, in the same direction, by the same proportion) gives the UPPER bound, \\(VaR_P=VaR_{1}+VaR_{2}\\), called the "undiversified" VaR because it is exactly what you'd get by pretending diversification does nothing and simply stacking the two risks on top of each other. Any real portfolio, with real (partial, imperfect) correlation between its positions, has a true VaR that sits somewhere between those two numbers — closer to the lower bound the more the positions genuinely diversify each other, closer to the upper bound the more they move together.</p>
  <p>Once you accept that portfolio VaR is a single number that depends on how the pieces interact, the next question a manager actually needs answered is: "if I nudge one position, what happens to that number?" That's MARGINAL VaR — the per-unit-change sensitivity (mathematically, \\(\\partial VaR_P/\\partial(\\text{position})\\)), conveniently computed as \\((VaR_P/\\text{portfolio value})\\times \\beta_{i}\\), where \\(\\beta_i\\) is the same regression-based beta you know from CAPM, just regressing position \\(i\\)'s return on the WHOLE PORTFOLIO's return instead of on the market. A high \\(\\beta_i\\) means that position tends to amplify whatever the portfolio as a whole is doing, so a dollar added there raises portfolio VaR more than a dollar added to a low-beta position. INCREMENTAL VaR answers a related but different question: not "what's the instantaneous slope at this position?" but "how much does VaR actually change if I add this whole NEW position?" In principle that requires a full portfolio revaluation — recomputing the entire covariance matrix with the new position folded in, which is genuinely expensive once you have hundreds or thousands of positions. The workaround, valid for SMALL additions, is to reuse the marginal VaR numbers you likely already have: break the new position into its risk factors, and take the dot product of that risk-factor vector with the portfolio's existing vector of marginal VaRs. It's cheap precisely because it recycles information the desk already has on hand, at the cost of ignoring nonlinear effects that only a full revaluation would catch.</p>
  <p>COMPONENT VaR asks a third, complementary question: "if I deleted this position ENTIRELY, how much would total portfolio VaR fall?" It's computed as \\(CVaR_i = MVaR_i \\times (w_i \\times P) = VaR_P\\times \\beta_i\\times w_i\\) — marginal VaR (the per-dollar sensitivity) times the dollar size of the position (so it scales up to the position's actual size, not just one marginal dollar). The single most useful property of component VaR is that, unlike stand-alone individual VaRs, the component VaRs of every position in the portfolio SUM EXACTLY to total portfolio VaR — no double counting, no leftover unallocated risk. That makes it the natural tool for risk attribution: "of our $400,000 total VaR, Asset A accounts for $120,000 of it."</p>
  <p>The critical distinction for portfolio MANAGEMENT (not just risk measurement) is this: setting all marginal VaRs EQUAL across positions gives you the MINIMUM-VARIANCE portfolio — the lowest possible VaR for the given capital — but that is not the OPTIMAL portfolio, because it says nothing about return. A position can have a low marginal VaR and also a lousy expected return, in which case shrinking VaR by favoring it is actually a bad trade. The optimal portfolio instead equates the EXCESS-RETURN-TO-MARGINAL-VaR ratio across all positions — the VaR-based analogue of the tangency condition that defines the Sharpe-optimal portfolio on the mean-variance efficient frontier, just with VaR standing in for standard deviation. A portfolio can sit exactly at the lowest possible risk and still be leaving return on the table; risk MANAGEMENT (minimize risk) and portfolio MANAGEMENT (maximize risk-adjusted return) are different jobs with different answers.</p>`,

  eli5: `<p>Picture four roommates sharing an apartment, and think of the total noise level in the apartment as your "portfolio risk." If each roommate's music, alone in a silent room, would register 70 decibels, you might guess the apartment's total noise is just those numbers added up — but that overstates it, because the sounds partly overlap and mask each other (that's diversification: not all roommates are loud at the same time, in the same way). <strong>Marginal VaR</strong> is like asking "if Roommate A turns their volume up by one notch, how much louder does the WHOLE apartment get?" — it depends on how correlated Roommate A's noise already is with everyone else's, not just how loud A is alone. <strong>Incremental VaR</strong> is what happens when a whole new roommate moves in with all their gear — the actual jump in total noise, which you'd ideally measure by re-listening to the whole apartment, but can approximate cheaply using what you already know about each existing roommate's marginal effect. <strong>Component VaR</strong> is "how much quieter would it get if Roommate A moved out entirely" — and the neat trick is that if you add up each roommate's component contribution, it exactly equals the apartment's total noise, with nothing left over. In finance terms: marginal VaR is the sensitivity of portfolio VaR to a position, incremental VaR is the real change from adding a whole new position, and component VaR is each position's exact share of total portfolio VaR.</p>`,

  thinkLike: `<p>A risk manager sitting on a multi-asset book does not treat portfolio VaR as a single static number to report once a quarter — they treat it as a dashboard of dials, one per position, and marginal VaR is what tells them which dial to turn and in which direction. If you want to cut total risk with the least disruption, you trim the positions with the HIGHEST marginal VaR first and add to the ones with the lowest — that is literally how you walk the portfolio toward the minimum-variance point where all marginal VaRs are equal. But a good risk manager immediately asks the follow-up question the exam loves to test: is minimum-variance actually what we want? Almost never in isolation — because the desk is being paid to earn a return, not just to minimize a number. So the practitioner's real workflow is: (1) use marginal VaR to see the current risk allocation, (2) use component VaR to see and report exactly how much of the total risk budget each position is eating (and confirm the components sum to the whole, a built-in sanity check), (3) compute each position's excess-return-to-marginal-VaR ratio, and (4) shift capital toward positions with the highest ratio and away from the lowest, moving the whole portfolio toward the point where all ratios are equal — the actually-optimal allocation. The exam tests this by presenting you with marginal VaRs and expected excess returns and asking which position's allocation should rise; the trap answer is always the one that just eyeballs "lower marginal VaR = better," ignoring that the position might also have a low return. Separately, expect the exam to test the marginal-vs-incremental distinction as a cost/accuracy trade-off question (full revaluation: expensive but exact; marginal-VaR shortcut: cheap but approximate, valid only for small additions) rather than as a definitions question.</p>`,

  visual: `<div class="widget" data-widget="compvar" data-unit="$" data-compvar='[{"label":"Asset A ($4M, σ=6%, MVaR=0.0644)","cvar":257713},{"label":"Asset B ($2M, σ=14%, MVaR=0.1754)","cvar":350777}]'></div>`,

  formulas: [
    { name: "Individual VaR", math: "VaR_{i} = Z_c \\times \\sigma_{i} \\times |w_{i}| \\times P", note: "Absolute value of weight — both long and short positions carry risk.", plain: "This is just the standard single-asset VaR formula applied to one position in isolation, ignoring how it interacts with the rest of the portfolio." },
    { name: "Portfolio VaR — uncorrelated (lower bound)", math: "VaR_P = \\sqrt{VaR_{1}^{2} + VaR_{2}^{2}}", note: "\\(\\rho =0\\). \\(VaR_{1}=\\)$2.4M, \\(VaR_{2}=\\)$1.6M → \\(VaR_P=\\sqrt{2.4^{2}+1.6^{2}}=\\)$2.88M.", plain: "When two positions' returns are statistically unrelated, their risks partly cancel out, so total portfolio VaR is smaller than simply adding the two VaRs — it behaves like the hypotenuse of a right triangle with the individual VaRs as the two legs.", derivation: "<p>Start from the two-asset portfolio variance formula: \\[\\sigma_P^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\rho_{1,2}\\sigma_1\\sigma_2\\] When \\(\\rho_{1,2}=0\\), the cross term vanishes: \\[\\sigma_P^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2\\] Multiply both sides by \\(Z_c^2 P^2\\) and take the square root. Since \\(VaR_i = Z_c\\sigma_i |w_i| P\\), each term on the right is exactly \\(VaR_i^2\\): \\[VaR_P = \\sqrt{VaR_1^2 + VaR_2^2}\\]" },
    { name: "Portfolio VaR — perfectly correlated (upper bound)", math: "VaR_P = VaR_{1} + VaR_{2}\\;(\\text{undiversified VaR})", note: "\\(\\rho =1\\), no diversification benefit — the sum of individual VaRs.", plain: "When two positions always move together in the same direction, there is no offsetting benefit at all, so the portfolio's VaR is simply the sum of the two positions' stand-alone VaRs — the worst-case, no-diversification scenario.", derivation: "<p>With \\(\\rho_{1,2}=1\\), the variance formula becomes a perfect square: \\[\\sigma_P^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\sigma_1\\sigma_2 = (w_1\\sigma_1 + w_2\\sigma_2)^2\\] Taking the square root and scaling by \\(Z_cP\\): \\[VaR_P = Z_cP(w_1\\sigma_1+w_2\\sigma_2) = Z_c P w_1\\sigma_1 + Z_c P w_2\\sigma_2 = VaR_1 + VaR_2\\] This is why it's called \\(\\text{undiversified VaR}\\) — it's exactly what you'd get by ignoring diversification and stacking the risks." },
    { name: "Marginal VaR", math: "MVaR_{i} = \\left(\\dfrac{VaR_P}{\\text{portfolio value}}\\right) \\times \\beta_{i}", note: "\\(\\beta_{i}\\) from regressing position i's return on total portfolio return.", plain: "This says the portfolio VaR changes, per one extra dollar invested in position i, by the ratio of total VaR to total portfolio value, scaled up or down by how strongly that position's returns track the whole portfolio's returns.", derivation: "<p>Marginal VaR is formally the partial derivative of portfolio VaR with respect to the dollar size of position \\(i\\): \\(MVaR_i = \\partial VaR_P/\\partial(\\text{position}_i)\\). Regressing position \\(i\\)'s return on the total portfolio's return gives a beta \\[\\beta_i = \\dfrac{\\text{Cov}(R_i, R_P)}{\\sigma_P^2}\\] which packages up the covariance of that position with the whole portfolio in one number. Substituting through the VaR chain rule and simplifying yields the working formula \\[MVaR_i = \\left(\\dfrac{VaR_P}{\\text{portfolio value}}\\right)\\times \\beta_i\\] — the total risk-to-value ratio, rescaled by how much that one position amplifies or dampens the portfolio's overall movement." },
    { name: "Incremental VaR (shortcut)", math: "IVaR \\approx [\\,\\text{new position's risk-factor vector}\\,] \\cdot [\\,\\text{vector of marginal VaRs}\\,]", note: "Cheaper than full portfolio revaluation for small position additions.", plain: "This approximates the actual VaR change from adding a whole new position by breaking that position into its underlying risk factors and multiplying each risk-factor exposure by the portfolio's already-known sensitivity (marginal VaR) to that same risk factor, then summing the products." },
    { name: "Component VaR", math: "CVaR_{i} = MVaR_{i} \\times (w_{i}\\times P) = VaR_P \\times \\beta_{i} \\times w_{i}", note: "Sums exactly across all i to total portfolio VaR — a clean decomposition.", plain: "This scales the per-dollar marginal VaR up to the position's actual dollar size, giving the exact slice of total portfolio VaR attributable to that one position — and these slices add up perfectly to the whole.", derivation: "<p>Start from the definition \\(CVaR_i = MVaR_i \\times (w_i \\times P)\\), and substitute the working formula for marginal VaR, \\(MVaR_i = (VaR_P/P)\\times\\beta_i\\): \\[CVaR_i = \\left(\\dfrac{VaR_P}{P}\\right)\\beta_i \\times (w_i \\times P) = VaR_P \\times \\beta_i \\times w_i\\] The \\(P\\) cancels cleanly. Because each \\(\\beta_i\\) is itself defined as \\(\\rho_i\\sigma_i/\\sigma_P\\), and because portfolio variance decomposes exactly into the weighted sum \\(\\sum_i w_i \\beta_i = 1\\), summing \\(CVaR_i\\) over every position in the portfolio collapses back to exactly \\(VaR_P\\) — no approximation, no leftover residual." },
    { name: "Risk-minimizing condition", math: "\\text{MVaR}_i = \\text{MVaR}_j\\quad\\text{for all }i,j", note: "Equal marginal VaRs → global minimum-VARIANCE portfolio (NOT necessarily optimal).", plain: "This says total portfolio risk is as low as it can possibly get, for the given capital, exactly when every position contributes the same marginal risk at the margin — if any two differed, you could shift a dollar from the higher-marginal-VaR position to the lower one and reduce total VaR further." },
    { name: "Optimal (not just minimum-risk) portfolio condition", math: "\\dfrac{\\text{excess return}_i}{\\text{MVaR}_i} = \\dfrac{\\text{excess return}_j}{\\text{MVaR}_j}\\quad\\text{for all }i,j", note: "Equating excess-return-to-marginal-VaR ratios gives the OPTIMAL portfolio — the VaR-based Sharpe-tangency condition.", plain: "This says the portfolio is truly optimal exactly when every position delivers the same amount of extra return per unit of marginal risk it contributes — if one position offered more return per unit of marginal VaR than another, shifting capital toward it would raise the portfolio's overall risk-adjusted return.", derivation: "<p>Recall the tangency (maximum Sharpe ratio) portfolio on the mean-variance efficient frontier maximizes \\[\\dfrac{E(R_P) - R_f}{\\sigma_P}\\] Replace the denominator's standard deviation with VaR, giving an excess-return-to-VaR ratio for the whole portfolio: \\[\\dfrac{E(R_P)-R_f}{VaR_P}\\] This ratio is maximized precisely when the excess return contributed by each position, divided by that position's marginal VaR, is the same constant across every position — otherwise capital could be reallocated toward the higher-ratio position to raise the whole ratio further. That equal-ratio condition is exactly \\[\\dfrac{\\text{excess return}_i}{MVaR_i} = \\dfrac{\\text{excess return}_j}{MVaR_j}\\] for all \\(i, j\\)." }
  ],

  concepts: [
    {
      name: "Diversified, undiversified, and individual VaR",
      def: "Diversified VaR: portfolio VaR accounting for correlation/diversification effects. Undiversified VaR: sum of individual position VaRs (the \\(\\rho =1\\) case, no diversification credit). Individual VaR: VaR of one position considered in isolation, \\(VaR_{i}=Z_c\\times \\sigma_{i}\\times |w_{i}|\\times P\\).",
      intuition: "Diversified VaR is the number you actually report as 'the portfolio's risk' — it's the real-world, correlation-aware figure. Undiversified VaR is a deliberately pessimistic benchmark: it's what your risk would be if every position moved together in lockstep, which almost never happens, but it gives you a useful worst-case upper bound to compare against.",
      pitfall: "The absolute value on weight matters — SHORT positions carry risk too, and VaR cannot be negative.",
      related: [{ r: 5, label: "R5 — undiversified/diversified VaR, the same concept from Book 1's mapping reading" }]
    },
    {
      name: "The role of correlation — bounds on portfolio VaR",
      def: "\\(\\rho =0\\) gives the LOWER bound: \\(VaR_P=\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}}\\). \\(\\rho =1\\) gives the UPPER bound: \\(VaR_P=VaR_{1}+VaR_{2}\\) (undiversified VaR).",
      example: "\\(VaR_{1}=\\)$2.4M, \\(VaR_{2}=\\)$1.6M: uncorrelated \\(VaR_P=\\sqrt{2.4^{2}+1.6^{2}}\\approx\\)$2.88M; perfectly correlated VaR_P=$4.0M. Actual VaR_P for any real (partial) correlation sits between these two bounds.",
      related: []
    },
    {
      name: "Marginal VaR",
      def: "The per-unit change in portfolio VaR from an additional investment in a position — ∂VaR_P/∂(position). Conveniently expressed as \\(MVaR_{i}=(VaR_P/portfolio\\) \\(value)\\times \\beta_{i}\\), where \\(\\beta_{i}\\) comes from regressing position i's returns on total portfolio returns.",
      example: "Portfolio X, VaR=€400,000, 4 equally-weighted €1M assets, Asset A beta=1.2: MVaR_A=(400,000/4,000,000)×1.2=0.12 — VaR changes by €0.12 per €1 change in Asset A.",
      intuition: "Beta here is doing exactly the job it does in CAPM, just with the portfolio itself standing in for 'the market.' A position with beta above 1 relative to the portfolio moves more than the portfolio on average, so adding to it disproportionately raises total risk; a position with beta near zero barely nudges total VaR no matter how much you add to it, because it isn't correlated with what's driving the portfolio's swings.",
      related: ["Component VaR"]
    },
    {
      name: "Incremental VaR",
      def: "The ACTUAL change in VaR from adding a whole NEW position — generally larger than marginal VaR and can include nonlinear effects marginal VaR assumes away.",
      pitfall: "Precise incremental VaR requires FULL PORTFOLIO REVALUATION (measuring both the new position's risk AND the change in every existing position's risk) — expensive for large portfolios. The shortcut: (1) estimate the new position's risk-factor vector, (2) get the portfolio's vector of marginal VaRs for those risk factors (often already known), (3) take the cross (dot) product — much cheaper since managers typically already have MVaR estimates on hand.",
      example: "Assets A ($4M, \\(\\sigma =6\\)%) and B ($2M, \\(\\sigma =14\\)%), uncorrelated, z=1.65: adding $10,000 to A → incremental VaR ≈ $10,000×0.064428 = $644.28 (using A's marginal VaR).",
      related: [],
      memory: "Marginal VaR: the instantaneous slope. Incremental VaR: the actual change for a real (possibly nonlinear) addition — marginal VaR is the cheap shortcut approximation to it."
    },
    {
      name: "Component VaR",
      def: "\\(CVaR_{i}\\) = \\(MVaR_{i}\\times (w_{i}\\times P)\\) = \\(VaR_P\\times \\beta_{i}\\times w_{i}\\) — the amount portfolio VaR would fall if position i were REMOVED entirely.",
      example: "Portfolio X, VaR=€400,000, Asset A \\((\\beta =1.2\\), €1M of €4M total, w=0.25): CVaR_A = MVaR_A×(w×P) = 0.12×€1,000,000 = €120,000 — removing Asset A would cut portfolio VaR by €120,000. Assets A ($4M, MVaR=0.064428) and B ($2M, MVaR=0.175388): CVaR_A=0.064428×$4M=$257,713; CVaR_B=0.175388×$2M=$350,777.",
      pitfall: "Component VaRs sum EXACTLY to total portfolio VaR — \\(\\Sigma\\) \\(CVaR_{i}\\) = VaR_P, a clean, complete decomposition (unlike individual/undiversified VaR, which overstates by ignoring diversification).",
      related: [],
      memory: "Component VaR answers 'what would I lose (in VaR reduction) if I deleted this position' — and all the components add up perfectly to the whole."
    },
    {
      name: "Non-elliptical distributions: historical component VaR",
      def: "For non-normal (non-elliptical) return distributions, use historical sorting instead: (1) sort historical portfolio returns, (2) find the portfolio return R_P(VaR) corresponding to the chosen VaR confidence level, (3) find each position's return on the date(s) R_P(VaR) occurred, (4) use those position-level returns as the component VaR estimates — averaging over nearby dates improves the estimate.",
      intuition: "The beta-based component VaR formula quietly assumes returns follow an elliptical distribution (normal being the most familiar special case) — that's what lets you summarize the whole risk relationship with one number, beta. Once returns have fat tails or skew and beta stops being a reliable summary, you fall back on the direct, model-free approach: literally go find the day the portfolio lost the VaR-defining amount, look at what each position actually did that day, and use that as your component VaR — no distributional assumption required.",
      related: []
    },
    {
      name: "Risk-minimizing vs. return-optimizing portfolios",
      def: "Setting all marginal VaRs EQUAL \\((MVaR_{i}=MVaR_{j}\\) for all i,j) finds the GLOBAL MINIMUM-VARIANCE portfolio — but risk management (minimizing risk) is NOT the same as portfolio management (optimizing risk-adjusted return).",
      pitfall: "The truly OPTIMAL portfolio equates the EXCESS-RETURN-TO-MARGINAL-VAR ratio across positions: (excess \\(return_{i})/MVaR_{i}\\) = (excess \\(return_{j})/MVaR_{j}\\) — this is the VaR-based analogue of the Sharpe-ratio tangency portfolio on the efficient frontier. A portfolio with equal marginal VaRs (minimum variance) is generally NOT the same portfolio as the one with equal excess-return-to-MVaR ratios (optimal).",
      example: "Assets A ($4M, excess return 6%, MVaR≈0.0644) and B ($2M, excess return 11%, MVaR≈0.1754): ratio for A = 0.06/0.0644≈0.93; ratio for B = 0.11/0.1754≈0.63 — A's ratio is HIGHER, so the portfolio should shift ALLOCATION TOWARD A (increase to $4.5M) and away from B (decrease to $1.5M) to move toward optimal, even though this doesn't minimize variance.",
      related: [],
      memory: "Equal marginal VaRs = lowest RISK. Equal excess-return/MVaR ratios = highest RISK-ADJUSTED RETURN. These are two different destinations — don't confuse minimizing risk with optimizing the portfolio."
    }
  ],

  connections: {
    from: [
      { r: 5, why: "Undiversified/diversified VaR and matrix-based portfolio VaR calculation are the direct ancestors of this reading's machinery." },
      { r: 84, why: "Portfolio construction's active risk aversion and alpha refinement directly consume this reading's marginal/component VaR outputs." }
    ],
    to: [
      { r: 86, why: "Risk budgeting allocates a total risk budget across managers/asset classes using exactly this component VaR decomposition." }
    ],
    confused: [
      { what: "Marginal VaR vs incremental VaR", how: "Marginal VaR is the instantaneous per-unit sensitivity (a partial derivative, assumes linearity). Incremental VaR is the actual change from adding a real, discrete new position (can include nonlinear effects) — marginal VaR is the CHEAP APPROXIMATION to incremental VaR for small additions." },
      { what: "Equal marginal VaRs vs equal excess-return-to-MVaR ratios", how: "Equal MVaRs → minimum-VARIANCE portfolio (lowest risk, ignores return). Equal excess-return/MVaR ratios → OPTIMAL portfolio (best risk-adjusted return) — these are generally different allocations." },
      { what: "Component VaR vs individual VaR", how: "Individual VaR ignores diversification (each position's stand-alone risk); component VaR incorporates the position's actual correlation with the rest of the portfolio via beta, and component VaRs sum exactly to total portfolio VaR (individual VaRs do not — they overstate)." }
    ]
  },

  misconceptions: [
    { wrong: "\"The portfolio with all marginal VaRs equal is the optimal portfolio.\"", right: "Equal marginal VaRs give the MINIMUM-VARIANCE portfolio — the OPTIMAL (best risk-adjusted return) portfolio instead equates the excess-return-to-marginal-VaR ratio across positions. Minimizing risk and optimizing the portfolio are different objectives with different solutions." },
    { wrong: "\"Component VaRs for individual positions, summed together, generally exceed total portfolio VaR.\"", right: "Component VaRs sum EXACTLY to total portfolio VaR \\((\\Sigma CVaR_{i}=VaR_P)\\) — this is a defining, clean property of the component VaR decomposition, unlike individual (stand-alone) VaRs which DO overstate when summed (ignoring diversification)." },
    { wrong: "\"Incremental VaR and marginal VaR are the same measure with different names.\"", right: "Marginal VaR is a per-unit sensitivity (a derivative); incremental VaR is the actual VaR change from a discrete new position addition, generally larger and possibly nonlinear — marginal VaR is only an approximation to incremental VaR, valid for small additions." },
    { wrong: "\"Computing incremental VaR via full portfolio revaluation is generally cheaper and just as accurate as the marginal VaR shortcut.\"", right: "Full revaluation is MORE COSTLY (requires re-measuring the whole covariance structure) but MORE ACCURATE. The marginal VaR shortcut is less costly (managers often already have MVaR estimates) but less accurate for large or nonlinear position additions." }
  ],

  highYield: [
    { stars: 5, what: "Uncorrelated \\((\\sqrt{VaR_{1}^{2}+VaR_{2}^{2}})\\) and perfectly correlated \\((VaR_{1}+VaR_{2})\\) portfolio VaR bounds — full worked calculations.", why: "The most frequently and directly calculation-tested formula pair in this reading." },
    { stars: 5, what: "Marginal VaR formula (VaR_P/portfolio value × \\(\\beta )\\) and full worked calculation.", why: "The core building block for incremental and component VaR — master this first." },
    { stars: 5, what: "Optimal portfolio condition: equal excess-return-to-marginal-VaR ratios (NOT equal marginal VaRs) — and the worked reallocation example.", why: "The single most conceptually important — and most frequently confused — result in this reading." },
    { stars: 4, what: "Component VaR formula and the property that components sum exactly to total VaR.", why: "A clean, elegant decomposition, frequently tested via calculation." },
    { stars: 3, what: "Incremental VaR's shortcut approximation (risk-factor vector · marginal VaR vector) vs. full revaluation trade-off (cost vs accuracy).", why: "A precise conceptual trade-off, frequently tested." }
  ],

  recall: [
    { q: "Two uncorrelated positions have \\(VaR_{1}=\\)$10 million and \\(VaR_{2}=\\)$20 million. What is portfolio VaR?", a: "VaR_P = \\(\\sqrt{10^{2}+20^{2}}\\) = \\(\\sqrt{500}\\) ≈ $22.36 million." },
    { q: "A manager notices Position A's marginal VaR is much lower than Position B's, and shifts capital from B to A until the two marginal VaRs are equal. Has the manager found the optimal portfolio?", a: "No — equalizing marginal VaRs finds the MINIMUM-VARIANCE portfolio, not necessarily the optimal one. To find the truly optimal portfolio, the manager needs to equate each position's EXCESS-RETURN-TO-MARGINAL-VAR ratio, not just its marginal VaR alone. A position could have a low marginal VaR but also a low expected excess return, making it a poor allocation choice on a risk-adjusted basis despite its small marginal VaR." },
    { q: "Why is incremental VaR generally more expensive to compute accurately than marginal VaR, and when is the marginal VaR shortcut most appropriate?", a: "Precise incremental VaR requires FULL REVALUATION of the entire portfolio after adding the new position — remeasuring not just the new position's own risk but how it changes the risk contribution of every existing position (via the covariance matrix). This is expensive for portfolios with many positions. The marginal VaR shortcut (using the new position's risk-factor vector dotted with the portfolio's existing marginal VaR vector) is much cheaper and reasonably accurate for SMALL additions to the portfolio, where nonlinear effects are minimal." },
    { q: "A portfolio has Position X (excess return 9%, MVaR 0.06) and Position Y (excess return 12%, MVaR 0.075). Which position's allocation should increase to move toward the optimal portfolio?", a: "Compute the ratios: X = 0.09/0.06 = 1.5; Y = 0.12/0.075 = 1.6. Since Y's ratio is higher, the portfolio should increase its allocation to Y (and/or decrease X) to move toward the point where both ratios are equal — the optimal portfolio condition." }
  ],

  hooks: [
    { title: "Two bounds, one truth between them", text: "\\(\\rho =0\\) and \\(\\rho =1\\) aren't just special cases — they're the floor and ceiling. Real-world portfolio VaR always lands somewhere between the uncorrelated square-root-of-sum-of-squares and the fully-additive undiversified sum." },
    { title: "Equal risk isn't the finish line", text: "Chasing equal marginal VaRs across positions feels like 'balancing' the portfolio — but it only balances RISK, ignoring RETURN entirely. The finish line is equal excess-return-per-unit-of-marginal-risk, not equal risk itself." },
    { title: "Components that add up perfectly", text: "Component VaR is the rare risk decomposition that's actually TRUE arithmetic — every position's slice, summed, equals the whole pie exactly. No double-counting, no leftover crumbs." }
  ],

  breakdown: [
    {
      title: "Three levels of portfolio VaR",
      points: [
        "Diversified (portfolio) VaR — the real, correlation-aware VaR of the whole book; this is the number you actually report.",
        "Undiversified VaR — the sum of every position's stand-alone VaR, equivalent to assuming every pair of positions is perfectly correlated (ρ=1); a pessimistic upper-bound benchmark, not a real-world figure.",
        "Individual VaR — one position's VaR computed entirely on its own, \\(VaR_i=Z_c\\times\\sigma_i\\times|w_i|\\times P\\), ignoring how it interacts with everything else in the book."
      ]
    },
    {
      title: "Three VaR-based tools for managing (not just measuring) a portfolio",
      points: [
        "Marginal VaR — the instantaneous per-unit sensitivity of portfolio VaR to one position, \\(MVaR_i=(VaR_P/\\text{portfolio value})\\times\\beta_i\\); tells you which dial to turn.",
        "Incremental VaR — the actual change in VaR from adding a whole new position, generally larger than marginal VaR since it can include nonlinear effects; ideally needs full revaluation, but has a cheap marginal-VaR-based shortcut for small additions.",
        "Component VaR — the exact amount VaR would fall if a position were removed entirely, \\(CVaR_i=MVaR_i\\times(w_i\\times P)\\); the only one of the three whose values sum exactly across all positions to total portfolio VaR."
      ]
    },
    {
      title: "The 3-step incremental VaR shortcut (for small position additions)",
      points: [
        "Step 1 — Estimate the new position's exposure to each of the portfolio's risk factors and collect them into a vector.",
        "Step 2 — Pull the portfolio's existing vector of marginal VaRs for those same risk factors (managers usually already have these on hand).",
        "Step 3 — Take the cross (dot) product of the two vectors; the result approximates the incremental VaR without a full portfolio revaluation."
      ]
    },
    {
      title: "The 4-step historical procedure for component VaR under non-elliptical distributions",
      points: [
        "Step 1 — Sort the portfolio's historical returns from worst to best.",
        "Step 2 — Identify the portfolio return, R_P(VaR), that corresponds to the chosen VaR confidence level.",
        "Step 3 — Find each position's individual return on the date(s) when R_P(VaR) occurred.",
        "Step 4 — Use those position-level returns as the component VaR estimates; averaging over several dates near R_P(VaR) improves accuracy."
      ]
    }
  ],

  quiz: [
    {
      q: "Two uncorrelated positions have VaR₁ = $10 million and VaR₂ = $20 million. Portfolio VaR is closest to:",
      options: ["$5.48 million", "$15.00 million", "$22.36 million", "$25.00 million"],
      answer: 2,
      why: "For uncorrelated positions, VaR_P = √(VaR₁² + VaR₂²) = √(100+400) = √500 ≈ $22.36 million. $25.00 million is the tempting-but-wrong answer from simply averaging or misapplying the sum; $30 million (not offered here as the plain sum) would be the undiversified (ρ=1) figure, which only applies under perfect correlation, not zero correlation."
    },
    {
      q: "When computing individual VaR for a position that could be either long or short, it is proper to:",
      options: ["use the absolute value of the position's weight", "use only positive weights", "use only negative weights", "compute VaR separately for every risk factor within the position"],
      answer: 0,
      why: "VaR_i = Z_c × σ_i × |w_i| × P uses the absolute value of the weight because both long and short positions expose the portfolio to loss, and VaR itself cannot be negative. Restricting to only positive or only negative weights would silently drop half of all real portfolios from the calculation."
    },
    {
      q: "Compared to computing incremental VaR via the marginal-VaR shortcut, computing it via full portfolio revaluation is:",
      options: ["more costly, but less accurate", "less costly, but more accurate", "less costly, but also less accurate", "more costly, but also more accurate"],
      answer: 3,
      why: "Full revaluation recomputes the entire covariance structure of the portfolio, which is expensive, but captures the true (possibly nonlinear) change in VaR, so it is more accurate. The marginal-VaR shortcut is cheap (it reuses MVaRs the desk typically already has) but only approximates the true change, especially for large or nonlinear additions — so 'less costly, but more accurate' inverts the actual trade-off."
    },
    {
      q: "A portfolio has equal amounts invested in Position X (excess return 9%, marginal VaR 0.06) and Position Y (excess return 12%, marginal VaR 0.075). To move toward the optimal portfolio, the manager should probably:",
      options: ["Do nothing, the portfolio is already optimal", "Increase the allocation in X and/or lower it in Y", "Increase the allocation in Y and/or lower it in X", "The information given is insufficient to decide"],
      answer: 2,
      why: "Excess-return-to-MVaR ratios: X = 0.09/0.06 = 1.5, Y = 0.12/0.075 = 1.6. Y's ratio is higher, so shifting capital toward Y (and away from X) raises the portfolio's overall risk-adjusted return, moving it toward the point where both ratios are equal. Increasing X instead would move the portfolio further from optimal, and the ratios given are entirely sufficient to decide — no extra information is needed."
    },
    {
      q: "Portfolio X has a VaR of €400,000 and is made up of four equally weighted €1,000,000 assets. Asset A has a beta of 1.2 relative to the portfolio. Asset A's marginal VaR is closest to:",
      options: ["1.20", "0.10", "0.48", "0.12"],
      answer: 3,
      why: "MVaR_A = (VaR_P / portfolio value) × β_A = (400,000 / 4,000,000) × 1.2 = 0.12. Using beta alone (1.20) skips the VaR/value scaling entirely; 0.10 omits the beta multiplier; 0.48 mistakenly multiplies the full VaR_P by beta without first dividing by portfolio value (400,000 × 1.2 = 480,000, then misplacing the decimal)."
    },
    {
      q: "A manager adjusts a two-asset portfolio until all marginal VaRs are exactly equal across positions. What has the manager achieved?",
      options: ["The optimal (risk-adjusted-return-maximizing) portfolio", "The minimum-variance portfolio, which is not necessarily optimal", "Undiversified portfolio VaR", "Component VaR equal to individual VaR for every position"],
      answer: 1,
      why: "Equal marginal VaRs is precisely the condition for the global minimum-variance portfolio — the lowest possible VaR for the given capital — but says nothing about expected return, so it is not necessarily optimal. The optimal portfolio instead requires equal excess-return-to-marginal-VaR ratios; equal marginal VaRs and equal ratios are generally different allocations."
    }
  ],

  sources: [
    { title: "Value at risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Value_at_risk", note: "Background on VaR mechanics, confidence levels, and the diversification/aggregation issues this reading builds on." },
    { title: "Value at Risk (VaR) — Investopedia", url: "https://www.investopedia.com/terms/v/var.asp", note: "Plain-language walkthrough of VaR calculation methods, useful as a refresher before the marginal/incremental/component decomposition." },
    { title: "Efficient Frontier — Investopedia", url: "https://www.investopedia.com/terms/e/efficientfrontier.asp", note: "Explains the mean-variance efficient frontier and tangency portfolio that the excess-return-to-marginal-VaR optimality condition is directly modeled on." },
    { title: "Sharpe Ratio — Investopedia", url: "https://www.investopedia.com/terms/s/sharperatio.asp", note: "The excess-return-over-risk ratio whose VaR-based analogue (excess return / marginal VaR) defines the optimal portfolio condition in this reading." }
  ],

  pdf: { book: 5, query: "Diversified VaR is simply the VaR of the portfolio" },

  summary: `<p><strong>Individual VaR</strong>\\(=Z\\times \\sigma \\times |w|\\times P\\). <strong>Bounds</strong>: uncorrelated \\(VaR_P=\\sqrt{\\Sigma VaR_{i}^{2}}\\) (lower); perfectly \\(correlated=\\Sigma VaR_{i}\\) (upper, "undiversified"). <strong>Marginal VaR</strong>=(VaR_P/portfolio \\(value)\\times \\beta_{i}\\) — the per-unit sensitivity. <strong>Incremental VaR</strong>=actual change from a new position (needs full revaluation for precision; MVaR-based dot-product shortcut for small additions). <strong>Component VaR</strong>\\(=MVaR_{i}\\times (w_{i}\\times P)=VaR_P\\times \\beta_{i}\\times w_{i}\\) — sums EXACTLY to total portfolio VaR. <strong>Risk-minimizing</strong> portfolio: equal marginal VaRs \\((MVaR_{i}=MVaR_{j})\\). <strong>Optimal</strong> portfolio: equal excess-return-to-marginal-VaR ratios — a DIFFERENT, more valuable condition than simply minimizing risk. Non-elliptical distributions: use historical-return sorting to estimate component VaR instead of the beta-based formula.</p>`
});
