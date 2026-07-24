import { test } from "node:test";
import assert from "node:assert/strict";
import { composeBlockReview } from "./blockReview.js";

function reading(overrides) {
  return {
    title: "Untitled",
    tagline: "tag",
    summary: "sum",
    highYield: [],
    recall: [],
    quiz: [],
    misconceptions: [],
    ...overrides,
  };
}

test("overview lists readings in block order with title/tagline/summary and topHighYield stars>=4 cap 2", () => {
  const block = { id: "b1", name: "Test Block", kind: "schweser-session", bookN: 1, readings: [3, 1, 2] };
  const readings = {
    1: reading({ title: "R1", tagline: "t1", summary: "s1", highYield: [
      { stars: 5, what: "a", why: "wa" },
      { stars: 3, what: "b", why: "wb" },
      { stars: 4, what: "c", why: "wc" },
      { stars: 4, what: "d", why: "wd" },
    ] }),
    2: reading({ title: "R2", tagline: "t2", summary: "s2" }),
    3: reading({ title: "R3", tagline: "t3", summary: "s3" }),
  };

  const out = composeBlockReview(block, readings);

  assert.deepEqual(out.overview.map((o) => o.rn), [3, 1, 2], "overview follows block.readings order, not numeric order");
  const r1 = out.overview.find((o) => o.rn === 1);
  assert.equal(r1.title, "R1");
  assert.equal(r1.tagline, "t1");
  assert.equal(r1.summary, "s1");
  assert.equal(r1.topHighYield.length, 2, "capped at 2");
  assert.ok(r1.topHighYield.every((h) => h.stars >= 4), "only stars>=4 kept");
  assert.deepEqual(r1.topHighYield[0], { stars: 5, what: "a" });
});

test("recallCards use the rn:i id scheme matching Review.jsx", () => {
  const block = { id: "b1", name: "Test Block", bookN: 1, readings: [10, 11] };
  const readings = {
    10: reading({ recall: [{ q: "q1", a: "a1" }, { q: "q2", a: "a2" }] }),
    11: reading({ recall: [{ q: "q3", a: "a3" }] }),
  };

  const out = composeBlockReview(block, readings);

  assert.deepEqual(out.recallCards, [
    { id: "10:0", rn: 10, q: "q1", a: "a1" },
    { id: "10:1", rn: 10, q: "q2", a: "a2" },
    { id: "11:0", rn: 11, q: "q3", a: "a3" },
  ]);
});

test("quizItems capped at <=1 per reading and <=6 total", () => {
  const rns = [1, 2, 3, 4, 5, 6, 7];
  const block = { id: "b1", name: "Big Block", bookN: 1, readings: rns };
  const readings = {};
  rns.forEach((n) => {
    readings[n] = reading({
      quiz: [
        { q: "q" + n + "a", options: ["a", "b", "c", "d"], answer: 0, why: "w" + n + "a" },
        { q: "q" + n + "b", options: ["a", "b", "c", "d"], answer: 1, why: "w" + n + "b" },
      ],
    });
  });

  const out = composeBlockReview(block, readings);

  assert.equal(out.quizItems.length, 6, "capped at 6 total even with 7 eligible readings");
  const rnCounts = {};
  out.quizItems.forEach((qi) => { rnCounts[qi.rn] = (rnCounts[qi.rn] || 0) + 1; });
  Object.values(rnCounts).forEach((c) => assert.equal(c, 1, "at most 1 quiz item per reading"));
  assert.deepEqual(out.quizItems.map((qi) => qi.rn), [1, 2, 3, 4, 5, 6], "first quiz item of each reading, in block order, until 6");
});

test("trapChecks come from misconceptions, capped at 1 per reading", () => {
  const block = { id: "b1", name: "Test Block", bookN: 1, readings: [20, 21] };
  const readings = {
    20: reading({ misconceptions: [{ wrong: "w1", right: "r1" }, { wrong: "w2", right: "r2" }] }),
    21: reading({ misconceptions: [] }),
  };

  const out = composeBlockReview(block, readings);

  assert.deepEqual(out.trapChecks, [{ rn: 20, wrong: "w1", right: "r1" }]);
});

test("authored through-line is used verbatim with source authored", () => {
  const block = { id: "b1", name: "Test Block", bookN: 1, readings: [1, 2] };
  const readings = { 1: reading({ title: "R1" }), 2: reading({ title: "R2" }) };
  const throughlines = { b1: "This block covers the correlation risk chapter in depth." };

  const out = composeBlockReview(block, readings, throughlines);

  assert.deepEqual(out.throughLine, { text: throughlines.b1, source: "authored" });
});

test("composed through-line is used when none authored, and contains no em/en-dashes", () => {
  const block = { id: "b1", name: "Correlation Risk", bookN: 1, readings: [1, 2, 3] };
  const readings = {
    1: reading({ title: "First Reading" }),
    2: reading({ title: "Middle Reading" }),
    3: reading({ title: "Last Reading" }),
  };

  const out = composeBlockReview(block, readings);

  assert.equal(out.throughLine.source, "composed");
  assert.ok(out.throughLine.text.includes("Correlation Risk"));
  assert.ok(out.throughLine.text.includes("3"));
  assert.ok(out.throughLine.text.includes("First Reading"));
  assert.ok(out.throughLine.text.includes("Last Reading"));
  assert.ok(!/[—–]/.test(out.throughLine.text), "no em/en dashes in composed text");
});

test("defensive: a reading missing from the map and a reading lacking recall/quiz never throws", () => {
  const block = { id: "b1", name: "Test Block", bookN: 1, readings: [1, 999, 2] };
  const readings = {
    1: reading({ title: "R1", recall: undefined, quiz: undefined, misconceptions: undefined, highYield: undefined }),
    2: reading({ title: "R2" }),
    // 999 intentionally absent from the map
  };

  assert.doesNotThrow(() => composeBlockReview(block, readings));

  const out = composeBlockReview(block, readings);
  assert.deepEqual(out.overview.map((o) => o.rn), [1, 2], "missing reading 999 is skipped, not thrown on");
  assert.equal(out.recallCards.length, 0);
  assert.equal(out.quizItems.length, 0);
  assert.equal(out.trapChecks.length, 0);
  const r1 = out.overview.find((o) => o.rn === 1);
  assert.deepEqual(r1.topHighYield, []);
});

test("top-level id and name are carried from the block", () => {
  const block = { id: "b42", name: "My Block", bookN: 1, readings: [1] };
  const readings = { 1: reading({ title: "R1" }) };
  const out = composeBlockReview(block, readings);
  assert.equal(out.id, "b42");
  assert.equal(out.name, "My Block");
});
