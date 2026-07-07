import type { Incident } from "../types/domain";

export const incidents: Incident[] = [
  { id: "INC-2401", vehicleId: "BUS-187", title: "Passenger bus electrical fire risk", status: "Ongoing", startedAt: "09:48 AM", location: "Sitapura Road", responseOwner: "North Control Center", estimatedLossCr: 0.8 },
  { id: "INC-2402", vehicleId: "LPG-412", title: "LPG tanker pressure escalation", status: "Under Response", startedAt: "09:55 AM", location: "NH44, Panipat", responseOwner: "HazMat Desk", estimatedLossCr: 3.2 },
  { id: "INC-2403", vehicleId: "TRK-221", title: "Battery cargo smoke alert", status: "Under Response", startedAt: "10:08 AM", location: "Tumkur Highway", responseOwner: "EV Safety Cell", estimatedLossCr: 1.6 },
  { id: "INC-2404", vehicleId: "FUEL-808", title: "Fuel system inspection", status: "Resolved", startedAt: "08:15 AM", location: "Pune Bypass", responseOwner: "West Control", estimatedLossCr: 0.2 },
  { id: "INC-2405", vehicleId: "COLD-330", title: "Refrigeration unit fire near miss", status: "Resolved", startedAt: "Yesterday", location: "NH45, Salem", responseOwner: "South Control", estimatedLossCr: 0.3 }
];
