import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { STUDY_GROUPS } from "../lib/studyNav.js";
import { useStore, setStudySidebarCollapsed } from "../lib/store.js";

/* The docked Study nav for Home, book overviews and the Study pages themselves.
   Mounted by main.jsx's Shell, which also decides WHICH routes get it
   (lib/studyNav.js `hasStudySidebar`) and hides the navbar popover to match.

   Collapsing yields an icon-only rail rather than hiding the sidebar outright:
   the toggle has to stay on screen or the only way back is the navbar popover,
   which is exactly what is hidden on these routes.

   Below 1180px CSS hides this entirely and un-hides the popover, so nothing is
   ever unreachable. That gate is pure CSS on purpose: a JS viewport measurement
   would flash the wrong surface on first paint. */
export default function StudySidebar() {
  const collapsed = !!useStore((s) => s.layout && s.layout.studySidebarCollapsed);
  const Chevron = collapsed ? PanelLeftOpen : PanelLeftClose;

  /* Published so fixed-position chrome can clear the sidebar (the "Return to
     Reading" button reads it). Cleared on unmount, which is also how routes
     without a sidebar get back to a 0 offset. The widths must stay in step with
     the .study-sidebar flex-basis rules in style.css. */
  useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty("--study-sidebar-w", collapsed ? "3.75rem" : "15rem");
    return () => el.style.removeProperty("--study-sidebar-w");
  }, [collapsed]);

  return (
    <aside className="study-sidebar" data-collapsed={collapsed ? "1" : undefined} aria-label="Study">
      <div className="study-sidebar-head">
        {!collapsed && <span className="study-sidebar-title">Study</span>}
        <button
          type="button"
          className="study-sidebar-toggle"
          onClick={() => setStudySidebarCollapsed(!collapsed)}
          title={collapsed ? "Expand study sidebar" : "Collapse study sidebar"}
          aria-label={collapsed ? "Expand study sidebar" : "Collapse study sidebar"}
          aria-expanded={!collapsed}
        >
          <Chevron size={15} />
        </button>
      </div>

      <nav className="study-sidebar-nav">
        {STUDY_GROUPS.map((group, gi) => (
          <div className="study-sidebar-group" key={group.label || "g" + gi}>
            {group.label && !collapsed && <div className="study-sidebar-grouplabel">{group.label}</div>}
            {group.items.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                title={label}
                className={({ isActive }) => "study-sidebar-link" + (isActive ? " active" : "")}
              >
                <Icon size={15} className="study-sidebar-icon" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
