# content-run-ledger.md — the resume state

**This file is the position of the run.** A session that has just been cleared reads
this file, finds its place, and continues. Procedure lives in
`content-run-protocol.md`; durable style learnings live in `content-guidelines.md`.

## ACTIVE PHASE

    content-sonnet-clearance

Phase order (owner directive, 2026-07-25: content comes LAST, UI/functionality first):

1. `phase-3-hover-linking` .......... DONE 2026-07-25 (waves 1-20, all 101 rows verified).
                                      Linking is automatic; see the protocol section 1.
2. `ui-sweep` ....................... DONE 2026-07-25. All four named surfaces (planner,
                                      block review, case study, consistency) render
                                      marker-clean with teaching empty states; the pass
                                      also shipped the PDF viewer fixes, the eager-loading
                                      regression fix, the doctrine audit, and study
                                      nudges + Pomodoro. Detail in PROGRESS.md.
3. `content-sonnet-clearance` ....... ACTIVE. The important run. Waves of 5 + Opus-A gate.
4. `content-opus-improvement` ....... Opus-B. "Leave it alone" is a valid verdict.

Advance this header only when every row for the active phase is `done`, then commit.

## How to read a row

`p3` = phase-3 hover linking status. Linking is AUTOMATIC (built 2026-07-25, see
the protocol's section 1), so `p3: done` means **this reading's generated links
were reviewed and are right**, not that its data file was edited. No reading is
edited in this phase. A reading with no links is still a legitimate `done`.
`content` = Sonnet clearance status.
Values: `todo` | `wip` | `done` | `blocked`. `wave` = the wave number that cleared it.
`opusA` = `pass` once the gate certified that wave. Put anything a human needs to know
in `notes` (keep it to one line; real detail goes in `content-guidelines.md`).

**Find your position:** first row whose column for the active phase is `todo`.

| rn | bk | title | p3 | content | wave | opusA | notes |
|----|----|-------|----|---------|------|-------|-------|
| 1 | 1 | Estimating Market Risk Measures | done | done | 1 | pass |  |
| 2 | 1 | Non-Parametric Approaches | done | done | 1 | pass | Good as written; only abbreviations + GARP attributions. |
| 3 | 1 | Parametric Approaches (II): Extreme Value Theory | done | done | 1 | pass | Fixed reciprocal POT ratio in concepts example. |
| 4 | 1 | Backtesting VaR | done | done | 1 | pass | Fixed inverted eli5 direction + 97/97.5 contradiction. |
| 5 | 1 | VaR Mapping | done | done | 1 | pass |  |
| 6 | 1 | Messages From the Academic Literature | done | done | 2 | pass | Wrong-way risk framing fine; only dashes + abbreviations. |
| 7 | 1 | Correlation Basics | done | done | 2 | pass | Fixed: the tranche trade was misdated as 2008 throughout (May 2005). |
| 8 | 1 | Empirical Properties of Correlation | done | done | 2 | pass | Fixed thinkLike overstating recession correlation as stable (80.5% vs 83.0%). |
| 9 | 1 | Financial Correlation Modeling: Copulas | done | done | 2 | pass | Copula math and derivations verified correct. |
| 10 | 1 | Empirical Approaches to Risk Metrics and Hedging | done | done | 2 | pass | Regression-hedge direction (dep=nominal, indep=real) verified against Tuckman. |
| 11 | 1 | The Science of Term Structure Models | done | done | 3 | pass | Backward induction, OAS direction and BSM-for-bonds trio all verified correct. |
| 12 | 1 | Evolution of Short Rates and Shape of the Term Structure | done | done | 3 | pass | Convexity arithmetic (1.84bp, z2=7.9816%) reproduced exactly. |
| 13 | 1 | The Art of Term Structure Models: Drift | done | done | 3 | pass | Vasicek theta=18%, 10-yr forecast 9.26%, half-life 23.1yr all check out. |
| 14 | 1 | The Art of Term Structure Models: Volatility and Distribution | done | done | 3 | pass | Fixed lognormal up-node rounded to 1.20 when e^0.20=1.2214; clarified CIR yield vol. |
| 15 | 1 | Volatility Smiles | done | done | 3 | pass | Min-variance delta below BSM delta confirmed at source line 4789. |
| 16 | 1 | Fundamental Review of the Trading Book (FRTB) | done | done | 4 | pass | FRTB numbers verified: 2.326 vs 2.338 sigma, 10/20/40/60/120 LH, 12/30 exceptions. |
| 17 | 2 | Fundamentals of Credit Risk | done | done | 4 | pass | Repaired two cross-string parenthesis breaks from the bulk dash pass. |
| 18 | 2 | Governance | done | done | 4 | pass | Repaired a garbled three-lines-of-defense summary and the origination/assessment/approval def. |
| 19 | 2 | Credit Risk Management | done | done | 4 | pass | Concentration limits 10% to 25%; IFRS 9 stage horizons left as written (correct). |
| 20 | 2 | Capital Structure in Banks | done | done | 4 | pass | EL/UL algebra and the rho=1 boundary quiz verified correct. |
| 21 | 2 | Introduction to Credit Risk Modeling and Assessment | done | done | 5 | pass | Trimmed two enumerated defs (breakdown already carried both lists). |
| 22 | 2 | Credit Scoring and Rating | done | done | 5 | pass | Trimmed the two CRA defs; five-step process and five criticisms live in breakdown. |
| 23 | 2 | Credit Scoring and Retail Credit Risk Management | done | done | 5 | pass | Fixed a Module Quiz source leak; trimmed the retail-risks and CAP/AR defs. |
| 24 | 2 | Country Risk: Determinants, Measures, and Implications | done | done | 5 | pass | Trimmed four enumerated defs; kept the committee-vote detail inline. |
| 25 | 2 | Estimating Default Probabilities | done | done | 5 | pass | Fixed a related ref that used {r,why} where the schema wants a label. |
| 26 | 2 | Credit Value at Risk | done | done | 6 | pass | WCDR sign trap (N-1(X) = +3.09) and the $589.00/$56.81 credit VaR figures verified. |
| 27 | 2 | Portfolio Credit Risk | done | done | 6 | pass | Covariance and SD arithmetic in the two-credit example reproduced. |
| 28 | 2 | Structured Credit Risk | done | done | 6 | pass | Exemplar eli5 dashes rewritten by hand, not mechanically; types-of-products def trimmed. |
| 29 | 2 | Credit Risk (Spread Risk & Default Intensity) | done | done | 6 | pass | Repaired a wrong-way/right-way paren break from the bulk pass. |
| 30 | 2 | Credit Derivatives | done | done | 6 | pass | Accrual and settlement worked example left as written (correct). |
| 31 | 2 | Derivatives (Counterparty Risk Intro) | done | done | 7 | pass | Trimmed the legacy-entities def; the guidelines' OPEN monoline/CDPC why-item stays for Opus-B. |
| 32 | 2 | Counterparty Risk and Beyond | done | done | 7 | pass | Four enumerated defs trimmed; CVA-as-price vs limit-as-cap now stated in the def itself. |
| 33 | 2 | Netting, Close-Out, and Related Aspects | done | done | 7 | pass | Fixed a quiz why the validator read as an option-letter reference; two related refs re-shaped. |
| 34 | 2 | Margin (Collateral) and Settlement | done | done | 7 | pass | Clean apart from dashes and three source references. |
| 35 | 2 | Central Clearing | done | done | 7 | pass | Two defs trimmed; one related ref re-shaped. eli5 REWRITTEN 2026-07-26 after the owner called it mediocre. |
| 36 | 2 | Future Value and Exposure | done | done | pilot | pass | 2026-07-25 pilot, full rewrite. Template + lessons in content-guidelines.md. |
| 37 | 2 | CVA | done | done | 8 | pass | Clean apart from dashes; CVA formula prose verified against R36's definitions. |
| 38 | 2 | The Evolution of Stress Testing Counterparty Exposures | done | done | 8 | pass | Three defs trimmed; a first pass invented four pitfalls and was corrected against the real four. |
| 39 | 2 | An Introduction to Securitization | done | done | 8 | pass | Clean apart from dashes and two source references. |
| 40 | 3 | Introduction to Operational Risk and Resilience | done | done | 8 | pass | Five defs trimmed; two new breakdown blocks added so no enumeration was lost. |
| 41 | 3 | Risk Governance | done | done | 9 | pass | Three defs trimmed into real definitions; new breakdown blocks for board duties and risk appetite. pdf.query was authored prose, now verbatim. |
| 42 | 3 | Risk Identification | done | done | 9 | pass | Clean apart from dashes and AI-isms; a padding GARP source link replaced with a live BIS one. |
| 43 | 3 | Risk Measurement and Assessment | done | done | 9 | pass | Fixed a 10x decimal error in the FTA product and a wrong forward reference (SMA is R62, not R63). |
| 44 | 3 | Risk Mitigation | done | done | 9 | pass | Already dash-clean; only AI-isms and one loose RPO/RTO quiz stem. |
| 45 | 3 | Risk Reporting | done | done | 9 | pass | Already dash-clean; four defs trimmed after enriching breakdown so no enumeration detail was lost. |
| 46 | 3 | Integrated Risk Management | done | done | 10 | pass | Dashes plus AI-isms; fixed a wrong related ref (R56 labelled 'stress testing at banks', which is R55). |
| 47 | 3 | Cyber-Resilience: Range of Practices | done | done | 10 | pass | Dash purge on breakdown labels; heavy meta-reference cleanup. Facts spot-checked against the BCBS survey. |
| 48 | 3 | Case Study: Cyberthreats and Information Security Risks | done | done | 10 | pass | Dash-clean; pdf.query was the app's own tagline, now verbatim source text. |
| 49 | 3 | Case Study: Financial Crime and Fraud | done | done | 10 | pass | Dash-clean but full of colon artifacts from an earlier purge; regrammared. USAA facts verified. |
| 50 | 3 | Guidance on Managing Outsourcing Risk | done | done | 10 | pass | Dash purge; replaced a 'None of these' quiz option, which is position-dependent under shuffling. |
| 51 | 3 | Case Study: Third-Party Risk Management | done | done | 11 | pass | Dash purge and meta-reference cleanup; case facts (OCC, $80m/$60m) verified. |
| 52 | 3 | Case Study: Investor Protection and Compliance Risks | done | done | 11 | pass | Light dash pass; AI-isms in thinkLike and quiz whys removed. |
| 53 | 3 | Supervisory Guidance on Model Risk Management | done | done | 11 | pass | Light dash pass; the two-condition backtest rule and SR 11-7 definition verified. |
| 54 | 3 | Case Study: Model Risk and Model Validation | done | done | 11 | pass | Dash purge; replaced a 'None of the three' quiz option with a mechanism question on the copula. |
| 55 | 3 | Stress Testing Banks | done | done | 11 | pass | Dash purge; rewrote a recall answer that had said 'the reading doesn't specify' instead of answering. |
| 56 | 3 | Risk Capital Attribution and RAPM | done | done | 12 | pass | Heaviest wave-12 file: 101 dashes plus five over-long defs; two new breakdown blocks added. |
| 57 | 3 | Range of Practices in Economic Capital Frameworks | done | done | 12 | pass | Bulk dash pass mangled three defs by eating existing parens; all three rewritten as real definitions. |
| 58 | 3 | Capital Planning at Large Bank Holding Companies | done | done | 12 | pass | Dash purge; removed a Module Quiz source leak and fixed a {r,why} related ref. |
| 59 | 3 | Capital Regulation Before the Global Financial Crisis | done | done | 12 | pass | Dash purge only; the Basel I/II arithmetic and IRB parameters were already correct. |
| 60 | 3 | Solvency, Liquidity, and Other Regulation After the GFC | done | done | 12 | pass | Dash purge; the 367-word Dodd-Frank def trimmed, with the Volcker nuance moved into breakdown. |
| 61 | 3 | High-Level Summary of Basel III Reforms | done | todo | 13 | - | |
| 62 | 3 | Basel III: Finalizing Post-Crisis Reforms | done | todo | 13 | - | |
| 63 | 4 | Liquidity Risk | done | todo | 13 | - | |
| 64 | 4 | Liquidity and Leverage | done | todo | 13 | - | |
| 65 | 4 | Early Warning Indicators | done | todo | 13 | - | |
| 66 | 4 | The Investment Function in Financial-Services Management | done | todo | 14 | - | |
| 67 | 4 | Liquidity and Reserves Management: Strategies and Policies | done | todo | 14 | - | |
| 68 | 4 | Intraday Liquidity Risk Management | done | todo | 14 | - | |
| 69 | 4 | Monitoring Liquidity | done | todo | 14 | - | |
| 70 | 4 | The Failure Mechanics of Dealer Banks | done | todo | 14 | - | |
| 71 | 4 | Liquidity Stress Testing | done | todo | 15 | - | |
| 72 | 4 | Liquidity Risk Reporting and Stress Testing | done | todo | 15 | - | |
| 73 | 4 | Contingency Funding Planning | done | todo | 15 | - | |
| 74 | 4 | Managing and Pricing Deposit Services | done | todo | 15 | - | |
| 75 | 4 | Managing Nondeposit Liabilities | done | todo | 15 | - | |
| 76 | 4 | Repurchase Agreements and Financing | done | todo | 16 | - | |
| 77 | 4 | Liquidity Transfer Pricing: A Guide to Better Practice | done | todo | 16 | - | |
| 78 | 4 | Covered Interest Parity Lost | done | todo | 16 | - | |
| 79 | 4 | Risk Management for Changing Interest Rates: ALM & Duration | done | todo | 16 | - | |
| 80 | 4 | Illiquid Assets | done | todo | 16 | - | |
| 81 | 5 | Factor Theory | done | todo | 17 | - | |
| 82 | 5 | Factors | done | todo | 17 | - | |
| 83 | 5 | Alpha (and the Low-Risk Anomaly) | done | todo | 17 | - | |
| 84 | 5 | Portfolio Construction | done | todo | 17 | - | |
| 85 | 5 | Portfolio Risk: Analytical Methods | done | todo | 17 | - | |
| 86 | 5 | VaR and Risk Budgeting in Investment Management | done | todo | 18 | - | |
| 87 | 5 | Risk Monitoring and Performance Measurement | done | todo | 18 | - | |
| 88 | 5 | Portfolio Performance Evaluation | done | todo | 18 | - | |
| 89 | 5 | Hedge Funds | done | todo | 18 | - | |
| 90 | 5 | Performing Due Diligence on Specific Managers and Funds | done | todo | 18 | - | |
| 91 | 5 | Predicting Fraud by Investment Managers | done | todo | 19 | - | |
| 92 | 5 | Review of the Federal Reserve's Supervision of Silicon Valley Bank | done | todo | 19 | - | |
| 93 | 5 | The Credit Suisse CoCo Wipeout | done | todo | 19 | - | |
| 94 | 5 | Artificial Intelligence and Bank Supervision | done | todo | 19 | - | |
| 95 | 5 | Explainable, Trustworthy, Responsible AI in Risk Management | done | todo | 19 | - | |
| 96 | 5 | Artificial Intelligence Risk Management Framework | done | todo | 20 | - | |
| 97 | 5 | Climate-Related Risk Drivers and Transmission Channels | done | todo | 20 | - | |
| 98 | 5 | Climate-Related Financial Risks: Measurement Methodologies | done | todo | 20 | - | |
| 99 | 5 | Principles for the Effective Management and Supervision of Climate-Related Financial Risks | done | todo | 20 | - | |
| 100 | 5 | The Crypto Ecosystem: Key Elements and Risks | done | todo | 20 | - | |
| 101 | 5 | Digital Resilience and Financial Stability | done | todo | 20 | - | |
