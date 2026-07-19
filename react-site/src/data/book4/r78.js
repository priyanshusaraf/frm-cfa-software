export default ({
  book: 4, reading: 78,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Covered Interest Parity Lost: Understanding the Cross-Currency Basis",
  tagline: "CIP is supposed to be an iron law — a textbook no-arbitrage condition. It's been persistently violated since 2008. This reading also covers the global USD funding gap that set the stage for that violation.",

  teaches: `<p>Covered interest parity's baseline condition, FX swaps vs. cross-currency basis swaps, the cross-currency basis and why it opened up, and — the macro backdrop — how banks funded USD asset growth, measuring the global USD funding gap, and the Fed's unprecedented central-bank swap network response.</p>`,

  why: `<p>CIP is a textbook risk-free arbitrage condition — its persistent violation since 2008 is a genuine puzzle the reading resolves via two causes (market liquidity decline, risk premia) and "limits to arbitrage." The global USD funding gap is the macro-scale version of exactly the funding-gap/rollover-risk concept from R64, scaled up to the entire global banking system.</p>`,

  intuition: `<p>Start with the vocabulary. The <strong>spot rate (S)</strong> is today's exchange rate — how many units of your home currency it takes to buy one unit of a foreign currency (FC) right now. The <strong>forward rate (F)</strong> is a rate you can lock in today for a currency exchange that actually happens at a future date — no money changes hands until that future date, but the price is fixed now. An <strong>arbitrage opportunity</strong> is a trade that produces a riskless profit with no net investment — if one exists, in theory traders pile in and trade it away almost instantly, which is why finance theory usually assumes arbitrage opportunities can't persist. A <strong>no-arbitrage condition</strong> is an equation that must hold, or such an arbitrage would exist.</p>
  <p>Covered interest parity (CIP) is exactly this kind of condition. It says there are two different ways to "invest in USD" for, say, one year, and both must deliver the identical return: (1) <em>directly</em> — just deposit the dollars and earn the USD interest rate r; or (2) <em>indirectly</em> — convert the dollars into a foreign currency at today's spot rate S, invest those FC proceeds at the foreign interest rate r*, and simultaneously lock in a forward contract today to convert the FC proceeds back into USD at the forward rate F when the year is up. Route (2) is "covered" because the future FX conversion is locked in today via the forward — you bear no exchange-rate risk. If route (2) paid a different return than route (1), you could borrow cheap on one side and invest at the higher rate on the other, using the forward to eliminate all currency risk, and pocket a risk-free profit — which is exactly why, in an efficient, frictionless market, F must adjust until the two routes pay identically. A persistent gap between these two returns is, in principle, risk-free arbitrage — which is exactly what CIP violations represent, and exactly why their survival since 2008 is such a striking anomaly for a "textbook iron law."</p>
  <p>Since 2008, USD has traded at a persistent premium in FX swaps (meaning F has been pushed higher than the interest-rate differential alone would justify — dollars are expensive to buy forward), and the cross-currency basis (b) captures the interest-rate adjustment needed to restore CIP given this "too-wide" forward premium. TWO causes explain the nonzero basis: (1) decline in market liquidity (wider bid-ask spreads eat the arbitrage profit before an arbitrageur can capture it), (2) risk premia (rising counterparty credit risk — the chance your swap counterparty fails to pay — and rising sovereign credit risk, i.e. the market pricing in some chance a government bond issuer defaults, measured via that government's sovereign CDS spread, the annual cost of insuring against its default). And THREE demand sources explain why the basis opened up post-crisis (banks hedging balance-sheet currency mismatches, institutional investors like insurers hedging FX portfolio risk, US firms issuing foreign-currency debt then swapping the proceeds back to USD) — while "limits to arbitrage" (balance-sheet expansion brings credit/capital/funding/liquidity risk, and post-crisis regulatory pressure discourages this) explain why the gap hasn't closed despite being, in principle, free money.</p>
  <p>The USD funding gap scales this same tension to the entire global banking system. A funding gap exists whenever USD asset investment horizons exceed the maturity of the USD liabilities/swaps funding them — a bank buys long-dated USD assets (loans, structured products, Treasuries) but funds them with short-term USD borrowing that must be rolled over again and again before the asset matures. Domestic-currency mismatches are backstopped by the home central bank (lender of last resort in its own currency, meaning it can always print more of its own money to bail out a bank facing a run) — but no central bank outside the Fed can create USD, making foreign-currency funding gaps structurally more dangerous: a European bank facing a USD funding freeze cannot simply ask its own central bank to print dollars. The BIS estimated this gap at roughly $1–1.2 trillion for European banks by mid-2007 (rising to $2–2.2 trillion under a stricter assumption); it later fell to an estimated $583 billion by early 2009 if banks genuinely unwound their positions, or a truer $880 billion if they instead rolled the positions over (the smaller, headline number is misleadingly flattered by asset write-downs, not real deleveraging). The Fed's swap-line network — first with the ECB and Swiss National Bank, later widened, then made <em>unlimited</em> for the ECB, Bank of England, and Swiss National Bank in late 2008 — made the Fed, in effect, an international lender of last resort; usage peaked at that $583 billion figure and fell back to roughly $50 billion by late 2009 once the network calmed the panic.</p>`,

  formulas: [
    {
      name: "Covered interest parity",
      math: "F = S\\times\\dfrac{1+r}{1+r^{*}}\\quad\\text{equivalently}\\quad (F-S) = S\\times (r-r^{*})",
      note: "r=USD rate, r*=foreign currency rate, S=spot, F=forward. A gap between these two 'invest in USD' returns is risk-free arbitrage.",
      plain: "This formula says the forward exchange rate must be set so that converting USD to a foreign currency, earning the foreign interest rate, and locking in the reconversion back to USD gives exactly the same return as simply earning the USD interest rate directly — the second form says the forward premium (F−S), in currency units, equals the spot rate times the interest-rate gap between the two currencies.",
      derivation: `<p>Compare the two ways to "invest in USD" for one period, per \\(1\\) unit of USD invested:</p>
      <p><strong>Route 1 (direct):</strong> invest \\(1\\) USD at the USD rate \\(r\\); it grows to \\((1+r)\\) USD.</p>
      <p><strong>Route 2 (covered, via FC):</strong> convert \\(1\\) USD to FC at the spot rate, giving \\(1/S\\) units of FC; invest that at the foreign rate \\(r^{*}\\), growing to \\((1/S)(1+r^{*})\\) units of FC; lock in today, via a forward contract, the reconversion of those FC proceeds back to USD at the forward rate \\(F\\), giving \\((1/S)(1+r^{*})\\times F\\) USD at maturity.</p>
      <p>No-arbitrage requires these two USD payoffs to be identical:</p>
      \\[ (1+r) = \\dfrac{1+r^{*}}{S}\\times F \\]
      <p>Solving for \\(F\\):</p>
      \\[ F = S\\times\\dfrac{1+r}{1+r^{*}} \\]
      <p>Rearranging gives the second, additive form often quoted for small rate differentials:</p>
      \\[ F - S = S\\times (r - r^{*}) \\]
      <p>If the observed market \\(F\\) differs from this no-arbitrage value, an arbitrageur can borrow on the cheap side, invest on the expensive side, and lock in a riskless profit via the forward — which is exactly the trade CIP violations are supposed to make impossible.</p>`
    },
    {
      name: "Cross-currency basis",
      math: "b = \\text{the adjustment to the USD leg's rate that restores CIP given a too-wide forward premium } (F-S)",
      note: "Since 2008, USD trades at a persistent premium, so b is typically positive: USD borrower pays the basis on top; FC borrower pays less by the basis amount.",
      plain: "This says that when the observed forward premium (F−S) is wider than CIP alone would justify, the market restores balance not by moving F or S, but by adjusting the interest rate paid on the USD leg of a cross-currency swap by an amount b — the party borrowing USD ends up paying extra (rate + b), while the party borrowing the foreign currency pays less (rate − b), until the two legs are again fairly priced against each other."
    }
  ],

  concepts: [
    {
      name: "Covered interest parity — the baseline condition",
      def: "F = S×(1+r)/(1+r*). Two ways to 'invest in USD' should have identical return: invest directly at r, or convert to FC at spot, invest at r*, and lock in reconversion at the forward rate F. S (spot rate) is today's exchange rate; F (forward rate) is a rate fixed today for an exchange that settles at a future date, so route 2 carries zero currency risk despite investing abroad — it is 'covered.'",
      intuition: "Think of it as two identical savings accounts denominated in different currencies, with a currency-risk-free bridge (the forward contract) connecting them. If one account paid more than the other after accounting for that bridge, everyone would pile into the higher-paying route, pushing its price back into line — this is why, absent frictions, F must always sit at exactly S×(1+r)/(1+r*).",
      pitfall: "A gap between these two returns is a risk-free arbitrage — which is exactly what CIP violations represent. This is supposed to be an iron law, making its persistent post-2008 violation a genuine puzzle.",
      related: []
    },
    {
      name: "FX swaps vs. cross-currency basis swaps",
      def: "FX swap: short-term (<1yr), reconversion at maturity at the forward rate F, no interim payments (single forward points quote). Cross-currency basis swap: long-term (often >1yr), reconversion at the ORIGINAL spot rate S, periodic interest exchanged (each leg's reference rate + the basis b). Both instruments are ways of exploiting or expressing a CIP-arbitrage view; the reading illustrates them with USD-per-FC swaps against a second currency such as the euro or the Japanese yen.",
      example: "In an FX swap, one party lends USD and borrows the FC (or vice versa) today at spot, and the two sides simultaneously agree to reverse the exchange at maturity at the pre-agreed forward rate F — the whole trade is quoted as a single number, the forward points (F−S), with no cash exchanged in between. In a cross-currency basis swap running for, say, five years, the two parties still swap principal at spot today and back at the SAME spot rate S at the end, but in between they pay each other periodic floating-rate interest on the principal amounts — one side's payment includes the basis b on top of its reference rate.",
      related: ["Cross-currency basis"]
    },
    {
      name: "Cross-currency basis",
      def: "b = the adjustment to the USD leg's rate that restores CIP, given a 'too-wide' forward premium (F−S). Since 2008, USD has traded at a persistent premium in FX swaps, so basis b is typically positive.",
      pitfall: "If CIP held exactly, b=0 and the cross-currency swap is just a plain floating-for-floating currency swap. The cross-currency basis and the forward premium (F−S) are RELATED BUT DISTINCT — the basis is specifically the interest-rate adjustment needed to restore CIP given an observed forward premium, not the forward premium itself.",
      related: [],
      memory: "b=0 means CIP holds perfectly. Since 2008, b is typically positive — the USD borrower pays extra, the FC borrower pays less."
    },
    {
      name: "Two causes of a nonzero basis",
      def: "(1) Decline in market liquidity in underlying spot/forward FX — wider bid-ask spreads raise the transaction cost of executing the arbitrage, eating the potential profit. (2) Risk premia from rising counterparty credit risk and rising sovereign credit risk (measured via sovereign CDS spreads) — even small risk-premia increases can matter a lot if one currency's hedging demand is large.",
      related: ["Why the basis opened and hasn't closed"]
    },
    {
      name: "Why the basis opened (demand) and why it hasn't closed (limits to arbitrage)",
      def: "Three demand sources: banks hedging balance-sheet currency mismatches via FX swaps; institutional investors hedging foreign-currency portfolio risk; U.S. nonfinancial firms issuing foreign-currency debt when foreign credit spreads narrow, then swapping proceeds back to USD.",
      pitfall: "Exploiting the basis requires EXPANDING the arbitrageur's balance sheet, which brings credit risk (both legs), capital/funding risk, and mark-to-market liquidity risk. Post-crisis regulatory, shareholder, and creditor pressure has made market participants manage balance sheets far more conservatively — these 'limits to arbitrage' are why persistent CIP violations survive despite being, in principle, a textbook risk-free arbitrage.",
      related: [],
      memory: "The arbitrage is 'free money' on paper, but actually capturing it requires balance-sheet expansion that regulators and shareholders now punish — that's why the gap persists."
    },
    {
      name: "How banks funded USD asset growth (three channels)",
      def: "Borrow domestic currency → convert spot → buy the USD asset; convert domestic liabilities to USD via FX swap; borrow USD directly in the interbank market.",
      pitfall: "A funding gap exists whenever the USD asset investment horizon EXCEEDS the maturity of the USD liabilities/swaps funding it — domestic-currency mismatches are backstopped by the home central bank (lender of last resort in its own currency), but NO central bank outside the Fed can create USD, so foreign-currency funding gaps are structurally MORE dangerous.",
      related: [{ r: 64, label: "R64 — the generic funding-gap/rollover-risk concept this scales up globally" }],
      memory: "Your own central bank can always print your own currency. No foreign central bank can print USD — that asymmetry is the whole reason the USD funding gap was structurally dangerous."
    },
    {
      name: "Measuring the funding gap: bounds via nonbank liability maturity",
      def: "If USD liabilities to nonbanks are longer-term: lower bound = net USD position to nonbanks. If shorter-term: upper bound = gross USD position to nonbanks.",
      example: "BIS estimated the European bank USD funding gap at $1-1.2 trillion by mid-2007 (rising to $2-2.2 trillion if money-market funding is also treated as short-term).",
      pitfall: "Vulnerabilities are visible only at the CONSOLIDATED, GLOBAL balance sheet level — a bank's home-country balance sheet alone can badly understate true exposure, since foreign offices often book the majority of foreign-currency claims (Switzerland: ~80% of total consolidated assets are foreign claims, ~80% of which are booked outside Switzerland itself).",
      related: [],
      memory: "Look only at the home-country balance sheet, and you'll badly underestimate the true USD funding gap — the real exposure often lives in foreign offices."
    },
    {
      name: "Causes of the shortage & the Fed's swap network response",
      def: "Causes: maturity transformation growth, disrupted FX swap markets, money markets shunning bank paper, central banks drawing down their own USD reserves, illiquid USD assets that couldn't be sold without large losses, off-balance-sheet vehicles returning to balance sheets, drawn-down credit commitments.",
      example: "Policy response: the Fed extended reciprocal swap lines to other central banks (ECB, Swiss National Bank first, later Canada/England/Japan), collateralized by foreign currency, letting foreign central banks auction USD locally even to banks with no U.S. subsidiary. Made UNLIMITED for the ECB, BoE, and Swiss National Bank in late 2008 — effectively making the Fed an international lender of last resort. Under a reciprocal swap arrangement, the Fed lends dollars to a foreign central bank in exchange for an equivalent amount of that bank's own currency (collateral) with a promise to reverse the exchange later; the foreign central bank then auctions those dollars to banks in its own jurisdiction. Usage peaked at $583 billion around the height of the crisis and fell back to roughly $50 billion by late 2009 as the panic eased, and the ECB, BoE, and SNB together came to account for around 80% of total swap-line usage.",
      pitfall: "Two structural benefits of the swap network: only the Fed can create unlimited USD (a template transferable to other currencies), and the network created NO Fed counterparty credit risk since the lines were fully collateralized (credit monitoring of individual banks remained the foreign central bank's job).",
      related: [],
      memory: "The Fed became an international lender of last resort — fully collateralized, so it took on zero counterparty credit risk despite lending across borders."
    }
  ],

  connections: {
    from: [
      { r: 64, why: "The generic funding-gap/rollover-risk concept there scales up to the entire global banking system's USD exposure here." },
      { r: 76, why: "Repo and FX swap mechanics both hinge on collateralized short-term secured financing logic." }
    ],
    to: [
      { r: 79, why: "Duration gap and ALM techniques provide the domestic-currency analogue of managing rate/currency mismatch risk." }
    ],
    confused: [
      { what: "FX swap vs cross-currency basis swap", how: "FX swap: short-term, single forward-rate reconversion, no interim payments. Cross-currency basis swap: long-term, reconversion at ORIGINAL spot rate, periodic interest exchanges including the basis." },
      { what: "Cross-currency basis vs forward premium (F−S)", how: "The forward premium is the raw observed gap; the basis is the specific INTEREST-RATE ADJUSTMENT needed to restore CIP given that observed premium — related but not the same number." },
      { what: "Domestic-currency funding gap vs foreign-currency (USD) funding gap", how: "Domestic mismatches are backstopped by the home central bank (can always print its own currency); foreign-currency (USD) funding gaps have NO such backstop outside the Fed itself, making them structurally more dangerous." }
    ]
  },

  misconceptions: [
    { wrong: "\"The cross-currency basis and the forward premium (F−S) are the same measurement.\"", right: "They are related but distinct — the basis is the interest-rate ADJUSTMENT needed to restore CIP given an observed forward premium, not the forward premium itself." },
    { wrong: "\"Since exploiting a positive cross-currency basis is a risk-free arbitrage, it should have been competed away by now.\"", right: "Exploiting the basis requires EXPANDING the arbitrageur's balance sheet, bringing credit/capital/funding/liquidity risk — post-crisis regulatory and shareholder pressure has made this balance-sheet expansion costly enough that these 'limits to arbitrage' allow the violation to persist despite being risk-free in principle." },
    { wrong: "\"A bank's home-country balance sheet gives an accurate picture of its true USD funding exposure.\"", right: "Vulnerabilities are visible only at the CONSOLIDATED, GLOBAL level — foreign offices often book the majority of foreign-currency claims, so a home-country-only view can badly understate true exposure (Switzerland's ~80%/~80% example)." },
    { wrong: "\"Any central bank can act as lender of last resort for USD-denominated obligations within its jurisdiction.\"", right: "NO central bank outside the Fed can create USD — foreign central banks can only provide USD liquidity to their banks by first obtaining it from the Fed (via the swap lines), making foreign-currency funding gaps structurally more dangerous than domestic-currency mismatches." }
  ],

  highYield: [
    { stars: 4, what: "CIP formula and the cross-currency basis's meaning (interest-rate adjustment restoring CIP, not the forward premium itself).", why: "The core conceptual foundation of this reading, frequently tested for the basis-vs-premium distinction." },
    { stars: 4, what: "Two causes of nonzero basis (liquidity decline, risk premia) and three demand sources plus limits to arbitrage explaining persistence.", why: "A complete causal story GARP likes to test as 'why hasn't this arbitrage been closed.'" },
    { stars: 4, what: "Why foreign-currency (USD) funding gaps are structurally more dangerous than domestic mismatches — no foreign central bank can print USD.", why: "The central conceptual insight of the USD shortage material, and the Fed swap-line response it motivated." },
    { stars: 3, what: "FX swap vs cross-currency basis swap: term, reconversion rate, interim payments.", why: "A clean instrument-comparison table, good for matching questions." },
    { stars: 3, what: "Consolidated global balance sheet view needed to see true USD funding gap (Switzerland example).", why: "A vivid, specific illustration of a subtle measurement point." }
  ],

  recall: [
    { q: "Why is a persistently positive cross-currency basis considered a 'textbook risk-free arbitrage' that nonetheless hasn't been closed?", a: "In principle, an arbitrageur could borrow at the cheaper rate implied by the basis and lend at the more expensive rate, capturing the spread risk-free. In practice, executing this trade requires expanding the arbitrageur's balance sheet — bringing credit risk on both legs, capital/funding risk, and mark-to-market liquidity risk. Post-crisis regulatory, shareholder, and creditor pressure has made market participants manage their balance sheets far more conservatively, creating 'limits to arbitrage' that prevent the basis from closing despite its risk-free appearance." },
    { q: "Why couldn't European central banks simply act as lender of last resort to solve their own banks' USD funding gap during the 2008 crisis?", a: "No central bank outside the Federal Reserve can create U.S. dollars — European central banks could provide unlimited amounts of their OWN currency to their banks, but not USD. This structural asymmetry is precisely why the Fed's swap-line network was necessary: it let foreign central banks obtain USD from the Fed (collateralized by foreign currency) and then auction it to their own banks locally." },
    { q: "Why might a bank's home-country regulatory balance sheet understate its true USD funding vulnerability?", a: "Vulnerabilities are visible only at the CONSOLIDATED, GLOBAL balance sheet level. Many banks book the majority of their foreign-currency claims through foreign offices/subsidiaries rather than the home-country entity — as the Swiss example illustrates (~80% of total consolidated assets are foreign claims, ~80% of which are booked outside Switzerland itself), so looking only at the domestic balance sheet would miss the bulk of the actual USD exposure." }
  ],

  hooks: [
    { title: "Free money that isn't free to grab", text: "CIP violations look like a $20 bill on the sidewalk — but picking it up means expanding your balance sheet, which regulators and shareholders now tax heavily. The bill stays on the sidewalk not because it's fake, but because bending down costs more than it used to." },
    { title: "Only one printer makes dollars", text: "Every central bank has its own printing press for its own currency — but there's only ONE dollar printer, and it's in Washington. That's the entire reason a USD funding gap is scarier than a domestic one, and why the Fed's swap lines were such a structurally unusual policy tool." }
  ],

  summary: `<p><strong>CIP</strong>: F=S(1+r)/(1+r*) — a violation is risk-free arbitrage in principle. <strong>FX swaps</strong> (short-term, forward-rate reconversion) vs. <strong>cross-currency basis swaps</strong> (long-term, original-spot reconversion, periodic basis payments). <strong>Cross-currency basis b</strong>: the rate adjustment restoring CIP (distinct from the forward premium F−S); positive since 2008 (USD borrower pays extra). <strong>Two causes</strong> of nonzero basis: liquidity decline, risk premia. <strong>Three demand sources</strong> (bank hedging, institutional hedging, US firms' FX debt issuance) explain why it opened; <strong>limits to arbitrage</strong> (balance-sheet expansion costs) explain why it hasn't closed. <strong>USD funding gap</strong>: exists whenever USD asset horizons exceed funding maturity; foreign-currency gaps are structurally more dangerous since no non-Fed central bank can create USD; visible only at the CONSOLIDATED GLOBAL level. <strong>Fed's swap network</strong>: unlimited, fully-collateralized lines to key central banks — zero Fed counterparty risk, effectively making the Fed an international lender of last resort.</p>`,

  eli5: `<p>Imagine two friends, Amy and Ben, want to lend each other $100 for a year, but Ben only trusts euros. So they agree: Amy hands Ben $100 worth of euros today (at today's exchange rate), and separately they sign a paper today that fixes exactly how many dollars those euros will convert back into a year from now, no matter what the "real" exchange rate turns out to be then. Because that future conversion rate is locked in today, Amy has zero exchange-rate risk — she just gets a slightly different euro interest rate instead of the dollar one. If it were ever possible for Amy to come out ahead doing this roundabout euro trip compared to just lending Amy's dollars directly, everyone would rush to do the same trip and the "locked-in" rate would get bid back into balance almost instantly — that's the everyday intuition behind covered interest parity. But since 2008, that locking-in price has stayed persistently "off," like a vending machine that's been overcharging for a candy bar for over a decade and nobody fixes it — not because nobody noticed, but because "fixing" it (arbitraging it away) requires banks to tie up capital and take on risk in a way regulators now discourage. That candy-bar overcharge maps to the cross-currency basis: a small, persistent, seemingly free-money gap that survives because grabbing it isn't actually free for the bank that would have to grab it.</p>`,

  thinkLike: `<p>A bank treasurer or FX risk manager treats a nonzero cross-currency basis not as "found money" but as a balance-sheet decision with a price tag: capturing it means borrowing on one side and lending on the other, both of which sit on the bank's balance sheet and consume capital, funding, and counterparty-credit-risk limits that are scarce and regulated (leverage ratio, liquidity coverage ratio, counterparty credit limits). The practitioner's question is never "is there a free lunch?" — it's "does the basis, net of the capital charge and the funding cost of expanding my balance sheet to capture it, still clear my hurdle rate?" Often the answer is no, which is exactly why the basis survives. At the macro level, a central bank or treasury official watching the USD funding gap asks a parallel question: not "do we have enough dollar assets?" but "what happens if we cannot roll over our dollar liabilities next week?" — because a funding gap only becomes a crisis at the rollover date, not before.</p>
  <p>On the exam, GARP tests this reading three ways: (1) definitional/mechanical questions distinguishing FX swaps from cross-currency basis swaps (term, reconversion rate, interim payments) and the basis from the raw forward premium; (2) "why hasn't this arbitrage closed" causal-chain questions, which require you to cite BOTH halves of the story (demand sources that opened the gap, AND limits to arbitrage that keep it open) rather than just one; and (3) USD funding-gap questions that hinge on the asymmetry between domestic and foreign-currency lender-of-last-resort capacity — expect a question phrased as "why is a USD funding gap worse than a domestic-currency one," where the correct answer always traces back to "no central bank outside the Fed can create USD."</p>`,

  breakdown: [
    {
      title: "FX swap vs. cross-currency basis swap",
      points: [
        "Term: FX swap is short-term (typically under 1 year); cross-currency basis swap is long-term (often over 1 year).",
        "Reconversion rate at maturity: FX swap reconverts at the pre-agreed forward rate F; cross-currency basis swap reconverts at the ORIGINAL spot rate S from when the trade started.",
        "Interim payments: FX swap has none — it is a single forward-points quote settled only at maturity; cross-currency basis swap exchanges periodic interest throughout its life, with the basis (b) added to one leg's reference rate."
      ]
    },
    {
      title: "Two causes of a nonzero cross-currency basis",
      points: [
        "Decline in market liquidity: wider bid-ask spreads in the underlying spot/forward FX markets raise the transaction cost of executing the CIP arbitrage, eating into or eliminating the theoretical profit.",
        "Risk premia: rising counterparty credit risk (the chance your FX-swap or basis-swap counterparty fails) and rising sovereign credit risk (measured via sovereign CDS spreads on the government bonds used in the arbitrage) — even small increases matter a lot when hedging demand for one currency is large."
      ]
    },
    {
      title: "Three demand sources for the basis opening up post-crisis",
      points: [
        "Banks hedging currency mismatches on their own balance sheets using FX swaps.",
        "Institutional investors (insurers, banks) hedging foreign-currency risk in their investment portfolios using FX swaps.",
        "U.S. nonfinancial firms issuing foreign-currency-denominated debt when foreign credit spreads narrow, then swapping the FC proceeds back to USD using FX swaps."
      ]
    },
    {
      title: "Why the basis has not closed: limits to arbitrage",
      points: [
        "Capturing the basis requires EXPANDING the arbitrageur's balance sheet — you must actually borrow on one side and lend on the other.",
        "That expansion brings credit risk on BOTH legs of the trade (the borrowing leg and the lending leg).",
        "It also brings capital risk and funding risk — the trade consumes regulatory capital and funding capacity that could be used elsewhere.",
        "It brings mark-to-market liquidity risk — interim valuation swings can trigger margin/collateral calls before the arbitrage profit is realized.",
        "Post-crisis pressure from regulators, shareholders, and creditors has made banks manage their balance sheets far more conservatively, so these risks now outweigh the arbitrage profit for most participants — which is why the 'free money' persists uncaptured."
      ]
    },
    {
      title: "Three channels banks used to fund USD asset growth",
      points: [
        "Borrow in domestic currency, convert to USD at spot, and use the proceeds to buy the USD asset.",
        "Convert domestic-currency liabilities into USD via an FX swap.",
        "Borrow USD directly in the interbank market."
      ]
    },
    {
      title: "Causes of the pre-crisis USD funding shortage",
      points: [
        "Growth in maturity transformation — longer-dated USD assets funded with shorter-dated liabilities.",
        "Disrupted FX swap markets, which raised the cost and difficulty of rolling over USD funding.",
        "Money markets withdrawing from bank-issued paper (unwilling to keep buying bank commercial paper/CDs).",
        "Central banks drawing down their own USD foreign-exchange reserves to help their banks.",
        "Illiquid USD assets (e.g., structured products) that could not be sold without large losses, lengthening the effective holding period.",
        "Off-balance-sheet vehicles returning to the balance sheet, adding to funding needs.",
        "Drawn-down credit commitments, which pulled additional USD funding demand onto bank balance sheets."
      ]
    },
    {
      title: "Two structural benefits of the Fed's swap-line network",
      points: [
        "Only the Fed can create unlimited USD — a capability no other central bank has for the dollar, making the Fed uniquely positioned as an international backstop (and a template later referenced for other currencies).",
        "The network created no counterparty credit risk for the Fed, because every swap line was fully collateralized by the foreign central bank's own currency — day-to-day credit monitoring of individual foreign banks stayed the job of the foreign central bank, not the Fed."
      ]
    }
  ],

  quiz: [
    {
      q: "Covered interest parity holds when the USD interest rate r=5%, the euro interest rate r*=1%, and the spot rate is S=1.10 USD/EUR. What forward rate F does CIP imply?",
      options: ["F ≈ 1.1436 USD/EUR", "F ≈ 1.0590 USD/EUR", "F = 1.10 USD/EUR (unchanged)", "F ≈ 1.1500 USD/EUR"],
      answer: 0,
      why: "F = S×(1+r)/(1+r*) = 1.10×1.05/1.01 ≈ 1.1436. The 1.0590 answer comes from swapping r and r* (using the LOWER rate on top); the unchanged 1.10 answer comes from ignoring the interest-rate differential entirely (forgetting CIP requires any forward premium at all); the 1.1500 answer comes from naively adding S×(r+r*) instead of using the correct r−r* differential relationship embedded in the ratio formula."
    },
    {
      q: "The cross-currency basis (b) is best described as:",
      options: [
        "The raw difference between the forward rate and the spot rate, F−S",
        "The interest-rate adjustment to the USD leg needed to restore CIP given an observed forward premium",
        "The interest-rate differential between the two currencies, r−r*",
        "The bid-ask spread on the underlying FX swap market"
      ],
      answer: 1,
      why: "The basis is specifically the rate adjustment that restores CIP given the observed forward premium — it is related to, but distinct from, the raw F−S gap itself, and distinct from the plain interest-rate differential r−r*, which is the quantity CIP says the forward premium SHOULD equal in the absence of a basis. The 'bid-ask spread' answer confuses the basis with a transaction-cost concept that is merely one of its two underlying CAUSES."
    },
    {
      q: "Since the 2008 financial crisis, why has a persistently positive cross-currency basis NOT been arbitraged away, even though it represents a textbook risk-free profit opportunity?",
      options: [
        "Regulators have made cross-currency basis swaps illegal for most banks",
        "The basis is actually zero once transaction costs are properly measured",
        "Capturing it requires expanding the arbitrageur's balance sheet, and post-crisis capital/funding/credit-risk pressures make that expansion too costly for most participants",
        "Central banks directly intervene to prevent the basis from closing"
      ],
      answer: 2,
      why: "This is the 'limits to arbitrage' explanation: exploiting the basis needs balance-sheet expansion, which brings credit risk on both legs plus capital, funding, and mark-to-market liquidity risk — post-crisis regulatory and shareholder pressure has made this too costly to fully arbitrage away. The basis swaps remain perfectly legal, ruling out the 'illegal' answer; the basis is a real, measured, nonzero rate, ruling out the 'actually zero' answer; and there is no direct central-bank intervention mechanism described in the reading, ruling out the 'central banks intervene' answer."
    },
    {
      q: "A European bank has USD assets with an investment horizon longer than the maturity of the USD liabilities and FX swaps funding them. What is this called, and why is it structurally more dangerous than an equivalent domestic-currency mismatch?",
      options: [
        "A duration gap; it is more dangerous because duration gaps cannot be hedged with derivatives",
        "A liquidity coverage shortfall; it is more dangerous because the LCR only applies to domestic-currency liabilities",
        "A funding gap; it is more dangerous because no central bank outside the Federal Reserve can create U.S. dollars, so the bank's own central bank cannot act as an unlimited lender of last resort in USD",
        "A basis-swap mismatch; it is more dangerous because cross-currency basis swaps always require full USD collateral upfront"
      ],
      answer: 2,
      why: "This is a USD funding gap — a currency mismatch that exists whenever the asset investment horizon exceeds the funding maturity. It's structurally more dangerous than a domestic-currency mismatch because the bank's home central bank can always print unlimited amounts of its OWN currency to backstop a domestic mismatch, but no central bank besides the Fed can create USD, so a USD funding gap has no equivalent automatic backstop absent Fed swap-line support."
    },
    {
      q: "Why might looking only at a bank's home-country (unconsolidated) balance sheet significantly understate its true USD funding vulnerability?",
      options: [
        "Home-country balance sheets exclude derivatives entirely",
        "Foreign offices often book the majority of a bank's foreign-currency claims, so a home-country-only view misses most of the actual exposure — as in Switzerland, where roughly 80% of consolidated foreign claims are booked outside Switzerland itself",
        "Regulators require banks to report understated figures domestically for tax reasons",
        "Home-country balance sheets only capture retail deposits, not wholesale funding"
      ],
      answer: 1,
      why: "Vulnerabilities are visible only at the consolidated, global balance-sheet level because foreign offices often book the bulk of foreign-currency claims — the reading's Swiss example shows about 80% of total consolidated assets are foreign claims, and about 80% of THOSE are booked outside Switzerland. The other options are not supported by the reading and mischaracterize why the gap is hidden (it's a booking-location issue, not a derivatives, tax, or deposit-type issue)."
    },
    {
      q: "The Fed's swap lines with the ECB, Bank of England, and Swiss National Bank were made unlimited in late 2008. Roughly how did total swap-line usage evolve, and what was the key structural benefit to the Fed of running this program?",
      options: [
        "Usage rose steadily through 2010 and never declined; the key benefit was earning above-market interest income",
        "Usage peaked at roughly $583 billion and fell to about $50 billion by late 2009; the key benefit was that the fully-collateralized lines created no Fed counterparty credit risk",
        "Usage stayed flat near $50 billion throughout the crisis; the key benefit was avoiding any exposure to foreign-currency collateral",
        "Usage peaked at roughly $2.2 trillion, matching the upper-bound funding-gap estimate; the key benefit was direct monitoring authority over individual foreign banks"
      ],
      answer: 1,
      why: "Swap-line usage peaked around $583 billion at the height of the crisis and fell back to roughly $50 billion by late 2009 as conditions normalized. Because every swap line was fully collateralized by the foreign central bank's own currency, the Fed took on no counterparty credit risk — and it explicitly did NOT take on direct monitoring authority over individual foreign banks, which remained each foreign central bank's responsibility, ruling out the '$2.2 trillion / direct monitoring authority' answer, which also confuses the funding-gap estimate with actual swap usage."
    }
  ],

  sources: [
    { title: "Interest rate parity", url: "https://en.wikipedia.org/wiki/Interest_rate_parity", note: "Background on the covered/uncovered interest parity conditions and the no-arbitrage logic behind CIP." },
    { title: "Covered Interest Rate Parity Definition", url: "https://www.investopedia.com/terms/c/covered-interest-arbitrage.asp", note: "A plain-language walkthrough of the covered interest arbitrage trade and formula." },
    { title: "Covered interest parity lost: understanding the cross-currency basis", url: "https://www.bis.org/publ/qtrpdf/r_qt1609e.htm", note: "The original BIS Quarterly Review article (Borio, McCauley, McGuire, Sushko, 2016) this reading is based on." },
    { title: "Central bank liquidity swaps", url: "https://www.federalreserve.gov/monetarypolicy/bst_liquidityswaps.htm", note: "The Federal Reserve's own description of the reciprocal currency (swap) line program discussed in this reading." }
  ],

  pdf: { book: 4, query: "why have deviations from covered interest parity (CIP) persisted since the financial crisis" }
});
