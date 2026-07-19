FRM.register({
  book: 2, reading: 37,
  session: "Counterparty Risk Management",
  title: "CVA",
  tagline: "The capstone quant reading of Session 6: multiplies R36's exposure profiles by R25's default probabilities into a single price for counterparty risk.",

  teaches: `<p>The base CVA formula, CVA as a running spread, how credit spread/recovery assumptions move CVA, netting and collateral inside CVA, MPoR scaling, incremental vs. marginal CVA, bilateral CVA (BCVA), and wrong-way/right-way risk with modeling approaches.</p>`,

  why: `<p>Structurally, everything in this reading is a variation on one formula — CVA = \\(- \\Sigma (exposure\\) × default probability × loss rate, discounted). Understanding this as EL's derivatives-specific cousin (rather than a new concept) makes the whole reading tractable.</p>`,

  intuition: `<p>CVA is EL = PD×LGD×EAD, generalized to a TIME SERIES of exposures instead of one fixed EAD. Each future date has its own expected exposure EE(t) and default probability q(t); CVA sums the discounted products across all dates. Everything else — netting's reduction of exposure, collateral's reduction of EE, MPoR scaling — is a variation on how exactly EE(t) and q(t) get computed before you plug them into this one sum.</p>
  <p>The trickiest asymmetry: incremental CVA answers "what does adding THIS new trade change CVA by" (pricing decision); marginal CVA answers "how much of the TOTAL netted CVA is attributable to each existing trade" (ex-post attribution). Same underlying machinery, different question, frequently confused.</p>`,

  visual: `<div class="widget" data-widget="exposure"></div>`,

  formulas: [
    { name: "Base CVA (no WWR, no netting, no collateral)", math: "CVA = -(1-RR) \\times \\Sigma_{i} EE(t_{i}) \\times q_{i} \\times DF(t_{i})", note: "q_i = probability of default in interval i. Negative sign because CVA is a cost." },
    { name: "MPoR scaling (square-root-of-time)", math: "CVA(20-day MPoR) \\approx CVA(10-day MPoR) \\times \\sqrt{2}", note: "At MPoR ≈ 40 days, collateralized CVA is roughly HALF the uncollateralized CVA." },
    { name: "Bilateral CVA (BCVA)", math: "\\text{BCVA} = \\text{CVA(counterparty)} + \\text{DVA(institution)}", note: "Can be positive if DVA > CVA. Symmetric: Party 1's BCVA = −Party 2's BCVA." },
    { name: "BCVA as a spread", math: "\\text{BCVA spread} = -(\\text{counterparty spread}\\times \\text{EPE}) - (-\\,\\text{institution spread}\\times \\text{ENE})", note: "EPE=5%, ENE=3%, counterparty spread=300bps, institution spread=200bps → BCVA=(−5%×300)−(−3%×200)=−9bps." }
  ],

  concepts: [
    {
      name: "The base CVA formula",
      def: "CVA = \\(- (1- RR)\\times \\Sigma_{i}\\) \\(EE(t_{i})\\times q_{i}\\times DF(t_{i})\\). Assumptions behind the running-spread shortcut: EPE constant over the profile, PD constant over the profile, EE/PD symmetric over the profile.",
      related: [{ r: 36, label: "R36 — EE, the exposure metric this formula multiplies" }, { r: 25, label: "R25 — the default probability qᵢ this formula multiplies" }]
    },
    {
      name: "How credit spread & recovery assumptions move CVA",
      def: "↑ credit spread → ↑ CVA, but NONLINEARLY (PD is capped at 100%; right at default, CVA actually ticks down slightly, then hits zero in default itself).",
      example: "Curve shape: upward-sloping spread curve → LOWER CVA than flat or downward-sloping (front-loaded low risk). ↑ recovery rate → ↑ implied PD but ↓ CVA overall (less loss-given-default dominates).",
      pitfall: "A higher ACTUAL recovery (vs. settled recovery) at the same settled assumption → lower CVA — don't confuse the ASSUMED recovery rate used in calibration with the ACTUAL recovery realized.",
      related: [{ r: 25, label: "R25 — RR/PD relationship in hazard rate calibration" }]
    },
    {
      name: "Netting and collateral inside CVA",
      def: "Netting reduces CVA because it reduces exposure at settlement. Collateral reduces CVA by shrinking EE (not by changing default probability).",
      pitfall: "Evaluate the CHANGE in CVA from a new trade, not just its standalone CVA, when deciding if it's worth doing — this is exactly the incremental CVA concept. Minimum transfer amount and threshold INCREASE CVA (uncollateralized exposure windows); higher initial margin (a 'negative threshold') DECREASES CVA. CVA with netting is never higher than CVA without netting (netting can't increase exposure). Netting benefit SHRINKS with transaction size — incremental CVA approaches standalone CVA as the new trade gets large relative to the existing book.",
      related: ["Incremental CVA vs. marginal CVA"]
    },
    {
      name: "Incremental CVA vs. marginal CVA",
      def: "Incremental CVA: what does adding THIS new trade change CVA by, given netting with the existing book? (pricing a new trade). Marginal CVA: how much of the TOTAL netted CVA is attributable to each individual trade? (ex-post attribution, understanding which existing trades drive CVA).",
      pitfall: "This is a frequently confused pair. If the question says 'which trades are driving this counterparty's CVA,' that's MARGINAL; if it says 'should we do this new trade,' that's INCREMENTAL.",
      related: [],
      memory: "Incremental = should we ADD this trade? Marginal = which EXISTING trades are the problem?"
    },
    {
      name: "Bilateral CVA (BCVA)",
      def: "BCVA = CVA(of counterparty) + DVA(of the institution, its 'own CVA') — both sides can default.",
      pitfall: "Implications: (1) BCVA can be POSITIVE if DVA>CVA (institution riskier than counterparty) — standalone unilateral CVA can only be negative; (2) BCVA is symmetric — if Party 1's BCVA is +X, Party 2's is −X; (3) netting can be a DISADVANTAGE under BCVA if the institution's own DVA dominates, since without netting the institution could selectively settle only its favorable (positive MtM) contracts; (4) in theory, if both sides agree on parameters, all market BCVAs net to zero.",
      example: "EPE=5%, ENE=3%, counterparty spread=300bps, institution spread=200bps → BCVA=(−5%×300)−(−3%×200)=−9bps (net charge to the counterparty).",
      related: [{ r: 29, label: "R29 — CVA/DVA's first appearance" }],
      memory: "BCVA is symmetric — one side's gain is exactly the other's loss, like a zero-sum mirror."
    },
    {
      name: "Wrong-way risk (WWR) and right-way risk (RWR)",
      def: "WWR: exposure and PD positively correlated → ↑CVA, ↓DVA. RWR: negatively correlated → ↓CVA, ↑DVA.",
      example: "Classic scenarios: a long put option is WWR if exposure and counterparty PD both rise together; 2007-09 crisis (monoline insurers' own creditworthiness collapsed exactly as their CDS payout obligations spiked); a Japanese bank's FX swap to fund USD via JPY became WWR post-Lehman as JPY appreciation increased exposure while U.S. counterparty credit quality deteriorated simultaneously.",
      pitfall: "Counterintuitive fact: HIGHER credit quality actually AMPLIFIES WWR's impact, because a high-quality name defaulting is a rarer, more surprising (and often more correlated-with-catastrophe) event.",
      related: [{ r: 7, label: "R7 — wrong-way risk first introduced in CDS context" }],
      memory: "WWR modeling approaches: hazard rate (easiest, understates WWR), structural (joint distribution), parametric (historical link), jump (best for cliff-like sovereign/large-firm events)."
    },
    {
      name: "Collateral and CCPs under WWR",
      def: "Gradually rising exposure → collateral helps (time to call for more). A sudden jump in exposure (e.g., currency devaluation) → collateral can't be collected fast enough to help much.",
      example: "WWR collateral examples: a payer swap collateralized by a high-quality government bond (rates up → swap value up but bond value/margin down — same direction of pain); a firm posting its own bonds as collateral (worthless exactly when needed).",
      pitfall: "CCPs are exposed to WWR through member margin and default-fund contributions; mitigation includes higher margin/default-fund requirements for high-credit-quality members and higher haircuts on risky posted collateral.",
      related: ["Wrong-way risk (WWR) and right-way risk (RWR)"]
    }
  ],

  connections: {
    from: [
      { r: 25, why: "The default probabilities computed there are a direct input to the CVA formula." },
      { r: 36, why: "Every quantitative concept there (EE, EPE, ENE, netting factor, MPoR) is the direct input set to this reading's formula." },
      { r: 29, why: "CVA/DVA's rushed first appearance there becomes this reading's fully developed BCVA framework." }
    ],
    to: [
      { r: 38, why: "This CVA machinery gets stress-tested next." }
    ],
    confused: [
      { what: "Incremental CVA vs marginal CVA", how: "Incremental: effect of ADDING a new trade (pricing decision). Marginal: attribution of TOTAL existing CVA to each trade (ex-post analysis). Different questions, same underlying exposure/PD machinery." },
      { what: "CVA (unilateral, always negative) vs BCVA (bilateral, can be positive)", how: "Standalone CVA prices only the counterparty's default risk (always a cost, negative). BCVA adds the institution's own DVA — if the institution is riskier than its counterparty (DVA>CVA), BCVA can flip positive." },
      { what: "Higher credit quality worsening WWR impact", how: "Counterintuitive: a HIGH-quality name defaulting is rarer and more surprising/catastrophic, so WWR's impact is actually amplified for high-quality names, not diminished." }
    ]
  },

  misconceptions: [
    { wrong: "\"If the standalone CVA of a new trade is small, adding it barely affects the counterparty's total CVA.\"", right: "You must evaluate the CHANGE in CVA (incremental CVA) given netting with the existing book — a small standalone CVA can still meaningfully change (increase OR decrease) the netted total, depending on correlation with existing exposures." },
    { wrong: "\"BCVA can only be negative, like standalone CVA.\"", right: "BCVA = CVA(counterparty) + DVA(institution) can be POSITIVE if the institution's own DVA exceeds the counterparty's CVA — meaning the institution is riskier than its counterparty." },
    { wrong: "\"Netting is always advantageous when computing BCVA.\"", right: "Netting can be a DISADVANTAGE under BCVA if the institution's own DVA dominates — without netting, the institution could selectively settle only its favorable (positive MtM) contracts, a flexibility netting removes." },
    { wrong: "\"Higher credit quality counterparties pose less wrong-way risk concern.\"", right: "Counterintuitively, HIGHER credit quality AMPLIFIES WWR's impact — a high-quality name defaulting is rarer and more surprising, often correlated with a broader catastrophe, making the joint bad outcome more severe when it does occur." }
  ],

  highYield: [
    { stars: 5, what: "Base CVA formula and its exposure/PD/discount-factor structure.", why: "The core formula of the reading — every other concept is a variation or extension of this." },
    { stars: 5, what: "Incremental CVA vs. marginal CVA — which question each answers.", why: "Explicitly flagged as a frequently confused pair; a reliable, precise exam discriminator." },
    { stars: 4, what: "BCVA: can be positive, symmetric across parties, netting can be a disadvantage.", why: "Three distinct, individually testable implications of the bilateral framework." },
    { stars: 4, what: "Wrong-way risk: definition, classic scenarios (2007-09 monolines, Lehman FX swap), and the higher-credit-quality-amplifies-WWR counterintuitive fact.", why: "A rich, scenario-based conceptual area GARP tests heavily." },
    { stars: 3, what: "How netting/collateral/threshold/MTA/initial margin each move CVA up or down.", why: "A set of clean directional facts, useful for quick-fire true/false style questions." }
  ],

  recall: [
    { q: "A bank is deciding whether to add a new derivative trade with an existing counterparty. Should it look at the trade's standalone CVA or its incremental CVA, and why?", a: "Incremental CVA — the change in the counterparty's TOTAL netted CVA from adding this trade. Standalone CVA ignores netting with the existing book; the actual pricing decision depends on how this trade's exposure interacts with (offsets or compounds) existing exposures under the netting agreement." },
    { q: "Why can BCVA be positive even though standalone (unilateral) CVA can only ever be negative?", a: "BCVA = CVA(counterparty) + DVA(institution). DVA is a benefit (positive contribution) reflecting the institution's own default risk. If the institution's own credit risk (DVA) exceeds the counterparty's credit risk (CVA) — i.e., the institution is riskier than its counterparty — BCVA can flip positive, something impossible for unilateral CVA, which only ever prices the counterparty's risk as a cost." },
    { q: "Explain why higher credit quality can actually make wrong-way risk WORSE, not better.", a: "A high-quality counterparty defaulting is a rare, surprising event — and when it does happen, it's more likely tied to an extreme, correlated, catastrophic scenario (since ordinary conditions wouldn't have caused it). This makes the JOINT bad outcome (high exposure + default) more severe when it occurs, even though it occurs less often — amplifying WWR's impact conditional on the tail event." },
    { q: "A gradual currency depreciation vs. a sudden currency devaluation both increase counterparty exposure. Why does collateral help in one case but not the other?", a: "Collateral calls and settlement take time (the margin period of risk). A GRADUAL exposure increase allows time to call for and receive additional collateral before the exposure grows too large. A SUDDEN jump (devaluation) outpaces the collateral call/settlement cycle — by the time collateral could be collected, the damage (or default) has already occurred." }
  ],

  hooks: [
    { title: "EL's derivatives cousin", text: "CVA is EL=PD×LGD×EAD, stretched across time: instead of one EAD, a whole time series of EE(t); instead of one PD, a time series of q(t). Same DNA, more moving parts." },
    { title: "Add vs. attribute", text: "Incremental CVA: 'if I add this LEGO piece, how does the tower's height change?' Marginal CVA: 'looking at the built tower, how much height did EACH piece contribute?' Same tower, two different questions." },
    { title: "The mirror that can tip", text: "BCVA is a mirror — usually the counterparty's risk dominates (CVA), but if YOU'RE the riskier one, the mirror tips and BCVA can flip positive." }
  ],

  summary: `<p><strong>Base CVA</strong> = \\(- (1- RR)\\Sigma EE(t_{i})q_{i}DF(t_{i})\\) — EL's derivatives cousin, stretched across time. <strong>Spread/recovery</strong>: ↑spread→↑CVA nonlinearly (capped at PD=100%); ↑RR→↑implied PD but ↓CVA. <strong>Netting/collateral</strong>: both reduce CVA (netting via exposure, collateral via EE); threshold/MTA raise CVA, initial margin lowers it. <strong>Incremental CVA</strong> (pricing a new trade) ≠ <strong>marginal CVA</strong> (attributing existing CVA) — a frequently confused pair. <strong>BCVA</strong> = CVA+DVA: can be positive (if institution riskier), symmetric across parties, netting can be a DISADVANTAGE if own DVA dominates. <strong>WWR</strong> (exposure & PD positively correlated: ↑CVA ↓DVA) vs <strong>RWR</strong> (mirror) — higher credit quality AMPLIFIES WWR impact, counterintuitively. Gradual exposure increases let collateral help; sudden jumps outpace it.</p>`
});
