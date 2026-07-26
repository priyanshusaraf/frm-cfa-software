import { test } from "node:test";
import assert from "node:assert/strict";
import { STUDY_GROUPS, STUDY_PATHS, isStudyPage, hasStudySidebar } from "./studyNav.js";

test("every item carries a path, a label and an icon", () => {
  for (const g of STUDY_GROUPS) {
    for (const i of g.items) {
      assert.match(i.to, /^\/[a-z-]+$/, "path looks like a route: " + i.to);
      assert.ok(i.label && i.label.length > 2, "label on " + i.to);
      assert.ok(i.Icon, "icon on " + i.to);
    }
  }
});

/* A duplicated path would render two links that both light up as active. */
test("paths are unique", () => {
  assert.equal(new Set(STUDY_PATHS).size, STUDY_PATHS.length);
});

/* The list was flattened out of Nav.jsx's old 16-entry array; losing one would
   silently drop a page from both surfaces at once. */
test("all sixteen Study destinations survived the move out of Nav.jsx", () => {
  const expected = [
    "/planner", "/mock", "/pomodoro", "/revision", "/review", "/drills",
    "/formulas", "/glossary", "/progress", "/notes", "/highlights", "/bookmarks",
    "/concepts", "/case-study", "/consistency", "/settings",
  ];
  assert.deepEqual([...STUDY_PATHS].sort(), expected.sort());
});

test("isStudyPage matches only the destinations themselves", () => {
  assert.equal(isStudyPage("/planner"), true);
  assert.equal(isStudyPage("/settings"), true);
  assert.equal(isStudyPage("/"), false);
  assert.equal(isStudyPage("/chapter/36"), false);
  assert.equal(isStudyPage("/plannerx"), false);
});

test("the sidebar covers home, book overviews and every Study page", () => {
  assert.equal(hasStudySidebar("/"), true);
  assert.equal(hasStudySidebar("/book/3"), true);
  assert.equal(hasStudySidebar("/book/3/"), true);
  for (const p of STUDY_PATHS) assert.equal(hasStudySidebar(p), true, p);
});

/* Reading surfaces keep the navbar popover: the width belongs to the content. */
test("the sidebar stays off reading surfaces", () => {
  for (const p of ["/chapter/36", "/concept/vasicek-wcdr", "/mindmap", "/search", "/pdf/2", "/block-review/b1"]) {
    assert.equal(hasStudySidebar(p), false, p);
  }
  assert.equal(hasStudySidebar(""), false);
  assert.equal(hasStudySidebar(undefined), false);
});
