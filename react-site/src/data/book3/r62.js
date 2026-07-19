export default ({
  book: 3, reading: 62,
  session: "Capital and Regulatory Frameworks",
  title: "Basel III: Finalizing Post-Crisis Reforms",
  tagline: "Closes the entire book with the actual formula behind 'the SA for operational risk': the Standardized Measurement Approach (SMA) — a financial-statement proxy combined with the bank's own loss history.",

  teaches: `<p>The Business Indicator (BI) and its three components, BI buckets and the business indicator component (BIC), the internal loss multiplier (ILM), full capital requirement by bucket, why SMA replaced AMA, and operational loss data criteria.</p>`,

  why: `<p>The SMA is deliberately simpler and more comparable across banks than the AMA it replaced — a direct response to AMA's failure to converge on consistent best practices. This is the final destination of the LDA's frequency/severity philosophy (R43), now expressed as a non-model-based regulatory formula.</p>`,

  intuition: `<p>The SMA combines two ingredients: a FINANCIAL-STATEMENT PROXY for the bank's scale/activity (the Business Indicator — roughly, "how big and active is this bank"), and the bank's OWN LOSS HISTORY (the Internal Loss Multiplier — roughly, "has this bank actually lost more or less than a typical bank its size would"). A bank with average loss experience gets ILM=1 (capital = BIC, unchanged); worse-than-average history pushes ILM above 1 (capital rises); better-than-average pushes it below 1 (capital falls) — but only for banks large enough to reach Bucket 2 or 3. Small (Bucket 1) banks never apply the ILM at all — their capital is just BIC.</p>
<p>Step back and see why regulators built it this way. A pure size-based charge (BIC alone) is easy to audit and impossible to game with clever modeling — but it treats a reckless bank and a well-run bank of the same size identically, which is exactly the flaw that made the earlier AMA framework unpopular with regulators (too much modeling freedom, too little comparability) and a flat BIA/TSA framework unpopular with well-managed banks (no credit for good risk management). The ILM is the fix: it is a single number, not a model, so it can't be gamed the way AMA's internal models could be, yet it still lets a bank's own track record move its capital number up or down around the size-based anchor. That is the whole philosophical point of the SMA — non-model-based, but not size-only either.</p>`,

  visual: `<div class="widget" data-widget="lossdist"></div>`,

  formulas: [
    { name: "Business Indicator", math: "\\text{BI} = \\text{ILDC} + \\text{SC} + \\text{FC}", note: "ILDC (net interest+dividend income), SC (services: max fee income/expense + max other operating income/expense), FC (|trading P&L|+|banking book P&L|). All 3-year averages.",
      plain: "This formula says a bank's overall operational-risk exposure proxy is nothing more than three financial-statement-derived numbers — lending income, service/fee income, and trading activity — added together, each measured as a three-year average so a single unusual year doesn't swing the result.",
      derivation: `<p>Each piece is built from ordinary income-statement and balance-sheet lines a bank already reports:</p>
<ul>
<li>\\( \\text{ILDC} \\) = net interest income (capped relative to interest-earning assets, so a bank can't inflate BI just by holding low-margin assets) \\( + \\) dividend income — it stands for the "lending/investing" side of the business.</li>
<li>\\( \\text{SC} = \\max(\\text{fee income}, \\text{fee expense}) + \\max(\\text{other operating income}, \\text{other operating expense}) \\) — using the larger of income vs. expense on each side means a bank that pays large fees to others (e.g., outsourced services) counts that scale of activity even where it is a net cost, not just where it is a net profit.</li>
<li>\\( \\text{FC} = |\\text{net trading book P\\&L}| + |\\text{net banking book P\\&L}| \\) — taking absolute values means a €50 million trading LOSS adds exactly as much to BI as a €50 million trading GAIN, because both signal the same underlying scale of risk-taking.</li>
</ul>
<p>Summing the three gives one euro figure, \\( \\text{BI} \\), that stands in for "how big and active is this bank," without needing any internal risk model at all.</p>` },
    { name: "BIC — marginal coefficients by bucket", math: "\\text{Bucket 1 } (\\text{BI} \\le \\text{\u20ac} 1\\text{bn}):\\ 12\\%,\\quad \\text{Bucket 2 } (\\text{\u20ac} 1\\text{bn} < \\text{BI} \\le \\text{\u20ac} 30\\text{bn}):\\ 15\\%,\\quad \\text{Bucket 3 } (\\text{BI} > \\text{\u20ac} 30\\text{bn}):\\ 18\\%", note: "Marginal, tax-bracket-style: apply each rate only to the portion of BI within that bucket.",
      plain: "This formula says the business indicator component (BIC) is built like an income-tax bracket: the first slice of BI (up to €1 billion) is charged a 12% rate, the next slice (from €1 billion to €30 billion) a 15% rate, and anything above €30 billion an 18% rate — you never apply one single rate to the whole BI.",
      derivation: `<p>Worked example from the source material: a bank with \\( \\text{BI} = \\text{\u20ac}13\\,\\text{billion} \\) falls in Bucket 2 (between €1bn and €30bn). Its BIC is built slice by slice:</p>
\\[ \\text{BIC} = (0.12 \\times \\text{\u20ac}1\\text{bn}) + \\big(0.15 \\times (\\text{\u20ac}13\\text{bn} - \\text{\u20ac}1\\text{bn})\\big) = \\text{\u20ac}0.12\\text{bn} + \\text{\u20ac}1.80\\text{bn} = \\text{\u20ac}1.92\\text{bn} \\]
<p>Notice what this is NOT: it is not \\( 0.15 \\times \\text{\u20ac}13\\text{bn} = \\text{\u20ac}1.95\\text{bn} \\) (applying the whole-bucket rate to the entire BI). The €1.92bn vs. €1.95bn gap is small here, but the marginal-vs-flat distinction is exactly what the exam tests — pick the flat-rate answer and you've fallen for the classic distractor.</p>` },
    { name: "Internal Loss Multiplier (ILM)", math: "\\text{ILM} = \\ln\\!\\left[e + \\left(\\dfrac{\\text{Loss Component}}{\\text{BIC}}\\right)^{0.8} - 1\\right]", note: "e = Euler's number (≈2.71828). Loss Component = 15× average annual op-risk losses over the last 10 years.",
      plain: "This formula says the internal loss multiplier compares a bank's own historical loss experience (the Loss Component) to what its size alone would predict (BIC), and turns that ratio into a multiplier centered on 1.0 — above 1.0 if the bank has lost more than its size-implied peers, below 1.0 if it has lost less.",
      derivation: `<p>The construction is deliberately anchored so that "average" loss history leaves capital unchanged. Set \\( \\text{Loss Component} = \\text{BIC} \\), i.e. the ratio inside the parentheses equals 1:</p>
\\[ \\text{ILM} = \\ln\\!\\left[e + (1)^{0.8} - 1\\right] = \\ln\\!\\left[e + 1 - 1\\right] = \\ln(e) = 1 \\]
<p>That is why \\( e \\) (Euler's number, \\( \\approx 2.71828 \\)) sits inside the brackets: it is exactly the additive constant needed so that a ratio of 1 (average loss history) produces \\( \\ln(e) = 1 \\), leaving capital \\( = \\text{BIC} \\times 1 = \\text{BIC} \\) unchanged. If the ratio rises above 1 (worse-than-average losses), the bracketed term grows past \\( e \\), the log exceeds 1, and capital rises above BIC; if the ratio falls below 1, the opposite happens and capital falls below BIC.</p>` },
    { name: "Full capital requirement", math: "\\text{Bucket 1: capital} = \\text{BIC (ILM not used)}, \\qquad \\text{Buckets 2 \\& 3: capital} = \\text{BIC} \\times \\text{ILM}", note: "PS Bank example: BI=€18.48M (bucket 1) → capital=0.12×18.48=€2.22M (BIC only).",
      plain: "This formula says the final operational-risk capital number is just BIC for small (Bucket 1) banks, and BIC scaled up or down by the ILM for larger (Bucket 2 and 3) banks — size sets the base, and only past a certain size does the bank's own loss record start to move the number.",
      derivation: `<p>PS Bank, Inc. worked example from the source: \\( \\text{BI} = \\text{\u20ac}18.48\\,\\text{million} \\), which is well inside Bucket 1's \\( \\text{BI} \\le \\text{\u20ac}1\\,\\text{billion} \\) range, so the entire amount is taxed at the single 12% Bucket 1 rate:</p>
\\[ \\text{capital} = \\text{BIC} = 0.12 \\times \\text{\u20ac}18.48\\,\\text{million} = \\text{\u20ac}2.22\\,\\text{million} \\]
<p>The ILM never enters this calculation at all — not because PS Bank's loss history is unknown, but because Bucket 1 banks are, by design, exempt from having their loss history affect capital.</p>` }
  ],

  eli5: `<p>Imagine your car insurance company sets your base premium mostly off how big and powerful your car is — a bigger engine and more mileage driven means a higher base rate, no questions asked, because bigger/faster cars are statistically more likely to be involved in expensive incidents. That base rate is like the <strong>BIC</strong>: a size-and-activity proxy, computed the same tax-bracket way for every driver regardless of who they actually are. But the insurer doesn't stop there — they also look at YOUR actual driving record over the last several years. If you've had more accidents than a typical driver with your engine size, they nudge your premium up; if you've had a clean record, they nudge it down. If you're brand new and don't have enough driving history yet, they just charge you the base rate and skip the record-based adjustment entirely. That record-based nudge is exactly what the <strong>Internal Loss Multiplier (ILM)</strong> does to a bank's capital charge — except it only applies once your "car" (bank) is big enough (Bucket 2 or 3) for the insurer to bother tracking your record at all.</p>`,

  thinkLike: `<p>A risk manager building this number doesn't sit down and "model" operational risk the way a market-risk desk models VaR — that flexibility is precisely what the SMA was designed to remove. Instead, the job is closer to careful bookkeeping under an audit-ready rulebook: pull three years of income-statement data, compute ILDC/SC/FC exactly as defined (watch the absolute-value treatment on trading and banking-book P&L — losses count just as much as gains), determine the bucket, run the marginal BIC calculation like a tax accountant, and then — if the bank is large enough — pull ten years of internal loss data that has been curated against a strict inclusion/exclusion policy (no PP&E maintenance, no insurance premiums, no post-event upgrade costs) to compute the Loss Component and ILM. The exam typically tests this reading in one of three shapes: (1) a pure BIC calculation where the trap is applying the top bucket's rate to the whole BI instead of doing it marginally; (2) a conceptual question on what the ILM does and when it is skipped (worse/better than average, or <5 years of data); and (3) a gross-loss inclusion/exclusion question where the PP&E maintenance exclusion is the single most recycled distractor in the entire reading. Think of your job as "get the mechanical bracket math right, and know precisely which loss items regulators consider real operational-risk losses versus ordinary running costs."</p>`,

  breakdown: [
    {
      title: "The three components of the Business Indicator (BI)",
      points: [
        "ILDC (interest, lease, dividend component): net interest income (capped relative to interest-earning assets) plus dividend income — the 'lending and investing' slice of the bank's activity.",
        "SC (services component): max(fee income, fee expense) plus max(other operating income, other operating expense) — the 'fee and service' slice; using the larger of income vs. expense captures scale of activity even where the bank is a net payer of fees.",
        "FC (financial component): absolute value of net trading book P&L plus absolute value of net banking book P&L — the 'market activity' slice; both trading gains AND trading losses add to BI, since both reflect the same underlying scale of risk-taking."
      ]
    },
    {
      title: "The three BI buckets and their marginal BIC rates",
      points: [
        "Bucket 1 (BI ≤ €1 billion): a single 12% marginal rate applies to this entire slice.",
        "Bucket 2 (€1 billion < BI ≤ €30 billion): the portion of BI falling in this range is charged 15%, on top of the Bucket 1 charge for the first €1 billion.",
        "Bucket 3 (BI > €30 billion): the portion above €30 billion is charged 18%, on top of the Bucket 1 and Bucket 2 charges below it — this is a marginal, tax-bracket-style stack, never a flat rate on the whole BI."
      ]
    },
    {
      title: "Four goals of the December 2017 Basel III finalization (the reforms this reading's SMA formula belongs to)",
      points: [
        "Expand the robustness and risk-sensitivity of the standardized approaches for credit risk, CVA risk, and operational risk.",
        "Restrict the use of internal-model approaches for those same three risk types (e.g., A-IRB removed for large/mid corporates and financial institutions; IRB removed entirely for CVA risk).",
        "Add a G-SIB leverage ratio buffer, to be met with Tier 1 capital.",
        "Create a more risk-sensitive output floor — RWA = max(RWA under the bank's approved approach, 72.5% × RWA under the standardized approach) — so internal models can never push a large bank's capital too far below the standardized-approach benchmark."
      ]
    },
    {
      title: "SMA gross-loss data set: what's included vs. excluded",
      points: [
        "Included: external expenses (legal, advisory, vendor, repair/replacement) tied to the event; settlements, impairments, write-downs, and direct income-statement charges; reserves/provisions booked for the event; material pending losses sitting in suspense accounts; material timing losses that span more than one accounting period.",
        "Excluded: costs of post-event improvements, upgrades, or risk-assessment enhancements; insurance premiums; and general maintenance contract costs on property, plant & equipment (PP&E) — this last exclusion is the classic exam trap because maintenance sounds 'operational' but is really just an ordinary running cost, not a loss from a discrete risk event.",
        "The dataset itself uses losses NET of insurance recoveries, but gross loss, insurance recoveries, and non-insurance recoveries must all be tracked and identified separately.",
        "Only the date of accounting (when the reserve, loss, or loss provision was first recognized on the income statement) may be used to build the loss dataset — for legal losses specifically, that means the date the legal reserve is first booked."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank has a Business Indicator (BI) of €13 billion. What is its business indicator component (BIC)?",
      options: ["€1.43 billion", "€1.92 billion", "€1.95 billion", "€2.34 billion"],
      answer: 1,
      why: "BIC is marginal: 12% on the first €1bn (€0.12bn) plus 15% on the remaining €12bn from €1bn to €13bn (€1.80bn) = €1.92bn. The tempting distractor €1.95bn comes from wrongly applying the flat Bucket 2 rate (15%) to the entire €13bn instead of only the portion above €1bn — exactly the marginal-vs-flat trap this reading warns about."
    },
    {
      q: "A bank's average annual operational losses over the past 10 years produce a Loss Component exactly equal to its BIC. What is its ILM, and what happens to its capital requirement?",
      options: [
        "ILM = 0; capital falls to zero",
        "ILM = 1; capital equals BIC, unchanged",
        "ILM cannot be computed without more data",
        "ILM > 1; capital rises above BIC"
      ],
      answer: 1,
      why: "Setting Loss Component = BIC makes the ratio inside the ILM formula equal 1, so ILM = ln[e + 1^0.8 − 1] = ln(e) = 1, leaving capital = BIC × 1 = BIC unchanged. This is the industry-average anchor point the formula is deliberately built around."
    },
    {
      q: "Which of the following is EXCLUDED from the gross loss calculation in the SMA's operational loss dataset?",
      options: [
        "A €2 million settlement tied to an operational risk event",
        "A €1.4 million reserve booked to the income statement for a potential operational loss",
        "€1.75 million spent on general maintenance contracts for the bank's property, plant, and equipment",
        "Legal fees directly tied to an operational risk event"
      ],
      answer: 2,
      why: "General PP&E maintenance contract costs are explicitly excluded — they are ordinary, recurring running costs of doing business, not losses from a discrete operational risk event. Settlements, booked reserves, and event-related legal fees are all explicitly included, which makes maintenance costs the one item that doesn't belong — and the exam's favorite distractor because it 'feels' operational."
    },
    {
      q: "Why did the Basel Committee replace the Advanced Measurement Approach (AMA) with the Standardized Measurement Approach (SMA)?",
      options: [
        "AMA was too simple and didn't account for a bank's own loss history at all",
        "AMA's principles-based flexibility failed to produce convergence on best practices and led to poor comparability across banks",
        "AMA required more capital than regulators believed was appropriate for operational risk",
        "SMA is itself a model-based approach that improves on AMA's accuracy"
      ],
      answer: 1,
      why: "AMA (introduced under Basel II in 2006) let banks use a wide range of internal models, hoping best practices would converge — instead it produced poor cross-bank comparability and overly complex calculations. SMA is explicitly non-model-based, trading flexibility for comparability and simplicity. AMA did incorporate internal losses, and it wasn't 'too simple' — it was the opposite (too flexible/complex) — which is why options describing it as simple or purely capital-driven are wrong."
    },
    {
      q: "A bank has a BI of €18.48 million and is in Bucket 1 with a strong internal loss history well below what a bank its size would typically report. What is its SMA operational risk capital requirement?",
      options: [
        "Less than €2.22 million, because its good loss record lowers the ILM below 1",
        "€2.22 million, because Bucket 1 banks apply BIC alone and never use the ILM",
        "€2.22 million multiplied by the bank's ILM",
        "Zero, because a strong loss record eliminates the capital charge"
      ],
      answer: 1,
      why: "Capital = BIC = 0.12 × €18.48 million = €2.22 million. Bucket 1 banks (BI ≤ €1 billion) never apply the ILM, no matter how good or bad their loss history is — the ILM only enters the calculation for Bucket 2 and 3 banks. This is a frequently tested trap: assuming loss history always matters."
    },
    {
      q: "A bank's subsidiary crosses into Bucket 2 territory on a subconsolidated basis but does not meet the qualitative standards required to use its own loss component. How is its SMA capital requirement calculated?",
      options: [
        "Using the parent group's consolidated loss experience instead of its own",
        "Using 100% of the subsidiary's BIC, with no ILM applied",
        "The subsidiary is automatically reclassified into Bucket 1",
        "The subsidiary must wait until it accumulates 10 years of loss data before any capital is required"
      ],
      answer: 1,
      why: "A subsidiary that reaches Bucket 2/3 must use its OWN loss experience, not the group's — but if it fails to meet the qualitative standards needed to incorporate that loss component, its capital requirement defaults to 100% of its own BIC (effectively treated like Bucket 1 for that entity), not zero and not the parent's numbers."
    }
  ],

  sources: [
    { title: "Basel III: Finalising post-crisis reforms (Basel Committee, Dec 2017)", url: "https://www.bis.org/bcbs/publ/d424.htm", note: "The primary regulatory text defining the Business Indicator, BIC buckets, ILM, and the SMA operational risk capital formula covered in this reading." },
    { title: "Operational risk — Standardised Measurement Approach, Basel Framework", url: "https://www.bis.org/basel_framework/chapter/OPE/25.htm", note: "The consolidated Basel Framework chapter with the current, official SMA calculation text and worked definitions." },
    { title: "Advanced Measurement Approach (AMA)", url: "https://en.wikipedia.org/wiki/Advanced_measurement_approach", note: "Background on the AMA framework the SMA replaced, useful for contrasting the model-based vs. non-model-based philosophies." },
    { title: "Basel III explained", url: "https://www.investopedia.com/terms/b/basel_iii.asp", note: "A plain-language overview of the broader Basel III capital and liquidity reform package this reading's SMA formula sits inside." }
  ],

  pdf: { book: 3, query: "standardized approach for measuring operational risk represents a combination" },

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
