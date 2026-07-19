import { getJson, postJson } from "./apiClient";
import { fleetService } from "./fleetService";
import type { RiskLevel } from "../types/domain";
import { formatControlCenterDateTime } from "../utils/dateTime";

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

export interface AnalyzeFireRiskInput {
  vehicleId: string;
  batteryTemperature: number;
  cellTemperature?: number;
  ambientTemperature: number;
  batteryVoltage: number;
  batteryCurrent: number;
  smokeDetected: boolean;
  smokeLevel?: number;
  gasDetected: boolean;
  gasConcentration?: number;
  coolantLevel: number;
}

export interface FireRiskAnalysis {
  analysisId: string;
  timestamp: string;
  vehicleId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  contributingFactors: string[];
  recommendations: string[];
  llmSummary: string;
  llmProvider: string;
  llmModel: string;
  llmStatus: string;
  status: string;
}

interface ApiFireRiskAnalysis {
  analysis_id: string;
  timestamp: string;
  vehicle_id: string;
  risk_score: number;
  risk_level: string;
  contributing_factors: string[];
  recommendations: string[];
  llm_summary: string;
  llm_provider: string;
  llm_model: string;
  llm_status: string;
  status: string;
}

function normalizeRiskLevel(level: string): RiskLevel {
  const normalized = level.toLowerCase();
  if (normalized === "critical") return "Critical";
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";
  return "Low";
}

function mapAnalysis(response: ApiFireRiskAnalysis): FireRiskAnalysis {
  return {
    analysisId: response.analysis_id,
    timestamp: response.timestamp,
    vehicleId: response.vehicle_id,
    riskScore: response.risk_score,
    riskLevel: normalizeRiskLevel(response.risk_level),
    contributingFactors: response.contributing_factors,
    recommendations: response.recommendations,
    llmSummary: response.llm_summary,
    llmProvider: response.llm_provider,
    llmModel: response.llm_model,
    llmStatus: response.llm_status,
    status: response.status,
  };
}

function fallbackAnalyze(input: AnalyzeFireRiskInput): FireRiskAnalysis {
  let score = 0;
  const factors: string[] = [];
  const recommendations: string[] = [];

  if (input.batteryTemperature > 60) {
    score += 35;
    factors.push("High battery temperature");
    recommendations.push("Inspect battery cooling system.");
  }
  if ((input.cellTemperature ?? 0) > 75) {
    score += 20;
    factors.push("High cell temperature");
    recommendations.push("Inspect cell temperature imbalance.");
  }
  if (input.ambientTemperature > 45) {
    score += 10;
    factors.push("Extreme ambient temperature");
    recommendations.push("Move vehicle to shaded area.");
  }
  if (input.smokeDetected || (input.smokeLevel ?? 0) > 70) {
    score += 30;
    factors.push("Smoke detected");
    recommendations.push("Stop vehicle immediately.");
  }
  if (input.gasDetected || (input.gasConcentration ?? 0) > 65) {
    score += 25;
    factors.push("Gas concentration above safe threshold");
    recommendations.push("Move vehicle to isolation area and inspect leakage source.");
  }
  if (input.batteryCurrent > 250) {
    score += 10;
    factors.push("High current draw");
    recommendations.push("Reduce load and inspect power electronics.");
  }
  if (input.batteryVoltage > 700) {
    score += 5;
    factors.push("High battery voltage");
    recommendations.push("Review BMS voltage logs.");
  }

  const riskScore = Math.min(score, 100);
  const riskLevel = riskScore < 25 ? "Low" : riskScore < 50 ? "Medium" : riskScore < 75 ? "High" : "Critical";

  return {
    analysisId: "LOCAL-FALLBACK",
    timestamp: new Date().toISOString(),
    vehicleId: input.vehicleId,
    riskScore,
    riskLevel,
    contributingFactors: factors,
    recommendations: recommendations.length ? recommendations : ["Vehicle operating within safe limits."],
    llmSummary: "Local LLM explanation is unavailable while the backend is offline.",
    llmProvider: "Ollama",
    llmModel: "phi3:mini",
    llmStatus: "UNAVAILABLE",
    status: "FALLBACK",
  };
}

export async function analyzeFireRisk(input: AnalyzeFireRiskInput): Promise<FireRiskAnalysis> {
  try {
    const response = await postJson<ApiFireRiskAnalysis, AnalyzeFireRiskInput>("/api/fire-risk/analyze", input);
    return mapAnalysis(response);
  } catch {
    return fallbackAnalyze(input);
  }
}

export async function createPreventiveWorkOrder(input: CreateWorkOrderInput): Promise<CreatedWorkOrder> {
  try {
    return await postJson<CreatedWorkOrder, CreateWorkOrderInput>("/api/fire-risk/work-orders", input);
  } catch {
    return {
      id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
      ...input,
      createdAt: formatControlCenterDateTime(new Date()),
    };
  }
}

export async function getFirePreventionSnapshot(vehicleId: string) {
  try {
    return await getJson(`/api/fire-risk/snapshot/${encodeURIComponent(vehicleId)}`);
  } catch {
    const [vehicle, risk, sensor, alerts] = await Promise.all([
      fleetService.getVehicleById(vehicleId),
      fleetService.getRiskAssessment(vehicleId),
      fleetService.getSensorReading(vehicleId),
      fleetService.getAlerts(),
    ]);

    return {
      vehicle,
      risk,
      sensor,
      alerts: alerts.filter((alert) => alert.vehicleId === vehicleId),
    };
  }
}
