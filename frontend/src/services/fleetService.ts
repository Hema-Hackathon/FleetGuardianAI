import {
  alerts,
  depots,
  drivers,
  incidents,
  maintenanceRecords,
  notifications,
  reports,
  riskAssessments,
  sensorReadings,
  vehicles,
} from "../mock-data";
import type {
  Alert,
  Depot,
  Driver,
  Incident,
  MaintenanceRecord,
  NotificationItem,
  ReportItem,
  RiskAssessment,
  SensorReading,
  Vehicle,
} from "../types/domain";
import { formatClock, formatIsoDate, formatRelativeTime, formatReportDateTime } from "../utils/dateTime";
import { getJson } from "./apiClient";

export interface FleetDataService {
  getVehicles(): Promise<Vehicle[]>;
  getDrivers(): Promise<Driver[]>;
  getDepots(): Promise<Depot[]>;
  getAlerts(): Promise<Alert[]>;
  getIncidents(): Promise<Incident[]>;
  getMaintenanceRecords(): Promise<MaintenanceRecord[]>;
  getRiskAssessments(): Promise<RiskAssessment[]>;
  getSensorReadings(): Promise<SensorReading[]>;
  getNotifications(): Promise<NotificationItem[]>;
  getReports(): Promise<ReportItem[]>;
  getVehicleById(vehicleId: string): Promise<Vehicle | undefined>;
  getRiskAssessment(vehicleId: string): Promise<RiskAssessment | undefined>;
  getSensorReading(vehicleId: string): Promise<SensorReading | undefined>;
}

const delay = async <T,>(data: T): Promise<T> => data;

const vehicleMinuteOffsets = [0, 2, 4, 5, 7, 8, 11, 12, 14, 17, 20, 21];
const alertMinuteOffsets = [0, 5, 12, 15, 18, 22, 28];
const incidentMinuteOffsets = [42, 35, 22, 90];
const riskMinuteOffsets = [0, 5, 12];

function currentVehicles(): Vehicle[] {
  return vehicles.map((vehicle, index) => ({
    ...vehicle,
    lastUpdated: formatClock(vehicleMinuteOffsets[index] ?? index * 2),
  }));
}

function currentAlerts(): Alert[] {
  return alerts.map((alert, index) => ({
    ...alert,
    time: formatClock(alertMinuteOffsets[index] ?? index * 3),
  }));
}

function currentIncidents(): Incident[] {
  return incidents.map((incident, index) => ({
    ...incident,
    startedAt: formatClock(incidentMinuteOffsets[index] ?? index * 10),
  }));
}

function currentMaintenanceRecords(): MaintenanceRecord[] {
  return maintenanceRecords.map((record, index) => {
    const offset = record.status === "Overdue" ? -(index + 1) : record.status === "Due Soon" ? index + 1 : index + 4;
    return { ...record, dueDate: formatIsoDate(offset) };
  });
}

function currentRiskAssessments(): RiskAssessment[] {
  return riskAssessments.map((risk, index) => ({
    ...risk,
    updatedAt: formatClock(riskMinuteOffsets[index] ?? index * 4),
  }));
}

function currentNotifications(): NotificationItem[] {
  return notifications.map((notification, index) => ({
    ...notification,
    time: formatRelativeTime([2, 5, 12, 30][index] ?? index * 5),
  }));
}

function currentReports(): ReportItem[] {
  return reports.map((report, index) => ({
    ...report,
    generatedAt: formatReportDateTime([120, 660, 1560, 3060][index] ?? index * 720),
  }));
}

export const mockFleetService: FleetDataService = {
  getVehicles: () => delay(currentVehicles()),
  getDrivers: () => delay(drivers),
  getDepots: () => delay(depots),
  getAlerts: () => delay(currentAlerts()),
  getIncidents: () => delay(currentIncidents()),
  getMaintenanceRecords: () => delay(currentMaintenanceRecords()),
  getRiskAssessments: () => delay(currentRiskAssessments()),
  getSensorReadings: () => delay(sensorReadings),
  getNotifications: () => delay(currentNotifications()),
  getReports: () => delay(currentReports()),
  getVehicleById: (vehicleId) => delay(currentVehicles().find((vehicle) => vehicle.id === vehicleId)),
  getRiskAssessment: (vehicleId) => delay(currentRiskAssessments().find((risk) => risk.vehicleId === vehicleId)),
  getSensorReading: (vehicleId) => delay(sensorReadings.find((sensor) => sensor.vehicleId === vehicleId)),
};

async function withFallback<T>(apiCall: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch {
    return fallback();
  }
}

export const backendFleetService: FleetDataService = {
  getVehicles: () => withFallback(() => getJson<Vehicle[]>("/api/fleet/vehicles"), mockFleetService.getVehicles),
  getDrivers: () => withFallback(() => getJson<Driver[]>("/api/fleet/drivers"), mockFleetService.getDrivers),
  getDepots: () => withFallback(() => getJson<Depot[]>("/api/fleet/depots"), mockFleetService.getDepots),
  getAlerts: () => withFallback(() => getJson<Alert[]>("/api/fleet/alerts"), mockFleetService.getAlerts),
  getIncidents: () => withFallback(() => getJson<Incident[]>("/api/fleet/incidents"), mockFleetService.getIncidents),
  getMaintenanceRecords: () =>
    withFallback(() => getJson<MaintenanceRecord[]>("/api/fleet/maintenance-records"), mockFleetService.getMaintenanceRecords),
  getRiskAssessments: () =>
    withFallback(() => getJson<RiskAssessment[]>("/api/fleet/risk-assessments"), mockFleetService.getRiskAssessments),
  getSensorReadings: () =>
    withFallback(() => getJson<SensorReading[]>("/api/fleet/sensor-readings"), mockFleetService.getSensorReadings),
  getNotifications: () => withFallback(() => getJson<NotificationItem[]>("/api/fleet/notifications"), mockFleetService.getNotifications),
  getReports: () => withFallback(() => getJson<ReportItem[]>("/api/fleet/reports"), mockFleetService.getReports),
  getVehicleById: (vehicleId) =>
    withFallback(() => getJson<Vehicle>(`/api/fleet/vehicles/${encodeURIComponent(vehicleId)}`), () => mockFleetService.getVehicleById(vehicleId)),
  getRiskAssessment: (vehicleId) =>
    withFallback(
      () => getJson<RiskAssessment>(`/api/fleet/risk-assessments/${encodeURIComponent(vehicleId)}`),
      () => mockFleetService.getRiskAssessment(vehicleId),
    ),
  getSensorReading: (vehicleId) =>
    withFallback(
      () => getJson<SensorReading>(`/api/fleet/sensor-readings/${encodeURIComponent(vehicleId)}`),
      () => mockFleetService.getSensorReading(vehicleId),
    ),
};

export const fleetService = backendFleetService;
