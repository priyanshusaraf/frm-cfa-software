import { slugify } from "../../lib/html.js";

/* Ported from the original label(txt, color) helper — same markup + id (used by the TOC). */
export default function SectionLabel({ txt, color }) {
  return (
    <div className="section-label" id={slugify(txt)}>
      <span className="dot" style={{ background: color || "var(--accent)" }} />
      {txt}
    </div>
  );
}
