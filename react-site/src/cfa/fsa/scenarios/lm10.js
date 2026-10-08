/* LM10 Intercorporate Investments: animated scenarios.
   Demo companies: Pinnacle Corp (the investor/parent) and Kestrel Ltd (the
   investee/subsidiary). All numbers are illustrative, chosen so each effect is
   visible on its own. Every scenario passes scenarios.test.js:
   debits = credits on every step, A = L + E after every step, cash ties. */
import { cash, asset, liab, equity, re, aoci, nciEq, rev, exp, oci, nciAlloc, dr, cr } from "./_kit.js";

/* ------------------------------------------------------------------ */
const finAssetsDebt = {
  id: "lm10-debt-three-ways",
  module: "lm10",
  title: "One bond, three business models",
  standard: "IFRS 9 (US GAAP equivalents in brackets)",
  summary:
    "Pinnacle buys the same 5% bond three times, once under each classification. Watch where the same 40 of price gain lands: nowhere, in OCI, or in profit. Then watch what happens on sale.",
  accounts: [
    cash(),
    asset("bond", "Investment in bonds", "nca"),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    rev("intInc", "Interest income"),
    rev("fvGain", "Unrealized gain on FVPL securities"),
    rev("realGain", "Realized gain on sale of securities"),
    oci("fvociGain", "Unrealized gain on FVOCI debt"),
    oci("recycle", "Reclassified to profit on sale"),
  ],
  columns: [
    { id: "ac", label: "Amortized cost", sub: "[US GAAP: held-to-maturity]", opening: { cash: 2000, sc: 1500, re: 500 } },
    { id: "fvoci", label: "FVOCI", sub: "[US GAAP: available-for-sale]", opening: { cash: 2000, sc: 1500, re: 500 } },
    { id: "fvpl", label: "FVPL", sub: "[US GAAP: trading]", opening: { cash: 2000, sc: 1500, re: 500 } },
  ],
  steps: [
    {
      title: "Buy a 1,000 par, 5% annual-coupon bond at par",
      html:
        "Pinnacle pays 1,000 cash for the bond. On day one all three classifications record the same asset at the same amount: fair value at purchase equals cost. The only difference is the cash flow line. Securities held for trading are an operating activity, because buying and selling them IS the business; the other two are investing.",
      entries: {
        ac: [dr("bond", 1000), cr("cash", 1000, "CFI", "Purchase of debt securities")],
        fvoci: [dr("bond", 1000), cr("cash", 1000, "CFI", "Purchase of debt securities")],
        fvpl: [dr("bond", 1000), cr("cash", 1000, "CFO", "Purchase of trading securities")],
      },
      insight: "Initial measurement is fair value in all three. Classification only matters for what happens NEXT.",
    },
    {
      title: "Receive the 50 coupon",
      html:
        "Bought at par, so the effective interest rate equals the 5% coupon and there is no premium or discount to amortize. Interest income of 50 goes to profit in every column. Interest income is never parked in OCI, whatever the classification.",
      entries: {
        ac: [dr("cash", 50, "CFO", "Interest received"), cr("intInc", 50)],
        fvoci: [dr("cash", 50, "CFO", "Interest received"), cr("intInc", 50)],
        fvpl: [dr("cash", 50, "CFO", "Interest received"), cr("intInc", 50)],
      },
      insight: "Same income statement so far. The columns are about to split.",
    },
    {
      title: "Year end: market rates fall, the bond is now worth 1,040",
      html:
        "This is the moment the three classifications exist for. Amortized cost ignores the price move entirely, because the business model is to collect contractual cash flows, and a temporary price swing tells you nothing about those. FVOCI marks the asset up but keeps the gain out of profit, in OCI. FVPL marks the asset up AND books the gain in profit.",
      entries: {
        ac: [],
        fvoci: [dr("bond", 40), cr("fvociGain", 40)],
        fvpl: [dr("bond", 40), cr("fvGain", 40)],
      },
      notes: {
        ac: "Balance sheet still shows 1,000. Fair value goes to the notes only.",
        fvoci: "Asset at 1,040. Gain of 40 in OCI, so equity rises but net income does not.",
        fvpl: "Asset at 1,040. Gain of 40 in net income.",
      },
      insight:
        "Total assets are now LOWER under amortized cost than under the other two. Net income is HIGHEST under FVPL. Equity is the same under FVOCI and FVPL, because OCI is still equity.",
      exam: "Classic item-set question: which classification reports the highest net income when prices rise? FVPL. The highest equity? FVOCI and FVPL tie.",
    },
    {
      title: "Close the year",
      html:
        "Net income rolls into retained earnings and OCI rolls into accumulated OCI. The income statement and cash flow statement restart at zero for year two. Watch the 40 sitting in AOCI for the FVOCI column: it is still waiting to be recognized in profit.",
      entries: { ac: [], fvoci: [], fvpl: [] },
      close: true,
      practice: false,
    },
    {
      title: "Year two: sell the bond for 1,040",
      html:
        "Now the deferred gains come home. Amortized cost recognizes the whole 40 as a realized gain today, because it never recognized anything before. FVOCI also shows a 40 realized gain in profit, but it did not earn anything new: it RECYCLES the 40 out of AOCI, which is why the OCI line shows minus 40 in the same year. FVPL already took the gain last year, so the sale is a non-event in profit.",
      entries: {
        ac: [dr("cash", 1040, "CFI", "Proceeds from sale of debt securities"), cr("bond", 1000), cr("realGain", 40)],
        fvoci: [
          dr("cash", 1040, "CFI", "Proceeds from sale of debt securities"),
          cr("bond", 1040),
          dr("recycle", 40),
          cr("realGain", 40),
        ],
        fvpl: [dr("cash", 1040, "CFO", "Proceeds from sale of trading securities"), cr("bond", 1040)],
      },
      insight:
        "Over the bond's life all three report the same total comprehensive income: 50 of interest plus 40 of gain. Classification changes WHEN and WHERE income appears, never how much.",
      exam: "Recycling is the FVOCI-debt signature. Under IFRS 9 it happens for debt at FVOCI but NEVER for equity at FVOCI.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Other comprehensive income", fn: (S) => S.OCI, fmt: "num" },
    { label: "Total assets", fn: (S) => S.TA, fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const finAssetsEquity = {
  id: "lm10-equity-securities",
  module: "lm10",
  title: "An equity stake below significant influence",
  standard: "IFRS 9 vs US GAAP",
  summary:
    "Pinnacle buys a 5% stake in a listed company. IFRS lets it make an irrevocable election to put fair value changes through OCI; US GAAP does not. Watch the one place equity FVOCI differs from debt FVOCI: at sale, nothing is recycled.",
  accounts: [
    cash(),
    asset("eqSec", "Investment in equity securities", "nca"),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    rev("divInc", "Dividend income"),
    rev("fvGain", "Fair value gain on equity securities"),
    oci("fvociGain", "Fair value gain on FVOCI equity"),
  ],
  columns: [
    { id: "fvpl", label: "FVPL", sub: "IFRS default, and US GAAP (FVNI)", opening: { cash: 1000, sc: 800, re: 200 } },
    { id: "fvoci", label: "FVOCI election", sub: "IFRS only, irrevocable", opening: { cash: 1000, sc: 800, re: 200 } },
  ],
  steps: [
    {
      title: "Buy a 5% stake for 500",
      html: "Too small for significant influence, so this is a financial asset. Both columns record it at its 500 fair value.",
      entries: {
        fvpl: [dr("eqSec", 500), cr("cash", 500, "CFI", "Purchase of equity securities")],
        fvoci: [dr("eqSec", 500), cr("cash", 500, "CFI", "Purchase of equity securities")],
      },
    },
    {
      title: "Receive a 20 dividend",
      html: "Dividends go to profit in both columns. The FVOCI election moves FAIR VALUE CHANGES to OCI; it never moves dividends.",
      entries: {
        fvpl: [dr("cash", 20, "CFO", "Dividends received"), cr("divInc", 20)],
        fvoci: [dr("cash", 20, "CFO", "Dividends received"), cr("divInc", 20)],
      },
    },
    {
      title: "Year end: the stake is worth 560",
      html: "The 60 gain lands in profit under FVPL and in OCI under the election.",
      entries: {
        fvpl: [dr("eqSec", 60), cr("fvGain", 60)],
        fvoci: [dr("eqSec", 60), cr("fvociGain", 60)],
      },
    },
    { title: "Close the year", html: "NI into retained earnings, OCI into AOCI.", entries: {}, close: true, practice: false },
    {
      title: "Year two: sell for 560, and the no-recycling rule",
      html:
        "FVPL: the gain was already in profit, the sale is a cash event only. FVOCI equity: the 60 sitting in AOCI is NEVER reclassified to profit. IFRS permits a transfer within equity, from AOCI straight to retained earnings, which is what you see here: equity is unchanged in total, profit is untouched.",
      entries: {
        fvpl: [dr("cash", 560, "CFI", "Proceeds from sale of equity securities"), cr("eqSec", 560)],
        fvoci: [dr("cash", 560, "CFI", "Proceeds from sale of equity securities"), cr("eqSec", 560), dr("aoci", 60), cr("re", 60)],
      },
      insight: "Lifetime profit: FVPL 80 (20 dividend + 60 gain). FVOCI election 20 (dividend only). The 60 gain never touches the income statement.",
      exam: "Debt at FVOCI recycles. Equity at FVOCI does not. This one distinction is worth a question on its own.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "OCI", fn: (S) => S.OCI, fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const equityMethod = {
  id: "lm10-equity-method",
  module: "lm10",
  title: "The equity method, with an excess purchase price",
  standard: "IFRS (IAS 28) and US GAAP (ASC 323): same mechanics",
  summary:
    "Pinnacle buys 30% of Kestrel for 300, more than 30% of Kestrel's book value. Follow the single line 'Investment in associate' as it absorbs Pinnacle's share of profit, the depreciation of the hidden fair value step-up, and the dividends.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("inv", "Investment in associate (Kestrel)", "nca"),
    asset("ppe", "Property, plant and equipment (net)", "nca"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    exp("dep", "Depreciation"),
    rev("eqInc", "Share of profit of associate"),
  ],
  opening: { cash: 1000, rec: 200, ppe: 1800, debt: 1000, sc: 1200, re: 800 },
  company: "Pinnacle Corp",
  steps: [
    {
      title: "Buy 30% of Kestrel for 300 cash",
      html:
        "Kestrel's book value of net assets is 800, so 30% of book is 240. Pinnacle paid 300. The extra 60 is not lost; Pinnacle paid it because Kestrel's assets are worth more than their book value (its plant has a fair value 100 above book, 30% of that is 30) and because of something no line item captures (the remaining 30 is goodwill). None of that breakdown appears on Pinnacle's balance sheet. All 300 sits in ONE line.",
      entries: [dr("inv", 300), cr("cash", 300, "CFI", "Acquisition of associate")],
      memo: {
        title: "Purchase price allocation (memo only, not on the balance sheet)",
        rows: [
          ["Purchase price", "300"],
          ["30% of Kestrel book value (30% x 800)", "(240)"],
          ["Excess purchase price", "60"],
          ["Attributable to plant: 30% x 100 fair value step-up", "(30)"],
          ["Goodwill (the residual)", "30"],
        ],
      },
      insight: "Goodwill inside an equity-method investment is never amortized and never tested for impairment on its own; the WHOLE investment is tested.",
    },
    {
      title: "Kestrel reports net income of 100",
      html:
        "Pinnacle recognizes 30% of it, 30, as its share of profit. Notice there is NO cash. The investment grows because Pinnacle's slice of Kestrel's equity grew. This is the core idea of the equity method: the investment tracks the investor's share of the investee's book equity.",
      entries: [dr("inv", 30), cr("eqInc", 30)],
    },
    {
      title: "Depreciate the 30 fair value step-up over 10 years",
      html:
        "Kestrel depreciates its plant on BOOK value, so its reported profit overstates profit from Pinnacle's point of view: Pinnacle paid for the plant at fair value. Pinnacle fixes this by reducing its share of profit by the extra depreciation, 30 / 10 = 3 per year. Goodwill (the other 30) is NOT amortized.",
      entries: [dr("eqInc", 3), cr("inv", 3)],
      insight: "Equity income is now 27, not 30. On the exam, forgetting this adjustment is the most common wrong answer.",
    },
    {
      title: "Kestrel pays dividends of 40; Pinnacle receives 12",
      html:
        "The dividend is NOT income. Pinnacle already recognized its share of Kestrel's profit; the dividend simply converts part of that share into cash. So cash rises by 12 and the investment falls by 12. Profit does not move.",
      entries: [dr("cash", 12, "CFO", "Dividends received from associate"), cr("inv", 12)],
      insight:
        "This is why equity-method investors can manipulate nothing by squeezing out dividends, and why the investment line can grow while cash does not.",
      exam: "Dividends received are operating cash flows under US GAAP. IFRS allows operating or investing. Ending investment: 300 + 30 - 3 - 12 = 315.",
    },
    {
      title: "Pinnacle's own operations for the year",
      html:
        "Pinnacle's own business: revenue of 1,000 collected in cash, 750 of cash operating costs, 100 of depreciation. Look at the income statement now: equity income of 27 sits BELOW revenue, so it boosts net income without adding a cent of revenue. Margins look better than the operations alone would justify.",
      entries: [
        dr("cash", 1000, "CFO", "Cash received from customers"),
        cr("sales", 1000),
        dr("opex", 750),
        cr("cash", 750, "CFO", "Cash paid for operating expenses"),
        dr("dep", 100),
        cr("ppe", 100),
      ],
      insight:
        "Net profit margin = 177 / 1,000 = 17.7%, but only 150 came from Pinnacle's own revenue. An analyst comparing margins across companies strips out equity income first.",
    },
  ],
  ratios: [
    { label: "Net profit margin", fn: (S) => (S.tag("sales") ? S.NI / S.tag("sales") : null), fmt: "pct" },
    { label: "Return on assets", fn: (S) => S.NI / S.TA, fmt: "pct" },
    { label: "Debt / equity", fn: (S) => S.tag("debt") / S.TE, fmt: "x" },
  ],
};

/* ------------------------------------------------------------------ */
const intercoProfit = {
  id: "lm10-unrealized-profit",
  module: "lm10",
  title: "Downstream sale to an associate: eliminating unrealized profit",
  standard: "IFRS and US GAAP: investor's share eliminated",
  summary:
    "Pinnacle sells inventory to its 30% associate Kestrel at a profit. Until Kestrel sells those goods to an outsider, part of that profit is Pinnacle selling to itself. Watch Pinnacle defer its share, then recognize it a year later.",
  accounts: [
    cash(),
    asset("stock", "Inventory"),
    asset("inv", "Investment in associate (Kestrel)", "nca"),
    equity("sc", "Share capital"),
    re(),
    rev("sales", "Revenue"),
    exp("cogs", "Cost of goods sold"),
    rev("eqInc", "Share of profit of associate"),
  ],
  opening: { cash: 500, stock: 400, inv: 300, sc: 900, re: 300 },
  company: "Pinnacle Corp",
  steps: [
    {
      title: "Pinnacle sells goods costing 120 to Kestrel for 200",
      html: "On Pinnacle's own books this is an ordinary sale: revenue 200, cost of sales 120, profit 80.",
      entries: [dr("cash", 200, "CFO", "Cash received from customers"), cr("sales", 200), dr("cogs", 120), cr("stock", 120)],
    },
    {
      title: "Kestrel reports net income of 100",
      html: "Pinnacle picks up 30%, which is 30, in the usual way.",
      entries: [dr("inv", 30), cr("eqInc", 30)],
    },
    {
      title: "Year end: Kestrel still holds half of those goods",
      html:
        "Half the goods are still on Kestrel's shelf, so half the 80 profit, 40, has not been earned from anyone outside the group yet. Pinnacle owns 30% of Kestrel, so 30% of that 40, which is 12, is profit Pinnacle effectively made by selling to itself. It is deferred by reducing equity income and the investment. Pinnacle does NOT reverse its revenue; under the equity method the adjustment runs through the one line.",
      entries: [dr("eqInc", 12), cr("inv", 12)],
      memo: {
        title: "Unrealized profit calculation",
        rows: [
          ["Profit on the intercompany sale (200 - 120)", "80"],
          ["Share still held by Kestrel at year end", "50%"],
          ["Unrealized profit in Kestrel's inventory", "40"],
          ["Pinnacle's ownership share", "30%"],
          ["Profit Pinnacle must defer (30% x 40)", "12"],
        ],
      },
      exam: "Downstream (investor sells to investee) and upstream (investee sells to investor) are BOTH eliminated at the investor's ownership share under the equity method.",
    },
    { title: "Close the year", html: "Net income into retained earnings.", entries: [], close: true, practice: false },
    {
      title: "Year two: Kestrel sells the remaining goods to outsiders",
      html: "The profit is now realized from the group's point of view, so Pinnacle recognizes the 12 it deferred. Over two years Pinnacle reports the full share of profit; the elimination only moved the timing.",
      entries: [dr("inv", 12), cr("eqInc", 12)],
    },
  ],
};

/* ------------------------------------------------------------------ */
const pinnacleOpen3 = { cash: 800, oca: 400, ppe: 1800, liab: 1000, sc: 1500, re: 500 };
const threeMethods = {
  id: "lm10-three-methods",
  module: "lm10",
  title: "Same investee, three accounting methods",
  standard: "Equity method vs proportionate consolidation vs acquisition method",
  summary:
    "Pinnacle buys 50% of Kestrel for 300, exactly 50% of Kestrel's book value, so there is no goodwill to cloud the picture. The same economic event is then reported three ways. Net income to Pinnacle's shareholders comes out IDENTICAL. Almost everything else on the statements does not.",
  accounts: [
    cash(),
    asset("oca", "Other current assets"),
    asset("inv", "Investment in Kestrel", "nca"),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("liab", "Liabilities", "cl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    nciEq(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    rev("eqInc", "Share of profit of Kestrel"),
    nciAlloc(),
  ],
  columns: [
    { id: "eq", label: "Equity method", sub: "one line on each statement", opening: pinnacleOpen3 },
    { id: "prop", label: "Proportionate consolidation", sub: "50% of every line", opening: pinnacleOpen3 },
    { id: "acq", label: "Acquisition method", sub: "100% of every line, plus NCI", opening: pinnacleOpen3 },
  ],
  steps: [
    {
      title: "Acquire 50% of Kestrel for 300 cash",
      html:
        "Kestrel has other current assets of 300, plant of 700 and liabilities of 400, so book equity is 600 and 50% of it is 300. Equity method: one new asset line. Proportionate consolidation: Pinnacle brings in HALF of each of Kestrel's assets and liabilities. Acquisition method: Pinnacle brings in ALL of Kestrel's assets and liabilities, and the half it does not own is shown as a non-controlling interest inside equity.",
      entries: {
        eq: [dr("inv", 300), cr("cash", 300, "CFI", "Acquisition of interest in Kestrel")],
        prop: [dr("oca", 150), dr("ppe", 350), cr("liab", 200), cr("cash", 300, "CFI", "Acquisition of interest in Kestrel")],
        acq: [dr("oca", 300), dr("ppe", 700), cr("liab", 400), cr("nciEq", 300), cr("cash", 300, "CFI", "Acquisition of interest in Kestrel")],
      },
      insight: "Same 300 of cash out. Total assets now differ by 700 between the equity method and the acquisition method.",
    },
    {
      title: "Pinnacle's own year: revenue 2,000, cash costs 1,800",
      html: "Identical in all three columns. This is the baseline the investee is layered on top of.",
      entries: {
        eq: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1800), cr("cash", 1800, "CFO", "Cash paid for operating expenses")],
        prop: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1800), cr("cash", 1800, "CFO", "Cash paid for operating expenses")],
        acq: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1800), cr("cash", 1800, "CFO", "Cash paid for operating expenses")],
      },
    },
    {
      title: "Kestrel's year: revenue 500, cash costs 400, net income 100",
      html:
        "Equity method: 50 of share of profit, one line, no revenue. Proportionate: 250 of revenue and 200 of costs. Acquisition: all 500 of revenue and 400 of costs, then 50 of net income is allocated to the non-controlling interest. Bottom line attributable to Pinnacle: 250 in every column.",
      entries: {
        eq: [dr("inv", 50), cr("eqInc", 50)],
        prop: [dr("cash", 250, "CFO", "Cash received from customers"), cr("sales", 250), dr("opex", 200), cr("cash", 200, "CFO", "Cash paid for operating expenses")],
        acq: [
          dr("cash", 500, "CFO", "Cash received from customers"),
          cr("sales", 500),
          dr("opex", 400),
          cr("cash", 400, "CFO", "Cash paid for operating expenses"),
          dr("nciAlloc", 50),
          cr("nciEq", 50),
        ],
      },
      insight:
        "Net income to the parent: 250, 250, 250. Revenue: 2,000 vs 2,250 vs 2,500. So net profit margin is highest under the equity method and lowest under the acquisition method. ROA follows the same order because assets do. Leverage is lowest under the equity method because the investee's liabilities never appear.",
      exam:
        "Memorize the direction, not the numbers: equity method gives the highest margins and ROA and the lowest leverage; acquisition the lowest margins and ROA and (with liabilities consolidated) typically the highest debt. NI and equity attributable to the parent are the same.",
    },
  ],
  ratios: [
    { label: "Revenue", fn: (S) => S.tag("sales"), fmt: "num" },
    { label: "Net income to parent", fn: (S) => S.NIP, fmt: "num" },
    { label: "Net profit margin", fn: (S) => (S.tag("sales") ? S.NIP / S.tag("sales") : null), fmt: "pct" },
    { label: "Return on assets", fn: (S) => S.NIP / S.TA, fmt: "pct" },
    { label: "Liabilities / equity", fn: (S) => S.TL / S.TE, fmt: "x" },
  ],
};

/* ------------------------------------------------------------------ */
const worksheet = {
  id: "lm10-consolidation-worksheet",
  module: "lm10",
  title: "The consolidation worksheet: 80% acquisition, full goodwill",
  standard: "Acquisition method (IFRS 3 / ASC 805)",
  summary:
    "Pinnacle buys 80% of Kestrel for 800. You see Pinnacle's own books, Kestrel's own books, the elimination entries, and the consolidated result side by side. This is exactly what a group accountant does every year end.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("invSub", "Investment in Kestrel", "nca"),
    asset("ppe", "Property, plant and equipment", "nca"),
    asset("gw", "Goodwill", "nca"),
    liab("liab", "Liabilities", "ncl"),
    equity("sc", "Share capital"),
    re(),
    nciEq(),
    rev("sales", "Revenue"),
    exp("opex", "Operating expenses"),
    exp("dep", "Depreciation of fair value step-up"),
    nciAlloc(),
  ],
  columns: [
    { id: "P", label: "Pinnacle", sub: "parent, standalone", opening: { cash: 1500, ppe: 2500, liab: 1500, sc: 2000, re: 500 } },
    { id: "S", label: "Kestrel", sub: "subsidiary, standalone", opening: { cash: 100, rec: 200, ppe: 800, liab: 400, sc: 400, re: 300 } },
    { id: "E", label: "Eliminations", sub: "worksheet only", opening: {} },
    { id: "C", label: "Consolidated", sub: "what is published", sumOf: ["P", "S", "E"] },
  ],
  show: { cf: false },
  steps: [
    {
      title: "Pinnacle pays 800 cash for 80% of Kestrel",
      html:
        "On Pinnacle's own books this is just an investment at cost. Kestrel's books do not change at all: its shareholders changed, not its assets. Look at the Consolidated column right now: it is double counting, because it adds Pinnacle's 800 investment AND all of Kestrel's net assets that the investment represents. The eliminations fix that.",
      entries: { P: [dr("invSub", 800), cr("cash", 800, "CFI", "Acquisition of subsidiary")] },
      memo: {
        title: "Goodwill calculation (full goodwill method)",
        rows: [
          ["Price paid for 80%", "800"],
          ["Fair value of the 20% NCI", "200"],
          ["Fair value of Kestrel as a whole", "1,000"],
          ["Book value of Kestrel's net assets", "700"],
          ["Fair value step-up on plant", "100"],
          ["Fair value of identifiable net assets", "(800)"],
          ["Full goodwill", "200"],
        ],
      },
    },
    {
      title: "Eliminate the investment against Kestrel's equity",
      html:
        "One elimination entry does four jobs. It removes Kestrel's pre-acquisition equity (share capital 400 and retained earnings 300), because a group cannot own shares in itself. It removes Pinnacle's investment of 800. It writes Kestrel's plant up to fair value (+100). And it books goodwill of 200 and a non-controlling interest of 200 to make the entry balance. The consolidated column is now the published balance sheet.",
      entries: {
        E: [dr("sc", 400), dr("re", 300), dr("ppe", 100), dr("gw", 200), cr("invSub", 800), cr("nciEq", 200)],
      },
      insight:
        "Consolidated equity = Pinnacle's own share capital and retained earnings PLUS the NCI. Kestrel's pre-acquisition equity is gone. That is the most-tested consequence of the worksheet.",
    },
    {
      title: "A year of operations in both companies",
      html: "Pinnacle earns 300 (revenue 2,000, costs 1,700). Kestrel earns 150 (revenue 600, costs 450). Each records it in its own books.",
      entries: {
        P: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1700), cr("cash", 1700, "CFO", "Cash paid for operating expenses")],
        S: [dr("cash", 600, "CFO", "Cash received from customers"), cr("sales", 600), dr("opex", 450), cr("cash", 450, "CFO", "Cash paid for operating expenses")],
      },
    },
    {
      title: "Year-end eliminations: extra depreciation and the NCI's share",
      html:
        "Two adjustments. First, the group owns Kestrel's plant at fair value, so it depreciates the 100 step-up: 100 / 10 years = 10. Second, the NCI is entitled to 20% of Kestrel's profit as the GROUP measures it: 20% x (150 - 10) = 28. Consolidated net income is 300 + 150 - 10 = 440, of which 28 belongs to the NCI and 412 to Pinnacle.",
      entries: { E: [dr("dep", 10), cr("ppe", 10), dr("nciAlloc", 28), cr("nciEq", 28)] },
      insight:
        "Check: under the equity method Pinnacle would report 300 + 80% x (150 - 10) = 412. Consolidation and the equity method give the SAME net income to the parent; consolidation just shows all the lines that produce it.",
      exam: "NCI on the balance sheet: 200 + 28 = 228. It sits in equity under both IFRS and US GAAP, never in liabilities.",
    },
  ],
  ratios: [
    { label: "Total assets", fn: (S) => S.TA, fmt: "num" },
    { label: "Net income to parent", fn: (S) => S.NIP, fmt: "num" },
    { label: "Liabilities / equity", fn: (S) => S.TL / S.TE, fmt: "x" },
  ],
};

/* ------------------------------------------------------------------ */
const parentOpen = { cash: 1500, rec: 0, ppe: 2500, liab: 1500, sc: 2000, re: 500 };
const fullVsPartial = {
  id: "lm10-full-vs-partial-goodwill",
  module: "lm10",
  title: "Full goodwill vs partial goodwill",
  standard: "IFRS allows either; US GAAP requires full goodwill",
  summary:
    "The same 80% acquisition of Kestrel, consolidated twice. The only choice that differs is how the 20% non-controlling interest is measured: at its fair value (full goodwill) or at its share of identifiable net assets (partial goodwill). Watch goodwill, NCI, and every ratio that uses assets or equity.",
  accounts: [
    cash(),
    asset("rec", "Receivables"),
    asset("ppe", "Property, plant and equipment", "nca"),
    asset("gw", "Goodwill", "nca"),
    liab("liab", "Liabilities", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
    nciEq(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Operating expenses"),
    exp("dep", "Depreciation"),
    nciAlloc(),
  ],
  columns: [
    { id: "full", label: "Full goodwill", sub: "NCI at fair value", opening: parentOpen },
    { id: "part", label: "Partial goodwill", sub: "NCI at share of net assets (IFRS option)", opening: parentOpen },
  ],
  steps: [
    {
      title: "Acquire 80% of Kestrel for 800 and consolidate",
      html:
        "Kestrel's identifiable net assets at fair value are 800 (cash 100, receivables 200, plant 900, liabilities 400). Full goodwill: NCI at fair value 200, goodwill = 800 + 200 - 800 = 200. Partial goodwill: NCI = 20% x 800 = 160, goodwill = 800 - 80% x 800 = 160. The consolidated cash outflow is the 800 paid less the 100 of cash that came with Kestrel.",
      entries: {
        full: [dr("rec", 200), dr("ppe", 900), dr("gw", 200), cr("liab", 400), cr("nciEq", 200), cr("cash", 700, "CFI", "Acquisition of subsidiary, net of cash acquired")],
        part: [dr("rec", 200), dr("ppe", 900), dr("gw", 160), cr("liab", 400), cr("nciEq", 160), cr("cash", 700, "CFI", "Acquisition of subsidiary, net of cash acquired")],
      },
      insight: "Partial goodwill only ever records the PARENT's share of goodwill (80% of 200 = 160). Full goodwill grosses it up to 100% and gives the NCI its share.",
    },
    {
      title: "First year of combined operations",
      html:
        "Combined revenue 2,600 and cash costs 2,150, depreciation on the fair value step-up 10. Consolidated NI = 440. The NCI gets 20% of Kestrel's 140 adjusted profit = 28 under BOTH methods, because goodwill is not amortized, so the choice does not touch the income statement.",
      entries: {
        full: [dr("cash", 2600, "CFO", "Cash received from customers"), cr("sales", 2600), dr("opex", 2150), cr("cash", 2150, "CFO", "Cash paid for operating expenses"), dr("dep", 10), cr("ppe", 10), dr("nciAlloc", 28), cr("nciEq", 28)],
        part: [dr("cash", 2600, "CFO", "Cash received from customers"), cr("sales", 2600), dr("opex", 2150), cr("cash", 2150, "CFO", "Cash paid for operating expenses"), dr("dep", 10), cr("ppe", 10), dr("nciAlloc", 28), cr("nciEq", 28)],
      },
      insight:
        "Same NI, but full goodwill has 40 more assets and 40 more equity. So ROA and ROE are lower and debt-to-equity is lower under full goodwill.",
      exam: "Full goodwill: higher assets, higher equity, LOWER ROA and ROE, lower leverage. Net income identical (until an impairment, which is larger under full goodwill).",
    },
  ],
  ratios: [
    { label: "Goodwill", fn: (S) => S.v("BS:gw"), fmt: "num" },
    { label: "Non-controlling interest", fn: (S) => S.v("BS:nciEq"), fmt: "num" },
    { label: "Return on assets", fn: (S) => S.NI / S.TA, fmt: "pct" },
    { label: "Return on equity", fn: (S) => S.NI / S.TE, fmt: "pct" },
    { label: "Debt / equity", fn: (S) => S.tag("debt") / S.TE, fmt: "x3" },
  ],
};

/* ------------------------------------------------------------------ */
const gwImpairment = {
  id: "lm10-goodwill-impairment",
  module: "lm10",
  title: "Goodwill impairment: IFRS one step vs US GAAP two steps",
  standard: "IAS 36 vs ASC 350 as presented in the curriculum",
  summary:
    "Kestrel's business has deteriorated. The same facts produce a 100 impairment under IFRS and a 150 impairment under the US GAAP two-step test. Follow the arithmetic, then watch the loss hit profit, goodwill and equity.",
  accounts: [
    cash(),
    asset("netOps", "Identifiable operating assets", "nca"),
    asset("gw", "Goodwill", "nca"),
    liab("liab", "Liabilities", "ncl"),
    equity("sc", "Share capital"),
    re(),
    exp("impair", "Goodwill impairment loss"),
  ],
  columns: [
    { id: "ifrs", label: "IFRS", sub: "one step, cash-generating unit", opening: { cash: 200, netOps: 1200, gw: 200, liab: 600, sc: 800, re: 200 } },
    { id: "gaap", label: "US GAAP", sub: "two steps, reporting unit", opening: { cash: 200, netOps: 1200, gw: 200, liab: 600, sc: 800, re: 200 } },
  ],
  steps: [
    {
      title: "Run the impairment test and book the loss",
      html:
        "Facts: the unit's carrying amount including goodwill is 1,400 (identifiable net assets 1,200 + goodwill 200). Its recoverable amount, and its fair value, is 1,300. The fair value of its identifiable net assets is 1,250. IFRS compares carrying amount with recoverable amount in ONE step: 1,400 - 1,300 = 100, charged first against goodwill. US GAAP, as the curriculum presents it, first asks IF there is impairment (fair value 1,300 below carrying 1,400: yes), then MEASURES it by computing implied goodwill: 1,300 - 1,250 = 50. The loss is 200 - 50 = 150.",
      entries: {
        ifrs: [dr("impair", 100), cr("gw", 100)],
        gaap: [dr("impair", 150), cr("gw", 150)],
      },
      memo: {
        title: "US GAAP step 2: implied goodwill",
        rows: [
          ["Fair value of the reporting unit", "1,300"],
          ["Fair value of identifiable net assets", "(1,250)"],
          ["Implied goodwill", "50"],
          ["Carrying amount of goodwill", "200"],
          ["Impairment loss", "150"],
        ],
      },
      insight: "No cash moves. Impairment is a pure accrual: it lowers assets, profit and equity together, and it is added back in the indirect cash flow statement.",
      exam:
        "IFRS impairment can be reversed for most assets but NEVER for goodwill. US GAAP never reverses impairment of assets held for use. The 2026 curriculum presents the US GAAP two-step test, so use it on the exam. (Since 2017, ASU 2017-04 has removed step 2 in practice; that is beyond the curriculum.)",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Goodwill", fn: (S) => S.v("BS:gw"), fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
const speOpen = { cash: 100, rec: 600, stock: 300, ppe: 1000, ap: 300, debt: 700, sc: 600, re: 400 };
const spe = {
  id: "lm10-spe-securitization",
  module: "lm10",
  title: "Securitizing receivables through a special purpose entity",
  standard: "Consolidation of SPEs / VIEs (IFRS 10, ASC 810)",
  summary:
    "Pinnacle transfers 500 of receivables to an SPE, which pays for them by borrowing from outside investors. If Pinnacle controls the SPE (or is its primary beneficiary), it must consolidate it. Watch how the SAME cash looks like an operating inflow in one column and a loan in the other.",
  accounts: [
    cash(),
    asset("rec", "Accounts receivable"),
    asset("stock", "Inventory"),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("ap", "Accounts payable"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    liab("speDebt", "Debt of consolidated SPE", "ncl", { tags: ["debt"] }),
    equity("sc", "Share capital"),
    re(),
  ],
  columns: [
    { id: "sale", label: "SPE not consolidated", sub: "treated as a sale of receivables", opening: speOpen },
    { id: "cons", label: "SPE consolidated", sub: "Pinnacle is the primary beneficiary", opening: speOpen },
  ],
  steps: [
    {
      title: "Transfer 500 of receivables; the SPE pays 500 cash",
      html:
        "If the SPE is NOT consolidated, the receivables leave the balance sheet and the 500 arrives as an operating cash inflow (the company has, in substance, collected its receivables early). If the SPE IS consolidated, from the group's point of view nothing was sold: the receivables are still the group's, and the cash came from the SPE's lenders. So it is a borrowing, a financing inflow, and the SPE's debt appears on Pinnacle's balance sheet.",
      entries: {
        sale: [dr("cash", 500, "CFO", "Proceeds from sale of receivables"), cr("rec", 500)],
        cons: [dr("cash", 500, "CFF", "Borrowing by consolidated SPE"), cr("speDebt", 500)],
      },
      insight:
        "Same cash, same real economics if Pinnacle still bears the credit risk. The unconsolidated version shows lower receivables, lower debt, and a CFO boost.",
    },
    {
      title: "Customers pay the 500 of receivables; the SPE repays its lenders",
      html:
        "Unconsolidated: nothing happens on Pinnacle's books, the cash went to the SPE. Consolidated: the group collects 500 (operating inflow) and the SPE repays 500 of its debt (financing outflow). Over the two steps, CFO totals 500 in BOTH columns: the sale treatment just pulled the operating cash flow forward in time.",
      entries: {
        sale: [],
        cons: [dr("cash", 500, "CFO", "Collections from customers"), cr("rec", 500), dr("speDebt", 500), cr("cash", 500, "CFF", "Repayment of SPE debt")],
      },
      exam:
        "Analyst adjustment for an unconsolidated securitization where the company keeps the risk: add the receivables back to assets, add the same amount to debt, and move the cash inflow from CFO to CFF.",
    },
  ],
  ratios: [
    { label: "Debt / equity", fn: (S) => S.tag("debt") / S.TE, fmt: "x" },
    { label: "Current ratio", fn: (S) => S.v("BS:ca") / S.v("BS:cl"), fmt: "x" },
    { label: "Cash from operations", fn: (S) => S.CFO, fmt: "num" },
  ],
};

export default [finAssetsDebt, finAssetsEquity, equityMethod, intercoProfit, threeMethods, worksheet, fullVsPartial, gwImpairment, spe];
