export default ({
  book: 5, reading: 91,
  session: "Risk Management and Investment Management",
  title: "Predicting Fraud by Investment Managers",
  tagline: "Investment advisors face no experience/accreditation requirements and no ban on conflicts of interest — only a DISCLOSURE requirement (Form ADV). Investors must learn to read those disclosures as fraud predictors.",

  teaches: `<p>Why predicting fraud matters; Form ADV predictive variables (conflicts of interest, soft dollar arrangements, broker-dealer association, custodian role, ICA registration, chief compliance officer, employee ownership, investor size, agent clients, hedge fund management); predicting theft vs. fraudulent misrepresentation specifically; costs/barriers to fraud prediction; and improvements in Form ADV data accessibility.</p>`,

  why: `<p>Directly extends R90's due diligence framework with a specific, quantifiable data source: Form ADV. Several of the predictive relationships are genuinely counter-intuitive (ICA registration and CCO existence PREDICT fraud in one dimension while REDUCING it in another) — memorize the exact direction for each variable, not just "more oversight is good."</p>`,

  intuition: `<p>The U.S. regulatory approach to investment advisors is DISCLOSURE-based, not restriction-based: there's no law against an advisor having conflicts of interest, no minimum experience requirement — advisors simply must DISCLOSE what they do via Form ADV, and it's on INVESTORS to read and interpret those disclosures. This reading catalogs which Form ADV disclosures actually predict future fraud, separating genuine red flags from intuitive-but-unsupported worries.</p>
  <p>The most important nuance: several variables split their prediction power by FRAUD TYPE. ICA registration and having a CCO both REDUCE the risk of fraudulent misrepresentation (more oversight, more audits) but do NOT reduce (or even slightly predict) theft — because ICA-registered firms can still have vulnerable, easily-defrauded clients, and a CCO doesn't stop management from directly stealing assets.</p>`,

  formulas: [],

  eli5: `<p>Imagine you're renting an apartment, and instead of the city banning landlords from having conflicts of interest (say, owning the repair company they hire to fix your unit), the law just makes the landlord post a big sign in the lobby listing every side business they run and every relationship that could bias their decisions — and then it's entirely YOUR job, as the renter, to read that sign carefully before signing a lease. Most renters never read the sign. Some read it but don't know which items on it actually predict a bad landlord versus which ones just sound scary but turn out to be harmless (maybe the landlord also owning the parking garage next door is totally fine, but the landlord doubling as your only "objective" building inspector is a real red flag). <strong>The sign is Form ADV, the landlord is the investment advisor, and figuring out which disclosed facts are genuine fraud predictors versus false alarms is exactly the skill this reading teaches.</strong></p>`,

  thinkLike: `<p>A risk manager doing due diligence on an investment manager does not treat Form ADV as a checkbox compliance document — she treats it as a dataset with statistically tested predictive power, and she has memorized which specific disclosed facts move the fraud probability needle and in which direction. She does NOT reason from first principles ("conflicts of interest sound bad, so anything conflict-adjacent must raise fraud risk") because several of the most intuitive-sounding red flags (soft dollar arrangements, self-custody, majority employee ownership) turn out, empirically, not to predict fraud at all. Instead she asks two separate questions for every fact on the form: (1) does this predict fraud in general, and (2) if so, which TYPE of fraud — theft (Ponzi schemes, misappropriation, self-dealing) or fraudulent misrepresentation (lying about performance, valuations, or strategy)? This distinction matters because some safeguards (ICA registration, a dedicated CCO) only work against one type and are useless, or even slightly counter-productive, against the other.</p>
  <p>GARP tests this reading almost entirely as a scenario-matching exercise: you'll be given a firm's Form ADV disclosures (broker-dealer affiliation, ICA registration, CCO presence, investor size, client type) and asked to identify which single fact is the strongest fraud predictor, or asked to correctly state the DIRECTION of a given variable's effect. The exam deliberately baits you with the intuitive-but-wrong answer (e.g., "self-custody must be the red flag" or "having a CCO must reduce theft too") — the only defense is precise memorization of the exact direction for each variable, not general reasoning about "more oversight is always good."</p>`,

  breakdown: [
    {
      title: "Form ADV predictive variables and their exact direction",
      points: [
        "Conflicts of interest (ownership stake in recommended securities, transacting with clients, receiving referral fees): HIGHER fraud likelihood — the firm has a direct financial incentive misaligned with the investor's.",
        "Soft dollar arrangements (the firm receives benefits — like research or services — from the broker executing client trades, creating an incentive to use a costlier broker): does NOT predict fraud, despite the obvious-sounding conflict.",
        "Broker-dealer association (the firm is affiliated with its own broker-dealer rather than using an unrelated one): MUCH more likely fraud — the firm loses an external, independent monitor who could otherwise catch front-running or overcharging.",
        "Serving as its own custodian (holding client cash/securities itself rather than using an independent custodian): does NOT predict greater fraud, even though third-party oversight is lost — other safeguards (e.g., a required unannounced annual asset-verification visit) appear to substitute adequately.",
        "Registration under the Investment Company Act (ICA) of 1940: PREDICTS theft (counter-intuitively, because ICA-registered firms may serve more vulnerable, easily-defrauded clients) but REDUCES fraudulent misrepresentation (via the audit requirements that come with registration).",
        "Chief compliance officer (CCO) existence (a dedicated officer who holds no other role at the firm): does NOT significantly reduce theft, but DOES reduce fraudulent misrepresentation (via greater internal monitoring).",
        "Majority employee ownership: NOT significantly associated with greater fraud, despite the intuitive worry that internal ownership removes external monitoring.",
        "Investor size: SMALLER investors face a HIGHER likelihood of being defrauded; larger investors face a LOWER likelihood (larger, more sophisticated investors are harder targets and demand more scrutiny).",
        "Clients who are agents rather than direct beneficiaries (e.g., a pension fund manager investing on behalf of plan participants who are not present at the table): MORE likely fraud — the true beneficiary isn't the one monitoring the relationship.",
        "Firms managing hedge funds: NOT significantly associated with greater fraud, though the opaque nature of hedge funds may UNDERSTATE detected fraud (fraud happens but goes unnoticed) rather than genuinely prevent it."
      ]
    },
    {
      title: "Theft vs. fraudulent misrepresentation — which variables predict which",
      points: [
        "Theft (Ponzi schemes, self-dealing, misappropriation of assets, overstating asset values) is predicted by: any past regulatory violations, firms that pay referral fees, firms with mainly smaller clients, and firms with mainly agent clients.",
        "Fraudulent misrepresentation (lying about performance, valuations, or strategy) is strongly predicted by past regulatory violations (a signal of underlying unethical culture and weak internal controls) — and this is the ONE variable that predicts BOTH fraud types.",
        "ICA registration REDUCES fraudulent misrepresentation risk (via audit requirements) but does NOT reduce — and in fact predicts — theft risk (vulnerable clients).",
        "CCO existence REDUCES fraudulent misrepresentation risk (via internal monitoring) but does NOT significantly reduce theft risk.",
        "Firm-wide fraud driven by SENIOR MANAGEMENT is harder to predict than fraud committed by a single ROGUE EMPLOYEE; firms with noted internal-control weaknesses are specifically more likely to see rogue-employee fraud, a narrower and more detectable pattern than top-down, firm-wide fraud."
      ]
    },
    {
      title: "Barriers to implementing fraud prediction (four distinct obstacles)",
      points: [
        "Cost-benefit ceiling: 100% fraud eradication would almost certainly cost more than the fraud it prevents, so some residual fraud risk is economically rational to tolerate.",
        "Lost 'fraud risk premium': some investors knowingly accept fraud risk in exchange for lower fees or higher expected returns; aggressive fraud prevention removes that trade-off option from investors who wanted it.",
        "Free-rider problem: the total cost of researching and estimating fraud risk can be lower than the combined benefit to ALL investors, but higher than the benefit to any ONE investor who would have to pay for it alone — since other investors would benefit from the research without contributing, no single investor is individually incentivized to fund it (a classic public-goods problem).",
        "Short-sale restriction: because most investors can't easily short a fraud-prone fund, identifying fraud risk in advance mostly lets you AVOID the investment rather than profit directly from having spotted it — an indirect, weaker benefit than in markets where shorting is easy."
      ]
    },
    {
      title: "Form ADV accessibility — three-stage improvement",
      points: [
        "Stage 1 (worst): the SEC disclosed only the MOST RECENT Form ADV, so investors had no way to see a firm's history of past (even repeated) violations.",
        "Stage 2 (technically better, practically useless): the SEC began providing historical filings, but only in a manually-downloaded, ENCODED format that most ordinary investors couldn't practically extract data from.",
        "Stage 3 (current): the SEC moved both current AND historical Form ADV filings to a standardized, user-friendly format, finally making fraud-prediction due diligence practical for ordinary investors rather than just those with data-extraction resources."
      ]
    }
  ],

  quiz: [
    {
      q: "Under U.S. law, investment advisors managing more than what threshold of assets must file Form ADV annually (or upon any material change) with the SEC?",
      options: ["$10 million", "$25 million", "$50 million", "$100 million"],
      answer: 1,
      why: "The threshold is $25 million. $10 million is too low and isn't the actual SEC threshold; $50 million and $100 million are the RBO/LFBO bank-size thresholds from a different reading (R94, SVB) and are easy to confuse with this one because both readings involve size-based regulatory triggers."
    },
    {
      q: "A firm is registered under the Investment Company Act (ICA) of 1940. What does this predict about its fraud risk?",
      options: [
        "Lower risk of both theft and fraudulent misrepresentation",
        "Higher risk of theft, but lower risk of fraudulent misrepresentation",
        "Lower risk of theft, but higher risk of fraudulent misrepresentation",
        "No significant effect on either type of fraud"
      ],
      answer: 1,
      why: "ICA registration is the reading's signature counter-intuitive result: it PREDICTS theft (registered firms may serve more vulnerable, easily-defrauded clients) while REDUCING fraudulent misrepresentation (via mandatory audits). The tempting wrong answer is 'lower risk of both' — treating registration as a blanket safety signal, which is exactly the trap the reading warns against."
      },
    {
      q: "Which of the following Form ADV disclosures does NOT show significant evidence of predicting higher fraud likelihood, despite sounding like an obvious conflict of interest?",
      options: [
        "The firm is affiliated with its own broker-dealer",
        "The firm serves as its own custodian for client assets",
        "The firm has clients who are agents rather than direct beneficiaries",
        "The firm has conflicts of interest such as referral fees"
      ],
      answer: 1,
      why: "Serving as its own custodian does NOT predict fraud empirically, even though it sounds identical in structure to broker-dealer affiliation (both 'lose an external monitor'). The other three options (broker-dealer affiliation, agent clients, conflicts of interest/referral fees) are all confirmed, significant fraud predictors — the distractor exploits the fact that custodian role and broker-dealer affiliation have superficially similar 'lost oversight' stories but opposite empirical outcomes."
    },
    {
      q: "An investment firm has a dedicated chief compliance officer (CCO) who holds no other role at the firm. What is the most accurate statement about this fact's predictive value?",
      options: [
        "It significantly reduces both theft and fraudulent misrepresentation risk",
        "It significantly reduces theft risk but has no effect on fraudulent misrepresentation",
        "It significantly reduces fraudulent misrepresentation risk but does not significantly reduce theft risk",
        "It has no significant predictive value for either fraud type"
      ],
      answer: 2,
      why: "A CCO reduces fraudulent misrepresentation (via internal monitoring) but does NOT significantly reduce theft. The most common wrong answer is the 'reduces both theft and fraudulent misrepresentation' answer — assuming a compliance officer is a universal fraud deterrent — but the reading is explicit that oversight structures are not a blanket fraud vaccine; they work on specific fraud types via specific mechanisms."
    },
    {
      q: "What best explains the free-rider problem as a barrier to implementing fraud prediction research?",
      options: [
        "The total cost of the research exceeds total investor benefit, so no one should fund it",
        "The cost may be lower than the collective benefit to all investors, but higher than the benefit to any single investor who would have to pay for it alone, while other investors benefit for free",
        "Regulators refuse to allow private investors to conduct fraud research",
        "Short-sale restrictions make fraud research illegal to act on"
      ],
      answer: 1,
      why: "This is the precise free-rider mechanic: aggregate benefit exceeds aggregate cost, but any single investor bearing the cost alone can't capture enough of the benefit to justify it, since other investors free-ride on the resulting information without paying. The 'total cost exceeds total benefit' answer gets the cost-benefit direction backwards (the reading says costs are LOWER than aggregate benefits, not higher). The 'short-sale restrictions make fraud research illegal' answer confuses the free-rider problem with the separate short-sale-restriction barrier."
    },
    {
      q: "What is the current state of SEC Form ADV data accessibility for investors conducting fraud-prediction due diligence?",
      options: [
        "Only the current Form ADV is available, in standardized format",
        "Current and historical Form ADV filings are both available, but only in an encoded format requiring manual extraction",
        "Current and historical Form ADV filings are both available in a standardized, user-friendly format",
        "Only historical filings are available; current filings are not disclosed"
      ],
      answer: 2,
      why: "The SEC has moved to providing BOTH current and historical Form ADV filings in a standardized format — the final and most accessible stage of a three-stage evolution (current-only → encoded historical → standardized historical). The 'encoded format requiring manual extraction' answer describes the SEC's earlier, now-superseded intermediate stage, a common trap for readers who stop tracking the improvement narrative partway through."
    }
  ],

  sources: [
    { title: "Form ADV — U.S. Securities and Exchange Commission (Investment Adviser Registration Depository)", url: "https://www.sec.gov/investment/investment-adviser-public-disclosure-iapd", note: "The SEC's public disclosure system where investors can pull a firm's current and historical Form ADV filings directly — the practical version of the reading's 'standardized format' improvement." },
    { title: "Investment Advisers Act of 1940 — Wikipedia", url: "https://en.wikipedia.org/wiki/Investment_Advisers_Act_of_1940", note: "Background on the federal law that created the Form ADV disclosure requirement and defines the disclosure-not-restriction regulatory philosophy this reading is built on." },
    { title: "Bernie Madoff — Wikipedia", url: "https://en.wikipedia.org/wiki/Bernie_Madoff", note: "Context for the reading's reference to the 'post-Bernie-Madoff environment' shifting regulatory emphasis from disclosure alone toward securities-law enforcement." },
    { title: "Ponzi scheme — Investopedia", url: "https://www.investopedia.com/terms/p/ponzischeme.asp", note: "Explains the mechanics of the classic theft-type fraud (Ponzi scheme) the reading cites as an example of what past-violations and referral-fee variables predict." }
  ],

  pdf: { book: 5, query: "It is important that investors be able to predict fraud" },

  concepts: [
    {
      name: "Why fraud prediction matters and the disclosure-based regime",
      def: "Fraud often results in TOTAL LOSS for investors, dramatically raising bankruptcy probability once disclosed. In the U.S., there's no experience/accreditation requirement for advisors and no law against conflicts of interest — advisors must only DISCLOSE them via Form ADV (required under the Investment Advisers Act of 1940).",
      pitfall: "The Form ADV compliance cost (~$500M estimated) is SMALL relative to the $4B+ in fraud losses experienced by the 5% of firms identifiable IN ADVANCE as highest-fraud-risk — a strong cost-benefit case for using Form ADV data.",
      related: [{ r: 90, label: "R90 — the due diligence framework Form ADV feeds directly" }]
    },
    {
      name: "Predictive variables from Form ADV",
      def: "Conflicts of interest (ownership interest in recommended securities, client transactions, referral fees): HIGHER fraud likelihood. Soft dollar arrangements (broker benefits to the firm): despite the apparent conflict, does NOT predict fraud. Broker-dealer association: MUCH more likely fraud (loses an external monitor — no unrelated broker to catch problems). Serving as custodian: does NOT predict greater fraud likelihood (despite losing third-party oversight). ICA registration (1940 Act): predicts fraud from THEFT (counter-intuitively — more vulnerable/easily-defrauded clients), but REDUCES risk of fraudulent misrepresentation (audit requirements help). Chief compliance officer (CCO) existence: does NOT significantly reduce theft, but DOES reduce fraudulent misrepresentation risk. Majority employee ownership: NOT significantly associated with greater fraud likelihood (despite the intuitive 'less external monitoring' concern). Investor size: SMALLER investors → MORE likely fraud (larger investors → less likely). Clients who are agents (e.g., a pension fund manager who isn't the direct beneficiary): MORE likely fraud. Firms managing hedge funds: NOT significantly associated with greater fraud (though opacity may UNDERSTATE detected fraud rather than genuinely reduce its occurrence).",
      pitfall: "Several variables have DIRECTIONALLY SPLIT effects across fraud TYPES — ICA registration and CCO existence both increase/neutral on THEFT but REDUCE fraudulent misrepresentation specifically. Don't treat 'more regulatory oversight' as a blanket fraud reducer; it depends on which type of fraud you're asking about.",
      related: ["Predicting different types of fraud"],
      memory: "Broker-dealer association: strong RED FLAG (loses an external monitor). Soft dollar arrangements, custodian role, majority employee ownership: intuitive-sounding worries that DON'T actually predict fraud — memorize these as the 'false alarms.'"
    },
    {
      name: "Predicting different types of fraud: theft vs. fraudulent misrepresentation",
      def: "Theft (Ponzi schemes, self-dealing, misappropriation, overstating asset values) is predicted by: any past regulatory violations, referral-fee-paying firms, mainly-smaller-client firms, and mainly-agent-client firms. Fraudulent misrepresentation is strongly predicted by past regulatory violations (suggesting underlying unethical-behavior/control-weakness patterns) — but REDUCED by ICA registration (audit requirements) and CCO existence (internal monitoring).",
      pitfall: "Firm-WIDE fraud perpetrated by SENIOR MANAGEMENT is harder to predict than fraud by a ROGUE EMPLOYEE — firms with noted internal-control weaknesses are specifically more likely to experience ROGUE EMPLOYEE fraud (a narrower, more detectable pattern than top-down fraud).",
      related: [],
      memory: "Past violations predict BOTH fraud types. But ICA registration and CCO existence only fight misrepresentation, not theft — oversight structures aren't a universal fraud vaccine."
    },
    {
      name: "Costs and barriers to fraud prediction",
      def: "Implementing fraud prediction is a COST-BENEFIT decision — 100% fraud eradication would likely cost more than its benefit. Post-Bernie-Madoff, more attention has shifted to securities law ENFORCEMENT (previously, cost considerations kept the emphasis mostly on disclosure alone).",
      pitfall: "Some investors are WILLING to assume more fraud risk in exchange for lower fees/higher returns — strong fraud prediction/prevention would prevent these investors from earning a 'fraud risk premium,' an unintended cost of anti-fraud rigor. There's also a FREE-RIDER PROBLEM: fraud-risk-estimation costs may be LOWER than the benefit for investors AS A WHOLE, but HIGHER than the benefit for any SINGLE investor bearing the cost alone (other investors who benefit won't contribute). Finally, SHORT-SALE RESTRICTIONS limit the benefit of identifying fraud risk to merely AVOIDING the investment (an indirect benefit) — you can't profit by shorting a fraud-prone fund directly in most cases.",
      related: [],
      memory: "Free-rider problem: fraud detection is worth doing for everyone collectively, but not worth paying for alone — a classic public-goods problem applied to fraud research."
    },
    {
      name: "Improving Form ADV data accessibility",
      def: "The SEC previously disclosed only the MOST RECENT Form ADV, hiding historical (one-time or repeated) violations from investors. The SEC then began providing HISTORICAL filings — but initially only in an impractical, manually-downloaded ENCODED format.",
      pitfall: "The SEC has since moved to a STANDARDIZED, user-friendly format for BOTH current and historical Form ADV filings — a genuine accessibility improvement making fraud-prediction due diligence practical for ordinary investors, not just those with data-extraction resources.",
      related: [],
      memory: "Historical Form ADV access went from nonexistent → technically available but unusable (encoded) → genuinely accessible (standardized format) — a three-stage transparency improvement."
    }
  ],

  connections: {
    from: [
      { r: 90, why: "This reading's Form ADV analysis is the specific, quantifiable data source that feeds R90's background-check and fraud-risk-assessment due diligence process." }
    ],
    to: [],
    confused: [
      { what: "ICA registration's effect on theft vs. fraudulent misrepresentation", how: "ICA registration PREDICTS (doesn't reduce) theft risk — counter-intuitively, due to vulnerable clients — but REDUCES fraudulent misrepresentation risk via audit requirements. Two opposite directions for two fraud types." },
      { what: "Variables that sound like red flags but aren't (soft dollar arrangements, custodian role, employee ownership)", how: "All three have an intuitive conflict-of-interest story, but NONE of them show significant evidence of predicting greater fraud likelihood — don't let plausible-sounding theories substitute for the reading's actual empirical findings." },
      { what: "Broker-dealer association vs. custodian role", how: "Broker-dealer association DOES significantly predict fraud (loses an external monitor); serving as custodian does NOT predict fraud despite a similar-sounding 'loses third-party oversight' argument — similar stories, different empirical outcomes." }
    ]
  },

  misconceptions: [
    { wrong: "\"A firm being registered under the Investment Company Act of 1940 reduces its likelihood of committing fraud overall.\"", right: "ICA registration actually PREDICTS higher theft risk (counter-intuitively, due to more vulnerable clients) — it only REDUCES fraudulent misrepresentation risk specifically (via audit requirements), not fraud in general." },
    { wrong: "\"Soft dollar arrangements, serving as custodian, and majority employee ownership are all significant fraud predictors, given their obvious conflicts of interest.\"", right: "None of these three show significant evidence of predicting greater fraud likelihood, despite each having an intuitive conflict-of-interest story — this is one of the reading's key counter-intuitive findings." },
    { wrong: "\"Investors as a group should always be willing to pay for comprehensive fraud detection research, since the benefits clearly exceed the costs.\"", right: "While costs may be lower than benefits for investors as a WHOLE, a single investor often can't justify bearing the full cost alone (since other investors would free-ride on the benefit without contributing) — a genuine barrier to implementing fraud prediction in practice." },
    { wrong: "\"Firms with a chief compliance officer (CCO) show significantly reduced theft risk.\"", right: "Having a CCO does NOT significantly reduce theft — it specifically reduces fraudulent MISREPRESENTATION risk (via greater internal monitoring), a narrower effect than 'less fraud overall.'" }
  ],

  highYield: [
    { stars: 5, what: "Full list of Form ADV predictive variables and their EXACT direction (predicts fraud / reduces fraud / no significant effect) — especially the split-by-fraud-type variables (ICA registration, CCO).", why: "The core, most granular, most frequently tested content of this reading — precise directions matter enormously." },
    { stars: 4, what: "Theft vs. fraudulent misrepresentation: which variables predict which type.", why: "A precise two-category classification frequently tested via scenario matching." },
    { stars: 3, what: "The free-rider problem and short-sale-restriction limitation on fraud-prediction benefits.", why: "A specific, well-defined economic barrier worth precise recall." },
    { stars: 2, what: "SEC Form ADV accessibility evolution: current-only → encoded historical → standardized historical.", why: "A clean three-stage improvement narrative, straightforward recall." }
  ],

  recall: [
    { q: "A firm is registered under the Investment Company Act of 1940. Does this make theft or fraudulent misrepresentation more or less likely, and why the apparent contradiction?", a: "ICA registration is actually a PREDICTOR of theft risk (counter-intuitively) — registered firms may have more vulnerable clients who are easier to defraud through theft, despite greater regulatory requirements. However, ICA registration REDUCES fraudulent misrepresentation risk, likely due to the audit requirements that come with registration. The apparent contradiction resolves once you recognize these are two DIFFERENT fraud types with different underlying mechanisms — audits catch misrepresentation but don't necessarily prevent a determined thief from targeting vulnerable clients." },
    { q: "Why doesn't a firm serving as its own custodian show a significantly higher likelihood of fraud, despite losing third-party oversight?", a: "While the intuitive story (loss of an independent check on asset custody) suggests higher fraud risk, the empirical evidence does NOT support a significant increase in fraud likelihood for firms serving as their own custodian — likely because other safeguards (like required unannounced annual asset verification visits) provide sufficient mitigation even without a fully independent custodian." },
    { q: "Explain the free-rider problem as it applies to fraud prediction research in the investment management industry.", a: "The total cost of gathering data and estimating fraud risk may be smaller than the aggregate benefit to ALL investors collectively. However, no single investor can typically justify bearing that full cost alone, since once the fraud-risk information is produced, other investors would benefit from it without having contributed to its cost (a classic public-goods free-rider problem) — this discourages any individual investor from funding the research even when it would be collectively worthwhile." }
  ],

  hooks: [
    { title: "Disclosure, not prohibition", text: "U.S. law doesn't ban advisor conflicts of interest — it just makes them confess to Form ADV. The entire fraud-prediction game is reading that confession correctly." },
    { title: "The false alarms", text: "Soft dollar arrangements, serving as custodian, majority employee ownership — three variables that SOUND like red flags but empirically aren't. Memorize them as the reading's 'don't panic' list." },
    { title: "Two fraud diseases, two different vaccines", text: "ICA registration and a CCO are vaccines against fraudulent MISREPRESENTATION — they don't touch THEFT. Treating all 'oversight' as one universal cure is exactly the mistake this reading corrects." }
  ],

  summary: `<p>The U.S. regime is disclosure-based (Form ADV), not restriction-based. <strong>Predicts fraud</strong>: conflicts of interest, broker-dealer association, ICA registration (theft specifically), smaller investors, agent clients, past regulatory violations. <strong>Does NOT predict fraud</strong> (despite intuitive stories): soft dollar arrangements, serving as custodian, majority employee ownership, managing hedge funds. <strong>Reduces fraudulent misrepresentation specifically</strong> (but not theft): ICA registration, having a CCO. <strong>Theft predictors</strong>: past violations, referral fees, smaller clients, agent clients. <strong>Barriers to fraud prediction</strong>: cost-benefit trade-off (100% eradication too costly), lost fraud-risk-premium for risk-tolerant investors, free-rider problem, short-sale restrictions limiting benefit to mere avoidance. <strong>Form ADV accessibility</strong> improved from current-only → encoded historical → standardized historical format.</p>`
});
