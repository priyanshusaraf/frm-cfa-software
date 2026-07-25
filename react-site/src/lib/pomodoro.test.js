/* pomodoro.js imports store.js, which touches localStorage; node:test has no
   DOM, so stub it the way the other store tests do before importing. */
import { test } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};

const { advance, formatClock, phaseMinutes, phaseLabel, settings, FOCUS, BREAK, LONG_BREAK } =
  await import("./pomodoro.js");
const { POMODORO_DEFAULTS } = await import("./store.js");

const CFG = { focus: 25, brk: 5, longBrk: 15, cycles: 4 };

/* Must run before anything writes prefs: this is the only point in the suite
   where `prefs.pomodoro` is genuinely absent, which is what a first-run user has. */
test("settings() falls back to the defaults for a blob that has no pomodoro key", () => {
  assert.deepEqual(settings(), POMODORO_DEFAULTS);
});

test("a finished focus block leads to a short break until the cycle completes", () => {
  assert.equal(advance(FOCUS, 1, CFG), BREAK);
  assert.equal(advance(FOCUS, 2, CFG), BREAK);
  assert.equal(advance(FOCUS, 3, CFG), BREAK);
});

test("every cycles-th focus block earns the long break", () => {
  assert.equal(advance(FOCUS, 4, CFG), LONG_BREAK);
  assert.equal(advance(FOCUS, 8, CFG), LONG_BREAK);
  assert.equal(advance(FOCUS, 12, CFG), LONG_BREAK);
});

test("any break leads back to focus", () => {
  assert.equal(advance(BREAK, 2, CFG), FOCUS);
  assert.equal(advance(LONG_BREAK, 4, CFG), FOCUS);
});

test("advance falls back to the defaults when given no config", () => {
  assert.equal(advance(FOCUS, 4), LONG_BREAK);
  assert.equal(advance(FOCUS, 1), BREAK);
});

test("a zero count never triggers the long break", () => {
  assert.equal(advance(FOCUS, 0, CFG), BREAK);
});

test("phaseMinutes maps each phase to its configured length", () => {
  assert.equal(phaseMinutes(FOCUS, CFG), 25);
  assert.equal(phaseMinutes(BREAK, CFG), 5);
  assert.equal(phaseMinutes(LONG_BREAK, CFG), 15);
});

test("phaseLabel is human-readable for every phase", () => {
  assert.equal(phaseLabel(FOCUS), "Focus");
  assert.equal(phaseLabel(BREAK), "Short break");
  assert.equal(phaseLabel(LONG_BREAK), "Long break");
});

test("formatClock rounds up so the display never shows 00:00 with time left", () => {
  assert.equal(formatClock(25 * 60000), "25:00");
  assert.equal(formatClock(61000), "01:01");
  assert.equal(formatClock(1), "00:01");
  assert.equal(formatClock(0), "00:00");
  assert.equal(formatClock(-500), "00:00");
});
