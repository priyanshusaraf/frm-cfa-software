export default ({
  book: 4, reading: 67,
  session: "Liquidity Risk Management",
  title: "Liquidity and Reserves Management: Strategies and Policies",
  tagline: "The bank treasurer's actual day job: measuring the net liquidity position, choosing a management strategy, estimating liquidity needs with four named approaches, and managing legal reserve requirements.",

  teaches: `<p>Net liquidity position, three liquidity management strategies, four approaches to estimating liquidity requirements, liquidity indicator ratios, and legal reserves mechanics.</p>`,

  why: `<p>The four estimation approaches and the reserve formula are the testable core. This reading gives you the practical toolkit a treasurer actually uses day-to-day to answer "do we have enough liquidity right now, and where does more come from if not?"</p>`,

  intuition: `<p>Net liquidity position is simple arithmetic: supplies of liquidity minus demands for liquidity. Negative means you have a deficit and must raise funds; positive means you have a surplus to invest. The four estimation approaches are four different LENSES on the same question: sources-and-uses tracks deposit/loan flows directly; structure-of-funds splits funding by withdrawal likelihood (hot money vs. core deposits); liquidity indicator uses benchmarked ratios; market signals watches external confidence signals (stock price, borrowing risk premiums).</p>
  <p><strong>Why liquidity is different from solvency.</strong> A bank can be perfectly solvent — its assets are genuinely worth more than its liabilities — and still fail within days because it cannot convert those assets into cash fast enough to pay depositors and counterparties who want their money <em>today</em>. Liquidity is about the timing and availability of cash, not about whether the balance sheet nets out positive. This is why the reading opens by defining liquidity as access to funds that are (1) low-cost, (2) immediately spendable, and (3) available exactly when needed — all three conditions have to hold, not just one.</p>
  <p><strong>Where demand and supply of liquidity actually come from.</strong> Demand for spendable funds arises mainly from two sources: customers drawing down credit lines or requesting new loans, and customers withdrawing money from their deposit accounts. Add to that payoffs of the bank's own borrowings, dividend payments to shareholders, and income tax payments — all of these pull cash out of the institution. Supply comes from the mirror-image events: new customer deposits coming in, customers repaying their loans, the bank selling assets for cash, borrowing in the money market, and fee income earned on nondeposit services (things like trust services, wire transfers, or insurance products sold through the branch). Because these two streams rarely arrive in matched amounts or on matched days, a bank cycles continuously between deficit and surplus — liquidity management is not a one-time calculation, it is a permanent, ongoing job.</p>
  <p><strong>Why liquidity has a cost.</strong> Funding sources that make a bank more liquid (cash, short-term Treasuries) also tend to earn the lowest returns — that is the price of safety. A bank is therefore always trading off liquidity against profitability: hold too little liquidity and a shock can force a fire sale or an expensive emergency borrow; hold too much and you are leaving return on the table that a competitor bank is capturing. Two structural risk factors make this worse: <strong>maturity mismatch</strong> (banks fund long-term loans with short-term deposits and borrowings, so liabilities can come due before the matching assets pay off) creates both <em>interest rate risk</em> (rates on the short liabilities can move before the loan matures) and <em>availability risk</em> (funds simply may not be there when needed, regardless of price). On top of the pure arithmetic, liquidity managers must maintain constant communication with the bank's largest depositors and borrowers — a single large, unexpected withdrawal or credit-line draw can move the net liquidity position by itself, and public confidence in the institution (which affects everyone's willingness to keep money there) is itself a liquidity input, not just a side effect.</p>`,

  eli5: `<p>Think of your household's checking account. Every month, money flows in (paycheck, a refund) and flows out (rent, groceries, a surprise car repair). If more goes out than comes in during any given week, you have to do something fast: dip into savings, sell something, or put it on a credit card — and each of those options costs you something (lost interest on savings, a hassle selling stuff, interest charges on the card). If more comes in than goes out, the leftover cash should not just sit doing nothing — you'd move it to a savings account or investment so it at least earns something. A bank runs exactly the same problem, just at a vastly bigger scale and with far more moving parts: deposits and loan repayments coming in, withdrawals and new loans going out, every single day. The bank's "net liquidity position" is just that checking-account math — supplies of cash coming in minus demands for cash going out — and the four "approaches" in this reading are four different ways the bank's treasurer tries to see the shortfall or surplus coming before it happens, so there's time to arrange the credit card (borrowing) or the savings transfer (investing) calmly instead of in a panic.</p>`,

  thinkLike: `<p>A bank's money position manager (the specific job title for the person who runs this day to day) does not think of liquidity as a single number to compute once a quarter — they think of it as a continuously moving target they must forecast a few days to a few weeks ahead, because by the time a deficit is visible in today's numbers it is often too late to arrange the cheapest possible funding for it. The practitioner's mental model is: pick the right lens for the question being asked. Sources-and-uses answers "what do the raw deposit and loan flows say?" Structure-of-funds answers "how much of my funding base could actually walk out the door, and how fast?" Liquidity indicators answer "how do I compare to the industry and to my own trend, using ratios that don't require a granular forecast?" Market signals answer "does the outside world — depositors, other banks, the market pricing my CDs — already believe something is wrong?" A good treasurer runs all four simultaneously because each one can miss a different kind of problem: a bank can look fine on sources-and-uses flow forecasts while its liquidity-indicator ratios are quietly drifting toward the "less liquid" end, or vice versa.</p>
  <p>On the exam, GARP tests this reading in three predictable ways: (1) a direct net-liquidity-position arithmetic question — sum the supplies, sum the demands, subtract, and watch for line items in the given data that are demand-side dressed up to look supply-side (or vice versa); (2) a legal-reserves calculation applying tiered reserve ratios to a given deposit level, then comparing the required reserve to actual vault cash/deposits at the Fed to find the surplus or shortfall to raise; and (3) matching-style or "which of these signals liquidity trouble" questions built entirely around whether you have memorized which liquidity indicator ratios move with liquidity and which move against it — this is the single most commonly tested trap in the reading, precisely because it is pure memorization rather than logic you can derive on the fly.</p>`,

  breakdown: [
    {
      title: "Three liquidity management strategies",
      points: [
        "Asset conversion (asset liquidity management) — mostly smaller institutions. Hold a portfolio of genuinely liquid assets and convert pieces of it to cash as needs arise: Treasury bills (direct obligations of the U.S. or foreign governments), CDs, municipal bonds, interbank deposits, repurchase agreements, Eurocurrency loans, federal funds loans, and federal agency securities. A liquid asset must have a ready market, a stable price when sold, and be reversible (you can get the principal back with little risk of loss). Cost: you give up the earnings those assets would have generated (opportunity cost), you pay transaction costs to sell, and you risk having to sell in a down market — so the rule of thumb is to sell your lowest-profit-potential assets first, even though those are often the ones that make the balance sheet look strongest.",
        "Liability management (borrowed/purchased liquidity) — mostly larger institutions. Instead of holding a liquidity buffer in assets, borrow funds only when a need actually arises: jumbo negotiable CDs ($100,000+), repurchase agreement sales, Eurocurrency issuance, federal funds borrowing, the central bank discount window, and Federal Home Loan Bank (FHLB) advances. Advantage: you only borrow exactly what's needed, when it's needed, and can adjust the rate you're willing to pay up or down depending on urgency, leaving the asset portfolio untouched. Disadvantage: it's a riskier strategy because borrowing costs and credit availability both fluctuate with market conditions outside the bank's control.",
        "Balanced approach — what most institutions actually run. A blend: hold some marketable securities that can be sold quickly, and simultaneously arrange standby lines of credit in advance so borrowing capacity is pre-negotiated rather than scrambled for under pressure. The point of blending is that neither pure strategy alone handles both routine, predictable needs and sudden, unpredictable shocks well — assets alone are cheap-to-hold-safe but earn little and can be sold at a bad time; liabilities alone are flexible but exposed to rate and credit-availability swings."
      ]
    },
    {
      title: "Four approaches to estimating liquidity requirements",
      points: [
        "Sources and uses of funds — track that deposit increases raise liquidity and loan increases drain it; forecast expected changes in deposits (driven by personal income growth, money supply growth, inflation, retail sales, money-market deposit yields) and expected changes in loans (driven by economic growth, corporate earnings, the spread between the prime rate and CD/commercial-paper rates), then take estimated ∆deposits − ∆loans to get a surplus (+) or deficit (−) for the period. A positive gap (sources > uses) is a surplus; a negative gap (uses > sources) is a deficit.",
        "Structure of funds — split every funding source into three buckets by how likely it is to be withdrawn: volatile/hot-money liabilities (highly rate-sensitive, high withdrawal likelihood — large CDs, Eurocurrency deposits, repo agreements, fed funds borrowings), vulnerable funds (a meaningful chunk likely to leave), and core deposits/stable funds (unlikely to move). Apply a reserve percentage to each bucket (e.g. 90% for hot money, 25% for vulnerable, 10% for core — these percentages vary by bank and are always given on the exam, not memorized) and sum to get the liability liquidity reserve; add a further allowance for potential future good loans (loans to creditworthy customers with legitimate needs) if the bank wants to be able to fund all future demand. Can be extended into best-case / most-likely-case / worst-case scenarios, each assigned a probability, with the expected liquidity requirement equal to the probability-weighted average of the scenario outcomes.",
        "Liquidity indicator — a set of named ratios benchmarked against industry averages and the bank's own trend over time (the change in a ratio period-to-period matters more than its absolute level). See the ratio-direction breakdown below — this is the reading's single highest-yield memorization item.",
        "Market signals (discipline) — instead of computing anything, watch what the outside world is telling you: public confidence in the institution, the bank's stock price performance, loss sales of assets (how often and how large the losses are when the bank is forced to sell), risk premiums the bank pays on its CDs and borrowings relative to peer institutions, the frequency and size of central bank borrowings, and whether the bank can still meet legitimate credit commitments to customers. If any of these are deteriorating, the market is telling you the bank's liquidity position is under stress even before the internal numbers confirm it."
      ]
    },
    {
      title: "Liquidity indicator ratios — which direction is 'good'",
      points: [
        "Higher = MORE liquid (stored liquidity — these measure liquid assets already on hand): cash position indicator = (cash + deposits due from depository institutions) / total assets. Liquid securities indicator = U.S. government securities / total assets. Core deposit ratio = core deposits (total deposits minus those over $100,000) / total assets. Hot money ratio = money market assets (cash, deposits due from other institutions, short-term securities, reverse repos, fed funds loans) / volatile liabilities (large CDs, Eurocurrency deposits, repos, fed funds borrowings). Net federal funds and repo position = (fed funds sold + reverse repos − fed funds purchased − repos) / total assets.",
        "Higher = LESS liquid (purchased liquidity — these measure reliance on liabilities and future commitments): capacity ratio = net loans and leases / total assets. Loan commitments ratio = unused loan commitments (promises of credit not yet drawn) / total assets. Pledged securities ratio = pledged securities / total securities holdings. Deposit composition ratio = demand deposits / time deposits (demand deposits are volatile; time deposits have fixed maturities and early-withdrawal penalties, so they're stickier). Deposit brokerage index = brokered deposits (funds placed by securities brokers on behalf of their customers, which are rate-sensitive and can leave quickly) / total deposits.",
        "Stored-liquidity ratios (the first group) tend to fall when loan demand is strong (the bank is deploying its liquid cushion into loans) and rise when activity is sluggish. Purchased-liquidity ratios (the second group) move the opposite way: they rise when credit demand accelerates and fall when the economy slows — because a bank leans harder on liabilities and commitments precisely when loan demand is running hot."
      ]
    },
    {
      title: "Factors driving the choice among sources of reserves",
      points: [
        "Need duration — the fed funds market and the central bank discount window suit short-term deficits; longer shortages are better covered by longer-term borrowing or outright asset sales.",
        "Need immediacy — an urgent, same-day deficit calls for overnight fed funds loans or a discount-window loan; a non-urgent need can instead be met by selling assets or selling deposits, which take longer to arrange.",
        "Costs and risks of alternative fund sources — pricing and availability across sources shift constantly, so the manager must continually re-rank options by cost.",
        "Liquid fund market access — a bank can only use sources it actually has established access to quickly (not every bank has equal standing in every market).",
        "Outlook for monetary policy — central bank policy drives the money supply, which in turn drives interest rates across all these funding sources.",
        "Outlook for interest rates — managers prefer the source with the lowest expected cost, which requires forecasting where rates are headed.",
        "Liquidity source rules and regulations — every source (discount window, fed funds, Eurocurrency market, etc.) has its own eligibility rules and, for some (Eurocurrency, fed funds), limited hours of availability during the trading day."
      ]
    }
  ],

  formulas: [
    { name: "Net liquidity position", math: "L = \\text{supplies of liquidity} - \\text{demands of liquidity}", note: "L<0: deficit, must raise funds. L>0: surplus, invest the excess.",
      plain: "This formula says the bank's liquidity position on any given day is simply everything pushing cash in (new deposits, loan repayments, asset sales, money-market borrowing, fee income) minus everything pulling cash out (credit-line draws, loan requests, deposit withdrawals, debt payoffs, dividends, taxes).",
      derivation: `<p>Worked example (Legend Bank, liquidity manager Genny Richards): supplies for the period are asset sales of \\(\\$1{,}325{,}000\\), incoming deposits of \\(\\$2{,}500{,}000\\), and nondeposit services revenue of \\(\\$950{,}000\\). Demands are deposit withdrawals of \\(\\$1{,}015{,}000\\), dividend payments of \\(\\$470{,}000\\), and loan requests of \\(\\$845{,}000\\).</p>
      <p>\\[ L = (\\$1{,}325{,}000 + \\$2{,}500{,}000 + \\$950{,}000) - (\\$1{,}015{,}000 + \\$470{,}000 + \\$845{,}000) \\]</p>
      <p>\\[ L = \\$4{,}775{,}000 - \\$2{,}330{,}000 = \\$2{,}445{,}000 \\]</p>
      <p>A positive \\(L\\) of \\(\\$2{,}445{,}000\\) means Legend Bank has a liquidity surplus for the period and should invest the excess rather than let it sit idle.</p>` },
    { name: "Total required legal reserves", math: "\\text{total required legal reserves} = \\sum_{\\text{category}} \\big(\\text{reservable liabilities}_{\\text{category}} \\times \\text{applicable reserve ratio}_{\\text{category}}\\big)", note: "Excess reserves = legal reserves held > required; deficit = legal reserves held < required.",
      plain: "This says required reserves are built up category by category: each tier of reservable deposits gets multiplied by the reserve ratio that applies to that tier, and the results are added together — it is a tiered (marginal-bracket-style) calculation, not one flat ratio applied to the whole deposit base.",
      derivation: `<p>Worked example (Ridgeland Bank): the reserve ratio is \\(0\\%\\) on net transaction deposits up to \\(\\$10.7\\) million, \\(3\\%\\) on the tranche from \\(\\$10.7\\) million to \\(\\$58.8\\) million, and \\(10\\%\\) on everything above \\(\\$58.8\\) million. Ridgeland's net transaction deposits averaged \\(\\$145\\) million over the reserve computation period, and its vault cash averaged \\(\\$7.25\\) million over the same period.</p>
      <p>\\[ \\text{required reserve} = (0\\% \\times \\$10.7\\text{M}) + \\big[3\\% \\times (\\$58.8\\text{M} - \\$10.7\\text{M})\\big] + \\big[10\\% \\times (\\$145\\text{M} - \\$58.8\\text{M})\\big] \\]</p>
      <p>\\[ \\text{required reserve} = \\$0 + \\$1.443\\text{M} + \\$8.62\\text{M} = \\$10.063\\text{M} \\]</p>
      <p>Since vault cash of \\(\\$7.25\\) million counts toward satisfying the requirement, the additional legal reserves Ridgeland must raise are \\(\\$10.063\\text{M} - \\$7.25\\text{M} = \\$2.813\\) million.</p>` }
  ],

  concepts: [
    {
      name: "Net liquidity position",
      def: "L = supplies of liquidity − demands for liquidity. L<0: liquidity deficit, must raise funds. L>0: liquidity surplus, invest the excess.",
      intuition: "It's the bank-wide version of checking whether more cash is coming in than going out this period — a running scoreboard, not a one-time snapshot, because supply and demand rarely line up on any given day.",
      example: "Legend Bank: supplies of $1,325,000 (asset sales) + $2,500,000 (deposits) + $950,000 (fee income) = $4,775,000. Demands of $1,015,000 (withdrawals) + $470,000 (dividends) + $845,000 (loan requests) = $2,330,000. L = $4,775,000 − $2,330,000 = $2,445,000 surplus. Costs of managing liquidity generally: search/transaction costs, interest costs on borrowed funds, opportunity costs of liquidating assets.",
      pitfall: "Don't mistake a deposit withdrawal for a supply-side item just because deposits themselves are a supply source — withdrawals are demand, new deposits are supply. Sort each line item by direction of cash flow, not by which account it touches.",
      related: []
    },
    {
      name: "Three liquidity management strategies",
      def: "Asset conversion (hold liquid assets, convert to cash as needed: T-bills, CDs, munis, interbank deposits, repos, Eurocurrency loans, fed funds, agency securities). Liability management (borrow to cover needs: jumbo negotiable CDs, repos, Eurocurrency issuance, fed funds borrowing, discount window, FHLB advances). Balanced approach (blend of both).",
      intuition: "Asset conversion is 'keep a rainy-day fund of liquid stuff and sell pieces of it.' Liability management is 'don't keep a rainy-day fund — just borrow exactly when it rains.' Balanced is doing a bit of both so you're never fully exposed to either strategy's weak spot.",
      example: "A small community bank leans on asset conversion, holding T-bills and munis it can sell quickly. A large money-center bank leans on liability management, issuing jumbo negotiable CDs or tapping the discount window only when a specific need arises, keeping its loan book untouched.",
      pitfall: "Liability management looks 'free' because you don't tie up a buffer of low-earning assets — but it exposes the bank to interest-rate volatility and credit-availability risk exactly when the bank most needs to borrow, which is the tradeoff the reading is testing when it calls this the riskier strategy.",
      related: []
    },
    {
      name: "Four approaches to estimating liquidity requirements",
      def: "Sources and uses of funds: deposit increases ↑ liquidity, loan increases ↓ liquidity — positive gap=surplus, negative gap=deficit. Structure of funds: split funding into hot money/vulnerable funds/core deposits by withdrawal likelihood, reserve each per an operating rule; can extend to best/likely/worst-case scenario probabilities. Liquidity indicator: ratio-based, benchmarked to industry experience. Market signals (discipline): watch public confidence, stock price, forced asset sales, borrowing risk premiums, central bank borrowing, credit commitments.",
      intuition: "Sources-and-uses is a cash-flow forecast; structure-of-funds is a funding-stability audit; liquidity indicator is a ratio dashboard; market signals is 'read the room.' Each catches something the others might miss.",
      example: "Jartens Bank (structure of funds): categorize deposits/nondeposit liabilities into hot money, vulnerable, and core buckets; apply desired reserve percentages of 90%, 25%, and 10% respectively; legal reserves run 2.5%; actual loans are $85 million with potential to reach $100 million if the bank wants to fund all good loan demand — the liquidity requirement adds the weighted liability reserve to the gap between actual and potential loans.",
      pitfall: "Liquidity indicator ratios split into TWO directions: higher = more liquid (cash position, liquid securities, core deposit ratio, hot money ratio, net fed funds/repo position) vs. higher = LESS liquid (capacity ratio, loan commitments ratio, pledged securities ratio, deposit composition ratio, deposit brokerage index). Memorize which bucket each named ratio falls into rather than assuming 'higher is always safer.'",
      related: [],
      memory: "Four lenses, one question: sources/uses tracks flows, structure-of-funds sorts by stickiness, liquidity indicator uses ratios, market signals watches the crowd's confidence."
    },
    {
      name: "Legal reserves",
      def: "Total required legal reserves = reservable liabilities × the applicable reserve ratio (summed across each reservable category, since the ratio is tiered by deposit size, not flat).",
      intuition: "This is a progressive-bracket calculation, structurally the same idea as a tax bracket: the first slice of deposits gets one ratio, the next slice gets a higher ratio, and so on — you never apply the top-tier ratio to the whole deposit base.",
      example: "Reserve computation period runs Tuesday of one week through Monday two weeks later (14 days) and gathers daily average deposit and vault-cash data. The reserve maintenance period — when the bank must actually hold the reserve — begins 30 days after the computation period starts and also runs 14 days (Thursday through Wednesday two weeks later); this system is called Lagged Reserve Accounting (LRA), because the maintenance period lags the computation period. Ridgeland Bank example: required reserve of $10.063 million against $145 million in net transaction deposits using 0%/3%/10% tiered ratios, less $7.25 million vault cash already on hand, leaves $2.813 million still to raise. Excess reserves = legal reserves held > required; deficit = legal reserves held < required — the goal is zero excess and zero (penalty-triggering) deficit (in the U.S., staying within about 4% of the required daily average avoids the penalty).",
      pitfall: "A clearing balance is reserve held VOLUNTARILY at the Fed to cover debit items (checks/payments drawn against the bank) — distinct from required legal reserves, though it follows a similar two-week minimum-daily-average structure and any excess in it can cushion a legal-reserve deficit. The fed funds market is the cheap-but-volatile go-to for covering a deficit (its rate literally changes minute to minute, though it hovers near the target fed funds rate); alternatives: sell liquid securities, draw balances at other institutions, use repos, borrow Eurocurrency, sell time deposits. Sweep accounts (moving customer balances into higher-yielding, non-reservable accounts) are a major structural driver of the long-run decline in banks' legal reserve balances.",
      related: [],
      memory: "The goal isn't maximum reserves — it's exactly zero excess AND zero deficit, since both cost something."
    }
  ],

  connections: {
    from: [
      { r: 66, why: "The investment portfolio described there becomes part of the liquid-asset toolkit managed here." }
    ],
    to: [
      { r: 68, why: "Intraday liquidity management is this reading's day-to-day treasury function, zoomed into the finest time scale." },
      { r: 75, why: "Deposit categorization (structure of funds: hot money vs core deposits) reappears in deposit pricing strategy." }
    ],
    confused: [
      { what: "Higher-is-more-liquid vs higher-is-less-liquid indicator ratios", how: "Cash position/liquid securities/core deposit ratio/hot money ratio/net fed funds position: higher=more liquid. Capacity ratio/loan commitments ratio/pledged securities ratio/deposit composition ratio/deposit brokerage index: higher=LESS liquid — memorize which bucket, don't assume direction." }
    ]
  },

  misconceptions: [
    { wrong: "\"A higher value for any liquidity indicator ratio always signals a more liquid, safer position.\"", right: "Ratios split into two directions: cash position, liquid securities, core deposit ratio, hot money ratio, and net fed funds/repo position are higher=more liquid; but capacity ratio, loan commitments ratio, pledged securities ratio, deposit composition ratio, and deposit brokerage index are higher=LESS liquid." },
    { wrong: "\"A bank's goal should be to maximize its legal reserves held.\"", right: "The goal is ZERO excess AND zero deficit — both excess reserves (opportunity cost of idle funds) and deficits (penalty-triggering) are costly; the target is precise adequacy, not maximization." },
    { wrong: "\"Legal reserves are calculated by applying a single flat reserve ratio to the bank's total deposits.\"", right: "The reserve ratio is tiered by deposit size (e.g. 0% up to one threshold, 3% on the next tranche, 10% above the next threshold), so total required reserves is a sum across tiers, not one ratio times the whole deposit base." },
    { wrong: "\"Liability management is the safer strategy because the bank never has to sell assets at a bad time.\"", right: "Liability management avoids forced asset sales, but it substitutes a different risk: exposure to interest-rate volatility and uncertain credit availability at exactly the moment the bank needs to borrow — the reading explicitly calls it the riskier of the three strategies." }
  ],

  highYield: [
    { stars: 4, what: "Liquidity indicator ratios: which direction (higher=more liquid vs. higher=less liquid) each named ratio falls into.", why: "Explicitly flagged as a memorization trap — 'higher is always safer' is the wrong instinct." },
    { stars: 3, what: "Four approaches to estimating liquidity requirements and their distinct logics.", why: "A clean four-way classification, good for matching-style questions." },
    { stars: 2, what: "Net liquidity position formula and legal reserves formula.", why: "Simple, direct calculation fluency." },
    { stars: 2, what: "Lagged Reserve Accounting timeline: 14-day computation period, then maintenance period beginning 30 days after computation starts.", why: "A specific, calculable timeline the exam can test directly (e.g. 'which day is the start of the maintenance period')." }
  ],

  recall: [
    { q: "A bank's 'loan commitments ratio' rises significantly quarter over quarter. Does this signal improving or deteriorating liquidity?", a: "Deteriorating — the loan commitments ratio is one of the ratios where HIGHER values signal LESS liquidity (more undrawn commitments represent potential future funding demands the bank must be prepared to meet)." },
    { q: "Why does the reading emphasize that a bank's legal reserves target is zero excess AND zero deficit, rather than simply 'as much reserve as possible'?", a: "Excess reserves represent idle funds not earning a return (an opportunity cost), while a deficit triggers regulatory penalties — both are costly in different ways. The optimal target is precise adequacy: exactly meeting the requirement, neither more nor less, to avoid both costs." },
    { q: "A bank has net transaction deposits of $145 million and vault cash of $7.25 million. Reserve ratios are 0% up to $10.7M, 3% from $10.7M to $58.8M, and 10% above $58.8M. How much additional legal reserve must it raise?", a: "Required reserve = (0% × $10.7M) + [3% × ($58.8M − $10.7M)] + [10% × ($145M − $58.8M)] = $0 + $1.443M + $8.62M = $10.063M. Additional to raise = $10.063M − $7.25M vault cash = $2.813M." }
  ],

  hooks: [
    { title: "Two directions, one list", text: "Half these ratios say 'more is safer,' half say 'more is scarier' — the trap is assuming they all point the same way. Sort them into buckets, not a single scale." },
    { title: "Tax-bracket math, not flat-rate math", text: "Legal reserves aren't one ratio times total deposits — they're tiered exactly like an income tax bracket, applied slice by slice." }
  ],

  quiz: [
    {
      q: "Legend Bank's liquidity manager forecasts asset sales of $1,325,000, incoming deposits of $2,500,000, nondeposit services revenue of $950,000, deposit withdrawals of $1,015,000, dividend payments of $470,000, and loan requests of $845,000. The net liquidity position is closest to:",
      options: ["$2,330,000", "$2,445,000", "$3,385,000", "$3,405,000"],
      answer: 1,
      why: "Supplies ($1,325,000 + $2,500,000 + $950,000 = $4,775,000) minus demands ($1,015,000 + $470,000 + $845,000 = $2,330,000) = $2,445,000. The tempting distractor $2,330,000 is just the demand total by itself — a sign the solver forgot to subtract it from supplies rather than treating it as the answer."
    },
    {
      q: "A bank primarily using the liability (borrowed liquidity) management strategy is most likely to rely on which of the following as a liquidity source?",
      options: ["U.S. Treasury securities held in the investment portfolio", "Federal agency securities held in the investment portfolio", "Jumbo negotiable CDs and repurchase agreement sales", "Municipal bond holdings"],
      answer: 2,
      why: "Liability management means borrowing funds on demand rather than holding a liquid-asset buffer — jumbo negotiable CDs, repo sales, Eurocurrency issuance, fed funds borrowing, and FHLB advances are the named sources. Treasuries, agency securities, and municipal bonds are all liquid *assets* the bank would hold under asset conversion, the opposite strategy."
    },
    {
      q: "Which of the following would most concern a liquidity manager trying to stabilize the bank's liquidity position?",
      options: ["An increasing hot money ratio", "An increasing deposit composition ratio", "An increase in reverse repurchase agreements outstanding", "An excess of federal funds sold over federal funds purchased"],
      answer: 1,
      why: "The deposit composition ratio (demand deposits / time deposits) is a higher-is-LESS-liquid indicator — a rising ratio means more of the funding base is in volatile demand deposits relative to sticky, penalty-protected time deposits. The other three options are all higher-is-more-liquid indicators (hot money ratio, reverse repos, and net fed funds sold over purchased all signal MORE liquidity when they rise), which is the trap: it's easy to assume 'increasing' always means 'worsening,' but three of these four increases are actually good news."
    },
    {
      q: "In the structure-of-funds approach, why does the reading recommend applying different reserve percentages (e.g., 90%, 25%, 10%) to hot money, vulnerable funds, and core deposits respectively, rather than one uniform percentage to total deposits?",
      options: [
        "Because regulators require different reserve ratios by law for each category",
        "Because each category has a different likelihood of being withdrawn within the period, so holding liquid reserves against a category should scale with how likely that category is to actually leave",
        "Because core deposits earn the bank a higher interest margin and therefore need larger reserves",
        "Because hot money is held in a different currency than core deposits and requires FX hedging reserves"
      ],
      answer: 1,
      why: "The whole point of the structure-of-funds method is to reserve more heavily against funding that is likely to walk out the door (hot money, at 90%) and much less against funding that is unlikely to move (core deposits, at 10%) — it's a withdrawal-likelihood-weighted reserve, not a regulatory mandate (that's legal reserves, a separate concept) or a margin/FX consideration."
    },
    {
      q: "A money position manager needs to cover an urgent, same-day legal reserve deficit at the smallest possible notice. Which source is most appropriate?",
      options: ["Selling long-term investment securities", "Selling a portfolio of time deposits", "Borrowing overnight in the federal funds market or from the central bank discount window", "Arranging a term loan from a correspondent bank over the next several weeks"],
      answer: 2,
      why: "Need immediacy is one of the reading's explicit factors driving source choice: urgent, same-day deficits are covered by overnight fed funds borrowing or the discount window, both available same-day. Asset sales, time-deposit sales, and multi-week term loans all take longer to arrange and are better suited to non-immediate or longer-duration needs."
    },
    {
      q: "Tuesday, May 5 is the first day of Lakeland Bank's reserve computation period under Lagged Reserve Accounting. What does Monday, May 18 represent?",
      options: ["The first day of the reserve maintenance period", "The last day of the reserve computation period", "The first day of the planning period", "The last day of the reserve maintenance period"],
      answer: 1,
      why: "The reserve computation period is a 14-day window from Tuesday to the Monday two weeks later — May 5 (Tuesday) through May 18 (Monday) is exactly 14 days, so May 18 is the LAST day of the computation period. The maintenance period doesn't begin until 30 days after the computation period starts (a much later date), and the planning period is the gap between the two, not a single named day like May 18."
    }
  ],

  sources: [
    { title: "Reserve requirements (Federal Reserve)", url: "https://www.federalreserve.gov/monetarypolicy/reservereq.htm", note: "Federal Reserve's own page on how reserve requirements work and their history, including the shift to zero reserve requirements in 2020 — useful context for how the tiered-ratio mechanics described in this reading have evolved." },
    { title: "Bank liquidity", url: "https://en.wikipedia.org/wiki/Bank_liquidity", note: "Overview of bank liquidity concepts, the liquidity-solvency distinction, and common bank liquidity management tools." },
    { title: "Federal funds", url: "https://en.wikipedia.org/wiki/Federal_funds", note: "Background on the federal funds market referenced repeatedly in this reading as the cheap-but-volatile go-to source for covering reserve deficits." },
    { title: "Certificate of deposit", url: "https://www.investopedia.com/terms/c/certificateofdeposit.asp", note: "Explains negotiable/jumbo CDs, one of the named liability-management funding sources in this reading." }
  ],

  pdf: { book: 4, query: "Liquidity represents a financial institution's access to funds" },

  summary: `<p><strong>Net liquidity position</strong> L=supplies−demands; negative=deficit, positive=surplus (Legend Bank example: $4,775,000 supplies − $2,330,000 demands = $2,445,000 surplus). <strong>Three strategies</strong>: asset conversion, liability management, balanced. <strong>Four estimation approaches</strong>: sources/uses of funds, structure of funds (hot money/vulnerable/core), liquidity indicator (ratio-based), market signals (confidence-based). <strong>Liquidity ratios</strong> split into higher=more-liquid vs higher=less-liquid buckets — memorize which. <strong>Legal reserves</strong> = tiered reservable liabilities×ratio, summed across brackets (Ridgeland Bank example: $10.063M required against $145M deposits, minus $7.25M vault cash = $2.813M still to raise); target zero excess AND zero deficit; clearing balance is voluntary Fed-held reserve; fed funds market is the cheap-but-volatile deficit-covering tool; Lagged Reserve Accounting runs a 14-day computation period followed by a maintenance period starting 30 days after computation begins.</p>`
});
