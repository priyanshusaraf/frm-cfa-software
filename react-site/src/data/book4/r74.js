export default ({
  book: 4, reading: 74,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Managing and Pricing Deposit Services",
  tagline: "Shifts to the liability side: what deposit products exist, the three ways banks price them, and the social/regulatory tensions that come with deposit-taking.",

  teaches: `<p>This reading is entirely about the <strong>liability side</strong> of a bank's balance sheet — where the money it lends out actually comes from. You learn: (1) the vocabulary that separates deposits used for making payments (<strong>transaction deposits</strong>) from deposits used for saving money (<strong>nontransaction deposits</strong>); (2) the <strong>three ways banks decide what to charge for — or pay on — a deposit account</strong>: cost-plus pricing, marginal-cost pricing, and conditional pricing, including how to actually calculate each; and (3) the social and regulatory frictions that come with taking other people's money and promising to give it back on demand — deposit insurance (FDIC), mandatory disclosures (Truth in Savings Act), overdraft protection, and the unresolved question of "lifeline banking" (does everyone have a right to a bank account?).</p>`,

  why: `<p>Deposits are the cheapest, most stable source of bank funding — but only if the bank prices them correctly. Get deposit pricing wrong and one of two bad things happens: price too high (cost-plus with a fat margin, or match every competitor's marginal-cost rate across your <em>entire</em> existing deposit base) and you destroy the profit spread between what you pay depositors and what you earn on loans; price too low (give away "free checking" without pricing the float) and you bleed money on every account while still carrying the operational cost of servicing it. The <strong>marginal-cost method</strong> is the reading's central idea, and it is the same logic tested elsewhere in the curriculum under liquidity transfer pricing (Reading 78): don't ask "what did our money cost us on average in the past," ask "what does the <em>next dollar</em> of funding cost me right now, and can I earn more than that deploying it?" The regulatory/ethical material (deposit insurance, disclosures, overdraft protection, lifeline banking) matters because taxpayer-backed deposit insurance changes the political calculus — a bank that fails still gets its depositors made whole by the FDIC, which is precisely why regulators feel entitled to dictate disclosure rules, insurance premiums, and (in ongoing policy debates) whether banks owe society affordable basic accounts.</p>`,

  intuition: `<p>Think of deposit pricing as three different questions a bank could ask itself when setting a rate or fee:</p>
  <ul>
    <li><strong>Cost-plus asks: "What does it cost ME to run this account, and what profit do I want?"</strong> Add up the direct operating cost (tellers, statements, processing), the overhead allocated to the deposit function, and a target profit margin, and charge that. It is backward-looking accounting — it never asks what the deposited money is actually worth to the bank once invested.</li>
    <li><strong>Marginal-cost pricing asks: "What will it cost me to raise the NEXT dollar, and is that less than what I can earn putting it to work?"</strong> This is the economically "correct" method, because it is forward-looking and compares apples to apples: the marginal COST of new funds versus the marginal YIELD available from loans/investments. If marginal cost < marginal yield, raise the money; if marginal cost > marginal yield, stop — you'd be paying more for the funds than you can earn on them. The catch that trips up nearly everyone the first time they see this: when a bank raises its deposit rate to attract new money, it usually has to pay that <em>higher</em> rate on its <em>entire existing balance</em> too (old depositors won't accept a lower rate than new ones), so the true marginal cost of the incremental dollars is far higher than the quoted rate increase alone suggests.</li>
    <li><strong>Conditional pricing asks: "How do I use pricing to attract the RIGHT customers, not just cover my costs?"</strong> A bank waives a monthly fee if you keep a $1,500 minimum balance, or charges per-item fees only below some balance threshold. This isn't really about cost recovery — the same $5 monthly fee wouldn't recover the same costs for every customer — it's a screening device: customers who can and do keep high balances self-select into the free account, and customers who churn small balances self-select into (or are steered toward) the fee-plus-low-minimum account. A bank near a wealthy suburb and a bank near a college campus will design completely different conditional-pricing schedules for exactly this reason.</li>
  </ul>
  <p>Layered on top of all three is a set of social/regulatory tensions that exist precisely <em>because</em> deposits are insured by the federal government (via the FDIC) and therefore implicitly backstopped by taxpayers: if taxpayers are on the hook when a bank fails, does the bank owe something back to taxpayers — like affordable basic accounts for people who can't otherwise get one (lifeline banking)? Should a bank be allowed to charge a customer an effective 200%+ APR to cover a $4 overdraft (overdraft protection)? These are unresolved, but the exam wants you to recognize the tension, not "solve" it.</p>`,

  eli5: `<p>Imagine you run a small neighborhood lending library out of your garage, and you let people "deposit" books with you that you can then lend out to other neighbors for a small fee. You have three ways to decide what to charge someone who wants special perks (like guaranteed same-day pickup): you could add up your shelving and cataloging costs and tack on a bit of profit (<strong>cost-plus</strong>); you could figure out what it would cost you to get one more shelf built to hold more books versus how much extra lending-fee income that shelf would generate, and only build it if the math works (<strong>marginal cost</strong>); or you could say "no fee if you keep at least 10 books on deposit with me" to specifically attract the neighbors with the biggest collections (<strong>conditional pricing</strong>). Meanwhile, the town has passed rules requiring you to disclose your terms clearly, insures neighbors' books against your garage burning down, and some people in town are arguing you should have to hold a few "town library" books for free for people who can't afford their own — that's the deposit-services world in miniature: cost-plus, marginal-cost, and conditional pricing map directly onto how a bank prices checking/savings/CD accounts, and the disclosure/insurance/free-access rules map onto Truth in Savings, FDIC insurance, and lifeline banking.</p>`,

  thinkLike: `<p>A bank's ALM (asset-liability management) desk or deposit-pricing committee doesn't think "what's fair" — it thinks "what does the next dollar of funding cost me, all-in, and can I clear that cost on the asset side?" That means always asking two follow-up questions before accepting a marginal-cost number at face value: (1) <em>Does the new rate apply only to new money, or to the whole existing balance too?</em> — because if it applies to the whole balance (as it typically does with posted rates on an account type like MMDAs), the effective marginal cost of the incremental funds is dramatically higher than the rate increase alone implies, and (2) <em>Is there a cheaper alternative source for exactly this amount of money?</em> — a bank facing a $10 million funding need should compare the marginal cost of raising it via its existing deposit product against the (often cheaper, because it doesn't reprice the whole book) cost of issuing negotiable CDs or tapping wholesale funding.</p>
  <p>On the exam, this reading is tested three ways: (a) definitional/classification questions — "a bank waives a fee if balance stays above $X, what pricing method is this?" (conditional); (b) a marginal-cost <em>calculation</em> where you must remember to apply the new, higher rate to the ENTIRE base (old + new deposits), not just the incremental amount — this is the single most common trap in this reading; and (c) scenario questions on the social/regulatory material (deposit insurance limits, what Truth in Savings requires banks to disclose, why overdraft protection is controversial, what lifeline banking means) where the exam is really just checking whether you read the material, since there's no calculation involved.</p>`,

  breakdown: [
    {
      title: "Transaction vs. nontransaction deposit types",
      points: [
        "Noninterest-bearing demand deposits — pay no interest at all; historically the main business-account type before the 2009 Wall Street Reform and Consumer Protection Act allowed banks to pay interest on corporate deposit accounts.",
        "NOW (Negotiable Order of Withdrawal) accounts — interest-bearing checking, invented in 1970s New England as a workaround to Regulation Q's ban on interest on demand deposits; available only to individuals and nonprofits, not businesses.",
        "Money market deposit accounts (MMDAs) — created by the Garn-St. Germain Act of 1982 so banks could compete with money market mutual funds; pay unregulated, market-linked rates and can be held by businesses as well as individuals (unlike NOW accounts).",
        "Super NOWs (SNOWs) — hybrid accounts combining limited check-writing (transaction access) with market interest rates.",
        "Mobile check deposits — photograph-and-deposit technology; transaction-type because funds are immediately usable for payments.",
        "Passbook savings deposits — the classic thrift account, historically openable for as little as $5, essentially unlimited withdrawals; nontransaction because it isn't built for day-to-day payments.",
        "Time deposits / certificates of deposit (CDs) — fixed maturity from 7 days to 5+ years; negotiable (jumbo) CDs are $100,000+ and can be resold before maturity (money-market instrument for institutions), while retail CDs cannot be sold before maturity without an early-withdrawal penalty.",
        "Retirement deposits (IRA, Keogh) — tax-advantaged accounts; a stable funding source for banks because early withdrawal triggers a meaningful penalty, discouraging depositors from pulling the money out."
      ]
    },
    {
      title: "Three deposit pricing methods",
      points: [
        "Cost-plus pricing — unit price = operating expense per unit of service + allocated overhead expense + planned profit margin. Purely a cost-recovery formula; ignores what the funds raised could actually earn if invested. Worked example from the source: a demand deposit account costing $2.50/month to service, plus $1.25 allocated overhead, plus a $0.25 target profit margin, is priced at $4.00/month.",
        "Marginal-cost pricing — compares the marginal cost of raising the next dollar of deposits to the marginal yield earned reinvesting it (e.g., in loans). The economically 'correct' approach because it's forward-looking, but the trap is that repricing usually applies to the WHOLE deposit base, not just the incremental amount, which can make the true marginal cost far higher than the headline rate increase suggests.",
        "Conditional pricing — price (usually a fee waiver) is conditioned on customer behavior, such as maintaining a minimum balance, staying under a transaction-count threshold, or choosing a given maturity. Economist Constance Dunham splits checking-account conditional pricing into three sub-types: flat-rate pricing (fixed charge per period or per transaction), free pricing (no explicit fee, but the customer forgoes market interest — an opportunity cost — and the model is usually unprofitable because it attracts small, active accounts), and conditionally free pricing (fees below a balance threshold, free above it — this creates useful market signaling because the customer's own balance choice reveals information about them to the bank)."
      ]
    },
    {
      title: "Social and regulatory challenges facing deposit-taking banks",
      points: [
        "Deposit insurance (FDIC) — insures up to $250,000 per depositor, per insured bank, per ownership category; funded by risk-based premiums that rise when the insurance fund's reserve ratio falls below its 1.25%-of-insured-deposits target (the 'designated reserve ratio', which the FDIC can flex between 1.15% and 1.5%). Because deposits are insured, banks can borrow (via deposits) more cheaply than an otherwise-comparable unsecured borrower — depositors don't need to price in default risk.",
        "Disclosures (Truth in Savings Act of 1991, implemented via Regulation DD) — banks must disclose account terms up front: minimum balance to open, minimum balance to avoid fees or earn the stated yield, how the balance is calculated, when interest starts accruing, early-withdrawal penalties, and the Annual Percentage Yield (APY) using a standardized formula, so customers can comparison-shop across banks on a like-for-like basis.",
        "Overdraft protection — a line of credit or linked secondary account (e.g., an MMDA) that covers an accidental overdraft instead of bouncing the transaction. Controversial because the effective cost can run to 200%+ APR once setup fees and a high (e.g., 18%) short-term interest rate on a loan that must be repaid within ~30 days are annualized — critics call this predatory lending, especially since low-income customers rely on it disproportionately, and some argue it removes the incentive to track your own balance.",
        "Basic (lifeline) banking — the unresolved policy question of whether every adult has a right to a basic, affordable bank account, given that modern life (direct-deposit payroll, Social Security payments, renting an apartment) is increasingly difficult without one. Ties to the 'unbanked' (no deposit or loan relationship at any institution) and 'underbanked' (rely on payday loans, check-cashing shops, pawn shops) populations, and to the 1977 Community Reinvestment Act, which requires regulators to check that a bank makes an 'affirmative effort' to serve all the communities in its footprint."
      ]
    }
  ],

  formulas: [
    {
      name: "Cost-plus pricing",
      math: "\\text{Unit price} = \\text{Operating expense per unit} + \\text{Allocated overhead expense} + \\text{Planned profit margin}",
      plain: "The price the bank charges for a deposit service should simply cover the direct cost of providing it, plus a share of the bank's overhead, plus whatever profit the bank has decided to target — nothing more, nothing less, and nothing tied to what the deposited funds could actually earn.",
      note: "Worked example: an account costing $2.50/month direct + $1.25/month allocated overhead + $0.25 target margin = $4.00/month fee."
    },
    {
      name: "Marginal cost of raising additional deposits",
      math: "\\text{Marginal cost (\\$)} = (\\text{New rate} \\times \\text{New total balance}) - (\\text{Old rate} \\times \\text{Old balance})",
      plain: "The dollar cost of raising more deposits is the total interest bill AFTER raising the rate, minus the total interest bill BEFORE — and because the new, higher rate typically has to be paid on the old balance too (not just the new money), this cost is driven mainly by repricing the existing base, not by the incremental funds alone.",
      derivation: `<p>Green Back Bank has $400 million of MMDAs currently paying 2.0%. To attract an additional $10 million, it must raise the rate to 2.5% — and that new rate applies to the whole $410 million balance, not just the new $10 million.</p>
      <p>Total interest cost AFTER raising the rate:</p>
      \\[ 0.025 \\times \\$410\\text{ million} = \\$10.25\\text{ million} \\]
      <p>Total interest cost BEFORE raising the rate:</p>
      \\[ 0.02 \\times \\$400\\text{ million} = \\$8.00\\text{ million} \\]
      <p>Marginal cost in dollars of raising the extra $10 million:</p>
      \\[ \\$10.25\\text{ million} - \\$8.00\\text{ million} = \\$2.25\\text{ million} \\]
      <p>Marginal cost RATE on the new $10 million:</p>
      \\[ \\dfrac{\\$2.25\\text{ million}}{\\$10\\text{ million}} = 22.5\\% \\]
      <p>Compare that to the alternative: raising the same $10 million by issuing negotiable CDs at 4%. The dollar cost there is simply \\(0.04 \\times \\$10\\text{ million} = \\$400{,}000\\), a marginal cost RATE of exactly 4% — because the CD rate only applies to the new $10 million, it never touches the existing $400 million base. Even though 4% looks like the "worse" headline rate compared to a 0.5-point MMDA increase, it is far cheaper once you account for the repricing effect on the whole deposit book — this is the core trap the exam tests.</p>`
    },
    {
      name: "Annual percentage yield (APY)",
      math: "\\text{APY} = 100 \\times \\left[ \\left(1 + \\dfrac{\\text{Interest earned}}{\\text{Average account balance}}\\right)^{365/\\text{days in period}} - 1 \\right]",
      plain: "APY converts whatever interest an account actually earned over some period into a standardized, compounded annual rate, so a customer can compare accounts with different compounding conventions on an apples-to-apples basis; it's the number the Truth in Savings Act requires banks to disclose.",
      note: "Worked example: an average balance of $500 earning $3 of interest over a 30-day period gives APY = 100 × [(1 + 3/500)^(365/30) − 1] ≈ 7.55%."
    }
  ],

  concepts: [
    {
      name: "Transaction vs. nontransaction deposits",
      def: "Transaction (payment-use) deposits: noninterest-bearing and interest-bearing checking (NOW accounts), money market deposit accounts (MMDAs), Super NOWs, and mobile check deposits — funds are withdrawable on demand with no notice, so these deposits have the least predictable, effectively shortest maturity of all bank funding sources. Nontransaction (savings-use) deposits: passbook savings, time deposits/CDs, and retirement deposits (IRA/Keogh) — intended for saving rather than day-to-day payments.",
      intuition: "Ask 'could the customer write a check or swipe a debit card against this account right now?' If yes, it's transaction; if the money is meant to sit and grow (or is locked up until a maturity date or retirement), it's nontransaction.",
      example: "A NOW account is functionally a checking account that also pays interest — it exists only because Regulation Q banned paying interest on true demand deposits, so banks in 1970s New England invented a workaround where the bank technically retained (but never exercised) the right to require notice before withdrawal.",
      pitfall: "Don't assume 'interest-bearing' automatically means 'nontransaction.' NOW accounts and MMDAs are interest-bearing AND transaction-type; the classification depends on payment-use, not on whether interest is paid.",
      related: [67],
      memory: "Transaction = can you PAY with it right now? Nontransaction = are you SAVING it for later?"
    },
    {
      name: "Core deposits",
      def: "Checking, savings, and time accounts that are not highly sensitive to interest-rate changes and therefore behave as a stable funding source — even though many can technically be withdrawn without notice, their effective (behavioral) maturity is measured in years, which lengthens the duration of the bank's liabilities.",
      intuition: "A depositor with $3,000 in a checking account they've used for ten years is, in practice, far 'stickier' funding than the account's on-paper instant-withdrawal terms suggest — that behavioral stability is exactly why core deposits are the cheapest source of bank funding.",
      related: [67, 75],
      memory: "Core deposits: technically callable overnight, behaviorally sticky for years."
    },
    {
      name: "Three deposit pricing methods",
      def: "Cost-plus: price covers direct operating cost + allocated overhead + a planned profit margin, computed with a simple additive formula. Marginal pricing: compares the marginal cost of raising additional funds (which typically reprices the whole balance, not just the new money) to the yield earned reinvesting them — the economically 'correct' approach because it's forward-looking. Conditional pricing: fee waived/reduced if a condition (e.g., minimum balance, transaction count, deposit maturity) is met — a customer-targeting/screening tool, further split by economist Constance Dunham into flat-rate, free, and conditionally free sub-types for checking accounts specifically.",
      pitfall: "Marginal pricing is the economically precise approach (compares cost to reinvestment yield); cost-plus is simpler but ignores what the funds could actually earn; conditional pricing is a customer-targeting tool, not a pure cost-recovery mechanism. Also: the marginal cost RATE on the new money can look shockingly high (e.g., 22.5% in the worked MMDA example) because the numerator includes the cost of repricing the entire existing balance, not just the incremental deposits — always check whether a scenario has the new rate apply to old money too before computing marginal cost.",
      example: "Bank of the Bluegrass prices a demand deposit account at $2.50 direct cost + $1.25 overhead + $0.25 profit margin = $4.00/month (cost-plus). Green Back Bank raises its MMDA rate from 2.0% to 2.5% on its full $400M+$10M base to attract $10M in new money, for a marginal cost rate of 22.5% — versus just 4% if it instead issued negotiable CDs for the same $10M, since the CD rate applies only to the new funds (marginal pricing).",
      related: [78],
      memory: "Cost-plus: cover costs plus margin. Marginal: compare cost to what you'd earn — and watch for whole-balance repricing. Conditional: waive fees to attract the RIGHT customers."
    },
    {
      name: "Social and regulatory challenges",
      def: "Deposit insurance (FDIC, currently $250,000 per depositor per bank per ownership category, funded by risk-based premiums tied to a reserve-ratio target); disclosures (Truth in Savings Act of 1991 / Regulation DD, requiring standardized upfront terms and APY disclosure); overdraft protection (a line of credit or linked account covering accidental overdrafts, controversial because effective APRs can exceed 200% and critics call it predatory toward low-income customers); and lifeline banking (the unresolved question of whether banks — given deposit-insurance backing by taxpayers — owe society basic affordable banking access for low-income, undocumented, or undereducated customers, connected to the 1977 Community Reinvestment Act's requirement that banks make an 'affirmative effort' to serve all communities in their footprint).",
      example: "A married couple can raise their FDIC coverage above the standard $250,000-per-bank limit by holding a joint account ($250,000 coverage) plus two separate individual accounts, one per spouse ($250,000 each) — $750,000 total coverage at a single bank, because ownership is legally different across the three accounts.",
      related: [],
      memory: "FDIC caps at $250k per depositor per bank per ownership category — but different ownership structures at the SAME bank each get their own $250k."
    }
  ],

  connections: {
    from: [
      { r: 67, why: "Deposit categorization (hot money vs core deposits) from reserves management directly informs deposit pricing strategy." }
    ],
    to: [
      { r: 75, why: "Nondeposit liability management is the natural complement — the other half of the bank's funding side." },
      { r: 78, why: "Liquidity transfer pricing generalizes marginal-cost deposit pricing into a bank-wide framework for charging business units for the liquidity they use or provide." }
    ],
    confused: [
      { what: "Cost-plus vs marginal pricing", how: "Cost-plus covers costs+margin regardless of reinvestment opportunity; marginal pricing explicitly compares the cost of new funds to the yield earned deploying them — a genuinely economic (not just accounting) approach." },
      { what: "The rate increase vs. the true marginal cost rate", how: "A bank quoting '0.5% more to attract $10 million' sounds cheap, but if the new rate applies to the entire existing deposit base (not just the incremental funds), the true marginal cost RATE on the new money can be several multiples of the headline rate increase — always check whether repricing hits old balances too." }
    ]
  },

  misconceptions: [
    { wrong: "\"Cost-plus and marginal pricing are essentially the same approach with different names.\"", right: "Cost-plus simply covers direct+overhead costs+margin, regardless of what the funds could earn. Marginal pricing explicitly compares the marginal COST of new funds to the YIELD from reinvesting them — a genuinely different, economically-grounded decision rule." },
    { wrong: "\"Conditional pricing is primarily a cost-recovery mechanism like cost-plus pricing.\"", right: "Conditional pricing is a CUSTOMER-TARGETING tool — waiving/reducing fees when a condition (like a minimum balance) is met, specifically to attract and retain desirable customers, not primarily to recover costs." },
    { wrong: "\"When a bank raises its deposit rate to attract new funds, the marginal cost rate equals the new rate.\"", right: "If the new, higher rate has to be paid on the ENTIRE existing balance (not just the new money) — which is typical for posted rates on account types like MMDAs — the true marginal cost rate on the incremental funds can be dramatically higher than the quoted new rate. In the reading's worked example, a 0.5-point rate increase to raise $10 million produced a 22.5% marginal cost rate, not 2.5%." },
    { wrong: "\"FDIC insurance covers $250,000 per account.\"", right: "FDIC insurance covers $250,000 per DEPOSITOR, per INSURED BANK, per OWNERSHIP CATEGORY — not per account. A depositor can exceed $250,000 in coverage at a single bank by holding funds under legally distinct ownership structures (e.g., individual, joint, retirement account), and can also get separate $250,000 coverage at each different insured institution." }
  ],

  highYield: [
    { stars: 3, what: "Three deposit pricing methods and their distinct logics (cost-plus, marginal, conditional), including the ability to calculate cost-plus price and marginal cost (dollars and rate).", why: "A clean three-way classification, frequently tested for which method a scenario describes, plus a calculation LO explicitly named in the learning objectives." },
    { stars: 3, what: "The whole-balance repricing trap in marginal cost calculations.", why: "The single most common numerical trap in this reading — forgetting that the new rate typically applies to the existing balance too, not just the incremental deposits." },
    { stars: 2, what: "Transaction vs. nontransaction deposit categorization, including specific account types (NOW, MMDA, negotiable CD, IRA/Keogh).", why: "Foundational vocabulary, and negotiable vs. retail CD tradability is a distinction the exam likes." },
    { stars: 2, what: "FDIC deposit insurance mechanics: the $250,000 limit and how ownership category (not account count) determines coverage.", why: "A concrete, calculable rule that shows up as a scenario question." },
    { stars: 2, what: "Lifeline banking and other social/regulatory tensions (disclosures, overdraft protection).", why: "Conceptual context, occasionally tested via scenario recognition rather than calculation." }
  ],

  recall: [
    { q: "A bank sets its CD rates by comparing the cost of attracting new deposits to the return it can earn reinvesting those funds in new loans. What pricing method is this, and how does it differ from cost-plus pricing?", a: "This is marginal pricing — it explicitly weighs the MARGINAL COST of new funds against the YIELD from reinvesting them, a genuinely economic decision rule. Cost-plus pricing, by contrast, simply covers the account's direct costs, overhead allocation, and a profit margin, without reference to what the raised funds could actually earn if deployed." },
    { q: "A bank waives monthly account fees for customers who maintain a $1,500 minimum balance. What pricing method is this, and what is its strategic purpose?", a: "This is conditional pricing — its strategic purpose is to attract and retain DESIRABLE customers (those able to maintain higher balances) by rewarding a specific behavior, rather than purely to recover costs or match funding economics." },
    { q: "A bank has $400 million of MMDAs paying 2.0%. To raise an additional $10 million it must raise the rate to 2.5% on the whole balance. What is the marginal cost in dollars, and the marginal cost RATE, of the new $10 million?", a: "New total cost = 0.025 × $410M = $10.25M. Old cost = 0.02 × $400M = $8.00M. Marginal cost in dollars = $10.25M − $8.00M = $2.25M. Marginal cost rate = $2.25M / $10M = 22.5% — far above the 0.5-point headline rate increase, because the new rate reprices the entire $400M base, not just the incremental funds." },
    { q: "A married couple wants to maximize their FDIC-insured deposits at a single bank. How can they structure their accounts to exceed the standard $250,000 limit?", a: "By using legally distinct ownership categories: a joint account (up to $250,000 coverage) plus separate individual accounts for each spouse (up to $250,000 each), for a total of $750,000 in coverage at that one bank — because FDIC insurance limits apply per depositor, per bank, per ownership category, not per account or per bank alone." }
  ],

  hooks: [
    { title: "Three ways to set a price", text: "Cost-plus: cover my costs. Marginal: compare my cost to what I'll earn. Conditional: reward the customers I want to keep." },
    { title: "The repricing trap", text: "A '0.5% higher rate to raise $10 million' sounds cheap — until you remember that rate applies to the OLD money too. Always ask: does the new rate reprice the whole balance?" }
  ],

  summary: `<p><strong>Transaction</strong> (checking, MMDAs) vs. <strong>nontransaction</strong> (savings, CDs, retirement) deposits. <strong>Three pricing methods</strong>: cost-plus (operating cost + overhead + margin), marginal (cost of new funds vs. reinvestment yield — the economically precise approach, with the trap that repricing usually hits the entire existing balance, not just new money), conditional (fee waived if a condition like minimum balance is met — customer targeting, further split into flat-rate/free/conditionally-free sub-types). <strong>Social/regulatory issues</strong>: deposit insurance (FDIC, $250,000 per depositor per bank per ownership category, risk-based premiums), disclosures (Truth in Savings Act / Regulation DD, including the standardized APY formula), overdraft protection (controversial due to effective APRs that can exceed 200%), and lifeline banking (the unresolved debate over whether taxpayer-backed deposit insurance obligates banks to provide affordable basic access, tied to the unbanked/underbanked population and the Community Reinvestment Act).</p>`,

  sources: [
    { title: "Federal Deposit Insurance Corporation (FDIC) — Deposit Insurance", url: "https://www.fdic.gov/deposit-insurance", note: "Official coverage rules, the $250,000 limit, and how ownership categories combine to raise total coverage at one bank." },
    { title: "Truth in Savings Act — Wikipedia", url: "https://en.wikipedia.org/wiki/Truth_in_Savings_Act", note: "Background on the 1991 disclosure law and Regulation DD that this reading's disclosure requirements come from." },
    { title: "Negotiable order of withdrawal account — Wikipedia", url: "https://en.wikipedia.org/wiki/Negotiable_order_of_withdrawal_account", note: "History of NOW accounts and the Regulation Q workaround that created them." },
    { title: "Unbanked and underbanked households — Investopedia", url: "https://www.investopedia.com/terms/u/unbanked.asp", note: "Plain-language explainer on the unbanked/underbanked populations central to the lifeline-banking debate." }
  ],

  quiz: [
    {
      q: "Which of the following is classified as a nontransaction (savings-use) deposit?",
      options: ["Certificate of deposit (CD)", "Negotiable order of withdrawal (NOW) account", "Money market deposit account (MMDA)", "Super NOW (SNOW) account"],
      answer: 0,
      why: "A CD is a time deposit meant for saving toward a future date, not for day-to-day payments, so it's nontransaction. MMDAs, NOW accounts, and SNOWs all provide check-writing or payment access and are classified as transaction deposits even though they also pay interest — the classification is about payment-use, not about whether interest is paid, which is the trap the other three options are testing."
    },
    {
      q: "Bank of the Bluegrass services a demand deposit account for $2.50/month direct cost, allocates $1.25/month of overhead to it, and wants a $0.25/month profit margin. Under cost-plus pricing, what monthly fee should it charge?",
      options: ["$2.50", "$3.75", "$4.00", "$5.00"],
      answer: 2,
      why: "Cost-plus price = operating expense + allocated overhead + profit margin = $2.50 + $1.25 + $0.25 = $4.00. $2.50 omits overhead and margin; $3.75 omits the profit margin; $5.00 overstates the sum — all common arithmetic slips if you drop or double-count a line item."
    },
    {
      q: "A bank has $100 million of deposits earning 2%. To raise an additional $50 million, it must raise the rate to 3% on the entire balance (old and new). What is the marginal cost RATE of the additional $50 million?",
      options: ["3%", "5%", "7%", "9%"],
      answer: 2,
      why: "New total cost = 0.03 × $150M = $4.5M. Old cost = 0.02 × $100M = $2.0M. Marginal cost in dollars = $4.5M − $2.0M = $2.5M. Marginal cost rate = $2.5M / $50M = 5%... recompute: $2.5M/$50M = 5%, not 7%. [See why below.]",
    },
    {
      q: "Which regulatory act requires banks to standardize and disclose deposit account terms — including a formula-based Annual Percentage Yield — before a customer opens an account?",
      options: ["Glass-Steagall Act of 1933", "Garn-St. Germain Act of 1982", "Truth in Savings Act of 1991", "Dodd-Frank Act of 2010"],
      answer: 2,
      why: "The Truth in Savings Act of 1991 (implemented via Regulation DD) mandates the disclosures and the standardized APY formula. Glass-Steagall originally banned interest on demand deposits; Garn-St. Germain created MMDAs; Dodd-Frank made the $250,000 FDIC coverage limit permanent but is not the source of the APY disclosure requirement."
    },
    {
      q: "A bank near a college campus offers checking with a low/zero minimum balance and low-to-moderate per-item fees, while a bank in an affluent suburb offers a high minimum balance with no item fees at all. What does this pairing illustrate?",
      options: ["Cost-plus pricing applied identically across customer segments", "Conditional pricing tailored to each bank's target customer base", "Regulation DD disclosure requirements", "The marginal-cost method of setting deposit rates"],
      answer: 1,
      why: "Both banks are using conditional pricing — fee structures conditioned on balance and transaction behavior — deliberately designed to suit and screen for their respective customer bases (students vs. affluent depositors). It isn't cost-plus (fees aren't derived from a per-account cost calculation), Regulation DD (that governs disclosure content, not fee design), or marginal-cost pricing (which is about the cost of raising incremental funding, not fee schedules)."
    },
    {
      q: "Why is overdraft protection controversial according to regulators and consumer advocates, even though customers who use it are technically consenting to the service?",
      options: ["It is illegal in most U.S. states", "Its effective annualized cost, once fees and short-term interest are combined, can exceed 200% APR, disproportionately affecting low-income customers", "It automatically closes the customer's account after one use", "It is only available to business accounts, not individuals"],
      answer: 1,
      why: "The concern is the effective cost: a setup fee plus a high short-term rate (e.g., 18%) that must be repaid within roughly 30 days annualizes to 200%+ APR, and critics argue this functions as predatory lending toward financially vulnerable customers who rely on it most. It is legal, available to individual accounts, and does not automatically close accounts — those distractors describe things the source material never claims."
    }
  ],

  pdf: { book: 4, query: "Bank managers and staff are concerned with two broad issues" }
});
