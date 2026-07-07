import { Flame } from "lucide-react";

export function BrandMark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/15 text-red-300">
        <Flame className="h-6 w-6" />
      </div>
      {!collapsed ? (
        <div className="min-w-0">
          <div className="text-sm font-bold uppercase leading-tight tracking-wide text-white">FleetGuardian AI</div>
          <div className="text-[11px] font-semibold uppercase leading-tight text-slate-400">Predict. Prevent. Protect.</div>
        </div>
      ) : null}
    </div>
  );
}
