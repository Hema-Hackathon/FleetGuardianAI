import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

const toneClasses = {
  blue: "border-blue-400/20 bg-blue-500/10 text-blue-200",
  red: "border-red-400/20 bg-red-500/15 text-red-200",
  orange: "border-orange-400/20 bg-orange-500/15 text-orange-200",
  yellow: "border-yellow-400/20 bg-yellow-500/15 text-yellow-100",
  green: "border-emerald-400/20 bg-emerald-500/15 text-emerald-200",
  slate: "border-slate-500/20 bg-slate-500/10 text-slate-200",
};

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  helper?: string;
  icon: LucideIcon;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <div className={cn("card-surface rounded-lg p-4", toneClasses[tone])}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-normal text-white">{value}</p>
          {helper ? <p className="mt-1 text-sm text-slate-300">{helper}</p> : null}
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-current/30 bg-current/10">
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}
