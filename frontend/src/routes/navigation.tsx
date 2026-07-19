import {
  Activity,
  BarChart3,
  Building2,
  ClipboardCheck,
  Flame,
  Gauge,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShieldCheck,
  Siren,
  Truck,
  Wrench,
} from "lucide-react";
import type { ModuleSummary, ModuleStatus } from "../types/domain";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  status: ModuleStatus;
  description: string;
}

export const navItems: NavItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, status: "Prototype", description: "Executive fleet fire risk overview." },
  { name: "Fleet Management", path: "/fleet", icon: Truck, status: "Prototype", description: "Vehicle registry, depots, drivers, and fleet state." },
  { name: "Live Monitoring", path: "/monitoring", icon: Activity, status: "Prototype", description: "Live telemetry, route status, and alert feed." },
  { name: "AI Fire Prevention", path: "/fire-prevention", icon: Flame, status: "Implemented", description: "Flagship AI risk prediction and prevention module." },
  { name: "Incident Response", path: "/incident-response", icon: Siren, status: "Prototype", description: "Emergency workflows and active incident coordination." },
  { name: "Maintenance Intelligence", path: "/maintenance", icon: Wrench, status: "Prototype", description: "Predictive maintenance and component risk planning." },
  { name: "Compliance & Standards", path: "/compliance", icon: ShieldCheck, status: "Prototype", description: "CMVR/AIS compliance scoring and standards catalogue." },
  { name: "Analytics & Reporting", path: "/analytics", icon: BarChart3, status: "Prototype", description: "Fleet trends, reports, and executive analytics." },
  { name: "Administration", path: "/administration", icon: Settings, status: "Prototype", description: "Users, roles, rules, thresholds, and integrations." },
];

export const moduleSummaries: ModuleSummary[] = navItems.map((item) => ({
  id: item.path.replace("/", "") || "dashboard",
  name: item.name,
  path: item.path,
  status: item.status,
  description: item.description,
}));

export const quickStats = [
  { label: "Operational depots", value: "12", icon: Building2 },
  { label: "Live risk models", value: "4", icon: Gauge },
  { label: "Compliance checks", value: "38", icon: ClipboardCheck },
];
