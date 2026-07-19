FRM.register({
  book: 1, reading: 13,
  session: "Term Structures & Volatility",
  title: "The Art of Term Structure Models: Drift",
  tagline: "The formula-heaviest reading in the book — one continuous idea told in four increasingly flexible versions, each a strict generalization of the one before.",

  teaches: `<p>Start with a model that has no opinion about direction (Model 1), add a constant expected direction (Model 2), let that direction vary by time period (Ho-Lee), then let it actively pull back toward a long-run anchor (Vasicek). Each model nests the one before it: Model 1 ⊂ Model 2 ⊂ Ho-Lee, and Vasicek is a structurally different (mean-reverting) branch.</p>`,

  why: `<p>Reading 11 built the tree scaffold; Reading 12 explained why yields have their shape via expectations and convexity. Now: what should the DRIFT term inside the tree actually look like? Different drift assumptions produce curves with dramatically different shapes, volatility-term-structure implications, and (crucially) different probabilities of negative rates — a real modeling concern that shaped a decade of rates-market practice.</p>`,

  intuition: `<p>Think of the four models as a family tree of increasing ambition:</p>
  <p><strong>Model 1</strong> (no drift): recombining tree, symmetric 50/50 up/down, dr = \\(\\sigma dw\\). Limitations: flat volatility term structure (real markets show a hump), only one risk factor (parallel shifts only), and always positive probability of negative rates.</p>
  <p><strong>Model 2</strong> (constant drift): adds constant \\(\\lambda\\) combining risk premium + expected rate change. Tree still recombines. Better fits upward-sloping curves, but a single constant risk premium forever is a stretch for long horizons.</p>
  <p><strong>Ho-Lee</strong> (time-dependent drift): \\(\\lambda (t)\\) can differ every period, each calibrated to the observed market rate for that maturity — more flexible, and Model 2 is the special case where all \\(\\lambda_t\\) are equal.</p>
  <p><strong>Vasicek</strong> (mean reversion): adds \\(k(\\theta - r)\\), actively pulling the rate back toward long-run mean \\(\\theta\\) at speed k. This is the FIRST model whose tree does NOT naturally recombine — because the reversion adjustment depends on how far the current rate already is from \\(\\theta\\), so up-then-down ≠ down-then-up.</p>`,

  visual: `<div class="widget" data-widget="tree"></div>`,

  formulas: [
    { name: "The nested drift family", math: "Model 1: dr=\\sigma dw \\to Model 2: dr=\\lambda dt+\\sigma dw \\to Ho-Lee: dr=\\lambda (t)dt+\\sigma dw \\to Vasicek: dr=k(\\theta -r)dt+\\sigma dw", note: "Each arrow is a strict generalization. If \\(\\lambda_{1}=\\lambda_{2}=\\)…, Ho-Lee collapses to Model 2; if \\(\\lambda =0\\), Model 2 collapses to Model 1." }
  ],

  concepts: [
    {
      name: "Model 1 — no drift",
      def: "Recombining tree, 50/50 up/down, no directional bias: dr = \\(\\sigma dw\\).",
      example: "\\(r_{0}=6\\)%, \\(\\sigma =1.2\\)%/yr, monthly steps (dt=1/12): SD of monthly change = 1.2%\\(\\times \\sqrt{1/12}\\) = 0.346%. After 2 periods: upper node 6.692%, middle 6% (unchanged — no drift!), lower 5.308%.",
      pitfall: "Three named limitations: flat volatility term structure (real markets show a hump), only one risk factor (parallel shifts only — contradicts observed non-parallel curve moves), and always positive probability of negative rates (worse for longer horizons, lower starting levels).",
      related: ["Model 2 — constant drift"],
      memory: "Model 1 = a coin flip with no opinion about direction."
    },
    {
      name: "Model 2 — constant drift",
      def: "Adds constant \\(\\lambda\\) (drift = risk premium + expected rate change combined). Tree still recombines, but the middle node at time 2 = \\(r_{0}+2\\lambda dt\\) ≠ \\(r_{0}\\).",
      pitfall: "Better fits typical upward-sloping curves, but calibrated \\(\\lambda\\) can be unrealistically large, and assuming ONE constant risk premium forever is a stretch for long horizons.",
      related: ["Ho-Lee — time-dependent drift"]
    },
    {
      name: "Ho-Lee model — time-dependent drift",
      def: "\\(\\lambda (t)\\) can differ every period — more flexible, and each \\(\\lambda_t\\) is calibrated against the observed market rate for that maturity.",
      pitfall: "If \\(\\lambda_{1}=\\lambda_{2}=\\)…, Ho-Lee collapses EXACTLY to Model 2 — Model 2 is a special case of Ho-Lee, and Model 1 is a special case of Model 2 \\((\\lambda =0)\\). This nesting (Model 1 ⊂ Model 2 ⊂ Ho-Lee) is itself a testable fact.",
      related: ["Vasicek — mean reversion"],
      memory: "Ho-Lee = Model 2 with a different \\(\\lambda\\) allowed every single period."
    },
    {
      name: "Vasicek model — mean reversion",
      def: "dr = \\(k(\\theta - r)dt\\) + \\(\\sigma dw\\). k = speed of mean reversion (larger k → faster pull back to \\(\\theta )\\).",
      pitfall: "THE single most commonly confused concept across R11-14: Vasicek produces a DECLINING (not flat, not hump-shaped) volatility term structure — short rates overstated in volatility, long rates understated, because mean reversion dampens long-horizon uncertainty. It also implies NONPARALLEL shifts (a shock to the short rate matters less further out) — the opposite of Model 1's parallel-shift-only behavior. Large k = shocks short-lived (revert fast); small k = shocks long-lived (revert slowly).",
      example: "Unlike the previous three, the Vasicek tree does NOT naturally recombine — up-down and down-up paths land on different rates because the reversion adjustment depends on how far the current rate already is from \\(\\theta\\). Forcing recombination requires averaging the two middle nodes and solving for new (non-50/50) probabilities p and q.",
      related: [{ r: 14, label: "R14 — CIR adds mean reversion AND level-dependent volatility" }],
      memory: "Vasicek = a rubber band pulling rates back to \\(\\theta\\); the harder the pull (k), the faster shocks fade and the more the tree twists out of recombination."
    },
    {
      name: "Arbitrage-free vs equilibrium models",
      def: "Arbitrage-free models are calibrated to match observed market prices exactly (good for pricing illiquid/derivative instruments relative to liquid ones) but are USELESS for relative value analysis.",
      pitfall: "If you assume the market is already correctly priced (which is what 'arbitrage-free' means), you can't use the model to say one security is cheap relative to another. For that, you need an equilibrium model instead.",
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
    { wrong: "\"Vasicek produces a flat or hump-shaped volatility term structure like the other models.\"", right: "Vasicek produces a DECLINING volatility term structure — mean reversion dampens long-horizon uncertainty specifically. This is the single most confused point across Readings 11-14." },
    { wrong: "\"All four drift models produce recombining trees.\"", right: "Model 1, Model 2, and Ho-Lee all recombine. Vasicek does NOT recombine naturally — because its drift adjustment depends on distance from \\(\\theta\\), which differs by path." },
    { wrong: "\"Ho-Lee and Model 2 are essentially different models.\"", right: "Ho-Lee nests Model 2 exactly: if all \\(\\lambda_t\\) are equal, Ho-Lee IS Model 2. And if \\(\\lambda =0\\), Model 2 IS Model 1. It's one nested family, not four unrelated models." },
    { wrong: "\"Arbitrage-free models can identify cheap or rich securities.\"", right: "By construction they assume the market is already correctly priced — that's what 'arbitrage-free' calibration means. Relative value analysis needs an equilibrium model instead." }
  ],

  highYield: [
    { stars: 5, what: "The nested family: Model 1 ⊂ Model 2 ⊂ Ho-Lee, and Vasicek's mean-reversion branch with \\(k(\\theta - r)\\).", why: "The single most reliably tested structural fact in this reading — know the nesting cold." },
    { stars: 5, what: "Vasicek's declining volatility term structure and non-parallel shifts — the #1 most confused concept in R11-14.", why: "GARP explicitly flags this as the reading's hardest, most-tested distinction." },
    { stars: 4, what: "Why Vasicek's tree doesn't recombine (path-dependent reversion adjustment).", why: "A conceptual mechanism question that also tests understanding of backward induction from R11." },
    { stars: 3, what: "Model 1's three named limitations (flat vol TS, one factor, negative rates possible).", why: "A clean three-part recall list, individually testable." },
    { stars: 3, what: "Arbitrage-free vs equilibrium models — what each is good/useless for.", why: "A recurring conceptual contrast tested with 'which model would you use to find a mispriced security.'" }
  ],

  recall: [
    { q: "If Ho-Lee's calibrated \\(\\lambda_t\\) values turn out identical across all periods, what model do you actually have?", a: "Model 2 (constant drift) — Ho-Lee nests Model 2 exactly as the special case where all time-varying drift terms are equal." },
    { q: "Why does Vasicek's tree fail to recombine while Model 1/2/Ho-Lee's trees do?", a: "Vasicek's drift adjustment \\(k(\\theta - r)\\) depends on how far the CURRENT rate already is from \\(\\theta\\) — a path-dependent quantity. Up-then-down and down-then-up traverse different intermediate rates, so they land on different final rates, breaking recombination. The drift-only models (1, 2, Ho-Lee) have no such path dependence." },
    { q: "Explain in one sentence why Vasicek produces a DECLINING volatility term structure.", a: "Mean reversion actively pulls rates back toward \\(\\theta\\), and this pull compounds over time, dampening the accumulated uncertainty at long horizons relative to short ones — so long-horizon rate volatility ends up lower than short-horizon volatility." },
    { q: "You need to identify whether a specific bond is cheap or rich relative to the rest of the curve. Should you reach for an arbitrage-free or an equilibrium model, and why?", a: "Equilibrium model — arbitrage-free models are calibrated to already match observed market prices exactly, so by construction they can't flag any security as mispriced relative to the model." },
    { q: "Model 1 has three named limitations. State them and explain which one Vasicek specifically fixes.", a: "Flat volatility term structure, single risk factor (parallel shifts only), and positive probability of negative rates. Vasicek fixes the flat-vol-term-structure limitation by producing a declining term structure via mean reversion (though it still allows negative rates and — like Model 1 — is a one-factor model)." }
  ],

  hooks: [
    { title: "The family tree", text: "Model 1 has no opinion. Model 2 picks a direction and never changes its mind. Ho-Lee changes its mind every period. Vasicek is the rebellious cousin who actively pulls back toward home \\((\\theta )\\) — and is the only one whose tree won't sit still (recombine)." },
    { title: "The rubber band", text: "k in Vasicek is rubber-band stiffness. Big k: rates snap back to \\(\\theta\\) fast, shocks are short-lived. Small k: a loose rubber band, shocks linger." },
    { title: "One idea, four costumes", text: "dr = \\(\\sigma dw\\) → \\(+\\lambda dt\\) → \\(+\\lambda (t)dt\\) → \\(+k(\\theta - r)dt\\). Same \\(\\sigma dw\\) core noise term in every model; only the drift costume changes." }
  ],

  summary: `<p>Four nested drift models, same \\(\\sigma dw\\) noise term throughout. <strong>Model 1</strong> \\((dr=\\sigma dw)\\): recombining, symmetric, flat vol term structure, one factor, can go negative. <strong>Model 2</strong> \\((+\\lambda dt)\\): constant drift, still recombines, fits upward slopes but \\(\\lambda\\) can be unrealistically large/permanent. <strong>Ho-Lee</strong> \\((+\\lambda (t)dt)\\): time-varying drift calibrated per maturity; nests Model 2 \\((\\lambda_t\\) constant) which nests Model 1 \\((\\lambda =0)\\). <strong>Vasicek</strong> \\((+k(\\theta - r)dt)\\): mean-reverting; DOES NOT recombine (path-dependent); produces a DECLINING (not flat) volatility term structure and nonparallel shifts — the single most confused fact across R11-14. <strong>Arbitrage-free</strong> models match market prices exactly (useless for relative value); <strong>equilibrium</strong> models are needed to flag cheap/rich securities.</p>`
});
