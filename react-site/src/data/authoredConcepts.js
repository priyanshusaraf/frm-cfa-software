/* Authored concept pages that supplement the auto-detected core concepts
   (src/lib/coreConcepts.js). Each entry drives the SAME /concept/:slug page, no
   new page type (roadmap Phase 1, section 7.1 v2). Two layers:

     layer: "revision"  a foundational prerequisite (Part I / already-assumed)
                        re-taught from first principles, for a concept a one-line
                        refresher is not enough for (securitization, TVM,
                        duration/convexity, copulas, ...).
     layer: "core"      a deeper authored take on a reused advanced model that
                        goes past what the home reading's own fields carry.

   Shape (all fields optional except slug + name + layer):
     {
       slug, name, layer,
       lead,                       // one-line HTML summary under the title
       homeReading,                // reading this most belongs to (crumb + base layer)
       refs: [rn, ...],            // readings this concept surfaces in
       linkPhrases: ["..."],       // extra prose spellings the Phase 3 inline
                                   // linker should catch beyond `name` itself
                                   // (see src/lib/conceptLinks.js)
       sections: [{ label, html, tone }],   // ordered, problem-first (section 1a)
     }

   Content is authored FUNCTIONALLY in Phase 2 (the securitization flagship is the
   first), gated by the validator, then flagged for the Phase 5 tone pass. Every
   fact below is sourced from Schweser Book 2, Reading 28 (Structured Credit Risk,
   lines ~4740-4800) and Reading 39 (Introduction to Securitization); nothing is
   invented. No em/en dashes per the house prose rule. */
export const authoredConcepts = [
  {
    slug: "securitization",
    name: "Securitization and structured finance, from first principles",
    layer: "revision",
    homeReading: 39,
    refs: [28, 39, 30],
    linkPhrases: [
      "securitization", "securitisation", "structured finance",
      "special purpose vehicle", "credit enhancement",
      "overcollateralization", "excess spread",
      /* "pass-through" alone is not safe: R43 uses it for a control's
         failure-pass-through probability, nothing to do with MBS. */
      "pass-through MBS", "mortgage pass-through",
    ],
    lead: "Covered bonds to pass-through MBS to CMOs to CDO/CLO credit tranching, built one step at a time as the answer to one problem: a bank with illiquid loans that wants cash and risk transfer today.",
    sections: [
      {
        label: "Start here: a bank with a thousand mortgages and no cash",
        html: "<p>You run a bank, and you have just written a thousand thirty-year mortgages. Every one is a promise to pay you back slowly, over decades. On paper you are rich. In practice you are stuck: your cash is frozen in loans that will not mature for years, and you cannot write new business without fresh funding. You want to turn those illiquid, long-dated loans into cash today, and ideally move some of their risk off your own books so regulators make you hold less capital against them. Everything that follows is the industry's answer to that one problem, built up one step at a time.</p>",
      },
      {
        label: "The first move: borrow against the loans (covered bonds)",
        html: "<p>The obvious first move is to keep the mortgages and simply borrow against them. That is a <strong>covered bond</strong>. You carve the mortgages into a separate covered pool that still sits on your own balance sheet, and you issue a bond secured by that pool. If you go bust, the covered-bond investors get first claim on the pool, ahead of your general creditors. Crucially, you (the originator) still pay and guarantee the principal and interest yourself, so the payments do not depend on how the pool actually performs.</p><p>This is why a covered bond is <strong>not a true securitization</strong>. The assets never leave your balance sheet, and investors still have recourse against you, so they are really betting on your solvency, not the pool's performance. You get funding, but almost no capital relief and no real risk transfer: if you fail, the guarantee is only as good as you are.</p>",
      },
      {
        label: "The real move: sell the loans to a separate entity (pass-through MBS)",
        html: "<p>To actually move the risk, you have to genuinely sell the loans. You set up a new, legally separate shell company (a special purpose vehicle, or SPV) whose only job is to hold this one pool, and you sell it the mortgages in a <strong>true sale</strong>. Because the SPV is bankruptcy-remote (your own failure cannot reach into it), investors who buy its securities are exposed to the pool, not to you.</p><p>The simplest such security is a <strong>mortgage pass-through</strong>: the SPV collects the pool's cash flows and passes them straight through to investors, pro rata, minus a servicing fee. Most pass-throughs are agency MBS carrying a government guarantee, so default is barely a concern. The one risk that remains is <strong>prepayment</strong>: homeowners refinance when rates fall, or sell their homes, handing your principal back early, exactly when you least want it because now you must reinvest at those lower rates.</p>",
      },
      {
        label: "Where the pass-through runs out: everyone gets the same timing",
        html: "<p>A pass-through gives every investor an identical pro-rata slice, so every investor bears the <strong>same</strong> prepayment timing. That is a problem, because investors are not the same. A money-market fund wants its principal back soon and predictably; a pension fund wants a long, stable stream. Handing both the same undifferentiated slice serves neither well. Someone needs a way to divide up <em>when</em> the principal comes back.</p>",
      },
      {
        label: "Tranche the timing: the CMO",
        html: "<p>The <strong>collateralized mortgage obligation (CMO)</strong> answers exactly that. It takes the same pool of mortgages and tranches (divides) the cash flows into several securities by predetermined rules. In the most basic <strong>sequential-pay (waterfall)</strong> structure, Tranche 1 receives all principal each period until it is fully paid off, while the other tranches receive only interest and wait their turn; then principal flows down to Tranche 2, and so on. Tranche 1 therefore has very low prepayment risk because it is repaid first and fastest, while later tranches are long-dated. Notice carefully what is being divided here: <strong>prepayment and cash-flow timing</strong>, not credit. The collateral is usually agency-guaranteed, so default is not the point; the tranches differ in maturity and prepayment exposure.</p>",
      },
      {
        label: "When the collateral itself can default: structured credit and CDOs",
        html: "<p>Now change the collateral. Instead of government-guaranteed mortgages, pool <strong>risky</strong> debt: corporate bonds, leveraged loans, subprime mortgages, credit-card receivables. Suddenly the danger is no longer just <em>when</em> you get paid, it is <em>whether</em> you get paid at all, and tranching by timing does nothing for that. So structured credit products tranche a different risk: <strong>credit loss</strong>.</p><p>The <strong>equity tranche</strong> sits at the bottom and absorbs the first defaults up to a set level; it carries no fixed coupon, just the residual, which is why it is called equity. Above it, the <strong>mezzanine (junior) tranche</strong> takes losses only once the equity is wiped out. At the top, the <strong>senior tranche</strong> is protected by everything below it (that cushion is subordination, a form of credit enhancement), so it earns the highest rating and the lowest coupon. This whole family, where cash-flow-generating assets are pooled and tranched by credit, is the <strong>asset-backed security (ABS)</strong>: MBS is a special case, and the varieties include CBOs, CDOs, and CLOs. Pool a set of these together and you get a CDO-squared, a CDO of CDOs.</p>",
      },
      {
        label: "How the senior tranche is protected: credit enhancement",
        html: "<p>Making the senior tranche safe means pushing risk down onto someone else. <strong>Subordination</strong> is the first tool: the junior tranches simply stand in front of the senior one. Two internal enhancements go further. <strong>Overcollateralization</strong> puts more collateral in the pool than the notes issued against it, for example 101 mortgages backing bonds worth only 100, so the first default is absorbed before any tranche feels it. It is a hard enhancement because it exists from day one. <strong>Excess spread</strong> is the gap between what the pool earns and what the tranches are promised: if the collateral yields 8% net of fees and the tranches are promised 7%, the extra 1% builds up in a trust account to cover future shortfalls. It is a soft enhancement because it starts at zero and accumulates. Externally, the issuer can also buy a wrap (insurance) from a third-party monoline insurer.</p>",
      },
    ],
  },
  {
    slug: "cmo-vs-cdo-tranche",
    name: "Tranching: CMO cash-flow timing vs CDO/CLO credit loss",
    layer: "core",
    homeReading: 28,
    refs: [28, 39, 30],
    linkPhrases: [
      "collateralized mortgage obligation", "collateralized debt obligation",
      /* not bare "tranching": R77 tranches deposits by maturity for liquidity
         transfer pricing, which has nothing to do with either structure. */
      "collateralized loan obligation", "sequential-pay",
      "CMO", "CDO", "CLO",
    ],
    lead: "A CMO and a CDO both pool debt, slice it into tranches, and pay them in a waterfall, and they share the word tranche. But they divide two unrelated risks. Confusing them is one of the most common structured-finance mistakes.",
    sections: [
      {
        label: "Same skeleton, two different risks",
        html: "<p>Line a CMO and a CDO up and the machinery looks identical: a pool of assets, several tranches, a waterfall that pays them in priority order, and subordination protecting the top of the stack. The whole difference is <strong>which risk the waterfall is dividing</strong>.</p>",
      },
      {
        label: "CMO: dividing WHEN you are paid (prepayment / cash-flow timing)",
        html: "<p>A CMO tranches <strong>prepayment and cash-flow timing</strong>. The collateral is usually agency mortgages, so default is barely in the picture; what varies is <em>when</em> principal comes back. In a sequential-pay CMO, Tranche 1 receives all principal first and is repaid fast (low prepayment risk), while later tranches are long-dated. Every tranche expects to be paid in full; they differ in maturity, not in the chance of a loss. The risk being sliced is that homeowners prepay or do not, forcing you to reinvest earlier or wait longer than you planned.</p>",
      },
      {
        label: "CDO/CLO: dividing WHETHER you are paid (credit / default loss)",
        html: "<p>A CDO, or a CLO when the collateral is loans, tranches <strong>credit loss</strong>. The collateral is risky debt that can actually default. The equity tranche absorbs the first defaults, the mezzanine absorbs the next, and the senior tranche only takes a hit once everything below it is exhausted. Here the tranches differ in the <em>probability of losing principal</em>, not in timing. The risk being sliced is default: how many borrowers in the pool fail to pay, and in what order the losses eat up through the stack.</p>",
      },
      {
        label: "So which would you buy, and why",
        html: "<p>If you want a highly rated, essentially default-free instrument and your only real question is how long your money is tied up, you are in CMO territory: pick a tranche by the maturity and prepayment profile you want. If you are taking a view on credit and are willing to be paid more for standing closer to the losses, you are in CDO/CLO territory: the equity tranche pays the most and is wiped out first, the senior tranche pays the least and is protected by everyone beneath it. Same word, tranche; in one case it rations timing, in the other it rations default losses. Ask of any structured product: <strong>is this waterfall dividing when I get paid, or whether I get paid?</strong></p>",
      },
    ],
  },

  /* CVA, the hard-concept SEQUENCING pilot (react-site/CLAUDE.md section 8.7,
     spec 2026-07-26-hard-concept-sequencing-and-cva-core-concept-design.md).
     Not a coverage gap: R25, R29, R32, R35, R36, R37 and R38 each carry their
     piece correctly. The failure is ORDER. The inputs are taught twelve readings
     before the model consumes them, a compressed trailer lands before the
     formula exists, and one term R37 drops on purpose is supplied in R38. This
     page is the assembly, sequenced problem-first per section 1a rather than in
     curriculum order.

     Every fact is verified against Schweser Book 2 at the repo root: Reading 37
     (CVA, lines ~8153-8460), Reading 36 (exposure metrics, the netting factor,
     the margin period of risk), Reading 25 (hazard rates), Reading 35 (the CCP
     liquidation period), Reading 38 (the survival-probability term) and Reading
     32 (CVA as a price against credit limits as a cap). Worked numbers carried
     over from the source are labelled where they are the source's own; the
     illustrative swap in section one is an illustration, not a sourced figure.
     The Basel III CVA capital framework (R62) is deliberately OUT: it is
     regulatory capital, a different question, and folding it in is part of what
     makes CVA feel unbounded. */
  {
    slug: "cva",
    name: "Credit value adjustment (CVA)",
    layer: "core",
    homeReading: 37,
    /* Authored from first principles rather than from R37's own fields, so it
       reads correctly from a reading that PRECEDES R37. That exempts it from
       the inline linker's forward-only rule, which exists to stop an
       auto-detected page explaining itself in a later reading's terms. Without
       this the page would be unreachable from R25, R29, R32, R35 and R36, which
       is precisely where the student is stuck. */
    selfContained: true,
    refs: [25, 29, 32, 35, 36, 37, 38],
    linkPhrases: [
      "credit value adjustment", "credit valuation adjustment",
      "CVA", "BCVA", "bilateral CVA", "unilateral CVA",
      /* not bare "DVA": R32's xVA concept and R38's stress material both teach
         DVA in their own right, and a link that pulls the reader out of those
         explanations costs more than it gives. The full name still matches. */
      "debt value adjustment",
    ],
    lead: "CVA is a thread running through seven readings rather than a topic that lives in one. Its inputs are taught twelve readings before the model that consumes them, a compressed trailer arrives before the formula exists, and one term is left out on purpose and supplied later. This page puts the pieces in the order you would need to actually learn them.",
    sections: [
      {
        label: "You have made a bet, and the other side might not be there to pay",
        html: `<p>Picture two banks in a five-year interest rate swap on a notional of $100 million. Bank A pays fixed and receives floating; Bank B does the reverse. At inception the swap is worth nothing to either side, which is exactly what makes it a fair deal. Then rates move. A year in, floating has run above the fixed rate for long enough that the remaining life of the swap is worth about $4 million to Bank A. That value is not an abstraction: it is money Bank B is contractually going to hand over across the next four years.</p>
        <p>Now hold onto the one fact everything else hangs off. The textbook price of that swap, the number a pricing model prints, quietly assumes Bank B is there to pay. If Bank B fails while the swap is worth $4 million to Bank A, that $4 million does not arrive in full. Bank A joins the queue of creditors and recovers a fraction of it. So the swap was never worth its textbook value to Bank A. It was worth slightly less, and the size of that shortfall is what this whole chain of readings is about.</p>
        <p>Schweser states the relationship in one line: <strong>risky value = risk-free value minus CVA</strong>. The credit value adjustment is the price of the possibility that the other side is not there to pay. Everything else, all six extensions and every trap, is a variation on computing that one number.</p>`,
      },
      {
        label: "Why the loan answer does not work here",
        html: `<p>You already know how to price the risk of someone not paying you, because you did it for loans. Expected loss is probability of default times loss given default times exposure at default, and for a loan every one of those three is a number you can write down today. Lend $100 million for five years and the exposure at default is roughly the outstanding balance. It sits still. Nothing the market does changes what the borrower owes you.</p>
        <p>Try that on the swap and the first term breaks immediately. What is Bank A's exposure at default? A year in it was $4 million. Six months earlier it was zero. Six months later, if rates reverse, it could be negative, meaning Bank A owes Bank B rather than the other way round. There is no single amount owed, so there is no single number to put in the formula. What exists instead is a distribution of possible values at every future date. The honest answer to "how much are we owed" is that it depends on the date, and on where the market went to get there.</p>
        <p>This is exactly the difficulty R32 flags: a loan's exposure is basically fixed and known, while a derivative's is a distribution over future values that can flip sign. It is also why Schweser says the pricing challenge arises with bilateral contracts such as swaps, where both legs can end up in the money, rather than with one-way instruments such as bonds, where only one side ever owes. If the exposure will not stand still long enough to be a single number, you have to stop asking about the deal as a whole and start asking about one future moment at a time. That is where the summation comes from.</p>`,
      },
      {
        label: "Only the part where they owe you can hurt you",
        html: `<p>Before any notation, settle one asymmetry, because it is the most-tested conceptual point in the chain and it is what makes the input to CVA a particular quantity rather than the obvious one.</p>
        <p>Return to Bank A, and suppose the swap has moved the other way: it is now worth minus $4 million to Bank A, which means Bank A owes Bank B. Bank B defaults. What does Bank A lose? Nothing. It owed the money, and it goes on owing it; the claim now belongs to Bank B's estate and Bank A settles as normal. A counterparty defaulting while you are underwater costs you nothing at all.</p>
        <p>So the quantity that matters is not the mark-to-market value of the trade, which can be either sign. It is the mark-to-market value floored at zero: <strong>exposure is what they owe you, and nothing when they do not.</strong> That flooring is why R36 spends a whole reading building exposure metrics instead of just handing you a value profile, and it is the reason the term inside the CVA sum is expected exposure and not expected value.</p>
        <p>Four names come out of R36 and they are worth separating cleanly, because they look alike and two of them get confused constantly:</p>
        <ul>
        <li><strong>Expected exposure, EE(t)</strong>, is the average of that floored quantity at one future date t. This is the term the CVA formula uses, one value per date.</li>
        <li><strong>Expected positive exposure, EPE</strong>, is the average of EE across time, so it is a single scalar for the whole profile rather than a curve. The word "positive" pairs it against expected negative exposure, not against PFE.</li>
        <li><strong>Expected negative exposure, ENE</strong>, is the mirror: the average of what YOU owe THEM, floored at zero from their side. It sits idle until the bilateral version arrives, where it is the input to DVA.</li>
        <li><strong>Potential future exposure, PFE</strong>, is a high quantile of exposure at a given date, not an average. It answers "how bad could this get" for a credit limit, not "what is this worth" for a price.</li>
        </ul>
        <p>The distinction that actually separates EPE from PFE is the time dimension: EPE is a scalar time-average, PFE is a per-date quantile. Both are already floored at zero, so the word "positive" is not what tells them apart. Schweser's own quiz text in this reading once prints "expected potential exposure" for EPE; it is a slip, and the expansion you should carry is <strong>expected positive exposure</strong>.</p>`,
      },
      {
        label: "Four questions about one future moment",
        html: `<p>Stop trying to price the swap. Price one date. Pick a single future moment, say three years and three months from now, and ask four questions about it.</p>
        <p><em>How much would they owe me if they defaulted right then?</em> That is EE at that date, the floored exposure from the previous section, and R36 is the machine that produces it. <em>What is the chance they default in that particular window rather than earlier or later?</em> That is a marginal default probability for the interval, and it comes from R25. A hazard rate is backed out of the counterparty's credit spread, roughly the spread divided by one minus the recovery rate, then turned into the probability of surviving to a date and failing in the slice after it. <em>If it happens, what fraction of the exposure do I actually lose?</em> One minus the recovery rate. <em>And what is a loss suffered at that future date worth to me today?</em> The discount factor.</p>
        <p>Multiply those four together and you have the expected loss attributable to that one moment. Then do the same for every other date in the trade's life and add them up. That sum, carrying a minus sign because it is a cost rather than a gain, is CVA:</p>
        \\[ \\text{CVA} = -(1-\\text{RR}) \\sum_{i} \\text{EE}(t_i)\\, q_i\\, \\text{DF}(t_i) \\]
        <dl class="term-list">
          <div><dt>\\(\\text{EE}(t_i)\\)</dt><dd>Expected exposure at date \\(t_i\\): the average of what the counterparty would owe you at that date, floored at zero.<div class="term-why">This is the whole reason R36 exists. It is also the only term netting and collateral touch, which is why those two mitigants never move the default probability.</div></dd></div>
          <div><dt>\\(q_i\\)</dt><dd>The probability the counterparty defaults during interval \\(i\\), rather than before it or after it.<div class="term-why">Supplied by R25's hazard-rate machinery, twelve readings upstream. Marginal, not cumulative: each date claims its own slice of default risk so the intervals do not double-count.</div></dd></div>
          <div><dt>\\(1-\\text{RR}\\)</dt><dd>Loss given default, the fraction of the claim that does not come back.<div class="term-why">It sits outside the summation because a single recovery assumption is applied to the whole counterparty, not re-estimated date by date.</div></dd></div>
          <div><dt>\\(\\text{DF}(t_i)\\)</dt><dd>The discount factor for date \\(t_i\\).<div class="term-why">Each date's expected loss is a future amount, so it has to be pulled back to today before the dates can legitimately be added together.</div></dd></div>
          <div><dt>\\(\\sum_i\\)</dt><dd>The sum across every future date in the trade's life.<div class="term-why">This is the single structural difference from the loan formula. A loan has one exposure and one default probability; a derivative has a curve of each, so expected loss is computed per date and accumulated.</div></dd></div>
          <div><dt>The minus sign</dt><dd>A convention marking CVA as a cost, a deduction from the risk-free value.<div class="term-why">Schweser's professor's note calls it out explicitly, and it is why a standalone unilateral CVA can only ever come out negative. Only the bilateral version can flip positive.</div></dd></div>
        </dl>
        <p>Two things the formula quietly assumes are worth naming now, because both come back later as extensions. It assumes exposure and default probability are <strong>independent</strong>, which is what lets the two curves be multiplied date by date. And it needs no simulation of default events at all, which is what makes it fast enough to be a working desk calculation aggregating inputs from different parts of the risk organisation.</p>`,
      },
      {
        label: "The same formula wearing six costumes",
        html: `<p>R37 looks long because it presents six further topics after the formula. It is shorter than it looks, because each one moves exactly one of the four inputs you just met. That question, <strong>which input does this move</strong>, is the organising insight of the whole reading.</p>
        <p><strong>Running spread, which collapses the sum.</strong> A trader on a live call cannot wait for a full exposure profile, so the CVA is quoted as an annual charge in basis points instead of an upfront amount: divide the CVA by the unit premium of a risky annuity for that maturity. The quick approximation is the counterparty's credit spread multiplied by EPE. With EPE at 6% of notional and a credit spread of 375 basis points, the CVA spread is about minus 23 basis points, which the trader shaves off the swap's rate leg. This is not a second formula. The credit spread already contains default probability times loss given default per year (that is what the hazard-rate relation in R25 says), and EPE is exposure already averaged across time, so the product is the same object with the summation done in advance. It holds only under the three assumptions Schweser attaches: EPE constant across the profile, default probability constant across the profile, and EE or default probability symmetric across it. Converting an existing upfront CVA into a running spread instead uses risky duration: an upfront CVA of minus 90,000 on a five-year swap with notional 100 million and risky duration 3.75 becomes minus 2.40 basis points. In practice that is solved recursively, because charging the spread changes the swap's value and therefore its CVA.</p>
        <p><strong>Spread level, curve shape and recovery, which move the default probability and the loss fraction.</strong> A wider credit spread generally raises CVA, but not linearly, because default probability cannot exceed 100%: right at the edge of default CVA actually ticks down slightly, and in default it falls to zero. Curve shape matters for a reason worth holding. An upward-sloping credit curve puts the counterparty's default risk later in the trade's life, where it is discounted harder and where exposure on many profiles has already begun to amortise. So an upward-sloping curve produces a LOWER CVA than a flat one, and a downward-sloping curve a higher one. Recovery is the genuinely counterintuitive one. Raising the assumed recovery rate raises the default probability implied by the same observed spread, since the spread has to be explained by more frequent defaults each costing less. Yet CVA falls, because the loss fraction shrinks directly and that effect dominates. The settled-versus-actual case is the same arithmetic run twice. Take a settled recovery of 10% used to imply default probabilities, but an actual recovery of 40% realised on the claim. CVA comes out lower than if 40% had been used for both, because the low settled assumption implies a mild default probability and the high actual recovery then cuts the loss on top of it.</p>
        <p><strong>Netting and collateral, which move exposure and nothing else.</strong> This single fact kills answer choices on sight: neither of them touches the counterparty's default probability. Netting reduces CVA because offsetting trades under one agreement settle to a single net amount, so the amount at risk shrinks. R36 quantifies the benefit with the netting factor: about 71% of the unnetted exposure for two uncorrelated trades, and 50% for four. CVA with netting can never be higher than CVA without it, since netting cannot increase exposure. Collateral reduces CVA by shrinking expected exposure. The details cut both ways. A threshold (exposure allowed to run uncollateralised before a call is triggered) and a minimum transfer amount (the smallest movement worth processing) both INCREASE CVA, because each leaves a slice of exposure permanently uncovered. Initial margin DECREASES it, being effectively a negative threshold: it is posted before any exposure exists at all.</p>
        <p><strong>Incremental and marginal CVA, which substitute a different exposure.</strong> Both reuse the formula unchanged except for what goes in the EE slot. Incremental CVA substitutes the CHANGE in expected exposure a new trade causes, given netting against the existing book, and it answers an ex-ante pricing question: should we do this trade, and at what price. Marginal CVA substitutes each trade's marginal expected exposure so that the trade-level pieces sum back to the total netted CVA, and it answers an ex-post attribution question: which of the trades we already have is driving this number. One more consequence follows from netting: the benefit shrinks as the new trade grows relative to the existing book, so for a large enough trade incremental CVA converges on standalone CVA.</p>
        <p><strong>Bilateral CVA and DVA, which add the mirror term.</strong> Everything so far priced only the counterparty's default. Before the 2007 to 2009 crisis that was standard, and it favoured whichever side was stronger, usually the bank. The crisis made it untenable to assume the bank itself was default-free. Bilateral CVA adds the debt value adjustment, which is the same calculation run from the other side: it uses ENE, the exposure that runs in the counterparty's favour, and the institution's own credit spread. DVA enters as a benefit, and the reason is uncomfortable but mechanical: if the institution defaults first while owing money, it pays only the recovery fraction of what it owed, and the difference is a gain to the defaulting party. As a spread, with EPE at 5%, ENE at 3%, a counterparty spread of 300 basis points and an institution spread of 200, BCVA works out to minus 9 basis points. The bilateral view then carries consequences the unilateral one cannot. BCVA can be POSITIVE when DVA exceeds CVA, which is the only way any number in this chain comes out positive, and it means the institution is the riskier party. It is symmetric, so if one side computes plus X the other computes minus X. Netting can actually be a DISADVANTAGE when DVA dominates, because without netting the institution could settle its favourable contracts and leave the unfavourable ones as ordinary bankruptcy liabilities. And in theory, if both sides agree on parameters, all BCVAs in the market sum to zero, which holds far better in theory than in practice.</p>
        <p><strong>Wrong-way risk, which breaks the independence assumption.</strong> This is why wrong-way risk lives in the CVA reading rather than somewhere else. The base formula multiplies EE by q date by date, and that multiplication is only valid if the two are independent. Wrong-way risk is the case where they are not: the same shock that inflates your exposure also raises the counterparty's chance of failing. The monoline insurers in 2008 are the canonical case, since the collapse in mortgage collateral simultaneously raised what the CDS protection was worth and destroyed the insurer's ability to pay it. Quantifying it means replacing the unconditional default probability with expected exposure CONDITIONAL on the counterparty defaulting, which is higher, so wrong-way risk raises CVA and lowers DVA. Right-way risk is the mirror and does the opposite. The counterintuitive result to carry: higher counterparty credit quality AMPLIFIES wrong-way risk rather than damping it, because a high-quality name defaulting is a rare and surprising event, which makes it more likely that whatever caused it was large enough to have moved your exposure too.</p>`,
      },
      {
        label: "The window where collateral has not arrived yet",
        html: `<p>The margin period of risk only means something once you know collateral shrinks exposure, which is why it belongs here rather than earlier. The question it answers is uncomfortable: under a daily collateral agreement, how long are you actually unprotected? Not zero. R36 breaks the window into five steps, and the market moves through all of them. You value the position and make the margin call, the counterparty releases collateral, settlement happens, a grace period runs before you are entitled to declare failure, and only then do you liquidate and re-hedge what you hold.</p>
        <p>Because exposure over that window is just volatility grown over time, it scales with the square root of the window's length. R36 measures it directly: with 7% annual volatility, a ten-day margin period and 99% confidence, potential future exposure is about 3.3% of notional. R37 applies the same scaling to the price: doubling the margin period from ten days to twenty multiplies CVA by roughly the square root of two, not by two. Push the window out far enough and collateral stops helping at all, since CVA converges on the uncollateralised number. Schweser's anchor for that convergence is a margin period of about forty days, at which CVA is roughly half the uncollateralised CVA.</p>
        <p>A central counterparty runs the same window with a different internal shape, which R35 sets out in three stretches. The pre-default stretch runs from the defaulter's last margin posting to the moment the CCP formally declares default, and risk simply builds through it unhedged. Macro-hedging comes next, where liquid hedges knock down the largest market risks quickly. Then the auctions run, and risk actually falls to zero as positions leave the book. Macro-hedging only stops the bleeding. The auction is what ends the exposure.</p>`,
      },
      {
        label: "What R37 leaves out on purpose",
        html: `<p>Look carefully at the bilateral formula and something is missing. It weighs the counterparty's default and it weighs the institution's own default, but it never asks whether the institution is still alive at the moment the counterparty fails. If the institution defaults first, it never suffers the counterparty loss at all, so charging for that loss at full weight overstates it.</p>
        <p>That term is a survival probability, and R37 omits it deliberately. Schweser's professor's note says so in as many words and points forward: the survival probability enters the BCVA equation in R38, under stress testing. Knowing the omission is deliberate is what stops you re-reading R37 convinced you have misunderstood the algebra.</p>
        <p>When R38 does add it, each term is weighted by the OTHER party's survival probability. You only lose to a counterparty if you are still around to be owed, and you only benefit from your own default if the counterparty is still around to be paid. R38 also delivers the result that makes DVA memorable, and it comes from where the survival probability is calibrated. It is read off the institution's own credit spread. So an IMPROVEMENT in the institution's credit quality raises its survival probability, cuts its DVA, and shows up as a loss in the stress profit and loss. Nothing about the business got worse. It simply became less likely to walk away from obligations it would then have had to settle in full.</p>`,
      },
      {
        label: "Directions, not formulas",
        html: `<p>Now that each mechanism has been explained, the whole reading compresses into a table of directions. Most CVA exam questions are a direction question wearing a story. Read it as revision, not as the material.</p>
        <div class="tablewrap"><table>
        <thead><tr><th>Change</th><th>Which input moves</th><th>Effect on CVA</th></tr></thead>
        <tbody>
        <tr><td>Netting agreement added</td><td>Exposure</td><td>Falls, and never rises</td></tr>
        <tr><td>Collateral posted</td><td>Expected exposure only, never default probability</td><td>Falls</td></tr>
        <tr><td>Threshold or minimum transfer amount raised</td><td>Expected exposure</td><td>Rises, since more exposure runs uncovered</td></tr>
        <tr><td>Initial margin raised</td><td>Expected exposure (a negative threshold)</td><td>Falls</td></tr>
        <tr><td>Longer margin period of risk</td><td>Expected exposure</td><td>Rises with the square root of the window, toward the uncollateralised figure</td></tr>
        <tr><td>Counterparty credit spread widens</td><td>Default probability</td><td>Rises, but nonlinearly, and it collapses to zero in default itself</td></tr>
        <tr><td>Credit curve slopes upward rather than flat</td><td>Default probability timing</td><td>Falls, because the risk sits later and discounted</td></tr>
        <tr><td>Assumed recovery rate raised</td><td>Loss fraction, and implied default probability the other way</td><td>Falls, because the smaller loss dominates the higher implied default rate</td></tr>
        <tr><td>Wrong-way risk present</td><td>The independence assumption itself</td><td>Rises, and DVA falls</td></tr>
        <tr><td>Right-way risk present</td><td>The independence assumption itself</td><td>Falls, and DVA rises</td></tr>
        <tr><td>Institution's own credit spread widens (bilateral)</td><td>DVA</td><td>BCVA becomes less negative, and can turn positive</td></tr>
        </tbody>
        </table></div>`,
      },
      {
        label: "Traps, and the three questions to ask any CVA problem",
        html: `<p>Faced with any CVA question, ask three things in order. <strong>Which of the four inputs is this moving?</strong> Exposure, default probability, loss fraction or discounting; almost every scenario moves exactly one, and naming it usually answers the question before any arithmetic. <strong>Is this unilateral or bilateral?</strong> A unilateral CVA is always negative, so any answer choice offering a positive number is only live in the bilateral case. <strong>Is independence still assumed?</strong> That third question is the wrong-way risk detector, and it is worth more than any single fact in the reading, because the base formula is silently invalid the moment the answer is no.</p>
        <p>The traps that recur:</p>
        <ul>
        <li><strong>Incremental against marginal.</strong> "Should we add this trade" is incremental. "Which of our existing trades is driving this" is marginal. Both are the same formula with a different exposure term.</li>
        <li><strong>Netting increases CVA.</strong> It does not. It reduces exposure, so it reduces CVA, and CVA with netting is never higher than without. The one genuine exception is bilateral, where netting can hurt an institution whose own DVA dominates.</li>
        <li><strong>Collateral does not change CVA because it leaves default probability alone.</strong> It changes expected exposure, and CVA depends on expected exposure, so it very much changes CVA.</li>
        <li><strong>A higher recovery rate should raise CVA.</strong> It raises the implied default probability but lowers CVA, because the loss fraction falls and that effect wins.</li>
        <li><strong>A high-quality counterparty means less wrong-way risk.</strong> The reverse. A rare default is more likely to be tied to something big enough to have moved your exposure as well.</li>
        <li><strong>Two names, one thing.</strong> Schweser prints both "credit value adjustment" and "credit valuation adjustment". They are the same quantity. Do not hunt for a difference.</li>
        </ul>
        <p>One boundary is worth stating plainly, because leaving it vague is part of what makes CVA feel unbounded. The Basel III CVA capital framework in R62 is <strong>not</strong> this. That framework asks how much regulatory capital a bank must hold against the risk that its CVA moves; everything on this page asks what the counterparty's default is worth as a price. Different question, different answer, separate bucket. In the same spirit, R32's point is that CVA is a PRICE applied at the trade and counterparty level, while a credit limit is a CAP applied at the portfolio level. The two are independent gates, so a trade can clear its CVA charge and still be blocked by a limit.</p>`,
      },
    ],
  },

  /* The Basel capital stack, the second hard-concept sequencing page (spec
     2026-07-26-hard-concept-sequencing-and-cva-core-concept-design.md, candidate
     four). Criterion test applied 2026-07-27: it spans R59, R60, R61 and R62;
     its order breaks in two places (the IRB formula depends on the Vasicek
     machinery defined in R26, thirty-three readings earlier, and the output
     floor in R61 exists to fix what the IRB approach in R59 allowed); and a
     student who has read all four can recite Tier 1, the buffers, the leverage
     ratio and the output floor without being able to say why a bank needs all
     of them at once. Each reading is a snapshot of one Basel version. Nothing
     holds the through-line, which is that every version is a repair to the
     previous one and the repairs are what make the current stack the shape it
     is.

     Sourced from Schweser Book 3 at the repo root (the reforms and the output
     floor at lines ~8119-8205) and from the four readings' own already-gated
     content. The causal claim that internal models produce lower capital, which
     is the whole reason the output floor exists, is the source's own: "capital
     charges are generally lower using this method" and "the idea of an output
     floor is to restrict the ability of large banks to gain an advantage by
     significantly reducing their capital requirements by using internal
     approaches instead of SA". */
  {
    slug: "basel-capital-stack",
    name: "The Basel capital stack",
    layer: "core",
    homeReading: 60,
    selfContained: true,
    refs: [59, 60, 61, 62],
    linkPhrases: [
      "Basel I", "Basel II", "Basel 2.5", "Basel III",
      "output floor", "capital conservation buffer", "countercyclical buffer",
      /* not "leverage ratio", "LCR" or "NSFR": each already owns its own page,
         and a link that pulls a reader off a specific ratio onto the general
         stack is a downgrade. */
    ],
    lead: "Basel I, Basel II, Basel 2.5, Basel III and the 2017 finalization are usually met as five separate sets of rules to memorize. They are one object being repaired. Every version exists because the previous one was gamed or was overwhelmed, and knowing which failure each repair answers is what makes the current stack memorable instead of arbitrary.",
    sections: [
      {
        label: "A bank runs on money it does not own",
        html: `<p>Start with the balance sheet, because every rule in this chain is an argument about one line on it. A bank funds itself overwhelmingly with other people's money: deposits, bonds, short-term borrowing. Only a thin slice at the bottom belongs to the shareholders. When a loan goes bad, that slice absorbs the loss first, and the depositors are untouched as long as the losses stay smaller than it.</p>
        <p>Push the losses past that slice and something different happens. The bank is now insolvent, the depositors are the ones actually bearing the loss, and since depositors do not monitor loan books, the state usually ends up standing behind them. That is the whole regulatory problem in one sentence: <strong>the people bearing the downside are not the people choosing the risk.</strong> A shareholder with a thin slice and a state guarantee behind them has every reason to lend aggressively, because they keep the upside and someone else absorbs the tail.</p>
        <p>So a regulator's job reduces to forcing the owners to keep enough of their own money in the bank that they feel the losses their choices create. Everything below is successive attempts to define "enough" in a way that cannot be gamed.</p>`,
      },
      {
        label: "The simplest rule, and the trade that defeats it",
        html: `<p>The obvious first definition is a plain ratio: capital divided by total assets, above some minimum. Simple, hard to argue with, impossible to misreport. Basel I's first Cooke ratio is essentially that, requiring assets to stay under twenty times capital.</p>
        <p>Now play the bank's side of it. The rule counts a Treasury bill and a speculative corporate loan identically, because both are one dollar of assets. The corporate loan pays far more. So the bank sells the Treasury bills, buys the corporate loans, and its ratio does not move at all while its actual risk of failing has multiplied. The rule is satisfied, and it has made the bank more dangerous by rewarding exactly the swap it should have discouraged. A capital rule that ignores what the assets are is not a weak rule. It is an incentive pointed the wrong way.</p>`,
      },
      {
        label: "Weight the assets by risk: Basel I, 1988",
        html: `<p>Basel I's answer, and its real innovation, is to stop counting dollars and start counting risk-weighted dollars. Each asset is multiplied by a weight before it is compared to capital: zero for Treasury bills, 50% for uninsured mortgages, 100% for corporate loans. The Treasury-for-corporate swap now visibly increases risk-weighted assets, so it visibly consumes capital, and the loophole closes.</p>
        <p>On top of that base sit the two ratios most people mean by "Basel I": Tier 1 capital at least 4% of risk-weighted assets, and total capital at least 8%. Two further pieces were added to stop the same avoidance happening off the balance sheet. Derivatives, which have no principal amount sitting in the assets, are converted into a credit equivalent amount so they consume capital too, and the 1995 netting amendment lets a bank recognise that offsetting trades with one counterparty do not each carry their full exposure. The 1996 market risk amendment then extended the framework past credit risk to the trading book for the first time.</p>`,
      },
      {
        label: "Where Basel I ran out: every corporate borrower looked the same",
        html: `<p>Risk weighting fixed the crude version of the problem and left a finer version untouched. A loan to a AAA-rated corporate and a loan to a barely-solvent one both attracted the flat 100% weight. So within the corporate bucket, the incentive to reach for the riskiest borrower was exactly as strong as it had been before 1988, because the extra yield was free of any extra capital.</p>
        <p>The framework was also blind to portfolios. A hundred loans spread across unrelated industries and a hundred loans to one industry's suppliers attract identical capital, even though the second book can plausibly lose everything at once and the first cannot. And nothing anywhere in Basel I asked about losses that come from the bank itself failing rather than from a borrower failing, which is how a rogue trader could destroy a bank without ever moving a risk weight.</p>`,
      },
      {
        label: "Let the bank use its own numbers: Basel II, 2004 and 2007",
        html: `<p>Basel II attacks the fineness problem by letting the bank supply the inputs. Under the internal ratings-based approach a bank uses its own estimated probability of default for each borrower. A strong AAA credit and a weak one stop attracting the same charge, and the capital requirement finally moves with the thing it is meant to track.</p>
        <p>Look at what the IRB formula actually asks for, because it is where the long-range dependency in this chain sits. Capital is exposure at default times loss given default times the gap between the worst-case default rate and the expected default rate, adjusted for maturity. That worst-case rate is the Vasicek one-factor Gaussian copula from R26, defined thirty-three readings earlier and used here as an actual legal rule. The subtraction is the part worth holding: the interest rate a bank charges is already supposed to cover the loan's EXPECTED loss, so regulatory capital only needs to cover the gap between a bad year and an average one. Capital funds the unexpected loss, and pricing funds the expected loss.</p>
        <p>Basel II also adds two things that were simply absent before. Operational risk gets a capital charge for the first time, covering losses from failed processes, people, systems or external events. And the framework stops being a single number: Pillar 1 sets the minimum capital arithmetic, Pillar 2 lets a supervisor demand more where the arithmetic misses something, and Pillar 3 forces disclosure so that markets can price a bank's risk-taking themselves. The three-pillar structure matters more than it looks, because it is an admission that no formula will ever be complete.</p>`,
      },
      {
        label: "Two things Basel II did not survive",
        html: `<p>The 2007 to 2009 crisis broke Basel II in two separate places, and the repairs are separate too. Treating them as one thing is the most common way this material becomes a blur.</p>
        <p><strong>The trading book was capitalised far too lightly.</strong> Market risk capital rested on value at risk calibrated to recent, calm data, so it shrank exactly as the market got dangerous. Basel 2.5 answers with three additions. A stressed value at risk is computed on the bank's own worst historical window rather than on recent data. An incremental risk charge covers default and migration risk in the trading book at 99.9% over a year. And a comprehensive risk charge covers the securitization exposures that did the most damage, under which the deepest-junk tranches attract dollar-for-dollar capital.</p>
        <p><strong>Solvent banks died anyway, because they could not fund themselves.</strong> This is the failure no amount of capital would have prevented, and it is why Basel III is not only a capital reform. The liquidity coverage ratio requires enough high-quality liquid assets to survive thirty days of stressed outflows, and the net stable funding ratio requires the funding structure itself to be durable over a year. Capital answers "can this bank absorb losses"; liquidity answers "can this bank pay tomorrow", and 2008 proved a bank can fail the second while passing the first.</p>
        <p>Basel III repairs the capital side too, along three lines that are easy to blur. It raises the QUALITY bar, insisting on common equity rather than the hybrid instruments that turned out not to absorb losses when it mattered, with common equity Tier 1 at 4.5%, Tier 1 at 6% and total capital at 8%. It adds BUFFERS above those minimums. The capital conservation buffer of 2.5% is mandatory and lifts the effective requirements to 7%, 8.5% and 10.5%. The countercyclical buffer of up to 2.5% is discretionary, switched on by national supervisors when credit growth looks excessive, and a further buffer applies to globally systemic banks. And it brings back the LEVERAGE RATIO, the crude unweighted rule from the start of this story, now demoted to a backstop of at least 3%. That return is the single most useful thing to remember about the stack: the risk-weighted rule remains the primary one, and the blunt rule sits underneath it to catch the case where the risk weights themselves have been talked down.</p>`,
      },
      {
        label: "The problem with letting a bank model its own capital",
        html: `<p>Notice what has quietly happened. Ever since Basel II, a large bank's capital requirement depends on numbers the bank itself produces. Schweser is direct about the consequence: capital charges are generally lower under the internal model approaches, which is precisely why sophisticated banks prefer them. Two banks holding the same portfolio can therefore report materially different risk-weighted assets, and the difference reflects their modelling choices rather than their risk.</p>
        <p>The 2017 finalization answers this with a pair of moves rather than one. First it restricts the models. The advanced IRB approach is withdrawn for large and mid-sized corporates and for financial institutions, which are pushed down to the foundation approach with floors placed on the inputs that remain. The internal-model option for CVA risk is removed outright, and operational risk modelling is abolished altogether. Second, and more general, it imposes an <strong>output floor</strong>. Risk-weighted assets must be the higher of the bank's own approved calculation and 72.5% of what the standardized approach would produce. The floor is computed using the standardized approach for each risk type, never the internal one, which is the detail that makes it a floor at all rather than a self-referential check.</p>
        <p>The same reforms make the standardized approach worth being floored against, since a floor is only as good as the benchmark under it. Risk weights become more granular, most visibly for residential mortgages, where a single weight for all mortgages is replaced by weights that depend on the loan-to-value ratio, and reliance on external credit ratings is reduced.</p>
        <p>R62's standardized measurement approach for operational risk is the same philosophy made concrete, and it is worth reading as such rather than as an isolated formula. The advanced measurement approach let each bank model its own operational risk, which produced capital that was both insufficient and incomparable across banks, and the risk factors that actually caused losses, such as misconduct and weak controls, were not captured. The replacement is a formula. A business indicator is built from income and trading components, converted into a capital charge through marginal buckets in the manner of a tax bracket, then scaled by a loss multiplier that sits at exactly one for a bank with industry-average loss history. Flexibility was traded for comparability, deliberately.</p>`,
      },
      {
        label: "The stack as it stands",
        html: `<p>Read the current requirement from the bottom of the balance sheet upward, and it is four questions rather than a list of numbers.</p>
        <div class="tablewrap"><table>
        <thead><tr><th>Layer</th><th>What it asks</th><th>Which failure put it there</th></tr></thead>
        <tbody>
        <tr><td>Risk-weighted minimums (common equity Tier 1 4.5%, Tier 1 6%, total 8%)</td><td>Is there enough loss-absorbing capital against the risk actually taken?</td><td>Basel I's blindness to what the assets were, then Basel II's refinement of it</td></tr>
        <tr><td>Capital conservation buffer, 2.5% and mandatory</td><td>Is there a usable cushion ABOVE the minimum, so hitting the minimum is not the first sign of trouble?</td><td>Banks entered the crisis at their minimum with nothing to spend</td></tr>
        <tr><td>Countercyclical buffer, up to 2.5% and discretionary, plus the systemic buffer</td><td>Is the credit cycle running hot, and is this bank large enough that its failure is everyone's problem?</td><td>Procyclicality, and too-big-to-fail</td></tr>
        <tr><td>Leverage ratio, at least 3% and unweighted</td><td>Ignoring every risk weight, is the bank simply too levered?</td><td>Risk weights themselves being talked down</td></tr>
        <tr><td>Output floor, 72.5% of the standardized calculation</td><td>Has the bank's own model produced an answer far below what a standard rule would?</td><td>Internal models producing systematically lower capital</td></tr>
        <tr><td>Liquidity coverage ratio and net stable funding ratio</td><td>Can the bank pay for thirty days of stress, and is its funding structure durable over a year?</td><td>Solvent banks failing because funding disappeared</td></tr>
        </tbody>
        </table></div>`,
      },
      {
        label: "Traps, and the three questions to ask any Basel problem",
        html: `<p>Ask three things of any capital question. <strong>Which version of the rules is this?</strong> Numbers moved between Basel I, II, 2.5, III and the 2017 finalization, and an answer that is right for one is wrong for another. <strong>Is this about capital or about liquidity?</strong> They answer different questions and were added for different failures, so a scenario about funding drying up is not a capital problem. <strong>Is this a minimum, a buffer or a backstop?</strong> The three have different governance and different consequences for breaching them, which is where most of the exam's discrimination lives.</p>
        <p>The traps that recur:</p>
        <ul>
        <li><strong>Mandatory against discretionary buffers.</strong> The capital conservation buffer is always on. The countercyclical buffer is switched on by national supervisors and can sit at zero. Mixing them up is the single most reliable buffer question.</li>
        <li><strong>Confidence levels.</strong> Banks are capitalised at 99.9% under the Basel II internal ratings-based approach; insurers under Solvency II use 99.5%. The pair is swapped constantly.</li>
        <li><strong>The output floor is computed on the standardized approach.</strong> Using the internal number on both sides of the comparison would make it no floor at all.</li>
        <li><strong>The leverage ratio is a backstop, not the main rule.</strong> It is unweighted on purpose, and being unweighted is why it cannot be the primary requirement.</li>
        <li><strong>Capital covers UNEXPECTED loss.</strong> The IRB formula subtracts the probability of default from the worst-case rate because pricing is supposed to have covered the expected part already. An answer that charges capital for the full worst-case loss has double-counted.</li>
        <li><strong>Restricting internal models did not touch every risk type.</strong> The 2017 restrictions apply to credit risk, CVA risk and operational risk.</li>
        </ul>
        <p>One boundary, for the same reason the CVA page draws its own. The CVA capital framework that appears in these readings is about how much CAPITAL a bank holds against its CVA moving. What CVA itself is, and how it is priced, is a separate question with its own page, and keeping the two apart is most of what makes either of them tractable.</p>`,
      },
    ],
  },

  /* The liquidity spiral, the third hard-concept sequencing page (spec candidate
     five). Criterion test applied 2026-07-27, and the spec's span was CORRECTED
     in the process: it lists R63, R64, R68, R71 and R73, but R68 (intraday),
     R71 (stress testing) and R73 (contingency funding planning) are process
     readings, not the feedback loop. The loop's actual constituents are R63 (the
     two kinds of liquidity and the solvency-is-not-liquidity lesson), R64 (where
     the loop is named, and where leverage arrives as its multiplier), R70 (the
     loop running inside a real dealer bank), R76 (repo, the funding channel that
     actually ran) and R80 (the frictions that keep a market illiquid, including
     funding constraints).

     Criterion 2 holds strongly. The loop is the examinable object and it is
     named in one clause of R64, its real-world instance is six readings later,
     and the specific funding channel that broke is twelve readings later still.
     Nothing runs one full turn of it end to end.

     Sourced from Schweser Book 4 at the repo root (positive feedback trading and
     its causes, including the margin-call bullet that IS the spiral mechanism,
     at lines ~613-631) and from the five readings' own already-gated content. */
  {
    slug: "liquidity-spiral",
    name: "The liquidity spiral",
    layer: "core",
    homeReading: 64,
    selfContained: true,
    refs: [63, 64, 70, 76, 80],
    linkPhrases: [
      "liquidity spiral", "liquidity black hole", "liquidity black holes",
      "positive feedback trading", "positive feedback traders",
      "transactions liquidity", "funding liquidity",
      /* not "LVaR": liquidity-adjusted VaR already owns its own page, and it is
         one input to this loop rather than the loop itself. */
    ],
    lead: "Transactions liquidity and funding liquidity are taught as two definitions to keep apart. The examinable object is what happens when they stop being separate: each one worsens the other, leverage multiplies every turn, and the market thins out exactly when you need to sell. This page runs one full turn of that loop.",
    sections: [
      {
        label: "You are solvent, and you still cannot pay",
        html: `<p>Take a firm whose assets are genuinely worth more than its liabilities. On any reasonable valuation it is comfortably profitable, not merely surviving. Now its lenders decline to roll a large short-term borrowing next Tuesday, and the cash to repay is not there, because it is tied up in assets that will pay out over years. The firm fails on Tuesday.</p>
        <p>Nothing about that story requires the firm to have been wrong about anything. This is the lesson Book 4 opens with and then repeats through three separate case studies: Northern Rock, Ashanti Goldfields and Metallgesellschaft were all economically defensible positions destroyed by cash TIMING, not by cash amounts. <strong>Solvency asks whether the assets exceed the liabilities. Liquidity asks whether the cash arrives before the obligation does.</strong> They are different questions, and a firm can pass the first and be dead from the second.</p>
        <p>Once you accept that, the interesting question is not what liquidity risk is. It is why liquidity problems, unlike solvency problems, tend to accelerate rather than settle down.</p>`,
      },
      {
        label: "Two questions that share one word",
        html: `<p>The word liquidity is doing two jobs, and separating them is the prerequisite for everything else.</p>
        <p><strong>Transactions liquidity</strong> is a property of an asset and its market: can you sell this position without moving the price against yourself? A Treasury bill has it, a block of thinly traded corporate bonds does not, and the cost of not having it shows up as the gap between the price you were marked at and the price you actually get. This is the risk that liquidity-adjusted value at risk exists to price, by adding the cost of liquidation on top of the ordinary market-risk number.</p>
        <p><strong>Funding liquidity</strong> is a property of your balance sheet: can you keep financing yourself as your borrowings come due? A firm that funds long assets with short borrowings is profitable precisely because short money is cheap, and is exposed precisely because that money has to be replaced over and over. Every rollover is a fresh chance for the lender to say no.</p>
        <p>Each risk on its own is manageable, and firms run both deliberately. An illiquid asset is fine if you never have to sell it in a hurry. Short-term funding is fine if it keeps rolling. The danger is not in either one.</p>`,
      },
      {
        label: "One turn of the loop",
        html: `<p>Here is what makes the pair dangerous in a way neither is alone. Follow a single sequence, starting anywhere, because the point is that it closes.</p>
        <p>An asset price falls. Your position is marked down, so your equity absorbs the loss. Because you are levered, your lenders now hold collateral worth less than it was, and they respond in the ordinary, contractually correct way: they call for more margin. You do not have spare cash, so you meet the call by selling something. Selling into a falling market moves the price further down, which marks down the rest of your book AND everybody else's book, which produces more margin calls, at your firm and at every other firm holding the same assets. Those firms sell too.</p>
        <p>Read that again as a circuit rather than a story. <strong>Funding pressure forces a sale, the sale damages transactions liquidity, damaged transactions liquidity produces worse marks and worse collateral, and worse collateral produces more funding pressure.</strong> That is the whole mechanism, and Schweser puts it in the list of causes of positive feedback trading in exactly these terms: when leveraged investors cannot meet margin calls they have to close out positions, which only accentuates the current trend in prices.</p>
        <p>The reason this deserves its own page rather than a definition is that no single reading runs the full circuit. R63 gives you the two kinds of liquidity, R64 names the loop in a clause and moves on to leverage, R70 shows it destroying a real firm, and R76 shows the specific funding market it ran through. The loop is what the exam tests, and it is assembled from four places.</p>`,
      },
      {
        label: "Leverage is the multiplier on every turn",
        html: `<p>Leverage is not a separate topic that happens to sit in the same reading. It is the gain control on the loop above, and it acts at two points at once.</p>
        <p>Define leverage as assets divided by equity. The return on equity is then the leveraged asset return minus the cost of the borrowed part, which means a firm at thirty times leverage turns a 1% asset gain into roughly a 30% equity gain. The same arithmetic runs backwards with no mercy: a 3% fall in asset values wipes out the equity of a thirty-times-levered firm entirely. Both Bear Stearns and Lehman were running overnight-repo-funded leverage above thirty times.</p>
        <p>The second point is subtler and matters more for the loop. Higher leverage means a SMALLER price move is needed before a margin call arrives, so a highly levered firm enters the forced-selling stage of the circuit earlier and on a gentler shock. Leverage therefore sets both how hard each turn hits and how easily the first turn starts.</p>
        <p>Two measurement traps sit here, both testable. Gross leverage counts every position and therefore overstates the risk of a book whose shorts genuinely hedge its longs, which is why net leverage is the right measure there. And on an economic balance sheet a short sale carries more leverage than a margin loan of the same size. A short position inherently borrows the full value of what it sells, while a margin purchase borrows only the part the investor did not fund.</p>`,
      },
      {
        label: "Why the market disappears exactly when you need it",
        html: `<p>A natural objection to the loop: surely someone buys. In a functioning market a price fall attracts buyers, which is what stops the fall. Schweser calls those buyers NEGATIVE feedback traders, and when they dominate, prices are stable and the market is liquid.</p>
        <p>A liquidity black hole is what happens when the other group dominates, so that falling prices produce more selling instead of buying, and everyone wants the same side of the trade at once. The causes are worth knowing individually, because each is a mechanical rule that fires without anyone deciding to panic. Stop-loss rules sell automatically once a price falls through a level. Trend and breakout trading buy strength and sell weakness by design. Predatory traders who learn of a large forced sale short ahead of it to profit from the decline they know is coming. A firm hedging a large SHORT option position must buy after a price rise and sell after a fall, which is destabilising. That is the exact opposite of dynamic hedging of a LONG option position, which sells into rallies and buys into declines and is therefore stabilising. Portfolio insurance in 1987 was the same effect at scale. Rules built to synthesise put options on more than $60 billion of portfolios sold equities as the market fell. The models called for $12 billion of sales when only $4 billion could be executed by Friday's close, and the overhang broke on the Monday. And margin calls, the loop's own engine, appear in this same list.</p>
        <p>So the answer to the objection is that the buyers who would normally arrive are, in these conditions, sellers instead. That is why liquidity does not degrade smoothly under stress. It disappears.</p>`,
      },
      {
        label: "The loop running inside a real firm",
        html: `<p>R70 is this circuit with a name attached, and it is worth reading as the case study of the mechanism rather than as a separate topic about dealer banks.</p>
        <p>The trigger is not a proven insolvency. Counterparties merely QUESTIONING whether a dealer is solvent is enough, because each counterparty's rational, individually correct response is to reduce its exposure, and the sum of those responses is the liquidity crisis they were worried about. It is self-fulfilling in the precise sense that the belief produces the outcome.</p>
        <p>What makes a dealer bank especially exposed is that it has five business lines and a solvency scare hits all of them at once, so there is no diversification to fall back on. Derivatives counterparties stop accepting novations and ask to offset contracts, repo lenders decline to renew, prime brokerage clients move their balances elsewhere, and the clearing bank can freeze cash settlement outright. Both parts of 2008's endgame are instances: Bear Stearns' refusal of novation requests damaged the confidence it was meant to protect, and JPMorgan Chase's invocation of its right of offset as Lehman's clearing bank froze Lehman's cash and was the final trigger.</p>
        <p>R76 supplies the detail that makes the repo channel worth understanding rather than just naming. Repo is SECURED financing, which is exactly why it was assumed to be run-proof, and it ran anyway. When a lender doubts both the borrower and the value of the collateral, being secured stops being reassurance. Secured funding is not immune to a confidence run; it simply fails one step later.</p>`,
      },
      {
        label: "What the loop costs you when you finally sell",
        html: `<p>Two quantitative pieces attach to the selling stage, and both exist because ordinary market-risk measurement assumes you can get out at the marked price.</p>
        <p>Liquidity-adjusted value at risk adds the cost of liquidation to the ordinary value at risk, using half the bid-ask spread applied to the position size. Under stress the spread is not its average: it is pushed out by some multiple of its own volatility, and the worked example in R63 has the stressed liquidation cost running at roughly three and a half times the normal one. The lesson for the loop is that the cost of exiting is at its worst in exactly the conditions that force you to exit.</p>
        <p>The second piece corrects a habit rather than adding a charge. Scaling a one-day value at risk to a T-day liquidation by multiplying by the square root of T assumes you hold the whole position for all T days and then sell it at once. A firm that liquidates gradually holds a shrinking position, so its true multiplier is SMALLER than the naive square-root figure. Getting this backwards overstates the risk of an orderly liquidation and understates the difference between selling gradually and being forced to sell at once.</p>
        <p>R80 closes the circle by explaining why the exit is expensive at all. Beyond the visible transaction cost sit four frictions that keep markets illiquid: the search cost of finding a counterparty, asymmetric information about what the asset is worth, price impact, and funding constraints. That last one is the loop itself, appearing in the list of reasons a market is illiquid in the first place. Illiquid markets also freeze together, roughly on a decade cycle, dragging normally-liquid markets with them.</p>`,
      },
      {
        label: "Where the loop can be broken",
        html: `<p>Every liquidity defence in Book 4 interrupts one specific turn of the circuit. Read as a list of rules they are arbitrary; read as interruptions they are almost predictable.</p>
        <div class="tablewrap"><table>
        <thead><tr><th>Defence</th><th>Which turn it interrupts</th></tr></thead>
        <tbody>
        <tr><td>Holding high-quality liquid assets (the thirty-day coverage requirement)</td><td>The margin call no longer forces a sale, because it can be met with cash</td></tr>
        <tr><td>Stable, longer-dated funding (the one-year funding requirement)</td><td>Fewer rollovers, so fewer chances for a lender to decline</td></tr>
        <tr><td>Lower leverage</td><td>A larger price move is needed before the first margin call, and each turn hits less hard</td></tr>
        <tr><td>Diversified funding sources</td><td>One channel closing does not close all of them at once, which is the dealer bank's specific weakness</td></tr>
        <tr><td>Liquidity stress testing and a contingency funding plan</td><td>The decisions are made before the loop starts, when there is still time to choose which assets to sell</td></tr>
        <tr><td>Central bank borrowing</td><td>A buyer exists when the private market has none, which is the black hole's defining absence</td></tr>
        </tbody>
        </table></div>
        <p>One caution that the same readings supply: regulatory uniformity can work against this. Rules that push every institution to hold the same assets and react to stress the same way make the whole system a positive feedback trader.</p>`,
      },
      {
        label: "Traps, and the three questions to ask any liquidity problem",
        html: `<p>Ask three things. <strong>Which liquidity is this, the asset's or the balance sheet's?</strong> A stem about exiting a position is transactions liquidity; a stem about lenders is funding liquidity; a stem where one causes the other is the loop and usually wants you to name it. <strong>Is leverage in the picture?</strong> If it is, the answer almost always involves a margin call happening earlier than intuition suggests. <strong>Is the firm solvent?</strong> If the scenario says yes, the question is testing the distinction that opens this page, and the correct answer will not be about asset values.</p>
        <p>The traps that recur:</p>
        <ul>
        <li><strong>Treating a solvency scare as requiring actual insolvency.</strong> Counterparties questioning solvency is sufficient, and the run is what makes the doubt true.</li>
        <li><strong>Assuming secured funding cannot run.</strong> Repo ran in 2008. Collateral reassures only while its own value is trusted.</li>
        <li><strong>Positive against negative feedback traders.</strong> Positive feedback buys strength and sells weakness and DESTABILISES. The names sound like value judgements and are not.</li>
        <li><strong>Short option hedging against dynamic hedging of a long option.</strong> Hedging a short position buys after rises and sells after falls, which is destabilising; the long-option case is the stabilising mirror. This pair is easy to invert under time pressure.</li>
        <li><strong>Scaling liquidation value at risk by the square root of T.</strong> The correct multiplier for a gradual liquidation is smaller, because the position shrinks as it is sold.</li>
        <li><strong>Gross leverage on a hedged book.</strong> It overstates risk where shorts genuinely offset longs; net leverage is the measure that answers the question being asked.</li>
        </ul>`,
      },
    ],
  },

  /* Vasicek / WCDR, the last hard-concept sequencing candidate. It is a
     different shape from the other three: a Phase-2 authored layer already
     existed on r26's formula (`terms[]` plus a `deepDive`), and what the ledger
     recorded as owed was a pass against the section 1a problem-first doctrine,
     which postdates it.

     This entry SHADOWS the auto-detected concept of the same slug (see
     findConcept in src/lib/coreConcepts.js), and deliberately keeps
     `kind: "formula"` with the exact name r26 gives the formula, so the existing
     formula block, the five-symbol breakdown and the beyond-exam deepDive all
     still render UNDER these sections. That order is the point: the idea is
     built first, and the equation and its symbol table are the consolidation
     after it, per the chapter section-order rule.

     "Vasicek" alone is deliberately NOT a link phrase. In Book 1 the name means
     the interest-rate model (r08, r11, r13, r14), which has nothing to do with
     this. The full name and the abbreviation are unambiguous.

     Sourced from Schweser Book 2, Reading 26 (Vasicek's model, lines ~4125-4145,
     including the sibling models and the tail-correlation limitation) and
     Reading 21 / Book 3 Reading 59 for the IRB capital use. The worked figure
     (PD 1%, rho 0.2, 99.9% confidence, WCDR about 14.6%) is r26's own and was
     re-checked arithmetically here, since an inverted sign in this exact
     calculation is a recorded past defect (react-site/CLAUDE.md section 8.4). */
  {
    slug: "vasicek-worst-case-default-rate-wcdr",
    name: "Vasicek worst-case default rate (WCDR)",
    kind: "formula",
    layer: "core",
    homeReading: 26,
    selfContained: true,
    refs: [21, 26, 27, 29, 59],
    linkPhrases: ["worst-case default rate", "one-factor Gaussian copula"],
    lead: "One number answers the only question a capital rule really asks: in a bad year, not an average one, what fraction of this loan book defaults? Getting there needs one idea (a shared economy) and one piece of arithmetic, and the formula is unreadable until you have both.",
    sections: [
      {
        label: "A thousand loans, and one question you cannot answer yet",
        html: `<p>You are responsible for capital at a bank holding a thousand corporate loans. Each borrower has, say, a 1% chance of defaulting this year. The question you have to answer is not what you expect to lose. It is how bad the year can get, because capital exists for the bad year and not for the average one.</p>
        <p>The average is easy and it is the wrong answer. A 1% default probability across a thousand loans means about ten defaults, so a bank that held capital for ten defaults would be capitalised for a year in which nothing unusual happened. Worse, the interest rate you charge is already meant to cover those ten. Charging capital for them as well would be paying twice for the same loss. What capital has to cover is the distance between a bad year and an average one, so what you actually need is a HIGH PERCENTILE of the default rate, not its mean.</p>`,
      },
      {
        label: "The obvious model, and the absurd answer it gives",
        html: `<p>Try the simplest possible assumption: each borrower defaults independently, like a thousand separate coin flips weighted at 1%. This is a completely standard statistical setup, and it produces a number immediately.</p>
        <p>The number is close to useless. Independent draws average out, and the more of them there are the harder they average out, so across a thousand loans the realised default rate almost never strays far from 1%. The worst case at high confidence sits barely above the mean, which says a large diversified loan book needs almost no capital at all. Every banking crisis in history says otherwise.</p>
        <p>So the independence assumption is not a simplification that costs a little accuracy. It removes the exact phenomenon that makes lending dangerous.</p>`,
      },
      {
        label: "Borrowers are not separate coins",
        html: `<p>What actually happens in a bad year is that borrowers fail TOGETHER. A recession does not pick one firm; it lowers demand, tightens credit and raises funding costs for all of them at once, so defaults arrive in clusters rather than at a steady trickle.</p>
        <p>Take the coin picture and correct it. A thousand independent coins land near five hundred heads essentially always. Now wire the coins so they tend to land the same way as each other. The average is unchanged, and the spread is transformed: outcomes far from the average become genuinely possible, because the coins are no longer casting a thousand separate votes. They are casting something closer to one vote with a thousand echoes.</p>
        <p>A loan portfolio is the wired version. The capital question is entirely a question about how strongly the coins are wired together, which is what the correlation parameter measures.</p>`,
      },
      {
        label: "One shared economy, and one private story",
        html: `<p>Here is the modelling move that makes this computable, and it is a single idea rather than a technique. Split what happens to each borrower into two parts: something that happens to EVERYONE, and something that happens only to THEM.</p>
        <p>Write each firm's asset return as a mix of a common factor, meaning the state of the economy, and an idiosyncratic term, meaning that firm's own management, customers and luck. The correlation parameter is the mixing weight: it is the share of each firm's fortunes driven by the shared factor, so it is exactly the dial that decides how strongly the coins are wired. A firm defaults when its asset return falls below a threshold, and the threshold is set so that, averaged over all possible economies, the firm defaults with its stated probability.</p>
        <p>Now the whole distribution collapses into something answerable. Fix the economy at some specified level of badness and the only remaining randomness is each firm's private story, which really is independent across a large portfolio and really does average out. So for a GIVEN state of the economy, the default rate is essentially determined. The distribution of the portfolio's default rate is therefore just the distribution of the economy itself, passed through the firms' thresholds. Asking for the 99.9th percentile default rate becomes asking what fraction of firms default when the economy is at its 99.9th-percentile worst.</p>
        <p>That is why the answer is one line of algebra rather than a simulation, and it is the single most important thing to understand about the model. Schweser makes the same point from the other end. The correlation used here should be roughly the correlation between the firms' returns on assets or equity, which is precisely the shared-factor exposure just described, and similar listed companies can proxy it when the borrowers are private.</p>`,
      },
      {
        label: "Reading the formula as three moves",
        html: `<p>The equation below is that argument written down, and every piece of it does one of three jobs.</p>
        <p>The first move converts a probability into a threshold. The inverse normal of the default probability is the point on the asset-return scale below which the firm fails, so a 1% default probability becomes a threshold of about minus 2.33 standard deviations. The second move shifts that threshold for a bad economy. Adding the square root of the correlation multiplied by the inverse normal of the confidence level moves the whole population toward default. At 99.9% confidence that inverse normal is about PLUS 3.09, a large positive number pushing hard in the direction of more defaults. The third move rescales by the square root of one minus the correlation, which is the dispersion left over once the shared factor has been fixed, and converts back into a probability.</p>
        <p>Run it once with real numbers so the shape is concrete. A 1% default probability, a correlation of 0.2 and 99.9% confidence give a numerator of about minus 2.33 plus 0.447 times 3.09, which is about minus 0.94, divided by 0.894 to give about minus 1.06, and the normal probability of minus 1.06 is roughly 14.6%. A book expected to lose 1% is being capitalised against losing about 14.6%. That factor of fourteen between the average year and the regulatory bad year is the entire reason the model exists, and it comes from correlation alone.</p>
        <p>The sign of the confidence term is worth pausing on, because it has been got wrong in this app before. Higher confidence means a LARGER positive inverse normal, which means MORE defaults. If a reading of the formula has the 99.9% term making things look safer, the reading is inverted.</p>`,
      },
      {
        label: "Its siblings, and what each one buys",
        html: `<p>Vasicek's model is one of three ways R26 offers for getting a loss distribution, and they are easiest to hold apart by what each one treats as the source of the uncertainty.</p>
        <p><strong>Vasicek</strong> puts the uncertainty in a shared economic factor and asks for a percentile of the default RATE. Its distinctive advantage is that this yields a closed form, so no simulation is required, which is why regulators could write it into a capital rule.</p>
        <p><strong>CreditRisk+</strong> puts the uncertainty in the NUMBER of defaults and models it directly as a distribution. It is binomial if defaults are independent, Poisson when the probability is small and the portfolio large, and negative binomial once the default rate itself is treated as uncertain and given a gamma distribution. Increasing that uncertainty fattens the right tail, which is the same phenomenon correlation produces in Vasicek, reached by a different route.</p>
        <p><strong>CreditMetrics</strong> widens the question from default to CREDIT MIGRATION, using a transition matrix so that a downgrade, not only a default, changes the portfolio's value.</p>
        <p>Vasicek's known limitation is the flip side of what makes it tractable. A single common factor cannot express that two airlines are more alike than an airline and a software firm, and the model does not capture tail correlation, the tendency for correlations themselves to rise in a crisis. Both are reasons to reach for a richer model when you are not bound by a regulatory formula.</p>`,
      },
      {
        label: "Where the number is actually used",
        html: `<p>This is not a modelling curiosity. It is the arithmetic inside a legal capital requirement, and the connection is what makes the whole thing worth learning properly.</p>
        <p>Under the Basel internal ratings-based approach, capital equals exposure at default times loss given default times the GAP between the worst-case default rate and the ordinary probability of default, adjusted for maturity. That subtraction is the point made in the first section, now in regulatory form: pricing is supposed to cover the expected loss, so capital covers only the unexpected part. The percentile the regulation asks for is 99.9%, which is where the plus 3.09 above comes from.</p>
        <p>The same machinery is what R29 uses for a credit portfolio's value at risk and what R27 builds up factor by factor, so recognising it in its different costumes saves re-learning it three times. Whether a bank may use this formula with its own inputs at all, and what floors sit under the answer, is a separate question that belongs to the capital rules rather than to the model.</p>`,
      },
      {
        label: "Traps",
        html: `<ul>
        <li><strong>Confusing WCDR with expected loss.</strong> WCDR is a high percentile of the DEFAULT RATE. Multiplying it by exposure and loss given default gives a percentile of LOSS, and capital is what remains once the expected part is subtracted from that.</li>
        <li><strong>Believing diversification solves it.</strong> Diversification removes idiosyncratic risk and leaves the common factor untouched. That residual is what the formula prices, and no amount of adding loans reduces it.</li>
        <li><strong>Reading the confidence term as reducing risk.</strong> At 99.9% the inverse normal is about plus 3.09, and it pushes the default rate UP.</li>
        <li><strong>Treating correlation as an observable.</strong> It is proxied from asset or equity return correlations, and those are least stable exactly when the number matters.</li>
        <li><strong>Mixing up the siblings.</strong> CreditRisk+ models the number of defaults, CreditMetrics models migrations as well as defaults, and Vasicek models the default rate through a shared factor.</li>
        </ul>`,
      },
    ],
  },
];
