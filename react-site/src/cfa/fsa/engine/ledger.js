/* The FSA ledger engine.

   Every animation and every practice round on the CFA FSA platform is driven by
   this one model: a set of accounts, opening balances, and journal entries.
   The four statements are DERIVED from the ledger, never typed in by hand, so a
   scenario cannot show a balance sheet that does not balance or a cash flow
   statement that does not tie to cash. That guarantee is the point: the student
   is shown real double-entry consequences, and the test suite
   (scenarios.test.js) runs every scenario through these identities.

   Sign convention inside the engine: every balance is DEBIT-positive.
   Display convention:
     - assets            show the debit balance
     - liabilities/equity show the credit balance
     - income statement and OCI lines show credit-minus-debit, so revenue and
       gains are positive and expenses and losses are negative.

   Account types:
     asset | liability | equity          balance sheet
     revenue | expense                   income statement (period)
     oci                                 other comprehensive income (period)
     nci                                 allocation of NI to the non-controlling
                                         interest (below the NI line)
     dividend                            distribution, debits retained earnings
   Roles on equity accounts:
     re   = retained earnings (absorbs NI less NCI share less dividends)
     aoci = accumulated other comprehensive income (absorbs OCI)
   Cash accounts carry `cash: true`; every posting to one must name its cash
   flow section (CFO, CFI, CFF) and a line label. */

export const CF_SECTIONS = [
  { id: "CFO", label: "Operating activities" },
  { id: "CFI", label: "Investing activities" },
  { id: "CFF", label: "Financing activities" },
];

const BS_GROUPS = [
  { id: "ca", label: "Current assets", side: "A" },
  { id: "nca", label: "Non-current assets", side: "A" },
  { id: "cl", label: "Current liabilities", side: "L" },
  { id: "ncl", label: "Non-current liabilities", side: "L" },
  { id: "eq", label: "Equity", side: "E" },
];

const EPS = 0.005;

/* ---------- posting helpers for scenario authors ---------- */
export function dr(a, amt, cf, l) { return { a, dr: amt, cf, l }; }
export function cr(a, amt, cf, l) { return { a, cr: amt, cf, l }; }

/* ---------- account map ---------- */
export function indexAccounts(accounts) {
  const map = {};
  accounts.forEach((acc, i) => {
    map[acc.id] = { ...acc, order: i, group: acc.group || defaultGroup(acc.type) };
  });
  return map;
}

function defaultGroup(type) {
  if (type === "asset") return "ca";
  if (type === "liability") return "cl";
  if (type === "equity") return "eq";
  return null;
}

function isBS(t) { return t === "asset" || t === "liability" || t === "equity"; }

/* ---------- state ---------- */
function openState(accMap, opening) {
  const bal = {};
  Object.keys(accMap).forEach((id) => { bal[id] = 0; });
  Object.entries(opening || {}).forEach(([id, amt]) => {
    const acc = accMap[id];
    if (!acc) throw new Error("opening balance for unknown account: " + id);
    if (!isBS(acc.type)) throw new Error("opening balance on a period account: " + id);
    bal[id] = acc.type === "asset" ? amt : -amt;
  });
  let cash = 0;
  Object.values(accMap).forEach((acc) => { if (acc.cash) cash += bal[acc.id]; });
  return { bal, cf: {}, cfOrder: [], cashOpen: cash, period: 1 };
}

function cloneState(s) {
  return { bal: { ...s.bal }, cf: { ...s.cf }, cfOrder: s.cfOrder.slice(), cashOpen: s.cashOpen, period: s.period };
}

function applyPosting(state, accMap, p, where) {
  const acc = accMap[p.a];
  if (!acc) throw new Error(where + ": unknown account " + p.a);
  const amt = (p.dr || 0) - (p.cr || 0);
  state.bal[p.a] += amt;
  if (acc.cash) {
    if (!p.cf || !p.l) throw new Error(where + ": cash posting to " + p.a + " needs cf section and label");
    const key = p.cf + "|" + p.l;
    if (!(key in state.cf)) { state.cf[key] = 0; state.cfOrder.push(key); }
    state.cf[key] += amt;
  } else if (p.cf) {
    throw new Error(where + ": cf tag on non-cash account " + p.a);
  }
}

/* Year-end close: income statement, OCI, NCI allocation and dividends roll into
   retained earnings / AOCI, and the cash flow statement restarts. */
function closePeriod(state, accMap) {
  const re = Object.values(accMap).find((a) => a.role === "re");
  const aoci = Object.values(accMap).find((a) => a.role === "aoci");
  Object.values(accMap).forEach((acc) => {
    const b = state.bal[acc.id];
    if (!b) return;
    if (acc.type === "revenue" || acc.type === "expense" || acc.type === "nci" || acc.type === "dividend") {
      if (!re) throw new Error("close: no retained earnings account");
      state.bal[re.id] += b; state.bal[acc.id] = 0;
    } else if (acc.type === "oci") {
      if (!aoci) throw new Error("close: no AOCI account");
      state.bal[aoci.id] += b; state.bal[acc.id] = 0;
    }
  });
  let cash = 0;
  Object.values(accMap).forEach((acc) => { if (acc.cash) cash += state.bal[acc.id]; });
  state.cf = {}; state.cfOrder = []; state.cashOpen = cash; state.period += 1;
}

function sumStates(states) {
  const out = { bal: {}, cf: {}, cfOrder: [], cashOpen: 0, period: states[0] ? states[0].period : 1 };
  states.forEach((s) => {
    Object.entries(s.bal).forEach(([k, v]) => { out.bal[k] = (out.bal[k] || 0) + v; });
    s.cfOrder.forEach((k) => {
      if (!(k in out.cf)) { out.cf[k] = 0; out.cfOrder.push(k); }
      out.cf[k] += s.cf[k];
    });
    out.cashOpen += s.cashOpen;
  });
  return out;
}

/* ---------- statements ---------- */
/* Returns { is, oci, bs, cf, flat } where flat maps a stable line key to its
   display value. Line keys are what the UI animates against:
     IS:<acct>  IS:NI  IS:NCI  IS:NIP
     OCI:<acct> OCI:TOT OCI:TCI
     BS:<acct>  BS:<group>  BS:TA  BS:TL  BS:TE  BS:TLE
     CF:<sec>|<label>  CF:<sec>  CF:NET  CF:BEG  CF:END                       */
export function statements(state, accMap) {
  const accs = Object.values(accMap).sort((a, b) => a.order - b.order);
  const flat = {};
  const v = (id) => state.bal[id] || 0;

  const isLines = accs.filter((a) => a.type === "revenue" || a.type === "expense")
    .map((a) => ({ key: "IS:" + a.id, id: a.id, label: a.label, value: -v(a.id), sub: a.sub }));
  const ni = isLines.reduce((s, l) => s + l.value, 0);
  const nciAccs = accs.filter((a) => a.type === "nci");
  const nci = nciAccs.reduce((s, a) => s + v(a.id), 0);
  const divs = accs.filter((a) => a.type === "dividend").reduce((s, a) => s + v(a.id), 0);
  const ociLines = accs.filter((a) => a.type === "oci")
    .map((a) => ({ key: "OCI:" + a.id, id: a.id, label: a.label, value: -v(a.id), sub: a.sub }));
  const oci = ociLines.reduce((s, l) => s + l.value, 0);

  isLines.forEach((l) => { flat[l.key] = l.value; });
  flat["IS:NI"] = ni;
  if (nciAccs.length) { flat["IS:NCI"] = nci; flat["IS:NIP"] = ni - nci; }
  ociLines.forEach((l) => { flat[l.key] = l.value; });
  if (ociLines.length) { flat["OCI:TOT"] = oci; flat["OCI:TCI"] = ni + oci; }

  const groups = BS_GROUPS.map((g) => {
    const lines = accs.filter((a) => isBS(a.type) && a.group === g.id).map((a) => {
      let value = a.type === "asset" ? v(a.id) : -v(a.id);
      if (a.role === "re") value += ni - nci - divs;
      if (a.role === "aoci") value += oci;
      return { key: "BS:" + a.id, id: a.id, label: a.label, value, role: a.role, sub: a.sub, contra: a.contra };
    });
    const total = lines.reduce((s, l) => s + l.value, 0);
    lines.forEach((l) => { flat[l.key] = l.value; });
    flat["BS:" + g.id] = total;
    return { ...g, lines, total };
  });
  const ta = groups.filter((g) => g.side === "A").reduce((s, g) => s + g.total, 0);
  const tl = groups.filter((g) => g.side === "L").reduce((s, g) => s + g.total, 0);
  const te = groups.filter((g) => g.side === "E").reduce((s, g) => s + g.total, 0);
  Object.assign(flat, { "BS:TA": ta, "BS:TL": tl, "BS:TE": te, "BS:TLE": tl + te });

  const cfSecs = CF_SECTIONS.map((sec) => {
    const lines = state.cfOrder.filter((k) => k.startsWith(sec.id + "|"))
      .map((k) => ({ key: "CF:" + k, label: k.slice(sec.id.length + 1), value: state.cf[k] }));
    const total = lines.reduce((s, l) => s + l.value, 0);
    lines.forEach((l) => { flat[l.key] = l.value; });
    flat["CF:" + sec.id] = total;
    return { ...sec, lines, total };
  });
  const net = cfSecs.reduce((s, x) => s + x.total, 0);
  const cashBS = accs.filter((a) => a.cash).reduce((s, a) => s + v(a.id), 0);
  Object.assign(flat, { "CF:NET": net, "CF:BEG": state.cashOpen, "CF:END": state.cashOpen + net });

  return {
    is: { lines: isLines, ni, nci, nip: ni - nci, hasNci: nciAccs.length > 0, nciLabel: nciAccs[0] && nciAccs[0].label },
    oci: { lines: ociLines, total: oci, tci: ni + oci },
    bs: { groups, ta, tl, te, tle: tl + te },
    cf: { sections: cfSecs, net, beg: state.cashOpen, end: state.cashOpen + net, cashBS },
    divs,
    flat,
  };
}

/* ---------- integrity checks ---------- */
export function checksFor(stmts, postings) {
  const out = [];
  if (postings) {
    const d = postings.reduce((s, p) => s + (p.dr || 0), 0);
    const c = postings.reduce((s, p) => s + (p.cr || 0), 0);
    out.push({ id: "drcr", label: "Debits = Credits", ok: Math.abs(d - c) < EPS, detail: fmt(d) + " = " + fmt(c) });
  }
  out.push({
    id: "ale", label: "Assets = Liabilities + Equity",
    ok: Math.abs(stmts.bs.ta - stmts.bs.tle) < EPS,
    detail: fmt(stmts.bs.ta) + " = " + fmt(stmts.bs.tl) + " + " + fmt(stmts.bs.te),
  });
  out.push({
    id: "cash", label: "Cash flow statement ties to balance sheet cash",
    ok: Math.abs(stmts.cf.end - stmts.cf.cashBS) < EPS,
    detail: fmt(stmts.cf.beg) + " + " + fmt(stmts.cf.net) + " = " + fmt(stmts.cf.end),
  });
  return out;
}

/* ---------- running a scenario ---------- */
/* Normalises a scenario into columns and precomputes every snapshot, so the UI
   can scrub the timeline freely (back, forward, jump) with no replay cost. */
export function runScenario(scn) {
  const accMap = indexAccounts(scn.accounts);
  const columns = scn.columns && scn.columns.length ? scn.columns : [{ id: "main", label: scn.company || "Company", opening: scn.opening }];
  const base = columns.filter((c) => !c.sumOf);
  const derived = columns.filter((c) => c.sumOf);

  const entriesFor = (step, colId) => {
    if (!step.entries) return [];
    if (Array.isArray(step.entries)) return colId === base[0].id ? step.entries : [];
    return step.entries[colId] || [];
  };

  let states = {};
  base.forEach((c) => { states[c.id] = openState(accMap, c.opening); });

  const snap = (stepIdx) => {
    const cols = {};
    base.forEach((c) => { cols[c.id] = states[c.id]; });
    derived.forEach((c) => { cols[c.id] = sumStates(c.sumOf.map((id) => states[id])); });
    const out = {};
    columns.forEach((c) => {
      const st = cols[c.id];
      const stm = statements(st, accMap);
      out[c.id] = { stmts: stm, flat: stm.flat, period: st.period };
    });
    return { step: stepIdx, cols: out };
  };

  const snaps = [snap(-1)];
  (scn.steps || []).forEach((step, i) => {
    const next = {};
    base.forEach((c) => {
      const st = cloneState(states[c.id]);
      entriesFor(step, c.id).forEach((p, j) => applyPosting(st, accMap, p, scn.id + " step " + (i + 1) + " posting " + (j + 1)));
      if (step.close) closePeriod(st, accMap);
      next[c.id] = st;
    });
    states = next;
    snaps.push(snap(i));
  });

  /* Deltas between consecutive snapshots drive the highlight + flying chips. */
  const deltas = snaps.map((s, i) => {
    if (i === 0) return {};
    const prev = snaps[i - 1];
    const out = {};
    columns.forEach((c) => {
      const d = {};
      const a = prev.cols[c.id].flat, b = s.cols[c.id].flat;
      new Set([...Object.keys(a), ...Object.keys(b)]).forEach((k) => {
        const diff = (b[k] || 0) - (a[k] || 0);
        if (Math.abs(diff) > EPS) d[k] = diff;
      });
      out[c.id] = d;
    });
    return out;
  });

  return { scn, accMap, columns, base, snaps, deltas, entriesFor };
}

/* Which line does a posting land on? Used by the flying-chip animation. */
export function lineKeyForPosting(p, accMap) {
  const acc = accMap[p.a];
  if (!acc) return null;
  if (acc.type === "revenue" || acc.type === "expense") return "IS:" + acc.id;
  if (acc.type === "oci") return "OCI:" + acc.id;
  if (acc.type === "nci") return "IS:NCI";
  if (acc.type === "dividend") return "BS:" + (Object.values(accMap).find((a) => a.role === "re") || {}).id;
  return "BS:" + acc.id;
}

/* Lines a student is asked to reconstruct: everything that moved, except pure
   subtotals that are mechanically implied (they are checked in the
   confirmation runs instead). */
export const DERIVED_KEYS = new Set(["BS:ca", "BS:nca", "BS:cl", "BS:ncl", "BS:eq", "CF:NET", "CF:BEG", "OCI:TCI"]);

export function fmt(n, opts) {
  if (n == null || Number.isNaN(n)) return "-";
  const dp = opts && opts.dp != null ? opts.dp : (Math.abs(n - Math.round(n)) < EPS ? 0 : (Math.abs(n * 10 - Math.round(n * 10)) < EPS * 10 ? 1 : 2));
  const s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
  if (Math.abs(n) < EPS) return "0";
  return n < 0 ? "(" + s + ")" : s;
}

export function approxEq(a, b, tol) {
  return Math.abs(a - b) <= (tol == null ? 0.5 : tol);
}

/* Ratio context: scenario `ratios[].fn(S)` receive this. Tags let a scenario
   say "these lines are debt" or "this is sales" once, in the account list. */
export function ratioCtx(colSnap, accMap) {
  const f = colSnap.flat;
  const st = colSnap.stmts;
  const tag = (t) => Object.values(accMap).reduce((s, a) => {
    if (!a.tags || a.tags.indexOf(t) === -1) return s;
    const k = (a.type === "revenue" || a.type === "expense" ? "IS:" : a.type === "oci" ? "OCI:" : "BS:") + a.id;
    return s + (f[k] || 0);
  }, 0);
  return {
    v: (k) => f[k] || 0,
    tag,
    NI: st.is.ni, NIP: st.is.nip, OCI: st.oci.total,
    TA: st.bs.ta, TL: st.bs.tl, TE: st.bs.te,
    CFO: f["CF:CFO"] || 0, CFI: f["CF:CFI"] || 0, CFF: f["CF:CFF"] || 0,
  };
}

export function fmtRatio(x, kind) {
  if (x == null || !Number.isFinite(x)) return "n/a";
  if (kind === "pct") return (x * 100).toFixed(1) + "%";
  if (kind === "x") return x.toFixed(2) + "x";
  if (kind === "x3") return x.toFixed(3) + "x";
  return fmt(x);
}
