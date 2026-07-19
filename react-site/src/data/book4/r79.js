export default ({
  book: 4, reading: 79,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Risk Management for Changing Interest Rates: Asset-Liability Management and Duration Techniques",
  tagline: "Two complementary tools: IS (interest-sensitive) gap protects net interest income/margin; duration gap protects net worth (equity value). Know both formulas, both sign conventions, and both limitations cold.",

  teaches: `<p>NIM and the IS gap, change in NII from a rate change, duration-based price change, the leverage-adjusted duration gap, and the limitations of each tool.</p>
  <p>More specifically: what <strong>asset-liability management (ALM)</strong> is and who runs it (the <strong>ALCO</strong>, the asset-liability committee); the four-step process banks use to build an IS-gap report bucket by bucket; how to translate a bucket's IS gap into a dollar change in net interest income (NII) for a given rate move; how to estimate the duration of a whole portfolio as a value-weighted average of the durations of its pieces, and use that to estimate a dollar change in market value; and why matching asset duration to liability duration (D<sub>A</sub>=D<sub>L</sub>) is the wrong target once you remember that a solvent bank's assets are worth more dollars than its liabilities — you instead need the <strong>leverage-adjusted duration gap</strong>.</p>`,

  why: `<p>This is a favorite reading for multi-part calculation questions. IS gap and duration gap answer genuinely DIFFERENT questions (income protection vs. net worth protection) and can point in seemingly opposite directions on the same balance sheet — both simultaneously correct.</p>`,

  intuition: `<p>Start with what a bank actually does economically: it borrows short (deposits, repo, fed funds) and lends long (mortgages, business loans, securities), pocketing the spread between what it earns on assets and what it pays on liabilities. That spread — <strong>net interest income (NII)</strong> — is interest income minus interest expense, and <strong>net interest margin (NIM)</strong> expresses it as a percentage of the earning assets that generated it. The bank's senior management team that oversees this entire balance sheet as one integrated system — deciding the volume, mix, and pricing of both assets and liabilities together, not asset decisions and liability decisions in separate silos — is the <strong>asset-liability committee (ALCO)</strong>, and this integrated discipline is called <strong>asset-liability management (ALM)</strong>. Within ALM, <strong>funds management</strong> is specifically the day-to-day work of deciding the volume, mix, and rates on both sides of the balance sheet, and managing the resulting revenues and costs to grow interest income while controlling interest expense.</p>
  <p>Two distinct kinds of interest-rate risk threaten this borrow-short-lend-long business. First, <strong>reinvestment risk</strong>: when a loan or security matures or reprices, the bank doesn't know in advance what rate it will earn (or pay) on the next round — if rates have fallen, it must reinvest at a lower yield. Second, <strong>price risk</strong> (also called market risk): when market rates rise, the present value of the bank's existing fixed-rate assets and liabilities falls, because their fixed coupon/payment streams are now worth less discounted at a higher rate. IS gap analysis is built to manage the NII side of this problem (closely related to reinvestment risk); duration gap analysis is built to manage the net-worth side (price risk).</p>
  <p>IS gap asks: if rates change, does my net interest INCOME change? Positive gap (more rate-sensitive assets than liabilities) = asset sensitive = NII rises when rates rise. Negative gap = liability sensitive = NII falls when rates rise.</p>
  <p>Duration gap asks a different question: if rates change, does my NET WORTH (equity value) change? To fully insulate net worth, a bank needs DA = (TL/TA)×DL — NOT simply DA=DL, because assets almost always exceed liabilities (positive equity), so equal percentage value changes on unequal dollar bases still move net worth. A typical bank (long-duration mortgages, short-duration deposits) has a NEGATIVE IS gap (liability sensitive) AND a POSITIVE duration gap (assets exposed more than liabilities) — these two gaps point in seemingly opposite directions, and BOTH are simultaneously correct, because they're answering different questions (income vs. net worth).</p>`,

  eli5: `<p>Imagine you run a lemonade stand where you borrowed money from your little sibling (who can ask for it back any afternoon, "short-term, variable rate") to buy a big batch of lemons under a fixed-price, six-month supply contract ("long-term, fixed rate"). If the going interest rate your sibling could get elsewhere jumps, they'll demand more interest from you right away — your cost goes up immediately — while your lemon contract is locked in and doesn't reprice for six months. Your weekly profit (this week's lemonade sales minus this week's interest paid to your sibling) can get squeezed even though your total pile of assets (lemons plus stand plus cash) might still be worth more than what you owe. That weekly-profit squeeze is what <strong>IS gap</strong> tracks (it's negative for you, since your liability — the sibling loan — reprices faster than your asset — the lemon contract), while the change in what your whole lemonade business would sell for today if you totaled it all up and paid off the loan is what <strong>duration gap</strong> tracks — and, just like a bank, these two numbers don't have to move together.</p>`,

  thinkLike: `<p>A bank risk manager treats the balance sheet as two coupled but separate risk exposures, and never collapses them into one number. When asked "are we exposed to rising rates?" the correct professional answer is always "exposed on which dimension" — income over the next few quarters (IS gap), or economic net worth today (duration gap)? A trading desk or ALCO member confident in a rate call will deliberately widen the IS gap toward asset- or liability-sensitivity to profit from that view (the gap is a lever, not just a passive risk report), while simultaneously monitoring the duration gap so that an income bet doesn't quietly blow up the bank's capital base.</p>
  <p>On the exam, GARP tests this reading almost entirely through multi-part numeric problems (compute NIM, compute a bucket's IS gap, compute ΔNII, compute portfolio duration, compute the leverage-adjusted duration gap) chained to one or two "what does the sign mean" conceptual traps. The single most heavily tested trap is exactly the ELI5 scenario above: a bank can show a negative IS gap and a positive duration gap on the very same balance sheet at the very same time, and the exam will present this as if it "must be an error" — it isn't. The second most common trap is assuming D_A=D_L insulates net worth; watch for any question that gives you total assets ≠ total liabilities and asks about "immunizing net worth" — that is your cue to use the leverage-adjusted formula, not simple duration matching.</p>`,

  visual: `<div class="widget" data-widget="gap"></div>`,

  formulas: [
    {
      name: "Net interest margin",
      math: "\\text{NIM} = \\dfrac{\\text{NII}}{\\text{Earning Assets}};\\quad \\text{NII} = \\text{Interest Income} - \\text{Interest Expense}",
      note: "Assets=$50B, earning assets=$45B, int. income=$4B, int. expense=$2.2B → NIM=(4−2.2)/45=4.00%.",
      plain: "NIM says: out of every dollar of assets that actually earns interest, how many cents are left over as net interest income after the bank pays interest on its own borrowing.",
      derivation: `<p>Start from the two income-statement lines a bank reports: interest income (what it earns on loans and securities) and interest expense (what it pays on deposits, repo, and other borrowed funds).</p>
      \\[ \\text{NII} = \\text{Interest Income} - \\text{Interest Expense} = \\$4\\text{B} - \\$2.2\\text{B} = \\$1.8\\text{B} \\]
      <p>Then scale that dollar spread by the earning-asset base that produced it (not total assets, since some assets like cash reserves or premises earn no interest):</p>
      \\[ \\text{NIM} = \\dfrac{\\$1.8\\text{B}}{\\$45\\text{B}} = 4.00\\% \\]`
    },
    {
      name: "IS gap (per repricing bucket)",
      math: "\\text{IS gap} = \\text{IS Assets} - \\text{IS Liabilities}",
      note: "Positive = asset sensitive (rates↑→NII↑). Negative = liability sensitive (rates↑→NII↓). Zero = NII unaffected.",
      plain: "For a given time bucket (say, the next 30 days), IS gap is simply the dollar amount of assets that will reprice in that window minus the dollar amount of liabilities that will reprice in that same window."
    },
    {
      name: "Change in NII from a rate change",
      math: "\\Delta \\text{NII} = \\Delta \\text{rate} \\times \\text{IS gap}",
      note: "0-30 day bucket gap=−700: +1%→\\(\\Delta \\text{NII}=-\\)$7.00. 31-90 day bucket gap=+900: +1%→\\(\\Delta \\text{NII}=+\\)$9.00.",
      plain: "This says the change in net interest income from a rate move is just the size of the rate move times the dollar gap in that bucket — bigger gap or bigger rate move, bigger swing in NII.",
      derivation: `<p>If all rates in a bucket move by the same amount \\( \\Delta \\text{rate} \\), interest income on the repricing assets and interest expense on the repricing liabilities both shift by that same rate change:</p>
      \\[ \\Delta(\\text{Interest Income}) = \\Delta \\text{rate} \\times \\text{IS Assets}, \\qquad \\Delta(\\text{Interest Expense}) = \\Delta \\text{rate} \\times \\text{IS Liabilities} \\]
      <p>Subtracting gives the change in NII, and factoring out \\( \\Delta \\text{rate} \\) recovers the IS gap:</p>
      \\[ \\Delta \\text{NII} = \\Delta \\text{rate} \\times \\text{IS Assets} - \\Delta \\text{rate} \\times \\text{IS Liabilities} = \\Delta \\text{rate} \\times (\\text{IS Assets} - \\text{IS Liabilities}) = \\Delta \\text{rate} \\times \\text{IS gap} \\]
      <p>This is exactly why the formula is only an approximation: it assumes every repricing asset and every repricing liability in the bucket moves by the identical \\( \\Delta \\text{rate} \\), which real banks address only partially with a weighted IS gap.</p>`
    },
    {
      name: "Duration-based % price change",
      math: "\\dfrac{\\Delta(\\text{Value})}{\\text{Value}} \\approx -D \\times \\Delta i",
      note: "D≈5.28, \\(\\Delta i=0.5\\)%, $250M assets → \\(\\Delta \\text{Value}\\approx -\\)$6.6 million.",
      plain: "This is the first-order (linear) approximation of how much a bond's or a portfolio's market value moves for a given change in yield, where duration D is the sensitivity slope: bigger duration, bigger percentage price swing per unit of rate change.",
      derivation: `<p>Portfolio duration is first estimated as the market-value-weighted average of the durations of the individual assets held (each asset's share of total portfolio value times its own duration, summed across assets) — this is why a bank with $250 million in assets and a computed portfolio duration of D≈5.28 can treat the whole book as if it were a single security with that duration.</p>
      <p>Applying the duration formula to a discount-rate move from 2.5% to 3.0% (\\( \\Delta i = 0.5\\% \\)):</p>
      \\[ \\dfrac{\\Delta(\\text{Value})}{\\text{Value}} \\approx -5.28 \\times 0.005 = -2.64\\% \\]
      <p>Then convert the percentage change to a dollar change using the portfolio's starting value:</p>
      \\[ \\Delta(\\text{Value}) \\approx -0.0264 \\times \\$250\\text{M} = -\\$6.6\\text{ million} \\]`
    },
    {
      name: "Leverage-adjusted duration gap",
      math: "D_{\\text{gap}} = D_A - \\dfrac{\\text{Total Liabilities}}{\\text{Total Assets}}\\times D_L",
      note: "To fully insulate net worth: D_A = (TL/TA)×D_L, NOT simply D_A=D_L.",
      plain: "This measures how much more (or less) dollar-weighted interest-rate exposure sits on the asset side of the balance sheet than on the liability side, after adjusting for the fact that liabilities are a smaller pile of dollars than assets whenever the bank has positive equity.",
      derivation: `<p>Start from the dollar (not percentage) change in each side of the balance sheet, using the duration approximation on assets (value A) and liabilities (value L) separately:</p>
      \\[ \\Delta A \\approx -D_A \\times \\Delta i \\times A, \\qquad \\Delta L \\approx -D_L \\times \\Delta i \\times L \\]
      <p>Net worth is equity, \\( E = A - L \\), so its change is the difference of the two dollar changes:</p>
      \\[ \\Delta E = \\Delta A - \\Delta L \\approx -\\Delta i \\times (D_A \\times A - D_L \\times L) \\]
      <p>Factor out total assets \\(A\\) to express the bracket in duration units instead of dollars:</p>
      \\[ \\Delta E \\approx -\\Delta i \\times A \\times \\left( D_A - \\dfrac{L}{A} \\times D_L \\right) = -\\Delta i \\times A \\times D_{\\text{gap}} \\]
      <p>Net worth is unaffected only when the bracketed term — the leverage-adjusted duration gap — is zero, which requires \\( D_A = \\dfrac{TL}{TA} \\times D_L \\), not the naive \\( D_A = D_L \\).</p>`
    }
  ],

  concepts: [
    {
      name: "Asset-liability management (ALM) and the ALCO",
      def: "ALM is the integrated management of both sides of a bank's balance sheet — assets and liabilities managed jointly for profitability and risk, not separately. The asset-liability committee (ALCO), made up of senior management from across the institution, runs this process; the specific day-to-day work of setting the volume, mix, and rates of assets and liabilities (and managing the revenue/cost they generate) is called funds management.",
      intuition: "A bank can't just decide what loans to make and separately decide what deposits to take — the two decisions have to be made together, because it's the SPREAD and the MISMATCH between them that create both the bank's profit and its risk.",
      example: "A bank funding long-term, fixed-rate mortgages with short-term fed funds borrowing profits from an upward-sloping yield curve (mortgage yield > fed funds cost) in normal times — but that same structural mismatch is the source of both its IS gap and duration gap exposure.",
      related: []
    },
    {
      name: "Two kinds of interest rate risk: reinvestment risk and price risk",
      def: "Reinvestment risk is uncertainty about the rate a bank will earn (or pay) when a maturing or repricing asset/liability rolls over. Price risk (market risk) is the change in the present value of existing fixed-rate assets/liabilities when market rates change — rising rates lower the value of fixed-income securities and fixed-payment loans.",
      pitfall: "IS gap analysis is the tool built for reinvestment/income risk; duration gap analysis is the tool built for price/net-worth risk. Confusing which tool addresses which risk is a common exam trap.",
      related: []
    },
    {
      name: "NIM and the IS gap",
      def: "NIM = NII/earning assets. IS gap = IS assets − IS liabilities (per repricing bucket).",
      pitfall: "Positive IS gap = ASSET SENSITIVE (rates↑ → NII/NIM↑; rates↓ → NII/NIM↓). Negative IS gap = LIABILITY SENSITIVE (opposite). IS gap = 0 → NII/NIM unaffected by rate changes (under the simplifying assumption that all rates move together).",
      related: ["Change in NII from a rate change"]
    },
    {
      name: "Building an IS-gap report: the four-step process",
      def: "1) Select a series of repricing buckets (a day, a week, a month, a quarter, a year) based on when assets and liabilities will reprice — meaning either the interest rate on them changes to the current market rate, or they mature. 2) Sort every asset and liability into the bucket matching when it reprices — e.g., how much in assets and how much in liabilities will reprice within the next 90 days. 3) Calculate the IS gap (IS assets − IS liabilities) separately within each bucket. 4) Use each bucket's IS gap, together with an assumed change in interest rates, to estimate the resulting change in NII and NIM.",
      intuition: "An instrument counts as rate-sensitive in a given bucket if it matures in that window, if it's a variable-rate instrument that resets in that window, or if it's expected (though not certain) to see prepayments or withdrawals in that window. Fixed-maturity securities and scheduled-reset variable-rate loans are easy to bucket; instruments with no stated maturity (like demand deposits) or uncertain prepayment behavior are hard to bucket, and the bank must estimate their effective repricing behavior — e.g., noninterest-bearing checking balances aren't directly rate-sensitive, but their dollar volume can still shift as customers move funds to rate-sensitive alternatives like money market accounts when rates change.",
      related: []
    },
    {
      name: "Change in NII from a rate change",
      def: "\\(\\Delta NII\\) = \\(\\Delta rate\\) × IS gap.",
      example: "0-30 day bucket IS gap=−700 (liability sensitive): +1% rate move → \\(\\Delta NII=0.01\\times (- 700)=-\\)$7.00 (bucket NII falls from $134.50 to $127.50). 31-90 day bucket IS gap=+900 (asset sensitive): +1%→\\(\\Delta NII=0.01\\times 900=+\\)$9.00 (bucket NII rises from $118.50 to $127.50). This example also has a 91-365 day bucket and an over-365-day bucket each with a gap of −100. If the CUMULATIVE IS gap across all buckets is zero and all rates move in lockstep, overall NII is unaffected.",
      pitfall: "Relative gap = IS gap/total assets. Interest sensitivity ratio (ISR) = IS assets/IS liabilities. A bank confident in its rate forecast may DELIBERATELY skew the IS gap toward asset- or liability-sensitivity to profit from the expected move — the gap is a RISK-MANAGEMENT LEVER, not just a passive risk measure. Banks can shift the mix of assets/liabilities within each bucket, or use derivatives such as interest rate futures or swaps, to move the gap toward a target.",
      related: []
    },
    {
      name: "Duration and the leverage-adjusted duration gap",
      def: "\\(\\Delta (value)/value\\) ≈ \\(- D\\times \\Delta i\\). D_gap = D_A − (TL/TA)×D_L.",
      example: "A bank computes the market-value-weighted average duration of its individual assets (each asset's dollar share of the portfolio times its own duration, summed) to get a single portfolio duration, e.g. D≈5.28. For a discount-rate move from 2.5% to 3.0% (Δi=0.5%) applied to $250 million in assets: %Δvalue ≈ −5.28×0.005 = −2.64%, so Δvalue ≈ −0.0264×$250M = −$6.6 million. To fully insulate net worth from rate changes, a bank needs D_A = (TL/TA)×D_L — NOT simply D_A=D_L, because assets almost always exceed liabilities (positive equity), so equal percentage value changes on unequal dollar bases still move net worth. If assets equaled liabilities exactly, then simple duration matching (D_A=D_L) would work — but real banks are never funded 100% by liabilities.",
      pitfall: "Duration gap sign and its effect on net worth: zero → net worth insulated. Positive (typical bank: long-duration assets, short-duration liabilities) → net worth FALLS as rates rise (assets lose more value than liabilities). Negative → net worth RISES as rates rise (liabilities lose more value than assets). Duration itself is only a first-order (linear) approximation — a full treatment adds a convexity term for greater accuracy, especially for larger rate moves.",
      related: [],
      memory: "D_A=D_L is NOT the insulating condition — you need D_A=(TL/TA)×D_L, adjusted for the leverage between assets and liabilities."
    },
    {
      name: "ALCO's duration gap process",
      def: "Compute each asset/liability's duration, weight by market value, sum to portfolio durations, then compute the gap — and consider adding convexity for a better approximation on larger rate moves.",
      example: "Concretely, the ALCO: (1) calculates the duration of each loan, security, deposit, and money-market funding instrument on the balance sheet; (2) weights each of those durations by its market value; (3) sums the weighted durations separately for assets and for liabilities to get the portfolio-level D_A and D_L; then (4) plugs those into the leverage-adjusted duration gap formula. The larger the magnitude of the resulting duration gap, the greater the impact on net worth for a given change in rates — so a bank can deliberately restructure assets/liabilities, or use derivatives, to push the leverage-adjusted duration gap toward zero and insulate net worth.",
      related: []
    },
    {
      name: "Limitations of each tool",
      def: "IS gap: assumes all asset/liability rates move by the same amount (rarely true — addressed partially via a WEIGHTED IS gap with rate-sensitivity weights); repricing timing is often ambiguous (demand deposits/savings can reprice anytime at the bank's discretion); a zero cumulative gap can still mask real within-year NII volatility if repricing speeds differ across buckets. Duration gap: hard to define cash-flow patterns (and thus duration) for demand deposits/savings; prepayment uncertainty on loans; more accurate for SMALL rate changes only (convexity matters more for large moves); assumes a PARALLEL shift of a parallel yield curve (unrealistic when short/long rates diverge or the curve twists); duration itself shifts as rates change.",
      example: "The weighted IS gap fix, concretely: instead of treating every rate-sensitive dollar as equally sensitive, the bank assigns each instrument a weight reflecting how fast its rate actually moves relative to a market benchmark. The source gives real examples — the bank might apply a weight of 1.0 to fed-funds-rate-linked instruments (fully market driven, moves dollar-for-dollar with the benchmark), a weight of only 0.5 to savings account rates (banks are typically slow to raise these even when market rates rise, since the rate is changed at the bank's own discretion), and a weight as high as 1.4 to a highly volatile security whose rate overshoots the benchmark move. A second concrete example of the repricing-ambiguity limitation: a bank could hold variable-rate loans that reprice only annually, financed with short-term funds that reprice daily — the CUMULATIVE IS gap across the year could be exactly zero (looking fully immunized on paper), yet NII still swings meaningfully within the year because the funding cost adjusts to market rates far faster than the loan yield does.",
      pitfall: "A typical bank funding long-duration, fixed-rate mortgages with short-duration deposits/repos has a NEGATIVE IS gap (liability sensitive) AND a POSITIVE duration gap (long-duration assets exposed more) — these two gaps often point in seemingly 'opposite' directions on the same balance sheet, and BOTH are simultaneously correct. Don't assume IS gap sign and duration gap sign must match.",
      related: [{ r: 57, label: "R57 — IRRBB's embedded optionality, the same demand-deposit/prepayment challenge" }],
      memory: "IS gap protects income; duration gap protects net worth — a typical bank can be liability-sensitive (bad IS gap direction) AND have a positive duration gap (bad duration direction) at the SAME time, because they measure different things."
    }
  ],

  connections: {
    from: [
      { r: 66, why: "Duration-based immunization, previewed in the investment function reading, gets its full ALM treatment here." },
      { r: 57, why: "IRRBB's embedded optionality challenge (Book 3) is exactly the demand-deposit/prepayment problem this reading's duration gap wrestles with." }
    ],
    to: [
      { r: 80, why: "Illiquid asset return biases close the book with a portfolio-level lens, after this reading's bank-level ALM lens." }
    ],
    confused: [
      { what: "IS gap sign vs duration gap sign", how: "A typical bank is NEGATIVE IS gap (liability sensitive) AND POSITIVE duration gap (net worth falls with rising rates) SIMULTANEOUSLY — they measure different things (income vs. net worth) and don't need to point the same direction." },
      { what: "D_A=D_L vs the leverage-adjusted condition D_A=(TL/TA)×D_L", how: "Simple duration matching (D_A=D_L) does NOT insulate net worth, because assets exceed liabilities in dollar terms (positive equity) — the correct insulating condition adjusts for this leverage ratio." }
    ]
  },

  misconceptions: [
    { wrong: "\"Setting asset duration equal to liability duration (D_A=D_L) fully insulates a bank's net worth from rate changes.\"", right: "The correct insulating condition is D_A=(TL/TA)×D_L — because assets exceed liabilities (positive equity), equal percentage value changes on unequal dollar bases still move net worth. Simple D_A=D_L matching leaves net worth exposed." },
    { wrong: "\"A bank's IS gap and duration gap should always have the same sign, since they both describe interest rate risk.\"", right: "A typical bank (long-duration mortgages, short-duration deposits) has a NEGATIVE IS gap (liability sensitive) and a POSITIVE duration gap (net worth falls with rising rates) SIMULTANEOUSLY — the two measures answer different questions (income protection vs. net worth protection) and don't need to align in sign." },
    { wrong: "\"A zero cumulative IS gap across all repricing buckets guarantees NII is fully protected from rate changes.\"", right: "A zero cumulative gap can still mask real within-year NII volatility if repricing SPEEDS differ across buckets — offsetting positive and negative bucket gaps at different repricing timings don't guarantee smooth NII throughout the year." }
  ],

  highYield: [
    { stars: 5, what: "IS gap sign convention, \\(\\Delta NII=\\Delta rate\\times IS\\) gap, and full multi-bucket worked calculation.", why: "The most calculation-heavy formula in this reading — expect multi-part numeric questions." },
    { stars: 5, what: "Leverage-adjusted duration gap formula and why D_A=D_L does NOT insulate net worth.", why: "The single most important conceptual correction in this reading — a frequently tested trap." },
    { stars: 5, what: "The 'opposite-direction' trap: negative IS gap + positive duration gap simultaneously, both correct.", why: "Explicitly flagged as the reading's central conceptual trap — a guaranteed high-value exam point." },
    { stars: 4, what: "Duration gap sign and net worth effect (zero/positive/negative cases).", why: "A clean three-case table, frequently tested." },
    { stars: 3, what: "Limitations of IS gap (rate-move assumption, repricing ambiguity) and duration gap (cash-flow uncertainty, parallel-shift assumption).", why: "A rich set of caveats, good for 'what does this tool miss' conceptual questions." }
  ],

  recall: [
    { q: "A bank's 0-90 day IS gap is −$500M. If rates rise by 75bps, what is the approximate change in NII?", a: "\\(\\Delta NII\\) = 0.0075 × (−$500M) = −$3.75M — a liability-sensitive (negative gap) position loses NII when rates rise." },
    { q: "A bank has D_A=6, D_L=4, Total Liabilities=$900M, Total Assets=$1,000M. Compute the leverage-adjusted duration gap and interpret its sign.", a: "D_gap = 6 − (900/1000)×4 = 6−3.6 = 2.4 (positive). A positive duration gap means net worth FALLS as rates rise (assets lose more value than liabilities, given the leverage adjustment) — this is the typical bank profile (long-duration assets, shorter-duration liabilities)." },
    { q: "Explain how a bank can simultaneously have a negative IS gap and a positive duration gap, and why this isn't a contradiction.", a: "IS gap measures INCOME sensitivity (which repricing bucket has more liabilities than assets); duration gap measures NET WORTH sensitivity (present value impact of rate changes on the whole balance sheet). A typical bank funds long-duration, fixed-rate assets (mortgages) with short-duration liabilities (deposits) — this makes it liability-sensitive in the near term (negative IS gap, since liabilities reprice faster) while ALSO having a positive duration gap (since the long-duration assets' present value swings more than the short-duration liabilities' present value). These are two different lenses on the same balance sheet, and both are correct simultaneously — they don't need to match." },
    { q: "Why is duration gap analysis considered less reliable for large interest rate moves than for small ones?", a: "Duration is a linear (first-order) approximation of the relationship between value and yield — it ignores convexity, which becomes more significant as the rate change gets larger. For small rate moves, the linear approximation is close to accurate; for large moves, the true price-yield relationship curves away from the linear duration estimate, requiring a convexity adjustment for accuracy." }
  ],

  hooks: [
    { title: "Two different insurance policies", text: "IS gap insures your INCOME statement. Duration gap insures your BALANCE SHEET (net worth). A bank can have great income-statement insurance and terrible balance-sheet insurance at the same time — they're not the same policy." },
    { title: "Matching durations isn't enough", text: "D_A=D_L feels like it should work — but with more assets than liabilities in dollar terms, matching the percentage-move rate (duration) still leaves a dollar-value mismatch. You have to adjust for leverage (TL/TA) to actually cancel out net worth exposure." }
  ],

  breakdown: [
    {
      title: "The four steps to build an IS-gap report",
      points: [
        "1) Select repricing buckets — a day, a week, a month, a quarter, a year — based on when assets and liabilities reprice (reach current market rates) or mature.",
        "2) Sort assets and liabilities into buckets — add up the dollar amount of assets that reprice within each window, and separately the dollar amount of liabilities that reprice within the same window.",
        "3) Calculate the IS gap within each bucket — IS assets minus IS liabilities, bucket by bucket.",
        "4) Estimate the change in NII and NIM — apply each bucket's gap to an assumed rate change to project the income impact."
      ]
    },
    {
      title: "Duration gap sign and its effect on net worth",
      points: [
        "Zero duration gap — net worth is insulated from rate changes; asset and liability values move by offsetting dollar amounts.",
        "Positive duration gap (the typical bank: long-duration assets, short-duration liabilities) — net worth FALLS as rates rise, because asset values fall by more than liability values.",
        "Negative duration gap — net worth RISES as rates rise, because liability values fall by more than asset values."
      ]
    },
    {
      title: "Limitations of IS gap management",
      points: [
        "Uniform rate-move assumption — the formula assumes every asset and liability rate in a bucket moves by the same amount, which is rarely true (banks reprice loan rates faster than savings rates); a weighted IS gap (assigning different sensitivity weights, e.g. 1.0 for fed-funds-linked instruments vs. 0.5 for savings deposits) only partially fixes this.",
        "Repricing timing ambiguity — demand deposits and savings accounts can be repriced at the bank's own discretion at any time, not on a fixed schedule, making accurate bucketing difficult.",
        "A zero cumulative gap can still hide real volatility — if repricing speeds differ across buckets (e.g., loans reprice annually but funding reprices daily), NII can swing meaningfully within the year even though the year-end cumulative gap nets to zero."
      ]
    },
    {
      title: "Limitations of duration gap management",
      points: [
        "Hard-to-define cash flows — instruments like demand deposits and savings accounts have no fixed maturity or contractual payment schedule, making their duration difficult to estimate.",
        "Prepayment uncertainty — loan prepayments (and deposit withdrawals) are uncertain in timing and amount, which directly distorts duration estimates.",
        "Accurate only for small rate changes — duration is a linear (first-order) approximation; for larger rate moves the true price-yield relationship curves away due to convexity, and duration alone understates or overstates the true value change.",
        "Parallel-shift assumption — the formula assumes rates at all maturities move by the same amount for both assets and liabilities (a parallel shift of a parallel yield curve), which is unrealistic whenever short and long rates diverge or the curve twists.",
        "Duration itself is not stable — duration shifts as rates change, so a duration gap computed today drifts as the rate environment moves."
      ]
    }
  ],

  quiz: [
    {
      q: "Gray Sky Bank has total assets of $50B, earning assets of $45B, interest income of $4B, and interest expense of $2.2B. What is its NIM?",
      options: ["4.00%", "8.89%", "4.44%", "2.20%"],
      answer: 0,
      why: "NIM = NII/earning assets = ($4B−$2.2B)/$45B = $1.8B/$45B = 4.00%. The 8.89% distractor divides NII by total assets ($1.8B/$20.25B-style error) and 4.44% mistakenly uses total assets ($50B) instead of earning assets in the denominator direction; 2.20% is just the interest expense figure with no calculation."
    },
    {
      q: "A bank's 0-30 day bucket has an IS gap of −$700. Rates on all instruments rise by 1%. What is the approximate change in that bucket's NII?",
      options: ["+$7.00", "−$7.00", "−$700", "+$700"],
      answer: 1,
      why: "ΔNII = Δrate × IS gap = 0.01 × (−700) = −$7.00; a negative (liability-sensitive) gap means NII falls when rates rise. The +$7.00 distractor is the classic sign-flip error from forgetting the gap itself is negative; −$700 and +$700 forget to multiply by the 1% rate change at all."
    },
    {
      q: "A bank has D_A=6, D_L=4, Total Liabilities=$900M, and Total Assets=$1,000M. What is the leverage-adjusted duration gap?",
      options: ["2.0", "3.6", "2.4", "4.0"],
      answer: 2,
      why: "D_gap = D_A − (TL/TA)×D_L = 6 − (900/1000)×4 = 6 − 3.6 = 2.4. The 2.0 distractor is the naive D_A−D_L subtraction that ignores the leverage adjustment entirely; 3.6 is only the (TL/TA)×D_L term in isolation; 4.0 is just D_L."
    },
    {
      q: "What condition on asset and liability duration is required to fully insulate a bank's net worth from interest rate changes?",
      options: ["D_A = D_L", "D_A = (Total Liabilities/Total Assets) × D_L", "D_A = (Total Assets/Total Liabilities) × D_L", "D_A = D_L × NIM"],
      answer: 1,
      why: "Because a solvent bank's assets exceed its liabilities in dollar terms, equal percentage value changes (which is what simple duration matching, D_A=D_L, would produce) still leave a net dollar mismatch — the correct condition scales D_L down by the ratio of total liabilities to total assets. The D_A=D_L distractor is the single most common trap in this topic; the TA/TL option inverts the ratio; the NIM option mixes an unrelated formula in."
    },
    {
      q: "A bank funds long-duration, fixed-rate mortgages mostly with short-duration repurchase agreements and negotiable CDs. What are its likely IS gap and duration gap signs?",
      options: [
        "Negative IS gap and positive duration gap",
        "Positive IS gap and negative duration gap",
        "Positive IS gap and positive duration gap",
        "Negative IS gap and negative duration gap"
      ],
      answer: 0,
      why: "Short-tenor liabilities reprice faster than the long-duration fixed-rate mortgages, making the bank liability sensitive (negative IS gap); those same long-duration assets carry more price risk than the short-duration liabilities, giving a positive duration gap. This is the reading's central 'opposite direction, both correct' trap — options assuming the two gaps must share a sign are exactly the error the reading warns against."
    },
    {
      q: "A bank applies a weight of 1.0 to fed-funds-linked instruments but only 0.5 to savings account rates when building its IS gap report. What limitation of simple IS gap analysis is this weighted approach designed to address?",
      options: [
        "The parallel-yield-curve-shift assumption used in duration gap analysis",
        "The fact that different assets and liabilities reprice at different speeds relative to market rates",
        "Prepayment uncertainty on 30-year fixed-rate mortgages",
        "The need to add a convexity adjustment for large rate moves"
      ],
      answer: 1,
      why: "The weighted IS gap exists because simple IS gap analysis assumes all rates move by the same amount at the same speed, which is false — banks are typically slow to raise savings rates (discretionary, weight 0.5) but move fast on market-driven rates like fed funds (weight 1.0). The other three options are real limitations discussed in the reading, but they belong to duration gap analysis, not the weighted-IS-gap fix."
    }
  ],

  sources: [
    { title: "Asset and liability management", url: "https://en.wikipedia.org/wiki/Asset_and_liability_management", note: "Overview of ALM as an integrated discipline, including the role of the ALCO." },
    { title: "Net Interest Margin (NIM) Definition", url: "https://www.investopedia.com/terms/n/netinterestmargin.asp", note: "Plain-language walkthrough of the NIM formula with worked bank examples." },
    { title: "Bond duration", url: "https://en.wikipedia.org/wiki/Bond_duration", note: "Background on duration as a linear price-sensitivity measure and its convexity limitation for large rate moves." },
    { title: "Interest rate risk in the banking book (IRRBB)", url: "https://www.bis.org/bcbs/publ/d368.htm", note: "BIS standards on managing net-worth (economic value) and earnings exposure to rate changes — the regulatory counterpart to this reading's duration gap and IS gap." }
  ],

  pdf: { book: 4, query: "Bank management is focused on its NII" },

  summary: `<p><strong>NIM</strong>=NII/earning assets. <strong>IS gap</strong>=IS assets−IS liabilities; positive=asset sensitive, negative=liability sensitive; <strong>\\(\\Delta NII\\)</strong>\\(=\\Delta rate\\times IS\\) gap. <strong>Duration-based % price change</strong>\\(\\approx - D\\times \\Delta i\\). <strong>Leverage-adjusted duration gap</strong>: D_gap=D_A−(TL/TA)×D_L — full insulation needs D_A=(TL/TA)×D_L, NOT simply D_A=D_L. Duration gap sign: zero=insulated, positive (typical bank)=net worth falls with rising rates, negative=net worth rises. <strong>Limitations</strong>: IS gap assumes uniform rate moves and clean repricing timing; duration gap assumes small parallel shifts and struggles with demand-deposit/prepayment cash flows. A typical bank has NEGATIVE IS gap AND POSITIVE duration gap simultaneously — both correct, since they measure income vs. net worth respectively.</p>`
});
