export default ({
  book: 5, reading: 93,
  session: "Current Issues in Financial Markets",
  title: "The Credit Suisse CoCo Wipeout: Facts, Misperceptions, and Lessons for Financial Regulation",
  tagline: "AT1 bonds zeroed while shareholders kept something — the creditor hierarchy upended, and CoCos revealed to be far less understood than their yields suggested.",

  teaches: `<p>Contingent convertible bond (CoCo) features and mechanics; the 2008 Bear Stearns rescue compared to the 2023 Credit Suisse rescue; the rationale for writing down Credit Suisse's CoCos; market reaction and lessons learned; and proposed CoCo structural reforms.</p>`,

  why: `<p>The Credit Suisse CoCo wipeout is the definitive real-world test of whether investors actually understood the instruments they were buying — and the answer, resoundingly, was no. This reading connects Book 3's Basel III capital framework (R60) directly to a live, controversial 2023 crisis event.</p>`,

  intuition: `<p>CoCos exist to solve one problem: how does a distressed-but-still-viable ("going concern") bank recapitalize FAST without a government bailout? Answer: build a bond that AUTOMATICALLY converts to equity (or writes down its principal) when a trigger fires — either a MECHANICAL trigger (a predefined capital ratio breach) or a DISCRETIONARY trigger (a regulator's judgment that the point of nonviability, PONV, has been reached). Basel III REQUIRES the discretionary/PONV trigger for CoCos to count as regulatory capital.</p>
  <p>Bear Stearns (2008) and Credit Suisse (2023) solved the SAME underlying problem (a systemically important bank in liquidity distress) with COMPLETELY DIFFERENT TOOLS: the U.S., lacking the authority to force anything directly, built an elaborate SPV (Fed senior tranche $29B + JPMorgan junior tranche $1B) to absorb troubled assets and facilitate a negotiated merger. Switzerland, under emergency law, had the authority to DIRECTLY TRIGGER the CoCo write-down (~CHF16 billion) — a much simpler mechanism, precisely because CoCos had been PRE-DESIGNED for exactly this scenario.</p>
  <p>The controversy: CoCos "worked exactly as designed" (a strong technical defense) — but the write-down happened WITHOUT shareholders being wiped out first, appearing to violate the traditional creditor hierarchy (bondholders senior to shareholders). This surprised the market (CDS spreads showed no anticipation until the day before), triggered lawsuits, and prompted EU regulators to publicly distance themselves — fearing contagion to the $250 billion European AT1 market.</p>`,

  formulas: [],

  eli5: `<p>Imagine a company car lease that says: "if the driver's blood-alcohol test ever comes back over the limit, the car automatically gets reassigned to a backup driver — no lawsuit, no negotiation, it just happens, because both parties signed off on that clause when the lease was written." A CoCo bond is the financial version of that pre-signed clause: bondholders agree up front that IF the bank's health falls below a defined line (or a regulator judges it non-viable), their bond automatically converts to stock or gets wiped down — instantly refilling the bank's capital tank without anyone needing to negotiate a rescue in the moment. The catch investors in Credit Suisse discovered the hard way: they thought of themselves as "car lease holders" (senior, protected) when the contract they'd actually signed made them the "backup driver" — activated below, not above, the shareholders in the pecking order for that specific loss.</p>`,

  thinkLike: `<p>A risk manager reading a CoCo prospectus does not stop at the coupon. She asks three questions in order: (1) What EXACTLY triggers loss absorption — a mechanical number I can monitor daily, or a regulator's discretionary judgment I cannot model? (2) What EXACTLY happens when it triggers — do I get diluted equity (I keep some value) or a principal write-down (I get zero, full stop)? (3) In the worst case, where do I actually rank relative to the shareholders of this specific bank — not "generally senior to equity" as a class of instrument, but for THIS trigger, THIS structure. Credit Suisse's CoCo investors answered question 3 with the textbook assumption ("bonds beat stock in a wipeout") rather than reading their own documents, which explicitly handed FINMA a PONV-triggered write-down right that made them subordinate to equity in exactly this scenario.</p>
  <p>GARP tends to test this reading three ways: matching Bear Stearns' mechanism (SPV, Section 13(3), negotiated merger) against Credit Suisse's mechanism (direct PONV trigger, no SPV needed) to see if you understand WHY the tools differed (legal authority, plus CoCos not existing as a tool in 2008); testing the precise Basel III regulatory-capital requirement (PONV trigger is MANDATORY, mechanical trigger alone is insufficient); and probing whether you can articulate the specific, narrow nature of the "misunderstood risk" — not "CoCos are risky" (investors knew that) but "write-down CoCos can rank junior to equity for this loss event" (investors didn't fully price that in).</p>`,

  breakdown: [
    {
      title: "The two CoCo design features (every CoCo has both)",
      points: [
        "Trigger — mechanical: activates automatically when a predefined capital ratio (book or market value of capital over risk-weighted assets, RWAs) breaches a set threshold; purely rules-based, no judgment involved.",
        "Trigger — discretionary (point of nonviability, PONV): activates when a supervisor or regulator judges the bank has weakened to the point that, without conversion, it would become insolvent or non-viable; Basel III REQUIRES this trigger for a CoCo to count as regulatory capital, even if a mechanical trigger is also present.",
        "Loss absorption mechanism — conversion to equity: bondholders receive shares at a predefined conversion rate (based on market price, a predetermined price, or a combination where the predetermined price is a floor); dilutes existing shareholders, so shareholders have an incentive to avoid conversion.",
        "Loss absorption mechanism — principal write-down: the bond's face value is reduced, partially or fully, with no equity received in exchange; this is what happened to Credit Suisse's CoCos (fully written down, ~CHF16 billion, receiving nothing)."
      ]
    },
    {
      title: "Why CoCos qualify as Basel III regulatory capital (two conditions, both required)",
      points: [
        "Must include a discretionary (PONV) trigger — a mechanical-trigger-only CoCo does not qualify, regardless of how conservative the ratio threshold is.",
        "Must satisfy a minimum regulatory-capital-to-RWA ratio (the 'going concern' rule) — this keeps the instrument aimed at recapitalizing a still-viable bank, not a bank already in liquidation."
      ]
    },
    {
      title: "Three reasons large, well-capitalized banks favor issuing CoCos",
      points: [
        "Low conversion risk: because the issuing bank is healthy, the probability the trigger ever fires is low, which lets the bank price the CoCo more cheaply (a yield benefit to the issuer, still a premium yield to the investor versus plain bonds).",
        "Senior bondholder benefit: CoCos absorb losses before senior debt does, so senior bondholders effectively get extra protection, which the issuing bank can point to when marketing its senior paper.",
        "Share-price neutrality-to-benefit: historically, issuing CoCos has not hurt (and has often helped) the issuer's share price, because the market reads a healthier capital buffer as good news for equity holders."
      ]
    },
    {
      title: "Bear Stearns (2008) vs. Credit Suisse (2023): same underlying problem, opposite mechanisms",
      points: [
        "Bear Stearns: U.S. authorities lacked direct power to force a rescue, so the Fed invoked the rarely-used Section 13(3) of the Federal Reserve Act and built a bespoke collateralized SPV (JPMorgan $1B junior tranche + Fed $29B senior tranche) to buy up to $30B of troubled assets and enable a negotiated JPMorgan merger; share price moved from an initial $2/share to $10/share after shareholder pushback; deal closed May 2008.",
        "Credit Suisse: Swiss federal government/FINMA had direct emergency-law authority to trigger the pre-existing PONV clause written into the CoCo bond documents themselves, so no SPV was needed — FINMA simply activated a mechanism the contracts had already built; result was a ~CHF16 billion full write-down of CoCos as part of the UBS takeover.",
        "The deeper reason for the difference: CoCos did not exist as a policy tool in 2008 — they were a post-crisis (2009+) innovation designed specifically to give future regulators exactly the direct lever Switzerland used in 2023."
      ]
    },
    {
      title: "Five problems the Credit Suisse CoCo write-down created (per the source's 'Lessons Learned')",
      points: [
        "It caught investors by surprise — CDS spread analysis shows the market did not price in a write-down until the day before the takeover.",
        "It caused negative market reaction because participants viewed it as disregarding the accepted creditor hierarchy (bondholders normally senior to shareholders in distress).",
        "It caused several non-Swiss European regulators (EU Single Resolution Board, EBA, ECB) to publicly distance themselves, stating that in future crises common shareholders would absorb losses first, then AT1 — partly to protect the $250 billion European AT1 market from contagion fears.",
        "It triggered multiple lawsuits against Credit Suisse, arguing the write-down contradicted accepted creditor hierarchy and that FINMA did not act in good faith.",
        "It increased costs to investors by creating pricing uncertainty — worsened by the EBA/ECB statement, which added a second layer of confusion about whether Swiss-style write-downs would recur elsewhere."
      ]
    },
    {
      title: "The proposed reformed CoCo structure — three design goals plus the mechanism",
      points: [
        "Simplicity: strip the instrument down so investors can understand exactly what they hold.",
        "Off-the-shelf pricing: because the new mechanism is a standard issuer option, it can be priced with conventional option-pricing models instead of relying on ambiguous regulatory judgment calls.",
        "Easy recapitalization process: the bank should be able to raise equity capital on predefined terms without a crisis-driven scramble.",
        "Mechanism: eliminate both mechanical and discretionary (PONV) triggers entirely; instead, give the ISSUER (the bank) an option to convert the CoCo's fixed-income component into equity at a specified strike price — removing regulatory judgment from the process while preserving the countercyclical benefit (equity arrives exactly when the bank needs it most)."
      ]
    }
  ],

  concepts: [
    {
      name: "CoCo features and mechanics",
      def: "Two key design features: (1) the TRIGGER (mechanical — predefined capital ratio breach; or discretionary/PONV — point of nonviability, based on regulator judgment), and (2) the LOSS ABSORPTION MECHANISM (conversion to equity at a predefined rate, OR write-down of principal, partial or full).",
      pitfall: "Basel III requires ALL regulatory-capital CoCos to include a DISCRETIONARY (PONV) trigger — a mechanical-trigger-only CoCo does NOT qualify as regulatory capital. Also requires a minimum regulatory-capital-to-RWA ratio (the 'going concern' rule).",
      related: [{ r: 60, label: "R60 — CoCos introduced in the Basel III capital framework context" }],
      memory: "Going concern = still viable, CoCo write-down recapitalizes it to survive. Gone concern = already in liquidation/bankruptcy — a different animal entirely."
    },
    {
      name: "CoCos vs. TLAC bonds",
      def: "CoCos and total loss-absorbing capacity (TLAC) bonds both protect equity and minimize losses, but TLAC bonds specifically ensure G-SIB HOLDING COMPANIES have enough equity to absorb losses and let OPERATING AFFILIATES continue functioning during a resolution — a distinct mechanism from CoCo conversion/write-down.",
      related: []
    },
    {
      name: "The CoCo market and moral hazard",
      def: "CoCos offer higher yields than traditional bonds (a 2013 study: ~2.8% above subordinated bonds, ~4.7% above senior unsecured bonds of the same issuer) due to their lower priority of claim. Over 700 CoCo issuances raised ~$500B (2009-2015); over half include a mechanical trigger with principal write-down; most pre-2015 CoCos were AT1 instruments from developed-market banks.",
      pitfall: "CoCos are favored by well-capitalized, LARGER banks for three reasons: (1) low conversion risk given their health = a yield benefit, (2) senior bondholders benefit from the risk-reduction CoCos provide, (3) issuance historically hasn't hurt (often HELPED) share price. This creates a MORAL HAZARD: shareholders may favor write-down CoCos (rather than equity-conversion CoCos) BECAUSE losses get absorbed by CoCo investors, not shareholders — encouraging excessive risk-taking.",
      related: [],
      memory: "Write-down CoCos let shareholders keep their upside while CoCo bondholders absorb the downside — a structural incentive for shareholders to favor riskier bank behavior."
    },
    {
      name: "2008 Bear Stearns rescue",
      def: "Bear Stearns collapsed from subprime-securitization exposure. The Fed invoked the rarely-used Section 13(3) of the Federal Reserve Act (liquidity support only under 'unusual and urgent circumstances') to facilitate a JPMorgan merger.",
      example: "Mechanism: a collateralized SPV, financed by JPMorgan's $1B junior tranche and the Fed's $29B senior tranche, bought up to $30B of troubled Bear Stearns assets. Share price was initially proposed at $2/share, later raised to $10/share after shareholder pushback. Deal finalized May 2008.",
      related: [{ r: 76, label: "R76 — the repo-market run mechanics behind Bear Stearns' actual liquidity collapse" }]
    },
    {
      name: "2023 Credit Suisse rescue",
      def: "SVB's March 2023 collapse (R92) created systemic contagion spilling into Europe, destabilizing Credit Suisse — which required up to CHF50 billion in liquidity support from the Swiss National Bank.",
      example: "The Swiss National Bank and FINMA (Swiss Financial Market Supervisory Authority) organized a UBS takeover of Credit Suisse. As part of this, nearly CHF16 billion in Credit Suisse CoCos were FULLY WRITTEN DOWN, recapitalizing the balance sheet.",
      pitfall: "Unlike the U.S. in 2008, Switzerland had SIGNIFICANTLY MORE authority under Swiss emergency law — the federal government/FINMA could directly TRIGGER the CoCo write-down (per the CoCo bond documents' PONV clause), avoiding the more complex SPV route entirely.",
      related: [{ r: 92, label: "R92 — the SVB collapse that triggered this exact contagion" }],
      memory: "Same underlying problem (systemic bank rescue), completely different tools — the U.S. built an SPV from scratch (2008); Switzerland just pulled a lever that was already built into the CoCo contract (2023)."
    },
    {
      name: "Rationale for the CoCo write-down",
      def: "The Credit Suisse CoCo bond documents explicitly gave FINMA the authority to trigger conversion/write-down upon reaching the PONV. When FINMA exercised this, the CoCos FUNCTIONED EXACTLY AS DESIGNED.",
      pitfall: "The write-down quickly deleveraged Credit Suisse's balance sheet WITHOUT a complete creditor bailout — this was argued to help AVOID the moral hazard problem of encouraging future risk-taking via expected bailouts. A strong technical/legal defense — but one that clashed hard with market expectations (see below).",
      related: [],
      memory: "'It worked exactly as designed' is a defensible legal argument — but it doesn't mean the market UNDERSTOOD what it was designed to do."
    },
    {
      name: "Market reaction and lessons learned",
      def: "The full CoCo write-down WITHOUT shareholders being materially wiped out first caught investors by surprise — CDS spread analysis showed the market did NOT anticipate the write-down until the day before the takeover. Investors viewed this as a SUBVERSION of the traditional creditor hierarchy (bondholders should rank senior to shareholders in distress).",
      example: "Fallout: non-Swiss European regulators (EU Single Resolution Board, EBA, ECB) publicly distanced themselves, explicitly stating common shareholders would absorb losses FIRST in future crises, followed by AT1 write-down — partly to prevent contagion to the $250 billion European AT1 market. Multiple lawsuits followed, arguing FINMA didn't act in good faith and that the write-down contradicted accepted creditor hierarchy.",
      pitfall: "Investors understood CoCos were RISKIER than ordinary bonds (reflected in higher yields) but likely did NOT fully understand that write-down CoCos are, in effect, JUNIOR IN CLAIM TO EQUITY — a subtler and more severe risk than simply 'higher risk, higher yield.' Confusion was worsened by unclear PONV criteria (no precise, objective definition of when the point of nonviability is reached) and the coexistence of BOTH an automatic (CET1 ratio) trigger AND a discretionary (PONV) trigger in the same instrument.",
      related: [],
      memory: "Higher yield told investors 'this is riskier' — but it didn't tell them 'this ranks BELOW equity in a wipeout,' which is the specific, severe risk that actually materialized."
    },
    {
      name: "Proposed CoCo structural reforms",
      def: "A simplified model: SIMPLE design, OFF-THE-SHELF pricing, EASY recapitalization — with NO automatic or discretionary trigger at all. Instead, the ISSUER gets an OPTION to convert the CoCo's fixed-income component into equity at a specified strike price.",
      pitfall: "This removes REGULATORY judgment from determining whether a trigger has been met (eliminating PONV ambiguity) and makes pricing PREDICTABLE via standard option-pricing models (since it's now a clean issuer option, not a contingent, regulator-dependent event).",
      related: [],
      memory: "CoCos are inherently COUNTERCYCLICAL — they infuse equity exactly when a struggling bank needs capital most, a genuine structural advantage worth preserving even as trigger-design gets reformed."
    }
  ],

  connections: {
    from: [
      { r: 60, why: "CoCos were introduced there as part of Basel III's post-crisis capital framework; this reading is their real-world stress test." },
      { r: 92, why: "SVB's collapse (R92) is the direct contagion trigger that destabilized Credit Suisse, connecting these two 2023 case studies." }
    ],
    to: [],
    confused: [
      { what: "Mechanical trigger vs discretionary (PONV) trigger", how: "Mechanical: automatic, based on a predefined capital ratio breach. Discretionary/PONV: based on a REGULATOR's judgment that the bank has reached the point of nonviability — Basel III REQUIRES the PONV trigger for CoCos to count as regulatory capital." },
      { what: "Bear Stearns' SPV mechanism vs Credit Suisse's direct CoCo trigger", how: "Bear Stearns (2008): the U.S. lacked authority to act directly, so an elaborate SPV (Fed+JPMorgan tranches) was constructed. Credit Suisse (2023): Swiss emergency law gave FINMA direct authority to trigger the pre-built CoCo write-down mechanism — no SPV needed." },
      { what: "'CoCos worked as designed' vs. 'the market was blindsided'", how: "Both are true simultaneously — the LEGAL/TECHNICAL mechanism functioned exactly per the bond documents, but INVESTORS did not anticipate or fully understand that write-down CoCos rank junior to equity in this scenario, causing genuine market shock despite the mechanism's technical correctness." }
    ]
  },

  misconceptions: [
    { wrong: "\"The Credit Suisse CoCo write-down violated the terms of the CoCo bond documents.\"", right: "The write-down was explicitly authorized by the CoCo bond documents, which gave FINMA the authority to trigger conversion/write-down upon reaching the PONV — the CoCos functioned exactly as designed, even though the outcome shocked the market." },
    { wrong: "\"Bondholders always rank senior to shareholders under a CoCo structure, just like ordinary bonds.\"", right: "Write-down CoCos are, in effect, JUNIOR in claim to equity in a PONV scenario — the entire point of the instrument is to absorb losses before equity does in some designs, or at least independently of the traditional hierarchy, which is precisely what surprised and angered investors in the Credit Suisse case." },
    { wrong: "\"The 2008 Bear Stearns rescue and the 2023 Credit Suisse rescue used essentially the same regulatory tools.\"", right: "They used fundamentally different tools — Bear Stearns required building an entire collateralized SPV because the Fed/Treasury lacked direct authority to act; Credit Suisse's CoCo write-down was triggered directly by FINMA under Swiss emergency law, since the mechanism was pre-built into the bond contracts." },
    { wrong: "\"Higher CoCo yields meant investors fully understood the specific risk of a write-down ranking junior to equity.\"", right: "Investors understood CoCos were generally riskier (reflected in yield) but likely did NOT fully grasp the specific, severe risk that a write-down CoCo effectively ranks junior to equity claims — a critical, underappreciated distinction that the Credit Suisse case exposed." },
    { wrong: "\"Proposed CoCo reforms aim to make triggers more precise and better-defined.\"", right: "The proposed reform actually ELIMINATES triggers entirely (both mechanical and discretionary), replacing them with a simple ISSUER OPTION to convert at a specified strike price — removing regulatory judgment from the process altogether rather than refining it." }
  ],

  highYield: [
    { stars: 5, what: "The core controversy: CoCo write-down 'worked as designed' vs. apparent violation of creditor hierarchy — and why write-down CoCos effectively rank junior to equity.", why: "The single most important conceptual tension in this reading, and the crux of the entire market reaction." },
    { stars: 4, what: "Mechanical vs. discretionary (PONV) triggers, and Basel III's requirement that regulatory-capital CoCos include a PONV trigger.", why: "A precise, frequently tested regulatory requirement." },
    { stars: 4, what: "Bear Stearns (2008, SPV mechanism) vs. Credit Suisse (2023, direct CoCo trigger) — comparing rescue mechanisms.", why: "A rich compare-contrast case pair, frequently tested via mechanism-matching questions." },
    { stars: 3, what: "Market reaction: CDS spreads showing no anticipation, EU regulators' public distancing, and the proposed reforms (simple, off-the-shelf, issuer-option-based).", why: "The practical fallout and forward-looking reform direction, good for synthesis questions." },
    { stars: 3, what: "CoCo moral hazard: shareholders favoring write-down CoCos since losses fall on CoCo investors, not equity.", why: "A subtle incentive-structure point worth precise recall." }
  ],

  recall: [
    { q: "Why did the Credit Suisse CoCo write-down of March 2023 catch the market by surprise, despite functioning exactly as the bond documents specified?", a: "CDS spread analysis showed the market did not anticipate the write-down until the day before the takeover — investors understood CoCos were riskier than ordinary bonds (reflected in higher yields) but likely did not fully appreciate that write-down CoCos effectively rank JUNIOR to equity claims in a PONV scenario. The write-down occurred WITHOUT shareholders being wiped out first, which market participants interpreted as violating the traditional creditor hierarchy (bondholders senior to shareholders) — even though the CoCo documents technically authorized exactly this outcome." },
    { q: "Compare the regulatory tools used to rescue Bear Stearns (2008) and Credit Suisse (2023), and explain why they differed so dramatically.", a: "The U.S. Federal Reserve and Treasury had LIMITED direct authority to force a bank rescue in 2008, requiring the Fed to invoke a rarely-used provision (Section 13(3)) and construct an elaborate collateralized SPV (Fed $29B senior tranche + JPMorgan $1B junior tranche) to facilitate a negotiated merger. Switzerland's federal government had SIGNIFICANTLY MORE direct authority under Swiss emergency law in 2023 — FINMA could directly trigger the Credit Suisse CoCo write-down per the pre-existing bond documents, avoiding the need for any SPV at all. The difference reflects both differing legal authority AND the fact that CoCos (which didn't exist as a tool in 2008) were specifically designed to enable exactly this kind of fast, direct recapitalization." },
    { q: "Why did several non-Swiss European regulators publicly distance themselves from FINMA's decision to write down Credit Suisse's CoCos?", a: "The FINMA decision, by writing down CoCo bondholders without first wiping out shareholders, appeared to subvert the traditional creditor hierarchy — causing significant negative market reaction and investor confusion. European regulators (EU Single Resolution Board, EBA, ECB) were concerned this could cause CONTAGION fears across the roughly $250 billion European AT1 market, so they explicitly stated that future banking crises in their jurisdictions would have common shareholders absorb losses FIRST, before any AT1/CoCo write-down — reassuring the broader European CoCo market that FINMA's specific approach wouldn't necessarily be replicated elsewhere." },
    { q: "How does the proposed reformed CoCo structure differ fundamentally from the traditional trigger-based design that caused so much confusion in the Credit Suisse case?", a: "The proposed reform eliminates BOTH mechanical and discretionary triggers entirely. Instead of the instrument converting automatically or at a regulator's judgment, the ISSUER (the bank) is given an OPTION to convert the CoCo's fixed-income component into equity at a predefined strike price. This removes all regulatory judgment/ambiguity about when a trigger is met, and allows the instrument to be priced using standard, predictable option-pricing models — directly addressing the pricing uncertainty and PONV-ambiguity problems that plagued the original design." }
  ],

  hooks: [
    { title: "The lever that was already built", text: "2008: the U.S. had to build an entire machine (the SPV) from scratch to rescue Bear Stearns. 2023: Switzerland just pulled a lever that was already wired into the Credit Suisse CoCo contracts. That's the entire difference between the two rescues in one image." },
    { title: "Higher yield told half the story", text: "Investors knew CoCos paid more because they were riskier — what they didn't fully grasp was that 'riskier' specifically meant 'ranks below equity in exactly this scenario.' The yield premium was real; the specific risk it was compensating for was misunderstood." },
    { title: "It worked, and that's the problem", text: "The Credit Suisse case's deepest irony: the CoCo mechanism performed EXACTLY as engineered — and that flawless technical performance is precisely what triggered lawsuits, regulatory distancing, and a market-wide re-pricing of AT1 risk." }
  ],

  summary: `<p><strong>CoCos</strong>: post-2008 instrument recapitalizing 'going concern' banks via automatic conversion/write-down on trigger. <strong>Triggers</strong>: mechanical (capital ratio) or discretionary/PONV (regulator judgment) — Basel III REQUIRES PONV for regulatory capital status. <strong>Loss absorption</strong>: equity conversion (dilutes shareholders) or principal write-down (partial/full) — favored by well-capitalized banks, creating a moral-hazard incentive toward write-down CoCos. <strong>Bear Stearns (2008)</strong>: limited Fed/Treasury authority → elaborate SPV (Fed $29B + JPM $1B) → negotiated JPMorgan merger. <strong>Credit Suisse (2023)</strong>: Swiss emergency law → FINMA directly triggered ~CHF16B CoCo write-down → UBS takeover, following SVB-driven contagion. <strong>Controversy</strong>: write-down without shareholders wiped out first appeared to violate creditor hierarchy — market genuinely blindsided (CDS spreads), EU regulators publicly distanced themselves (protecting the $250B European AT1 market), lawsuits followed. <strong>Reform proposal</strong>: eliminate triggers entirely, replace with an issuer OPTION to convert at a strike price — simple, off-the-shelf-priced, removes regulatory ambiguity.</p>`,

  quiz: [
    {
      q: "A CoCo bond has ONLY a mechanical trigger (a predefined capital-ratio breach) and no discretionary trigger. Under Basel III, this instrument:",
      options: [
        "Qualifies as regulatory capital as long as the capital ratio threshold is conservative enough",
        "Does NOT qualify as regulatory capital, because a discretionary (PONV) trigger is mandatory",
        "Qualifies as regulatory capital only if it is also a going-concern bond",
        "Qualifies as regulatory capital automatically, since mechanical triggers are the stricter standard"
      ],
      answer: 1,
      why: "Basel III requires ALL regulatory-capital CoCos to include a discretionary (PONV) trigger, regardless of how the mechanical threshold is set — a mechanical-only CoCo simply does not meet the rule. The tempting 'qualifies if the ratio threshold is conservative enough' answer assumes stringency of the ratio can substitute for the PONV requirement; it cannot, because PONV is a distinct, mandatory, separate criterion, not a backstop to a weak mechanical trigger."
    },
    {
      q: "How did the Swiss authorities' rescue mechanism for Credit Suisse (2023) differ fundamentally from the U.S. authorities' rescue mechanism for Bear Stearns (2008)?",
      options: [
        "Switzerland used a collateralized SPV, while the U.S. triggered a pre-built CoCo write-down directly",
        "Switzerland had direct legal authority under emergency law to trigger a pre-built CoCo write-down, avoiding the need for an SPV; the U.S. lacked that authority and had to construct an SPV",
        "Both used a collateralized SPV, but Switzerland's SPV was larger in dollar terms",
        "The U.S. used a PONV trigger under Basel III rules that did not yet exist for Switzerland in 2023"
      ],
      answer: 1,
      why: "Swiss emergency law gave the federal government/FINMA direct authority to activate the CoCo bond documents' PONV clause — no SPV required. The Fed and Treasury in 2008 lacked comparable direct authority, so they invoked Section 13(3) and built a bespoke SPV (JPMorgan $1B junior + Fed $29B senior tranche). The 'Switzerland used an SPV, the U.S. triggered a CoCo' answer reverses the two mechanisms; the 'both used an SPV' answer is a distractor built on the shared 'SPV' vocabulary; the 'U.S. used a PONV trigger under Basel III' answer confuses chronology — CoCos and Basel III postdate 2008, so there was no PONV trigger available to the U.S. at all."
    },
    {
      q: "In the March 2008 Bear Stearns rescue, JPMorgan's initial proposed purchase price of $2 per share was later raised to what price, after shareholder pushback?",
      options: [
        "$5 per share",
        "$8 per share",
        "$10 per share",
        "$15 per share"
      ],
      answer: 2,
      why: "The Fed had to make concessions after shareholder objections, raising the price from $2/share to $10/share before the deal closed in May 2008 — a concrete, source-stated figure worth memorizing exactly. The other values are plausible-sounding round numbers but not what the source reports."
    },
    {
      q: "Why did the Credit Suisse CoCo write-down of March 2023 shock the market, even though CDS spreads and yields had already told investors CoCos were riskier than ordinary bonds?",
      options: [
        "Investors had not realized CoCos existed as an instrument class until the write-down occurred",
        "The higher yield compensated investors for general riskiness, but did not signal the specific risk that write-down CoCos can rank JUNIOR to equity in a PONV scenario",
        "CDS spreads had actually predicted the write-down weeks in advance, so the shock was purely a media narrative",
        "The write-down was larger in absolute CHF terms than any prior CoCo write-down in history, which alone explains the surprise"
      ],
      answer: 1,
      why: "The source is explicit: investors understood CoCos were generally riskier (reflected in yield) but likely did not fully understand that write-down CoCos are, in essence, junior in claim to equity — that narrow, severe risk is what actually materialized and blindsided the market. The 'CDS spreads predicted it weeks in advance' answer is factually wrong (CDS spreads showed no anticipation until the day before); the 'investors hadn't realized CoCos existed' answer overstates investor ignorance of the instrument class itself; the 'largest write-down in history' answer introduces an unsupported claim about historical write-down size."
    },
    {
      q: "Following the Credit Suisse CoCo write-down, several non-Swiss European regulatory bodies (the EU Single Resolution Board, EBA, and ECB) publicly stated that in a future banking crisis:",
      options: [
        "AT1 bondholders would absorb losses before common shareholders, mirroring the Swiss approach",
        "Common shareholders would absorb losses first, followed by a write-down of AT1 capital",
        "CoCo triggers would be replaced immediately with issuer options across the EU",
        "The European Central Bank would guarantee all AT1 instruments to prevent contagion"
      ],
      answer: 1,
      why: "The EU regulators explicitly stated common shareholders would absorb losses FIRST, then AT1 capital would be written down — the opposite ordering from what happened at Credit Suisse — specifically to reassure the ~$250 billion European AT1 market and prevent contagion. The 'AT1 before shareholders' answer describes the Swiss outcome, not the EU statement; the 'triggers replaced with issuer options' and 'ECB guarantee' answers describe actions not reported in the source."
    },
    {
      q: "Which feature is NOT part of the proposed reformed CoCo structure described in the reading?",
      options: [
        "Simple design with off-the-shelf, predictable pricing",
        "An issuer option to convert the fixed-income component into equity at a specified strike price",
        "Automatic (mechanical) or discretionary (PONV) triggers that determine conversion timing",
        "Preservation of the countercyclical benefit — equity infused exactly when the bank needs capital most"
      ],
      answer: 2,
      why: "The reform ELIMINATES both mechanical and discretionary triggers entirely, replacing them with a clean issuer option exercisable at a strike price — this is the whole point of the reform, since ambiguous PONV criteria were a core source of investor confusion and pricing uncertainty. The simplicity/pricing feature, the issuer-option feature, and the countercyclical-benefit feature are all genuine features of the proposed structure per the source, making the retained-trigger answer the only feature that does not belong."
    }
  ],

  sources: [
    { title: "Additional Tier 1 capital (Wikipedia)", url: "https://en.wikipedia.org/wiki/Additional_Tier_1_capital", note: "Background on AT1/CoCo instruments, their loss-absorption design, and their role in bank regulatory capital." },
    { title: "Contingent convertible bond (Wikipedia)", url: "https://en.wikipedia.org/wiki/Contingent_convertible_bond", note: "General overview of CoCo mechanics, triggers, and history, complementary to this reading's Credit Suisse case study." },
    { title: "Basel III: international regulatory framework for banks (BIS)", url: "https://www.bis.org/bcbs/basel3.htm", note: "Primary source for the Basel III capital rules that require a discretionary (PONV) trigger for CoCos to count as regulatory capital." },
    { title: "Point of non-viability (Investopedia)", url: "https://www.investopedia.com/terms/p/point-of-non-viability.asp", note: "Plain-language explanation of the PONV concept central to this reading's Credit Suisse trigger mechanism." }
  ],

  pdf: { book: 5, query: "Contingent convertible bonds (CoCos) are a type of fixed income security" }
});
