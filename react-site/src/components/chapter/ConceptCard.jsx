import { Link } from "react-router-dom";
import Html from "../Html.jsx";
import { rpath } from "../../lib/meta.js";

function Field({ tag, cls, children }) {
  return (
    <div className={"concept-field " + cls}>
      <span className={"field-tag " + cls}>{tag}</span>
      <div>{children}</div>
    </div>
  );
}

/* One <details class="concept"> card, ported from the fld() closure in renderChapter.
   `id` (concept-<slug>) makes the card a scroll target for the Key-points jump-to. */
export default function ConceptCard({ c, open, id }) {
  return (
    <details className="concept" id={id} open={open || undefined}>
      <summary>{c.name}</summary>
      <div className="concept-body">
        {c.def && <Field tag="Definition" cls="def"><Html as="span" html={c.def} /></Field>}
        {c.intuition && <Field tag="Intuition" cls="int"><Html as="span" html={c.intuition} /></Field>}
        {c.example && <Field tag="Example" cls="ex"><Html as="span" html={c.example} /></Field>}
        {c.counter && <Field tag="Counterexample" cls="cex"><Html as="span" html={c.counter} /></Field>}
        {c.pitfall && <Field tag="Pitfall" cls="pit"><Html as="span" html={c.pitfall} /></Field>}
        {c.related && c.related.length > 0 && (
          <Field tag="Related" cls="rel">
            {c.related.map((x, i) =>
              typeof x === "object"
                ? <Link key={i} className="chip" to={rpath(x.r)}>{x.label}</Link>
                : <span key={i} className="chip">{x}</span>
            )}
          </Field>
        )}
        {c.memory && <Field tag="Memory trick" cls="mem"><Html as="span" html={c.memory} /></Field>}
      </div>
    </details>
  );
}
