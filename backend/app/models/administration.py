from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.audit_base import AuditBase


class AppModule(Base, AuditBase):
    __tablename__ = "app_modules"

    id: Mapped[str] = mapped_column(String(60), primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    path: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)


class AppUser(Base, AuditBase):
    __tablename__ = "app_users"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    email: Mapped[str] = mapped_column(String(160), nullable=False, unique=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    role_title: Mapped[str] = mapped_column(String(80), nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="Active", nullable=False, index=True)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class Role(Base, AuditBase):
    __tablename__ = "roles"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)


class UserRole(Base, AuditBase):
    __tablename__ = "user_roles"

    user_id: Mapped[str] = mapped_column(String(40), primary_key=True)
    role_id: Mapped[str] = mapped_column(String(40), primary_key=True)


class ComplianceStandard(Base, AuditBase):
    __tablename__ = "compliance_standards"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    code: Mapped[str] = mapped_column(String(80), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    regulator: Mapped[str] = mapped_column(String(120), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    effective_from: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)


class ComplianceCheck(Base, AuditBase):
    __tablename__ = "compliance_checks"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    vehicle_id: Mapped[str | None] = mapped_column(String(50), nullable=True, index=True)
    standard_id: Mapped[str] = mapped_column(String(40), nullable=False, index=True)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    checked_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    owner: Mapped[str] = mapped_column(String(100), nullable=False)


class RiskRule(Base, AuditBase):
    __tablename__ = "risk_rules"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    module: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(140), nullable=False)
    parameter: Mapped[str] = mapped_column(String(80), nullable=False)
    operator: Mapped[str] = mapped_column(String(20), nullable=False)
    threshold_value: Mapped[float] = mapped_column(Float, nullable=False)
    severity: Mapped[str] = mapped_column(String(20), nullable=False)
    enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Integration(Base, AuditBase):
    __tablename__ = "integrations"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    system_type: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    last_sync_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class AIInvestigation(Base, AuditBase):
    __tablename__ = "ai_investigations"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    incident_id: Mapped[str | None] = mapped_column(String(40), nullable=True, index=True)
    vehicle_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(40), nullable=False, index=True)
    root_cause: Mapped[str] = mapped_column(Text, nullable=False)
    confidence: Mapped[int] = mapped_column(Integer, nullable=False)
    opened_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class AIAssistantSession(Base, AuditBase):
    __tablename__ = "ai_assistant_sessions"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    user_id: Mapped[str | None] = mapped_column(String(40), nullable=True, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    last_message_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
