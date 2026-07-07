import { MapPin, Minus, Plus, Radar } from "lucide-react";
import type { Vehicle } from "../../types/domain";
import { riskColor } from "../../utils/format";

export function RiskMap({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-lg border border-slate-800 bg-[#071525] grid-lines">
      <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 58% 36%, rgba(59,130,246,.24), transparent 22%), radial-gradient(circle at 30% 60%, rgba(14,165,233,.16), transparent 18%)" }} />
      <div className="absolute left-[50%] top-[36%] text-lg font-semibold text-slate-200">New Delhi</div>
      <div className="absolute left-[44%] top-[56%] text-sm text-slate-300">Gurugram</div>
      <div className="absolute left-[66%] top-[60%] text-sm text-slate-300">Faridabad</div>
      {vehicles.slice(0, 9).map((vehicle) => (
        <div
          key={vehicle.id}
          className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 shadow-lg"
          style={{ left: `${vehicle.coordinates.x}%`, top: `${vehicle.coordinates.y}%`, backgroundColor: riskColor(vehicle.riskLevel) }}
          title={`${vehicle.id} ${vehicle.riskLevel}`}
        >
          <MapPin className="h-4 w-4 text-white" />
        </div>
      ))}
      <div className="absolute right-3 top-3 grid gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950/80 text-white"><Plus className="h-4 w-4" /></button>
        <button className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950/80 text-white"><Minus className="h-4 w-4" /></button>
        <button className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950/80 text-white"><Radar className="h-4 w-4" /></button>
      </div>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-md bg-slate-950/70 px-3 py-2 text-xs text-slate-200">
        {[
          ["Low", "#22c55e"],
          ["Medium", "#facc15"],
          ["High", "#f97316"],
          ["Critical", "#ef4444"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />{label}</span>
        ))}
      </div>
    </div>
  );
}
