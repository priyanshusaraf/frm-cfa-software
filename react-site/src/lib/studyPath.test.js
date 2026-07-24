import { test } from "node:test";
import assert from "node:assert/strict";
import { orderedReadings, buildBlocks } from "./studyPath.js";
import { overrides } from "../data/studyPath.js";

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

test("override table is small and well-formed", () => {
  assert.ok(Array.isArray(overrides));
  overrides.forEach((o) => {
    assert.ok(o.why && typeof o.why === "string", "every override has a reason");
    assert.ok(!/[—–]/.test(o.why), "no em/en dashes in reason copy");
    const isMove = "move" in o && "near" in o;
    const isCluster = Array.isArray(o.cluster) && o.name;
    assert.ok(isMove || isCluster, "entry is a move or a cluster");
  });
});

test("orderedReadings applies a move override", () => {
  const readings = [
    { n: 1, t: "a", hy: 3, deps: [] },
    { n: 2, t: "b", hy: 3, deps: [] },
    { n: 3, t: "c", hy: 3, deps: [] },
  ];
  const book = { n: 99, sessions: [{ name: "S", from: 1, to: 3 }], readings };
  const moves = [{ move: 3, near: 1, why: "study 3 right after 1" }];
  const out = orderedReadings({ books: [book] }, moves).map((r) => r.n);
  assert.deepEqual(out, [1, 3, 2]);
});

test("buildBlocks makes one block per Book 1 session", () => {
  const b1 = buildBlocks().filter((b) => b.bookN === 1);
  assert.deepEqual(
    b1.map((b) => b.readings),
    [[1, 2, 3, 4, 5, 6], [7, 8, 9], [10, 11, 12, 13, 14, 15, 16]]
  );
  assert.ok(b1.every((b) => b.kind === "schweser-session"));
  assert.ok(b1.every((b) => !/[—–]/.test(b.name)), "no dashes in block names");
});

test("buildBlocks lifts a curated cluster out of its sessions", () => {
  const cluster = buildBlocks().find((b) => b.kind === "curated-cluster");
  assert.ok(cluster, "a curated cluster block exists");
  assert.deepEqual(cluster.readings, [27, 28, 29]);
  // Those readings no longer appear in any schweser-session block.
  const sessionNums = buildBlocks()
    .filter((b) => b.kind === "schweser-session")
    .flatMap((b) => b.readings);
  assert.ok(![27, 28, 29].some((n) => sessionNums.includes(n)));
});

test("buildBlocks covers every reading exactly once", () => {
  const all = buildBlocks().flatMap((b) => b.readings);
  assert.equal(new Set(all).size, all.length);
  assert.equal(all.length, orderedReadings().length);
});
