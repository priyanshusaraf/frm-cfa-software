/* The Study destinations, in ONE place, consumed by both surfaces that show them:
   the navbar's popover (Nav.jsx) and the docked left sidebar (StudySidebar.jsx).
   They used to be a flat 16-item array inlined in Nav.jsx; sixteen ungrouped links
   are hard to scan in either surface, so the list carries its grouping here and
   both renderers get it for free. Adding a Study page = one entry here (plus the
   route in main.jsx and the CommandPalette entry). */
import {
  RotateCcw,
  ListChecks,
  Sigma,
  BarChart3,
  StickyNote,
  CalendarDays,
  Calculator,
  BookA,
  Highlighter,
  Bookmark,
  Timer,
  TimerReset,
  Settings as SettingsIcon,
  Boxes,
  Layers,
} from "lucide-react";

export const STUDY_GROUPS = [
  {
    label: "Plan",
    items: [
      { to: "/planner", label: "Study planner", Icon: CalendarDays },
      { to: "/pomodoro", label: "Pomodoro", Icon: TimerReset },
      { to: "/consistency", label: "Consistency", Icon: BarChart3 },
      { to: "/progress", label: "Progress", Icon: BarChart3 },
    ],
  },
  {
    label: "Practice",
    items: [
      { to: "/mock", label: "Mock exam", Icon: Timer },
      { to: "/review", label: "Review queue", Icon: ListChecks },
      { to: "/drills", label: "Calculation drills", Icon: Calculator },
      { to: "/revision", label: "Revision", Icon: RotateCcw },
      { to: "/case-study", label: "Case study", Icon: Layers },
    ],
  },
  {
    label: "Reference",
    items: [
      { to: "/formulas", label: "Formula sheet", Icon: Sigma },
      { to: "/glossary", label: "Glossary", Icon: BookA },
      { to: "/concepts", label: "Core Concepts", Icon: Boxes },
    ],
  },
  {
    label: "Yours",
    items: [
      { to: "/notes", label: "Notes", Icon: StickyNote },
      { to: "/highlights", label: "Highlights", Icon: Highlighter },
      { to: "/bookmarks", label: "Bookmarks", Icon: Bookmark },
    ],
  },
  {
    label: null, // pinned last, on its own
    items: [{ to: "/settings", label: "Settings", Icon: SettingsIcon }],
  },
];

/** Flat list of every Study destination path, in display order. */
export const STUDY_PATHS = STUDY_GROUPS.flatMap((g) => g.items.map((i) => i.to));

/** True when `pathname` is one of the Study destinations themselves. */
export function isStudyPage(pathname) {
  return STUDY_PATHS.indexOf(pathname) !== -1;
}

/* Where the docked sidebar replaces the navbar popover: the two landing-type
   pages plus every Study destination. Deliberately NOT readings, concept pages,
   /mindmap, /search or /pdf/:bn — those are reading surfaces where the width
   belongs to the content and the popover stays. */
export function hasStudySidebar(pathname) {
  if (!pathname) return false;
  if (pathname === "/") return true;
  if (/^\/book\/\d+\/?$/.test(pathname)) return true;
  return isStudyPage(pathname.replace(/\/$/, "") || "/");
}
