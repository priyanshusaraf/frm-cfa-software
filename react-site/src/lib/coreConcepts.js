/* Cross-reading core-concept detection (CLAUDE.md §6, Phase 1). A name that shows
   up in formulas[] or concepts[] across 2+ readings (normalized match) is
   auto-promoted to a "core concept" — no manual registry, so this stays correct
   as content changes. Two names normalize to the same concept if they collapse to
   the same lowercase alphanumeric string (handles "WCDR" vs "Worst-Case Default
   Rate (WCDR)" only if one is literally a substring-free match of the other's
   normalized form — exact-normalized-match only, deliberately conservative so
   distinct concepts never merge by accident). */
import { slugify } from "./html.js";
import { authoredConcepts as defaultAuthored } from "../data/authoredConcepts.js";
import { conceptLinkTable as defaultLinkTable } from "../data/conceptLinkTable.js";

/* Concepts the Phase 3 generator promoted on PROSE mentions: named once in a
   reading's formulas[]/concepts[], then referred to by name in the running text
   of 2+ other readings (see scripts/build-core-concepts.mjs). They are link
   targets, so /concept/:slug must resolve them, but they are NOT
   exact-name-recurring, so buildCoreConcepts above cannot see them. */
function promotedFrom(linkTable) {
  return (linkTable || [])
    .filter((r) => r && r.kind && Array.isArray(r.refs) && r.refs.length)
    .map((r) => ({
      slug: r.slug, name: r.name, display: r.display || r.name, kind: r.kind,
      layer: "core", homeReading: r.homeReading, refs: r.refs,
    }));
}

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
      layer: "core",
      homeReading: entry.refs[0],
      refs: entry.refs,
    });
  }
  return out.sort((a, b) => b.refs.length - a.refs.length || a.name.localeCompare(b.name));
}

export function findCoreConcept(readingsMap, slug) {
  return buildCoreConcepts(readingsMap).find((c) => c.slug === slug) || null;
}

function authoredSlug(a) {
  return a.slug || slugify(a.name);
}

/* Unified lookup used by /concept/:slug. An authored entry (revision OR core, from
   src/data/authoredConcepts.js) takes precedence over an auto-detected concept of
   the same slug; otherwise the auto-detected core concept is returned (layer
   "core"). `authored` is injectable for testing. Returns null if neither matches. */
export function findConcept(readingsMap, slug, authored = defaultAuthored, linkTable = defaultLinkTable) {
  const a = (authored || []).find((x) => authoredSlug(x) === slug);
  if (a) {
    return {
      slug: authoredSlug(a),
      name: a.name,
      layer: a.layer || "revision",
      kind: a.kind || null,
      homeReading: a.homeReading != null ? a.homeReading : null,
      refs: Array.isArray(a.refs) ? a.refs : [],
      lead: a.lead || null,
      sections: Array.isArray(a.sections) ? a.sections : [],
      authored: true,
    };
  }
  return findCoreConcept(readingsMap, slug) || promotedFrom(linkTable).find((c) => c.slug === slug) || null;
}

/* Combined listing for the /concepts index: authored entries first (they are the
   deliberately-curated ones), then auto-detected core concepts not shadowed by an
   authored slug. Each carries a `layer`. `authored` is injectable for testing. */
export function listConcepts(readingsMap, authored = defaultAuthored, linkTable = defaultLinkTable) {
  const authoredList = (authored || []).map((a) => ({
    slug: authoredSlug(a),
    name: a.name,
    layer: a.layer || "revision",
    homeReading: a.homeReading != null ? a.homeReading : null,
    refs: Array.isArray(a.refs) ? a.refs : [],
    authored: true,
  }));
  const claimed = new Set(authoredList.map((a) => a.slug));
  const auto = buildCoreConcepts(readingsMap).filter((c) => !claimed.has(c.slug));
  auto.forEach((c) => claimed.add(c.slug));
  /* Prose-promoted concepts belong in the index too: they are linked from
     chapter prose, so an index that omitted them would list fewer concepts than
     the reader can actually reach. */
  const promoted = promotedFrom(linkTable).filter((c) => !claimed.has(c.slug));
  return [...authoredList, ...auto, ...promoted];
}
