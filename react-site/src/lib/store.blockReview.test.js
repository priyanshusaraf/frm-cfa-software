import { test } from "node:test";
import assert from "node:assert/strict";
import { markBlockReviewSeen, getState } from "./store.js";

test("markBlockReviewSeen stores {seenTs} for the given block", () => {
  markBlockReviewSeen("c27", 1000);
  assert.deepEqual(getState().blockReview.c27, { seenTs: 1000 });
});

test("marking a second block does not clobber the first (spread-prev)", () => {
  markBlockReviewSeen("c27", 1000);
  markBlockReviewSeen("s1", 2000);
  assert.deepEqual(getState().blockReview.c27, { seenTs: 1000 });
  assert.deepEqual(getState().blockReview.s1, { seenTs: 2000 });
});

test("reading a missing block's seen record is undefined", () => {
  const s = getState();
  assert.equal((s.blockReview || {}).neverSeenBlock, undefined);
});
