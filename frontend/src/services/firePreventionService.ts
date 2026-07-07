import { mockFleetService } from "./fleetService";

export interface CreateWorkOrderInput {
  vehicleId: string;
  priority: string;
  action: string;
  owner: string;
}

export interface CreatedWorkOrder {
  id: string;
  vehicleId: string;
  priority: string;
  action: string;
  owner: string;
  createdAt: string;
}

export async function createPreventiveWorkOrder(input: CreateWorkOrderInput): Promise<CreatedWorkOrder> {
  return {
    id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
    ...input,
    createdAt: new Date().toLocaleString("en-IN"),
  };
}

export async function getFirePreventionSnapshot(vehicleId: string) {
  const [vehicle, risk, sensor, alerts] = await Promise.all([
    mockFleetService.getVehicleById(vehicleId),
    mockFleetService.getRiskAssessment(vehicleId),
    mockFleetService.getSensorReading(vehicleId),
    mockFleetService.getAlerts(),
  ]);

  return {
    vehicle,
    risk,
    sensor,
    alerts: alerts.filter((alert) => alert.vehicleId === vehicleId),
  };
}
