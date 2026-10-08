/* LM11 Employee Compensation: Post-Employment and Share-Based.
   Demo cast: Pinnacle Corp (plan sponsor and option grantor), Kestrel Ltd
   (peer for disclosure comparisons). Maya is one Pinnacle employee used for
   the single-employee obligation example. Every number below was checked by
   arithmetic; the scenarios in scenarios/lm11.js use the same figures. */
export default {
  id: "lm11",
  num: 11,
  title: "Employee Compensation: Post-Employment and Share-Based",
  short: "Employee compensation",
  tagline:
    "Pay that employees earn today but collect years later is a debt in disguise: the accounting decides how much of it you see, and where.",
  minutes: 200,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "plan-types",
      title: "Two ways to promise a retirement, and who carries the risk",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>You are Pinnacle Corp's chief financial officer and the board wants to offer staff a retirement plan. There are two fundamentally different promises you can make, and the choice decides what shows up on Pinnacle's financial statements for the next forty years.</p>
<p>The first promise is about an <b>input</b>: "every year, Pinnacle will pay 6% of your salary into a retirement account in your name." What that account is worth at retirement depends on how the investments perform, and that is the employee's problem. This is a <b>defined contribution (DC) plan</b>. The second promise is about an <b>output</b>: "when you retire, Pinnacle will pay you 2% of your final salary for every year you worked here, every year until you die." Now the investments, the employee's future pay rises and how long retirees live are all Pinnacle's problem. This is a <b>defined benefit (DB) plan</b>.</p>
<p>The accounting follows the promise. A DC sponsor's obligation is finished the moment the contribution is paid, so there is nothing to estimate: the expense is the contribution. A DB sponsor owes an uncertain amount far in the future, so it has to estimate it, discount it, and carry the shortfall between that estimate and the assets set aside on its own balance sheet.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Defined contribution (DC)",
              tone: "green",
              points: [
                "Sponsor promises the contribution, not the outcome",
                "Employee bears investment risk and longevity risk",
                "Pension expense = the contribution due for the period",
                "Balance sheet: only an accrual if a contribution is unpaid at year end",
                "No actuarial assumptions, no remeasurements",
                "Same under International Financial Reporting Standards (IFRS) and US generally accepted accounting principles (US GAAP)",
              ],
            },
            {
              title: "Defined benefit (DB)",
              tone: "purple",
              points: [
                "Sponsor promises a benefit, usually based on salary and years of service",
                "Sponsor bears investment, salary, longevity and interest rate risk",
                "Expense is an actuarial estimate of the cost of benefits earned, plus financing effects",
                "Balance sheet: net pension liability (or asset) = obligation minus plan assets",
                "Heavy use of assumptions: discount rate, salary growth, mortality",
                "IFRS and US GAAP split the cost between profit and other comprehensive income (OCI) differently",
              ],
            },
            {
              title: "Other post-employment benefits (OPEB)",
              tone: "cyan",
              points: [
                "Mainly retiree health care, also life insurance after retirement",
                "Economically a defined benefit promise: the sponsor bears the cost risk",
                "Accounted for like a DB pension",
                "Usually unfunded: no assets set aside, so the whole obligation is the liability",
                "Key extra assumption: the health care cost trend rate",
              ],
            },
          ],
        },
        { t: "theater", scenario: "lm11-dc-vs-db" },
        {
          t: "table",
          caption: "Who bears which risk",
          head: ["Risk", "Defined contribution", "Defined benefit"],
          rows: [
            ["Investments underperform", "Employee: smaller retirement pot", "Sponsor: plan assets fall, net liability rises"],
            ["Retirees live longer than expected", "Employee: the pot must stretch further", "Sponsor: pensions are paid for more years"],
            ["Salaries grow faster than expected", "Nobody: contributions rise with pay, but the promise is still only the contribution", "Sponsor: benefits based on final salary rise"],
            ["Interest rates fall", "Employee: annuities cost more at retirement", "Sponsor: the present value of the obligation rises"],
          ],
          note: "That allocation of risk is the whole reason DB plans need a balance sheet liability and DC plans do not.",
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why defined contribution accounting is one line long",
          html: "Expense = contribution because the contribution IS the entire obligation. Once it is paid, Pinnacle owes nothing whatever markets do. A liability appears only if part of this period's contribution is still unpaid at the reporting date, and that liability is a plain accrual with no estimates in it.",
        },
        {
          t: "p",
          html: `<p><b>Other post-employment benefits.</b> Many companies also promise retirees medical cover. The promise is defined by the benefit (the care), not by a contribution, so the sponsor bears the risk that medical costs explode, and the accounting is the same as for a DB pension: an obligation measured at present value, a service cost, an interest cost, and actuarial gains and losses. What sets these plans apart in practice is funding and one extra assumption. They are usually <b>unfunded</b> (the sponsor pays claims as they arise), so the whole obligation sits on the balance sheet. And the obligation is driven by the <b>health care cost trend rate</b>, the assumed growth in medical costs, which you will meet again in the assumptions section.</p>
<p><b>Multi-employer plans</b> pool the contributions of several employers (often in one industry). The curriculum notes that a participant usually accounts for such a plan as defined contribution if there is not enough information to account for its share as defined benefit, which can leave a real deficit off the balance sheet.</p>`,
        },
        {
          t: "sort",
          prompt: "Tap each feature, then tap the plan type it describes.",
          buckets: [
            { id: "dc", label: "Defined contribution" },
            { id: "db", label: "Defined benefit (or OPEB)" },
          ],
          items: [
            { text: "Expense equals the cash contribution due for the year", bucket: "dc", why: "The contribution is the entire obligation, so there is nothing else to accrue." },
            { text: "The sponsor bears the risk that retirees live longer", bucket: "db", why: "The sponsor promised payments for life, so a longer life means more payments." },
            { text: "Needs an actuarial discount rate", bucket: "db", why: "Future benefits must be discounted to a present value obligation." },
            { text: "Employees' retirement pots fall when markets fall", bucket: "dc", why: "The employee owns the investment outcome." },
            { text: "A net liability equal to obligation minus plan assets", bucket: "db", why: "The funded status is the DB sponsor's net position." },
            { text: "Retiree medical cover with no assets set aside", bucket: "db", why: "An unfunded other post-employment benefit, accounted for like a DB plan." },
          ],
        },
        {
          t: "check",
          id: "lm11-types-1",
          q: "Pinnacle's DC plan requires a contribution of 5% of the 2,400 annual payroll. By year end Pinnacle has paid 100. Which is correct?",
          options: [
            "Expense is 100 and there is no liability",
            "Expense is 120 and a liability of 20 is recognized",
            "Expense depends on the return the employees' accounts earn",
          ],
          answer: 1,
          why: "The contribution due is 5% x 2,400 = 120, and that is the expense. The 20 still unpaid is a simple accrued liability. Investment returns belong to the employees and never touch a DC sponsor's expense.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "db-obligation",
      title: "Measuring the promise: what does Pinnacle owe one employee today?",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Maya joins Pinnacle at the start of year 1 and will retire at the end of year 5. The plan pays an annual pension of <b>2% of final salary for each year of service</b>, paid at the end of each year for 10 years after she retires. Her salary in year 1 is 50,000 and the actuary expects it to grow 4% a year, so her final (year 5) salary will be \\(50{,}000 \\times 1.04^4 = 58{,}493\\). The discount rate is 5%.</p>
<p>The question an accountant must answer at the end of year 1 is: what is the present value of what Pinnacle has <b>already</b> promised Maya, given that she has worked one year? Not what she might earn later, only what her service to date has bought her, measured on the salary she is expected to retire on.</p>`,
        },
        {
          t: "steps",
          title: "From the benefit formula to the obligation",
          items: [
            { title: "Project the final salary", html: "\\(50{,}000 \\times 1.04^4 = 58{,}493\\). Projecting salary growth is what makes this a <b>projected</b> benefit obligation." },
            { title: "Annual pension for the full career", html: "\\(2\\% \\times 58{,}493 \\times 5 \\text{ years} = 5{,}849\\) a year for 10 years." },
            { title: "Value it at the retirement date", html: "Present value of 5,849 a year for 10 years at 5%: annuity factor \\(\\tfrac{1 - 1.05^{-10}}{0.05} = 7.7217\\), so \\(5{,}849.29 \\times 7.7217 = 45{,}167\\). That lump sum at the end of year 5 is what the whole career costs." },
            { title: "Attribute it to years of service", html: "The benefit formula earns one fifth per year of service, so each year of work earns \\(45{,}167 / 5 = 9{,}033\\) of value at retirement. This allocation is the <b>projected unit credit method</b>." },
            { title: "Discount each year's slice back", html: "Year 1's slice is paid four years after the end of year 1: \\(9{,}033 / 1.05^4 = 7{,}432\\). That is the <b>current service cost</b> for year 1, and with no prior service it is also the obligation at the end of year 1." },
          ],
        },
        {
          t: "table",
          caption: "Maya's obligation year by year (projected unit credit, 5% discount rate)",
          head: ["Year", "Opening obligation", "Interest cost (5% x opening)", "Current service cost", "Closing obligation"],
          rows: [
            ["1", "0", "0", "7,432", "7,432"],
            ["2", "7,432", "372", "7,803", "15,607"],
            ["3", "15,607", "780", "8,194", "24,581"],
            ["4", "24,581", "1,229", "8,603", "34,413"],
            ["5", "34,413", "1,721", "9,033", "45,167"],
          ],
          note: "Each year's service cost is 9,033 discounted for the years left to retirement, so it rises as retirement approaches. Interest cost rises because the obligation it is charged on keeps growing. At the end of year 5 the obligation equals the 45,167 needed to buy the annuity.",
        },
        {
          t: "formula",
          name: "Projected unit credit: one employee",
          tex: "\\text{Service cost}_t = \\frac{\\text{Benefit at retirement} / N}{(1+r)^{N-t}};\\qquad \\text{Interest cost}_t = r \\times \\text{Obligation}_{t-1}",
          plain: "N is total years of service to retirement. Each year of work buys an equal slice of the retirement benefit, discounted for how far away retirement still is. The obligation also grows by the discount rate simply because a year has passed.",
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why interest cost exists at all",
          html: "The obligation is a present value. A year later, the same promise is a year closer to being paid, so its present value is higher by the discount rate, with no new work done. That unwinding of the discount is interest cost, and it is a financing cost, not an operating one. Remember that when you reach the analyst adjustments.",
        },
        {
          t: "h",
          text: "Three measures of the same promise",
        },
        {
          t: "table",
          head: ["Measure", "What it includes", "Maya, end of year 1"],
          rows: [
            ["Projected benefit obligation (PBO), US GAAP; present value of the defined benefit obligation, IFRS", "Service to date, valued on PROJECTED final salary. This is the obligation both standards use to measure the liability.", "7,432"],
            ["Accumulated benefit obligation (ABO), US GAAP disclosure", "Service to date, valued on CURRENT salary, ignoring future pay rises", "\\(2\\% \\times 50{,}000 \\times 1 = 1{,}000\\) a year; \\(1{,}000 \\times 7.7217 / 1.05^4 = 6{,}353\\)"],
            ["Vested benefit obligation (VBO)", "The part of the obligation employees keep even if they leave now", "0 if benefits vest only after, say, three years of service"],
          ],
          note: "For a pay-related plan with expected salary growth, PBO is greater than ABO, which is greater than or equal to VBO. If the plan does not depend on future salary, PBO and ABO are equal.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "Classic trap",
          html: "Using current salary to compute the obligation. The PBO (and the IFRS defined benefit obligation) projects salary forward to retirement. Current salary gives the ABO, a smaller number that is only disclosed under US GAAP.",
        },
        {
          t: "check",
          id: "lm11-obl-1",
          q: "Using Maya's facts, what is the current service cost for year 2?",
          options: ["7,432", "7,803", "9,033"],
          answer: 1,
          why: "Year 2's slice of the retirement benefit is 9,033, paid three years after the end of year 2: 9,033 / 1.05^3 = 7,803. 7,432 is year 1's service cost; 9,033 is the undiscounted slice, which only equals the service cost in the final year.",
        },
        {
          t: "check",
          id: "lm11-obl-2",
          q: "What is Maya's interest cost for year 3?",
          options: ["780", "410", "1,229"],
          answer: 0,
          why: "Interest cost = discount rate x opening obligation = 5% x 15,607 = 780. 1,229 is year 4's interest cost on the larger opening balance of 24,581.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "rollforward",
      title: "The whole plan: two roll-forwards and the funded status",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle has thousands of Mayas. The actuary aggregates them into one obligation, and a separate trust holds the investments set aside to pay them, the <b>plan assets</b>. Pinnacle's balance sheet does not show either number gross. It shows the difference, because that is what Pinnacle itself is on the hook for.</p>
<p>The note disclosures reconcile both numbers from the start of the year to the end, and an item set will often give you all but one line and ask for the missing one. The obligation moves for five reasons, the assets for three.</p>`,
        },
        {
          t: "formula",
          name: "Obligation roll-forward",
          tex: "\\text{PBO}_{end} = \\text{PBO}_{beg} + \\text{Current service cost} + \\text{Interest cost} + \\text{Past service cost} + \\text{Actuarial losses} - \\text{Actuarial gains} - \\text{Benefits paid}",
          plain: "Pinnacle's year: 1,000 + 60 + 50 + 50 + 40 - 70 = 1,130. Interest cost is the discount rate times the beginning obligation (5% x 1,000).",
        },
        {
          t: "formula",
          name: "Plan asset roll-forward",
          tex: "\\text{Plan assets}_{end} = \\text{Plan assets}_{beg} + \\text{Actual return} + \\text{Employer contributions} - \\text{Benefits paid}",
          plain: "Pinnacle's year: 900 + 50 + 80 - 70 = 960. Note it is the ACTUAL return that moves the assets, never the expected return.",
        },
        {
          t: "formula",
          name: "Funded status",
          tex: "\\text{Funded status} = \\text{Plan assets} - \\text{PBO};\\qquad \\text{Net pension liability} = \\text{PBO} - \\text{Plan assets}",
          plain: "Negative funded status (underfunded) is a net pension liability; positive (overfunded) is a net pension asset. Pinnacle: 960 - 1,130 = -170, a net liability of 170.",
        },
        { t: "widget", name: "PensionLab" },
        {
          t: "callout",
          tone: "trap",
          title: "Benefits paid is a non-event for the sponsor",
          html: "Benefits paid by the plan reduce the obligation AND the plan assets by the same amount. Funded status, the net liability, pension cost and Pinnacle's cash flow statement are all unchanged. The only time a benefit payment touches the sponsor's books is when the sponsor pays it directly, as with most unfunded retiree health care plans, where the cash payment reduces the liability.",
        },
        {
          t: "p",
          html: `<p><b>On the balance sheet.</b> Both IFRS and US GAAP put the full funded status on the balance sheet: an underfunded plan is a net pension liability (IFRS calls it the net defined benefit liability), an overfunded plan a net pension asset, subject to the following:</p>
<ul>
<li><b>IFRS asset ceiling.</b> A surplus is only an asset if Pinnacle can benefit from it. IFRS caps the net pension asset at the present value of economic benefits available as refunds from the plan or reductions in future contributions. US GAAP has no ceiling.</li>
<li><b>Several plans.</b> A company with some overfunded and some underfunded plans generally shows the overfunded ones as assets and the underfunded ones as liabilities rather than netting them all.</li>
</ul>`,
        },
        {
          t: "check",
          id: "lm11-rf-1",
          q: "Beginning PBO 2,400; current service cost 110; discount rate 6%; actuarial gain 30; benefits paid 140; no plan amendments. Ending PBO is closest to:",
          options: ["2,484", "2,544", "2,340"],
          answer: 0,
          why: "Interest cost = 6% x 2,400 = 144. Ending PBO = 2,400 + 110 + 144 - 30 - 140 = 2,484. Adding the actuarial gain instead of subtracting it gives 2,544; forgetting interest cost gives 2,340.",
        },
        {
          t: "check",
          id: "lm11-rf-2",
          q: "Beginning plan assets 1,800; expected return 7%; actual return 90; contributions 150; benefits paid 140. Ending plan assets are:",
          options: ["1,936", "1,900", "2,040"],
          answer: 1,
          why: "Plan assets move by the ACTUAL return: 1,800 + 90 + 150 - 140 = 1,900. Using the expected return (7% x 1,800 = 126) gives 1,936, a classic wrong answer.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "pension-cost",
      title: "The year's pension cost, and where IFRS and US GAAP put it",
      los: ["c"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle's net pension liability went from 100 to 170 this year, and Pinnacle also paid 80 of contributions. So what did the pension cost Pinnacle this year?</p>
<p>Think of the net liability as an account the employees hold against Pinnacle. It rose by 70 even after Pinnacle paid in 80, so the employees' claim grew by 150 in total. That 150 is the <b>total periodic pension cost</b> (TPPC): the full economic cost of the plan for the year, wherever it is reported. You can get it from the cash and the balance sheet, or by adding up what moved the obligation and the assets, and the two must agree.</p>`,
        },
        {
          t: "formula",
          name: "Total periodic pension cost (identical under IFRS and US GAAP)",
          tex: "\\text{TPPC} = \\text{Contributions} - (\\text{Funded status}_{end} - \\text{Funded status}_{beg}) = \\text{Service cost} + \\text{Interest cost} + \\text{Past service cost} + \\text{Actuarial losses} - \\text{Actual return}",
          plain: "Pinnacle: 80 - (-170 - (-100)) = 150, and 60 + 50 + 50 + 40 - 50 = 150. Benefits paid and expected return appear in neither version: one cancels out, the other is only a reporting device.",
        },
        {
          t: "p",
          html: `<p>Both standards agree on that 150. They disagree about how much of it to put in <b>profit or loss</b> (P&L) and how much in <b>other comprehensive income</b> (OCI). The disagreement comes from two different philosophies about volatility. Market values of plan assets and discount rates swing every year. Both standards keep at least some of those swings out of profit, but they do it in different ways.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "IFRS (IAS 19)",
              tone: "accent",
              points: [
                "<b>Service cost</b> in P&L: current service cost, past service cost (immediately), and gains or losses on settlements",
                "<b>Net interest</b> in P&L: discount rate x beginning net pension liability (or asset)",
                "<b>Remeasurements</b> in OCI: actuarial gains and losses, plus the return on plan assets minus the interest income at the discount rate (and any change in the asset ceiling effect)",
                "Remeasurements are NEVER reclassified to P&L later (they may be transferred within equity)",
              ],
            },
            {
              title: "US GAAP (ASC 715)",
              tone: "purple",
              points: [
                "P&L: current service cost + interest cost (discount rate x beginning PBO) - EXPECTED return on plan assets + amortization of prior service cost + amortization of actuarial gains and losses",
                "OCI: actuarial gains and losses as they arise, the difference between actual and expected return, and prior service cost when the plan is amended",
                "OCI amounts are later amortized OUT of accumulated OCI into P&L: prior service cost over the remaining service period, actuarial gains and losses under the corridor approach (or faster)",
              ],
            },
          ],
        },
        { t: "theater", scenario: "lm11-db-ifrs-vs-gaap" },
        {
          t: "table",
          caption: "Pinnacle's year, component by component",
          head: ["Component", "IFRS P&L", "IFRS OCI", "US GAAP P&L", "US GAAP OCI"],
          rows: [
            ["Current service cost", "60", "", "60", ""],
            ["Past service cost (amendment at year end)", "50", "", "", "50"],
            ["Interest cost: 5% x 1,000", "", "", "50", ""],
            ["IFRS net interest: 5% x (1,000 - 900)", "5", "", "", ""],
            ["Expected return: 7% x 900", "", "", "(63)", ""],
            ["Actual return 50 vs IFRS interest income 45", "", "(5)", "", ""],
            ["Actual return 50 vs expected return 63", "", "", "", "13"],
            ["Actuarial loss", "", "40", "", "40"],
            ["<b>Total</b>", "<b>115</b>", "<b>35</b>", "<b>47</b>", "<b>103</b>"],
            ["<b>TPPC = P&L + OCI</b>", "<b>150</b>", "", "<b>150</b>", ""],
          ],
          note: "Positive numbers are costs, brackets are credits. US GAAP reports a far lower P&L cost (47 vs 115) in year one because it defers the past service cost and credits a 7% expected return instead of a 5% interest income.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "The expected return trap",
          html: "Under US GAAP a higher expected return on plan assets lowers pension expense in P&L, so management has an incentive to assume a generous one. It changes nothing real: the obligation, the plan assets and TPPC are untouched, and every point of extra expected return is pushed into OCI as an equal loss. IFRS removed the lever entirely: interest income on plan assets is computed at the DISCOUNT rate.",
        },
        {
          t: "h",
          text: "The corridor: how US GAAP drains OCI into profit",
        },
        {
          t: "p",
          html: `<p>Actuarial gains and losses tend to reverse over time: a rate cut this year may be followed by a rise next year. So US GAAP lets them accumulate in accumulated OCI and only amortizes the part that has grown too big to be noise. The yardstick is the <b>corridor</b>: 10% of the greater of the beginning PBO and the beginning plan assets. Only the excess of the unrecognized net loss (or gain) over the corridor is amortized, spread over the average remaining service period of active employees. Companies may choose a faster method, including immediate recognition in P&L.</p>
<p>Pinnacle at the start of year two: net actuarial loss in accumulated OCI 40 + 13 = 53. Corridor = 10% x max(1,130, 960) = 113. The loss is inside the corridor, so nothing is amortized. Had the loss been 173, the excess of 60 would be amortized over the remaining service period (say 10 years), adding 6 to P&L pension expense.</p>`,
        },
        {
          t: "formula",
          name: "US GAAP corridor amortization",
          tex: "\\text{Amortization} = \\frac{\\text{Unrecognized net loss}_{beg} - 10\\% \\times \\max(\\text{PBO}_{beg},\\ \\text{Plan assets}_{beg})}{\\text{Average remaining service period}}\\quad(\\text{if positive})",
          plain: "Only the part of the accumulated loss (or gain) outside the 10% corridor is amortized. Prior service cost is amortized separately, straight-line over the remaining service period, with no corridor.",
        },
        {
          t: "h",
          text: "Retiree health care uses the same machinery",
        },
        { t: "theater", scenario: "lm11-opeb-unfunded" },
        {
          t: "check",
          id: "lm11-cost-1",
          q: "Under IFRS, which item is recognized in OCI rather than profit or loss?",
          options: [
            "Past service cost from a plan amendment",
            "Net interest on the net pension liability",
            "The return on plan assets in excess of interest income at the discount rate",
          ],
          answer: 2,
          why: "IFRS remeasurements (in OCI) are actuarial gains and losses and the return on plan assets minus the interest income component. Past service cost goes straight to profit under IFRS (it is US GAAP that parks prior service cost in OCI), and net interest is in profit.",
        },
        {
          t: "check",
          id: "lm11-cost-2",
          q: "A US GAAP company raises its expected return on plan assets from 6% to 8% on beginning plan assets of 1,000. All else equal, total periodic pension cost:",
          options: ["Falls by 20", "Is unchanged", "Rises by 20"],
          answer: 1,
          why: "TPPC uses the ACTUAL return. The higher expected return lowers P&L pension expense by 20 and raises the OCI loss (actual minus expected) by 20, so the total is unchanged.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "assumptions",
      title: "The assumptions: small dials that move big numbers",
      los: ["d"],
      blocks: [
        {
          t: "p",
          html: `<p>Every number in the last two sections rested on assumptions: a discount rate, a rate of salary growth, how long retirees live, and under US GAAP an expected return on plan assets. Management chooses them, with the actuary's help. An analyst who can predict the direction each one pushes the obligation and the cost can spot a company flattering its numbers, and can answer most assumption questions on the exam without any arithmetic.</p>
<p>Go back to Maya and change one dial at a time.</p>`,
        },
        {
          t: "table",
          caption: "Maya, end of year 1 and year 2 costs, with one assumption changed",
          head: ["Case", "Obligation end of year 1", "Service cost year 2", "Interest cost year 2"],
          rows: [
            ["Base: discount rate 5%, salary growth 4%", "7,432", "7,803", "372"],
            ["Discount rate 6%", "6,820 (lower)", "7,229 (lower)", "409 (higher)"],
            ["Salary growth 5%", "7,722 (higher)", "8,108 (higher)", "386 (higher)"],
          ],
          note: "Higher discount rate at 6%: the annuity factor falls to 7.3601, so the retirement lump sum falls to 43,051 and every slice is discounted harder. Interest cost still RISES, because the rate went up by a fifth (5% to 6%) while the obligation fell by only about 8%.",
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why the discount rate's effect on interest cost is ambiguous",
          html: "Interest cost = discount rate x obligation. Raise the rate and the first term rises while the second falls. Which wins depends on how long-dated the obligation is: the longer until payment, the more a rate change moves its present value. For most plans, as for Maya, the higher rate dominates and interest cost rises; for a very long-dated obligation, the fall in the obligation can dominate. Service cost, by contrast, is a present value of future benefits and reliably falls when the rate rises.",
        },
        {
          t: "table",
          caption: "Direction of effects (each assumption raised, all else equal)",
          head: ["Assumption raised", "Obligation (PBO)", "Service cost", "Interest cost", "P&L pension expense", "Total periodic pension cost"],
          rows: [
            ["Discount rate", "Lower", "Lower (usually)", "Ambiguous", "Usually lower", "Lower in the year of change: an actuarial GAIN"],
            ["Rate of compensation increase", "Higher", "Higher", "Higher", "Higher", "Higher: an actuarial loss"],
            ["Expected return on plan assets (US GAAP only)", "No effect", "No effect", "No effect", "Lower (US GAAP)", "No effect"],
            ["Life expectancy (longevity)", "Higher", "Higher", "Higher", "Higher", "Higher: an actuarial loss"],
            ["Health care cost trend rate (OPEB)", "Higher", "Higher", "Higher", "Higher", "Higher: an actuarial loss"],
          ],
          note: "Under IFRS there is no expected return assumption: interest income on plan assets is computed at the discount rate. A higher discount rate under IFRS therefore also raises the interest income credited on plan assets.",
        },
        {
          t: "sort",
          prompt: "Each change happens at the start of the year, all else equal. Tap a statement, then tap its effect.",
          buckets: [
            { id: "up", label: "Increases" },
            { id: "down", label: "Decreases" },
            { id: "none", label: "No effect" },
          ],
          items: [
            { text: "Higher discount rate: the PBO", bucket: "down", why: "Future benefits are discounted more heavily." },
            { text: "Higher discount rate: current service cost", bucket: "down", why: "Service cost is a present value, so it shrinks with a higher rate." },
            { text: "Higher compensation growth: the PBO", bucket: "up", why: "Benefits are based on a higher projected final salary." },
            { text: "Higher compensation growth: interest cost", bucket: "up", why: "Same rate applied to a larger obligation." },
            { text: "Higher expected return (US GAAP): pension expense in P&L", bucket: "down", why: "A larger expected return is subtracted in P&L." },
            { text: "Higher expected return (US GAAP): the PBO", bucket: "none", why: "The expected return concerns assets, not the obligation." },
            { text: "Higher expected return (US GAAP): total periodic pension cost", bucket: "none", why: "TPPC uses the actual return; the change only shifts cost from P&L to OCI." },
            { text: "Retirees expected to live longer: the PBO", bucket: "up", why: "Pensions are paid for more years." },
            { text: "Higher health care cost trend rate: the retiree health care obligation", bucket: "up", why: "Larger future medical claims." },
            { text: "Higher discount rate: the net pension liability", bucket: "down", why: "The obligation falls while plan assets do not." },
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "Reading the assumptions like an analyst",
          html: "Choices that flatter the statements: a HIGHER discount rate (smaller obligation, usually lower expense), a LOWER rate of compensation increase (smaller obligation and cost), a HIGHER expected return under US GAAP (lower P&L expense), and shorter assumed lifespans. A company whose discount rate sits well above peers with similar plans, or whose expected return looks generous for its asset mix, deserves a closer look.",
        },
        {
          t: "p",
          html: `<p><b>Health care trend assumptions.</b> Retiree medical plans usually assume a high near-term trend rate that steps down to a lower <b>ultimate</b> trend rate by a stated year. A higher near-term rate, a higher ultimate rate, or a later year for reaching the ultimate rate all raise the obligation and the periodic cost. Disclosures often show the effect of a one-percentage-point change in the trend rate, which is a quick measure of how exposed the company is.</p>`,
        },
        {
          t: "check",
          id: "lm11-asm-1",
          q: "A company lowers its assumed rate of compensation increase. Compared with no change, the PBO and the service cost will most likely be:",
          options: ["Lower and lower", "Lower and higher", "Unchanged and lower"],
          answer: 0,
          why: "Benefits depend on projected final salary, so slower salary growth shrinks the projected benefit. The obligation falls (an actuarial gain) and each year's slice of benefit, the service cost, is also smaller.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "analyst-adjust",
      title: "Analyst adjustments: treat the pension like the debt it is",
      los: ["e", "f"],
      blocks: [
        {
          t: "p",
          html: `<p>You are a credit analyst comparing Pinnacle with a peer that has no DB plan. Pinnacle owes its employees a fixed stream of future payments, financed partly by a pot of investments. Strip away the labels and that is a borrowing: Pinnacle has received labour today in exchange for payments later, and the obligation accrues interest. The reported statements blur that in three places, and each has a standard fix.</p>`,
        },
        {
          t: "steps",
          title: "The three adjustments",
          items: [
            { title: "Balance sheet: count the deficit as debt", html: "Add the net pension liability (the underfunded status) to debt when computing leverage. If the vignette gives only the funded status in the notes, use it; an overfunded plan can be treated as an asset. Some analysts add the deficit net of the related deferred tax asset." },
            { title: "Income statement: only service cost is operating", html: "Remove the reported pension expense from operating costs and replace it with service cost alone. Reclassify interest cost to interest expense, and the return on plan assets to non-operating (investment) income. Under US GAAP use the ACTUAL return rather than the smoothed expected return if you want the economic picture; under IFRS reclassify the net interest to interest expense." },
            { title: "Cash flow statement: separate funding from cost", html: "Compare employer contributions with TPPC. If contributions exceed TPPC, the excess paid down a debt-like obligation, so move it (after tax) from cash flow from operations (CFO) to cash flow from financing (CFF). If contributions fall short of TPPC, the shortfall is a borrowing from the plan: lower CFO and raise CFF by the after-tax shortfall." },
          ],
        },
        { t: "theater", scenario: "lm11-pension-analyst-adjust" },
        {
          t: "formula",
          name: "Cash flow reclassification",
          tex: "\\text{Adjustment to CFO} = +(\\text{Contributions} - \\text{TPPC}) \\times (1 - t);\\qquad \\text{Adjustment to CFF} = -(\\text{Contributions} - \\text{TPPC}) \\times (1 - t)",
          plain: "t is the tax rate. Pinnacle paid 100 against a TPPC of 60, so the excess is 40 and, at 30% tax, operating cash flow rises by 28 and financing cash flow falls by 28. When contributions are below TPPC the signs flip.",
        },
        {
          t: "table",
          caption: "What the adjustments do to Pinnacle's ratios (scenario numbers, tax ignored)",
          head: ["Measure", "As reported", "Adjusted", "Why it moved"],
          rows: [
            ["Operating profit", "353", "340", "Service cost (60) replaces the net pension expense (47)"],
            ["Interest expense", "40", "90", "Pension interest cost of 50 is a financing cost"],
            ["Interest coverage", "8.8x", "3.8x", "Lower operating profit over much higher interest"],
            ["Pre-tax income", "313", "300", "Actual return (50) replaces expected return (63)"],
            ["Cash from operations", "260", "300", "Excess contribution of 40 moved to financing"],
            ["(Debt + net pension liability) / equity", "0.308x on debt alone", "0.331x", "Ending net pension liability of 60 counted as debt"],
          ],
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum, flagged so you do not mistake it for exam content",
          html: "Since 2018 (ASU 2017-07), US GAAP requires the service cost component to be presented with other compensation costs and the other components of net periodic pension cost outside operating income. Many US GAAP reporters therefore already show something close to the analyst's operating line. IFRS leaves the presentation of net interest to the company, and many show it within finance costs. If the vignette says all pension cost sits in operating expenses, adjust as above.",
        },
        {
          t: "check",
          id: "lm11-adj-1",
          q: "A company's employer contributions were 140 and its total periodic pension cost was 100. The tax rate is 25%. To reflect the economic substance, an analyst would most likely:",
          options: [
            "Increase operating cash flow by 30 and decrease financing cash flow by 30",
            "Decrease operating cash flow by 30 and increase financing cash flow by 30",
            "Increase operating cash flow by 40 and decrease financing cash flow by 40",
          ],
          answer: 0,
          why: "Contributions exceeded the economic cost by 40, which is in substance a repayment of the pension borrowing. After tax that is 40 x (1 - 0.25) = 30, moved out of operating outflows into financing outflows: CFO up 30, CFF down 30.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "disclosures",
      title: "Reading the pension note",
      los: ["f"],
      blocks: [
        {
          t: "p",
          html: `<p>The balance sheet gives you one number, the net pension liability. Everything you need to judge it lives in the note: the roll-forwards, the cost components, the assumptions, the plan's investments and the cash the plan will need. An item set will hand you an excerpt from that note and expect you to know which line answers which question.</p>`,
        },
        {
          t: "table",
          caption: "Where each number lives",
          head: ["You want", "Look in the note for", "Use it to"],
          rows: [
            ["Service cost, interest cost, actuarial gains and losses, benefits paid", "Reconciliation of the benefit obligation (opening to closing)", "Compute TPPC; separate operating from financing cost"],
            ["Actual return, contributions, benefits paid", "Reconciliation of plan assets (opening to closing)", "Compute TPPC; compare contributions with TPPC for the cash flow adjustment"],
            ["Funded status", "Obligation less plan assets at year end", "Add the deficit to debt"],
            ["What went to P&L and what went to OCI", "Components of periodic pension cost; amounts recognized in OCI and accumulated OCI", "Separate operating, financing and remeasurement items"],
            ["Discount rate, rate of compensation increase, expected return (US GAAP), health care trend rates", "Actuarial assumptions table", "Compare with peers and across years"],
            ["How sensitive the obligation is", "Sensitivity analysis (IFRS requires one for each significant assumption)", "Gauge the risk in the obligation"],
            ["Future cash demands", "Expected contributions next year; expected benefit payments by year", "Forecast operating cash flow and liquidity needs"],
            ["What the plan is invested in", "Plan asset allocation", "Judge whether the expected return is plausible and how volatile the funded status may be"],
          ],
        },
        {
          t: "h",
          text: "Comparing assumptions across companies",
        },
        {
          t: "table",
          caption: "Two US GAAP sponsors with similar workforces",
          head: ["Assumption", "Pinnacle", "Kestrel", "Reading"],
          rows: [
            ["Discount rate", "4.8%", "5.6%", "Kestrel's higher rate makes its obligation look smaller: less conservative"],
            ["Rate of compensation increase", "3.5%", "2.5%", "Kestrel's lower salary growth also shrinks its obligation and cost: less conservative"],
            ["Expected return on plan assets", "6.5%", "8.0%", "Kestrel's higher expected return lowers its reported P&L expense: less conservative"],
            ["Plan assets in equities", "45%", "40%", "Kestrel expects MORE return from a MORE conservative asset mix: a red flag"],
          ],
          note: "Every Kestrel choice flatters its statements. Before comparing the two companies' leverage or margins, an analyst would want to estimate Kestrel's obligation and expense on Pinnacle's assumptions, or at least treat Kestrel's reported figures as optimistic.",
        },
        {
          t: "callout",
          tone: "exam",
          title: "Cash flow information in the note",
          html: "Contributions are an operating outflow, and a sponsor has some discretion over their timing, so CFO can be managed by deferring or accelerating them. A large funded-status deficit, combined with the expected benefit payment schedule, tells you how much cash the plan will demand in future years. Compare the expected contributions with TPPC: persistent under-contribution is effectively borrowing from employees.",
        },
        {
          t: "check",
          id: "lm11-disc-1",
          q: "Two otherwise similar companies report discount rates of 4.5% and 5.5%. Relative to the 4.5% company, the 5.5% company's assumption most likely:",
          options: [
            "Overstates its pension obligation",
            "Understates its pension obligation",
            "Has no effect on its obligation, only on its expense",
          ],
          answer: 1,
          why: "A higher discount rate gives a lower present value of the same benefits, so the obligation, and the deficit added to debt by an analyst, look smaller than on the peer's assumption.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "share-based-issues",
      title: "Paying in shares: the issues",
      los: ["g"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle wants to reward its managers for growing the share price, and it would rather not spend cash doing it. Giving managers shares or options looks ideal: it ties their wealth to shareholders' wealth, it costs no cash today, and if the share price never rises, options pay nothing.</p>
<p>That last point is exactly the problem. For years, an at-the-money option was recorded at its intrinsic value on the grant date, which is zero, so options looked free in the income statement. They are not free: something the market would pay real money for was handed to employees in exchange for their work. Today both IFRS and US GAAP require equity-settled share-based compensation to be <b>expensed at its fair value on the grant date</b>, spread over the period in which employees earn it. (Awards settled in cash are the exception: they are remeasured every period, as you will see in the next section.)</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Why companies use it",
              tone: "green",
              points: [
                "Aligns managers' interests with shareholders'",
                "Conserves cash: no cash outflow at grant or vesting for equity-settled awards",
                "Helps retain staff, because unvested awards are lost on leaving",
              ],
            },
            {
              title: "The issues an analyst must weigh",
              tone: "red",
              points: [
                "Options have an asymmetric payoff: managers share the upside but not the downside, which can encourage excessive risk-taking or a focus on short-term share price",
                "Managers may also time news or dividend decisions around grants and exercises",
                "Dilution: new shares on exercise or vesting reduce existing holders' ownership",
                "The expense is an estimate: option values depend on assumptions management chooses, so they can be biased low",
                "Expense and cash diverge: a large non-cash expense with no outflow, while the economic cost lands on shareholders as dilution",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Who actually pays",
          html: "When Pinnacle settles in shares, its cash never moves: the cost is borne by existing shareholders, whose slice of the company shrinks. That is why the expense is real even though cash from operations is untouched, and why analysts read the share-based compensation note alongside diluted earnings per share.",
        },
        {
          t: "p",
          html: `<p>The disclosures that make the expense auditable are the ones to read: the valuation model used, each assumption (expected volatility, expected term, risk-free rate, expected dividends), the number of awards outstanding, granted, exercised and forfeited, and the compensation cost not yet recognized for unvested awards with the period over which it will be recognized. That last figure tells you how much future expense is already locked in.</p>`,
        },
        {
          t: "check",
          id: "lm11-sbc-1",
          q: "Which statement about equity-settled share-based compensation is most accurate?",
          options: [
            "It has no economic cost because no cash is paid",
            "It is expensed at grant-date fair value over the service period",
            "It is remeasured to fair value at each reporting date",
          ],
          answer: 1,
          why: "Both standards measure equity-settled awards once, at fair value on the grant date, and recognize that amount over the service period. Remeasurement every period is the rule for CASH-settled awards. The economic cost is real and falls on shareholders through dilution.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "grants-options",
      title: "Stock grants, stock options and appreciation rights in the statements",
      los: ["h"],
      blocks: [
        {
          t: "p",
          html: `<p>Every share-based award has the same timeline. On the <b>grant date</b> the terms are agreed and the award is measured. Over the <b>vesting (service) period</b> employees earn it and the expense is recognized. For options, the <b>exercise date</b> comes later, when employees pay the exercise price and receive shares. The type of award decides how it is measured and whether the credit side is equity or a liability.</p>`,
        },
        {
          t: "tree",
          title: "How is this award measured?",
          root: "settle",
          nodes: {
            settle: {
              q: "Will the award be settled in shares or in cash?",
              help: "Stock appreciation rights and phantom shares paid in cash are cash-settled.",
              options: [{ label: "Shares", next: "kind" }, { label: "Cash", next: "cash" }],
            },
            kind: {
              q: "What do employees receive?",
              options: [{ label: "Shares (a stock grant or restricted stock)", next: "grant" }, { label: "Options to buy shares at a fixed price", next: "opt" }],
            },
            grant: { result: "Grant-date market price of the shares", tone: "green", html: "Fair value = share price at grant x number of shares, expensed over the vesting period, credited to equity. Never remeasured. Performance shares are also valued at grant date, with the number expected to vest reflecting the performance conditions." },
            opt: { result: "Grant-date fair value from an option pricing model", tone: "cyan", html: "Black-Scholes-Merton or a binomial (lattice) model, using the share price, exercise price, expected term, expected volatility, risk-free rate and expected dividends. Expensed over the vesting period, credited to paid-in capital. Never remeasured." },
            cash: { result: "A liability, remeasured to fair value every reporting date", tone: "amber", html: "Expense = change in the liability, which tracks the share price and the portion of the service period completed. Cumulative expense ends up equal to the cash paid." },
          },
        },
        {
          t: "h",
          text: "Stock grants",
        },
        {
          t: "p",
          html: `<p>An outright <b>stock grant</b> gives employees shares, usually as <b>restricted stock</b> that cannot be sold or is forfeited unless the employee stays for a vesting period. <b>Performance shares</b> are contingent on a target, often an accounting measure such as return on assets, which gives managers an incentive to manage that measure. In every case the fair value is the market price of the shares on the grant date, and that fixed amount is expensed over the vesting period, because that is the period in which Pinnacle receives the service the award pays for. If an award vests immediately, there is no future service to wait for, so the whole fair value is expensed on the grant date. The scenario below shows it next to a cash-settled award.</p>`,
        },
        {
          t: "h",
          text: "Stock options",
        },
        {
          t: "p",
          html: `<p>An option has no market price because employee options cannot be traded, so its fair value comes from a model: Black-Scholes-Merton or a binomial model. The curriculum does not ask you to compute it, but it does test the inputs and their direction, because management chooses most of them. The two that are observable are the share price and the exercise price. The others are estimates: <b>expected term</b> (employees often exercise early, so it is usually shorter than the contractual life), <b>expected volatility</b>, the <b>risk-free rate</b> for that term, and the <b>expected dividend yield</b>.</p>`,
        },
        { t: "theater", scenario: "lm11-stock-options" },
        { t: "widget", name: "StockOptionLab" },
        {
          t: "table",
          caption: "Assumptions and option value (Pinnacle base case: value 6.00 per option)",
          head: ["Assumption raised", "Option fair value", "Compensation expense", "Pinnacle, one input changed"],
          rows: [
            ["Expected volatility", "Higher", "Higher", "30% to 35%: 6.00 to 6.91"],
            ["Expected term", "Higher", "Higher", "5 to 6 years: 6.00 to 6.40"],
            ["Risk-free rate", "Higher", "Higher", "3% to 4%: 6.00 to 6.42"],
            ["Expected dividend yield", "LOWER", "LOWER", "2.5% to 3.5%: 6.00 to 5.32"],
          ],
          note: "Why dividends lower the value: option holders do not receive dividends, and every dividend paid lowers the share price they need to rise. Why a higher risk-free rate raises it: the exercise price is paid in the future, so its present value is smaller when rates are higher.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "Classic trap",
          html: "Thinking a higher assumed dividend yield raises option expense because dividends sound like 'more value'. It is the reverse: higher expected dividends lower the call value and so lower the expense. A company wanting a smaller expense can assume a shorter term, lower volatility or higher dividends. A shorter expected term alone (5 years to 3 at Pinnacle) cuts the value from 6.00 to 4.89 per option, and the total cost from 90,000 to 73,350.",
        },
        {
          t: "formula",
          name: "Expense for an equity-settled award with cliff vesting",
          tex: "\\text{Annual expense} = \\frac{\\text{Number of awards expected to vest} \\times \\text{Grant-date fair value per award}}{\\text{Vesting period in years}}",
          plain: "Pinnacle: 15,000 x 6.00 / 3 = 30,000 a year. Credit paid-in capital. If employees forfeit by leaving before vesting, the expense for their awards is reversed; if vested options simply expire unexercised, nothing is reversed.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum: the model itself",
          html: "For reference, the Black-Scholes-Merton value of a call with continuous dividend yield q is \\(c = S e^{-qT} N(d_1) - K e^{-rT} N(d_2)\\), with \\(d_1 = \\frac{\\ln(S/K) + (r - q + \\sigma^2/2)T}{\\sigma\\sqrt{T}}\\) and \\(d_2 = d_1 - \\sigma\\sqrt{T}\\). The lab above uses exactly this. The exam tests the direction of each input, not the computation.",
        },
        {
          t: "h",
          text: "Stock appreciation rights and phantom shares",
        },
        {
          t: "p",
          html: `<p>A <b>stock appreciation right</b> (SAR) pays the employee the increase in the share price above a set price, usually in cash. Employees get the upside without having to buy shares, and existing shareholders suffer no dilution; but Pinnacle pays cash, and the employee bears no downside. <b>Phantom shares</b> work similarly but are based on a hypothetical number of shares, which lets companies without listed shares (or business units) offer share-like rewards.</p>
<p>Because a cash-settled award will be paid in cash, it is a <b>liability</b>, and a liability is measured at what it will cost to settle. So it is remeasured at fair value at every reporting date, and the expense is the change in the liability. The expense now moves with the share price, and can even be negative.</p>`,
        },
        { t: "theater", scenario: "lm11-grants-vs-sars" },
        {
          t: "sort",
          prompt: "What happens to the compensation expense Pinnacle recognizes? Tap each event, then its effect.",
          buckets: [
            { id: "up", label: "Expense rises" },
            { id: "down", label: "Expense falls" },
            { id: "none", label: "No effect" },
          ],
          items: [
            { text: "Higher expected volatility assumed at grant (options)", bucket: "up", why: "A more volatile share gives the option more upside, so its fair value is higher." },
            { text: "Higher expected dividend yield assumed at grant (options)", bucket: "down", why: "Dividends lower the expected share price path that option holders need." },
            { text: "Longer expected term assumed at grant (options)", bucket: "up", why: "More time for the share price to rise, and a later exercise payment." },
            { text: "Share price falls after grant (equity-settled options)", bucket: "none", why: "Equity-settled awards are fixed at grant-date fair value." },
            { text: "Share price rises after grant (cash-settled SARs)", bucket: "up", why: "The liability is remeasured to a higher fair value." },
            { text: "Share price falls after grant (cash-settled SARs)", bucket: "down", why: "The liability shrinks and the reduction is credited to expense." },
            { text: "Higher risk-free rate assumed at grant (options)", bucket: "up", why: "The present value of the exercise price falls, so the call is worth more." },
          ],
        },
        {
          t: "check",
          id: "lm11-opt-1",
          q: "Pinnacle grants 20,000 options with a grant-date fair value of 4.50 each, vesting after 3 years. In year 2 the share price doubles. Compensation expense in year 2 is:",
          options: ["30,000", "60,000", "90,000"],
          answer: 0,
          why: "Equity-settled options are measured once: 20,000 x 4.50 = 90,000, expensed evenly over 3 years = 30,000 a year. The share price movement after grant does not change the expense.",
        },
        {
          t: "check",
          id: "lm11-opt-2",
          q: "When employees exercise equity-settled options, the company's financial statements show:",
          options: [
            "A financing cash inflow equal to the exercise price received, and no income statement effect",
            "An operating cash inflow and a gain equal to the exercise price",
            "A compensation expense equal to the intrinsic value at exercise",
          ],
          answer: 0,
          why: "Exercise is a share issue: cash in (financing) and an increase in share capital, together with the paid-in capital already built up from the option expense. The cost was fixed at grant and recognized during vesting, so exercise adds nothing to the income statement.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "A defined contribution plan's expense depends on how the plan's investments perform.", right: "DC expense is the contribution due for the period. Investment performance belongs to the employees, which is the whole point of the plan type." },
    { wrong: "The pension obligation is measured on employees' current salaries.", right: "The PBO and the IFRS defined benefit obligation project salaries to retirement. Current salaries give the accumulated benefit obligation, a smaller US GAAP disclosure figure." },
    { wrong: "Benefits paid to retirees reduce the sponsor's net pension liability and are an operating cash outflow.", right: "Benefits paid from plan assets reduce the obligation and the assets equally: funded status, cost and the sponsor's cash flows are unchanged. Only benefits the sponsor pays directly (typical of unfunded retiree health care) reduce its liability and its cash." },
    { wrong: "Plan assets grow by the expected return on plan assets.", right: "Plan assets grow by the ACTUAL return. The expected return is a US GAAP device for measuring P&L expense; the gap between actual and expected goes to OCI." },
    { wrong: "Under IFRS, past service cost is recognized in OCI and amortized.", right: "IFRS expenses past service cost in profit immediately. It is US GAAP that records prior service cost in OCI and amortizes it over the remaining service period." },
    { wrong: "IFRS remeasurements are recycled to profit when the plan is settled or over time.", right: "IFRS remeasurements in OCI are never reclassified to profit. They may be transferred within equity. US GAAP is the standard that amortizes OCI amounts into profit." },
    { wrong: "A higher expected return on plan assets lowers total periodic pension cost.", right: "It lowers US GAAP P&L expense only. TPPC uses the actual return, so the change just moves cost from P&L into OCI. The obligation is untouched." },
    { wrong: "A higher discount rate always lowers interest cost.", right: "Interest cost is the rate times the obligation: the rate rises while the obligation falls. The net effect is ambiguous; for most plans the higher rate dominates and interest cost rises." },
    { wrong: "When contributions exceed TPPC, the analyst should reduce operating cash flow.", right: "The excess is a repayment of a debt-like obligation, so it moves OUT of operating outflows: CFO rises and CFF falls by the after-tax excess." },
    { wrong: "Equity-settled option expense rises if the share price rises after grant.", right: "Equity-settled awards are measured once at grant-date fair value. Only cash-settled awards (such as SARs paid in cash) are remeasured as the share price moves." },
    { wrong: "Assuming a higher dividend yield increases the fair value of employee options.", right: "Option holders do not receive dividends, and dividends lower the share price path, so a higher dividend yield LOWERS option value and expense." },
    { wrong: "Share-based compensation reduces total equity.", right: "For equity-settled awards the expense reduces retained earnings and the credit raises paid-in capital by the same amount: total equity is unchanged until exercise brings in cash." },
  ],

  gaap: [
    { topic: "Balance sheet", ifrs: "Net defined benefit liability (asset) = obligation minus plan assets; a surplus is limited by the asset ceiling", usgaap: "Funded status on the balance sheet; no asset ceiling" },
    { topic: "Service cost", ifrs: "Current service cost, past service cost and settlement gains or losses, all in P&L", usgaap: "Current service cost in P&L; prior service cost to OCI, then amortized to P&L" },
    { topic: "Interest", ifrs: "Net interest = discount rate x beginning net liability (asset), in P&L", usgaap: "Interest cost = discount rate x beginning PBO, in P&L" },
    { topic: "Return on plan assets", ifrs: "Interest income at the discount rate is inside net interest in P&L; the remainder of the actual return is a remeasurement in OCI", usgaap: "EXPECTED return in P&L; actual minus expected to OCI" },
    { topic: "Actuarial gains and losses", ifrs: "Remeasurements in OCI, never reclassified to P&L", usgaap: "OCI, then amortized to P&L using the corridor approach (or faster, including immediate recognition)" },
    { topic: "Total periodic pension cost", ifrs: "Contributions minus change in funded status", usgaap: "Same number: only the P&L and OCI split differs" },
    { topic: "Presentation of components", ifrs: "No required line; net interest is often shown in finance costs", usgaap: "Service cost with compensation costs; other components outside operating income (ASU 2017-07, flagged)" },
    { topic: "Equity-settled share-based awards", ifrs: "Grant-date fair value, expensed over the service period, credited to equity", usgaap: "Same" },
    { topic: "Cash-settled awards (SARs paid in cash)", ifrs: "Liability remeasured to fair value at each reporting date", usgaap: "Same" },
  ],

  formulas: [
    { name: "Obligation roll-forward", tex: "\\text{PBO}_{end} = \\text{PBO}_{beg} + \\text{SC} + \\text{IC} + \\text{PSC} + \\text{AL} - \\text{AG} - \\text{Benefits paid}", plain: "SC current service cost, IC interest cost (discount rate x beginning PBO), PSC past service cost, AL and AG actuarial losses and gains." },
    { name: "Plan asset roll-forward", tex: "\\text{PA}_{end} = \\text{PA}_{beg} + \\text{Actual return} + \\text{Contributions} - \\text{Benefits paid}", plain: "Actual, never expected, return moves the assets." },
    { name: "Funded status", tex: "\\text{FS} = \\text{PA} - \\text{PBO}", plain: "Negative: net pension liability. Positive: net pension asset (IFRS: up to the asset ceiling)." },
    { name: "Total periodic pension cost", tex: "\\text{TPPC} = \\text{Contributions} - (\\text{FS}_{end} - \\text{FS}_{beg}) = \\text{SC} + \\text{IC} + \\text{PSC} + \\text{AL} - \\text{AG} - \\text{Actual return}", plain: "Identical under IFRS and US GAAP." },
    { name: "IFRS pension cost in P&L", tex: "\\text{SC} + \\text{PSC} + r \\times (\\text{PBO}_{beg} - \\text{PA}_{beg})", plain: "Service cost plus net interest on the net liability at the discount rate r." },
    { name: "IFRS remeasurements in OCI", tex: "\\text{AL} - \\text{AG} - (\\text{Actual return} - r \\times \\text{PA}_{beg})", plain: "Actuarial losses, less the part of the actual return above interest income at the discount rate." },
    { name: "US GAAP pension cost in P&L", tex: "\\text{SC} + \\text{IC} - \\text{Expected return} + \\text{Amortization of prior service cost} + \\text{Amortization of net actuarial loss}", plain: "Expected return = expected rate x beginning plan assets." },
    { name: "US GAAP corridor amortization", tex: "\\frac{\\text{Net loss}_{beg} - 10\\% \\times \\max(\\text{PBO}_{beg}, \\text{PA}_{beg})}{\\text{Average remaining service period}}", plain: "Only the excess over the corridor is amortized." },
    { name: "Projected unit credit service cost", tex: "\\text{SC}_t = \\frac{\\text{Benefit at retirement}/N}{(1+r)^{N-t}}", plain: "Each year of service buys an equal slice of the retirement benefit, discounted to today." },
    { name: "Cash flow adjustment", tex: "(\\text{Contributions} - \\text{TPPC}) \\times (1 - t)", plain: "Positive: add to CFO and subtract from CFF. Negative: the reverse." },
    { name: "Equity-settled award expense (cliff vesting)", tex: "\\frac{\\text{Awards expected to vest} \\times \\text{Grant-date fair value}}{\\text{Vesting years}}", plain: "Credit paid-in capital. Not remeasured after grant." },
    { name: "Cash-settled award expense", tex: "\\text{Expense}_t = \\text{FV}_t \\times \\text{Units} \\times \\frac{\\text{Service completed}}{\\text{Service period}} - \\text{Liability}_{t-1}", plain: "The change in a liability measured at current fair value for the service completed so far." },
  ],

  recall: [
    { q: "What is the pension expense of a defined contribution plan?", a: "The contribution due for the period. Any unpaid portion at year end is an accrued liability." },
    { q: "Name the five items that move the PBO during a year.", a: "Current service cost, interest cost, past service cost (plan amendments), actuarial gains and losses, and benefits paid." },
    { q: "Name the three items that move plan assets.", a: "Actual return, employer contributions, benefits paid." },
    { q: "What is the difference between the PBO and the ABO?", a: "The PBO projects salaries to retirement; the ABO uses current salaries. For a pay-related plan with salary growth, PBO is larger." },
    { q: "Give the two ways to compute total periodic pension cost.", a: "Contributions minus the change in funded status; or service cost + interest cost + past service cost + actuarial losses (minus gains) minus actual return." },
    { q: "What goes to P&L under IFRS?", a: "Service cost (current and past, plus settlement gains and losses) and net interest on the net pension liability or asset." },
    { q: "What goes to OCI under IFRS, and is it ever recycled?", a: "Remeasurements: actuarial gains and losses and the return on plan assets minus interest income at the discount rate (and asset ceiling effects). Never recycled to P&L." },
    { q: "What goes to P&L under US GAAP?", a: "Service cost, interest cost, minus expected return on plan assets, plus amortization of prior service cost and of net actuarial gains or losses." },
    { q: "How does the corridor work?", a: "Amortize only the unrecognized net gain or loss in excess of 10% of the greater of beginning PBO and plan assets, over the average remaining service period." },
    { q: "Raising which assumptions lowers the PBO?", a: "A higher discount rate. (Lower compensation growth and shorter life expectancy also lower it.) The expected return has no effect on the PBO." },
    { q: "Which pension components are operating, and where do the others go in an analyst's adjustment?", a: "Only service cost is operating. Interest cost goes to interest expense; the return on plan assets goes to non-operating income." },
    { q: "Contributions exceed TPPC. What does the analyst do to cash flows?", a: "Move the after-tax excess from CFO to CFF: CFO up, CFF down, as if it were a debt repayment." },
    { q: "When is an equity-settled award measured, and over what period is it expensed?", a: "At fair value on the grant date; expensed over the vesting (service) period, credited to equity." },
    { q: "How do higher volatility, longer term, higher risk-free rate and higher dividend yield affect option value?", a: "The first three increase it; a higher dividend yield decreases it." },
    { q: "How is a cash-settled SAR accounted for?", a: "As a liability remeasured to fair value at each reporting date; expense is the change in the liability, so it moves with the share price." },
  ],

  itemSets: [
    {
      id: "lm11-is1",
      title: "Pinnacle's defined benefit plan under both standards",
      vignette: `<p>Pinnacle Corp sponsors a defined benefit pension plan. An analyst gathers the following for the year:</p>
<table><tbody>
<tr><td>Projected benefit obligation, beginning of year</td><td>2,000</td></tr>
<tr><td>Plan assets, beginning of year</td><td>1,700</td></tr>
<tr><td>Discount rate</td><td>6%</td></tr>
<tr><td>Expected return on plan assets</td><td>8%</td></tr>
<tr><td>Current service cost</td><td>120</td></tr>
<tr><td>Actuarial loss (from a reduction in the discount rate at year end)</td><td>60</td></tr>
<tr><td>Actual return on plan assets</td><td>100</td></tr>
<tr><td>Employer contributions</td><td>180</td></tr>
<tr><td>Benefits paid by the plan</td><td>150</td></tr>
<tr><td>US GAAP amortization of amounts in accumulated OCI</td><td>15</td></tr>
</tbody></table>
<p>There were no plan amendments during the year. The analyst wants to compare the plan's effect on the financial statements under IFRS and US GAAP.</p>`,
      questions: [
        {
          q: "The plan's funded status at the end of the year is closest to:",
          options: ["A net liability of 320", "A net liability of 284", "A net liability of 300"],
          answer: 0,
          why: "Interest cost = 6% x 2,000 = 120. Ending PBO = 2,000 + 120 + 120 + 60 - 150 = 2,150. Ending plan assets = 1,700 + 100 + 180 - 150 = 1,830, using the ACTUAL return. Funded status = 1,830 - 2,150 = -320. Using the expected return of 136 instead gives 284; 300 is the beginning deficit.",
        },
        {
          q: "Under IFRS, the pension cost recognized in profit or loss is closest to:",
          options: ["138", "104", "140"],
          answer: 0,
          why: "IFRS P&L = service cost + net interest = 120 + 6% x (2,000 - 1,700) = 120 + 18 = 138. Equivalently 120 + interest cost 120 - interest income 102. 104 wrongly uses the 8% expected return; 140 uses the actual return.",
        },
        {
          q: "Under US GAAP, the pension expense recognized in profit or loss is closest to:",
          options: ["104", "119", "155"],
          answer: 1,
          why: "US GAAP P&L = service cost 120 + interest cost 120 - expected return (8% x 1,700 = 136) + amortization 15 = 119. Leaving out the amortization gives 104; using the actual return of 100 instead of the expected return gives 155.",
        },
        {
          q: "Under IFRS, the remeasurement loss recognized in OCI for the year is closest to:",
          options: ["60", "96", "62"],
          answer: 2,
          why: "IFRS remeasurement = actuarial loss 60 + (interest income 102 - actual return 100 = 2 shortfall) = 62. Check: P&L 138 + OCI 62 = 200 = total periodic pension cost = contributions 180 - change in funded status (-320 - (-300) = -20) = 200. A loss of 96 uses the US GAAP benchmark of expected return (60 + 136 - 100).",
        },
      ],
    },
    {
      id: "lm11-is2",
      title: "Options and appreciation rights at Pinnacle",
      vignette: `<p>At the start of year 1, Pinnacle Corp grants its executives 50,000 stock options with an exercise price equal to the share price of 30. Using a Black-Scholes-Merton model with management's assumptions, the grant-date fair value is 6.00 per option. The options cliff vest after four years of service, and Pinnacle expects all of them to vest. The options are equity-settled.</p>
<p>At the same date, Pinnacle grants 10,000 stock appreciation rights to divisional managers, to be settled in cash, vesting after two years of service. The fair value of each right is 8 at the end of year 1 and 5 at the end of year 2, when the rights vest.</p>
<p>An analyst notes that management assumed a dividend yield of 3% in the option model, while Pinnacle's own history suggests 1%.</p>`,
      questions: [
        {
          q: "Compensation expense for the stock options in year 1 is closest to:",
          options: ["0", "75,000", "300,000"],
          answer: 1,
          why: "Total grant-date fair value = 50,000 x 6.00 = 300,000, recognized evenly over the four-year service period: 75,000 a year. Zero confuses fair value with intrinsic value (the options are at the money, but they still have time value); 300,000 would expense everything at grant.",
        },
        {
          q: "The effect of the year 1 option expense on Pinnacle's total shareholders' equity at the end of year 1 is:",
          options: ["A decrease of 75,000", "No change", "An increase of 75,000"],
          answer: 1,
          why: "The expense reduces net income and retained earnings by 75,000, and the credit raises paid-in capital by 75,000. For an equity-settled award, total equity does not change.",
        },
        {
          q: "If management had used the 1% dividend yield suggested by Pinnacle's history, the reported option expense would most likely have been:",
          options: ["Higher", "Lower", "Unchanged, because the grant-date value is fixed"],
          answer: 0,
          why: "A lower expected dividend yield raises the value of a call option, because option holders do not receive dividends and dividends depress the share price. A higher grant-date fair value means a higher expense. The value is fixed after the grant date, but the assumption is part of how that value was set.",
        },
        {
          q: "Compensation expense for the stock appreciation rights in year 2 is closest to:",
          options: ["10,000", "25,000", "-30,000"],
          answer: 0,
          why: "Cash-settled rights are a liability measured at current fair value for the service completed. End of year 1: 10,000 x 8 x 1/2 = 40,000. End of year 2: 10,000 x 5 x 2/2 = 50,000. Year 2 expense = 50,000 - 40,000 = 10,000. 25,000 forgets the cumulative catch-up; -30,000 ignores the service period.",
        },
      ],
    },
    {
      id: "lm11-is3",
      title: "Adjusting a US GAAP pension for analysis",
      vignette: `<p>Kestrel Ltd reports under US GAAP and includes its entire pension expense in operating expenses. For the most recent year:</p>
<table><tbody>
<tr><td>Reported operating income</td><td>900</td></tr>
<tr><td>Reported interest expense</td><td>60</td></tr>
<tr><td>Pension expense (in operating expenses)</td><td>70</td></tr>
<tr><td>of which: service cost</td><td>50</td></tr>
<tr><td>of which: interest cost</td><td>80</td></tr>
<tr><td>of which: expected return on plan assets</td><td>(60)</td></tr>
<tr><td>Actual return on plan assets</td><td>40</td></tr>
<tr><td>Employer contributions</td><td>150</td></tr>
<tr><td>Actuarial gains and losses, plan amendments</td><td>none</td></tr>
<tr><td>Tax rate</td><td>25%</td></tr>
</tbody></table>
<p>An analyst wants to treat only service cost as operating, interest cost as interest expense and the actual return on plan assets as non-operating income.</p>`,
      questions: [
        {
          q: "Kestrel's adjusted operating income is closest to:",
          options: ["850", "920", "970"],
          answer: 1,
          why: "Add back the reported pension expense and deduct only service cost: 900 + 70 - 50 = 920. Removing the whole pension expense gives 970; deducting service cost without adding back the reported expense gives 850.",
        },
        {
          q: "Kestrel's adjusted interest coverage (operating income divided by interest expense) is closest to:",
          options: ["6.6x", "15.0x", "15.3x"],
          answer: 0,
          why: "Adjusted interest expense = 60 + interest cost 80 = 140. Coverage = 920 / 140 = 6.57x. Reported coverage is 900 / 60 = 15.0x; 920 / 60 = 15.3x forgets to move the interest cost.",
        },
        {
          q: "Kestrel's adjusted pre-tax income compared with reported pre-tax income is:",
          options: ["20 lower", "The same", "20 higher"],
          answer: 0,
          why: "Reported pre-tax income = 900 - 60 = 840. Adjusted = 920 - 140 + actual return 40 = 820. The difference is the actual return (40) replacing the expected return (60): 20 lower.",
        },
        {
          q: "To reflect the economic substance of the year's contributions, the analyst would most likely:",
          options: [
            "Increase operating cash flow by 45 and decrease financing cash flow by 45",
            "Decrease operating cash flow by 45 and increase financing cash flow by 45",
            "Increase operating cash flow by 60 and decrease financing cash flow by 60",
          ],
          answer: 0,
          why: "TPPC = 50 + 80 - 40 = 90 (no actuarial items). Contributions of 150 exceed it by 60, after tax 60 x 0.75 = 45. That excess is like repaying debt, so it moves from operating to financing: CFO up 45, CFF down 45.",
        },
      ],
    },
  ],

  flags: [
    { los: "b", note: "ABO and VBO: included as US GAAP measures for completeness. Verify how much the 2026 reading says about them; it may mention them only in passing." },
    { los: "c", note: "IFRS net interest is computed here on the beginning net liability. IAS 19 strictly adjusts for contributions and benefit payments during the period; the curriculum simplification is assumed. Verify the book's wording." },
    { los: "c", note: "US GAAP presentation (ASU 2017-07: non-service components outside operating income) is labelled beyond the curriculum. Check whether the 2026 reading mentions it." },
    { los: "d", note: "Effect of a higher discount rate on interest cost is presented as ambiguous (usually higher for typical durations). Confirm the book's exact wording, which may say interest cost 'typically' falls or rises depending on plan maturity." },
    { los: "e", note: "Income statement adjustment uses the ACTUAL return as non-operating income. Some curriculum exhibits use the expected return in this reclassification; verify which the 2026 book uses in its worked example." },
    { los: "e", note: "Cash flow reclassification is shown after tax in prose and formulas but pre-tax in the scenario ledger for clarity; the scenario says so explicitly." },
    { los: "a", note: "Multi-employer plans treated as DC when information is insufficient: confirm the curriculum still includes this point." },
    { los: "h", note: "Phantom shares and the detail that cumulative cash-settled expense equals the cash paid: confirm the depth the 2026 reading gives to SARs and phantom shares." },
  ],
};
