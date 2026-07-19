from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.audit_base import AuditBase


class Depot(Base, AuditBase):
    __tablename__ = "depots"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    region: Mapped[str] = mapped_column(String(40), nullable=False, index=True)
    coordinate_x: Mapped[float] = mapped_column(Float, nullable=False)
    coordinate_y: Mapped[float] = mapped_column(Float, nullable=False)
    manager: Mapped[str] = mapped_column(String(100), nullable=False)


class Driver(Base, AuditBase):
    __tablename__ = "drivers"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(30), nullable=False)
    license_class: Mapped[str] = mapped_column(String(40), nullable=False)
    safety_score: Mapped[int] = mapped_column(Integer, nullable=False)
    assigned_vehicle_id: Mapped[str | None] = mapped_column(String(50), nullable=True, index=True)


class Vehicle(Base, AuditBase):
    __tablename__ = "vehicles"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    registration: Mapped[str] = mapped_column(String(40), nullable=False, unique=True)
    vehicle_type: Mapped[str] = mapped_column(String(80), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    cargo: Mapped[str] = mapped_column(String(120), nullable=False)
    depot_id: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    driver_id: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    location: Mapped[str] = mapped_column(String(160), nullable=False)
    route: Mapped[str] = mapped_column(String(160), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    risk_level: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    last_updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    asset_value_cr: Mapped[float] = mapped_column(Float, nullable=False)
    compliance_score: Mapped[int] = mapped_column(Integer, nullable=False)
    coordinate_x: Mapped[float] = mapped_column(Float, nullable=False)
    coordinate_y: Mapped[float] = mapped_column(Float, nullable=False)
