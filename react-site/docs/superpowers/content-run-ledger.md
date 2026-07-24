# content-run-ledger.md — the resume state

**This file is the position of the run.** A session that has just been cleared reads
this file, finds its place, and continues. Procedure lives in
`content-run-protocol.md`; durable style learnings live in `content-guidelines.md`.

## ACTIVE PHASE

    phase-3-hover-linking

Phase order (owner directive, 2026-07-25: content comes LAST, UI/functionality first):

1. `phase-3-hover-linking` .......... ACTIVE. Inline hover-snippet core-concept links.
2. `ui-sweep` ....................... Polish/bug pass over built surfaces (planner,
                                      block review, case study, consistency). Not
                                      per-reading, so it has no rows here; record it
                                      in PROGRESS.md and flip the phase when done.
3. `content-sonnet-clearance` ....... The important run. Waves of 5 + Opus-A gate.
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
| 1 | 1 | Estimating Market Risk Measures | done | todo | 1 | - | |
| 2 | 1 | Non-Parametric Approaches | done | todo | 1 | - | |
| 3 | 1 | Parametric Approaches (II): Extreme Value Theory | done | todo | 1 | - | |
| 4 | 1 | Backtesting VaR | done | todo | 1 | - | |
| 5 | 1 | VaR Mapping | done | todo | 1 | - | |
| 6 | 1 | Messages From the Academic Literature | done | todo | 2 | - | |
| 7 | 1 | Correlation Basics | done | todo | 2 | - | |
| 8 | 1 | Empirical Properties of Correlation | done | todo | 2 | - | |
| 9 | 1 | Financial Correlation Modeling: Copulas | done | todo | 2 | - | |
| 10 | 1 | Empirical Approaches to Risk Metrics and Hedging | done | todo | 2 | - | |
| 11 | 1 | The Science of Term Structure Models | done | todo | 3 | - | |
| 12 | 1 | Evolution of Short Rates and Shape of the Term Structure | done | todo | 3 | - | |
| 13 | 1 | The Art of Term Structure Models: Drift | done | todo | 3 | - | |
| 14 | 1 | The Art of Term Structure Models: Volatility and Distribution | done | todo | 3 | - | |
| 15 | 1 | Volatility Smiles | done | todo | 3 | - | |
| 16 | 1 | Fundamental Review of the Trading Book (FRTB) | done | todo | 4 | - | |
| 17 | 2 | Fundamentals of Credit Risk | done | todo | 4 | - | |
| 18 | 2 | Governance | done | todo | 4 | - | |
| 19 | 2 | Credit Risk Management | done | todo | 4 | - | |
| 20 | 2 | Capital Structure in Banks | done | todo | 4 | - | |
| 21 | 2 | Introduction to Credit Risk Modeling and Assessment | done | todo | 5 | - | |
| 22 | 2 | Credit Scoring and Rating | done | todo | 5 | - | |
| 23 | 2 | Credit Scoring and Retail Credit Risk Management | done | todo | 5 | - | |
| 24 | 2 | Country Risk: Determinants, Measures, and Implications | done | todo | 5 | - | |
| 25 | 2 | Estimating Default Probabilities | done | todo | 5 | - | |
| 26 | 2 | Credit Value at Risk | done | todo | 6 | - | |
| 27 | 2 | Portfolio Credit Risk | done | todo | 6 | - | |
| 28 | 2 | Structured Credit Risk | done | todo | 6 | - | |
| 29 | 2 | Credit Risk (Spread Risk & Default Intensity) | done | todo | 6 | - | |
| 30 | 2 | Credit Derivatives | done | todo | 6 | - | |
| 31 | 2 | Derivatives (Counterparty Risk Intro) | done | todo | 7 | - | |
| 32 | 2 | Counterparty Risk and Beyond | done | todo | 7 | - | |
| 33 | 2 | Netting, Close-Out, and Related Aspects | done | todo | 7 | - | |
| 34 | 2 | Margin (Collateral) and Settlement | done | todo | 7 | - | |
| 35 | 2 | Central Clearing | done | todo | 7 | - | |
| 36 | 2 | Future Value and Exposure | done | todo | 8 | - | |
| 37 | 2 | CVA | done | todo | 8 | - | |
| 38 | 2 | The Evolution of Stress Testing Counterparty Exposures | done | todo | 8 | - | |
| 39 | 2 | An Introduction to Securitization | done | todo | 8 | - | |
| 40 | 3 | Introduction to Operational Risk and Resilience | done | todo | 8 | - | |
| 41 | 3 | Risk Governance | todo | todo | - | - | |
| 42 | 3 | Risk Identification | todo | todo | - | - | |
| 43 | 3 | Risk Measurement and Assessment | todo | todo | - | - | |
| 44 | 3 | Risk Mitigation | todo | todo | - | - | |
| 45 | 3 | Risk Reporting | todo | todo | - | - | |
| 46 | 3 | Integrated Risk Management | todo | todo | - | - | |
| 47 | 3 | Cyber-Resilience: Range of Practices | todo | todo | - | - | |
| 48 | 3 | Case Study: Cyberthreats and Information Security Risks | todo | todo | - | - | |
| 49 | 3 | Case Study: Financial Crime and Fraud | todo | todo | - | - | |
| 50 | 3 | Guidance on Managing Outsourcing Risk | todo | todo | - | - | |
| 51 | 3 | Case Study: Third-Party Risk Management | todo | todo | - | - | |
| 52 | 3 | Case Study: Investor Protection and Compliance Risks | todo | todo | - | - | |
| 53 | 3 | Supervisory Guidance on Model Risk Management | todo | todo | - | - | |
| 54 | 3 | Case Study: Model Risk and Model Validation | todo | todo | - | - | |
| 55 | 3 | Stress Testing Banks | todo | todo | - | - | |
| 56 | 3 | Risk Capital Attribution and RAPM | todo | todo | - | - | |
| 57 | 3 | Range of Practices in Economic Capital Frameworks | todo | todo | - | - | |
| 58 | 3 | Capital Planning at Large Bank Holding Companies | todo | todo | - | - | |
| 59 | 3 | Capital Regulation Before the Global Financial Crisis | todo | todo | - | - | |
| 60 | 3 | Solvency, Liquidity, and Other Regulation After the GFC | todo | todo | - | - | |
| 61 | 3 | High-Level Summary of Basel III Reforms | todo | todo | - | - | |
| 62 | 3 | Basel III: Finalizing Post-Crisis Reforms | todo | todo | - | - | |
| 63 | 4 | Liquidity Risk | todo | todo | - | - | |
| 64 | 4 | Liquidity and Leverage | todo | todo | - | - | |
| 65 | 4 | Early Warning Indicators | todo | todo | - | - | |
| 66 | 4 | The Investment Function in Financial-Services Management | todo | todo | - | - | |
| 67 | 4 | Liquidity and Reserves Management: Strategies and Policies | todo | todo | - | - | |
| 68 | 4 | Intraday Liquidity Risk Management | todo | todo | - | - | |
| 69 | 4 | Monitoring Liquidity | todo | todo | - | - | |
| 70 | 4 | The Failure Mechanics of Dealer Banks | todo | todo | - | - | |
| 71 | 4 | Liquidity Stress Testing | todo | todo | - | - | |
| 72 | 4 | Liquidity Risk Reporting and Stress Testing | todo | todo | - | - | |
| 73 | 4 | Contingency Funding Planning | todo | todo | - | - | |
| 74 | 4 | Managing and Pricing Deposit Services | todo | todo | - | - | |
| 75 | 4 | Managing Nondeposit Liabilities | todo | todo | - | - | |
| 76 | 4 | Repurchase Agreements and Financing | todo | todo | - | - | |
| 77 | 4 | Liquidity Transfer Pricing: A Guide to Better Practice | todo | todo | - | - | |
| 78 | 4 | Covered Interest Parity Lost | todo | todo | - | - | |
| 79 | 4 | Risk Management for Changing Interest Rates: ALM & Duration | todo | todo | - | - | |
| 80 | 4 | Illiquid Assets | todo | todo | - | - | |
| 81 | 5 | Factor Theory | todo | todo | - | - | |
| 82 | 5 | Factors | todo | todo | - | - | |
| 83 | 5 | Alpha (and the Low-Risk Anomaly) | todo | todo | - | - | |
| 84 | 5 | Portfolio Construction | todo | todo | - | - | |
| 85 | 5 | Portfolio Risk: Analytical Methods | todo | todo | - | - | |
| 86 | 5 | VaR and Risk Budgeting in Investment Management | todo | todo | - | - | |
| 87 | 5 | Risk Monitoring and Performance Measurement | todo | todo | - | - | |
| 88 | 5 | Portfolio Performance Evaluation | todo | todo | - | - | |
| 89 | 5 | Hedge Funds | todo | todo | - | - | |
| 90 | 5 | Performing Due Diligence on Specific Managers and Funds | todo | todo | - | - | |
| 91 | 5 | Predicting Fraud by Investment Managers | todo | todo | - | - | |
| 92 | 5 | Review of the Federal Reserve's Supervision of Silicon Valley Bank | todo | todo | - | - | |
| 93 | 5 | The Credit Suisse CoCo Wipeout | todo | todo | - | - | |
| 94 | 5 | Artificial Intelligence and Bank Supervision | todo | todo | - | - | |
| 95 | 5 | Explainable, Trustworthy, Responsible AI in Risk Management | todo | todo | - | - | |
| 96 | 5 | Artificial Intelligence Risk Management Framework | todo | todo | - | - | |
| 97 | 5 | Climate-Related Risk Drivers and Transmission Channels | todo | todo | - | - | |
| 98 | 5 | Climate-Related Financial Risks: Measurement Methodologies | todo | todo | - | - | |
| 99 | 5 | Principles for the Effective Management and Supervision of Climate-Related Financial Risks | todo | todo | - | - | |
| 100 | 5 | The Crypto Ecosystem: Key Elements and Risks | todo | todo | - | - | |
| 101 | 5 | Digital Resilience and Financial Stability | todo | todo | - | - | |
