export default ({
  book: 1, reading: 11,
  session: "Term Structures & Volatility",
  title: "The Science of Term Structure Models",
  tagline: "The mechanical foundation - binomial trees, backward induction, risk-neutral pricing - that Readings 12-14 build increasingly sophisticated drift and volatility structures on top of.",

  teaches: `<p>Reading 10 hedged bonds empirically, using historical regressions. This reading digs into the theory underneath that: how to build an arbitrage-free model of rate evolution, price bonds and options against it, and understand what assumptions are baked in. That covers backward induction, true vs risk-neutral probabilities, option pricing via trees, OAS, recombining vs non-recombining trees, the time-step trade-off, and why BSM can't be used for bonds.</p>
  <p>A <strong>binomial interest rate tree</strong> is a picture of every possible path a short-term rate can take, one period at a time. At each point in time (a "node") the rate can only go one of two ways: up or down. Node 0 is today's known rate. Node 1 splits into an "upper" rate and a "lower" rate one period out. Node 2 splits each of those again, though the up-then-down path and the down-then-up path are usually built to land on the <em>same</em> rate (that's what "recombining" means, covered below). So a 2-period tree has 3 distinct nodes at time 2, not 4.</p>
  <p>The book's own worked example makes this concrete. A $100 face value, 2-year, zero-coupon bond (no coupon payments, it just pays $100 at maturity) has a market price of $90.006 today. The tree says: if the 1-year forward rate rises, the bond will be worth $93.299 at node 1-up, quoting a 1-year forward rate of 7.1826% at that node; if it falls, some other value applies at node 1-down. You value the bond at node 0 by taking the <em>average</em> of the present values of the two node-1 outcomes, discounted at node 0's own rate, and the whole tree is constructed so that this calculation reproduces $90.006 exactly. That's the arbitrage-free requirement: the model has to reconstruct a price you can already observe in the market, or its rates need recalibrating.</p>`,

  why: `<p>Every derivative pricing model needs a way to evolve rates forward and discount cash flows back that stays internally consistent (no arbitrage) and still matches observed market prices. The binomial tree with backward induction is the simplest object that manages both, and it's the scaffold Readings 12-14 will decorate with increasingly realistic drift and volatility assumptions.</p>`,

  intuition: `<p>You can't value today's node without knowing tomorrow's possible values, and you can't know tomorrow's without knowing the day after. So you start at maturity, where value is certain, and work backward. At each node, bond value equals the average of the two next-period present values (bond value plus any coupon), discounted at that node's forward rate.</p>
  <p>The tree is built to be arbitrage-free: the model-computed price of an on-the-run bond has to equal its actual market price. A tree isn't "correct" just because it's internally consistent. It has to reconcile with the market too, or it needs recalibration.</p>
  <p>Concretely, for the $100 face, 2-year zero-coupon bond above: you don't start guessing at today's rate. You start at maturity, where the bond is worth exactly $100 (certain, no more rate uncertainty left). Then you step back one period at a time, at each node computing "average of the two paths ahead of me, discounted at my own local rate," until you arrive back at node 0. If that final number equals $90.006, the tree's rates check out. If it doesn't, someone built the tree wrong, or the volatility/drift assumptions feeding it need adjusting. The tree gets thrown out or recalibrated. Not the market price.</p>`,

  visual: `<div class="widget" data-widget="tree"></div>`,

  formulas: [
    {
      name: "Backward induction node value",
      math: "V_{\\text{node}} = \\dfrac{0.5\\times (V_{\\text{up}}+C) + 0.5\\times (V_{\\text{down}}+C)}{1+r_{\\text{node}}}",
      note: "Average the two next-period discounted values (plus coupon), using that node's own forward rate to discount.",
      plain: "A bond's value at any point in the tree is nothing more than the probability-weighted average of what it's worth one step later (plus any coupon received), pulled back to today's dollars using the interest rate that applies specifically at that node.",
      derivation: `<p>Start from the bond's payoff at the two nodes it can move to next period: an "up" outcome worth \\(V_{\\text{up}}\\) and a "down" outcome worth \\(V_{\\text{down}}\\), each possibly carrying a coupon \\(C\\) as well. Under the naive "true" assumption that up and down are equally likely:</p>
      \\[ \\text{Expected next-period value} = 0.5\\,(V_{\\text{up}}+C) + 0.5\\,(V_{\\text{down}}+C) \\]
      <p>To convert that future expected dollar amount into today's value at this node, discount it one period at the 1-period forward rate quoted at this specific node, \\(r_{\\text{node}}\\):</p>
      \\[ V_{\\text{node}} = \\dfrac{0.5\\,(V_{\\text{up}}+C) + 0.5\\,(V_{\\text{down}}+C)}{1+r_{\\text{node}}} \\]
      <p>Repeat this one node at a time, starting at maturity (where the payoff is known with certainty, so there's nothing to average) and walking backward to node 0. That's backward induction. If the number that pops out at node 0 doesn't match the bond's actual market price, the tree's rates need recalibrating, not the formula.</p>`
    },
    {
      name: "Call option intrinsic value at maturity",
      math: "C_T = \\max(0,\\ B_T - X)",
      note: "At the option's expiration nodes, the option is worth its exercise value or zero, whichever is larger — no time value remains.",
      plain: "The option's value at maturity is simply the bond price at that node minus the strike price, but never less than zero. You'd never voluntarily pay more for the bond than you have to just to exercise your right.",
      derivation: `<p>In the book's worked example, a European call, strike \\(X=\\$100.00\\), on a 7% annual-coupon, 3-year bond, with the option expiring at the end of Year 2, the bottom Year-2 node has a bond price of \\(B_T=\\$102.20\\). So:</p>
      \\[ C_T = \\max(0,\\ 102.20 - 100.00) = \\$2.20 \\]
      <p>At the top Year-2 node the bond price is below \\(X\\), so \\(C_T = \\max(0, B_T-100.00) = 0\\); the option expires worthless there. These terminal intrinsic values are exactly Step 2 of the three-step option-pricing procedure below. They become the "known" starting values that backward induction then discounts back to today.</p>`
    }
  ],

  concepts: [
    {
      name: "Backward induction",
      def: "Start at maturity (terminal values known with certainty) and work backward node by node; each node's value is the discounted average of its two successor nodes' values (plus coupon).",
      intuition: "It's called 'backward' because you can't compute node 0's value without knowing node 1's values, and you can't know node 1's values without knowing node 2's. The only workable direction is to start where the answer is certain, at maturity, and move backward one step at a time.",
      example: "For the $100 face, 2-year zero-coupon bond priced at $90.006: at maturity, the bond is worth exactly $100 at every node (certainty). One period earlier, at node 1-up, the 1-year forward rate is 7.1826% and the bond is worth $93.299, the average of the two Year-2 outcomes (both $100, since it's a zero-coupon bond with no coupon to add) discounted one period at 7.1826%. Keep going back to node 0 and the resulting value has to equal $90.006, or the tree needs recalibration.",
      pitfall: "The tree must be arbitrage-free: the model price of an on-the-run bond must equal its actual market price, or the tree's rates need recalibration. Internal consistency alone isn't enough.",
      related: ["True vs risk-neutral probabilities"]
    },
    {
      name: "True vs risk-neutral probabilities",
      def: "Naive 50/50 'true' probabilities in backward induction generally will NOT reproduce the market price. Two equivalent fixes: (1) keep 50/50 but adjust the RATES until model price matches market, or (2) keep the rates but adjust the PROBABILITIES (risk-neutral) until model price matches market.",
      intuition: "Both methods give the same derivative value. The difference between true and risk-neutral probabilities is exactly the interest rate drift, i.e. the risk premium.",
      example: "Method 1 (adjust rates, keep 50/50) is exactly what the $90.006 zero-coupon bond example does: you take the yield curve's spot/forward rates and shape the tree's rates so that averaging with plain 50/50 weights reproduces the market price. Method 2 (adjust probabilities, keep rates) shows up in the CMT swap and call-option examples, where the risk-neutral probability of an up move is given directly as 0.76 in Year 1 and 0.60 in Year 2. These aren't literal forecasts of how likely rates are to rise. They're whatever probabilities, applied to the tree's actual rates, reproduce the correct no-arbitrage price.",
      pitfall: "Don't think of risk-neutral probabilities as 'the real probabilities of up/down moves.' They're a pricing convenience that bakes the risk premium into the probability weights instead of the discount rate.",
      related: [{ r: 12, label: "R12 — risk premium as a separate, additive effect on top of convexity" }]
    },
    {
      name: "Pricing options via backward induction",
      def: "Three steps: (1) price the underlying bond at every node, (2) compute intrinsic option value at maturity nodes (e.g., max(0, bond price − strike) for a call), (3) discount back through the tree using risk-neutral probabilities.",
      intuition: "You can't value the option with a single 'expected discounted value' shortcut the way you can a plain bond, because the option's payoff depends on the specific path interest rates took (it might be exercised or not depending on where the underlying bond ends up). Every node's option value has to be built up individually, working backward, just like the bond itself.",
      example: "Worked example: a European call, strike $100.00, two years to expiration, on a 7% annual-coupon bond with three years to maturity. Risk-neutral probability of an up move is 0.76 in Year 1 and 0.60 in Year 2. Step 1: price the bond at every node, remembering to add the $7 coupon before discounting at each step; the middle Year-2 node, for instance, prices at $100.62. Step 2: at maturity (end of Year 2), the bottom node's bond price is $102.20, giving intrinsic value max(0, $102.20 − $100.00) = $2.20; the top node's bond price is below $100, so its intrinsic value is $0. Step 3: discount those terminal option values back one node at a time using the risk-neutral probabilities (0.76 / 0.24 in Year 1, 0.60 / 0.40 in Year 2). The book shows the option value at the top Year-1 node coming out to $0.23.",
      pitfall: "An American-style feature requires comparing intrinsic value vs continuation value at every node, not just maturity. A common shortcut error is only checking the terminal nodes.",
      related: ["Callable and putable bonds"]
    },
    {
      name: "Constant-Maturity Treasury (CMT) swap",
      def: "A CMT swap is an agreement to swap a floating rate for a Treasury rate of a predetermined maturity (e.g., the 10-year rate), with payments made periodically (e.g., every six months) based on the prevailing CMT yield at each payment date.",
      intuition: "It's priced exactly like the option examples: build the payoffs at each future node from the CMT rate that prevails there, then discount backward using the risk-neutral probabilities, folding in any interim payoffs (like the six-month cash flows) along the way rather than waiting until the very end.",
      example: "In the book's worked example, the risk-neutral probability of an increase in the 6-month spot rate is 76%, and of an increase in the 1-year spot rate is 60%. The six-month top and bottom node payoffs are computed directly, and the six-month values (used for discounting back further) are the expected discounted value of the 1-year payoffs plus the six-month payoffs themselves ($1,250 and −$1,250 in that example). Interim cash flows get added in at each step, not just tacked on at the end. The resulting model price for the swap comes out to $1,466.63.",
      pitfall: "Don't forget to fold in interim payoffs at each node along the way. Only adding them at the very end of the calculation understates the swap's value.",
      related: ["Option-Adjusted Spread (OAS)"]
    },
    {
      name: "Option-Adjusted Spread (OAS)",
      def: "The constant spread added to every discount rate in the tree needed to make the model price equal the observed market price.",
      intuition: "If market price is below model price, OAS is positive and the bond is trading cheap. If market price is above model price, the bond is trading rich.",
      example: "In the CMT swap example, the model price (using the un-adjusted risk-neutral tree) came out to $1,466.63, but the actual market price was $1,464.40, $2.23 lower. To reconcile the two, you add a constant 20 basis points to every discounting rate in the tree, so the six-month rates used for discounting become 7.25% and 6.75% instead of 7.05% and 6.55%, and the rate used to discount back to today becomes 7.2% instead of 7.0%. Recomputing the tree with these bumped-up discount rates produces a model price of exactly $1,464.40, matching the market. Since the market price started out below the model price, this security was trading cheap.",
      pitfall: "OAS only adjusts the discounting rates, not the cash flow projections themselves. That distinction, discount-rate adjustment vs cash-flow adjustment, is a common trap.",
      related: ["Backward induction"],
      memory: "OAS = the 'extra yield' a bond offers once you've adjusted for its embedded optionality."
    },
    {
      name: "Recombining vs non-recombining trees",
      def: "Recombining: up-then-down = down-then-up (same rate, fewer nodes, computationally simpler). Non-recombining ('state-dependent volatility'): the two paths land on genuinely different rates.",
      intuition: "In every worked example above (the $100 zero-coupon bond, the 7% coupon bond call option), the middle Year-2 node has exactly one rate (6.34% in the call-option example), regardless of whether the path got there via up-then-down or down-then-up. That collapsing of paths into shared nodes is what keeps a 2-period tree at 3 distinct nodes instead of 4, and what keeps an N-period tree computationally tractable. A non-recombining tree can arise if, say, rates above some threshold (e.g., 3%) move by a fixed number of basis points but rates below that threshold move differently. The path taken to reach a given point then genuinely changes the rate you land on.",
      pitfall: "Non-recombining trees are more realistic in some settings, but they multiply computational complexity rapidly over many periods. That's a real cost, not a free upgrade.",
      related: [{ r: 13, label: "R13 — Vasicek's tree famously does NOT recombine" }]
    },
    {
      name: "Time steps and the BSM-bond mismatch",
      def: "Smaller time steps mean more accuracy at more computational expense. A direct trade-off, no free lunch.",
      example: "Three named reasons BSM cannot be used for bonds. First, BSM assumes no upper bound on the underlying's price, but a bond has a maximum value, reached when interest rates hit zero, at which point a zero-coupon bond is worth exactly its par/face value and a coupon bond is worth the sum of its remaining coupons plus par. Second, BSM assumes a constant risk-free rate, but bond payoffs are literally driven by changing rates: self-contradictory, since the very thing the model treats as fixed is what's generating the bond's value changes. Third, BSM assumes constant volatility, but bond price volatility must fall to zero as the bond approaches maturity (pull-to-par: a bond maturing tomorrow can only be worth its redemption value, so there's essentially no price uncertainty left).",
      pitfall: "All three BSM-for-bonds reasons are individually testable. Know all three, not just one.",
      related: [{ r: 15, label: "R15 — BSM's constant-vol assumption failing again, for options generally" }],
      memory: "Three reasons BSM can't price a bond: capped price, self-contradictory rate assumption, vol must die to zero (pull-to-par)."
    },
    {
      name: "Callable and putable bonds",
      def: "Callable bonds exhibit negative convexity below the call-relevant yield threshold y′ (price appreciation capped by the call price as rates fall), but behave like an ordinary option-free bond (positive convexity) above y′.",
      intuition: "A call option gives the issuer the right to buy the bond back from the investor at a fixed price at one or more points before maturity, so the investor is effectively short that call. Above y′, yields are high enough that the issuer has little incentive to call (the bond is worth less than the call price anyway), so the bond trades like a plain option-free bond. Below y′, investors start to anticipate the issuer will call, so the bond's price gets capped near the call price no matter how far yields keep falling, hence 'negative convexity': price appreciation slows and flattens instead of accelerating. Callable bonds also worsen reinvestment risk, since investors get their cash back via the call exactly when reinvestment rates are low, and they receive a bigger lump sum to reinvest (coupon plus call price) at the worst possible time. Putable bonds work in reverse: the bondholder has the right to sell the bond back to the issuer at a set price, which creates a value floor as rates rise. Price falls less than an option-free bond above y′, converging to option-free (unputable-equivalent) behavior at low yields where the put is unlikely to be exercised.",
      related: ["Pricing options via backward induction"],
      memory: "Callable = capped upside (issuer's option). Putable = floored downside (investor's option)."
    }
  ],

  connections: {
    from: [
      { r: 10, why: "Empirical regression hedging is the practical toolkit; this reading builds the theoretical model underneath rate evolution." }
    ],
    to: [
      { r: 12, why: "This reading's mechanics (trees, risk-neutral pricing) set up the 'why does the curve have this shape' question." },
      { r: 13, why: "The drift models (Model 1/2, Ho-Lee, Vasicek) are all built on this reading's backward-induction scaffold." },
      { r: 15, why: "BSM's constant-volatility failure reappears as the volatility-smile story, for options generally." }
    ],
    confused: [
      { what: "True vs risk-neutral probabilities", how: "Both reproduce the same arbitrage-free price. True probabilities reflect real-world likelihood; risk-neutral probabilities bake the risk premium into the probability weights instead of the discount rate." },
      { what: "OAS vs a simple yield spread", how: "OAS is specifically the spread needed after accounting for embedded optionality (via the tree); a simple yield spread ignores option value entirely." },
      { what: "Recombining vs non-recombining trees", how: "Recombining assumes up-then-down equals down-then-up in rate terms. Non-recombining trees (like Vasicek's) reject that assumption because mean-reversion adjustments depend on path, not just position." }
    ]
  },

  misconceptions: [
    { wrong: "\"A tree with internally consistent math is automatically a valid pricing tree.\"", right: "It also has to be arbitrage-free: its model price for an on-the-run bond must equal the market price, or it needs recalibration." },
    { wrong: "\"American-style options only need evaluation at maturity nodes.\"", right: "They require comparing intrinsic vs continuation value at every node, an early-exercise decision anywhere in the tree." },
    { wrong: "\"OAS adjusts the bond's projected cash flows.\"", right: "OAS adjusts the discount rates only. Cash flow projections are unchanged. Confusing the two is a common trap." },
    { wrong: "\"Black-Scholes-Merton can be adapted to bonds with minor tweaks.\"", right: "Three fundamental, independently testable contradictions block it: bonds have a price ceiling, BSM assumes a constant risk-free rate (self-contradictory for a rate-driven instrument), and bond volatility must decay to zero (pull-to-par) while BSM assumes constant vol." },
    { wrong: "\"Risk-neutral probabilities of 0.76 or 0.60 are the analyst's actual forecast of how likely rates are to rise.\"", right: "They're calibration inputs, chosen along with (or instead of) the rates themselves, specifically so the model reproduces the observed market price. They encode the market's risk premium, not a real-world probability forecast." }
  ],

  highYield: [
    { stars: 5, what: "Backward induction mechanics and the arbitrage-free calibration requirement.", why: "The core mechanical skill this reading builds, and everything after it assumes you have it." },
    { stars: 4, what: "The three named reasons BSM fails for bonds.", why: "A clean, memorizable three-part fact that gets tested individually." },
    { stars: 3, what: "OAS: discount-rate adjustment (not cash-flow adjustment), cheap vs rich interpretation.", why: "A precise distinction that's an easy trap to fall into." },
    { stars: 3, what: "Callable (negative convexity below y′) vs putable (value floor above y′) bond behavior.", why: "A classic convexity-shape question, often paired with a yield-price diagram." },
    { stars: 2, what: "Recombining vs non-recombining tree trade-offs.", why: "Sets up Vasicek's non-recombining behavior in R13. Worth recognizing the link." }
  ],

  recall: [
    { q: "Why must a rate tree be calibrated to be 'arbitrage-free,' and what specifically does that require?", a: "The model-computed price of an on-the-run bond, using the tree's rates, has to exactly equal that bond's observed market price. Otherwise the tree, however internally consistent, isn't usable for relative pricing and needs its rates recalibrated." },
    { q: "State the three specific reasons Black-Scholes-Merton cannot be used to price bonds.", a: "BSM assumes no upper bound on the underlying's price, but bonds have a maximum value (rates at zero). BSM assumes a constant risk-free rate, but bond payoffs are literally driven by changing rates. And BSM assumes constant volatility, but bond price volatility must fall to zero as maturity approaches (pull-to-par)." },
    { q: "You compute OAS = +40bp on a bond. What does this tell you about its market price relative to the model?", a: "OAS > 0 means the market price is lower than the model (pre-spread) price, so the bond is trading cheap. You add 40bp to the discount rates to reconcile model and market prices." },
    { q: "Why does using true (50/50) probabilities instead of risk-neutral probabilities in backward induction usually fail to reproduce the market price?", a: "True probabilities reflect actual physical likelihood, ignoring the market's risk premium demanded for bearing rate risk. Risk-neutral probabilities (or equivalently, rate adjustments under 50/50 probabilities) bake that risk premium in. Both approaches give the same, correct arbitrage-free price; naive 50/50 with unadjusted rates generally does not." },
    { q: "Sketch how a callable bond's price-yield relationship differs from an option-free bond's, and explain the reinvestment-risk consequence.", a: "Below the call-relevant yield y′, the callable bond's price is capped by the call price (negative convexity), so it can't rally as much as an option-free bond when rates fall. Above y′ it behaves like an ordinary option-free bond (positive convexity). The reinvestment consequence: investors get their principal back via the call exactly when rates (and reinvestment opportunities) are low." }
  ],

  hooks: [
    { title: "Start at the finish line", text: "Backward induction: you can't know the beginning without knowing the end. Value maturity first, since it's certain, then walk backward one node at a time. It's the tree equivalent of solving a maze from the exit." },
    { title: "Three reasons BSM can't price a bond", text: "Capped price (BSM assumes unbounded), a self-contradictory rate assumption (BSM assumes constant rf while the whole payoff is the rate), and vol that has to die to zero (pull-to-par, while BSM assumes constant vol). Three strikes." },
    { title: "OAS: the discount, not the menu", text: "OAS changes what you pay for the meal, the discount rate, never what's on the menu, the cash flows." }
  ],

  eli5: `<p>Imagine you're trying to figure out the best route through a corn maze, but instead of wandering forward and hoping, you start at the exit and work backward. At the exit, you know exactly how "good" that spot is: you're out, success. At each junction one step before the exit, you look at the two paths ahead of you, average how good they are, and now you know how good this junction is. Keep doing that, junction by junction, until you reach the entrance, and now you know the value of every point in the maze, including where you're standing right now. And here's the check: if a park ranger tells you the maze's "true" difficulty rating from the entrance, and your backward calculation doesn't match it, you don't argue with the ranger. You adjust your assumptions about the junctions (how the paths are laid out, or how likely you are to go left vs. right) until your calculated difficulty matches theirs. In finance, the maze is the interest rate tree, the exit is the bond's maturity (where its value is certain), each junction is a "node," and the park ranger's rating is the bond's actual observed market price. The tree gets recalibrated, rates or probabilities adjusted, until backward induction reproduces that market price exactly. That's what "arbitrage-free" means.</p>`,

  thinkLike: `<p>A fixed-income derivatives desk doesn't build a rate tree to predict the future. It builds one to price things consistently with the market it can already observe. The very first thing a risk manager checks about any tree isn't "does this look realistic," it's "does plugging today's on-the-run bond into this tree reproduce today's actual market price?" If it doesn't, the tree is useless for relative pricing, no matter how elegant its rate dynamics are. That's why arbitrage-free calibration is the load-bearing idea of the whole reading, and why the exam repeatedly tests whether you'll fall for "internally consistent math equals valid tree."</p>
  <p>Once calibrated, the same three-step recipe (price the underlying at every node, compute terminal intrinsic values, discount backward using risk-neutral probabilities) applies whether you're pricing a vanilla call, a CMT swap, or a callable bond's embedded option. The exam likes to disguise the same mechanical process behind different instrument names. Expect numeric questions that hand you a partially-filled tree and ask you to compute one missing node value (a direct test of the backward-induction formula), OAS questions that test whether you know it adjusts discount rates and not cash flows, and qualitative questions on the three BSM-for-bonds failures or the callable/putable convexity shapes, often via a described or sketched price-yield diagram rather than a formula.</p>`,

  breakdown: [
    {
      title: "Three steps to price an option on a fixed-income instrument via backward induction",
      points: [
        "Step 1 — Price the underlying bond at every node using the tree's projected interest rates, adding any coupon before discounting at each step.",
        "Step 2 — Calculate the derivative's intrinsic value at each node at maturity (e.g., max(0, bond price − strike) for a call).",
        "Step 3 — Discount those terminal values backward through the tree, node by node, using the risk-neutral probabilities, until you reach today's value."
      ]
    },
    {
      title: "Two equivalent ways to build a risk-neutral (arbitrage-free) tree",
      points: [
        "Method 1, adjust the rates: start from spot/forward rates off the current yield curve, keep 50/50 probabilities, and shape the tree's rates so the model price matches the market price of an on-the-run bond.",
        "Method 2, adjust the probabilities: take the tree's rates as given and solve for risk-neutral probabilities (not 50/50) that make the model price match the market price.",
        "Both methods produce the exact same value for any derivative priced off the tree. The choice is a modeling convenience, not a substantive difference."
      ]
    },
    {
      title: "Three reasons Black-Scholes-Merton cannot be used to value bonds",
      points: [
        "No upper price bound: BSM assumes the underlying's price is unbounded, but a bond has a maximum value, reached when rates hit zero (a zero-coupon bond is worth par, a coupon bond is worth the sum of remaining coupons plus par).",
        "Constant risk-free rate: BSM assumes the risk-free rate never changes, but a bond's entire payoff and value are driven by changing rates. A self-contradiction.",
        "Constant volatility: BSM assumes volatility is constant, but bond price volatility must decay to zero as maturity approaches (pull-to-par), since a bond about to mature can only be worth close to its redemption value."
      ]
    },
    {
      title: "Callable vs putable bond price-yield behavior",
      points: [
        "Callable, above yield y′: behaves like an ordinary option-free bond, positive convexity, since the issuer has little incentive to call when the bond is worth less than the call price.",
        "Callable, below yield y′: negative convexity. Price appreciation is capped by the call price as rates keep falling, and reinvestment risk rises since investors get cash back exactly when rates are low.",
        "Putable, above yield y′: the put price creates a value floor, so price falls less than an option-free bond as yields rise.",
        "Putable, at low yields: converges to ordinary option-free bond behavior, since the put is unlikely to ever be exercised."
      ]
    }
  ],

  quiz: [
    {
      q: "A $100 face value, 2-year, zero-coupon bond has a market price of $90.006. Using backward induction with 50/50 probabilities, the tree you built produces a node-0 value of $91.20. What should you conclude?",
      options: [
        "The bond is trading cheap and you should buy it immediately",
        "The tree's rates (or probabilities) need recalibration so the model price matches the $90.006 market price",
        "Nothing — a small mismatch between model and market price is expected and can be ignored",
        "The market price is wrong and should be corrected to $91.20"
      ],
      answer: 1,
      why: "An interest rate tree must be arbitrage-free: its model-computed price for an on-the-run bond must equal the actual market price. A mismatch means the tree needs recalibration, not the market. Concluding the bond is cheap and should be bought, or that mismatches don't matter, both misunderstand that arbitrage-free calibration is a requirement, not a suggestion. And the market price is the given, unquestioned input the model must match, not something to be 'corrected' to the tree's output."
    },
    {
      q: "Which of the following best describes the value of a bond at a given node in a binomial interest rate tree?",
      options: [
        "The sum of the present values of the two possible values from the next period",
        "The average of the future values of the two possible values from the next period",
        "The average of the present values of the two possible values from the next period, discounted at that node's own rate",
        "The higher of the two possible values from the next period, discounted at the risk-free rate"
      ],
      answer: 2,
      why: "Backward induction values a node as the average of the present values of its two successor nodes (plus any coupon), discounted at the rate specific to that node. Summing the two present values instead of averaging them double-counts value; averaging the future values instead of the present values skips discounting entirely; and taking the higher of the two values confuses this with option intrinsic value logic, which only applies at the derivative's terminal nodes."
    },
    {
      q: "A European call option (strike $100.00) on a 7% coupon bond has a bond price of $102.20 at a Year-2 terminal node. What is the option's intrinsic value at that node?",
      options: [
        "$0, because the option is European and cannot be exercised early",
        "$7.00, equal to the bond's coupon",
        "$2.20",
        "$102.20"
      ],
      answer: 2,
      why: "Intrinsic value at maturity is max(0, bond price − strike) = max(0, $102.20 − $100.00) = $2.20. The claim that European options can't be exercised early, and so are worth $0, is true as a general fact but irrelevant at the maturity node itself, where exercise is exactly what's being evaluated. Confusing the payoff with the coupon amount, or with the full bond price, both skip the actual max(0, B−X) calculation."
    },
    {
      q: "In the CMT swap example, the model price using the risk-neutral tree comes out to $1,466.63, but the observed market price is $1,464.40. What does the resulting positive OAS of 20bp mean, and what does it get added to?",
      options: [
        "The swap is trading rich; 20bp is subtracted from the projected cash flows",
        "The swap is trading cheap; 20bp is added to every rate used for discounting in the tree",
        "The swap is trading cheap; 20bp is added to the projected cash flows at each node",
        "The swap is trading rich; 20bp is added to every rate used for discounting in the tree"
      ],
      answer: 1,
      why: "Market price ($1,464.40) is below the model price ($1,466.63), so the security is trading cheap, and OAS is positive. OAS is added only to the discount rates used in the tree (e.g., the six-month rates move from 7.05%/6.55% to 7.25%/6.75%), never to the projected cash flows. The most common trap is assuming OAS touches the cash flow projections, which the 'cheap, added to cash flows' and 'rich, subtracted from cash flows' answers both imply, or getting the cheap/rich direction backward, as in the 'rich, added to discount rates' answer."
    },
    {
      q: "Which of the following is NOT one of the three reasons Black-Scholes-Merton is inappropriate for valuing bonds?",
      options: [
        "BSM assumes no upper bound on the underlying's price, but bonds have a maximum value",
        "BSM assumes a constant risk-free rate, but bond payoffs are driven by changing rates",
        "BSM assumes options can only be exercised at maturity, but most bond options are American-style",
        "BSM assumes constant volatility, but bond price volatility must fall to zero as maturity approaches"
      ],
      answer: 2,
      why: "The three specific, testable reasons are: no price upper bound, constant risk-free rate assumption, and constant volatility assumption (versus pull-to-par). Exercise style (European vs. American) is a separate modeling choice unrelated to why BSM's core assumptions fail for bonds — it is not one of the three named reasons, making it the correct 'NOT' answer."
    },
    {
      q: "A callable bond and an otherwise-identical option-free bond are compared as yields fall well below the call-relevant yield y′. Which statement correctly describes the callable bond's behavior?",
      options: [
        "It exhibits positive convexity and rallies more than the option-free bond",
        "Its price appreciation is capped near the call price, exhibiting negative convexity, and reinvestment risk rises",
        "Its price is unaffected by the level of yields once below y′",
        "It behaves identically to the option-free bond because the call feature only matters at issuance"
      ],
      answer: 1,
      why: "Below y′, investors anticipate the issuer calling the bond, so its price is capped near the call price — negative convexity — and reinvestment risk worsens because investors get cash back (coupon plus call price) exactly when rates are low. The bond does NOT outperform the option-free bond (ruling out the 'positive convexity, rallies more' answer), it is very much affected by yield changes even if compressed (ruling out the 'price is unaffected' answer), and the call feature remains economically relevant throughout the bond's life whenever it's in the money for the issuer (ruling out the 'behaves identically because the call only matters at issuance' answer)."
    }
  ],

  sources: [
    { title: "Binomial options pricing model — Wikipedia", url: "https://en.wikipedia.org/wiki/Binomial_options_pricing_model", note: "Background on the binomial tree framework this reading applies specifically to fixed-income instruments." },
    { title: "Option-Adjusted Spread (OAS) — Investopedia", url: "https://www.investopedia.com/terms/o/optionadjustedspread.asp", note: "A plain-language explainer of OAS, including the cheap/rich interpretation used in this reading's worked example." },
    { title: "Black-Scholes Model — Investopedia", url: "https://www.investopedia.com/terms/b/blackscholes.asp", note: "Reviews BSM's core assumptions, useful for seeing exactly which ones this reading argues break down for bonds." },
    { title: "Callable Bond — Investopedia", url: "https://www.investopedia.com/terms/c/callablebond.asp", note: "Covers the price-yield behavior and reinvestment-risk consequence of callable bonds discussed in this reading." }
  ],

  pdf: { book: 1, query: "A binomial model is a model that assumes" },

  summary: `<p><strong>Backward induction</strong>: value maturity first, walk backward; each node = discounted average of two successor values. Must be <strong>arbitrage-free</strong> (matches market price) or recalibrate. <strong>True vs risk-neutral probabilities</strong>: two equivalent ways to bake in the risk premium (adjust rates under 50/50, or adjust probabilities under given rates) — the gap between them IS the interest rate drift. <strong>Option pricing</strong>: price bond at every node → intrinsic value at maturity → discount back with risk-neutral probabilities; American features need every-node comparison. <strong>OAS</strong>: constant spread added to discount rates (not cash flows) to match market price; OAS>0 = cheap. <strong>Recombining vs non-recombining</strong> trees trade simplicity for realism. <strong>BSM fails for bonds</strong>: unbounded-price assumption, constant-rate assumption, constant-vol assumption all violated. <strong>Callable</strong> = negative convexity below y′ + reinvestment risk; <strong>putable</strong> = value floor above y′.</p>`
});
