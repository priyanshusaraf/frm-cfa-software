# Execution prompt, run this to build the FRM Part II upgrade

Paste the block below as your first message in a fresh session to start execution. It is
self-contained: it points to every spec and plan, fixes the roles Opus and Sonnet play, and
sets the hard rules. Everything it references is already written and committed.

---

You are the ORCHESTRATOR for the FRM Part II learning app upgrade. Execute the committed plans
using subagent-driven development. Do not re-plan or re-brainstorm; the design work is done.

## Read these first (in order), then start

1. `GOAL.md` (repo root), the north star and execution model.
2. `react-site/CLAUDE.md`, the binding style guide (content, code, UI, verification). Obey it.
3. `PROGRESS.md` (repo root), where development stands.
4. `react-site/docs/superpowers/specs/2026-07-24-react-site-roadmap.md`, the phase order and
   dependency spine (read the 2026-07-24 part-2 addendum at the bottom).
5. `react-site/docs/superpowers/specs/2026-07-24-expansion-and-fixes-design.md`, the detailed
   spec for bug fixes, accounts/licensing, core-concept expansion, dashboard, content process.
6. The implementation plans in `react-site/docs/superpowers/plans/`:
   - `2026-07-24-phase-0_5-reading-flow-fixes.md` (DO THIS FIRST)
   - `2026-07-24-studypath-planner-slice.md` (Phase 0 planner, next)

## The mission

An interactive learning app for FRM Part II (5 books, 101 readings) that teaches better than
the source books. North star: extend to all levels of CFA and FRM, so build repeatable process,
not one-offs. Content is the sole retention driver and gets polished LAST, comprehensively.

## Execution model (non-negotiable)

- **Subagent-driven.** Use the superpowers:subagent-driven-development skill. One implementer
  subagent per task, taken ONE AT A TIME. After each task: an Opus task-review (spec compliance
  + code quality) before the task is accepted; route Critical/Important findings to a fix
  subagent, then re-review. Track progress in the ledger at `.superpowers/sdd/progress.md`.
- **Concurrency cap: at most 5 subagents at once, ever.** Hard token-control rule. Within
  subagent-driven-development, implementers still run serially (shared working tree); the cap
  matters for the later content/file fan-out phases where agents work on disjoint files.
- **Model roles:**
  - **Sonnet 5** does all implementation and functional-prose work in the feature/infra/bug
    phases: one issue per worker, from the plan's exact spec.
  - **Opus 4.8** reviews between tasks throughout, AND is the SOLE model for the final
    content-quality polish phase, one reading at a time, no Sonnet in that phase. Content gets
    the strongest model because it is the product.
  - Use the cheapest model that fits a given task for pure transcription; escalate to a more
    capable model on BLOCKED. Always specify the model explicitly when dispatching.
- **Orchestrator owns integration.** Subagents touch only their assigned files, NEVER run
  builds, and NEVER run `git stash` / `git reset` / any repo-wide git change (they share one
  tree). You (orchestrator) build, import-sweep, render-check, and commit after each wave.
- **Flag, do not fix, out of band.** Any phase before the final polish that notices improvable
  CONTENT appends it to `react-site/docs/superpowers/content-flags.md` instead of editing prose
  in place, so the Opus polish phase owns every prose change. During the polish phase, maintain
  the durable lessons file `react-site/docs/content-guidelines.md` (mistakes + fixes + what
  works) so future levels are cheaper.

## Phase order (full detail in the roadmap)

0.5 Reading-flow bug fixes and navigation (the "asap" pain). START HERE, plan already written.
0.  studyPath planner slice (cohesion spine). Plan already written.
1.  Infra: diagram-fidelity widgets (F) -> planner (G) -> Block Review engine (G) ->
    ReadingArc (9-B) -> `/concept/:slug` `layer` field (7.1 v2).
2.  Feature builds with functional Sonnet prose (flagged): securitization pages, case-study
    system (E, multiple real banks, beyond-exam labeled), session through-lines, core-concept
    expansion + prior-level revision, consistency dashboard.
3.  Core-concept hover-preview linking (wiki-style), the auto-detect fan-out.
4.  Flag consolidation into one worklist.
5.  Content-quality + human-tone polish, OPUS ONLY, one reading at a time: em-dash purge, tutor
    tone, why-depth, formula correctness, worked examples, real-life relevance, and the
    end-of-reading coverage rule (last third as carefully as the first). Build
    `content-guidelines.md` during this phase.
Post-launch (its own backend brainstorm-through-plan cycle before any code): accounts, free
trials, device licensing, and per-user data. Full spec in the expansion doc section 2. This
SUPERSEDES CLAUDE.md 7.3; the old device model there is OBSOLETE. Do not build until the
content polish has landed and the owner says go. The exact rules, owner-specified, do not
reinterpret:
  - No in-app payments (it scares buyers). Payment is collected out of band directly into our
    account; the software never renders a checkout. Access is provisioned manually / by a light
    admin flow once payment clears.
  - Free trial for new users (time-limited access on a fresh account; trial length and
    conversion are open questions for the backend brainstorm).
  - One account = one user id + password, usable from AT MOST 2 devices: one PRIMARY, one
    TEMPORARY.
  - Only ONE device active at a time. If a second device starts accessing while another is
    active, the active session is disabled, so two people cannot study concurrently on one login.
  - Temporary-device access is limited to a 2-HOUR window per use and allowed ONCE PER DAY. This
    is the core anti-sharing mechanism.
  - PRIMARY-device reassignment (for a genuine replacement/upgrade) is allowed AT MOST TWICE PER
    PLAN. After both are used, further changes require paying again or contacting sales.
  - Escape hatch is HUMAN, not automated: lost device / travel beyond the rules routes to a
    sales/support enquiry, not a self-service override.
  Infrastructure this repo does NOT have yet and this project must build:
  - A backend service with auth (user id + password) PLUS a device-binding signal beyond
    credentials (e.g. a server-issued per-device token), since credentials alone cannot enforce
    device counts or the single-active-session lock.
  - Server-side lease enforcement: one active lease per account, 2-hour temporary leases with a
    daily quota, a primary-reassignment counter per plan.
  - PER-USER DATA: each account gets its own persisted study state and its own database records,
    isolated per user and following them across their primary/temporary devices. This means
    MIGRATING the current single-user localStorage blob (`src/lib/store.js`) to a per-user,
    server-backed store with local caching, while preserving the existing export/import and the
    store's optional-key / spread-prev discipline. Open question for the brainstorm: how the
    local cache reconciles with the server store on a device switch.

## Hard content and code rules (from CLAUDE.md, enforce on every task)

- Ground ALL curriculum content in the Schweser source at the repo root. Never invent. The only
  sanctioned exception is clearly-labeled "beyond-exam / real-world" depth (core-concept pages,
  case-study real-bank data).
- NO em-dashes or en-dashes (`—`, `–`) anywhere in user-facing content. Context-appropriate
  rewrites, never a blind regex. Gate: `grep -Rn '—\|–' <file>` returns nothing.
- Human tutor tone; teach the trap; supply the causal mechanism for counterintuitive claims;
  concrete numbers; quiz whys never reference option letters (options shuffle).
- `src/lib/meta-data.js` is the single source of structure; derive, never hardcode. Store keys
  are optional + spread-prev + stable-identity selectors (object-building selectors cause React
  #185). Colors via CSS variables only.

## Verification (per CLAUDE.md section 4, run after every wave)

- `npm run build` green, zero new warnings.
- `node scripts/validate-reading.mjs bookN/rNN.js NN` after any content edit; import-sweep every
  touched data file.
- Render-check over `http://localhost:4177` (dist does NOT work over `file://`): headless Chrome
  dump-dom, `grep -c 'widget failed\|undefined<\|>null<\|tex-error'` must print 0.
- Interactive behavior (scroll stability, drag, hover, toasts) CANNOT be verified headless. Flag
  those for the human's manual check; never claim them verified.

## Two decisions already locked (do not re-ask)

- "Next reading" marks the just-finished reading DONE (flows into progress/streaks/planner).
- The new global "Return to Reading N" button REPLACES the old per-page back link on concept
  pages.

## Start now

Confirm you have read the six documents, then begin Phase 0.5 Task 1 via
subagent-driven-development. Work continuously through the plan; only stop for a genuine blocker,
a real ambiguity, or plan completion. Update `PROGRESS.md` and the ledger as tasks land.
