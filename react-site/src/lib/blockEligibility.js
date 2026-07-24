// Pure eligibility helper for the Block Review pilot: given the study-path
// blocks (from buildBlocks(), src/lib/studyPath.js) and the store's `done` map,
// decide which blocks are fully finished and which block a given reading
// belongs to. No store, no React, no Date.now() — callers supply `done`.

export function blockEligibility(blocks, done) {
  const d = done || {};
  return (blocks || []).map((block) => {
    const readings = block.readings || [];
    const allDone = readings.length > 0 && readings.every((rn) => !!d[rn]);
    const lastReading = readings[readings.length - 1];
    return { block, allDone, lastReading };
  });
}

export function blockForReading(blocks, rn) {
  const found = (blocks || []).find((b) => (b.readings || []).includes(rn));
  return found || null;
}
