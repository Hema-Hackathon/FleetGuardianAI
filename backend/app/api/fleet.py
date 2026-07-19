from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.time import now_ist_for_db
from app.db.session import get_db
from app.models.operations import SensorReading
from app.services.fleet_data import all_records, find_by_id

router = APIRouter(prefix="/api/fleet", tags=["Fleet"])


class SensorReadingCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    vehicle_id: str = Field(..., alias="vehicleId")
    battery_temp: float = Field(..., alias="batteryTemp")
    cell_temp_max: float = Field(..., alias="cellTempMax")
    cell_temp_min: float = Field(..., alias="cellTempMin")
    battery_voltage: float = Field(..., alias="batteryVoltage")
    current_amp: float = Field(..., alias="currentAmp")
    smoke_level: float = Field(..., alias="smokeLevel")
    gas_ppm: float = Field(..., alias="gasPpm")
    soc: float
    insulation_kohm: float = Field(..., alias="insulationKohm")
    trend: list[int] = Field(default_factory=list)


def _sensor_response(reading: SensorReading) -> dict[str, Any]:
    return {
        "id": str(reading.id),
        "vehicleId": reading.vehicle_id,
        "batteryTemp": reading.battery_temp,
        "cellTempMax": reading.cell_temp_max,
        "cellTempMin": reading.cell_temp_min,
        "batteryVoltage": reading.battery_voltage,
        "currentAmp": reading.current_amp,
        "smokeLevel": reading.smoke_level,
        "gasPpm": reading.gas_ppm,
        "soc": reading.soc,
        "insulationKohm": reading.insulation_kohm,
        "trend": reading.trend,
        "capturedAt": reading.captured_at.isoformat(),
    }


@router.get("/summary")
def get_summary() -> dict[str, Any]:
    vehicles = all_records("vehicles")
    alerts = all_records("alerts")
    incidents = all_records("incidents")
    critical_vehicles = [vehicle for vehicle in vehicles if vehicle["riskLevel"] == "Critical"]
    open_alerts = [alert for alert in alerts if not alert["acknowledged"]]

    return {
        "totalVehicles": len(vehicles),
        "criticalVehicles": len(critical_vehicles),
        "openAlerts": len(open_alerts),
        "activeIncidents": len(incidents),
        "averageRiskScore": round(sum(vehicle["riskScore"] for vehicle in vehicles) / len(vehicles)),
    }


@router.get("/vehicles")
def get_vehicles() -> list[dict[str, Any]]:
    return all_records("vehicles")


@router.get("/vehicles/{vehicle_id}")
def get_vehicle(vehicle_id: str) -> dict[str, Any]:
    vehicle = find_by_id(all_records("vehicles"), "id", vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


@router.get("/drivers")
def get_drivers() -> list[dict[str, Any]]:
    return all_records("drivers")


@router.get("/depots")
def get_depots() -> list[dict[str, Any]]:
    return all_records("depots")


@router.get("/alerts")
def get_alerts() -> list[dict[str, Any]]:
    return all_records("alerts")


@router.get("/incidents")
def get_incidents() -> list[dict[str, Any]]:
    return all_records("incidents")


@router.get("/maintenance-records")
def get_maintenance_records() -> list[dict[str, Any]]:
    return all_records("maintenance-records")


@router.get("/risk-assessments")
def get_risk_assessments() -> list[dict[str, Any]]:
    return all_records("risk-assessments")


@router.get("/risk-assessments/{vehicle_id}")
def get_risk_assessment(vehicle_id: str) -> dict[str, Any]:
    risk = find_by_id(all_records("risk-assessments"), "vehicleId", vehicle_id)
    if not risk:
        raise HTTPException(status_code=404, detail="Risk assessment not found")
    return risk


@router.get("/sensor-readings")
def get_sensor_readings(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    readings = db.scalars(
        select(SensorReading).order_by(SensorReading.captured_at.desc())
    ).all()

    latest_by_vehicle: dict[str, SensorReading] = {}
    for reading in readings:
        latest_by_vehicle.setdefault(reading.vehicle_id, reading)

    return [_sensor_response(reading) for reading in latest_by_vehicle.values()]


@router.post("/sensor-readings", status_code=status.HTTP_201_CREATED)
def create_sensor_reading(
    request: SensorReadingCreate,
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    reading = SensorReading(
        vehicle_id=request.vehicle_id,
        battery_temp=request.battery_temp,
        cell_temp_max=request.cell_temp_max,
        cell_temp_min=request.cell_temp_min,
        battery_voltage=request.battery_voltage,
        current_amp=request.current_amp,
        smoke_level=request.smoke_level,
        gas_ppm=request.gas_ppm,
        soc=request.soc,
        insulation_kohm=request.insulation_kohm,
        trend=request.trend,
        captured_at=now_ist_for_db(),
    )
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return _sensor_response(reading)


@router.get("/sensor-readings/{vehicle_id}")
def get_sensor_reading(
    vehicle_id: str,
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    sensor = db.scalar(
        select(SensorReading)
        .where(SensorReading.vehicle_id == vehicle_id)
        .order_by(SensorReading.captured_at.desc())
        .limit(1)
    )
    if sensor is None:
        raise HTTPException(status_code=404, detail="Sensor reading not found")
    return _sensor_response(sensor)


@router.get("/notifications")
def get_notifications() -> list[dict[str, Any]]:
    return all_records("notifications")


@router.get("/reports")
def get_reports() -> list[dict[str, Any]]:
    return all_records("reports")
