export default ({
  book: 2, reading: 19,
  session: "Credit Risk Analysis",
  title: "Credit Risk Management",
  tagline: "The governance skeleton from R18, applied specifically to a bank's loan book: classification, provisioning, and the workout process.",

  teaches: `<p>R19 takes the governance skeleton from R18 (independent risk function, written policies, delegated limits) and applies it specifically to a bank's loan book. Four ideas matter most: (1) what a good <strong>lending policy</strong> actually contains: concentration limits, lending authority, appraisal standards, and portfolio-review coverage rules; (2) how a bank <strong>classifies</strong> every loan into one of five health categories, from healthy to already-written-off; (3) how it sets aside <strong>loan loss provisions</strong> against expected trouble, including the exact three components of expected loss (PD, LGD, EAD) and how IFRS 9 turns that into an accounting rule; and (4) the four-step <strong>workout process</strong> a bank runs when a loan actually goes bad, plus the balance-sheet choice between retaining or writing off a loss asset. It also introduces EL vs UL qualitatively: the split that becomes fully quantitative with formulas and standard deviations in R20.</p>`,

  why: `<p>Credit risk sits behind roughly 70% of a typical bank's balance sheet, which is why it is the single leading cause of bank failure. This reading is the operational playbook for controlling that exposure before it becomes a loss. Provisioning rules under IFRS 9 directly determine how much of a bank's earnings absorb credit deterioration, and <em>when</em> that hit shows up in the income statement. Getting Stage 2 vs. Stage 3 right — and specifically what changes between them — is a frequently-missed distinction with real accounting consequences: it changes whether interest income is calculated on the full loan balance or on the balance net of provisions, which flows straight through to reported earnings. The exam also likes to test the workout process and the retention-vs-write-off choice as a pair, because they look procedural but actually encode two very different philosophies (British vs. U.S.) about how a bank's balance sheet should represent trouble.</p>`,

  intuition: `<p>Think of the asset classification spectrum as a patient's health chart: standard (healthy, no delinquency in question) → specially mentioned (early symptoms — some new weakness that <em>could</em> hurt repayment) → substandard (a diagnosed, well-defined problem — the primary way the bank expected to get repaid has already failed, so it's falling back on secondary sources like collateral) → doubtful (the same diagnosis, but the prognosis for recovery is now poor) → loss (the patient has, for accounting purposes, flatlined — not necessarily a zero-recovery certainty, but delaying the write-off any further would be dishonest). Provisioning intensity should rise as the patient's condition worsens — that's the whole logic connecting classification to loss reserves: a bank holding mostly "standard" loans needs a thin cushion, a bank with a pile of "doubtful" loans needs a thick one.</p>
  <p>Expected loss (EL) is built from three separate questions, each answered by a different piece of evidence: <strong>who</strong> did you lend to (probability of default, PD — estimated from that borrower's history, credit scores, rating agency views, or CDS spreads), <strong>what</strong> product did you lend on (loss given default, LGD — a secured mortgage loses far less in default than an unsecured personal loan, because collateral can be seized), and <strong>how much/how long</strong> is outstanding when default hits (exposure at default, EAD — a revolving credit line drawn further down before default has more dollars at risk than one paid down early). Multiply the three together and you get the "average" loss a bank should expect to take across many similar loans. Unexpected loss (UL) is everything EL does not capture — the tail-risk variability around that average, the 99th-percentile bad year rather than the typical year. This reading only defines EL and UL in words; R20 gives them formulas and standard deviations.</p>`,

  eli5: `<p>Imagine you run a small tool-lending library for your neighborhood. You keep a logbook rating every borrower: some are "reliable" (always return tools on time), some are "watch this one" (missed a return date once), some are "in trouble" (haven't returned the drill in months and you've already asked for their spare key as backup collateral), some are "probably not getting it back" (same situation, but now you doubt they'll ever return it), and some are "write it off" (it's gone — time to stop pretending and just buy a new drill). You keep a small box of spare tools ("provisions") to cover the ones you expect never to see again, and the box should get bigger the more "in trouble" and "write it off" borrowers you have. When someone really does stop returning tools, you don't just shrug — you follow steps: first ask for something extra as security, then talk to them about why they're struggling and whether a payment plan helps, then maybe get a mutual friend to broker a solution, and only as a last resort do you just take back and sell whatever collateral you're holding. That neighborhood logbook is the bank's <strong>asset classification spectrum</strong>, the spare-tool box is the <strong>loan loss reserve</strong>, and the four steps you take with a non-returning borrower are the bank's <strong>loan workout procedure</strong>.</p>`,

  thinkLike: `<p>A credit risk manager reading this material is not memorizing a five-item list for its own sake — they are asking, for every loan on the book, "which bucket is this in <em>today</em>, and is that classification still true given what I know right now?" Classification is not a one-time stamp at origination; it is reviewed continuously as the client's financial condition, payment performance, and macro environment change. The manager also has to hold two frames simultaneously: an accounting frame (what does IFRS 9 require me to book as a provision, and does that match the gross or net interest basis?) and an operational frame (given a loan that has actually gone bad, what is the realistic sequence of actions — collateral first, then negotiation, then a third party, then liquidation — that maximizes recovery without destroying the relationship or triggering unnecessary legal costs?).</p>
  <p>On the exam, this reading is tested less as calculation and more as <em>precise recall under a plausible-sounding trap</em>. GARP likes to test: (a) the Stage 2/Stage 3 gross-vs-net distinction, because "lifetime loss only starts at Stage 3" is the single most tempting wrong answer; (b) whether collateral should be included when sizing a concentration-limit exposure (it should not); (c) matching a delinquency scenario (specific days-past-due, specific facts about collateral seizure and cooperative renegotiation) to the correct one of the five classification categories; and (d) which balance-sheet model (British retention vs. U.S. write-off) makes loan loss reserves look bigger or smaller relative to the loan book. Expect word-problem style questions that give you a narrative (a borrower lost a customer, stopped paying, bank seized some collateral but is still working with them) and ask you to classify it correctly — the skill being tested is applying the definitions to messy real facts, not just reciting them.</p>`,

  formulas: [
    {
      name: "Expected loss (first appearance, qualitative)",
      math: "EL = PD \\times LGD \\times EAD",
      plain: "Expected loss is the probability the borrower defaults, multiplied by the fraction of the exposure the bank loses if that default happens, multiplied by the dollar amount actually outstanding at the moment of default — three independent questions (who, what, how much) multiplied into one average-loss estimate.",
      derivation: `<p>Each term answers a different question about the same loan:</p>
      <ul>
        <li>\\(\\text{PD}\\) (probability of default) — the likelihood a specific borrower fails to make timely interest or principal payments. Estimated from historically similar borrowers, observed credit default swap spreads, rating-agency views, and individual credit scores. This term captures <em>who</em> the bank lent to.</li>
        <li>\\(\\text{LGD}\\) (loss given default) — the percentage of the exposure the bank actually loses if default occurs, i.e. \\(\\text{LGD} = 1 - \\text{recovery rate}\\). A fully collateralized loan has low LGD; an unsecured loan has high LGD. This term captures <em>what product</em> was used.</li>
        <li>\\(\\text{EAD}\\) (exposure at default) — the dollar amount outstanding at the moment default happens, which depends on how the balance has evolved since origination (e.g. how much of a revolving line has been drawn down). This term captures <em>how much/how long</em> exposure exists.</li>
      </ul>
      <p>Multiplying the three gives the dollar amount a bank should, on average, expect to lose per period across a pool of similar loans: \\[ \\text{EL} = \\text{PD} \\times \\text{LGD} \\times \\text{EAD} \\] Everything actual losses do that this average does not predict — the bad-tail years — is unexpected loss (UL); R20 quantifies UL with a formula and a standard deviation.</p>`,
      note: "The 'average' loss. UL is what's NOT captured by this average — the variability around it. Becomes fully quantitative with formulas in R20."
    }
  ],

  concepts: [
    {
      name: "Asset classification spectrum",
      def: "Standard (pass) → specially mentioned (watch) → substandard → doubtful → loss. A health spectrum from 'fine' to 'already a write-off.'",
      intuition: "Provisioning intensity should rise as you move right along this spectrum.",
      example: "Standard/pass loans are typically fully secured with cash or cash-equivalents (e.g., a certificate of deposit) and stay 'standard' regardless of other unfavorable factors. Nonperforming loans (no interest or principal received after 90 days) generally land as substandard past 90 days delinquent, doubtful past 180 days delinquent, and loss past one year delinquent — unless sufficiently secured, which can keep them out of the worse buckets.",
      pitfall: "The 'loss' category does not mean the probability of collection is zero — it means delaying the write-off any further is no longer practical or honest from an accounting standpoint.",
      related: ["IFRS 9's three-stage loss model"]
    },
    {
      name: "IFRS 9's three-stage loss model (effective Jan 1, 2018)",
      def: "Stage 1 (performing): 12-month expected loss, interest on gross amount. Stage 2 (any delinquency): lifetime expected loss, interest on gross amount. Stage 3 (nonperforming): lifetime expected loss, interest on NET amount.",
      intuition: "Before 2018, International Accounting Standard (IAS) 39 required an 'incurred loss' model — provisions were only booked once a loss had already happened. IFRS 9 moved to a forward-looking expected-loss model precisely because incurred-loss accounting was blamed for banks recognizing credit losses too late during the 2008 crisis.",
      pitfall: "Stage 2 and Stage 3 BOTH use lifetime expected loss — the difference between them is whether interest income is computed on the GROSS or NET (of provisions) carrying amount, NOT the loss horizon. This is a frequently-missed distinction — many assume Stage 3 introduces the lifetime-loss concept, but it actually starts at Stage 2.",
      related: [{ r: 20, label: "R20 — where EL gets its full quantitative formula" }],
      memory: "Stage 1: 12-month loss. Stages 2 & 3: BOTH lifetime loss — they differ only in gross vs. net interest basis."
    },
    {
      name: "Expected loss vs. unexpected loss (first appearance)",
      def: "EL = PD × LGD × EAD (the 'average' loss). UL = the loss that isn't captured by the EL model, i.e., the variability around that average.",
      intuition: "EL is a budgeting number — a bank prices EL into its lending rates and reserves for it every period. UL is a capital number — it's what economic and regulatory capital exist to absorb, because you cannot reserve in advance for a tail event without holding capital equal to nearly the whole loan book.",
      pitfall: "This split is introduced qualitatively here but becomes fully quantitative in R20 — that's the reading where you actually calculate EL and UL with formulas and standard deviations. Keep this reading's definitions in your back pocket; R20 is where they get teeth.",
      related: [{ r: 20, label: "R20 — the full quantitative EL/UL machinery" }]
    },
    {
      name: "Concentration and related-party limits",
      def: "Concentration limits cap exposure to a single client, related group, region, or economic sector, typically expressed as a percentage of bank capital or reserves (many countries impose 10%–25% of capital on individual clients). Related-party limits restrict credit extended to parties who could influence the bank's own credit decisions — parent companies, subsidiaries, major shareholders, affiliated companies, directors, and executive officers — usually capped as a percentage of Tier 1 capital.",
      intuition: "A 'single client' isn't just one legal person — it includes any connected group under common control, because a large exposure to one economic entity should be aggregated even if it's split across several borrowing shells. The regulatory worry with related parties is twofold: credit decisions may be biased by the relationship, and loan terms may end up more favorable than market norms — a conflict of interest, not a solvency question per se.",
      pitfall: "Collateral should NOT be considered when sizing risk exposures for concentration-limit purposes — a fully collateralized $50 million exposure to one client still counts as a $50 million exposure against the concentration limit. Less-direct forms of credit (contingent liabilities, guarantees, acceptances, letters of credit) DO need to be factored in, though.",
      example: "If a country imposes a 20% single-client concentration limit and a bank's Tier 1 capital is $1 billion, no single client (or connected group under common control) can carry more than $200 million of aggregate exposure, regardless of how well the exposure is collateralized.",
      related: [{ r: 18, label: "R18 — the governance skeleton these limits sit inside" }]
    },
    {
      name: "Loan portfolio and loan-loss-allowance reviews",
      def: "Periodic loan portfolio reviews should cover, at minimum: at least 75% of the total loan portfolio by dollar amount, at least 30% of the number of loans, at least 50% of the number of all foreign loans, and all loans with a maturity greater than one year — plus, regardless of size, all loans to single clients exceeding 5% of bank capital, all related-party/shareholder loans, all loans whose terms have changed since inception, all loans delinquent beyond 30 days, and all loans already classified substandard, doubtful, or loss.",
      intuition: "The coverage thresholds are a sampling design: broad enough (75% of dollars) to catch material risk, but the 'always review regardless of size' carve-outs exist because certain loan types (related-party, renegotiated, delinquent, already-troubled) are disproportionately likely to hide problems that a random sample would miss.",
      example: "Loan-loss-allowance policy reviews separately check: a survey of the existing allowance policy, an overview of the asset classification process, an assessment of current risk factors (with emphasis on what's DIFFERENT from history, not just historical loss rates), a trend analysis of historical losses, and a statement on the adequacy of the current policy."
    },
    {
      name: "Loan workout procedure (four steps, any order)",
      def: "A structured process a bank runs when a loan has gone bad: (1) reduce exposure by collecting additional capital, collateral, or guarantees; (2) work with the borrower to identify operational improvements (advice, cost-cutting plans, asset sales, restructuring) — bordering on consulting; (3) introduce a third party as a possible joint-venture partner or takeover; (4) liquidation through an out-of-court settlement (foreclosure, liquidating collateral, or calling guarantees).",
      intuition: "The steps are not a strict escalation ladder — the source explicitly says they 'can be applied in any order.' A bank chooses based on the specific borrower: a temporarily distressed but fundamentally sound business gets step 2 (consulting-style help); a business with no viable path gets step 4 (liquidation) regardless of how the other steps might have played out.",
      example: "XYZ Manufacturing lost its largest customer and stopped debt service. ABC Bank seized some collateral (step 1) while working with XYZ on a plan to find new customers (step 2) — a real example of the first two workout steps running in parallel on the same loan.",
      memory: "Collateral first, consult second, bring in a third party third, liquidate last — but remember the source explicitly allows any order."
    },
    {
      name: "Retaining vs. writing off loss assets (British vs. U.S. models)",
      def: "Two balance-sheet approaches once a loan is classified 'loss.' Retention (British tradition): keep the loss asset and its reserve on the balance sheet, giving more time for collection attempts — this makes loan loss reserves appear LARGER relative to the loan book. Write-off (U.S. model): immediately remove the loss from the loan loss reserves account — this makes reserves appear SMALLER relative to the loan book, even though the underlying credit quality may be identical.",
      pitfall: "A bank with unusually small loan loss reserves relative to its portfolio size is not automatically a red flag — it could simply be following the U.S. write-off model rather than hiding problems. Analysts need to ask management which model is in use before drawing conclusions from the reserve-to-portfolio ratio alone.",
      related: [{ r: 18, label: "R18 — governance context for how these accounting choices get overseen" }]
    },
    {
      name: "Credit risk analysis and credit risk management capacity review",
      def: "Portfolio-level credit risk analysis covers: a summary of major loan types (customer counts, average maturity, average rate), the distribution of the portfolio (currencies, short- vs. long-term, economic sectors, borrower category), a list of all guaranteed loans, a review of loans by risk classification, and an analysis of nonperforming loans by vintage year. Separately, a credit risk management CAPACITY review — the Board's ultimate responsibility — covers three components: the lending process (origination through collection, application-to-approval volumes over the last 6–12 months), staffing (headcount, experience, training), and information flows (is data reaching senior managers and the Board in a timely, accessible, cost-effective way?).",
      pitfall: "Portfolio-level credit risk analysis does NOT include commentary from the credit risk officer — that is a case-by-case, individual-loan-level input, not a portfolio metric. Similarly, staff diversity metrics are an HR concern, not part of the capacity review's staffing component (which focuses on headcount, age, experience, and training).",
      example: "Board-level questions the source explicitly lists include: are loans and deposits priced competitively? Are PD, LGD, and EAD estimates historically accurate? How does the bank treat delinquent loans? How frequently is the portfolio stress tested?"
    }
  ],

  connections: {
    from: [
      { r: 18, why: "This reading applies the governance skeleton specifically to loan classification and workout decisions." }
    ],
    to: [
      { r: 20, why: "EL/UL, introduced qualitatively here, becomes the fully quantitative core of the next reading." }
    ],
    confused: [
      { what: "Stage 2 vs Stage 3 (IFRS 9)", how: "Both use LIFETIME expected loss. The only difference is the interest income basis: Stage 2 uses gross carrying amount, Stage 3 uses net (post-provision) amount." },
      { what: "Retention vs. write-off models", how: "Retention (British) makes reserves look LARGER relative to the loan book; write-off (U.S.) makes reserves look SMALLER — a small reserve-to-portfolio ratio is not automatically a red flag once you know which model is in use." }
    ]
  },

  misconceptions: [
    { wrong: "\"Stage 3 introduces lifetime expected loss, while Stage 2 still uses 12-month expected loss.\"", right: "Stage 2 ALREADY uses lifetime expected loss — the same as Stage 3. The two stages differ only in whether interest is computed on gross (Stage 2) or net (Stage 3) carrying amount." },
    { wrong: "\"Provisioning intensity should be roughly constant across the asset classification spectrum.\"", right: "It should rise as classification worsens — standard/pass requires minimal provisioning, loss requires (near) full write-off." },
    { wrong: "\"Collateral should reduce a loan's counted exposure when checking it against a concentration limit.\"", right: "Collateral is explicitly excluded from exposure sizing for concentration-limit purposes — a fully secured $50 million loan still counts as $50 million of concentration exposure. Less-direct forms of credit (guarantees, acceptances, letters of credit) ARE included, but collateral value is not." },
    { wrong: "\"A bank with a small loan loss reserve relative to its loan book is under-provisioning and hiding risk.\"", right: "It may simply follow the U.S. write-off model, which removes loss assets from the reserves account immediately — a small reserve ratio can be a legitimate accounting choice, not a red flag, and should be confirmed with management before concluding otherwise." }
  ],

  highYield: [
    { stars: 4, what: "IFRS 9 three-stage model: which stages use lifetime EL, and the gross-vs-net interest distinction.", why: "The single most frequently-missed distinction in this reading — a precise, high-value trap." },
    { stars: 3, what: "Asset classification spectrum (standard → specially mentioned → substandard → doubtful → loss), including the day-count thresholds (90/180/365 days) used to place nonperforming loans.", why: "Straightforward recall, but exam questions apply it to a narrative and expect you to pick the right bucket from the facts." },
    { stars: 3, what: "The three EL components — PD (who), LGD (what product), EAD (how much/how long) — and which one answers which question.", why: "Frequently tested as 'which component considers the product used' (answer: LGD) style questions." },
    { stars: 2, what: "The four-step loan workout process, and that collateral is excluded from concentration-limit exposure sizing.", why: "Both are 'know the list precisely' facts the exam likes to test with plausible near-miss distractors." },
    { stars: 2, what: "British retention vs. U.S. write-off models and their opposite effects on reported reserve size.", why: "Tests whether you can reason from an accounting choice to its balance-sheet appearance, not just recall the labels." }
  ],

  recall: [
    { q: "A loan moves from Stage 2 to Stage 3 under IFRS 9. Does its expected loss horizon change?", a: "No — both Stage 2 and Stage 3 already use LIFETIME expected loss. What changes is the interest income basis: Stage 2 computes interest on the gross carrying amount, Stage 3 on the net (post-provision) amount." },
    { q: "Why does provisioning intensity rise as a loan moves from 'standard' toward 'loss' on the classification spectrum?", a: "The classification spectrum tracks deteriorating asset health — as the likelihood and severity of ultimate non-payment rises, prudent accounting requires setting aside proportionally larger reserves against that increasingly probable loss." },
    { q: "Should collateral value be netted against exposure when checking a loan against a single-client concentration limit?", a: "No. Collateral is explicitly excluded from exposure sizing for concentration-limit purposes; a fully secured loan still counts at its full exposure amount. Less-direct credit forms like guarantees and letters of credit ARE included." },
    { q: "Name the four steps of the loan workout procedure, and are they strictly sequential?", a: "(1) Collect additional capital, collateral, or guarantees; (2) work with the borrower on operational improvements; (3) introduce a third party as joint-venture partner or takeover; (4) liquidate through an out-of-court settlement. They can be applied in any order — not a strict escalation ladder." },
    { q: "Which of PD, LGD, and EAD answers 'what product was used for the credit'?", a: "Loss given default (LGD) — expressed as the percentage of exposure lost in default, it reflects how well-secured the specific product is. PD answers 'who' was lent to; EAD answers 'how much/how long' exposure existed at default." },
    { q: "A bank reports unusually small loan loss reserves relative to its portfolio. What is one legitimate, non-alarming explanation?", a: "The bank may follow the U.S. write-off model, which immediately removes loss assets from the reserves account — shrinking the reserve-to-portfolio ratio even without any change in underlying credit quality, unlike the British retention model which keeps loss assets (and their reserves) on the books longer." }
  ],

  hooks: [
    { title: "The health chart", text: "Standard, specially mentioned, substandard, doubtful, loss — a patient's chart from healthy to flatlined. Provisioning rises with every step right." },
    { title: "Gross vs net, not 12-month vs lifetime", text: "Stage 2 → Stage 3 is a change in accounting BASIS (gross to net interest), not a change in loss HORIZON (both are lifetime) — the trap is assuming otherwise." },
    { title: "Who, what, how much", text: "PD = who you lent to. LGD = what product you lent on. EAD = how much/how long was outstanding when it broke. Multiply the three and you get the average loss." },
    { title: "Collateral first, liquidation last — but no fixed order", text: "The workout process reads like an escalation ladder (collect security → consult → bring in a partner → liquidate), but the source is explicit: any order is allowed." }
  ],

  breakdown: [
    {
      title: "Five asset classification categories",
      points: [
        "Standard (pass) — delinquency not in question; loans fully secured with cash or cash-equivalents (e.g., a CD) generally keep this label regardless of other unfavorable factors.",
        "Specially mentioned (watch) — potential weaknesses exist that could impact repayment ability, for varied reasons; not yet a confirmed problem.",
        "Substandard — a well-defined credit weakness that could jeopardize repayment; often the primary repayment source has already failed and the bank is falling back on secondary sources like collateral; nonperforming loans over 90 days delinquent typically land here unless sufficiently secured.",
        "Doubtful — same concerns as substandard, but the expectation of loss is more pronounced; nonperforming loans over 180 days delinquent land here unless sufficiently secured; some hope for repayment still exists.",
        "Loss — delinquency is relatively certain and it is no longer practical to delay the write-off; does NOT mean the probability of collection is zero; nonperforming loans over one year delinquent land here unless sufficiently secured."
      ]
    },
    {
      title: "IFRS 9 three stages (effective January 1, 2018)",
      points: [
        "Stage 1 — performing (no delinquency): 12-month expected loss; interest calculated on the gross carrying amount.",
        "Stage 2 — any level of delinquency: lifetime expected loss; interest still calculated on the gross carrying amount.",
        "Stage 3 — nonperforming: lifetime expected loss; interest calculated on the net (carrying) amount, i.e. net of provisions.",
        "Predecessor context: before 2018, IAS 39 used an incurred-loss model that only booked losses after they'd already happened; IFRS 9 moved provisioning to a forward-looking expected-loss basis."
      ]
    },
    {
      title: "Three components of expected loss",
      points: [
        "Probability of default (PD) — likelihood a specific borrower fails to make timely interest/principal payments; driven by historical peer data, CDS spread degradation, rating-agency views, and individual credit scores. Answers 'who.'",
        "Loss given default (LGD) — the percentage of exposure lost if default occurs (LGD = 1 − recovery rate); driven by how well-secured the specific credit product is. Answers 'what product.'",
        "Exposure at default (EAD) — the dollar exposure outstanding at the moment of default, reflecting how the balance evolved since origination (e.g. drawdown on a revolving line). Answers 'how much/how long.'"
      ]
    },
    {
      title: "Four-step loan workout procedure (any order)",
      points: [
        "1. Reduce exposure by collecting additional capital, collateral, or guarantees from the borrower.",
        "2. Work with the borrower on operational improvements — advice, cost-cutting, asset sales, or loan restructuring; borders on consulting.",
        "3. Introduce a third party as a possible joint-venture partner or a takeover candidate.",
        "4. Liquidation through an out-of-court settlement — foreclosure, liquidating collateral, or calling on guarantees."
      ]
    },
    {
      title: "Loan portfolio review coverage minimums",
      points: [
        "At least 75% of the total loan portfolio by dollar amount.",
        "At least 30% of the number of loans.",
        "At least 50% of the number of all foreign loans.",
        "All loans with a maturity greater than one year.",
        "Regardless of the sampling thresholds above, always review: loans to single clients exceeding 5% of bank capital, all related-party/shareholder loans, loans with altered terms since inception, loans delinquent beyond 30 days, and loans already classified substandard, doubtful, or loss."
      ]
    }
  ],

  quiz: [
    {
      q: "A loan is reclassified from IFRS 9 Stage 2 to Stage 3. What actually changes as a result?",
      options: [
        "The loss horizon changes from 12-month to lifetime expected loss",
        "The interest income basis changes from gross to net carrying amount, while the loss horizon (lifetime) stays the same",
        "Both the loss horizon and the interest basis change simultaneously",
        "Nothing changes; Stage 2 and Stage 3 are accounting-equivalent"
      ],
      answer: 1,
      why: "Stage 2 already uses lifetime expected loss, same as Stage 3 — the loss horizon does not change at the Stage 2→3 transition. What changes is the interest income basis: gross carrying amount (Stage 2) to net, post-provision carrying amount (Stage 3). The \"loss horizon changes from 12-month to lifetime\" answer is the classic trap that assumes lifetime loss only starts at Stage 3."
    },
    {
      q: "Which component of expected loss reflects the choice of lending product (e.g., secured mortgage vs. unsecured personal loan)?",
      options: [
        "Probability of default (PD)",
        "Loss given default (LGD)",
        "Exposure at default (EAD)",
        "Unexpected loss (UL)"
      ],
      answer: 1,
      why: "LGD is expressed as the percentage of exposure lost in default and reflects how well-secured the specific product is — a secured mortgage has lower LGD than an unsecured loan. PD reflects who was lent to (borrower-specific default likelihood); EAD reflects how much/how long exposure existed; UL isn't a component of EL at all, it's what EL fails to capture."
    },
    {
      q: "A bank is checking a client's exposure against its single-client concentration limit. The client's $80 million loan is fully secured by marketable collateral worth $80 million. How much exposure should count against the concentration limit?",
      options: [
        "$0, since the loan is fully collateralized",
        "Some amount less than $80 million, netting for collateral value",
        "$80 million — collateral is not considered when sizing exposure for concentration limits",
        "It depends on whether the collateral is cash or cash-equivalents"
      ],
      answer: 2,
      why: "The source is explicit that collateral should NOT be considered when sizing risk exposures for concentration purposes — the full $80 million counts. This is separate from asset classification, where full collateralization with cash/cash-equivalents CAN keep a loan in the 'standard' bucket. Confusing the two contexts is the trap here."
    },
    {
      q: "A borrower is roughly 105 days delinquent. The bank has seized some collateral as a secondary repayment source but is actively working with the borrower on a plan to find new customers and resume payments. How should this loan most likely be classified?",
      options: [
        "Specially mentioned",
        "Substandard",
        "Doubtful",
        "Loss"
      ],
      answer: 1,
      why: "Over 90 days delinquent with the primary repayment source already failed (hence the bank falling back on collateral) fits substandard, not the milder 'specially mentioned' (which is for potential, not yet realized, weaknesses) or the more severe 'doubtful'/'loss' categories, which require longer delinquency (180 days / one year) or a much bleaker recovery outlook. The active, cooperative workout in progress is consistent with substandard rather than doubtful or loss."
    },
    {
      q: "Bank A retains loss assets on its balance sheet for extended collection efforts (British model); Bank B writes off loss assets immediately (U.S. model). All else equal, whose loan loss reserves will appear larger relative to the size of its loan portfolio?",
      options: [
        "Bank B, because write-offs increase the reserves account",
        "Bank A, because retention keeps loss assets and their reserves on the books longer",
        "They will be identical, since both banks have the same underlying credit losses",
        "Neither — reserve size is unrelated to the retention/write-off choice"
      ],
      answer: 1,
      why: "Retention (British model) keeps loss assets and their associated reserves on the balance sheet, making reserves look larger relative to the portfolio. Write-off (U.S. model) removes loss assets from the reserves account immediately, shrinking the reported ratio even with identical underlying credit quality. A small reserve ratio is therefore not automatically a red flag."
    },
    {
      q: "Which of the following is explicitly excluded from portfolio-level credit risk analysis, per the source material?",
      options: [
        "A summary of major loan types with average maturity and interest rate",
        "Analysis of nonperforming loans by vintage year",
        "Commentary from the credit risk officer",
        "A review of loans by risk classification"
      ],
      answer: 2,
      why: "Portfolio-level analysis covers loan-type summaries, portfolio distribution/segmentation, guaranteed-loan lists, risk-classification reviews, and nonperforming-loan vintage analysis — but credit risk officer commentary is a case-by-case, individual-loan input, not a portfolio-level metric, so it's excluded from this list."
    }
  ],

  sources: [
    { title: "IFRS 9 Financial Instruments — Wikipedia", url: "https://en.wikipedia.org/wiki/IFRS_9", note: "Background on the 2018 shift from IAS 39's incurred-loss model to IFRS 9's forward-looking expected-credit-loss model and its three-stage structure." },
    { title: "Loan Loss Provision — Investopedia", url: "https://www.investopedia.com/terms/l/loanlossprovision.asp", note: "Plain-language explanation of loan loss provisions and reserves and why banks set them aside." },
    { title: "Nonperforming Loan (NPL) — Investopedia", url: "https://www.investopedia.com/terms/n/nonperformingloan.asp", note: "Definition and thresholds for nonperforming loans, useful context for the 90/180/365-day classification triggers." },
    { title: "Probability of Default — Investopedia", url: "https://www.investopedia.com/terms/p/probability-of-default.asp", note: "Overview of PD as a credit risk input, complementing this reading's PD/LGD/EAD breakdown." }
  ],

  pdf: { book: 2, query: "This topic focuses on how banks manage credit risk exposures" },

  summary: `<p><strong>Lending policy</strong>: concentration limits (10%–25% of capital per client, excluding collateral from exposure sizing) and related-party limits (percentage of Tier 1 capital) constrain risk-taking; portfolio reviews must cover set dollar/number thresholds plus always-review categories (large single-client exposures, related parties, altered terms, 30+ day delinquencies, already-troubled loans). <strong>Asset classification</strong>: standard → specially mentioned → substandard → doubtful → loss; provisioning rises with each step, with rough day-delinquent thresholds of 90/180/365 days pushing loans into substandard/doubtful/loss unless sufficiently secured. <strong>IFRS 9 three-stage model</strong>: Stage 1 (performing) = 12-month EL, gross interest; Stage 2 (any delinquency) = LIFETIME EL, gross interest; Stage 3 (nonperforming) = LIFETIME EL, NET interest — Stages 2 & 3 share the lifetime-loss horizon and differ only in interest basis. <strong>EL vs UL</strong> introduced qualitatively (EL = PD × LGD × EAD, where PD = who, LGD = what product, EAD = how much/how long, as the average loss; UL as the variability around it) — becomes fully quantitative in R20. <strong>Loan workout</strong>: four steps in any order — collect additional security, consult with the borrower, bring in a third party, or liquidate out-of-court. <strong>Retention vs. write-off</strong>: British retention makes reserves look larger relative to the loan book; U.S. write-off makes them look smaller, for identical underlying credit quality. <strong>Credit risk analysis and capacity review</strong> round out the reading: portfolio-level analysis (loan-type summaries, segmentation, guarantees, classification review, NPL vintage analysis — no credit-officer commentary) versus the Board-level capacity review (lending process, staffing, information flows) that answers whether the bank actually has the people and information pipeline to manage the risk its policies describe.</p>`
});
