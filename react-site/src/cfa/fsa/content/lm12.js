/* LM12 Multinational Operations.
   Demo cast: Pinnacle Corp (US parent, presentation currency US dollar),
   Kestrel Europe (subsidiary, local currency euro), Kestrel Sur (subsidiary
   in a hyperinflationary economy), Harrier GmbH (item set only).
   Exchange rates are quoted as US dollars per unit of foreign currency
   throughout, so a HIGHER rate always means a STRONGER foreign currency.
   Every number below was recomputed by hand and matches the scenarios
   (scenarios/lm12.js) and the widgets (FxTranslator, HyperinflationLab,
   FxSalesLab), which derive their figures in code. */
export default {
  id: "lm12",
  num: 12,
  title: "Multinational Operations",
  short: "Multinational operations",
  tagline:
    "When a company does business in more than one currency, the question is never just what the exchange rate did. It is which numbers the rate is allowed to touch, and whether the result lands in profit or in equity.",
  minutes: 230,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "three-currencies",
      title: "Three currencies, and the one that decides everything",
      los: ["a", "d"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle Corp is a US company that reports in US dollars. It owns Kestrel Europe, a manufacturer in Frankfurt that keeps its books in euros. Every quarter Pinnacle's controller has to turn Kestrel's euro statements into dollars so they can be added into Pinnacle's consolidated statements. Rates in this module are quoted as US dollars per euro, so a higher number means a stronger euro.</p>
<p>The obvious approach is to multiply every euro by today's exchange rate. Try it on one line. Kestrel bought its factory for EUR 1,000 when a euro cost USD 1.20, so Pinnacle effectively paid USD 1,200 for it. Today the euro is at 1.00. Multiplying by today's rate says the factory is a USD 1,000 asset. Is that right?</p>
<p>It depends on what kind of business Kestrel is. If Kestrel is a self-contained European company (it buys materials in euros, pays German wages, sells to European customers at euro prices, borrows from euro banks and reinvests its euro profits), then what Pinnacle owns is a stream of euros. When the euro falls, that whole euro investment is genuinely worth fewer dollars, and restating the factory at today's rate tells the truth. If instead Kestrel is a sales outpost that ships Pinnacle's US-made goods, prices in dollars and sends its cash home every week, then it is really a dollar business that happens to keep euro ledgers. Its factory cost Pinnacle USD 1,200, and nothing that happened to the euro since has changed that.</p>
<p>The euro ledger looks identical in both cases, so the accounting cannot start from the ledger. Before anyone picks an exchange rate, it asks which currency the subsidiary actually lives in.</p>`,
        },
        {
          t: "table",
          caption: "The three currencies (Kestrel Europe as the example)",
          head: ["Currency", "Definition", "Kestrel Europe"],
          rows: [
            ["<b>Local currency</b>", "The currency of the country where the entity is located.", "Euro"],
            ["<b>Functional currency</b>", "The currency of the primary economic environment in which the entity operates: normally the one in which it mainly generates and spends cash.", "Euro if it is a self-contained European business; US dollar if it is an extension of Pinnacle"],
            ["<b>Presentation (reporting) currency</b>", "The currency in which the financial statements are presented.", "US dollar (Pinnacle's)"],
          ],
          note: "The local and functional currency are usually the same, but not always. The presentation currency is a choice of the reporting group; the functional currency is a matter of fact that management must judge from the indicators below.",
        },
        {
          t: "p",
          html: `<p>Everything else in this module follows from one rule. <b>The functional currency decides the method</b>:</p>
<p>If Kestrel's functional currency is the euro, its euro statements are <b>translated</b> into dollars with the <b>current rate method</b>: the net investment is treated as exposed to the euro, and the translation gain or loss goes to equity through other comprehensive income (OCI).</p>
<p>If Kestrel's functional currency is the US dollar, its euro records are <b>remeasured</b> into dollars with the <b>temporal method</b>: the goal is to reproduce what the books would have shown if every transaction had been recorded in dollars from the start, and the gain or loss goes to net income.</p>`,
        },
        { t: "h", text: "How management decides the functional currency" },
        {
          t: "p",
          html: `<p>International Financial Reporting Standards (IFRS) handle this in International Accounting Standard (IAS) 21; US generally accepted accounting principles (US GAAP) handle it in Accounting Standards Codification (ASC) 830. Both look for the currency that actually drives the business.</p>`,
        },
        {
          t: "table",
          caption: "Indicators of the functional currency",
          head: ["", "IFRS (IAS 21)", "US GAAP (ASC 830) equivalent"],
          rows: [
            ["Primary factors (IFRS gives these priority)", "The currency that mainly influences sales prices (often the currency prices are set and settled in); the currency of the country whose competitive forces and regulations mainly determine sales prices; the currency that mainly influences labour, material and other costs", "Sales price indicator, sales market indicator, expense indicator"],
            ["Secondary factors", "The currency in which financing (debt and equity) is raised; the currency in which receipts from operations are usually retained", "Financing indicator, cash flow indicator"],
            ["Is the foreign operation an extension of the parent?", "Activities carried out as an extension of the parent rather than with significant autonomy; transactions with the parent a high proportion of its activities; its cash flows directly affect the parent's and are readily available for remittance; it cannot service its debts without funds from the parent. Each points to the PARENT's currency.", "Intercompany transactions and arrangements indicator; cash flows that directly and currently affect the parent's cash flows point to the parent's currency"],
          ],
          note: "US GAAP lists its indicators without a ranking; IFRS ranks the primary factors first and uses the others when the primary ones are mixed. In practice the answers usually agree.",
        },
        {
          t: "sort",
          prompt: "Each fact describes Kestrel Europe. Tap a fact, then tap the currency it points to as Kestrel's functional currency.",
          buckets: [
            { id: "eur", label: "Points to the euro (local currency)" },
            { id: "usd", label: "Points to the US dollar (Pinnacle's currency)" },
          ],
          items: [
            { text: "Prices are set by competition with other German manufacturers", bucket: "eur", why: "The competitive forces that determine sales prices are European, a primary indicator under IFRS and the sales market indicator under US GAAP." },
            { text: "Most costs are German wages and European raw materials", bucket: "eur", why: "The currency that mainly influences labour and material costs is a primary indicator." },
            { text: "Kestrel borrows from euro-zone banks and keeps its profits in euro accounts", bucket: "eur", why: "Financing raised and receipts retained in euros are secondary indicators pointing to the euro." },
            { text: "Kestrel resells goods made by Pinnacle in Ohio, priced in dollars", bucket: "usd", why: "Its activities are an extension of the parent and prices are set in dollars." },
            { text: "Kestrel sweeps its cash to Pinnacle every week", bucket: "usd", why: "Cash flows that directly and currently affect the parent's cash flows point to the parent's currency." },
            { text: "Kestrel could not pay its debts without regular funding from Pinnacle", bucket: "usd", why: "An operation that depends on the parent to service its obligations is not autonomous." },
          ],
        },
        {
          t: "tree",
          title: "Which method translates the subsidiary?",
          root: "hyper",
          nodes: {
            hyper: {
              q: "Is the subsidiary's local economy hyperinflationary?",
              help: "US GAAP: cumulative inflation of about 100% or more over three years. IFRS (IAS 29): judged from several indicators, one of which is cumulative three-year inflation approaching or exceeding 100%.",
              options: [{ label: "No", next: "fc" }, { label: "Yes", next: "hstd" }],
            },
            fc: {
              q: "What is the subsidiary's functional currency?",
              help: "Decided from the indicators above: what drives sales prices, costs, financing and cash retention, and how autonomous the subsidiary is.",
              options: [
                { label: "Its local currency", next: "crm" },
                { label: "The parent's presentation currency", next: "tmp" },
                { label: "A third currency", next: "both" },
              ],
            },
            hstd: {
              q: "Which standard does the parent report under?",
              options: [{ label: "US GAAP", next: "hgaap" }, { label: "IFRS", next: "hifrs" }],
            },
            crm: { result: "Current rate method (translation)", tone: "cyan", html: "All assets and liabilities at the current rate; revenue and expenses at the average rate; equity at historical rates; the balancing figure is the cumulative translation adjustment in OCI." },
            tmp: { result: "Temporal method (remeasurement)", tone: "purple", html: "Monetary items at the current rate; non-monetary items at historical rates (current rate if carried at current value); cost of goods sold and depreciation at historical rates; the remeasurement gain or loss goes to net income." },
            both: { result: "Both, in sequence", tone: "amber", html: "Example: a Swiss branch keeps its books in Swiss francs but its functional currency is the euro. First remeasure francs into euros with the temporal method (gain or loss in net income), then translate euros into dollars with the current rate method (adjustment in OCI)." },
            hgaap: { result: "US GAAP: temporal method", tone: "purple", html: "A highly inflationary economy's currency is not allowed to be the functional currency: the parent's reporting currency is used, so the statements are remeasured with the temporal method." },
            hifrs: { result: "IFRS: restate, then translate", tone: "green", html: "IAS 29: restate the local statements for inflation with a general price index (purchasing power gain or loss in profit), then translate every amount at the current rate." },
          },
        },
        {
          t: "check",
          id: "lm12-fc-1",
          q: "Kestrel Europe sets its prices against European competitors, pays European wages and suppliers, borrows from euro banks and keeps its earnings in euros. Pinnacle reports in US dollars. Which method should Pinnacle use to bring Kestrel into its statements?",
          options: ["The current rate method, because the functional currency is the euro", "The temporal method, because the presentation currency is the US dollar", "The temporal method, because Kestrel's local currency differs from Pinnacle's"],
          answer: 0,
          why: "Every indicator points to the euro as the functional currency. When the functional currency is the local currency, the statements are translated with the current rate method. The presentation currency does not decide the method; the functional currency does.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "transactions",
      title: "Foreign currency transactions: a receivable that changes size",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Before any subsidiary comes into it, Pinnacle itself trades abroad. On 1 December it ships goods to a customer in Munich and sends an invoice for EUR 1,000, payable in 60 days. Pinnacle's books are in dollars. Which dollar number is "the sale"?</p>
<p>The euro is at 1.10 on the invoice date, 1.20 at Pinnacle's 31 December year end, and 1.15 when the customer pays in February. One option is to wait and book the sale at whatever Pinnacle finally receives. That fails: on 31 December Pinnacle has a real asset (a claim to EUR 1,000) and it has to put a number on it, and the sale clearly happened in December, not February. Another option is to fix everything at 1.10 forever. That fails too: by year end Pinnacle's claim is worth USD 1,200 and the balance sheet would understate it.</p>
<p>So the accounting splits the event in two. The <b>sale</b> is measured once, at the spot rate on the transaction date, and never revisited. The <b>receivable</b> is a monetary item, a claim to a fixed number of euros, so its dollar value moves with the rate until it is settled. Every change in that dollar value is a <b>foreign currency transaction gain or loss</b>, and it goes to profit.</p>`,
        },
        {
          t: "steps",
          title: "The three dates of a foreign currency transaction",
          items: [
            { title: "Transaction date", html: "Record the revenue (or the inventory, for an import) and the receivable (or payable) at the spot rate: EUR 1,000 x 1.10 = USD 1,100. The revenue figure is now final." },
            { title: "Each balance sheet date before settlement", html: "Restate the open receivable or payable at the closing rate: EUR 1,000 x 1.20 = USD 1,200. The change, 100, is a transaction gain or loss in profit, even though it is unrealized." },
            { title: "Settlement date", html: "Cash arrives (or is paid) at that day's rate: USD 1,150. The difference from the LAST carrying amount (1,200, not 1,100) is a further gain or loss in profit: a loss of 50 here." },
          ],
        },
        { t: "theater", scenario: "lm12-export-receivable" },
        {
          t: "table",
          caption: "Direction of transaction gains and losses",
          head: ["Pinnacle's position", "Foreign currency STRENGTHENS", "Foreign currency WEAKENS"],
          rows: [
            ["Export sale: receivable in foreign currency (an asset)", "Gain", "Loss"],
            ["Import purchase: payable in foreign currency (a liability)", "Loss", "Gain"],
          ],
          note: "Holding foreign currency assets means you want that currency to rise; owing foreign currency means you want it to fall. The same logic, applied to a whole balance sheet, drives the exposure analysis later in this module.",
        },
        {
          t: "formula",
          name: "Transaction gain or loss for a period",
          tex: "\\text{Gain (loss)} = \\text{FC amount} \\times (S_{\\text{end}} - S_{\\text{start}})",
          plain: "FC amount is the foreign currency balance, positive for a receivable and negative for a payable. S is the rate in home currency per unit of foreign currency at the start and end of the period (the transaction date, a balance sheet date, or the settlement date). Receivable of EUR 1,000 from 1.10 to 1.20: +100. Payable of EUR 1,000 over the same move: -100.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "Classic trap",
          html: "When an invoice spans a balance sheet date, the settlement gain or loss is measured from the balance sheet rate, not from the original transaction rate. Over its whole life the exporter above gains 50 in total (1,150 - 1,100): +100 in year one and -50 in year two. A candidate who books +50 at settlement in year two has double counted the first 100.",
        },
        {
          t: "p",
          html: `<p>Kestrel Europe has transaction exposure of its own too. If Kestrel, whose functional currency is the euro, sells to a US customer and invoices in dollars, the dollar receivable is a foreign currency item <i>for Kestrel</i>. Kestrel books euro transaction gains and losses on it in its own profit, and those then get translated into Pinnacle's statements with everything else.</p>`,
        },
        { t: "h", text: "Disclosure, and where the gain sits on the income statement" },
        {
          t: "p",
          html: `<p>Both IFRS and US GAAP require the company to disclose the net amount of foreign exchange gains and losses recognized in profit for the period. Neither standard says WHERE on the income statement they must go. Some companies put transaction gains and losses inside operating income (for example in other operating income or expense), on the argument that they arise from buying and selling. Others put them below operating income, alongside finance costs or other non-operating items.</p>
<p>That choice matters to an analyst. Suppose two exporters are identical except that one reports a 100 transaction gain inside operating income and the other reports it below. The first shows a higher operating margin for no operational reason. When you compare operating margins across companies, find the foreign exchange disclosure, see where each company put the gains and losses, and put them in the same place for both. A sensible rule is that gains and losses on trade receivables and payables are closer to operating, while those on foreign currency borrowings are closer to financing.</p>`,
        },
        {
          t: "callout",
          tone: "gaap",
          title: "IFRS vs US GAAP",
          html: "Transaction accounting is the same under both: spot rate at the transaction date, monetary balances restated at each balance sheet date, gains and losses in profit, net amount disclosed. Neither prescribes the income statement line, so presentation varies company by company.",
        },
        {
          t: "check",
          id: "lm12-tx-1",
          q: "Pinnacle buys EUR 2,000 of parts on credit when the euro is at 1.15. At Pinnacle's year end the euro is at 1.10. What does Pinnacle report for this payable in the year of purchase?",
          options: ["A transaction gain of 100", "A transaction loss of 100", "No gain or loss until the payable is settled"],
          answer: 0,
          why: "The payable was recorded at 2,000 x 1.15 = 2,300. At year end it is restated to 2,000 x 1.10 = 2,200. Pinnacle owes 100 fewer dollars, a gain recognized in profit even though nothing has been paid.",
        },
        {
          t: "check",
          id: "lm12-tx-2",
          q: "Pinnacle settles that EUR 2,000 payable early in the next year when the euro is at 1.12. What does it report in the year of settlement?",
          options: ["A loss of 40", "A gain of 60", "A loss of 140"],
          answer: 0,
          why: "The payable was carried at 2,200 after the year-end restatement. Paying 2,000 x 1.12 = 2,240 costs 40 more, a loss of 40. Over both years Pinnacle gained 2,300 - 2,240 = 60 in total: +100 then -40.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "two-methods",
      title: "Translating a whole subsidiary: two methods, one question",
      los: ["d"],
      blocks: [
        {
          t: "p",
          html: `<p>Now Pinnacle has to bring all of Kestrel Europe into dollars, not one invoice. Three kinds of rates are available: the <b>historical rate</b> on the date an item arose, the <b>average rate</b> for the period, and the <b>current rate</b> (the closing rate) at the balance sheet date.</p>
<p>Here is the problem every translation method has to solve. Kestrel's euro balance sheet balances. Multiply different lines by different rates and the dollar balance sheet will not. Some figure has to absorb the difference, and the two methods disagree about two things: which lines are allowed to move with the current rate (the <b>exposure</b>), and where the balancing figure goes (equity or profit).</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Current rate method (functional currency = local currency)",
              tone: "cyan",
              points: [
                "Idea: Kestrel is a self-contained euro business; Pinnacle's whole net investment in it is exposed to the euro",
                "ALL assets and liabilities at the current rate",
                "Share capital and other contributed capital at the historical rate when issued",
                "Revenue and expenses at the rate on the transaction date, or the average rate as an approximation",
                "Dividends at the rate when declared; retained earnings rolled forward, never translated as a block",
                "Balancing figure: the translation adjustment, through OCI into the cumulative translation adjustment (CTA) in equity",
                "Exposure: net assets",
                "US GAAP calls this translation",
              ],
            },
            {
              title: "Temporal method (functional currency = parent's currency)",
              tone: "purple",
              points: [
                "Idea: rebuild the books as if every transaction had been recorded in dollars on the day it happened",
                "MONETARY assets and liabilities at the current rate",
                "Non-monetary items carried at historical cost (inventory at cost, property, plant and equipment (PP&amp;E), intangibles, prepaid expenses, advances received) at historical rates",
                "Non-monetary items carried at current value (for example, securities at fair value) at the current rate",
                "Revenue and most expenses at the average rate, but cost of goods sold (COGS), depreciation and amortization at the historical rates of the related assets",
                "Balancing figure: the remeasurement gain or loss, in NET INCOME",
                "Exposure: net monetary assets or liabilities",
                "US GAAP calls this remeasurement",
              ],
            },
          ],
        },
        {
          t: "p",
          html: `<p>Why does the temporal method send the gain or loss to profit while the current rate method parks it in equity? Under the temporal method the subsidiary is really a dollar business, so a euro cash balance or a euro loan is exactly like Pinnacle holding euros itself: when the rate moves, Pinnacle's dollar wealth changes for real, just as with a transaction exposure. Under the current rate method the subsidiary's cash flows are in euros and stay in euros; a move in the euro changes the dollar value of Pinnacle's investment but does not touch the euro cash flows of the business, and it may reverse before Pinnacle ever sells Kestrel. Running it through profit every quarter would bury the subsidiary's operating results in currency noise, so it waits in equity until the subsidiary is sold or liquidated, when both standards reclassify the cumulative amount to profit.</p>
<p>PP&amp;E shows the logic of the temporal method best. If Pinnacle had bought Kestrel's factory directly with dollars, it would have paid USD 1,200 and its books would say 1,200 forever, whatever the euro did afterwards. The temporal method reproduces exactly that: historical rate. A euro bank balance is different: a dollar company holding EUR 550 really does have fewer dollars when the euro falls, so it gets the current rate.</p>`,
        },
        {
          t: "table",
          caption: "Which rate for which line",
          head: ["Line", "Current rate method", "Temporal method"],
          rows: [
            ["Cash, receivables, payables, accrued liabilities, debt (monetary)", "Current", "Current"],
            ["Inventory carried at cost", "Current", "Historical (rate when bought)"],
            ["Inventory written down to market value", "Current", "Current (or the rate when that value was measured)"],
            ["PP&amp;E and intangible assets at cost", "Current", "Historical"],
            ["Prepaid expenses", "Current", "Historical"],
            ["Deferred revenue / advances received from customers", "Current", "Historical (a duty to deliver goods, not to pay a fixed sum)"],
            ["Share capital and contributed capital", "Historical", "Historical"],
            ["Retained earnings", "Rolled forward: beginning + translated net income - dividends", "Derived: whatever makes the balance sheet balance"],
            ["Revenue, most expenses", "Average (or actual)", "Average (or actual)"],
            ["COGS, depreciation, amortization", "Average (or actual)", "Historical rates of the related assets"],
            ["Dividends", "Rate when declared", "Rate when declared"],
            ["Balancing figure", "CTA in OCI / equity", "Remeasurement gain or loss in net income"],
          ],
        },
        {
          t: "sort",
          prompt: "Under the TEMPORAL method, which rate does each Kestrel line use? Tap an item, then tap the rate.",
          buckets: [
            { id: "cur", label: "Current rate" },
            { id: "hist", label: "Historical rate" },
          ],
          items: [
            { text: "Cash in a Frankfurt bank account", bucket: "cur", why: "Monetary: a fixed number of euros." },
            { text: "Accounts receivable from European customers", bucket: "cur", why: "Monetary: a right to receive a fixed number of euros." },
            { text: "Long-term euro bank loan", bucket: "cur", why: "Monetary liability." },
            { text: "Inventory carried at cost", bucket: "hist", why: "Non-monetary and measured at historical cost, so it keeps the rate from when it was bought." },
            { text: "Factory equipment", bucket: "hist", why: "Non-monetary at historical cost." },
            { text: "Insurance premiums paid in advance", bucket: "hist", why: "Prepaid expenses are non-monetary: Kestrel will receive insurance cover, not euros." },
            { text: "Advances received from customers for goods not yet shipped", bucket: "hist", why: "Deferred revenue is non-monetary: Kestrel owes goods, not a fixed sum of euros." },
            { text: "Equity securities held at fair value", bucket: "cur", why: "Non-monetary but carried at a current value, so it uses the rate at the date that value was measured: the current rate." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "The test for monetary vs non-monetary",
          html: "Ask what the item will be settled in. If the answer is a fixed or determinable number of currency units (cash, receivables, payables, loans), it is monetary. If the answer is goods, services or an asset whose value is not fixed in currency (inventory, equipment, prepaid rent, an obligation to deliver product), it is non-monetary.",
        },
        {
          t: "check",
          id: "lm12-tm-1",
          q: "Which Kestrel Europe line is translated at the current rate under BOTH the current rate method and the temporal method?",
          options: ["Inventory carried at cost", "Accounts receivable", "Share capital"],
          answer: 1,
          why: "Receivables are monetary, so the temporal method also uses the current rate, and the current rate method uses it for every asset. Inventory at cost uses a historical rate under the temporal method, and share capital uses the historical rate under both.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "worked-example",
      title: "Kestrel Europe, translated line by line",
      los: ["e", "d"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle acquires Kestrel Europe on 1 January, when the euro is at 1.20. On that date Kestrel has cash of EUR 300, inventory of EUR 400 and PP&amp;E of EUR 1,000, debt of EUR 700 and share capital of EUR 1,000. Starting at acquisition keeps the arithmetic self-contained: beginning retained earnings and the beginning CTA are both zero.</p>
<p>During the year Kestrel sells EUR 2,000 of goods (EUR 300 still receivable at year end), buys EUR 1,300 of inventory (EUR 400 still owed), ends with inventory of EUR 500 bought late in the year when the euro was at 1.05, depreciates its plant by EUR 100, pays EUR 400 of other operating expenses and EUR 100 of income tax, and declares and pays a EUR 50 dividend when the euro is at 1.04. The euro averages 1.10 for the year and closes at 1.00.</p>`,
        },
        {
          t: "table",
          caption: "Kestrel Europe in euros",
          head: ["Income statement", "EUR", "Balance sheet (year end)", "EUR"],
          rows: [
            ["Revenue", "2,000", "Cash", "550"],
            ["Cost of goods sold (400 + 1,300 - 500)", "(1,200)", "Receivables", "300"],
            ["Depreciation", "(100)", "Inventory", "500"],
            ["Other operating expenses", "(400)", "PP&amp;E, net (1,000 - 100)", "900"],
            ["Income tax", "(100)", "Total assets", "2,250"],
            ["<b>Net income</b>", "<b>200</b>", "Accounts payable / long-term debt", "400 / 700"],
            ["Dividends", "(50)", "Share capital / retained earnings", "1,000 / 150"],
          ],
          note: "Cash check: 300 + collections 1,700 - supplier payments 900 - operating expenses 400 - tax 100 - dividends 50 = 550.",
        },
        { t: "widget", name: "FxTranslator" },
        { t: "h", text: "The current rate method, by hand" },
        {
          t: "steps",
          title: "Order of work: income statement first, CTA last",
          items: [
            { title: "Translate the income statement at the average rate", html: "Every line x 1.10. Net income: 200 x 1.10 = 220." },
            { title: "Roll retained earnings forward", html: "Beginning retained earnings 0 + net income 220 - dividends 50 x 1.04 = 52, so ending retained earnings = 168." },
            { title: "Translate assets and liabilities at the current rate", html: "Everything x 1.00: assets 2,250, liabilities 1,100." },
            { title: "Share capital at the historical rate", html: "1,000 x 1.20 = 1,200." },
            { title: "The CTA is the plug", html: "2,250 - 1,100 - 1,200 - 168 = (218). It goes through OCI into equity." },
          ],
        },
        {
          t: "table",
          caption: "Current rate method",
          head: ["Line", "EUR", "Rate", "USD"],
          rows: [
            ["Revenue", "2,000", "1.10 average", "2,200"],
            ["Cost of goods sold", "(1,200)", "1.10 average", "(1,320)"],
            ["Depreciation", "(100)", "1.10 average", "(110)"],
            ["Other operating expenses", "(400)", "1.10 average", "(440)"],
            ["Income tax", "(100)", "1.10 average", "(110)"],
            ["<b>Net income</b>", "200", "", "<b>220</b>"],
            ["Cash / receivables / inventory / PP&amp;E", "550 / 300 / 500 / 900", "1.00 current", "550 / 300 / 500 / 900"],
            ["<b>Total assets</b>", "2,250", "", "<b>2,250</b>"],
            ["Accounts payable / long-term debt", "400 / 700", "1.00 current", "400 / 700"],
            ["Share capital", "1,000", "1.20 historical", "1,200"],
            ["Retained earnings", "150", "0 + 220 - 52", "168"],
            ["Cumulative translation adjustment", "", "plug", "(218)"],
            ["<b>Total liabilities and equity</b>", "2,250", "", "<b>2,250</b>"],
          ],
        },
        {
          t: "formula",
          name: "Where the translation adjustment comes from (first year after acquisition)",
          tex: "\\text{CTA} = \\text{NA}_{0}(C - H) + \\text{NI}(C - A) - \\text{Div}(C - D)",
          plain: "NA<sub>0</sub> is the euro net assets at acquisition, NI and Div are euro net income and dividends, and H, A, D, C are the historical, average, dividend and current rates. Kestrel: 1,000 x (1.00 - 1.20) + 200 x (1.00 - 1.10) - 50 x (1.00 - 1.04) = -200 - 20 + 2 = -218. The opening net investment lost 20 cents per euro; this year's profit was earned at 1.10 and is now worth 1.00; the dividend left at 1.04 and escaped part of the slide.",
        },
        { t: "h", text: "The temporal method, by hand" },
        {
          t: "steps",
          title: "Order of work: balance sheet first, remeasurement gain last",
          items: [
            { title: "Translate the balance sheet", html: "Monetary items at 1.00 (cash 550, receivables 300, payables 400, debt 700). Inventory at 1.05 = 525. PP&amp;E at 1.20 = 1,080. Share capital at 1.20 = 1,200." },
            { title: "Retained earnings is the balance sheet plug", html: "Total assets 2,455 - liabilities 1,100 - share capital 1,200 = 155." },
            { title: "Net income follows from retained earnings", html: "Ending retained earnings 155 + dividends 52 - beginning retained earnings 0 = 207." },
            { title: "Translate the income statement", html: "Revenue, other expenses and tax at 1.10. COGS and depreciation at the historical rates of the inventory and plant they came from." },
            { title: "The remeasurement gain or loss is the income statement plug", html: "Net income 207 - income before remeasurement 145 = a gain of 62, reported in net income." },
          ],
        },
        {
          t: "table",
          caption: "Temporal method",
          head: ["Line", "EUR", "Rate", "USD"],
          rows: [
            ["Revenue", "2,000", "1.10 average", "2,200"],
            ["Cost of goods sold", "(1,200)", "400 x 1.20 + 1,300 x 1.10 - 500 x 1.05", "(1,385)"],
            ["Depreciation", "(100)", "1.20 historical", "(120)"],
            ["Other operating expenses", "(400)", "1.10 average", "(440)"],
            ["Remeasurement gain", "", "plug", "62"],
            ["Income tax", "(100)", "1.10 average", "(110)"],
            ["<b>Net income</b>", "200", "", "<b>207</b>"],
            ["Cash / receivables", "550 / 300", "1.00 current", "550 / 300"],
            ["Inventory", "500", "1.05 historical", "525"],
            ["PP&amp;E, net", "900", "1.20 historical", "1,080"],
            ["<b>Total assets</b>", "2,250", "", "<b>2,455</b>"],
            ["Accounts payable / long-term debt", "400 / 700", "1.00 current", "400 / 700"],
            ["Share capital", "1,000", "1.20 historical", "1,200"],
            ["Retained earnings", "150", "plug", "155"],
            ["<b>Total liabilities and equity</b>", "2,250", "", "<b>2,455</b>"],
          ],
        },
        {
          t: "formula",
          name: "Cost of goods sold under the temporal method",
          tex: "\\text{COGS} = \\text{Beg. inv.} \\times H_{\\text{beg}} + \\text{Purchases} \\times A - \\text{End. inv.} \\times H_{\\text{end}}",
          plain: "The inventory roll-forward, each piece at the rate when that inventory was bought. Kestrel: 400 x 1.20 + 1,300 x 1.10 - 500 x 1.05 = 480 + 1,430 - 525 = 1,385.",
        },
        {
          t: "formula",
          name: "The remeasurement gain or loss, from the net monetary position",
          tex: "\\text{Gain (loss)} = \\text{NMP}_{\\text{end}} \\times C - \\left(\\text{NMP}_{\\text{beg}} \\times S_{\\text{beg}} + \\sum \\text{flow}_i \\times S_i \\right)",
          plain: "NMP is net monetary assets (negative for a net monetary liability). The bracket is what the monetary position cost in dollars as it was built up; the first term is what it is worth now. Kestrel: opening -400 x 1.20 = -480, plus sales 2,200, minus purchases 1,430, other expenses 440, tax 110 and dividends 52, gives -312. Year end: -250 x 1.00 = -250. Gain = -250 - (-312) = 62, the same number the plug produced.",
        },
        {
          t: "p",
          html: `<p>Now watch the same year land in Pinnacle's consolidated statements. Kestrel's share capital is eliminated against Pinnacle's investment, so what you see is Kestrel's assets, liabilities, revenue and expenses in dollars, and the place where each method parks the effect of the euro's fall.</p>`,
        },
        { t: "theater", scenario: "lm12-cta-vs-remeasurement" },
        {
          t: "callout",
          tone: "trap",
          title: "Retained earnings traps",
          html: "<p>Under the current rate method, retained earnings is never euro retained earnings x some rate. It is rolled forward: beginning translated retained earnings + translated net income - dividends at the declaration-date rate. Under the temporal method, retained earnings comes out of the balance sheet first, and net income is backed out of it.</p><p>In later years the beginning figures are simply last year's ENDING translated figures: beginning retained earnings and the beginning CTA carry over in dollars. OCI shows only this year's change in the CTA.</p>",
        },
        {
          t: "check",
          id: "lm12-we-1",
          q: "Suppose the euro had instead closed the year at 1.30 (all other rates unchanged). Under the current rate method, Kestrel's cumulative translation adjustment would be closest to:",
          options: ["127", "(218)", "345"],
          answer: 0,
          why: "Net assets 1,150 x 1.30 = 1,495. Share capital 1,200 and retained earnings 220 - 52 = 168 do not depend on the closing rate. CTA = 1,495 - 1,200 - 168 = 127. Check with the formula: 1,000 x 0.10 + 200 x 0.20 - 50 x 0.26 = 100 + 40 - 13 = 127.",
        },
        {
          t: "check",
          id: "lm12-we-2",
          q: "With the euro closing at 1.30 instead, the temporal method's remeasurement result would be:",
          options: ["A loss of 13", "A gain of 62", "A gain of 13"],
          answer: 0,
          why: "Kestrel's net monetary position at year end is a liability of EUR 250, worth -250 x 1.30 = -325. It cost -312 to build up, so the remeasurement is -325 - (-312) = a loss of 13. A stronger euro hurts a net monetary liability.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "exposure",
      title: "Balance sheet exposure: predicting the sign before you calculate",
      los: ["d", "f"],
      blocks: [
        {
          t: "p",
          html: `<p>On an exam you rarely have time to translate a whole balance sheet just to learn whether the adjustment is positive or negative. You do not need to. The lines translated at the current rate are the ones the rate move can touch: they are the <b>exposed</b> items. Net them, and you know the sign. This balance sheet exposure is also called translation exposure or accounting exposure.</p>
<p>Under the current rate method every asset and liability is at the current rate, so exposure is <b>net assets</b> (equity). That is positive for any solvent subsidiary, which is why a stronger foreign currency almost always means a positive translation adjustment. Under the temporal method only monetary items (and anything carried at current value) are exposed. Inventory and plant are not, so a typical subsidiary that funds its fixed assets with borrowing ends up with a <b>net monetary liability</b>, and a stronger foreign currency means a remeasurement LOSS.</p>`,
        },
        {
          t: "table",
          caption: "Exposure and the direction of the effect",
          head: ["Method and position", "Foreign currency strengthens", "Foreign currency weakens"],
          rows: [
            ["Current rate method, net asset exposure", "Positive translation adjustment (OCI)", "Negative translation adjustment (OCI)"],
            ["Current rate method, net liability exposure", "Negative translation adjustment", "Positive translation adjustment"],
            ["Temporal method, net monetary ASSET exposure", "Remeasurement gain (net income)", "Remeasurement loss (net income)"],
            ["Temporal method, net monetary LIABILITY exposure", "Remeasurement loss (net income)", "Remeasurement gain (net income)"],
          ],
        },
        {
          t: "callout",
          tone: "example",
          title: "Kestrel Europe: one rate move, opposite signs",
          html: "Net assets are EUR 1,150, so under the current rate method the euro's slide from 1.20 to 1.00 produced a negative translation adjustment of 218. Net monetary position: cash 550 + receivables 300 - payables 400 - debt 700 = EUR (250), a net monetary liability. Under the temporal method the same slide produced a GAIN of 62. Drag the current rate in the workbench above and watch both numbers: the CTA line rises with a stronger euro, the remeasurement line falls.",
        },
        {
          t: "table",
          caption: "Translated amounts when the foreign currency strengthens vs weakens (Kestrel, same euro data)",
          head: ["Item", "Current rate method", "Temporal method"],
          rows: [
            ["Revenue and most expenses", "Higher with a stronger currency (average rate)", "Higher with a stronger currency (average rate)"],
            ["COGS and depreciation", "Move with the average rate", "Fixed at historical rates"],
            ["Total assets", "All assets move with the current rate", "Only monetary assets move"],
            ["Net income", "Higher with a stronger currency, in proportion to the average rate", "Depends on the sign of the net monetary position: a net monetary liability means a remeasurement loss when the currency strengthens"],
            ["Equity", "Moves with net assets through the CTA", "Moves only through net income"],
          ],
        },
        {
          t: "p",
          html: `<p>Exposure is also something management can steer. Under the temporal method, a subsidiary that holds monetary assets equal to its monetary liabilities has no net exposure, so a rate move produces no remeasurement gain or loss; this is sometimes called a <b>balance sheet hedge</b>. Under the current rate method the same trick would require net assets of zero, which no going concern can arrange, so the CTA is much harder to avoid.</p>
<p>A group can also have both kinds of subsidiary at once: a self-contained euro operation translated with the current rate method and a dollar-functional sales branch remeasured with the temporal method. Its net income then contains remeasurement gains and losses from the second while the first's translation adjustment sits in OCI. The disclosures (below) are the only way to separate them.</p>`,
        },
        {
          t: "callout",
          tone: "gaap",
          title: "Disclosures about translation (IFRS and US GAAP)",
          html: "Both require the amount of exchange differences recognized in profit and the net exchange differences recognized in OCI and accumulated in a separate component of equity, with a reconciliation of that component from the beginning to the end of the period. IFRS also requires a disclosure when the presentation currency differs from the functional currency, and when the functional currency changes, with the reasons. The movement in the CTA tells you which way and how much the currency has moved the group's net investment.",
        },
        {
          t: "check",
          id: "lm12-ex-1",
          q: "A subsidiary remeasured with the temporal method holds monetary assets of 300 and monetary liabilities of 900 (in its local currency). The local currency weakens against the parent's currency during the year. The parent will most likely report:",
          options: ["A remeasurement gain in net income", "A remeasurement loss in net income", "A negative translation adjustment in OCI"],
          answer: 0,
          why: "Net monetary liability of 600. A weaker local currency means those local-currency debts cost fewer parent-currency units to settle, a gain. Under the temporal method it goes to net income, not OCI.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "ratios",
      title: "What translation does to financial ratios",
      los: ["f"],
      blocks: [
        {
          t: "p",
          html: `<p>A ratio of two numbers multiplied by the SAME rate does not change: \\(\\frac{a \\times C}{b \\times C} = \\frac{a}{b}\\). That one line of algebra predicts almost everything about translated ratios.</p>
<p>Under the current rate method every balance sheet line except equity's historical components uses the current rate, and every income statement line uses the average rate. So a ratio built entirely from the balance sheet (current ratio, debt to equity) or entirely from the income statement (gross margin, net profit margin) comes through unchanged. A <b>mixed</b> ratio, with an income statement number over a balance sheet number (return on assets, asset turnover, return on equity), uses two different rates and changes.</p>
<p>Under the temporal method the rates are mixed INSIDE each statement: inventory and plant at historical rates beside cash at the current rate; COGS and depreciation at historical rates beside revenue at the average rate; and a remeasurement gain or loss that exists only in dollars. So almost every ratio changes.</p>`,
        },
        {
          t: "table",
          caption: "Kestrel Europe ratios at the default rates (historical 1.20, average 1.10, current 1.00)",
          head: ["Ratio", "Kind", "Euro statements", "Current rate method", "Temporal method"],
          rows: [
            ["Current ratio", "Balance sheet only", "3.38x", "3.38x (same)", "3.44x"],
            ["Debt to equity", "Balance sheet only", "0.61x", "0.61x (same)", "0.52x"],
            ["Gross margin", "Income statement only", "40.0%", "40.0% (same)", "37.0%"],
            ["Net profit margin", "Income statement only", "10.0%", "10.0% (same)", "9.4%"],
            ["Return on assets", "Mixed", "8.9%", "9.8%", "8.4%"],
            ["Total asset turnover", "Mixed", "0.89x", "0.98x", "0.90x"],
          ],
          note: "Ratios use year-end balance sheet amounts. Under the temporal method, the current ratio rises because inventory is at 1.05 while payables are at 1.00, and debt to equity falls because PP&amp;E at 1.20 inflates equity.",
        },
        {
          t: "formula",
          name: "Mixed ratios under the current rate method",
          tex: "\\text{ROA}_{\\$} = \\frac{\\text{NI} \\times A}{\\text{TA} \\times C} = \\text{ROA}_{\\text{local}} \\times \\frac{A}{C}",
          plain: "If the foreign currency STRENGTHENED during the year, the closing rate is above the average (C greater than A), so translated return on assets and asset turnover come out BELOW the local-currency ratios. If it weakened, as the euro did for Kestrel, they come out above: 8.9% x 1.10 / 1.00 = 9.8%.",
        },
        {
          t: "p",
          html: `<p><b>Gross margin under the temporal method</b> moves for a reason worth understanding rather than memorizing. COGS is translated at the older, historical rates of the inventory sold, while revenue uses the average rate. When the foreign currency is <b>strengthening</b>, those older rates are LOWER than the average, so COGS is translated relatively cheaply and the gross margin is HIGHER than in local currency. When the currency is <b>weakening</b>, as the euro was for Kestrel, older rates are higher, COGS is relatively expensive, and the gross margin falls: 37.0% against 40.0%. This assumes first-in, first-out (FIFO) costing, as in the Kestrel example: the inventory left at year end is the newest purchases and carries recent rates, so the goods sold carry the older ones.</p>
<p>Net profit margin under the temporal method also carries the remeasurement gain or loss, which has nothing to do with operations. Kestrel's 9.4% includes a 62 gain; strip it out and the margin before remeasurement is 145 / 2,200 = 6.6%. An analyst comparing subsidiaries should look at margins before the remeasurement line.</p>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "What the analyst does with this",
          html: "For a subsidiary translated with the current rate method, the local-currency ratios describe the business and the pure translated ratios equal them, so you can analyze the subsidiary in its own currency. For one remeasured with the temporal method, the translated ratios mix rates, and the remeasurement gain or loss sits in net income: compare margins before it, and remember that its sign depends on the balance sheet, not on how well the business ran.",
        },
        {
          t: "check",
          id: "lm12-ra-1",
          q: "Under the current rate method, which ratio computed from translated statements most likely differs from the same ratio computed in the subsidiary's local currency?",
          options: ["Current ratio", "Net profit margin", "Return on assets"],
          answer: 2,
          why: "Return on assets divides net income (average rate) by total assets (current rate), so the two rates no longer cancel. The current ratio uses only balance sheet lines at the current rate, and net profit margin only income statement lines at the average rate, so both survive translation.",
        },
        {
          t: "check",
          id: "lm12-ra-2",
          q: "A subsidiary's local currency strengthened steadily during the year and its inventory turns over every few months. Under the temporal method, its translated gross margin compared with its local-currency gross margin is most likely:",
          options: ["Higher", "Lower", "Unchanged"],
          answer: 0,
          why: "COGS uses the historical rates of inventory bought earlier, when the local currency was weaker, while revenue uses the higher average rate. COGS is translated at relatively lower rates than revenue, so the gross margin is higher.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "hyperinflation",
      title: "Hyperinflationary economies: keeping the factory from disappearing",
      los: ["g"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle also owns Kestrel Sur, which operates in a country where prices doubled last year and the local currency lost 60% of its value against the dollar. On 1 January Kestrel Sur bought a building for 1,000 local currency units (LCU), at USD 0.40 per LCU: Pinnacle paid USD 400 for it. A year later, after one year of depreciation, it stands at LCU 900 in the local books.</p>
<p>Translate that with the current rate method and the closing rate of 0.16 gives USD 144. Pinnacle paid USD 400 for the building, and a year of depreciation alone would leave USD 360; instead, without anyone touching it, the building has shrunk to USD 144 in Pinnacle's statements. Nothing happened to the building. The measuring stick melted: a currency that loses most of its purchasing power makes historical-cost amounts in that currency meaningless, and multiplying a meaningless number by a collapsed exchange rate makes it worse. Both standards therefore forbid the plain current rate method here, but they fix it in different ways.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "US GAAP: treat it as a dollar business",
              tone: "purple",
              points: [
                "An economy is highly inflationary when cumulative inflation over three years is about 100% or more",
                "Its currency cannot be the functional currency: the parent's reporting currency is used instead",
                "So the subsidiary is remeasured with the temporal method",
                "Non-monetary assets keep their historical rates: the building stays at 900 x 0.40 = 360",
                "Remeasurement gain or loss on the net monetary position goes to net income",
              ],
            },
            {
              title: "IFRS (IAS 29): restate, then translate",
              tone: "green",
              points: [
                "Step 1: restate the local statements into current purchasing power using a general price index",
                "Monetary items are not restated (they are already in current units)",
                "Non-monetary items are restated by the change in the index since they were acquired; income statement items since they were recorded",
                "The purchasing power gain or loss on the net monetary position goes to profit",
                "Step 2: translate EVERY amount, balance sheet and income statement, at the current rate",
              ],
            },
          ],
        },
        {
          t: "steps",
          title: "IAS 29 on Kestrel Sur (price index 100 at the start, 150 on average, 200 at the end)",
          items: [
            { title: "Restate non-monetary items", html: "Building LCU 900 x 200/100 = 1,800. Share capital LCU 400 x 200/100 = 800. Depreciation LCU 100 x 200/100 = 200." },
            { title: "Restate income statement items", html: "Revenue LCU 1,200 x 200/150 = 1,600. Cash expenses LCU 750 x 200/150 = 1,000." },
            { title: "Purchasing power gain or loss on the net monetary position", html: "Kestrel Sur started with a net monetary liability of LCU 600 (cash 200, debt 800). Inflation of 100% halved the real burden of that debt: a gain of 600 x (200/100 - 1) = 600. It then took in net monetary inflows of 450 (revenue 1,200 - expenses 750) at an average index of 150, which lost purchasing power: a loss of 450 x (200/150 - 1) = 150. Net gain 450." },
            { title: "Restated net income", html: "1,600 - 1,000 - 200 + 450 = LCU 850, which is exactly what makes the restated balance sheet balance (cash 650 + building 1,800 = debt 800 + capital 800 + retained earnings 850)." },
            { title: "Translate everything at the current rate of 0.16", html: "Building 288, cash 104, debt 128, capital 128, retained earnings 136. Revenue 256, expenses 160, depreciation 32, purchasing power gain 72, net income 136." },
          ],
        },
        { t: "widget", name: "HyperinflationLab" },
        {
          t: "table",
          caption: "Kestrel Sur in US dollars: inflation 100%, currency down 60% (0.40 to 0.16, average 0.28)",
          head: ["", "No adjustment (not allowed)", "US GAAP: temporal", "IFRS: IAS 29 then current rate"],
          rows: [
            ["Cash (LCU 650)", "104", "104", "104"],
            ["Building, net (LCU 900)", "144", "360", "288"],
            ["Total assets", "248", "464", "392"],
            ["Debt (LCU 800)", "128", "128", "128"],
            ["Share capital", "160", "160", "128"],
            ["Retained earnings / translation adjustment", "98 / (138)", "176", "136"],
            ["Revenue", "336", "336", "256"],
            ["Depreciation", "(28)", "(40)", "(32)"],
            ["Gain on net monetary position", "none", "90 (remeasurement)", "72 (purchasing power)"],
            ["Net income", "98", "176", "136"],
          ],
          note: "Cash expenses are 210 (US GAAP), 160 (IFRS) and 210 (no adjustment). US GAAP remeasurement gain: the net monetary liability of LCU 600 cost USD 240 at 0.40, net inflows of 450 added USD 126 at 0.28, so the position cost -114; at year end it is -150 x 0.16 = -24, a gain of 90.",
        },
        {
          t: "p",
          html: `<p>The ratios move as much as the totals. With no adjustment, the shrunken building leaves total assets of only 248, so return on assets reads 98 / 248 = 39.5% and debt to equity 128 / 120 = 1.07x: the subsidiary looks both more profitable per dollar of assets and far more levered than either permitted treatment shows (US GAAP: 37.9% and 0.38x; IFRS: 34.7% and 0.48x).</p>
<p>Under both permitted treatments, net profit margin is above 50% (176 / 336 = 52.4% under US GAAP, 136 / 256 = 53.1% under IFRS), largely because of the gain on the net monetary liability. That gain comes from owing money in a collapsing currency, not from selling anything. Before it, the margins are 86 / 336 = 25.6% and 64 / 256 = 25.0%. When you compare a hyperinflationary subsidiary with other operations, look at results before the monetary gain or loss, and remember that its size depends on how the subsidiary is financed.</p>`,
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why restate-then-translate makes sense",
          html: "Inflation and devaluation are two faces of the same collapse. Restating multiplies the building's local amount by the inflation factor (x 2.0); translating at the current rate divides it by the devaluation factor. When the currency falls exactly as much as inflation implies (here, 50% for 100% inflation), the two cancel and the IFRS balance sheet equals the US GAAP one: the building is worth its original dollars. Set the lab's devaluation to match inflation and watch the columns agree. When they do not cancel, IFRS reflects the real change in purchasing power rather than freezing an old rate.",
        },
        {
          t: "callout",
          tone: "gaap",
          title: "Recognizing hyperinflation",
          html: "<p><b>US GAAP</b> uses a bright line: cumulative inflation of about 100% or more over the past three years makes the economy highly inflationary.</p><p><b>IFRS</b> (IAS 29) uses judgment, guided by indicators: the population prefers to keep wealth in non-monetary assets or a stable foreign currency; prices are quoted in a stable foreign currency; credit prices include compensation for the expected loss of purchasing power; interest rates, wages and prices are linked to a price index; and cumulative inflation over three years approaches or exceeds 100%.</p>",
        },
        {
          t: "check",
          id: "lm12-hy-1",
          q: "A US GAAP reporter owns a subsidiary in a country whose cumulative inflation over three years exceeds 100%. The subsidiary's statements are brought into the parent's statements using:",
          options: ["The temporal method, with the parent's reporting currency as the functional currency", "Restatement for inflation with a general price index, then the current rate method", "The current rate method, with the local currency as the functional currency"],
          answer: 0,
          why: "US GAAP does not allow a highly inflationary currency to be the functional currency, so the parent's currency is used and the temporal method applies. Restating with a price index first is the IFRS (IAS 29) approach.",
        },
        {
          t: "check",
          id: "lm12-hy-2",
          q: "Under IFRS, after a hyperinflationary subsidiary's statements are restated for inflation, which rate is used to translate its income statement into the parent's presentation currency?",
          options: ["The current rate", "The average rate", "Historical rates for depreciation and cost of goods sold"],
          answer: 0,
          why: "IAS 29 statements are already expressed in year-end purchasing power, so every amount, including revenue and expenses, is translated at the closing rate. The average rate would mix a year-end measuring unit with a mid-year exchange rate.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "tax",
      title: "Multinational operations and the effective tax rate",
      los: ["h"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle's effective tax rate (ETR), income tax expense divided by pretax income, fell from 22% to 17.5% this year. Its home country's statutory rate did not change. Neither did the rate abroad. An analyst forecasting next year's earnings needs to know whether the 17.5% is the new normal.</p>
<p>A multinational pays tax in every country where it earns profit, at that country's rate. Its consolidated tax expense is the sum, so its effective rate is a weighted average of the jurisdictions' rates, with each weight being that country's share of pretax income. Shift profit toward a low-tax country and the average falls, with no change in any rate.</p>`,
        },
        { t: "theater", scenario: "lm12-etr-mix" },
        {
          t: "formula",
          name: "Effective tax rate as a weighted average",
          tex: "\\text{ETR} = \\frac{\\text{Income tax expense}}{\\text{Pretax income}} = \\sum_i w_i \\, t_i, \\qquad w_i = \\frac{\\text{Pretax income}_i}{\\text{Pretax income}}",
          plain: "Mix A: 0.8 x 25% + 0.2 x 10% = 22%. Mix B: 0.5 x 25% + 0.5 x 10% = 17.5%. Neither rate changed between the two mixes; only the weights did.",
        },
        {
          t: "table",
          caption: "Where the change shows up: the rate reconciliation in the income tax note",
          head: ["", "Mix A", "Mix B"],
          rows: [
            ["Pretax income", "1,000", "1,000"],
            ["Tax at the home statutory rate (25%)", "250", "250"],
            ["Effect of lower tax rates on foreign earnings", "(30)", "(75)"],
            ["Income tax expense", "220", "175"],
            ["Effective tax rate", "22.0%", "17.5%"],
          ],
          note: "Companies disclose a reconciliation from the statutory rate (or the tax at the statutory rate) to the effective rate. The foreign rate differential line is the one that moves with the geographic mix.",
        },
        {
          t: "p",
          html: `<p>Where profit is booked is partly a management choice. <b>Transfer prices</b>, the prices one part of the group charges another for goods, services and intellectual property, decide how much of the group's profit appears in each country. Tax authorities police them, but within the allowed range a group has an incentive to book more profit where the rate is lower.</p>
<p>So when the ETR moves, read the reconciliation and ask what drove the mix. A lasting shift of real activity abroad may persist; a one-off contract, a temporary tax holiday or an aggressive transfer pricing position can reverse, and with it the low rate. Earnings growth that comes only from a lower ETR is lower quality than growth from operations.</p>`,
        },
        {
          t: "check",
          id: "lm12-tax-1",
          q: "Pinnacle's home statutory rate is 25% and its foreign operations are taxed at 15%. If 40% of pretax income is earned abroad, its effective tax rate is closest to:",
          options: ["21%", "20%", "25%"],
          answer: 0,
          why: "Weighted average: 0.6 x 25% + 0.4 x 15% = 15% + 6% = 21%. A simple average of the two rates gives 20%, which ignores the weights; 25% ignores the foreign earnings entirely.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "sales-growth",
      title: "Sales growth: how much of it will still be there next year?",
      los: ["c", "i"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle's press release says sales grew 14.8%. The chief executive calls it the best year in a decade. Before you raise your forecast, take the growth apart. Sales can grow because Pinnacle sold more units (<b>volume</b>), charged more per unit (<b>price</b>), bought another company (<b>acquisitions</b>), or because foreign sales were translated at a stronger foreign currency (<b>currency</b>). Volume and price together are <b>organic growth</b>.</p>
<p>Only some of those repeat. Currency growth adds no customers and no pricing power, and exchange rates can just as easily move back next year, so it is not sustainable. Acquired sales add revenue once; they repeat as GROWTH only if Pinnacle keeps buying companies, which costs capital. Organic volume growth is the most durable. Price growth lasts as long as the company's pricing power does.</p>`,
        },
        { t: "widget", name: "FxSalesLab", props: { part: "growth" } },
        {
          t: "formula",
          name: "Growth of a foreign subsidiary's sales in the parent's currency",
          tex: "(1 + g_{\\$}) = (1 + g_{\\text{local}}) \\times (1 + g_{\\text{FX}})",
          plain: "g<sub>FX</sub> is the change in the average exchange rate (parent currency per unit of local currency). Kestrel's euro sales up 4% and the euro up 5% on average: (1.04)(1.05) - 1 = 9.2% in dollars. Adding the two (9.0%) misses the cross term.",
        },
        {
          t: "p",
          html: `<p><b>How the rate reaches translated sales.</b> A subsidiary's revenue is translated at the average rate under both methods, so if the euro strengthens 10% on average and Kestrel sells the same euros, Pinnacle reports 10% more dollar sales from Kestrel. Pinnacle's OWN export sales invoiced in euros move the same way: each euro invoice is recorded at the spot rate on the sale date, so a stronger euro means more dollars per sale.</p>
<p>Sales invoiced in the parent's currency behave differently. Suppose Kestrel sells EUR 800 to European customers and also exports USD 220 of goods to US customers, invoiced in dollars. At 1.10 the dollar sales are EUR 200 in Kestrel's books, total EUR 1,000, translated to USD 1,100. If the euro strengthens to 1.25 and nothing else changes, the USD 220 is now only EUR 176 in Kestrel's books: its euro sales FALL 2.4% to EUR 976. Translated back, Pinnacle reports 976 x 1.25 = USD 1,220, up 10.9%, less than the euro's 13.6% rise, because the dollar-invoiced part never changed in dollars.</p>`,
        },
        {
          t: "table",
          caption: "Kestrel Europe: euro-priced and dollar-priced sales when the euro rises from 1.10 to 1.25",
          head: ["", "Euro at 1.10", "Euro at 1.25", "Change"],
          rows: [
            ["Euro-priced sales (EUR 800)", "USD 880", "USD 1,000", "+13.6%"],
            ["Dollar-priced exports (USD 220)", "EUR 200, USD 220", "EUR 176, USD 220", "0% in dollars, -12% in euros"],
            ["Kestrel's sales in euros", "1,000", "976", "-2.4%"],
            ["Kestrel's sales translated into dollars", "1,100", "1,220", "+10.9%"],
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "Constant-currency disclosures",
          html: "Many multinationals report growth in constant currency (this year's sales translated at last year's rates) or organic growth (which also strips out acquisitions and disposals) alongside reported growth, usually in the management discussion. These are non-GAAP measures with company-specific definitions, so read how each is built. Constant-currency growth still includes acquisitions; organic growth does not.",
        },
        {
          t: "check",
          id: "lm12-sg-1",
          q: "Kestrel Europe's sales in euros grew 4% and the euro's average rate against the dollar rose 5%. Growth in Kestrel's sales as reported in Pinnacle's dollar statements is closest to:",
          options: ["9.2%", "9.0%", "1.0%"],
          answer: 0,
          why: "(1.04)(1.05) - 1 = 9.2%. Simple addition (9.0%) leaves out the 4% growth earned on the 5% currency gain; 1.0% subtracts the currency effect instead of adding it.",
        },
        {
          t: "check",
          id: "lm12-sg-2",
          q: "Which component of reported sales growth is LEAST likely to be sustainable?",
          options: ["Higher volumes from new customers", "Translation of foreign sales at a stronger foreign currency", "Price increases on a patented product"],
          answer: 1,
          why: "Currency translation adds no units and no pricing power, and the exchange rate can reverse next year. Volume growth and price increases backed by a patent come from the business itself.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "countries",
      title: "Countries of operation: who wins when the dollar moves?",
      los: ["j", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>You are forecasting Pinnacle's operating profit, and your house view is a dollar 10% stronger against most currencies next year. Reported revenue will obviously fall, since foreign sales will be translated at weaker rates. Will profit fall too?</p>
<p>Not necessarily. What matters is where Pinnacle EARNS and where it SPENDS, currency by currency. A currency in which revenue and costs are about equal is a <b>natural hedge</b>: a move shrinks both and leaves profit nearly untouched. A currency that is mostly revenue (a sales market) hurts profit when it weakens. A currency that is mostly cost (a factory country) helps profit when it weakens. The segment and geographic disclosures, and the market risk or sensitivity disclosures that many companies give in the management discussion, tell you where those weights lie.</p>`,
        },
        { t: "widget", name: "FxSalesLab", props: { part: "mix" } },
        {
          t: "steps",
          title: "Analyzing currency effects from the countries of operation",
          items: [
            { title: "Map revenue and costs by currency", html: "Use geographic segment data, the list of principal subsidiaries, and any disclosure of sales and costs by currency." },
            { title: "Net them currency by currency", html: "Profit sensitivity to a currency is roughly (revenue in it - costs in it) x the percentage move." },
            { title: "Separate translation from transaction effects", html: "Translation changes how a foreign subsidiary's results look in dollars. Transaction effects hit when one entity earns in one currency and spends in another, for example a factory paying costs in renminbi for goods sold in euros, and they change margins inside that entity." },
            { title: "Check the company's own sensitivity disclosure", html: "Many companies state the effect of a 10% currency move on revenue or profit. Use it to sanity-check your own estimate." },
            { title: "Remember the balance sheet", html: "Rate moves also produce translation adjustments in OCI (current rate method subsidiaries) and remeasurement or transaction gains and losses in net income." },
          ],
        },
        {
          t: "check",
          id: "lm12-co-1",
          q: "Pinnacle earns revenue of 1,500 and incurs costs of 300 in pounds sterling (both in dollars at last year's rates). If sterling weakens 10% against the dollar, Pinnacle's operating profit changes by about:",
          options: ["-120", "-150", "-30"],
          answer: 0,
          why: "Revenue falls by 150 and costs by 30, so profit falls by (1,500 - 300) x 10% = 120. Looking only at revenue (-150) ignores the natural hedge from sterling costs.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "When the euro rises after an export sale, the revenue from that sale is restated upward.", right: "Revenue is fixed at the spot rate on the transaction date. Only the open receivable, a monetary item, is restated, and the difference is a transaction gain in profit." },
    { wrong: "The gain or loss at settlement is measured from the original transaction rate.", right: "If a balance sheet date intervened, the receivable or payable was already restated. The settlement gain or loss is measured from the last carrying amount." },
    { wrong: "Under the current rate method, retained earnings is translated at the historical rate.", right: "It is rolled forward: beginning translated retained earnings + net income at the average rate - dividends at the rate when declared." },
    { wrong: "Remeasurement gains and losses under the temporal method go to OCI, like the CTA.", right: "They go to net income. Only the current rate method's translation adjustment goes to OCI." },
    { wrong: "A weaker foreign currency always produces a loss for the parent.", right: "It depends on the exposure. A temporal-method subsidiary with a net monetary liability reports a GAIN when its currency weakens, even though the same subsidiary under the current rate method would show a negative translation adjustment." },
    { wrong: "The current rate method leaves all ratios unchanged.", right: "Only ratios built from one statement survive. Mixed ratios such as return on assets and asset turnover change, because the numerator uses the average rate and the denominator the current rate." },
    { wrong: "Under the temporal method, inventory always uses a historical rate.", right: "Only inventory carried at cost. Inventory written down to market value is measured at a current value, so it uses the rate at the date that value was measured." },
    { wrong: "Deferred revenue is a monetary liability because it sits among liabilities.", right: "It is an obligation to deliver goods or services, not to pay a fixed sum, so it is non-monetary and uses the historical rate under the temporal method." },
    { wrong: "IFRS handles hyperinflation the same way as US GAAP, with the temporal method.", right: "IFRS (IAS 29) restates the local statements with a general price index, then translates everything at the current rate. US GAAP uses the temporal method with the parent's currency as functional." },
    { wrong: "The presentation currency determines which translation method is used.", right: "The functional currency does. A US parent can have one subsidiary translated with the current rate method and another remeasured with the temporal method." },
    { wrong: "A lower effective tax rate with unchanged statutory rates is a durable improvement.", right: "It usually reflects a shift in the mix of earnings toward low-tax countries, which can reverse. Check the rate reconciliation and ask what drove the mix." },
    { wrong: "Constant-currency growth and organic growth are the same thing.", right: "Constant-currency growth removes only the translation effect; it still includes acquisitions. Organic growth removes both." },
  ],

  gaap: [
    { topic: "Functional currency indicators", ifrs: "IAS 21: primary factors (sales prices, competitive forces, costs) ranked ahead of secondary ones (financing, retention of receipts), plus factors on the foreign operation's autonomy", usgaap: "ASC 830: cash flow, sales price, sales market, expense, financing and intercompany indicators, with no ranking" },
    { topic: "Functional currency = local currency", ifrs: "Translate to the presentation currency: assets and liabilities at the closing rate, income and expenses at transaction (or average) rates, differences in OCI", usgaap: "Current rate method (translation), CTA in OCI" },
    { topic: "Functional currency = parent's currency", ifrs: "Translate local records into the functional currency: monetary items at the closing rate, non-monetary at historical (or valuation-date) rates, differences in profit", usgaap: "Temporal method (remeasurement), gains and losses in net income" },
    { topic: "Hyperinflationary economy", ifrs: "IAS 29: restate with a general price index (purchasing power gain or loss in profit), then translate everything at the current rate", usgaap: "Highly inflationary (cumulative three-year inflation about 100% or more): parent's reporting currency is functional, temporal method" },
    { topic: "Recognizing hyperinflation", ifrs: "Judgment guided by indicators, including cumulative three-year inflation approaching or exceeding 100%", usgaap: "Bright line: cumulative three-year inflation of about 100% or more" },
    { topic: "Transaction gains and losses", ifrs: "In profit; net amount disclosed; line not prescribed", usgaap: "In net income; aggregate amount disclosed; line not prescribed" },
    { topic: "Disposal of a foreign operation", ifrs: "Cumulative translation differences reclassified from equity to profit", usgaap: "CTA reclassified to net income on sale or substantially complete liquidation" },
  ],

  formulas: [
    { name: "Transaction gain or loss", tex: "\\text{FC amount} \\times (S_{\\text{end}} - S_{\\text{start}})", plain: "Positive FC amount for a receivable, negative for a payable. Measured period by period: transaction date to balance sheet date, then balance sheet date to settlement." },
    { name: "Translated retained earnings (current rate method)", tex: "\\text{RE}_{\\text{end}} = \\text{RE}_{\\text{beg}} + \\text{NI} \\times A - \\text{Div} \\times D", plain: "Rolled forward in dollars; beginning RE is last year's ending translated RE." },
    { name: "Cumulative translation adjustment, first year", tex: "\\text{NA}_{0}(C - H) + \\text{NI}(C - A) - \\text{Div}(C - D)", plain: "Opening net assets, the year's profit and the dividend, each repriced from the rate at which it entered to the closing rate. Kestrel: -200 - 20 + 2 = -218." },
    { name: "COGS under the temporal method", tex: "\\text{Beg. inv.} \\times H_{\\text{beg}} + \\text{Purchases} \\times A - \\text{End. inv.} \\times H_{\\text{end}}", plain: "The inventory roll-forward at the rates when each piece of inventory was bought." },
    { name: "Remeasurement gain or loss (temporal method)", tex: "\\text{NMP}_{\\text{end}} \\times C - \\left(\\text{NMP}_{\\text{beg}} \\times S_{\\text{beg}} + \\sum \\text{flow}_i \\times S_i\\right)", plain: "What the net monetary position is worth now minus what it cost as it was built. Kestrel: -250 - (-312) = 62." },
    { name: "Mixed ratio under the current rate method", tex: "\\text{ROA}_{\\$} = \\text{ROA}_{\\text{local}} \\times \\frac{A}{C}", plain: "Below the local ratio when the foreign currency strengthened during the year, above it when it weakened." },
    { name: "IAS 29 purchasing power gain or loss", tex: "-\\text{NMP}_{\\text{beg}}\\left(\\frac{P_{\\text{end}}}{P_{\\text{beg}}} - 1\\right) - \\text{net flows}\\left(\\frac{P_{\\text{end}}}{P_{\\text{avg}}} - 1\\right)", plain: "P is the general price index. A net monetary liability gains in real terms as prices rise; net monetary inflows during the year lose. Kestrel Sur: 600 - 150 = 450." },
    { name: "Translated sales growth", tex: "(1 + g_{\\$}) = (1 + g_{\\text{local}})(1 + g_{\\text{FX}})", plain: "Local growth compounded with the change in the average exchange rate." },
    { name: "Effective tax rate", tex: "\\text{ETR} = \\sum_i w_i \\, t_i", plain: "Each jurisdiction's statutory rate weighted by its share of pretax income." },
  ],

  recall: [
    { q: "Define local, functional and presentation currency.", a: "Local: currency of the country where the entity is located. Functional: currency of the primary economic environment in which it operates. Presentation (reporting): currency in which the statements are presented." },
    { q: "Which IFRS indicators of the functional currency come first?", a: "The currency that mainly influences sales prices, the currency of the country whose competitive forces and regulations determine sales prices, and the currency that mainly influences labour, material and other costs." },
    { q: "Where do foreign currency transaction gains and losses go, and when are they recognized?", a: "In profit, under both IFRS and US GAAP, at each balance sheet date while the balance is open (unrealized) and at settlement (realized)." },
    { q: "Current rate method: which rates for assets, liabilities, share capital, revenue and dividends?", a: "Current for all assets and liabilities, historical for share capital, average (or actual) for revenue and expenses, rate when declared for dividends." },
    { q: "Temporal method: which items use historical rates?", a: "Non-monetary items carried at historical cost (inventory at cost, PP&E, intangibles, prepaid expenses, advances received) and the expenses tied to them: COGS, depreciation and amortization. Share capital too." },
    { q: "What is the balance sheet exposure under each method?", a: "Current rate method: net assets. Temporal method: net monetary assets or liabilities." },
    { q: "A temporal-method subsidiary has a net monetary liability and its currency strengthens. Result?", a: "A remeasurement loss in net income." },
    { q: "Which ratios survive the current rate method unchanged?", a: "Pure balance sheet ratios and pure income statement ratios (if one rate is used for each statement). Mixed ratios such as return on assets and asset turnover change." },
    { q: "How do US GAAP and IFRS treat a subsidiary in a hyperinflationary economy?", a: "US GAAP: parent's currency becomes functional, temporal method. IFRS: restate with a general price index under IAS 29, then translate everything at the current rate." },
    { q: "Why can a multinational's effective tax rate fall with no change in tax rates?", a: "Its ETR is a weighted average of jurisdictions' rates; more pretax income in low-tax countries lowers the average." },
    { q: "Which components of sales growth are sustainable?", a: "Organic volume most of all, price as far as pricing power lasts. Acquisitions and currency translation are not organic, and currency effects can reverse." },
    { q: "What happens to the CTA when the subsidiary is sold?", a: "It is reclassified from equity to profit under both IFRS and US GAAP." },
  ],

  itemSets: [
    {
      id: "lm12-is1",
      title: "Harrier GmbH: translating a first year",
      vignette: `<p>Pinnacle Corp formed Harrier GmbH on 1 January with EUR 600 of share capital and a EUR 600 long-term bank loan, when the euro was at USD 1.30. Harrier immediately bought equipment for EUR 1,000. During the year Harrier bought inventory of EUR 1,200 (EUR 200 still unpaid at year end), sold goods for EUR 1,500 (EUR 250 still receivable), paid other operating expenses of EUR 300 in cash and recorded depreciation of EUR 100. Ending inventory of EUR 300 was bought when the euro was at USD 1.38. Harrier paid no dividends and pays no income tax.</p>
<p>Year-end balances in euros: cash 150, receivables 250, inventory 300, equipment (net) 900, accounts payable 200, long-term debt 600, share capital 600, retained earnings 200. The euro averaged USD 1.35 during the year and closed at USD 1.40. Pinnacle reports in US dollars and is deciding whether Harrier's functional currency is the euro or the US dollar.</p>`,
      questions: [
        {
          q: "If Harrier's functional currency is the euro, the translation adjustment for the year is closest to:",
          options: ["A positive adjustment of 70", "A negative adjustment of 40", "A positive adjustment of 60"],
          answer: 0,
          why: "Net income 200 x 1.35 = 270, so retained earnings = 270. Assets 1,600 x 1.40 = 2,240; liabilities 800 x 1.40 = 1,120; share capital 600 x 1.30 = 780. CTA = 2,240 - 1,120 - 780 - 270 = 70. Check: 600 x (1.40 - 1.30) + 200 x (1.40 - 1.35) = 60 + 10 = 70. The 60 counts only the opening net assets.",
        },
        {
          q: "If Harrier's functional currency is the US dollar, the remeasurement gain or loss is closest to:",
          options: ["A loss of 40 in net income", "A gain of 70 in net income", "A gain of 40 in OCI"],
          answer: 0,
          why: "Assets: cash 210 + receivables 350 + inventory 300 x 1.38 = 414 + equipment 900 x 1.30 = 1,170, total 2,144. Liabilities 1,120, share capital 780, so retained earnings and net income = 244. Income before remeasurement: 2,025 - 1,206 - 130 - 405 = 284. Remeasurement = 244 - 284 = a loss of 40, in net income. Harrier has a net monetary liability of EUR 400 and the euro strengthened, so a loss is the expected sign.",
        },
        {
          q: "Under the temporal method, Harrier's cost of goods sold in US dollars is closest to:",
          options: ["1,215", "1,206", "1,170"],
          answer: 1,
          why: "COGS = purchases 1,200 x 1.35 - ending inventory 300 x 1.38 = 1,620 - 414 = 1,206 (there was no opening inventory). 1,215 is EUR 900 x the average rate, the current rate method figure; 1,170 uses the formation-date rate.",
        },
        {
          q: "Which ratio is the same in Harrier's translated statements under the current rate method as in its euro statements?",
          options: ["Return on assets", "Gross profit margin", "Total asset turnover"],
          answer: 1,
          why: "Revenue and COGS are both translated at the average rate, so gross margin stays at 600 / 1,500 = 40%. Return on assets and asset turnover divide an average-rate income statement figure by a current-rate balance sheet figure, so they change.",
        },
      ],
    },
    {
      id: "lm12-is2",
      title: "Pinnacle's annual report: transactions and growth",
      vignette: `<p>On 1 November Pinnacle Corp (US dollar functional and presentation currency) sold goods to a German distributor for EUR 500,000, payable on 31 January. The euro was at USD 1.08 on 1 November, USD 1.12 on 31 December (Pinnacle's year end) and USD 1.10 on 31 January, when the distributor paid in full.</p>
<p>Pinnacle's annual report shows total sales growth of 9%. Management's discussion states that currency translation contributed 5 percentage points and businesses acquired during the year contributed 3 percentage points. Pinnacle reports foreign exchange transaction gains and losses within operating income. Its closest competitor reports them in other non-operating income.</p>`,
      questions: [
        {
          q: "In the year of the sale, Pinnacle recognizes a foreign exchange transaction:",
          options: ["Gain of USD 20,000", "Loss of USD 20,000", "Gain of USD 10,000"],
          answer: 0,
          why: "The receivable was recorded at 500,000 x 1.08 = 540,000 and restated at year end to 500,000 x 1.12 = 560,000. A stronger euro increases the dollar value of a euro receivable: a gain of 20,000 in profit, even though it is unrealized.",
        },
        {
          q: "In the following year, when the receivable is collected, Pinnacle recognizes:",
          options: ["A loss of USD 10,000", "A gain of USD 10,000", "No gain or loss, because the receivable was already restated"],
          answer: 0,
          why: "The receivable is carried at 560,000; Pinnacle collects 500,000 x 1.10 = 550,000, a loss of 10,000 measured from the balance sheet rate. Over the two years the total gain is 550,000 - 540,000 = 10,000.",
        },
        {
          q: "Pinnacle's organic sales growth for the year is closest to:",
          options: ["1%", "4%", "6%"],
          answer: 0,
          why: "Organic growth excludes both currency and acquisitions: 9% - 5% - 3% = 1%. Excluding only currency (4%) gives constant-currency growth; excluding only acquisitions gives 6%.",
        },
        {
          q: "To compare Pinnacle's operating margin with its competitor's, an analyst should most likely:",
          options: ["Put both companies' transaction gains and losses in the same place before computing margins", "Make no adjustment, because the standards require one presentation", "Remove all foreign sales from both companies"],
          answer: 0,
          why: "Neither IFRS nor US GAAP prescribes where transaction gains and losses are presented, so one company's operating income includes them and the other's does not. Reclassifying them consistently makes the operating margins comparable.",
        },
      ],
    },
    {
      id: "lm12-is3",
      title: "Kestrel Sur: hyperinflation under two standards",
      vignette: `<p>Kestrel Sur, a subsidiary of Pinnacle Corp, operates in a hyperinflationary economy. On 1 January it bought a building for LCU 1,000 with a 10-year life; after that purchase it had cash of LCU 200, debt of LCU 800 and share capital of LCU 400. During the year it earned revenue of LCU 1,200 and paid cash expenses of LCU 750, both evenly through the year. Year-end cash was LCU 650.</p>
<p>The general price index was 100 on 1 January, averaged 150 and ended the year at 200. The exchange rate was USD 0.40 per LCU on 1 January, averaged USD 0.28 and ended at USD 0.16. Pinnacle wants to compare the effect of reporting under US GAAP with reporting under IFRS.</p>`,
      questions: [
        {
          q: "Under US GAAP, the building (net) appears in Pinnacle's consolidated balance sheet at closest to:",
          options: ["USD 360", "USD 288", "USD 144"],
          answer: 0,
          why: "US GAAP treats the economy as highly inflationary and uses the temporal method, so the building keeps its historical rate: LCU 900 x 0.40 = 360. 288 is the IFRS figure; 144 translates the unrestated amount at the current rate, which neither standard allows.",
        },
        {
          q: "Under IFRS, the purchasing power gain or loss on Kestrel Sur's net monetary position, in local currency, is closest to:",
          options: ["A gain of LCU 450", "A gain of LCU 600", "A loss of LCU 150"],
          answer: 0,
          why: "Opening net monetary liability 600 x (200/100 - 1) = a 600 gain; net monetary inflows of 450 x (200/150 - 1) = a 150 loss. Net gain = 450. The other two figures are the components on their own.",
        },
        {
          q: "Under IFRS, Kestrel Sur's net income translated into US dollars is closest to:",
          options: ["USD 136", "USD 176", "USD 56"],
          answer: 0,
          why: "Restated net income = 1,600 - 1,000 - 200 + 450 = LCU 850, translated at the current rate of 0.16 = USD 136. USD 176 is the US GAAP figure; USD 56 is the unrestated LCU 350 at the current rate.",
        },
        {
          q: "Which statement about the US GAAP treatment of Kestrel Sur is most accurate?",
          options: ["Its remeasurement gain of USD 90 is reported in net income", "Its translation adjustment is reported in other comprehensive income", "Its statements are first restated using a general price index"],
          answer: 0,
          why: "Under the temporal method the gain on the net monetary liability, (-150 x 0.16) - (-600 x 0.40 + 450 x 0.28) = -24 - (-114) = 90, goes to net income. There is no translation adjustment in OCI, and price-index restatement is the IFRS approach.",
        },
      ],
    },
  ],

  flags: [
    { los: "a", note: "Functional currency indicators: the IAS 21 primary/secondary ranking and the ASC 830 indicator list were written from the standards. Check the exact wording and grouping the 2026 curriculum uses." },
    { los: "b", note: "The statement that neither IFRS nor US GAAP prescribes the income statement line for transaction gains and losses, and the disclosure wording, should be checked against the curriculum text." },
    { los: "d", note: "The 'balance sheet hedge' paragraph (matching monetary assets and liabilities under the temporal method) is mechanism; confirm the curriculum uses this term before relying on it for an exam answer." },
    { los: "d", note: "Translation terminology: US GAAP 'translation' vs 'remeasurement'. IFRS frames both as translation (into the functional currency, then into the presentation currency). Confirm the curriculum's phrasing." },
    { los: "g", note: "US GAAP highly inflationary threshold stated as cumulative three-year inflation of about 100% or more. Confirm the curriculum's exact wording (some texts say 'exceeding 100%')." },
    { los: "g", note: "HyperinflationLab and the Kestrel Sur numbers assume the price index and exchange rate move evenly through the year (averages are midpoints). The IAS 21 translation difference on the restated opening net investment at the parent level is not modeled; the comparison is at the level of the subsidiary's translated statements, as curriculum examples present it." },
    { los: "c", note: "The Kestrel example of sales invoiced in the parent's currency (euro sales fall while translated sales rise less than the euro) is derived from the mechanics; confirm the curriculum's own framing of LOS b." },
    { los: "i", note: "Sustainability ranking of price vs volume growth: the module treats volume as most durable and price as dependent on pricing power. Confirm the curriculum's emphasis." },
    { los: "h", note: "Transfer pricing is mentioned as a driver of the earnings mix. Confirm it appears in the 2026 curriculum's discussion of the effective tax rate." },
    { los: "e", note: "Scenario lm12-cta-vs-remeasurement hides the cash flow statement: a translated cash flow statement needs an 'effect of exchange rate changes on cash' line outside operating, investing and financing, which the ledger engine does not model. Income statement items are translated at the average rate as an approximation of transaction-date rates." },
  ],
};
