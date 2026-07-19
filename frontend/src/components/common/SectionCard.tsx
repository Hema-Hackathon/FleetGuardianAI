import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function SectionCard({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-surface min-w-0 rounded-lg p-4", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h2 className="text-base font-semibold text-slate-50">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
