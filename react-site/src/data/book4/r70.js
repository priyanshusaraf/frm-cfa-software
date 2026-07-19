export default ({
  book: 4, reading: 70,
  session: "Stress Testing, Contingency Planning & Liabilities",
  title: "The Failure Mechanics of Dealer Banks",
  tagline: "Large dealer banks are structurally exposed to a specific liquidity-death-spiral because their business depends entirely on counterparties' continued confidence in their solvency.",

  teaches: `<p>This reading (based on Darrell Duffie's 2010 paper) explains why a <strong>dealer bank</strong> — a large bank holding company such as Bear Stearns, Lehman Brothers, Morgan Stanley, or Goldman Sachs that acts as a middleman in OTC derivatives, repo, and securities markets — can collapse in days even when its underlying assets are not, in a strict accounting sense, worthless. It walks through the five lines of business a dealer bank runs (OTC derivatives dealing, repo financing, investment banking/underwriting, prime brokerage, and traditional commercial banking), shows exactly which counterparty actions in each line accelerate a liquidity crisis once solvency is merely <em>questioned</em>, and then covers the policy responses proposed after 2008 (central clearing, tri-party repo utilities, "emergency banks," TARP/PPIP) to blunt this fragility.</p>`,

  why: `<p>This reading is the real-world payoff of R63/R64's abstract funding-liquidity-risk mechanics, applied to a specific and structurally fragile institution type. The mechanism here — confidence-driven exit accelerating the very crisis it fears — is a self-fulfilling dynamic worth recognizing anywhere it recurs. The exam rewards you for knowing the <em>specific channels</em> (novation, repo non-renewal, clearing-bank offset) rather than just the generic "run on the bank" idea, and for knowing which named 2008 case illustrates which channel: Bear Stearns for novation refusal, Lehman for the clearing-bank cash freeze, and both for >30x leverage funded on overnight repo.</p>`,

  intuition: `<p>The moment prime-brokerage clients or repo/derivatives counterparties start QUESTIONING solvency (not necessarily confirming it), they rationally move to exit positions or shrink exposure — and that very withdrawal ACCELERATES the liquidity crisis, regardless of whether the initial solvency concern was justified. It's a self-fulfilling dynamic, structurally similar to a bank run but operating through wholesale/institutional channels rather than retail depositors.</p>
  <p>What makes a dealer bank different from a retail bank is <em>who</em> can run and <em>how fast</em>. A retail depositor has to physically show up (or log in) and withdraw cash — slow, and until 2008 largely insured, so it rarely happens. A repo counterparty just declines to roll over an overnight loan tomorrow morning; a hedge fund client instructs its prime broker to move its account to a custodian bank this afternoon; an OTC derivatives counterparty asks for a novation (a transfer of its side of the contract to a different dealer) this week. None of these actions require proving the dealer bank is insolvent — they are the economically rational move for <em>anyone</em> who suspects it might be, because the downside of staying (losing money if the dealer fails) vastly outweighs the cost of moving (a little friction). Once enough counterparties reason this way simultaneously, the dealer's cash inflows dry up exactly when it needs them most, and a merely <em>possible</em> solvency problem becomes an actual, immediate liquidity failure. This is why the reading calls it a "self-fulfilling prophecy": the questioning causes the very outcome it was worried about.</p>`,

  visual: `<div class="widget" data-widget="spiral"></div>`,

  formulas: [],

  concepts: [
    {
      name: "The failure mechanism",
      def: "The moment prime-brokerage clients or repo/derivatives counterparties start questioning solvency (not necessarily confirming it), they rationally move to exit positions or shrink exposure — and that very withdrawal accelerates the liquidity crisis, regardless of whether the initial solvency concern was justified.",
      intuition: "Think of it as a coordination problem: every individual counterparty is acting rationally and defensively (protect my own money first), but the aggregate effect of thousands of individually-rational exits is the very collapse each counterparty was trying to avoid being caught in. No single counterparty needs bad information — a rumor, a credit-rating downgrade, or even just seeing others start to pull back is enough to trigger the same defensive move.",
      example: "In September 2008, when Lehman Brothers' solvency became publicly doubted, its OTC derivatives counterparties began requesting novations (transferring their contracts to other dealers) and its repo counterparties declined to renew overnight funding within days — well before any court had ruled Lehman insolvent. The withdrawal itself was what forced Lehman's bankruptcy filing on September 15, 2008.",
      pitfall: "It's a self-fulfilling dynamic, structurally similar to a bank run but operating through WHOLESALE/INSTITUTIONAL channels rather than retail depositors — don't assume dealer bank failures require actual retail depositor panic.",
      related: [{ r: 63, label: "R63 — Northern Rock, the retail-depositor version of the same mechanism" }],
      memory: "A dealer bank run doesn't need retail depositors lining up outside a branch — it happens through prime brokerage clients and repo counterparties quietly pulling exposure."
    },
    {
      name: "Lines of business and their liquidity risk channels",
      def: "Dealer banks run five main business lines, each of which creates a distinct channel through which counterparty exit accelerates a liquidity crisis: (1) OTC derivatives dealing — swaps, CDOs, CMOs, CDSs; (2) repo financing of the dealer's own balance sheet; (3) investment banking (underwriting, M&A advice, merchant banking in commodities); (4) prime brokerage for hedge funds; (5) traditional commercial banking (deposits, lending).",
      intuition: "Each business line looks fine in isolation during normal times, but they all share one structural weakness: they depend on someone else's continued willingness to keep money or exposure parked with the dealer bank overnight or on demand. A dealer bank that looks diversified across five business lines is not actually diversified against a liquidity crisis — a solvency scare hits all five channels at once because the same underlying trigger (doubt about the dealer's ability to pay) drives exit in every line simultaneously.",
      example: "OTC derivatives: a dealer bank runs a 'matched book' — it takes on a derivative position from one counterparty (say, a fixed-for-floating interest rate swap referencing SOFR) and immediately offsets that exact risk with an opposite position against another counterparty, often another dealer bank. Because dealer banks are matched-book counterparties to each other, one dealer's solvency problem is transmitted directly into every dealer it faces. Repo: pre-crisis, dealer banks financed holdings of Treasuries, agency securities, corporate bonds, mortgages, and CDOs almost entirely with overnight repo, because repo required little incremental capital — this let Bear Stearns and Lehman run leverage ratios above 30x. Prime brokerage: the dealer holds custody of a hedge fund's securities, lends against them, and pools multiple clients' cash together (permitted in the U.S., unlike the U.K. where client and firm assets stay legally separate) so that one client's cash can fund another client's liquidity need — which is efficient in normal times but means the pool itself drains fast if several large clients leave at once.",
      related: [{ r: 76, label: "R76 — the tri-party repo mechanics behind the repo financing channel" }],
      memory: "Five business lines, one shared vulnerability: every line needs someone else's continued confidence to keep funding it overnight."
    },
    {
      name: "Novation and its role in the Bear Stearns collapse",
      def: "A novation is a counterparty's request to transfer its side of an existing OTC derivatives contract from the original dealer bank to a different dealer bank, done to reduce exposure to a dealer whose solvency is in doubt without unwinding the underlying economic position.",
      intuition: "A novation lets a hedge fund keep its hedge (e.g., protection from a credit default swap) while swapping out the counterparty it's relying on to pay if that protection is ever triggered. Granting novations is normal and low-cost for a healthy dealer bank; but a dealer bank under stress faces a bind — refusing a novation request signals weakness (the bank looks like it can't afford to let exposure go), while granting it can strip out cash collateral that was backing the original position and hand it to a rival dealer, worsening the very liquidity position that made the counterparty nervous in the first place.",
      example: "During Bear Stearns' final days in March 2008, some novation requests were denied. That refusal itself raised additional concern about Bear Stearns' solvency — damaging its reputational capital and franchise value on top of the direct liquidity strain — and accelerated the run rather than containing it.",
      pitfall: "Don't confuse a novation with simply closing out a position — a novation replaces the counterparty on an existing contract; it does not eliminate the underlying derivative, it just moves who bears the dealer-bank credit risk on it.",
      related: [{ r: 77, label: "R77 — repo mechanics and the role of repo in Bear Stearns' and Lehman's actual collapses" }]
    },
    {
      name: "The clearing-bank cash freeze and the end of Lehman Brothers",
      def: "A clearing bank normally extends 'daylight overdraft' privileges — allowing a dealer bank to make payments during the trading day before its account is fully funded — as a courtesy to creditworthy clients. When a dealer bank's solvency is questioned, the clearing bank can invoke its legal 'right of offset,' using the dealer's own cash to net down its exposure to the dealer and refusing further daytime payments that would push the dealer's account balance below zero.",
      intuition: "This is the mechanism the reading identifies as the actual, final trigger of collapse — not the slow bleed of counterparties leaving, but the single moment a dealer bank literally cannot make a payment it owes that day. Once that happens, the dealer bank is in default on its settlement obligations, which forces a bankruptcy filing regardless of what its balance sheet says about long-run solvency.",
      example: "In September 2008, JPMorgan Chase, acting as Lehman Brothers' clearing bank, invoked its full right of offset — using Lehman's cash to offset JPMorgan's own exposures and discontinuing cash payments on Lehman's behalf that would have taken Lehman's account balance negative. Lehman's resulting failure to meet its intraday settlement obligations forced it into bankruptcy that day.",
      pitfall: "Loss of cash settlement privileges is described as the LAST step, not the first — it is the point of no return that follows, and is caused by, the earlier withdrawal of counterparties across derivatives, repo, and prime brokerage.",
      related: [{ r: 76, label: "R76 — tri-party repo clearing-bank mechanics" }]
    },
    {
      name: "Diseconomies of scope in dealer bank holding companies",
      def: "Large dealer banks operate as holding companies combining commercial banking, investment banking, prime brokerage, merchant banking, and off-balance-sheet activities (structured investment vehicles, internal hedge funds). Proponents argue this creates economies of scope in technology, marketing, and financial innovation; the 2007–2009 crisis instead revealed diseconomies of scope specifically in risk management and corporate governance.",
      intuition: "The argument is not that combining business lines is inherently bad — it's that combining them made the aggregate risk too complex for a single executive team and board to actually understand and control. Off-balance-sheet vehicles were not included in minimum capital or accounting reports before the crisis, so management could (and did) let leverage build up in places the official risk reports didn't show.",
      example: "Special purpose entities (SPEs) let a dealer bank sell mortgages or other loans to a separate legal entity, which pays for them by issuing debt (often as CDOs or CMOs) to third-party investors, and then services that debt using cash flows from the mortgages. Structured investment vehicles (SIVs) are a form of SPE that financed residential mortgages or other debt with short-term paper sold to investors. When home prices fell in 2007 and mortgage defaults rose, SIV creditors stopped renewing that short-term funding — a liquidity/solvency crisis for the SIV that the sponsoring dealer bank then had to bail out anyway, to protect its own reputation and franchise value, even though the SIV's debt was technically off the bank's own balance sheet. Bear Stearns and Lehman both ran overnight-repo-funded leverage ratios above 30x going into the crisis — meaning less than roughly 3% of their balance sheet was funded by equity capital, so even a small percentage decline in asset values could wipe out their capital cushion.",
      related: [{ r: 64, label: "R64 — leverage as an amplifier of liquidity fragility" }]
    },
    {
      name: "Policy responses",
      def: "Tri-party repo utilities and clearing banks (emergency infrastructure proposals to reduce contagion risk in repo/OTC markets). TARP (2008): designed to address adverse selection in 'toxic' asset markets by offering below-market financing and absorbing losses above a pre-specified threshold. Central clearing counterparties (CCPs) stand between OTC derivatives counterparties to reduce the risk that one dealer's trouble spreads through the web of matched-book positions. 'Emergency banks' were proposed to manage orderly unwinds of a troubled dealer's repo book, insulating clearing banks from losses. Bank holding company conversion gave Morgan Stanley and Goldman Sachs (immediately after Lehman's failure) access to the Fed's discount window and FDIC-backed deposit insurance.",
      intuition: "Notice the common thread: every one of these policy responses targets a specific channel identified above. Central clearing directly addresses the matched-book contagion channel. Tri-party repo utilities and the Primary Dealer Credit Facility address the repo-non-renewal channel. Bank holding company status and discount-window access address the 'no lender of last resort' problem that made repo non-renewal fatal in the first place. TARP/PPIP addresses a different problem — not the run itself, but the fire-sale losses a dealer suffers when it's forced to sell illiquid 'toxic' assets into a market where buyers demand a steep discount because of adverse selection (they can't tell good assets from bad, so they price all of them as if they're bad).",
      example: "The 2008 Primary Dealer Credit Facility, created by the New York Fed, let investment banks (not just traditional depository banks) borrow against securities directly from the central bank — filling the 'no lender of last resort' gap the reading identifies as the core problem in the repo channel. The 2009 Public-Private Investment Partnership (PPIP), instituted under TARP, subsidized private bidders for 'toxic' assets like subprime-backed CDOs by offering below-market financing rates and absorbing losses beyond a pre-specified level, directly targeting the adverse-selection problem.",
      related: [{ r: 76, label: "R76 — the tri-party repo mechanics this policy response targets" }]
    }
  ],

  connections: {
    from: [
      { r: 63, why: "This reading's mechanism is a real-world case of the funding-liquidity-risk death spiral introduced there." },
      { r: 64, why: "Leverage's amplifying role in liquidity fragility is exactly what makes dealer banks structurally vulnerable." }
    ],
    to: [
      { r: 76, why: "The repo market mechanics behind Bear Stearns and Lehman's specific collapses get full treatment there." }
    ],
    confused: [
      { what: "Dealer bank run vs. retail bank run", how: "Both are self-fulfilling confidence spirals, but a dealer bank run operates through WHOLESALE channels (prime brokerage clients, repo/derivatives counterparties exiting), while a retail bank run (like Northern Rock) involves depositors physically withdrawing funds." },
      { what: "Novation vs. central clearing", how: "A novation is a bilateral, case-by-case transfer of one contract to a different counterparty (which the original dealer bank can refuse, as Bear Stearns did); central clearing is a structural, standing arrangement where a central clearing counterparty (CCP) sits between all participants for standardized derivatives, so no case-by-case refusal is possible — but it only works for relatively standard contract terms, which is why it wasn't an effective fix for AIG's highly customized credit derivatives." },
      { what: "The withdrawal of counterparties vs. the loss of cash settlement privileges", how: "The reading treats these as sequential, not the same event: counterparty withdrawal (novation requests, repo non-renewal, prime brokerage flight) is what accelerates the crisis; loss of cash settlement privileges from the clearing bank (as happened to Lehman via JPMorgan Chase's right of offset) is described as the final collapse — the point where the dealer bank actually fails to make a payment it owes." }
    ]
  },

  misconceptions: [
    { wrong: "\"A dealer bank's liquidity crisis requires an actual, confirmed solvency problem to begin.\"", right: "The mechanism triggers the moment counterparties start QUESTIONING solvency — not necessarily confirming it. The very act of counterparties rationally reducing exposure accelerates the crisis regardless of whether the initial concern was justified." },
    { wrong: "\"Dealer bank failures are fundamentally different from traditional bank runs.\"", right: "They're structurally similar self-fulfilling dynamics — the key difference is the CHANNEL (wholesale/institutional counterparties vs. retail depositors), not the underlying confidence-driven mechanism." },
    { wrong: "\"Central clearing would have prevented every part of the 2008 dealer bank collapses.\"", right: "Central clearing mitigates the OTC derivatives matched-book contagion channel specifically, and even there only for relatively standardized contracts — it would not have addressed repo non-renewal, prime brokerage flight, or the clearing-bank cash freeze that actually forced Lehman into bankruptcy, and it explicitly was not an effective tool for AIG's customized credit derivatives." },
    { wrong: "\"TARP's Public-Private Investment Partnership was designed to force dealer banks to sell illiquid assets to reveal their true value.\"", right: "The opposite: TARP/PPIP was designed to mitigate adverse selection by subsidizing buyers (below-market financing, loss absorption above a threshold) so dealer banks would NOT have to dump illiquid 'toxic' assets into a fire sale at deeply discounted prices." }
  ],

  highYield: [
    { stars: 4, what: "The core failure mechanism: questioning (not confirming) solvency triggers a self-fulfilling wholesale-channel run.", why: "The single most important conceptual takeaway of this reading." },
    { stars: 4, what: "The five specific channels through which counterparties reduce exposure: derivatives novation/offsetting contracts/ITM-to-ATM option revision, repo non-renewal, prime brokerage flight, and the final clearing-bank cash-settlement freeze (right of offset).", why: "The exam tests these as a 'least likely to accelerate a crisis' style question — you need to know retail depositor withdrawal is NOT one of these channels for a dealer bank (pre-crisis, dealer banks had no FDIC insurance or discount window access, but their commercial banking risk is a separate, smaller channel from the core wholesale mechanism)." },
    { stars: 3, what: "Named 2008 case mechanics: Bear Stearns' novation refusal and JPMorgan Chase's right-of-offset freeze of Lehman's cash.", why: "Concrete, examinable facts tied to LO 71.b." },
    { stars: 3, what: "Leverage as the amplifier: Bear Stearns and Lehman both ran overnight-repo-funded leverage above 30x pre-collapse.", why: "Ties this reading directly to R64's leverage-liquidity fragility link." },
    { stars: 2, what: "Policy responses: tri-party repo utilities/clearing banks, central clearing, emergency banks, bank holding company conversion, and TARP/PPIP's specific design purpose (subsidize buyers of toxic assets, absorb losses above a threshold, mitigate adverse selection).", why: "Supporting factual detail, commonly tested as which-of-the-following-is-NOT-a-policy-objective." }
  ],

  recall: [
    { q: "Why can a dealer bank collapse even if its underlying assets are not actually insolvent?", a: "Once prime-brokerage clients and repo/derivatives counterparties merely start QUESTIONING the bank's solvency, they rationally begin exiting positions and reducing exposure to protect themselves — this withdrawal of confidence and funding itself accelerates a genuine liquidity crisis, regardless of whether the original solvency concern was factually justified. It's a self-fulfilling dynamic." },
    { q: "How does a dealer bank run differ mechanically from a classic retail bank run like Northern Rock's?", a: "Both share the same self-fulfilling confidence-driven logic, but a dealer bank run operates through WHOLESALE/INSTITUTIONAL channels — prime brokerage clients and repo/derivatives counterparties reducing exposure — rather than retail depositors physically withdrawing cash from branches." },
    { q: "What is a novation, and how did the refusal of a novation request contribute to Bear Stearns' collapse?", a: "A novation is a request to transfer a counterparty's side of an existing OTC derivatives contract to a different dealer bank, reducing exposure to the original dealer without unwinding the hedge. Bear Stearns denied some novation requests in its final days; that refusal itself signaled weakness, damaged its reputational capital and franchise value, and added further stress to its already-strained liquidity position." },
    { q: "What finally forced Lehman Brothers into bankruptcy, mechanically?", a: "JPMorgan Chase, as Lehman's clearing bank, invoked its full right of offset — using Lehman's own cash to offset JPMorgan's exposures and refusing to make further intraday cash payments that would push Lehman's account below zero. Lehman's resulting inability to meet its same-day settlement obligations forced the bankruptcy filing — this loss of cash settlement privileges is described as the final step in a dealer bank's collapse." },
    { q: "What was the specific policy purpose of TARP's Public-Private Investment Partnership (PPIP)?", a: "To mitigate adverse selection in the market for 'toxic' assets (e.g., subprime-mortgage-backed CDOs) by subsidizing bidders for those assets with below-market financing rates and by absorbing losses beyond a pre-specified level — so dealer banks would not be forced into fire sales at deep, information-asymmetry-driven discounts." }
  ],

  hooks: [
    { title: "The whisper that becomes true", text: "A dealer bank doesn't need proof of insolvency to die — a whisper of doubt is enough to start counterparties exiting, and their exit itself makes the whisper come true." },
    { title: "Five doors, one draft", text: "OTC derivatives, repo, investment banking, prime brokerage, commercial banking — five different business lines that look diversified, but every one of them is a door that opens the instant confidence is doubted, and they all blow open in the same draft." }
  ],

  eli5: `<p>Imagine a busy communal kitchen where five different chefs each keep some of their ingredients in a shared walk-in fridge, trusting the fridge's owner to keep it running and to let them grab their stuff whenever they need it. One day, someone notices the fridge has been making a weird noise and starts wondering aloud if it might break down. No chef waits to find out — each one rushes in immediately to grab their own ingredients before the others do, "just in case." But that rush itself is what breaks the fridge: the door gets jammed open, the compressor overheats from being interrupted mid-cycle, and food starts spoiling — not because the fridge was actually broken to begin with, but because everyone's simultaneous rational scramble to protect their own stuff caused the very breakdown they feared. In finance terms, the "chefs" are the dealer bank's OTC derivatives counterparties, repo lenders, and prime-brokerage clients; the "weird noise" is a rumor or downgrade that makes people <em>question</em> (not confirm) the dealer bank's solvency; and their rational, individually-defensive exits (novations, non-renewed repos, moved accounts) are exactly what turns a mere doubt into an actual liquidity collapse.</p>`,

  thinkLike: `<p>A liquidity risk manager at a dealer bank does not ask "are we solvent?" as the operative question during a stress episode — solvency is a slower, harder-to-verify, balance-sheet question, and by the time it's answered the bank may already be dead. The operative question is "how fast can our funding sources disappear, and do we have anything to bridge the gap?" That reframes the job: laddering debt maturities so only a small slice needs refinancing on any given day, holding lines of bank credit and liquid securities as a buffer, and — critically — recognizing that reputational signals (a downgrade, a refused novation, a widened bid-ask spread) are themselves liquidity events, not just PR problems, because counterparties react to them mechanically and fast.</p>
  <p>The exam tends to test this reading in two ways: "least likely to accelerate a crisis" questions that require you to know the specific channels (repo non-renewal, novation requests, prime brokerage flight, in-the-money option revisions to at-the-money) versus a distractor that sounds plausible but isn't one of the named mechanisms (retail depositor withdrawal is the classic trap distractor, since dealer banks' commercial banking arm is a much smaller, separate channel from the core wholesale-market mechanism); and "which policy addresses which problem" questions that require you to map central clearing → derivatives contagion, tri-party repo utilities/Primary Dealer Credit Facility → repo non-renewal, and TARP/PPIP → adverse selection in toxic-asset fire sales, rather than treating all the 2008 policy responses as one interchangeable bucket.</p>`,

  breakdown: [
    {
      title: "The five lines of business a dealer bank runs, and their liquidity risk",
      points: [
        "OTC derivatives dealing — swaps, CDOs, CMOs, CDSs; dealer banks run a 'matched book,' offsetting each client position with an opposite position against another dealer, so one dealer's trouble transmits directly to every other dealer it faces.",
        "Repo financing — dealer banks fund large fractions of their own balance sheet (Treasuries, agency securities, corporate bonds, mortgages, CDOs) with overnight repo, requiring little incremental capital and enabling very high leverage.",
        "Investment banking — underwriting securities issuance, M&A advisory, and merchant banking (e.g., buying and selling commodities); if issuers doubt the dealer's solvency they take business elsewhere, cutting off a cash-inflow source.",
        "Prime brokerage — custody, clearing, securities lending, cash management, and reporting for hedge funds; U.S. dealers pool multiple clients' cash together, so one client's departure removes funds other clients were implicitly relying on.",
        "Traditional commercial banking — deposit-taking and lending; pre-crisis, dealer banks lacked discount-window access and FDIC insurance, making any deposit run more dangerous than at a regulated commercial bank."
      ]
    },
    {
      title: "How a counterparty reduces exposure to a dealer bank whose solvency is in doubt (LO 71.b channels)",
      points: [
        "Borrowing from the dealer, or entering a new offsetting derivatives contract with the dealer, to net down existing exposure.",
        "Requesting that in-the-money options be revised to at-the-money strikes, so the counterparty receives a cash payout and reduces its remaining exposure.",
        "Requesting a novation — transferring the counterparty's side of the contract to a different dealer bank (which the original dealer can refuse, as Bear Stearns did, further damaging confidence).",
        "Declining to renew (roll over) repo positions, forcing the dealer to find replacement funding or have the collateral sold immediately by the repo creditor.",
        "Prime brokerage clients moving their custody, cash, and securities to another prime broker or a custodian bank, removing those funds from the dealer's liquidity pool.",
        "Ultimately, the clearing bank invoking its right of offset and withholding cash settlement — the final step that turns a liquidity strain into an actual default."
      ]
    },
    {
      title: "Policy measures proposed to alleviate dealer bank risk (LO 71.c)",
      points: [
        "Central clearing counterparties (CCPs) for standardized OTC derivatives, to blunt the matched-book contagion channel (not effective for customized contracts like AIG's).",
        "Tri-party repo utilities / 'emergency banks' — proposed infrastructure with fewer conflicting incentives to manage orderly unwinds of a troubled dealer's repo book and set tighter standards for margin, documentation, and collateral substitution.",
        "Central bank lending facilities to dealer banks directly, such as the Fed's 2008 Primary Dealer Credit Facility, filling the gap left by dealer banks' lack of discount-window access.",
        "Bank holding company conversion — Morgan Stanley and Goldman Sachs became regulated bank holding companies immediately after Lehman's failure, gaining discount-window access and FDIC-backed deposit insurance.",
        "Higher capital requirements that include off-balance-sheet positions, to reduce dealer bank leverage.",
        "TARP's 2009 Public-Private Investment Partnership (PPIP) — subsidized buyers of 'toxic' assets with below-market financing and loss absorption above a threshold, to mitigate adverse selection and reduce forced fire sales.",
        "'Bridge bank' style resolution proposals for too-big-to-fail dealer banks, mirroring the mechanism used to resolve troubled traditional banks."
      ]
    }
  ],

  quiz: [
    {
      q: "A dealer bank's liquidity crisis is LEAST likely to be accelerated by:",
      options: [
        "the refusal of repurchase agreement creditors to renew their positions",
        "the flight of prime brokerage clients",
        "a counterparty's request for a novation through another dealer bank",
        "depositors removing their savings from the dealer bank"
      ],
      answer: 3,
      why: "The reading's core mechanism runs through wholesale/institutional channels — repo non-renewal, prime brokerage flight, and novation requests — not retail depositor withdrawal. Traditional commercial banking is a separate, smaller line of business for dealer banks; the defining crisis channel is wholesale counterparties, which is why 'depositors removing savings' is the least likely accelerant among these four, even though dealer banks pre-crisis did lack discount-window access and deposit insurance."
    },
    {
      q: "What is a 'matched book' operation, and why does it make dealer banks systemically interconnected?",
      options: [
        "It means the dealer only trades derivatives that exactly match its own balance sheet risk, so it has no counterparty exposure at all",
        "It means the dealer offsets each client's derivatives position by entering an opposite position with another counterparty (often another dealer bank), so dealer banks end up as large counterparties to each other",
        "It means the dealer keeps its repo book perfectly matched to its deposit base, eliminating funding risk",
        "It means the dealer's assets and liabilities have identical maturities, eliminating maturity mismatch"
      ],
      answer: 1,
      why: "A matched book is the practice of offsetting a client's requested derivatives position with an opposite position taken against another counterparty (frequently another dealer bank), transferring the risk rather than eliminating it for the dealer as an institution. This is exactly what makes dealer banks large counterparties to each other and why one dealer's solvency trouble transmits directly through the web of matched-book positions. The other options describe unrelated (and largely fictional, in this context) risk-elimination strategies, not the actual matched-book mechanism."
    },
    {
      q: "In the final days before Bear Stearns' collapse, the firm denied some counterparty requests for novation. What effect did this have?",
      options: [
        "None — novation requests are purely administrative and have no signaling effect",
        "It reduced Bear Stearns' liquidity strain by keeping cash collateral in-house",
        "It raised additional concerns about Bear Stearns' solvency, damaging its reputational capital and franchise value while doing nothing to relieve — and arguably worsening — its liquidity position",
        "It transferred Bear Stearns' derivatives risk automatically to a central clearing counterparty"
      ],
      answer: 2,
      why: "Refusing novation requests signaled weakness rather than strength: it suggested Bear Stearns could not afford to let exposure go, which is the opposite of reassuring to nervous counterparties. This damaged reputational capital and franchise value and added to liquidity stress rather than relieving it. The 'it reduced Bear Stearns' liquidity strain by keeping cash collateral in-house' answer is the tempting distractor — technically true that granting a novation would remove cash collateral — but the reading is explicit that the *refusal* backfired reputationally rather than helping Bear Stearns' position."
    },
    {
      q: "What legal mechanism did JPMorgan Chase use against Lehman Brothers that is described as the final step forcing Lehman into bankruptcy?",
      options: [
        "A margin call under a standard ISDA Credit Support Annex",
        "Its full right of offset as Lehman's clearing bank, using Lehman's cash to offset JPMorgan's exposures and refusing to make intraday cash payments that would take Lehman's account negative",
        "A novation of all of Lehman's outstanding OTC derivatives to Goldman Sachs",
        "A formal petition to the Federal Reserve to place Lehman into conservatorship"
      ],
      answer: 1,
      why: "JPMorgan Chase, as Lehman's clearing bank, invoked its full right of offset: it used Lehman's own cash to net down JPMorgan's exposure and stopped extending the daylight overdraft privileges it normally granted, refusing payments that would push Lehman's account below zero. Lehman's resulting failure to meet same-day settlement obligations forced the bankruptcy filing. The other options describe real financial-market mechanisms but are not what the reading identifies as the specific, final trigger for Lehman."
    },
    {
      q: "Bear Stearns and Lehman Brothers both entered the 2007–2009 crisis with overnight-repo-funded leverage ratios above roughly what level?",
      options: [
        "3x",
        "10x",
        "30x",
        "100x"
      ],
      answer: 2,
      why: "The reading states both firms relied heavily on overnight repos with leverage ratios above 30x — meaning roughly 3% or less of their balance sheet was funded by equity capital, so even a modest percentage decline in asset values could wipe out their capital cushion. 3x and 10x understate the actual pre-crisis leverage the reading cites; 100x overstates it well beyond the figure given."
    },
    {
      q: "What was the specific policy objective of TARP's 2009 Public-Private Investment Partnership (PPIP), and what was it NOT designed to do?",
      options: [
        "It was designed to mitigate adverse selection in 'toxic' asset markets by offering below-market financing and absorbing losses above a threshold; it was NOT designed to force dealer banks to sell illiquid assets to reveal their 'true' market value",
        "It was designed to force dealer banks to sell illiquid assets immediately at market prices to reveal their true value, ensuring price discovery",
        "It was designed to provide FDIC deposit insurance directly to dealer banks' prime brokerage clients",
        "It was designed to replace repo financing entirely with central-bank-guaranteed term loans"
      ],
      answer: 0,
      why: "PPIP subsidized bidders for 'toxic' assets (like subprime-mortgage-backed CDOs) with below-market financing rates and by absorbing losses beyond a pre-specified level, directly targeting the adverse-selection problem that made buyers only willing to pay steep discounts. Forcing a sale to 'discover true value' is the opposite of the goal — the whole point was to avoid forced fire sales at those discounted, information-asymmetry-driven prices. The 'FDIC insurance for prime brokerage clients' and 'replace repo with central-bank-guaranteed term loans' answers describe unrelated mechanisms not part of PPIP's design."
    }
  ],

  sources: [
    { title: "Duffie, \"The Failure Mechanics of Dealer Banks\" (Journal of Economic Perspectives, 2010)", url: "https://www.aeaweb.org/articles?id=10.1257/jep.24.1.51", note: "The original source paper this reading condenses — the full academic treatment of the mechanism, business lines, and policy proposals." },
    { title: "Lehman Brothers — Wikipedia", url: "https://en.wikipedia.org/wiki/Lehman_Brothers", note: "Background on Lehman's collapse, including the JPMorgan Chase clearing relationship and the September 2008 bankruptcy filing." },
    { title: "Bear Stearns — Wikipedia", url: "https://en.wikipedia.org/wiki/Bear_Stearns", note: "Background on Bear Stearns' March 2008 collapse and its acquisition by JPMorgan Chase." },
    { title: "Troubled Asset Relief Program (TARP) — U.S. Department of the Treasury", url: "https://home.treasury.gov/data/troubled-assets-relief-program", note: "Official Treasury summary of TARP's programs, including the Public-Private Investment Program referenced in this reading." }
  ],

  pdf: { book: 4, query: "Large dealer banks provide a variety of intermediary functions" },

  summary: `<p><strong>Failure mechanism</strong>: counterparties merely QUESTIONING (not confirming) solvency trigger rational exit, which itself accelerates the liquidity crisis — a self-fulfilling dynamic operating through wholesale/institutional channels (prime brokerage, repo, derivatives) rather than retail depositors. <strong>Five business lines</strong> — OTC derivatives (matched book), repo financing, investment banking, prime brokerage, and commercial banking — each create their own exit channel, and a solvency scare hits all of them simultaneously. <strong>Named case mechanics</strong>: Bear Stearns' refusal of novation requests damaged confidence rather than protecting liquidity; JPMorgan Chase's invocation of its right of offset as Lehman's clearing bank — freezing cash settlement — was the final trigger of Lehman's bankruptcy; both firms ran overnight-repo leverage above 30x. <strong>Policy responses</strong>: central clearing (for standardized derivatives only), tri-party repo utilities/clearing banks and emergency banks (contagion-reduction infrastructure), the Fed's Primary Dealer Credit Facility, bank holding company conversion (Morgan Stanley/Goldman Sachs gained discount-window access post-Lehman), and TARP's PPIP (addressed adverse selection in toxic asset markets via below-market financing and loss absorption above a threshold).</p>`
});
