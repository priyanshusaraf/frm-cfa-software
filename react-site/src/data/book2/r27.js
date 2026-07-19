export default ({
  book: 2, reading: 27,
  session: "Credit Risk Estimation",
  title: "Portfolio Credit Risk",
  tagline: "Where the single-factor model gets built from scratch — the same model underlying Vasicek (R26), CDO copula pricing (R30), and the Gaussian copula (R29).",

  teaches: `<p>Default correlation for a two-firm portfolio, Credit VaR at the correlation extremes \\((\\rho =1\\), \\(\\rho =0\\) with varying granularity), the single-factor model (conditional independence), and Credit VaR by simulation (the copula method).</p>
  <p>Before any of the math, hold onto what a credit <strong>portfolio</strong> even is here: a collection of loans, bonds, or other credit exposures to different obligors (borrowers), each of which might default independently — or not. Everything in this reading is about the "or not": how much do defaults move together, and what does that do to the risk of the whole pool?</p>`,

  why: `<p>The intuition to hold onto throughout: default correlation doesn't change a portfolio's EXPECTED loss, but it massively changes the SHAPE of the loss distribution — specifically the fat tail that Credit VaR is trying to measure.</p>
  <p>Why doesn't correlation touch expected loss? Because expected loss is just \\(n\\times PD\\times LGD\\) (probability-weighted average loss per credit, summed) — correlation is a statement about how defaults across different firms move together, not about how likely any single firm is to default. But correlation completely changes what happens at the tail: with high correlation, defaults cluster (either almost nobody defaults, or almost everybody defaults at once), which is exactly the kind of extreme, low-probability, high-severity outcome that Credit VaR (a tail quantile of the loss distribution) is built to capture. This single-factor model, unchanged, is exactly what R28 uses for tranche behavior and R30 uses to price synthetic CDO tranches — so the effort you spend here is not one-reading effort, it's three-readings effort.</p>`,

  intuition: `<p>Build intuition at the correlation extremes first. At \\(\\rho =1\\), a portfolio of many credits behaves like ONE credit — either everything defaults or nothing does, so Credit VaR is essentially binary (either $0 at low confidence, or nearly total loss at high confidence). At \\(\\rho =0\\), the law of large numbers takes over: with many independent credits, realized losses cluster tightly around expected loss (binomial), and MORE credits at the same total exposure (finer granularity) shrinks Credit VaR further, because idiosyncratic bad luck in one credit gets diluted across many others.</p>
  <p>The single-factor model formalizes this. Each firm's <strong>asset return</strong> — a standardized (mean 0, SD 1), unobservable proxy for how healthy the firm's assets are relative to its debts — is written as \\(a_i = \\beta_i\\cdot m + \\sqrt{1- \\beta_i^{2}}\\cdot \\varepsilon_i\\), and the firm defaults if that asset return falls to or below a threshold \\(k_i\\) (the "distance to default," measured in standard deviations). Here \\(m\\) is a single common <strong>market factor</strong> shared by every firm in the economy — think of it as the overall state of the business cycle — and \\(\\varepsilon_i\\) is firm \\(i\\)'s own idiosyncratic (firm-specific) shock, independent of every other firm's shock and of \\(m\\) itself. The coefficient \\(\\beta_i\\) measures how exposed firm \\(i\\)'s fortunes are to that common factor — a high-\\(\\beta\\) firm is a cyclical business (e.g., an airline or a homebuilder) that lives and dies with the economy; a low-\\(\\beta\\) firm is more insulated (e.g., a regulated utility).</p>
  <p>The magic is CONDITIONAL INDEPENDENCE — once the common market factor \\(m\\) is realized (i.e., once you're told exactly what the state of the economy is), defaults across firms become statistically independent of one another, because ALL of the correlation between any two firms lived entirely in their shared exposure to \\(m\\); once \\(m\\) is pinned down, the only thing left varying for each firm is its own private, independent \\(\\varepsilon_i\\). This is why simulating just ONE common factor, then treating each firm independently conditional on it, correctly reproduces the full correlated default structure across potentially thousands of firms — you never have to simulate a giant correlation matrix directly.</p>`,

  visual: `<div class="widget" data-widget="tranche"></div>`,

  formulas: [
    {
      name: "Default correlation (two-firm)",
      math: "\\rho_{12} = \\dfrac{\\pi_{12} - \\pi_{1}\\pi_{2}}{\\sqrt{\\pi_{1}(1-\\pi_{1})\\,\\pi_{2}(1-\\pi_{2})}}",
      note: "Explodes combinatorially for n firms: 2ⁿ outcomes, n(n−1)/2 pairwise correlations.",
      plain: "This says: take the actual joint probability that both firms default, subtract what that joint probability WOULD be if the two firms' defaults were completely unrelated (π₁×π₂), and scale the result by each firm's own default volatility — the result is a correlation coefficient, just like any other correlation, but applied to two Bernoulli (0/1, default-or-not) outcomes instead of two continuous returns.",
      derivation: `<p>Model each firm's default as a Bernoulli random variable \\(x_i\\), equal to 1 if firm \\(i\\) defaults over horizon \\(t\\) and 0 otherwise, with \\(P(x_i=1)=\\pi_i\\).</p>
      <p>Because \\(x_i\\) only takes values 0 and 1, \\(x_i^{2}=x_i\\), so:</p>
      \\[ E[x_i] = \\pi_i, \\qquad \\text{Var}(x_i) = E[x_i^{2}] - (E[x_i])^{2} = \\pi_i - \\pi_i^{2} = \\pi_i(1-\\pi_i) \\]
      <p>The joint default probability \\(\\pi_{12}=P(x_1=1 \\text{ and } x_2=1)\\) is by definition \\(E[x_1 x_2]\\), so the covariance of the two default indicators is:</p>
      \\[ \\text{Cov}(x_1,x_2) = E[x_1x_2] - E[x_1]E[x_2] = \\pi_{12} - \\pi_1\\pi_2 \\]
      <p>Dividing this covariance by the product of the two standard deviations (the usual definition of a correlation coefficient) gives exactly the default correlation formula above.</p>`
    },
    {
      name: "Single-factor asset return",
      math: "a_i = \\beta_i\\, m + \\sqrt{1-\\beta_i^{2}}\\,\\varepsilon_i, \\qquad \\text{default if } a_i \\le k_i",
      note: "Conditional on m, default distribution is \\(\\text{Normal}(\\beta_i\\cdot m,\\ \\sqrt{1- \\beta_i^{2}})\\) — less variance than the unconditional SD of 1.",
      plain: "Each firm's standardized asset return is built from two independent, standard-normal pieces — a shared market shock m weighted by exposure β_i, and a firm-specific shock ε_i weighted so that the total variance still adds up to exactly 1 — and the firm defaults whenever that combined return drops to or below its own default threshold k_i.",
      derivation: `<p>Assume \\(m\\) and every \\(\\varepsilon_i\\) are independent, standard normal (mean 0, variance 1) random variables. Then, since variances of independent variables add:</p>
      \\[ \\text{Var}(a_i) = \\beta_i^{2}\\,\\text{Var}(m) + \\left(1-\\beta_i^{2}\\right)\\text{Var}(\\varepsilon_i) = \\beta_i^{2}(1) + (1-\\beta_i^{2})(1) = 1 \\]
      <p>so \\(a_i\\) is itself standard normal unconditionally — the weights are chosen precisely so this works out. Now condition on a specific realized value \\(m=\\bar m\\): the first term \\(\\beta_i\\bar m\\) becomes a fixed constant, and the only remaining randomness is \\(\\sqrt{1-\\beta_i^{2}}\\,\\varepsilon_i\\). Therefore:</p>
      \\[ a_i \\mid m=\\bar m \\ \\sim\\ \\text{Normal}\\!\\left(\\beta_i\\bar m,\\ \\sqrt{1-\\beta_i^{2}}\\right) \\]
      <p>Conditioning on the common factor shrinks the standard deviation from 1 down to \\(\\sqrt{1-\\beta_i^{2}}\\) because it removes exactly the systematic (β-driven) share of the uncertainty, leaving only the idiosyncratic share.</p>`
    },
    {
      name: "Pairwise default correlation (equal parameters)",
      math: "\\rho_{\\text{default}} = \\dfrac{N_{2}(k,k,\\beta^{2}) - \\pi^{2}}{\\pi\\,(1-\\pi)}",
      note: "\\(N_{2}\\) = bivariate normal CDF.",
      plain: "If every firm in the portfolio shares the same beta, default threshold, and unconditional default probability, the general two-firm default-correlation formula collapses into one expression purely in terms of the bivariate normal probability of two firms jointly breaching the same threshold and the common default probability π.",
      derivation: `<p>Under the single-factor model, the joint probability that both firms \\(i\\) and \\(j\\) default is the probability that both standardized asset returns fall below their thresholds, where \\((a_i,a_j)\\) is bivariate normal with correlation \\(\\beta_i\\beta_j\\):</p>
      \\[ \\pi_{ij} = N_{2}(k_i,\\,k_j,\\,\\beta_i\\beta_j) \\]
      <p>Substitute this \\(\\pi_{ij}\\) for \\(\\pi_{12}\\) in the two-firm default-correlation formula above. If every firm shares the same \\(\\beta\\), \\(k\\), and unconditional default probability \\(\\pi\\) (so \\(\\pi_1=\\pi_2=\\pi\\), \\(k_i=k_j=k\\), and \\(\\beta_i\\beta_j=\\beta^{2}\\)), the denominator \\(\\sqrt{\\pi(1-\\pi)\\cdot\\pi(1-\\pi)}\\) simplifies to \\(\\pi(1-\\pi)\\), giving exactly the pairwise default correlation formula above.</p>`
    }
  ],

  concepts: [
    {
      name: "Default correlation for a two-firm portfolio",
      def: "\\(\\rho_{12}\\) = \\((\\pi_{12}\\) − \\(\\pi_{1}\\pi_{2})/\\sqrt{\\pi_{1}(1- \\pi_{1})\\cdot \\pi_{2}(1- \\pi_{2})}\\).",
      intuition: "Think of it as: how much MORE (or less) likely is it that both firms default together than you'd predict if their defaults had nothing to do with each other? If defaults were truly independent, the joint default probability would just be π₁×π₂ — anything above that number reflects positive default correlation (shared exposure to the same economic conditions, industry, or supply chain).",
      example: "A portfolio of two credits, one rated BBB+ (PD π₁ = 0.002) and one rated BBB (PD π₂ = 0.003), with a joint default probability π₁₂ = 0.00015 over the horizon. Covariance = 0.00015 − (0.002)(0.003) = 0.000144. SD₁ = √[0.002(0.998)] ≈ 0.04468, SD₂ = √[0.003(0.997)] ≈ 0.05469. Default correlation = 0.000144 / (0.04468×0.05469) ≈ 0.000144/0.002443 ≈ 0.059 — a small positive number, typical of the low default correlations found in practice.",
      pitfall: "Drawbacks of the full correlation-based framework: explodes combinatorially (2ⁿ outcomes, n(n−1)/2 pairwise correlations — 10 firms = 1,024 outcomes, 45 pairs), doesn't fit option-like credit positions (guarantees, revolvers, convertibles), and defaults are rare so correlation estimates are noisy (typical assumed value ≈0.05).",
      related: ["The single-factor model"]
    },
    {
      name: "Credit VaR at the correlation extremes",
      def: "\\(\\rho =1\\): portfolio acts like one credit. \\(\\rho =0\\), large n: binomial, granularity kicks in and shrinks VaR further.",
      example: "$1,000,000 portfolio, PD=2%, RR=0%: \\(\\rho =1\\) → 98% chance $0 loss, 2% chance total $1M loss, EL=$20,000, VaR(99%)=$980,000. \\(\\rho =0\\), n=50: 95th percentile defaults=3 → loss=$60,000, VaR(95%)=$40,000. \\(\\rho =0\\), n=1,000: 95th percentile defaults=28 → loss=$28,000, VaR(95%)=$8,000.",
      pitfall: "Granularity effect: more (smaller) credits → LOWER credit VaR, because the law of large numbers pulls realized loss toward expected loss. This effect is WEAKER when PD itself is very low.",
      related: ["The single-factor model"],
      memory: "\\(\\rho =1\\): one giant credit. \\(\\rho =0\\) + many names: the law of large numbers tames the tail."
    },
    {
      name: "The single-factor model",
      def: "a_i = \\(\\beta_i\\cdot m\\) + \\(\\sqrt{1- \\beta_i^{2}}\\cdot \\varepsilon_i\\), default if a_i ≤ k_i. Conditional independence: once m is realized, defaults across firms are independent — all correlation lives in shared exposure to m.",
      intuition: "Conditional on m, the default distribution is Normal with mean \\(\\beta_i\\cdot m\\) and SD \\(\\sqrt{1- \\beta_i^{2}}\\) — less than the unconditional SD of 1, because conditioning on the common factor removes some uncertainty. Three concrete implications flow from conditioning on a specific realized market value: (1) conditional PD differs from unconditional PD whenever β or the realized market value is nonzero — a weak economy (negative realized market value) means a smaller idiosyncratic shock is needed to push a.firm into default; (2) conditional SD is strictly less than the unconditional SD of 1; (3) conditional asset returns and idiosyncratic shocks remain independent across different firms.",
      example: "\\(\\beta =0.25\\), confidence=99% → default threshold z=−2.33. Realized market factor for this target loss level = \\((k- \\sqrt{1- \\beta^{2}}\\cdot z)/\\beta\\) ≈ −0.296. A firm with a higher \\(\\beta =0.5\\) at the same 99% confidence level needs a realized market factor of only ≈ −0.6243 to reach the same tail loss level — a smaller β requires a MORE extreme (more negative) market shock to generate the same default outcome, since less of that firm's risk is systematic.",
      related: [{ r: 26, label: "R26 — Vasicek's WCDR, the same model in different notation" }, { r: 28, label: "R28 — tranche pricing built on this exact model" }, { r: 30, label: "R30 — synthetic CDO pricing via the same one-factor Gaussian copula" }],
      memory: "This model, unchanged, IS R28's tranche machinery and R30's CDO pricing engine — learn it once here."
    },
    {
      name: "Credit VaR by simulation (copula method)",
      def: "Four steps: (1) define the copula function (usually normal/Gaussian), (2) simulate default times, (3) get portfolio P&L per scenario, (4) aggregate into a loss distribution and read off the VaR quantile.",
      example: "A two-loan portfolio, $1,000,000 notional each, one loan rated CCC and one rated BB, default correlation 0.25. Simulate 1,000 pairs of default times using a normal (Gaussian) copula. Map each simulated pair to a terminal portfolio value and a corresponding loss (relative to the no-default value). Sorting the 1,000 simulated losses: the 99% confidence quantile lands on the scenario where BOTH loans default, giving a loss of $1,490,000; the 95% confidence quantile lands at $780,000 — the loss level below which only 5% of simulated outcomes fall.",
      pitfall: "Granularity reduces Credit VaR by shrinking IDIOSYNCRATIC noise — it does NOT reduce SYSTEMATIC (correlation-driven) risk. A highly granular portfolio with high pairwise correlation can still have large Credit VaR. Don't let 'more loans = automatically safer' become your default assumption.",
      related: [{ r: 9, label: "R9 — the copula machinery this applies" }],
      memory: "Granularity kills idiosyncratic risk, not systematic risk — 1,000 correlated loans are still 1,000 correlated loans."
    }
  ],

  connections: {
    from: [
      { r: 26, why: "Vasicek's WCDR formula gets rebuilt from first principles as the single-factor model here." },
      { r: 9, why: "The Gaussian copula machinery introduced abstractly there gets its concrete application here." }
    ],
    to: [
      { r: 28, why: "R28 applies this exact single-factor machinery to tranched products." },
      { r: 30, why: "Synthetic CDO pricing uses the identical one-factor Gaussian copula." }
    ],
    confused: [
      { what: "Granularity effect vs correlation effect", how: "Granularity (more, smaller loans) shrinks IDIOSYNCRATIC risk only. Correlation (systematic risk) is untouched by granularity — a large, granular, highly-correlated portfolio can still have huge Credit VaR." },
      { what: "Conditional vs unconditional default distribution", how: "Unconditionally, asset return has SD 1. CONDITIONAL on the common factor m, SD shrinks to \\(\\sqrt{1- \\beta^{2}}\\) — conditioning removes exactly the systematic component of uncertainty." }
    ]
  },

  misconceptions: [
    { wrong: "\"More loans in a portfolio always means lower Credit VaR.\"", right: "Only true for the IDIOSYNCRATIC component. If pairwise default correlation is high, granularity does nothing to reduce the systematic risk — a large, highly-correlated portfolio can still have substantial Credit VaR." },
    { wrong: "\"At \\(\\rho =1\\), Credit VaR is just the sum of individual asset VaRs.\"", right: "At \\(\\rho =1\\), the portfolio behaves like ONE credit — either everyone defaults together or no one does. VaR at low confidence can be $0 (below the default-probability threshold), jumping to nearly total loss at high confidence — a binary, not additive, structure." },
    { wrong: "\"Conditioning on the common market factor m increases uncertainty about individual defaults.\"", right: "It DECREASES it — conditional on m, each firm's default distribution has SD \\(\\sqrt{1- \\beta^{2}}\\), strictly less than the unconditional SD of 1, because the systematic component of uncertainty has been resolved by observing m." }
  ],

  highYield: [
    { stars: 5, what: "Credit VaR at correlation extremes \\((\\rho =1\\) vs \\(\\rho =0\\), varying n) — full worked mechanics and the granularity effect.", why: "The core intuition-building exercise of this reading, frequently tested with new numbers plugged into the same setup." },
    { stars: 5, what: "The single-factor model and conditional independence — the engine behind R26, R28, and R30.", why: "Master this once and three other readings become relabeling exercises rather than new learning." },
    { stars: 4, what: "Granularity reduces idiosyncratic risk only, NOT systematic (correlation-driven) risk.", why: "The single most heavily tested conceptual trap in this reading." },
    { stars: 3, what: "Default correlation formula and the combinatorial explosion problem (2ⁿ outcomes, n(n−1)/2 pairs).", why: "Sets up why the single-factor model is necessary in the first place — a good 'why' question." }
  ],

  recall: [
    { q: "A $2,000,000 portfolio has PD=2%, RR=0%, and perfect correlation \\((\\rho =1)\\) across all names. What is the 95% Credit VaR?", a: "At \\(\\rho =1\\) the portfolio behaves as one credit: 98% chance of $0 loss, 2% chance of total $2,000,000 loss. EL=$40,000. At 95% confidence, the loss quantile is $0 (default probability 2% < 5% tail), so Credit VaR = 0−40,000, interpreted as $0 Credit VaR (loss doesn't exceed EL at that confidence level)." },
    { q: "Why does increasing the number of (equally-sized) credits in a zero-correlation portfolio reduce Credit VaR, and why does this effect weaken at very low PD?", a: "With independent defaults, the law of large numbers pulls realized portfolio loss toward its expected value as n grows — idiosyncratic bad luck in any one credit gets diluted across many others. At very low PD, though, defaults are so rare that even a large n doesn't fully smooth out the possibility of a small but nonzero cluster of defaults relative to the tiny expected loss, so the granularity benefit is muted." },
    { q: "In the single-factor model, why does conditioning on the market factor m make defaults independent across firms?", a: "By construction, all correlation between firms' asset returns is channeled through their shared exposure to the common factor m (via \\(\\beta_i)\\). The idiosyncratic term \\(\\varepsilon_i\\) is independent across firms by assumption. Once m is fixed (known), the only remaining source of variation in each firm's asset return is its own independent \\(\\varepsilon_i\\) — so defaults become conditionally independent." },
    { q: "A highly granular portfolio (1,000 small, equal-sized loans) has default correlation \\(\\rho =0.4\\). Does its Credit VaR resemble the \\(\\rho =0\\), n=1,000 case from the reading?", a: "No — granularity only reduces IDIOSYNCRATIC risk. With \\(\\rho =0.4\\) (substantial systematic risk), the loss distribution retains a fat tail driven by the common factor, regardless of how many independent-seeming small loans make up the pool. Credit VaR would be much closer to a high-correlation scenario than the near-riskless \\(\\rho =0\\) granular case." }
  ],

  hooks: [
    { title: "One credit in disguise", text: "At \\(\\rho =1\\), a thousand loans are secretly one loan wearing a thousand costumes — they all default together or not at all." },
    { title: "The dial that granularity can't turn", text: "Granularity is a volume knob for idiosyncratic noise — turn it down by adding more loans. But it's not connected to the SYSTEMATIC risk dial at all; that one only turns with correlation." },
    { title: "The shared weather", text: "Think of m as the shared weather everyone's asset return partially depends on. Once you know the weather (m), each firm's remaining fate \\((\\varepsilon_i)\\) is its own private business, independent of everyone else's." }
  ],

  eli5: `<p>Imagine a village of 100 wooden houses. Each house has its own risk of catching fire from bad wiring — that's pure bad luck specific to that one house (its "idiosyncratic" risk). But the whole village also sits on one earthquake fault line, and if a big quake hits, EVERY house is damaged at once — that's the "systematic," shared risk. If you're an insurer covering all 100 houses, adding more houses does nothing to protect you against the earthquake (they're all on the same fault line, so more houses just means more simultaneous damage), but it protects you a LOT against fire, because with 100 independent fire risks, you can predict pretty confidently that only a handful will burn in any given year, and the rest of your premiums cover the payout. In finance terms: the fault line is the shared "market factor" m that every firm's asset return depends on through its \\(\\beta\\), the fire risk is each firm's independent idiosyncratic shock \\(\\varepsilon_i\\), and "adding more houses" is the granularity effect — it kills fire (idiosyncratic) risk but is powerless against the earthquake (systematic, correlation-driven) risk.</p>`,

  thinkLike: `<p>A credit portfolio manager doesn't ask "what's my expected loss?" nearly as often as they ask "what's my TAIL risk, and where is it actually coming from?" Two portfolios can have identical expected loss but wildly different Credit VaR purely because of how correlated the underlying defaults are — so the practitioner's first move on any new portfolio is to separate the loss variance into its systematic share (driven by shared exposure to \\(m\\), controlled by each name's \\(\\beta\\)) and its idiosyncratic share (diversifiable by adding more, smaller, less-correlated names). Diversification (granularity) is a real risk-reduction lever, but only against the idiosyncratic share — no amount of adding more loans to a portfolio of, say, regional subprime mortgage originators fixes the fact that they're all exposed to the same housing-market factor.</p>
  <p>On the exam, this reading is tested two ways: (1) plug-and-chug numeric problems at the correlation extremes (\\(\\rho=1\\) or \\(\\rho=0\\) with a given n, PD, and notional — computing EL, the loss quantile, and Credit VaR as their difference), and (2) conceptual traps built around the granularity-vs-correlation distinction and the "conditioning reduces variance" property of the single-factor model. When you see "more loans" in an answer choice, ask yourself "more loans reduces WHICH kind of risk?" before picking it.</p>`,

  breakdown: [
    {
      title: "Risks to weigh when analyzing a credit portfolio",
      points: [
        "Default probability (PD) — the chance each obligor fails to pay.",
        "Loss given default (LGD) — how much is actually lost once a default happens (1 − recovery rate).",
        "Probability of deteriorating credit ratings — migration/downgrade risk short of outright default.",
        "Spread risk — mark-to-market loss from widening credit spreads even without a rating change.",
        "Restructuring/bankruptcy loss risk — losses from the legal workout process itself (timing, recovery uncertainty)."
      ]
    },
    {
      title: "Drawbacks of the default-correlation credit portfolio framework",
      points: [
        "Combinatorial explosion — 2ⁿ possible outcome events and n(n−1)/2 pairwise correlations to estimate; 10 firms already means 1,024 outcomes and 45 pairwise correlations.",
        "Poor fit for option-like credit exposures — guarantees, revolving credit facilities, convertible bonds, and CDS basis trades all have payoffs that don't reduce cleanly to a binary default/no-default correlation structure.",
        "Sparse, noisy data — firm defaults are rare events, so correlation estimates vary widely by time period and industry; practitioners commonly fall back on a single assumed correlation of roughly 0.05."
      ]
    },
    {
      title: "Three implications of conditioning the single-factor model on a realized market value",
      points: [
        "Conditional PD moves away from unconditional PD whenever β or the realized market value is nonzero — a weak (negative) market realization means a smaller idiosyncratic shock is now enough to trigger default.",
        "Conditional standard deviation (√(1−β²)) is strictly less than the unconditional standard deviation of 1 — conditioning on the common factor resolves exactly the systematic share of the uncertainty.",
        "Conditional asset returns and idiosyncratic shocks stay independent across different firms — this is the conditional-independence property that makes the whole model tractable."
      ]
    },
    {
      title: "Credit VaR by simulation — the copula method",
      points: [
        "Step 1: Define the copula function — usually the normal (Gaussian) copula.",
        "Step 2: Simulate default times for every credit in the portfolio using that copula.",
        "Step 3: Obtain market values and profit-and-loss for each simulated scenario, using the simulated default times.",
        "Step 4: Aggregate the simulated terminal values into a full loss distribution and read off the desired VaR quantile."
      ]
    }
  ],

  quiz: [
    {
      q: "A portfolio holds a BBB+ credit (PD π₁ = 0.002) and a BBB credit (PD π₂ = 0.003), with joint default probability π₁₂ = 0.00015. What is the default correlation between the two credits?",
      options: ["≈ 0.059", "≈ 0.144", "≈ 0.015", "≈ 0.002"],
      answer: 0,
      why: "Covariance = 0.00015 − (0.002)(0.003) = 0.000144. Each SD is √[π(1−π)]: SD₁≈0.04468, SD₂≈0.05469. Dividing covariance by the product of the SDs gives ≈0.059. The 0.144 distractor is the covariance left un-normalized by the standard deviations — a common shortcut error that forgets the denominator entirely."
    },
    {
      q: "Using the default-correlation framework, how many unique outcome events exist for a credit portfolio with 8 different firms?",
      options: ["10", "56", "256", "517"],
      answer: 2,
      why: "Each firm independently either defaults or doesn't, so there are 2⁸ = 256 possible outcome combinations. 56 is the number of pairwise correlations you'd need to estimate for a larger n, not the outcome count for n=8; it's a plausible mix-up between 'events' and 'correlations to estimate'."
    },
    {
      q: "A $1,000,000 portfolio with 20 credits, each with PD=2% and RR=0%, has default correlation equal to 1 (all credits are effectively one obligor). What is the Credit VaR at the 99% confidence level?",
      options: ["$0", "$1,000", "$20,000", "$980,000"],
      answer: 3,
      why: "At ρ=1 the portfolio acts as one credit: 98% chance of $0 loss, 2% chance of total $1,000,000 loss, so EL = $20,000. Because PD (2%) exceeds (1−0.99)=1%, the 99% loss quantile is the full $1,000,000, so Credit VaR = $1,000,000 − $20,000 = $980,000. $20,000 is just the expected loss itself, not the VaR — a common mix-up between EL and the quantile-minus-EL definition of Credit VaR."
    },
    {
      q: "A risk manager claims: 'Adding more, smaller loans to any credit portfolio always lowers Credit VaR, regardless of the pairwise default correlation.' Is this correct?",
      options: [
        "Yes — granularity always reduces Credit VaR by the law of large numbers",
        "No — granularity only reduces idiosyncratic risk; with high pairwise default correlation, systematic risk remains and Credit VaR stays large",
        "No — granularity increases Credit VaR because it adds more names that can default",
        "Yes, but only if the recovery rate is zero"
      ],
      answer: 1,
      why: "Granularity dilutes idiosyncratic (firm-specific) risk via the law of large numbers, but it does nothing to the systematic risk driven by shared correlation to the common market factor. A large, granular, but highly-correlated portfolio can still carry substantial Credit VaR. The 'granularity always reduces Credit VaR regardless of correlation' answer is the classic trap this reading is built to test against."
    },
    {
      q: "In the single-factor model, once a specific market value m̄ is realized, what are the mean and standard deviation of firm i's conditional asset-return distribution?",
      options: [
        "Mean 0, standard deviation 1 (unchanged from the unconditional distribution)",
        "Mean β_i·m̄, standard deviation √(1−β_i²)",
        "Mean m̄, standard deviation β_i",
        "Mean β_i·m̄, standard deviation 1"
      ],
      answer: 1,
      why: "Conditioning on m=m̄ fixes the β_i·m̄ term, leaving only the idiosyncratic term √(1−β_i²)·ε_i as the remaining source of randomness — so the conditional distribution is Normal(β_i·m̄, √(1−β_i²)). The 'mean β_i·m̄, standard deviation 1' answer is the tempting-but-wrong choice of keeping the unconditional SD of 1 while still shifting the mean — conditioning must shrink the SD too, since it removes the systematic share of the variance."
    },
    {
      q: "A credit position has correlation β=0.5 to the market factor. What is the realized market value used to compute the probability of reaching the default threshold at the 99% confidence level (z = −2.33)?",
      options: ["−0.2500", "−0.4356", "−0.5825", "−0.6243"],
      answer: 3,
      why: "Using m̄ = (k − √(1−β²)·z)/β with k=z=−2.33 and β=0.5: √(1−0.25)=0.8660, so m̄ = (−2.33 − 0.8660×(−2.33))/0.5 = (−2.33+2.0178)/0.5 = −0.6243. −0.2500 is simply −β misapplied as the answer, ignoring the conditioning relationship entirely."
    }
  ],

  sources: [
    { title: "Gaussian copula", url: "https://en.wikipedia.org/wiki/Copula_(statistics)", note: "Background on the copula functions (normal/Gaussian copula) used to simulate correlated default times in the Credit VaR simulation method." },
    { title: "Vasicek model", url: "https://en.wikipedia.org/wiki/Vasicek_model", note: "The original single-factor asset-value model that this reading's a_i = β_i·m + √(1−β_i²)·ε_i equation generalizes; useful for seeing the same math in R26's notation." },
    { title: "Value at Risk (VaR)", url: "https://www.investopedia.com/terms/v/var.asp", note: "General VaR concept refresher — Credit VaR in this reading applies the same quantile-of-loss-distribution idea specifically to default losses." },
    { title: "An Explanatory Note on the Basel II IRB Risk Weight Functions", url: "https://www.bis.org/bcbs/irbriskweight.pdf", note: "The Basel Committee's own derivation of the single-factor (Vasicek-style) portfolio credit risk model that underlies regulatory capital formulas." }
  ],

  pdf: { book: 2, query: "Default correlation measures the probability of multiple defaults" },

  summary: `<p><strong>Default correlation</strong> (two-firm): \\(\\rho_{12}=(\\pi_{12}- \\pi_{1}\\pi_{2})/\\sqrt{\\pi_{1}(1- \\pi_{1})\\pi_{2}(1- \\pi_{2})}\\) — explodes combinatorially for n firms. <strong>Correlation extremes</strong>: \\(\\rho =1\\) → portfolio acts like ONE credit (binary VaR); \\(\\rho =0\\) + large n → binomial, granularity shrinks VaR via the law of large numbers (weaker at very low PD). <strong>Single-factor model</strong>: \\(a_i=\\beta_im+\\sqrt{1- \\beta_i^{2}}\\varepsilon_{i}\\), default if a_i≤k_i — conditional independence given m is the key property, conditional \\(SD=\\sqrt{1- \\beta_i^{2}}\\)<1. <strong>Credit VaR by simulation</strong>: define copula → simulate default times → portfolio P&L → aggregate to loss distribution. Granularity reduces IDIOSYNCRATIC risk only — systematic (correlation) risk survives no matter how many loans you add.</p>`
});
