export default ({
  book: 5, reading: 81,
  session: "Risk Management and Investment Management",
  title: "Factor Theory",
  tagline: "It is not exposure to an asset that is rewarded — it is exposure to the underlying factors. Assets are bundles of factor risks, and factor risk premiums pay you for bearing losses in bad times.",

  teaches: `<p>Factor theory's three principles, the CAPM (assumptions, six implications, seven shortcomings), multifactor models, the stochastic discount factor (pricing kernel), and efficient market theory.</p>`,

  why: `<p>This reading reframes everything: risk premiums aren't rewards for holding specific assets, they're compensation for exposure to underlying FACTOR risks — exposures to "bad times." This lens reframes every later Book 5 reading: factors (R82), alpha (R83), portfolio construction (R84), and even performance evaluation (R88) all build on "what factor exposure am I actually being paid for?"</p>`,

  intuition: `<p>Start with the vocabulary. A <strong>factor</strong> is a source of systematic (undiversifiable) risk that many assets are simultaneously exposed to — the market portfolio itself, interest rates, an investing style like value/growth or momentum, or a macroeconomic driver like inflation or GDP growth. A <strong>risk premium</strong> is the extra expected return investors demand, above the risk-free rate, for bearing exposure to a factor. Factor theory ties these together with one idea: factor risks are exposures to <em>bad times</em> — states of the world where losses hurt disproportionately (a recession, a market crash, a spike in inflation) — and investors must be compensated with a risk premium for bearing that exposure.</p>
  <p>Three principles anchor factor theory: (1) <strong>factors are important, not assets</strong> — it is not exposure to a specific asset that earns a return, it's exposure to the underlying risk factor(s) buried inside that asset, so investors must "look through" the asset to see what it's really exposed to; (2) <strong>assets represent bundles of factors</strong> — most complex assets are containers holding several factor exposures at once. Concretely: a corporate bond bundles interest rate risk (like a government bond), PLUS default/credit risk, PLUS (because equity and debt are linked through the firm's capital structure) some equity-like risk. A hedge fund or private equity stake similarly bundles equity risk, interest rate risk, volatility risk, and default risk together in one wrapper. By contrast, some assets — the market portfolio itself, and arguably equities and government bonds — can be thought of as factors in their own right, not bundles of something else; (3) <strong>investors have differing optimal risk exposures</strong> — two investors can rationally want different amounts of exposure to the very same factor (e.g., volatility), because they differ in how well they can personally absorb losses during bad times (a young worker with a stable salary vs. a retiree living off portfolio income, for instance).</p>
  <p>The CAPM is the simplest possible factor model: it declares that there is exactly ONE priced factor — the market portfolio — and prices every asset's risk purely via that asset's beta (its co-movement with the market). Its six lessons, worked through below, are: hold the factor not the asset, investors have differing optimal exposures, the average investor holds 100% of the market, factor risk exposure must be rewarded, risk is measured as beta, and valuable assets (positive payoff in bad times) have LOW risk premiums. But CAPM rests on seven unrealistic assumptions (financial-wealth-only, mean-variance utility, single-period horizon, homogeneous expectations, frictionless markets, price-taking, free information) that all fail to hold in the real world to varying degrees. Multifactor models relax the single-factor assumption by adding more priced factors (e.g., economic growth, inflation, consumption), and the stochastic discount factor (SDF/pricing kernel) generalizes further still by allowing the "index of bad times" to be a nonlinear function of many factors simultaneously, rather than forcing it to move in lockstep with just the market return.</p>`,

  eli5: `<p>Imagine you're buying fruit baskets instead of individual pieces of fruit. One basket ("corporate bond") has a mix of apples (equity-like risk), a banana (interest-rate risk), and a mango that spoils fast (default risk) all bundled together — you're not really "buying a basket," you're buying exposure to apples, bananas, and mangoes, and the price you pay depends on how much of each risky fruit is inside, not on the basket's label. A single, plain apple ("the market portfolio") is the simplest case — nothing to unbundle, just one fruit, one risk. And crucially, some people are happy paying extra for a fruit that stays fresh even during a bad harvest (a "valuable, bad-times fruit"), while others don't care as much — different shoppers want different amounts of "harvest insurance" built into their baskets. <strong>In finance terms: assets are bundles of factor risks, not factors themselves; the market portfolio is the simplest single factor; and investors pay a risk premium for factor exposure that varies with how well that factor protects them (or fails to) during bad economic times.</strong></p>`,

  thinkLike: `<p>A risk manager or portfolio strategist trained in factor theory never asks "should I buy this asset?" in isolation — they ask "what bundle of factor exposures am I buying, and am I being adequately paid for each one?" Before adding a corporate bond, a hedge fund allocation, or a private equity stake to a portfolio, the practitioner decomposes it: how much of this position's risk is really equity risk I already have elsewhere, how much is interest-rate risk I could get more cheaply from a Treasury future, how much is genuine default/credit risk unique to this position? If two positions look different on the surface but load on the same underlying factors, they are NOT truly diversifying each other — a classic exam trap is treating "different asset classes" as automatically diversifying, when in fact they may share heavy exposure to the same macro factor (e.g., both a high-yield bond fund and an equity-heavy hedge fund are loaded with market/equity-risk exposure during a downturn).</p>
  <p>On the CAPM specifically, GARP loves to test the precise WORDING of its assumptions and lessons: "frictionless markets" means literally NO taxes/costs, not "uniform" taxes/costs; "valuable assets have low risk premiums" is routinely tested with a numerical or conceptual flip-the-sign trap (students instinctively think "pays off well in bad times = risky = high return," when it's the opposite — it's a hedge, so it's priced UP and its expected return is priced DOWN). The examiner also loves catching students who assume every downturn is universally "bad times" — remind yourself bad times must be defined relative to the specific investor and their specific exposure (a short-seller loves a crash).</p>`,

  visual: `<div class="widget" data-widget="frontier"></div>`,

  formulas: [
    {
      name: "Beta (factor exposure)",
      math: "\\beta_{i} = \\dfrac{cov(R_{i},\\,R_M)}{var(R_M)}",
      note: "Beta measures how much of an asset's risk is systematic (market-driven) versus idiosyncratic (firm-specific, diversifiable). Higher covariance with the market → higher beta.",
      plain: "Beta rescales an asset's co-movement with the market by the market's own variance, giving a single number for how sensitive the asset's return is to market-wide swings.",
      derivation: "<p>Beta is defined purely as a covariance-to-variance ratio:</p>\\[\\beta_{i} = \\dfrac{cov(R_{i},\\,R_M)}{var(R_M)}\\]<p>Intuitively, \\(cov(R_{i},R_M)\\) captures how much asset \\(i\\)'s return tends to move together with the market's return, while dividing by \\(var(R_M)\\) standardizes this against how much the market itself moves. The result: \\(\\beta_{i}=1\\) means the asset moves one-for-one with the market on average; \\(\\beta_{i}>1\\) amplifies market moves; \\(\\beta_{i}<1\\) (or negative) dampens or offsets them.</p>"
    },
    {
      name: "CAPM security market line",
      math: "E(R_{i}) = R_F + \\beta_{i}\\times [E(R_M)-R_F]",
      note: "Higher beta → higher required return (compensation for bad-times risk, since \\(E(R_M)-R_F\\) is the market risk premium).",
      plain: "This formula says an asset's expected return equals the risk-free rate plus its beta multiplied by the market's risk premium — the more an asset shares the market's bad-times pain (higher beta), the more expected return it must offer to compensate."
    },
    {
      name: "Capital market line (CML) — equilibrium market risk premium",
      math: "E(R_M) - R_F = \\bar{A}\\times \\sigma^2_M",
      note: "\\(\\bar{A}\\) = the average investor's risk aversion; \\(\\sigma^2_M\\) = the market portfolio's variance. As the average investor's risk aversion rises, or market volatility rises, the equilibrium risk premium rises too.",
      plain: "The market's risk premium is simply the average investor's risk aversion multiplied by how volatile the market is — more risk-averse investors, or a more volatile market, both demand a bigger reward for holding the market portfolio."
    },
    {
      name: "Stochastic discount factor (SDF) — single-factor (CAPM special case)",
      math: "m = a + b\\,R_M",
      note: "m is 'an index of bad times' — high when the marginal utility of an extra dollar is high (job loss, low GDP growth, low consumption below past consumption).",
      plain: "This says the pricing kernel m is a straight linear function of the market return alone — the CAPM's restrictive special case of the more general SDF idea.",
      derivation: "<p>The general multifactor pricing kernel allows m to depend on several factors \\(f_1, f_2, \\dots, f_k\\), each representing a different flavor of bad times (inflation, GDP growth, consumption, the market):</p>\\[m = m(f_1, f_2, \\dots, f_k)\\]<p>The CAPM restricts this to a single factor, the market return, and forces the relationship to be exactly linear:</p>\\[m = a + b\\,R_M\\]<p>where \\(a\\) and \\(b\\) are constants. This linearity is precisely the CAPM's weak point — the SDF framework generalizes by permitting m to be any (possibly nonlinear) function of many bad-times factors at once.</p>"
    },
    {
      name: "Asset risk premium via SDF beta",
      math: "E(R_{i}) - R_F = -\\beta_{i,m}\\times \\lambda_m",
      note: "\\(\\beta_{i,m} = \\dfrac{cov(R_{i},\\,m)}{var(m)}\\); \\(\\lambda_m\\) is the price of 'bad-times' risk. The negative sign: assets with a positive payoff in bad times (high \\(cov(R_{i},m)\\)) have LOW or negative risk premiums.",
      plain: "An asset's risk premium is minus its beta with the bad-times index m, times the market price of bad-times risk — so an asset that pays off well exactly when times are bad (high covariance with m, since m itself is high in bad times) earns a lower, not higher, expected return.",
      derivation: "<p>Starting from the SDF pricing equation, an asset's price today equals the expected value of its future payoff discounted by m:</p>\\[P_{i} = E[m\\times \\text{Payoff}_{i}]\\]<p>Dividing through by the asset's current price and rearranging (as in a traditional discount-rate model, where the discount rate itself is normally set by the CAPM) yields a risk premium expression driven by the asset's covariance with m rather than its covariance with \\(R_M\\):</p>\\[\\beta_{i,m} = \\dfrac{cov(R_{i},\\,m)}{var(m)}\\]\\[E(R_{i}) - R_F = -\\beta_{i,m}\\times \\lambda_m\\]<p>Because m is high exactly when times are bad (high marginal utility of a dollar), an asset with a positive payoff in bad times has a positive \\(cov(R_{i},m)\\) — and the minus sign in front of \\(\\beta_{i,m}\\) turns that into a LOW or negative risk premium, exactly matching CAPM Lesson 6 in the more general SDF language.</p>"
    }
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
      def: "The capital asset pricing model (CAPM) describes an asset not in isolation but relative to the market: the relevant risk measure is the asset's covariance with the market portfolio (its beta), not its own standalone volatility. It is a single-factor model — the market portfolio is the only priced factor, and risk premiums are set entirely by beta. Six lessons follow. (1) Hold the factor (market portfolio), not individual assets — diversification removes idiosyncratic (firm-specific) risk, leaving only systematic (market) risk, which is what actually earns a premium; investors keep diversifying until they hold the market portfolio itself, the maximum-Sharpe-ratio (mean-variance efficient, MVE) combination of risky assets. (2) Investors have their own optimal factor exposures via the capital allocation line (CAL) — every investor holds the same risky MVE market portfolio, but mixes it with the risk-free asset in different proportions depending on their own risk aversion. (3) The average investor is 100% invested in the market (the tangency point of the CAL and the efficient frontier) — an investor with average risk aversion holds no risk-free asset at all, holding purely the market portfolio. (4) Exposure to factor risk must be rewarded — once every investor holds the same risky portfolio, the CAL becomes the capital market line (CML) in equilibrium, and the market risk premium equals the average investor's risk aversion multiplied by the market portfolio's variance: \\(E(R_M)-R_F = \\bar{A}\\sigma^2_M\\). (5) Risk is measured as beta exposure — an individual asset's required return follows the security market line, \\(E(R_{i}) = R_F + \\beta_{i}[E(R_M)-R_F]\\), so higher beta (more co-movement with the market, i.e., less diversification benefit) means investors demand a higher expected return. (6) Valuable assets (positive payoff in bad times, i.e., low or negative beta) have LOW risk premiums — since bad times under CAPM are simply defined as periods of low market returns, an asset that does well precisely when the market is doing badly is a hedge, and investors are willing to accept a lower return to own that insurance-like payoff.",
      example: "During the 2007-09 financial crisis, safe havens (gold, government bonds) became so attractive — because they held or gained value exactly as equity markets crashed — that some had NEGATIVE expected returns: investors literally paid to hold them, the ultimate 'low risk premium for a valuable (bad-times-payoff, low/negative-beta) asset' illustration of Lesson 6.",
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
      pitfall: "Assets with a POSITIVE payoff in bad times are valuable (high price, low/negative expected return) — the SDF-beta relationship inverts the usual sign, since it's measuring \\(cov(R_{i},m)\\), not \\(cov(R_{i},R_M)\\) directly.",
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
      { what: "CAPM beta vs SDF beta sign convention", how: "Standard CAPM: higher beta (more market co-movement) → higher required return. SDF framing: higher \\(cov(R_{i},m)\\) (better payoff in bad times) → LOWER required return — same underlying idea, opposite-looking sign because m indexes 'bad times,' not the market directly." }
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

  breakdown: [
    {
      title: "Factor theory's three principles",
      points: [
        "Factors are important, not assets — exposure to a specific asset is not what's rewarded; investors must look through the asset to its underlying risk factor exposures.",
        "Assets represent bundles of factors — most assets (corporate bonds, private equity, hedge funds) bundle multiple factor exposures (equity, interest rate, volatility, default risk); some assets (the market, arguably equities/government bonds) can be thought of as factors themselves.",
        "Investors have differing optimal risk exposures — different investors want different amounts of exposure to the same factor (e.g., volatility) based on how well they can personally withstand bad times."
      ]
    },
    {
      title: "The CAPM's six lessons",
      points: [
        "Hold the factor, not the individual asset — diversify until only systematic (market) risk remains.",
        "Investors have their own optimal factor risk exposures — via the capital allocation line (CAL), mixing the risk-free asset and the market portfolio.",
        "The average investor is fully invested in the market — the tangency point of the CAL and efficient frontier.",
        "Exposure to factor risk must be rewarded — the market risk premium via the capital market line (CML), equal to average risk aversion times market variance.",
        "Risk is measured as beta exposure — higher beta means a higher required return via the security market line.",
        "Valuable assets have low risk premiums — assets with a positive payoff in bad times (low/negative beta) are hedges, so investors accept lower returns to hold them."
      ]
    },
    {
      title: "Seven shortcomings (unrealistic assumptions) of the CAPM",
      points: [
        "Investors only have financial wealth — ignores human capital / labor income risk, which is itself a factor.",
        "Investors have mean-variance (symmetric) utility — ignores that investors dislike losses more than they like equivalent gains (loss aversion / downside risk).",
        "Investors have a single-period investment horizon — ignores that long-term investors rebalance, a genuinely multi-period strategy.",
        "Investors have homogeneous (identical) expectations — in reality investors disagree, producing departures from CAPM.",
        "Markets are frictionless (no taxes or transaction costs) — real markets have costs, and trading restrictions (e.g., short-sale bans) can prevent investors from acting on their true beliefs.",
        "All investors are price takers — large institutional investors are often price setters, moving markets with their trades.",
        "Information is free and available to everyone — in reality information is often costly and unevenly available."
      ]
    },
    {
      title: "Six lessons of multifactor models (parallel to CAPM's six)",
      points: [
        "Diversification is beneficial — the tradable version of each factor removes idiosyncratic risk, just as the market does in CAPM.",
        "Investors have optimal exposures — to each priced factor, not just the market.",
        "The average investor holds the market portfolio — true under both CAPM and multifactor models.",
        "Exposure to factor risk must be rewarded — each factor carries its own risk premium under no-arbitrage / equilibrium.",
        "Risk is measured by factor betas — an asset's risk is its vector of exposures across all priced factors, not a single market beta.",
        "Valuable assets have low risk premiums — assets with a positive payoff in bad times (across any of the factors) remain attractive and low-premium, generalizing CAPM's Lesson 6."
      ]
    }
  ],

  quiz: [
    {
      q: "Which of the following would least likely meet the definition of a 'factor' under factor theory?",
      options: ["The market portfolio", "Momentum investing style", "Hedge funds", "Volatility"],
      answer: 2,
      why: "Hedge funds are an asset category that CONTAINS multiple factor exposures (equity, rate, volatility, default risk) — they are not a factor themselves. The market, momentum style, and volatility are all genuine factors. This is the exact framing GARP uses to test the assets-vs-factors distinction."
    },
    {
      q: "According to CAPM's sixth lesson, an asset that reliably delivers a positive payoff during 'bad times' (periods of low market returns) should have:",
      options: ["A high risk premium, because bad-times payoffs are valuable", "A low or even negative risk premium, because it functions as a hedge", "A risk premium unrelated to its bad-times payoff, since only beta matters", "The same risk premium as the market portfolio"],
      answer: 1,
      why: "This is the most counter-intuitive and most-tested CAPM lesson: a positive bad-times payoff makes the asset valuable as insurance, so investors bid its price UP and its expected return DOWN. The 'high risk premium' answer is the tempting distractor — it reverses cause and effect: payoff-in-bad-times correlates with LOW beta and LOW premium, not high."
    },
    {
      q: "An asset has cov(R_i, R_M) = 0.032 and the market variance is 0.04. The risk-free rate is 3% and the market risk premium is 6%. What is the asset's CAPM-required expected return?",
      options: ["6.0%", "7.8%", "9.0%", "12.0%"],
      answer: 1,
      why: "Beta = cov/var = 0.032/0.04 = 0.8. Required return = R_F + beta × market risk premium = 3% + 0.8 × 6% = 3% + 4.8% = 7.8%. The tempting distractor 9.0% = 3% + 6% skips beta-weighting entirely (implicitly assuming beta = 1); always compute beta = cov/var first, then apply the security market line, rather than adding the raw market premium to the risk-free rate."
    },
    {
      q: "Which CAPM assumption is most directly violated when a large pension fund's trade of a thinly-traded bond visibly moves that bond's market price?",
      options: ["Homogeneous expectations", "Mean-variance utility", "All investors are price takers", "Frictionless markets"],
      answer: 2,
      why: "CAPM assumes no single investor's trading affects prices (price-taking). A large trade that visibly moves the price makes that investor a price SETTER, directly violating this assumption. The 'frictionless markets' answer concerns taxes/transaction costs, a different assumption, and is the most common wrong pick because both sound like generic 'market imperfections.'"
    },
    {
      q: "Which statement correctly describes the CAPM's frictionless-markets assumption?",
      options: ["Taxes and transaction costs are uniform across all investors", "There are no taxes or transaction costs at all", "Transaction costs exist but are fully rebated to investors", "Taxes exist only for institutional investors"],
      answer: 1,
      why: "CAPM assumes markets are completely frictionless — NO taxes or transaction costs, not merely 'uniform' ones. The 'taxes and transaction costs are uniform across all investors' answer is the classic exam distractor: students conflate 'no frictions' with 'the same frictions for everyone,' but the CAPM assumption is stronger — frictions are assumed to not exist at all."
    },
    {
      q: "The Grossman-Stiglitz paradox highlights a logical problem with which claim?",
      options: ["That active managers can never beat the market", "That information is costless and prices fully reflect it", "That the CAPM's beta fully captures systematic risk", "That multifactor models generalize the CAPM"],
      answer: 1,
      why: "The paradox: if information is truly costless and prices already reflect everything, no one has an incentive to collect information — but if no one collects it, prices cannot actually reflect it. This directly undermines the claim of costless, fully efficient information, not the other listed ideas (which are separate CAPM/multifactor concepts entirely)."
    }
  ],

  sources: [
    { title: "Capital asset pricing model (CAPM) — Wikipedia", url: "https://en.wikipedia.org/wiki/Capital_asset_pricing_model", note: "Background on the CAPM's derivation, assumptions, and the security market line formula used in this reading." },
    { title: "Arbitrage pricing theory — Wikipedia", url: "https://en.wikipedia.org/wiki/Arbitrage_pricing_theory", note: "Overview of APT, the multifactor model referenced as an early generalization of the CAPM and an early efficient market theory." },
    { title: "Stochastic discount factor — Wikipedia", url: "https://en.wikipedia.org/wiki/Stochastic_discount_factor", note: "Explains the pricing kernel / SDF concept (the m variable) used to generalize CAPM to nonlinear, multi-factor 'bad times' indexing." },
    { title: "Efficient-market hypothesis — Wikipedia", url: "https://en.wikipedia.org/wiki/Efficient-market_hypothesis", note: "Background on EMH and the Grossman-Stiglitz critique of costless information discussed in this reading's final section." }
  ],

  pdf: { book: 5, query: "it is easiest to think of assets as bundles of" },

  summary: `<p><strong>Factor theory</strong>: factors (not assets) earn risk premiums; assets are bundles of factors; investors have differing optimal factor exposures. <strong>CAPM</strong> (single factor, market beta): six lessons — hold the factor, own optimal exposure, average investor=100% market, factor risk must be rewarded, risk=beta, valuable (bad-times-payoff) assets have LOW premiums. Seven shortcomings: financial-wealth-only, mean-variance utility, single-period horizon, homogeneous expectations, frictionless markets (NO taxes/costs, not uniform), price-taking, free information. <strong>Multifactor models</strong> (e.g., APT) generalize to multiple factors; the <strong>SDF/pricing kernel</strong> (m) generalizes further, allowing nonlinear bad-times indexing — CAPM is the linear special case. <strong>EMH</strong>: speculative trading is costly, active managers can't generally beat the market, but EMH still identifies exploitable inefficiencies; Grossman-Stiglitz paradox questions truly costless information.</p>`
});
