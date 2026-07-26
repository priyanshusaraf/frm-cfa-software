export default ({
  book: 3, reading: 52,
  session: "Operational Risk Focus Areas",
  title: "Case Study: Investor Protection and Compliance Risks in Investment Activities",
  tagline: "Four named regulations, then three bank fines (UBS, JPMorgan, Deutsche Bank) illustrating that penalties are sized to be punitive enough to exceed any benefit gained from the violation.",

  teaches: `<p>Four key investor-protection regulations (MiFID, MiFID II/MiFIR, the Investor Protection Act, and the Volcker Rule) and the two categories of regulatory compliance risk that these regulations exist to police: (1) suitability, disclosure, and fiduciary responsibilities, and (2) improper business and market practices. The reading then grounds these abstractions in three real, named enforcement actions: UBS ($11.15 billion, 2008), JPMorgan ($920 million, 2020), and Deutsche Bank Securities Inc. ($2 million, 2022), each illustrating a different flavor of violation (misrepresentation, market manipulation/spoofing, and failure of best execution respectively) and all sharing one design principle: the fine is set punitively, above and beyond the firm's ill-gotten gain.</p>`,

  why: `<p>Penalty sizing philosophy matters: fines aren't set to merely recover the ill-gotten gain. They're set punitively, specifically to exceed any benefit the firm gained from the violation, so that violating never becomes a positive-expected-value business decision. As a risk manager, you also need the regulatory vocabulary (MiFID vs. MiFID II vs. Dodd-Frank vs. Volcker) straight, because questions turn on exactly which regulation covers which mechanic, and because knowing WHY compliance breaches happen (asymmetric information, conflicts of interest, weak ethics culture, stressed employees) is what lets a firm design controls that prevent the next UBS/JPMorgan/Deutsche Bank rather than just paying for the last one.</p>`,

  intuition: `<p>Start with a fine that recovers exactly what the firm improperly gained, and nothing beyond it. Violating is then a free option. You try it, and if nobody notices you keep the money, and if you are caught you hand the money back. The coin never lands on "lose more than you made", so there is no reason not to flip it.</p><p>Punitive fines exist to break that logic. They make the EXPECTED cost of violating exceed the expected benefit, which is why enforcement actions are deliberately sized larger than the underlying gain.</p><p>The regulator is really solving a one-line inequality. For compliance to be the profit-maximizing choice, <em>probability of being caught × fine</em> has to exceed <em>probability of getting away with it × illicit gain</em>.</p><p>Now put a realistic number on the probability of being caught: it is well under 100%. So the left-hand side only ever collects a fraction of the fine, while the right-hand side collects most of the gain. The only way the arithmetic comes out in the regulator's favor is if the fine is a multiple of the gain rather than a refund of it.</p>`,

  formulas: [],

  concepts: [
    {
      name: "Four key regulations",
      def: "Four regulations govern investor protection here. MiFID (2004, implemented across the EU in 2007) covers business conduct and disclosure to prevent market abuse. MiFID II/MiFIR (2014) revised it after the 2007 to 2009 financial crisis, adding advisor pay, conflicts of interest, best execution, and product governance rules. The Investor Protection Act (Dodd-Frank, US, 2009) strengthens whistleblower protection, tightens OTC derivatives rules including mandatory clearinghouse use, and expands SEC oversight. The Volcker Rule (also Dodd-Frank) bans commercial banks from speculative, proprietary trading for their own account and limits their hedge fund and private equity investments; the same act created the Consumer Financial Protection Bureau (CFPB). Full detail in the breakdown below.",
      intuition: "Read these four as two pairs from two jurisdictions solving two different problems. The EU pair (MiFID to MiFID II/MiFIR) is about making sure investors get honest, complete information and fair treatment when they trade: think disclosure and conduct. The US pair (Investor Protection Act to Volcker Rule), both riding inside Dodd-Frank, is about the aftermath of the 2007 to 2009 crisis: protect the people who blow the whistle on wrongdoing, and stop banks that hold insured deposits from gambling with that money in proprietary trades.",
      example: "A European private bank that pays its financial advisors a commission tied to how many structured products they sell, without disclosing that conflict of interest to the client, is a MiFID II problem (advisor pay and conflicts of interest). A US commercial bank that runs a desk speculating in equity derivatives with its own balance sheet, unrelated to any client order, is a Volcker Rule problem (proprietary trading).",
      pitfall: "MiFID and MiFID II are distinct: MiFID is broad conduct/disclosure; MiFID II adds specific mechanics (advisor pay, best execution, product governance), so don't treat them as the same regulation with two names. Also don't confuse the Investor Protection Act with the Volcker Rule: both live inside Dodd-Frank, but the Investor Protection Act is about whistleblowers/OTC derivatives/SEC oversight, while the Volcker Rule is specifically about banning proprietary trading and creating the CFPB.",
      related: [{ r: 60, label: "R60: the Volcker Rule inside the broader Dodd-Frank reform wave" }],
      memory: "EU pair = disclosure and conduct (MiFID → MiFID II). US pair = crisis cleanup (Investor Protection Act for whistleblowers/OTC derivatives, Volcker Rule for banning prop trading)."
    },
    {
      name: "Two categories of regulatory compliance risk",
      def: "(1) Suitability, disclosure, and fiduciary responsibilities: did the firm recommend appropriate products, tell the client what they needed to know, and act in the client's interest where it had a duty to? (2) Improper business/market practices: did the firm's trading or dealing conduct itself (independent of any single client relationship) manipulate markets, misuse information, or otherwise cross a line?",
      intuition: "Category (1) is about the firm's relationship TO the client (what did you tell them, was the product right for them, did you put their interests first). Category (2) is about the firm's conduct IN the market (did you manipulate prices, front-run, or otherwise cheat the system itself). A single case can touch both: Deutsche Bank's best-execution failure below is a category-(1) fiduciary problem, while JPMorgan's spoofing is a category-(2) market-practice problem.",
      example: "Effective compliance risk management needs strong trade/employee supervision, robust middle/back-office functions, training, and ethics culture. Drivers of compliance breaches include asymmetric information between buyers and sellers (the seller typically knows more about a product than the buyer), conflicts of interest for traders who trade both for clients and for the firm's own account, and adverse economic conditions (high volatility periods increase trading errors and can tempt insider trading). Compliance breaches themselves can be unintentional (human error, ineffective policies) or intentional (fraud); the risk management framework has to guard against both.",
      related: [],
      memory: "TO the client (suitability, disclosure) versus IN the market (manipulation, unfair dealing): a relationship failure versus a conduct failure."
    },
    {
      name: "Punitive fine sizing philosophy",
      def: "Fines (illustrated by the UBS, JPMorgan, and Deutsche Bank cases) are sized to be punitive enough to EXCEED any benefit the firm gained from the violation, not merely to claw back what was taken.",
      intuition: "A fine has two possible jobs: restitution (give back what you took) or deterrence (make sure you never want to take it in the first place). Regulators pick deterrence, because restitution alone leaves the expected value of cheating at zero-or-better once you account for the chance of never getting caught at all.",
      pitfall: "This is deterrence, not just restitution. A fine that merely recovers the ill-gotten gain leaves the expected value of violating at zero or better; punitive sizing makes violating a negative-expected-value decision.",
      related: [],
      memory: "A fine that just gives back the winnings is a free lottery ticket. Punitive fines make sure violating never pays."
    },
    {
      name: "UBS ($11.15 billion, 2008): misrepresenting securities as safe",
      def: "In 2008, UBS was fined $11.15 billion (the largest single-organization penalty on record in this case set) for misrepresenting securities to investors as safe when, in fact, those securities carried significant liquidity risk.",
      intuition: "This is a category-(1) suitability/disclosure failure at enormous scale: investors were told they were buying something low-risk (implying they could sell it easily and get their money back close to face value), but the securities were actually exposed to serious liquidity risk: the risk that in a stressed market there simply isn't a buyer at any reasonable price. The size of the fine reflects both the scale of investor harm and the deliberate mischaracterization involved.",
      related: [],
      memory: "Called it safe, it wasn't liquid. Biggest bill of the three because the lie was biggest too."
    },
    {
      name: "JPMorgan ($920 million, 2020): spoofing",
      def: "In 2020, the U.S. Commodity Futures Trading Commission (CFTC) fined JPMorgan $920 million for market manipulation and deceptive conduct, centered on spoofing that spanned over eight years. Spoofing is the practice of entering orders you intend to cancel, never intending them to execute, purely to create a false appearance of buying or selling interest, which moves the market price, and then trading on the real order at that artificially moved price.",
      intuition: "Picture a trader who wants to buy at a lower price. They flood the order book with large sell orders they never intend to let execute, making it look like heavy supply is coming; other participants see the apparent selling pressure and push their own bids down. The trader then cancels the fake sell orders in rapid succession and buys at the depressed price they engineered. Repeated over eight years, this created artificial appearances of trading volume and prices that consistently benefited JPMorgan, which is why the CFTC (the U.S. regulator with jurisdiction over derivatives/futures markets, where much of this conduct occurred) brought the case rather than the SEC.",
      example: "The core deceptive mechanic is entering and then canceling orders in rapid succession purely to create a false impression of supply or demand, not because the trader ever wanted those orders filled.",
      related: [],
      memory: "Fake orders, real price move, then trade the real order at the price you just faked."
    },
    {
      name: "Deutsche Bank Securities Inc. ($2 million, 2022): best-execution failure",
      def: "In 2022, the Financial Industry Regulatory Authority (FINRA) fined Deutsche Bank Securities Inc. $2 million for violating best-execution practices between 2014 and 2018: the bank's obligation to secure the most favorable trade terms (price and speed) available for customer orders.",
      intuition: "This case is unusual in the trio precisely because it is small and involves no misrepresentation or manipulation: it's a pure fiduciary/execution-quality failure. Deutsche Bank routed customer orders through an order-handling system that caused execution delays and often resulted in only partial fills, and kept using that routing arrangement even after becoming aware of the problems. Worse, the bank received trading rebates for routing orders through that system (a financial incentive to keep using a system that was worse for its customers), and that rebate arrangement was only vaguely disclosed in public reports. Deutsche Bank settled without admitting or denying responsibility, which is a common resolution structure in these enforcement actions: the firm pays and changes behavior without a formal admission of wrongdoing.",
      pitfall: "Don't lump this in with UBS/JPMorgan as \"another manipulation case.\" This one is different in kind (a fiduciary and best-execution failure, category 1) as well as in scale ($2 million against billions and hundreds of millions).",
      related: [],
      memory: "No lie, no manipulation, just didn't route orders well, and got paid rebates for not fixing it."
    }
  ],

  connections: {
    from: [],
    to: [
      { r: 60, why: "The Volcker Rule and broader Dodd-Frank wave get their fuller regulatory-history treatment." }
    ],
    confused: [
      { what: "MiFID vs MiFID II/MiFIR", how: "MiFID (2007) is broad conduct/disclosure; MiFID II/MiFIR (2014) adds specific mechanics like advisor pay, best execution, and product governance. It is a more detailed successor, not a synonym." },
      { what: "The Investor Protection Act vs. the Volcker Rule", how: "Both are part of Dodd-Frank, but they solve different problems: the Investor Protection Act strengthens whistleblower protection, OTC derivatives rules, and SEC oversight; the Volcker Rule specifically bans proprietary trading by commercial banks and created the CFPB." },
      { what: "JPMorgan's spoofing vs. Deutsche Bank's best-execution failure", how: "Spoofing is intentional market manipulation (category-2 improper market practice) via fake orders that move prices; Deutsche Bank's failure was a fiduciary/execution-quality lapse (category-1 suitability/disclosure) with no manipulation or misrepresentation involved. Don't collapse the two into \"banks behaving badly\" as if they were the same type of violation." }
    ]
  },

  misconceptions: [
    { wrong: "\"Regulatory fines for investor protection violations are sized just to recover the firm's ill-gotten gains.\"", right: "Fines are deliberately sized to be PUNITIVE, exceeding the benefit gained, so that violating never becomes a rational, positive-expected-value business decision (deterrence, not restitution)." },
    { wrong: "\"MiFID and MiFID II are essentially the same regulation.\"", right: "MiFID (2007) covers broad business/organizational conduct and disclosure; MiFID II/MiFIR (2014) is a more detailed successor covering advisor pay, conflicts of interest, best execution, and product governance specifically." },
    { wrong: "\"All three case-study fines (UBS, JPMorgan, Deutsche Bank) involved the bank lying to or manipulating the market against investors.\"", right: "UBS misrepresented securities as safe (disclosure failure) and JPMorgan manipulated markets via spoofing (market-practice failure), but Deutsche Bank's fine was for failing to secure best execution for customer orders: a fiduciary/execution-quality lapse with no misrepresentation or manipulation involved." },
    { wrong: "\"Spoofing means placing large orders to genuinely try to trade a big position.\"", right: "Spoofing means entering orders the trader never intends to let execute, purely to create a false appearance of buying/selling interest that moves the market price, then canceling those orders and trading the real position at the artificially moved price." }
  ],

  highYield: [
    { stars: 3, what: "Punitive fine-sizing philosophy: exceeding the gained benefit, for deterrence.", why: "The core conceptual takeaway connecting all three bank fine examples." },
    { stars: 2, what: "Four key regulations and their specific focus areas.", why: "Straightforward classification recall." },
    { stars: 2, what: "The three case-study fines by amount, year, regulator, and violation type: UBS ($11.15bn, 2008, misrepresentation), JPMorgan ($920m, 2020, CFTC, spoofing), Deutsche Bank ($2m, 2022, FINRA, best execution).", why: "Matching the firm to the correct regulator, violation type, and rough fine magnitude is exactly what gets asked, and mixing them up is the classic trap." }
  ],

  recall: [
    { q: "Why are regulatory fines for investor protection violations typically sized well above the firm's actual illicit gain from the violation?", a: "If fines only recovered the ill-gotten gain, violating the rules would carry no real downside risk: worst case, you give back what you made. Sizing fines punitively (above the gain) ensures the expected cost of violating exceeds the expected benefit, making compliance the rational choice rather than merely a moral one." },
    { q: "What made the JPMorgan spoofing case a market-manipulation violation rather than just aggressive trading?", a: "JPMorgan entered large orders it never intended to let execute, purely to create a false appearance of buying/selling interest that moved prices, then rapidly canceled those orders and traded the real position at the artificially moved price. Repeated over eight years, this deceptive intent (not the mere size of the orders) is what made it manipulation." },
    { q: "Why is the Deutsche Bank Securities Inc. case categorized differently from the UBS and JPMorgan cases even though it's also a regulatory fine for investor protection failures?", a: "UBS (misrepresentation) and JPMorgan (spoofing) both involve the bank actively deceiving or manipulating the market. Deutsche Bank's $2 million FINRA fine, by contrast, was for failing to secure best execution: a fiduciary/execution-quality lapse (routing orders through a system causing delays and partial fills, while collecting rebates for doing so) with no misrepresentation or manipulation involved." }
  ],

  hooks: [
    { title: "No free lottery tickets", text: "A fine that only returns the ill-gotten gain is a free lottery ticket for violators: try it, and worst case you just give the money back. Punitive fines burn the ticket before it's ever drawn." },
    { title: "Three fines, three flavors", text: "UBS lied about safety, JPMorgan faked the order book, Deutsche Bank just didn't try hard enough for its clients: same punitive philosophy, three completely different underlying misconducts." }
  ],

  eli5: `<p>Imagine a kid who sneaks an extra cookie from the jar every day when no one's looking. If the only punishment, on the rare day they get caught, is "put the cookie back," then stealing cookies is a great deal: most days you keep the cookie, and on the rare bad day you just lose that one cookie, no worse off than if you'd never taken it. A smart parent instead says, "If I catch you, you lose your dessert privileges for a week," a punishment much bigger than one cookie, so that even accounting for the low chance of getting caught, sneaking cookies is a bad bet on average. That's exactly what regulators do with fines like UBS's $11.15 billion, JPMorgan's $920 million, and Deutsche Bank's $2 million: they size the punishment to exceed the benefit the firm gained, turning compliance violations into a losing proposition even when the firm might often get away with it.</p>`,

  thinkLike: `<p>A compliance risk manager doesn't ask "did we technically break a rule?" Instead they ask "which of the two buckets does this fall into: did we fail our duty TO a client (suitability, disclosure, fiduciary duty), or did we misbehave IN the market itself (manipulation, improper practices)?" That classification determines who investigates, which regulator is likely to get involved, and how the firm should remediate. When you read an enforcement case on the exam, first identify the violation type (misrepresentation vs. manipulation vs. execution failure), then identify which named regulation it violates, then note the regulator and rough fine size. The whole test is whether you can match firm to violation to regulator to regulation without swapping any of the four.</p><p>The "why punitive, not restitutive" logic also shows up on its own, dressed in different phrasing ("why would a regulator ever fine a firm more than the amount it improperly gained?"). It is always the same deterrence-versus-restitution idea, whichever case study carries it.</p>`,

  breakdown: [
    {
      title: "Key investor-protection regulations",
      points: [
        "MiFID (2004 enacted, 2007 implemented, EU): broad business/organizational conduct plus disclosure and reporting requirements to prevent market abuse.",
        "MiFID II / MiFIR (2014, EU): the post-crisis successor to MiFID, adding rules on advisor pay, conflicts of interest, fair communication with customers, independent investment advice, product governance, and best execution.",
        "Investor Protection Act (part of Dodd-Frank, 2009, US): strengthens whistleblower protection, tightens OTC derivatives rules (including mandatory clearinghouse use), and expands SEC oversight of new products and OTC derivatives.",
        "Volcker Rule (part of Dodd-Frank, US): bans proprietary/speculative trading by commercial banks and limits their hedge fund/private equity investments; the same Dodd-Frank Act created the CFPB."
      ]
    },
    {
      title: "Categories of regulatory compliance risk",
      points: [
        "Suitability, disclosure, and fiduciary responsibilities: did the firm recommend appropriate products, disclose what mattered, and act in the client's interest?",
        "Improper business and market practices: did the firm's conduct in the market itself (manipulation, unfair dealing) cross a line, independent of any single client relationship?"
      ]
    },
    {
      title: "Case-study fines",
      points: [
        "UBS, $11.15 billion, 2008: misrepresented securities as safe when they carried significant liquidity risk (largest single-organization penalty on record here; a suitability/disclosure failure).",
        "JPMorgan, $920 million, 2020, fined by the CFTC: market manipulation and deceptive conduct via spoofing over 8+ years (an improper market-practice failure).",
        "Deutsche Bank Securities Inc., $2 million, 2022, fined by FINRA: failed best execution between 2014 and 2018 by routing orders through a delay-prone system while collecting undisclosed rebates for doing so (a fiduciary/execution-quality failure, smallest fine and no manipulation or misrepresentation)."
      ]
    }
  ],

  lists: [
    {
      id: "regulations",
      title: "Investor-protection regulations, in order",
      axis: "The list runs EU pair then US pair, and within each jurisdiction from broad conduct rule to sharper successor: MiFID's broad conduct rules get sharpened by MiFID II, then the Dodd-Frank pair handles the crisis cleanup, ending on the Volcker Rule's outright ban.",
      items: [
        "MiFID (2004/2007, EU): broad business conduct and disclosure rules to prevent market abuse.",
        "MiFID II / MiFIR (2014, EU): advisor pay, conflicts of interest, best execution, product governance.",
        "Investor Protection Act (Dodd-Frank, 2009, US): whistleblower protection, OTC derivatives clearing, SEC oversight.",
        "Volcker Rule (Dodd-Frank, US): bans proprietary trading by commercial banks, created the CFPB."
      ]
    },
    {
      id: "fines",
      title: "Case-study fines, largest to smallest",
      axis: "Order by fine size, which tracks how far each violation strayed from honest dealing: outright deception (UBS) costs the most, active manipulation (JPMorgan) costs less, and a fiduciary lapse with no lie or manipulation (Deutsche Bank) costs least.",
      items: [
        "UBS, $11.15 billion (2008): misrepresented securities as safe.",
        "JPMorgan, $920 million (2020, CFTC): spoofing over eight-plus years.",
        "Deutsche Bank Securities Inc., $2 million (2022, FINRA): failed best execution."
      ]
    }
  ],

  pairs: [
    { left: "MiFID", right: "Broad EU business conduct and disclosure rules to prevent market abuse (2004/2007)." },
    { left: "MiFID II / MiFIR", right: "EU rules on advisor pay, conflicts of interest, best execution, and product governance (2014)." },
    { left: "Investor Protection Act", right: "Dodd-Frank provision for whistleblower protection, OTC derivatives clearing, and SEC oversight (US, 2009)." },
    { left: "Volcker Rule", right: "Dodd-Frank provision banning bank proprietary trading and creating the CFPB (US)." }
  ],

  topicTags: ["op-risk", "governance"],

  quiz: [
    {
      q: "Why are regulatory fines for investor protection violations typically set well above the amount the firm actually gained from the violation?",
      options: [
        "To cover the regulator's investigation costs",
        "To ensure the expected cost of violating exceeds the expected benefit, making compliance the rational choice (deterrence, not restitution)",
        "Because fines are legally required to equal at least 10x the gain in every jurisdiction",
        "To compensate other firms that lost market share to the violator"
      ],
      answer: 1,
      why: "The central point is deterrence: if a fine only restored the ill-gotten gain, violating would carry no real downside (worst case, give the money back), so fines are sized punitively above the gain. The 'covers investigation costs' answer is a plausible-sounding but unsupported justification never given in the source; the 'legally required 10x multiplier' answer invents a specific rule that doesn't exist; the 'compensate competitors' answer misattributes the purpose to compensating competitors rather than the violated investors/market."
    },
    {
      q: "Which regulation specifically prohibits commercial banks from proprietary trading and limits their investments in hedge funds and private equity funds?",
      options: [
        "MiFID",
        "MiFID II / MiFIR",
        "The Investor Protection Act",
        "The Volcker Rule"
      ],
      answer: 3,
      why: "The Volcker Rule (part of Dodd-Frank) bans speculative/proprietary trading by commercial banks and limits their hedge fund/PE investments. MiFID and MiFID II are EU conduct/disclosure regulations with no such ban; the Investor Protection Act (also Dodd-Frank) focuses on whistleblowers, OTC derivatives, and SEC oversight, not proprietary trading."
    },
    {
      q: "A firm's trading desk enters large sell orders it never intends to let execute, purely to create the appearance of selling pressure that pushes the market price down, then cancels those orders and buys at the depressed price. What is this practice called, and which of the three case-study firms was fined for it?",
      options: [
        "Front-running; UBS",
        "Spoofing; JPMorgan",
        "Insider trading; Deutsche Bank",
        "Churning; UBS"
      ],
      answer: 1,
      why: "This is spoofing: entering orders with no intent to execute them, purely to create a false appearance of market interest. JPMorgan was fined $920 million by the CFTC in 2020 for spoofing spanning over eight years. UBS was fined for misrepresenting securities as safe (not spoofing), and Deutsche Bank was fined for a best-execution failure, not insider trading or churning."
    },
    {
      q: "Deutsche Bank Securities Inc. was fined $2 million by FINRA in 2022. What was this fine primarily for?",
      options: [
        "Misrepresenting the liquidity risk of securities sold to investors",
        "Spoofing to manipulate futures prices over an eight-year period",
        "Failing to secure best execution (favorable price and speed) for customer orders, while collecting undisclosed rebates for the routing arrangement that caused this",
        "Proprietary trading in violation of the Volcker Rule"
      ],
      answer: 2,
      why: "Deutsche Bank's violation was a best-execution failure between 2014 and 2018: it routed orders through a system causing delays and partial fills, kept doing so despite awareness, and received rebates for it that were only vaguely disclosed. Misrepresenting liquidity risk describes the UBS case, spoofing describes the JPMorgan case, and proprietary trading describes conduct the Volcker Rule bans. None of them is what Deutsche Bank was fined for here."
    },
    {
      q: "Which of the following pairs correctly matches a regulation with a feature it specifically addresses?",
      options: [
        "MiFID II/MiFIR: best execution of client trades and advisor pay",
        "Volcker Rule: whistleblower protection",
        "MiFID (original, 2007): creation of the CFPB",
        "Investor Protection Act: banning commercial bank proprietary trading"
      ],
      answer: 0,
      why: "MiFID II/MiFIR (2014) explicitly addresses advisor pay, conflicts of interest, and best execution of client trades. Whistleblower protection belongs to the Investor Protection Act, not the Volcker Rule; the CFPB was created by Dodd-Frank via the Volcker Rule provisions, not by the original 2007 MiFID; and banning proprietary trading is the Volcker Rule's job, not the Investor Protection Act's."
    },
    {
      q: "Regulatory compliance risk in investment activities is generally split into two categories. Which pair correctly describes them?",
      options: [
        "Credit risk and market risk",
        "Suitability/disclosure/fiduciary responsibilities, and improper business/market practices",
        "Operational risk and liquidity risk",
        "Systemic risk and idiosyncratic risk"
      ],
      answer: 1,
      why: "The two categories are (1) suitability, disclosure, and fiduciary responsibilities and (2) improper business/market practices. The other options list legitimate risk categories from elsewhere in the FRM curriculum, but they are not the two categories that define compliance risk here."
    }
  ],

  sources: [
    { title: "The Volcker Rule (Federal Reserve)", url: "https://www.federalreserve.gov/supervisionreg/volcker-rule.htm", note: "Official Federal Reserve summary of the Volcker Rule's proprietary-trading restrictions." }
  ],

  pdf: { book: 3, query: "Two key regulations discussed are the European Union" },

  summary: `<p><strong>Four regulations</strong>: MiFID (conduct/disclosure), MiFID II/MiFIR (advisor pay, best execution, product governance), Investor Protection Act (whistleblower, OTC derivatives, SEC oversight), Volcker Rule (bars proprietary trading, created CFPB). <strong>Two compliance risk categories</strong>: suitability/disclosure/fiduciary duties; improper business/market practices. <strong>Fine sizing</strong>: punitive, deliberately exceeding the gained benefit (deterrence, not restitution), illustrated by three named cases: UBS ($11.15bn, 2008, misrepresenting securities as safe), JPMorgan ($920m, 2020, CFTC, eight years of spoofing), and Deutsche Bank Securities Inc. ($2m, 2022, FINRA, best-execution failure via delay-prone order routing and undisclosed rebates).</p>`
});
