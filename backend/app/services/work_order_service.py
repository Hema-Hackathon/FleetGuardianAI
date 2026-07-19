from __future__ import annotations

from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.time import format_ist, now_ist_for_db
from app.models.work_order import WorkOrder
from app.schemas.fire_risk import CreateWorkOrderRequest


def _format_order(order: WorkOrder) -> dict[str, Any]:
    return {
        "id": order.id,
        "vehicleId": order.vehicle_id,
        "priority": order.priority,
        "action": order.action,
        "owner": order.owner,
        "createdAt": format_ist(order.created_at),
    }


def create_work_order(request: CreateWorkOrderRequest, db: Session) -> dict[str, Any]:
    now = now_ist_for_db()
    order = WorkOrder(
        vehicle_id=request.vehicle_id,
        priority=request.priority,
        action=request.action,
        owner=request.owner,
        created_at=now,
        updated_at=now,
    )

    try:
        db.add(order)
        db.commit()
        db.refresh(order)
    except Exception:
        db.rollback()
        raise

    return _format_order(order)


def list_work_orders(db: Session) -> list[dict[str, Any]]:
    orders = db.scalars(
        select(WorkOrder).order_by(WorkOrder.created_at.desc())
    ).all()
    return [_format_order(order) for order in orders]
