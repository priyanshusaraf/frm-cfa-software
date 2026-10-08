/* Structural checks over every module's content. A failure here is a page
   that would render a warning box or mislead the student. */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MODULES } from "../content/index.js";
import { scenarioById } from "../scenarios/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const widgetDir = path.join(here, "..", "widgets");
const DASH = /[–—]/;
const KNOWN = new Set(["p", "h", "callout", "table", "formula", "steps", "compare", "theater", "widget", "check", "sort", "tree"]);

for (const m of MODULES) {
  test("module " + m.id, () => {
    if (m.pending) return;
    assert.ok(!DASH.test(JSON.stringify(m)), m.id + ": contains an em or en dash");
    const losIds = new Set(m.los.map((l) => l.id));
    const secIds = new Set();
    for (const s of m.sections) {
      assert.ok(s.id && s.title, m.id + ": section missing id/title");
      assert.ok(!secIds.has(s.id), m.id + ": duplicate section id " + s.id);
      secIds.add(s.id);
      for (const l of s.los || []) assert.ok(losIds.has(l), m.id + "/" + s.id + ": unknown LOS " + l);
      for (const b of s.blocks || []) {
        const where = m.id + "/" + s.id + " block " + b.t;
        assert.ok(KNOWN.has(b.t), where + ": unknown block type");
        if (b.t === "theater") assert.ok(scenarioById(b.scenario), where + ": missing scenario " + b.scenario);
        if (b.t === "widget") assert.ok(fs.existsSync(path.join(widgetDir, b.name + ".jsx")), where + ": missing widget file " + b.name);
        if (b.t === "check") {
          assert.equal(b.options.length, 3, where + ": checks need exactly 3 options");
          assert.ok(b.answer >= 0 && b.answer < 3, where + ": bad answer index");
          assert.ok(!/\b(option|answer) [ABC]\b/i.test(b.why), where + ": why must not name a letter");
        }
        if (b.t === "sort") for (const it of b.items) assert.ok(b.buckets.some((x) => x.id === it.bucket), where + ": item bucket missing");
        if (b.t === "tree") {
          assert.ok(b.nodes[b.root], where + ": missing root node");
          for (const n of Object.values(b.nodes)) for (const o of n.options || []) assert.ok(b.nodes[o.next], where + ": dangling tree edge " + o.next);
        }
      }
    }
    for (const l of m.los) assert.ok(m.sections.some((s) => (s.los || []).includes(l.id)), m.id + ": LOS " + l.id + " is taught by no section");
    for (const set of m.itemSets || []) {
      for (const q of set.questions) {
        assert.equal(q.options.length, 3, set.id + ": item set questions need exactly 3 options");
        assert.ok(q.answer >= 0 && q.answer < 3, set.id + ": bad answer index");
      }
    }
  });
}
