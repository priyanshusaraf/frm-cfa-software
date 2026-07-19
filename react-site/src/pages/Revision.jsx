import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAllReadings } from "../lib/readings.js";
import { META } from "../lib/meta.js";
import { renderMath, isTex } from "../lib/tex.js";
import Html from "../components/Html.jsx";

const KINDS = [
  ["formulas", "Formulas"],
  ["definitions", "Definitions"],
  ["pitfalls", "Pitfalls & traps"],
  ["highyield", "★★★★★ only"],
  ["hooks", "Memory hooks"],
];

function RevItem({ rn, children }) {
  return (
    <div className="rev-item">
      <span className="rv-src"><Link to={"/chapter/" + rn}>R{rn}</Link></span>
      <div>{children}</div>
    </div>
  );
}

export default function Revision() {
  const [bookSel, setBookSel] = useState(0);
  const [kindSel, setKindSel] = useState("formulas");
  const readings = useAllReadings();

  const blocks = useMemo(() => {
    if (!readings) return [];
    const out = [];
    META.books.forEach((b) => {
      if (bookSel && b.n !== bookSel) return;
      const items = [];
      b.readings.forEach((rm) => {
        const d = readings[rm.n];
        if (!d) return;
        if (kindSel === "formulas") {
          (d.formulas || []).forEach((f, i) => {
            items.push(
              <RevItem rn={rm.n} key={"f" + rm.n + i}>
                <strong>{f.name}:</strong>{" "}
                <span
                  className={isTex(f.math) ? "f-tex" : undefined}
                  dangerouslySetInnerHTML={{ __html: renderMath(f.math, false) }}
                />
                {f.note ? <span style={{ color: "var(--text-faint)" }}> — <Html as="span" html={f.note} /></span> : null}
              </RevItem>
            );
          });
        }
        if (kindSel === "definitions") {
          (d.concepts || []).forEach((c, i) => {
            items.push(
              <RevItem rn={rm.n} key={"d" + rm.n + i}>
                <strong>{c.name}</strong> — <Html as="span" html={c.def || ""} />
              </RevItem>
            );
          });
        }
        if (kindSel === "pitfalls") {
          (d.misconceptions || []).forEach((m, i) => {
            items.push(
              <RevItem rn={rm.n} key={"m" + rm.n + i}>
                <span style={{ color: "var(--red)" }}>✗</span> <Html as="span" html={m.wrong} /> <span style={{ color: "var(--green)" }}>✓</span> <Html as="span" html={m.right} />
              </RevItem>
            );
          });
          (d.concepts || []).forEach((c, i) => {
            if (c.pitfall) items.push(
              <RevItem rn={rm.n} key={"p" + rm.n + i}>
                <span style={{ color: "var(--amber)" }}>⚠</span> <strong>{c.name}:</strong> <Html as="span" html={c.pitfall} />
              </RevItem>
            );
          });
        }
        if (kindSel === "highyield") {
          (d.highYield || []).forEach((y, i) => {
            if (y.stars >= 5) items.push(
              <RevItem rn={rm.n} key={"y" + rm.n + i}><Html as="span" html={y.what} /></RevItem>
            );
          });
        }
        if (kindSel === "hooks") {
          (d.hooks || []).forEach((k, i) => {
            items.push(
              <RevItem rn={rm.n} key={"h" + rm.n + i}>
                <strong>{k.title}:</strong> <Html as="span" html={k.text} />
              </RevItem>
            );
          });
        }
      });
      if (items.length) out.push({ book: b, items });
    });
    return out;
  }, [readings, bookSel, kindSel]);

  return (
    <main className="page">
      <h1>Revision mode</h1>
      <p className="lead">No explanations. Formulas, definitions, pitfalls, relationships — maximum signal per minute.</p>
      <div className="rev-controls">
        <button className={bookSel === 0 ? "on" : ""} onClick={() => setBookSel(0)}>All books</button>
        {META.books.map((b) => (
          <button key={b.n} className={bookSel === b.n ? "on" : ""} onClick={() => setBookSel(b.n)}>
            {b.n} · {b.short}
          </button>
        ))}
      </div>
      <div className="rev-controls">
        {KINDS.map(([k, label]) => (
          <button key={k} className={kindSel === k ? "on" : ""} onClick={() => setKindSel(k)}>{label}</button>
        ))}
      </div>
      {readings === null ? (
        <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>Loading…</p>
      ) : (
        <div>
          {blocks.length === 0 ? (
            <p style={{ color: "var(--text-faint)" }}>Nothing here yet for this filter.</p>
          ) : (
            blocks.map(({ book, items }) => (
              <div className="rev-block" key={book.n}>
                <h2 style={{ color: book.color }}>Book {book.n} · {book.title}</h2>
                {items}
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
