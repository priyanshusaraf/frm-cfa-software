import { test } from "node:test";
import assert from "node:assert/strict";
import { activityByDay, streakInfo, heatmapGrid, dayKey } from "./consistency.js";

const DAY = 86400e3;
const NOW = new Date("2026-07-22T12:00:00").getTime(); // a Wednesday, so the current week has future cells
const d = (offset) => NOW - offset * DAY;

test("activityByDay unions the activity counter with derived timestamps", () => {
  const state = {
    activity: { [dayKey(d(1))]: 2 },
    quiz: { 26: { when: d(1) } },
    notes: [{ ts: d(0) }, { ts: d(0) }],
    mocks: [{ ts: d(3) }],
  };
  const c = activityByDay(state);
  assert.equal(c[dayKey(d(1))], 3, "2 explicit + 1 quiz");
  assert.equal(c[dayKey(d(0))], 2, "two notes today");
  assert.equal(c[dayKey(d(3))], 1);
});

test("streakInfo counts today-or-yesterday anchored consecutive days", () => {
  const counts = { [dayKey(d(0))]: 1, [dayKey(d(1))]: 1, [dayKey(d(2))]: 1, [dayKey(d(5))]: 1 };
  const s = streakInfo(counts, NOW);
  assert.equal(s.current, 3, "today + 2 back");
  assert.equal(s.activeDays, 4);
  assert.ok(s.longest >= 3);
});

test("streakInfo tolerates an idle today if yesterday was active", () => {
  const counts = { [dayKey(d(1))]: 1, [dayKey(d(2))]: 1 };
  assert.equal(streakInfo(counts, NOW).current, 2);
});

test("streakInfo current is 0 when the last activity is 2+ days ago", () => {
  const counts = { [dayKey(d(3))]: 1, [dayKey(d(4))]: 1 };
  assert.equal(streakInfo(counts, NOW).current, 0);
});

test("heatmapGrid returns weeks x 7 with future cells flagged", () => {
  const grid = heatmapGrid({ [dayKey(d(0))]: 5 }, NOW, 4);
  assert.equal(grid.length, 4);
  assert.ok(grid.every((col) => col.length === 7));
  const today = grid.flat().find((c) => c.key === dayKey(NOW));
  assert.equal(today.count, 5);
  assert.ok(grid.flat().some((c) => c.inFuture), "the tail of the current week is in the future");
});
