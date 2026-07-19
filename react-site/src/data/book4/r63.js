export default ({
  book: 4, reading: 63,
  session: "Liquidity Risk Management",
  title: "Liquidity Risk",
  tagline: "Opens the book with the two faces of liquidity risk everything else builds on: can I exit this position without moving the price against myself, and can I roll my financing before it comes due?",

  teaches: `<p>The LVaR formula machinery (normal and stressed cost of liquidation), six sources of funding liquidity, three unforgettable case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft), Basel III liquidity ratios plus the 17 BIS principles behind them, and liquidity black holes driven by positive feedback trading.</p>`,

  why: `<p>Every other reading in Book 4 is an elaboration of the split introduced here: transactions (market) liquidity risk vs. funding liquidity risk. The three case studies teach the book's most important lesson — an economically sound position can still bankrupt you on a cash-timing mismatch.</p>`,

  intuition: `<p>Start with the difference the reading insists you never blur: <strong>solvency</strong> is a balance-sheet snapshot — assets exceed liabilities, so equity is positive. <strong>Liquidity</strong> is a timing question — can you actually produce cash, right now, to meet an obligation that is due today? A firm can be fully solvent (own more than it owes, on paper) and still fail, because the assets it owns cannot be turned into cash fast enough to meet a payment due this afternoon. That gap between "solvent" and "liquid" is the entire subject of this reading.</p>
  <p>Cost of liquidation in normal markets is just half the bid-ask spread times position value: if a market maker will buy from you at the (lower) <strong>bid</strong> and sell to you at the (higher) <strong>offer</strong>, the midpoint between them is the "fair" mid-market price, and the spread is the toll you pay to trade immediately rather than wait for a better price. In STRESSED markets, that spread itself widens and becomes uncertain — dealers demand more compensation for holding inventory when nobody knows where prices are headed — so stressed cost uses the spread's mean PLUS a confidence-multiple of its standard deviation, producing a cost that in the reading's own example comes out roughly 3.7× the normal-market figure. LVaR = ordinary VaR + this liquidation cost — a risk number that acknowledges you might not get to exit at the mid-price.</p>
  <p>The three case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft) all teach the SAME lesson despite completely different mechanisms: the hedge or asset can be economically sound — even profitable on paper — and still bankrupt you on a cash-timing mismatch. Margin calls are due in cash, now, regardless of whether the underlying position is "right."</p>`,

  eli5: `<p>Imagine you own a house worth $500,000 outright (no mortgage) but your only savings account has $200 in it, and tomorrow your kid's tuition bill for $5,000 is due. You are unquestionably wealthy — your assets far exceed anything you owe — but you cannot pay the bill tomorrow unless you sell the house fast, and selling a house fast (this week, not this year) usually means accepting a lower price than if you had months to find the right buyer. That gap — rich on paper, unable to produce cash on time — is exactly the difference between <strong>solvency</strong> (your net worth is positive) and <strong>liquidity</strong> (you can convert assets into cash, on schedule, without a big price hit). Banks and trading firms hit this same wall: Northern Rock, Ashanti Goldfields, and Metallgesellschaft were all arguably "fine" on their underlying economics, but each one needed cash faster than its assets could be turned into cash without a painful discount, and that timing gap is what took them down.</p>`,

  thinkLike: `<p>A risk manager reading this chapter is building two separate mental dashboards that must be checked constantly, not just at quarter-end. Dashboard one, <em>transactions liquidity</em>: if I had to exit this position today, how much would the bid-offer spread cost me, and how much worse does that number get if markets are stressed rather than calm? This is why LVaR exists — a plain VaR number pretends you can always trade at the mid-price, and that pretense is most dangerous exactly when you need to sell, i.e., during a crisis. Dashboard two, <em>funding liquidity</em>: of my six sources of funding (cash/treasuries, deposits, trading-book liquidation, securitization, borrowing, central bank access), which ones are actually reliable under stress, and which ones — like deposits or securitization — quietly evaporate at the worst possible moment? The examiner tests this reading in three predictable ways: (1) plug-and-chug the normal and stressed cost-of-liquidation formulas with a two-asset example structurally identical to the reading's worked example (change the bid/offer numbers, keep the mechanics); (2) match a one-line case description ("gold miner short forwards, central banks curb gold sales") to the correct case study and its lesson; (3) test the counter-intuitive facts — deposits are LESS stable than intuition suggests, and uniform regulation across institution types can CREATE instability rather than prevent it. Internalize the single sentence that ties the whole reading together: paper soundness does not pay cash bills.</p>`,

  visual: `<div class="widget" data-widget="lvar"></div>`,

  formulas: [
    {
      name: "Cost of liquidation (normal markets)",
      math: "\\text{cost} = \\sum_i \\dfrac{\\alpha_i\\, s_i}{2}",
      note: "s = spread/mid-price. 2M ABC shares + 500K XYZ shares example → cost ≈ $1,874,961.",
      plain: "This says: for each position, take its dollar value times its proportional bid-offer spread, cut that in half, and add the pieces up — that half-spread times value is the cash toll you pay to unwind the position in a calm, orderly market.",
      derivation: `<p>Start from the dollar bid-offer spread on one asset, \\(p = \\text{offer} - \\text{bid}\\), and its mid-market price \\(\\text{mid} = \\dfrac{\\text{bid} + \\text{offer}}{2}\\). The proportional spread is \\(s_i = \\dfrac{p_i}{\\text{mid}_i}\\) — the spread expressed as a fraction of fair value rather than a dollar amount, so positions of different sizes and prices can be compared on the same scale.</p>
      <p>If \\(\\alpha_i\\) is the mid-market dollar value of position \\(i\\) (price times quantity), then trading the full position from mid-market down to the bid (a sale) or up to the offer (a purchase) costs \\(\\alpha_i \\times s_i\\) in the worst case of trading the whole size at once. The reading treats the realistic cost of an orderly unwind as half of that full round-trip cost — \\(\\dfrac{\\alpha_i s_i}{2}\\) — and sums this across all \\(n\\) positions in the book: \\[\\text{cost} = \\sum_{i=1}^{n} \\dfrac{\\alpha_i\\, s_i}{2}\\] Worked example: ABC — 2{,}000{,}000 shares, bid \\$25.50, offer \\$27.00 \\(\\Rightarrow\\) mid \\(=\\$26.25\\), value \\(\\alpha=\\$52{,}500{,}000\\), \\(s = 1.50/26.25 = 5.714\\%\\). XYZ — 500{,}000 shares, bid \\$45.00, offer \\$46.50 \\(\\Rightarrow\\) mid \\(=\\$45.75\\), value \\(\\alpha=\\$22{,}875{,}000\\), \\(s = 1.50/45.75 = 3.279\\%\\). \\[\\text{cost} = \\dfrac{52{,}500{,}000 \\times 0.05714}{2} + \\dfrac{22{,}875{,}000 \\times 0.03279}{2} = \\$1{,}874{,}961\\]</p>`
    },
    {
      name: "Stressed cost of liquidation",
      math: "\\text{cost}_{\\text{stressed}} = \\sum_i \\dfrac{\\alpha_i\\,[\\mu_i + \\gamma\\sigma_i]}{2}",
      note: "\\(\\gamma\\) = confidence z-score. Same position at 95% confidence → $7,015,577, ≈3.7× the normal-market cost.",
      plain: "This says: instead of using a single fixed spread, model the spread itself as uncertain — use its historical mean plus a confidence-level multiple of its standard deviation — because in a stressed market the spread doesn't just widen on average, it becomes genuinely unpredictable, and you want to price for a bad (wide-spread) outcome, not the average one.",
      derivation: `<p>Replace the fixed proportional spread \\(s_i\\) with a random variable that has mean \\(\\mu_i\\) and standard deviation \\(\\sigma_i\\) (both expressed as a proportion of mid-market price). To capture a bad-case (not average-case) outcome at some confidence level, add \\(\\gamma\\) standard deviations to the mean, where \\(\\gamma\\) is the one-tailed z-score for the chosen confidence (e.g. \\(\\gamma = 1.645\\) at 95%): \\[\\text{cost}_{\\text{stressed}} = \\sum_{i=1}^{n} \\dfrac{\\alpha_i\\,[\\mu_i + \\gamma\\sigma_i]}{2}\\] Worked example (same ABC/XYZ positions, mean spread \\$1.50 and SD \\$2.50 for both, 95% confidence \\(\\gamma=1.645\\)): ABC — \\(\\mu = 1.50/26.25 = 5.714\\%\\), \\(\\sigma = 2.50/26.25 = 9.524\\%\\). XYZ — \\(\\mu = 1.50/45.75 = 3.279\\%\\), \\(\\sigma = 2.50/45.75 = 5.464\\%\\). \\[\\text{cost}_{\\text{stressed}} = \\dfrac{52{,}500{,}000\\,[0.05714 + 1.645(0.09524)]}{2} + \\dfrac{22{,}875{,}000\\,[0.03279 + 1.645(0.05464)]}{2} = \\$7{,}015{,}577\\] That is roughly 3.7× the \\$1{,}874{,}961 normal-market figure — the jump comes mostly from the \\(\\gamma\\sigma\\) term, since the standard deviation of the spread is larger than the mean spread itself, and the confidence multiplier amplifies that volatility rather than just nudging the average up.</p>`
    },
    {
      name: "Liquidity-adjusted VaR",
      math: "\\text{LVaR} = \\text{VaR} + \\text{Cost of liquidation (normal or stressed)}",
      note: "Quick unwind: less market-risk exposure, more spread-widening exposure. Slow unwind: the reverse.",
      plain: "This says: your true risk isn't just the standard VaR from price moves — it's that number plus whatever it costs you, via the bid-offer spread, to actually get out of the position, so LVaR is a more honest (larger) risk figure than plain VaR."
    }
  ],

  concepts: [
    {
      name: "Solvency vs. liquidity",
      def: "Solvency: equity is positive, i.e. assets exceed liabilities on the balance sheet — a snapshot measure of net worth. Liquidity: a firm's ability to meet its cash obligations as they come due — a timing measure of whether cash can be produced fast enough.",
      intuition: "A firm can be solvent (own more than it owes) and still be caught illiquid, because turning assets into cash on short notice — especially in a hurry, in a stressed market — usually costs more (a wider effective discount) than turning them into cash on a leisurely timeline.",
      example: "Northern Rock's mortgage book may have been worth more than its liabilities on paper, but a run on short-term deposits meant it could not produce cash fast enough — a liquidity failure layered on top of a possibly-solvent balance sheet.",
      pitfall: "Do not treat 'solvent' and 'liquid' as synonyms on the exam — a question can describe a firm with positive equity that still fails purely from a cash-timing mismatch.",
      related: ["Cost of liquidation — normal and stressed markets", "Three case studies"]
    },
    {
      name: "Bid-offer spread and cost of liquidation — normal and stressed markets",
      def: "Bid price: the (lower) price at which you can sell to a market maker. Offer (ask) price: the (higher) price at which you can buy from a market maker. Mid-market price: the halfway point between bid and offer, treated as the fair value. Normal: cost = \\(\\Sigma [\\alpha \\times s/2]\\) per position, where \\(s\\)=dollar spread/mid-price. Stressed: cost = \\(\\Sigma \\{\\alpha \\times [\\mu +\\gamma \\sigma ]/2\\}\\) per position, using the spread's mean, SD, and a confidence z-score.",
      intuition: "The spread exists because a market maker takes on inventory risk and faces adverse selection (some counterparties know more than the market maker does) every time they quote a two-sided price — the spread is their compensation for both. As order size grows past the market maker's comfortable size limit, the spread widens further to compensate for the bigger risk of being stuck holding (or short) a large position.",
      example: "2M shares ABC (bid $25.50, offer $27.00) + 500K shares XYZ (bid $45.00, offer $46.50): normal cost ≈ $1,874,961. Same positions at 95% confidence stressed: cost ≈ $7,015,577 — roughly 3.7× the normal-market cost.",
      pitfall: "Larger positions create more liquidity risk (the spread tends to widen for size), so setting trade-size limits and diversifying into more, smaller positions is a genuine risk-reduction tool, not just a diversification platitude.",
      related: ["Liquidity-adjusted VaR (LVaR)"]
    },
    {
      name: "Liquidity-adjusted VaR (LVaR)",
      def: "LVaR = VaR + Cost of liquidation (normal or stressed).",
      intuition: "Plain VaR silently assumes you can always exit at the mid-market price with no cost — LVaR corrects that assumption by adding back the toll you actually pay (the bid-offer-spread-based liquidation cost) to leave the position.",
      pitfall: "Trade-off in unwind speed: quick unwind → less market-risk (mid-price-moves-against-you) exposure but more spread-widening exposure; slow unwind → the reverse. Amihud's liquidity measure (2002) compares |daily return| to daily dollar volume — lower liquidity is empirically associated with HIGHER expected returns (illiquidity is compensated, i.e. investors demand a premium for holding hard-to-sell assets).",
      related: [{ r: 6, label: "R6 — exogenous/endogenous liquidity, the conceptual seed of LVaR" }],
      memory: "LVaR = ordinary VaR plus the toll you pay to actually get out the door."
    },
    {
      name: "Six sources of funding liquidity",
      def: "Cash and treasuries (safe but low-return — a genuine trade-off, not free liquidity); retail/wholesale deposits (both surprisingly UNSTABLE — customers can easily rate-shop across institutions, and tight liquidity conditions tend to hit the whole market, not just one bank); trading book liquidation (works less well precisely when markets are stressed, since that is exactly when the book is hardest to sell without a discount); securitization (pooling loans/debts owed to the institution and selling their cash flows as securities to investors — the 'originate to distribute' model — which dried up almost overnight in the 2007 subprime crisis); borrowing ability (rates and tenors worsen exactly when a firm needs funding most, though pre-arranged lines of credit can mitigate this); central bank borrowing (the 'lender of last resort' — European Central Bank, Bank of England, U.S. Federal Reserve — comes with collateral requirements, a relatively high interest rate, a haircut, and a negative signaling cost, so banks try to keep it quiet).",
      pitfall: "Retail/wholesale deposits are frequently assumed to be a 'stable' funding source because they're insured or long-relationship — but the reading is explicit that they've become LESS stable over time as depositors easily rate-shop across institutions.",
      related: [],
      memory: "The 'stable' sources (deposits) are actually the least reliably stable — a genuinely counter-intuitive, tested fact."
    },
    {
      name: "Three case studies",
      def: "Northern Rock (2007): a British bank heavily involved in mortgage lending, funded with short-term debt; when investors grew resistant to lending to banks after the subprime crisis hit, Northern Rock borrowed £3 billion from the Bank of England's Tripartite Authority — once the BBC broke the news of that emergency request, a visible bank run followed (£2 billion withdrawn in the next week); deposit guarantees slowed but didn't stop it, emergency borrowing reached £25 billion within six months, and the bank was ultimately nationalized. Ashanti Goldfields (1999): a West African gold mining company that had sold gold forwards (agreed to deliver gold at a fixed future price) to protect its shareholders against falling gold prices; a surprise announcement by 15 European central banks that they would limit gold sales for five years signaled a coming supply reduction, and gold prices jumped over 25%; the short forward positions triggered margin calls the company could not meet in cash — even though the company's actual gold reserves (the illiquid physical hedge) had risen in value, restructuring the hedges, selling a mine, and diluting equity followed. Metallgesellschaft (a German industrial conglomerate): sold large volumes of 5-to-10-year fixed-price supply contracts on heating oil and gasoline to customers at above-market prices, then hedged that exposure with long positions in short-dated oil futures; when oil prices fell, the futures leg required margin calls that drained cash, and management/banker concern over the cash outflows led the firm to drop its fixed-price contracts and unwind the futures hedge at a loss exceeding $1.3 billion.",
      pitfall: "All three share one lesson: the hedge or asset can be economically sound (or even profitable on paper) and still bankrupt you on a cash-timing mismatch — margin calls are due in cash, now, regardless of whether the underlying position is 'right.'",
      related: [{ r: 76, label: "R76 — Bear Stearns and Lehman, the same lesson in the 2008 repo context" }, { r: 80, label: "R80 — Harvard's endowment, the same lesson in illiquid portfolios" }],
      memory: "Right about the asset, dead anyway — the single most repeated lesson across this entire book."
    },
    {
      name: "Basel III liquidity ratios and the 17 BIS principles",
      def: "LCR = HQLA (high-quality liquid assets) / net cash outflows over 30 days ≥ 100% — the 30-day stress scenario embedded in the ratio assumes a 100% loss of wholesale funding, drawdowns on lines of credit, a partial loss of deposits, a three-notch credit-rating downgrade, and higher haircuts on secured funding. NSFR = available stable funding / required stable funding ≥ 100% — available stable funding applies a stability factor to each funding category, and required stable funding looks at how much funding on- and off-balance-sheet assets need.",
      example: "The 17 BIS principles span five buckets: (1) the fundamental principle — a comprehensive liquidity risk management framework plus supervisory oversight of it; (2) governance — risk tolerance aligned with the bank's role and strategy, board-approved policies with senior-management reporting, and liquidity costs/benefits priced into new products; (3) measurement/management — cash-flow projection, monitoring across business lines/entities/currencies, diversified funding sources, intraday positions, active collateral management, regular stress testing, a formal contingency funding plan (CFP), and a portfolio of unencumbered HQLA; (4) disclosure — public disclosure so the market can assess the bank's liquidity position; (5) supervisory responsibilities — assessing bank liquidity positions, using market/internal/prudential information, intervening on deficiencies, and communicating with other supervisors.",
      related: [{ r: 60, label: "R60 — the full LCR/NSFR mechanics and worked examples" }]
    },
    {
      name: "Liquidity black holes and positive feedback trading",
      def: "A liquidity black hole (also called a 'crowded exit') occurs when a market's liquidity dries up because nearly everyone wants to take the same side of a trade at once. Negative feedback traders (buy dips, sell rallies) stabilize markets and dominate when liquidity is healthy. Positive feedback traders (buy as prices rise, sell as they fall) destabilize markets when they dominate, since their trading reinforces rather than dampens the prevailing move.",
      example: "Causes of positive feedback trading: stop-loss rules (mechanically sell once price breaches a trigger level); trend/breakout trading (buy as price trends up or breaks out of a range, sell on the way down); predatory trading (traders who learn a large liquidation is coming take positions to profit from the expected price move, worsening it); delta-hedging large short option positions (a dealer short a call must buy the underlying as its price rises, and short it as price falls — reinforcing the move, in contrast to dynamic hedging of a long option position, which trades against the trend); and unmet margin calls forcing liquidation into an already-falling market. Black Monday (Oct 19, 1987): portfolio insurance programs constructed synthetic put options on portfolios worth over $60 billion by mechanically buying as the market rose and selling as it fell; over three days of decline (much of it Friday afternoon) the models called for $12 billion of selling but only $4 billion executed by Friday's close — the unexecuted backlog carried into Monday and compounded a roughly 10% crash. Long-Term Capital Management (LTCM, 1998) is a related example: short liquid bonds, long illiquid bonds betting the spread would converge; the Russian default widened the spread instead, and LTCM — already highly leveraged — could not meet margin calls, forcing a liquidation that widened the spread further.",
      pitfall: "Leveraging/deleveraging is a reinforcing loop: more credit → higher asset demand → higher prices → higher collateral value → more credit (and the reverse in deleveraging — this pattern is cited behind both the mid-1990s U.S. equity run-up ('irrational exuberance', Alan Greenspan's term) and the mid-2000s housing bubble). Uniform regulation across very different institution types (banks vs. pension funds vs. insurers) can ITSELF create black holes — everyone forced to react identically to the same shock at the same time; diversity of regulatory treatment is a STABILIZING feature, not a bug, since different institution types with different time horizons and risk profiles would otherwise act at different times.",
      related: [],
      memory: "Uniform rules for everyone sounds fair — but it means everyone sells at once. Diversity of rules is a stabilizer, not an inefficiency."
    }
  ],

  connections: {
    from: [
      { r: 6, why: "Exogenous/endogenous liquidity risk, introduced conceptually in Book 1, gets its full quantitative LVaR treatment here." }
    ],
    to: [
      { r: 64, why: "Leverage is the piece that makes liquidity risk genuinely dangerous — formalized next." },
      { r: 70, why: "Dealer bank failure mechanics are this reading's funding-liquidity-risk story, applied to a specific institution type." },
      { r: 60, why: "The LCR/NSFR ratios introduced here get their full worked-calculation treatment in Basel III (Book 3)." }
    ],
    confused: [
      { what: "Transactions (market) liquidity risk vs funding liquidity risk", how: "Transactions risk: can I exit this position without moving the price? Funding risk: can I roll my financing before it's due? Related but distinct — the whole book keeps re-splitting this pair." },
      { what: "Negative feedback vs positive feedback trading", how: "Negative feedback (buy dips, sell rallies) stabilizes; positive feedback (buy rising, sell falling) destabilizes and dominates during liquidity black holes." },
      { what: "Solvency vs liquidity", how: "Solvency is a balance-sheet snapshot (assets exceed liabilities). Liquidity is a timing question (can cash obligations be met as they come due). A firm can be solvent and still fail from illiquidity — that is the whole point of the three case studies." }
    ]
  },

  misconceptions: [
    { wrong: "\"Retail and wholesale deposits are inherently stable funding sources due to deposit insurance and long customer relationships.\"", right: "The reading is explicit that they've become LESS stable over time — depositors easily rate-shop across institutions, making deposits a surprisingly unstable funding source despite the intuitive 'sticky' assumption." },
    { wrong: "\"Uniform regulation across all financial institution types reduces systemic risk.\"", right: "Uniform regulation can itself CREATE liquidity black holes, since it forces very different institution types (banks, pension funds, insurers) to react identically to the same shock at the same time — diversity of regulatory treatment is a stabilizing feature." },
    { wrong: "\"An economically sound hedge or asset position protects you from a liquidity crisis.\"", right: "All three case studies (Northern Rock, Ashanti Goldfields, Metallgesellschaft) show that being right about an asset's long-run value provides no protection against a margin call or funding need due in cash, right now." },
    { wrong: "\"If a firm is solvent (assets exceed liabilities), it cannot fail.\"", right: "Solvency and liquidity are different questions. A solvent firm can still fail if it cannot convert assets into cash fast enough to meet an obligation due today — exactly what happened at Northern Rock." },
    { wrong: "\"Central bank borrowing is a cheap, easy backstop banks should use freely.\"", right: "Central bank borrowing carries a relatively high interest rate, a haircut on posted collateral, and a negative signaling cost to the market — banks try to keep it quiet precisely because it is expensive and reputationally risky, not a cheap first resort." }
  ],

  highYield: [
    { stars: 5, what: "LVaR formula (normal and stressed cost of liquidation) with full worked calculations.", why: "The signature formula of this reading and one of the most calculation-heavy in the book." },
    { stars: 5, what: "The three case studies' shared lesson: economically sound positions can still cause bankruptcy via cash-timing mismatch.", why: "The single most repeated thematic lesson across the entire book — recognize it in R76, R80 too." },
    { stars: 4, what: "Six sources of funding liquidity, especially deposits' surprising instability.", why: "A specific, frequently tested counter-intuitive fact." },
    { stars: 3, what: "Liquidity black holes: positive vs negative feedback trading, and regulatory uniformity as a destabilizer.", why: "A rich conceptual area connecting to 1987's crash and broader systemic risk themes." },
    { stars: 2, what: "Basel III LCR/NSFR ratios and the 17 BIS principles (five buckets).", why: "Tested mostly as recognition/matching here — the full worked-calculation treatment lives in R60." }
  ],

  recall: [
    { q: "Why is stressed-market liquidation cost roughly 3.7× the normal-market cost in the reading's worked example, rather than just modestly higher?", a: "Stressed cost uses the spread's mean PLUS a confidence-multiple \\((\\gamma \\times \\sigma )\\) of its standard deviation — under stress, spreads don't just have a higher average, they also become far more volatile/uncertain, and the confidence-adjustment term compounds this into a dramatically larger liquidation cost than simply scaling the normal-market mean spread." },
    { q: "Explain the shared lesson across Northern Rock, Ashanti Goldfields, and Metallgesellschaft despite their very different underlying positions.", a: "In each case, the underlying economic position (mortgage book, gold hedge, oil hedge) may have been sound or even eventually profitable — but a cash-timing mismatch (a funding run, an unexpected price spike triggering margin calls, falling prices triggering margin calls) forced action or collapse before the position's fundamental soundness could matter. Margin calls and funding withdrawals are due in cash, immediately, regardless of the position's paper value." },
    { q: "Why might uniform liquidity regulation across banks, pension funds, and insurers actually increase systemic risk rather than reduce it?", a: "If all institution types are forced to hold the same liquid assets or react identically to the same market shock, they all become forced sellers (or buyers) of the same assets at the same time — removing the diversity of behavior that would otherwise cushion a shock, since different institution types with different rules would naturally act at different times and in different ways." },
    { q: "Why can a firm be solvent and still fail from a liquidity problem?", a: "Solvency measures net worth (assets minus liabilities) at a point in time; liquidity measures whether cash obligations can be met on schedule. Converting assets to cash quickly — especially in a stressed market — usually requires accepting a price discount (the bid-offer spread widens), so a firm with genuinely positive net worth can still be unable to raise cash fast enough to pay a bill due today." }
  ],

  hooks: [
    { title: "The 3.7x reveal", text: "Normal cost to liquidate: manageable. Same position, stressed market: 3.7× the pain — because spreads don't just widen, they become genuinely uncertain, and LVaR has to price both effects." },
    { title: "Right about the asset, dead anyway", text: "Northern Rock, Ashanti Goldfields, Metallgesellschaft — three completely different businesses, one identical epitaph: 'the position was fine, the timing wasn't.'" },
    { title: "Sameness is the danger", text: "When every institution type follows the same rulebook, they all reach for the exit at the same moment — diversity of regulation is a shock absorber, not red tape." },
    { title: "Solvent is not the same as liquid", text: "Own a $500,000 house and $200 in the bank, with a $5,000 bill due tomorrow — you're wealthy on paper and broke by tomorrow morning. That's the whole reading in one sentence." }
  ],

  summary: `<p><strong>Solvency</strong> (assets exceed liabilities) is not the same as <strong>liquidity</strong> (cash obligations can be met as they come due) — a firm can be solvent and still fail from a cash-timing mismatch. <strong>LVaR</strong> = VaR + cost of liquidation; normal \\(\\text{cost}=\\sum_i \\dfrac{\\alpha_i s_i}{2}\\), stressed \\(\\text{cost}_{\\text{stressed}}=\\sum_i \\dfrac{\\alpha_i [\\mu_i +\\gamma \\sigma_i ]}{2}\\) (≈3.7× normal in the worked example). <strong>Six funding-liquidity sources</strong>: cash/treasuries, deposits (surprisingly unstable), trading book liquidation, securitization, borrowing ability, central bank borrowing. <strong>Three case studies</strong> (Northern Rock, Ashanti Goldfields, Metallgesellschaft): economically sound positions bankrupted by cash-timing mismatches — the book's central recurring lesson. <strong>Basel III</strong>: LCR=HQLA/30-day outflow≥100%, NSFR=ASF/RSF≥100%, backed by 17 BIS principles across five buckets. <strong>Liquidity black holes</strong>: positive feedback trading (stop-losses, delta-hedging, forced liquidation, 1987's portfolio insurance, LTCM's 1998 collapse) destabilizes; uniform regulation across institution types can itself create black holes — regulatory diversity stabilizes.</p>`,

  breakdown: [
    {
      title: "Six sources of funding liquidity",
      points: [
        "Cash and treasuries — safe, highly liquid, but low-yielding; a firm must balance liquidity against return.",
        "Retail and wholesale deposits — widely assumed stable, but actually unstable: customers rate-shop across institutions, and stress tends to hit the whole deposit market at once, not just one bank.",
        "Trading book liquidation — selling down the trading book for cash; works in calm markets but is compromised exactly when it's needed most, in stressed markets.",
        "Securitization — pooling illiquid loans/debts and selling their cash flows to investors (the 'originate to distribute' model); this source effectively vanished almost overnight in the 2007 subprime crisis.",
        "Borrowing ability — external lines of credit and market borrowing; rates rise and tenors shorten precisely when a firm most needs funding, though pre-arranged credit lines can soften this.",
        "Central bank borrowing — the lender of last resort (Fed, Bank of England, ECB); reliable but expensive: high interest rate, haircut on collateral, and a negative signal to the market, so banks try to keep it quiet."
      ]
    },
    {
      title: "Three funding-liquidity case studies",
      points: [
        "Northern Rock (2007) — funded long-term mortgages with short-term debt; a public emergency Bank of England borrowing request triggered a visible bank run (£2 billion withdrawn in a week); nationalized after emergency borrowing reached £25 billion.",
        "Ashanti Goldfields (1999) — short gold forwards hedging shareholders against falling gold prices; a surprise 15-central-bank gold-sale moratorium spiked gold prices over 25%; margin calls on the illiquid physical hedge couldn't be met in cash, forcing restructuring, a mine sale, and equity dilution.",
        "Metallgesellschaft — long near-dated oil futures hedging 5-to-10-year fixed-price supply contracts; falling oil prices triggered margin calls draining cash; management unwound the hedge and dropped the contracts at a loss exceeding $1.3 billion.",
        "Shared lesson across all three — the underlying position can be economically sound (or even eventually profitable) and still force bankruptcy or crisis action, because margin calls and withdrawals are due in cash immediately, not on the position's own timeline."
      ]
    },
    {
      title: "17 BIS principles for sound liquidity risk management (five buckets)",
      points: [
        "Fundamental principle — a comprehensive liquidity risk management framework with sufficient HQLA, overseen by supervisors.",
        "Governance (3 principles) — risk tolerance aligned to the bank's role/strategy; board-approved policies with ongoing senior-management reporting; liquidity costs/benefits priced into new products and performance measurement.",
        "Measurement and management (8 principles) — cash-flow projection; monitoring across business lines/entities/currencies; diversified funding sources and access-to-market capacity; intraday liquidity positions; active collateral management; regular stress testing; a formal contingency funding plan; and a portfolio of unencumbered HQLA.",
        "Disclosure (1 principle) — regular public disclosure so markets can assess the bank's liquidity position and framework.",
        "Supervisory responsibilities (4 principles) — comprehensive assessment of liquidity position/framework; use of market/internal/prudential information; intervention on deficiencies; regular communication with other supervisors."
      ]
    },
    {
      title: "Causes of positive feedback trading (destabilizing, drives liquidity black holes)",
      points: [
        "Stop-loss rules — mechanically sell once price falls below a trigger, accelerating a decline.",
        "Trend/breakout trading — buy as price trends up or breaks above a range, sell on the way down, reinforcing the move.",
        "Predatory trading — traders aware of an impending large liquidation trade ahead of it to profit, worsening the price impact.",
        "Delta-hedging large short option positions — a dealer short a call buys the underlying as price rises (and short a put sells as price falls), reinforcing the trend; contrast with dynamic hedging of a long option position, which trades against the trend and is stabilizing.",
        "Unmet margin calls — forced liquidation into an already-falling market, accentuating the decline (as in Black Monday 1987 and LTCM 1998)."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank has $2 billion in assets and $1.9 billion in liabilities, giving it positive equity, but cannot meet a $50 million payment due tomorrow without selling assets at a steep discount. This situation illustrates:",
      options: [
        "The bank is solvent but illiquid — a timing mismatch, not a net-worth problem",
        "The bank is insolvent because its equity is too thin",
        "The bank has violated the net stable funding ratio",
        "The bank is engaging in predatory trading"
      ],
      answer: 0,
      why: "Positive equity means assets exceed liabilities — the bank is solvent by definition. Its problem is a timing mismatch: it cannot convert assets into cash fast enough to meet an obligation due tomorrow. The tempting distractor — calling the bank insolvent because equity is 'too thin' — confuses solvency with liquidity; the NSFR and predatory-trading options describe unrelated concepts from later in the reading."
    },
    {
      q: "A firm owns 1 million shares of a stock with a bid of $40.00 and an offer of $42.00. Using the normal-market cost-of-liquidation formula, the cost to liquidate this position is closest to:",
      options: [
        "$487,800",
        "$975,600",
        "$2,000,000",
        "$41,000,000"
      ],
      answer: 1,
      why: "Mid-market price = (40+42)/2 = $41.00, so value α = $41,000,000. Proportional spread s = 2.00/41.00 = 4.878%. Cost = α × s / 2 = 41,000,000 × 0.04878 / 2 ≈ $975,600. The most tempting wrong answer, $487,800, forgets to first multiply by α (mistakenly treats the /2 as the only step); $2,000,000 is just the raw dollar spread × shares with no adjustment at all."
    },
    {
      q: "Why does the stressed-market cost-of-liquidation formula add γσ to the mean spread μ rather than just using a higher fixed spread?",
      options: [
        "Because γσ represents transaction fees charged by exchanges during stress",
        "Because in stressed markets the spread itself becomes volatile and unpredictable, and γσ prices a bad-case outcome at a chosen confidence level, not just a higher average",
        "Because regulators require a minimum γ of 1.645 under Basel III for all liquidations",
        "Because μ alone always understates the normal-market cost"
      ],
      answer: 1,
      why: "The stressed formula treats the spread as a random variable with mean μ and standard deviation σ, and γ is a confidence z-score — the addition captures that stressed spreads are both wider on average AND more uncertain, so the formula prices a confidence-level bad outcome, not the mean. There are no exchange fees or Basel γ mandate involved (the 'transaction fees' and 'Basel-mandated minimum γ' answers are fabricated), and μ alone is exactly the normal-market cost, not an understatement of it (the 'μ always understates the normal-market cost' answer)."
    },
    {
      q: "Which of the following is an accurate statement about a financial institution's sources of funding liquidity?",
      options: [
        "Retail and wholesale deposits have become more stable over time as banking relationships have deepened",
        "Trading book liquidation is equally effective in normal and stressed market conditions",
        "Central bank borrowing is a relatively cheap and reputationally neutral way for a bank to raise cash",
        "Stressed market conditions can significantly limit the effectiveness of trading book liquidation as a funding source"
      ],
      answer: 3,
      why: "Trading book liquidation depends on how liquid the book actually is, and that liquidity is precisely what deteriorates in stressed conditions — making the 'stressed conditions limit trading book liquidation' answer correct. Deposits have become LESS stable over time (not more, contradicting the 'deposits more stable' answer), trading book liquidation is NOT equally effective across market states (contradicting the 'equally effective' answer), and central bank borrowing carries a high interest rate, haircuts, and a negative signaling cost (contradicting the 'cheap and reputationally neutral' answer, a classic exam trap)."
    },
    {
      q: "Which pairing of case study and mechanism is correct?",
      options: [
        "Ashanti Goldfields — short-term debt funding a long-term mortgage book, triggering a public bank run",
        "Northern Rock — short gold forward positions that faced margin calls after a central-bank-driven price spike",
        "Metallgesellschaft — long near-dated oil futures hedging long-dated fixed-price supply contracts, with falling oil prices triggering margin calls",
        "Metallgesellschaft — a gold mining company hurt by a 15-central-bank gold-sale moratorium"
      ],
      answer: 2,
      why: "Metallgesellschaft held long near-dated oil futures to hedge its 5-to-10-year fixed-price heating oil/gasoline supply contracts; falling oil prices triggered margin calls that drained cash and forced an unwind at a loss over $1.3 billion. The Ashanti Goldfields and Northern Rock answers swap the two companies' mechanisms; the remaining wrong answer wrongly attributes the gold moratorium (Ashanti Goldfields' mechanism) to Metallgesellschaft."
    },
    {
      q: "A risk manager argues that applying identical liquidity regulations to banks, pension funds, and insurance companies would make the financial system safer. Based on this reading, the strongest counterargument is that:",
      options: [
        "Uniform regulation is always preferable because it simplifies supervisory oversight",
        "Uniform regulation could force very different institution types to react identically to the same shock at the same time, removing the diversity of response that otherwise cushions the system",
        "Pension funds and insurers are not subject to liquidity risk and therefore should be exempt entirely",
        "Uniform regulation would eliminate the need for a contingency funding plan"
      ],
      answer: 1,
      why: "The reading argues diversity of regulatory treatment is a stabilizing feature: different institution types have different time horizons and risk profiles, and if regulation forces them all to act the same way at the same time, that removes the natural staggering of responses that otherwise prevents a crowded exit. The 'uniform regulation simplifies supervision' answer is not the reading's argument and misses the systemic-risk point; pension funds and insurers are not liquidity-risk-immune (the 'exempt entirely' answer, false); a CFP remains necessary regardless of regulatory uniformity (the 'eliminates need for a CFP' answer, false)."
    }
  ],

  sources: [
    { title: "Northern Rock (bank) — Wikipedia", url: "https://en.wikipedia.org/wiki/Northern_Rock", note: "Background on the 2007 bank run and nationalization referenced as the funding-liquidity case study." },
    { title: "Bid–ask spread — Investopedia", url: "https://www.investopedia.com/terms/b/bid-askspread.asp", note: "Plain-language refresher on bid, offer, and mid-market price, the building blocks of the cost-of-liquidation formula." },
    { title: "Basel III: The Liquidity Coverage Ratio and liquidity risk monitoring tools — BIS", url: "https://www.bis.org/publ/bcbs238.pdf", note: "The primary source document for the LCR and its 30-day stress assumptions referenced in this reading." },
    { title: "Principles for Sound Liquidity Risk Management and Supervision — BIS", url: "https://www.bis.org/publ/bcbs144.pdf", note: "The original 17-principle BIS framework this reading summarizes across governance, measurement, disclosure, and supervision." }
  ],

  pdf: { book: 4, query: "solvency exists when equity is positive" }
});
