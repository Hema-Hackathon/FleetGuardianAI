import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#ef4444", "#f97316", "#facc15", "#22c55e"];

export function RiskDonut({ data, centerLabel }: { data: Array<{ name: string; value: number }>; centerLabel: string }) {
  return (
    <div className="relative h-56">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={2}>
            {data.map((item, index) => (
              <Cell key={item.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#071525", border: "1px solid #1e3a5f", borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
        <div>
          <div className="text-2xl font-bold text-white">{centerLabel}</div>
          <div className="text-xs text-slate-400">Total</div>
        </div>
      </div>
    </div>
  );
}
