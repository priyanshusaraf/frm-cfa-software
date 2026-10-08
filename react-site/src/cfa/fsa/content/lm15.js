/* LM15 Integration of Financial Statement Analysis Techniques.
   Built around one demo multinational, as the curriculum builds the module
   around one extended case. Demo cast: Pinnacle Corp (US-listed consumer goods
   group, US GAAP, uses LIFO), its 30% associate Kestrel Ltd (equity method,
   listed), and Aster Group (an IFRS peer used for comparability work).
   All figures are illustrative; every ratio quoted in prose was recomputed. */
export default {
  id: "lm15",
  num: 15,
  title: "Integration of Financial Statement Analysis Techniques",
  short: "Integration case",
  tagline:
    "Every technique from the earlier modules, pointed at one question about one company: is Pinnacle's rising return on equity something an investor should pay for?",
  minutes: 240,
  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "framework",
      title: "Start from the question, not the spreadsheet",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>Your portfolio manager sends one line: "Pinnacle Corp's return on equity has gone up four years running. Do we buy?" Pinnacle is a US-listed consumer goods multinational that reports under US generally accepted accounting principles (US GAAP), sells beverages, foods and nutrition products, and owns 30% of a listed company, Kestrel Ltd, which it accounts for with the equity method.</p>
<p>The tempting move is to download ten years of statements, compute every ratio you know, and see what jumps out. It fails for a practical reason: you will produce forty ratios, most of them irrelevant to the question, and you will still not know which adjustments matter. A credit analyst asking whether Pinnacle deserves its A rating needs leverage including every debt-like obligation; an equity analyst valuing Pinnacle against peers needs earnings that are comparable across companies and sustainable over time. Same company, same annual report, different work.</p>
<p>So integration starts with the purpose. The curriculum frames the work as a six-phase framework, and the point of the framework is that each phase produces something specific that the next phase consumes. The rest of this module walks through the framework applied to Pinnacle, the way the curriculum walks through its own extended case of a multinational.</p>`,
        },
        {
          t: "table",
          caption: "The financial statement analysis framework",
          head: ["Phase", "Sources of information", "What it produces"],
          rows: [
            ["1. Articulate the purpose and context of the analysis", "The nature of the analyst's function (equity, credit, lending), communication with the client or supervisor, institutional guidelines", "A statement of the purpose and context; the specific questions to be answered; the nature and content of the final report; the timetable and budget"],
            ["2. Collect input data", "Financial statements and notes, other financial data, industry and economic data, discussions with management, suppliers, customers and competitors, site visits", "Organized financial statements, tables of financial data, completed questionnaires"],
            ["3. Process data", "The data collected in phase 2", "Adjusted financial statements, common-size statements, ratios and graphs, forecasts"],
            ["4. Analyze and interpret the processed data", "Input data and processed data", "Analytical results: answers to the questions from phase 1"],
            ["5. Develop and communicate conclusions and recommendations", "Analytical results and previous reports; institutional guidelines for published reports", "An analytical report answering the phase 1 questions, with a recommendation (buy or not, lend or not)"],
            ["6. Follow up", "Information gathered by periodically repeating the earlier phases", "Updated reports and recommendations"],
          ],
          note: "Phase 3 is where the adjusted statements live: every adjustment in this module (stripping the associate, capitalizing commitments, LIFO to FIFO, normalizing earnings) is a phase 3 output that phase 4 interprets.",
        },
        {
          t: "p",
          html: `<p>Phase 1 is the one candidates underrate. Writing down the questions decides how much of phases 2 to 4 is needed. For Pinnacle the portfolio manager's question breaks into concrete sub-questions, and each one maps to a technique:</p>
<ul>
<li>What drives return on equity (ROE), and which driver changed? (extended DuPont analysis)</li>
<li>How much of ROE comes from the associate rather than Pinnacle's own operations? (strip out the equity-method investment)</li>
<li>Where is capital invested, and is it going to the segments that earn the most? (segment data)</li>
<li>Are earnings backed by cash? (accruals ratios, cash flow relationships)</li>
<li>What is the market paying for the operating business alone? (market value decomposition)</li>
<li>Is there leverage the balance sheet does not show, and will new standards change the ratios? (off-balance-sheet adjustments, accounting changes)</li>
</ul>`,
        },
        {
          t: "compare",
          items: [
            { title: "Valuing equity against comparables", tone: "accent", points: ["Question: is Pinnacle cheap or dear relative to peers?", "Phase 3 focus: make earnings and book value comparable (accounting methods, one-off items, the associate)", "Key output: comparable price multiples on adjusted numbers"] },
            { title: "Critiquing a credit rating", tone: "purple", points: ["Question: does the rating reflect the real capacity to service debt?", "Phase 3 focus: every debt-like obligation, cash flow available for debt service", "Key output: adjusted leverage and coverage compared with the rating agency's thresholds"] },
            { title: "A comprehensive picture of leverage", tone: "amber", points: ["Question: how much does Pinnacle really owe?", "Phase 3 focus: leases and purchase commitments, pension deficits, guarantees, the associate's debt", "Key output: adjusted debt, debt to equity, debt to capital"] },
            { title: "Evaluating management's discussion", tone: "cyan", points: ["Question: does management's discussion and analysis (MD&A) tell the same story as the numbers?", "Phase 3 focus: recompute the drivers management claims (margin, mix, volume)", "Key output: where the narrative and the data diverge"] },
          ],
        },
        {
          t: "sort",
          prompt: "Each item is something the analyst does or produces while working on Pinnacle. Tap it, then tap the phase it belongs to.",
          buckets: [
            { id: "p1", label: "1. Purpose and context" },
            { id: "p2", label: "2. Collect data" },
            { id: "p3", label: "3. Process data" },
            { id: "p45", label: "4 and 5. Analyze, conclude" },
          ],
          items: [
            { text: "Agree with the portfolio manager that the report must say whether ROE growth is sustainable, by Friday", bucket: "p1", why: "Specific questions, the form of the report and the timetable are the phase 1 outputs." },
            { text: "Download four years of statements and Kestrel's market price; interview investor relations", bucket: "p2", why: "Gathering statements, market data and management discussions is collection." },
            { text: "Restate Pinnacle's inventory from LIFO (last in, first out) to FIFO (first in, first out)", bucket: "p3", why: "Adjusted financial statements are a phase 3 output." },
            { text: "Compute the five-factor DuPont decomposition for each year", bucket: "p3", why: "Ratios and common-size statements are produced in phase 3." },
            { text: "Conclude that ROE growth came from the associate, not the operating business", bucket: "p45", why: "Interpreting the processed data to answer the phase 1 question is phase 4, and writing it up is phase 5." },
            { text: "Recommend not paying a premium multiple for Pinnacle's headline earnings", bucket: "p45", why: "A recommendation tied to the purpose is the phase 5 deliverable." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "The framework is a loop, not a checklist",
          html: "Phase 4 regularly sends you back to phase 2. When the DuPont analysis shows Pinnacle's interest burden above 1.0, you go back to the notes to find out why. Follow-up (phase 6) repeats the whole cycle when new results arrive, which is why a good phase 1 also states what would change the conclusion.",
        },
        {
          t: "check",
          id: "lm15-fw-1",
          q: "A credit analyst is asked to critique Pinnacle's A rating. Compared with an equity analyst valuing Pinnacle against peers, the credit analyst's phase 3 work is most likely to emphasize:",
          options: ["Normalizing earnings for comparability of price to earnings multiples", "Adjusting debt for off-balance-sheet and debt-like obligations", "Decomposing the market value into the core business and the associate"],
          answer: 1,
          why: "The purpose decides the processing. A rating is about capacity to service debt, so the credit analyst needs the full amount owed: leases and purchase commitments, pension deficits, guarantees. Multiples and market value decomposition serve an equity valuation question.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "dupont",
      title: "Where does Pinnacle's ROE come from?",
      los: ["a", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle's ROE went from 16.25% to 17.80% over four years. Taken alone that number is a verdict without a trial. ROE can rise because the business earns more on each unit of sales, because it squeezes more sales out of its assets, because it borrows more, because its tax bill falls, or because something that is not the business at all is adding income. Investors pay very differently for those.</p>
<p>The <b>DuPont decomposition</b> splits ROE into factors that multiply back to ROE exactly, so a change in ROE can be traced to the factor that moved. The three-factor version separates profitability, efficiency and leverage:</p>`,
        },
        {
          t: "formula",
          name: "Three-factor DuPont",
          tex: "\\text{ROE} = \\frac{\\text{NI}}{\\text{Revenue}} \\times \\frac{\\text{Revenue}}{\\text{Avg total assets}} \\times \\frac{\\text{Avg total assets}}{\\text{Avg equity}}",
          plain: "NI is net income and TA total assets. Net profit margin times asset turnover times financial leverage: the revenues and the assets cancel, leaving net income over average equity.",
        },
        {
          t: "p",
          html: `<p>The three-factor version cannot tell you WHY the net margin moved. Net income sits below interest, taxes and anything else between operating profit and the bottom line. The five-factor version splits the net margin into three pieces:</p>`,
        },
        {
          t: "formula",
          name: "Five-factor (extended) DuPont",
          tex: "\\text{ROE} = \\underbrace{\\frac{\\text{NI}}{\\text{EBT}}}_{\\text{tax burden}} \\times \\underbrace{\\frac{\\text{EBT}}{\\text{EBIT}}}_{\\text{interest burden}} \\times \\underbrace{\\frac{\\text{EBIT}}{\\text{Revenue}}}_{\\text{EBIT margin}} \\times \\underbrace{\\frac{\\text{Revenue}}{\\text{Avg TA}}}_{\\text{asset turnover}} \\times \\underbrace{\\frac{\\text{Avg TA}}{\\text{Avg equity}}}_{\\text{leverage}}",
          plain: "EBIT is earnings before interest and taxes; EBT is earnings before tax (pretax income). The tax burden is the share of pretax profit kept after tax (one minus the effective tax rate). The interest burden is the share of operating profit left after financing costs. Both are normally below 1.0, so a HIGHER burden ratio means a LIGHTER burden.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "The naming trap",
          html: "A tax burden of 0.82 is better for shareholders than 0.75: the company keeps 82% of pretax profit. Candidates who read 'burden' literally pick the wrong direction. The same applies to the interest burden.",
        },
        {
          t: "table",
          caption: "Pinnacle Corp: inputs (averages for balance sheet items)",
          head: ["", "20X1", "20X2", "20X3", "20X4"],
          rows: [
            ["Revenue", "10,000", "10,300", "10,600", "10,800"],
            ["EBIT", "1,200", "1,190", "1,160", "1,130"],
            ["Interest expense", "100", "110", "120", "130"],
            ["Share of profit of associate (Kestrel)", "150", "230", "310", "380"],
            ["Pretax income (EBT)", "1,250", "1,310", "1,350", "1,380"],
            ["Income tax (25% of EBIT less interest)", "275", "270", "260", "250"],
            ["Net income", "975", "1,040", "1,090", "1,130"],
            ["Average total assets", "12,000", "12,500", "12,900", "13,300"],
            ["of which: average investment in associate", "1,500", "1,750", "2,000", "2,250"],
            ["Average equity", "6,000", "6,150", "6,250", "6,350"],
          ],
          note: "Pinnacle presents its share of Kestrel's profit between EBIT and pretax income. Kestrel pays its own taxes, so that share arrives already taxed and Pinnacle's tax expense is 25% of its own pretax profit only. The investment grows by more than Kestrel's undistributed profit because Pinnacle's share of Kestrel's other comprehensive income (mainly currency translation) is also added to it under the equity method.",
        },
        {
          t: "table",
          caption: "Pinnacle Corp: five-factor DuPont, as reported",
          head: ["", "20X1", "20X2", "20X3", "20X4"],
          rows: [
            ["Tax burden (NI / EBT)", "0.780", "0.794", "0.807", "0.819"],
            ["Interest burden (EBT / EBIT)", "1.042", "1.101", "1.164", "1.221"],
            ["EBIT margin", "12.0%", "11.6%", "10.9%", "10.5%"],
            ["Asset turnover", "0.833", "0.824", "0.822", "0.812"],
            ["Leverage (avg TA / avg equity)", "2.000", "2.033", "2.064", "2.094"],
            ["<b>ROE</b>", "<b>16.25%</b>", "<b>16.91%</b>", "<b>17.44%</b>", "<b>17.80%</b>"],
          ],
          note: "Check 20X1: 0.780 x 1.042 x 0.120 x 0.833 x 2.000 = 0.1625, and 975 / 6,000 = 16.25%.",
        },
        {
          t: "p",
          html: `<p>Read it like an analyst. The EBIT margin fell every year, 1.5 percentage points in total, and asset turnover drifted down. The operating business got worse. ROE still rose, and the factors that rose are the interest burden (from 1.042 to 1.221) and the tax burden (from 0.780 to 0.819), with a little help from leverage.</p>
<p>An interest burden above 1.0 should stop you. Pinnacle pays interest every year, so pretax income ought to be BELOW EBIT. It is above EBIT because Kestrel's profit sits between the two lines and grew from 150 to 380. The tax burden rises for the same reason: equity income is already taxed inside Kestrel, so the larger it gets, the smaller Pinnacle's tax expense looks as a fraction of pretax income. Both "improvements" are the associate wearing the operating business's clothes.</p>`,
        },
        { t: "widget", name: "DupontLab" },
        {
          t: "check",
          id: "lm15-dp-1",
          q: "Another company reports an interest burden (EBT / EBIT) of 1.08 even though it has significant debt. The most likely explanation is that:",
          options: ["Its effective tax rate is negative", "Income such as equity-method profit, interest income or a non-operating gain sits between EBIT and pretax income", "Its EBIT margin is unusually high"],
          answer: 1,
          why: "EBT can only exceed EBIT if something is ADDED between the two lines. With interest expense subtracted, the additions (share of associates' profit, interest income, non-operating gains) must exceed it. Taxes sit below EBT, and the margin level does not affect the ratio of EBT to EBIT.",
        },
        {
          t: "check",
          id: "lm15-dp-2",
          q: "Using the reported table, which factor contributed the most to the increase in Pinnacle's ROE from 20X1 to 20X4?",
          options: ["EBIT margin", "Interest burden", "Leverage"],
          answer: 1,
          why: "The interest burden rose from 1.042 to 1.221, about 17%, the largest proportional move of any factor. The EBIT margin moved the other way (12.0% to 10.5%) and leverage rose only about 5% (2.000 to 2.094).",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "associate",
      title: "Strip out the associate to see the operating business",
      los: ["c", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Kestrel is a real asset and its profit is real profit. The problem is that it is not Pinnacle's operating business, and the DuPont factors were designed to describe an operating business. Kestrel's 30% stake contributes income without revenue (so it distorts the burden ratios) and assets without revenue (so it depresses asset turnover). To see what Pinnacle's own beverages, foods and nutrition operations earn, remove the associate consistently from every factor.</p>`,
        },
        {
          t: "steps",
          title: "Removing an equity-method investment from the DuPont analysis",
          items: [
            { title: "Net income", html: "Subtract the share of profit of associates. It is an after-tax amount, so Pinnacle's own tax expense does not change." },
            { title: "Pretax income", html: "Subtract it here too when it is presented above the pretax line, as Pinnacle does. If a company presents it after tax (some companies reporting under International Financial Reporting Standards, IFRS, show it below income tax), EBT already excludes it and only net income changes." },
            { title: "EBIT and revenue", html: "Unchanged when equity income is presented below EBIT. The EBIT margin is the one factor the associate cannot touch." },
            { title: "Total assets", html: "Subtract the investment in associates (average balance for an average-based ratio): those assets produce no revenue for Pinnacle." },
            { title: "Equity", html: "Subtract the same investment, on the assumption that the stake was financed with equity rather than debt. This is a modelling choice; state it." },
          ],
        },
        { t: "theater", scenario: "lm15-strip-associate" },
        {
          t: "table",
          caption: "Pinnacle Corp: five-factor DuPont excluding the associate",
          head: ["", "20X1", "20X2", "20X3", "20X4"],
          rows: [
            ["Tax burden", "0.750", "0.750", "0.750", "0.750"],
            ["Interest burden", "0.917", "0.908", "0.897", "0.885"],
            ["EBIT margin", "12.0%", "11.6%", "10.9%", "10.5%"],
            ["Asset turnover", "0.952", "0.958", "0.972", "0.977"],
            ["Leverage", "2.333", "2.443", "2.565", "2.695"],
            ["<b>ROE</b>", "<b>18.33%</b>", "<b>18.41%</b>", "<b>18.35%</b>", "<b>18.29%</b>"],
          ],
          note: "20X4: net income 1,130 - 380 = 750; EBT 1,380 - 380 = 1,000; average assets 13,300 - 2,250 = 11,050; average equity 6,350 - 2,250 = 4,100. ROE = 750 / 4,100 = 18.29%.",
        },
        {
          t: "p",
          html: `<p>Now the picture is honest. The tax burden is flat at 0.750, exactly one minus Pinnacle's 25% tax rate, as it should be. The interest burden sits below 1.0 and slowly worsens as interest rises while EBIT falls. The operating business's ROE has gone nowhere: 18.33% to 18.29%. Its EBIT margin fell by 1.5 points; rising leverage (2.333 to 2.695), with a smaller lift from asset turnover (0.952 to 0.977), is what held its ROE level. Core leverage rises because the investment in Kestrel grows faster than Pinnacle's total equity, so the equity left for the operating business shrinks.</p>
<p>So the entire improvement in reported ROE came from Kestrel, whose profit grew from 150 to 380 on an investment that grew from 1,500 to 2,250. Kestrel's return on Pinnacle's carrying amount rose from 10.0% to 16.9%. Reported ROE is in effect a blend of the core ROE and Kestrel's return on its carrying amount. Kestrel's return is still below the core business's (16.9% against 18.3% in 20X4), which is why including it pulls reported ROE BELOW core ROE in every year; but because Kestrel's return is climbing toward the core's, the upward trend in reported ROE is entirely the associate's.</p>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "What the conclusion is, and what it is not",
          html: "The conclusion is NOT that Kestrel is bad. It is that an investor paying for Pinnacle's rising ROE is paying for a 30% minority stake Pinnacle does not control, while Pinnacle's own margin erodes. That changes the questions you take back to management (why is the operating margin falling?) and the way you value the company (value the stake separately, next section but one).",
        },
        {
          t: "callout",
          tone: "flag",
          title: "Check against your book",
          html: "Where equity income appears varies by company. The curriculum's case company presented its share of associates' results after tax; Pinnacle here presents it above pretax income, which is why it shows up in the interest burden. The removal rules above handle both. The curriculum case removed the investment from assets; whether it also reduces equity (as done here) should be checked against the 2026 exhibit.",
        },
        {
          t: "check",
          id: "lm15-as-1",
          q: "An associate's profit is presented between EBIT and pretax income. Removing the associate from a five-factor DuPont analysis will NOT change which factor?",
          options: ["Tax burden", "EBIT margin", "Asset turnover"],
          answer: 1,
          why: "Neither EBIT nor revenue includes anything from the associate, so the EBIT margin is unaffected. The tax burden changes because already-taxed income leaves both net income and pretax income, and asset turnover rises because the investment leaves total assets.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "segments",
      title: "Asset base and capital allocation: follow the capital expenditure",
      los: ["a", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Start with what the capital is sitting in. A common-size balance sheet (each asset as a percentage of total assets, year by year) shows the asset base composition and how it shifts. For Pinnacle the shift that matters is the associate: the investment in Kestrel rose from 12.5% of average total assets in 20X1 (1,500 / 12,000) to 16.9% in 20X4 (2,250 / 13,300). A growing slice of the capital sits in an asset that produces no revenue for Pinnacle, which is exactly why reported asset turnover drifted down while the operating assets were turning faster. The same common-size view flags a rising share of goodwill and other intangibles (growth by acquisition, and assets that are judgment-heavy to value) or a build-up of cash.</p>`,
        },
        {
          t: "p",
          html: `<p>The core business's EBIT margin is falling. Is that the whole company slipping, or one division dragging the rest? Group totals cannot answer that; the segment note can. Segment disclosures give revenue, operating profit, assets, capital expenditure and depreciation by business line, which is enough to compute where Pinnacle earns its returns and where it is investing.</p>`,
        },
        {
          t: "table",
          caption: "Pinnacle Corp: segment data, 20X4",
          head: ["Segment", "Revenue", "EBIT", "Segment assets", "Capital expenditure", "Depreciation"],
          rows: [
            ["Beverages", "4,000", "640", "3,200", "420", "240"],
            ["Foods", "4,500", "360", "4,800", "260", "300"],
            ["Nutrition", "2,300", "230", "2,500", "300", "150"],
            ["Unallocated corporate costs", "", "(100)", "", "", ""],
            ["Total", "10,800", "1,130", "10,500", "980", "690"],
          ],
          note: "Segment assets exclude the investment in Kestrel and unallocated corporate assets, so they sum to less than total assets.",
        },
        {
          t: "table",
          caption: "What the segment data says",
          head: ["Segment", "EBIT margin", "Segment return on assets (EBIT / assets)", "Capital expenditure / depreciation", "Share of assets", "Share of capital expenditure"],
          rows: [
            ["Beverages", "16.0%", "20.0%", "1.75x", "30.5%", "42.9%"],
            ["Foods", "8.0%", "7.5%", "0.87x", "45.7%", "26.5%"],
            ["Nutrition", "10.0%", "9.2%", "2.00x", "23.8%", "30.6%"],
          ],
        },
        {
          t: "p",
          html: `<p>Read the columns together. <b>Capital expenditure to depreciation</b> above 1.0 means a segment is growing its asset base; below 1.0 means it is not even replacing what wears out. Comparing each segment's share of capital expenditure with its share of assets shows where management is steering capital.</p>
<p>Beverages earns a 20% return on assets (ROA) and receives 42.9% of the capital expenditure with 30.5% of the assets: capital is flowing to the best business, which is what shareholders want. Foods is the largest segment by assets, earns 7.5%, and is being run down (0.87x). That is coherent if management sees no good projects there, but it also means the group's mix is shifting, which itself moves the group margin. Nutrition is the question mark: it earns 9.2%, barely more than Foods, yet gets capital expenditure at twice its depreciation. Either management expects returns to rise as the new capacity matures, or capital is being misallocated. The data cannot tell you which; it tells you exactly what to ask management and what to check in MD&A.</p>`,
        },
        {
          t: "formula",
          name: "Segment return and reinvestment",
          tex: "\\text{Segment ROA} = \\frac{\\text{Segment EBIT}}{\\text{Segment assets}};\\qquad \\text{Reinvestment} = \\frac{\\text{Segment capex}}{\\text{Segment depreciation}}",
          plain: "Segment ROA uses operating profit because interest and taxes are not allocated to segments. A reinvestment ratio above 1 means the segment's asset base is growing.",
        },
        {
          t: "callout",
          tone: "trap",
          title: "Segment numbers are not group numbers",
          html: "Segment EBIT is before unallocated corporate costs, and segment assets exclude corporate assets and investments. Different numerators and denominators mean segment ROAs are comparable with each other, not with a group ROA. The sum of the segments shows the bias: 1,230 of segment EBIT on 10,500 of segment assets is 11.7%, against 1,130 of group EBIT on 13,300 of average total assets, 8.5%. That does not make every segment beat the group figure (Foods earns 7.5%); it means the comparison is not like for like.",
        },
        {
          t: "check",
          id: "lm15-seg-1",
          q: "Based on the segment data, which segment's capital spending most needs an explanation from management?",
          options: ["Beverages", "Foods", "Nutrition"],
          answer: 2,
          why: "Nutrition receives capital expenditure at 2.0 times depreciation and a larger share of capex (30.6%) than of assets (23.8%) while earning only a 9.2% segment ROA. Beverages' heavy investment is backed by a 20% return, and Foods is being run down in line with its low return.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "earnings-quality",
      title: "Is Pinnacle's profit turning into cash?",
      los: ["a", "b", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Earnings are an accounting measure; cash is not. A company whose net income keeps rising while its cash from operations does not is either investing in working capital, recognizing income it has not yet collected, or recognizing income that is not cash at all. The accruals ratio measures how much of earnings is accrual rather than cash, scaled by net operating assets (NOA: operating assets minus operating liabilities) so that companies of different sizes compare.</p>`,
        },
        {
          t: "formula",
          name: "Accruals ratios",
          tex: "\\text{Balance sheet: } \\frac{\\text{NOA}_{end} - \\text{NOA}_{beg}}{(\\text{NOA}_{end} + \\text{NOA}_{beg})/2} \\qquad \\text{Cash flow: } \\frac{\\text{NI} - (\\text{CFO} + \\text{CFI})}{(\\text{NOA}_{end} + \\text{NOA}_{beg})/2}",
          plain: "CFO is cash flow from operating activities and CFI cash flow from investing activities. A higher accruals ratio means a larger share of earnings that is not cash, which the curriculum associates with lower earnings quality and faster mean reversion of earnings.",
        },
        {
          t: "table",
          caption: "Pinnacle Corp: earnings and cash",
          head: ["", "20X1", "20X2", "20X3", "20X4"],
          rows: [
            ["Net income", "975", "1,040", "1,090", "1,130"],
            ["Cash from operations (CFO)", "1,280", "1,250", "1,210", "1,190"],
            ["Cash from investing (CFI)", "(650)", "(700)", "(720)", "(760)"],
            ["Average net operating assets", "9,000", "9,400", "9,800", "10,200"],
            ["Cash flow accruals ratio", "3.8%", "5.2%", "6.1%", "6.9%"],
            ["CFO / net income", "1.31", "1.20", "1.11", "1.05"],
            ["Equity income less dividends received from Kestrel", "105", "175", "250", "310"],
            ["CFO / (NI - equity income + dividends from Kestrel)", "1.47", "1.45", "1.44", "1.45"],
          ],
          note: "20X4 accruals: (1,130 - 1,190 + 760) / 10,200 = 700 / 10,200 = 6.9%. Dividends from Kestrel: 45, 55, 60, 70.",
        },
        {
          t: "p",
          html: `<p>On the face of it this is a warning. The accruals ratio nearly doubled and CFO fell while net income rose. Before writing "deteriorating earnings quality" in the report, ask where the accruals come from, because the associate is again in the room. Equity income is recognized when Kestrel earns it, but Pinnacle only receives cash when Kestrel pays dividends. Pinnacle's share of Kestrel's undistributed profit is an accrual by construction: 105 in 20X1, 310 in 20X4.</p>
<p>Strip that out and the relationship is stable: CFO is about 1.45 times net income excluding the associate's undistributed profit in every year. Of the 355 increase in accruals from 20X1 to 20X4 (345 to 700), 205 is Kestrel's undistributed profit. The remaining 150 increase is still worth a follow-up question about working capital, but there is no sign that Pinnacle's own earnings have become less cash-backed.</p>`,
        },
        {
          t: "callout",
          tone: "insight",
          title: "Why integration matters here",
          html: "Run the accruals ratio in isolation and you flag Pinnacle for poor earnings quality. Run it after the DuPont work and you recognize the associate's fingerprint. The techniques are not separate tests; each one tells you how to read the next.",
        },
        {
          t: "check",
          id: "lm15-eq-1",
          q: "Pinnacle's CFO to net income ratio fell from 1.31 to 1.05 over four years. Given the data, the best first explanation is:",
          options: ["Aggressive revenue recognition in the operating business", "Growth in the associate's profit, most of which is not received as dividends", "Rising capital expenditure"],
          answer: 1,
          why: "Equity income rose from 150 to 380 while dividends from Kestrel rose only from 45 to 70, so the non-cash part of net income grew. Excluding it, CFO is a stable 1.45 times earnings. Capital expenditure is an investing cash flow and does not reduce CFO.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "market-value",
      title: "What is the market paying for the operating business?",
      los: ["a", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Pinnacle trades at a market value of 20,000 against net income of 1,130: a price to earnings (P/E) ratio of 17.7x. A peer screen would compare that with other consumer goods companies. But 380 of Pinnacle's earnings come from Kestrel, and Kestrel is listed, so the market already prices that piece separately. Kestrel's market value is 15,000, so Pinnacle's 30% stake is worth 4,500 at market, against a carrying amount of roughly 2,400 on Pinnacle's balance sheet.</p>
<p>Subtract the market value of the stake from Pinnacle's market value and what is left is what investors are paying for everything else: the operating business.</p>`,
        },
        {
          t: "formula",
          name: "Implied value and P/E of the business excluding the associate",
          tex: "\\text{Implied value}_{core} = \\text{Market cap} - s \\times \\text{Market cap}_{associate};\\qquad \\text{P/E}_{core} = \\frac{\\text{Implied value}_{core}}{\\text{NI} - \\text{Equity income}}",
          plain: "s is the ownership share. Value the stake at market, take it out of both the price and the earnings, and compare the remaining multiple with operating peers.",
        },
        {
          t: "table",
          caption: "Pinnacle Corp, end of 20X4",
          head: ["", "Amount"],
          rows: [
            ["Pinnacle market capitalization", "20,000"],
            ["Less 30% of Kestrel's market capitalization (0.30 x 15,000)", "(4,500)"],
            ["Implied value of the business excluding Kestrel", "15,500"],
            ["Net income excluding equity income (1,130 - 380)", "750"],
            ["Implied P/E of the core business (15,500 / 750)", "20.7x"],
            ["Headline P/E (20,000 / 1,130)", "17.7x"],
            ["P/E implied for the stake (4,500 / 380)", "11.8x"],
          ],
        },
        {
          t: "p",
          html: `<p>The headline 17.7x blends two very different multiples: the market values Pinnacle's share of Kestrel at 11.8 times the earnings it contributes and Pinnacle's own business at 20.7 times. Suppose operating peers trade at around 19 times earnings. A comparables analysis that puts Pinnacle's 17.7x next to them would conclude Pinnacle is cheap. On the comparable basis, 20.7x, it is dearer than those peers, priced for growth while its operating margin is falling. That is the phase 5 conclusion this whole case has been building toward.</p>`,
        },
        {
          t: "callout",
          tone: "beyond",
          title: "Refinements, flagged so you do not mistake them for exam content",
          html: "Practitioners sometimes deduct the tax that would be due if the stake were sold, or apply a holding-company discount, since Pinnacle cannot realize Kestrel's market value without selling. The core calculation above is the one to know.",
        },
        {
          t: "check",
          id: "lm15-mv-1",
          q: "A company has a market capitalization of 9,000 and net income of 600, of which 120 is equity income from a 25% stake in a listed associate with a market capitalization of 4,000. The implied P/E of the company excluding the associate is closest to:",
          options: ["15.0x", "16.7x", "13.3x"],
          answer: 1,
          why: "Stake at market: 0.25 x 4,000 = 1,000. Implied core value: 9,000 - 1,000 = 8,000. Core earnings: 600 - 120 = 480. Implied P/E: 8,000 / 480 = 16.7x. The headline P/E is 9,000 / 600 = 15.0x, and 8,000 / 600 = 13.3x mixes a core price with total earnings.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "off-balance",
      title: "Off-balance-sheet leverage: leases and other commitments",
      los: ["c", "d", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>Back to the credit analyst. Before 2019, Pinnacle's stores, warehouses and trucks were rented under operating leases. Under the old rules a lease that did not transfer substantially all the risks and rewards of ownership was simply rent: an operating expense each year and nothing on the balance sheet. Yet the contracts were non-cancellable. Pinnacle owed those payments as surely as it owed bond coupons, and a rating built on reported debt alone understated what Pinnacle had promised to pay.</p>
<p>Analysts fixed it themselves, using the lease commitments disclosed in the notes. Discount the future payments at the company's borrowing rate, add the present value to both assets and debt, and restate the income statement as if the lessee had borrowed to buy the asset: depreciation in operating expenses, interest below EBIT.</p>`,
        },
        { t: "theater", scenario: "lm15-capitalize-commitments" },
        {
          t: "formula",
          name: "Capitalizing an operating lease (analyst adjustment)",
          tex: "\\text{Debt}_{adj} = \\text{Debt} + PV(\\text{lease payments});\\quad \\text{EBIT}_{adj} = \\text{EBIT} + \\text{Rent} - \\text{Depreciation};\\quad \\text{Interest}_{adj} = \\text{Interest} + r \\times PV",
          plain: "PV is the present value of the remaining payments at rate r. With Pinnacle's numbers: debt 3,000 + 800; EBIT 992 + 108 - 80 = 1,020; interest 180 + 48 = 228. A simpler version used in practice adds back only the interest component (r x PV) to EBIT.",
        },
        {
          t: "table",
          caption: "Pinnacle, as reported vs commitments capitalized",
          head: ["", "As reported", "Adjusted", "Why"],
          rows: [
            ["Debt / equity", "0.52", "0.65", "740 of lease debt at year-end (800 capitalized less 60 repaid), while equity is nearly unchanged"],
            ["EBIT", "992", "1,020", "Rent of 108 replaced by depreciation of 80"],
            ["Interest coverage", "5.5x", "4.5x", "Interest rises by 48, proportionally more than EBIT"],
            ["Asset turnover", "0.91", "0.84", "720 of leased assets added"],
            ["Net income", "812", "792", "Depreciation plus interest (128) exceeds rent (108) early in a lease"],
            ["CFO", "812", "872", "The 60 of principal moves to financing"],
          ],
        },
        {
          t: "h",
          text: "Why the adjustment still matters after IFRS 16 and ASC 842",
        },
        {
          t: "p",
          html: `<p>From 2019 the standards did the analyst's job. IFRS 16 (effective for annual periods beginning on or after 1 January 2019) requires a lessee to recognize a right-of-use asset and a lease liability for almost every lease, with exemptions only for short-term leases (12 months or less) and leases of low-value assets, and splits the cost into depreciation and interest. US GAAP's ASC 842 (Accounting Standards Codification topic 842, effective for public companies from fiscal years beginning after 15 December 2018) also puts the asset and liability on the balance sheet, but keeps two kinds of lease: a finance lease looks like IFRS 16, while an operating lease still shows a single straight-line lease cost inside operating expenses, with all payments in CFO.</p>
<p>So the adjustment has not disappeared; it has moved:</p>
<ul>
<li><b>Comparing periods.</b> A trend analysis that runs across 2019 compares pre-standard years with no lease debt against post-standard years with it. Restate the early years, or the leverage trend shows a jump that is pure accounting.</li>
<li><b>Comparing a US GAAP company with an IFRS company.</b> Pinnacle's operating lease cost sits in operating expenses; an IFRS peer reports depreciation plus interest. The IFRS peer's EBIT and EBITDA (earnings before interest, taxes, depreciation and amortization) look higher for the same economics. Split Pinnacle's lease cost before comparing operating margins or coverage.</li>
<li><b>Obligations no standard capitalizes.</b> Take-or-pay purchase contracts, guarantees of other companies' debt (including an associate's), and leases signed but not yet started all sit in the notes. Underfunded pensions are on the balance sheet under both standards, but usually outside "debt"; credit analysts add the deficit to debt because it is a fixed claim that must be funded.</li>
</ul>`,
        },
        {
          t: "callout",
          tone: "flag",
          title: "Check against your book",
          html: "The 2026 module is reported to keep a section titled 'Off-Balance Sheet Leverage from Operating Leases'. Whether its worked case capitalizes pre-2019 operating leases (as the classic edition did) or works from post-IFRS 16 disclosures should be verified. The mechanics above are the same either way.",
        },
        {
          t: "check",
          id: "lm15-ob-1",
          q: "Compared with treating a lease as an operating lease under the pre-2019 rules, capitalizing it (as IFRS 16 now requires) will in the first year of the lease most likely:",
          options: ["Increase CFO and decrease net income", "Decrease CFO and increase net income", "Leave CFO unchanged and decrease EBIT"],
          answer: 0,
          why: "The principal part of each payment becomes a financing outflow, so CFO rises. Depreciation plus interest on the full liability exceeds the level rent early in the lease, so net income falls. EBIT rises, because rent is replaced by depreciation alone.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "standards-change",
      title: "Anticipating the effects of changes in accounting standards",
      los: ["d"],
      blocks: [
        {
          t: "p",
          html: `<p>Imagine it is 2017 and you are forecasting Pinnacle's ratios for 2019. You know IFRS 16 and ASC 842 are coming. If you ignore them, your forecast leverage is wrong the day it is published, and every covenant and rating threshold you compare it with is wrong too. The skill this LOS asks for is to work out, BEFORE adoption, which lines and ratios a new standard will move and in which direction, so that a ratio change caused by accounting is never mistaken for a change in the business.</p>
<p>You do not have to guess. Under IFRS, IAS 8 (International Accounting Standard 8, on accounting policies, changes in accounting estimates and errors) requires a company to disclose standards that have been issued but are not yet effective, and known or reasonably estimable information about their likely impact. Companies registered with the US Securities and Exchange Commission (SEC) make a similar disclosure in MD&A. Those notes are where the 2019 lease numbers first appeared, in many cases with an estimate of the liability to be recognized.</p>`,
        },
        {
          t: "table",
          caption: "Effects of adopting IFRS 16 for a company that had large operating leases",
          head: ["Item", "Effect", "Mechanism"],
          rows: [
            ["Total assets and liabilities", "Up", "Right-of-use assets and lease liabilities recognized"],
            ["EBITDA", "Up, by the full former rent", "Rent replaced by depreciation and interest, both excluded from EBITDA"],
            ["EBIT", "Up", "Only depreciation stays above EBIT; interest moves below it"],
            ["Net income", "Lower early in a lease, higher later", "Interest on a declining liability is front-loaded"],
            ["CFO", "Up", "Principal repayments move to financing (interest may be operating or financing under IFRS)"],
            ["Cash flow from financing activities (CFF)", "Down", "Principal repayments are financing outflows"],
            ["Debt to equity, debt to EBITDA", "Debt to equity up; debt to EBITDA usually up", "Large new liability; EBITDA rises proportionally less"],
            ["Asset turnover and ROA", "Down", "Larger asset base for the same revenue"],
          ],
          note: "Under US GAAP ASC 842, an operating lease changes only the balance sheet: the single lease cost stays in operating expenses and the payments stay in CFO, so EBITDA, EBIT and CFO do not change.",
        },
        {
          t: "h",
          text: "Changes in methods and assumptions",
        },
        {
          t: "p",
          html: `<p>The same LOS covers changes a company makes itself. The accounting treatment decides whether past numbers move:</p>`,
        },
        {
          t: "table",
          head: ["Change", "How it is reported", "What the analyst does"],
          rows: [
            ["New accounting standard", "Per the standard's transition rules: full retrospective, or a modified approach that adjusts opening equity without restating comparatives", "Check which transition was used; if comparatives were not restated, the trend breaks at adoption"],
            ["Change in accounting policy (for example a change in inventory method)", "Retrospective: prior periods restated as if the new policy had always applied", "Use the restated comparatives; compare with the old figures to see the size of the effect"],
            ["Change in accounting estimate (useful lives, residual values, bad debt rates)", "Prospective: current and future periods only", "Quantify the boost or drag to earnings; a string of estimate changes that all raise earnings is a quality warning"],
            ["Change in assumptions (pension discount rate, expected salary growth)", "Flows through the measurement of the item (for pensions, remeasurement)", "Recompute ratios on the old assumption to separate economics from assumption"],
          ],
        },
        {
          t: "callout",
          tone: "example",
          title: "Pinnacle lengthens its useful lives",
          html: "Pinnacle depreciates 6,000 of plant straight line over 10 years: 600 a year. It revises the remaining life so that depreciation drops to 500. The change is prospective, nothing is restated, and EBIT rises by 100 (net income by 75 at 25% tax) with no change in the business. In the DuPont table it would look like an EBIT margin improvement of almost one percentage point on 10,800 of revenue. Find it in the note on accounting estimates before crediting management.",
        },
        {
          t: "callout",
          tone: "beyond",
          title: "A live example, flagged so you do not mistake it for exam content",
          html: "IFRS 18 (Presentation and Disclosure in Financial Statements, issued in 2024, effective for annual periods beginning on or after 1 January 2027) will require new income statement subtotals including operating profit, place the share of profit of equity-method investees outside the operating category, and, for most companies, fix interest paid as a financing cash flow and interest and dividends received as investing. An analyst reading a 2025 or 2026 IFRS annual report should find it in the 'standards issued but not yet effective' note. It is a textbook case of this LOS, but not part of the 2026 curriculum.",
        },
        {
          t: "check",
          id: "lm15-sc-1",
          q: "A US GAAP company whose leases are all operating leases adopts ASC 842. Compared with the old rules, its cash flow from operations will most likely:",
          options: ["Increase", "Be unchanged", "Decrease"],
          answer: 1,
          why: "Under ASC 842 an operating lease adds a right-of-use asset and a lease liability, but the cost is still a single lease expense in operating expenses and all payments remain operating cash flows. Only IFRS 16 (or a US GAAP finance lease) moves the principal portion to financing.",
        },
        {
          t: "check",
          id: "lm15-sc-2",
          q: "A company changes the estimated useful lives of its equipment from 8 to 10 years. Under both IFRS and US GAAP the change is:",
          options: ["Applied retrospectively, with prior years restated", "Applied prospectively to current and future periods", "Recognized as a one-time gain in the current year"],
          answer: 1,
          why: "Useful life is an accounting estimate, and changes in estimates are applied prospectively. Retrospective restatement is for changes in accounting policy and corrections of errors.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "choices-biases",
      title: "Reporting choices and the biases behind them",
      los: ["b"],
      blocks: [
        {
          t: "p",
          html: `<p>Every number in Pinnacle's statements is the result of a choice: a method (LIFO or FIFO), an estimate (a useful life), a classification (operating or financing), or a structure (lease or buy). The standards allow the choices because businesses differ. The analyst's problem is that management makes them, and management is paid on earnings per share, judged against guidance, and bound by debt covenants. Those incentives bias choices in predictable directions: toward higher current earnings, smoother earnings, lower reported leverage, and higher CFO.</p>
<p>Two companies with identical economics can therefore report different margins, returns and leverage, and a single company can shift its numbers over time without anything real happening. If you value Pinnacle on a multiple of earnings flattered by its choices, or lend against leverage understated by them, the bias becomes your mistake.</p>`,
        },
        {
          t: "table",
          caption: "Common reporting choices and their effects",
          head: ["Choice", "Effect on current reported numbers", "Comparability fix"],
          rows: [
            ["Inventory: LIFO vs FIFO in a period of rising prices (LIFO is US GAAP only)", "LIFO: lower inventory, lower gross margin and net income, lower taxes paid, higher inventory turnover", "Restate LIFO to FIFO with the LIFO reserve"],
            ["Depreciation: longer useful lives, higher residual values", "Lower depreciation, higher EBIT and ROA", "Compare average useful life (gross property, plant and equipment / depreciation expense) across peers; restate if far apart"],
            ["Capitalizing interest on assets under construction", "Lower interest expense now, higher depreciation later; the cash appears in CFI instead of CFO", "Add capitalized interest back to interest expense for coverage; move it from CFI to CFO"],
            ["Development costs: capitalized (IFRS when criteria are met) vs expensed (US GAAP, apart from certain software)", "Capitalizing raises current earnings and assets, and moves the outflow from CFO to CFI", "Expense the capitalized amount (add back the amortization) when comparing with a company that expenses"],
            ["Interest and dividends in the cash flow statement (choices under IFRS only)", "Interest paid in CFF raises CFO relative to a company that reports it in CFO", "Reclassify to a common basis before comparing CFO"],
            ["Goodwill and acquired intangibles", "Large, judgment-heavy assets; impairment timing is discretionary", "Compare on tangible book value; examine impairment test assumptions"],
            ["Pensions", "Assumptions (discount rate, salary growth) move the obligation and the cost", "Treat the deficit as debt; check assumptions against peers"],
            ["Off-balance-sheet structures", "Lower reported debt", "Capitalize commitments; consolidate the debt of entities whose risks the company bears"],
          ],
        },
        {
          t: "sort",
          prompt: "Rising prices, a growing company. Does each choice raise or lower this year's reported earnings, compared with the alternative?",
          buckets: [
            { id: "up", label: "Raises current earnings" },
            { id: "down", label: "Lowers current earnings" },
          ],
          items: [
            { text: "FIFO instead of LIFO", bucket: "up", why: "FIFO matches older, cheaper costs against current prices, so cost of sales is lower." },
            { text: "Lengthening the useful lives of equipment", bucket: "up", why: "Depreciation is spread over more years, so each year's charge is smaller." },
            { text: "Capitalizing development costs instead of expensing them", bucket: "up", why: "The cost becomes an asset and is amortized over later years instead of hitting this year in full." },
            { text: "Capitalizing interest on a new plant", bucket: "up", why: "Interest becomes part of the asset's cost instead of an expense this year." },
            { text: "LIFO instead of FIFO", bucket: "down", why: "The newest, most expensive purchases go to cost of sales first." },
            { text: "A large restructuring provision that front-loads future costs (a 'big bath')", bucket: "down", why: "Future costs hit this year, which also flatters later years when they are not charged again." },
            { text: "Raising the allowance for doubtful accounts", bucket: "down", why: "A bigger allowance means a bigger bad debt expense now." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Direction is not the same as quality",
          html: "LIFO lowers earnings but gives a better income statement in a period of inflation, because cost of sales reflects current costs; FIFO gives the better balance sheet. A conservative choice is not automatically a high-quality one: a big bath today manufactures earnings tomorrow. The analyst's job is to put companies on the SAME basis, not to reward the lowest number.",
        },
        {
          t: "check",
          id: "lm15-cb-1",
          q: "Pinnacle (US GAAP) expenses all its development costs; Aster Group (IFRS) capitalizes development costs that meet the IAS 38 criteria. Compared with Pinnacle, and before any adjustment, Aster will most likely report:",
          options: ["Lower CFO and lower total assets", "Higher CFO and higher total assets", "Higher CFO and the same total assets"],
          answer: 1,
          why: "Capitalized development spending is an investing outflow, not an operating one, so Aster's CFO is higher; the capitalized costs also sit on the balance sheet as intangible assets, so total assets are higher.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "comparability",
      title: "Adjusting for comparability: put Pinnacle on Aster's basis",
      los: ["b", "c", "e"],
      blocks: [
        {
          t: "p",
          html: `<p>The portfolio manager wants Pinnacle compared with Aster Group, an IFRS consumer goods company. Pinnacle uses LIFO (last in, first out); Aster cannot, because IFRS prohibits LIFO, so it uses FIFO (first in, first out). With prices rising, Pinnacle's inventory is carried at old layers and its cost of sales at recent prices. Every inventory, margin, liquidity and leverage ratio is on a different basis from Aster's.</p>
<p>US GAAP gives the analyst the bridge: a LIFO user discloses its <b>LIFO reserve</b>, the amount by which FIFO inventory would exceed LIFO inventory. That one number restates the balance sheet and, through its change over the year, the income statement.</p>`,
        },
        {
          t: "formula",
          name: "LIFO to FIFO",
          tex: "\\text{Inv}_{FIFO} = \\text{Inv}_{LIFO} + \\text{LR};\\quad \\text{COGS}_{FIFO} = \\text{COGS}_{LIFO} - (\\text{LR}_{end} - \\text{LR}_{beg});\\quad \\text{Equity}_{FIFO} = \\text{Equity}_{LIFO} + \\text{LR}\\,(1-t)",
          plain: "LR is the LIFO reserve and t the tax rate. Liabilities rise by LR x t (deferred taxes, or taxes payable if the analyst assumes the tax is due). A rising reserve means FIFO cost of goods sold (COGS) is lower than LIFO COGS.",
        },
        { t: "theater", scenario: "lm15-lifo-to-fifo" },
        {
          t: "callout",
          tone: "trap",
          title: "Two sign traps in one formula",
          html: "FIFO COGS is LIFO COGS MINUS the increase in the reserve, not plus: when prices rise, FIFO charges the older, cheaper costs. And equity rises by the after-tax reserve only; the full reserve goes to inventory and the tax slice goes to liabilities. Adding the whole reserve to equity unbalances the balance sheet.",
        },
        {
          t: "p",
          html: `<p>LIFO is one of several adjustments. The lab below puts Pinnacle's latest reported balance sheet and income statement next to an analyst-adjusted version. Each toggle applies one adjustment, animates the lines it moves, prints the journal that explains why, and updates the ratios. Turn them on one at a time first, then all together: the full set is what a credit analyst's "adjusted leverage" actually means.</p>`,
        },
        { t: "widget", name: "AdjustmentsLab" },
        {
          t: "table",
          caption: "Balance sheet modifications and what they do to the ratios",
          head: ["Adjustment", "Assets", "Liabilities", "Equity", "Typical ratio effects"],
          rows: [
            ["LIFO to FIFO (rising prices)", "+ LIFO reserve", "+ reserve x t", "+ reserve x (1 - t)", "Current ratio up; debt to equity down; inventory turnover down"],
            ["Capitalize lease or purchase commitments", "+ PV", "+ PV (debt)", "Unchanged", "Debt to equity and debt to capital up; asset turnover and ROA down"],
            ["Pension deficit treated as debt", "Unchanged", "Reclassified into debt", "Unchanged", "Debt ratios up; total liabilities unchanged"],
            ["Remove goodwill (tangible book value)", "- goodwill", "Unchanged", "- goodwill", "ROA and ROE up; debt to equity up"],
            ["Proportionately consolidate an associate's debt", "+ share of its assets", "+ share of its debt", "Unchanged", "Debt ratios up; asset turnover down if only the balance sheet is grossed up (a full proportionate consolidation also adds the share of revenue)"],
          ],
        },
        {
          t: "tree",
          title: "Which comparability adjustment does Pinnacle vs Aster need?",
          root: "inv",
          nodes: {
            inv: { q: "Do the two companies use different inventory cost methods?", help: "Pinnacle (US GAAP) uses LIFO. Aster (IFRS) cannot.", options: [{ label: "Yes", next: "lifo" }, { label: "No", next: "dev" }] },
            dev: { q: "Does one capitalize development costs while the other expenses them?", options: [{ label: "Yes", next: "devres" }, { label: "No", next: "cf" }] },
            cf: { q: "Are interest paid, or interest and dividends received, classified in different cash flow sections?", options: [{ label: "Yes", next: "cfres" }, { label: "No", next: "lease" }] },
            lease: { q: "Do lease costs sit in different income statement lines (US GAAP operating lease cost vs IFRS 16 depreciation and interest)?", options: [{ label: "Yes", next: "leaseres" }, { label: "No", next: "done" }] },
            lifo: { result: "Restate the LIFO company to FIFO", tone: "amber", html: "Inventory plus the LIFO reserve; liabilities plus reserve x t; equity plus reserve x (1 - t); COGS minus the change in the reserve. Then come back and check development costs, cash flow classification and leases." },
            devres: { result: "Put development costs on one basis", tone: "purple", html: "Usually expense the capitalizer's development spending: reduce intangible assets and equity, replace amortization with the year's spending, and move that spending from CFI to CFO." },
            cfres: { result: "Reclassify cash flows to a common basis", tone: "cyan", html: "For example, move interest paid from CFO to CFF for the US GAAP company (or the reverse for the IFRS company). Total cash flow is unchanged; CFO and CFF move." },
            leaseres: { result: "Split the US GAAP operating lease cost", tone: "green", html: "Replace the single lease cost with depreciation (above EBIT) and interest (below EBIT), as IFRS 16 does, before comparing EBIT, EBITDA and coverage." },
            done: { result: "Methods line up: compare directly", tone: "green", html: "Still check estimates (useful lives, allowances) and one-off items before trusting the comparison." },
          },
        },
        {
          t: "check",
          id: "lm15-cp-1",
          q: "Restating a LIFO company to FIFO when prices have been rising, with the tax effect recorded as a deferred tax liability, will most likely:",
          options: ["Increase the current ratio and decrease debt to equity", "Decrease the current ratio and increase debt to equity", "Increase the current ratio and increase debt to equity"],
          answer: 0,
          why: "Inventory, a current asset, rises by the whole reserve while current liabilities do not change, so the current ratio rises. Equity rises by the after-tax reserve with debt unchanged, so debt to equity falls.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "normalization",
      title: "Earnings normalization and cash flow modifications",
      los: ["e"],
      blocks: [
        {
          t: "p",
          html: `<p>A valuation multiple is applied to earnings the company can repeat. If this year's net income includes a gain from selling a division, applying a 20x multiple to it values a sale that will never happen again twenty times over. Normalization removes items that are <b>non-recurring</b> (they will not repeat: restructuring charges, disposal gains, litigation settlements, impairments) and, when the purpose calls for it, items that are <b>non-operating</b> (they are not part of the business being valued: investment income, the associate).</p>
<p>Two rules keep it honest. Remove items <b>after tax</b>, because the reported net income bore their tax effect. And remove one-off <b>losses</b> as diligently as one-off gains: a company that has a "non-recurring" restructuring every year has a recurring cost of doing business, and adding it back every year inflates normalized earnings.</p>`,
        },
        { t: "theater", scenario: "lm15-normalize-earnings" },
        {
          t: "formula",
          name: "Normalized net income",
          tex: "\\text{NI}_{normalized} = \\text{NI}_{reported} - (\\text{non-recurring gains} - \\text{non-recurring losses}) \\times (1 - t)",
          plain: "Pinnacle: 435 - (200 - 160) x 0.75 = 435 - 30 = 405. Normalization changes earnings, not the balance sheet: the gain and the provision both happened.",
        },
        {
          t: "p",
          html: `<p><b>Cash flow statement modifications</b> follow the same logic. Cash is cash, so modifications never change the total; they move items between sections so that CFO measures recurring operations on a comparable basis. The typical moves:</p>
<ul>
<li>Interest paid and interest and dividends received reclassified to match a peer's IFRS choices (US GAAP has no choice: all operating except dividends paid).</li>
<li>Taxes paid on an investing gain moved next to the proceeds, out of CFO.</li>
<li>Capitalized interest and capitalized development costs moved from CFI to CFO when comparing with companies that expense them.</li>
<li>Cash from selling receivables (securitization) that the company still bears the risk on, moved from CFO to CFF, as in LM10.</li>
<li>Lease principal payments: when comparing a US GAAP operating lessee with an IFRS lessee, move the principal portion to CFF.</li>
</ul>`,
        },
        {
          t: "callout",
          tone: "exam",
          title: "Overall financial condition",
          html: "After the balance sheet modifications, normalization and cash flow modifications, Pinnacle looks like this: an operating business with a slowly falling margin and flat ROE, more leverage than reported once commitments, the pension deficit and its share of Kestrel's debt are counted, earnings that are cash-backed once the associate's accruals are understood, and a market price that already values the operating business at a premium. Each adjustment changed a ratio; together they changed the answer.",
        },
        {
          t: "check",
          id: "lm15-nm-1",
          q: "A company reports net income of 900, including a 300 gain on the sale of a building and a 100 restructuring charge. Its tax rate is 25%. Normalized net income is closest to:",
          options: ["750", "700", "1,050"],
          answer: 0,
          why: "Remove the net one-off items after tax: 900 - (300 - 100) x 0.75 = 900 - 150 = 750. Removing them pretax gives 700; adding the gain back instead of removing it gives 1,050.",
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "conclusions",
      title: "Phases 5 and 6: write the answer, then keep it current",
      los: ["a"],
      blocks: [
        {
          t: "p",
          html: `<p>The report answers the question asked in phase 1, in the order of importance to the reader, with the evidence for each claim. For Pinnacle the portfolio manager asked whether rising ROE is worth paying for. The analysis supports a clear answer.</p>`,
        },
        {
          t: "steps",
          title: "Pinnacle: conclusions for the portfolio manager",
          items: [
            { title: "ROE growth is the associate's, not Pinnacle's", html: "Reported ROE rose from 16.25% to 17.80%; excluding Kestrel it was flat at about 18.3%. The rise came through the interest burden and tax burden, both distorted by equity income." },
            { title: "The operating margin is falling", html: "EBIT margin fell from 12.0% to 10.5%. Segment data points to a mix of a strong Beverages business, a declining Foods business, and a Nutrition business absorbing capital at a modest return." },
            { title: "Earnings are cash-backed, once the associate is understood", html: "Rising accruals are mostly Kestrel's undistributed profit; CFO is a stable 1.45 times earnings excluding it." },
            { title: "The market already pays a premium for the core", html: "Excluding the stake at market, the operating business trades at 20.7 times its earnings, against 17.7 times on the headline numbers." },
            { title: "Leverage is higher than reported", html: "Commitments, the pension deficit and the share of Kestrel's debt raise adjusted debt to equity materially (see the adjustments lab)." },
            { title: "Recommendation", html: "Do not pay a premium for headline ROE growth. Monitor Nutrition's returns and the Foods margin." },
          ],
        },
        {
          t: "callout",
          tone: "insight",
          title: "Phase 6: what would change the conclusion",
          html: "Follow-up means repeating the phases when new information arrives. State in advance what you are watching: Nutrition's segment ROA rising toward Beverages' would justify the capital; a Kestrel stake sale would crystallize the 4,500 of market value and remove the associate from every ratio; and adoption of a new standard would require the trend to be restated before it is read.",
        },
      ],
    },
  ],

  traps: [
    { wrong: "Equity income from an associate inflates a company's EBIT margin.", right: "Not when it is presented below EBIT, which is the usual case. It inflates the net margin, the tax burden (it arrives already taxed) and, when it sits above pretax income, the interest burden. It also depresses asset turnover." },
    { wrong: "A tax burden of 0.82 is worse than a tax burden of 0.75.", right: "The tax burden is NI / EBT, the share of pretax profit the company keeps. 0.82 means a lighter tax load. The same reading applies to the interest burden." },
    { wrong: "An interest burden above 1.0 is impossible for a company with debt.", right: "It happens whenever income added between EBIT and pretax income (equity income, interest income, non-operating gains) exceeds interest expense. Treat it as a signal to find that income." },
    { wrong: "Rising ROE means the business is improving.", right: "ROE can rise through leverage, a lower tax rate, an associate's profit or one-off gains while operations deteriorate. Decompose it and strip out non-operating items before drawing a conclusion." },
    { wrong: "Capitalizing an operating lease raises net income because rent disappears.", right: "EBIT rises (rent becomes depreciation), but depreciation plus front-loaded interest exceeds rent early in a lease, so net income falls in the early years." },
    { wrong: "FIFO cost of goods sold equals LIFO cost of goods sold plus the increase in the LIFO reserve.", right: "Minus. A rising reserve means FIFO charges older, cheaper costs, so FIFO COGS is lower and FIFO profit higher." },
    { wrong: "Converting LIFO to FIFO adds the whole LIFO reserve to equity.", right: "Equity rises by the reserve x (1 - t). The tax slice (reserve x t) goes to deferred tax liabilities (or taxes payable). Inventory rises by the whole reserve." },
    { wrong: "After IFRS 16 and ASC 842 there is no off-balance-sheet leverage left to adjust for.", right: "Analysts still adjust: for trend comparisons across 2019, for the US GAAP operating lease cost that stays in operating expenses, and for purchase commitments, guarantees and pension deficits that are not counted as debt." },
    { wrong: "Under ASC 842 an operating lease affects the income statement and cash flows exactly like an IFRS 16 lease.", right: "ASC 842 operating leases keep a single straight-line cost in operating expenses and all payments in CFO. Only the balance sheet changes." },
    { wrong: "Normalizing earnings also changes the balance sheet.", right: "Normalization relabels income as recurring or not. The gain, the provision and the cash all happened, so the balance sheet is unchanged." },
    { wrong: "A falling CFO to net income ratio always means lower earnings quality.", right: "Check the source first. Equity income in excess of dividends received is non-cash by construction; Pinnacle's ratio fell for that reason while the cash backing of its own earnings stayed stable." },
  ],

  gaap: [
    { topic: "Inventory cost formulas", ifrs: "FIFO or weighted average; LIFO prohibited", usgaap: "LIFO permitted (LIFO users disclose the LIFO reserve); FIFO and weighted average also allowed" },
    { topic: "Interest paid (cash flow statement)", ifrs: "Operating or financing", usgaap: "Operating" },
    { topic: "Interest and dividends received", ifrs: "Operating or investing", usgaap: "Operating" },
    { topic: "Dividends paid", ifrs: "Operating or financing", usgaap: "Financing" },
    { topic: "Development costs", ifrs: "Capitalized once the IAS 38 criteria are met; research expensed", usgaap: "Expensed, except certain software development costs" },
    { topic: "Lessee accounting since 2019", ifrs: "IFRS 16: one model, right-of-use asset and liability, depreciation plus interest; exemptions for short-term and low-value leases", usgaap: "ASC 842: asset and liability for finance and operating leases; operating leases keep a single straight-line cost in operating expenses and payments in CFO" },
    { topic: "Property, plant and equipment measurement", ifrs: "Cost or revaluation model", usgaap: "Cost model only" },
    { topic: "Changes in estimates vs policies", ifrs: "IAS 8: estimates prospective, policies retrospective", usgaap: "ASC 250: same split" },
    { topic: "Disclosure of standards not yet effective", ifrs: "IAS 8 requires disclosure of issued but not yet effective standards and their known or estimable impact", usgaap: "SEC registrants disclose the expected impact of new standards (MD&A)" },
  ],

  formulas: [
    { name: "Three-factor DuPont", tex: "\\text{ROE} = \\frac{\\text{NI}}{\\text{Rev}} \\times \\frac{\\text{Rev}}{\\text{Avg TA}} \\times \\frac{\\text{Avg TA}}{\\text{Avg equity}}", plain: "Net margin x asset turnover x leverage." },
    { name: "Five-factor DuPont", tex: "\\text{ROE} = \\frac{\\text{NI}}{\\text{EBT}} \\times \\frac{\\text{EBT}}{\\text{EBIT}} \\times \\frac{\\text{EBIT}}{\\text{Rev}} \\times \\frac{\\text{Rev}}{\\text{Avg TA}} \\times \\frac{\\text{Avg TA}}{\\text{Avg equity}}", plain: "Tax burden x interest burden x EBIT margin x asset turnover x leverage." },
    { name: "ROE excluding an associate", tex: "\\text{ROE}_{core} = \\frac{\\text{NI} - \\text{Equity income}}{\\text{Avg equity} - \\text{Avg investment in associates}}", plain: "Remove the income and the investment consistently; also remove the investment from assets for asset turnover and leverage." },
    { name: "Implied value of the core business", tex: "\\text{Market cap} - s \\times \\text{Market cap}_{associate}", plain: "What the market pays for everything except the stake." },
    { name: "Implied core P/E", tex: "\\frac{\\text{Market cap} - s \\times \\text{Market cap}_{associate}}{\\text{NI} - \\text{Equity income}}", plain: "Compare this, not the headline P/E, with operating peers." },
    { name: "Balance sheet accruals ratio", tex: "\\frac{\\text{NOA}_{end} - \\text{NOA}_{beg}}{(\\text{NOA}_{end} + \\text{NOA}_{beg})/2}", plain: "Growth in net operating assets relative to their average." },
    { name: "Cash flow accruals ratio", tex: "\\frac{\\text{NI} - (\\text{CFO} + \\text{CFI})}{(\\text{NOA}_{end} + \\text{NOA}_{beg})/2}", plain: "The part of earnings not matched by operating and investing cash flow." },
    { name: "LIFO to FIFO", tex: "\\text{Inv}_{FIFO} = \\text{Inv}_{LIFO} + \\text{LR};\\ \\text{COGS}_{FIFO} = \\text{COGS}_{LIFO} - \\Delta\\text{LR};\\ \\Delta\\text{Equity} = \\text{LR}(1-t)", plain: "Liabilities rise by LR x t; net income rises by the change in the reserve x (1 - t)." },
    { name: "Lease capitalization (analyst)", tex: "\\text{EBIT}_{adj} = \\text{EBIT} + \\text{Rent} - \\text{Dep};\\quad \\text{Interest}_{adj} = \\text{Interest} + r \\times PV", plain: "Debt and assets both rise by the PV of the payments." },
    { name: "Normalized net income", tex: "\\text{NI} - (\\text{one-off gains} - \\text{one-off losses})(1-t)", plain: "Remove non-recurring items after tax, losses as well as gains." },
    { name: "Segment metrics", tex: "\\text{Segment ROA} = \\frac{\\text{Segment EBIT}}{\\text{Segment assets}};\\quad \\frac{\\text{Capex}}{\\text{Depreciation}}", plain: "Return by business line, and whether each line's asset base is growing." },
  ],

  recall: [
    { q: "Name the six phases of the financial statement analysis framework.", a: "1 Articulate the purpose and context; 2 collect input data; 3 process data; 4 analyze and interpret the processed data; 5 develop and communicate conclusions and recommendations; 6 follow up." },
    { q: "What are the outputs of phase 3?", a: "Adjusted financial statements, common-size statements, ratios and graphs, and forecasts." },
    { q: "What are the five factors of the extended DuPont decomposition?", a: "Tax burden (NI / EBT), interest burden (EBT / EBIT), EBIT margin (EBIT / revenue), asset turnover (revenue / average total assets) and leverage (average total assets / average equity)." },
    { q: "Why can equity income push the interest burden above 1.0?", a: "When it is presented between EBIT and pretax income it is added to EBT but not to EBIT, so EBT can exceed EBIT even after interest expense." },
    { q: "How do you remove an associate from a DuPont analysis?", a: "Subtract equity income from net income (and from EBT if presented above it); subtract the investment from total assets and, assuming equity financing, from equity. EBIT and revenue are unchanged." },
    { q: "How do you compute the implied P/E of the business excluding a listed associate?", a: "(Market cap - ownership share x associate's market cap) / (net income - equity income)." },
    { q: "Give the cash flow accruals ratio.", a: "(NI - (CFO + CFI)) / average net operating assets. Higher means more of earnings is accrual, a lower-quality signal." },
    { q: "Restating LIFO to FIFO: what happens to inventory, liabilities and equity?", a: "Inventory + LIFO reserve; liabilities + reserve x t; equity + reserve x (1 - t)." },
    { q: "How does IFRS 16 change EBITDA, CFO and early-year net income compared with operating lease accounting?", a: "EBITDA up, CFO up (principal moves to financing), net income lower in the early years of a lease." },
    { q: "How does an ASC 842 operating lease affect the statements?", a: "Right-of-use asset and lease liability on the balance sheet; a single straight-line cost in operating expenses; all payments in CFO." },
    { q: "Where should an analyst look to anticipate a new standard's effect?", a: "The note on standards issued but not yet effective (required under IAS 8) and, for SEC registrants, MD&A." },
    { q: "How are changes in accounting estimates and in accounting policies reported?", a: "Estimates prospectively; policies retrospectively, with prior periods restated." },
  ],

  itemSets: [
    {
      id: "lm15-is1",
      title: "Corvina SA: DuPont with an associate",
      vignette: `<p>Corvina SA, a beverages company, owns 25% of a listed bottler that it accounts for with the equity method. Corvina presents its share of the bottler's profit between operating profit (EBIT) and pretax income. Selected data for the year:</p>
<table><tbody>
<tr><td>Revenue</td><td>8,000</td></tr>
<tr><td>EBIT</td><td>960</td></tr>
<tr><td>Interest expense</td><td>120</td></tr>
<tr><td>Share of profit of associate</td><td>90</td></tr>
<tr><td>Pretax income</td><td>930</td></tr>
<tr><td>Income tax expense</td><td>210</td></tr>
<tr><td>Net income</td><td>720</td></tr>
<tr><td>Average total assets (including the investment)</td><td>9,600</td></tr>
<tr><td>Average investment in associate</td><td>900</td></tr>
<tr><td>Average equity</td><td>4,800</td></tr>
</tbody></table>
<p>Corvina's market capitalization is 12,000. Its stake in the bottler has a market value of 1,800. An analyst removes the associate from the DuPont analysis by deducting the investment from both assets and equity.</p>`,
      questions: [
        {
          q: "Corvina's five-factor DuPont components (tax burden, interest burden, EBIT margin, asset turnover, leverage) are closest to:",
          options: ["0.774, 0.969, 12.0%, 0.833, 2.00", "0.750, 0.875, 12.0%, 0.920, 2.23", "0.750, 0.969, 12.0%, 0.833, 2.00"],
          answer: 0,
          why: "Tax burden = 720 / 930 = 0.774. Interest burden = 930 / 960 = 0.969. EBIT margin = 960 / 8,000 = 12.0%. Asset turnover = 8,000 / 9,600 = 0.833. Leverage = 9,600 / 4,800 = 2.00. Check: 0.774 x 0.969 x 0.12 x 0.833 x 2.00 = 15.0% = 720 / 4,800. The 0.750 tax burden is one minus the statutory rate, which ignores that the associate's profit arrives already taxed.",
        },
        {
          q: "Corvina's ROE excluding the associate is closest to:",
          options: ["13.1%", "15.0%", "16.2%"],
          answer: 2,
          why: "Net income excluding equity income = 720 - 90 = 630. Equity excluding the investment = 4,800 - 900 = 3,900. ROE = 630 / 3,900 = 16.2%. Dividing 630 by the unadjusted equity of 4,800 gives 13.1%; 15.0% is the reported ROE.",
        },
        {
          q: "Compared with the reported decomposition, removing the associate:",
          options: ["Lowers the EBIT margin", "Lowers the interest burden and raises asset turnover", "Raises the tax burden"],
          answer: 1,
          why: "EBT falls to 840 while EBIT stays at 960, so the interest burden falls from 0.969 to 0.875; total assets fall to 8,700, so asset turnover rises from 0.833 to 0.920. The EBIT margin is unchanged and the tax burden falls from 0.774 to 0.750 (630 / 840).",
        },
        {
          q: "The implied P/E of Corvina's business excluding the associate is closest to:",
          options: ["16.7x", "16.2x", "14.2x"],
          answer: 1,
          why: "Implied core value = 12,000 - 1,800 = 10,200. Core earnings = 720 - 90 = 630. P/E = 10,200 / 630 = 16.2x. The headline P/E is 12,000 / 720 = 16.7x, and 10,200 / 720 = 14.2x mismatches a core price with total earnings.",
        },
      ],
    },
    {
      id: "lm15-is2",
      title: "Lumen Foods: putting a US GAAP company on an IFRS basis",
      vignette: `<p>An analyst compares Lumen Foods Inc. (US GAAP) with an IFRS peer that uses FIFO and classifies interest paid as a financing cash flow. Lumen uses LIFO. Year-end data for Lumen:</p>
<table><tbody>
<tr><td>Current assets (including LIFO inventory of 900)</td><td>2,400</td></tr>
<tr><td>Current liabilities</td><td>1,600</td></tr>
<tr><td>Total debt</td><td>1,800</td></tr>
<tr><td>Total equity</td><td>3,000</td></tr>
<tr><td>Net income</td><td>500</td></tr>
<tr><td>LIFO reserve, beginning of year</td><td>200</td></tr>
<tr><td>LIFO reserve, end of year</td><td>260</td></tr>
<tr><td>Cash flow from operations (includes interest paid of 90)</td><td>700</td></tr>
</tbody></table>
<p>The tax rate is 25%. The analyst records the tax effect of the LIFO restatement as a deferred tax liability. The notes also disclose a non-cancellable take-or-pay supply contract whose payments have a present value of 400, which the analyst decides to treat as debt.</p>`,
      questions: [
        {
          q: "Lumen's current ratio on a FIFO basis is closest to:",
          options: ["1.50", "1.66", "1.62"],
          answer: 1,
          why: "FIFO current assets = 2,400 + 260 = 2,660. The tax effect goes to a non-current deferred tax liability, so current liabilities stay at 1,600. Current ratio = 2,660 / 1,600 = 1.66. Adding only the after-tax reserve (195) gives 1.62; 1.50 is the reported ratio.",
        },
        {
          q: "Lumen's net income on a FIFO basis is closest to:",
          options: ["545", "560", "695"],
          answer: 0,
          why: "FIFO COGS is lower by the increase in the reserve, 260 - 200 = 60, so pretax income rises by 60 and net income by 60 x (1 - 25%) = 45, giving 545. 560 forgets the tax; 695 uses the whole reserve instead of its change.",
        },
        {
          q: "After the FIFO restatement and treating the supply contract as debt, Lumen's debt to equity ratio is closest to:",
          options: ["0.60", "0.69", "0.73"],
          answer: 1,
          why: "Debt = 1,800 + 400 = 2,200. Equity = 3,000 + 260 x (1 - 25%) = 3,195. Debt to equity = 2,200 / 3,195 = 0.69. 0.60 is the reported ratio; 0.73 adds the debt but forgets the FIFO increase in equity.",
        },
        {
          q: "On a basis comparable with the IFRS peer, Lumen's cash flow from operations is closest to:",
          options: ["610", "700", "790"],
          answer: 2,
          why: "US GAAP puts interest paid in CFO. The peer puts it in CFF, so move Lumen's 90 out of CFO: 700 + 90 = 790. Total cash flow is unchanged; financing outflows rise by 90.",
        },
      ],
    },
    {
      id: "lm15-is3",
      title: "A credit analyst reviews Pinnacle's rating",
      vignette: `<p>A credit analyst at a bank is asked to critique the rating agency's A rating of Pinnacle Corp before the bank extends a new loan. She writes down the questions the report must answer, gathers five years of statements, the lease and pension notes and the agency's published methodology, and then builds adjusted statements and ratios. In the notes she finds that a new lease standard, issued but not yet effective, will apply from next year. Pinnacle reports under US GAAP and its leases will be classified as operating leases. A competitor that the bank also lends to reports under IFRS and will adopt IFRS 16 at the same time.</p>`,
      questions: [
        {
          q: "Building the adjusted statements and ratios is part of which phase of the analysis framework?",
          options: ["Collect input data", "Process data", "Analyze and interpret the processed data"],
          answer: 1,
          why: "Adjusted financial statements, common-size statements and ratios are the outputs of processing the data. Collection gathers the raw statements and notes; analysis interprets the processed results.",
        },
        {
          q: "When Pinnacle adopts the new lease standard, its EBITDA will most likely:",
          options: ["Increase", "Not change", "Decrease"],
          answer: 1,
          why: "Under ASC 842 an operating lease keeps a single straight-line lease cost inside operating expenses, so EBITDA is unaffected. The right-of-use asset and lease liability appear only on the balance sheet.",
        },
        {
          q: "When the IFRS competitor adopts IFRS 16, its debt to EBITDA ratio will most likely:",
          options: ["Fall, because EBITDA rises", "Rise, because debt rises proportionally more than EBITDA", "Not change, because both rise"],
          answer: 1,
          why: "EBITDA rises by the former rent, but debt rises by the present value of all remaining payments, typically several times the annual rent. For a company that already has debt, the ratio usually rises. That is why lease-heavy companies' leverage metrics jumped on adoption.",
        },
        {
          q: "To compare Pinnacle with the IFRS competitor after adoption, the analyst's most appropriate adjustment is to:",
          options: ["Split Pinnacle's operating lease cost into depreciation and interest", "Remove the competitor's lease liability from debt", "Reclassify the competitor's lease depreciation into rent expense"],
          answer: 0,
          why: "Both balance sheets will carry lease liabilities, but only the IFRS company shows depreciation above EBIT and interest below it. Splitting Pinnacle's single lease cost the same way puts EBIT, EBITDA and interest coverage on one basis. Removing a real obligation from debt would move away from economic reality.",
        },
      ],
    },
  ],

  flags: [
    { los: "a", note: "CFA Institute's 2026 summary confirms the case company is Nestle (ROE disaggregation, then deeper drivers to judge capital allocation). This module uses a fictional company (Pinnacle Corp) built to reproduce the same analytical sequence; check the book's exhibits before relying on any case figure." },
    { los: "e", note: "Removing the investment in associates from EQUITY as well as from assets (equity-financing assumption) is a modelling choice made here; verify whether the 2026 case exhibit adjusts equity or only assets and net income." },
    { los: "e", note: "Where equity income is presented (above pretax income, or after tax) changes which DuPont factors it distorts. Pinnacle presents it above pretax income; the classic case company presented it after tax. Check the 2026 exhibit." },
    { los: "c", note: "Section heading 'Off-Balance Sheet Leverage from Operating Leases' is reported for 2026. Verify whether the worked example capitalizes pre-2019 operating leases or uses IFRS 16 / ASC 842 disclosures, and whether purchase commitments are treated as debt in the book." },
    { los: "d", note: "IFRS 18 (effective 2027) is used only in a 'beyond' callout as a real example of a standard issued but not yet effective. It is not 2026 curriculum content." },
    { los: "c", note: "The tax effect of a LIFO to FIFO restatement is recorded as a deferred tax liability in the scenario and item set; the curriculum also allows taxes payable. Confirm which the 2026 book uses in its integration exhibits." },
    { los: "a", note: "The accruals ratio adjustment for undistributed equity income (CFO / (NI - equity income + dividends received)) is an analytical extension built for this case; check that the 2026 case computes accruals the same way." },
  ],
};
