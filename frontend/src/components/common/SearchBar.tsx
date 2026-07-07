import { Search } from "lucide-react";
import { Input } from "./Input";

export function SearchBar({ value, onChange, placeholder = "Search fleet, vehicle, alert..." }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="relative min-w-0 w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <Input className="pl-9" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}
