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
];
