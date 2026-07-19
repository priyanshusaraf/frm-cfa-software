import { Link } from "react-router-dom";
import Html from "../Html.jsx";
import { rpath, readingMeta } from "../../lib/meta.js";

/* Ported from the connList() closure in renderChapter (the "from" / "to" cards). */
export default function ConnList({ title, arr }) {
  if (!arr || !arr.length) return null;
  return (
    <div className="card">
      <h3>{title}</h3>
      {arr.map((x, i) => {
        if (x.r) {
          const rm = readingMeta(x.r);
          return (
            <p key={i}>
              <Link to={rpath(x.r)}><strong>R{x.r} · {rm ? rm.t : ""}</strong></Link> — <Html as="span" html={x.why} />
            </p>
          );
        }
        return (
          <p key={i}>
            <strong>{x.label || ""}</strong>{x.label ? " — " : ""}<Html as="span" html={x.why} />
          </p>
        );
      })}
    </div>
  );
}
