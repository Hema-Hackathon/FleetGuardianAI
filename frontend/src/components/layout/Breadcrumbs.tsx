import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { navItems } from "../../routes/navigation";

export function Breadcrumbs() {
  const location = useLocation();
  const active = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
      <Link to="/dashboard" className="inline-flex items-center gap-1 hover:text-white"><Home className="h-4 w-4" /> Home</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-slate-200">{active?.name ?? "Dashboard"}</span>
    </div>
  );
}
