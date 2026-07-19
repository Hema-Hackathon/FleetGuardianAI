import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  ClipboardList,
  FileCheck2,
  Gauge,
  ShieldAlert,
  Truck,
  Users,
} from "lucide-react";
import { RiskTrendChart } from "../components/charts/RiskTrendChart";
import { MetricCard } from "../components/common/MetricCard";
import { PageHeader } from "../components/common/PageHeader";
import { PrototypeBanner } from "../components/common/PrototypeBanner";
import { SectionCard } from "../components/common/SectionCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { useFleetData } from "../hooks/useFleetData";
import { navItems } from "../routes/navigation";
import type { Vehicle } from "../types/domain";

interface PrototypeModulePageProps {
  modulePath: string;
}

const columns: ColumnDef<Vehicle>[] = [
  { accessorKey: "id", header: "Vehicle" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => <StatusBadge value={row.original.riskLevel} />,
  },
  { accessorKey: "lastUpdated", header: "Updated" },
];

const moduleContent: Record<
  string,
  {
    focus: string;
    icon: typeof Truck;
    kpis: Array<{
      label: string;
      value: string;
      tone: "blue" | "red" | "orange" | "yellow" | "green" | "slate";
    }>;
  }
> = {
  "/fleet": {
    focus: "Vehicle registry, depots, drivers, and operational readiness.",
    icon: Truck,
    kpis: [
      { label: "Registered Vehicles", value: "1,248", tone: "blue" },
      { label: "Depots", value: "12", tone: "green" },
      { label: "Driver Compliance", value: "96%", tone: "yellow" },
    ],
  },
  "/monitoring": {
    focus: "Live telemetry, maps, route health, and sensor status.",
    icon: Activity,
    kpis: [
      { label: "Live Signals", value: "8,420", tone: "blue" },
      { label: "Delayed Feeds", value: "14", tone: "orange" },
      { label: "Critical Streams", value: "7", tone: "red" },
    ],
  },
  "/incident-response": {
    focus: "Emergency command, escalation workflow, and response coordination.",
    icon: ShieldAlert,
    kpis: [
      { label: "Open Incidents", value: "6", tone: "red" },
      { label: "Under Response", value: "14", tone: "orange" },
      { label: "Avg Response", value: "4.8m", tone: "green" },
    ],
  },
  "/investigation": {
    focus: "AI-assisted root cause analysis, evidence capture, and post-incident review.",
    icon: ClipboardList,
    kpis: [
      { label: "Active Cases", value: "5", tone: "blue" },
      { label: "Evidence Items", value: "132", tone: "slate" },
      { label: "RCA Completed", value: "87%", tone: "green" },
    ],
  },
  "/maintenance": {
    focus: "Predictive maintenance, component health, and service planning.",
    icon: Gauge,
    kpis: [
      { label: "Overdue", value: "18", tone: "red" },
      { label: "Due Soon", value: "26", tone: "orange" },
      { label: "Prevented Risks", value: "41", tone: "green" },
    ],
  },
  "/compliance": {
    focus: "CMVR, AIS, recall, certification, and standards intelligence.",
    icon: FileCheck2,
    kpis: [
      { label: "Compliance Score", value: "88%", tone: "green" },
      { label: "Open Gaps", value: "23", tone: "yellow" },
      { label: "Recall Checks", value: "312", tone: "blue" },
    ],
  },
  "/analytics": {
    focus: "Executive trends, recurring risk patterns, and operational reporting.",
    icon: BarChart3,
    kpis: [
      { label: "Reports", value: "42", tone: "blue" },
      { label: "Risk Reduction", value: "18%", tone: "green" },
      { label: "Loss Avoidance", value: "INR 8.4Cr", tone: "yellow" },
    ],
  },
  "/ai-assistant": {
    focus: "Conversational insights, summaries, and guided fleet decisions.",
    icon: Bot,
    kpis: [
      { label: "Daily Queries", value: "186", tone: "blue" },
      { label: "Insights", value: "54", tone: "green" },
      { label: "Escalations", value: "8", tone: "orange" },
    ],
  },
  "/administration": {
    focus: "Users, roles, thresholds, rules, notification policy, and integrations.",
    icon: Users,
    kpis: [
      { label: "Users", value: "126", tone: "blue" },
      { label: "Rules", value: "38", tone: "green" },
      { label: "Integrations", value: "9", tone: "yellow" },
    ],
  },
};

export function PrototypeModulePage({ modulePath }: PrototypeModulePageProps) {
  const { vehicles, alerts, incidents } = useFleetData();
  const nav = navItems.find((item) => item.path === modulePath);
  const content = moduleContent[modulePath] ?? moduleContent["/fleet"];
  const Icon = content.icon;
  const title = nav?.name ?? "Prototype Module";

  return (
    <div className="module-page prototype-module-page">
      <PageHeader
        title={title}
        description={content.focus}
        badge={<StatusBadge value="Prototype" />}
      />
      <PrototypeBanner moduleName={title} />

      <div className="module-kpis grid gap-2 md:grid-cols-3">
        {content.kpis.map((kpi) => (
          <MetricCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            helper="Prototype data"
            icon={Icon}
            tone={kpi.tone}
          />
        ))}
      </div>

      <div className="module-primary-grid grid min-h-0 gap-2 xl:grid-cols-[1.2fr_1fr]">
        <SectionCard title={`${title} Workbench`}>
          <DataTable data={vehicles.slice(0, 8)} columns={columns} />
        </SectionCard>
        <SectionCard title="Operational Trend">
          <RiskTrendChart />
        </SectionCard>
      </div>

      <div className="module-secondary-grid grid min-h-0 gap-2 xl:grid-cols-3">
        <SectionCard title="Priority Queue">
          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className="rounded-md border border-slate-800 bg-slate-950/35 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white">{alert.title}</span>
                  <StatusBadge value={alert.severity} />
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {alert.vehicleId}: {alert.detail}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Process Health">
          <div className="space-y-3 text-sm">
            {["Data validation", "Workflow SLA", "Operator review", "Report generation"].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/35 p-3"
                >
                  <span>{item}</span>
                  <StatusBadge value={index === 1 ? "Medium" : "Healthy"} />
                </div>
              ),
            )}
          </div>
        </SectionCard>
        <SectionCard title="Recent Activity">
          <div className="space-y-3">
            {incidents.slice(0, 4).map((incident) => (
              <div
                key={incident.id}
                className="flex gap-3 rounded-md border border-slate-800 bg-slate-950/35 p-3 text-sm"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-300" />
                <div>
                  <div className="font-semibold text-white">{incident.title}</div>
                  <div className="text-slate-400">
                    {incident.status} - {incident.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
