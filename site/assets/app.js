/* FRM Part II interactive curriculum — engine.
   Pure JS, no dependencies. Works from file:// (script injection, no fetch). */

(function () {
  "use strict";

  /* ---------- theme ---------- */
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("frm-theme"); } catch (e) {}
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
    document.documentElement.setAttribute("data-theme", "light");

  FRM.toggleTheme = function () {
    var cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cur);
    try { localStorage.setItem("frm-theme", cur); } catch (e) {}
  };

  /* ---------- helpers ---------- */
  FRM.qs = function (name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  };
  FRM.bookOf = function (rn) {
    var bs = FRM.META.books;
    for (var i = 0; i < bs.length; i++)
      for (var j = 0; j < bs[i].readings.length; j++)
        if (bs[i].readings[j].n === rn) return bs[i];
    return null;
  };
  FRM.readingMeta = function (rn) {
    var b = FRM.bookOf(rn);
    if (!b) return null;
    for (var j = 0; j < b.readings.length; j++) if (b.readings[j].n === rn) return b.readings[j];
    return null;
  };
  FRM.rlink = function (rn) { return "chapter.html?r=" + rn; };
  FRM.rfile = function (rn) {
    var b = FRM.bookOf(rn);
    return "data/" + b.dir + "/r" + (rn < 10 ? "0" + rn : rn) + ".js";
  };
  FRM.stars = function (k) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += i <= k ? "★" : '<span class="off">★</span>';
    return '<span class="hy-stars">' + s + "</span>";
  };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  /* ---------- math rendering ----------
     A math string that contains a backslash is treated as LaTeX and typeset with
     KaTeX (vendored, offline). Legacy HTML-math strings (Unicode + <sub>/<sup>)
     are passed through untouched, so un-converted readings keep working. */
  // LaTeX markers: a backslash macro, or a braced sub/superscript. Legacy HTML-math
  // (Unicode + <sub>/<sup>) never contains "_{" or "^{", so this cleanly separates them.
  function isTex(s) { return /\\|[_^]\{/.test(s); }
  function katexRender(tex, display) {
    try {
      return window.katex.renderToString(tex, {
        throwOnError: false, displayMode: !!display, output: "html",
        strict: false, trust: false
      });
    } catch (e) { return '<span class="tex-error">' + esc(tex) + "</span>"; }
  }
  // Formula-box math: typeset only strings that look like LaTeX (contain a backslash);
  // legacy HTML-math strings pass through untouched.
  FRM.renderMath = function (s, display) {
    return (window.katex && isTex(s)) ? katexRender(s, display) : s;
  };
  // Prose math: typeset \( … \) inline and \[ … \] display, leaving all other
  // HTML (and every literal $ for currency) untouched. No-op on un-annotated text.
  FRM.renderProse = function (s) {
    if (s == null || !window.katex) return s;
    return String(s)
      .replace(/\\\[([\s\S]+?)\\\]/g, function (_m, t) { return katexRender(t.trim(), true); })
      .replace(/\\\(([\s\S]+?)\\\)/g, function (_m, t) { return katexRender(t.trim(), false); });
  };
  // A few formulas are wider than the formula box. KaTeX display math can't line-wrap,
  // so scale the font down just enough that it fits on one line (floored for legibility).
  FRM.fitMath = function (root) {
    if (!window.katex) return;
    (root || document).querySelectorAll(".f-tex").forEach(function (el) {
      el.style.fontSize = "";
      var inner = el.querySelector(".katex");   // the actual (nowrap) typeset content
      if (!inner) return;
      var size = 1.22, guard = 0;               // rem; must match .f-tex in style.css
      while (inner.offsetWidth > el.clientWidth - 2 && size > 0.7 && guard++ < 40) {
        size -= 0.03;
        el.style.fontSize = size.toFixed(3) + "rem";
      }
    });
  };

  /* ---------- data loading ---------- */
  FRM.loadReading = function (rn, cb) {
    if (FRM.readings[rn]) return cb(FRM.readings[rn]);
    var s = document.createElement("script");
    s.src = FRM.rfile(rn);
    s.onload = function () { cb(FRM.readings[rn] || null); };
    s.onerror = function () { cb(null); };
    document.head.appendChild(s);
  };
  FRM.loadAll = function (cb, progress) {
    var all = [];
    FRM.META.books.forEach(function (b) { b.readings.forEach(function (r) { all.push(r.n); }); });
    var left = all.length;
    all.forEach(function (rn) {
      var s = document.createElement("script");
      s.src = FRM.rfile(rn);
      s.onload = s.onerror = function () {
        left--;
        if (progress) progress(all.length - left, all.length);
        if (left === 0) cb();
      };
      document.head.appendChild(s);
    });
  };

  /* ---------- top navigation ---------- */
  FRM.nav = function (active) {
    var items = [
      ["index.html", "Home"],
      ["book.html?b=1", "1 · Market"],
      ["book.html?b=2", "2 · Credit"],
      ["book.html?b=3", "3 · Op Risk"],
      ["book.html?b=4", "4 · Liquidity"],
      ["book.html?b=5", "5 · Investment"],
      ["mindmap.html", "Mind Map"],
      ["search.html", "Search"],
      ["revision.html", "Revision"]
    ];
    var h = '<a class="brand" href="index.html">FRM · Part II</a>';
    items.forEach(function (it) {
      h += '<a class="nav-item' + (active === it[1] ? " active" : "") + '" href="' + it[0] + '">' + it[1] + "</a>";
    });
    h += '<span class="spacer"></span><button onclick="FRM.toggleTheme()" title="Toggle theme">◐</button>';
    var el = document.createElement("nav");
    el.className = "topnav";
    el.innerHTML = h;
    document.body.insertBefore(el, document.body.firstChild);
  };

  /* ---------- section label ---------- */
  var tocSections = null; /* set to an array while a chapter is being rendered; label() fills it */
  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function label(txt, color) {
    var id = slugify(txt);
    if (tocSections) tocSections.push({ id: id, txt: txt });
    return '<div class="section-label" id="' + id + '"><span class="dot" style="background:' + (color || "var(--accent)") + '"></span>' + txt + "</div>";
  }

  /* ---------- chapter in-page table of contents ---------- */
  FRM._toc = null;
  function teardownTOC() {
    if (FRM._toc && FRM._toc.observer) {
      try { FRM._toc.observer.disconnect(); } catch (e) {}
    }
    document.querySelectorAll(".chapter-toc").forEach(function (n) { n.parentNode.removeChild(n); });
    FRM._toc = null;
  }
  function buildTOC(sections) {
    teardownTOC();
    if (!sections || !sections.length) return;
    var h = '<div class="chapter-toc-title">On this page</div><ul>';
    sections.forEach(function (s) {
      h += '<li><a href="#' + s.id + '" data-target="' + s.id + '">' + esc(s.txt) + "</a></li>";
    });
    h += "</ul>";
    var nav = document.createElement("nav");
    nav.className = "chapter-toc";
    nav.innerHTML = h;
    document.body.appendChild(nav);

    var links = {};
    nav.querySelectorAll("a").forEach(function (a) {
      links[a.getAttribute("data-target")] = a;
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        var el = document.getElementById(a.getAttribute("data-target"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    /* highlight the first section immediately so there's no flash of nothing-active
       before scrollTo(0,0)/the observer settle */
    if (links[sections[0].id]) links[sections[0].id].classList.add("active");

    var observer = null;
    if (window.IntersectionObserver) {
      var visible = {};
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
        var activeId = null;
        for (var i = 0; i < sections.length; i++) {
          if (visible[sections[i].id]) { activeId = sections[i].id; break; }
        }
        if (!activeId) return;
        nav.querySelectorAll("a.active").forEach(function (a) { a.classList.remove("active"); });
        if (links[activeId]) links[activeId].classList.add("active");
      }, { rootMargin: "-10% 0px -75% 0px", threshold: 0 });
      sections.forEach(function (s) {
        var el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
    }
    FRM._toc = { el: nav, observer: observer };
  }

  /* ---------- chapter renderer ---------- */
  FRM.renderChapter = function (rn, mount) {
    teardownTOC();
    var meta = FRM.readingMeta(rn), book = FRM.bookOf(rn);
    if (!meta) { mount.innerHTML = "<p>Unknown reading.</p>"; return; }
    document.title = "R" + rn + " — " + meta.t;
    FRM.loadReading(rn, function (d) {
      if (!d) {
        mount.innerHTML =
          '<div class="crumbs"><a href="index.html">Home</a> / <a href="book.html?b=' + book.n + '">' + book.short + "</a></div>" +
          "<h1>Reading " + rn + " — " + meta.t + "</h1><p class='lead'>" + meta.tag + "</p>" +
          "<div class='callout warn'><div class='callout-title'>Not yet built</div>This chapter's content file has not been generated yet.</div>";
        return;
      }
      tocSections = [];
      var h = "", P = FRM.renderProse;
      h += '<div class="crumbs"><a href="index.html">Home</a> / <a href="book.html?b=' + book.n + '">Book ' + book.n + " · " + book.short + "</a> / Reading " + rn + "</div>";
      h += '<div class="kicker" style="color:' + book.color + '">' + d.session + " · Reading " + rn + "</div>";
      h += "<h1>" + d.title + "</h1>";
      if (d.tagline) h += '<p class="lead">' + P(d.tagline) + "</p>";

      if (d.teaches) h += label("What this chapter teaches", book.color) + '<div class="prose">' + P(d.teaches) + "</div>";
      if (d.why) h += label("Why it matters", book.color) + '<div class="prose">' + P(d.why) + "</div>";
      if (d.intuition) h += label("Core intuition", book.color) + '<div class="prose">' + P(d.intuition) + "</div>";
      if (d.visual) h += label("See it", book.color) + '<div class="prose">' + d.visual + "</div>";

      if (d.formulas && d.formulas.length) {
        h += label("Formula box", book.color);
        d.formulas.forEach(function (f) {
          var mathCls = "f-math" + (window.katex && isTex(f.math) ? " f-tex" : "");
          h += '<div class="formula-block"><div class="f-name">' + f.name + '</div><div class="' + mathCls + '">' + FRM.renderMath(f.math, true) + "</div>" +
            (f.note ? '<div class="f-note">' + P(f.note) + "</div>" : "") + "</div>";
        });
      }

      if (d.concepts && d.concepts.length) {
        h += label("Concept hierarchy — click to expand", book.color);
        d.concepts.forEach(function (c, i) {
          h += '<details class="concept"' + (i === 0 ? " open" : "") + "><summary>" + c.name + "</summary>";
          h += '<div class="concept-body">';
          function fld(tag, cls, val) {
            if (!val) return "";
            var body = cls === "rel" ? val : P(val);
            return '<div class="concept-field ' + cls + '"><span class="field-tag ' + cls + '">' + tag + "</span><div>" + body + "</div></div>";
          }
          h += fld("Definition", "def", c.def);
          h += fld("Intuition", "int", c.intuition);
          h += fld("Example", "ex", c.example);
          h += fld("Counterexample", "cex", c.counter);
          h += fld("Pitfall", "pit", c.pitfall);
          if (c.related && c.related.length) {
            var rel = c.related.map(function (x) {
              if (typeof x === "object") return '<a class="chip" href="' + FRM.rlink(x.r) + '">' + x.label + "</a>";
              return '<span class="chip">' + x + "</span>";
            }).join("");
            h += fld("Related", "rel", rel);
          }
          h += fld("Memory trick", "mem", c.memory);
          h += "</div></details>";
        });
      }

      if (d.connections) {
        h += label("Connections", book.color);
        var cn = d.connections;
        function connList(title, arr) {
          if (!arr || !arr.length) return "";
          var s = '<div class="card"><h3>' + title + "</h3>";
          arr.forEach(function (x) {
            if (x.r) {
              var rm = FRM.readingMeta(x.r);
              s += '<p><a href="' + FRM.rlink(x.r) + '"><strong>R' + x.r + " · " + (rm ? rm.t : "") + "</strong></a> — " + P(x.why) + "</p>";
            } else s += "<p><strong>" + (x.label || "") + "</strong>" + (x.label ? " — " : "") + P(x.why) + "</p>";
          });
          return s + "</div>";
        }
        h += '<div class="grid2">';
        h += connList("Where this came from", cn.from);
        h += connList("Where you'll use it next", cn.to);
        h += "</div>";
        if (cn.confused && cn.confused.length) {
          var s = '<div class="card accent"><h3>Commonly confused with</h3>';
          cn.confused.forEach(function (x) { s += "<p><strong>" + P(x.what) + "</strong> — " + P(x.how) + "</p>"; });
          h += s + "</div>";
        }
      }

      if (d.misconceptions && d.misconceptions.length) {
        h += label("Common misconceptions & exam traps", "var(--red)");
        d.misconceptions.forEach(function (m) {
          h += '<div class="misc-row"><div class="wrong"><span class="tag">Looks true / trap</span>' + P(m.wrong) +
            '</div><div class="right"><span class="tag">Actually</span>' + P(m.right) + "</div></div>";
        });
      }

      if (d.highYield && d.highYield.length) {
        h += label("High yield — what to prioritize", "var(--amber)");
        d.highYield.forEach(function (y) {
          var tier = y.stars >= 5 ? " hy-5" : y.stars >= 4 ? " hy-4" : "";
          h += '<div class="hy-item' + tier + '">' + FRM.stars(y.stars) + '<div class="hy-body"><div class="hy-what">' + P(y.what) +
            '</div><div class="hy-why">' + P(y.why || "") + "</div></div></div>";
        });
      }

      if (d.recall && d.recall.length) {
        h += label("Active recall — answer before revealing", "var(--purple)");
        d.recall.forEach(function (q) {
          h += '<div class="recall-card"><div class="recall-q">' + P(q.q) + '</div><div class="recall-a">' + P(q.a) + "</div></div>";
        });
      }

      if (d.hooks && d.hooks.length) {
        h += label("Memory hooks", "var(--pink)");
        h += '<div class="grid2">';
        d.hooks.forEach(function (k) {
          h += '<div class="card"><h3>' + k.title + "</h3><p style='font-size:0.92rem'>" + P(k.text) + "</p></div>";
        });
        h += "</div>";
      }

      if (d.summary) h += label("One-page summary", book.color) + '<div class="card accent">' + P(d.summary) + "</div>";

      /* prev / next */
      var flat = [];
      FRM.META.books.forEach(function (b) { b.readings.forEach(function (r) { flat.push(r.n); }); });
      var idx = flat.indexOf(rn);
      h += '<div class="chapter-nav">';
      if (idx > 0) {
        var p = FRM.readingMeta(flat[idx - 1]);
        h += '<a href="' + FRM.rlink(flat[idx - 1]) + '"><div class="dir">← Previous</div><div class="t">R' + flat[idx - 1] + " · " + p.t + "</div></a>";
      } else h += "<span style='flex:1'></span>";
      if (idx < flat.length - 1) {
        var nx = FRM.readingMeta(flat[idx + 1]);
        h += '<a class="next" href="' + FRM.rlink(flat[idx + 1]) + '"><div class="dir">Next →</div><div class="t">R' + flat[idx + 1] + " · " + nx.t + "</div></a>";
      } else h += "<span style='flex:1'></span>";
      h += "</div>";

      mount.innerHTML = h;
      /* recall toggles */
      mount.querySelectorAll(".recall-q").forEach(function (el) {
        el.addEventListener("click", function () { el.parentElement.classList.toggle("open"); });
      });
      FRM.initWidgets(mount);
      FRM.fitMath(mount);
      buildTOC(tocSections);
      tocSections = null;
      window.scrollTo(0, 0);
    });
  };

  /* ---------- book page renderer ---------- */
  FRM.renderBook = function (bn, mount) {
    var b = null;
    FRM.META.books.forEach(function (x) { if (x.n === bn) b = x; });
    if (!b) { mount.innerHTML = "<p>Unknown book.</p>"; return; }
    document.title = "Book " + b.n + " — " + b.title;
    var h = '<div class="crumbs"><a href="index.html">Home</a> / Book ' + b.n + "</div>";
    h += '<div class="kicker" style="color:' + b.color + '">Book ' + b.n + " · " + b.readings.length + " readings</div>";
    h += "<h1>" + b.title + "</h1>";
    h += '<p class="lead">' + b.blurb + "</p>";
    h += '<div class="grid2">';
    h += '<div class="card"><h3>Why this book exists</h3><p style="font-size:0.93rem">' + b.why + "</p></div>";
    h += '<div class="card"><h3>Before you start / after you finish</h3><p style="font-size:0.93rem"><strong>You should already know:</strong> ' + b.prereqs +
      '</p><p style="font-size:0.93rem"><strong>This book feeds:</strong> ' + b.feeds + "</p></div>";
    h += "</div>";

    h += label("Learning roadmap — follow the order, the dependencies are real", b.color);
    h += '<p style="font-size:0.88rem;color:var(--text-dim)">Stars = exam priority. Pills show which earlier readings each one builds on — click a pill to jump straight there.</p>';
    b.sessions.forEach(function (ss) {
      h += '<div class="roadmap-session"><div class="ss-title">' + ss.name + " · R" + ss.from + "–" + ss.to + "</div>";
      h += '<div class="rail">';
      b.readings.forEach(function (r) {
        if (r.n < ss.from || r.n > ss.to) return;
        var hasDeps = r.deps && r.deps.length;
        var depsHtml = hasDeps
          ? '<span class="dep-arrow">↳ builds on</span><span class="dep-pills">' +
            r.deps.map(function (d) { return '<a class="dep-pill" href="' + FRM.rlink(d) + '">R' + d + "</a>"; }).join("") +
            "</span>"
          : '<span class="dep-start" style="color:' + b.color + '">✦ start here</span>';
        h += '<div class="rail-item">' +
          '<span class="rail-dot' + (hasDeps ? "" : " start") + '" style="' + (hasDeps ? "" : "background:" + b.color + ";border-color:" + b.color) + '"></span>' +
          '<a class="reading-row" href="' + FRM.rlink(r.n) + '"><span class="r-num">R' + r.n + '</span>' +
          '<span class="r-title">' + r.t + '<br><span style="font-weight:400;font-size:0.82rem;color:var(--text-dim)">' + r.tag + "</span></span>" +
          '<span class="r-hy">' + "★".repeat(r.hy) + "</span></a>" +
          '<div class="r-deps">' + depsHtml + "</div>" +
          "</div>";
      });
      h += "</div></div>";
    });
    mount.innerHTML = h;
  };

  /* ---------- mind map renderer (shared: full page + homepage preview) ---------- */
  FRM.renderMindMap = function (container, opts) {
    opts = opts || {};
    container.classList.add("mindmap-wrap");
    if (opts.compact) container.classList.add("compact");
    container.innerHTML = '<div class="mm-legend"></div><div class="mm-info"></div><svg></svg>';
    var legendEl = container.querySelector(".mm-legend");
    var infoEl = container.querySelector(".mm-info");
    var svg = container.querySelector("svg");

    var G = FRM.META.graph;
    var NS = "http://www.w3.org/2000/svg";
    var colors = { 1: "#6c9dff", 2: "#4ecf8e", 3: "#e8b45a", 4: "#5fd4d0", 5: "#b18cff" };
    var softs = { 1: "rgba(108,157,255,0.16)", 2: "rgba(78,207,142,0.16)", 3: "rgba(232,180,90,0.16)", 4: "rgba(95,212,208,0.16)", 5: "rgba(177,140,255,0.16)" };

    var lg = "";
    FRM.META.books.forEach(function (b) {
      lg += '<span class="lg"><span class="sw" style="background:' + colors[b.n] + '"></span>' + b.n + " · " + b.short + "</span>";
    });
    legendEl.innerHTML = lg;

    var W = 1600, H = 1100, CX = W / 2, CY = H / 2;
    var clusterCenter = {};
    var order = [1, 2, 3, 4, 5];
    order.forEach(function (bn, i) {
      var ang = -Math.PI / 2 + i * (2 * Math.PI / 5);
      clusterCenter[bn] = { x: CX + Math.cos(ang) * 420, y: CY + Math.sin(ang) * 330 };
    });
    var byBook = {};
    G.nodes.forEach(function (n) { (byBook[n.book] = byBook[n.book] || []).push(n); });
    var pos = {};
    Object.keys(byBook).forEach(function (bn) {
      var list = byBook[bn], c = clusterCenter[bn];
      list.forEach(function (n, i) {
        var ring = i % 2, idx = Math.floor(i / 2), cnt = Math.ceil(list.length / 2);
        var rad = ring === 0 ? 105 : 205;
        var ang = idx / cnt * 2 * Math.PI + (ring ? Math.PI / cnt : 0) + parseInt(bn, 10);
        pos[n.id] = { x: c.x + Math.cos(ang) * rad, y: c.y + Math.sin(ang) * rad * 0.72 };
      });
    });

    var adj = {};
    G.edges.forEach(function (e) {
      (adj[e[0]] = adj[e[0]] || []).push(e[1]);
      (adj[e[1]] = adj[e[1]] || []).push(e[0]);
    });

    var edgeEls = [], nodeEls = {};
    var gEdges = document.createElementNS(NS, "g");
    var gNodes = document.createElementNS(NS, "g");
    svg.appendChild(gEdges); svg.appendChild(gNodes);

    G.edges.forEach(function (e) {
      var a = pos[e[0]], b = pos[e[1]];
      if (!a || !b) return;
      var p = document.createElementNS(NS, "path");
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var dx = b.x - a.x, dy = b.y - a.y;
      var cx = mx - dy * 0.12, cy = my + dx * 0.12;
      p.setAttribute("d", "M" + a.x + "," + a.y + " Q" + cx + "," + cy + " " + b.x + "," + b.y);
      p.setAttribute("class", "mm-edge");
      p.dataset.a = e[0]; p.dataset.b = e[1];
      gEdges.appendChild(p);
      edgeEls.push(p);
    });

    G.nodes.forEach(function (n) {
      var p = pos[n.id];
      var g = document.createElementNS(NS, "g");
      g.setAttribute("class", "mm-node");
      g.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
      var padW = n.label.length * 6.4 + 22;
      var rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", -padW / 2); rect.setAttribute("y", -15);
      rect.setAttribute("width", padW); rect.setAttribute("height", 30);
      rect.setAttribute("rx", 8);
      rect.setAttribute("fill", softs[n.book]);
      rect.setAttribute("stroke", colors[n.book]);
      var tx = document.createElementNS(NS, "text");
      tx.setAttribute("text-anchor", "middle"); tx.setAttribute("y", 4.5);
      tx.textContent = n.label;
      g.appendChild(rect); g.appendChild(tx);
      gNodes.appendChild(g);
      nodeEls[n.id] = g;

      g.addEventListener("mouseenter", function () { highlight(n.id); });
      g.addEventListener("mouseleave", function () { clear(); });
      g.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var rm = FRM.readingMeta(n.r), b = FRM.bookOf(n.r);
        var neigh = (adj[n.id] || []).map(function (id) {
          var nn = null; G.nodes.forEach(function (x) { if (x.id === id) nn = x; });
          return nn ? nn.label : id;
        }).join(" · ");
        infoEl.style.display = "block";
        infoEl.innerHTML = "<b><a href='" + FRM.rlink(n.r) + "'>" + n.label + " → R" + n.r + " · " + (rm ? rm.t : "") + "</a></b>" +
          " <span style='color:" + colors[n.book] + "'>(Book " + b.n + ")</span>" +
          "<br><span style='color:var(--text-dim)'>Connected to: " + (neigh || "—") + "</span>";
      });
    });
    svg.addEventListener("click", function () { infoEl.style.display = "none"; });

    function highlight(id) {
      var keep = {}; keep[id] = 1;
      (adj[id] || []).forEach(function (x) { keep[x] = 1; });
      Object.keys(nodeEls).forEach(function (k) {
        nodeEls[k].classList.toggle("dim", !keep[k]);
      });
      edgeEls.forEach(function (p) {
        var on = p.dataset.a === id || p.dataset.b === id;
        p.classList.toggle("hl", on);
        p.classList.toggle("dim", !on);
      });
    }
    function clear() {
      Object.keys(nodeEls).forEach(function (k) { nodeEls[k].classList.remove("dim"); });
      edgeEls.forEach(function (p) { p.classList.remove("hl", "dim"); });
    }

    var vb = { x: 0, y: 0, w: W, h: H };
    function setVB() { svg.setAttribute("viewBox", vb.x + " " + vb.y + " " + vb.w + " " + vb.h); }
    setVB();
    var dragging = false, sx = 0, sy = 0;
    svg.addEventListener("mousedown", function (e) { dragging = true; sx = e.clientX; sy = e.clientY; });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var scale = vb.w / svg.clientWidth;
      vb.x -= (e.clientX - sx) * scale; vb.y -= (e.clientY - sy) * scale;
      sx = e.clientX; sy = e.clientY; setVB();
    });
    window.addEventListener("mouseup", function () { dragging = false; });
    svg.addEventListener("wheel", function (e) {
      e.preventDefault();
      var f = e.deltaY > 0 ? 1.12 : 0.89;
      var rect = svg.getBoundingClientRect();
      var mx = vb.x + (e.clientX - rect.left) / rect.width * vb.w;
      var my = vb.y + (e.clientY - rect.top) / rect.height * vb.h;
      vb.w *= f; vb.h *= f;
      vb.x = mx - (mx - vb.x) * f; vb.y = my - (my - vb.y) * f;
      setVB();
    }, { passive: false });
    var lastT = null;
    svg.addEventListener("touchstart", function (e) { if (e.touches.length === 1) lastT = e.touches[0]; });
    svg.addEventListener("touchmove", function (e) {
      if (e.touches.length === 1 && lastT) {
        e.preventDefault();
        var scale = vb.w / svg.clientWidth;
        vb.x -= (e.touches[0].clientX - lastT.clientX) * scale;
        vb.y -= (e.touches[0].clientY - lastT.clientY) * scale;
        lastT = e.touches[0]; setVB();
      }
    }, { passive: false });

    if (opts.compact) {
      /* start a bit more zoomed-out so the whole graph is visible in a shorter box */
      vb.w = W * 1.02; vb.h = H * 1.02; vb.x = -(vb.w - W) / 2; vb.y = -(vb.h - H) / 2;
      setVB();
    }
  };

  /* ---------- homepage renderer ---------- */
  FRM.renderHome = function (mount) {
    document.title = "FRM Part II — Interactive Curriculum";
    var books = FRM.META.books;
    var allReadings = [];
    books.forEach(function (b) { b.readings.forEach(function (r) { allReadings.push({ r: r, book: b }); }); });
    var totalReadings = allReadings.length;
    var hy5 = allReadings.filter(function (x) { return x.r.hy === 5; });
    var foundations = allReadings.filter(function (x) { return !x.r.deps || x.r.deps.length === 0; });
    var combos = allReadings.filter(function (x) { return x.r.deps && x.r.deps.length >= 3; });

    var h = "";

    /* ---- hero ---- */
    h += '<div class="hero"><h1>FRM Part II</h1>' +
      '<p class="lead">The complete Part II curriculum — 5 books, ' + totalReadings + ' readings — rebuilt as an interactive learning system. Not documentation: every page is built to transform the source material into intuition, connections, and exam-ready recall.</p>' +
      '<div class="stat-row">' +
      '<div class="stat"><div class="n">' + books.length + '</div><div class="l">Books</div></div>' +
      '<div class="stat"><div class="n">' + totalReadings + '</div><div class="l">Readings</div></div>' +
      '<div class="stat"><div class="n">' + hy5.length + '</div><div class="l">5-star high-yield</div></div>' +
      '<div class="stat"><div class="n">' + FRM.META.threads.length + '</div><div class="l">Cross-book threads</div></div>' +
      '<div class="stat"><div class="n">' + FRM.META.graph.nodes.length + '</div><div class="l">Mind-map concepts</div></div>' +
      '</div></div>';

    /* ---- course overview ---- */
    h += label("Course overview — why these 5 books exist, in this order", "var(--accent)");
    h += '<p class="prose">Books 1–4 build one risk-measurement toolkit each, in the order a bank actually needs them: ' +
      'first a general way to measure loss (Book 1: VaR/ES), then the largest single risk most banks carry (Book 2: credit), ' +
      'then the risk of the firm itself failing operationally — plus the capital framework that prices every risk type onto one balance sheet (Book 3), ' +
      'then the dimension that turns solvent firms into failed ones anyway: timing and funding (Book 4: liquidity). ' +
      'Book 5 changes seats — from the bank managing risk to the investor allocating capital — then closes with GARP’s rolling window onto today’s risks. ' +
      'Each book explicitly consumes the one(s) before it; the chips below trace that dependency chain using each book’s own "feeds forward" description.</p>';
    h += '<div class="pill-row" style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem">';
    books.forEach(function (b, i) {
      h += '<a class="chip" style="border-color:' + b.color + ';color:' + b.color + '" href="book.html?b=' + b.n + '">' + b.n + ' · ' + b.short + '</a>';
      if (i < books.length - 1) h += '<span style="color:var(--text-faint)">→</span>';
    });
    h += '</div>';
    h += '<div class="grid2" style="margin-top:1rem">';
    books.forEach(function (b) {
      h += '<div class="card" style="border-top:3px solid ' + b.color + '"><h3>' + b.n + ' · ' + b.short + '</h3>' +
        '<p style="font-size:0.88rem"><strong>Why it exists:</strong> ' + b.why + '</p>' +
        '<p style="font-size:0.88rem;color:var(--text-dim)"><strong>Feeds forward:</strong> ' + (b.feeds || "Nothing downstream — terminal book.") + '</p></div>';
    });
    h += '</div>';

    /* ---- visual learning path ---- */
    h += label("Visual learning path — read in this order", "var(--green)");
    h += '<p class="lead" style="font-size:0.92rem">Every book both needs and is needed. Skipping ahead means hitting formulas and vocabulary from a book you haven’t read yet.</p>';
    books.forEach(function (b) {
      h += '<div class="path-step"><div class="path-dot" style="background:' + b.colorSoft + ';color:' + b.color + ';border-color:' + b.color + '">' + b.n + '</div>' +
        '<div class="path-body"><h3><a href="book.html?b=' + b.n + '">' + b.title + '</a></h3><p>' + b.blurb + '</p>' +
        '<div class="path-why"><b>Needs:</b> ' + b.prereqs + '<br><b>Feeds:</b> ' + (b.feeds || "Nothing downstream — this is the terminal book.") + '</div></div></div>';
    });

    /* ---- interactive global mind map (preview) ---- */
    h += label("Global mind map — every concept, clickable", "var(--cyan)");
    h += '<p class="lead" style="font-size:0.92rem">Drag to pan, scroll to zoom, hover a node to trace its connections, click to jump to the chapter. <a href="mindmap.html">Open full-screen →</a></p>';
    h += '<div id="home-mindmap-mount"></div>';

    /* ---- big picture ---- */
    h += label("Big picture — the ideas that never go away", "var(--purple)");
    h += '<p class="lead" style="font-size:0.92rem">These threads resurface across every book. Recognizing the repeat is worth more than memorizing any one instance of it.</p>';
    h += '<div class="grid2">';
    FRM.META.threads.forEach(function (t) {
      var chips = t.nodes.map(function (nid) {
        var node = null;
        FRM.META.graph.nodes.forEach(function (n) { if (n.id === nid) node = n; });
        if (!node) return "";
        return '<a class="chip" href="' + FRM.rlink(node.r) + '">' + node.label + '</a>';
      }).join("");
      h += '<div class="card"><h3>' + t.name + '</h3><p style="font-size:0.9rem">' + t.desc + '</p><div class="pill-row">' + chips + '</div></div>';
    });
    h += '</div>';
    h += '<div class="grid2" style="margin-top:1rem">';
    h += '<div class="callout tip"><div class="callout-title">Foundation readings (' + foundations.length + ')</div>' +
      'No prerequisites within their own book — safe starting points, and the readings everything else in that book builds on: ' +
      foundations.slice(0, 8).map(function (x) { return '<a href="' + FRM.rlink(x.r.n) + '">R' + x.r.n + '</a>'; }).join(", ") + (foundations.length > 8 ? ", …" : "") + '.</div>';
    h += '<div class="callout warn"><div class="callout-title">Combination readings (' + combos.length + ')</div>' +
      'Depend on 3+ earlier readings — these are where the exam likes to combine ideas, and where confusion compounds if an earlier reading was skimmed: ' +
      combos.slice(0, 8).map(function (x) { return '<a href="' + FRM.rlink(x.r.n) + '">R' + x.r.n + '</a>'; }).join(", ") + (combos.length > 8 ? ", …" : "") + '.</div>';
    h += '</div>';

    /* ---- global high-yield ---- */
    h += label("Global high-yield — the 30 minutes before the exam", "var(--amber)");
    h += '<p class="lead" style="font-size:0.92rem">Every 5-star reading across all five books, in one list. If you only have half an hour left, this is what to reread.</p>';
    books.forEach(function (b) {
      var fives = b.readings.filter(function (r) { return r.hy === 5; });
      if (!fives.length) return;
      h += '<div class="roadmap-session"><div class="ss-title" style="color:' + b.color + '">' + b.n + ' · ' + b.short + '</div>';
      fives.forEach(function (r) {
        h += '<a class="reading-row" href="' + FRM.rlink(r.n) + '"><span class="r-num">R' + r.n + '</span>' +
          '<span class="r-title">' + r.t + '<br><span style="font-weight:400;font-size:0.82rem;color:var(--text-dim)">' + r.tag + '</span></span>' +
          '<span class="r-hy">' + "★".repeat(r.hy) + '</span></a>';
      });
      h += '</div>';
    });

    mount.innerHTML = h;
    FRM.renderMindMap(document.getElementById("home-mindmap-mount"), { compact: true });
  };

  /* =====================================================================
     WIDGETS — interactive teaching components.
     Usage in content HTML: <div class="widget" data-widget="quantile"></div>
     ===================================================================== */

  function svgEl(tag, attrs, parent) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function npdf(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }
  function ncdf(x) { /* Zelen & Severo approximation */
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = npdf(x);
    var p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x >= 0 ? 1 - p : p;
  }
  function ninv(p) { /* Beasley-Springer-Moro */
    var a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
    var b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
    var c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209, 0.0276438810333863,
      0.0038405729373609, 0.0003951896511919, 0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
    var y = p - 0.5, r, x;
    if (Math.abs(y) < 0.42) {
      r = y * y;
      x = y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) / ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
    } else {
      r = p; if (y > 0) r = 1 - p;
      r = Math.log(-Math.log(r));
      x = c[0]; for (var i = 1; i < 9; i++) x += c[i] * Math.pow(r, i);
      if (y < 0) x = -x;
    }
    return x;
  }
  FRM.math = { npdf: npdf, ncdf: ncdf, ninv: ninv };

  function widgetShell(el, title, controlsHtml, svgW, svgH, caption) {
    el.innerHTML = '<div class="w-title">' + title + '</div>' +
      (controlsHtml ? '<div class="w-controls">' + controlsHtml + "</div>" : "") +
      '<svg viewBox="0 0 ' + svgW + " " + svgH + '"></svg>' +
      (caption ? '<div class="w-caption">' + caption + "</div>" : "");
    return el.querySelector("svg");
  }

  var WIDGETS = {};

  /* --- VaR / ES on a normal curve --- */
  WIDGETS.quantile = function (el) {
    var svg = widgetShell(el, "VaR vs Expected Shortfall — drag the confidence level",
      '<label>Confidence <input type="range" min="90" max="99.5" step="0.5" value="95"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 240,
      "The line is VaR: the loss threshold. The shaded region beyond it is what ES averages. Notice ES moves deeper than VaR as confidence rises — and the gap is what fat tails widen.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function draw() {
      var c = parseFloat(slider.value) / 100;
      val.textContent = (c * 100).toFixed(1) + "%";
      var z = ninv(1 - c); /* negative */
      var es = npdf(ninv(c)) / (1 - c);
      out.textContent = "VaR = " + (-z).toFixed(2) + "σ · ES = " + es.toFixed(2) + "σ";
      svg.innerHTML = "";
      var W = 640, H = 240, x0 = 30, x1 = W - 20, y0 = H - 30;
      function X(x) { return x0 + (x + 4) / 8 * (x1 - x0); }
      function Y(p) { return y0 - p / 0.42 * (H - 60); }
      /* tail fill */
      var d2 = "M" + X(-4) + "," + Y(0);
      for (var x = -4; x <= z; x += 0.05) d2 += " L" + X(x) + "," + Y(npdf(x));
      d2 += " L" + X(z) + "," + Y(0) + " Z";
      svgEl("path", { d: d2, fill: "var(--red)", opacity: 0.35 }, svg);
      /* curve */
      var d = "";
      for (var x2 = -4; x2 <= 4; x2 += 0.05) d += (d ? " L" : "M") + X(x2) + "," + Y(npdf(x2));
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
      /* VaR line */
      svgEl("line", { x1: X(z), x2: X(z), y1: Y(0.40), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
      var t1 = svgEl("text", { x: X(z), y: Y(0.40) - 6, "text-anchor": "middle", "font-size": 12, fill: "var(--red)" }, svg);
      t1.textContent = "VaR (" + (-z).toFixed(2) + "σ)";
      /* ES marker */
      svgEl("line", { x1: X(-es), x2: X(-es), y1: Y(0.12), y2: Y(0), stroke: "var(--amber)", "stroke-width": 2 }, svg);
      var t2 = svgEl("text", { x: X(-es), y: Y(0.12) - 6, "text-anchor": "middle", "font-size": 12, fill: "var(--amber)" }, svg);
      t2.textContent = "ES (avg of tail)";
      svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t3 = svgEl("text", { x: x1 - 4, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
      t3.textContent = "P&L (σ units) →";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- age-weighted decay --- */
  WIDGETS.decay = function (el) {
    var svg = widgetShell(el, "Age-weighted historical simulation — the λ dial",
      '<label>λ (decay) <input type="range" min="0.90" max="0.999" step="0.001" value="0.98"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 200,
      "Each bar is one day's weight in the VaR calculation (most recent on the left). λ→1 flattens to plain historical simulation (all equal); small λ makes VaR react fast but forget fast. Ghost effects disappear because weights fade smoothly instead of falling off a cliff at the window edge.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function draw() {
      var lam = parseFloat(slider.value), n = 100;
      val.textContent = lam.toFixed(3);
      svg.innerHTML = "";
      var W = 640, H = 200, x0 = 30, y0 = H - 26, bw = (W - 60) / 60;
      var denom = (1 - Math.pow(lam, n)) / (1 - lam);
      var w1 = 1 / denom;
      out.textContent = "day-1 weight = " + (w1 * 100).toFixed(2) + "% · day-60 = " + (Math.pow(lam, 59) / denom * 100).toFixed(3) + "%";
      for (var i = 0; i < 60; i++) {
        var w = Math.pow(lam, i) / denom;
        var hh = Math.min(1, w / 0.05) * (H - 55);
        svgEl("rect", { x: x0 + i * bw, y: y0 - hh, width: bw - 1.5, height: hh, fill: i === 0 ? "var(--accent)" : "var(--cyan)", opacity: i === 0 ? 1 : 0.7 }, svg);
      }
      svgEl("line", { x1: x0, x2: W - 25, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t = svgEl("text", { x: x0, y: y0 + 16, "font-size": 11 }, svg);
      t.textContent = "← today · observation age · 60 days →";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- EVT threshold picker --- */
  WIDGETS.evt = function (el) {
    var svg = widgetShell(el, "Peaks-over-threshold — the u trade-off",
      '<label>Threshold u <input type="range" min="1" max="3.2" step="0.05" value="1.8"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 220,
      "Only points above the line are used to fit the Generalized Pareto tail. Raise u: the theory fits better but you starve the estimator of data. Lower u: plenty of data, but many points aren't genuinely 'extreme', so the GP approximation degrades. There is no free lunch — this bias-variance trade-off IS the exam question.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    var rnd = mulberry32(42), pts = [];
    for (var i = 0; i < 300; i++) {
      /* fat-tailed-ish losses via |t|-like draw */
      var u1 = rnd(), u2 = rnd();
      var zz = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
      var loss = Math.abs(zz) * (rnd() < 0.06 ? 2.4 : 1);
      pts.push({ x: i / 300, y: Math.min(loss, 4) });
    }
    function draw() {
      var u = parseFloat(slider.value);
      val.textContent = u.toFixed(2) + "σ";
      svg.innerHTML = "";
      var W = 640, H = 220, x0 = 34, y0 = H - 26;
      function Y(v) { return y0 - v / 4 * (H - 50); }
      var nu = 0;
      pts.forEach(function (p) {
        var above = p.y > u; if (above) nu++;
        svgEl("circle", { cx: x0 + p.x * (W - 60), cy: Y(p.y), r: above ? 3.2 : 2, fill: above ? "var(--red)" : "var(--text-faint)", opacity: above ? 0.95 : 0.4 }, svg);
      });
      svgEl("line", { x1: x0, x2: W - 25, y1: Y(u), y2: Y(u), stroke: "var(--amber)", "stroke-width": 2, "stroke-dasharray": "5 4" }, svg);
      out.textContent = "Nᵤ = " + nu + " of 300 exceedances";
      svgEl("line", { x1: x0, x2: W - 25, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
      t.textContent = "loss size (each dot = one day)";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- Basel traffic light --- */
  WIDGETS.traffic = function (el) {
    var svg = widgetShell(el, "Basel backtesting traffic lights — 250 days, 99% VaR",
      '<label>Exceptions <input type="range" min="0" max="14" step="1" value="3"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 120,
      "Expected exceptions at 99% over 250 days ≈ 2.5. Green (0–4): consistent with an accurate model. Yellow (5–9): supervisor judgment, k rises 3.40→3.85. Red (10+): automatic penalty, k = 4. A correct model still lands in yellow ~10.8% of the time — that's the Type I error regulators accept to catch bad models.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function draw() {
      var x = parseInt(slider.value, 10);
      val.textContent = x + " exceptions";
      var zone = x <= 4 ? "GREEN" : x <= 9 ? "YELLOW" : "RED";
      var k = x <= 4 ? 3.0 : x >= 10 ? 4.0 : [3.40, 3.50, 3.65, 3.75, 3.85][x - 5];
      out.textContent = zone + " zone · capital multiplier k = " + k.toFixed(2);
      svg.innerHTML = "";
      var W = 640, x0 = 30, bw = (W - 60) / 15;
      for (var i = 0; i <= 14; i++) {
        var col = i <= 4 ? "var(--green)" : i <= 9 ? "var(--amber)" : "var(--red)";
        svgEl("rect", { x: x0 + i * bw, y: 40, width: bw - 3, height: 34, rx: 5, fill: col, opacity: i === x ? 1 : 0.22 }, svg);
        var t = svgEl("text", { x: x0 + i * bw + bw / 2 - 1.5, y: 62, "text-anchor": "middle", "font-size": 12, fill: i === x ? "#fff" : "var(--text-dim)", "font-weight": i === x ? 700 : 400 }, svg);
        t.textContent = i;
      }
      var lbl = svgEl("text", { x: x0, y: 24, "font-size": 11 }, svg);
      lbl.textContent = "number of days actual loss exceeded VaR";
      var mk = svgEl("text", { x: x0 + 2.5 * bw, y: 96, "text-anchor": "middle", "font-size": 10, fill: "var(--text-faint)" }, svg);
      mk.textContent = "↑ expected ≈ 2.5";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- two-asset diversification --- */
  WIDGETS.divers = function (el) {
    var svg = widgetShell(el, "Diversification vs correlation — the only free lunch, rationed",
      '<label>ρ <input type="range" min="-1" max="1" step="0.05" value="0.6"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 210,
      "Two assets, 50/50, σ = 20% each. Portfolio volatility (and hence VaR) falls smoothly as ρ falls — the benefit does NOT appear only near ρ = −1. At ρ = 1 there is no diversification at all: σP = 20%. This one curve is behind portfolio VaR, credit portfolio tails, and factor investing alike.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function sigP(rho) { return Math.sqrt(0.25 * 0.04 + 0.25 * 0.04 + 2 * 0.25 * 0.04 * rho) * 100; }
    function draw() {
      var rho = parseFloat(slider.value);
      val.textContent = rho.toFixed(2);
      out.textContent = "σP = " + sigP(rho).toFixed(1) + "%";
      svg.innerHTML = "";
      var W = 640, H = 210, x0 = 40, y0 = H - 30;
      function X(r) { return x0 + (r + 1) / 2 * (W - 70); }
      function Y(s) { return y0 - s / 22 * (H - 60); }
      var d = "";
      for (var r = -1; r <= 1.001; r += 0.02) d += (d ? " L" : "M") + X(r) + "," + Y(sigP(r));
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2.2 }, svg);
      svgEl("circle", { cx: X(rho), cy: Y(sigP(rho)), r: 5.5, fill: "var(--amber)" }, svg);
      svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      svgEl("line", { x1: x0, x2: x0, y1: 20, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t1 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
      t1.textContent = "correlation ρ →";
      var t2 = svgEl("text", { x: x0 + 4, y: 16, "font-size": 11 }, svg);
      t2.textContent = "portfolio σ (%)";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- binomial rate tree with drift / mean reversion --- */
  WIDGETS.tree = function (el) {
    var svg = widgetShell(el, "Short-rate tree — add drift, then mean reversion",
      '<label>drift λ (bp/period) <input type="range" min="-40" max="40" step="5" value="0" data-k="lam"><span class="w-value" data-v="lam"></span></label>' +
      '<label>mean reversion k <input type="range" min="0" max="0.6" step="0.05" value="0" data-k="mr"><span class="w-value" data-v="mr"></span></label>',
      680, 260,
      "Start rate 6%, volatility 50bp/period, long-run mean θ = 5%. With k = 0 and λ = 0 you have Model 1 (symmetric, recombining). Add drift: the whole tree tilts (Model 2 / Ho-Lee). Add mean reversion: high nodes get pulled down and low nodes pulled up toward θ — the tree squeezes and no longer recombines naturally (Vasicek).");
    var sliders = el.querySelectorAll("input");
    function draw() {
      var lam = parseFloat(el.querySelector('[data-k="lam"]').value) / 100;
      var k = parseFloat(el.querySelector('[data-k="mr"]').value);
      el.querySelector('[data-v="lam"]').textContent = (lam * 100).toFixed(0) + "bp";
      el.querySelector('[data-v="mr"]').textContent = k.toFixed(2);
      svg.innerHTML = "";
      var r0 = 6, theta = 5, vol = 0.5, W = 680, H = 260;
      /* build 4 periods of paths (non-recombining if k>0) */
      var levels = [[{ r: r0, y: 0 }]];
      for (var t = 1; t <= 3; t++) {
        var prev = levels[t - 1], next = [];
        prev.forEach(function (nd) {
          var drift = lam + k * (theta - nd.r);
          next.push({ r: nd.r + drift + vol, parent: nd });
          next.push({ r: nd.r + drift - vol, parent: nd });
        });
        levels.push(next);
      }
      var minR = 3, maxR = 9;
      function Y(r) { return 230 - (r - minR) / (maxR - minR) * 200; }
      function X(t) { return 60 + t * 190; }
      /* edges */
      levels.forEach(function (lvl, t) {
        if (t === 0) return;
        lvl.forEach(function (nd) {
          svgEl("line", { x1: X(t - 1), y1: Y(nd.parent.r), x2: X(t), y2: Y(nd.r), stroke: "var(--border-strong)", "stroke-width": 1 }, svg);
        });
      });
      levels.forEach(function (lvl, t) {
        var seen = {};
        lvl.forEach(function (nd) {
          var key = nd.r.toFixed(3);
          if (seen[key]) return; seen[key] = 1;
          svgEl("circle", { cx: X(t), cy: Y(nd.r), r: 4, fill: "var(--accent)" }, svg);
          var tx = svgEl("text", { x: X(t) + 8, y: Y(nd.r) + 4, "font-size": 11, fill: "var(--text)" }, svg);
          tx.textContent = nd.r.toFixed(2) + "%";
        });
      });
      svgEl("line", { x1: 40, x2: W - 20, y1: Y(theta), y2: Y(theta), stroke: "var(--amber)", "stroke-dasharray": "4 4", opacity: 0.7 }, svg);
      var t0 = svgEl("text", { x: W - 22, y: Y(theta) - 5, "text-anchor": "end", "font-size": 10, fill: "var(--amber)" }, svg);
      t0.textContent = "θ = 5%";
    }
    sliders.forEach(function (s) { s.addEventListener("input", draw); });
    draw();
  };

  /* --- volatility smile shapes --- */
  WIDGETS.smile = function (el) {
    var svg = widgetShell(el, "Smile · skew · frown — read the market's mind",
      '<span class="seg"><button data-m="smile" class="on">FX: smile</button><button data-m="skew">Equity: skew</button><button data-m="frown">Jump: frown</button></span>' +
      '<span class="w-value" data-out></span>', 640, 220, "");
    var out = el.querySelector("[data-out]"), cap = el.querySelector(".w-caption") || (function () {
      var c = document.createElement("div"); c.className = "w-caption"; el.appendChild(c); return c;
    })();
    var mode = "smile";
    var captions = {
      smile: "Both wings priced above ATM: the market believes extreme moves in EITHER direction are more likely than lognormal admits (fat tails both sides). Classic for currencies.",
      skew: "OTM puts (low strikes) priced far above OTM calls: down-crashes are feared more than up-melts. Causes: leverage effect (falling price → higher leverage → higher vol) + crashophobia (post-1987 protection premium). Classic for equities.",
      frown: "ATM priced ABOVE the wings: an anticipated jump (earnings, ruling, merger) makes the outcome bimodal — big move likely, small move unlikely. The inverse of the smile."
    };
    function f(x) {
      if (mode === "smile") return 18 + 9 * x * x;
      if (mode === "skew") return 20 - 7 * x + 2.2 * x * x;
      return 24 - 7 * x * x;
    }
    function draw() {
      svg.innerHTML = "";
      var W = 640, H = 220, x0 = 42, y0 = H - 30;
      function X(x) { return x0 + (x + 1.6) / 3.2 * (W - 72); }
      function Y(v) { return y0 - (v - 8) / 30 * (H - 60); }
      var d = "";
      for (var x = -1.6; x <= 1.6; x += 0.04) d += (d ? " L" : "M") + X(x) + "," + Y(f(x));
      svgEl("path", { d: d, fill: "none", stroke: "var(--purple)", "stroke-width": 2.4 }, svg);
      svgEl("line", { x1: X(0), x2: X(0), y1: 18, y2: y0, stroke: "var(--border-strong)", "stroke-dasharray": "4 4" }, svg);
      svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t1 = svgEl("text", { x: X(0), y: y0 + 16, "text-anchor": "middle", "font-size": 11 }, svg);
      t1.textContent = "ATM (K/S = 1)";
      var t2 = svgEl("text", { x: x0, y: y0 + 16, "font-size": 11 }, svg);
      t2.textContent = "low strike (OTM puts)";
      var t3 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
      t3.textContent = "high strike (OTM calls)";
      var t4 = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
      t4.textContent = "implied volatility";
      cap.textContent = captions[mode];
    }
    el.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); mode = b.getAttribute("data-m"); draw();
      });
    });
    draw();
  };

  /* --- counterparty exposure profiles --- */
  WIDGETS.exposure = function (el) {
    var svg = widgetShell(el, "Exposure profiles by product — shape is the answer",
      '<span class="seg"><button data-m="swap" class="on">IR swap</button><button data-m="fx">FX forward</button><button data-m="xccy">Cross-ccy swap</button><button data-m="opt">Long option</button></span>',
      640, 220, "");
    var cap = document.createElement("div"); cap.className = "w-caption"; el.appendChild(cap);
    var mode = "swap";
    var captions = {
      swap: "Interest-rate swap: two forces fight. Diffusion (more time = more rate drift) pushes exposure UP; amortization (fewer remaining payments) pulls it DOWN. Result: hump peaking around 1/3–1/2 of maturity, then decay to zero.",
      fx: "FX forward: one exchange at maturity, so nothing amortizes — diffusion wins the whole way. Exposure grows monotonically (≈ √t) and peaks AT maturity.",
      xccy: "Cross-currency swap: periodic coupons + a large notional exchange at the end. Looks like a swap early but keeps climbing — the final FX notional exchange dominates. Highest of the profiles shown.",
      opt: "Long option (premium paid upfront): you have no obligation left, only a claim. Exposure = current option value, always ≥ 0, growing with time value/moneyness — and never a liability, so no negative exposure."
    };
    function f(t, m) {
      if (m === "swap") return Math.sqrt(t) * (1 - t) * 2.4;
      if (m === "fx") return Math.sqrt(t) * 1.3;
      if (m === "xccy") return Math.sqrt(t) * (1 - 0.35 * t) * 2.1;
      return 0.5 + Math.sqrt(t) * 0.85;
    }
    function draw() {
      svg.innerHTML = "";
      var W = 640, H = 220, x0 = 42, y0 = H - 30;
      function X(t) { return x0 + t * (W - 72); }
      function Y(v) { return y0 - v / 1.7 * (H - 60); }
      ["swap", "fx", "xccy", "opt"].forEach(function (m) {
        if (m === mode) return;
        var d = "";
        for (var t = 0.001; t <= 1; t += 0.01) d += (d ? " L" : "M") + X(t) + "," + Y(f(t, m));
        svgEl("path", { d: d, fill: "none", stroke: "var(--text-faint)", "stroke-width": 1, opacity: 0.35 }, svg);
      });
      var d2 = "";
      for (var t2 = 0.001; t2 <= 1; t2 += 0.01) d2 += (d2 ? " L" : "M") + X(t2) + "," + Y(f(t2, mode));
      svgEl("path", { d: d2, fill: "none", stroke: "var(--green)", "stroke-width": 2.6 }, svg);
      svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t3 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
      t3.textContent = "time → maturity";
      var t4 = svgEl("text", { x: x0, y: 16, "font-size": 11 }, svg);
      t4.textContent = "expected exposure";
      cap.textContent = captions[mode];
    }
    el.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); mode = b.getAttribute("data-m"); draw();
      });
    });
    draw();
  };

  /* --- tranche losses vs default correlation (large-pool Vasicek) --- */
  WIDGETS.tranche = function (el) {
    var svg = widgetShell(el, "Who eats the losses? Correlation reshapes the tranche stack",
      '<label>default correlation ρ <input type="range" min="0.01" max="0.9" step="0.01" value="0.15"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 230,
      "Large homogeneous pool, PD = 5%, LGD = 100%. Low ρ: losses cluster tightly near expected loss — equity is toast, senior is bulletproof. High ρ: the distribution grows a fat right tail AND more mass near zero — senior tranches start dying (systemic scenarios), while equity's expected loss actually falls (many scenarios now have almost no defaults). Correlation moves value BETWEEN tranches; it barely changes total pool loss.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function draw() {
      var rho = parseFloat(slider.value), pd = 0.05;
      val.textContent = rho.toFixed(2);
      svg.innerHTML = "";
      var W = 640, H = 230, x0 = 42, y0 = H - 42;
      function X(l) { return x0 + l * (W - 72); }
      /* density of large-pool loss via derivative approx on grid */
      var grid = [], maxd = 0;
      var prev = 0;
      for (var i = 1; i <= 200; i++) {
        var L = i / 200 * 0.4; /* show 0..40% loss */
        var cdf = ncdf((Math.sqrt(1 - rho) * ninv(Math.min(L, 0.9999)) - ninv(pd)) / Math.sqrt(rho));
        var dens = Math.max(0, cdf - prev); prev = cdf;
        grid.push({ L: L, d: dens }); if (dens > maxd) maxd = dens;
      }
      function Y(d) { return y0 - Math.pow(d / maxd, 0.5) * (H - 78); }
      /* tranche bands: equity 0-5%, mezz 5-15%, senior 15%+ */
      svgEl("rect", { x: X(0), y: 18, width: X(0.05) - X(0), height: y0 - 18, fill: "var(--red)", opacity: 0.10 }, svg);
      svgEl("rect", { x: X(0.05), y: 18, width: X(0.15) - X(0.05), height: y0 - 18, fill: "var(--amber)", opacity: 0.10 }, svg);
      svgEl("rect", { x: X(0.15), y: 18, width: X(0.4) - X(0.15), height: y0 - 18, fill: "var(--green)", opacity: 0.10 }, svg);
      var d = "";
      grid.forEach(function (g) { d += (d ? " L" : "M") + X(g.L) + "," + Y(g.d); });
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2.2 }, svg);
      var labels = [["equity 0–5%", 0.025, "var(--red)"], ["mezzanine 5–15%", 0.10, "var(--amber)"], ["senior 15%+", 0.27, "var(--green)"]];
      labels.forEach(function (l) {
        var t = svgEl("text", { x: X(l[1]), y: y0 + 16, "text-anchor": "middle", "font-size": 11, fill: l[2] }, svg);
        t.textContent = l[0];
      });
      /* P(senior hit) */
      var pSen = 1 - ncdf((Math.sqrt(1 - rho) * ninv(0.15) - ninv(pd)) / Math.sqrt(rho));
      out.textContent = "P(pool loss > 15%) = " + (pSen * 100).toFixed(2) + "%";
      var t5 = svgEl("text", { x: x0, y: 14, "font-size": 11 }, svg);
      t5.textContent = "probability density of pool loss";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- liquidity-adjusted VaR --- */
  WIDGETS.lvar = function (el) {
    var svg = widgetShell(el, "Liquidity-adjusted VaR — the spread tax on exit",
      '<label>bid-ask spread <input type="range" min="0" max="4" step="0.1" value="1"><span class="w-value"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 130,
      "VaR assumes you can exit at mid. Reality: you sell at the bid. The constant-spread add-on is ½ × spread × position value — trivial for liquid large caps (spread ≈ 0.05%), dominant for distressed credit (spread can exceed the VaR itself). Exogenous spread = market-wide; if YOUR size moves the price, that's endogenous liquidity and needs the elasticity approach instead.");
    var slider = el.querySelector("input"), val = el.querySelector(".w-value"), out = el.querySelector("[data-out]");
    function draw() {
      var s = parseFloat(slider.value); /* % */
      val.textContent = s.toFixed(1) + "%";
      var varBase = 3.3, lc = 0.5 * s;
      out.textContent = "LVaR = VaR + LC = " + varBase.toFixed(1) + "% + " + lc.toFixed(2) + "% = " + (varBase + lc).toFixed(2) + "%";
      svg.innerHTML = "";
      var W = 640, x0 = 40, bh = 34, y = 40;
      var scale = (W - 80) / 6;
      svgEl("rect", { x: x0, y: y, width: varBase * scale, height: bh, rx: 6, fill: "var(--accent)", opacity: 0.8 }, svg);
      svgEl("rect", { x: x0 + varBase * scale, y: y, width: lc * scale, height: bh, rx: 6, fill: "var(--red)", opacity: 0.85 }, svg);
      var t1 = svgEl("text", { x: x0 + varBase * scale / 2, y: y + 21, "text-anchor": "middle", "font-size": 12, fill: "#fff" }, svg);
      t1.textContent = "market VaR";
      if (lc > 0.3) {
        var t2 = svgEl("text", { x: x0 + (varBase + lc / 2) * scale, y: y + 21, "text-anchor": "middle", "font-size": 11, fill: "#fff" }, svg);
        t2.textContent = "+LC";
      }
    }
    slider.addEventListener("input", draw);
    draw();
  };

  /* --- ALM repricing gap --- */
  WIDGETS.gap = function (el) {
    var svg = widgetShell(el, "Repricing gap — which way does the income bet point?",
      '<label>Δ rates <input type="range" min="-3" max="3" step="0.25" value="1" data-k="dr"><span class="w-value" data-v="dr"></span></label>' +
      '<label>GAP (RSA − RSL, $M) <input type="range" min="-200" max="200" step="10" value="-100" data-k="gap"><span class="w-value" data-v="gap"></span></label>' +
      '<span class="w-value" data-out></span>', 640, 120,
      "ΔNII ≈ GAP × Δr. Negative gap (more rate-sensitive liabilities than assets — the classic bank) profits when rates FALL and bleeds when rates rise. Positive gap is the mirror image. Note this is the near-term income effect only; the economic-value effect works through duration gap and can point the opposite way.");
    var out = el.querySelector("[data-out]");
    function draw() {
      var dr = parseFloat(el.querySelector('[data-k="dr"]').value);
      var gap = parseFloat(el.querySelector('[data-k="gap"]').value);
      el.querySelector('[data-v="dr"]').textContent = (dr > 0 ? "+" : "") + dr.toFixed(2) + "%";
      el.querySelector('[data-v="gap"]').textContent = (gap > 0 ? "+" : "") + gap + "M";
      var dnii = gap * dr / 100;
      out.textContent = "ΔNII ≈ " + (dnii >= 0 ? "+$" : "−$") + Math.abs(dnii).toFixed(2) + "M";
      svg.innerHTML = "";
      var W = 640, cx = W / 2, y = 46, bh = 30;
      var w = Math.min(240, Math.abs(dnii) * 120);
      svgEl("line", { x1: cx, x2: cx, y1: 24, y2: y + bh + 8, stroke: "var(--border-strong)" }, svg);
      svgEl("rect", { x: dnii >= 0 ? cx : cx - w, y: y, width: Math.max(w, 1), height: bh, rx: 6, fill: dnii >= 0 ? "var(--green)" : "var(--red)", opacity: 0.85 }, svg);
      var t = svgEl("text", { x: cx, y: 18, "text-anchor": "middle", "font-size": 11 }, svg);
      t.textContent = "net interest income impact";
    }
    el.querySelectorAll("input").forEach(function (s) { s.addEventListener("input", draw); });
    draw();
  };

  /* --- security market line vs low-risk anomaly --- */
  WIDGETS.sml = function (el) {
    var svg = widgetShell(el, "The low-risk anomaly — CAPM's line vs reality",
      '<span class="seg"><button data-m="capm" class="on">CAPM says</button><button data-m="real">Data says</button></span>',
      640, 220, "");
    var cap = document.createElement("div"); cap.className = "w-caption"; el.appendChild(cap);
    var mode = "capm";
    var captions = {
      capm: "CAPM: expected return rises linearly with β. Take more market risk, earn more — the security market line.",
      real: "Empirically the line is nearly FLAT (even downward at the top): high-β stocks earn little more — sometimes less — than low-β stocks, and low-β stocks earn far more than CAPM predicts. Candidate causes: leverage constraints (investors who can't lever buy high-β instead, overpricing it), benchmark-hugging institutions, lottery preferences."
    };
    function draw() {
      svg.innerHTML = "";
      var W = 640, H = 220, x0 = 46, y0 = H - 34;
      function X(b) { return x0 + b / 2 * (W - 80); }
      function Y(r) { return y0 - r / 14 * (H - 66); }
      svgEl("line", { x1: x0, x2: W - 30, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      svgEl("line", { x1: x0, x2: x0, y1: 18, y2: y0, stroke: "var(--border-strong)" }, svg);
      /* CAPM line */
      svgEl("line", { x1: X(0), y1: Y(3), x2: X(2), y2: Y(13), stroke: "var(--text-faint)", "stroke-width": 1.4, "stroke-dasharray": mode === "capm" ? "" : "5 4" }, svg);
      if (mode === "real") {
        var d = "M" + X(0.2) + "," + Y(5.6);
        [[0.5, 7.0], [0.8, 7.8], [1.0, 8.1], [1.3, 8.3], [1.6, 8.2], [1.9, 7.6]].forEach(function (p) { d += " L" + X(p[0]) + "," + Y(p[1]); });
        svgEl("path", { d: d, fill: "none", stroke: "var(--purple)", "stroke-width": 2.6 }, svg);
        var rnd2 = mulberry32(7);
        [[0.3, 6.4], [0.55, 7.4], [0.75, 7.5], [0.95, 8.4], [1.15, 8.0], [1.35, 8.6], [1.55, 7.9], [1.75, 8.0], [1.95, 7.2]].forEach(function (p) {
          svgEl("circle", { cx: X(p[0]), cy: Y(p[1] + (rnd2() - 0.5)), r: 3, fill: "var(--purple)", opacity: 0.55 }, svg);
        });
      }
      var t1 = svgEl("text", { x: W - 30, y: y0 + 16, "text-anchor": "end", "font-size": 11 }, svg);
      t1.textContent = "beta →";
      var t2 = svgEl("text", { x: x0 + 4, y: 14, "font-size": 11 }, svg);
      t2.textContent = "average return (%)";
      cap.textContent = captions[mode];
    }
    el.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        el.querySelectorAll(".seg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); mode = b.getAttribute("data-m"); draw();
      });
    });
    draw();
  };

  /* --- generic bar comparison, data via data-bars JSON --- */
  WIDGETS.bars = function (el) {
    var data;
    try { data = JSON.parse(el.getAttribute("data-bars")); } catch (e) { return; }
    var svg = widgetShell(el, el.getAttribute("data-title") || "", "", 640, 40 + data.items.length * 38, el.getAttribute("data-caption") || "");
    var maxv = 0;
    data.items.forEach(function (it) { if (it.v > maxv) maxv = it.v; });
    var y = 14;
    data.items.forEach(function (it) {
      var w = it.v / maxv * 380;
      svgEl("rect", { x: 200, y: y, width: w, height: 24, rx: 5, fill: it.c || "var(--accent)", opacity: 0.85 }, svg);
      var t = svgEl("text", { x: 194, y: y + 16, "text-anchor": "end", "font-size": 11.5 }, svg);
      t.textContent = it.l;
      var t2 = svgEl("text", { x: 206 + w, y: y + 16, "font-size": 11.5, fill: "var(--text)" }, svg);
      t2.textContent = it.d || it.v;
      y += 38;
    });
  };

  /* --- Merton structural model: distance to default & PD (r25) --- */
  WIDGETS.merton = function (el) {
    var svg = widgetShell(el, "Merton model — distance to default & PD",
      '<label>Asset volatility σ<sub>A</sub> <input type="range" min="0.08" max="0.60" step="0.01" value="0.25"><span class="w-value" data-vol></span></label>' +
      '<label>Leverage D/V<sub>0</sub> <input type="range" min="0.30" max="0.97" step="0.01" value="0.70"><span class="w-value" data-lev></span></label>' +
      '<span class="w-value" data-out></span>', 640, 250,
      "Terminal asset value is lognormal; the firm defaults if it lands left of the debt threshold ln(D/V₀). Distance to default (DD) is how many standard deviations the mean sits above that threshold; PD = N(−DD) is the shaded tail. Raise volatility or leverage and watch the threshold slide into the distribution — PD climbs non-linearly.");
    var sliders = el.querySelectorAll("input"), volS = sliders[0], levS = sliders[1];
    var volO = el.querySelector("[data-vol]"), levO = el.querySelector("[data-lev]"), out = el.querySelector("[data-out]");
    function draw() {
      var sig = parseFloat(volS.value), L = parseFloat(levS.value), T = 1;
      volO.textContent = (sig * 100).toFixed(0) + "%";
      levO.textContent = L.toFixed(2);
      var s = sig * Math.sqrt(T), m = -0.5 * sig * sig * T;   // mean/sd of ln(V_T/V0), μ=0
      var xd = Math.log(L);                                   // default threshold (log space)
      var DD = (-Math.log(L) - 0.5 * sig * sig * T) / s;
      var PD = ncdf(-DD);
      out.textContent = "DD = " + DD.toFixed(2) + " · PD = " + (PD * 100).toFixed(PD < 0.01 ? 2 : 1) + "%";
      svg.innerHTML = "";
      var W = 640, H = 250, x0 = 20, x1 = W - 16, y0 = H - 30;
      var lo = Math.min(m - 4 * s, xd - 0.06), hi = m + 4 * s;
      function X(x) { return x0 + (x - lo) / (hi - lo) * (x1 - x0); }
      var pmax = npdf(0) / s;
      function Y(p) { return y0 - p / pmax * (H - 74); }
      function pdf(x) { return npdf((x - m) / s) / s; }
      /* default-region fill (x <= xd) */
      var df = "M" + X(lo) + "," + Y(0);
      for (var x = lo; x <= xd; x += (hi - lo) / 400) df += " L" + X(x) + "," + Y(pdf(x));
      df += " L" + X(xd) + "," + Y(0) + " Z";
      svgEl("path", { d: df, fill: "var(--red)", opacity: 0.4 }, svg);
      /* curve */
      var d = "";
      for (var x2 = lo; x2 <= hi; x2 += (hi - lo) / 400) d += (d ? " L" : "M") + X(x2) + "," + Y(pdf(x2));
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
      /* threshold line */
      svgEl("line", { x1: X(xd), x2: X(xd), y1: Y(pmax * 1.02), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
      var t1 = svgEl("text", { x: X(xd), y: Y(pmax * 1.02) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--red)" }, svg);
      t1.textContent = "default point ln(D/V₀)";
      /* mean line + DD bracket */
      svgEl("line", { x1: X(m), x2: X(m), y1: Y(pmax), y2: Y(0), stroke: "var(--cyan)", "stroke-width": 1.5, "stroke-dasharray": "2 2" }, svg);
      var t2 = svgEl("text", { x: X(m), y: Y(pmax) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--cyan)" }, svg);
      t2.textContent = "E[ln V]";
      svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var t3 = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg);
      t3.textContent = "ln(V_T / V₀) →";
    }
    volS.addEventListener("input", draw);
    levS.addEventListener("input", draw);
    draw();
  };

  /* --- Credit VaR: expected vs unexpected loss on the Vasicek loss distribution (r26) --- */
  WIDGETS.creditvar = function (el) {
    var svg = widgetShell(el, "Credit VaR — expected vs unexpected loss",
      '<label>PD <input type="range" min="0.005" max="0.10" step="0.005" value="0.02"><span class="w-value" data-pd></span></label>' +
      '<label>Correlation ρ <input type="range" min="0.04" max="0.40" step="0.01" value="0.15"><span class="w-value" data-rho></span></label>' +
      '<label>Confidence <input type="range" min="0.99" max="0.9995" step="0.0005" value="0.999"><span class="w-value" data-conf></span></label>' +
      '<span class="w-value" data-out></span>', 640, 250,
      "The portfolio loss distribution is right-skewed (Vasicek). Expected loss (EL) is the mean — priced in, covered by provisions. Credit VaR is the high quantile; the gap between it and EL is Unexpected Loss, the economic capital a bank must hold. Raise correlation ρ and the tail fattens dramatically — same EL, far more capital.");
    var sl = el.querySelectorAll("input"), pdS = sl[0], rhoS = sl[1], cfS = sl[2];
    var pdO = el.querySelector("[data-pd]"), rhoO = el.querySelector("[data-rho]"), cfO = el.querySelector("[data-conf]"), out = el.querySelector("[data-out]");
    function draw() {
      var pd = parseFloat(pdS.value), rho = parseFloat(rhoS.value), conf = parseFloat(cfS.value);
      pdO.textContent = (pd * 100).toFixed(1) + "%"; rhoO.textContent = rho.toFixed(2); cfO.textContent = (conf * 100).toFixed(2) + "%";
      var b = ninv(pd);
      var wcdr = ncdf((b + Math.sqrt(rho) * ninv(conf)) / Math.sqrt(1 - rho));
      out.textContent = "EL = " + (pd * 100).toFixed(1) + "% · CreditVaR = " + (wcdr * 100).toFixed(1) + "% · UL = " + ((wcdr - pd) * 100).toFixed(1) + "%";
      function f(x) { if (x <= 0 || x >= 1) return 0; var a = ninv(x); return Math.sqrt((1 - rho) / rho) * Math.exp(0.5 * (a * a - Math.pow(Math.sqrt(1 - rho) * a - b, 2) / rho)); }
      svg.innerHTML = "";
      var W = 640, H = 250, x0 = 20, x1 = W - 16, y0 = H - 30;
      var xmax = Math.min(0.9995, Math.max(wcdr * 1.25, pd * 5));
      function X(x) { return x0 + x / xmax * (x1 - x0); }
      var fmax = 0, N = 500, i, xx;
      for (i = 1; i < N; i++) { xx = i / N * xmax; fmax = Math.max(fmax, f(xx)); }
      function Y(p) { return y0 - Math.min(p, fmax) / fmax * (H - 74); }
      function region(a2, bb, fill, op) { var d = "M" + X(a2) + "," + Y(0); for (var x = a2; x <= bb; x += xmax / N) d += " L" + X(x) + "," + Y(f(x)); d += " L" + X(bb) + "," + Y(0) + " Z"; svgEl("path", { d: d, fill: fill, opacity: op }, svg); }
      region(pd, wcdr, "var(--amber)", 0.35);        // unexpected loss / economic capital
      region(wcdr, xmax, "var(--red)", 0.35);         // stress tail beyond Credit VaR
      var d = "";
      for (i = 1; i <= N; i++) { xx = i / N * xmax; d += (d ? " L" : "M") + X(xx) + "," + Y(f(xx)); }
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
      svgEl("line", { x1: X(pd), x2: X(pd), y1: Y(fmax), y2: Y(0), stroke: "var(--green)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
      var tEL = svgEl("text", { x: X(pd), y: Y(fmax) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--green)" }, svg); tEL.textContent = "EL";
      svgEl("line", { x1: X(wcdr), x2: X(wcdr), y1: Y(fmax * 0.75), y2: Y(0), stroke: "var(--red)", "stroke-width": 2 }, svg);
      var tV = svgEl("text", { x: X(wcdr), y: Y(fmax * 0.75) - 4, "text-anchor": "middle", "font-size": 11.5, fill: "var(--red)" }, svg); tV.textContent = "Credit VaR";
      svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var tx = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg); tx.textContent = "portfolio loss rate →";
    }
    pdS.addEventListener("input", draw); rhoS.addEventListener("input", draw); cfS.addEventListener("input", draw);
    draw();
  };

  /* --- FRTB: VaR(99%) vs ES(97.5%) + liquidity-horizon scaling (r16) --- */
  WIDGETS.frtb = function (el) {
    var svg = widgetShell(el, "FRTB — why ES(97.5%) replaced VaR(99%)",
      '<label>Liquidity horizon <input type="range" min="0" max="4" step="1" value="0"><span class="w-value" data-lh></span></label>' +
      '<span class="w-value" data-out></span>', 640, 250,
      "Under a normal distribution ES(97.5%) ≈ 2.34σ lands almost exactly on VaR(99%) = 2.33σ — that is why the Basel Committee chose 97.5%. But ES averages the whole tail beyond the 97.5% point (shaded), so it still rises when tails are fat, where VaR is blind. FRTB then scales each risk factor by its liquidity horizon: charge ∝ √(LH/10 days).");
    var slider = el.querySelector("input"), lhO = el.querySelector("[data-lh]"), out = el.querySelector("[data-out]");
    var LHS = [10, 20, 40, 60, 120];
    function draw() {
      var lh = LHS[parseInt(slider.value, 10)];
      lhO.textContent = lh + " days";
      var zVaR = ninv(0.99);                 // 2.326
      var esFactor = npdf(ninv(0.975)) / 0.025; // 2.337
      var scale = Math.sqrt(lh / 10);
      out.textContent = "VaR(99%)=" + zVaR.toFixed(2) + "σ · ES(97.5%)=" + esFactor.toFixed(2) + "σ · LH-scaled ES=" + (esFactor * scale).toFixed(2) + "σ";
      svg.innerHTML = "";
      var W = 640, H = 250, x0 = 24, x1 = W - 16, y0 = H - 30;
      function X(x) { return x0 + (x + 4) / 8 * (x1 - x0); }
      function Y(p) { return y0 - p / 0.42 * (H - 78); }
      var q975 = ninv(0.975);
      /* tail beyond 97.5% (what ES averages) */
      var df = "M" + X(q975) + "," + Y(0);
      for (var x = q975; x <= 4; x += 0.04) df += " L" + X(x) + "," + Y(npdf(x));
      df += " L" + X(4) + "," + Y(0) + " Z";
      svgEl("path", { d: df, fill: "var(--amber)", opacity: 0.4 }, svg);
      var d = "";
      for (var x2 = -4; x2 <= 4; x2 += 0.04) d += (d ? " L" : "M") + X(x2) + "," + Y(npdf(x2));
      svgEl("path", { d: d, fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
      /* VaR 99% line */
      svgEl("line", { x1: X(zVaR), x2: X(zVaR), y1: Y(0.30), y2: Y(0), stroke: "var(--red)", "stroke-width": 2, "stroke-dasharray": "4 3" }, svg);
      var t1 = svgEl("text", { x: X(zVaR), y: Y(0.30) - 4, "text-anchor": "end", "font-size": 11, fill: "var(--red)" }, svg); t1.textContent = "VaR 99%";
      /* ES 97.5% line (avg of amber tail) */
      svgEl("line", { x1: X(esFactor), x2: X(esFactor), y1: Y(0.19), y2: Y(0), stroke: "var(--amber)", "stroke-width": 2 }, svg);
      var t2 = svgEl("text", { x: X(esFactor), y: Y(0.19) - 4, "text-anchor": "start", "font-size": 11, fill: "var(--amber)" }, svg); t2.textContent = "ES 97.5%";
      /* LH-scaled ES line */
      var sc = esFactor * scale;
      if (sc <= 3.98) {
        svgEl("line", { x1: X(sc), x2: X(sc), y1: Y(0.09), y2: Y(0), stroke: "var(--purple)", "stroke-width": 2 }, svg);
        var t3 = svgEl("text", { x: X(sc), y: Y(0.09) - 4, "text-anchor": "middle", "font-size": 11, fill: "var(--purple)" }, svg); t3.textContent = "LH-scaled";
      }
      svgEl("line", { x1: x0, x2: x1, y1: y0, y2: y0, stroke: "var(--border-strong)" }, svg);
      var tx = svgEl("text", { x: x1 - 4, y: y0 + 17, "text-anchor": "end", "font-size": 11 }, svg); tx.textContent = "loss (σ units) →";
    }
    slider.addEventListener("input", draw);
    draw();
  };

  FRM.initWidgets = function (root) {
    root.querySelectorAll("[data-widget]").forEach(function (el) {
      var fn = WIDGETS[el.getAttribute("data-widget")];
      if (fn) { try { fn(el); } catch (e) { el.innerHTML = "<em>widget failed: " + esc(e.message) + "</em>"; } }
    });
  };
  FRM.WIDGETS = WIDGETS;
  /* Expose widget helpers so external per-book widget files (assets/widgets-bookN.js)
     can register into FRM.WIDGETS using the same house conventions. */
  FRM.widgetHelpers = {
    svgEl: svgEl,
    shell: widgetShell,
    rng: mulberry32,
    npdf: npdf,
    ncdf: ncdf,
    ninv: ninv,
    esc: esc
  };
})();
