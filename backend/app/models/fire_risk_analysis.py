from __future__ import annotations

from uuid import UUID, uuid4

from sqlalchemy import JSON, Boolean, Float, Integer, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.audit_base import AuditBase


class FireRiskAnalysis(Base, AuditBase):
    __tablename__ = "fire_risk_analysis"

    id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid4)

    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False)

    battery_temperature: Mapped[float] = mapped_column(Float, nullable=False)

    cell_temperature: Mapped[float | None] = mapped_column(Float, nullable=True)

    ambient_temperature: Mapped[float] = mapped_column(Float, nullable=False)

    battery_voltage: Mapped[float] = mapped_column(Float, nullable=False)

    battery_current: Mapped[float] = mapped_column(Float, nullable=False)

    smoke_detected: Mapped[bool] = mapped_column(Boolean, nullable=False)

    smoke_level: Mapped[float | None] = mapped_column(Float, nullable=True)

    gas_detected: Mapped[bool] = mapped_column(Boolean, nullable=False)

    gas_concentration: Mapped[float | None] = mapped_column(Float, nullable=True)

    coolant_level: Mapped[float] = mapped_column(Float, nullable=False)

    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)

    risk_level: Mapped[str] = mapped_column(String(20), nullable=False)

    contributing_factors: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)

    recommendations: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)

    status: Mapped[str] = mapped_column(String(20), nullable=False)
