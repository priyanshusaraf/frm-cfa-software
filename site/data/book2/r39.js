FRM.register({
  book: 2, reading: 39,
  session: "Counterparty Risk Management",
  title: "An Introduction to Securitization",
  tagline: "Closes the book by returning to securitization mechanics from R28, but from the plumbing side — participants, SPV structures, and the full set of named performance ratios.",

  teaches: `<p>Participants and the true sale, cash waterfall/first-loss piece/overcollateralization, three SPV structure types, why financial institutions securitize, credit enhancements, and the performance-ratio calculation zoo (delinquency ratio, default ratio, MPR, DSCR, WAC, WAM, WAL, CPR, PSA).</p>`,

  why: `<p>These ratios show up as plug-and-chug calculation questions, so make sure you can compute each one, not just define it. This reading also resolves a subtle but frequently-tested asymmetry: the SPV's liability side (notes issued) costs LESS than its asset side (receivables) — that gap is the excess spread everyone in the structure depends on.</p>`,

  intuition: `<p>The "true sale" concept is the legal foundation everything else depends on: the SPV must be a legally distinct entity, genuinely insulated from the originator's own insolvency — otherwise investors in the securitization would be exposed to the originator's OWN credit risk, defeating the entire purpose of tranching by asset performance instead.</p>
  <p>Overcollateralization is a subtle mechanism: pool assets EXCEED the notes issued against them (e.g., 101 mortgages backing 100 mortgages' worth of notes) — investors absorb one default "for free" before any tranche actually takes a loss. This is why the MOST SENIOR class is NOT the overcollateralized one — overcollateralization protects the senior tranche precisely by making the MOST JUNIOR class absorb the excess collateral risk.</p>`,

  formulas: [
    { name: "Delinquency ratio", math: "\\dfrac{\\text{90dpd balance}}{\\text{total pool balance}}", note: "$880,000/$57,800,000 = 1.522% in the worked example." },
    { name: "Default ratio", math: "\\dfrac{\\text{Written-off balance}}{\\text{total pool balance}}", note: "$1,100,000/$57,800,000 = 1.903%." },
    { name: "Monthly payment rate (MPR)", math: "\\text{MPR} = \\dfrac{\\text{Monthly P\\&I}}{\\text{total pool balance}}", note: "$1,560,000/$57,800,000 = 2.699%." },
    { name: "DSCR", math: "\\text{DSCR} = \\dfrac{\\text{NOI}}{\\text{total debt payments}}", note: "$89,572,500/$87,958,000 = 1.02. DSCR<1 means the pool doesn't cover debt service; residential typically 2.5-3.0." },
    { name: "WAC", math: "\\text{WAC} = \\dfrac{\\sum(\\text{pool balance}\\times\\text{pool rate})}{\\text{total balance}}", note: "($6M×7.8%+$10M×6.0%+$4M×5.0%)/$20M = 6.34%." },
    { name: "CPR from SMM", math: "CPR = 1 - (1-SMM)^{12}", note: "SMM=1.5% → CPR = \\(1- (1- 0.015)^{12}\\) = 16.59%." }
  ],

  concepts: [
    {
      name: "Participants and the true sale",
      def: "Originator (creates, sells assets) → issuer/SPV (legally distinct entity — this separateness makes it a 'true sale,' insulating investors from originator insolvency) → structuring agent (designs tranches/triggers) → trustee (safeguards investor interests) → financial guarantor (insurance wrap) → custodian (holds/moves cash/securities) → credit rating agencies (set attachment points, same issuer-pays conflict as R28).",
      pitfall: "The 'true sale' legal separateness is THE foundational concept — without it, the entire tranching exercise is undermined by exposure to the originator's own credit risk.",
      related: [{ r: 28, label: "R28 — the same rating-agency conflict of interest" }]
    },
    {
      name: "Cash waterfall, first-loss piece, overcollateralization",
      def: "Overcollateralization: pool assets (e.g., 101 mortgages) exceed notes issued (100 mortgages) — investors absorb one default 'for free.' First-loss piece = equity tranche, usually retained by the originator (skin in the game). Cash waterfall: senior paid before junior; if a coverage test fails, principal starts amortizing senior-first instead of paying subordinate interest.",
      pitfall: "The most senior class of notes is NOT the overcollateralized one — overcollateralization protects the SENIOR tranche by making the LOWEST/most junior class absorb the excess collateral risk. A commonly reversed fact.",
      related: [{ r: 28, label: "R28 — waterfall mechanics with full numeric example" }],
      memory: "Overcollateralization is a gift FROM the junior tranche TO the senior tranche, not the other way around."
    },
    {
      name: "Three SPV structures",
      def: "Amortizing (pass-through): principal & interest paid on schedule as received, valued via WAL, needs prepayment assumptions (residential/commercial mortgages, consumer loans). Revolving: principal reinvested into new receivables during a revolving period, repaid via controlled amortization or 'soft bullet' (credit card debt, auto loans). Master trust: one SPV supports multiple/frequent issuances, often paired with a grantor trust, excess spread shared across series (credit card ABS, mortgages).",
      related: []
    },
    {
      name: "Why financial institutions securitize",
      def: "Funding (diversifies funding mix, matches asset/liability duration, SPV often has a higher rating → cheaper funding than the originator's own debt). Balance sheet/capital management (Basel-driven regulatory capital relief since SPVs aren't banks). Risk management (removes non-performing assets and their reputational drag).",
      example: "Investor benefits: access to new diversified asset classes, customizable risk-return via tranching, often higher risk-adjusted return than similarly-rated corporate bonds.",
      related: []
    },
    {
      name: "Credit enhancements",
      def: "Overcollateralization, pool insurance (third-party covers principal loss), subordination (class B doesn't get principal until class A is redeemed), margin step-up (coupon increases after a call date the issuer chooses not to exercise), excess spread.",
      related: []
    },
    {
      name: "Performance ratios — the calculation zoo",
      def: "Credit card ABS trigger ratios: delinquency ratio (90dpd/total pool), default ratio (written-off/total pool), MPR (monthly P&I/total pool). MBS tools: DSCR (NOI/total debt payments), WAC (weighted-average coupon), WAM (weighted-average maturity), WAL (weighted, prepayment-adjusted average life).",
      example: "Loss curve: cumulative expected loss over the pool's life — prime loans show an even distribution, subprime a steeper early curve. Absolute prepayment speed (APS): actual period payments as % of total pool balance.",
      related: ["CPR and PSA"]
    },
    {
      name: "CPR and PSA",
      def: "CPR = \\(1- (1- SMM)^{12}\\) (constant prepayment rate annualized from single monthly mortality). PSA benchmark: 100% PSA assumes CPR starts at 0% and rises 0.2%/month for 30 months, then holds flat at 6%.",
      example: "50% PSA: rises 0.1%/month to 3% plateau. 150% PSA: rises 0.3%/month to 9% plateau. SMM=1.5% → \\(CPR=1- (1- 0.015)^{12}=16.59\\)%.",
      related: []
    }
  ],

  connections: {
    from: [
      { r: 28, why: "Returns to the tranche/waterfall mechanics from the plumbing/mechanical side rather than the risk-pricing side." },
      { r: 22, why: "The rating-agency issuer-pays conflict of interest reappears identically here." }
    ],
    to: [],
    confused: [
      { what: "Most senior tranche vs the overcollateralized tranche", how: "The MOST JUNIOR class absorbs the overcollateralization risk, protecting the senior class — a frequently reversed fact." },
      { what: "SPV liability cost vs asset cost", how: "The SPV's liability side (notes issued) has a LOWER cost than its asset side (receivables) — that gap is exactly the excess spread. Don't flip asset/liability when this is tested." }
    ]
  },

  misconceptions: [
    { wrong: "\"The most senior tranche is the overcollateralized one, since it's the safest.\"", right: "The MOST JUNIOR class absorbs the excess collateral risk — overcollateralization protects the senior tranche precisely by making the junior class the buffer." },
    { wrong: "\"The SPV's asset side costs less than its liability side.\"", right: "The reverse — the SPV's LIABILITY side (notes issued) has a LOWER cost than its ASSET side (receivables); that cost gap is the excess spread the whole structure depends on." },
    { wrong: "\"IFRS-style stage transitions and securitization credit enhancement are the same concept.\"", right: "Distinct: credit enhancement (overcollateralization, subordination, excess spread) protects note holders structurally; it's unrelated to accounting loss-staging rules (R19)." }
  ],

  highYield: [
    { stars: 4, what: "Overcollateralization protects the senior tranche via the JUNIOR class absorbing excess risk — not the reverse.", why: "A frequently reversed, high-value tested fact." },
    { stars: 4, what: "Full performance ratio calculation fluency: delinquency ratio, default ratio, MPR, DSCR, WAC, WAM, WAL, CPR, PSA.", why: "Explicitly flagged as plug-and-chug calculation material — practice every one, not just definitions." },
    { stars: 3, what: "Three SPV structures (amortizing/revolving/master trust) and typical assets for each.", why: "A clean three-way classification, good matching-question material." },
    { stars: 3, what: "SPV liability side cheaper than asset side — the excess spread gap.", why: "A precise, easily-flipped directional fact." }
  ],

  recall: [
    { q: "A credit card ABS pool has total balance $57.8M, with $0.88M currently 90+ days past due and $1.1M written off. Compute the delinquency ratio and default ratio.", a: "Delinquency ratio = 880,000/57,800,000 = 1.522%. Default ratio = 1,100,000/57,800,000 = 1.903%. Both use total pool balance as the denominator but different numerators (currently-delinquent vs. already-written-off balances)." },
    { q: "A mortgage pool shows SMM = 2%. What is the annualized CPR?", a: "CPR = \\(1- (1- 0.02)^{12}\\) = 1−0.7847 ≈ 21.53%." },
    { q: "Why is it wrong to say the most senior tranche in a securitization is 'the overcollateralized one'?", a: "Overcollateralization means the pool of assets exceeds the notes issued — that EXCESS sits at the bottom of the capital structure, absorbed by the MOST JUNIOR tranche. The senior tranche is protected BY this junior-absorbed excess, not itself 'overcollateralized' in the sense of holding the extra buffer." },
    { q: "Why does the SPV's cost of liabilities (notes issued) need to be lower than its cost of assets (receivables) for the structure to work?", a: "The gap between the higher-yielding assets (receivables, e.g., mortgage or credit card interest) and the lower-cost notes issued to investors IS the excess spread — the cash flow that pays servicing fees, credit enhancement costs, and ultimately flows to the equity/first-loss piece. Without this positive spread, there would be no residual value to distribute down the waterfall." }
  ],

  hooks: [
    { title: "The junior tranche's gift", text: "Overcollateralization is a gift the junior tranche gives the senior tranche: 'here's one extra mortgage's worth of cushion, so you (senior) never feel the first default.' The gift always flows upward in seniority, never downward." },
    { title: "Buy low, sell high — SPV edition", text: "The SPV's whole business model is 'buy' (fund) at a low cost (notes to investors) and 'own' higher-yielding assets (receivables) — the spread between the two is the fuel for the whole structure." }
  ],

  summary: `<p><strong>True sale</strong>: the SPV's legal separateness from the originator is the foundational concept. <strong>Overcollateralization</strong>: pool assets exceed notes issued; the JUNIOR class absorbs this excess, protecting the SENIOR class (a frequently reversed fact). <strong>Three SPV structures</strong>: amortizing/pass-through (mortgages), revolving (credit cards/auto), master trust (multiple issuances, shared excess spread). <strong>Why securitize</strong>: funding diversification, capital relief, risk management. <strong>Credit enhancements</strong>: overcollateralization, pool insurance, subordination, margin step-up, excess spread. <strong>Performance ratios</strong>: delinquency ratio, default ratio, MPR (all /total pool balance); DSCR=NOI/debt payments; WAC=weighted coupon; WAM/WAL=weighted maturity/prepayment-adjusted life; \\(CPR=1- (1- SMM)^{12}\\); PSA benchmarks (100% = 0%→6% over 30 months). SPV liability side costs LESS than its asset side — that gap is the excess spread.</p>`
});
