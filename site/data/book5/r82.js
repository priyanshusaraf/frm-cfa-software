FRM.register({
  book: 5, reading: 82,
  session: "Risk Management and Investment Management",
  title: "Factors",
  tagline: "The named, tradeable factors: value, size, momentum, and the macro factors (growth, inflation, volatility) — with rational and behavioral stories for each.",

  teaches: `<p>Value investing and the book-to-market ratio, macroeconomic factors (economic growth, inflation, volatility) and how they drive returns, managing volatility risk, the Fama-French three-factor model, and value vs. momentum investing strategies (including the disappearing size premium).</p>`,

  why: `<p>These are the concrete, tradeable versions of R81's abstract factor theory. Understanding which factors are genuinely persistent (value, momentum) vs. which disappeared after discovery (size) — and why — is central to evaluating any factor-based investment claim.</p>`,

  intuition: `<p>Value stocks (high book-to-market) have significantly outperformed growth stocks (low book-to-market) for 50+ years — with two competing explanations. RATIONAL: value firms have high, ASYMMETRIC adjustment costs (fixed assets, can't redeploy capital when times change) making them fundamentally riskier — the premium compensates for this. BEHAVIORAL: investors OVEREXTRAPOLATE growth stocks' past growth into the future (bidding growth stocks up too high) while being LOSS-AVERSE about value stocks' past poor performance (bidding them down too low) — value stocks are simply cheap, not riskier.</p>
  <p>The SIZE effect (small stocks outperform large, after beta-adjustment) DISAPPEARED after its discovery (Banz/Reinganum 1981) — two explanations: data mining (the original finding was an in-sample fluke) or investor action (rational investors bid up small-cap prices until the anomaly vanished, consistent with EMH). Momentum (buy past winners, short past losers) vastly outperforms value and size — but is PRONE TO CRASHES, because momentum is a positive-feedback (destabilizing) strategy, while value is a negative-feedback (stabilizing) strategy.</p>`,

  visual: `<div class="widget" data-widget="frontier"></div>`,

  formulas: [
    { name: "Fama-French three-factor model", math: "E(R_{i})-R_F = \\beta_{i},MKT\\times [E(R_M)-R_F] + \\beta_{i},SMB\\times E(SMB) + \\beta_{i},HML\\times E(HML)", note: "MKT=market, SMB=small-minus-big (size), HML=high-minus-low book-to-market (value)." },
    { name: "Momentum-augmented (four-factor) model", math: "adds \\beta_{i},WML\\times E(WML)", note: "WML='winners minus losers' (also UMD, 'up minus down'). Momentum premium far exceeds SMB/HML historically but crashes hard." },
    { name: "Expected market risk premium and volatility", math: "E(R_M)-R_F = (risk aversion) \\times \\sigma^{2}_M (approximately)", note: "Coefficient estimated as positive, negative, or zero across studies — theoretically positive, empirically ambiguous." }
  ],

  concepts: [
    {
      name: "Value investing and the value premium",
      def: "Book value/share = (total assets − total liabilities)/shares outstanding. Value stocks: high book-to-market ratio. Growth stocks: low book-to-market ratio. A value-growth strategy is long value, short growth.",
      pitfall: "Rational explanation: value firms have high, ASYMMETRIC adjustment costs (fixed, non-redeployable capital) making them fundamentally riskier — the value premium is compensation for losses in 'bad times' specifically defined by labor income risk, investment growth, luxury consumption, long-run consumption risk, housing risk. Behavioral explanation: overextrapolation (investors assume past growth continues, bidding growth stocks too high) + loss aversion/mental accounting (investors view value stocks' past poor performance as risky, bidding them too low) — value stocks are simply CHEAP, not objectively riskier.",
      related: [{ r: 83, label: "R83 — alpha as excess return after accounting for factor exposures like value" }],
      memory: "Rational: value stocks ARE riskier (can't adapt). Behavioral: value stocks just LOOK cheap (investors overextrapolate growth, overreact to value's past losses)."
    },
    {
      name: "Macroeconomic factors",
      def: "Economic growth, inflation, and volatility are the three most important macro factors. It's the SHOCK (unanticipated change), not the level, that moves asset prices.",
      example: "Recessions: government/IG bonds outperform (~12.3-12.6%), equities/high-yield underperform. Expansions: equities outperform (large stocks 12.4%, small stocks 16.8%). High-yield bonds are relatively INDIFFERENT to the growth cycle (7.4% recession vs 7.7% expansion). High inflation hurts BOTH stocks and bonds; volatility (VIX) is negatively correlated with stock returns (~−0.39) via the LEVERAGE EFFECT (falling equity value + stable debt → higher leverage → riskier equity → lower prices) plus a discount-rate channel (CAPM: higher vol → higher required return → lower current price).",
      pitfall: "High-yield bonds are the ONE asset class shown to be roughly indifferent to the economic growth cycle — a frequently tested exception to the 'stocks up in growth, bonds up in recession' pattern.",
      related: [],
      memory: "It's the SURPRISE, not the level — inflation at a stable 5% is priced in; an unexpected jump to 5% from 2% is what moves markets."
    },
    {
      name: "Managing volatility risk",
      def: "Two approaches: (1) invest in less volatile assets (bonds) — though bonds are NOT a perfect safe haven (VIX-bond correlation only ~0.12, and 2007-09 showed both bonds and stocks can fall together under a volatility shock); (2) buy volatility protection (out-of-the-money put options).",
      pitfall: "Volatility has a NEGATIVE risk premium — unlike most assets, where a long position earns a positive expected return, collecting the volatility premium requires SELLING volatility (selling puts). Realized volatility is lower on average than VIX-implied volatility by ~2-3%, meaning options are 'expensive' on average and volatility sellers profit — until a crash, when losses can be catastrophic (the volatility index fell ~70% Sept-Nov 2008; full-sample skewness −8.26 vs. −0.37 excluding the crisis).",
      related: [],
      memory: "Selling volatility is like selling insurance — steady premium income for years, then one catastrophic payout that can wipe out everything you collected."
    },
    {
      name: "Fama-French three-factor model",
      def: "Adds SMB (size: small-minus-big) and HML (value: high-minus-low book-to-market) to the CAPM's market factor.",
      pitfall: "In CAPM, average stock beta = market beta = 1. In Fama-French, HML and SMB betas are CENTERED ON ZERO — the average investor (holding the market with no size/value tilt) earns just the market return; investors must specifically CHOOSE a value or size tilt to capture those premiums.",
      related: ["Value investing and the value premium"],
      memory: "Market beta centers on 1; HML/SMB betas center on 0 — you have to actively tilt to capture size/value premiums, unlike market exposure which everyone gets by default."
    },
    {
      name: "The disappearing size effect",
      def: "Small stocks outperforming large (beta-adjusted) was discovered by Banz (1981) and Reinganum (1981) — but the effect DISAPPEARED after publication (peaked early 1980s, no subsequent premium).",
      example: "Two explanations: (1) Data mining — Fischer Black (1993) suggested the original in-sample finding wasn't substantiated out-of-sample. (2) Investor action — rational investors, per the EMH, bid up small-cap prices until the anomaly was arbitraged away.",
      pitfall: "Small stocks DO still tend to have somewhat higher returns (a 'weak' size effect), partly due to lower liquidity — but the RISK-ADJUSTED excess return over the market is no longer present. Don't confuse 'weak residual size effect' with 'the SMB premium is alive and well.'",
      related: [],
      memory: "The size premium is the cautionary tale: discover an anomaly, publish it, and (per EMH) watch it get arbitraged away."
    },
    {
      name: "Momentum investing",
      def: "Buy past 'winners,' short past 'losers' (typically over ~6 months) — WML ('winners minus losers') or UMD ('up minus down'). Discovered by Jegadeesh and Titman (1993), the same year as Fama-French.",
      example: "Momentum returns VASTLY exceed value and size premiums historically ($1 → >$60 peak) — but crashed >50% in 2007-09, correlation with the value premium only ≈−0.16 (not simply 'opposite').",
      pitfall: "Value is a NEGATIVE feedback (stabilizing) strategy — fallen stocks eventually become cheap enough to attract value buyers, pushing prices back up. Momentum is a POSITIVE feedback (destabilizing) strategy — rising stocks attract more buyers, pushing prices up further, which is exactly why momentum crashes (11 on record: 7 in the 1930s Depression, 3 in 2007-09, 1 in 2001) — often triggered by POLICY INTERVENTION (e.g., government bailouts putting a floor under 'losers' that momentum investors were short).",
      related: [{ r: 63, label: "R63 — positive/negative feedback trading, the same concept in a liquidity context" }],
      memory: "Value stabilizes (buy low after a fall). Momentum destabilizes (buy high, sell higher) — and destabilizing strategies are the ones that crash."
    }
  ],

  connections: {
    from: [
      { r: 81, why: "Applies factor theory's abstract framework to concrete, named, tradeable factors." },
      { r: 63, why: "Positive/negative feedback trading dynamics from Book 4's liquidity black holes reappear as momentum/value's stabilizing/destabilizing character." }
    ],
    to: [
      { r: 83, why: "Alpha is measured net of exactly these factor exposures (market, size, value, momentum)." },
      { r: 89, why: "Hedge fund strategies are frequently just repackaged exposures to these same named factors." }
    ],
    confused: [
      { what: "Rational vs behavioral explanation of the value premium", how: "Rational: value stocks are genuinely RISKIER (high asymmetric adjustment costs) — the premium is fair compensation. Behavioral: value stocks are just CHEAP (investors overextrapolate growth, overreact to value's past losses) — no extra objective risk, just mispricing." },
      { what: "Size effect (disappeared) vs value/momentum effects (persistent)", how: "Size premium vanished after discovery (data mining or arbitraged away); value and momentum premiums have persisted for 50+ years despite being well-known — a key empirical contrast." },
      { what: "Value (negative feedback, stabilizing) vs momentum (positive feedback, destabilizing)", how: "Value strategies push prices back toward fair value (stabilizing); momentum strategies push prices further from fair value (destabilizing, crash-prone)." }
    ]
  },

  misconceptions: [
    { wrong: "\"High-yield bonds behave like other bonds, outperforming during recessions.\"", right: "High-yield bond returns are relatively INDIFFERENT to the economic growth cycle (7.4% recession vs. 7.7% expansion) — unlike government/IG bonds which clearly outperform in recessions." },
    { wrong: "\"Selling volatility (e.g., selling out-of-the-money puts) is generally a losing strategy since options are a form of insurance.\"", right: "Volatility has a NEGATIVE risk premium — sellers collect steady premium income on average (realized vol < implied vol by ~2-3%), profiting in normal times, but face catastrophic losses during crashes. It's a viable strategy only for investors who can tolerate rare, severe losses." },
    { wrong: "\"The small-cap size premium remains a robust, exploitable anomaly today.\"", right: "The size premium effectively DISAPPEARED after its discovery (Banz/Reinganum, 1981) — either due to data mining in the original study or investors arbitraging it away, consistent with EMH. Small stocks show only a weak residual return premium, largely attributable to illiquidity, not a robust risk-adjusted anomaly." },
    { wrong: "\"Momentum and value are simply opposite strategies (a negative correlation close to -1).\"", right: "Their return correlation is only about −0.16 — they're stabilizing vs. destabilizing in FEEDBACK MECHANISM, but not simply mirror-image return streams." }
  ],

  highYield: [
    { stars: 5, what: "Value premium: rational (higher risk, asymmetric adjustment costs) vs. behavioral (overextrapolation + loss aversion) explanations.", why: "The signature conceptual debate of this reading, frequently tested for which explanation matches a described scenario." },
    { stars: 5, what: "Momentum's positive-feedback/destabilizing nature vs. value's negative-feedback/stabilizing nature, and momentum's crash-proneness.", why: "A precise, richly-tested conceptual contrast connecting to Book 4's feedback-trading theme." },
    { stars: 4, what: "The disappearing size effect and its two explanations (data mining vs. investor arbitrage).", why: "A classic empirical-finance cautionary tale, frequently tested." },
    { stars: 4, what: "Fama-French three-factor model: MKT/SMB/HML, and betas centered on zero (not one) for SMB/HML.", why: "The core quantitative model of this reading." },
    { stars: 3, what: "Volatility's negative risk premium and the 'selling insurance' framing.", why: "A vivid, well-explained mechanism worth remembering via the insurance analogy." },
    { stars: 3, what: "High-yield bonds' indifference to the economic growth cycle.", why: "A specific, easily-tested exception to the general stocks-vs-bonds cyclicality pattern." }
  ],

  recall: [
    { q: "Explain the two competing explanations for why the value premium exists, and how they differ in their view of value stocks' underlying riskiness.", a: "Rational explanation: value stocks are genuinely riskier because value firms have high, asymmetric adjustment costs (fixed capital that can't be redeployed when conditions change) — the premium is fair compensation for bearing this real risk in bad times. Behavioral explanation: value stocks are NOT objectively riskier — investors simply overextrapolate growth stocks' past growth (bidding them up too high) while being loss-averse about value stocks' past poor performance (bidding them down too low), making value stocks cheap relative to fundamentals rather than genuinely risky." },
    { q: "Why did the small-cap size premium disappear after its discovery by Banz and Reinganum, while the value premium has persisted for over 50 years?", a: "Two explanations for the size premium's disappearance: it may have been a data-mined, in-sample artifact not borne out in subsequent out-of-sample data (Fischer Black's hypothesis), or rational investors, once alerted to the anomaly, may have bid up small-cap prices until the excess return was arbitraged away (consistent with EMH). The value premium's persistence despite being equally well-known suggests either a genuine, non-arbitrageable risk compensation (rational story) or persistent behavioral biases and structural barriers to arbitrage capital that haven't been overcome (behavioral story) — the key empirical contrast is that one anomaly vanished on discovery and the other didn't." },
    { q: "Why is momentum investing described as a 'positive feedback' strategy, and why does this make it prone to crashes in a way value investing is not?", a: "Momentum buys stocks that have already risen and shorts stocks that have already fallen — as more momentum investors pile into rising stocks, prices rise further, attracting even more buyers (positive feedback, destabilizing). This creates fragility: when a shock (like a government bailout propping up momentum's shorted 'losers') interrupts the trend, momentum positions unwind violently, causing crashes. Value investing does the opposite — it buys stocks that have fallen (once cheap enough), providing a stabilizing, negative-feedback force that dampens rather than amplifies price swings." },
    { q: "Why can selling volatility (e.g., writing out-of-the-money put options) generate steady profits for years and then produce catastrophic losses?", a: "Volatility carries a negative risk premium — realized volatility is on average lower than VIX-implied volatility (by roughly 2-3%), meaning option sellers collect a persistent premium in normal times, similar to collecting insurance premiums. But during a genuine crisis (like 2007-09), volatility spikes dramatically, and sellers face the 'insurance payout' side of the trade — losses that can be severe and sudden (the volatility index fell nearly 70% in a few months), unlike the steady gains accumulated beforehand." }
  ],

  hooks: [
    { title: "Rational riskier vs. behaviorally cheap", text: "Two stories, same value premium: 'value stocks are genuinely dangerous' (rational) vs. 'value stocks are just misunderstood and underpriced' (behavioral) — same outperformance, completely different implied risk." },
    { title: "Stabilizer vs. accelerant", text: "Value is a shock absorber — it buys the dip and helps prices recover. Momentum is gasoline on a fire — it buys the rally and helps prices run further, right up until the fire burns out and momentum investors get burned with it." },
    { title: "Selling insurance, collecting premiums, until the hurricane", text: "Selling volatility is running an insurance company: steady premiums for years, and then one hurricane season wipes out a decade of profits." }
  ],

  summary: `<p><strong>Value premium</strong>: high book-to-market outperforms low — rational (asymmetric adjustment costs, genuine risk) vs. behavioral (overextrapolation of growth + loss aversion on value, mispricing) explanations. <strong>Macro factors</strong>: growth/inflation/volatility — SHOCKS matter, not levels; high-yield bonds are growth-cycle-indifferent; volatility's leverage effect + discount-rate channel both lower stock returns. <strong>Volatility</strong>: negative risk premium — sell options to collect it, but tail risk is severe (insurance-selling analogy). <strong>Fama-French</strong>: MKT+SMB+HML, SMB/HML betas centered on ZERO (active tilt required). <strong>Size premium</strong> disappeared post-discovery (data mining or arbitraged away); <strong>value</strong> persisted. <strong>Momentum</strong> (WML/UMD): vastly outperforms but crash-prone — positive feedback/destabilizing, vs. value's negative feedback/stabilizing character.</p>`
});
