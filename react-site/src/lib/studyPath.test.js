import { test } from "node:test";
import assert from "node:assert/strict";
import { orderedReadings } from "./studyPath.js";

test("orderedReadings returns every reading exactly once", () => {
  const out = orderedReadings();
  const nums = out.map((r) => r.n);
  assert.equal(new Set(nums).size, nums.length, "no duplicates");
  assert.ok(nums.includes(1) && nums.includes(16), "book 1 covered");
});

test("orderedReadings keeps each session contiguous and book-ordered", () => {
  const out = orderedReadings().filter((r) => r.book.n === 1).map((r) => r.n);
  // Book 1 sessions: 1-6, 7-9, 10-16. Each block stays together, in that order.
  assert.deepEqual(out, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

test("orderedReadings honors intra-session deps over ascending n", () => {
  // Synthetic session where n-order violates deps: 9 depends on 8, but list them 9 then 8.
  const readings = [
    { n: 9, t: "B", hy: 3, deps: [8] },
    { n: 8, t: "A", hy: 3, deps: [] },
  ];
  const book = { n: 99, sessions: [{ name: "S", from: 8, to: 9 }], readings };
  const out = orderedReadings({ books: [book] }).map((r) => r.n);
  assert.deepEqual(out, [8, 9]);
});
