FRM.register({
  book: 5, reading: 86,
  session: "Risk Management and Investment Management",
  title: "VaR and Risk Budgeting in Investment Management",
  tagline: "Risk budgeting is top-down: set a total risk (VaR) tolerance for the whole portfolio, then allocate that risk budget across asset classes and active managers — not just allocate market value.",

  teaches: `<p>Risk budgeting's definition; buy-side vs. sell-side differences in horizon/turnover/leverage; the large-investor investment process (strategic allocation → manager selection); hedge fund risk challenges; absolute vs. relative risk, policy-mix vs. active risk; funding risk and surplus at risk (SaR); plan sponsor risk; VaR for compliance monitoring; VaR-based investment guidelines; and budgeting risk across asset classes and active managers.</p>`,

  why: `<p>Risk budgeting is fundamentally different from market-value allocation — you're allocating a scarce RISK budget, not dollars, and because assets aren't perfectly correlated, the sum of individual VaRs always exceeds the actual portfolio VaR. Ignoring this (focusing on stand-alone VaR) leads to systematically wrong manager/asset selection.</p>`,

  intuition: `<p>Buy-side (asset managers, pension funds) and sell-side (banks) have structurally different risk profiles: sell-side trades rapidly with high leverage (needs forward-looking, dynamic VaR); buy-side holds positions for years with lower leverage (has historically relied on tracking error/benchmarking, but is increasingly adopting VaR as investing globalizes and complexifies).</p>
  <p>The reading's central numeric lesson: focusing on STAND-ALONE VaR when choosing between two candidate positions can lead to the WRONG choice, because what matters is each candidate's CORRELATION with the existing portfolio, not its isolated risk. A lower-stand-alone-VaR asset with high correlation to existing holdings can push total portfolio VaR over budget, while a higher-stand-alone-VaR asset with zero correlation keeps you under budget — correlation, not stand-alone risk, determines the actual incremental VaR impact.</p>
  <p>Funding risk (relevant mainly to pension funds) reframes VaR around the SURPLUS (assets − liabilities): surplus at risk (SaR) asks how much the surplus could shrink, accounting for the fact that liabilities themselves move (often in the SAME direction as assets when rates change, but not necessarily by the same amount) — ironically, falling rates can raise both asset values AND the present value of future obligations, sometimes leaving the surplus worse off despite rising asset values.</p>`,

  visual: `<div class="widget" data-widget="compvar"></div>`,

  formulas: [
    { name: "Surplus and its change", math: "\\text{surplus} = \\text{assets} - \\text{liabilities};\\quad \\Delta\\text{surplus} = \\Delta\\text{assets} - \\Delta\\text{liabilities}", note: "Managing funding risk centers on the volatility of this surplus, not asset returns alone." },
    { name: "Surplus at risk (SaR) — direct approach", math: "\\text{SaR} = \\text{VaR(assets)} - \\text{expected surplus growth}", note: "$200M assets, 10% surplus volatility (scaled by assets), z=1.65 → VaR=$33M; expected surplus growth $8M → deficit=$33M−$28M=$5M shortfall risk." },
    { name: "Surplus at risk — volatility-of-surplus approach", math: "\\text{Var}(A-L) = \\text{Var}(A) + \\text{Var}(L) - 2\\,\\text{Cov}(A,L);\\quad \\text{SaR} = \\text{expected }\\Delta\\text{surplus} - z\\,\\sigma(\\text{surplus})", note: "$200M assets (4% return, 10% vol), $180M liabilities (3% growth, 7% vol), \\(\\rho =0.4\\) → expected \\(\\Delta surplus=\\)$2.6M, \\(\\sigma (surplus\\) growth)=$18.89M → 95% SaR=2.6−1.65×18.89=$28.57M shortfall." },
    { name: "Portfolio-level VaR budget", math: "\\text{VaR} = z\\times(\\text{target volatility})\\times(\\text{assets under management})", note: "20% target vol, $100M AUM, 95% confidence → VaR=1.65×0.20×$100M=$33M." },
    { name: "Optimal manager allocation weight", math: "w_i \\propto \\dfrac{\\text{IR}_i}{\\text{IR}_P}\\quad(\\text{proportional to manager }i\\text{'s IR vs. total portfolio IR})", note: "Weights need not sum to 1 — the remainder is allocated to the (zero-tracking-error) benchmark." }
  ],

  concepts: [
    {
      name: "Risk budgeting",
      def: "A TOP-DOWN process: establish a total risk budget for the portfolio, then allocate RISK (not market value) to individual positions/managers based on a predetermined fund risk level.",
      pitfall: "Risk budgeting differs fundamentally from market-value allocation — the object being allocated is RISK, not dollars.",
      related: []
    },
    {
      name: "Buy side vs. sell side risk management",
      def: "Sell side (banks): rapid trading, high leverage, forward-looking VaR essential (yesterday's risk may say nothing about today's positions). Buy side (investors): longer holding periods (years), lower leverage, historically relied on tracking error/benchmarking/guidelines rather than dynamic VaR.",
      pitfall: "The buy side is increasingly adopting VaR techniques due to growing globalization, complexity, and dynamism of investing — but has to ADAPT VaR to its different needs, not just copy the sell-side approach wholesale.",
      related: [],
      memory: "Sell side: fast, leveraged, needs VaR to survive day-to-day. Buy side: slow, less leveraged, adopting VaR as the world gets more complex."
    },
    {
      name: "The investment process (large investors)",
      def: "Step 1: strategic asset allocation (domestic/foreign stocks/bonds, alternatives) via mean-variance optimization, using passive indices as benchmarks. Step 2: choose managers (passive trackers or active outperformers), review periodically against guidelines (investment types, beta/duration restrictions), evaluate performance via tracking error.",
      related: []
    },
    {
      name: "Hedge fund risk management challenges",
      def: "Hedge funds resemble the sell side (leverage, high turnover) but ALSO carry liquidity risk and low transparency.",
      pitfall: "Low liquidity has a subtle, dangerous effect: it tends to LOWER measured historical volatility AND correlation (via stale/smoothed pricing) — leading to UNDERESTIMATION of traditional risk measures, not just an inconvenience.",
      related: [{ r: 80, label: "R80 — the identical infrequent-trading bias in illiquid asset returns" }],
      memory: "Illiquidity doesn't just make hedge funds harder to trade — it makes their REPORTED risk measures systematically too low, the same stale-pricing bias seen in illiquid assets generally."
    },
    {
      name: "Absolute risk, relative risk, policy-mix risk, active risk",
      def: "Absolute (asset) risk: total possible losses over a horizon (measured by the return itself). Relative risk: measured by excess return (dollar loss relative to a benchmark) — VaR applies to tracking error (SD of excess return) if excess returns are normally distributed. Policy-mix risk: risk from the CHOSEN target weights across asset classes/managers. Active (management) risk: risk from managers DEVIATING from those target weights.",
      pitfall: "Active management risk is usually NOT much of a problem: it's typically small per fund, and there can be diversification effects ACROSS managers' deviations, and even diversification BETWEEN policy-mix risk and active risk that LOWERS total portfolio VaR — UNLESS managers all make the SAME style shifts simultaneously (which increases, not diversifies, risk).",
      related: [],
      memory: "Active risk usually isn't scary — UNLESS every manager independently makes the same bet at the same time, in which case 'independent' deviations turn into one big concentrated bet."
    },
    {
      name: "Funding risk and surplus at risk (SaR)",
      def: "Funding risk: the risk that asset value won't cover the fund's liabilities (highest for defined-benefit pension plans, zero for some fund types). Surplus = assets − liabilities; \\(\\Delta surplus\\) = \\(\\Delta assets\\) − \\(\\Delta liabilities\\).",
      example: "$200M assets, $180M liabilities, expected surplus growth (scaled by assets) 4%, volatility 10%, z=1.65: VaR=$33M; expected surplus=$20M current+$8M growth=$28M; deficit if VaR loss occurs = $33M−$28M=$5M.",
      pitfall: "IRONIC aspect of funding risk: falling interest rates typically RAISE asset values (bonds/equities) — but the present value of future liabilities can rise EVEN MORE, so a decline in rates can still WORSEN the surplus despite assets gaining value. Immunization (matching asset and liability duration) can fix this but may not be feasible (unavailable assets) or desirable (lower return).",
      related: [],
      memory: "Falling rates lift the boat (assets) but can lift the dock (liabilities) even higher — the surplus (boat minus dock) can still sink even as both rise."
    },
    {
      name: "Plan sponsor risk",
      def: "An extension of surplus risk to the party ultimately responsible for the pension fund. Economic risk: variation in the SPONSOR's total economic earnings (accounts for correlation between surplus and the sponsor's own operating profits). Cash flow risk: variation in CONTRIBUTIONS to the fund (a sponsor better able to absorb contribution swings can tolerate a more volatile fund risk profile).",
      related: []
    },
    {
      name: "VaR for compliance monitoring",
      def: "VaR helps catch 'rogue traders' (managers deviating from guidelines, sometimes very short-term deviations regular reporting would miss) and helps monitor even PASSIVE portfolios (whose underlying risk changes as the benchmark's composition/risk profile evolves — e.g., 1990s S&P 500 growing more tech-concentrated).",
      example: "Three explanations for a risk increase: (1) a manager taking on more risk, (2) DIFFERENT managers independently taking similar bets (unintentional concentration), (3) markets becoming more volatile generally.",
      related: [],
      memory: "Passive investing still needs risk monitoring — the benchmark itself quietly changes its risk character over time, and 'passive' doesn't mean 'static.'"
    },
    {
      name: "VaR-based investment guidelines",
      def: "VaR limits move guidelines away from ad hoc, notional/sensitivity-based rules — notional limits ignore correlations and variations in risk, and can be circumvented as more instruments become available.",
      pitfall: "At the trading level: comparing two candidate positions with similar returns, choose the one with LOWER MARGINAL VaR; when choosing how to INCREASE an existing allocation, compare EXCESS-RETURN-TO-MARGINAL-VAR ratios and favor the higher one — directly reusing R85's optimal-portfolio condition.",
      related: [{ r: 85, label: "R85 — marginal VaR and the excess-return-to-MVaR optimality condition this reading applies" }]
    },
    {
      name: "Budgeting risk across asset classes",
      def: "Because asset classes aren't perfectly correlated, the SUM of individual VaRs always EXCEEDS actual portfolio VaR — budgeting must account for diversification, not just add up stand-alone VaRs.",
      example: "$500M in W \\((\\sigma =10\\)%), considering adding $500M of X \\((\\sigma =9\\)%, \\(\\rho =0.7\\) with W) or Y \\((\\sigma =12\\)%, \\(\\rho =0\\) with W), 99% confidence, VaR budget $200M: stand-alone VaR_X ($104.9M) < VaR_Y ($139.8M) — naive comparison favors X. But X's HIGH correlation with W pushes the COMBINED portfolio over the $200M budget, while Y's ZERO correlation keeps the combined portfolio within budget — Y is the correct choice despite its higher stand-alone VaR.",
      pitfall: "This is the reading's central numeric lesson: focusing on STAND-ALONE VaR alone can lead to the WRONG selection — what matters is the candidate's CORRELATION with existing holdings (its incremental contribution), not its isolated risk level.",
      related: [{ r: 85, label: "R85 — incremental VaR, the exact concept this example applies" }],
      memory: "The lower-stand-alone-risk asset can be the WORSE addition if it's highly correlated with what you already own — correlation, not stand-alone size, drives the real risk-budget impact."
    },
    {
      name: "Budgeting risk across active managers",
      def: "Optimal allocation weight for manager i is proportional to \\(IR_{i}/IR_P\\) (manager's information ratio relative to the total portfolio's target information ratio), assuming managers' excess returns are independent of each other.",
      pitfall: "Manager weights need NOT sum to 1 — the remainder is allocated to the BENCHMARK itself, since IR_benchmark=0 by definition (a benchmark has no active/tracking-error risk).",
      related: [],
      memory: "Higher individual IR → bigger allocation. Leftover weight isn't wasted — it just sits passively in the (zero-tracking-error) benchmark."
    }
  ],

  connections: {
    from: [
      { r: 85, why: "Marginal, incremental, and component VaR — built there — become the practical toolkit for choosing managers/assets and setting risk budgets here." },
      { r: 80, why: "Illiquid asset return-smoothing biases reappear identically as the hedge fund liquidity risk challenge here." }
    ],
    to: [
      { r: 87, why: "Risk monitoring and performance measurement extends this reading's compliance and guideline themes." }
    ],
    confused: [
      { what: "Stand-alone VaR vs incremental VaR when choosing between candidate positions", how: "Stand-alone VaR ignores the candidate's relationship to existing holdings; incremental VaR (driven by correlation) determines the TRUE impact on portfolio risk — the reading's worked example shows these can favor opposite choices." },
      { what: "Policy-mix risk vs active (management) risk", how: "Policy-mix risk comes from the CHOSEN target weights themselves; active risk comes from managers DEVIATING from those targets — active risk is usually small UNLESS managers all deviate the same way simultaneously." },
      { what: "Falling interest rates helping vs. hurting a pension fund's surplus", how: "Falling rates raise BOTH asset values and the present value of liabilities — if liabilities rise by MORE than assets, the surplus can shrink even though assets gained value, an ironic, frequently tested funding-risk mechanism." }
    ]
  },

  misconceptions: [
    { wrong: "\"When choosing between two candidate assets to add to a portfolio, always pick the one with the lower stand-alone VaR.\"", right: "The reading's worked example shows this can be WRONG — a candidate with lower stand-alone VaR but HIGH correlation to existing holdings can push total portfolio VaR over budget, while a higher-stand-alone-VaR, ZERO-correlation candidate keeps the portfolio within budget. Correlation (incremental VaR), not stand-alone size, determines the true impact." },
    { wrong: "\"Active management risk (managers deviating from target weights) is always a significant risk concern.\"", right: "It's usually SMALL and even beneficially diversified across managers/against policy-mix risk — UNLESS managers independently make the SAME style shifts at the same time, which concentrates rather than diversifies risk." },
    { wrong: "\"Falling interest rates always improve a pension fund's funding surplus, since asset values typically rise.\"", right: "Falling rates raise both asset values AND the present value of future liabilities — if liabilities rise by MORE than assets (a common outcome given typical duration mismatches), the surplus can actually WORSEN despite rising asset values." },
    { wrong: "\"Passively managed (benchmark-tracking) portfolios don't need risk monitoring since they aren't making active bets.\"", right: "Passive portfolios still need monitoring because the BENCHMARK's own risk profile changes over time (e.g., growing tech concentration in the S&P 500 during the late 1990s) — 'passive' doesn't mean the risk exposure is static." },
    { wrong: "\"Manager allocation weights in risk budgeting must sum to exactly 100%.\"", right: "They need NOT sum to 1 — any remainder is allocated to the (passive) benchmark itself, which by definition has zero tracking error and hence zero information ratio contribution to worry about." }
  ],

  highYield: [
    { stars: 5, what: "Budgeting risk across asset classes: why stand-alone VaR can lead to the wrong choice, and the full worked correlation-driven example.", why: "The signature numeric lesson of this reading — a guaranteed high-value calculation-plus-concept question." },
    { stars: 4, what: "Surplus at risk (SaR): both calculation approaches (direct VaR-vs-expected-surplus, and volatility-of-surplus-via-covariance).", why: "A precise, frequently tested pension-fund-specific application of VaR." },
    { stars: 4, what: "Policy-mix risk vs. active risk, and why active risk is usually small unless managers correlate their deviations.", why: "A clean conceptual distinction with a memorable exception case." },
    { stars: 3, what: "Buy-side vs sell-side differences in horizon, turnover, leverage, and VaR adoption.", why: "Foundational context, frequently tested as a comparison table." },
    { stars: 3, what: "Optimal manager allocation weight proportional to \\(IR_{i}/IR_P\\), with leftover weight to the benchmark.", why: "A specific, calculation-adjacent formula worth quick fluency." },
    { stars: 2, what: "Hedge fund liquidity risk understating volatility/correlation via stale pricing.", why: "Connects directly to R80's illiquid-asset bias theme — a valuable synthesis point." }
  ],

  recall: [
    { q: "A $500M position in W \\((\\sigma =10\\)%) is being supplemented with either X \\((\\sigma =9\\)%, \\(\\rho =0.7\\) with W) or Y \\((\\sigma =12\\)%, \\(\\rho =0\\) with W), 99% confidence, VaR budget $200M. Why might the lower-stand-alone-VaR choice (X) actually be the wrong pick?", a: "X's stand-alone VaR ($104.9M) is indeed lower than Y's ($139.8M), but X's HIGH correlation (0.7) with the existing W position means adding X barely diversifies the portfolio — the combined portfolio VaR with X exceeds the $200M budget. Y's ZERO correlation with W means it genuinely diversifies the portfolio, keeping combined VaR within budget despite Y's higher stand-alone risk. The correlation-driven INCREMENTAL VaR impact, not stand-alone VaR, determines the correct choice." },
    { q: "Why can a pension fund's funding surplus actually shrink when interest rates fall, even though its bond and equity holdings gain value?", a: "Falling rates raise the present value of BOTH the fund's assets AND its future pension liabilities (since liabilities are also discounted at market rates). If the liabilities' duration exceeds the assets' duration (a common real-world mismatch for pension funds), the liabilities' present value rises by MORE than the assets' value — shrinking the surplus (assets−liabilities) even as the absolute asset value increases." },
    { q: "Why is active management risk (managers deviating from target weights) usually not a major concern, and under what circumstance does this change?", a: "For well-managed funds, individual managers' deviations are typically small, and diversification effects occur ACROSS different managers' independent deviations (and even between policy-mix risk and active risk), often lowering total portfolio VaR. This changes when managers, acting independently, happen to make the SAME style shift simultaneously (e.g., all bond managers moving to long-duration bonds on a shared rate-decline forecast) — this concentrates rather than diversifies risk, defeating the usual diversification benefit." },
    { q: "A firm targets a portfolio volatility of 15%, has $150 million AUM, and wants 95% VaR. What is the VaR budget, and what does the budgeting process require when allocating this across asset classes?", a: "VaR = 1.65×0.15×$150M = $37.125 million. The budgeting process must account for diversification — since asset classes aren't perfectly correlated, simply summing each asset class's stand-alone VaR would overstate true portfolio risk; the actual combined portfolio VaR (which must stay within the $37.125M budget) depends on the correlations between asset classes, not just their individual volatilities." }
  ],

  hooks: [
    { title: "The lower-risk asset that isn't", text: "X looks safer alone (lower stand-alone VaR) — but tied to W by a thick rope (0.7 correlation), it barely diversifies anything. Y looks riskier alone but is untethered (zero correlation) — the untethered asset is the one that actually keeps you within budget." },
    { title: "The rising boat, the rising dock", text: "Falling rates lift the pension fund's assets (the boat) — but they can lift the present value of its liabilities (the dock) even higher. The gap between boat and dock (the surplus) can shrink even while both rise." },
    { title: "Passive doesn't mean static", text: "A benchmark-tracking fund isn't 'set it and forget it' — the benchmark itself quietly reshapes its own risk profile over time (tech concentration creeping into the S&P 500 in the late '90s is the textbook example)." }
  ],

  summary: `<p><strong>Risk budgeting</strong>: top-down, allocates RISK (not market value). <strong>Buy side</strong> (long horizon, low leverage, adopting VaR) vs. <strong>sell side</strong> (fast trading, high leverage, VaR-native). <strong>Investment process</strong>: strategic allocation → manager selection. <strong>Hedge funds</strong>: sell-side-like leverage/turnover PLUS liquidity risk (understates vol/correlation) and low transparency. <strong>Absolute risk</strong> (total loss) vs. <strong>relative risk</strong> (excess return/tracking error); <strong>policy-mix risk</strong> (target weights) vs. <strong>active risk</strong> (deviations — usually small, UNLESS managers correlate their bets). <strong>Funding risk/SaR</strong>: surplus=assets−liabilities; falling rates can shrink the surplus despite raising asset values (liability duration mismatch). <strong>Plan sponsor risk</strong>: economic risk + cash flow risk. <strong>VaR monitoring</strong> catches rogue traders and tracks even passive portfolios' evolving risk. <strong>VaR guidelines</strong> beat notional limits (ignore correlations, easily circumvented). <strong>Budgeting across asset classes</strong>: stand-alone VaR can mislead — correlation with existing holdings (incremental VaR) determines the right choice. <strong>Budgeting across managers</strong>: weight ∝ \\(IR_{i}/IR_P\\), remainder to the (zero-IR) benchmark.</p>`
});
