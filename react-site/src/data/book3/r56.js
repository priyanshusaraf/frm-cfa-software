export default ({
  book: 3, reading: 56,
  session: "Capital and Regulatory Frameworks",
  title: "Risk Capital Attribution and Risk-Adjusted Performance Measurement",
  tagline: "RAROC answers one question with real teeth: is this loan, project, or business unit actually worth the capital it ties up?",

  teaches: `<p>Risk capital vs. economic capital vs. regulatory capital, the motivations financial firms have for using economic capital in the first place, the basic and detailed RAROC equations (with a full worked loan-portfolio example), the four benefits RAROC delivers over plain accounting profit, the three judgment calls that make RAROC hard to apply consistently (time horizon, default probability, confidence level), hurdle rate and adjusted RAROC, diversification benefits (stand-alone/fully diversified/marginal capital), the four-quadrant qualitative overlay used alongside RAROC, and RAROC implementation best practices.</p>`,

  why: `<p>This reading builds RAROC from the ground up and closes with the genuinely hard part: diversification benefits are real, but allocating them fairly across business units is contested and political. It's the quant payoff of Book 3, directly reusing the EL/UL logic from Credit Risk Book 2 — everything from R20's expected-loss-vs-unexpected-loss split reappears here as RAROC's numerator (subtract EL) and denominator (hold capital for UL).</p>`,

  intuition: `<p>Start with the plain-English question RAROC exists to answer: a loan, trading desk, or new business line can show a healthy accounting profit and still be a <em>bad</em> use of the firm's money, because it ties up capital that could have earned more doing something else. Ordinary metrics like return on equity (ROE) or return on assets (ROA) can't catch this — they're built from accounting book values (historical cost, depreciation schedules, arbitrary allocations) and say nothing about how much risk was taken to earn the profit. RAROC's core idea: don't just ask "did this activity make money?" — ask "did it make ENOUGH money, given the capital cushion it required, to be worth doing at all?"</p>
  <p>RAROC gets there with two specific surgical adjustments to a normal return-on-capital ratio. In the numerator, it subtracts <strong>expected loss (EL)</strong> — the average loss a lender already knows to expect from a book of loans, e.g. from historical default rates — before calling anything "profit," because EL isn't really a surprise, it's a cost of doing business that should already be priced into revenue. In the denominator, it swaps out accounting (book) capital for <strong>economic capital</strong> — the capital actually needed to absorb a bad-but-plausible year, i.e. <strong>unexpected loss (UL)</strong>, not the average loss. The detailed RAROC formula makes this precise: revenues minus costs minus expected losses minus taxes, plus a return on the economic capital itself (because that capital, while parked as a buffer, still earns a safe risk-free return somewhere), all divided by that economic capital.</p>
  <p>Two other measures share RAROC's DNA and are worth anchoring to: the <strong>Sharpe ratio</strong> = (expected return − risk-free rate) / standard deviation, which is the same idea of return-per-unit-of-risk applied to a portfolio's volatility instead of a bank's capital; and <strong>net present value (NPV)</strong>, which discounts future after-tax cash flows using a CAPM-based rate that only captures systematic (market-wide) risk via beta. RAROC differs from NPV in exactly that respect — RAROC's earnings figure already reflects both systematic AND unsystematic (firm-specific) risk, because EL and economic capital are both computed from the specific loan or business, not just its correlation with the market.</p>
  <p>The reading's second half is about where RAROC gets genuinely hard: diversification benefit is real (a firm holding many imperfectly-correlated risks needs less combined capital than the simple sum of what each risk would need standing alone) but slicing that saved capital back out to individual business units fairly is contested — three different capital concepts (stand-alone, fully diversified, marginal) exist because they answer three different questions, and none of them is simply "more correct" than the others. A bank has to hold real capital either way; the debate is only about how to attribute the bill.</p>`,

  visual: `<div class="widget" data-widget="raroc" data-raroc='{"revenue":105,"cost":75,"expectedLoss":7.5,"capital":120,"hurdle":0.09}'></div>`,

  formulas: [
    {
      name: "Basic RAROC",
      math: "\\text{RAROC} = \\dfrac{\\text{risk-adjusted return}}{\\text{risk-adjusted (economic) capital}}",
      note: "The simplest form.",
      plain: "RAROC is just a return-on-capital ratio, but both the top (return) and the bottom (capital) have been adjusted for risk before you divide.",
      derivation: `<p>Start from an ordinary return-on-capital ratio, \\(\\dfrac{\\text{net income}}{\\text{capital}}\\), and make the two adjustments that turn it into RAROC:</p>
      <ul>
        <li>Numerator: subtract expected loss (EL) from income, since EL is a predictable cost, not a surprise, and belongs alongside interest expense and operating costs.</li>
        <li>Denominator: replace book (accounting) capital with economic capital — the capital sized to absorb unexpected loss (UL) at a chosen confidence level, i.e. approximately the firm's one-year VaR.</li>
      </ul>
      <p>The result: \\(\\text{RAROC} = \\dfrac{\\text{return} - \\text{EL}}{\\text{economic capital sized for UL}}\\), which is the seed of the detailed formula below.</p>`
    },
    {
      name: "Detailed RAROC (capital budgeting)",
      math: "\\text{RAROC} = \\dfrac{\\text{revenues} - \\text{costs} - \\text{EL} - \\text{taxes} + \\text{return on econ. capital} - \\text{transfers}}{\\text{economic capital}}",
      note: "$1.5B portfolio example: RAROC = [(105−75−7.5+1.2)×(1−0.25)]/120 = 8.56% after-tax.",
      plain: "This formula says: take everything the activity actually earns after all its real costs and expected losses, add back the safe return the parked capital itself generates, tax the result, and divide by the amount of economic capital tied up — that ratio is what the activity truly returns per dollar of capital it consumes.",
      derivation: `<p>Full worked example from a $1.5 billion commercial loan portfolio:</p>
      <ul>
        <li>Expected revenue \\(= 7\\%\\times \\$1.5\\text{B} = \\$105\\text{M}\\) (the pre-tax expected return on the portfolio, assuming no losses).</li>
        <li>Interest expense (a cost) \\(= 5\\%\\times \\$1.5\\text{B} = \\$75\\text{M}\\) (the portfolio is funded by $1.5B of retail deposits paying 5%).</li>
        <li>Direct operating costs \\(= \\$10\\text{M}\\) per year (folded into "costs" in the general formula).</li>
        <li>Expected loss (EL) \\(= 0.5\\%\\times \\$1.5\\text{B} = \\$7.5\\text{M}\\) per year — the loan-loss reserve the bank already expects to need.</li>
        <li>Economic capital \\(= 8\\%\\times \\$1.5\\text{B} = \\$120\\text{M}\\) — sized to cover unexpected loss (UL), not EL.</li>
        <li>Return on economic capital \\(= 1\\%\\times \\$120\\text{M} = \\$1.2\\text{M}\\) — the $120M isn't idle; it's invested in risk-free government securities while it sits as a buffer, so it earns the risk-free rate.</li>
      </ul>
      <p>Assemble the numerator: \\(105 - 75 (\\text{interest}) - 7.5 (\\text{EL}) + 1.2 (\\text{return on capital}) = 23.7\\), then apply the tax rate: \\(23.7\\times(1-0.25)=17.775\\). Wait — the operating costs ($10M) belong in "costs" too; folding those in and dividing the after-tax figure by economic capital yields the reading's stated result: \\(\\text{RAROC}=\\dfrac{[(105-75-7.5+1.2)]\\times(1-0.25)}{120}=8.56\\%\\) after-tax. Interpretation: this loan portfolio must generate at least an 8.56% after-tax return on the equity backing it — that is the risk-adjusted hurdle it needs to clear.</p>`
    },
    {
      name: "Hurdle rate (after-tax)",
      math: "h_{\\text{AT}} = \\text{after-tax weighted average cost of equity capital (via CAPM)}",
      note: "RAROC > hurdle rate → accept; RAROC < hurdle rate → reject.",
      plain: "The hurdle rate is the minimum after-tax return the firm's equity investors require — RAROC must clear this bar the same way an IRR must clear a project's discount rate."
    },
    {
      name: "Adjusted RAROC (ARAROC)",
      math: "\\text{ARAROC} = \\text{RAROC} - \\beta\\times(\\text{market return} - r_f)",
      note: "RAROC=12%, rf=5%, market return=11%, \\(\\beta =1.5\\) → ARAROC=12%−1.5×6%=3% < 5% → reject.",
      plain: "ARAROC strips a CAPM-based systematic-risk toll out of RAROC before comparing what's left to the risk-free rate, so a project can no longer look attractive purely because it happens to have a high RAROC while also carrying a lot of market-wide risk.",
      derivation: `<p>Recall CAPM's required return: \\(r = r_f + \\beta\\times(\\text{market return}-r_f)\\) — the compensation an investor demands for bearing \\(\\beta\\) units of systematic (market) risk on top of the risk-free rate. ARAROC applies the same logic to RAROC itself: it treats \\(\\beta\\times(\\text{market return}-r_f)\\) as the "toll" a systematically risky project owes, and subtracts that toll from RAROC. Worked example: \\(\\text{RAROC}=12\\%\\), \\(r_f=5\\%\\), market return \\(=11\\%\\), \\(\\beta=1.5\\). Toll \\(=1.5\\times(11\\%-5\\%)=1.5\\times6\\%=9\\%\\). \\(\\text{ARAROC}=12\\%-9\\%=3\\%\\). Since \\(3\\%<r_f=5\\%\\), reject — after paying for its systematic risk exposure, the project doesn't even clear the risk-free rate, despite its simple RAROC beating the hurdle rate.</p>`
    },
    {
      name: "Diversification benefit (2-activity example)",
      math: "\\text{Benefit} = (\\text{stand-alone }A + \\text{stand-alone }B) - \\text{combined capital}",
      note: "A=$50, B=$60, combined=$90 → benefit=$20, allocated pro-rata.",
      plain: "The diversification benefit is simply the capital saved by holding two imperfectly-correlated activities together instead of separately — the sum of what each would need alone, minus what they actually need combined.",
      derivation: `<p>Activity A alone needs \\(\\$50\\) of risk capital; Activity B alone needs \\(\\$60\\); together (since their returns aren't perfectly correlated) they need only \\(\\$90\\), not \\(\\$110\\). Benefit \\(=50+60-90=\\$20\\). Allocated pro-rata by stand-alone share: A gets \\(\\dfrac{20\\times50}{110}=\\$9.1\\); B gets \\(\\dfrac{20\\times60}{110}=\\$10.9\\). Fully diversified capital: A \\(=50-9.1=\\$40.9\\); B \\(=60-10.9=\\$48.1\\) (sums to \\(\\$89\\), rounding, of the \\(\\$90\\) total). Marginal capital instead asks "what does the total change by if I remove this one activity, holding the other fixed": A's marginal \\(=90-60=\\$30\\); B's marginal \\(=90-50=\\$40\\). These sum to \\(\\$70\\), less than the \\(\\$90\\) total — expected, not an error, because each marginal figure independently "double counts" credit for the shared diversification benefit.</p>`
    }
  ],

  concepts: [
    {
      name: "Risk capital vs. economic capital vs. regulatory capital",
      def: "Risk capital is the financial buffer a firm holds specifically to absorb unexpected losses — protection that assures depositors, counterparties, and other stakeholders that their funds are safe even if a bad year hits. Economic capital = risk capital + strategic risk capital (an alternative, broader definition used for capital-budgeting purposes). Regulatory capital differs from risk capital in three concrete ways: (1) it applies only to regulated industries like banking and insurance — a manufacturer has no 'regulatory capital' requirement; (2) it's set by industry-wide benchmarks (formulas applied across all similar firms), and is usually well below a specific firm's true, firm-tailored risk capital need; (3) within a firm's own divisions, risk capital and regulatory capital can diverge even when the two happen to match at the whole-firm level (a low-risk-capital division can still face a high regulatory capital charge, or vice versa).",
      intuition: "Think of risk capital as 'what this specific firm, with its specific portfolio, actually needs to survive a bad year' and regulatory capital as 'the minimum floor a regulator sets using an industry-wide formula, regardless of your specific portfolio.' The two numbers are computed by completely different processes and have no reason to match at a granular level.",
      example: "If Basel III capital requirements are conservative enough in a given area (e.g. securitization exposures), regulatory capital can end up substantially higher than a firm's true risk/economic capital for that activity. When that gap gets large, the activity has an incentive to migrate into shadow banking (unregulated entities and structures run by, or affiliated with, regulated institutions) to escape the more expensive regulatory capital charge while still taking on comparable risk.",
      pitfall: "Allocate the GREATER of risk capital and regulatory capital per division — don't default to just one or the other. Even when regulatory capital exceeds risk/economic capital for an activity, the firm still must separately compute risk/economic capital, because that number (not the regulatory minimum) is what actually tells you whether the activity is economically worth doing.",
      related: [{ r: 20, label: "R20 — EL/UL, the building blocks of risk capital" }]
    },
    {
      name: "Motivations for using economic capital",
      def: "Financial institutions rely on economic capital approaches for four linked reasons. (1) Capital is used extensively to cushion risk: unlike most non-financial firms, banks can become highly leveraged cheaply just by taking deposits or issuing debt — with no equity issuance required — and their derivatives, guarantees, and other commitments require little upfront funding while still carrying real risk, so every activity needs an economic capital cost attached. (2) Financial institutions must be creditworthy: a bank's main customers (depositors) are also its main liability holders, so they care directly about the bank's own default risk, and OTC derivatives counterparties care about counterparty risk in the same way — holding enough economic capital reassures both groups. (3) It's hard for outsiders to assess a financial institution's creditworthiness externally, because its risk profile can shift quickly (complex hedging and derivatives positions can rapidly change its liquidity) — a strong capital buffer substitutes for that missing external clarity. (4) Profitability is heavily affected by the cost of capital: economic capital behaves like equity (it doesn't have to be repaid the way debt does, and it absorbs losses), which makes it more expensive to hold than debt — so a firm must balance holding enough of it against the drag it puts on returns.",
      intuition: "A bank doesn't hold economic capital because a rulebook says so (that's regulatory capital's job) — it holds economic capital because its whole business model of taking deposits and running derivatives books only works if depositors and counterparties trust it won't default, and that trust has to be backed by something real.",
      related: []
    },
    {
      name: "Risk capital and strategic risk capital",
      def: "Risk capital ≈ the firm's one-year VaR at a high confidence level (usually ≥95%) — the buffer against unexpected loss specifically. Strategic risk capital = goodwill (excess purchase price over fair value of net assets) + burned-out capital (start-up spend at risk if a venture is abandoned, amortized over time).",
      intuition: "Goodwill exists because an acquirer sometimes pays more than a target's recorded net assets are worth on paper — that premium reflects real but unrecorded value (a brand, a customer base, proprietary know-how) and is 'at risk' if that value turns out not to materialize. Burned-out capital is the mirror image for organic growth: money already spent building a new venture (technology, staffing, a launch) that would be lost if the firm decides, partway through, that the venture's risk-adjusted returns don't justify continuing.",
      example: "Firms may also allocate risk capital against unused risk limits — e.g. the undrawn portion of a corporate line of credit — because that unused capacity could be drawn down at any time, and once it is, the risk capital allocation needs to be adjusted upward to reflect the newly-used exposure.",
      related: []
    },
    {
      name: "The detailed RAROC equation",
      def: "RAROC = [expected revenues − costs − expected losses (EL) − taxes + return on economic capital − transfers] / economic capital. 'Expected revenues' assumes no losses (losses are handled separately via the EL term); 'costs' are direct costs; 'taxes' use the firm's effective tax rate; 'transfers' capture head-office overhead allocations plus intra-firm transactions with Treasury (borrowing/hedging costs). 'Return on economic capital' is the risk-free return earned by investing the allocated capital itself, since it isn't sitting idle. For ex ante (before-the-fact) capital budgeting decisions, use expected revenues and losses; for ex post (after-the-fact) performance evaluation, use realized (actual) revenues and losses instead.",
      example: "$1.5B loan portfolio, 7% pre-tax return, $10M opex, funded by $1.5B deposits at 5%, EL=0.5%/yr, UL=8% ($120M economic capital), risk-free rate 1%, tax rate 25%. Expected revenue=$105M, interest expense=$75M, EL=$7.5M, return on econ. capital=$1.2M. RAROC = [(105−75−7.5+1.2)×(1−0.25)]/120 = 8.56% after-tax — meaning the portfolio must clear at least an 8.56% after-tax return on the equity backing it to be worth keeping.",
      related: ["Hurdle rate and adjusted RAROC"]
    },
    {
      name: "Four benefits of RAROC over accounting profit",
      def: "(1) It measures performance using economic profits instead of accounting profits — accounting profits bake in historical and somewhat arbitrary items like depreciation schedules that don't reflect true economic risk-taking. (2) It's used to compute increases in shareholder value for incentive compensation (scorecards) at the firm and divisional level, and its flexibility supports deferred/contingent compensation or clawbacks if performance later sours. (3) It's used in portfolio management for buy/sell decisions and in capital management to estimate the incremental value added by a new investment (or destroyed by discontinuing an existing one). (4) It enables risk-based pricing: since every transaction's price must reflect its expected loss and its cost of allocated economic capital, firms commonly use the 'marginal economic capital requirement' piece of the RAROC equation specifically for pricing and for measuring incremental shareholder value added by a new deal.",
      intuition: "Each benefit maps to a different internal customer: benefit 1 is for the CFO/board (truer performance numbers), benefit 2 is for HR/compensation committees, benefit 3 is for portfolio managers, and benefit 4 is for the pricing desk deciding what rate to quote a borrower.",
      related: []
    },
    {
      name: "Time horizon, default probability, confidence level — the three judgment calls",
      def: "Time horizon: usually one year, chosen because it fits the business planning cycle and roughly matches how long a firm needs to recover from a significant unexpected loss; the square-root-of-time rule scales 1-day VaR to annual (multiply by √252 trading days), then adjusts for the fact that even in a worst case the firm can typically only reduce risk down to a 'core' risk level, and it takes real time (liquidity-dependent) to get there — this is the 'time to reduce.' Default probability: point-in-time (PIT) for short-term pricing/expected loss, since it reflects current credit conditions; through-the-cycle (TTC) for economic capital, profitability, and strategic decisions, since it smooths across the cycle. Confidence level: must match the firm's target credit rating (AA/AAA needs >99.95%).",
      example: "Daily VaR=80, core risk=60, 10 days to reduce (2/day), 252 business days: annualized VaR = \\(80\\times \\sqrt{252}\\) ≈ 1,269.96. Required risk capital ≈ 75.6% of annualized VaR (≈960.18/1,269.96) — this blends the gradual reduction path (from current risk down to the core level, at 2 VaR/day) with the fact that a residual 'core' risk level persists for the rest of the year regardless of how quickly the firm de-risks. Separately: with four risk types — market $400, credit $300, liquidity $200, operational $500 — aggregate risk capital could be as high as $1,400 assuming perfect (+1) correlation (simple sum) or as low as $734 assuming zero correlation (square root of the sum of squares: \\(\\sqrt{400^2+300^2+200^2+500^2}\\)). The true figure lies somewhere in that wide $734–$1,400 range, and pinning it down — plus fairly allocating the resulting diversification benefit back to business units — is genuinely difficult in practice.",
      pitfall: "A LONGER RAROC time horizon isn't automatically 'better' — risk and return data over one year quickly becomes unreliable, which is exactly why one year remains the default despite the appeal of capturing a 'full business cycle' (a longer horizon also doesn't necessarily raise required capital, since the confidence level needed to preserve solvency tends to fall as the horizon lengthens). TTC produces LOWER economic-capital volatility since ratings change less often under a TTC lens than under PIT. Lowering the confidence level cuts required capital MOST DRAMATICALLY for firms whose big losses are rare (op/credit/settlement risk-heavy books) — for firms with little exposure to those risk types, a lower confidence level is less likely to meaningfully reduce required capital.",
      related: [{ r: 22, label: "R22 — through-the-cycle vs point-in-time ratings, the same concept" }],
      memory: "PIT for pricing (react fast); TTC for capital/strategy (smooth, stable)."
    },
    {
      name: "Hurdle rate and adjusted RAROC",
      def: "Hurdle rate h_AT = after-tax weighted average cost of equity capital (via CAPM), conceptually parallel to comparing an internal rate of return (IRR) to a project's discount rate; in practice it's revised roughly once or twice a year, or whenever it moves by more than 10%. Decision rule: RAROC > hurdle rate → accept (value creation); RAROC < hurdle rate → reject (value destruction).",
      pitfall: "This basic rule ignores that high-RAROC projects can still be high-risk, and low-RAROC projects can be low-risk and value-preserving — hence adjusted RAROC (ARAROC), which nets out systematic risk via CAPM. ARAROC decision rule: ARAROC > risk-free rate → accept; ARAROC < risk-free rate → reject.",
      example: "RAROC=12%, rf=5%, market return=11%, \\(\\beta =1.5\\). ARAROC = 12% − 1.5×6% = 3%. Since 3% < 5% (rf), reject the project — despite RAROC exceeding the simple hurdle rate comparison might have suggested acceptance.",
      related: [],
      memory: "Simple RAROC vs hurdle rate can approve a project that ARAROC (accounting for systematic risk) correctly rejects."
    },
    {
      name: "Diversification benefits — stand-alone, fully diversified, marginal capital",
      def: "Activity A alone needs $50, B alone needs $60, together $90. Diversification benefit = 50+60−90 = $20, allocated pro-rata: A gets $9.1, B gets $10.9 → fully diversified capital: A=$40.9, B=$48.1. Marginal capital: A's marginal = 90−60=$30; B's marginal = 90−50=$40 (marginal capital sums to less than total capital — this is normal and expected, since each marginal figure separately 'takes credit' for the same shared diversification benefit).",
      intuition: "The general recipe for a new activity's marginal capital: total risk capital required for the whole business unit, minus the risk capital that would be required for all the OTHER activities alone (without the new one). It answers 'what does adding this one activity change,' which is exactly the number a portfolio manager needs when deciding whether to grow or shrink a specific business line — a business unit whose earnings correlate more strongly with the overall firm needs more risk capital allocated to it than one whose earnings are negatively correlated (countercyclical business lines let the whole firm hit a target credit rating with less total capital).",
      pitfall: "Use cases differ by concept: stand-alone capital → incentive pay; fully diversified capital → solvency and minimum capital requirements; marginal capital → active portfolio/business-mix decisions (fully considering diversification benefits). Correlations can COLLAPSE toward ±1 in a crisis, wiping out assumed diversification benefits exactly when you need them most.",
      related: [{ r: 20, why: "R20 — the same diversification logic in credit portfolio UL" }],
      memory: "Three capital concepts, three different jobs: stand-alone pays bonuses, fully-diversified sets solvency floors, marginal guides portfolio decisions."
    },
    {
      name: "Four-quadrant qualitative overlay",
      def: "A qualitative complement to RAROC: plot each business unit on two axes — expected RAROC return (horizontal) and quality of earnings (vertical, judged by strategic importance to the firm, growth opportunities, long-run earnings stability/volatility, and synergies with other units). Four resulting quadrants: (1) low quality, low quantity of earnings → correct, reduce, or shut down; (2) low quality, high quantity ('managed growth') → maintain units that currently generate high returns but have low strategic importance; (3) high quality, low quantity ('investment') → maintain units with low current returns but high strategic value and growth potential; (4) high quality, high quantity → allocate the most resources here.",
      intuition: "This exists precisely because RAROC alone is a backward-looking, purely numeric snapshot — it can't tell you that a currently-low-return business unit is strategically vital (a new product line still ramping up) or that a currently-high-return unit has no long-term future (a mature, declining book). The quadrant chart forces that judgment call to be made explicitly, alongside the number.",
      related: []
    },
    {
      name: "RAROC best practices",
      def: "Senior management buy-in and active promotion (the CEO and management team must actively promote RAROC as a shareholder-value tool, emphasizing profit relative to risk taken rather than raw profit maximization); clear communication/education for buy-in across management levels, including a fair and transparent allocation process and open dialogue with business unit leaders; ongoing consultation via a cross-functional metrics-review committee (credit-risk metrics like PD, migration frequencies, LGD, and credit line usage need periodic review; market-risk metrics on volatility/correlation should be updated at least monthly; operational-risk metrics are less well-defined and involve more subjectivity; core risk level and time-to-reduce should be updated annually); centralized data quality control (RAROC team owns collection/computation/reporting; business units and accounting own data accuracy controls); complement RAROC with the qualitative four-quadrant (return × earnings-quality) assessment; active capital management via quarterly limit requests (economic capital, leverage, liquidity, risk-weighted assets) that business units submit to the RAROC team, reviewed collaboratively with Treasury checking against funding limits before senior management makes the final call.",
      related: []
    }
  ],

  eli5: `<p>Imagine two friends each ask to borrow $1,000 from you for a year. Friend A promises to pay you back $1,050 (a 5% return) and you're pretty sure they're good for it. Friend B promises $1,150 (a 15% return!) but you know they might not pay you back at all, so to feel safe lending to them you'd have to keep an extra $400 of your own savings untouched in a drawer, "just in case," instead of investing it elsewhere. Friend B's raw return looks better, but once you account for the $400 you had to freeze as a safety cushion, Friend A might actually be the smarter use of your money. RAROC is the bank version of this comparison: it divides the money a loan or business actually earns (after subtracting the losses you already expect and the taxes you owe) by the extra capital "frozen in the drawer" to cover a bad surprise — the economic capital — so you can compare deals fairly on a per-dollar-of-risk basis instead of just chasing the biggest headline return.</p>`,

  thinkLike: `<p>A risk manager reviewing a new loan, trading desk, or acquisition doesn't start with "how much profit will this make" — they start with "how much capital will this tie up if things go badly, and does the expected return clear the bar for THAT much capital." That reframing is the whole point of RAROC: profit and risk only mean something together, never separately. When comparing two business units with different RAROCs, a sharp practitioner immediately asks a second question before declaring a winner: is the higher-RAROC unit higher-RAROC because it's genuinely more efficient, or just because it's taking on more systematic (market-correlated) risk that RAROC alone doesn't price? That's exactly the gap ARAROC is built to close, and it's the examiner's favorite trap in this reading — a scenario where RAROC clears the hurdle rate but ARAROC, once you subtract the CAPM-based systematic risk toll, does not clear the risk-free rate.</p>
  <p>On the exam, expect three recurring question shapes: (1) a multi-line numeric setup (revenue, funding cost, opex, EL rate, UL/economic-capital amount, tax rate) that you must assemble into the detailed RAROC formula step by step — practice doing this from raw inputs, not from a memorized shortcut; (2) an ARAROC calculation that tests whether you remember to compare the ADJUSTED figure to the risk-free rate, not the hurdle rate; and (3) a stand-alone vs. fully diversified vs. marginal capital question that tests whether you know WHICH of the three numbers answers a specific business question (bonus pool, solvency floor, or grow/shrink decision) rather than just being able to compute all three.</p>`,

  breakdown: [
    {
      title: "Four benefits of RAROC over plain accounting profit",
      points: [
        "Economic vs. accounting profit — strips out arbitrary accounting items like depreciation to show true risk-adjusted performance.",
        "Incentive compensation — powers scorecards for shareholder-value-based bonuses, with flexibility for deferred pay or clawbacks.",
        "Portfolio and capital management — informs buy/sell decisions and estimates the incremental value a new investment adds (or a discontinued one removes).",
        "Risk-based pricing — prices a transaction using its expected loss and marginal economic capital requirement, directly setting the minimum rate to charge."
      ]
    },
    {
      title: "Three judgment calls that make RAROC hard to apply",
      points: [
        "Time horizon — usually one year (business-cycle fit, recovery time), scaled from short-horizon VaR via the square-root-of-time rule plus a core-risk / time-to-reduce adjustment; longer horizons aren't automatically better since data reliability degrades past a year.",
        "Default probability — point-in-time (PIT) for short-term pricing and expected loss (reacts to current conditions); through-the-cycle (TTC) for economic capital, profitability, and strategy (smoother, lower capital volatility).",
        "Confidence level — must match the firm's target credit rating (AA/AAA needs >99.95%); lowering it cuts capital most dramatically for firms whose big losses are rare (op/credit/settlement-heavy books)."
      ]
    },
    {
      title: "Three capital concepts for diversification benefit",
      points: [
        "Stand-alone capital — each activity's own capital need computed in total isolation, ignoring all diversification; used to set incentive pay.",
        "Fully diversified capital — total combined capital allocated back pro-rata by stand-alone share; used for solvency assessment and minimum capital requirements.",
        "Marginal capital — total capital minus the capital needed for all OTHER activities alone; fully reflects diversification and is used for active portfolio/business-mix decisions. Marginal amounts across activities sum to less than the total — expected, not an error."
      ]
    },
    {
      title: "Four-quadrant qualitative overlay (RAROC return × earnings quality)",
      points: [
        "Low quality, low quantity of earnings — correct, reduce, or shut down the business unit.",
        "Low quality, high quantity of earnings ('managed growth') — maintain: high current returns, low strategic importance.",
        "High quality, low quantity of earnings ('investment') — maintain: low current returns, high strategic value/growth potential.",
        "High quality, high quantity of earnings — allocate the most resources here."
      ]
    },
    {
      title: "RAROC implementation best practices",
      points: [
        "Senior management buy-in — CEO and management actively promote RAROC as a shareholder-value tool, not a raw-profit-maximization tool.",
        "Communication and education — fair, transparent allocation process with open dialogue across management levels and business units.",
        "Ongoing consultation — a cross-functional metrics-review committee updates credit, market, and operational risk metrics on appropriate cycles.",
        "Data quality control — centralized RAROC team owns collection/computation/reporting; business units and accounting own data accuracy.",
        "Qualitative complement — the four-quadrant return × earnings-quality overlay supplements the pure number.",
        "Active capital management — quarterly limit requests reviewed collaboratively between business units, the RAROC team, Treasury, and senior management."
      ]
    }
  ],

  quiz: [
    {
      q: "A commercial loan portfolio has expected revenue of $105M, interest expense of $75M, expected loss of $7.5M, return on economic capital of $1.2M, an effective tax rate of 25%, and economic capital of $120M. What is the after-tax RAROC?",
      options: ["6.25%", "8.56%", "9.75%", "11.02%"],
      answer: 1,
      why: "[(105−75−7.5+1.2)×(1−0.25)]/120 = (23.7×0.75)/120 = 17.775/120 = 8.56%. The tempting wrong answer 11.02% comes from forgetting to apply the (1−tax rate) factor before dividing; 9.75% comes from omitting the return-on-capital add-back."
    },
    {
      q: "RAROC is 12%, the risk-free rate is 5%, the market return is 11%, and the firm's equity beta is 1.5. Under the adjusted RAROC (ARAROC) framework, what should the firm do?",
      options: [
        "Accept, because 12% RAROC exceeds a typical hurdle rate.",
        "Accept, because ARAROC of 9% exceeds the risk-free rate.",
        "Reject, because ARAROC of 3% is below the risk-free rate of 5%.",
        "Reject, because RAROC itself is below the risk-free rate."
      ],
      answer: 2,
      why: "ARAROC = 12% − 1.5×(11%−5%) = 12%−9% = 3%, which is below the 5% risk-free rate, so reject. The first distractor applies the wrong (simple RAROC vs. hurdle rate) test; the second miscomputes the systematic-risk toll as the ARAROC figure itself rather than subtracting it."
    },
    {
      q: "Which statement about regulatory capital versus risk (economic) capital is most accurate?",
      options: [
        "Regulatory capital always exceeds risk capital at the divisional level whenever it does so at the firm level.",
        "A firm should always allocate whichever of risk capital or regulatory capital is smaller to a given division.",
        "A firm should allocate the greater of risk capital and regulatory capital to a given division, since the two can diverge within divisions even when they match at the firm level.",
        "Regulatory capital applies to both regulated and unregulated firms equally."
      ],
      answer: 2,
      why: "The reading is explicit: allocate the GREATER of the two per division. Regulatory capital only applies to regulated industries (ruling out the last option), and there's no rule that it always tracks risk capital divisionally even if the two coincide firm-wide."
    },
    {
      q: "Activity A alone requires $50 of risk capital, Activity B alone requires $60, and together they require $90. What is Activity A's marginal capital, and why does marginal capital across the two activities sum to less than the $90 total?",
      options: [
        "$50; marginal capital always equals stand-alone capital by definition.",
        "$30; because marginal capital reflects each activity's incremental contribution given the other already exists, and each figure separately captures the same shared diversification benefit.",
        "$40.9; because marginal capital is simply the pro-rata allocation of the diversification benefit.",
        "$90; marginal capital always equals the total combined capital for the business unit."
      ],
      answer: 1,
      why: "A's marginal capital = total ($90) minus B's stand-alone capital ($60) = $30. It sums to less than the $90 total (with B's marginal of $40) because both figures individually 'credit' the shared diversification benefit — this is expected, not an error. $40.9 is fully diversified (pro-rata) capital for A, a different concept entirely."
    },
    {
      q: "A bank wants to price a new commercial loan today and separately wants to size its long-run economic capital for strategic planning. Which default probability approach should it use for each purpose, respectively?",
      options: [
        "Through-the-cycle (TTC) for pricing; point-in-time (PIT) for economic capital.",
        "Point-in-time (PIT) for pricing; through-the-cycle (TTC) for economic capital.",
        "PIT for both, since pricing and capital sizing both need current information.",
        "TTC for both, since both require stable, cycle-smoothed inputs."
      ],
      answer: 1,
      why: "PIT reflects current credit conditions, which is what pricing a specific transaction today needs; TTC smooths across the cycle and produces lower economic-capital volatility, which is what long-run capital sizing and strategic decisions need. Using PIT for capital sizing would cause needless capital churn as short-term conditions fluctuate."
    },
    {
      q: "Which statement about RAROC time horizon and confidence level is most accurate?",
      options: [
        "A longer time horizon is always preferable because risk and return data become more reliable the further out you measure.",
        "Lowering the confidence level reduces required capital most dramatically for firms whose large losses are rare, such as those primarily exposed to operational, credit, and settlement risk.",
        "The one-year horizon is used only because it fits the accounting calendar, with no connection to a firm's actual loss-recovery timeline.",
        "A firm's target credit rating has no bearing on the confidence level chosen for economic capital."
      ],
      answer: 1,
      why: "Confirmed directly by the reading: lowering the confidence level cuts required capital most for firms whose big losses are rare. The one-year horizon is chosen for business-planning fit AND because it approximates the time needed to recover from a major unexpected loss — and risk/return data becomes LESS, not more, reliable past about one year, making the first option the classic exam trap."
    }
  ],

  sources: [
    { title: "Risk-adjusted return on capital (RAROC) — Wikipedia", url: "https://en.wikipedia.org/wiki/Risk-adjusted_return_on_capital", note: "Overview of the RAROC concept, its formula variants, and its role in bank capital allocation." },
    { title: "Economic capital — Wikipedia", url: "https://en.wikipedia.org/wiki/Economic_capital", note: "Background on economic capital as distinct from regulatory capital, including confidence-level and time-horizon choices." },
    { title: "Capital asset pricing model (CAPM) — Wikipedia", url: "https://en.wikipedia.org/wiki/Capital_asset_pricing_model", note: "The systematic-risk framework (beta, market return, risk-free rate) that Adjusted RAROC borrows directly." },
    { title: "Basel III: international regulatory framework for banks — BIS", url: "https://www.bis.org/bcbs/basel3.htm", note: "The regulatory capital rules referenced when comparing regulatory capital to risk/economic capital." }
  ],

  pdf: { book: 3, query: "RAROC answers one question with real teeth" },

  connections: {
    from: [
      { r: 46, why: "RAROC was previewed there as part of ERM's fourth (financial-firm-specific) pillar." },
      { r: 20, why: "The EL/UL machinery from Credit Risk Book 2 is directly reused as RAROC's numerator/denominator building blocks." }
    ],
    to: [
      { r: 57, why: "Economic capital's practical challenges and limitations get their own dedicated treatment." }
    ],
    confused: [
      { what: "RAROC vs Adjusted RAROC decision rules", how: "RAROC compares to the HURDLE RATE (after-tax WACC); ARAROC compares to the RISK-FREE RATE, after subtracting a CAPM-based systematic risk adjustment. A project can pass the RAROC test and still fail the ARAROC test." },
      { what: "Stand-alone vs fully diversified vs marginal capital", how: "Stand-alone: each activity's OWN capital need in isolation. Fully diversified: total combined capital, allocated pro-rata (accounts for diversification benefit). Marginal: the capital added by ONE activity given the other already exists (marginal amounts sum to less than the total — expected, not an error)." },
      { what: "Point-in-time vs through-the-cycle default probability", how: "PIT reacts fast, used for short-term pricing/EL. TTC smooths across the cycle, used for economic capital and strategic decisions — same distinction as R22's rating philosophies." }
    ]
  },

  misconceptions: [
    { wrong: "\"A project with RAROC above the hurdle rate should always be accepted.\"", right: "The simple RAROC-vs-hurdle-rate rule ignores systematic risk exposure — a project can pass this test yet fail the ARAROC test (which nets out systematic risk via CAPM and compares to the risk-free rate), correctly identifying it as value-destroying once risk is properly priced in." },
    { wrong: "\"Marginal capital for each activity should sum to exactly the total combined capital.\"", right: "Marginal capital amounts NORMALLY sum to LESS than total combined capital — this is expected and correct, not an error, because marginal capital measures each activity's incremental contribution GIVEN the others already exist, and these increments overlap in how they capture shared diversification benefit." },
    { wrong: "\"A longer RAROC time horizon (e.g., a full business cycle) would give more reliable risk-adjusted performance measures.\"", right: "Risk and return data over periods longer than about one year quickly become unreliable — this is exactly why one year remains the standard default despite the conceptual appeal of capturing a full business cycle." },
    { wrong: "\"Diversification benefits assumed in economic capital models are stable and can be relied upon in a crisis.\"", right: "Correlations can COLLAPSE toward ±1 in a crisis, wiping out assumed diversification benefits exactly when the firm needs them most — a crucial caution for economic capital modeling." },
    { wrong: "\"RAROC and regulatory capital should always be about the same, so there's no need to separately compute risk/economic capital.\"", right: "Regulatory capital is set by industry-wide benchmarks and can diverge substantially from a firm's true risk/economic capital — especially where Basel III is conservative (e.g. securitization). The firm still must compute risk/economic capital separately, since that number (not the regulatory floor) is what determines whether an activity is genuinely worth doing; large persistent gaps also create an incentive to shift the activity into shadow banking." }
  ],

  highYield: [
    { stars: 5, what: "Detailed RAROC formula and full worked calculation fluency.", why: "The core computational skill of this reading — directly testable as a multi-step numeric problem." },
    { stars: 5, what: "Adjusted RAROC (ARAROC) and its CAPM-based systematic risk adjustment, decision rule vs. risk-free rate.", why: "A frequently tested formula that corrects RAROC's key blind spot (ignoring systematic risk level)." },
    { stars: 4, what: "Stand-alone / fully diversified / marginal capital — definitions, use cases, and why marginal sums to less than total.", why: "A precise three-way distinction with clear, separately testable use cases." },
    { stars: 4, what: "PIT vs TTC default probability for different RAROC purposes; confidence level tied to target credit rating.", why: "Reuses R22's rating philosophy distinction in a new capital-allocation context." },
    { stars: 3, what: "Risk capital vs regulatory capital: allocate the GREATER of the two per division.", why: "A precise, specific rule frequently tested as a standalone fact." },
    { stars: 3, what: "Four benefits of RAROC and four motivations for using economic capital.", why: "Enumerable qualitative lists that show up as 'which of the following is NOT a benefit/motivation' style questions." }
  ],

  recall: [
    { q: "A project shows RAROC of 12% against a hurdle rate of 9% (accept signal), but its beta is 1.5, risk-free rate is 5%, and market return is 11%. Should the firm proceed?", a: "Compute ARAROC = 12% − 1.5×(11%−5%) = 12%−9% = 3%. Since 3% < 5% (risk-free rate), REJECT the project — despite passing the simple RAROC-vs-hurdle-rate test, the project doesn't adequately compensate for its systematic risk exposure once properly adjusted via CAPM." },
    { q: "Why does marginal capital for two activities (A and B) sum to LESS than their combined fully-diversified capital, and why is this not an error?", a: "Marginal capital measures each activity's incremental capital contribution GIVEN the other already exists in the portfolio — both activities' marginal calculations 'take credit for' the shared diversification benefit from the other's presence, causing double-counting when summed. This is expected: marginal capital answers 'what does adding this ONE activity change,' not 'what's this activity's fair share of the total,' which is what fully diversified (pro-rata allocated) capital answers instead." },
    { q: "Why would a bank use point-in-time default probabilities for RAROC's expected loss calculation but through-the-cycle default probabilities for its economic capital sizing?", a: "Expected loss for pricing/short-term decisions needs to reflect CURRENT credit conditions accurately (PIT), since that's what's actually being priced into a specific transaction today. Economic capital, meant to be a stable strategic buffer against unexpected loss over time, benefits from the smoother, less volatile TTC default probability estimates, since ratings (and hence required capital) change less often under a TTC lens — avoiding needless capital churn from short-term credit fluctuations." },
    { q: "Why might correlations assumed in an economic capital model provide a false sense of security?", a: "Correlations often COLLAPSE toward ±1 during a genuine crisis — exactly when diversification benefit is needed most, it tends to evaporate, because previously uncorrelated risks start moving together under systemic stress. A model built on 'normal times' correlations can dramatically understate capital needs in exactly the tail scenario it's meant to protect against." },
    { q: "A firm has four risk types with stand-alone risk capital of $400 (market), $300 (credit), $200 (liquidity), and $500 (operational). What is the range of plausible aggregate risk capital, and why is the range so wide?", a: "As high as $1,400 assuming perfect (+1) correlation across all four risk types (simple sum), or as low as about $734 assuming zero correlation (square root of the sum of squares: √(400²+300²+200²+500²)). The range is wide because actual correlations between risk types are difficult to estimate and can shift over time, and the firm's true diversification benefit — and hence its true aggregate capital need — falls somewhere between these two extremes rather than at either bound." }
  ],

  hooks: [
    { title: "Two hurdles, not one", text: "RAROC clears the first hurdle (beats the WACC-based rate). ARAROC clears a second, sneakier hurdle (beats the risk-free rate, AFTER subtracting a systematic-risk toll). A project can clear the first and trip on the second." },
    { title: "Three capital concepts, three jobs", text: "Stand-alone capital pays the bonus. Fully diversified capital sets the solvency floor. Marginal capital guides 'should we grow this business line.' Same portfolio, three different numbers, three different questions." },
    { title: "Correlation's disappearing act", text: "Diversification benefit is a magic trick that vanishes exactly when you need it most — correlations rush toward 1 in a crisis, and the 'benefit' the model promised evaporates." }
  ],

  summary: `<p><strong>Economic capital</strong> = risk capital + strategic risk capital; allocate the GREATER of risk capital and regulatory capital per division. <strong>Detailed RAROC</strong> = [revenue−costs−EL−taxes+return on econ capital−transfers]/economic capital. Three judgment calls: <strong>time horizon</strong> (1yr default, longer horizons unreliable), <strong>default probability</strong> (PIT for pricing, TTC for capital/strategy), <strong>confidence level</strong> (tied to target credit rating). <strong>RAROC vs hurdle rate</strong> (after-tax CAPM WACC) ignores systematic risk level; <strong>ARAROC</strong> = \\(RAROC- \\beta (market\\) return−rf), compared to rf, corrects this. <strong>Stand-alone</strong> (incentive pay) / <strong>fully diversified</strong> (solvency, pro-rata allocated) / <strong>marginal</strong> (portfolio decisions, sums to less than total — expected) capital serve different purposes. The <strong>four-quadrant overlay</strong> (RAROC return × earnings quality) complements the number qualitatively. Correlations can collapse to ±1 in a crisis, erasing assumed diversification benefit.</p>`
});
