# content-flags.md — running worklist of improvable CONTENT

Append-only during Phases 0.5 through 4. The Phase 5 Opus polish owns every prose change and
consumes this list. Do NOT edit prose inline in earlier phases; flag it here instead.

Format per entry: `- rNN (bookN/rNN.js) — <what to improve> — <why> — flagged Phase X, <date>`

## Flags
(none yet)

- blockThroughlines.js c27 ("Portfolio credit and copulas", R27/28/29) — functional through-line
  written for the Block Review pilot (correctness-first, Opus-verified grounded in R27/28/29). Needs
  Phase 5 human-tone polish; specifically the closing synthesis sentence braids R29's two distinct
  tools (copula->credit-VaR/WCDR vs CVA/DVA counterparty pricing) into one clause. Flagged Phase 2/BR, 2026-07-24.

- **src/data/authoredConcepts.js — securitization Revision + CMO-vs-CDO Core pages (Phase 2 flagship).**
  Functional problem-first content, grounded verbatim in Book 2 R28 (Structured Credit Risk, lines
  ~4740-4800) and R39; nothing invented. Needs the Phase 5 human-tutor tone / real-life-relevance
  pass: (a) the covered-bond -> pass-through -> CMO -> CDO chain could open each stage from a named
  actor's incentive even harder (section 3 doctrine); (b) worked numbers are only the sourced
  101-for-100 overcollateralization and 8%/7% excess spread, could add a concrete tranche-loss walk;
  (c) tie into workstream E (real bank) once the case-study route exists. Flagged Phase 2, 2026-07-25.

- **OWNER REVIEW 2026-07-25 (counterparty cluster R30-R35) + global directives.** Full detail in
  `content-guidelines.md` (durable). Fixed immediately: R31 counterparty-direction inversion, R32
  "exam candidate" x2, R33 "named in the source", plus the Quiz-repeat functional bug (Chapter.jsx
  key=rn). OPEN for Phase 5, per reading:
  - R31: motivate monolines/CDPCs (why they existed: cheap credit protection / AAA rating uplift;
    both broke 2007-2009 when wrapped risk correlated with their own solvency).
  - R32: add a zero-sum-game framing to the intro; open the rain-bet with "continuing our example
    from the previous reading"; expand CVA-vs-credit-limits (CVA is a per-trade price, a credit
    limit is a hard cap: a trade can be CVA-cheap yet breach the limit, or within limit yet
    CVA-expensive); add a refresher link/widget on the Ondine example; richer go-deeper.
  - R33: condense the repetition (repeated points starve thinner-but-testable material); add the
    real trader example, naked calls need big margin vs a defined-risk spread nets down and slashes
    margin.
  - R30: richer go-deeper / external depth.
  - GLOBAL: (1) quizzes must be genuinely tricky like real FRM/CFA, subtle distractors, do NOT
    over-capitalize/emphasize answer OPTIONS (question-stem emphasis ok); (2) purge meta-references
    / AI-isms everywhere ("named in the source", "the exam candidate", "GARP tests", "as the source
    states"); (3) explain WHY entities/structures exist, not just what they are; (4) reuse examples
    across readings with explicit continuity phrasing + refresher links.

- **Phase 3 inline links, borderline senses (not defects, judgement calls).** r90's
  "hurdle rate" (a hedge-fund incentive-fee threshold) links to the RAROC after-tax
  hurdle-rate page. Same word, adjacent but not identical idea; kept because the target
  still explains what a hurdle rate is and the alternative was making the concept
  unlinkable everywhere. If the Phase 5 pass renames either concept, re-check it.
  Flagged Phase 3, 2026-07-25.

- **R36 (Future Value and Exposure): owner-reported as "horribly written", 2026-07-25.** The
  abbreviation defects were fixed on the spot (see below); the prose problems below are OPEN
  and should be handled when R36 comes up in the content run. Give it a full rewrite pass,
  not a touch-up.
  - `validate-reading.mjs` fails three definitions as smuggled enumerations: `concepts[2]`
    (Credit exposure profile factors, 165 words), `concepts[5]` (Margin period of risk, 148),
    `concepts[7]` (Collateral, segregation, and rehypothecation, 158). Each is a list wearing
    a definition's clothes: move the enumeration into `breakdown` and leave a real definition.
  - Three more definitions are over the warn threshold: `concepts[0]` (97), `concepts[3]`
    (109), `concepts[6]` (83).
  - The reading front-loads vocabulary before it has motivated any of it. Under the section 1a
    doctrine, the exposure metric family should arrive as answers to a question the reader is
    already asking ("I know what I am owed today, but what could I be owed in a year?"), not
    as a roster to memorize.
  - FIXED already (do not redo): `teaches` opened with seven bare acronyms and now expands the
    family and warns that PFE and EPE look alike; R37 expanded EPE as "expected POTENTIAL
    exposure" twice, in prose and in a quiz stem, propagating a one-off typo in the Schweser
    source and contradicting R36's correct "expected positive exposure"; R37's CVA concept now
    states once that "credit value adjustment" and "credit valuation adjustment" are the same
    thing, because the source uses both. Durable rule written into CLAUDE.md section 1.
  - GLOBAL follow-up for the content run: every reading that introduces an abbreviation must
    expand it in that file, use exactly one expansion for it, and skip the abbreviation
    entirely when the term appears only two or three times.
