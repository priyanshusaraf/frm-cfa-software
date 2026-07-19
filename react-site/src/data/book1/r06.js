export default ({
  book: 1, reading: 6,
  session: "Risk Measurement",
  title: "Messages From the Academic Literature",
  tagline: "A conceptual bridge chapter: the research verdict on VaR's blind spots, previewing themes that get built out fully in later books.",

  teaches: `<p>The full title of this reading is "Messages From the Academic Literature on Risk Measurement for the Trading Book." It's literally a summary of a real Basel Committee on Banking Supervision working paper (Working Paper No. 19, January 2011) that polled the academic literature on where VaR-based risk management was falling short after the 2007-09 crisis. It's almost entirely qualitative, no heavy formulas, because the job here isn't to teach a new calculation. It's to hand you the research community's report card on the tools you just built in R1-5 (VaR, historical simulation, EVT, backtesting, cash-flow mapping). Six learning objectives (LO 6.a through 6.f) each summarize one strand of that literature: (a) what horizon and volatility assumptions VaR should use and why backtesting struggles to validate it; (b) how to fold liquidity costs into VaR (exogenous vs. endogenous liquidity); (c) how VaR stacks up against expected shortfall and spectral risk measures; (d) whether a bank should measure market, credit, and operational risk separately (compartmentalized) or together (unified); (e) what the empirical literature finds when it tries to measure the diversification benefit of aggregating those risk types; and (f) how a bank's leverage and its VaR-based capital constraint interact to amplify booms and busts. Treat this reading as the annotated table of contents for liquidity risk (Book 4), stressed VaR and FRTB (R16), and economic/integrated capital (R56): every idea introduced here in one paragraph gets a full chapter later.</p>`,

  why: `<p>Regulators and risk managers don't just need formulas. They need to know where the formulas' assumptions break. This reading collects the academic community's verdict on VaR's mathematical flaws (non-subadditivity), the liquidity dimension VaR ignores, and the aggregation question: does compartmentalized risk measurement over- or under-state true risk? Every theme here resurfaces as a fully built-out topic later.</p>`,

  intuition: `<p>This is the research memo a regulator reads before deciding to replace VaR with ES (R16). The single most important idea is that <strong>VaR is not subadditive</strong>: a merged portfolio's VaR can exceed the sum of its parts' VaRs. That's a mathematical failure, not just a practical inconvenience. It means VaR can penalize diversification, the opposite of what a risk measure should do. ES fixes this by construction.</p>`,

  eli5: `<p>Imagine two neighborhood watch groups, each independently prepared for "the worst storm we've ever seen in our own street," each stockpiling exactly enough sandbags for that. If the neighborhoods merge into one larger watch group, common sense says shared resources should mean they need <em>fewer</em> total sandbags per household, not more. That's the whole point of teaming up. But suppose the two streets flood from completely different, unrelated causes (one from a river, one from a storm drain). Then the merged group's "worst case we've ever seen" scenario is a day when <em>both</em> flood at once, something neither street alone ever had to plan for, and now the combined stockpile needed is bigger than the two separate stockpiles added together. That is exactly what "VaR is not subadditive" means: the risk measure for the merged portfolio can exceed the sum of the risk measures for the parts, even though diversification is supposed to only ever help, never hurt.</p>`,

  thinkLike: `<p>A practitioner reading this chapter isn't memorizing trivia. They're building a mental checklist of "assumptions I am quietly making every time I quote a VaR number." Before presenting a VaR figure to a risk committee, an FRM-minded risk manager asks: What horizon did I use, and does it match this portfolio's actual liquidity (a 10-day convention is meaningless for a book that takes three months to unwind)? Did I hold volatility constant, and if so, am I understating risk in a calm period that is about to turn volatile? Have I priced in the cost of actually exiting these positions (exogenous liquidity), and, if the position is large or exotic, have I separately modeled how much my own selling will move the price against me (endogenous liquidity)? And critically, am I reporting VaR alone, or also expected shortfall, given that VaR can make a diversified, merged portfolio look artificially riskier than its parts?</p><p>On the exam, GARP tests this reading almost entirely as one-liner recognition and paired-contrast questions: "which of these is the drawback of VaR," "which liquidity type applies to a large illiquid position," "top-down finds X, bottom-up finds Y." The single highest-yield sentence in the whole reading, worth memorizing verbatim, is that VaR is not subadditive. It's the direct justification GARP uses later (R16) for FRTB's switch from VaR to expected shortfall.</p>`,

  formulas: [],

  breakdown: [
    {
      title: "The six messages from the literature (LO 6.a–6.f)",
      points: [
        "6.a (VaR implementation): no single correct time horizon, it depends on liquidity and purpose. Ignoring time-varying volatility understates risk, but modeling it makes VaR procyclical and noisier. Backtesting struggles when exceptions are few or the horizon is long.",
        "6.b (Liquidity risk): exogenous liquidity (market-wide bid/ask cost, priced via liquidity-adjusted VaR) versus endogenous liquidity (your own trade size moving the price against you). Studies say model endogenous liquidity first.",
        "6.c (Risk measure comparison): VaR ignores tail severity beyond its own threshold and is not subadditive. Expected shortfall fixes both, at higher computational cost. Spectral risk measures generalize ES further with a risk-aversion weighting function.",
        "6.d (Unified vs. compartmentalized measurement): Basel sums separate market, credit, and operational risk capital (compartmentalized/non-integrated). A unified approach considers interactions across risk types simultaneously and can catch compounding effects the compartmentalized approach misses.",
        "6.e (Top-down vs. bottom-up aggregation): top-down studies (which assume risk types cleanly separate) mostly find a diversification benefit (ratio of integrated to summed capital < 1). Bottom-up studies (which try to model the interactions) are mixed and sometimes find compounding (ratio > 1).",
        "6.f (Balance-sheet management): leverage is inversely related to net worth, so VaR-based capital constraints loosen in booms and tighten in busts. That creates a cyclical feedback loop that can amplify rather than dampen financial cycles."
      ]
    },
    {
      title: "Three types of stress-testing exercises",
      points: [
        "Historical scenarios: replay an actual past market episode's moves against today's portfolio.",
        "Predefined scenarios: a risk team specifies a hypothetical adverse change in a chosen set of risk factors and reprices the book under it.",
        "Mechanical-search stress tests: an automated routine mechanically searches across risk-factor combinations to find the worst-case loss, without a human hand-picking the scenario."
      ]
    }
  ],

  concepts: [
    {
      name: "VaR time horizon: no universal answer",
      def: "There is no single 'correct' VaR horizon. It depends on portfolio liquidity and purpose (setting a trading desk's daily limit versus sizing multi-year economic capital, for instance). The common 10-day convention, as suggested by the Basel Committee, is chosen for computational convenience, not a law of nature. It lets banks use short-horizon data and scale it up, which is attractive for large, fast-moving trading books but not always optimal. For longer-horizon purposes such as economic capital, a bank also has to account for the fact that the portfolio's own composition will change over that longer window. A 10-day VaR implicitly assumes the position list stays fixed, and that's a worse and worse approximation the longer the horizon gets.",
      pitfall: "Don't treat the \\(\\sqrt{10}\\) scaling rule as universally valid. It assumes i.i.d. (independent, identically distributed) returns, which real markets violate especially in stress, and it silently assumes the portfolio itself doesn't change over those 10 days.",
      related: [{ r: 16, label: "R16 — FRTB's multiple liquidity horizons directly address this" }]
    },
    {
      name: "Time-varying volatility",
      def: "Ignoring volatility clustering (the empirical fact that high-volatility days cluster together and low-volatility days cluster together) understates risk in calm-before-storm periods, because the model is using a stale, low estimate of volatility right up until the crisis hits. Incorporating time-varying volatility fixes that understatement, but creates a new problem. VaR becomes procyclical (it rises sharply exactly when a crisis is already underway and capital is scarce) and the estimate becomes noisier and less stable, because it now reacts to every recent price swing. Risk managers should also account for time-varying correlations, not just time-varying volatility, when computing VaR. Correlations between assets can shift sharply in a crisis too (see R8).",
      intuition: "There's no free lunch here. A static-volatility VaR is wrong in a predictable direction (too low, right before trouble), while a dynamic-volatility VaR is noisier and can itself destabilize the system by forcing capital and position changes exactly when markets are already stressed (this is the leverage-procyclicality theme below). The effect of time-varying volatility on VaR accuracy shrinks as the horizon lengthens, but volatility jumps caused by sudden, random (stochastic) shocks continue to degrade even long-horizon VaR unless explicitly modeled.",
      related: [{ r: 2, label: "R2 — volatility-weighted and filtered HS respond to this" }]
    },
    {
      name: "Exogenous vs endogenous liquidity risk",
      def: "During a financial crisis, market liquidity conditions worsen, which lengthens the 'liquidity horizon' of a position: the time it actually takes to unwind it without materially moving its price. The literature splits liquidity risk into two types. Exogenous liquidity is the market-wide, average transaction cost (essentially, the bid/ask spread) that applies to any trader regardless of who they are or how large their trade is. It's handled by computing a liquidity-adjusted VaR (LVaR), which simply adds an estimated spread cost on top of the ordinary VaR number. Endogenous liquidity is the price-impact effect of your OWN trade size. It only shows up when your order is large enough, relative to the market, to move the price against you as you execute it (it's the elasticity of price to your own trading volume). Endogenous liquidity is most relevant for large, complex, or exotic positions, and is especially dangerous in high-stress conditions, when a 'flight to quality' means other market participants pull back from thinly traded assets exactly when you need to sell, though some endogenous liquidity cost is present even in normal markets. Academic studies suggest that of the two, models should account for endogenous liquidity first, since it's the one that most changes behavior in a crisis.",
      pitfall: "Don't conflate the two. Exogenous is a market feature you can price in with a spread add-on that's the same for every trader; endogenous requires modeling your own price impact, a fundamentally harder problem because it depends on your position size relative to the market, not just the market's general spread.",
      related: [{ r: 63, label: "R63 — full liquidity risk framework" }],
      memory: "Exogenous = the market's toll booth. Endogenous = your truck is too big for the road."
    },
    {
      name: "VaR vs ES vs spectral risk measures",
      def: "VaR is NOT subadditive: a merged portfolio's VaR can exceed the sum of its parts' VaRs, a genuine mathematical flaw. ES is always subadditive and captures tail severity. Spectral risk measures generalize ES further with a full risk-aversion weighting function (ES is the special 'flat tail weight' case).",
      pitfall: "'VaR is not subadditive' is one of the single most-tested one-liners in the whole book. It's the core theoretical argument for preferring ES in a regulatory context.",
      related: [{ r: 1, label: "R1 — coherent risk measures, of which ES is one" }, { r: 16, label: "R16 — FRTB replaces VaR with ES precisely because of this" }],
      memory: "Subadditive = 'diversification should never look worse.' VaR can violate this; ES cannot."
    },
    {
      name: "Unified vs compartmentalized risk aggregation",
      def: "Basel is compartmentalized: separate market, credit, and op risk capital, summed. This non-integrated approach ignores interaction/diversification effects across risk types, which can mis-measure true risk in EITHER direction.",
      related: [{ r: 56, label: "R56 — economic capital tries to integrate across risk types" }]
    },
    {
      name: "Top-down vs bottom-up aggregation",
      def: "Top-down studies (aggregate historical loss data across risk types) tend to find diversification (ratio < 1). Bottom-up studies (build up from individual risk components) are mixed. Some find risk COMPOUNDING (ratio > 1), especially when risks aren't cleanly separable.",
      pitfall: "Don't assume aggregation always finds diversification benefit. The bottom-up literature is genuinely mixed, and compounding is a real, tested possibility.",
      related: [{ r: 56, label: "R56 — diversification benefit in economic capital" }]
    },
    {
      name: "Leverage and procyclicality",
      def: "Leverage is inversely related to net worth. Booms loosen VaR-based capital constraints (more room to borrow); busts tighten them (forced asset sales). That's a feedback loop that VaR-based capital regulation can actually AMPLIFY rather than dampen.",
      intuition: "VaR-based capital rules were meant to make the system safer, but by construction they force selling exactly when prices are already falling (deleveraging into a falling market), a self-reinforcing spiral.",
      related: [{ r: 63, label: "R63 — the liquidity spiral mechanism this describes" }, { r: 64, label: "R64 — leverage and liquidity risk in depth" }],
      memory: "Procyclical = the regulation breathes with the cycle instead of against it."
    },
    {
      name: "Stress testing: three exercise types",
      def: "Stress testing supplements VaR by asking 'what if a specific bad scenario happens' rather than relying on the historical return distribution alone. The literature groups stress-testing exercises into three types: historical scenarios (replay an actual past market episode, e.g. 1998 or 2008, against today's portfolio), predefined scenarios (a risk team specifies a hypothetical adverse move in a chosen set of risk factors, e.g. 'equities down 20%, rates up 100bp,' and reprices the book), and mechanical-search stress tests (an automated routine mechanically searches across combinations of risk-factor changes to find the worst loss, without a human choosing the scenario by hand). A key part of doing this correctly is 'stressing' the correlation matrix itself, not just individual factor levels. In a real crisis, correlations move too (see R8), so holding correlations fixed while shocking only volatilities understates the stress loss.",
      pitfall: "An unreasonable assumption embedded in most stress tests is that the shock happens instantly and the trader cannot re-hedge or adjust the position in response. Real portfolios can partially react, so a naive stress test can overstate the loss in one direction while, by using normal-market correlations, understating it in another. Also, ordinary VaR is computed under normal market conditions, so a 'stressed VaR' add-on (built for stressed periods) is a distinct, less-validated tool. Don't assume a bank's everyday VaR model is automatically reliable in a crisis.",
      related: [{ r: 16, label: "R16 — stressed VaR under FRTB is this idea formalized into a capital requirement" }],
      memory: "Historical = replay the past. Predefined = pick your own nightmare. Mechanical-search = let the computer find the worst one."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "This reading is the academic verdict on the tools R1 just built." },
      { r: 4, why: "Backtesting's practical difficulties feed the broader 'can we trust VaR' theme here." }
    ],
    to: [
      { r: 16, why: "FRTB is the direct regulatory response: ES replaces VaR, multiple liquidity horizons replace one." },
      { r: 63, why: "Exogenous/endogenous liquidity and the leverage-procyclicality spiral are built out fully in Book 4." },
      { r: 56, why: "The unified-vs-compartmentalized aggregation question becomes the economic capital diversification debate." }
    ],
    confused: [
      { what: "Procyclicality vs volatility clustering", how: "Volatility clustering is a statistical property of returns; procyclicality is what happens when a REGULATORY RULE reacts to that clustering by forcing deleveraging in downturns." },
      { what: "Exogenous vs endogenous liquidity", how: "Exogenous is priced by the bid-ask spread regardless of who you are; endogenous appears only because YOUR trade is large enough to move the market." }
    ]
  },

  misconceptions: [
    { wrong: "\"A merged portfolio's VaR can never exceed the sum of its parts' VaRs.\"", right: "It can. VaR is not subadditive. This is a genuine mathematical failure of VaR as a risk measure, and it's the central argument for ES." },
    { wrong: "\"10-day VaR is the objectively correct horizon.\"", right: "It's a convention, not a law. The right horizon depends on the portfolio's liquidity and the risk measurement's purpose." },
    { wrong: "\"Aggregating risk types always reveals diversification benefit.\"", right: "Top-down studies mostly find diversification; bottom-up studies are mixed and sometimes find compounding (ratio > 1) when risks aren't cleanly separable." },
    { wrong: "\"VaR-based capital regulation stabilizes the system.\"", right: "It can amplify procyclicality, tightening exactly when deleveraging is already underway and forcing more asset sales into a falling market." }
  ],

  highYield: [
    { stars: 5, what: "VaR is not subadditive: meaning and consequence.", why: "The single most-tested one-liner in Book 1; it directly justifies FRTB's ES replacement in R16." },
    { stars: 4, what: "Exogenous vs endogenous liquidity risk.", why: "A clean conceptual distinction reused throughout Book 4's liquidity framework." },
    { stars: 3, what: "Leverage, procyclicality, and the VaR-driven deleveraging spiral.", why: "Connects directly to R63-64's liquidity spiral mechanism, and recognizing the link earns synthesis-question points." },
    { stars: 2, what: "Top-down vs bottom-up risk aggregation findings.", why: "Lower formula density but a recurring 'which finding is correct' conceptual question." }
  ],

  recall: [
    { q: "Give a concrete scenario where VaR violates subadditivity.", a: "Two positions each with small VaR individually (digital options with a small probability of large loss, say) can combine into a merged position whose VaR captures a scenario neither alone triggers, making merged VaR exceed the sum. That's precisely the failure ES avoids by averaging over the whole tail." },
    { q: "Why is 'ignoring time-varying volatility' and 'incorporating time-varying volatility' both criticized in the literature?", a: "Ignoring it understates risk in a volatility upswing (using a stale, low-vol estimate). Incorporating it makes VaR procyclical and jumpier: right before a crisis it may spike, right after it may fall too fast. There's no clean free lunch." },
    { q: "Distinguish exogenous and endogenous liquidity risk with an example each.", a: "Exogenous: the bid-ask spread on a stock, the same for any trader regardless of size, priced via LVaR spread add-on. Endogenous: a hedge fund trying to unwind a position so large it moves the price against itself, which requires modeling its own price impact." },
    { q: "Explain the leverage-procyclicality feedback loop in one sentence.", a: "Booms raise net worth, loosening VaR-based capital constraints and enabling more borrowing; busts shrink net worth, tightening constraints and forcing asset sales into an already-falling market, which is a spiral VaR-based regulation can amplify rather than dampen." }
  ],

  hooks: [
    { title: "The subadditivity flag", text: "'VaR is not subadditive' is Book 1's single most reusable exam sentence, so plant it early. Every time ES appears as 'the fix,' this is the flaw being fixed." },
    { title: "Toll booth vs oversized truck", text: "Exogenous liquidity is the toll booth everyone pays; endogenous liquidity is your truck being too big for the road, a problem only you create." }
  ],

  summary: `<p>A qualitative bridge reading. <strong>No universal VaR horizon</strong>: 10-day is convention, nothing more. <strong>Time-varying volatility</strong> is a trade-off: ignore it and risk gets understated; model it and VaR turns procyclical and noisier. <strong>Exogenous liquidity</strong> (market-wide spread, LVaR) is distinct from <strong>endogenous liquidity</strong> (your own trade moves the price). <strong>VaR is not subadditive</strong>, so it can penalize diversification; ES is always subadditive, and spectral measures generalize ES with a full weighting function. Basel's <strong>compartmentalized</strong> risk aggregation ignores cross-risk-type interactions. <strong>Top-down</strong> aggregation studies find diversification; <strong>bottom-up</strong> studies are mixed, sometimes finding compounding. And <strong>leverage-procyclicality</strong> means VaR-based capital rules can amplify boom-bust cycles through forced deleveraging.</p>`,

  quiz: [
    {
      q: "Which statement correctly describes VaR's mathematical properties relative to expected shortfall?",
      options: [
        "VaR is not subadditive — a merged portfolio's VaR can exceed the sum of its parts' VaRs, while ES is always subadditive",
        "VaR is always subadditive, just like expected shortfall",
        "Subadditivity is a property only spectral risk measures possess, not VaR or ES",
        "VaR's subadditivity failure only occurs when the correlation between the positions is exactly 1"
      ],
      answer: 0,
      why: "This is the single most-tested one-liner in the reading: VaR can penalize diversification because a merged position can trigger a joint loss scenario that neither position alone captures at its own VaR threshold. ES is always subadditive by construction, which is exactly why FRTB (R16) replaces VaR with ES. The distractor claiming the failure only occurs at correlation = 1 has it backwards: subadditivity failures are most dramatic at LOW or negative correlation, where tail scenarios are least anticipated by either position alone, not at correlation = 1."
    },
    {
      q: "What is the main problem with ignoring time-varying volatility when computing VaR?",
      options: [
        "It overstates risk during calm, low-volatility periods",
        "It makes backtesting completely unnecessary",
        "It has no measurable effect on VaR accuracy at any horizon",
        "It uses a stale, low volatility estimate right up until a crisis hits, understating risk exactly when it matters most"
      ],
      answer: 3,
      why: "A model that ignores volatility clustering keeps using an old, low volatility reading even as risk is actually building, so it understates risk in the calm-before-the-storm period. The distractor claiming it overstates risk during calm periods sounds plausible, since 'ignoring volatility' sounds like a blanket error, but the source is specific here. The direction of the error is understatement before a volatility upswing, not overstatement in calm periods."
    },
    {
      q: "A hedge fund's position is so large that its own sell order visibly moves the market price against it as it exits. Which type of liquidity risk does this describe?",
      options: [
        "Exogenous liquidity — the bid-ask spread, identical for every trader regardless of size",
        "Endogenous liquidity — driven by the trader's own order size and its price impact",
        "Systemic liquidity — a correlated liquidity shock affecting many institutions at once",
        "Regulatory liquidity — a charge imposed uniformly by the Basel Committee"
      ],
      answer: 1,
      why: "Endogenous liquidity is specifically the elasticity of price to your own trading volume. It only shows up because of who you are and how large your trade is, which is exactly the scenario described. The exogenous-liquidity option is the trap here: exogenous liquidity is the same average bid-ask cost for any trader regardless of size, so it doesn't depend on the fund's position being unusually large."
    },
    {
      q: "Academic studies compute the ratio of a bank's unified (integrated) capital requirement to its compartmentalized (separately summed) capital requirement. What do top-down aggregation studies typically find for this ratio?",
      options: [
        "Greater than 1, indicating risk compounding across risk types",
        "Less than 1, indicating a diversification benefit from aggregating risk types",
        "Exactly equal to 1, since Basel's compartmentalized approach is already fully accurate",
        "The ratio is undefined because top-down methods cannot be applied to real bank data"
      ],
      answer: 1,
      why: "Top-down studies aggregate historical loss data across risk types and consistently find a ratio below 1, implying diversification benefit that the separate, summed approach ignores. The 'ratio greater than 1, indicating compounding' option is the trap: a ratio above 1 (compounding) is the finding that sometimes shows up in the MIXED bottom-up literature, not the top-down literature. Mixing these two up is the most common exam error on this LO."
    },
    {
      q: "In an actively managed balance sheet, what happens to a leveraged institution's VaR-based capital constraint during an economic bust?",
      options: [
        "It loosens, allowing the institution to take on more debt to offset losses",
        "It stays fixed regardless of falling market prices",
        "It tightens, forcing asset sales into an already-falling market — a feedback loop that can amplify the downturn",
        "It disappears entirely, since VaR constraints are only imposed during economic booms"
      ],
      answer: 2,
      why: "Falling net worth in a bust tightens the VaR-based capital constraint, forcing deleveraging (asset sales) precisely when prices and liquidity are already declining, a self-reinforcing, procyclical spiral. The 'it loosens, allowing more debt' option inverts the actual mechanism: constraints loosen during BOOMS (rising net worth), not busts, which is the reverse of what the question asks."
    },
    {
      q: "According to the literature summarized in this reading, how should the Basel Committee's suggested 10-day VaR horizon be understood?",
      options: [
        "As a mathematically optimal horizon derived from portfolio theory",
        "As the only valid horizon for computing economic capital",
        "As a horizon that removes the need to track how portfolio composition changes over time",
        "As a regulatory convention chosen partly for computational convenience, not a universal law of risk measurement"
      ],
      answer: 3,
      why: "The reading is explicit that there is no consensus 'correct' horizon. 10 days is a convention that's computationally attractive for large trading books but not always optimal, especially for longer-horizon purposes like economic capital, where the portfolio's own composition will keep changing. The 'removes the need to track portfolio composition changes' option is the trap: longer horizons make the fixed-position assumption WORSE, not irrelevant. You need to account for changing composition more, not less, as the horizon lengthens."
    }
  ],

  sources: [
    { title: "Basel Committee on Banking Supervision (BCBS)", url: "https://www.bis.org/bcbs/index.htm", note: "The regulator that published the working paper this reading condenses; browse its full library of standards and working papers." },
    { title: "Expected shortfall — Wikipedia", url: "https://en.wikipedia.org/wiki/Expected_shortfall", note: "Explains the coherence/subadditivity property that makes ES the theoretical fix for VaR's core flaw discussed in this reading." },
    { title: "Value at risk — Investopedia", url: "https://www.investopedia.com/terms/v/var.asp", note: "A refresher on the VaR definition and its well-known limitations, including the tail-severity and subadditivity gaps covered here." },
    { title: "Procyclicality — Wikipedia", url: "https://en.wikipedia.org/wiki/Procyclicality", note: "Background on how financial regulation and leverage can amplify booms and busts — the mechanism behind LO 6.f." }
  ],

  pdf: { book: 1, query: "no consensus regarding the proper time horizon for risk measurement" }
});
