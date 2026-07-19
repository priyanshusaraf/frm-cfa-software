FRM.register({
  book: 1, reading: 11,
  session: "Term Structures & Volatility",
  title: "The Science of Term Structure Models",
  tagline: "The mechanical foundation — binomial trees, backward induction, risk-neutral pricing — that Readings 12-14 build increasingly sophisticated drift and volatility structures on top of.",

  teaches: `<p>Reading 10 hedged bonds empirically using historical regressions. This reading builds the theoretical machinery underneath: how to construct an arbitrage-free model of rate evolution, price bonds and options on that model, and understand the assumptions baked in — backward induction, true vs risk-neutral probabilities, option pricing via trees, OAS, recombining vs non-recombining trees, time-step trade-offs, and why BSM cannot be used for bonds.</p>`,

  why: `<p>Every derivative pricing model needs a way to evolve rates forward and discount cash flows back that is internally consistent (no arbitrage) AND matches observed market prices. The binomial tree with backward induction is the simplest object that does both — and it's the scaffold that Readings 12-14 will decorate with increasingly realistic drift and volatility assumptions.</p>`,

  intuition: `<p>You can't value today's node without knowing tomorrow's possible values, and you can't know tomorrow's without knowing the day after — so you start at maturity (where value is certain) and work BACKWARD. At each node, bond value = the average of the two next-period present values (bond value + any coupon), discounted at that node's forward rate.</p>
  <p>The tree is built to be arbitrage-free: the model-computed price of an on-the-run bond must equal its ACTUAL market price. A tree is not "correct" just because it's internally consistent — it must also reconcile with the market, or it needs recalibration.</p>`,

  visual: `<div class="widget" data-widget="tree"></div>`,

  formulas: [
    { name: "Backward induction node value", math: "V_{node} = [0.5\\times (V_{up}+C) + 0.5\\times (V_{down}+C)] / (1+r_{node})", note: "Average the two next-period discounted values (plus coupon), using that node's own forward rate to discount." }
  ],

  concepts: [
    {
      name: "Backward induction",
      def: "Start at maturity (terminal values known with certainty) and work backward node by node; each node's value is the discounted average of its two successor nodes' values (plus coupon).",
      pitfall: "The tree must be arbitrage-free: the model price of an on-the-run bond must equal its actual market price, or the tree's rates need recalibration. Internal consistency alone is not enough.",
      related: ["True vs risk-neutral probabilities"]
    },
    {
      name: "True vs risk-neutral probabilities",
      def: "Naive 50/50 'true' probabilities in backward induction generally will NOT reproduce the market price. Two equivalent fixes: (1) keep 50/50 but adjust the RATES until model price matches market, or (2) keep the rates but adjust the PROBABILITIES (risk-neutral) until model price matches market.",
      intuition: "Both methods give the SAME derivative value — the difference between true and risk-neutral probabilities is exactly the interest rate drift (risk premium).",
      pitfall: "Don't think of risk-neutral probabilities as 'the real probabilities of up/down moves' — they're a pricing convenience that bakes the risk premium into the probability weights instead of the discount rate.",
      related: [{ r: 12, label: "R12 — risk premium as a separate, additive effect on top of convexity" }]
    },
    {
      name: "Pricing options via backward induction",
      def: "Three steps: (1) price the underlying bond at every node, (2) compute intrinsic option value at maturity nodes (e.g., max(0, bond price − strike) for a call), (3) discount back through the tree using risk-neutral probabilities.",
      pitfall: "An American-style feature requires comparing intrinsic value vs continuation value at EVERY node, not just maturity — a common shortcut error is only checking the terminal nodes.",
      related: ["Callable and putable bonds"]
    },
    {
      name: "Option-Adjusted Spread (OAS)",
      def: "The constant spread added to every discount rate in the tree needed to make the model price equal the observed market price.",
      intuition: "If market price < model price, OAS > 0 and the bond is trading CHEAP; if market price > model price, the bond is trading RICH.",
      pitfall: "OAS only adjusts the DISCOUNTING rates, not the cash flow projections themselves — this distinction (discount-rate adjustment vs cash-flow adjustment) is a common trap.",
      related: ["Backward induction"],
      memory: "OAS = the 'extra yield' a bond offers once you've adjusted for its embedded optionality."
    },
    {
      name: "Recombining vs non-recombining trees",
      def: "Recombining: up-then-down = down-then-up (same rate, fewer nodes, computationally simpler). Non-recombining ('state-dependent volatility'): the two paths land on genuinely different rates.",
      pitfall: "Non-recombining trees are more realistic in some settings but multiply computational complexity rapidly over many periods — a real cost, not a free upgrade.",
      related: [{ r: 13, label: "R13 — Vasicek's tree famously does NOT recombine" }]
    },
    {
      name: "Time steps and the BSM-bond mismatch",
      def: "Smaller time steps → more accurate, more computationally expensive — a direct trade-off, no free lunch.",
      example: "Three named reasons BSM cannot be used for bonds: (1) BSM assumes no upper bound on underlying price, but a bond has a maximum value (reached when rates hit zero); (2) BSM assumes a constant risk-free rate, but bond payoffs are literally DRIVEN by changing rates — self-contradictory; (3) BSM assumes constant volatility, but bond price volatility must fall to zero as the bond approaches maturity (pull-to-par).",
      pitfall: "All three BSM-for-bonds reasons are individually testable — know all three, not just one.",
      related: [{ r: 15, label: "R15 — BSM's constant-vol assumption failing again, for options generally" }],
      memory: "Three reasons BSM can't price bonds: capped price, self-contradictory rate assumption, vol must die to zero (pull-to-par)."
    },
    {
      name: "Callable and putable bonds",
      def: "Callable bonds exhibit negative convexity below the call-relevant yield threshold y′ (price appreciation capped by the call price as rates fall), but behave like an ordinary option-free bond (positive convexity) above y′.",
      intuition: "Callable bonds also worsen reinvestment risk — investors get their cash back exactly when reinvestment rates are low. Putable bonds: the put price creates a value FLOOR as rates rise, so price falls less than an option-free bond above y′, converging to option-free behavior at low yields.",
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
      { what: "True vs risk-neutral probabilities", how: "Both reproduce the same arbitrage-free price; true probabilities reflect real-world likelihood, risk-neutral probabilities bake the risk premium into probability weights instead of the discount rate." },
      { what: "OAS vs a simple yield spread", how: "OAS is specifically the spread needed AFTER accounting for embedded optionality (via the tree); a simple yield spread ignores option value entirely." },
      { what: "Recombining vs non-recombining trees", how: "Recombining assumes up-then-down equals down-then-up in rate terms; non-recombining trees (like Vasicek's) reject that assumption because mean-reversion adjustments depend on path, not just position." }
    ]
  },

  misconceptions: [
    { wrong: "\"A tree with internally consistent math is automatically a valid pricing tree.\"", right: "It must ALSO be arbitrage-free — its model price for an on-the-run bond must equal the market price, or it needs recalibration." },
    { wrong: "\"American-style options only need evaluation at maturity nodes.\"", right: "They require comparing intrinsic vs continuation value at EVERY node — an early-exercise decision anywhere in the tree." },
    { wrong: "\"OAS adjusts the bond's projected cash flows.\"", right: "OAS adjusts the DISCOUNT rates only — cash flow projections are unchanged. Confusing the two is a common trap." },
    { wrong: "\"Black-Scholes-Merton can be adapted to bonds with minor tweaks.\"", right: "Three fundamental, independently testable contradictions block it: bonds have a price ceiling, BSM assumes constant risk-free rate (self-contradictory for a rate-driven instrument), and bond volatility must decay to zero (pull-to-par) while BSM assumes constant vol." }
  ],

  highYield: [
    { stars: 5, what: "Backward induction mechanics and the arbitrage-free calibration requirement.", why: "The core mechanical skill this reading builds and everything after it assumes." },
    { stars: 4, what: "The three named reasons BSM fails for bonds.", why: "A clean, memorizable three-part fact frequently tested individually." },
    { stars: 3, what: "OAS: discount-rate adjustment (not cash-flow adjustment), cheap vs rich interpretation.", why: "A precise distinction that's an easy trap to fall into." },
    { stars: 3, what: "Callable (negative convexity below y′) vs putable (value floor above y′) bond behavior.", why: "Classic convexity-shape question, often paired with a yield-price diagram." },
    { stars: 2, what: "Recombining vs non-recombining tree trade-offs.", why: "Sets up Vasicek's non-recombining behavior in R13 — recognize the link." }
  ],

  recall: [
    { q: "Why must a rate tree be calibrated to be 'arbitrage-free,' and what specifically does that require?", a: "It requires the model-computed price of an on-the-run bond (using the tree's rates) to exactly equal that bond's observed market price — otherwise the tree, however internally consistent, is not usable for relative pricing and needs its rates recalibrated." },
    { q: "State the three specific reasons Black-Scholes-Merton cannot be used to price bonds.", a: "(1) BSM assumes no upper bound on the underlying's price, but bonds have a maximum value (rates at zero); (2) BSM assumes a constant risk-free rate, but bond payoffs are literally driven by changing rates; (3) BSM assumes constant volatility, but bond price volatility must fall to zero as maturity approaches (pull-to-par)." },
    { q: "You compute OAS = +40bp on a bond. What does this tell you about its market price relative to the model?", a: "OAS > 0 means the market price is LOWER than the model (pre-spread) price — the bond is trading cheap; you need to add 40bp to the discount rates to reconcile model and market prices." },
    { q: "Why does using true (50/50) probabilities instead of risk-neutral probabilities in backward induction usually fail to reproduce the market price?", a: "True probabilities reflect actual physical likelihood, ignoring the market's risk premium demanded for bearing rate risk. Risk-neutral probabilities (or equivalently, rate adjustments under 50/50 probabilities) bake that risk premium in — both approaches give the same, correct arbitrage-free price; naive 50/50 with unadjusted rates generally does not." },
    { q: "Sketch how a callable bond's price-yield relationship differs from an option-free bond's, and explain the reinvestment-risk consequence.", a: "Below the call-relevant yield y′, the callable bond's price is capped by the call price (negative convexity) — it can't rally as much as an option-free bond when rates fall. Above y′ it behaves like an ordinary option-free bond (positive convexity). The reinvestment consequence: investors get their principal back via the call exactly when rates (and reinvestment opportunities) are low." }
  ],

  hooks: [
    { title: "Start at the finish line", text: "Backward induction: you can't know the beginning without knowing the end. Value maturity first (certain), then walk backward one node at a time — the tree equivalent of solving a maze from the exit." },
    { title: "Three reasons BSM can't price a bond", text: "Capped price (BSM assumes unbounded), self-contradictory rate assumption (BSM assumes constant rf while the whole payoff IS the rate), and vol must die to zero (pull-to-par, BSM assumes constant vol). Three strikes." },
    { title: "OAS: the discount, not the menu", text: "OAS changes what you pay (discount rate) for the meal, never what's on the menu (cash flows)." }
  ],

  summary: `<p><strong>Backward induction</strong>: value maturity first, walk backward; each node = discounted average of two successor values. Must be <strong>arbitrage-free</strong> (matches market price) or recalibrate. <strong>True vs risk-neutral probabilities</strong>: two equivalent ways to bake in the risk premium (adjust rates under 50/50, or adjust probabilities under given rates) — the gap between them IS the interest rate drift. <strong>Option pricing</strong>: price bond at every node → intrinsic value at maturity → discount back with risk-neutral probabilities; American features need every-node comparison. <strong>OAS</strong>: constant spread added to discount rates (not cash flows) to match market price; OAS>0 = cheap. <strong>Recombining vs non-recombining</strong> trees trade simplicity for realism. <strong>BSM fails for bonds</strong>: unbounded-price assumption, constant-rate assumption, constant-vol assumption all violated. <strong>Callable</strong> = negative convexity below y′ + reinvestment risk; <strong>putable</strong> = value floor above y′.</p>`
});
