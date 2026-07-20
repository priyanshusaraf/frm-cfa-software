/* Cross-reading core-concept detection (CLAUDE.md §6, Phase 1). A name that shows
   up in formulas[] or concepts[] across 2+ readings (normalized match) is
   auto-promoted to a "core concept" — no manual registry, so this stays correct
   as content changes. Two names normalize to the same concept if they collapse to
   the same lowercase alphanumeric string (handles "WCDR" vs "Worst-Case Default
   Rate (WCDR)" only if one is literally a substring-free match of the other's
   normalized form — exact-normalized-match only, deliberately conservative so
   distinct concepts never merge by accident). */
import { slugify } from "./html.js";

function normalize(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/* Build the full core-concept table from every loaded reading. Returns an array
   sorted by reference count (most-reused first), each entry:
   { slug, name, homeReading, refs: [rn...], kind: "formula"|"concept" }
   `kind` reflects where the name was FIRST seen (by reading order) — the
   concept page's base layer renders from the home reading using that kind. */
export function buildCoreConcepts(readingsMap) {
  if (!readingsMap) return [];
  const byNorm = new Map();

  const rns = Object.keys(readingsMap).map(Number).filter((n) => readingsMap[n]).sort((a, b) => a - b);

  for (const rn of rns) {
    const d = readingsMap[rn];
    if (!d) continue;
    const seenThisReading = new Set();
    const consider = (rawName, kind) => {
      const n = normalize(rawName);
      if (!n || n.length < 3) return;
      if (seenThisReading.has(n)) return; // one reference per reading, even if named in both formulas and concepts
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

  const out = [];
  for (const entry of byNorm.values()) {
    if (entry.refs.length < 2) continue;
    out.push({
      slug: slugify(entry.name),
      name: entry.name,
      kind: entry.kind,
      homeReading: entry.refs[0],
      refs: entry.refs,
    });
  }
  return out.sort((a, b) => b.refs.length - a.refs.length || a.name.localeCompare(b.name));
}

export function findCoreConcept(readingsMap, slug) {
  return buildCoreConcepts(readingsMap).find((c) => c.slug === slug) || null;
}
