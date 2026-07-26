/* KaTeX helpers, ported from the original app.js (same detection + fallback rules). */
import katex from "katex";
import "katex/dist/katex.min.css";
import { esc } from "./html.js";

export function isTex(s) { return /\\|[_^]\{/.test(s); }

function katexRender(tex, display) {
  try {
    return katex.renderToString(tex, {
      throwOnError: false, displayMode: !!display, output: "html",
      strict: false, trust: false,
    });
  } catch (e) { return '<span class="tex-error">' + esc(tex) + "</span>"; }
}

/* Splits display math at top-level ";" separators (brace/paren depth zero and
   outside \text{}), so a card carrying two related formulas can stack them.

   KaTeX cannot line-wrap, so a wide formula previously either shrank to the
   fitMath floor or grew a horizontal scrollbar. Owner-reported against R36's
   "EE(MPoR) = ...; PFE(MPoR) = ..." which scrolled off the card: two formulas
   on one line is a stacking problem, not a scrolling one. */
function stackParts(tex) {
  const parts = [];
  let depth = 0, last = 0;
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i];
    if (c === "\\") { i++; continue; }              // skip escaped char
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") depth--;
    else if (c === ";" && depth === 0) { parts.push(tex.slice(last, i)); last = i + 1; }
  }
  parts.push(tex.slice(last));
  return parts.map((p) => p.replace(/^\s*\\quad\s*/, "").trim()).filter(Boolean);
}

/* Formula-box math: typeset only strings that look like LaTeX;
   legacy HTML-math strings pass through untouched. */
export function renderMath(s, display) {
  if (!isTex(s)) return s;
  if (display) {
    const parts = stackParts(s);
    /* gathered centres each row and needs no alignment point, so it is safe for
       arbitrary formulas that were never written to align on anything. */
    if (parts.length > 1) {
      return katexRender("\\begin{gathered}" + parts.join("\\\\[4pt]") + "\\end{gathered}", true);
    }
  }
  return katexRender(s, display);
}

/* Prose math: typeset \( … \) inline and \[ … \] display, leaving all other
   HTML (and every literal $ for currency) untouched. No-op on un-annotated text. */
export function renderProse(s) {
  if (s == null) return s;
  return String(s)
    .replace(/\\\[([\s\S]+?)\\\]/g, (_m, t) => katexRender(t.trim(), true))
    .replace(/\\\(([\s\S]+?)\\\)/g, (_m, t) => katexRender(t.trim(), false));
}

/* KaTeX display math can't line-wrap; shrink over-wide formulas to fit (floored). */
export function fitMath(root) {
  (root || document).querySelectorAll(".f-tex").forEach((el) => {
    el.style.fontSize = "";
    const inner = el.querySelector(".katex");
    if (!inner) return;
    /* Start from whatever the stylesheet actually says rather than a hardcoded
       number: this used to be pinned at 1.22rem with a "must match style.css"
       comment, so raising the CSS size silently did nothing and every formula
       kept rendering at the old size. Read it, and the two cannot drift again. */
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let size = (parseFloat(getComputedStyle(el).fontSize) || 19.5) / rootPx;
    let guard = 0;
    while (inner.offsetWidth > el.clientWidth - 2 && size > 0.7 && guard++ < 40) {
      size -= 0.03;
      el.style.fontSize = size.toFixed(3) + "rem";
    }
  });
}
