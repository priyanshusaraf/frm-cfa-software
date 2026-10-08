/* LM14 Evaluating Quality of Financial Reports.
   Demo cast (all fictional): Halcyon Appliances (channel stuffing), Corvid
   Networks (capitalized costs), Meridian Tools (big bath and cookie jar),
   Oakridge Retail (window-dressed cash flow), Granite Works (big bath
   impairment), Tasman Freight (stretched useful lives). Widgets add Steadfast
   Brewing and Gilded Gadgets (accruals), Vantor Systems and Clearwater
   Supplies (Beneish), and Lumen Devices, Northgate Logistics and Crestline
   Foods (the red flag game). Real-company cases (LOS h) are illustrations
   from public records (SEC filings and press), not the curriculum's own
   case text. */
export default {
  id: "lm14",
  num: 14,
  title: "Evaluating Quality of Financial Reports",
  short: "Quality of financial reports",
  tagline:
    "Every profit figure is a mix of cash and judgment. This module teaches you to tell how much is judgment, whose judgment it is, and which way it leans.",
  minutes: 240,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "framework",
      title: "Two different questions: is the report honest, and are the earnings any good?",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>You are a credit analyst at a pension fund. Halcyon Appliances wants to borrow 500 for five years, and its annual report shows net income up 40%. Before you lend a cent you have two separate worries, and it pays to keep them apart.</p>
<p>The first worry is about the <b>report</b>. Do these numbers faithfully describe what happened? Revenue might have been booked early, a liability left out, an estimate chosen to flatter. If so, the 40% is partly fiction, and you cannot build anything on it.</p>
<p>The second worry is about the <b>business</b>. Suppose the report is perfectly honest. Is the profit it describes any good? A 40% jump that came from selling a factory will not happen again next year. A profit that is real and recurring but below what investors could earn elsewhere for the same risk is not good either.</p>
<p>The curriculum names these two ideas <b>financial reporting quality</b> (the quality of the information: complete, neutral, compliant with generally accepted accounting principles (GAAP), useful for decisions) and <b>earnings quality</b>, also called <b>results quality</b> (the quality of the performance itself: earnings that are sustainable and that provide an adequate return on the capital invested). Here GAAP means whichever framework the company reports under: International Financial Reporting Standards (IFRS) or United States GAAP (US GAAP).</p>`,
        },
        {
          t: "table",
          caption: "How the two qualities combine",
          head: ["", "High earnings quality", "Low earnings quality"],
          rows: [
            ["<b>High reporting quality</b>", "The ideal: an honest report of sustainable, adequate earnings. You can rely on it and you like what it says.", "An honest report of a weak business. Bad news, but clearly visible, so you can price it."],
            ["<b>Low reporting quality</b>", "Performance may be fine, but you cannot tell, because the report does not let you see it.", "The worst case: a weak business hidden behind a misleading report."],
          ],
          note: "The asymmetry is the point: low reporting quality makes earnings quality impossible to judge. That is why you assess the report first.",
        },
        {
          t: "h",
          text: "The quality spectrum",
        },
        {
          t: "p",
          html: `<p>Reports do not split neatly into "honest" and "fraudulent". The curriculum lays them out on a spectrum from best to worst, and most of the analyst's work happens in the middle, where everything is legal and still not neutral.</p>`,
        },
        {
          t: "steps",
          title: "From best to worst",
          items: [
            { title: "GAAP-compliant, decision-useful, with sustainable earnings and adequate returns", html: "High-quality reporting of high-quality earnings. The top of the spectrum." },
            { title: "GAAP-compliant and decision-useful, but earnings are not sustainable or returns not adequate", html: "The report is fine; the business is not. Low earnings quality, honestly reported. An analyst can see the problem and act on it." },
            { title: "Within GAAP, but biased choices", html: "Every choice is allowed, but they lean one way. <b>Aggressive</b> choices raise reported performance or financial position this period; <b>conservative</b> choices lower them. Both are bias." },
            { title: "Within GAAP, but earnings management", html: "Deliberate action to hit a number. <b>Real</b> earnings management changes what the company does (cutting research or advertising in December to meet a target); <b>accounting</b> earnings management changes only the estimates and choices (shaving the allowance for doubtful accounts)." },
            { title: "Departures from GAAP: non-compliant accounting", html: "The report breaks the rules, for example by capitalizing costs that must be expensed. It can no longer be used to assess performance." },
            { title: "Departures from GAAP: fictitious transactions", html: "Fraud in its plainest form: revenue from customers who do not exist, assets that are not there. The report is not just biased but invented." },
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "Biased choices versus earnings management",
          html: "What separates the two middle levels is intent: earnings management is a deliberate choice made to produce a biased report. Intent is hard to prove from the outside, so summaries of the reading often fold earnings management into biased choices. Either way, both sit within GAAP and above the two departures from GAAP.",
        },
        {
          t: "h",
          text: "Why conservative is not the same as good",
        },
        {
          t: "p",
          html: `<p>Many candidates walk in believing that a conservative report is a high-quality one. Think about what conservatism actually does. Meridian Tools has a bad year and books a restructuring provision of 300 when its honest estimate is 100. This year's profit is understated by 200. So far that looks prudent.</p>
<p>Next year the closure costs only 100. The other 200 of provision is no longer needed, and releasing it adds 200 to next year's profit. The understatement this year has become an overstatement next year. That is the <b>big bath</b> (take every possible charge in a year that is already bad, when the market will blame the past) followed by the <b>cookie jar</b> (a reserve that can be dipped into whenever earnings fall short). Accounting is a closed system: total profit over the life of a business is fixed by its cash flows, so any bias that moves profit out of one period moves it into another.</p>
<p>The goal is <b>neutrality</b>, not conservatism. Conservative bias is still bias: it understates the current period first and overstates a later one.</p>`,
        },
        { t: "theater", scenario: "lm14-cookie-jar" },
        {
          t: "callout",
          tone: "insight",
          title: "Conservatism in the standards versus conservatism in the choices",
          html: "<p>Some conservatism is built into the rules themselves: research costs are expensed (all research and development under US GAAP, with narrow exceptions; research under IFRS, while qualifying development costs are capitalized); a probable litigation loss is accrued but a probable gain is not; inventory is written down to net realizable value but never written up above its cost. These asymmetries are the same for every company, so they reduce comparability less than a company's own choices do.</p><p>The analyst worries most about bias in the choices management makes: estimates, timing and presentation. That is where one company can differ from its peers.</p>",
        },
        {
          t: "sort",
          prompt: "Place each situation on the quality spectrum.",
          buckets: [
            { id: "useful", label: "Decision-useful (honest)" },
            { id: "biased", label: "Biased choices within GAAP" },
            { id: "em", label: "Earnings management" },
            { id: "outside", label: "Outside GAAP" },
          ],
          items: [
            { text: "An accurate report of a company earning less than its cost of capital", bucket: "useful", why: "The reporting is fine; the earnings are poor. That is low earnings quality, honestly reported." },
            { text: "Useful lives set longer than every peer's, with no engineering reason", bucket: "biased", why: "Useful life is a permitted estimate, so this is within GAAP, but it leans toward higher profit: an aggressive choice." },
            { text: "A restructuring provision set at the top of a reasonable range in a loss year", bucket: "biased", why: "Allowed, but conservative bias. It sets up a release (a cookie jar) in a later year." },
            { text: "Postponing December advertising to January to beat the consensus forecast", bucket: "em", why: "Real earnings management: an operating decision taken to hit a reported number." },
            { text: "Recording network access fees paid to other carriers as capital expenditure", bucket: "outside", why: "A cost that is consumed in the period must be expensed. Capitalizing it is non-compliant accounting." },
            { text: "Invoicing a customer that does not exist", bucket: "outside", why: "A fictitious transaction: the bottom of the spectrum." },
          ],
        },
        {
          t: "check",
          id: "lm14-fw-1",
          q: "A company's report complies with GAAP and is free of bias, but most of this year's profit came from a one-time gain on selling a division. The report is best described as having:",
          options: ["High reporting quality and low earnings quality", "Low reporting quality and high earnings quality", "Low reporting quality and low earnings quality"],
          answer: 0,
          why: "The information is faithful, so reporting quality is high. The earnings themselves are not sustainable because the gain will not recur, so earnings quality is low.",
        },
        {
          t: "check",
          id: "lm14-fw-2",
          q: "A manager deliberately overstates a warranty provision in a weak year. Compared with a neutral estimate, the effect on reported earnings is most likely:",
          options: ["Lower this year and lower in later years", "Lower this year and higher in a later year when the excess is released", "Unchanged in total and unchanged in timing"],
          answer: 1,
          why: "Overstating the provision moves expense into the current year. When the excess is released, it reduces expense in a later year. Total profit over both years is unchanged; its timing is not.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "recognition",
      title: "Where reports go wrong (1): when revenue and expenses are recognized",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>It is 28 December at Halcyon Appliances. The sales director is 120 of profit short of the bonus target, and the year closes in three days. Customers cannot be made to want more fridges by Friday. But an invoice can be printed by Friday.</p>
<p>That is the whole logic of recognition problems. Profit is revenue minus expenses, and both are recognized according to rules about <b>timing</b>. Pull revenue into this period, or push expenses out of it, and this period's profit rises with nothing real having changed. The curriculum groups the potential problems into recognition (amounts and timing), classification, and measurement, plus issues around business combinations.</p>`,
        },
        {
          t: "h",
          text: "Revenue recognized too early",
        },
        {
          t: "p",
          html: `<p>Under IFRS 15 and its US GAAP twin (Accounting Standards Codification topic 606, ASC 606), revenue is recognized when the customer obtains <b>control</b> of the goods or services. Control means the customer can direct their use and obtain the benefits: usually when the goods are delivered and accepted. Several well-known tricks pretend control has passed when it has not:</p>
<ul>
<li><b>Channel stuffing.</b> Shipping more goods to distributors than they want, often with generous return rights or extended payment terms, so that next period's sales are booked this period.</li>
<li><b>Bill-and-hold.</b> Billing the customer but keeping the goods in the seller's warehouse. It is allowed only in narrow circumstances: there must be a substantive reason (typically the customer asked for it), the goods must be separately identified as the customer's, ready for transfer, and unavailable to the seller to use or sell to someone else. Without that, it is a sale that has not happened yet.</li>
<li><b>Recognizing a bundled contract up front.</b> A software license sold with two years of support is two promises. Booking the whole price on day one recognizes revenue for service not yet delivered.</li>
<li><b>Gross instead of net.</b> A company that only arranges a sale as an agent should report its commission, not the full price. Reporting gross inflates revenue (and growth rates and market share) without changing profit.</li>
</ul>`,
        },
        { t: "theater", scenario: "lm14-channel-stuffing" },
        {
          t: "callout",
          tone: "insight",
          title: "Why the receivables give the game away",
          html: "Stuffed sales are sales on credit to customers who did not ask for the goods, so they are not collected on normal terms. Revenue rises, receivables rise much faster, and days sales outstanding (DSO, receivables / revenue x 365) jumps. Cash from operating activities (CFO) does not move at all. That gap between profit and cash shows up in almost every recognition problem, which is why analysts compare the two.",
        },
        {
          t: "h",
          text: "Expenses recognized too late",
        },
        {
          t: "p",
          html: `<p>The mirror image is to keep costs off the income statement. The cleanest way is to call a cost an asset. A cost is capitalized when it creates a resource that will produce future economic benefits; it is expensed when its benefit is used up in the period. The boundary takes judgment (software development, customer acquisition costs, interest during construction), which is exactly why it is abused.</p>
<p>Capitalizing an operating cost does more damage than it first appears, because it moves two statements at once. On the income statement the expense disappears, replaced by a slice of amortization. On the cash flow statement the payment leaves operating activities and reappears in investing activities (CFI). So net income and CFO both look better, and the trick passes the "is profit backed by cash?" test that would catch channel stuffing. Watch it below with Corvid Networks.</p>`,
        },
        { t: "theater", scenario: "lm14-capitalize-costs" },
        {
          t: "callout",
          tone: "trap",
          title: "The trap in this theater",
          html: "A candidate who has learned that 'CFO is harder to manipulate than net income' concludes that a company with strong CFO has high-quality earnings. Capitalization breaks that rule: CFO rose by exactly the amount that was capitalized. The measure that does not move is CFO + CFI (500 in both columns). When capital expenditure is climbing and CFO is climbing with it, ask what is being capitalized.",
        },
        {
          t: "p",
          html: `<p>Other expense-timing problems work the same way: under-accruing liabilities (warranty, bonuses, returns) so that the expense waits for the cash payment; stretching the period over which a cost is amortized; and failing to recognize an impairment the evidence already demands. Each one makes this period look better and some later period look worse.</p>`,
        },
        {
          t: "check",
          id: "lm14-rec-1",
          q: "Compared with expensing it, capitalizing a cash operating cost in the year it is paid will most likely:",
          options: ["Increase net income and CFO, and decrease CFI", "Increase net income, leave CFO unchanged, and decrease CFI", "Leave net income unchanged and increase CFO"],
          answer: 0,
          why: "The expense is replaced by a smaller amortization charge, so net income rises. The cash payment moves from operating to investing, so CFO rises and CFI falls by the same amount. Total cash is unchanged.",
        },
        {
          t: "check",
          id: "lm14-rec-2",
          q: "Halcyon's revenue grew 15% this year while its receivables doubled and CFO was flat. The most likely explanation is:",
          options: ["Conservative revenue recognition", "Revenue recognized before customers took control of the goods", "An improvement in the credit quality of customers"],
          answer: 1,
          why: "Receivables growing far faster than revenue, with no extra cash, is the classic footprint of early or fictitious revenue such as channel stuffing. Better credit quality would speed up collections, not slow them.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "classification-measurement",
      title: "Where reports go wrong (2): classification and measurement",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Not every distortion changes the bottom line. Some move a number to a different line, where the reader will judge it more kindly. Others leave the line alone and bend the estimate that sets its size.</p>`,
        },
        {
          t: "h",
          text: "Classification: same number, friendlier line",
        },
        {
          t: "compare",
          items: [
            {
              title: "Balance sheet",
              tone: "accent",
              points: [
                "Receivables that are not being collected reclassified as 'other assets' or as non-current, so DSO and the current ratio look normal",
                "Inventory moved to a long-term category so inventory turnover looks healthy",
                "Debt presented as non-current when a covenant breach has already made it callable",
              ],
            },
            {
              title: "Income statement",
              tone: "purple",
              points: [
                "Non-operating or one-time gains (asset sales, investment gains) included in revenue or operating income",
                "<b>Classification shifting</b>: ordinary operating costs relabelled as restructuring or other 'special' charges, so core operating income rises while net income is unchanged",
                "Costs moved into discontinued operations, which analysts often ignore",
              ],
            },
            {
              title: "Cash flow statement",
              tone: "cyan",
              points: [
                "Operating payments shown as investing (capitalized costs)",
                "IFRS choices for interest and dividends used to flatter CFO",
                "Proceeds from selling receivables shown as operating cash",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why classification shifting works",
          html: "Investors value recurring earnings at a high multiple and treat special charges as one-offs worth almost nothing. Moving 50 of ordinary cost into 'restructuring' leaves net income unchanged but raises the earnings figure that gets the high multiple. The footprint: core earnings rise in a year with special charges, and the improvement fades the next year when there is nothing to shift into.",
        },
        {
          t: "h",
          text: "Presentation: non-GAAP measures",
        },
        {
          t: "p",
          html: `<p>Companies often headline their own measures: "adjusted earnings", earnings before interest, taxes, depreciation and amortization (EBITDA), "core profit". They can be genuinely useful, and they are also an easy place to lean: add back restructuring costs that recur every year, add back share-based compensation, exclude losses but keep gains. Regulators have responded. In the United States, the Securities and Exchange Commission (SEC) requires a non-GAAP measure to be reconciled to the most comparable GAAP measure, and the GAAP measure must be presented with equal or greater prominence. IFRS requires additional line items, headings and subtotals when they are relevant to understanding performance; such a subtotal must be built from amounts measured under IFRS, must not be shown more prominently than the required totals, and must be reconciled to them on the face of the statement. Any non-IFRS measure included in the financial reports must be defined and explained. That still leaves companies room to choose their own subtotals, and gives analysts a reason to check what they exclude.</p>
<p>The rules on non-GAAP measures are Level I material (the reading on financial reporting quality). The Level II reading's own list of potential problems centres on amounts and timing of recognition, classification, mergers and acquisitions, and reporting that complies with GAAP yet diverges from economic reality. Treat this paragraph as background you are expected to carry over from Level I.</p>`,
        },
        {
          t: "h",
          text: "Measurement: the estimates behind the numbers",
        },
        {
          t: "table",
          caption: "Where measurement judgment lives, and which way bias pushes",
          head: ["Area", "The judgment", "Aggressive choice", "Footprint to look for"],
          rows: [
            ["Inventory", "Cost flow method; write-down to net realizable value (NRV)", "Avoid writing down obsolete stock", "Inventory growing faster than cost of sales; days of inventory rising"],
            ["Receivables", "Allowance for doubtful accounts", "Shrink the allowance as receivables grow", "Allowance falling as a share of gross receivables"],
            ["Warranties, returns, restructuring", "Size of provisions", "Under-provide, or over-provide in a bad year and release later", "Provisions moving unlike the related revenue or payments"],
            ["Property, plant and equipment (PP&E)", "Useful lives, residual values, impairment", "Longer lives, higher residuals, delayed impairment (or an excessive one, the big bath)", "Depreciation / gross PP&E falling; implied useful life rising; lives longer than peers"],
            ["Goodwill and intangibles", "Impairment testing assumptions", "Optimistic cash flow forecasts that avoid impairment", "Goodwill large relative to equity while the share price sits below book value"],
            ["Financial assets and liabilities", "Fair values without market prices (Level 3)", "Model inputs that flatter value", "Large Level 3 balances, gains on Level 3 assets in a falling market"],
            ["Deferred tax assets", "Valuation allowance", "Too small an allowance on losses unlikely to be used", "Large deferred tax assets in a company with a history of losses"],
            ["Pensions", "Discount rate, compensation growth, expected return", "Higher discount rate, lower salary growth, and under US GAAP a higher expected return on plan assets (which lowers reported pension expense)", "Assumptions out of line with peers"],
          ],
        },
        { t: "theater", scenario: "lm14-useful-lives" },
        {
          t: "p",
          html: `<p>Useful lives are the quiet one: no cash moves, no auditor can prove that a truck will not last ten years, and the effect compounds as the fleet grows. You can still measure it from the PP&E note. Gross PP&E divided by annual depreciation gives the implied average useful life; compare it with the company's own history and with peers. The impairment version runs the other way: write an asset down too far once, and every later year carries less depreciation.</p>`,
        },
        { t: "theater", scenario: "lm14-big-bath-impairment" },
        {
          t: "callout",
          tone: "gaap",
          title: "IFRS vs US GAAP: impairment reversals",
          html: "Under IFRS (IAS 36) an impairment loss on PP&E or an intangible other than goodwill is reversed if the recoverable amount recovers, up to the carrying amount the asset would have had without the impairment. Under US GAAP an impairment of an asset held for use is never reversed. Goodwill impairment is never reversed under either. So an IFRS big bath can come back later not only as lower depreciation but as a reversal gain.",
        },
        {
          t: "check",
          id: "lm14-cm-1",
          q: "A company moves 80 of recurring selling costs into a line labelled 'restructuring charges'. The most likely effect on the current year is:",
          options: ["Higher net income and higher core operating income", "Unchanged net income and higher core operating income", "Lower net income and unchanged core operating income"],
          answer: 1,
          why: "Classification shifting moves cost between lines, not out of the income statement. Net income is unchanged, but core (pre-special-item) operating income rises by 80, which is exactly why it is attractive to management.",
        },
        {
          t: "check",
          id: "lm14-cm-2",
          q: "Tasman Freight's gross PP&E is 1,200 and annual depreciation is 120. A peer's gross PP&E is 1,800 with depreciation of 300. Relative to the peer, Tasman most likely uses:",
          options: ["Shorter useful lives, which lowers its reported profit", "Longer useful lives, which raises its reported profit", "The same useful lives, because the depreciation rates are equal"],
          answer: 1,
          why: "Implied useful life = gross PP&E / depreciation: 1,200 / 120 = 10 years for Tasman against 1,800 / 300 = 6 years for the peer. Longer lives mean lower annual depreciation and higher profit.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "acquisitions-reality",
      title: "Acquisitions, and reports that follow the rules but miss the reality",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Acquisitions deserve their own warning because they disturb every comparison an analyst relies on. Last year's numbers no longer describe the same company, the purchase price has to be spread across assets by estimate, and the cash flow statement treats the deal in a way that can flatter operating cash flow for years.</p>`,
        },
        {
          t: "steps",
          title: "Quality issues around mergers and acquisitions",
          items: [
            { title: "Acquisitions that hide a weak core business", html: "A company whose own growth is slowing can keep reported revenue and earnings rising by buying other companies. Serial acquirers are hard to analyse because there is no clean like-for-like period. A company with poor organic performance may even be motivated to make acquisitions for this reason." },
            { title: "Purchase price allocation", html: "The price is allocated to the identifiable assets and liabilities at fair value, and the residual is goodwill. Goodwill is not amortized; most identifiable assets are depreciated or amortized. Allocating more of the price to goodwill and less to depreciable assets raises future earnings. The fair values are estimates, often from valuation models." },
            { title: "Acquiring operating cash flow", html: "The purchase price is an investing outflow. The receivables and inventory that come with the target are then turned into cash, which shows up as operating inflow. The acquirer has, in effect, bought CFO with CFI." },
            { title: "The target's own pre-deal reporting", html: "A target may have flattered its results before the sale to raise the price, and the acquirer inherits the reversal. Contingent consideration and earn-outs can make that incentive stronger." },
            { title: "Goodwill impairment avoidance", html: "Goodwill is tested for impairment using management's forecasts. A company can delay an impairment the market has already priced in, which leaves assets and equity overstated." },
          ],
        },
        {
          t: "h",
          text: "Compliant, and still misleading",
        },
        {
          t: "p",
          html: `<p>The hardest case for an analyst is a report that follows the rules but where the rules themselves allow a picture that diverges from economic reality. Enron is the case everyone remembers: it used special purpose entities (SPEs) structured to stay off its balance sheet under the rules of the time (and in some cases failed even those rules), so that debt and risks it effectively bore were invisible on its face. Before IFRS 16 and ASC 842, operating leases did the same thing legitimately: a retailer could control hundreds of stores under long leases and show none of the obligation as debt. Equity-method investments still do it in a milder form, because an associate's debt sits inside one net investment line.</p>
<p>The analyst's response is to ask what a lender or buyer would consider the company's real obligations and assets, then adjust: capitalize obligations the balance sheet leaves out, consolidate what is effectively controlled, and compare companies on the adjusted basis.</p>`,
        },
        {
          t: "p",
          html: `<p>Research and development is the curriculum's example of the reverse problem: an asset the rules keep off the balance sheet. R&D produces future benefits, yet US GAAP does not permit capitalizing R&D expenditure, and IFRS expenses research as incurred. IFRS does allow DEVELOPMENT expenditure to be capitalized, but only if the entity can demonstrate all six of the following: (a) the technical feasibility of completing the intangible asset so that it will be available for use or sale; (b) its intention to complete the asset and use or sell it; (c) its ability to use or sell it; (d) how the asset will generate probable future economic benefits; (e) the availability of adequate technical, financial and other resources to complete the development and use or sell the asset; and (f) its ability to measure reliably the expenditure attributable to the asset during development. So two otherwise identical companies, one under each framework, can report different assets and profits for the same spending.</p>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "From the 2026 errata",
          html: "CFA Institute's 2026 errata (26 January 2026) replaced the old sentence 'accounting standards do not permit the capitalization of R&D' with the split above: no capitalization under US GAAP, research expensed under IFRS, development capitalized under IFRS when all six criteria are met. An answer that says IFRS never capitalizes development costs is wrong.",
        },
        {
          t: "check",
          id: "lm14-ma-1",
          q: "An acquirer allocates a larger share of the purchase price to goodwill and a smaller share to customer relationships with a 5-year life. Compared with the opposite allocation, reported earnings in the following years will most likely be:",
          options: ["Higher, because goodwill is not amortized", "Lower, because goodwill is amortized faster", "The same, because total assets acquired are the same"],
          answer: 0,
          why: "Customer relationships are amortized over their life; goodwill is not amortized, only tested for impairment. Shifting value into goodwill removes amortization expense from future years.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "motives",
      title: "Why managers bend the numbers, and what stops them",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Reporting problems are not random. They cluster where someone has a reason to want a different number and the ability to produce it. Knowing the reasons tells you where to look.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Motivations",
              tone: "red",
              points: [
                "<b>Meeting benchmarks</b>: analysts' consensus, management's own guidance, last year's earnings, or zero. Missing by a cent can cost far more in share price than the cent is worth",
                "<b>Debt covenants</b>: a breach of an interest coverage or leverage covenant can make debt callable or force a costly renegotiation",
                "<b>Compensation</b>: bonuses and share-based pay tied to earnings, revenue growth or the share price",
                "<b>Career concerns</b>: keeping the job, protecting a reputation, raising capital on good terms",
                "Sometimes the motive runs the other way: lowering earnings before a union negotiation, a regulatory review, or a management buyout",
              ],
            },
            {
              title: "Conditions (the fraud triangle)",
              tone: "amber",
              points: [
                "<b>Opportunity</b>: weak internal controls, a board that does not oversee, accounting standards with wide ranges of acceptable choices, weak enforcement",
                "<b>Motivation (pressure)</b>: personal or corporate, financial or reputational",
                "<b>Rationalization</b>: the story the person tells themselves: 'we will make it up next quarter', 'everyone does it', 'it is within the rules'",
                "Low-quality reporting is most likely when all three are present at once",
              ],
            },
            {
              title: "Mechanisms that discipline quality",
              tone: "green",
              points: [
                "<b>Markets</b>: companies that report poorly pay for it through a higher cost of capital",
                "<b>Regulators</b>: registration and disclosure requirements, mandatory audits, required management commentary, certification of the statements by senior management, review and comment letters, enforcement",
                "<b>Auditors</b>: an independent opinion that the statements are fairly presented, giving reasonable (not absolute) assurance",
                "<b>Private contracting</b>: lenders and investors write contracts (covenants, information rights) that give them their own reasons to scrutinize the numbers",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "trap",
          title: "The limits of the auditor",
          html: "An audit is designed to give reasonable assurance that the statements are free of material misstatement. It is based on sampling, relies partly on management's representations, and is paid for by the company being audited. It is not designed to detect all fraud, and a well-concealed fraud involving collusion or management override can survive it. An unmodified (clean) opinion is evidence, not a guarantee.",
        },
        {
          t: "sort",
          prompt: "Which leg of the fraud triangle does each fact describe?",
          buckets: [
            { id: "opp", label: "Opportunity" },
            { id: "mot", label: "Motivation" },
            { id: "rat", label: "Rationalization" },
          ],
          items: [
            { text: "The chief financial officer's bonus doubles if earnings per share (EPS) beat 2.00", bucket: "mot", why: "Incentive compensation creates pressure to hit the number." },
            { text: "The audit committee meets once a year and has no accounting expert", bucket: "opp", why: "Weak oversight makes it easier to get a biased choice through." },
            { text: "'We are only borrowing from next quarter; the orders will come in.'", bucket: "rat", why: "The internal justification that makes the act feel acceptable." },
            { text: "The interest coverage covenant will be breached if operating profit falls another 5%", bucket: "mot", why: "Debt covenant pressure is a classic motive." },
            { text: "The standard allows a wide range of useful lives and nobody checks them against peers", bucket: "opp", why: "Wide discretion plus weak review is opportunity." },
          ],
        },
        {
          t: "check",
          id: "lm14-mo-1",
          q: "Which of the following is best described as a mechanism that disciplines financial reporting quality rather than a condition that encourages low quality?",
          options: ["A bonus plan tied to quarterly earnings", "Loan covenants that give the lender audit and information rights", "A wide range of acceptable accounting choices"],
          answer: 1,
          why: "Private contracting gives lenders a reason and a means to scrutinize the reports. A bonus plan is a motivation and wide accounting choice is an opportunity, both conditions for low quality.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "evaluate",
      title: "Evaluating report quality: the analyst's process",
      los: ["c", "d"],
      blocks: [
        {
          t: "p",
          html: `<p>You now know what can go wrong and why. The practical question is where to spend a limited number of hours. The curriculum lays out a sequence that moves from understanding to suspicion to measurement. Its logic: you cannot spot what is abnormal until you know what is normal for this business.</p>`,
        },
        {
          t: "steps",
          title: "A step-by-step evaluation",
          items: [
            { title: "Understand the company and its industry", html: "How does it make money, what are its key performance drivers, and which accounting policies matter most in this industry (revenue recognition for software, inventory for retail, reserves for insurers)?" },
            { title: "Learn about management", html: "How are they paid, and on what measures? Do insiders buy or sell shares? Are there related-party transactions? Has there been turnover in senior finance staff?" },
            { title: "Identify significant areas of judgment", html: "Find the accounts where management judgment or unusual accounting rules carry the most weight: revenue on long contracts, reserves, impairments, capitalization, fair values, deferred tax assets." },
            { title: "Make comparisons", html: "Compare this year with prior years, compare the company with its peers, and compare the statements with each other (net income with CFO, revenue with receivables, depreciation with PP&E). Explain every material difference." },
            { title: "Check for warning signs", html: "Work through the red flags below: receivables or inventory outgrowing sales, CFO persistently below net income, lives longer than peers, fourth-quarter surprises, one-time gains in operating income." },
            { title: "Examine segment and disaggregated data", html: "For a company with several segments or regions, check whether revenue, costs or assets seem to be shifted toward the segment the market rewards most." },
            { title: "Use quantitative tools", html: "Screens such as the Beneish M-score estimate the likelihood of manipulation; the Altman Z-score assesses bankruptcy risk. They direct attention; they do not prove anything." },
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "The 2026 reading's own checklist",
          html: "CFA Institute's 2026 summary lists the evaluation as: understand the company's business and industry; compare current and prior-period line items for significant differences; evaluate accounting policies, especially unusual revenue and expense recognition against peers; perform financial ratio analysis; examine the cash flow statement, focusing on the gap between net income and operating cash flow; review risk disclosures; review management compensation and insider transactions. The steps above cover the same ground in a different order. Memorize this version for recall questions.",
        },
        {
          t: "table",
          caption: "Accounting warning signs",
          head: ["Area", "Warning signs"],
          rows: [
            ["Revenue", "Changes in revenue recognition methods; bill-and-hold, barter, or rebate programs that require estimates; unclear multiple-deliverable contracts; receivables growing faster than revenue (DSO rising); revenue growth out of line with peers; falling total asset turnover, especially at an acquisitive company; non-operating or one-time gains included in revenue"],
            ["Inventory", "Inventory growing faster than sales or cost of sales; falling inventory turnover; under US GAAP, liquidations of LIFO (last-in, first-out) layers that release old low costs into profit"],
            ["Capitalization", "Capitalization of costs out of line with peers (software, development, customer acquisition, interest)"],
            ["Cash flow versus profit", "Net income persistently above CFO, or a growing gap between them"],
            ["Other", "Depreciation lives or methods more generous than peers; fourth-quarter surprises; related-party transactions; non-operating income or one-time gains classified as operating; recurring 'non-recurring' charges; margins out of line with peers; heavy emphasis on non-GAAP measures; poor or minimal disclosure; management obsessed with meeting targets"],
          ],
          note: "A warning sign is a reason to dig, not a verdict. A fast-growing honest company also builds receivables and inventory; the question is whether the growth in the balance sheet is explained by the growth in the business.",
        },
        {
          t: "callout",
          tone: "example",
          title: "Practice the comparisons",
          html: "The game below gives you three companies' condensed statements over three years, each with planted problems. Look at each line's growth against revenue's, then net income against CFO. Reveal to see what you found, what you missed, and which lines were innocent.",
        },
        { t: "widget", name: "ManipulationRadar" },
        {
          t: "check",
          id: "lm14-ev-1",
          q: "An analyst finds that a retailer's days of inventory on hand rose from 52 to 75 while the industry was flat, and that gross margin was unchanged. The most appropriate next step is to:",
          options: ["Conclude that the company has committed fraud", "Investigate whether obsolete inventory has not been written down", "Ignore it, because gross margin did not change"],
          answer: 1,
          why: "An inventory build is a warning sign, not proof. Stock that is not selling may need a write-down to net realizable value; if it has not been taken, inventory and gross margin are both overstated, which would explain a margin that held up.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "screens",
      title: "Quantitative screens: the Beneish M-score and the Altman Z-score",
      los: ["c", "d"],
      blocks: [
        {
          t: "p",
          html: `<p>Your fund covers 2,000 companies. You cannot read every footnote of every one. What you can do is compute, for every company, a handful of ratios that tend to move in a particular way when earnings are being manipulated, and read the footnotes of the companies where they do.</p>
<p>Messod Beneish built exactly that. He took companies known to have manipulated earnings and a large control sample, and estimated a <b>probit model</b>: a regression whose output, passed through the standard normal distribution, is a probability. The output is the <b>M-score</b>. A higher M-score means a higher estimated probability of manipulation, and the probability itself is \\(N(M)\\), the standard normal cumulative distribution evaluated at M.</p>`,
        },
        {
          t: "formula",
          name: "Beneish M-score",
          tex: "M = -4.84 + 0.920\\,\\text{DSRI} + 0.528\\,\\text{GMI} + 0.404\\,\\text{AQI} + 0.892\\,\\text{SGI} + 0.115\\,\\text{DEPI} - 0.172\\,\\text{SGAI} + 4.679\\,\\text{TATA} - 0.327\\,\\text{LVGI}",
          plain: "Seven indexes (a value of 1 means 'no change from last year') and one accrual ratio, weighted by coefficients estimated on known manipulators. Probability of manipulation = N(M).",
        },
        {
          t: "table",
          caption: "The eight variables, and why each is a red flag",
          head: ["Variable", "Calculation", "A high value suggests"],
          rows: [
            ["<b>DSRI</b> days sales in receivables index", "\\(\\dfrac{\\text{Receivables}_t / \\text{Sales}_t}{\\text{Receivables}_{t-1} / \\text{Sales}_{t-1}}\\)", "Receivables growing faster than sales: possible revenue inflation"],
            ["<b>GMI</b> gross margin index", "\\(\\dfrac{\\text{Gross margin}_{t-1}}{\\text{Gross margin}_t}\\)", "Deteriorating margins (note: last year over this year). Weak prospects create pressure to manipulate"],
            ["<b>AQI</b> asset quality index", "\\(\\dfrac{1 - (\\text{CA}_t + \\text{PP\\&E}_t)/\\text{TA}_t}{1 - (\\text{CA}_{t-1} + \\text{PP\\&E}_{t-1})/\\text{TA}_{t-1}}\\)", "A rising share of soft assets (everything other than current assets and net PP&E): costs being capitalized or deferred"],
            ["<b>SGI</b> sales growth index", "\\(\\dfrac{\\text{Sales}_t}{\\text{Sales}_{t-1}}\\)", "Growth itself is not manipulation, but growth companies face pressure to keep the story going"],
            ["<b>DEPI</b> depreciation index", "\\(\\dfrac{\\text{Dep}_{t-1}/(\\text{Dep}_{t-1} + \\text{PP\\&E}_{t-1})}{\\text{Dep}_t/(\\text{Dep}_t + \\text{PP\\&E}_t)}\\)", "A falling depreciation rate: possibly longer useful lives"],
            ["<b>SGAI</b> selling, general and administrative expense index", "\\(\\dfrac{\\text{SG\\&A}_t / \\text{Sales}_t}{\\text{SG\\&A}_{t-1} / \\text{Sales}_{t-1}}\\)", "Rising overhead relative to sales. Its coefficient is negative in the model"],
            ["<b>TATA</b> total accruals to total assets", "\\(\\dfrac{\\text{Income from continuing operations}_t - \\text{CFO}_t}{\\text{TA}_t}\\)", "Earnings with less cash behind them"],
            ["<b>LVGI</b> leverage index", "\\(\\dfrac{(\\text{Current liabilities}_t + \\text{LTD}_t)/\\text{TA}_t}{(\\text{Current liabilities}_{t-1} + \\text{LTD}_{t-1})/\\text{TA}_{t-1}}\\)", "Rising leverage and covenant pressure. Its coefficient is negative in the model"],
          ],
          note: "CA = current assets; PP&E = net property, plant and equipment; TA = total assets; Dep = depreciation; LTD = long-term debt; SG&A = selling, general and administrative expense. For the six 'index' variables a value of 1 is neutral; for TATA, 0 is neutral. AQI here follows Beneish (1999) and the curriculum-tracking version: only current assets and net PP&E count as hard assets. Some sources also add securities to the hard assets; this module, its examples and the lab exclude them.",
        },
        {
          t: "callout",
          tone: "exam",
          title: "The cutoff",
          html: "The curriculum uses an M-score of <b>-1.78</b> as the cutoff: a company scoring above it is flagged as a likely manipulator. Because the probability is \\(N(M)\\), the cutoff corresponds to \\(N(-1.78) \\approx 3.8\\%\\). That sounds low, but Beneish did not set the cutoff at 50%. Where to draw the line depends on the relative cost of the two possible errors. A <b>Type I error</b> classifies a manipulator as a non-manipulator; a <b>Type II error</b> classifies a non-manipulator as a manipulator. For an investor, missing a manipulator (a collapse in the share price) costs far more than wrongly flagging an honest company (some extra analysis, perhaps a missed opportunity), so Beneish judged 3.8% to be the relevant cutoff for investors. Some sources outside the curriculum quote -2.22 instead; for the exam, use -1.78.",
        },
        {
          t: "h",
          text: "Worked example: Vantor Systems",
        },
        {
          t: "p",
          html: `<p>Vantor's sales grew from 1,000 to 1,300, but receivables went from 100 to 195, gross margin slipped from 40% to 36%, depreciation fell from 50 to 48 while net PP&E grew from 450 to 600, current assets rose from 400 to 560 and total assets from 1,000 to 1,400, and CFO was only 40 against net income of 110. Working through the indexes: DSRI = (195 / 1,300) / (100 / 1,000) = 0.15 / 0.10 = 1.50; GMI = 0.40 / 0.36 = 1.11; AQI = [1 - (560 + 600) / 1,400] / [1 - (400 + 450) / 1,000] = 0.171 / 0.150 = 1.14; SGI = 1.30; DEPI = (50 / 500) / (48 / 648) = 1.35; SGAI = 0.92; TATA = (110 - 40) / 1,400 = 0.05; LVGI = 1.07.</p>
<p>Plugging in gives \\(M \\approx -1.37\\), above the -1.78 cutoff, and \\(N(-1.37) \\approx 8.5\\%\\). Vantor is flagged. The two biggest pushes come from DSRI (0.920 x 1.50 = 1.38) and SGI (0.892 x 1.30 = 1.16). Load Vantor in the lab and change one number at a time to see which variables the score is most sensitive to.</p>`,
        },
        { t: "widget", name: "BeneishLab" },
        {
          t: "callout",
          tone: "trap",
          title: "Limitations of the M-score",
          html: "<p>It is built from the same accounting numbers it is trying to judge, so a manipulation that does not disturb these particular ratios is invisible to it. Its coefficients were estimated on a past sample and its predictive power has weakened over time. And once managers know which ratios the screen watches, they can manage those ratios. So use a high M-score as a reason to read the notes closely, and do not treat a low score as evidence that the accounts are clean.</p>",
        },
        {
          t: "h",
          text: "The Altman Z-score: a different question",
        },
        {
          t: "p",
          html: `<p>The M-score asks whether the numbers are honest. Edward Altman's Z-score asks whether the company is heading for bankruptcy. It combines five ratios, each a different angle on financial health: liquidity, accumulated profitability, current profitability, market cushion over debts, and asset efficiency. <b>Higher is better</b>: a higher Z-score means a lower probability of bankruptcy.</p>`,
        },
        {
          t: "formula",
          name: "Altman Z-score",
          tex: "Z = 1.2\\,\\frac{\\text{Working capital}}{\\text{TA}} + 1.4\\,\\frac{\\text{Retained earnings}}{\\text{TA}} + 3.3\\,\\frac{\\text{EBIT}}{\\text{TA}} + 0.6\\,\\frac{\\text{Market value of equity}}{\\text{Book value of liabilities}} + 1.0\\,\\frac{\\text{Sales}}{\\text{TA}}",
          plain: "EBIT is earnings before interest and taxes; TA is total assets. Operating profitability (EBIT / TA) carries the heaviest weight. A higher Z means lower bankruptcy risk.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum, flagged so you do not mistake it for exam content",
          html: "Altman's original 1968 study is commonly cited with zones: below 1.81 'distress', 1.81 to 2.99 'grey', above 2.99 'safe'. The lab draws these lines because practitioners use them. They are a practitioner convention, not a curriculum rule.",
        },
        {
          t: "callout",
          tone: "exam",
          title: "What is examinable about the Z-score",
          html: "The examinable point is direction and limitations: a higher Z-score means a lower probability of bankruptcy, and the model is a single-period, static measure built on reported accounting numbers from an old sample. Do not expect to need the zone cutoffs to answer a question; if a question compares two companies, the one with the higher Z-score is the one with lower estimated bankruptcy risk.",
        },
        {
          t: "p",
          html: `<p>Its limitations mirror the M-score's: it is a single-period, static model, so it ignores how the ratios are trending; it was estimated decades ago on a sample of manufacturing companies; and it takes the reported numbers at face value. The curriculum's broader point applies to both: as more managers learn the tools, the tools become less informative.</p>`,
        },
        {
          t: "check",
          id: "lm14-sc-1",
          q: "A company's M-score is -2.10. Based on the cutoff used in the curriculum, the company:",
          options: ["Is flagged as a likely manipulator, because the score is negative", "Is not flagged, because the score is below -1.78", "Is flagged, because the probability of manipulation exceeds 50%"],
          answer: 1,
          why: "The screen flags companies whose M-score is ABOVE -1.78. A score of -2.10 is below the cutoff, and N(-2.10) is about 1.8%, well under the 3.8% that the cutoff represents.",
        },
        {
          t: "check",
          id: "lm14-sc-2",
          q: "In the Beneish model, a gross margin index (GMI) of 1.25 most likely indicates that:",
          options: ["Gross margin improved, lowering the probability of manipulation", "Gross margin deteriorated, raising the probability of manipulation", "Sales grew 25%, raising the probability of manipulation"],
          answer: 1,
          why: "GMI is last year's gross margin divided by this year's, so a value above 1 means the margin fell. Deteriorating prospects increase the pressure to manipulate, and the positive coefficient raises M.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "sustainable",
      title: "Sustainable earnings, mean reversion, and why accruals fade faster",
      los: ["f", "g"],
      blocks: [
        {
          t: "p",
          html: `<p>Two companies in the same industry each report net income of 100 and trade at the same price. You can buy one. Steadfast Brewing collected most of its 100 in cash. Gilded Gadgets' 100 came with a big build-up of receivables, inventory and capitalized costs, and very little cash. Which 100 is worth more?</p>
<p>Valuation is about the future. A share is worth the earnings (or cash) it will produce, so the question that matters is not "how big is this year's profit?" but "how much of it will persist?" Earnings that persist are called <b>sustainable</b> or <b>persistent</b> earnings, and a company whose earnings are more persistent deserves a higher multiple of them.</p>`,
        },
        {
          t: "h",
          text: "Recurring versus non-recurring",
        },
        {
          t: "p",
          html: `<p>The first cut is obvious: strip out what will not happen again. Gains and losses from discontinued operations, unusual or infrequent items (a lawsuit settlement, a gain on selling a building), and restructuring charges that genuinely do not recur. What is left is the <b>recurring</b> or core earnings the analyst forecasts from.</p>
<p>Two cautions. First, management decides which items to label non-recurring, and it is tempted to label losses that way more readily than gains; a "non-recurring" charge that appears every year is a recurring cost. Second, IFRS does not permit any item to be called extraordinary, and US GAAP removed the extraordinary category in 2015, so the analyst, not the income statement, must decide what is sustainable.</p>`,
        },
        {
          t: "h",
          text: "Persistence, and why earnings revert to the mean",
        },
        {
          t: "p",
          html: `<p>One way to measure persistence is to regress next year's earnings on this year's. The slope coefficient is the persistence: a slope near 1 means a unit of earnings today predicts nearly a unit tomorrow; a slope near 0 means today's earnings tell you little about tomorrow's.</p>`,
        },
        {
          t: "formula",
          name: "Earnings persistence",
          tex: "\\text{Earnings}_{t+1} = \\alpha + \\beta_1\\,\\text{Earnings}_t + \\varepsilon",
          plain: "A higher beta_1 means more persistent (more sustainable) earnings.",
        },
        {
          t: "p",
          html: `<p>Even persistent earnings do not stay extreme forever. Exceptionally high profitability attracts competitors, who add capacity and cut prices until returns fall back toward normal. Exceptionally low profitability drives exits, cost cutting and restructuring, until returns recover. This tendency of extreme earnings to move back toward the average is <b>mean reversion</b>, and it is why simply projecting a record year forward overstates value.</p>`,
        },
        {
          t: "h",
          text: "The accruals component reverts faster",
        },
        {
          t: "p",
          html: `<p>Now split earnings into the part that arrived as cash and the part that did not. Earnings = cash flow + accruals. Accruals are everything that makes profit differ from cash: credit sales not yet collected, inventory produced but not sold, expenses not yet paid, depreciation, capitalized costs, provisions.</p>
<p>The accrual part is less persistent, for two reasons. Accruals reverse by construction: a receivable becomes cash or a write-off, a provision is used or released, so an accrual that boosts this year's profit tends to unwind into a later year. And accruals are where the estimates live, so they are where bias, error and manipulation end up. When the two parts are given separate coefficients, the coefficient on accruals is lower than the one on cash flow:</p>`,
        },
        {
          t: "formula",
          name: "Persistence of the two components",
          tex: "\\text{Earnings}_{t+1} = \\alpha + \\beta_1\\,\\text{Cash flow}_t + \\beta_2\\,\\text{Accruals}_t + \\varepsilon, \\qquad \\beta_2 < \\beta_1",
          plain: "A company whose earnings are made mostly of accruals will see them revert toward the mean faster. Earnings with a large accrual component are lower quality.",
        },
        {
          t: "callout",
          tone: "insight",
          title: "Not every accrual is a warning",
          html: "A growing company must build receivables and inventory, and a capital-intensive one carries large depreciation, so some accruals are simply the business. Research separates <b>normal</b> (non-discretionary) accruals, predicted from factors such as revenue growth and PP&E, from <b>abnormal</b> (discretionary) accruals, the residual. It is unusually large accruals, relative to the company's history and to peers, that signal low quality.",
        },
        {
          t: "h",
          text: "Measuring aggregate accruals",
        },
        {
          t: "p",
          html: `<p>To compare companies of different sizes you scale accruals by net operating assets (NOA): the assets used in operations minus the liabilities that arise from operations. Strip cash and short-term investments out of total assets (they are financial, not operating) and strip debt out of total liabilities (it is financing, not operating):</p>`,
        },
        {
          t: "formula",
          name: "Net operating assets",
          tex: "\\text{NOA} = (\\text{Total assets} - \\text{Cash and short-term investments}) - (\\text{Total liabilities} - \\text{Total debt})",
          plain: "Operating assets minus operating liabilities. Accruals are what make NOA grow without cash being spent on it.",
        },
        {
          t: "compare",
          items: [
            {
              title: "Balance-sheet based",
              tone: "accent",
              points: [
                "Aggregate accruals = \\(\\text{NOA}_t - \\text{NOA}_{t-1}\\)",
                "Accruals ratio = \\(\\dfrac{\\text{NOA}_t - \\text{NOA}_{t-1}}{(\\text{NOA}_t + \\text{NOA}_{t-1})/2}\\)",
                "Logic: operating assets that grew without being financed by operating liabilities were created by accruals",
              ],
            },
            {
              title: "Cash-flow statement based",
              tone: "cyan",
              points: [
                "Aggregate accruals = \\(\\text{NI}_t - (\\text{CFO}_t + \\text{CFI}_t)\\), where NI is net income",
                "Accruals ratio = \\(\\dfrac{\\text{NI}_t - (\\text{CFO}_t + \\text{CFI}_t)}{(\\text{NOA}_t + \\text{NOA}_{t-1})/2}\\)",
                "Logic: profit not matched by operating and investing cash flows is accrual",
              ],
            },
          ],
        },
        {
          t: "p",
          html: `<p>Work it for Gilded Gadgets. Beginning of year: total assets 1,300, cash 200, total liabilities 600, total debt 500, so NOA = (1,300 - 200) - (600 - 500) = 1,000. End of year: total assets 1,560, cash 180, total liabilities 640, debt 500, so NOA = 1,380 - 140 = 1,240. Average NOA = 1,120.</p>
<p>Balance-sheet accruals = 1,240 - 1,000 = 240, and the ratio is 240 / 1,120 = 21.4%. On the cash flow side, net income 100, CFO 10 and CFI -150 give accruals of 100 - (10 - 150) = 240, the same 21.4%. Steadfast Brewing, with the same 100 of profit, has accruals of 20 and a ratio of about 2.0%. Same earnings; Steadfast's are far more likely to persist.</p>`,
        },
        { t: "widget", name: "AccrualsLab" },
        {
          t: "callout",
          tone: "trap",
          title: "Two traps in the accruals formulas",
          html: "<p>In the cash-flow version, CFI is usually negative, so subtracting it ADDS to accruals: Gilded's 100 - 10 - (-150) = 240, not -60. And the two measures need not agree exactly in real data, because some changes in NOA have no cash flow counterpart (an acquisition paid in shares, for example). On the exam, use the version the question gives you the data for.</p>",
        },
        {
          t: "check",
          id: "lm14-su-1",
          q: "A company's NOA was 2,000 at the start of the year and 2,400 at the end. Net income was 300, CFO 100 and CFI -350. Its cash-flow based accruals ratio is closest to:",
          options: ["25.0%", "18.2%", "-6.8%"],
          answer: 0,
          why: "Accruals = 300 - (100 - 350) = 550. Average NOA = (2,000 + 2,400) / 2 = 2,200. Ratio = 550 / 2,200 = 25.0%. 18.2% is the balance-sheet ratio, (2,400 - 2,000) / 2,200, a different measure. The distractor -6.8% comes from treating CFI as if it were positive: 300 - 100 - 350 = -150, and -150 / 2,200 = -6.8%.",
        },
        {
          t: "check",
          id: "lm14-su-2",
          q: "Two companies report the same return on assets. Company X has an accruals ratio of 3%; Company Y has an accruals ratio of 18%. Compared with X, Y's earnings are most likely to be:",
          options: ["More persistent, because accruals smooth earnings over time", "Less persistent, reverting toward the mean faster", "Equally persistent, because return on assets is the same"],
          answer: 1,
          why: "The accrual component of earnings is less persistent than the cash component. A larger accrual share means earnings will mean-revert faster, so Y's earnings are of lower quality.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "earnings-indicators",
      title: "Indicators of earnings quality",
      los: ["e"],
      blocks: [
        {
          t: "p",
          html: `<p>You cannot audit a company from the outside, but you can watch for the patterns that low-quality earnings leave behind. You have already met most of the mechanics; here they are organized the way the curriculum lists its indicators of earnings quality.</p>`,
        },
        {
          t: "steps",
          title: "Indicators an analyst watches",
          items: [
            { title: "Recurring earnings", html: "How much of profit comes from the core business, and how much from items that will not repeat? Large, frequent 'non-recurring' items, gains inside operating income, and growing reliance on non-GAAP adjustments all lower quality. Watch for <b>classification shifting</b>: core expenses moved into special items so that core earnings look better while net income is unchanged." },
            { title: "Earnings persistence and the level of accruals", html: "Earnings with a large accrual component are less persistent. A high or rising accruals ratio, or net income persistently above CFO, is a quality warning." },
            { title: "Mean reversion", html: "Extreme earnings tend to revert. A forecast that extends a record year forward, especially one built on accruals, should be treated with suspicion." },
            { title: "Beating benchmarks", html: "If earnings were reported neutrally, results just above and just below a target (zero, last year's earnings, the analysts' consensus) would be about equally common. In practice, far more companies report tiny beats than tiny misses. A company that beats consensus by a cent quarter after quarter is likely managing to the number." },
            { title: "External indicators", html: "Enforcement actions by regulators (in the US, the SEC's Accounting and Auditing Enforcement Releases, or AAERs) and restatements of previously issued statements are direct evidence of past low quality, and companies with a history of them deserve extra scrutiny." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why the beat-by-a-cent pattern is evidence",
          html: "Markets punish a small miss far more than they reward a small beat. A manager just short of the target therefore has a strong motive to find the last cent through an estimate, a timing choice or a real action. The result is a statistical kink: a missing bump of small misses and an excess of small beats. A single small beat proves nothing; a long run of them, quarter after quarter, is a reason to look hard at the estimates behind each one.",
        },
        {
          t: "sort",
          prompt: "Is each fact more consistent with high-quality or low-quality earnings?",
          buckets: [
            { id: "hi", label: "Higher quality" },
            { id: "lo", label: "Lower quality" },
          ],
          items: [
            { text: "Net income has exceeded CFO in each of the last five years, by a growing margin", bucket: "lo", why: "A persistent and growing accrual component signals less persistent earnings." },
            { text: "Consensus beaten by exactly one cent in eleven of the last twelve quarters", bucket: "lo", why: "A distribution of results this tight around the benchmark suggests managing to it." },
            { text: "Accruals ratio of 2%, in line with peers and stable over time", bucket: "hi", why: "Earnings are largely backed by cash, so they should persist." },
            { text: "Restructuring charges in each of the last six years, added back in 'adjusted EPS'", bucket: "lo", why: "Recurring costs presented as non-recurring overstate sustainable earnings." },
            { text: "Operating income excludes the gain on a building sale, shown separately below it", bucket: "hi", why: "Clean classification keeps one-time items out of core earnings." },
            { text: "Two restatements of revenue in the past four years", bucket: "lo", why: "Restatements are an external indicator of past low quality." },
          ],
        },
        {
          t: "check",
          id: "lm14-ei-1",
          q: "A company's core operating margin rose from 12% to 15% in a year in which it reported large 'special charges', then fell back to 12% the following year when there were none. This pattern is most consistent with:",
          options: ["Classification shifting", "Mean reversion driven by competition", "A conservative change in revenue recognition"],
          answer: 0,
          why: "Moving ordinary costs into special charges flatters core margins only in years when there are special charges to hide them in. The improvement disappears when the special items do.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "earnings-cases",
      title: "Evaluating earnings quality: lessons from the record",
      los: ["h"],
      blocks: [
        {
          t: "p",
          html: `<p>The tools only become useful once you have seen them catch something. The cases below are illustrations drawn from the public record (SEC filings, enforcement releases and press coverage), not the curriculum's own case text. Each shows one mechanism from this module, and what an analyst could have seen before the restatement.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Sunbeam: big bath, then a manufactured turnaround",
              tone: "red",
              points: [
                "New management took a large restructuring charge in 1996, a year that was already bad",
                "1997 showed a dramatic turnaround, helped by bill-and-hold sales, discounts that pulled distributors' orders forward ('early buy'), and releases of reserves created in 1996",
                "The 1997 results were later restated, and the SEC brought fraud charges",
                "What an analyst could see: receivables and inventory rising far faster than sales, CFO far below net income, and a recovery that the industry did not share",
              ],
            },
            {
              title: "WorldCom: operating costs capitalized",
              tone: "amber",
              points: [
                "Line costs, fees paid to other carriers for network access, were recorded as capital expenditure in 2001 and 2002, amounting to several billion dollars",
                "Net income AND CFO were both inflated, because the outflow moved from operating to investing",
                "What an analyst could see: line costs holding steady as a share of revenue while the telecom market deteriorated, and capital expenditure (and CFO) that did not fit a slowing market",
              ],
            },
            {
              title: "MicroStrategy: bundled contracts booked up front",
              tone: "purple",
              points: [
                "In 2000 the company restated results because it had recognized revenue on contracts combining software licenses and future services too early",
                "Revenue for service not yet delivered had been pulled into the current period",
                "What an analyst could see: rapid growth in revenue relative to cash collected, and large, complex contracts signed at quarter end",
              ],
            },
          ],
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Illustrations from the public record, not the curriculum's case text",
          html: "These summaries are built from SEC filings and press reports and stick to widely reported facts, without specific amounts. The curriculum presents its own case material, so the companies it names and the details it emphasizes may differ from what you see here. What carries over to the exam is the mechanism each case illustrates (a big bath followed by reserve releases, operating costs capitalized, revenue on bundled contracts pulled forward) and the warning signs an analyst could have read in the statements.",
        },
        {
          t: "p",
          html: `<p>Most real evaluations are less dramatic. A typical item set gives you a few years of a company's numbers and asks whether its earnings growth is sustainable. Use the decision tree below on any earnings increase you are asked to judge.</p>`,
        },
        {
          t: "tree",
          title: "Is this earnings increase sustainable?",
          root: "nonrec",
          nodes: {
            nonrec: {
              q: "Does the increase come from items that will not recur (asset sales, reserve releases, one-time gains, a change in estimate)?",
              help: "Read the notes on other income, provisions and changes in accounting estimates. A gain inside operating income counts.",
              options: [{ label: "Yes", next: "lowNonrec" }, { label: "No", next: "cash" }],
            },
            cash: {
              q: "Is the increase backed by cash: is CFO growing roughly in line with net income, and is the accruals ratio stable and in line with peers?",
              options: [{ label: "Yes", next: "peers" }, { label: "No", next: "lowAccr" }],
            },
            peers: {
              q: "Is the improvement in line with the industry, or explained by something specific (a new product, a cost program) that you can verify?",
              options: [{ label: "Yes", next: "high" }, { label: "No", next: "revert" }],
            },
            lowNonrec: { result: "Low quality: strip it out", tone: "red", html: "Remove the non-recurring items and forecast from recurring earnings. If management keeps producing 'non-recurring' gains or reserve releases, treat the pattern itself as a warning." },
            lowAccr: { result: "Low quality: accrual-driven", tone: "amber", html: "Earnings growing faster than cash means a growing accrual component, which is less persistent and more exposed to manipulation. Check receivables, inventory, capitalization and provisions for the source." },
            revert: { result: "Treat with caution: expect mean reversion", tone: "amber", html: "Exceptional profitability without an identifiable, durable cause tends to revert as competitors respond. Do not extend it into the forecast." },
            high: { result: "Higher quality: likely sustainable", tone: "green", html: "Recurring, cash-backed and explained. This is the kind of earnings growth that justifies a higher multiple." },
          },
        },
        {
          t: "check",
          id: "lm14-ec-1",
          q: "A company's net income rose 35% while revenue rose 4%. The notes show that a warranty provision fell from 90 to 40 although warranty claims paid were 20, and sales volumes were stable. The best assessment is that:",
          options: ["Earnings quality improved because costs fell", "Part of the increase is a release of reserves and is not sustainable", "The provision change is irrelevant because it is a non-cash item"],
          answer: 1,
          why: "The provision fell by 50 but only 20 was used for claims, so 30 was released into income. A release is a one-time boost (a cookie jar being emptied), not a sustainable improvement, and it matters precisely because it is a non-cash accrual.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "cash-flow",
      title: "Cash flow quality",
      los: ["l", "i"],
      blocks: [
        {
          t: "p",
          html: `<p>After everything above, it is tempting to give up on earnings and trust cash. Cash is harder to invent: there is a bank statement at the end of it. But "harder" is not "impossible", and the cash flow statement has its own soft spots: <b>timing</b> (when cash moves) and <b>classification</b> (which section it is reported in).</p>`,
        },
        {
          t: "h",
          text: "What high-quality cash flow looks like",
        },
        {
          t: "steps",
          title: "Indicators of cash flow quality",
          items: [
            { title: "Positive CFO, from sustainable sources", html: "A mature company should generate positive operating cash flow from its core business: collecting from customers, paying suppliers and staff on normal terms. CFO from selling receivables, stretching payables or one-off tax receipts is not sustainable." },
            { title: "Enough to fund the business", html: "CFO should be sufficient to cover capital expenditure, and over time dividends and debt repayments. A company that must keep borrowing to do so has low-quality cash flow even if CFO is positive." },
            { title: "In line with, or above, net income", html: "Over several years CFO should be at least comparable to net income. Net income persistently above CFO is the accruals warning again, seen from the cash side." },
            { title: "Stable relative to peers", html: "Lower volatility in CFO than peers, for reasons the business explains, supports quality. Unexplained spikes, especially at year end, do not." },
          ],
        },
        {
          t: "callout",
          tone: "trap",
          title: "Life cycle matters",
          html: "A start-up or a fast-growing company can have negative CFO for good reasons: it is investing in receivables and inventory to grow. Negative CFO is a concern for a mature company, not automatically for a young one. Judge cash flow against what the company's stage of life should produce.",
        },
        {
          t: "h",
          text: "How CFO gets managed",
        },
        {
          t: "table",
          caption: "Ways to flatter operating cash flow",
          head: ["Technique", "Mechanism", "Why it is low quality"],
          rows: [
            ["Stretching payables", "Delay paying suppliers past period end", "One-off: next period pays the bill. Repeating it requires ever longer payment terms"],
            ["Selling or securitizing receivables", "A factor pays now for collections due later; proceeds usually in CFO", "Pulls next period's collections forward; if the seller keeps the credit risk, it is really a borrowing"],
            ["Capitalizing operating costs", "The payment is reported in investing, not operating", "CFO rises by the full amount; CFO + CFI does not change"],
            ["Acquiring working capital", "Buy a company (CFI outflow), then collect its receivables and sell its inventory (CFO inflow)", "CFO is boosted by cash that was bought, not earned"],
            ["IFRS classification choices", "Report interest paid in financing, or interest and dividends received in operating", "Legal, but makes CFO higher than a peer's that chose differently"],
            ["Tax benefits of employee stock options", "When employees exercise options, the company can deduct their gain for tax, which cuts cash taxes paid. Under current US GAAP the excess tax benefit is in CFO", "Depends on the share price and on employees' exercise decisions, not on operations, so it should not be treated as recurring operating cash"],
            ["Timing purchases", "Delay inventory purchases or capital spending across the year end", "Shifts cash between periods; the business still needs the goods"],
          ],
        },
        {
          t: "callout",
          tone: "exam",
          title: "Stock option tax benefits: classification and sustainability",
          html: "<p>Under current US GAAP (Accounting Standards Update (ASU) 2016-09, effective for public companies for periods beginning after 15 December 2016), the excess tax benefit from employee stock options is reported in operating cash flow. Older material, written under the earlier rule, shows it as a financing inflow, so do not be thrown if a source puts it there.</p><p>Either way, the examinable point is sustainability. The benefit is large when the share price is high and employees exercise, and it shrinks or disappears when the share price falls or exercises slow. A CFO boost from this source depends on the share price and on employees' decisions, not on the business, so an analyst should not treat it as recurring operating cash and should consider removing it when judging sustainable CFO.</p>",
        },
        { t: "theater", scenario: "lm14-cfo-boost" },
        {
          t: "table",
          caption: "Classifying interest, dividends and taxes",
          head: ["Item", "IFRS (IAS 7)", "US GAAP (ASC 230)"],
          rows: [
            ["Interest paid", "Operating or financing", "Operating"],
            ["Interest received", "Operating or investing", "Operating"],
            ["Dividends paid", "Operating or financing", "Financing"],
            ["Dividends received", "Operating or investing", "Operating"],
            ["Income taxes paid", "Operating, unless specifically identified with investing or financing", "Operating"],
          ],
          note: "When comparing an IFRS company with a US GAAP company (or with an IFRS peer that chose differently), move the items so that both are on the same basis before comparing CFO.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Beyond the curriculum, flagged so you do not mistake it for exam content",
          html: "IFRS 18, effective for annual periods beginning on or after 1 January 2027, amends IAS 7 so that most non-financial companies must classify interest paid and dividends paid in financing, and interest and dividends received in investing, removing much of this choice. The 2026 exam is set on the current IAS 7 choices.",
        },
        {
          t: "h",
          text: "Evaluating cash flow quality: adjusting CFO",
        },
        {
          t: "p",
          html: `<p>Oakridge Retail reports CFO of 1,000 and net income of 300. The notes show that it sold 500 of receivables to a factor on 31 December, and that it held back 400 of supplier payments due in the last week of the year until January. Strip out both and sustainable CFO is 1,000 - 500 - 400 = 100: one third of net income, not more than three times it. An IFRS reporter that also classifies 60 of interest paid in financing, when the peer group reports it in operating, should be adjusted down by another 60 before comparison.</p>
<p>Notice the direction of every adjustment: the analyst is not trying to find a "true" CFO to the decimal, but to remove what will not repeat and to put companies on the same basis.</p>`,
        },
        {
          t: "check",
          id: "lm14-cf-1",
          q: "An IFRS company reports interest paid in financing activities. Its peer, also under IFRS, reports interest paid in operating activities. To compare them, an analyst should:",
          options: ["Increase the first company's CFO by its interest paid", "Decrease the first company's CFO by its interest paid", "Make no adjustment, because both choices are permitted under IFRS"],
          answer: 1,
          why: "Moving the first company's interest paid into operating activities reduces its CFO, putting it on the same basis as the peer. Both choices are permitted, which is exactly why comparisons need the adjustment.",
        },
        {
          t: "check",
          id: "lm14-cf-2",
          q: "A company acquires a competitor for 800 in cash. Over the following months it collects the competitor's 150 of receivables. Relative to an otherwise identical company that grew organically, the acquirer's CFO is most likely:",
          options: ["Overstated, because the collections were bought through an investing outflow", "Understated, because the purchase price reduces CFO", "Unaffected, because acquisitions only affect CFI"],
          answer: 0,
          why: "The 800 is an investing outflow, but collecting the acquired receivables is an operating inflow. CFO includes 150 of cash that was purchased, not generated by the acquirer's operations.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "balance-sheet",
      title: "Balance sheet quality",
      los: ["j", "k"],
      blocks: [
        {
          t: "p",
          html: `<p>An income statement can be wrong by a year's worth of bias. A balance sheet can be wrong by many years' worth, because it accumulates every past recognition and measurement choice. The curriculum judges a balance sheet on its completeness, the neutrality of its measurements, and the clarity of its presentation.</p>`,
        },
        {
          t: "compare",
          items: [
            {
              title: "Completeness",
              tone: "accent",
              points: [
                "Are all the obligations there? Look for off-balance-sheet items: purchase commitments and take-or-pay contracts, guarantees of others' debt, unconsolidated special purpose or variable interest entities",
                "Equity-method investments show one net line, so the associate's debt is invisible",
                "Leases are now on the balance sheet under IFRS 16 and ASC 842, but older data and short-term leases may still need adjusting",
              ],
            },
            {
              title: "Unbiased measurement",
              tone: "amber",
              points: [
                "Fair values without market prices (Level 3 assets and liabilities)",
                "Goodwill and other intangibles, carried on management's impairment forecasts",
                "Pension obligations, which depend on discount rates and salary assumptions",
                "Inventory (under US GAAP, a large LIFO reserve means the balance sheet understates current cost); receivables net of an allowance; deferred tax assets net of a valuation allowance",
              ],
            },
            {
              title: "Clear presentation",
              tone: "green",
              points: [
                "Is the balance sheet organized so a reader can see what matters? Large 'other' lines, aggregated items and unusual classifications are a warning",
                "Standards allow considerable latitude in which items are shown separately, so presentation choices are themselves informative",
                "Check that current and non-current classification matches the substance (callable debt, long-dated receivables)",
              ],
            },
          ],
        },
        {
          t: "h",
          text: "Evaluating balance sheet quality: three quick tests",
        },
        {
          t: "steps",
          title: "Applied examples",
          items: [
            { title: "Goodwill against market value", html: "A company carries goodwill of 900 and total equity of 1,200, and its market capitalization is 1,000. The market values the whole equity below its book value, which is hard to reconcile with goodwill that has not been impaired. Goodwill is likely overstated, and so are assets and equity; an analyst would test the effect of writing some or all of it off." },
            { title: "Hidden obligations", html: "A retailer guarantees the debt of a supplier it depends on and has a long take-or-pay contract for capacity. Neither is on the balance sheet; both are in the notes. Adding them as debt-like obligations changes leverage, and possibly the credit view." },
            { title: "A shrinking allowance", html: "Gross receivables grow 30% while the allowance for doubtful accounts is unchanged, so the allowance falls from 5% to under 4% of receivables. Unless credit quality genuinely improved, receivables (and profit) are overstated by the under-provision." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Every earnings problem leaves a balance sheet footprint",
          html: "Every aggressive income statement choice leaves an asset too high or a liability too low: early revenue leaves receivables too high, capitalized costs leave assets too high, under-provisioning leaves liabilities too low. That is why the balance-sheet accruals ratio works: it measures the earnings problem through the balance sheet it inflates.",
        },
        {
          t: "check",
          id: "lm14-bs-1",
          q: "Which of the following most clearly reduces the completeness of a company's balance sheet?",
          options: ["Using the equity method for a 30% associate that carries heavy debt", "Measuring a listed bond holding at fair value through profit or loss", "Reporting inventory at the lower of cost and net realizable value"],
          answer: 0,
          why: "Under the equity method the associate's liabilities are netted inside a single investment line, so debt the investor effectively stands behind does not appear. The other two are measurement choices that keep the item on the balance sheet.",
        },
        {
          t: "check",
          id: "lm14-bs-2",
          q: "A company's market capitalization is well below the book value of its equity, and goodwill represents 70% of equity. An analyst assessing balance sheet quality should most likely conclude that:",
          options: ["Goodwill is conservatively measured", "Goodwill may be overstated, and an impairment may be overdue", "The market price is irrelevant to the carrying amount of goodwill"],
          answer: 1,
          why: "If the market values the whole company below book, the premium paid in past acquisitions is hard to support. Impairment tests rely on management's forecasts, so a carrying amount the market does not support is a measurement-bias warning.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "risk-sources",
      title: "Sources of information about risk",
      los: ["m"],
      blocks: [
        {
          t: "p",
          html: `<p>Quality and risk overlap: a company that hides a problem in its accounts also hides a risk. So the last question is where an analyst finds information about risk, and how much each source can be trusted.</p>`,
        },
        {
          t: "steps",
          title: "Where to look",
          items: [
            { title: "The financial statements and their notes", html: "The statements show leverage, liquidity and profitability; the notes add what the face of the statements cannot: contingencies and commitments, guarantees, related-party transactions, segment results, fair value hierarchy levels, and financial-instrument risk disclosures (under IFRS 7: credit, liquidity and market risk). Risk often shows up first as a change in a note." },
            { title: "Management commentary (management's discussion and analysis, MD&A)", html: "Required narrative on results, trends, liquidity, capital resources, principal risks and critical accounting estimates. Useful because it says what management thinks matters; limited because management writes it, and risk disclosures can be boilerplate. Compare it year to year: a new risk, or a risk that quietly disappears, is information." },
            { title: "The auditor's report", html: "The opinion itself: <b>unmodified</b> (clean), <b>qualified</b> (fairly presented except for a specific matter), <b>adverse</b> (not fairly presented), or a <b>disclaimer</b> (the auditor could not obtain enough evidence to form an opinion). A paragraph on <b>material uncertainty related to going concern</b> warns that the company may not survive the next year. <b>Key audit matters</b> (under International Standards on Auditing, ISA 701: the matters of most significance in the audit) and <b>critical audit matters</b> (under the US Public Company Accounting Oversight Board, PCAOB, AS 3101: matters communicated to the audit committee that relate to material accounts or disclosures and involved especially challenging, subjective or complex auditor judgment) point to the areas where the auditor's judgment mattered most. For larger US public companies (accelerated filers) the auditor also reports on internal control over financial reporting." },
            { title: "Other required disclosures", html: "Regulatory filings that are informative in themselves: a change of auditor (and any disagreements disclosed with it), a notification that a periodic report will be filed late, a restatement, the departure of senior finance officers, related-party dealings, and proxy statements describing management compensation." },
            { title: "The financial press", html: "Investigative journalism has uncovered problems before auditors and regulators did. The press is not a primary source, so it needs verification, but a well-sourced story about a company's accounting is a reason to look harder." },
          ],
        },
        {
          t: "callout",
          tone: "trap",
          title: "Why the audit opinion is a weak early-warning signal",
          html: "<p>The opinion is about the past period and arrives after it ends. A going concern warning often comes when the market has already priced the distress. The audit gives reasonable, not absolute, assurance and is not designed to detect all fraud. And the auditor is paid by the company it audits. Treat a clean opinion as a minimum condition, and a modified one, a going concern paragraph, a new key or critical audit matter, or a change of auditor as strong signals.</p>",
        },
        {
          t: "sort",
          prompt: "What does each signal most directly tell you?",
          buckets: [
            { id: "survive", label: "Survival risk" },
            { id: "report", label: "Reporting-quality risk" },
          ],
          items: [
            { text: "A material uncertainty related to going concern paragraph", bucket: "survive", why: "The auditor doubts the company can continue for the next year." },
            { text: "The company changes auditor two months before year end", bucket: "report", why: "An unexplained auditor change, especially near year end, can signal a disagreement over accounting." },
            { text: "A notification that the annual report will be filed late", bucket: "report", why: "Late filing often means unresolved accounting or audit issues." },
            { text: "A qualified opinion on the treatment of revenue on long-term contracts", bucket: "report", why: "The auditor disagrees with a specific accounting treatment: a direct quality warning." },
            { text: "MD&A newly discloses that a debt covenant may be breached within the year", bucket: "survive", why: "A covenant breach can make debt callable and threaten liquidity." },
          ],
        },
        {
          t: "check",
          id: "lm14-rs-1",
          q: "An auditor issues an unmodified opinion on a company's financial statements. The most appropriate conclusion is that:",
          options: ["The statements are free of fraud", "The auditor has reasonable assurance that the statements are fairly presented in all material respects", "The company's earnings are of high quality"],
          answer: 1,
          why: "An unmodified opinion gives reasonable, not absolute, assurance about fair presentation. It says nothing about whether the earnings are sustainable, and an audit is not designed to detect all fraud.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "A conservative report is a high-quality report.", right: "Quality means neutrality. Conservative bias understates this period and tends to reverse into an overstatement later (big bath, then cookie jar)." },
    { wrong: "If net income is backed by strong CFO, the earnings are high quality.", right: "Capitalizing operating costs raises net income AND CFO by moving the outflow to investing; stretching payables and selling receivables raise CFO with no change in profit. Check CFO + CFI and the sources of CFO." },
    { wrong: "A Beneish M-score of -2.0 flags a likely manipulator because it is negative.", right: "Almost all M-scores are negative. The curriculum's cutoff is -1.78; a company is flagged when its score is ABOVE (less negative than) -1.78." },
    { wrong: "GMI above 1 means gross margin improved.", right: "GMI is last year's margin divided by this year's, so above 1 means the margin deteriorated. DEPI is built the same way round: above 1 means the depreciation rate fell." },
    { wrong: "In the cash-flow accruals formula, a negative CFI reduces accruals.", right: "Accruals = NI - (CFO + CFI). With CFI negative, subtracting it increases accruals: 100 - (10 + (-150)) = 240." },
    { wrong: "Net operating assets are total assets minus total liabilities.", right: "That is equity. NOA strips the financial items out first: (total assets - cash and short-term investments) - (total liabilities - total debt)." },
    { wrong: "Earnings with a larger accrual component are more persistent because accruals smooth out cash flow timing.", right: "The accrual component is LESS persistent: accruals reverse and they carry the estimates. Larger accruals mean faster mean reversion and lower earnings quality." },
    { wrong: "Classification shifting changes net income.", right: "It moves costs between lines (core expenses into special items). Net income is unchanged; core earnings, which investors value most, are overstated." },
    { wrong: "Channel stuffing creates profit.", right: "It moves profit from next period into this one. Over the two periods total profit is unchanged, and the reversal (returns, or missing orders) depresses the next period." },
    { wrong: "An unmodified audit opinion means the statements contain no fraud.", right: "An audit gives reasonable assurance about material misstatement and is not designed to detect all fraud." },
    { wrong: "Under IFRS, impaired PP&E can never be written back up.", right: "IFRS permits reversal of impairment losses on assets other than goodwill, up to the carrying amount without the impairment. US GAAP prohibits reversal for assets held for use." },
    { wrong: "A higher Altman Z-score signals higher bankruptcy risk.", right: "Higher is better: a higher Z-score means a lower probability of bankruptcy." },
    { wrong: "Negative CFO always means low cash flow quality.", right: "It depends on the life cycle. A young, fast-growing company investing in working capital can have negative CFO for good reasons; for a mature company it is a warning." },
  ],

  gaap: [
    { topic: "Interest paid (cash flow statement)", ifrs: "Operating or financing", usgaap: "Operating" },
    { topic: "Interest and dividends received", ifrs: "Operating or investing", usgaap: "Operating" },
    { topic: "Dividends paid", ifrs: "Operating or financing", usgaap: "Financing" },
    { topic: "Impairment reversal (assets other than goodwill)", ifrs: "Permitted, up to the carrying amount without the impairment", usgaap: "Prohibited for assets held for use" },
    { topic: "Development costs", ifrs: "Capitalized once technical and commercial feasibility criteria are met; research expensed", usgaap: "Research and development generally expensed (software development has specific capitalization rules)" },
    { topic: "Extraordinary items", ifrs: "Prohibited", usgaap: "Category eliminated in 2015" },
    { topic: "Inventory cost flow", ifrs: "FIFO or weighted average; LIFO not permitted", usgaap: "LIFO also permitted; LIFO liquidations can boost profit" },
    { topic: "Auditor's report: areas of most judgment", ifrs: "Key audit matters (ISA 701, International Standards on Auditing)", usgaap: "Critical audit matters (PCAOB AS 3101, for US public companies)" },
  ],

  formulas: [
    { name: "Net operating assets", tex: "\\text{NOA} = (\\text{TA} - \\text{Cash and short-term investments}) - (\\text{TL} - \\text{Total debt})", plain: "Operating assets less operating liabilities." },
    { name: "Balance-sheet aggregate accruals", tex: "\\text{NOA}_t - \\text{NOA}_{t-1}", plain: "Growth in net operating assets." },
    { name: "Balance-sheet accruals ratio", tex: "\\dfrac{\\text{NOA}_t - \\text{NOA}_{t-1}}{(\\text{NOA}_t + \\text{NOA}_{t-1})/2}", plain: "Accruals scaled by average NOA so companies of different sizes can be compared." },
    { name: "Cash-flow aggregate accruals", tex: "\\text{NI}_t - (\\text{CFO}_t + \\text{CFI}_t)", plain: "Profit not matched by operating and investing cash flows." },
    { name: "Cash-flow accruals ratio", tex: "\\dfrac{\\text{NI}_t - (\\text{CFO}_t + \\text{CFI}_t)}{(\\text{NOA}_t + \\text{NOA}_{t-1})/2}", plain: "Higher ratio, lower earnings quality." },
    { name: "Earnings persistence", tex: "\\text{Earnings}_{t+1} = \\alpha + \\beta_1\\,\\text{Cash flow}_t + \\beta_2\\,\\text{Accruals}_t + \\varepsilon,\\ \\ \\beta_2 < \\beta_1", plain: "The accrual component persists less than the cash component." },
    { name: "Beneish M-score", tex: "M = -4.84 + 0.920\\,\\text{DSRI} + 0.528\\,\\text{GMI} + 0.404\\,\\text{AQI} + 0.892\\,\\text{SGI} + 0.115\\,\\text{DEPI} - 0.172\\,\\text{SGAI} + 4.679\\,\\text{TATA} - 0.327\\,\\text{LVGI}", plain: "Above -1.78: flagged as a likely manipulator." },
    { name: "Probability of manipulation", tex: "P = N(M)", plain: "The standard normal cumulative distribution evaluated at the M-score. N(-1.78) is about 3.8%." },
    { name: "Days sales in receivables index", tex: "\\text{DSRI} = \\dfrac{\\text{Rec}_t / \\text{Sales}_t}{\\text{Rec}_{t-1} / \\text{Sales}_{t-1}}", plain: "Above 1: receivables outgrowing sales." },
    { name: "Total accruals to total assets", tex: "\\text{TATA} = \\dfrac{\\text{Income from continuing operations}_t - \\text{CFO}_t}{\\text{TA}_t}", plain: "Above 0: earnings exceed operating cash flow." },
    { name: "Altman Z-score", tex: "Z = 1.2\\,\\frac{\\text{WC}}{\\text{TA}} + 1.4\\,\\frac{\\text{RE}}{\\text{TA}} + 3.3\\,\\frac{\\text{EBIT}}{\\text{TA}} + 0.6\\,\\frac{\\text{MV equity}}{\\text{BV liabilities}} + 1.0\\,\\frac{\\text{Sales}}{\\text{TA}}", plain: "WC = working capital, RE = retained earnings. Higher is safer." },
    { name: "Days sales outstanding", tex: "\\text{DSO} = \\dfrac{\\text{Receivables}}{\\text{Revenue}} \\times 365", plain: "A jump with no change in credit terms points at early or fictitious revenue." },
    { name: "Implied average useful life", tex: "\\dfrac{\\text{Gross PP\\&E}}{\\text{Depreciation expense}}", plain: "Compare with history and peers to spot stretched lives." },
  ],

  recall: [
    { q: "Distinguish financial reporting quality from earnings quality.", a: "Reporting quality is about the information: complete, neutral, compliant, decision-useful. Earnings (results) quality is about the performance: sustainable earnings that provide an adequate return. Low reporting quality makes earnings quality impossible to assess." },
    { q: "List the quality spectrum from best to worst.", a: "GAAP, decision-useful, sustainable and adequate returns; GAAP and decision-useful but not sustainable or adequate; GAAP but biased choices; within GAAP but earnings management; departures from GAAP (non-compliant); fictitious transactions." },
    { q: "Why is conservative bias still a quality problem?", a: "It misstates the current period and tends to reverse: an excessive charge now (big bath) creates reserves that can be released later (cookie jar), inflating future earnings." },
    { q: "Name the three legs of the fraud triangle.", a: "Opportunity, motivation (pressure) and rationalization." },
    { q: "Name four mechanisms that discipline reporting quality.", a: "Markets (cost of capital), regulators, auditors, and private contracting (lenders' and investors' contracts)." },
    { q: "Give the seven steps of evaluating report quality.", a: "Understand the company and industry; learn about management; identify significant areas of judgment; make comparisons (over time, with peers, across statements); check for warning signs; examine segment data for shifting; use quantitative tools." },
    { q: "Name the eight Beneish variables.", a: "DSRI, GMI, AQI, SGI, DEPI, SGAI, TATA (total accruals to total assets) and LVGI." },
    { q: "What M-score cutoff does the curriculum use, and what probability does it imply?", a: "-1.78; N(-1.78) is about 3.8%. Above the cutoff, a company is flagged as a likely manipulator." },
    { q: "Give three limitations of the Beneish model.", a: "It relies on reported accounting data; its predictive power has declined over time; managers aware of the model can manage its inputs." },
    { q: "Define NOA and the two accruals ratios.", a: "NOA = (TA - cash and short-term investments) - (TL - total debt). Balance-sheet ratio = change in NOA / average NOA. Cash-flow ratio = (NI - CFO - CFI) / average NOA." },
    { q: "Why does the accrual component of earnings revert faster?", a: "Accruals reverse by construction and contain the estimates where bias and error live, so the coefficient on accruals in a persistence regression is lower than the coefficient on cash flow." },
    { q: "List three ways to boost CFO without improving operations.", a: "Stretching payables, selling or securitizing receivables, capitalizing operating costs (also: acquiring working capital through acquisitions, IFRS classification choices for interest and dividends)." },
    { q: "What three attributes define balance sheet quality?", a: "Completeness (no missing obligations), unbiased measurement (fair values, goodwill, pensions, allowances), and clear presentation." },
    { q: "What are the four types of audit opinion?", a: "Unmodified (clean), qualified, adverse, and a disclaimer of opinion. A going concern paragraph and key or critical audit matters add information." },
  ],

  itemSets: [
    {
      id: "lm14-is1",
      title: "Sorrel Industries: measuring accruals",
      vignette: `<p>An analyst is assessing the earnings quality of Sorrel Industries, whose net income rose 30% last year. Selected data (in millions):</p>
<table><thead><tr><th></th><th>End of 20X1</th><th>End of 20X2</th></tr></thead><tbody>
<tr><td>Total assets</td><td>5,000</td><td>5,800</td></tr>
<tr><td>Cash and short-term investments</td><td>600</td><td>500</td></tr>
<tr><td>Total liabilities</td><td>2,800</td><td>3,200</td></tr>
<tr><td>Total debt</td><td>1,800</td><td>2,000</td></tr>
</tbody></table>
<p>For 20X2, net income was 420, cash flow from operating activities was 150 and cash flow from investing activities was -450. Sorrel's main competitor has a balance-sheet accruals ratio of about 3%, stable for several years.</p>`,
      questions: [
        {
          q: "Sorrel's net operating assets at the end of 20X2 are closest to:",
          options: ["4,100", "2,100", "5,300"],
          answer: 0,
          why: "NOA = (5,800 - 500) - (3,200 - 2,000) = 5,300 - 1,200 = 4,100. Subtracting all liabilities instead of only the operating ones gives (5,800 - 500) - 3,200 = 2,100, which is equity less cash; stopping after removing cash gives 5,300.",
        },
        {
          q: "Sorrel's balance-sheet based accruals ratio for 20X2 is closest to:",
          options: ["18.7%", "17.1%", "20.6%"],
          answer: 0,
          why: "NOA at the end of 20X1 = (5,000 - 600) - (2,800 - 1,800) = 3,400. Accruals = 4,100 - 3,400 = 700. Average NOA = (3,400 + 4,100) / 2 = 3,750. Ratio = 700 / 3,750 = 18.7%. Dividing by ending or beginning NOA gives 17.1% or 20.6%.",
        },
        {
          q: "Sorrel's cash-flow based accruals ratio for 20X2 is closest to:",
          options: ["19.2%", "7.2%", "-4.8%"],
          answer: 0,
          why: "Accruals = NI - (CFO + CFI) = 420 - (150 - 450) = 720. Ratio = 720 / 3,750 = 19.2%. Ignoring CFI gives 270 / 3,750 = 7.2%; adding CFI with the wrong sign gives (420 - 150 - 450) / 3,750 = -4.8%.",
        },
        {
          q: "Compared with its competitor, Sorrel's earnings are most likely to be:",
          options: ["Less persistent, and likely to revert toward the mean faster", "More persistent, because its net operating assets are growing", "Equally persistent, because both ratios are positive"],
          answer: 0,
          why: "Sorrel's accruals ratios (about 19%) are far above the competitor's 3%. Earnings with a large accrual component are less persistent, so Sorrel's 30% earnings growth is of lower quality and more likely to mean-revert.",
        },
      ],
    },
    {
      id: "lm14-is2",
      title: "Quarry Point: screening for manipulation",
      vignette: `<p>A screening analyst computes the Beneish variables for Quarry Point Inc. from its last two annual reports:</p>
<table><thead><tr><th>DSRI</th><th>GMI</th><th>AQI</th><th>SGI</th><th>DEPI</th><th>SGAI</th><th>TATA</th><th>LVGI</th></tr></thead><tbody>
<tr><td>1.45</td><td>1.20</td><td>1.10</td><td>1.35</td><td>1.05</td><td>0.95</td><td>0.06</td><td>1.10</td></tr>
</tbody></table>
<p>The analyst uses the model M = -4.84 + 0.920 DSRI + 0.528 GMI + 0.404 AQI + 0.892 SGI + 0.115 DEPI - 0.172 SGAI + 4.679 TATA - 0.327 LVGI, the curriculum's cutoff of -1.78, and the standard normal distribution to convert M into a probability.</p>`,
      questions: [
        {
          q: "Quarry Point's M-score is closest to:",
          options: ["-1.35", "-1.63", "-2.48"],
          answer: 0,
          why: "M = -4.84 + 1.334 + 0.634 + 0.444 + 1.204 + 0.121 - 0.163 + 0.281 - 0.360 = -1.35. Leaving out the accruals term (0.281) gives -1.63; -2.48 is the score of a company with every index at 1 and zero accruals.",
        },
        {
          q: "Based on its M-score, Quarry Point is best described as:",
          options: ["Flagged as a likely manipulator, with an estimated probability of manipulation of roughly 9%", "Not flagged, because its M-score is negative", "Flagged, because its probability of manipulation exceeds 50%"],
          answer: 0,
          why: "-1.35 is above the -1.78 cutoff, so the screen flags it. The probability is N(-1.35), about 8.9%: low in absolute terms but well above the 3.8% that the cutoff represents.",
        },
        {
          q: "Which variable most directly suggests that Quarry Point may be recognizing revenue prematurely?",
          options: ["DSRI", "SGAI", "LVGI"],
          answer: 0,
          why: "DSRI of 1.45 means receivables rose 45% faster than sales. Revenue booked before it is earned creates receivables that are not collected on normal terms, which is exactly what DSRI picks up.",
        },
        {
          q: "Which statement about the limitations of the M-score is most accurate?",
          options: ["It cannot be computed from published financial statements", "Its predictive power can erode as managers learn which ratios it uses and manage them", "A score above -1.78 proves that manipulation has occurred"],
          answer: 1,
          why: "The model is built from published data, and a high score only raises the estimated probability. Its usefulness declines as managers become aware of it and avoid moving the ratios it watches.",
        },
      ],
    },
    {
      id: "lm14-is3",
      title: "Harbor Lane Retail: cash flow quality",
      vignette: `<p>Harbor Lane Retail reports under IFRS. For the latest year it reported net income of 500 and cash flow from operating activities of 900. An analyst comparing Harbor Lane with peers that all report interest paid in operating activities notes:</p>
<ul>
<li>On 30 December, Harbor Lane sold 250 of trade receivables to a factor without recourse; the proceeds are included in operating activities.</li>
<li>Accounts payable rose by 180 because Harbor Lane extended its payment terms with suppliers from 45 to 75 days late in the year.</li>
<li>Harbor Lane capitalized 120 of software development costs during the year (an investing outflow); its peers expense similar costs.</li>
<li>Harbor Lane reports its 60 of interest paid in financing activities.</li>
</ul>`,
      questions: [
        {
          q: "CFO after removing the effects of the receivables sale and the payables stretch is closest to:",
          options: ["470", "650", "720"],
          answer: 0,
          why: "Both are one-off boosts to CFO: 900 - 250 - 180 = 470. Removing only the receivables sale gives 650; removing only the payables stretch gives 720.",
        },
        {
          q: "After also putting interest paid on the same basis as the peers, Harbor Lane's adjusted CFO is closest to:",
          options: ["410", "530", "470"],
          answer: 0,
          why: "Peers report interest paid in operating activities, so Harbor Lane's 60 must be moved into operating: 470 - 60 = 410. Adding it instead would give 530.",
        },
        {
          q: "Compared with expensing the software costs as peers do, Harbor Lane's capitalization most likely results in:",
          options: ["Higher net income and higher CFO this year", "Higher net income and unchanged CFO this year", "Unchanged net income and higher CFI this year"],
          answer: 0,
          why: "Capitalizing removes the expense (only amortization is charged), so net income is higher, and the payment is reported in investing rather than operating, so CFO is higher by the full 120 while CFI is lower.",
        },
        {
          q: "Which of the following would be the strongest evidence of high cash flow quality at Harbor Lane?",
          options: ["CFO that jumps in the fourth quarter of each year", "CFO that has exceeded net income for several years and comfortably covers capital expenditure, with stable payables and receivables periods", "CFO that grows faster than revenue because payment terms to suppliers keep lengthening"],
          answer: 1,
          why: "High-quality CFO is positive, generated by sustainable operations, at least comparable to net income over time, and sufficient to fund investment. Year-end spikes and ever-longer payment terms are signs of timing management.",
        },
      ],
    },
  ],

  flags: [],
};
