FRM.register({
  book: 5, reading: 81,
  session: "Risk Management and Investment Management",
  title: "Factor Theory",
  tagline: "It is not exposure to an asset that is rewarded — it is exposure to the underlying factors. Assets are bundles of factor risks, and factor risk premiums pay you for bearing losses in bad times.",

  teaches: `<p>Factor theory's three principles, the CAPM (assumptions, six implications, seven shortcomings), multifactor models, the stochastic discount factor (pricing kernel), and efficient market theory.</p>`,

  why: `<p>This reading reframes everything: risk premiums aren't rewards for holding specific assets, they're compensation for exposure to underlying FACTOR risks — exposures to "bad times." This lens reframes every later Book 5 reading: factors (R82), alpha (R83), portfolio construction (R84), and even performance evaluation (R88) all build on "what factor exposure am I actually being paid for?"</p>`,

  intuition: `<p>Three principles anchor factor theory: (1) factors are important, not assets — look through the asset to its underlying risk factor exposures; (2) assets represent bundles of factors — a corporate bond bundles equity risk, interest rate risk, volatility risk, default risk; (3) investors have differing optimal risk exposures — different investors want different exposures to the same factors (e.g., volatility) based on how well they personally can withstand bad times.</p>
  <p>The CAPM is the simplest possible factor model: ONE factor (the market), priced via beta. Its six lessons: hold the factor not the asset, investors have differing optimal exposures, the average investor holds 100% of the market, factor risk exposure must be rewarded, risk is measured as beta, and valuable assets (positive payoff in bad times) have LOW risk premiums. But CAPM rests on seven unrealistic assumptions (financial-wealth-only, mean-variance utility, single-period horizon, homogeneous expectations, frictionless markets, price-taking, free information) — multifactor models relax the single-factor assumption, and the stochastic discount factor (SDF/pricing kernel) generalizes further by allowing nonlinear "bad times" indexing across many factors simultaneously.</p>`,

  visual: `<div class="widget" data-widget="frontier"></div>`,

  formulas: [
    { name: "CAPM security market line", math: "E(R_{i}) = R_F + \\beta_{i}\\times [E(R_M)-R_F]", note: "\\(\\beta_{i}\\) = \\(cov(R_{i}\\),R_M)/var(R_M). Higher beta → higher required return (compensation for bad-times risk)." },
    { name: "Stochastic discount factor (SDF)", math: "m = a + b\\,R_M \\quad(\\text{CAPM special case, linear});\\ \\text{generalizes to } m(f_1,f_2,\\dots,f_k)\\text{ for multiple factors}", note: "m is 'an index of bad times' — high when marginal utility of an extra dollar is high (job loss, low GDP growth, low consumption)." },
    { name: "Asset risk premium via SDF beta", math: "E(R_{i}) - R_F = -\\beta_{i},_{m} \\times [cov(R_{i},m) pricing]", note: "\\(\\beta_{i}\\),\\(_{m}\\) = \\(cov(R_{i}\\),m)/var(m). Negative sign: assets with positive payoff in bad times (high cov with m) have LOW/negative risk premiums." }
  ],

  concepts: [
    {
      name: "Factor theory's three principles",
      def: "(1) Factors are important, not assets — investors must look through assets to the underlying risk factor exposures. (2) Assets represent bundles of factors — most assets (corporate bonds, PE, hedge funds) bundle equity risk, interest rate risk, volatility risk, default risk; some (equities, govt bonds) can be thought of as factors themselves. (3) Investors have differing optimal risk exposures — e.g., to volatility, based on how well they can personally withstand bad times.",
      pitfall: "Corporate bonds, private equity, and hedge funds are NOT factors themselves — they CONTAIN many factors. A common trap conflates 'asset that carries factor risk' with 'factor.'",
      related: [{ r: 82, label: "R82 — the named factors (value, size, momentum) this principle generalizes to" }],
      memory: "Bad times aren't just recessions — they're exposures to ANY adverse state (inflation shock, volatility spike, poor market performance) that a factor represents."
    },
    {
      name: "The CAPM — six lessons",
      def: "(1) Hold the factor (market portfolio), not individual assets — diversification removes idiosyncratic risk. (2) Investors have their own optimal factor exposures via the capital allocation line (CAL). (3) The average investor is 100% invested in the market (the tangency point). (4) Exposure to factor risk must be rewarded — the market risk premium via the capital market line (CML). (5) Risk is measured as beta exposure — higher beta = higher required return. (6) Valuable assets (positive payoff in bad times) have LOW risk premiums.",
      example: "During the 2007-09 crisis, safe havens (gold, government bonds) became so attractive some had NEGATIVE expected returns — investors literally paid to hold them, the ultimate 'low risk premium for a valuable (bad-times-payoff) asset' illustration.",
      related: []
    },
    {
      name: "Seven shortcomings of the CAPM",
      def: "(1) Investors only have financial wealth (ignores human capital/labor income risk). (2) Investors have mean-variance (symmetric) utility (ignores loss aversion/downside risk). (3) Single-period investment horizon (ignores rebalancing needs). (4) Homogeneous expectations (investors actually disagree). (5) Frictionless markets (ignores taxes, transaction costs, short-sale restrictions). (6) All investors are price takers (large institutions move markets). (7) Information is free and available to everyone (information is actually costly).",
      pitfall: "The CAPM assumes NO taxes/transaction costs (not 'uniform' taxes/costs) — a subtle wording distinction the exam tests directly.",
      related: [{ r: 83, label: "R83 — the low-risk anomaly, a direct real-world violation of CAPM's clean beta-return relationship" }],
      memory: "Seven assumptions, seven ways reality diverges — each is independently testable."
    },
    {
      name: "Multifactor models",
      def: "Incorporate multiple risk factors (not just the market) — e.g., low economic growth, low GDP growth, low consumption. Arbitrage pricing theory (APT) was an early example: expected returns as a linear function of exposures to common macroeconomic risk factors.",
      pitfall: "Multifactor models share CAPM's six lessons in spirit (diversification benefit, optimal exposures, average investor holds the market, factor risk rewarded, risk measured by factor betas, valuable assets have low premiums) — but risk is measured by MULTIPLE factor betas, not one market beta.",
      related: ["Pricing kernels (stochastic discount factor)"]
    },
    {
      name: "Pricing kernels (stochastic discount factor)",
      def: "The SDF (m) is a random variable representing 'an index of bad times' across multiple factors and states. CAPM is the special case where m moves LINEARLY with the market return — a shortcoming the SDF framework fixes by allowing nonlinearity.",
      intuition: "Bad times = periods when an additional $1 of income becomes very valuable (marginal utility framing) — job loss, low GDP growth, low consumption relative to past consumption.",
      pitfall: "Assets with a POSITIVE payoff in bad times are valuable (high price, low/negative expected return) — the SDF-beta relationship inverts the usual sign, since it's measuring \\(cov(R_{i}\\), m), not \\(cov(R_{i}\\), R_M) directly.",
      related: [],
      memory: "SDF = CAPM's 'm is linear in the market' assumption, generalized to allow m to be any nonlinear function of many bad-times factors."
    },
    {
      name: "Efficient market theory",
      def: "APT was one of the earliest efficient market theories — systematic factors can't be removed via arbitrage, so investors demand compensation. Grossman-Stiglitz (1980): markets are near-efficient, information is costless (though this creates a circular paradox — if information is free and prices reflect everything, no one has an incentive to collect it, but then it can't be reflected).",
      example: "EMH: speculative trading is costly, active managers can't generally beat the market — but the EMH is still useful because it identifies areas of market inefficiency exploitable through active management, especially in illiquid segments with costly/unavailable information.",
      pitfall: "Rational explanation of anomalies: losses during 'bad times' are compensated by high returns (define bad times carefully — a short-the-market investor benefits, not loses, in a 'bad times' scenario). Behavioral explanation: under/overreaction to news generates returns; structural and regulatory barriers can let behavioral biases persist for a long time.",
      related: [],
      memory: "Grossman-Stiglitz paradox: if information were truly free, nobody would bother collecting it — but then prices couldn't reflect it. Perfectly costless information is self-defeating."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 82, why: "The named, tradeable factors (value, size, momentum, volatility) are concrete applications of this reading's abstract factor theory." },
      { r: 83, why: "Alpha is defined relative to a factor benchmark, and the low-risk anomaly directly violates CAPM's beta-return relationship established here." },
      { r: 7, why: "Portfolio variance and diversification logic from Book 1 reappears as the CAPM's 'hold the factor, not the asset' lesson." }
    ],
    confused: [
      { what: "Factors vs assets that carry factor risk", how: "The market and (arguably) government bonds/equities can be thought of AS factors. Corporate bonds, private equity, hedge funds are NOT factors — they CONTAIN multiple factor exposures (equity risk, rate risk, vol risk, default risk)." },
      { what: "CAPM beta vs SDF beta sign convention", how: "Standard CAPM: higher beta (more market co-movement) → higher required return. SDF framing: higher \\(cov(R_{i}\\),m) (better payoff in bad times) → LOWER required return — same underlying idea, opposite-looking sign because m indexes 'bad times,' not the market directly." }
    ]
  },

  misconceptions: [
    { wrong: "\"Corporate bonds, private equity, and hedge funds are themselves risk factors.\"", right: "They are NOT factors — they CONTAIN bundles of factors (equity risk, interest rate risk, volatility risk, default risk). Only things like the market portfolio (and arguably equities/government bonds) can be thought of as factors themselves." },
    { wrong: "\"The CAPM assumes uniform taxes and transaction costs across investors.\"", right: "The CAPM assumes NO taxes or transaction costs at all (frictionless markets) — not merely 'uniform' ones. This precise wording distinction is directly tested." },
    { wrong: "\"An asset with a positive payoff during bad times should have a high expected return, since it's valuable.\"", right: "The opposite — an asset with a positive payoff in bad times is valuable PRECISELY because it's a hedge, so investors bid its price up and its expected return DOWN. Valuable assets have low risk premiums." },
    { wrong: "\"Losses during any market downturn are automatically 'bad times' losses deserving compensation.\"", right: "Bad times must be carefully defined relative to the INVESTOR — an investor who is short the market benefits, not loses, during a market downturn, so a downturn isn't universally 'bad times' for every investor." }
  ],

  highYield: [
    { stars: 5, what: "CAPM's six lessons, especially 'valuable assets have low risk premiums' and the beta-risk-premium relationship.", why: "The foundational conceptual framework this entire book's factor lens is built on." },
    { stars: 5, what: "Seven CAPM shortcomings — know all seven individually, especially the frictionless-markets and homogeneous-expectations assumptions.", why: "A precise, frequently individually-tested list." },
    { stars: 4, what: "Factor theory's three core principles, and the assets-vs-factors distinction (corporate bonds/PE/hedge funds are NOT factors).", why: "A foundational conceptual distinction, frequently tested with 'which of the following is NOT a factor' format." },
    { stars: 3, what: "Stochastic discount factor / pricing kernel concept and its generalization of CAPM's linear assumption.", why: "Bridges CAPM to multifactor models — a valuable synthesis concept." },
    { stars: 3, what: "EMH, the Grossman-Stiglitz paradox, and rational vs. behavioral explanations for anomalies.", why: "Sets up R83's alpha discussion and the value/momentum explanations in R82." }
  ],

  recall: [
    { q: "Why are hedge funds not considered a 'factor' in factor theory, even though they clearly carry risk?", a: "Hedge funds are an ASSET (or asset category) that BUNDLES multiple underlying factor exposures — equity risk, interest rate risk, volatility risk, default risk, and more — rather than representing a single, distinct risk factor themselves. Only things like the market portfolio represent a factor directly." },
    { q: "During the 2007-09 crisis, certain safe-haven assets (gold, government bonds) had negative expected returns — investors paid to hold them. Explain this using CAPM's sixth lesson.", a: "CAPM's sixth lesson states that valuable assets — those with positive payoffs during bad times — command LOW (or even negative) risk premiums, because investors are willing to accept lower returns in exchange for the hedge these assets provide against bad-times losses. Safe havens performing well exactly when the broader market crashed made them extremely valuable, bidding their prices up and their expected returns down to negative." },
    { q: "Explain the CAPM assumption violated when large institutional investors trade on private information and move market prices with their trades.", a: "This violates the 'all investors are price takers' assumption — CAPM assumes no single investor's trades affect market prices, but in reality, large institutional investors are often price SETTERS, not price takers, especially when trading on special/private knowledge." },
    { q: "What is the Grossman-Stiglitz paradox, and why does it complicate the claim that markets are efficient with costless information?", a: "If information were truly costless and prices already fully reflected all information, there would be no incentive for anyone to actually collect that information (since it provides no edge). But if no one collects information, it CANNOT be reflected in prices, contradicting the premise of full informational efficiency — a circular, self-undermining argument that complicates the pure costless-information efficient market claim." }
  ],

  hooks: [
    { title: "Bundles, not building blocks", text: "Think of every complex asset (a hedge fund, a corporate bond, private equity) as a gift basket — inside is a bundle of factor exposures (equity, rate, vol, default risk). The 'factor' is what's inside the basket, never the basket itself." },
    { title: "Valuable = cheap risk premium", text: "The single most counter-intuitive CAPM lesson: an asset that pays off when everything else is burning is VALUABLE — so valuable investors bid its price up and accept a low (even negative) return to own it. Value and risk premium move in opposite directions for a genuine hedge." },
    { title: "The paradox that eats its own tail", text: "If information is truly free, nobody bothers to gather it. If nobody gathers it, prices can't reflect it. Grossman-Stiglitz shows perfectly efficient markets are logically self-defeating — a small dose of inefficiency is what PAYS people to make markets efficient in the first place." }
  ],

  summary: `<p><strong>Factor theory</strong>: factors (not assets) earn risk premiums; assets are bundles of factors; investors have differing optimal factor exposures. <strong>CAPM</strong> (single factor, market beta): six lessons — hold the factor, own optimal exposure, average investor=100% market, factor risk must be rewarded, risk=beta, valuable (bad-times-payoff) assets have LOW premiums. Seven shortcomings: financial-wealth-only, mean-variance utility, single-period horizon, homogeneous expectations, frictionless markets (NO taxes/costs, not uniform), price-taking, free information. <strong>Multifactor models</strong> (e.g., APT) generalize to multiple factors; the <strong>SDF/pricing kernel</strong> (m) generalizes further, allowing nonlinear bad-times indexing — CAPM is the linear special case. <strong>EMH</strong>: speculative trading is costly, active managers can't generally beat the market, but EMH still identifies exploitable inefficiencies; Grossman-Stiglitz paradox questions truly costless information.</p>`
});
