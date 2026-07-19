FRM.register({
  book: 2, reading: 29,
  session: "Credit Risk Estimation",
  title: "Credit Risk (in Derivatives)",
  tagline: "A bridge reading: recaps R25's default-probability toolkit, introduces CVA/DVA for the first time, and the Gaussian copula in its one-factor time-to-default form.",

  teaches: `<p>Hazard rate recap (unconditional vs. conditional PD), ISDA Master Agreement default mechanics, CVA/DVA first appearance, credit risk mitigants (netting), reduced-form vs. structural default correlation models, and the one-factor Gaussian copula for time-to-default.</p>`,

  why: `<p>If R37's CVA reading feels overwhelming later, it's because R29 rushes through the same ideas first — come back to this reading's CVA section as a running start. This reading also makes explicit the practical guidance on which PD (risk-neutral vs real-world) to use where.</p>`,

  intuition: `<p>CVA answers "how much should I discount a derivative's value because my counterparty might not pay?" DVA is the mirror image — a BENEFIT to my own book value reflecting the (grim) fact that if I default, I don't have to pay either. Wrong-way risk (PD positively correlated with exposure — bad) and right-way risk (negatively correlated — good) determine whether this counterparty-risk adjustment gets worse or better as the trade itself moves in your favor.</p>`,

  formulas: [
    { name: "Value including default risk", math: "f = f_{nd} - CVA + DVA", note: "f_nd = no-default value. CVA lowers value (cost); DVA raises it (benefit, since your own default relieves you of paying)." },
    { name: "Single uncollateralized derivative shortcut", math: "f = f_{nd}\\times e^{-(\\text{credit spread})\\times T}", note: "No simulation needed if DVA=0 — just discount by the counterparty's credit spread." },
    { name: "Credit VaR via one-factor Gaussian copula", math: "V(T,X) = N\\!\\left[\\dfrac{N^{-1}(Q(T)) + \\sqrt{\\rho}\\,N^{-1}(X)}{\\sqrt{1-\\rho}}\\right];\\quad \\text{Credit VaR} = L\\times(1-\\text{RR})\\times V(T,X)", note: "Identical in structure to Vasicek's WCDR from R26 — same equation, different notation." }
  ],

  concepts: [
    {
      name: "Recap: hazard rate, unconditional vs. conditional PD",
      def: "Unconditional PD in year t is read from the cumulative default curve directly. Conditional PD (given survival to year t−1) = unconditional PD(t) / survival probability through t−1.",
      example: "B-rated bond: unconditional Yr4 default=4.484%, survival through Yr3=86.485%, conditional Yr4 default=4.484%/86.485%=5.185%.",
      related: [{ r: 25, label: "R25 — the full hazard rate and migration matrix toolkit" }]
    },
    {
      name: "ISDA Master Agreement & default mechanics",
      def: "Two loss scenarios for the non-defaulting party: (1) its exposure is positive and exceeds posted collateral → becomes an unsecured creditor for the shortfall; (2) the defaulting party's exposure is positive but less than posted collateral → non-defaulting party owed the return of excess collateral.",
      related: [{ r: 33, label: "R33 — netting and close-out mechanics in depth" }]
    },
    {
      name: "CVA and DVA — first appearance",
      def: "CVA = PV(expected cost to the bank if counterparty defaults). DVA = PV(expected cost to the counterparty if the bank itself defaults) — a BENEFIT to the bank's own book value.",
      pitfall: "Wrong-way risk: PD positively correlated with exposure (bad). Right-way risk: PD negatively correlated with exposure (good). A NEW transaction positively correlated with the existing book raises BOTH CVA and DVA; negatively correlated lowers BOTH.",
      related: [{ r: 37, label: "R37 — the fully developed CVA formula and BCVA" }],
      memory: "CVA is what THEY might not pay you; DVA is the twisted 'benefit' of what YOU might not pay them."
    },
    {
      name: "Credit risk mitigants",
      def: "Netting: sum ALL trades (positive and negative), not just positive-value ones. Collateral agreements. Downgrade triggers (closeout or extra collateral if counterparty rating falls below threshold).",
      example: "Netting example: exposures of +5, −7, +10, −2 (millions) → gross exposure=5+10=$15M, netted exposure=5−7+10−2=$6M.",
      related: [{ r: 33, label: "R33 — netting formalized in full" }]
    },
    {
      name: "Default correlation models: reduced-form vs. structural",
      def: "Reduced-form: fast, simple, LOW achievable correlation (hard to get two firms defaulting in the same narrow window), captures economic cycle (hazard rates tied to macro variables). Structural (Merton-style): slow, computationally intensive, can set correlation arbitrarily HIGH, captures economic cycle less directly.",
      pitfall: "The achievable-correlation difference is the most useful discriminator: if a question needs high joint-default correlation, structural models can deliver it; reduced-form models structurally cannot.",
      related: [{ r: 21, label: "R21 — Merton, the structural model this contrasts with reduced-form" }]
    },
    {
      name: "One-factor Gaussian copula (time-to-default)",
      def: "Transforms non-normal times-to-default into standard normal variables via each firm's own marginal default distribution; the joint (bivariate normal) structure is the 'copula.' Correlation here is called the COPULA correlation.",
      pitfall: "V(T,X) is IDENTICAL in structure to Vasicek's WCDR formula from R26 — same equation, different reading's notation. If you memorize one, you've memorized both; don't waste study time treating them as separate formulas.",
      related: [{ r: 26, label: "R26 — the identical WCDR formula" }, { r: 9, label: "R9 — the copula concept this operationalizes" }],
      memory: "V(T,X) here = WCDR(T,X) in R26 — literally the same formula, don't study it twice."
    }
  ],

  connections: {
    from: [
      { r: 25, why: "This reading recaps and directly reuses the hazard-rate/PD toolkit built there." },
      { r: 27, why: "The single-factor copula machinery gets its time-to-default application here." }
    ],
    to: [
      { r: 37, why: "This reading's rushed CVA/DVA introduction becomes the fully developed BCVA framework." },
      { r: 33, why: "Netting mechanics, previewed here, get formalized fully." }
    ],
    confused: [
      { what: "Reduced-form vs structural default correlation models", how: "Reduced-form is fast but can only achieve LOW correlation; structural (Merton-style) is slow but can achieve arbitrarily HIGH correlation — pick based on how much joint default clustering the question needs." },
      { what: "V(T,X) here vs WCDR(T,X) in R26", how: "Identical formula, different notation/reading — a pure relabeling, not two things to learn separately." }
    ]
  },

  misconceptions: [
    { wrong: "\"DVA is a cost to the bank, just like CVA.\"", right: "DVA is a BENEFIT (added to book value) — it reflects that if the bank itself defaults, it escapes some of its own payment obligations. f = f_nd − CVA + DVA." },
    { wrong: "\"Reduced-form and structural models can achieve the same range of default correlation.\"", right: "Reduced-form models can only achieve LOW correlation (hard to synchronize narrow default-time windows); structural models can be calibrated to arbitrarily HIGH correlation." },
    { wrong: "\"The one-factor Gaussian copula formula here is a new formula distinct from Vasicek's WCDR.\"", right: "It's structurally IDENTICAL to Vasicek's WCDR from R26 — same equation, different notation. Don't spend separate study time memorizing both as if unrelated." }
  ],

  highYield: [
    { stars: 4, what: "CVA/DVA definitions, the f=f_nd−CVA+DVA identity, and wrong-way/right-way risk direction.", why: "First appearance of the reading's most important formula — R37 assumes fluency here." },
    { stars: 4, what: "V(T,X) = Vasicek's WCDR(T,X), same formula different notation.", why: "A guaranteed efficiency point — recognizing the identity saves real study time." },
    { stars: 3, what: "Reduced-form vs structural: speed, achievable correlation, economic-cycle capture.", why: "A clean three-attribute comparison table, good matching-question material." },
    { stars: 3, what: "Netting example mechanics (gross vs netted exposure).", why: "A simple, frequently-plugged-with-new-numbers calculation." }
  ],

  recall: [
    { q: "A bank enters a new derivative trade that is positively correlated with its existing book of exposures to the same counterparty. What happens to CVA and DVA?", a: "Both CVA and DVA RISE. Positive correlation with the existing book increases the bank's exposure to the counterparty in the states where the counterparty is more likely to default (raising CVA) and increases the counterparty's exposure to the bank in states where the bank is more likely to default (raising DVA) — both risk measures move the same direction under this correlation." },
    { q: "Why can structural (Merton-style) default correlation models achieve much higher correlation than reduced-form models?", a: "Structural models tie default directly to a shared, continuously-evolving asset value process, so two firms' asset values (and hence default timing) can be made to move together very tightly by construction. Reduced-form models treat default as a Poisson-style jump driven by a hazard rate; synchronizing two independent jump processes into the same narrow time window is intrinsically harder, capping achievable correlation lower." },
    { q: "Exposures to a single counterparty across four trades are +5, −7, +10, −2 (millions). Compute gross and netted exposure, and explain the netting benefit.", a: "Gross exposure (sum of only positive-value trades) = 5+10 = $15M. Netted exposure (sum of ALL trades) = 5−7+10−2 = $6M. Netting captures the fact that in default, all obligations to and from the counterparty settle as one net amount — the negative-value trades offset the positive ones, cutting exposure by $9M here." }
  ],

  hooks: [
    { title: "CVA and DVA, mirror twins", text: "CVA: what THEY might not pay you (a cost). DVA: what YOU might not pay THEM (a twisted benefit) — same mechanism, opposite side of the ledger." },
    { title: "One formula, two reading numbers", text: "V(T,X) here and WCDR(T,X) in R26 are the same equation. If a formula looks familiar across readings, it probably is — check before memorizing twice." }
  ],

  summary: `<p><strong>Hazard rate recap</strong>: conditional PD = unconditional PD(t)/survival(t−1). <strong>CVA</strong> = PV(cost if counterparty defaults); <strong>DVA</strong> = PV(benefit if the bank itself defaults); f=f_nd−CVA+DVA. <strong>Wrong-way risk</strong> (PD & exposure positively correlated) raises CVA, lowers DVA; right-way risk is the mirror. <strong>Netting</strong>: sum ALL trades (+ and −), not just positive-value ones. <strong>Reduced-form</strong> (fast, low achievable correlation, captures economic cycle) vs. <strong>structural</strong> (slow, arbitrarily high correlation, less direct cycle capture). <strong>One-factor Gaussian copula</strong> V(T,\\(X)=N[(N^{-1}(Q(T))+\\sqrt{\\rho }N^{-1}(X))/\\sqrt{1- \\rho }]\\) — structurally identical to R26's Vasicek WCDR formula.</p>`
});
