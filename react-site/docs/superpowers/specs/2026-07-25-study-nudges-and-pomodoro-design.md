# Study nudges + Pomodoro — design

Date: 2026-07-25. Owner-approved (brainstorm, same day). Supersedes the plain
`HydrationReminder` toast shipped earlier.

## The reported defect

"Study reminders button doesn't work." The root cause is not the store: `setHydrationReminder`
saves correctly and `useStore` re-renders. **`.chip.active` is not defined anywhere in the
CSS.** `style.css` styles `.chip` and `a.chip:hover` only, so a selected chip is pixel-identical
to an unselected one and a `button.chip` does not even get a pointer cursor. The same latent
bug affects every filter-chip row in the app: Bookmarks, Drills, Highlights, Glossary.

The preference was already on by default (`s.prefs.hydrationReminder !== false`). It only ever
*looked* off, and the 45-minute delay meant nothing visibly happened either way.

## What ships

### A. Chip states (the fix)

`.chip.active` (accent border, accent text, `--accent-soft` fill), `button.chip`
(`cursor: pointer`, `font: inherit`, hover shift), `.chip:focus-visible`. `aria-pressed` on
the Settings toggles. One CSS block repairs five pages.

### B. Nudge engine — `src/lib/nudges.js`

Pure module, no React, unit-tested. `NUDGES` is an array of

```
{ id, prop, weight, text, action?: {label, to} | {label, href}, when?: (ctx) => bool }
```

- `prop` names the mascot accessory (`water`, `coffee`, `chocolate`, `pushups`, `music`,
  `tip`, `focus`, `heart`, `spark`).
- `when(ctx)` gates contextual nudges on `{ rn, minutes, path }`.
- `pickNudge(ctx, recentIds, rand)` filters by `when`, drops anything in `recentIds`, and
  draws by `weight`. `rand` is injected so the test is deterministic. Feature-discovery
  nudges carry a low weight so they cannot dominate the rotation.

Copy follows the §1 prose hard rules: no em/en-dashes, plain warm tutor voice.

### C. `StudyNudge.jsx` (replaces `HydrationReminder.jsx`)

Keeps the foreground-only accumulation (paused while `document.hidden`, so a backgrounded tab
does not bank time). The interval now reads `prefs.reminderMinutes`, default 45. The toast
gains the mascot, an optional action button, and a ~25s auto-hide alongside the manual
dismiss. Still a toast, never `alert`/`confirm`, never blocking.

`showNudge(nudge)` is exported as an imperative escape hatch so the Settings "Preview" button
and the Pomodoro phase transitions can surface a toast without duplicating the component.

### D. `BrainMascot.jsx`

One inline SVG brain, ~56px, with an idle loop (breathe + blink) and a swappable prop layer.
Colours come from CSS variables only, so both themes work. Animation is CSS keyframes, no JS
loop and no rAF. `@media (prefers-reduced-motion: reduce)` freezes every animation.

### E. Pomodoro

- **`src/lib/pomodoro.js`** — runtime state (`phase`, `endsAt`, `running`) is **session-only**,
  following `lib/fullscreen.js`'s precedent. A persisted `endsAt` would reload into a timer
  that expired hours ago with no clean recovery. Settings and the lifetime completed count
  persist on the user blob instead. Phase advance (`advance()`) is a pure function over
  `(phase, cycleCount, settings)` so it can be unit-tested without timers.
- **`PomodoroPill.jsx`** — corner pill mounted in `Shell`, class hook `pomo-fab` so
  `html[data-fullscreen]` hides it exactly like `.qn-fab`. Renders nothing until a session
  starts. Sits above the QuickNotes FAB, not on top of it.
- **`/pomodoro`** — lazy route, Study-menu entry, `CommandPalette` PAGES entry. Big timer,
  focus/break/long-break lengths, cycles-before-long-break, completed count.
- Phase transitions surface a nudge toast rather than a browser notification: no permission
  prompt, and consistent with "never blocks the page".

### F. Store

New optional `prefs` keys, treated as absent-tolerant on read per the iron rules:

```
prefs: { hydrationReminder, reminderMinutes, pomodoro: { focus, brk, longBrk, cycles, completed } }
```

`setReminderMinutes(n)` clamps 5..240 **in the store**, not only in the UI, so an imported
blob cannot restore an unusable interval (the lesson from the `setSplitZoom` regression).
`setPomodoroPrefs(patch)` clamps each duration. `incPomodoroCompleted()` bumps the counter.

### G. Settings

The "Study reminders" section gains a working On/Off, interval preset chips
(20/30/45/60/90) plus a custom minutes field, and a **"Preview a nudge"** button so the
control gives immediate feedback instead of a 45-minute wait. A Pomodoro subsection links to
the page.

## Verification

`node --test src/lib/*.test.js` (new: `nudges.test.js`, `pomodoro.test.js`,
`store.prefs.test.js`), `npm run build`, and a headless render-check of `/settings` and
`/pomodoro` that asserts real DOM content, not merely the absence of failure markers.

Not headless-verifiable and flagged rather than claimed: the toast's timed appearance, the
mascot animation, and the pill's live countdown.
