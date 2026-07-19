FRM.register({
  book: 1, reading: 15,
  session: "Term Structures & Volatility",
  title: "Volatility Smiles",
  tagline: "If Black-Scholes-Merton were exactly right, implied volatility would be flat across all strikes. It isn't — and the SHAPE of the departure tells you what the market believes about the true distribution.",

  teaches: `<p>Readings 11-14 built term-structure models for rates. This reading pivots to a parallel idea for options generally: put-call parity forces equal implied vol for calls and puts at the same strike; the three named shapes (smile, skew, frown) each imply a different true distribution and have different causes; alternative parameterizations and vol surfaces; and the impact on the Greeks.</p>`,

  why: `<p>If markets truly believed lognormal returns (BSM's assumption), every option on the same underlying and maturity would trade at the same implied volatility regardless of strike. They don't — and the specific pattern of disagreement is a direct, tradeable readout of what the market believes about fat tails, skewness, and jump risk. This is BSM's constant-volatility assumption failing exactly the way Reading 11 warned it would for bonds — now for options generally.</p>`,

  intuition: `<p>Put-call parity is a pure no-arbitrage relationship — it holds regardless of the true underlying distribution. So any deviation of market price from the BSM price must be IDENTICAL in dollar terms for a call and a put at the same strike/maturity. This mechanically FORCES implied volatility for a call and put at the same strike to be equal — not an empirical observation, a model-independent fact.</p>
  <p>The shape itself is diagnostic: a <strong>smile</strong> (FX options) means fatter tails on BOTH sides than lognormal — driven by volatility jumps/regime shifts. A <strong>skew/smirk</strong> (equity options) means left-skewed risk — down moves feared more than up moves — driven by the leverage effect (falling equity → higher leverage → higher vol) AND "crashophobia" (post-1987 fear premium on OTM puts, which is about the PRICE of protection, not a claim that realized volatility itself rises). A <strong>frown</strong> means an anticipated binary/news event making the outcome bimodal — the mirror image of a smile.</p>`,

  visual: `<div class="widget" data-widget="smile"></div>`,

  formulas: [],

  concepts: [
    {
      name: "Put-call parity forces equal implied vol",
      def: "Because put-call parity is a pure no-arbitrage relationship (holds regardless of the true underlying distribution), any deviation of market price from the BSM price must be identical in dollar terms for a call and a put at the same strike/maturity.",
      pitfall: "This forces implied volatility for a call and put at the same strike to be EQUAL — a mechanical, model-independent fact, not an empirical observation. If a question implies calls and puts at the same strike could have different implied vols, that's wrong by construction.",
      related: ["Smile, skew, and frown shapes"]
    },
    {
      name: "Smile, skew, and frown — three shapes, three stories",
      def: "Smile (FX options): fatter tails on BOTH sides than lognormal, caused by volatility jumps/regime shifts, less pronounced for long-dated options. Skew/smirk (equity options): left-skewed — down moves more likely/severe than up, caused by the leverage effect and crashophobia. Frown (anticipated binary event): ATM implied vol HIGHER than away-from-the-money — the opposite of a smile, reflecting a bimodal (not fat-tailed) outcome distribution.",
      pitfall: "'Crashophobia' is about the PRICE of protection (deep OTM puts carry a fear premium) — NOT a claim that actual realized volatility rises when prices fall. Don't conflate the leverage effect's story (volatility genuinely does rise) with crashophobia's story (a risk-aversion premium, independent of whether volatility itself changes).",
      related: [{ r: 11, label: "R11 — BSM's constant-volatility assumption failing, the root cause" }],
      memory: "Smile = FX fears both directions. Skew = equities fear down more (leverage + crashophobia). Frown = a coin-flip news event."
    },
    {
      name: "Alternative smile parameterizations and vol surfaces",
      def: "Instead of \\(X/S_{0}\\), traders sometimes use X alone (less stable, price-level dependent), \\(X/F_{0}\\) (forward price — often preferred since forward = theoretical ATM expectation), or option delta (works even for non-European/American payoffs).",
      example: "A volatility SURFACE = volatility smile (across strikes) × volatility term structure (across maturities), combined into one 3-D pricing tool.",
      related: ["Impact on the Greeks"]
    },
    {
      name: "Impact on the Greeks — minimum variance delta",
      def: "Two competing effects when equity price changes: (1) moving along the existing smile curve (as \\(X/S_{0}\\) changes), and (2) the WHOLE curve shifting up or down (since equity price and volatility are typically negatively correlated).",
      pitfall: "Effect (2) DOMINATES in practice. The minimum variance delta incorporates this whole-curve shift and is LOWER than the standard BSM delta, which ignores it entirely — a common trap is assuming standard BSM delta already captures this.",
      related: ["Smile, skew, and frown"],
      memory: "Standard delta only walks along the smile; minimum variance delta also accounts for the smile itself moving."
    }
  ],

  connections: {
    from: [
      { r: 11, why: "BSM's constant-volatility assumption was already flagged as one of three reasons it fails for bonds; here it fails again for options generally." },
      { r: 14, why: "The level-dependent volatility models (CIR, lognormal) hinted that constant volatility is an unrealistic simplification — the smile is the market's verdict on the same issue." }
    ],
    to: [
      { r: 16, why: "FRTB's capital framework must account for the fact that a single flat volatility assumption misprices tail risk across strikes." }
    ],
    confused: [
      { what: "Smile vs skew vs frown", how: "Smile: symmetric fat tails both directions (FX). Skew: asymmetric, down-side fear (equity, leverage + crashophobia). Frown: ATM richer than wings (anticipated binary event) — the inverse shape of a smile." },
      { what: "Leverage effect vs crashophobia", how: "Leverage effect: falling equity price mechanically raises financial leverage, which genuinely raises volatility. Crashophobia: a risk-aversion PRICING premium on deep OTM puts, independent of whether realized volatility actually changes." },
      { what: "Standard BSM delta vs minimum variance delta", how: "Standard delta moves only along the existing smile curve; minimum variance delta also accounts for the smile curve itself shifting (dominant effect), making it systematically lower." }
    ]
  },

  misconceptions: [
    { wrong: "\"A call and put at the same strike can have meaningfully different implied volatilities.\"", right: "Put-call parity mechanically forces them to be equal — this is a no-arbitrage fact independent of the true distribution, not an empirical claim that can be violated." },
    { wrong: "\"Crashophobia means realized volatility spikes whenever prices fall.\"", right: "Crashophobia is about the PRICE of protection (a risk-aversion premium on deep OTM puts) — a separate story from the leverage effect, where volatility genuinely does rise as leverage increases." },
    { wrong: "\"The standard BSM delta already accounts for the smile shifting as the underlying price moves.\"", right: "Standard delta only captures movement ALONG the existing smile curve. The dominant effect — the whole curve shifting because vol and price are negatively correlated — requires the minimum variance delta, which is systematically lower." },
    { wrong: "\"A frown pattern is just a weaker version of a smile.\"", right: "It's the opposite shape: ATM implied vol is HIGHER than the wings, reflecting an anticipated bimodal outcome (e.g., a binary news event) rather than fat tails on both sides." }
  ],

  highYield: [
    { stars: 4, what: "Put-call parity forcing equal implied vol at the same strike — mechanical, not empirical.", why: "A precise, frequently tested no-arbitrage fact." },
    { stars: 4, what: "Smile (FX) vs skew (equity) vs frown (binary event) — shapes, markets, and causes.", why: "The core conceptual map of this reading; causes (leverage effect vs crashophobia) are commonly conflated and tested separately." },
    { stars: 4, what: "Minimum variance delta < standard BSM delta because the whole smile shifts (dominant effect).", why: "A precise, testable Greek-adjustment fact." },
    { stars: 3, what: "Volatility surface = smile × term structure.", why: "A compact definitional fact, easy points." }
  ],

  recall: [
    { q: "Why must a call and a put at the same strike and maturity have the same implied volatility?", a: "Put-call parity is a model-independent, no-arbitrage relationship. Any gap between market and BSM price must be identical in dollar terms for the call and put, which mechanically forces their implied volatilities (backed out from that same price gap) to match." },
    { q: "An equity index shows a pronounced downside skew. Name the two distinct causes and explain the difference between them.", a: "Leverage effect: a falling equity price mechanically raises the firm's financial leverage, genuinely increasing volatility. Crashophobia: a risk-aversion premium embedded in the PRICE of deep OTM puts (post-1987 fear of another crash), independent of whether realized volatility itself has risen." },
    { q: "Why is the minimum variance delta systematically lower than the standard BSM delta for equity options?", a: "Standard BSM delta only captures the effect of moving along the existing smile curve as price changes. But equity price and volatility are typically negatively correlated, so the WHOLE smile curve tends to shift when price moves — this dominant second effect is captured only by the minimum variance delta, pulling it below standard delta." },
    { q: "A currency pair shows a symmetric smile while an equity index shows a downside skew. What does this difference say about each market's implied distribution?", a: "The FX smile implies fat tails on BOTH sides relative to lognormal — extreme moves are seen as more likely in either direction (volatility jumps/regime shifts). The equity skew implies a left-skewed distribution — down moves are seen as more likely/severe than up moves, driven by leverage and crashophobia." }
  ],

  hooks: [
    { title: "Three faces, three moods", text: "Smile: nervous about both directions (FX). Skew/smirk: nervous specifically about falling (equities — leverage + crashophobia). Frown: expecting a coin-flip verdict (binary news event) — the opposite curvature of a smile." },
    { title: "Parity's iron law", text: "Put-call parity is the law that says a call and put at the same strike must quote the same implied vol — no exceptions, no empirical wiggle room, because it's arbitrage, not opinion." },
    { title: "The whole smile moves", text: "Standard delta watches you walk along a hallway (the smile curve). Minimum variance delta notices the whole hallway is also sliding sideways — and that sliding is usually the bigger effect." }
  ],

  summary: `<p><strong>Put-call parity</strong> mechanically forces equal implied vol for same-strike calls/puts — a no-arbitrage fact, not an empirical claim. <strong>Smile</strong> (FX): fat tails both sides, vol jumps/regime shifts. <strong>Skew/smirk</strong> (equity): down-side feared more — leverage effect (genuine vol rise) + crashophobia (pricing premium only). <strong>Frown</strong>: anticipated binary event, ATM richer than wings — opposite of a smile. Parameterizations: \\(X/S_{0}\\), X alone, \\(X/F_{0}\\) (often preferred), or delta. <strong>Vol surface</strong> = smile × term structure. <strong>Greeks</strong>: standard BSM delta only tracks movement along the smile; the DOMINANT effect is the whole smile shifting (price-vol negative correlation), captured by the systematically LOWER minimum variance delta.</p>`
});
