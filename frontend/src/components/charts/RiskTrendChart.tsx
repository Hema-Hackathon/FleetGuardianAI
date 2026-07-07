import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { day: "May 6", critical: 6, high: 32, medium: 45, low: 62 },
  { day: "May 7", critical: 8, high: 42, medium: 56, low: 70 },
  { day: "May 8", critical: 11, high: 59, medium: 62, low: 83 },
  { day: "May 9", critical: 13, high: 55, medium: 66, low: 96 },
  { day: "May 10", critical: 12, high: 67, medium: 72, low: 89 },
  { day: "May 11", critical: 15, high: 69, medium: 76, low: 88 },
  { day: "May 12", critical: 14, high: 73, medium: 79, low: 112 },
];

export function RiskTrendChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ left: 0, right: 10, top: 5, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: "#071525", border: "1px solid #1e3a5f", borderRadius: 8 }} />
          <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="medium" stroke="#facc15" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
