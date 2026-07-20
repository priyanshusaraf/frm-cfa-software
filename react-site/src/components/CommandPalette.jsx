import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { META, rpath } from "../lib/meta.js";
import { useAllReadings } from "../lib/readings.js";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Mind map", path: "/mindmap" },
  { label: "Search", path: "/search" },
  { label: "Study planner", path: "/planner" },
  { label: "Mock exam", path: "/mock" },
  { label: "Revision", path: "/revision" },
  { label: "Review queue", path: "/review" },
  { label: "Calculation drills", path: "/drills" },
  { label: "Formula sheet", path: "/formulas" },
  { label: "Glossary", path: "/glossary" },
  { label: "Progress", path: "/progress" },
  { label: "Notes", path: "/notes" },
  { label: "Highlights", path: "/highlights" },
  { label: "Bookmarks", path: "/bookmarks" },
  { label: "Settings", path: "/settings" },
];

function stripTags(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").trim();
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const allReadingsMap = useAllReadings();

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const allReadings = useMemo(
    () => META.books.flatMap((b) => b.readings.map((r) => ({ n: r.n, t: r.t, bookN: b.n }))),
    []
  );

  const concepts = useMemo(() => {
    const out = [];
    if (!allReadingsMap) return out;
    outer: for (const rnKey in allReadingsMap) {
      const r = allReadingsMap[rnKey];
      if (!r.concepts) continue;
      for (const c of r.concepts) {
        const name = stripTags(c.name);
        if (!name) continue;
        out.push({ name, rn: r.reading, title: r.title });
        if (out.length >= 800) break outer;
      }
    }
    return out;
  }, [allReadingsMap]);

  const formulaEntries = useMemo(() => {
    const out = [];
    if (!allReadingsMap) return out;
    outer: for (const rnKey in allReadingsMap) {
      const r = allReadingsMap[rnKey];
      if (!r.formulas) continue;
      for (const f of r.formulas) {
        const name = stripTags(f.name);
        if (!name) continue;
        out.push({ name, rn: r.reading, title: r.title });
        if (out.length >= 400) break outer;
      }
    }
    return out;
  }, [allReadingsMap]);

  const go = useCallback(
    (path) => {
      setOpen(false);
      navigate(path);
    },
    [navigate]
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed left-1/2 top-[20vh] z-[100] w-[min(92vw,640px)] -translate-x-1/2 rounded-card border border-linestrong bg-raised shadow-card overflow-hidden"
    >
      <div className="border-b border-line px-3">
        <Command.Input
          autoFocus
          placeholder="Search pages, readings, concepts, formulas…"
          className="w-full border-0 bg-transparent py-3 text-[0.95rem] text-ink outline-none placeholder:text-faint"
        />
      </div>
      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-faint">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Pages"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-faint"
        >
          {PAGES.map((p) => (
            <Command.Item
              key={p.path}
              value={p.label}
              onSelect={() => go(p.path)}
              className="flex cursor-pointer items-center rounded-el px-2 py-2 text-sm text-ink data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
            >
              {p.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Readings"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-faint"
        >
          {allReadings.map((r) => (
            <Command.Item
              key={r.n}
              value={`R${r.n} ${r.t}`}
              onSelect={() => go(rpath(r.n))}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-el px-2 py-2 text-sm text-ink data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
            >
              <span className="truncate">
                R{r.n} {r.t}
              </span>
              <span className="shrink-0 text-xs text-faint">Book {r.bookN}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Concepts"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-faint"
        >
          {concepts.map((c, i) => (
            <Command.Item
              key={`c-${c.rn}-${i}`}
              value={`${c.name} ${c.title}`}
              onSelect={() => go(rpath(c.rn))}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-el px-2 py-2 text-sm text-ink data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
            >
              <span className="truncate">{c.name}</span>
              <span className="shrink-0 truncate text-xs text-faint">R{c.rn} {c.title}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Formulas"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-faint"
        >
          {formulaEntries.map((f, i) => (
            <Command.Item
              key={`f-${f.rn}-${i}`}
              value={`${f.name} ${f.title}`}
              onSelect={() => go(rpath(f.rn))}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-el px-2 py-2 text-sm text-ink data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
            >
              <span className="truncate">{f.name}</span>
              <span className="shrink-0 truncate text-xs text-faint">R{f.rn} {f.title}</span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-end gap-1 border-t border-line px-3 py-2 text-xs text-faint">
        ↑↓ navigate · ↵ open · esc close
      </div>
    </Command.Dialog>
  );
}
