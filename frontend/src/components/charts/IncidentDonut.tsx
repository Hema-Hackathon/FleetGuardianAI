import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Ongoing", value: 6, color: "#ef4444" },
  { name: "Under Response", value: 14, color: "#f97316" },
  { name: "Resolved", value: 25, color: "#22c55e" },
];

export function IncidentDonut() {
  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr]">
      <div className="relative h-44">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={76}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#071525", border: "1px solid #1e3a5f", borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
          <div>
            <div className="text-xs text-slate-400">Total</div>
            <div className="text-2xl font-bold text-white">45</div>
          </div>
        </div>
      </div>
      <div className="space-y-3 self-center">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-300"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />{item.name}</span>
            <span className="font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
