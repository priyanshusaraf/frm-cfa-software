export default ({
  book: 2, reading: 26,
  session: "Credit Risk Estimation",
  title: "Credit Value at Risk",
  tagline: "The market-risk-VaR question ('how bad can losses get at confidence X?') for credit losses — with genuinely different mechanics: 1-year horizon, lumpy rare losses, heavier modeling machinery.",

  teaches: `<p>Market VaR vs Credit VaR contrasts; rating transition matrix multi-period math; a survey of the four main modeling families that fight it out across the rest of the book: Vasicek's Gaussian copula (also the Basel IRB engine), CreditRisk+, CreditMetrics, and the correlation model.</p>
  <p>Concretely, by the end of this reading you should be able to: (1) state why a bank cannot reuse its market-risk VaR machinery for credit losses and what horizon/tool it swaps in instead; (2) take a one-year rating transition matrix (the kind S&amp;P and Moody's publish every year, built from decades of actual corporate rating histories) and raise it to a power, or take a fractional root, to answer "what's the chance this BBB name is still BBB in 4 years?" or "in 3 months?"; (3) plug numbers into Vasicek's worst-case default rate (WCDR) formula — the exact formula, under a different label, that underlies Basel II/III's Internal Ratings-Based (IRB) capital charge (see R21); (4) describe, in words a risk committee would understand, what CreditRisk+, CreditMetrics, and the Gaussian-copula correlation model each assume and what each one is blind to; and (5) explain why a bank that lets downgraded bonds "ride" (buy-and-hold) carries more credit VaR than one that continually replaces them with fresh, same-rated paper (constant-level-of-risk).</p>`,

  why: `<p>Credit losses are lumpy (defaults are discrete, rare events) and slow (1-year horizon, not 1-day) — so the smooth, high-frequency historical simulation approach from market risk (Book 1) doesn't work here. A trading desk's P&amp;L moves a little bit every single day, generating thousands of data points a bank can just look up in its own history. A loan portfolio's losses, by contrast, sit at zero for years and then, occasionally, a borrower defaults and a chunk of the exposure disappears in one lump. You cannot build a smooth histogram out of rare lumps — you need an actual mathematical model of how defaults arise and how correlated they are with each other. This reading surveys the specialized machinery built specifically for credit's different statistical texture, and it matters because these are the literal formulas regulators and risk committees use to size regulatory capital, economic capital, and portfolio limits.</p>`,

  intuition: `<p>Market VaR asks "what did daily P&amp;L actually do over the last 1,000 days?" — plenty of data, smooth distribution, just read the answer off history. Credit VaR asks "what could a whole YEAR of defaults look like?" — defaults are rare, so you can't just look at history (a bank might see zero defaults in a given book for years and then several at once); you need a MODEL of how correlated defaults arise. Think of it as the difference between predicting tomorrow's weather from a century of daily temperature readings (market VaR — you have the data) versus estimating the odds of a once-a-decade flood from a handful of historical floods plus a physical model of rainfall and river capacity (credit VaR — you need theory to fill the gaps data can't).</p>
  <p>The four families differ in exactly what they capture. Vasicek and CreditRisk+ only ask a binary question per borrower — <em>did it default, yes or no?</em> — and ignore everything short of default. CreditMetrics asks a richer question — <em>what is this borrower's credit rating at year-end?</em> — captured via full Monte Carlo simulation over a rating transition matrix, so it picks up both defaults AND downgrades (a AA bond slipping to BBB loses value even though it never defaults, because the market now demands a wider credit spread to hold it). The correlation model is the plumbing underneath: it links different firms' rating changes together using a Gaussian copula, the same statistical device used across R27 (portfolio credit risk), R29 (CVA) and R30 (CDO tranches) — so getting comfortable with it here pays off four more times.</p>`,

  eli5: `<p>Imagine you run a small taxi fleet. Market VaR is like tracking daily fuel costs — they wiggle a little every day, and after a year of data you have a smooth, reliable picture of how bad a single day's fuel bill could get. Credit VaR is like asking "how many of my 50 taxis will be totaled in a crash this year?" You don't have a smooth daily signal for that — crashes are rare and lumpy, so instead of reading history off a chart, you build a model: how likely is any one taxi to crash (like a probability of default), do crashes cluster (if it's an icy winter, many taxis crash together — like credit correlation), and do "near-miss" fender-benders that just dent the car but don't total it also cost you money (like a rating downgrade that isn't a full default)? Vasicek and CreditRisk+ only count total losses (defaults); CreditMetrics also counts the fender-benders (downgrades). Mapped back to finance: the taxi fleet is a loan/bond portfolio, "totaled" is default, "fender-bender" is a rating downgrade that still hurts the bond's mark-to-market value, and "icy winter" is the shared macro factor that drives credit correlation.</p>`,

  thinkLike: `<p>A credit portfolio risk manager doesn't ask "which model is right?" — she asks "which loss channel do I actually need to capture, and how much data do I have to calibrate it?" If she only cares about whether names default (e.g., sizing loan-loss reserves or IRB regulatory capital), Vasicek's single formula or CreditRisk+'s light-data approach is enough, and Vasicek in particular gets picked automatically the moment the conversation turns to Basel capital, because it IS the Basel IRB formula. If she manages a mark-to-market bond or CDS book where a downgrade — not just a default — moves P&amp;L, she needs CreditMetrics's full rating-transition Monte Carlo, even though it costs more compute and requires the credit-spread term structure for every rating bucket. The correlation model is the shared plumbing she reaches for whenever she needs to link one firm's rating change to another's, using each firm's observable equity return correlation as the proxy for their unobservable credit correlation.</p>
  <p>On the exam, this reading is tested less by "derive it from scratch" and more by "match the tool to the stated need": expect a scenario stem ("the analyst cares about downgrade risk, not just default risk — which model?") followed by four model names as distractors, a WCDR plug-in-the-numbers calculation, a rating-matrix power/root calculation, and a directional question about buy-and-hold vs. constant-level-of-risk. Get comfortable that Vasicek's ρ is not a made-up parameter — it is explicitly proxied by the observed correlation between firms' returns on assets (ROA) or returns on equity (ROE), which the exam will hand you directly as a given number.</p>`,

  visual: `<div class="widget" data-widget="creditvar"></div>`,

  breakdown: [
    {
      title: "Market VaR vs. Credit VaR — the two axes that differ",
      points: [
        "Time horizon: Market VaR uses a 1-day horizon (a trading book can be rebalanced or hedged daily); Credit VaR uses a 1-year horizon (credit exposures and ratings don't turn over that fast).",
        "Main tool: Market VaR relies on historical simulation (plenty of daily P&L data to draw the distribution from); Credit VaR needs elaborate models — transition matrices, Vasicek/CreditRisk+/CreditMetrics, copulas — because rare, lumpy default events don't give you a usable empirical distribution.",
        "What drives the size of the loss: Market VaR is driven by day-to-day price/rate volatility; Credit VaR is driven by default probability, loss given default, and — critically — credit correlation (how much defaults cluster together, e.g. in a recession)."
      ]
    },
    {
      title: "The four Credit VaR modeling families",
      points: [
        "Vasicek's Gaussian copula model (also the Basel IRB engine): outputs WCDR(T,X), the worst-case default rate at confidence X over horizon T for a large, granular portfolio; captures defaults only; ρ is proxied by ROA/ROE correlation; no tail correlation (assumes ρ is constant, which understates how violently real defaults cluster in a crisis).",
        "CreditRisk+ (Credit Suisse, 1997): starts from an independent-default binomial, approximates it with a Poisson for the realistic case of small PD and many loans, then — because the true default rate itself is uncertain and can be modeled as following a gamma distribution — upgrades the Poisson to a negative binomial; captures defaults only; needs the least data of the four, since it ignores credit ratings and capital structure entirely and just tracks bankrupt/non-bankrupt outcomes.",
        "CreditMetrics (JPMorgan): the only one of the three loss models that captures both defaults AND downgrades, via full Monte Carlo simulation over a rating transition matrix — each simulated trial gives every counterparty a year-end rating, and loss is EAD × LGD if that rating is default, or a mark-to-market change (using the credit-spread term structure for the new rating) if it isn't.",
        "The correlation (Gaussian copula) model: the plumbing linking different firms' simulated rating changes so they aren't drawn independently — copula correlation is set equal to the firms' observed equity return correlation; this is the direct bridge to the single-factor model built from scratch in R27 and reused in R29's CVA and R30's CDO tranche pricing."
      ]
    },
    {
      title: "Rating transition matrix — multi-period math (3 rules)",
      points: [
        "Longer than 1 year: raise the 1-year matrix to the Nth power (matrix multiplication in general; for a single diagonal 'stay-the-same-rating' entry, just raise that probability to the Nth power). Example from the source: a AAA firm's one-year 'stay AAA' probability of 89.85% becomes 0.8985³ = 72.54% over three years.",
        "Shorter than 1 year: take the fractional root. Example: that same 89.85% one-year probability becomes a 3-month probability of 0.8985^(1/4) = 97.36% (3 months = one-fourth of a year, so take the 4th root).",
        "Direction of the effect: longer horizons lower the odds of keeping the same rating (more time for something to happen); shorter horizons raise those odds (less time for anything to happen).",
        "The catch: this matrix-power approach assumes each period's transition is statistically independent of the last one. Real credit exhibits rating momentum — a firm just downgraded is more likely to be downgraded again — so the matrix-power math is a tested simplification, not a description of reality."
      ]
    },
    {
      title: "Rebalancing strategy and Credit VaR — 2 strategies compared",
      points: [
        "Constant level of risk: whenever a held bond's rating changes (e.g., it's downgraded off AA), sell it and replace it with a fresh, current-rated bond (e.g., a new AA-rated issue) — the portfolio's target rating profile is continually restored.",
        "Buy-and-hold: keep the original bond for the full holding period regardless of what happens to its rating, absorbing the full downgrade or default loss before eventually selling.",
        "Result: buy-and-hold produces a LARGER Credit VaR than constant level of risk, because it fully absorbs big downgrade/default losses instead of continuously refreshing the portfolio back to its target credit quality."
      ]
    }
  ],

  formulas: [
    {
      name: "Vasicek worst-case default rate (WCDR)",
      math: "\\text{WCDR}(T,X) = N\\!\\left[\\dfrac{N^{-1}(PD) + \\sqrt{\\rho}\\cdot N^{-1}(X)}{\\sqrt{1-\\rho}}\\right]",
      plain: "This says: over horizon T, the worst default rate you'd expect at confidence level X — i.e., the default rate so bad it's only exceeded (1−X)% of the time — is a function of the average one-year probability of default (PD), the credit correlation (ρ) between borrowers, and how extreme a percentile X you're asking about.",
      derivation: `<p>Vasicek's model comes from a single-factor version of the Merton structural-default idea (built out fully in R27). Each borrower <em>i</em>'s standardized asset return is split into a common (systematic) factor \\(M\\) — think "the state of the economy" — and an idiosyncratic, firm-specific shock \\(Z_i\\):</p>
      <p style="text-align:center">\\(R_i = \\sqrt{\\rho}\\,M + \\sqrt{1-\\rho}\\,Z_i\\)</p>
      <p>where \\(M\\) and each \\(Z_i\\) are independent standard normals, and \\(\\rho\\) is the share of a borrower's return variance driven by the common factor — this IS the credit correlation. A borrower defaults when its asset return falls below a threshold calibrated so the unconditional default probability equals its known PD, i.e., when \\(R_i < N^{-1}(PD)\\).</p>
      <p>Conditional on a particular draw of the systematic factor \\(M = m\\), the probability that borrower <em>i</em> defaults becomes \\(N\\!\\left[\\dfrac{N^{-1}(PD) - \\sqrt{\\rho}\\,m}{\\sqrt{1-\\rho}}\\right]\\). For a large, well-diversified portfolio, the law of large numbers means the realized default rate converges to exactly this conditional probability — all the idiosyncratic \\(Z_i\\) noise washes out, leaving only the systematic factor \\(M\\) as the source of portfolio-wide uncertainty. To get the default rate that is only exceeded \\((1-X)\\%\\) of the time, you plug in the "bad" \\(X\\)-th percentile of \\(M\\), which is \\(-N^{-1}(X)\\) (a large negative draw of the economy factor). Substituting \\(m = -N^{-1}(X)\\) and flipping the sign convention gives exactly the WCDR formula above.</p>`,
      note: "\\(\\rho\\) (credit correlation) proxied by ROA/ROE correlation. This is also the Basel IRB capital engine (R21)."
    },
    {
      name: "Loss at the Xth percentile (large, granular portfolio)",
      math: "L(X) = \\text{EAD} \\times \\text{LGD} \\times \\text{WCDR}(T,X)",
      plain: "This says: once you know the worst-case default rate at confidence X, the dollar loss at that same confidence level is just that rate multiplied by exposure at default and loss given default — the same EAD × LGD building block used for expected loss (R25), just applied to the stress-case default rate instead of the average one.",
      note: "For an individual loan, WCDR(T,X) is computed loan-by-loan and multiplied by that loan's own EAD and LGD; for a large portfolio of many small, similarly-structured loans this same formula approximates the whole portfolio's Xth-percentile loss."
    }
  ],

  concepts: [
    {
      name: "Market VaR vs Credit VaR",
      def: "Market VaR: 1-day horizon, historical simulation. Credit VaR: 1-year horizon, elaborate models (transition matrices, copulas).",
      intuition: "A trading desk marks its book every day, so it has thousands of daily P&L observations to build a distribution from directly. A credit portfolio doesn't turn over that fast, and defaults are rare, so there's no dense daily history of 'credit P&L' to read a distribution off of — you must build a model of how correlated defaults arise instead.",
      pitfall: "Don't apply market-risk intuitions (daily rebalancing, smooth distributions) to credit VaR — the underlying loss process is fundamentally lumpier and rarer.",
      related: [{ r: 1, label: "R1 — the market VaR machinery this contrasts with" }]
    },
    {
      name: "Rating transition matrices — multi-period math",
      def: "Extend a 1-year matrix to N years by raising it to the N-th power; for periods under 1 year, take the fractional root (e.g., 3 months = 4th root of the 1-year probability).",
      example: "A one-year 89.85% chance an AAA firm stays AAA becomes 0.8985³ = 72.54% over three years, or 0.8985^(1/4) = 97.36% over three months. Likewise, a BBB firm with a 91.93% one-year stay-put probability has a 0.9193⁴ = 71.42% chance of still being BBB after four years.",
      pitfall: "This assumes independence across periods, but RATING MOMENTUM (a recent downgrade raises the odds of another) violates that assumption in reality — the matrix math is a simplification, not a physical law.",
      related: ["Vasicek's Gaussian copula model"],
      memory: "Longer horizon → lower odds of keeping the same rating; shorter horizon → higher odds of staying put."
    },
    {
      name: "Vasicek's Gaussian copula model (Basel IRB engine)",
      def: "WCDR(T,X) = \\(N[(N^{-1}(PD)\\) + \\(\\sqrt{\\rho }\\cdot N^{-1}(X))/\\sqrt{1- \\rho }]\\). \\(\\rho\\) (credit correlation) proxied by correlation between firms' ROA/ROE.",
      example: "If Company A has an ROE of 8% and Company B has an ROE of 6%, with an average correlation of 0.24 between the two, the ρ plugged into Vasicek's model is simply 0.24 — the model reads credit correlation straight off observable equity-return correlation instead of trying to estimate it separately.",
      pitfall: "Limitation: NO tail correlation — correlation is assumed constant, but real defaults cluster more violently in the tail than a \\(constant-\\rho\\) model predicts.",
      related: [{ r: 21, label: "R21 — the identical formula underlying the IRB capital charge" }, { r: 3, label: "R3 — the tail-dependence problem this constant-ρ assumption misses" }],
      memory: "This IS the Basel IRB formula — memorize once, recognize everywhere."
    },
    {
      name: "CreditRisk+ (Credit Suisse)",
      def: "Independent-default binomial → Poisson approximation (small PD, many loans) → if the expected number of defaults follows a gamma distribution, Poisson becomes negative binomial.",
      intuition: "CreditRisk+ deliberately throws away information other models use (credit ratings, capital structure) and only tracks whether a firm is bankrupt or not. That's a real cost — it can't tell you about migration risk — but it's also the model's biggest selling point: it needs the least data of any of the four families, since all it wants is a default probability and a loan count, not a full rating history or balance sheet.",
      pitfall: "As uncertainty \\((\\sigma )\\) about the default rate rises, the chance of many simultaneous defaults rises and the loss distribution becomes positively skewed (vs. symmetric under low/no correlation).",
      related: ["CreditMetrics"]
    },
    {
      name: "CreditMetrics (JPMorgan)",
      def: "Unlike Vasicek/CreditRisk+, captures BOTH defaults and downgrades via Monte Carlo simulation over a rating transition matrix. Each trial: simulate year-end rating → if default, loss = EAD×LGD; if no default, loss = mark-to-market change using the credit-spread term structure for the new rating.",
      example: "Take a 3-year zero-coupon bond, face value $1,000, risk-free rate 2.5%, current credit spread 150bp — priced today at $1,000/(1.04)³ ≈ $889 (using the risk-free rate plus spread as the discount rate). It's rated BBB. One month from now, the possible outcomes are: upgrade to A (1.0% probability, spreads of 70/90/110bp equally likely), stay BBB (97.6% probability, spreads of 120/150/180bp), downgrade to BB (1.3% probability, spreads of 300/350/400bp), or default (0.1% probability, bond worth $300 if it happens). Each scenario's bond value is recomputed by discounting the remaining ~2.917 years of cash flow at the new spread; when the full distribution of these outcomes is built, the resulting credit VaR is $589.00 at a confidence level above 99.9%, or $56.81 between 99.9% and 99.467% confidence — illustrating exactly how the model turns 'what rating will this bond have next month' into a dollar loss distribution.",
      pitfall: "Vasicek and CreditRisk+ capture defaults ONLY; CreditMetrics captures defaults AND downgrades. When a question asks 'which model would you use if you also care about migration risk, not just default,' the answer is CreditMetrics.",
      related: [{ r: 21, label: "R21 — CreditMetrics introduced conceptually" }],
      memory: "CreditMetrics is the only one of the three that cares whether you got downgraded, not just whether you defaulted."
    },
    {
      name: "Correlation model & rebalancing strategy",
      def: "Rating changes for different firms are linked via a Gaussian copula, with copula correlation set equal to firms' equity return correlation — a direct bridge to R27's and R29's single-factor/copula machinery.",
      example: "Constant level of risk (sell downgraded bonds, replace with same-rated new ones) produces SMALLER credit VaR than buy-and-hold (ride out the downgrade), because buy-and-hold fully absorbs big downgrade/default losses instead of continuously refreshing back to target rating. Mechanically, if two firms' rating changes have a 0.2 correlation, you draw two correlated standard-normal variables (x_A, x_B) with that correlation — if x_A falls below a threshold like −3.3416, firm A is deemed upgraded to AAA; if it falls between −3.3416 and −2.1201, it's upgraded to AA; and so on down the transition-matrix cutoffs, so the two firms' simulated ratings move together exactly as correlated as their equity returns do.",
      related: [{ r: 27, label: "R27 — the single-factor model this bridges to" }]
    }
  ],

  connections: {
    from: [
      { r: 25, why: "Every PD estimate produced there becomes an input into these portfolio-level credit loss models." },
      { r: 1, why: "The market VaR framework this reading explicitly contrasts against." }
    ],
    to: [
      { r: 27, why: "The single-factor model gets built from scratch, generalizing Vasicek's formula here." },
      { r: 21, why: "Vasicek's WCDR formula IS the IRB capital charge formula, just with different labels." }
    ],
    confused: [
      { what: "Vasicek/CreditRisk+ (default only) vs CreditMetrics (default + downgrade)", how: "If a question cares about migration/downgrade risk specifically, only CreditMetrics captures it; the others treat everything short of default as a non-event." },
      { what: "Constant-level-of-risk vs buy-and-hold rebalancing", how: "Constant-level-of-risk continuously refreshes the portfolio back to target rating (smaller VaR); buy-and-hold absorbs the full downgrade/default hit (larger VaR)." }
    ]
  },

  misconceptions: [
    { wrong: "\"CreditRisk+ and CreditMetrics capture the same risks.\"", right: "CreditRisk+ (like Vasicek) captures DEFAULTS ONLY. CreditMetrics uniquely captures BOTH defaults and downgrades via full rating-transition Monte Carlo simulation." },
    { wrong: "\"Rating transition matrices accurately capture real-world default dynamics over multiple periods.\"", right: "The matrix-power approach assumes independence across periods, but rating momentum (a downgrade raises the odds of another) violates this — a known, tested simplification." },
    { wrong: "\"A buy-and-hold credit strategy has lower Credit VaR than continuously rebalancing to target rating.\"", right: "The opposite — buy-and-hold has HIGHER Credit VaR because it fully absorbs downgrade/default losses; constant-level-of-risk rebalancing sells downgraded bonds and replaces them, producing smaller VaR." },
    { wrong: "\"Credit correlation (ρ) in Vasicek's model has to be estimated from a complicated default-history dataset.\"", right: "It's proxied directly by something observable and simple: the correlation between the borrowers' returns on assets (ROA) or returns on equity (ROE) — for private firms, the average correlation among similar publicly traded peers is used instead." }
  ],

  highYield: [
    { stars: 5, what: "Vasicek WCDR formula — identical to the R21 IRB capital charge, just relabeled.", why: "One formula, two reading numbers — a guaranteed 'don't study twice' efficiency point." },
    { stars: 4, what: "Which models capture default-only vs. default+downgrade (Vasicek/CreditRisk+ vs. CreditMetrics).", why: "The single most heavily tested distinction in this reading." },
    { stars: 3, what: "Constant-level-of-risk vs. buy-and-hold Credit VaR comparison.", why: "A clean directional fact with intuitive reasoning behind it." },
    { stars: 3, what: "Rating momentum violating the independence assumption behind matrix-power math.", why: "A conceptual caveat frequently tested as 'what assumption does this method violate.'" },
    { stars: 3, what: "ρ in Vasicek's model is proxied by ROA/ROE correlation, handed to you directly as a given number.", why: "Exam questions frequently just ask you to read a stated correlation off the stem and plug it straight into ρ — recognizing this shortcut saves time." }
  ],

  recall: [
    { q: "A risk manager wants a model that captures losses from BOTH downgrades and outright defaults. Which of the three named models should they use, and why?", a: "CreditMetrics — it uniquely simulates the full rating transition (not just default/no-default) via Monte Carlo, marking to market using the credit-spread term structure appropriate to whatever new rating each simulated path lands on. Vasicek and CreditRisk+ only model the binary default/no-default outcome." },
    { q: "Why does a buy-and-hold credit strategy produce higher Credit VaR than a constant-level-of-risk strategy?", a: "Buy-and-hold rides out downgrades and absorbs the full mark-to-market or default loss from deteriorating credits. Constant-level-of-risk continuously sells downgraded names and replaces them with fresh, same-rated bonds, effectively refreshing the portfolio's risk profile and avoiding the full accumulated loss from any single name's deterioration." },
    { q: "What key real-world phenomenon does the rating-transition-matrix-to-the-Nth-power approach fail to capture, and why does it matter?", a: "Rating momentum — the empirical fact that a recent downgrade raises the probability of a further downgrade. The matrix-power approach assumes each period's transition is independent of prior transitions, understating the true risk of a credit that's already begun deteriorating." },
    { q: "A firm has a one-year 89.85% probability of keeping its AAA rating. What's its approximate probability of still being AAA in three years, and what assumption does this calculation rely on?", a: "0.8985³ ≈ 72.54%. It relies on the assumption that each year's rating transition is independent of the prior year's — an assumption violated by rating momentum in reality." }
  ],

  hooks: [
    { title: "One formula, two names", text: "Vasicek's WCDR and the Basel IRB capital charge (R21) are the SAME equation. Learn it once here, recognize it forever." },
    { title: "Two questions credit models ask", text: "'Did it default?' (Vasicek, CreditRisk+) vs. 'What's its rating NOW?' (CreditMetrics) — the second question is strictly richer, capturing downgrade pain the first ignores entirely." }
  ],

  quiz: [
    {
      q: "What is the primary difference between market risk VaR and credit risk VaR?",
      options: [
        "Market VaR uses a 1-year horizon and historical simulation; credit VaR uses a 1-day horizon and copula models",
        "Market VaR uses a 1-day horizon and historical simulation; credit VaR uses a 1-year horizon and more elaborate models",
        "Both use a 1-day horizon, but credit VaR requires Monte Carlo simulation",
        "Both use a 1-year horizon, but market VaR requires more elaborate modeling tools"
      ],
      answer: 1,
      why: "Market VaR is calculated over 1 day using historical simulation (plenty of daily data); credit VaR uses a 1-year horizon because credit losses are lumpy and rare, requiring transition matrices, copulas, and other elaborate models rather than a simple historical read of daily P&L. Swapping the horizons — the 'market VaR is 1-year and copula-based, credit VaR is 1-day historical sim' answer — is the classic trap."
    },
    {
      q: "A company has a one-year 91.93% probability of keeping its BBB rating. What is the closest approximate probability it keeps that rating over a 4-year period?",
      options: ["36.77%", "67.72%", "71.42%", "95.97%"],
      answer: 2,
      why: "Raise the one-year probability to the 4th power: 0.9193⁴ ≈ 0.7142 = 71.42%. The 95.97% answer is the trap from mistakenly taking the 4th ROOT instead of the 4th power (confusing the sub-year fractional-root rule with the multi-year power rule). 36.77% is roughly what you'd get squaring twice incorrectly, and 67.72% is a plausible-looking but arithmetically wrong distractor."
    },
    {
      q: "Which of the following credit VaR models is designed to capture BOTH default risk and downgrade (migration) risk?",
      options: ["Vasicek's Gaussian copula model", "CreditRisk+", "CreditMetrics", "The binomial default model"],
      answer: 2,
      why: "CreditMetrics runs a Monte Carlo simulation over the full rating transition matrix, so every simulated trial produces a year-end rating (not just default/no-default), capturing mark-to-market losses from downgrades as well as EAD×LGD losses from outright default. Vasicek and CreditRisk+ are both default-only models — the most commonly tested trap in this reading."
    },
    {
      q: "In Vasicek's Gaussian copula model, the credit correlation parameter ρ is most appropriately proxied by:",
      options: [
        "The historical default correlation observed in a rating agency's transition matrix",
        "The correlation between the firms' returns on assets (ROA) or returns on equity (ROE)",
        "The correlation between the firms' credit default swap spreads",
        "An assumed value of 1.0 for firms in the same industry"
      ],
      answer: 1,
      why: "The model explicitly uses the correlation between firms' ROA or ROE as the proxy for otherwise-unobservable credit correlation (using similar publicly traded peers' correlation when a firm isn't public). The CDS-spread-correlation answer sounds plausible but isn't the mechanism the model uses; assuming ρ=1 is never a modeling default, just an extreme case used to build intuition about correlation's effect on Credit VaR."
    },
    {
      q: "Why does CreditRisk+ require less data than CreditMetrics?",
      options: [
        "Because CreditRisk+ uses only a 1-day time horizon",
        "Because CreditRisk+ ignores credit ratings and capital structure, tracking only default/no-default outcomes",
        "Because CreditRisk+ does not use a Poisson or negative binomial distribution",
        "Because CreditRisk+ requires the full credit-spread term structure for every rating"
      ],
      answer: 1,
      why: "CreditRisk+ deliberately throws away rating and capital-structure information, tracking only whether a firm is bankrupt or not — that's exactly why it needs less data than CreditMetrics, which needs a full rating transition matrix plus a credit-spread term structure for every rating bucket (the 'requires the full credit-spread term structure' answer describes CreditMetrics's requirement, not CreditRisk+'s, making it the tempting-but-backwards distractor)."
    },
    {
      q: "A bank chooses a constant-level-of-risk strategy (selling downgraded bonds and replacing them with fresh, same-rated bonds) instead of buy-and-hold. What is the effect on Credit VaR, and why?",
      options: [
        "Credit VaR is higher, because selling downgraded bonds locks in realized losses",
        "Credit VaR is unchanged, because rebalancing doesn't affect the loss distribution",
        "Credit VaR is lower, because the strategy avoids fully absorbing large downgrade/default losses by continuously refreshing the portfolio back to target rating",
        "Credit VaR is lower only if the correlation between borrowers is zero"
      ],
      answer: 2,
      why: "Constant-level-of-risk continuously restores the portfolio to its target rating profile, so it never rides out the full loss from a name that's deteriorated badly — producing a smaller Credit VaR than buy-and-hold, which absorbs the complete downgrade/default hit. The 'higher, because selling locks in realized losses' answer inverts the actual mechanism (selling locks in a small loss, not a large one), and the 'lower only if correlation is zero' answer introduces an irrelevant condition not in the source material."
    }
  ],

  sources: [
    { title: "Value at risk — Wikipedia", url: "https://en.wikipedia.org/wiki/Value_at_risk", note: "General VaR background, including the distinction between parametric/historical approaches used in market risk and the more model-driven approaches credit risk requires." },
    { title: "Vasicek model — Wikipedia", url: "https://en.wikipedia.org/wiki/Vasicek_model", note: "Background on Oldrich Vasicek's single-factor Gaussian copula framework and its adoption as the basis for Basel's IRB capital formula." },
    { title: "Basel II: Internal Ratings-Based Approach — Bank for International Settlements", url: "https://www.bis.org/publ/bcbsca.htm", note: "The regulatory source for the IRB capital formula that reuses Vasicek's WCDR equation under different notation — see R21 for the direct comparison." },
    { title: "CreditMetrics — Investopedia", url: "https://www.investopedia.com/terms/c/creditmetrics.asp", note: "Plain-language overview of JPMorgan's CreditMetrics methodology and its rating-migration Monte Carlo approach." }
  ],

  pdf: { book: 2, query: "Credit value at risk (VaR) represents the credit loss over a certain time horizon" },

  summary: `<p><strong>Market VaR</strong> (1-day, historical sim) vs <strong>Credit VaR</strong> (1-year, elaborate models — lumpy, rare losses). <strong>Migration matrices</strong>: raise to the Nth power for multi-year, fractional root for sub-year — assumes independence, violated by rating momentum. <strong>Vasicek's Gaussian copula</strong> (=Basel IRB engine): WCDR(T,\\(X)=N[(N^{-1}(PD)+\\sqrt{\\rho }\\cdot N^{-1}(X))/\\sqrt{1- \\rho }]\\) — no tail correlation captured (constant \\(\\rho )\\); ρ is read directly off ROA/ROE correlation. <strong>CreditRisk+</strong>: Poisson/negative-binomial, defaults only, needs least data. <strong>CreditMetrics</strong>: Monte Carlo over rating transitions, captures BOTH defaults AND downgrades (worked example: a 3-year BBB zero-coupon bond's credit VaR of $589 at >99.9% confidence) — the answer whenever migration risk matters. <strong>Rebalancing</strong>: constant-level-of-risk < buy-and-hold in Credit VaR.</p>`
});
