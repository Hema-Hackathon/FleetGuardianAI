import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Sidebar } from "../components/layout/Sidebar";
import { TopHeader } from "../components/layout/TopHeader";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-transparent text-slate-100">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopHeader />
        <main className="w-full px-4 py-5 sm:px-5 lg:px-8 xl:px-10">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
