export default ({
  book: 1, reading: 14,
  session: "Term Structures & Volatility",
  title: "The Art of Term Structure Models: Volatility and Distribution",
  tagline: "Reading 13 varied the drift term across four models. This reading holds a similar structure but varies the VOLATILITY term instead.",

  teaches: `<p>Reading 13 showed you Model 1 (no drift), Model 2 (constant drift), Ho-Lee (time-dependent drift) and Vasicek (mean-reverting drift) — all four kept volatility constant. This reading asks a different question: what if the VOLATILITY term, not the drift term, is what's unrealistic? It walks through three fixes, in order of increasing sophistication. First, let volatility change over time in a fixed, known way (<strong>Model 3</strong>) — useful when you need to forecast volatility itself at multiple future dates. Second, let volatility depend on the LEVEL of the short rate <em>r</em> itself, via two competing functional forms: the <strong>CIR model</strong> (volatility scales with \\(\\sqrt r\\)) and the <strong>lognormal model</strong>, also called <strong>Model 4</strong> (volatility scales linearly with r). Making volatility shrink as r approaches zero is what finally guarantees the short rate can never go negative — Model 1's original, unfixed flaw. Ends with the additive-vs-multiplicative drift distinction (Ho-Lee vs. lognormal) and the <strong>Black-Karasinski model</strong>, which is simply "lognormal + mean reversion."</p>`,

  why: `<p>Model 1's biggest flaw wasn't just its drift — it was that constant volatility independent of the rate level allows rates to go negative, and produces a flat (unrealistic) volatility term structure. Think about why that matters in practice: a normal distribution has support on the entire real line, so no matter how you center it, some probability mass always sits below zero. If you're using the model to price a bond or a cap, that sliver of "negative-rate" probability mass distorts the price by an amount that depends on how far the mean is from zero and how large the volatility is. This reading's models fix the negative-rate problem by making volatility itself either time-varying (useful for pricing multi-period derivatives like caps/floors, whose payoffs depend on the forecast path of volatility) or rate-level-dependent (useful for guaranteeing non-negative rates, since a rate near zero should have almost no room to move further down) — and each fix has a genuinely different practical use case, which is exactly how the exam distinguishes them.</p>`,

  intuition: `<p><strong>Model 3 (time-dependent volatility)</strong>: \\(dr = \\lambda(t)dt + \\sigma e^{-\\alpha t}dw\\) — volatility decays exponentially from an initial \\(\\sigma\\) toward 0 as \\(t\\) grows, following a fixed, deterministic schedule you specify in advance (it is NOT a function of the rate level — it's purely a function of calendar time). This is especially useful for pricing caps and floors: a cap is a portfolio of "caplets," each of which is essentially a call option on the short rate for one future period, and the price of each caplet depends critically on the market's forecast of \\(\\sigma(t)\\) at that specific future date. Curious fact: under specific conditions (matching the decay rate \\(\\alpha\\) to Vasicek's mean-reversion rate \\(k\\), with equal initial volatility), Model 3 and Vasicek can produce IDENTICAL terminal standard deviations — but Model 3 still implies parallel shifts of the whole yield curve (like Model 1), unlike Vasicek's nonparallel shifts, so matching one number does not make them the same model.</p>
  <p><strong>Worked example (straight from the source):</strong> current short rate \\(r_0=5\\%\\), drift \\(\\lambda=0.24\\%\\), initial volatility \\(\\sigma=1.50\\%\\), decay \\(e^{-0.3t}\\), and a drawn shock \\(dw=0.2\\) over a one-month step (\\(dt=1/12\\)). The rate change is \\(dr=\\lambda \\cdot dt + \\sigma e^{-0.3t}dw = 0.24\\%(1/12) + 1.50\\%\\,e^{-0.3(1/12)}(0.2) \\approx 0.02\\% + 0.29\\% = 0.31\\%\\), giving a new rate of \\(5.31\\%\\). Compare that to what constant volatility (no decay) would give: \\(1.50\\%(0.2)=0.30\\%\\), plus the same drift, \\(=0.32\\%\\), for a new rate of \\(5.32\\%\\). Model 3's rate change is slightly SMALLER — exactly what you'd expect, since the exponential decay has already started shrinking \\(\\sigma\\) by month one.</p>
  <p><strong>CIR and lognormal (level-dependent volatility)</strong>: both make basis-point volatility (the SD of the raw rate change \\(dr\\), measured in basis points) increase with the LEVEL of the rate, so that as \\(r\\) approaches zero, the random shock shrinks toward zero too — mechanically preventing the rate from being pushed negative (a positive drift term then keeps it from crossing zero). CIR: basis-point vol increases with \\(\\sqrt r\\) (at a DECREASING rate — each additional percentage point of rate adds progressively less extra volatility); yield vol (the vol of the percentage/proportional change) is NOT constant. Lognormal (Model 4): basis-point vol increases LINEARLY with \\(r\\) (\\(=\\sigma r\\)); yield vol IS constant (\\(=\\sigma\\)). Don't confuse "basis-point volatility" (vol of the level change \\(dr\\), in bps) with "yield volatility" (vol of the percentage change) — CIR has NEITHER constant, but lognormal has constant YIELD vol even though its basis-point vol still increases with rate level. This exact distinction has been directly tested.</p>
  <p><strong>Worked example (CIR):</strong> \\(r_0=5\\%\\), long-run mean \\(\\theta=24\\%\\), speed of adjustment \\(k=0.04\\), \\(\\sigma=1.50\\%\\), same shock \\(dw=0.2\\), one-month step. \\(dr = k(\\theta-r)dt + \\sigma\\sqrt r \\, dw = 0.04(0.24-0.05)(1/12) + 1.50\\%\\sqrt{0.05}(0.2) \\approx 0.06\\% + 0.07\\% = 0.13\\%\\), giving a new rate of \\(5.13\\%\\). Even with the same shock \\(dw=0.2\\) used in Model 3, CIR produces a smaller rate change — because the mean-reversion pull is small this far from \\(\\theta\\) at this \\(k\\), and \\(\\sigma\\sqrt r\\) at \\(r=5\\%\\) is smaller than \\(\\sigma\\) alone.</p>
  <p><strong>Terminal distribution shapes:</strong> compare the normal (Model 1/Vasicek), CIR, and lognormal distributions of the rate after, say, 10 years, holding mean and SD equal across all three. The normal distribution always has a left tail extending below zero — the longer the horizon, the more probability mass sits at negative rates. CIR and lognormal, by contrast, are always non-negative and skewed to the right. This isn't just cosmetic: it matters for pricing out-of-the-money options on rates, where the probability mass in the tails can differ dramatically between a normal and a skewed-right distribution.</p>
  <p><strong>Additive vs multiplicative drift</strong>: Ho-Lee's drift terms are ADDITIVE — \\(dr = \\lambda(t)dt + \\sigma dw\\) adds directly onto the rate. The lognormal model's drift is modeled in LOG-space (\\(d\\ln r = \\lambda(t)dt + \\sigma dw\\)), additive there — but because \\(e^x \\approx 1+x\\) for small \\(x\\), an additive change to \\(\\ln r\\) translates into a MULTIPLICATIVE effect on the actual rate \\(r\\). Concretely: if \\(\\sigma=20\\%\\), the up-node rate is \\(r_0 e^{0.20} \\approx r_0(1+0.20)\\) — 20% ABOVE the current rate, not 20 percentage points above it. This also guarantees positivity: \\(e^x>0\\) for every real \\(x\\), so no matter how negative the log-space shock, the exponentiated rate can never cross zero. Get the direction right on the exam — lognormal is multiplicative, not Ho-Lee.</p>`,

  eli5: `<p>Imagine two different ways a landlord might adjust your rent to reflect risk of vacancy. In one building, the landlord adjusts the rent by a fixed dollar amount each year regardless of how high or low the rent already is (Ho-Lee-style, additive) — the same $50 swing whether your rent is $500 or $5,000. In the other building, the landlord adjusts the rent by a fixed PERCENTAGE (lognormal-style, multiplicative) — a 5% swing means $25 on a $500 rent but $250 on a $5,000 rent, and rent can never actually hit $0 because a percentage cut off a positive number is always positive. Separately, imagine a car with cruise control that automatically eases off the accelerator the closer it gets to a cliff edge — the closer you are to the edge (rate near zero), the smaller the "gas" (volatility) applied, so you're mechanically prevented from going over. That's the CIR/lognormal fix for negative rates: shrink the randomness itself as the rate approaches zero. Mapped back to the reading: the percentage-adjustment building is the lognormal model's multiplicative drift, and the cliff-edge cruise control is CIR and lognormal's level-dependent volatility, both of which replace Model 1's flat, level-independent volatility that let rates wander below zero.</p>`,

  thinkLike: `<p>A risk manager choosing among these models isn't picking "the best one" in the abstract — they're matching the model to the job. If the job is pricing interest rate caps and floors, whose payoffs depend on forecasting volatility at several specific future dates, a time-dependent volatility model (Model 3) is attractive because it lets you calibrate \\(\\sigma(t)\\) directly to observed market prices at each maturity. If the job is hedging or valuing a fixed-income position where you need the model to behave sensibly across the full range of possible future rate paths — including staying non-negative during a low-rate regime — CIR or lognormal is preferred, because their volatility automatically compresses as rates approach zero. And if the job doesn't especially care about the negative-rate tail (a market maker who believes rates will stay comfortably positive and thinks the mispricing from a small negative-rate probability is immaterial) they may reasonably choose the SIMPLER constant-volatility model rather than pay the complexity cost of CIR.</p>
  <p>On the exam, this reading is tested less as "derive the formula" and more as "can you keep four models straight without swapping their properties." The examiner loves to test: (1) which volatility measure — basis-point or yield — is constant under CIR vs. lognormal (the answer is neither for CIR, only yield for lognormal); (2) whether you get the additive/multiplicative assignment backwards between Ho-Lee and lognormal (a classic reversed-direction trap); and (3) whether you understand that "Model 3 and Vasicek can match on terminal SD" is a narrow, calibration-dependent coincidence, not evidence the models are interchangeable — Model 3 still implies parallel shifts, Vasicek does not. Practice being able to state, cold, for each of Model 1/Vasicek, CIR, and lognormal: is basis-point vol constant? Is yield vol constant? Can the rate go negative?</p>`,

  breakdown: [
    {
      title: "The volatility fixes to Model 1 (in order of the reading)",
      points: [
        "Model 1 / Vasicek (the baseline, recap from R13): volatility is constant, independent of the rate level — this is exactly why rates can go negative, and why the model produces a flat (unrealistic) volatility term structure.",
        "Model 3 — time-dependent volatility: \\(dr=\\lambda(t)dt+\\sigma e^{-\\alpha t}dw\\). Volatility decays deterministically over calendar time (not tied to the rate level). Best for pricing caps/floors, whose value depends on forecast \\(\\sigma(t)\\) at multiple dates. Still implies parallel yield-curve shifts and still allows negative rates.",
        "CIR — level-dependent volatility (square root): \\(dr=k(\\theta-r)dt+\\sigma\\sqrt r \\, dw\\). Basis-point vol rises with \\(\\sqrt r\\) at a decreasing rate; yield vol not constant. Cannot go negative because volatility shrinks to zero as \\(r\\to 0\\), same as the mean-reverting drift pulling r back up.",
        "Lognormal (Model 4) — level-dependent volatility (linear): \\(d\\ln r=\\lambda(t)dt+\\sigma dw\\). Basis-point vol rises linearly with r (\\(=\\sigma r\\)); yield vol constant (\\(=\\sigma\\)). Cannot go negative because \\(e^x>0\\) for all real x. Drift is additive in log-space but multiplicative on the actual rate.",
        "Black-Karasinski — lognormal + mean reversion: combines Vasicek-style mean reversion (in log-space) with lognormal's time-varying volatility. Like Vasicek, its tree does not naturally recombine and needs the time step recalibrated between periods to force recombination."
      ]
    },
    {
      title: "Basis-point vol vs. yield vol vs. can-go-negative, by model",
      points: [
        "Model 1 / Vasicek (normal): basis-point vol constant, independent of r. Yield vol NOT constant. CAN go negative — this is the flaw the rest of the reading fixes.",
        "CIR: basis-point vol increases with \\(\\sqrt r\\) at a decreasing rate. Yield vol NOT constant. Cannot go negative.",
        "Lognormal (Model 4): basis-point vol increases linearly with r (\\(=\\sigma r\\)). Yield vol IS constant (\\(=\\sigma\\)). Cannot go negative.",
        "Trap to remember: CIR has NEITHER volatility measure constant; lognormal has ONLY yield vol constant. Neither model has constant basis-point vol — that's the whole point of making volatility level-dependent."
      ]
    }
  ],

  formulas: [
    {
      name: "Model 3 — time-dependent volatility",
      math: "dr = \\lambda(t)dt + \\sigma e^{-\\alpha t}dw",
      note: "Volatility decays exponentially from an initial \\(\\sigma\\) toward 0 as calendar time \\(t\\) increases — a purely time-driven schedule, not tied to the rate level. Especially useful for caps/floors, whose value depends on forecasted \\(\\sigma(t)\\) at multiple future dates.",
      plain: "This says the rate's random shock each period still has the same drift term as before, but its size is shrinking on a fixed, pre-set schedule over calendar time — it starts at \\(\\sigma\\) and decays toward zero, regardless of what the rate itself happens to be doing.",
      derivation: "<p>Worked example straight from the source: \\(r_0=5\\%\\), \\(\\lambda=0.24\\%\\), \\(\\sigma=1.50\\%\\), decay \\(e^{-0.3t}\\), shock \\(dw=0.2\\), step \\(dt=1/12\\) (one month, so \\(t\\approx 1/12\\)).</p><p>\\[ dr = \\lambda\\,dt + \\sigma e^{-0.3t}dw = 0.24\\%\\left(\\dfrac{1}{12}\\right) + 1.50\\%\\, e^{-0.3(1/12)}(0.2) \\] \\[ \\approx 0.02\\% + 1.50\\%(0.9753)(0.2) \\approx 0.02\\% + 0.29\\% = 0.31\\% \\]</p><p>New rate \\(= r_0 + dr = 5\\% + 0.31\\% = 5.31\\%\\). If volatility had been held constant instead of decaying, the shock term alone would be \\(1.50\\%(0.2)=0.30\\%\\), giving a new rate of \\(5.32\\%\\) — Model 3's answer is slightly smaller, exactly as expected since the exponential decay has already reduced \\(\\sigma\\) by the one-month mark.</p>"
    },
    { name: "CIR model", math: "dr = k(\\theta -r)dt + \\sigma \\sqrt{r} \\cdot dw", note: "Mean reversion (Vasicek-style) plus level-dependent volatility. Cannot go negative; basis-point vol increases with \\(\\sqrt{r}\\).",
      plain: "This says the expected change in the short rate each period comes from two pieces: a mean-reversion pull toward the long-run rate \\(\\theta\\) at speed \\(k\\) (same as Vasicek), plus a random shock whose SIZE scales with the square root of the current rate level — so as \\(r\\) gets closer to zero, the random shock shrinks toward zero too, which is what keeps the rate from ever crossing into negative territory.",
      derivation: "<p>Worked example straight from the source (continuing the setup from Model 3 above): current rate \\(r_0=5\\%\\), long-run mean \\(\\theta=24\\%\\), speed of adjustment \\(k=0.04\\), volatility \\(\\sigma=1.50\\%\\), same shock \\(dw=0.2\\), one-month step \\(dt=1/12\\).</p><p>\\[ dr = k(\\theta-r)\\,dt + \\sigma\\sqrt{r}\\,dw = 0.04(0.24-0.05)\\left(\\dfrac{1}{12}\\right) + 1.50\\%\\sqrt{0.05}\\,(0.2) \\] \\[ \\approx 0.06\\% + 0.07\\% = 0.13\\% \\]</p><p>New rate \\(= 5\\% + 0.13\\% = 5.13\\%\\). Note this is a smaller rate change than Model 3 produced (0.31%) with the same shock \\(dw=0.2\\) — because \\(\\sigma\\sqrt r\\) at \\(r=5\\%\\) (\\(1.50\\%\\times 0.224=0.34\\%\\)) is already smaller than Model 3's undecayed \\(\\sigma=1.50\\%\\).</p>"
    },
    { name: "Lognormal model", math: "d \\ln(r) = \\lambda (t)dt + \\sigma dw", note: "Constant YIELD volatility \\((\\sigma )\\); basis-point volatility still increases linearly with r \\((=\\sigma r)\\). Cannot go negative.",
      plain: "This models the LOG of the short rate — not the rate itself — as following a random walk with a possibly time-varying drift and constant volatility. Because logs turn multiplication into addition, an additive shock to \\(\\ln r\\) translates back into a multiplicative (percentage) shock to the actual rate \\(r\\), which is why yield volatility stays constant even though basis-point volatility scales up with the rate level, and why r can never be pushed below zero.",
      derivation: "<p>Set \\(a_1=0\\) (no drift for this step) and \\(dt=1\\), so \\(\\ln r_1 = \\ln r_0 + \\sigma\\). Exponentiating both sides: \\[ r_1 = r_0\\, e^{\\sigma} \\] Using the small-\\(x\\) approximation \\(e^{x}\\approx 1+x\\): \\[ r_1 \\approx r_0(1+\\sigma) \\] So volatility acts as a PERCENTAGE of the current rate. Worked example from the source: if \\(\\sigma = 20\\%\\), the up-node rate is \\(r_0\\,e^{0.20}\\approx r_0(1.20)\\) — 20% above the current short rate, not 20 percentage points above it. This is exactly the sense in which lognormal drift is \\`\\`multiplicative'' rather than \\`\\`additive'' like Ho-Lee's \\(dr=\\lambda(t)dt+\\sigma dw\\), which adds a fixed amount to \\(r\\) directly regardless of \\(r\\)'s level.</p>"
    }
  ],

  concepts: [
    {
      name: "Model 3 — time-dependent volatility",
      def: "Volatility decays exponentially from an initial \\(\\sigma\\) toward 0 (or follows whatever deterministic path is specified), following a schedule set purely by calendar time — not by the level of the rate.",
      intuition: "Think of it as a volatility 'countdown timer' set at time zero: you decide in advance how fast uncertainty about future short rates should shrink, independent of whatever the rate actually does along the way.",
      example: "Worked example: \\(r_0=5\\%\\), \\(\\lambda=0.24\\%\\), \\(\\sigma=1.50\\%\\), decay \\(e^{-0.3t}\\), shock \\(dw=0.2\\), one-month step. The rate change works out to \\(\\approx 0.31\\%\\), giving \\(r_1\\approx 5.31\\%\\) — slightly less than the \\(5.32\\%\\) you'd get with constant (undecayed) volatility, because the exponential decay has already begun shrinking \\(\\sigma\\) after one month. Especially useful for pricing caps/floors, whose value depends critically on forecasted \\(\\sigma(t)\\) at multiple future dates.",
      counter: "It does NOT guarantee non-negative rates — volatility here decays with calendar time, not with the rate level, so Model 3 has the same negative-rate vulnerability as Model 1.",
      pitfall: "Under specific conditions (matching decay rate to Vasicek's mean-reversion rate), Model 3 and Vasicek can produce IDENTICAL terminal standard deviations — but Model 3 still implies PARALLEL shifts (unlike Vasicek's nonparallel shifts), so they are not the same model in disguise despite matching one statistic. (If, additionally, Model 3's time-dependent drift path matches Vasicek's average interest rate path, the two entire terminal DISTRIBUTIONS coincide — an even stronger, rarer condition than just matching the SD.)",
      related: [{ r: 13, label: "R13 — Vasicek, whose terminal SD Model 3 can match" }]
    },
    {
      name: "CIR and lognormal — level-dependent volatility",
      def: "CIR: dr = \\(k(\\theta - r)dt\\) + \\(\\sigma \\sqrt{r}\\cdot dw\\) — basis-point vol increases with \\(\\sqrt{r}\\) at a decreasing rate, yield vol NOT constant, cannot go negative. Lognormal (Model 4): d ln(r) = \\(\\lambda (t)dt\\) + \\(\\sigma dw\\) — basis-point vol increases linearly with r \\((=\\sigma r)\\), yield vol IS constant \\((\\sigma )\\), cannot go negative.",
      intuition: "Interest rates near zero act like they're bumping up against a floor — hyperinflation-era rate swings are large, deep-recession near-zero-rate swings are small. Level-dependent volatility builds that observed asymmetry directly into the model, instead of assuming the same-size random shock applies whether the rate is 1% or 15%.",
      example: "Worked CIR example: \\(r_0=5\\%\\), \\(\\theta=24\\%\\), \\(k=0.04\\), \\(\\sigma=1.50\\%\\), \\(dw=0.2\\), one-month step \\(\\to dr\\approx 0.13\\%\\), \\(r_1\\approx 5.13\\%\\). Worked lognormal example: if \\(\\sigma=20\\%\\), the up-node rate is \\(r_0e^{0.20}\\approx r_0(1.20)\\), 20% above the current rate.",
      counter: "Neither model has ALL its volatility measures constant — level-dependence, by construction, means at least basis-point vol always moves with r.",
      pitfall: "Don't confuse 'basis point volatility' (volatility of the level change dr) with 'yield volatility' (volatility of the percentage change). CIR has NEITHER constant — but the lognormal model has CONSTANT yield volatility even though its basis-point volatility still increases with the rate level. This exact distinction has been directly tested.",
      related: [{ r: 13, label: "R13 — Model 1/Vasicek's constant, level-independent volatility, the flaw being fixed" }],
      memory: "CIR: vol grows with \\(\\sqrt{r}\\), both vol measures move. Lognormal: vol grows with r, but yield vol stays flat."
    },
    {
      name: "Lognormal with drift vs mean reversion (Black-Karasinski)",
      def: "Lognormal with deterministic drift is modeled additively in LOG-space, but because e^x ≈ 1+x for small x, the effect on actual RATES is MULTIPLICATIVE, not additive like Ho-Lee.",
      intuition: "Working in log-space is a trick: it lets you reuse the additive machinery (trees, normal-distribution math) you already built for Ho-Lee and Vasicek, then translate the result back to rate-space by exponentiating — and exponentiating an additive shock automatically converts it into a percentage (multiplicative) shock on the level.",
      example: "Lognormal with mean reversion is the Black-Karasinski model — combines mean reversion (Vasicek-style, but in log-space) with time-varying volatility: \\(d\\ln r = k(t)[\\ln \\theta(t) - \\ln r]dt + \\sigma(t)dw\\), so \\(\\ln r\\) reverts to \\(\\ln[\\theta(t)]\\) at speed \\(k(t)\\), with time-varying volatility.",
      counter: "Ho-Lee's tree recombines naturally with equal up/down steps; a lognormal-with-mean-reversion tree, like Vasicek's, does NOT recombine naturally — this is a cost of adding mean reversion, not something specific to being lognormal.",
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
    { wrong: "\"CIR has constant yield volatility like the lognormal model.\"", right: "CIR has NEITHER basis-point nor yield volatility constant — both vary with the rate level, distinguishing it from lognormal's constant yield vol." },
    { wrong: "\"Since CIR and lognormal both guarantee non-negative rates, avoiding negative rates is always worth the added model complexity.\"", right: "The source explicitly notes this isn't always true: if a market maker believes rates will stay comfortably positive and the mispricing from a small negative-rate probability would be immaterial, the simpler constant-volatility model may be the reasonable choice over the more complex CIR." }
  ],

  highYield: [
    { stars: 4, what: "CIR vs lognormal: which volatility measure (basis-point vs yield) is constant in each.", why: "The single most precisely tested distinction in this reading — directly tested before." },
    { stars: 4, what: "Ho-Lee additive vs lognormal multiplicative drift — get the assignment right.", why: "An entire exam question type hinges on this exact direction; the reversed assignment is the trap." },
    { stars: 3, what: "Model 3's use case (caps/floors) and its parallel-shift property despite matching Vasicek's terminal SD.", why: "Tests whether you distinguish 'matches one statistic' from 'is the same model.'" },
    { stars: 3, what: "CIR and lognormal both guarantee non-negative rates via level-dependent volatility.", why: "Connects back to Model 1/Vasicek's negative-rate flaw — the motivating problem these models solve." },
    { stars: 2, what: "Calculating a one-step rate change under Model 3, CIR, or the lognormal model given r, drift/mean-reversion parameters, σ, and a drawn dw.", why: "A direct plug-and-chug numeric question type — practice all three formulas with realistic inputs." }
  ],

  recall: [
    { q: "A colleague says 'CIR and lognormal both have constant volatility, so they're basically the same.' Correct this.", a: "Neither has ALL volatility measures constant. Lognormal has constant YIELD volatility \\((\\sigma )\\) but basis-point volatility still rises linearly with the rate level. CIR has NEITHER constant — both basis-point and yield volatility vary with the rate level (basis-point vol rises with \\(\\sqrt{r}\\) at a decreasing rate). They are meaningfully different models." },
    { q: "Why can Model 3 match Vasicek's terminal standard deviation under specific calibration, yet still be a fundamentally different model?", a: "Because terminal SD is just one summary statistic. Model 3 still implies PARALLEL shifts across the curve (like Model 1), while Vasicek implies NONPARALLEL shifts (mean-reversion dampens long-horizon impact) — a structurally different volatility term structure despite matching one number." },
    { q: "Explain precisely why the lognormal model's drift is described as 'multiplicative' even though it's written additively.", a: "The lognormal model's drift is additive in LOG-space: d ln(r) = \\(\\lambda (t)dt\\) + \\(\\sigma dw\\). But because e^x ≈ 1+x for small x, an additive change in ln(r) translates into a MULTIPLICATIVE change in the actual rate r itself — the opposite of Ho-Lee, whose drift acts additively on the rate directly." },
    { q: "Why is CIR (and lognormal) preferred over Model 1/Vasicek for modeling rates that must stay non-negative?", a: "Both make volatility depend on the LEVEL of the rate (CIR: \\(\\sigma \\sqrt{r}\\); lognormal: effectively \\(\\sigma r\\) in basis-point terms) — as r approaches zero, volatility shrinks toward zero too, preventing the rate from being pushed negative. Model 1 and Vasicek have volatility independent of the rate level, so they always carry positive probability of negative rates." },
    { q: "Using the CIR model with r0=5%, θ=24%, k=0.04, σ=1.50%, dw=0.2, and dt=1/12, what is the new short rate after one month?", a: "\\(dr = k(\\theta - r)dt + \\sigma\\sqrt r\\,dw = 0.04(0.24-0.05)(1/12) + 1.50\\%\\sqrt{0.05}(0.2) \\approx 0.06\\% + 0.07\\% = 0.13\\%\\). New rate \\(= 5\\% + 0.13\\% = 5.13\\%\\)." }
  ],

  hooks: [
    { title: "Same number, different model", text: "Model 3 and Vasicek can agree on 'terminal standard deviation' the way two students can get the same final exam score by studying completely different material — one number matching doesn't make the underlying process identical." },
    { title: "Log-space addition, rate-space multiplication", text: "Lognormal's drift adds in log-space but multiplies in rate-space — like adding exponents multiplies the underlying numbers. Ho-Lee skips the log entirely and adds directly." },
    { title: "The volatility that protects against zero", text: "CIR and lognormal both shrink volatility as the rate approaches zero — like a car automatically slowing down as it nears a cliff edge, mechanically preventing it from going over (negative)." }
  ],

  summary: `<p><strong>Model 3</strong>: time-decaying volatility (\\(dr=\\lambda(t)dt+\\sigma e^{-\\alpha t}dw\\); useful for caps/floors); can match Vasicek's terminal SD under specific calibration but still implies PARALLEL shifts (different from Vasicek's nonparallel shifts) — matching one statistic ≠ being the same model. <strong>CIR</strong> \\((dr=k(\\theta - r)dt+\\sigma \\sqrt{r}\\cdot dw)\\): basis-point vol rises with \\(\\sqrt{r}\\) (decreasing rate), yield vol NOT constant, cannot go negative. <strong>Lognormal</strong> (d ln \\(r=\\lambda (t)dt+\\sigma dw)\\): basis-point vol rises linearly with r, yield vol CONSTANT \\((\\sigma )\\), cannot go negative — the CIR/lognormal distinction on WHICH volatility is constant is the most tested fact here. <strong>Additive vs multiplicative drift</strong>: Ho-Lee is additive on the rate; lognormal is additive in log-space, hence multiplicative on the actual rate — Black-Karasinski (lognormal + mean reversion) inherits Vasicek's non-recombining tree problem.</p>`,

  quiz: [
    {
      q: "Which statement correctly describes the CIR model's volatility behavior?",
      options: [
        "Basis-point volatility is constant; yield volatility increases with r.",
        "Basis-point volatility increases with \\(\\sqrt r\\) at a decreasing rate; yield volatility is not constant.",
        "Basis-point volatility increases linearly with r; yield volatility is constant.",
        "Both basis-point and yield volatility are constant, independent of r."
      ],
      answer: 1,
      why: "CIR's diffusion term is \\(\\sigma\\sqrt r\\,dw\\), so basis-point vol scales with \\(\\sqrt r\\) at a decreasing rate, and yield vol is NOT constant. The 'basis-point vol linear in r, yield vol constant' answer describes the LOGNORMAL model instead (the most common mix-up), and the 'both constant' answer describes Model 1/Vasicek, the flawed baseline this reading fixes."
    },
    {
      q: "In the lognormal model, which volatility measure is constant?",
      options: [
        "Basis-point volatility (the SD of dr).",
        "Both basis-point and yield volatility.",
        "Yield volatility (the SD of the percentage change), while basis-point volatility still increases linearly with r.",
        "Neither — both vary with the level of r."
      ],
      answer: 2,
      why: "Lognormal's yield vol \\(\\sigma\\) is constant by construction (it's the constant coefficient on \\(dw\\) in \\(d\\ln r\\)), but basis-point vol \\((=\\sigma r)\\) still scales up with the rate level. The 'neither is constant' answer describes CIR, and the 'basis-point vol is constant' answer reverses the correct answer — a frequently tested trap."
    },
    {
      q: "Which of the following correctly characterizes the drift terms of the Ho-Lee model versus the lognormal model with drift?",
      options: [
        "Both are additive.",
        "Both are multiplicative.",
        "Ho-Lee is multiplicative; lognormal is additive.",
        "Ho-Lee is additive; lognormal is multiplicative."
      ],
      answer: 3,
      why: "Ho-Lee's drift acts directly and additively on the rate (\\(dr=\\lambda(t)dt+\\sigma dw\\)). Lognormal's drift is additive in log-space, but because \\(e^x\\approx 1+x\\), it translates into a MULTIPLICATIVE effect on the actual rate — this is the 'Ho-Lee additive, lognormal multiplicative' answer. The reversed 'Ho-Lee multiplicative, lognormal additive' answer flips the direction, the classic exam trap."
    },
    {
      q: "Using the CIR model with \\(r_0=5\\%\\), \\(\\theta=24\\%\\), \\(k=0.04\\), \\(\\sigma=1.50\\%\\), a drawn shock \\(dw=0.2\\), and \\(dt=1/12\\) (one month), what is the new short-term rate?",
      options: [
        "5.13%",
        "5.31%",
        "5.32%",
        "5.19%"
      ],
      answer: 0,
      why: "\\(dr=k(\\theta-r)dt+\\sigma\\sqrt r\\,dw = 0.04(0.24-0.05)(1/12)+1.50\\%\\sqrt{0.05}(0.2)\\approx 0.06\\%+0.07\\%=0.13\\%\\), so the new rate is \\(5\\%+0.13\\%=5.13\\%\\). 5.31% and 5.32% are the Model 3 (decaying and constant volatility) answers for the same \\(dw\\) — a distractor from mixing up which model's worked example you're in."
    },
    {
      q: "Model 3 and the Vasicek model are calibrated so their initial volatility is equal and Model 3's decay rate matches Vasicek's mean-reversion rate. What can you conclude?",
      options: [
        "The two models are identical in every respect.",
        "They can produce identical terminal standard deviations, but Model 3 still implies parallel yield-curve shifts while Vasicek implies nonparallel shifts.",
        "Model 3 will now also guarantee non-negative rates, like Vasicek.",
        "Their terminal distributions are guaranteed identical, not just their standard deviations."
      ],
      answer: 1,
      why: "Matching terminal SD is a narrow, calibration-specific coincidence on a single statistic — Model 3 still shifts the whole curve in parallel (like Model 1), while Vasicek's mean reversion dampens long-horizon shifts nonparallel. The 'terminal distributions are guaranteed identical' answer describes a stronger, separate condition (drift path matching Vasicek's average rate path) that isn't implied here. The 'Model 3 now guarantees non-negative rates' answer is false — Model 3's volatility depends on time, not rate level, so it still allows negative rates."
    },
    {
      q: "A market maker is deciding whether to use the CIR model instead of a simple constant-volatility model. According to the reading, when might they reasonably stick with the simpler model?",
      options: [
        "Never — CIR should always be preferred since it prevents negative rates.",
        "Only when pricing caps and floors.",
        "When they believe rates will stay fairly flat/positive and the mispricing from a small negative-rate probability would be immaterial.",
        "Only when the yield curve is inverted."
      ],
      answer: 2,
      why: "The reading explicitly notes that avoiding negative rates isn't always worth the added complexity: if the negative-rate tail is thought to have only a marginal pricing impact, the simpler constant-volatility model may be the reasonable choice. The 'only when pricing caps and floors' answer describes Model 3's use case, not this trade-off; the 'never' and 'only when inverted' answers aren't supported by the source."
    }
  ],

  sources: [
    { title: "Cox–Ingersoll–Ross model — Wikipedia", url: "https://en.wikipedia.org/wiki/Cox%E2%80%93Ingersoll%E2%80%93Ross_model", note: "Background on the CIR short-rate model, its square-root diffusion term, and the Feller condition for staying strictly positive." },
    { title: "Short-rate model — Wikipedia", url: "https://en.wikipedia.org/wiki/Short-rate_model", note: "Overview of the family of one-factor short-rate models, including Black-Karasinski and lognormal specifications, for cross-reference against this reading's four models." },
    { title: "Interest rate cap and floor — Wikipedia", url: "https://en.wikipedia.org/wiki/Interest_rate_cap_and_floor", note: "Explains caplets/floorlets and why their pricing depends on the forecast volatility term structure — the practical motivation for Model 3." },
    { title: "GARP — FRM Program", url: "https://www.garp.org/frm", note: "Official FRM exam body; useful for confirming current learning objectives and syllabus weighting for this topic." }
  ],

  pdf: { book: 1, query: "This reading provides a natural extension to the prior reading on modeling term structure drift" }
});
