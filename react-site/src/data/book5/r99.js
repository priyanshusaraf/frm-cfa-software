export default ({
  book: 5,
  reading: 99,
  session: "Current Issues in Financial Markets",
  title: "Principles for the Effective Management and Supervision of Climate-Related Financial Risks",
  tagline: "R97 said WHAT climate risk is, R98 said HOW to measure it — this reading says WHO is accountable and HOW governance turns measurement into action.",

  teaches: "The Basel Committee's 18 principles for managing and supervising climate-related financial risk: 12 principles aimed at banks (governance, internal controls, capital/liquidity adequacy, risk management process, monitoring/reporting, credit/market/liquidity/operational risk management, and scenario analysis) and 6 principles aimed at supervisors (assessing bank governance and risk management, and exercising their own supervisory powers/techniques/resources).",

  why: "This is the governance capstone of the climate-risk trilogy (R97 drivers → R98 measurement → R99 management/supervision). It is explicitly described as 'general in nature' — the exam focus line says to focus on understanding the principles, which signals matching/identification-style questions rather than calculation. Because there are 18 numbered principles, the exam favors 'which principle number covers X' and 'which line of defense handles Y' style questions.",

  intuition: "Think of this reading as answering: if R98 gave you the measurement tools, who in the bank is responsible for using them, and how does a regulator check that they did? The 12 bank principles map cleanly onto a standard risk-management skeleton you've seen all book: governance (who decides) → internal controls (three lines of defense) → capital/liquidity adequacy (does this get baked into capital planning) → risk management process (day-to-day identification/monitoring) → reporting (does the board see it) → risk-type-by-risk-type application (credit, market, liquidity, operational) → scenario analysis (stress-test it). The 6 supervisor principles are just the mirror image: supervisors check that banks did all of the above, then use their own powers/resources/scenario tools to verify independently.",

  formulas: [],

  eli5: "<p>Picture a large apartment building where the landlord (the bank) knows the roof might leak badly in a future storm (climate risk), but hasn't told the maintenance staff, hasn't budgeted repair money, and has no plan for a big storm. Principles 1-12 are basically a checklist the landlord must follow: name someone responsible for the roof (Principle 2), write down the maintenance policy for every unit (Principle 3), have three separate people check the roof — the handyman who inspects it (1st line), the building manager who double-checks the handyman's report (2nd line), and an outside auditor who reviews both of them plus the inspection records themselves (3rd line, Principle 4) — set aside emergency repair cash (Principle 5), and run a fire-drill-style simulation of a severe storm before it happens (Principle 12, scenario analysis). Principles 13-18 are the city building inspector's job: check that the landlord actually did all of that (13-15), and make sure the inspector's own office has trained staff and the right tools, especially for the biggest, most complex buildings in the city (16-18). In finance terms: the bank principles build climate-risk governance and controls inside the bank, while the supervisor principles are the regulator checking and enforcing that work.</p>",

  thinkLike: "<p>A risk manager reading this material does not treat it as a list of 18 things to memorize in isolation — they treat it as a map of accountability. For any climate-risk fact pattern the exam gives you (a bank ignoring board-level climate discussion, a supervisor demanding purely in-house analysis, a credit officer extending a 20-year loan to a coastal manufacturer), the first question is: which of the two populations does this concern — the bank building the machinery, or the supervisor checking it? The second question is: which layer of the bank's own machinery — governance (who decided), controls (who checked), capital/liquidity (does it show up in the numbers), day-to-day risk management (limits and monitoring), or scenario analysis (does it survive a stress test)? Because the reading is explicitly labeled 'general in nature' with no calculations, GARP tends to test it as scenario-identification: a short vignette describing a bank's or supervisor's behavior, followed by 'which principle does this violate' or 'which line of defense is this.' The practitioner habit that pays off here is pattern-matching keywords to principle clusters — 'external specialists,' 'remuneration,' and 'board training' cue Principle 1-2; 'separate from the first line' cues Principle 4 and the second line specifically; 'heatmap,' 'shorter-term loans,' 'collateral' cue Principle 8; 'severe but plausible' cues stress testing (Principle 18) rather than sensitivity analysis; and 'larger and international banks' cues Principle 18's proportionality point.</p>",

  breakdown: [
    {
      title: "The 12 bank principles, by cluster",
      points: [
        "Principle 1 (assess & strategize): build a sound process for understanding climate risk drivers' impact on the business and embed it in strategy and risk management, including possible effects on employee remuneration.",
        "Principle 2 (assign & oversee): the board and senior management clearly assign climate responsibilities to people/committees and exercise effective oversight, using external specialists or board training if internal knowledge is insufficient.",
        "Principle 3 (policies everywhere): adopt policies, procedures, and controls implemented across the whole organization — e.g., new-client acceptance, material-transaction audits.",
        "Principle 4 (three lines of defense): incorporate climate risk into internal controls: 1st line assesses risk at point of origination (new clients, credit, products), 2nd line (risk department) independently challenges the 1st line's analysis, 3rd line (internal audit) reviews both lines plus data quality.",
        "Principle 5 (capital & liquidity math): identify and quantify material climate risks and fold them into ICAAP-style capital adequacy (solvency ratios, longer-term) and a parallel liquidity analysis (net cash outflows, current/quick ratios, shorter-term), including stress testing where appropriate.",
        "Principle 6 (risk appetite & concentration): identify, monitor, and manage all material climate risks affecting financial condition; the risk appetite framework must flag concentration risk (sector, industry, geography, counterparty) as the most crucial dimension, with exposure limits set by risk type.",
        "Principle 7 (report it): risk data aggregation and internal reporting must account for climate risk — controls to spot risks/concentrations, IT upgrades if needed, counterparty data on transition strategies, approximations where data is missing, periodic timely reporting with numerical and non-numerical metrics, and public disclosure of analysis limitations.",
        "Principle 8 (credit risk): assess climate risk before and during the credit term; use heatmaps for concentration; mitigate with tighter underwriting, shorter-term loans, lower lending amounts, greater collateral, and explicit sector/geography limits.",
        "Principle 9 (market risk): determine climate risk's effect on portfolio value; use shock scenario analysis, including shocking the liquidity of climate-exposed assets and accounting for hedges that may become costly or unavailable.",
        "Principle 10 (liquidity risk): assess effects on cash outflows (credit-line drawdowns, deposit withdrawals) and on the value of assets held in the liquidity buffer.",
        "Principle 11 (operational & other risk): cover business continuity plus strategic, reputational, regulatory-compliance, and liability risk arising from climate-sensitive investments and businesses.",
        "Principle 12 (scenario analysis): use scenario analysis, sized to the bank's complexity, covering both physical and transition risk, both short and long time horizons, and revised continuously rather than left static."
      ]
    },
    {
      title: "The 6 supervisor principles, by cluster",
      points: [
        "Principle 13 (governance check): supervisors confirm banks have soundly incorporated climate risk into strategy, governance, and controls — maintaining communication with the board, questioning strategic assumptions, and reviewing all three lines of defense.",
        "Principle 14 (risk-management check): supervisors confirm banks can identify, monitor, and manage climate risk within their risk appetite framework — checking the scope/frequency of materiality assessments and the sufficiency of data and reporting.",
        "Principle 15 (risk-type & scenario check): supervisors confirm banks regularly assess climate risk's impact across credit, market, liquidity, operational, and other risk types, apply scenario analysis appropriately, and reflect significant risks in capital/liquidity sufficiency calculations.",
        "Principle 16 (right tools, follow up): supervisors use an appropriate range of techniques and tools, follow up on material misalignment, scale requirements to bank size/complexity, and cooperate internationally to share information and avoid duplicated work.",
        "Principle 17 (build capacity): supervisors ensure they have adequate resources and skills — ongoing training, the ability to interpret outsourced specialist work, a wide and varied stakeholder group, and use of public data supplemented by bank-requested data where gaps exist.",
        "Principle 18 (scenario analysis & stress testing): supervisors may use climate scenario analysis to identify risk factors, size exposures, spot data gaps, and assess risk-management adequacy, and may use climate stress testing to evaluate financial position under severe-but-plausible scenarios, disclosing findings where appropriate — explicitly targeted more toward larger and international banks than smaller local ones."
      ]
    }
  ],

  quiz: [
    {
      q: "Within the internal control framework, the third line of defense most likely covers which of the following areas?",
      options: ["Internal audit and data quality only", "Internal audit and risk assessments only", "Risk assessments and data quality only", "Risk assessments, internal audit, and data quality"],
      answer: 3,
      why: "The third line (internal audit) takes a high-level view of the whole control process, reviewing BOTH the first line (risk assessments) AND the second line (internal audit function itself), while ALSO considering data quality — all three, not any two-item subset. Each of the other options drops one of the three components."
    },
    {
      q: "Which type of material risk is most directly associated with climate-related financial risk according to Principle 6?",
      options: ["Concentration risk", "Counterparty risk", "Default risk", "Liquidity risk"],
      answer: 0,
      why: "Principle 6 explicitly singles out concentration risk (by sector, industry, geography, and counterparty) as the most crucial risk type in the risk appetite framework, because climate losses cluster geographically and by sector. Counterparty, default, and liquidity risk are all real climate-risk transmission channels covered elsewhere (Principles 8-10), but none is named 'most crucial' the way concentration risk is."
    },
    {
      q: "Which of the following actions by a bank is LEAST likely to mitigate material climate-related credit risk?",
      options: ["Targeting specific (higher-quality) clients", "Engaging in long-term lending", "Using discounted asset valuations", "Lowering the debt-equity ratio covenant"],
      answer: 1,
      why: "Principle 8 lists shorter-term loans (not longer-term) as a credit-risk mitigation tool: locking a loan in for longer keeps the bank exposed to climate risks that may worsen over the loan's life. Targeting specific clients, discounted valuations, and tighter covenants are all correctly listed mitigation tools, making them incorrect (tempting) distractors."
    },
    {
      q: "A supervisor wants to evaluate whether a bank's financial position would remain sufficient under a severe-but-plausible climate scenario. Per Principle 18, which tool is specified for this purpose?",
      options: ["Sensitivity analysis", "Stress testing", "Value at risk", "Duration analysis"],
      answer: 1,
      why: "Principle 18 specifically names climate-related stress testing for evaluating a firm's financial position under 'severe but plausible' scenarios. Sensitivity analysis is a narrower, single-variable-impact tool (as established in the prior reading on measuring climate risk) and is the most tempting wrong answer because it sounds similar, but it is not the tool Principle 18 specifies for this purpose."
    },
    {
      q: "Regarding the role of a supervisor in climate-related risk management, which statement is most accurate?",
      options: ["Supervisors should ensure all climate risk assessment work is done purely in-house", "Supervisors should focus stress testing and scenario analysis equally on banks of all sizes", "Supervisors should focus more on climate scenario analysis and stress testing for larger, international banks than for smaller local banks", "Supervisors should rely only on quantitative specialists when assembling a stakeholder group"],
      answer: 2,
      why: "Principle 18 explicitly states that scenario analysis and stress testing are targeted more toward larger and international banks; smaller local banks are not expected to receive the same intensity of these tools. Outsourcing specialist work is explicitly acceptable under Principle 17 (so 'purely in-house' is wrong), applying equal intensity to all bank sizes contradicts Principle 18, and Principle 17 calls for a wide and varied stakeholder group, not quantitative specialists alone."
    },
    {
      q: "A bank's board has never discussed climate risk, no committee or individual owns climate-related responsibilities, and the bank's new-client-acceptance policy makes no mention of climate risk — even though the bank's risk-modeling team produces excellent climate exposure estimates. Which principle(s) does this scenario most directly violate?",
      options: ["Principle 12 (scenario analysis) only, since the models aren't stress-tested", "Principles 1-3 (governance), because responsibility assignment, board oversight, and organization-wide policy are all missing", "Principle 4 (three lines of defense) only, since the risk team is the second line", "No principle is violated, because the risk-modeling team's measurement work is excellent"],
      answer: 1,
      why: "This is a governance failure (Principles 1-3: assess/strategize, assign/oversee, policies everywhere) sitting on top of otherwise-good measurement — good models cannot substitute for board oversight, assigned accountability, and organization-wide policy. It is not a scenario-analysis or three-lines-of-defense issue specifically, since those principles concern testing methodology and control review respectively, not the absence of governance itself; and having good models does not mean no principle is violated."
    }
  ],

  sources: [
    { title: "Principles for the effective management and supervision of climate-related financial risks (BCBS, June 2022)", url: "https://www.bis.org/bcbs/publ/d532.htm", note: "The original Basel Committee publication this entire reading summarizes — read it directly for the full text of all 18 principles." },
    { title: "Three lines of defense model — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_lines_of_defence", note: "Background on the three-lines-of-defense internal control architecture that Principle 4 applies specifically to climate risk." },
    { title: "Climate-related risk drivers and their transmission channels (BCBS, April 2021)", url: "https://www.bis.org/bcbs/publ/d517.htm", note: "The companion BIS publication behind R97's driver taxonomy that these governance principles are meant to act on." },
    { title: "Concentration risk — Investopedia", url: "https://www.investopedia.com/terms/c/concentration_risk.asp", note: "Explains why concentration risk (sector/geography/counterparty clustering) is the risk type most directly tied to climate exposure." }
  ],

  pdf: { book: 5, query: "The effects of climate change could include physical and transition risks" },

  concepts: [
    {
      name: "The 12 bank principles — governance and internal control (Principles 1-4)",
      def: "Principle 1: develop a sound process for understanding/assessing climate risk driver impacts and incorporate into business strategy and risk management. Principle 2: board/senior management clearly assign climate responsibilities and exercise oversight. Principle 3: adopt policies/procedures/controls implemented organization-wide. Principle 4: incorporate climate risk into internal controls across the three lines of defense.",
      intuition: "These four principles establish WHO owns climate risk and HOW the organization structures accountability — before any measurement or capital work happens, governance has to exist.",
      example: "A bank whose board has never discussed climate risk, with no assigned committee owner, and no mention of climate risk in new-client-acceptance policy, would fail Principles 1-3 even if its risk team has excellent measurement models (which would be a governance failure sitting on top of good measurement, illustrating why this reading is distinct from R98).",
      counter: "Principle 1 explicitly extends to employee remuneration — a detail easy to overlook since most 'governance' discussions focus on board oversight, not compensation design.",
      pitfall: "Principle 2 requires possibly consulting EXTERNAL specialists and providing technical training to the board — don't assume internal-only capability is sufficient if the board's own climate risk knowledge is insufficient.",
      related: ["Three lines of defense (Principle 4)"],
      memory: "1 = assess & strategize, 2 = assign & oversee, 3 = policies everywhere, 4 = bake it into the 3 lines of defense."
    },
    {
      name: "Three lines of defense (Principle 4 detail)",
      def: "First line: employees assessing climate risk when accepting new clients, reviewing credit, setting up new products — requires technical knowledge at point of origination. Second line: the bank's risk department, operating separately from the first line, questioning first-line analysis. Third line: internal audit — takes a high-level view of the whole control process, reviews first AND second lines, AND considers data quality.",
      intuition: "First line does the work, second line checks the work independently, third line audits both lines PLUS the data feeding them — each line has a strictly wider scope than the one before it.",
      example: "MODULE QUIZ 101.1 Q1 tests this directly: the third line of defense covers risk assessments (via review of the first line), internal audit, AND data quality — the correct answer is D, all three, not any subset.",
      counter: "A common wrong-answer pattern is 'internal audit and data quality only' or 'risk assessments and data quality only' — the third line's job is comprehensive: it reviews BOTH other lines' work AND the data quality underlying it.",
      pitfall: "Don't assume the third line only 'audits' in a narrow compliance-checklist sense — it explicitly considers data quality, which is a substantive analytical function, not just a procedural check.",
      related: ["Governance and internal control (Principles 1-4)"],
      memory: "1st line = does it. 2nd line = checks it independently. 3rd line = audits both lines + the data."
    },
    {
      name: "Capital, liquidity adequacy, and risk management process (Principles 5-6)",
      def: "Principle 5: identify/quantify material climate risks and incorporate into internal capital and liquidity adequacy assessment processes (ICAAP-style), including stress testing where appropriate — solvency analysis (debt-to-equity, interest coverage) for longer-term capital impacts, and a parallel short-term liquidity analysis (net cash outflows, current/quick ratio deterioration) for both normal and stressed conditions. Principle 6: identify, monitor, and manage all material climate risks affecting financial condition; risk appetite frameworks must consider concentration risk (sector, industry, geography, counterparty) as the most crucial dimension.",
      intuition: "Principle 5 is 'does climate risk show up in your capital and liquidity numbers'; Principle 6 is 'does climate risk show up in your day-to-day risk management and limit-setting.' Concentration risk gets singled out as THE most important risk type climate materializes through.",
      example: "MODULE QUIZ 101.1 Q2 tests exactly this: which risk type is most directly associated with climate-related financial risk — concentration risk (correct), not counterparty, default, or liquidity risk specifically, because climate risk clusters by sector/geography in a way that concentration risk captures directly.",
      counter: "Don't assume 'liquidity risk' is the most climate-associated risk just because Book 4 emphasized liquidity broadly — for THIS reading's principle framework, concentration risk is explicitly named as most crucial.",
      pitfall: "'Incorporate' in Principle 5 means embedding climate risk into the firm's business model, strategy, AND stress testing plans — not merely producing a side report.",
      related: ["Comprehensive management of credit risk (Principle 8)"],
      memory: "Principle 5 = capital & liquidity math. Principle 6 = risk appetite & concentration limits."
    },
    {
      name: "Monitoring, reporting, and comprehensive risk-type management (Principles 7-11)",
      def: "Principle 7: risk data aggregation and internal reporting must account for climate risk — controls to spot risks/concentrations/new risks, IT system upgrades if needed, client/counterparty data gathering on transition strategies, use of approximations when data is unavailable, periodic timely reporting, both numerical and non-numerical metrics, public disclosure of analysis limitations. Principle 8: credit risk — thorough climate assessment before AND during the credit term, heatmaps for concentration, risk-management tools (tighter underwriting, shorter-term loans, lower lending amounts, greater collateral, explicit sector/geography limits). Principle 9: market risk — portfolio value impact, shock scenario analysis (e.g., shocking asset liquidity, assumption changes on offset timing, hedges becoming costly/impossible). Principle 10: liquidity risk — cash outflow effects (credit line drawdowns, deposit withdrawals), liquidity buffer asset value effects. Principle 11: operational risk and other risks — business continuity, plus strategic/reputational/regulatory compliance/liability risk from climate-sensitive investments.",
      intuition: "Principles 8-11 are the same climate-risk lens applied risk-type by risk-type — a direct parallel to how Book 1-4 each built VaR/measurement machinery for one risk type at a time.",
      example: "MODULE QUIZ 101.2 Q1 asks which credit-risk mitigation action is LEAST likely to help: long-term lending is the answer (correct: B) — banks reduce credit risk with SHORTER-term loans, not longer ones; targeting specific (higher-quality) clients, using discounted asset valuations, and lowering debt-equity covenant ratios all correctly reduce credit risk.",
      counter: "It would be intuitive but wrong to think 'long-term lending' is neutral or risk-reducing — longer-term loans lock in exposure to climate risks that could materialize over the loan's life, increasing (not decreasing) credit risk, all else equal.",
      pitfall: "Principle 9's 'shock scenario analysis' for market risk is about shocking the LIQUIDITY of climate-exposed assets specifically, not just shocking their price level — a nuance the exam could test.",
      related: ["Comprehensive management of credit risk", "Scenario analysis (Principle 12)"],
      memory: "7=report it, 8=credit, 9=market, 10=liquidity, 11=operational+other (strategic/reputational/compliance/liability)."
    },
    {
      name: "Scenario analysis (Principle 12)",
      def: "Banks should use scenario analysis (where appropriate) to assess business model/strategy resilience to plausible climate pathways, covering physical and transition risks as drivers of credit, market, operational, and liquidity risk over relevant time horizons. Goals include: effects on business operations/resiliency, identifying most-relevant risk factors, quantifying exposures/expected losses, identifying data/analysis restrictions, and formulating risk-management methods. Scope should be commensurate with bank size/complexity; scenarios must span short AND long term and be continuously revised (not static) given fast-changing climate science.",
      intuition: "This is the capstone principle tying together everything from Principles 5-11: scenario analysis is the tool that stress-tests whether all that governance, capital-adequacy work, and risk-type-specific management actually holds up under a plausible future.",
      example: "Short-term scenarios cover more-certain, more-quantifiable near-term risks; long-term scenarios cover less-certain general risks but still test the bank's ability to adapt strategically over time — directly echoing R98's time-horizon discussion.",
      counter: "Don't treat 'commensurate with size and complexity' as optional boilerplate — it directly foreshadows Principle 18's point that scenario analysis/stress testing is targeted more toward larger/international banks, not smaller local ones.",
      pitfall: "Scenario analysis must be revised on an ongoing basis — a static, one-time scenario built years ago and never updated fails Principle 12 even if it was rigorous when built.",
      related: ["Supervisor scenario analysis (Principle 18)", "Two scenario dimensions and time horizon challenge (R98)"],
      memory: "Principle 12 = the stress test that ties governance + capital + risk-type management together, sized to the bank and constantly refreshed."
    },
    {
      name: "The 6 supervisor principles — assessing banks (Principles 13-15)",
      def: "Principle 13: supervisors determine whether banks' incorporation of climate risk into strategy, governance, and internal controls is sound/comprehensive — requires clear communication lines with the board, ability to question underlying strategic assumptions, and review of all three lines of defense. Principle 14: supervisors determine whether banks can adequately identify/monitor/manage climate risk within risk appetite and risk-management frameworks — checking scope/frequency of materiality determination and data/reporting sufficiency. Principle 15: supervisors determine the extent to which banks regularly identify/assess climate risk impact across credit/market/liquidity/operational/other risk types, and whether banks apply climate scenario analysis appropriately — including whether significant risks are reflected in capital/liquidity sufficiency calculations.",
      intuition: "Principles 13-15 are a direct mirror of the bank principles: 13 mirrors 1-4 (governance/controls), 14 mirrors 5-6 (capital/risk management), 15 mirrors 7-12 (risk-type management and scenario analysis) — supervisors check exactly what banks were told to build.",
      example: null,
      counter: null,
      pitfall: "These three principles are about supervisors evaluating BANKS' internal work — don't confuse them with Principles 16-18, which are about supervisors' OWN tools/powers/resources.",
      related: ["Prudential regulatory requirements", "Bank governance principles"],
      memory: "13-14-15 = supervisors grading the bank's homework (governance, risk management, risk-type coverage)."
    },
    {
      name: "The 6 supervisor principles — supervisors' own powers and tools (Principles 16-18)",
      def: "Principle 16: supervisors use an appropriate range of techniques/tools and adequate follow-up for material misalignment; requirements scaled to bank size/complexity; international cooperation encouraged to share information and avoid duplication. Principle 17: supervisors ensure they have adequate resources/capacity — ongoing skill development, ability to interpret externally-outsourced specialist work, assembling a wide/varied group of stakeholders, using public information supplemented by bank-requested data where gaps exist. Principle 18: supervisors may use climate scenario analysis (to identify risk factors, size exposures, spot data gaps, assess risk-management adequacy) and climate stress testing (to evaluate financial position under severe-but-plausible scenarios), with disclosure of findings where appropriate — explicitly noted as targeted more toward LARGER and INTERNATIONAL banks, not necessarily smaller local banks.",
      intuition: "16-17-18 are about the supervisor's OWN capability-building and toolkit, distinct from 13-15's bank-assessment function — the supervisor must first BE capable (17), THEN use appropriate tools/follow-through (16), and specifically CAN deploy scenario analysis/stress testing at the larger/systemic end of the banking population (18).",
      example: "MODULE QUIZ 101.2 Q2 tests this cluster directly: supervisors should focus MORE on stress testing/scenario analysis for larger banks than smaller ones (correct: C) — not ensure assessments are purely internal (some specialist work is properly outsourced), not focus narrowly on quantitative specialists alone (a broad/diverse stakeholder group is needed, including climate scientists), and use STRESS TESTING (not sensitivity analysis) specifically to assess financial-position sufficiency under severe-but-possible scenarios.",
      counter: "It's tempting to think supervisors should keep climate risk assessment fully in-house for control purposes — but Principle 17 explicitly acknowledges outsourcing specialist work is appropriate, provided supervisors retain enough knowledge to interpret it.",
      pitfall: "Principle 18 specifically says stress testing (not sensitivity analysis) is the tool for assessing 'severe but plausible' financial-position sufficiency — sensitivity analysis is more about single-variable impact (as established in R98), a distinction the exam tests directly.",
      related: ["Scenario analysis (Principle 12)", "Broad risk measurement approaches (R98)"],
      memory: "16 = use the right tools + follow up. 17 = build your own capacity. 18 = deploy scenario analysis/stress testing, scaled to bank size, disclose where appropriate."
    }
  ],

  connections: {
    from: [
      { r: 97, why: "This reading assumes the physical/transition risk driver taxonomy and transmission channels established in R97 as the substance that governance and supervision principles must act upon." },
      { r: 98, why: "Several principles (5, 9, 12, 18) directly reuse R98's measurement vocabulary — scenario analysis, stress testing, sensitivity analysis, gross/net exposure via mitigation — applying it inside a governance and supervisory framework rather than a pure measurement one." },
      { r: 53, why: "The three-lines-of-defense structure in Principle 4 is the same internal-control architecture from Book 3's model risk management reading, now applied specifically to climate risk." }
    ],
    to: [
      { r: 100, why: "The Crypto Ecosystem reading shifts to a completely different emerging-risk domain, but the underlying exam pattern — a taxonomy of structural features and risks in an immature, fast-evolving area — continues." }
    ],
    confused: [
      { what: "R98 vs. R99", how: "R98 is about MEASURING climate risk (data, models, methodologies); R99 (this reading) is about GOVERNING and SUPERVISING the management of that risk (who's accountable, what principles apply). A question about 'gross exposure' or 'IAM' belongs to R98; a question about 'three lines of defense' or 'Principle 12' belongs to R99." }
    ]
  },

  misconceptions: [
    { wrong: "The third line of defense (internal audit) reviews only internal audit processes, or only risk assessments and data quality.", right: "The third line reviews BOTH the first and second lines AND considers data quality — a broader scope than either subset alone." },
    { wrong: "Liquidity risk or counterparty risk is the risk type most directly associated with climate-related financial risk in the risk appetite framework.", right: "Concentration risk (sector, industry, geography, counterparty) is identified as most directly and crucially associated with climate risk (Principle 6)." },
    { wrong: "Long-term lending is a neutral or risk-reducing tool for climate-related credit risk.", right: "Long-term lending does NOT reduce climate-related credit risk — shorter-term loans are the risk-mitigating tool; longer maturities lock in exposure to risks that may worsen over the loan's life." },
    { wrong: "Supervisors must keep all climate risk assessment purely in-house.", right: "Outsourcing specialist work is explicitly acceptable, so long as supervisors retain enough knowledge to interpret the outsourced work." },
    { wrong: "Sensitivity analysis is the tool supervisors use to assess a bank's financial position sufficiency under a severe-but-plausible scenario.", right: "Stress testing (per Principle 18), not sensitivity analysis, is the specified tool — sensitivity analysis evaluates single-variable impact, a narrower purpose." },
    { wrong: "Scenario analysis and stress testing are expected to be applied with equal intensity across banks of all sizes.", right: "These tools are explicitly targeted MORE toward larger and international banks — smaller local banks are not expected to apply the same intensity, though some use may still be relevant." },
    { wrong: "This reading includes calculation-heavy, quantitative exam questions similar to R98.", right: "This reading is explicitly 'general in nature' per its own Exam Focus — expect principle-identification and matching questions instead of calculation." }
  ],

  highYield: [
    { stars: 4, what: "Three lines of defense for climate risk.", why: "1st = point-of-origination assessment (new clients, credit, products); 2nd = independent risk department challenge; 3rd = internal audit reviewing BOTH lines PLUS data quality." },
    { stars: 4, what: "Concentration risk is the crucial risk type.", why: "Explicitly named as the risk type most crucially tied to climate risk in the risk appetite framework (sector/industry/geography/counterparty)." },
    { stars: 3, what: "Credit risk mitigation tools for climate exposure.", why: "Shorter-term loans, lower lending amounts, tighter underwriting, greater collateral, explicit sector/geography limits — long-term lending is NOT one of them (it increases risk)." },
    { stars: 3, what: "Stress testing vs. sensitivity analysis for supervisors.", why: "Supervisors use stress testing (not sensitivity analysis) to test financial-position sufficiency under severe-but-plausible scenarios; scenario analysis/stress testing scale up with bank size and international footprint." },
    { stars: 3, what: "18 total principles, grouped.", why: "12 bank + 6 supervisor; rough grouping: governance/controls 1-4, capital/liquidity/risk mgmt 5-6, monitoring/risk-type/scenario 7-12, supervisor bank-assessment 13-15, supervisor own-tools 16-18." },
    { stars: 2, what: "Principle 12 scenario analysis must stay dynamic.", why: "Must be continuously revised (not static) given how fast climate science changes." }
  ],

  recall: [
    { q: "What are the three lines of defense for climate-related financial risk, and what does each cover?", a: "First line: point-of-origination risk assessment by client-facing/credit staff. Second line: the bank's risk department, operating independently, challenging the first line's analysis. Third line: internal audit — reviews both the first and second lines AND considers data quality." },
    { q: "Which risk type is described as most crucially associated with climate-related financial risk within a bank's risk appetite framework?", a: "Concentration risk — by sector, industry, geography, and counterparty." },
    { q: "Is engaging in longer-term lending an effective way to mitigate climate-related credit risk?", a: "No — it is the LEAST effective (or even counterproductive) action; shorter-term loans, tighter underwriting, lower lending amounts, and greater collateral requirements are the effective tools." },
    { q: "Should supervisors insist that all climate risk assessment work be done purely in-house by banks?", a: "No — outsourcing specialist work is acceptable, provided supervisors retain sufficient knowledge to interpret the outsourced analysis." },
    { q: "What tool does Principle 18 specify for assessing a bank's financial position sufficiency under a severe-but-plausible climate scenario?", a: "Stress testing (not sensitivity analysis)." },
    { q: "Are scenario analysis and climate stress testing expected to be applied equally to small local banks and large international banks?", a: "No — these tools are explicitly targeted more toward larger and international banks; smaller banks may still use some elements but with less intensity." },
    { q: "Why must climate scenario analysis (Principle 12) avoid being static?", a: "Because climate science and related risk factors are constantly and frequently changing, so scenarios must be continuously revised to remain relevant." }
  ],

  hooks: [
    { title: "Three lines", text: "1st line does it, 2nd line independently checks it, 3rd line audits both lines PLUS the data feeding them." },
    { title: "18 = 12 + 6", text: "12 bank principles + 6 supervisor principles — think 'banks build it, supervisors grade it, then supervisors build their own toolkit.'" },
    { title: "Concentration's disguise", text: "Concentration risk is climate risk's favorite disguise — sector, geography, counterparty clustering is where climate losses actually concentrate." },
    { title: "Longer ≠ safer", text: "Longer loans ≠ safer loans when climate risk is the concern — shorter maturities are the credit-risk lever here, the opposite of normal intuition about 'locking in' good terms." }
  ],

  summary: "This reading completes the climate-risk trilogy (drivers → measurement → governance) with the Basel Committee's 18 principles: 12 for banks covering governance (Principles 1-4, including the three lines of defense), capital/liquidity adequacy and risk management process (5-6, with concentration risk flagged as most crucial), monitoring/reporting and risk-type-specific management across credit/market/liquidity/operational risk (7-11), and scenario analysis (12, sized to the bank and continuously updated) — plus 6 for supervisors, split between assessing banks' own governance/risk-management/risk-type coverage (13-15) and building supervisors' own capacity, tools, and scenario/stress-testing powers scaled toward larger and international banks (16-18). The material is explicitly 'general in nature,' so the exam favors identification and matching questions (which principle covers X, which line of defense does Y) over calculation."
});
