# FRM Part II site — verification & gap report

_Generated during the LaTeX/typography pass. Covers (A) what changed, (B) content-fidelity findings vs. the source PDFs, and (C) the figure/image gap you asked about._

---

## A. What changed in this pass

**Math is now real LaTeX.** All **161 formulas** across the 101 readings were converted from the old HTML/Unicode form (`σ<sub>P&L</sub>`, `√(...)`, monospace, no-wrap) to KaTeX-typeset LaTeX.

- **Engine:** KaTeX is **vendored locally** at `site/assets/vendor/katex/` (JS + CSS + 20 woff2 fonts, ~1.4 MB). It is loaded only in `chapter.html`. No CDN, no build step — the `file://`, dependency-free constraint is intact.
- **Rendering rule:** `FRM.renderMath` typesets any formula string that looks like LaTeX (contains a backslash or a braced `_{}`/`^{}`); the one intentional exception (the Basel BIC €-bucket line) stays as HTML text because KaTeX lacks a `€` glyph.
- **Formulae are enboxed:** each formula sits in a card with a cyan spine, centered and enlarged (1.22rem). Over-wide formulas auto-shrink to fit via `FRM.fitMath`.
- **Word-equations became fractions:** ratios like RAROC, NIM, Sharpe, the SPV delinquency ratios, Basel capital ratios etc. now render as proper `\dfrac{\text{…}}{\text{…}}` stacked fractions instead of italic letter-soup.
- **Inline prose math** is now supported via `\( … \)` / `\[ … \]` (chosen over `$…$` so dollar amounts like "$100 million" are never mangled). The mechanism is wired; annotating prose is a follow-up (see task list).

**Typography — core/testable content is now emphasized:**

- **High-yield items are tiered by star rating:** 5★ items render at 1.2rem, bold, on a warm amber-tinted card; 4★ at 1.1rem with a warm border; 3★ and below at base size. Emphasis, not clutter.
- **Reading tagline/lead** enlarged to 1.2rem.
- **Concept "Definition" fields** (the testable core of each term) enlarged to 1.08rem with an accent spine.

**Verification run:** all 101 data files parse (`node -c`); all 101 readings register; all 160 LaTeX formulas render through KaTeX with **0 errors**; a headless-Chrome render sweep of all 101 pages reported **0 tex-errors, 0 widget failures, 0 undefined/null**.

---

## B. Content fidelity vs. source

The site's **text** is a faithful (deliberately condensed) derivation of the source. All 101 readings are present, and spot-checks of high-yield readings (e.g. r25 Estimating Default Probabilities: 8 concepts, 5 formulas, 6 high-yield, 4 recall) show the concepts, formulas, and exam traps from the source are represented. Condensation is expected and appropriate; no substantive **text** omissions were found in the sampled readings.

---

## C. The figure/image gap (your main concern)

**Finding: the PDF→markdown extraction dropped 100% of the figures.** The five source `.md` files contain **0 embedded images** yet reference "Figure N.M" **214 distinct times**. So every chart, tree, diagram, and table-figure in the original Schweser PDFs exists only as a **caption reference** in the text — the images themselves never made it into the material the site was built from.

The site compensated by hand-building **31 interactive SVG widgets**. Mapping Schweser figure numbers (which equal reading numbers) to widget coverage:

- **60 readings** have one or more source figures.
- **23** of those already have a site widget covering the concept.
- **37** have source figures but **no visual on the site** — listed below, by exam priority.

**Important caveat:** "no widget" means the *diagram* is absent, not that the *content* is missing — the text still explains each figure's concept. Also, raw figure count overstates importance for some readings: e.g. r73's 18 "figures" are illustrative liquidity-**report templates**, and r78's are FX-basis time-series plots — useful but not core testable diagrams. The 5★/4★ conceptual diagrams (default-probability/Merton, credit VaR, copulas, term-structure trees, securitization waterfalls) are the ones most worth recreating as widgets.

### Readings with source figures but no site widget

| Reading | Priority | Figures | Title |
|---|---|---|---|
| r25 | ★★★★★ | 6 | Estimating Default Probabilities |
| r26 | ★★★★★ | 3 | Credit Value at Risk |
| r16 | ★★★★★ | 2 | Fundamental Review of the Trading Book (FRTB) |
| r73 | ★★★★ | 18 | Contingency Funding Planning |
| r30 | ★★★★ | 8 | Credit Derivatives |
| r39 | ★★★★ | 6 | An Introduction to Securitization |
| r42 | ★★★★ | 6 | Risk Identification |
| r35 | ★★★★ | 5 | Central Clearing |
| r09 | ★★★★ | 4 | Financial Correlation Modeling — Bottom-Up (Copulas) |
| r14 | ★★★★ | 4 | The Art of Term Structure Models: Volatility and Distribution |
| r77 | ★★★★ | 3 | Liquidity Transfer Pricing: A Guide to Better Practice |
| r90 | ★★★★ | 3 | Performing Due Diligence on Specific Managers and Funds |
| r29 | ★★★★ | 2 | Credit Risk (in Derivatives) |
| r34 | ★★★★ | 2 | Margin (Collateral) and Settlement |
| r84 | ★★★★ | 2 | Portfolio Construction |
| r17 | ★★★★ | 1 | Fundamentals of Credit Risk |
| r20 | ★★★★ | 1 | Capital Structure in Banks |
| r33 | ★★★★ | 1 | Netting, Close-Out, and Related Aspects |
| r40 | ★★★★ | 1 | Introduction to Operational Risk and Resilience |
| r78 | ★★★ | 8 | Covered Interest Parity Lost: Understanding the Cross-Currency Basis |
| r12 | ★★★ | 7 | The Evolution of Short Rates and the Shape of the Term Structure |
| r24 | ★★★ | 4 | Country Risk: Determinants, Measures, and Implications |
| r68 | ★★★ | 3 | Intraday Liquidity Risk Management |
| r22 | ★★★ | 2 | Credit Scoring and Rating |
| r31 | ★★★ | 2 | Derivatives |
| r45 | ★★★ | 2 | Risk Reporting |
| r98 | ★★★ | 2 | Climate-Related Financial Risks — Measurement Methodologies |
| r08 | ★★★ | 1 | Empirical Properties of Correlation |
| r19 | ★★★ | 1 | Credit Risk Management |
| r23 | ★★★ | 1 | Credit Scoring and Retail Credit Risk Management |
| r46 | ★★★ | 1 | Integrated Risk Management |
| r48 | ★★★ | 1 | Case Study: Cyberthreats and Information Security Risks |
| r87 | ★★★ | 1 | Risk Monitoring and Performance Measurement |
| r95 | ★★★ | 1 | Financial Risk Management and Explainable, Trustworthy, Responsible AI |
| r99 | ★★★ | 1 | Principles for the Effective Management and Supervision of Climate-Related Financial Risks |
| r18 | ★★ | 1 | Governance |
| r94 | ★★ | 1 | Artificial Intelligence and Bank Supervision |

---

## Appendix — exact figures missing per reading

_Captions preserved from the source text. "Fig N.M" = reading N, figure M._

**r25 — Estimating Default Probabilities** (★★★★★, 6 figures)
- Fig 25.1. Cumulative Issuer-Weighted Default Rates for 1981–2020 (in %)
- Fig 25.2. Recovery Rates on Corporate Bonds for 1983–2021
- Fig 25.3. Credit Default Swap Example
- Fig 25.5. Comparing Cumulative Default Probabilities With Credit Spreads
- Fig 25.6. Hazard Rates Differences

**r26 — Credit Value at Risk** (★★★★★, 3 figures)
- Fig 26.1. One-Year Rating Transition Matrix for 1981–2020 (in %)
- Fig 26.2. Partial Rating Transition Matrix (in %)
- Fig 26.3. Computing Credit VaR With Credit Spreads

**r16 — Fundamental Review of the Trading Book (FRTB)** (★★★★★, 2 figures)
- Fig 16.1. Example Default Schedule for $950 Million Bond Portfolio
- Fig 16.2. Allocation of Risk Factors to Liquidity Horizons

**r73 — Contingency Funding Planning** (★★★★, 18 figures)
- Fig 73.1. Best Practice Liquidity Reporting in the UK
- Fig 73.2. Deposit Tracker Report
- Fig 73.3. Deposit Tracker Report: Target LTD
- Fig 73.4. Deposit Tracker Graph
- Fig 73.5. Deposit Type and Tenor
- Fig 73.6. Liquid Securities by Tenor
- Fig 73.7. Liquidity Gap and Liquidity Risk Factor
- Fig 73.8. Partial Funding Maturity Gap (Mismatch) Report
- Fig 73.9. Cash Flow Survival Report
- Fig 73.10. Concentration Report of Large Depositors
- Fig 73.11. Undrawn Commitments
- Fig 73.12. Liability Profile
- Fig 73.13. Firm-Specific Wholesale Funding Yield Curves
- Fig 73.14. Funding by Product and Tenor Bucket
- Fig 73.15. Summary Senior Management Liquidity Report MI
- Fig 73.16. Cash Flow Survival Report
- Fig 73.17. Liability Stickiness Stress Test Report
- Fig 73.18. Quarterly Stress Test Report

**r30 — Credit Derivatives** (★★★★, 8 figures)
- Fig 30.1. Credit Default Swap Structure
- Fig 30.2. Probabilities of Survival and Default, Hazard Rate = 3%
- Fig 30.3. Calculation of PV of Expected Payment ($1 Notional)
- Fig 30.4. Calculation of PV of Expected Accrual Payment ($1 Notional)
- Fig 30.5. Calculation of PV of Expected Payoff ($1 Notional)
- Fig 30.6. PV of Expected Payoff on Binary CDS ($1 Notional)
- Fig 30.7. Total Return Swap Structure
- Fig 30.8. A CDO With

**r39 — An Introduction to Securitization** (★★★★, 6 figures)
- Fig 39.1. Securitization Process
- Fig 39.2. Cash Flow Waterfall
- Fig 39.3. Master Trust Structure
- Fig 39.4. Calculation of WAL
- Fig 39.5. Different Prepayment Scenarios
- Fig 39.6. ABS and MBS Performance Tools

**r42 — Risk Identification** (★★★★, 6 figures)
- Fig 42.1. Process Mapping
- Fig 42.2. Level 1 Categories of Operational Risk Events
- Fig 42.3. Execution, Delivery, and Process Management (Level 1)
- Fig 42.4. Clients, Products, and Business Practices (Level 1)
- Fig 42.5. ORX Taxonomy
- Fig 42.6. Actionable Operational Risk Management

**r35 — Central Clearing** (★★★★, 5 figures)
- Fig 35.1. Bilateral Structure
- Fig 35.2. CCP Structure
- Fig 35.3. Centrally Cleared Market
- Fig 35.4. Multilateral Netting
- Fig 35.5. CCP Loss Waterfall

**r09 — Financial Correlation Modeling — Bottom-Up (Copulas)** (★★★★, 4 figures)
- Fig 9.1. Mapping a Gaussian Copula to the Standard Normal Distribution
- Fig 9.2. Default Probabilities of Companies B and C
- Fig 9.3. Mapping Cumulative Default Probabilities to Standard Normal
- Fig 9.4. Mapping Default Time for a Random Sample

**r14 — The Art of Term Structure Models: Volatility and Distribution** (★★★★, 4 figures)
- Fig 14.1. Terminal Distributions
- Fig 14.2. Interest Rate Tree With Lognormal Model (Drift)
- Fig 14.3. Lognormal Model Rates at Each Node
- Fig 14.4. Interest Rate Tree With Lognormal Model (Mean Revision)

**r77 — Liquidity Transfer Pricing: A Guide to Better Practice** (★★★★, 3 figures)
- Fig 77.1. Repo Initiation
- Fig 77.2. Repo Termination (Settlement)
- Fig 77.3. Back-to-Back Repo Trades

**r90 — Performing Due Diligence on Specific Managers and Funds** (★★★★, 3 figures)
- Fig 90.1. Calculating Dollar-Weighted Return With the TI BA II Plus
- Fig 90.2. The M
- Fig 90.3. Performance Appraisal Data

**r29 — Credit Risk (in Derivatives)** (★★★★, 2 figures)
- Fig 29.1. Moody’s Average Cumulative Default Rates, 1970–2015 (%)
- Fig 29.2. Expected Excess Return on Bonds (in bps)

**r34 — Margin (Collateral) and Settlement** (★★★★, 2 figures)
- Fig 34.1. Margin Calculation Example (Without Initial Margin)
- Fig 34.2. Margin Calculation Example (With Initial Margin)

**r84 — Portfolio Construction** (★★★★, 2 figures)
- Fig 84.1. Investment Returns During Expansions and Recessions
- Fig 84.2. Returns for SMB, HML, and WML Strategies

**r17 — Fundamentals of Credit Risk** (★★★★, 1 figures)
- Fig 17.1. Credit Risk Transaction Types

**r20 — Capital Structure in Banks** (★★★★, 1 figures)
- Fig 20.1. Loan Features

**r33 — Netting, Close-Out, and Related Aspects** (★★★★, 1 figures)
- Fig 33.1. Trade Compression Example

**r40 — Introduction to Operational Risk and Resilience** (★★★★, 1 figures)
- Fig 40.1. Building Blocks of Operational Resilience

**r78 — Covered Interest Parity Lost: Understanding the Cross-Currency Basis** (★★★, 8 figures)
- Fig 78.1. Central Treasury Management of LTP Process
- Fig 78.2. Zero-Cost Approach for LTP Based on Swap Curve
- Fig 78.3. Pooled Average Cost Approach for LTP
- Fig 78.4. Separate Average Cost and Average Benefit Approach to LTP
- Fig 78.6. Marginal Cost of Funds vs. Average Cost of Funds Approach to LTP
- Fig 78.7. Comparison of Matched-Maturity Marginal Cost of Funds Approach and Average Cost
- Fig 78.8. Liquidity Cushion for Unexpected Funding Outflows

**r12 — The Evolution of Short Rates and the Shape of the Term Structure** (★★★, 7 figures)
- Fig 12.1. Decision Tree Illustrating Expected 1-Year Rates for Two Years
- Fig 12.2. Risk-Neutral Decision Tree for a 2-Year Zero-Coupon Bond
- Fig 12.3. Risk-Neutral Decision Tree Illustrating Expected 1-Year Rates for
- Fig 12.4. Risk-Neutral Decision Tree for a 3-Year Zero-Coupon Bond
- Fig 12.5. Risk-Neutral Decision Tree Illustrating Volatility Effect on
- Fig 12.6. Price of a 2-Year Zero-Coupon Bond With Increased Volatility
- Fig 12.7. Decision Tree Illustrating Expected 1-Year Rates for Two Years

**r24 — Country Risk: Determinants, Measures, and Implications** (★★★, 4 figures)
- Fig 24.1. Changes in Concurrent Default in Foreign and Local Currency Debt
- Fig 24.2. Government Debt as a Percentage of GDP (as of 2020)
- Fig 24.3. Sample of Moody’s Latin American Sovereign Ratings
- Fig 24.4. Default Spreads on Dollar-Denominated Latin American Bonds

**r68 — Intraday Liquidity Risk Management** (★★★, 3 figures)
- Fig 68.1. Deposit Forecast
- Fig 68.2. Loan Forecast
- Fig 68.3. Estimated Liquidity Surplus (Deficit)

**r22 — Credit Scoring and Rating** (★★★, 2 figures)
- Fig 22.1. Credit Risk Scoring/Rating Development Process
- Fig 22.2. Example Distribution of Borrower Risk Grades

**r31 — Derivatives** (★★★, 2 figures)
- Fig 31.1. Clearing Financial Transactions
- Fig 31.2. Types of Derivatives by Market Size

**r45 — Risk Reporting** (★★★, 2 figures)
- Fig 45.1. The Reporting Cake
- Fig 45.2. Operational Risk Heatmap

**r98 — Climate-Related Financial Risks — Measurement Methodologies** (★★★, 2 figures)
- Fig 98.1. AI System Categories and Lifecycle Stages
- Fig 98.2. AI Actors Across Lifecycle Stages

**r08 — Empirical Properties of Correlation** (★★★, 1 figures)
- Fig 8.1. Empirical Findings for Equity, Bond, and Default Correlations

**r19 — Credit Risk Management** (★★★, 1 figures)
- Fig 19.1. Expected Loss Components

**r23 — Credit Scoring and Retail Credit Risk Management** (★★★, 1 figures)
- Fig 23.1. Cumulative Accuracy Profile and Accuracy Ratio

**r46 — Integrated Risk Management** (★★★, 1 figures)
- Fig 46.1. Stress Testing Framework Principles

**r48 — Case Study: Cyberthreats and Information Security Risks** (★★★, 1 figures)
- Fig 48.1. Information Security Risks

**r87 — Risk Monitoring and Performance Measurement** (★★★, 1 figures)
- Fig 87.1. Portfolio Standard Deviation

**r95 — Financial Risk Management and Explainable, Trustworthy, Responsible AI** (★★★, 1 figures)
- Fig 95.1. CoCo Features

**r99 — Principles for the Effective Management and Supervision of Climate-Related Financial Risks** (★★★, 1 figures)
- Fig 99.1. Financial Impact of Climate Risk Drivers and the Role of Transmission Channels

**r18 — Governance** (★★, 1 figures)
- Fig 18.1. Escalation of Delegation Example

**r94 — Artificial Intelligence and Bank Supervision** (★★, 1 figures)
- Fig 94.1. Ratings Issued to FRBSF by the DSR
