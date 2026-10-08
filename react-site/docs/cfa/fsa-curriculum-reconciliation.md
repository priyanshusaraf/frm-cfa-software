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
4. **Independent accuracy review.** Every module (LM10 to LM15, plus LM11's rebuilt
   sections) was re-audited by a separate reviewer who recomputed every number; about 60
   defects were fixed in total (see git history).

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

## CFA Institute 2026 Level II errata, applied (checked 2026-10-08)

Source: CFA Institute, "2026 Level II Curriculum Errata" (cfainstitute.org,
2026-cfa-level-ii-errata.pdf). FSA entries and what the platform did:

- LM10 1.08 and summary (17 Feb 2026): US GAAP goodwill impairment is now an optional
  qualitative assessment plus ONE quantitative test, loss = carrying amount of the
  reporting unit minus fair value, limited to the unit's goodwill. LM10 rebuilt (compare
  block, formula, check question, two-year scenario); the old two-step test is shown only
  as a trap. (The public refresher summary page still shows the old two-step wording.)
- LM10 1.07 (17 Feb 2026): contingent liabilities recognized if a present obligation from
  past events that can be measured reliably (warranty example). Applied.
- LM10 1.07 (22 Apr 2026): primary beneficiary includes the power to direct the VIE's
  most significant activities. Applied.
- LM10 solutions (28 Apr 2026): proportionate consolidation is not permitted for joint
  ventures. Applied (the US GAAP industry exception is labelled beyond the curriculum).
- Earlier errata (2023, 2024): the sentence "neither standard permits reversing an
  equity-method impairment" was struck; IFRS permits, US GAAP does not. Applied.
- LM11 2.06 Exhibit 8 and Example 10: IFRS/US GAAP pension components and net interest on
  the beginning net liability. Already consistent.
- LM13 4.03 (2 Jun 2026): the sentence calling operating leases a low-risk example of
  off-balance-sheet liabilities was deleted. The platform never used it.
- LM14 5.05 (26 Jan 2026): R&D. US GAAP no capitalization; IFRS expenses research and
  capitalizes development only if all six criteria are met. Added to LM14.
- LM15 6.05 (10 Feb 2026): exhibit renumbering only.

Flag research (October 2026) with CFA Institute errata, refresher pages and
curriculum-tracking notes closed 25 of 52 flags; each remaining flag carries a
"Research 2026-10" note saying what was found. LM15's associate adjustment now follows the
curriculum case (leverage kept as reported); the DupontLab widget and scenario match it.

## Open flags, all modules (27, generated from each module's `flags` array)

Each item must be checked against the owner's edition of the curriculum, then fixed and removed from the module file.

### LM10 Intercorporate Investments (1 flags)
- (LOS 10a) Disclosures section summarizes IFRS 7/12/13 and ASC 805/810 requirements at an analyst level; check the 2026 book for any specific disclosure list it expects candidates to know. Research 2026-10: the 2026 LOS (CFA Institute refresher page) name 'disclosure' for all five investment types, but the reading summary lists no disclosure items, the 2023 to 2026 Level II errata contain no disclosure corrections, and AnalystPrep's notes list none, so the expected list is still unknown.

### LM11 Employee Compensation: Post-Employment and Share-Based (9 flags)
- (LOS 11a) LOS replaced 2026-10-08 with the official 2026 topic outline (five LOS). Section content for LOS a and c to e was rebuilt from the CFA Institute 2026 refresher summary and third-party notes, not from the reading itself; verify against the book when it is in the repo. Research 2026-10: the five LOS match the CFA Institute 2026 refresher page word for word, and the 2024 to 2026 Level II errata confirm the reading's lesson structure (2.04 share-based tax and share count effects, note disclosures; share-based compensation and financial statement modeling; 2.06 financial reporting for post-employment benefits). The section content itself still cannot be checked without the book.
- (LOS 11d) ABO and VBO: included as US GAAP measures for completeness. Under the 2026 LOS they are likely mentioned only in passing, if at all. Research 2026-10: neither the CFA Institute 2026 refresher summary, AnalystPrep's current LOS 12(d) note nor the 2024 to 2026 errata mention ABO or VBO; they appear only in AnalystPrep notes written for the older LOS. Absence from summaries is not proof they were cut.
- (LOS 11d) US GAAP presentation (ASU 2017-07: non-service components outside operating income) is labelled beyond the curriculum. Check whether the 2026 reading mentions it. Research 2026-10: AnalystPrep's LOS 12(d) note says service cost is an operating expense under both standards and that US GAAP reports interest cost as a gross interest expense separate from operating income, which hints the reading touches presentation, but no source names ASU 2017-07 or confirms the wording.
- (LOS 11d) Effect of a higher discount rate on interest cost is presented as ambiguous (usually higher for typical durations). Confirm the book's exact wording. Research 2026-10: AnalystPrep's note for the older LOS explains the change in interest cost as the net of a lower opening obligation and a higher rate, which matches this module, but nothing found quotes the 2026 reading.
- (LOS 11d) Multi-employer plans treated as DC when information is insufficient: confirm the 2026 reading still includes this point. Research 2026-10: IAS 19 still requires this treatment, but no curriculum-tracking source for the 2023 to 2026 reading mentions multi-employer plans, so the sentence 'the curriculum notes' is unconfirmed.
- (LOS 11d) Projected unit credit arithmetic and corridor amortization were core under the older LOS set and are kept with depth notes; the 2026 LOS d is qualitative ('explain how ... affect the financial statements'). Research 2026-10: AnalystPrep's current LOS 12(d) note describes the 10% corridor and US GAAP amortization but has no single-employee projected unit credit table (that appears only in its older-LOS note); the errata show the reading's pension examples work at component level (service cost, net interest on the beginning net position, expected return). Consistent with the depth notes, but not proof of what the exam will ask.
- (LOS 11e) After-tax deficit in the enterprise value bridge: the 2026 summary says to consider the tax deductibility of contributions. Whether the reading deducts the deficit after tax by default is unconfirmed; both versions are shown. Research 2026-10: the CFA Institute 2026 refresher summary does not mention tax-effecting the deficit, and AnalystPrep's LOS 12(e) note deducts the net pension liability with no tax adjustment (it mentions deductible contributions only as a tax shield under LOS 12(d)). Not conclusive either way.
- (LOS 11e) Deficit-repair contributions are described as not deducted from free cash flow (to avoid double counting with the bridge) and remeasurements as forecast at zero. Both follow from the reading's logic but the wording is unconfirmed. Research 2026-10: AnalystPrep's LOS 12(e) note lists service cost, net interest, remeasurements and contributions as the items to model, deducts future service cost from free cash flow and excludes net interest, but says nothing about contributions in free cash flow or forecasting remeasurements at zero.
- (LOS 11e) The ratio and cash flow reclassification section (old LOS e/f) is kept as an older lens. Its actual-versus-expected-return choice and the pre-tax ledger simplification were flagged before and still apply. Research 2026-10: no current curriculum-tracking note covers these reclassifications, which supports treating them as an older lens; nothing found settles the two simplifications.

### LM12 Multinational Operations (6 flags)
- (LOS 12a) Functional currency indicators: the IAS 21 primary/secondary ranking and the ASC 830 indicator list were written from the standards. Check the exact wording and grouping the 2026 curriculum uses. Research 2026-10: Deloitte's ASC 830 roadmap (ch. 10) confirms the technical point the content makes, that IFRS has a hierarchy of factors and US GAAP has none; no public source reproduces the curriculum's own list or grouping (the CFA Institute 2026 summary gives only the definition), so the curriculum wording is unconfirmed.
- (LOS 12d) The 'balance sheet hedge' paragraph (matching monetary assets and liabilities under the temporal method) is mechanism; confirm the curriculum uses this term before relying on it for an exam answer. Research 2026-10: the CFA Institute 2026 summary confirms temporal-method exposure equals the net monetary position (adjusted for non-monetary items at current value), and AnalystPrep's LOS e notes reduce exposure by selling non-monetary assets for cash, but no curriculum-tracking source uses the term 'balance sheet hedge'.
- (LOS 12g) HyperinflationLab and the Kestrel Sur numbers assume the price index and exchange rate move evenly through the year (averages are midpoints). The IAS 21 translation difference on the restated opening net investment at the parent level is not modeled; the comparison is at the level of the subsidiary's translated statements, as curriculum examples present it. Research 2026-10: this is a modeling disclosure, not a wording question; the CFA Institute 2026 summary confirms only the IFRS sequence (restate, then translate at the current rate), and no public source shows the curriculum's worked example, so the level of comparison cannot be checked.
- (LOS 12c) The Kestrel example of sales invoiced in the parent's currency (euro sales fall while translated sales rise less than the euro) is derived from the mechanics; confirm the curriculum's own framing of LOS b. Research 2026-10: the CFA Institute 2026 summary frames the topic as sales growth from volume, price and exchange rates (volume and price more sustainable); AnalystPrep's LOS note covers only the subsidiary's translated sales; no source shows how the curriculum treats sales invoiced in the parent's currency.
- (LOS 12h) Transfer pricing is mentioned as a driver of the earnings mix. Confirm it appears in the 2026 curriculum's discussion of the effective tax rate. Research 2026-10: the CFA Institute 2026 summary and AnalystPrep's ETR note discuss the effective tax rate reconciliation and changes in profit mix but do not mention transfer pricing; the only source that does (trustedinstitute.com) is not a reliable curriculum tracker.
- (LOS 12e) Scenario lm12-cta-vs-remeasurement hides the cash flow statement: a translated cash flow statement needs an 'effect of exchange rate changes on cash' line outside operating, investing and financing, which the ledger engine does not model. Income statement items are translated at the average rate as an approximation of transaction-date rates. Research 2026-10: an engine limitation, not a curriculum question; nothing found online changes it.

### LM13 Analysis of Financial Institutions (4 flags)
- (LOS 13b) Capital buffers (2.5% conservation, countercyclical up to 2.5%, G-SIB surcharge) and the 3% leverage ratio: confirm how much the 2026 reading states as testable figures. The 4.5% / 6% / 8% minimums are taught as core. Research 2026-10: AnalystPrep and IFT notes on the reading give only the 4.5% / 6% / 8% minimums; AnalystNotes (2026) cites 10.5% total under Basel III, which implies the 2.5% conservation buffer; no curriculum-tracking source mentions the countercyclical buffer, the G-SIB surcharge or the leverage ratio, and the CFA Institute 2026 summary says only that Basel III sets minimum capital, liquidity and stable funding requirements.
- (LOS 13c) IFRS 9 staging vs US GAAP CECL: confirm the reading covers both expected credit loss models and at what depth. Research 2026-10: none of the CFA Institute 2026 summary, AnalystPrep, IFT or AnalystNotes mention IFRS 9 staging or CECL; IFT lists allowance for loan losses / non-performing loans and adequacy of adjustments for expected loan losses, so depth remains unconfirmed.
- (LOS 13c) Liquidity: the five Basel III monitoring metrics are as remembered from the curriculum; ASF and RSF weights and LCR run-off rates used in examples are simplified illustrations, not Basel factors. Research 2026-10: the five tools match BIS (bcbs238, Part 2); AnalystPrep and AnalystNotes (2026) name only concentration of funding and contractual maturity mismatch as monitoring metrics, so whether the reading lists all five is unconfirmed.
- (LOS 13c) Recoveries: the US practice (credited to the allowance) is shown in the scenario; IFRS presentation in profit is described as common practice. Verify against the reading if tested. Research 2026-10: no curriculum-tracking source covers recoveries; IFT lists provision for loan losses / net loan charge-offs, which is consistent with recoveries netted against charge-offs, but says nothing on IFRS presentation.

### LM14 Evaluating Quality of Financial Reports (4 flags)
- (LOS 14c) Beneish AQI: Beneish's original definition uses (current assets + net PP&E) / total assets; the curriculum version may also include securities, as used here. Verify. Research 2026-10: AnalystPrep's Level II notes, which track the curriculum wording, define AQI as non-current assets other than PP&E relative to total assets, computed from 1 - (current assets + PP&E) / total assets with no securities term; Wikipedia's version (citing later Beneish papers) adds securities. Only one curriculum-tracking source was found, so not conclusive. If confirmed, the table formula, the Vantor worked example (AQI would be 1.14, M about -1.37, probability about 8.5%) and the BeneishLab widget (securities field in soft()) all need to change together.
- (LOS 14c) Altman Z-score zones (1.81 and 2.99) are presented in a beyond-the-curriculum callout and in the lab as commonly cited original thresholds. Verify whether the 2026 book states any cutoffs. Research 2026-10: AnalystPrep's Level II notes give the Z-score with direction (higher means lower bankruptcy risk) and limitations (static, accounting-based) but no cutoffs, which is consistent with the beyond callout; no second curriculum-tracking source covered the point, and the 1.81 / 2.99 zones were confirmed only through secondary summaries of Altman (1968).
- (LOS 14h) Real-company cases (Sunbeam, WorldCom, MicroStrategy) are summarized from widely documented public history without specific amounts. The curriculum's own cases may differ; check names and details. Research 2026-10: the SEC administrative order on Sunbeam (Release 34-47261) supports the facts used here (1996 restructuring charges and reserves inflating 1997 income, bill-and-hold sales without a customer business purpose). A search result pointed to an older table of contents listing Sunbeam (revenue recognition), MicroStrategy (multiple-element contracts) and WorldCom (capitalization) cases, but the file could not be opened, and no 2026 curriculum-tracking source names the cases.
- (LOS 14l) Tax benefits of employee stock options: the curriculum's treatment may reflect the pre-2016 US GAAP classification (excess tax benefits in financing). Content describes the sustainability issue only; verify the classification wording. Research 2026-10: company filings applying ASU 2016-09 confirm that excess tax benefits moved from financing to operating cash flows (public companies, periods beginning after 15 December 2016), so the content's wording is correct under current US GAAP. AnalystPrep's Level II notes on cash flow quality do not mention the item, so the 2026 curriculum's own wording remains unconfirmed.

### LM15 Integration of Financial Statement Analysis Techniques (3 flags)
- (LOS 15c) Section heading 'Off-Balance Sheet Leverage from Operating Leases' is reported for 2026. Verify whether the worked example capitalizes pre-2019 operating leases or uses IFRS 16 / ASC 842 disclosures, and whether purchase commitments are treated as debt in the book. Research 2026-10: AnalystNotes' 2026 Level II notes for this subject describe a pre-2019 screen (rental expense x 7.4 / total assets above 5%) followed by capitalizing the flagged company's operating leases; the content callout now says so. Nothing found on whether the case treats purchase commitments as debt, so that part stays open.
- (LOS 15c) The tax effect of a LIFO to FIFO restatement is recorded as a deferred tax liability in the scenario and item set; the curriculum also allows taxes payable. Confirm which the 2026 book uses in its integration exhibits. Research 2026-10: a 300hours Level II forum thread treats the tax effect as a reduction in cash (cash and CFO fall by the increase in the reserve x t), while other prep summaries in search results book the reserve x t as a deferred tax liability; none refers to the 2026 integration reading's exhibits, so not conclusive.
- (LOS 15a) The accruals ratio adjustment for undistributed equity income (CFO / (NI - equity income + dividends received)) is an analytical extension built for this case; check that the 2026 case computes accruals the same way. Research 2026-10: AnalystNotes' 2026 summary of the Nestle case says the analyst examined balance-sheet-based and cash-flow-based accruals ratios (finding significant fluctuations) and that the ratio of operating cash flow to operating earnings was fairly consistent; it does not mention an associate adjustment. That suggests the case uses CFO / operating income rather than the measure built here, but it is a single source, so the extension is kept and labelled as such.
