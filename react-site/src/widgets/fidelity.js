/* Source-diagram fidelity library (Workstream F). Reusable primitives that render
   the structural diagrams the Schweser source draws but the app used to flatten to
   prose: concentric/nested layers, annotated matrices/tables, cash and loss
   waterfalls, and party/structure flows. Same conventions as every other widget:
   imperative (el) => void draw functions, colors ONLY via CSS variables (both
   themes), params read from a data-* JSON attribute with sourced defaults, each
   orphan-safe (a malformed field renders a caption, never throws).

   Companion audit: docs/superpowers/specs/2026-07-24-source-diagram-audit.md. */
import { register, svgEl, shell, esc } from "./index.js";

/* Read a widget's JSON payload defensively. Returns {} on any parse failure so a
   missing or malformed data-* attribute degrades to the sourced defaults below. */
function payload(el, attr) {
  var d;
  try { d = JSON.parse(el.getAttribute(attr)); } catch (e) { d = null; }
  return d && typeof d === "object" ? d : {};
}

function strArr(v, fallback) {
  return (Array.isArray(v) && v.length) ? v : fallback;
}

/* =====================================================================
   nested-rings: N labeled concentric layers, innermost to outermost,
   with an optional angular "stage" ring around the outside for
   lifecycle diagrams (read clockwise from the top).
   Serves R41 (three lines of defense), R43 (four ORM circles),
   R42 (Basel/ORX taxonomy levels), R96 (NIST AI-lifecycle wheel).
   ===================================================================== */
register("nested-rings", function (el) {
  var d = payload(el, "data-rings");
  /* rings are authored innermost-first (the raw layer everything else builds on
     top of); each is {label, sub?}. Default = R43's four ORM concentric circles. */
  var rings = strArr(d.rings, [
    { label: "Incident / loss database", sub: "raw event data" },
    { label: "Assessment (RCSAs)", sub: "self-assessment" },
    { label: "Monitoring (KRIs)", sub: "leading indicators" },
    { label: "Takeaways", sub: "major-loss lessons" },
  ]);
  /* optional stage ring around the outside (lifecycle labels, clockwise from top). */
  var stages = Array.isArray(d.stages) ? d.stages : [];
  var title = (typeof d.title === "string" && d.title) ? d.title
    : "Four concentric circles of the ORM framework";
  var caption = (typeof d.caption === "string" && d.caption) ? d.caption
    : "Read from the center out: the raw loss database is the foundation, and each outer ring is a broader layer of processing built on the one inside it. Nothing on the outside works without the data at the core.";

  /* Compact rings on the LEFT, legend on the RIGHT. The old version was a
     460x460 board with every label typeset INSIDE its own ring, so the labels
     dictated the radius: four layers forced a circle wide enough to fit the
     longest sentence, and the graphic swallowed the page while the text still
     sat awkwardly across the bands. Nesting is the only thing the circles need
     to convey; the words belong in a legend where they can be read. */
  var W = 640, RING_R = 104, PAD = 18;
  var rowH = 34;
  var H = Math.max(RING_R * 2 + PAD * 2, rings.length * rowH + PAD * 2 + (stages.length ? 28 : 0));
  var svg = shell(el, title, "", W, H, caption);
  var readout = document.createElement("div");
  readout.className = "w-caption";
  readout.style.marginTop = "0.4rem";
  readout.style.minHeight = "1.2em";
  el.appendChild(readout);

  var cx = PAD + RING_R, cy = H / 2;
  var n = rings.length;
  var fills = ["var(--accent-soft)", "var(--cyan-soft)", "var(--green-soft)", "var(--amber-soft)", "var(--purple-soft)"];
  var strokes = ["var(--accent)", "var(--cyan)", "var(--green)", "var(--amber)", "var(--purple)"];

  function draw(active) {
    svg.innerHTML = "";

    /* outermost first, so inner rings sit on top */
    for (var i = n - 1; i >= 0; i--) {
      var r = RING_R * (i + 1) / n;
      var c = svgEl("circle", {
        cx: cx, cy: cy, r: r,
        fill: fills[i % fills.length],
        stroke: strokes[i % strokes.length],
        "stroke-width": active === i ? 3 : 1.5,
        style: "cursor:pointer"
      }, svg);
      (function (idx) {
        c.addEventListener("mouseenter", function () { draw(idx); showReadout(idx); });
      })(i);
      /* just the layer number inside its band: one glyph always fits */
      var rInner = RING_R * i / n;
      var numY = i === 0 ? cy + 4 : cy - (r + rInner) / 2 + 4;
      var num = svgEl("text", {
        x: cx, y: numY, "text-anchor": "middle", "font-size": 11, "font-weight": 700,
        fill: strokes[i % strokes.length], style: "pointer-events:none"
      }, svg);
      num.textContent = String(i + 1);
    }

    /* legend: one row per layer, innermost at the top so it reads outward */
    var lx = PAD + RING_R * 2 + 34;
    var top = cy - (n * rowH) / 2 + 12;
    rings.forEach(function (ring, j) {
      var y = top + j * rowH;
      var g = svgEl("g", { style: "cursor:pointer" }, svg);
      g.addEventListener("mouseenter", function () { draw(j); showReadout(j); });
      svgEl("rect", { x: lx, y: y - 9, width: 11, height: 11, rx: 2,
        fill: fills[j % fills.length], stroke: strokes[j % strokes.length], "stroke-width": 1.5 }, g);
      /* a wide invisible hit area so the whole row is hoverable, not just the text */
      svgEl("rect", { x: lx, y: y - 14, width: W - lx - PAD, height: rowH - 4, fill: "transparent" }, g);
      var t = svgEl("text", { x: lx + 20, y: y, "font-size": 11.5, "font-weight": 700,
        fill: active === j ? strokes[j % strokes.length] : "var(--text)" }, g);
      t.textContent = (j + 1) + ". " + ring.label;
      if (ring.sub) {
        var sub = svgEl("text", { x: lx + 20, y: y + 13, "font-size": 10, fill: "var(--text-dim)" }, g);
        sub.textContent = ring.sub;
      }
    });

    /* optional lifecycle stages: a quiet caption strip under the legend */
    if (stages.length) {
      var st = svgEl("text", { x: lx, y: H - PAD + 2, "font-size": 10, fill: "var(--text-faint)" }, svg);
      st.textContent = "Lifecycle: " + stages.join(" \u2192 ");
    }
  }

  function showReadout(i) {
    readout.textContent = "Layer " + (i + 1) + ": " + rings[i].label +
      (rings[i].sub ? " (" + rings[i].sub + ")" : "") + ". Hover a layer to trace the stack.";
  }

    draw(-1);
});

/* =====================================================================
   annotated-table: a labeled row/column grid rendered from JSON, with
   optional diagonal/explicit cell shading and a click-to-read readout.
   Rendered as a real HTML table (more legible + accessible than SVG text
   for a matrix). Serves R26 rating-transition matrix, R27 joint-default
   outcomes, R60/R61 RWA + NSFR factor tables, R62 BI buckets, and
   workstream E's financial-statement deep-dive.
   ===================================================================== */
register("annotated-table", function (el) {
  var d = payload(el, "data-table");
  var cols = strArr(d.cols, ["AAA", "AA", "A", "BBB", "BB", "B", "CCC/C", "D"]);
  /* rows: [{label, cells:[...]}]. Default = a compact S&P-style one-year rating
     transition matrix (Figure 26.1), diagonal = stay-in-rating probability. */
  var rows = strArr(d.rows, [
    { label: "AAA", cells: [90.8, 8.3, 0.7, 0.1, 0.1, 0, 0, 0] },
    { label: "AA", cells: [0.7, 90.7, 7.8, 0.6, 0.1, 0.1, 0, 0] },
    { label: "A", cells: [0.1, 2.3, 91.0, 5.5, 0.7, 0.3, 0.1, 0] },
    { label: "BBB", cells: [0, 0.3, 5.9, 87.5, 5.0, 1.0, 0.2, 0.1] },
    { label: "BB", cells: [0, 0.1, 0.6, 7.7, 81.2, 8.4, 1.0, 1.0] },
    { label: "B", cells: [0, 0.1, 0.2, 0.5, 6.9, 82.5, 4.3, 5.5] },
    { label: "CCC/C", cells: [0, 0, 0.3, 0.3, 1.5, 12.5, 60.1, 25.3] },
  ]);
  var title = (typeof d.title === "string" && d.title) ? d.title
    : "One-year rating transition matrix (illustrative, S&P-style)";
  var caption = (typeof d.caption === "string" && d.caption) ? d.caption
    : "Each row is a starting rating; each column is the rating one year later. The shaded diagonal (staying put) carries the highest probability in every row. Read a specific cell for a migration probability, e.g. how likely an A-rated firm slips to BBB. Raise the matrix to the n-th power for an n-year horizon.";
  var unit = (typeof d.unit === "string") ? d.unit : "%";
  var corner = (typeof d.corner === "string") ? d.corner : "From \\ To";
  /* shade: "diagonal" (default), false/none, or an explicit [[rowIdx,colIdx],...]. */
  var shade = ("shade" in d) ? d.shade : "diagonal";
  var rowLabel = (typeof d.rowHeader === "string") ? d.rowHeader : "";

  var box = document.createElement("div");
  box.innerHTML = '<div class="w-title">' + esc(title) + "</div>";

  var wrap = document.createElement("div");
  wrap.style.overflowX = "auto";

  var isShaded = function (ri, ci) {
    if (shade === "diagonal") return rows[ri].label === cols[ci];
    if (Array.isArray(shade)) return shade.some(function (p) { return p[0] === ri && p[1] === ci; });
    return false;
  };

  var html = '<table style="border-collapse:collapse;font-size:0.8rem;min-width:100%">';
  html += "<thead><tr>";
  html += '<th style="padding:5px 9px;text-align:left;color:var(--text-faint);font-weight:600;border-bottom:1px solid var(--border-strong)">' + esc(corner) + "</th>";
  cols.forEach(function (c) {
    html += '<th style="padding:5px 9px;text-align:right;color:var(--text-dim);font-weight:700;border-bottom:1px solid var(--border-strong)">' + esc(String(c)) + "</th>";
  });
  html += "</tr></thead><tbody>";
  rows.forEach(function (row, ri) {
    html += "<tr>";
    html += '<th style="padding:5px 9px;text-align:left;color:var(--text);font-weight:700;border-bottom:1px solid var(--border)">' + esc(String(row.label)) + "</th>";
    (row.cells || []).forEach(function (val, ci) {
      var shaded = isShaded(ri, ci);
      var bg = shaded ? "background:var(--accent-soft);" : "";
      var col = shaded ? "color:var(--text);font-weight:700;" : "color:var(--text-dim);";
      var txt = (val === "" || val === null || typeof val === "undefined") ? "" : String(val);
      html += '<td data-ri="' + ri + '" data-ci="' + ci + '" style="padding:5px 9px;text-align:right;border-bottom:1px solid var(--border);cursor:pointer;' + bg + col + '">' + esc(txt) + (txt !== "" && unit ? esc(unit) : "") + "</td>";
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  wrap.innerHTML = html;
  box.appendChild(wrap);

  var readout = document.createElement("div");
  readout.className = "w-caption";
  readout.style.marginTop = "0.45rem";
  readout.style.minHeight = "1.2em";
  readout.textContent = caption;
  box.appendChild(readout);

  wrap.addEventListener("click", function (e) {
    var td = e.target.closest("td[data-ri]");
    if (!td) return;
    var ri = +td.getAttribute("data-ri"), ci = +td.getAttribute("data-ci");
    var val = (rows[ri].cells || [])[ci];
    readout.textContent = rows[ri].label + " " + (rowLabel || "") + " to " + cols[ci] + ": " +
      val + unit + ".";
  });

  el.innerHTML = "";
  el.appendChild(box);
});

/* =====================================================================
   waterfall-flow: an ordered top-to-bottom sequence of loss- or
   cash-absorbing layers, each a labeled box with an optional amount and
   an optional pass/fail coverage gate. Serves R35 CCP loss waterfall,
   R28 tranche cash waterfall (Figures 28.1-28.2), R39 securitization
   cash waterfall (Figure 39.2). Distinct from the `tranche` widget (a
   continuous loss-density curve): this shows discrete named amounts
   consumed stage by stage.
   ===================================================================== */
register("waterfall-flow", function (el) {
  var d = payload(el, "data-waterfall");
  var inflow = (d.inflow && typeof d.inflow === "object") ? d.inflow
    : { label: "Defaulting member's loss to absorb", amount: "" };
  /* stages: [{label, amount?, note?, gate?}]. Default = R35 CCP loss waterfall:
     the ordered sequence a CCP burns through on a member default. */
  var stages = strArr(d.stages, [
    { label: "Defaulter's initial margin", note: "the defaulter pays first" },
    { label: "Defaulter's default-fund contribution", note: "their own mutual-fund stake" },
    { label: "CCP's own capital (skin in the game)", note: "aligns the CCP's incentives" },
    { label: "Surviving members' default-fund contributions", note: "mutualized loss sharing" },
    { label: "Rights of assessment / further calls", note: "last resort on survivors" },
  ]);
  var title = (typeof d.title === "string" && d.title) ? d.title
    : "CCP loss waterfall: the order losses are absorbed on a member default";
  var caption = (typeof d.caption === "string" && d.caption) ? d.caption
    : "Losses are absorbed from the top down, and each layer is only touched once the one above it is exhausted. The defaulter pays first (their margin, then their fund stake); the CCP's own capital sits ahead of surviving members' money so the CCP has real skin in the game before mutualized funds are burned.";

  var W = 560;
  var boxH = 46, gap = 26, top = 14;
  var count = stages.length + 1; /* + inflow header */
  var H = top + count * boxH + (count - 1) * gap + 14;
  var svg = shell(el, title, "", W, H, caption);
  var readout = document.createElement("div");
  readout.className = "w-caption";
  readout.style.marginTop = "0.4rem";
  readout.style.minHeight = "1.2em";
  el.appendChild(readout);

  /* arrowhead marker */
  var defs = svgEl("defs", {}, svg);
  var marker = svgEl("marker", {
    id: "wf-arrow", viewBox: "0 0 10 10", refX: 8, refY: 5,
    markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse",
  }, defs);
  svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: "var(--text-faint)" }, marker);

  var boxX = 70, boxW = W - 140;

  function rowY(i) { return top + i * (boxH + gap); }

  /* Colour carries one meaning only: depth. The header is neutral (it is the
     loss entering the structure, not a layer), and each layer's left edge
     ramps from accent to red as the loss eats further down, because reaching
     a lower layer is strictly worse news. Nothing here is interactive, so no
     colour implies "click me". */
  var depthColors = ["var(--accent)", "var(--cyan)", "var(--amber)", "var(--red)"];
  function depthColor(idx, total) {
    if (total <= 1) return depthColors[0];
    var k = Math.round((idx / (total - 1)) * (depthColors.length - 1));
    return depthColors[k];
  }

  function box(i, label, note, amount, opts) {
    opts = opts || {};
    var y = rowY(i);
    svgEl("rect", {
      x: boxX, y: y, width: boxW, height: boxH, rx: 8,
      fill: opts.fill || "var(--bg-inset)",
      stroke: opts.stroke || "var(--border-strong)",
      "stroke-width": opts.strong ? 2 : 1.2,
    }, svg);
    if (opts.edge) {
      svgEl("rect", { x: boxX, y: y + 6, width: 3, height: boxH - 12, rx: 1.5, fill: opts.edge }, svg);
    }
    var t = svgEl("text", { x: boxX + 14, y: y + (note ? 20 : 28), "font-size": 12, "font-weight": 700, fill: "var(--text)" }, svg);
    t.textContent = (opts.strong ? "" : (i) + ". ") + label;
    if (note) {
      var s = svgEl("text", { x: boxX + 14, y: y + 36, "font-size": 10, fill: "var(--text-dim)" }, svg);
      s.textContent = note;
    }
    if (amount !== "" && amount != null) {
      var a = svgEl("text", { x: boxX + boxW - 14, y: y + boxH / 2 + 4, "text-anchor": "end", "font-size": 12, "font-weight": 700, fill: opts.amountColor || "var(--accent)" }, svg);
      a.textContent = amount;
    }
  }

  /* inflow header */
  box(0, inflow.label, inflow.note || "", inflow.amount, { strong: true, fill: "var(--bg-raised)", stroke: "var(--border-strong)", amountColor: "var(--text)" });

  stages.forEach(function (st, idx) {
    var i = idx + 1;
    /* connector arrow from the previous box */
    var yPrev = rowY(i - 1) + boxH, yThis = rowY(i);
    svgEl("line", { x1: W / 2, x2: W / 2, y1: yPrev, y2: yThis - 2, stroke: "var(--text-faint)", "stroke-width": 1.5, "marker-end": "url(#wf-arrow)" }, svg);
    if (st.gate) {
      var gt = svgEl("text", { x: W / 2 + 10, y: (yPrev + yThis) / 2 + 4, "font-size": 10, "font-style": "italic", fill: "var(--text-dim)" }, svg);
      gt.textContent = st.gate;
    }
    box(i, st.label, st.note || "", st.amount, { edge: depthColor(idx, stages.length) });
  });

  readout.textContent = stages.length + " loss-absorbing layers, consumed top to bottom.";
});

/* =====================================================================
   party-flow: named party/entity boxes with directional arrows for
   payments, claims, or exposures between them; supports a two-panel
   before/after mode and per-arrow amount labels. Serves R35 (bilateral
   vs CCP + netting), R39 (SPV / master-trust structure), R30 (CDS / TRS
   / CDO structures), R22 (scoring pipeline), R9 (copula percentile
   mapping), R76 (repo timeline). Parties carry fractional {x,y} in
   [0,1]; the widget maps them onto the canvas.
   ===================================================================== */
register("party-flow", function (el) {
  var d = payload(el, "data-flow");
  /* panels: [{title?, parties:[{id,label,x,y,kind?}], flows:[{from,to,label?,dashed?}]}].
     A single-panel diagram may be given directly as {parties, flows}. Default =
     R39 securitization SPV structure (Figure 39.1). */
  var panels = Array.isArray(d.panels) ? d.panels : [{
    parties: strArr(d.parties, [
      { id: "orig", label: "Originator", x: 0.12, y: 0.5 },
      { id: "spv", label: "SPV", x: 0.5, y: 0.5, kind: "accent" },
      { id: "inv", label: "Investors", x: 0.88, y: 0.5 },
      { id: "trustee", label: "Trustee / servicer", x: 0.5, y: 0.12, kind: "muted" },
      { id: "rating", label: "Rating agency", x: 0.5, y: 0.88, kind: "muted" },
    ]),
    flows: strArr(d.flows, [
      { from: "orig", to: "spv", label: "sells assets" },
      { from: "spv", to: "orig", label: "cash", dashed: true },
      { from: "spv", to: "inv", label: "tranched notes" },
      { from: "inv", to: "spv", label: "cash", dashed: true },
      { from: "trustee", to: "spv", label: "oversight" },
      { from: "rating", to: "spv", label: "rates notes" },
    ]),
    title: d.panelTitle || "",
  }];
  var title = (typeof d.title === "string" && d.title) ? d.title
    : "Securitization structure: how a pool becomes tradable notes";
  var caption = (typeof d.caption === "string" && d.caption) ? d.caption
    : "The originator sells a pool of assets to a bankruptcy-remote SPV, which funds the purchase by issuing tranched notes to investors. The trustee/servicer administers the cash flows and the rating agency rates the notes. The SPV exists so the assets are legally separated from the originator.";

  var single = panels.length === 1;
  var W = single ? 620 : 720, panelH = 300, H = panelH;
  var svg = shell(el, title, "", W, H, caption);

  var defs = svgEl("defs", {}, svg);
  var mk = svgEl("marker", { id: "pf-arrow", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, defs);
  svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: "var(--text-faint)" }, mk);

  var boxW = 118, boxH = 40;

  function kindFill(kind) {
    if (kind === "accent") return { fill: "var(--accent-soft)", stroke: "var(--accent)" };
    if (kind === "muted") return { fill: "var(--bg-inset)", stroke: "var(--border)" };
    return { fill: "var(--bg-raised)", stroke: "var(--border-strong)" };
  }

  panels.forEach(function (panel, pi) {
    var x0 = single ? 0 : pi * (W / 2);
    var pw = single ? W : W / 2;
    var pad = 20;
    var innerW = pw - 2 * pad, innerH = panelH - 60;
    var oy = 44;

    if (!single) {
      /* divider between the two panels */
      if (pi === 1) svgEl("line", { x1: W / 2, x2: W / 2, y1: 10, y2: panelH - 10, stroke: "var(--border)", "stroke-width": 1, "stroke-dasharray": "3 4" }, svg);
    }
    if (panel.title) {
      var pt = svgEl("text", { x: x0 + pw / 2, y: 24, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "var(--text)" }, svg);
      pt.textContent = panel.title;
    }

    var byId = {};
    (panel.parties || []).forEach(function (p) {
      var cx = x0 + pad + p.x * innerW;
      var cy = oy + p.y * innerH;
      byId[p.id] = { cx: cx, cy: cy };
    });

    /* arrows first, so boxes sit on top of the line ends */
    (panel.flows || []).forEach(function (f) {
      var a = byId[f.from], b = byId[f.to];
      if (!a || !b) return;
      /* trim the line to the box edges along the center-to-center vector */
      var dx = b.cx - a.cx, dy = b.cy - a.cy;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len, uy = dy / len;
      var ax = a.cx + ux * (boxW / 2 * Math.abs(ux) + boxH / 2 * Math.abs(uy)) * 0.6 + ux * 6;
      var ay = a.cy + uy * (boxH / 2 + 6);
      var bx = b.cx - ux * (boxW / 2 * Math.abs(ux) + boxH / 2 * Math.abs(uy)) * 0.6 - ux * 10;
      var by = b.cy - uy * (boxH / 2 + 10);
      var lineAttrs = { x1: ax, y1: ay, x2: bx, y2: by, stroke: "var(--text-faint)", "stroke-width": 1.4, "marker-end": "url(#pf-arrow)" };
      if (f.dashed) lineAttrs["stroke-dasharray"] = "4 4";
      svgEl("line", lineAttrs, svg);
      if (f.label) {
        var lt = svgEl("text", { x: (ax + bx) / 2, y: (ay + by) / 2 - 4, "text-anchor": "middle", "font-size": 9.5, fill: "var(--text-dim)" }, svg);
        lt.textContent = f.label;
      }
    });

    (panel.parties || []).forEach(function (p) {
      var c = byId[p.id];
      var col = kindFill(p.kind);
      svgEl("rect", { x: c.cx - boxW / 2, y: c.cy - boxH / 2, width: boxW, height: boxH, rx: 8, fill: col.fill, stroke: col.stroke, "stroke-width": 1.5 }, svg);
      var t = svgEl("text", { x: c.cx, y: c.cy + 4, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--text)" }, svg);
      t.textContent = p.label;
    });
  });
});
