/* Store mutators touch localStorage; node:test has no DOM, so stub it the way
   the other store tests do before importing the module. */
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};

const {
  getState, setHydrationReminder, setReminderMinutes, setPomodoroPrefs, incPomodoroCompleted,
  REMINDER_MIN, REMINDER_MAX, POMODORO_DEFAULTS,
} = await import("./store.js");

/* store.js keeps an in-memory cache, so clearing the localStorage stub alone
   does not reset state between tests: reset through the mutators. */
beforeEach(() => {
  mem.clear();
  setReminderMinutes(null);
  setPomodoroPrefs(POMODORO_DEFAULTS);
});

test("reminders read as ON when the key has never been written", () => {
  const s = getState();
  assert.equal(s.prefs ? s.prefs.hydrationReminder !== false : true, true);
});

test("the reminder toggle round-trips both ways", () => {
  setHydrationReminder(false);
  assert.equal(getState().prefs.hydrationReminder, false);
  setHydrationReminder(true);
  assert.equal(getState().prefs.hydrationReminder, true);
});

test("setReminderMinutes round-trips a normal value", () => {
  setReminderMinutes(30);
  assert.equal(getState().prefs.reminderMinutes, 30);
});

/* Clamped in the STORE, not just the UI: an imported or hand-edited blob must
   not be able to restore an interval that never fires. */
test("setReminderMinutes clamps out-of-range values", () => {
  setReminderMinutes(9999);
  assert.equal(getState().prefs.reminderMinutes, REMINDER_MAX);
  setReminderMinutes(1);
  assert.equal(getState().prefs.reminderMinutes, REMINDER_MIN);
});

test("setReminderMinutes accepts a numeric string from the input field", () => {
  setReminderMinutes("37");
  assert.equal(getState().prefs.reminderMinutes, 37);
});

test("garbage clears the key so the default takes over", () => {
  setReminderMinutes(30);
  setReminderMinutes("abc");
  assert.equal(getState().prefs.reminderMinutes, undefined);
});

test("setReminderMinutes does not disturb the on/off toggle", () => {
  setHydrationReminder(false);
  setReminderMinutes(60);
  assert.equal(getState().prefs.hydrationReminder, false);
  assert.equal(getState().prefs.reminderMinutes, 60);
});

test("pomodoro durations round-trip and clamp per key", () => {
  setPomodoroPrefs({ focus: 50, brk: 10 });
  assert.equal(getState().prefs.pomodoro.focus, 50);
  assert.equal(getState().prefs.pomodoro.brk, 10);
  setPomodoroPrefs({ focus: 999, brk: 0 });
  assert.equal(getState().prefs.pomodoro.focus, 90);
  assert.equal(getState().prefs.pomodoro.brk, 1);
});

test("unknown pomodoro keys are ignored rather than persisted", () => {
  setPomodoroPrefs({ bogus: 5 });
  assert.equal(getState().prefs.pomodoro.bogus, undefined);
});

test("the completed counter increments without touching the durations", () => {
  setPomodoroPrefs({ focus: 30 });
  incPomodoroCompleted();
  incPomodoroCompleted();
  assert.equal(getState().prefs.pomodoro.completed, 2);
  assert.equal(getState().prefs.pomodoro.focus, 30);
});

/* The read pattern every consumer uses must always yield a COMPLETE config,
   whatever subset of keys an older blob happens to carry. */
test("the documented merge always produces a complete config", () => {
  setPomodoroPrefs({ focus: 30 });
  const c = { ...POMODORO_DEFAULTS, ...getState().prefs.pomodoro };
  assert.equal(c.focus, 30);
  for (const k of Object.keys(POMODORO_DEFAULTS)) {
    assert.equal(typeof c[k], "number", k + " missing from the merged config");
  }
});
