# CFA Level II FSA: curriculum reconciliation

Status: **LOS VERIFIED against the official 2026 outline; 1 open flag (LM11 content source); content NOT yet checked line by line against the owner's books.** Updated 2026-10-08.

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

Exam-safe pass (8 October 2026). Every remaining flag except one was resolved so that the
platform never makes you rely on an unconfirmed detail. The pattern used: the point the
curriculum certainly tests goes into the main text or an exam callout; anything the
curriculum may not cover moves into a "beyond the curriculum" callout; modeling
simplifications get a "Model notes" paragraph next to the widget or animation. Notable
content changes: Beneish AQI now follows Beneish (1999) with no securities term (Vantor
example AQI 1.14, M -1.37, probability 8.5%); LM13 teaches the 4.5% / 6% / 8% minimums as
core, the conservation buffer (7% CET1, 10.5% total) as figures to recognize, and the
countercyclical buffer, G-SIB surcharge, 3% leverage minimum, IFRS 9 staging vs CECL and
three of the five Basel monitoring tools as beyond the curriculum; LM15 shows the LIFO to
FIFO tax slice under deferred tax, taxes payable and cash, with the ratio effect of each.

## Open flags, all modules (1, generated from each module's `flags` array)

Each item must be checked against the owner's edition of the curriculum, then fixed and removed from the module file.

### LM10 Intercorporate Investments (0 flags)
- None open.

### LM11 Employee Compensation: Post-Employment and Share-Based (1 flag)
- (LOS 11a) Section content for LOS a and c to e was rebuilt from the CFA Institute 2026 refresher summary and third-party notes, not from the reading itself, so it must be checked against the book once the book is in the repo. Research 2026-10: the five LOS match the CFA Institute 2026 refresher page word for word, and the 2024 to 2026 Level II errata confirm the reading's lesson structure, but the section content cannot be checked without the book.

### LM12 Multinational Operations (0 flags)
- None open.

### LM13 Analysis of Financial Institutions (0 flags)
- None open.

### LM14 Evaluating Quality of Financial Reports (0 flags)
- None open.

### LM15 Integration of Financial Statement Analysis Techniques (0 flags)
- None open.
