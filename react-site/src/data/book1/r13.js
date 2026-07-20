export default ({
  book: 1, reading: 13,
  session: "Term Structures & Volatility",
  title: "The Art of Term Structure Models: Drift",
  tagline: "The formula-heaviest reading in the book. One continuous idea told in four increasingly flexible versions, each a strict generalization of the one before.",

  teaches: `<p>Start with a model that has no opinion about direction (Model 1), add a constant expected direction (Model 2), let that direction vary by time period (Ho-Lee), then let it actively pull back toward a long-run anchor (Vasicek). Each model nests the one before it: Model 1 ⊂ Model 2 ⊂ Ho-Lee, and Vasicek is a structurally different (mean-reverting) branch.</p>
  <p>Along the way you also pick up two "plumbing" questions every practitioner has to answer before using any of these models. First, what do you do when the model predicts a negative interest rate? Second, should you calibrate the model to match today's market prices exactly (arbitrage-free), or let it stand on its own assumptions and tell you when the market looks wrong (equilibrium)?</p>`,

  why: `<p>Reading 11 built the tree scaffold. Reading 12 explained why yields have their shape via expectations and convexity. Now you need to know what the DRIFT term inside the tree should actually look like. Different drift assumptions produce curves with dramatically different shapes, different volatility-term-structure implications, and different probabilities of negative rates. That last point isn't academic; it shaped a decade of rates-market practice. The years of near-zero and negative policy rates in the US, Europe, and Japan forced desks to confront exactly this issue.</p>`,

  intuition: `<p>Think of the four models as a family tree of increasing ambition. In every one of them, \\(r\\) is the short-term interest rate, \\(dr\\) is how much it moves over a tiny time step \\(dt\\), \\(\\sigma\\) is the annualized volatility of the rate, and \\(dw\\) is a random shock drawn from a standard normal distribution (mean 0, so on average it contributes nothing, it's pure noise). "Drift" is the part of the model that is NOT random: the deterministic direction the model expects rates to move, on top of the noise.</p>
  <p><strong>Model 1</strong> (no drift): recombining tree, symmetric 50/50 up/down, dr = \\(\\sigma dw\\). The whole change in the rate is noise; there's no deterministic push in either direction. It has four limitations worth knowing: a flat volatility term structure (real markets show a hump), only one risk factor (parallel shifts only), an always-positive probability of negative rates, and a subtler point, the no-drift assumption forces the model's implied par yield curve to slope downward relative to the zero-volatility case purely because of the convexity effect (Reading 12). There's nothing in the model to offset it.</p>
  <p><strong>Model 2</strong> (constant drift): adds constant \\(\\lambda\\) combining risk premium and expected rate change. Tree still recombines. It fits upward-sloping curves better, but a single constant risk premium forever is a stretch for long horizons. Is the market really pricing in the same annual risk premium 20 years out that it prices in next year?</p>
  <p><strong>Ho-Lee</strong> (time-dependent drift): \\(\\lambda (t)\\) can differ every period, each calibrated to the observed market rate for that maturity. More flexible, and Model 2 turns out to be the special case where all \\(\\lambda_t\\) are equal. Concretely: \\(r_0\\) is today's observed one-period spot rate; \\(\\lambda_1\\) is chosen so the model's two-period rate matches the actual observed two-period market rate; \\(\\lambda_2\\) is then chosen (using \\(r_0\\) and \\(\\lambda_1\\)) so the model's three-period rate matches the observed three-period market rate, and so on outward along the curve.</p>
  <p><strong>Vasicek</strong> (mean reversion): adds \\(k(\\theta - r)\\), actively pulling the rate back toward long-run mean \\(\\theta\\) at speed k. If \\(r\\) is above \\(\\theta\\), this term is negative and pulls the rate down; if \\(r\\) is below \\(\\theta\\), it's positive and pulls the rate up. This is the first model whose tree does not naturally recombine, because the reversion adjustment depends on how far the current rate already is from \\(\\theta\\), so up-then-down doesn't equal down-then-up (the down branch sits further from \\(\\theta\\) than the up branch, so it gets pulled back by a different amount).</p>`,

  visual: `<div class="widget" data-widget="tree"></div>`,

  formulas: [
    {
      name: "The nested drift family",
      math: "Model 1: dr=\\sigma dw \\to Model 2: dr=\\lambda dt+\\sigma dw \\to Ho-Lee: dr=\\lambda (t)dt+\\sigma dw \\to Vasicek: dr=k(\\theta -r)dt+\\sigma dw",
      note: "Each arrow is a strict generalization. If \\(\\lambda_{1}=\\lambda_{2}=\\)…, Ho-Lee collapses to Model 2; if \\(\\lambda =0\\), Model 2 collapses to Model 1.",
      plain: "Each model is the previous one plus one extra piece of information about the drift: nothing (Model 1), a single constant (Model 2), a constant that's allowed to change every period (Ho-Lee), or a term that actively pulls the rate back toward a long-run anchor (Vasicek). The random noise term \\(\\sigma dw\\) never changes across all four.",
      derivation: `<p>Read the arrows right-to-left to see the collapse, not just the buildup:</p>
      <p>Start from Ho-Lee: \\(dr=\\lambda (t)dt+\\sigma dw\\). If the calibrated drift happens to come out the same in every period, \\(\\lambda (t)=\\lambda\\) for all \\(t\\), the time-varying term degenerates into a constant and you get exactly Model 2: \\(dr=\\lambda dt+\\sigma dw\\).</p>
      <p>Now start from Model 2 and set \\(\\lambda =0\\) (no risk premium, no expected rate change): \\(dr=\\lambda dt+\\sigma dw \\to dr=(0)dt+\\sigma dw=\\sigma dw\\), which is exactly Model 1.</p>
      <p>Vasicek does not collapse into this chain the same way — setting \\(k=0\\) removes mean reversion entirely and leaves \\(dr=\\sigma dw\\) (Model 1 again), so Vasicek nests Model 1 as well, but it is not a simple generalization of Model 2 or Ho-Lee's time-varying \\(\\lambda (t)\\); it is a structurally different branch built around pulling back toward \\(\\theta\\) rather than following an externally calibrated drift schedule.</p>`
    },
    {
      name: "Standard deviation of the rate change (Model 1 and beyond)",
      math: "\\sigma_{\\Delta r}=\\sigma \\sqrt{dt}",
      note: "The annualized volatility \\(\\sigma\\) gets scaled down to the length of one tree step by the square root of time — the same square-root-of-time scaling used everywhere in this book (VaR horizon scaling, option volatility, etc.).",
      plain: "This says the size of a typical one-step rate move is the annual volatility shrunk by the square root of how long that one step is — a monthly step has much less uncertainty in it than a full year does.",
      example: "\\(r_0=6\\)%, \\(\\sigma =1.2\\)%/yr, monthly steps (\\(dt=1/12\\)): \\(\\sigma_{\\Delta r}=1.2\\)% \\(\\times \\sqrt{1/12}=0.346\\)%. A single-period \\(dw\\) realization of 0.2 gives \\(dr=1.20\\%\\times 0.2=0.24\\%\\), so the new rate after one month is \\(6\\%+0.24\\%=6.24\\%\\)."
    },
    {
      name: "Vasicek: long-run mean rate under risk neutrality",
      math: "\\theta \\approx r_{\\infty}+\\dfrac{\\lambda}{k}",
      note: "\\(r_{\\infty}\\) is the true (economically fundamental) long-run rate; \\(\\lambda\\) is the same combined risk-premium-plus-expected-rate-change drift term seen in Model 2 and Ho-Lee; k is the mean-reversion speed.",
      plain: "The rate the model is actually pulling toward, \\(\\theta\\), is not simply the 'true' long-run economic rate — it's that true rate nudged up (or down) by the risk premium, and the nudge gets bigger the slower the reversion speed k is (a small k means the same annual drift compounds its effect for longer before being reined in).",
      example: "\\(k=0.03\\), \\(\\sigma =1.50\\)%/yr, true long-run rate \\(r_{\\infty}=6\\)%, current rate \\(r_0=6.2\\)%, annual drift \\(\\lambda =0.36\\)%: \\(\\theta \\approx 6\\%+\\dfrac{0.36\\%}{0.03}=6\\%+12\\%=18\\)%. Note how small k (slow reversion) inflates \\(\\theta\\) far above the 'true' 6% long-run rate — this is a consequence of the model's math, not a literal forecast that rates are heading to 18%."
    },
    {
      name: "Vasicek: expected rate in T years",
      math: "E[r_T]=\\theta -(\\theta -r_0)e^{-kT}",
      note: "As \\(T\\to\\infty\\), \\(e^{-kT}\\to 0\\) and \\(E[r_T]\\to \\theta\\) — the expected rate decays exponentially from today's rate toward the long-run anchor \\(\\theta\\).",
      plain: "The expected rate T years out is a weighted blend of where you are today and where you're ultimately headed (\\(\\theta\\)), with today's rate's weight shrinking exponentially the further out you look.",
      derivation: `<p>Rewrite as \\(E[r_T]=\\theta -(\\theta -r_0)e^{-kT}\\). The gap between today's rate and the long-run mean is \\((\\theta -r_0)\\); the model assumes this gap decays exponentially at rate \\(k\\), so after T years only a fraction \\(e^{-kT}\\) of the original gap remains. Subtracting that shrunken gap from \\(\\theta\\) gives the expected rate at time T — it's \\(\\theta\\) minus "whatever's left of the original distance."</p>`,
      example: "Continuing the example above: \\(\\theta =18\\)%, \\(r_0=6.2\\)%, \\(k=0.03\\), \\(T=10\\) years. Gap = \\(18\\%-6.2\\%=11.8\\)%. Decayed gap = \\(11.8\\%\\times e^{-0.03\\times 10}=11.8\\%\\times e^{-0.3}=8.74\\)%. Expected rate in 10 years = \\(18\\%-8.74\\%=9.26\\)%."
    },
    {
      name: "Vasicek: half-life of mean reversion",
      math: "T_{1/2}=\\dfrac{\\ln (2)}{k}",
      note: "The number of years it takes to close half the distance between today's rate and \\(\\theta\\). A larger k gives a shorter half-life — shocks fade faster.",
      plain: "Half-life answers 'how long until the rate has closed half the gap to its long-run anchor' — a more intuitive way to communicate mean-reversion speed than quoting the raw parameter k.",
      example: "With \\(k=0.03\\): \\(T_{1/2}=\\dfrac{\\ln (2)}{0.03}=\\dfrac{0.693}{0.03}\\approx 23.1\\) years — a small k means it takes over two decades just to close half the gap, consistent with how far \\(\\theta =18\\%\\) sat above the current 6.2% rate in the earlier example."
    }
  ],

  concepts: [
    {
      name: "Model 1 — no drift",
      def: "Recombining tree, 50/50 up/down, no directional bias: dr = \\(\\sigma dw\\). \\(r\\) is the short rate, \\(\\sigma\\) its annualized volatility, and \\(dw\\) a mean-zero standard-normal random shock. Since \\(E[dw]=0\\), the expected (average) change in the rate is exactly zero.",
      intuition: "A tree with no opinion about direction: every up-move is exactly as likely and exactly as large as every down-move, forever.",
      example: "\\(r_{0}=6\\)%, \\(\\sigma =1.2\\)%/yr, monthly steps (dt=1/12): SD of monthly change = 1.2%\\(\\times \\sqrt{1/12}\\) = 0.346%. After 2 periods: upper node 6.692%, middle 6% (unchanged, because there is no drift), lower 5.308%. A single realized \\(dw=0.2\\) after one month produces \\(dr=1.2\\%\\times 0.2=0.24\\)%, so the new rate is \\(6\\%+0.24\\%=6.24\\)%.",
      pitfall: "Four named limitations. (1) A flat volatility term structure, whereas real markets show a hump: volatility rises, then falls with maturity. (2) Only one risk factor, so the model permits parallel shifts only, which contradicts observed non-parallel curve moves. (3) An always-positive probability of negative rates, and it gets worse for longer horizons and lower starting levels. A 10-year horizon with \\(\\sigma =1.2\\%\\) gives a terminal SD of \\(1.2\\%\\times \\sqrt{10}=3.79\\)%, easily putting a 6% starting rate within two standard deviations of zero. (4) The no-drift assumption alone forces a downward-sloping predicted par-yield term structure, purely from the convexity effect of Reading 12, because there is no drift term to offset the convexity pull-down.",
      related: ["Model 2 — constant drift"],
      memory: "Model 1 = a coin flip with no opinion about direction."
    },
    {
      name: "Handling negative rates",
      def: "Because Model 1's (and Model 2's and Ho-Lee's) terminal distribution is normal, there is always some positive probability of a negative rate. Two standard fixes exist.",
      intuition: "You either change the distribution so it structurally can't go negative, or you leave the distribution alone and just clip the outcomes that do go negative back to zero.",
      example: "(1) Use a distribution that is always non-negative (lognormal or chi-squared), so negative rates are mathematically impossible; the cost is that this can introduce unwanted skewness or distort the model's implied volatilities elsewhere. (2) Keep the original tree but force any negative node to a value of zero ('zero-flooring'); this only changes the small part of the distribution that would have gone negative, leaving the rest of the tree untouched. That second fix is generally the preferred one because it's less invasive. Whether either fix even matters depends on the use case: coupon-bond valuation (which depends on the average rate path) is fairly insensitive to a small chance of a brief negative rate, while option models with asymmetric payoffs are much more sensitive to it.",
      pitfall: "Negative rates are not simply a modeling glitch to be ignored. The reading explicitly allows that a small negative rate can be economically rational if the safety/convenience of holding cash is valuable enough to depositors (a real phenomenon seen when European and Japanese policy rates went negative).",
      related: ["Model 1 — no drift"],
      memory: "Two fixes for going negative: change the shape of the distribution (lognormal/chi-squared), or just floor the bad outcomes at zero."
    },
    {
      name: "Model 2 — constant drift",
      def: "Adds constant \\(\\lambda\\) (drift = risk premium + expected rate change combined): \\(dr=\\lambda dt+\\sigma dw\\). Tree still recombines, but the middle node at time 2 = \\(r_{0}+2\\lambda dt\\) ≠ \\(r_{0}\\).",
      example: "\\(r_0=5\\)%, \\(\\lambda =0.24\\)%/yr, \\(\\sigma =1.50\\)%/yr, monthly steps, \\(dw=0.2\\): \\(dr=\\lambda \\,dt+\\sigma \\,dw=(0.24\\%\\times \\tfrac{1}{12})+(1.5\\%\\times 0.2)=0.02\\%+0.30\\%=0.32\\)%, so \\(r_1=5\\%+0.32\\%=5.32\\)%. The monthly drift piece alone is \\(0.24\\%\\times \\tfrac{1}{12}=0.02\\)% (2bp), which could plausibly be decomposed as, say, a 1.5bp true expected rate increase plus a 0.5bp risk premium. The model can't tell you the split, only the combined number.",
      pitfall: "Better fits typical upward-sloping curves, but calibrated \\(\\lambda\\) can be unrealistically large if interpreted as pure risk premium, and assuming ONE constant risk premium forever is a stretch for long horizons. The assumption is more defensible over shorter windows, where it's easier to argue expected rates keep rising year over year than over decades.",
      related: ["Ho-Lee — time-dependent drift"]
    },
    {
      name: "Ho-Lee model — time-dependent drift",
      def: "\\(\\lambda (t)\\) can differ every period, which makes the model more flexible; each \\(\\lambda_t\\) is calibrated against the observed market rate for that maturity.",
      example: "\\(r_0\\) is set to today's observed one-period spot rate. \\(\\lambda_1\\) is then solved so the model's two-period tree rate matches today's observed two-period market rate. \\(\\lambda_2\\) is solved next, using \\(r_0\\) and \\(\\lambda_1\\), so the model's three-period rate matches the observed three-period market rate. The process continues outward, one maturity bucket at a time, so the whole calibrated tree reproduces the entire observed curve exactly.",
      pitfall: "If \\(\\lambda_{1}=\\lambda_{2}=\\)…, Ho-Lee collapses EXACTLY to Model 2: Model 2 is a special case of Ho-Lee, and Model 1 is a special case of Model 2 \\((\\lambda =0)\\). This nesting (Model 1 ⊂ Model 2 ⊂ Ho-Lee) is itself a testable fact.",
      related: ["Vasicek — mean reversion"],
      memory: "Ho-Lee = Model 2 with a different \\(\\lambda\\) allowed every single period."
    },
    {
      name: "Vasicek model — mean reversion",
      def: "dr = \\(k(\\theta - r)dt\\) + \\(\\sigma dw\\). k = speed of mean reversion (larger k → faster pull back to \\(\\theta )\\). If \\(r>\\theta\\) the drift adjustment is negative (pulls down); if \\(r<\\theta\\) it's positive (pulls up). The underlying story is that the economy has a fundamentals-driven equilibrium rate (long-run money supply, technological trend growth, etc.) that the short rate keeps getting tugged back toward.",
      pitfall: "THE single most commonly confused concept across R11-14: Vasicek produces a DECLINING (not flat, not hump-shaped) volatility term structure — short rates overstated in volatility, long rates understated, because mean reversion dampens long-horizon uncertainty. It also implies NONPARALLEL shifts, because a shock to the short rate matters less further out. That is the opposite of Model 1's parallel-shift-only behavior. Large k = shocks short-lived (revert fast); small k = shocks long-lived (revert slowly). Mean reversion is also a reasonable assumption in normal times but breaks down under structural shocks like hyperinflation, where there's no stable 'equilibrium' to revert to.",
      example: "Worked numbers: \\(r_0=6.2\\)%, \\(k=0.03\\), \\(\\sigma =1.5\\)%/yr, \\(\\theta =18\\)% (from the risk-neutral \\(\\theta\\) formula above). First-period drift: \\(dr=k(\\theta -r_0)dt=0.03\\times (18\\%-6.2\\%)\\times \\tfrac{1}{12}\\approx 0.0295\\)% (about 2.95bp), on top of \\(\\pm\\sigma \\sqrt{dt}=\\pm 0.43\\)% from the noise term, giving first-period up/down nodes of roughly 6.663% and 5.796%. Carrying this forward two periods: from the upper node (6.663%), the tree can move up to 7.124% or down to 6.258%; from the lower node (5.796%), it can move up to 6.260% or down to 5.394%. The up-then-down path (6.258%) and down-then-up path (6.260%) land at DIFFERENT rates. The down-up path is higher because the mean-reversion pull was stronger starting from the lower (further-from-\\(\\theta\\)) node.",
      related: [{ r: 14, label: "R14 — CIR adds mean reversion AND level-dependent volatility" }],
      memory: "Vasicek = a rubber band pulling rates back to \\(\\theta\\); the harder the pull (k), the faster shocks fade and the more the tree twists out of recombination."
    },
    {
      name: "Forcing the Vasicek tree to recombine",
      def: "The 2-period Vasicek tree is naturally non-recombining, but it can be approximated as recombining by averaging the two middle nodes and replacing the fixed 50/50 probabilities with new probabilities (p, 1−p) and (q, 1−q) that reproduce the correct mean and variance.",
      intuition: "You force the up-down and down-up paths onto a single shared middle node by taking their average, then you solve backward for whatever up/down probabilities (no longer 50/50) are needed at each branch to still hit the model's required expected rate and standard deviation.",
      example: "Average the two middle nodes: (6.258% + 6.260%) / 2 = 6.259%. Then solve for p and \\(r^{uu}\\) using two equations: the probability-weighted average of \\(r^{uu}\\) and the shared middle node 6.259% must equal the model's expected upper-branch rate \\(6.663\\%+0.03(18\\%-6.663\\%)\\times \\tfrac{1}{12}=6.691\\)%, and separately the variance of that same distribution must match the model's target standard deviation. Solving those two equations pins down both p and \\(r^{uu}\\). The same two-equation process is repeated on the lower branch to solve for q and \\(r^{dd}\\), and the whole procedure repeats one more period out if the tree extends further.",
      pitfall: "This is a genuine multi-step calculation, not a shortcut. GARP tests whether you understand WHY averaging + re-solving probabilities is necessary (because the model's variance and mean must still be matched even after forcing recombination), not just that 'you average the middle nodes.'",
      related: ["Vasicek model — mean reversion"],
      memory: "Recombine by averaging the middle, then let the probabilities (not the rates) do the work of keeping the mean and variance correct."
    },
    {
      name: "Arbitrage-free vs equilibrium models",
      def: "Arbitrage-free models are calibrated to match observed market prices exactly (good for pricing illiquid/derivative instruments relative to liquid ones) but are USELESS for relative value analysis.",
      example: "A dealer builds an arbitrage-free tree that is forced to exactly reprice liquid, on-the-run Treasury securities. That same calibrated tree is then used to price less-liquid off-the-run Treasuries or interest-rate derivatives (e.g. options on bonds), and the model's price is compared to the off-the-run security's actual market price to flag potential mispricing. Two caveats limit this: (1) calibrating to market prices doesn't fix a bad underlying structural assumption: if the true dynamics aren't parallel-shift, adding drift to force-fit today's prices still leaves a faulty model for tomorrow's moves; (2) the calibration assumes today's observed prices are accurate, which can fail during a temporary, exogenous shock (e.g. forced liquidation flooding the market with securities and temporarily depressing prices).",
      pitfall: "If you assume the market is already correctly priced (which is what 'arbitrage-free' means), you can't use the model to say one security is cheap relative to another. For that, you need an equilibrium model instead — one whose prices come from independent economic assumptions rather than from forcing a match to today's quotes, so it CAN disagree with the market and flag a mispricing.",
      related: [{ r: 11, label: "R11 — the arbitrage-free calibration requirement" }],
      memory: "Arbitrage-free models trust the market's prices; equilibrium models judge them."
    }
  ],

  connections: {
    from: [
      { r: 11, why: "The tree mechanics (backward induction, recombination) are the scaffold every drift model here is built on." },
      { r: 12, why: "This reading formalizes the 'expectations drive curve shape' insight into an explicit, calibratable drift term." }
    ],
    to: [
      { r: 14, why: "Reading 14 holds the same nested-family structure but varies VOLATILITY instead of drift — a direct structural parallel." }
    ],
    confused: [
      { what: "Model 2 vs Ho-Lee", how: "Model 2 has ONE constant \\(\\lambda\\) forever; Ho-Lee allows a DIFFERENT \\(\\lambda\\) every period, calibrated to match the observed curve at each maturity. Model 2 is Ho-Lee's special case." },
      { what: "Arbitrage-free vs equilibrium models", how: "Arbitrage-free models are calibrated to match the market exactly (useful for pricing derivatives relative to observed instruments); equilibrium models derive prices from assumptions and can flag market mispricing — but can't be 'wrong' the way arbitrage-free models structurally can't be." },
      { what: "Model 1's flat vol term structure vs Vasicek's declining one", how: "Model 1 has no mechanism to dampen long-horizon uncertainty (flat vol); Vasicek's mean reversion actively dampens it at long horizons (declining vol) — a direct consequence of adding \\(k(\\theta - r)\\)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Vasicek produces a flat or hump-shaped volatility term structure like the other models.\"", right: "Vasicek produces a DECLINING volatility term structure, because mean reversion dampens long-horizon uncertainty specifically. This is the single most confused point across Readings 11-14." },
    { wrong: "\"All four drift models produce recombining trees.\"", right: "Model 1, Model 2, and Ho-Lee all recombine. Vasicek does NOT recombine naturally: its drift adjustment depends on distance from \\(\\theta\\), which differs by path." },
    { wrong: "\"Ho-Lee and Model 2 are essentially different models.\"", right: "Ho-Lee nests Model 2 exactly: if all \\(\\lambda_t\\) are equal, Ho-Lee IS Model 2. And if \\(\\lambda =0\\), Model 2 IS Model 1. It's one nested family, not four unrelated models." },
    { wrong: "\"Arbitrage-free models can identify cheap or rich securities.\"", right: "By construction they assume the market is already correctly priced. That is what 'arbitrage-free' calibration means. Relative value analysis needs an equilibrium model instead." },
    { wrong: "\"The only fix for negative rates is switching to a lognormal distribution.\"", right: "The reading gives TWO standard fixes: switching to a non-negative distribution (lognormal or chi-squared), or leaving the distribution alone and simply flooring negative nodes at zero. Zero-flooring is often preferred precisely because it changes less of the distribution." }
  ],

  highYield: [
    { stars: 5, what: "The nested family: Model 1 ⊂ Model 2 ⊂ Ho-Lee, and Vasicek's mean-reversion branch with \\(k(\\theta - r)\\).", why: "The single most reliably tested structural fact in this reading. Know the nesting cold." },
    { stars: 5, what: "Vasicek's declining volatility term structure and non-parallel shifts — the #1 most confused concept in R11-14.", why: "GARP explicitly flags this as the reading's hardest, most-tested distinction." },
    { stars: 4, what: "Why Vasicek's tree doesn't recombine (path-dependent reversion adjustment).", why: "A conceptual mechanism question that also tests understanding of backward induction from R11." },
    { stars: 3, what: "Model 1's four named limitations (flat vol TS, one factor, negative rates possible, downward-sloping predicted curve from convexity).", why: "A clean, individually testable recall list." },
    { stars: 3, what: "Arbitrage-free vs equilibrium models — what each is good/useless for.", why: "A recurring conceptual contrast tested with 'which model would you use to find a mispriced security.'" },
    { stars: 3, what: "The two fixes for negative rates (non-negative distribution vs zero-flooring) and Vasicek's half-life / expected-rate-at-T calculations.", why: "Directly computational LOs (13.c, 13.g); GARP likes turning these into plug-in-the-numbers problems." }
  ],

  recall: [
    { q: "If Ho-Lee's calibrated \\(\\lambda_t\\) values turn out identical across all periods, what model do you actually have?", a: "Model 2 (constant drift) — Ho-Lee nests Model 2 exactly as the special case where all time-varying drift terms are equal." },
    { q: "Why does Vasicek's tree fail to recombine while Model 1/2/Ho-Lee's trees do?", a: "Vasicek's drift adjustment \\(k(\\theta - r)\\) depends on how far the CURRENT rate already is from \\(\\theta\\) — a path-dependent quantity. Up-then-down and down-then-up traverse different intermediate rates, so they land on different final rates, breaking recombination. The drift-only models (1, 2, Ho-Lee) have no such path dependence." },
    { q: "Explain in one sentence why Vasicek produces a DECLINING volatility term structure.", a: "Mean reversion actively pulls rates back toward \\(\\theta\\), and this pull compounds over time, dampening the accumulated uncertainty at long horizons relative to short ones — so long-horizon rate volatility ends up lower than short-horizon volatility." },
    { q: "You need to identify whether a specific bond is cheap or rich relative to the rest of the curve. Should you reach for an arbitrage-free or an equilibrium model, and why?", a: "Equilibrium model — arbitrage-free models are calibrated to already match observed market prices exactly, so by construction they can't flag any security as mispriced relative to the model." },
    { q: "Model 1 has four named limitations. State them and explain which one Vasicek specifically fixes.", a: "Flat volatility term structure, single risk factor (parallel shifts only), positive probability of negative rates, and a downward-sloping predicted par curve driven purely by the convexity effect. Vasicek fixes the flat-vol-term-structure limitation by producing a declining term structure via mean reversion (though it still allows negative rates and — like Model 1 — is a one-factor model)." },
    { q: "Name the two standard ways to handle the possibility of negative rates in Model 1, and which one changes less of the original distribution.", a: "(1) Use a non-negative distribution such as lognormal or chi-squared, or (2) keep the original tree and floor any negative node at zero. Zero-flooring changes less of the distribution, since it only touches the small low-rate tail rather than reshaping the whole distribution." }
  ],

  hooks: [
    { title: "The family tree", text: "Model 1 has no opinion. Model 2 picks a direction and never changes its mind. Ho-Lee changes its mind every period. Vasicek is the rebellious cousin who actively pulls back toward home \\((\\theta )\\) — and is the only one whose tree won't sit still (recombine)." },
    { title: "The rubber band", text: "k in Vasicek is rubber-band stiffness. Big k: rates snap back to \\(\\theta\\) fast, shocks are short-lived. Small k: a loose rubber band, shocks linger." },
    { title: "One idea, four costumes", text: "dr = \\(\\sigma dw\\) → \\(+\\lambda dt\\) → \\(+\\lambda (t)dt\\) → \\(+k(\\theta - r)dt\\). Same \\(\\sigma dw\\) core noise term in every model; only the drift costume changes." }
  ],

  eli5: `<p>Imagine four different weather forecasters predicting tomorrow's temperature. Forecaster 1 just says "today's temperature, plus or minus some random wobble" — no opinion about warming or cooling. Forecaster 2 says "today's temperature, plus a fixed +1 degree per day, plus the random wobble" — always expects it to get warmer, by the same amount, forever. Forecaster 3 checks yesterday's actual weather reports and re-picks a (possibly different) daily change every single day, so the "expected warming" can speed up, slow down, or reverse depending on the season. Forecaster 4 is the most sophisticated: instead of just extrapolating, she knows the region's long-run average temperature (say, 65°F) and predicts that however hot or cold it is right now, it will drift back toward that 65°F average: fast if it's currently way off (a heat wave snaps back quickly), slow if it's only a little off. That's the short-rate drift story: Model 1 = no directional opinion, Model 2 = one fixed opinion forever, Ho-Lee = a fresh opinion every period fitted to real data, Vasicek = an opinion that actively pulls back toward a long-run anchor rather than just extrapolating.</p>`,

  thinkLike: `<p>A rates desk doesn't pick one of these four models because it's "the best" in the abstract. It picks based on the job at hand. If you're pricing a derivative off a liquid underlying (an option on an on-the-run Treasury, say) and you need your model to reproduce today's observed prices exactly before you trust it to price something illiquid off of them, you calibrate an arbitrage-free tree (Ho-Lee is the classic arbitrage-free workhorse in this reading). If instead you're trying to decide whether a specific bond looks cheap or rich relative to the rest of the curve, you deliberately do NOT want a model that's forced to agree with the market everywhere; you want an equilibrium model (Vasicek is the classic example) that has its own opinion about where rates "should" be, so it can disagree with the market and flag the opportunity.</p>
  <p>On the exam, GARP loves testing this reading two ways: (1) mechanical: build or read off a 2-period tree and know exactly which node gets which drift adjustment (constant λdt, growing 2λdt, time-varying λ(t)dt, or mean-reverting k(θ−r)dt); and (2) conceptual: given a description of a model's behavior (flat vs hump vs declining volatility term structure; parallel vs non-parallel shifts; recombining vs not), identify which of the four models it describes. The Vasicek volatility-term-structure and non-recombination facts are the two traps almost everyone falls into at least once.</p>`,

  breakdown: [
    {
      title: "The four nested drift models",
      points: [
        "Model 1 (no drift): dr = σdw — pure noise, no directional bias, tree recombines, always some chance of negative rates.",
        "Model 2 (constant drift): dr = λdt + σdw — one fixed drift forever, tree still recombines but the middle node moves away from r0 over time.",
        "Ho-Lee (time-dependent drift): dr = λ(t)dt + σdw — a fresh λ every period, each one calibrated to match the observed market rate for that maturity; collapses to Model 2 if all λt are equal.",
        "Vasicek (mean reversion): dr = k(θ−r)dt + σdw — actively pulls the rate back toward long-run mean θ at speed k; the only one of the four whose tree does not naturally recombine."
      ]
    },
    {
      title: "Model 1's four named limitations",
      points: [
        "Flat volatility term structure — real observed volatility is hump-shaped (rises, then falls with maturity).",
        "Only one risk factor (the short rate itself) — implies parallel shifts only, contradicting observed non-parallel curve moves.",
        "Always a positive probability of negative rates — gets worse the longer the horizon and the lower the starting rate.",
        "The no-drift assumption alone forces a downward-sloping predicted par-yield curve, purely from the unopposed convexity effect (Reading 12)."
      ]
    },
    {
      title: "Two fixes for negative rates",
      points: [
        "Switch to a distribution that's always non-negative (lognormal or chi-squared) — negative rates become mathematically impossible, at the cost of possibly introducing unwanted skewness or distorted volatility elsewhere in the model.",
        "Keep the original (normal) tree but force any negative node to zero ('zero-flooring') — touches only the low-rate tail, leaving the rest of the distribution unchanged; generally the less invasive, preferred fix."
      ]
    },
    {
      title: "Arbitrage-free vs equilibrium models — what each is for",
      points: [
        "Arbitrage-free models: calibrated to match observed market prices exactly; used to price illiquid or customized securities (e.g. off-the-run Treasuries, options on bonds) relative to liquid, observable ones — but structurally useless for relative-value analysis since they assume the market is already correctly priced.",
        "Equilibrium models: derived from independent economic assumptions rather than forced to match today's quotes; can disagree with observed prices, which is exactly what makes them useful for flagging a security as cheap or rich relative to the curve."
      ]
    }
  ],

  quiz: [
    {
      q: "Using Model 2, the current short-term rate is 8%, the annual drift λ is 50bps, and the tree uses 2 annual periods. What is the interest rate at the middle node at the end of Year 2?",
      options: ["8.0%", "8.8%", "9.0%", "9.6%"],
      answer: 2,
      why: "The Model 2 middle node at time 2 is r0 + 2λdt = 8% + 2(0.50%)(1) = 9.0%. The up and down noise terms cancel out at the middle node, so the dw realization is irrelevant here; only the drift accumulates. 8.8% and 9.6% come from misapplying dw to the middle node, and 8.0% wrongly assumes no drift at all (that would be Model 1)."
    },
    {
      q: "In the Ho-Lee model, if the calibrated drift values turn out to be λ1 = λ2 = λ3 = … (identical every period), what does the model actually reduce to?",
      options: ["Model 1 (no drift)", "Model 2 (constant drift)", "The Vasicek model", "A different, unnamed model"],
      answer: 1,
      why: "A constant λ(t) = λ for all t is exactly Model 2's definition, so Ho-Lee nests Model 2 as this special case. It does not reduce to Model 1 (that requires λ = 0, not just constant), and it has no relationship to Vasicek's mean-reverting structure."
    },
    {
      q: "Why does the Vasicek model's interest rate tree fail to recombine, unlike Model 1, Model 2, and Ho-Lee?",
      options: [
        "Because its volatility term σ is stochastic rather than constant",
        "Because its drift adjustment k(θ − r) depends on how far the current rate already is from θ, so the up-then-down and down-then-up paths pick up different-sized adjustments",
        "Because it uses continuously compounded rates while the others use discrete compounding",
        "Because it requires more than two time periods to build"
      ],
      answer: 1,
      why: "The mean-reversion adjustment is path-dependent: it's larger when the rate is further from θ. Since the up-then-down and down-then-up paths pass through different intermediate rates, they get pulled back by different amounts and land on different final rates. Volatility in Vasicek is still constant (σ), compounding convention isn't the issue, and the non-recombination shows up starting at just 2 periods."
    },
    {
      q: "Model 1 predicts a flat volatility term structure. What shape does the actually-observed market volatility term structure typically take, which Model 1 fails to capture?",
      options: ["Declining with maturity", "Hump-shaped: rising then falling with maturity", "Strictly increasing with maturity", "U-shaped: falling then rising with maturity"],
      answer: 1,
      why: "The reading states observed volatility term structures are hump-shaped (rise, then fall), which a flat-volatility model like Model 1 cannot reproduce. 'Declining with maturity' is what Vasicek (not the observed market) produces — a common mix-up. Strictly increasing and U-shaped are not the pattern described in the source."
    },
    {
      q: "Which of these is NOT one of the two standard fixes for negative-rate probabilities described in this reading?",
      options: [
        "Using a lognormal or chi-squared distribution that can't go negative",
        "Flooring any negative tree node at 0%",
        "Increasing the mean-reversion speed k until negative outcomes become impossible",
        "Both the non-negative-distribution switch and zero-flooring are valid; raising k is not one of the two described"
      ],
      answer: 2,
      why: "The reading gives exactly two fixes: switch to a non-negative distribution, or floor negative nodes at zero. Increasing k only applies within Vasicek and reduces (does not eliminate) the chance of extreme moves. It is not one of the two named general-purpose fixes, and it isn't even available in Model 1, where the negative-rate problem is first introduced."
    },
    {
      q: "An analyst wants to determine whether a specific bond is cheap or rich relative to the rest of the yield curve. Which type of model should they use, and why?",
      options: [
        "An arbitrage-free model, because it is calibrated to match observed prices exactly",
        "An equilibrium model, because it derives prices from independent assumptions and can therefore disagree with (and flag mispricings in) observed market prices",
        "Either type works equally well for this purpose",
        "Neither — relative value analysis requires a historical simulation, not a term structure model"
      ],
      answer: 1,
      why: "Arbitrage-free models assume all securities are already correctly priced by construction, so they structurally cannot flag a mispricing; using one for relative value is 'meaningless,' per the reading. An equilibrium model has its own view of fair value independent of today's quotes, which is exactly what lets it disagree with the market and identify cheap/rich securities."
    }
  ],

  sources: [
    { title: "Vasicek model — Wikipedia", url: "https://en.wikipedia.org/wiki/Vasicek_model", note: "The formal stochastic differential equation, mean-reversion intuition, and closed-form bond pricing under the Vasicek model." },
    { title: "Ho–Lee model — Wikipedia", url: "https://en.wikipedia.org/wiki/Ho%E2%80%93Lee_model", note: "Background on the arbitrage-free, time-dependent-drift construction and how it's calibrated to the observed term structure." },
    { title: "Vasicek Interest Rate Model Definition — Investopedia", url: "https://www.investopedia.com/terms/v/vasicek-interest-rate-model.asp", note: "A plain-English walkthrough of the Vasicek model's mean-reversion mechanics and typical uses in practice." },
    { title: "Mean Reversion — Investopedia", url: "https://www.investopedia.com/terms/m/meanreversion.asp", note: "General intuition for mean-reverting processes, useful background before digging into Vasicek's k(θ−r) term specifically." }
  ],

  pdf: { book: 1, query: "term structure models for estimating short-term interest rates" },

  summary: `<p>Four nested drift models, same \\(\\sigma dw\\) noise term throughout. <strong>Model 1</strong> \\((dr=\\sigma dw)\\): recombining, symmetric, flat vol term structure, one factor, can go negative. <strong>Model 2</strong> \\((+\\lambda dt)\\): constant drift, still recombines, fits upward slopes but \\(\\lambda\\) can be unrealistically large/permanent. <strong>Ho-Lee</strong> \\((+\\lambda (t)dt)\\): time-varying drift calibrated per maturity; nests Model 2 \\((\\lambda_t\\) constant) which nests Model 1 \\((\\lambda =0)\\). <strong>Vasicek</strong> \\((+k(\\theta - r)dt)\\): mean-reverting; DOES NOT recombine (path-dependent); produces a DECLINING (not flat) volatility term structure and nonparallel shifts — the single most confused fact across R11-14; also gives closed forms for the expected rate at T years and the mean-reversion half-life \\(\\ln (2)/k\\). <strong>Arbitrage-free</strong> models match market prices exactly (useless for relative value); <strong>equilibrium</strong> models are needed to flag cheap/rich securities. Negative rates (a real risk in low-drift, low-level environments) are handled either by switching to a non-negative distribution or by flooring negative nodes at zero.</p>`
});
