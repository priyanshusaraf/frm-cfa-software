export default ({
  book: 2, reading: 39,
  session: "Counterparty Risk Management",
  title: "An Introduction to Securitization",
  tagline: "Closes the book by returning to securitization mechanics from R28, but from the plumbing side — participants, SPV structures, and the full set of named performance ratios.",

  teaches: `<p>Participants and the true sale, cash waterfall/first-loss piece/overcollateralization, three SPV structure types, why financial institutions securitize, credit enhancements, and the performance-ratio calculation zoo (delinquency ratio, default ratio, MPR, DSCR, WAC, WAM, WAL, CPR, PSA).</p>
  <p><strong>Securitization</strong>, defined precisely: it is the process of transforming a pool of illiquid, cash-flow-producing assets sitting on a financial institution's balance sheet — think of a bank holding thousands of individual residential mortgages, each generating a monthly payment — into a package of tradable securities (asset-backed securities, ABS, or mortgage-backed securities, MBS) that investors can buy and sell like bonds. A third party takes the messy, illiquid pool, applies credit enhancements and structuring, and issues clean, ratable, tradable notes backed by the pooled principal-and-interest cash flows. If the sale is done "without recourse" (the seller has no further liability if the loans default), the assets and the associated obligation leave the seller's balance sheet entirely — this is why securitization is called an off-balance-sheet transaction, and why it matters so much for a bank's regulatory capital math.</p>`,

  why: `<p>These ratios show up as plug-and-chug calculation questions, so make sure you can compute each one, not just define it. This reading also resolves a subtle but frequently-tested asymmetry: the SPV's liability side (notes issued) costs LESS than its asset side (receivables) — that gap is the excess spread everyone in the structure depends on.</p>`,

  intuition: `<p>The "true sale" concept is the legal foundation everything else depends on: the SPV must be a legally distinct entity, genuinely insulated from the originator's own insolvency — otherwise investors in the securitization would be exposed to the originator's OWN credit risk, defeating the entire purpose of tranching by asset performance instead. Concretely: the <strong>originator</strong> (say, a bank that made 100,000 residential mortgages) wants to convert those illiquid, long-dated loans into cash today. It sells the loan pool to the <strong>issuer</strong>, which is a special purpose vehicle (SPV) — a shell company or trust created for the sole purpose of holding this one pool of assets and issuing notes against it. For the sale to count as a "true sale" (and thus to actually get the assets and their risk off the originator's balance sheet), the SPV must be a separate legal entity from the originator, with no recourse back to the originator if the loans go bad. Practically, this means SPVs are often incorporated in SPV-friendly offshore jurisdictions (Cayman Islands, Dublin, Netherlands) and, in the U.S., are usually structured as trusts rather than corporations, because U.S. accounting rules make it harder for a corporate-form SPV to achieve enough legal distance from the originator.</p>
  <p>Overcollateralization is a subtle mechanism: pool assets EXCEED the notes issued against them (e.g., 101 mortgages backing 100 mortgages' worth of notes) — investors absorb one default "for free" before any tranche actually takes a loss. This is why the MOST SENIOR class is NOT the overcollateralized one — overcollateralization protects the senior tranche precisely by making the MOST JUNIOR class absorb the excess collateral risk. Put the mechanism in your own words: if the SPV holds 101 mortgages' worth of collateral but has only issued 100 mortgages' worth of notes, then the first mortgage default is absorbed entirely by the "extra" collateral cushion — no tranche of investors feels it. That extra collateral is economically equivalent to the equity/first-loss piece, which the originator usually retains (its "skin in the game"), so the entity taking the overcollateralization risk is the most junior class, not the safest senior class.</p>`,

  formulas: [
    { name: "Delinquency ratio", math: "\\dfrac{\\text{90dpd balance}}{\\text{total pool balance}}", note: "$880,000/$57,800,000 = 1.522% in the worked example.",
      plain: "What fraction of the whole receivables pool is currently more than 90 days past due — an early-warning signal of pool credit quality, before any of that balance is formally written off.",
      derivation: `<p>The example ABS has a total credit card receivables balance of \\(\\$57{,}800{,}000\\), broken down as: current \\(\\$49{,}900{,}000\\); 30 days past due (dpd) \\(\\$5{,}750{,}000\\); 60dpd \\(\\$1{,}270{,}000\\); 90dpd \\(\\$880{,}000\\); already written off \\(\\$1{,}100{,}000\\). The delinquency ratio only looks at the 90dpd bucket over the total pool:</p>
      \\[ \\text{Delinquency ratio} = \\dfrac{\\$880{,}000}{\\$57{,}800{,}000} = 1.522\\% \\]
      <p>Note it deliberately excludes the 30dpd and 60dpd buckets and the already-written-off balance — it is a narrow, specific early-warning trigger, not a total-distress measure.</p>` },
    { name: "Default ratio", math: "\\dfrac{\\text{Written-off balance}}{\\text{total pool balance}}", note: "$1,100,000/$57,800,000 = 1.903%.",
      plain: "What fraction of the whole pool has already been formally written off as uncollectible — a lagging, realized-loss measure rather than an early warning.",
      derivation: `\\[ \\text{Default ratio} = \\dfrac{\\$1{,}100{,}000}{\\$57{,}800{,}000} = 1.903\\% \\]
      <p>Same total-pool denominator as the delinquency ratio, but the numerator is the already-written-off balance rather than the 90dpd balance — this is why the two ratios answer different questions even though they look structurally identical.</p>` },
    { name: "Monthly payment rate (MPR)", math: "\\text{MPR} = \\dfrac{\\text{Monthly P\\&I}}{\\text{total pool balance}}", note: "$1,560,000/$57,800,000 = 2.699%.",
      plain: "What fraction of the total outstanding pool balance is paid down in principal and interest in a single month — rating agencies set a minimum MPR as a trigger to force early amortization if repayment speed falls too low.",
      derivation: `\\[ \\text{MPR} = \\dfrac{\\$1{,}560{,}000}{\\$57{,}800{,}000} = 2.699\\% \\]
      <p>Because credit card debt has no fixed maturity or amortization schedule, MPR is the closest thing to a "repayment speed" measure for that asset class — too low an MPR signals the pool's cash flows are slowing, which is exactly when a non-amortizing ABS trigger needs to kick in and force principal to start flowing to investors early.</p>` },
    { name: "DSCR", math: "\\text{DSCR} = \\dfrac{\\text{NOI}}{\\text{total debt payments}}", note: "$89,572,500/$87,958,000 = 1.02. DSCR<1 means the pool doesn't cover debt service; residential typically 2.5-3.0.",
      plain: "How many times over does the pool's net operating income cover the debt payments owed on the notes — the higher above 1.0, the more cushion before the pool's cash flows fail to cover what investors are owed.",
      derivation: `<p>Net operating income (NOI) is the cash flow left over from the underlying commercial mortgaged properties after all operating expenses are paid. Total debt payments include interest, principal, and other servicing obligations on the notes issued against the pool.</p>
      \\[ \\text{DSCR} = \\dfrac{\\text{NOI}}{\\text{total debt payments}} = \\dfrac{\\$89{,}572{,}500}{\\$87{,}958{,}000} = 1.02 \\]
      <p>A DSCR of exactly 1.02 is barely above breakeven — the source explicitly flags this as "a very low DSCR for mortgages," since typical residential mortgage pools run 2.5–3.0. Riskier receivables pools need a higher required DSCR precisely because their cash flows are more heavily discounted in a default scenario; as investor confidence in a securitization rises, the required DSCR tends to fall.</p>` },
    { name: "WAC", math: "\\text{WAC} = \\dfrac{\\sum(\\text{pool balance}\\times\\text{pool rate})}{\\text{total balance}}", note: "($6M×7.8%+$10M×6.0%+$4M×5.0%)/$20M = 6.34%.",
      plain: "The blended mortgage coupon rate across every sub-pool in the MBS, weighted by each sub-pool's dollar size — it tells you the pool's ability to pay the net coupon promised to investors.",
      derivation: `<p>Each sub-pool's rate is weighted by its dollar balance, then summed and divided by the total pool balance:</p>
      \\[ \\text{WAC} = \\dfrac{(\\$6\\text{M}\\times 7.8\\%) + (\\$10\\text{M}\\times 6.0\\%) + (\\$4\\text{M}\\times 5.0\\%)}{\\$20\\text{M}} = \\dfrac{\\$0.468\\text{M} + \\$0.600\\text{M} + \\$0.200\\text{M}}{\\$20\\text{M}} = 6.34\\% \\]
      <p>This is compared against the coupon actually promised to investors to gauge whether the mortgage pool generates enough spread to pay it — the same "asset cost vs. liability cost" logic that drives excess spread elsewhere in this reading.</p>` },
    { name: "WAM", math: "\\text{WAM} = \\sum \\left( \\dfrac{\\text{pool balance}_i}{\\text{total balance}} \\times \\text{months (or days) to maturity}_i \\right)", note: "Each sub-pool's maturity is weighted by its share of total balance, then summed; can be computed off stated maturity dates (captures liquidity risk) or reset dates (captures prepayment effects).",
      plain: "The blended time-to-maturity of the whole mortgage pool, weighting each sub-pool's maturity by how much of the total balance it represents.",
      derivation: `<p>Worked example: an MBS is composed of three sub-pools — \\(\\$6\\text{M}\\) maturing in 180 days, \\(\\$10\\text{M}\\) maturing in 360 days, and \\(\\$4\\text{M}\\) maturing in 90 days, total pool \\(\\$20\\text{M}\\). Each pool's weight is its balance divided by the \\(\\$20\\text{M}\\) total:</p>
      \\[ \\text{WAM} = \\left(\\dfrac{6}{20}\\times 180\\right) + \\left(\\dfrac{10}{20}\\times 360\\right) + \\left(\\dfrac{4}{20}\\times 90\\right) = 54 + 180 + 18 = 252 \\text{ days} \\]
      <p>The longer the WAM, the more sensitive the MBS is to interest-rate and reinvestment risk over its life; whether you compute it off stated maturity dates or reset dates changes what risk it actually captures — stated dates capture liquidity risk from the true final maturities, reset dates capture the effect of prepayments shortening the pool's effective life.</p>` },
    { name: "CPR from SMM", math: "CPR = 1 - (1-SMM)^{12}", note: "SMM=1.5% → CPR = \\(1- (1- 0.015)^{12}\\) = 16.59%.",
      plain: "Annualizes a single month's prepayment rate (SMM) into a constant annual prepayment rate, compounding the effect that each month's prepayment shrinks the balance the next month's prepayment rate applies to.",
      derivation: `<p>Single monthly mortality (SMM) is the fraction of the remaining mortgage balance (net of that month's scheduled principal repayment) that prepays in a single month. Because a fixed SMM applied every month compounds — this month's prepayment shrinks next month's base — the annualized CPR is not simply \\(12 \\times \\text{SMM}\\); it must account for the fact that \\((1-SMM)\\) of the balance survives each month:</p>
      \\[ CPR = 1 - (1-SMM)^{12} \\]
      <p>With \\(SMM = 1.5\\%\\): \\(CPR = 1 - (1-0.015)^{12} = 1 - (0.985)^{12} = 1 - 0.8341 = 16.59\\%\\). Note \\(12 \\times 1.5\\% = 18\\%\\) would be the wrong, non-compounded answer — a classic distractor.</p>` }
  ],

  concepts: [
    {
      name: "Participants and the true sale",
      def: "Originator (creates, sells assets) → issuer/SPV (legally distinct entity — this separateness makes it a 'true sale,' insulating investors from originator insolvency) → structuring agent (designs tranches/triggers) → trustee (safeguards investor interests) → financial guarantor (insurance wrap) → custodian (holds/moves cash/securities) → credit rating agencies (set attachment points, same issuer-pays conflict as R28).",
      intuition: "Each participant exists to solve one specific problem in getting an illiquid loan pool converted into a tradable security investors will trust: the originator has assets it wants off its balance sheet; the SPV provides the legal wall that makes the sale 'true' (no recourse back to the originator); the structuring agent is essentially the deal's architect, designing maturity, credit enhancement, and desired ratings; the trustee is the investors' watchdog once the deal is live, monitoring covenants like minimum credit quality and delinquency ratios; the financial guarantor is an optional insurance wrap (more common in master trusts); the custodian physically holds and moves the cash/securities; and the rating agencies translate all of this into a rating that determines where tranche attachment points sit.",
      example: "The SPV can be structured as a corporation (common in Europe) or a trust (the default in the U.S., because U.S. accounting rules make it harder for a corporate-form SPV to achieve enough legal separateness from the originator). SPVs are frequently incorporated in SPV-friendly offshore jurisdictions like the Cayman Islands, Dublin, or the Netherlands for tax and legal reasons.",
      pitfall: "The 'true sale' legal separateness is THE foundational concept — without it, the entire tranching exercise is undermined by exposure to the originator's own credit risk.",
      related: [{ r: 28, label: "R28 — the same rating-agency conflict of interest" }]
    },
    {
      name: "Cash waterfall, first-loss piece, overcollateralization",
      def: "Overcollateralization: pool assets (e.g., 101 mortgages) exceed notes issued (100 mortgages) — investors absorb one default 'for free.' First-loss piece = equity tranche, usually retained by the originator (skin in the game). Cash waterfall: senior paid before junior; if a coverage test fails, principal starts amortizing senior-first instead of paying subordinate interest.",
      intuition: "Think of the cash waterfall literally as water flowing downhill through a series of buckets stacked by seniority: cash from the underlying loan payments fills the senior bucket first, and only overflow reaches the next bucket down, and so on to the most junior (equity/first-loss) bucket at the bottom. A third party runs periodic 'coverage tests' to check the pool is still generating enough cash to service all the buckets; if a test fails, the waterfall's rules change automatically — instead of continuing to pay interest down to junior tranches, principal repayment is redirected to pay down the most senior notes first, protecting senior investors at the direct expense of junior ones.",
      example: "Worked example from the source: a mortgage pool is securitized based on 100 mortgages' worth of notes issued, but the originator actually puts 101 mortgages into the collateral pool. That one extra mortgage means investors can absorb one full default with zero economic loss to any tranche — the overcollateralization cushion eats it first.",
      pitfall: "The most senior class of notes is NOT the overcollateralized one — overcollateralization protects the SENIOR tranche by making the LOWEST/most junior class absorb the excess collateral risk. A commonly reversed fact.",
      related: [{ r: 28, label: "R28 — waterfall mechanics with full numeric example" }],
      memory: "Overcollateralization is a gift FROM the junior tranche TO the senior tranche, not the other way around."
    },
    {
      name: "Three SPV structures",
      def: "Amortizing (pass-through): principal & interest paid on schedule as received, valued via WAL, needs prepayment assumptions (residential/commercial mortgages, consumer loans). Revolving: principal reinvested into new receivables during a revolving period, repaid via controlled amortization or 'soft bullet' (credit card debt, auto loans). Master trust: one SPV supports multiple/frequent issuances, often paired with a grantor trust, excess spread shared across series (credit card ABS, mortgages).",
      intuition: "The right structure is determined by how the underlying asset actually pays investors back over its life. Mortgages and consumer loans have a pre-set amortization schedule, so the SPV can just pass those scheduled principal-and-interest payments straight through to investors — hence 'pass-through.' Credit card debt and auto loans have no fixed amortization schedule and high, unpredictable prepayment; instead of passing payments straight through, the SPV reinvests incoming principal into buying new receivables during a 'revolving period,' then eventually repays investors either through controlled amortization or one large 'soft bullet' lump sum. A master trust is a step up in complexity: it lets one SPV issue multiple separate note series over time from a shared, changing pool of receivables — commonly paired with a second entity, a grantor trust, that actually holds the assets, with the master trust holding a beneficial interest in the grantor trust instead of the assets directly. Excess spread earned across ALL the series sharing the master trust pool can be shared to cover losses on any one series.",
      example: "Professor's-note analogy from the source: a revolving structure resembles a corporate revolving line of credit from a bank — the corporation doesn't amortize the balance down gradually; it's required to pay the line down to zero periodically in a lump sum, then can draw on it again. Credit card ABS work the same way structurally.",
      related: []
    },
    {
      name: "Why financial institutions securitize",
      def: "Funding (diversifies funding mix, matches asset/liability duration, SPV often has a higher rating → cheaper funding than the originator's own debt). Balance sheet/capital management (Basel-driven regulatory capital relief since SPVs aren't banks). Risk management (removes non-performing assets and their reputational drag).",
      intuition: "Funding: a bank that specializes in, say, residential mortgages can convert a slow, illiquid loan book into upfront cash, diversify its funding sources away from deposits, and match the maturity of its liabilities (the notes it issues) to the maturity of its assets (the mortgages) instead of the classic bank mismatch of funding long-dated mortgages with short-dated deposits. Because the SPV frequently earns a higher credit rating than the originator's own corporate debt, funding through securitization can be cheaper than issuing unsecured bonds directly. Balance sheet/capital management: under Basel-style capital rules, a bank must hold regulatory capital (e.g., 8% of risk-weighted assets) against loans it keeps on its books; SPVs are not banks and are not subject to those same capital rules, so moving assets off the bank's balance sheet into an SPV frees up regulatory capital — though not entirely, since the originator often retains the first-loss piece and so keeps some of the risk (and implicitly, some justification for holding capital against it). Freeing capital raises return on equity (ROE), a metric investors watch closely. Risk management: securitization also lets an originator remove non-performing or reputationally damaging assets from its balance sheet, while still potentially sharing in any surplus profit if those assets later perform better than expected.",
      example: "Investor benefits: access to new diversified asset classes, customizable risk-return via tranching, often higher risk-adjusted return than similarly-rated corporate bonds — partly because the originator retaining the equity/first-loss tranche means investors in more senior tranches are shielded, and partly because a diversified pool of thousands of obligors carries less idiosyncratic risk than a single corporate bond.",
      related: []
    },
    {
      name: "Credit enhancements",
      def: "Overcollateralization, pool insurance (third-party covers principal loss), subordination (class B doesn't get principal until class A is redeemed), margin step-up (coupon increases after a call date the issuer chooses not to exercise), excess spread.",
      intuition: "These enhancements fall into two families. The first family increases collateral's ability to absorb losses directly: overcollateralization (the pool exceeds notes issued, so the extra assets absorb losses with zero impact on investors) and pool insurance (a composite insurance company explicitly covers principal loss on the collateral pool if the SPV defaults). The second family controls the flow of cash rather than the collateral itself: subordination (junior class B notes get no principal until senior class A is fully redeemed, or until the pool passes specific performance tests), margin step-up (the coupon rate steps up after a call date that the issuer, who has the option to redeem, chooses not to exercise — this compensates investors for the issuer declining to refinance them out, and gives the issuer an incentive to redeem if market rates are lower than the stepped-up coupon), and excess spread (the gap between what the pool earns and what the notes cost, held in reserve against future losses and returned to the originator if no losses occur).",
      related: []
    },
    {
      name: "Performance ratios — the calculation zoo",
      def: "Credit card ABS trigger ratios: delinquency ratio (90dpd/total pool), default ratio (written-off/total pool), MPR (monthly P&I/total pool). MBS tools: DSCR (NOI/total debt payments), WAC (weighted-average coupon), WAM (weighted-average maturity), WAL (weighted, prepayment-adjusted average life).",
      intuition: "These ratios exist because credit card ABS and MBS both need mechanical, automatic triggers to detect deteriorating pool performance and force early amortization before losses cascade — investors can't wait for a human committee decision. Credit card debt has no fixed maturity (most balances are actually repaid within about six months despite having no predetermined term), so the delinquency ratio, default ratio, and MPR act as trip-wires: if the MPR (repayment speed) falls too low, or delinquencies/defaults rise too high, the structure is forced into early amortization to protect investors. MBS tools (DSCR, WAC, WAM, WAL) instead measure the pool's ongoing ability to pay and the timing/duration of its cash flows, since mortgage pools do have scheduled amortization but face prepayment uncertainty.",
      example: "Loss curve: cumulative expected loss over the pool's life, used specifically for auto loan ABS — prime loans show an even distribution of losses over the pool's life, while subprime/non-prime loans show a steeper, front-loaded loss curve with higher initial losses that decline in later years. Absolute prepayment speed (APS): actual period payments as a % of the total collateral pool balance, used specifically to value the implicit prepayment call option embedded in auto loan ABS (borrowers can always pay off early, which is economically a call option they hold against the ABS).",
      related: ["CPR and PSA"]
    },
    {
      name: "CPR and PSA",
      def: "CPR = \\(1- (1- SMM)^{12}\\) (constant prepayment rate annualized from single monthly mortality). PSA benchmark: 100% PSA assumes CPR starts at 0% and rises 0.2%/month for 30 months, then holds flat at 6%.",
      intuition: "SMM (single monthly mortality) is the raw building block — the fraction of the remaining mortgage balance that prepays in one month, net of that month's already-scheduled principal payment. Because SMM compounds monthly (each month's prepayment shrinks the base the next month's SMM applies to), you cannot just multiply SMM by 12 to annualize it — you need \\(CPR = 1-(1-SMM)^{12}\\). The PSA convention is a standardized shape for how CPR is assumed to change over a mortgage pool's life as it seasons: prepayments naturally start low right after origination (borrowers rarely refinance or move immediately) and rise as the pool ages, which the 100% PSA benchmark captures by assuming CPR rises linearly from 0% by 0.2 percentage points every month for the first 30 months (reaching \\(0.2\\% \\times 30 = 6\\%\\)), then holding flat at 6% for the remainder of the pool's life. Other prepayment scenarios (50% PSA, 150% PSA, etc.) simply scale that same 30-month ramp and plateau up or down as a percentage of the 100% base case.",
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
    { wrong: "\"IFRS-style stage transitions and securitization credit enhancement are the same concept.\"", right: "Distinct: credit enhancement (overcollateralization, subordination, excess spread) protects note holders structurally; it's unrelated to accounting loss-staging rules (R19)." },
    { wrong: "\"Selling a loan without recourse still leaves a contingent liability on the seller's books.\"", right: "A true, no-recourse sale removes the loan (and the credit risk) from the seller's balance sheet entirely — the purchaser bears all the credit risk. That is precisely what makes it a 'true sale.'" },
    { wrong: "\"To annualize a 1.5% single monthly mortality rate into CPR, just multiply by 12 (18%).\"", right: "SMM compounds: \\(CPR = 1-(1-SMM)^{12} = 1-(0.985)^{12} = 16.59\\%\\), not \\(12\\times SMM\\)." }
  ],

  highYield: [
    { stars: 4, what: "Overcollateralization protects the senior tranche via the JUNIOR class absorbing excess risk — not the reverse.", why: "A frequently reversed, high-value tested fact." },
    { stars: 4, what: "Full performance ratio calculation fluency: delinquency ratio, default ratio, MPR, DSCR, WAC, WAM, WAL, CPR, PSA.", why: "Explicitly flagged as plug-and-chug calculation material — practice every one, not just definitions." },
    { stars: 3, what: "Three SPV structures (amortizing/revolving/master trust) and typical assets for each.", why: "A clean three-way classification, good matching-question material." },
    { stars: 3, what: "SPV liability side cheaper than asset side — the excess spread gap.", why: "A precise, easily-flipped directional fact." },
    { stars: 3, what: "A true sale requires the SPV to be a legally distinct entity from the originator, with no recourse.", why: "This is the legal foundation for off-balance-sheet treatment — tested as the reason securitization actually removes risk from the originator." }
  ],

  recall: [
    { q: "A credit card ABS pool has total balance $57.8M, with $0.88M currently 90+ days past due and $1.1M written off. Compute the delinquency ratio and default ratio.", a: "Delinquency ratio = 880,000/57,800,000 = 1.522%. Default ratio = 1,100,000/57,800,000 = 1.903%. Both use total pool balance as the denominator but different numerators (currently-delinquent vs. already-written-off balances)." },
    { q: "A mortgage pool shows SMM = 2%. What is the annualized CPR?", a: "CPR = \\(1- (1- 0.02)^{12}\\) = 1−0.7847 ≈ 21.53%." },
    { q: "Why is it wrong to say the most senior tranche in a securitization is 'the overcollateralized one'?", a: "Overcollateralization means the pool of assets exceeds the notes issued — that EXCESS sits at the bottom of the capital structure, absorbed by the MOST JUNIOR tranche. The senior tranche is protected BY this junior-absorbed excess, not itself 'overcollateralized' in the sense of holding the extra buffer." },
    { q: "Why does the SPV's cost of liabilities (notes issued) need to be lower than its cost of assets (receivables) for the structure to work?", a: "The gap between the higher-yielding assets (receivables, e.g., mortgage or credit card interest) and the lower-cost notes issued to investors IS the excess spread — the cash flow that pays servicing fees, credit enhancement costs, and ultimately flows to the equity/first-loss piece. Without this positive spread, there would be no residual value to distribute down the waterfall." },
    { q: "Why must the issuer (SPV) be a legally distinct entity from the originator for a securitization to qualify as a 'true sale'?", a: "If the SPV were not legally distinct, investors buying the securitized notes would remain exposed to the originator's own insolvency risk, defeating the purpose of pooling and tranching by the collateral's own performance. Legal separateness is what lets the assets leave the originator's balance sheet with no recourse." }
  ],

  hooks: [
    { title: "The junior tranche's gift", text: "Overcollateralization is a gift the junior tranche gives the senior tranche: 'here's one extra mortgage's worth of cushion, so you (senior) never feel the first default.' The gift always flows upward in seniority, never downward." },
    { title: "Buy low, sell high — SPV edition", text: "The SPV's whole business model is 'buy' (fund) at a low cost (notes to investors) and 'own' higher-yielding assets (receivables) — the spread between the two is the fuel for the whole structure." }
  ],

  eli5: `<p>Imagine a landlord who owns 100 rental apartments but wants cash now instead of waiting years to collect rent. She sets up a completely separate company — one that legally has nothing to do with her personal finances — and sells that company the right to collect all 100 apartments' rent checks. That separate company then sells shares to investors: some investors get "first pick" of the rent money every month (safest, paid first), while others only get paid if there's money left over after the safest investors are paid (riskiest, paid last, but they get a higher return for taking that risk). To make the safest investors feel even more secure, the landlord actually throws in 101 apartments' worth of rent rights for only 100 apartments' worth of shares sold — so even if one tenant stops paying entirely, the safest investors never notice, because that loss gets absorbed by the riskiest investors' slice first. Mapped to the reading: the landlord is the <strong>originator</strong>, the separate company is the <strong>SPV/issuer</strong>, the "legally has nothing to do with her" part is the <strong>true sale</strong>, the safest-paid-first investors are the <strong>senior tranche</strong>, the riskiest-paid-last investors are the <strong>first-loss/equity piece</strong>, and the extra apartment thrown in for free protection is <strong>overcollateralization</strong>.</p>`,

  thinkLike: `<p>A securitization structurer or risk manager reviewing a deal asks, in order: (1) Is this actually a true sale — is the SPV genuinely bankruptcy-remote from the originator, or is there hidden recourse that would leave investors exposed to the originator's own credit? (2) Where does the excess spread come from, and is it big enough to fund credit enhancement and absorb expected losses before it ever reaches the equity piece? (3) Which performance ratios are the early-warning triggers for THIS asset class specifically — credit card ABS live and die by delinquency ratio/default ratio/MPR, auto loan ABS by loss curves and APS, MBS by DSCR/WAC/WAM/WAL — and are those triggers set tight enough to force early amortization before losses cascade down through the tranches? (4) Who is holding the first-loss piece, and does the originator have enough skin in the game to keep underwriting standards honest?</p>
  <p>On the exam, this reading is tested two ways: pure calculation (plug numbers into delinquency ratio, DSCR, WAC, WAM, or CPR and get the right number — practice the arithmetic, not just the definitions) and directional traps that reverse a fact (senior vs. junior tranche taking the overcollateralization risk; asset side vs. liability side of the SPV being cheaper). Expect the exam to test whether you can match an asset class — mortgages, credit cards, auto loans — to the correct performance tool, since each asset class in this reading has a distinct, named toolkit.</p>`,

  breakdown: [
    {
      title: "Securitization participants (in order of the deal flow)",
      points: [
        "Originator — the entity that created the credit-sensitive assets (e.g., mortgages) and wants to convert them into cash, transferring credit risk away.",
        "Issuer / SPV — a legally distinct third party that buys the assets from the originator; this legal separateness is what makes the sale a 'true sale.'",
        "Structuring agent — the deal's de facto advisor, designing maturity, desired credit rating, credit enhancement, and forecasting cash flows; may double as the sponsor.",
        "Trustee — has fiduciary responsibility to safeguard investors' interests, monitoring pre-specified conditions like minimum credit quality and delinquency ratios.",
        "Financial guarantor — an insurance company that wraps the deal with a guarantee if the SPV defaults; more common in master trust arrangements.",
        "Custodian — safeguards the physical securities and handles collection/distribution of cash flows.",
        "Credit rating agencies — quantify the originator's and issue's credit quality, set attachment points, and can force restructuring for additional credit enhancement if the rating is too low."
      ]
    },
    {
      title: "Three SPV structures and their typical assets",
      points: [
        "Amortizing (pass-through) — principal and interest paid to investors on a set amortization schedule as received; valued via weighted-average life (WAL), which requires prepayment assumptions. Used for residential mortgages, commercial mortgages, consumer loans.",
        "Revolving — principal is reinvested into new receivables during a revolving period rather than passed straight through; investors are repaid via controlled amortization or a lump-sum 'soft bullet' payment. Used for credit card debt, auto loans (short horizon, high prepayment rate).",
        "Master trust — a single SPV structure that supports multiple/frequent issuances over time, often paired with a second grantor trust holding the actual assets; excess spread is shared across all series issued from the trust. Used for credit card ABS and mortgages."
      ]
    },
    {
      title: "Why financial institutions securitize (three reasons)",
      points: [
        "Funding — diversifies the funding mix, matches asset/liability duration (avoiding the classic short-liability/long-asset mismatch), and often accesses a lower cost of funds because the SPV's rating can exceed the originator's own.",
        "Balance sheet / capital management — since SPVs aren't banks, moving assets off-balance-sheet reduces the regulatory capital a bank must hold against them (though not entirely, since the originator often retains the first-loss piece), which raises return on equity (ROE).",
        "Risk management — removes non-performing assets and their associated reputational drag from the balance sheet, while the originator can still share in upside if those assets later perform."
      ]
    },
    {
      title: "Credit enhancements (five types)",
      points: [
        "Overcollateralization — notes issued are worth less than the underlying collateral pool, so the extra collateral absorbs initial losses with zero impact to investors.",
        "Pool insurance — a third-party (composite) insurance company covers loss of principal in the collateral pool if the SPV defaults.",
        "Subordination — junior (class B) notes don't receive principal until senior (class A) notes are fully redeemed or performance tests are met.",
        "Margin step-up — the coupon increases after a call date the issuer chooses not to exercise, compensating investors for the issuer declining to refinance them out.",
        "Excess spread — the gap between what the pool's assets earn and what the SPV's notes cost, held in reserve against future losses and returned to the originator if unused."
      ]
    },
    {
      title: "Performance tools by asset class",
      points: [
        "Credit card ABS: delinquency ratio (90dpd/total pool), default ratio (written-off/total pool), monthly payment rate — MPR (monthly P&I/total pool); all three act as early-amortization triggers.",
        "Auto loan ABS: loss curve (cumulative expected loss shape — flatter for prime, steeper/front-loaded for subprime) and absolute prepayment speed — APS (period payments as % of pool balance, used to value the implicit prepayment call option).",
        "MBS: debt service coverage ratio — DSCR (NOI/total debt payments), weighted average coupon — WAC, weighted average maturity — WAM, weighted average life — WAL.",
        "Mortgages/student loans generally: single monthly mortality (SMM), constant prepayment rate (CPR), and the Public Securities Association (PSA) benchmark for forecasting prepayment speed."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank sells a pool of loans to an SPV without recourse. What happens to the loans and the credit risk?",
      options: [
        "The loans stay on the bank's balance sheet, but the credit risk transfers to the SPV",
        "The loans are removed from the bank's balance sheet, and the purchaser bears all the credit risk",
        "The bank retains a contingent liability equal to a specified percentage of the pool",
        "The purchaser retains the right to sell the loans back to the bank if they default"
      ],
      answer: 1,
      why: "A true, no-recourse sale removes both the assets and the associated credit risk from the seller's balance sheet — that is precisely what 'without recourse' means. The 'bank retains a contingent liability' answer describes a sale WITH recourse, and the 'purchaser can sell the loans back' answer describes a put-back right, neither of which applies to a no-recourse true sale."
    },
    {
      q: "Which SPV structure is best suited to securitizing credit card debt, and why?",
      options: [
        "Amortizing / pass-through, because credit card balances follow a fixed amortization schedule",
        "Revolving, because credit card debt has no pre-specified amortization schedule and principal is reinvested into new receivables during a revolving period",
        "Master trust only, because credit card debt cannot legally use any other structure",
        "Amortizing / pass-through, because credit card debt has the lowest prepayment risk of any ABS asset class"
      ],
      answer: 1,
      why: "Credit card debt has no fixed maturity or amortization schedule, so principal collections are reinvested into new receivables during a revolving period rather than passed straight through — investors are eventually repaid via controlled amortization or a lump-sum soft bullet. (Master trust is a separate, orthogonal structural choice that's common for credit cards but not the only option, so the 'master trust only' answer is too absolute; both amortizing/pass-through answers wrongly attribute a fixed schedule or low prepayment risk to credit card debt.)"
    },
    {
      q: "An MBS pool has SMM = 1.5%. What is the annualized constant prepayment rate (CPR)?",
      options: [
        "18.00% (12 × 1.5%)",
        "16.59%, computed as \\(1-(1-0.015)^{12}\\)",
        "1.50%, since CPR equals SMM by definition",
        "19.56%, computed as \\((1+0.015)^{12}-1\\)"
      ],
      answer: 1,
      why: "CPR compounds the monthly survival rate: \\(CPR = 1-(1-SMM)^{12} = 1-(0.985)^{12} = 16.59\\%\\). The 18.00% answer is the tempting but wrong non-compounded shortcut of just multiplying SMM by 12. The \\((1+0.015)^{12}-1\\) answer incorrectly compounds growth rather than decay."
    },
    {
      q: "In a securitization with overcollateralization, which tranche bears the risk of the 'extra' collateral if a default occurs?",
      options: [
        "The most senior tranche, since it is described as 'overcollateralized'",
        "The most junior (first-loss/equity) tranche",
        "Risk is shared equally and proportionally across all tranches",
        "The financial guarantor absorbs it via the insurance wrap, not any note-holding tranche"
      ],
      answer: 1,
      why: "Overcollateralization means the pool of assets exceeds the notes issued; that excess sits at the bottom of the capital structure and is absorbed by the most junior tranche, which protects the senior tranche. Calling the senior tranche 'the overcollateralized one' is the classic reversed-fact trap this reading explicitly warns about."
    },
    {
      q: "A commercial mortgage pool has NOI of $89,572,500 and total debt payments of $87,958,000. What does the resulting DSCR imply?",
      options: [
        "DSCR ≈ 0.98, meaning the pool does not generate enough cash flow to cover debt service",
        "DSCR ≈ 1.02, meaning the pool barely generates enough cash flow to cover debt service, which is low for a mortgage pool",
        "DSCR ≈ 1.02, which is a comfortably high ratio typical of a well-covered residential mortgage pool",
        "DSCR cannot be computed without also knowing the weighted average coupon (WAC)"
      ],
      answer: 1,
      why: "DSCR = NOI / total debt payments = $89,572,500 / $87,958,000 ≈ 1.02. A DSCR above 1.0 does mean the pool covers its debt service, but 1.02 is explicitly flagged in the source as 'a very low DSCR for mortgages' since typical residential pools run 2.5–3.0 — so the 'comfortably high, typical of residential' characterization is the trap; the DSCR ≈ 0.98 answer gets the direction of coverage wrong."
    },
    {
      q: "Why does the securitization structure require the SPV's liability side (notes issued) to cost less than its asset side (receivables)?",
      options: [
        "Because regulators require SPVs to hold a minimum spread as a capital buffer",
        "Because that cost gap is the excess spread, which funds administration expenses, credit enhancement reserves, and ultimately flows to the equity/first-loss piece",
        "It doesn't need to — the asset side is actually structured to cost less than the liability side",
        "Because the trustee's fee is paid directly out of this gap and nothing else depends on it"
      ],
      answer: 1,
      why: "The excess spread is the difference between what the SPV earns on its higher-yielding receivables and what it pays out on its lower-cost notes; after covering administration expenses, remaining excess spread builds a loss reserve and any leftover flows back to the originator. The 'asset side costs less than the liability side' answer reverses the actual asset/liability cost relationship — a frequently tested reversed fact — and the regulatory-minimum-spread and trustee-fee-only answers overstate/misattribute what the spread is used for."
    }
  ],

  sources: [
    { title: "Securitization — Wikipedia", url: "https://en.wikipedia.org/wiki/Securitization", note: "Background on the general securitization process, participants, and asset classes beyond the FRM curriculum's scope." },
    { title: "Special Purpose Vehicle (SPV) — Investopedia", url: "https://www.investopedia.com/terms/s/spv.asp", note: "Plain-language explanation of why SPVs exist and how bankruptcy-remoteness works in practice." },
    { title: "Mortgage-Backed Security (MBS) — Investopedia", url: "https://www.investopedia.com/terms/m/mbs.asp", note: "Good refresher on WAC/WAM/WAL and prepayment concepts as applied to real MBS deals." },
    { title: "Constant Prepayment Rate (CPR) — Investopedia", url: "https://www.investopedia.com/terms/c/cpr.asp", note: "Alternate worked examples of the SMM-to-CPR compounding calculation and PSA benchmark." }
  ],

  pdf: { book: 2, query: "Securitization is the process of transforming the illiquid assets" },

  summary: `<p><strong>True sale</strong>: the SPV's legal separateness from the originator is the foundational concept. <strong>Overcollateralization</strong>: pool assets exceed notes issued; the JUNIOR class absorbs this excess, protecting the SENIOR class (a frequently reversed fact). <strong>Three SPV structures</strong>: amortizing/pass-through (mortgages), revolving (credit cards/auto), master trust (multiple issuances, shared excess spread). <strong>Why securitize</strong>: funding diversification, capital relief, risk management. <strong>Credit enhancements</strong>: overcollateralization, pool insurance, subordination, margin step-up, excess spread. <strong>Performance ratios</strong>: delinquency ratio, default ratio, MPR (all /total pool balance); DSCR=NOI/debt payments; WAC=weighted coupon; WAM/WAL=weighted maturity/prepayment-adjusted life; \\(CPR=1- (1- SMM)^{12}\\); PSA benchmarks (100% = 0%→6% over 30 months). SPV liability side costs LESS than its asset side — that gap is the excess spread.</p>`
});
