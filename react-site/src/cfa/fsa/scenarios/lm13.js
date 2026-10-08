/* LM13 Analysis of Financial Institutions: animated scenarios.
   Demo companies: Harbor Bank (a mid-sized commercial bank) and Granite
   Insurance (a property and casualty insurer). All numbers are illustrative
   and in millions. The engine groups balance sheet lines as current and
   non-current; real banks present assets and liabilities in order of
   liquidity instead, which the event cards point out. Every scenario passes
   scripts/fsa-check.mjs: debits = credits on every step, A = L + E after
   every step, cash ties. */
import { cash, asset, liab, equity, re, aoci, rev, exp, oci, dr, cr } from "./_kit.js";

/* ------------------------------------------------------------------ */
/* Harbor Bank: the life of a loan book, and why a charge-off does not
   touch profit. Opening: cash 60, securities 240, loans 640, allowance (16),
   deposits 720, borrowings 140, share capital 30, retained earnings 34. */
const bankCredit = {
  id: "lm13-bank-credit-loss",
  module: "lm13",
  title: "Harbor Bank: interest, provisions, charge-offs and recoveries",
  standard: "Expected credit loss (IFRS 9) / CECL (US GAAP): same mechanics shown",
  summary:
    "A year in Harbor Bank's loan book. Watch the allowance for loan losses, a NEGATIVE line inside assets, do all the work: the provision builds it (and hits profit), the charge-off uses it up (and does NOT hit profit), and a recovery refills it. Net loans and profit only move when the bank changes its estimate of future losses.",
  accounts: [
    cash("Cash and central bank reserves"),
    asset("sec", "Investment securities", "ca", { tags: ["earning"] }),
    asset("loans", "Loans (gross)", "nca", { tags: ["earning", "loans"] }),
    asset("all", "Allowance for loan losses", "nca", { contra: true, tags: ["earning"] }),
    liab("dep", "Customer deposits", "cl"),
    liab("borr", "Borrowings", "ncl"),
    equity("sc", "Share capital"),
    re(),
    rev("intInc", "Interest income"),
    exp("intExp", "Interest expense"),
    rev("feeInc", "Fee and commission income"),
    exp("opex", "Operating expenses"),
    exp("prov", "Provision for credit losses"),
    exp("tax", "Income tax expense"),
  ],
  company: "Harbor Bank",
  opening: { cash: 60, sec: 240, loans: 640, all: -16, dep: 720, borr: 140, sc: 30, re: 34 },
  steps: [
    {
      title: "New deposits of 40 arrive and Harbor lends them out",
      prompt: "Customers deposit 40 in cash. Harbor immediately lends 40 to new borrowers.",
      html:
        "<p>This is what a bank IS. A deposit is a liability (Harbor owes the money back on demand), and the loan it funds is an asset. Money is Harbor's inventory: it buys it from depositors at a low interest rate and sells it to borrowers at a higher one. Notice that both sides of the balance sheet grow by 40 and equity does not move at all, which is why banks run with so little equity relative to assets.</p><p>Cash flow classification depends on the standard. Under US GAAP a bank shows the net change in deposits as financing and loans made as investing, as here. Under IFRS most banks treat both as operating activities, because lending and deposit taking ARE their operations.</p>",
      entries: [
        dr("cash", 40, "CFF", "Net increase in deposits"),
        cr("dep", 40),
        dr("loans", 40),
        cr("cash", 40, "CFI", "Loans made to customers"),
      ],
      insight: "Total assets 924 to 964, equity unchanged at 64. Equity to assets falls from 6.9% to 6.6%: growth alone dilutes capital.",
    },
    {
      title: "Collect 46 of interest from borrowers and securities",
      html:
        "For an industrial company interest income is a side item below operating profit. For Harbor it is the main revenue line. The analyst therefore never computes interest coverage or EBITDA for a bank: interest is the business, not a financing cost.",
      entries: [dr("cash", 46, "CFO", "Interest received"), cr("intInc", 46)],
    },
    {
      title: "Pay 16 of interest to depositors and lenders",
      html:
        "Interest expense is Harbor's cost of goods sold. Interest income of 46 less interest expense of 16 gives net interest income of 30, the single most important line for a commercial bank, and the numerator of the net interest margin.",
      entries: [dr("intExp", 16), cr("cash", 16, "CFO", "Interest paid")],
      insight: "Net interest income = 46 - 16 = 30.",
    },
    {
      title: "Earn 8 of fees and pay 20 of operating costs",
      html:
        "Fees (account charges, payments, advisory) do not depend on interest rates or on taking credit risk, so analysts value a stable fee stream. Operating expenses are salaries, branches and technology. Their ratio to revenue is the efficiency (cost to income) ratio.",
      entries: [
        dr("cash", 8, "CFO", "Fees and commissions received"),
        cr("feeInc", 8),
        dr("opex", 20),
        cr("cash", 20, "CFO", "Operating expenses paid"),
      ],
    },
    {
      title: "Recognize a provision for credit losses of 6",
      prompt: "Harbor's credit team raises its estimate of expected losses on the loan book by 6.",
      html:
        "<p>No borrower has defaulted yet. Under both expected credit loss models (IFRS 9 expected credit loss and US GAAP current expected credit loss, CECL) Harbor must recognize losses it EXPECTS, not only losses that have already happened. The provision is an expense (profit falls by 6) and the credit side builds the <b>allowance for loan losses</b>, a contra asset that sits under gross loans as a negative number. Net loans fall from 624 to 618.</p><p>This is the biggest judgment call in a bank's accounts. A provision of 4 instead of 6 would have raised pre-tax profit by 2 with no change in a single borrower's behaviour.</p>",
      entries: [dr("prov", 6), cr("all", 6)],
      memo: {
        title: "Allowance roll-forward so far",
        rows: [
          ["Opening allowance", "16"],
          ["Provision for credit losses (expense)", "6"],
          ["Allowance after provision", "22"],
        ],
      },
      insight: "Provision = the expense. Allowance = the stock on the balance sheet. The exam loves to mix up the two.",
    },
    {
      title: "Charge off a 5 loan that has defaulted",
      prompt: "A borrower owing 5 goes bankrupt. Harbor writes the loan off.",
      html:
        "<p>The loan is gone, so gross loans fall by 5. But the loss was already recognized through earlier provisions, so the charge-off is paid for out of the allowance: the allowance shrinks by 5. Net loans (loans minus allowance) do not change, and neither does profit. Nothing new was learned about the economics today; the bank only removed a loan it had already provided for.</p><p>That is why analysts watch provisions, not charge-offs, to see what a bank's credit losses are doing to earnings, and compare provisions with net charge-offs to see whether the allowance is being built up or run down.</p>",
      entries: [dr("all", 5), cr("loans", 5)],
      insight: "Charge-offs reduce the allowance and gross loans equally. Income statement: untouched.",
      exam: "If a vignette gives charge-offs and asks for the expense, the answer is the provision, not the charge-off. Ending allowance = beginning + provision - charge-offs + recoveries.",
    },
    {
      title: "Recover 1 in cash on a loan written off in an earlier year",
      html:
        "Harbor's collections team gets 1 back from a borrower whose loan was written off years ago. Following the common US bank practice shown here, the recovery is credited back to the allowance, which refills it; the next provision can then be smaller. Under IFRS banks usually present recoveries in profit as a reduction of the impairment charge. Either way, <b>net charge-offs</b> = charge-offs - recoveries = 5 - 1 = 4.",
      entries: [dr("cash", 1, "CFI", "Recovery of loan previously written off"), cr("all", 1)],
      memo: {
        title: "Allowance roll-forward for the year",
        rows: [
          ["Opening allowance", "16"],
          ["+ Provision for credit losses", "6"],
          ["- Charge-offs", "(5)"],
          ["+ Recoveries", "1"],
          ["Ending allowance", "18"],
        ],
      },
    },
    {
      title: "Pay income tax of 3",
      html:
        "Pre-tax profit is 46 - 16 + 8 - 20 - 6 = 12. At a 25% tax rate the charge is 3 and net income is 9. Now read the ratio panel: return on assets below 1% is normal for a bank, while return on equity is high because each unit of equity supports about 13 units of assets.",
      entries: [dr("tax", 3), cr("cash", 3, "CFO", "Income taxes paid")],
      insight: "Return on equity = return on assets x leverage. Harbor's ROA of 0.9% becomes an ROE of 12.3% because assets are about 13 times equity.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Return on assets (NI / total assets)", fn: (S) => S.NI / S.TA, fmt: "pct" },
    { label: "Return on equity (NI / equity)", fn: (S) => S.NI / S.TE, fmt: "pct" },
    { label: "NII / earning assets (margin proxy)", fn: (S) => (S.v("IS:intInc") + S.v("IS:intExp")) / S.tag("earning"), fmt: "pct" },
    { label: "Allowance / gross loans", fn: (S) => -S.v("BS:all") / S.v("BS:loans"), fmt: "pct" },
    { label: "Equity / total assets", fn: (S) => S.TE / S.TA, fmt: "pct" },
    {
      label: "Simplified CET1 ratio (equity / RWA; RWA = 100% net loans + 20% securities)",
      fn: (S) => S.TE / (S.v("BS:loans") + S.v("BS:all") + 0.2 * S.v("BS:sec")),
      fmt: "pct",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Same bond portfolio, two classifications, then rates rise and depositors
   leave. Opening: cash 400, loans 500, deposits 840, share capital 30,
   retained earnings 30. */
const rateOpen = { cash: 400, loans: 500, dep: 840, sc: 30, re: 30 };
const rateShock = {
  id: "lm13-bank-rate-shock",
  module: "lm13",
  title: "Rates rise: securities at fair value through OCI vs amortized cost",
  standard: "IFRS 9 FVOCI / amortized cost (US GAAP: available-for-sale / held-to-maturity)",
  summary:
    "Harbor Bank parks 300 of deposits in long-dated government bonds paying 2%. Then market rates jump. In one column the bonds are at fair value through OCI, in the other at amortized cost. The economic loss is identical; only one balance sheet admits it, until depositors leave and the bank has to sell.",
  accounts: [
    cash("Cash and central bank reserves"),
    asset("sec", "Government bonds", "ca"),
    asset("loans", "Loans (net)", "nca"),
    liab("dep", "Customer deposits", "cl"),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    rev("intInc", "Interest income"),
    exp("intExp", "Interest expense"),
    exp("realLoss", "Realized loss on sale of securities"),
    oci("ociLoss", "Unrealized loss on FVOCI securities"),
    oci("recycle", "Reclassified to profit on sale"),
  ],
  columns: [
    { id: "fvoci", label: "FVOCI", sub: "[US GAAP: available-for-sale]", opening: rateOpen },
    { id: "ac", label: "Amortized cost", sub: "[US GAAP: held-to-maturity]", opening: rateOpen },
  ],
  steps: [
    {
      title: "Buy 300 of 10-year government bonds at par, 2% coupon",
      html:
        "Deposits have poured in and loan demand is weak, so Harbor buys safe government bonds. Credit risk is close to zero. Interest rate risk is not: a 10-year bond funded by deposits that can leave tomorrow is a classic maturity mismatch. Both columns record the bonds at their cost of 300.",
      entries: {
        fvoci: [dr("sec", 300), cr("cash", 300, "CFI", "Purchase of securities")],
        ac: [dr("sec", 300), cr("cash", 300, "CFI", "Purchase of securities")],
      },
    },
    {
      title: "Earn the 6 coupon and pay 2 of deposit interest",
      html: "While rates are low the trade looks fine: 2% on the bonds against a much lower rate on deposits. Net interest income of 4 in both columns.",
      entries: {
        fvoci: [dr("cash", 6, "CFO", "Interest received"), cr("intInc", 6), dr("intExp", 2), cr("cash", 2, "CFO", "Interest paid")],
        ac: [dr("cash", 6, "CFO", "Interest received"), cr("intInc", 6), dr("intExp", 2), cr("cash", 2, "CFO", "Interest paid")],
      },
    },
    {
      title: "Market rates rise by 3 percentage points: the bonds are now worth 255",
      prompt: "Year end: market yields have risen sharply and Harbor's bonds are now worth 255.",
      html:
        "<p>A 2% bond is worth much less when new bonds pay 5%. The fall of 45 is real: if Harbor had to sell today it would get 255.</p><p><b>FVOCI:</b> the bonds are marked down to 255 and the 45 loss goes to other comprehensive income. Net income is untouched, but equity (through accumulated OCI) falls from 64 to 19.</p><p><b>Amortized cost:</b> no entry at all. The bonds stay at 300 and the 45 loss appears only in the fair value note. Reported equity stays at 64.</p>",
      entries: {
        fvoci: [dr("ociLoss", 45), cr("sec", 45)],
        ac: [],
      },
      notes: {
        fvoci: "Bonds at 255. Equity 64 to 19 through OCI. Net income unchanged.",
        ac: "Bonds still at 300. The fair value of 255 is disclosed in the notes only.",
      },
      memo: {
        title: "The same loss, two presentations",
        rows: [
          ["Cost of bonds", "300"],
          ["Fair value after the rate rise", "255"],
          ["Economic loss (both columns)", "45"],
          ["Recognized in equity: FVOCI / amortized cost", "45 / 0"],
        ],
      },
      insight: "Equity to assets: about 2.2% under FVOCI against 7.1% under amortized cost, for the same bank holding the same bonds.",
      exam: "An analyst adjusts amortized-cost securities to fair value using the note disclosure. Doing so here takes Harbor's equity from 64 down to 19.",
    },
    { title: "Close the year", html: "Net income into retained earnings, OCI into accumulated OCI.", entries: { fvoci: [], ac: [] }, close: true, practice: false },
    {
      title: "Year two: depositors withdraw 200, Harbor sells bonds with par 200 for 170",
      prompt: "News of the hidden losses spreads. Depositors withdraw 200. Harbor sells bonds with a par value of 200 at their market value of 170 and pays the depositors.",
      html:
        "<p>Harbor's cash of 104 is not enough, so it must sell bonds at market. Selling crystallizes the loss in BOTH columns: 30 hits net income as a realized loss (200 of cost sold for 170).</p><p><b>FVOCI:</b> the 30 was already in accumulated OCI, so it is recycled: OCI shows +30 and profit shows -30. Total equity does not move again; the market had already been told.</p><p><b>Amortized cost:</b> the full 30 lands in profit as a surprise. Equity falls from 64 to 34, and the remaining bonds (par 100, worth 85) still carry an unrecognized loss of 15.</p>",
      entries: {
        fvoci: [
          dr("cash", 170, "CFI", "Proceeds from sale of securities"),
          cr("sec", 170),
          dr("realLoss", 30),
          cr("recycle", 30),
          dr("dep", 200),
          cr("cash", 200, "CFF", "Deposits withdrawn"),
        ],
        ac: [
          dr("cash", 170, "CFI", "Proceeds from sale of securities"),
          dr("realLoss", 30),
          cr("sec", 200),
          dr("dep", 200),
          cr("cash", 200, "CFF", "Deposits withdrawn"),
        ],
      },
      insight:
        "Ending equity: 19 under FVOCI, 34 under amortized cost. The 15 gap is exactly the loss still hidden in the remaining amortized-cost bonds (carried at 100, worth 85).",
      exam:
        "The lesson of the 2023 failures of several US regional banks, stated generally: large unrealized losses on bonds held at amortized cost, funded by flighty (often uninsured) deposits, become realized the moment a deposit run forces sales. Liquidity and interest rate risk turned into a solvency problem.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Other comprehensive income", fn: (S) => S.OCI, fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
    { label: "Equity / total assets", fn: (S) => S.TE / S.TA, fmt: "pct" },
  ],
};

/* ------------------------------------------------------------------ */
/* Granite Insurance: premiums in advance, claims later, float in between.
   Opening: cash 200, invested assets 2,000, unearned premiums 400, loss
   reserves 900, share capital 400, retained earnings 500. */
const insurerPremiums = {
  id: "lm13-insurer-premiums",
  module: "lm13",
  title: "Granite Insurance: a year of premiums, claims and float",
  standard: "Property and casualty insurer (simplified, same mechanics under IFRS and US GAAP)",
  summary:
    "An insurer is paid first and pays later. Watch the cash arrive as an unearned premium LIABILITY, turn into revenue only as coverage is provided, and then flow out as claims, which sit for a while in another liability, the loss reserve. The cash held in between is the float that Granite invests.",
  accounts: [
    cash(),
    asset("invest", "Invested assets", "nca"),
    liab("upr", "Unearned premium reserve", "cl"),
    liab("lossRes", "Loss and LAE reserves", "ncl"),
    equity("sc", "Share capital"),
    re(),
    rev("npe", "Net premiums earned"),
    rev("invInc", "Net investment income"),
    exp("losses", "Losses incurred"),
    exp("lae", "Loss adjustment expenses"),
    exp("uwExp", "Underwriting expenses"),
    exp("divPh", "Dividends to policyholders"),
  ],
  company: "Granite Insurance",
  opening: { cash: 200, invest: 2000, upr: 400, lossRes: 900, sc: 400, re: 500 },
  steps: [
    {
      title: "Write 1,050 of premiums, collected in cash",
      prompt: "Granite sells policies and collects 1,050 of premiums in cash. Coverage runs over the coming months.",
      html:
        "Granite has the cash but has not yet provided the cover it was paid for. Until it does, it owes that cover (or a refund) to the policyholders, so the premium is a liability: the <b>unearned premium reserve</b>. Net premiums WRITTEN (1,050) measure the business sold this year, after reinsurance ceded to other insurers.",
      entries: [dr("cash", 1050, "CFO", "Premiums collected"), cr("upr", 1050)],
      insight: "Cash up 1,050, liabilities up 1,050, profit zero. Revenue for an insurer is earned by bearing risk over time, not by selling the policy.",
    },
    {
      title: "Earn 1,000 of premiums as the months of coverage pass",
      html:
        "As each month of cover passes, that slice of premium moves from the liability to revenue. Over the year 1,000 is earned. The other 450 of unearned premium (400 opening + 1,050 written - 1,000 earned) is cover still owed next year.",
      entries: [dr("upr", 1000), cr("npe", 1000)],
      memo: {
        title: "Written vs earned",
        rows: [
          ["Opening unearned premium reserve", "400"],
          ["+ Net premiums written", "1,050"],
          ["- Net premiums earned", "(1,000)"],
          ["Closing unearned premium reserve", "450"],
        ],
      },
      exam: "Net premiums written = net premiums earned + increase in the unearned premium reserve. A growing insurer writes more than it earns.",
    },
    {
      title: "Pay 273 of commissions and other underwriting expenses",
      html:
        "Agents' commissions, premium taxes and the cost of issuing policies are paid when the policy is WRITTEN. That is why the underwriting expense ratio divides by net premiums written (273 / 1,050 = 26.0%), not by premiums earned.",
      entries: [dr("uwExp", 273), cr("cash", 273, "CFO", "Commissions and underwriting expenses paid")],
    },
    {
      title: "Claims for the year: losses of 610 and loss adjustment expenses of 90",
      prompt: "Accidents covered by Granite's policies happen during the year. Granite estimates the cost of the claims at 610 plus 90 of loss adjustment expenses (investigators, lawyers). Nothing is paid yet.",
      html:
        "<p>Granite owes these claims as soon as the insured events happen, even though most will be paid later. The expense is recognized now and the credit goes to <b>loss and loss adjustment expense (LAE) reserves</b>, an estimate of what will eventually be paid. Loss adjustment expenses are the costs of investigating and settling claims.</p><p>Loss and LAE ratio = (610 + 90) / 1,000 = 70.0%.</p>",
      entries: [dr("losses", 610), dr("lae", 90), cr("lossRes", 700)],
      insight: "The loss reserve is the insurer's largest and most judgmental liability. Under-reserve and profit looks better today; the bill arrives later as adverse reserve development.",
    },
    {
      title: "Pay 560 of claims and LAE",
      html: "Paying claims uses up the reserve and the cash. No profit effect: the expense was recognized when the claims were incurred.",
      entries: [dr("lossRes", 560), cr("cash", 560, "CFO", "Claims and LAE paid")],
    },
    {
      title: "Pay 10 of dividends to policyholders",
      html:
        "Participating policies return part of the premium to policyholders when results are good. For the insurer this is an expense, not a distribution to shareholders. The dividends to policyholders ratio is 10 / 1,000 = 1.0% of net premiums earned.",
      entries: [dr("divPh", 10), cr("cash", 10, "CFO", "Dividends paid to policyholders")],
    },
    {
      title: "Earn 75 of investment income on the portfolio",
      html:
        "Granite's invested assets of 2,000 throw off 75 of interest and dividends, a yield of 3.75%. An insurer earns money twice: on underwriting (premiums minus claims and expenses) and on investing the float in between.",
      entries: [dr("cash", 75, "CFO", "Investment income received"), cr("invInc", 75)],
    },
    {
      title: "Invest 250 of surplus cash",
      html:
        "Cash collected but not yet paid out (premiums ahead of claims) is the float. Granite invests 250 of it. Because loss reserves will be paid over years, a property and casualty insurer keeps a large share of high-quality, liquid bonds: claims after a hurricane do not wait for the bond market to recover.",
      entries: [dr("invest", 250), cr("cash", 250, "CFI", "Purchase of investments")],
      insight: "Underwriting result 1,000 - 700 - 273 - 10 = 17. Investment income 75. Pre-tax operating income 92.",
    },
  ],
  ratios: [
    { label: "Net premiums written (NPE + increase in UPR)", fn: (S) => S.v("BS:upr") - 400 + S.v("IS:npe"), fmt: "num" },
    { label: "Loss and LAE ratio (/ NPE)", fn: (S) => (S.v("IS:npe") ? -(S.v("IS:losses") + S.v("IS:lae")) / S.v("IS:npe") : null), fmt: "pct" },
    { label: "Underwriting expense ratio (/ NPW)", fn: (S) => -S.v("IS:uwExp") / (S.v("BS:upr") - 400 + S.v("IS:npe")), fmt: "pct" },
    {
      label: "Combined ratio",
      fn: (S) => (S.v("IS:npe") ? -(S.v("IS:losses") + S.v("IS:lae")) / S.v("IS:npe") - S.v("IS:uwExp") / (S.v("BS:upr") - 400 + S.v("IS:npe")) : null),
      fmt: "pct",
    },
    {
      label: "Combined ratio after policyholder dividends",
      fn: (S) =>
        S.v("IS:npe")
          ? -(S.v("IS:losses") + S.v("IS:lae") + S.v("IS:divPh")) / S.v("IS:npe") - S.v("IS:uwExp") / (S.v("BS:upr") - 400 + S.v("IS:npe"))
          : null,
      fmt: "pct",
    },
    { label: "Underwriting result", fn: (S) => S.v("IS:npe") + S.v("IS:losses") + S.v("IS:lae") + S.v("IS:uwExp") + S.v("IS:divPh"), fmt: "num" },
    { label: "Investment income / opening invested assets (2,000)", fn: (S) => S.v("IS:invInc") / 2000, fmt: "pct" },
  ],
};

/* ------------------------------------------------------------------ */
/* Reserve development: the same claims, reserved prudently or optimistically. */
const resOpen = { cash: 2000, sc: 800, re: 1200 };
const insurerReserves = {
  id: "lm13-insurer-reserves",
  module: "lm13",
  title: "Loss reserves and reserve development: prudent vs optimistic",
  standard: "Property and casualty insurer (simplified)",
  summary:
    "Two versions of the same insurer face identical claims: year-one accidents that will eventually cost 700. One reserves 720, the other 640. Watch the optimistic one look more profitable in year one and pay for it in year two through adverse reserve development. Over two years the profit is identical.",
  accounts: [
    cash(),
    liab("lossRes", "Loss and LAE reserves", "ncl"),
    equity("sc", "Share capital"),
    re(),
    rev("npe", "Net premiums earned"),
    exp("losses", "Losses incurred: current accident year"),
    exp("devLoss", "Prior-year reserve development"),
  ],
  columns: [
    { id: "prud", label: "Prudent reserving", sub: "reserves 720 for year-one claims", opening: resOpen },
    { id: "opt", label: "Optimistic reserving", sub: "reserves 640 for year-one claims", opening: resOpen },
  ],
  steps: [
    {
      title: "Year one: collect and earn 1,000 of premiums",
      html: "To keep the focus on reserves, the policies are written and fully earned within the year. Identical in both columns.",
      entries: {
        prud: [dr("cash", 1000, "CFO", "Premiums collected"), cr("npe", 1000)],
        opt: [dr("cash", 1000, "CFO", "Premiums collected"), cr("npe", 1000)],
      },
    },
    {
      title: "Year one: estimate the cost of this year's claims",
      prompt: "Accidents happen during year one. The prudent actuary reserves 720 for them; the optimistic one reserves 640.",
      html:
        "Nobody knows yet what the claims will cost; injury claims can take years to settle. The prudent column books 720, the optimistic column 640. The true answer, which nobody knows today, is 700. The loss ratio is 72% against 64%, and profit is 280 against 360, from the same events.",
      entries: {
        prud: [dr("losses", 720), cr("lossRes", 720)],
        opt: [dr("losses", 640), cr("lossRes", 640)],
      },
      insight: "Reserving is the insurer's version of the bank's loan-loss provision: one estimate, and profit moves one for one with it.",
    },
    {
      title: "Year one: pay 400 of the claims",
      html: "Paying claims reduces the reserve and the cash, with no profit effect.",
      entries: {
        prud: [dr("lossRes", 400), cr("cash", 400, "CFO", "Claims paid")],
        opt: [dr("lossRes", 400), cr("cash", 400, "CFO", "Claims paid")],
      },
    },
    { title: "Close year one", html: "Net income into retained earnings.", entries: { prud: [], opt: [] }, close: true, practice: false },
    {
      title: "Year two: collect and earn another 1,000 of premiums",
      html: "Same business as last year in both columns.",
      entries: {
        prud: [dr("cash", 1000, "CFO", "Premiums collected"), cr("npe", 1000)],
        opt: [dr("cash", 1000, "CFO", "Premiums collected"), cr("npe", 1000)],
      },
    },
    {
      title: "Year two: reserve 700 for this year's claims",
      html: "Both columns now reserve the same 700 for accidents in year two, so the current accident year looks identical.",
      entries: {
        prud: [dr("losses", 700), cr("lossRes", 700)],
        opt: [dr("losses", 700), cr("lossRes", 700)],
      },
    },
    {
      title: "Year two: the year-one claims settle for 300 more",
      prompt: "All remaining year-one claims are settled in cash for 300, so year-one accidents cost 700 in total.",
      html:
        "<p>The prudent column still held 320 for year-one claims and needs only 300: it releases 20 as <b>favorable development</b>, which raises this year's profit. The optimistic column held 240 and must pay 300: it books 60 of <b>adverse development</b>, an expense this year for accidents that happened last year.</p><p>Calendar-year loss ratio for year two: (700 - 20) / 1,000 = 68% against (700 + 60) / 1,000 = 76%.</p>",
      entries: {
        prud: [dr("lossRes", 320), cr("cash", 300, "CFO", "Claims paid"), cr("devLoss", 20)],
        opt: [dr("lossRes", 240), dr("devLoss", 60), cr("cash", 300, "CFO", "Claims paid")],
      },
      insight: "Two-year profit: 280 + 320 = 600 against 360 + 240 = 600. Reserving changes WHEN profit appears, not how much.",
      exam: "Analysts read the loss reserve development table: persistent adverse development means past reserves (and past profits) were understated; persistent favorable development can mean conservatism, or a reserve cushion released to smooth earnings.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Calendar-year loss ratio", fn: (S) => (S.v("IS:npe") ? -(S.v("IS:losses") + S.v("IS:devLoss")) / S.v("IS:npe") : null), fmt: "pct" },
    { label: "Prior-year development / NPE (+ favorable)", fn: (S) => (S.v("IS:npe") ? S.v("IS:devLoss") / S.v("IS:npe") : null), fmt: "pct" },
    { label: "Loss reserves", fn: (S) => S.v("BS:lossRes"), fmt: "num" },
  ],
};

export default [bankCredit, rateShock, insurerPremiums, insurerReserves];
