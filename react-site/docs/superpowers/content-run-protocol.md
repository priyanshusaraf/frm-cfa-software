# content-run-protocol.md — the exact wave protocol

**Read this at the start of every wave.** It is the operational detail behind the
"IF THE USER SAYS CONTINUE" block in the root `CLAUDE.md`. It is written to be
followed literally by a session that has just been cleared and knows nothing.

The companion file is `content-run-ledger.md`: it holds the ACTIVE PHASE and the
per-reading status. This file holds the procedure. Neither is useful alone.

---

## 0. Orient (every session, after every context clear)

1. Read `content-run-ledger.md`. Its header names the **active phase**.
2. Read `content-guidelines.md` (durable style rules + per-reading ledger).
   Non-negotiable: it is how the corpus stays consistent across models.
3. Execute the section below matching the active phase.
4. Never ask the user whether to continue between waves. Run waves back to back
   until a stop condition in section 4 fires.

---

## 1. ACTIVE PHASE = "phase-3-hover-linking"

Inline hover-snippet links for reused core concepts (root `react-site/CLAUDE.md`
section 6, Phase 3). Wave = 5 readings.

**The linking is AUTOMATIC, and the data files are never edited in this phase.**
Built 2026-07-25 (seventeenth session), per CLAUDE.md section 6 item 3
("auto-detected, not manually authored"):

- `scripts/build-core-concepts.mjs` also emits `src/data/conceptLinkTable.js`:
  every linkable concept with its match phrases and a hover snippet. Re-run it
  after any change to a `formulas[]`/`concepts[]` NAME or to
  `authoredConcepts.js`.
- `src/lib/conceptLinks.js` `linkifyRoot()` runs after render in `Chapter.jsx`
  and wraps the first occurrence of each concept name in `<a class="cref">`.
  A concept is never linked inside its own home reading, math/widget/heading
  subtrees are skipped, and each concept links at most once per page.
- `ConceptHover.jsx` renders the snippet card (hover on desktop, first tap on
  touch) with "Learn more" into `/concept/:slug`.

This satisfies the anchoring requirement more strongly than hand-wrapping would:
the anchor is the concept NAME at render time, so the content run can rewrite any
surrounding sentence and the link follows it. Nothing to break, nothing to merge.

**So the per-reading wave work is VERIFICATION, not editing:**

```bash
node scripts/preview-concept-links.mjs 1 2 3 4 5   # phrase + surrounding sentence
```

Judge each match: does the linked phrase actually mean that concept here, and is
the target page the one a confused student would want? Record a bad match in
`content-flags.md` and fix it at the source (a `linkPhrases` entry, a tighter
concept name, or the generator's guards) rather than in the reading. A reading
with zero matches is a legitimate `done`: it reuses nothing.

Mark the `p3` column `done` per reading. Verification is section 4.

---

## 2. ACTIVE PHASE = "content-sonnet-clearance"

The MVP clearance run. Wave = 5 readings, then a mandatory Opus-A gate.

### 2a. Sonnet's mandate — a CLOSED list

Per reading, Sonnet may change ONLY these five things:

1. **Em/en-dash purge.** Every `—` and `–` gets a context-appropriate rewrite
   (comma, colon, parentheses, or a full stop; a full stop or colon usually reads
   best). A blind regex or `sed` is FORBIDDEN: it produces broken grammar at scale.
   A minus sign in math and a hyphen in a compound word are fine and stay.
2. **AI-isms and meta-references.** Delete/rewrite "the exam candidate", "named in
   the source", "as the source states", "GARP tests this", "the reading says".
   Write as a tutor talking to a student, not a compiler summarizing a book.
3. **Factual and directional errors.** The reference case is R31: text said a
   counterparty exposure moved "against me" when the mechanism is that it moves in
   my favour and the counterparty owes me. Check every directional claim
   (who owes whom, which way a rate moves, which tranche absorbs first) against
   the Schweser source.
4. **Missing WHY on a counterintuitive claim.** The reference case is R63:
   "deposits have become LESS stable over time" asserted the surprise without the
   mechanism. Supply the causal chain in the same breath, SOURCED FROM SCHWESER,
   never invented.
5. **Quiz repair.** Remove capitalization/emphasis from answer OPTIONS (emphasis in
   the question stem is fine). Tighten distractors that are obviously wrong. Never
   reference option letters in a `why` (options are shuffled every round).

**Everything else it judges weak gets FLAGGED in `content-flags.md`, NOT rewritten.**
This boundary is the whole point of the run. The baseline content is already good
enough to learn from; this pass makes minor MVP-level corrections, not a rewrite.
If an agent finds itself rewriting a paragraph that was already correct and
understandable, it has left its mandate.

> **This REVERSES roadmap locked-decision 3** ("flag-as-you-go; the Phase 5 pass
> owns every prose change"). Owner directive, 2026-07-25: Sonnet now edits the five
> items above directly, and only the five. Do not re-argue this against the old rule.

### 2b. The Opus-A gate — after EVERY wave of 5

Opus-A verifies, it does not rewrite. Over the 5 readings just cleared:

1. **Sense.** Did an edit change or damage the meaning? Directional claims and
   any edited formula prose get checked against the source.
2. **Dashes.** `grep -Rn '—\|–' src/data/bookN/rNN.js` returns nothing, per file.
3. **UI/render.** Render-check each of the 5 chapters (section 3). Broken widget,
   broken KaTeX, or empty section = gate failure.
4. **Write what it learned into `content-guidelines.md`** — the point of the gate.
   Record per reading what is genuinely good (so nobody rewrites it later), what
   was weak and how it was fixed, and any guidance that makes the NEXT wave better.
   A gate that produces no durable learning has not been run properly.

Gate fails -> fix in place, re-verify, then proceed. Fails twice on the same
reading -> stop and report to the owner (section 4).

---

## 3. ACTIVE PHASE = "content-opus-improvement"

Runs only after all 101 readings show `content: done`. Opus-B looks for
explanations that could be genuinely better and improves those.

**"Leave it alone" is a valid and frequently correct verdict.** Owner directive:
if a student would understand it as written, it ships as written. This pass makes
smart, targeted adjustments; it is explicitly NOT another full sweep, and it is
NOT the most important run. Re-writing adequate prose is a defect in this phase,
not diligence.

---

## 4. Verification, checkpoint, and stopping (ALL phases)

### Per wave, before the checkpoint

```bash
cd react-site
node scripts/validate-reading.mjs bookN/rNN.js NN      # each touched reading
grep -Rn '—\|–' src/data/bookN/rNN.js                  # must return nothing
node --input-type=module -e "await import('./src/data/bookN/rNN.js')"  # import sweep
npm test                                                # 44+ tests, node:test
npm run build                                           # green
```

Render-check (dist does NOT work over `file://`):

```bash
cd dist && python3 -m http.server 4177 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --virtual-time-budget=9000 \
  --dump-dom "http://localhost:4177/index.html#/chapter/NN"
```

Grep the dump for `widget failed|undefined<|>null<|tex-error` (must be 0) **AND
assert distinctive expected content is present.** The marker grep alone is not
sufficient: a React render-throw produces a page with zero markers and no content.

The import sweep is not optional. An agent killed mid-edit leaves unescaped quotes
that the validator never gets the chance to see.

### The checkpoint (this is what makes context clears safe)

1. Update the ledger row for each reading: status, wave number, date.
2. Append durable learnings to `content-guidelines.md`; append flags to
   `content-flags.md`.
3. **`git commit`.** One commit per wave. Never leave a wave uncommitted.
4. Start the next wave immediately, without asking.

A cleared session loses at most one in-flight wave, because everything else is in
the ledger and in git.

### Stop conditions — the only reasons to stop

- The active phase is complete (advance the ledger header to the next phase, commit).
- A gate failed twice on the same reading.
- Context is running out. Finish the current wave, checkpoint, then report.

On stopping, the ledger MUST be accurate. An inaccurate ledger is worse than a
dead session: the next session trusts it and skips real work.

### House rules that still bind

- Fan-out agents NEVER run builds and NEVER run `git stash`/`reset` or any
  repo-wide git state change. The orchestrator builds and commits. (A content agent's
  stash/pop wiped four infra files on 2026-07-21.)
- At most 5 concurrent agents.
- Content comes from the Schweser source at the repo root. Never invent facts.
