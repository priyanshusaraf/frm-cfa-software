export default ({
  book: 3, reading: 55,
  session: "Operational Risk Focus Areas",
  title: "Stress Testing Banks",
  tagline: "Makes the case for supervisory stress testing as a post-crisis risk tool superior to static capital ratios, then digs into why designing a genuinely coherent stress test is hard.",

  teaches: `<p>Why regulators turned to <strong>stress testing</strong> instead of relying on static regulatory capital ratios after 2007-2009, what the actual U.S. and European stress-test programs were (<strong>SCAP</strong>, <strong>CCAR</strong>, the <strong>EBA</strong> Irish and Europe-wide tests) and how their disclosure levels evolved, the <strong>coherence problem</strong> that makes designing a stress scenario genuinely hard, and the mechanics of translating macro shocks (unemployment, GDP growth, home prices) into a bank's actual balance sheet and income statement over a multi-year horizon.</p>`,

  why: `<p>Direct setup for R58's capital planning and the Basel capital math in R59-62. Understanding why stress test design is genuinely hard (scenarios must be extreme AND plausible simultaneously) prepares you for the practical complexity in R58's real supervisory regime. GARP also draws exam questions directly from the concrete numbers here — the 19 SCAP banks, the $75B / $77B capital-raise figures, the Nevada vs. North Dakota unemployment contrast, and the SCAP-to-CCAR disclosure timeline are all fair game because they are specific and checkable, unlike the softer conceptual material elsewhere in the book.</p>`,

  intuition: `<p>Before 2009, a regulator's main tool for judging whether a bank was safe was a <strong>regulatory capital ratio</strong> — a static snapshot like "common equity ÷ risk-weighted assets" measured today, using today's balance sheet. The problem the 2007-2009 financial crisis exposed is that a ratio computed on today's balance sheet tells you almost nothing about whether the bank would survive tomorrow's shock — it is backward-looking and easy to satisfy on paper while still being fragile. <strong>Stress testing</strong> replaces that static snapshot with a forward-looking simulation: take the bank's actual book of loans and trading positions, subject it to a hypothetical adverse scenario (a severe recession, a spike in interest rates), and calculate what capital and losses would look like if that scenario actually happened. The post-crisis stress tests also had a "pop-quiz" quality — banks were given the scenarios at short notice, so they could not quietly rearrange their books in advance to look safer, which is precisely why the results carried new, credible information for markets and regulators alike.</p>
  <p>The <strong>coherence problem</strong> is the reading's conceptual core, and it is easy to underestimate how hard it actually is. A stress scenario must satisfy two conditions simultaneously: it must be <em>extreme</em> (severe enough to actually test resilience) and it must be <em>plausible</em> — a combination of shocks that could jointly happen in the real world. The difficulty is that real economic and financial risk is <strong>multi-factor</strong>: variables move together, not independently. If a supervisor shocks unemployment to a historic high but leaves GDP growth, equity prices, and credit spreads untouched, the resulting scenario is internally inconsistent — in the real world, high unemployment, falling equity prices, and a credit-market freeze tend to arrive together, not one at a time. The same logic runs in reverse: not everything can go bad at once, because some relationships are structurally offsetting. If certain currencies depreciate, others (by arithmetic, since exchange rates are relative prices) must appreciate. If there is a "flight to quality" — investors fleeing risky assets — there must be some safe-haven asset they are fleeing <em>into</em>; a scenario that assumes U.S. Treasuries stop being the safe haven has to specify what becomes the new one, or the scenario doesn't describe anything that could actually occur. This joint-consistency requirement is what makes coherent scenario design a genuinely hard technical and judgment problem, especially for a large trading book where a value-at-risk (VaR) system tracks hundreds of thousands of positions against thousands of risk factors daily — finding one internally consistent, extreme-but-plausible outcome across that many dimensions is far harder than shocking a single number.</p>
  <p><strong>Macro-to-micro translation</strong> is the second big mechanical challenge: turning big, abstract, economy-wide shocks (the unemployment rate, GDP growth, the home price index — HPI) into bank-specific, product-specific, geography-specific revenue and loss numbers. This matters because macro shocks do not hit every bank, every loan type, or every region the same way. The reading gives a genuinely concrete example: in July 2011, unemployment was 12.9% in Nevada, 3.3% in North Dakota, and 9.1% nationally — a huge spread. Because credit card losses are particularly sensitive to local unemployment, a single national unemployment shock applied uniformly ("one-size-fits-all") would badly misstate the loss a bank concentrated in Nevada would actually face versus one concentrated in North Dakota. Supervisors therefore have to map macro factors down through "intermediate risk factors" specific to product and geography before the loss numbers mean anything at the bank level. Mechanically, the exercise unfolds sequentially: the bank's starting balance sheet, combined with the stressed scenario, generates quarter 1's income and losses; that determines the quarter-end balance sheet; that becomes the starting point for quarter 2; and so on, typically over a <strong>two-year</strong> horizon, with the bank required to keep its capital and liquidity ratios above the required minimums in every single quarter along the way — not just at the end.</p>`,

  eli5: `<p>Imagine a homeowner who wants to know if their house can survive a big storm. Checking the roof today and saying "it looks fine" is like a static capital ratio — a snapshot that tells you nothing about tomorrow. A better test is to actually simulate a storm: high wind, heavy rain, and a power outage all at once, because in a real storm those things happen together, not one at a time (that's the coherence problem — a "storm" that's only windy but perfectly sunny and calm otherwise isn't a real storm). And the effect of the storm depends on where in the house you look: the basement floods, the roof takes wind damage, the wiring might short out — you can't just say "the house took storm damage," you have to trace the storm's effect room by room (that's the macro-to-micro translation: unemployment and GDP shocks don't hit every loan book the same way, so supervisors have to trace the macro shock down to credit cards in Nevada versus mortgages in North Dakota). In finance: the storm is the stress scenario, the house is the bank's balance sheet, and the room-by-room damage report is the quarter-by-quarter, product-by-product loss projection that regulators like the Federal Reserve (SCAP, CCAR) and the European Banking Authority (EBA) demand.</p>`,

  thinkLike: `<p>A stress-testing risk manager or supervisor treats every proposed scenario as a story that has to hang together, not a checklist of shocked numbers. The first question is never "how extreme is this shock?" but "could all of these shocks plausibly happen at the same time, to each other?" If unemployment spikes but equity prices and credit spreads are left at normal levels, that is not a stress scenario — it's an error, because in the real world those variables are correlated. The examiner tests this by describing a scenario that shocks one variable in isolation (or shocks several variables in ways that contradict each other, like assuming every currency depreciates simultaneously) and asking you to spot what's wrong — that's a coherence-problem question in disguise.</p>
  <p>The second habit is refusing to accept a national or firm-wide number as automatically meaningful for a specific book of business. A risk manager immediately asks: does this loss driver vary by geography (mortgages), by asset type (used vs. new auto loans, where LGD behaves differently even when default rates rise), or by industry (an airline loan collateralized by an airplane is far riskier in a downturn than a healthcare loan, because the collateral itself becomes hard to sell)? GARP likes to test this by presenting a macro shock and a specific loan/asset type and asking which one is most sensitive to it — you should default to "the more geographically or product-specific the loss channel, the more the one-size-fits-all macro number misleads you." Finally, think of the stress horizon as a moving multi-quarter simulation, not a single before/after snapshot: capital and liquidity ratios must hold in every quarter along the way, and because reserves must be estimated to cover the year <em>after</em> the horizon ends, a "two-year" stress test is functionally a three-year exercise (a T-year horizon requires estimating T+1 years of reserve needs).</p>`,

  formulas: [],

  breakdown: [
    {
      title: "The disclosure evolution: SCAP → CCAR → CCAR revised (non-monotonic)",
      points: [
        "SCAP (US, 2009) — the first post-crisis macro-prudential stress test, applied to 19 large U.S. banks. Full bank-level disclosure: projected losses for each bank across eight asset classes, plus resources available to absorb losses (e.g. pre-provision net revenue, reserve releases). This was a sharp break from pre-crisis practice, when banks disclosed only realized losses, never forecasted stress losses.",
        "CCAR initial (2011) — pulled disclosure back sharply: only macro-scenario results were published, not bank-level detail. The market had to infer whether a bank had 'passed' from indirect signals (e.g., a dividend increase was read as a sign of passing).",
        "CCAR revised (2012) — disclosure returned to near-SCAP granularity: bank-level loss rates and losses by major asset class were published again. Also from 2011 onward, CCAR asked banks to submit results of their own internally designed stress scenarios in addition to the supervisor's scenario, giving regulators bank-specific (micro-prudential) insight on top of the macro-prudential picture.",
        "EBA Irish (2011) and EBA Europe-wide (2011) — both went even further than CCAR, disclosing bank-by-bank, asset-class, country, and maturity-bucket detail in downloadable electronic form. Ireland in particular needed unusually high disclosure to rebuild credibility after passing a 2010 CEBS stress test and then needing a bailout only four months later.",
      ],
    },
    {
      title: "Sources of difficulty in macro-to-micro translation (why 'one-size-fits-all' breaks down)",
      points: [
        "Geography — the same macro shock (unemployment) produces wildly different local outcomes; July 2011 unemployment ranged from 3.3% (North Dakota) to 12.9% (Nevada) against a 9.1% national rate, and credit card loss rates tracked that regional spread, not the national average.",
        "Asset class / product type — the same shock can move default risk and loss severity in different directions for different products; in a recession auto defaults may rise, but loss-given-default (LGD) may not rise proportionally because buyers who still need a car shift into the used-car market, keeping used-car collateral values (and thus recoveries) relatively firmer.",
        "Industry / collateral type — recessions hit industries unevenly and collateral liquidity unevenly; an airline loan collateralized by an airplane becomes very hard to sell except at deep discounts if the airline industry is depressed, while a healthcare-sector loan is comparatively recession-resistant — but a bank stuck with a repossessed airplane cannot simply repurpose it as a hospital.",
        "Revenue modeling is far less developed than loss modeling — SCAP offered little guidance on stress revenue. The main approach splits total income into interest income (estimated off the stressed yield curve, reflecting credit spreads) and noninterest income (fees, service charges), with noninterest income especially hard to model even though it has been a rising share of U.S. bank income.",
      ],
    },
    {
      title: "Modeling the balance sheet over the stress horizon",
      points: [
        "Mechanics: the starting balance sheet generates quarter 1's stressed income/loss; that produces the quarter-end balance sheet, which becomes the starting point for quarter 2, and so on — a sequential, quarter-by-quarter rollforward, not a single before/after comparison.",
        "Judgment calls the modeler must make along the way: will assets be sold or newly originated; will capital be depleted (e.g. by an acquisition) or conserved (e.g. by a spin-off); will dividend payments change; will shares be repurchased or newly issued (e.g. employee stock/option programs). The stress model itself does not tell you whether any of these are good decisions — it only requires you to make an assumption.",
        "Capital and liquidity ratios must be maintained in every quarter of the horizon, not just at the end — under both static and dynamic modeling assumptions.",
        "The horizon is typically two years, but because the bank must also estimate reserves needed to cover losses for the year after the horizon ends, a 'T-year' stress test is effectively a T+1-year exercise — a two-year test is really a three-year one once post-horizon reserve estimation is included.",
      ],
    },
    {
      title: "Costs and benefits of stress-test disclosure",
      points: [
        "Benefit: transparency. Detailed, credible disclosure lets investors and markets independently check the severity of the test and interpret outcomes at the individual-bank level — this is precisely what restores market trust after a crisis, which is why SCAP, the revised CCAR, and both EBA tests all pushed toward heavy disclosure.",
        "Cost in normal times: banks may 'window dress' — making short-term portfolio choices purely to look better on the specific test, at the expense of sound long-term positioning.",
        "Cost in normal times: heavy reliance on public stress-test disclosure can crowd out private information production — traders overweight the public numbers and are disincentivized to research banks independently, which degrades the information content of market prices for regulators who rely on those prices as a policy signal.",
      ],
    },
  ],

  concepts: [
    {
      name: "The disclosure evolution: SCAP → CCAR",
      def: "SCAP (US, 2009): full bank-level disclosure — high transparency, first post-crisis macro-prudential test. CCAR (initial, 2011): only macro-scenario results published, not bank-level. CCAR (revised, 2012): back to near-SCAP level of bank-level detail.",
      intuition: "Disclosure is a policy lever, not a fixed feature of a stress-testing program — regulators can dial it up or down between rounds of the same broad program, and did.",
      example: "SCAP disclosed projected losses for all 19 participating banks across eight asset classes, plus pre-provision net revenue and reserve releases available to absorb losses. EBA's Irish and European stress tests required even more granular disclosure — bank-by-bank, asset-class, country, and maturity-bucket detail in downloadable form — because Ireland in particular needed to rebuild credibility after passing a 2010 CEBS test and then requiring a bailout only four months later. In every case, the underlying goal was restoring market trust in the banking system through transparency.",
      pitfall: "Do not assume disclosure only ever increases after a crisis — CCAR's 2011 round was a genuine, deliberate step back from SCAP's transparency before the 2012 round restored it.",
      related: [],
      memory: "SCAP: full transparency. Early CCAR: pulled back. Revised CCAR: transparency restored."
    },
    {
      name: "The coherence problem",
      def: "Scenarios must be extreme AND plausible simultaneously — genuinely hard because real risk is multi-factor (a scenario extreme in one dimension may be unrealistic when all dimensions are considered jointly).",
      intuition: "A supervisor's real job in scenario design is not picking one bad number — it's specifying the joint outcome of every relevant risk factor at once, such that the combination could actually occur in the real world.",
      example: "An increase in volatility can trigger credit markets freezing; high unemployment and falling equity prices tend to move together — a scenario that shocks one without the other is internally inconsistent. Symmetrically, not everything can go bad at once: if some currencies depreciate, others must appreciate by arithmetic; if there's a 'flight to quality,' the scenario must specify the safe-haven asset(s) capital flees into — even a scenario where U.S. Treasuries stop being the safe haven must identify what becomes the new one. The problem compounds for marked-to-market trading books, where a VaR system maps hundreds of thousands of positions to thousands of risk factors daily, making a coherent joint outcome across that many dimensions very hard to specify.",
      counter: "SCAP's 2009 market-risk scenario is a useful counter-illustration of coherence done well: it reused the actual 2007-2009 financial crisis experience (flight to safety, the Lehman failure, higher risk premiums) rather than inventing a new hypothetical, which meant it didn't test anything new but did achieve coherence by construction, since it was drawn from a real, internally consistent historical episode.",
      pitfall: "Don't equate 'extreme' with 'valid' — an extreme scenario that is not jointly plausible fails the coherence test even if every individual number in it looks severe enough.",
      related: [],
      memory: "Extreme alone isn't enough — it also has to hang together as a story that could really happen."
    },
    {
      name: "Macro-to-micro translation",
      def: "Stress tests start from macro factors (unemployment, GDP growth, home price index) and must map them down to bank-specific, product-specific, geography-specific revenue and loss outcomes.",
      intuition: "A national average shock hides enormous local variation, and that variation is exactly what determines a specific bank's actual loss — so the translation step, not the initial macro shock, is where most of the real modeling difficulty lives.",
      example: "Mechanically: the starting balance sheet generates quarter 1's stressed income/loss, which produces the quarter-end balance sheet, feeding into quarter 2, and so on — typically over a two-year horizon, with capital and liquidity ratios required to hold throughout. Concretely: July 2011 unemployment was 12.9% in Nevada versus 3.3% in North Dakota against a 9.1% national rate, and credit card loss rates (which are unusually unemployment-sensitive) tracked that huge regional spread rather than the national number. Product type matters too — during a recession auto defaults may rise while loss-given-default doesn't rise proportionally, because buyers needing a car shift toward used cars, propping up used-car collateral values; and industry matters — an airline loan collateralized by an airplane becomes very hard to sell in a depressed airline market, while healthcare loans are comparatively recession-resistant.",
      pitfall: "The same 'intermediate risk factor' mapping problem also appears in R46's ERM stress-testing taxonomy and R57's economic capital challenges — recognize this as a recurring translation problem, not a one-off issue. Also: revenue modeling is much less mature than loss modeling — don't assume the reading treats them as equally well developed; noninterest income (fees, service charges) is especially hard to model despite being a growing share of U.S. bank income.",
      related: [{ r: 46, label: "R46 — the same macro-to-micro mapping challenge previewed" }, { r: 58, label: "R58 — where this mechanics becomes an actual supervisory process" }],
      memory: "Macro shocks (unemployment, GDP) → bank-specific losses → next quarter's starting balance sheet → repeat, for 2 years."
    },
    {
      name: "T-year stress horizon = T+1 years of required reserve estimation",
      def: "A stress test's nominal horizon (typically two years) understates the actual modeling burden, because at the end of the horizon the bank must also estimate the reserves needed to cover losses on loans and leases for the following year.",
      intuition: "Regulators don't just want to know the bank survives through the last modeled quarter — they want assurance the bank has adequately reserved for losses that will only be realized just after the formal test window ends, so the test implicitly reaches one year further than its stated horizon.",
      example: "A two-year (T=2) CCAR-style stress test therefore requires reserve estimates covering losses through year three (T+1=3) — functionally a three-year exercise even though it is described as 'two-year.'",
      related: [{ r: 58, label: "R58 — the same horizon-plus-reserve logic recurs in the real CCAR process" }],
      memory: "\"Two-year\" stress test = reserves estimated for year three too. T years tested → T+1 years reserved."
    }
  ],

  connections: {
    from: [
      { r: 46, why: "The stress-testing taxonomy previewed there gets applied specifically to bank-wide supervisory stress tests here." }
    ],
    to: [
      { r: 58, why: "This reading's macro-to-micro challenge becomes the concrete mechanics of one real regulatory regime." }
    ],
    confused: [
      { what: "SCAP vs initial CCAR vs revised CCAR disclosure levels", how: "SCAP: full bank-level. Initial CCAR: only macro-scenario results, NOT bank-level. Revised CCAR: back to near-SCAP bank-level detail — disclosure levels went full → reduced → restored, not a linear progression." },
      { what: "\"Coherence\" (internal consistency of a scenario) vs. simple \"severity\" (how bad a single number is)", how: "A scenario can be maximally severe on one variable and still fail coherence if the other variables aren't jointly consistent with it — coherence is about the relationship between shocked variables, not the size of any one shock." }
    ]
  },

  misconceptions: [
    { wrong: "\"Stress test disclosure has steadily increased in transparency since SCAP.\"", right: "It's non-monotonic: SCAP (2009) had full bank-level disclosure, initial CCAR (2011) pulled back to macro-scenario-only results, and revised CCAR (2012) restored near-SCAP bank-level detail." },
    { wrong: "\"A scenario that's extreme in one economic variable is automatically a valid stress scenario.\"", right: "The coherence problem means a scenario extreme in ONE dimension can be implausible when ALL dimensions are considered jointly — genuinely coherent scenarios require internally consistent, jointly plausible shocks across multiple variables." },
    { wrong: "\"A national unemployment shock produces a roughly uniform effect on a bank's credit card losses.\"", right: "Credit card losses are highly geography-sensitive to local, not national, unemployment — July 2011 unemployment ranged from 3.3% (North Dakota) to 12.9% (Nevada) against a 9.1% national average, and loss rates tracked that regional spread, which is exactly why a one-size-fits-all macro scenario understates the modeling difficulty." },
    { wrong: "\"A two-year stress test only requires modeling two years of losses.\"", right: "Because the bank must also estimate reserves to cover losses for the year after the horizon ends, a T-year stress test effectively requires T+1 years of loss/reserve estimation — a 'two-year' test is functionally three years of work." },
    { wrong: "\"More stress-test disclosure is always better.\"", right: "Disclosure is genuinely valuable in a crisis (it restores trust via transparency), but in normal times it carries real costs: banks may window-dress portfolios to pass the specific test, and heavy public disclosure can crowd out private information production by traders, degrading the informativeness of market prices for regulators." }
  ],

  highYield: [
    { stars: 3, what: "SCAP → CCAR (initial) → CCAR (revised) disclosure evolution, and the non-monotonic pattern.", why: "A specific, precisely testable historical sequence." },
    { stars: 3, what: "The coherence problem: extreme AND plausible simultaneously, multi-factor risk.", why: "The conceptual core of why stress test design is genuinely hard — a recurring GARP theme." },
    { stars: 2, what: "Macro-to-micro translation mechanics (quarterly balance sheet evolution over a 2-year horizon).", why: "Sets up R58's concrete supervisory process." },
    { stars: 2, what: "Geographic/product/industry sensitivity examples (Nevada vs. North Dakota unemployment; used-car LGD; airline vs. healthcare collateral).", why: "GARP frequently tests these concrete illustrations directly, e.g. 'which loan type is most sensitive to unemployment.'" },
    { stars: 1, what: "T-year stress horizon effectively requires T+1 years of reserve estimation.", why: "A precise, easily-tested numeric nuance about horizon length." }
  ],

  recall: [
    { q: "Why did stress test disclosure levels move from SCAP's full transparency to initial CCAR's reduced disclosure, and then back to near-SCAP detail under revised CCAR?", a: "The reading doesn't specify the exact motivations for each shift, but the pattern illustrates that disclosure calibration is an ongoing balancing act — full transparency (SCAP, initial CCAR pullback, revised CCAR restoration) reflects evolving judgments about how much bank-specific detail serves the goal of restoring market trust versus other considerations (e.g., competitive sensitivity, market stability)." },
    { q: "Why is it insufficient to simply shock unemployment to a historically extreme level in isolation when designing a stress scenario?", a: "Real economic risk is multi-factor — an extreme unemployment shock considered in isolation, without corresponding (and jointly plausible) shocks to GDP growth, home prices, and other correlated variables, may not represent a scenario that could actually occur. The coherence problem requires all shocked variables to move together in an internally consistent, jointly plausible way." },
    { q: "Why does a national unemployment figure understate the difficulty of forecasting a specific bank's credit card losses?", a: "Unemployment varies enormously by region — 12.9% in Nevada vs. 3.3% in North Dakota against a 9.1% national rate in July 2011 — and credit card losses are particularly sensitive to local unemployment, so a bank whose card book is concentrated in one region will experience losses that a national average completely misrepresents. This is why macro-to-micro translation must map down to geography, not just to the national number." },
    { q: "Why is a nominally 'two-year' stress test actually a three-year modeling exercise?", a: "At the end of the two-year stress horizon, the bank must also estimate the reserves needed to cover losses on loans and leases for the following year — so a T-year stress test requires estimating T+1 years of losses/reserves, making a two-year test functionally three years of work." }
  ],

  hooks: [
    { title: "One variable can't tell the whole story", text: "Shocking unemployment alone to a historic extreme, while leaving GDP and home prices untouched, is like writing a disaster movie where only the volcano erupts but the sky stays sunny — the coherence problem demands the whole scene make sense together." },
    { title: "Nevada isn't North Dakota", text: "A national unemployment number is an average hiding a 9.6-point regional spread (12.9% vs. 3.3% in July 2011) — treating every bank's credit card book as if it faced the national number is like giving every patient in a hospital the same prescription regardless of what's actually wrong with them." }
  ],

  summary: `<p><strong>Disclosure evolution</strong>: SCAP (2009, full bank-level) → CCAR initial (2011, macro-only) → CCAR revised (2012, near-SCAP detail) — non-monotonic; EBA Irish/Europe (2011) went further still, disclosing bank-by-bank, asset-class, country, and maturity-bucket detail. <strong>Coherence problem</strong>: scenarios must be extreme AND plausible jointly across multiple factors — a single-dimension extreme shock can be unrealistic when considered with all other variables (SCAP's 2009 market-risk scenario achieved coherence by reusing the actual 2007-2009 crisis experience rather than inventing a new hypothetical). <strong>Macro-to-micro translation</strong>: macro factors (unemployment, GDP, home prices) mapped to bank/product/geography-specific outcomes — Nevada's 12.9% vs. North Dakota's 3.3% July 2011 unemployment illustrates why a national number misleads; used-car LGD dynamics and airline-vs-healthcare collateral illustrate product/industry sensitivity. Revenue modeling remains far less mature than loss modeling. Balance sheet evolves quarter-by-quarter over a typical 2-year horizon, with capital/liquidity ratios required to hold throughout, and reserves must additionally be estimated for the year after the horizon ends (T-year test → T+1 years of reserve estimation). Heavy disclosure restores market trust in a crisis but carries window-dressing and crowded-out-private-information costs in normal times.</p>`,

  quiz: [
    {
      q: "What was the key structural weakness in pre-2009 bank risk assessment that supervisory stress testing was designed to address?",
      options: [
        "Regulatory capital ratios were computed correctly but set at levels that were too low",
        "Regulatory capital ratios were a static, backward-looking snapshot that did not reveal how a bank would perform under a future adverse scenario",
        "Banks were not required to hold any regulatory capital at all before 2009",
        "Deposit insurance did not exist before 2009, so bank runs were unpreventable"
      ],
      answer: 1,
      why: "The reading's core motivation is that static capital ratios, computed on today's balance sheet, don't reveal forward-looking resilience — stress testing simulates an adverse scenario to answer that question instead. The 'ratios were computed correctly but set too low' answer is a tempting distractor because ratio levels are a real regulatory topic, but the reading's point is about the tool's static nature, not its calibration; the 'no capital required' and 'no deposit insurance' answers are factually wrong (capital requirements and deposit insurance predate 2009)."
    },
    {
      q: "Which of the following best describes the 'coherence problem' in stress test design?",
      options: [
        "Ensuring a stress scenario is severe enough to meaningfully test a bank's capital",
        "Ensuring all shocked risk factors move together in a way that is jointly plausible, not just that any single factor is extreme",
        "Ensuring the same scenario is applied identically to every bank being tested",
        "Ensuring the results of the stress test are disclosed to the market in a consistent format"
      ],
      answer: 1,
      why: "Coherence specifically means the joint outcome across multiple risk factors must be internally consistent and plausible, not just extreme on one dimension. The 'severe enough to test capital' answer describes severity alone, which is necessary but not sufficient for coherence — a common trap, since severity is easier to picture than joint plausibility. The 'identical scenario for every bank' answer describes the pre-2011 one-size-fits-all approach (a different issue), and the 'consistent disclosure format' answer describes disclosure, an unrelated topic in this reading."
    },
    {
      q: "In July 2011, national U.S. unemployment was about 9.1%. Which pairing of state-level unemployment rates did the reading cite to illustrate why macro-to-micro translation matters for credit card losses?",
      options: [
        "California 11.8% vs. Texas 8.2%",
        "Nevada 12.9% vs. North Dakota 3.3%",
        "Michigan 10.5% vs. New York 8.0%",
        "Florida 10.6% vs. Iowa 6.0%"
      ],
      answer: 1,
      why: "The reading's specific example is Nevada at 12.9% and North Dakota at 3.3%, against a 9.1% national rate — a roughly 9.6-point spread used to show that credit card losses (unemployment-sensitive) vary far more by geography than a national average suggests. The other pairings are plausible-sounding but not the figures the source actually cites."
    },
    {
      q: "A stress test has a stated horizon of two years (T=2). Per the reading's balance-sheet modeling logic, how many years of loan/lease loss reserves must the bank actually estimate?",
      options: [
        "One year, covering only the first year of the horizon",
        "Two years, matching the stated horizon exactly",
        "Three years (T+1), because reserves must also cover losses expected in the year immediately following the horizon",
        "Indefinitely, since reserve estimation has no defined endpoint"
      ],
      answer: 2,
      why: "The reading states that at the end of the stress horizon, the bank must estimate reserves needed to cover losses on loans and leases for the next year — so a T-year test requires T+1 years of reserve estimation, meaning a two-year test requires three years' worth. The 'two years, matching the stated horizon' answer is the tempting distractor because it matches the 'headline' horizon length, but it ignores the post-horizon reserve requirement the reading explicitly calls out."
    },
    {
      q: "Which of the following is a real judgment call a risk modeler must make when projecting a bank's balance sheet over the stress horizon, per the reading?",
      options: [
        "Whether the bank's regulatory capital ratio formula uses Tier 1 or Tier 2 capital in the numerator",
        "Whether the stress scenario itself should be extreme or moderate",
        "Whether shares will be repurchased or newly issued (e.g., via employee stock/option programs) during the horizon",
        "Whether the Federal Reserve or the EBA has jurisdiction over the bank being tested"
      ],
      answer: 2,
      why: "The reading lists share repurchases/issuance, along with asset sales/originations, capital-affecting acquisitions/spin-offs, and dividend changes, as the concrete assumptions a modeler must make when rolling the balance sheet forward each quarter. The 'Tier 1 vs. Tier 2 capital formula' answer is a real capital-measurement detail but not one of the modeler's balance-sheet judgment calls; the 'scenario extreme or moderate' answer is decided upstream by the scenario designer, not the balance-sheet modeler; the 'Fed vs. EBA jurisdiction' answer is a jurisdictional question, not a modeling assumption."
    },
    {
      q: "Which statement correctly characterizes the trajectory of stress-test disclosure from SCAP (2009) through CCAR's initial and revised rounds?",
      options: [
        "Disclosure increased steadily and monotonically from SCAP through revised CCAR",
        "Disclosure was full under SCAP, dropped to macro-scenario-only under initial (2011) CCAR, then returned to near-SCAP bank-level detail under revised (2012) CCAR",
        "Disclosure was minimal under SCAP and increased steadily through both rounds of CCAR",
        "Disclosure levels were identical across SCAP and both CCAR rounds, with only the EBA tests varying in detail"
      ],
      answer: 1,
      why: "SCAP had full bank-level disclosure across eight asset classes; the 2011 CCAR round pulled back to macro-scenario-only results (forcing the market to infer pass/fail indirectly, e.g. from dividend changes); the 2012 CCAR round restored near-SCAP bank-level granularity. The 'increased steadily and monotonically' answer is the most common wrong intuition — assuming transparency only ever increases post-crisis — but the actual path is full → reduced → restored, not monotonic."
    }
  ],

  sources: [
    { title: "Supervisory Capital Assessment Program (SCAP) — Federal Reserve", url: "https://www.federalreserve.gov/bankinforeg/bcreg20090507a1.pdf", note: "The Federal Reserve's original 2009 SCAP overview and results document." },
    { title: "Comprehensive Capital Analysis and Review (CCAR) — Federal Reserve", url: "https://www.federalreserve.gov/supervisionreg/ccar.htm", note: "The Fed's current CCAR program page, useful for seeing how the disclosure and scenario-submission requirements evolved after the reading's 2011/2012 rounds." },
    { title: "Stress test (financial) — Wikipedia", url: "https://en.wikipedia.org/wiki/Stress_test_(financial)", note: "Background on stress testing as a risk-management tool, including the SCAP/CCAR/EBA history and the coherence and scenario-design issues covered in this reading." },
    { title: "EU-wide stress testing — European Banking Authority", url: "https://www.eba.europa.eu/risk-and-data-analysis/risk-analysis/eu-wide-stress-testing", note: "The EBA's own page on its Europe-wide stress-testing exercises, for comparison against the U.S. SCAP/CCAR programs discussed here." }
  ],

  pdf: { book: 3, query: "regulators and other policymakers realized that standard approaches to risk assessment" }
});
