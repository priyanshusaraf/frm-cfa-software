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

### R36 — Future Value and Exposure (PILOT of the content-sonnet-clearance run, 2026-07-25)

Owner called this one "horribly written" and picked it as the pilot precisely because
it was the sharpest test. Full rewrite pass, per the flag. What the rewrite did, and
why, is the template for the rest of the run:

- **Good (keep):** the fantasy-football `eli5` (it earns the "only the weeks you are
  ahead can hurt you" asymmetry rather than asserting it, and reaches EE/PFE/EPE
  through the frame). The four-silhouettes framing. The netting-factor derivation,
  which is genuinely correct including the \(-1/(n-1)\) floor.
- **Weak (FIXED):** (a) `intuition` opened on a roster of definitions. It now opens on
  the loan-versus-swap problem ("a loan tells you your exposure, a swap does not"), so
  every metric arrives as the answer to a question already asked. §1a stage 1.
  (b) Three `def`s were enumerations wearing a definition's clothes, and the SAME
  enumerations already sat in `breakdown`. Deleting the list from `def` fixed the
  validator AND the duplication in one move. **This is the single highest-yield edit
  shape in the corpus: check `breakdown` before rewriting a long `def`, the list is
  usually already there.** (c) `concepts[6].example` held the funding-vs-credit
  material, unrelated to its own concept; it became its own concept.
  (d) Meta-references purged: "tested visually and verbally", "a question format GARP
  favors", "the source's Figure 36.7", "worked example from the source", "the standard
  tested answer". (e) 96 em/en-dashes to 0.
- **Math correctness (FIXED, and this is the class of defect §8.4 exists for):**
  the PFE worked example printed `2.33 × 0.07 × 0.2 = 3.27%`. That arithmetic gives
  **3.26%**; 3.27% is the number Schweser's own worked version prints. The app now
  says "about 3.3% of notional" throughout, so a student who checks the multiplication
  is not told they got it wrong. **Rule: when a source's rounded figure disagrees with
  the arithmetic you just showed, do not print the source's figure at the end of your
  own equation chain.** Also: the EE(MPoR) and PFE(MPoR) formulas have different units
  (EE scales a money amount, PFE returns a percentage), and the old `plain` glossed
  both as the same operation. A `plain` must match its own equation term by term.
- **Quiz (FIXED):** Q1 was indeterminate. It asked for EE given expected MtM of
  −$2m, keyed $0, and the `why` itself admitted the answer was not determinate
  ("$0 reflects that a negative-mean position typically has EE close to zero"). A quiz
  whose `why` argues with its own key is worse than no quiz. Replaced with a
  determinate version (EE is non-negative, and strictly positive whenever the positive
  tail is non-empty) whose distractors are the three real misreadings. A seventh
  question was added on collateral volatility, where the counterintuitive result
  (9.43% > either input) had no assessment attached to it.
- **Abbreviations (§1 rule):** expanded on first use in this FILE: value at risk (VaR),
  credit default swap (CDS), credit value adjustment (CVA), minimum transfer amount.
  Dropped "RR", "ITM" and "WWR", each used two or three times, per the "do not
  abbreviate the harder object" rule. The PFE/EPE look-alike pair now names the
  distinguishing word (FUTURE vs POSITIVE) in the sentence that introduces it, in
  `intuition`, in `connections.confused`, and in a hook.
- **Guidance for the next wave:** budget for a `breakdown`-versus-`def` reconciliation
  on every reading, not just the flagged ones. And read `concepts[].example` fields
  suspiciously: the enrichment run parked overflow content in them, so an `example`
  that does not exemplify its own concept is a recurring defect, not a one-off.

## Durable learnings from the Phase 3 linking run (2026-07-25)

Phase 3 turns concept NAMES into links automatically, which made one thing
obvious: **a concept's `name` is now user-facing machinery, not just a label.**
Rules for anyone adding or renaming a `formulas[]`/`concepts[]` entry:

1. **Name the concept, not the section.** "Why the basis opened (demand) and why
   it has not closed (limits to arbitrage)" is a heading; "Covered interest
   parity" is a concept. Only the latter can be matched, linked, or looked up.
2. **A parenthetical is either an acronym or a disambiguator, and they behave
   differently.** "Value at Risk (VaR)" gains "VaR" as a match phrase; "Expected
   loss (single asset)" does not gain "single asset", and the qualifier is
   stripped from the page heading. Acronyms match case-sensitively, so "VaR"
   never fires on the variance function `var(m)`.
3. **Two entries for one idea cost you the link.** "Wrong-way risk (introduced
   via the CDS example)" and "Wrong-way risk (WWR) in CDS" were two names for one
   concept; the generator now keeps only the most-referenced. If a reading needs
   its own angle on a shared concept, put it in that reading's prose, not in a
   near-duplicate concept name.
4. **Watch for words that mean two things across books.** Caught in the run and
   fixed at the source: "pass-through" (MBS vs a control's failure probability,
   R43), "CSA" (Credit Support Annex vs Singapore's Cyber Security Agency, R47),
   "tranching" (credit/prepayment vs deposit maturity buckets, R77), "equity
   value" (Black-Scholes-Merton vs a bank's net worth, R79), "risk contribution"
   (portfolio measure vs "systemic-risk contribution", R68). When the content run
   introduces a term that is already loaded elsewhere, say which sense you mean
   in the sentence.
5. **Rerun the generator after renaming anything.**
   `node scripts/build-core-concepts.mjs`, then
   `node scripts/preview-concept-links.mjs <rn...>` to see what changed.
