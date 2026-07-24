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

export const banks = [
  {
    book: 1,
    domain: "Market risk",
    bank: "JPMorgan and the London Whale (CIO)",
    why: "A synthetic credit book grew so large it moved the market against itself; VaR was quietly re-modeled to keep reported risk low. The textbook case for VaR limits, model risk, and backtesting.",
    status: "planned",
  },
  {
    book: 2,
    domain: "Credit risk",
    bank: "Credit Suisse and Archegos",
    why: "A single family office built enormous concentrated, leveraged single-name exposure through total return swaps; weak counterparty-credit and concentration controls turned its default into billions of loss.",
    status: "planned",
  },
  {
    book: 3,
    domain: "Operational and resilience",
    bank: "Barings, Societe Generale, and Knight Capital",
    why: "Rogue trading and a runaway deployment: front-office control failures and a missing kill switch are the home of the bow-tie and three-lines-of-defense material.",
    status: "planned",
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
    status: "planned",
  },
];
