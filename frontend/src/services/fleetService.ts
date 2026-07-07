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

export const mockFleetService: FleetDataService = {
  getVehicles: () => delay(vehicles),
  getDrivers: () => delay(drivers),
  getDepots: () => delay(depots),
  getAlerts: () => delay(alerts),
  getIncidents: () => delay(incidents),
  getMaintenanceRecords: () => delay(maintenanceRecords),
  getRiskAssessments: () => delay(riskAssessments),
  getSensorReadings: () => delay(sensorReadings),
  getNotifications: () => delay(notifications),
  getReports: () => delay(reports),
  getVehicleById: (vehicleId) => delay(vehicles.find((vehicle) => vehicle.id === vehicleId)),
  getRiskAssessment: (vehicleId) => delay(riskAssessments.find((risk) => risk.vehicleId === vehicleId)),
  getSensorReading: (vehicleId) => delay(sensorReadings.find((sensor) => sensor.vehicleId === vehicleId)),
};
