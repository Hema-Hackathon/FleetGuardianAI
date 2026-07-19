import type { AlertSeverity, ModuleStatus, RiskLevel } from "../../types/domain";
import { cn } from "../../utils/cn";

type BadgeValue = RiskLevel | AlertSeverity | ModuleStatus | "Live Ready" | "Guarded" | "Healthy" | "Ongoing" | "Resolved" | "Under Response" | "Overdue" | "Due Soon" | "Scheduled" | "Closed" | "Info";

const styles: Record<string, string> = {
  Critical: "border-red-400/30 bg-red-500/15 text-red-200",
  High: "border-orange-400/30 bg-orange-500/15 text-orange-200",
  Medium: "border-yellow-400/30 bg-yellow-500/15 text-yellow-100",
  Low: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  Info: "border-sky-400/30 bg-sky-500/15 text-sky-200",
  Prototype: "border-amber-400/30 bg-amber-500/15 text-amber-100",
  Implemented: "border-emerald-400/30 bg-emerald-500/20 text-emerald-100",
  Planned: "border-blue-400/30 bg-blue-500/15 text-blue-100",
  "Live Ready": "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  Guarded: "border-sky-400/30 bg-sky-500/15 text-sky-100",
  Healthy: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  Ongoing: "border-red-400/30 bg-red-500/15 text-red-200",
  "Under Response": "border-orange-400/30 bg-orange-500/15 text-orange-200",
  Resolved: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  Overdue: "border-red-400/30 bg-red-500/15 text-red-200",
  "Due Soon": "border-yellow-400/30 bg-yellow-500/15 text-yellow-100",
  Scheduled: "border-blue-400/30 bg-blue-500/15 text-blue-100",
  Closed: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
};

export function StatusBadge({ value, className }: { value: BadgeValue; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold leading-none",
        styles[value] ?? styles.Info,
        className,
      )}
    >
      {value}
    </span>
  );
}
