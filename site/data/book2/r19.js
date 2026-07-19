FRM.register({
  book: 2, reading: 19,
  session: "Credit Risk Analysis",
  title: "Credit Risk Management",
  tagline: "The governance skeleton from R18, applied specifically to a bank's loan book: classification, provisioning, and the workout process.",

  teaches: `<p>Three ideas matter most: how a bank classifies loans by health, how it sets aside loan loss provisions against expected trouble, and the workout process when a loan actually goes bad. Also introduces EL vs UL qualitatively — the split that becomes fully quantitative in R20.</p>`,

  why: `<p>Provisioning rules (IFRS 9) directly determine how much a bank's earnings absorb credit deterioration, and when. Getting Stage 2 vs Stage 3 right — and specifically what changes between them — is a frequently-missed distinction with real accounting consequences.</p>`,

  intuition: `<p>Think of the asset classification spectrum as a patient's health chart: standard (healthy) → specially mentioned (early symptoms) → substandard → doubtful → loss (already a write-off). Provisioning intensity should rise as the patient's condition worsens — that's the whole logic connecting classification to loss reserves.</p>`,

  formulas: [
    { name: "Expected loss (first appearance, qualitative)", math: "EL = PD \\times LGD \\times EAD", note: "The 'average' loss. UL is what's NOT captured by this average — the variability around it. Becomes fully quantitative with formulas in R20." }
  ],

  concepts: [
    {
      name: "Asset classification spectrum",
      def: "Standard (pass) → specially mentioned (watch) → substandard → doubtful → loss. A health spectrum from 'fine' to 'already a write-off.'",
      intuition: "Provisioning intensity should rise as you move right along this spectrum.",
      related: ["IFRS 9's three-stage loss model"]
    },
    {
      name: "IFRS 9's three-stage loss model (effective Jan 1, 2018)",
      def: "Stage 1 (performing): 12-month expected loss, interest on gross amount. Stage 2 (any delinquency): lifetime expected loss, interest on gross amount. Stage 3 (nonperforming): lifetime expected loss, interest on NET amount.",
      pitfall: "Stage 2 and Stage 3 BOTH use lifetime expected loss — the difference between them is whether interest income is computed on the GROSS or NET (of provisions) carrying amount, NOT the loss horizon. This is a frequently-missed distinction — many assume Stage 3 introduces the lifetime-loss concept, but it actually starts at Stage 2.",
      related: [{ r: 20, label: "R20 — where EL gets its full quantitative formula" }],
      memory: "Stage 1: 12-month loss. Stages 2 & 3: BOTH lifetime loss — they differ only in gross vs. net interest basis."
    },
    {
      name: "Expected loss vs. unexpected loss (first appearance)",
      def: "EL = PD × LGD × EAD (the 'average' loss). UL = the loss that isn't captured by the EL model, i.e., the variability around that average.",
      pitfall: "This split is introduced qualitatively here but becomes fully quantitative in R20 — that's the reading where you actually calculate EL and UL with formulas and standard deviations. Keep this reading's definitions in your back pocket; R20 is where they get teeth.",
      related: [{ r: 20, label: "R20 — the full quantitative EL/UL machinery" }]
    }
  ],

  connections: {
    from: [
      { r: 18, why: "This reading applies the governance skeleton specifically to loan classification and workout decisions." }
    ],
    to: [
      { r: 20, why: "EL/UL, introduced qualitatively here, becomes the fully quantitative core of the next reading." }
    ],
    confused: [
      { what: "Stage 2 vs Stage 3 (IFRS 9)", how: "Both use LIFETIME expected loss. The only difference is the interest income basis: Stage 2 uses gross carrying amount, Stage 3 uses net (post-provision) amount." }
    ]
  },

  misconceptions: [
    { wrong: "\"Stage 3 introduces lifetime expected loss, while Stage 2 still uses 12-month expected loss.\"", right: "Stage 2 ALREADY uses lifetime expected loss — the same as Stage 3. The two stages differ only in whether interest is computed on gross (Stage 2) or net (Stage 3) carrying amount." },
    { wrong: "\"Provisioning intensity should be roughly constant across the asset classification spectrum.\"", right: "It should rise as classification worsens — standard/pass requires minimal provisioning, loss requires (near) full write-off." }
  ],

  highYield: [
    { stars: 4, what: "IFRS 9 three-stage model: which stages use lifetime EL, and the gross-vs-net interest distinction.", why: "The single most frequently-missed distinction in this reading — a precise, high-value trap." },
    { stars: 3, what: "Asset classification spectrum (standard → specially mentioned → substandard → doubtful → loss).", why: "Straightforward recall, sets up provisioning-intensity questions." }
  ],

  recall: [
    { q: "A loan moves from Stage 2 to Stage 3 under IFRS 9. Does its expected loss horizon change?", a: "No — both Stage 2 and Stage 3 already use LIFETIME expected loss. What changes is the interest income basis: Stage 2 computes interest on the gross carrying amount, Stage 3 on the net (post-provision) amount." },
    { q: "Why does provisioning intensity rise as a loan moves from 'standard' toward 'loss' on the classification spectrum?", a: "The classification spectrum tracks deteriorating asset health — as the likelihood and severity of ultimate non-payment rises, prudent accounting requires setting aside proportionally larger reserves against that increasingly probable loss." }
  ],

  hooks: [
    { title: "The health chart", text: "Standard, specially mentioned, substandard, doubtful, loss — a patient's chart from healthy to flatlined. Provisioning rises with every step right." },
    { title: "Gross vs net, not 12-month vs lifetime", text: "Stage 2 → Stage 3 is a change in accounting BASIS (gross to net interest), not a change in loss HORIZON (both are lifetime) — the trap is assuming otherwise." }
  ],

  summary: `<p><strong>Asset classification</strong>: standard → specially mentioned → substandard → doubtful → loss; provisioning rises with each step. <strong>IFRS 9 three-stage model</strong>: Stage 1 (performing) = 12-month EL, gross interest; Stage 2 (any delinquency) = LIFETIME EL, gross interest; Stage 3 (nonperforming) = LIFETIME EL, NET interest — Stages 2 & 3 share the lifetime-loss horizon and differ only in interest basis. <strong>EL vs UL</strong> introduced qualitatively (EL = PD×LGD×EAD as the average loss; UL as the variability around it) — becomes fully quantitative in R20.</p>`
});
