import type { RiskAssessment } from "../types/domain";

export const riskAssessments: RiskAssessment[] = [
  {
    vehicleId: "BUS-104",
    overallScore: 94,
    confidence: 92,
    updatedAt: "10:30 AM",
    topFactors: [
      { name: "Battery Temperature", score: 92, severity: "Critical" },
      { name: "Smoke Detected", score: 87, severity: "Critical" },
      { name: "Cell Temperature Variation", score: 81, severity: "High" },
      { name: "High Ambient Temperature", score: 72, severity: "High" },
      { name: "Voltage Fluctuation", score: 61, severity: "Medium" }
    ],
    recommendations: [
      { action: "Stop vehicle operation", priority: "Critical", owner: "Driver" },
      { action: "Move to safe zone", priority: "High", owner: "Driver" },
      { action: "Inspect battery pack", priority: "High", owner: "Maintenance" },
      { action: "Activate cooling system", priority: "Medium", owner: "Vehicle System" },
      { action: "Notify fleet control room", priority: "Info", owner: "Control Center" }
    ]
  },
  {
    vehicleId: "LPG-412",
    overallScore: 92,
    confidence: 89,
    updatedAt: "10:25 AM",
    topFactors: [
      { name: "Tank Pressure Variance", score: 91, severity: "Critical" },
      { name: "Route Heat Exposure", score: 78, severity: "High" },
      { name: "Valve Inspection Overdue", score: 70, severity: "High" },
      { name: "Cargo Explosion Severity", score: 98, severity: "Critical" }
    ],
    recommendations: [
      { action: "Reduce speed and avoid congestion", priority: "High", owner: "Driver" },
      { action: "Route to isolation bay", priority: "Critical", owner: "Control Center" },
      { action: "Prepare evacuation perimeter", priority: "Critical", owner: "Emergency Desk" },
      { action: "Schedule valve inspection", priority: "High", owner: "Maintenance" }
    ]
  },
  {
    vehicleId: "TRK-221",
    overallScore: 87,
    confidence: 88,
    updatedAt: "10:18 AM",
    topFactors: [
      { name: "Cargo Smoke Sensor", score: 84, severity: "High" },
      { name: "Battery Cargo Temperature", score: 79, severity: "High" },
      { name: "Ventilation Quality", score: 66, severity: "Medium" },
      { name: "Maintenance Deviation", score: 58, severity: "Medium" }
    ],
    recommendations: [
      { action: "Stop at nearest safe lay-by", priority: "High", owner: "Driver" },
      { action: "Inspect cargo bay temperature", priority: "High", owner: "Maintenance" },
      { action: "Notify EV safety team", priority: "Info", owner: "Control Center" }
    ]
  }
];
