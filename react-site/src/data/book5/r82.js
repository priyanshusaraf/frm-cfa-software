export default ({
  book: 5, reading: 82,
  session: "Risk Management and Investment Management",
  title: "Factors",
  tagline: "The named, tradeable factors: value, size, momentum, and the macro factors (growth, inflation, volatility) — with rational and behavioral stories for each.",

  teaches: `<p>Value investing and the book-to-market ratio, macroeconomic factors (economic growth, inflation, volatility) and how they drive returns, managing volatility risk, the Fama-French three-factor model, and value vs. momentum investing strategies (including the disappearing size premium).</p>`,

  why: `<p>These are the concrete, tradeable versions of R81's abstract factor theory. Understanding which factors are genuinely persistent (value, momentum) vs. which disappeared after discovery (size) — and why — is central to evaluating any factor-based investment claim.</p>`,

  intuition: `<p><strong>Book value</strong> per share is what a company's own books say each share is worth if the firm sold everything and paid off every debt today: (total assets − total liabilities) ÷ shares outstanding. Divide book value by the stock's market price and you get the <strong>book-to-market ratio</strong>. A <strong>value stock</strong> has a HIGH book-to-market ratio — the market price is cheap relative to what the accounting books say the company is worth. A <strong>growth stock</strong> has a LOW book-to-market ratio — investors are paying a big premium over book value because they expect fast future growth. A <strong>value-growth strategy</strong> is simply: go long the cheap (high book-to-market) stocks and short the expensive (low book-to-market) ones. Since 1965 this strategy has significantly outperformed — $1 invested in 1965 was worth more than $6 by 2012 (peaking near $8 in 2006-07) — despite sharp losing stretches during the late-1990s tech boom and the 2007-09 crisis.</p>
  <p>Why does this premium exist? There are two competing stories, and the exam tests whether you can tell them apart. RATIONAL: value firms are "old school" — their capital is tied up in fixed, illiquid assets (factories, equipment) that can't be quickly redeployed when the economy changes, unlike growth firms whose capital is mostly human capital (people can pivot). This gives value firms HIGH, ASYMMETRIC adjustment costs, making them fundamentally riskier — the extra return is fair compensation for bearing that risk in bad times (defined by things like labor-income risk, weak investment growth, luxury-consumption risk, long-run consumption risk, housing risk). BEHAVIORAL: value stocks are not actually riskier — investors just misprice them. Two biases drive this: (1) <em>overextrapolation/overreaction</em> — investors assume a growth company's recent hot streak will continue forever and bid its price up beyond what the fundamentals justify; (2) <em>loss aversion and mental accounting</em> — investors judge each stock position separately (not as part of a diversified portfolio) and treat a stock that has recently performed badly as "risky" purely because it lost money, bidding it down further than its fundamentals warrant. Under this story, value stocks are simply CHEAP, not objectively dangerous.</p>
  <p>The SIZE effect (small stocks beating large stocks, after adjusting for beta) was discovered by Banz and Reinganum in 1981 — and then it vanished. If you track the SMB (small-minus-big) strategy from 1965 to 2011, the cumulative return peaks in the early 1980s and shows no further premium afterward. Two explanations: (1) <em>data mining</em> — the original result may have been an artifact of the specific sample used (an in-sample fluke that didn't hold up out-of-sample); (2) <em>investor action</em> — once the anomaly was published, rational investors bid up small-cap prices until the excess return was arbitraged away, exactly as the efficient market hypothesis (EMH) predicts should happen to any known anomaly. A small residual size effect still exists today, but it's largely explained by lower liquidity in small stocks, not a genuine risk-adjusted excess return.</p>
  <p>Momentum (buy stocks that have risen over roughly the last six months, short stocks that have fallen) vastly outperforms both value and size historically — $1 invested in the WML ("winners minus losers") factor in 1965 grew to over $60 at its peak. But momentum is PRONE TO CRASHES (it lost more than 50% in 2007-09) because of a structural difference in feedback mechanics: value is a NEGATIVE-feedback (stabilizing) strategy — a stock that falls eventually gets cheap enough to attract value buyers, which pushes the price back up, dampening the swing. Momentum is a POSITIVE-feedback (destabilizing) strategy — a rising stock attracts more momentum buyers, which pushes the price up further, amplifying the swing until something breaks it (often a policy intervention, like a government bailout that puts a floor under the "losers" momentum investors are short).</p>`,

  visual: `<div class="widget" data-widget="frontier"></div>`,

  eli5: `<p>Imagine a farmers' market where two kinds of stalls sell fruit. One stall (the "growth" stall) has a big flashy sign about how amazing next season's crop will be — everyone crowds around it and pays a premium just to be near the hype, even though nobody has tasted the fruit yet. The other stall (the "value" stall) is dusty, unglamorous, and sells fruit that already looks a bit bruised, so hardly anyone wants to pay full price for it — you can walk up and buy a whole crate for cheap. If you patiently buy from the dusty stall and skip the hype stall, you tend to come out ahead over many seasons, because the hype stall's fruit rarely lives up to the sign, while the dusty stall's fruit was underpriced for what it actually was. There's also a hot-tip stall where people just buy whatever the last customer bought — line gets longer, hype builds, prices spike, and then one day the line vanishes all at once and everyone holding fruit loses money fast. In finance terms: the dusty stall is a <strong>value stock</strong> (cheap relative to its book value), the hype stall is a <strong>growth stock</strong> (priced on optimism about the future), and the hot-tip stall behavior is <strong>momentum investing</strong> (buying what's already risen) — which pays off big on average but crashes hard when the crowd suddenly reverses.</p>`,

  thinkLike: `<p>A risk manager or factor-portfolio manager treats every factor tilt as a deliberate, named bet, not an accident. Before taking a value, size, or momentum position, the practitioner asks three questions: (1) Is this premium <em>genuinely persistent</em>, or did it disappear once discovered (like size)? (2) If I believe the rational story, what specific "bad times" am I being paid to bear — and can I actually stomach losses during exactly those times (e.g., a value investor needs a long horizon and tolerance for underperforming during bull markets like the late 1990s)? (3) If I believe the behavioral story instead, am I confident the mispricing will correct within my holding period, given that arbitrage capital hasn't fully closed the gap for 50+ years? For momentum specifically, the practitioner explicitly plans for tail risk: momentum's positive-feedback mechanics mean the strategy is not merely volatile in the normal sense — it is capable of a fast, deep crash (as in 2007-09), typically triggered by a policy shock that yanks the "losers" back up. A well-run momentum book therefore sizes positions and sets stop-outs assuming a crash WILL eventually happen, rather than treating steady historical outperformance as proof the strategy is safe.</p>
  <p>On the exam, GARP tests this reading by (a) giving you a described scenario and asking whether it fits the rational or behavioral explanation of a premium — look for language about "riskier"/"can't adapt" (rational) vs. "overreacted"/"overextrapolated"/"mispriced" (behavioral); (b) asking you to identify the ONE asset class that breaks the usual growth-cycle pattern (high-yield bonds, indifferent to expansions vs. recessions); (c) testing whether you know SMB/HML betas center on ZERO in Fama-French (unlike CAPM's beta of 1), meaning the average investor gets no size/value tilt by default; and (d) asking you to explain WHY momentum crashes while value doesn't — the feedback-direction argument (positive vs. negative feedback) is the answer they want, not just "momentum is riskier."</p>`,

  formulas: [
    { name: "Fama-French three-factor model", math: "E(R_{i})-R_F = \\beta_{i,MKT}\\times [E(R_M)-R_F] + \\beta_{i,SMB}\\times E(SMB) + \\beta_{i,HML}\\times E(HML)", note: "MKT=market, SMB=small-minus-big (size), HML=high-minus-low book-to-market (value).", plain: "An asset's expected excess return is the sum of three separately-priced risk exposures: its beta-weighted exposure to the overall market, to the small-minus-big size factor, and to the high-minus-low book-to-market value factor.", derivation: `<p>Start from single-factor CAPM, which says expected excess return depends only on market exposure:</p>
      \\[ E(R_i) - R_F = \\beta_{i,MKT}\\times[E(R_M)-R_F] \\]
      <p>Fama and French (1993) observed that CAPM alone left patterns in average returns unexplained — specifically, small stocks and high book-to-market (value) stocks earned more than their market betas predicted. They constructed two additional \\(\\text{factor-mimicking portfolios}\\): SMB (long small-cap stocks, short large-cap stocks) and HML (long high book-to-market stocks, short low book-to-market stocks), and added each as its own priced risk source, each with its own beta:</p>
      \\[ E(R_i) - R_F = \\beta_{i,MKT}\\times[E(R_M)-R_F] + \\beta_{i,SMB}\\times E(SMB) + \\beta_{i,HML}\\times E(HML) \\]
      <p>A key structural difference from CAPM: the \\(\\text{market}\\) beta of the average stock is 1 (by construction, the market is the value-weighted sum of all stocks), but the average stock's SMB and HML betas are centered on \\(\\text{zero}\\) — a stock with no size or value tilt earns just the market return, and an investor must deliberately choose a value or size tilt to earn \\(\\beta_{i,SMB}\\times E(SMB)\\) or \\(\\beta_{i,HML}\\times E(HML)\\) on top of that.</p>` },
    { name: "Momentum-augmented (four-factor) model", math: "E(R_i) - R_F = \\beta_{i,MKT}\\times[E(R_M)-R_F] + \\beta_{i,SMB}\\times E(SMB) + \\beta_{i,HML}\\times E(HML) + \\beta_{i,WML}\\times E(WML)", note: "WML='winners minus losers' (also UMD, 'up minus down'). Momentum premium far exceeds SMB/HML historically but crashes hard.", plain: "Adding a fourth term extends Fama-French to also price an asset's exposure to the momentum factor — being long recent winners and short recent losers." },
    { name: "Expected market risk premium and volatility", math: "E(R_M)-R_F \\approx A \\times \\sigma^{2}_M", note: "Coefficient estimated as positive, negative, or zero across studies — theoretically positive, empirically ambiguous.", plain: "The market's expected excess return is modeled as proportional to the variance of market returns, scaled by the average investor's risk aversion \\(A\\) — more variance should require more compensation, though the empirical evidence for a positive relationship is mixed." }
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

  breakdown: [
    {
      title: "Two explanations for the value premium",
      points: [
        "Rational: value firms hold fixed, non-redeployable capital (high, asymmetric adjustment costs), making them genuinely riskier — the premium compensates for losses in bad times defined by labor-income risk, weak investment growth, luxury-consumption risk, long-run consumption risk, and housing risk.",
        "Behavioral (overextrapolation/overreaction): investors assume a growth firm's recent hot streak continues indefinitely and bid its price above fundamentals; when growth disappoints, the stock underperforms.",
        "Behavioral (loss aversion + mental accounting): investors evaluate each stock in isolation rather than as part of a portfolio, and treat a stock with a recent poor track record as riskier than it objectively is, bidding it down further than fundamentals justify."
      ]
    },
    {
      title: "Three most important macroeconomic factors",
      points: [
        "Economic growth: equities outperform in expansions (large stocks ~12.4%, small stocks ~16.8%); government/investment-grade bonds outperform in recessions (~12.3%-12.6%); high-yield bonds are relatively indifferent to the growth cycle (7.4% recession vs. 7.7% expansion).",
        "Inflation: high inflation hurts both stocks and bonds — bonds mechanically (fixed payments lose real value), stocks less predictably (ownership of real productive assets, but still generally worse in high-inflation periods historically).",
        "Volatility: measured by the VIX, negatively correlated with stock returns (~−0.39) via the leverage effect (falling equity value + stable debt → higher leverage → riskier, cheaper equity) and the discount-rate channel (CAPM: higher volatility → higher required return → lower current price for the same future cash flows)."
      ]
    },
    {
      title: "Two approaches to mitigating volatility risk",
      points: [
        "Invest in less-volatile assets like government or investment-grade bonds — but this is not a perfect hedge: the VIX-bond correlation is only ~0.12, and in 2007-09 both stocks and bonds fell together under a shared volatility shock.",
        "Buy volatility protection directly in the derivatives market — out-of-the-money put options, which pay off precisely when volatility (and losses) spike."
      ]
    },
    {
      title: "Fama-French three-factor model's three factors",
      points: [
        "MKT — the traditional CAPM market risk factor (return of the market portfolio minus the risk-free rate).",
        "SMB ('small minus big') — the return of small-cap stocks minus large-cap stocks, capturing the (now largely disappeared) size premium.",
        "HML ('high minus low') — the return of high book-to-market (value) stocks minus low book-to-market (growth) stocks, capturing the value premium."
      ]
    },
    {
      title: "Two explanations for the disappearing size effect",
      points: [
        "Data mining: Fischer Black (1993) argued the original Banz/Reinganum in-sample finding was never substantiated in later out-of-sample data — it may have been a statistical fluke.",
        "Investor action: once published, rational investors bid up small-cap prices until the excess return was competed away — consistent with the efficient market hypothesis (EMH)."
      ]
    }
  ],

  quiz: [
    {
      q: "A stock has a high book-to-market ratio. Under the standard classification used in this reading, this stock is a:",
      options: ["Growth stock", "Value stock", "Small-cap stock by definition", "Momentum 'winner'"],
      answer: 1,
      why: "High book-to-market means the market price is low relative to accounting book value — that is the definition of a value stock. Growth stocks have LOW book-to-market ratios (the market is paying a premium over book value for expected future growth), so the 'growth stock' answer is the opposite. Book-to-market says nothing about firm size or recent price momentum, so the 'small-cap by definition' and 'momentum winner' answers are unrelated confusions."
    },
    {
      q: "Which asset class's returns are described in the reading as relatively indifferent to whether the economy is in expansion or recession?",
      options: ["Large-cap stocks", "Government bonds", "High-yield (junk) bonds", "Small-cap stocks"],
      answer: 2,
      why: "High-yield bonds returned about 7.4% in recessions vs. 7.7% in expansions — nearly flat across the cycle. Large and small stocks swing sharply with the cycle (underperforming in recessions, strongly outperforming in expansions), and government bonds swing the other way (strong in recessions, weaker in expansions) — both are the opposite of 'indifferent.'"
    },
    {
      q: "In the Fama-French three-factor model, what does it mean that the average stock's SMB and HML betas are centered on zero (unlike the CAPM market beta, which centers on one)?",
      options: [
        "SMB and HML are not real risk factors and can be ignored",
        "The average investor, holding the market with no size or value tilt, earns just the market return — a size or value tilt must be actively chosen to earn those premiums",
        "Every stock must have either a large positive or large negative SMB/HML beta",
        "SMB and HML betas are only nonzero for small-cap stocks"
      ],
      answer: 1,
      why: "Because the market by definition has an average market beta of 1, but no inherent size or value tilt, the average SMB/HML beta across all stocks is zero — capturing those premiums requires deliberately tilting a portfolio toward small-cap or high book-to-market names. The 'not real risk factors' answer misreads 'centered on zero' as 'not real'; the 'must have large positive or negative beta' and 'only nonzero for small-caps' answers misstate what 'centered on zero' means (it describes the average across all stocks, not every individual stock's exposure)."
    },
    {
      q: "Why did the small-cap size premium (SMB) largely disappear after its discovery by Banz and Reinganum in 1981, while the value premium (HML) persisted for 50+ years?",
      options: [
        "Small-cap stocks stopped existing after 1981",
        "Either the original finding was a data-mined, in-sample artifact, or rational investors bid up small-cap prices until the anomaly was arbitraged away — while the value premium's persistence has no fully agreed explanation",
        "Regulators banned small-cap investing after 1981",
        "The value premium is guaranteed by law to never disappear"
      ],
      answer: 1,
      why: "The two accepted explanations are data mining (Fischer Black's hypothesis that the original result didn't hold out-of-sample) and EMH-consistent arbitrage (investors traded the anomaly away once it was published). Value's persistence despite being equally well-known is the key empirical puzzle contrasted against size in this reading. The 'stocks stopped existing' and 'regulators banned small-cap investing' answers are absurd distractors; the 'guaranteed by law' answer overstates what 'persisted' means — nothing in finance is 'guaranteed by law.'"
    },
    {
      q: "Why is momentum investing described as a positive-feedback (destabilizing) strategy, while value investing is negative-feedback (stabilizing)?",
      options: [
        "Momentum only trades bonds, while value only trades equities",
        "Momentum buys stocks that have already risen (attracting more buyers, pushing prices up further); value buys stocks that have already fallen (once cheap enough, this buying pushes prices back toward fair value)",
        "Momentum and value have a correlation of exactly −1.0, so they are perfect opposites",
        "Momentum is only used by retail investors, while value is only used by institutions"
      ],
      answer: 1,
      why: "Momentum amplifies existing price trends (positive feedback: rising prices attract more buyers, pushing prices higher still), which is exactly why it is crash-prone when the trend reverses. Value dampens price trends (negative feedback: falling prices eventually attract value buyers, pushing prices back up). The measured correlation between value and momentum returns is only about −0.16, not −1.0, so the 'perfect opposites' answer is a common but incorrect assumption the reading explicitly warns against."
    },
    {
      q: "An investor sells out-of-the-money put options every month to collect volatility premium. Based on this reading, which statement best describes the risk-return profile of this strategy?",
      options: [
        "It has a positive expected payoff in every single month, with no risk of large losses",
        "It typically produces steady, positive income in normal times (because realized volatility runs ~2-3% below implied volatility on average) but exposes the seller to rare, severe losses during volatility spikes like 2007-09",
        "It has a guaranteed negative expected return over any holding period, since volatility always rises eventually",
        "It behaves identically to buying puts, just with the opposite sign on returns every month"
      ],
      answer: 1,
      why: "Volatility carries a negative risk premium: selling it earns a persistent edge because implied volatility is on average higher than what actually gets realized, but the strategy is short a tail event — during the 2007-09 crisis the volatility index fell nearly 70% in a few months, producing catastrophic losses for sellers (full-sample skewness of −8.26 vs. −0.37 excluding the crisis). The 'no risk of large losses' answer ignores the crash risk entirely; the 'guaranteed negative return' answer wrongly claims a guaranteed negative return (the historical premium was positive on average); the 'identical to buying puts' answer ignores that buying vs. selling volatility have very different, non-mirror-image payoff shapes (the buyer's loss is capped at the premium paid, while the seller's loss is not capped)."
    }
  ],

  sources: [
    { title: "Value investing (book-to-market and the value premium)", url: "https://en.wikipedia.org/wiki/Value_investing", note: "Background on the value-investing tradition (Graham & Dodd) that underlies the book-to-market strategy discussed in this reading." },
    { title: "Fama-French three-factor model", url: "https://en.wikipedia.org/wiki/Fama%E2%80%93French_three-factor_model", note: "Reference on the MKT/SMB/HML model, its construction, and its extensions (including the momentum factor)." },
    { title: "Momentum (finance)", url: "https://en.wikipedia.org/wiki/Momentum_(finance)", note: "Overview of the Jegadeesh-Titman momentum effect, its historical performance, and its crash risk." },
    { title: "CBOE Volatility Index (VIX)", url: "https://en.wikipedia.org/wiki/VIX", note: "Background on the VIX, used in this reading as the measure of equity market volatility and the leverage-effect discussion." }
  ],

  pdf: { book: 5, query: "Historically, value stocks have significantly outperformed growth stocks" },

  summary: `<p><strong>Value premium</strong>: high book-to-market outperforms low — rational (asymmetric adjustment costs, genuine risk) vs. behavioral (overextrapolation of growth + loss aversion on value, mispricing) explanations. <strong>Macro factors</strong>: growth/inflation/volatility — SHOCKS matter, not levels; high-yield bonds are growth-cycle-indifferent; volatility's leverage effect + discount-rate channel both lower stock returns. <strong>Volatility</strong>: negative risk premium — sell options to collect it, but tail risk is severe (insurance-selling analogy). <strong>Fama-French</strong>: MKT+SMB+HML, SMB/HML betas centered on ZERO (active tilt required). <strong>Size premium</strong> disappeared post-discovery (data mining or arbitraged away); <strong>value</strong> persisted. <strong>Momentum</strong> (WML/UMD): vastly outperforms but crash-prone — positive feedback/destabilizing, vs. value's negative feedback/stabilizing character.</p>`
});
