import type { Alert } from "../types/domain";

export const alerts: Alert[] = [
  { id: "ALT-001", vehicleId: "BUS-104", title: "Battery Overheat Detected", detail: "Cell temperature exceeded safe operating band.", severity: "Critical", time: "10:30 AM", acknowledged: false },
  { id: "ALT-002", vehicleId: "LPG-412", title: "High Fire Risk Detected", detail: "Pressure variance and route heat exposure increased.", severity: "Critical", time: "10:25 AM", acknowledged: false },
  { id: "ALT-003", vehicleId: "TRK-221", title: "Smoke Detected", detail: "Smoke sensor trend crossed threshold for 3 minutes.", severity: "High", time: "10:18 AM", acknowledged: true },
  { id: "ALT-004", vehicleId: "CHM-730", title: "Chemical Tank Thermal Warning", detail: "Tank surface temperature rising faster than expected.", severity: "High", time: "10:15 AM", acknowledged: false },
  { id: "ALT-005", vehicleId: "FUEL-808", title: "Fuel Line Pressure Drop", detail: "Possible leak pattern detected near rear valve assembly.", severity: "High", time: "10:12 AM", acknowledged: false },
  { id: "ALT-006", vehicleId: "AMB-222", title: "Electrical Load Spike", detail: "Medical equipment load and alternator current spike observed.", severity: "Medium", time: "10:08 AM", acknowledged: true },
  { id: "ALT-007", vehicleId: "COLD-330", title: "Refrigeration Unit Heat", detail: "Compressor heat is above expected operating range.", severity: "Medium", time: "10:02 AM", acknowledged: true }
];
