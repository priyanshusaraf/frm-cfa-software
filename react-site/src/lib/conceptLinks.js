/* Inline core-concept linking (CLAUDE.md §6, Phase 3).

   A reused concept ("Vasicek worst-case default rate", "Sharpe ratio",
   securitization) is taught properly in exactly one place. Everywhere else it
   gets name-dropped, and the student either already remembers it or silently
   loses the thread. This module finds those name-drops in already-rendered
   chapter prose and turns them into hover-snippet links to /concept/:slug.

   Two deliberate design points, both from §6:

   1. **Auto-detected, never authored.** Nothing is wrapped in the data files.
      The link is applied to the DOM after render, so the content run can rewrite
      any sentence it likes without breaking a link: the anchor is the concept
      NAME, and if the name survives the rewrite the link survives with it.
   2. **The home reading is skipped.** Reading 26 defines the Vasicek WCDR; a
      link there would point at itself. Only later name-drops get linked.

   The matcher half of this file is pure string work so it can be unit-tested
   under node:test; `linkifyRoot` is the thin DOM application on top. */

/* Ancestors whose text must never be rewritten: existing links, math (KaTeX
   spans are rebuilt from the source string, so a stray <a> inside would be
   dropped or corrupt the layout), widget-owned subtrees, code, and headings
   (a link in a heading reads as chrome, not as a term). */
const SKIP_SELECTOR =
  "a, code, pre, script, style, .katex, .f-tex, .widget, [data-widget], .section-label, h1, h2, h3, h4, .cref";

/* Longest-first so "Vasicek worst-case default rate (WCDR)" wins over "WCDR"
   when both would match at the same spot. */
function byLengthDesc(a, b) {
  return b.length - a.length || a.localeCompare(b);
}

/* Derive the match phrases for a concept from its name, plus any authored
   `linkPhrases`. "Vasicek worst-case default rate (WCDR)" yields the full name,
   the name without its parenthetical, and the bare abbreviation. */
/* An acronym, not a proper noun: at least two capitals in a short all-letter
   token (VaR, LGD, CCP, WCDR). The two-capital bar is what keeps "Risk-neutral
   PD (Merton)" from claiming the word "Merton", which in prose means the Merton
   MODEL, a broader thing than that one page. */
export function isAbbrev(s) {
  return /^[A-Za-z]{2,6}$/.test(s) && (s.match(/[A-Z]/g) || []).length >= 2;
}

export function conceptPhrases(entry) {
  if (!entry || !entry.name) return [];
  const out = new Set();
  const add = (s) => {
    const t = String(s || "").trim();
    if (t.length >= 3) out.add(t);
  };
  add(entry.name);
  const paren = /\(([^)]{2,})\)/.exec(entry.name);
  if (paren) {
    add(entry.name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim());
    /* Only an ABBREVIATION earns its own phrase. Concept names in this corpus
       also use parentheses to disambiguate ("Expected loss (single asset)",
       "Beta (factor exposure)"), and promoting that qualifier to a match phrase
       would link the word "single asset" all over the corpus. */
    if (isAbbrev(paren[1])) add(paren[1]);
  }
  (entry.linkPhrases || []).forEach(add);
  /* `excludePhrases` removes a phrase the name would otherwise generate, for
     acronyms that collide across the corpus: "CSA" is a Credit Support Annex in
     Book 2 and Singapore's Cyber Security Agency in R47. The full name still
     matches, so the concept stays linkable where it is unambiguous. */
  const deny = new Set((entry.excludePhrases || []).map((p) => String(p).toLowerCase()));
  return [...out].filter((p) => !deny.has(p.toLowerCase())).sort(byLengthDesc);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* A phrase matches only at word boundaries, so "CDO" does not fire inside
   "CDO-squared"'s neighbours and "ratio" never fires inside "rationale". The
   boundary is spelled out rather than using \b because phrases can start or end
   with a non-word character (e.g. an abbreviation in parentheses). */
function phraseRegex(phrase) {
  /* A LEADING hyphen is not a boundary: in "systemic-risk contribution" the
     hyphen binds "risk" to "systemic", and the phrase "risk contribution" means
     something else there (contribution to systemic risk, not the portfolio
     risk-contribution measure). A TRAILING hyphen still is one, so "VaR-based"
     links "VaR" as it should. */
  /* An ACRONYM matches case-sensitively: "VaR" must not fire on the variance
     function "var(m)" in a formula note, and "CDO" must not fire on a stray
     "cdo". Multi-word names stay case-insensitive, so prose that shouts
     "RISK-NEUTRAL PD" for emphasis still links. */
  const flags = isAbbrev(phrase) ? "" : "i";
  return new RegExp("(^|[^A-Za-z0-9-])(" + escapeRe(phrase) + ")(?![A-Za-z0-9])", flags);
}

/* Build the ordered candidate list for one reading: every concept except the one
   this reading is the home of. Entries keep their original object; only the
   phrase list is added. */
export function candidatesFor(entries, rn) {
  const here = Number(rn);
  return (entries || [])
    .filter((e) => {
      if (!e || !e.slug || !e.name) return false;
      if (e.homeReading == null) return true; // a page with no home reading is always in scope
      /* A core concept links only FORWARD, from a reading later than the one
         that defines it. Its page renders that home reading's own definition, so
         linking it earlier would send a student in R1 to a page headed "first
         defined in R31" and explained in R31's terms. A revision-layer page is
         exempt: it re-teaches an assumed prerequisite from first principles, so
         it is useful from anywhere in the corpus. */
      /* `selfContained` is the same exemption for a SEQUENCED core page (the
         hard-concept build, CLAUDE.md section 8.7): it is authored from first
         principles and does not render the home reading's fields, so it reads
         correctly from a reading that precedes its home. CVA is the case that
         forced this: its inputs are taught in R25 and R36 and it is trailed in
         R29 and R32, all BEFORE R37, and those are exactly the readings whose
         student needs the assembly. */
      if (e.layer === "revision" || e.selfContained) return Number(e.homeReading) !== here;
      return Number(e.homeReading) < here;
    })
    .map((e) => ({ ...e, phrases: conceptPhrases(e) }))
    .filter((e) => e.phrases.length);
}

/* Find at most one match per candidate in `text`, returning non-overlapping
   ranges sorted by position: [{ start, end, slug, text }]. `used` is a Set of
   slugs already linked elsewhere on the page (mutated by the caller between
   calls so a concept is linked once, near its first appearance, Wikipedia-style
   rather than on every occurrence). */
export function findLinkMatches(text, candidates, used) {
  const s = String(text || "");
  if (!s.trim()) return [];
  const hits = [];
  for (const c of candidates) {
    if (used && used.has(c.slug)) continue;
    for (const phrase of c.phrases) {
      const m = phraseRegex(phrase).exec(s);
      if (!m) continue;
      const start = m.index + m[1].length;
      hits.push({ start, end: start + m[2].length, slug: c.slug, text: m[2] });
      break; // first (longest) phrase that matches wins for this concept
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  const out = [];
  let cursor = -1;
  for (const h of hits) {
    if (h.start < cursor) continue; // overlapping concepts: keep the earlier one
    out.push(h);
    cursor = h.end;
  }
  return out;
}

function hasSkippedAncestor(node, root) {
  for (let el = node.parentElement; el && el !== root.parentElement; el = el.parentElement) {
    if (el.matches && el.matches(SKIP_SELECTOR)) return true;
  }
  return false;
}

/* Wrap concept name-drops inside `root` (a rendered chapter) in
   <a class="cref" data-cslug="…">. Idempotent per element: it skips anything
   already inside a .cref, so a re-run after a content reflow cannot nest links.
   Returns the number of links created. */
export function linkifyRoot(root, entries, rn) {
  if (!root || !root.ownerDocument) return 0;
  /* One pass per reading. The "link each concept once" rule lives in the `used`
     set below, which is per-call, so a second call on the same rendered chapter
     would link every concept a second time further down the page. */
  if (root.getAttribute("data-cref-rn") === String(rn)) return 0;
  root.setAttribute("data-cref-rn", String(rn));
  const candidates = candidatesFor(entries, rn);
  if (!candidates.length) return 0;

  const doc = root.ownerDocument;
  const used = new Set();
  /* Only inside [data-html], the subtrees <Html> renders as opaque innerHTML.
     Splitting a text node React itself created would leave React's fiber tree
     pointing at nodes that are no longer where it put them, and the next
     re-render of that element throws NotFoundError. Every curriculum prose field
     goes through <Html>, so nothing worth linking is lost. */
  const textNodes = [];
  for (const host of root.querySelectorAll("[data-html]")) {
    if (host.parentElement && host.parentElement.closest("[data-html]")) continue; // already walked by its ancestor
    const walker = doc.createTreeWalker(host, 4 /* SHOW_TEXT */);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.nodeValue && n.nodeValue.trim().length >= 3) textNodes.push(n);
    }
  }

  let made = 0;
  for (const node of textNodes) {
    if (used.size >= candidates.length) break;
    if (!node.parentElement) continue; // detached by an earlier split
    if (hasSkippedAncestor(node, root)) continue;
    const matches = findLinkMatches(node.nodeValue, candidates, used);
    if (!matches.length) continue;

    /* Split back-to-front so earlier offsets stay valid. */
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i];
      const target = node.splitText(m.start);
      target.splitText(m.end - m.start);
      const a = doc.createElement("a");
      a.className = "cref";
      a.href = "#/concept/" + m.slug;
      a.setAttribute("data-cslug", m.slug);
      a.textContent = target.nodeValue;
      target.parentNode.replaceChild(a, target);
      used.add(m.slug);
      made++;
    }
  }
  return made;
}
