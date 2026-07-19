from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.fire_risk import (
    CreatedWorkOrder,
    CreateWorkOrderRequest,
    FireRiskRequest,
    FireRiskResponse,
)

from app.services.fire_risk_service import FireRiskService
from app.services.fleet_data import all_records, find_by_id
from app.services.work_order_service import (
    create_work_order as create_persisted_work_order,
    list_work_orders,
)

router = APIRouter()


@router.post(
    "/analyze",
    response_model=FireRiskResponse,
)
def analyze_fire_risk(
    request: FireRiskRequest,
    db: Session = Depends(get_db),
) -> FireRiskResponse:
    return FireRiskService.analyze(request, db)


@router.get("/snapshot/{vehicle_id}")
def get_fire_prevention_snapshot(vehicle_id: str) -> dict[str, Any]:
    vehicle = find_by_id(all_records("vehicles"), "id", vehicle_id)
    risk = find_by_id(all_records("risk-assessments"), "vehicleId", vehicle_id)
    sensor = find_by_id(all_records("sensor-readings"), "vehicleId", vehicle_id)
    alerts = [
        alert
        for alert in all_records("alerts")
        if alert["vehicleId"] == vehicle_id
    ]

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    return {
        "vehicle": vehicle,
        "risk": risk,
        "sensor": sensor,
        "alerts": alerts,
    }


@router.post(
    "/work-orders",
    response_model=CreatedWorkOrder,
)
def create_preventive_work_order(
    request: CreateWorkOrderRequest,
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    vehicle = find_by_id(all_records("vehicles"), "id", request.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    return create_persisted_work_order(request, db)


@router.get("/work-orders")
def get_work_orders(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    return list_work_orders(db)
