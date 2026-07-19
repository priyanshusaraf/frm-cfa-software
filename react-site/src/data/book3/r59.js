export default ({
  book: 3, reading: 59,
  session: "Capital and Regulatory Frameworks",
  title: "Capital Regulation Before the Global Financial Crisis",
  tagline: "The origin story of modern bank capital regulation: Basel I (1988, credit risk only) and Basel II (2004/2007, three pillars, sophisticated credit approaches, and operational risk capital for the first time).",

  teaches: `<p>Basel I's three capital ratios and RWA, off-balance-sheet CEA, the 1995 netting amendment, the 1996 market risk capital amendment, Basel II's three pillars, Basel II's three credit risk approaches (with the full IRB formula), Basel II's three operational risk approaches, and Solvency II's insurance parallel.</p>`,

  why: `<p>This reading has more testable formulas than almost any other reading in this book — budget serious drilling time. Every later Basel reading (2.5, III, the 2017 finalization) is a patch on the framework built here.</p>`,

  intuition: `<p>Before 1988, capital rules were a mess: each country set its own minimum ratio of capital to <em>total</em> assets, with no regard for how risky those assets actually were. A bank holding nothing but U.S. Treasury bills faced the same capital bar as a bank holding nothing but junk corporate loans, as long as their total-assets figure was the same. That created two problems the Basel Committee on Banking Supervision (BCBS, formed in 1974 by the G10 central banks after cross-border failures like Herstatt Bank's 1974 collapse from settlement-timing gaps) set out to fix: banks in loosely-regulated countries had a competitive edge, and off-balance-sheet items like interest rate swaps and currency swaps grew explosively while contributing zero to the "total assets" figure that supposedly measured a bank's exposure.</p>
  <p>Basel I's (1988) big innovation was RISK-WEIGHTING: instead of treating all assets equally for capital purposes, multiply each asset by a weight reflecting its riskiness (0% for Treasury bills, 50% for uninsured mortgages, 100% for corporate loans) before comparing it to capital. Off-balance-sheet derivatives got converted into an on-balance-sheet-equivalent dollar figure (the CEA) so they, too, contributed to the capital requirement. Basel I still had a glaring flaw, though: it treated a AAA-rated corporate borrower exactly the same as a borrower rated C — both got the flat 100% risk weight — and it had no way to reflect the diversification benefit of a portfolio of loans that don't all default together.</p>
  <p>Basel II's (proposed 1999, published 2004, implemented 2007) big innovation was SOPHISTICATION on two fronts. First, it let banks use their own internal estimates of the borrower's probability of default (PD) inside a formal statistical model (the internal ratings-based, or IRB, approach) for a more risk-sensitive capital charge — a strong AAA credit now attracts noticeably less capital than a weak one, unlike under Basel I's blunt one-size-fits-all weight. Second, for the first time it explicitly required capital against operational risk — losses from failed internal processes, people, or systems, or from external events (think rogue-trader losses like Barings Bank in 1995, or a fire). Basel II organized all of this into three "pillars": Pillar 1 sets the minimum capital math, Pillar 2 lets supervisors apply judgment on top of the math, and Pillar 3 forces banks to disclose enough information that markets can discipline bad risk-taking themselves.</p>
  <p>The IRB formula is the Vasicek/Gordy one-factor Gaussian copula (identical machinery to R26's WCDR and R29's V(T,X)) applied as the actual regulatory capital rule: Capital = EAD×LGD×[WCDR−PD]×MA. The logic: a bank's product pricing (the interest rate it charges) is supposed to already cover the loan's EXPECTED loss, so regulatory capital only needs to cover the gap between a 99.9%-confidence "as bad as it plausibly gets" loss (WCDR) and that expected loss (PD) — i.e., the UNEXPECTED loss. Higher-rated corporate exposures see their capital requirement fall substantially under IRB relative to Basel I's flat treatment — the whole point of adding risk sensitivity.</p>`,

  eli5: `<p>Imagine two friends each want to borrow $100 from you and both promise the same 5% interest. One has a steady job and a spotless repayment history; the other has already missed payments to three other people. Under an old-fashioned rule you might set aside the same "just in case" cushion for both loans, because all you're tracking is the total dollar amount you've lent out — that's Basel I's flat, risk-blind 100% corporate weight in miniature. A smarter rule looks at each friend's actual track record and sets aside a bigger cushion for the risky friend and a smaller one for the reliable friend — that's Basel II's IRB approach using each borrower's own probability of default. And a truly complete rule also keeps a little cushion in reserve for the chance that YOU personally mess something up — lose the cash, get scammed, have your accounting go wrong — separate from the borrower risk; that's Basel II's brand-new operational risk capital charge. In finance terms: the "just in case" cushion is regulatory capital, the borrowers' track records are their PD (probability of default), and Basel II's shift from one flat cushion to per-borrower cushions plus an operational-risk cushion is exactly the sophistication this reading describes.</p>`,

  thinkLike: `<p>A bank capital-markets or regulatory-affairs risk manager reading this framework asks one recurring question: "which approach minimizes MY capital charge for MY actual risk profile, and can I qualify for it?" Standardized approaches are simple and conservative — good for a small bank without the modeling infrastructure to justify anything more precise. IRB and AMA approaches require heavy investment in data and models, but reward a genuinely low-risk book with a genuinely lower capital charge — which is exactly why large, sophisticated banks lobby hard to use them. The examiner tests this reading almost entirely through worked arithmetic: plug numbers into CEA, NRR, the 1996 market risk formula, and the IRB formula, and get a dollar figure. Practically every FRM candidate loses points here not from misunderstanding the concepts but from arithmetic slips — forgetting to exclude a negative-income year from the BIA average, dropping the maturity adjustment where it belongs (corporate) or forgetting to drop it where it doesn't belong (retail), or confusing which confidence level (99.9% banks vs. 99.5% insurers) applies. Drill the formulas as arithmetic, not just as concepts.</p>`,

  formulas: [
    { name: "Basel I's three Cooke ratios", math: "\\dfrac{\\text{Assets}}{\\text{Capital}} < 20 \\quad\\cdot\\quad \\dfrac{\\text{Tier}_1}{\\text{RWA}} > 4\\% \\quad\\cdot\\quad \\dfrac{\\text{Total capital}}{\\text{RWA}} > 8\\%", note: "Tier 1 = equity minus goodwill + noncumulative perpetual preferred. Tier 2 (capped at 50% of total) = cumulative preferred, 99yr debentures, subordinated debt >5yr.", plain: "A bank's leverage can't exceed 20-to-1, its core (Tier 1) capital must be at least 4% of risk-weighted assets, and its total (Tier 1 + Tier 2) capital must be at least 8% of risk-weighted assets — three separate hurdles a bank must clear simultaneously, named the Cooke ratios after Peter Cooke of the Bank of England, who chaired the committee that wrote them." },
    { name: "CEA for derivatives (current exposure method)", math: "\\text{CEA} = \\max(V, 0) + D \\times L", note: "V=current value, D=add-on factor, L=principal. $175M swap, current value $2.5M, add-on 0.5% → CEA=2.5+(0.005×175)=$3.375M.", plain: "The credit-equivalent amount of a derivative is what you'd currently lose if the counterparty defaulted today (zero if the derivative currently has negative value to you, since you owe them, not the other way around) plus an 'add-on' cushion for how much the exposure could grow before the derivative matures.", derivation: "<p>The current exposure method splits a derivative's credit risk into two pieces:</p><p><strong>Current exposure</strong>: \\(\\max(V, 0)\\). If the swap's current mark-to-market value \\(V\\) is positive, the counterparty owes you that much, and losing them would cost you \\(V\\). If \\(V\\) is negative, you owe them — their default costs you nothing (you'd still have to pay), so the floor is 0.</p><p><strong>Potential future exposure (the add-on)</strong>: \\(D \\times L\\), where \\(D\\) is a regulator-set percentage of notional principal \\(L\\) that increases with the derivative's remaining maturity and the volatility of its underlying (interest rate swaps carry small add-ons; commodity or long-dated contracts carry larger ones). This captures that a derivative currently worth little could swing sharply in the bank's favor before it matures, raising future exposure.</p><p>Summing the two pieces gives \\(\\text{CEA} = \\max(V,0) + D \\times L\\), the on-balance-sheet-equivalent dollar amount that then gets multiplied by the counterparty's risk weight, exactly like an on-balance-sheet loan.</p>" },
    { name: "Net replacement ratio (1995 netting amendment)", math: "\\text{NRR} = \\dfrac{\\text{exposure with netting}}{\\text{exposure without netting}}", note: "+20,−7,+5 → without netting=$25M, with netting=$18M → NRR=0.72.", plain: "The net replacement ratio measures how much a legally enforceable netting agreement (an ISDA master agreement) shrinks a counterparty's credit exposure, as a fraction between 0 and 1." },
    { name: "Market risk capital charge (1996 amendment)", math: "\\text{capital} = \\max(\\text{previous day VaR},\\ m_c\\times\\text{avg 60-day VaR}) + \\text{specific risk charge}", note: "10-day 99% VaR; mc≥3 set by backtesting 250 days (traffic-light zones).", plain: "A bank's trading-book market risk capital is the larger of yesterday's VaR or a multiple (at least 3, set by backtest performance) of the 60-day average VaR, plus a separate charge for the issuer-specific risk (credit spread and idiosyncratic stock moves) that VaR alone doesn't capture." },
    { name: "IRB capital charge (Vasicek/Gordy one-factor)", math: "\\text{Capital}_i = \\text{EAD}_i\\times\\text{LGD}_i\\times[\\text{WCDR}_i - \\text{PD}_i]\\times\\text{MA}", note: "WCDR = \\(\\text{DR}_{99.9}\\), the 99.9th-percentile default rate.", plain: "The capital a bank must hold against a given loan equals the dollar amount it stands to lose in the worst-case (99.9th-percentile) default scenario, minus the loss it already expects and prices for, scaled by exposure, loss severity, and a maturity add-on.", derivation: "<p>Start from the Vasicek/Gordy one-factor Gaussian copula VaR for a large, well-diversified portfolio: the 99.9%-confidence one-year loss rate on a single obligor is \\(\\text{DR}_{99.9} = \\text{WCDR}\\), the worst-case probability of default — i.e. the bank can be 99.9% confident this obligor's default rate contribution won't be exceeded in the coming year.</p><p><strong>Step 1 — total worst-case loss</strong>: \\(\\text{EAD}_i \\times \\text{LGD}_i \\times \\text{WCDR}_i\\) is the dollar loss if the obligor defaults in that 99.9th-percentile scenario: exposure at default, times the fraction lost given default, times the worst-case default probability.</p><p><strong>Step 2 — subtract what's already priced in</strong>: the bank's expected loss is \\(\\text{EAD}_i \\times \\text{LGD}_i \\times \\text{PD}_i\\), and this is supposed to already be covered by the interest rate charged on the loan. Regulatory capital should only cover the UNEXPECTED loss — the excess of the worst case over the expected case: \\[\\text{EAD}_i\\times\\text{LGD}_i\\times[\\text{WCDR}_i - \\text{PD}_i]\\]</p><p><strong>Step 3 — adjust for maturity</strong>: a longer-dated exposure carries more time for the obligor's credit quality to deteriorate before the loan matures, so the whole expression is scaled up by the maturity adjustment \\(\\text{MA}\\) (equal to 1.0 when \\(M=1\\) year, rising above 1.0 for longer maturities).</p>" },
    { name: "Maturity adjustment & RWA", math: "\\text{MA} = \\dfrac{1+(M-2.5)b}{1-1.5b};\\qquad \\text{RWA} = 12.5\\times\\text{Capital}", note: "$150M A-rated loan, PD=0.1%, LGD=50%, DR99.9=3.4%, M=2.5: Capital=150×0.5×(0.034−0.001)=$2.475M → RWA=$49.19M (vs $150M flat under Basel I).", plain: "The maturity adjustment scales capital up for loans longer than the 2.5-year benchmark maturity (and down for shorter ones), and risk-weighted assets are simply the capital figure grossed back up by the reciprocal of the 8% minimum-capital ratio (1/0.08 = 12.5), so that RWA × 8% recovers the capital requirement." },
    { name: "Basel II operational risk — BIA", math: "\\text{Capital} = 15\\%\\times\\text{(3-year average annual gross income)}", note: "Negative-income years excluded from the average. $20B/−$2B(excl)/$12B → (20+12)/2×0.15=$2.4B.", plain: "Under the Basic Indicator Approach, operational risk capital is a flat 15% of the average of the bank's last three years of annual gross income (net interest income plus noninterest income), with any year of negative gross income simply dropped from both the sum and the count of years averaged." }
  ],

  concepts: [
    {
      name: "Basel I: three capital ratios & RWA",
      def: "Total assets/capital < 20 (capital/assets>5%); Tier1/RWA>4%; Total capital/RWA>8% (the 'Cooke ratios'). Tier 1 (core): equity minus goodwill, noncumulative perpetual preferred. Tier 2 (supplementary, capped at 50% of total capital): cumulative perpetual preferred, certain 99-year debentures, subordinated debt >5yr original maturity.",
      intuition: "Tier 1 is capital that genuinely absorbs losses as they happen (common equity is first in line to take a hit) — it's meant to keep the bank solvent. Tier 2 is capital that's subordinated to depositors, meaning it only protects depositors' money in a wind-down, after the bank has already failed — it cushions the FALLOUT of a failure rather than preventing one. That's why at least half of required capital must be Tier 1: a bank can't satisfy its capital requirement with only loss-absorbing-on-paper instruments that only matter once it's too late.",
      example: "$20M T-bills(0%) + $20M insured mortgages(0%) + $50M uninsured mortgages(50%) + $150M corporate loans(100%) = 0+0+25+150 = $175M RWA.",
      pitfall: "Loan loss reserves are NOT counted as either Tier 1 or Tier 2 capital, even though intuitively they feel like a loss cushion — Basel I deliberately excludes them from the capital definition.",
      related: []
    },
    {
      name: "Off-balance-sheet items: CEA",
      def: "CEA = max(V,0) + D×L for derivatives (current exposure method).",
      intuition: "Before Basel I, a bank's balance sheet only showed loans it had actually funded — a $175M interest rate swap contributed $0 to 'total assets' even though a counterparty default on it could cost real money. The CEA translates that off-balance-sheet promise into an on-balance-sheet-equivalent dollar figure so it gets weighted and capitalized just like a loan would be. Non-derivative off-balance-sheet items (like standby letters of credit) instead get a simple conversion factor — e.g., a $200M standby letter of credit to a government agency converts at 50% to a $100M credit-equivalent, then gets its counterparty's risk weight applied (20% here → $20M added to RWA).",
      example: "$175M swap, 3yr remaining, current value $2.5M, add-on 0.5% → CEA=2.5+(0.005×175)=$3.375M. RWA (OECD bank, 20% weight)=$675,000; RWA (corporate, 100% weight)=$3.375M. Required capital (corporate)=(175+3.375)×0.08=$14.27M.",
      pitfall: "Basel I's original derivatives coverage was narrow: only interest rate and exchange rate contracts were included at first; equity and commodity derivatives were added only in later amendments. There is also an alternative 'original exposure method' (usable only for interest rate and FX contracts) that ignores current market value entirely and bases the add-on purely on original or remaining maturity — less common but still testable as a named alternative to the current exposure method.",
      related: ["1995 netting amendment"]
    },
    {
      name: "1995 netting amendment",
      def: "Net replacement ratio (NRR) = current exposure with netting / current exposure without netting.",
      intuition: "Before 1995, Basel I actively discouraged banks from hedging with the same counterparty: if Bank A bought protection from Bank B and later sold offsetting protection back to Bank B at the same notional, the two positions would largely cancel economically — but Basel I still applied a full add-on to EACH swap separately, punishing exactly the behavior (offsetting risk) that regulators should want to encourage. A legally enforceable ISDA master agreement lets a bank net positive and negative mark-to-market values against the same counterparty into a single number before applying the add-on, which is what the NRR quantifies.",
      example: "Exposures +20,−7,+5 (millions): without netting=$25M, with netting=$18M → NRR=18/25=0.72.",
      pitfall: "Netting only works across positions with the SAME counterparty under a legal netting agreement — a negative exposure to Counterparty B can never be netted against a positive exposure to Counterparty A, and current exposure can never be netted down below zero even if the netted sum of positions were negative.",
      related: [{ r: 33, label: "R33 — netting mechanics generally, this Basel I quantification" }]
    },
    {
      name: "1996 Amendment: market risk capital",
      def: "capital = max(previous day VaR, mc×average 60-day VaR) + specific risk charge. 10-day, 99% VaR; mc≥3, set by backtesting 250 days of 99% 1-day VaR against actual losses.",
      intuition: "Basel I and the 1995 netting amendment only addressed CREDIT risk. But by the mid-1990s, VaR had become the standard tool for measuring a bank's TRADING BOOK risk — the risk that mark-to-market prices on bonds, equities, commodities, FX, and derivatives held for trading purposes move against the bank. The 1996 Amendment required banks to mark trading-book instruments to fair value and hold capital against that price risk, using either a simple standardized method (charge per instrument, ignoring diversification/correlation benefits — used by less sophisticated banks) or an internal VaR-model-based approach (rewards banks with better risk management by giving credit for diversification, hence usually a LOWER capital charge). The specific risk charge exists because VaR only captures broad market-factor moves (rates, FX, index levels) — it misses issuer-specific moves like a company's own credit spread widening, which the specific risk charge captures separately.",
      example: "Exceptions of 250: <5→3.00, 5-9→3.40-3.85, >10→4.00. Previous-day VaR=$10M, 60-day avg=$8M, m=3 → capital=0.08×[12.5×(3×$8M)]=$24M.",
      pitfall: "This is the same Basel traffic-light backtesting framework from R4, now with the capital multiplier consequence made explicit. The 1996 Amendment also created Tier 3 capital (short-term subordinated debt, minimum 2-year maturity) usable only to meet the market risk charge — Tier 3 was later eliminated entirely under Basel III, so don't apply it outside this specific historical context.",
      related: [{ r: 4, label: "R4 — the traffic-light backtesting zones this multiplier is drawn from" }]
    },
    {
      name: "Basel II: three pillars",
      def: "Pillar 1 minimum capital (credit + market + operational risk, still 8% of RWA total). Pillar 2 supervisory review (regulator discretion, ICAAP required). Pillar 3 market discipline (mandatory quantitative/qualitative disclosure).",
      intuition: "Each pillar attacks a different failure mode of pure rule-based regulation. Pillar 1's math alone can't anticipate every local condition or firm-specific risk, so Pillar 2 gives supervisors room to add judgment on top and requires every bank to run its own Internal Capital Adequacy Assessment Process (ICAAP) reflecting its actual risk profile. Even the best supervisor can't see everything, so Pillar 3 conscripts the market itself as a disciplining force: by forcing banks to publicly disclose their capital instruments, risk exposures, and risk measures, shareholders and counterparties can price bad risk management into a bank's cost of funding, creating an incentive to manage risk well even absent a regulator watching.",
      related: [{ r: 41, label: "R41 — these same three pillars applied specifically to op risk" }]
    },
    {
      name: "Basel II credit risk: three approaches",
      def: "Standardized (Basel-I-like, but ratings now matter — sovereign risk weights 0%-150%, banks/corporates 20%-150%). Foundation IRB (bank supplies PD only; LGD/EAD/M are supervisory values — LGD=45% senior, 75% subordinated, M usually 2.5). Advanced IRB (bank supplies PD, LGD, EAD, and M).",
      intuition: "This is a ladder of sophistication and self-reliance. The standardized approach is Basel I with better labels (external credit ratings now drive the risk weight instead of a crude asset-type bucket) — a small bank without modeling capacity uses this. Foundation IRB lets a bank supply just one input, PD, which is genuinely firm-specific knowledge (the bank knows its own borrower better than any external rating agency), while everything else (loss severity, exposure amount, maturity effect) stays a regulator-set constant so the bank can't game those inputs downward. Advanced IRB removes those guardrails entirely, trusting the bank's own models for all four inputs — available only to banks that can prove strong model governance to supervisors.",
      example: "Under the standardized approach, collateral can shrink the counterparty's risk weight via the simple approach (collateral's own risk weight, floored at 20%, replaces the counterparty's risk weight for the collateralized portion) or the comprehensive approach (the exposure is scaled up and the collateral value scaled down for volatility before applying the counterparty's risk weight to the residual).",
      related: ["IRB capital charge"]
    },
    {
      name: "IRB capital charge (Vasicek/Gordy one-factor Gaussian copula)",
      def: "Capital_i = EAD_i × LGD_i × [WCDR_i − PD_i] × MA. WCDR = DR_99.9, the 99.9th-percentile default rate. MA = [1+(M−2.5)b]/(1−1.5b); RWA = 12.5 × Capital required.",
      example: "$150M loan to A-rated corp, PD=0.1%, LGD=50%, DR99.9=3.4%, M=2.5yr. Capital = 150×0.5×(0.034−0.001) = $2.475M → RWA = 12.5×2.475 = $49.19M (vs. $150M flat under Basel I — IRB substantially lowers RWA for higher-rated corporate exposures).",
      pitfall: "Retail exposures merge foundation/advanced IRB (bank supplies PD, EAD, LGD directly) and DROP the maturity adjustment entirely: capital = EAD×LGD×(DR99.9−PD). This IRB formula is the identical Vasicek/Gordy machinery from R26/R29 — same equation, regulatory context. Also remember: PD, LGD, and WCDR/DR99.9 are all decimals (fractions of 1), while EAD is a dollar amount — mixing up units is a common arithmetic slip.",
      related: [{ r: 26, label: "R26 — the identical Vasicek WCDR formula" }, { r: 29, label: "R29 — the identical one-factor Gaussian copula" }],
      memory: "One formula, three reading numbers (R26, R29, R59) — the IRB capital charge is Vasicek's WCDR wearing a regulatory uniform."
    },
    {
      name: "Basel II operational risk: three approaches",
      def: "Basic indicator (BIA): 15% × 3-yr average annual gross income (negative-income years excluded). Standardized: same idea, different multiplier per business line (e.g., 12% retail, 15% commercial, 18% payments/settlement). Advanced measurement approach (AMA): internal one-year, 99.9% VaR model; can reflect insurance mitigation.",
      intuition: "This is the SAME sophistication ladder as credit risk, applied to a very different risk type. BIA is a single flat percentage applied to the whole bank's gross income — crude, but requires no operational risk modeling at all. Standardized is the same idea broken out by business line, on the theory that (say) payments and settlement activity generates more operational risk per dollar of income than retail banking does. AMA is the sophisticated end: banks build an actual internal loss model (a one-year, 99.9%-confidence VaR on operational losses, closely related to the loss distribution approach of R43) and, uniquely among the three approaches, are allowed to reduce the resulting capital charge for risk-mitigating insurance contracts (e.g., fire or fidelity insurance) that a purely formulaic approach couldn't recognize.",
      example: "BIA: Gross income $20B(Yr1), −$2B(Yr2, excluded), $12B(Yr3) → capital=(20+12)/2×0.15=$2.4B.",
      pitfall: "Because Basel II lowered credit risk capital for many well-rated banks under IRB, the NEW operational risk charge had the effect of pulling total required capital back up to roughly Basel I levels overall — op risk capital wasn't a minor add-on, it materially offset IRB's credit-risk savings.",
      related: [{ r: 43, label: "R43 — the LDA underlying AMA's internal modeling" }, { r: 62, label: "R62 — the SMA, which replaces all three of these approaches" }]
    },
    {
      name: "Solvency II (insurance parallel to Basel II)",
      def: "SCR (solvency capital requirement) sits above the MCR (minimum capital requirement) floor. Two approaches: standardized (average-firm risk profile) or internal models (one-year VaR at 99.5% confidence).",
      intuition: "Solvency II does for insurance companies what Basel II does for banks: it replaces flat, one-size-fits-all capital rules with a risk-sensitive framework. The SCR is calculated by combining capital charges across three risk categories — underwriting risk (split into life, non-life/property-casualty, and health insurance risk), investment risk (split into market and credit risk), and operational risk — and, like Basel II, an insurer's internal model must pass three tests before supervisors will accept it: a statistical quality test (is the data and methodology sound?), a calibration test (does it produce results consistent with the industry-wide SCR standard?), and a use test (do risk managers actually rely on this model to make real business decisions, or is it just a compliance exercise?).",
      pitfall: "Basel II's IRB confidence level (99.9%) and Solvency II's internal model confidence level (99.5%) are FREQUENTLY SWAPPED by mistake on the exam — banks get the stricter 99.9%, insurers get 99.5%. Three internal-model tests: statistical quality, calibration, use test.",
      related: [],
      memory: "Banks: 99.9% (stricter). Insurers: 99.5% (slightly less strict) — don't swap them."
    }
  ],

  connections: {
    from: [
      { r: 58, why: "Modern capital planning processes sit on top of this foundational regulatory framework." },
      { r: 26, why: "The IRB capital formula is the identical Vasicek WCDR formula from credit VaR." }
    ],
    to: [
      { r: 60, why: "This reading's Basel II framework is exactly what the 2007-09 crisis exposed and Basel 2.5/III patched." }
    ],
    confused: [
      { what: "Foundation IRB vs Advanced IRB", how: "Foundation IRB: bank supplies PD only (LGD/EAD/M are supervisory fixed values). Advanced IRB: bank supplies ALL of PD, LGD, EAD, and M." },
      { what: "Basel II IRB confidence (99.9%) vs Solvency II (99.5%)", how: "Banks (Basel II IRB) use 99.9%; insurers (Solvency II) use 99.5% — a frequently swapped pair, memorize banks-stricter." },
      { what: "Corporate/retail IRB maturity adjustment", how: "Corporate exposures include the maturity adjustment (MA) in the capital formula; retail exposures DROP the MA entirely — capital = EAD×LGD×(DR99.9−PD) with no MA term." }
    ]
  },

  misconceptions: [
    { wrong: "\"Basel II's IRB approach uses a 99.5% confidence level, same as Solvency II.\"", right: "Basel II IRB uses 99.9% (stricter); Solvency II internal models use 99.5% — banks get the stricter standard, a frequently swapped pair on the exam." },
    { wrong: "\"Retail exposures under IRB include the same maturity adjustment as corporate exposures.\"", right: "Retail IRB DROPS the maturity adjustment entirely: capital = EAD×LGD×(DR99.9−PD), with no MA term, unlike corporate exposures which include MA." },
    { wrong: "\"Foundation IRB and Advanced IRB both require the bank to supply all of PD, LGD, EAD, and M.\"", right: "Foundation IRB only requires the bank to supply PD — LGD, EAD, and M are supervisory-fixed values. Advanced IRB requires the bank to supply all four inputs itself." },
    { wrong: "\"The IRB capital formula is a distinct model from Vasicek's credit VaR framework.\"", right: "It's the IDENTICAL Vasicek/Gordy one-factor Gaussian copula formula (same as R26's WCDR and R29's V(T,X)) — just applied as the actual regulatory capital rule." },
    { wrong: "\"Loan loss reserves count as Tier 1 or Tier 2 capital under Basel I.\"", right: "Basel I deliberately excludes loan loss reserves from the definition of regulatory capital entirely — Tier 1 is equity minus goodwill plus noncumulative perpetual preferred stock, and Tier 2 is subordinated instruments; reserves are neither." },
    { wrong: "\"Basel II first introduced capital charges for operational risk AND market risk.\"", right: "Market risk capital dates to the 1996 Amendment to Basel I. Basel II's genuinely new contribution on this front was operational risk capital — market risk charges carried over unchanged from 1996." }
  ],

  highYield: [
    { stars: 5, what: "IRB capital charge formula: Capital=EAD×LGD×[WCDR−PD]×MA, full worked calculation.", why: "The single most important formula in this reading — identical to R26/R29's machinery, appearing in a regulatory-capital context." },
    { stars: 5, what: "Basel I's three Cooke ratios and full RWA worked calculation.", why: "The foundational capital ratio framework, frequently tested with new asset-mix numbers." },
    { stars: 4, what: "Basel II IRB (99.9%) vs Solvency II (99.5%) confidence levels — the frequently swapped pair.", why: "Explicitly flagged as a common exam trap." },
    { stars: 4, what: "1996 market risk capital charge formula and the traffic-light multiplier connection.", why: "Directly reuses R4's backtesting zones in a capital-consequence context." },
    { stars: 3, what: "Basel II operational risk: BIA/Standardized/AMA, especially the BIA worked calculation.", why: "Sets up the SMA's replacement of all three approaches in R62." },
    { stars: 3, what: "Foundation IRB vs Advanced IRB input responsibility split.", why: "A clean, precisely testable two-way distinction." }
  ],

  recall: [
    { q: "A bank holds $30M T-bills (0% weight), $40M insured mortgages (0% weight), $60M uninsured mortgages (50% weight), and $100M corporate loans (100% weight). Compute Basel I RWA and the minimum total capital required.", a: "RWA = 0+0+(60×0.5)+(100×1.0) = 30+100 = $130M. Minimum total capital = 8% × $130M = $10.4M." },
    { q: "Why does an IRB-based capital charge for a highly-rated corporate loan come out dramatically lower than the Basel I flat 100% risk-weight treatment?", a: "Basel I treats all corporate loans identically regardless of actual creditworthiness (100% risk weight, full stop). IRB uses the borrower's actual PD (very low for a high-rated corporate) inside the Vasicek/Gordy formula, so [WCDR−PD] and the resulting capital charge come out much smaller than the crude Basel I flat treatment — reflecting genuinely lower risk for a strong credit." },
    { q: "A bank uses Foundation IRB for a corporate exposure. Which inputs does the bank supply itself, and which are fixed by supervisors?", a: "The bank supplies only PD. LGD (typically 45% senior / 75% subordinated), EAD, and M (maturity, usually 2.5 years) are all supervisory-fixed values under Foundation IRB — only Advanced IRB requires the bank to supply all four inputs itself." },
    { q: "Why is it a common mistake to use 99.9% confidence for a Solvency II internal model calculation?", a: "99.9% is the Basel II IRB confidence level used for BANKS. Solvency II (the insurance parallel) uses a lower 99.5% confidence level for its internal models — banks and insurers use different confidence standards, and this pair is frequently swapped by mistake." },
    { q: "Why did the 1995 netting amendment matter to a bank that was actively hedging with the same counterparty?", a: "Before 1995, Basel I applied a full add-on charge to every derivative separately, even offsetting ones with the same counterparty — so hedging with Bank B by both buying and later selling equivalent protection to Bank B doubled the capital charge instead of reducing net risk. The netting amendment let a legally enforceable ISDA master agreement net positive and negative exposures together (captured by the net replacement ratio), removing the perverse penalty on hedging." },
    { q: "A bank's gross income was $20B, −$2B, and $12B over the last three years. Under the BIA, what is its operational risk capital requirement, and why is the negative year excluded?", a: "Capital = (20+12)/2 × 0.15 = $2.4B. The negative-income year is dropped from both the sum and the divisor because BIA capital is meant to scale with a positive proxy for business activity (gross income); including a loss year would understate the true 3-year average scale of the business, so Basel II simply excludes it rather than letting it drag the average down or turn it negative." }
  ],

  hooks: [
    { title: "One formula, three costumes", text: "R26's WCDR, R29's V(T,X), and R59's IRB capital charge are the same equation in three costumes — the regulatory version just multiplies by EAD×LGD and subtracts PD before applying a maturity adjustment." },
    { title: "Banks get the stricter grade", text: "99.9% for banks (Basel II IRB), 99.5% for insurers (Solvency II) — banks face the tougher bar. Remember 'banks are strict-er' to keep the pair straight." },
    { title: "The risk-weighting revolution", text: "Basel I's whole innovation, compressed: not all assets are equally risky, so don't require equal capital against them. Everything since has been refining HOW FINELY to slice that risk-weighting." }
  ],

  breakdown: [
    {
      title: "Basel I's three capital ratios (the Cooke ratios)",
      points: [
        "Total assets / capital < 20 — equivalent to capital/assets > 5%, a simple leverage cap carried over from many pre-1988 national rules.",
        "Tier 1 capital / RWA > 4% — core, loss-absorbing capital (equity minus goodwill, noncumulative perpetual preferred) must be at least 4% of risk-weighted assets.",
        "Total capital (Tier 1 + Tier 2) / RWA > 8% — the headline ratio; Tier 2 (cumulative preferred, 99-year debentures, subordinated debt >5yr) can supply at most half of the total."
      ]
    },
    {
      title: "Basel II's three pillars",
      points: [
        "Pillar 1 — Minimum capital requirements: the formal 8%-of-RWA math, now covering credit, market, and (newly) operational risk.",
        "Pillar 2 — Supervisory review: regulators exercise discretion for local conditions and require every bank to run an Internal Capital Adequacy Assessment Process (ICAAP).",
        "Pillar 3 — Market discipline: mandatory disclosure of capital instruments, risk exposures, and risk measures so markets can price and discipline bad risk management."
      ]
    },
    {
      title: "Basel II's three credit risk approaches",
      points: [
        "Standardized — Basel-I-like risk weighting but now driven by external credit ratings (sovereigns 0%-150%, banks/corporates 20%-150%); used by less sophisticated banks.",
        "Foundation IRB — the bank supplies only PD; LGD (45% senior / 75% subordinated), EAD, and M (usually 2.5 years) are fixed supervisory values.",
        "Advanced IRB — the bank supplies all four inputs itself: PD, LGD, EAD, and M, subject to supervisory approval of its internal models."
      ]
    },
    {
      title: "Basel II's three operational risk approaches",
      points: [
        "Basic Indicator Approach (BIA) — capital = 15% × 3-year average annual gross income, excluding any negative-income year from the average.",
        "Standardized Approach — same gross-income logic, but with a different multiplier per business line (e.g. 12% retail, 15% commercial, 18% payments/settlement).",
        "Advanced Measurement Approach (AMA) — an internal one-year, 99.9%-confidence operational-risk VaR model; uniquely allows credit for insurance-based risk mitigation."
      ]
    },
    {
      title: "Solvency II's three internal-model tests (for insurers)",
      points: [
        "Statistical quality test — checks the data and methodology underlying the firm's VaR calculation.",
        "Calibration test — checks that measured risks are consistent with the industry-wide SCR standard and regulator-set target criteria.",
        "Use test — checks that the model is actually relied on by risk managers in real business decisions, not just built for compliance."
      ]
    }
  ],

  quiz: [
    {
      q: "A bank's assets are $25M T-bills (0% weight), $30M insured mortgages (0% weight), $40M uninsured mortgages (50% weight), and $120M corporate loans (100% weight). What is Basel I risk-weighted assets (RWA)?",
      options: ["$140M", "$160M", "$215M", "$120M"],
      answer: 0,
      why: "RWA = (25×0)+(30×0)+(40×0.5)+(120×1.0) = 0+0+20+120 = $140M. The tempting-but-wrong $215M simply sums all four asset amounts without applying any risk weights at all, ignoring Basel I's central innovation."
    },
    {
      q: "A bank has a $200M interest rate swap with a corporate counterparty, current value $4M, add-on factor 0.6% of principal. What is the credit equivalent amount (CEA)?",
      options: ["$1.2M", "$4M", "$5.2M", "$204M"],
      answer: 2,
      why: "CEA = max(V,0) + D×L = 4 + (0.006×200) = 4 + 1.2 = $5.2M. Choosing $4M alone ignores the add-on for potential future exposure; $1.2M alone ignores the current exposure term; $204M mistakenly adds full notional instead of just the add-on."
    },
    {
      q: "Which statement correctly distinguishes Foundation IRB from Advanced IRB under Basel II?",
      options: [
        "Foundation IRB requires the bank to supply PD, LGD, EAD, and M; Advanced IRB requires only PD.",
        "Foundation IRB requires the bank to supply only PD, with LGD/EAD/M set by supervisors; Advanced IRB requires the bank to supply all four inputs.",
        "Foundation IRB and Advanced IRB differ only in the confidence level used (99.5% vs 99.9%).",
        "Foundation IRB applies only to retail exposures, while Advanced IRB applies only to corporate exposures."
      ],
      answer: 1,
      why: "Foundation IRB: bank supplies PD only, everything else supervisory-fixed. Advanced IRB: bank supplies all four inputs (PD, LGD, EAD, M) itself. The 'Foundation requires all four, Advanced requires only PD' answer reverses the roles; the 'they differ only by confidence level' answer invents a confidence-level distinction that doesn't exist between the two IRB variants (both use 99.9%); the 'Foundation is retail-only, Advanced is corporate-only' answer confuses this with the retail/corporate distinction, which is a separate axis."
    },
    {
      q: "A $150M A-rated corporate loan has PD=0.1%, LGD=50%, DR99.9 (WCDR)=3.4%, and M=2.5 years (so MA=1.0). What is the IRB capital requirement?",
      options: ["$0.75M", "$2.475M", "$5.1M", "$49.19M"],
      answer: 1,
      why: "Capital = EAD×LGD×[WCDR−PD]×MA = 150×0.5×(0.034−0.001)×1.0 = 150×0.5×0.033 = $2.475M. $49.19M is actually the resulting RWA (=12.5×Capital), not the capital itself — a common mix-up between the two related-but-different figures. $5.1M forgets to subtract PD from WCDR before multiplying; $0.75M omits the [WCDR−PD] bracket, using LGD×EAD×PD instead (that's closer to expected loss, not the capital charge)."
    },
    {
      q: "A bank's gross income over the last three years was $18B, −$3B, and $9B. Under the Basic Indicator Approach, what is its operational risk capital requirement?",
      options: ["$2.025B", "$1.35B", "$4.05B", "$3.375B"],
      answer: 0,
      why: "The negative-income year is excluded from both the sum and the year-count: capital = (18+9)/2 × 0.15 = 13.5 × 0.15 = $2.025B. $4.05B mistakenly averages over all 3 years (including dividing the sum of 24 by 3, i.e. forgetting to drop the negative year from the divisor); $1.35B mistakenly uses only one year's income; $3.375B applies the wrong (18% payments/settlement) multiplier instead of the 15% BIA rate."
    },
    {
      q: "Which pairing of confidence levels is correct under the pre-crisis Basel/Solvency frameworks?",
      options: [
        "Basel II IRB: 99.5%; Solvency II internal models: 99.9%",
        "Basel II IRB: 99.9%; Solvency II internal models: 99.5%",
        "Both Basel II IRB and Solvency II internal models use 99.9%",
        "Both Basel II IRB and Solvency II internal models use 99.5%"
      ],
      answer: 1,
      why: "Banks (Basel II IRB) use the stricter 99.9% confidence level; insurers (Solvency II internal models) use a lower 99.5% confidence level. This exact pair is explicitly flagged as frequently swapped by mistake on the exam — memorizing 'banks are stricter' avoids the trap that the reversed-pairing ('Basel II IRB: 99.5%; Solvency II: 99.9%') answer represents."
    }
  ],

  sources: [
    { title: "Basel Committee on Banking Supervision — history and mandate", url: "https://www.bis.org/bcbs/history.htm", note: "BIS's own account of why the Basel Committee was formed in 1974 and how its standards evolved." },
    { title: "Basel Accords — overview (Wikipedia)", url: "https://en.wikipedia.org/wiki/Basel_Accords", note: "A readable summary tracing Basel I through Basel III, useful for seeing this reading's framework in the context of what came after." },
    { title: "Basel II: International Convergence of Capital Measurement and Capital Standards", url: "https://www.bis.org/publ/bcbs128.htm", note: "The actual 2006 BCBS text this reading condenses — the primary source for the three pillars, IRB formula, and operational risk approaches." },
    { title: "Solvency II Directive overview", url: "https://en.wikipedia.org/wiki/Solvency_II_Directive", note: "Background on the EU insurance capital framework this reading compares against Basel II, including the SCR/MCR structure." }
  ],

  pdf: { book: 3, query: "Basel I (1988) recommended a minimum capital level" },

  summary: `<p><strong>Basel I</strong>: Cooke ratios (assets/capital<20, Tier1/RWA>4%, total/RWA>8%); risk-weighted assets by asset type; CEA=max(V,0)+D×L for derivatives; NRR quantifies netting benefit; 1996 market risk charge=max(prev VaR, mc×avg 60d VaR)+specific risk (mc from traffic-light backtesting). <strong>Basel II</strong>: three pillars (capital/supervisory review/disclosure); credit risk — Standardized (ratings-based), Foundation IRB (PD only), Advanced IRB (all inputs); <strong>IRB formula</strong> Capital=EAD×LGD×[WCDR−PD]×MA (identical to R26/R29's Vasicek/copula machinery) — retail drops MA entirely. Op risk: BIA (15%×3yr avg gross income), Standardized (per-business-line multiplier), AMA (internal 99.9% VaR model). <strong>Solvency II</strong>: SCR above MCR floor, 99.5% confidence (vs banks' 99.9% — frequently swapped).</p>`
});
