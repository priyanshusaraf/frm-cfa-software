FRM.register({
  book: 3, reading: 62,
  session: "Capital and Regulatory Frameworks",
  title: "Basel III: Finalizing Post-Crisis Reforms",
  tagline: "Closes the entire book with the actual formula behind 'the SA for operational risk': the Standardized Measurement Approach (SMA) — a financial-statement proxy combined with the bank's own loss history.",

  teaches: `<p>The Business Indicator (BI) and its three components, BI buckets and the business indicator component (BIC), the internal loss multiplier (ILM), full capital requirement by bucket, why SMA replaced AMA, and operational loss data criteria.</p>`,

  why: `<p>The SMA is deliberately simpler and more comparable across banks than the AMA it replaced — a direct response to AMA's failure to converge on consistent best practices. This is the final destination of the LDA's frequency/severity philosophy (R43), now expressed as a non-model-based regulatory formula.</p>`,

  intuition: `<p>The SMA combines two ingredients: a FINANCIAL-STATEMENT PROXY for the bank's scale/activity (the Business Indicator — roughly, "how big and active is this bank"), and the bank's OWN LOSS HISTORY (the Internal Loss Multiplier — roughly, "has this bank actually lost more or less than a typical bank its size would"). A bank with average loss experience gets ILM=1 (capital = BIC, unchanged); worse-than-average history pushes ILM above 1 (capital rises); better-than-average pushes it below 1 (capital falls) — but only for banks large enough to reach Bucket 2 or 3. Small (Bucket 1) banks never apply the ILM at all — their capital is just BIC.</p>`,

  visual: `<div class="widget" data-widget="lossdist"></div>`,

  formulas: [
    { name: "Business Indicator", math: "\\text{BI} = \\text{ILDC} + \\text{SC} + \\text{FC}", note: "ILDC (net interest+dividend income), SC (services: max fee income/expense + max other operating income/expense), FC (|trading P&L|+|banking book P&L|). All 3-year averages." },
    { name: "BIC — marginal coefficients by bucket", math: "Bucket1 (BI ≤ €1bn): 12% · Bucket2 (€1bn–€30bn): 15% · Bucket3 (BI > €30bn): 18%", note: "Marginal, tax-bracket-style: apply each rate only to the portion of BI within that bucket." },
    { name: "Internal Loss Multiplier (ILM)", math: "\\text{ILM} = \\ln\\!\\left[e + \\left(\\tfrac{\\text{Loss Component}}{\\text{BIC}}\\right)^{0.8} - 1\\right]", note: "e = Euler's number (≈2.71828). Loss Component = 15× average annual op-risk losses over the last 10 years." },
    { name: "Full capital requirement", math: "\\text{Bucket 1: capital}=\\text{BIC (ILM not used)}.\\quad \\text{Buckets 2\\&3: capital}=\\text{BIC}\\times\\text{ILM}", note: "PS Bank example: BI=€18.48M (bucket 1) → capital=0.12×18.48=€2.22M (BIC only)." }
  ],

  concepts: [
    {
      name: "The Business Indicator (BI) — three components",
      def: "BI = ILDC + SC + FC. ILDC (interest, lease, dividend component): net interest income (capped relative to interest-earning assets) + dividend income. SC (services component): max(fee income, fee expense) + max(other operating income, other operating expense). FC (financial component): absolute value of net trading book P&L + absolute value of net banking book P&L.",
      pitfall: "All three components use 3-YEAR AVERAGES — and FC specifically uses ABSOLUTE VALUES of P&L (a big trading LOSS contributes to BI just as much as a big trading GAIN, since both reflect high activity/risk exposure).",
      related: [],
      memory: "ILDC = lending income. SC = fee/service income. FC = trading activity (absolute value, gains or losses both count)."
    },
    {
      name: "BI buckets and the business indicator component (BIC)",
      def: "Bucket 1 (BI≤€1bn): BIC=12%×BI. Bucket 2 (€1bn<BI≤€30bn): marginal coefficient rises to 15%. Bucket 3 (BI>€30bn): marginal coefficient rises to 18%.",
      example: "BI=€40 billion (bucket 3): BIC computed by applying the bucket 1 rate to the first €1bn, the bucket 2 rate to the next €29bn, and the bucket 3 rate to the remainder above €30bn, then summing (a marginal, tax-bracket-style calculation).",
      pitfall: "This is a MARGINAL calculation, like income tax brackets — don't apply the top bucket's rate to the ENTIRE BI; only the portion within each bucket gets that bucket's rate.",
      related: ["Internal loss multiplier (ILM)"],
      memory: "Tax-bracket style: each euro of BI gets taxed at the rate for ITS bucket, not the bank's overall bucket."
    },
    {
      name: "Internal loss multiplier (ILM)",
      def: "ILM = ln[e + (Loss Component/BIC)^0.8 − 1]. e = Euler's number (≈2.71828), not e to a power. Loss Component = 15 × average annual operational risk losses over the last 10 years (or the bank's actual historical average, scaled).",
      pitfall: "If a bank's loss experience is exactly industry-average, Loss Component = BIC → ILM = 1 → capital = BIC unchanged. Worse-than-average loss history → Loss Component > BIC → ILM > 1 → capital requirement RISES above BIC; better-than-average → ILM < 1 → capital FALLS below BIC. Data requirement: ideally 10 years of quality loss data; 5 years permitted during transition; with LESS THAN 5 years, ILM is SKIPPED ENTIRELY and capital = BIC alone.",
      related: [{ r: 43, label: "R43 — the LDA's loss-history philosophy, now expressed as this multiplier" }],
      memory: "ILM=1 is the industry-average anchor. Worse history pushes it up, better history pushes it down — but only if you have enough data years to compute it at all."
    },
    {
      name: "Full capital requirement, by bucket",
      def: "Bucket 1: capital = BIC (ILM not used). Buckets 2 & 3: capital = BIC × ILM.",
      example: "PS Bank, BI = €18.48 million (bucket 1) → capital = 0.12×18.48 = €2.22 million (BIC only — bucket 1 banks never apply the ILM).",
      pitfall: "Consolidation rules: fully consolidated BI at the group level (netting intragroup income/expenses); at subsidiary/subconsolidated level, use that entity's own BI. If a subsidiary crosses into bucket 2/3 territory, it must incorporate its OWN loss experience (not the group's) — and if it doesn't meet the qualitative standards required to use the loss component, capital defaults to 100% of BIC.",
      related: [],
      memory: "Small banks (bucket 1) never touch the ILM — their loss history doesn't matter for capital purposes at all."
    },
    {
      name: "SMA vs. AMA — why the framework changed",
      def: "AMA (introduced 2006 under Basel II) was principles-based and flexible, hoping best practices would emerge and converge over time — instead it produced poor cross-bank comparability and overly complex modeling with no convergence.",
      pitfall: "The SMA replaces it with a single, NON-MODEL-BASED formula combining financial-statement data with bank-specific loss experience — less flexible, but comparable and simple by design. This is a direct philosophical rejection of AMA's principles-based flexibility in favor of standardization.",
      related: [{ r: 59, label: "R59 — AMA's original introduction under Basel II" }],
      memory: "AMA: 'trust the models to converge on best practice.' SMA: 'stop trusting models, use one formula for everyone.'"
    },
    {
      name: "Operational loss data criteria",
      def: "General: documented processes, track 4 dates (occurrence/discovery/reporting/accounting), independent accuracy review, credit-RWA-linked losses excluded (market-linked included), Basel Level 1 categorization, 10-year window (5-year transition exception), €20,000 threshold (rising to €100,000 for bucket 2/3 banks later).",
      example: "Specific: documented dataset-inclusion policy; gross loss, insurance recoveries, non-insurance recoveries tracked SEPARATELY (dataset uses losses NET of insurance recoveries only). Gross loss INCLUDES: external expenses tied to the event, settlements/impairments/write-downs, reserves/provisions booked, material pending losses, material timing losses spanning periods. Gross loss EXCLUDES: post-event improvement/upgrade costs, insurance premiums, and general PP&E maintenance contract costs.",
      pitfall: "General maintenance contracts on property, plant & equipment are EXPLICITLY EXCLUDED from the SMA gross loss calculation — even though they might feel 'operational' in a loose sense, they're ordinary running costs, not operational risk losses. This exact exclusion is a favorite distractor on the exam. The date of accounting is the ONLY date usable for building the loss dataset.",
      related: [{ r: 43, label: "R43 — the boundary-event and loss-data rules this extends" }],
      memory: "PP&E maintenance contracts: feels operational, isn't counted — the classic exam trap."
    }
  ],

  connections: {
    from: [
      { r: 61, why: "The 2017 reforms summarized there culminate in this reading's actual SMA formula." },
      { r: 43, why: "The LDA's frequency/severity philosophy is the conceptual ancestor of the SMA's BI + ILM structure." },
      { r: 59, why: "AMA's original Basel II introduction is exactly what the SMA replaces." }
    ],
    to: [],
    confused: [
      { what: "BIC calculation vs the ILM", how: "BIC is a pure financial-statement/scale proxy (marginal, tax-bracket style across BI buckets). ILM is a SEPARATE multiplier reflecting the bank's OWN loss history relative to industry-average — Bucket 1 banks use BIC alone; only Buckets 2/3 apply the ILM on top." },
      { what: "Gross loss inclusions vs exclusions", how: "INCLUDES: external expenses, settlements/write-downs, reserves/provisions, material pending/timing losses. EXCLUDES: post-event improvement costs, insurance premiums, general PP&E maintenance — the maintenance exclusion is the classic trap." },
      { what: "AMA vs SMA philosophy", how: "AMA: principles-based, flexible, model-driven, hoped for convergence (didn't happen). SMA: single non-model-based formula, less flexible but comparable and simple by design." }
    ]
  },

  misconceptions: [
    { wrong: "\"All banks, regardless of size, must apply the internal loss multiplier to compute operational risk capital.\"", right: "Bucket 1 banks (BI≤€1bn) use CAPITAL=BIC alone — the ILM is never applied. Only Buckets 2 and 3 (larger banks) multiply BIC by the ILM." },
    { wrong: "\"General maintenance contracts on bank property and equipment count toward SMA gross operational losses.\"", right: "They're EXPLICITLY EXCLUDED — general PP&E maintenance costs are ordinary running costs, not operational risk losses, despite feeling 'operational' in a loose sense. This is a favorite exam distractor." },
    { wrong: "\"The BIC calculation applies the bank's top bucket rate to its entire Business Indicator.\"", right: "BIC is a MARGINAL, tax-bracket-style calculation — each portion of BI within a given bucket's range gets that bucket's rate, not the top rate applied to the whole BI." },
    { wrong: "\"The SMA was adopted because it offered more modeling flexibility than the AMA.\"", right: "The opposite — the SMA deliberately REDUCES flexibility (a single non-model-based formula) specifically because AMA's flexibility produced poor cross-bank comparability and no convergence on best practices." }
  ],

  highYield: [
    { stars: 5, what: "Full SMA capital calculation: BI → BIC (marginal buckets) → ILM → capital (bucket 1 vs 2/3).", why: "The single most important formula closing the entire book — a multi-step calculation GARP loves to test in full." },
    { stars: 5, what: "PP&E general maintenance contracts excluded from gross loss — the classic distractor.", why: "Explicitly flagged as a favorite exam trap." },
    { stars: 4, what: "ILM mechanics: ILM=1 at industry-average loss history, >1 worse, <1 better; skipped entirely with <5yrs of data.", why: "The core conceptual mechanism connecting a bank's own risk management quality to its actual capital requirement." },
    { stars: 4, what: "Why SMA replaced AMA (comparability failure, no convergence) — the philosophical shift to non-model-based standardization.", why: "Ties together the entire Basel reform arc (R59→R60→R61→R62) into one coherent narrative." },
    { stars: 3, what: "BI's three components (ILDC, SC, FC) and FC's absolute-value treatment of P&L.", why: "A precise definitional fact, often tested via a component-classification question." }
  ],

  recall: [
    { q: "A bank has BI = €50 billion. Set up (without fully computing) the marginal BIC calculation.", a: "BIC = (12% × €1bn) + (15% × €29bn, the portion from €1bn to €30bn) + (18% × €20bn, the portion above €30bn up to €50bn) — a tax-bracket-style marginal calculation, NOT 18% applied to the full €50bn." },
    { q: "A bank's average annual operational losses over the last 10 years are exactly in line with what its BIC would predict for a typical bank its size. What is its ILM, and what does this mean for its capital requirement?", a: "ILM = 1 (Loss Component = BIC in this case), meaning capital = BIC × 1 = BIC — the bank's own loss history exactly matches industry-average expectations, so its capital requirement is unchanged from the pure financial-statement-based BIC." },
    { q: "A bank has only 3 years of quality operational loss data due to a recent merger. How does this affect its SMA capital calculation?", a: "With less than 5 years of data, the ILM is SKIPPED ENTIRELY, and capital = BIC alone (as if the bank were in Bucket 1, regardless of actual bucket) — insufficient loss history data disqualifies the bank from having its own loss experience factored in." },
    { q: "Why does the SMA explicitly exclude general PP&E maintenance contract costs from gross operational loss, even though maintenance sounds like an operational matter?", a: "General maintenance is an ORDINARY, RECURRING RUNNING COST of doing business — not a loss resulting from a discrete operational risk EVENT (fraud, system failure, error, etc.). Including it would conflate normal business expenses with actual risk-driven losses, distorting the loss data used to calibrate capital requirements. This exclusion is specifically flagged as a common point of confusion." }
  ],

  hooks: [
    { title: "Size plus track record", text: "SMA capital = how big and active you are (BI/BIC) × how well you've actually managed risk historically (ILM). A big bank with a spotless loss record pays less than an equally big bank with a messy one." },
    { title: "Tax brackets for banks", text: "BIC is computed exactly like income tax brackets — the first €1bn of BI is taxed at 12%, the next chunk at 15%, and so on. Never apply the top rate to the whole pie." },
    { title: "The exclusion that feels wrong but is right", text: "PP&E maintenance sounds operational — but the SMA draws a hard line: ordinary running costs aren't operational risk LOSSES. Memorize this exclusion precisely because it feels counter-intuitive." }
  ],

  summary: `<p><strong>BI</strong> = ILDC (interest/dividend) + SC (services, max fee/other income-expense) + FC (|trading P&L|+|banking book P&L|), all 3-year averages. <strong>BIC</strong>: marginal, tax-bracket style — Bucket 1 (≤€1bn) 12%, Bucket 2 (€1-30bn) 15%, Bucket 3 (>€30bn) 18%. <strong>ILM</strong> = ln[e+(Loss Component/BIC)^0.8−1]; Loss Component=15×10yr avg annual losses; ILM=1 at industry-average, >1 worse, <1 better; skipped (capital=BIC) if <5yrs of data. <strong>Capital</strong>: Bucket 1 = BIC alone (no ILM ever); Buckets 2&3 = BIC×ILM. <strong>SMA replaced AMA</strong> because AMA's flexibility produced poor comparability and no convergence — SMA trades flexibility for simplicity/comparability. <strong>Loss data</strong>: 10yr window, €20,000/€100,000 thresholds, net-of-insurance-recoveries; PP&E general maintenance EXPLICITLY EXCLUDED from gross loss (classic trap).</p>`
});
