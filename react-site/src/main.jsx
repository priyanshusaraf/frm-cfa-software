import React, { Suspense, lazy, useEffect, useState } from "react";
import { Minimize2 } from "lucide-react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles/tailwind.css";
import "./styles/style.css";
import "./widgets/all.js";
import Nav from "./components/Nav.jsx";
import ReturnToReading from "./components/ReturnToReading.jsx";
import StudyNudge, { showNudge } from "./components/StudyNudge.jsx";
import PomodoroPill from "./components/PomodoroPill.jsx";
import QuickNotes from "./components/QuickNotes.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import FontScaleSync from "./components/FontScaleSync.jsx";
import { useFullscreen, toggleFullscreen, setFullscreen } from "./lib/fullscreen.js";
import { setPhaseEndHandler, phaseLabel, FOCUS } from "./lib/pomodoro.js";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Chapter from "./pages/Chapter.jsx";

/* Secondary pages are code-split: PdfView alone keeps pdfjs-dist out of the
   main bundle; the rest are small but load-on-demand costs nothing. */
const MindMap = lazy(() => import("./pages/MindMap.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Revision = lazy(() => import("./pages/Revision.jsx"));
const NotesPage = lazy(() => import("./pages/NotesPage.jsx"));
const PdfView = lazy(() => import("./pages/PdfView.jsx"));
const ProgressPage = lazy(() => import("./pages/ProgressPage.jsx"));
const Formulas = lazy(() => import("./pages/Formulas.jsx"));
const Review = lazy(() => import("./pages/Review.jsx"));
const Glossary = lazy(() => import("./pages/Glossary.jsx"));
const Planner = lazy(() => import("./pages/Planner.jsx"));
const Drills = lazy(() => import("./pages/Drills.jsx"));
const Highlights = lazy(() => import("./pages/Highlights.jsx"));
const MockExam = lazy(() => import("./pages/MockExam.jsx"));
const Bookmarks = lazy(() => import("./pages/Bookmarks.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const ConceptsIndex = lazy(() => import("./pages/ConceptsIndex.jsx"));
const ConceptPage = lazy(() => import("./pages/ConceptPage.jsx"));
const BlockReview = lazy(() => import("./pages/BlockReview.jsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.jsx"));
const Consistency = lazy(() => import("./pages/Consistency.jsx"));
const Pomodoro = lazy(() => import("./pages/Pomodoro.jsx"));

function PageLoading() {
  return (
    <main className="page">
      <p style={{ color: "var(--text-faint)", fontSize: "0.9rem", padding: "2rem 0" }}>Loading…</p>
    </main>
  );
}

/* Fullscreen is app-wide: the `f` shortcut is registered here rather than per-page,
   and the exit chip stands in for the nav button while the nav is hidden.
   The nav is no longer unmounted in fullscreen — it hides off-screen and peeks on
   hover (or focus, for keyboard users), so split/dock/zoom stay reachable without
   leaving the mode. `menuOpen` exists because Radix renders the Study popover in a
   PORTAL outside .nav-peek: hover and :focus-within both go false the moment it
   opens, and the nav would slide away under its own open menu. A CSS
   `:has([data-radix-popper-content-wrapper])` rule would fix that case and wrongly
   pin the nav open for every other popover in the app (concept hover cards). */
function Shell() {
  const fullscreen = useFullscreen();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navPinned, setNavPinned] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "f" && e.key !== "F") return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      toggleFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Leaving fullscreen must not strand a pinned nav in the normal layout.
  useEffect(() => { if (!fullscreen) setNavPinned(false); }, [fullscreen]);

  /* A finished Pomodoro phase surfaces as a nudge toast, not a browser
     notification: no permission prompt, and it keeps the "never blocks the
     page" rule the toast was built around. Registered once, app-wide, because
     the timer keeps running after you navigate away from /pomodoro. */
  useEffect(() => {
    setPhaseEndHandler((ended, next) => {
      showNudge(
        ended === FOCUS
          ? {
              id: "pomo-focus-done",
              prop: "water",
              text: phaseLabel(next) + " time. Stand up, get some water, look away from the screen.",
            }
          : {
              id: "pomo-break-done",
              prop: "focus",
              text: "Break is over. One more focus block, you have got this.",
            }
      );
    });
    return () => setPhaseEndHandler(null);
  }, []);

  return (
    <>
      {fullscreen ? (
        <>
          <div className="nav-peek-trigger" aria-hidden="true" />
          {/* A CLICKABLE handle, not just the hover strip. Hovering an invisible
              band at the very top of the screen is unreliable in native
              fullscreen (the browser's own toolbar auto-reveals there and eats
              the pointer), so the nav needs a control that cannot silently fail.
              Pinned open via navPinned; hover still works as a shortcut. */}
          <button
            type="button"
            className="nav-peek-handle"
            aria-expanded={navPinned}
            aria-label={navPinned ? "Hide menu" : "Show menu"}
            onClick={() => setNavPinned((v) => !v)}
          >
            {navPinned ? "▲" : "▼"} Menu
          </button>
          <div className="nav-peek" data-open={menuOpen || navPinned ? "1" : undefined}>
            <Nav onMenuOpenChange={setMenuOpen} />
          </div>
        </>
      ) : (
        <Nav />
      )}
      {!fullscreen && <ReturnToReading />}
      <StudyNudge />
      <PomodoroPill />
      {fullscreen && (
        <button
          type="button"
          className="fs-exit"
          onClick={() => setFullscreen(false)}
          title="Exit fullscreen (f or Esc)"
          aria-label="Exit fullscreen"
        >
          <Minimize2 size={13} /> Exit
        </button>
      )}
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bn" element={<Book />} />
          <Route path="/chapter/:rn" element={<Chapter />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/search" element={<Search />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/pdf/:bn" element={<PdfView />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/formulas" element={<Formulas />} />
          <Route path="/review" element={<Review />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/drills" element={<Drills />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/mock" element={<MockExam />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/concepts" element={<ConceptsIndex />} />
          <Route path="/concept/:slug" element={<ConceptPage />} />
          <Route path="/block-review/:blockId" element={<BlockReview />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/consistency" element={<Consistency />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <QuickNotes />
      <CommandPalette />
      <FontScaleSync />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Shell />
    </HashRouter>
  </React.StrictMode>
);
