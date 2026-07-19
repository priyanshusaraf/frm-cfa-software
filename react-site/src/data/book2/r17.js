export default ({
  book: 2, reading: 17,
  session: "Credit Risk Analysis",
  title: "Fundamentals of Credit Risk",
  tagline: "Every later reading is an elaboration of one sentence: credit risk is the chance you lose money because someone else doesn't pay you back, on time, in full.",

  teaches: `<p>This reading makes that one sentence precise before the book gets quantitative. <strong>Credit risk</strong> is defined as the probability that one party (a creditor) loses money because a counterparty fails to honor a financial obligation — and that failure can happen for three different reasons: an <strong>inability</strong> to repay (the money genuinely isn't there), an <strong>unwillingness</strong> to repay (a dispute over whether the obligation is even valid — e.g., a sovereign government contesting a debt), or <strong>nontimeliness</strong> (the money eventually arrives, but late, which still costs the creditor lost interest income). It then draws three careful legal/financial distinctions (insolvency vs. default vs. bankruptcy), catalogs the seven transaction types that create credit risk, and maps which kinds of entities carry which kinds of exposure — with real institutional examples (JPMorgan's derivatives book, Melvin Capital's GameStop short, Swiss Re/Munich Re reinsurance) rather than abstract categories. Nothing here is hard math — the exam risk is sloppy vocabulary applied to a concrete scenario.</p>`,

  why: `<p>Before you can compute EL, PD, or Credit VaR, you need airtight definitions — otherwise a well-worded exam question (a balance sheet with negative equity but current payments) will catch you conflating three legally distinct states. This reading also broadens your view of WHERE credit risk lives: not just loans, but leases, receivables, deposits, insurance, and — the single largest source globally — derivatives (~$600 trillion notional as of June 2020, mostly interest rate derivatives). It also gives you the three-part checklist every credit officer runs before extending exposure: (1) the amount of credit risk, (2) the probability of counterparty default, and (3) the recovery amount and timing of payment receipt — a sequence you'll see reappear, formalized, as PD, LGD, and EAD once the book turns quantitative in R20.</p>`,

  intuition: `<p>Think of insolvency, default, and bankruptcy as three separate clocks that don't have to tick together. <strong>Insolvency</strong> is a balance-sheet STATE (liabilities > assets, i.e., negative equity) — you can be insolvent and still pay every bill on time, because insolvency is about what you owe versus what you own, not about whether cash is moving on schedule. <strong>Default</strong> is a contractual EVENT (you failed to meet an obligation) — it can happen even without insolvency, e.g., a company with plenty of assets simply refuses to pay because it disputes the validity of the contract. <strong>Bankruptcy</strong> is a legal PROCEEDING — typically triggered after default — in which a court steps in to negotiate among the entity's management, creditors, and other stakeholders, resolving the situation via liquidation (Chapter 7 in the U.S. — the company is wound down and its assets sold off) or reorganization (Chapter 11 — the company keeps operating under a court-supervised restructuring of its debts). A firm can sit in the "insolvent" box for years without ever crossing into default or bankruptcy, and a firm can default (say, on a single missed coupon due to a genuine cash-timing dispute) while remaining perfectly solvent on paper.</p>`,

  eli5: `<p>Imagine you lend your neighbor your lawnmower every weekend and he promises to give it back by Sunday night. <strong>Insolvency</strong> is like finding out your neighbor actually owes more money to the bank than his house and car are worth combined — he's technically "underwater," but he might still hand your lawnmower back right on time every single Sunday, because being underwater on his overall finances doesn't automatically mean he misses this one specific promise to you. <strong>Default</strong> is the moment he actually doesn't return the mower on time — maybe because he genuinely can't (it broke), or because he's flatly refusing (he thinks you promised to fix it first and he's not giving it back until you do) — either way, the specific promise got broken. <strong>Bankruptcy</strong> is what happens if his money troubles get so bad that a judge has to step in and referee between him and everyone he owes — deciding whether he sells everything off (liquidation) or gets a structured payment plan while keeping his stuff (reorganization). In finance terms: insolvency is the balance-sheet condition, default is the broken promise, and bankruptcy is the court process — and none of the three automatically implies either of the others.</p>`,

  thinkLike: `<p>A credit officer evaluating any new exposure — a loan, a lease, a derivatives line, a trade credit arrangement — runs through the same three-question checklist every time, regardless of the instrument: how much am I exposed for, what's the probability the counterparty doesn't pay, and if they don't pay, how much do I get back and how long does it take? That three-part frame (amount, probability, recovery) is the seed of everything quantitative that follows in this book — it becomes exposure at default (EAD), probability of default (PD), and loss given default (LGD, the complement of the recovery rate) once the math shows up in R20. The second habit a good risk manager builds here is refusing to assume "credit risk" means "loans." A treasury desk placing corporate cash in a bank deposit, a company prepaying a supplier, an insurer holding a reinsurance recoverable on its books for a decade — all of these are credit exposures, and missing one because it doesn't look like a loan is a classic blind spot. The exam tests this by handing you a scenario (a balance sheet, a repo, a receivables question) and asking you to correctly classify what's happening using precise vocabulary — insolvent vs. defaulted vs. bankrupt, or which of several plausible-sounding "credit risk mitigants" a corporation would actually use for receivables (insurance, factoring, documentary credit — not derivatives, which hedge market risk, not counterparty nonpayment on the receivable itself).</p>`,

  formulas: [],

  concepts: [
    {
      name: "Credit risk — the underlying definition",
      def: "Credit risk is the probability that a creditor loses money because a counterparty fails to honor a financial obligation, due to (1) an inability to repay, (2) an unwillingness to repay (e.g., a contractual dispute), or (3) nontimeliness (the payment eventually arrives, but late, costing the creditor lost interest income).",
      intuition: "The three causes matter because they point to different remedies: inability is a solvency problem (nothing to be done but recover what's left), unwillingness is a legal/contractual problem (dispute resolution or litigation), and nontimeliness is a cash-flow-timing problem that still generates a real economic loss even without a formal default.",
      example: "A sovereign government forcing conversion of its foreign-currency debt into a devalued domestic currency (Argentina's 2002 'pesification') is a case of unwillingness/inability blended together — the debt is technically serviced, but creditors take a large loss from the currency conversion.",
      related: [{ r: 20, label: "R20 — where amount/probability/recovery become EAD, PD, LGD" }],
      memory: "Inability, unwillingness, nontimeliness — three different roads to the same lost dollar."
    },
    {
      name: "Insolvency vs. default vs. bankruptcy",
      def: "Insolvency: liabilities > assets (negative equity) — can still be paying bills on time. Default: fails to meet a contractual obligation, due to inability OR unwillingness to pay (can happen without insolvency, e.g., a dispute). Bankruptcy: a legal proceeding, typically triggered after default, in which a court negotiates among the entity's management, creditors, and other stakeholders — resolved via Chapter 7 (liquidation/dissolution) or Chapter 11 (reorganization/restructuring).",
      pitfall: "A company with liabilities exceeding assets that is STILL PAYING everyone on time is insolvent, not in default and not bankrupt. The exam loves handing you a balance sheet with negative equity and a confidently-paying management team — the answer is 'insolvent,' full stop. Example from the source: Acquaria Corporation has $280M in assets and $320M in debt, but management expects to keep meeting payment obligations — that is insolvency, not default or bankruptcy, because insolvency describes the balance sheet, and default/bankruptcy have not (yet) occurred.",
      related: [{ r: 20, label: "R20 — where these concepts become quantitative (EL/UL)" }],
      memory: "Insolvency = a state. Default = an event. Bankruptcy = a proceeding. Three different clocks."
    },
    {
      name: "Seven transaction types that generate credit risk",
      def: "Lending, leases, receivables, prepayment, deposits, contingent claims (insurance, pensions), derivatives.",
      intuition: "Each type exposes a different party for a different reason: in lending and leases, the party that already handed over money or an asset is exposed to nonpayment; in receivables and prepayment, whichever side moves first (goods before cash, or cash before goods) carries the risk; in deposits, the customer is exposed to the bank; in contingent claims, the exposure only materializes if a triggering event (a claim, a funding shortfall) occurs; in derivatives, both sides can owe each other money over the life of the contract, so the exposure runs both ways and changes as the market moves.",
      example: "Globally, the largest source of credit exposure by notional is derivatives (~$600 trillion as of June 2020, mostly interest rate derivatives), even though in the U.S. corporate obligations dominate, concentrated in domestic financial companies. Commodity futures create relatively little derivatives credit risk because they're margined and guaranteed by a clearinghouse, but OTC forwards and swaps (nonstandardized, uncleared) create real bilateral credit risk — a counterparty default on a commodity forward can force the other side to buy raw materials at a high price on the open market.",
      related: [{ r: 31, label: "R31 — derivatives counterparty risk, this exposure type in depth" }]
    },
    {
      name: "Who's exposed, and how",
      def: "Banks (lending + repo collateral risk + derivatives), asset managers (on behalf of clients), hedge funds (often SEEK OUT default as a trade — short distressed debt, buy CDS protection), insurers (underwriting, investment, and reinsurance recoverables — a slow-burn exposure that can take decades to settle), pension funds, corporations (receivables, vendor financing, supply chain), individuals (prepayment, deposits).",
      intuition: "Banks: repos and other collateralized lending expose a bank to the counterparty not repaying, mitigated by the collateral — except that in fast-moving markets, collateral value can drop and no longer cover the amount owed. Real scale: in 2020, JPMorgan Chase reported derivatives receivables credit exposure in excess of $700 billion. Insurers are the most structurally distinctive case: they carry credit risk from three separate channels at once — underwriting (will policyholders' premiums be enough to cover future claims, and will the insurer be able to pay those claims), investments (losses on invested premiums, which can hurt reputation and future business even when losses sit in segregated client accounts that don't touch shareholders), and reinsurance (the reinsurance recoverable — the estimated value the insurer expects to collect from a reinsurer like Swiss Re or Munich Re after transferring part of its own claims risk away; this is booked as an asset on the insurer's balance sheet, but it's really a contingent claim ON the reinsurer, so it's a credit exposure, not a guaranteed cash inflow).",
      example: "Hedge funds are a distinctive case: unlike most credit-exposed entities, they can be net SHORT credit risk deliberately, as a speculative or hedging trade — shorting the debt or equity of companies they believe are distressed, or buying CDS protection to profit from a credit event rather than merely hedge one. The source's concrete example: in 2021, Melvin Capital shorted GameStop Corp. stock expecting a price decline; when the price rose from roughly $10–$15 to about $350, Melvin had to buy back the shares at drastically higher prices, suffering losses so large it required a bailout from other hedge funds to avoid its own default — a case where the entity actively seeking to profit from someone else's distress instead nearly became a distressed counterparty itself.",
      pitfall: "Hedge funds are a distinctive case: unlike most credit-exposed entities, they can be net SHORT credit risk deliberately, as a speculative or hedging trade — don't assume every entity's relationship to credit risk is 'exposed and trying to avoid it.'",
      related: [{ r: 30, label: "R30 — protection buyers/sellers as speculators, not just hedgers" }, { r: 28, label: "R28 — reinsurance recoverables as long-tail credit exposure" }],
      memory: "Reinsurance recoverables: a claim that can take decades to actually get paid — a slow-burn credit exposure."
    },
    {
      name: "Five sources of corporate credit risk, and how corporations manage receivables risk",
      def: "Account receivables, short-term investments/bank deposits, derivatives, vendor financing, and supply chain risk. For receivables specifically, corporations mitigate the exposure three ways: buying insurance on the receivables, selling the receivables to another company (factoring), or securing foreign transactions through documentary credit (a bank guarantee that the seller will be paid).",
      intuition: "Notice what is NOT on the receivables-mitigation list: derivatives. Derivatives hedge market risk (e.g., a commodity price move), not the counterparty risk of a customer simply failing to pay an invoice — a classic exam distractor is offering 'derivatives' as a way to manage receivables credit risk, when the source explicitly lists insurance, factoring, and documentary credit instead.",
      example: "Vendor financing: a corporation's in-house financing arm helps customers buy its products on credit or lease them, creating credit exposure to those customers. Supply chain: a corporation dependent on a single supplier is exposed if that supplier defaults or simply fails to deliver — the 2021 grounding of a container ship in the Suez Canal caused billions of dollars in maritime traffic losses, illustrating how a supply-chain disruption (even without a formal 'default') can generate the same kind of loss as a counterparty failing to pay.",
      related: [{ r: 20, label: "R20 — quantifying this exposure once it becomes EL/UL" }]
    },
    {
      name: "Motivations for managing credit risk: survival, profitability, return on equity",
      def: "Credit risk is a controllable exposure — it arises from company/management decisions the firm chooses to make. Successful companies manage it by maintaining a sufficient equity buffer to absorb anticipated and unanticipated losses, balancing three goals: survival (avoiding large losses that could trigger bankruptcy), profitability (avoiding losses directly increases profit), and return on equity (finding the right balance between debt and equity financing to maximize ROE).",
      intuition: "This is the 'why bother' section — it frames credit risk management not as a compliance exercise but as a direct lever on the firm's own survival and profitability, and connects back to insolvency: an equity buffer is literally the assets-minus-liabilities cushion that keeps a firm out of the insolvent zone in the first place."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 20, why: "The EL/UL framework needs these precise definitions of what 'default' even means before it can be quantified." },
      { r: 28, why: "Reinsurance recoverables reappear as an example of long-tail, hard-to-model credit exposure." },
      { r: 30, why: "The hedge-fund-as-credit-opportunist idea reappears when protection buyers/sellers are discussed as speculators." }
    ],
    confused: [
      { what: "Insolvency vs default", how: "Insolvency is a balance-sheet condition; default is a contractual failure. Neither implies the other — a solvent company can default on a technicality, and an insolvent company can keep paying everyone." },
      { what: "Derivatives as a receivables-risk mitigant vs. as a credit-risk generator", how: "Derivatives are one of the seven transaction TYPES that generate credit risk (each party owes the other over the contract's life), but they are NOT one of the three tools corporations use to mitigate receivables risk — that list is insurance, factoring, and documentary credit. Confusing the two directions is a common exam trap." }
    ]
  },

  misconceptions: [
    { wrong: "\"Negative equity (liabilities > assets) means a company is in default.\"", right: "That's insolvency, a distinct state. Default requires actually failing to meet a contractual obligation — an insolvent company can still be current on all payments." },
    { wrong: "\"Lending is the primary source of credit risk globally.\"", right: "By notional, derivatives (~$600 trillion) are the largest global source of credit exposure, even though corporate obligations dominate within the U.S. specifically, concentrated in domestic financial companies." },
    { wrong: "\"All entities exposed to credit risk are trying to minimize it.\"", right: "Hedge funds often deliberately SEEK OUT default exposure as a trade — shorting distressed debt or buying CDS protection speculatively, not just hedging. Melvin Capital's 2021 GameStop short shows this can backfire badly, nearly making the hedge fund itself a defaulting counterparty." },
    { wrong: "\"A corporation would use derivatives to mitigate receivables credit risk.\"", right: "The source explicitly lists three mitigants for receivables risk — insurance, factoring, and documentary credit. Derivatives mitigate market risk (like commodity price swings); using them to manage a customer's nonpayment risk is not one of the listed tools, and is a common wrong-answer choice on this LO." }
  ],

  highYield: [
    { stars: 4, what: "Insolvency vs. default vs. bankruptcy — precise definitions and the classic 'still paying but insolvent' trap.", why: "The single most reliably tested vocabulary distinction in this reading." },
    { stars: 3, what: "Seven transaction types generating credit risk, with derivatives as the largest global source by notional (~$600 trillion).", why: "Straightforward recall, occasionally tested with a 'which is NOT a source' format or a numeric-scale question." },
    { stars: 3, what: "The three ways corporations mitigate receivables credit risk: insurance, factoring, documentary credit (NOT derivatives).", why: "A frequent multi-choice distractor setup — 'least likely to mitigate receivables risk' style questions." },
    { stars: 2, what: "Reinsurance recoverables as long-tail credit exposure; hedge funds as credit-risk seekers (Melvin Capital/GameStop example).", why: "Sets up thematic callbacks in R28 and R30 — recognizing the thread earns synthesis points." },
    { stars: 2, what: "The three-part credit assessment checklist: amount of credit risk, probability of default, recovery amount and timing.", why: "This becomes EAD/PD/LGD once the book turns quantitative — worth memorizing as the conceptual seed." }
  ],

  recall: [
    { q: "A company's balance sheet shows liabilities exceeding assets by $50M, but it has met every payment obligation this year. Is it insolvent, in default, or bankrupt?", a: "Insolvent only. Insolvency is a balance-sheet state (negative equity); default requires an actual failure to meet a contractual obligation, which hasn't happened here; bankruptcy is a legal proceeding usually triggered by default." },
    { q: "Why is 'derivatives' surprising as the single largest global source of credit risk exposure by notional?", a: "Most people intuitively associate credit risk with lending, but derivatives notional (~$600 trillion globally, mostly interest rate derivatives, as of June 2020) dwarfs corporate lending exposure — though within the U.S. specifically, corporate obligations dominate, concentrated in domestic financial companies, so the answer depends on scope (global vs. domestic)." },
    { q: "How does a hedge fund's relationship to credit risk differ from a typical insurer's?", a: "An insurer is generally trying to manage/minimize credit exposure it takes on through underwriting and investment. A hedge fund often deliberately SEEKS OUT default exposure as a speculative trade — e.g., shorting distressed debt or buying CDS protection to profit from a credit event, not just hedging one. (Melvin Capital's 2021 short of GameStop shows this strategy can itself generate massive losses.)" },
    { q: "Name the three ways a corporation can mitigate its accounts-receivable credit risk, per the source.", a: "Buying insurance on the receivables, selling the receivables to another company (factoring), and securing foreign transactions through documentary credit (a bank guarantee of payment). Derivatives are not on this list — they hedge market risk, not a customer's nonpayment risk." },
    { q: "What are the three things a creditor generally wants to assess about any credit exposure, per the source?", a: "(1) The amount of credit risk, (2) the probability of counterparty default, and (3) the recovery amount and timing of payment receipt — the conceptual precursor to EAD, PD, and LGD." }
  ],

  hooks: [
    { title: "Three clocks, not one", text: "Insolvency, default, and bankruptcy tick independently. A balance sheet can show insolvency for years while every clock for default and bankruptcy stays silent." },
    { title: "$600 trillion hiding in plain sight", text: "Everyone thinks 'loans' when they hear credit risk — but derivatives notional dwarfs it globally. The biggest source of credit risk isn't the one that comes to mind first." },
    { title: "The short that shorted the shorter", text: "Melvin Capital shorted GameStop expecting a decline, and instead needed a bailout from other hedge funds to avoid defaulting itself — a reminder that seeking out credit risk as a trade is still risk, not a free lunch." }
  ],

  summary: `<p><strong>Credit risk</strong> is the probability of loss from a counterparty's inability, unwillingness, or nontimeliness in honoring an obligation. <strong>Insolvency</strong> (liabilities > assets, a state) ≠ <strong>default</strong> (failing an obligation, an event) ≠ <strong>bankruptcy</strong> (a legal proceeding, usually post-default: Chapter 7 liquidation or Chapter 11 reorganization) — a company can be insolvent while paying everyone on time. Seven transaction types generate credit risk: <strong>lending, leases, receivables, prepayment, deposits, contingent claims, derivatives</strong> — derivatives (~$600T) is the largest global source by notional, though U.S. corporate obligations dominate domestically. Exposure varies by entity: banks (JPMorgan's >$700B derivatives receivables in 2020), asset managers, hedge funds (often SEEK default exposure speculatively — Melvin Capital/GameStop), insurers (reinsurance recoverables via firms like Swiss Re/Munich Re = long-tail exposure), pension funds, corporations (five sources: receivables, deposits, derivatives, vendor financing, supply chain — receivables mitigated via insurance, factoring, or documentary credit, NOT derivatives), and individuals (prepayment, deposits). Firms manage credit risk to protect survival, profitability, and return on equity.</p>`,

  breakdown: [
    {
      title: "Seven transaction types that generate credit risk",
      points: [
        "Lending — the lender is exposed to the borrower not repaying the loan.",
        "Leases — the lessor (asset owner, often financed with borrowed funds) is exposed to the lessee not making scheduled lease payments.",
        "Receivables — a seller who lets a buyer pay later is exposed to not receiving that payment.",
        "Prepayment — an entity that pays upfront is exposed to goods/services not being delivered later (e.g., the seller goes bankrupt).",
        "Deposits — bank customers are exposed to not having timely access to their deposits.",
        "Contingent claims — insurance policyholders and pension plan participants are exposed to the insurer/sponsor not being able to pay when a claim/liability comes due.",
        "Derivatives — each party to a forward, swap, or similar contract is exposed to the other party's nonpayment over the life of the trade, even though no cash changes hands at inception."
      ]
    },
    {
      title: "Five sources of corporate credit risk",
      points: [
        "Account receivables — customers may fail or refuse to pay for goods delivered on credit; mitigated via insurance, factoring, or documentary credit.",
        "Short-term investments and bank deposits — the issuer of a short-term security, or the bank holding a deposit, may fail to pay; mitigated by diversifying deposits across banks.",
        "Derivatives — commodity futures carry little credit risk (margined, clearinghouse-guaranteed), but OTC forwards/swaps create real bilateral counterparty risk.",
        "Vendor financing — a corporation's financing arm that lets customers buy on credit or lease its products is exposed to those customers' default.",
        "Supply chain — reliance on a single supplier creates exposure to that supplier's default or failure to deliver (e.g., the 2021 Suez Canal container-ship grounding)."
      ]
    },
    {
      title: "Three motivations for managing credit risk",
      points: [
        "Survival — avoiding large losses that could push the firm toward bankruptcy.",
        "Profitability — every credit loss avoided is profit preserved.",
        "Return on equity — finding the right debt/equity balance to maximize ROE while still holding an adequate equity buffer against losses."
      ]
    }
  ],

  quiz: [
    {
      q: "Acquaria Corporation's balance sheet shows $280 million in assets and $320 million in debt to creditors. Management expects to continue meeting all upcoming payment obligations. Acquaria is best characterized as:",
      options: ["Bankrupt", "Insolvent", "In default", "Nonperforming"],
      answer: 1,
      why: "Liabilities ($320M) exceed assets ($280M) — negative equity — which is the definition of insolvency. Since management is still meeting payment obligations, there is no default (a failure to meet a contractual obligation), and with no default there is no bankruptcy filing either. 'Nonperforming' isn't one of the three defined states in this reading."
    },
    {
      q: "Which of the following is the single largest source of credit exposure globally, by notional value?",
      options: ["Corporate lending", "Derivatives (mostly interest rate derivatives)", "Residential mortgages", "Trade receivables"],
      answer: 1,
      why: "Globally, derivatives notional (~$600 trillion as of June 2020) dwarfs every other category. The tempting trap is 'corporate lending,' which is true only within the U.S. domestically — the question specifies global scope."
    },
    {
      q: "A bank enters a $25 million, 6-month repurchase agreement with an investment-grade corporate client, collateralized by $26 million notional of 10-year government bonds. Which statement is correct?",
      options: [
        "The bank has no credit risk because the repo matures before the bonds do",
        "The bank has no credit risk because the client is investment grade, so default is unlikely",
        "The bank has no credit risk because the collateral's notional exceeds the repo amount",
        "The bank has credit risk because if the client defaults, it may not be able to sell the bonds for enough to cover the full repo amount"
      ],
      answer: 3,
      why: "Collateral mitigates but does not eliminate credit risk: in a fast-moving market, the value of the 10-year bonds can fall below the amount owed under the repo, leaving the bank under-collateralized. Investment-grade rating reduces but does not eliminate default probability, and notional coverage today says nothing about collateral value at the moment of a future default — all three wrong options assume risk is fully eliminated, which collateralization never guarantees."
    },
    {
      q: "Which of the following would a corporation LEAST likely use to mitigate its accounts-receivable credit risk?",
      options: ["Factoring (selling the receivables)", "Buying insurance on the receivables", "Entering into derivatives contracts", "Securing documentary credit for foreign transactions"],
      answer: 2,
      why: "The source lists exactly three receivables-risk mitigants: insurance, factoring, and documentary credit. Derivatives hedge market risk (e.g., commodity price moves), not a customer's failure to pay an outstanding invoice, so they are not a receivables-risk tool here."
    },
    {
      q: "In 2021, Melvin Capital shorted GameStop Corp. stock, expecting its price to decline. Instead, the price rose sharply, forcing Melvin to buy back shares at much higher prices and requiring a bailout from other hedge funds. What does this best illustrate about hedge funds and credit risk?",
      options: [
        "Hedge funds never take on credit risk deliberately, only by accident",
        "Hedge funds can treat default/distress as an investment opportunity, but this exposes them to their own large losses and default risk",
        "Hedge funds are legally required to hedge all short positions with CDS protection",
        "Short selling eliminates credit risk because no obligation to repay exists"
      ],
      answer: 1,
      why: "Unlike most credit-exposed entities that try to minimize exposure, hedge funds often deliberately seek out credit/default opportunities as trades (shorting distressed securities, buying CDS protection). But this is still risk-taking — as Melvin's near-default from its own losing short position shows, seeking out credit risk as a trade can put the hedge fund itself in danger of default."
    },
    {
      q: "An insurance company records a 'reinsurance recoverable' as an asset on its balance sheet after transferring part of its claims risk to a reinsurer such as Swiss Re. Why does this represent credit risk for the insurer, rather than a guaranteed cash inflow?",
      options: [
        "Because reinsurers are legally prohibited from ever denying a claim",
        "Because it is a contingent claim on the reinsurer, and there can be a time lag — sometimes decades — between the original claim and the reinsurer's payment, during which the reinsurer could fail to pay",
        "Because reinsurance recoverables are always paid immediately in cash at policy inception",
        "Because reinsurance recoverables are classified as equity, not a receivable"
      ],
      answer: 1,
      why: "A reinsurance recoverable is the insurer's estimate of what it expects to collect from the reinsurer — it's a claim ON the reinsurer that depends on the reinsurer actually verifying and paying, which can take a very long time (often decades for long-tail claims like earthquake or hurricane losses). That time lag and dependency on the reinsurer's own solvency is exactly what makes it a credit exposure, not a guaranteed asset."
    }
  ],

  sources: [
    { title: "Credit risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Credit_risk", note: "General overview of credit risk definitions, sources, and measurement approaches." },
    { title: "Insolvency — Wikipedia", url: "https://en.wikipedia.org/wiki/Insolvency", note: "Background on the balance-sheet and cash-flow tests for insolvency, and how it differs from bankruptcy across jurisdictions." },
    { title: "Chapter 7 vs. Chapter 11 Bankruptcy — Investopedia", url: "https://www.investopedia.com/ask/answers/100314/what-difference-between-chapter-7-and-chapter-11-bankruptcy.asp", note: "Plain-language comparison of liquidation (Chapter 7) vs. reorganization (Chapter 11) bankruptcy." },
    { title: "Reinsurance — Investopedia", url: "https://www.investopedia.com/terms/r/reinsurance.asp", note: "Explains how reinsurance contracts work and why reinsurance recoverables are a credit exposure for the ceding insurer." }
  ],

  pdf: { book: 2, query: "credit risk is the probability that one party" }
});
