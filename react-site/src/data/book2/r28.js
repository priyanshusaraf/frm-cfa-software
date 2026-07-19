export default ({
  book: 2, reading: 28,
  session: "Credit Risk Estimation",
  title: "Structured Credit Risk",
  tagline: "R27's single-factor machinery applied to tranched products. The single most-tested idea: a 2×2 grid of how PD and correlation separately move each tranche's value and tail risk — in OPPOSITE directions for correlation.",

  teaches: `<p>This reading (Malz, <em>Financial Risk Management</em>, Ch. 9, following GARP's Schweser Reading 28) takes the single-factor Gaussian copula machinery you built in R27 for an undivided loan pool and applies it to a <strong>tranched</strong> pool — a securitization. You'll learn: what a structured credit product actually is and the family of names it goes by (ABS, MBS, CDO, CLO, CMO, CDO-squared) and the specific instrument types that fall under that umbrella (covered bonds, mortgage pass-through securities, CMOs, structured credit products); how a pool's cash flows are sliced into senior, mezzanine, and equity tranches with an explicit priority order (the "waterfall"); who the participants are in building and running one of these deals and exactly where each one's incentives diverge from investors'; a fully worked numerical waterfall example showing dollar-for-dollar how cash moves (or gets diverted) between tranches as the default rate changes, plus the exact custodian tests (the two-step "is interest sufficient, then is it above the OC cap" logic) that generate that result period by period; the core comparative-statics grid — how default probability and default correlation separately move each tranche's average value and tail risk (credit VaR), with correlation moving senior and equity tranches in OPPOSITE directions; "default '01" (an option-Greek-style sensitivity measure) and each tranche's convexity; three structural risk factors (systematic risk, tranche thinness, loan granularity); implied correlation (compound vs. base) as the exact structured-credit analogue of Black-Scholes implied volatility; and the motivations originators and investors each have for using these products in the first place.</p>`,

  why: `<p>Tranching redistributes a pool's total loss across investors of different seniority — and correlation reshapes WHO absorbs how much of that loss, without changing the pool's total expected loss much at all. This reading is where the 2008 crisis's mechanics become mathematically precise: rising correlation was bad for senior tranches and GOOD for equity — the opposite of naive "correlation=risk=bad for everyone" intuition. Understanding this grid is also what lets a risk manager answer the practical question that actually matters in a crisis: "if defaults start clustering together instead of happening independently, which of my tranche positions gets hurt, and which one — perversely — gets a paper gain?"</p>`,

  intuition: `<p>Why does correlation help the equity tranche? Think of the classic textbook comparison: flip a fair coin 1,000 times. The number of heads will almost always land very close to 500 — it would be virtually impossible to see fewer than 400 or more than 600 heads, because each flip is independent. That's the zero-correlation world: with 1,000 independent loans each having (say) a 5% annual default probability, the pool will almost always see close to 50 defaults — not 0, and not 500. The outcome is <em>predictable</em>. Low correlation → defaults cluster tightly near their expected value, so the equity (first-loss) tranche is reliably wiped out by a small, predictable amount every single time, and the senior tranche is reliably safe every single time, because "mass default" scenarios essentially never occur.</p><p>Now raise the correlation. Correlated defaults mean one borrower defaulting makes other borrowers more likely to default too (a common driver — recession, regional housing bust, common counterparty — pushes them together). The coin flips are no longer independent; it's more like flipping 1,000 coins that are all wired to tend to land the same way. Now the number of "defaults" polarizes toward two extremes: "almost none of them default" (great outcome) or "most of them default together" (catastrophic outcome) — and the "close to the expected 5%" middle outcome becomes comparatively less likely. For the SENIOR tranche, which was previously insulated by design and only cared about the catastrophic tail, high correlation is unambiguously bad: it manufactures new mass-default scenarios that can breach its attachment point, something that almost never happened under low correlation. For the EQUITY tranche, which was already going to be wiped out by a small amount in the predictable middle-of-the-road case, high correlation is a net GOOD: it creates more of the "almost no defaults" scenarios, which are pure upside for a piece of the capital structure whose downside was already fully realized in the base case anyway — equity has nothing more to lose in the bad scenarios (it's already near zero) but everything to gain in the increasingly likely good ones. The mezzanine tranche sits in between and switches character: at low default rates it is largely protected (behaves like senior — correlation hurts it) but once default rates get high enough that mezzanine is already absorbing losses, it starts behaving like equity (correlation helps it, because "few defaults" scenarios become relatively more valuable).</p>`,

  eli5: `<p>Imagine a landlord who rents out 100 apartments and sells three classes of tickets to investors for a cut of the rent collected each month, in a fixed pecking order. "Gold" ticket holders get paid first, out of the first dollars of rent that come in, and they get a modest, steady payout — they only lose money if the building is a near-total ghost town. "Silver" ticket holders get paid next, after Gold, at a slightly better rate — they lose money if vacancies get moderately bad. "Bronze" ticket holders get whatever rent is left over after Gold and Silver are paid — they get a juicy payout when the building is nearly full, but they're the first to get nothing the moment even a modest number of tenants stop paying. Now here's the twist: if tenants' ability to pay is totally unrelated to each other (a random tenant here or there just has bad luck), the vacancy rate each month is boringly predictable — always close to the historical average — so Bronze always loses a small, dependable amount and Gold is basically never touched. But if a single citywide event (a factory closing, a recession) can knock out MANY tenants at once, vacancy outcomes swing between "almost nobody left" and "half the building empty" — and now Gold ticket holders face a real, previously unthinkable risk of not getting paid, while Bronze ticket holders — who were already resigned to losing a little every month — actually benefit from the newly likely "almost everyone paid" scenarios. In finance terms: the apartment building is the loan pool, the ticket classes are tranches (senior/mezzanine/equity), and "how correlated tenants' bad luck is" is exactly the default correlation parameter that pushes senior and equity tranche values in opposite directions.</p>`,

  thinkLike: `<p>A structured-credit risk manager does not ask "is this pool risky?" in isolation — they ask "risky <em>for which tranche I hold</em>, and under which of two separate levers: more defaults, or more clustered defaults?" Those are genuinely different questions with genuinely different answers, and conflating them is the single most common exam trap. Before touching a model, a practitioner mentally separates the two comparative statics: raising the average default rate is bad news for everyone (it lowers the total cash available to distribute), while raising the correlation between defaults doesn't change the average loss much at all — it only redistributes WHO bears the loss, by making outcomes more extreme (more all-or-nothing) instead of more predictable. A risk manager holding senior tranches therefore watches correlation indicators (systemic stress, sector concentration, common triggers like a regional housing bust) even more closely than they watch the headline default rate, because correlation is what turns a "should never touch us" tranche into a real loss. A risk manager holding equity tranches does the reverse calculus: they may quietly prefer higher correlation regimes, because polarized outcomes create more scenarios where "almost nothing defaults" pays off big. On the exam, GARP tests this by handing you a scenario ("correlation rises from 0.1 to 0.4, PD unchanged — what happens to the senior tranche? the equity tranche?") and by testing whether you can correctly place the mezzanine tranche's ambiguous, regime-dependent response, plus the waterfall's mechanical cash-diversion logic (the two-step "is there enough interest, and if so, is it above the OC cap" test) and the specific, individually-testable conflicts of interest baked into each securitization participant's role.</p>`,

  visual: `<div class="widget" data-widget="tranche"></div>`,

  formulas: [
    {
      name: "Default '01 (default probability sensitivity)",
      math: "\\text{Default '01} = \\dfrac{V(\\text{PD} + 10\\text{bps}) - V(\\text{PD} - 10\\text{bps})}{2}",
      plain: "Default '01 shocks the default probability up and down by a small, fixed amount (10 basis points by convention — the same convention as DV01/PV01 for interest rates) and re-simulates each tranche's value through the credit-VaR machinery both times; the average change per shock is the tranche's marginal sensitivity to default risk.",
      derivation: `<p>This is a direct analogue of a bond's DV01 (dollar value of a 1bp rate move), just with the shocked variable swapped from interest rates to default probability. The mechanics: (1) revalue the tranche at \\(\\text{PD} + 10\\text{bps}\\) using the same simulation approach used to get the tranche's mean value and credit VaR; (2) revalue it again at \\(\\text{PD} - 10\\text{bps}\\); (3) take the (symmetric) average difference. Three qualitative results fall out of this construction directly from the reading's comparative-statics grid: (i) default '01 is <strong>always positive</strong> for every tranche, because every tranche's value falls as PD rises — there's no PD regime where a tranche benefits from more defaults, unlike the correlation case; (ii) default '01 <strong>shrinks toward zero</strong> as the default rate gets very high, because the marginal tranche is already devastated and an extra 10bps of PD barely moves its (already near-zero) value further; (iii) default '01 is <strong>largest</strong> when the default rate sits close to a tranche's attachment point — the loss level at which the tranche starts taking write-downs — exactly like how an option's gamma (rate of change of delta) peaks when the option is at-the-money, because that's where a small nudge in the underlying has the biggest effect on the payoff's slope.</p>`
    }
  ],

  concepts: [
    {
      name: "Types of structured products",
      def: "Covered bonds (NOT a true securitization — the mortgage pool stays on the originator's balance sheet, and investors have recourse to the originator itself, ranking ahead of general creditors if the bank fails); mortgage pass-through securities (a TRUE off-balance-sheet securitization — investors just receive the pool's cash flows minus servicing fees, pass-through, no tranching; mostly agency MBS with an implicit/explicit government guarantee, so the main risk is prepayment, not default); collateralized mortgage obligations (CMOs — MBS that tranche cash flows using a sequential-pay waterfall: Tranche 1 gets ALL principal plus its own interest until fully retired, then principal cascades down to Tranche 2, and so on, so Tranche 1 carries the least prepayment risk); structured credit products (tranche by CREDIT risk rather than prepayment risk — equity absorbs first losses, senior has the lowest write-down probability); and asset-backed securities (ABS — the umbrella term for any pooled, tranched, cash-flow-generating asset; MBS is a special case, and the family also includes CBOs, CDOs, CLOs, and even CDO-squared, a CDO built from other CDOs).",
      pitfall: "Covered bonds LOOK like a securitization (a pool of mortgages backing a bond) but legally are not one — the assets never leave the originator's balance sheet and are not in a bankruptcy-remote vehicle, so investors are relying on the bank's own credit, not just the pool's performance.",
      related: ["Capital structure of a securitization"]
    },
    {
      name: "Capital structure of a securitization",
      def: "Senior (largest, safest, lowest coupon) → mezzanine/junior (absorbs losses after equity is wiped out, higher coupon) → equity/first-loss (smallest, absorbs first losses, residual/variable return, usually thin).",
      example: "Credit enhancement: internal (overcollateralization, excess spread) or external (monoline wraps/insurance).",
      related: ["Waterfall mechanics"]
    },
    {
      name: "Waterfall mechanics",
      def: "Cash flows to senior first, then junior/mezzanine, then equity — with an overcollateralization (OC) trigger that can divert cash away from equity if coverage tests fail.",
      example: "1,000 loans×$1M, rate=reference(5%)+300bps, senior/junior/equity=80/15/5% of the $1B pool, spreads on senior/junior=1%/5%. At 0% default: pool cash flow=$1B×8%=$80M. Senior coupon=$800M×6%=$48M. Junior coupon=$150M×10%=$15M. Residual=$80M−$48M−$15M=$17M > $15M cap → equity capped at $15M, $2M diverts to trust. At 4% default: pool cash flow=$1B×8%×(1−0.04)=$76.8M; senior+junior still paid in full ($63M); residual=$13.8M < $15M cap → equity gets the full $13.8M, nothing diverts.",
      intuition: "The custodian applies a two-step test every period: Step 1 — is current-period interest sufficient to cover the promised senior+mezzanine coupons (call it B), i.e. is L_t − B ≥ 0? If yes, Step 2 asks whether that excess exceeds the maximum diversion cap K: if L_t − B ≥ K, then exactly K diverts to the trust and the rest (L_t − B − K) flows to equity; if L_t − B < K, the entire excess flows to equity and nothing diverts. If Step 1 fails (L_t − B < 0), all of L_t flows to bondholders anyway, the shortfall (B − L_t) is drawn from the accumulated trust account, and if the trust can't cover it, bondholders take a write-down.",
      pitfall: "The OC trigger only bites once losses are severe enough that residual cash falls below the cap — a modest default rate can still leave equity fully paid, while a severe one triggers diversion away from equity toward protecting senior/junior. Note the trust account is CUMULATIVE across periods and earns interest — it isn't reset each year, which is why front-loaded diversions (when cash flow is high, early in the deal's life) build a reserve against later shortfalls.",
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
    },
    {
      name: "Motivations for using structured products",
      def: "Originators securitize mainly for a LOWER COST OF FUNDING than retaining loans on balance sheet or selling them individually in the secondary market — diversification of the pool and the originator's underwriting reputation both help lower that cost — plus the ongoing collection of servicing fees. Investors buy tranches to get diversified access to loan-pool asset classes (mortgages, auto loans) they couldn't otherwise originate or hold directly, AND to select a specific risk-return point via tranching: equity for high risk/return, senior for low risk/return.",
      pitfall: "Some loan pools (commercial mortgage pools in particular) are hard to diversify — an element of systematic risk persists even in a large pool, which can lead investors to UNDERESTIMATE the pool's true risk if they only look at loan count rather than the degree of common exposure.",
      related: ["The core comparative-statics grid"]
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

  summary: `<p><strong>Capital structure</strong>: senior (safest) → mezzanine → equity/first-loss (riskiest). <strong>Waterfall</strong>: cash flows senior-first; OC trigger can divert cash from equity once residual falls below a cap. <strong>Comparative statics</strong>: ↑PD hurts ALL tranches; ↑correlation hurts SENIOR but HELPS EQUITY (mezzanine mixed) — the single most tested fact here, because polarized outcomes create more 'almost no defaults' upside for the first-loss piece. <strong>Convexity</strong>: equity positive, senior negative, mezzanine mixed. <strong>Implied correlation</strong>: compound shows a smile, base shows a skew — either pattern proves the one-factor Gaussian model is imperfect (a perfect model implies flat implied correlation). <strong>Participants</strong>: originator, underwriter, rating agencies (issuer-pays conflict), servicer (foreclosure-delay conflict), trustee (least conflicted). <strong>Motivations</strong>: originators want lower funding cost + servicing fees; investors want diversified access + a chosen risk-return slice.</p>`,

  breakdown: [
    {
      title: "Types of structured products",
      points: [
        "Covered bonds — on-balance-sheet, investors have recourse to the originator; NOT a true securitization.",
        "Mortgage pass-through securities — off-balance-sheet, no tranching, mostly government-guaranteed agency MBS; main risk is prepayment, not default.",
        "Collateralized mortgage obligations (CMOs) — MBS tranched via a sequential-pay waterfall (Tranche 1 gets all principal first, then Tranche 2, etc.).",
        "Structured credit products — tranched by credit risk (equity absorbs first losses, senior last).",
        "Asset-backed securities (ABS) — the umbrella category; includes MBS, CBOs, CDOs, CLOs, and CDO-squared (a CDO of CDOs)."
      ]
    },
    {
      title: "Capital structure (three tiers, in payment priority order)",
      points: [
        "Senior — largest, safest, lowest coupon; paid first.",
        "Mezzanine/junior — smaller, higher coupon, absorbs losses only after equity is wiped out; kept purposefully thin.",
        "Equity/first-loss — smallest, absorbs first losses, residual/variable (not fixed) return."
      ]
    },
    {
      title: "The waterfall custodian test (each period)",
      points: [
        "Step 1: is current-period interest ≥ promised senior+mezzanine coupons (L_t − B ≥ 0)? If no, bondholders take all of L_t and the shortfall is drawn from the trust; if the trust is insufficient, bondholders are written down.",
        "Step 2 (only if Step 1 is yes): is the excess ≥ the OC diversion cap K? If yes, K diverts to the trust and the rest flows to equity.",
        "Step 2b: if the excess is below K, all of it flows to equity and nothing diverts to the trust.",
        "Final year: no diversion at all — surviving principal, final interest, final-period recovery, and the residual trust balance all flow through the waterfall in one lump sum (senior first, then junior, then equity)."
      ]
    },
    {
      title: "Key securitization participants and their conflicts",
      points: [
        "Originator — funds/sells the loans into the trust (may be called 'sponsor' if it supplies most of the collateral).",
        "Underwriter — structures the deal (tranche sizes, coupons, triggers) and markets it; warehouses collateral risk before the deal closes.",
        "Credit rating agencies — set attachment points; paid by the issuer, so want to maximize the lower-cost senior share of issuance (issuer-pays conflict).",
        "Servicer — collects/distributes cash and resolves defaults; conflicted because delaying foreclosure extends its own fee income against investors' interest.",
        "Manager (if actively managed) — often required to bear first loss to align incentives, else has weak motivation to monitor collateral quality.",
        "Custodian/trustee — administrative (verifies documents, disburses/transfers funds); the LEAST conflicted participant."
      ]
    },
    {
      title: "Three structural risk factors beyond PD/correlation",
      points: [
        "Systematic risk — cannot be diversified away even in a well-spread pool; high pairwise correlation still threatens senior tranches.",
        "Tranche thinness — equity/mezzanine's 95% and 99% credit VaR sit close together, meaning once the tranche is breached the loss is typically severe.",
        "Loan granularity — fewer, larger loans in the pool raise tail risk versus the same total exposure spread across more, smaller loans (same idea as R27)."
      ]
    },
    {
      title: "Motivations for using structured products",
      points: [
        "Originator: lower cost of funding than retaining the loans or selling them individually (helped by pool diversification and underwriting reputation).",
        "Originator: ongoing collection of servicing fees.",
        "Investor: diversified access to loan-pool asset classes not otherwise directly available.",
        "Investor: ability to choose a specific point on the risk-return spectrum via tranche selection (equity = high risk/return, senior = low risk/return)."
      ]
    }
  ],

  quiz: [
    {
      q: "Default correlation rises from 0.1 to 0.4 with default probability unchanged. What happens to the senior tranche's value and the equity tranche's value?",
      options: [
        "Senior value falls, equity value falls",
        "Senior value falls, equity value rises",
        "Senior value rises, equity value falls",
        "Both are unaffected — correlation only affects VaR, not value"
      ],
      answer: 1,
      why: "Rising correlation polarizes outcomes toward either 'almost no defaults' or 'mass defaults.' The new mass-default scenarios threaten the senior tranche's attachment point, so its value falls; the increased probability of 'almost no defaults' scenarios is pure upside for the first-loss equity piece, so its value rises. The 'both values fall' answer is the classic 'correlation = risk = bad for everyone' trap the reading explicitly warns against."
    },
    {
      q: "A pool's default probability rises from 3% to 6% while correlation stays fixed. What is the effect on the equity tranche's value and its credit VaR?",
      options: [
        "Value falls, VaR rises",
        "Value rises, VaR falls",
        "Value falls, VaR falls (less variation)",
        "Value rises, VaR rises"
      ],
      answer: 2,
      why: "Rising PD (correlation fixed) hurts ALL tranches' value, including equity — more defaults means less cash reaches the residual claimant. But equity's VaR actually falls, because at a higher default rate equity is consistently wiped out near its floor with less variation around that low outcome, unlike the senior tranche whose VaR rises as previously-safe scenarios start to be threatened."
    },
    {
      q: "In the 1,000-loan waterfall example (senior/junior/equity = 80/15/5% of a $1B pool, reference rate 5%, senior spread 1%, junior spread 5%, OC cap = $15M), what is the residual cash flow at a 0% default rate, and how much diverts to the trust?",
      options: [
        "Residual = $17M; $2M diverts to trust",
        "Residual = $13.8M; nothing diverts",
        "Residual = $32M; $17M diverts to trust",
        "Residual = $17M; $17M diverts to trust"
      ],
      answer: 0,
      why: "Pool cash flow = $1B × 8% = $80M. Senior coupon = $800M × 6% = $48M; junior coupon = $150M × 10% = $15M. Residual = $80M − $48M − $15M = $17M, which exceeds the $15M equity cap, so $2M diverts to the trust and equity receives $15M. The '$13.8M residual, nothing diverts' answer is the 4%-default-rate result, not the 0%-default-rate result — a common mix-up between the two scenarios in the worked example."
    },
    {
      q: "Which participant in the securitization process is described as facing the LEAST conflict of interest?",
      options: [
        "Credit rating agency",
        "Servicer",
        "Custodian/trustee",
        "Manager of an actively managed pool"
      ],
      answer: 2,
      why: "The custodian/trustee plays a purely administrative role (verifying documents, disbursing and transferring funds) with no direct stake in deal size, fee income tied to delay, or active portfolio decisions — making it the least conflicted. Rating agencies are paid by the issuer (wants bigger issuance), servicers profit from delaying foreclosure, and managers may under-monitor collateral absent an explicit first-loss incentive."
    },
    {
      q: "A trader observes that compound (tranche) correlation is high for the equity tranche, dips for mezzanine, and rises again for senior — a 'correlation smile.' What does this pattern most directly reveal?",
      options: [
        "The pool's default probability is systematically underestimated",
        "The one-factor Gaussian copula model does not perfectly fit observed market prices",
        "The servicer is delaying foreclosures on defaulted loans",
        "The OC trigger cap has been breached"
      ],
      answer: 1,
      why: "If the one-factor Gaussian copula were a perfectly correct model, a single true correlation would price every tranche correctly and implied correlation would be flat across tranches. A smile (or a base-correlation skew) existing at all is evidence the model doesn't fully capture the market's pricing of tail dependence — it says nothing directly about PD estimation, servicer behavior, or OC triggers."
    },
    {
      q: "Which structured product type is NOT a true securitization, because the underlying assets remain on the originator's balance sheet and investors retain recourse to the originator?",
      options: [
        "Mortgage pass-through security",
        "Collateralized mortgage obligation (CMO)",
        "Covered bond",
        "Collateralized loan obligation (CLO)"
      ],
      answer: 2,
      why: "Covered bonds keep the mortgage pool on the originator's own balance sheet (not in a bankruptcy-remote SPV) and give investors priority recourse against the originator itself if it defaults — the opposite of a true, off-balance-sheet securitization. Pass-throughs, CMOs, and CLOs are all genuine off-balance-sheet structures where investors are paid purely from pool performance."
    }
  ],

  sources: [
    { title: "Collateralized Debt Obligation (CDO) — Wikipedia", url: "https://en.wikipedia.org/wiki/Collateralized_debt_obligation", note: "Background on tranching, the waterfall, and how CDOs (and the equity/mezzanine/senior structure) relate to the 2008 crisis." },
    { title: "Asset-Backed Security (ABS) — Investopedia", url: "https://www.investopedia.com/terms/a/asset-backedsecurity.asp", note: "Plain-language overview of pooling, tranching, and credit enhancement mechanics for ABS/MBS generally." },
    { title: "Mortgage-Backed Security (MBS) — Investopedia", url: "https://www.investopedia.com/terms/m/mbs.asp", note: "Covers pass-through structures and CMOs, useful for contrasting prepayment risk (MBS) against credit-tranching risk (structured credit products)." },
    { title: "Credit derivatives — BIS", url: "https://www.bis.org/publ/qtrpdf/r_qt0312.htm", note: "BIS background on the growth and mechanics of structured credit and correlation products from the regulator's perspective." }
  ],

  pdf: { book: 2, query: "Securitization is basically the pooling of credit-sensitive assets" }
});
