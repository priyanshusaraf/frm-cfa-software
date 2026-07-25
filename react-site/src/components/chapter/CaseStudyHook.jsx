import { useMemo } from "react";
import { Link } from "react-router-dom";
import { hooksForReading } from "../../data/caseStudy.js";
import { caseId } from "../../pages/CaseStudy.jsx";

/* Inline case-study callout (workstream E, reverse fan-out). When a reading is
   named by any case-study hook, render a "How <bank> handled this" card linking
   into /case-study. Real-world illustration, so it is visually marked as
   beyond-exam. Renders nothing when no hook matches. */
export default function CaseStudyHook({ rn }) {
  const hooks = useMemo(() => (rn ? hooksForReading(rn) : []), [rn]);
  if (!hooks.length) return null;

  return (
    <div className="card" style={{ marginTop: "0.6rem", borderLeft: "3px solid var(--purple)" }}>
      <div className="section-label" style={{ color: "var(--purple)" }}>
        In the real world
        <span className="chip" style={{ marginLeft: "0.5rem", fontSize: "0.66rem", color: "var(--purple)", borderColor: "var(--purple)" }}>
          beyond exam scope
        </span>
      </div>
      {hooks.map((h, i) => (
        <p key={i} style={{ fontSize: "0.88rem", margin: "0.3rem 0 0" }}>
          <strong>How {h.bank} handled this:</strong>{" "}
          <span style={{ color: "var(--text-dim)" }}>{h.oneLiner}</span>{" "}
          <Link to={"/case-study?case=" + caseId(h.book)}>Read the case study →</Link>
        </p>
      ))}
    </div>
  );
}
