import { test } from "node:test";
import assert from "node:assert/strict";
import { setActiveReading, clearActiveReading, toggleDone, getState } from "./store.js";

test("setActiveReading stores the reading number", () => {
  setActiveReading(28);
  assert.equal(getState().nav.activeReading, 28);
});

test("marking the active reading done clears it", () => {
  setActiveReading(28);
  if (getState().done[28]) toggleDone(28); // ensure starting not-done
  setActiveReading(28);
  toggleDone(28); // mark done
  assert.equal(getState().nav.activeReading, null);
  toggleDone(28); // cleanup (un-done)
});

test("clearActiveReading resets to null", () => {
  setActiveReading(5);
  clearActiveReading();
  assert.equal(getState().nav.activeReading, null);
});
