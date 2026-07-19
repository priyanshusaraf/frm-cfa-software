export default ({
  book: 2, reading: 24,
  session: "Credit Risk Analysis",
  title: "Country Risk: Determinants, Measures, and Implications",
  tagline: "Session 4 closes by scaling the 'borrower' from a firm up to an entire country.",

  teaches: `<p>Sources of country risk (economic life cycle stage, political risk, legal-system quality, commodity dependence); foreign vs. local currency default and why a country would default when it could theoretically print money; consequences of sovereign default with memorizable magnitudes; the factors that drive sovereign default risk (indebtedness, pension/social obligations, tax receipts and their stability, political risk, implicit backing from stronger economies); how the big three rating agencies actually build a sovereign rating and why local-currency ratings usually sit at or above foreign-currency ratings; the well-documented shortcomings of sovereign rating agencies (upward bias, herd behavior, slow updates, overreaction); and the two market-based alternatives to a rating — the sovereign default spread and the sovereign CDS spread — including how to calculate each from real bond and CDS data.</p>`,

  why: `<p>Sovereign default seems paradoxical — why would a country default on debt in its own currency when it can print more? This reading resolves the paradox and gives you the actual measured consequences of default (GDP, borrowing costs, trade), which shows sovereign default is costly, not a free escape valve. It then goes further than the paradox: it teaches you the three competing ways a risk manager actually measures country risk day-to-day — the sovereign credit rating (slow-moving, agency-produced), the sovereign default spread (market-based, calculated from bond yields you can pull off a screen), and the CDS spread (market-based, calculated from swap pricing) — and forces you to know each one's advantages and blind spots, because the exam repeatedly asks you to compare them.</p>`,

  intuition: `<p>Foreign currency default is intuitive: the country literally can't print dollars or euros to pay foreign-currency debt — it doesn't control that printing press. Local currency default is the puzzle — a country CAN print its own currency, so why would it ever default instead? Three answers: (1) historically, a gold standard constrained money printing (pre-1971, currency had to be backed by gold reserves, capping how much could be issued), (2) shared currencies (like the euro) strip out independent monetary policy entirely — Greece in its 2015 crisis could not unilaterally print euros to pay its debt, because that decision sits with the European Central Bank, not Athens, (3) sometimes the INFLATION cost of debasing the currency is judged worse than the cost of default outright — printing money to pay debt just shifts the pain onto everyone holding that currency, since more currency in circulation chasing the same goods devalues every unit of it. This third reason is really a cost-benefit tradeoff: the more that foreign-currency debt is funding local-currency assets, the worse printing gets, because devaluing the currency crushes local asset values while the foreign debt itself doesn't shrink.</p>
  <p>Once you're past that puzzle, the reading builds outward: what actually makes one country riskier than another (four broad sources: growth stage, politics, legal system, economic concentration), who measures that risk and how (rating agencies, using a committee process much like corporate ratings), why that measurement is imperfect (herd behavior, slow updates, upward bias), and what two market-based numbers investors watch instead when they don't trust the rating alone (the default spread on the country's bonds, and the CDS spread on insuring against its default).</p>`,

  formulas: [
    {
      name: "Sovereign default spread",
      math: "\\text{Sovereign default spread} = y_{\\text{risky sovereign bond}} - y_{\\text{risk-free bond}}",
      plain: "The default spread is simply how much extra yield the market demands to hold a risky country's bond instead of a risk-free benchmark bond of the same maturity and currency.",
      note: "Only meaningful when both bonds are denominated in the same currency and one is genuinely (near) risk-free — usually a dollar-denominated sovereign bond compared to the equivalent-maturity U.S. Treasury.",
      derivation: `<p>Worked example from the reading: on July 1, 2022, a 10-year dollar-denominated Brazilian government bond yielded 6.00%, while the 10-year U.S. Treasury bond yielded 3.02%. Since the Treasury is treated as risk-free (same currency, same maturity, so the only difference left is default risk):</p>
      \\[ \\text{Sovereign default spread} = 6.00\\% - 3.02\\% = 2.98\\% \\]
      <p>That 2.98 percentage points is the market's real-time price for Brazil's default risk relative to the U.S. — it widens when investors get more worried and narrows when they get less worried, updating far faster than any rating agency does.</p>`
    },
    {
      name: "CDS spread / annual premium",
      math: "\\text{Annual CDS premium} = \\text{CDS spread} \\times \\text{Notional value}",
      plain: "The CDS spread is a percentage of the insured (notional) bond value the protection buyer pays each year; multiplying the two gives the actual cash premium.",
      note: "Quoted in basis points (bps); 100 bps = 1.00%. This is a simplified statement of the periodic premium a CDS buyer pays a CDS seller for default protection.",
      derivation: `<p>Worked example from the reading: an investor holds $20 million notional of 5-year Peruvian government bonds and buys 5-year CDS protection on them at a spread of 170 basis points (1.70%):</p>
      \\[ \\text{Annual premium} = 1.70\\% \\times \\$20\\,\\text{million} = \\$340{,}000 \\]
      <p>The investor pays $340,000 a year to the CDS seller. If a credit event (default or restructuring) happens within the 5 years, the seller makes the buyer whole — either by taking the defaulted bond and paying the full $20 million notional (physical settlement), or by paying the difference between notional and the bond's post-default market value (cash settlement). If no credit event occurs, the $340,000/year is simply the cost of insurance, like a policy that never pays out.</p>`
    }
  ],

  concepts: [
    {
      name: "Four sources of country risk",
      def: "Where a country sits in the economic growth life cycle; political risk (regime type, corruption, violence, expropriation risk); legal-system quality (property-rights protection and speed of dispute resolution); and disproportionate reliance on a single commodity, product, or service.",
      intuition: "Think of these as the same four lenses you'd use to assess a company's credit risk (growth stage, governance, legal protections, revenue concentration), just scaled up to the size of a whole economy.",
      example: "Economic life cycle: in the 2008 crisis, U.S. and European equity markets fell 25%-30% while emerging markets fell 50% or more — mature economies had more cushion, young/emerging economies did not. Economic structure: countries dependent almost entirely on oil, or on tourism, or on one or two commodities (silver and copper for Peru, tourism for Jamaica) see the whole economy — not just the affected industry — suffer when that single source weakens, and small economies often lack the incentive to diversify away from a resource that's currently making a few people very wealthy.",
      pitfall: "Don't treat 'sound legal system and well governed' as sufficient protection against country risk — even well-governed emerging markets took much bigger equity hits than developed markets in 2008 purely because of where they sat in the growth cycle.",
      related: [17],
      memory: "Growth stage, Politics, Legal system, Economic concentration — GPLE."
    },
    {
      name: "Four components of political risk",
      def: "(1) Continuous vs. discontinuous risk — democracies have low but constant policy-change risk; autocracies have policies that are stable for long stretches but can change severely and suddenly (discontinuous). (2) Corruption — an implicit tax on firm profits, worsened by legal-sanction risk if a firm is caught paying a bribe. (3) Physical violence — insurance/security costs plus the physical risk to employees and investors in countries in conflict. (4) Nationalization and expropriation risk — the government seizes or arbitrarily taxes a profitable firm's assets, especially in natural-resource industries.",
      example: "Some investors actually prefer investing under stable authoritarian rule because policy is locked in and predictable, at the cost of large, sudden shocks when they do occur — international investment in Russian businesses largely disappeared after Russia's 2022 invasion of Ukraine, illustrating the discontinuous-risk cost of autocracy. Transparency International's corruption survey ranks Denmark, Finland, and New Zealand as least corrupt and South Sudan, Somalia, and Syria as most corrupt.",
      pitfall: "A tempting exam trap dresses up 'lower political risk under an authoritarian regime' as meaning corruption or property-rights problems disappear — they don't. The correct interpretation of 'lower political risk' under autocracy is specifically about government-policy stability/predictability (continuous vs. discontinuous risk), not about corruption control or legal protections, which are separate, and often worse, under autocracy.",
      related: [],
      memory: "Continuity, Corruption, Conflict (violence), Confiscation (nationalization) — the four C's of political risk."
    },
    {
      name: "Foreign vs. local currency default",
      def: "Foreign currency default: the country can't print foreign currency to pay foreign debt (intuitive). Local currency default: the country COULD print its own currency, but defaults anyway.",
      example: "Three reasons for local currency default: (1) pre-1971 gold standard constrained money printing, (2) shared currencies (euro) strip out independent monetary policy — Greece in 2015 could not unilaterally print euros to service its debt, (3) the inflation cost of debasement is sometimes judged worse than the cost of default outright, especially when a lot of foreign-currency debt is funding local-currency assets (devaluation crushes those asset values while the foreign debt burden stays the same). Historically, foreign currency defaults are far more common: over 30 between 1983 and 2021, with Greece's 2012 default on more than $264 billion the largest on record, and Latin America accounting for at least 60% of foreign currency defaults in four of the last five decades. Local currency defaults are rarer but not small — Brazil defaulted on $62 billion of local debt in 1990, the largest local-currency default on record, and Russia defaulted on $39 billion of ruble debt in 1998-1999.",
      counter: "Local currency and foreign currency defaults are not mutually exclusive: a Moody's study found the share of countries defaulting on both simultaneously rose from 5% (1960-1996) to 42% (1997-2007) — sovereign defaults are increasingly a combined event, not one or the other.",
      pitfall: "Local currency default is the more surprising, more heavily tested case — memorize all three reasons, not just 'they chose not to print money.'",
      related: [],
      memory: "Local currency default isn't about CAN'T print money — it's about printing being judged WORSE than defaulting."
    },
    {
      name: "Consequences of sovereign default",
      def: "GDP growth falls 0.5%-2.0% (typically short-lived, within the first year). Sovereign ratings run 1-2 notches lower and borrowing costs rise 0.5%-1.0% for countries that have defaulted since 1970 (effect fades over time). Bilateral trade can drop ~8% on average (trade retaliation, effects lasting up to 15 years). ~14% probability of a banking crisis following sovereign default (11 percentage points higher than non-defaulting countries, based on a study of 149 countries from 1975-2000). Political leadership turnover is more likely: a 45% increase in the probability of a change in president/prime minister, and a 64% increase in the probability of a change in finance minister/central bank head.",
      example: "Historically, defaults were sometimes followed by military intervention — Britain took over Egypt's government after its 1880s default, and Britain and France did the same to Turkey around the same period. In the modern era, the consequences are economic and political rather than military: reputational loss, market turmoil, real-output declines, and political instability.",
      pitfall: "Composite country-risk scores from different providers (PRS, Euromoney, World Bank) are NOT standardized against each other — best used as internal rankings, not cross-provider comparisons or precise cardinal risk measures.",
      related: [],
      memory: "GDP down 0.5-2%, borrowing costs up 0.5-1%, trade down ~8%, banking crisis odds ~14%, leadership turnover way up — rough magnitudes worth memorizing as a set."
    },
    {
      name: "Six factors influencing sovereign default risk",
      def: "(1) Level of indebtedness — total debt scaled to GDP, including debt owed to foreign lenders AND obligations owed to a country's own citizens (welfare, universal health care). (2) Pension and social-service commitments — larger and growing with an aging population, they raise default risk even without foreign debt. (3) Tax receipts — a larger tax base raises revenue capacity to service debt. (4) Stability of tax receipts — diversified economies and sales/VAT-based tax systems produce more stable revenue than commodity-dependent economies or income-tax systems; countries reliant on tourism (Jamaica) or a narrow commodity base (Peru's silver and copper) have less stable receipts than a diversified economy like India's. (5) Political risk — autocracies may default more readily since default puts less direct political pressure on an unelected leader, and central-bank independence limits a government's ability to simply print money. (6) Backing from other countries/entities — implicit (not explicit/guaranteed) support, such as rating agencies lowering estimated default risk for Spain, Greece, and Portugal upon EU entry, assuming stronger members like Germany and France would protect them.",
      example: "High indebtedness alone doesn't mean high default risk: the U.S., Japan, and France carry some of the highest sovereign-debt-to-GDP ratios in the world yet are considered highly creditworthy, while Egypt and El Salvador carry high default risk despite lower headline debt ratios — indebtedness is necessary context, not sufficient on its own.",
      pitfall: "Don't assume EU/currency-union membership is a guarantee against default just because of implicit backing — it is explicitly implicit, not contractual, and the 2010s European sovereign debt crisis (Greece, Portugal) showed that backing does not eliminate default risk.",
      related: [],
      memory: "Debt load, Pensions, Tax base, Tax stability, Politics, implicit Backing — six levers, and the first (debt/GDP) is necessary but not sufficient."
    },
    {
      name: "How rating agencies build and structure sovereign ratings",
      def: "The big three (Moody's, S&P, Fitch) each now rate more than 100 countries, typically publishing two ratings per country: a local currency rating (domestic-currency bonds) and a foreign currency rating (foreign-currency borrowings). The local currency rating is usually at least as high as the foreign currency rating, because a country can in principle print local currency to repay local debt but cannot print foreign currency. Two approaches link the two ratings: the notch-up approach (foreign currency rating is the primary indicator; local currency rating gets notched UP based on domestic debt-market strength) and the notch-down approach (local currency rating is primary; foreign currency rating gets notched DOWN for FX constraints). Countries that have surrendered monetary independence (e.g., eurozone members) see their local and foreign ratings converge, since the local-currency-printing advantage disappears. S&P's ratings measure probability of default; Moody's ratings measure both probability of default AND expected severity/recovery rate. The process itself: an analyst drafts a recommended rating, then a committee of roughly 5-10 people debates the underlying factors (political risk, economic structure, fiscal flexibility, external liquidity, etc.) and votes on the final rating.",
      example: "India was a rare exception where the local currency rating was LOWER than the foreign currency rating (Ba2 local vs. Baa3 foreign, March 2010) — proof the 'local ≥ foreign' pattern is a tendency, not a rule. S&P's rating-transition data (1975-2021) shows AAA-rated sovereigns had a 96.82% one-year probability of remaining AAA, while a BBB-rated sovereign had a 90.25% chance of staying put, 4.48% of being upgraded, and 5.26% of being downgraded — ratings correlate well with subsequent default: AAA sovereigns saw zero defaults within 15 months of the rating, versus 4.78% for BBB and 84.80% for CCC.",
      pitfall: "Don't assume rating changes happen at the same pace as underlying risk changes — sovereign ratings change less frequently than corporate ratings, and using longer look-back windows (15-year vs. 1-year transition data) reveals ratings are far less 'sticky' than a 1-year snapshot suggests (only 67.14% of AAA and 25.25% of BBB sovereigns held their rating over 15 years, vs. 96.82%/90.25% over 1 year).",
      related: [22],
      memory: "Local currency rating ≥ foreign currency rating, almost always — because you can print your own money but not someone else's."
    },
    {
      name: "Shortcomings of sovereign credit ratings",
      def: "(1) Upward bias — agencies tend to rate too optimistically, partly because the conflict of interest is smaller than for corporates (sovereigns pay little for the rating) but reputational damage from overrating is large, yet bias still creeps in. (2) Herd behavior — when one agency changes a rating, the others tend to follow, undermining the value of having three independent agencies. (3) Ratings aren't timely — updates lag the actual pace of a developing crisis, leaving investors exposed. (4) Overreaction/vicious cycle — agencies sometimes cut ratings too aggressively in a crisis, which then deepens the crisis they're reacting to. (5) 'Ratings failures' — clusters of multiple rating changes within a single year suggest the initial rating was simply wrong, for several underlying reasons: bad information (agencies depend on government-supplied data, which varies in quality and can be selectively rosy), limited resources (sovereign ratings are low-revenue, so analysts are stretched thin across many countries and lean on shared market information rather than independent research — feeding herd behavior), and revenue bias (agencies earn little directly from sovereign ratings but significant revenue from rating subsovereigns like states/provinces/cities, creating an incentive not to issue harsh sovereign judgments, since a sovereign downgrade typically cascades into subsovereign downgrades that subsovereigns will resist).",
      example: "A 2021 report found only 6.4% of the world's population lives in full democracies while nearly a third lives under authoritarian rule — context for why regional bias (systematically underrating whole regions, e.g. Latin America) is a persistent, documented criticism of the agencies.",
      pitfall: "The 'issuer pays the rater' conflict-of-interest story that's central to corporate-rating criticism is explicitly LESS applicable to sovereign ratings (revenue from sovereigns is small) — the exam-relevant conflict for sovereigns runs instead through subsovereign rating revenue, a subtler and different mechanism. Don't conflate the two.",
      related: [22],
      memory: "Bias up, Herd together, Slow to move, Overreact, and Failures traced to bad data / thin resources / subsovereign revenue — five shortcomings."
    },
    {
      name: "Sovereign default spread vs. CDS spread",
      def: "The sovereign default spread is the yield gap between a risky sovereign bond and a risk-free bond of the same currency/maturity (see formula above) — advantages: more dynamic/real-time than ratings, adjusts faster to new information. Disadvantages: only meaningful for foreign-currency (e.g. dollar-denominated) bonds against a risk-free benchmark — comparing local-currency bond yields across countries mixes in differing inflation expectations, not just default risk; and spreads can move for liquidity/demand reasons unrelated to default risk. The sovereign CDS spread is the annual premium (in basis points of notional) paid to buy default protection on a country's bonds (see formula above) — advantages: adjusts even faster than bond spreads (evident in the 2009-2010 European crisis, where sovereign CDS spreads for Greece and others moved well ahead of ratings), and CDS spread changes tend to lead bond yields and rating actions, are amplified by rising macro risk and currency depreciation, and cluster/move together across countries during contagion. Disadvantages: CDS spreads bundle in market and liquidity risk alongside credit risk, so reading them as pure default-risk signals overstates true credit risk, and the CDS market itself can be illiquid, distorting quoted spreads; also, a CDS only pays out if a defined credit event (default or restructuring) actually occurs — a bond can lose substantial value for other reasons without triggering any CDS payment, and the buyer bears counterparty risk that the protection seller itself may fail to pay.",
      example: "In July 2022, Colombia and Indonesia held the identical Moody's rating (Baa2), yet Colombian bonds traded at a 120bp higher default spread (2.56% vs. 1.36%) — proof that market-based spreads can diverge sharply even when the rating agency sees the two countries as equally risky. Studies confirm default spreads are positively correlated with ratings and with actual subsequent default, and typically widen ahead of a rating downgrade and narrow ahead of an upgrade — spreads lead, ratings lag, but ratings still convey information because agencies also draw on market data.",
      counter: "Neither market-based measure has been proven definitively superior to the other for predicting default — CDS spreads are not shown to beat default spreads at forecasting sovereign risk, despite reacting faster to news.",
      related: [30],
      memory: "Rating = slow but stable committee judgment. Default spread = fast, bond-market-based, only clean for hard-currency bonds. CDS spread = fastest, but bundles in liquidity/market risk and needs a real credit event to pay."
    }
  ],

  connections: {
    from: [
      { r: 17, why: "Extends the credit-risk vocabulary (default, etc.) up from firms to sovereign entities." },
      { r: 22, why: "The rating-agency process (data → committee → rating → periodic review) mirrors the corporate credit-rating process; sovereign ratings add the local-vs-foreign-currency wrinkle corporates don't have." }
    ],
    to: [
      { r: 30, why: "The sovereign CDS spread introduced here is priced with the same CDS mechanics (protection buyer/seller, credit event, cash vs. physical settlement) that R30 develops in full for corporate credit derivatives." },
      { r: 92, why: "The Credit Suisse CoCo case (Book 5) involves sovereign-adjacent regulatory intervention dynamics." }
    ],
    confused: [
      { what: "Foreign currency default vs local currency default", how: "Foreign: literal inability to print the needed currency. Local: ABLE to print, but chooses default because printing/inflation is judged costlier, or monetary policy is constrained (gold standard, shared currency)." },
      { what: "Sovereign default spread vs. sovereign CDS spread", how: "Both are market-based (not agency) measures, but the default spread is a bond-yield gap read straight off two bond prices, while the CDS spread is the premium quoted in the swap market for default insurance — they usually move together and lead ratings, but they're computed from entirely different instruments and the CDS spread additionally bundles in liquidity/market risk." },
      { what: "Notch-up approach vs. notch-down approach to local/foreign currency ratings", how: "Notch-up starts from the foreign currency rating and adjusts local currency UP for domestic strengths. Notch-down starts from the local currency rating and adjusts foreign currency DOWN for FX constraints. They're two different starting points for the same local-vs-foreign rating gap, not two different gaps." }
    ]
  },

  misconceptions: [
    { wrong: "\"A country can never rationally default on debt denominated in its own currency, since it can always print more.\"", right: "Local currency default happens precisely because the INFLATION cost of printing enough money is sometimes judged worse than defaulting outright — plus constraints like a gold standard (historical) or a shared currency (e.g., euro) can remove the printing option entirely." },
    { wrong: "\"Country risk scores from different providers (PRS, Euromoney, World Bank) can be compared directly against each other.\"", right: "They are NOT standardized against each other — each provider's score is best used as an internal ranking system, not as a precise, cross-comparable cardinal measure." },
    { wrong: "\"Lower political risk under an authoritarian regime means less corruption and better property-rights protection.\"", right: "It refers specifically to continuous vs. discontinuous policy risk — autocratic policy is stable and predictable day-to-day even though changes, when they come, can be severe. Corruption and legal-system quality are separate components of political/legal risk and are often worse, not better, under autocracy." },
    { wrong: "\"The local currency sovereign rating is always at least as high as the foreign currency rating, since a country can always print its own money.\"", right: "That's the typical pattern (because printing ability offers more flexibility for local debt), but it's not universal — India in March 2010 had a LOWER local currency rating (Ba2) than foreign currency rating (Baa3), showing the relationship is a tendency driven by underlying fundamentals, not a rule." },
    { wrong: "\"A sovereign CDS spread is a purer, better measure of default risk than a bond default spread because it updates faster.\"", right: "CDS spreads do react faster, but they bundle in market and liquidity risk on top of credit risk (potentially overstating true default risk) and the CDS market itself can be illiquid, distorting quoted prices — no study shows CDS spreads reliably outperform bond default spreads at actually predicting default." }
  ],

  highYield: [
    { stars: 3, what: "The three reasons local currency default happens despite the ability to print money.", why: "The single most surprising, most-tested concept in this reading." },
    { stars: 2, what: "Consequences of sovereign default (approximate magnitudes: GDP, borrowing costs, trade, banking crisis probability).", why: "A memorizable numeric set, occasionally tested for rough magnitude recognition." },
    { stars: 2, what: "Advantages/disadvantages of sovereign ratings vs. default spreads vs. CDS spreads, and knowing which one is 'fastest to move' vs. 'most stable.'", why: "A recurring comparison-table style exam question — expect to be asked which measure would react first to breaking news, or which measure is inappropriate for a local-currency bond comparison." },
    { stars: 2, what: "The shortcomings of sovereign rating agencies, especially why the 'issuer pays' conflict runs differently for sovereigns (subsovereign revenue) than for corporates.", why: "A frequently tested nuance that trips up students who over-apply the corporate-ratings conflict-of-interest story to sovereigns." },
    { stars: 1, what: "The four components of political risk (continuity, corruption, violence, expropriation) and the four sources of country risk overall.", why: "Foundational vocabulary the rest of the reading, and later CDS/rating material, builds on." }
  ],

  recall: [
    { q: "Why might a country with its own printing press still choose to default on local-currency debt rather than inflate it away?", a: "Because the economic cost of the resulting inflation (currency debasement, loss of purchasing power across the whole economy, potential hyperinflation) can be judged worse than the cost of an outright default — printing doesn't eliminate the pain, it just redistributes it onto everyone holding that currency. This is worse the more foreign-currency debt is funding local-currency assets, since devaluation crushes those asset values while the foreign debt itself is untouched." },
    { q: "A member of a currency union (like the eurozone) faces a debt crisis. Why is its situation different from a country with its own independent currency?", a: "A shared currency strips the country of independent monetary policy — it cannot unilaterally print more of the shared currency to ease its debt burden, removing an option a fully sovereign currency-issuing country would have (even if that option is often unattractive anyway). This is exactly why Greece could not print euros during its 2015 crisis." },
    { q: "A 10-year dollar-denominated sovereign bond yields 7.50% and the equivalent 10-year U.S. Treasury yields 3.50%. What is the sovereign default spread, and what does a WIDENING of this spread over time signal?", a: "4.00% (7.50% − 3.50%). A widening spread signals the market is pricing in rising default risk for that sovereign relative to the risk-free benchmark — and because it's market-based, it typically moves and signals this well before a rating agency would downgrade the country." },
    { q: "Why is the 'issuer pays the rater' conflict of interest, so central to criticisms of corporate credit ratings, considered much less of a direct problem for sovereign ratings — and what conflict replaces it?", a: "Sovereigns pay agencies very little directly for their ratings, so the fee-based conflict is weak; the reputational cost of overrating a sovereign is comparatively large. The conflict that replaces it runs through SUBSOVEREIGN ratings revenue: agencies earn significant fees rating states, provinces, and cities, and a sovereign downgrade typically triggers a cascade of subsovereign downgrades that those subsovereigns resist — creating an incentive against harsh sovereign judgments." },
    { q: "An investor holds $30 million notional of a country's 5-year bonds and buys CDS protection at a spread of 220 basis points. What is the annual premium, and what has to happen for the investor to actually receive a payout?", a: "Annual premium = 2.20% × $30 million = $660,000. A payout requires a defined credit event (default or debt restructuring) to actually occur during the CDS term — if the bond simply loses value for other reasons (e.g., liquidity, rate moves) with no credit event, no payout occurs, and the buyer also bears the risk that the CDS seller itself fails to pay." }
  ],

  hooks: [
    { title: "Printing isn't free", text: "A country CAN print money to pay local debt — but printing just trades a default for an inflation crisis. Sometimes leaders judge the inflation crisis worse and default anyway." },
    { title: "Three speedometers, one car", text: "A rating agency, a bond default spread, and a CDS spread are three different speedometers reading the same underlying country risk — but they update at three different speeds, and the exam wants you to know which dial moves first." }
  ],

  eli5: `<p>Imagine three different ways your friends find out you're in financial trouble. Your parents (the rating agency) hear about it eventually, through a careful conversation, and they update their opinion of you slowly and cautiously — sometimes too slowly, sometimes all your parents' friends copy each other's opinion of you without checking for themselves (herd behavior). Meanwhile, the corner store where you buy things on credit (the bond market) starts charging you a bit more interest the moment they notice you're late on a payment somewhere else — that's the default spread, reacting in real time. And the guy at school who'll sell insurance against you skipping town (the CDS market) adjusts his price for that insurance instantly based on the latest gossip, even gossip that has nothing to do with whether you'll actually skip town — which is why his price can be a little unreliable too, even though it's the fastest to move. In finance terms: sovereign credit ratings, sovereign bond default spreads, and sovereign CDS spreads are three different measures of the same country's default risk, each updating at a different speed and each with its own blind spot.</p>`,

  thinkLike: `<p>A sovereign risk analyst never trusts a single number. You triangulate: pull the credit rating for the slow-moving, committee-vetted view; pull the bond default spread for the market's real-time read (but only where a clean risk-free benchmark in the same currency exists); and pull the CDS spread for the fastest signal, while remembering it's contaminated by liquidity and market risk on top of pure credit risk. When they diverge — a Colombia trading at a materially wider spread than an equally-rated Indonesia — that divergence IS the information: it tells you the market sees something the rating committee hasn't caught up to yet, or is pricing in something (like FX or contagion risk) that isn't purely about default probability.</p>
  <p>On local-vs-foreign-currency default, the exam trains you to resist the naive "they can just print money" instinct. A risk manager's actual question is never "can they print?" but "what does printing cost them here, right now?" — is a gold standard or currency union removing the option entirely, or is it available but simply the more expensive choice given how much foreign debt is financing local assets? Expect the exam to test this exact framing: giving you a scenario (a eurozone member, a country on a historical gold standard, or a country weighing devaluation against default) and asking you to correctly classify why printing isn't happening, not whether it's physically possible.</p>`,

  breakdown: [
    {
      title: "Four sources of country risk",
      points: [
        "Economic growth life cycle — mature economies/companies are less risky than young, early-growth ones, which have less cushion and bigger swings (2008: developed equities fell 25%-30%, emerging fell 50%+).",
        "Political risk — regime type and stability, split into continuity, corruption, physical violence, and nationalization/expropriation risk.",
        "Legal system quality — how well property rights are protected and how fast disputes are resolved; slow dispute resolution is functionally the same as no property-rights protection.",
        "Economic structure/diversification — overreliance on one commodity, product, or service (oil, tourism, a single mineral) exposes the whole economy, not just that sector, to a demand or price shock."
      ]
    },
    {
      title: "Four components of political risk",
      points: [
        "Continuous vs. discontinuous risk — democracies: low but constant risk from elections; autocracies: stable policy punctuated by rare, severe, hard-to-hedge shocks.",
        "Corruption — an implicit tax on firm profits, worsened by potential legal sanctions if caught paying bribes; ranked annually by Transparency International.",
        "Physical violence — insurance/security costs plus physical risk to people, tracked by the Institute for Economics and Peace's Global Peace Index.",
        "Nationalization and expropriation risk — government seizure or arbitrary taxation of profitable firms, especially natural-resource companies."
      ]
    },
    {
      title: "Three reasons for local currency default despite the ability to print money",
      points: [
        "Gold standard (historical, pre-1971) — currency had to be backed by gold reserves, capping how much a country could print.",
        "Shared currency — union membership (e.g., the euro) removes independent monetary policy; Greece could not unilaterally print euros during its 2015 crisis.",
        "The tradeoff — printing devalues the currency and raises inflation (sometimes hyperinflation); a country weighs that cost against the cost of default, and the calculus gets worse the more foreign-currency debt is financing local-currency assets."
      ]
    },
    {
      title: "Consequences of sovereign default",
      points: [
        "GDP declines 0.5%-2.0%, typically for less than a year.",
        "Ratings run 1-2 notches lower and borrowing costs rise 0.5%-1.0% for countries with a default since 1970, fading over time.",
        "Bilateral trade drops ~8% on average via trade retaliation, with effects lasting up to 15 years.",
        "~14% probability of a banking crisis follows (11 points higher than non-defaulters, from a 149-country 1975-2000 study).",
        "Political turnover jumps: +45% probability of a president/PM change, +64% probability of a finance minister/central bank head change."
      ]
    },
    {
      title: "Six factors influencing sovereign default risk",
      points: [
        "Level of indebtedness (debt/GDP), including obligations to a country's own citizens, not just foreign lenders — necessary context but not sufficient alone (the U.S., Japan, France are highly indebted yet highly rated).",
        "Pension and social-service commitments — grow with an aging population and raise risk independent of foreign debt.",
        "Tax receipts — a larger tax base means more capacity to service debt.",
        "Stability of tax receipts — diversified economies and sales/VAT tax systems are more stable than commodity-dependent economies or income-tax systems.",
        "Political risk — autocracies may default more readily since leaders face less direct political pressure from default; central bank independence limits money-printing as an alternative.",
        "Implicit backing from other countries/entities — e.g., EU membership lowering perceived default risk for weaker members, though this is never a guarantee."
      ]
    },
    {
      title: "Shortcomings of sovereign rating agencies",
      points: [
        "Upward bias — ratings skew optimistic despite a weak direct fee-based conflict of interest for sovereigns.",
        "Herd behavior — agencies tend to follow each other's rating changes, undercutting the value of having three independent raters.",
        "Not timely enough — updates lag behind a fast-developing crisis.",
        "Overreaction / vicious cycle — cutting ratings too hard during a crisis can worsen the crisis.",
        "Ratings failures — traced to bad government-supplied information, limited analyst resources (thin coverage across many countries feeding herd behavior), and revenue bias (subsovereign rating fees discourage harsh sovereign judgments)."
      ]
    },
    {
      title: "Sovereign rating vs. default spread vs. CDS spread — advantages and disadvantages",
      points: [
        "Sovereign rating: stable, committee-vetted, comparable across issuers within one agency — but slow to update and subject to herd behavior/bias.",
        "Sovereign default spread: dynamic, market-based, calculated directly from bond yields (spread = risky yield − risk-free yield) — but only clean for hard-currency bonds against a genuine risk-free benchmark, and can move for liquidity/demand reasons unrelated to credit.",
        "Sovereign CDS spread: fastest to react, leads both bond yields and rating changes, clusters/moves together across countries under contagion — but bundles in market and liquidity risk beyond pure credit risk, can be distorted by CDS market illiquidity, and only pays out on an actual defined credit event."
      ]
    }
  ],

  quiz: [
    {
      q: "A country has never faced a gold standard constraint and is not part of a currency union. It nonetheless defaults on debt denominated in its own currency rather than printing more of it. Which explanation is most consistent with the reading?",
      options: [
        "The country's central bank physically ran out of paper currency to print.",
        "The government judged the inflation/devaluation cost of printing enough currency to be worse than the cost of default.",
        "Local currency default is impossible without a gold standard or currency union constraint, so this scenario cannot occur.",
        "The IMF legally prohibited the country from printing additional currency."
      ],
      answer: 1,
      why: "The reading gives three reasons for local currency default; absent a gold-standard or shared-currency constraint, the remaining explanation is the tradeoff — printing enough money to cover the debt would debase the currency and drive inflation high enough that the government judges default the lesser evil. The 'ran out of paper currency' answer misunderstands 'printing' as a physical/paper constraint rather than a policy/economic one. The 'impossible without a gold standard or currency union' answer wrongly claims only two of the three reasons can ever apply. The 'IMF prohibited it' answer is not mentioned in the reading — the IMF doesn't impose currency-printing prohibitions in this context."
    },
    {
      q: "Following a sovereign default, which of the following consequence magnitudes is most accurate, per the reading's cited studies?",
      options: [
        "GDP typically falls 10%-15% for a decade.",
        "Borrowing costs typically fall as investors seek safety in the defaulted country's now-cheaper bonds.",
        "GDP typically falls 0.5%-2.0%, mostly within the first year, while borrowing costs rise roughly 0.5%-1.0%.",
        "Bilateral trade is unaffected since trade partners rarely retaliate against a defaulting sovereign."
      ],
      answer: 2,
      why: "The reading's cited figures are GDP down 0.5%-2.0% (short-lived, within the first year) and borrowing costs up 0.5%-1.0%. The 'GDP falls 10%-15% for a decade' answer wildly overstates both magnitude and duration. The 'borrowing costs fall' answer reverses the actual direction (borrowing costs RISE, not fall, since investors demand more compensation for the demonstrated default risk). The 'trade unaffected' answer contradicts the ~8% average bilateral trade decline the reading cites, lasting up to 15 years."
    },
    {
      q: "A 10-year dollar-denominated Country X sovereign bond yields 8.20%. The equivalent 10-year U.S. Treasury yields 3.70%. What is Country X's sovereign default spread?",
      options: [
        "3.70%",
        "8.20%",
        "4.50%",
        "11.90%"
      ],
      answer: 2,
      why: "Sovereign default spread = risky sovereign yield − risk-free yield = 8.20% − 3.70% = 4.50%. The 3.70% answer is just the risk-free yield alone; the 8.20% answer is just the risky yield alone; the 11.90% answer incorrectly adds the two yields together instead of subtracting."
    },
    {
      q: "Which criticism of sovereign rating agencies is described as running through a DIFFERENT mechanism than the classic 'issuer pays the rater' conflict of interest central to corporate ratings?",
      options: [
        "Herd behavior among the big three agencies.",
        "Revenue bias, where agencies earn meaningful fees from rating subsovereigns (states, provinces, cities), discouraging harsh sovereign judgments since sovereign downgrades cascade into subsovereign downgrades that subsovereigns resist.",
        "Rating changes that are not timely enough during a fast-moving crisis.",
        "Overreaction that deepens an existing crisis."
      ],
      answer: 1,
      why: "The reading explicitly notes sovereigns pay agencies little directly, so the classic issuer-pays conflict is weak for sovereign ratings — the analogous conflict instead runs through subsovereign ratings revenue. Herd behavior, untimely rating changes, and crisis overreaction are all real, separately-listed shortcomings, but none of them describes a fee-based conflict of interest at all — they're about correlated behavior, speed, and reaction magnitude, not payment structure."
    },
    {
      q: "An investor holds $25 million notional of a sovereign's 5-year bonds and buys CDS protection at a spread of 300 basis points. What is the annual premium the investor pays, and under what condition does the CDS actually pay out?",
      options: [
        "$7,500 per year; pays out whenever the bond's market price declines by any amount.",
        "$750,000 per year; pays out only if a defined credit event (default or restructuring) occurs.",
        "$75,000 per year; pays out automatically at maturity regardless of the bond's performance.",
        "$750,000 per year; pays out whenever the sovereign's credit rating is downgraded."
      ],
      answer: 1,
      why: "Annual premium = CDS spread × notional = 3.00% × $25,000,000 = $750,000. A CDS only pays out on a defined credit event (default or restructuring) — a mere price decline (the '$7,500 per year, pays out on any decline' answer, which also understates the premium via a decimal error) or a rating downgrade alone (the '$750,000 per year, pays out on downgrade' answer) does not trigger payment, and there is no automatic maturity payout regardless of performance (the '$75,000 per year, pays out automatically at maturity' answer, which also miscalculates the premium)."
    },
    {
      q: "Two countries, Colombia and Indonesia, carry the identical Moody's sovereign rating (Baa2), yet Colombian dollar-denominated bonds trade at a materially higher default spread than Indonesia's. What does the reading say this divergence best illustrates?",
      options: [
        "Moody's made a data-entry error and one of the two ratings must be wrong.",
        "Market-based default spreads can diverge from, and move faster than, agency ratings, since spreads are dynamic and adjust to information the rating committee hasn't yet incorporated.",
        "Default spreads are meaningless for dollar-denominated bonds and should be ignored in favor of the rating alone.",
        "Colombia and Indonesia must be in the same currency union, causing distorted foreign currency ratings."
      ],
      answer: 1,
      why: "The reading uses exactly this Colombia/Indonesia example (a 120bp default-spread gap despite an identical Baa2 rating) to show that market-based spreads are more dynamic than ratings and can diverge from them without either rating being 'wrong.' The 'Moody's made a data-entry error' answer misreads a normal feature of the two measures as a data error. The 'spreads are meaningless for dollar bonds' answer contradicts the reading's actual point that default spreads are meaningful (for dollar-denominated bonds specifically). The 'currency union' answer is factually irrelevant to the example."
    }
  ],

  sources: [
    { title: "Sovereign Default (Investopedia)", url: "https://www.investopedia.com/terms/s/sovereign-default.asp", note: "Plain-language overview of what a sovereign default is and historical examples, complementing the reading's foreign-vs-local-currency framing." },
    { title: "Credit default swap (Wikipedia)", url: "https://en.wikipedia.org/wiki/Credit_default_swap", note: "Background on CDS mechanics (protection buyer/seller, credit events, settlement types) referenced in the sovereign CDS spread discussion." },
    { title: "Country risk (Wikipedia)", url: "https://en.wikipedia.org/wiki/Country_risk", note: "General reference on the components of country risk (political, economic, legal) that this reading breaks down in depth." },
    { title: "IMF: Sovereign Debt", url: "https://www.imf.org/en/Topics/sovereign-debt", note: "IMF's own resource hub on sovereign debt and default dynamics, useful for real-world data on debt-to-GDP levels referenced in the reading's indebtedness discussion." }
  ],

  pdf: { book: 2, query: "Sovereign risks vary across countries. Factors such as political risk, legal risk" },

  summary: `<p><strong>Country risk sources</strong>: economic life cycle stage, political risk (continuity, corruption, violence, expropriation), legal-system quality, commodity dependence. <strong>Foreign currency default</strong>: literal inability to print foreign currency. <strong>Local currency default</strong> (the surprising case): possible despite printing ability, due to (1) gold standard constraints (historical), (2) shared currency removing monetary policy independence, (3) inflation cost judged worse than default. <strong>Consequences</strong>: GDP −0.5 to −2.0%, borrowing costs +0.5 to +1.0%, trade −~8%, ~14% banking crisis probability, political turnover up sharply. <strong>Sovereign default risk factors</strong>: indebtedness, pension/social commitments, tax receipts and their stability, political risk, implicit backing. <strong>Rating agencies</strong>: local currency rating usually ≥ foreign currency rating (notch-up/notch-down approaches); process mirrors corporate ratings (analyst draft → committee vote); shortcomings include upward bias, herd behavior, slow updates, overreaction, and ratings failures traced to bad data, thin resources, and subsovereign revenue bias. <strong>Market-based alternatives</strong>: the sovereign default spread (risky bond yield − risk-free yield, dynamic but only clean for hard-currency bonds) and the sovereign CDS spread (basis points × notional, fastest-moving but bundles in liquidity/market risk and requires an actual credit event to pay). Country risk scores across providers are NOT standardized against each other.</p>`
});
