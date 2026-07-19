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
import type { Vehicle } from "../types/domain";
import { formatNumber } from "../utils/format";

const vehicleColumns: ColumnDef<Vehicle>[] = [
  { accessorKey: "id", header: "Vehicle ID" },
  { accessorKey: "type", header: "Vehicle Type" },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => <StatusBadge value={row.original.riskLevel} />,
  },
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
    <div className="dashboard-page dashboard-all-in-one">
      <PageHeader
        title="Fleet Operations Dashboard"
        description="Real-time overview of fleet fire risk, operations, alerts, and system readiness."
        actions={<StatusBadge value="Prototype" />}
      />

      <div className="dashboard-kpis grid gap-2 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Total Vehicles"
          value={formatNumber(totalVehicles)}
          helper="Active"
          icon={Truck}
          tone="blue"
        />
        <MetricCard
          label="Critical Risk"
          value={critical}
          helper="2.2% of fleet"
          icon={AlertTriangle}
          tone="red"
        />
        <MetricCard
          label="High Risk"
          value={high}
          helper="7.7% of fleet"
          icon={AlertTriangle}
          tone="orange"
        />
        <MetricCard
          label="Medium Risk"
          value={medium}
          helper="16.8% of fleet"
          icon={Bell}
          tone="yellow"
        />
        <MetricCard
          label="Low Risk"
          value={low}
          helper="73.3% of fleet"
          icon={ShieldCheck}
          tone="green"
        />
      </div>

      <div className="dashboard-main-grid grid min-h-0 gap-2 xl:grid-cols-[1fr_1.25fr_1.8fr] xl:grid-rows-2">
        <SectionCard title="Risk Distribution" className="h-full overflow-hidden p-3">
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
        <SectionCard title="Risk Trend (Last 7 Days)" className="h-full overflow-hidden p-3">
          <RiskTrendChart />
        </SectionCard>
        <SectionCard title="Live Fleet Map" className="h-full overflow-hidden p-3">
          <RiskMap vehicles={vehicles} />
        </SectionCard>

        <SectionCard title="Top 5 Vehicles by Risk" className="h-full overflow-hidden p-2">
          <DataTable data={topVehicles} columns={vehicleColumns} />
        </SectionCard>
        <SectionCard
          title={`Active Alerts (${alerts.length})`}
          className="h-full overflow-hidden p-3"
        >
          <div className="dashboard-alerts space-y-1.5">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                title={alert.detail}
                className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/35 p-1.5"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-300" />
                <div className="min-w-0 flex-1 truncate text-xs font-semibold text-white">
                  {alert.title}
                </div>
                <span className="shrink-0 text-[10px] text-slate-400">{alert.vehicleId}</span>
                <span className="shrink-0 text-[10px] text-slate-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Incident Summary" className="h-full overflow-hidden p-3">
          <IncidentDonut />
        </SectionCard>
      </div>

      <div className="dashboard-bottom-grid min-h-0">
        <div className="dashboard-operations grid h-full min-h-0 gap-2 xl:grid-cols-3">
          <SectionCard title="Maintenance Due" className="h-full overflow-hidden p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">64</span>
                <span className="ml-2 text-xs text-slate-400">Vehicles</span>
              </div>
              <Wrench className="h-7 w-7 text-slate-400" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-lg font-bold text-red-200">18</div>
                <div className="text-slate-400">Overdue</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-200">26</div>
                <div className="text-slate-400">7 days</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-200">20</div>
                <div className="text-slate-400">30 days</div>
              </div>
            </div>
            <div className="mt-2 truncate text-[10px] text-slate-500">
              {maintenanceRecords.length} priority records linked to risk scoring.
            </div>
          </SectionCard>

          <SectionCard title="System Health" className="h-full overflow-hidden p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
              All Systems Operational
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[10px] text-slate-300">
              {["Ingestion", "Prediction", "Alerts", "Integrations"].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-slate-800 bg-slate-950/40 p-1.5"
                >
                  <ShieldCheck className="mx-auto mb-1 h-4 w-4 text-emerald-400" />
                  {item}
                  <div className="text-emerald-300">Healthy</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Reports" className="h-full overflow-hidden p-3">
            <div className="space-y-1.5">
              {reports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/35 p-1.5 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-2 text-slate-200">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{report.name}</span>
                  </span>
                  <span className="ml-2 text-slate-500">View</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
