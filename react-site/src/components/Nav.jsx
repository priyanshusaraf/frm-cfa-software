import { forwardRef, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Waypoints,
  Search,
  RotateCcw,
  ListChecks,
  Sigma,
  BarChart3,
  StickyNote,
  Moon,
  SunMedium,
  ChevronDown,
  Command as CommandIcon,
  CalendarDays,
  Calculator,
  BookA,
  Highlighter,
  Bookmark,
  Timer,
  Settings as SettingsIcon,
} from "lucide-react";
import { META } from "../lib/meta.js";
import { useStore } from "../lib/store.js";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover.jsx";

const STUDY_ITEMS = [
  ["/planner", "Study planner", CalendarDays],
  ["/mock", "Mock exam", Timer],
  ["/revision", "Revision", RotateCcw],
  ["/review", "Review queue", ListChecks],
  ["/drills", "Calculation drills", Calculator],
  ["/formulas", "Formula sheet", Sigma],
  ["/glossary", "Glossary", BookA],
  ["/progress", "Progress", BarChart3],
  ["/notes", "Notes", StickyNote],
  ["/highlights", "Highlights", Highlighter],
  ["/bookmarks", "Bookmarks", Bookmark],
  ["/settings", "Settings", SettingsIcon],
];

function openPalette() {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function toggleTheme() {
  const next = currentTheme() === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("frm-theme", next); } catch (e) {}
  return next;
}

/* Plain `<button>` inside .topnav picks up a generic style.css rule (border/padding/
   font-size) that beats single-class Tailwind utilities on specificity. Using a
   role="button" span sidesteps that cascade fight entirely. */
const NavButton = forwardRef(function NavButton({ className, onClick, children, ...rest }, ref) {
  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick && onClick(e); }
  }
  return (
    <span ref={ref} role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown} className={className} {...rest}>
      {children}
    </span>
  );
});

export default function Nav() {
  const location = useLocation();
  const [theme, setTheme] = useState(currentTheme);
  const [studyOpen, setStudyOpen] = useState(false);
  const done = useStore((s) => s.done);
  const examDate = useStore((s) => (s.planner && s.planner.examDate) || "");

  const totalReadings = META.books.reduce((n, b) => n + b.readings.length, 0);
  const doneCount = Object.keys(done).length;

  let daysToExam = null;
  if (examDate) {
    const exam = new Date(examDate + "T00:00:00").getTime();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = Math.round((exam - today.getTime()) / 86400e3);
    if (!isNaN(d) && d >= 0) daysToExam = d;
  }

  const studyActive = STUDY_ITEMS.some(([to]) => location.pathname === to);

  useEffect(() => setStudyOpen(false), [location.pathname]);

  return (
    <nav className="topnav">
      <Link className="brand" to="/">FRM · Part II</Link>

      <NavLink to="/" end className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        Home
      </NavLink>

      <div className="flex items-center gap-1 px-1">
        {META.books.map((b) => (
          <NavLink
            key={b.n}
            to={`/book/${b.n}`}
            title={b.n + " · " + b.short}
            style={{ "--bk": b.color, "--bk-soft": b.colorSoft }}
            className={({ isActive }) =>
              "flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border px-1 font-app text-[0.72rem] font-bold transition-colors " +
              (isActive
                ? "border-[var(--bk)] bg-[var(--bk-soft)] text-[var(--bk)]"
                : "border-line text-faint hover:border-[var(--bk)] hover:text-[var(--bk)]")
            }
          >
            {b.n}
          </NavLink>
        ))}
      </div>

      <NavLink to="/mindmap" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <Waypoints size={13} className="mr-1 inline -translate-y-px" />Mind Map
      </NavLink>

      <NavLink to="/search" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <Search size={13} className="mr-1 inline -translate-y-px" />Search
      </NavLink>

      <Popover open={studyOpen} onOpenChange={setStudyOpen}>
        <PopoverTrigger asChild>
          <NavButton
            className={
              "inline-flex cursor-pointer select-none items-center gap-0.5 rounded-md px-2.5 py-[0.3rem] font-app text-[0.86rem] transition-colors " +
              (studyActive ? "bg-accent-soft font-semibold text-accent" : "text-dim hover:bg-hovered hover:text-ink")
            }
          >
            Study <ChevronDown size={12} className={"transition-transform" + (studyOpen ? " rotate-180" : "")} />
          </NavButton>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-52 p-1.5">
          {STUDY_ITEMS.map(([to, label, Icon]) => (
            <Link
              key={to}
              to={to}
              className={
                "flex items-center gap-2 rounded-el px-2.5 py-1.5 text-[0.85rem] transition-colors " +
                (location.pathname === to
                  ? "bg-accent-soft text-accent"
                  : "text-dim hover:bg-hovered hover:text-ink")
              }
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </PopoverContent>
      </Popover>

      <span className="spacer" />

      {daysToExam != null && (
        <Link
          to="/planner"
          title={"Exam on " + examDate + " — open study planner"}
          className={
            "mr-1 hidden shrink-0 items-center gap-1 rounded-el border px-2 py-0.5 font-mono text-[0.74rem] no-underline sm:flex " +
            (daysToExam <= 14 ? "border-red text-red" : "border-line text-dim hover:text-ink")
          }
        >
          <Timer size={11} />
          {daysToExam === 0 ? "exam today" : daysToExam + "d to exam"}
        </Link>
      )}

      {totalReadings > 0 && (
        <span
          className="mr-1 hidden shrink-0 font-mono text-[0.76rem] text-faint sm:inline"
          title={doneCount + " of " + totalReadings + " readings marked done"}
        >
          {doneCount}/{totalReadings} done
        </span>
      )}

      <NavButton
        onClick={openPalette}
        title="Open command palette (⌘K)"
        className="mr-1 flex cursor-pointer select-none items-center gap-1 rounded-el border border-line px-2 py-1 font-app text-[0.78rem] text-dim hover:bg-hovered hover:text-ink"
      >
        <CommandIcon size={12} />K
      </NavButton>

      <NavButton
        onClick={() => setTheme(toggleTheme())}
        title="Toggle theme"
        className="flex cursor-pointer select-none items-center justify-center rounded-el border border-line p-1.5 text-dim hover:bg-hovered hover:text-ink"
      >
        {theme === "light" ? <SunMedium size={14} /> : <Moon size={14} />}
      </NavButton>
    </nav>
  );
}
