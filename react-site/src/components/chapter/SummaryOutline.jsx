import Html from "../Html.jsx";
import { parseSummaryOutline } from "../../lib/summaryOutline.js";

/* The one-page summary, rendered as a two-level outline when its structure can
   be derived (see lib/summaryOutline.js) and as the original paragraph when it
   cannot. The fallback is not an edge case: 11 of 101 summaries do not carry the
   bold-label scaffolding, and they must still render exactly as authored. */
export default function SummaryOutline({ html, color }) {
  const outline = parseSummaryOutline(html);
  if (!outline) return <div className="card accent"><Html html={html} /></div>;

  return (
    <div className="card accent">
      {outline.lead && <Html className="sum-lead" html={outline.lead} />}
      <ul className="sum-outline">
        {outline.items.map((it, i) => (
          <li key={i}>
            <div className="sum-point">
              <span className="sum-dot" style={color ? { background: color } : undefined} />
              <div>
                <Html as="span" className="sum-head" html={it.head} />
                {it.body && <> <Html as="span" html={it.body} /></>}
              </div>
            </div>
            {it.subs.length > 0 && (
              <ul className={`sum-subs${it.kind === "list" ? " sum-subs-list" : ""}`}>
                {it.subs.map((s, j) => (
                  <li key={j}><Html as="span" html={s} /></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
