/* LM10 Intercorporate Investments. Reference module for the FSA platform:
   every later module copies this voice, depth and block mix.
   Demo cast: Pinnacle Corp (investor / parent), Kestrel Ltd (investee). */
export default {
  id: "lm10",
  num: 10,
  title: "Intercorporate Investments",
  short: "Intercorporate investments",
  tagline:
    "When one company owns a piece of another, the size of the piece and the power it buys decide whether you see one line, a share of every line, or everything.",
  minutes: 210,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "spectrum",
      title: "The real question: how much power does the stake buy?",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>Put yourself in the chair of Pinnacle Corp's chief financial officer. Pinnacle has spare cash and buys shares in other companies for different reasons: a 4% stake in a listed supplier as a treasury investment, 30% of Kestrel Ltd to secure a strategic partner, 50% of a joint venture with a rival, and 80% of a small competitor it now runs. Your board wants one set of financial statements that tells the truth about all of it.</p>
<p>The naive approach is to treat every stake the same way, say at cost or at market value. That fails quickly. If Pinnacle runs the competitor, its revenues, costs, debts and staff ARE Pinnacle's business now, and a single line saying "Investment: 800" would hide almost everything a reader needs. If Pinnacle merely owns 4% of a supplier, pulling 4% of the supplier's factories onto Pinnacle's balance sheet would be absurd: Pinnacle cannot use those factories.</p>
<p>So the accounting follows <b>power</b>, not paperwork. The more say Pinnacle has over how the other company is run, the more of that company's statements show up inside Pinnacle's. Ownership percentage is only the first clue to how much power exists.</p>`,
        },
        {
          t: "table",
          caption: "The four buckets (both IFRS and US GAAP use this skeleton)",
          head: ["Influence", "Typical stake", "Category", "Accounting"],
          rows: [
            ["None to speak of", "Below 20%", "Investment in financial assets", "Fair value (or amortized cost for some debt). IFRS 9 / US GAAP ASC 320 and 321"],
            ["Significant influence", "20% to 50%", "Investment in associate", "Equity method: one line on the balance sheet, one line on the income statement"],
            ["Joint control", "Shared by contract", "Joint venture", "Equity method (IFRS 11 and US GAAP)"],
            ["Control", "Above 50%", "Business combination (subsidiary)", "Acquisition method: consolidate 100% of every line, show the non-controlling interest"],
          ],
          note: "Percentages are presumptions, not rules. A 15% holder who appoints the CEO has significant influence; a 25% holder blocked from the board may not.",
        },
        {
          t: "p",
          html: `<p><b>Significant influence</b> is the power to participate in the investee's financial and operating policy decisions without controlling them. The curriculum lists the evidence an analyst looks for: representation on the board of directors, participation in policy-making (including decisions about dividends), material transactions between the two companies, interchange of managerial personnel, and technological dependency (one company relies on the other's essential technical information). Any of these can create significant influence below 20%; a dominant other shareholder can remove it above 20%.</p>
<p><b>Control</b> means power over the investee, exposure to its variable returns, and the ability to use that power to affect those returns. Usually that is more than half the votes, but contracts, potential voting rights and special purpose structures can create control without a majority, which is why special purpose and variable interest entities get their own section below.</p>`,
        },
        {
          t: "sort",
          prompt: "Pinnacle holds the stakes below. Tap a stake, then tap the category it falls into.",
          buckets: [
            { id: "fa", label: "Financial asset" },
            { id: "assoc", label: "Associate (equity method)" },
            { id: "jv", label: "Joint venture" },
            { id: "sub", label: "Subsidiary (consolidate)" },
          ],
          items: [
            { text: "4% of a listed supplier, no board seat", bucket: "fa", why: "No evidence of influence, and well under the 20% presumption." },
            { text: "30% of Kestrel, 2 of 7 board seats", bucket: "assoc", why: "Board representation plus a 30% stake: significant influence, not control." },
            { text: "50% of a venture where every major decision needs both owners' consent", bucket: "jv", why: "Unanimous consent over relevant activities is the definition of joint control." },
            { text: "80% of a competitor", bucket: "sub", why: "A voting majority with no contrary agreement gives control." },
            { text: "15% of a tech firm, but Pinnacle supplies its core patent and seconds its CTO", bucket: "assoc", why: "Technological dependency and interchange of managers create significant influence below 20%." },
            { text: "35% of a firm whose other 65% is held by one investor who ignores Pinnacle", bucket: "fa", why: "A majority owner who shuts Pinnacle out can rebut the 20% presumption. No influence in substance." },
            { text: "A leasing vehicle with 1% outside equity where Pinnacle absorbs most losses", bucket: "sub", why: "A variable interest entity: Pinnacle is the primary beneficiary and must consolidate it, whatever its voting stake." },
          ],
        },
        {
          t: "tree",
          title: "Which accounting applies?",
          root: "ctrl",
          nodes: {
            ctrl: {
              q: "Does Pinnacle control the investee?",
              help: "Power over the investee, exposure to variable returns, and the ability to use that power to affect them. For a special purpose or variable interest entity, ask who absorbs most of the risk and directs the activities that matter.",
              options: [{ label: "Yes", next: "consol" }, { label: "No", next: "joint" }],
            },
            joint: {
              q: "Is control shared by contract, with unanimous consent needed for the decisions that matter?",
              options: [{ label: "Yes", next: "jtype" }, { label: "No", next: "sig" }],
            },
            jtype: {
              q: "What does Pinnacle have rights to under the arrangement?",
              help: "IFRS 11 splits joint arrangements by the rights each party holds.",
              options: [{ label: "The net assets of a separate vehicle", next: "jv" }, { label: "Specific assets and obligations for liabilities", next: "jop" }],
            },
            sig: {
              q: "Does Pinnacle have significant influence?",
              help: "Board seats, a say in dividend policy, material transactions, swapped managers, technological dependency. 20% or more is presumed influence unless rebutted.",
              options: [{ label: "Yes", next: "eq" }, { label: "No", next: "fa" }],
            },
            consol: { result: "Consolidate: acquisition method", tone: "purple", html: "100% of the subsidiary's assets, liabilities, revenues and expenses enter Pinnacle's statements line by line. The part Pinnacle does not own is the non-controlling interest, shown inside equity." },
            jv: { result: "Joint venture: equity method", tone: "cyan", html: "Under IFRS 11 a joint venture uses the equity method; proportionate consolidation is not allowed. US GAAP also uses the equity method. The 2026 curriculum (errata, April 2026) states plainly that proportionate consolidation is not permitted for joint ventures; a narrow US GAAP industry exception exists but is beyond the curriculum." },
            jop: { result: "Joint operation: recognize your share", tone: "cyan", html: "Pinnacle recognizes its own share of the assets, liabilities, revenues and expenses of the arrangement, much like proportionate consolidation." },
            eq: { result: "Associate: equity method", tone: "green", html: "One line on the balance sheet (investment in associate) and one on the income statement (share of profit of associate)." },
            fa: { result: "Financial asset: IFRS 9 classification", tone: "amber", html: "Fair value through profit or loss, fair value through OCI, or amortized cost, depending on the instrument and the business model. See the next section." },
          },
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "financial-assets",
      title: "Investments in financial assets: where does a price change go?",
      los: ["a", "b", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle's treasury holds bonds and small equity stakes. Their prices move every day. The accounting question is blunt: when the price of a bond Pinnacle owns rises by 40, has Pinnacle earned 40?</p>
<p>It depends on what Pinnacle is going to do with the bond. If Pinnacle will hold it to maturity and collect the coupons, the 40 is a paper movement that will melt away by maturity, when the bond pays exactly its par value. Putting it through profit would make earnings bounce around for no economic reason. If Pinnacle is a trader that buys bonds to sell them next week, the 40 is the business, and hiding it would misstate performance. Between those two sits a company that collects coupons but sells when it needs to.</p>
<p>IFRS 9 turns that intuition into two tests applied to debt instruments: the <b>business model test</b> (what does the company do with the asset: hold to collect, hold to collect and sell, or something else such as trading) and the <b>cash flow characteristics test</b> (are the contractual cash flows solely payments of principal and interest on the principal outstanding, often shortened to SPPI).</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Amortized cost",
              tone: "green",
              points: [
                "Debt that passes SPPI, held to collect contractual cash flows",
                "Balance sheet: amortized cost, using the effective interest method",
                "Unrealized price changes: ignored (fair value only in the notes)",
                "Interest income in profit; realized gain or loss on sale in profit",
                "US GAAP name: held-to-maturity (debt only)",
              ],
            },
            {
              title: "Fair value through OCI (FVOCI)",
              tone: "cyan",
              points: [
                "Debt that passes SPPI, held to collect AND sell",
                "Balance sheet: fair value",
                "Unrealized gains and losses: OCI, then RECYCLED to profit on sale",
                "Interest income (effective interest) in profit",
                "Equity: IFRS allows an irrevocable FVOCI election, with NO recycling, dividends still in profit",
                "US GAAP name for the debt version: available-for-sale",
              ],
            },
            {
              title: "Fair value through profit or loss (FVPL)",
              tone: "amber",
              points: [
                "Everything else: trading, debt that fails SPPI, and equity by default",
                "Balance sheet: fair value",
                "Unrealized gains and losses: profit, immediately",
                "Interest and dividends in profit",
                "US GAAP: trading debt securities, and all equity securities with readily determinable fair values (fair value through net income)",
              ],
            },
          ],
        },
        {
          t: "tree",
          title: "Classify a financial asset under IFRS 9",
          root: "kind",
          nodes: {
            kind: { q: "Is the investment a debt instrument or an equity instrument?", options: [{ label: "Debt", next: "sppi" }, { label: "Equity", next: "trade" }] },
            sppi: { q: "Are the contractual cash flows solely payments of principal and interest (SPPI)?", help: "A plain bond passes. A convertible bond or a note whose payoff tracks an equity index fails.", options: [{ label: "Yes", next: "bm" }, { label: "No", next: "fvpl" }] },
            bm: {
              q: "What is the business model for managing it?",
              options: [
                { label: "Hold to collect contractual cash flows", next: "ac" },
                { label: "Hold to collect and sell", next: "fvoci" },
                { label: "Trading, or managed on a fair value basis", next: "fvpl" },
              ],
            },
            trade: { q: "Is the equity investment held for trading?", options: [{ label: "Yes", next: "fvpl" }, { label: "No", next: "elect" }] },
            elect: { q: "At initial recognition, did the company make the irrevocable election to present fair value changes in OCI?", options: [{ label: "Yes", next: "eqoci" }, { label: "No", next: "fvpl" }] },
            ac: { result: "Amortized cost", tone: "green", html: "Unless the company uses the fair value option to remove an accounting mismatch, which designates it at FVPL instead." },
            fvoci: { result: "FVOCI (debt): gains recycled on sale", tone: "cyan", html: "Fair value on the balance sheet, interest in profit, unrealized gains and losses in OCI, reclassified to profit when sold." },
            eqoci: { result: "FVOCI (equity election): no recycling", tone: "cyan", html: "Fair value changes go to OCI and stay in equity forever; on sale the cumulative amount may be transferred within equity to retained earnings. Dividends still go to profit." },
            fvpl: { result: "Fair value through profit or loss", tone: "amber", html: "Every fair value change hits profit immediately." },
          },
        },
        { t: "theater", scenario: "lm10-debt-three-ways" },
        {
          t: "callout",
          tone: "insight",
          title: "The one-sentence summary",
          html: "Classification never changes the TOTAL income a security produces over its life. It changes WHEN that income is recognized and WHETHER it passes through net income or OCI on the way to equity.",
        },
        {
          t: "h",
          text: "Amortized cost with a discount: the effective interest method",
        },
        {
          t: "p",
          html: `<p>The theater used a bond bought at par to keep the picture clean. Bonds bought at a discount or premium need one more idea. Suppose Pinnacle pays 956.71 for a five-year, 4% annual-coupon, 1,000 par bond because the market yield is 5%. Pinnacle will receive 40 a year plus 1,000 at maturity, so it is going to earn 5% a year on what it paid, not 4%.</p>
<p>The effective interest method books exactly that 5%: interest income is the carrying amount times the market yield at purchase. Year one income is \\(956.71 \\times 5\\% = 47.84\\). Only 40 arrives as cash; the other 7.84 is added to the bond's carrying amount (the discount amortizes). Next year the carrying amount is \\(956.71 + 7.84 = 964.55\\) and interest income is \\(964.55 \\times 5\\% = 48.23\\). By maturity the carrying amount has climbed to exactly 1,000. A premium bond works in reverse: interest income is below the coupon and the carrying amount falls toward par.</p>`,
        },
        {
          t: "formula",
          name: "Effective interest method",
          tex: "\\text{Interest income}_t = \\text{Carrying amount}_{t-1} \\times r_{\\text{purchase}};\\quad \\text{Amortization}_t = \\text{Interest income}_t - \\text{Coupon}_t",
          plain: "Income is the yield you locked in when you bought, applied to what the asset is carried at. The gap between that income and the cash coupon moves the carrying amount toward par.",
        },
        { t: "theater", scenario: "lm10-equity-securities" },
        {
          t: "callout",
          tone: "gaap",
          title: "IFRS vs US GAAP",
          html: `<p><b>Debt.</b> The categories line up: amortized cost is held-to-maturity, FVOCI debt is available-for-sale, FVPL is trading. Available-for-sale gains are recycled to net income on sale, just like FVOCI debt.</p>
<p><b>Equity.</b> US GAAP has no OCI option for equity: equity securities with readily determinable fair values go through net income (the old available-for-sale category for equity is gone). IFRS lets a company elect FVOCI for equity not held for trading, and then never recycles.</p>`,
        },
        {
          t: "p",
          html: `<p><b>Reclassification.</b> Under IFRS 9, debt investments are reclassified only when the business model for managing them changes, which should be rare, and the change is applied prospectively. Equity investments are never reclassified, and the FVOCI equity election is irrevocable. This matters to an analyst because a reclassification can move a lump of unrealized gain into or out of profit without anything economic happening.</p>
<p><b>Impairment.</b> Debt at amortized cost or FVOCI carries a loss allowance for expected credit losses under IFRS 9, so a deteriorating borrower shows up in profit before any default. Assets at FVPL need no separate impairment test: the fall in fair value already went through profit.</p>`,
        },
        {
          t: "check",
          id: "lm10-fa-1",
          q: "Bond prices fall during the year. Which classification reports the LOWEST net income for the year, all else equal?",
          options: ["Amortized cost", "Fair value through OCI", "Fair value through profit or loss"],
          answer: 2,
          why: "Only FVPL puts unrealized losses through net income. FVOCI records the loss in OCI (equity falls, net income does not), and amortized cost ignores it.",
        },
        {
          t: "check",
          id: "lm10-fa-2",
          q: "Pinnacle holds equity shares under the IFRS 9 FVOCI election. It sells them at a cumulative gain of 60. What happens to net income on the sale date?",
          options: ["Net income rises by 60 as the gain is recycled", "Net income does not change", "Net income rises by 60 and OCI rises by 60"],
          answer: 1,
          why: "Equity at FVOCI is never recycled. The 60 stays in equity and may be transferred from accumulated OCI to retained earnings, which leaves net income untouched.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "associates",
      title: "Investments in associates: the equity method",
      los: ["a", "b", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>Now Pinnacle owns 30% of Kestrel and sits on its board. Why not just carry the stake at fair value like the 4% holding?</p>
<p>Kestrel may not be listed, so there may be no price to mark to. More important, Pinnacle can influence Kestrel's dividend policy. If Pinnacle recognized income only when dividends arrived (the old cost method), it could manufacture profit in a bad year by voting for a big dividend. The income would reflect Pinnacle's influence over the payout, not Kestrel's performance.</p>
<p>The equity method fixes that by recognizing Pinnacle's share of Kestrel's <b>earnings</b> as they are earned, whatever is paid out. It is often called one-line consolidation: Pinnacle's share of everything Kestrel owns and owes, net, sits in a single asset line, and Pinnacle's share of Kestrel's profit sits in a single income statement line.</p>`,
        },
        {
          t: "steps",
          title: "The equity method in four moves",
          items: [
            { title: "Initial recognition", html: "Record the investment at cost: what Pinnacle paid." },
            { title: "Share of profit", html: "Each period, add the investor's percentage of the investee's net income to the investment and to income (subtract for losses)." },
            { title: "Dividends", html: "Dividends received REDUCE the investment and increase cash. They are not income: they return part of profit already recognized." },
            { title: "Excess purchase price", html: "If Pinnacle paid more than its share of book value, allocate the excess to fair value step-ups on identifiable assets (depreciated or amortized, reducing equity income) and to goodwill (not amortized)." },
          ],
        },
        { t: "theater", scenario: "lm10-equity-method" },
        {
          t: "formula",
          name: "Ending carrying amount of an equity-method investment",
          tex: "\\text{Investment}_{end} = \\text{Cost} + s \\times \\text{NI}_{\\text{investee}} - s \\times \\text{Dividends}_{\\text{investee}} - \\text{Amortization of excess}",
          plain: "s is the ownership share. With Pinnacle's numbers: 300 + 30 - 12 - 3 = 315.",
        },
        {
          t: "formula",
          name: "Equity income",
          tex: "\\text{Equity income} = s \\times \\text{NI}_{\\text{investee}} - \\text{Amortization of fair value step-ups} - s \\times \\text{Unrealized intercompany profit}",
          plain: "The investor's share of profit, corrected for the extra depreciation the investor 'paid for' and for profit it has not yet earned from outsiders.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "Classic trap",
          html: "Treating dividends from an associate as income. Under the equity method, dividends reduce the investment. If a vignette asks for equity income, the dividend is irrelevant to the answer; if it asks for the ending investment balance, the dividend is subtracted.",
        },
        {
          t: "h",
          text: "Transactions between investor and associate",
        },
        {
          t: "p",
          html: `<p>When Pinnacle sells goods to Kestrel (a <b>downstream</b> sale) or Kestrel sells goods to Pinnacle (an <b>upstream</b> sale), part of the profit is the group trading with itself. Until the goods are sold to an outside customer, the investor's share of that profit has not been earned. Under the equity method the investor defers its proportionate share of the unrealized profit, for both downstream and upstream sales, by reducing equity income and the investment. It recognizes that profit later, when the buyer sells the goods on.</p>`,
        },
        { t: "theater", scenario: "lm10-unrealized-profit" },
        {
          t: "h",
          text: "Losses, impairment and the fair value option",
        },
        {
          t: "p",
          html: `<p><b>Losses.</b> If the associate makes losses, the investment falls. It stops at zero: the investor does not carry a negative investment unless it has guaranteed the associate's debts or committed to fund it. Further losses are tracked off the books and recovered against later profits before the investor recognizes income again.</p>
<p><b>Impairment.</b> Both standards require the investment to be reviewed for impairment. IFRS recognizes a loss when there is objective evidence of a loss event and the recoverable amount is below the carrying amount. US GAAP recognizes a loss when fair value is below carrying amount and the decline is other than temporary. The goodwill embedded in the investment is not tested separately: the whole investment is tested as one asset.</p>
<p><b>Reversal.</b> Here the standards split. US GAAP prohibits reversing the impairment loss, even if fair value later recovers. IFRS permits a reversal, in line with IAS 36, to the extent that the recoverable amount of the net investment subsequently increases, and only if the estimates used to determine that recoverable amount have changed since the loss was recognized.</p>
<p><b>Fair value option.</b> US GAAP lets an investor elect fair value for an equity-method investment, with changes through profit. IFRS restricts that choice to venture capital organizations, mutual funds, unit trusts and similar entities.</p>`,
        },
        {
          t: "callout",
          tone: "trap",
          title: "Old study material gets this wrong",
          html: "Older printings of the curriculum, and notes copied from them, say that neither standard permits reversing an impairment of an equity-method investment. CFA Institute's errata deleted that sentence: the current reading says US GAAP prohibits the reversal and IFRS permits it. Goodwill is different: a goodwill impairment is never reversed under either standard.",
        },
        {
          t: "callout",
          tone: "exam",
          title: "What the analyst does with the equity method",
          html: `<p>Equity income is not cash: only the dividends are. A company with large equity income can report healthy net income and weak operating cash flow. Equity income also sits below operating profit in many presentations, so it inflates net margin without any revenue behind it. And the associate's debt never appears on the investor's balance sheet, so leverage looks lower than the economic exposure. When comparing companies, analysts often strip equity income and the investment out of the ratios, or build a proportionate view.</p>`,
        },
        {
          t: "check",
          id: "lm10-eq-1",
          q: "Pinnacle owns 25% of an associate that earns 400 and pays dividends of 160. Pinnacle paid book value, so there is no excess to amortize. What does Pinnacle record as equity income?",
          options: ["40", "100", "60"],
          answer: 1,
          why: "Equity income is 25% of the associate's net income: 0.25 x 400 = 100. The 40 of dividends Pinnacle receives (25% x 160) reduces the investment and is not income.",
        },
        {
          t: "check",
          id: "lm10-eq-2",
          q: "Pinnacle buys 40% of an associate for 520 when its book value is 1,000. The associate's equipment is worth 150 more than book and has 5 years of life left. The associate earns 200. What is Pinnacle's equity income for the year?",
          options: ["68", "80", "56"],
          answer: 0,
          why: "Share of profit is 40% x 200 = 80. The excess paid for equipment is 40% x 150 = 60, depreciated over 5 years = 12 a year. Equity income = 80 - 12 = 68. The remaining excess, 520 - 400 - 60 = 60, is goodwill and is not amortized.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "joint-ventures",
      title: "Joint ventures: control that nobody has alone",
      los: ["a", "b"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle and a rival each own half of a battery plant. Neither can decide anything important without the other. Consolidating 100% would be wrong (Pinnacle does not control it) and so would treating it as a passive stake (Pinnacle is far more than an investor). This is <b>joint control</b>: the contractually agreed sharing of control, where decisions about the relevant activities require the unanimous consent of the parties sharing control.</p>
<p>IFRS 11 then asks what the arrangement gives each party. If the parties have rights to the <b>net assets</b> of a separate vehicle, it is a <b>joint venture</b> and each venturer uses the equity method. If the parties have rights to specific <b>assets</b> and obligations for specific <b>liabilities</b>, it is a <b>joint operation</b> and each party recognizes its own share of those assets, liabilities, revenues and expenses.</p>`,
        },
        {
          t: "table",
          caption: "Joint arrangements",
          head: ["", "IFRS", "US GAAP"],
          rows: [
            ["Joint venture", "Equity method. Proportionate consolidation is not permitted.", "Equity method. The curriculum (2026 errata) says proportionate consolidation is not permitted for joint ventures; a narrow industry exception for unincorporated entities is beyond the curriculum."],
            ["Joint operation", "Recognize own share of assets, liabilities, revenues and expenses", "Not a separately defined category in the same way"],
          ],
        },
        {
          t: "p",
          html: `<p>Proportionate consolidation (bringing in 50% of each line) still matters for the exam because analysts use it as an <b>adjustment</b>: it shows what the investor's balance sheet looks like if you count its share of the venture's assets and debts. The comparison scenario in the "methods and ratios" section below shows all three side by side.</p>`,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "business-combinations",
      title: "Business combinations: the acquisition method",
      los: ["a", "b", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle pays 800 for 80% of Kestrel and now runs it. Kestrel's customers, factories, debts and staff are now Pinnacle's to manage, so a reader of Pinnacle's statements needs to see them. The acquisition method does exactly that: it combines 100% of the subsidiary's assets, liabilities, revenues and expenses with the parent's, line by line, from the acquisition date. Everything Pinnacle does not own (the other 20%) is shown as a single equity line, the <b>non-controlling interest</b> (NCI).</p>
<p>A business combination can take three legal forms: a <b>merger</b> (the acquirer absorbs the target, which ceases to exist), an <b>acquisition</b> (the target survives as a subsidiary, as Kestrel does here), or a <b>consolidation</b> (both combine into a brand new entity). The accounting is the acquisition method in every case: IFRS 3 and US GAAP ASC 805 both prohibit the old pooling of interests method.</p>`,
        },
        {
          t: "steps",
          title: "The acquisition method",
          items: [
            { title: "Identify the acquirer", html: "The entity that obtains control." },
            { title: "Measure identifiable assets and liabilities at fair value", html: "Including intangibles the target never recognized (customer lists, brands, in-process research and development) and contingent liabilities that meet the recognition criteria." },
            { title: "Measure the NCI", html: "At fair value (full goodwill), or under IFRS optionally at its proportionate share of identifiable net assets (partial goodwill)." },
            { title: "Measure the consideration and goodwill", html: "Goodwill = consideration transferred + NCI + fair value of any previously held interest - fair value of identifiable net assets. A negative result is a bargain purchase: reassess the numbers, then recognize the gain in profit immediately." },
          ],
        },
        { t: "theater", scenario: "lm10-consolidation-worksheet" },
        {
          t: "formula",
          name: "Goodwill",
          tex: "\\text{Goodwill} = \\text{Consideration} + \\text{NCI} - \\text{FV of identifiable net assets}",
          plain: "Full goodwill uses the NCI at fair value; partial goodwill uses the NCI at its share of identifiable net assets, so partial goodwill is the parent's share only.",
        },
        {
          t: "table",
          caption: "Kestrel: full vs partial goodwill",
          head: ["", "Full goodwill", "Partial goodwill"],
          rows: [
            ["Price paid for 80%", "800", "800"],
            ["NCI", "Fair value: 200", "20% x 800 = 160"],
            ["Fair value of identifiable net assets", "(800)", "(800)"],
            ["Goodwill", "200", "160"],
            ["Allowed under", "IFRS and US GAAP (US GAAP requires it)", "IFRS only"],
          ],
        },
        { t: "theater", scenario: "lm10-full-vs-partial-goodwill" },
        {
          t: "h",
          text: "The details that turn into exam questions",
        },
        {
          t: "table",
          head: ["Item", "Treatment (both standards unless noted)"],
          rows: [
            ["Acquisition-related costs (advisers, lawyers)", "Expensed as incurred. Never added to goodwill."],
            ["Contingent consideration (earn-outs)", "Recognized at fair value at the acquisition date as part of the price, so it is inside the goodwill calculation. If classified as a liability, remeasured each period with changes in profit; if equity, not remeasured. Later changes go to profit, not goodwill, because they reflect events after the acquisition date rather than what was bought on that date."],
            ["Contingent liabilities of the target", "The curriculum states one rule: the acquirer must recognize any contingent liability it assumes if 1) it is a present obligation that arises from past events and 2) it can be measured reliably, even if the target never recognized it (a potential warranty obligation, for example). Under IFRS 3 this applies even when an outflow is not probable, a lower bar than outside a business combination. Technical detail beyond the curriculum: ASC 805 recognizes such liabilities at fair value if that can be determined during the measurement period, and otherwise only if a loss is probable and reasonably estimable."],
            ["In-process research and development", "Recognized as a separate intangible asset at fair value."],
            ["Restructuring costs the acquirer plans", "Not part of the acquisition accounting: expensed later when incurred (unless the target already had the obligation)."],
            ["Bargain purchase", "Gain recognized in profit at the acquisition date, after reassessing the fair values."],
            ["Intercompany transactions after acquisition", "Eliminated in FULL (100%) on consolidation, unlike the equity method's proportionate elimination."],
          ],
        },
        {
          t: "h",
          text: "Goodwill impairment",
        },
        {
          t: "p",
          html: `<p>Goodwill is never amortized under either standard. Instead it is tested for impairment at least annually. Both standards now use one quantitative comparison, but they differ in the unit tested, the measure of value, whether a qualitative shortcut is allowed, and above all whether the loss can go beyond goodwill. The same facts can produce very different losses.</p>`,
        },
        { t: "theater", scenario: "lm10-goodwill-impairment" },
        {
          t: "compare",
          items: [
            {
              title: "IFRS (IAS 36)",
              tone: "accent",
              points: [
                "Goodwill allocated to cash-generating units (CGUs)",
                "Tested at least annually, and whenever there is an indication of impairment; no qualitative bypass",
                "Loss = carrying amount of the CGU - recoverable amount",
                "Recoverable amount = higher of fair value less costs of disposal and value in use",
                "Loss reduces goodwill first, then the CGU's other assets pro rata, so it CAN exceed goodwill",
                "Goodwill impairment is never reversed",
              ],
            },
            {
              title: "US GAAP (ASC 350, per the 2026 curriculum errata)",
              tone: "purple",
              points: [
                "Goodwill allocated to reporting units",
                "Optional qualitative assessment first: if fair value is more likely than not (above 50%) greater than carrying amount, stop",
                "Otherwise one quantitative test: loss = carrying amount of the reporting unit (incl. goodwill) - its fair value",
                "The loss is LIMITED to the goodwill allocated to the reporting unit",
                "Never reversed",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "trap",
          title: "Old two-step test: do not use it",
          html: "Older printings of the curriculum, and many prep notes and question banks, teach a two-step US GAAP test that measures the loss through 'implied goodwill'. CFA Institute's 2026 Level II errata (17 February 2026) replaced that text, the worked example and the summary with the one-step test above (US GAAP's ASU 2017-04). If your book or a practice question shows two steps, it predates the errata.",
        },
        {
          t: "check",
          id: "lm10-gw-1",
          q: "A unit carries 2,000 including goodwill of 300. Its fair value, and its recoverable amount, is 1,550. The impairment loss is:",
          options: ["450 under IFRS and 300 under US GAAP", "300 under both standards", "450 under both standards"],
          answer: 0,
          why: "The shortfall is 2,000 - 1,550 = 450. IFRS charges all of it: 300 to goodwill, then 150 to the unit's other assets. US GAAP caps the goodwill impairment at the 300 of goodwill allocated to the unit.",
        },
        {
          t: "check",
          id: "lm10-bc-1",
          q: "Pinnacle pays 900 for 75% of a target whose identifiable net assets have a fair value of 1,000. The fair value of the 25% NCI is 280. Under the partial goodwill method, goodwill is:",
          options: ["150", "180", "100"],
          answer: 0,
          why: "Partial goodwill = price paid - parent's share of identifiable net assets = 900 - 75% x 1,000 = 150. Full goodwill would be 900 + 280 - 1,000 = 180.",
        },
        {
          t: "check",
          id: "lm10-bc-2",
          q: "Immediately after an acquisition, which statement about consolidated equity is correct?",
          options: [
            "It includes the subsidiary's pre-acquisition retained earnings",
            "It includes the parent's equity plus the non-controlling interest",
            "It excludes the non-controlling interest, which is a liability",
          ],
          answer: 1,
          why: "The elimination entry removes the subsidiary's pre-acquisition equity. What remains is the parent's own equity plus the NCI, and the NCI is presented within equity under both IFRS and US GAAP.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "spe-vie",
      title: "Special purpose and variable interest entities",
      los: ["a", "b", "c"],
      blocks: [
        {
          t: "p",
          html: `<p>A special purpose entity (SPE) is a legal shell created for one narrow job: holding leased assets, buying a company's receivables, funding a project. Its owners on paper often hold almost no equity, sometimes a sliver of it, while the sponsoring company designs the structure, guarantees the debt, or takes the first losses.</p>
<p>That is exactly why a voting-shares test fails. If Pinnacle holds 0% of the SPE's votes but absorbs most of its losses, a "no control, no consolidation" rule would let Pinnacle keep the SPE's debt off its balance sheet while bearing its risk. Enron is the case everyone remembers.</p>
<p>So both standards look through the votes. Under <b>IFRS 10</b> the general control model applies: does Pinnacle have power over the relevant activities, exposure to variable returns, and the ability to use that power to affect those returns? Under <b>US GAAP</b>, an entity whose equity at risk is too small to finance it, or whose equity holders lack the usual rights, is a <b>variable interest entity</b> (VIE). It is consolidated by its <b>primary beneficiary</b>: the party with the power to direct the activities that most significantly affect the VIE's performance AND the obligation to absorb its losses or the right to receive its benefits. The curriculum also describes the primary beneficiary in risk-and-reward terms: the party that absorbs the majority of the VIE's expected losses, receives the majority of its expected residual returns, or both. In a vignette, look for the party that guarantees the vehicle's debt or holds its first-loss piece.</p>`,
        },
        { t: "theater", scenario: "lm10-spe-securitization" },
        {
          t: "callout",
          tone: "exam",
          title: "What changes when the SPE is consolidated",
          html: "Assets and liabilities both rise, so leverage ratios worsen. Cash raised through the SPE is financing, not operating, so cash from operations is lower than under sale accounting. Analysts reverse sale accounting when the sponsor keeps the risk.",
        },
        {
          t: "check",
          id: "lm10-spe-1",
          q: "A company securitizes receivables through an SPE it must consolidate. Compared with sale treatment, at the transfer date the company reports:",
          options: ["Higher cash from operations and lower debt", "Lower cash from operations and higher debt", "The same cash from operations and higher debt"],
          answer: 1,
          why: "Consolidated, the receivables stay on the balance sheet and the cash received is a borrowing: a financing inflow plus a new liability. Sale treatment would have shown an operating inflow and no debt.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "disclosures",
      title: "Disclosures: what the notes give back",
      los: ["a", "b"],
      blocks: [
        {
          t: "p",
          html: `<p>Every method above compresses something. The equity method hides an associate's revenue and debt inside one line; consolidation hides which assets came from the acquisition; amortized cost hides the market price. Both IFRS and US GAAP require notes that let a reader undo some of that compression, and an analyst who wants a comparable picture across companies starts there.</p><p>The table below is an analyst-level summary of what the notes add for each kind of investment. It is not a list the curriculum asks you to memorize, so do not spend time learning disclosure requirements item by item.</p>`,
        },
        {
          t: "table",
          caption: "Where to look in the notes",
          head: ["Investment", "What the notes add", "What the analyst does with it"],
          rows: [
            ["Financial assets", "Carrying amounts by category (FVPL, FVOCI, amortized cost), the fair value of assets carried at amortized cost, and the level of the fair value hierarchy behind each measurement (quoted prices, observable inputs, or unobservable inputs)", "Judge how much of income and equity rests on model-based values, and restate income as if a different classification had been used"],
            ["Associates and joint ventures", "The judgments behind significant influence or joint control (for example a stake below 20% treated as an associate) and summarized financial information of material investees", "Build a proportionate view: add back the share of revenue, assets and debt the single line hides"],
            ["Business combinations", "Consideration paid, the fair values assigned to the main classes of assets and liabilities, goodwill, how the NCI was measured, acquisition-related costs, and the acquiree's results since the acquisition date", "Separate acquired growth from organic growth, and see how much of the price is goodwill rather than identifiable assets"],
            ["Special purpose and variable interest entities", "The nature of the involvement, the assets and liabilities of consolidated vehicles, and the maximum exposure to loss from vehicles that are not consolidated", "Decide whether an off-balance-sheet vehicle belongs back on the balance sheet for leverage analysis"],
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "How disclosure shows up in an item set",
          html: "Exam questions on disclosure test what an analyst does with the information, not whether you can recite what a standard requires. Expect to use a note: add back an associate's share of debt for leverage, separate acquired revenue growth from organic growth, or put an unconsolidated vehicle back on the balance sheet. The right-hand column of the table is the part to know.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "methods-ratios",
      title: "Methods and ratios: same profit, different picture",
      los: ["c"],
      blocks: [
        {
          t: "p",
          html: `<p>This is where Level II item sets live. Take one investee and account for it three ways. Net income attributable to the parent is the same every time (given the same assumptions), because each method recognizes the parent's share of the investee's profit. What changes is how many revenue, expense, asset and liability lines that profit arrives through, and therefore every ratio built from those lines.</p>`,
        },
        { t: "theater", scenario: "lm10-three-methods" },
        {
          t: "table",
          caption: "Direction of effects relative to each other (assuming the investee is profitable and has liabilities)",
          head: ["Item", "Equity method", "Proportionate consolidation", "Acquisition method"],
          rows: [
            ["Revenue", "Lowest", "Middle", "Highest"],
            ["Total assets and liabilities", "Lowest", "Middle", "Highest"],
            ["Net income to parent", "Same", "Same", "Same"],
            ["Equity", "Parent only", "Parent only", "Parent + NCI (highest)"],
            ["Net profit margin", "Highest", "Middle", "Lowest"],
            ["Return on assets", "Highest", "Middle", "Lowest"],
            ["Leverage (liabilities to equity)", "Lowest", "Middle", "Highest (the NCI added to equity only partly offsets the extra liabilities)"],
          ],
          note: "The acquisition method brings in ALL of the investee's liabilities but adds only the NCI to equity, so leverage still ends highest in the usual case. In the theater above, liabilities to equity is 0.44x, 0.53x and 0.54x.",
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why the margins move the way they do",
          html: "Net profit margin is net income over revenue. The numerator is fixed across methods, but the equity method brings in zero revenue from the investee, proportionate brings in the share, and acquisition brings in all of it. A bigger denominator with the same numerator means a lower margin. ROA follows the same logic with total assets.",
        },
        {
          t: "check",
          id: "lm10-mr-1",
          q: "Compared with the equity method, consolidating a profitable investee with significant debt will most likely:",
          options: ["Increase net profit margin", "Decrease return on assets", "Increase net income attributable to the parent"],
          answer: 1,
          why: "Consolidation adds all of the investee's assets while net income attributable to the parent is unchanged, so ROA falls. Margins fall too, because revenue rises with the same parent net income.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "Dividends from an associate are income to the investor.", right: "They reduce the carrying amount of the investment. The investor already recognized its share of the associate's profit; the dividend only converts some of it into cash." },
    { wrong: "Owning 20% or more always means the equity method.", right: "20% is a rebuttable presumption. Substance decides: a stake below 20% with board seats and technological dependency gets the equity method; a 30% stake blocked by a dominant owner may not." },
    { wrong: "Unrealized gains on FVOCI equity are recycled to profit when the shares are sold, like FVOCI debt.", right: "Only debt at FVOCI recycles. The IFRS 9 equity election never recycles; the cumulative gain can only be transferred within equity." },
    { wrong: "The acquisition method gives higher net income than the equity method because it brings in all of the subsidiary's profit.", right: "Consolidated net income includes 100%, but the NCI's share is then allocated out. Net income attributable to the parent equals what the equity method would report." },
    { wrong: "The non-controlling interest is a liability.", right: "Under both IFRS and US GAAP the NCI is presented within equity, separately from the parent's equity." },
    { wrong: "Acquisition costs paid to advisers are capitalized into goodwill.", right: "They are expensed as incurred under both IFRS 3 and US GAAP." },
    { wrong: "Under the equity method, intercompany profit is eliminated in full.", right: "Only the investor's proportionate share is eliminated, for both upstream and downstream sales. Full (100%) elimination is the consolidation rule." },
    { wrong: "Full goodwill gives higher return on assets because the company reports more goodwill.", right: "More goodwill means more assets and more equity with the same net income, so ROA and ROE are LOWER under full goodwill." },
    { wrong: "Goodwill impairment reverses if the cash-generating unit recovers.", right: "Goodwill impairment is never reversed, under either standard." },
  ],

  gaap: [
    { topic: "Debt investments", ifrs: "Amortized cost, FVOCI (recycled), FVPL, via business model and SPPI tests", usgaap: "Held-to-maturity, available-for-sale (recycled), trading" },
    { topic: "Equity investments (no significant influence)", ifrs: "FVPL, or irrevocable FVOCI election with no recycling", usgaap: "Fair value through net income (no OCI option)" },
    { topic: "Fair value option for associates", ifrs: "Only venture capital organizations, mutual funds, unit trusts and similar entities", usgaap: "Available to any investor" },
    { topic: "Impairment of equity-method investment", ifrs: "Objective evidence of a loss event; recoverable amount below carrying amount; reversal permitted to the extent the recoverable amount later increases", usgaap: "Fair value below carrying amount and decline other than temporary; no reversal" },
    { topic: "Joint ventures", ifrs: "Equity method; joint operations recognize their own share", usgaap: "Equity method; the curriculum treats proportionate consolidation as not permitted" },
    { topic: "NCI measurement", ifrs: "Fair value (full goodwill) or proportionate share of identifiable net assets (partial goodwill)", usgaap: "Fair value (full goodwill) only" },
    { topic: "Goodwill impairment", ifrs: "One quantitative test at the cash-generating unit: carrying amount vs recoverable amount; loss hits goodwill first, then other assets, so it can exceed goodwill", usgaap: "Optional qualitative screen, then one quantitative test at the reporting unit: carrying amount vs fair value; loss capped at the unit's goodwill (2026 errata)" },
    { topic: "Special purpose entities", ifrs: "IFRS 10 single control model", usgaap: "Variable interest entity model: the primary beneficiary consolidates" },
  ],

  formulas: [
    { name: "Equity income", tex: "s \\times \\text{NI}_{\\text{investee}} - \\text{amortization of excess} - s \\times \\text{unrealized intercompany profit}", plain: "Share of profit, corrected for the step-up depreciation and unearned intercompany profit." },
    { name: "Equity-method investment", tex: "\\text{Cost} + \\text{equity income} - s \\times \\text{dividends}", plain: "Profit adds to the investment; dividends take out of it." },
    { name: "Goodwill (acquisition method)", tex: "\\text{Consideration} + \\text{NCI} - \\text{FV of identifiable net assets}", plain: "NCI at fair value gives full goodwill; NCI at its share of net assets gives partial goodwill." },
    { name: "Partial goodwill", tex: "\\text{Consideration} - s \\times \\text{FV of identifiable net assets}", plain: "The parent's goodwill only." },
    { name: "NCI share of profit", tex: "(1-s) \\times (\\text{NI}_{\\text{sub}} - \\text{extra depreciation of step-ups})", plain: "The minority's share of the subsidiary's profit as the group measures it." },
    { name: "Goodwill impairment loss", tex: "\\text{IFRS: } CA_{CGU} - RA_{CGU}\\ \\text{(goodwill first, then other assets)};\\quad \\text{US GAAP: } \\min\\left(CA_{RU} - FV_{RU},\\; \\text{Goodwill}_{RU}\\right)", plain: "CA is carrying amount, RA recoverable amount, FV fair value; CGU is the cash-generating unit, RU the reporting unit. Only US GAAP caps the loss at goodwill." },
  ],

  recall: [
    { q: "Name five indicators of significant influence.", a: "Board representation; participation in policy-making including dividends; material transactions between the companies; interchange of managerial personnel; technological dependency." },
    { q: "What are the two IFRS 9 tests for a debt investment?", a: "The business model test (hold to collect, hold to collect and sell, or other) and the contractual cash flow (SPPI) test." },
    { q: "Under the equity method, what happens to the investment when the associate pays a dividend?", a: "It decreases by the investor's share of the dividend; cash increases by the same amount; income is unaffected." },
    { q: "What does the elimination entry on consolidation remove?", a: "The parent's investment account and the subsidiary's pre-acquisition equity. It also records fair value step-ups, goodwill and the NCI." },
    { q: "Why is NI attributable to the parent the same under the equity method and consolidation?", a: "Both recognize the parent's share of the subsidiary's profit, measured on the same fair-value basis. Consolidation shows all lines and then allocates the NCI's share out." },
    { q: "When does US GAAP require consolidation of a VIE?", a: "When the company is the primary beneficiary: it has the power to direct the activities that most significantly affect the VIE's performance and the obligation to absorb losses or right to receive benefits that could be significant." },
  ],

  itemSets: [
    {
      id: "lm10-is1",
      title: "Pinnacle and Kestrel",
      vignette: `<p>On 1 January, Pinnacle Corp acquired 30% of Kestrel Ltd for 450 in cash and obtained two of seven seats on Kestrel's board. At that date Kestrel's book value of net assets was 1,200. Kestrel's only asset with a fair value different from book value was a building, worth 200 more than its carrying amount, with a remaining useful life of 20 years. Any remaining excess is attributable to goodwill.</p>
<p>During the year Kestrel reported net income of 300 and paid dividends of 100. Pinnacle also sold inventory to Kestrel for 120 that had cost Pinnacle 80; at year end Kestrel still held one quarter of that inventory. Pinnacle reports under IFRS.</p>`,
      questions: [
        {
          q: "The goodwill embedded in Pinnacle's investment at acquisition is closest to:",
          options: ["30", "90", "50"],
          answer: 0,
          why: "Price 450 - 30% of book value (360) = 90 excess. Of that, 30% x 200 = 60 relates to the building. Goodwill = 90 - 60 = 30.",
        },
        {
          q: "Pinnacle's equity income from Kestrel for the year is closest to:",
          options: ["87", "84", "90"],
          answer: 1,
          why: "Share of profit 30% x 300 = 90. Less building step-up depreciation 60 / 20 = 3. Less unrealized profit: (120 - 80) x 25% still held x 30% = 3. Equity income = 90 - 3 - 3 = 84.",
        },
        {
          q: "The carrying amount of the investment at year end is closest to:",
          options: ["504", "534", "474"],
          answer: 0,
          why: "450 + 84 equity income - 30% x 100 dividends = 450 + 84 - 30 = 504.",
        },
        {
          q: "If Pinnacle had instead obtained control of Kestrel and consolidated it, Pinnacle's net profit margin would most likely be:",
          options: ["Higher, because consolidated net income is larger", "Lower, because revenue rises while profit attributable to Pinnacle is broadly unchanged", "Unchanged, because the parent's share of profit is the same"],
          answer: 1,
          why: "Consolidation brings in all of Kestrel's revenue while net income attributable to Pinnacle stays essentially the same, so the margin falls.",
        },
      ],
    },
    {
      id: "lm10-is2",
      title: "An acquisition with a non-controlling interest",
      vignette: `<p>Pinnacle acquires 60% of Osprey AG for 1,800 in cash. Osprey's identifiable net assets have a book value of 2,000 and a fair value of 2,500. An independent valuation puts the fair value of the 40% non-controlling interest at 1,150. Pinnacle paid 40 in legal and advisory fees. Pinnacle reports under IFRS and is considering both NCI measurement options.</p>`,
      questions: [
        {
          q: "Goodwill under the full goodwill method is closest to:",
          options: ["450", "300", "490"],
          answer: 0,
          why: "Full goodwill = consideration + NCI at fair value - FV of identifiable net assets = 1,800 + 1,150 - 2,500 = 450. The 40 of fees is expensed, not added.",
        },
        {
          q: "Goodwill under the partial goodwill method is closest to:",
          options: ["300", "450", "340"],
          answer: 0,
          why: "Partial goodwill = 1,800 - 60% x 2,500 = 1,800 - 1,500 = 300. The NCI would be 40% x 2,500 = 1,000.",
        },
        {
          q: "Compared with partial goodwill, the full goodwill method will most likely result in:",
          options: ["Higher return on equity", "Lower total assets", "Lower return on assets"],
          answer: 2,
          why: "Full goodwill adds 150 more goodwill (and 150 more NCI) with no change in net income, so total assets are higher and ROA is lower. ROE is also lower because equity includes the larger NCI.",
        },
        {
          q: "The 40 of legal and advisory fees will:",
          options: ["Increase goodwill", "Reduce net income in the year of acquisition", "Reduce the fair value of identifiable net assets"],
          answer: 1,
          why: "Acquisition-related costs are expensed as incurred under IFRS 3 and US GAAP.",
        },
      ],
    },
  ],

  flags: [],
};
