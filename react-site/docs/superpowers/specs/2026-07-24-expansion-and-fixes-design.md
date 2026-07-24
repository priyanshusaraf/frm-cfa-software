# Expansion and fixes design (2026-07-24, part 2)

Written 2026-07-24 (fourteenth session, second half), brainstormed with the owner. Captures a
batch of new requirements: near-term reading-flow bug fixes and navigation, the account /
free-trial / device-licensing layer (which SUPERSEDES CLAUDE.md §7.3), core-concept expansion
with prior-level revision and thorough Wikipedia-style hover previews, a GitHub-style
consistency dashboard, and the content process (`content-guidelines.md` plus the end-of-reading
coverage rule). Sequencing into the master plan is in
`2026-07-24-react-site-roadmap.md` (see its addendum). North star and execution model:
`../../../GOAL.md`.

Each section is scoped enough to become its own implementation plan. Where a design call was
mine rather than the owner's, it is marked **Assumption** for review.

---

## 1. Reading-flow fixes and navigation (near-term, bugs are "asap")

These degrade daily use now, so they run early, not at the end. They cluster around scroll
behavior and reading-to-reading navigation, so they share a section and can share a plan.

### 1.1 Scroll stability when expanding a concept (bugs, items 7 and 8)

**Symptom (owner).** Expanding a concept makes the page "randomly scroll a little down" instead
of staying put. It happens with the PDF split view open, and also without any PDF open on the
concept-hierarchy section. This class of small scroll jumps is common across the site.

**Desired behavior.** Expanding or collapsing any accordion, concept card, or hierarchy node
never moves the scroll position. The thing the user clicked stays exactly where it is under the
cursor; content grows downward below it.

**Likely causes to investigate (use systematic-debugging at implementation time, do not assume).**
- `src/lib/scrollAnchor.js` restores an anchored paragraph on reflow; an accordion expand is a
  reflow, so the anchor restore may be fighting the natural expand and nudging the viewport.
  The anchor logic was built for resize / font-scale / split-pane reflows, not in-content
  expands, and may need to ignore reflows whose origin is a user click inside the content.
- Radix Accordion / a focused element calling `scrollIntoView` on open.
- `html { scroll-behavior: smooth }` animating a programmatic correction (already a known
  gotcha in scrollAnchor.js; check every other programmatic scroll for the same).

**Approach.** Reproduce headfully first (the owner's report is the repro). Add a guard so
content-internal expand/collapse reflows do not trigger an anchor restore or any `scrollIntoView`.
Prefer preserving the clicked element's viewport-relative top explicitly around the expand
(measure top before, restore `scrollBy` delta after, `behavior: "instant"`).

**Acceptance.** With and without the split pane open, expanding the first, a middle, and the last
concept in a long reading leaves the clicked header's screen position unchanged (measured, not
eyeballed: its `getBoundingClientRect().top` is stable within 2px across the expand).

### 1.2 Homepage / high-yield reading links open at the top (bug, item 9)

**Symptom (owner).** Clicking a 5-star reading from the homepage lands at a saved scroll
position mid-reading instead of the top.

**Desired behavior.** Opening a reading from any discovery surface (homepage high-yield list,
book page, search, glossary, mind map) starts at the TOP of the reading. Only the explicit
"Continue studying" affordance restores the last scroll position.

**Root-cause direction.** Resume is meant to be opt-in via router `state.resume` (set only by the
Continue-studying cards, per PROGRESS.md seventh session). Either a discovery link is passing
resume state, or `Chapter.jsx` restores from `lastVisited` without requiring `state.resume`.
Fix: `Chapter.jsx` restores scroll ONLY when `state.resume` is truthy AND `lastVisited.rn`
matches the target; every other entry scrolls to top on mount. Audit all `<Link to={rpath(n)}>`
call sites to confirm none leak resume state.

**Acceptance.** From the homepage 5-star list, a book page, and search, the reading opens with
`window.scrollY === 0`. From a Continue-studying card, it still restores the saved position.

### 1.3 "Return to your reading" button (item 10)

**Desired behavior (owner).** A small button in the **top-left corner** that takes the student
back to the reading they were last on and have NOT marked complete. It must survive nesting: if
they leave a reading to open a core-concept page, then follow a link from that concept to another
concept, the button still points back to the original reading, so they never lose their place.

**Model.**
- Store a single `nav.activeReading` value: the reading number the student is currently working
  through. It is SET when a `/chapter/:rn` for a not-done reading mounts. It is CLEARED when that
  reading is marked done, or when "Next reading" is used (see 1.4), or when the student opens a
  DIFFERENT not-done reading (the new one becomes active).
- Navigating to non-reading pages (`/concept/:slug`, `/revision/...`, `/concepts`, glossary,
  etc.) does NOT change `nav.activeReading`. It only gets overwritten by opening another actual
  reading.
- The button renders globally (in the app shell) whenever `nav.activeReading` is set AND the
  current route is not that reading. Label: "Return to Reading {n}". Clicking navigates to
  `rpath(n)` with `state.resume` so they land where they left off inside it.

**Assumption.** This generalizes and replaces the §6 "Back to reading" button (which only worked
from concept pages via `state.fromReading`). The new `nav.activeReading` model is strictly more
capable, so §6's per-page button is removed in favor of the global one. Confirm.

**Store shape.** New optional key `nav: { activeReading: number|null }`, spread-prev, stable
selector (return the raw number, default outside the selector).

**Acceptance.** Open reading R28 (not done), navigate to a concept page, follow a link to a second
concept page: the top-left button reads "Return to Reading 28" the whole time and returns there.
After marking R28 done, the button disappears.

### 1.4 "Next reading" clears the previous (item 11)

**Desired behavior (owner).** "assume that whenever the button of next reading is clicked at the
bottom of the page that the reading before was cleared." Clicking the bottom-of-page "Next
reading" button marks the reading just finished as done (so it is cleared as the
`nav.activeReading` back-target) and advances to the next reading, which becomes the new active
reading.

**Assumption.** "Cleared" means marked done via the existing done-toggle store mutation (so it
also updates progress, planner, and streaks consistently), not merely removed from the nav
pointer. Confirm; if the owner wants "advance without marking done," we only clear the pointer.

**Acceptance.** On R28, clicking bottom "Next reading" sets R28 done, navigates to the next
reading in plan order (per studyPath), and the return button now tracks the new reading.

### 1.5 Hydration-break reminder (item 12)

**Desired behavior (owner).** Every 45 minutes, remind the student to take a quick hydration
break.

**Approach.** A lightweight timer in the app shell that, after 45 minutes of an active study
session (reset on load; paused when the tab is hidden via `visibilitychange`), shows a small,
dismissible, non-blocking toast ("Time for a water break. Stretch, hydrate, back in a minute.").
NOT a browser dialog (those block the page). Re-arms for the next 45 minutes on dismiss.

**Assumption / setting.** Add a Settings toggle `prefs.hydrationReminder` (default ON) and keep
the 45-minute interval fixed for v1. Confirm whether the interval should be user-configurable.

**Acceptance.** With a shortened test interval, the toast appears once per interval, is
dismissible, does not steal focus or block interaction, and pauses while the tab is backgrounded.

### 1.6 Formatting cleanup, including em-dashes in book blurbs (item 6)

**Symptom (owner, Image #3).** The Book 4 blurb shows an em-dash ("... balance sheet, deposits,
repos, transfer pricing, ALM" was "... balance sheet — deposits ..."). Em-dashes and general
formatting issues exist beyond the reading content fields.

**Scope.** Extend the em-dash / en-dash purge to `src/lib/meta-data.js` (book `blurb`, `why`,
`prereqs`, `feeds`, `tag`, session names, thread and graph labels) and any other user-facing
strings outside `src/data`. Sweep for other formatting issues (stray double spaces, inconsistent
quote characters, unbalanced parentheses) in the same pass.

**Note.** This is a targeted formatting sweep, distinct from the Opus content-polish phase. It can
run early and mechanically (still context-appropriate rewrites for dashes, never a blind regex),
because META strings are short and structural. Gate: `grep -Rn '—\|–' src/lib/meta-data.js`
returns nothing.

---

## 2. Accounts, free trials, and device licensing (SUPERSEDES CLAUDE.md §7.3)

Late-stage, near launch, after the content polish. Needs a backend, a database, auth, and
per-user data that this local-storage-only repo does not have. Scoping now captures the exact
business rules before they are forgotten; building is its own large project with its own
brainstorm-through-plan cycle.

**This section replaces the CLAUDE.md §7.3 rule set.** The old §7.3 (two concurrent primary
devices "computer + phone", 4-hour window, 2-day lockout, reassignment once per 7 days) is
OBSOLETE. The rules below are the current, authoritative device model.

### 2.1 Business rules (owner-specified 2026-07-24, do not reinterpret without re-confirming)

- **No in-app payments.** Collecting card details in-app scares buyers away. Payment is taken
  out of band, directly into our account; the software never renders a checkout. Access is
  provisioned manually or via a lightweight admin flow once payment clears.
- **Free trial.** New users can start a free trial (mechanism TBD: time-limited access on a fresh
  account). Confirm trial length and what converts a trial to paid.
- **One account = one user id + password.** An account may be used from **at most 2 devices**: one
  **primary** device and one **temporary** device.
- **Only one device active at a time.** If a second device begins accessing while another is
  active, the currently-active session is disabled (locked out) so two people cannot study
  concurrently on one account.
- **Temporary-device access is limited to a 2-hour window per use, and is allowed once per day.**
  This is the core anti-sharing mechanism: a borrowed or shared login gets at most two hours a
  day, never concurrent with the primary user.
- **Primary-device reassignment is allowed at most twice per plan** (for a genuine device
  replacement or upgrade). Once both reassignments are used, further changes require paying again
  or contacting sales.
- **Escape hatch is human, not automated.** Legitimate edge cases (lost device, travel beyond the
  rules) route to a sales/support enquiry, not a self-service override.

### 2.2 What this requires (infrastructure the repo lacks today)

- A backend service with an auth layer (user id + password) and a **device-binding signal beyond
  credentials** (e.g. a server-issued per-device token), because credentials alone cannot enforce
  device counts or single-active-session.
- Server-side session/lease enforcement: a single "active lease" per account, temporary-device
  2-hour leases with a daily quota, primary-reassignment counter per plan.
- **Per-user data.** Each user gets their own persisted study state (the store blob today) and
  their own database records, so progress is isolated per account and can follow them across their
  primary/temporary devices. This means migrating the current single-user `localStorage` blob into
  a per-user, server-backed store with local caching, while preserving the existing
  export/import and the store's optional-key / spread-prev discipline.

### 2.3 Open questions for the design cycle (do not build yet)

Trial length and conversion; exactly how access is provisioned after out-of-band payment (admin
panel vs manual token issuance); how "active" is defined for the single-session lock (heartbeat
interval, grace period on network drops); how the local cache reconciles with the server store
on device switch. These are for the dedicated backend brainstorm, flagged here so nothing is lost.

---

## 3. Core-concept expansion, prior-level revision, and thorough hover previews (item 5)

**Owner assessment.** The core-concept system is "very much in its origin state." Two expansions:

### 3.1 Prior-level concept revision

**Idea (owner).** Help students revise concepts from EARLIER levels of the same track that a
reading silently assumes. The example given: a section revising the CFA Level I concepts that a
reading depends on. For FRM Part II specifically the prior level is FRM Part I (and, for students
crossing over, CFA fundamentals). This is the cross-LEVEL cousin of §7.1's within-course
foundational revision.

**Approach.** Extend the §7.1 v2 revision-page mechanism (the `/concept/:slug` page with a
`layer` field) with a `layer: "prior-level"` variant. A reading declares the prior-level concepts
it assumes (new optional field, e.g. `assumes: [{ concept, level: "CFA L1" | "FRM P1", why }]`),
and those surface as a revision refresher linked from the reading and, later, on the
prior-level revision page. Prior-level content MAY go beyond the current book's source (it is
foundational, not exam-scope for THIS level), labeled like the §6 beyond-exam layer.

**Fit with the north star.** This is exactly the machinery that makes multi-level expansion pay
off: once CFA L1 revision pages exist, the CFA L1 PRODUCT can reuse them, and vice versa. Design
the concept store so a concept authored once is shareable across levels.

### 3.2 Thorough Wikipedia-style hover previews (Image #2)

**Idea (owner).** A term shown with a dotted underline that, on hover (desktop) or tap (mobile),
pops a small card reminding the reader what the concept is, with a link to the full page. Exactly
the Wikipedia hovercard in Image #2. This is CLAUDE.md §6 Phase 3, which "has not been done
thoroughly."

**Approach.** Implement §6 Phase 3 as its own fan-out: auto-detect reused core-concept names in
prose (the `lib/related.js` keyword-match style), wrap them in a dotted-underline component, and
show a Radix HoverCard/Popover with an auto-generated snippet plus a "Learn more" link to
`/concept/:slug`. Must include the mobile tap fallback (hover does not exist on touch). Extend the
same treatment to prior-level concepts (3.1), so an assumed CFA L1 / FRM P1 term is hoverable too.

**Sequencing note.** Phase 3 anchors on stable concept names, so it still runs after the feature
builds and near the content work, per the roadmap. But the CONTENT of the concept pages (the
thing the hover links into) must be expanded first, which is what 3.1 and the §6/§7.1 page work
provide.

**Acceptance.** A reused concept name in a reading shows a dotted underline; hover opens a snippet
card with a working "Learn more" link; tap does the same on a touch viewport; a prior-level term
opens its revision snippet.

---

## 4. Consistency and pace dashboard (item 4, Image #1)

**Idea (owner).** A GitHub-contributions-style dashboard so a student can track progress in a
motivating way: a calendar heatmap of daily study activity plus pace and consistency metrics.

**Late-stage** (near launch, after content), but purely local and low-risk, so it can also slot
earlier if desired.

**Data.** Derived entirely from timestamps already in the store (reading completions, quiz
attempts, mock sittings, SRS reviews, `lastVisited.ts`). Add a lightweight per-day activity
counter if the existing timestamps are too sparse (new optional store key
`activity: { [yyyy-mm-dd]: count }`, incremented on any study action, spread-prev).

**Surface.** A new lazy `/dashboard` (or a section on `/progress`) with:
- a 52-week heatmap grid (weekday rows, month labels, "Less/More" legend) matching the GitHub
  look, colored with the theme's accent scale via CSS variables (no hex literals);
- current streak, longest streak, days active, and a pace line ("on track / behind" vs the
  planner window, honest, no invented pass-probability);
- readings-per-week and a simple consistency score (active days / elapsed days).

**Acceptance.** The heatmap renders a full year, light and dark themes both legible, cells reflect
real study timestamps, streak counts are correct across a spot-checked date range, and the page
has a teaching empty state for a brand-new account.

---

## 5. Content process: `content-guidelines.md` and end-of-reading coverage (items 2, 3)

### 5.1 `content-guidelines.md`, the living playbook (item 2)

**Idea (owner).** While content is being edited (the Opus polish phase, and any content build
before it), maintain a `content-guidelines.md` that records the mistakes we have made and how we
are fixing them, so future models entering content for the next level never repeat them. It also
records methods that demonstrably work for learners. This is the artifact that makes multi-level
expansion smooth (north star).

**Where it lives.** `react-site/docs/content-guidelines.md` (product-facing content process),
referenced from CLAUDE.md. Distinct from `content-flags.md` (a transient per-reading worklist);
guidelines is the DURABLE lessons file.

**How it is built.** The Opus polish phase is instructed to append to it as it works: each real
defect class found (e.g. the Vasicek sign error, the r63 why-depth gap, the front-loaded-summary
problem in 5.2), with the rule that prevents it. Graphics/diagram and resource-accumulation
bottlenecks hit during this build get written up with the smoother method we adopted, so the next
level's graphics and sourcing are faster.

**Seed contents (from lessons already on record).** Ground content in source, never invent; the
beyond-exam labeling exception; no em/en-dashes and the human-tutor tone; teach the trap; supply
the causal mechanism for counterintuitive claims; formula-plain-language must match the equation
(the sign-error class); quiz whys never reference option letters (shuffled); widget names must be
registered; end-of-reading coverage (5.2).

### 5.2 End-of-reading coverage rule (item 3)

**Symptom (owner).** Summaries and the "explain it simply" (`eli5`) sections focus heavily on the
early parts of a reading and rush or omit the end.

**Rule (added to CLAUDE.md content doctrine and to `content-guidelines.md`).** Every `summary` and
every `eli5` must cover the reading end to end, proportionally: the last third of a reading's
material gets the same care as the first. The Opus polish pass explicitly checks that the final
sections, formulas, and concepts of each reading appear in its summary and eli5, and rewrites any
that taper off early. This becomes an acceptance check in the content pass, not just advice.

---

## Phase placement (summary; full order in the roadmap addendum)

- **Near-term, before the big build:** section 1 (reading-flow fixes and navigation), section 1.6
  (formatting/dash sweep of META). These fix daily-use pain and are cheap.
- **Within the feature build (roadmap Phase 1 or 2):** section 4 dashboard (local, low-risk, may
  slot earlier), section 3 core-concept expansion and prior-level revision content (functional
  prose written here, polished at the end); §6 Phase 3 hover previews stay in their existing late
  slot after feature builds.
- **Content polish phase (Opus only):** section 5 (`content-guidelines.md` built during it, the
  end-of-reading coverage rule enforced by it).
- **Near launch, after polish:** section 2 accounts / trials / device licensing (its own backend
  brainstorm-through-plan cycle).
