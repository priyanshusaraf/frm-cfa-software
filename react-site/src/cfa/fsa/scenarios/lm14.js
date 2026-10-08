/* LM14 Evaluating Quality of Financial Reports: a manipulation gallery.
   Every scenario runs the SAME economic events through two columns: a faithful
   report and a biased one. The student watches the trick move across the
   income statement, balance sheet and cash flow statement, and the ratio
   table shows the red flag an analyst would see. Numbers are illustrative,
   chosen so each effect is visible on its own; every scenario passes the
   ledger identities (debits = credits, A = L + E, cash ties). */
import { cash, asset, liab, equity, re, rev, exp, dr, cr } from "./_kit.js";

/* ---------- shared analyst ratios (each guards against an empty period) ---------- */
const round1 = (x) => Math.round(x * 10) / 10;
const margin = (S) => (S.tag("sales") > 0.005 ? S.NI / S.tag("sales") : null);
const dso = (S) => (S.tag("sales") > 0.005 ? round1((S.v("BS:rec") / S.tag("sales")) * 365) : null);
const cfoToNi = (S) => (Math.abs(S.NI) > 0.005 ? S.CFO / S.NI : null);
const cfAccruals = (S) => S.NI - S.CFO - S.CFI;

/* ------------------------------------------------------------------ */
const channelStuffing = {
  id: "lm14-channel-stuffing",
  module: "lm14",
  title: "Channel stuffing: borrowing next year's sales",
  standard: "Revenue recognition (IFRS 15 / ASC 606)",
  summary:
    "Halcyon Appliances sells through distributors. Two days before year end the aggressive column ships 300 of goods nobody ordered and books them as sales. Watch revenue and receivables jump with no cash behind them, days sales outstanding balloon, and the whole gain come back out next year as returns.",
  accounts: [
    cash(),
    asset("rec", "Accounts receivable"),
    asset("inv", "Inventory"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    rev("returns", "Sales returns", { tags: ["sales"] }),
    exp("cogs", "Cost of sales", { tags: ["cogs"] }),
    exp("opex", "Operating expenses"),
  ],
  columns: [
    { id: "faithful", label: "Faithful", sub: "revenue when the customer takes control", opening: { cash: 1000, rec: 300, inv: 500, ppe: 1200, sc: 2000, re: 1000 } },
    { id: "aggressive", label: "Aggressive", sub: "ships unordered goods in late December", opening: { cash: 1000, rec: 300, inv: 500, ppe: 1200, sc: 2000, re: 1000 } },
  ],
  steps: [
    {
      title: "Year 1: buy 1,200 of inventory and sell it for 2,000 on credit",
      prompt: "Both columns buy 1,200 of inventory for cash and sell it to distributors for 2,000 on credit.",
      html:
        "Ordinary business, identical in both columns. Halcyon pays suppliers 1,200 in cash, then sells the goods for 2,000 on credit. Revenue is recognized because the distributors ordered the goods and took control of them: that is the test under IFRS 15 and ASC 606, not whether an invoice was printed.",
      entries: {
        faithful: [dr("inv", 1200), cr("cash", 1200, "CFO", "Paid to suppliers"), dr("rec", 2000), cr("sales", 2000), dr("cogs", 1200), cr("inv", 1200)],
        aggressive: [dr("inv", 1200), cr("cash", 1200, "CFO", "Paid to suppliers"), dr("rec", 2000), cr("sales", 2000), dr("cogs", 1200), cr("inv", 1200)],
      },
    },
    {
      title: "Year 1: collect 2,000 from customers and pay 500 of operating costs",
      prompt: "Both columns collect 2,000 of receivables and pay 500 of operating expenses in cash.",
      html:
        "Still identical. Customers pay what they owe, so receivables are back at the opening 300. Net income is 300 and cash from operating activities (CFO) is also 300: every unit of profit arrived as cash, which is what a clean year looks like.",
      entries: {
        faithful: [dr("cash", 2000, "CFO", "Received from customers"), cr("rec", 2000), dr("opex", 500), cr("cash", 500, "CFO", "Paid for operating expenses")],
        aggressive: [dr("cash", 2000, "CFO", "Received from customers"), cr("rec", 2000), dr("opex", 500), cr("cash", 500, "CFO", "Paid for operating expenses")],
      },
      insight: "Net profit margin 15.0%, days sales outstanding (DSO) about 55 days, CFO / net income 1.00x. Remember these: they are the benchmark the trick will distort.",
    },
    {
      title: "December 28: ship 300 of goods distributors did not order",
      prompt: "The aggressive column ships goods costing 180 to distributors who did not order them and invoices them for 300. The faithful column does not.",
      html:
        "The sales director is 120 of profit short of the bonus target. The aggressive column loads distributors with stock they did not ask for, on terms that let them send it back, and books the invoice as revenue. The faithful column records nothing: no customer has accepted these goods, so control has not passed and there is no sale.",
      entries: {
        faithful: [],
        aggressive: [dr("rec", 300), cr("sales", 300), dr("cogs", 180), cr("inv", 180)],
      },
      notes: {
        faithful: "Goods stay in Halcyon's inventory at cost of 180.",
        aggressive: "Revenue +300, cost of sales +180, profit +120. Not one unit of cash moves.",
      },
      memo: {
        title: "What the trick did to year 1 (aggressive vs faithful)",
        rows: [
          ["Revenue", "2,300 vs 2,000"],
          ["Net income", "420 vs 300 (+40%)"],
          ["Receivables", "600 vs 300"],
          ["DSO = receivables / revenue x 365", "95.2 vs 54.8 days"],
          ["CFO / net income", "0.71x vs 1.00x"],
        ],
      },
      insight:
        "Profit rose 40% while cash did not move at all. The red flags are mechanical: receivables doubled while revenue rose 15%, so DSO jumped from about 55 to about 95 days, and CFO fell from 100% of net income to 71% of it.",
      exam: "A vignette that mentions a surge of shipments in the last weeks of the year, unusually generous return rights, or receivables growing faster than revenue is describing channel stuffing.",
    },
    { title: "Close year 1", html: "Net income rolls into retained earnings and the income and cash flow statements restart for year 2. The aggressive column carries 120 of extra retained earnings, and 300 of receivables that will never be collected.", entries: {}, close: true, practice: false },
    {
      title: "Year 2, January: distributors send back the unwanted goods",
      prompt: "In the aggressive column the distributors return all 300 of the goods shipped in December; the goods (cost 180) go back into inventory.",
      html:
        "The distributors never wanted the stock, so they return it. The aggressive column books a sales return of 300, cancels the receivable, and puts the 180 of goods back into inventory by reversing cost of sales. Year 2 starts 120 of profit in the hole: the profit was not created in December, only borrowed from the future.",
      entries: {
        faithful: [],
        aggressive: [dr("returns", 300), cr("rec", 300), dr("inv", 180), cr("cogs", 180)],
      },
      insight: "Balance sheets are identical again: same receivables (300), same inventory (500), same cash. Only the timing of profit differs.",
    },
    {
      title: "Year 2: ordinary trading, identical in both columns",
      prompt: "Both columns repeat year 1's trading: buy 1,200 of inventory for cash, sell it for 2,000 on credit, collect 2,000, pay 500 of operating costs.",
      html:
        "Same business as year 1. The faithful column earns 300 again. The aggressive column earns 300 minus the 120 it pulled into last year, so it reports 180. Over the two years both columns earn exactly 600: channel stuffing moves profit between periods, it never creates any.",
      entries: {
        faithful: [
          dr("inv", 1200), cr("cash", 1200, "CFO", "Paid to suppliers"), dr("rec", 2000), cr("sales", 2000), dr("cogs", 1200), cr("inv", 1200),
          dr("cash", 2000, "CFO", "Received from customers"), cr("rec", 2000), dr("opex", 500), cr("cash", 500, "CFO", "Paid for operating expenses"),
        ],
        aggressive: [
          dr("inv", 1200), cr("cash", 1200, "CFO", "Paid to suppliers"), dr("rec", 2000), cr("sales", 2000), dr("cogs", 1200), cr("inv", 1200),
          dr("cash", 2000, "CFO", "Received from customers"), cr("rec", 2000), dr("opex", 500), cr("cash", 500, "CFO", "Paid for operating expenses"),
        ],
      },
      insight: "Year 2 net margin: 15.0% faithful, 10.6% aggressive (180 / 1,700). A company that stuffs the channel has to stuff it again, and harder, every year to hide the reversal.",
      exam: "Total earnings over the two years are equal; the pattern (a spike, then a drop with returns) is the signature. Sunbeam's 1997 results are the best-known real example.",
    },
  ],
  ratios: [
    { label: "Net revenue", fn: (S) => S.tag("sales"), fmt: "num" },
    { label: "Net profit margin", fn: margin, fmt: "pct" },
    { label: "Days sales outstanding (year-end receivables)", fn: dso, fmt: "num" },
    { label: "CFO / net income", fn: cfoToNi, fmt: "x" },
    { label: "Cash-flow accruals (NI - CFO - CFI)", fn: cfAccruals, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const capitalizeCosts = {
  id: "lm14-capitalize-costs",
  module: "lm14",
  title: "Capitalizing an operating cost",
  standard: "Expense recognition (IAS 16, IAS 38 / ASC 360)",
  summary:
    "Corvid Networks pays other carriers 1,000 a year for network access, a plain operating cost. The aggressive column calls it an asset. Watch net income AND cash from operations both rise, because the outflow moves to investing, while total cash is identical.",
  accounts: [
    cash(),
    asset("ppe", "Network equipment (net)", "nca"),
    asset("capx", "Capitalized network access costs", "nca"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("lineCost", "Network access costs"),
    exp("opex", "Other operating expenses"),
    exp("dep", "Depreciation and amortization"),
  ],
  columns: [
    { id: "faithful", label: "Faithful", sub: "expensed as incurred", opening: { cash: 1500, ppe: 2500, sc: 3000, re: 1000 } },
    { id: "aggressive", label: "Aggressive", sub: "capitalized, amortized over 5 years", opening: { cash: 1500, ppe: 2500, sc: 3000, re: 1000 } },
  ],
  steps: [
    {
      title: "Bill customers 3,000 and collect it in cash",
      prompt: "Both columns earn and collect 3,000 of revenue in cash.",
      html: "Identical in both columns. Revenue is not where this trick lives.",
      entries: {
        faithful: [dr("cash", 3000, "CFO", "Received from customers"), cr("sales", 3000)],
        aggressive: [dr("cash", 3000, "CFO", "Received from customers"), cr("sales", 3000)],
      },
    },
    {
      title: "Pay 1,500 of other operating costs",
      prompt: "Both columns pay 1,500 of other operating expenses in cash.",
      html: "Salaries, rent, marketing. Expensed in both columns, as they should be.",
      entries: {
        faithful: [dr("opex", 1500), cr("cash", 1500, "CFO", "Paid for operating expenses")],
        aggressive: [dr("opex", 1500), cr("cash", 1500, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Pay 1,000 to other carriers for network access",
      prompt: "Both columns pay 1,000 in cash for this year's network access. The faithful column expenses it; the aggressive column records it as an asset.",
      html:
        "The payment buys this year's use of other carriers' lines. Its benefit is used up as the year goes by, so it is an expense. The aggressive column argues it is an investment in the network and puts it on the balance sheet. Two statements change at once: the expense disappears from the income statement, and the cash outflow leaves operating activities for investing activities.",
      entries: {
        faithful: [dr("lineCost", 1000), cr("cash", 1000, "CFO", "Paid for network access")],
        aggressive: [dr("capx", 1000), cr("cash", 1000, "CFI", "Capital expenditure")],
      },
      notes: {
        faithful: "Expense of 1,000; CFO outflow of 1,000.",
        aggressive: "Asset of 1,000; CFI outflow of 1,000. CFO looks 1,000 better.",
      },
      insight: "This is the WorldCom mechanism: line costs paid to other carriers were reclassified as capital expenditure, which lifted both earnings and operating cash flow.",
    },
    {
      title: "Year end: depreciation and amortization",
      prompt: "Both columns depreciate network equipment by 250. The aggressive column also amortizes the capitalized costs over 5 years.",
      html:
        "Both columns depreciate the existing network by 250. The aggressive column must also amortize its new asset: 1,000 over 5 years is 200 a year. So the cost does reach the income statement, but only a fifth of it this year. The other 800 is parked on the balance sheet, waiting to hit future earnings.",
      entries: {
        faithful: [dr("dep", 250), cr("ppe", 250)],
        aggressive: [dr("dep", 250), cr("ppe", 250), dr("dep", 200), cr("capx", 200)],
      },
      memo: {
        title: "Year 1, aggressive vs faithful",
        rows: [
          ["Net income", "1,050 vs 250"],
          ["CFO", "1,500 vs 500"],
          ["CFI", "(1,000) vs 0"],
          ["CFO + CFI", "500 vs 500"],
          ["Total assets", "5,050 vs 4,250"],
        ],
      },
      insight:
        "Net income is more than four times higher and CFO three times higher, yet the company has exactly the same cash. The one measure the trick cannot move is CFO + CFI, which is why analysts look at free cash flow, not CFO alone.",
      exam: "Capitalization raises net income, CFO and total assets, and lowers CFI, in the year of the spending. Later years carry the amortization. Cash-flow accruals (NI - CFO - CFI) swing from -250 to +550: a large positive accrual is the quantitative footprint.",
    },
  ],
  ratios: [
    { label: "Net profit margin", fn: margin, fmt: "pct" },
    { label: "Cash from operations (CFO)", fn: (S) => S.CFO, fmt: "num" },
    { label: "CFO + CFI", fn: (S) => S.CFO + S.CFI, fmt: "num" },
    { label: "Cash-flow accruals (NI - CFO - CFI)", fn: cfAccruals, fmt: "num" },
    { label: "Total assets", fn: (S) => S.TA, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const cookieJar = {
  id: "lm14-cookie-jar",
  module: "lm14",
  title: "Big bath and cookie jar: a restructuring provision",
  standard: "Provisions (IAS 37 / ASC 420)",
  summary:
    "Meridian Tools has a bad year and announces a plant closure that will really cost 100. The biased column books 300, making a bad year look terrible, then quietly releases the excess next year inside operating expenses. Watch a flat business turn into a dramatic recovery.",
  accounts: [
    cash(),
    liab("prov", "Restructuring provision", "cl"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    exp("restr", "Restructuring charge"),
  ],
  columns: [
    { id: "faithful", label: "Faithful", sub: "best estimate of the closure cost", opening: { cash: 2000, sc: 1500, re: 500 } },
    { id: "biased", label: "Conservative bias", sub: "big bath, then cookie jar", opening: { cash: 2000, sc: 1500, re: 500 } },
  ],
  steps: [
    {
      title: "Year 1: a weak year of trading",
      prompt: "Both columns earn 1,000 of revenue in cash and pay 900 of operating expenses in cash.",
      html: "Revenue of 1,000, operating costs of 900, identical in both columns. Before any restructuring, profit is a thin 100.",
      entries: {
        faithful: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 900), cr("cash", 900, "CFO", "Paid for operating expenses")],
        biased: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 900), cr("cash", 900, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Year 1: announce a plant closure",
      prompt: "Meridian commits to close a plant. The best estimate of severance and closure costs is 100. The faithful column provides 100; the biased column provides 300.",
      html:
        "A provision is a liability of uncertain amount, measured at management's best estimate. Here the honest estimate is 100. The biased column books 300. The reasoning is cynical but common: the year is already bad and the market will blame the old strategy, so a bigger loss now costs management little and creates a reserve to draw on later. That is the <b>big bath</b>.",
      entries: {
        faithful: [dr("restr", 100), cr("prov", 100)],
        biased: [dr("restr", 300), cr("prov", 300)],
      },
      notes: { biased: "200 more than the best estimate: the cookie jar is being filled." },
      insight: "Year 1 net income: 0 faithful, (200) biased. The bias is conservative (it understates this year's profit), and it is still bias.",
    },
    { title: "Close year 1", html: "The biased column carries a provision of 300 against a real obligation of 100.", entries: {}, close: true, practice: false },
    {
      title: "Year 2: trading is unchanged",
      prompt: "Both columns again earn 1,000 of revenue in cash and pay 900 of operating expenses in cash.",
      html: "The business has not improved at all: same revenue, same costs, an underlying profit of 100.",
      entries: {
        faithful: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 900), cr("cash", 900, "CFO", "Paid for operating expenses")],
        biased: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 900), cr("cash", 900, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Year 2: pay the real closure costs of 100",
      prompt: "Both columns pay 100 of severance and closure costs in cash, using the provision.",
      html: "The actual cost turns out to be exactly the honest estimate. Paying it reduces the provision and cash; it is not an expense again, because the expense was recognized when the provision was made.",
      entries: {
        faithful: [dr("prov", 100), cr("cash", 100, "CFO", "Paid restructuring costs")],
        biased: [dr("prov", 100), cr("cash", 100, "CFO", "Paid restructuring costs")],
      },
    },
    {
      title: "Year 2 end: 'revise' the estimate and release the unused 200",
      prompt: "The biased column releases the unused 200 of provision, crediting operating expenses.",
      html:
        "The biased column now holds 200 of provision it will never need. It releases the excess, and it credits the release to operating expenses, where it reads as cost control rather than as a reversal. This is the <b>cookie jar</b>: a reserve filled in a bad year and dipped into when earnings need help.",
      entries: {
        faithful: [],
        biased: [dr("prov", 200), cr("opex", 200)],
      },
      memo: {
        title: "Two-year story, biased vs faithful",
        rows: [
          ["Year 1 net income", "(200) vs 0"],
          ["Year 2 net income", "300 vs 100"],
          ["Year 2 operating expenses / revenue", "70% vs 90%"],
          ["Two-year total net income", "100 vs 100"],
        ],
      },
      insight:
        "The faithful column reports a flat business: 0 then 100. The biased column reports a turnaround: a loss of 200, then a profit of 300 with operating costs mysteriously down from 90% to 70% of revenue. Cash is identical in both, every year.",
      exam: "Conservative choices are not 'safe'. A big bath in one period sets up inflated earnings in the next. Watch for provisions that shrink faster than the related cash payments, and for operating margins that improve with no change in revenue.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Operating expenses / revenue", fn: (S) => (Math.abs(S.tag("sales")) > 0.005 ? -S.v("IS:opex") / S.tag("sales") : null), fmt: "pct" },
    { label: "Cash from operations (CFO)", fn: (S) => S.CFO, fmt: "num" },
    { label: "Provision on the balance sheet", fn: (S) => S.v("BS:prov"), fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const cfoBoost = {
  id: "lm14-cfo-boost",
  module: "lm14",
  title: "Window dressing CFO: stretch payables, sell receivables",
  standard: "Statement of cash flows (IAS 7 / ASC 230)",
  summary:
    "Oakridge Retail's operating cash flow is weak. In the last week of the year the window-dressed column holds back supplier payments and sells receivables to a factor. Net income does not change by a cent; CFO multiplies tenfold. Then watch it all unwind in January.",
  accounts: [
    cash(),
    asset("rec", "Accounts receivable"),
    asset("inv", "Inventory"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    liab("ap", "Accounts payable", "cl"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("cogs", "Cost of sales", { tags: ["cogs"] }),
    exp("opex", "Operating expenses"),
  ],
  columns: [
    { id: "ordinary", label: "Ordinary", sub: "pays suppliers on time, keeps its receivables", opening: { cash: 300, rec: 800, inv: 600, ppe: 1300, ap: 500, sc: 1500, re: 1000 } },
    { id: "dressed", label: "Window-dressed", sub: "stretches payables, factors receivables", opening: { cash: 300, rec: 800, inv: 600, ppe: 1300, ap: 500, sc: 1500, re: 1000 } },
  ],
  steps: [
    {
      title: "Sell 4,000 on credit and collect 3,800",
      prompt: "Both columns sell 4,000 of goods on credit and collect 3,800 from customers.",
      html: "Identical in both columns. Receivables rise from 800 to 1,000 because collections lag sales.",
      entries: {
        ordinary: [dr("rec", 4000), cr("sales", 4000), dr("cash", 3800, "CFO", "Received from customers"), cr("rec", 3800)],
        dressed: [dr("rec", 4000), cr("sales", 4000), dr("cash", 3800, "CFO", "Received from customers"), cr("rec", 3800)],
      },
    },
    {
      title: "Buy 2,600 of goods on credit; goods costing 2,500 are sold",
      prompt: "Both columns buy 2,600 of inventory on credit and recognize 2,500 of cost of sales.",
      html: "Inventory rises by 100 and payables by 2,600. No cash yet.",
      entries: {
        ordinary: [dr("inv", 2600), cr("ap", 2600), dr("cogs", 2500), cr("inv", 2500)],
        dressed: [dr("inv", 2600), cr("ap", 2600), dr("cogs", 2500), cr("inv", 2500)],
      },
    },
    {
      title: "Pay suppliers 2,100 and operating costs 1,200",
      prompt: "Both columns pay 2,100 to suppliers and 1,200 of operating expenses in cash.",
      html: "Still identical. Net income for the year is now fixed at 300 (4,000 - 2,500 - 1,200), and nothing that follows will change it.",
      entries: {
        ordinary: [dr("ap", 2100), cr("cash", 2100, "CFO", "Paid to suppliers"), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
        dressed: [dr("ap", 2100), cr("cash", 2100, "CFO", "Paid to suppliers"), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Last week of December: 400 of supplier invoices fall due",
      prompt: "The ordinary column pays 400 of supplier invoices on their due date. The window-dressed column holds them until January.",
      html:
        "The ordinary column pays on time. The window-dressed column simply does not pay until January. Payables stay 400 higher and cash stays 400 higher, so CFO is 400 better. The cost is invisible in this year's statements: strained supplier relationships, lost early-payment discounts, perhaps worse terms next year.",
      entries: {
        ordinary: [dr("ap", 400), cr("cash", 400, "CFO", "Paid to suppliers")],
        dressed: [],
      },
      notes: { dressed: "Held until January. Accounts payable stays at 1,000." },
    },
    {
      title: "December 31: sell 500 of receivables to a factor",
      prompt: "The window-dressed column sells 500 of receivables to a factor for 500 in cash (ignore the factor's fee). The ordinary column keeps them.",
      html:
        "A factor pays cash today for receivables customers would have paid in January. Treated as a sale, the receivable leaves the balance sheet and the cash usually lands in CFO, blended into collections. To isolate the effect we ignore the factor's discount; in reality it would cost a small fee, so net income would fall slightly while CFO jumped.",
      entries: {
        ordinary: [],
        dressed: [dr("cash", 500, "CFO", "Received from customers"), cr("rec", 500)],
      },
      memo: {
        title: "Year-end, window-dressed vs ordinary",
        rows: [
          ["Net income", "300 vs 300"],
          ["CFO", "1,000 vs 100"],
          ["CFO / net income", "3.33x vs 0.33x"],
          ["Days sales outstanding", "45.6 vs 91.3 days"],
          ["Days payables outstanding", "146.0 vs 87.6 days"],
        ],
      },
      insight:
        "Same customers, same suppliers, same profit. CFO went from 100 to 1,000, and DSO even improved. The giveaways are a payables period that jumped, a sudden fall in receivables with no change in sales, and a note disclosing receivables sold or a factoring program.",
      exam: "If the company keeps the credit risk (sale with recourse), the transfer may not qualify for derecognition. The cash is then a borrowing, a financing inflow, and the receivable stays on the books. Analysts reclassify factoring proceeds out of CFO when assessing cash flow quality.",
    },
    { title: "Close the year", html: "Income statement and cash flow statement restart for year 2.", entries: {}, close: true, practice: false },
    {
      title: "Year 2, January: the boost unwinds",
      prompt: "The ordinary column collects the 500 its customers owe. The window-dressed column pays the 400 of supplier invoices it held back (its customers now pay the factor, not Oakridge).",
      html:
        "Now the bill comes due. The ordinary column collects 500 from customers. The window-dressed column collects nothing (those customers pay the factor) and must pay the 400 it held back. Year 2 CFO starts 900 behind: +500 versus (400). After this step the two balance sheets are identical: the trick moved cash between years and created none.",
      entries: {
        ordinary: [dr("cash", 500, "CFO", "Received from customers"), cr("rec", 500)],
        dressed: [dr("ap", 400), cr("cash", 400, "CFO", "Paid to suppliers")],
      },
      insight: "Stretching payables and selling receivables are one-off, unsustainable sources of CFO. To repeat the boost next year the company must stretch further and sell more.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Cash from operations (CFO)", fn: (S) => S.CFO, fmt: "num" },
    { label: "CFO / net income", fn: cfoToNi, fmt: "x" },
    { label: "Days sales outstanding", fn: dso, fmt: "num" },
    { label: "Days payables outstanding (payables / cost of sales x 365)", fn: (S) => (Math.abs(S.tag("cogs")) > 0.005 ? round1((S.v("BS:ap") / -S.tag("cogs")) * 365) : null), fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const bigBathImpairment = {
  id: "lm14-big-bath-impairment",
  module: "lm14",
  title: "Big bath impairment: write it down now, look better later",
  standard: "Impairment (IAS 36 / ASC 360)",
  summary:
    "Granite Works' plant has genuinely lost value. The faithful column writes it down to its recoverable amount; the big-bath column writes it down twice as far. Watch year 1 look worse, and every later year look better, through lower depreciation and a smaller asset base.",
  accounts: [
    cash(),
    asset("ppe", "Plant (net)", "nca"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    exp("dep", "Depreciation"),
    exp("imp", "Impairment loss"),
  ],
  columns: [
    { id: "faithful", label: "Faithful", sub: "write down to recoverable amount", opening: { cash: 500, ppe: 2000, sc: 1500, re: 1000 } },
    { id: "bath", label: "Big bath", sub: "write down far below it", opening: { cash: 500, ppe: 2000, sc: 1500, re: 1000 } },
  ],
  steps: [
    {
      title: "Year 1: revenue 1,500, cash operating costs 1,200",
      prompt: "Both columns earn 1,500 of revenue in cash and pay 1,200 of operating expenses in cash.",
      html: "Identical trading in both columns.",
      entries: {
        faithful: [dr("cash", 1500, "CFO", "Received from customers"), cr("sales", 1500), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
        bath: [dr("cash", 1500, "CFO", "Received from customers"), cr("sales", 1500), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Year 1: depreciate the plant, 2,000 over 10 years",
      prompt: "Both columns depreciate the plant straight-line: carrying amount 2,000, 10 years of remaining life.",
      html: "200 of depreciation in both columns. Carrying amount falls to 1,800 with 9 years left.",
      entries: {
        faithful: [dr("dep", 200), cr("ppe", 200)],
        bath: [dr("dep", 200), cr("ppe", 200)],
      },
    },
    {
      title: "Year end: demand has fallen, test the plant for impairment",
      prompt: "The plant's recoverable amount is 1,350. The faithful column writes it down to 1,350; the big-bath column writes it down to 900.",
      html:
        "The plant's recoverable amount (under IFRS, the higher of fair value less costs of disposal and value in use) is 1,350, so a loss of 450 is genuine. The big-bath column uses gloomier cash flow forecasts, which are management's own estimates and hard to challenge, and writes the plant down to 900: a loss of 900.",
      entries: {
        faithful: [dr("imp", 450), cr("ppe", 450)],
        bath: [dr("imp", 900), cr("ppe", 900)],
      },
      memo: {
        title: "Future depreciation over the 9 remaining years",
        rows: [
          ["Faithful: 1,350 / 9", "150 a year"],
          ["Big bath: 900 / 9", "100 a year"],
          ["Profit 'saved' for each future year", "50"],
        ],
      },
      insight: "Year 1 net income: (350) faithful, (800) big bath. The extra 450 of loss is not lost: it comes back as 50 of lower depreciation in each of the next 9 years.",
    },
    { title: "Close year 1", html: "Both columns start year 2 with the same cash.", entries: {}, close: true, practice: false },
    {
      title: "Year 2: same trading as year 1",
      prompt: "Both columns again earn 1,500 of revenue in cash and pay 1,200 of operating expenses in cash.",
      html: "Nothing about the business has changed.",
      entries: {
        faithful: [dr("cash", 1500, "CFO", "Received from customers"), cr("sales", 1500), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
        bath: [dr("cash", 1500, "CFO", "Received from customers"), cr("sales", 1500), dr("opex", 1200), cr("cash", 1200, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Year 2: depreciate the written-down plant",
      prompt: "Both columns depreciate the plant's new carrying amount straight-line over the 9 remaining years.",
      html:
        "Depreciation is now 150 faithful and 100 big bath. The big-bath column reports higher profit, a higher margin and a much higher return on assets, all manufactured by last year's write-down.",
      entries: {
        faithful: [dr("dep", 150), cr("ppe", 150)],
        bath: [dr("dep", 100), cr("ppe", 100)],
      },
      insight: "Year 2 return on assets: 6.5% faithful (150 / 2,300) against 10.5% big bath (200 / 1,900). A smaller denominator and a bigger numerator, from the same plant.",
      exam: "Under IFRS an impairment of PP&E can be reversed if the recoverable amount recovers (never above the carrying amount it would have had); under US GAAP an impairment of assets held for use is never reversed. An excessive IFRS write-down can therefore also come back later as a gain.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Net profit margin", fn: margin, fmt: "pct" },
    { label: "Return on assets (year-end)", fn: (S) => (Math.abs(S.tag("sales")) > 0.005 ? S.NI / S.TA : null), fmt: "pct" },
    { label: "Fixed asset turnover (revenue / plant)", fn: (S) => (Math.abs(S.tag("sales")) > 0.005 && S.v("BS:ppe") ? S.tag("sales") / S.v("BS:ppe") : null), fmt: "x" },
  ],
};

/* ------------------------------------------------------------------ */
const usefulLives = {
  id: "lm14-useful-lives",
  module: "lm14",
  title: "Stretching useful lives",
  standard: "Depreciation estimates (IAS 16 / ASC 360)",
  summary:
    "Tasman Freight buys a fleet of trucks. Peers depreciate trucks over 6 years; the aggressive column picks 10. No cash, no revenue, nothing real changes, yet profit rises. Watch the two footprints an analyst can compute from the notes: the implied useful life and the depreciation rate.",
  accounts: [
    cash(),
    asset("ppeG", "Trucks at cost", "nca"),
    asset("accDep", "Accumulated depreciation", "nca", { contra: true }),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Freight revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    exp("dep", "Depreciation"),
  ],
  columns: [
    { id: "peer", label: "Peer-standard", sub: "6-year life, no residual value", opening: { cash: 2000, sc: 1500, re: 500 } },
    { id: "stretched", label: "Aggressive", sub: "10-year life, no residual value", opening: { cash: 2000, sc: 1500, re: 500 } },
  ],
  steps: [
    {
      title: "Buy a fleet of trucks for 1,200 cash",
      prompt: "Both columns buy trucks for 1,200 in cash.",
      html: "Same trucks, same price, an investing outflow in both columns.",
      entries: {
        peer: [dr("ppeG", 1200), cr("cash", 1200, "CFI", "Purchase of trucks")],
        stretched: [dr("ppeG", 1200), cr("cash", 1200, "CFI", "Purchase of trucks")],
      },
    },
    {
      title: "Earn 1,000 of freight revenue; pay 600 of costs",
      prompt: "Both columns earn 1,000 of revenue in cash and pay 600 of operating expenses in cash.",
      html: "Identical operations.",
      entries: {
        peer: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 600), cr("cash", 600, "CFO", "Paid for operating expenses")],
        stretched: [dr("cash", 1000, "CFO", "Received from customers"), cr("sales", 1000), dr("opex", 600), cr("cash", 600, "CFO", "Paid for operating expenses")],
      },
    },
    {
      title: "Year-end depreciation",
      prompt: "The peer-standard column depreciates the trucks over 6 years; the aggressive column over 10 years. Straight-line, no residual value.",
      html:
        "1,200 / 6 = 200 for the peer-standard column; 1,200 / 10 = 120 for the aggressive one. Useful life is an estimate, and IFRS and US GAAP both leave it to management, so a longer life is not illegal. It is a choice, and if it is out of line with peers and with how long trucks really last, it is a biased one.",
      entries: {
        peer: [dr("dep", 200), cr("accDep", 200)],
        stretched: [dr("dep", 120), cr("accDep", 120)],
      },
      memo: {
        title: "Analyst footprints (from the PP&E note)",
        rows: [
          ["Implied useful life = gross PP&E / depreciation", "6.0 vs 10.0 years"],
          ["Depreciation rate = dep / (dep + net PP&E)", "16.7% vs 10.0%"],
          ["Net income", "200 vs 280"],
        ],
      },
      insight: "Net income is 40% higher with identical cash flows. Cash from operations is 400 in both columns: depreciation never touches cash.",
      exam: "A falling depreciation rate is exactly what the Beneish depreciation index (DEPI) picks up: DEPI = last year's rate / this year's rate, and a value above 1 means assets are being depreciated more slowly.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Net profit margin", fn: margin, fmt: "pct" },
    { label: "Implied useful life, years (gross PP&E / depreciation)", fn: (S) => (Math.abs(S.v("IS:dep")) > 0.005 ? round1(S.v("BS:ppeG") / -S.v("IS:dep")) : null), fmt: "num" },
    { label: "Depreciation rate (dep / (dep + net PP&E))", fn: (S) => { const d = -S.v("IS:dep"); const net = S.v("BS:ppeG") + S.v("BS:accDep"); return d > 0.005 ? d / (d + net) : null; }, fmt: "pct" },
    { label: "Cash from operations (CFO)", fn: (S) => S.CFO, fmt: "num" },
  ],
};

export default [channelStuffing, capitalizeCosts, cookieJar, cfoBoost, bigBathImpairment, usefulLives];
