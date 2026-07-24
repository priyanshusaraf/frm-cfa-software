import { useMemo } from "react";
import { Link } from "react-router-dom";
import { rpath } from "../../lib/meta.js";
import { readingArc } from "../../lib/readingArc.js";

/* Thin, auto-generated orientation strip under the tagline: where this reading
   sits in its session, what it builds on, and what it sets up. All derived from
   META (deps + sessions), no per-reading authoring. Renders nothing when there
   is nothing to say. */
export default function ReadingArc({ rn }) {
  const arc = useMemo(() => readingArc(rn), [rn]);
  if (!arc) return null;

  const { position, sessionCount, sessionName, buildsOn, setsUp } = arc;
  const hasPos = position > 0 && sessionCount > 0;
  if (!hasPos && !buildsOn.length && !setsUp.length) return null;

  const cap = (list) => list.slice(0, 3);
  const more = (list) => (list.length > 3 ? " +" + (list.length - 3) : "");

  const refList = (list) =>
    cap(list).map((x, i) => (
      <span key={x.n}>
        {i > 0 ? ", " : ""}
        <Link to={rpath(x.n)} title={x.t} style={{ color: "var(--text-dim)" }}>R{x.n}</Link>
      </span>
    ));

  return (
    <div
      style={{
        fontSize: "0.76rem",
        color: "var(--text-faint)",
        margin: "0.1rem 0 0.4rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.35rem 0.9rem",
        alignItems: "baseline",
      }}
    >
      {hasPos && (
        <span>
          Reading {position} of {sessionCount}
          {sessionName ? <> in {sessionName}</> : null}
        </span>
      )}
      {buildsOn.length > 0 && (
        <span>Builds on {refList(buildsOn)}{more(buildsOn)}</span>
      )}
      {setsUp.length > 0 && (
        <span>Sets up {refList(setsUp)}{more(setsUp)}</span>
      )}
    </div>
  );
}
