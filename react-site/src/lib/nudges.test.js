import { test } from "node:test";
import assert from "node:assert/strict";
import { NUDGES, pickNudge, nudgeById } from "./nudges.js";

test("every nudge has the fields the toast renders", () => {
  const ids = new Set();
  for (const n of NUDGES) {
    assert.ok(n.id, "missing id");
    assert.ok(!ids.has(n.id), "duplicate id: " + n.id);
    ids.add(n.id);
    assert.equal(typeof n.text, "string");
    assert.ok(n.text.length > 10, n.id + " has no real copy");
    assert.ok(n.prop, n.id + " has no mascot prop");
    if (n.action) {
      assert.ok(n.action.label, n.id + " action has no label");
      assert.ok(n.action.to || n.action.href, n.id + " action goes nowhere");
    }
  }
});

/* The house prose rule: no em-dashes or en-dashes in any user-facing copy. */
test("no em-dashes or en-dashes in nudge copy", () => {
  for (const n of NUDGES) {
    assert.ok(!/[—–]/.test(n.text), n.id + " contains a long dash");
    if (n.action) assert.ok(!/[—–]/.test(n.action.label), n.id + " action label contains a long dash");
  }
});

test("contextual nudges are excluded when their condition is unmet", () => {
  const ids = new Set();
  for (let i = 0; i < 400; i++) {
    const n = pickNudge({ rn: null, minutes: 0, path: "/" }, [], () => i / 400);
    ids.add(n.id);
  }
  assert.ok(!ids.has("long-on-reading"), "reading-only nudge leaked onto a non-chapter page");
  assert.ok(!ids.has("long-session-break"), "long-session nudge fired at 0 minutes");
});

test("contextual nudges become eligible once their condition holds", () => {
  const ctx = { rn: 28, minutes: 95, path: "/chapter/28" };
  const ids = new Set();
  for (let i = 0; i < 400; i++) ids.add(pickNudge(ctx, [], () => i / 400).id);
  assert.ok(ids.has("long-on-reading"));
  assert.ok(ids.has("long-session-break"));
});

test("a recently shown nudge is not drawn again", () => {
  const recent = NUDGES.filter((n) => !n.when).slice(0, 5).map((n) => n.id);
  for (let i = 0; i < 200; i++) {
    const n = pickNudge({}, recent, () => i / 200);
    assert.ok(!recent.includes(n.id), "repeated " + n.id + " despite being recent");
  }
});

/* A stale or oversized exclusion list must never silence the toast entirely. */
test("an exhausted pool falls back to repeating rather than returning null", () => {
  const all = NUDGES.map((n) => n.id);
  const n = pickNudge({}, all, () => 0.5);
  assert.ok(n && all.includes(n.id));
});

test("a throwing `when` predicate drops that nudge instead of breaking the draw", () => {
  const broken = { id: "boom", prop: "spark", text: "should never appear anywhere", when: () => { throw new Error("x"); } };
  NUDGES.push(broken);
  try {
    for (let i = 0; i < 100; i++) assert.notEqual(pickNudge({}, [], () => i / 100).id, "boom");
  } finally {
    NUDGES.pop();
  }
});

test("nudgeById finds a known nudge and returns null otherwise", () => {
  assert.equal(nudgeById("water-skin").id, "water-skin");
  assert.equal(nudgeById("nope"), null);
});
