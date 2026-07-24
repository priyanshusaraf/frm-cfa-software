/* Workstream E: the real-world bank case-study system. A continuous thread that
   anchors each risk domain on a bank the curriculum already made famous for it.
   The exam MECHANICS always come from Schweser; a bank's real events and numbers
   are the ILLUSTRATION layer on top, and every field sourced from a real filing
   or real-world event that is NOT in the Schweser text carries the beyond-exam /
   real-world label (the section-6 extra-depth exception, the single sanctioned
   departure from "never invent"). Public figures below are approximate, from
   widely reported public sources, and labeled as such. No em/en dashes.

   PILOT: SVB (Book 4) is fully authored. The other four banks carry their
   mapping + rationale and are marked status:"planned" (functional Phase 2 stubs;
   narratives written in a later wave, flagged for the Phase 5 tone pass). Inline
   hook cards inside each reading are the reverse fan-out and come after the route
   exists (roadmap): the `hooks` here already power the "appears in" links on the
   case-study page. */

export const BEYOND_EXAM = "Beyond exam scope: real-world illustration";

/* Inline-hook lookup: every case-study hook that names reading `rn`, tagged with
   its bank + book so a Chapter callout can say "How <bank> handled this" and link
   into /case-study. Pure, derived from `banks` below. */
export function hooksForReading(rn) {
  const out = [];
  for (const b of banks) {
    for (const h of b.hooks || []) {
      if (h.rn === rn) out.push({ bank: b.bank, book: b.book, oneLiner: h.oneLiner });
    }
  }
  return out;
}

export const banks = [
  {
    book: 1,
    domain: "Market risk",
    bank: "JPMorgan and the London Whale (CIO)",
    why: "A synthetic credit book grew so large it moved the market against itself; VaR was quietly re-modeled to keep reported risk low. The textbook case for VaR limits, model risk, and backtesting.",
    status: "authored",
    narrative: [
      {
        label: "The position that moved its own market",
        html: "<p>In 2012 the Chief Investment Office of JPMorgan, meant to manage the bank's surplus cash conservatively, instead built an enormous book of synthetic credit derivatives (positions on credit-default-swap indices). One trader's book grew so large that the position itself moved the very index it was priced against, which is why the trader was nicknamed the London Whale. Book 1 is about putting a number on how much you could lose; this is what happens when that number is both huge and quietly managed.</p>",
      },
      {
        label: "Re-modeling VaR to fit under the limit",
        html: "<p>As the risk grew, the reported Value at Risk pushed against internal limits. Rather than cut the position, the desk adopted a new VaR model that roughly halved the reported figure, so the book looked to be within limits while the real exposure kept climbing. This is the model-risk lesson stated plainly: VaR is only as trustworthy as the model behind it, and a limit you can dodge by swapping models is not a limit. Losses eventually reached about six billion dollars.</p>",
      },
      {
        label: "Why backtesting was supposed to catch it",
        html: "<p>Book 1's backtesting material is the antidote here. Counting how often actual losses breach the VaR estimate, against Kupiec and the Basel traffic-light zones, is precisely the independent check that flags a model understating risk. A model that suddenly halves reported VaR should draw scrutiny, not relief. The episode is why VaR limits, model validation, and backtesting are taught together rather than separately.</p>",
      },
    ],
    hooks: [
      { rn: 1, oneLiner: "The London Whale is what an unmanaged, model-gamed VaR number looks like in practice." },
      { rn: 4, oneLiner: "Halving reported VaR by swapping models is exactly what backtesting exceptions are meant to expose." },
    ],
  },
  {
    book: 2,
    domain: "Credit risk",
    bank: "Credit Suisse and Archegos",
    why: "A single family office built enormous concentrated, leveraged single-name exposure through total return swaps; weak counterparty-credit and concentration controls turned its default into billions of loss.",
    status: "authored",
    narrative: [
      {
        label: "Concentrated leverage hidden in swaps",
        html: "<p>Archegos Capital Management, the family office of Bill Hwang, built enormous positions in a handful of stocks, but held them through total return swaps with prime brokers rather than buying the shares outright. The swap let Archegos take the economic exposure with a fraction of the cash, and it kept the size hidden from each broker, who saw only their own slice. Book 2's counterparty-credit material is exactly this: your exposure is to the party on the other side of the swap, and here that exposure was concentrated and heavily leveraged.</p>",
      },
      {
        label: "The default that hit Credit Suisse hardest",
        html: "<p>When the underlying stocks fell in March 2021, the swaps moved against Archegos and the margin calls exceeded what it could pay, so it defaulted. Several banks unwound quickly; Credit Suisse was slow and under-collateralized, and lost roughly five and a half billion dollars, far more than its peers. The difference was risk management: inadequate initial margin, poor visibility into the concentration, and a delayed close-out. That maps straight onto Book 2's counterparty tools, netting, collateral and margin, and wrong-way risk, and onto why the exposure a total return swap creates has to be measured and collateralized like any other credit exposure.</p>",
      },
    ],
    hooks: [
      { rn: 30, oneLiner: "Archegos took its concentrated exposure through total return swaps, the structure this reading covers." },
      { rn: 34, oneLiner: "Credit Suisse's loss was a collateral and margin failure: under-margined, slow to close out." },
    ],
  },
  {
    book: 3,
    domain: "Operational and resilience",
    bank: "Barings, Societe Generale, and Knight Capital",
    why: "Rogue trading and a runaway deployment: front-office control failures and a missing kill switch are the home of the bow-tie and three-lines-of-defense material.",
    status: "authored",
    narrative: [
      {
        label: "Three collapses, one control failure",
        html: "<p>Book 3's operational-risk framework was built from post-mortems, and three of the most famous are Barings (1995), Societe Generale (2008), and Knight Capital (2012). Different decades and different mechanics, but the same root: a control that was supposed to be independent was not there, or could be bypassed. These are the case studies the three-lines-of-defense, risk-identification, and bow-tie material is written to prevent.</p>",
      },
      {
        label: "Barings: the trader who checked his own trades",
        html: "<p>Nick Leeson ran both the trading desk in Singapore and the back office that was meant to settle and check it. Because he controlled both, he could hide mounting losses in a concealed error account while reporting profits upstairs. That is the three-lines-of-defense failure in its purest form: Line 1, the risk-taker, was also his own Line 2, the independent check. The losses reached hundreds of millions of pounds and the bank, more than two centuries old, collapsed. The lesson is exactly Book 3's: the value of a second line comes entirely from its independence, and merging it into the first destroys the point.</p>",
      },
      {
        label: "Societe Generale: controls a knowledgeable insider can game",
        html: "<p>Jerome Kerviel built enormous unauthorized directional positions and, using his back-office knowledge, faked the offsetting hedges that would otherwise have tripped the bank's alarms. The eventual loss was about five billion euros. The lesson sharpens Barings: risk identification has to assume an adversary who knows what the check looks for, not just an honest mistake. A control that only confirms a matching hedge exists can be satisfied with a fabricated one.</p>",
      },
      {
        label: "Knight Capital: the control that did not exist",
        html: "<p>Knight was not a rogue trader at all. In 2012 a botched software deployment left obsolete code active in production, and the firm's systems fired millions of erroneous orders into the market. With no kill switch to halt it, Knight lost roughly four hundred and forty million dollars in about forty-five minutes and was effectively wiped out. This is operational risk as a technology-and-process failure, and it is why Book 3 treats resilience, a tested ability to detect and stop a failure fast, as more important than trying to prevent every possible bug.</p>",
      },
      {
        label: "Each one is a bow-tie",
        html: "<p>Line all three up against the bow-tie diagram: on the left, causes and the preventive controls that should have stopped them (segregation of duties, position reconciliation, deployment sign-off); the risk event in the center; and on the right, the impacts and the detective and corrective controls that were missing or too slow (the concealed account uncovered too late, the absent kill switch). The op-risk framework you are learning is, quite literally, the generalization of these failures.</p>",
      },
    ],
    hooks: [
      { rn: 40, oneLiner: "Knight Capital shows why a tested kill switch (resilience) beats trying to prevent every deployment bug." },
      { rn: 41, oneLiner: "Barings collapsed because one person was both Line 1 and his own Line 2: the independence of the second line is the whole point." },
      { rn: 43, oneLiner: "Each of these collapses is a textbook bow-tie of causes, preventive controls, the event, and missing detective controls." },
    ],
  },
  {
    book: 4,
    domain: "Liquidity and treasury",
    bank: "Silicon Valley Bank (2023)",
    why: "The textbook liquidity and IRRBB failure in one week: held-to-maturity accounting, an unhedged duration gap, and a concentrated uninsured deposit base that ran on its phones.",
    status: "authored",
    narrative: [
      {
        label: "Why SVB is the textbook liquidity failure",
        html: "<p>Almost everything Book 4 teaches about liquidity and interest-rate risk, deposit stability, the LCR and NSFR, held-to-maturity accounting, and the duration gap, played out in a single week when Silicon Valley Bank collapsed in March 2023. The exam mechanics still come from Schweser; SVB is the real bank that shows you what happens when each of those mechanics is ignored.</p>",
      },
      {
        label: "The setup: a flood of deposits that looked sticky",
        html: "<p>Through 2020 and 2021 SVB's clients, mostly venture-backed technology startups, raised enormous amounts of cash and parked it at the bank, so deposits ballooned. Holding more cash than it could lend out, SVB bought long-dated, high-quality securities: US Treasuries and agency mortgage-backed securities. On paper this looked prudent, since the assets themselves were high quality. But it set up two of Book 4's warnings at once.</p>",
      },
      {
        label: "Warning one: held-to-maturity hides the loss, it does not remove it",
        html: "<p>SVB classified most of those securities as held-to-maturity (HTM). Under HTM accounting a security is carried at amortized cost, not marked to its current market value, so a fall in its price never touches the reported balance sheet. When interest rates rose sharply through 2022 the market value of those long-dated bonds fell hard, and SVB was carrying roughly fifteen billion dollars of unrealized losses on its HTM book, an amount close to its entire equity, none of which showed in the headline numbers. That is exactly the trap behind the HTM-versus-available-for-sale distinction: HTM does not make the loss disappear, it only defers when you are forced to recognize it.</p>",
      },
      {
        label: "Warning two: the deposits were never sticky",
        html: "<p>Book 4's deposit-stability material warns that deposits are less stable than they look: uninsured balances flee first, online banking makes moving money frictionless, and a concentrated depositor base moves as a herd. SVB was the extreme case. The vast majority of its deposits sat above the FDIC insurance cap, held by a tightly connected community of startups and their venture backers who all talked to each other. When a few prominent venture funds told their companies to pull cash, they all did, at once, from their phones.</p>",
      },
      {
        label: "The run: a forced sale plus concentration equals collapse",
        html: "<p>To raise cash SVB sold part of its available-for-sale book at a realized loss and announced a capital raise. That announcement told the market the unrealized losses were real. The concentrated, uninsured depositor base ran: roughly forty-two billion dollars was withdrawn in a single day. No liquidity buffer survives an outflow of that speed and size, and regulators closed the bank the next morning. This is the LCR scenario made real. The ratio asks whether your high-quality liquid assets cover a thirty-day stressed outflow, and SVB's outflow blew through any realistic assumption in a single day.</p>",
      },
      {
        label: "The interest-rate risk underneath it all (IRRBB)",
        html: "<p>Strip away the drama and SVB is a textbook duration mismatch. Its assets were long-dated and fixed-rate; its liabilities, the deposits, were effectively on demand. When rates rose, the value of the long assets fell while the cost and flightiness of the short liabilities rose. That is the repricing and duration gap Book 4 covers under interest-rate risk in the banking book, and SVB had reportedly removed much of its interest-rate hedging in the year before it failed.</p>",
      },
      {
        label: "Which documents were supposed to catch this",
        html: "<p>The compliance layer meant to surface exactly this risk includes a bank's liquidity coverage and net stable funding disclosures, its interest-rate-risk-in-the-banking-book reporting, and its internal contingency funding plan. Sitting below the largest-bank thresholds, SVB faced lighter versions of several of these requirements, which is part of why the risk built up unseen. The lesson the exam wants: these reports are not paperwork, they are the early-warning system, and switching them off does not switch off the risk.</p>",
      },
    ],
    /* Financial-statement deep-dive: a simplified, approximate public snapshot,
       each line tied to the exam concept it demonstrates. Rendered via the
       `annotated-table` F-widget. Numbers are rounded public figures, not a
       filing transcription. */
    statements: {
      title: "SVB simplified position (approximate public figures) and what each line demonstrates",
      cols: ["Approx. $B", "What it demonstrates"],
      corner: "Line item",
      unit: "",
      shade: false,
      rows: [
        { label: "Total assets", cells: ["~209", "the size of the balance sheet that failed"] },
        { label: "Held-to-maturity (HTM) securities", cells: ["~91", "carried at amortized cost: the unrealized loss is invisible on the balance sheet"] },
        { label: "Unrealized loss on HTM", cells: ["~15", "close to total equity: HTM defers recognition, it does not remove the loss"] },
        { label: "Available-for-sale (AFS) securities", cells: ["~26", "marked to market through equity: selling it crystallized a real loss"] },
        { label: "Total deposits", cells: ["~175", "the funding base; most above the FDIC cap, so flight-prone"] },
        { label: "One-day outflow (Mar 9, 2023)", cells: ["~42", "blew through any 30-day LCR stress assumption in a single day"] },
      ],
      note: "Approximate, from widely reported public sources. Illustration only.",
    },
    hooks: [
      { rn: 63, oneLiner: "SVB's uninsured, concentrated deposits are the deposit-stability failure this reading warns about." },
      { rn: 69, oneLiner: "SVB's one-day outflow blew through any 30-day LCR stress assumption." },
      { rn: 79, oneLiner: "SVB is a textbook repricing and duration gap: long fixed-rate assets, on-demand liabilities." },
    ],
  },
  {
    book: 5,
    domain: "Current issues",
    bank: "SVB and Credit Suisse (2023)",
    why: "Two recent, well-documented collapses that anchor the current-issues material on liquidity runs, contagion, and the speed of a digital-age bank run.",
    status: "authored",
    narrative: [
      {
        label: "Two 2023 failures the current-issues book dissects",
        html: "<p>The current-issues material is built around recent, well-documented events, and March 2023 supplied two: Silicon Valley Bank and Credit Suisse. SVB is covered in depth under Book 4 (the liquidity and interest-rate-risk failure); here the current-issues angle is the supervisory review of how it was allowed to happen. Credit Suisse adds a second, different lesson about the capital structure.</p>",
      },
      {
        label: "Credit Suisse: seniority turned upside down",
        html: "<p>As part of the emergency rescue by UBS, Credit Suisse's Additional Tier 1 bonds, the contingent convertible or CoCo instruments, were written down to zero while shareholders still received value in the deal. That inverts the intuitive capital hierarchy, where common equity is supposed to absorb losses before subordinated debt. The write-down was permitted by the specific contractual and regulatory triggers on those instruments, and it repriced the entire AT1 market overnight. The lesson the current-issues reading wants: a capital instrument's actual loss-absorbing behavior is set by its terms and by regulatory discretion, not by where its label sits on the usual seniority ladder.</p>",
      },
      {
        label: "Why these are current-issues canon",
        html: "<p>Both failures stress-test the whole curriculum at once, which is why they anchor this book. SVB exercises deposit stability, held-to-maturity accounting, and interest-rate risk (Book 4). Credit Suisse exercises capital-instrument seniority, contingent capital, and contagion across the AT1 market. Recent, thoroughly documented, and each a live demonstration that the frameworks earlier in the curriculum are the tools regulators reach for after the fact.</p>",
      },
    ],
    hooks: [
      { rn: 92, oneLiner: "This reading IS the SVB post-mortem; the full liquidity/IRRBB mechanics are in the Book 4 case-study deep-dive." },
      { rn: 93, oneLiner: "Credit Suisse's AT1 (CoCo) bonds were zeroed while equity survived: the seniority inversion this reading covers." },
    ],
  },
];
