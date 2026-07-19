export default ({
  book: 4, reading: 75,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "Managing Nondeposit Liabilities",
  tagline: "Closes Session 11 with the non-deposit half of bank funding: what sources exist, how to size the funding gap, and the two ways to estimate the bank's overall cost of funds.",

  teaches: `<p>Deposits are the largest funding source at any bank, but they're rarely enough on their own to cover everything the bank wants to lend and invest. This reading is about the other half of the funding stack: <strong>nondeposit liabilities</strong> — money and capital market borrowing the bank uses to plug the gap. You'll learn the eight main nondeposit sources and what makes each one distinct (fed funds, repos, the discount window, Federal Home Loan Bank advances, negotiable/jumbo CDs, Eurocurrency deposits, commercial paper, and long-term nondeposit debt), the <strong>available funds gap (AFG)</strong> formula that tells a treasurer exactly how much nondeposit funding to go raise, the five factors (cost, risk, maturity, institution size, regulation) that determine which source to use, and the two competing ways banks estimate what all this funding actually costs them: the backward-looking historical average cost approach and the forward-looking pooled funds approach.</p>`,

  why: `<p>Here's the problem this reading solves: a bank's <strong>customer relationship doctrine</strong> says you make a loan whenever that loan (and the relationship behind it) is expected to be net profitable — "sorry, we're out of deposits" is not an acceptable answer to a good borrower. So when deposits fall short of loan demand and security purchases, the bank has to go out and *buy* funding in the money and capital markets. That's <strong>liability management</strong>: actively purchasing funds, mostly from other banks and institutional lenders, rather than passively waiting for deposits to walk in the door. Because liability management taps interest-sensitive, short-maturity markets, it exposes the bank to more interest rate risk than deposit funding does — which is exactly why examiners test you on knowing each source's cost, risk, and maturity profile, and on being able to size the funding gap correctly with the AFG formula before you go borrow.</p>`,

  intuition: `<p>Two intuitions run through this whole reading. First, on choosing a nondeposit source: think of it as a menu ranked roughly by cost and reliability. <strong>Fed funds</strong> sit at the cheap-and-immediate end but are volatile and available only during the trading day. <strong>Negotiable CDs, Eurocurrency deposits, and commercial paper</strong> cost a bit more but are more stable and can be locked in for longer. The <strong>discount window</strong> is a backstop, not a habit — regulators price it (and watch it) so it isn't a cheap substitute for market funding. <strong>FHLB advances</strong> are the odd one out: created in 1932 specifically to keep mortgage lenders funded through deposit runs, so they're stable, often below-market, and senior to almost every other claim (even the FDIC) if the borrowing bank fails.</p><p>Second, on the two cost-estimation approaches: they look in opposite directions in time. <strong>Historical average cost</strong> is backward-looking — it averages the interest and noninterest cost of every dollar of funding the bank has already raised, plus what shareholders require on their equity. <strong>Pooled funds</strong> is forward-looking — it asks "what minimum return must the loans and securities I'm about to fund with NEW money earn, in order to cover the cost of that NEW money?" A bank pricing a brand-new loan should reach for the pooled-funds number, not the historical average, because the cost of money already raised is sunk — it doesn't change no matter how the new loan is priced, so it's irrelevant to that forward-looking decision.</p>`,

  visual: `<div class="widget" data-widget="ladder" data-ladder='[{"bucket":"Available funds gap","gap":80}]'></div>`,

  formulas: [
    {
      name: "Available funds gap (AFG)",
      math: "\\text{AFG} = (\\text{current} + \\text{projected loans and other investments}) - (\\text{current} + \\text{expected deposit inflows and other available funds})",
      note: "A positive gap means nondeposit funding is needed to cover the shortfall.",
      plain: "The AFG is simply everything the bank plans to fund (new loans, new security purchases, and drawdowns on existing credit lines) minus everything it expects to have available to fund it with (new deposits plus any other available funds); a positive number is the dollar amount the treasurer must go raise nondeposit funding to cover.",
      derivation: `<p>Worked example (Ravens Bank): the bank expects to make \\(\\$100\\) million of new loans and invest \\(\\$15\\) million in mortgage-backed securities next quarter, and it expects existing customers to draw an extra \\(\\$30\\) million on their revolving credit lines. On the funding side, it expects \\(\\$75\\) million in new deposits.</p><p>\\[ \\text{AFG} = (\\$100\\,\\text{M} + \\$15\\,\\text{M} + \\$30\\,\\text{M}) - \\$75\\,\\text{M} = \\$70\\,\\text{M} \\]</p><p>Banks routinely pad the AFG with a safety margin to cover unexpectedly strong loan demand or a deposit shortfall. If Ravens Bank adds a 10% safety margin, it plans to actually go raise \\(1.10 \\times \\$70\\,\\text{M} = \\$77\\,\\text{M}\\) in nondeposit markets — deliberately a bit more than the bare-minimum gap.</p>`
    },
    {
      name: "Negotiable CD interest cost",
      math: "\\text{interest cost} = \\text{principal} \\times \\text{CD rate} \\times \\dfrac{\\text{days to maturity}}{360}",
      note: "Like repo interest, negotiable (jumbo) CD interest is calculated on a 360-day year, not 365.",
      plain: "This is the dollar interest a bank owes on a fixed-rate jumbo CD: the principal borrowed, times the quoted annual rate, times the fraction of a 360-day year the CD is outstanding for."
    },
    {
      name: "Effective cost of funds",
      math: "\\text{effective cost of funds} = \\dfrac{\\text{current interest cost on funds borrowed} + \\text{noninterest costs incurred to access funds}}{\\text{net investable funds raised}}",
      note: "Net investable funds are what's left to actually invest in earning assets after deductions like reserve requirements, insurance fees, and the funds tied up in nonearning assets.",
      plain: "This restates the true, all-in cost of a funding source as a percentage rate: total interest plus every noninterest cost of accessing that funding (staff time, systems, insurance, reserve deductions), divided by the funds actually available to invest after all those deductions — not the gross amount raised."
    },
    {
      name: "Pooled funds expense rate and hurdle rate",
      math: "\\text{pooled deposit and nondeposit funds expense} = \\dfrac{\\text{all expected operating expenses}}{\\text{all new funds expected}}, \\qquad \\text{hurdle rate} = \\dfrac{\\text{all expected operating expenses}}{\\text{dollars invested in earning assets}}",
      note: "The hurdle rate is the minimum before-tax return the bank must earn on newly funded earning assets to break even on the cost of all new funds raised (deposits + nondeposit + equity).",
      plain: "Both numbers divide the same total dollar cost of new funding by two different denominators: the first (a lower rate) spreads that cost over every new dollar raised, while the second (a higher rate, since some raised funds sit in non-earning reserves or fixed assets rather than earning assets) spreads it only over the dollars that will actually be earning a return — which is why the hurdle rate is always at least as large as the pooled funds expense rate.",
      derivation: `<p>Worked example (Orange Tree Bank): the bank expects to raise \\(\\$270\\) million in new deposit and nondeposit funds, expects total interest and overhead (operating) costs on that new funding of \\(\\$22.60\\) million, but only \\(\\$221\\) million of the \\(\\$270\\) million raised will actually be invested in earning assets (the rest sits in required reserves, cash, or other nonearning uses).</p><p>\\[ \\text{pooled funds expense} = \\dfrac{\\$22.60\\,\\text{M}}{\\$270\\,\\text{M}} = 8.37\\% \\]</p><p>\\[ \\text{hurdle rate} = \\dfrac{\\$22.60\\,\\text{M}}{\\$221\\,\\text{M}} = 10.23\\% \\]</p><p>So Orange Tree Bank must earn at least 10.23% before tax on every new dollar of earning assets it funds this way, or it will not cover the cost of the new deposits, nondeposit funds, and equity it raised to fund them.</p>`
    }
  ],

  concepts: [
    {
      name: "Nondeposit funding sources",
      def: "The eight money- and capital-market sources banks use to fill the gap between what deposits fund and what the bank wants to lend/invest: fed funds, repos, discount window borrowing, FHLB advances, negotiable (jumbo) CDs, Eurocurrency deposits, commercial paper, and long-term nondeposit debt.",
      intuition: "Deposits are cheap but passive — the bank waits for customers to bring money in. Nondeposit funding is the bank actively going out and buying money in the market (this active process is called liability management), which gives it flexibility to raise exactly the amount needed, exactly when needed, but at the cost of more interest rate sensitivity than deposits carry.",
      example: "Fed funds are short-term (often overnight) borrowings between depository institutions, settled through deposits held at the Federal Reserve; used to meet reserve requirements, clear checks, and fund Treasury purchases. They come in three flavors: overnight loans (returned the next day), term loans (days to months, usually under a written contract), and continuing contracts (auto-renew daily until either side cancels — common between a small bank and its correspondent bank, a larger bank that performs services on its behalf). Repurchase agreements (repos) are collateralized: the borrower sells high-quality liquid securities (e.g., Treasury bills, notes, or bonds) in the 'starting leg' and buys them back at a preset price in the 'closing leg'; the collateral is what makes repos lower-risk to the lender than unsecured fed funds. Discount window borrowing is a short-term Fed loan credited to the bank's reserve account, backed by acceptable collateral (Treasury or agency securities), split into primary credit (cheapest, slightly above the fed funds target rate, for healthy banks), secondary credit (up to 150 basis points above fed funds, for banks that don't qualify for primary), and seasonal credit (for predictable seasonal needs like agricultural lending, priced as the average of the fed funds rate and the 90-day CD rate). FHLB advances come from the Federal Home Loan Bank system, created in 1932 during a wave of deposit runs specifically to keep mortgage lenders funded; loans are collateralized by home mortgages, typically longer-term and below-market-priced, and if the borrowing bank fails, the FHLB is first in line to be repaid — ahead of even the FDIC. Negotiable (jumbo) CDs are $100,000+ (usually traded in $1 million+ units), come in four types — domestic (U.S. bank, issued domestically), dollar-denominated/Euro CDs (issued by non-U.S. banks), Yankee CDs (foreign bank issuing through a U.S. branch), and thrift CDs (issued by nonbank thrifts) — and unlike a retail CD, can be resold before maturity in a secondary market. Eurocurrency deposits (Eurodollar deposits are the USD-denominated version) are deposits at banks located outside the depositor's home country, developed in Western Europe in the 1950s; when a non-U.S. branch lends dollars back to its U.S. head office, that shows up on the bank's books as 'liabilities to foreign branches.' Commercial paper is unsecured, discount-issued short-term debt (a few days up to 270 days) used by large companies — 'industrial paper' finances working capital like inventory, while 'finance paper' is issued by finance companies such as GE Capital. Long-term nondeposit debt (mortgages, capital notes, unsecured debentures, typically 5–12 years) is really more a source of secondary capital than day-to-day funding.",
      pitfall: "Negotiable (jumbo) CDs are LEGALLY classified as deposits, but they FUNCTIONALLY behave like fed funds and repos — a short-term money-market instrument developed to compete with commercial paper — not like a retail savings account. Also: smaller institutions often can't access negotiable CDs or the Eurodollar market at all, because those markets trade in $1 million+ units; smaller banks lean on the discount window and fed funds instead, which are available in smaller sizes.",
      related: [],
      memory: "Fed funds = cheapest & fastest but volatile; repos = collateralized version of fed funds; discount window = Fed backstop, three tiers by cost (primary < seasonal < secondary); FHLB = stable, mortgage-collateralized, senior even to the FDIC; jumbo CDs = legally a deposit, acts like a money-market instrument; Eurocurrency = USD deposits held offshore; commercial paper = discount-issued corporate IOU, max 270 days."
    },
    {
      name: "Available funds gap (AFG)",
      def: "The difference between the current and projected inflows and outflows of bank funds: (current + projected loans and other investments) − (current + expected deposit inflows and other available funds). If deposits fall short of loan demand, security purchases, and expected withdrawals, this gap is exactly how much the bank needs to borrow in nondeposit markets.",
      intuition: "Think of the AFG as a simple two-sided ledger: one side is everything the bank plans to fund (new loans, new securities, and drawdowns on lines of credit customers already have), the other side is everything the bank expects to have on hand to fund it with (new deposit inflows and other available funds, net of any anticipated large withdrawals). Whatever's left uncovered on the funding side is the number the treasurer takes to the fed funds desk, the repo desk, or the CD market.",
      example: "Barbara Friedman, an asset-liability committee member, needs the coming week's AFG. The bank expects $60 million in new loans and $10 million in additional drawdowns on existing credit lines (both add to funding needs), $15 million in new deposits, but also expects two of its largest customers to withdraw $1 million each — reducing the deposits actually available by $2 million. AFG = ($60M + $10M) − ($15M − $2M) = $70M − $13M = $57 million. Banks often pad this number with a safety margin (e.g., +10%) to cover the risk that loan demand comes in stronger than expected or new deposits fall short.",
      pitfall: "Choice among the nondeposit sources used to cover the AFG is not just about which is cheapest — it depends jointly on relative cost, risk (interest rate risk and credit/funding availability risk), the maturity actually needed, the size of the institution (smaller banks can't access $1 million-denominated CD and Eurodollar markets), and regulatory requirements (e.g., negotiable CDs must have at least a seven-day minimum maturity).",
      related: []
    },
    {
      name: "Factors affecting choice among nondeposit sources",
      def: "Five considerations that determine which nondeposit source a bank actually uses to cover a given funding need: relative cost, risk, required maturity, institution size, and regulatory requirements.",
      intuition: "None of these operates alone — a source can be the cheapest on paper and still be the wrong choice if the bank is too small to access it, needs the money for longer than that source typically offers, or is willing to accept more interest rate risk than that source carries.",
      example: "Cost: fed funds are generally the cheapest short-term source; domestic CDs and Eurocurrency deposits cost a bit more; commercial paper is generally priciest, depending on maturity. Risk: interest rate risk is highest on the shortest-maturity sources (fed funds rates can swing intraday, especially on the day banks must settle reserve requirements), while credit availability risk (whether the source stays open to you) hits CD, Eurodollar, and commercial paper markets hardest — fed funds tend to be the most reliably available. Maturity: fed funds are available almost instantly for overnight or short-term needs; long-term debt and, at times, commercial paper are not immediately available, so a bank funding fixed-rate mortgages needs a longer-maturity source than one just covering an overnight reserve shortfall. Size: negotiable CDs and Eurodollar deposits trade in units of $1 million or more, so smaller banks are effectively locked out and rely on the discount window or fed funds instead; investors themselves also prefer negotiable CDs issued by large money-center banks because there's an active secondary market for prime-rated paper. Regulation: rules can set minimum maturities (e.g., seven days for CDs), cap how much or how often an institution may borrow from a given source, or restrict use of the funds — and regulators can tighten these at times of financial stress (as the Fed did with reserve requirements on fed funds, repos, and commercial paper in the tight-money era of the late 1960s/early 1970s).",
      pitfall: "Palm Air Bank and Trust, a medium-sized bank, needs $850,000 immediately. Commercial paper, negotiable CDs, and Eurodollar deposits are all wrong here — not because they're expensive, but because (1) a medium bank may lack access to them, (2) they trade in $1 million+ units, far more than the $850,000 needed, and (3) the funds are needed right away, which rules out anything that isn't instantly available. Fed funds borrowing is the correct answer on all three counts simultaneously.",
      related: []
    },
    {
      name: "Two ways to estimate overall funding cost",
      def: "Historical average cost approach: backward-looking — the cost of all funding the institution has raised to date, combining interest costs, noninterest costs, and the shareholders' required rate of return, to produce a breakeven cost rate the bank must earn on earning assets. Pooled funds approach: forward-looking — the minimum return the bank must earn on new loans/securities to cover the cost of all new funds it is about to raise (new deposits + new nondeposit funds + new equity), producing a hurdle rate.",
      intuition: "Historical average cost answers 'what has all our funding, taken together, actually cost us so far?' — useful for understanding overall profitability and setting a baseline, but backward-looking. Pooled funds answers 'what must the next dollar of lending earn to cover the next dollar of funding?' — the number that actually matters when pricing a brand-new loan, because past funding costs are sunk and don't change based on how you price new business today.",
      example: "Historical average cost (Orange Tree Bank): the bank has $1 billion total assets, $800 million earning assets, $100 million equity capital, an after-tax required shareholder return of 12%, a 20% tax rate, and $11 million in noninterest expenses (salaries, overhead). Working through its table of historical funding costs — weighted average interest expense, plus noninterest costs (the breakeven cost rate: the minimum the bank must earn on earning assets just to cover the cost of the money it has borrowed, before shareholders get anything), plus the required return on the $100 million of shareholder equity — the bank arrives at a weighted average cost of funds of 6.35%: the minimum it must be earning on its earning assets today to cover both its existing funding costs and its equity holders' required return. Pooled funds (also Orange Tree Bank, forward-looking): the bank expects to raise $270 million in new deposit and nondeposit funds, forecasts $22.60 million in total expected operating (interest + overhead) expenses on that new funding, and expects only $221 million of the $270 million raised to actually land in earning assets (the rest funds reserves and other nonearning uses). Pooled funds expense = $22.60M / $270M = 8.37%; hurdle rate over earning assets = $22.60M / $221M = 10.23% — the bank must earn at least 10.23% pretax on every new loan/security it funds this way.",
      pitfall: "A bank deciding whether — and at what rate — to make a NEW loan should use the POOLED FUNDS (forward-looking) approach, not historical average cost. Historical average cost reflects the sunk cost of funding already raised; it tells you nothing about what the specific new money funding this specific new loan will cost, which is the only number relevant to a forward-looking pricing decision.",
      related: [],
      memory: "Historical average: what did it cost us so far? Pooled funds: what must new business earn to cover new funding costs?"
    }
  ],

  connections: {
    from: [
      { r: 74, why: "Deposit pricing and nondeposit liability management are the two complementary halves of the bank's funding side." }
    ],
    to: [
      { r: 76, why: "Repurchase agreements, one of the nondeposit sources named here, get their own full mechanical treatment." }
    ],
    confused: [
      { what: "Historical average cost vs pooled funds approach", how: "Historical average is BACKWARD-looking (sunk costs of existing funding); pooled funds is FORWARD-looking (minimum return needed on new business to cover new funding costs) — use pooled funds for forward decisions like new loan pricing." }
    ]
  },

  misconceptions: [
    { wrong: "\"Negotiable (jumbo) CDs are functionally identical to retail deposits in how they behave in the market.\"", right: "They are LEGALLY deposits but FUNCTIONALLY behave like money-market instruments — a nuanced classification that matters for how they should be analyzed." },
    { wrong: "\"A bank should use historical average funding cost when pricing a new loan.\"", right: "A bank should use the POOLED FUNDS (forward-looking) approach for pricing NEW loans — historical average cost reflects sunk costs of past funding, irrelevant to the forward-looking economics of a new lending decision." }
  ],

  highYield: [
    { stars: 3, what: "Historical average cost (backward-looking) vs. pooled funds (forward-looking) — which to use for new lending decisions.", why: "A precise, frequently tested distinction with a clear correct-use-case answer." },
    { stars: 3, what: "Available funds gap formula and being able to sort inflows/outflows into the right side of the ledger (drawdowns and withdrawals in particular).", why: "A direct, simple calculation worth quick fluency; the exam likes to bury a withdrawal or drawdown figure in a word problem to test whether you place it correctly." },
    { stars: 2, what: "Nondeposit funding source list and the jumbo CD legal-vs-functional classification nuance.", why: "Supporting vocabulary, occasionally tested." },
    { stars: 2, what: "The five factors affecting choice among nondeposit sources (cost, risk, maturity, size, regulation), especially the size constraint on negotiable CDs/Eurodollar markets.", why: "Frequently tested through scenario questions like a medium-sized bank needing a small amount immediately." },
    { stars: 1, what: "Discount window's three credit tiers (primary < seasonal < secondary) and FHLB's seniority over even the FDIC.", why: "Lower-frequency but occasionally shows up as a distractor-elimination fact." }
  ],

  recall: [
    { q: "A bank is deciding what interest rate to charge on a new batch of commercial loans. Should it reference historical average funding cost or the pooled funds approach, and why?", a: "Pooled funds — this forward-looking approach calculates the minimum return the bank must earn on NEW loans/securities to cover the cost of all NEW funds being raised (deposits + nondeposit + equity). Historical average cost reflects the sunk cost of funding already raised, which is irrelevant to correctly pricing new, forward-looking lending decisions." },
    { q: "A bank projects $500M in loans/investments and expects $420M in available deposits and other funds. What is its available funds gap, and what does this imply?", a: "Available funds gap = $500M − $420M = $80M. This positive gap implies the bank needs to raise $80M through nondeposit funding sources (fed funds, repos, FHLB advances, CDs, etc.) to cover its projected loan/investment growth." }
  ],

  hooks: [
    { title: "Sunk cost vs. the road ahead", text: "Historical average cost looks in the rearview mirror — useful for understanding the past, useless for pricing what's next. Pooled funds looks through the windshield — what do NEW funds cost, and what must NEW business earn to cover them?" }
  ],

  eli5: `<p>Imagine you run a lemonade stand and your allowance (deposits) usually covers your lemon and sugar costs, but this week a big order came in and your allowance alone won't cover it. You have a few ways to get the extra cash fast: borrow $5 from your sibling for one day and pay it back tomorrow (fed funds — cheap, instant, but they might ask for it back at an inconvenient moment), pawn your bike overnight and buy it back tomorrow for a bit more than you sold it for (a repo — you gave up something valuable as collateral so the lender isn't worried about not getting paid), ask your parents for an emergency loan that they only give out reluctantly and at a slightly annoying rate (the discount window — a backstop, not your go-to), or promise a family friend you'll pay them back in 90 days with interest for a bigger sum (a jumbo CD or commercial paper — bigger amount, longer commitment, costs more but is more dependable). Whichever you pick, you first have to figure out exactly how short you are — that's the available funds gap: what you need to spend, minus what you actually have coming in. In finance terms: your allowance is deposits, your borrowing options are the different nondeposit funding sources (fed funds, repos, the discount window, jumbo CDs, and so on), and the gap calculation is the available funds gap (AFG) that tells a bank treasurer exactly how much to go raise.</p>`,

  thinkLike: `<p>A bank treasurer or ALCO (asset-liability committee) member doesn't ask "which nondeposit source is cheapest?" in isolation — they ask "given the size of this gap, how soon I need it, how long I need it for, and whether my bank is even big enough to access this market, which source clears all four hurdles at once?" That's why the exam loves scenario questions: a medium-sized bank needing $850,000 immediately should reach for fed funds, not commercial paper or negotiable CDs, even though those might carry similar rates — the bank may be locked out of those markets entirely (they trade in $1 million+ units) and, more fundamentally, they aren't available on an "immediate" timeline the way fed funds are.</p><p>On the cost-estimation side, think like a pricing committee: historical average cost tells you whether the bank as a whole is profitable given what it has already borrowed, but it is the wrong tool for a single forward decision — like whether to approve a specific new loan — because that decision only cares about the cost of the specific new money funding it. The examiner tests this by dressing up a "what rate should we charge on this new loan" question and hoping you reach for the comfortable, familiar historical average number instead of the pooled funds hurdle rate. Also expect the AFG formula tested as a word problem where the trap is misclassifying an item: credit-line drawdowns and new loans both go on the "funding needed" side, while both new deposits AND unexpected withdrawals affect the "funds available" side (withdrawals reduce it) — miscategorize one number and the whole answer flips.</p>`,

  breakdown: [
    {
      title: "The eight nondeposit funding sources",
      points: [
        "Fed funds — short-term (often overnight) interbank borrowing settled via reserve accounts at the Fed; cheapest and fastest, but rates can be volatile, especially on reserve-settlement days.",
        "Repurchase agreements (repos) — collateralized short-term borrowing: sell high-quality securities now (starting leg), buy them back later at a preset price (closing leg); collateral lowers the lender's credit risk.",
        "Discount window borrowing — a short-term Fed loan backed by acceptable collateral (Treasury/agency securities); a regulatory backstop, not a routine funding source.",
        "FHLB advances — loans from the Federal Home Loan Bank system, historically mortgage-collateralized, stable and often below-market, senior to nearly all other claims (even the FDIC) if the borrower fails.",
        "Negotiable (jumbo) CDs — $100,000+ (often traded in $1M+ units); legally a deposit, functionally a money-market instrument; resalable before maturity unlike retail CDs.",
        "Eurocurrency deposits — deposits held at banks outside the depositor's home country; Eurodollar deposits are the USD-denominated version, developed in Western Europe in the 1950s.",
        "Commercial paper — unsecured, discount-issued short-term corporate debt, days up to 270 days; industrial paper funds working capital, finance paper is issued by finance companies.",
        "Long-term nondeposit debt — mortgages, capital notes, unsecured debentures (typically 5–12 years); functions more as secondary capital than as day-to-day funding."
      ]
    },
    {
      title: "The discount window's three credit tiers",
      points: [
        "Primary credit — short-term, usually overnight, priced slightly above the target fed funds rate; for healthy, well-capitalized institutions.",
        "Secondary credit — priced higher (up to 150 basis points above fed funds); for institutions that don't qualify for primary credit.",
        "Seasonal credit — longer maturities for predictable seasonal needs (e.g., agricultural lending for planting season); priced as the average of the fed funds rate and the 90-day CD rate."
      ]
    },
    {
      title: "The four types of negotiable CDs",
      points: [
        "Domestic CDs — issued by U.S. institutions inside the United States.",
        "Dollar-denominated (Euro) CDs — dollar-denominated CDs issued by banks outside the United States.",
        "Yankee CDs — CDs issued by foreign banks through their U.S. branches.",
        "Thrift CDs — issued by nonbank thrift institutions."
      ]
    },
    {
      title: "The five factors affecting choice among nondeposit sources",
      points: [
        "Relative cost — fed funds are usually cheapest; domestic CDs and Eurocurrency deposits cost a bit more; commercial paper is generally priciest, maturity-dependent.",
        "Risk — interest rate risk is highest on the shortest-maturity sources (fed funds); credit/availability risk (can you get the funds when you need them) hits CD, Eurodollar, and commercial paper markets hardest.",
        "Maturity — fed funds are available almost instantly; long-term debt and sometimes commercial paper are not immediately available, so the funding need's required duration narrows the choice.",
        "Institution size — negotiable CDs and Eurodollar deposits trade in $1M+ units, effectively excluding smaller banks, which lean on the discount window or fed funds instead.",
        "Regulatory requirements — rules can set minimum maturities (e.g., 7-day minimum on CDs), cap borrowing amounts/frequency, or restrict use of proceeds, and can tighten during periods of financial stress."
      ]
    },
    {
      title: "The two ways to estimate overall funding cost",
      points: [
        "Historical average cost approach — backward-looking; averages interest and noninterest costs of all funding raised to date, plus shareholders' required return, into a single weighted average cost of funds (breakeven cost rate before considering equity's required return).",
        "Pooled funds approach — forward-looking; divides total expected operating costs of NEW funds by (a) all new funds raised, to get the pooled funds expense rate, and by (b) only the dollars actually invested in earning assets, to get the hurdle rate — the true minimum return new business must earn."
      ]
    }
  ],

  quiz: [
    {
      q: "Which two nondeposit funding sources both require the borrower to post collateral?",
      options: ["Fed funds and commercial paper", "Commercial paper and discount window borrowing", "Fed funds and repurchase agreements", "Discount window borrowing and repurchase agreements"],
      answer: 3,
      why: "Repos are collateralized by construction (securities are sold and later repurchased), and the Fed requires acceptable collateral (Treasury or agency securities) for discount window loans. Fed funds and commercial paper are both unsecured — the tempting trap is picking fed funds since it's the 'safest-sounding' source, but safety here comes from the interbank relationship, not collateral."
    },
    {
      q: "Which nondeposit funding source was created specifically to provide liquidity to mortgage lenders and gives the lender seniority over even the FDIC if the borrowing bank fails?",
      options: ["Fed funds", "Repurchase agreements", "Federal Home Loan Bank (FHLB) advances", "Discount window borrowing"],
      answer: 2,
      why: "The FHLB system was created in 1932, during a wave of deposit runs, specifically to keep mortgage lenders funded, and FHLB claims rank ahead of even the FDIC on a failed borrower's assets. Discount window borrowing is a tempting distractor because it's also Fed-related, but it isn't mortgage-focused and doesn't carry that same super-senior claim."
    },
    {
      q: "A bank expects $60 million in new loans and $10 million in additional credit-line drawdowns next week. It expects $15 million in new deposits, but also expects two large customers to withdraw $1 million each. What is the available funds gap for the week?",
      options: ["$43 million", "$45 million", "$53 million", "$57 million"],
      answer: 3,
      why: "AFG = (loans + drawdowns) − (new deposits − withdrawals) = ($60M + $10M) − ($15M − $2M) = $70M − $13M = $57M. The most common error is forgetting to subtract the $2M in withdrawals from the deposit side (giving $55M, close to but not matching any correct pairing) or adding the withdrawals to the funding-needed side instead of subtracting them from funds-available, which is a sign-of-the-term mistake examiners specifically test for."
    },
    {
      q: "A bank is pricing a brand-new batch of commercial loans. Which approach to estimating funding cost should it reference to set the interest rate?",
      options: ["Historical average cost approach, because it reflects the bank's actual track record", "Pooled funds approach, because it reflects the minimum return needed to cover the cost of the new funds financing these specific loans", "Whichever approach produces the lower rate, to stay price-competitive", "Neither — loan pricing is set independently of funding cost"],
      answer: 1,
      why: "The pooled funds approach is forward-looking: it computes the hurdle rate new earning assets must clear to cover the cost of the new funds raised to finance them, which is exactly the decision at hand. Historical average cost is a tempting distractor because it sounds authoritative ('our actual track record'), but it reflects the sunk cost of funding already raised — irrelevant to pricing a new, forward-looking loan."
    },
    {
      q: "A bank issues a $2 million negotiable CD at a 5% fixed rate for 180 days. Using the standard negotiable CD interest cost convention, what is the dollar interest cost?",
      options: ["$50,000", "$49,315", "$100,000", "$25,000"],
      answer: 0,
      why: "Interest cost = principal × rate × (days/360) = $2,000,000 × 0.05 × (180/360) = $50,000. The $49,315 distractor comes from mistakenly using a 365-day year (a common convention elsewhere in finance, but not for repos or negotiable CDs, which use 360 days) — $2,000,000 × 0.05 × (180/365) ≈ $49,315."
    },
    {
      q: "Kris Gaines, treasurer at a medium-sized bank, needs to cover an $850,000 funding gap immediately. Why is federal funds borrowing the best choice here, rather than commercial paper, negotiable CDs, or Eurodollar deposits?",
      options: [
        "Fed funds always carry the lowest interest rate of any nondeposit source, regardless of situation",
        "Commercial paper, negotiable CDs, and Eurodollar deposits are all illegal for medium-sized banks to use",
        "A medium-sized bank may lack access to those markets, they typically trade in $1 million+ units (more than the amount needed), and fed funds are available immediately, unlike the alternatives",
        "Fed funds are the only nondeposit source that does not require any collateral or documentation"
      ],
      answer: 2,
      why: "This is a size-times-maturity-times-immediacy question: the bank may not have market access to the $1M+-unit CD/Eurodollar/commercial paper markets, the amount needed ($850,000) doesn't even fit those units well, and the funds are needed right away, which fed funds satisfy and the others generally don't. The 'fed funds always carry the lowest rate' answer is false — fed funds aren't always cheapest, just usually cheap and fast; the 'those markets are illegal for medium-sized banks' answer is false — those markets are legal, just often inaccessible to smaller players; the 'fed funds require no collateral or documentation' answer is false — lack of a collateral requirement isn't the deciding factor in this scenario."
    }
  ],

  sources: [
    { title: "Federal Home Loan Banks — overview", url: "https://en.wikipedia.org/wiki/Federal_Home_Loan_Banks", note: "Background on the FHLB system's 1932 origin, structure, and role as a stable, senior-secured funding source for member banks." },
    { title: "Federal funds", url: "https://en.wikipedia.org/wiki/Federal_funds", note: "Explains the fed funds market mechanics — overnight interbank lending settled through reserve balances at the Federal Reserve." },
    { title: "Discount window", url: "https://www.federalreserve.gov/regreform/discount-window.htm", note: "The Federal Reserve's own explanation of primary, secondary, and seasonal credit at the discount window." },
    { title: "Eurodollar", url: "https://en.wikipedia.org/wiki/Eurodollar", note: "Covers Eurocurrency/Eurodollar deposit mechanics and their development in 1950s Western Europe." }
  ],

  pdf: { book: 4, query: "Financial institutions borrow in money and capital markets to cover funding gaps" },

  summary: `<p><strong>Nondeposit sources</strong>: fed funds, repos, discount window, FHLB advances, negotiable (jumbo) CDs (legally deposits, functionally money-market instruments), Eurocurrency deposits, commercial paper, long-term nondeposit debt. <strong>Available funds gap</strong> = projected loans/investments − projected deposits/available funds; choice among sources depends on cost, risk, maturity, regulation. <strong>Funding cost estimation</strong>: historical average cost (backward-looking, sunk) vs. pooled funds (forward-looking, minimum return needed on new business) — use pooled funds for new lending decisions.</p>`
});
