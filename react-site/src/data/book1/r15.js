export default ({
  book: 1, reading: 15,
  session: "Term Structures & Volatility",
  title: "Volatility Smiles",
  tagline: "If Black-Scholes-Merton were exactly right, implied volatility would be flat across all strikes. It isn't. The SHAPE of the departure tells you what the market believes about the true distribution.",

  teaches: `<p>Readings 11-14 built term-structure models for rates. This reading pivots to a parallel idea for options generally: implied volatility is the number you plug into the Black-Scholes-Merton (BSM) formula, alongside the stock/currency price, strike, time to maturity, and risk-free rate, to make the model's output price match the actual market price of the option. If you compute that implied volatility separately for every strike price on the same underlying and maturity, and plot implied volatility (y-axis) against the ratio of strike price to current spot price \\(X/S_{0}\\) (x-axis), you get a curve: a <strong>volatility smile</strong> (or, for equities, a "skew"/"smirk"). BSM itself assumes one single constant volatility for every strike; a genuinely flat curve is what BSM predicts. The curve is never flat in practice. This reading teaches: (1) put-call parity forces equal implied vol for calls and puts at the same strike; (2) the three named curve shapes (smile, skew, frown) each imply a different true distribution for the underlying and have different real-world causes; (3) alternative ways to parameterize the x-axis, and how smiles combine with maturity into a volatility surface; and (4) how the shifting smile changes the option Greeks, specifically delta.</p>`,

  why: `<p>If markets truly believed lognormal returns (BSM's core assumption: the stock/currency price is lognormally distributed with one constant volatility for the whole life of the option), every option on the same underlying and maturity would trade at the same implied volatility regardless of strike. They don't. The specific pattern of disagreement is a direct, tradeable readout of what the market believes about fat tails, skewness, and jump risk that the plain BSM formula cannot see.</p>
  <p>A trader who ignores the smile and prices every strike off one flat volatility will systematically misprice away-from-the-money options, and that mispricing shows up immediately as an arbitrage opportunity for anyone using the market's actual (smile-consistent) prices instead. This is BSM's constant-volatility assumption failing exactly the way Reading 11 warned it would for bonds, where a single flat rate-volatility number also proved too crude. Now the same failure shows up for options generally.</p>`,

  intuition: `<p>Start from put-call parity, the formula \\(c + Xe^{-rT} = p + S_{0}\\) that relates a European call price \\(c\\) and put price \\(p\\) at the same strike \\(X\\) and maturity \\(T\\). This equation is derived purely from no-arbitrage: buy the call, sell the put, and you have synthetically replicated a forward contract, regardless of what distribution the underlying actually follows. Because it holds no matter what the true distribution is, if the ACTUAL market call price deviates from what BSM predicts by some dollar amount, put-call parity forces the actual market put price to deviate from its BSM prediction by that exact same dollar amount (same sign, same size). Both sides of the parity equation must still balance. Since implied volatility is just "the volatility number that, plugged into BSM, reproduces the market price," and both option prices moved by the identical dollar amount, the implied volatility you back out for the call and the implied volatility you back out for the put at that same strike MUST be equal. This is not an empirical finding you could someday falsify; it's arithmetic.</p>
  <p>The shape of the smile itself is diagnostic: it tells you what the market believes about the true distribution of the underlying, distinct from BSM's lognormal assumption. A <strong>smile</strong> (typical of currency/FX options, e.g. options on EUR/USD) means the market prices deep in-the-money AND deep out-of-the-money options with higher implied volatility than at-the-money options. That is fatter tails on BOTH sides than lognormal, and it is driven by the fact that exchange-rate volatility is not constant: it jumps between regimes (e.g. a central bank suddenly shifting policy), raising the odds of an extreme move in either direction. The effect is weaker for long-dated options because regime shifts average out over a longer horizon.</p>
  <p>A <strong>skew/smirk</strong> (typical of equity index options, e.g. options on the S&P 500) means implied volatility is HIGHER for low-strike options (in-the-money calls, out-of-the-money puts) and LOWER for high-strike options (in-the-money puts, out-of-the-money calls). That inverse relationship between implied vol and \\(X/S_{0}\\) translates into a left-skewed implied distribution: traders believe a big down move is more likely than a big up move of the same size. Two separate causes are given for this. The leverage effect is a mechanical, real change in volatility: as a firm's equity value falls, its debt-to-equity ratio rises, which genuinely increases the riskiness of the remaining equity. "Crashophobia" is a name coined by Mark Rubinstein after the 1987 crash: market participants pay a fear premium for deep out-of-the-money puts, which act as crash insurance, purely because they are afraid of another crash, independent of whether volatility itself has actually changed. Support for this second story is that the skew steepens when markets fall but doesn't flatten symmetrically when markets rise.</p>
  <p>A <strong>frown</strong> means the market is pricing in an anticipated binary/news event (e.g. a pending court ruling, an FDA drug approval decision, an election) that will send the price sharply one way or the other. That makes the outcome bimodal rather than fat-tailed, so at-the-money options, which straddle the "coin flip" outcome, get bid up relative to away-from-the-money options. The result is the mirror image of a smile's shape.</p>`,

  visual: `<div class="widget" data-widget="smile"></div>`,

  formulas: [
    {
      name: "Put-call parity (European options)",
      math: "c + Xe^{-rT} = p + S_{0}",
      note: "c = call price, p = put price, X = strike, \\(S_{0}\\) = current underlying price, r = risk-free rate, T = time to maturity. Holds for European options regardless of the true distribution of the underlying.",
      plain: "The call price plus the discounted strike must equal the put price plus the current stock price. This is a pure no-arbitrage identity, true for any distribution, not just lognormal.",
      derivation: `<p>Consider two portfolios formed today. Portfolio A: buy one call (cost \\(c\\)) and invest \\(Xe^{-rT}\\) at the risk-free rate so it grows to exactly \\(X\\) at maturity. Portfolio B: buy one put (cost \\(p\\)) and buy one share of the underlying (cost \\(S_{0}\\)).</p>
      <p>At maturity T, compare the two portfolios' payoffs. If the underlying price \\(S_{T} > X\\): Portfolio A's call is exercised, paying \\(S_{T}-X\\), plus the cash grew to \\(X\\), for a total of \\(S_{T}\\). Portfolio B's put expires worthless and the share is worth \\(S_{T}\\), also a total of \\(S_{T}\\). If instead \\(S_{T} \\le X\\): Portfolio A's call expires worthless, leaving just the grown cash of \\(X\\). Portfolio B's put is exercised, receiving \\(X\\) for the share worth \\(S_{T}\\), for a total of \\(X\\). Both portfolios again match.</p>
      <p>Since the two portfolios have IDENTICAL payoffs in every possible future state of the world, no-arbitrage requires them to have identical prices today:
      \\[ c + Xe^{-rT} = p + S_{0} \\]
      Notice this derivation never assumed a lognormal distribution, constant volatility, or any specific model for how \\(S_{T}\\) is distributed; it assumed only that markets don't allow riskless profit. That is exactly why any BSM mispricing must show up identically in both the call and the put, forcing their implied volatilities to match.</p>`
    }
  ],

  concepts: [
    {
      name: "Put-call parity forces equal implied vol",
      def: "Because put-call parity is a pure no-arbitrage relationship (holds regardless of the true underlying distribution), any deviation of market price from the BSM price must be identical in dollar terms for a call and a put at the same strike/maturity.",
      pitfall: "This forces implied volatility for a call and put at the same strike to be EQUAL: a mechanical, model-independent fact, not an empirical observation. If a question implies calls and puts at the same strike could have different implied vols, that's wrong by construction.",
      related: ["Smile, skew, and frown shapes"]
    },
    {
      name: "Smile, skew, and frown — three shapes, three stories",
      def: "The shape of the implied-volatility curve is a direct readout of the distribution the market is actually pricing, and the three named shapes belong to three different markets with three different causes (enumerated in the breakdown above).",
      example: "Take an underlying whose empirical distribution has a fatter RIGHT tail than lognormal. Backing implied vol out strike by strike then gives the HIGHEST implied volatility at HIGH strike prices, so in-the-money calls and out-of-the-money puts look 'expensive' relative to a flat-vol BSM price. Flip the logic for a left-skewed distribution such as the S&P 500's: the fat tail sits on the low-strike side instead, which is exactly the equity skew.",
      pitfall: "'Crashophobia' is about the PRICE of protection: deep OTM puts carry a fear premium because everyone remembers October 1987. It is NOT a claim that actual realized volatility rises when prices fall. Don't conflate the leverage effect's story (volatility genuinely does rise, mechanically, as leverage rises) with crashophobia's story (a risk-aversion premium baked into pricing, independent of whether volatility itself changes).",
      related: [{ r: 11, label: "R11 — BSM's constant-volatility assumption failing, the root cause" }],
      memory: "Smile = FX fears both directions. Skew = equities fear down more (leverage + crashophobia). Frown = a coin-flip news event."
    },
    {
      name: "Alternative smile parameterizations and vol surfaces",
      def: "The volatility smile plots implied vol against \\(X/S_{0}\\) by default, but traders sometimes swap the x-axis for the strike alone, for \\(X/F_{0}\\), or for option delta, each of which pins down 'at-the-money' differently and holds up differently as the underlying moves (the four options and their trade-offs are listed in the breakdown above).",
      example: "A volatility SURFACE = the volatility smile (implied vol vs. strike, for one fixed maturity) combined with the volatility term structure (implied vol vs. maturity, for at-the-money options) into one 3-D grid: implied vol as a function of BOTH strike and maturity simultaneously. A trader prices ANY option, at any strike and any maturity, by reading the corresponding point off this one consistent surface instead of guessing a volatility.",
      related: ["Impact on the Greeks"]
    },
    {
      name: "Impact on the Greeks — minimum variance delta",
      def: "Standard BSM delta assumes implied volatility stays fixed as the equity price changes, so it captures only the option's movement along the existing smile curve and ignores the second effect entirely: the whole curve shifting, because equity price and volatility are typically negatively correlated (the skew's own leverage-and-crashophobia story, viewed dynamically rather than as a static snapshot).",
      pitfall: "The whole-curve shift DOMINATES the along-the-curve movement in practice, per the source text. The minimum variance delta is the delta measure that incorporates this shift; it comes out LOWER than the standard BSM delta, which ignores the shift entirely. A common trap is assuming standard BSM delta already captures it, or assuming the minimum variance delta is HIGHER than BSM delta. It is not; it is lower.",
      related: ["Smile, skew, and frown"],
      memory: "Standard delta only walks along the smile; minimum variance delta also accounts for the smile itself moving. That whole-curve move is the bigger effect, which is why minimum variance delta comes out lower."
    },
    {
      name: "Price jumps and the volatility frown",
      def: "An anticipated news event (e.g. an FDA ruling on a drug, an antitrust court decision) can cause the market to expect the underlying price to jump sharply up OR down by a large amount, with no in-between outcome. This produces a bimodal (two-hump) distribution for the future price, even though that bimodal distribution can be engineered to have the exact same mean and standard deviation as a normal unimodal distribution.",
      example: "Because the outcome is essentially a coin flip between two extreme values, at-the-money options carry the highest implied volatility: they are the ones most exposed to the uncertainty of WHICH way the coin lands. Away-from-the-money options are comparatively cheap because they are already \"resolved\" in one direction or the other by the jump. Plotting implied vol against strike then produces a frown: high in the middle, low at the wings, the mirror image of a currency smile's shape.",
      related: ["Smile, skew, and frown"]
    }
  ],

  connections: {
    from: [
      { r: 11, why: "BSM's constant-volatility assumption was already flagged as one of three reasons it fails for bonds; here it fails again for options generally." },
      { r: 14, why: "The level-dependent volatility models (CIR, lognormal) hinted that constant volatility is an unrealistic simplification; the smile is the market's verdict on the same issue." }
    ],
    to: [
      { r: 16, why: "FRTB's capital framework must account for the fact that a single flat volatility assumption misprices tail risk across strikes." }
    ],
    confused: [
      { what: "Smile vs skew vs frown", how: "Smile: symmetric fat tails both directions (FX). Skew: asymmetric, down-side fear (equity, leverage + crashophobia). Frown: ATM richer than wings (anticipated binary event), the inverse shape of a smile." },
      { what: "Leverage effect vs crashophobia", how: "Leverage effect: falling equity price mechanically raises financial leverage, which genuinely raises volatility. Crashophobia: a risk-aversion PRICING premium on deep OTM puts, independent of whether realized volatility actually changes." },
      { what: "Standard BSM delta vs minimum variance delta", how: "Standard delta moves only along the existing smile curve; minimum variance delta also accounts for the smile curve itself shifting (dominant effect), making it systematically lower." }
    ]
  },

  misconceptions: [
    { wrong: "\"A call and put at the same strike can have meaningfully different implied volatilities.\"", right: "Put-call parity mechanically forces them to be equal: this is a no-arbitrage fact independent of the true distribution, not an empirical claim that can be violated." },
    { wrong: "\"Crashophobia means realized volatility spikes whenever prices fall.\"", right: "Crashophobia is about the PRICE of protection (a risk-aversion premium on deep OTM puts), a separate story from the leverage effect, where volatility genuinely does rise as leverage increases." },
    { wrong: "\"The standard BSM delta already accounts for the smile shifting as the underlying price moves.\"", right: "Standard delta only captures movement ALONG the existing smile curve. The dominant effect — the whole curve shifting because vol and price are negatively correlated — requires the minimum variance delta, which is systematically lower." },
    { wrong: "\"A frown pattern is just a weaker version of a smile.\"", right: "It's the opposite shape: ATM implied vol is HIGHER than the wings, reflecting an anticipated bimodal outcome (e.g., a binary news event) rather than fat tails on both sides." }
  ],

  highYield: [
    { stars: 4, what: "Put-call parity forcing equal implied vol at the same strike: mechanical, not empirical.", why: "A precise, frequently tested no-arbitrage fact." },
    { stars: 4, what: "Smile (FX) vs skew (equity) vs frown (binary event): shapes, markets, and causes.", why: "The core conceptual map of this reading; causes (leverage effect vs crashophobia) are commonly conflated and tested separately." },
    { stars: 4, what: "Minimum variance delta < standard BSM delta because the whole smile shifts (dominant effect).", why: "A precise, testable Greek-adjustment fact." },
    { stars: 3, what: "Volatility surface = smile × term structure.", why: "A compact definitional fact, easy points." }
  ],

  recall: [
    { q: "Why must a call and a put at the same strike and maturity have the same implied volatility?", a: "Put-call parity is a model-independent, no-arbitrage relationship. Any gap between market and BSM price must be identical in dollar terms for the call and put, which mechanically forces their implied volatilities (backed out from that same price gap) to match." },
    { q: "An equity index shows a pronounced downside skew. Name the two distinct causes and explain the difference between them.", a: "Leverage effect: a falling equity price mechanically raises the firm's financial leverage, genuinely increasing volatility. Crashophobia: a risk-aversion premium embedded in the PRICE of deep OTM puts (post-1987 fear of another crash), independent of whether realized volatility itself has risen." },
    { q: "Why is the minimum variance delta systematically lower than the standard BSM delta for equity options?", a: "Standard BSM delta only captures the effect of moving along the existing smile curve as price changes. But equity price and volatility are typically negatively correlated, so the WHOLE smile curve tends to shift when price moves. This dominant second effect is captured only by the minimum variance delta, pulling it below standard delta." },
    { q: "A currency pair shows a symmetric smile while an equity index shows a downside skew. What does this difference say about each market's implied distribution?", a: "The FX smile implies fat tails on BOTH sides relative to lognormal: extreme moves are seen as more likely in either direction (volatility jumps/regime shifts). The equity skew implies a left-skewed distribution: down moves are seen as more likely/severe than up moves, driven by leverage and crashophobia." }
  ],

  hooks: [
    { title: "Three faces, three moods", text: "Smile: nervous about both directions (FX). Skew/smirk: nervous specifically about falling (equities: leverage + crashophobia). Frown: expecting a coin-flip verdict (binary news event), the opposite curvature of a smile." },
    { title: "Parity's iron law", text: "Put-call parity is the law that says a call and put at the same strike must quote the same implied vol — no exceptions, no empirical wiggle room, because it's arbitrage, not opinion." },
    { title: "The whole smile moves", text: "Standard delta watches you walk along a hallway (the smile curve). Minimum variance delta notices the whole hallway is also sliding sideways, and that sliding is usually the bigger effect." }
  ],

  summary: `<p><strong>Put-call parity</strong> mechanically forces equal implied vol for same-strike calls/puts: a no-arbitrage fact, not an empirical claim. <strong>Smile</strong> (FX): fat tails both sides, vol jumps/regime shifts. <strong>Skew/smirk</strong> (equity): down-side feared more, via the leverage effect (genuine vol rise) plus crashophobia (pricing premium only). <strong>Frown</strong>: anticipated binary event, ATM richer than wings, the opposite of a smile. Parameterizations: \\(X/S_{0}\\), X alone, \\(X/F_{0}\\) (often preferred), or delta. <strong>Vol surface</strong> = smile × term structure. <strong>Greeks</strong>: standard BSM delta only tracks movement along the smile; the DOMINANT effect is the whole smile shifting (price-vol negative correlation), captured by the systematically LOWER minimum variance delta.</p>`,

  eli5: `<p>Imagine a single vending machine (Black-Scholes-Merton) that is supposed to sell every flavor of candy bar at a price set by one universal "candy riskiness" dial. In reality, shoppers keep paying more for the flavors at the far ends of the shelf (the deep in-the-money and deep out-of-the-money strikes) than the machine's one dial says they should, because shoppers privately believe those far-end flavors are more likely to sell out unexpectedly than the machine assumes. If you back-calculate what "riskiness" setting would make the machine's price match what people actually pay for each flavor, you get a different number for each flavor. Plot those numbers across the shelf and you get a smile-shaped or skew-shaped curve, not a flat line. A currency shopper worries equally about both ends of the shelf (a symmetric smile); a stock shopper worries mostly about the cheap-and-crashing end (a lopsided skew); and if a big announcement is coming that will send prices sharply one way or the other, shoppers pay MOST for the middle-shelf item because that's the one whose fate is truly a coin flip (a frown). Mapping back to finance: the "riskiness dial" reading is implied volatility, the shelf position is the strike price relative to the underlying price, and the curve you get instead of a flat line is the volatility smile, skew, or frown.</p>`,

  thinkLike: `<p>A derivatives trader or market-risk manager never treats "the" implied volatility as a single number for an underlying. They treat it as a whole curve (a smile) or, once maturity is added, a whole surface, and they read it the way an equity analyst reads a yield curve: the SHAPE is the signal, not any one point on it. Before quoting or hedging an option at a given strike, the practitioner's first move is to look up where that strike sits on today's smile, because pricing it off a single flat "at-the-money" volatility would misprice it relative to every other trader in the market and hand a competitor a free arbitrage. When the shape of the smile itself changes — steepens, flattens, or flips from smile to frown — the practitioner reads that as new information about market sentiment (has fear of a crash gone up? is a binary event now priced in?) separate from whether volatility LEVELS have moved.</p>
  <p>The exam tends to test this reading in three recurring ways: (1) a pure logic/no-arbitrage question about why call and put implied vols must match at the same strike (test whether you can explain the put-call-parity mechanism, not just recite the conclusion); (2) a "match the shape to the market and the cause" question that requires you to correctly pair smile/FX/vol-jumps, skew/equity/leverage+crashophobia, and frown/binary-event/bimodal, and specifically to catch the crashophobia-vs-leverage conflation trap; and (3) a Greeks question asking which delta is higher or lower and why, where the standard wrong answer swaps the direction (claims minimum variance delta is higher than BSM delta, when the source is explicit it is lower).</p>`,

  breakdown: [
    {
      title: "The three volatility-curve shapes",
      points: [
        "Smile (currency/FX options): implied vol higher at BOTH deep ITM and deep OTM strikes than ATM; caused by exchange-rate volatility jumping between regimes; weaker for long-dated options.",
        "Skew / smirk (equity options): implied vol falls as strike/price rises — higher for low strikes, lower for high strikes; caused by the leverage effect (falling equity → higher leverage → genuinely higher volatility) and crashophobia (a fear-driven pricing premium on deep OTM puts, not a claim volatility itself rises).",
        "Frown (anticipated binary/news event): implied vol is HIGHEST at-the-money and lower away from it — the mirror image of a smile, because the outcome is bimodal (two-hump) rather than fat-tailed."
      ]
    },
    {
      title: "Alternative ways to parameterize the volatility smile's x-axis",
      points: [
        "\\(X/S_{0}\\) (strike over current spot price) — the default, but shifts every time the spot price moves.",
        "X alone (strike price only) — simpler, but price-level dependent, so it is a less stable curve over time.",
        "\\(X/F_{0}\\) (strike over the forward price, same maturity) — often preferred, since the forward price is the theoretical expected future price, giving a cleaner definition of 'at-the-money.'",
        "Option delta — lets traders study volatility patterns for options beyond plain European/American calls and puts, since delta generalizes across payoff types."
      ]
    },
    {
      title: "The two competing effects on delta when equity price changes",
      points: [
        "Effect 1 — movement along the existing smile curve: as equity price changes, \\(X/S_{0}\\) changes, moving the option to a different point on the same fixed curve. This is all standard BSM delta captures.",
        "Effect 2 — the whole curve shifting up or down: because equity price and volatility are typically negatively correlated, a price move shifts the ENTIRE smile curve, not just the option's position on it. This effect dominates effect 1 in practice, and only the minimum variance delta (which is systematically lower than standard BSM delta) accounts for it."
      ]
    }
  ],

  quiz: [
    {
      q: "A call and a put on the same stock, same strike, and same maturity are both trading above their Black-Scholes-Merton model prices. What must be true about their implied volatilities?",
      options: [
        "They must be equal, because put-call parity forces the dollar mispricing to be identical for both",
        "The call's implied vol must be higher, since calls react more to underlying mispricing",
        "The put's implied vol must be higher, since puts are more sensitive to crashophobia",
        "They could differ, since implied vol depends on which side of the market is more active"
      ],
      answer: 0,
      why: "Put-call parity is a pure no-arbitrage identity that holds regardless of the true distribution, so any dollar deviation from BSM must be identical for the call and put at that strike — mechanically forcing equal implied vol. The 'call is higher,' 'put is higher,' and 'they could differ' answers all treat implied vol as if it could diverge empirically, which contradicts the arbitrage-derived parity relationship."
    },
    {
      q: "An implied volatility curve for currency options shows higher implied vol at both the lowest and highest strikes than at the at-the-money strike. What does this pattern imply about the true distribution, and what causes it?",
      options: [
        "A left-skewed distribution caused by the leverage effect",
        "Fatter tails on both sides than lognormal, caused by exchange-rate volatility jumping between regimes",
        "A bimodal distribution caused by an anticipated binary news event",
        "A thinner-tailed distribution caused by mean-reverting exchange rates"
      ],
      answer: 1,
      why: "This is the classic FX smile: symmetric excess implied vol at both wings reflects fatter tails on both sides than a lognormal distribution predicts, driven by non-constant, regime-jumping FX volatility. The 'left-skewed distribution / leverage effect' answer describes the equity skew shape (asymmetric), not the symmetric FX smile; the 'bimodal / binary news event' answer describes a frown (ATM richer, not the wings); the 'thinner-tailed / mean-reverting' answer reverses the actual finding."
    },
    {
      q: "Rubinstein's 'crashophobia' explanation for the equity volatility skew claims that:",
      options: [
        "realized equity volatility genuinely spikes whenever prices fall, due to higher leverage",
        "market participants pay a risk-aversion premium for deep out-of-the-money puts as crash protection, independent of whether volatility itself has risen",
        "leverage and crashophobia are the same underlying mechanism described two ways",
        "crashophobia only applies to currency options, not equities"
      ],
      answer: 1,
      why: "Crashophobia (Mark Rubinstein's term, post-1987 crash) is specifically about the PRICE investors will pay for crash insurance (deep OTM puts) out of fear, separate from whether realized volatility has actually changed. The 'realized volatility genuinely spikes' answer describes the leverage effect, a distinct mechanical cause; the 'same underlying mechanism' answer wrongly merges two separately named causes the reading treats as distinct; the 'only applies to currency options' answer is wrong — crashophobia is the equity-market explanation, not a currency one."
    },
    {
      q: "A biotech stock has an FDA ruling due in one week that will send the stock sharply up or down with no likely in-between outcome. Which implied-volatility pattern would you expect on that stock's options, and why?",
      options: [
        "A smile, because the outcome is uncertain in both directions",
        "A skew, because leverage effects dominate near binary events",
        "A frown, because at-the-money options are most exposed to the uncertainty of which way a bimodal outcome resolves",
        "A flat curve, because BSM already prices binary events correctly"
      ],
      answer: 2,
      why: "An anticipated binary event produces a bimodal distribution, and at-the-money options carry the highest implied vol because they are most exposed to the coin-flip uncertainty over which extreme outcome occurs — producing a frown (ATM richer than the wings), the mirror image of a smile. The 'smile' answer is the FX pattern from continuous regime-jump risk, not a discrete binary event; the 'skew' answer is the equity leverage/crashophobia pattern, unrelated to binary news; the 'flat curve / BSM prices it correctly' answer assumes a single flat volatility and cannot price this pattern at all."
    },
    {
      q: "Which of the following is NOT a standard alternative parameterization of the volatility smile's x-axis (in place of \\(X/S_{0}\\))?",
      options: [
        "Strike price X alone",
        "Strike price divided by the forward price, \\(X/F_{0}\\)",
        "Option delta",
        "Strike price divided by the risk-free rate"
      ],
      answer: 3,
      why: "The three recognized alternatives are X alone, \\(X/F_{0}\\) (often preferred since the forward price is the theoretical expected future price), and option delta (useful beyond plain European/American payoffs). 'Strike divided by the risk-free rate' is not a parameterization used in the reading — it is a fabricated distractor mixing unrelated variables."
    },
    {
      q: "When an equity's price changes, which effect on implied volatility dominates in practice, and what does that imply about the minimum variance delta versus the standard BSM delta?",
      options: [
        "Movement along the existing smile curve dominates, so minimum variance delta equals standard BSM delta",
        "The whole smile curve shifting dominates (since price and volatility are negatively correlated), so minimum variance delta is lower than standard BSM delta",
        "The whole smile curve shifting dominates, so minimum variance delta is higher than standard BSM delta",
        "Neither effect dominates consistently, so the two deltas are unrelated"
      ],
      answer: 1,
      why: "The source is explicit: the whole-curve shift (effect 2, from the negative price-volatility correlation) dominates the along-the-curve movement (effect 1), and the minimum variance delta — which incorporates that dominant shift — comes out systematically LOWER than the standard BSM delta, which ignores the shift entirely. The 'shift dominates, so minimum variance delta is higher' answer is the most common exam trap: it correctly identifies which effect dominates but reverses the direction of the delta comparison."
    }
  ],

  sources: [
    { title: "Volatility smile — Wikipedia", url: "https://en.wikipedia.org/wiki/Volatility_smile", note: "Overview of smile/skew shapes across asset classes, with the leverage-effect and crash-fear explanations for equity skew." },
    { title: "Put-Call Parity — Investopedia", url: "https://www.investopedia.com/terms/p/putcallparity.asp", note: "Walks through the no-arbitrage derivation of put-call parity used here to show implied vols must match at a given strike." },
    { title: "Implied Volatility — Investopedia", url: "https://www.investopedia.com/terms/i/iv.asp", note: "Explains how implied volatility is backed out of an option pricing model from the observed market price." },
    { title: "Fundamental Review of the Trading Book (FRTB) — BIS", url: "https://www.bis.org/bcbs/publ/d352.htm", note: "The regulatory reading (R16) that follows this one, for context on why mispriced tail risk matters to capital requirements." }
  ],

  pdf: { book: 1, query: "Actual option prices, in conjunction with the BSM model" }
});
