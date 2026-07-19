export default ({
  book: 1, reading: 16,
  session: "Term Structures & Volatility",
  title: "Fundamental Review of the Trading Book (FRTB)",
  tagline: "The capstone: every earlier thread in Book 1 gets cashed in by regulation. Here is what banks must actually hold capital against, and why the old answer wasn't good enough.",

  teaches: `<p>This reading is where VaR's non-subadditivity and blindness to tail severity (R1, R6) directly motivate FRTB's replacement of VaR with Expected Shortfall. Backtesting weaknesses (R4) shape FRTB's specific backtesting and P&L attribution rules. Correlation-across-liquidity-horizons (Study Session 2) motivates the multi-horizon liquidity structure. You'll learn liquidity horizons, trading book vs banking book classification, backtesting/P&L attribution under FRTB, and credit risk/securitization treatment.</p>
  <p>Concretely, you need to be able to: (1) explain <em>why</em> regulators moved from 10-day 99% VaR + a 250-day stressed VaR (Basel I / Basel II.5) to a single 97.5% Expected Shortfall calculated over a stressed 250-day window (FRTB); (2) walk through the five liquidity-horizon categories (10/20/40/60/120 days) and the \\(ES_{1}\\text{–}ES_{5}\\) waterfall calculation that combines them; (3) apply the dual trading-book/banking-book classification test; and (4) keep straight the four separate regulatory checks that run alongside the capital number itself — backtesting, P&L attribution, the jump-to-default charge, and the securitization standardized approach.</p>`,

  why: `<p>If Study Session 1 asked "how do we measure risk," Reading 16 is regulators' final answer: "here is what banks must actually hold capital against, and why the old answer wasn't good enough." Every conceptual flaw flagged earlier in the book — VaR's blindness to tail severity, non-subadditivity, single-horizon assumptions, weak backtesting — gets a specific regulatory fix here.</p>
  <p>This matters beyond the exam because FRTB is not a hypothetical academic proposal — it is the actual rulebook (finalized by the Basel Committee in 2019, with a global implementation deadline banks were working toward through the early-to-mid 2020s) that determines how much capital a bank must hold against its trading book. Get the capital number wrong and a bank is either dangerously under-capitalized (it can't absorb a real loss) or needlessly over-capitalized (it can't lend or trade competitively) — so every design choice in this reading exists because the old Basel I / Basel II.5 regime got one of those two outcomes wrong in a specific, identifiable way.</p>`,

  intuition: `<p>The canonical motivating case makes the whole chapter's purpose vivid: a $950M bond portfolio, 2% annual default probability, discretized as 3-in-5 chance of $0 loss, 2-in-5 chance of total ($950M) loss conditional on being in the bad tail. At 95% confidence, VaR = $0 (default probability is below 5%, so the threshold loss is zero) — VaR says "no problem." But ES = 40% × $950M = $380M — ES correctly captures that IF you're in the tail, the loss is catastrophic. This gap between a reassuring VaR and an alarming ES is exactly the scenario FRTB was designed to prevent regulators from missing.</p>
  <p>Walk through the mechanics slowly, because the exam tests exactly this arithmetic. VaR at 95% confidence asks: "what loss level is exceeded only 5% of the time?" With a 2% annual default probability, the bond defaults in only 2 out of every 100 years — well inside the 95% "safe" region. So the 95th-percentile outcome (reading from the best case downward) still lands in the "no default" bucket, and the loss at that percentile is $0. VaR is, technically, answering the question correctly — it is just answering a question that hides the catastrophe. Expected Shortfall instead asks: "given that we ARE in the worst 5% of outcomes, what is the average loss?" Within that worst-5% tail, the source's discretized default schedule puts 3-in-5 sub-scenarios at $0 loss and 2-in-5 sub-scenarios at a full $950M loss (the bond issuer defaults and recovery is treated as zero) — so the conditional average loss inside the tail is \\(\\tfrac{2}{5}\\times\\$950\\text{M} = 40\\%\\times\\$950\\text{M} = \\$380\\text{M}\\). Same portfolio, same day, two "correct" numbers that tell completely different stories — that gap is the entire regulatory argument for ES in one worked example.</p>
  <p>Under a normal distribution, 99% VaR and 97.5% ES are numerically very close \\((2.326\\sigma\\) vs \\(2.338\\sigma\\) above the mean) — but they diverge sharply under fat-tailed distributions, which is the whole point of preferring ES. This is also why FRTB didn't need to make banks report a dramatically different number for "normal," well-behaved risk factors — the real bite of the change shows up exactly in the skewed, jump-prone risk factors (like credit and default risk) where VaR's blindness was hiding the most danger.</p>`,

  eli5: `<p>Imagine a smoke detector that only ever tells you "yes, there is smoke right now" or "no, there is no smoke right now" — that's VaR: a single yes/no threshold. Now imagine a smoke detector that, once it detects smoke, also estimates how big the fire probably is — that's Expected Shortfall. If your house has a 2% chance per year of catching fire, a "does it happen more than 5% of the time" detector (VaR) will sit there silently saying "all clear" every single year, because a 2% chance never crosses its 5% alarm threshold — even though when the fire does happen, it burns the house down. The ES-style detector instead asks "if the bad case happens, how bad is it," and reports the full loss it would face. FRTB replaces the yes/no smoke detector (VaR) with the severity-estimating one (ES) as the regulatory standard, precisely because banks (like homeowners) need to know not just "will something bad happen more than 1-in-20 times" but "how much would we lose if it does."</p>`,

  thinkLike: `<p>A risk manager reading this chapter should stop thinking of "market risk capital" as one number computed one way, and start thinking of it as a small bureaucracy of checks that must all pass simultaneously. Ask, for every risk factor on the trading book: which of the five liquidity buckets does it belong in (how long would it realistically take to hedge or exit this position in a stressed market without moving the price against yourself)? Is this position actually being traded and actively risk-managed by a desk, or is it sitting there passively (which would make it a banking-book asset with different, credit-focused capital rules)? And separately from the capital number itself: is the model's own predicted P&L tracking what the desk actually earned or lost, and is the VaR model itself throwing more exceptions than it statistically should?</p>
  <p>GARP tends to test this reading in three recurring shapes: (1) a numeric VaR-vs-ES calculation structurally identical to the $950M example — swap the portfolio size and default probability and make you redo the arithmetic; (2) "which of these two rules governs X" traps — backtesting vs P&L attribution, or 97.5% ES vs 99% jump-to-default VaR — where the distractor merges two genuinely separate regulatory tests into one; and (3) "what does \\(ES_{k}\\) hold fixed" questions on the liquidity waterfall, which reward memorizing the exact nested structure (each successive \\(ES_{k}\\) retires one more category from being re-shocked) rather than a vague sense that "there are five buckets."</p>`,

  visual: `<div class="widget" data-widget="frtb"></div>`,

  formulas: [
    {
      name: "VaR vs ES under normality (near-equivalence)",
      math: "VaR_{99\\%} \\approx \\mu + 2.326\\sigma \\qquad ES_{97.5\\%} \\approx \\mu + 2.338\\sigma",
      note: "Nearly identical under normal returns — the two diverge sharply only when tails are fat, which is precisely why the choice matters in practice.",
      plain: "For a normally distributed portfolio, the 99% VaR and the 97.5% ES sit almost exactly the same number of standard deviations above the mean loss, so under normality it barely matters which one regulators pick — the entire policy debate only matters once returns have fatter-than-normal tails.",
      derivation: `<p>Both numbers come from the same standard-normal machinery, just evaluated at different points:</p>
      <p>\\[ VaR_{99\\%} = \\mu + z_{0.99}\\,\\sigma, \\qquad z_{0.99} = 2.326 \\]</p>
      <p>For a normal distribution, the Expected Shortfall beyond a cutoff \\(z_{\\alpha}\\) has a closed form using the standard normal density \\(\\phi(\\cdot)\\):</p>
      <p>\\[ ES_{97.5\\%} = \\mu + \\sigma\\,\\dfrac{\\phi\\!\\left(z_{0.975}\\right)}{1-0.975} \\]</p>
      <p>Plugging in \\(z_{0.975}=1.960\\) and \\(\\phi(1.960)\\approx 0.0584\\) gives \\(\\dfrac{0.0584}{0.025}\\approx 2.338\\), so \\(ES_{97.5\\%}\\approx \\mu+2.338\\sigma\\) — a coefficient just \\(0.012\\sigma\\) above the \\(VaR_{99\\%}\\) coefficient of \\(2.326\\). That near-equality only holds because the normal distribution's tail thins out predictably (exponentially in \\(z^{2}\\)); once a distribution has fatter tails, the ES integral above the cutoff picks up much more extra mass than the VaR point estimate reflects, and the two numbers pull apart.</p>`
    },
    {
      name: "Liquidity-adjusted Expected Shortfall (IMA waterfall)",
      math: "ES = \\sqrt{\\left(ES_{1}\\right)^{2} + \\sum_{j=2}^{5}\\left(ES_{j}\\right)^{2}\\dfrac{LH_{j}-LH_{j-1}}{LH_{1}}}",
      note: "Combines the five nested-shock components \\(ES_{1}\\) through \\(ES_{5}\\), each held at its own liquidity horizon \\(LH_{j}\\) (10, 20, 40, 60, 120 days), into one overall liquidity-adjusted ES using the same square-root-of-time logic as R1's horizon scaling.",
      plain: "The overall liquidity-adjusted ES is not a simple sum of the five bucket-level shortfalls; it is a square-root-of-sum-of-squares combination, because each successive category's extra risk is being scaled up from a 10-day base shock by the ratio of its liquidity horizon to that base horizon — exactly the same square-root-of-time principle used to scale a 1-day VaR up to a 10-day VaR in Reading 1.",
      derivation: `<p>Each \\(ES_{j}\\) is itself computed as a 10-day expected-shortfall shock, but applied to different sets of risk factors:</p>
      <ul>
      <li>\\(ES_{1}\\): 10-day shock applied to ALL five categories simultaneously (nothing held fixed).</li>
      <li>\\(ES_{2}\\): 10-day shock applied to categories 2–5 only; category 1 is held fixed (its risk is already captured in \\(ES_1\\)'s shorter horizon).</li>
      <li>\\(ES_{3}\\): 10-day shock applied to categories 3–5; categories 1 and 2 held fixed.</li>
      <li>\\(ES_{4}\\): 10-day shock applied to categories 4–5; categories 1–3 held fixed.</li>
      <li>\\(ES_{5}\\): 10-day shock applied to category 5 only; categories 1–4 held fixed.</li>
      </ul>
      <p>Because each \\(ES_{j}\\) for \\(j \\ge 2\\) represents risk that only "shows up" once you look past liquidity horizon \\(LH_{j-1}\\), it is weighted by \\(\\dfrac{LH_{j}-LH_{j-1}}{LH_{1}}\\) before being added into the total variance-style sum — the same square-root-of-time scaling that turns a 1-day \\(\\sigma\\) into a 10-day \\(\\sigma\\sqrt{10}\\) in Reading 1, just applied bucket-by-bucket instead of to a single horizon. In the simplified two-category case (only Category 1 and Category 2 risk factors exist), this collapses to \\(ES=\\sqrt{(ES_{1})^{2}+(ES_{2})^{2}\\,\\dfrac{LH_{2}-LH_{1}}{LH_{1}}}\\), which is the version most likely to appear as a plug-in calculation question.</p>`
    }
  ],

  concepts: [
    {
      name: "VaR to ES: the canonical motivating case",
      def: "A $950M bond portfolio, 2% annual default probability: at 95% confidence VaR = $0 (default risk is below the 5% threshold), but ES = 40% × $950M = $380M once you average over the conditional bad-tail outcome.",
      intuition: "VaR only checks whether the 5%-worst outcome crosses a threshold; with only a 2% default probability, the 5th-percentile outcome is still a 'no default' scenario, so the threshold itself sits at $0 loss. ES instead averages across everything inside that worst-5% tail — and within that tail, the source's discretized schedule says 2-out-of-5 sub-scenarios are a total $950M loss, so the conditional average comes out to $380M.",
      example: "Change the numbers and the mechanic still applies: an $825M portfolio with a 3% default probability (a common exam variant) still gives 95% VaR = $0 (3% < 5%), but a different conditional tail split (here 3-in-5 sub-scenarios of total loss) gives ES = 3/5 × $825M = $495M — always redo the arithmetic per the specific numbers given, don't memorize $380M as a universal answer.",
      pitfall: "This is the single clearest illustration in the whole curriculum of why VaR can say 'no problem' while ES screams danger — memorize the mechanism (default prob below the confidence threshold → VaR reads zero) not just the punchline.",
      related: [{ r: 1, label: "R1 — ES defined to fix VaR's blindness to tail severity" }, { r: 6, label: "R6 — VaR's non-subadditivity, the same family of flaw" }],
      memory: "VaR asks 'will it happen 5% of the time?' ES asks 'and if it does, how bad?' — this example is the gap between those two questions in dollars."
    },
    {
      name: "From Basel I / Basel II.5 to FRTB: what actually changed",
      def: "Basel I used a 10-day, 99% confidence VaR. Basel II.5 (post-2008) bolted on a second measure alongside it: a 250-day stressed VaR, meant to capture how the portfolio would have behaved during a historically severe 250-day (roughly one trading year) window that the bank itself selects as especially painful for its current book. FRTB scraps both and replaces them with a single measure: 97.5% Expected Shortfall computed over that same kind of self-selected 250-day stressed window.",
      intuition: "Basel I's 10-day VaR was 'current' — it reflects the most recent 1-4 years of market behavior — but that is exactly its weakness: in a calm market, recent history understates the tail risk that could return in a crisis. Basel II.5's stressed VaR add-on was a patch to force banks to also look at a genuinely bad historical window, but it still inherited VaR's blindness to severity beyond the threshold. FRTB's insight is that you don't need two separate VaR numbers (current + stressed) if you instead compute one ES number directly on the stressed window — ES already tells you the severity, so a second 'how bad could it be' number becomes redundant.",
      pitfall: "A common exam trap is claiming FRTB 'adds' a stressed measure on top of ES — it does the opposite: it collapses the two-measure Basel II.5 structure (VaR + stressed VaR) into one measure (stressed ES) and drops the separate current/stressed VaR pairing entirely.",
      related: [{ r: 1, label: "R1 — the VaR framework FRTB is replacing" }],
      memory: "Basel I: 10-day 99% VaR. Basel II.5: that PLUS a 250-day stressed VaR. FRTB: BOTH replaced by one 97.5% stressed ES."
    },
    {
      name: "Liquidity horizons",
      def: "Five categories (10/20/40/60/120 days) replace a single 10-day horizon for everything. A liquidity horizon (LH) is defined by the Basel Committee as the time required to execute transactions that extinguish an exposure to a risk factor, without moving the price of the hedging instruments, in stressed market conditions — in plain terms, how long it would realistically take to fully hedge or exit a position in a crisis without your own selling pushing the price against you. The internal models-based approach (IMA) computes a waterfall of shocks \\(ES_{1}\\) through \\(ES_{5}\\).",
      example: "Investment-grade sovereign credit spreads are assigned a 20-day horizon; non-investment-grade corporate credit spreads, being far less liquid in a stressed market, get a 60-day horizon. Large-cap equity typically sits at the short (10-day) end; a 120-day horizon corresponds to roughly six months of trading days, 60 days to one quarter, 20 days to one month, and 10 days to about two weeks — so the categories map directly onto how quickly a desk could realistically unwind that type of position under stress. \\(ES_{1}\\) shocks ALL categories together; \\(ES_{2}\\) holds category 1 fixed and shocks 2-5; and so on — then combines them scaled by the square root of the horizon differences (a direct echo of the \\(\\sqrt{t}\\) scaling rule from Reading 1's return-horizon conventions).",
      pitfall: "Don't confuse 'liquidity horizon' with 'holding period' in the ordinary VaR sense — LH specifically measures how long it takes to exit WITHOUT moving the market against yourself in a stressed (not calm) environment, which is why illiquid credit risk factors get much longer horizons than liquid large-cap equity even though a bank could technically sell either 'today' in normal markets.",
      related: [{ r: 1, label: "R1 — the √t scaling convention this generalizes" }, { r: 6, label: "R6 — no universal VaR horizon, the conceptual seed of this fix" }],
      memory: "One horizon for everything (old) → five horizons, waterfall-combined (FRTB)."
    },
    {
      name: "Trading book vs banking book classification",
      def: "Dual test for trading-book classification: (1) the bank must be able to actually trade the asset, AND (2) the trading desk must physically manage the risk of that asset day to day. Trading-book assets are marked to market and face market risk capital rules; banking-book assets are intended to be held to maturity, carried at cost, and face more stringent credit risk capital rules instead.",
      intuition: "The two rule sets exist because market risk capital (trading book) and credit risk capital (banking book) are calibrated for different holding horizons and different loss shapes — a bond you plan to trade out of next week has a very different risk profile than one you plan to hold to maturity and simply collect coupons on. Before FRTB, a bank could shop between these two rule sets for the SAME asset by choosing which book to book it in, and since trading-book rules were sometimes more favorable, banks parked credit-dependent assets there specifically to relax their capital requirement — that is the regulatory arbitrage FRTB is designed to shut down.",
      pitfall: "Once classified, reclassification is heavily restricted (extraordinary circumstances only, e.g. a firm-wide change in accounting practice) — specifically to shut down regulatory arbitrage where banks moved assets between books to get more favorable capital treatment. Even in an allowed reclassification, any capital BENEFIT from the new category is disallowed — the bank must keep computing capital under the stricter of the two methods.",
      example: "A bond a desk actively quotes, trades, and hedges daily belongs in the trading book and gets marked to market with FRTB market-risk capital rules; the same bond, if bought by the bank's treasury with the stated intent to hold to maturity and never actively risk-managed, belongs in the banking book under credit-risk capital rules — the dual test (can trade it AND is actively managing it) is what forces a bank to prove BOTH, not just claim an 'intent to trade.'",
      related: [{ r: 39, label: "R39 — securitization assets straddle this classification question" }]
    },
    {
      name: "Backtesting and P&L attribution under FRTB",
      def: "Stressed ES itself is NOT backtested (the extreme conditions it targets won't recur with predictable frequency, and ES is inherently harder to backtest than VaR) — instead, VaR is still backtested (1-day horizon, latest 12 months, at 99% or 97.5% confidence).",
      example: "More than 12 exceptions at 99%, or more than 30 at 97.5%, forces a bank onto the standardized approach. Separately, profit and loss attribution compares actual P&L to the risk model's predicted P&L using two ratios built from D (the difference between actual and model P&L on a given day) and A (the actual P&L on that day): the ratio D/A should stay within ±10%, and the ratio Var(D)/Var(A) should stay under 20%; four or more breaches of EITHER ratio in a rolling 12 months again forces the standardized approach.",
      pitfall: "Two SEPARATE audit mechanisms coexist: backtesting (exception counting, inherited from R4) and P&L attribution (a NEW FRTB-specific test comparing actual vs. risk-model P&L). Don't merge them into one test — a bank can fail one, both, or neither independently, and each has its own separate breach-count threshold.",
      related: [{ r: 4, label: "R4 — the backtesting machinery this reading extends" }],
      memory: "Two audits: backtesting counts exceptions (like R4); P&L attribution checks whether the model's OWN P&L story matches the actual desk's."
    },
    {
      name: "Credit risk and securitizations under FRTB",
      def: "The incremental risk charge (IRC, from Basel II.5) addresses two distinct risks: credit spread risk (mark-to-market impact of spread changes, handled via ES) and jump-to-default risk (measured via 99% VaR, one-year horizon).",
      intuition: "Credit spread risk is continuous — a bond's spread widens or tightens gradually day to day, so it behaves like an ordinary market-risk factor and can be captured with the same ES machinery used elsewhere in FRTB. Jump-to-default risk is fundamentally different: default is a discrete, binary event (the issuer either defaults or it doesn't), so the smooth, continuous-distribution logic behind ES doesn't fit it well — instead it gets its own dedicated VaR-style charge at a very high confidence level and a full one-year horizon, reflecting that default risk needs to be measured over a much longer window than day-to-day market moves. Under IRC, the bank is also allowed to assume a 'constant level of risk': if a position deteriorates, the model assumes it gets replaced by an equivalent new position (e.g., a defaulted A-rated bond's exposure is assumed replaced by another A-rated bond) rather than the exposure simply vanishing — a simplifying assumption.",
      example: "For securitized products (asset-backed securities and collateralized debt obligations), Basel II.5 had introduced the comprehensive risk measure (CRM) charge, which let banks use their OWN internal models — and because different banks' internal models produced very different capital numbers for economically similar exposures, this created large, hard-to-justify variation in capital across banks. FRTB responds by moving securitizations to a single standardized approach instead of bank-specific internal models, trading away some risk-sensitivity for comparability across the industry.",
      pitfall: "Don't merge the '97.5% ES for general market risk' framework with the '99% VaR for jump-to-default' framework — they are two DIFFERENT measures, at two DIFFERENT confidence levels, for two conceptually different risks (continuous spread risk vs. discrete default risk), coexisting within the same overall FRTB capital calculation. Securitizations move from bank-specific internal models (which created large cross-bank capital variation under Basel II.5's CRM charge) to a single standardized approach under FRTB.",
      related: [{ r: 26, label: "R26 — credit VaR's own confidence-level and horizon choices" }],
      memory: "Spread risk is continuous and gets ES; default is a discrete jump and gets its own 99% VaR — different risks, different rulers."
    }
  ],

  connections: {
    from: [
      { r: 1, why: "ES was defined here specifically to fix VaR's tail-blindness; FRTB makes that fix regulatory law." },
      { r: 4, why: "Backtesting weaknesses directly shape FRTB's specific backtesting AND P&L attribution rules." },
      { r: 6, why: "VaR's non-subadditivity is the single biggest theoretical argument FRTB acts on by replacing VaR with ES." }
    ],
    to: [],
    confused: [
      { what: "Backtesting vs P&L attribution", how: "Backtesting counts VaR exceptions (inherited from R4's framework); P&L attribution is a NEW, separate FRTB test comparing the risk model's predicted P&L to the desk's actual P&L (via the D/A ratio and variance ratio)." },
      { what: "97.5% ES (general market risk) vs 99% VaR (jump-to-default)", how: "Two entirely separate measures within FRTB, for two conceptually different risk types — continuous spread risk (ES) vs discrete default risk (VaR) — never merge them into one number." },
      { what: "Liquidity horizon waterfall vs simple horizon scaling", how: "FRTB's \\(ES_{1}\\) through \\(ES_{5}\\) waterfall holds different risk-factor categories fixed at different stages, then combines via \\(\\sqrt{t}\\)-style scaling — a genuinely more granular version of R1's simple single-horizon scaling." },
      { what: "Basel II.5's stressed VaR add-on vs FRTB's stressed ES", how: "Basel II.5 ADDED a 250-day stressed VaR on top of the ordinary 10-day 99% VaR (two measures). FRTB REPLACES both of those with a single 97.5% ES computed over a stressed 250-day window (one measure) — FRTB does not add a third layer." }
    ]
  },

  misconceptions: [
    { wrong: "\"FRTB simply swaps the word VaR for ES everywhere, with no other changes.\"", right: "FRTB is a comprehensive overhaul: multi-horizon liquidity waterfalls, new trading-book/banking-book classification rules, P&L attribution (an entirely new test), and a separate 99% VaR jump-to-default charge alongside the 97.5% ES general market risk charge." },
    { wrong: "\"Stressed ES gets backtested the same way regular VaR does.\"", right: "Stressed ES is explicitly NOT backtested (its extreme conditions won't recur with testable frequency) — ordinary VaR is still what gets backtested, at 99% or 97.5% confidence over the latest 12 months." },
    { wrong: "\"P&L attribution and backtesting are the same test with different names.\"", right: "They are two separate, coexisting audits: backtesting counts exception days against VaR; P&L attribution compares the risk model's overall predicted P&L to the desk's actual P&L via the D/A ratio and variance ratio." },
    { wrong: "\"Once an asset is classified into the trading book, banks can freely reclassify it later for capital advantage.\"", right: "Reclassification is heavily restricted to extraordinary circumstances only — specifically to prevent the regulatory arbitrage of moving assets between books for favorable capital treatment. Even then, any capital benefit from the new classification is disallowed." },
    { wrong: "\"FRTB requires adding a stressed VaR measure on top of the expected shortfall calculation, just like Basel II.5 did.\"", right: "FRTB does NOT add a stressed VaR alongside ES — it eliminates the separate stressed-VaR add-on that Basel II.5 introduced and replaces the whole VaR + stressed-VaR pairing with one stressed Expected Shortfall measure." }
  ],

  highYield: [
    { stars: 5, what: "The $950M motivating example: why VaR reads $0 while ES reads $380M.", why: "The single clearest illustration of the entire book's central theme (VaR's tail-blindness) — extremely likely to reappear as a numeric or conceptual question, often with reworded portfolio size and default probability." },
    { stars: 5, what: "Liquidity horizons (10/20/40/60/120 days) and the \\(ES_{1}-ES_{5}\\) waterfall logic.", why: "FRTB's signature structural innovation; frequently tested as 'what does each ES_k hold fixed.'" },
    { stars: 4, what: "Backtesting (99%/97.5%, 12/30 exception limits) vs P&L attribution (±10% D/A, 20% variance ratio) as two separate audits.", why: "A precise, easily conflated pair of rules — GARP tests the distinction directly." },
    { stars: 4, what: "97.5% ES (general market risk) vs 99% VaR (jump-to-default) as separate, coexisting measures.", why: "The 'don't merge these two frameworks' trap is explicitly flagged and reliably tested." },
    { stars: 3, what: "Trading book vs banking book dual classification test and reclassification restrictions.", why: "A clean two-part conceptual rule with a clear regulatory-arbitrage rationale." },
    { stars: 3, what: "What FRTB actually replaced: Basel I's 10-day 99% VaR and Basel II.5's added 250-day stressed VaR, both collapsed into one 97.5% stressed ES.", why: "A classic 'which statement is INCORRECT' question format — distractors claim FRTB adds a stressed VaR rather than replacing the whole VaR pairing." }
  ],

  recall: [
    { q: "Walk through why the $950M portfolio example gives VaR = $0 at 95% confidence despite a real risk of catastrophic loss.", a: "The annual default probability is 2%, which is below the 5% tail cutoff at 95% confidence — so the 95th percentile loss outcome falls in the 'no default' scenario, giving VaR = $0. ES, by averaging over the WHOLE tail (including the 2% default scenario), correctly captures the 40% conditional loss probability × $950M = $380M expected tail loss." },
    { q: "What does \\(ES_{3}\\) specifically hold fixed and shock, in the FRTB liquidity-horizon waterfall?", a: "\\(ES_{3}\\) holds liquidity categories 1 and 2 fixed (not re-shocked) while shocking categories 3, 4, and 5 — each successive ES_k in the waterfall retires an earlier, shorter-horizon category from being re-shocked, reflecting that its risk has already been captured at its own (shorter) horizon." },
    { q: "A bank has 15 VaR exceptions at 99% confidence over the past 12 months, and its P&L attribution D/A ratio is within ±10%. What happens?", a: "15 exceptions exceeds the 12-exception limit at 99% confidence, so the bank is forced onto the standardized approach for backtesting purposes — regardless of the P&L attribution result, since these are two separate, independently-failing tests." },
    { q: "Why does FRTB use a 99% VaR (not ES) specifically for jump-to-default risk, separate from the 97.5% ES general market risk charge?", a: "Default is a discrete, binary jump event rather than a continuous mark-to-market process — a fundamentally different risk shape than spread risk. FRTB deliberately keeps these as two separate measures at two separate confidence levels rather than forcing one framework to describe both risk types." },
    { q: "What exactly did Basel II.5 add on top of Basel I's market risk capital calculation, and what does FRTB do with that addition?", a: "Basel II.5 added a 250-day stressed VaR alongside the existing 10-day 99% VaR, requiring banks to self-select a historically painful 250-day window for their current portfolio. FRTB eliminates this two-measure pairing entirely and replaces it with a single 97.5% Expected Shortfall computed over a stressed 250-day window." },
    { q: "An asset is currently booked in the trading book. Under what circumstances can a bank reclassify it into the banking book, and what happens to any resulting capital benefit?", a: "Reclassification is allowed only under extraordinary circumstances, such as a firm-wide shift in accounting practices — not at the bank's discretion for capital-optimization reasons. Even when reclassification is permitted, any capital reduction that would result from the new classification is disallowed; the bank must continue computing capital using the stricter of the original or new method." }
  ],

  hooks: [
    { title: "The $950M reveal", text: "VaR says $0. ES says $380M. Same portfolio, same day — this single number pair is the entire book's argument for ES, compressed into one memorable example." },
    { title: "The waterfall", text: "\\(ES_{1}\\) shocks everything. \\(ES_{2}\\) 'retires' the fastest-moving category and shocks the rest. \\(ES_{3}\\) retires two, shocks the remaining three. Each step peels off a faster liquidity horizon like a waterfall dropping down a level." },
    { title: "Two report cards", text: "Backtesting is the exception-count report card (inherited from R4). P&L attribution is a NEW, separate report card asking 'does the model's whole P&L story match reality?' Two report cards, two ways to fail." },
    { title: "Subtract, don't add", text: "Basel I: 10-day 99% VaR. Basel II.5: that PLUS a 250-day stressed VaR (addition). FRTB: BOTH torn out and replaced by one 97.5% stressed ES (subtraction, then substitution) — the exam trap is assuming FRTB just adds a third layer." }
  ],

  breakdown: [
    {
      title: "The evolution of market risk capital: Basel I → Basel II.5 → FRTB",
      points: [
        "Basel I: a 10-day, 99% confidence VaR, calculated from a recent (roughly 1-4 year) window of market data — 'current' but blind to how bad the tail could get and blind to historically severe conditions outside that recent window.",
        "Basel II.5 (post-2008): kept the 10-day 99% VaR and ADDED a second, separate measure — a 250-day stressed VaR, computed over a self-selected historically difficult 250-day window — to force banks to also account for crisis-level conditions.",
        "FRTB: REPLACES both Basel I's ordinary VaR and Basel II.5's stressed-VaR add-on with a single measure — 97.5% confidence Expected Shortfall, computed over a stressed 250-day window — collapsing a two-measure system into one more informative measure."
      ]
    },
    {
      title: "The five FRTB liquidity-horizon categories",
      points: [
        "Category 1 — 10-day horizon: the most liquid risk factors (e.g. large-cap equity); can realistically be exited in about two weeks even under stress.",
        "Category 2 — 20-day horizon: e.g. investment-grade sovereign credit spreads; roughly one month to unwind without moving the price.",
        "Category 3 — 40-day horizon: intermediate liquidity risk factors between the 20- and 60-day categories.",
        "Category 4 — 60-day horizon: e.g. non-investment-grade corporate credit spreads; roughly one quarter (three months) to unwind in stressed conditions.",
        "Category 5 — 120-day horizon: the least liquid risk factors; roughly six months required to exit a position without moving the market against yourself."
      ]
    },
    {
      title: "The five nested ES shocks in the IMA waterfall",
      points: [
        "\\(ES_{1}\\): 10-day shock applied to ALL risk-factor categories (1 through 5) simultaneously — nothing held fixed.",
        "\\(ES_{2}\\): 10-day shock applied to categories 2 through 5; category 1 held fixed (its shorter-horizon risk is already captured).",
        "\\(ES_{3}\\): 10-day shock applied to categories 3 through 5; categories 1 and 2 held fixed.",
        "\\(ES_{4}\\): 10-day shock applied to categories 4 and 5; categories 1 through 3 held fixed.",
        "\\(ES_{5}\\): 10-day shock applied to category 5 only; categories 1 through 4 held fixed.",
        "Overall liquidity-adjusted ES: the five components are combined via a square-root-of-sum-of-squares formula, scaled by the differences between successive liquidity horizons — the same √t logic used to scale VaR across horizons in Reading 1."
      ]
    },
    {
      title: "The four separate FRTB checks running alongside the capital number",
      points: [
        "Trading book vs. banking book classification: dual test — the bank must be ABLE to trade the asset, AND the trading desk must actively manage its risk; reclassification afterward is heavily restricted.",
        "Backtesting: ordinary VaR (not stressed ES) is backtested over a 1-day horizon using the latest 12 months, at 99% or 97.5% confidence; more than 12 exceptions (99%) or 30 exceptions (97.5%) forces the standardized approach.",
        "P&L attribution: compares actual vs. model P&L via the D/A ratio (should stay within ±10%) and the Var(D)/Var(A) ratio (should stay under 20%); four or more breaches in 12 months forces the standardized approach.",
        "Credit risk and securitizations: the incremental risk charge splits credit spread risk (handled via ES) from jump-to-default risk (its own 99% VaR, one-year horizon); securitizations move from bank-specific internal models to a single standardized approach."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank holds an $825 million bond portfolio with a 3% annual probability of default. In the bad tail, 3-in-5 sub-scenarios result in a total loss of the portfolio and 2-in-5 result in $0 loss. What are the 95% VaR and 95% ES?",
      options: [
        "VaR = $0; ES = $495 million",
        "VaR = $495 million; ES = $0",
        "VaR = $0; ES = $0",
        "VaR = $247.5 million; ES = $495 million"
      ],
      answer: 0,
      why: "A 3% default probability is below the 5% tail cutoff at 95% confidence, so the 95th-percentile loss outcome still falls in the 'no default' bucket — VaR = $0, exactly as in the canonical $950M/2% example. ES instead averages across the whole tail: 3-in-5 of the tail's sub-scenarios are a total loss, so ES = 3/5 × $825M = $495M. The tempting distractor (the 'VaR = $495 million; ES = $0' answer) simply swaps which number is $0, forgetting that it's VaR — the threshold-crossing measure — that reads zero, not ES."
    },
    {
      q: "What did Basel II.5 add to Basel I's market risk capital framework, and what does FRTB do with that addition?",
      options: [
        "Basel II.5 added a stressed VaR alongside the ordinary VaR; FRTB removes both and replaces them with a single stressed Expected Shortfall measure",
        "Basel II.5 added Expected Shortfall alongside VaR; FRTB removes the VaR component and keeps only ES",
        "Basel II.5 added a third liquidity-horizon dimension; FRTB keeps Basel II.5's stressed VaR and adds ES on top",
        "Basel II.5 introduced backtesting; FRTB introduced P&L attribution as a further addition on top of Basel II.5's unchanged VaR framework"
      ],
      answer: 0,
      why: "Basel II.5 bolted a 250-day stressed VaR onto Basel I's existing 10-day 99% VaR, creating a two-measure system. FRTB does not stack a third layer on top — it eliminates that whole VaR-plus-stressed-VaR pairing and replaces it with one measure: 97.5% ES computed over a stressed 250-day window. The 'Basel II.5 keeps its stressed VaR and FRTB adds ES on top' answer is the classic trap: it assumes FRTB is purely additive, when its central design move is a replacement, not an addition."
    },
    {
      q: "In the FRTB internal models-based approach (IMA) liquidity-horizon waterfall, what does \\(ES_{4}\\) hold fixed and what does it shock?",
      options: [
        "Holds nothing fixed; shocks all five categories",
        "Holds categories 1, 2, and 3 fixed; shocks categories 4 and 5",
        "Holds categories 1 through 4 fixed; shocks only category 5",
        "Holds category 4 fixed; shocks categories 1, 2, 3, and 5"
      ],
      answer: 1,
      why: "The waterfall structure retires one more category from being re-shocked at each step: \\(ES_{1}\\) shocks all five, \\(ES_{2}\\) holds category 1 fixed and shocks 2–5, \\(ES_{3}\\) holds 1–2 fixed and shocks 3–5, \\(ES_{4}\\) holds 1–3 fixed and shocks only 4–5, and \\(ES_{5}\\) holds 1–4 fixed and shocks only category 5. The 'holds 1 through 4 fixed, shocks only category 5' answer describes \\(ES_{5}\\), not \\(ES_{4}\\) — a common off-by-one trap when memorizing the waterfall."
    },
    {
      q: "A bank's VaR backtesting shows 8 exceptions at 99% confidence over the past 12 months (within limits), but its P&L attribution shows the Var(D)/Var(A) ratio exceeding 20% on 5 separate months during that period. What is the correct conclusion?",
      options: [
        "The bank passes overall, since its backtesting exception count is within the 12-exception limit",
        "The bank is forced onto the standardized approach, because P&L attribution failed independently — 5 breaches exceeds the 4-breach limit — even though backtesting passed",
        "The two results must be averaged; since backtesting passed comfortably, the overall verdict is a pass",
        "P&L attribution results only matter if backtesting also fails, so the bank passes"
      ],
      answer: 1,
      why: "Backtesting and P&L attribution are two entirely separate, independently-failing audits. The bank's 8 exceptions stay under the 12-exception limit at 99% confidence, so backtesting passes on its own — but P&L attribution's variance-ratio breach count (5) exceeds the 4-breach threshold, which alone forces the standardized approach. The distractors all incorrectly assume the two tests get merged or that one can 'rescue' the other — they cannot; failing either one independently triggers the standardized approach."
    },
    {
      q: "Under FRTB's treatment of credit risk, why is jump-to-default risk measured using a 99% VaR with a one-year horizon rather than the 97.5% Expected Shortfall used for general market risk?",
      options: [
        "Because jump-to-default risk is always smaller in dollar terms and needs a less conservative measure",
        "Because default is a discrete, binary event rather than a continuous mark-to-market process, so it is measured with a separate, dedicated framework rather than forced into the continuous-ES machinery",
        "Because regulators consider jump-to-default risk irrelevant for capital purposes and use VaR only as a formality",
        "Because 97.5% ES cannot mathematically be computed for credit-related risk factors"
      ],
      answer: 1,
      why: "Credit spread risk moves continuously day to day and fits naturally into the same ES framework used for general market risk. Default, in contrast, is a discrete jump — the issuer either defaults or does not — so FRTB deliberately keeps it as a separate charge (99% VaR, one-year horizon) rather than blending it into the continuous ES calculation. The 'always smaller in dollar terms' answer is wrong on the facts (jump-to-default losses can be severe, not smaller), and the 'irrelevant/formality' and 'ES cannot be computed' answers misstate the framework — both risks are taken seriously and ES computation is not the obstacle."
    },
    {
      q: "Which of the following is the correct dual test the FRTB uses to classify an asset into the trading book (rather than the banking book)?",
      options: [
        "The bank must intend to trade the asset AND the asset must be investment grade",
        "The bank must be able to actually trade the asset AND the trading desk must actively manage its risk",
        "The asset must be marked to market AND held for more than one year",
        "The bank must hold the asset to maturity AND report it at amortized cost"
      ],
      answer: 1,
      why: "FRTB's trading-book test requires proving more than mere intent: (1) the bank must genuinely be able to trade the asset, and (2) the trading desk must physically manage its risk day to day. The 'intent to trade AND investment grade' answer's reliance on mere intent is exactly what pre-FRTB rules allowed and what enabled regulatory arbitrage — FRTB deliberately raised the bar past intent. The 'held to maturity AND amortized cost' answer describes banking-book, not trading-book, treatment."
    }
  ],

  sources: [
    { title: "Fundamental review of the trading book (Basel Committee, BIS)", url: "https://www.bis.org/bcbs/publ/d457.htm", note: "The actual 2019 finalized FRTB standard text — liquidity horizons, the internal models approach, backtesting, and P&L attribution rules in full regulatory detail." },
    { title: "Expected shortfall — Wikipedia", url: "https://en.wikipedia.org/wiki/Expected_shortfall", note: "Background on the ES statistic itself, including the closed-form normal-distribution formula used in the VaR-vs-ES equivalence formula on this page." },
    { title: "Basel III: international regulatory framework for banks — Bank for International Settlements", url: "https://www.bis.org/bcbs/basel3.htm", note: "Where FRTB sits within the broader Basel III capital framework, for context on how the trading-book rules interact with overall bank capital requirements." },
    { title: "Value at risk — Investopedia", url: "https://www.investopedia.com/terms/v/var.asp", note: "A refresher on VaR itself before contrasting it with FRTB's shift to Expected Shortfall." }
  ],

  pdf: { book: 1, query: "In May 2012, the Basel Committee on Banking Supervision began considering" },

  summary: `<p>FRTB is the regulatory capstone cashing in every Book 1 thread. <strong>Motivating case</strong>: 2% default prob portfolio → \\(VaR_{95\\%}\\)=$0, ES=$380M — VaR's tail-blindness (R1, R6) made concrete. <strong>What changed</strong>: Basel I's 10-day 99% VaR, plus Basel II.5's added 250-day stressed VaR, are BOTH replaced (not supplemented) by a single 97.5% stressed ES. <strong>Liquidity horizons</strong>: 10/20/40/60/120 days replace one horizon; IMA computes \\(ES_{1}-ES_{5}\\) waterfall, \\(\\sqrt{t}\\)-scaled. <strong>Trading vs banking book</strong>: dual test (can trade + actively managed); reclassification heavily restricted (anti-arbitrage), and any capital benefit from reclassifying is disallowed. <strong>Backtesting</strong> (VaR exceptions, 99%/97.5%, 12/30 limits) is SEPARATE from <strong>P&L attribution</strong> (D/A ratio ±10%, variance ratio <20%) — two independent audits, either of which alone can force the standardized approach. <strong>Credit risk</strong>: 97.5% ES for spread risk vs 99% VaR (1-year) for jump-to-default — two different measures for two different risk shapes; securitizations move from bank-specific internal models to a standardized approach.</p>`
});
