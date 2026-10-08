/* LM13 Analysis of Financial Institutions.
   Demo cast: Harbor Bank (a mid-sized commercial bank, figures in millions),
   Granite Insurance (property and casualty), Juniper Life (life and health),
   plus Cedar Bank and Basalt Mutual in the item sets. Pinnacle Corp from LM10
   appears once, as the industrial company whose toolkit stops working. */
export default {
  id: "lm13",
  num: 13,
  title: "Analysis of Financial Institutions",
  short: "Financial institutions",
  tagline:
    "A bank's inventory is money, its raw material is borrowed, and a few percent of bad loans can wipe out its owners, so you analyse it by asking how much loss it can absorb and how long it can survive a run.",
  minutes: 200,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "different",
      title: "Why a bank breaks your usual toolkit",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>You have spent the last modules analysing Pinnacle Corp, a manufacturer. Now your credit committee hands you the annual report of Harbor Bank and asks one question: are Harbor's senior bonds safe to hold? You reach for the usual toolkit and almost every tool breaks in your hand.</p>
<p><b>Interest coverage.</b> Harbor's interest expense is not a financing cost sitting below operating profit. It is the cost of the product. Harbor buys money from depositors and sells it to borrowers, so interest expense is its cost of goods sold and interest income is its revenue. A coverage ratio of interest income over interest expense tells you about the spread, not about debt service.</p>
<p><b>Debt to equity.</b> Harbor has 884 of liabilities on 76 of equity, more than 11 times. A manufacturer at 11 times would be in a restructuring. For a bank it is normal, because most of the liabilities are deposits, which are the raw material of the business, not borrowings taken on to fund a factory. The real question is whether 76 of equity is enough to absorb the losses Harbor's particular assets might produce.</p>
<p><b>Current ratio and inventory turnover.</b> Banks do not split their balance sheets into current and non-current; they list assets and liabilities in order of liquidity. Almost all deposits are repayable on demand, so a "current ratio" would look alarming for every healthy bank in the world. And there is no inventory, unless you count the money itself.</p>
<p>So the analyst needs a different frame. It starts from what makes financial institutions different from other companies.</p>`,
        },
        {
          t: "table",
          caption: "Pinnacle Corp vs Harbor Bank",
          head: ["", "Pinnacle Corp (manufacturer)", "Harbor Bank"],
          rows: [
            ["What it sells", "Goods made from raw materials", "Money: loans priced above what deposits cost"],
            ["Main assets", "Property, plant and equipment, inventory, receivables, mostly at historical cost", "Loans and securities: financial assets at amortized cost or fair value"],
            ["Main liabilities", "Trade payables, some long-term debt", "Deposits, often repayable on demand, plus wholesale borrowing"],
            ["Equity / total assets", "Often 40% to 60%", "Harbor: 76 / 960 = 7.9%"],
            ["What kills it", "Losing customers, running out of cash", "Credit losses larger than its thin equity, or depositors leaving faster than assets can be turned into cash"],
            ["Who else gets hurt if it fails", "Suppliers, employees, lenders", "Depositors, other banks, the payment system, the wider economy"],
          ],
        },
        {
          t: "h",
          text: "What makes financial institutions different",
        },
        {
          t: "p",
          html: `<p><b>Systemic importance.</b> When a manufacturer fails, its competitors pick up its customers. When a bank fails, the damage spreads. Banks lend to each other, settle each other's payments and face each other in derivatives, so one failure can leave others with losses they cannot absorb. Worse, a failure tells depositors at other banks that their money might not be safe either, and they withdraw it even from healthy banks. That spread of distress from one institution to others is <b>contagion</b>. Because the costs fall on people who never dealt with the failed bank, governments care about bank failures in a way they do not care about a failed manufacturer.</p>
<p><b>Heavy regulation.</b> That systemic importance is why banks are among the most regulated companies in the economy, with rules on how much capital they hold, how much liquidity they keep, and what they must disclose.</p>
<p><b>Assets are mostly financial.</b> Loans and securities are claims on other people's cash flows. They are measured at amortized cost or at fair value, using the same classification rules you met in LM10. This makes a bank's balance sheet closer to economic values than a manufacturer's, but it also concentrates the risks that matter: <b>credit risk</b> (borrowers do not pay), <b>liquidity risk</b> (the bank cannot meet withdrawals without selling assets at a loss) and <b>market risk</b>, especially interest rate risk.</p>
<p><b>High leverage.</b> With equity of 7.9% of assets, a loss equal to 7.9% of Harbor's assets wipes out its owners. Spread across a loan book that is mostly sound, that only takes a bad patch in one large sector.</p>
<p><b>Funded with other people's short-term money.</b> Deposits can leave on a day's notice while mortgages run for 25 years. Taking short-term funds and lending them long is <b>maturity transformation</b>. It is the economic service banks provide, and it is the reason a loss of confidence can turn into a run that sinks an otherwise solvent bank.</p>`,
        },
        {
          t: "callout",
          tone: "insight",
          title: "The business model in one sentence",
          html: "Borrow short and cheap, lend long and dearer, keep the spread, and hold enough equity to absorb the loans that go bad and enough liquid assets to survive the depositors who leave. CAMELS (capital adequacy, asset quality, management, earnings, liquidity and sensitivity to market risk), the framework this module is built around, is a checklist for each piece of that sentence.",
        },
        {
          t: "p",
          html: `<p>Insurance companies share most of these features. Their assets are financial, they are heavily regulated and their liabilities are promises to pay. They differ in where the money comes from (policyholders pay premiums in advance rather than lending deposits) and in how fast it can leave, which is why the module treats them separately at the end.</p>`,
        },
        {
          t: "sort",
          prompt: "Your committee wants a one-page ratio summary of Harbor Bank. Tap each ratio, then tap whether it is useful for a bank or misleading.",
          buckets: [
            { id: "use", label: "Useful for a bank" },
            { id: "mis", label: "Misleading for a bank" },
          ],
          items: [
            { text: "Interest coverage (operating profit / interest expense)", bucket: "mis", why: "Interest expense is the bank's cost of goods sold, not a financing charge, so coverage says nothing about solvency." },
            { text: "Net interest margin", bucket: "use", why: "Net interest income over earning assets is the core profitability measure of a lender." },
            { text: "Current ratio", bucket: "mis", why: "Bank balance sheets are not classified into current and non-current, and demand deposits would make every bank look illiquid." },
            { text: "Common equity Tier 1 ratio", bucket: "use", why: "Equity against risk-weighted assets is the regulatory measure of loss-absorbing capacity." },
            { text: "Inventory turnover", bucket: "mis", why: "A bank has no inventory in the usual sense." },
            { text: "Allowance for loan losses / non-performing loans", bucket: "use", why: "It measures how much of the problem loan book is already provided for." },
            { text: "EBITDA (earnings before interest, taxes, depreciation and amortization) margin", bucket: "mis", why: "Depreciation is trivial for a bank and interest is operating, so adding interest back mixes up revenue and financing." },
            { text: "Liquidity coverage ratio", bucket: "use", why: "It tests whether liquid assets cover 30 days of stressed outflows, the risk that actually kills banks." },
          ],
        },
        {
          t: "check",
          id: "lm13-diff-1",
          q: "Which feature most directly explains why governments regulate banks more heavily than manufacturers?",
          options: [
            "Banks report most of their assets at fair value",
            "A bank failure can spread losses and panic to other institutions and to the economy",
            "Banks pay lower income tax rates",
          ],
          answer: 1,
          why: "Systemic importance and contagion mean the costs of a bank failure fall on parties outside the bank, which is the core justification for regulation. Fair value measurement is a feature, not a reason to regulate.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "regulation",
      title: "Regulation: who sets the rules and what they demand",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Ask who loses if Harbor fails. Its shareholders lose their 76, but they also had all the upside, and limited liability caps their downside at zero. Most depositors are covered by <b>deposit insurance</b> up to a limit, so they have little reason to check whether Harbor is lending wisely. The deposit insurer, and behind it the taxpayer, ends up holding the risk.</p>
<p>That combination creates a bad incentive. Owners with a thin slice of equity gain from risky bets if they pay off and pass the losses to the insurer if they do not, and insured depositors no longer police them by moving their money. Economists call that <b>moral hazard</b>. Regulation steps in where market discipline has been switched off: it forces owners to put up enough of their own capital to absorb losses first, and to hold enough liquid assets to survive a run without a rescue.</p>`,
        },
        {
          t: "table",
          caption: "The international bodies the curriculum names",
          head: ["Body", "Role"],
          rows: [
            ["Basel Committee on Banking Supervision", "A committee of the Bank for International Settlements whose members are central banks and bank supervisors from around the world. It sets global standards for bank regulation. Its current framework, Basel III, sets minimum capital, minimum liquidity and stable funding requirements. National regulators turn the standards into local law."],
            ["Financial Stability Board (FSB)", "Monitors the global financial system, coordinates national authorities and standard setters, and identifies systemically important financial institutions, which face extra requirements."],
            ["International Association of Deposit Insurers", "Sets standards for deposit insurance systems (its Core Principles for Effective Deposit Insurance Systems) and is the forum where deposit insurers cooperate."],
            ["International Association of Insurance Supervisors", "Sets standards for insurance supervision, the insurer counterpart of the Basel Committee."],
            ["International Organization of Securities Commissions", "The forum for national regulators of securities and futures markets; sets standards for securities regulation, which covers broker-dealers, exchanges and market conduct."],
          ],
          note: "Banks are then supervised day to day by national authorities, typically the central bank and one or more prudential regulators. Supervision aimed at keeping the institution safe and solvent, rather than at protecting customers in individual transactions, is called prudential supervision.",
        },
        {
          t: "h",
          text: "Basel III in three requirements",
        },
        {
          t: "compare",
          items: [
            {
              title: "Minimum capital",
              tone: "accent",
              points: [
                "Capital measured against <b>risk-weighted assets</b> (RWA), so riskier assets need more equity behind them",
                "Common equity Tier 1 (CET1) at least 4.5% of RWA",
                "Tier 1 capital at least 6% of RWA",
                "Total capital (Tier 1 + Tier 2) at least 8% of RWA",
                "Plus buffers on top of the minimums (next section)",
              ],
            },
            {
              title: "Minimum liquidity",
              tone: "cyan",
              points: [
                "<b>Liquidity coverage ratio</b> (LCR): high-quality liquid assets at least equal to expected net cash outflows over 30 days of stress",
                "Answers: can the bank survive a month-long run without help?",
              ],
            },
            {
              title: "Stable funding",
              tone: "purple",
              points: [
                "<b>Net stable funding ratio</b> (NSFR): available stable funding at least equal to required stable funding over one year",
                "Answers: are long-lived, illiquid assets funded with money that will still be there next year?",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Regulatory capital is not an accounting number",
          html: "Basel III starts from equity as reported under International Financial Reporting Standards (IFRS) or US generally accepted accounting principles (US GAAP) and then adjusts it: goodwill and other intangibles are deducted because they cannot be sold to pay depositors in a crisis, and so are certain deferred tax assets, which are only worth something if the bank earns future profits. Two banks with identical reported equity can have very different regulatory capital.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum: the surcharge for systemic banks",
          html: "Banks on the Financial Stability Board's list of <b>global systemically important banks</b> (G-SIBs) carry an extra capital surcharge on top of the Basel minimums. The logic follows directly from contagion: the bigger and more connected the bank, the greater the damage if it fails, so the higher the cushion society demands. The surcharge and its size are background, not testable figures.",
        },
        {
          t: "check",
          id: "lm13-reg-1",
          q: "Why does deposit insurance make capital requirements more necessary, not less?",
          options: [
            "Insured depositors have little reason to monitor the bank, so owners can take risks with a thin equity cushion unless a regulator requires more",
            "Deposit insurers are funded by bank capital, so capital must be high enough to pay the premiums",
            "Deposit insurance converts deposits into equity, which must be counted against the minimum",
          ],
          answer: 0,
          why: "Insurance removes depositors' incentive to discipline risk-taking (moral hazard). Minimum capital forces owners to bear losses first, restoring some of the discipline the market no longer provides.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "capital",
      title: "C: capital adequacy, the loss-absorbing cushion",
      los: ["b", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>Regulators and analysts use the <b>CAMELS</b> framework to organise a bank analysis: <b>C</b>apital adequacy, <b>A</b>sset quality, <b>M</b>anagement capabilities, <b>E</b>arnings, <b>L</b>iquidity position and <b>S</b>ensitivity to market risk. Each component is rated on a scale of 1 (best) to 5 (worst), and the component ratings feed a composite rating. Supervisors do not make their CAMELS ratings public, so analysts borrow the structure for their own assessment from published statements and disclosures.</p>
<p>Start with capital. Harbor has 76 of equity behind 960 of assets. Is that enough? It depends on what the assets are. 180 of Harbor's assets are cash and government bonds, which will almost certainly be worth what the balance sheet says. 210 are commercial real estate loans, which can lose a large share of their value in a downturn. A plain equity-to-assets ratio treats a unit of each as equally risky, which is exactly what it should not do.</p>
<p>So Basel III weights each asset by its risk before comparing it with capital. Cash carries a 0% weight, so it needs no capital. A typical corporate loan carries 100%, so every 100 of such loans needs at least 8 of total capital behind it. Charges for market risk and operational risk are added on top. The total is <b>risk-weighted assets</b> (RWA).</p>`,
        },
        {
          t: "table",
          caption: "Harbor Bank, year 2: building risk-weighted assets (weights illustrative)",
          head: ["Asset", "Amount", "Risk weight", "Risk-weighted"],
          rows: [
            ["Cash and central bank reserves", "60", "0%", "0"],
            ["Government bonds", "120", "0%", "0"],
            ["Other securities (Level 2 and 3)", "120", "50%", "60"],
            ["Residential mortgages", "250", "40%", "100"],
            ["Commercial real estate loans", "210", "100%", "210"],
            ["Corporate and consumer loans", "180", "100%", "180"],
            ["Other assets", "36", "100%", "36"],
            ["Credit risk-weighted assets", "", "", "586"],
            ["Add: market risk and operational risk charges", "", "", "54"],
            ["<b>Total risk-weighted assets</b>", "", "", "<b>640</b>"],
          ],
          note: "Basel III sets weights by asset class and by the approach the bank is approved to use. The weights here are chosen to show the mechanics, not quoted from the rules.",
        },
        {
          t: "h",
          text: "Three layers of capital",
        },
        {
          t: "p",
          html: `<p>Not all capital absorbs losses equally well, so Basel III sorts it into tiers by how reliably it can take a hit.</p>
<p><b>Common equity Tier 1 (CET1)</b> is the purest loss absorber: common shares and the surplus paid in above their par value, retained earnings and accumulated other comprehensive income (AOCI), less regulatory deductions such as goodwill, other intangible assets and certain deferred tax assets. A loss reduces it automatically while the bank keeps operating.</p>
<p><b>Additional Tier 1 capital</b> (AT1) covers other instruments that also absorb losses while the bank is a going concern: they rank below depositors, general creditors and even the bank's subordinated debt, have no fixed maturity, carry no obligation to pay dividends or coupons, and give the bank no incentive to redeem them. Each condition keeps the money in place and loss-absorbing while the bank is still trading. Certain non-cumulative perpetual preferred shares qualify.</p>
<p><b>Tier 2 capital</b> covers instruments that protect depositors only once the bank has failed: they are subordinated to depositors and general creditors and have an original maturity of at least five years. Subordinated debt is the classic example, and certain loan loss allowances also count.</p>`,
        },
        {
          t: "formula",
          name: "The three Basel III capital ratios",
          tex: "\\text{CET1 ratio} = \\frac{\\text{CET1}}{\\text{RWA}} \\ge 4.5\\%;\\quad \\text{Tier 1 ratio} = \\frac{\\text{CET1} + \\text{AT1}}{\\text{RWA}} \\ge 6\\%;\\quad \\text{Total capital ratio} = \\frac{\\text{Tier 1} + \\text{Tier 2}}{\\text{RWA}} \\ge 8\\%",
          plain: "Each layer of capital, cumulatively, against the same risk-weighted assets. The minimums rise as weaker forms of capital are allowed into the numerator.",
        },
        {
          t: "table",
          caption: "Harbor Bank, year 2: capital ratios",
          head: ["", "Amount", "Ratio (/ RWA of 640)", "Minimum"],
          rows: [
            ["Common equity (shares, retained earnings, AOCI)", "70", "", ""],
            ["Less: goodwill and intangibles", "(6)", "", ""],
            ["<b>CET1</b>", "64", "10.00%", "4.5% (7.0% with the conservation buffer)"],
            ["Add: preferred shares qualifying as Additional Tier 1", "6", "", ""],
            ["<b>Tier 1</b>", "70", "10.94%", "6.0%"],
            ["Add: subordinated debt (Tier 2)", "12", "", ""],
            ["<b>Total capital</b>", "82", "12.81%", "8.0%"],
          ],
        },
        {
          t: "p",
          html: `<p>On top of the minimums, Basel III adds a <b>capital conservation buffer</b> of 2.5% of RWA, held in CET1. Including it, a bank needs 7% CET1 (4.5% + 2.5%) and 10.5% total capital (8% + 2.5%) to be free of restrictions. A bank that dips into the buffer is not shut down, but its dividends, share buybacks and bonuses are restricted until it rebuilds: the buffer is designed to be used in a downturn, with the payout restrictions forcing capital to be rebuilt afterwards.</p>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "Which capital figures to know",
          html: "The 4.5% CET1, 6% Tier 1 and 8% total capital minimums are core. Also recognize the conservation buffer figures: 2.5% of RWA in CET1, giving 7% CET1 and 10.5% total capital including the buffer. Notes for the 2026 reading cite 10.5% as the Basel III total, so a vignette may use it.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "A high ratio can come from low risk weights",
          html: "A CET1 ratio is only as good as its denominator. A bank that shifts into assets with low risk weights, or whose internal models assign low weights, reports a strong ratio with a thin equity cushion. That is why analysts also look at plain equity (or Tier 1 capital) against total assets, a <b>leverage ratio</b>, as a backstop that no risk weight can flatter. Harbor's is 70 / 960 = 7.3%.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum: other buffers and the leverage minimum",
          html: "Basel III also lets national regulators switch on a <b>countercyclical buffer</b> of up to 2.5% of RWA when credit is growing too fast, adds the G-SIB surcharge for the largest banks, and sets a minimum leverage ratio (Tier 1 capital over total exposure) of 3%. These figures are beyond the 2026 curriculum: know that they exist, but do not treat them as testable. The leverage ratio as an analyst's backstop to risk-weighted ratios, shown above, is the idea to keep.",
        },
        {
          t: "check",
          id: "lm13-cap-1",
          q: "A bank has common equity of 50, of which 5 is goodwill, qualifying preferred shares of 4, subordinated debt of 6 (eight-year original maturity) and RWA of 500. Its Tier 1 ratio is closest to:",
          options: ["9.8%", "10.8%", "9.0%"],
          answer: 0,
          why: "CET1 = 50 - 5 = 45. Tier 1 = 45 + 4 = 49, and 49 / 500 = 9.8%. Forgetting the goodwill deduction gives 54 / 500 = 10.8%; 9.0% is CET1 alone. The subordinated debt is Tier 2 and only enters the total capital ratio.",
        },
        {
          t: "check",
          id: "lm13-cap-2",
          q: "A bank shifts 100 from corporate loans (100% risk weight) into government bonds (0% risk weight). With capital unchanged, its CET1 ratio and its leverage ratio will most likely:",
          options: [
            "Both rise",
            "CET1 ratio rises, leverage ratio is unchanged",
            "CET1 ratio is unchanged, leverage ratio rises",
          ],
          answer: 1,
          why: "RWA falls by 100 so the CET1 ratio rises. Total assets are unchanged (one asset swapped for another), so equity or Tier 1 over total assets does not move.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "asset-quality",
      title: "A: asset quality, what the loans and securities are really worth",
      los: ["c"],
      blocks: [
        {
          t: "p",
          html: `<p>Capital is a cushion against losses on assets, so the next question is how many losses are coming. Harbor reports 640 of loans and 240 of securities. Some borrowers will not pay, and some securities are valued with models nobody outside the bank can check. Asset quality asks how good the assets are, how honestly their losses have been provided for, and how concentrated they are.</p>`,
        },
        {
          t: "h",
          text: "Securities: measurement category and the fair value hierarchy",
        },
        {
          t: "p",
          html: `<p>Securities follow the classification rules from LM10: amortized cost, fair value through other comprehensive income (FVOCI) or fair value through profit or loss (FVPL), with US GAAP calling the debt categories held-to-maturity, available-for-sale and trading. For a bank the category decides whether a fall in value hits the balance sheet at all, which the sensitivity section shows with a rate shock.</p>
<p>For securities at fair value, the next question is how reliable that fair value is. The <b>fair value hierarchy</b> sorts measurements by the inputs used. <b>Level 1</b>: quoted prices in active markets for identical assets (a listed government bond). <b>Level 2</b>: observable inputs other than Level 1 quotes, such as prices of similar assets or observable yield curves (most corporate bonds). <b>Level 3</b>: unobservable inputs, meaning the bank's own model and assumptions (illiquid structured products, private loans). Level 3 values are the hardest to verify and the easiest to manage, so analysts compare Level 3 assets with equity. Harbor's rose from 4 (5.7% of equity) to 10 (13.2%) in year 2.</p>`,
        },
        {
          t: "h",
          text: "Loans: the allowance for loan losses",
        },
        {
          t: "p",
          html: `<p>Loans are held at amortized cost, so their value on the balance sheet depends on one estimate: the <b>allowance for loan losses</b>, the bank's estimate of the credit losses embedded in the book. It sits under gross loans as a negative number (a contra asset). Gross loans less the allowance gives net loans.</p>
<p>The allowance moves through four flows. The <b>provision for loan losses</b> (or provision for credit losses) is the expense that builds it. A <b>charge-off</b> (write-off) removes a loan the bank has given up on, using up the allowance. A <b>recovery</b> on a loan already written off refills it. Charge-offs less recoveries are <b>net charge-offs</b>. The theater shows why only the provision touches profit.</p>`,
        },
        { t: "theater", scenario: "lm13-bank-credit-loss" },
        {
          t: "formula",
          name: "Allowance roll-forward",
          tex: "\\text{Allowance}_{end} = \\text{Allowance}_{beg} + \\text{Provision} - \\text{Charge-offs} + \\text{Recoveries}",
          plain: "The provision is the only flow that touches profit. Charge-offs and recoveries move the allowance and the loans against each other or against cash. In the theater's year: 16 + 6 - 5 + 1 = 18.",
        },
        {
          t: "callout",
          tone: "exam",
          title: "Recoveries: the same answer either way",
          html: "The roll-forward above credits recoveries back to the allowance, the common US practice. Banks reporting under IFRS commonly present them in profit as a reduction of the impairment charge instead. The ratios do not change with the presentation: net charge-offs = charge-offs - recoveries, and provision / net charge-offs is read the same way (above 1 the allowance is being built, below 1 it is being released into profit).",
        },
        {
          t: "table",
          caption: "Asset quality ratios, with Harbor Bank year 1 and year 2",
          head: ["Ratio", "What it tells you", "Year 1", "Year 2"],
          rows: [
            ["Non-performing loans (NPLs) / gross loans", "How much of the book has stopped paying (typically 90 days past due or judged unlikely to pay)", "11 / 560 = 1.96%", "20 / 640 = 3.13%"],
            ["Allowance / gross loans", "How much of the whole book is provided for", "15 / 560 = 2.68%", "16 / 640 = 2.50%"],
            ["Allowance / NPLs (coverage)", "How much of the problem loans is already provided for", "15 / 11 = 136%", "16 / 20 = 80%"],
            ["Allowance / net charge-offs", "How many years of current write-offs the allowance covers", "15 / 3 = 5.0x", "16 / 5 = 3.2x"],
            ["Provision / net charge-offs", "Above 1: building the allowance. Below 1: releasing it into profit", "3 / 3 = 1.0x", "6 / 5 = 1.2x"],
            ["Net charge-offs / gross loans", "Realized credit loss rate", "3 / 560 = 0.54%", "5 / 640 = 0.78%"],
            ["Commercial real estate / gross loans", "Concentration in one cyclical sector", "140 / 560 = 25.0%", "210 / 640 = 32.8%"],
          ],
          note: "Year-end balances are used to keep the arithmetic visible; averages are common for flow-based ratios such as net charge-offs to loans.",
        },
        {
          t: "callout",
          tone: "example",
          title: "Reading Harbor's numbers",
          html: "Harbor provided more than it charged off in year 2 (1.2x), which looks prudent. But non-performing loans almost doubled while the allowance rose by only 1, so coverage fell from 136% to 80%. The provision kept pace with this year's write-offs, not with the stock of problem loans building up behind them. Add a loan book that grew 14% with commercial real estate rising to a third of it, and the asset quality trend is clearly negative.",
        },
        {
          t: "h",
          text: "Expected credit losses: IFRS 9 and CECL (beyond the curriculum)",
        },
        {
          t: "p",
          html: `<p>Under the old incurred loss models, a bank could only provide for a loss once there was evidence it had happened. Allowances therefore built up late, after a downturn had started, which is when banks could least afford the hit. Both standard setters replaced that with forward-looking models that require banks to provide for losses they EXPECT, but they did it differently.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "IFRS 9: expected credit loss in three stages",
              tone: "accent",
              points: [
                "Stage 1, performing loans: allowance = <b>12-month</b> expected credit losses",
                "Stage 2, significant increase in credit risk since origination: <b>lifetime</b> expected credit losses",
                "Stage 3, credit-impaired: lifetime expected losses, and interest income on the net carrying amount",
                "A loan sliding from stage 1 to stage 2 triggers a jump in the allowance",
              ],
            },
            {
              title: "US GAAP: current expected credit loss (CECL)",
              tone: "purple",
              points: [
                "One model: <b>lifetime</b> expected credit losses for every loan at amortized cost, from the day it is made",
                "No staging, so no cliff when credit quality slips",
                "Larger allowances at origination than IFRS 9 for the same performing loan",
                "A fast-growing lender books a big provision up front for every new loan",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum: staging and CECL",
          html: "The IFRS 9 stages and the CECL model above come from the standards themselves and are background for why allowances jump when credit slips. The 2026 reading's examinable asset quality tools are the ratios in the table earlier in this section: allowance / non-performing loans, allowance / gross loans, provision / net charge-offs, net charge-offs / gross loans and non-performing loans / gross loans, read together to judge whether the allowance is adequate for expected losses.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "A high allowance can be prudence or a cookie jar",
          html: "Because the provision is an estimate, a bank can over-provide in a good year (lower profit now) and release the excess in a bad year (higher profit then), smoothing earnings. A large allowance is reassuring only if the non-performing loans justify it. A provision below net charge-offs while non-performing loans are rising is the opposite red flag: the bank is running down its cushion to prop up current profit.",
        },
        {
          t: "tree",
          title: "Is this allowance movement conservative, a release, or a warning?",
          root: "build",
          nodes: {
            build: {
              q: "Is the provision for the year larger than net charge-offs?",
              help: "Above 1x the allowance is being built up; below 1x it is being released into profit.",
              options: [{ label: "Yes, the allowance is growing", next: "nplUp" }, { label: "No, the allowance is shrinking", next: "nplDown" }],
            },
            nplUp: {
              q: "Are non-performing loans growing at least as fast as the allowance?",
              options: [{ label: "Yes", next: "needed" }, { label: "No, credit quality is stable or improving", next: "smooth" }],
            },
            smooth: {
              q: "Is coverage already well above peers, or is the bank having an unusually strong year?",
              options: [{ label: "Yes", next: "jar" }, { label: "No", next: "prudent" }],
            },
            nplDown: {
              q: "Are non-performing loans falling?",
              options: [{ label: "Yes", next: "release" }, { label: "No, they are flat or rising", next: "red" }],
            },
            needed: { result: "Building, and needed", tone: "amber", html: "The provision is catching up with real deterioration. Check that coverage of non-performing loans is not still falling, as Harbor's is." },
            prudent: { result: "Prudent build", tone: "green", html: "A modest build with stable credit and ordinary earnings looks like conservative estimating." },
            jar: { result: "Possible cookie jar", tone: "amber", html: "Over-providing in a strong year creates a reserve that can be released later to smooth profit. Look for releases in weaker years." },
            release: { result: "Release justified by improving credit", tone: "cyan", html: "Fewer problem loans need less allowance. The profit boost is real but not recurring: strip it out when forecasting." },
            red: { result: "Red flag: cushion run down while credit worsens", tone: "red", html: "Releasing the allowance while problem loans rise inflates current earnings at the expense of future ones." },
          },
        },
        {
          t: "check",
          id: "lm13-aq-1",
          q: "A bank's allowance was 40 at the start of the year. It charged off 18, recovered 3 and ended the year with an allowance of 45. The provision for credit losses for the year was:",
          options: ["20", "23", "5"],
          answer: 0,
          why: "45 = 40 + provision - 18 + 3, so provision = 45 - 40 + 18 - 3 = 20. Using gross charge-offs without the recovery gives 23; the 5 change in the allowance ignores the flows that used and refilled it.",
        },
        {
          t: "check",
          id: "lm13-aq-2",
          q: "A large loan that was fully provided for last year is charged off this year. This year's net income is:",
          options: ["Reduced by the amount charged off", "Unaffected", "Increased, because the allowance is released"],
          answer: 1,
          why: "The loss was expensed through last year's provision. The charge-off removes the loan and the matching allowance; net loans and profit do not change.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "management-earnings",
      title: "M and E: management capabilities and earnings",
      los: ["c"],
      blocks: [
        {
          t: "h",
          text: "M: management capabilities, the letter without a ratio",
        },
        {
          t: "p",
          html: `<p>Two banks with the same capital and the same loans can end up in different places because one is run by people who see risks coming and the other by people paid to grow the loan book. Management capability is the ability to find profitable opportunities while keeping the risks under control, and it is judged, not computed.</p>`,
        },
        {
          t: "table",
          caption: "What the analyst looks for",
          head: ["Area", "Evidence"],
          rows: [
            ["Corporate governance", "Independent and competent board, a board risk committee, clear accountability, incentive pay that does not reward short-term volume over long-term risk"],
            ["Risk management", "A framework that identifies, measures, monitors and limits credit, liquidity, market and operational risk; risk limits that are actually enforced"],
            ["Internal controls and compliance", "Clean audit opinions, no history of regulatory sanctions, fines or enforcement actions, effective anti-money-laundering controls"],
            ["Related-party transactions", "Loans to directors, officers or their companies on terms ordinary customers would not get are a classic sign of weak governance"],
            ["Track record", "Did management deliver past plans? Did it see the last downturn coming in its provisioning?"],
          ],
        },
        {
          t: "h",
          text: "E: earnings, and whether they will last",
        },
        {
          t: "p",
          html: `<p>Harbor earned net income of 10.5 in both years. A quick reader stops there. An analyst asks where the 10.5 came from each year and whether it will recur, because a bank's profit is built from very different streams, and two of the largest inputs are estimates.</p>`,
        },
        {
          t: "table",
          caption: "Harbor Bank income statement",
          head: ["", "Year 1", "Year 2", "Share of revenue, year 2"],
          rows: [
            ["Interest income", "40", "48", ""],
            ["Interest expense", "(12)", "(18)", ""],
            ["<b>Net interest income</b>", "28", "30", "68.2%"],
            ["Fee and commission income", "10", "10", "22.7%"],
            ["Trading income", "1", "4", "9.1%"],
            ["<b>Total revenue</b>", "39", "44", "100%"],
            ["Operating expenses", "(22)", "(24)", ""],
            ["Provision for loan losses", "(3)", "(6)", ""],
            ["Pre-tax income", "14", "14", ""],
            ["Income tax (25%)", "(3.5)", "(3.5)", ""],
            ["<b>Net income</b>", "10.5", "10.5", ""],
          ],
        },
        {
          t: "p",
          html: `<p><b>Net interest income</b> is the core of a lender and recurs as long as the loan book does, but it moves with interest rates and with what depositors demand. <b>Fees and commissions</b> (payments, account services, asset management) are the most stable stream and need little capital. <b>Trading income</b> is the most volatile and least sustainable: it depends on markets and can reverse next year. Harbor's trading income quadrupled to 9.1% of revenue while net income stayed flat, so year 2 earnings are of lower quality than year 1's.</p>
<p>The other test is the estimates behind the numbers. Bank earnings rest on the loan loss provision, the fair values of Level 3 assets, impairments, and the valuation allowance on deferred tax assets. Each is a judgment, and each can move profit with no change in cash. Earnings that depend on a falling provision or on rising Level 3 gains deserve a discount.</p>`,
        },
        {
          t: "formula",
          name: "Net interest margin (NIM)",
          tex: "\\text{NIM} = \\frac{\\text{Net interest income}}{\\text{Average interest-earning assets}}",
          plain: "The spread a lender earns on the assets that earn interest. Harbor, year-end basis: 28 / 864 = 3.24% in year 1 and 30 / 940 = 3.19% in year 2. Faster loan growth bought slightly lower margins, because deposit and wholesale funding costs rose faster than loan yields.",
        },
        {
          t: "formula",
          name: "Return on equity as return on assets times leverage",
          tex: "\\text{ROE} = \\frac{\\text{NI}}{\\text{Equity}} = \\frac{\\text{NI}}{\\text{Assets}} \\times \\frac{\\text{Assets}}{\\text{Equity}}",
          plain: "Harbor, year 2: return on assets (ROA) 10.5 / 960 = 1.09% times leverage of 960 / 76 = 12.6 gives return on equity (ROE) of 13.8%. A bank can raise ROE by taking more leverage, which is why ROE is never read without the capital ratios next to it.",
        },
        {
          t: "table",
          caption: "Harbor Bank earnings ratios",
          head: ["Ratio", "Year 1", "Year 2", "Direction"],
          rows: [
            ["ROA (NI / total assets)", "1.19%", "1.09%", "Down"],
            ["ROE (NI / equity)", "15.0%", "13.8%", "Down"],
            ["Net interest margin", "3.24%", "3.19%", "Slightly down"],
            ["Efficiency ratio (operating expenses / revenue)", "56.4%", "54.5%", "Better (lower)"],
            ["Trading income / revenue", "2.6%", "9.1%", "Riskier mix"],
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "Earnings propped up by the allowance",
          html: "If Harbor had kept its year 1 coverage of 136% of non-performing loans, its year 2 allowance would have been 1.3636 x 20 = 27.3, not 16. The extra provision of 11.3 would have cut pre-tax income from 14 to 2.7 and net income from 10.5 to about 2.0 (after the 25% tax shield). Flat earnings were partly bought by letting coverage slide.",
        },
        {
          t: "check",
          id: "lm13-earn-1",
          q: "Two banks earn the same net income. Which composition is most likely to be the more sustainable?",
          options: [
            "70% net interest income and fees, 30% trading gains",
            "95% net interest income and fees, 5% trading gains",
            "60% net interest income and fees, 40% gains on Level 3 securities",
          ],
          answer: 1,
          why: "Net interest income and fees recur; trading gains and Level 3 valuation gains are volatile and harder to verify. The mix with the least reliance on them is the most sustainable.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "liquidity-sensitivity",
      title: "L and S: liquidity and sensitivity to market risk",
      los: ["c"],
      blocks: [
        {
          t: "h",
          text: "L: liquidity, surviving the depositors who leave",
        },
        {
          t: "p",
          html: `<p>Harbor can be well capitalised and still fail in a week. Its assets are mostly loans that cannot be sold quickly at full value; its deposits can be withdrawn on a phone app in seconds. If depositors lose confidence, Harbor must pay them from cash and assets it can sell or pledge immediately. Run out of those and it must dump loans and bonds at fire-sale prices, and the losses then eat into capital. Liquidity problems become solvency problems.</p>
<p>Basel III tests survival twice: over a 30-day stress with one ratio, and over a full year with another.</p>`,
        },
        {
          t: "formula",
          name: "Liquidity coverage ratio (LCR)",
          tex: "\\text{LCR} = \\frac{\\text{High-quality liquid assets}}{\\text{Expected net cash outflows over 30 days of stress}} \\ge 100\\%",
          plain: "Can the bank survive a month-long run on its own? High-quality liquid assets (HQLA) are cash, central bank reserves and assets that can be sold quickly with little loss, such as government bonds. Outflows apply regulatory run-off rates to each funding source: stable insured retail deposits run off slowly, short-term wholesale funding from other financial institutions runs off fast.",
        },
        {
          t: "formula",
          name: "Net stable funding ratio (NSFR)",
          tex: "\\text{NSFR} = \\frac{\\text{Available stable funding}}{\\text{Required stable funding}} \\ge 100\\%",
          plain: "Are long-term, illiquid assets funded with money that will still be there in a year? Funding sources get weights by stability (equity and long-term debt count in full, stable deposits high, short-term wholesale funding low); assets get weights by how much stable funding they need (cash none, loans most). The exact Basel weights are not needed; the weights in the Harbor example are illustrative.",
        },
        {
          t: "table",
          caption: "Harbor Bank liquidity",
          head: ["", "Year 1", "Year 2"],
          rows: [
            ["High-quality liquid assets (cash + government bonds)", "70 + 140 = 210", "60 + 120 = 180"],
            ["Stressed 30-day outflows (illustrative: 10% of deposits + 60% of short-term wholesale funding)", "69 + 24 = 93", "72 + 48 = 120"],
            ["<b>LCR</b>", "226%", "150%"],
            ["Available stable funding (illustrative: 90% of deposits + long-term debt + equity)", "773", "808"],
            ["Required stable funding (illustrative: 5% government bonds, 50% other securities, 85% loans, 100% other assets)", "563", "646"],
            ["<b>NSFR</b>", "137%", "125%"],
            ["Loans / deposits", "81.2%", "88.9%"],
            ["Short-term wholesale funding / total liabilities", "4.9%", "9.0%"],
          ],
          note: "Run-off rates and funding weights are simplified, illustrative versions of the Basel factors, chosen so the arithmetic can be followed.",
        },
        {
          t: "p",
          html: `<p>Both ratios still clear 100% comfortably, but the trend matters. Harbor funded its loan growth by doubling short-term wholesale borrowing from other institutions, the money that leaves first in a crisis, and by running down its liquid assets. The LCR fell from 226% to 150% in a year.</p>
<p>Two further liquidity ideas matter alongside the ratios. The <b>contractual maturity mismatch</b> compares when assets mature with when liabilities fall due: the wider the gap, the more the bank depends on rolling its funding over. The <b>concentration of funding</b> measures reliance on a few large depositors, products or markets, any one of which can leave at once.</p>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "What is core in liquidity",
          html: "Core: the LCR and the NSFR, each with a 100% minimum, and the ideas of funding concentration and maturity mismatch. Every run-off rate and funding weight in the Harbor table is illustrative, chosen so the arithmetic can be followed, and is not a figure to memorise.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum: the rest of the Basel monitoring list",
          html: "Basel III's list of supervisory monitoring tools also includes <b>available unencumbered assets</b> (assets not already pledged that could be used as collateral), the <b>LCR by significant currency</b> (a bank can be liquid in euros and short of dollars) and <b>market-related monitoring tools</b> such as the bank's own funding spreads and share price. They are useful where a bank discloses them, but treat them as background rather than core.",
        },
        {
          t: "h",
          text: "S: sensitivity to market risk",
        },
        {
          t: "p",
          html: `<p>Market risk is the risk that changes in interest rates, exchange rates, equity prices or commodity prices reduce earnings or capital. For a commercial bank the largest is usually interest rate risk in the banking book, which comes from funding long-term fixed-rate assets with short-term liabilities that reprice sooner.</p>
<p>Harbor's assets that reprice within a year total 400 and its liabilities that reprice within a year total 500. The difference, -100, is its one-year <b>repricing gap</b>. It is liability-sensitive: when rates rise, its funding costs rise on 500 while its asset yields rise on only 400, so net interest income falls by about 100 x 1% = 1.0 for each percentage point. A longer-horizon measure looks at the <b>economic value of equity</b>, the present value of assets less the present value of liabilities: when asset duration exceeds liability duration, a rate rise cuts the value of the assets more than the value of the liabilities.</p>
<p>Banks disclose market risk in two main forms. <b>Value at risk</b> (VaR) estimates the loss on the trading book that will not be exceeded at a given confidence level over a short horizon; Harbor's rose from 0.6 to 1.5 as trading grew. <b>Sensitivity analysis</b> shows the effect of rate shocks (for example +/- 100 basis points) on net interest income and on economic value. The theater shows what an unhedged duration mismatch looks like when the shock actually arrives.</p>`,
        },
        { t: "theater", scenario: "lm13-bank-rate-shock" },
        {
          t: "callout",
          tone: "trap",
          title: "Amortized cost does not mean no interest rate risk",
          html: "Bonds held at amortized cost lose economic value when rates rise exactly like bonds at fair value. The accounting simply does not show it on the balance sheet until the bonds are sold or impaired. Read the fair value note, and if the bank might be forced to sell, adjust equity for the unrecognized loss.",
        },
        {
          t: "check",
          id: "lm13-ls-1",
          q: "A bank's LCR falls from 180% to 120% in one quarter. The most likely cause is:",
          options: [
            "Replacing maturing long-term debt with overnight wholesale borrowing",
            "Issuing new common shares and holding the proceeds in cash",
            "A rise in the allowance for loan losses",
          ],
          answer: 0,
          why: "Overnight wholesale funding carries a high 30-day run-off rate, so expected outflows, the LCR denominator, jump. The NSFR falls too, because long-term debt counts in full as available stable funding and overnight wholesale money counts for little or nothing. Issuing shares for cash would raise both ratios, and the allowance for loan losses does not enter the LCR.",
        },
        {
          t: "check",
          id: "lm13-ls-2",
          q: "A bank has rate-sensitive assets of 300 and rate-sensitive liabilities of 450 within one year. If rates rise by 2 percentage points, its net interest income over the year will most likely:",
          options: ["Fall by about 3", "Rise by about 3", "Fall by about 9"],
          answer: 0,
          why: "Gap = 300 - 450 = -150. Change in net interest income is about -150 x 2% = -3. The bank is liability-sensitive, so rising rates hurt.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "beyond-camels",
      title: "What CAMELS leaves out",
      los: ["c", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>CAMELS looks at the bank on its own, through ratios. Its limitations are the things that framing misses: forces outside the bank's balance sheet, things no ratio measures, and items that never reach the balance sheet at all. The curriculum sorts them into factors specific to banks and factors that matter for any company.</p>`,
        },
        {
          t: "table",
          caption: "Bank-specific factors CAMELS does not capture",
          head: ["Factor", "Why it matters"],
          rows: [
            ["Government support", "A systemically important bank is more likely to be rescued, which protects its creditors (and its bond ratings) even if its CAMELS ratios are weak. Support for creditors does not mean support for shareholders, who are often wiped out in a rescue."],
            ["Government ownership", "A state-owned or partly state-owned bank may enjoy implicit backing and cheaper funding, but may also be steered toward policy lending that lowers profitability."],
            ["Mission of the institution", "Credit unions, cooperative banks and development banks are not set up to maximise profit. A low ROE can be the mission working, not a warning sign; compare them with their own kind."],
            ["Corporate culture", "Risk appetite and incentives drive behaviour before it shows up in ratios. A culture of aggressive sales targets or tolerance of rule-bending is a leading indicator of future losses and fines."],
          ],
        },
        {
          t: "table",
          caption: "Factors relevant to any company, and how they look at a bank",
          head: ["Factor", "At a bank"],
          rows: [
            ["Competitive environment", "Competition for deposits and loans squeezes margins; new entrants and technology firms can take fee business"],
            ["Off-balance-sheet items", "Loan commitments, guarantees, letters of credit, derivatives and structured vehicles can create exposures that do not appear on the balance sheet until they are drawn or consolidated"],
            ["Segment information", "Retail banking, corporate lending, investment banking and asset management have very different risk and return; the consolidated ratios average them away"],
            ["Currency exposure", "Lending or funding in foreign currencies creates translation and transaction risk, and liquidity needs by currency"],
            ["Risk factors", "The risk disclosures in the annual report and regulatory filings flag what management itself sees as threats"],
            ["Basel III disclosures", "Under Pillar 3 of the Basel framework banks publish detailed reports on capital, RWA by risk type, liquidity ratios and risk management, often richer than the financial statements"],
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why the macro environment matters most",
          html: "Every CAMELS ratio is a snapshot of the past. A bank with excellent asset quality going into a recession will not have excellent asset quality coming out of it. The analyst overlays the economic outlook (growth, unemployment, property prices, interest rates) on the ratios rather than extrapolating them.",
        },
        {
          t: "sort",
          prompt: "Tap each item, then tap where it belongs: inside a CAMELS letter, or outside CAMELS as an other factor.",
          buckets: [
            { id: "camels", label: "Inside CAMELS" },
            { id: "other", label: "Outside CAMELS (other factor)" },
          ],
          items: [
            { text: "Allowance for loan losses / non-performing loans", bucket: "camels", why: "Asset quality." },
            { text: "The bank is on the FSB list of systemically important banks", bucket: "other", why: "Government support and systemic importance sit outside the ratios." },
            { text: "Liquidity coverage ratio", bucket: "camels", why: "Liquidity." },
            { text: "The bank is a credit union owned by its members", bucket: "other", why: "The mission of the institution changes how its profitability should be judged." },
            { text: "Undrawn loan commitments of 30% of total assets", bucket: "other", why: "Off-balance-sheet items are not captured by the balance sheet ratios." },
            { text: "Board risk committee and loans to directors", bucket: "camels", why: "Management capabilities." },
            { text: "Sensitivity of net interest income to a 100 basis point shock", bucket: "camels", why: "Sensitivity to market risk." },
            { text: "A sales culture rewarding staff for accounts opened", bucket: "other", why: "Corporate culture is a separate consideration the ratios miss." },
          ],
        },
        {
          t: "check",
          id: "lm13-oth-1",
          q: "A government-owned development bank reports an ROE of 3%, far below commercial peers. The analyst should most likely conclude that:",
          options: [
            "Management is weak, because ROE is below the cost of equity",
            "The low ROE may reflect the bank's policy mission rather than poor performance, so peers should be other development banks",
            "The bank should be rated poorly on earnings in the same way as a commercial bank",
          ],
          answer: 1,
          why: "The mission of the institution is one of the factors CAMELS misses. A development bank may deliberately lend at low margins; judging it against profit-maximising commercial banks misreads its purpose.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "harbor",
      title: "Putting it together: analysing Harbor Bank over two years",
      los: ["e", "d"],
      blocks: [
        {
          t: "p",
          html: `<p>Back to the credit committee. You now have the tools to answer the question properly: should the firm keep holding Harbor's senior bonds? Here is Harbor's balance sheet, then the CAMELS dashboard built from it.</p>`,
        },
        {
          t: "table",
          caption: "Harbor Bank balance sheet (millions, listed in order of liquidity)",
          head: ["", "Year 1", "Year 2"],
          rows: [
            ["Cash and central bank reserves", "70", "60"],
            ["Government bonds (Level 1)", "140", "120"],
            ["Other securities, Level 2", "90", "110"],
            ["Other securities, Level 3", "4", "10"],
            ["Loans, gross (of which commercial real estate: 140 / 210)", "560", "640"],
            ["Allowance for loan losses", "(15)", "(16)"],
            ["Other assets (including goodwill and intangibles of 6)", "33", "36"],
            ["<b>Total assets</b>", "<b>882</b>", "<b>960</b>"],
            ["Customer deposits", "690", "720"],
            ["Short-term wholesale borrowings", "40", "80"],
            ["Long-term debt (including subordinated debt of 12)", "82", "84"],
            ["Equity (including qualifying preferred shares of 6)", "70", "76"],
            ["<b>Total liabilities and equity</b>", "<b>882</b>", "<b>960</b>"],
            ["Memo: non-performing loans / net charge-offs / risk-weighted assets", "11 / 3 / 520", "20 / 5 / 640"],
          ],
        },
        {
          t: "table",
          caption: "Harbor Bank CAMELS dashboard",
          head: ["Letter", "Measure", "Year 1", "Year 2", "Reading"],
          rows: [
            ["C", "CET1 ratio (common equity less goodwill and intangibles of 6, over RWA)", "58 / 520 = 11.15%", "64 / 640 = 10.00%", "Comfortably above 7.0%, but falling as RWA outgrow capital"],
            ["C", "Total capital ratio", "76 / 520 = 14.62%", "82 / 640 = 12.81%", "Above 8%"],
            ["C", "Tier 1 / total assets", "64 / 882 = 7.26%", "70 / 960 = 7.29%", "Stable"],
            ["A", "NPLs / loans", "1.96%", "3.13%", "Sharply worse"],
            ["A", "Allowance / NPLs", "136%", "80%", "Coverage eroded"],
            ["A", "Commercial real estate / loans", "25.0%", "32.8%", "Rising concentration"],
            ["A", "Level 3 assets / equity", "5.7%", "13.2%", "More model-valued assets"],
            ["M", "Qualitative", "", "", "Rapid growth into one sector while coverage fell raises questions about risk appetite and governance"],
            ["E", "ROA / ROE", "1.19% / 15.0%", "1.09% / 13.8%", "Lower, and flat net income relied on trading gains and a thin provision"],
            ["E", "Net interest margin", "3.24%", "3.19%", "Margin squeezed by costlier funding"],
            ["L", "LCR / NSFR", "226% / 137%", "150% / 125%", "Above minimums, clearly weaker"],
            ["L", "Loans / deposits; short-term wholesale / liabilities", "81% ; 4.9%", "89% ; 9.0%", "More reliance on flighty funding"],
            ["S", "One-year repricing gap; net interest income effect of +100 bp", "-40 ; -0.4", "-100 ; -1.0", "More liability-sensitive"],
            ["S", "Trading value at risk / equity", "0.86%", "1.97%", "More market risk taken"],
          ],
        },
        {
          t: "steps",
          title: "The analyst's reasoning",
          items: [
            { title: "Capital", html: "Harbor meets every Basel III minimum with room to spare. The CET1 ratio fell more than a point because loans grew 14% while capital grew more slowly; the leverage view is steady. Capital is a strength, not a worry, today." },
            { title: "Asset quality", html: "This is the weak letter. Non-performing loans rose 82% (11 to 20) against loan growth of 14%. The allowance barely moved, so coverage collapsed from 136% to 80%. A third of the loan book is now commercial real estate. Losses still to come are probably larger than the allowance admits." },
            { title: "Management", html: "Fast growth concentrated in one cyclical sector, funded with short-term wholesale money, while provisioning lagged deterioration, points to an aggressive risk appetite. The analyst would want to read the governance report and the risk committee's limits." },
            { title: "Earnings", html: "Net income was flat only because trading income quadrupled and the provision did not keep up with problem loans. Restoring year 1 coverage would have cut net income to about 2.0. Core earnings power is falling." },
            { title: "Liquidity", html: "Both Basel ratios still pass, but the LCR fell by a third in a year and short-term wholesale funding doubled. The trend is in the wrong direction." },
            { title: "Sensitivity", html: "Harbor became more liability-sensitive (gap -40 to -100) and doubled its trading risk. Rising rates would squeeze an already thinner margin." },
            { title: "Other factors", html: "Harbor is mid-sized, not a G-SIB, so the analyst should not count on government support for bondholders. Check off-balance-sheet loan commitments to the same real estate sector and the macro outlook for property prices." },
          ],
        },
        {
          t: "callout",
          tone: "example",
          title: "Conclusion for the credit committee",
          html: "Harbor is adequately capitalised and liquid today, so default on senior bonds is not imminent. But asset quality and earnings quality deteriorated together, with growth concentrated in commercial real estate and funded by less stable money. The ratios that matter most for bondholders are moving the wrong way. Recommendation: hold with a negative outlook, set a review trigger if coverage of non-performing loans falls further or the LCR approaches 120%, and stress the capital position with the lab below.",
        },
        { t: "widget", name: "CamelsLab" },
        {
          t: "p",
          html: `<p><b>Model notes.</b> The lab's 3% leverage test is shown for completeness; that minimum is beyond the 2026 curriculum. The run-off rates and funding weights behind its liquidity ratios are the illustrative ones from the liquidity section, not Basel factors.</p>`,
        },
        {
          t: "check",
          id: "lm13-hb-1",
          q: "In the lab, a credit loss shock of 4% of loans takes Harbor's CET1 ratio to exactly 7.0% while every Basel minimum still holds. What is the consequence?",
          options: [
            "Harbor is in breach of the CET1 minimum and must be resolved",
            "Harbor is at the edge of the conservation buffer; any further loss restricts dividends and bonuses",
            "Nothing, because only the total capital ratio is binding",
          ],
          answer: 1,
          why: "The minimum is 4.5%; 7.0% is the minimum plus the 2.5% conservation buffer. Falling into the buffer triggers restrictions on distributions, not resolution. A 4% shock is 25.6 of provisions, 19.2 after tax, taking CET1 from 64 to 44.8, which is 7.0% of 640.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "insurers-pc",
      title: "Insurance companies: property and casualty",
      los: ["f"],
      blocks: [
        {
          t: "p",
          html: `<p>Now switch chairs. You are an equity analyst covering Granite Insurance, a property and casualty (P&C) insurer: it covers cars, homes, businesses and liability claims. Granite's model runs backwards compared with a manufacturer. It collects the price first and finds out its cost of goods sold later, sometimes years later, when the claims are settled. Everything about analysing it follows from that.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Property and casualty (P&C)",
              tone: "amber",
              points: [
                "Policies usually short, often one year, repriced at renewal",
                "Claims hard to predict: weather, catastrophes, court awards",
                "Some claims (liability, injury) take years to settle, so reserves are large estimates",
                "Profit from underwriting AND from investing the float",
                "Needs a liquid investment portfolio: a hurricane does not wait",
              ],
            },
            {
              title: "Life and health (L&H)",
              tone: "cyan",
              points: [
                "Contracts run for decades: life cover, annuities, savings products",
                "Claims fairly predictable from mortality tables, but long-dated",
                "Large savings component: policyholder deposits invested for them",
                "Profit relies heavily on investment returns over guaranteed rates",
                "Long-duration portfolio matched to long liabilities; interest rate and surrender risk",
              ],
            },
          ],
        },
        {
          t: "p",
          html: `<p>For a P&C insurer the analyst studies the <b>business profile</b> (which product lines, personal or commercial, which regions, how the policies are sold, through agents or brokers or directly, and how much risk is passed on to reinsurers), then earnings, investment returns, liquidity and capital. The theater shows the mechanics that make P&C earnings what they are.</p>`,
        },
        { t: "theater", scenario: "lm13-insurer-premiums" },
        {
          t: "h",
          text: "The underwriting ratios",
        },
        {
          t: "p",
          html: `<p>Granite's revenue is the premium it earns for bearing risk. Its costs come in two kinds, and the ratios split them because they are driven by different things. Claims costs depend on how well Granite priced the risk; underwriting expenses depend on how efficiently it sells and administers policies.</p>`,
        },
        {
          t: "formula",
          name: "Loss and loss adjustment expense ratio",
          tex: "\\text{Loss and LAE ratio} = \\frac{\\text{Losses} + \\text{Loss adjustment expenses}}{\\text{Net premiums earned}}",
          plain: "Claims cost per unit of premium earned. Loss adjustment expenses (LAE) are the costs of investigating and settling claims. Granite: (610 + 90) / 1,000 = 70.0%.",
        },
        {
          t: "formula",
          name: "Underwriting expense ratio",
          tex: "\\text{Underwriting expense ratio} = \\frac{\\text{Underwriting expenses}}{\\text{Net premiums written}}",
          plain: "Cost of acquiring and administering business, mostly commissions, incurred when policies are WRITTEN, hence the written denominator. Granite: 273 / 1,050 = 26.0%.",
        },
        {
          t: "formula",
          name: "Combined ratio",
          tex: "\\text{Combined ratio} = \\text{Loss and LAE ratio} + \\text{Underwriting expense ratio}",
          plain: "Below 100%: underwriting is profitable before any investment income. Above 100%: the insurer pays out more than it charges and relies on investment income. Granite: 70.0% + 26.0% = 96.0%.",
        },
        {
          t: "formula",
          name: "Dividends to policyholders and the combined ratio after dividends",
          tex: "\\text{Dividends ratio} = \\frac{\\text{Dividends to policyholders}}{\\text{Net premiums earned}};\\quad \\text{Combined after dividends} = \\text{Combined ratio} + \\text{Dividends ratio}",
          plain: "Policyholder dividends return part of the premium on participating policies, so they are a cost of underwriting. Granite: 10 / 1,000 = 1.0%, so 97.0% after dividends.",
        },
        {
          t: "table",
          caption: "Granite Insurance: the full ratio set",
          head: ["Item", "Amount", "Ratio"],
          rows: [
            ["Net premiums written", "1,050", ""],
            ["Net premiums earned", "1,000", ""],
            ["Losses + LAE", "610 + 90 = 700", "700 / 1,000 = 70.0%"],
            ["Underwriting expenses", "273", "273 / 1,050 = 26.0%"],
            ["<b>Combined ratio</b>", "", "<b>96.0%</b>"],
            ["Dividends to policyholders", "10", "10 / 1,000 = 1.0%"],
            ["<b>Combined ratio after dividends</b>", "", "<b>97.0%</b>"],
            ["Underwriting result (1,000 - 700 - 273 - 10)", "17", ""],
            ["Net investment income on average invested assets of 2,000", "75", "Without gains (investment yield) 3.75%"],
            ["Realized and unrealized investment gains", "15", "Total investment return ratio (75 + 15) / 2,000 = 4.5%"],
            ["Pre-tax operating income (underwriting result + net investment income)", "92", ""],
          ],
        },
        {
          t: "callout",
          tone: "trap",
          title: "Two different denominators",
          html: "The loss ratio divides by premiums EARNED; the expense ratio by premiums WRITTEN. Mixing them up is the most common error in an item set. It also means 100% minus the combined ratio is only approximately the underwriting margin: Granite's 97.0% after dividends suggests 30 of underwriting profit on 1,000 of earned premium, but the income statement shows 17, because 273 of expenses is 26.0% of written premiums and 27.3% of earned premiums. The faster an insurer grows, the wider that gap.",
        },
        { t: "widget", name: "InsurerLab" },
        {
          t: "h",
          text: "The underwriting cycle",
        },
        {
          t: "p",
          html: `<p>P&C pricing moves in a cycle. After a few profitable years, capital flows into the industry, insurers compete for business by cutting prices and loosening terms, and combined ratios drift up: a <b>soft market</b>. Eventually losses (often a catastrophe year) exceed what the low prices can cover, capital is depleted, weaker players pull back, and the survivors raise prices: a <b>hard market</b>, in which combined ratios improve. An analyst reads any single year's combined ratio against where the market is in that cycle, and treats a falling combined ratio in a softening market with suspicion.</p>`,
        },
        {
          t: "h",
          text: "Loss reserves and reserve development",
        },
        {
          t: "p",
          html: `<p>The loss reserve is the insurer's estimate of claims it already owes but has not paid. It is the largest liability on the balance sheet and pure judgment: injury and liability claims can take years to settle. Under-reserving flatters current profit exactly as an inadequate loan loss allowance flatters a bank's. The truth comes out later, as <b>reserve development</b>: re-estimates of prior years' claims that flow through the current year's income statement.</p>`,
        },
        { t: "theater", scenario: "lm13-insurer-reserves" },
        {
          t: "p",
          html: `<p>Insurers disclose a <b>loss reserve development table</b> showing, for each accident year, the original estimate and every later re-estimate. Persistent <b>adverse development</b> (re-estimates rising) means earlier reserves, and earlier profits, were understated. Persistent <b>favorable development</b> looks conservative but can also be a reserve cushion being released to smooth earnings. Strip prior-year development out to see the current accident year's real loss ratio.</p>`,
        },
        {
          t: "h",
          text: "Investments, liquidity and capital",
        },
        {
          t: "p",
          html: `<p><b>Investment returns.</b> The float is invested, mostly in bonds. The headline measure is the <b>total investment return ratio</b>: total investment income, including realized and unrealized gains and losses, over invested assets. Computing it again without the gains (net investment income alone, often called the investment yield) shows how much of the return depends on volatile gains. Granite: 4.5% in total, 3.75% without gains. Prep notes write the denominator simply as invested assets; using the average of the opening and closing balance, as here, matters only when the portfolio grew or shrank during the year.</p>
<p><b>Liquidity.</b> P&C claims can arrive suddenly and in a lump, so the portfolio must be liquid. The analyst checks the asset mix and the fair value hierarchy: a portfolio heavy in Level 1 and Level 2 assets can be sold quickly; one heavy in Level 3 cannot.</p>
<p><b>Capital.</b> There is no single global capital standard for insurers comparable to Basel III. Regulation is largely national or regional: in the US, state regulators apply risk-based capital requirements developed by the National Association of Insurance Commissioners; the European Union applies Solvency II. Both scale required capital to the risks in the insurer's underwriting and investments.</p>`,
        },
        {
          t: "check",
          id: "lm13-pc-1",
          q: "An insurer's combined ratio is 103%. Which statement is most accurate?",
          options: [
            "It is unprofitable overall",
            "It loses money on underwriting and needs investment income above about 3% of earned premiums to make an operating profit",
            "Its expenses exceed its losses",
          ],
          answer: 1,
          why: "Above 100% means claims and underwriting costs exceed premiums, an underwriting loss. Investment income on the float can still produce an overall profit.",
        },
        {
          t: "check",
          id: "lm13-pc-2",
          q: "An insurer reports a loss and LAE ratio of 64%, which includes favorable prior-year reserve development equal to 6% of earned premiums. The loss and LAE ratio for the current accident year is closest to:",
          options: ["58%", "64%", "70%"],
          answer: 2,
          why: "Favorable development reduced reported losses. Adding it back gives 64% + 6% = 70% for claims arising this year, the better guide to current pricing.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "insurers-lh",
      title: "Insurance companies: life and health",
      los: ["f"],
      blocks: [
        {
          t: "p",
          html: `<p>Juniper Life sells life insurance, annuities and health cover. A life policy sold today may pay out in forty years. That changes the analysis in three ways: there is no meaningful annual combined ratio, investment returns over the policy's life are central to whether it was priced well, and the main risks come from interest rates, from people living longer or dying sooner than assumed, and from policyholders cashing out.</p>
<p><b>Revenue</b> comes from premiums, from investment income on the large portfolio backing policyholder liabilities, and from fees on savings and investment products. Many products are partly savings: money policyholders hand over is recorded as <b>deposits</b> rather than premiums, which is why the curriculum's L&H ratios use net premiums written plus deposits as the denominator.</p>`,
        },
        {
          t: "formula",
          name: "Life and health ratios",
          tex: "\\frac{\\text{Total benefits paid}}{\\text{Net premiums written} + \\text{Deposits}};\\quad \\frac{\\text{Commissions} + \\text{Expenses}}{\\text{Net premiums written} + \\text{Deposits}}",
          plain: "Juniper Life: net premiums written 800, deposits 200, benefits paid 620, commissions and expenses 210. Benefits ratio 620 / 1,000 = 62.0%; expense ratio 210 / 1,000 = 21.0%. Track them over time and against peers; the InsurerLab above has a panel for them.",
        },
        {
          t: "table",
          caption: "Life and health: the analyst's checklist",
          head: ["Area", "What to look at, and why"],
          rows: [
            ["Business profile", "Product mix (protection vs savings, guaranteed vs market-linked), distribution channels, geographic spread, concentration"],
            ["Earnings", "Benefits and expense ratios, return on assets and equity, growth in premiums and deposits; heavy reliance on actuarial assumptions about mortality, lapses and returns makes earnings estimate-dependent"],
            ["Interest rate risk", "Products with guaranteed returns become loss-making when portfolio yields fall below the guarantee; long liabilities make the gap between asset and liability duration critical"],
            ["Mortality and longevity risk", "Life cover loses money if people die sooner than assumed; annuities lose money if they live longer"],
            ["Liquidity", "Policyholders can surrender many savings policies for cash. Surrenders rise when rates jump (better yields elsewhere) or when confidence in the insurer falls, forcing sales of long-dated, possibly illiquid assets"],
            ["Investments", "Longer duration and more credit risk than a P&C portfolio, matched to long liabilities; check the fair value hierarchy for illiquid Level 3 holdings"],
            ["Capital", "Risk-based capital (US) or Solvency II (EU) ratios, as for P&C insurers"],
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why rising rates cut both ways for a life insurer",
          html: "Higher rates let Juniper reinvest at better yields, easing the squeeze on guaranteed products. But the market value of its long bond portfolio falls, and if policyholders surrender to chase higher yields elsewhere, Juniper may have to sell those bonds at a loss. That is the bank rate-shock story with surrenders playing the part of the deposit run.",
        },
        {
          t: "check",
          id: "lm13-lh-1",
          q: "Which risk is most specific to a life insurer selling annuities, compared with a P&C insurer?",
          options: ["Catastrophe risk from hurricanes", "Longevity risk: annuitants living longer than assumed", "Underwriting cycle risk from soft markets"],
          answer: 1,
          why: "An annuity pays for as long as the policyholder lives, so longer lives raise the cost. Catastrophes and the soft and hard market cycle are characteristic P&C risks.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "Charge-offs are the expense that measures a bank's credit losses for the year.", right: "The provision is the expense. A charge-off removes a loan and the matching allowance together, with no effect on profit, because the loss was already expensed through earlier provisions." },
    { wrong: "A bank with debt to equity of 12 times is dangerously over-leveraged.", right: "Leverage of that order is normal for a bank because deposits are the raw material of the business. Judge solvency with risk-based capital ratios and a leverage ratio, not a manufacturer's debt to equity." },
    { wrong: "A high allowance for loan losses always signals a conservative, safe bank.", right: "It is reassuring only when non-performing loans justify it. Over-providing in good years can create a cookie jar released later to smooth earnings." },
    { wrong: "A combined ratio of 97% means the insurer lost 3% of premiums.", right: "Below 100% means an underwriting PROFIT: claims and expenses absorbed 97% of premiums. Above 100% is an underwriting loss." },
    { wrong: "The loss ratio and the underwriting expense ratio share the same denominator.", right: "Losses and LAE are divided by net premiums EARNED; underwriting expenses by net premiums WRITTEN, because acquisition costs are incurred when policies are written." },
    { wrong: "Bonds held at amortized cost carry no interest rate risk because their carrying amount does not change.", right: "Their economic value falls with rising rates exactly as fair value bonds do; the loss is hidden until a sale or impairment forces recognition. Read the fair value note." },
    { wrong: "A bank in the capital conservation buffer is in breach of Basel III and must be resolved.", right: "The buffer sits above the minimum. Dipping into it restricts dividends, buybacks and bonuses until capital is rebuilt; the 4.5% CET1 minimum is the hard floor." },
    { wrong: "A low ROE always signals a poorly run bank.", right: "Check the mission: credit unions, cooperative banks and development banks are not profit maximisers. Also check leverage, since a high ROE can simply reflect thin capital." },
    { wrong: "Favorable reserve development is always good news.", right: "It raises current profit but can mean the insurer over-reserved earlier and is now releasing a cushion. Strip it out to see the current accident year loss ratio." },
  ],

  gaap: [
    { topic: "Credit loss model for loans at amortized cost (beyond the curriculum)", ifrs: "IFRS 9 expected credit loss: 12-month losses for performing loans (stage 1), lifetime losses after a significant increase in credit risk (stages 2 and 3)", usgaap: "Current expected credit loss (CECL): lifetime expected losses for all loans from origination, no staging" },
    { topic: "Debt securities categories", ifrs: "Amortized cost, FVOCI (recycled on sale), FVPL", usgaap: "Held-to-maturity, available-for-sale (recycled on sale), trading" },
    { topic: "Recoveries of loans written off", ifrs: "Commonly presented in profit as a reduction of the impairment charge", usgaap: "Commonly credited back to the allowance (net charge-offs = charge-offs - recoveries)" },
    { topic: "Cash flows from lending and deposits", ifrs: "Banks usually classify loans and deposits within operating activities; interest received and paid may be operating, investing or financing", usgaap: "Loans made and repaid are typically investing, net change in deposits financing; interest received and paid are operating" },
    { topic: "Regulatory capital starting point", ifrs: "IFRS equity, then Basel III adjustments by the national regulator", usgaap: "US GAAP equity, then Basel III adjustments by US regulators" },
  ],

  formulas: [
    { name: "CET1 ratio", tex: "\\frac{\\text{Common equity Tier 1 capital}}{\\text{Risk-weighted assets}} \\ge 4.5\\%", plain: "Purest loss-absorbing capital against risk-weighted assets; 7.0% with the conservation buffer." },
    { name: "Tier 1 capital ratio", tex: "\\frac{\\text{CET1} + \\text{Additional Tier 1}}{\\text{Risk-weighted assets}} \\ge 6\\%", plain: "Going-concern capital against risk-weighted assets." },
    { name: "Total capital ratio", tex: "\\frac{\\text{Tier 1} + \\text{Tier 2}}{\\text{Risk-weighted assets}} \\ge 8\\%", plain: "All qualifying capital, including subordinated debt, against risk-weighted assets." },
    { name: "Leverage ratio", tex: "\\frac{\\text{Tier 1 capital}}{\\text{Total exposure}}", plain: "A backstop no risk weight can flatter. Basel III's 3% minimum is beyond the 2026 curriculum." },
    { name: "Liquidity coverage ratio", tex: "\\frac{\\text{High-quality liquid assets}}{\\text{Net cash outflows over 30 days of stress}} \\ge 100\\%", plain: "Can the bank survive a month-long run?" },
    { name: "Net stable funding ratio", tex: "\\frac{\\text{Available stable funding}}{\\text{Required stable funding}} \\ge 100\\%", plain: "Are illiquid assets funded with money that stays for a year?" },
    { name: "Allowance roll-forward", tex: "\\text{End} = \\text{Beginning} + \\text{Provision} - \\text{Charge-offs} + \\text{Recoveries}", plain: "Only the provision hits profit." },
    { name: "Coverage of non-performing loans", tex: "\\frac{\\text{Allowance for loan losses}}{\\text{Non-performing loans}}", plain: "How much of the problem loans is already provided for." },
    { name: "Provision to net charge-offs", tex: "\\frac{\\text{Provision for loan losses}}{\\text{Charge-offs} - \\text{Recoveries}}", plain: "Above 1, the allowance is being built; below 1, released into profit." },
    { name: "Net interest margin", tex: "\\frac{\\text{Net interest income}}{\\text{Average interest-earning assets}}", plain: "The lender's spread." },
    { name: "Return on equity decomposition", tex: "\\text{ROE} = \\text{ROA} \\times \\frac{\\text{Assets}}{\\text{Equity}}", plain: "Leverage turns a 1% ROA into a double-digit ROE." },
    { name: "Repricing gap effect on net interest income", tex: "\\Delta \\text{NII} \\approx (\\text{RSA} - \\text{RSL}) \\times \\Delta r", plain: "Rate-sensitive assets less rate-sensitive liabilities within the horizon, times the rate change." },
    { name: "Loss and LAE ratio", tex: "\\frac{\\text{Losses} + \\text{LAE}}{\\text{Net premiums earned}}", plain: "Claims cost per unit of earned premium." },
    { name: "Underwriting expense ratio", tex: "\\frac{\\text{Underwriting expenses}}{\\text{Net premiums written}}", plain: "Note the WRITTEN denominator." },
    { name: "Combined ratio", tex: "\\text{Loss and LAE ratio} + \\text{Underwriting expense ratio}", plain: "Below 100% is an underwriting profit." },
    { name: "Dividends to policyholders ratio", tex: "\\frac{\\text{Dividends to policyholders}}{\\text{Net premiums earned}}", plain: "Added to the combined ratio to give the combined ratio after dividends." },
    { name: "Total investment return ratio (and the yield without gains)", tex: "\\frac{\\text{Net investment income} + \\text{Gains}}{\\text{Invested assets}};\\quad \\frac{\\text{Net investment income}}{\\text{Invested assets}}", plain: "Total investment income (including realized and unrealized gains) over invested assets; dropping the gains shows how much of the return they supply." },
    { name: "Life and health ratios", tex: "\\frac{\\text{Total benefits paid}}{\\text{NPW} + \\text{Deposits}};\\quad \\frac{\\text{Commissions} + \\text{Expenses}}{\\text{NPW} + \\text{Deposits}}", plain: "NPW is net premiums written; deposits capture the savings component." },
  ],

  recall: [
    { q: "List five ways financial institutions differ from other companies.", a: "Systemic importance and contagion; heavy regulation; assets mostly financial (credit, liquidity and market risk); high leverage; funding from short-term deposits (maturity transformation)." },
    { q: "What does each CAMELS letter stand for?", a: "Capital adequacy, Asset quality, Management capabilities, Earnings, Liquidity position, Sensitivity to market risk." },
    { q: "State the three Basel III minimum capital ratios.", a: "CET1 at least 4.5% of RWA, Tier 1 at least 6%, total capital at least 8%, with a 2.5% CET1 conservation buffer on top." },
    { q: "What goes into CET1, and what is deducted?", a: "Common shares and related surplus, retained earnings and AOCI; less regulatory deductions such as goodwill, other intangibles and certain deferred tax assets." },
    { q: "What qualifies as Tier 2 capital?", a: "Instruments subordinated to depositors and general creditors with an original maturity of at least five years, such as subordinated debt, plus certain loan loss allowances." },
    { q: "Define the LCR and the NSFR.", a: "LCR: high-quality liquid assets / net cash outflows over 30 stressed days, at least 100%. NSFR: available stable funding / required stable funding over one year, at least 100%." },
    { q: "Besides the LCR and the NSFR, which two liquidity monitoring ideas are core?", a: "Contractual maturity mismatch (when assets mature against when liabilities fall due) and concentration of funding (reliance on a few depositors, products or markets). Basel's wider list (unencumbered assets, LCR by significant currency, market-related tools) is background." },
    { q: "Why does a charge-off not reduce net income?", a: "The loss was expensed through the provision when it was expected; the charge-off only removes the loan and uses up the allowance." },
    { q: "Name the bank-specific factors CAMELS does not address.", a: "Government support, government ownership, the mission of the institution and corporate culture." },
    { q: "Name the general factors CAMELS does not address.", a: "Competitive environment, off-balance-sheet items, segment information, currency exposure, risk factors and Basel III (Pillar 3) disclosures." },
    { q: "Give the denominators of the P&C loss and expense ratios.", a: "Loss and LAE ratio: net premiums earned. Underwriting expense ratio: net premiums written." },
    { q: "What are the two L&H ratios and their shared denominator?", a: "Total benefits paid, and commissions plus expenses, each over net premiums written plus deposits." },
  ],

  itemSets: [
    {
      id: "lm13-is1",
      title: "Harbor Bank: a credit committee review",
      vignette: `<p>An analyst is reviewing Harbor Bank (figures in millions). Year 2 data: common equity 70, of which goodwill and intangibles 6; qualifying preferred shares 6; subordinated debt 12; risk-weighted assets 640; gross loans 640; non-performing loans 20; allowance for loan losses 16; net income 10.5; tax rate 25%.</p>
<p>Year 1 comparatives: non-performing loans 11, allowance 15, coverage of non-performing loans 136.36%. Year 2 revenue was net interest income 30, fees 10 and trading income 4, against year 1 figures of 28, 10 and 1.</p>`,
      questions: [
        {
          q: "Harbor's year 2 CET1 ratio is closest to:",
          options: ["10.0%", "10.9%", "11.9%"],
          answer: 0,
          why: "CET1 = common equity 70 - goodwill and intangibles 6 = 64, and 64 / 640 = 10.0%. Not deducting goodwill gives 70 / 640 = 10.9%; using total equity including the preferred shares gives 76 / 640 = 11.9%. The preferred shares are Additional Tier 1, not CET1.",
        },
        {
          q: "Harbor's year 2 allowance for loan losses as a percentage of non-performing loans is closest to:",
          options: ["125%", "2.5%", "80%"],
          answer: 2,
          why: "Coverage = allowance / non-performing loans = 16 / 20 = 80%. 125% inverts the ratio; 2.5% is allowance over gross loans.",
        },
        {
          q: "If Harbor had kept its year 1 coverage of non-performing loans in year 2, its year 2 net income would have been closest to:",
          options: ["2.0", "(0.8)", "10.5"],
          answer: 0,
          why: "Required allowance = 1.3636 x 20 = 27.3, so the extra provision is 27.3 - 16 = 11.3. After the 25% tax shield the hit is 8.5, leaving 10.5 - 8.5 = 2.0. Ignoring the tax shield gives (0.8).",
        },
        {
          q: "Which statement about Harbor's year 2 earnings quality is most accurate?",
          options: [
            "Earnings quality improved, because revenue grew 13% while net income held steady",
            "Earnings quality deteriorated, because flat net income depended on trading income quadrupling and on an allowance that did not keep pace with problem loans",
            "Earnings quality is unchanged, because ROE stayed above 10%",
          ],
          answer: 1,
          why: "Trading income is the least sustainable revenue stream, and the provision lagged a near doubling of non-performing loans. Both make the same net income lower quality.",
        },
      ],
    },
    {
      id: "lm13-is2",
      title: "Basalt Mutual: a P&C insurer",
      vignette: `<p>Basalt Mutual, a property and casualty insurer, reports for the year: net premiums written 2,400; net premiums earned 2,200; losses incurred 1,430; loss adjustment expenses 220; underwriting expenses 600; dividends to policyholders 44; net investment income 150; realized and unrealized investment gains 30; average invested assets 4,000.</p>
<p>The notes disclose that losses incurred include favorable development of 66 on reserves for prior accident years.</p>`,
      questions: [
        {
          q: "Basalt's combined ratio is closest to:",
          options: ["100.0%", "102.0%", "102.3%"],
          answer: 0,
          why: "Loss and LAE ratio = (1,430 + 220) / 2,200 = 75.0%. Underwriting expense ratio = 600 / 2,400 = 25.0%. Combined = 100.0%. Dividing expenses by earned premiums instead gives 27.3% and a wrong 102.3%; 102.0% already includes policyholder dividends.",
        },
        {
          q: "Basalt's combined ratio after dividends is closest to:",
          options: ["101.8%", "102.0%", "100.0%"],
          answer: 1,
          why: "Dividends ratio = 44 / 2,200 = 2.0% of earned premiums, so 100.0% + 2.0% = 102.0%. Dividing the dividends by written premiums gives 1.8% and 101.8%.",
        },
        {
          q: "Excluding prior-year reserve development, Basalt's loss and LAE ratio for the current accident year is closest to:",
          options: ["72.0%", "78.0%", "75.0%"],
          answer: 1,
          why: "Favorable development reduced reported losses by 66. Current-year losses and LAE = 1,650 + 66 = 1,716, and 1,716 / 2,200 = 78.0%. Subtracting the 66 instead gives 72.0%.",
        },
        {
          q: "Basalt's total investment return and the best reading of its overall performance are:",
          options: [
            "4.5%; underwriting is at best break-even on the ratio basis, so the operating profit comes from the investment portfolio",
            "3.75%; underwriting is profitable, so investment income is a bonus",
            "4.5%; a combined ratio above 100% means Basalt is unprofitable overall",
          ],
          answer: 0,
          why: "Total investment return = (150 + 30) / 4,000 = 4.5%; investment yield alone is 3.75%. The combined ratio is 100% (102% after dividends), and in currency the underwriting result is 2,200 - 1,650 - 600 - 44 = -94, worse than the ratios suggest because written premiums exceed earned premiums. Net investment income of 150 turns that underwriting loss into operating income of 56, so the portfolio carries the result. A combined ratio above 100% is an underwriting loss, not an overall loss.",
        },
      ],
    },
    {
      id: "lm13-is3",
      title: "Cedar Bank: regulatory capital",
      vignette: `<p>Cedar Bank reports (in millions): common shares and related surplus 40; retained earnings 25; accumulated other comprehensive income (4); goodwill 8; deferred tax assets deducted by the regulator 2; non-cumulative perpetual preferred shares qualifying as Additional Tier 1 12; subordinated debt with a 10-year original maturity 15.</p>
<p>Assets and the risk weights the analyst uses: cash 50 (0%); government bonds 200 (0%); residential mortgages 400 (50%); corporate loans 300 (100%); other assets 50 (100%).</p>`,
      questions: [
        {
          q: "Cedar's CET1 ratio is closest to:",
          options: ["9.3%", "11.1%", "11.5%"],
          answer: 0,
          why: "RWA = 0 + 0 + 200 + 300 + 50 = 550. CET1 = 40 + 25 - 4 - 8 - 2 = 51, and 51 / 550 = 9.3%. Skipping the deductions gives 61 / 550 = 11.1%; 11.5% is the Tier 1 ratio (63 / 550).",
        },
        {
          q: "Cedar's total capital ratio is closest to:",
          options: ["7.8%", "14.2%", "11.5%"],
          answer: 1,
          why: "Total capital = 51 + 12 + 15 = 78, and 78 / 550 = 14.2%. Dividing by unweighted assets of 1,000 gives 7.8%; 11.5% stops at Tier 1.",
        },
        {
          q: "If residential mortgages carried a 35% risk weight instead of 50%, Cedar's CET1 ratio would:",
          options: ["Rise to about 10.4%", "Fall to about 8.2%", "Stay the same, because risk weights affect only the total capital ratio"],
          answer: 0,
          why: "RWA falls to 140 + 300 + 50 = 490, so CET1 = 51 / 490 = 10.4%. Risk weights change the denominator of every risk-based ratio.",
        },
        {
          q: "Which of Cedar's items is least likely to count as CET1?",
          options: ["Accumulated other comprehensive income", "Retained earnings", "Subordinated debt with a 10-year original maturity"],
          answer: 2,
          why: "Subordinated debt with an original maturity of at least five years is Tier 2 capital. Retained earnings and AOCI are part of CET1.",
        },
      ],
    },
  ],

  flags: [],
};
