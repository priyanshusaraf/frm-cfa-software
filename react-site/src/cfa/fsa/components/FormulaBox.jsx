import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import Html from "../../../components/Html.jsx";
import { renderMath } from "../../../lib/tex.js";

/* KaTeX display math cannot line-wrap. A formula that is a little too wide is
   scaled down (to 80% at most); one that is still too wide is re-rendered in
   inline mode with \displaystyle, where KaTeX DOES break lines after
   relations and binary operators, so a long roll-forward wraps at its + and =
   signs instead of being clipped. Re-checked on resize. */
export default function FormulaBox({ name, tex, plain }) {
  const [wrap, setWrap] = useState(false);
  const html = useMemo(
    () => (wrap ? renderMath("\\displaystyle " + tex, false) : renderMath(tex, true)),
    [tex, wrap]
  );
  const ref = useRef(null);

  useLayoutEffect(() => { setWrap(false); }, [tex]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      if (wrap) {
        /* A single fraction can still be wider than a narrow card. */
        if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
          el.style.fontSize = Math.max(60, Math.floor((el.clientWidth / el.scrollWidth) * 112)) + "%";
        }
        return;
      }
      const k = el.querySelector(".katex-html") || el.querySelector(".katex");
      if (!k) return;
      const have = el.clientWidth;
      const pd = k.style.display, pw = k.style.width;
      k.style.display = "inline-block";
      k.style.width = "max-content";
      const mc = k.getBoundingClientRect().width;
      k.style.display = pd;
      k.style.width = pw;
      const box = el.querySelector(".katex-display") || el;
      const need = Math.max(mc, box.scrollWidth);
      if (have <= 0 || need <= have + 1) return;
      const ratio = have / need;
      if (ratio < 0.8) { setWrap(true); return; }
      el.style.fontSize = Math.floor(ratio * 100) + "%";
      if (box.scrollWidth > box.clientWidth + 1) setWrap(true);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    /* KaTeX's web fonts load after first paint and are wider than the
       fallback, so a formula measured early can overflow later without its
       box changing size. Re-fit once they arrive. */
    let alive = true;
    const fonts = document.fonts;
    const refit = () => { if (alive) fit(); };
    if (fonts) {
      fonts.ready.then(refit);
      fonts.addEventListener && fonts.addEventListener("loadingdone", refit);
    }
    return () => {
      alive = false;
      ro.disconnect();
      if (fonts && fonts.removeEventListener) fonts.removeEventListener("loadingdone", refit);
    };
  }, [html, wrap]);

  return (
    <div className="fsa-formula">
      {name && <div className="fsa-formula-n">{name}</div>}
      <div ref={ref} className={"fsa-formula-m f-tex" + (wrap ? " is-wrapped" : "")} dangerouslySetInnerHTML={{ __html: html }} />
      {plain && <Html className="fsa-formula-p" html={plain} />}
    </div>
  );
}
