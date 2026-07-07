import type { NotificationItem } from "../types/domain";

export const notifications: NotificationItem[] = [
  { id: "NOT-001", title: "Critical fire risk", message: "BUS-104 requires immediate driver action.", time: "2 min ago", severity: "Critical" },
  { id: "NOT-002", title: "HazMat route warning", message: "LPG-412 entered a high-congestion segment.", time: "5 min ago", severity: "High" },
  { id: "NOT-003", title: "Maintenance due", message: "Battery cooling inspection is overdue.", time: "12 min ago", severity: "Medium" },
  { id: "NOT-004", title: "Report ready", message: "Daily Fire Risk Report generated.", time: "30 min ago", severity: "Info" }
];
