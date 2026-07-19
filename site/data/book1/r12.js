FRM.register({
  book: 1, reading: 12,
  session: "Term Structures & Volatility",
  title: "The Evolution of Short Rates and the Shape of the Term Structure",
  tagline: "Why does the yield curve have the shape it does? Two forces: pure expectations of future short rates, and the mathematical fact that averaging discount factors (convexity) systematically pulls yields down.",

  teaches: `<p>Reading 11 gave you the mechanics of trees. This reading asks WHY the curve has its shape, isolating two forces: expectations of future short rates, and Jensen's-inequality-driven convexity. The convexity insight is the direct forerunner of the drift models (Vasicek, Ho-Lee) in Reading 13.</p>`,

  why: `<p>A trader quoting a 10-year rate isn't just guessing where rates will be in 10 years — part of that quote is a pure mathematical artifact of averaging over uncertain future discount factors. Separating "what the market expects" from "what convexity mechanically implies" from "what risk premium investors demand" is essential to not double-counting or misreading curve signals.</p>`,

  intuition: `<p><strong>Expectations</strong>: if future short rates are expected to rise, the curve slopes upward; if expected to fall, downward; if flat expectations, flat curve. This works for short-to-medium horizons — nobody credibly forecasts specific short rates 30 years out, so long-run rates are anchored instead by long-run real rate + inflation expectations.</p>
  <p><strong>Convexity (Jensen's inequality)</strong>: the expected value of a CONVEX function (like a discount factor 1/(1+r)) is greater than the function evaluated at the expected value: E[1/(1+r)] > 1/(1+E[r]). Since bond prices are convex in yield, adding volatility to future rate uncertainty RAISES the expected bond price relative to using the simple expected rate — which means it LOWERS the implied spot rate. This reduction IS "the value of convexity," and it grows with BOTH maturity and volatility.</p>
  <p><strong>Risk premium</strong> is a third, separate, additive effect: risk-averse investors demand compensation beyond the risk-neutral expected return, lowering the bond's price (raising its expected return) on top of — not instead of — the convexity adjustment.</p>`,

  formulas: [
    { name: "Jensen's inequality applied to discounting", math: "E\\!\\left[\\tfrac{1}{1+r}\\right] > \\tfrac{1}{1+E[r]}", note: "Convexity of the discount factor means volatility-aware pricing gives a HIGHER expected price, hence a LOWER implied yield, than naively plugging in the expected rate." }
  ],

  concepts: [
    {
      name: "Expectations and curve shape",
      def: "If future 1-year rates are expected to rise, the curve is upward sloping; expected to fall, downward sloping; flat expectations, flat curve.",
      pitfall: "This logic works for short-to-medium horizons. For very long horizons (e.g., 30 years), nobody credibly forecasts specific short rates that far out — instead, long-run real rate + long-run inflation expectations anchor the curve's level.",
      related: [{ r: 13, label: "R13 — drift models formalize expected rate paths" }]
    },
    {
      name: "Interest rate volatility and convexity (Jensen's inequality)",
      def: "Because bond prices are a convex function of yield, adding volatility to future rate uncertainty LOWERS the implied spot rate relative to using the simple expected rate — this reduction is 'the value of convexity.'",
      example: "1-year rate = 8%, next year's rate 10% or 6% (50/50). Expected price using actual rates: 0.5×(1/1.10)+0.5×(1/1.06) = $0.92624. Price using simple expected rate (8%): 1/1.08 = $0.92593. Since $0.92624 > $0.92593, the volatility-aware implied yield is LOWER than the naive 8% expectation — a gap of ≈1.84bp, the value of convexity.",
      pitfall: "The value of convexity increases with BOTH maturity (more compounding of the effect) AND volatility (more dispersion in the averaging) — independently. A question varying only one while holding the other fixed is testing whether you know both drivers move convexity in the SAME direction.",
      related: [{ r: 1, label: "R1 — Jensen's inequality echoes in lognormal VaR reasoning" }],
      memory: "Convexity is a magnifying glass: more maturity, more volatility, bigger the (downward) yield adjustment."
    },
    {
      name: "Risk premium",
      def: "Risk-averse investors demand compensation beyond the risk-neutral expected return for bearing interest rate risk.",
      example: "Adding e.g. a 30bp/year risk premium lowers the zero-coupon bond's price (relative to the risk-neutral price) and raises its expected holding-period return above the risk-neutral rate.",
      pitfall: "This is a SEPARATE, ADDITIVE effect on top of — not a substitute for — the convexity adjustment above. Don't merge the two mechanisms into one 'the yield is lower' story; they operate independently and in this case actually point in different directions on price (risk premium lowers bond price; convexity raises it).",
      related: ["Interest rate volatility and convexity"],
      memory: "Convexity and risk premium are two separate knobs, not one dial."
    }
  ],

  connections: {
    from: [
      { r: 11, why: "The tree mechanics from R11 are what actually generates the discount factors being averaged here." }
    ],
    to: [
      { r: 13, why: "This reading's convexity insight is the direct conceptual forerunner of Vasicek's mean-reversion drift and Ho-Lee's time-varying drift." },
      { r: 14, why: "Volatility's role in convexity previews volatility's central role in the Model 3/CIR/lognormal family." }
    ],
    confused: [
      { what: "Convexity adjustment vs risk premium", how: "Convexity is a pure mathematical consequence of Jensen's inequality (raises price, lowers yield) driven by volatility and maturity; risk premium is a compensation-for-risk effect (lowers price, raises expected return) — separate mechanisms, often moving prices in opposite directions." },
      { what: "Expectations hypothesis vs convexity effect", how: "Expectations explain the curve's SLOPE direction from anticipated rate changes; convexity explains a systematic downward BIAS in yields that exists even under perfectly flat rate expectations." }
    ]
  },

  misconceptions: [
    { wrong: "\"The yield curve's shape is explained entirely by expectations of future short rates.\"", right: "Convexity (a Jensen's-inequality effect) and risk premium both independently affect the curve's level and shape, even holding expectations fixed." },
    { wrong: "\"Convexity's value only depends on volatility.\"", right: "It depends on BOTH volatility AND maturity — increasing either one increases the value of convexity, independently." },
    { wrong: "\"Higher volatility means a higher yield, all else equal.\"", right: "Higher volatility of future rates LOWERS the implied yield via Jensen's inequality (convexity) — a genuinely counter-intuitive direction worth memorizing." },
    { wrong: "\"Risk premium and convexity are the same effect described two ways.\"", right: "They are separate, additive mechanisms. Convexity raises price (lowers yield); risk premium lowers price (raises expected return) — they can point in opposite directions on the price." }
  ],

  highYield: [
    { stars: 3, what: "Jensen's inequality direction: E[1/(1+r)] > 1/(1+E[r]) → volatility lowers implied yield.", why: "The counter-intuitive direction (higher vol → lower yield) is exactly what GARP likes to test." },
    { stars: 3, what: "Convexity value grows with BOTH maturity and volatility independently.", why: "A two-variable comparative-statics question format seen elsewhere in the curriculum (SE in R1, threshold trade-off in R3)." },
    { stars: 3, what: "Risk premium as a separate, additive effect from convexity.", why: "Prevents merging two distinct mechanisms into one — a common conceptual error." },
    { stars: 2, what: "Expectations hypothesis breaking down at very long horizons.", why: "A concise caveat, occasionally tested as 'why doesn't the expectations theory work for 30-year rates.'" }
  ],

  recall: [
    { q: "A 1-year rate is 8%, and next year's rate will be 10% or 6% with equal probability. Compute the value of convexity.", a: "Expected price with actual rates: 0.5/1.10 + 0.5/1.06 = 0.92624. Price using simple expected rate 8%: 1/1.08 = 0.92593. The gap (0.92624 − 0.92593, translated into a yield difference of about 1.84bp) is the value of convexity — volatility makes the 'true' price higher, hence the true yield lower, than naive expectations would suggest." },
    { q: "Why does convexity's value increase with maturity even if volatility per period stays constant?", a: "Convexity compounds — the averaging effect from Jensen's inequality accumulates over more periods of discounting, so a longer maturity magnifies the same per-period volatility effect into a larger yield adjustment." },
    { q: "Explain why higher rate volatility LOWERS the implied spot rate rather than raising it, in intuitive terms.", a: "Because the discount factor 1/(1+r) is convex in r, an average over a range of future rates (via Jensen's inequality) produces a higher expected discount factor — hence a higher price — than plugging in the single expected rate would. A higher price implies a lower yield." },
    { q: "Why can't the risk premium and convexity adjustments be merged into one 'yield adjustment' number?", a: "They are separate economic mechanisms: convexity is a pure mathematical consequence of averaging over a convex discount function (independent of risk aversion), while risk premium reflects investors' actual aversion to bearing rate risk. They can move the bond's price in opposite directions and must be tracked separately." }
  ],

  hooks: [
    { title: "Averaging a smile", text: "A convex curve (discount factor) averaged over uncertain inputs bulges upward — like averaging points on a smile-shaped curve gives you a point ABOVE the midpoint of the smile. That upward bulge in price is exactly the 'value of convexity.'" },
    { title: "Two separate knobs", text: "Convexity knob: turns with volatility and maturity, raises price. Risk-premium knob: turns with risk aversion, lowers price. Different mechanisms, sometimes opposite directions — never merge them." }
  ],

  summary: `<p>Curve shape has (at least) two independent drivers. <strong>Expectations</strong>: rate direction expected → curve slope; breaks down at very long horizons where long-run real rate + inflation expectations anchor the level instead. <strong>Convexity (Jensen's inequality)</strong>: E[1/(1+r)] > 1/(1+E[r]) — volatility of future rates RAISES expected bond price and LOWERS implied yield; grows with BOTH maturity and volatility, independently. <strong>Risk premium</strong>: a separate, additive compensation-for-risk effect that LOWERS bond price / RAISES expected return — do not conflate with convexity, which often points the opposite direction on price.</p>`
});
