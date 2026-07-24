import React, { Suspense, lazy, useEffect } from "react";
import { Minimize2 } from "lucide-react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles/tailwind.css";
import "./styles/style.css";
import "./widgets/all.js";
import Nav from "./components/Nav.jsx";
import QuickNotes from "./components/QuickNotes.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import FontScaleSync from "./components/FontScaleSync.jsx";
import { useFullscreen, toggleFullscreen, setFullscreen } from "./lib/fullscreen.js";
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

function PageLoading() {
  return (
    <main className="page">
      <p style={{ color: "var(--text-faint)", fontSize: "0.9rem", padding: "2rem 0" }}>Loading…</p>
    </main>
  );
}

/* Fullscreen is app-wide: the `f` shortcut is registered here rather than per-page,
   and the exit chip stands in for the nav button while the nav is hidden. */
function Shell() {
  const fullscreen = useFullscreen();

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

  return (
    <>
      {!fullscreen && <Nav />}
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
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/concepts" element={<ConceptsIndex />} />
          <Route path="/concept/:slug" element={<ConceptPage />} />
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
