import { Bell, CalendarDays, HelpCircle, RefreshCw, Search, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";
import { useAppContext } from "../../store/useAppContext";
import { formatControlCenterDateTime } from "../../utils/dateTime";
import { BrandMark } from "./BrandMark";

export function TopHeader() {
  const { globalSearch, setGlobalSearch, requestRefresh } = useAppContext();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"alerts" | "help" | null>(null);
  const [refreshed, setRefreshed] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function handleRefresh() {
    requestRefresh();
    setRefreshed(true);
    window.setTimeout(() => setRefreshed(false), 1400);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#06111f]/90 backdrop-blur">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
        <Link
          to="/dashboard"
          aria-label="Go to FleetGuardian AI dashboard"
          className="shrink-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 lg:hidden"
        >
          <BrandMark collapsed />
        </Link>
        <div className="hidden h-8 w-px shrink-0 bg-slate-800 sm:block lg:hidden" />
        <div className="hidden min-w-0 flex-1 sm:block">
          <SearchBar value={globalSearch} onChange={setGlobalSearch} />
        </div>
        <button
          aria-label="Toggle search"
          className="rounded-md border border-slate-800 bg-slate-950/60 p-2 text-slate-300 hover:bg-slate-800 sm:hidden"
          onClick={() => setMobileSearchOpen((open) => !open)}
        >
          <Search className="h-5 w-5" />
        </button>
        <div className="relative ml-auto flex min-w-0 items-center gap-1 text-sm text-slate-300 sm:gap-2">
          <div className="hidden items-center gap-2 border-r border-slate-800 pr-3 md:flex">
            <CalendarDays className="h-4 w-4" /> {formatControlCenterDateTime(now)}
          </div>
          <Button variant="secondary" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">{refreshed ? "Refreshed" : "Refresh"}</span>
          </Button>
          <button
            aria-label="Show alerts"
            className="relative rounded-md p-2 hover:bg-slate-800"
            onClick={() => setActivePanel((panel) => (panel === "alerts" ? null : "alerts"))}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              8
            </span>
          </button>
          <button
            aria-label="Show help"
            className="hidden rounded-md p-2 hover:bg-slate-800 sm:block"
            onClick={() => setActivePanel((panel) => (panel === "help" ? null : "help"))}
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-2 sm:pl-3">
            <UserCircle className="h-8 w-8 text-slate-300" />
            <div className="hidden leading-tight sm:block">
              <div className="font-semibold text-white">Admin</div>
              <div className="text-xs text-slate-500">Fleet Control Center</div>
            </div>
          </div>
          {activePanel ? (
            <div className="absolute right-0 top-12 w-72 rounded-lg border border-slate-800 bg-slate-950 p-4 shadow-2xl">
              {activePanel === "alerts" ? (
                <div>
                  <div className="font-semibold text-white">Active alerts</div>
                  <p className="mt-1 text-sm text-slate-400">
                    8 alerts are being watched across the fleet. Use the Fire Prevention queue to
                    inspect the highest-risk vehicles first.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-white">Quick help</div>
                  <p className="mt-1 text-sm text-slate-400">
                    Search by vehicle, route, risk, or cargo. Select a vehicle, review AI
                    recommendations, then create a preventive maintenance order.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {mobileSearchOpen ? (
        <div className="border-t border-slate-800 px-3 py-3 sm:hidden">
          <SearchBar value={globalSearch} onChange={setGlobalSearch} />
        </div>
      ) : null}
    </header>
  );
}
