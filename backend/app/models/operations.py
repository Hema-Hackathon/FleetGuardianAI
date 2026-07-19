from __future__ import annotations

from datetime import date, datetime
from uuid import UUID, uuid4

from sqlalchemy import Boolean, Date, DateTime, Float, Integer, JSON, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.audit_base import AuditBase


class SensorReading(Base, AuditBase):
    __tablename__ = "sensor_readings"

    id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid4)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    battery_temp: Mapped[float] = mapped_column(Float, nullable=False)
    cell_temp_max: Mapped[float] = mapped_column(Float, nullable=False)
    cell_temp_min: Mapped[float] = mapped_column(Float, nullable=False)
    battery_voltage: Mapped[float] = mapped_column(Float, nullable=False)
    current_amp: Mapped[float] = mapped_column(Float, nullable=False)
    smoke_level: Mapped[float] = mapped_column(Float, nullable=False)
    gas_ppm: Mapped[float] = mapped_column(Float, nullable=False)
    soc: Mapped[float] = mapped_column(Float, nullable=False)
    insulation_kohm: Mapped[float] = mapped_column(Float, nullable=False)
    trend: Mapped[list[int]] = mapped_column(JSON, default=list, nullable=False)
    captured_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)


class Alert(Base, AuditBase):
    __tablename__ = "alerts"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    detail: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    detected_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    acknowledged: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    acknowledged_by: Mapped[str | None] = mapped_column(String(80), nullable=True)
    acknowledged_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class Incident(Base, AuditBase):
    __tablename__ = "incidents"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False, index=True)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    location: Mapped[str] = mapped_column(String(160), nullable=False)
    response_owner: Mapped[str] = mapped_column(String(100), nullable=False)
    estimated_loss_cr: Mapped[float] = mapped_column(Float, default=0, nullable=False)


class RiskAssessment(Base, AuditBase):
    __tablename__ = "risk_assessments"

    id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid4)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    overall_score: Mapped[int] = mapped_column(Integer, nullable=False)
    confidence: Mapped[int] = mapped_column(Integer, nullable=False)
    top_factors: Mapped[list[dict[str, object]]] = mapped_column(JSON, default=list, nullable=False)
    recommendations: Mapped[list[dict[str, object]]] = mapped_column(JSON, default=list, nullable=False)
    assessed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)


class MaintenanceRecord(Base, AuditBase):
    __tablename__ = "maintenance_records"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    component: Mapped[str] = mapped_column(String(140), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    due_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    owner: Mapped[str] = mapped_column(String(100), nullable=False)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class Notification(Base, AuditBase):
    __tablename__ = "notifications"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    title: Mapped[str] = mapped_column(String(140), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    read_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class Report(Base, AuditBase):
    __tablename__ = "reports"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    generated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    owner: Mapped[str] = mapped_column(String(100), nullable=False)
    file_uri: Mapped[str | None] = mapped_column(String(255), nullable=True)
