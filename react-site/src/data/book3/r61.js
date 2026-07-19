export default ({
  book: 3, reading: 61,
  session: "Capital and Regulatory Frameworks",
  title: "High-Level Summary of Basel III Reforms",
  tagline: "A deliberately brief bridge reading — the December 2017 reforms (effective 2022) that finalize Basel III, setting up R62's detailed SMA formula. Know the goals and big-picture shifts, don't get lost in mechanics.",

  teaches: `<p>The four goals of the December 2017 reforms, what changed by risk type, and the output floor rule.</p>`,

  why: `<p>GARP explicitly says: don't get lost in the mechanics here. This reading's job is to explain WHY the 2017 reforms exist (restrict internal models, standardize more, add an output floor) before R62 gives you the actual operational risk formula that resulted.</p>`,

  intuition: `<p>Start with the problem the 2007–2009 financial crisis exposed. In the run-up to the crisis, banks were allowed to use their own internal statistical models — the <strong>internal ratings-based (IRB) approach</strong> for credit risk, the <strong>internal models method</strong> for CVA risk, and the <strong>Advanced Measurement Approach (AMA)</strong> for operational risk — to calculate how much capital they needed to hold against a given exposure. The intent was good: a bank's own model, calibrated on its own portfolio and loss history, should in theory be MORE accurate than one blunt, one-size-fits-all rule applied to every bank. But in practice, two things went wrong. First, "my model says I need less capital" is exactly the kind of self-assessment a bank has a financial incentive to get flattering — a bank that reports low risk-weighted assets (RWA) needs to raise less capital, which is cheaper. Second, because every bank's model was built differently (different assumptions, different data, different validation), regulators found it almost impossible to compare Bank A's risk-weighted assets to Bank B's, even for economically similar exposures — internal models let banks "shrink" their measured risk in ways that were hard for regulators to detect or benchmark. This is what regulators call RWA variability: two banks holding essentially the same loan portfolio could report very different capital requirements purely because of modeling choices, not because their actual risk was different.</p>
<p>The December 2017 reforms (part of the same Basel III reform wave you saw take shape in R60) respond to this with one consistent philosophy applied across every affected risk type: RESTRICT internal models (take away or narrow the cases where banks are allowed to substitute their own model for the standard rule) and EXPAND/enhance the standardized approaches (SAs) so they are more risk-sensitive and don't need to be avoided in the first place. The <strong>output floor</strong> is the enforcement mechanism that makes this restriction bite even where internal models are still permitted: no matter how favorable a bank's internal model result looks, its final risk-weighted assets can never fall below 72.5% of what the standardized approach would require for the same exposures. Think of the output floor as a backstop bolted underneath every internal model a bank is still allowed to use — the model can still make the number more precise, but it can no longer make the number arbitrarily small.</p>`,

  eli5: `<p>Imagine a school where students grade their own essays, and the teacher only spot-checks a few. Some students genuinely grade fairly, but others — even unconsciously — tend to give themselves a slightly better mark than an outside grader would, especially on the essays where the rubric is fuzziest. After a semester of grade disputes, the school does two things: it writes a much more detailed, harder-to-game rubric that every student must be graded against at least once (the enhanced standardized approach), and it announces a rule that no self-graded essay score can be more than a set amount better than what the detailed rubric would give it (the output floor) — so self-grading is still allowed, but it can no longer produce a wildly flattering result. The self-graded essay is a bank's internal model output; the detailed rubric grade is the standardized-approach RWA; and the "no more than X% better" rule is literally the 72.5% output floor.</p>`,

  thinkLike: `<p>A bank capital-management team reading this reform doesn't ask "what's the cleverest way to model our risk?" anymore — they ask "what is our standardized-approach RWA going to be, because that now sets a floor under everything we do." Before 2017, an internal model that shaved RWA down aggressively was a competitive advantage (lower capital charge, higher return on equity). After the floor, a bank whose internal model result sits below 72.5% of its standardized RWA gets no benefit from that gap at all — the floor simply overrides it. So sophisticated capital planning shifts toward: (1) knowing your standardized-approach number cold, since it now caps your best-case outcome, and (2) recognizing that for the risk types where internal models were removed altogether (A-IRB for large corporates/financial institutions, IRB for CVA), there's no modeling decision left to make — you're on F-IRB or SA by rule, full stop.</p>
<p>On the exam, GARP tests this reading almost entirely as a "know the shape of the reform, not the fine print" question set: which risk types were restricted (credit, CVA, operational — NOT market risk, NOT liquidity ratios), which specific sub-population lost A-IRB access (large/mid corporates and financial institutions, not all credit exposures), and the exact mechanics and number of the output floor (72.5%, computed only from standardized-approach building blocks, with IRB explicitly barred from entering the floor calculation for any risk type). The most common trap is answer choices that overgeneralize a scoped restriction into a blanket one — expect it, and always check whether the restriction the question describes matches the specific carve-out the source gives.</p>`,

  visual: `<div class="widget" data-widget="capitalstack"></div>`,

  formulas: [
    { name: "Output floor rule", math: "\\text{RWA} = \\max\\big(\\text{RWA under approved approach},\\ 72.5\\% \\times \\text{RWA under standardized approach}\\big)", note: "Stops large banks from using internal models to shrink capital requirements far below the standardized approach.",
      plain: "The bank's actual required risk-weighted assets are whichever is larger: what its own approved approach (which may include internal models) produces, or 72.5% of what the plain standardized approach would produce for the same exposures.",
      derivation: `<p>The floor is a two-step comparison, not a blend of the two numbers:</p>
<p>\\[ \\text{RWA}_{\\text{SA}} = \\text{risk-weighted assets computed using only standardized-approach building blocks} \\]</p>
<p>\\[ \\text{Floor} = 72.5\\% \\times \\text{RWA}_{\\text{SA}} \\]</p>
<p>\\[ \\text{RWA}_{\\text{required}} = \\max\\big(\\text{RWA}_{\\text{approved approach}},\\ \\text{Floor}\\big) \\]</p>
<p>The standardized-approach number used to build the floor is itself assembled risk type by risk type: the plain SA for credit risk, SA-CCR for derivatives counterparty exposure (with the SA for credit risk then applied to the resulting counterparty exposure), SA-CVA or BA-CVA (or, alternatively, 100% of the bank's counterparty credit risk capital requirement) for CVA risk, SEC-ERBA, SEC-SA, or a flat 1,250% risk weight for securitization exposures, and the plain SA for both market risk and operational risk. No IRB-approach output is permitted to feed into any part of this floor calculation, for any risk type — that is true even for CVA risk, where the IRB option was removed from the framework entirely rather than merely excluded from the floor.</p>` }
  ],

  concepts: [
    {
      name: "Four goals of the December 2017 reforms",
      def: "Expand the standardized approach's robustness/sensitivity (credit, CVA, operational risk); restrict internal model approaches for the same three risk types; add a G-SIB leverage ratio buffer; create a more risk-sensitive output floor.",
      intuition: "Every goal traces back to the same crisis-era diagnosis: internal models made capital requirements too easy to shrink and too hard to compare across banks, so the fix is symmetrical — make the standardized alternative good enough that leaning on it costs less accuracy, and simultaneously narrow where internal models are still allowed.",
      example: "For operational risk specifically, this reading tells you the direction of travel (restrict the AMA, expand/replace the SA) without giving you the formula — R62 supplies the actual Standardized Measurement Approach (SMA) that resulted.",
      related: ["What changed, by risk type"]
    },
    {
      name: "What changed, by risk type",
      def: "Standardized credit risk: more granular risk weights (e.g., mortgage risk weight now depends on LTV instead of one flat weight for all residential mortgages, and more granular treatments were also added for rated/unrated bank and corporate exposures, real estate, retail exposures, subordinated debt/equity, and off-balance-sheet items), reduced reliance on external ratings. IRB credit risk: A-IRB removed for large/mid corporates and financial institutions (forced to F-IRB, which fixes LGD and EAD at regulator-set values rather than letting the bank estimate them — because LGD and EAD estimates were the two parameters contributing most to RWA variability across banks); input floors added for PD/LGD/EAD so no bank's internal estimate can go below a conservative minimum. CVA risk: IRB approach removed entirely; must use standardized (SA-CVA) or basic (BA-CVA) approach. Operational risk: AMA and all prior SAs replaced by one single SA (the SMA, detailed in R62), driven by income + historical losses. Leverage ratio: new G-SIB leverage buffer (must be met with Tier 1 capital specifically), refined derivatives/off-balance-sheet exposure measure.",
      intuition: "Notice the pattern repeats risk type by risk type: wherever an internal-model option existed, it was either removed outright (CVA) or narrowed to a smaller population (A-IRB for credit), and wherever a standardized approach already existed, it was made more granular so it no longer sacrifices much accuracy by being rule-based rather than model-based.",
      example: "Under old Basel II, every residential mortgage got the same standardized risk weight regardless of how much equity the borrower had in the home. Under the 2017 reforms, a mortgage with a low loan-to-value (LTV) ratio — meaning the borrower has a large equity cushion — gets a lower risk weight than a high-LTV mortgage, because the standardized approach itself is now sensitive to a real risk driver instead of treating all mortgages identically.",
      pitfall: "A-IRB wasn't eliminated everywhere — it was removed specifically for LARGE/MID corporates and financial institutions (forced to Foundation IRB), while smaller exposures may retain more flexibility. Don't overgeneralize the A-IRB restriction to all credit exposures.",
      related: [{ r: 62, label: "R62 — the SMA, operational risk's single new standardized approach" }],
      memory: "Every risk type gets the same medicine: more standardization, less internal-model freedom."
    },
    {
      name: "The output floor",
      def: "RWA = max(RWA under bank's approved approach, 72.5% × RWA under the standardized approach).",
      intuition: "The floor exists because restricting internal models risk-type by risk-type (credit, CVA) still leaves banks with SOME internal-model discretion elsewhere (e.g., wherever F-IRB or market-risk internal models are still used) — the floor is a blanket backstop that caps the aggregate benefit of ANY remaining internal-model usage, at the level of total RWA rather than risk type by risk type.",
      example: "A bank's approved-approach RWA comes out to $80 million; the standardized approach on the same book would require $120 million. 72.5% × $120M = $87M. Since $80M < $87M, the bank cannot use $80M — it must hold capital against $87M, the floor value, even though its own model said less capital was needed.",
      pitfall: "IRB approaches are EXPLICITLY BARRED from the output-floor calculation for EVERY risk type listed — including CVA risk, where the IRB option was removed from the framework altogether, not just from the floor calculation. Standardized building blocks used to compute the floor: SA for credit risk, SA-CCR for derivatives counterparty risk (with the SA for credit risk then applied to the counterparty), SA-CVA/BA-CVA (or 100% of counterparty credit risk capital) for CVA, SEC-ERBA/SEC-SA/1,250% weight for securitization, and the plain SA for both market risk and operational risk.",
      related: [],
      memory: "72.5% is the floor — no matter how good your internal model looks, you can't fall below 72.5% of the standardized RWA."
    }
  ],

  connections: {
    from: [
      { r: 60, why: "The 2017 reforms are the next chapter in the same Basel reform wave that started with Basel 2.5/III." }
    ],
    to: [
      { r: 62, why: "This reading's summary of operational risk reform sets up the actual SMA formula." }
    ],
    confused: [
      { what: "A-IRB removal scope", how: "A-IRB was removed specifically for LARGE/MID corporates and financial institutions (forced to F-IRB) — not a blanket removal across all credit exposures." },
      { what: "Output floor vs IRB approaches", how: "IRB approaches are explicitly BARRED from the output floor calculation for every risk type — the floor is built entirely from standardized-approach building blocks." }
    ]
  },

  misconceptions: [
    { wrong: "\"The 2017 reforms eliminated A-IRB entirely across all credit exposure types.\"", right: "A-IRB was removed specifically for large/mid corporates and financial institutions (forced onto Foundation IRB) — not eliminated across every credit exposure category." },
    { wrong: "\"The output floor allows banks to use their IRB model results as part of the floor calculation.\"", right: "IRB approaches are explicitly BARRED from the output floor calculation for every risk type, including CVA (where IRB was removed from the framework entirely) — the floor is built purely from standardized-approach components." },
    { wrong: "\"The 2017 reforms restricted internal models for credit, CVA, operational risk, AND market risk.\"", right: "The reforms named in LO 62.a/62.b apply to credit risk, CVA risk, and operational risk — market risk is not one of the three risk types whose internal-model approach was restricted here; the plain SA for market risk is simply one of the permitted building blocks used when calculating the output floor." },
    { wrong: "\"The leverage ratio buffer introduced in 2017 applies to all regulated banks.\"", right: "The new leverage ratio buffer applies specifically to global systemically important banks (G-SIBs), and it must be met with Tier 1 capital — it is not a universal requirement for every bank." }
  ],

  highYield: [
    { stars: 4, what: "Output floor rule: RWA = max(approved approach, 72.5%×standardized) and IRB's exclusion from the floor calculation.", why: "The signature mechanism of the 2017 reforms, frequently tested with the exact 72.5% figure." },
    { stars: 3, what: "Four goals of the 2017 reforms and what changed by risk type (especially A-IRB's removal for large/mid corporates).", why: "A clean framework connecting this reading's summary to R62's detailed SMA mechanics." },
    { stars: 3, what: "Which risk types were restricted (credit, CVA, operational) versus which were untouched by the internal-model restriction (market risk, liquidity).", why: "A classic 'except' question format on the exam — know the exact scope, not just the general direction." }
  ],

  recall: [
    { q: "A bank's internal model produces RWA of $80M for a portfolio, while the standardized approach would require $120M. What is the bank's actual required RWA under the output floor rule?", a: "Output floor = 72.5% × $120M = $87M. Since the bank's own model result ($80M) is below this floor, the bank must use $87M (max of $80M and $87M) as its required RWA." },
    { q: "Why does the 2017 reform package specifically restrict A-IRB for large and mid-sized corporates and financial institutions, rather than removing it for all credit exposures?", a: "These larger exposure categories showed the greatest cross-bank capital variation and were judged hardest to validate/compare reliably across institutions when banks used their own internal models — smaller or more standardized exposure categories didn't raise the same comparability concerns, so the restriction was targeted rather than universal." },
    { q: "Which two parameters does the Foundation IRB (F-IRB) approach fix at regulator-set values, rather than letting the bank estimate them the way Advanced IRB (A-IRB) does — and why does that matter for the 2017 reforms?", a: "F-IRB fixes LGD (loss given default) and EAD (exposure at default). These were the two parameters that contributed the most to RWA variability across banks under A-IRB, which is exactly why forcing large/mid corporates and financial institutions onto F-IRB reduces cross-bank incomparability." }
  ],

  hooks: [
    { title: "The 72.5% seatbelt", text: "No matter how good your internal model claims your risk is, the output floor is the seatbelt that stops you from claiming less than 72.5% of what the standardized approach says — model optimism has a hard limit." }
  ],

  breakdown: [
    {
      title: "Four goals of the December 2017 reforms",
      points: [
        "Expand the robustness and sensitivity of the standardized approach (SA) for credit risk, CVA risk, and operational risk — make the rule-based option good enough that banks lose less accuracy by using it.",
        "Restrict the use of internal model approaches for those same three risk types — credit, CVA, and operational risk — narrowing where a bank's own model can substitute for the standard rule.",
        "Introduce a leverage ratio buffer specifically for global systemically important banks (G-SIBs), to be met with Tier 1 capital.",
        "Create an output floor that is more robust and risk-sensitive than the prior Basel II floor, capping how far any approved approach's RWA can fall below the standardized-approach RWA."
      ]
    },
    {
      title: "What changed, by risk type",
      points: [
        "Standardized credit risk: risk weights became more granular (e.g., residential mortgage risk weight now depends on loan-to-value ratio instead of one flat weight for all mortgages), and reliance on external credit ratings was reduced.",
        "IRB credit risk: A-IRB was removed for large/mid corporates and for banks and other financial institutions, forcing those exposures onto Foundation IRB (which fixes LGD and EAD); input floors were added for PD, LGD, and EAD so internal estimates can't go below a conservative minimum.",
        "CVA risk: the IRB option was removed entirely from the framework — banks must use the standardized approach (SA-CVA) or the basic approach (BA-CVA).",
        "Operational risk: the Advanced Measurement Approach (AMA) and all three prior standardized approaches were replaced by a single new standardized approach, the SMA, driven by a measure of the bank's income and its historical operational-risk losses (full formula in R62).",
        "Leverage ratio: a new leverage ratio buffer was added for G-SIBs (met with Tier 1 capital), and the exposure measure for derivatives and off-balance-sheet items was refined to better reflect actual exposure."
      ]
    },
    {
      title: "Standardized building blocks used to calculate the output floor",
      points: [
        "Credit risk: the plain standardized approach (SA).",
        "Derivatives / counterparty credit risk: SA-CCR (the standardized approach for measuring counterparty credit risk), with the SA for credit risk then applied to the resulting counterparty exposure.",
        "CVA risk: SA-CVA or BA-CVA, or alternatively 100% of the bank's counterparty credit risk capital requirement.",
        "Securitization risk: SEC-ERBA (external ratings-based approach), SEC-SA (standardized approach), or a flat 1,250% risk weight.",
        "Market risk: the standardized approach (SA) is permitted.",
        "Operational risk: the standardized approach (SA) is permitted.",
        "No IRB-approach output is permitted to feed into the floor calculation for any of these risk types — this is the reading's most commonly tested trap."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank's internally approved approach produces RWA of $200 million. The standardized approach on the same exposures would produce RWA of $250 million. Under the output floor rule, what is the bank's required RWA?",
      options: ["$200 million, because the internal model is approved for use", "$181.25 million, the average of the two figures", "$200 million, since it already exceeds 72.5% of $250 million ($181.25 million)", "$250 million, because the standardized approach always wins"],
      answer: 2,
      why: "The floor is 72.5% × $250M = $181.25M. The bank's approved-approach RWA of $200M already exceeds this floor, so the required RWA is max($200M, $181.25M) = $200M — the bank simply keeps its own model's result because it doesn't breach the floor. Averaging the two figures (the \"$181.25 million, the average of the two figures\" answer) is not how the floor works; it is a max, not a blend."
    },
    {
      q: "According to the December 2017 Basel III reforms, which THREE risk types had internal-model approaches restricted?",
      options: ["Credit risk, market risk, and liquidity risk", "Credit risk, CVA risk, and operational risk", "Market risk, CVA risk, and operational risk", "Credit risk, operational risk, and leverage risk"],
      answer: 1,
      why: "The reforms restricted internal models for credit risk (A-IRB narrowed), CVA risk (IRB removed entirely), and operational risk (AMA replaced by the SMA). Market risk and liquidity risk are not among the three risk types whose internal-model use was restricted by this reading's reforms — the SA for market risk is simply one of the components used when building the output floor."
    },
    {
      q: "The Advanced IRB (A-IRB) approach for credit risk was removed under the 2017 reforms for which exposures specifically?",
      options: ["All credit exposures, without exception", "Large and mid-size corporates, and banks and other financial institutions", "Only residential mortgage exposures", "Only sovereign exposures"],
      answer: 1,
      why: "A-IRB was removed specifically for exposures to large and mid-size corporates and to banks and other financial institutions, which were forced onto Foundation IRB. It was not eliminated across all credit exposure types — treating it as a blanket removal across all credit exposures is the classic overgeneralization trap this reading warns against."
    },
    {
      q: "Which approach may NOT be used when calculating the output-floor component for CVA risk?",
      options: ["The basic approach (BA-CVA)", "The standardized approach (SA-CVA)", "100% of the bank's counterparty credit risk capital requirement", "The internal ratings-based approach (IRB-CVA)"],
      answer: 3,
      why: "IRB-CVA cannot be used in the floor calculation — in fact it was removed from the CVA framework entirely by the 2017 reforms, not merely excluded from the floor. BA-CVA, SA-CVA, and 100% of counterparty credit risk capital are all permitted standardized building blocks for the CVA piece of the floor."
    },
    {
      q: "Under the 2017 reforms, the new single standardized approach for operational risk capital (detailed in R62) determines a bank's capital requirement using measures of the bank's:",
      options: ["Leverage and expected operational risk losses", "Income and historical operational risk losses", "Leverage and income only, with no loss data", "Tier 1 capital ratio and CVA exposure"],
      answer: 1,
      why: "The new SA for operational risk is built from the bank's income (assumed positively correlated with future operational risk) and its historical operational risk losses (also assumed positively correlated with future losses) — this is the income-plus-loss-history structure R62 formalizes as the Business Indicator and Internal Loss Multiplier. Leverage and expected (rather than historical) losses are not the inputs used."
    },
    {
      q: "The new leverage ratio buffer introduced by the December 2017 reforms applies to which banks, and must be met with what form of capital?",
      options: ["All regulated banks; met with any eligible capital", "Global systemically important banks (G-SIBs) only; met with Tier 1 capital", "Only banks using the AMA for operational risk; met with Tier 2 capital", "All G-SIBs and their subsidiaries; met with common equity Tier 1 capital only"],
      answer: 1,
      why: "The leverage ratio buffer applies specifically to global systemically important banks (G-SIBs) and must be met with Tier 1 capital. It is not a universal requirement for all banks, and the reading does not restrict it to common equity Tier 1 alone — Tier 1 capital more broadly satisfies it."
    }
  ],

  sources: [
    { title: "Basel Committee on Banking Supervision — High-level summary of Basel III reforms (Dec. 2017)", url: "https://www.bis.org/bcbs/publ/d424_hlsummary.pdf", note: "The original BIS publication this entire reading summarizes — the primary source for the four reform goals and the output floor rule." },
    { title: "Basel III: Finalising post-crisis reforms", url: "https://www.bis.org/bcbs/publ/d424.htm", note: "The full 2017 Basel III finalization document, including the detailed SMA text that R62 draws its formula from." },
    { title: "Internal ratings-based approach (Wikipedia)", url: "https://en.wikipedia.org/wiki/Internal_ratings-based_approach", note: "Background on how A-IRB and F-IRB differ, useful context for why F-IRB fixing LGD/EAD reduces RWA variability." },
    { title: "Basel III (Wikipedia)", url: "https://en.wikipedia.org/wiki/Basel_III", note: "General overview of the broader Basel III framework this reading's 2017 reforms sit inside." }
  ],

  pdf: { book: 3, query: "goals and impacts of the December 2017 Basel III reforms" },

  summary: `<p><strong>Four goals</strong>: expand standardized approach robustness (credit, CVA, op risk), restrict internal models for the same three risk types, add G-SIB leverage buffer, create a risk-sensitive output floor. <strong>By risk type</strong>: standardized credit risk more granular (LTV-based mortgage weights); A-IRB removed for large/mid corporates & financial institutions (forced to F-IRB) with input floors added; CVA's IRB option removed entirely (SA-CVA/BA-CVA only); operational risk's AMA and all SAs replaced by the single SMA (R62). <strong>Output floor</strong>: RWA=max(approved approach, 72.5%×standardized) — IRB explicitly barred from the floor calculation for every risk type.</p>`
});
