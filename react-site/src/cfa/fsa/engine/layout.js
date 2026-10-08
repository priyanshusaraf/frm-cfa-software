/* Stable statement layout for a scenario run.

   A line is shown if it is non-zero in ANY snapshot of ANY of the given
   columns. Computing visibility over the whole run (rather than per step) is
   what keeps rows from jumping around while the animation plays: the student's
   eye can stay on "Investment in associate" for the entire scenario. */
import { CF_SECTIONS } from "./ledger.js";

const EPS = 0.005;

export function buildLayout(run, colIds) {
  const ids = colIds && colIds.length ? colIds : run.columns.map((c) => c.id);
  const everNonZero = (key) => run.snaps.some((s) => ids.some((id) => Math.abs((s.cols[id] && s.cols[id].flat[key]) || 0) > EPS));
  const accs = Object.values(run.accMap).sort((a, b) => a.order - b.order);

  const isRows = [];
  const isAccs = accs.filter((a) => (a.type === "revenue" || a.type === "expense") && everNonZero("IS:" + a.id));
  isAccs.forEach((a) => isRows.push({ key: "IS:" + a.id, label: a.label, kind: "line", acct: a.id }));
  const hasNci = accs.some((a) => a.type === "nci");
  if (isAccs.length || hasNci) {
    isRows.push({ key: "IS:NI", label: "Net income", kind: "total" });
    if (hasNci) {
      const lab = accs.find((a) => a.type === "nci").label;
      isRows.push({ key: "IS:NCI", label: lab, kind: "line", acct: accs.find((a) => a.type === "nci").id, indent: 1 });
      isRows.push({ key: "IS:NIP", label: "NI attributable to parent shareholders", kind: "grand" });
    }
  }

  const ociRows = [];
  const ociAccs = accs.filter((a) => a.type === "oci" && everNonZero("OCI:" + a.id));
  ociAccs.forEach((a) => ociRows.push({ key: "OCI:" + a.id, label: a.label, kind: "line", acct: a.id }));
  if (ociAccs.length) {
    ociRows.push({ key: "OCI:TOT", label: "Other comprehensive income", kind: "total" });
    ociRows.push({ key: "OCI:TCI", label: "Total comprehensive income", kind: "grand" });
  }

  const bsSections = [];
  const groupDefs = [
    { id: "ca", label: "Current assets", side: "A" },
    { id: "nca", label: "Non-current assets", side: "A" },
    { id: "cl", label: "Current liabilities", side: "L" },
    { id: "ncl", label: "Non-current liabilities", side: "L" },
    { id: "eq", label: "Equity", side: "E" },
  ];
  const sideRows = { A: [], L: [], E: [] };
  groupDefs.forEach((g) => {
    const lines = accs.filter((a) => (a.type === "asset" || a.type === "liability" || a.type === "equity") && a.group === g.id)
      .filter((a) => a.role === "re" || a.cash || everNonZero("BS:" + a.id));
    if (!lines.length) return;
    sideRows[g.side].push({ key: "BS:" + g.id + ":head", label: g.label, kind: "head" });
    lines.forEach((a) => sideRows[g.side].push({ key: "BS:" + a.id, label: a.label, kind: "line", acct: a.id, indent: 1 }));
    if (g.side !== "E") sideRows[g.side].push({ key: "BS:" + g.id, label: "Total " + g.label.toLowerCase(), kind: "sub" });
  });
  bsSections.push({ id: "A", rows: [...sideRows.A, { key: "BS:TA", label: "Total assets", kind: "grand" }] });
  bsSections.push({
    id: "LE",
    rows: [
      ...sideRows.L,
      { key: "BS:TL", label: "Total liabilities", kind: "total" },
      ...sideRows.E,
      { key: "BS:TE", label: "Total equity", kind: "total" },
      { key: "BS:TLE", label: "Total liabilities and equity", kind: "grand" },
    ],
  });

  const cfRows = [];
  const cfKeys = new Set();
  run.snaps.forEach((s) => ids.forEach((id) => {
    const f = s.cols[id] && s.cols[id].flat;
    if (!f) return;
    Object.keys(f).forEach((k) => { if (/^CF:CF[OIF]\|/.test(k)) cfKeys.add(k); });
  }));
  const anyCF = cfKeys.size > 0;
  if (anyCF) {
    CF_SECTIONS.forEach((sec) => {
      const keys = [...cfKeys].filter((k) => k.startsWith("CF:" + sec.id + "|"));
      if (!keys.length) return;
      cfRows.push({ key: "CF:" + sec.id + ":head", label: sec.label, kind: "head" });
      keys.forEach((k) => cfRows.push({ key: k, label: k.slice(("CF:" + sec.id + "|").length), kind: "line", indent: 1 }));
      cfRows.push({ key: "CF:" + sec.id, label: "Net cash from " + sec.label.toLowerCase(), kind: "sub" });
    });
    cfRows.push({ key: "CF:NET", label: "Net change in cash", kind: "total" });
    cfRows.push({ key: "CF:BEG", label: "Cash at beginning of period", kind: "line" });
    cfRows.push({ key: "CF:END", label: "Cash at end of period", kind: "grand" });
  }

  return {
    is: isRows,
    oci: ociRows,
    bs: bsSections,
    cf: cfRows,
  };
}

/* Display sign of a posting on the line it lands on: assets, expenses-as-shown
   and NCI allocation read debit-positive; everything else credit-positive. */
export function postingDisplayDelta(p, acc) {
  const raw = (p.dr || 0) - (p.cr || 0);
  if (!acc) return raw;
  if (acc.type === "asset" || acc.type === "nci") return raw;
  return -raw;
}
