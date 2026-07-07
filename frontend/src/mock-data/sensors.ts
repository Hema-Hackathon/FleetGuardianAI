import type { SensorReading } from "../types/domain";

export const sensorReadings: SensorReading[] = [
  { vehicleId: "BUS-104", batteryTemp: 91.2, cellTempMax: 92.4, cellTempMin: 88.1, batteryVoltage: 703.2, currentAmp: 312.4, smokeLevel: 86, gasPpm: 45, soc: 68, insulationKohm: 120, trend: [48, 54, 58, 64, 71, 69, 77, 83, 91, 94] },
  { vehicleId: "LPG-412", batteryTemp: 56.4, cellTempMax: 58.1, cellTempMin: 51.9, batteryVoltage: 24.8, currentAmp: 44.2, smokeLevel: 22, gasPpm: 76, soc: 92, insulationKohm: 480, trend: [42, 48, 55, 62, 69, 74, 80, 84, 89, 92] },
  { vehicleId: "TRK-221", batteryTemp: 78.7, cellTempMax: 80.5, cellTempMin: 74.9, batteryVoltage: 680.5, currentAmp: 266.1, smokeLevel: 72, gasPpm: 52, soc: 61, insulationKohm: 190, trend: [36, 44, 51, 57, 64, 69, 73, 79, 83, 87] },
  { vehicleId: "CHM-730", batteryTemp: 64.8, cellTempMax: 66.4, cellTempMin: 61.2, batteryVoltage: 25.2, currentAmp: 58.6, smokeLevel: 38, gasPpm: 62, soc: 88, insulationKohm: 340, trend: [48, 52, 56, 61, 64, 68, 74, 79, 85, 89] },
  { vehicleId: "FUEL-808", batteryTemp: 62.1, cellTempMax: 64.0, cellTempMin: 58.7, batteryVoltage: 24.4, currentAmp: 49.5, smokeLevel: 26, gasPpm: 68, soc: 90, insulationKohm: 430, trend: [32, 38, 43, 48, 53, 57, 64, 68, 72, 74] },
  { vehicleId: "TRK-120", batteryTemp: 48.3, cellTempMax: 50.1, cellTempMin: 45.6, batteryVoltage: 24.2, currentAmp: 33.7, smokeLevel: 12, gasPpm: 19, soc: 84, insulationKohm: 520, trend: [25, 28, 31, 33, 37, 41, 45, 49, 53, 58] }
];
