import React, { Suspense, lazy } from "react";
import Html from "../../../components/Html.jsx";
import FormulaBox from "./FormulaBox.jsx";
import { scenarioById } from "../scenarios/index.js";
import Theater from "./Theater.jsx";
import { ConceptCheck, Sorter, DecisionTree } from "./Interactives.jsx";

/* Renders a module's content blocks. Block types are documented in
   src/cfa/fsa/README.md; an unknown type or a missing scenario/widget renders
   a visible warning instead of throwing, so one bad block never blanks a page.

   Widgets are discovered by file name: { t: "widget", name: "FxTranslator" }
   loads src/cfa/fsa/widgets/FxTranslator.jsx on demand. */
const widgetFiles = import.meta.glob("../widgets/*.jsx");
const widgetCache = {};
function widgetFor(name) {
  if (widgetCache[name]) return widgetCache[name];
  const loader = widgetFiles["../widgets/" + name + ".jsx"];
  if (!loader) return null;
  widgetCache[name] = lazy(loader);
  return widgetCache[name];
}

function Warn({ children }) {
  return <div className="fsa-warnbox">{children}</div>;
}


export function Block({ b }) {
  switch (b.t) {
    case "p":
      return <Html className="fsa-prose" html={b.html} />;
    case "h":
      return <h3 className="fsa-h3">{b.text}</h3>;
    case "callout":
      return (
        <div className={"fsa-callout tone-" + (b.tone || "insight")}>
          {b.title && <b>{b.title}</b>}
          <Html html={b.html} />
        </div>
      );
    case "table":
      return (
        <div className="fsa-table">
          {b.caption && <div className="fsa-table-cap">{b.caption}</div>}
          <div className="tablewrap">
            <table>
              {b.head && (
                <thead>
                  <tr>{b.head.map((h, i) => <th key={i}><Html as="span" html={h} /></th>)}</tr>
                </thead>
              )}
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j}><Html as="span" html={String(c)} /></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && <Html className="fsa-table-note" html={b.note} />}
        </div>
      );
    case "formula":
      return <FormulaBox name={b.name} tex={b.tex} plain={b.plain} />;
    case "steps":
      return (
        <div className="fsa-steps">
          {b.title && <div className="fsa-steps-t">{b.title}</div>}
          <ol>
            {b.items.map((it, i) => (
              <li key={i}>
                <span className="fsa-steps-n">{i + 1}</span>
                <div>
                  {it.title && <b>{it.title}</b>}
                  <Html html={it.html} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "compare":
      return (
        <div className="fsa-compare" style={{ gridTemplateColumns: "repeat(" + Math.min(b.items.length, 3) + ", minmax(0,1fr))" }}>
          {b.items.map((it, i) => (
            <div key={i} className={"fsa-compare-col tone-" + (it.tone || "neutral")}>
              <div className="fsa-compare-h">{it.title}</div>
              <ul>{it.points.map((p, j) => <li key={j}><Html as="span" html={p} /></li>)}</ul>
            </div>
          ))}
        </div>
      );
    case "theater": {
      const scn = scenarioById(b.scenario);
      if (!scn) return <Warn>Missing scenario: {b.scenario}</Warn>;
      return <Theater key={scn.id} scenario={scn} />;
    }
    case "widget": {
      const W = widgetFor(b.name);
      if (!W) return <Warn>Missing widget: {b.name}</Warn>;
      return (
        <Suspense fallback={<div className="fsa-dim" style={{ padding: "1rem 0" }}>Loading interactive…</div>}>
          <W {...(b.props || {})} />
        </Suspense>
      );
    }
    case "check":
      return <ConceptCheck {...b} />;
    case "sort":
      return <Sorter {...b} />;
    case "tree":
      return <DecisionTree {...b} />;
    default:
      return <Warn>Unknown block type: {String(b.t)}</Warn>;
  }
}

export default function Blocks({ blocks }) {
  return (
    <div className="fsa-blocks">
      {(blocks || []).map((b, i) => <Block key={i} b={b} />)}
    </div>
  );
}
