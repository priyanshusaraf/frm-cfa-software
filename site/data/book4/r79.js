FRM.register({
  book: 4, reading: 79,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Risk Management for Changing Interest Rates: Asset-Liability Management and Duration Techniques",
  tagline: "Two complementary tools: IS (interest-sensitive) gap protects net interest income/margin; duration gap protects net worth (equity value). Know both formulas, both sign conventions, and both limitations cold.",

  teaches: `<p>NIM and the IS gap, change in NII from a rate change, duration-based price change, the leverage-adjusted duration gap, and the limitations of each tool.</p>`,

  why: `<p>This is a favorite reading for multi-part calculation questions. IS gap and duration gap answer genuinely DIFFERENT questions (income protection vs. net worth protection) and can point in seemingly opposite directions on the same balance sheet — both simultaneously correct.</p>`,

  intuition: `<p>IS gap asks: if rates change, does my net interest INCOME change? Positive gap (more rate-sensitive assets than liabilities) = asset sensitive = NII rises when rates rise. Negative gap = liability sensitive = NII falls when rates rise.</p>
  <p>Duration gap asks a different question: if rates change, does my NET WORTH (equity value) change? To fully insulate net worth, a bank needs DA = (TL/TA)×DL — NOT simply DA=DL, because assets almost always exceed liabilities (positive equity), so equal percentage value changes on unequal dollar bases still move net worth. A typical bank (long-duration mortgages, short-duration deposits) has a NEGATIVE IS gap (liability sensitive) AND a POSITIVE duration gap (assets exposed more than liabilities) — these two gaps point in seemingly opposite directions, and BOTH are simultaneously correct, because they're answering different questions (income vs. net worth).</p>`,

  visual: `<div class="widget" data-widget="gap"></div>`,

  formulas: [
    { name: "Net interest margin", math: "\\text{NIM} = \\dfrac{\\text{NII}}{\\text{earning assets}};\\quad \\text{NII} = \\text{interest income} - \\text{interest expense}", note: "Assets=$50B, earning assets=$45B, int. income=$4B, int. expense=$2.2B → NIM=(4−2.2)/45=4.00%." },
    { name: "IS gap (per repricing bucket)", math: "\\text{IS gap} = \\text{IS assets} - \\text{IS liabilities}", note: "Positive = asset sensitive (rates↑→NII↑). Negative = liability sensitive (rates↑→NII↓). Zero = NII unaffected." },
    { name: "Change in NII from a rate change", math: "\\Delta NII = \\Delta rate \\times IS gap", note: "0-30 day bucket gap=−700: +1%→\\(\\Delta NII=-\\)$7.00. 31-90 day bucket gap=+900: +1%→\\(\\Delta NII=+\\)$9.00." },
    { name: "Duration-based % price change", math: "\\Delta (value)/value \\approx -D \\times \\Delta i", note: "D≈5.28, \\(\\Delta i=0.5\\)%, $250M assets → \\(\\Delta value\\approx -\\)$6.6 million." },
    { name: "Leverage-adjusted duration gap", math: "D_{\\text{gap}} = D_A - \\dfrac{\\text{Total Liabilities}}{\\text{Total Assets}}\\times D_L", note: "To fully insulate net worth: D_A = (TL/TA)×D_L, NOT simply D_A=D_L." }
  ],

  concepts: [
    {
      name: "NIM and the IS gap",
      def: "NIM = NII/earning assets. IS gap = IS assets − IS liabilities (per repricing bucket).",
      pitfall: "Positive IS gap = ASSET SENSITIVE (rates↑ → NII/NIM↑; rates↓ → NII/NIM↓). Negative IS gap = LIABILITY SENSITIVE (opposite). IS gap = 0 → NII/NIM unaffected by rate changes (under the simplifying assumption that all rates move together).",
      related: ["Change in NII from a rate change"]
    },
    {
      name: "Change in NII from a rate change",
      def: "\\(\\Delta NII\\) = \\(\\Delta rate\\) × IS gap.",
      example: "0-30 day bucket IS gap=−700 (liability sensitive): +1% rate move → \\(\\Delta NII=0.01\\times (- 700)=-\\)$7.00. 31-90 day bucket IS gap=+900 (asset sensitive): +1%→\\(\\Delta NII=0.01\\times 900=+\\)$9.00. If the CUMULATIVE IS gap across all buckets is zero and all rates move in lockstep, overall NII is unaffected.",
      pitfall: "Relative gap = IS gap/total assets. Interest sensitivity ratio (ISR) = IS assets/IS liabilities. A bank confident in its rate forecast may DELIBERATELY skew the IS gap toward asset- or liability-sensitivity to profit from the expected move — the gap is a RISK-MANAGEMENT LEVER, not just a passive risk measure.",
      related: []
    },
    {
      name: "Duration and the leverage-adjusted duration gap",
      def: "\\(\\Delta (value)/value\\) ≈ \\(- D\\times \\Delta i\\). D_gap = D_A − (TL/TA)×D_L.",
      example: "To fully insulate net worth from rate changes, a bank needs D_A = (TL/TA)×D_L — NOT simply D_A=D_L, because assets almost always exceed liabilities (positive equity), so equal percentage value changes on unequal dollar bases still move net worth.",
      pitfall: "Duration gap sign and its effect on net worth: zero → net worth insulated. Positive (typical bank: long-duration assets, short-duration liabilities) → net worth FALLS as rates rise (assets lose more value than liabilities). Negative → net worth RISES as rates rise (liabilities lose more value than assets).",
      related: [],
      memory: "D_A=D_L is NOT the insulating condition — you need D_A=(TL/TA)×D_L, adjusted for the leverage between assets and liabilities."
    },
    {
      name: "ALCO's duration gap process",
      def: "Compute each asset/liability's duration, weight by market value, sum to portfolio durations, then compute the gap — and consider adding convexity for a better approximation on larger rate moves.",
      related: []
    },
    {
      name: "Limitations of each tool",
      def: "IS gap: assumes all asset/liability rates move by the same amount (rarely true — addressed partially via a WEIGHTED IS gap with rate-sensitivity weights); repricing timing is often ambiguous (demand deposits/savings can reprice anytime at the bank's discretion); a zero cumulative gap can still mask real within-year NII volatility if repricing speeds differ across buckets. Duration gap: hard to define cash-flow patterns (and thus duration) for demand deposits/savings; prepayment uncertainty on loans; more accurate for SMALL rate changes only (convexity matters more for large moves); assumes a PARALLEL shift of a parallel yield curve (unrealistic when short/long rates diverge or the curve twists); duration itself shifts as rates change.",
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

  summary: `<p><strong>NIM</strong>=NII/earning assets. <strong>IS gap</strong>=IS assets−IS liabilities; positive=asset sensitive, negative=liability sensitive; <strong>\\(\\Delta NII\\)</strong>\\(=\\Delta rate\\times IS\\) gap. <strong>Duration-based % price change</strong>\\(\\approx - D\\times \\Delta i\\). <strong>Leverage-adjusted duration gap</strong>: D_gap=D_A−(TL/TA)×D_L — full insulation needs D_A=(TL/TA)×D_L, NOT simply D_A=D_L. Duration gap sign: zero=insulated, positive (typical bank)=net worth falls with rising rates, negative=net worth rises. <strong>Limitations</strong>: IS gap assumes uniform rate moves and clean repricing timing; duration gap assumes small parallel shifts and struggles with demand-deposit/prepayment cash flows. A typical bank has NEGATIVE IS gap AND POSITIVE duration gap simultaneously — both correct, since they measure income vs. net worth respectively.</p>`
});
