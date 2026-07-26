/* Turns a reading's one-page `summary` HTML into a two-level outline.

   The 101 summaries are authored as one dense paragraph of
   `<strong>Label</strong> prose. <strong>Label</strong> prose.` and read as a wall
   of text the morning of the exam, which is exactly when the student needs to
   skim it. Rather than rewrite 101 data files (and re-verify every one against
   Schweser), the structure that is already implicit in the markup is derived at
   render time: a bolded label that STARTS a sentence is a point, and a
   colon-introduced list inside that point becomes its sub-points.

   Two distinctions the parser exists to get right, both taken from real data:

   - A `<strong>` mid-sentence is inline emphasis, not a new point. R56 writes
     "Three judgment calls: <strong>time horizon</strong> (…), <strong>default
     probability</strong> (…)" — those three belong UNDER the "Three judgment
     calls" point, not beside it.
   - Delimiters inside parentheses, prose math, or HTML tags are not delimiters.
     R89's "managed futures/global macro (trend-following, asset allocation, low
     equity correlation)" is ONE item whose parenthetical happens to hold three
     commas.

   Returns null whenever the input does not clearly fit the shape (too few
   points, unbalanced markup, no `<strong>` scaffolding at all). Callers render
   the original HTML unchanged in that case — a summary that does not parse must
   still display, so this is a progressive enhancement, never a gate. */

/* A period ending one of these is an abbreviation, not a sentence boundary. */
var ABBREV = /(^|[\s(])(e\.g|i\.e|etc|vs|approx|no|fig|cf|al|inc|st|u\.s|u\.k)\.$/i;

/* Longest a fragment may be and still read as a sub-point rather than a
   paragraph. Tuned so R07's 118-char wrong-way-risk clause still splits. */
var MAX_SUB = 170;

/* Walks `s` and reports, per character index, whether it sits at the top level:
   outside every HTML tag, parenthesis, bracket, and \( \) / \[ \] math span.
   Depth is tracked rather than matched, so text that opens more than it closes
   simply never returns to depth 0 and no split is offered there. */
function topLevelMask(s) {
  var mask = new Array(s.length).fill(false);
  var tag = false, paren = 0, math = false;
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (tag) { if (c === ">") tag = false; continue; }
    /* A tag's own "<" reports the state it SITS in, so callers can ask whether a
       <strong> is at the top level; the tag's interior stays masked out. */
    if (c === "<") { mask[i] = paren === 0 && !math; tag = true; continue; }
    if (c === "\\" && (s[i + 1] === "(" || s[i + 1] === "[")) { math = true; i++; continue; }
    if (c === "\\" && (s[i + 1] === ")" || s[i + 1] === "]")) { math = false; i++; continue; }
    if (math) continue;
    if (c === "(" || c === "[") { paren++; continue; }
    if (c === ")" || c === "]") { if (paren > 0) paren--; continue; }
    mask[i] = paren === 0;
  }
  return mask;
}

/* True when every tag opened in `s` is also closed in `s`. A fragment that
   fails this would be injected as broken HTML, so the whole parse is dropped. */
function balanced(s) {
  var open = s.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) || [];
  var close = s.match(/<\/([a-z][a-z0-9]*)\s*>/gi) || [];
  var count = {};
  open.forEach(function (t) {
    if (/\/>$/.test(t)) return;
    var n = t.replace(/^<([a-z0-9]+).*/i, "$1").toLowerCase();
    if (n === "br" || n === "img") return;
    count[n] = (count[n] || 0) + 1;
  });
  close.forEach(function (t) {
    var n = t.replace(/^<\/([a-z0-9]+).*/i, "$1").toLowerCase();
    count[n] = (count[n] || 0) - 1;
  });
  return Object.keys(count).every(function (k) { return count[k] === 0; });
}

function clean(s) {
  return (s || "").replace(/^[\s;:,.]+/, "").replace(/\s+$/, "").trim();
}

/* Splits `body`'s trailing colon-introduced list into sub-points, or returns
   null. Semicolons win over commas when both are present, because a summary
   that uses both is using semicolons as the outer delimiter. */
function splitSubs(body) {
  var mask = topLevelMask(body);
  var colon = -1;
  for (var i = 0; i < body.length; i++) {
    if (body[i] === ":" && mask[i]) { colon = i; break; }
  }
  if (colon < 0) return null;

  var head = body.slice(0, colon);
  var rest = body.slice(colon + 1);
  var rmask = mask.slice(colon + 1);

  /* Only the tail of the point may become a list. A depth-0 sentence break
     inside `rest` means the colon introduced a clause, not an enumeration. */
  for (var j = 0; j < rest.length - 1; j++) {
    if (rest[j] === "." && rmask[j] && /\s/.test(rest[j + 1])) return null;
  }

  var cut = function (ch) {
    var parts = [], last = 0;
    for (var k = 0; k < rest.length; k++) {
      if (rest[k] === ch && rmask[k]) { parts.push(rest.slice(last, k)); last = k + 1; }
    }
    parts.push(rest.slice(last));
    return parts.map(clean).map(function (p) { return p.replace(/\.$/, ""); }).filter(Boolean);
  };

  var semi = cut(";");
  var subs = semi.length >= 2 ? semi : null;
  /* Commas need a third item: two comma-separated clauses are far more often
     one sentence ("continuous, not step-like") than a list of two. */
  if (!subs) {
    var comma = cut(",");
    if (comma.length >= 3) subs = comma;
  }
  if (!subs) return null;
  if (subs.some(function (p) { return p.length > MAX_SUB || p.length < 3 || !balanced(p); })) return null;

  return { head: clean(head), subs: subs };
}

/* A point whose body is still a paragraph has just moved the wall of text down a
   level. When there is no colon list to lift out, its sentences become the
   sub-lines instead. Short bodies are left inline: breaking a single clause onto
   its own line adds structure without adding information. */
var MIN_SENTENCE_SPLIT = 180;

function splitSentences(body) {
  if (body.replace(/<[^>]+>/g, "").length < MIN_SENTENCE_SPLIT) return null;
  var mask = topLevelMask(body);
  var parts = [], last = 0;
  for (var i = 0; i < body.length - 1; i++) {
    if (body[i] !== "." || !mask[i] || !/\s/.test(body[i + 1])) continue;
    var before = body.slice(last, i + 1).replace(/<[^>]*>/g, "").replace(/\s+$/, "");
    if (ABBREV.test(before)) continue;
    parts.push(body.slice(last, i + 1));
    last = i + 1;
  }
  parts.push(body.slice(last));
  parts = parts.map(clean).filter(Boolean);
  if (parts.length < 2) return null;
  if (parts.some(function (p) { return p.replace(/<[^>]+>/g, "").length < 20 || !balanced(p); })) return null;
  return parts;
}

/* Index of every `<strong>` that opens a sentence, and so opens a new point. */
function pointStarts(s, mask) {
  var out = [];
  var re = /<strong>/gi;
  var m;
  while ((m = re.exec(s))) {
    var at = m.index;
    if (!mask[at]) continue;                    // inside a parenthetical or math
    var before = s.slice(0, at).replace(/<[^>]*>/g, "").replace(/\s+$/, "");
    if (!before) { out.push(at); continue; }    // first thing in the summary
    if (!/[.!?]$/.test(before)) continue;       // mid-sentence emphasis, not a point
    if (ABBREV.test(before)) continue;          // "e.g." is not a sentence end
    out.push(at);
  }
  return out;
}

export function parseSummaryOutline(html) {
  if (typeof html !== "string" || !html.trim()) return null;

  /* Paragraph wrappers carry no structure here; every summary but one is a
     single <p>. Joining with a space keeps sentence boundaries intact. */
  var body = html.replace(/<\/p>\s*<p>/gi, " ").replace(/^\s*<p>/i, "").replace(/<\/p>\s*$/i, "").trim();
  if (/<(ul|ol|li|table|h[1-6])\b/i.test(body)) return null;   // already structured

  var mask = topLevelMask(body);
  var starts = pointStarts(body, mask);
  if (starts.length < 3) return null;

  var lead = clean(body.slice(0, starts[0]));
  var items = [];
  for (var i = 0; i < starts.length; i++) {
    var chunk = body.slice(starts[i], i + 1 < starts.length ? starts[i + 1] : body.length).trim();
    var m = chunk.match(/^<strong>([\s\S]*?)<\/strong>/i);
    if (!m) return null;
    var head = clean(m[1]);
    /* Passed un-cleaned: a label written "<strong>X</strong>: a, b, c" leaves the
       colon as the very first character, and clean() would strip the one marker
       splitSubs needs to find the list. */
    var rest = chunk.slice(m[0].length).trim();
    if (!head) return null;

    var split = splitSubs(rest);
    var sentences = split ? null : splitSentences(clean(rest));
    items.push({
      head: head,
      body: split ? split.head : sentences ? "" : clean(rest),
      /* "list" renders as dashed enumeration, "sentences" as plain sub-lines. */
      kind: split ? "list" : sentences ? "sentences" : null,
      subs: split ? split.subs : sentences || [],
    });
  }

  if (items.some(function (it) {
    return !balanced(it.head) || !balanced(it.body) || it.subs.some(function (s) { return !balanced(s); });
  })) return null;
  if (lead && !balanced(lead)) return null;

  return { lead: lead, items: items };
}

export default parseSummaryOutline;
