export default ({
  book: 2, reading: 29,
  session: "Credit Risk Estimation",
  title: "Credit Risk (in Derivatives)",
  tagline: "A bridge reading: recaps R25's default-probability toolkit, introduces CVA/DVA for the first time, and the Gaussian copula in its one-factor time-to-default form.",

  teaches: `<p>Hazard rate recap (unconditional vs. conditional PD), ISDA Master Agreement default mechanics, CVA/DVA first appearance, credit risk mitigants (netting), reduced-form vs. structural default correlation models, and the one-factor Gaussian copula for time-to-default.</p>
  <p>Concretely, by the end of this reading you should be able to: (1) read a cumulative default table (like Moody's) and convert an unconditional default probability into a conditional one; (2) explain, in plain terms, what happens to a derivatives portfolio's value once you admit either side might default (this is CVA and DVA); (3) work a netting example by hand; (4) say why a bank building a portfolio-level default-correlation model has to choose between two structurally different families of model (reduced-form vs. structural); and (5) plug numbers into the one-factor Gaussian copula formula to get a portfolio's worst-case default rate at a given confidence level, and recognize that this is literally the same formula as Vasicek's WCDR from R26.</p>`,

  why: `<p>If R37's CVA reading feels overwhelming later, it's because R29 rushes through the same ideas first — come back to this reading's CVA section as a running start. This reading also makes explicit the practical guidance on which PD (risk-neutral vs real-world) to use where.</p>
  <p>This reading matters beyond CVA too: it is the last stop before R30 prices actual credit derivatives (CDS spreads), and it is where the exam first tests you on <em>which family</em> of default-correlation model to reach for — a reduced-form model when you need speed and a link to the macro cycle, or a structural (Merton-style) model when the scenario demands very high joint-default correlation (e.g., stress testing a portfolio of firms in the same troubled industry). Getting this choice wrong is a classic distractor on exam questions phrased as "a risk manager wants to model X — which approach should she use?"</p>`,

  intuition: `<p>CVA answers "how much should I discount a derivative's value because my counterparty might not pay?" DVA is the mirror image — a BENEFIT to my own book value reflecting the (grim) fact that if I default, I don't have to pay either. Wrong-way risk (PD positively correlated with exposure — bad) and right-way risk (negatively correlated — good) determine whether this counterparty-risk adjustment gets worse or better as the trade itself moves in your favor.</p>
  <p>Walk through the mechanism slowly. Before anyone thinks about default, a derivative (say, an interest-rate swap) has a "no-default value," <em>f<sub>nd</sub></em> — the value you'd compute with ordinary discounted-cash-flow or option-pricing math, pretending both counterparties will pay every cash flow with certainty. Once you admit that either side <em>might</em> default, that no-default value has to be adjusted downward for the risk that the counterparty stiffs you (this downward adjustment is CVA, a cost) and upward for the twisted fact that your own potential default means you might stiff <em>them</em> (this upward adjustment is DVA, a benefit — accounting rules let a bank book its own worsening credit as a paper gain, which is exactly as strange as it sounds). Put together: <em>f = f<sub>nd</sub> − CVA + DVA</em>. Wrong-way risk makes this worse specifically because it means the counterparty is most likely to default exactly when your exposure to them is largest — the classic textbook case is a firm buying CDS protection on a bond issued by a company in the same troubled country or sector as the CDS seller, so the seller's ability to pay collapses at precisely the moment the buyer needs the payout most.</p>`,

  eli5: `<p>Imagine you lend your neighbor your lawnmower every weekend, and in exchange he lets you borrow his pressure washer whenever you need it — an informal, ongoing swap of favors with no cash changing hands up front. Now suppose your neighbor's job is shaky. You start factoring that risk into how much you value the arrangement: if he might not be around to lend you the pressure washer when you need it, the deal is worth a little less to you than it would be with a totally reliable neighbor — that shrinkage in value is exactly like CVA (a cost you book because <em>they</em> might not deliver). But flip it around: your own job is also a little shaky, and if you can't hold up your end (say you move away suddenly), you also get to skip out on lending the lawnmower a few more times than you otherwise would have — a small, grim "benefit" to you, which is exactly like DVA. If you also had four separate mini-arrangements with this neighbor — some favoring you, some favoring him — you wouldn't tally up only the ones that favor you; you'd net everything together to see who really owes whom, which is exactly what netting does with a derivatives book. <strong>Mapped to finance: CVA/DVA adjust a derivative's value for counterparty and own-default risk, and netting combines all trades with one counterparty into a single net exposure number instead of adding up only the positive ones.</strong></p>`,

  thinkLike: `<p>A derivatives desk risk manager does not think of CVA as an abstract accounting adjustment — she thinks of it as a real cost that has to be priced into every new trade, the same way a bond trader prices in a credit spread. Before booking a new swap with a counterparty, she asks: does this trade increase or decrease my correlation with everything else I already have on with this counterparty? If the new trade is positively correlated with the existing book (both tend to gain or lose value together), CVA <em>and</em> DVA both rise — the bank's exposure to the counterparty's default and the counterparty's exposure to the bank's default move in the same direction. If it's negatively correlated, both fall. She also keeps two separate mental buckets for probability of default: risk-neutral PDs (extracted from market prices like bond spreads or CDS spreads) for anything she's pricing or hedging, and real-world (historical) PDs for anything she's using to forecast actual future losses in a scenario analysis or stress test — mixing these two up is one of the most common ways to get a valuation wrong on this material.</p>
  <p>The exam tends to test this reading in three recurring shapes: (1) a numeric conditional-vs-unconditional-PD calculation using a cumulative default table, (2) a "does CVA/DVA go up or down" qualitative question built around correlation direction or wrong-way/right-way risk, and (3) a "which default-correlation model should you use" question that hinges entirely on the speed-vs-achievable-correlation tradeoff between reduced-form and structural models. Treat the one-factor Gaussian copula formula here as free points — it is byte-for-byte the same as Vasicek's WCDR formula from R26, so if you've already memorized one you've memorized both.</p>`,

  formulas: [
    { name: "Value including default risk", math: "f = f_{nd} - \\text{CVA} + \\text{DVA}", note: "f_nd = no-default value. CVA lowers value (cost); DVA raises it (benefit, since your own default relieves you of paying).", plain: "The realistic value of a derivative equals its idealized no-default value, minus what you lose in expectation if your counterparty defaults, plus the perverse benefit you get if you yourself default.", derivation: `<p>Start from the no-default value \\(f_{nd}\\), the value assuming every promised cash flow is paid with certainty. Admitting default risk on both sides splits that value into three pieces: the base value, a downward correction for the possibility the counterparty fails to pay you (this is exactly what CVA measures, defined as the present value of the expected cost to you if the counterparty defaults), and an upward correction for the possibility that you fail to pay them (DVA, the present value of the expected cost to the counterparty if you default — which shows up as a benefit on your own books because a defaulted derivative is one you no longer owe money on). Combining these three pieces gives \\[ f = f_{nd} - \\text{CVA} + \\text{DVA}. \\]</p>` },
    { name: "Single uncollateralized derivative shortcut", math: "f = f_{nd}\\times e^{-(\\text{credit spread})\\times T}", note: "No simulation needed if DVA=0 — just discount by the counterparty's credit spread.", plain: "When DVA is zero (you're assumed default-free) and there's only one uncollateralized derivative with the counterparty, you can skip Monte Carlo entirely: just take the no-default value and discount it an extra amount equal to the counterparty's own credit spread times the time to maturity.", derivation: `<p>Extensive Monte Carlo simulation is normally required to compute CVA and DVA for a portfolio of trades, because exposure varies over time and across many possible market paths. But this collapses to something simple in one special case: a single, uncollateralized derivative with one payoff at time \\(T\\), and \\(\\text{DVA}=0\\) (the bank itself is treated as default-free). In that case the value of a \\(T\\)-year zero-coupon bond issued by the counterparty tells you exactly how the market prices that counterparty's default risk over horizon \\(T\\): its price is its no-default value discounted an extra amount by the counterparty's credit spread. Applying that same discount to the derivative's no-default payoff gives \\[ f = f_{nd}\\times e^{-(\\text{credit spread})\\times T}. \\] In words: instead of running a simulation, you can price default risk into a single derivative exactly the way the bond market prices it into a zero-coupon bond of the same counterparty and maturity — one extra exponential discount factor.</p>` },
    { name: "Credit VaR via one-factor Gaussian copula", math: "V(T,X) = N\\!\\left[\\dfrac{N^{-1}(Q(T)) + \\sqrt{\\rho}\\,N^{-1}(X)}{\\sqrt{1-\\rho}}\\right];\\quad \\text{Credit VaR} = L\\times(1-\\text{RR})\\times V(T,X)", note: "Identical in structure to Vasicek's WCDR from R26 — same equation, different notation.", plain: "V(T,X) is the worst-case default rate you expect over horizon T at confidence level X, given the pool's average default probability Q(T) and the copula correlation ρ; multiply it by the loan pool size and the loss-given-default fraction to get a dollar credit-VaR figure.", derivation: `<p>The one-factor Gaussian copula assumes every firm's time to default is driven partly by a single common factor \\(F\\) (representing the economy) and partly by firm-specific noise, with weight \\(\\sqrt{\\rho}\\) on the common factor and \\(\\sqrt{1-\\rho}\\) on the idiosyncratic part — this is the same one-factor structure built up in R27. Transforming each firm's own (non-normal) marginal default-time distribution into a standard normal variable, and conditioning on the common factor sitting at its \\(X\\)-th percentile \\(N^{-1}(X)\\), gives the conditional default probability by time \\(T\\): \\[ V(T,X) = N\\!\\left[\\dfrac{N^{-1}(Q(T)) + \\sqrt{\\rho}\\,N^{-1}(X)}{\\sqrt{1-\\rho}}\\right]. \\] \\(Q(T)\\) is the unconditional probability of default by time \\(T\\) for a typical name in the pool, and \\(\\rho\\) is the copula correlation. Multiplying \\(V(T,X)\\) — the worst-case fraction of the pool defaulting — by the loan portfolio size \\(L\\) and by the loss actually suffered per dollar defaulted, \\((1-\\text{RR})\\), converts a default-rate percentile into a dollar credit VaR: \\[ \\text{Credit VaR} = L\\times(1-\\text{RR})\\times V(T,X). \\] This is exactly Vasicek's WCDR(T,X) formula from R26 — the same one-factor Gaussian copula machine, applied here to time-to-default instead of to a single-period default indicator.</p>` }
  ],

  concepts: [
    {
      name: "Recap: hazard rate, unconditional vs. conditional PD",
      def: "Unconditional PD in year t is read from the cumulative default curve directly. Conditional PD (given survival to year t−1) = unconditional PD(t) / survival probability through t−1.",
      intuition: "The distinction matters because the two numbers answer different questions. Unconditional PD answers 'as of today, what's the chance this bond defaults specifically in year t?' — it's shrinking toward zero over time simply because fewer and fewer bonds are still alive to default in later years. Conditional PD answers 'given the bond has survived every year up to t−1, what's the chance it defaults in year t?' — this is the hazard rate, and it's the number that actually reflects whether the bond's underlying credit health is improving or deteriorating over its life.",
      example: "B-rated bond: unconditional Yr4 default=4.484%, survival through Yr3=86.485%, conditional Yr4 default=4.484%/86.485%=5.185%. The same Moody's data shows the opposite pattern for investment-grade Baa bonds: unconditional default probability actually rises from Year 3 (0.351%) to Year 4 (0.421%), meaning investment-grade credit quality tends to deteriorate with time, while non-investment-grade B-rated bonds that survive the risky early years tend to see their conditional default probability fall — the 'survivors improve' effect.",
      related: [{ r: 25, label: "R25 — the full hazard rate and migration matrix toolkit" }]
    },
    {
      name: "ISDA Master Agreement & default mechanics",
      def: "Two loss scenarios for the non-defaulting party: (1) its exposure is positive and exceeds posted collateral → becomes an unsecured creditor for the shortfall; (2) the defaulting party's exposure is positive but less than posted collateral → non-defaulting party owed the return of excess collateral.",
      intuition: "The International Swaps and Derivatives Association (ISDA) Master Agreement is the standard legal contract that governs almost all bilaterally cleared (i.e., not centrally cleared through a clearinghouse) OTC derivatives trades between two counterparties. Rather than negotiating fresh legal terms for every single swap or option, the two parties sign one Master Agreement covering how collateral gets posted, what counts as a default, and how outstanding trades get closed out (settled) if one side defaults. When default happens, the loss allocation is purely mechanical: work out who has positive net value and compare it to collateral already posted.",
      example: "Company A and Company B have a bilaterally cleared derivatives position; Company B defaults. Company A's position is worth a positive $50,000, and Company B had posted $30,000 of collateral. Company A becomes an unsecured creditor for $50,000 − $30,000 = $20,000 — it can seize the $30,000 collateral outright but has to stand in line with B's other creditors for the remaining $20,000, with no guarantee of ever collecting it in full.",
      related: [{ r: 33, label: "R33 — netting and close-out mechanics in depth" }]
    },
    {
      name: "CVA and DVA — first appearance",
      def: "CVA = PV(expected cost to the bank if counterparty defaults). DVA = PV(expected cost to the counterparty if the bank itself defaults) — a BENEFIT to the bank's own book value.",
      intuition: "Both CVA and DVA behave like their own little derivatives contracts: their value moves around as market variables change, as the counterparty's credit spread moves, and as the bank's own credit spread moves. Computing them in general requires extensive Monte Carlo simulation — simulate many future paths of the underlying market variables, work out the derivative's exposure at each point along each path, weight by the probability of default in that interval (the q_i term), and discount back to today. Banks make this tractable in practice by storing every simulated path from their existing book, so that adding one new trade only requires re-running the incremental effect on those stored paths rather than resimulating everything from scratch.",
      pitfall: "Wrong-way risk: PD positively correlated with exposure (bad). Right-way risk: PD negatively correlated with exposure (good). A NEW transaction positively correlated with the existing book raises BOTH CVA and DVA; negatively correlated lowers BOTH.",
      example: "A firm buys CDS protection referencing a Greek bank's own debt, from a counterparty that is itself a Greek bank. If the Greek banking sector deteriorates, the reference obligation is more likely to default (the CDS buyer is 'winning' — the payout becomes more likely) at exactly the same time the seller's own ability to pay is weakening — the seller's PD and the buyer's exposure to that seller are moving together. That's a textbook wrong-way risk scenario.",
      related: [{ r: 37, label: "R37 — the fully developed CVA formula and BCVA" }],
      memory: "CVA is what THEY might not pay you; DVA is the twisted 'benefit' of what YOU might not pay them."
    },
    {
      name: "Credit risk mitigants",
      def: "Netting: sum ALL trades (positive and negative), not just positive-value ones. Collateral agreements. Downgrade triggers (closeout or extra collateral if counterparty rating falls below threshold).",
      intuition: "All three mitigants attack the same problem — reduce the amount actually at risk to a given counterparty — but through different mechanisms. Netting is purely legal/contractual: it lets you offset losing trades against winning trades with the same counterparty so only the net amount is at risk in default, instead of losing the full value of every winning trade while getting nothing back from the losing ones. Collateral agreements physically move cash or securities to whoever is owed money as exposure builds, so there's less left uncollateralized if default actually happens. Downgrade triggers are pre-emptive: they let a bank close out trades or demand more collateral automatically the moment a nonfinancial counterparty's credit rating slips below an agreed threshold, before things get worse — though their protective value shrinks if the downgrade is sudden and severe, or if many other dealers hold the same trigger and all try to close out or grab collateral simultaneously.",
      example: "Netting example: exposures of +5, −7, +10, −2 (millions) → gross exposure=5+10=$15M, netted exposure=5−7+10−2=$6M. Without netting, if the counterparty defaults, the bank could lose the full $15M on its winning trades while still owing the counterparty's estate on the losing trades. With netting, only the $6M net amount is exposed, because the losing trades' negative value directly offsets the winning trades' positive value in the close-out calculation.",
      related: [{ r: 33, label: "R33 — netting formalized in full" }]
    },
    {
      name: "Default correlation models: reduced-form vs. structural",
      def: "Reduced-form: fast, simple, LOW achievable correlation (hard to get two firms defaulting in the same narrow window), captures economic cycle (hazard rates tied to macro variables). Structural (Merton-style): slow, computationally intensive, can set correlation arbitrarily HIGH, captures economic cycle less directly.",
      intuition: "Reduced-form models treat each firm's default as a Poisson-like random jump governed by a hazard rate that itself moves with macroeconomic variables (interest rates, GDP growth, unemployment). Because default is modeled as an unpredictable jump for each firm independently, it's mathematically hard to force two firms' jumps to land in exactly the same narrow time window — so achievable correlation stays low, even though the model does capture broad economic-cycle effects (recessions raise everyone's hazard rate together). Structural models, by contrast, tie default directly to a continuously evolving process for each firm's asset value (the Merton approach from R21) crossing a debt threshold; because you can simply correlate the two firms' underlying asset-value processes as tightly as you like, you can dial joint-default correlation up to nearly any level — at the cost of a much heavier, iterative computation.",
      pitfall: "The achievable-correlation difference is the most useful discriminator: if a question needs high joint-default correlation, structural models can deliver it; reduced-form models structurally cannot.",
      example: "Default correlation itself arises for three concrete reasons worth memorizing: (1) external events hitting firms in the same geographic region or industry together, (2) overall economic conditions producing systematically higher or lower default rates in some years than others, and (3) contagion, where one firm's default directly triggers another's (e.g., a key supplier or lender failing). Because of these channels, credit risk on a portfolio can never be fully diversified away, unlike idiosyncratic single-firm risk.",
      related: [{ r: 21, label: "R21 — Merton, the structural model this contrasts with reduced-form" }]
    },
    {
      name: "One-factor Gaussian copula (time-to-default)",
      def: "Transforms non-normal times-to-default into standard normal variables via each firm's own marginal default distribution; the joint (bivariate normal) structure is the 'copula.' Correlation here is called the COPULA correlation.",
      intuition: "No individual firm's time-to-default is normally distributed — it's a skewed, bounded-below quantity. The Gaussian copula sidesteps that by transforming each firm's own marginal default-time distribution into a standard normal variable (mean 0, standard deviation 1), and then assuming the *joint* distribution of those transformed variables is bivariate normal. This trick lets you estimate the correlation structure completely independently of each firm's individual (marginal) default-time distribution — you can mix and match any marginal distributions you like, and as long as you're willing to assume the joint dependence structure is Gaussian, the machinery still works. The one-factor version further assumes every pairwise correlation comes from a single shared factor (rather than needing a separate correlation estimate for every pair of firms in a large portfolio), which is what makes the formula tractable for portfolios of hundreds or thousands of names.",
      pitfall: "V(T,X) is IDENTICAL in structure to Vasicek's WCDR formula from R26 — same equation, different reading's notation. If you memorize one, you've memorized both; don't waste study time treating them as separate formulas.",
      related: [{ r: 26, label: "R26 — the identical WCDR formula" }, { r: 9, label: "R9 — the copula concept this operationalizes" }],
      memory: "V(T,X) here = WCDR(T,X) in R26 — literally the same formula, don't study it twice."
    }
  ],

  connections: {
    from: [
      { r: 25, why: "This reading recaps and directly reuses the hazard-rate/PD toolkit built there." },
      { r: 27, why: "The single-factor copula machinery gets its time-to-default application here." }
    ],
    to: [
      { r: 37, why: "This reading's rushed CVA/DVA introduction becomes the fully developed BCVA framework." },
      { r: 33, why: "Netting mechanics, previewed here, get formalized fully." }
    ],
    confused: [
      { what: "Reduced-form vs structural default correlation models", how: "Reduced-form is fast but can only achieve LOW correlation; structural (Merton-style) is slow but can achieve arbitrarily HIGH correlation — pick based on how much joint default clustering the question needs." },
      { what: "V(T,X) here vs WCDR(T,X) in R26", how: "Identical formula, different notation/reading — a pure relabeling, not two things to learn separately." }
    ]
  },

  misconceptions: [
    { wrong: "\"DVA is a cost to the bank, just like CVA.\"", right: "DVA is a BENEFIT (added to book value) — it reflects that if the bank itself defaults, it escapes some of its own payment obligations. f = f_nd − CVA + DVA." },
    { wrong: "\"Reduced-form and structural models can achieve the same range of default correlation.\"", right: "Reduced-form models can only achieve LOW correlation (hard to synchronize narrow default-time windows); structural models can be calibrated to arbitrarily HIGH correlation." },
    { wrong: "\"The one-factor Gaussian copula formula here is a new formula distinct from Vasicek's WCDR.\"", right: "It's structurally IDENTICAL to Vasicek's WCDR from R26 — same equation, different notation. Don't spend separate study time memorizing both as if unrelated." },
    { wrong: "\"Risk-neutral and real-world default probabilities should be roughly interchangeable — just use whichever is handy.\"", right: "Use risk-neutral PDs (from bond/CDS spreads) for pricing and valuation; use real-world PDs (from historical data) for scenario analysis and forecasting actual future losses. Risk-neutral PDs are typically much higher, largely because bond defaults are not independent of one another and traders demand compensation for undiversifiable systematic risk." }
  ],

  highYield: [
    { stars: 4, what: "CVA/DVA definitions, the f=f_nd−CVA+DVA identity, and wrong-way/right-way risk direction.", why: "First appearance of the reading's most important formula — R37 assumes fluency here." },
    { stars: 4, what: "V(T,X) = Vasicek's WCDR(T,X), same formula different notation.", why: "A guaranteed efficiency point — recognizing the identity saves real study time." },
    { stars: 3, what: "Reduced-form vs structural: speed, achievable correlation, economic-cycle capture.", why: "A clean three-attribute comparison table, good matching-question material." },
    { stars: 3, what: "Netting example mechanics (gross vs netted exposure).", why: "A simple, frequently-plugged-with-new-numbers calculation." },
    { stars: 3, what: "Risk-neutral vs real-world PD: which to use for pricing vs. scenario analysis.", why: "A recurring practical-guidance question, and a common source of subtle wrong-answer traps." }
  ],

  recall: [
    { q: "A bank enters a new derivative trade that is positively correlated with its existing book of exposures to the same counterparty. What happens to CVA and DVA?", a: "Both CVA and DVA RISE. Positive correlation with the existing book increases the bank's exposure to the counterparty in the states where the counterparty is more likely to default (raising CVA) and increases the counterparty's exposure to the bank in states where the bank is more likely to default (raising DVA) — both risk measures move the same direction under this correlation." },
    { q: "Why can structural (Merton-style) default correlation models achieve much higher correlation than reduced-form models?", a: "Structural models tie default directly to a shared, continuously-evolving asset value process, so two firms' asset values (and hence default timing) can be made to move together very tightly by construction. Reduced-form models treat default as a Poisson-style jump driven by a hazard rate; synchronizing two independent jump processes into the same narrow time window is intrinsically harder, capping achievable correlation lower." },
    { q: "Exposures to a single counterparty across four trades are +5, −7, +10, −2 (millions). Compute gross and netted exposure, and explain the netting benefit.", a: "Gross exposure (sum of only positive-value trades) = 5+10 = $15M. Netted exposure (sum of ALL trades) = 5−7+10−2 = $6M. Netting captures the fact that in default, all obligations to and from the counterparty settle as one net amount — the negative-value trades offset the positive ones, cutting exposure by $9M here." },
    { q: "Should a risk manager use risk-neutral or real-world default probabilities when valuing a credit derivative, and which for a scenario-analysis loss forecast?", a: "Risk-neutral (market-implied, e.g. from CDS/bond spreads) for pricing and valuation of instruments and credit derivatives; real-world (historical) for scenario analysis estimating potential future losses. Risk-neutral PDs run higher because bond defaults aren't independent — traders demand extra compensation for undiversifiable systematic and contagion risk." }
  ],

  hooks: [
    { title: "CVA and DVA, mirror twins", text: "CVA: what THEY might not pay you (a cost). DVA: what YOU might not pay THEM (a twisted benefit) — same mechanism, opposite side of the ledger." },
    { title: "One formula, two reading numbers", text: "V(T,X) here and WCDR(T,X) in R26 are the same equation. If a formula looks familiar across readings, it probably is — check before memorizing twice." }
  ],

  breakdown: [
    {
      title: "Credit risk mitigants (3)",
      points: [
        "Netting — sum ALL trades with a counterparty, positive and negative, into one net exposure figure instead of only adding up the winning trades; shrinks exposure purely through contract law, at close-out.",
        "Collateral agreements — cash or marketable securities posted as trades gain value; on default, the non-defaulting party keeps the collateral, shrinking uncollateralized exposure directly.",
        "Downgrade triggers — clauses letting a bank close out trades at market value, or demand more collateral, the moment a nonfinancial counterparty's credit rating falls below an agreed threshold; less effective against sudden severe downgrades or when many dealers hold the same trigger simultaneously."
      ]
    },
    {
      title: "Two loss scenarios for the non-defaulting party under an ISDA close-out",
      points: [
        "Scenario 1 — non-defaulting party's value is positive and exceeds the defaulting party's posted collateral: it becomes an unsecured creditor for the shortfall (value owed minus collateral held).",
        "Scenario 2 — the defaulting party's value is positive but less than the collateral it posted to the non-defaulting party: the non-defaulting party owes back the excess collateral, becoming an unsecured creditor for that excess amount owed."
      ]
    },
    {
      title: "Reduced-form vs. structural default-correlation models",
      points: [
        "Reduced-form — fast and mathematically simple; hazard rates are correlated with macroeconomic variables via a random process; achievable joint-default correlation stays LOW because it's hard to synchronize two firms' random default 'jumps' into the same narrow window; does capture economic-cycle trends well.",
        "Structural (Merton-style) — built on correlated asset-value processes for the two firms; computationally slow, but correlation can be dialed up arbitrarily HIGH since asset paths are directly correlated by construction; captures the economic cycle less directly than reduced-form models."
      ]
    },
    {
      title: "Three sources of default correlation",
      points: [
        "External events — shocks that hit firms concentrated in the same geographic region or industry together.",
        "Economic conditions — overall macro conditions that push average default rates systematically higher or lower in some years than others.",
        "Contagion — one firm's default directly triggering another's (e.g., a critical counterparty, supplier, or lender failing)."
      ]
    },
    {
      title: "Which PD to use, and when",
      points: [
        "Risk-neutral default probabilities (implied from credit spreads/bond or CDS prices) — use for pricing instruments and valuing credit derivatives, since expected cash flows are discounted at the risk-free rate under risk-neutral valuation.",
        "Real-world (historical) default probabilities — use for scenario analysis, forecasting potential future losses from actual defaults; typically materially lower than risk-neutral PDs because bond traders demand compensation for undiversifiable systematic risk, contagion, and illiquidity that risk-neutral pricing bakes in."
      ]
    }
  ],

  quiz: [
    {
      q: "A B-rated bond has an unconditional probability of default of 4.484% in Year 4, and its probability of survival through Year 3 is 86.485%. What is the probability of default in Year 4, conditional on no earlier default?",
      options: ["4.484%", "5.185%", "3.879%", "86.485%"],
      answer: 1,
      why: "Conditional PD = unconditional PD(t) / survival probability through t−1 = 4.484% / 86.485% = 5.185%. The '4.484%' answer is just the unconditional PD, ignoring the conditioning on survival — the most common shortcut error. The '3.879%' answer wrongly multiplies instead of dividing."
    },
    {
      q: "A bank's uncollateralized exposures to a single counterparty across four trades are +$5M, −$7M, +$10M, and −$2M. What is the netted exposure?",
      options: ["$15M", "$9M", "$6M", "$0M"],
      answer: 2,
      why: "Netted exposure sums ALL trades: 5 − 7 + 10 − 2 = $6M. The $15M answer is the gross exposure — summing only the positive trades, ignoring the offsetting negative ones, the classic netting trap. The $9M answer is the difference between gross and net, not the net itself."
    },
    {
      q: "A bank books a new derivative trade with a counterparty that is negatively correlated with its existing book of exposures to that same counterparty. What is the most likely effect on CVA and DVA?",
      options: ["Both CVA and DVA increase", "Both CVA and DVA decrease", "CVA increases, DVA decreases", "CVA decreases, DVA increases"],
      answer: 1,
      why: "A new transaction negatively correlated with the existing book tends to decrease both CVA and DVA together, because it reduces exposure to the counterparty in states where either party is more likely to default. The 'CVA increases, DVA decreases' and 'CVA decreases, DVA increases' answers wrongly assume CVA and DVA move in opposite directions from a correlation change — they always move together in response to correlation with the existing book."
    },
    {
      q: "Which statement correctly distinguishes reduced-form from structural default-correlation models?",
      options: [
        "Reduced-form models can achieve arbitrarily high correlation; structural models cannot",
        "Structural models are computationally faster because they rely on a single hazard rate",
        "Structural models can be calibrated to arbitrarily high correlation but are computationally intensive; reduced-form models are fast but limited to low achievable correlation",
        "Both model families achieve the same range of achievable default correlation"
      ],
      answer: 2,
      why: "Structural (Merton-style) models correlate the firms' underlying asset-value processes directly, so correlation can be set as high as needed, at the cost of heavy computation; reduced-form models are fast and simple but structurally cap achievable correlation low. The 'reduced-form models can achieve arbitrarily high correlation' answer reverses the correct relationship; the 'structural models are computationally faster' answer is false — structural models are the slow ones."
    },
    {
      q: "A risk manager is deciding whether to use risk-neutral or real-world default probabilities. She needs to price a new credit derivative. Which should she use, and why?",
      options: [
        "Real-world PDs, because they reflect actual historical default experience",
        "Risk-neutral PDs, because pricing requires discounting expected cash flows at the risk-free rate under risk-neutral valuation",
        "Either is acceptable since they converge to the same number in practice",
        "Real-world PDs, because risk-neutral PDs only apply to equity options"
      ],
      answer: 1,
      why: "Pricing and valuation of instruments (including credit derivatives) is done in a risk-neutral framework, so risk-neutral PDs (implied from credit spreads) are the correct input; real-world PDs are for scenario analysis of potential future losses. The two are not interchangeable — risk-neutral PDs run materially higher due to compensation for systematic risk and illiquidity, so the 'either is acceptable' answer is wrong."
    },
    {
      q: "Using the one-factor Gaussian copula credit VaR formula, if V(T,X) represents the worst-case default rate at confidence X over horizon T, how is credit VaR computed from it for a loan portfolio of size L with recovery rate RR?",
      options: [
        "Credit VaR = L × RR × V(T,X)",
        "Credit VaR = L × (1 − RR) × V(T,X)",
        "Credit VaR = L / (1 − RR) × V(T,X)",
        "Credit VaR = (1 − RR) × V(T,X), independent of portfolio size"
      ],
      answer: 1,
      why: "Credit VaR = L × (1 − RR) × V(T,X): the worst-case default rate is multiplied by the loss-given-default fraction (1 − RR, not RR itself) and by the portfolio size to convert a default-rate percentile into a dollar loss figure. The 'L × RR × V(T,X)' answer incorrectly uses the recovery rate instead of the loss rate; the answer independent of portfolio size drops portfolio size, which is required to get a dollar amount rather than a rate."
    }
  ],

  sources: [
    { title: "Credit valuation adjustment — Wikipedia", url: "https://en.wikipedia.org/wiki/Credit_valuation_adjustment", note: "Overview of CVA/DVA mechanics, wrong-way risk, and how they fit into derivatives pricing." },
    { title: "ISDA Master Agreement — Wikipedia", url: "https://en.wikipedia.org/wiki/ISDA_Master_Agreement", note: "Background on the standard legal contract governing bilaterally cleared OTC derivatives, including close-out and netting provisions." },
    { title: "Gaussian copula — Wikipedia", url: "https://en.wikipedia.org/wiki/Copula_(statistics)#Gaussian_copula", note: "The general Gaussian copula construction underlying the one-factor time-to-default model used here and Vasicek's WCDR in R26." },
    { title: "Merton model — Investopedia", url: "https://www.investopedia.com/terms/m/mertonmodel.asp", note: "Explains the structural (Merton-style) approach to default that this reading contrasts with reduced-form models." }
  ],

  pdf: { book: 2, query: "credit risk is the exposure faced by an individual" },

  summary: `<p><strong>Hazard rate recap</strong>: conditional PD = unconditional PD(t)/survival(t−1). <strong>CVA</strong> = PV(cost if counterparty defaults); <strong>DVA</strong> = PV(benefit if the bank itself defaults); f=f_nd−CVA+DVA. <strong>Wrong-way risk</strong> (PD & exposure positively correlated) raises CVA, lowers DVA; right-way risk is the mirror. <strong>Netting</strong>: sum ALL trades (+ and −), not just positive-value ones. <strong>Reduced-form</strong> (fast, low achievable correlation, captures economic cycle) vs. <strong>structural</strong> (slow, arbitrarily high correlation, less direct cycle capture). <strong>One-factor Gaussian copula</strong> V(T,\\(X)=N[(N^{-1}(Q(T))+\\sqrt{\\rho }N^{-1}(X))/\\sqrt{1- \\rho }]\\) — structurally identical to R26's Vasicek WCDR formula.</p>`
});
