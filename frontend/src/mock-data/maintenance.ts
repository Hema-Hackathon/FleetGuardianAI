import type { MaintenanceRecord } from "../types/domain";

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: "MNT-001", vehicleId: "BUS-104", component: "Battery cooling loop", status: "Overdue", dueDate: "2026-07-04", owner: "EV Safety Cell" },
  { id: "MNT-002", vehicleId: "LPG-412", component: "Tank pressure valve", status: "Due Soon", dueDate: "2026-07-08", owner: "HazMat Maintenance" },
  { id: "MNT-003", vehicleId: "TRK-221", component: "Cargo smoke sensor", status: "Scheduled", dueDate: "2026-07-10", owner: "Battery Logistics" },
  { id: "MNT-004", vehicleId: "CHM-730", component: "Thermal insulation", status: "Due Soon", dueDate: "2026-07-09", owner: "Chemical Fleet" },
  { id: "MNT-005", vehicleId: "FUEL-808", component: "Fuel line inspection", status: "Overdue", dueDate: "2026-07-03", owner: "Fuel Fleet" },
  { id: "MNT-006", vehicleId: "COLD-330", component: "Refrigeration compressor", status: "Scheduled", dueDate: "2026-07-12", owner: "Cold Chain Ops" }
];
