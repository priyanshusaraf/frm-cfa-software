# CFA Level II FSA: curriculum reconciliation

Status: **LOS VERIFIED against the official 2026 outline; content NOT yet checked line by line against the owner's books.** Updated 2026-10-08.

## Why this file exists

The owner asked for the FSA platform to follow the 2026 CFA Level II curriculum, to flag
anything missing, and NOT to add material just because a prep book prints it. The owner's
CFA books live in a local Downloads folder. The cloud session that built the platform could
not reach them, so this file records what was used instead and what still has to be checked.

## What the scope is based on

1. **LOS (verified, 2026-10-08).** Every LOS and its letter in
   `react-site/src/cfa/fsa/content/curriculum.js` now matches CFA Institute's official
   "2026 Level II Topic Outlines" PDF (cfainstitute.org, `2026-l2-topics-combined.pdf`).
   The PDF is marked "for candidate use only", so it is NOT committed; only the LOS
   sentences are used.
2. **What the official LOS check changed.**
   - LM12, LM13, LM14: same LOS, different letter order. Letters were remapped in the
     content.
   - LM10: LOS b wording is "compare and contrast IFRS and US GAAP"; updated.
   - **LM11 was rewritten by CFA Institute.** The older 8-LOS reading (calculate the PBO,
     adjust ratios for pension items, interpret note disclosures) was replaced by 5 LOS:
     contrast types of employee compensation; how share-based compensation affects the
     statements; FORECAST share-based compensation expense and shares outstanding in a
     model and use them in valuation; how post-employment benefits affect the statements;
     MODELING AND VALUATION considerations for post-employment benefits. The module was
     rebuilt to the new LOS (new sections on compensation types, share-based pay taxes,
     forecasting and valuation, and pension modeling/valuation); older-curriculum depth
     (projected unit credit arithmetic, corridor, ratio reclassifications) is kept but labelled.
3. **Content checks against public CFA Institute 2026 reading summaries** (refresher
   reading pages): LM10 (US GAAP goodwill test is two-step in the curriculum), LM11 (scope
   and key points), LM12 (transaction gain/loss presentation, remeasurement terminology,
   CTA reclassified on disposal, sustainability of volume/price growth), LM14 (the seven
   evaluation steps), LM15 (Nestle case). No public summary was found for LM13.
4. **Independent accuracy review.** Each of LM11 to LM15 was re-audited by a separate
   reviewer who recomputed every number; 42 defects were fixed (see git history,
   commit "independent accuracy review").

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

## Open flags, all modules (51, generated from each module's `flags` array)

Each item must be checked against the owner's edition of the curriculum, then fixed and removed from the module file. Flags closed so far by public CFA Institute sources are recorded in git history.

### LM10 Intercorporate Investments (2 flags)
- (LOS 10a) Equity-method impairment reversal: curriculum wording may say neither standard permits reversal; IAS 28 permits it. Verify against the owner's book.
- (LOS 10a) Contingent liabilities in a business combination: exact IFRS vs US GAAP recognition wording not yet included; add once checked against the book.

### LM11 Employee Compensation: Post-Employment and Share-Based (17 flags)
- (LOS 11a) LOS replaced 2026-10-08 with the official 2026 topic outline (five LOS). Section content for LOS a and c to e was rebuilt from the CFA Institute 2026 refresher summary and third-party notes, not from the reading itself; verify against the book when it is in the repo.
- (LOS 11a) Compensation design objectives (liquidity, retention, motivation) and the four components follow the 2026 summary. Check whether the reading uses the label 'short-term incentives' for bonuses and 'long-term incentives' for share-based pay exactly as written here.
- (LOS 11b) Windfall scenario simplification: the deferred tax asset is built on the cumulative expense in both columns. IAS 12 strictly measures it on the estimated future deduction (current share price), with the excess over expense taken to equity as it arises. Verify how far the 2026 reading goes.
- (LOS 11b) Shortfall (deduction below cumulative expense) is stated to raise tax expense under both standards. Confirm the reading mentions shortfalls at all.
- (LOS 11b) Phantom shares and the detail that cumulative cash-settled expense equals the cash paid: confirm the depth the 2026 reading gives to SARs and phantom shares.
- (LOS 11c) Treasury stock method for RSUs: assumed proceeds = average unrecognized compensation cost, repurchased at the average share price (from third-party notes on the 2026 reading). Confirm the exact construction and whether period averages are used.
- (LOS 11c) Valuation Treatment 2 share count (all unvested awards in full plus future-award shares = (PV of future SBC - unrecognized cost) / current price) is our construction to show the two treatments agree. The reading may only say 'increase the share count for vested and unvested awards'. Verify the wording.
- (LOS 11c) Unrecognized cost roll-forward removes half the grant value of forfeited units (forfeited mid-vesting) in the demo and in SbcForecastLab. This is a modeling simplification, not a curriculum rule.
- (LOS 11d) ABO and VBO: included as US GAAP measures for completeness. Under the 2026 LOS they are likely mentioned only in passing, if at all.
- (LOS 11d) IFRS net interest is computed here on the beginning net liability. IAS 19 strictly adjusts for contributions and benefit payments during the period; the curriculum simplification is assumed.
- (LOS 11d) US GAAP presentation (ASU 2017-07: non-service components outside operating income) is labelled beyond the curriculum. Check whether the 2026 reading mentions it.
- (LOS 11d) Effect of a higher discount rate on interest cost is presented as ambiguous (usually higher for typical durations). Confirm the book's exact wording.
- (LOS 11d) Multi-employer plans treated as DC when information is insufficient: confirm the 2026 reading still includes this point.
- (LOS 11d) Projected unit credit arithmetic and corridor amortization were core under the older LOS set and are kept with depth notes; the 2026 LOS d is qualitative ('explain how ... affect the financial statements').
- (LOS 11e) After-tax deficit in the enterprise value bridge: the 2026 summary says to consider the tax deductibility of contributions. Whether the reading deducts the deficit after tax by default is unconfirmed; both versions are shown.
- (LOS 11e) Deficit-repair contributions are described as not deducted from free cash flow (to avoid double counting with the bridge) and remeasurements as forecast at zero. Both follow from the reading's logic but the wording is unconfirmed.
- (LOS 11e) The ratio and cash flow reclassification section (old LOS e/f) is kept as an older lens. Its actual-versus-expected-return choice and the pre-tax ledger simplification were flagged before and still apply.

### LM12 Multinational Operations (7 flags)
- (LOS 12a) Functional currency indicators: the IAS 21 primary/secondary ranking and the ASC 830 indicator list were written from the standards. Check the exact wording and grouping the 2026 curriculum uses.
- (LOS 12d) The 'balance sheet hedge' paragraph (matching monetary assets and liabilities under the temporal method) is mechanism; confirm the curriculum uses this term before relying on it for an exam answer.
- (LOS 12g) US GAAP highly inflationary threshold stated as cumulative three-year inflation of about 100% or more. Confirm the curriculum's exact wording (some texts say 'exceeding 100%').
- (LOS 12g) HyperinflationLab and the Kestrel Sur numbers assume the price index and exchange rate move evenly through the year (averages are midpoints). The IAS 21 translation difference on the restated opening net investment at the parent level is not modeled; the comparison is at the level of the subsidiary's translated statements, as curriculum examples present it.
- (LOS 12c) The Kestrel example of sales invoiced in the parent's currency (euro sales fall while translated sales rise less than the euro) is derived from the mechanics; confirm the curriculum's own framing of LOS b.
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
- (LOS 14c) M-score cutoff: -1.78 is used as instructed. Confirm the 2026 book uses -1.78 (some sources quote -2.22) and whether it quotes the 3.8% probability. The explanation of why the cutoff sits at a low probability (relative costs of missing a manipulator versus a false alarm) follows Beneish (1999); check whether the curriculum gives that reasoning.
- (LOS 14c) Altman Z-score zones (1.81 and 2.99) are presented in a beyond-the-curriculum callout and in the lab as commonly cited original thresholds. Verify whether the 2026 book states any cutoffs.
- (LOS 14b) Non-GAAP measures: wording of SEC requirements (reconciliation, equal or greater prominence) and of IFRS additional subtotals is from general knowledge; confirm the curriculum treats presentation choices under this LOS.
- (LOS 14h) Real-company cases (Sunbeam, WorldCom, MicroStrategy) are summarized from widely documented public history without specific amounts. The curriculum's own cases may differ; check names and details.
- (LOS 14l) Tax benefits of employee stock options: the curriculum's treatment may reflect the pre-2016 US GAAP classification (excess tax benefits in financing). Content describes the sustainability issue only; verify the classification wording.
- (LOS 14i) IFRS 18 (effective 2027) is mentioned in a beyond callout only; the 2026 exam uses the current IAS 7 classification choices.
- (LOS 14m) Audit references (ISA 701 key audit matters, PCAOB AS 3101 critical audit matters, opinion types, internal control reporting) are standard but should be checked against the curriculum's wording for this LOS.

### LM15 Integration of Financial Statement Analysis Techniques (7 flags)
- (LOS 15a) CFA Institute's 2026 summary confirms the case company is Nestle (ROE disaggregation, then deeper drivers to judge capital allocation). This module uses a fictional company (Pinnacle Corp) built to reproduce the same analytical sequence; check the book's exhibits before relying on any case figure.
- (LOS 15e) Removing the investment in associates from EQUITY as well as from assets (equity-financing assumption) is a modelling choice made here; verify whether the 2026 case exhibit adjusts equity or only assets and net income.
- (LOS 15e) Where equity income is presented (above pretax income, or after tax) changes which DuPont factors it distorts. Pinnacle presents it above pretax income; the classic case company presented it after tax. Check the 2026 exhibit.
- (LOS 15c) Section heading 'Off-Balance Sheet Leverage from Operating Leases' is reported for 2026. Verify whether the worked example capitalizes pre-2019 operating leases or uses IFRS 16 / ASC 842 disclosures, and whether purchase commitments are treated as debt in the book.
- (LOS 15d) IFRS 18 (effective 2027) is used only in a 'beyond' callout as a real example of a standard issued but not yet effective. It is not 2026 curriculum content.
- (LOS 15c) The tax effect of a LIFO to FIFO restatement is recorded as a deferred tax liability in the scenario and item set; the curriculum also allows taxes payable. Confirm which the 2026 book uses in its integration exhibits.
- (LOS 15a) The accruals ratio adjustment for undistributed equity income (CFO / (NI - equity income + dividends received)) is an analytical extension built for this case; check that the 2026 case computes accruals the same way.
