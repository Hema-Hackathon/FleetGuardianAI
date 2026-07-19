from __future__ import annotations

from uuid import uuid4

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.audit_base import AuditBase


def make_work_order_id() -> str:
    return f"WO-{uuid4().hex[:8].upper()}"


class WorkOrder(Base, AuditBase):
    __tablename__ = "work_orders"

    id: Mapped[str] = mapped_column(String(20), primary_key=True, default=make_work_order_id)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    priority: Mapped[str] = mapped_column(String(20), nullable=False)
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    owner: Mapped[str] = mapped_column(String(80), nullable=False)
