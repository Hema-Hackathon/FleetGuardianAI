export type RiskLevel = "Critical" | "High" | "Medium" | "Low";
export type ModuleStatus = "Prototype" | "Implemented" | "Planned";
export type VehicleStatus = "Active" | "Maintenance" | "Stopped" | "Incident";
export type AlertSeverity = "Critical" | "High" | "Medium" | "Info";
export type IncidentStatus = "Ongoing" | "Under Response" | "Resolved";

export interface Depot {
  id: string;
  name: string;
  city: string;
  region: string;
  coordinates: { x: number; y: number };
  manager: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseClass: string;
  safetyScore: number;
  assignedVehicleId: string;
}

export interface Vehicle {
  id: string;
  registration: string;
  type: string;
  category: string;
  cargo: string;
  depotId: string;
  driverId: string;
  location: string;
  route: string;
  status: VehicleStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  lastUpdated: string;
  assetValueCr: number;
  complianceScore: number;
  coordinates: { x: number; y: number };
}

export interface Alert {
  id: string;
  vehicleId: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  time: string;
  acknowledged: boolean;
}

export interface Incident {
  id: string;
  vehicleId: string;
  title: string;
  status: IncidentStatus;
  startedAt: string;
  location: string;
  responseOwner: string;
  estimatedLossCr: number;
}

export interface RiskAssessment {
  vehicleId: string;
  overallScore: number;
  confidence: number;
  topFactors: Array<{ name: string; score: number; severity: AlertSeverity }>;
  recommendations: Array<{ action: string; priority: AlertSeverity; owner: string }>;
  updatedAt: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  component: string;
  status: "Overdue" | "Due Soon" | "Scheduled" | "Closed";
  dueDate: string;
  owner: string;
}

export interface SensorReading {
  vehicleId: string;
  batteryTemp: number;
  cellTempMax: number;
  cellTempMin: number;
  batteryVoltage: number;
  currentAmp: number;
  smokeLevel: number;
  gasPpm: number;
  soc: number;
  insulationKohm: number;
  trend: number[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  severity: AlertSeverity;
}

export interface ReportItem {
  id: string;
  name: string;
  category: string;
  generatedAt: string;
  owner: string;
}

export interface ModuleSummary {
  id: string;
  name: string;
  path: string;
  status: ModuleStatus;
  description: string;
}
