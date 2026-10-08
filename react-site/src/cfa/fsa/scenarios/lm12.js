/* LM12 Multinational Operations: animated scenarios.
   Demo companies: Pinnacle Corp (US parent, presentation currency US dollar)
   and Kestrel Europe (its subsidiary, local currency euro). Rates are quoted
   as US dollars per euro, so a HIGHER number means a STRONGER euro.

   The ledger engine is single-currency, so every posting here is already in
   US dollars: the scenarios show the parent-level consequences of a rate
   move, while the FxTranslator widget shows the line-by-line translation.
   Every scenario passes scenarios.test.js: debits = credits on every step,
   A = L + E after every step, cash ties. */
import { cash, asset, liab, equity, re, aoci, rev, exp, oci, dr, cr } from "./_kit.js";

/* ------------------------------------------------------------------ */
const fxOpen = { cash: 2000, inv: 1500, sc: 2500, re: 1000 };
const exportReceivable = {
  id: "lm12-export-receivable",
  module: "lm12",
  title: "A euro invoice across three dates: exporter vs importer",
  standard: "IAS 21 and ASC 830: same treatment",
  summary:
    "Pinnacle invoices EUR 1,000 on credit. In the second column a different Pinnacle buys EUR 1,000 of goods on credit. The euro moves from 1.10 to 1.20 by the balance sheet date and settles at 1.15. Watch the same rate path produce a gain for the holder of the euro receivable and a loss for the owner of the euro payable, both in profit, both before any cash moves.",
  accounts: [
    cash(),
    asset("rec", "Receivable (EUR 1,000)"),
    asset("inv", "Inventory"),
    liab("pay", "Payable (EUR 1,000)"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("cogs", "Cost of goods sold"),
    rev("fx", "Foreign exchange transaction gain (loss)", { tags: ["fx"] }),
  ],
  columns: [
    { id: "exp", label: "Exporter", sub: "holds a euro receivable", opening: fxOpen },
    { id: "imp", label: "Importer", sub: "owes a euro payable", opening: fxOpen },
  ],
  steps: [
    {
      title: "1 December: invoice EUR 1,000 on 60-day credit, spot rate USD 1.10 per euro",
      prompt: "Record the transaction in US dollars at the spot rate on the transaction date (USD 1.10 per euro). The exporter's goods cost USD 800.",
      html:
        "Pinnacle keeps its books in US dollars, so a euro invoice has to be converted on the day it happens, at the spot rate that day: EUR 1,000 x 1.10 = USD 1,100. The exporter books revenue of 1,100 and a receivable of 1,100 (and the 800 cost of the goods shipped). The importer books inventory of 1,100 and a payable of 1,100. Revenue and inventory are now fixed in dollars forever: the sale happened on 1 December at 1.10, and no later rate move changes what the sale was worth on that day.",
      entries: {
        exp: [dr("rec", 1100), cr("sales", 1100), dr("cogs", 800), cr("inv", 800)],
        imp: [dr("inv", 1100), cr("pay", 1100)],
      },
      insight:
        "What stays exposed is the unsettled balance. The receivable and the payable are fixed in EUROS, so their dollar value will move with every tick of the rate until cash changes hands.",
    },
    {
      title: "31 December: balance sheet date, the euro strengthens to 1.20",
      prompt: "The euro is now worth USD 1.20. Remeasure the open euro balances at the current rate.",
      html:
        "The receivable and the payable are monetary items: claims to a fixed number of euros. At the balance sheet date both standards require them to be restated at the current (closing) rate: EUR 1,000 x 1.20 = USD 1,200. The exporter's claim is now worth 100 more dollars, so it books a gain of 100. The importer now owes 100 more dollars, so it books a loss of 100. Both go to profit even though nothing has been settled: the gain is unrealized but it is still in net income.",
      entries: {
        exp: [dr("rec", 100), cr("fx", 100)],
        imp: [dr("fx", 100), cr("pay", 100)],
      },
      memo: {
        title: "Remeasurement at the balance sheet date",
        rows: [
          ["Euro balance", "EUR 1,000"],
          ["At transaction date (x 1.10)", "1,100"],
          ["At balance sheet date (x 1.20)", "1,200"],
          ["Change: exporter gain / importer loss", "100"],
        ],
      },
      insight:
        "A stronger foreign currency helps whoever is owed foreign currency and hurts whoever owes it. Revenue and inventory did not move: only the monetary balance did.",
      exam:
        "Transaction gains and losses go to PROFIT under both IFRS and US GAAP, including unrealized ones at the balance sheet date. Do not confuse them with translation adjustments, which can go to OCI.",
    },
    {
      title: "Close the year",
      html:
        "Net income, including the 100 transaction gain or loss, rolls into retained earnings. Year one is done; the invoice is still open.",
      entries: {},
      close: true,
      practice: false,
    },
    {
      title: "15 February: settle at USD 1.15 per euro",
      prompt: "The customer pays (exporter) or Pinnacle pays the supplier (importer) EUR 1,000 when the rate is USD 1.15 per euro.",
      html:
        "EUR 1,000 is now worth USD 1,150. The exporter receives 1,150 for a receivable carried at 1,200, so it books a LOSS of 50 in year two. The importer pays 1,150 to settle a payable carried at 1,200, so it books a GAIN of 50. The cash flow is operating for both. Over the two years the exporter's total gain is 1,150 - 1,100 = 50 (a gain of 100, then a loss of 50) and the importer's total loss is 50.",
      entries: {
        exp: [dr("cash", 1150, "CFO", "Cash received from customers"), dr("fx", 50), cr("rec", 1200)],
        imp: [dr("pay", 1200), cr("cash", 1150, "CFO", "Cash paid to suppliers"), cr("fx", 50)],
      },
      memo: {
        title: "Total transaction gain over the life of the invoice (exporter)",
        rows: [
          ["Year one: 1,000 x (1.20 - 1.10)", "100"],
          ["Year two: 1,000 x (1.15 - 1.20)", "(50)"],
          ["Total: 1,000 x (1.15 - 1.10)", "50"],
        ],
      },
      insight:
        "Spanning a balance sheet date splits one economic gain into two accounting pieces. If the invoice had settled before 31 December, there would have been a single realized gain of 50 in year one.",
      exam:
        "The settlement-date gain or loss is measured from the LAST balance sheet rate (1.20), not from the original transaction rate (1.10). That is the most common slip in item sets.",
    },
  ],
  ratios: [
    { label: "Revenue", fn: (S) => S.tag("sales"), fmt: "num" },
    { label: "Transaction gain (loss) this year", fn: (S) => S.tag("fx"), fmt: "num" },
    { label: "Net income this year", fn: (S) => S.NI, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* Kestrel Europe's first year, as it lands in Pinnacle's consolidated
   statements. Same euro numbers and rates as the FxTranslator widget's
   default example: historical 1.20, average 1.10, current 1.00, ending
   inventory bought at 1.05, dividend declared at 1.04.
   The subsidiary's cash is shown as a balance sheet line WITHOUT the cash
   flow statement: a translated cash flow statement needs an "effect of
   exchange rate changes on cash" line that sits outside operating,
   investing and financing, which this engine does not model. */
const consolOpen = { pCash: 2000, sc: 2000 };
const ctaVsRemeasurement = {
  id: "lm12-cta-vs-remeasurement",
  module: "lm12",
  title: "Kestrel Europe in Pinnacle's consolidated statements: CTA vs remeasurement",
  standard: "Current rate method (euro functional) vs temporal method (US dollar functional)",
  summary:
    "Pinnacle buys Kestrel Europe for USD 1,200 when the euro is at 1.20. During the year the euro slides to 1.00. Follow the same euro business through two consolidations. Under the current rate method the fall lands as a NEGATIVE translation adjustment in other comprehensive income. Under the temporal method it lands as a remeasurement GAIN in net income, because Kestrel owes more euros than it holds.",
  accounts: [
    asset("pCash", "Cash held by Pinnacle (US dollars)"),
    asset("kCash", "Kestrel Europe: cash (euros)"),
    asset("kRec", "Kestrel Europe: receivables"),
    asset("kInv", "Kestrel Europe: inventory"),
    asset("kPpe", "Kestrel Europe: PP&E, net", "nca"),
    liab("kAp", "Kestrel Europe: accounts payable"),
    liab("kDebt", "Kestrel Europe: long-term debt", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    aoci("Accumulated OCI (cumulative translation adjustment)"),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("cogs", "Cost of goods sold", { tags: ["cogs"] }),
    exp("dep", "Depreciation"),
    exp("opex", "Other operating expenses"),
    exp("tax", "Income tax expense"),
    rev("fxGain", "Remeasurement gain (loss)"),
    oci("cta", "Foreign currency translation adjustment"),
  ],
  columns: [
    { id: "crm", label: "Current rate method", sub: "functional currency: euro", opening: consolOpen },
    { id: "tmp", label: "Temporal method", sub: "functional currency: US dollar", opening: consolOpen },
  ],
  show: { cf: false },
  steps: [
    {
      title: "1 January: buy Kestrel Europe for USD 1,200 (EUR 1,000 of net assets at 1.20)",
      prompt: "Kestrel Europe has cash EUR 300, inventory EUR 400, PP&E EUR 1,000 and long-term debt EUR 700. Pinnacle pays USD 1,200. Consolidate at the acquisition-date rate of 1.20.",
      html:
        "Kestrel's net assets are EUR 300 + 400 + 1,000 - 700 = EUR 1,000, and at 1.20 that is USD 1,200, exactly the price, so there is no goodwill to distract us. On the acquisition date every Kestrel line enters the consolidated balance sheet at 1.20: cash 360, inventory 480, PP&E 1,200, debt 840. Both methods agree on day one because, on day one, the historical rate IS the current rate.",
      entries: {
        crm: [dr("kCash", 360), dr("kInv", 480), dr("kPpe", 1200), cr("kDebt", 840), cr("pCash", 1200)],
        tmp: [dr("kCash", 360), dr("kInv", 480), dr("kPpe", 1200), cr("kDebt", 840), cr("pCash", 1200)],
      },
      insight: "Kestrel's share capital of EUR 1,000 is eliminated against Pinnacle's investment, so it never appears in the consolidated balance sheet. What remains is Kestrel's assets and liabilities in dollars.",
    },
    {
      title: "Kestrel sells EUR 2,000 of goods during the year (average rate 1.10)",
      prompt: "Sales of EUR 2,000: EUR 1,700 collected in cash, EUR 300 still receivable. Translate at the average rate of 1.10.",
      html:
        "Revenue happens all year, so both methods translate it at the average rate, as an approximation of the rate on each sale date: EUR 2,000 x 1.10 = USD 2,200. Cash collected EUR 1,700 becomes 1,870 and the receivable EUR 300 becomes 330 for now.",
      entries: {
        crm: [dr("kCash", 1870), dr("kRec", 330), cr("sales", 2200)],
        tmp: [dr("kCash", 1870), dr("kRec", 330), cr("sales", 2200)],
      },
    },
    {
      title: "Kestrel buys EUR 1,300 of inventory (average rate 1.10)",
      prompt: "Purchases of EUR 1,300: EUR 900 paid in cash, EUR 400 still owed to suppliers. Translate at 1.10.",
      html: "Purchases also happen through the year: EUR 1,300 x 1.10 = USD 1,430 of inventory. Cash paid EUR 900 is 990; the payable of EUR 400 is 440 for now.",
      entries: {
        crm: [dr("kInv", 1430), cr("kCash", 990), cr("kAp", 440)],
        tmp: [dr("kInv", 1430), cr("kCash", 990), cr("kAp", 440)],
      },
    },
    {
      title: "Expense cost of goods sold (EUR 1,200) and depreciation (EUR 100): the methods split",
      prompt: "Kestrel's COGS is EUR 1,200 (opening inventory 400 + purchases 1,300 - ending inventory 500, bought at 1.05) and depreciation is EUR 100. Translate under each method.",
      html:
        "<p><b>Current rate method:</b> every income statement line uses the average rate, so COGS is 1,200 x 1.10 = 1,320 and depreciation 100 x 1.10 = 110.</p><p><b>Temporal method:</b> COGS and depreciation are the cost of NON-MONETARY assets, and the temporal method carries those assets at historical rates. So their expense must use the same historical rates, or the balance sheet and income statement would disagree about what the asset cost. COGS = opening inventory 400 x 1.20 + purchases 1,300 x 1.10 - ending inventory 500 x 1.05 = 480 + 1,430 - 525 = 1,385. Depreciation = 100 x 1.20 = 120.</p>",
      entries: {
        crm: [dr("cogs", 1320), cr("kInv", 1320), dr("dep", 110), cr("kPpe", 110)],
        tmp: [dr("cogs", 1385), cr("kInv", 1385), dr("dep", 120), cr("kPpe", 120)],
      },
      memo: {
        title: "Temporal COGS from the inventory roll-forward",
        rows: [
          ["Opening inventory EUR 400 x 1.20", "480"],
          ["Purchases EUR 1,300 x 1.10", "1,430"],
          ["Ending inventory EUR 500 x 1.05", "(525)"],
          ["COGS at historical rates", "1,385"],
        ],
      },
      insight:
        "The euro was FALLING, so older euros cost more dollars. Historical-rate COGS (1,385) is higher than average-rate COGS (1,320), and the temporal gross margin is lower: 37.0% vs 40.0%. With a rising euro the distortion runs the other way.",
    },
    {
      title: "Other operating expenses EUR 400 and income tax EUR 100, paid in cash (average rate 1.10)",
      prompt: "Kestrel pays EUR 400 of other operating expenses and EUR 100 of income tax. Translate at 1.10.",
      html: "These are not the cost of a non-monetary asset, so both methods use the average rate: 440 and 110.",
      entries: {
        crm: [dr("opex", 440), dr("tax", 110), cr("kCash", 550)],
        tmp: [dr("opex", 440), dr("tax", 110), cr("kCash", 550)],
      },
    },
    {
      title: "Kestrel pays a EUR 50 dividend to Pinnacle, declared when the rate is 1.04",
      prompt: "Kestrel pays EUR 50 to Pinnacle, which converts it at 1.04.",
      html:
        "Inside the group this is just cash moving from Kestrel's euro account to Pinnacle's dollar account: EUR 50 x 1.04 = USD 52. Kestrel's own translated retained earnings fall by 52 (dividends are translated at the rate when declared), but Pinnacle's matching dividend income is eliminated, so consolidated equity does not move.",
      entries: {
        crm: [dr("pCash", 52), cr("kCash", 52)],
        tmp: [dr("pCash", 52), cr("kCash", 52)],
      },
      insight: "The dividend still matters for the translation adjustment: it took euros out of Kestrel at 1.04, so those euros are no longer exposed to the slide to 1.00.",
    },
    {
      title: "31 December: the euro closes at 1.00. Restate the balance sheet",
      prompt: "Year-end rate USD 1.00 per euro. Kestrel holds cash EUR 550, receivables EUR 300, inventory EUR 500 and PP&E EUR 900, and owes payables EUR 400 and debt EUR 700. Apply each method's year-end rates and book the balancing amount.",
      html:
        "<p><b>Current rate method:</b> EVERY asset and liability goes to the current rate, so the consolidated balances become exactly Kestrel's euro balances x 1.00. Assets fall by 398 (cash 88, receivables 30, inventory 90, PP&E 190) and liabilities fall by 180 (payables 40, debt 140). Net assets fell by 218. That is the cumulative translation adjustment, and it goes to <b>OCI</b>, not profit.</p><p><b>Temporal method:</b> only MONETARY items go to the current rate: cash (-88), receivables (-30), payables (+40 of relief), debt (+140 of relief). Inventory stays at 525 and PP&E at 1,080. Monetary liabilities exceed monetary assets, so a falling euro is GOOD news: a remeasurement <b>gain</b> of 62 in <b>net income</b>.</p>",
      entries: {
        crm: [dr("kAp", 40), dr("kDebt", 140), dr("cta", 218), cr("kCash", 88), cr("kRec", 30), cr("kInv", 90), cr("kPpe", 190)],
        tmp: [dr("kAp", 40), dr("kDebt", 140), cr("kCash", 88), cr("kRec", 30), cr("fxGain", 62)],
      },
      notes: {
        crm: "Exposure = net assets, EUR 1,150. Euro down means a negative translation adjustment.",
        tmp: "Exposure = net monetary position, EUR 550 + 300 - 400 - 700 = EUR (250), a net monetary liability. Euro down means a gain.",
      },
      memo: {
        title: "Translation adjustment, built from its three sources",
        rows: [
          ["Opening net assets EUR 1,000 x (1.00 - 1.20)", "(200)"],
          ["Net income EUR 200 x (1.00 - 1.10)", "(20)"],
          ["Dividends EUR 50 x (1.00 - 1.04), removed", "2"],
          ["Cumulative translation adjustment", "(218)"],
        ],
      },
      insight:
        "One rate move, two opposite signs. Net income: 220 under the current rate method, 207 under the temporal method (145 before the 62 gain). The temporal method puts currency noise INTO earnings; the current rate method parks it in equity.",
      exam:
        "Know which exposure drives which number. Current rate method: net ASSET exposure, effect in OCI. Temporal method: net MONETARY exposure, effect in net income. A company with a net monetary liability gains from a falling foreign currency under the temporal method even while its translation adjustment would have been negative.",
    },
    {
      title: "Close the year",
      html: "Net income goes to retained earnings and OCI to accumulated OCI. The CTA of (218) now sits in equity, where it stays until Kestrel is sold or liquidated; then it is reclassified to profit under both IFRS and US GAAP.",
      entries: {},
      close: true,
      practice: false,
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Other comprehensive income", fn: (S) => S.OCI, fmt: "num" },
    { label: "Gross margin", fn: (S) => (S.tag("sales") ? (S.tag("sales") + S.tag("cogs")) / S.tag("sales") : null), fmt: "pct" },
    { label: "Net profit margin", fn: (S) => (S.tag("sales") ? S.NI / S.tag("sales") : null), fmt: "pct" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const etrOpen = { cash: 2000, sc: 1500, re: 500 };
const etrMix = {
  id: "lm12-etr-mix",
  module: "lm12",
  title: "Same tax rates, different mix: why the effective tax rate moves",
  standard: "Income tax note: statutory to effective rate reconciliation",
  summary:
    "Pinnacle earns 1,000 before tax in both columns. Its home country taxes profit at 25%, the country where its foreign subsidiary operates taxes at 10%, and neither rate changes. Only the share of profit earned abroad differs. Watch the effective tax rate fall from 22% to 17.5%.",
  accounts: [
    cash(),
    liab("taxPay", "Income tax payable"),
    equity("sc", "Share capital"),
    re(),
    rev("salesH", "Revenue: home country", { tags: ["sales"] }),
    exp("costH", "Operating costs: home country"),
    rev("salesF", "Revenue: foreign subsidiary", { tags: ["sales"] }),
    exp("costF", "Operating costs: foreign subsidiary"),
    exp("taxH", "Income tax: home country (25%)", { tags: ["tax"] }),
    exp("taxF", "Income tax: foreign country (10%)", { tags: ["tax"] }),
  ],
  columns: [
    { id: "a", label: "Mix A", sub: "80% of profit at home", opening: etrOpen },
    { id: "b", label: "Mix B", sub: "50% of profit at home", opening: etrOpen },
  ],
  steps: [
    {
      title: "The year's operations: 1,000 of pretax profit in both columns",
      prompt: "Mix A: home revenue 3,000 and costs 2,200; foreign revenue 1,000 and costs 800. Mix B: home revenue 2,500 and costs 2,000; foreign revenue 1,500 and costs 1,000. All cash.",
      html:
        "Mix A earns 800 at home and 200 abroad. Mix B earns 500 at home and 500 abroad. Total pretax income is 1,000 either way, so an analyst looking only at the consolidated income statement before tax would see two identical years.",
      entries: {
        a: [
          dr("cash", 3000, "CFO", "Cash received from customers"), cr("salesH", 3000),
          dr("costH", 2200), cr("cash", 2200, "CFO", "Cash paid for operating costs"),
          dr("cash", 1000, "CFO", "Cash received from customers"), cr("salesF", 1000),
          dr("costF", 800), cr("cash", 800, "CFO", "Cash paid for operating costs"),
        ],
        b: [
          dr("cash", 2500, "CFO", "Cash received from customers"), cr("salesH", 2500),
          dr("costH", 2000), cr("cash", 2000, "CFO", "Cash paid for operating costs"),
          dr("cash", 1500, "CFO", "Cash received from customers"), cr("salesF", 1500),
          dr("costF", 1000), cr("cash", 1000, "CFO", "Cash paid for operating costs"),
        ],
      },
    },
    {
      title: "Accrue income tax in each jurisdiction",
      prompt: "Accrue tax at 25% on home profit and 10% on foreign profit, as a payable.",
      html:
        "Each country taxes the profit earned inside its borders. Mix A: 25% x 800 = 200 at home plus 10% x 200 = 20 abroad, total 220. Mix B: 25% x 500 = 125 plus 10% x 500 = 50, total 175. Effective tax rate = tax expense / pretax income: 22.0% vs 17.5%. No statutory rate changed; the weights did.",
      entries: {
        a: [dr("taxH", 200), dr("taxF", 20), cr("taxPay", 220)],
        b: [dr("taxH", 125), dr("taxF", 50), cr("taxPay", 175)],
      },
      memo: {
        title: "Tax note reconciliation, Mix B",
        rows: [
          ["Tax at home statutory rate: 25% x 1,000", "250"],
          ["Effect of lower foreign rate: (10% - 25%) x 500", "(75)"],
          ["Income tax expense", "175"],
          ["Effective tax rate: 175 / 1,000", "17.5%"],
        ],
      },
      insight:
        "Net income rises from 780 to 825 without any improvement in operations. Whether that lasts depends on whether the shift of profit abroad lasts: a one-off project, a temporary tax holiday or aggressive transfer pricing can all reverse.",
      exam:
        "A falling effective tax rate with no change in statutory rates points to a change in the geographic mix of earnings. The rate reconciliation in the income tax note is where you confirm it.",
    },
  ],
  ratios: [
    { label: "Pretax income", fn: (S) => S.NI - S.tag("tax"), fmt: "num" },
    { label: "Income tax expense", fn: (S) => -S.tag("tax"), fmt: "num" },
    { label: "Effective tax rate", fn: (S) => (S.tag("tax") ? -S.tag("tax") / (S.NI - S.tag("tax")) : null), fmt: "pct" },
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
  ],
};

export default [exportReceivable, ctaVsRemeasurement, etrMix];
