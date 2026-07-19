FRM.register({
  book: 3, reading: 59,
  session: "Capital and Regulatory Frameworks",
  title: "Capital Regulation Before the Global Financial Crisis",
  tagline: "The origin story of modern bank capital regulation: Basel I (1988, credit risk only) and Basel II (2004/2007, three pillars, sophisticated credit approaches, and operational risk capital for the first time).",

  teaches: `<p>Basel I's three capital ratios and RWA, off-balance-sheet CEA, the 1995 netting amendment, the 1996 market risk capital amendment, Basel II's three pillars, Basel II's three credit risk approaches (with the full IRB formula), Basel II's three operational risk approaches, and Solvency II's insurance parallel.</p>`,

  why: `<p>This reading has more testable formulas than almost any other reading in this book — budget serious drilling time. Every later Basel reading (2.5, III, the 2017 finalization) is a patch on the framework built here.</p>`,

  intuition: `<p>Basel I's big innovation was RISK-WEIGHTING: instead of treating all assets equally for capital purposes, weight them by riskiness (0% for T-bills, 100% for corporate loans). Basel II's big innovation was SOPHISTICATION: instead of one crude risk-weight bucket per asset type, let banks use their own PD estimates (IRB) for a more risk-sensitive capital charge — and, for the first time, explicitly capitalize operational risk.</p>
  <p>The IRB formula is the Vasicek/Gordy one-factor Gaussian copula (identical machinery to R26's WCDR and R29's V(T,X)) applied as the actual regulatory capital rule: Capital = EAD×LGD×[WCDR−PD]×MA. Higher-rated corporate exposures see their capital requirement fall substantially under IRB relative to Basel I's flat treatment — the whole point of adding risk sensitivity.</p>`,

  formulas: [
    { name: "Basel I's three Cooke ratios", math: "\\dfrac{\\text{Assets}}{\\text{Capital}} < 20 \\quad\\cdot\\quad \\dfrac{\\text{Tier1}}{\\text{RWA}} > 4\\% \\quad\\cdot\\quad \\dfrac{\\text{Total capital}}{\\text{RWA}} > 8\\%", note: "Tier 1 = equity minus goodwill + noncumulative perpetual preferred. Tier 2 (capped at 50% of total) = cumulative preferred, 99yr debentures, subordinated debt >5yr." },
    { name: "CEA for derivatives (current exposure method)", math: "CEA = max(V, 0) + D \\times L", note: "V=current value, D=add-on factor, L=principal. $175M swap, current value $2.5M, add-on 0.5% → CEA=2.5+(0.005×175)=$3.375M." },
    { name: "Net replacement ratio (1995 netting amendment)", math: "\\text{NRR} = \\dfrac{\\text{exposure with netting}}{\\text{exposure without netting}}", note: "+20,−7,+5 → without netting=$25M, with netting=$18M → NRR=0.72." },
    { name: "Market risk capital charge (1996 amendment)", math: "\\text{capital} = \\max(\\text{previous day VaR},\\ m_c\\times\\text{avg 60-day VaR}) + \\text{specific risk charge}", note: "10-day 99% VaR; mc≥3 set by backtesting 250 days (traffic-light zones)." },
    { name: "IRB capital charge (Vasicek/Gordy one-factor)", math: "\\text{Capital} = \\text{EAD}\\times\\text{LGD}\\times[\\text{WCDR} - \\text{PD}]\\times\\text{MA}", note: "WCDR = \\(DR_{99}._{9}\\), the 99.9th-percentile default rate." },
    { name: "Maturity adjustment & RWA", math: "\\text{MA} = \\dfrac{1+(M-2.5)b}{1-1.5b};\\quad \\text{RWA} = 12.5\\times\\text{Capital}", note: "$150M A-rated loan, PD=0.1%, LGD=50%, DR99.9=3.4%, M=2.5: Capital=150×0.5×(0.034−0.001)=$2.475M → RWA=$49.19M (vs $150M flat under Basel I)." },
    { name: "Basel II operational risk — BIA", math: "\\text{Capital} = 15\\%\\times\\text{(3-year average annual gross income)}", note: "Negative-income years excluded from the average. $20B/−$2B(excl)/$12B → (20+12)/2×0.15=$2.4B." }
  ],

  concepts: [
    {
      name: "Basel I: three capital ratios & RWA",
      def: "Total assets/capital < 20 (capital/assets>5%); Tier1/RWA>4%; Total capital/RWA>8% (the 'Cooke ratios'). Tier 1 (core): equity minus goodwill, noncumulative perpetual preferred. Tier 2 (supplementary, capped at 50% of total capital): cumulative perpetual preferred, certain 99-year debentures, subordinated debt >5yr original maturity.",
      example: "$20M T-bills(0%) + $20M insured mortgages(0%) + $50M uninsured mortgages(50%) + $150M corporate loans(100%) = 0+0+25+150 = $175M RWA.",
      related: []
    },
    {
      name: "Off-balance-sheet items: CEA",
      def: "CEA = max(V,0) + D×L for derivatives (current exposure method).",
      example: "$175M swap, 3yr remaining, current value $2.5M, add-on factor 0.5% → CEA=2.5+(0.005×175)=$3.375M. RWA (OECD bank, 20% weight)=$675,000; RWA (corporate, 100% weight)=$3.375M. Required capital (corporate)=(175+3.375)×0.08=$14.27M.",
      related: ["1995 netting amendment"]
    },
    {
      name: "1995 netting amendment",
      def: "Net replacement ratio (NRR) = current exposure with netting / current exposure without netting.",
      example: "Exposures +20,−7,+5 (millions): without netting=$25M, with netting=$18M → NRR=18/25=0.72.",
      related: [{ r: 33, label: "R33 — netting mechanics generally, this Basel I quantification" }]
    },
    {
      name: "1996 Amendment: market risk capital",
      def: "capital = max(previous day VaR, mc×average 60-day VaR) + specific risk charge. 10-day, 99% VaR; mc≥3, set by backtesting 250 days of 99% 1-day VaR against actual losses.",
      example: "Exceptions of 250: <5→3.00, 5-9→3.40-3.85, >10→4.00. Previous-day VaR=$10M, 60-day avg=$8M, m=3 → capital=0.08×[12.5×(3×$8M)]=$24M.",
      pitfall: "This is the same Basel traffic-light backtesting framework from R4, now with the capital multiplier consequence made explicit.",
      related: [{ r: 4, label: "R4 — the traffic-light backtesting zones this multiplier is drawn from" }]
    },
    {
      name: "Basel II: three pillars",
      def: "Pillar 1 minimum capital (credit + market + operational risk, still 8% of RWA total). Pillar 2 supervisory review (regulator discretion, ICAAP required). Pillar 3 market discipline (mandatory quantitative/qualitative disclosure).",
      related: [{ r: 41, label: "R41 — these same three pillars applied specifically to op risk" }]
    },
    {
      name: "Basel II credit risk: three approaches",
      def: "Standardized (Basel-I-like, but ratings now matter — sovereign risk weights 0%-150%, banks/corporates 20%-150%). Foundation IRB (bank supplies PD only; LGD/EAD/M are supervisory values — LGD=45% senior, 75% subordinated, M usually 2.5). Advanced IRB (bank supplies PD, LGD, EAD, and M).",
      related: ["IRB capital charge"]
    },
    {
      name: "IRB capital charge (Vasicek/Gordy one-factor Gaussian copula)",
      def: "Capital_i = EAD_i × LGD_i × [WCDR_i − PD_i] × MA. WCDR = \\(DR_{99}._{9}\\), the 99.9th-percentile default rate. MA = [1+(M−2.5)b]/(1−1.5b); RWA = 12.5 × Capital required.",
      example: "$150M loan to A-rated corp, PD=0.1%, LGD=50%, DR99.9=3.4%, M=2.5yr. Capital = 150×0.5×(0.034−0.001) = $2.475M → RWA = 12.5×2.475 = $49.19M (vs. $150M flat under Basel I — IRB substantially lowers RWA for higher-rated corporate exposures).",
      pitfall: "Retail exposures merge foundation/advanced IRB (bank supplies PD, EAD, LGD directly) and DROP the maturity adjustment entirely: capital = EAD×LGD×(DR99.9−PD). This IRB formula is the identical Vasicek/Gordy machinery from R26/R29 — same equation, regulatory context.",
      related: [{ r: 26, label: "R26 — the identical Vasicek WCDR formula" }, { r: 29, label: "R29 — the identical one-factor Gaussian copula" }],
      memory: "One formula, three reading numbers (R26, R29, R59) — the IRB capital charge is Vasicek's WCDR wearing a regulatory uniform."
    },
    {
      name: "Basel II operational risk: three approaches",
      def: "Basic indicator (BIA): 15% × 3-yr average annual gross income (negative-income years excluded). Standardized: same idea, different multiplier per business line (e.g., 12% retail, 15% commercial, 18% payments/settlement). Advanced measurement approach (AMA): internal one-year, 99.9% VaR model; can reflect insurance mitigation.",
      example: "BIA: Gross income $20B(Yr1), −$2B(Yr2, excluded), $12B(Yr3) → capital=(20+12)/2×0.15=$2.4B.",
      related: [{ r: 43, label: "R43 — the LDA underlying AMA's internal modeling" }, { r: 62, label: "R62 — the SMA, which replaces all three of these approaches" }]
    },
    {
      name: "Solvency II (insurance parallel to Basel II)",
      def: "SCR (solvency capital requirement) sits above the MCR (minimum capital requirement) floor. Two approaches: standardized (average-firm risk profile) or internal models (one-year VaR at 99.5% confidence).",
      pitfall: "Basel II's IRB confidence level (99.9%) and Solvency II's internal model confidence level (99.5%) are FREQUENTLY SWAPPED by mistake on the exam — banks get the stricter 99.9%, insurers get 99.5%. Three internal-model tests: statistical quality, calibration, use test.",
      related: [],
      memory: "Banks: 99.9% (stricter). Insurers: 99.5% (slightly less strict) — don't swap them."
    }
  ],

  connections: {
    from: [
      { r: 58, why: "Modern capital planning processes sit on top of this foundational regulatory framework." },
      { r: 26, why: "The IRB capital formula is the identical Vasicek WCDR formula from credit VaR." }
    ],
    to: [
      { r: 60, why: "This reading's Basel II framework is exactly what the 2007-09 crisis exposed and Basel 2.5/III patched." }
    ],
    confused: [
      { what: "Foundation IRB vs Advanced IRB", how: "Foundation IRB: bank supplies PD only (LGD/EAD/M are supervisory fixed values). Advanced IRB: bank supplies ALL of PD, LGD, EAD, and M." },
      { what: "Basel II IRB confidence (99.9%) vs Solvency II (99.5%)", how: "Banks (Basel II IRB) use 99.9%; insurers (Solvency II) use 99.5% — a frequently swapped pair, memorize banks-stricter." },
      { what: "Corporate/retail IRB maturity adjustment", how: "Corporate exposures include the maturity adjustment (MA) in the capital formula; retail exposures DROP the MA entirely — capital = EAD×LGD×(DR99.9−PD) with no MA term." }
    ]
  },

  misconceptions: [
    { wrong: "\"Basel II's IRB approach uses a 99.5% confidence level, same as Solvency II.\"", right: "Basel II IRB uses 99.9% (stricter); Solvency II internal models use 99.5% — banks get the stricter standard, a frequently swapped pair on the exam." },
    { wrong: "\"Retail exposures under IRB include the same maturity adjustment as corporate exposures.\"", right: "Retail IRB DROPS the maturity adjustment entirely: capital = EAD×LGD×(DR99.9−PD), with no MA term, unlike corporate exposures which include MA." },
    { wrong: "\"Foundation IRB and Advanced IRB both require the bank to supply all of PD, LGD, EAD, and M.\"", right: "Foundation IRB only requires the bank to supply PD — LGD, EAD, and M are supervisory-fixed values. Advanced IRB requires the bank to supply all four inputs itself." },
    { wrong: "\"The IRB capital formula is a distinct model from Vasicek's credit VaR framework.\"", right: "It's the IDENTICAL Vasicek/Gordy one-factor Gaussian copula formula (same as R26's WCDR and R29's V(T,X)) — just applied as the actual regulatory capital rule." }
  ],

  highYield: [
    { stars: 5, what: "IRB capital charge formula: Capital=EAD×LGD×[WCDR−PD]×MA, full worked calculation.", why: "The single most important formula in this reading — identical to R26/R29's machinery, appearing in a regulatory-capital context." },
    { stars: 5, what: "Basel I's three Cooke ratios and full RWA worked calculation.", why: "The foundational capital ratio framework, frequently tested with new asset-mix numbers." },
    { stars: 4, what: "Basel II IRB (99.9%) vs Solvency II (99.5%) confidence levels — the frequently swapped pair.", why: "Explicitly flagged as a common exam trap." },
    { stars: 4, what: "1996 market risk capital charge formula and the traffic-light multiplier connection.", why: "Directly reuses R4's backtesting zones in a capital-consequence context." },
    { stars: 3, what: "Basel II operational risk: BIA/Standardized/AMA, especially the BIA worked calculation.", why: "Sets up the SMA's replacement of all three approaches in R62." },
    { stars: 3, what: "Foundation IRB vs Advanced IRB input responsibility split.", why: "A clean, precisely testable two-way distinction." }
  ],

  recall: [
    { q: "A bank holds $30M T-bills (0% weight), $40M insured mortgages (0% weight), $60M uninsured mortgages (50% weight), and $100M corporate loans (100% weight). Compute Basel I RWA and the minimum total capital required.", a: "RWA = 0+0+(60×0.5)+(100×1.0) = 30+100 = $130M. Minimum total capital = 8% × $130M = $10.4M." },
    { q: "Why does an IRB-based capital charge for a highly-rated corporate loan come out dramatically lower than the Basel I flat 100% risk-weight treatment?", a: "Basel I treats all corporate loans identically regardless of actual creditworthiness (100% risk weight, full stop). IRB uses the borrower's actual PD (very low for a high-rated corporate) inside the Vasicek/Gordy formula, so [WCDR−PD] and the resulting capital charge come out much smaller than the crude Basel I flat treatment — reflecting genuinely lower risk for a strong credit." },
    { q: "A bank uses Foundation IRB for a corporate exposure. Which inputs does the bank supply itself, and which are fixed by supervisors?", a: "The bank supplies only PD. LGD (typically 45% senior / 75% subordinated), EAD, and M (maturity, usually 2.5 years) are all supervisory-fixed values under Foundation IRB — only Advanced IRB requires the bank to supply all four inputs itself." },
    { q: "Why is it a common mistake to use 99.9% confidence for a Solvency II internal model calculation?", a: "99.9% is the Basel II IRB confidence level used for BANKS. Solvency II (the insurance parallel) uses a lower 99.5% confidence level for its internal models — banks and insurers use different confidence standards, and this pair is frequently swapped by mistake." }
  ],

  hooks: [
    { title: "One formula, three costumes", text: "R26's WCDR, R29's V(T,X), and R59's IRB capital charge are the same equation in three costumes — the regulatory version just multiplies by EAD×LGD and subtracts PD before applying a maturity adjustment." },
    { title: "Banks get the stricter grade", text: "99.9% for banks (Basel II IRB), 99.5% for insurers (Solvency II) — banks face the tougher bar. Remember 'banks are strict-er' to keep the pair straight." },
    { title: "The risk-weighting revolution", text: "Basel I's whole innovation, compressed: not all assets are equally risky, so don't require equal capital against them. Everything since has been refining HOW FINELY to slice that risk-weighting." }
  ],

  summary: `<p><strong>Basel I</strong>: Cooke ratios (assets/capital<20, Tier1/RWA>4%, total/RWA>8%); risk-weighted assets by asset type; CEA=max(V,0)+D×L for derivatives; NRR quantifies netting benefit; 1996 market risk charge=max(prev VaR, mc×avg 60d VaR)+specific risk (mc from traffic-light backtesting). <strong>Basel II</strong>: three pillars (capital/supervisory review/disclosure); credit risk — Standardized (ratings-based), Foundation IRB (PD only), Advanced IRB (all inputs); <strong>IRB formula</strong> Capital=EAD×LGD×[WCDR−PD]×MA (identical to R26/R29's Vasicek/copula machinery) — retail drops MA entirely. Op risk: BIA (15%×3yr avg gross income), Standardized (per-business-line multiplier), AMA (internal 99.9% VaR model). <strong>Solvency II</strong>: SCR above MCR floor, 99.5% confidence (vs banks' 99.9% — frequently swapped).</p>`
});
