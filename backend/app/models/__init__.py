from app.models.administration import (
    AIAssistantSession,
    AIInvestigation,
    AppModule,
    AppUser,
    ComplianceCheck,
    ComplianceStandard,
    Integration,
    RiskRule,
    Role,
    UserRole,
)
from app.models.fire_risk_analysis import FireRiskAnalysis
from app.models.fleet import Depot, Driver, Vehicle
from app.models.operations import (
    Alert,
    Incident,
    MaintenanceRecord,
    Notification,
    Report,
    RiskAssessment,
    SensorReading,
)
from app.models.work_order import WorkOrder

__all__ = [
    "AIAssistantSession",
    "AIInvestigation",
    "Alert",
    "AppModule",
    "AppUser",
    "ComplianceCheck",
    "ComplianceStandard",
    "Depot",
    "Driver",
    "FireRiskAnalysis",
    "Incident",
    "Integration",
    "MaintenanceRecord",
    "Notification",
    "Report",
    "RiskAssessment",
    "RiskRule",
    "Role",
    "SensorReading",
    "UserRole",
    "Vehicle",
    "WorkOrder",
]
