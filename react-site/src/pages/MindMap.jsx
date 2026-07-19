/* Ported from site/assets/app.js FRM.renderMindMap (~lines 403-562). */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { META, bookOf, readingMeta, rpath } from "../lib/meta.js";

export function MindMapGraph({ compact }) {
  const wrapRef = useRef(null);
  const legendRef = useRef(null);
  const infoRef = useRef(null);
  const svgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = wrapRef.current;
    const legendEl = legendRef.current;
    const infoEl = infoRef.current;
    const svg = svgRef.current;
    const NS = "http://www.w3.org/2000/svg";

    const G = META.graph;
    const colors = { 1: "#6c9dff", 2: "#4ecf8e", 3: "#e8b45a", 4: "#5fd4d0", 5: "#b18cff" };
    const softs = {
      1: "rgba(108,157,255,0.16)",
      2: "rgba(78,207,142,0.16)",
      3: "rgba(232,180,90,0.16)",
      4: "rgba(95,212,208,0.16)",
      5: "rgba(177,140,255,0.16)",
    };

    let lg = "";
    META.books.forEach((b) => {
      lg += '<span class="lg"><span class="sw" style="background:' + colors[b.n] + '"></span>' + b.n + " · " + b.short + "</span>";
    });
    legendEl.innerHTML = lg;

    const W = 1600, H = 1100, CX = W / 2, CY = H / 2;
    const clusterCenter = {};
    const order = [1, 2, 3, 4, 5];
    order.forEach((bn, i) => {
      const ang = -Math.PI / 2 + i * (2 * Math.PI / 5);
      clusterCenter[bn] = { x: CX + Math.cos(ang) * 420, y: CY + Math.sin(ang) * 330 };
    });
    const byBook = {};
    G.nodes.forEach((n) => { (byBook[n.book] = byBook[n.book] || []).push(n); });
    const pos = {};
    Object.keys(byBook).forEach((bn) => {
      const list = byBook[bn], c = clusterCenter[bn];
      list.forEach((n, i) => {
        const ring = i % 2, idx = Math.floor(i / 2), cnt = Math.ceil(list.length / 2);
        const rad = ring === 0 ? 105 : 205;
        const ang = (idx / cnt) * 2 * Math.PI + (ring ? Math.PI / cnt : 0) + parseInt(bn, 10);
        pos[n.id] = { x: c.x + Math.cos(ang) * rad, y: c.y + Math.sin(ang) * rad * 0.72 };
      });
    });

    /* De-overlap pass: treat each node as its label-sized box (plus breathing
       room) and push intersecting pairs apart along the axis of least overlap,
       keeping everything clamped inside the canvas. The ring layout above is a
       good start but knows nothing about label widths. */
    const boxes = G.nodes.map((n) => ({ id: n.id, w: n.label.length * 6.4 + 34, h: 44 }));
    for (let iter = 0; iter < 220; iter++) {
      let moved = false;
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const A = boxes[i], B = boxes[j];
          const pa = pos[A.id], pb = pos[B.id];
          const ox = (A.w + B.w) / 2 - Math.abs(pa.x - pb.x);
          const oy = (A.h + B.h) / 2 - Math.abs(pa.y - pb.y);
          if (ox <= 0 || oy <= 0) continue;
          moved = true;
          if (ox / (A.w + B.w) < oy / (A.h + B.h)) {
            const s = (ox / 2 + 0.5) * (pa.x <= pb.x ? -1 : 1);
            pa.x += s; pb.x -= s;
          } else {
            const s = (oy / 2 + 0.5) * (pa.y <= pb.y ? -1 : 1);
            pa.y += s; pb.y -= s;
          }
        }
      }
      boxes.forEach((b) => {
        const p = pos[b.id];
        p.x = Math.max(b.w / 2 + 8, Math.min(W - b.w / 2 - 8, p.x));
        p.y = Math.max(b.h / 2 + 118, Math.min(H - b.h / 2 - 8, p.y)); // 118 keeps clear of the legend overlay
      });
      if (!moved) break;
    }

    const adj = {};
    G.edges.forEach((e) => {
      (adj[e[0]] = adj[e[0]] || []).push(e[1]);
      (adj[e[1]] = adj[e[1]] || []).push(e[0]);
    });

    const edgeEls = [];
    const nodeEls = {};
    const gEdges = document.createElementNS(NS, "g");
    const gNodes = document.createElementNS(NS, "g");
    svg.appendChild(gEdges);
    svg.appendChild(gNodes);

    G.edges.forEach((e) => {
      const a = pos[e[0]], b = pos[e[1]];
      if (!a || !b) return;
      const p = document.createElementNS(NS, "path");
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const cx = mx - dy * 0.12, cy = my + dx * 0.12;
      p.setAttribute("d", "M" + a.x + "," + a.y + " Q" + cx + "," + cy + " " + b.x + "," + b.y);
      p.setAttribute("class", "mm-edge");
      p.dataset.a = e[0];
      p.dataset.b = e[1];
      gEdges.appendChild(p);
      edgeEls.push(p);
    });

    function highlight(id) {
      const keep = {};
      keep[id] = 1;
      (adj[id] || []).forEach((x) => { keep[x] = 1; });
      Object.keys(nodeEls).forEach((k) => {
        nodeEls[k].classList.toggle("dim", !keep[k]);
      });
      edgeEls.forEach((p) => {
        const on = p.dataset.a === id || p.dataset.b === id;
        p.classList.toggle("hl", on);
        p.classList.toggle("dim", !on);
      });
    }
    function clear() {
      Object.keys(nodeEls).forEach((k) => { nodeEls[k].classList.remove("dim"); });
      edgeEls.forEach((p) => { p.classList.remove("hl", "dim"); });
    }

    G.nodes.forEach((n) => {
      const p = pos[n.id];
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "mm-node");
      g.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
      const padW = n.label.length * 6.4 + 22;
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", -padW / 2);
      rect.setAttribute("y", -15);
      rect.setAttribute("width", padW);
      rect.setAttribute("height", 30);
      rect.setAttribute("rx", 8);
      rect.setAttribute("fill", softs[n.book]);
      rect.setAttribute("stroke", colors[n.book]);
      const tx = document.createElementNS(NS, "text");
      tx.setAttribute("text-anchor", "middle");
      tx.setAttribute("y", 4.5);
      tx.textContent = n.label;
      g.appendChild(rect);
      g.appendChild(tx);
      gNodes.appendChild(g);
      nodeEls[n.id] = g;

      g.addEventListener("mouseenter", () => highlight(n.id));
      g.addEventListener("mouseleave", () => clear());
      g.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const rm = readingMeta(n.r), b = bookOf(n.r);
        const neigh = (adj[n.id] || [])
          .map((id) => {
            let nn = null;
            G.nodes.forEach((x) => { if (x.id === id) nn = x; });
            return nn ? nn.label : id;
          })
          .join(" · ");
        infoEl.style.display = "block";
        infoEl.innerHTML =
          "<b><a href='#" + rpath(n.r) + "'>" + n.label + " → R" + n.r + " · " + (rm ? rm.t : "") + "</a></b>" +
          " <span style='color:" + colors[n.book] + "'>(Book " + (b ? b.n : "") + ")</span>" +
          "<br><span style='color:var(--text-dim)'>Connected to: " + (neigh || "—") + "</span>";
      });
    });

    function onInfoClick(ev) {
      const a = ev.target.closest && ev.target.closest("a[href]");
      if (a) {
        const href = a.getAttribute("href");
        if (href && href.indexOf("#/chapter/") === 0) {
          ev.preventDefault();
          navigate(href.slice(1));
        }
      }
    }
    infoEl.addEventListener("click", onInfoClick);

    function onSvgClick() { infoEl.style.display = "none"; }
    svg.addEventListener("click", onSvgClick);

    const vb = { x: 0, y: 0, w: W, h: H };
    function setVB() { svg.setAttribute("viewBox", vb.x + " " + vb.y + " " + vb.w + " " + vb.h); }
    setVB();
    let dragging = false, sx = 0, sy = 0;
    function onMouseDown(e) { dragging = true; sx = e.clientX; sy = e.clientY; }
    function onMouseMove(e) {
      if (!dragging) return;
      const scale = vb.w / svg.clientWidth;
      vb.x -= (e.clientX - sx) * scale;
      vb.y -= (e.clientY - sy) * scale;
      sx = e.clientX; sy = e.clientY; setVB();
    }
    function onMouseUp() { dragging = false; }
    svg.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    function onWheel(e) {
      e.preventDefault();
      const f = e.deltaY > 0 ? 1.12 : 0.89;
      const rect = svg.getBoundingClientRect();
      const mx = vb.x + ((e.clientX - rect.left) / rect.width) * vb.w;
      const my = vb.y + ((e.clientY - rect.top) / rect.height) * vb.h;
      vb.w *= f; vb.h *= f;
      vb.x = mx - (mx - vb.x) * f;
      vb.y = my - (my - vb.y) * f;
      setVB();
    }
    svg.addEventListener("wheel", onWheel, { passive: false });

    let lastT = null;
    function onTouchStart(e) { if (e.touches.length === 1) lastT = e.touches[0]; }
    function onTouchMove(e) {
      if (e.touches.length === 1 && lastT) {
        e.preventDefault();
        const scale = vb.w / svg.clientWidth;
        vb.x -= (e.touches[0].clientX - lastT.clientX) * scale;
        vb.y -= (e.touches[0].clientY - lastT.clientY) * scale;
        lastT = e.touches[0]; setVB();
      }
    }
    svg.addEventListener("touchstart", onTouchStart);
    svg.addEventListener("touchmove", onTouchMove, { passive: false });

    if (compact) {
      vb.w = W * 1.02; vb.h = H * 1.02; vb.x = -(vb.w - W) / 2; vb.y = -(vb.h - H) / 2;
      setVB();
    }

    return () => {
      infoEl.removeEventListener("click", onInfoClick);
      svg.removeEventListener("click", onSvgClick);
      svg.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      svg.removeEventListener("wheel", onWheel);
      svg.removeEventListener("touchstart", onTouchStart);
      svg.removeEventListener("touchmove", onTouchMove);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    };
  }, [compact, navigate]);

  return (
    <div
      ref={wrapRef}
      id="mindmap-mount"
      className={"mindmap-wrap" + (compact ? " compact" : "")}
    >
      <div className="mm-legend" ref={legendRef}></div>
      <div className="mm-info" ref={infoRef}></div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default function MindMap() {
  return (
    <main className="page wide">
      <h1>Global mind map</h1>
      <p className="lead">
        Every major concept and its dependencies. Drag to pan, scroll to zoom, hover to trace connections, click a
        node to see where it lives — then jump straight to the chapter.
      </p>
      <MindMapGraph />
    </main>
  );
}
