FRM.register({
  book: 4, reading: 78,
  session: "Repos, Transfer Pricing & Rate Risk",
  title: "Covered Interest Parity Lost: Understanding the Cross-Currency Basis",
  tagline: "CIP is supposed to be an iron law — a textbook no-arbitrage condition. It's been persistently violated since 2008. This reading also covers the global USD funding gap that set the stage for that violation.",

  teaches: `<p>Covered interest parity's baseline condition, FX swaps vs. cross-currency basis swaps, the cross-currency basis and why it opened up, and — the macro backdrop — how banks funded USD asset growth, measuring the global USD funding gap, and the Fed's unprecedented central-bank swap network response.</p>`,

  why: `<p>CIP is a textbook risk-free arbitrage condition — its persistent violation since 2008 is a genuine puzzle the reading resolves via two causes (market liquidity decline, risk premia) and "limits to arbitrage." The global USD funding gap is the macro-scale version of exactly the funding-gap/rollover-risk concept from R64, scaled up to the entire global banking system.</p>`,

  intuition: `<p>Covered interest parity says two ways to "invest in USD" should have identical return: invest directly at the USD rate, or convert to a foreign currency, invest at the foreign rate, and lock in reconversion at the forward rate. A persistent gap between these two returns is, in principle, risk-free arbitrage — which is exactly what CIP violations represent.</p>
  <p>Since 2008, USD has traded at a persistent premium in FX swaps, and the cross-currency basis (b) captures the interest-rate adjustment needed to restore CIP given this "too-wide" forward premium. TWO causes explain the nonzero basis: (1) decline in market liquidity (wider bid-ask spreads eat the arbitrage profit), (2) risk premia (rising counterparty and sovereign credit risk). And THREE demand sources explain why the basis opened up post-crisis (banks hedging balance-sheet mismatches, institutional investors hedging FX portfolio risk, US firms issuing foreign-currency debt) — while "limits to arbitrage" (balance-sheet expansion brings credit/capital/funding/liquidity risk, and post-crisis regulatory pressure discourages this) explain why the gap hasn't closed despite being, in principle, free money.</p>
  <p>The USD funding gap scales this same tension to the entire global banking system: a funding gap exists whenever USD asset investment horizons exceed the maturity of the USD liabilities/swaps funding them. Domestic-currency mismatches are backstopped by the home central bank (lender of last resort in its own currency) — but no central bank outside the Fed can create USD, making foreign-currency funding gaps structurally more dangerous. The Fed's swap-line network made it, in effect, an international lender of last resort.</p>`,

  formulas: [
    { name: "Covered interest parity", math: "F = S\\times (1+r)/(1+r*); equivalently (F-S) = S\\times (r-r*)", note: "r=USD rate, r*=foreign currency rate, S=spot, F=forward. A gap between these two 'invest in USD' returns is risk-free arbitrage." },
    { name: "Cross-currency basis", math: "b = \\text{adjustment to the USD leg's rate that restores CIP}", note: "Since 2008, USD trades at a persistent premium, so b is typically positive: USD borrower pays the basis on top; FC borrower pays less by the basis amount." }
  ],

  concepts: [
    {
      name: "Covered interest parity — the baseline condition",
      def: "F = S×(1+r)/(1+r*). Two ways to 'invest in USD' should have identical return: invest directly at r, or convert to FC at spot, invest at r*, and lock in reconversion at the forward rate F.",
      pitfall: "A gap between these two returns is a risk-free arbitrage — which is exactly what CIP violations represent. This is supposed to be an iron law, making its persistent post-2008 violation a genuine puzzle.",
      related: []
    },
    {
      name: "FX swaps vs. cross-currency basis swaps",
      def: "FX swap: short-term (<1yr), reconversion at maturity at the forward rate F, no interim payments (single forward points quote). Cross-currency basis swap: long-term (often >1yr), reconversion at the ORIGINAL spot rate S, periodic interest exchanged (each leg's reference rate + the basis b).",
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
      example: "Policy response: the Fed extended reciprocal swap lines to other central banks (ECB, Swiss National Bank first, later Canada/England/Japan), collateralized by foreign currency, letting foreign central banks auction USD locally even to banks with no U.S. subsidiary. Made UNLIMITED for the ECB, BoE, and Swiss National Bank in late 2008 — effectively making the Fed an international lender of last resort.",
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

  summary: `<p><strong>CIP</strong>: F=S(1+r)/(1+r*) — a violation is risk-free arbitrage in principle. <strong>FX swaps</strong> (short-term, forward-rate reconversion) vs. <strong>cross-currency basis swaps</strong> (long-term, original-spot reconversion, periodic basis payments). <strong>Cross-currency basis b</strong>: the rate adjustment restoring CIP (distinct from the forward premium F−S); positive since 2008 (USD borrower pays extra). <strong>Two causes</strong> of nonzero basis: liquidity decline, risk premia. <strong>Three demand sources</strong> (bank hedging, institutional hedging, US firms' FX debt issuance) explain why it opened; <strong>limits to arbitrage</strong> (balance-sheet expansion costs) explain why it hasn't closed. <strong>USD funding gap</strong>: exists whenever USD asset horizons exceed funding maturity; foreign-currency gaps are structurally more dangerous since no non-Fed central bank can create USD; visible only at the CONSOLIDATED GLOBAL level. <strong>Fed's swap network</strong>: unlimited, fully-collateralized lines to key central banks — zero Fed counterparty risk, effectively making the Fed an international lender of last resort.</p>`
});
