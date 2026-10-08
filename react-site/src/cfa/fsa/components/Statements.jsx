import React from "react";
import { fmt } from "../engine/ledger.js";
import { useTween } from "./motion.js";

/* The four financial statements, rendered the way a printed annual report
   lays them out, for one or more columns. Purely presentational: the caller
   decides which value each cell shows (so the Theater can hold old values
   while chips are in flight, and Practice can swap cells for inputs). */

function NumCell({ value, delta, hit, ghost }) {
  const target = value == null ? 0 : value;
  const shown = useTween(target);
  const intTarget = Math.abs(target - Math.round(target)) < 0.005;
  const txt = value == null ? "" : fmt(intTarget ? Math.round(shown) : shown, intTarget ? { dp: 0 } : undefined);
  const zero = value != null && Math.abs(target) < 0.005;
  return (
    <span className={"fsa-num" + (zero ? " is-zero" : "") + (ghost ? " is-ghost" : "")}>
      {delta != null && Math.abs(delta) > 0.005 && (
        <span className={"fsa-delta " + (delta > 0 ? "up" : "down")} key={String(delta)}>
          {(delta > 0 ? "+" : "-") + fmt(Math.abs(delta))}
        </span>
      )}
      <span className="fsa-num-v" data-hit={hit ? "1" : undefined}>{txt}</span>
    </span>
  );
}

function Rows({ rows, cols, value, delta, hit, cell, rowProps }) {
  return rows.map((r) => {
    if (r.kind === "head") {
      return (
        <tr key={r.key} className="fsa-r-head">
          <td colSpan={cols.length + 1}>{r.label}</td>
        </tr>
      );
    }
    const rp = rowProps ? rowProps(r.key, r) || {} : {};
    const anyHit = cols.some((c) => hit && hit(c.id, r.key));
    return (
      <tr
        key={r.key}
        className={"fsa-r-" + r.kind + (anyHit ? " is-hit" : "") + (rp.className ? " " + rp.className : "")}
        onClick={rp.onClick}
        role={rp.onClick ? "button" : undefined}
        tabIndex={rp.onClick ? 0 : undefined}
        onKeyDown={rp.onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); rp.onClick(); } } : undefined}
        aria-pressed={rp.pressed}
      >
        <td className={"fsa-lbl" + (r.indent ? " ind" : "")}>{r.label}{rp.badge}</td>
        {cols.map((c) => {
          const custom = cell ? cell(c.id, r.key, r) : undefined;
          return (
            <td key={c.id} className="fsa-val" data-cell={c.id + "|" + r.key}>
              {custom !== undefined ? custom : (
                <NumCell
                  value={value(c.id, r.key)}
                  delta={delta ? delta(c.id, r.key) : null}
                  hit={hit ? hit(c.id, r.key) : false}
                  ghost={c.ghost}
                />
              )}
            </td>
          );
        })}
      </tr>
    );
  });
}

function Card({ title, sub, cols, children, area }) {
  return (
    <section className="fsa-stmt" style={area ? { gridArea: area } : undefined}>
      <table>
        <thead>
          <tr>
            <th className="fsa-stmt-title">
              {title}
              {sub && <span className="fsa-stmt-sub">{sub}</span>}
            </th>
            {cols.map((c) => (
              <th key={c.id} className="fsa-col-h">
                <span>{c.label}</span>
                {c.sub && <small>{c.sub}</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </section>
  );
}

export default function Statements({ layout, cols, bsCols, value, delta, hit, cell, rowProps, show = {}, period }) {
  const showIS = show.is !== false && layout.is.length > 0;
  const showOCI = show.oci !== false && layout.oci.length > 0;
  const showCF = show.cf !== false && layout.cf.length > 0;
  const bcols = bsCols || cols;
  const common = { value, delta, hit, cell, rowProps };
  const wide = cols.length + (bsCols ? 0 : 0) >= 3;
  const per = period ? "Year " + period : null;
  return (
    <div className={"fsa-stmts" + (wide ? " is-wide" : "") + (!showIS && !showCF ? " bs-only" : "")}>
      {showIS && (
        <Card title="Income statement" sub={per ? per + ", to date" : null} cols={cols} area="is">
          <Rows rows={layout.is} cols={cols} {...common} />
          {showOCI && (
            <>
              <tr className="fsa-r-head"><td colSpan={cols.length + 1}>Other comprehensive income</td></tr>
              <Rows rows={layout.oci} cols={cols} {...common} />
            </>
          )}
        </Card>
      )}
      <Card title="Balance sheet" sub={per ? "end of step" : null} cols={bcols} area="bs">
        <Rows rows={layout.bs[0].rows} cols={bcols} {...common} />
        <tr className="fsa-r-gap"><td colSpan={bcols.length + 1} /></tr>
        <Rows rows={layout.bs[1].rows} cols={bcols} {...common} />
      </Card>
      {showCF && (
        <Card title="Cash flow statement" sub={per ? per + ", to date" : null} cols={cols} area="cf">
          <Rows rows={layout.cf} cols={cols} {...common} />
        </Card>
      )}
    </div>
  );
}
