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

const { getState, setSplitZoom, setPdfZoom } = await import("./store.js");

beforeEach(() => {
  mem.clear();
  setPdfZoom(null);
  setSplitZoom("source", null);
  setSplitZoom("condensed", null);
});

/* Regression: this once saved the numeric argument AS split.zoom, so
   split.zoom[kind] was undefined and every pane silently snapped back to 1. */
test("setSplitZoom stores the value under the pane kind, not as split.zoom itself", () => {
  setSplitZoom("source", 1.4);
  const split = getState().layout.split;
  assert.equal(typeof split.zoom, "object");
  assert.equal(split.zoom.source, 1.4);
});

test("setSplitZoom keeps the two panes independent", () => {
  setSplitZoom("source", 1.4);
  setSplitZoom("condensed", 0.8);
  const { zoom } = getState().layout.split;
  assert.deepEqual(zoom, { source: 1.4, condensed: 0.8 });
});

test("setSplitZoom ignores unknown pane kinds and clears on a null", () => {
  setSplitZoom("source", 1.4);
  setSplitZoom("bogus", 2);
  assert.deepEqual(getState().layout.split.zoom, { source: 1.4 });
  setSplitZoom("source", null);
  assert.deepEqual(getState().layout.split.zoom, {});
});

test("setPdfZoom round-trips and clears", () => {
  setPdfZoom(1.6);
  assert.equal(getState().layout.pdfZoom, 1.6);
  setPdfZoom(null);
  assert.equal(getState().layout.pdfZoom, undefined);
});

test("zoom values are clamped to the range the toolbar offers", () => {
  setPdfZoom(99);
  assert.equal(getState().layout.pdfZoom, 3);
  setPdfZoom(0.01);
  assert.equal(getState().layout.pdfZoom, 0.5);
  setSplitZoom("source", 99);
  assert.equal(getState().layout.split.zoom.source, 3);
});

test("split zoom does not disturb other split keys", () => {
  setSplitZoom("source", 1.2);
  const before = getState().layout.split.panes;
  setSplitZoom("condensed", 1.1);
  assert.equal(getState().layout.split.panes, before);
});
