FRM.register({
  book: 2, reading: 28,
  session: "Credit Risk Estimation",
  title: "Structured Credit Risk",
  tagline: "R27's single-factor machinery applied to tranched products. The single most-tested idea: a 2×2 grid of how PD and correlation separately move each tranche's value and tail risk — in OPPOSITE directions for correlation.",

  teaches: `<p>Capital structure of a securitization, waterfall mechanics, key participants and their conflicts, the core comparative-statics grid (PD vs. correlation, senior vs. mezzanine vs. equity), default '01 and convexity, and implied correlation (compound vs. base).</p>`,

  why: `<p>Tranching redistributes a pool's total loss across investors of different seniority — and correlation reshapes WHO absorbs how much of that loss, without changing the pool's total expected loss much at all. This reading is where the 2008 crisis's mechanics become mathematically precise: rising correlation was bad for senior tranches and GOOD for equity — the opposite of naive "correlation=risk=bad for everyone" intuition.</p>`,

  intuition: `<p>Why does correlation help the equity tranche? Low correlation → defaults cluster tightly near their expected value (predictable, so equity is reliably wiped out a LITTLE). High correlation → outcomes polarize toward "almost no defaults" or "mass defaults" — and the "almost no defaults" scenarios are pure upside for the first-loss piece, since equity only cares about avoiding losses, not about the average. Senior tranches see the mirror image: they're fine in low-correlation, predictable scenarios, but rising correlation introduces polarized "mass default" scenarios that can actually breach their attachment point — something senior tranches almost never worried about under low correlation.</p>`,

  visual: `<div class="widget" data-widget="tranche"></div>`,

  formulas: [],

  concepts: [
    {
      name: "Capital structure of a securitization",
      def: "Senior (largest, safest, lowest coupon) → mezzanine/junior (absorbs losses after equity is wiped out, higher coupon) → equity/first-loss (smallest, absorbs first losses, residual/variable return, usually thin).",
      example: "Credit enhancement: internal (overcollateralization, excess spread) or external (monoline wraps/insurance).",
      related: ["Waterfall mechanics"]
    },
    {
      name: "Waterfall mechanics",
      def: "Cash flows to senior first, then junior/mezzanine, then equity — with an overcollateralization (OC) trigger that can divert cash away from equity if coverage tests fail.",
      example: "1,000 loans×$1M, senior/junior/equity=80/15/5%, OC trigger cap=$15M equity. At 0% default: residual $17M > $15M cap → $2M diverts to trust. At 4% default: residual $13.8M < $15M cap → equity gets full $13.8M, nothing diverts.",
      pitfall: "The OC trigger only bites once losses are severe enough that residual cash falls below the cap — a modest default rate can still leave equity fully paid, while a severe one triggers diversion away from equity toward protecting senior/junior.",
      related: ["Key participants and their conflicts"]
    },
    {
      name: "Key participants and their conflicts",
      def: "Originator → underwriter (structures & markets, warehouses collateral risk) → credit rating agencies (set attachment points — conflict: paid by issuer, wants bigger issuance) → servicer (collects/distributes cash, resolves defaults — conflict: delaying foreclosure extends fee income against investors' interest) → manager (often bears first loss to align incentives) → custodian/trustee (least conflicted).",
      pitfall: "Each participant's conflict of interest is specific and testable — don't lump them into a generic 'everyone has conflicts' answer.",
      related: [{ r: 39, label: "R39 — the same participant roles from the plumbing side" }]
    },
    {
      name: "The core comparative-statics grid",
      def: "↑ Default probability \\((\\rho\\) fixed): senior value↓ VaR↑; mezzanine mixed; equity value↓ VaR↓ (less variation). ↑ Default correlation (PD fixed): senior value↓ VaR↑; mezzanine mixed (behaves like senior at low PD, like equity at high PD); equity value↑ VaR↑.",
      intuition: "Why correlation HELPS equity: low correlation → defaults cluster near expectation (predictable, equity reliably wiped out a little); high correlation → outcomes polarize toward 'almost no defaults' or 'mass defaults,' and the 'almost no defaults' scenarios are pure upside for the first-loss piece.",
      pitfall: "Rising default correlation is BAD for senior tranches and GOOD for equity tranches — the opposite of 'correlation=more risk=bad for everyone' intuition. This asymmetry, and the mixed mezzanine case, is the single most heavily tested concept in this reading.",
      related: ["Implied correlation"],
      memory: "PD moves everyone the same direction (worse). Correlation moves senior and equity in OPPOSITE directions."
    },
    {
      name: "Default '01 and convexity",
      def: "Default sensitivities are always positive (all tranches hurt by more defaults) and largest when losses are close to a tranche's attachment point (like high option gamma at-the-money).",
      example: "Equity shows positive convexity (thin tranche, early default-rate increases hurt fast then taper); senior shows negative convexity (mirror image); mezzanine flips sign depending on default-rate regime.",
      pitfall: "Other risk factors: systematic risk (can't be diversified away even with a well-spread pool), tranche thinness (equity/mezzanine 95% and 99% VaR are close together — once hit, the hit is severe), loan granularity (fewer, bigger loans → more tail risk, same idea as R27).",
      related: [{ r: 27, label: "R27 — the granularity effect this reuses" }]
    },
    {
      name: "Implied correlation",
      def: "Directly analogous to Black-Scholes implied volatility: back out the \\(\\rho\\) that makes the model tranche price match the observed market price.",
      example: "Compound (tranche) correlation shows a 'smile' (high for junior, dips, rises again for senior); base correlation shows a 'skew' (rises monotonically with seniority).",
      pitfall: "Either pattern existing at all is evidence the one-factor Gaussian model is IMPERFECT — under a perfectly correct model, implied correlation would be flat across tranches.",
      related: [{ r: 15, label: "R15 — the volatility smile, the exact conceptual analogue" }, { r: 30, label: "R30 — implied correlation with full CDO vocabulary" }],
      memory: "Implied correlation smile/skew = the market's confession that the one-factor Gaussian copula isn't quite right — just like the vol smile confesses BSM isn't quite right."
    }
  ],

  connections: {
    from: [
      { r: 27, why: "The single-factor model built there is applied here directly to tranched loss distributions." },
      { r: 7, why: "The 2008 correlation-trading disaster described qualitatively there gets its precise mechanical explanation here." }
    ],
    to: [
      { r: 30, why: "Synthetic CDO pricing and implied correlation vocabulary (compound/base) get fully developed." },
      { r: 39, why: "Securitization mechanics continue from the plumbing/participant side." }
    ],
    confused: [
      { what: "Effect of PD vs effect of correlation on tranches", how: "PD increase hurts ALL tranches (same direction). Correlation increase hurts senior but HELPS equity (opposite directions) — the single most tested asymmetry in this reading." },
      { what: "Compound correlation vs base correlation", how: "Compound (tranche) correlation shows a smile (high-dip-high across seniority); base correlation is cumulative and shows a monotonic skew (rising with seniority)." }
    ]
  },

  misconceptions: [
    { wrong: "\"Higher default correlation is universally bad for all tranches, like higher default probability is.\"", right: "Correlation moves senior and equity tranches in OPPOSITE directions: senior value falls (more polarized mass-default scenarios threaten it), equity value RISES (more 'almost no defaults' scenarios are pure upside for the first-loss piece)." },
    { wrong: "\"Mezzanine tranches always respond to correlation like senior tranches do.\"", right: "Mezzanine behavior is MIXED — it behaves like senior at low PD/correlation regimes and like equity at high PD/correlation regimes, flipping character depending on where losses land relative to its attachment points." },
    { wrong: "\"A flat implied correlation across all tranches would be unusual and suspicious.\"", right: "The opposite — a flat implied correlation is what a PERFECTLY correct one-factor Gaussian model would produce. The smile/skew patterns actually OBSERVED are evidence the model is imperfect." },
    { wrong: "\"The equity tranche is the most senior, safest piece.\"", right: "Equity is the FIRST-LOSS piece — smallest, riskiest, absorbs losses first. Senior is largest and safest, paid first in the waterfall." }
  ],

  highYield: [
    { stars: 5, what: "The PD-vs-correlation comparative statics grid — especially correlation's OPPOSITE effect on senior vs equity.", why: "GARP's single most heavily tested concept in this reading — explicitly flagged as the crux of the whole chapter." },
    { stars: 4, what: "Waterfall mechanics and the OC trigger diverting cash from equity.", why: "A concrete, numeric worked-example style question that tests whether you track the cash flow logic correctly." },
    { stars: 4, what: "Implied correlation smile (compound) vs skew (base), and what either pattern reveals about model fit.", why: "The direct analogue to R15's volatility smile — recognizing the parallel earns synthesis points." },
    { stars: 3, what: "Participant conflicts of interest (rating agencies paid by issuer; servicer's foreclosure-delay incentive).", why: "Specific, individually testable conflicts — don't generalize them away." },
    { stars: 3, what: "Convexity by tranche: equity positive, senior negative, mezzanine mixed.", why: "A compact three-part fact, analogous to bond convexity concepts elsewhere in the curriculum." }
  ],

  recall: [
    { q: "Default correlation in a securitized pool rises from 0.1 to 0.4, with PD unchanged. What happens to the senior tranche's value and VaR, and what happens to the equity tranche's value?", a: "Senior tranche value FALLS and its VaR RISES — higher correlation polarizes outcomes toward 'mass defaults,' introducing previously-rare scenarios where losses actually breach the senior attachment point. Equity tranche value RISES — higher correlation also increases the probability of 'almost no defaults' scenarios, which are pure upside for the first-loss piece that only cares about avoiding losses, not about the average outcome." },
    { q: "Explain intuitively why the mezzanine tranche's response to rising correlation is described as 'mixed.'", a: "Mezzanine sits between equity and senior in the loss-absorption order. At low default rates it behaves like senior (relatively insulated, only hurt in genuinely bad scenarios). At high default rates it behaves like equity (already absorbing losses, benefiting from any chance of a milder outcome). Its correlation sensitivity flips character depending on which regime the current default rate sits in." },
    { q: "A trader observes that compound correlation is high for the junior tranche, dips for mezzanine, and rises again for senior (a 'smile'). What does this pattern reveal, and what would we see if the one-factor Gaussian model were perfectly correct?", a: "It reveals that the one-factor Gaussian copula model is imperfect — the market is pricing tranches in a way inconsistent with a single, uniform correlation assumption. If the model were perfectly correct, implied correlation would be FLAT across all tranches, since one true \\(\\rho\\) would fit every tranche's market price simultaneously." },
    { q: "In the waterfall example, why does a 4% default rate result in equity receiving its FULL residual cash flow while a 0% default rate results in $2M diverting away from equity?", a: "At 0% default, the pool generates a large residual cash flow ($17M) that exceeds equity's $15M OC trigger cap, so the excess ($2M) diverts to the trust rather than flowing to equity. At 4% default, the reduced pool cash flow leaves a residual ($13.8M) below the $15M cap, so no diversion occurs and equity keeps the entire (smaller) residual." }
  ],

  hooks: [
    { title: "The 2×2 grid that matters most", text: "PD up: everyone loses (same direction). Correlation up: senior loses, equity WINS (opposite directions). If you remember one grid from this whole reading, remember this asymmetry." },
    { title: "Polarization helps the gambler at the bottom", text: "High correlation polarizes outcomes into 'almost nothing happens' or 'everything happens.' The equity tranche, which only fears losses (not variance), loves the 'almost nothing' scenarios that high correlation creates more of." },
    { title: "Smile = confession of imperfection", text: "Just like BSM's volatility smile (R15) confesses the model's flat-vol assumption is wrong, the correlation smile confesses the one-factor Gaussian copula's \\(constant-\\rho\\) assumption is wrong. Same shape, same lesson, different market." }
  ],

  summary: `<p><strong>Capital structure</strong>: senior (safest) → mezzanine → equity/first-loss (riskiest). <strong>Waterfall</strong>: cash flows senior-first; OC trigger can divert cash from equity once residual falls below a cap. <strong>Comparative statics</strong>: ↑PD hurts ALL tranches; ↑correlation hurts SENIOR but HELPS EQUITY (mezzanine mixed) — the single most tested fact here, because polarized outcomes create more 'almost no defaults' upside for the first-loss piece. <strong>Convexity</strong>: equity positive, senior negative, mezzanine mixed. <strong>Implied correlation</strong>: compound shows a smile, base shows a skew — either pattern proves the one-factor Gaussian model is imperfect (a perfect model implies flat implied correlation). <strong>Participants</strong>: originator, underwriter, rating agencies (issuer-pays conflict), servicer (foreclosure-delay conflict), trustee (least conflicted).</p>`
});
