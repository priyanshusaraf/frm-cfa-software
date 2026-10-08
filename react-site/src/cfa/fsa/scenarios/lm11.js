/* LM11 Employee Compensation: Post-Employment and Share-Based. Animated scenarios.
   Demo company: Pinnacle Corp (the plan sponsor and the employer granting
   options). All numbers are illustrative and chosen so each effect is visible
   on its own. The sponsor's net pension position is modelled as ONE balance
   sheet account (the net pension liability = PBO minus plan assets), because
   that is all the sponsor's own balance sheet carries: the obligation and the
   plan assets live in a separate trust and are netted. Every scenario passes
   scenarios.test.js: debits = credits on every step, A = L + E after every
   step, cash ties. */
import { cash, asset, liab, equity, re, aoci, rev, exp, oci, dr, cr } from "./_kit.js";

/* ------------------------------------------------------------------ */
const dcVsDb = {
  id: "lm11-dc-vs-db",
  module: "lm11",
  title: "Same payroll, two promises: defined contribution vs defined benefit",
  standard: "IFRS (US GAAP is identical for the defined contribution side)",
  summary:
    "Pinnacle sets aside retirement money for the same staff two ways. Under the defined contribution plan its job ends when the cash leaves. Under the defined benefit plan it has promised an outcome, so the shortfall between what it owes and what it has put aside sits on its own balance sheet. Watch the net pension liability, and watch who absorbs the market crash in year two.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("netPL", "Net pension liability", "ncl", { tags: ["pension"] }),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    exp("pens", "Pension expense"),
    oci("remeas", "Remeasurement loss on pension plan"),
  ],
  columns: [
    { id: "dc", label: "Defined contribution", sub: "Pinnacle promises a contribution", opening: { cash: 1000, ppe: 2000, sc: 2000, re: 1000 } },
    { id: "db", label: "Defined benefit", sub: "Pinnacle promises a pension (IFRS)", opening: { cash: 1000, ppe: 2000, sc: 2000, re: 1000 } },
  ],
  steps: [
    {
      title: "Employees work the year and earn retirement benefits worth 60",
      prompt: "The DC plan requires a contribution of 6% of a 1,000 payroll, paid in cash. Under the DB plan, the actuary values the pension earned this year at 60.",
      html:
        "<p><b>Defined contribution (DC):</b> Pinnacle's promise is to pay 6% of payroll into each employee's own account. Payroll is 1,000, so it pays 60 and it is done. The expense is the contribution, and the contribution is cash. Nothing is owed afterwards, so nothing goes on the balance sheet.</p><p><b>Defined benefit (DB):</b> Pinnacle has promised a pension based on salary and years of service. This year's work added 60 to the present value of that promise (the <b>current service cost</b>). The cost is real whether or not Pinnacle pays any cash today, so it is expensed and the obligation rises.</p>",
      entries: {
        dc: [dr("pens", 60), cr("cash", 60, "CFO", "Contributions to pension plan")],
        db: [dr("pens", 60), cr("netPL", 60)],
      },
      notes: {
        dc: "Expense = contribution = cash paid. That identity is the whole of DC accounting.",
        db: "Expense = present value of benefits earned this year. No cash has moved yet.",
      },
      insight: "Same expense of 60 in both columns, but only the DB column now owes something. Cash from operations is 60 lower under DC because DC is pay-as-you-go by construction.",
    },
    {
      title: "Pinnacle pays 45 into the DB plan's trust",
      prompt: "Pinnacle contributes 45 of cash to the trust that holds the DB plan's assets. The DC plan needs nothing more.",
      html:
        "<p>The DB plan's assets sit in a separate trust that only pays pensions. Moving cash into it does not create an expense: it converts Pinnacle's cash into plan assets, which are netted against the obligation. So the contribution <b>reduces the net pension liability</b>. Pinnacle paid less than the 60 earned, so a deficit of 15 remains.</p><p>The DC column has nothing to record: its obligation was fully discharged when the 60 was paid.</p>",
      entries: {
        dc: [],
        db: [dr("netPL", 45), cr("cash", 45, "CFO", "Contributions to pension plan")],
      },
      notes: { dc: "No entry. A DC sponsor has no further obligation once the contribution is paid." },
      insight: "In a DB plan, expense and cash come apart. The gap between them accumulates on the balance sheet as the net pension liability (or asset).",
      exam: "Employer contributions are operating cash outflows under both IFRS and US GAAP. A DB sponsor chooses the timing of contributions (within funding rules), which is one reason analysts adjust operating cash flow for pensions.",
    },
    { title: "Close the year", html: "Net income rolls into retained earnings. Year two begins.", entries: {}, close: true, practice: false },
    {
      title: "Year two opens with a market crash: pension investments lose 30",
      prompt: "Investments held for retirement fall in value by 30 before anything else happens in year two (ignore the year's interest to isolate the shock).",
      html:
        "<p><b>DC:</b> the 30 is lost inside the employees' own accounts. Their retirement pots are smaller. Pinnacle owes nothing extra, so it records nothing. The <b>employees</b> bear the investment risk.</p><p><b>DB:</b> the pension Pinnacle promised has not changed, but the assets set aside to pay it are now worth 30 less. Pinnacle must make up the difference eventually, so the net liability rises by 30. Under IFRS this is a <b>remeasurement</b> and goes to other comprehensive income (OCI), not profit, because it is a market movement rather than the cost of employees' work. The <b>sponsor</b> bears the investment risk.</p>",
      entries: {
        dc: [],
        db: [dr("remeas", 30), cr("netPL", 30)],
      },
      notes: { dc: "No entry: the loss belongs to the employees." },
      insight: "That is the defining difference between the plans: who bears investment risk and longevity risk. Under DC it is the employee; under DB it is the sponsor, and the sponsor's balance sheet shows it.",
      exam: "A vignette that says 'the company bears the risk that plan assets underperform' is describing a defined benefit plan, whatever the plan is called.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Other comprehensive income", fn: (S) => S.OCI, fmt: "num" },
    { label: "Net pension liability", fn: (S) => S.v("BS:netPL"), fmt: "num" },
    { label: "Cash from operations", fn: (S) => S.CFO, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* Year 1 facts: beginning PBO 1,000; beginning plan assets 900; discount rate
   5%; expected return on plan assets 7% (US GAAP); current service cost 60;
   actual return on plan assets 50; actuarial loss 40 (discount rate cut at
   year end); plan amendment at year end, past service cost 50; employer
   contributions 80; benefits paid 70.
   PBO end = 1,000 + 60 + 50 + 40 + 50 - 70 = 1,130
   Plan assets end = 900 + 50 + 80 - 70 = 960
   Net pension liability: 100 -> 170. TPPC = 80 - (-170 - -100) = 150.
   IFRS: P&L 60 + 50 + 5% x 100 = 115; OCI 40 - (50 - 45) = 35. Total 150.
   US GAAP: P&L 60 + 50 - 63 = 47; OCI 40 + (63 - 50) + 50 = 103. Total 150. */
const pinOpen = { cash: 500, ppe: 2000, netPL: 100, sc: 1500, re: 900 };
const ifrsVsGaap = {
  id: "lm11-db-ifrs-vs-gaap",
  module: "lm11",
  title: "One year of a defined benefit plan under IFRS and US GAAP",
  standard: "IAS 19 vs ASC 715",
  summary:
    "Pinnacle's plan starts the year with an obligation of 1,000 and assets of 900, so a net pension liability of 100. The same events are booked under both standards. Watch the split between profit and OCI diverge, while the net pension liability and the total periodic pension cost come out identical. Then watch US GAAP amortize part of its OCI balance into profit in year two, which IFRS never does.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("netPL", "Net pension liability", "ncl", { tags: ["pension"] }),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    exp("svc", "Pension: current service cost"),
    exp("psc", "Pension: past service cost"),
    exp("netInt", "Pension: net interest on net liability"),
    exp("intCost", "Pension: interest cost"),
    rev("expRet", "Pension: expected return on plan assets"),
    exp("amort", "Pension: amortization of prior service cost"),
    oci("ociAsset", "Remeasurement: return on plan assets"),
    oci("ociAct", "Remeasurement: actuarial loss"),
    oci("ociPsc", "Prior service cost deferred in OCI"),
    oci("ociRecl", "Prior service cost reclassified to profit"),
  ],
  columns: [
    { id: "ifrs", label: "IFRS", sub: "IAS 19: remeasurements in OCI, never recycled", opening: pinOpen },
    { id: "gaap", label: "US GAAP", sub: "ASC 715: OCI amounts amortized into profit", opening: pinOpen },
  ],
  steps: [
    {
      title: "Employees earn a current service cost of 60",
      prompt: "The actuary values the benefits employees earned this year at 60.",
      html:
        "<p>Current service cost is the increase in the present value of the obligation that comes from employees working one more year. It is the only pension number that is genuinely an operating cost of running the business, and both standards put it in profit.</p>",
      entries: {
        ifrs: [dr("svc", 60), cr("netPL", 60)],
        gaap: [dr("svc", 60), cr("netPL", 60)],
      },
      insight: "Identical in both columns. Service cost is the one component on which the standards fully agree.",
    },
    {
      title: "A year passes: interest accrues on the obligation, the assets earn 50",
      prompt: "The discount rate is 5%. Beginning obligation 1,000, beginning plan assets 900. The assets actually earn 50. Pinnacle's US GAAP expected return on plan assets is 7%.",
      html:
        "<p>The obligation is a present value, so a year closer to payment it grows by the discount rate: <b>interest cost</b> = 5% x 1,000 = 50. The assets actually earned 50. Economically the two cancel, so the net liability does not move. The standards disagree only on <b>where</b> to show the pieces.</p><p><b>IFRS</b> nets the obligation and assets first and charges <b>net interest</b> on the net liability at the discount rate: 5% x 100 = 5, to profit. Put differently, IFRS lets the assets earn only the discount rate in profit (interest income 5% x 900 = 45). They actually earned 50, so the extra 5 is a remeasurement gain in OCI.</p><p><b>US GAAP</b> shows interest cost of 50 and the <b>expected</b> return of 7% x 900 = 63 in profit. The assets actually earned 13 less than expected, so a loss of 13 goes to OCI.</p>",
      entries: {
        ifrs: [dr("netInt", 5), cr("netPL", 5), dr("netPL", 5), cr("ociAsset", 5)],
        gaap: [dr("intCost", 50), cr("netPL", 50), dr("netPL", 63), cr("expRet", 63), dr("ociAsset", 13), cr("netPL", 13)],
      },
      notes: {
        ifrs: "Profit: net interest 5. OCI: actual return 50 minus interest income 45 = gain of 5.",
        gaap: "Profit: interest cost 50 less expected return 63 = income of 13. OCI: actual 50 minus expected 63 = loss of 13.",
      },
      memo: {
        title: "Same 50 of actual return, two benchmarks",
        rows: [
          ["Interest cost (5% x 1,000)", "50"],
          ["IFRS interest income on assets (5% x 900)", "45"],
          ["IFRS net interest to profit (5% x 100)", "5"],
          ["IFRS remeasurement gain in OCI (50 - 45)", "5"],
          ["US GAAP expected return (7% x 900)", "63"],
          ["US GAAP loss in OCI (63 - 50)", "13"],
          ["Change in net pension liability (50 - 50)", "0"],
        ],
      },
      insight:
        "Same actual return, opposite signs in OCI: a gain of 5 under IFRS and a loss of 13 under US GAAP. IFRS measures the assets against the discount rate; US GAAP against management's expected return. US GAAP profit looks 18 better here purely because management assumed 7% rather than 5%.",
      exam: "The expected return assumption exists only under US GAAP. Raising it lowers US GAAP pension expense in profit, and pushes an equal and opposite amount into OCI. It cannot change the obligation, the plan assets, or total periodic pension cost.",
    },
    {
      title: "The discount rate is cut at year end: an actuarial loss of 40",
      prompt: "Corporate bond yields fall, so the actuary lowers the discount rate. The obligation rises by 40.",
      html:
        "<p>A lower discount rate means future pensions are discounted less, so their present value rises. This is an <b>actuarial loss</b>: a change in the obligation caused by a change in assumptions (or by experience differing from assumptions), not by employees working. Both standards keep it out of profit for now and record it in OCI.</p>",
      entries: {
        ifrs: [dr("ociAct", 40), cr("netPL", 40)],
        gaap: [dr("ociAct", 40), cr("netPL", 40)],
      },
      insight: "Same entry in both columns today. The difference comes later: IFRS never moves this 40 into profit, while US GAAP may amortize part of it under the corridor approach.",
    },
    {
      title: "Pinnacle sweetens the plan at year end: past service cost of 50",
      prompt: "Pinnacle amends the plan on the last day of the year, raising benefits for service employees have already given. The actuary values the increase at 50.",
      html:
        "<p>A plan amendment that grants extra benefits for <b>past</b> service raises the obligation immediately: that is <b>past service cost</b> (US GAAP calls it <b>prior service cost</b>).</p><p><b>IFRS</b> recognizes it in profit at once, on the logic that the obligation exists now. <b>US GAAP</b> parks it in OCI and amortizes it into profit over the remaining service period of the affected employees, on the logic that the company granted it to gain future service.</p>",
      entries: {
        ifrs: [dr("psc", 50), cr("netPL", 50)],
        gaap: [dr("ociPsc", 50), cr("netPL", 50)],
      },
      notes: {
        ifrs: "Straight to profit.",
        gaap: "To OCI now, amortized to profit over the employees' remaining service (10 years here) from next year.",
      },
      insight: "The liability rises by 50 in both columns. Only the destination of the debit differs.",
    },
    {
      title: "Pinnacle contributes 80 to the plan",
      prompt: "Pinnacle pays 80 of cash into the pension trust.",
      html: "<p>The contribution moves cash into the trust, where it becomes plan assets. It is not an expense under either standard: it reduces the net pension liability. It is an operating cash outflow.</p>",
      entries: {
        ifrs: [dr("netPL", 80), cr("cash", 80, "CFO", "Contributions to pension plan")],
        gaap: [dr("netPL", 80), cr("cash", 80, "CFO", "Contributions to pension plan")],
      },
    },
    {
      title: "The plan pays 70 of pensions to retirees",
      html:
        "<p>Benefits are paid <b>by the trust, out of plan assets</b>, not by Pinnacle. The obligation falls by 70 and the plan assets fall by 70, so the net pension liability is unchanged and <b>nothing touches Pinnacle's books</b>. No expense, no cash flow on Pinnacle's cash flow statement.</p>",
      entries: { ifrs: [], gaap: [] },
      notes: { ifrs: "No entry: obligation and plan assets both fall by 70.", gaap: "No entry: obligation and plan assets both fall by 70." },
      memo: {
        title: "Roll-forwards at year end (memo, inside the trust)",
        rows: [
          ["Obligation: 1,000 + 60 + 50 + 40 + 50 - 70", "1,130"],
          ["Plan assets: 900 + 50 + 80 - 70", "960"],
          ["Funded status (960 - 1,130)", "(170)"],
          ["Change in funded status (-170 - (-100))", "(70)"],
          ["Total periodic pension cost: 80 - (-70)", "150"],
        ],
      },
      insight:
        "Total periodic pension cost (TPPC) is 150 in both columns: IFRS 115 in profit + 35 in OCI; US GAAP 47 in profit + 103 in OCI. The net pension liability is 170 in both. The standards disagree only about the profit and OCI split.",
      exam: "Benefits paid is a classic distractor: it reduces the obligation AND the assets, so it never changes the funded status or pension cost. If the company pays an unfunded plan's benefits itself (typical for retiree health care), the cash payment reduces the liability instead.",
      practice: false,
    },
    { title: "Close the year", html: "Profit rolls into retained earnings and OCI into accumulated OCI. Equity is 2,250 in both columns: the split between retained earnings and accumulated OCI differs.", entries: { ifrs: [], gaap: [] }, close: true, practice: false },
    {
      title: "Year two: US GAAP amortizes prior service cost out of OCI",
      prompt: "Under US GAAP the 50 of prior service cost is amortized straight-line over the employees' 10-year remaining service period. The year-one net actuarial loss of 53 is tested against the corridor.",
      html:
        "<p><b>US GAAP</b> moves 50 / 10 = 5 of prior service cost from accumulated OCI into profit. This is <b>recycling</b>: profit is charged, OCI shows an equal credit, and equity and the net liability do not change.</p><p>The net actuarial loss sitting in accumulated OCI is 40 + 13 = 53. The <b>corridor</b> is 10% of the greater of the beginning obligation (1,130) and plan assets (960) = 113. The loss is inside the corridor, so none of it is amortized this year.</p><p><b>IFRS</b> has nothing to do. Past service cost already went through profit in year one, and remeasurements in OCI are never reclassified to profit.</p>",
      entries: {
        ifrs: [],
        gaap: [dr("amort", 5), cr("ociRecl", 5)],
      },
      notes: {
        ifrs: "No entry. IFRS never recycles remeasurements, and past service cost was expensed in full in year one.",
        gaap: "Profit -5, OCI +5. Net liability, equity and total comprehensive income unchanged.",
      },
      memo: {
        title: "US GAAP amortization test, start of year two",
        rows: [
          ["Prior service cost in AOCI", "50"],
          ["Amortization: 50 / 10 years", "5"],
          ["Net actuarial loss in AOCI (40 + 13)", "53"],
          ["Corridor: 10% x max(1,130, 960)", "113"],
          ["Actuarial loss amortized (53 is inside the corridor)", "0"],
        ],
      },
      insight: "Over the life of the plan US GAAP eventually pushes most OCI amounts through profit; IFRS never does. That is why the same plan can show very different pension expense under the two standards for years.",
      exam: "Corridor arithmetic: only the EXCESS of the unrecognized net gain or loss over 10% of the greater of beginning PBO and plan assets is amortized, divided by the average remaining service period.",
    },
  ],
  ratios: [
    { label: "Pension cost in profit", fn: (S) => -S.NI, fmt: "num" },
    { label: "Pension cost in OCI", fn: (S) => -S.OCI, fmt: "num" },
    { label: "Total periodic pension cost", fn: (S) => -(S.NI + S.OCI), fmt: "num" },
    { label: "Net pension liability", fn: (S) => S.v("BS:netPL"), fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* US GAAP reporter. PBO 1,000, plan assets 900 at the start (net liability
   100). SC 60, IC 50, expected return 63, actual return 50, no actuarial
   changes. TPPC = 60 + 50 - 50 = 60. Contributions 100: excess 40 over TPPC. */
const adjOpen = { cash: 800, ppe: 2400, debt: 800, netPL: 100, sc: 1500, re: 800 };
const analystAdjust = {
  id: "lm11-pension-analyst-adjust",
  module: "lm11",
  title: "As reported vs analyst adjusted: pension cost and pension cash flows",
  standard: "US GAAP reporter, analyst view",
  summary:
    "Pinnacle reports under US GAAP with its whole pension expense inside operating costs. An analyst rebuilds the same year so that only service cost counts as operating, interest cost joins interest expense, the actual return on plan assets becomes non-operating income, and contributions above the true economic cost are treated as debt repayment. Watch operating profit, interest coverage and cash from operations change while the balance sheet stays put.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("debt", "Long-term debt", "ncl", { tags: ["debt"] }),
    liab("netPL", "Net pension liability", "ncl", { tags: ["pension"] }),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Other operating expenses", { tags: ["op"] }),
    exp("pensOp", "Pension expense (inside operating expenses)", { tags: ["op"] }),
    exp("svcOp", "Pension service cost (operating)", { tags: ["op"] }),
    exp("intExp", "Interest expense on debt", { tags: ["int"] }),
    exp("intPens", "Interest expense: pension interest cost", { tags: ["int"] }),
    rev("retInc", "Non-operating income: actual return on plan assets"),
    oci("ociAsset", "Pension: return on plan assets below expected"),
  ],
  columns: [
    { id: "rep", label: "As reported", sub: "US GAAP, all pension cost in operating", opening: adjOpen },
    { id: "adj", label: "Analyst adjusted", sub: "economic view of the same year", opening: adjOpen },
  ],
  steps: [
    {
      title: "Pinnacle's ordinary year: revenue 2,000, other operating costs 1,600, interest 40",
      prompt: "Revenue of 2,000 and other operating costs of 1,600 are settled in cash. Interest of 40 is paid on Pinnacle's debt.",
      html: "<p>Identical in both columns. This is the baseline the pension adjustments are layered on.</p>",
      entries: {
        rep: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1600), cr("cash", 1600, "CFO", "Cash paid for operating expenses"), dr("intExp", 40), cr("cash", 40, "CFO", "Interest paid")],
        adj: [dr("cash", 2000, "CFO", "Cash received from customers"), cr("sales", 2000), dr("opex", 1600), cr("cash", 1600, "CFO", "Cash paid for operating expenses"), dr("intExp", 40), cr("cash", 40, "CFO", "Interest paid")],
      },
    },
    {
      title: "Record the year's pension cost: reported vs reclassified",
      prompt: "Service cost 60, interest cost 50 (5% of a 1,000 obligation), expected return 63 (7% of 900 of assets), actual return 50. No actuarial gains or losses and no amortization.",
      html:
        "<p><b>As reported (US GAAP):</b> pension expense = 60 + 50 - 63 = 47, all inside operating expenses. The 13 by which the actual return fell short of the expected return goes to OCI.</p><p><b>Analyst adjusted:</b> only the <b>service cost</b> of 60 is the cost of employees' work this year, so only that stays in operating expenses. The <b>interest cost</b> of 50 is the cost of a debt-like obligation, so it joins interest expense. The <b>return on plan assets</b> is investment income, so it goes below operating profit, and the analyst uses the <b>actual</b> return of 50 rather than management's expected 63, which takes the 13 shortfall out of OCI and into income.</p>",
      entries: {
        rep: [dr("pensOp", 47), dr("ociAsset", 13), cr("netPL", 60)],
        adj: [dr("svcOp", 60), dr("intPens", 50), cr("retInc", 50), cr("netPL", 60)],
      },
      memo: {
        title: "Rebuilding the income statement",
        rows: [
          ["Reported operating profit: 2,000 - 1,600 - 47", "353"],
          ["Add back reported pension expense", "+47"],
          ["Deduct service cost only", "-60"],
          ["Adjusted operating profit", "340"],
          ["Adjusted interest expense: 40 + 50", "90"],
          ["Interest coverage: 353 / 40 reported vs 340 / 90 adjusted", "8.8x vs 3.8x"],
        ],
      },
      insight:
        "Operating profit falls from 353 to 340 and interest coverage collapses from 8.8x to 3.8x once the pension's financing cost is called what it is. Total comprehensive income is 300 in both columns: the analyst moves the pieces, not the total.",
      exam: "Under IFRS the same logic applies to the net interest on the net pension liability: an analyst moves it to interest expense (many IFRS reporters already present it within finance costs). Only service cost is operating.",
    },
    {
      title: "Pinnacle contributes 100 when the economic cost was 60",
      prompt: "Pinnacle pays 100 into the plan. Total periodic pension cost for the year is 60. Ignore tax in the ledger.",
      html:
        "<p>Total periodic pension cost (TPPC) is the economic cost of the year: 60 + 50 - 50 = 60. Pinnacle paid 100. The extra 40 shrank the net pension liability, which is a debt-like obligation, so economically it was a <b>repayment of borrowing</b>, not a cost of operating.</p><p>The analyst therefore shows 60 in operating cash flow and 40 in financing cash flow. The total cash outflow is the same 100. The curriculum makes this adjustment <b>after tax</b> (the contribution is tax-deductible); the ledger ignores tax to keep the move visible, and the memo shows the after-tax version.</p>",
      entries: {
        rep: [dr("netPL", 100), cr("cash", 100, "CFO", "Contributions to pension plan")],
        adj: [dr("netPL", 100), cr("cash", 60, "CFO", "Pension contribution: economic cost (TPPC)"), cr("cash", 40, "CFF", "Excess pension contribution: debt repayment")],
      },
      memo: {
        title: "Cash flow reclassification",
        rows: [
          ["Employer contributions", "100"],
          ["Total periodic pension cost: 100 - (ending FS -60 - beginning FS -100)", "60"],
          ["Excess contribution, pre-tax", "40"],
          ["After tax at an assumed 30%: 40 x (1 - 0.30)", "28"],
          ["Ledger move from CFO to CFF (pre-tax, tax ignored)", "40"],
        ],
      },
      insight: "Reported cash from operations is understated by the excess contribution. If contributions had been BELOW TPPC, the shortfall would be a borrowing from the plan: the analyst would move it the other way, lowering CFO and raising CFF.",
      exam: "Contributions greater than TPPC: increase CFO, decrease CFF by the after-tax excess. Contributions less than TPPC: decrease CFO, increase CFF.",
    },
  ],
  ratios: [
    { label: "Operating profit", fn: (S) => S.tag("sales") + S.tag("op"), fmt: "num" },
    { label: "Interest expense", fn: (S) => -S.tag("int"), fmt: "num" },
    { label: "Interest coverage", fn: (S) => (S.tag("int") ? (S.tag("sales") + S.tag("op")) / -S.tag("int") : null), fmt: "x" },
    { label: "Cash from operations", fn: (S) => S.CFO, fmt: "num" },
    { label: "(Debt + net pension liability) / equity", fn: (S) => (S.tag("debt") + S.tag("pension")) / S.TE, fmt: "x3" },
  ],
};

/* ------------------------------------------------------------------ */
/* Grant-date valuation: share price 25, exercise price 25, expected term
   5 years, volatility 30%, risk-free rate 3%, dividend yield 2.5%: Black-
   Scholes-Merton value 6.00 per option. 15,000 options -> 90,000. Amounts in
   the statements are in thousands. */
const stockOptions = {
  id: "lm11-stock-options",
  module: "lm11",
  title: "Employee stock options: grant, three years of vesting, exercise",
  standard: "IFRS 2 and ASC 718: same mechanics",
  summary:
    "Pinnacle grants 15,000 at-the-money options that vest after three years of service (cliff vesting). Amounts are in thousands. Watch the grant-date fair value of 90 trickle into expense at 30 a year while paid-in capital builds up by the same amount, then watch exercise bring in cash and shares.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    equity("sc", "Share capital (common stock and share premium)"),
    equity("apicOpt", "Paid-in capital: stock options"),
    re(),
    exp("comp", "Compensation expense: stock options"),
  ],
  company: "Pinnacle Corp",
  opening: { cash: 500, ppe: 1500, sc: 1200, re: 800 },
  steps: [
    {
      title: "Grant date: 15,000 options at an exercise price of 25",
      html:
        "<p>On the grant date Pinnacle and its managers agree the terms, and the share price is 25, equal to the exercise price. <b>No entry is made.</b> The employees have not yet provided the service the options pay for, so no expense exists yet; and Pinnacle has not issued anything yet, so there is no equity to record.</p><p>What the grant date DOES fix is the measurement. Both IFRS and US GAAP measure equity-settled awards at <b>fair value on the grant date</b>, and never remeasure them afterwards. At-the-money options have zero intrinsic value, but they are far from worthless: the chance that the share price rises over five years is what the option pricing model values.</p>",
      entries: [],
      memo: {
        title: "Grant-date fair value (Black-Scholes-Merton)",
        rows: [
          ["Share price at grant", "25.00"],
          ["Exercise price", "25.00"],
          ["Expected term", "5 years"],
          ["Expected volatility", "30%"],
          ["Risk-free rate", "3.0%"],
          ["Expected dividend yield", "2.5%"],
          ["Fair value per option", "6.00"],
          ["Total: 15,000 x 6.00 = 90,000 (in thousands)", "90"],
        ],
      },
      insight: "The total compensation cost is locked in at 90 today. Only the timing of expense is left to decide, and that follows the service period.",
      practice: false,
    },
    {
      title: "Year one of service: recognize one third of the grant-date value",
      prompt: "The options vest at the end of three years of service (cliff vesting). Grant-date fair value is 90 in total.",
      html:
        "<p>The options pay for three years of service, so the cost is spread evenly over the <b>vesting (service) period</b>: 90 / 3 = 30 a year. The debit is compensation expense. The credit is not a liability: Pinnacle will settle by issuing shares, never cash, so the credit is <b>paid-in capital</b> within equity.</p>",
      entries: [dr("comp", 30), cr("apicOpt", 30)],
      insight: "Net income falls by 30 and paid-in capital rises by 30, so total equity is unchanged. No cash moves: in the indirect cash flow statement this non-cash expense is added back.",
      exam: "Share-based compensation expense reduces net income but not total equity (for equity-settled awards). If the vignette asks about equity, the answer is usually 'no change'.",
    },
    { title: "Close year one", html: "Net income rolls into retained earnings.", entries: [], close: true, practice: false },
    {
      title: "Year two: the share price has fallen to 18",
      prompt: "The share price is now 18, well below the exercise price. Recognize year two's compensation expense.",
      html:
        "<p>The options are now out of the money, and they may never be exercised. The expense is still 30. Equity-settled awards are measured once, at grant date, and the share price after that changes nothing in the accounts. The company received the service it bargained for, and that is what the expense measures.</p>",
      entries: [dr("comp", 30), cr("apicOpt", 30)],
      insight: "If employees LEAVE before vesting (forfeiture), the expense for their options is reversed, because the service condition failed. If they stay but the options expire out of the money, nothing is reversed.",
    },
    { title: "Close year two", html: "Net income rolls into retained earnings.", entries: [], close: true, practice: false },
    {
      title: "Year three: the last third, and the options vest",
      prompt: "Recognize the final year's compensation expense. All 15,000 options vest at year end.",
      html: "<p>The final 30 is recognized. Cumulative expense now equals the full grant-date fair value of 90, and paid-in capital from options stands at 90.</p>",
      entries: [dr("comp", 30), cr("apicOpt", 30)],
    },
    {
      title: "The share price recovers to 35; all options are exercised at 25",
      prompt: "Employees exercise all 15,000 options, paying the exercise price of 25 per share in cash. Pinnacle issues 15,000 new shares. Amounts in thousands.",
      html:
        "<p>Employees pay 15,000 x 25 = 375 (thousand) in cash, a <b>financing</b> inflow because it is the issue of shares. The 90 sitting in paid-in capital for these options is transferred into share capital along with the cash, so share capital rises by 375 + 90 = 465.</p><p>The employees gain 15,000 x (35 - 25) = 150 of value. Pinnacle records no further expense for that: the cost was fixed at 90 on the grant date. The existing shareholders bear the rest through <b>dilution</b>: more shares now share the same company.</p>",
      entries: [dr("cash", 375, "CFF", "Proceeds from exercise of stock options"), dr("apicOpt", 90), cr("sc", 465)],
      insight: "Total equity rises only by the 375 of cash. Over the whole life of the award, retained earnings fell by 90 and paid-in capital rose by 90 plus the cash.",
      exam: "Grant date: measure. Vesting period: expense. Exercise: cash in (financing), shares issued, no income statement effect.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Paid-in capital: stock options", fn: (S) => S.v("BS:apicOpt"), fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* Restricted stock: 5,000 shares at a grant-date price of 20 = 100,
   vesting over 2 years: 50 a year. SARs: 5,000 cash-settled rights on gains
   above 20, same 2-year service period. Fair value per SAR at end of year 1
   = 10 (share price 26): liability 5,000 x 10 x 1/2 = 25. End of year 2 the
   share price is 22: settled at intrinsic value 2 x 5,000 = 10; expense in
   year 2 = 10 - 25 = -15. Amounts in thousands. */
const rsOpen = { cash: 500, ppe: 1500, sc: 1200, re: 800 };
const grantsVsSars = {
  id: "lm11-grants-vs-sars",
  module: "lm11",
  title: "Restricted stock vs cash-settled stock appreciation rights",
  standard: "IFRS 2 and ASC 718: equity-settled vs cash-settled",
  summary:
    "Pinnacle gives one group of managers 5,000 restricted shares and another group 5,000 cash-settled stock appreciation rights (SARs), both vesting over two years. The share price is 20 at grant, 26 after one year and 22 at the end. Amounts in thousands. Watch the restricted stock expense stay fixed while the SAR expense chases the share price, even turning into income.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("sarLiab", "Liability for cash-settled SARs", "cl"),
    equity("sc", "Share capital"),
    equity("apicRS", "Paid-in capital: restricted stock"),
    re(),
    exp("comp", "Compensation expense: share-based"),
  ],
  columns: [
    { id: "rs", label: "Restricted stock", sub: "equity-settled, fixed at grant", opening: rsOpen },
    { id: "sar", label: "Cash-settled SARs", sub: "liability, remeasured each period", opening: rsOpen },
  ],
  steps: [
    {
      title: "Grant date: share price 20",
      html:
        "<p><b>Restricted stock:</b> managers receive 5,000 shares they cannot sell until they have served two more years. Fair value at grant is simply the market price: 5,000 x 20 = 100. That number is now fixed for good.</p><p><b>SARs:</b> managers will receive, in cash, the rise in the share price above 20 on 5,000 shares. Pinnacle will pay CASH, so this is a <b>liability</b>, and a liability is measured at what it will cost to settle: its fair value at each reporting date, not at grant.</p><p>No entries yet: no service has been received.</p>",
      entries: { rs: [], sar: [] },
      practice: false,
    },
    {
      title: "End of year one: share price 26, SAR fair value 10 each",
      prompt: "Half the two-year service period has passed. The share price is 26 and an option pricing model values each SAR at 10.",
      html:
        "<p><b>Restricted stock:</b> half the grant-date value, 100 / 2 = 50, to expense and to paid-in capital. The share price rising to 26 is irrelevant.</p><p><b>SARs:</b> the liability must show the fair value of the rights times the share of the service period completed: 5,000 x 10 x 1/2 = 25. The whole increase in the liability is expense.</p>",
      entries: {
        rs: [dr("comp", 50), cr("apicRS", 50)],
        sar: [dr("comp", 25), cr("sarLiab", 25)],
      },
      memo: {
        title: "SAR liability, end of year one",
        rows: [
          ["Fair value per SAR", "10"],
          ["x 5,000 SARs (in thousands)", "50"],
          ["x service completed: 1 of 2 years", "50%"],
          ["Liability required", "25"],
          ["Expense = change in liability (25 - 0)", "25"],
        ],
      },
    },
    { title: "Close year one", html: "Net income rolls into retained earnings.", entries: { rs: [], sar: [] }, close: true, practice: false },
    {
      title: "End of year two: share price falls to 22, the SARs vest",
      prompt: "The service period is complete. The share price is 22, so each SAR is now worth its intrinsic value of 2.",
      html:
        "<p><b>Restricted stock:</b> the second 50, exactly as planned. Total expense 100, whatever the share price did.</p><p><b>SARs:</b> the liability is now 5,000 x 2 x 2/2 = 10. It stood at 25, so it <b>falls</b> by 15, and that fall is a <b>credit</b> to compensation expense: Pinnacle reports negative compensation expense this year.</p>",
      entries: {
        rs: [dr("comp", 50), cr("apicRS", 50)],
        sar: [dr("sarLiab", 15), cr("comp", 15)],
      },
      memo: {
        title: "SAR liability, end of year two",
        rows: [
          ["Intrinsic value per SAR (22 - 20)", "2"],
          ["x 5,000 SARs x 100% of service", "10"],
          ["Liability at end of year one", "25"],
          ["Expense = 10 - 25 (a reversal)", "(15)"],
        ],
      },
      insight: "Cash-settled awards make earnings move with the share price: expense when the price rises, income when it falls. Equity-settled awards are frozen at grant-date value.",
      exam: "Total SAR expense over the two years = 25 - 15 = 10 = the cash actually paid. For a cash-settled award, cumulative expense always ends up equal to the cash settlement.",
    },
    {
      title: "Settle: SARs paid in cash, restricted shares released",
      prompt: "Pinnacle pays the SAR holders their 10 in cash. The restricted shares vest and become ordinary shares.",
      html:
        "<p><b>SARs:</b> Pinnacle pays 10 and the liability is extinguished. The payment is compensation, so it is an <b>operating</b> cash outflow.</p><p><b>Restricted stock:</b> no cash moves. The restriction lifts and the paid-in capital built up over the service period is reclassified into share capital, a move inside equity that leaves total equity unchanged. (Exactly which equity lines are used varies by company and jurisdiction; the total does not.)</p>",
      entries: {
        rs: [dr("apicRS", 100), cr("sc", 100)],
        sar: [dr("sarLiab", 10), cr("cash", 10, "CFO", "Cash paid to settle stock appreciation rights")],
      },
      insight: "Restricted stock cost Pinnacle 100 of expense and zero cash, but diluted shareholders. The SARs cost 10 of expense and 10 of cash, and no dilution.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "SAR liability", fn: (S) => S.v("BS:sarLiab"), fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* Retiree health care (other post-employment benefits, OPEB): unfunded.
   Beginning obligation 300, discount rate 5%: interest 15. Service cost 20.
   Trend-rate increase: actuarial loss 25. Benefits paid by Pinnacle 18.
   Ending liability 300 + 20 + 15 + 25 - 18 = 342. */
const opeb = {
  id: "lm11-opeb-unfunded",
  module: "lm11",
  title: "Retiree health care: an unfunded post-employment benefit",
  standard: "IFRS (US GAAP gives the same numbers here)",
  summary:
    "Pinnacle promises retirees medical cover and, like most sponsors of these plans, sets aside no assets for it. Same machinery as a pension, with two twists: the key assumption is the health care cost trend rate, and because there is no trust, Pinnacle pays the benefits itself.",
  accounts: [
    cash(),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("opebLiab", "Retiree health care obligation", "ncl"),
    equity("sc", "Share capital"),
    re(),
    aoci(),
    exp("svc", "Retiree health care: service cost"),
    exp("int", "Retiree health care: interest cost"),
    oci("remeas", "Remeasurement: health care cost trend raised"),
  ],
  company: "Pinnacle Corp",
  opening: { cash: 600, ppe: 2000, opebLiab: 300, sc: 1500, re: 800 },
  steps: [
    {
      title: "Accrue the year's cost: service cost 20, interest 5% on 300",
      prompt: "Employees earn retiree medical benefits worth 20 this year. The beginning obligation is 300 and the discount rate is 5%. The plan holds no assets.",
      html:
        "<p>Same logic as a pension: the service cost is the present value of benefits earned this year, and the obligation accrues interest because it is a year closer to payment: 5% x 300 = 15. With no plan assets, there is no return to offset it, so IFRS net interest and US GAAP interest cost are the same 15.</p>",
      entries: [dr("svc", 20), dr("int", 15), cr("opebLiab", 35)],
    },
    {
      title: "The actuary raises the health care cost trend rate",
      prompt: "Medical costs are rising faster than assumed. The actuary raises the health care cost trend rate, and the obligation rises by 25.",
      html:
        "<p>The <b>health care cost trend rate</b> is the assumed annual growth in the cost of the medical care Pinnacle has promised. A higher trend rate means larger future claims, so the obligation rises. Like any actuarial loss, it goes to OCI under IFRS (and to OCI under US GAAP, subject to later amortization).</p>",
      entries: [dr("remeas", 25), cr("opebLiab", 25)],
      exam: "Higher health care cost trend rate (or a higher ultimate trend rate, or taking longer to reach it): higher obligation and higher periodic cost.",
    },
    {
      title: "Pinnacle pays 18 of retirees' medical claims itself",
      prompt: "Pinnacle pays retirees' medical bills of 18 directly, in cash.",
      html:
        "<p>In a funded pension plan the trust pays benefits and the sponsor's books do not move. Here there is no trust. Pinnacle pays the claims itself, so the cash payment <b>settles part of the obligation</b>: liability down 18, cash down 18, operating outflow. There is no expense, because the expense was recognized as the benefits were earned.</p>",
      entries: [dr("opebLiab", 18), cr("cash", 18, "CFO", "Retiree health care benefits paid")],
      insight: "Ending obligation: 300 + 20 + 15 + 25 - 18 = 342. Total periodic cost = 20 + 15 + 25 = 60, and the same number falls out of contributions minus the change in funded status: 18 - (-342 - (-300)) = 60.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "OCI", fn: (S) => S.OCI, fmt: "num" },
    { label: "Retiree health care obligation", fn: (S) => S.v("BS:opebLiab"), fmt: "num" },
  ],
};

/* ------------------------------------------------------------------ */
/* RSU tax windfall. 10 (million) RSUs granted at a share price of 30:
   grant-date fair value 300, cliff vesting after 3 years, expense 100 a year.
   Tax rate 20%: deferred tax asset builds 20 a year to 60. Year 3 operating
   profit before this grant's expense 1,600 (revenue 4,000 less other costs
   2,400, all cash). RSUs vest at a share price of 45: tax deduction
   10 x 45 = 450, tax saved 90 = 60 (uses the deferred tax asset) + 30
   (excess tax benefit, the windfall). Current tax payable
   (1,600 - 450) x 20% = 230. Year 3 pre-tax income 1,600 - 100 = 1,500.
   US GAAP tax expense -20 + 320 - 30 = 270 (ETR 18%); IFRS -20 + 320 = 300
   (ETR 20%) with the 30 credited to equity. Amounts in millions. */
const rsuOpen = { cash: 500, ppe: 1500, sc: 1200, re: 800 };
const rsuWindfall = {
  id: "lm11-rsu-windfall",
  module: "lm11",
  title: "Restricted stock units: expense, deferred tax, and the windfall at vesting",
  standard: "IFRS 2 and IAS 12 vs US GAAP ASC 718 and ASC 740",
  summary:
    "Pinnacle grants 10 million restricted stock units (RSUs) at a share price of 30, vesting after three years. The tax rate is 20%. The expense and the deferred tax asset build identically under both standards. The units vest when the share price is 45, so the tax deduction is bigger than the expense ever was. Watch where that extra tax saving lands: income tax expense under US GAAP, equity under IFRS, and the effective tax rate that follows. Amounts in millions.",
  accounts: [
    cash(),
    asset("dta", "Deferred tax asset: share-based pay", "nca"),
    asset("ppe", "Property, plant and equipment", "nca"),
    liab("taxPay", "Income tax payable", "cl"),
    equity("sc", "Share capital"),
    equity("apicRsu", "Paid-in capital: RSUs"),
    equity("eqTax", "Paid-in capital: excess tax benefit"),
    re(),
    rev("sales", "Revenue", { tags: ["sales"] }),
    exp("opex", "Other operating expenses"),
    exp("comp", "Compensation expense: RSUs"),
    exp("taxExp", "Income tax expense", { tags: ["tax"] }),
  ],
  columns: [
    { id: "ifrs", label: "IFRS", sub: "excess tax benefit to equity", opening: rsuOpen },
    { id: "gaap", label: "US GAAP", sub: "excess tax benefit to tax expense", opening: rsuOpen },
  ],
  steps: [
    {
      title: "Grant date: 10 million RSUs, share price 30",
      html:
        "<p>Each restricted stock unit is a promise to deliver one Pinnacle share if the employee is still there in three years. Its fair value is the share price at grant (no dividends are expected over the period), so the award is worth 10 x 30 = 300, fixed for good. No entry yet: no service has been received.</p><p>The tax authority sees it differently. In Pinnacle's jurisdiction the deduction comes only when the units vest, and it equals the value of the shares THEN. Nobody knows that number today.</p>",
      entries: { ifrs: [], gaap: [] },
      memo: {
        title: "Two measurements of the same award",
        rows: [
          ["Book: grant-date fair value, 10 x 30", "300"],
          ["Book: expense per year over 3 years", "100"],
          ["Tax: deduction at vesting, 10 x share price then", "unknown"],
          ["Deferred tax asset per year: 100 x 20%", "20"],
        ],
      },
      practice: false,
    },
    {
      title: "Year one: expense 100, and a deferred tax asset of 20",
      prompt: "Recognize one third of the 300 grant-date fair value. The tax rate is 20% and the deduction will come at vesting.",
      html:
        "<p>The expense is 300 / 3 = 100, credited to paid-in capital because the award will be settled in shares. Pinnacle gets no tax deduction this year, but it expects one later, so it records a <b>deferred tax asset</b> of 100 x 20% = 20 and a deferred tax benefit that reduces tax expense. Identical under both standards.</p>",
      entries: {
        ifrs: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
        gaap: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
      },
      insight: "Net income falls by 100 - 20 = 80. Total equity falls by only the 80 too: paid-in capital rose by 100 while retained earnings fell by 80 (the deferred tax asset is a real asset).",
    },
    { title: "Close year one", html: "Net income rolls into retained earnings.", entries: { ifrs: [], gaap: [] }, close: true, practice: false },
    {
      title: "Year two: another 100 of expense, deferred tax asset now 40",
      prompt: "Recognize the second year's expense and its deferred tax effect.",
      html: "<p>Same entry as year one. The share price is irrelevant to the book expense, which was fixed at grant.</p>",
      entries: {
        ifrs: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
        gaap: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
      },
    },
    { title: "Close year two", html: "Net income rolls into retained earnings.", entries: { ifrs: [], gaap: [] }, close: true, practice: false },
    {
      title: "Year three: Pinnacle's ordinary business earns 1,600 before this grant",
      prompt: "Revenue of 4,000 and other operating costs of 2,400 are settled in cash.",
      html: "<p>Identical in both columns. This gives the year a pre-tax income to measure the effective tax rate against.</p>",
      entries: {
        ifrs: [dr("cash", 4000, "CFO", "Cash received from customers"), cr("sales", 4000), dr("opex", 2400), cr("cash", 2400, "CFO", "Cash paid for operating expenses")],
        gaap: [dr("cash", 4000, "CFO", "Cash received from customers"), cr("sales", 4000), dr("opex", 2400), cr("cash", 2400, "CFO", "Cash paid for operating expenses")],
      },
      practice: false,
    },
    {
      title: "Year three: the last 100 of expense; deferred tax asset reaches 60",
      prompt: "Recognize the final year's RSU expense and its deferred tax effect.",
      html: "<p>Cumulative expense is now the full 300, and the deferred tax asset is 300 x 20% = 60: the tax saving Pinnacle expects if the deduction turns out equal to the expense.</p>",
      entries: {
        ifrs: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
        gaap: [dr("comp", 100), cr("apicRsu", 100), dr("dta", 20), cr("taxExp", 20)],
      },
    },
    {
      title: "The RSUs vest at a share price of 45: 10 million shares issued",
      prompt: "All 10 million units vest and Pinnacle issues 10 million shares. No cash changes hands.",
      html:
        "<p>Vesting is a move inside equity: the 300 built up in paid-in capital for the RSUs becomes share capital. Unlike an option exercise, <b>no cash comes in</b>: employees pay nothing for RSUs. Basic shares outstanding rise by 10 million, which is what a share count forecast has to pick up.</p>",
      entries: {
        ifrs: [dr("apicRsu", 300), cr("sc", 300)],
        gaap: [dr("apicRsu", 300), cr("sc", 300)],
      },
      insight: "Total equity does not move and the cash flow statement shows nothing. The cost of the award was the 300 of expense over three years, borne by existing shareholders through dilution.",
    },
    {
      title: "Year three tax on profit before the RSU deduction: 320",
      prompt: "Before counting the RSU deduction, taxable profit is the 1,600 from the ordinary business. The tax rate is 20%.",
      html: "<p>Tax on 1,600 at 20% is 320. Identical in both columns. The next step brings in the deduction for the vested RSUs.</p>",
      entries: {
        ifrs: [dr("taxExp", 320), cr("taxPay", 320)],
        gaap: [dr("taxExp", 320), cr("taxPay", 320)],
      },
    },
    {
      title: "The deduction is 450, not 300: a windfall of 30",
      prompt: "The tax deduction for the vested RSUs is 10 million x 45 = 450, saving 90 of tax. The deferred tax asset of 60 is used up. Record the saving under each standard.",
      html:
        "<p>The deduction is the value of the shares at vesting, 450, so it saves 450 x 20% = 90 of tax. The first 60 of that saving is exactly what the deferred tax asset anticipated, so the asset is used up. The remaining 30 is the <b>excess tax benefit</b> (the windfall): the tax effect of the 150 by which the share price rise made the deduction bigger than the expense.</p><p><b>US GAAP</b> puts the windfall in <b>income tax expense</b>, so tax expense falls and the effective tax rate drops below the statutory 20%. <b>IFRS</b> credits it directly to <b>equity</b>, on the logic that the extra 150 of deduction relates to an amount that never went through profit, so its tax effect should not either.</p>",
      entries: {
        ifrs: [dr("taxPay", 90), cr("dta", 60), cr("eqTax", 30)],
        gaap: [dr("taxPay", 90), cr("dta", 60), cr("taxExp", 30)],
      },
      notes: {
        ifrs: "Tax expense for the year: -20 + 320 = 300. Effective tax rate 300 / 1,500 = 20%.",
        gaap: "Tax expense for the year: -20 + 320 - 30 = 270. Effective tax rate 270 / 1,500 = 18%.",
      },
      memo: {
        title: "Splitting the 90 of tax saved",
        rows: [
          ["Deduction at vesting: 10 x 45", "450"],
          ["Tax saved: 450 x 20%", "90"],
          ["Used by the deferred tax asset: 300 x 20%", "60"],
          ["Excess tax benefit (windfall): (450 - 300) x 20%", "30"],
          ["Tax payable for the year: 320 - 90", "230"],
        ],
      },
      insight: "Same cash tax (230), same total equity, different net income: 1,230 under US GAAP and 1,200 under IFRS. The gap is entirely the windfall's destination.",
      exam: "Excess tax benefits at settlement: US GAAP to income tax expense (the effective tax rate moves with the share price); IFRS to equity (the effective tax rate stays near statutory). If the share price had FALLEN, the deduction would be below the expense, and the shortfall would raise tax expense.",
    },
  ],
  ratios: [
    { label: "Net income", fn: (S) => S.NI, fmt: "num" },
    { label: "Income tax expense", fn: (S) => -S.tag("tax"), fmt: "num" },
    { label: "Effective tax rate", fn: (S) => { const pt = S.NI - S.tag("tax"); return Math.abs(pt) > 0.5 ? -S.tag("tax") / pt : null; }, fmt: "pct" },
    { label: "Deferred tax asset", fn: (S) => S.v("BS:dta"), fmt: "num" },
    { label: "Total equity", fn: (S) => S.TE, fmt: "num" },
  ],
};

export default [dcVsDb, ifrsVsGaap, analystAdjust, opeb, stockOptions, grantsVsSars, rsuWindfall];
