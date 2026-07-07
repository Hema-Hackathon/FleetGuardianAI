import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
