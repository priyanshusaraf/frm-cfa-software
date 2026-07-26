/* Store mutators touch localStorage; node:test has no DOM, so stub it the way
   the other store tests do before importing the module. */
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};

const { getState, setStudySidebarCollapsed, setFontScale } = await import("./store.js");

beforeEach(() => mem.clear());

test("collapsed round-trips, and expanding DELETES the key rather than storing false", () => {
  setStudySidebarCollapsed(true);
  assert.equal(getState().layout.studySidebarCollapsed, true);
  setStudySidebarCollapsed(false);
  assert.equal("studySidebarCollapsed" in getState().layout, false);
});

test("an old blob with no layout at all reads as expanded", () => {
  assert.equal(!!(getState().layout && getState().layout.studySidebarCollapsed), false);
});

test("toggling does not disturb other layout keys", () => {
  setFontScale(1.2);
  setStudySidebarCollapsed(true);
  assert.equal(getState().layout.fontScale, 1.2);
  setStudySidebarCollapsed(false);
  assert.equal(getState().layout.fontScale, 1.2);
});
