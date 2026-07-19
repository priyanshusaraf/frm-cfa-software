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

/* Formula-box math: typeset only strings that look like LaTeX;
   legacy HTML-math strings pass through untouched. */
export function renderMath(s, display) {
  return isTex(s) ? katexRender(s, display) : s;
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
    let size = 1.22, guard = 0; // rem; must match .f-tex in style.css
    while (inner.offsetWidth > el.clientWidth - 2 && size > 0.7 && guard++ < 40) {
      size -= 0.03;
      el.style.fontSize = size.toFixed(3) + "rem";
    }
  });
}
