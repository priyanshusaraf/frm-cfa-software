import { test } from "node:test";
import assert from "node:assert/strict";
import { anchorFrom, offsetFor } from "./pdfAnchor.js";

test("anchorFrom reports the page under the scroll position and the offset into it", () => {
  // unit 1000, list starts at 200: page 3 begins at 200 + 2*1000 = 2200
  assert.deepEqual(anchorFrom(2200, 200, 1000, 50), { page: 3, frac: 0 });
  assert.deepEqual(anchorFrom(2450, 200, 1000, 50), { page: 3, frac: 0.25 });
});

test("anchorFrom clamps above the list to page 1 and below it to the last page", () => {
  assert.deepEqual(anchorFrom(0, 200, 1000, 50), { page: 1, frac: 0 });
  assert.deepEqual(anchorFrom(-9999, 200, 1000, 50), { page: 1, frac: 0 });
  const past = anchorFrom(999999, 200, 1000, 50);
  assert.equal(past.page, 50);
  assert.ok(past.frac >= 0 && past.frac < 1, "frac stays in [0,1)");
});

test("offsetFor is the inverse of anchorFrom at the same unit", () => {
  const scrollTop = 2450;
  const a = anchorFrom(scrollTop, 200, 1000, 50);
  assert.equal(offsetFor(a, 200, 1000, 50), scrollTop);
});

/* The whole point of the module: the page you are on must survive a zoom step.
   Round-tripping through a DIFFERENT unit must land on the same page and offset,
   which is what stops a zoom from throwing you 30 pages away. */
test("an anchor restored at a new unit keeps the same page and fractional position", () => {
  const a = anchorFrom(2450, 200, 1000, 50); // page 3, quarter of the way down
  const restored = offsetFor(a, 200, 1400, 50); // zoomed in: pages are taller now
  const b = anchorFrom(restored, 200, 1400, 50);
  assert.equal(b.page, a.page);
  assert.ok(Math.abs(b.frac - a.frac) < 0.001, "offset into the page is preserved");
});

test("offsetFor clamps the page into range and never returns a negative scroll", () => {
  assert.equal(offsetFor({ page: 999, frac: 0 }, 0, 1000, 50), 49000);
  assert.equal(offsetFor({ page: 0, frac: 0 }, 0, 1000, 50), 0);
  assert.equal(offsetFor({ page: 1, frac: 0 }, -5000, 1000, 50), 0);
});

/* Defensive rendering (CLAUDE.md §2): these run during load, when numPages is 0
   and the page height is still a placeholder. They must not throw. */
test("degenerate inputs return safe defaults instead of throwing", () => {
  assert.deepEqual(anchorFrom(100, 0, 0, 50), { page: 1, frac: 0 });
  assert.deepEqual(anchorFrom(100, 0, 1000, 0), { page: 1, frac: 0 });
  assert.deepEqual(anchorFrom(NaN, 0, 1000, 50), { page: 1, frac: 0 });
  assert.equal(offsetFor(null, 0, 1000, 50), 0);
  assert.equal(offsetFor({ page: 3, frac: 0.5 }, 0, 0, 50), 0);
  assert.equal(offsetFor({ page: 3, frac: NaN }, 0, 1000, 50), 2000);
});
