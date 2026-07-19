import { useEffect, useState } from "react";
import { fleetService } from "../services/fleetService";
import { useAppContext } from "../store/useAppContext";
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

export interface FleetDataState {
  vehicles: Vehicle[];
  drivers: Driver[];
  depots: Depot[];
  alerts: Alert[];
  incidents: Incident[];
  maintenanceRecords: MaintenanceRecord[];
  riskAssessments: RiskAssessment[];
  sensorReadings: SensorReading[];
  notifications: NotificationItem[];
  reports: ReportItem[];
  loading: boolean;
}

const initialState: FleetDataState = {
  vehicles: [],
  drivers: [],
  depots: [],
  alerts: [],
  incidents: [],
  maintenanceRecords: [],
  riskAssessments: [],
  sensorReadings: [],
  notifications: [],
  reports: [],
  loading: true,
};

export function useFleetData(): FleetDataState {
  const { refreshVersion } = useAppContext();
  const [state, setState] = useState<FleetDataState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [
        vehiclesResult,
        driversResult,
        depotsResult,
        alertsResult,
        incidentsResult,
        maintenanceResult,
        riskResult,
        sensorResult,
        notificationResult,
        reportResult,
      ] = await Promise.all([
        fleetService.getVehicles(),
        fleetService.getDrivers(),
        fleetService.getDepots(),
        fleetService.getAlerts(),
        fleetService.getIncidents(),
        fleetService.getMaintenanceRecords(),
        fleetService.getRiskAssessments(),
        fleetService.getSensorReadings(),
        fleetService.getNotifications(),
        fleetService.getReports(),
      ]);

      if (mounted) {
        setState({
          vehicles: vehiclesResult,
          drivers: driversResult,
          depots: depotsResult,
          alerts: alertsResult,
          incidents: incidentsResult,
          maintenanceRecords: maintenanceResult,
          riskAssessments: riskResult,
          sensorReadings: sensorResult,
          notifications: notificationResult,
          reports: reportResult,
          loading: false,
        });
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, [refreshVersion]);

  return state;
}
