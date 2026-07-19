export default ({
  book: 4, reading: 73,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Contingency Funding Planning",
  tagline: "The contingency funding plan (CFP) is the 'what do we actually do' document that liquidity stress testing feeds into. Five design considerations, then the CFP's five operating components.",

  teaches: `<p>Five CFP design considerations and five CFP components (governance, scenarios, contingent actions, monitoring/escalation, reporting).</p>`,

  why: `<p>A stress test tells you WHERE the gap would be; a CFP tells you WHAT TO DO about it. Without an actionable playbook, all the stress-testing sophistication in R71-72 is analysis without a plan.</p>`,

  intuition: `<p>The CFP must be an OPERATIONAL, ACTIONABLE, FLEXIBLE playbook — not a binder that sits on a shelf. Its scenarios must be CONSISTENT with the liquidity stress test scenarios (R71), and its contingent actions must be SIZED to the shortfall's amount, timing, and expected inflow — the nature (systemic vs. idiosyncratic) and magnitude of the stress determine which actions are actually viable.</p>
  <p>Think of a <strong>contingency funding plan (CFP)</strong> as a firm's playbook for a specific class of event: a <strong>contingent liquidity event</strong> that is high-severity but low-frequency (as opposed to the low-severity, high-frequency dips in liquidity a treasury desk absorbs every week without escalating anything). A stress test (R71-72) is a modeling exercise — it estimates how big a funding gap would open up under a given scenario, and by when. The CFP is the separate, pre-written document that says, concretely: given a gap of this size, arriving this fast, who decides what to do, what specific actions do we take, in what order, and who do we tell? Liquidity risk measures the firm already tracks in normal times (like the funding ratios and EWIs from R65) form the baseline the CFP's escalation triggers are built on — so the CFP is not invented from scratch in a crisis; it is wired directly into machinery the firm already runs day to day.</p>`,

  eli5: `<p>Think of a CFP the way you'd think of the fire escape plan taped inside a hotel room door. The hotel's fire-safety inspection (like the liquidity stress test) tells the building where the fire risk is worst and how fast smoke would spread from a given room. But the plan on the door is a different document: it tells you, in that specific moment, which stairwell to use, who to call, and what NOT to do (never take the elevator). A fire-safety report that never gets translated into "turn left, use stairwell B" is useless when the alarm actually goes off — and a fire plan that only lists one exit, assuming every other guest can use the other exits at the same time, fails exactly when the whole floor tries to evacuate together. That "everyone needs the same exit at once" case is the CFP's systemic-crisis problem: an escape route (contingent action) that works fine for one room's fire may not work when the whole building is on fire and every other guest wants the same stairwell.</p>`,

  thinkLike: `<p>A liquidity risk manager reading a CFP does not ask "does this document look thorough?" — a CFP can be beautifully written and completely useless if it was never rehearsed. The manager asks three operational questions instead: (1) <em>Is it actionable right now?</em> Could the liquidity crisis team actually execute page 12 at 2am on a Friday, or does it assume systems/approvals that don't exist yet? (2) <em>Are the numbers consistent?</em> Do the CFP's stress scenarios match the scenarios the firm's own liquidity stress test (R71) already produced — because if they diverge, the CFP is solving a different problem than the one stress testing identified. (3) <em>Is each contingent action still viable under THIS crisis's nature?</em> An action like "sell unencumbered securities to healthy counterparties" only works if there are healthy counterparties with balance sheet room — which is exactly the assumption that breaks in a systemic crisis, when every institution wants to sell the same assets and borrow from the same lenders at once.</p>
  <p>On the exam, this reading is tested less on memorizing the list of contingent actions verbatim, and more on this systemic-vs-idiosyncratic reasoning: given a scenario, can you identify which contingent actions from the list would fail, and why (because they rely on some other party being fine when the whole system is not)? Expect scenario questions that hand you an escalation level (1, 2, or 3) and ask what the firm should be focused on at that stage, and questions that test the four governance roles by describing an action ("presents the plan to the management committee for approval") and asking which role does it.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Five CFP design considerations",
      def: "Alignment to the firm's business/risk profile; integration with broader risk management frameworks; an operational, actionable, flexible playbook (not a binder that sits on a shelf); inclusive of appropriate stakeholders; supported by a communication plan.",
      intuition: "Each of these is really answering a different way a CFP quietly fails in practice: written for the wrong business (alignment), disconnected from the firm's other risk programs (integration), too rigid or too vague to actually execute (operational/actionable/flexible), missing the people who'd need to act on it (stakeholders), or leaving the firm with no way to tell customers/regulators/counterparties what's happening (communication).",
      example: "Alignment: a CFP for a bank with large foreign-currency deposits must include FX-specific EWIs and triggers, not just domestic-currency ones, because the firm's actual business mix (geographic coverage, asset classes, currencies) is what the plan has to match. Integration: the CFP is folded into the firm's liquidity risk management, enterprise risk management (ERM), capital management, and business continuity/crisis management programs, so it works through the firm's existing internal control system rather than as a freestanding document nobody else touches.",
      pitfall: "Treating these as a one-time checklist at CFP creation rather than a live process — the source is explicit that the CFP must be updated for internal changes (new products, new strategy) and external changes (the general economy), and should sit inside the firm's strategic planning process so it stays forward-looking rather than becoming stale.",
      related: [],
      memory: "ABOIS-ish mnemonic: Aligned, Broader-integrated, Operational/actionable/flexible, Inclusive of stakeholders, Supported by communication."
    },
    {
      name: "Five CFP components",
      def: "Governance and oversight: corporate treasury, liquidity crisis team, management committee, board of directors — regularly tested at intervals for readiness. Scenarios and liquidity gap analysis: must be consistent with the liquidity stress test scenarios and link to recovery provisions. Contingent actions: sized to the shortfall's amount, timing, and expected inflow — nature (systemic/idiosyncratic) and magnitude of the stress determine which actions are viable. Monitoring and escalation: builds on EWIs (market/business measures + liquidity health measures), with three escalation levels. Data and reporting: often daily during stress, covering both current and required coverage of future liabilities/outflows.",
      intuition: "Read these five components as answering, in order: WHO decides (governance), WHAT scenario are we planning for (scenarios/gap analysis), WHAT do we actually do about it (contingent actions), WHEN do we escalate and to whom (monitoring/escalation), and HOW do we know it's working as we go (data/reporting). A CFP missing any one of these is missing a different failure mode — e.g. great contingent actions with no escalation triggers means nobody knows when to pull them.",
      example: "Governance has four specific roles, each with a distinct job. Corporate treasury has day-to-day oversight of the firm's risk, funding, and liquidity in normal times, and is the party that — based on macro/micro conditions and stress-test results — decides to activate the CFP and pull in the liquidity crisis team (LCT). The LCT (made up of executives, business-unit leaders, and senior management) is the team that actually engineers the CFP's response and presents it to the management committee for approval; it also owns communication and coordination with internal and external stakeholders, and ongoing monitoring of the firm's liquidity. The management committee (senior management) manages the LCT during the crisis itself, liaises with the board, and approves recommendations for implementation. The board of directors provides top-level leadership to the LCT and management committee during a crisis; board members who understand the CFP well are the ones best able to advise the management committee on implementation. Documentation typically has five sections: introduction (purpose, related policies), governance (roles/approval), stress testing and scenarios overview, monitoring and escalation (gap analysis, contingent actions), and reporting (frequency). Readiness is not assumed — the source calls for testing key parts of the CFP at regular intervals, including simulated exercises of liquidity-generating activities like issuing debt or selling securities from the investment portfolio, specifically to uncover weaknesses before a real crisis does.",
      pitfall: "Assuming the same contingent action is equally usable at any point in a crisis. The source notes that taking a visible defensive action (e.g., cutting lending, pulling back from riskier counterparties) can itself send a signal that the firm is weakened, which can make later contingent actions harder to execute — so some actions are deliberately deferred to later stages of the crisis even though they'd help liquidity today, to avoid worsening the firm's position over the medium term.",
      related: [{ r: 65, label: "R65 — the EWI framework this monitoring component builds on" }],
      memory: "Governance (who), scenarios (what's tested), contingent actions (what we do, sized to the gap), monitoring/escalation (three levels), reporting (daily under stress)."
    }
  ],

  connections: {
    from: [
      { r: 71, why: "The CFP's scenarios must be directly consistent with the liquidity stress test scenarios built there." },
      { r: 65, why: "The CFP's monitoring/escalation component builds directly on the EWI framework." }
    ],
    to: [
      { r: 74, why: "Deposit and nondeposit liability management are among the concrete funding actions a CFP might specify." }
    ],
    confused: [
      { what: "Systemic vs idiosyncratic contingent actions", how: "Idiosyncratic-crisis actions (e.g., selling assets to unaffected counterparties) may be unavailable in a SYSTEMIC crisis, where everyone needs the same actions at once — the viable action set depends on the crisis TYPE, not just its size." },
      { what: "CFP escalation Levels 1/2/3", how: "Level 1: heightened oversight (market conditions watched more closely, mostly forward-looking measures and internal/external coordination). Level 2: clear negative business/liquidity impact — detailed analysis of why liquidity is deteriorating, close attention to how competitors/counterparties are reacting, and active liquidity-raising steps like cutting lending or selling less-liquid/longer-term assets. Level 3: survival/going-concern focus — by this point the firm has already taken significant liquidity-raising actions and is focused on staying alive as an institution." }
    ]
  },

  misconceptions: [
    { wrong: "\"A CFP should be a comprehensive, static reference document maintained primarily for regulatory compliance.\"", right: "A CFP must be an OPERATIONAL, ACTIONABLE, FLEXIBLE playbook — explicitly NOT a binder that sits on a shelf. It needs to be regularly tested for actual readiness, not just maintained as a compliance artifact." },
    { wrong: "\"The same contingent actions work regardless of whether a liquidity crisis is systemic or idiosyncratic.\"", right: "The nature (systemic vs. idiosyncratic) and magnitude of the stress determine which contingent actions are actually VIABLE — an action that works in an idiosyncratic crisis (e.g., borrowing from unaffected peers) may be unavailable in a systemic crisis where everyone needs the same resource simultaneously." },
    { wrong: "\"CFPs exist to manage the routine, everyday ups and downs in a firm's funding needs.\"", right: "CFPs are specifically for high-severity, low-frequency contingent liquidity events — the rare, big shocks — not the low-severity, high-frequency fluctuations a treasury desk handles as part of normal operations without ever activating a crisis plan." },
    { wrong: "\"A firm should always take every available contingent action as early as possible to shore up liquidity.\"", right: "Acting too visibly too early (e.g., sharply cutting lending or pulling back from riskier counterparties) can itself signal weakness to the market, which can make later, larger contingent actions harder or more costly to execute — some actions are deliberately held back for later stages of the crisis." }
  ],

  highYield: [
    { stars: 4, what: "Contingent actions must be sized to the shortfall and viable given the crisis's nature (systemic vs idiosyncratic).", why: "The core conceptual nuance of the CFP's contingent-actions component." },
    { stars: 3, what: "Three escalation levels (1: heightened oversight, 2: negative impact, 3: survival focus).", why: "A clean three-tier framework, good for quick recall." },
    { stars: 3, what: "The four governance roles — corporate treasury, liquidity crisis team (LCT), management committee, board of directors — and which one does what.", why: "Exam questions frequently describe an action (e.g., 'engineers the CFP and presents it for approval') and ask you to name the role; this is directly testable and easy to mix up under time pressure." },
    { stars: 2, what: "Five CFP design considerations and five components.", why: "Foundational structural recall." },
    { stars: 2, what: "EWIs split into market/business measures (broad, macro/micro) and liquidity health measures (focused, ratio-based).", why: "This split mirrors the EWI framework from R65 and is a common source of quiz distractors that swap the two categories' examples." }
  ],

  recall: [
    { q: "A bank's CFP specifies 'sell unencumbered securities to raise cash' as a Level 2 contingent action. Why might this action fail during a systemic crisis, even though it worked in a past idiosyncratic stress event?", a: "In a systemic crisis, MANY institutions face the same pressure simultaneously and may all be trying to sell similar securities at the same time — market depth and liquidity for those securities can evaporate exactly when everyone needs to sell, unlike an idiosyncratic crisis where the bank's own problem doesn't affect the broader market's capacity to absorb its asset sales." },
    { q: "Why must a CFP's scenarios be consistent with the liquidity stress test's scenarios rather than developed independently?", a: "The CFP is the action plan for WHAT TO DO when a liquidity gap identified by stress testing actually materializes — if the CFP's scenarios don't match the stress test's scenarios, the contingent actions might be sized for or triggered by the wrong circumstances, leaving a real gap between what stress testing identifies as a risk and what the CFP is actually prepared to respond to." },
    { q: "Which of the four CFP governance roles engineers the plan itself and presents it to the management committee for approval, and what is that role made up of?", a: "The liquidity crisis team (LCT), typically composed of executives, business-unit leaders, and other senior management; it also handles internal/external communication and coordination and ongoing monitoring of the firm's liquidity, while corporate treasury is the party that decides to activate the CFP in the first place based on macro/micro conditions and stress-test results." },
    { q: "A firm considers cutting lending sharply and pulling back from riskier counterparties very early in a liquidity stress event, purely to shore up its own liquidity position immediately. What secondary risk does the source flag with acting this way, and why might some contingent actions instead be deferred to later in the crisis?", a: "Visible defensive actions taken early can themselves signal to the market that the firm is financially weakened, which can reduce the firm's ability to execute other contingent actions later (counterparties become warier, funding gets harder or costlier to secure) — so a firm should weigh the message an action sends, and may deliberately defer some actions to later stages of the crisis even if they would help short-term liquidity now, because doing so early could worsen the medium-term liquidity crunch." }
  ],

  hooks: [
    { title: "Not a binder on a shelf", text: "A CFP that just sits in a drawer, dusted off for the auditor once a year, is worthless — it has to be a living, regularly-tested playbook people can actually execute under pressure." },
    { title: "The hotel fire-escape plan", text: "The stress test is the fire-safety inspection report; the CFP is the plan taped to the back of the door. One diagnoses the risk, the other tells you which stairwell to use right now — and it fails exactly when every guest on the floor needs the same stairwell at once." }
  ],

  breakdown: [
    {
      title: "The five CFP design considerations",
      points: [
        "Alignment to the firm's business and risk profile — the CFP must reflect the firm's actual business activities, products, asset classes, geographies and FX exposure, with EWIs, limits, and escalation levels tied to the firm's risk appetite statement, and must be updated as internal strategy/products and external conditions (the economy) change.",
        "Integration with broader risk management frameworks — the CFP should be embedded in the firm's liquidity risk management, ERM, capital management, and business continuity/crisis management programs so it works within the firm's existing internal control system rather than standing alone.",
        "An operational, actionable, flexible playbook — ready to deploy quickly, presenting numerous stress scenarios each with tied EWIs, triggers, and contingency actions by severity level, while staying flexible enough to allow sound judgment calls for scenarios that weren't explicitly anticipated.",
        "Inclusive of appropriate stakeholder groups — management committees, business units, corporate treasury, risk management, and technology should all be involved, both for operational readiness and to surface and fix problems with the plan through open discussion.",
        "Supported by a communication plan — a structured, efficient way to disseminate information to stakeholders (especially external ones) during a crisis, to preserve confidence and the firm's reputation and act as a form of damage control."
      ]
    },
    {
      title: "The five CFP components",
      points: [
        "Governance and oversight — the four roles (corporate treasury, liquidity crisis team, management committee, board of directors), documentation structure, and regular testing/readiness assessment of the plan.",
        "Scenarios and liquidity gap analysis — CFP stress scenarios must be consistent with the firm's liquidity stress-testing scenarios and link to recovery provisions, though the CFP can also examine additional, less-likely scenarios beyond the stress test's normal scope.",
        "Contingent actions — the specific funding and capital moves the firm can pursue once a gap is identified, sized to the shortfall's amount, timing, and expected inflow, with viability depending on whether the stress is systemic and/or idiosyncratic.",
        "Monitoring and escalation — built on EWIs (market/business measures and liquidity health measures) and a three-level escalation ladder that governs how oversight and response intensify as conditions worsen.",
        "Data and reporting — reporting frequency often increases to daily during stress, and must cover both quantitative liquidity numbers and qualitative context, including intraday positions, contingent liabilities, and funding-source usage."
      ]
    },
    {
      title: "The four CFP governance roles",
      points: [
        "Corporate treasury — has day-to-day oversight of the firm's risk, funding, and liquidity in normal times; based on macro/micro analysis and stress-test results, decides when to activate the CFP and pull in the liquidity crisis team.",
        "Liquidity crisis team (LCT) — executives, business-unit leaders, and senior management who engineer the CFP's response and present it to the management committee for approval; own internal/external communication and coordination and ongoing liquidity monitoring, and make implementation suggestions alongside treasury and the management committee.",
        "Management committee — senior management who manage the LCT during the crisis, liaise with the board of directors, and approve recommendations for CFP implementation.",
        "Board of directors — provides leadership to the LCT and management committee during a crisis; board members well-versed in the CFP are best positioned to advise the management committee on implementation."
      ]
    },
    {
      title: "Example contingent actions (illustrative, not exhaustive)",
      points: [
        "Keep committed credit lines available that carry few borrowing restrictions and attractive rates, so they can be drawn quickly.",
        "Reduce lending activity, e.g. by tightening underwriting standards, to slow the growth of assets that need funding.",
        "Offer higher rates on deposits to attract more deposit funding from customers.",
        "Choose not to reinvest maturing securities, letting the portfolio run off into cash instead.",
        "Shift the funding mix from more short-term toward more long-term sources, reducing rollover risk.",
        "Increase securitization activity to convert loans into cash.",
        "Dispose of liquid assets outright to raise cash.",
        "Issue subordinated debt to raise longer-term funding.",
        "Issue callable loans, which give the lender flexibility to recall funds.",
        "Sell receivables such as loans or credit-card balances.",
        "Dispose of entire business units to raise capital/liquidity.",
        "Lower capital distributions (e.g., dividends, buybacks) to preserve cash.",
        "Implement cost-cutting measures to reduce cash outflows."
      ]
    },
    {
      title: "Factors that can reduce a firm's ability to take contingent actions",
      points: [
        "Closure of securitization markets, removing that funding channel.",
        "Reduced access to repo funding.",
        "Credit downgrades combined with higher required collateral deposits.",
        "Counterparties engaging in harmful margin and collateral behavior (demanding more, faster).",
        "Custodian banks mandating higher cash deposits.",
        "Higher funding costs across the board.",
        "Funding no longer being rolled over by counterparties when it matures.",
        "Deposit run-off, as customers withdraw funds."
      ]
    },
    {
      title: "Escalation levels (monitoring and escalation)",
      points: [
        "Level 1 — heightened oversight: greater management attention to market conditions and their effect on operating results, focused mainly on forward-looking liquidity measures and the market's view of the firm; requires strong internal coordination/communication and keeping external stakeholders apprised; reporting is relatively light (occasional updates).",
        "Level 2 — clear negative impact: systemic and/or idiosyncratic events are visibly hurting the firm's business and liquidity; detailed analysis of current liquidity and the causes of deterioration, with close attention to how competitors and counterparties are responding; focus shifts to the very near future and active liquidity-raising steps (e.g., reducing lending, selling less liquid or longer-term assets); more drastic actions may need management/board approval.",
        "Level 3 — survival / going concern: by this stage the firm has already taken significant liquidity-raising actions during the stress event, and the focus is squarely on the firm's survival as a going concern."
      ]
    },
    {
      title: "Two categories of early warning indicators (EWIs) the CFP monitors",
      points: [
        "Market and business measures — broad macro/micro indicators such as a large sudden decline in stock indices, sovereign or firm credit downgrades, a surge in market volatility, sudden catastrophic events, an accelerated rise in assets financed by unstable liabilities, negative publicity, deteriorating asset quality, falling earnings/earnings projections, loans being withdrawn or not renewed, wider CDS/debt spreads, higher required collateral, counterparties avoiding unsecured or long-term transactions with the firm, and deposit run-off.",
        "Liquidity health measures — narrower, ratio-based indicators that directly reflect the firm's liquidity strength: projected net funding requirements vs. current unused funding capacity; non-core funding to long-term assets; overnight borrowings to total assets; short-term liabilities to total assets; funding-source concentration; funding maturity profile; used capacity to total borrowing capacity; liquid assets to volatile liabilities; unpledged eligible collateral to total assets; and loans to commitments."
      ]
    }
  ],

  quiz: [
    {
      q: "What best distinguishes the events a CFP is designed for from the liquidity fluctuations a treasury desk handles in normal operations?",
      options: [
        "CFPs address low-severity, high-frequency liquidity events",
        "CFPs address high-severity, low-frequency contingent liquidity events",
        "CFPs address only idiosyncratic events, never systemic ones",
        "CFPs replace the need for day-to-day treasury liquidity management"
      ],
      answer: 1,
      why: "The source is explicit: contingent liquidity events range from low-severity/high-frequency to high-severity/low-frequency, and CFPs exist for the latter. The 'low-severity, high-frequency' answer describes exactly the routine fluctuations a CFP is NOT built for. The 'idiosyncratic only' answer is wrong because contingent actions must be evaluated for viability under both systemic and idiosyncratic stress, not restricted to one. The 'replaces day-to-day treasury management' answer is wrong because normal-time liquidity measures remain the baseline the CFP's EWIs build on — the CFP doesn't replace ongoing treasury management, it activates alongside it in a crisis."
    },
    {
      q: "Which CFP governance role is responsible for engineering the plan's crisis response and presenting it to the management committee for approval?",
      options: [
        "Corporate treasury",
        "The board of directors",
        "The liquidity crisis team (LCT)",
        "External auditors"
      ],
      answer: 2,
      why: "The LCT (made up of executives, business-unit leaders, and senior management) engineers the CFP and presents it to the management committee for approval, and also owns communication/coordination and ongoing liquidity monitoring. The corporate treasury answer describes oversight in normal times and deciding when to activate the CFP/LCT — it doesn't itself engineer the response. The board of directors answer provides leadership and advises the management committee but doesn't draft the plan. External auditors aren't one of the four defined CFP governance roles at all."
    },
    {
      q: "A bank's CFP lists 'sell unencumbered securities to healthy counterparties' as a viable contingent action based on past experience during an idiosyncratic stress event at the bank. Why might this specific action be far less effective during a systemic liquidity crisis?",
      options: [
        "Systemic crises are always shorter in duration, so there's no time to sell assets",
        "Regulators prohibit asset sales during systemic crises",
        "In a systemic crisis many institutions may try to sell similar assets simultaneously, so market depth to absorb the sales can evaporate exactly when it's needed",
        "Unencumbered securities cease to exist once a crisis is declared systemic"
      ],
      answer: 2,
      why: "The core systemic-vs-idiosyncratic lesson: in a systemic event, the market-wide demand for the same liquidity-raising action collapses the very market depth the action depends on, whereas an idiosyncratic crisis leaves the broader market's capacity to absorb the bank's sales intact. The 'shorter duration', 'regulatory prohibition', and 'securities cease to exist' answers are not supported by the source and are not real mechanisms — duration isn't the driver, there's no blanket regulatory prohibition described, and the securities don't disappear."
    },
    {
      q: "At which CFP escalation level does the source say the firm's focus shifts specifically to surviving and remaining a going concern, after significant liquidity-raising actions have already been taken?",
      options: [
        "Level 1",
        "Level 2",
        "Level 3",
        "There is no distinct survival-focused level; all three levels have the same focus"
      ],
      answer: 2,
      why: "Level 3 is explicitly the survival/going-concern level, reached after the firm has already undertaken significant liquidity-raising activity. Level 1 is heightened oversight of market conditions (a much earlier, lighter-touch stage), and Level 2 involves detailed analysis of deteriorating liquidity and active liquidity-raising steps but is not yet framed as an existential/survival stage. The 'no distinct survival level' answer is wrong because the three levels are explicitly differentiated by severity and focus."
    },
    {
      q: "Which pair correctly groups an early warning indicator (EWI) under the CFP's two EWI categories: market/business measures vs. liquidity health measures?",
      options: [
        "Large sudden decline in stock market indices → liquidity health measure; unpledged eligible collateral to total assets → market/business measure",
        "Large sudden decline in stock market indices → market/business measure; unpledged eligible collateral to total assets → liquidity health measure",
        "Both are liquidity health measures, since both relate to liquidity",
        "Both are market and business measures, since both are indicators of stress"
      ],
      answer: 1,
      why: "Market and business measures are the broad macro/micro indicators (like stock index declines, credit downgrades, market volatility surges); liquidity health measures are the narrower, ratio-based indicators that directly reflect the firm's own liquidity strength (like unpledged eligible collateral to total assets). The reversed-pairing answer has the categories backwards. The 'both liquidity health measures' and 'both market and business measures' answers each collapse a deliberate two-category distinction the source draws specifically to separate broad market signals from firm-specific liquidity ratios."
    },
    {
      q: "A firm facing early liquidity stress considers sharply cutting lending and pulling back from riskier counterparties immediately, purely to conserve cash. What risk does the source associate with taking this action too visibly, too early?",
      options: [
        "It has no downside — every contingent action should be taken as early as possible",
        "It can signal to the market that the firm is financially weakened, potentially making later contingent actions harder or costlier to execute",
        "It automatically triggers Level 3 escalation regardless of the firm's actual liquidity position",
        "It is illegal under most banking regulations to reduce lending during a liquidity event"
      ],
      answer: 1,
      why: "The source explicitly warns that visible defensive actions can send a signal of weakness to customers, lenders, and counterparties, which can undermine the firm's ability to execute contingent actions later — this is why some actions are deliberately deferred to later stages of a crisis even though they'd help short-term liquidity now. The 'no downside' answer ignores this explicit tradeoff. The 'automatically triggers Level 3' answer conflates a business decision with escalation-level mechanics, which are governed by EWIs/triggers, not by a single action taken. The 'illegal' answer is not supported by the source, which frames this as a strategic/signaling risk, not a legal prohibition."
    }
  ],

  sources: [
    { title: "Contingency Funding Plan — Wikipedia", url: "https://en.wikipedia.org/wiki/Contingency_funding_plan", note: "Background on what a CFP is and why regulators expect banks to maintain one." },
    { title: "Liquidity Risk — Investopedia", url: "https://www.investopedia.com/terms/l/liquidityrisk.asp", note: "Plain-language refresher on liquidity risk generally, the risk category a CFP is designed to manage in extreme scenarios." },
    { title: "Federal Reserve — Supervisory guidance on liquidity risk management", url: "https://www.federalreserve.gov/supervisionreg/topics/liquidity_risk.htm", note: "U.S. regulatory framing of contingency funding plans and liquidity stress testing expectations for banks." },
    { title: "BIS — Basel Committee principles for sound liquidity risk management", url: "https://www.bis.org/publ/bcbs144.htm", note: "The Basel Committee's foundational principles document, which discusses contingency funding planning as part of sound liquidity risk management." }
  ],

  pdf: { book: 4, query: "Contingency funding plans (CFPs) use the results of liquidity stress testing" },

  summary: `<p><strong>Five design considerations</strong>: business/risk alignment, integration with broader risk frameworks, operational/actionable/flexible (not shelf-bound), stakeholder inclusion, communication plan. <strong>Five components</strong>: governance (treasury, crisis team, committee, board — regularly tested), scenarios (consistent with stress test, linked to recovery), contingent actions (sized to shortfall, viability depends on systemic vs. idiosyncratic nature), monitoring/escalation (EWI-based, 3 levels: oversight→impact→survival), data/reporting (often daily under stress).</p>`
});
