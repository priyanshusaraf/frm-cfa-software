FRM.register({
  book: 3, reading: 60,
  session: "Capital and Regulatory Frameworks",
  title: "Solvency, Liquidity, and Other Regulation After the Global Financial Crisis",
  tagline: "The 2007-09 crisis exposed exactly where Basel II fell short — this reading is the point-by-point fix: Basel 2.5, Basel III, and the new liquidity regime that addresses the risk that actually killed banks in 2008: liquidity, not insolvency.",

  teaches: `<p>Basel 2.5's three fixes to market risk capital (stressed VaR, IRC, CR charge), Basel III's capital tiers/ratios/buffers, the liquidity ratios (leverage ratio, LCR, NSFR), contingent convertible bonds (CoCos), and the broader Dodd-Frank reform wave.</p>`,

  why: `<p>2008's real killer was liquidity, not insolvency — banks with adequate capital still failed because they couldn't fund themselves day to day. This reading is where regulation finally addresses that specific failure mode with the LCR and NSFR, a direct thematic link to Book 4's entire liquidity risk framework.</p>`,

  intuition: `<p>Basel 2.5 patches market risk capital with THREE additions: stressed VaR (calibrated to the worst year in the bank's own recent history, not a fixed 2008 assumption), the incremental risk charge (IRC, for credit-sensitive trading book instruments, using a constant-level-of-risk rebalancing assumption), and the comprehensive risk charge (replacing specific risk charge and IRC for correlation-sensitive instruments like ABS/CDOs, with unrated/deep-junk tranches requiring dollar-for-dollar capital).</p>
  <p>Basel III's capital buffers work like a car's safety margin: the capital conservation buffer (2.5% of RWA) is MANDATORY, built in good times, drawn down in stress — dividends get constrained as it's depleted. The countercyclical buffer (0-2.5%) is DISCRETIONARY, set by national regulators to dampen credit overheating. Don't conflate the two buffers' governance — one is a rule, the other is a dial regulators can turn.</p>`,

  visual: `<div class="widget" data-widget="capitalstack" data-stack='{"cet1":4.5,"at1":1.5,"t2":2.0,"ccb":2.5,"ccyb":0,"gsib":0}'></div>`,

  formulas: [
    { name: "Total market risk capital (with stressed VaR)", math: "\\text{capital} = \\text{VaR}_{\\text{previous day}} + (m_s\\times\\text{avg stressed VaR, 60-day})", note: "$15.6M + (3×$18.4M) = $70.8M — roughly double the pre-2.5 charge, by design." },
    { name: "Basel III minimum ratios (normal times)", math: "\\dfrac{\\text{Tier1 equity}}{\\text{RWA}}\\ge 4.5\\% \\quad\\cdot\\quad \\dfrac{\\text{Total Tier1}}{\\text{RWA}}\\ge 6\\% \\quad\\cdot\\quad \\dfrac{\\text{Total capital}}{\\text{RWA}}\\ge 8\\%", note: "With the 2.5% capital conservation buffer added: 7.0% / 8.5% / 10.5%." },
    { name: "Leverage ratio", math: "\\dfrac{\\text{capital}}{\\text{total exposure}} \\ge 3\\%", note: "Unweighted, includes some off-balance-sheet items." },
    { name: "Liquidity Coverage Ratio (LCR)", math: "\\dfrac{\\text{HQLA}}{\\text{net cash outflows over 30 days}} \\ge 100\\%", note: "$30 HQLA / $20 net outflow = 150% ✓." },
    { name: "Net Stable Funding Ratio (NSFR)", math: "ASF / RSF \\ge 100\\%", note: "$147.50 ASF / $137.00 RSF = 107.66% ✓." }
  ],

  concepts: [
    {
      name: "Basel 2.5: three fixes to market risk capital",
      def: "Stressed VaR: uses a 250-day window from the worst one-year period in the bank's own most recent seven years (bank-specific, not a fixed assumption). Incremental risk charge (IRC): 99.9%, one-year VaR for credit-sensitive trading-book instruments, using a constant level of risk assumption. Comprehensive risk (CR) charge: replaces specific risk charge and IRC for correlation-sensitive instruments (ABS, CDOs) — unrated or below-BB− tranches require dollar-for-dollar (100%) capital.",
      example: "Previous-day VaR=$15.6M, avg VaR(60d)=$4.8M, previous-day stressed VaR=$17.7M, avg stressed VaR=$18.4M, mr=ms=3 → total = 15.6+(18.4×3) = $70.8M (roughly double the pre-2.5 capital charge, by design).",
      pitfall: "IRC assumes the bank REBALANCES back to the original position at each instrument's estimated liquidity horizon (minimum 3 months), booking small losses on downgrades rather than riding out full defaults — don't confuse this with a buy-and-hold assumption.",
      related: [{ r: 26, label: "R26 — constant-level-of-risk vs buy-and-hold, the same rebalancing logic" }],
      memory: "Three fixes: stress the VaR (bank's own worst year), charge for credit migration in the trading book (IRC), and charge dollar-for-dollar on junk tranches (CR charge)."
    },
    {
      name: "Basel III capital tiers & ratios",
      def: "Tier 1 equity (common equity + retained earnings, minus goodwill/intangibles/DTAs/DVA effects) + additional Tier 1 (noncumulative perpetual preferred, contingent-convertible debt) + Tier 2 (subordinated debt ≥5yr, some preferred, limited loan loss reserves). Tier 3 eliminated entirely.",
      example: "Minimum ratios (normal times): Tier1 equity/RWA≥4.5%, Total Tier1/RWA≥6%, Total capital/RWA≥8%.",
      related: ["Capital buffers"]
    },
    {
      name: "Capital buffers",
      def: "With capital conservation buffer (CCB, 2.5% of RWA, Tier 1 equity): Tier1 equity≥7.0%, Total Tier1≥8.5%, Total capital≥10.5%. Dividends are constrained as the buffer is drawn down (e.g., at 6% Tier 1 equity ratio, a bank must retain ≥60% of earnings).",
      example: "Countercyclical buffer (CCyB): 0-2.5% of RWA, at national discretion, weighted across jurisdictions for international banks — dampens credit overheating (cheaper to raise capital in good times than bad). G-SIB buffer: additional 1%-3.5% (5 tiers) for globally systemically important banks, plus (since 2017) a G-SIB leverage ratio buffer.",
      pitfall: "The capital conservation buffer is MANDATORY (built up in normal times, drawn down in stress) — it is NOT discretionary the way the countercyclical buffer is left to national regulators. Don't conflate the two buffers' governance.",
      related: [],
      memory: "CCB: mandatory, always there. CCyB: discretionary, regulators turn the dial based on credit conditions."
    },
    {
      name: "Liquidity ratios — the crisis's real lesson",
      def: "Leverage ratio: capital/total exposure≥3% (unweighted, includes off-balance-sheet items). LCR: HQLA/net cash outflows over 30 days≥100%. NSFR: ASF/RSF≥100%.",
      example: "HQLA (cash+central bank reserves+Treasuries, 0% haircut)=$30. Net 30-day outflow=(100×5% retail)+(75×20% wholesale)+(20×0% capital)=$20. LCR=30/20=150% ✓. ASF=(100×0.9)+(75×0.5)+(2×1.0)+(18×1.0)=$147.50. RSF=$137.00. NSFR=147.50/137.00=107.66% ✓.",
      pitfall: "LCR haircuts: central bank/government securities 0%, corporate debt/equity 50%, individual mortgages EXCLUDED entirely. HQLA must survive a 30-day severe stress: 3-notch downgrade, deposit runs, total wholesale funding loss, collateral devaluation, credit line drawdowns.",
      related: [{ r: 63, label: "R63 — the full liquidity risk framework this addresses" }],
      memory: "Leverage ratio: crude, unweighted backstop. LCR: survive 30 days. NSFR: stable funding over a longer horizon."
    },
    {
      name: "Contingent convertible bonds (CoCos)",
      def: "Unlike ordinary convertibles (bondholder chooses to convert), CoCos convert to equity AUTOMATICALLY on a trigger — typically a Tier 1 equity/RWA threshold breach, supervisor judgment of insolvency risk, or a market-cap/assets ratio floor.",
      pitfall: "Motivation: debt in normal times (doesn't drag ROE), automatic equity cushion in stress (private capital absorbs losses instead of a government bailout) — the whole point is shifting loss absorption from taxpayers to private CoCo investors.",
      related: [{ r: 91, label: "R91 — the Credit Suisse CoCo wipeout, a real-world case where this trigger fired" }],
      memory: "CoCos: debt that quietly waits to become equity the moment things go wrong — a built-in, automatic bailout by private investors instead of the government."
    },
    {
      name: "Dodd-Frank and the broader reform wave",
      def: "FSOC (systemic risk monitoring), SIFIs must maintain living wills, compensation reform (discourage short-termist risk-taking, shareholder say-on-pay), OTC derivatives moved to central clearing/exchanges (SEFs mandated), increased rating-agency transparency (Office of Credit Ratings), Consumer Financial Protection Bureau (CFPB), ability-to-repay mortgage requirements, minimum 5% securitization retention ('skin in the game'), Volcker Rule (bars proprietary trading by deposit-taking banks).",
      related: [{ r: 52, label: "R52 — the Volcker Rule and investor protection regulations" }]
    }
  ],

  connections: {
    from: [
      { r: 59, why: "Basel 2.5/III are the direct patches on exactly the Basel II framework built there." },
      { r: 26, why: "The IRC's constant-level-of-risk assumption reuses the same rebalancing logic as R26's Credit VaR rebalancing comparison." }
    ],
    to: [
      { r: 61, why: "The 2017 finalization builds directly on this reform wave's foundation." },
      { r: 63, why: "The full liquidity risk framework (Book 4) elaborates on exactly the LCR/NSFR concepts introduced here." },
      { r: 91, why: "The Credit Suisse CoCo wipeout is the real-world case study of this reading's CoCo mechanism." }
    ],
    confused: [
      { what: "Capital conservation buffer vs countercyclical buffer", how: "CCB is MANDATORY (always required, drawn down in stress); CCyB is DISCRETIONARY (national regulators choose the level, 0-2.5%, based on credit conditions) — different governance entirely." },
      { what: "Leverage ratio vs LCR vs NSFR", how: "Leverage ratio: crude unweighted capital backstop. LCR: survive a 30-day severe stress. NSFR: maintain stable funding over a longer structural horizon — three different lenses on solvency/liquidity." },
      { what: "Ordinary convertible bonds vs CoCos", how: "Ordinary convertibles: bondholder CHOOSES to convert. CoCos: convert AUTOMATICALLY on a regulatory/market trigger — no bondholder choice involved." }
    ]
  },

  misconceptions: [
    { wrong: "\"The capital conservation buffer, like the countercyclical buffer, is left to national regulator discretion.\"", right: "The CCB is MANDATORY (2.5% of RWA, built in good times, drawn down in stress with dividend constraints) — only the countercyclical buffer (0-2.5%) is discretionary." },
    { wrong: "\"Stressed VaR uses a fixed assumption based on the 2008 financial crisis for every bank.\"", right: "Stressed VaR uses a 250-day window from the WORST ONE-YEAR PERIOD IN THE BANK'S OWN most recent seven years — it's bank-specific, not a fixed universal 2008 assumption." },
    { wrong: "\"CoCo bondholders choose whether to convert their bonds to equity, like ordinary convertible bonds.\"", right: "CoCos convert AUTOMATICALLY on a predefined trigger (capital ratio breach, supervisor judgment, market-cap floor) — bondholders have no choice, unlike ordinary convertibles." },
    { wrong: "\"The incremental risk charge (IRC) assumes a buy-and-hold strategy for credit-sensitive trading book instruments.\"", right: "IRC assumes a CONSTANT LEVEL OF RISK — the bank rebalances back to the original position at each instrument's liquidity horizon (minimum 3 months), booking small downgrade losses rather than riding out full defaults." }
  ],

  highYield: [
    { stars: 5, what: "LCR and NSFR formulas, haircuts, and full worked calculations.", why: "The single most important post-crisis regulatory innovation — the direct fix for what actually killed banks in 2008." },
    { stars: 5, what: "Capital conservation buffer (mandatory) vs countercyclical buffer (discretionary) — governance distinction.", why: "Explicitly flagged as a frequently conflated pair." },
    { stars: 4, what: "Basel 2.5's three market risk fixes: stressed VaR, IRC, CR charge — and the stressed VaR's bank-specific window.", why: "A precise three-part framework with a commonly missed detail (bank-specific, not fixed 2008)." },
    { stars: 4, what: "CoCo automatic conversion trigger and its loss-absorption rationale.", why: "Connects directly to the Credit Suisse case study (R91) — a high-value synthesis area." },
    { stars: 3, what: "Basel III capital tiers/ratios with and without the CCB.", why: "A clean numeric ladder (4.5%/6%/8% → 7.0%/8.5%/10.5%), good for quick recall drilling." }
  ],

  recall: [
    { q: "A bank's HQLA is $45M and its net 30-day cash outflow under stress is $40M. Does it meet the LCR requirement?", a: "LCR = 45/40 = 112.5%, which exceeds the 100% minimum requirement — the bank meets the LCR standard." },
    { q: "Why is stressed VaR calibrated to each bank's own worst historical year rather than a fixed industry-wide stress period like 2008?", a: "Different banks have different portfolios and risk profiles, so a fixed universal stress period might not capture each bank's OWN worst-case exposure. Calibrating to each bank's own worst one-year period over its most recent seven years ensures the stress captures a genuinely severe scenario relevant to that specific bank's actual risk profile." },
    { q: "A bank's Tier 1 equity ratio falls to 6% during a downturn (below the 7.0% buffer-inclusive requirement but above the bare 4.5% minimum). What happens to its dividend policy?", a: "As the capital conservation buffer is drawn down, dividend payouts become increasingly constrained — at a 6% Tier 1 equity ratio specifically, the bank must retain at least 60% of its earnings (paying out no more than 40%), a mandatory constraint that tightens further as the ratio falls closer to the bare 4.5% minimum." },
    { q: "Explain why CoCo bonds are structured to convert to equity automatically rather than leaving conversion to bondholder discretion.", a: "The whole regulatory purpose of CoCos is to provide an automatic, reliable equity cushion exactly when a bank is under stress — leaving conversion to bondholder choice would undermine this, since bondholders facing a struggling bank would rationally choose NOT to convert (preferring their senior debt claim over new equity in a failing institution). Automatic triggering ensures the loss-absorption mechanism actually fires when needed, shifting losses to private CoCo investors instead of requiring a taxpayer bailout." }
  ],

  hooks: [
    { title: "It wasn't insolvency, it was the bank run", text: "2008's real lesson: banks with capital still died because they ran out of CASH, not net worth. LCR and NSFR are regulation's direct answer to that specific, painful lesson." },
    { title: "Mandatory vs. the dial", text: "Capital conservation buffer: a rule, always on. Countercyclical buffer: a dial regulators turn up when credit is overheating, down when it's not — one is automatic, the other is judgment." },
    { title: "The bond that quietly becomes equity", text: "A CoCo is a sleeper agent: ordinary debt in peacetime, and the moment a trigger fires, it wakes up as equity — private investors absorbing losses so taxpayers don't have to." }
  ],

  summary: `<p><strong>Basel 2.5</strong>: stressed VaR (bank's own worst 7yr window), IRC (99.9%/1yr, constant-level-of-risk rebalancing, min 3mo horizon), CR charge (replaces specific risk+IRC for ABS/CDOs, deep-junk = 100% capital). <strong>Basel III tiers</strong>: Tier1 equity≥4.5%, Tier1≥6%, total≥8% (normal); +2.5% CCB (MANDATORY) → 7.0%/8.5%/10.5%; CCyB (0-2.5%, DISCRETIONARY); G-SIB buffer (1-3.5%). <strong>Leverage ratio</strong>≥3% (unweighted). <strong>LCR</strong>=HQLA/30-day net outflow≥100% (govt securities 0% haircut, corporate 50%, mortgages excluded). <strong>NSFR</strong>=ASF/RSF≥100%. <strong>CoCos</strong>: automatic (not bondholder-chosen) conversion on trigger — private loss absorption instead of bailout. <strong>Dodd-Frank</strong>: FSOC, living wills, Volcker Rule, CFPB, central clearing mandate, securitization skin-in-the-game.</p>`
});
