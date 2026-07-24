# Content-run sequencing and context-clear survival

Written 2026-07-25 (sixteenth session), brainstormed with the owner. This spec fixes the
ORDER of the remaining work and the MACHINERY that lets it survive frequent full context
clears. It does not re-specify any feature; it sequences what is left and defines how a
cleared session resumes without the owner explaining anything.

Companion files (operational, updated as work proceeds):
- `../content-run-ledger.md` — the position of the run (active phase + 101 per-reading rows).
- `../content-run-protocol.md` — the exact per-wave procedure.
- `../content-guidelines.md` — the durable, self-improving style playbook.
- `../content-flags.md` — the transient worklist.

## Decisions locked in this brainstorm (do not re-litigate without asking)

1. **Content comes LAST.** UI and functionality land first. This preserves the master
   roadmap's locked decision 1. The only unbuilt feature is Phase 3 hover linking, so the
   order is: Phase 3 -> UI sweep -> content clearance -> content improvement.
2. **Sonnet edits prose directly in the clearance run.** This **REVERSES the master
   roadmap's locked decision 3** ("flag-as-you-go; the Phase 5 pass owns every prose
   change"). Sonnet now fixes five specific classes of defect in place. Everything outside
   those five is still flagged, not rewritten.
3. **Sonnet's mandate is a CLOSED list of five items**: em/en-dash purge, AI-isms and
   meta-references, factual/directional errors, missing WHY on counterintuitive claims,
   and quiz repair. Full detail in the protocol. The boundary is the point: this is an MVP
   clearance, not a rewrite.
4. **Two distinct Opus roles, not one.**
   - **Opus-A**, a gate after every wave of 5: verify sense, dashes, and UI/render, then
     write what it learned into `content-guidelines.md` so the next wave is better. It
     verifies; it does not rewrite.
   - **Opus-B**, after all 101 are cleared: improve explanations that are genuinely worth
     improving.
5. **For Opus-B, "leave it alone" is a valid and frequently correct verdict.** Owner
   directive: the baseline content is already good enough to learn from. If a student
   would understand it as written, it ships as written. Rewriting adequate prose is a
   defect in that phase, not diligence.
6. **The Sonnet clearance is the most important run**, not the Opus improvement pass. The
   owner also reviews content personally; Opus-B is one contributor to quality, not the
   arbiter of it.
7. **The resume prompt is the literal word "continue".** The owner will not paste a file.
   Therefore the resume contract lives at the top of the root `CLAUDE.md`, which is loaded
   into every session automatically. A standalone `RESUME.md` was considered and rejected:
   a file nobody pastes is dead weight and rots silently.
8. **Sessions self-drive between waves.** The owner says "continue" and lets it run. A
   session works waves back to back and stops only on the protocol's stop conditions.

## Why the ordering changed shape

The owner's two statements looked contradictory and are not. "The most important run is
Sonnet's modification right now" is about IMPORTANCE. "Content comes last, everything else
UI and functionality first" is about ORDER. Content is simultaneously the highest-value
work and the last work scheduled, exactly as the master roadmap already had it: every
surface must exist before the prose that fills it is finalized, or the prose gets polished
twice.

One concrete reason the order matters here: Phase 3 hover linking anchors on stable concept
NAMES inside reading prose. Running it before the content pass is safe because the content
pass may rewrite sentences but does not rename concepts. Running it after would mean
re-scanning a corpus that had just been edited.

## Architecture of the resume machinery

Three files, one job each. The separation is deliberate: the file that pays token rent on
every session is tiny, and the detailed one is read only when actually working.

| File | Job | Read when | Written by |
|---|---|---|---|
| root `CLAUDE.md` block | Resolve the word "continue" into an action | Every session, automatically | Once (this spec) |
| `content-run-ledger.md` | Active phase + per-reading position | Session start, every wave | Every wave |
| `content-run-protocol.md` | The exact procedure per phase | Wave start | Rarely |
| `content-guidelines.md` | Durable learnings across waves | Before editing content | Opus-A, every gate |

`PROGRESS.md` drops to phase-level summary only. It proved unreliable at reading-level
granularity: a 2026-07-25 audit found it listing three Phase 2 items as outstanding that
had in fact shipped. Reading-level truth now lives in the ledger, which is mechanical.

### Why this survives a context clear

Position is **derived, not remembered**: the first ledger row whose active-phase column is
`todo`. A cleared session recomputes it in one file read and needs to know nothing about
what came before.

Durability comes from the checkpoint rule: **one wave = 5 readings = verify + ledger update
+ one git commit.** A session that dies mid-wave loses at most 5 readings of uncommitted
work. Nothing is ever left half-done across a clear, because a wave is never left
uncommitted.

The failure mode this design most guards against is **an inaccurate ledger**, which is
worse than a dead session: the next session trusts it and skips real work. Hence the
protocol's rule that a reading is marked `done` only after verification, and that stopping
for any reason requires leaving the ledger accurate.

## Verification standard (unchanged, restated because it is easy to get wrong)

Per wave: validator per file, zero-dash grep per file, import sweep per file, `npm test`,
`npm run build`, then a headless render-check per touched chapter.

Two traps, both previously hit in this repo:
- **The render-check must assert expected content is PRESENT**, not merely that failure
  markers are absent. A React render-throw yields a page with zero markers and no content.
- **Tests are `node:test`, not vitest.** `npm test` runs them (44 passing). `npx vitest run`
  reports seven files as broken suites, which is a false alarm.

## Out of scope

Unchanged from the master roadmap: the phone-first M1-M7 card-deck slate, and accounts /
device licensing / payments (needs a backend that does not exist). Neither is reopened
here; the owner confirmed Phase 3 is the only pre-content build.
