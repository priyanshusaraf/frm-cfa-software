/* Usage: node scripts/build-core-concepts.mjs
   Writes src/data/coreConcepts.json — the cross-reading core-concept table
   (CLAUDE.md §6, Phase 1). Runs at content-edit time (not app runtime, not a Vite
   build step) so Chapter.jsx can consult the table on every page without pulling
   in all 101 reading chunks the way useAllReadings() would (see the code-split
   rationale in CLAUDE.md §2 — this script is what keeps that intact). Re-run this
   whenever formulas[]/concepts[] names change across readings, same as any other
   generated-from-source artifact. */
import { readdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";

function normalize(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const dataDir = new URL("../src/data/", import.meta.url);
const bookDirs = readdirSync(dataDir).filter((d) => /^book\d+$/.test(d)).sort();

const byNorm = new Map();

for (const bookDir of bookDirs) {
  const files = readdirSync(new URL(bookDir + "/", dataDir)).filter((f) => /^r\d+\.js$/.test(f)).sort();
  for (const file of files) {
    const mod = await import(new URL(bookDir + "/" + file, dataDir));
    const d = mod.default;
    if (!d || !d.reading) continue;
    const rn = d.reading;
    const seenThisReading = new Set();
    const consider = (rawName, kind) => {
      const n = normalize(rawName);
      if (!n || n.length < 3) return;
      if (seenThisReading.has(n)) return;
      seenThisReading.add(n);
      let entry = byNorm.get(n);
      if (!entry) {
        entry = { name: rawName, kind, refs: [] };
        byNorm.set(n, entry);
      }
      entry.refs.push(rn);
    };
    (d.formulas || []).forEach((f) => f && f.name && consider(f.name, "formula"));
    (d.concepts || []).forEach((c) => c && c.name && consider(c.name, "concept"));
  }
}

const out = [];
for (const entry of byNorm.values()) {
  if (entry.refs.length < 2) continue;
  const refs = entry.refs.sort((a, b) => a - b);
  out.push({ slug: slugify(entry.name), name: entry.name, kind: entry.kind, homeReading: refs[0], refs });
}
out.sort((a, b) => b.refs.length - a.refs.length || a.name.localeCompare(b.name));

await writeFile(new URL("coreConcepts.json", dataDir), JSON.stringify(out, null, 2) + "\n");
console.log(out.length + " core concepts written to src/data/coreConcepts.json");
