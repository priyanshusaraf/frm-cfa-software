# CFA Level II FSA: curriculum reconciliation

Status: **NOT YET RECONCILIED AGAINST THE OWNER'S BOOKS.** Written 2026-10-08.

## Why this file exists

The owner asked for the FSA platform to follow the 2026 CFA Level II curriculum, to flag
anything missing, and NOT to add material just because a prep book prints it. The owner's
CFA books live in a local Downloads folder. The cloud session that built the platform could
not reach them, so this file records what was used instead and what still has to be checked.

## What the scope is based on

1. **Module list (high confidence).** The 2026 Level II Financial Statement Analysis topic
   is Topic 3, weighted 10-15%, with six learning modules: LM10 Intercorporate Investments,
   LM11 Employee Compensation: Post-Employment and Share-Based, LM12 Multinational
   Operations, LM13 Analysis of Financial Institutions, LM14 Evaluating Quality of
   Financial Reports, LM15 Integration of Financial Statement Analysis Techniques.
   Sources: AnalystNotes 2026 Level II topic page; 300hours 2026 study order and curriculum
   changes (no FSA changes for 2026); UWorld 2026 topic overview (it states a different
   module count; not confirmed by the others).
2. **LOS wording (medium confidence).** Reconstructed from AnalystNotes' per-module pages,
   whose LOS are shifted by a few statements per page (the last LOS of one module appears
   on the next module's page). Joined back together, they match the long-standing Level II
   wording. The text lives in `react-site/src/cfa/fsa/content/curriculum.js`.
3. **LOS letters (low confidence).** The letters a, b, c... are this platform's ordering.
   CFA Institute's lettering may differ, especially in LM12 (whether "presentation,
   functional and local currency" comes first).

## Deliberately out of scope

Leases, income taxes, inventories and long-lived assets as standalone topics are Level I
FSA in recent curricula. They appear only where a Level II LOS uses them (for example the
LIFO and lease adjustments inside LM15's comparability work). If the owner's prep book
prints them as Level II chapters, that is a book-versus-curriculum mismatch to flag, not
content to build.

## Reconciliation checklist (run when the books are committed)

Commit the books (PDF or Markdown) under `cfa-l2/` at the repository root, then for each
module:

1. Compare every LOS sentence and letter with `curriculum.js`; fix wording and letters.
2. Walk the book's section headings; anything a heading covers that no platform section
   teaches is a GAP (add it); anything the platform teaches that the book does not is
   either labelled `beyond` already or must be removed.
3. Resolve every entry in the module's `flags` array (shown on the module page and on
   `/cfa/fsa/coverage`), then delete the flag.
4. Check every IFRS vs US GAAP row against the book's comparison exhibits.
5. Spot-check two worked examples per module against the book's example format, so exam
   arithmetic conventions (signs, rounding, which rate is "average") match.

## Open flags, all modules (46, generated from each module's `flags` array)

Each item must be checked against the owner's edition of the curriculum, then fixed and removed from the module file.

### LM10 Intercorporate Investments (3 flags)
- (LOS 10a) Equity-method impairment reversal: curriculum wording may say neither standard permits reversal; IAS 28 permits it. Verify against the owner's book.
- (LOS 10b) US GAAP goodwill impairment: the curriculum's two-step test vs ASU 2017-04 one-step. Verify which version the 2026 book uses.
- (LOS 10a) Contingent liabilities in a business combination: exact IFRS vs US GAAP recognition wording not yet included; add once checked against the book.

### LM11 Employee Compensation: Post-Employment and Share-Based (8 flags)
- (LOS 11b) ABO and VBO: included as US GAAP measures for completeness. Verify how much the 2026 reading says about them; it may mention them only in passing.
- (LOS 11c) IFRS net interest is computed here on the beginning net liability. IAS 19 strictly adjusts for contributions and benefit payments during the period; the curriculum simplification is assumed. Verify the book's wording.
- (LOS 11c) US GAAP presentation (ASU 2017-07: non-service components outside operating income) is labelled beyond the curriculum. Check whether the 2026 reading mentions it.
- (LOS 11d) Effect of a higher discount rate on interest cost is presented as ambiguous (usually higher for typical durations). Confirm the book's exact wording, which may say interest cost 'typically' falls or rises depending on plan maturity.
- (LOS 11e) Income statement adjustment uses the ACTUAL return as non-operating income. Some curriculum exhibits use the expected return in this reclassification; verify which the 2026 book uses in its worked example.
- (LOS 11e) Cash flow reclassification is shown after tax in prose and formulas but pre-tax in the scenario ledger for clarity; the scenario says so explicitly.
- (LOS 11a) Multi-employer plans treated as DC when information is insufficient: confirm the curriculum still includes this point.
- (LOS 11h) Phantom shares and the detail that cumulative cash-settled expense equals the cash paid: confirm the depth the 2026 reading gives to SARs and phantom shares.

### LM12 Multinational Operations (10 flags)
- (LOS 12c) Functional currency indicators: the IAS 21 primary/secondary ranking and the ASC 830 indicator list were written from the standards. Check the exact wording and grouping the 2026 curriculum uses.
- (LOS 12a) The statement that neither IFRS nor US GAAP prescribes the income statement line for transaction gains and losses, and the disclosure wording, should be checked against the curriculum text.
- (LOS 12d) The 'balance sheet hedge' paragraph (matching monetary assets and liabilities under the temporal method) is mechanism; confirm the curriculum uses this term before relying on it for an exam answer.
- (LOS 12d) Translation terminology: US GAAP 'translation' vs 'remeasurement'. IFRS frames both as translation (into the functional currency, then into the presentation currency). Confirm the curriculum's phrasing.
- (LOS 12g) US GAAP highly inflationary threshold stated as cumulative three-year inflation of about 100% or more. Confirm the curriculum's exact wording (some texts say 'exceeding 100%').
- (LOS 12g) HyperinflationLab and the Kestrel Sur numbers assume the price index and exchange rate move evenly through the year (averages are midpoints). The IAS 21 translation difference on the restated opening net investment at the parent level is not modeled; the comparison is at the level of the subsidiary's translated statements, as curriculum examples present it.
- (LOS 12b) The Kestrel example of sales invoiced in the parent's currency (euro sales fall while translated sales rise less than the euro) is derived from the mechanics; confirm the curriculum's own framing of LOS b.
- (LOS 12i) Sustainability ranking of price vs volume growth: the module treats volume as most durable and price as dependent on pricing power. Confirm the curriculum's emphasis.
- (LOS 12h) Transfer pricing is mentioned as a driver of the earnings mix. Confirm it appears in the 2026 curriculum's discussion of the effective tax rate.
- (LOS 12e) Scenario lm12-cta-vs-remeasurement hides the cash flow statement: a translated cash flow statement needs an 'effect of exchange rate changes on cash' line outside operating, investing and financing, which the ledger engine does not model. Income statement items are translated at the average rate as an approximation of transaction-date rates.

### LM13 Analysis of Financial Institutions (8 flags)
- (LOS 13b) Capital buffers (2.5% conservation, countercyclical up to 2.5%, G-SIB surcharge) and the 3% leverage ratio: confirm how much the 2026 reading states as testable figures. The 4.5% / 6% / 8% minimums are taught as core.
- (LOS 13b) Examples of national regulators and the role descriptions of IADI, IAIS and IOSCO are paraphrased; check the exact list and wording of the international bodies in the official reading.
- (LOS 13c) IFRS 9 staging vs US GAAP CECL: confirm the reading covers both expected credit loss models and at what depth.
- (LOS 13c) Liquidity: the five Basel III monitoring metrics are as remembered from the curriculum; ASF and RSF weights and LCR run-off rates used in examples are simplified illustrations, not Basel factors.
- (LOS 13c) Risk weights in the Harbor and Cedar examples are illustrative, not quoted from Basel III. The US CAMELS 1 to 5 supervisory rating is mentioned as context; verify it is in the reading.
- (LOS 13c) Recoveries: the US practice (credited to the allowance) is shown in the scenario; IFRS presentation in profit is described as common practice. Verify against the reading if tested.
- (LOS 13f) Investment yield vs total investment return: exact names and whether averages or ending invested assets are used should be checked against the reading. The dividends to policyholders ratio is shown over net premiums earned.
- (LOS 13f) Insurer capital: NAIC risk-based capital (US) and Solvency II (EU) are described generally; IFRS 17 and US GAAP long-duration insurance accounting are deliberately left out pending confirmation they are in the 2026 scope.

### LM14 Evaluating Quality of Financial Reports (10 flags)
- (LOS 14a) Quality spectrum: the order and labels of the two middle levels (biased accounting choices, then within-GAAP earnings management) were reconstructed. Verify against the 2026 exhibit.
- (LOS 14c) Beneish accruals coefficient: Beneish (1999) reports 4.679; some curriculum editions print 4.670. The difference is immaterial for item sets but verify which value the 2026 book uses.
- (LOS 14c) Beneish AQI: Beneish's original definition uses (current assets + net PP&E) / total assets; the curriculum version may also include securities, as used here. Verify.
- (LOS 14c) M-score cutoff: -1.78 is used as instructed. Confirm the 2026 book uses -1.78 (rather than the later -2.22) and whether it quotes the 3.8% probability.
- (LOS 14c) Altman Z-score zones (1.81 and 2.99) are presented in a beyond-the-curriculum callout and in the lab as commonly cited original thresholds. Verify whether the 2026 book states any cutoffs.
- (LOS 14b) Non-GAAP measures: wording of SEC requirements (reconciliation, equal or greater prominence) and of IFRS additional subtotals is from general knowledge; confirm the curriculum treats presentation choices under this LOS.
- (LOS 14h) Real-company cases (Sunbeam, WorldCom, MicroStrategy) are summarized from widely documented public history without specific amounts. The curriculum's own cases may differ; check names and details.
- (LOS 14i) Tax benefits of employee stock options: the curriculum's treatment may reflect the pre-2016 US GAAP classification (excess tax benefits in financing). Content describes the sustainability issue only; verify the classification wording.
- (LOS 14j) IFRS 18 (effective 2027) is mentioned in a beyond callout only; the 2026 exam uses the current IAS 7 classification choices.
- (LOS 14m) Audit references (ISA 701 key audit matters, PCAOB AS 3101 critical audit matters, opinion types, internal control reporting) are standard but should be checked against the curriculum's wording for this LOS.

### LM15 Integration of Financial Statement Analysis Techniques (7 flags)
- (LOS 15a) The curriculum teaches this module through an extended case of a real multinational. This module uses a fictional company (Pinnacle Corp) built to reproduce the same analytical sequence; verify the 2026 case company and its exhibits against the official book.
- (LOS 15e) Removing the investment in associates from EQUITY as well as from assets (equity-financing assumption) is a modelling choice made here; verify whether the 2026 case exhibit adjusts equity or only assets and net income.
- (LOS 15e) Where equity income is presented (above pretax income, or after tax) changes which DuPont factors it distorts. Pinnacle presents it above pretax income; the classic case company presented it after tax. Check the 2026 exhibit.
- (LOS 15c) Section heading 'Off-Balance Sheet Leverage from Operating Leases' is reported for 2026. Verify whether the worked example capitalizes pre-2019 operating leases or uses IFRS 16 / ASC 842 disclosures, and whether purchase commitments are treated as debt in the book.
- (LOS 15d) IFRS 18 (effective 2027) is used only in a 'beyond' callout as a real example of a standard issued but not yet effective. It is not 2026 curriculum content.
- (LOS 15c) The tax effect of a LIFO to FIFO restatement is recorded as a deferred tax liability in the scenario and item set; the curriculum also allows taxes payable. Confirm which the 2026 book uses in its integration exhibits.
- (LOS 15a) The accruals ratio adjustment for undistributed equity income (CFO / (NI - equity income + dividends received)) is an analytical extension built for this case; check that the 2026 case computes accruals the same way.
