FRM.register({
  book: 1, reading: 14,
  session: "Term Structures & Volatility",
  title: "The Art of Term Structure Models: Volatility and Distribution",
  tagline: "Reading 13 varied the drift term across four models. This reading holds a similar structure but varies the VOLATILITY term instead.",

  teaches: `<p>First let volatility change deterministically over time (Model 3), then let volatility depend on the LEVEL of rates themselves (CIR and lognormal models) — which finally guarantees rates can never go negative. Ends with the additive-vs-multiplicative drift distinction and the Black-Karasinski model.</p>`,

  why: `<p>Model 1's biggest flaw wasn't just its drift — it was that constant volatility independent of the rate level allows rates to go negative, and produces a flat (unrealistic) volatility term structure. This reading's models fix that by making volatility itself either time-varying (useful for pricing caps/floors) or rate-level-dependent (useful for guaranteeing non-negative rates), and each fix has a genuinely different practical use case.</p>`,

  intuition: `<p><strong>Model 3</strong>: volatility decays exponentially from an initial \\(\\sigma\\) toward 0 over time — especially useful for caps/floors, whose value depends critically on forecasted \\(\\sigma (t)\\) at multiple future dates. Curious fact: under specific conditions (matching decay rate to Vasicek's mean-reversion rate), Model 3 and Vasicek can produce IDENTICAL terminal standard deviations — but Model 3 still implies parallel shifts (unlike Vasicek), so they're not the same model in disguise.</p>
  <p><strong>CIR and lognormal</strong>: volatility depends on the LEVEL of rates. CIR: basis-point vol increases with \\(\\sqrt{r}\\) (at a decreasing rate); yield vol is NOT constant; cannot go negative. Lognormal (Model 4): basis-point vol increases linearly with r \\((=\\sigma r)\\); yield vol IS constant \\((=\\sigma )\\); cannot go negative. Don't confuse "basis point volatility" (vol of the level change dr) with "yield volatility" (vol of the percentage change) — CIR has NEITHER constant, but lognormal has constant YIELD vol even though its basis-point vol still increases with rate level.</p>
  <p><strong>Additive vs multiplicative drift</strong>: Ho-Lee's drift terms are ADDITIVE (dr = \\(\\lambda (t)dt\\) + …); the lognormal model's drift, modeled in log-space, translates to a MULTIPLICATIVE effect on actual rates (since e^x ≈ 1+x for small x). Get the direction right — lognormal is multiplicative, not Ho-Lee.</p>`,

  formulas: [
    { name: "CIR model", math: "dr = k(\\theta -r)dt + \\sigma \\sqrt{r} \\cdot dw", note: "Mean reversion (Vasicek-style) plus level-dependent volatility. Cannot go negative; basis-point vol increases with \\(\\sqrt{r}\\)." },
    { name: "Lognormal model", math: "d ln(r) = \\lambda (t)dt + \\sigma dw", note: "Constant YIELD volatility \\((\\sigma )\\); basis-point volatility still increases linearly with r \\((=\\sigma r)\\). Cannot go negative." }
  ],

  concepts: [
    {
      name: "Model 3 — time-dependent volatility",
      def: "Volatility decays exponentially from an initial \\(\\sigma\\) toward 0 (or follows whatever deterministic path is specified).",
      example: "Especially useful for pricing caps/floors, whose value depends critically on forecasted \\(\\sigma (t)\\) at multiple future dates.",
      pitfall: "Under specific conditions (matching decay rate to Vasicek's mean-reversion rate), Model 3 and Vasicek can produce IDENTICAL terminal standard deviations — but Model 3 still implies PARALLEL shifts (unlike Vasicek's nonparallel shifts), so they are not the same model in disguise despite matching one statistic.",
      related: [{ r: 13, label: "R13 — Vasicek, whose terminal SD Model 3 can match" }]
    },
    {
      name: "CIR and lognormal — level-dependent volatility",
      def: "CIR: dr = \\(k(\\theta - r)dt\\) + \\(\\sigma \\sqrt{r}\\cdot dw\\) — basis-point vol increases with \\(\\sqrt{r}\\) at a decreasing rate, yield vol NOT constant, cannot go negative. Lognormal (Model 4): d ln(r) = \\(\\lambda (t)dt\\) + \\(\\sigma dw\\) — basis-point vol increases linearly with r \\((=\\sigma r)\\), yield vol IS constant \\((\\sigma )\\), cannot go negative.",
      pitfall: "Don't confuse 'basis point volatility' (volatility of the level change dr) with 'yield volatility' (volatility of the percentage change). CIR has NEITHER constant — but the lognormal model has CONSTANT yield volatility even though its basis-point volatility still increases with the rate level. This exact distinction has been directly tested.",
      related: ["Model 1 / Vasicek volatility behavior"],
      memory: "CIR: vol grows with \\(\\sqrt{r}\\), both vol measures move. Lognormal: vol grows with r, but yield vol stays flat."
    },
    {
      name: "Lognormal with drift vs mean reversion (Black-Karasinski)",
      def: "Lognormal with deterministic drift is modeled additively in LOG-space, but because e^x ≈ 1+x for small x, the effect on actual RATES is MULTIPLICATIVE, not additive like Ho-Lee.",
      example: "Lognormal with mean reversion is the Black-Karasinski model — combines mean reversion (Vasicek-style, but in log-space) with time-varying volatility.",
      pitfall: "'Ho-Lee's drift terms are additive; the lognormal model's drift terms are multiplicative' — this exact additive-vs-multiplicative contrast is the crux of an entire exam question type. Get the direction right: it's LOGNORMAL that's multiplicative, not Ho-Lee. Like Vasicek, Black-Karasinski's tree does not naturally recombine and requires recalibrating the time step (dt) between periods to force recombination.",
      related: [{ r: 13, label: "R13 — Ho-Lee's additive drift, the contrast case" }],
      memory: "Lognormal lives in log-space (additive there) but acts multiplicatively on real rates — log-space addition becomes rate-space multiplication."
    }
  ],

  connections: {
    from: [
      { r: 13, why: "Direct structural parallel — R13 varied drift across a nested family; this reading varies volatility the same way." },
      { r: 11, why: "Non-recombining trees (introduced conceptually in R11, realized in Vasicek) reappear here for Black-Karasinski." }
    ],
    to: [
      { r: 15, why: "The volatility-smile story is the options-market analogue: what happens when a model's constant-volatility assumption is empirically wrong." }
    ],
    confused: [
      { what: "Basis point volatility vs yield volatility", how: "Basis-point vol = SD of the absolute rate change (dr); yield vol = SD of the percentage change. CIR has neither constant; lognormal has constant yield vol but still rate-level-dependent basis-point vol." },
      { what: "Model 3 vs Vasicek", how: "Both can produce the same terminal standard deviation under specific calibration, but Model 3 implies parallel shifts while Vasicek implies nonparallel shifts — matching one statistic doesn't make them the same model." },
      { what: "Ho-Lee's additive drift vs lognormal's multiplicative drift", how: "Ho-Lee's drift acts directly, additively, on the rate. Lognormal's drift acts additively in LOG-space, which translates to a multiplicative effect on the actual rate level." }
    ]
  },

  misconceptions: [
    { wrong: "\"If Model 3 and Vasicek produce the same terminal standard deviation, they're the same model.\"", right: "They can match on that ONE statistic under specific calibration, but Model 3 still implies parallel shifts while Vasicek implies nonparallel shifts — genuinely different models that happen to agree on one number." },
    { wrong: "\"The lognormal model has constant volatility, just like Model 1.\"", right: "It has constant YIELD volatility \\((\\sigma )\\), but its basis-point volatility still increases linearly with the rate level \\((=\\sigma r)\\) — 'constant volatility' needs to specify WHICH volatility." },
    { wrong: "\"Ho-Lee's drift is multiplicative.\"", right: "Ho-Lee's drift is ADDITIVE (dr = \\(\\lambda (t)dt\\) + \\(\\sigma dw)\\). It's the LOGNORMAL model whose log-space additive drift translates into a multiplicative effect on actual rates — the reverse assignment is the classic trap." },
    { wrong: "\"CIR has constant yield volatility like the lognormal model.\"", right: "CIR has NEITHER basis-point nor yield volatility constant — both vary with the rate level, distinguishing it from lognormal's constant yield vol." }
  ],

  highYield: [
    { stars: 4, what: "CIR vs lognormal: which volatility measure (basis-point vs yield) is constant in each.", why: "The single most precisely tested distinction in this reading — directly tested before." },
    { stars: 4, what: "Ho-Lee additive vs lognormal multiplicative drift — get the assignment right.", why: "An entire exam question type hinges on this exact direction; the reversed assignment is the trap." },
    { stars: 3, what: "Model 3's use case (caps/floors) and its parallel-shift property despite matching Vasicek's terminal SD.", why: "Tests whether you distinguish 'matches one statistic' from 'is the same model.'" },
    { stars: 3, what: "CIR and lognormal both guarantee non-negative rates via level-dependent volatility.", why: "Connects back to Model 1/Vasicek's negative-rate flaw — the motivating problem these models solve." }
  ],

  recall: [
    { q: "A colleague says 'CIR and lognormal both have constant volatility, so they're basically the same.' Correct this.", a: "Neither has ALL volatility measures constant. Lognormal has constant YIELD volatility \\((\\sigma )\\) but basis-point volatility still rises linearly with the rate level. CIR has NEITHER constant — both basis-point and yield volatility vary with the rate level (basis-point vol rises with \\(\\sqrt{r}\\) at a decreasing rate). They are meaningfully different models." },
    { q: "Why can Model 3 match Vasicek's terminal standard deviation under specific calibration, yet still be a fundamentally different model?", a: "Because terminal SD is just one summary statistic. Model 3 still implies PARALLEL shifts across the curve (like Model 1), while Vasicek implies NONPARALLEL shifts (mean-reversion dampens long-horizon impact) — a structurally different volatility term structure despite matching one number." },
    { q: "Explain precisely why the lognormal model's drift is described as 'multiplicative' even though it's written additively.", a: "The lognormal model's drift is additive in LOG-space: d ln(r) = \\(\\lambda (t)dt\\) + \\(\\sigma dw\\). But because e^x ≈ 1+x for small x, an additive change in ln(r) translates into a MULTIPLICATIVE change in the actual rate r itself — the opposite of Ho-Lee, whose drift acts additively on the rate directly." },
    { q: "Why is CIR (and lognormal) preferred over Model 1/Vasicek for modeling rates that must stay non-negative?", a: "Both make volatility depend on the LEVEL of the rate (CIR: \\(\\sigma \\sqrt{r}\\); lognormal: effectively \\(\\sigma r\\) in basis-point terms) — as r approaches zero, volatility shrinks toward zero too, preventing the rate from being pushed negative. Model 1 and Vasicek have volatility independent of the rate level, so they always carry positive probability of negative rates." }
  ],

  hooks: [
    { title: "Same number, different model", text: "Model 3 and Vasicek can agree on 'terminal standard deviation' the way two students can get the same final exam score by studying completely different material — one number matching doesn't make the underlying process identical." },
    { title: "Log-space addition, rate-space multiplication", text: "Lognormal's drift adds in log-space but multiplies in rate-space — like adding exponents multiplies the underlying numbers. Ho-Lee skips the log entirely and adds directly." },
    { title: "The volatility that protects against zero", text: "CIR and lognormal both shrink volatility as the rate approaches zero — like a car automatically slowing down as it nears a cliff edge, mechanically preventing it from going over (negative)." }
  ],

  summary: `<p><strong>Model 3</strong>: time-decaying volatility (useful for caps/floors); can match Vasicek's terminal SD under specific calibration but still implies PARALLEL shifts (different from Vasicek's nonparallel shifts) — matching one statistic ≠ being the same model. <strong>CIR</strong> \\((dr=k(\\theta - r)dt+\\sigma \\sqrt{r}\\cdot dw)\\): basis-point vol rises with \\(\\sqrt{r}\\) (decreasing rate), yield vol NOT constant, cannot go negative. <strong>Lognormal</strong> (d ln \\(r=\\lambda (t)dt+\\sigma dw)\\): basis-point vol rises linearly with r, yield vol CONSTANT \\((\\sigma )\\), cannot go negative — the CIR/lognormal distinction on WHICH volatility is constant is the most tested fact here. <strong>Additive vs multiplicative drift</strong>: Ho-Lee is additive on the rate; lognormal is additive in log-space, hence multiplicative on the actual rate — Black-Karasinski (lognormal + mean reversion) inherits Vasicek's non-recombining tree problem.</p>`
});
