/* Ported verbatim from site/assets/widgets-book4.js (Book 4 — Liquidity & Treasury Risk). */
import { register, svgEl, shell } from "./index.js";

/* =====================================================================
   spiral — the Brunnermeier & Pedersen liquidity spiral: market
   liquidity and funding liquidity reinforce each other in a loop.
   No required data-*; a "Trigger shock" button steps around the loop
   once using a clamped setTimeout chain (no Date.now/Math.random).
   ===================================================================== */
register("spiral", function (el) {
  var svg = shell(el, "The liquidity spiral — market liquidity and funding liquidity feed each other",
    '<span class="seg"><button class="on" data-trigger type="button">Trigger shock ↻</button></span>' +
    '<span class="w-value" data-out></span>', 640, 340,
    "Market liquidity (can I sell without moving the price?) and funding liquidity (can I roll my financing?) are not independent — each shock to one tightens the other. That reinforcing loop is what turns an ordinary price drop into a liquidity crisis.");
  var out = el.querySelector("[data-out]");
  var btn = el.querySelector("[data-trigger]");

  var W640 = 640, cx = W640 / 2, cy = 182, R = 118;
  var defs = svgEl("defs", {}, svg);
  var mk1 = svgEl("marker", { id: "spiral-arrow-cold", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 6.5, markerHeight: 6.5, orient: "auto-start-reverse" }, defs);
  svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: "var(--text-dim)" }, mk1);
  var mk2 = svgEl("marker", { id: "spiral-arrow-hot", viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 7.5, markerHeight: 7.5, orient: "auto-start-reverse" }, defs);
  svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: "var(--red)" }, mk2);

  var zoneColor = { market: "var(--cyan)", funding: "var(--purple)" };
  var nodes = [
    { label: ["Falling", "asset prices"], zone: "market", ang: -90 },
    { label: ["Higher margins", "& haircuts"], zone: "funding", ang: 0 },
    { label: ["Forced deleveraging", "/ selling"], zone: "market", ang: 90 },
    { label: ["Funding", "stress"], zone: "funding", ang: 180 }
  ];
  var steps = [
    "Asset prices fall — mark-to-market losses appear.",
    "Lenders raise margins and haircuts on the now-riskier collateral.",
    "Positions get forcibly sold to meet the higher margin calls.",
    "That forced selling deepens funding stress — and prices fall further, restarting the loop."
  ];

  function pos(ang) {
    var r = ang * Math.PI / 180;
    return { x: cx + Math.cos(r) * R, y: cy + Math.sin(r) * R * 0.86 };
  }

  /* legend */
  svgEl("circle", { cx: 26, cy: 20, r: 5, fill: zoneColor.market }, svg);
  var lg1 = svgEl("text", { x: 38, y: 24, "font-size": 11.5, fill: "var(--text-dim)" }, svg);
  lg1.textContent = "Market liquidity";
  svgEl("circle", { cx: 176, cy: 20, r: 5, fill: zoneColor.funding }, svg);
  var lg2 = svgEl("text", { x: 188, y: 24, "font-size": 11.5, fill: "var(--text-dim)" }, svg);
  lg2.textContent = "Funding liquidity";

  /* edges (curved, arrowed, drawn first so nodes sit on top) */
  var edgeEls = [];
  for (var i = 0; i < nodes.length; i++) {
    var a = pos(nodes[i].ang), b = pos(nodes[(i + 1) % nodes.length].ang);
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    var dx = b.x - a.x, dy = b.y - a.y;
    var nlen = Math.sqrt(dx * dx + dy * dy) || 1;
    var bow = 28;
    var qx = mx + (-dy / nlen) * bow, qy = my + (dx / nlen) * bow;
    var path = svgEl("path", {
      d: "M" + a.x + "," + a.y + " Q" + qx + "," + qy + " " + b.x + "," + b.y,
      fill: "none", stroke: "var(--text-dim)", "stroke-width": 2,
      "marker-end": "url(#spiral-arrow-cold)", opacity: 0.75
    }, svg);
    edgeEls.push(path);
  }

  /* nodes */
  var nodeEls = [];
  nodes.forEach(function (n) {
    var p = pos(n.ang);
    var g = svgEl("g", {}, svg);
    var rect = svgEl("rect", {
      x: p.x - 76, y: p.y - 24, width: 152, height: 48, rx: 10,
      fill: zoneColor[n.zone], opacity: 0.16, stroke: zoneColor[n.zone], "stroke-width": 1.4
    }, g);
    var t1 = svgEl("text", { x: p.x, y: p.y - 3, "text-anchor": "middle", "font-size": 12, "font-weight": 650, fill: "var(--text)" }, g);
    t1.textContent = n.label[0];
    var t2 = svgEl("text", { x: p.x, y: p.y + 13, "text-anchor": "middle", "font-size": 12, "font-weight": 650, fill: "var(--text)" }, g);
    t2.textContent = n.label[1];
    nodeEls.push(rect);
  });

  function clearHighlight() {
    edgeEls.forEach(function (p) {
      p.setAttribute("stroke", "var(--text-dim)");
      p.setAttribute("stroke-width", 2);
      p.setAttribute("marker-end", "url(#spiral-arrow-cold)");
      p.setAttribute("opacity", 0.75);
    });
    nodeEls.forEach(function (r) {
      r.setAttribute("stroke-width", 1.4);
      r.setAttribute("opacity", 0.16);
    });
  }
  function highlightStep(i) {
    clearHighlight();
    nodeEls[i].setAttribute("stroke-width", 3);
    nodeEls[i].setAttribute("opacity", 0.4);
    edgeEls[i].setAttribute("stroke", "var(--red)");
    edgeEls[i].setAttribute("stroke-width", 3.2);
    edgeEls[i].setAttribute("marker-end", "url(#spiral-arrow-hot)");
    edgeEls[i].setAttribute("opacity", 1);
    out.textContent = "Step " + (i + 1) + "/" + nodes.length + " — " + steps[i];
  }

  var running = false;
  btn.addEventListener("click", function () {
    if (running) return;
    running = true;
    btn.disabled = true;
    var i = 0, delay = 750, n = nodes.length;
    function tick() {
      highlightStep(i);
      i++;
      if (i < n) {
        setTimeout(tick, delay);
      } else {
        setTimeout(function () {
          clearHighlight();
          out.textContent = "Loop closed — the reinforcing feedback restarts unless capital, a backstop, or a circuit-breaker interrupts it.";
          running = false;
          btn.disabled = false;
        }, delay);
      }
    }
    tick();
  });
  out.textContent = "Click “Trigger shock” to step around the loop once.";
});

/* =====================================================================
   lcr — Liquidity Coverage Ratio: HQLA / net 30-day stressed outflows,
   must be >= 100%. Optional data-lcr='{"hqla":N,"outflows":N}' ($M).
   ===================================================================== */
register("lcr", function (el) {
  var data = {};
  try { data = JSON.parse(el.getAttribute("data-lcr") || "{}") || {}; } catch (e) { data = {}; }
  var hqla0 = data.hqla > 0 ? data.hqla : 130;
  var outflows0 = data.outflows > 0 ? data.outflows : 100;
  var maxScale = Math.max(hqla0, outflows0, 100) * 2.2;
  var maxRange = Math.round(maxScale);

  var svg = shell(el, "Liquidity Coverage Ratio — the 30-day survival test",
    '<label>HQLA ($M) <input type="range" min="10" max="' + maxRange + '" step="5" value="' + hqla0 + '" data-k="hqla"><span class="w-value" data-v="hqla"></span></label>' +
    '<label>Net 30-day outflows ($M) <input type="range" min="10" max="' + maxRange + '" step="5" value="' + outflows0 + '" data-k="outflows"><span class="w-value" data-v="outflows"></span></label>' +
    '<span class="w-value" data-out></span>', 640, 210,
    "LCR = HQLA ÷ net 30-day stressed outflows, must be ≥100% — the 30-day survival test. NSFR is the ≥1-year structural analogue: available stable funding ÷ required stable funding, same idea, longer horizon.");
  var out = el.querySelector("[data-out]");
  var inHqla = el.querySelector('[data-k="hqla"]'), inOut = el.querySelector('[data-k="outflows"]');
  var vHqla = el.querySelector('[data-v="hqla"]'), vOut = el.querySelector('[data-v="outflows"]');

  function draw() {
    var hqla = parseFloat(inHqla.value), outflows = parseFloat(inOut.value);
    vHqla.textContent = "$" + hqla + "M";
    vOut.textContent = "$" + outflows + "M";
    var ratio = outflows > 0 ? (hqla / outflows * 100) : 0;
    var ok = ratio >= 100;
    out.textContent = "LCR = " + ratio.toFixed(0) + "%" + (ok ? " — compliant" : " — below the 100% minimum");

    svg.innerHTML = "";
    var Wsvg = 640, x0 = 168, bh = 30, gap = 46;
    var scale = (Wsvg - 210) / maxScale;

    /* HQLA bar */
    svgEl("rect", { x: x0, y: 20, width: Math.max(2, hqla * scale), height: bh, rx: 6, fill: "var(--cyan)", opacity: 0.85 }, svg);
    var l1 = svgEl("text", { x: x0 - 8, y: 20 + bh / 2 + 4, "text-anchor": "end", "font-size": 12, fill: "var(--text-dim)" }, svg);
    l1.textContent = "HQLA";
    var v1 = svgEl("text", { x: x0 + hqla * scale + 8, y: 20 + bh / 2 + 4, "font-size": 12, fill: "var(--text)" }, svg);
    v1.textContent = "$" + hqla + "M";

    /* outflows bar */
    var y2 = 20 + gap;
    svgEl("rect", { x: x0, y: y2, width: Math.max(2, outflows * scale), height: bh, rx: 6, fill: "var(--amber)", opacity: 0.85 }, svg);
    var l2 = svgEl("text", { x: x0 - 8, y: y2 + bh / 2 + 4, "text-anchor": "end", "font-size": 12, fill: "var(--text-dim)" }, svg);
    l2.textContent = "Net outflows";
    var v2 = svgEl("text", { x: x0 + outflows * scale + 8, y: y2 + bh / 2 + 4, "font-size": 12, fill: "var(--text)" }, svg);
    v2.textContent = "$" + outflows + "M";

    /* ratio gauge, capped visually at 200% */
    var gy = y2 + gap + 12, gw = Wsvg - 210 - 20;
    function GX(pct) { return x0 + Math.min(pct, 200) / 200 * gw; }
    svgEl("rect", { x: x0, y: gy, width: gw, height: 22, rx: 5, fill: "none", stroke: "var(--border-strong)" }, svg);
    svgEl("rect", { x: x0, y: gy, width: Math.max(2, GX(ratio) - x0), height: 22, rx: 5, fill: ok ? "var(--green)" : "var(--red)", opacity: 0.85 }, svg);
    svgEl("line", { x1: GX(100), x2: GX(100), y1: gy - 6, y2: gy + 28, stroke: "var(--text-dim)", "stroke-dasharray": "3 3" }, svg);
    var t100 = svgEl("text", { x: GX(100), y: gy + 42, "text-anchor": "middle", "font-size": 10, fill: "var(--text-dim)" }, svg);
    t100.textContent = "100% min";
    var lblg = svgEl("text", { x: x0 - 8, y: gy + bh / 2 - 2, "text-anchor": "end", "font-size": 12, fill: "var(--text-dim)" }, svg);
    lblg.textContent = "LCR";
    var tval = svgEl("text", { x: GX(Math.min(ratio, 200)) + 8, y: gy + 16, "font-size": 12, "font-weight": 700, fill: ok ? "var(--green)" : "var(--red)" }, svg);
    tval.textContent = ratio.toFixed(0) + "%";
  }
  inHqla.addEventListener("input", draw);
  inOut.addEventListener("input", draw);
  draw();
});

/* =====================================================================
   ladder — maturity / funding gap ladder. Optional
   data-ladder='[{"bucket":"...","gap":N}, ...]' ($M, assets minus
   liabilities maturing in that bucket). Draws per-bucket bars plus a
   cumulative-gap line; the cumulative figure is the true funding need.
   ===================================================================== */
register("ladder", function (el) {
  var data;
  try { data = JSON.parse(el.getAttribute("data-ladder") || "null"); } catch (e) { data = null; }
  if (!data || !data.length) {
    data = [
      { bucket: "O/N", gap: -40 },
      { bucket: "2–30d", gap: -35 },
      { bucket: "31–90d", gap: -20 },
      { bucket: "91–365d", gap: 25 },
      { bucket: ">1yr", gap: 70 }
    ];
  }

  var svg = shell(el, "Funding gap ladder — per-bucket gap vs. cumulative requirement", "", 640, 300,
    "Each bar is one maturity bucket's gap (assets − liabilities maturing there). The line is the running CUMULATIVE gap — that cumulative number, not any single bucket, is the true funding requirement.");

  var maxAbs = 1, cum = [], run = 0;
  data.forEach(function (d) {
    run += d.gap; cum.push(run);
    if (Math.abs(d.gap) > maxAbs) maxAbs = Math.abs(d.gap);
    if (Math.abs(run) > maxAbs) maxAbs = Math.abs(run);
  });
  maxAbs *= 1.2;

  var Wsvg = 640, Hsvg = 300, x0 = 56, x1 = Wsvg - 26, y0 = 30, y1 = Hsvg - 56;
  var mid = (y0 + y1) / 2;
  var n = data.length, bw = (x1 - x0) / n;
  function Y(v) { return mid - (v / maxAbs) * (mid - y0); }

  svgEl("line", { x1: x0, x2: x1, y1: mid, y2: mid, stroke: "var(--border-strong)" }, svg);
  var hdr = svgEl("text", { x: x0, y: 16, "font-size": 11, fill: "var(--text-dim)" }, svg);
  hdr.textContent = "green/red bars = per-bucket gap · line = cumulative gap ($M)";

  data.forEach(function (d, i) {
    var bx = x0 + i * bw + bw * 0.18, bwid = bw * 0.64;
    var yTop = d.gap >= 0 ? Y(d.gap) : mid;
    var h = Math.max(1, Math.abs(Y(d.gap) - mid));
    svgEl("rect", { x: bx, y: yTop, width: bwid, height: h, rx: 4, fill: d.gap >= 0 ? "var(--green)" : "var(--red)", opacity: 0.82 }, svg);
    var lbl = svgEl("text", { x: bx + bwid / 2, y: y1 + 18, "text-anchor": "middle", "font-size": 10.5, fill: "var(--text-dim)" }, svg);
    lbl.textContent = d.bucket;
    var val = svgEl("text", {
      x: bx + bwid / 2, y: d.gap >= 0 ? yTop - 6 : yTop + h + 13,
      "text-anchor": "middle", "font-size": 10.5, fill: "var(--text)"
    }, svg);
    val.textContent = (d.gap >= 0 ? "+" : "") + d.gap;
  });

  var dpath = "";
  cum.forEach(function (v, i) {
    var cx = x0 + i * bw + bw / 2;
    dpath += (dpath ? " L" : "M") + cx + "," + Y(v);
  });
  svgEl("path", { d: dpath, fill: "none", stroke: "var(--accent)", "stroke-width": 2.4 }, svg);
  cum.forEach(function (v, i) {
    var cx = x0 + i * bw + bw / 2;
    svgEl("circle", { cx: cx, cy: Y(v), r: 4, fill: "var(--accent)" }, svg);
    var lv = svgEl("text", { x: cx, y: Y(v) - 10, "text-anchor": "middle", "font-size": 10, fill: "var(--accent)", "font-weight": 650 }, svg);
    lv.textContent = (v >= 0 ? "+" : "") + v;
  });
});
