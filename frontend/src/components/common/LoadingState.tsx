import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading fleet intelligence" }: { label?: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/40 text-slate-300">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      {label}
    </div>
  );
}
