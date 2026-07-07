import { Bell, CalendarDays, HelpCircle, Menu, RefreshCw, Search, UserCircle } from "lucide-react";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";
import { useAppContext } from "../../store/useAppContext";

export function TopHeader() {
  const { globalSearch, setGlobalSearch } = useAppContext();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#06111f]/90 backdrop-blur">
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
        <button className="rounded-md p-2 text-slate-300 hover:bg-slate-800 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden min-w-0 flex-1 sm:block">
          <SearchBar value={globalSearch} onChange={setGlobalSearch} />
        </div>
        <button className="rounded-md border border-slate-800 bg-slate-950/60 p-2 text-slate-300 hover:bg-slate-800 sm:hidden">
          <Search className="h-5 w-5" />
        </button>
        <div className="ml-auto flex min-w-0 items-center gap-1 text-sm text-slate-300 sm:gap-2">
          <div className="hidden items-center gap-2 border-r border-slate-800 pr-3 md:flex">
            <CalendarDays className="h-4 w-4" /> May 12, 2025 | 10:30 AM
          </div>
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <button className="relative rounded-md p-2 hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              8
            </span>
          </button>
          <button className="hidden rounded-md p-2 hover:bg-slate-800 sm:block">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-2 sm:pl-3">
            <UserCircle className="h-8 w-8 text-slate-300" />
            <div className="hidden leading-tight sm:block">
              <div className="font-semibold text-white">Admin</div>
              <div className="text-xs text-slate-500">Fleet Control Center</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
