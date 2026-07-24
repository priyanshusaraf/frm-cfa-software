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
];
