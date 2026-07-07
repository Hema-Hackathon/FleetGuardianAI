import { FlaskConical } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export function PrototypeBanner({ moduleName }: { moduleName: string }) {
  return (
    <div className="mb-5 flex items-start gap-3 rounded-lg border border-amber-400/25 bg-amber-500/10 p-4 text-sm text-amber-50">
      <FlaskConical className="mt-0.5 h-5 w-5 text-amber-300" />
      <div>
        <div className="flex flex-wrap items-center gap-2 font-semibold">
          <span>{moduleName}</span>
          <StatusBadge value="Prototype" />
        </div>
        <p className="mt-1 text-amber-100/80">
          This module is a production-style UI preview with realistic shared data. Backend integration is planned for a later phase.
        </p>
      </div>
    </div>
  );
}
