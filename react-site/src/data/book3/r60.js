export default ({
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
    { name: "Total market risk capital (with stressed VaR)", math: "\\text{capital} = \\text{VaR}_{\\text{previous day}} + (m_s\\times\\text{avg stressed VaR, 60-day})", note: "$15.6M + (3×$18.4M) = $70.8M — roughly double the pre-2.5 charge, by design.",
      plain: "The total market-risk capital charge is the ordinary VaR the bank has always calculated PLUS a second, separate stressed-VaR term — you don't replace the old charge, you add a new one on top of it.",
      derivation: "<p>Pre-2007, banks calculated market risk capital as a single term: \\( \\text{capital} = m_r \\times \\text{avg VaR (60-day)} \\), where \\(m_r\\) is a multiplier (minimum 3, higher if the bank's model has failed too many backtests). This worked fine when volatility was low, but the historical-simulation method — which assumes tomorrow's percentage moves are random draws from the last one to four years of data — quietly baked in the low volatility of 2003–2006. So going into the crisis, VaR-based capital was too low precisely when risk was building up.</p><p>Basel 2.5's fix (effective December 31, 2011) does not replace this calculation; it appends a second, independently calculated VaR run on the same portfolio but over a 250-day window drawn from the worst one-year stretch in the bank's own most recent seven years — the \\(\\text{stressed VaR}\\) term. The full charge becomes:</p>\\[ \\text{capital} = \\underbrace{(m_r \\times \\text{avg VaR, 60-day})}_{\\text{ordinary charge}} + \\underbrace{(m_s \\times \\text{avg stressed VaR, 60-day})}_{\\text{new Basel 2.5 term}} \\]<p>In the worked example, Spartan State Bank has \\(m_r = m_s = 3\\) (an accurate model with only two backtesting exceptions keeps the multiplier at its floor of 3). Previous-day VaR is $15.6M and the average stressed VaR over 60 days is $18.4M, so \\( \\text{capital} = 15.6 + (3 \\times 18.4) = \\$70.8\\text{M} \\) — because the stressed window is, by construction, at least as bad as the recent 60-day window, this new total is mechanically at least double the pre-2.5 charge.</p>" },
    { name: "Basel III minimum ratios (normal times)", math: "\\dfrac{\\text{Tier1 equity}}{\\text{RWA}}\\ge 4.5\\% \\quad\\cdot\\quad \\dfrac{\\text{Total Tier1}}{\\text{RWA}}\\ge 6\\% \\quad\\cdot\\quad \\dfrac{\\text{Total capital}}{\\text{RWA}}\\ge 8\\%", note: "With the 2.5% capital conservation buffer added: 7.0% / 8.5% / 10.5%.",
      plain: "Three nested minimums, all measured against the same denominator (risk-weighted assets): the purest, loss-absorbing slice of capital (common equity) must be at least 4.5%, all of Tier 1 (that slice plus preferred/CoCo-type instruments) must be at least 6%, and total capital (Tier 1 plus Tier 2 subordinated debt) must be at least 8% — each ratio is a superset of the one below it, so satisfying the top one automatically helps satisfy the others." },
    { name: "Leverage ratio", math: "\\dfrac{\\text{capital}}{\\text{total exposure}} \\ge 3\\%", note: "Unweighted, includes some off-balance-sheet items.",
      plain: "Capital must be at least 3% of a bank's TOTAL exposure — with no risk-weighting adjustment at all — so it acts as a blunt backstop against a bank gaming its risk weights down to shrink its risk-weighted-asset-based ratios." },
    { name: "Liquidity Coverage Ratio (LCR)", math: "\\dfrac{\\text{HQLA}}{\\text{net cash outflows over 30 days}} \\ge 100\\%", note: "$30 HQLA / $20 net outflow = 150% ✓.",
      plain: "A bank must hold enough high-quality liquid assets to cover, in cash terms, everything that could flow out the door over the next 30 days of a severe funding-market stress.",
      derivation: "<p>Net cash outflow is built up liability-by-liability, not as one number: each funding source is multiplied by an assumed run-off rate (how fast regulators expect it to flee in a crisis) and the results are summed. In the worked example: insured/less-stable retail deposits of $100 run off at 5% (\\(100 \\times 0.05 = 5\\)), non-operational wholesale funding of $75 runs off at 20% (\\(75 \\times 0.20 = 15\\)), and capital of $20 runs off at 0% (\\(20 \\times 0.00 = 0\\)), giving \\( \\text{net outflow} = 5 + 15 + 0 = \\$20\\text{M} \\). HQLA is built the same way from the asset side: cash, central bank reserves, and government securities get a 0% haircut (100% credit), so $30M of these assets counts at full value while loans and fixed assets get a 0% factor (they don't count as HQLA at all). \\[ \\text{LCR} = \\dfrac{30}{20} = 1.50 = 150\\% \\] which clears the 100% minimum with room to spare." },
    { name: "Net Stable Funding Ratio (NSFR)", math: "\\dfrac{\\text{ASF}}{\\text{RSF}} \\ge 100\\%", note: "$147.50 ASF / $137.00 RSF = 107.66% ✓.",
      plain: "Available stable funding — the part of a bank's funding base unlikely to disappear over a full year — must be at least as large as the stable funding its assets require, so the bank isn't relying on money that could vanish before its long-dated assets mature.",
      derivation: "<p>Both sides of the NSFR are built the same way as the LCR, but with factors calibrated to a one-year horizon rather than 30 days. Available stable funding (ASF) weights each funding source by how \"sticky\" it is — capital and long-term liabilities get high factors (near 1.0) because they can't be pulled in a crisis, while short-term wholesale funding gets a low factor because it can. In the worked example: \\( \\text{ASF} = (100 \\times 0.90) + (75 \\times 0.50) + (2 \\times 1.00) + (18 \\times 1.00) = \\$147.50\\text{M} \\). Required stable funding (RSF) weights each asset by how illiquid/long-dated it is — cash needs almost no stable funding behind it (factor near 0), while term loans and fixed assets need a lot (factors of 0.65–1.00): \\( \\text{RSF} = (10\\times0) + (10\\times0) + (10\\times0.05) + (30\\times0.65) + (30\\times0.85) + (90\\times0.85) + (15\\times1.00) = \\$137.00\\text{M} \\). \\[ \\text{NSFR} = \\dfrac{147.50}{137.00} = 1.0766 = 107.66\\% \\] which, together with the 150% LCR, means this bank clears both the 30-day and the one-year liquidity bars." }
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
      example: "Minimum ratios (normal times): Tier1 equity/RWA≥4.5%, Total Tier1/RWA≥6%, Total capital/RWA≥8%. Note that the 8% total-capital minimum is unchanged from Basel I and Basel II — what changed under Basel III is the much stricter DEFINITION of what counts as equity capital (goodwill, intangibles, deferred tax assets, and defined-benefit pension plan deficits are all subtracted out; pension SURPLUSES are not added back, so the adjustment only ever cuts capital, never boosts it).",
      pitfall: "Watch for exam questions asking what gets subtracted from capital: defined-benefit pension deficits, certain cross-holdings of capital within a banking group, and mortgage servicing rights above 10% of common equity all reduce reported capital. There is no equivalent upward adjustment — a pension surplus does NOT add to capital.",
      related: [{ r: 61, label: "R61 — the 2017 finalization builds on these same tier definitions" }]
    },
    {
      name: "Capital buffers",
      def: "With capital conservation buffer (CCB, 2.5% of RWA, Tier 1 equity): Tier1 equity≥7.0%, Total Tier1≥8.5%, Total capital≥10.5%. Dividends are constrained as the buffer is drawn down (e.g., at 6% Tier 1 equity ratio, a bank must retain ≥60% of earnings).",
      example: "Countercyclical buffer (CCyB): 0-2.5% of RWA, at national discretion, weighted across jurisdictions for international banks — dampens credit overheating (cheaper to raise capital in good times than bad). G-SIB buffer: additional 1%-3.5% across five tiers (1%, 1.5%, 2%, 2.5%, 3.5%) for globally systemically important banks. The G-SIB list was first published in 2011 and had 29 institutions on it by 2018; no bank has ever landed in the top 3.5% tier, and as of 2018 only HSBC and JPMorgan Chase sat in the 2.5% tier. Since 2017, G-SIBs also face a leverage-ratio buffer equal to half their risk-based G-SIB buffer (on top of the ordinary 3% leverage ratio, and not counting the CCB).",
      pitfall: "The capital conservation buffer is MANDATORY (built up in normal times, drawn down in stress) — it is NOT discretionary the way the countercyclical buffer is left to national regulators. Don't conflate the two buffers' governance. Also separate this from TLAC (total loss-absorbing capacity): regulators additionally require G-SIBs to hold a pool of bail-in-able instruments (equity, eligible subordinated debt — including CoCos) sized so that, in a default, it can absorb losses and recapitalize the bank without a taxpayer bailout, protecting depositors in the process.",
      related: [],
      memory: "CCB: mandatory, always there. CCyB: discretionary, regulators turn the dial based on credit conditions."
    },
    {
      name: "Liquidity ratios — the crisis's real lesson",
      def: "Leverage ratio: capital/total exposure≥3% (unweighted, includes off-balance-sheet items). LCR: HQLA/net cash outflows over 30 days≥100%. NSFR: ASF/RSF≥100%.",
      example: "HQLA (cash+central bank reserves+Treasuries, 0% haircut)=$30. Net 30-day outflow=(100×5% retail)+(75×20% wholesale)+(20×0% capital)=$20. LCR=30/20=150% ✓. ASF=(100×0.9)+(75×0.5)+(2×1.0)+(18×1.0)=$147.50. RSF=$137.00. NSFR=147.50/137.00=107.66% ✓. Contrast: Highlands Bank, with HQLA of $125M against a 30-day net outflow of $137M, gets LCR=125/137=91.2% — BELOW the 100% minimum, i.e. in violation of the rule, even though its underlying capital and total exposure figures look otherwise unremarkable.",
      pitfall: "LCR haircuts: central bank/government securities 0%, corporate debt/equity 50% (so $100M of corporate debt only counts as $50M of HQLA), individual mortgages EXCLUDED entirely (0% credit, i.e. a 100% haircut). HQLA must survive a 30-day severe stress: 3-notch downgrade (e.g. AA to A), deposit runs, total wholesale funding loss, collateral devaluation (bigger repo haircuts), and credit line drawdowns. Northern Rock (UK, 2007) is the textbook illustration of exactly this failure mode: it funded long-term mortgage lending with securitization and wholesale funding; when securitization markets seized up, wholesale funding dried up too, and the Bank of England's public announcement of liquidity support — meant to reassure — instead triggered a depositor run that finished the bank off. Lehman Brothers (2008) is the other canonical case: it was not simply insolvency but an inability to roll over short-term funding (commercial paper, repo) that brought it down.",
      related: [{ r: 63, label: "R63 — the full liquidity risk framework this addresses" }],
      memory: "Leverage ratio: crude, unweighted backstop. LCR: survive 30 days. NSFR: stable funding over a longer horizon."
    },
    {
      name: "Contingent convertible bonds (CoCos)",
      def: "Unlike ordinary convertibles (bondholder chooses to convert when the stock price exceeds a threshold set in the bond's indenture — the legal contract governing the bond), CoCos convert to equity AUTOMATICALLY on a trigger — typically a Tier 1 equity/RWA threshold breach, supervisor judgment of insolvency risk, or a market-cap/assets ratio floor.",
      example: "Credit Suisse is the concrete, named example the source uses: it issued CoCos in 2011 that convert automatically if either (a) its Tier 1 equity capital to risk-weighted assets ratio falls below a set threshold, or (b) bank supervisors judge that Credit Suisse needs public-sector equity aid to avoid insolvency — supervisor judgment alone, independent of any single reported ratio, can trigger the conversion.",
      pitfall: "Motivation: debt in normal times (doesn't drag ROE, return on equity — net income divided by shareholders' equity, a profitability metric that gets diluted whenever more equity is issued), automatic equity cushion in stress (private capital absorbs losses instead of a government bailout) — the whole point is shifting loss absorption from taxpayers to private CoCo investors. Market-cap/assets-ratio triggers exist specifically because ratio-based triggers (Tier 1/RWA) can in principle be manipulated by how a bank measures its own risk-weighted assets — a market-price trigger is harder to game that way, though it introduces its own risk of stock-price manipulation around the trigger level.",
      related: [{ r: 91, label: "R91 — the Credit Suisse CoCo wipeout, a real-world case where this trigger fired" }],
      memory: "CoCos: debt that quietly waits to become equity the moment things go wrong — a built-in, automatic bailout by private investors instead of the government."
    },
    {
      name: "Dodd-Frank and the broader reform wave",
      def: "The Dodd-Frank Wall Street Reform and Consumer Protection Act, signed into US law in July 2010, is the umbrella statute for this whole wave. Key pieces: FSOC (Financial Stability Oversight Council — a body that monitors systemic risk across the entire financial system, not any one firm), SIFIs (systemically important financial institutions, identified jointly by the FSOC and the Office of Financial Research, OFR) must maintain living wills (a plan mapping out how the firm could be safely wound down if it failed) and may face extra capital requirements, compensation reform (discourage short-termist risk-taking that rewards traders for gains without penalizing them for the losses those same bets could cause; shareholders get a nonbinding say-on-pay vote; board compensation committees must be independent directors; at least one board member must have risk-management experience at a large, complex organization), OTC derivatives moved to central clearing (through central counterparties, CCPs, which sit between the two original counterparties and absorb the default risk if one side fails) with swap execution facilities (SEFs — electronic trading platforms that make swap prices visible before a trade, rather than negotiated privately over the phone) mandated to bring pre-trade price transparency to a market that used to be opaque, increased rating-agency transparency (a new Office of Credit Ratings monitors the agencies, and their potential legal liability for bad ratings was increased), Consumer Financial Protection Bureau (CFPB, created inside the Federal Reserve specifically so borrowers get clear, comparable terms on mortgages/credit cards/student loans and abusive lending practices are curbed), ability-to-repay mortgage requirements (a lender must make a good-faith effort to verify a borrower can actually repay before originating the loan, or risk having the foreclosure disallowed), minimum 5% securitization retention ('skin in the game' — the originator keeps a slice of the credit risk it sells off, so it can't simply originate-and-dump low-quality loans onto investors), and the Volcker Rule (bars proprietary trading — trading a bank's own capital for its own profit rather than on behalf of a customer — by deposit-taking banks, and limits their stakes in hedge funds and private equity funds; a practical difficulty is that speculative proprietary trading can be hard to distinguish from legitimate hedging of the bank's other positions).",
      pitfall: "Dodd-Frank is not a one-way ratchet: starting in mid-2018 some of its provisions were rolled back, so don't assume every rule described here is still in force at full strength in every jurisdiction.",
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

  summary: `<p><strong>Basel 2.5</strong>: stressed VaR (bank's own worst 7yr window), IRC (99.9%/1yr, constant-level-of-risk rebalancing, min 3mo horizon), CR charge (replaces specific risk+IRC for ABS/CDOs, deep-junk = 100% capital). <strong>Basel III tiers</strong>: Tier1 equity≥4.5%, Tier1≥6%, total≥8% (normal); +2.5% CCB (MANDATORY) → 7.0%/8.5%/10.5%; CCyB (0-2.5%, DISCRETIONARY); G-SIB buffer (1-3.5%). <strong>Leverage ratio</strong>≥3% (unweighted). <strong>LCR</strong>=HQLA/30-day net outflow≥100% (govt securities 0% haircut, corporate 50%, mortgages excluded). <strong>NSFR</strong>=ASF/RSF≥100%. <strong>CoCos</strong>: automatic (not bondholder-chosen) conversion on trigger — private loss absorption instead of bailout. <strong>Dodd-Frank</strong>: FSOC, living wills, Volcker Rule, CFPB, central clearing mandate, securitization skin-in-the-game.</p>`,

  eli5: `<p>Imagine a household budget rule invented after a family nearly got evicted — not because they were broke on paper (their house and savings were worth plenty), but because all their cash was tied up and a sudden bill came due before their next paycheck. So the family adopts new rules: always keep enough cash in the checking account to cover 30 days of bills even if the paycheck is late (that's the LCR), don't fund the mortgage with a payday loan that has to be renewed every week (that's the NSFR, matching how long your money is committed to how long your obligations last), keep a rainy-day fund on top of normal savings that you only touch in an emergency (the capital conservation buffer), and set up an "automatic pay cut" agreement with a rich uncle that kicks in without asking permission the moment the family's finances look shaky, converting his loan into a gift so no one else has to bail them out (a CoCo bond converting to equity). None of these rules make the family richer day to day — they exist purely so a temporary cash crunch never turns into a full collapse, which maps exactly to what Basel 2.5, Basel III's buffers, LCR/NSFR, and CoCos do for a bank: they don't add to net worth, they make sure a short-term cash crunch (illiquidity) can never turn into an actual failure the way it did for banks like Northern Rock and Lehman Brothers in 2007–09.</p>`,

  thinkLike: `<p>A bank treasurer reading this reading is not primarily asking "are we solvent?" — Basel II already forces that question via risk-weighted capital. The treasurer is asking a second, separate question the 2007–09 crisis proved was just as dangerous to ignore: "if funding markets freeze for 30 days, or for a full year, do we have enough of the RIGHT kind of assets and funding to survive without a fire sale or a government rescue?" That's why this reading pairs a capital-side fix (Basel 2.5's stressed VaR/IRC/CR charge, Basel III's tighter tiers and buffers) with an entirely separate liquidity-side fix (leverage ratio, LCR, NSFR) — solvency and liquidity are different failure modes that require different metrics, and a bank can die from either one independently, as Lehman (largely a liquidity/confidence failure, arguably still technically solvent on paper for a time) and other institutions (undercapitalized on a risk-adjusted basis) both illustrated in different ways.</p><p>The exam tests this reading in three recurring shapes: (1) plug-and-chug ratio calculations — LCR, NSFR, the market risk capital charge — where the trap is usually a haircut or run-off-rate detail (mortgages excluded from HQLA, corporate debt at 50%, wholesale funding running off faster than retail); (2) governance/discretion distinctions — MANDATORY capital conservation buffer vs. DISCRETIONARY countercyclical buffer is explicitly flagged as a favorite trap; and (3) "what changed and why" conceptual questions — e.g., why stressed VaR is calibrated to each bank's OWN worst year rather than a fixed 2008 assumption, or why CoCos convert automatically rather than at bondholder discretion. Expect the numbers to be handed to you (the source itself says not to memorize every haircut table, since it's unrealistic that any two textbooks would agree on every factor) — what you must know cold is which direction each factor points and why.</p>`,

  breakdown: [
    {
      title: "Basel 2.5's three fixes to market risk capital",
      points: [
        "Stressed VaR — a second VaR run over a 250-day window from the bank's own worst one-year period in its most recent seven years (not a fixed 2008 assumption), added on top of the ordinary VaR charge.",
        "Incremental risk charge (IRC) — a 99.9% confidence, one-year VaR for credit-sensitive trading-book instruments, assuming the bank rebalances back to its original position at each instrument's liquidity horizon (minimum 3 months), booking downgrade losses rather than riding out full defaults.",
        "Comprehensive risk (CR) charge — replaces the specific risk charge and IRC for correlation-sensitive instruments like ABS and CDOs; resecuritizations (e.g. a CDO of ABSs) carry higher risk weights than a plain securitization, and unrated or below-BB− tranches require dollar-for-dollar (100%) capital."
      ]
    },
    {
      title: "Basel III's three liquidity ratios",
      points: [
        "Leverage ratio — capital / total (unweighted) exposure ≥ 3%, a crude backstop against a bank shrinking its risk weights to game the risk-based ratios.",
        "Liquidity Coverage Ratio (LCR) — HQLA / 30-day net cash outflow ≥ 100%, testing whether the bank survives one month of severe funding stress (downgrade, deposit run, wholesale funding loss, collateral haircuts, credit line drawdowns).",
        "Net Stable Funding Ratio (NSFR) — available stable funding / required stable funding ≥ 100%, testing whether the bank's funding is structurally matched to how long its assets are tied up, over a full year."
      ]
    },
    {
      title: "Three potential CoCo conversion triggers",
      points: [
        "Tier 1 equity capital / RWA ratio breach — conversion fires automatically once this reported ratio falls below a set threshold (the Credit Suisse 2011 CoCos use this).",
        "Supervisor judgment — bank regulators can trigger conversion if they judge the bank needs public-sector equity aid to avoid insolvency, independent of any single published ratio (also part of the Credit Suisse structure).",
        "Market-capitalization / assets floor — harder to manipulate through risk-weight modeling than a balance-sheet ratio, though it introduces its own risk of stock-price manipulation around the trigger level."
      ]
    },
    {
      title: "Key Dodd-Frank reforms after the 2007–09 crisis",
      points: [
        "FSOC — monitors systemic risk across the whole financial system, not any single firm.",
        "SIFI designation + living wills — systemically important firms (identified with the Office of Financial Research) must plan how they could be safely wound down, and may face extra capital.",
        "Compensation reform — discourages short-term risk-taking pay structures; gives shareholders a nonbinding say-on-pay vote; requires independent compensation committees.",
        "OTC derivatives reform — standardized swaps must clear through central counterparties (CCPs); swap execution facilities (SEFs) bring pre-trade price transparency.",
        "Rating-agency oversight — a new Office of Credit Ratings monitors agencies; their legal liability for bad ratings increased.",
        "CFPB — protects consumers shopping for mortgages, credit cards, and student loans from abusive or unclear terms.",
        "Ability-to-repay mortgage rule — lenders must verify repayment capacity before originating a loan.",
        "5% securitization retention ('skin in the game') — originators keep a slice of the credit risk they securitize.",
        "Volcker Rule — bars deposit-taking banks from proprietary trading and limits their hedge fund/private equity stakes."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank's stressed VaR window is calibrated to which period?",
      options: [
        "A fixed 250-day window from calendar year 2008 for every bank",
        "The 250-day window drawn from the worst one-year period in that bank's own most recent seven years",
        "The most recent 250 trading days regardless of market conditions",
        "A 99.9% confidence, one-year window set by the national regulator"
      ],
      answer: 1,
      why: "Stressed VaR is bank-specific — each bank must identify its own worst one-year stretch within its most recent seven years, since different portfolios have different worst-case periods. The 'fixed 2008 window for every bank' answer is the tempting distractor because regulators initially assumed 2008 would be the universal stress period, but the actual rule lets it vary by bank; the '99.9% confidence, one-year window set by the regulator' answer confuses this with the IRC's 99.9%/one-year specification."
    },
    {
      q: "Spartan State Bank has previous-day VaR of $15.6M, average stressed VaR (60-day) of $18.4M, and mr = ms = 3. What is the total market risk capital charge?",
      options: ["$46.8M", "$55.2M", "$70.8M", "$102.0M"],
      answer: 2,
      why: "capital = VaR(previous day) + (ms × avg stressed VaR) = 15.6 + (3 × 18.4) = $70.8M. The $55.2M answer (3×18.4 alone, forgetting to add the $15.6M base VaR) and the $46.8M answer (3×15.6, using the wrong VaR figure entirely) are the two most common calculation slips."
    },
    {
      q: "Which statement correctly distinguishes the capital conservation buffer (CCB) from the countercyclical buffer (CCyB)?",
      options: [
        "Both are discretionary and set by national regulators between 0% and 2.5% of RWA",
        "The CCB is mandatory and always required in normal times; the CCyB is discretionary, set 0–2.5% by national regulators",
        "The CCB is discretionary; the CCyB is a fixed 2.5% requirement at all times",
        "Both buffers are mandatory and fixed at 2.5% of RWA"
      ],
      answer: 1,
      why: "The CCB is a mandatory 2.5% of RWA built up in normal times and drawn down (with dividend restrictions) in stress. The CCyB is left entirely to national regulator discretion, ranging 0–2.5%. This exact conflation — treating the CCB as discretionary like the CCyB — is explicitly flagged in the source as a common exam trap."
    },
    {
      q: "A bank has HQLA of $125 million and a projected net cash outflow over the next 30 days of $137 million under stress. What does this tell you?",
      options: [
        "LCR = 91.2%, which fails the 100% minimum requirement",
        "LCR = 108.8%, which comfortably clears the requirement",
        "The bank automatically fails Basel III entirely, including its capital ratios",
        "This scenario cannot be evaluated without also knowing the NSFR"
      ],
      answer: 0,
      why: "LCR = HQLA / net 30-day outflow = 125/137 = 0.912 = 91.2%, below the 100% minimum — the bank is in violation of the LCR rule. The '108.8%, comfortably clears' answer inverts the ratio's direction; the 'automatically fails Basel III entirely' answer wrongly extends an LCR failure to capital adequacy, which is a separate (solvency-side) requirement entirely."
    },
    {
      q: "How do contingent convertible bonds (CoCos) differ from ordinary convertible bonds?",
      options: [
        "CoCos pay a higher coupon but otherwise convert identically to ordinary convertibles",
        "Ordinary convertibles convert automatically on a market trigger; CoCos require bondholder consent",
        "CoCos convert to equity automatically on a predefined trigger (e.g. a capital ratio breach or supervisor judgment); ordinary convertibles convert at the bondholder's discretion once the stock price clears a threshold",
        "CoCos can never convert to equity — they are always repaid as debt"
      ],
      answer: 2,
      why: "The defining feature of a CoCo is automatic, non-discretionary conversion on a trigger such as a Tier 1/RWA breach or a supervisor's insolvency judgment — the bank needs the equity cushion to appear reliably in a crisis, which bondholder choice would undermine (a rational bondholder facing a distressed bank would rather keep a senior debt claim than accept new equity). The 'ordinary convertibles convert automatically, CoCos require consent' answer reverses which bond type is automatic."
    },
    {
      q: "Under Dodd-Frank, which mechanism was specifically designed to prevent originators from selling off low-quality securitized loans with no ongoing stake in their performance?",
      options: [
        "The Volcker Rule's ban on proprietary trading",
        "The minimum 5% securitization retention requirement ('skin in the game')",
        "The Consumer Financial Protection Bureau's mortgage disclosure rules",
        "The Financial Stability Oversight Council's systemic risk monitoring"
      ],
      answer: 1,
      why: "The 5% retention rule forces originators to keep a slice of the credit risk they securitize, aligning their incentives with the investors who buy the rest. The Volcker Rule targets proprietary trading by deposit-taking banks, unrelated to securitization retention; the CFPB protects individual consumers rather than aligning securitization incentives; the FSOC monitors system-wide risk rather than loan-origination incentives."
    }
  ],

  sources: [
    { title: "Liquidity Coverage Ratio — Bank for International Settlements", url: "https://www.bis.org/publ/bcbs238.htm", note: "The BIS's own standard defining HQLA, haircuts, and the 30-day stress scenario behind the LCR." },
    { title: "Net Stable Funding Ratio — Bank for International Settlements", url: "https://www.bis.org/bcbs/publ/d295.htm", note: "The BIS standard defining ASF/RSF factors and the one-year structural funding requirement." },
    { title: "Contingent convertible bond — Wikipedia", url: "https://en.wikipedia.org/wiki/Contingent_convertible_bond", note: "Background on CoCo mechanics, trigger types, and issuance history, including the Credit Suisse case." },
    { title: "Dodd-Frank Wall Street Reform and Consumer Protection Act — Wikipedia", url: "https://en.wikipedia.org/wiki/Dodd%E2%80%93Frank_Wall_Street_Reform_and_Consumer_Protection_Act", note: "Overview of the full 2010 statute, including the Volcker Rule, CFPB, and FSOC provisions summarized in this reading." }
  ],

  pdf: { book: 3, query: "Following the 2007–2009 financial crisis, the Basel Committee on Banking Supervision implemented reforms" }
});
