export default ({
  book: 5, reading: 92,
  session: "Current Issues in Financial Markets",
  title: "Review of the Federal Reserve's Supervision of Silicon Valley Bank",
  tagline: "How a $200B bank died: concentrated tech/VC deposits, an HTM portfolio that couldn't be sold without triggering mark-to-market losses, and a regulatory transition (RBO→LFBO) that arrived three years too late.",

  teaches: `<p>The evolution of Silicon Valley Bank (1983-2023) — a California state-chartered bank, headquartered in Santa Clara, whose largest business was serving U.S. tech and life-science startups and their venture capital (VC) backers; shortfalls in the Fed's supervisory transition from Regional Banking Organization (RBO, assets $10B-$100B) to Large and Foreign Banking Organization (LFBO, assets over $100B) status; SVB's six specific risk exposures (deposit concentration, deposit type, held-to-maturity (HTM) securities, available-for-sale (AFS) securities, contingent funding, capital raising); governance and risk management failures (board, chief risk officer (CRO), internal audit) capped by three Matters Requiring Immediate Attention (MRIAs); liquidity risk management deficiencies centered on a modeled 30-day liquidity buffer shortfall; and interest rate risk management deficiencies centered on the difference between net interest income (NII) at risk and economic value of equity (EVE) models. The reading also traces how the CAMELS rating system (capital adequacy, asset quality, management, earnings, liquidity, sensitivity to market risk) and the Fed's Division of Supervision and Regulation (DSR) actually scored SVB over time — and how those scores kept lagging reality.</p>`,

  why: `<p>SVB is the definitive real-world case study connecting Book 1's term-structure/duration concepts, Book 4's entire liquidity risk framework, and Book 3's governance/model-risk themes into one coherent, catastrophic failure — a rare reading that ties nearly the whole curriculum together in a single narrative.</p>`,

  intuition: `<p>SVB's core vulnerability was a mismatch hiding in plain sight: a depositor base concentrated almost entirely in one correlated group (tech/life-science startups and VCs) funded a long-duration HTM securities portfolio (weighted-average duration 6.2 years, most maturities 10 years or longer as of December 2022). This worked beautifully while deposits kept growing — from a founding base of just $18 million in 1983, to $58 billion by 2019, then TRIPLING to $209 billion by 2021 as clients cashed out IPOs, secondary offerings, SPAC mergers, and acquisitions and parked the proceeds at SVB. But the moment VC funding activity slowed in the second half of 2022 (rate increases → lower investor risk appetite), the SAME correlated depositor base began withdrawing SIMULTANEOUSLY to fund their own operating cash needs, exactly when the HTM portfolio had lost substantial value to the very same rate increases. This is <em>maturity transformation</em> — using short-term deposit funding to hold longer-term assets, which every bank does — pushed to a dangerous extreme because both sides of the mismatch (deposits and assets) were driven by the same underlying macro variable (interest rates and VC risk appetite) instead of being independent.</p>
  <p>The accounting trap: HTM securities are carried at historical cost (hiding losses) — but selling even a PORTION of the HTM portfolio would, under the accounting rule then in force, have required RECLASSIFYING THE ENTIRE HTM PORTFOLIO to AFS (available-for-sale), forcing a full mark-to-market recognition of losses across the whole book at once, not just the piece sold. This accounting rule created a powerful disincentive to address the problem early, letting losses compound silently until forced action became unavoidable. (By the end of 2022 this specific rule had actually been relaxed, and management was weighing a one-time transfer out of HTM that would no longer have triggered a full reclassification — but by then the deposit-flight clock was already running out.)</p>
  <p>The regulatory story is equally important: a July 2018 rule change RAISED the asset threshold for LFBO (stricter supervision) status from $50B to $100B — this alone delayed SVB's transition to stricter oversight by roughly three years (it would otherwise have crossed into LFBO status around 2018). When the transition finally happened (Feb 2021), it arrived as a "cliff event" (RBO one day, LFBO the next) rather than a gradual transition, compounded by a COVID-era examination pause, the ongoing RBO supervision cycle being allowed to run to completion first (it did not conclude until July 2021), and a 2021 cultural shift at the Fed's Division of Supervision and Regulation (DSR) toward LESS regulatory burden on RBO banks — a shift that occurred even as industry-wide banking assets grew 37% (2016-2022) while regulatory supervisor headcount actually FELL 3% over the same period. By the time supervisors formally flagged governance as "Deficient-1" (Aug 2022) and began the multi-stakeholder Memorandum of Understanding (MOU) process — which needed sign-off from the Federal Reserve Bank of San Francisco (FRBSF), the DSR, the Board of Governors' legal department, and the California Department of Financial Protection and Innovation (CDFPI) — SVB had already failed before the MOU could be finalized.</p>`,

  formulas: [
    {
      name: "Economic value of equity (EVE)",
      math: "\\text{EVE} = \\text{PV}(\\text{Assets}) - \\text{PV}(\\text{Liabilities})",
      note: "The present value of everything the bank owns minus the present value of everything it owes — a mark-to-market measure of the bank's structural net worth under a given rate scenario, not just a snapshot of next quarter's cash flow.",
      plain: "This formula says a bank's true economic net worth is the present value of its assets minus the present value of its liabilities, both discounted at current market rates — so if rates rise and long-dated assets lose more present value than short-dated liabilities do, EVE falls even if next quarter's income (NII) looks fine.",
      derivation: `<p>EVE is a balance-sheet analogue of duration-gap analysis (R79): rather than compare only the dollar amount of assets vs. liabilities repricing in the near term (the IS/income-statement gap that drives NII), EVE revalues the <em>entire</em> balance sheet at current market rates.</p>
      <p>Step by step: (1) take every asset cash flow (loan repayments, bond coupons/principal) and discount it at the current market rate to get \\( \\text{PV}(\\text{Assets}) \\); (2) do the same for every liability cash flow (deposit payouts, borrowings) to get \\( \\text{PV}(\\text{Liabilities}) \\); (3) subtract. If assets have longer duration than liabilities (SVB's case — a 6.2-year weighted-average-duration HTM book funded largely by short-tenor deposits), a rise in rates shrinks \\( \\text{PV}(\\text{Assets}) \\) by more than it shrinks \\( \\text{PV}(\\text{Liabilities}) \\), so \\[ \\Delta \\text{EVE} = \\Delta\\text{PV}(\\text{Assets}) - \\Delta\\text{PV}(\\text{Liabilities}) < 0. \\] SVB's decision to remove its rising-rate hedges in March-July 2022 lengthened effective asset duration further, which mechanically pushed \\( \\Delta \\text{PV}(\\text{Assets}) \\) more negative and worsened EVE precisely while their risk appetite statement wasn't tracking EVE at all.</p>`
    }
  ],

  concepts: [
    {
      name: "Evolution and collapse of Silicon Valley Bank",
      def: "Founded 1983, headquartered Santa Clara CA, as Silicon Valley Bank Financial Group (SVBFG); its largest subsidiary, Silicon Valley Bank (SVB), was a California state-chartered bank supervised by the Federal Reserve. Primary clients were U.S. tech/life-science startups and VCs (nearly half of all VC-backed tech/life-science firms were SVB clients) — the model was to attract firms at the early/start-up stage and retain them as they grew through the industry lifecycle. Deposits grew gradually from just $18 million (1983) to $58B by 2019, then TRIPLED to $209B by 2021 (fueled by IPOs, secondary offerings, SPAC mergers, acquisitions, and other fundraising liquidity events). Asset growth 2018-2021: 271% vs. the banking sector's 29% average. By 2022, ~94% of SVB deposits were UNINSURED (above FDIC limits).",
      example: "H2 2022: VC activity fell sharply (rate increases lowered investor risk appetite) → SVB's deposit growth flipped NEGATIVE as clients withdrew to fund their own operations. SVB had invested heavily in long-dated HTM government/agency MBS (avg duration 6.2 years) chasing yield during the growth years.",
      pitfall: "Selling any portion of the HTM portfolio to cover withdrawals would, under then-applicable accounting rules, have required reclassifying the ENTIRE HTM portfolio to AFS (mark-to-market) — management avoided this, letting the problem compound. SVB's securities-to-total-assets ratio was MORE THAN DOUBLE the average large banking organization's.",
      related: [{ r: 63, label: "R63 — the maturity-mismatch/rollover-risk concept SVB embodies at bank scale" }, { r: 79, label: "R79 — duration gap analysis, the exact tool that would have flagged this mismatch" }],
      memory: "Concentrated depositors + long-duration HTM assets + an accounting rule discouraging early action = a bank that looked fine right up until it collapsed in 48 hours."
    },
    {
      name: "The final collapse timeline (March 2023)",
      def: "March 8: SVB announced a $21B AFS portfolio sale (realizing a $1.8B after-tax loss) plus a $2.25B equity offering; Moody's/S&P signaled potential downgrades. Depositor panic (amplified by social media and a highly interconnected client base) drove $40B of withdrawal REQUESTS on March 9 alone. That evening, management told supervisors they expected $100B in outflows on March 10 — capital they didn't have. March 10: California regulators closed SVB, FDIC appointed receiver.",
      pitfall: "The SAME industry concentration that fueled SVB's rapid deposit GROWTH (2019-2021) also fueled its rapid deposit FLIGHT (2023) — clients who all knew each other (same industry, same investor networks) withdrew in near-lockstep.",
      related: [],
      memory: "$40 billion requested in a single day is the number to remember — a genuinely unprecedented, socially-amplified bank run."
    },
    {
      name: "RBO → LFBO supervisory transition failures",
      def: "Regional Banking Organization (RBO): assets $10B-$100B, lighter supervision — the Bank Exams Tailored to Risk (BETR) program shifts examination hours from low-risk to high-risk banks, supplemented by periodic risk reviews and continuous monitoring (regular meetings with senior leadership, review of internal management reports, coordination with other regulators); a single supervisory staffer often covers multiple risk areas at once. Large and Foreign Banking Organization (LFBO): assets >$100B (or any foreign bank operating in the U.S.), MUCH deeper supervision — horizontal exams comparing the bank against peers on capital/liquidity/cybersecurity, an annual Large Financial Institution (LFI) rating (covering capital planning, liquidity and risk management, and governance controls), enhanced prudential standards (EPS), and continuous monitoring designed to function as an early-warning system before risk factors escalate. Both tiers are supervised by regional Reserve Banks with oversight from the Board of Governors; the Division of Supervision and Regulation (DSR) issues an annual assessment letter to Reserve Bank presidents rating their aggregate bank portfolio as 'strong,' 'effective,' 'marginally effective,' or 'requires improvement.'",
      pitfall: "In July 2018, the Fed RAISED the LFBO threshold from $50B to $100B — had it stayed at $50B, SVB would have shifted to LFBO status in 2018, roughly THREE YEARS earlier than it actually did (Feb 2021). The transition itself was poorly managed: it arrived as an abrupt 'cliff event' (RBO one day, LFBO the next) rather than gradually, worsened by a COVID-era examination pause and a 2021 cultural shift at the Fed's Division of Supervision and Regulation (DSR) toward REDUCING regulatory burden on RBO banks (higher burden of proof for supervisory conclusions, more due process before escalating concerns).",
      related: [{ r: 60, label: "R60 — the broader Basel III post-crisis regulatory framework this supervisory tiering sits within" }],
      memory: "A single threshold change ($50B→$100B) delayed strict oversight by three years — SVB grew into a systemically dangerous size while still enjoying light-touch RBO treatment."
    },
    {
      name: "SVB's specific risk exposures",
      def: "Deposit concentration: depositor base concentrated in tech/life-science startups/VCs/PE firms — correlated industry exposure meant withdrawal demand hit ALL AT ONCE. Deposit type: large, 94% UNINSURED; deposits shifted from noninterest-bearing to interest-bearing in 2022, changing liability duration and worsening liquidity stress test results. HTM securities: long-dated MBS, 6.2-year weighted average duration; management REMOVED interest-rate hedges to boost short-term profit, then rates rose and losses mounted — carried at historical cost (hiding true losses) until forced disclosure. AFS securities: marked-to-market (more timely), but selling them crystallized real, sizable losses given the rate-increase cycle. Contingent funding/capacity: insufficient plans to access alternative capital sources (repo funding, bilateral relationships) — begun too late (Q4 2022) to matter. Capital raising: promotional deposit-retention offers failed; HTM asset sales would have realized losses too large to cover withdrawal pace.",
      related: [{ r: 79, label: "R79 — IS gap and duration gap, the exact analytical tools these exposures map onto" }],
      memory: "Six specific vulnerabilities, one root cause: correlated deposits funding a long-duration asset book with no early-warning risk management catching the mismatch."
    },
    {
      name: "Governance and risk management failures — three MRIAs",
      def: "While SVB was below $100B in assets (still RBO status), its CAMELS 'management' rating was 'Satisfactory-2' in 2018, 2019, and 2020, and STILL 'Satisfactory-2' in the review dated May 3, 2021 despite supervisors noting problems with credit risk management, internal loan reviews, and technology weaknesses, and observing that management was REACTIVE to issues supervisors raised rather than proactively hunting for risk itself — supervisors kept the rating at 'effective' because they weighted SVB's strong financial performance over these red flags. In late 2021, the newly-assigned LFBO supervisory team, in its first look, concluded management was not equipped for SVB's rapid growth, and — working with the DSR — WAIVED a formal 2021 governance rating to buy time for more due diligence. A May 31, 2022 supervisory report then identified three Matters Requiring Immediate Attention (MRIAs): (1) Board effectiveness — board/management/CRO failed to transition from RBO to LFBO-grade rigor (even hired consultants in 2020, insufficient); board lacked experience running a large financial institution. (2) Risk management programs — no formal risk appetite standard, no root-cause tracking/reporting mechanism, no enterprise-wide policies/procedures or internal control framework, incentive structure disconnected from risk outcomes, underdeveloped talent acquisition/performance review. (3) Internal audit effectiveness — insufficient methodology to challenge management, untimely/insufficient reporting to the audit committee, no timely analysis of critical risk functions. The first formal governance rating, issued in the August 2022 review, was 'Deficient-1.'",
      pitfall: "SVB's CRO recognized she lacked the skillset for a rapidly-growing large institution and LEFT in April 2022 — a NEW CRO wasn't hired until December 2022, during which risk management was led by inexperienced internal senior staff. Supervisors did NOT flag concerns about the CRO vacancy, reasoning the bank was actively searching — the same pattern (giving SVB a pass because it was highly profitable or 'working on it') recurred throughout the supervisory record.",
      related: [{ r: 53, label: "R53 — model risk management's validation discipline, exactly what SVB's risk function lacked" }],
      memory: "Three MRIAs — board, risk programs, internal audit — all fired in May 2022, but the formal enforcement action (MOU) needed so many sign-offs (FRBSF, DSR, Board of Governors legal, California regulator) that it never finished before SVB failed."
    },
    {
      name: "Liquidity risk management deficiencies",
      def: "While in RBO status, supervisors gave consistently POSITIVE liquidity reviews (light 'risk-focused guidelines' review, underestimating risk given strong deposit growth and a large low-credit-risk securities portfolio). Once shifted to LFBO, a much deeper review found SIX specific issues: (1) needed a plan for liquidity stress testing/contingency funding shortfalls, (2) internal audit needed redesign for risk oversight, (3) stress testing needed more REALISTIC assumptions reflecting IMMEDIATE stress (not gradual evolution), (4) deposit stress testing didn't incorporate realistic risks, (5) liquidity risk limits/processes lagged SVB's growth, (6) inadequate assessment of potential funding sources.",
      example: "August 2022: SVB modeled an $18B shortfall in its 30-day liquidity buffer and a $23B shortfall over 90 days — but management treated this as merely an 'operational shortfall' rather than the material safety-and-soundness concern it actually was. Supervisors did NOT materially change risk ratings despite this negative modeled buffer.",
      pitfall: "Q4 2022: rather than raising real capital, management changed liquidity-model ASSUMPTIONS to reduce the modeled shortfall by $5 billion — this altered the MODEL's output without altering ECONOMIC REALITY. Supervisors, aware of the assumption changes, chose to DELAY comments until the 2023 review cycle — a delay that proved fatal.",
      related: [{ r: 71, label: "R71 — liquidity stress testing's 'garbage in, garbage out' assumption warning, exactly what happened here" }],
      memory: "Relaxing your stress-test assumptions to make the number look better doesn't fix the liquidity gap — it just hides it from the people supposed to catch it."
    },
    {
      name: "Interest rate risk management deficiencies: NII vs. EVE",
      def: "Net interest income (NII) at risk: measures SHORT-TERM volatility from large basis-point yield-curve moves (including curve twists), using deposit betas — the assumed pass-through rate of market rate movements into what the bank actually pays depositors (a low assumed beta means the bank assumes it won't have to raise deposit rates much even as market rates rise, which flatters projected NII). Economic value of equity (EVE): present value of assets minus present value of liabilities — measures LONGER-TERM structural balance-sheet mismatch (see the EVE formula above). SVB's NII testing also only ran a limited number of interest-rate-change scenarios, performed no backtesting of its assumptions against actual outcomes, and used only limited sensitivity testing — so the model wasn't even being challenged on its own narrow terms.",
      pitfall: "SVB's risk appetite statement (RAS) included ONLY NII, EXCLUDING EVE entirely (EVE was reviewed by the board's Risk Committee, but the full board never grasped the deterioration it was showing). Management incorrectly anticipated FALLING rates (mistaking an inverted yield curve for a recession signal) and removed rate-rise hedges (beginning March 2022, finalized July 2022) specifically to protect short-term NII/profitability — this LENGTHENED asset duration and WORSENED EVE at the exact same time deposits were shifting from noninterest-bearing to interest-bearing (worsening liability duration too, compounding the EVE damage). The Asset/Liability Committee (ALCO) only tested PARALLEL yield curve shifts, ignoring NONPARALLEL shifts (twists) that would have revealed the brewing problem. Management also adjusted deposit-withdrawal-rate assumptions to make EVE outcomes look more favorable — again, altering the model's output without altering economic reality. The CAMELS 'sensitivity to market risk' component stayed at 'Satisfactory-2' from 2018 through 2022; the downgrade to 'Less than Satisfactory-3' was only vetted in November 2022 and not officially finalized until after SVB had already failed in March 2023.",
      related: [{ r: 79, label: "R79 — IS gap (protects NII) vs. duration gap (protects EVE/net worth) — SVB optimized the wrong one and starved the other" }],
      memory: "SVB managed for the metric that showed good news (NII) and ignored the metric that would have shown the real damage (EVE) — precisely the IS-gap-vs-duration-gap distinction from R79, now with catastrophic real-world stakes."
    }
  ],

  connections: {
    from: [
      { r: 63, why: "SVB is the definitive real-world illustration of the funding-liquidity-risk/maturity-mismatch mechanism introduced there." },
      { r: 79, why: "The NII (IS gap) vs. EVE (duration gap) distinction is exactly SVB's core risk-management failure — they optimized one and ignored the other." },
      { r: 53, why: "SVB's model risk failures (relaxed assumptions to produce favorable outputs) directly violate the model validation discipline established there." }
    ],
    to: [],
    confused: [
      { what: "NII at risk vs. EVE", how: "NII measures SHORT-TERM cash flow volatility (SVB's sole focus); EVE measures LONGER-TERM structural balance-sheet mismatch (the metric SVB excluded from its risk appetite statement) — SVB's fatal blind spot was ignoring EVE entirely." },
      { what: "HTM vs. AFS accounting treatment", how: "HTM: historical cost, hides losses, but selling ANY portion forces reclassifying the WHOLE portfolio to AFS. AFS: marked-to-market, more timely but crystallizes real losses immediately upon sale." },
      { what: "RBO vs. LFBO supervision", how: "RBO ($10B-$100B assets): lighter, risk-focused review. LFBO (>$100B): much deeper — horizontal peer exams, annual LFI ratings, enhanced prudential standards, continuous early-warning monitoring. SVB's transition arrived three years late and as an abrupt cliff event, not gradually." }
    ]
  },

  misconceptions: [
    { wrong: "\"SVB failed primarily because the Federal Reserve raised interest rates too aggressively.\"", right: "Rate increases compounded the problem, but the root cause was SVB's own risk management failure — investing depositor money in long-dated MBS while failing to adequately anticipate correlated customer withdrawal needs from its concentrated tech/VC client base." },
    { wrong: "\"SVB's transition from RBO to LFBO supervision happened on schedule as its assets crossed the relevant threshold.\"", right: "A 2018 rule change RAISED the LFBO threshold from $50B to $100B, delaying SVB's transition to stricter oversight by roughly three years — and when the transition finally occurred (Feb 2021), it arrived as an abrupt 'cliff event' rather than a gradual, well-managed process." },
    { wrong: "\"SVB's risk appetite statement appropriately balanced both short-term (NII) and long-term (EVE) interest rate risk measures.\"", right: "SVB's risk appetite statement included ONLY NII and EXCLUDED EVE entirely — a critical omission, since EVE would have revealed the structural damage from removing rate-rise hedges and the balance-sheet duration mismatch." },
    { wrong: "\"When SVB found its modeled 30-day liquidity buffer showed an $18 billion shortfall, management responded by raising real capital or selling securities.\"", right: "Management's actual response was to RELAX the model's assumptions, reducing the modeled shortfall by $5 billion without changing any economic reality — a model-gaming response rather than a substantive fix." },
    { wrong: "\"Regulators promptly downgraded SVB's ratings once liquidity and governance deficiencies were identified.\"", right: "Supervisors repeatedly DELAYED action — waiting for the 2023 review cycle to comment on relaxed liquidity assumptions, and the governance MOU (triggered by an August 2022 'Deficient' rating) required so many stakeholder sign-offs that it was never finalized before SVB failed in March 2023." }
  ],

  highYield: [
    { stars: 5, what: "NII (short-term, SVB's sole focus) vs. EVE (long-term structural, excluded from SVB's risk appetite statement) — the single most important conceptual failure in the whole case.", why: "Directly tests R79's IS-gap-vs-duration-gap distinction with real, catastrophic stakes — an extremely high-value synthesis question." },
    { stars: 5, what: "The HTM-to-AFS reclassification accounting rule and why it discouraged early corrective action.", why: "A precise, memorable mechanism explaining why SVB let losses compound instead of addressing them early." },
    { stars: 4, what: "The $50B→$100B LFBO threshold change and its three-year delay in triggering stricter supervision.", why: "A specific, well-defined regulatory-timeline fact frequently tested." },
    { stars: 4, what: "Deposit concentration (tech/VC clients) driving both rapid growth AND rapid, correlated withdrawal.", why: "The core narrative thread connecting SVB's rise and fall — a foundational conceptual anchor." },
    { stars: 4, what: "Management relaxing liquidity/EVE model assumptions to produce favorable outputs — the model-gaming pattern.", why: "A precise, repeated behavioral pattern (appears in both the liquidity and interest-rate-risk sections) worth recognizing as a single recurring theme." },
    { stars: 3, what: "The three MRIAs (board effectiveness, risk management programs, internal audit) and the CRO vacancy timeline.", why: "A specific governance failure list, good for recall of named deficiencies." }
  ],

  recall: [
    { q: "Why did SVB's risk appetite statement including only NII (not EVE) prove catastrophic?", a: "NII measures only short-term cash flow volatility, and under SVB's assumptions, rising rates appeared to INCREASE NII (since they assumed low deposit betas). EVE, which measures the present-value mismatch between assets and liabilities, would have revealed that removing interest-rate hedges (done specifically to protect NII/short-term profit) was simultaneously lengthening asset duration and worsening the structural balance-sheet mismatch — the exact damage that ultimately destroyed the bank's solvency. By excluding EVE, management (and the board) never saw the true structural risk building up." },
    { q: "Explain why the accounting treatment of held-to-maturity (HTM) securities discouraged SVB from addressing its portfolio losses earlier.", a: "HTM securities are carried at historical cost, not marked-to-market — so losses don't appear on the balance sheet as long as the securities aren't sold. But selling even a PORTION of the HTM portfolio would have triggered a rule requiring the ENTIRE HTM portfolio to be reclassified as available-for-sale (AFS), forcing immediate mark-to-market recognition of all embedded losses at once. This created a strong disincentive against partial sales, encouraging management to defer action and let losses silently accumulate rather than realize a smaller loss earlier." },
    { q: "How did the 2018 change to the LFBO asset threshold contribute to SVB's failure?", a: "The Federal Reserve raised the threshold for LFBO (stricter supervision) classification from $50 billion to $100 billion in July 2018. Had the threshold remained at $50 billion, SVB would have transitioned to the more rigorous LFBO supervisory regime around 2018 — instead, the transition didn't occur until February 2021, roughly three years later, during which SVB grew explosively (271% asset growth 2018-2021) while still under lighter RBO-level supervision, allowing risk management gaps to widen substantially before more intensive oversight began." },
    { q: "In August 2022, SVB modeled an $18 billion shortfall in its 30-day liquidity buffer. How did management address this, and why was their response inadequate?", a: "Rather than raising real capital or accepting losses from asset sales, management primarily responded by adjusting the ASSUMPTIONS used in the liquidity model (e.g., relaxing deposit outflow-speed assumptions), which reduced the modeled shortfall by about $5 billion without changing anything about the bank's actual economic liquidity position. This was a case of managing the MODEL's output rather than the underlying reality — the true shortfall remained, but reported figures looked better, and supervisors chose to delay addressing the issue until the next review cycle, by which point it was too late." }
  ],

  hooks: [
    { title: "Grew together, fled together", text: "SVB's depositors were all in the same industry, same networks, same investor circles — the correlation that fueled explosive deposit GROWTH (2019-2021) was the exact same correlation that fueled the $40 billion single-day withdrawal request that killed the bank." },
    { title: "The accounting rule that punished honesty", text: "Sell one HTM bond to cover withdrawals, and the WHOLE portfolio gets marked to market. This is why SVB let losses fester instead of taking a smaller hit early — the accounting rule made partial honesty impossibly expensive." },
    { title: "Watching the wrong gauge", text: "SVB's dashboard had a working NII gauge and a missing EVE gauge — like driving a car that shows speed but not fuel level. They optimized for the number they could see (NII) and drove straight into the wall the missing number (EVE) would have warned about." },
    { title: "Three years late, then a cliff", text: "The threshold change delayed strict supervision by three years — then, when it finally arrived, it hit SVB like a cliff edge instead of a ramp, because there was no gradual transition plan." }
  ],

  summary: `<p><strong>SVB's rise</strong>: concentrated tech/VC deposits tripled 2019-2021, invested in long-dated HTM MBS (6.2yr duration) for yield. <strong>Collapse</strong>: 2022 VC slowdown → deposit outflows → forced AFS sale ($1.8B realized loss, March 8, 2023) → $40B withdrawal requests (March 9) → closure (March 10). <strong>HTM accounting trap</strong>: partial sale would force full HTM→AFS reclassification, discouraging early action. <strong>Supervisory failure</strong>: 2018 threshold change ($50B→$100B) delayed RBO→LFBO transition ~3 years; transition arrived as an abrupt cliff, worsened by COVID pause and a 2021 lighter-touch culture shift. <strong>Governance</strong>: three MRIAs (board, risk programs, internal audit) flagged May 2022; CRO vacancy April-December 2022; MOU process too slow to complete before failure. <strong>Liquidity</strong>: $18B modeled 30-day shortfall (Aug 2022) mislabeled 'operational'; assumptions relaxed to shrink the number, not the problem. <strong>Interest rate risk</strong>: NII-only risk appetite (EVE excluded); hedges against rising rates removed for short-term profit, worsening EVE; ALCO tested only parallel yield-curve shifts.</p>`,

  eli5: `<p>Imagine a landlord who collects security deposits from tenants who ALL work at the same factory. Business is booming, so the landlord takes those deposits and locks most of them into a 10-year fixed-rate savings bond, planning never to touch it, because it pays better interest than keeping cash on hand. Then the factory announces layoffs. Suddenly every tenant needs their deposit back at once, because they're all in the same boat financially. The landlord tries to cash out part of the bond — but the bank that issued it says "you can't cash out just a slice; if you touch it at all, we mark the WHOLE bond to today's price," and today's price is much lower because interest rates have risen since the landlord bought it. The landlord stalls, hoping tenants calm down; instead panic spreads (everyone talks to everyone else), and the landlord is wiped out trying to meet demands with a locked-up, now-underwater asset. In finance terms: the tenants are SVB's concentrated tech/VC depositors, the factory layoffs are the VC funding slowdown, the 10-year bond is the HTM securities portfolio, and the "touch it and it's all marked to market" rule is the HTM-to-AFS reclassification accounting trap.</p>`,

  thinkLike: `<p>A risk manager reading this case does not ask "was the HTM portfolio itself risky?" in isolation — long-dated government and agency MBS are, individually, very low credit risk. The right question is: <strong>how correlated is my funding base with the thing that will make my assets lose value?</strong> SVB's failure was a correlation failure, not a credit-quality failure: the same interest-rate cycle that devalued its HTM book also throttled VC funding, which triggered withdrawals from the exact depositor base that funded that book. A risk manager frames every large concentrated funding source ("who exactly are my depositors, and what do they have in common?") against every large asset duration bet ("what happens to this book if rates move against me?") and asks whether those two exposures move together under stress — which is precisely what neither SVB's risk appetite statement (NII-only) nor its ALCO (parallel-shift-only) ever tested.</p>
  <p>The FRM exam tends to test this reading by handing you a specific fact pattern (a rating history, a dollar figure, a date, an accounting rule) and asking you to identify which of several plausible-sounding "root causes" is actually correct — distractors usually blame the Fed's rate hikes directly, or blame regulators for being "too aggressive," when the source material's own framing is that SVB's OWN risk management and asset-liability mismatch were the primary cause, with supervisory delay as a compounding — not root — factor. Expect questions that require you to distinguish NII from EVE, RBO from LFBO, and HTM from AFS treatment precisely, since these paired distinctions are where the exam concentrates its trap answers.</p>`,

  breakdown: [
    {
      title: "SVB's six specific risk exposures (LO 94.c)",
      points: [
        "Deposit concentration — depositor base concentrated in startups, VCs, and PE firms in tech/life sciences, so withdrawal demand hit all at once when the industry hit trouble together.",
        "Type of deposits — large, ~94% uninsured (above FDIC limits); shifted from noninterest-bearing to interest-bearing in 2022, changing liability duration and worsening liquidity stress test results.",
        "Held-to-maturity (HTM) securities — long-dated agency MBS, 6.2-year weighted-average duration, carried at historical cost; management removed rate-rise hedges to protect short-term profit, and selling any portion would have forced full reclassification to AFS at a loss.",
        "Available-for-sale (AFS) securities — already marked-to-market, so more timely, but selling them to cover withdrawals crystallized real, sizable losses given the long duration bought before the rate-hike cycle.",
        "Contingent funding and capacity — insufficient plans to tap repo funding and bilateral relationships for extra liquidity; SVB only began building this out in Q4 2022, too late to matter.",
        "Capital raising — promotional deposit-retention offers failed to stem outflows, and selling HTM assets to raise cash would have realized losses too large to keep pace with withdrawal demand."
      ]
    },
    {
      title: "Three MRIAs from the May 31, 2022 supervisory report (LO 94.d)",
      points: [
        "Board effectiveness — board, management, and CRO never adequately shifted from RBO-level to LFBO-level (EPS) rigor, even after hiring consultants in 2020; the board lacked experience running a large financial institution.",
        "Risk management programs — no formal risk appetite standard, no root-cause tracking/reporting, no enterprise-wide policies/procedures or internal control framework, incentives disconnected from risk outcomes, underdeveloped talent acquisition and performance review.",
        "Internal audit effectiveness — methodology insufficient to challenge management, untimely/insufficient reporting to the audit committee, no timely analysis of critical risk management functions."
      ]
    },
    {
      title: "Six liquidity deficiencies found once SVB moved to LFBO review (LO 94.e)",
      points: [
        "Needed a plan to address shortfalls in liquidity stress testing and contingency funding.",
        "Internal audit function needed redesign to provide sufficient liquidity risk oversight.",
        "Stress testing needed more realistic assumptions reflecting immediate stress rather than a gradual, expected evolution.",
        "Deposit stress testing did not incorporate realistic withdrawal risks.",
        "Liquidity risk limits and processes were not keeping pace with SVB's rapid size increase.",
        "SVB had not adequately assessed its potential (contingent) funding sources."
      ]
    },
    {
      title: "Timeline from complacency to collapse",
      points: [
        "2022 Q2 — concentrated client base begins withdrawing deposits; SVB offers (largely ineffective) promotional deals to retain them.",
        "2022 Q3 (Aug 21) — SVB models an $18B 30-day and $23B 90-day liquidity buffer shortfall, but labels it merely 'operational'; supervisors do not materially change risk ratings.",
        "2022 Q4 — board briefed in November; management relaxes model assumptions, shrinking the modeled shortfall by $5B without changing reality; supervisors know about the change but delay comment to the 2023 review cycle.",
        "2023 (early) — a horizontal peer review flags SVB as 'not meeting expectations'; supervisor interaction stays limited until early March.",
        "March 8, 2023 — SVB announces a $21B AFS sale (a $1.8B after-tax realized loss) and a $2.25B equity offering; Moody's/S&P signal downgrades.",
        "March 9, 2023 — depositor panic drives $40B in withdrawal requests in a single day; that evening SVB tells supervisors it expects $100B more on March 10, capital it does not have.",
        "March 10, 2023 — California's CDFPI closes SVB; the FDIC is appointed receiver."
      ]
    }
  ],

  quiz: [
    {
      q: "What was the primary root cause of SVB's failure, according to the Fed's review?",
      options: [
        "The Federal Reserve raised interest rates too aggressively",
        "SVB failed to align its assets with potential correlated customer withdrawal needs",
        "Foreign depositors coordinated a simultaneous withdrawal",
        "The FDIC insurance limit was set too low for tech companies"
      ],
      answer: 1,
      why: "The review's own framing is that rate increases compounded the problem, but the root cause was SVB investing depositor money in long-dated HTM securities without adequately anticipating that its concentrated, correlated depositor base could demand withdrawals all at once. Blaming the Fed's rate policy is the most tempting distractor because rates were the proximate trigger, but the source is explicit that SVB's own risk management, not Fed policy, was the primary cause."
    },
    {
      q: "Why did SVB's accounting treatment discourage it from selling part of its HTM portfolio to meet withdrawal demand?",
      options: [
        "HTM securities could not legally be sold under any circumstances",
        "Selling any portion of the HTM portfolio would require reclassifying the ENTIRE portfolio to AFS, forcing full mark-to-market loss recognition",
        "AFS securities carried higher transaction costs than HTM securities",
        "Regulators required 90 days' notice before any HTM sale"
      ],
      answer: 1,
      why: "The accounting rule in force treated any partial sale as tainting the whole HTM classification, forcing the entire book to be reclassified as AFS and marked to market at once — a much larger loss than the specific bonds sold. The 'HTM securities could not legally be sold' answer is wrong because HTM securities CAN be sold, just with this reclassification consequence; the rule wasn't a legal prohibition."
    },
    {
      q: "The 2018 rule change that raised the LFBO asset threshold from $50 billion to $100 billion had what effect on SVB's supervision?",
      options: [
        "It accelerated SVB's move to stricter LFBO supervision by three years",
        "It had no material effect since SVB was always below $50 billion",
        "It delayed SVB's transition to stricter LFBO supervision by roughly three years",
        "It reclassified SVB directly as a Global Systemically Important Bank (G-SIB)"
      ],
      answer: 2,
      why: "Had the threshold stayed at $50 billion, SVB would have crossed into LFBO status around 2018; instead, with the threshold raised to $100 billion, the transition didn't happen until February 2021 — about three years later, during a period when SVB's assets grew 271%. The 'accelerated by three years' answer reverses the direction of the effect, a common trap for threshold-change questions."
    },
    {
      q: "In August 2022, SVB modeled an $18 billion shortfall in its 30-day liquidity buffer. In Q4 2022, management changed model assumptions in a way that reduced this modeled shortfall by $5 billion. What was the resulting modeled 30-day shortfall, and what did this change actually accomplish economically?",
      options: [
        "$13 billion; it genuinely closed part of the liquidity gap by raising new capital",
        "$13 billion; it merely changed the model's output, without altering the bank's actual economic liquidity position",
        "$23 billion; assumption changes made the shortfall look worse to force board attention",
        "$0; the assumption change fully closed the modeled shortfall"
      ],
      answer: 1,
      why: "$18B − $5B = $13B is the correct arithmetic, but the crucial point tested is that this reduction came from relaxing model assumptions (e.g., deposit outflow speed), not from raising real capital or selling assets — it changed the number on the page, not the bank's real liquidity position. The '$13 billion; genuinely closed the gap by raising new capital' answer is the tempting-but-wrong distractor because it assumes the $5B improvement reflected a genuine liquidity action."
    },
    {
      q: "Why did SVB's risk appetite statement (RAS) fail to reveal the true structural risk in its balance sheet?",
      options: [
        "It included only economic value of equity (EVE) and excluded net interest income (NII)",
        "It included only net interest income (NII) at risk and excluded economic value of equity (EVE) entirely",
        "It tested both NII and EVE but used unrealistically high deposit betas",
        "It was updated too frequently, causing model instability"
      ],
      answer: 1,
      why: "SVB's RAS included only NII, which measures short-term cash flow volatility, and excluded EVE, which measures the longer-term structural mismatch between the present value of assets and liabilities — precisely the metric that would have revealed the damage from removing rate-rise hedges. The 'included only EVE and excluded NII' answer reverses which metric was excluded, a classic swapped-terms distractor."
    },
    {
      q: "The May 2022 supervisory report cited three Matters Requiring Immediate Attention (MRIAs). Which of the following was NOT one of them?",
      options: [
        "Board effectiveness",
        "Risk management programs",
        "Internal audit effectiveness",
        "Capital adequacy ratios"
      ],
      answer: 3,
      why: "The three MRIAs were board effectiveness, risk management programs, and internal audit effectiveness — governance and process failures, not a capital-ratio breach. The 'capital adequacy ratios' answer sounds plausible because capital problems are common bank-failure themes generally, but SVB's cited MRIAs were specifically about governance and risk-management process, not capital ratios."
    }
  ],

  sources: [
    { title: "Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank (Barr Report)", url: "https://www.federalreserve.gov/publications/files/svb-review-20230428.pdf", note: "The original Federal Reserve report this entire reading is based on — primary source for every fact, date, and rating cited above." },
    { title: "Collapse of Silicon Valley Bank", url: "https://en.wikipedia.org/wiki/Collapse_of_Silicon_Valley_Bank", note: "A readable narrative timeline of the March 2023 run and closure, useful for cross-checking the sequence of events." },
    { title: "Silicon Valley Bank Collapse: What Happened and Its Effects", url: "https://www.investopedia.com/what-caused-silicon-valley-bank-collapse-7370790", note: "A plain-English explainer of the deposit-concentration and duration-mismatch mechanics, good for a first-pass overview before the exam-detail version above." },
    { title: "FDIC: Silicon Valley Bank, Santa Clara, CA", url: "https://www.fdic.gov/bank-failures/failed-bank-list", note: "The FDIC's official failed-bank record confirming the receivership date and resolution details." }
  ],

  pdf: { book: 5, query: "Headquartered in Santa Clara, CA, Silicon Valley Bank" }
});
