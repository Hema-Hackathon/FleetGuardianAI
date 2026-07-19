export function BrandMark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-cyan-300/30 bg-slate-950 shadow-glow">
        <img
          src="/images/fleetguardian-product-mark.png"
          alt="FleetGuardian AI product guard"
          className="h-full w-full object-cover object-center"
        />
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
