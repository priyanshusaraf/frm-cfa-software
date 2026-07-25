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

/* One concept, rendered as a dictionary entry rather than a card: the term is
   the heading, the definition leads unlabelled (its position says what it is),
   and every other field is a paragraph with a quiet run-in label. Labels are
   deliberately uniform and neutral; only Pitfall carries colour, because a trap
   is the one field whose meaning is a warning. See style.css for the why.
   `id` (concept-<slug>) makes the entry a scroll target for Key-points jump-to. */
export default function ConceptCard({ c, open, id }) {
  return (
    <details className="concept" id={id} open={open || undefined}>
      <summary>{c.name}</summary>
      <div className="concept-body">
        {c.def && <Field tag="Definition" cls="def"><Html as="span" html={c.def} /></Field>}
        {c.intuition && <Field tag="Why it works" cls="int"><Html as="span" html={c.intuition} /></Field>}
        {c.example && <Field tag="Example" cls="ex"><Html as="span" html={c.example} /></Field>}
        {c.counter && <Field tag="Where it breaks" cls="cex"><Html as="span" html={c.counter} /></Field>}
        {c.pitfall && <Field tag="Trap" cls="pit"><Html as="span" html={c.pitfall} /></Field>}
        {c.related && c.related.length > 0 && (
          <Field tag="Related" cls="rel">
            {c.related.map((x, i) =>
              typeof x === "object"
                ? <Link key={i} className="chip" to={rpath(x.r)}>{x.label}</Link>
                : <span key={i} className="chip">{x}</span>
            )}
          </Field>
        )}
        {c.memory && <Field tag="Remember it" cls="mem"><Html as="span" html={c.memory} /></Field>}
      </div>
    </details>
  );
}
