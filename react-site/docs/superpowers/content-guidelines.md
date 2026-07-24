# content-guidelines.md — the durable, self-improving content playbook

**Read this before touching ANY reading's content.** This is the permanent
mistakes-and-fixes + per-reading review ledger for the whole product (roadmap
§5.1). It exists so that later, cheaper models can approach every reading
correctly on the first pass without re-deriving the owner's teaching style or
repeating past mistakes. That is the token-efficiency mechanism: the expensive
thinking is done once, written here, and reused.

Scope: this pilot is FRM Part II. The product is planned to grow to **all levels
of FRM and CFA, roughly 20+ books.** Every rule and per-reading note here is
written to transfer to that future corpus. Spend tokens now to write good
guidance; save far more later by not re-litigating it 20 books deep.

## How future agents use this file

1. **Before editing a reading**, read its per-reading entry below (if one
   exists) plus the "Durable style rules" section. Do what "Good" says to keep,
   fix what "Weak" flags, and follow "Guidance".
2. **After working a reading**, add or update its entry: what is genuinely good
   (so nobody rewrites it), what is weak (with the concrete fix), and any guidance
   that would help the next model. Keep it specific and short.
3. `content-flags.md` is the **transient** per-item worklist consumed by the
   Phase 5 pass; **this file is durable** and survives past Phase 5 into the next
   level. When a flag is resolved, fold the lasting lesson into the style rules or
   the reading's entry here, then drop the flag.
4. The owner reviews readings too. Owner-caught issues are authoritative; record
   them here verbatim in intent so they are never reintroduced.

## Durable style rules (learned from the owner; extend as more are learned)

These are HARD preferences on top of `react-site/CLAUDE.md` §1/§1a. Violating one
reads as AI-generated or wrong and costs customer trust.

1. **No meta-references to the source or the exam.** Never write "named in the
   source", "the exam candidate", "as the source states", "GARP tests this",
   "the reading says". Write as a tutor talking to a student, not as a compiler
   summarizing a book. (Fixed instances 2026-07-25: R32 "exam candidate" x2, R33
   "named in the source".)
2. **Explain WHY a thing exists, not just what it is.** When a structure or entity
   is introduced (monolines, CDPCs, SPVs, CVA desks), give the reason it was
   created and the problem it solved before defining it. A definition without a
   motive gets memorized, not understood (CLAUDE.md §1a stage 1).
3. **Get the counterparty-risk DIRECTION right (recurring correctness trap).**
   Counterparty (credit) risk to you bites when the trade is **in your favour**:
   positive mark-to-market to you means the counterparty owes you, so their
   default hurts you. "Moves against me" means I owe them, and it is MY default
   that matters to them. Always phrase it as "if it moves in my favour and the
   counterparty owes me..." (Fixed 2026-07-25: R31 thinkLike had this inverted.)
4. **Quizzes must be genuinely tricky, like real FRM and CFA.** Current quizzes
   are too easy. Use subtle, plausible distractors that punish a shallow read.
   Do NOT over-capitalize or emphasize the answer OPTIONS (emphasis inside the
   QUESTION stem is fine); real exams keep option wording flat so the trap is in
   the meaning, not the formatting. Never reference option letters (Quiz.jsx
   shuffles them).
5. **Reuse examples naturally across readings.** When an example carries over
   from an earlier reading (the rain-bet, Ondine/Scarbo), say "continuing our
   example from the previous reading" so it reads as a deliberate thread, not a
   coincidence. Where a prior example or concept is invoked, add a small
   refresher link (or a reminder widget) so a reader who forgot it is not lost.
6. **Prefer vivid, real framings.** A "zero-sum game" framing for counterparty
   risk, or a real trader's experience (naked calls need large margin; the same
   view as a defined-risk spread nets down and slashes margin) teaches better than
   an abstract restatement. Add them where they fit.
7. **Cut repetition; balance coverage.** Repetitive prose makes the repeated point
   over-learnable while starving the other testable material in the same reading,
   which is where surprise exam points come from. Condense repeats and give the
   thinner-but-testable parts their due.
8. **Richer "Go deeper"/sources where thin.** Flagged where a reading's external
   depth is sparse (R30, R32).

## Per-reading review ledger

Format per reading: **Good** (keep), **Weak** (fix), **Guidance** (for the next
model). Absence of an entry means "not yet reviewed", not "clean". Populate as
readings are worked; the Phase 5 pass and the owner+Opus overview process fill the
rest.

### R31 — Derivatives (Counterparty Risk Intro)
- **Good:** the two-questions framing (market move vs will-they-pay), the rain-bet
  ELI5, the four-way trade classification (exchange / cleared / collateralized /
  uncollateralized) with the correct emphasis that the collateral axis, not the
  venue axis, drives surviving counterparty risk.
- **Weak (FIXED 2026-07-25):** thinkLike inverted the counterparty-risk direction
  ("if it moves against me and my counterparty owes me"). Now "if it moves in my
  favour and my counterparty owes me". See style rule 3.
- **Weak (OPEN, Phase 5):** monolines and CDPCs are named but not motivated.
  Add WHY they existed: monolines were insurers that "wrapped" bonds/CDS to lend
  their AAA rating so issuers could borrow cheaply; CDPCs were vehicles set up to
  sell credit protection with an AAA structure WITHOUT posting bank-style
  collateral. Both were cheap-credit-protection / rating-uplift plays, and both
  broke in 2007-2009 when the wrapped risk turned out correlated with their own
  solvency. See style rule 2.

### R32 — Counterparty Risk and Beyond
- **Good:** the lending-vs-counterparty intuition, the rain-bet ELI5, the
  thinkLike "two independent gates" habit (CVA and credit limits as separate
  checks), the Ondine/Scarbo walkaway scenario.
- **Weak (FIXED 2026-07-25):** "no counterparty risk to the exam candidate" (x2)
  was nonsense; now "to the trading parties" / "to either party". Style rule 1.
- **Weak (OPEN, Phase 5):** (a) the intro could add a **zero-sum game** framing,
  which makes counterparty risk more intuitive and vivid; (b) the rain-bet example
  continues from R31, so open it with "continuing our example from the previous
  reading" (style rule 5); (c) the **CVA vs credit-limits** distinction is
  important but thin. Make it explicit: CVA is a PRICE, a per-trade charge that
  marks the trade down for expected counterparty loss and aggregates across the
  netting set; a credit limit is a hard CAP on total exposure to a counterparty, a
  gate not a price. A trade can be CVA-cheap yet breach the limit, or within the
  limit yet CVA-expensive, which is exactly the trap; (d) the Ondine example
  should carry a refresher link/widget (style rule 5). Go-deeper section is thin.

### R33 — Netting, Close-Out, and Related Aspects
- **Good:** netting-set mechanics and why netting compresses exposure below the
  sum of positive legs.
- **Weak (FIXED 2026-07-25):** "TriOptima is named in the source as..." AI-ism;
  now "TriOptima is a real trade-compression service...". Style rule 1.
- **Weak (OPEN, Phase 5):** (a) the reading is **repetitive**; condense the
  repeated portions so the thinner-but-testable material is not starved (style
  rule 7); (b) add the **real trader example** of netting cutting margin: selling
  naked calls requires large margin, but expressing the same view as a
  defined-risk spread nets the positions and slashes the margin required, a thing
  traders feel directly. Style rule 6.

### R30 — Credit Derivatives
- **Weak (OPEN, Phase 5):** Go-deeper / external depth is thin; enrich. (Owner
  flagged the R30-R33 cluster's go-deeper sections generally.)

### R34 — Margin (Collateral) and Settlement, R35 — Central Clearing
- Not yet reviewed line-by-line. R34 is a natural home for the spread-vs-naked
  margin example if it does not fit R33. R35's CCP loss-waterfall now has the
  `waterfall-flow` widget (Phase 1).
