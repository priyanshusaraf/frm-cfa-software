import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { esc } from "../../lib/html.js";

/* Sticky in-page table of contents, ported from the original buildTOC/teardownTOC.
   Rendered via a portal onto document.body (the original nav is position:fixed and
   appended directly to <body>, outside the page mount). */
export default function ChapterTOC({ sections }) {
  const navRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (!sections || !sections.length) return;
    const nav = navRef.current;
    if (!nav) return;

    const links = {};
    nav.querySelectorAll("a").forEach((a) => {
      links[a.getAttribute("data-target")] = a;
    });

    /* highlight the first section immediately so there's no flash of nothing-active */
    if (links[sections[0].id]) {
      links[sections[0].id].classList.add("active");
      activeRef.current = sections[0].id;
    }

    let observer = null;
    if (window.IntersectionObserver) {
      const visible = {};
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { visible[entry.target.id] = entry.isIntersecting; });
          let activeId = null;
          for (let i = 0; i < sections.length; i++) {
            if (visible[sections[i].id]) { activeId = sections[i].id; break; }
          }
          if (!activeId) return;
          nav.querySelectorAll("a.active").forEach((a) => a.classList.remove("active"));
          if (links[activeId]) links[activeId].classList.add("active");
          activeRef.current = activeId;
        },
        { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
      );
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
    }

    return () => { if (observer) observer.disconnect(); };
  }, [sections]);

  if (!sections || !sections.length) return null;

  function onClick(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return createPortal(
    <nav className="chapter-toc" ref={navRef}>
      <div className="chapter-toc-title">On this page</div>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={"#" + s.id} data-target={s.id} onClick={(e) => onClick(e, s.id)}
               dangerouslySetInnerHTML={{ __html: esc(s.txt) }} />
          </li>
        ))}
      </ul>
    </nav>,
    document.body
  );
}
