/* LM15 Integration of Financial Statement Analysis Techniques: animated scenarios.
   Demo cast: Pinnacle Corp, a consumer goods multinational reporting under US
   GAAP, owns 30% of Kestrel Ltd (an associate, equity method). Every scenario
   is a two-column comparison: the statements as the company reports them, and
   the same statements after one analyst adjustment, so the student watches
   exactly which lines and ratios the adjustment moves. Numbers are
   illustrative and chosen so each effect is visible on its own. */
import { cash, asset, liab, equity, re, rev, exp, dr, cr } from "./_kit.js";

/* Same postings in every column (a routine event both views agree on). */
const both = (ids, list) => Object.fromEntries(ids.map((id) => [id, list]));

/* Ratio helpers. IS lines display credit-minus-debit, so tag("opcost") and
   tag("int") come back NEGATIVE; EBIT = sales + operating cost lines. */
const ebit = (S) => S.tag("sales") + S.tag("opcost");
const ebt = (S) => S.NI - S.tag("tax");
const safe = (n, d) => (Math.abs(d) > 1e-9 ? n / d : null);

/* ------------------------------------------------------------------ */
const STRIP = ["rep", "core"];
const stripOpen = { cash: 600, rec: 900, inv: 1500, ppe: 7000, debt: 4000, sc: 3000, re: 3000 };
const stripAssociate = {
  id: "lm15-strip-associate",
  module: "lm15",
  title: "Strip the associate out of Pinnacle's DuPont analysis",
  standard: "Analyst adjustment (equity method under US GAAP and IFRS)",
  summary:
    "Pinnacle's year is posted twice: once as reported, once with the 30% stake in Kestrel removed. Watch which DuPont factors the associate was quietly propping up: the tax burden and interest burden fall, asset turnover rises, and the EBIT margin does not move at all.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("inv", "Investment in associate (Kestrel)", "nca", { tags: ["assoc"] }),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    equity("carve", "Less: equity tied up in the associate (analyst)"),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses", { tags: ["opcost"] }),
    exp("intExp", "Interest expense", { tags: ["int"] }),
    rev("eqInc", "Share of profit of associate", { tags: ["eqinc"] }),
    exp("taxExp", "Income tax expense", { tags: ["tax"] }),
  ],
  columns: [
    { id: "rep", label: "As reported", sub: "associate included", opening: stripOpen },
    { id: "core", label: "Excluding the associate", sub: "analyst view of the operating business", opening: stripOpen },
  ],
  steps: [
    {
      title: "Pinnacle's own operations: revenue 9,000, operating costs 7,920",
      prompt: "Pinnacle collects 9,000 of revenue and pays 7,920 of operating expenses in cash.",
      html:
        "Both columns agree on everything Pinnacle does itself. EBIT (earnings before interest and taxes) is 9,000 - 7,920 = 1,080, a 12% margin. This is the number the associate can never touch, because Pinnacle presents its share of Kestrel's profit below EBIT.",
      entries: both(STRIP, [
        dr("cash", 9000, "CFO", "Cash received from customers"),
        cr("sales", 9000),
        dr("opex", 7920),
        cr("cash", 7920, "CFO", "Cash paid for operating expenses"),
      ]),
    },
    {
      title: "Pay interest of 200 and income tax of 220",
      prompt: "Pinnacle pays 200 of interest on its debt and 220 of income tax, both in cash.",
      html:
        "Tax is 25% of Pinnacle's OWN taxable profit: 25% x (1,080 - 200) = 220. Kestrel pays its own taxes, so the share of its profit arrives at Pinnacle already taxed. Keep that in mind: it is why equity income flatters the tax burden ratio.",
      entries: both(STRIP, [
        dr("intExp", 200),
        cr("cash", 200, "CFO", "Interest paid"),
        dr("taxExp", 220),
        cr("cash", 220, "CFO", "Income taxes paid"),
      ]),
    },
    {
      title: "Recognize 30% of Kestrel's net income of 600",
      prompt: "Kestrel, Pinnacle's 30% associate, reports net income of 600.",
      html:
        "Equity method: Pinnacle's share, 0.30 x 600 = 180, goes to the investment and to the income statement in one line. Pinnacle presents it between EBIT and pretax income. Pretax income is now 1,080 - 200 + 180 = 1,060, which is MORE than EBIT minus interest. No operating activity produced that 180.",
      entries: both(STRIP, [dr("inv", 180), cr("eqInc", 180)]),
      insight:
        "Look at the ratio table: interest burden (pretax income / EBIT) is 0.98 even though Pinnacle pays 200 of interest on 1,080 of EBIT. Without the associate it would be 0.81.",
    },
    {
      title: "Kestrel pays a dividend; Pinnacle receives 60",
      prompt: "Kestrel pays dividends; Pinnacle's share is 60 in cash.",
      html:
        "The dividend reduces the investment and is not income: Pinnacle already counted its share of the profit. The investment ends the year at 1,500 + 180 - 60 = 1,620. Under US GAAP the dividend is an operating cash inflow.",
      entries: both(STRIP, [dr("cash", 60, "CFO", "Dividends received from associate"), cr("inv", 60)]),
    },
    {
      title: "Analyst adjustment: remove the associate from income, assets and equity",
      prompt: "The analyst removes the associate entirely: its share of profit from the income statement and the investment from the balance sheet, assuming the stake was financed with equity.",
      html:
        "Three removals keep the view internally consistent. The 180 of equity income leaves net income and pretax income (it carried no tax at Pinnacle, so tax stays at 220). The 1,620 investment leaves total assets, because those assets generate no revenue for Pinnacle. And 1,620 leaves equity, on the assumption that the stake was paid for with shareholders' money rather than debt: 180 of it through lower net income this year and 1,440 through the contra line. Debt stays where it is.",
      entries: {
        core: [dr("eqInc", 180), dr("carve", 1440), cr("inv", 1620)],
      },
      notes: {
        rep: "No adjustment: this is what the annual report shows.",
        core: "The operating business alone: 9,000 of revenue earned on 9,220 of assets and 5,220 of equity.",
      },
      memo: {
        title: "Five-factor DuPont, ending balances",
        rows: [
          ["Tax burden (NI / EBT): 840 / 1,060 vs 660 / 880", "0.792 vs 0.750"],
          ["Interest burden (EBT / EBIT): 1,060 / 1,080 vs 880 / 1,080", "0.981 vs 0.815"],
          ["EBIT margin: 1,080 / 9,000 in both", "12.0% vs 12.0%"],
          ["Asset turnover: 9,000 / 10,840 vs 9,000 / 9,220", "0.830 vs 0.976"],
          ["Leverage: 10,840 / 6,840 vs 9,220 / 5,220", "1.585 vs 1.766"],
          ["ROE: 840 / 6,840 vs 660 / 5,220", "12.3% vs 12.6%"],
        ],
      },
      insight:
        "The EBIT margin is identical, so anyone who thinks the associate inflates margins is thinking of NET margin. What it inflates here is the tax burden and the interest burden, and it depresses asset turnover. The core business earns a slightly higher ROE than the group: Kestrel's 180 on 1,620 is an 11% return.",
      exam:
        "An interest burden above 1.0, or a tax burden well above one minus the statutory rate, is a signal that income from outside the operating business sits between EBIT and net income. Find it before you interpret the trend.",
    },
  ],
  ratios: [
    { label: "Return on equity", fn: (S) => safe(S.NI, S.TE), fmt: "pct" },
    { label: "Tax burden (NI / EBT)", fn: (S) => safe(S.NI, ebt(S)), fmt: "x3" },
    { label: "Interest burden (EBT / EBIT)", fn: (S) => safe(ebt(S), ebit(S)), fmt: "x3" },
    { label: "EBIT margin", fn: (S) => safe(ebit(S), S.tag("sales")), fmt: "pct" },
    { label: "Asset turnover", fn: (S) => safe(S.tag("sales"), S.TA), fmt: "x3" },
    { label: "Leverage (assets / equity)", fn: (S) => safe(S.TA, S.TE), fmt: "x3" },
  ],
};

/* ------------------------------------------------------------------ */
const LEASE = ["rep", "adj"];
const leaseOpen = { cash: 800, rec: 1200, ppe: 6000, debt: 3000, sc: 2500, re: 2500 };
const capitalizeCommitments = {
  id: "lm15-capitalize-commitments",
  module: "lm15",
  title: "Capitalizing operating lease commitments (pre-2019 reporting)",
  standard: "Analyst adjustment; built into IFRS 16 and ASC 842 from 2019",
  summary:
    "Before 2019 Pinnacle's store leases were operating leases: a rent line in operating expenses and nothing on the balance sheet. The analyst column treats them as what they economically are, an asset bought with borrowed money. Watch debt, EBIT, interest coverage and cash from operations move.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    asset("rou", "Leased assets, capitalized (analyst)", "nca"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    liab("lease", "Lease liability (analyst)", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses", { tags: ["opcost"] }),
    exp("rent", "Operating lease rent", { tags: ["opcost"] }),
    exp("dep", "Depreciation of leased assets", { tags: ["opcost"] }),
    exp("intExp", "Interest on debt", { tags: ["int"] }),
    exp("leaseInt", "Interest on lease liability", { tags: ["int"] }),
  ],
  columns: [
    { id: "rep", label: "As reported", sub: "operating leases off balance sheet", opening: leaseOpen },
    { id: "adj", label: "Analyst adjusted", sub: "commitments capitalized", opening: leaseOpen },
  ],
  steps: [
    {
      title: "Capitalize the lease commitments at the start of the year",
      prompt: "The lease note shows 108 a year of non-cancellable rent for 10 years. The analyst discounts it at Pinnacle's 6% borrowing rate to a present value of 800 and capitalizes it.",
      html:
        "Pinnacle has signed contracts to pay 108 a year for 10 years. It cannot walk away, so that promise is as binding as a bond coupon. The analyst records the present value, 800, twice: as an asset (the right to use the stores) and as a liability (the obligation to pay for them). No cash moves and equity does not change on day one. Debt rises from 3,000 to 3,800.",
      entries: { adj: [dr("rou", 800), cr("lease", 800)] },
      notes: { rep: "Nothing on the balance sheet: the commitments live only in the lease note." },
      memo: {
        title: "From the note to the balance sheet",
        rows: [
          ["Annual payments, non-cancellable", "108 x 10 years"],
          ["Discount rate (incremental borrowing rate)", "6%"],
          ["Analyst's present value (rounded)", "800"],
          ["Added to assets and to debt", "800"],
        ],
      },
      insight: "Debt to equity jumps the moment the commitments are capitalized, before a single income statement line has changed.",
    },
    {
      title: "Run the operating year: revenue 8,000, other costs 6,900, interest on debt 180",
      prompt: "Pinnacle collects 8,000 of revenue, pays 6,900 of operating costs (excluding rent) and 180 of interest on its debt, all in cash.",
      html: "Identical in both columns. Taxes are left out of this scenario so the lease effect stands alone.",
      entries: both(LEASE, [
        dr("cash", 8000, "CFO", "Cash received from customers"),
        cr("sales", 8000),
        dr("opex", 6900),
        cr("cash", 6900, "CFO", "Cash paid for operating expenses"),
        dr("intExp", 180),
        cr("cash", 180, "CFO", "Interest paid"),
      ]),
    },
    {
      title: "Pay the 108 of rent",
      prompt: "Pinnacle pays the year's 108 of lease payments.",
      html:
        "Same 108 of cash in both columns, different story. As reported, it is all rent, inside operating expenses and inside CFO (cash from operations). Adjusted, the payment is debt service: 6% x 800 = 48 is interest and the other 60 repays the liability. Separately, the leased asset is depreciated, 800 / 10 = 80, inside operating expenses. Interest paid stays in CFO (the US GAAP rule), while the 60 of principal is a financing outflow.",
      entries: {
        rep: [dr("rent", 108), cr("cash", 108, "CFO", "Operating lease payments")],
        adj: [
          dr("dep", 80),
          cr("rou", 80),
          dr("leaseInt", 48),
          dr("lease", 60),
          cr("cash", 48, "CFO", "Interest paid on leases"),
          cr("cash", 60, "CFF", "Repayment of lease liabilities"),
        ],
      },
      memo: {
        title: "Splitting the payment",
        rows: [
          ["Payment", "108"],
          ["Interest: 6% x 800", "48"],
          ["Principal repaid: 108 - 48", "60"],
          ["Depreciation: 800 / 10", "80"],
          ["Total expense adjusted: 80 + 48 vs rent 108", "128 vs 108"],
        ],
      },
      insight:
        "EBIT rises from 992 to 1,020 (rent of 108 replaced by depreciation of 80), but interest rises from 180 to 228, so coverage falls from 5.5x to 4.5x. Net income is 20 lower in this first year because interest is front-loaded. CFO is 60 higher and CFF 60 lower; total cash is identical.",
      exam:
        "This is exactly the pattern IFRS 16 now produces for every lessee: higher EBIT and EBITDA, higher CFO, lower CFF, higher debt, and lower net income early in a lease's life. US GAAP ASC 842 puts the same asset and liability on the balance sheet but keeps a single straight-line lease cost in operating expenses for operating leases, so EBIT and CFO do not change.",
    },
  ],
  ratios: [
    { label: "Debt / equity", fn: (S) => safe(S.tag("debt"), S.TE), fmt: "x3" },
    { label: "EBIT margin", fn: (S) => safe(ebit(S), S.tag("sales")), fmt: "pct" },
    { label: "Interest coverage (EBIT / interest)", fn: (S) => safe(ebit(S), -S.tag("int")), fmt: "x" },
    { label: "Asset turnover", fn: (S) => safe(S.tag("sales"), S.TA), fmt: "x3" },
    { label: "Cash from operations", fn: (S) => S.CFO, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const LIFO = ["lifo", "fifo"];
const lifoOpen = { cash: 400, rec: 500, stock: 800, ppe: 2000, ap: 900, debt: 900, sc: 1000, re: 900 };
const lifoToFifo = {
  id: "lm15-lifo-to-fifo",
  module: "lm15",
  title: "Restating Pinnacle from LIFO to FIFO",
  standard: "US GAAP LIFO restated for comparison with an IFRS peer",
  summary:
    "Pinnacle uses LIFO (last in, first out) under US GAAP; its IFRS peer cannot, because IFRS prohibits LIFO. The analyst restates Pinnacle to FIFO (first in, first out) using the LIFO reserve from the inventory note. Watch inventory, the deferred tax liability, equity, cost of sales and the current ratio.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("stock", "Inventory"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    liab("ap", "Accounts payable"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    liab("dtl", "Deferred tax liability", "ncl"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("cogs", "Cost of goods sold", { tags: ["cogs"] }),
    exp("opex", "Operating expenses"),
    exp("taxExp", "Income tax expense"),
  ],
  columns: [
    { id: "lifo", label: "As reported (LIFO)", sub: "US GAAP", opening: lifoOpen },
    { id: "fifo", label: "Restated to FIFO", sub: "analyst, comparable with IFRS peers", opening: lifoOpen },
  ],
  steps: [
    {
      title: "Restate the opening balance sheet: the LIFO reserve is 240",
      prompt: "The inventory note shows a beginning LIFO reserve of 240. The tax rate is 25%. Restate the opening balance sheet to FIFO.",
      html:
        "The LIFO reserve is the gap between FIFO and LIFO inventory: prices have risen, so LIFO carries old, cheap layers. Inventory goes up by the whole 240. That extra 240 is cumulative extra pretax profit FIFO would have reported, so 25% of it, 60, is tax and 75% of it, 180, is equity. The tax goes to a deferred tax liability because no tax is actually owed: the LIFO conformity rule makes Pinnacle use LIFO on its tax return too, and tax would only fall due if the old layers were liquidated.",
      entries: { fifo: [dr("stock", 240), cr("dtl", 60), cr("re", 180)] },
      memo: {
        title: "Balance sheet restatement",
        rows: [
          ["Inventory + LIFO reserve", "+240"],
          ["Deferred tax liability + reserve x t (25%)", "+60"],
          ["Equity + reserve x (1 - t)", "+180"],
        ],
      },
      insight: "Some analysts treat the 60 as taxes payable instead (a current liability), which makes the current ratio rise less. Whichever you choose, state it.",
    },
    {
      title: "Buy inventory of 2,850 for cash",
      prompt: "Pinnacle buys 2,850 of inventory for cash.",
      html: "A purchase is a purchase under any cost flow assumption, so both columns record the same 2,850.",
      entries: both(LIFO, [dr("stock", 2850), cr("cash", 2850, "CFO", "Cash paid to suppliers")]),
    },
    {
      title: "Sell goods for 4,000; LIFO cost of sales is 2,800",
      prompt: "Pinnacle sells goods for 4,000 cash. Its reported (LIFO) cost of those goods is 2,800.",
      html:
        "Both columns post the reported LIFO numbers first. The FIFO correction to cost of sales comes in its own step, so you can see it separately.",
      entries: both(LIFO, [dr("cash", 4000, "CFO", "Cash received from customers"), cr("sales", 4000), dr("cogs", 2800), cr("stock", 2800)]),
    },
    {
      title: "Pay operating expenses of 600 and income tax of 150",
      prompt: "Pinnacle pays 600 of operating expenses and 150 of income tax (25% of LIFO pretax income) in cash.",
      html: "Taxable income is computed on LIFO: 4,000 - 2,800 - 600 = 600, so tax paid is 150. That cash is real in both columns; FIFO restatement never changes cash.",
      entries: both(LIFO, [
        dr("opex", 600),
        cr("cash", 600, "CFO", "Cash paid for operating expenses"),
        dr("taxExp", 150),
        cr("cash", 150, "CFO", "Income taxes paid"),
      ]),
    },
    {
      title: "Restate this year's cost of sales: the reserve rose from 240 to 300",
      prompt: "The year-end LIFO reserve is 300 (beginning 240). Restate the year's income statement and closing balance sheet to FIFO.",
      html:
        "FIFO cost of sales = LIFO cost of sales - increase in the LIFO reserve = 2,800 - 60 = 2,740. Pretax income rises by 60, deferred tax expense by 15, net income by 45. On the balance sheet inventory now carries the full ending reserve (240 + 60 = 300), the deferred tax liability 75 and equity 225 more than LIFO.",
      entries: { fifo: [dr("stock", 60), cr("cogs", 60), dr("taxExp", 15), cr("dtl", 15)] },
      memo: {
        title: "FIFO income statement",
        rows: [
          ["LIFO cost of sales", "2,800"],
          ["Less increase in LIFO reserve (300 - 240)", "(60)"],
          ["FIFO cost of sales", "2,740"],
          ["Net income: 450 + 60 x (1 - 25%)", "495"],
        ],
      },
      insight:
        "FIFO shows higher inventory, higher equity, a higher current ratio and a higher gross margin, and a LOWER inventory turnover. In a period of rising prices LIFO gives the better income statement measure (current costs) and FIFO the better balance sheet measure (current inventory values).",
      exam: "If the reserve FELL during the year, LIFO layers were liquidated: old cheap costs flowed into cost of sales and LIFO profit was temporarily inflated. FIFO cost of sales is then HIGHER than LIFO cost of sales.",
    },
  ],
  ratios: [
    { label: "Current ratio", fn: (S) => safe(S.v("BS:ca"), S.v("BS:cl")), fmt: "x" },
    { label: "Gross margin", fn: (S) => safe(S.tag("sales") + S.tag("cogs"), S.tag("sales")), fmt: "pct" },
    { label: "Inventory turnover (ending inventory)", fn: (S) => safe(-S.tag("cogs"), S.v("BS:stock")), fmt: "x" },
    { label: "Debt / equity", fn: (S) => safe(S.tag("debt"), S.TE), fmt: "x3" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const NORM = ["rep", "norm"];
const normOpen = { cash: 500, rec: 600, divA: 500, ppe: 2400, debt: 1000, sc: 2000, re: 1000 };
const normalizeEarnings = {
  id: "lm15-normalize-earnings",
  module: "lm15",
  title: "Normalizing earnings and modifying the cash flow statement",
  standard: "Analyst adjustment; US GAAP company compared with an IFRS peer",
  summary:
    "Pinnacle's year contains a 200 gain on selling a division and a 160 restructuring charge. The normalized column strips both out after tax, then moves two cash flows so CFO measures only recurring operations on the same basis as an IFRS peer. The balance sheet never changes: normalization relabels profit, it does not create or destroy any.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("divA", "Assets of the packaging division", "nca"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    liab("prov", "Restructuring provision"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses", { tags: ["opcost"] }),
    exp("restr", "Restructuring charge", { tags: ["opcost"] }),
    rev("gain", "Gain on sale of division"),
    exp("intExp", "Interest expense", { tags: ["int"] }),
    exp("taxExp", "Income tax expense", { tags: ["tax"] }),
  ],
  columns: [
    { id: "rep", label: "As reported", sub: "US GAAP", opening: normOpen },
    { id: "norm", label: "Normalized", sub: "recurring operations only", opening: normOpen },
  ],
  steps: [
    {
      title: "Core operations: revenue 5,000, operating expenses 4,400",
      prompt: "Pinnacle collects 5,000 of revenue and pays 4,400 of operating expenses in cash.",
      html: "The recurring business earns 600 before interest and tax, a 12% margin. Everything after this step is either financing or a one-off.",
      entries: both(NORM, [
        dr("cash", 5000, "CFO", "Cash received from customers"),
        cr("sales", 5000),
        dr("opex", 4400),
        cr("cash", 4400, "CFO", "Cash paid for operating expenses"),
      ]),
    },
    {
      title: "Pay 60 of interest",
      prompt: "Pinnacle pays 60 of interest on its debt.",
      html: "US GAAP requires interest paid to be classified as an operating cash outflow. IFRS lets a company choose operating or financing. Remember this line: it comes back in the last step.",
      entries: both(NORM, [dr("intExp", 60), cr("cash", 60, "CFO", "Interest paid")]),
    },
    {
      title: "Sell the packaging division for 700",
      prompt: "Pinnacle sells its packaging division, carried at 500, for 700 in cash.",
      html: "A 200 gain. The proceeds are an investing inflow, as they should be. The gain is real, but it will not happen again next year: Pinnacle can only sell this division once.",
      entries: both(NORM, [dr("cash", 700, "CFI", "Proceeds from sale of division"), cr("divA", 500), cr("gain", 200)]),
    },
    {
      title: "Announce a restructuring: charge of 160",
      prompt: "Pinnacle announces a plant closure and recognizes a 160 restructuring provision. Nothing is paid this year.",
      html: "An accrual with no cash yet. Pinnacle reports it inside operating expenses, so reported EBIT falls from 600 to 440.",
      entries: both(NORM, [dr("restr", 160), cr("prov", 160)]),
    },
    {
      title: "Income tax at 25%, paid in cash",
      prompt: "Pinnacle pays income tax at 25% of its pretax income.",
      html: "Pretax income = 600 - 60 + 200 - 160 = 580, so tax is 145 and reported net income is 435. All 145 is classified in CFO, including the 50 that is really tax on the investing gain.",
      entries: both(NORM, [dr("taxExp", 145), cr("cash", 145, "CFO", "Income taxes paid")]),
    },
    {
      title: "Normalize: remove the gain and the restructuring charge, after tax",
      prompt: "The analyst removes the gain on sale and the restructuring charge, each with its 25% tax effect, to get recurring earnings.",
      html:
        "Remove the 200 gain and its 50 of tax; add back the 160 charge and its 40 of tax relief. Net effect on net income: -200 + 50 + 160 - 40 = -30, so normalized net income is 405. Check it from scratch: (600 - 60) x (1 - 25%) = 405. The 30 credit to retained earnings is the bookkeeping that keeps the balance sheet exactly as reported: the gain and the provision really happened, the analyst only refuses to call them recurring.",
      entries: { norm: [dr("gain", 200), cr("restr", 160), cr("taxExp", 10), cr("re", 30)] },
      memo: {
        title: "Normalized net income",
        rows: [
          ["Reported net income", "435"],
          ["Less gain on sale x (1 - 25%)", "(150)"],
          ["Add back restructuring charge x (1 - 25%)", "120"],
          ["Normalized net income", "405"],
        ],
      },
      insight: "Reported net income was HIGHER than recurring income this year because the gain was larger than the charge. EBIT went the other way: the charge sat inside EBIT, the gain below it, so normalized EBIT (600) is higher than reported (440).",
    },
    {
      title: "Modify the cash flow statement for comparability",
      prompt: "The analyst moves the 50 of tax on the disposal gain to investing activities, and moves the 60 of interest paid to financing activities to match an IFRS peer that classifies interest paid as financing.",
      html:
        "Two reclassifications, zero change in cash. The 50 of tax caused by the sale belongs with the sale proceeds in CFI. The 60 of interest moves to CFF because the IFRS peer Pinnacle is being compared with puts interest paid there; comparing CFO across the two without this move would flatter the peer by its whole interest bill.",
      entries: {
        norm: [
          dr("cash", 50, "CFO", "Income taxes paid"),
          cr("cash", 50, "CFI", "Tax paid on gain on sale of division"),
          dr("cash", 60, "CFO", "Interest paid"),
          cr("cash", 60, "CFF", "Interest paid"),
        ],
      },
      insight: "Normalized CFO is 505 against 395 reported, and the ratio of CFO to net income rises from 0.91 to 1.25. Same company, same cash: the question decides the classification.",
      exam: "IFRS: interest paid in CFO or CFF; interest and dividends received in CFO or CFI; dividends paid in CFO or CFF. US GAAP: interest paid and received and dividends received in CFO; dividends paid in CFF.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "EBIT margin", fn: (S) => safe(ebit(S), S.tag("sales")), fmt: "pct" },
    { label: "Interest coverage (EBIT / interest)", fn: (S) => safe(ebit(S), -S.tag("int")), fmt: "x" },
    { label: "Cash from operations", fn: (S) => S.CFO, fmt: "num" },
    { label: "CFO / net income", fn: (S) => safe(S.CFO, S.NI), fmt: "x" },
  ],
};

export default [stripAssociate, capitalizeCommitments, lifoToFifo, normalizeEarnings];
