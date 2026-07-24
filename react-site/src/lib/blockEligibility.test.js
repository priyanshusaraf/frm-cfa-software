import { test } from "node:test";
import assert from "node:assert/strict";
import { blockEligibility, blockForReading } from "./blockEligibility.js";

const blocks = [
  { id: "b1-1", name: "Block A", bookN: 1, readings: [1, 2, 3] },
  { id: "b1-4", name: "Block B", bookN: 1, readings: [4, 5] },
];

test("blockEligibility: allDone true only when every reading in the block is done", () => {
  const done = { 1: true, 2: true }; // 3 missing
  const out = blockEligibility(blocks, done);
  assert.equal(out.length, 2);
  assert.equal(out[0].allDone, false);
  assert.equal(out[1].allDone, false);
});

test("blockEligibility: allDone true when every reading is done, false for a partially done block, and preserves input order", () => {
  const done = { 1: true, 2: true, 3: true };
  const out = blockEligibility(blocks, done);
  assert.equal(out[0].block, blocks[0]);
  assert.equal(out[0].allDone, true);
  assert.equal(out[1].block, blocks[1]);
  assert.equal(out[1].allDone, false);
});

test("blockEligibility: lastReading is the last element of block.readings", () => {
  const out = blockEligibility(blocks, {});
  assert.equal(out[0].lastReading, 3);
  assert.equal(out[1].lastReading, 5);
});

test("blockEligibility: empty done map means allDone false for every block", () => {
  const out = blockEligibility(blocks, {});
  assert.ok(out.every((o) => o.allDone === false));
});

test("blockForReading: finds the block whose readings include rn", () => {
  assert.equal(blockForReading(blocks, 2), blocks[0]);
  assert.equal(blockForReading(blocks, 5), blocks[1]);
});

test("blockForReading: returns null for an unknown reading number", () => {
  assert.equal(blockForReading(blocks, 999), null);
});
