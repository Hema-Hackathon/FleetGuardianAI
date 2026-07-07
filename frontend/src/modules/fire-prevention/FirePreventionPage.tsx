import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, BatteryCharging, Flame, Gauge, RadioTower, ShieldCheck, Thermometer, Truck, Zap } from "lucide-react";
import { SensorSparkline } from "../../components/charts/SensorSparkline";
import { Button } from "../../components/common/Button";
import { MetricCard } from "../../components/common/MetricCard";
import { PageHeader } from "../../components/common/PageHeader";
import { SectionCard } from "../../components/common/SectionCard";
import { Select } from "../../components/common/Select";
import { StatusBadge } from "../../components/common/StatusBadge";
import { WorkOrderForm } from "../../components/forms/WorkOrderForm";
import { DataTable } from "../../components/tables/DataTable";
import { useFleetData } from "../../hooks/useFleetData";
import type { Vehicle } from "../../types/domain";
import { riskColor } from "../../utils/format";

const columns: ColumnDef<Vehicle>[] = [
  { accessorKey: "id", header: "Vehicle" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "riskScore", header: "Risk Score" },
  { accessorKey: "riskLevel", header: "Risk Level", cell: ({ row }) => <StatusBadge value={row.original.riskLevel} /> },
  { accessorKey: "complianceScore", header: "Compliance" },
];

function CircularRiskScore({ score, label }: { score: number; label: string }) {
  const color = score >= 85 ? "#ef4444" : score >= 70 ? "#f97316" : score >= 45 ? "#facc15" : "#22c55e";
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-36 w-36 rounded-full" style={{ background: `conic-gradient(${color} ${score * 3.6}deg, rgba(51,65,85,.8) 0deg)` }}>
        <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-[#071525] text-center">
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-xs font-semibold" style={{ color }}>{label}</span>
        </div>
      </div>
      <div className="space-y-3 text-sm text-slate-300">
        <div><span className="text-slate-500">Mode:</span> AI risk prediction</div>
        <div><span className="text-slate-500">Data:</span> live-ready mock services</div>
        <div><span className="text-slate-500">Action:</span> prevention workflow</div>
      </div>
    </div>
  );
}

function SensorTile({ label, value, unit, danger, trend }: { label: string; value: number | string; unit?: string; danger?: boolean; trend: number[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className={danger ? "mt-1 text-2xl font-bold text-red-200" : "mt-1 text-2xl font-bold text-emerald-200"}>{value} {unit}</div>
      <SensorSparkline values={trend} color={danger ? "#ef4444" : "#22c55e"} />
    </div>
  );
}

export function FirePreventionPage() {
  const { vehicles, alerts, maintenanceRecords, riskAssessments, sensorReadings } = useFleetData();
  const highRiskVehicles = vehicles.filter((vehicle) => vehicle.riskScore >= 55);
  const [selectedVehicleId, setSelectedVehicleId] = useState("BUS-104");

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0],
    [selectedVehicleId, vehicles],
  );
  const risk = useMemo(
    () => riskAssessments.find((assessment) => assessment.vehicleId === selectedVehicle?.id) ?? riskAssessments[0],
    [riskAssessments, selectedVehicle],
  );
  const sensor = useMemo(
    () => sensorReadings.find((reading) => reading.vehicleId === selectedVehicle?.id) ?? sensorReadings[0],
    [sensorReadings, selectedVehicle],
  );

  if (!selectedVehicle || !risk || !sensor) {
    return null;
  }

  const selectedAlerts = alerts.filter((alert) => alert.vehicleId === selectedVehicle.id);
  const suggestedAction = risk.recommendations[0]?.action ?? "Inspect vehicle fire risk signals";

  return (
    <div>
      <PageHeader
        title="AI Fire Prevention"
        description="Implemented flagship module for AI risk scoring, live sensor monitoring, prevention recommendations, and future backend integration."
        badge={<div className="flex gap-2"><StatusBadge value="Implemented" /><StatusBadge value="Live Ready" /></div>}
        actions={<Button variant="danger"><Flame className="h-4 w-4" />Panic / Emergency Alert</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Overall Risk Score" value={risk.overallScore} helper={`${risk.confidence}% confidence`} icon={Gauge} tone={risk.overallScore > 85 ? "red" : "orange"} />
        <MetricCard label="Critical Vehicles" value={vehicles.filter((vehicle) => vehicle.riskLevel === "Critical").length} helper="Active now" icon={AlertTriangle} tone="red" />
        <MetricCard label="Live Sensors" value="8" helper="Signals evaluated" icon={RadioTower} tone="blue" />
        <MetricCard label="Preventive Actions" value={risk.recommendations.length} helper="AI recommended" icon={ShieldCheck} tone="green" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.1fr_1fr]">
        <SectionCard
          title="AI Fire Prevention Dashboard"
          action={<StatusBadge value={selectedVehicle.riskLevel} />}
        >
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_160px]">
            <Select value={selectedVehicleId} onChange={(event) => setSelectedVehicleId(event.target.value)}>
              {highRiskVehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.id} - {vehicle.type}</option>)}
            </Select>
            <div className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-100">Live Ready</div>
          </div>
          <CircularRiskScore score={risk.overallScore} label={selectedVehicle.riskLevel} />
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-slate-800 bg-slate-950/35 p-3"><div className="text-slate-500">Vehicle</div><div className="font-semibold text-white">{selectedVehicle.registration}</div></div>
            <div className="rounded-md border border-slate-800 bg-slate-950/35 p-3"><div className="text-slate-500">Route</div><div className="font-semibold text-white">{selectedVehicle.route}</div></div>
          </div>
        </SectionCard>

        <SectionCard title="Live Sensor Monitoring">
          <div className="grid gap-3 md:grid-cols-2">
            <SensorTile label="Battery Temp" value={sensor.batteryTemp} unit="C" danger={sensor.batteryTemp > 75} trend={sensor.trend} />
            <SensorTile label="Cell Temp Max" value={sensor.cellTempMax} unit="C" danger={sensor.cellTempMax > 75} trend={sensor.trend.map((value) => value - 2)} />
            <SensorTile label="Smoke Level" value={sensor.smokeLevel > 80 ? "High" : sensor.smokeLevel} danger={sensor.smokeLevel > 70} trend={sensor.trend.map((value) => value - 8)} />
            <SensorTile label="Battery Voltage" value={sensor.batteryVoltage} unit="V" trend={sensor.trend.map((value) => value / 2)} />
            <SensorTile label="Current" value={sensor.currentAmp} unit="A" trend={sensor.trend.map((value) => value / 3)} />
            <SensorTile label="Gas Concentration" value={sensor.gasPpm} unit="PPM" danger={sensor.gasPpm > 65} trend={sensor.trend.map((value) => value - 14)} />
          </div>
        </SectionCard>

        <SectionCard title="Risk Assessment (AI)">
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-center">
            <div className="text-sm text-slate-400">Risk Score</div>
            <div className="mt-1 text-5xl font-bold" style={{ color: riskColor(selectedVehicle.riskLevel) }}>{risk.overallScore}</div>
            <StatusBadge value={selectedVehicle.riskLevel} className="mt-3" />
          </div>
          <div className="mt-4 space-y-3">
            {risk.topFactors.map((factor) => (
              <div key={factor.name} className="text-sm">
                <div className="mb-1 flex items-center justify-between gap-3"><span className="text-slate-300">{factor.name}</span><span className="font-semibold text-white">{factor.score}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full" style={{ width: `${factor.score}%`, backgroundColor: riskColor(factor.severity) }} /></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
        <SectionCard title="AI Prevention Recommendations">
          <div className="space-y-3">
            {risk.recommendations.map((item) => (
              <div key={item.action} className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-950/35 p-3">
                <div className="flex items-center gap-3"><Zap className="h-4 w-4 text-blue-300" /><div><div className="font-semibold text-white">{item.action}</div><div className="text-xs text-slate-500">Owner: {item.owner}</div></div></div>
                <StatusBadge value={item.priority} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Create Preventive Work Order">
          <WorkOrderForm vehicleId={selectedVehicle.id} suggestedAction={suggestedAction} />
        </SectionCard>
        <SectionCard title="Active Signals and Alerts">
          <div className="space-y-3">
            {selectedAlerts.length ? selectedAlerts.map((alert) => (
              <div key={alert.id} className="rounded-md border border-slate-800 bg-slate-950/35 p-3">
                <div className="flex items-center justify-between"><span className="font-semibold text-white">{alert.title}</span><StatusBadge value={alert.severity} /></div>
                <p className="mt-1 text-sm text-slate-400">{alert.detail}</p>
              </div>
            )) : <div className="rounded-md border border-slate-800 bg-slate-950/35 p-4 text-sm text-slate-400">No active alerts for this selected vehicle.</div>}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <SectionCard title="High-Risk Vehicle Queue">
          <DataTable data={highRiskVehicles} columns={columns} />
        </SectionCard>
        <SectionCard title="Compliance and Maintenance Signals">
          <div className="space-y-3">
            <div className="rounded-md border border-slate-800 bg-slate-950/35 p-3"><div className="flex items-center justify-between"><span className="text-slate-300">Compliance Score</span><span className="font-bold text-white">{selectedVehicle.complianceScore}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${selectedVehicle.complianceScore}%` }} /></div></div>
            {maintenanceRecords.filter((record) => record.vehicleId === selectedVehicle.id).map((record) => (
              <div key={record.id} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/35 p-3"><span>{record.component}</span><StatusBadge value={record.status} /></div>
            ))}
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
              <div className="rounded-md border border-slate-800 p-3"><Thermometer className="mx-auto mb-1 h-4 w-4 text-red-300" />Thermal</div>
              <div className="rounded-md border border-slate-800 p-3"><BatteryCharging className="mx-auto mb-1 h-4 w-4 text-emerald-300" />BMS</div>
              <div className="rounded-md border border-slate-800 p-3"><Truck className="mx-auto mb-1 h-4 w-4 text-blue-300" />Vehicle</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
