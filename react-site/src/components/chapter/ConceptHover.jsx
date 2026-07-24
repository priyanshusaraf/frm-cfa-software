import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { conceptLinkTable as conceptLinks } from "../../data/conceptLinkTable.js";

/* Hover snippet for the inline core-concept links that `lib/conceptLinks.js`
   injects into rendered chapter prose (CLAUDE.md §6, Phase 3).

   This is ONE delegated listener on the chapter root rather than a React
   component per link, because the links are created by a DOM pass over
   already-rendered trusted HTML, not by JSX. Radix's HoverCard wants to own its
   trigger element, which we do not have here, so the card is a small
   fixed-position panel positioned off the trigger's rect.

   Touch: `hover` does not exist there, so the first tap opens the card instead
   of navigating (the card's "Learn more" link does the navigation). */

const BY_SLUG = new Map(conceptLinks.map((c) => [c.slug, c]));
const CLOSE_DELAY = 140; // ms of grace so the pointer can travel link -> card

export default function ConceptHover({ containerRef }) {
  const [open, setOpen] = useState(null); // { slug, rect }
  const closeTimer = useRef(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const root = containerRef && containerRef.current;
    if (!root) return;

    const cancelClose = () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = 0;
      }
    };
    const scheduleClose = () => {
      cancelClose();
      closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
    };
    const show = (el) => {
      const slug = el.getAttribute("data-cslug");
      if (!slug || !BY_SLUG.has(slug)) return;
      cancelClose();
      const r = el.getBoundingClientRect();
      setOpen({ slug, rect: { top: r.top, bottom: r.bottom, left: r.left, width: r.width } });
    };
    const trigger = (e) => (e.target.closest ? e.target.closest("a.cref") : null);

    const onOver = (e) => {
      const el = trigger(e);
      if (el) show(el);
      else if (!e.target.closest || !e.target.closest("[data-concept-card]")) scheduleClose();
    };
    const onFocus = (e) => {
      const el = trigger(e);
      if (el) show(el);
    };
    const onClick = (e) => {
      const el = trigger(e);
      if (!el) return;
      /* Coarse pointer: first tap reveals the snippet rather than navigating. */
      if (window.matchMedia && window.matchMedia("(hover: none)").matches) {
        e.preventDefault();
        show(el);
      }
    };
    const onScroll = () => setOpen(null);

    root.addEventListener("mouseover", onOver);
    root.addEventListener("mouseout", scheduleClose);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelClose();
      root.removeEventListener("mouseover", onOver);
      root.removeEventListener("mouseout", scheduleClose);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  const c = BY_SLUG.get(open.slug);
  if (!c) return null;

  const W = 340;
  const below = open.rect.bottom + 8;
  const flip = below + 190 > window.innerHeight && open.rect.top > 200;
  const style = {
    position: "fixed",
    width: W,
    maxWidth: "calc(100vw - 24px)",
    left: Math.max(12, Math.min(open.rect.left, window.innerWidth - W - 12)),
    top: flip ? undefined : below,
    bottom: flip ? window.innerHeight - open.rect.top + 8 : undefined,
    zIndex: 60,
  };

  return (
    <div
      data-concept-card=""
      ref={cardRef}
      className="card"
      style={style}
      onMouseEnter={() => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = 0; } }}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="kicker" style={{ color: "var(--purple)" }}>
        {c.layer === "revision" ? "Refresher" : "Core concept"}
      </div>
      <div style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0.15rem 0 0.35rem" }}>{c.display || c.name}</div>
      <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", margin: 0, lineHeight: 1.5 }}>{c.snippet}</p>
      <Link
        to={"/concept/" + c.slug}
        onClick={() => setOpen(null)}
        style={{ display: "inline-block", marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--accent)" }}
      >
        Learn more &rarr;
      </Link>
    </div>
  );
}
