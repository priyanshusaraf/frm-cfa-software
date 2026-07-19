FRM.register({
  book: 3, reading: 46,
  session: "Operational Risk Overview",
  title: "Integrated Risk Management",
  tagline: "Zooms out from operational risk specifically to enterprise risk management (ERM) generally, then zooms back in on stress testing as the connective tissue to Session 9's capital readings.",

  teaches: `<p>ERM's governance-culture-appetite triad (plus capital/stress testing for financial firms), RAROC and economic capital previewed, and the stress testing taxonomy.</p>`,

  why: `<p>This reading closes Study Session 7 by placing operational risk inside the bigger ERM picture, and previews RAROC (R56) and economic capital (R57) — the direct callback that Session 9 fully develops. Notice how operational risk's low correlation with market/credit risk offers meaningful diversification benefit in capital aggregation.</p>`,

  intuition: `<p>ERM's triad — governance, culture, appetite — mirrors the three-lines structure at an enterprise level: governance sets WHO does what, culture sets HOW people behave when no one's watching, appetite sets WHERE the limits are. For financial firms specifically, a fourth pillar (risk capital and stress testing) exists because financial firms face regulatory capital requirements that non-financial firms don't.</p>
  <p>The stress-testing taxonomy has two dimensions worth separating: analytical approach (quantitative vs. qualitative) and risk type (measurable vs. immeasurable) — and three named approaches: parameter testing (shock model INPUTS), macroeconomic testing (shock SCENARIOS), and reverse testing (start from a FAILURE, work backward to what would cause it).</p>`,

  formulas: [
    { name: "RAROC (previewed)", math: "\\text{RAROC} = \\dfrac{\\text{expected after-tax risk-adjusted net income}}{\\text{economic capital}}", note: "Full mechanics developed in R56." }
  ],

  concepts: [
    {
      name: "ERM's governance-culture-appetite triad",
      def: "Governance sets roles/responsibilities across the three lines of defense (plus external audit as an informal fourth line, and a Risk Committee overseeing everything). Culture is the behaviors/values around risk. Appetite defines tolerance levels.",
      pitfall: "For financial firms specifically, risk capital and stress testing form a FOURTH pillar — don't apply the plain three-pillar ERM model to a bank without adding this financial-firm-specific addition.",
      related: [{ r: 41, label: "R41 — the three lines of defense this governance pillar builds on" }]
    },
    {
      name: "RAROC and economic capital, previewed",
      def: "Economic capital ≈ combined Pillar 1 + Pillar 2 requirements — the funds needed to cover unexpected losses. RAROC = expected after-tax risk-adjusted net income / economic capital.",
      pitfall: "Capital needs aggregate across risk classes at LESS than the simple sum (assuming imperfect correlation) — operational risk in particular offers meaningful diversification benefit due to its LOW correlation with market/credit risk.",
      related: [{ r: 56, label: "R56 — RAROC's full mechanics" }, { r: 57, label: "R57 — economic capital's full treatment" }],
      memory: "Op risk's low correlation with market/credit risk is a genuine diversification gift when aggregating capital."
    },
    {
      name: "Stress testing taxonomy",
      def: "Two dimensions: analytical approach (quantitative vs. qualitative) and risk type (measurable vs. immeasurable). Three approaches: parameter (model) testing (shock parameter values to test model robustness), macroeconomic testing (shock scenarios to test solvency/resilience), reverse testing (start from a failure outcome, work backward to the circumstances that would cause it).",
      example: "A comprehensive operational risk stress-testing framework has three modules: expected nonlegal loss forecast, legal loss, and idiosyncratic scenario add-on. Frequency/severity modeling uses regression against macro variables, or a (modified/conditional) LDA with Monte Carlo — a conditional LDA is a middle ground between full regression and plain LDA.",
      pitfall: "Severity is HARDER to model credibly than frequency — a subtle but tested asymmetry.",
      related: [{ r: 55, label: "R55 — full bank-wide stress testing" }],
      memory: "Parameter testing: shock the INPUTS. Macro testing: shock the SCENARIO. Reverse testing: start from the ENDING, work backward."
    }
  ],

  connections: {
    from: [
      { r: 45, why: "Reporting feeds into this reading's enterprise-wide, integrated risk picture." }
    ],
    to: [
      { r: 56, why: "RAROC previewed here gets its full ground-up development." },
      { r: 57, why: "Economic capital previewed here gets its full challenges-and-limitations treatment." },
      { r: 55, why: "The stress-testing taxonomy here is generalized into full bank-wide stress testing." }
    ],
    confused: [
      { what: "Parameter testing vs macroeconomic testing vs reverse testing", how: "Parameter testing shocks MODEL INPUTS to test robustness; macroeconomic testing shocks SCENARIOS to test solvency/resilience; reverse testing starts from a FAILURE OUTCOME and works backward — three different starting points for stress analysis." }
    ]
  },

  misconceptions: [
    { wrong: "\"Capital needs across risk types should simply be summed (market + credit + operational).\"", right: "Capital aggregates at LESS than the simple sum, assuming imperfect correlation — operational risk specifically offers meaningful diversification benefit due to its low correlation with market and credit risk." },
    { wrong: "\"Frequency and severity are equally easy to model credibly in a stress-testing framework.\"", right: "Severity is HARDER to model credibly than frequency — a specific, testable asymmetry in operational risk stress testing." }
  ],

  highYield: [
    { stars: 3, what: "ERM's governance-culture-appetite triad, plus the fourth pillar (capital/stress testing) for financial firms.", why: "A foundational framework, previewing R56/R57's deeper treatment." },
    { stars: 3, what: "Three stress-testing approaches: parameter, macroeconomic, reverse testing.", why: "A clean three-way classification, frequently tested for 'which approach is this.'" },
    { stars: 2, what: "Operational risk's low correlation with market/credit risk as a diversification benefit in capital aggregation.", why: "A specific, valuable conceptual point connecting to R57's aggregation challenges." }
  ],

  recall: [
    { q: "Why does aggregating economic capital across market, credit, and operational risk produce a total LESS than the simple sum of each risk type's standalone capital?", a: "Assuming imperfect correlation between risk types (they don't all materialize simultaneously and to the same degree), diversification benefit reduces the combined capital need below the naive sum. Operational risk in particular has historically shown LOW correlation with market and credit risk, contributing meaningful diversification benefit." },
    { q: "A risk team wants to understand what combination of circumstances would be needed to cause the bank's capital ratio to breach its regulatory minimum. Which stress-testing approach are they using?", a: "Reverse testing — starting from a defined failure outcome (breaching the capital minimum) and working backward to identify the circumstances/scenarios that would cause it, rather than starting from a scenario and forecasting forward." }
  ],

  hooks: [
    { title: "Working backward from disaster", text: "Reverse testing is detective work in reverse: 'here's the crime scene (failure) — now what sequence of events could have led here?' Parameter and macro testing work forward instead; reverse testing works backward." }
  ],

  summary: `<p><strong>ERM triad</strong>: governance (roles across three lines + audit + Risk Committee), culture (behaviors/values), appetite (tolerance levels) — financial firms add a FOURTH pillar (capital/stress testing). <strong>RAROC</strong> (previewed, full mechanics in R56) = risk-adjusted net income/economic capital. <strong>Economic capital</strong> ≈ Pillar 1 + Pillar 2; aggregates at LESS than the simple sum across risk types — op risk's low correlation with market/credit risk is a genuine diversification benefit. <strong>Stress-testing taxonomy</strong>: quantitative/qualitative × measurable/immeasurable; three approaches — parameter (shock inputs), macroeconomic (shock scenarios), reverse (work backward from failure). Op-risk stress framework: nonlegal loss + legal loss + idiosyncratic scenario add-on; severity harder to model than frequency.</p>`
});
