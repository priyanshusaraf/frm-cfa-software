export default ({
  book: 4, reading: 68,
  session: "Liquidity Risk Management",
  title: "Intraday Liquidity Risk Management",
  tagline: "Zooms into the finest time scale of liquidity management: within a single day. Highly listy, highly testable on which-item-goes-where.",

  teaches: `<p>This reading shrinks the time horizon of liquidity management down to hours and minutes rather than days or weeks. A bank's cash position moves constantly during business hours as payments go out and come in — this reading covers three things: (1) what actually <strong>uses</strong> and <strong>creates</strong> intraday liquidity (the cash inflows/outflows a bank must juggle before the sun sets on a single business day), (2) the <strong>governance structure</strong> a bank should have around managing that risk, and (3) the precise difference between <em>tracking</em> the raw flows (bookkeeping) and <em>monitoring</em> the risk levels those flows imply (risk management). Intraday liquidity is the fuel a bank burns from the moment it opens for payment processing until it closes its books that evening — and unlike overnight or term funding, there is no "tomorrow" to fix a shortfall; the bank must stay solvent hour by hour, in real time, all day.</p>`,

  why: `<p>Intraday liquidity risk is easy to overlook because it resolves within a day — the bank's balance sheet looks fine again by the next morning, so nothing shows up in end-of-day reports. But that is exactly the danger: a bank that fails to meet an obligation at 2:47pm because it ran out of intraday liquidity can trigger a cascading settlement failure across the payment system — the counterparty expecting that payment may itself be unable to make its own outgoing payments, and so on. This is why regulators (and the exam) care about a bank's <strong>contribution to systemic risk</strong>, not just its own comfort level — which is exactly why the systemic-risk metric (intraday credit relative to Tier&nbsp;1 capital) gets singled out as the reading's central, most-tested idea.</p>`,

  intuition: `<p>Uses and sources of intraday liquidity are two sides of the same coin, and the reading pairs them for a reason: every dollar a bank sends out during the day (a use) has to come from somewhere (a source), and the biggest items on each side dominate the picture. The single biggest <strong>use</strong> is outgoing wire transfers — payments the bank makes for itself or on behalf of clients, happening steadily all day long. The single biggest <strong>source</strong> is incoming funds flow — payments and settlements landing in the bank's account from other banks and financial market utilities (FMUs). Think of it like a retail store's cash register: the store is constantly taking in cash from sales (source) and constantly paying out cash for suppliers, refunds, and rent (use); the manager's job is to make sure the register never runs empty mid-day even though total daily sales comfortably exceed total daily expenses.</p>
  <p>Among the sources, <strong>intraday credit</strong> — a temporary overdraft facility central banks extend to banks during the business day, automatically repaid by day's end — is the one source with a genuine, non-trivial financial cost: some central banks charge explicit interest on it, others require the bank to pledge high-quality collateral (which then can't be used or sold elsewhere, an opportunity cost). Owned cash and liquid assets, by contrast, cost nothing extra to use — they're already the bank's own money.</p>
  <p>The key systemic-risk metric is <strong>intraday credit relative to Tier&nbsp;1 capital</strong> — this is NOT the same as daily maximum usage (which measures the bank's OWN worst-case exposure on a given day) or client usage (which measures how much overdraft risk the bank's CLIENTS are creating for it). Three different questions get three different metrics: "how bad did my day get?" (daily max usage), "how much risk are my clients pushing onto me?" (client usage), and "how much risk do I push onto the whole payment system if my unsecured intraday credit ever failed?" (intraday credit / Tier&nbsp;1 capital). That third question — my own contribution to everyone else's risk — is the reading's central conceptual payoff, and GARP tests the distinction directly.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Uses vs. sources of intraday liquidity",
      def: "Uses (where cash goes out during the day): outgoing wire transfers (the single biggest use — payments for the bank itself, with roughly one-to-two-days' lead time, or for clients, often unpredictable, occurring steadily throughout the day); settlements at Payment Clearing and Settlement (PCS) systems (these often settle just once, near day's end, producing a single net inflow or outflow, and are hard to forecast for same-day settlement but easier for multi-day settlement); funding of nostro accounts (correspondent bank accounts a bank holds abroad to transact in a foreign currency/country — securities settlements in that account are easier to forecast than client-driven activity); collateral pledging (posting collateral for transactions like margin trading causes a cash outflow, forecastable from trading volume and price-change data); and asset purchases/funding (covering investment-portfolio securities purchases, fixed-asset purchases, and client loans/draws on credit lines — securities and fixed-asset purchases are easier to forecast than client loan draws). Sources (where cash comes in): cash balances (held at the central bank or at correspondent banks — the bank's own-operations-driven balances are easier to forecast than client-activity-driven ones); incoming funds flow (the single biggest source — payment inflows and FMU settlements, arriving either instantaneously or in batches); intraday credit (a temporary overdraft facility central banks extend during the day, automatically zeroed out by day's end — may carry explicit interest or require high-quality collateral); liquid assets (near-cash items: money market instruments, time deposits, government securities with maturities of one year or less); overnight borrowings (unlike intraday credit, repaid only the NEXT day — a cost-benefit tradeoff between holding too much liquidity and having too little to complete the day's transactions); and other term funding (an extension of overnight borrowing out to a week or a month — a supplemental, occasional source rather than the everyday go-to).",
      intuition: "Picture the bank's intraday cash position as a bathtub with the tap and drain both running all day: outgoing wires, PCS settlements, nostro funding, collateral posting, and asset purchases are drains; cash balances, incoming payments, intraday credit, liquid assets, and borrowings are taps. The treasurer's job is to keep the water level above zero every single minute, not just by close of business.",
      example: "A bank sends $50 million in client wire transfers throughout the morning (use) while simultaneously receiving $48 million in incoming payments from correspondent banks (source). The $2 million gap is covered first by drawing on cash balances already held at the central bank; if that runs out, the bank taps its intraday credit line from the central bank (temporary overdraft, repaid by close) rather than reaching for overnight borrowing, which would carry it past end of day.",
      pitfall: "Intraday credit may carry an explicit interest cost or require high-quality collateral (an opportunity cost) — this is the ONE source with a genuine, non-trivial financial cost, unlike owned cash/liquid assets, which are already the bank's own money and cost nothing extra to deploy.",
      related: [],
      memory: "Biggest use: outgoing wires. Biggest source: incoming funds. Only costly source: intraday credit."
    },
    {
      name: "Governance — four pillars",
      def: "A strong intraday liquidity risk governance structure covers four areas. (1) Active risk management: treat intraday liquidity risk as something the bank can proactively manage — not a passive given — for example, by explicitly recognizing and classifying settlement risk and systemic risk within the institution's formal risk appetite statement. (2) Integration with risk governance: duties are woven into the three lines of defense — treasury (first line, executing the day-to-day cash management), corporate risk management (second line, emphasized here — sets funding policies/procedures, monitors risk activity firm-wide, produces consolidated reporting), and internal audit (third line, independent review). Relevant senior personnel are actively involved in key decisions, and oversight committees deliberately balance treasury and IT expertise. (3) Risk assessment: focused specifically on settlement risk — business-unit managers and the risk team analyze internal controls to determine their ability to reduce or minimize that risk. (4) Risk measurement and monitoring: tracked two ways — the dollar value of intraday credit the bank PROVIDES to its customers, and the dollar value of intraday credit the bank itself USES from the central bank.",
      intuition: "Think of the four pillars as answering four different questions in sequence: 'Are we proactive about this risk?' (active management) → 'Whose job is it, and who checks the checker?' (three lines of defense) → 'What specifically are we assessing?' (settlement risk) → 'How do we actually measure and watch it day to day?' (credit provided vs. credit used).",
      pitfall: "The three-lines-of-defense model reapplies here exactly as in general risk governance (see R41), but the EMPHASIS shifts to corporate risk management as the active second line — don't assume treasury alone owns intraday liquidity risk just because treasury executes the payments.",
      related: [{ r: 41, label: "R41 — the three lines of defense model reapplied here" }]
    },
    {
      name: "Tracking flows vs. monitoring risk levels",
      def: "Tracking intraday flows (the raw bookkeeping) covers: total payments (every electronic payment's amount, time, payer, payee — rolled up into totals sent/received, net settlement position, and payment volume trends); other cash transactions (intraday and ending settlement positions across all financial market utilities — FMUs — the bank participates in, e.g. securities-settlement networks, checked at periodic intervals through the day); settlement positions (a bank's position with each FMU — critical because payments have hard deadlines and are often large; watching trends here, and linking them to macro factors, lets the bank anticipate liquidity needs earlier in the day); time-sensitive obligations (deadlines that, if missed — even same-day — trigger penalties or worse); total intraday credit lines to clients and counterparties (actual vs. potential credit extended, tracked for maximum exposure and for normal/high-use patterns); and total bank intraday credit lines available and used (how much systemic risk the bank itself is contributing, comparing normal-circumstance usage to the maximum available — committed and uncommitted — intraday credit). Monitoring risk levels (turning those flows into risk signals) covers: daily maximum intraday liquidity usage (the day's single most-negative balance divided by the credit line limit — calculated after the fact, not in real time, and best viewed across all the bank's cash accounts combined); intraday credit relative to Tier 1 capital (the ratio of UNSECURED, AVAILABLE — not used — intraday credit to Tier 1 capital; because pledging collateral reduces settlement risk, this ratio isolates the genuinely risky, uncollateralized portion, giving the key read on the bank's systemic/settlement risk); client intraday credit usage (each client's highest intraday borrowing as a fraction of their credit line limit, aggregated across all clients — flags which clients are consistently overdrawn and may need remedial action or extra charges); and payment throughput (the proportion of outgoing payments made by various points during the day — tracks payment patterns, ensures compliance with an FMU's required percentage of on-time payments, and helps identify peak payment periods and how they strain available intraday liquidity and credit use).",
      example: "A bank's most negative balance on Tuesday was $80 million against a $100 million committed credit line — daily maximum intraday liquidity usage = 80/100 = 80%. Separately, the bank has $30 million of unsecured, available (unused) intraday credit against $500 million of Tier 1 capital — intraday credit / Tier 1 capital = 6%. The 80% figure says 'Tuesday was a stressful day for us personally'; the 6% figure says 'here is our standing contribution to payment-system-wide risk,' and it is the second number regulators and the exam care about as the systemic-risk read.",
      pitfall: "The metric that specifically captures the bank's contribution to SYSTEMIC risk is intraday credit relative to Tier 1 capital — NOT daily maximum usage (about the bank's own exposure) or client usage (about client-specific risk). This three-way distinction is the reading's central conceptual test.",
      related: [],
      memory: "My own risk (daily max usage), my client's risk (client usage), everyone's risk (intraday credit/Tier 1) — three different lenses, three different metrics."
    }
  ],

  connections: {
    from: [
      { r: 67, why: "Reserves management's day-to-day treasury function zooms into this reading's finest, intraday time scale." }
    ],
    to: [
      { r: 69, why: "Monitoring liquidity's full cash-flow term structure builds on this reading's intraday-specific tracking." }
    ],
    confused: [
      { what: "Daily maximum usage vs intraday credit/Tier 1 capital", how: "Daily maximum usage measures the bank's OWN exposure at its worst intraday moment; intraday credit/Tier 1 capital measures the bank's contribution to SYSTEMIC risk — different questions, different metrics." }
    ]
  },

  misconceptions: [
    { wrong: "\"Daily maximum intraday liquidity usage is the key metric for systemic risk.\"", right: "The key systemic-risk metric is intraday credit relative to Tier 1 capital. Daily maximum usage measures the bank's OWN exposure, not its contribution to the broader payment-system risk." },
    { wrong: "\"All sources of intraday liquidity (cash, liquid assets, intraday credit) carry similar costs.\"", right: "Intraday credit is the ONE source with a genuine, non-trivial financial cost (explicit interest or collateral opportunity cost) — owned cash and liquid assets don't carry this same cost structure." },
    { wrong: "\"Intraday credit relative to Tier 1 capital compares TOTAL intraday credit usage to capital.\"", right: "It specifically compares UNSECURED, AVAILABLE (not used) intraday credit to Tier 1 capital — because pledging collateral reduces settlement risk, the ratio deliberately isolates the uncollateralized, riskiest slice of credit exposure." }
  ],

  highYield: [
    { stars: 4, what: "The systemic-risk metric: intraday credit relative to Tier 1 capital, distinct from daily maximum usage and client usage.", why: "Explicitly flagged as the reading's central, most-tested conceptual distinction." },
    { stars: 3, what: "Uses (biggest: outgoing wires) vs. sources (biggest: incoming funds; only costly source: intraday credit).", why: "A precise, listy classification GARP likes to test with 'which is the single biggest X' questions." },
    { stars: 2, what: "Four governance pillars, especially the three-lines-of-defense reapplication with corporate risk management emphasized.", why: "Connects to R41's foundational governance framework and is directly quizzed in the source module quiz." }
  ],

  recall: [
    { q: "A bank wants to measure its own contribution to systemic payment-system risk, not just its personal exposure. Which metric should it use?", a: "Intraday credit relative to Tier 1 capital — this metric specifically captures how much unsecured, available intraday credit the bank extends relative to its capital base, reflecting its potential impact on the broader financial system if that credit were to fail. Daily maximum usage only measures the bank's own worst-case exposure, and client usage only measures client-specific risk." },
    { q: "Why is intraday credit singled out as the one source of intraday liquidity with a genuine financial cost?", a: "Unlike a bank's own cash balances or liquid assets (which cost nothing extra to deploy intraday), intraday credit from central banks typically requires either an explicit interest charge or high-quality collateral to be pledged (an opportunity cost of tying up that collateral) — making it the one source where using it has a real, measurable financial cost." },
    { q: "What is the single biggest use of intraday liquidity, and why is it hard to forecast?", a: "Outgoing wire transfers. Transfers the bank makes for itself have roughly one-to-two-days' lead time and are relatively predictable, but transfers made on behalf of clients occur steadily throughout the day and are often unpredictable — which is why outgoing payments must be actively monitored (and sometimes slightly delayed) to keep the intraday overdraft within the intraday credit limit." }
  ],

  hooks: [
    { title: "Three lenses on risk", text: "My own worst moment (daily max usage), my client's exposure (client usage), everyone's exposure through me (intraday credit/Tier 1) — three metrics answering three genuinely different questions." },
    { title: "A cash register that must never hit zero mid-shift", text: "Intraday liquidity management is like running a store's register through a single business day: sales (incoming funds) and payouts (outgoing wires) both flow continuously, and the manager's job is to keep the drawer above zero every minute, not just balance the books at closing time." }
  ],

  eli5: `<p>Imagine you run a lemonade stand that's open all day. Customers pay you cash throughout the day (that's your "incoming funds flow" — your biggest source of cash), but you also have to keep buying more lemons and sugar from a delivery truck that shows up at random times, and you have to pay your helper's wages as the day goes on (that's your "outgoing wire transfers" — your biggest use of cash). Most of the time your cash box has enough, but if a big lemon delivery shows up right after a slow stretch of customers, you might run short for an hour. Your mom, standing nearby, will lend you $20 for that hour, no questions asked, as long as you pay her back before you close the stand for the night — but she charges you a dime of interest for every dollar borrowed, because she's not a charity. That short-term loan from mom is exactly like "intraday credit" from a central bank: it must be repaid the same day and it's the one source of cash that actually costs you something, unlike the money already sitting in your cash box (which costs nothing to spend). And the bigger idea — how much you rely on mom's loan relative to how much money you personally have saved up — maps to a bank's "intraday credit relative to Tier 1 capital," the number regulators watch to see how much risk you're quietly pushing onto others if your IOU to mom ever went bad.</p>`,

  thinkLike: `<p>A treasury risk manager reading this material does not think in terms of "will the bank be solvent tomorrow?" — that question is already answered by the reading's on stress testing and reserves. Instead they think in terms of minutes: "at 11am, given the wires we've already sent and the settlements still pending at 2pm, will our intraday overdraft breach our credit line before more cash lands?" That means building forecasts around the predictable pieces (the bank's own scheduled wires, securities settlements, fixed-asset purchases) while building buffers and monitoring around the unpredictable pieces (client wire requests, client loan draws, nostro account activity driven by client behavior abroad). The practitioner also constantly separates three distinct questions that the exam loves to blur together: "how bad was my worst moment today?" (daily maximum usage — a purely internal, backward-looking number), "how exposed am I to my clients' overdraft behavior?" (client intraday credit usage), and "how much risk do I create for the rest of the financial system through my unsecured intraday credit?" (intraday credit relative to Tier 1 capital — the only one of the three that is a genuine systemic-risk metric, because it is the one number a regulator worried about contagion across the payment system would actually want to see). Expect GARP to test this reading with "which of these four/five listed items is the single biggest X" and "which metric answers which question" style items rather than calculations — it is a listy, taxonomy-heavy reading, and the exam rewards knowing precisely which bucket each item belongs in rather than the general gist.</p>`,

  breakdown: [
    {
      title: "Uses of intraday liquidity (5 items)",
      points: [
        "Outgoing wire transfers — the single biggest use; for the bank itself (predictable, ~1-2 days' lead time) or for clients (often unpredictable, steady all day); must be monitored to stay within the intraday credit limit.",
        "Settlements at Payment Clearing and Settlement (PCS) systems — often settle once daily near day's end; same-day settlement amounts are hard to forecast, multi-day ones easier.",
        "Funding of nostro accounts — correspondent bank accounts held abroad; securities-settlement activity is easier to forecast than client-driven activity.",
        "Collateral pledging — required for transactions like margin trading; results in cash outflow, forecast from trading volume and price-change data.",
        "Asset purchases/funding — covers securities purchases, fixed-asset purchases, and client loans/credit-line draws; securities/fixed-asset purchases are easier to forecast than client loan draws."
      ]
    },
    {
      title: "Sources of intraday liquidity (6 items)",
      points: [
        "Cash balances — held at the central bank and correspondent banks; own-operations-driven balances are easier to forecast than client-activity-driven ones.",
        "Incoming funds flow — the single biggest source; payment inflows and FMU settlements, arriving instantaneously or in batches.",
        "Intraday credit — temporary overdraft from the central bank, zeroed out by day's end; the ONE source with a genuine explicit interest cost or collateral opportunity cost.",
        "Liquid assets — near-cash items: money market instruments, time deposits, government securities maturing within one year.",
        "Overnight borrowings — repaid the NEXT day (unlike intraday credit); a cost-benefit tradeoff between excess liquidity and insufficient liquidity.",
        "Other term funding — extension of overnight borrowing out to a week or month; supplemental/occasional rather than routine."
      ]
    },
    {
      title: "Governance — the four pillars",
      points: [
        "Active risk management — treat intraday liquidity risk as proactively manageable, not a passive given; settlement and systemic risk are explicitly named in the risk appetite statement.",
        "Integration with risk governance — woven into the three lines of defense (treasury, corporate risk management — emphasized here, internal audit); senior personnel involved, oversight committees balance treasury and IT.",
        "Risk assessment — focused on settlement risk; business units and risk management assess internal controls' ability to reduce it.",
        "Risk measurement and monitoring — tracked via dollar value of intraday credit PROVIDED to customers and dollar value of intraday credit USED by the firm."
      ]
    },
    {
      title: "Tracking intraday flows (6 items)",
      points: [
        "Total payments — amount, time, payer, payee for every electronic payment; rolls up into totals sent/received, net settlement position, volume trends.",
        "Other cash transactions — intraday/ending settlement positions across all FMUs the bank participates in.",
        "Settlement positions — position with each FMU; deadlines and large amounts make trend-watching essential for anticipating liquidity needs.",
        "Time-sensitive obligations — deadlines whose breach (even same-day) triggers penalties.",
        "Total intraday credit lines to clients and counterparties — actual vs. potential credit extended, tracked for maximum exposure and usage patterns.",
        "Total bank intraday credit lines available and usage — the bank's own systemic-risk contribution, comparing normal usage to maximum available (committed + uncommitted) credit."
      ]
    },
    {
      title: "Monitoring risk levels (4 items)",
      points: [
        "Daily maximum intraday liquidity usage — the day's most-negative balance divided by the credit line limit; calculated after the fact, viewed across all cash accounts combined; measures the bank's OWN exposure.",
        "Intraday credit relative to Tier 1 capital — ratio of UNSECURED, AVAILABLE (not used) intraday credit to Tier 1 capital; the key SYSTEMIC-risk metric, since collateral pledging already reduces settlement risk.",
        "Client intraday credit usage — each client's highest intraday borrowing as a fraction of their credit line, aggregated; flags consistently-overdrawn clients; measures CLIENT-specific risk.",
        "Payment throughput — proportion of outgoing payments made by various points in the day; tracks patterns, ensures on-time-payment compliance with FMU rules, identifies peak strain periods."
      ]
    }
  ],

  quiz: [
    {
      q: "A new bank treasurer wants to understand the bank's daily cash inflows and outflows. Which of the following is the most significant USE of intraday liquidity?",
      options: ["Asset purchases/funding", "Funding of nostro accounts", "Outgoing wire transfers", "Settlements at payment clearing and settlement (PCS) systems"],
      answer: 2,
      why: "Outgoing wire transfers — for the bank itself or on behalf of clients, occurring steadily throughout the day — are explicitly identified as the single most significant use of intraday liquidity. Asset purchases and nostro funding are real uses but smaller and more forecastable; PCS settlements typically happen just once near day's end, so they don't dominate intraday flow the way continuous wire activity does."
    },
    {
      q: "A bank treasurer is trying to minimize liquidity funding costs. Which source of intraday liquidity is most likely to carry the greatest explicit financial cost?",
      options: ["Cash balances", "Incoming funds flow", "Intraday credit", "Liquid assets"],
      answer: 2,
      why: "Intraday credit from the central bank is the one source that may carry an explicit interest charge, or alternatively require pledging high-quality collateral (an opportunity cost). Cash balances and liquid assets are the bank's own assets and cost nothing extra to deploy; incoming funds flow has no financial cost associated with receiving it at all — it's the tempting-but-wrong distractor because people assume 'funds flow' implies some transaction fee, which the source does not support."
    },
    {
      q: "Which metric is most appropriate for determining a bank's contribution to SYSTEMIC risk in the payment system?",
      options: ["Client intraday credit usage", "Intraday credit relative to Tier 1 capital", "Daily maximum intraday liquidity usage", "Total intraday credit lines to clients and counterparties"],
      answer: 1,
      why: "Intraday credit relative to Tier 1 capital — specifically the ratio of unsecured, available intraday credit to Tier 1 capital — is the metric built to capture systemic risk, because it isolates the uncollateralized (genuinely risky) credit exposure against the bank's capital cushion. Daily maximum usage is a tempting distractor because it also sounds like a 'big risk number,' but it only measures the bank's own worst intraday moment, not its impact on the wider system; client usage measures risk the bank's clients create, not the bank's own systemic footprint."
    },
    {
      q: "A bank's most negative intraday balance on a given day was $80 million against a $100 million committed intraday credit line. What is the daily maximum intraday liquidity usage for that day?",
      options: ["8%", "20%", "80%", "125%"],
      answer: 2,
      why: "Daily maximum intraday liquidity usage = most negative balance of the day ÷ credit line limit = 80 / 100 = 80%. The 20% distractor comes from mistakenly computing the unused portion (100 − 80) rather than the used portion; 125% inverts the ratio (100/80); 8% misplaces a decimal."
    },
    {
      q: "In the context of governance structures for intraday liquidity risk, which line of defense receives particular emphasis, according to the reading?",
      options: ["Treasury", "Internal audit", "Information technology", "Corporate risk management"],
      answer: 3,
      why: "The reading singles out corporate risk management as the emphasized second line of defense — responsible for funding policies and procedures, firm-wide monitoring, and consolidated reporting. Treasury executes the day-to-day cash management (a plausible-sounding distractor since it 'does' the liquidity work), and IT/internal audit play supporting or oversight roles, but neither is the emphasized line in this governance discussion."
    },
    {
      q: "Which of the following is LEAST likely to increase a bank treasurer's challenge in staying within the intraday credit limit?",
      options: ["Cash flow volatility", "Credit quality of the bank's own cash and liquid assets", "Insufficient real-time balance data", "Securities price volatility (triggering margin calls)"],
      answer: 1,
      why: "The bank's own cash balances and liquid assets are inherently high credit quality (near-zero default risk instruments like money market instruments and short government securities), so their credit quality is not a source of added intraday management difficulty. Cash flow volatility, lack of real-time data, and securities price volatility (which drives sudden margin-related collateral outflows) are all explicitly cited as real challenges to managing intraday positions."
    }
  ],

  sources: [
    { title: "Bank for International Settlements — Monitoring tools for intraday liquidity management", url: "https://www.bis.org/publ/bcbs225.htm", note: "The Basel Committee framework behind the intraday liquidity monitoring metrics discussed in this reading, including intraday credit usage measures." },
    { title: "Federal Reserve — Daylight Overdrafts and Payment System Risk", url: "https://www.federalreserve.gov/paymentsystems/psr_about.htm", note: "The Fed's own description of intraday (daylight) credit/overdraft policy — the real-world analog of the 'intraday credit' source discussed in this reading." },
    { title: "Investopedia — Nostro Account", url: "https://www.investopedia.com/terms/n/nostroaccount.asp", note: "Plain-language explainer of nostro accounts, one of the uses of intraday liquidity covered here." },
    { title: "GARP — FRM Program", url: "https://www.garp.org/frm", note: "Official FRM curriculum page, for the reading's place within Part II Liquidity and Treasury Risk Measurement and Management." }
  ],

  pdf: { book: 4, query: "This reading examines intraday liquidity and begins with the basics" },

  summary: `<p><strong>Uses</strong>: outgoing wires (biggest), PCS settlements, nostro funding, collateral pledging, asset purchases. <strong>Sources</strong>: cash balances, incoming funds (biggest), intraday credit (the ONE costly source), liquid assets, overnight borrowings, other term funding. <strong>Four governance pillars</strong>: active risk management, three-lines integration (corporate risk management emphasized), risk assessment (settlement risk focus), measurement/monitoring (credit provided to customers vs. credit used by the firm). <strong>Tracking</strong> (total payments, other cash transactions, settlement positions, time-sensitive obligations, credit lines to clients, bank's own credit lines) vs. <strong>monitoring risk</strong> (daily max usage = own exposure; intraday credit/Tier 1 = systemic risk — the key distinction; client usage = client-specific risk; payment throughput = timing patterns).</p>`
});
