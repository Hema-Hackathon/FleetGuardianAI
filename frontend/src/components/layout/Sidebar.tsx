import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navItems } from "../../routes/navigation";
import { useAppContext } from "../../store/useAppContext";
import { cn } from "../../utils/cn";
import { StatusBadge } from "../common/StatusBadge";
import { BrandMark } from "./BrandMark";

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppContext();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-slate-800 bg-[#06111f]/95 lg:block",
        sidebarCollapsed ? "w-20" : "w-80",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center justify-between px-4">
          <BrandMark collapsed={sidebarCollapsed} />
          <button
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-blue-500/10 hover:text-white",
                  isActive && "bg-blue-600 text-white shadow-glow",
                  sidebarCollapsed && "justify-center px-2",
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed ? (
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
              ) : null}
              {!sidebarCollapsed && item.status !== "Planned" ? (
                <StatusBadge value={item.status} className="px-1.5 py-0.5 text-[10px]" />
              ) : null}
            </NavLink>
          ))}
        </nav>
        {!sidebarCollapsed ? (
          <div className="m-4 rounded-lg border border-slate-700 bg-slate-900/70 p-3 text-xs text-slate-300">
            <div className="font-semibold text-white">Module Status</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Implemented and live ready
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Prototype UI preview
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Future planned module
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
