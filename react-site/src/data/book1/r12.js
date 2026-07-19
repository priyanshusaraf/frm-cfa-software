export default ({
  book: 1, reading: 12,
  session: "Term Structures & Volatility",
  title: "The Evolution of Short Rates and the Shape of the Term Structure",
  tagline: "Why does the yield curve have the shape it does? Two forces are doing the work: what the market expects future short rates to do, and a mathematical fact about averaging discount factors (convexity) that pulls yields down all on its own.",

  teaches: `<p>Reading 11 gave you the mechanics of interest-rate trees: build the nodes for future short rates, then work backward through the tree to price a bond. This reading asks a different question. Why does the yield curve have the shape it does in the first place? It pulls apart three forces that combine to produce the curve you see quoted every day: what the market <em>expects</em> future short rates to do, a purely mathematical bias called <strong>convexity</strong> that shows up whenever you average over uncertain future rates, and a <strong>risk premium</strong> that compensates investors for bearing rate risk they'd rather not bear. The convexity insight, that volatility itself lowers implied yields with no directional view required, sets up the drift models (Vasicek, Ho-Lee) you'll build in Reading 13.</p>`,

  why: `<p>A trader quoting a 10-year rate isn't just guessing where rates will land in ten years. Part of that quote is a pure mathematical artifact of averaging over uncertain future discount factors, and part of it is compensation the investor demands for bearing risk they didn't ask for. If you can't separate what the market expects from what convexity mechanically implies from what risk premium investors are charging, you'll double-count or misread the signal in a curve. See a long-dated forward rate that looks too low relative to your own forecast? The gap might not be a market view at all. It might just be convexity doing what convexity always does.</p>`,

  intuition: `<p><strong>Expectations</strong>: a zero-coupon bond's price comes from discounting its $1 face value by the sequence of 1-year rates the market expects between now and maturity. Rates expected to rise, curve slopes upward. Expected to fall, downward. Flat expectations, flat curve. Concretely: if the 1-year rate is 8% today and investors expect 10% next year and 12% the year after, the 2-year spot rate solves \\((1+z_2)^2=(1.08)(1.10)\\), giving \\(z_2\\approx 8.995\\%\\), and the 3-year spot rate solves \\((1+z_3)^3=(1.08)(1.10)(1.12)\\), giving \\(z_3\\approx 9.988\\%\\). That's an upward-sloping curve of 8%, 8.995%, 9.988%, built purely from a rising path of expected short rates. Flip the expected path to 8%, 6%, 4% and the same mechanics produce a downward-sloping curve (8%, 6.995%, 5.987%). This logic holds up well at short-to-medium horizons, but nobody credibly forecasts a specific 1-year rate 30 years out. So at very long horizons the curve's <em>level</em> is anchored instead by a long-run real rate plus long-run inflation expectations (a 5% long-run short rate might just be a 3% real rate plus 2% expected inflation), not by anyone's rate forecast.</p>
  <p><strong>Convexity (Jensen's inequality)</strong>: everything above assumed rates are known with certainty. Real markets are uncertain, and that uncertainty changes prices on its own, even when the <em>expected</em> rate path doesn't budge. Jensen's inequality says that for a convex function \\(f\\), \\(E[f(X)] > f(E[X])\\) whenever \\(X\\) is genuinely random. The discount factor \\(\\dfrac{1}{1+r}\\) is convex in \\(r\\) (it curves upward, like a bowl, as \\(r\\) varies), so \\(E\\!\\left[\\dfrac{1}{1+r}\\right] > \\dfrac{1}{1+E[r]}\\): averaging the discount factor over a range of possible future rates gives a higher number than plugging the single expected rate into the discount factor once. A higher expected bond price means, by definition, a lower implied yield. That gap, between the naive "just use the expected rate" yield and the true, volatility-aware implied yield, is what the reading calls the value of convexity. It grows with both maturity (the averaging effect compounds over more periods) and volatility (more dispersion in the possible future rates widens the gap). Two separate knobs, both pushing yield the same way.</p>
  <p><strong>Risk premium</strong> is a third, separate effect layered on top. Even after convexity is accounted for, risk-averse investors won't settle for a fair, risk-neutral expected return for bearing interest-rate risk. They want extra compensation. The source works an example with a 60bp premium: an investor demanding an 8.6% expected return instead of the risk-neutral 8%. Adding that premium lowers the zero-coupon bond's price relative to the risk-neutral price, which raises its expected holding-period return above the risk-neutral rate. Notice the direction here matters: convexity raises price and lowers yield; risk premium lowers price and raises expected return. Two mechanisms stacked on top of one another, and in this comparison they actually pull price in opposite directions.</p>`,

  formulas: [
    {
      name: "Expectations hypothesis: multi-period spot rate from expected future short rates",
      math: "(1+z_n)^n = (1+r_1)(1+r_2)\\cdots(1+r_n)",
      note: "The n-year spot rate \\(z_n\\) is the geometric average growth factor implied by the sequence of expected future 1-year rates \\(r_1, r_2, \\ldots, r_n\\). This is the mechanism that turns a rising or falling expected-rate path into an upward- or downward-sloping curve.",
      plain: "An n-year zero-coupon bond's yield is the compounded average of the string of 1-year rates the market expects to prevail, year by year, over its life. It's how a view on future short rates turns into today's long rate.",
      derivation: "<p>Start from the no-arbitrage requirement that investing $1 at the n-year spot rate for n years must produce the same expected payoff as rolling $1 over the sequence of expected future 1-year rates:</p>\\[(1+z_n)^n = (1+r_1)(1+r_2)\\cdots(1+r_n)\\]<p>Worked example (2-year case): the 1-year rate today is \\(r_1=8\\%\\), and the market expects the 1-year rate in one year to be \\(r_2=10\\%\\). Then:</p>\\[(1+z_2)^2 = (1.08)(1.10) = 1.188\\]<p>Taking the square root and subtracting 1:</p>\\[z_2 = \\sqrt{1.188}-1 \\approx 8.995\\%\\]<p>Extending to a third expected rate \\(r_3=12\\%\\) gives \\((1+z_3)^3=(1.08)(1.10)(1.12)=1.33056\\), so \\(z_3\\approx 9.988\\%\\) — each additional expected future rate above the current level pulls the multi-period spot rate a little further up, tracing out the upward-sloping curve.</p>"
    },
    {
      name: "Jensen's inequality applied to discounting",
      math: "E\\!\\left[\\tfrac{1}{1+r}\\right] > \\tfrac{1}{1+E[r]}",
      note: "Convexity of the discount factor means volatility-aware pricing gives a higher expected price, and so a lower implied yield, than naively plugging in the expected rate.",
      plain: "The discount factor curves upward (convex) as the rate varies, so averaging it over uncertain future rates always produces a bigger number than averaging the rate first and discounting once. Uncertainty about rates mechanically raises bond prices and lowers implied yields, no directional view required.",
      derivation: "<p>Take the worked example directly from the source: today's 1-year rate is 8%, and next year's 1-year rate will be either 10% or 6%, each with 50% probability (so the expected rate is still exactly 8%).</p><p><strong>Left-hand side</strong> — the expected price using the two actual possible rates:</p>\\[0.5\\times\\dfrac{1}{1.10} + 0.5\\times\\dfrac{1}{1.06} = 0.5(0.90909) + 0.5(0.94340) = \\$0.92624\\]<p><strong>Right-hand side</strong> — the price using the single simple expected rate of 8%:</p>\\[\\dfrac{1}{1.08} = \\$0.92593\\]<p>Since \\(\\$0.92624 > \\$0.92593\\), the volatility-aware price is higher. Discounting this one-year-ahead price back to today at the known current 8% rate gives the 2-year zero-coupon bond price: \\(\\$0.92624/1.08=\\$0.85763\\), versus the naive two-period discounting \\(\\$1/1.08^2=\\$0.85734\\) — again the volatility-aware price is higher. Solving \\((1+z_2)^2=1/0.85763\\) for the implied 2-year spot rate gives \\(z_2\\approx 7.9816\\%\\), which is BELOW the naive 8% expectation. The gap, \\(8\\%-7.9816\\%=0.0184\\%\\) or 1.84 basis points, is the value of convexity for this bond.</p>"
    },
    {
      name: "Value of convexity",
      math: "\\text{Value of convexity} = y_{\\text{naive}} - y_{\\text{implied}}",
      note: "Defined as the naive yield (discounting at the simple expected rate) minus the true, volatility-aware implied yield. Always non-negative, and it increases in both maturity and volatility.",
      plain: "The value of convexity is the size, in yield terms, of the gap Jensen's inequality creates: how many basis points the true implied yield sits below what you'd naively get by plugging in the expected rate."
    }
  ],

  concepts: [
    {
      name: "Expectations and curve shape",
      def: "If future 1-year rates are expected to rise, the curve is upward sloping. Expected to fall, downward sloping. Flat expectations, flat curve. Formally, the n-year spot rate is the geometric average of the expected sequence of 1-year rates: \\((1+z_n)^n=(1+r_1)(1+r_2)\\cdots(1+r_n)\\).",
      intuition: "Locking in a multi-year rate is like pre-committing to a sequence of 1-year rolls. Expect those rolls to get more expensive over time (rates rising) and you need a higher blended multi-year rate to make up for missing the later, richer rolls, so the curve slopes upward. Expect rolls to get cheaper and the multi-year rate sits below today's short rate instead.",
      example: "1-year rate = 8% today. Expected 1-year rate in one year = 10%, in two years = 12%. Then \\(z_2=\\sqrt{1.08\\times1.10}-1\\approx8.995\\%\\) and \\(z_3=\\sqrt[3]{1.08\\times1.10\\times1.12}-1\\approx9.988\\%\\), an upward-sloping curve of 8%, 8.995%, 9.988%. Flip the expected path to 8%, 6%, 4% and you get a downward-sloping curve of 8%, 6.995%, 5.987%.",
      pitfall: "This logic holds up at short-to-medium horizons. At very long horizons (30 years, say), nobody credibly forecasts a specific short rate that far out, so long-run real rate plus long-run inflation expectations anchor the curve's level instead.",
      related: [{ r: 13, label: "R13 — drift models formalize expected rate paths" }]
    },
    {
      name: "Interest rate volatility and convexity (Jensen's inequality)",
      def: "Because bond prices are a convex function of yield, adding volatility to future rate uncertainty lowers the implied spot rate relative to using the simple expected rate. That reduction is what the reading calls the value of convexity.",
      intuition: "A convex function like the discount factor 1/(1+r) curves upward, so it rises faster than it falls as its input moves. Good outcomes (low r) help the average more than bad outcomes (high r) hurt it. Averaging over a spread of possible rates therefore always beats averaging the rate first and plugging it in once. None of this depends on anyone's directional forecast; it's a pure consequence of uncertainty existing at all.",
      example: "1-year rate = 8%, next year's rate 10% or 6% (50/50). Expected price using actual rates: 0.5×(1/1.10)+0.5×(1/1.06) = $0.92624. Price using simple expected rate (8%): 1/1.08 = $0.92593. Since $0.92624 is bigger, the volatility-aware implied yield sits below the naive 8% expectation by about 1.84bp, the value of convexity. Extend to a 3-year bond with expected spot rates of 14%, 10%, 6%, 2% (equal probability) and the value of convexity rises to 5bp, bigger than the 2-year's 1.84bp purely from the extra maturity. Separately, widen the 2-year spread from 4%–12% to 2%–14% (same 8% average, more dispersion) and the value of convexity rises from 1.84bp to 4.2bp, this time purely from the extra volatility.",
      pitfall: "The value of convexity increases with both maturity (more compounding of the effect) and volatility (more dispersion in the averaging), independently of each other. A question that varies only one while holding the other fixed is testing whether you know both drivers push convexity the same way.",
      related: [{ r: 1, label: "R1 — Jensen's inequality echoes in lognormal VaR reasoning" }],
      memory: "Convexity is a magnifying glass: more maturity, more volatility, bigger the downward yield adjustment."
    },
    {
      name: "Risk premium",
      def: "Risk-averse investors demand compensation beyond the risk-neutral expected return for bearing interest rate risk.",
      intuition: "A risk-neutral investor is indifferent between a certain 8% return and an uncertain bet that averages 8% (say, 6% or 10% with equal probability). A risk-averse investor is not indifferent. The uncertain bet feels worse to them even at the same average, so they'll only buy the bond if its price is low enough to push their expected return above 8%. That extra return is the risk premium, and the seller pays for it by accepting a lower price today.",
      example: "In the source's worked example, a risk-neutral price of $0.85763 implies an 8% expected 1-year return on a 2-year zero-coupon bond, but the actual return will be either 6% or 10% depending on which node is realized. Real variability, not certainty. Risk-averse investors won't accept that variability for only an 8% average return, so they bid the price down until the expected return rises to 8.6% (a 60bp risk premium) given two years of rate risk.",
      pitfall: "This is a separate, additive effect on top of the convexity adjustment above, not a substitute for it. Don't merge the two into one 'the yield is lower' story. They operate independently, and in this case they actually point in different directions on price: risk premium lowers bond price, convexity raises it.",
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
      { what: "Convexity adjustment vs risk premium", how: "Convexity is a pure mathematical consequence of Jensen's inequality, driven by volatility and maturity, and it raises price / lowers yield. Risk premium is a compensation-for-risk effect that lowers price and raises expected return. Two separate mechanisms that often move prices in opposite directions." },
      { what: "Expectations hypothesis vs convexity effect", how: "Expectations explain the curve's slope direction from anticipated rate changes. Convexity explains a systematic downward bias in yields that exists even under perfectly flat rate expectations." }
    ]
  },

  misconceptions: [
    { wrong: "\"The yield curve's shape is explained entirely by expectations of future short rates.\"", right: "Convexity (a Jensen's-inequality effect) and risk premium both affect the curve's level and shape independently, even holding expectations fixed." },
    { wrong: "\"Convexity's value only depends on volatility.\"", right: "It depends on both volatility and maturity. Increasing either one increases the value of convexity, on its own." },
    { wrong: "\"Higher volatility means a higher yield, all else equal.\"", right: "Higher volatility of future rates lowers the implied yield via Jensen's inequality (convexity). Genuinely counter-intuitive, and worth memorizing for that reason." },
    { wrong: "\"Risk premium and convexity are the same effect described two ways.\"", right: "They're separate, additive mechanisms. Convexity raises price and lowers yield; risk premium lowers price and raises expected return. They can point in opposite directions on price." }
  ],

  highYield: [
    { stars: 3, what: "Jensen's inequality direction: E[1/(1+r)] > 1/(1+E[r]) → volatility lowers implied yield.", why: "The counter-intuitive direction, higher vol means lower yield, is exactly what GARP likes to test." },
    { stars: 3, what: "Convexity value grows with both maturity and volatility independently.", why: "A two-variable comparative-statics question format that shows up elsewhere in the curriculum too (SE in R1, the threshold trade-off in R3)." },
    { stars: 3, what: "Risk premium as a separate, additive effect from convexity.", why: "Stops you from merging two distinct mechanisms into one, a common conceptual error." },
    { stars: 2, what: "Expectations hypothesis breaking down at very long horizons.", why: "A concise caveat, occasionally tested as \"why doesn't the expectations theory work for 30-year rates.\"" }
  ],

  recall: [
    { q: "A 1-year rate is 8%, and next year's rate will be 10% or 6% with equal probability. Compute the value of convexity.", a: "Expected price with actual rates: 0.5/1.10 + 0.5/1.06 = 0.92624. Price using simple expected rate 8%: 1/1.08 = 0.92593. The gap between them (about 1.84bp once translated into a yield difference) is the value of convexity. Volatility makes the true price higher, and so the true yield lower, than naive expectations would suggest." },
    { q: "Why does convexity's value increase with maturity even if volatility per period stays constant?", a: "Convexity compounds. The averaging effect from Jensen's inequality accumulates over more periods of discounting, so a longer maturity magnifies the same per-period volatility effect into a larger yield adjustment." },
    { q: "Explain why higher rate volatility lowers the implied spot rate rather than raising it, in intuitive terms.", a: "The discount factor 1/(1+r) is convex in r, so averaging over a range of future rates (Jensen's inequality) produces a higher expected discount factor, and so a higher price, than plugging in the single expected rate would. A higher price means a lower yield." },
    { q: "Why can't the risk premium and convexity adjustments be merged into one 'yield adjustment' number?", a: "They're separate economic mechanisms. Convexity is a pure mathematical consequence of averaging over a convex discount function, independent of risk aversion, while risk premium reflects investors' actual aversion to bearing rate risk. They can move the bond's price in opposite directions and have to be tracked separately." },
    { q: "If today's 1-year rate is 8% and the market expects the 1-year rate to be 10% in one year and 12% in two years, what are the 2-year and 3-year spot rates (assuming no volatility)?", a: "z2 solves (1+z2)^2 = 1.08×1.10 = 1.188, giving z2 ≈ 8.995%. z3 solves (1+z3)^3 = 1.08×1.10×1.12 = 1.33056, giving z3 ≈ 9.988%. A rising path of expected short rates produces an upward-sloping curve." }
  ],

  hooks: [
    { title: "Averaging a smile", text: "A convex curve (the discount factor) averaged over uncertain inputs bulges upward, the same way averaging two points on a smile-shaped curve lands you above the midpoint of the smile. That upward bulge in price is the value of convexity." },
    { title: "Two separate knobs", text: "The convexity knob turns with volatility and maturity, and it raises price. The risk-premium knob turns with risk aversion, and it lowers price. Different mechanisms, sometimes pulling in opposite directions. Never merge them." }
  ],

  eli5: `<p>Picture a vending machine with a quirky bonus rule: the luckier your token roll, the more than proportionally extra snacks you get. Double the luck gives you quadruple the bonus, not just double (that curving-upward relationship is what "convex" means). Now compare two friends. One gets exactly average luck every single day. The other gets wildly lucky some days and wildly unlucky other days, but their average luck over the month is identical to the first friend's. Because the bonus rule curves upward, the wildly-varying friend walks away with more total snacks by month's end, even though both had the exact same average luck. The swings up help more than the swings down hurt. A bond's discount factor, \\(1/(1+r)\\), curves the same way as future interest rates vary, so a bond facing genuinely uncertain future rates ends up priced higher, and yielding lower, than a bond priced off a single "expected" rate with no uncertainty at all, even when both have the identical average expected rate. That's Jensen's inequality and the value of convexity in one sentence: volatility itself, with no directional view required, mechanically raises price and lowers yield.</p>`,

  thinkLike: `<p>A rates desk analyst breaks any observed long-dated yield or forward rate into three layers before drawing conclusions from it: the market's pure expectation of the future short-rate path, a convexity adjustment that's always present and always pulls yield down as a function of maturity and volatility alone, and a risk premium the market demands for bearing rate uncertainty, which pulls yield (and expected return) back up. If a 10-year forward rate looks unusually low relative to your own economic forecast, the first instinct isn't "the market disagrees with me." It's "how much of this gap is just convexity mechanically doing its job, especially since convexity effects get large at long maturities and during high-volatility regimes?" Only after subtracting off the convexity bias does the residual represent an actual market view, or arbitrage opportunity, worth acting on.</p><p>GARP tends to test this reading in two flavors. A numeric flavor: build a small decision tree, compute an expected price two ways (once averaging actual rates, once plugging in the simple expected rate), and report the basis-point gap as the value of convexity. And a conceptual flavor: does volatility push yield up or down? Does the effect need both maturity and volatility to move, or does either alone suffice? Is a risk premium the same phenomenon as convexity, or a separate additive one? Expect distractors built around reversing the Jensen's-inequality direction (a tempting error, since "more volatility, higher yield" sounds intuitive if you're used to the risk-return tradeoff, but that intuition belongs to risk premium, not convexity) and around varying only one of maturity or volatility, to test whether you know both are independently necessary for the effect to grow.</p>`,

  breakdown: [
    {
      title: "Three forces that shape the term structure",
      points: [
        "Expectations of future short rates — a rising expected path of 1-year rates produces an upward-sloping curve, a falling path produces a downward-sloping curve, and a flat path produces a flat curve; the n-year spot rate is the geometric average of the expected 1-year-rate sequence. Works well for short-to-medium horizons; breaks down for very long ones.",
        "Convexity (Jensen's inequality) — because the discount factor 1/(1+r) is convex in r, uncertainty (volatility) about future rates mechanically raises the expected bond price and lowers the implied yield versus a naive 'use the expected rate' calculation, with zero directional view required. Grows with both maturity and volatility, independently.",
        "Risk premium — risk-averse investors demand extra expected return beyond the risk-neutral level for bearing rate risk they can't diversify away, which lowers the bond's price (raises its expected return) as a separate, additive layer on top of the convexity adjustment."
      ]
    },
    {
      title: "How an expected rate path becomes a curve shape (worked, no volatility)",
      points: [
        "Flat: 1-year rate 8% today, expected 8% next year and 8% the year after → 1-, 2-, 3-year spot rates are all 8% — investors are willing to lock in the same rate for any horizon.",
        "Upward-sloping: 1-year rate 8% today, expected 10% in one year, 12% in two years → 2-year spot rate solves (1+z2)^2=(1.08)(1.10) giving ≈8.995%; 3-year spot rate solves (1+z3)^3=(1.08)(1.10)(1.12) giving ≈9.988% — a rising sequence of 1-, 2-, 3-year spot rates of 8%, 8.995%, 9.988%.",
        "Downward-sloping: same mechanics with an expected path of 8%, 6%, 4% produces a falling sequence of spot rates: 8%, 6.995%, 5.987%.",
        "Long-horizon breakdown: nobody credibly forecasts a specific 1-year rate 30 years out, so at very long maturities the curve's level is anchored by long-run real rate plus long-run expected inflation instead of by a rate forecast."
      ]
    }
  ],

  quiz: [
    {
      q: "According to Jensen's inequality as applied to bond discounting, if future 1-year rates are volatile but their expected value is unchanged, the implied spot rate for a zero-coupon bond will:",
      options: ["Rise, because investors demand compensation for the extra volatility", "Fall, because the convex discount factor makes the volatility-aware expected price higher than the naive price", "Stay exactly the same, because expected value is unchanged", "Become undefined, because Jensen's inequality only applies to concave functions"],
      answer: 1,
      why: "The discount factor 1/(1+r) is convex, so E[1/(1+r)] > 1/(1+E[r]) — averaging over uncertain rates gives a higher expected price than plugging in the expected rate, which means a lower implied yield. The 'yields rise because investors demand compensation for volatility' answer describes the risk-premium effect, a separate mechanism that is easy to confuse with convexity but points from a different cause (risk aversion, not the mathematics of averaging a convex function)."
    },
    {
      q: "1-year rate = 8% today. Next year's 1-year rate will be 10% or 6% with equal probability. What is the approximate value of convexity for the 2-year zero-coupon bond?",
      options: ["8.00bp", "1.84bp", "18.4bp", "92.6bp"],
      answer: 1,
      why: "Expected price with actual rates = 0.5/1.10 + 0.5/1.06 = 0.92624; price with naive 8% expected rate = 1/1.08 = 0.92593. The higher price implies an implied 2-year spot rate of about 7.9816%, so the value of convexity is 8% − 7.9816% ≈ 1.84bp. 18.4bp is off by a factor of 10 (a common decimal-shift slip), and 92.6bp mistakes the price itself (×100) for a basis-point gap."
    },
    {
      q: "Holding volatility fixed, extending a zero-coupon bond's maturity from 2 years to 3 years will, all else equal:",
      options: ["Decrease the value of convexity, since more periods dilute the effect", "Leave the value of convexity unchanged, since it depends only on volatility", "Increase the value of convexity, since the averaging effect compounds over more periods", "Convert the convexity effect into a risk premium effect"],
      answer: 2,
      why: "The source's worked example shows the value of convexity rising from 1.84bp (2-year) to 5bp (3-year) for a comparable volatility spread — the Jensen's-inequality effect compounds with each additional period of discounting. The 'unchanged, since it depends only on volatility' answer is the classic trap: convexity value depends on BOTH maturity and volatility independently, not volatility alone."
    },
    {
      q: "A risk-neutral 2-year zero-coupon bond price implies an 8% expected return, but risk-averse investors require an 8.6% expected return instead. This 60bp gap is best described as:",
      options: ["Part of the convexity adjustment, since both effects lower the naive yield estimate", "A separate, additive risk premium layered on top of the convexity-adjusted (risk-neutral) price, which lowers the bond's price further", "Evidence that the market's rate expectations were wrong", "A rounding artifact of the Jensen's-inequality calculation"],
      answer: 1,
      why: "Risk premium and convexity are distinct mechanisms: convexity is a pure mathematical consequence of averaging over a convex function (raises price, lowers yield) that exists even for a risk-neutral investor; risk premium reflects actual risk aversion (lowers price, raises expected return) and is layered on top. Merging them into one number (the 'part of the convexity adjustment' answer) is the exact misconception this reading warns against."
    },
    {
      q: "Why does the pure-expectations explanation of curve shape break down at very long horizons (e.g., 30 years)?",
      options: ["Because convexity dominates and expectations become irrelevant at long maturities", "Because nobody can credibly forecast a specific short rate 30 years out, so the curve's level is instead anchored by long-run real rate plus long-run inflation expectations", "Because zero-coupon bonds cannot legally have maturities beyond 20 years", "Because risk premiums are zero at very long maturities, removing the need for expectations"],
      answer: 1,
      why: "The reading explicitly notes that at very long horizons, precise rate forecasts aren't credible, so the level of the long end is explained by anchoring assumptions (real rate + inflation) rather than a specific expected path. Convexity doesn't make expectations 'irrelevant' (the 'convexity dominates' answer, which wrongly claims expectations become irrelevant) — it's an additive adjustment on top of whatever expectations imply."
    },
    {
      q: "Today's 1-year rate is 8%. The market expects the 1-year rate to be 10% in one year (with certainty, no volatility). What is the 2-year spot rate?",
      options: ["9.000%", "8.995%", "9.897%", "8.500%"],
      answer: 1,
      why: "Solve (1+z2)^2 = (1.08)(1.10) = 1.188, so z2 = sqrt(1.188) − 1 ≈ 8.995%. 9.000% is the tempting simple average of 8% and 10%, which ignores the compounding (geometric, not arithmetic) nature of the relationship; 9.897% would result from mistakenly cubing instead of taking a square root."
    }
  ],

  sources: [
    { title: "Jensen's inequality — Wikipedia", url: "https://en.wikipedia.org/wiki/Jensen%27s_inequality", note: "The general mathematical statement (E[f(X)] ≥ f(E[X]) for convex f) underlying the convexity-effect calculation in this reading." },
    { title: "Expectations Theory — Investopedia", url: "https://www.investopedia.com/terms/e/expectationstheory.asp", note: "Plain-language explanation of how expected future short rates are said to determine the shape of the yield curve." },
    { title: "Yield curve — Wikipedia", url: "https://en.wikipedia.org/wiki/Yield_curve", note: "Background on term-structure shapes (flat, upward, downward/inverted) and the competing theories (expectations, liquidity premium, market segmentation) that explain them." },
    { title: "Term structure of interest rates — Investopedia", url: "https://www.investopedia.com/terms/t/termstructure.asp", note: "Overview of how spot rates across maturities are built up and interpreted, useful context for the multi-period spot-rate formula in this reading." }
  ],

  pdf: { book: 1, query: "This reading discusses how the decision tree framework" },

  summary: `<p>Curve shape has (at least) two independent drivers. <strong>Expectations</strong>: rate direction expected → curve slope; breaks down at very long horizons where long-run real rate + inflation expectations anchor the level instead. <strong>Convexity (Jensen's inequality)</strong>: E[1/(1+r)] > 1/(1+E[r]) — volatility of future rates RAISES expected bond price and LOWERS implied yield; grows with BOTH maturity and volatility, independently. <strong>Risk premium</strong>: a separate, additive compensation-for-risk effect that LOWERS bond price / RAISES expected return — do not conflate with convexity, which often points the opposite direction on price.</p>`
});
