export default ({
  book: 4, reading: 66,
  session: "Liquidity Risk Management",
  title: "The Investment Function in Financial-Services Management",
  tagline: "A survey reading on how banks actually invest their securities portfolios: what instruments exist, what factors drive selection, and what maturity strategies balance yield against liquidity and interest rate risk.",

  teaches: `<p>Money market vs. capital market instruments, selection factors, and maturity strategies (ladder, front-end load, back-end load, barbell, rate expectations) plus yield curve tools and duration-based immunization.</p>
  <p>Concretely, you need to be able to (1) name and characterize each instrument in a bank's investment book — T-bills, T-notes/bonds, federal agency securities, CDs, Eurocurrency deposits, banker's acceptances, commercial paper, short-term municipal notes on the money-market side; Treasury/municipal/corporate notes-bonds plus structured notes, securitized assets, and stripped securities on the capital-market side; (2) work the after-tax and tax-equivalent yield calculations banks use to compare a taxable corporate bond against a tax-exempt municipal bond, including the bank-qualified-bond adjustment; and (3) apply the five maturity strategies and the two maturity-management tools (yield curve, duration) to a given interest-rate view.</p>`,

  why: `<p>Why do banks hold securities portfolios at all, rather than just making loans (which usually pay a higher rate)? The source material calls the investment portfolio the bank's <strong>"crossroads account"</strong> — it sits at the crossroads of borrowing and lending. When the bank has excess cash, it buys securities; when the bank is short of cash, it sells securities to raise it. Beyond that day-to-day cash-shock absorber role, the investment portfolio does five distinct jobs for the bank: it stabilizes income (bond coupons are steadier than loan fee income), it hedges the credit risk concentrated in the loan book (buying safe government paper to offset risky local loans), it adds diversification and liquidity, it delivers tax benefits (tax-exempt municipal income), and it can be pledged as collateral to borrow against or to secure public deposits. This reading explains that strategic logic before the site moves on to the day-to-day mechanics of reserves management (R67) and the full duration-gap ALM toolkit (R79) later.</p>`,

  intuition: `<p>Investment securities typically make up somewhere between a fifth and a third of a bank's total asset portfolio, and how a bank fills that slice is not random — it is deliberately chosen in relation to what is already sitting on the loan side of the balance sheet. <strong>Small banks</strong> tend to have loan books that are concentrated in a handful of local businesses and consumers — undiversified, and therefore riskier per dollar lent — so they counterbalance that with a <em>safer</em> securities portfolio, skewed toward U.S. government and agency debt. <strong>Large banks</strong> already have diversified, geographically spread loan books and more capital to absorb losses, so they can afford to tolerate more risk in the securities book in exchange for yield: foreign securities, private corporate debt, even equity. The size of the institution and the risk of its two books move in opposite directions by design — this is a specific, testable, directional fact, not a vague generalization.</p>
  <p>Maturity strategy is best pictured as a spectrum along the "how far out do I lend the securities book" axis. A <strong>ladder (spaced-maturity)</strong> policy puts an equal dollar amount in every maturity bucket out to some cap — for example, 20% each in 1-, 2-, 3-, 4-, and 5-year securities if the cap is five years. It is popular with smaller banks precisely because it requires no forecasting skill: some slice of the ladder always matures soon, steadily freeing up cash for new lending or investment opportunities, but because it is spread evenly rather than concentrated where yields happen to be best, it does not maximize income. <strong>Front-end load</strong> pushes everything into the short end (e.g., 100% in securities of two years or less) — maximum liquidity, minimum yield. <strong>Back-end load</strong> does the opposite (e.g., 100% in the 7–10 year range) — higher yield, but the bank may need to borrow to cover near-term liquidity needs since almost nothing matures soon. The <strong>barbell</strong> strategy is literally a barbell: weight sits at both ends (a short-maturity slice for liquidity plus a long-maturity slice for yield) with almost nothing in the middle — it is a favorite of smaller institutions because it gets both benefits (liquidity from the short leg, return from the long leg) without needing sophisticated forecasting. The <strong>rate-expectations approach</strong> is the odd one out: instead of a fixed structural policy, the bank actively repositions the whole portfolio based on its own interest-rate forecast — shortening maturities when it expects rates to rise (bond prices fall as rates rise, so shorter duration cushions the hit) and lengthening maturities when it expects rates to fall (to lock in price gains). Because it requires real forecasting capability, it suits larger, more sophisticated institutions, and every trade it triggers can also trigger a taxable gain or loss, so managers weigh tax effects before rebalancing.</p>
  <p>Duration-matching to the planned holding period <strong>immunizes</strong> a portfolio against interest rate risk by deliberately offsetting two opposite effects of a rate move. If rates rise, the market value of your existing bonds falls (price risk) — but the coupons you receive along the way can now be reinvested at the new, higher rate (reinvestment risk works in your favor). If rates fall, the reverse happens: your bonds gain in price, but you reinvest coupons at the new, lower rate. When a portfolio's duration exactly equals the length of time you actually plan to hold it, these two effects are engineered to cancel out almost exactly by the time you need the money — a preview of R79's fuller duration-gap treatment for the whole balance sheet, not just the securities book.</p>`,

  eli5: `<p>Imagine you run a small hardware store and split your spare cash into two piles: a jar of small bills by the register for quick emergencies (fast to grab, earns nothing extra) and a locked box of cash you don't touch, invested into slower things that pay more over time. If a neighbor asks for a short-term loan (risky — they might not pay you back), you'd want your "safety" pile of spare cash to be extra boring and safe to balance that out. If you're a bigger store with lots of steady, diversified customers, you can afford to put more of your spare cash into riskier bets for a better return, because your day-to-day business is already solid. A bank's securities portfolio works the same way: it is the bank's "spare cash pile," sized and risk-adjusted to offset whatever risk is already sitting in its loan book — small banks with concentrated, risky loans keep a safer securities pile (government bonds); big banks with diversified loan books can afford a riskier, higher-yield securities pile (foreign bonds, corporate debt, equity).</p>`,

  thinkLike: `<p>An investment officer does not pick securities in isolation from the rest of the balance sheet — the securities portfolio is the pressure valve for whatever risk and liquidity gaps already exist elsewhere. The practitioner's mental checklist is: what does the loan book already look like (risky and concentrated, or safe and diversified)? What's my near-term cash need (do I need liquidity next month, or can I lock money up for years)? What's my house view on rates (am I forecasting a rise or fall, and how confident am I in that call versus just running a passive ladder)? And what's my after-tax picture (would a lower-yielding but tax-exempt municipal actually beat a higher-yielding taxable corporate bond once my marginal tax rate is applied)? The exam tests this reading in three recurring ways: (1) matching-style questions that ask you to classify an instrument as money market vs. capital market or match a maturity-strategy name to its description (ladder vs. barbell vs. front/back-end load are the classic confusion set); (2) numeric after-tax/tax-equivalent-yield and bank-qualified-bond net-return calculations, where the trap is forgetting the 80% deductibility haircut or mixing up which side of the equation gets the tax rate applied; and (3) directional reasoning questions (does a bank expecting falling rates lengthen or shorten maturities? does a small or large bank hold the riskier securities book?) where the distractor is simply the reversed direction of the correct fact.</p>`,

  visual: "",

  formulas: [
    {
      name: "After-tax yield comparison (taxable vs. tax-exempt bond)",
      math: "\\text{after-tax yield}_{\\text{taxable}} = \\text{YTM}_{\\text{taxable}} \\times (1 - t)",
      plain: "To compare a taxable corporate bond fairly against a tax-exempt municipal bond, strip the tax bite off the taxable bond's yield first, since the municipal bond's stated yield is already what the bank keeps.",
      derivation: `<p>A bank earns interest on a taxable bond and then owes tax on that interest at its marginal rate \\(t\\), so what it actually keeps is:</p>
      \\[ \\text{after-tax yield} = \\text{YTM} \\times (1 - t) \\]
      <p>A municipal bond's coupon income is exempt from federal tax, so its after-tax yield equals its stated (gross) YTM — no adjustment needed. Worked example from the source: a bank compares an AA-rated corporate bond with a 6% YTM against an AA-rated municipal bond with a 4.4% YTM, at a 35% marginal tax rate.</p>
      \\[ \\text{corporate after-tax yield} = 6\\% \\times (1 - 0.35) = 3.9\\% \\]
      \\[ \\text{municipal after-tax yield} = 4.4\\% \\times (1 - 0) = 4.4\\% \\]
      <p>Since \\(4.4\\% > 3.9\\%\\), the municipal bond is more attractive to the bank on an after-tax basis, even though its stated (gross) yield is lower than the corporate bond's.</p>`
    },
    {
      name: "Tax-equivalent yield (TEY)",
      math: "\\text{TEY} = \\dfrac{\\text{YTM}_{\\text{municipal}}}{1 - t}",
      plain: "The tax-equivalent yield converts a tax-exempt municipal bond's yield into the pre-tax yield a taxable bond would need to offer to match it, so the two can be ranked on a common before-tax basis.",
      derivation: `<p>Rearranging the after-tax yield formula and solving for the taxable-equivalent rate gives the tax-equivalent yield. Continuing the worked example (municipal YTM \\(=4.4\\%\\), \\(t = 35\\%\\)):</p>
      \\[ \\text{TEY} = \\dfrac{4.4\\%}{1 - 0.35} = \\dfrac{4.4\\%}{0.65} = 6.8\\% \\]
      <p>This means a taxable corporate bond would need to yield 6.8% before tax to match the municipal bond's 4.4% tax-exempt yield for a bank in the 35% bracket — since the actual corporate bond only offers 6%, the municipal bond wins.</p>`
    },
    {
      name: "Net after-tax return on a bank-qualified municipal bond",
      math: "\\text{net after-tax return} = r_{\\text{muni}} - r_{\\text{borrow}} + \\big(t \\times d \\times r_{\\text{borrow}}\\big)",
      plain: "This formula captures the actual profit a bank earns from funding a municipal-bond purchase with borrowed money: the municipal coupon received, minus the cost of the borrowed funds, plus a tax-deduction credit on the deductible share of that borrowing cost.",
      derivation: `<p>Where \\(r_{\\text{muni}}\\) is the municipal bond's gross nominal rate of return, \\(r_{\\text{borrow}}\\) is the bank's cost of the funds borrowed to buy the bond, \\(t\\) is the bank's marginal tax rate, and \\(d\\) is the deductible fraction of the interest expense (80% for a <em>bank-qualified bond</em> — a municipal bond issued by a smaller municipality issuing $10 million or less in public securities annually, under a Tax Reform Act of 1986 carve-out).</p>
      <p>The logic: the bank earns the muni coupon \\(r_{\\text{muni}}\\), pays away its borrowing cost \\(r_{\\text{borrow}}\\), and then gets back a tax shield equal to the tax rate times the deductible share of that borrowing cost, since interest expense on debt used to buy a bank-qualified bond is 80% tax-deductible (ordinarily a bank cannot deduct the cost of carrying tax-exempt investments at all — this is a specific statutory exception). Worked example from the source: a bank buys a municipal bond with a 6% gross nominal return, funded by borrowing at 5%, in the 35% top tax bracket, on a bank-qualified bond (80% deductible):</p>
      \\[ \\text{net after-tax return} = 6\\% - 5\\% + (0.35 \\times 0.80 \\times 5\\%) = 2.4\\% \\]
      <p>A second worked example (used in the quiz below): a municipal bond with a 5.5% nominal return, funded at 4.7%, at a 34% marginal tax rate, 80% deductible:</p>
      \\[ \\text{net after-tax return} = (5.5\\% - 4.7\\%) + (0.34 \\times 0.80 \\times 4.7\\%) = 0.8\\% + 1.28\\% = 2.08\\% \\]`
    }
  ],

  concepts: [
    {
      name: "Money market vs. capital market instruments",
      def: "Money market (≤1yr, low risk/yield): T-bills, short T-notes/bonds, federal agency securities, CDs, Eurocurrency deposits, banker's acceptances, commercial paper, short-term municipal obligations. Capital market (>1yr, higher risk/yield): Treasury notes/bonds, municipal notes/bonds, corporate notes/bonds.",
      intuition: "The one-year maturity line is the entire classification rule — nothing about the issuer or credit quality matters for the money-market/capital-market label, only how soon it comes due. A Treasury note with 11 months left to run is a money-market instrument even though the same security was a capital-market instrument the day it was issued with 5 years to maturity.",
      example: "T-bills: zero-coupon, issued at a discount by the U.S. Treasury via weekly/monthly auctions, mature at par, priced using the bank discount method — the safest and most liquid instrument in the book because they carry the full faith, credit, and taxing power of the federal government, but that safety is why their yield is also the lowest. Federal agency securities (Fannie Mae, Freddie Mac, the Farm Credit System, Federal Land Banks) are not directly guaranteed by the government, but carry an implied guarantee (the market assumes Congress would bail them out), so they pay a bit more than Treasuries for a sliver of extra risk. CDs (certificates of deposit) are bank-issued time deposits — as small as $500 for consumer CDs, over $100,000 for business-oriented CDs — carrying FDIC insurance up to $250,000. Eurocurrency deposits are uninsured 30/60/90-day time deposits issued by large banks, concentrated in the London market, offering a yield pickup over domestic deposits but with taxable income and rate volatility. Banker's acceptances are trade-finance instruments: a bank guarantees an importer/exporter's payment for a fee and becomes the primary obligor; to be Fed-eligible they must be denominated in U.S. dollars, have six months or less to maturity, and relate to actual goods trade or storage of marketable securities. Commercial paper is short-term (usually 90 days or less in the U.S., up to 270 days by statute) unsecured discount paper issued by large corporations, popular with money market funds. Short-term municipal notes split into tax-anticipation notes (TANs, repaid from expected future tax revenue) and revenue-anticipation notes (RANs, repaid from a specific revenue-generating project like a toll road) — both exempt from federal income tax, though state/municipal fiscal stress in recent years has dented their appeal.",
      counter: "A 30-year Treasury bond with 25 years left to maturity is NOT a money-market instrument just because Treasuries in general are considered 'safe, liquid' assets — maturity alone decides the bucket, and 25 years is squarely capital-market.",
      pitfall: "Don't confuse 'money market' with 'low quality' — T-bills are money-market AND the highest quality instrument in the entire investment universe. Money market means short maturity, not junk.",
      related: [],
      memory: "One year is the whole rule: ≤1yr = money market, >1yr = capital market."
    },
    {
      name: "Newer/structured investment instruments",
      def: "Structured notes (created from pools of agency securities, with reset coupons, cap/floor rates, or step-up provisions), securitized assets (pass-throughs, CMOs, REMICs, MBBs), and stripped securities (principal-only/interest-only, PO/IO).",
      intuition: "All three families exist to slice a pool of underlying loans or bonds into pieces with different risk/cash-flow profiles than the whole — the bank is effectively buying a custom-built claim rather than the raw loan itself.",
      example: "Pass-through securities: an issuer moves a pool of mortgages off its balance sheet to a trustee, and mortgage principal/interest payments 'pass through' to investors; Ginnie Mae only securitizes government-insured loans, Fannie Mae does both government-insured and conventional loans, and both add fee-based guarantees. Collateralized mortgage obligations (CMOs), created by Freddie Mac in the early 1980s, slice pass-through cash flows into tranches, each with a different risk level and coupon. Real estate mortgage conduits (REMICs) similarly segment mortgage cash flows into maturity classes to reduce cash-flow uncertainty, but their main risk is prepayment risk — borrowers refinancing or defaulting early. Mortgage-backed bonds (MBBs) differ from pass-throughs/CMOs in that the mortgages stay on the issuer's own balance sheet (just segregated), with a trustee periodically checking that the pledged loan pool still exceeds the bond value. Stripped securities split a bond's cash flows into a principal-only (PO) piece and an interest-only (IO) piece, each a zero-coupon instrument issued at a discount; IOs are LESS sensitive to rate changes than a normal bond, POs are MORE sensitive — a testable directional pairing, most commonly stripped from Treasury notes/bonds and mortgage-backed securities.",
      pitfall: "IO and PO have opposite interest-rate sensitivities from each other, and it is easy to mix up which is which: memorize that Principal-Only moves more (more sensitive), Interest-Only moves less.",
      related: [],
      memory: "Pass-through → CMO tranches it → REMIC segments it by maturity → MBB keeps the loans on-balance-sheet → PO/IO strips it into two pieces."
    },
    {
      name: "Selection factors",
      def: "Expected return (YTM, holding period yield), tax exposure (taxable vs. tax-exempt, tax-equivalent yield, bank-qualified bonds), interest rate/credit/business/liquidity/call/prepayment/inflation risk, pledging requirements.",
      intuition: "Each factor is really answering one question a portfolio manager asks about a candidate security: how much will it pay me (return), how much of that do I keep (tax), and what could go wrong along the way (the six named risk types)? The final factor, pledging, is a legal constraint rather than a risk — it determines what the bank is even ALLOWED to hold given its collateral obligations.",
      example: "Interest rate risk: as rates rise, security prices fall (and loan demand from businesses rises) — hedged with derivatives like interest rate swaps. Credit risk: the chance an issuer misses a payment; measured by rating agencies (Moody's Baa/BBB or better is 'investment grade'; Ba/BB or below is 'speculative grade,' and many institutional investors like pension funds are legally barred from holding speculative-grade paper). Business risk: the risk that the bank's own local economy weakens, hedged by geographic diversification (a Western-U.S. bank buying bonds tied to other regions). Liquidity risk: the risk of being unable to sell quickly at a fair price — T-bills/T-notes/T-bonds sit at the most-liquid, lowest-yield end of this trade-off. Call risk: when rates fall, issuers of callable bonds repurchase them early, forcing the investor to reinvest the proceeds at the new, lower rate — mitigated by avoiding callable bonds or choosing ones with a longer call-protection (deferment) period. Prepayment risk: mortgage borrowers refinancing (when rates fall) or defaulting early disrupts the investor's expected cash flows; the Public Securities Association (PSA) prepayment model assumes 0.2% of principal prepays in month 1, rising 0.2%/month through month 30, then leveling off at 6% — a pool matching this exact speed is described as '100% PSA.' Inflation risk: rising prices erode the real value of fixed coupon/principal payments; Treasury Inflation-Protected Securities (TIPS, in 5/10/30-year maturities) explicitly hedge this by adjusting principal for inflation, which in turn changes the semiannual coupon payment.",
      pitfall: "Small banks skew toward SAFER government securities to offset riskier loan books; large banks tolerate MORE risk for yield (foreign securities, private debt, equity) — bank size correlates with securities-portfolio risk appetite in a specific, testable direction.",
      related: [],
      memory: "Nine factors, one question each: return, tax, and six named risks (rate/credit/business/liquidity/call/prepayment/inflation), plus a legal constraint (pledging)."
    },
    {
      name: "Tax-management strategies: tax swapping and portfolio shifting",
      def: "Tax swapping: selling lower-yielding securities at a loss to reduce current taxable income (useful in high-loan-revenue years), while buying new higher-yielding securities. Portfolio shifting: selling securities at a loss specifically to offset large loan income, or replacing old below-market-yield securities with new higher-yielding ones.",
      intuition: "Both strategies exploit the same lever — realizing a loss on paper lowers this year's tax bill — but they're applied for slightly different reasons: tax swapping is a general income-smoothing/tax-timing tool, while portfolio shifting is specifically deployed to offset an unusually large loan-income year.",
      pitfall: "Tax swapping isn't free money — realizing losses on purpose only helps a bank that's already in a high tax bracket with meaningful loan revenue to shelter; a bank without much taxable income to offset gains little from it, and the strategy is limited by how much tax-exempt income the institution can actually use.",
      related: [],
      memory: "Tax swap: sell a loser, buy a better yielder, save on this year's taxes."
    },
    {
      name: "Maturity strategies",
      def: "Ladder (spaced-maturity): equal amounts across each maturity interval — simple, frees cash steadily, but not income-maximizing. Front-end load: concentrate in short-term investments. Back-end load: concentrate in long-term investments. Barbell: combine front- and back-end (short + long, avoid the middle). Rate expectations: actively positioned on interest rate/economic forecasts.",
      intuition: "Picture a number line from 0 years to the bank's chosen maximum maturity. Ladder spreads weight evenly across the whole line. Front-end load piles everything at the left edge. Back-end load piles everything at the right edge. Barbell piles weight at BOTH edges and leaves the middle empty. Rate expectations doesn't have a fixed shape at all — it moves the weight left or right based on the bank's own rate forecast.",
      example: "Worked ladder example from the source: a bank with a 5-year maximum maturity puts 20% of its investable funds into each of the 1-, 2-, 3-, 4-, and 5-year buckets. A worked front-end example: a firm invests 100% of available (non-loan, non-reserve) funds into securities of two years or less — maximizing liquidity at the cost of yield. A worked back-end example: a firm invests 100% into the 7–10 year range — higher yield, but the firm may need to borrow to cover near-term liquidity gaps since nothing frees up soon. Yield curve tools: a downward-sloping curve signals expected rate declines; the carry trade borrows short/cheap (at the low short-term rate) to invest long/rich (in a higher-yielding longer security), earning the 'carry return' as long as the investment yield net of borrowing cost and fees stays positive; riding the yield curve sells a bond after its price has spiked shortly before maturity (which happens under a steeply upward-sloping curve) and reinvests the proceeds into new longer-term securities, working as long as the curve's shape doesn't change.",
      related: ["Duration and immunization"],
      memory: "Ladder: steady and simple. Barbell: both ends, skip the middle. Front/back-end load: pick a side."
    },
    {
      name: "Duration and immunization",
      def: "Matching portfolio duration to the planned holding period immunizes against interest rate risk (offsetting price risk against reinvestment risk).",
      intuition: "Duration measures interest-rate sensitivity — the present-value-weighted average time until a security's cash flows arrive, and equivalently the expected percentage price change for a given change in rates. The yield curve tells you where rates ARE across maturities right now, but says nothing about the size and timing of a specific security's cash flows; duration fills that gap.",
      related: [{ r: 79, label: "R79 — the full duration-gap treatment this previews" }],
      memory: "Duration-matching cancels price risk against reinvestment risk — a preview of the fuller ALM/duration-gap story."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 67, why: "The investment portfolio described here is the same set of liquid assets managed day-to-day in reserves management." },
      { r: 79, why: "Duration-based immunization here is a preview of the full duration-gap ALM treatment." }
    ],
    confused: [
      { what: "Ladder vs barbell maturity strategy", how: "Ladder spreads investments EVENLY across all maturities; barbell concentrates at BOTH extremes (short and long) while avoiding the middle entirely — different shapes, different risk/return trade-offs." },
      { what: "Principal-only (PO) vs interest-only (IO) stripped securities", how: "PO is MORE sensitive to interest rate changes; IO is LESS sensitive — the opposite pairing is a common exam trap." },
      { what: "Tax-equivalent yield vs after-tax yield", how: "After-tax yield takes a TAXABLE bond's yield DOWN by applying the tax rate; tax-equivalent yield takes a TAX-EXEMPT bond's yield UP to show what a taxable bond would need to pay to match it — they convert in opposite directions." }
    ]
  },

  misconceptions: [
    { wrong: "\"Large banks and small banks tend to hold similarly risky securities portfolios.\"", right: "Small banks skew toward SAFER government securities (offsetting riskier loan books); large banks tolerate MORE risk for yield (foreign securities, private debt, equity) — portfolio risk appetite correlates with bank size in a specific direction." },
    { wrong: "\"A ladder maturity strategy maximizes income compared to other strategies.\"", right: "Ladder is simple and provides steady cash flow, but it is explicitly NOT income-maximizing — other strategies (like rate-expectations positioning) aim for higher income at the cost of more risk/complexity." },
    { wrong: "\"Money market instruments are, by definition, lower credit quality than capital market instruments.\"", right: "The money-market/capital-market split is purely about maturity (≤1yr vs >1yr) — T-bills are money-market AND the highest-quality, safest instrument in the entire investment universe." },
    { wrong: "\"If a bank expects interest rates to fall, it should shorten its portfolio's maturities to protect against losses.\"", right: "Expecting FALLING rates means EXTENDING (lengthening) maturities to lock in price gains, since bond prices rise as rates fall; shortening maturities is the correct move when rates are expected to RISE." },
    { wrong: "\"Interest paid on debt used to buy any tax-exempt municipal bond is fully non-deductible for a bank.\"", right: "For a bank-qualified bond specifically (issued by a smaller municipality raising $10 million or less annually), 80% of the interest expense used to fund the purchase IS tax-deductible — this statutory carve-out is exactly what the net-after-tax-return formula captures." }
  ],

  highYield: [
    { stars: 3, what: "Five maturity strategies (ladder, front-end, back-end, barbell, rate expectations) and their trade-offs.", why: "A clean five-item classification, good for matching-style questions." },
    { stars: 3, what: "After-tax yield, tax-equivalent yield, and bank-qualified-bond net-after-tax-return calculations.", why: "The one calculation-heavy corner of an otherwise conceptual reading — shows up as numeric MCQs." },
    { stars: 2, what: "Money market vs capital market instrument classification.", why: "Foundational vocabulary, straightforward recall." },
    { stars: 2, what: "Small vs large bank securities portfolio risk appetite.", why: "A specific, testable directional fact." },
    { stars: 2, what: "The nine investment-security selection factors (return, tax, six risk types, pledging).", why: "Broad conceptual coverage — likely a definition/matching item on any given exam." }
  ],

  recall: [
    { q: "Why might a small community bank hold a more conservative securities portfolio (heavy in government securities) than a large money-center bank?", a: "Small banks typically have riskier, less-diversified LOAN books (concentrated in local businesses/consumers), so they use a safer securities portfolio to offset that loan-book risk. Large banks have more diversified loan books and greater risk-bearing capacity, allowing them to tolerate more securities-portfolio risk (foreign securities, private debt, equity) in pursuit of higher yield." },
    { q: "How does duration-matching to a planned holding period 'immunize' a bond portfolio against interest rate risk?", a: "When rates change, a bond's PRICE moves one way (e.g., rates rise, price falls) while its REINVESTMENT return on coupons moves the opposite way (e.g., rates rise, reinvested coupons earn more). Matching duration to the holding period balances these two offsetting effects so that, at the holding period's end, the two effects roughly cancel out, immunizing the portfolio's realized return against rate changes." },
    { q: "A bank buys a municipal bond with a 6% gross nominal return, funded by borrowing at 5%. The bank is in the 35% tax bracket and the bond is bank-qualified (80% of interest expense deductible). What is the net after-tax return?", a: "net after-tax return = 6% − 5% + (0.35 × 0.80 × 5%) = 1% + 1.4% = 2.4%." }
  ],

  hooks: [
    { title: "Both ends, skip the middle", text: "A barbell strategy is exactly what it sounds like: weight sits at the short end and the long end, with nothing in between — like a barbell's weights, not its bar." },
    { title: "The crossroads account", text: "The source material's own nickname for the investment portfolio: it sits at the crossroads of borrowing and lending — sell securities when cash is low, buy securities when cash is high." }
  ],

  breakdown: [
    {
      title: "Money market instruments (≤1yr)",
      points: [
        "T-bills — zero-coupon, discount-issued, federal-government-backed, safest and most liquid, therefore lowest yield.",
        "Short T-notes/T-bonds — coupon-bearing federal government paper with under a year left to run.",
        "Federal agency securities (Fannie Mae, Freddie Mac, Farm Credit System, Federal Land Banks) — implied (not direct) government backing, higher yield than Treasuries, interest fully taxable.",
        "Certificates of deposit (CDs) — bank-issued time deposits, FDIC-insured up to $250,000, consumer ($500–$100,000) vs business (>$100,000) denominations.",
        "International Eurocurrency deposits — uninsured 30/60/90-day deposits, market concentrated in London, yield pickup over domestic deposits but taxable and rate-volatile.",
        "Banker's acceptances — bank-guaranteed trade-finance paper, discount instrument, Fed-eligible if USD-denominated, ≤6 months, and tied to actual goods trade.",
        "Commercial paper — unsecured discount paper from large corporations, typically ≤90 days (up to 270 days by statute), taxable income.",
        "Short-term municipal obligations (TANs/RANs) — tax-anticipation and revenue-anticipation notes, federally tax-exempt but credit quality has weakened in recent years."
      ]
    },
    {
      title: "Capital market instruments (>1yr)",
      points: [
        "Treasury notes/bonds — coupon-bearing, full federal government backing, safety + liquidity + collateral value, but price risk from volatility.",
        "Municipal notes/bonds — issued by states/localities, federally tax-exempt, less liquid; split into general obligation (GO, backed by full faith/taxing power) and revenue bonds (backed by a specific project's revenue, e.g., tolls).",
        "Corporate notes/bonds — notes ≤5yr, bonds >5yr at issuance; higher yields than government debt but yield spreads widen in downturns; attractive to insurers and pension funds."
      ]
    },
    {
      title: "Newer/structured instruments",
      points: [
        "Structured notes — built from pools of agency securities, can carry cap/floor rates or step-up coupons; higher yield, higher complexity/loss potential.",
        "Pass-through securities — mortgage principal/interest passed straight through to investors; Ginnie Mae (government-insured loans only) vs Fannie Mae (both government-insured and conventional).",
        "Collateralized mortgage obligations (CMOs) — pass-throughs divided into risk/coupon tranches, created by Freddie Mac in the early 1980s.",
        "Real estate mortgage conduits (REMICs) — segment mortgage cash flows into maturity classes; main risk is prepayment risk.",
        "Mortgage-backed bonds (MBBs) — mortgages stay on the issuer's own balance sheet (segregated, trustee-monitored), unlike pass-throughs/CMOs.",
        "Stripped securities (PO/IO) — a bond's cash flows split into principal-only and interest-only zero-coupon pieces; PO is MORE rate-sensitive, IO is LESS rate-sensitive."
      ]
    },
    {
      title: "Nine investment-security selection factors",
      points: [
        "Expected rate of return — YTM for held-to-maturity securities, holding period yield (HPY) for securities sold early or with no fixed maturity.",
        "Tax exposure — after-tax comparison of taxable vs tax-exempt bonds, tax-equivalent yield, bank-qualified bonds, tax swapping, portfolio shifting.",
        "Interest rate risk — security prices and portfolio value move opposite to rate changes; hedged with derivatives like interest rate swaps.",
        "Credit risk — risk of missed payments/default, tracked via credit ratings (investment grade = BBB/Baa or better).",
        "Business risk — the bank's own local economy weakening; hedged by geographic diversification of the portfolio.",
        "Liquidity risk — the risk of being unable to sell quickly at a fair price; trades off against yield (T-bills most liquid, lowest yield).",
        "Call risk — issuer repurchases a callable bond when rates fall, forcing reinvestment at a lower rate.",
        "Prepayment risk — mortgage borrowers refinance or default early, disrupting expected cash flows (modeled via the PSA prepayment curve).",
        "Inflation risk — rising prices erode fixed coupon/principal value; hedged with TIPS (5/10/30-year, principal adjusted for inflation).",
        "Pledging requirements — legal collateral rules for holding government deposits, typically requiring high-quality federal/municipal securities."
      ]
    },
    {
      title: "Five maturity strategies",
      points: [
        "Ladder (spaced-maturity) — equal weight across every maturity bucket up to a cap (e.g., 20% each in 1–5 year buckets); simple, steady liquidity, not income-maximizing.",
        "Front-end load — concentrate in short-term securities (e.g., 100% in ≤2yr); maximizes liquidity, minimizes yield.",
        "Back-end load — concentrate in long-term securities (e.g., 100% in 7–10yr); higher yield, may require borrowing to cover near-term needs.",
        "Barbell — combine front-end and back-end, skip the middle; short leg for liquidity, long leg for return; favored by smaller institutions.",
        "Rate expectations — actively shorten maturities when expecting rate rises, lengthen when expecting rate falls; requires sophisticated forecasting, suits larger institutions, and trades can trigger taxable gains/losses."
      ]
    },
    {
      title: "Two maturity management tools",
      points: [
        "Yield curve — shape signals rate expectations (downward-sloping = expected rate declines); enables the carry trade (borrow short/cheap, invest long/rich) and riding the yield curve (sell after a pre-maturity price spike, reinvest longer).",
        "Duration — present-value-weighted average time to receive all cash flows; measures price sensitivity to rate changes; matching duration to the planned holding period immunizes the portfolio by offsetting price risk against reinvestment risk."
      ]
    }
  ],

  quiz: [
    {
      q: "Which of the following is NOT an advantage of Treasury bills relative to other money market instruments?",
      options: ["Stable market prices", "Usable as collateral for borrowing", "Higher yields than federal agency securities", "Backed by the taxing power of the federal government"],
      answer: 2,
      why: "T-bills have LOWER yields than federal agency securities precisely because they are safer — agency securities carry only an implied (not direct) government guarantee, so they must pay more to compensate investors for that extra sliver of risk. Stability, collateral value, and federal backing are all genuine T-bill advantages, which is why they're the tempting-but-wrong distractors here."
    },
    {
      q: "A bank is considering an AA-rated corporate bond with a 6% YTM versus an AA-rated municipal bond with a 4.4% YTM. The bank's marginal tax rate is 35%. On an after-tax basis, which bond is more attractive and why?",
      options: ["The corporate bond, because 6% > 4.4% before tax", "The municipal bond, because its 4.4% after-tax yield beats the corporate bond's 3.9% after-tax yield", "They are equally attractive once taxes are considered", "The corporate bond, because municipal bonds always carry more credit risk"],
      answer: 1,
      why: "After-tax corporate yield = 6% × (1 − 0.35) = 3.9%; the municipal bond's yield stays at 4.4% since it is tax-exempt. 4.4% > 3.9%, so the municipal bond wins after tax. The trap is comparing the two YTMs directly (6% vs 4.4%) without adjusting the taxable bond down for its tax liability — municipal credit quality isn't the deciding factor here at all."
    },
    {
      q: "A bank purchases a bank-qualified municipal bond with a 5.5% nominal rate of return, funded by borrowing at 4.7%. The bank's marginal tax rate is 34%, and 80% of the interest expense is tax deductible. The net after-tax return on the bond is closest to:",
      options: ["0.80%", "2.08%", "2.40%", "4.56%"],
      answer: 1,
      why: "net after-tax return = (5.5% − 4.7%) + (0.34 × 0.80 × 4.7%) = 0.80% + 1.28% = 2.08%. The 0.80% distractor is just the raw spread before adding back the tax shield on the deductible interest; the other two figures come from misapplying the tax rate or deductible fraction."
    },
    {
      q: "An institutional investor is prohibited from holding speculative-grade (non-investment-grade) securities. A rating downgrade from which of the following pairs would force the investor to sell?",
      options: ["AAA to AA", "BBB to BB", "BB to B", "B to CCC"],
      answer: 1,
      why: "Investment grade is BBB/Baa or better; a drop from BBB to BB crosses the line into speculative grade, forcing a sale. AAA to AA stays comfortably investment grade. BB to B and B to CCC are both already below the investment-grade line, so the security should already have been sold — no NEW forced sale is triggered by those downgrades."
    },
    {
      q: "Which maturity strategy is most likely to reduce income fluctuation over the medium-to-long term while still generating ongoing liquidity for new investment opportunities?",
      options: ["Ladder", "Barbell", "Back-end load", "Front-end load"],
      answer: 0,
      why: "The ladder spreads investments evenly across every maturity, so some portion is constantly maturing and freeing up cash (ongoing liquidity) while income is smoothed across many maturity buckets rather than concentrated. Barbell and back-end load concentrate weight at the long end (income-generating but not steadily liquidity-freeing in the near term), and front-end load sacrifices income for liquidity rather than balancing both."
    },
    {
      q: "A bank expects interest rates to fall significantly over the next year and wants to position its securities portfolio to maximize capital gains from that view. Which adjustment is most consistent with the rate-expectations approach?",
      options: ["Shift the portfolio toward shorter-maturity securities", "Shift the portfolio toward longer-maturity securities", "Move entirely into money market instruments", "Duration is irrelevant to this decision — only credit quality matters"],
      answer: 1,
      why: "Bond prices and interest rates move inversely, and longer-maturity (higher-duration) bonds are more sensitive to rate moves, so extending maturities captures the largest price gain when rates fall. Shortening maturities or moving to money market instruments is the correct move for an EXPECTED RATE RISE, not a fall — the reversed-direction answer is the classic trap here."
    }
  ],

  sources: [
    { title: "Money market — Wikipedia", url: "https://en.wikipedia.org/wiki/Money_market", note: "Background on the short-term instruments (T-bills, CDs, commercial paper, banker's acceptances) that make up the money-market half of the classification." },
    { title: "Tax-equivalent yield — Investopedia", url: "https://www.investopedia.com/terms/t/taxequivalentyield.asp", note: "Worked explanation of the tax-equivalent yield formula used to compare taxable and tax-exempt bonds on a common basis." },
    { title: "Collateralized mortgage obligation (CMO) — Investopedia", url: "https://www.investopedia.com/terms/c/cmo.asp", note: "Plain-language walkthrough of how CMOs slice mortgage pass-through cash flows into tranches." },
    { title: "Treasury Inflation-Protected Securities (TIPS) — U.S. Treasury / TreasuryDirect", url: "https://www.treasurydirect.gov/marketable-securities/tips/", note: "Official description of how TIPS principal adjusts for inflation, referenced as the inflation-risk hedge in this reading." }
  ],

  pdf: { book: 4, query: "Banks and depository institutions invest a significant portion" },

  summary: `<p><strong>Money market</strong> (≤1yr: T-bills, CDs, CP) vs <strong>capital market</strong> (>1yr: Treasury/muni/corporate notes-bonds) instruments, plus newer structured/securitized/stripped instruments (CMOs, REMICs, MBBs, PO/IO). <strong>Selection factors</strong>: return (YTM/HPY), tax exposure (after-tax yield, tax-equivalent yield, bank-qualified bonds), and six risk types (rate, credit, business, liquidity, call, prepayment, inflation) plus pledging requirements — small banks skew safer, large banks tolerate more risk for yield. <strong>Maturity strategies</strong>: ladder (steady, not income-max), front-end/back-end load, barbell (both extremes), rate expectations (active positioning). <strong>Maturity management tools</strong>: the yield curve (carry trade, riding the yield curve) and <strong>duration-matching</strong> to holding period, which immunizes against rate risk by offsetting price risk against reinvestment risk.</p>`
});
