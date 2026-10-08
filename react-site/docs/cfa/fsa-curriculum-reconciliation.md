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

## Open flags known at build time (LM10, written by the orchestrator)

- Equity-method impairment reversal: some curriculum editions say neither standard allows
  reversal; IAS 28 allows it under IFRS. Answer as the book states.
- US GAAP goodwill impairment: the curriculum's two-step test vs ASU 2017-04's one-step
  test. The platform teaches two steps and labels the newer rule as beyond the curriculum.
- Contingent liabilities assumed in a business combination: exact IFRS vs US GAAP wording
  not yet included.

Flags raised by the LM11 to LM15 authors are listed in each module file's `flags` array
and summarised in `PROGRESS.md`.
