import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Bell, FileText, ShieldCheck, Truck, Wrench } from "lucide-react";
import { IncidentDonut } from "../components/charts/IncidentDonut";
import { RiskDonut } from "../components/charts/RiskDonut";
import { RiskTrendChart } from "../components/charts/RiskTrendChart";
import { MetricCard } from "../components/common/MetricCard";
import { PageHeader } from "../components/common/PageHeader";
import { SectionCard } from "../components/common/SectionCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { RiskMap } from "../components/dashboard/RiskMap";
import { DataTable } from "../components/tables/DataTable";
import { useFleetData } from "../hooks/useFleetData";
import { moduleSummaries } from "../routes/navigation";
import type { Vehicle } from "../types/domain";
import { formatNumber } from "../utils/format";

const vehicleColumns: ColumnDef<Vehicle>[] = [
  { accessorKey: "id", header: "Vehicle ID" },
  { accessorKey: "type", header: "Vehicle Type" },
  { accessorKey: "riskLevel", header: "Risk", cell: ({ row }) => <StatusBadge value={row.original.riskLevel} /> },
  { accessorKey: "riskScore", header: "Score" },
  { accessorKey: "location", header: "Location" },
];

export function DashboardPage() {
  const { vehicles, alerts, maintenanceRecords, reports } = useFleetData();
  const totalVehicles = 1248;
  const critical = vehicles.filter((vehicle) => vehicle.riskLevel === "Critical").length + 25;
  const high = vehicles.filter((vehicle) => vehicle.riskLevel === "High").length + 92;
  const medium = vehicles.filter((vehicle) => vehicle.riskLevel === "Medium").length + 205;
  const low = totalVehicles - critical - high - medium;
  const topVehicles = [...vehicles].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Fleet Operations Dashboard"
        description="Real-time overview of fleet fire risk, operations, alerts, and system readiness."
        actions={<StatusBadge value="Prototype" />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Vehicles" value={formatNumber(totalVehicles)} helper="Active" icon={Truck} tone="blue" />
        <MetricCard label="Critical Risk" value={critical} helper="2.2% of fleet" icon={AlertTriangle} tone="red" />
        <MetricCard label="High Risk" value={high} helper="7.7% of fleet" icon={AlertTriangle} tone="orange" />
        <MetricCard label="Medium Risk" value={medium} helper="16.8% of fleet" icon={Bell} tone="yellow" />
        <MetricCard label="Low Risk" value={low} helper="73.3% of fleet" icon={ShieldCheck} tone="green" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.25fr_1.8fr]">
        <SectionCard title="Risk Distribution">
          <RiskDonut
            centerLabel={formatNumber(totalVehicles)}
            data={[
              { name: "Critical", value: critical },
              { name: "High", value: high },
              { name: "Medium", value: medium },
              { name: "Low", value: low },
            ]}
          />
        </SectionCard>
        <SectionCard title="Risk Trend (Last 7 Days)">
          <RiskTrendChart />
        </SectionCard>
        <SectionCard title="Live Fleet Map">
          <RiskMap vehicles={vehicles} />
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
        <SectionCard title="Top 5 Vehicles by Risk">
          <DataTable data={topVehicles} columns={vehicleColumns} />
        </SectionCard>
        <SectionCard title={`Active Alerts (${alerts.length})`}>
          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-md border border-slate-800 bg-slate-950/35 p-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-red-300" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">{alert.title}</div>
                  <div className="text-sm text-slate-400">{alert.vehicleId} - {alert.detail}</div>
                </div>
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Incident Summary">
          <IncidentDonut />
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard title="Maintenance Due">
          <div className="flex items-center justify-between">
            <div><div className="text-3xl font-bold text-white">64</div><div className="text-sm text-slate-400">Vehicles</div></div>
            <Wrench className="h-10 w-10 text-slate-400" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            <div><div className="text-2xl font-bold text-red-200">18</div><div className="text-slate-400">Overdue</div></div>
            <div><div className="text-2xl font-bold text-orange-200">26</div><div className="text-slate-400">Due in 7 days</div></div>
            <div><div className="text-2xl font-bold text-emerald-200">20</div><div className="text-slate-400">Due in 30 days</div></div>
          </div>
          <div className="mt-4 text-xs text-slate-500">{maintenanceRecords.length} high-priority maintenance records linked to risk scoring.</div>
        </SectionCard>
        <SectionCard title="System Health">
          <div className="flex items-center gap-3 text-emerald-300"><ShieldCheck className="h-9 w-9" /><span className="text-lg font-semibold">All Systems Operational</span></div>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs text-slate-300">
            {["Data Ingestion", "AI Prediction", "Alert Engine", "Integrations"].map((item) => <div key={item} className="rounded-md border border-slate-800 bg-slate-950/40 p-3"><ShieldCheck className="mx-auto mb-2 h-5 w-5 text-emerald-400" />{item}<div className="mt-1 text-emerald-300">Healthy</div></div>)}
          </div>
        </SectionCard>
        <SectionCard title="Recent Reports">
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/35 p-3 text-sm">
                <span className="flex items-center gap-2 text-slate-200"><FileText className="h-4 w-4 text-slate-400" />{report.name}</span>
                <span className="text-slate-500">View</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="All Modules" className="mt-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {moduleSummaries.map((module) => (
            <div key={module.id} className="rounded-md border border-slate-800 bg-slate-950/30 p-3">
              <div className="flex items-center justify-between gap-2"><div className="font-semibold text-white">{module.name}</div><StatusBadge value={module.status} /></div>
              <p className="mt-2 text-sm text-slate-400">{module.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
