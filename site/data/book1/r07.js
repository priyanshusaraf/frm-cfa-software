FRM.register({
  book: 1, reading: 7,
  session: "Correlation Risk",
  title: "Correlation Basics",
  tagline: "Study Session 1 treated correlation as an input you already have. Now: where does correlation risk come from, how do you price bets ON correlation, and how did correlation misunderstanding help cause 2008?",

  teaches: `<p>This reading surveys correlation as a risk in its own right: portfolio mean/variance foundations, wrong-way risk in CDS, correlation options and swaps, how correlation drives VaR, the 2008 correlation-trading mechanism, and concentration/systemic risk. Readings 8-9 go deep on the empirics and modeling machinery.</p>`,

  why: `<p>Diversification is the only "free lunch" in finance — but its size depends entirely on correlation, which is not a fixed physical constant. Traders built entire product lines betting explicitly on correlation (correlation swaps, tranche trades). When those bets went wrong in 2005 and 2008, correlation misunderstanding was at the center — not just a side detail. This reading is the origin story for why correlation gets its own three-reading study session.</p>`,

  intuition: `<p>Correlation shows up in two very different guises: (1) as an INPUT that shrinks portfolio risk (the diversification benefit), and (2) as an ASSET in itself that products are built to bet on. Wrong-way risk is the nasty case where these two roles collide — your hedge's payout probability is correlated with your hedge's ability to pay, so the insurance evaporates exactly when you need it.</p>`,

  visual: `<div class="widget" data-widget="divers"></div>`,

  formulas: [
    { name: "Two-asset portfolio variance", math: "\\sigma_{P}^{2} = w_{X}^{2}\\sigma_{X}^{2} + w_{Y}^{2}\\sigma_{Y}^{2} + 2w_{X}w_{Y}\\sigma_{X}\\sigma_{Y}\\rho", note: "The foundation formula — every diversification, VaR, and factor-correlation argument in the curriculum traces back to this." },
    { name: "Correlation swap payoff", math: "\\text{Notional}\\times(\\rho_{\\text{realized}} - \\rho_{\\text{fixed}})", note: "A pure bet on realized average pairwise correlation vs a fixed strike." }
  ],

  concepts: [
    {
      name: "Portfolio mean/variance foundation",
      def: "\\(\\sigma_P^{2}\\) = \\(w_X^{2}\\sigma_X^{2}\\) + \\(w_Y^{2}\\sigma_Y^{2}\\) + \\(2w_Xw_Y\\sigma_X\\sigma_Y\\rho\\) — the return/risk ratio improves as \\(\\rho\\) falls.",
      pitfall: "This is a SMOOTH, continuous relationship, not a step function — diversification benefit exists well before \\(\\rho\\) reaches −1. A drop from 0.9 to 0.5 already meaningfully improves the ratio; don't assume benefit only appears at extreme negative correlation.",
      related: [{ r: 1, label: "R1 — the risk being diversified" }, { r: 81, label: "R81 — factor correlations reuse this exact logic" }]
    },
    {
      name: "Wrong-way risk (WWR) in CDS",
      def: "The reference asset and the CDS-seller counterparty are positively correlated, so the CDS is most likely to be needed exactly when the seller is least able to pay.",
      intuition: "You bought insurance from a company whose fortunes rise and fall with the very thing you insured — the payout and the payer's solvency are the same bet, wearing different clothes.",
      pitfall: "The CDS spread-vs-correlation relationship is NON-monotonic: near \\(\\rho\\) = −1 the spread can rise slightly, because simultaneous default of both becomes nearly impossible, but replacement-cost risk after a single default still bites.",
      related: [{ r: 32, label: "R32 — wrong-way risk generalized to all counterparty exposure" }, { r: 37, label: "R37 — CVA's wrong-way adjustment" }],
      memory: "WWR = 'the fire insurance company is next door to the fire.'"
    },
    {
      name: "Correlation options and correlation swaps",
      def: "For almost every multi-asset correlation strategy, LOWER correlation → HIGHER option price (more dispersion, better chance of a favorable payout).",
      example: "Buyer pays fixed 0.2, notional $1M, 3 assets \\(\\rho_{2}\\),\\(_{1}=0.6\\), \\(\\rho_{3}\\),\\(_{1}=0.2\\), \\(\\rho_{3}\\),\\(_{2}=0.04\\) → realized \\(\\rho\\) = 0.28 → payoff = $1M×(0.28−0.20) = $80,000.",
      counter: "The one notable EXCEPTION: an option on the WORSE-OF two assets — there, LOWER correlation reduces the price (more dispersion increases the chance one asset is bad, hurting a worse-of payoff). Quanto options: lower correlation between underlying and FX rate → HIGHER quanto price.",
      pitfall: "Memorize the exception, not just the rule — 'lower correlation, higher price' fails for worse-of options specifically.",
      related: ["Portfolio mean/variance foundation"]
    },
    {
      name: "VaR and correlation",
      def: "VaR increases as correlation between portfolio assets increases — diversification benefit shrinks as \\(\\rho\\)→1. Basel requires capital ≥ 3× the 10-day VaR for trading-book assets.",
      example: "$8M asset A \\((\\sigma =1.5\\)%), $4M asset B \\((\\sigma =2\\)%), \\(\\rho =0.6\\), 99% (z=2.33), 10-day: build covariance matrix → \\(\\sigma_P\\) → 10-day VaR ≈ $1.325M → required capital ≈ 3×$1.325M ≈ $3.97M.",
      related: [{ r: 1, label: "R1 — the VaR formula being fed correlated inputs" }, { r: 5, label: "R5 — diversified vs undiversified VaR" }]
    },
    {
      name: "Correlation and the 2008 crisis — the CDO tranche mechanism",
      def: "Hedge funds went long the CDO equity tranche, short the mezzanine tranche, believing the position was correlation-hedged.",
      example: "May 2005, GM/Ford downgraded to junk: equity tranche spreads INCREASED (losses on the long leg) while mezzanine tranche CORRELATIONS DECREASED, lowering mezzanine spreads too (the short leg's spread should have risen to profit them — instead it fell). Both legs lost money simultaneously — the opposite of what a hedge should do.",
      pitfall: "Root cause: tranche correlation dynamics were poorly understood by the copula models in use (R9). This is a frequently tested scenario question — know the direction of BOTH legs' moves.",
      related: [{ r: 9, label: "R9 — the Gaussian copula models that failed here" }, { r: 28, label: "R28 — structured credit tranche mechanics" }],
      memory: "Both legs lost — a 'hedge' that hedges nothing when correlation itself moves against you."
    },
    {
      name: "Correlation, concentration & systemic risk",
      def: "Concentration ratio = 1/(number of equally-sized exposures). Lower concentration ratio AND lower default correlation BOTH reduce joint (worst-case) probability of default.",
      example: "$5M loan, 5% PD, concentration ratio 1.0 → EL = $250,000. Split into two $2.5M loans, 5% PD each, correlation 1.0 (concentration ratio 0.5) → EL still $250,000 (replicates single-loan case). Drop correlation to 0.5 → EL falls; drop to 0 → EL falls to just $12,500 (0.05×0.05×$5M).",
      pitfall: "Diversifying the NUMBER of exposures (lower concentration ratio) does nothing by itself if correlation stays at 1 — you need BOTH lower concentration AND lower correlation for the worst-case loss to actually fall.",
      related: [{ r: 27, label: "R27 — portfolio credit risk formalizes this with the single-factor model" }],
      memory: "Splitting one big loan into many correlated small loans is diversification theater — EL is unchanged until correlation actually drops."
    }
  ],

  connections: {
    from: [
      { r: 5, why: "Diversified VaR needed a correlation matrix as an input; this reading asks where that number actually comes from and what it costs to get wrong." }
    ],
    to: [
      { r: 8, why: "The empirical behavior of correlation (regimes, mean reversion) is the next natural question after establishing it matters." },
      { r: 9, why: "Copulas are the actual machinery for building joint distributions once you accept correlation is central and messy." },
      { r: 27, why: "Default correlation and concentration ratio reappear as the core drivers of portfolio credit risk tails." }
    ],
    confused: [
      { what: "Wrong-way risk vs simple counterparty risk", how: "Ordinary counterparty risk is 'can they pay'; wrong-way risk specifically means their ability to pay is CORRELATED with the very event that triggers your claim." },
      { what: "Concentration ratio vs default correlation", how: "Concentration ratio is about the NUMBER/size distribution of exposures; default correlation is about how those exposures move together. Both must fall together to meaningfully reduce worst-case loss." }
    ]
  },

  misconceptions: [
    { wrong: "\"Diversification benefit only exists near \\(\\rho\\) = −1.\"", right: "It's continuous — even modest reductions (0.9→0.5) meaningfully improve the return/risk ratio. Don't wait for extreme correlation to expect benefit." },
    { wrong: "\"Lower correlation always raises a correlation-sensitive option's price.\"", right: "True for most multi-asset payoffs, but reversed for options on the WORSE-OF two assets, and for quanto options the relevant correlation is between the underlying and FX." },
    { wrong: "\"Splitting a large exposure into many smaller ones always reduces expected loss.\"", right: "Only if default correlation ALSO falls. At correlation = 1, splitting changes nothing — EL is identical to the single large exposure." },
    { wrong: "\"The 2008 CDO tranche trade lost money because the long leg alone went bad.\"", right: "BOTH legs lost simultaneously — mezzanine correlation fell (lowering its spread, hurting the short position) while equity spreads rose (hurting the long position). The 'hedge' failed on both sides at once." }
  ],

  highYield: [
    { stars: 5, what: "The 2008 correlation-trading mechanism: which leg moved which way and why.", why: "A frequently tested scenario question requiring you to track two simultaneous, counter-intuitive moves." },
    { stars: 5, what: "Portfolio variance formula and the continuous nature of diversification benefit.", why: "Foundational — feeds VaR, factor theory, and credit portfolio questions across the whole curriculum." },
    { stars: 4, what: "Wrong-way risk definition and the non-monotonic spread-correlation relationship.", why: "Reused conceptually in counterparty risk (Book 2) and CVA." },
    { stars: 4, what: "Concentration ratio + default correlation jointly determining EL (the worked $5M/$2.5M example).", why: "A clean numeric example that GARP likes to vary." },
    { stars: 3, what: "Correlation options: general rule + the worse-of exception + quanto direction.", why: "Memorize the exception — it's the trap." }
  ],

  recall: [
    { q: "Why is wrong-way risk described as insurance that evaporates exactly when needed?", a: "The CDS protection seller's solvency is positively correlated with the reference entity's default — so the moment the reference defaults (protection is needed), the seller is also more likely to be unable to pay." },
    { q: "In the 2008 tranche trade, why did the mezzanine (short) leg lose money instead of gaining?", a: "Mezzanine tranche correlation FELL after the GM/Ford downgrade, which lowered mezzanine spreads. A short position profits when spreads RISE; falling spreads meant the short leg lost money too — the opposite of what the 'hedge' was supposed to do." },
    { q: "A bank splits a $10M loan into ten $1M loans, same total PD, but default correlation stays at 1.0. Does expected loss change?", a: "No — at correlation 1, the ten small loans behave exactly like the one large loan in every default scenario. Concentration ratio fell but correlation didn't, so worst-case loss is unchanged." },
    { q: "Name the one payoff type where lower asset correlation LOWERS the option price, and explain why.", a: "An option on the worse-of two assets. Lower correlation increases dispersion, raising the chance that AT LEAST ONE asset performs badly — which is exactly the scenario that hurts a worse-of payoff, so the price falls rather than rises." }
  ],

  hooks: [
    { title: "Two lost legs", text: "2008's tranche trade: 'long equity, short mezz, correlation-hedged' sounds safe. Remember it as TWO SEPARATE LOSSES: equity spreads UP (long leg loses), mezz spreads DOWN (short leg loses too). A hedge where both legs lose is the whole lesson." },
    { title: "Insurance next door to the fire", text: "Wrong-way risk: your insurer's office is next door to the building you insured. When it burns, so does your insurer's ability to pay." },
    { title: "Splitting doesn't help if they're glued together", text: "Ten loans glued by correlation=1 behave like one loan. Diversification needs both MORE names AND LOWER correlation — one alone is theater." }
  ],

  summary: `<p><strong>Portfolio variance</strong> \\(\\sigma_P^{2}\\) = \\(w_X^{2}\\sigma_X^{2}\\) + \\(w_Y^{2}\\sigma_Y^{2}\\) + \\(2w_Xw_Y\\sigma_X\\sigma_Y\\rho\\) — diversification benefit is continuous, not step-like. <strong>Wrong-way risk</strong>: reference asset and counterparty solvency positively correlated; spread-correlation relationship is non-monotonic. <strong>Correlation products</strong>: lower \\(\\rho\\) → higher option price generally, EXCEPT worse-of options (reversed) and quanto options (lower \\(\\rho\\) between underlying/FX → higher price). <strong>VaR rises with correlation</strong>; Basel requires capital ≥ 3× 10-day VaR. <strong>2008 mechanism</strong>: long equity tranche + short mezzanine, both legs lost simultaneously as equity spreads rose and mezzanine correlation (and spreads) fell — the copula models (R9) misunderstood tranche correlation dynamics. <strong>Concentration + default correlation</strong> must BOTH fall to reduce worst-case loss; splitting exposures alone (correlation unchanged) does nothing.</p>`
});
