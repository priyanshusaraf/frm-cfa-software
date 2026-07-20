export default ({
  book: 2, reading: 18,
  session: "Credit Risk Analysis",
  title: "Governance",
  tagline: "If R17 defines the disease, this reading is the bank's immune system: who is allowed to take credit risk, who checks their work, and who can stop them.",

  teaches: `<p>The <strong>three lines of defense</strong> is the organizing skeleton of this entire reading. Memorize it cold: it is GARP's favorite governance framework across multiple FRM topics, not just credit risk.</p><p>You also learn the <strong>four GSLO pillars</strong> of good governance (Guidelines, Skills, Limits, Oversight), the three processes that actually generate credit risk in the first place (origination, assessment, approval), the three parameters that describe any credit-sensitive transaction (exposure amount, credit quality, tenor), and the role of the <strong>credit committee</strong> that approves the biggest, riskiest deals.</p>`,

  why: `<p>Every risk framework in the curriculum — credit, market, operational — eventually asks "who's accountable, and who checks them?" Getting this organizational skeleton right here means you recognize it instantly when it resurfaces in operational risk governance (Book 3) and model risk management.</p><p>It also matters in the real world. Nearly every major bank blow-up in history (Barings, JPMorgan's "London Whale," Wells Fargo's fake-accounts scandal) traces back to one of these lines failing: a risk manager who was really a business partner in disguise, an audit function that never actually checked, or guidelines so vague nobody could be held to them.</p>`,

  intuition: `<p>Think of a bank's risk governance as a court system. The <strong>business owners (1st line)</strong> are the ones taking action: originating loans, pricing trades, deciding who to lend to. <strong>Risk management/compliance (2nd line)</strong> is the judge watching for rule violations in real time, setting the limits and checking every deal against them before and while it happens. <strong>Internal audit (3rd line)</strong> is the appeals court: it shows up after the fact and checks whether the judge and the actors both did their jobs properly, independent of both.</p><p>The reason this three-way split exists at all is a simple conflict-of-interest problem. The people who are paid to originate business (1st line) have every incentive to say yes to more, bigger, riskier deals, so you cannot let them also be the ones deciding whether those deals are safe. Someone independent of the P&L has to hold the line. That is the entire reason the 2nd line exists as a separate reporting chain from the business.</p>`,

  eli5: `<div><p>Imagine a restaurant kitchen. The <strong>line cooks (1st line)</strong> want to get orders out fast. That is their whole job, and their bonus depends on how many tables turn over. If they were also in charge of food-safety inspection, they would rush past an undercooked chicken breast to keep the line moving. So the restaurant has a separate <strong>health inspector (2nd line)</strong> who checks temperatures in real time, has the authority to send a dish back, and — crucially — gets paid a flat salary that has nothing to do with how many meals go out the door, so they have no incentive to look the other way.</p><p>Once a month, a <strong>corporate auditor (3rd line)</strong> who doesn't even work at this restaurant shows up, reviews the inspector's logs, samples some dishes, and checks whether the inspector has actually been doing the job: not cooking, not inspecting food in the moment, just verifying the whole system worked.</p><p>Mapped to finance: the line cooks are the bank's business owners who originate and price credit deals, the health inspector is risk management setting and monitoring limits with pay delinked from the desk's profits, and the corporate auditor is internal audit providing independent after-the-fact assurance.</p></div>`,

  thinkLike: `<div><p>A risk manager sitting in the 2nd line does not think "how do I stop deals." They think "how do I make sure every deal that gets approved has gone through a process proportional to its risk." That means asking three questions about any transaction: how big is the exposure, how creditworthy is the counterparty, and how long is the money at risk (tenor)? The higher any of those three, the higher up the approval chain the deal has to climb. A small, short, high-quality-counterparty trade might get approved by one desk head, while a large, long-dated, lower-rated exposure has to go all the way to the credit committee. A practitioner also treats compensation structure as the tell: if you ever see a risk manager's bonus tied to the desk's P&L, that is an immediate governance red flag, full stop, regardless of how good that risk manager's judgment might be.</p><p>GARP tends to test this reading in two ways. First, scenario questions that describe a reporting line or compensation structure and ask you to spot which pillar (usually Oversight) is violated. The tell is always some link between the risk manager's pay or reporting line and the business unit's success. Second, "which line of defense" classification questions that hinge on timing: 2nd line acts <em>during</em> the transaction (pre-trade checks, ongoing limit monitoring), 3rd line acts <em>after</em> the fact and checks the first two lines, not the transactions themselves.</p></div>`,

  visual: "",

  formulas: [],

  breakdown: [
    {
      title: "The three lines of defense",
      points: [
        "1st line — business owners: originate, price, and manage credit risk day to day; they own the risk they create.",
        "2nd line — enterprise risk management, compliance, and legal: independently monitor and oversee the 1st line's risk-taking, and establish the guidelines, policies, and limits everyone else must operate within.",
        "3rd line — internal and external auditors and audit committees: provide independent assurance, after the fact, that both the 1st and 2nd lines are actually functioning as designed."
      ]
    },
    {
      title: "The four GSLO pillars of good governance",
      points: [
        "Guidelines — written credit policies (risk standards) defining how transactions must be conducted; must be understandable, concise, precise, and accessible, and are owned/maintained by the CRO's office.",
        "Skills — authority is delegated only to people with the proper expertise; delegation runs in two steps: (1) assign risk parameters (exposure, credit quality, tenor) to the transaction, then (2) route it to the approval level matched to that risk.",
        "Limits — the maximum acceptable dollar loss (a credit line), set at the aggregate organization level and cascaded down into smaller limits for individual counterparties, sectors, industries, or countries.",
        "Oversight — risk management must be organizationally independent from the profit center it monitors (independence), staffed by qualified people (qualifications), close enough to the business to understand it (closeness), and willing to hear dissenting views (open-mindedness) — with compensation always delinked from the business unit's P&L."
      ]
    },
    {
      title: "The three processes that generate credit risk",
      points: [
        "Credit origination — the point at which a new exposure is created; originators are incentivized by volume and margin, which can push them toward riskier deals if unchecked.",
        "Credit risk assessment — the independent evaluation of how risky a proposed transaction actually is, before it is approved.",
        "Credit approval — the formal sign-off, at a level proportional to the transaction's risk, that allows the exposure to be booked."
      ]
    },
    {
      title: "The three parameters of any credit-sensitive transaction",
      points: [
        "Amount of exposure — how much the organization stands to lose; the raw dollar size of the position.",
        "Credit quality — the creditworthiness of the counterparty, i.e. how likely they are to default.",
        "Tenor (length of exposure) — how long the organization remains exposed until the counterparty's obligation is due; longer tenor means more time for things to go wrong."
      ]
    },
    {
      title: "What guidelines must be (four traits)",
      points: [
        "Understandable — written in plain language, avoiding legal jargon and unnecessary complexity.",
        "Concise — reasonably short; nobody reads a 300-page policy document in practice.",
        "Precise — specific enough to include real-life scenarios and remove ambiguity about how to handle a given situation, even while staying short.",
        "Accessible — easy to find, ideally summarized in a 1–2 page document on the company intranet, not buried in a legal repository."
      ]
    }
  ],

  concepts: [
    {
      name: "Three lines of defense",
      def: "1st line — business owners: own and manage risk day to day (originate, price, monitor). 2nd line — enterprise risk management/compliance/legal: independent monitoring and oversight, sets guidelines and limits, oversees the 1st line. 3rd line — internal and external auditors and audit committees: independent assurance that lines 1 and 2 are actually working.",
      intuition: "It is a chain of separated incentives: whoever creates the risk (1st line) cannot be the one who checks it, and whoever checks it in real time (2nd line) cannot be the one who audits whether the checking itself worked (3rd line). Each layer exists to catch what the layer before it might miss or might be incentivized to hide.",
      example: "A loan officer at a bank negotiates and prices a $50 million term loan to a manufacturing company (1st line). Before it can be booked, the bank's credit risk unit independently checks the borrower's financials against the bank's guidelines and confirms the exposure fits within that industry's sector limit (2nd line). Six months later, internal audit reviews a sample of recently approved loans, including this one, to confirm the 2nd line actually enforced the sector limit correctly and that the loan officer didn't route around the approval process (3rd line).",
      pitfall: "This exact three-tier structure reappears across FRM topics (operational risk, model risk) — don't relearn it as a 'new' framework each time you see it in a different book.",
      related: [{ r: 41, label: "R41 — the same three lines of defense in operational risk governance" }],
      memory: "1st line acts, 2nd line watches, 3rd line audits the watcher."
    },
    {
      name: "The four GSLO pillars",
      def: "Guidelines (written credit policies, reviewed periodically, owned by the CRO's office; must be understandable, concise, precise, and accessible). Skills (risk staff need real business fluency, not just modeling skill; delegation of authority is a two-step process: assign risk parameters to the transaction, then route it to an approval level matched to that risk). Limits (maximum acceptable dollar loss — a credit line — set at aggregate and counterparty/sector/country level). Oversight (independence, qualifications, closeness to the business, and an open mind; risk management must be organizationally independent from the profit center it oversees, with compensation delinked from the business unit's P&L).",
      intuition: "Guidelines tell you the rules, Skills make sure the right person applies them at the right level of seniority, Limits cap the downside in hard dollar terms, and Oversight is the enforcement mechanism that makes the first three actually stick — without independent oversight, guidelines and limits are just suggestions.",
      example: "A firm sets an overall absolute risk limit of $75 million. Within that, it assigns smaller sub-limits to individual counterparties, sectors, and countries. A proposed $110 million exposure to a counterparty rated 'R4' would, under a typical escalation-of-delegation table, require sign-off from the transaction committee (which holds approval authority for R4 counterparties up to $125 million) plus a mandatory recommendation from the credit risk assessment unit, because the deal size exceeds that unit's $75 million review threshold — a concrete illustration of the Skills pillar's two-step delegation process (assign parameters, then delegate authority based on them).",
      pitfall: "The exam will test that risk managers should NOT be compensated based on the profitability of the desk they oversee — a conflict-of-interest question dressed up as a governance question.",
      related: ["Three lines of defense"],
      memory: "G-S-L-O: Guidelines, Skills, Limits, Oversight — the four pillars holding up the governance roof."
    },
    {
      name: "Credit origination, assessment, and approval",
      def: "The three processes that lead to risk-taking in an organization: (1) credit origination — creating the exposure, driven by originators who want more volume and margin; (2) credit risk assessment — an independent evaluation of how risky the proposed deal is; (3) credit approval — the formal sign-off that allows the exposure to be booked, at a level of seniority matched to the deal's risk.",
      intuition: "Origination alone is unstable, because the people who originate are paid on volume, not caution. Assessment and approval exist specifically to counterbalance that incentive before the exposure ever lands on the balance sheet.",
      example: "A portfolio of loans that all looked fine individually at origination can create large losses later if the assessment step never independently questioned the originators' optimism — this is the textbook mechanism behind boom-time credit expansions that later blow up.",
      pitfall: "Don't confuse origination-assessment-approval (the risk-taking process, LO 18.b) with the three lines of defense (the org-structure framework, LO 18.a) — they are related but distinct lists the exam can test separately.",
      related: ["Three lines of defense"],
      memory: "Originate, assess, approve — three steps, three different sets of incentives."
    },
    {
      name: "Transaction parameters (exposure, credit quality, tenor)",
      def: "The three attributes used to describe and size up any credit-sensitive transaction: amount of exposure (potential dollar loss), credit quality (counterparty creditworthiness), and tenor (length of time the exposure is outstanding).",
      intuition: "These three numbers are what the Skills pillar's delegation-of-authority process actually runs on — a transaction's risk parameters determine how far up the approval chain it must travel.",
      example: "A credit scoring model that summarizes a counterparty's overall creditworthiness is measuring the credit quality parameter, not tenor or exposure amount.",
      pitfall: "Exam questions sometimes describe a scenario (e.g. 'a model was built to summarize counterparty creditworthiness') and ask which of the three parameters it represents — read carefully, because 'maximum loss' is a distractor pointing at Limits, not at the exposure parameter itself.",
      related: [],
      memory: "Amount, Quality, Time — how big, how safe, how long."
    },
    {
      name: "Credit committee",
      def: "A body of senior executives that makes approval decisions on the most important or highest-risk transactions, operating under a formal charter that lays out the approval process. Members are drawn from business units, risk management, tax and accounting, compliance, and legal, and typically have limited ability to delegate their vote. A chair solicits opinions, facilitates discussion, and calls a vote if consensus doesn't emerge; minutes are recorded and distributed promptly.",
      intuition: "The credit committee is the institutional embodiment of the Skills pillar's top approval tier — it exists precisely because the CRO or Board cannot personally review every transaction, so the highest-risk deals get routed to a standing group with the seniority and cross-functional expertise to decide.",
      example: "A well-functioning credit committee has a track record that includes both approvals and declines — a committee that never says no is a governance red flag, since it suggests the review step has become a rubber stamp rather than genuine independent scrutiny.",
      pitfall: "Don't assume the credit committee reviews every transaction — most low-risk deals are approved at much lower levels under delegated authority; the committee handles the escalated, high-risk tail.",
      related: ["The four GSLO pillars"],
      memory: "Senior people, a charter, a chair, a vote if needed, and minutes — that's the credit committee."
    }
  ],

  connections: {
    from: [
      { r: 17, why: "Establishes what credit risk IS; this reading establishes who's accountable for managing it." }
    ],
    to: [
      { r: 19, why: "Applies this governance skeleton specifically to a bank's loan book — classification, provisioning, workout." },
      { r: 41, why: "The three lines of defense framework reappears verbatim in operational risk governance." }
    ],
    confused: [
      { what: "2nd line vs 3rd line", how: "2nd line (risk management) sets and monitors limits in real time as part of ongoing operations; 3rd line (internal audit) independently checks, after the fact, whether both the 1st and 2nd lines are actually doing their jobs." },
      { what: "Limits vs Oversight", how: "Limits is the dollar cap on how much risk can be taken (a number); Oversight is the organizational structure — independence, qualifications, reporting lines, compensation — that makes sure the limit-setting and monitoring process itself isn't compromised." }
    ]
  },

  misconceptions: [
    { wrong: "\"A risk manager's compensation tied to the desk's profitability creates better alignment of incentives.\"", right: "The exact opposite — it's a classic conflict of interest. Risk management must be organizationally independent, with compensation DELINKED from the business unit's P&L. Independence, not alignment, is the goal." },
    { wrong: "\"Internal audit's job is to monitor risk-taking in real time, like risk management does.\"", right: "Internal audit (3rd line) provides independent assurance AFTER the fact that lines 1 and 2 are functioning — it doesn't do real-time monitoring, that's the 2nd line's job." },
    { wrong: "\"Risk managers have veto/approval authority over transactions, since they're the ones enforcing the limits.\"", right: "Risk management fulfills an advisory role — it does not have transaction approval authority and is not itself a profit center. It can escalate dissenting views (e.g. via written memos to a credit committee), but the approval decision sits with the delegated approval authority or committee, not with risk management unilaterally." },
    { wrong: "\"Any breach of a credit limit should be treated as an originator error and penalized the same way.\"", right: "Organizations should build carve-outs into their guidelines for breaches that occur naturally rather than intentionally — e.g. a limit breach caused by foreign exchange rate movements, not by an originator's misjudgment." },
    { wrong: "\"Risk managers should stay as far from the business as possible to preserve independence.\"", right: "Effective oversight requires closeness to the business as one of its four elements, alongside independence, qualifications, and an open mind — a risk manager who doesn't understand the business, its profit drivers, and its transaction structures can't have a constructive, credible conversation with originators." }
  ],

  highYield: [
    { stars: 4, what: "Three lines of defense — the exact role of each line.", why: "GARP's favorite governance framework, reused across multiple FRM topics beyond credit risk." },
    { stars: 3, what: "GSLO pillars, especially the Oversight/compensation independence trap.", why: "The compensation conflict-of-interest question is a reliable, easy point if memorized." },
    { stars: 3, what: "Risk management's reporting line: to the CRO, not to business unit heads.", why: "Directly tests the Independence element of Oversight; a frequent module-quiz and exam-style question." },
    { stars: 2, what: "The three transaction parameters (exposure, credit quality, tenor) and the two-step delegation-of-authority process.", why: "Tests whether you can classify a described scenario into the right parameter or step." },
    { stars: 2, what: "Guideline breach carve-outs (e.g. FX-driven limit breaches) vs. genuine noncompliance.", why: "A recurring scenario-based trap distinguishing tolerated, non-intentional breaches from real violations." }
  ],

  recall: [
    { q: "A trader's manager is also the person responsible for approving that trader's risk limits, and the manager's bonus depends on the desk's P&L. What governance principle is violated?", a: "The Oversight pillar — risk management/limit-setting must be organizationally independent from the profit center, with compensation delinked from that unit's P&L. This setup creates a direct conflict of interest." },
    { q: "Distinguish the 2nd and 3rd lines of defense using their timing and independence.", a: "The 2nd line (risk management, compliance, legal) provides ongoing, real-time independent monitoring and limit-setting as risk is being taken. The 3rd line (internal audit) provides independent assurance AFTER the fact that both the 1st and 2nd lines are functioning as intended." },
    { q: "Who should risk managers report to, and why?", a: "The CRO, not the business unit heads — this preserves independence, which is one of the four requirements of effective oversight (along with strong qualifications, closeness to the business, and an open mind). CROs in turn typically report directly to the CEO and often have direct access to the Board's risk and audit committees." },
    { q: "A firm is worried that FX rate volatility could cause transactions within approved credit limits to unintentionally breach those limits. What's the best governance response?", a: "Build a carve-out into the guidelines for breaches caused by FX rate movements — this is a naturally occurring, non-intentional breach, not an originator error, and guidelines should distinguish the two." },
    { q: "What three parameters describe a credit-sensitive transaction, and how do they interact with delegation of authority?", a: "Amount of exposure, credit quality, and tenor (length of exposure). Delegation of authority works in two steps: assign these risk parameters to the transaction, then route the transaction to an approval level matched to how risky those parameters make it — riskier transactions require higher, more senior approval." },
    { q: "Does risk management have the authority to veto a transaction outright?", a: "No — risk management is advisory, not a profit center, and typically does not hold unilateral veto rights. It can express dissenting views, often via written memos escalated to a credit committee, but the approval decision itself rests with the delegated approver or committee." }
  ],

  hooks: [
    { title: "The court system", text: "1st line = the actors (business). 2nd line = the judge watching in real time (risk management). 3rd line = the appeals court reviewing the whole trial afterward (internal audit)." },
    { title: "G-S-L-O", text: "Guidelines, Skills, Limits, Oversight — four pillars, and Oversight is the one exam questions love: never let the judge share the actor's paycheck." },
    { title: "Restaurant inspector", text: "The line cook wants speed (1st line, volume-driven). The health inspector checks temperature in real time and gets paid a flat salary regardless of how many meals go out (2nd line, independent). The corporate auditor shows up monthly to check the inspector's own logs (3rd line)." }
  ],

  summary: `<p><strong>Three lines of defense</strong>: 1st (business owners — originate/manage), 2nd (enterprise risk mgmt/compliance/legal — independent real-time oversight, sets guidelines and limits), 3rd (internal/external audit — independent after-the-fact assurance). <strong>GSLO pillars</strong>: Guidelines (written policy, must be understandable/concise/precise/accessible, CRO-owned), Skills (business fluency + two-step delegation of authority: assign risk parameters, then route to matched approval level), Limits (max acceptable dollar loss, set at aggregate and counterparty/sector/country level), Oversight (independence, qualifications, closeness to the business, open mind — compensation delinked from the business unit's P&L is the classic tested conflict-of-interest trap). Risk-taking flows through three processes — <strong>origination, assessment, approval</strong> — and any transaction is sized up by three parameters: <strong>amount of exposure, credit quality, tenor</strong>. The <strong>credit committee</strong> (senior, cross-functional, chartered, chaired, minuted) handles the highest-risk transactions that can't practically be reviewed by the CRO or Board alone.</p>`,

  quiz: [
    {
      q: "To ensure an adequate second line of defense, an organization should primarily do which of the following?",
      options: [
        "Include the compliance and legal functions in risk oversight",
        "Look primarily to business owners, because they own and manage the risks",
        "Ensure the first line of defense has proper oversight of the second line",
        "Ensure the audit function provides an independent risk management role"
      ],
      answer: 0,
      why: "The second line of defense is enterprise risk management, compliance, and legal functions that monitor and oversee the first line. The 'look to business owners' answer describes the 1st line's job, not oversight of it. The 'first line oversees the second line' answer inverts the reporting relationship — the 2nd line oversees the 1st line, not the other way around. The 'audit provides independent risk management' answer confuses the 3rd line (audit, independent assurance) with the 2nd line (risk management, ongoing oversight) — audit does not perform risk management."
    },
    {
      q: "A firm's risk managers currently report to the heads of the business units they monitor, and their bonuses are partly funded from those units' trading profits. Which GSLO pillar does this arrangement most directly violate?",
      options: [
        "Guidelines",
        "Skills",
        "Limits",
        "Oversight"
      ],
      answer: 3,
      why: "Oversight requires that risk management be organizationally independent from the profit center it monitors, with compensation delinked from that unit's P&L. Reporting to the business head and sharing in trading profits breaks both conditions. This is not a Guidelines problem (the written policy content isn't described), a Skills problem (delegation of authority isn't at issue), or a Limits problem (no dollar cap is mentioned) — it's specifically an independence failure."
    },
    {
      q: "Under a firm's escalation-of-delegation table, the transaction committee can approve exposures to an R4-rated counterparty up to $125 million, and the credit risk assessment unit must review any transaction over $75 million. A proposed transaction is $110 million to an R4 counterparty. What is required?",
      options: [
        "No special review — $110 million is within a single approver's normal authority",
        "Approval by the transaction committee only, since $110 million is below its $125 million cap",
        "Approval by the transaction committee, plus a mandatory recommendation from the credit risk assessment unit, since the deal exceeds the unit's $75 million review threshold",
        "Automatic escalation to the Board of Directors, since the deal exceeds $100 million"
      ],
      answer: 2,
      why: "The two thresholds apply simultaneously: the transaction committee has approval authority up to $125 million for an R4 counterparty (so it can approve this $110 million deal), but because $110 million also exceeds the credit risk assessment unit's $75 million review threshold, that unit's recommendation is separately required. The 'transaction committee approval only' answer misses the assessment-unit requirement; the 'automatic Board escalation' answer invents a Board-level $100 million trigger that isn't in the facts; the 'no special review' answer ignores both delegation thresholds."
    },
    {
      q: "A firm's guidelines are silent on how to handle credit limit breaches caused purely by foreign exchange rate movements (as opposed to originator misjudgment). What does best practice suggest?",
      options: [
        "Treat every breach identically as an originator error, since currency movements are foreseeable",
        "Build a carve-out into the guidelines for breaches that occur naturally rather than intentionally, such as FX-driven breaches",
        "Escalate every FX-driven breach automatically to the Board's risk committee regardless of size",
        "Suspend the originator's delegated authority until the guidelines are rewritten"
      ],
      answer: 1,
      why: "Guidelines should carve out breaches that occur naturally rather than intentionally — an FX-driven limit breach is the textbook example, since it results from market movement rather than an originator's action or judgment. Treating it identically to a deliberate breach (the 'treat every breach as an originator error' answer) misapplies consequences meant for genuine noncompliance; automatic Board escalation and suspending the originator's authority are disproportionate responses not supported by the source's guidance on breach handling."
    },
    {
      q: "A newly built model summarizes each counterparty's overall creditworthiness on a single scale. Which transaction parameter does this model output primarily represent?",
      options: [
        "Tenor",
        "Credit quality",
        "Maximum loss",
        "Amount of exposure"
      ],
      answer: 1,
      why: "Credit quality is specifically the assessment of a counterparty's creditworthiness — exactly what the model summarizes. Tenor is the length of the exposure (a time measure, not addressed here); amount of exposure is the dollar size of the position; 'maximum loss' isn't one of the three transaction parameters at all — it's a distractor that echoes the Limits pillar, not a transaction parameter."
    },
    {
      q: "Which statement best describes internal audit's role as the third line of defense?",
      options: [
        "It sets and monitors credit limits on an ongoing basis alongside risk management",
        "It provides independent, after-the-fact assurance that both the first and second lines are functioning as intended",
        "It has final approval authority over any transaction exceeding the aggregate risk limit",
        "It reports to the business unit heads to ensure close coordination with the first line"
      ],
      answer: 1,
      why: "Internal (and external) audit's defining role is independent assurance delivered after the fact — checking whether the 1st line (business owners) and 2nd line (risk management/compliance/legal) actually did their jobs. The 'sets and monitors credit limits' answer describes the 2nd line's ongoing, real-time function, not the 3rd line's after-the-fact one. The 'final approval authority' answer is wrong because audit doesn't hold transaction approval authority — that sits with delegated approvers or the credit committee. The 'reports to business unit heads' answer would destroy audit's independence, the opposite of how the 3rd line is meant to function."
    }
  ],

  sources: [
    { title: "Three Lines of Defense model — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_lines_of_defence", note: "Background on the origin and general application of the three-lines-of-defense governance model across risk functions." },
    { title: "Corporate Governance — Investopedia", url: "https://www.investopedia.com/terms/c/corporategovernance.asp", note: "Plain-language grounding in governance, oversight, and independence concepts that underpin the GSLO framework." },
    { title: "Principles for the Sound Management of Operational Risk — BIS", url: "https://www.bis.org/publ/bcbs195.htm", note: "Basel Committee guidance on governance and the lines-of-defense concept as applied by banking regulators." },
    { title: "GARP — Global Association of Risk Professionals", url: "https://www.garp.org/", note: "Exam-setting body for the FRM; useful for checking current curriculum readings and learning objectives." }
  ],

  pdf: { book: 2, query: "If R17 defines the disease, R18 is the bank's immune system" }
});
