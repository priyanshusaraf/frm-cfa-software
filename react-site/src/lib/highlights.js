/* Pure DOM anchoring for text highlights. No React, no store — Highlighter.jsx
   wires this to state. Anchoring survives re-renders by quote + short
   prefix/suffix context, never by node index/offset (those don't survive
   React re-renders). Nothing in here may throw on unmatched text: unmatched
   highlights come back as "orphaned" ids, never crash the render. */

/* Collapse all whitespace runs (space/tab/newline) to a single space and trim. */
export function normalize(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

const CONTEXT_LEN = 32;
const MAX_QUOTE_LEN = 600;

/* ---- selection capture -------------------------------------------------- */

/* From a DOM Selection inside `root`, produce {text, prefix, suffix, section}.
   text/prefix/suffix are whitespace-normalized. section is the id of the
   nearest preceding .section-label element, "" if none. Returns null if the
   selection is unusable (collapsed, empty, outside root, or a DOM error). */
export function captureSelection(root, sel) {
  try {
    if (!root || !sel || !sel.rangeCount || sel.isCollapsed) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return null;

    const text = normalize(range.toString()).slice(0, MAX_QUOTE_LEN);
    if (!text) return null;

    let prefix = "";
    try {
      const before = document.createRange();
      before.setStart(root, 0);
      before.setEnd(range.startContainer, range.startOffset);
      prefix = normalize(before.toString()).slice(-CONTEXT_LEN);
    } catch { /* boundary not comparable — leave prefix empty */ }

    let suffix = "";
    try {
      const after = document.createRange();
      after.setStart(range.endContainer, range.endOffset);
      after.setEnd(root, root.childNodes.length);
      suffix = normalize(after.toString()).slice(0, CONTEXT_LEN);
    } catch { /* boundary not comparable — leave suffix empty */ }

    const section = sectionFor(root, range.startContainer);
    return { text, prefix, suffix, section };
  } catch {
    return null;
  }
}

function sectionFor(root, node) {
  if (!root || !node) return "";
  let labels;
  try { labels = root.querySelectorAll(".section-label"); } catch { return ""; }
  let result = "";
  for (const el of labels) {
    let pos;
    try { pos = el.compareDocumentPosition(node); } catch { continue; }
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) result = el.id || "";
  }
  return result;
}

/* ---- text-node map over root --------------------------------------------
   Concatenates the raw text of every qualifying text node (skips
   script/style and anything already inside an existing mark.hl), then builds
   a normalized version of that concatenation plus a normalized->raw index
   map so a match found in the normalized string can be traced back to real
   DOM (node, offset) pairs for wrapping. */
function buildMap(root) {
  const nodes = []; // { node, start, end } — start/end are raw-text offsets
  let rawText = "";

  let walker;
  try {
    walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest("script, style")) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest("mark.hl")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
  } catch {
    return { nodes, rawText: "", normText: "", normToRaw: [0] };
  }

  let n;
  while ((n = walker.nextNode())) {
    const t = n.nodeValue;
    if (!t) continue;
    nodes.push({ node: n, start: rawText.length, end: rawText.length + t.length });
    rawText += t;
  }

  let normText = "";
  const normToRaw = [];
  let inWs = false;
  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i];
    if (/\s/.test(ch)) {
      if (!inWs) { normText += " "; normToRaw.push(i); inWs = true; }
    } else {
      normText += ch; normToRaw.push(i); inWs = false;
    }
  }
  normToRaw.push(rawText.length);

  return { nodes, rawText, normText, normToRaw };
}

function findAll(text, sub) {
  const out = [];
  if (!sub) return out;
  let i = 0;
  while (true) {
    const idx = text.indexOf(sub, i);
    if (idx === -1) break;
    out.push(idx);
    i = idx + 1;
  }
  return out;
}

function commonSuffixLen(a, b) {
  let n = 0;
  while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++;
  return n;
}
function commonPrefixLen(a, b) {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}

function scoreContext(normText, pos, len, wantPrefix, wantSuffix) {
  const before = normText.slice(Math.max(0, pos - CONTEXT_LEN), pos);
  const after = normText.slice(pos + len, pos + len + CONTEXT_LEN);
  return commonSuffixLen(before, wantPrefix || "") + commonPrefixLen(after, wantSuffix || "");
}

/* Wraps the raw-text range [rawStart, rawEnd) — which may span several text
   nodes — each in its own <mark class="hl hl-<color>" data-hl="<id>">. */
function wrapRange(map, rawStart, rawEnd, id, color, onClick) {
  const marks = [];
  for (const nd of map.nodes) {
    const segStart = Math.max(nd.start, rawStart);
    const segEnd = Math.min(nd.end, rawEnd);
    if (segStart >= segEnd) continue;

    const localStart = segStart - nd.start;
    const localEnd = segEnd - nd.start;
    let textNode = nd.node;
    if (!textNode || !textNode.parentNode) continue;

    try {
      if (localStart > 0) textNode = textNode.splitText(localStart);
      if (localEnd - localStart < textNode.length) textNode.splitText(localEnd - localStart);

      const mark = document.createElement("mark");
      mark.className = `hl hl-${color || "y"}`;
      mark.setAttribute("data-hl", id);
      textNode.parentNode.insertBefore(mark, textNode);
      mark.appendChild(textNode);
      if (onClick) mark.addEventListener("click", () => onClick(id, mark));
      marks.push(mark);
    } catch {
      /* this node couldn't be split/wrapped — skip it, keep going */
    }
  }
  return marks;
}

/* ---- paint / unpaint ------------------------------------------------------ */

/* Paints every highlight it can find inside root, wrapping matched text-node
   segments in <mark class="hl hl-<color>" data-hl="<id>">, wired to
   onClick(id, mark). Disambiguates repeated quotes by best prefix/suffix
   match. Never throws — unmatched highlights come back in `orphaned`. */
export function paint(root, highlights, onClick) {
  const painted = [];
  const orphaned = [];
  if (!root || !highlights || !highlights.length) return { painted, orphaned };

  const list = [...highlights].sort((a, b) => (a.ts || 0) - (b.ts || 0));
  for (const h of list) {
    try {
      const quote = normalize(h.text || "");
      if (!quote) { orphaned.push(h.id); continue; }

      const map = buildMap(root);
      const positions = findAll(map.normText, quote);
      if (!positions.length) { orphaned.push(h.id); continue; }

      let best = positions[0];
      if (positions.length > 1) {
        let bestScore = -1;
        for (const p of positions) {
          const score = scoreContext(map.normText, p, quote.length, h.prefix, h.suffix);
          if (score > bestScore) { bestScore = score; best = p; }
        }
      }

      const ns = best;
      const ne = best + quote.length;
      const rawStart = map.normToRaw[ns];
      const rawEnd = map.normToRaw[ne];
      if (rawStart == null || rawEnd == null || rawEnd <= rawStart) { orphaned.push(h.id); continue; }

      const marks = wrapRange(map, rawStart, rawEnd, h.id, h.color, onClick);
      if (marks.length) painted.push(h.id); else orphaned.push(h.id);
    } catch {
      orphaned.push(h.id);
    }
  }
  return { painted, orphaned };
}

/* Removes every mark.hl wrapper inside root, merging its text back into the
   surrounding text node. */
export function unpaint(root) {
  if (!root) return;
  let marks;
  try { marks = root.querySelectorAll("mark.hl"); } catch { return; }
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    try { parent.normalize(); } catch { /* no-op */ }
  });
}
