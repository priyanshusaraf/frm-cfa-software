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

## OPEN: the coverage back-audit (owner directive, 2026-07-26)

R35 was found to have passed its wave-7 gate while omitting the margin period of
risk entirely. The cause was structural: no step in the run ever compared a
reading against its source for MISSING material. `scripts/coverage-audit.mjs`
now closes that hole going forward (protocol section 2a-0), but it also means
**every reading cleared before wave 14 was cleared without a coverage check.**

Current state: `docs/superpowers/coverage-report.json` holds a full run.
551 candidate gaps across 100 readings, 368 of them in the 65 readings already
marked `content: done`. The false-positive rate is high by design, so these are
candidates, not confirmed holes; each needs a human or Opus judgment.

Worst first: r99, r31, r64, r68, r23, r24, r72, r27, r59, r37, r57, r39.

**Amended 2026-07-26 (wave 14): that report was partly bogus.** `coverage-audit.mjs`
scored a candidate section by overlap normalized by the SHORTER title, which
saturates at 1 for any source title whose words are a subset of the reading's, and
the earliest such section won the tie. Five readings were audited against the wrong
chapter: r3 (against NON-PARAMETRIC APPROACHES), r23 (against CREDIT RISK
MANAGEMENT), r31 (against CREDIT DERIVATIVES), r68 (against LIQUIDITY RISK) and r72
(against LIQUIDITY RISK). r68's seventeen "gaps" were entirely phantom; it has none.
Fixed in commit dd4e559 and `coverage-report.json` regenerated, so the worst-first
list above is stale for r31, r23, r68 and r72 specifically. **Anyone resuming the
back-audit must re-read the report, not this paragraph's ordering.**

**CORRECTED 2026-07-26 (wave 19): r6's section is NOT absent.** The claim above was
an artifact of the same class of audit bug. Three sections in the source title
themselves with a bare `**TITLE**` line carrying no `#` heading marks, and the
section extractor required the marks, so it dropped them: r6's "Messages From the
Academic Literature", r92's SVB review, and r99's climate-principles reading. r6 and
r92 fell through to no match and a wrong match respectively, and **r99, listed as the
single worst reading in the back-audit above, was audited against the WRONG chapter
entirely.** All three now audit correctly (r6: 2 candidates, r92: 2, r99: 4, against
the 40-plus r99 previously reported). Fixed in the same commit as this note.

This back-audit is NOT yet scheduled into a phase. Decide with the owner whether
it runs as its own sweep before the remaining clearance waves or alongside them.

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
| 61 | 3 | High-Level Summary of Basel III Reforms | done | done | 13 | pass | Dash purge only; the Basel III reform-shape facts were already correct. Removed a 'GARP tests this reading' meta-reference. |
| 62 | 3 | Basel III: Finalizing Post-Crisis Reforms | done | done | 13 | pass | Dash purge; the marginal BIC arithmetic (12% on first EUR1bn + 15% above = EUR1.92bn) reproduced and correct. |
| 63 | 4 | Liquidity Risk | done | done | 13 | pass | Six-sources def trimmed, full enumeration verified intact in breakdown. Deposit instability now carries its mechanism, closing this reading's own reference defect. |
| 64 | 4 | Liquidity and Leverage | done | done | 13 | pass | Dash purge; leverage arithmetic (150/100=1.5, 200/100=2.0, Reg T 1/h=2.0) all reproduced. Fixed a quiz why that named distractors by position under shuffling. |
| 65 | 4 | Early Warning Indicators | done | done | 13 | pass | Clean dash purge; no numeric or directional token changed anywhere in the file. |
| 66 | 4 | The Investment Function in Financial-Services Management | done | done | 14 | pass | Coverage flags all false positives. Meta-references purged (source nicknames, 'the site moves on'); an unsourced '270 days by statute' fact removed. |
| 67 | 4 | Liquidity and Reserves Management: Strategies and Policies | done | done | 14 | pass | Rewrote the exam paragraph, which carried both a GARP meta-reference and a 'matching-style' question shape that does not exist. |
| 68 | 4 | Intraday Liquidity Risk Management | done | done | 14 | pass | Two enumerated defs trimmed (288 and 322 words); the paired-dash rule ate a paren in the governance breakdown, rewritten by hand. |
| 69 | 4 | Monitoring Liquidity | done | done | 14 | pass | Clean apart from dashes and one highYield why that cited its own flagging. |
| 70 | 4 | The Failure Mechanics of Dealer Banks | done | done | 14 | pass | Lightest file of the wave: one dash, plus two 'the reading states' meta-references. |
| 71 | 4 | Liquidity Stress Testing | done | done | 15 | pass | Coverage flag a false positive. Rewrote the two-registers exam paragraph and a teaches sentence the dash pass had broken. |
| 72 | 4 | Liquidity Risk Reporting and Stress Testing | done | done | 15 | pass | Rewrote the exam paragraph, which called the named-reports list a 'matching exercise' (rule 9). Three highYield whys de-metered. |
| 73 | 4 | Contingency Funding Planning | done | done | 15 | pass | Cleanest of the wave: dashes plus two 'the source says' meta-references in quiz stems. |
| 74 | 4 | Managing and Pricing Deposit Services | done | done | 15 | pass | REAL COVERAGE GAP FILLED: the four CD innovations (bump-up, step-up, liquid, index), relationship pricing, and implicit interest were all absent though the source bolds them and module-quizzes two. |
| 75 | 4 | Managing Nondeposit Liabilities | done | done | 15 | pass | Dash purge and one 'frequently tested' why; the funding-source cost and risk material was already fully covered. |
| 76 | 4 | Repurchase Agreements and Financing | done | done | 16 | pass | Open repos added: a bolded source term the reading omitted while covering overnight and term repo. GARP meta-reference removed. |
| 77 | 4 | Liquidity Transfer Pricing: A Guide to Better Practice | done | done | 16 | pass | Coverage flags all false positives (LTP challenges and the bullet-loan worked example are both taught). Two exam-voice whys de-metered. |
| 78 | 4 | Covered Interest Parity Lost | done | done | 16 | pass | Heaviest second-pass file: its (1)(2) prose blocks were skipped by the paired rule and needed the no-paren pass. |
| 79 | 4 | Risk Management for Changing Interest Rates: ALM & Duration | done | done | 16 | pass | Enumerated-prose tell in the two-kinds-of-rate-risk passage rewritten; four highYield whys asserted their own examinability. |
| 80 | 4 | Illiquid Assets | done | done | 16 | pass | Coverage flags all false positives: the per-market illiquidity detail (7%/22% bond yield variation, on/off-the-run) is present under different headings. |
| 81 | 5 | Factor Theory | done | done | 17 | pass | Five 'lesson N' coverage flags all false positives (each lesson is taught). A 'Six lessons follow' structure-announcement tell removed. |
| 82 | 5 | Factors | done | done | 17 | pass | REAL GAP FILLED: the other macroeconomic factors (productivity shocks with the DSGE/Smets-Wouters seven, demographic risk via OLG models, political/sovereign risk) were absent. |
| 83 | 5 | Alpha (and the Low-Risk Anomaly) | done | done | 17 | pass | Lightest of the wave. Momentum and value/growth flags both false positives. |
| 84 | 5 | Portfolio Construction | done | done | 17 | pass | Both WEAK LO flags false positives (alpha refining and dispersion are each taught at length). Three exam-voice whys de-metered. |
| 85 | 5 | Portfolio Risk: Analytical Methods | done | done | 17 | pass | All flags are the audit matching worked-example headings ('computing component VaR (example 1)'), which the reading reproduces in its formulas. |
| 86 | 5 | VaR and Risk Budgeting in Investment Management | done | done | 18 | pass | REAL GAP FILLED: the global custodian question (visibility against control) was absent. New breakdown block. |
| 87 | 5 | Risk Monitoring and Performance Measurement | done | done | 18 | pass | Cleanest of the wave: dashes plus one 'according to the reading' quiz stem. |
| 88 | 5 | Portfolio Performance Evaluation | done | done | 18 | pass | REAL GAP FILLED: universe comparison (rank within style bucket, and why it fails) added; appraisal ratio now named as the information ratio's synonym, per the one-name rule. |
| 89 | 5 | Hedge Funds | done | done | 18 | pass | 203-word strategy-roster def trimmed; the breakdown already carried all ten strategies. |
| 90 | 5 | Performing Due Diligence on Specific Managers and Funds | done | done | 18 | pass | Heaviest separator repair of the run (31); the GARP exam-voice opener rewritten. |
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
