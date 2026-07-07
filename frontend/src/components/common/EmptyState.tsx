import type { LucideIcon } from "lucide-react";

export function EmptyState({ title, message, icon: Icon }: { title: string; message: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
      <Icon className="mx-auto h-8 w-8 text-slate-500" />
      <h3 className="mt-3 text-base font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{message}</p>
    </div>
  );
}
