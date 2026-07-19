from __future__ import annotations

from collections.abc import Callable
from datetime import date, datetime, timedelta
from typing import Any
from zoneinfo import ZoneInfo

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

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

APP_TIME_ZONE = ZoneInfo("Asia/Kolkata")


def _now_utc() -> datetime:
    return datetime.utcnow()


def _today_ist() -> date:
    return datetime.now(APP_TIME_ZONE).date()


def _minutes_ago(minutes: int) -> datetime:
    return _now_utc() - timedelta(minutes=minutes)


def _days_from_today(days: int) -> date:
    return _today_ist() + timedelta(days=days)


def _add_by_pk(session: Session, model: type, key: Any, values: dict[str, Any]) -> bool:
    if session.get(model, key) is not None:
        return False
    session.add(model(**values))
    return True


def _add_if_missing(
    session: Session,
    model: type,
    exists_query: Select[tuple[Any]],
    values: dict[str, Any],
) -> bool:
    if session.scalar(exists_query.limit(1)) is not None:
        return False
    session.add(model(**values))
    return True


def _seed_records(
    session: Session,
    table_name: str,
    model: type,
    records: list[dict[str, Any]],
    key_for: Callable[[dict[str, Any]], Any],
    inserted: dict[str, int],
) -> None:
    for record in records:
        if _add_by_pk(session, model, key_for(record), record):
            inserted[table_name] = inserted.get(table_name, 0) + 1


MODULES = [
    {"id": "dashboard", "name": "Dashboard", "path": "/dashboard", "status": "Prototype", "description": "Executive fleet fire risk overview."},
    {"id": "fleet", "name": "Fleet Management", "path": "/fleet", "status": "Prototype", "description": "Vehicle registry, depots, drivers, and fleet state."},
    {"id": "monitoring", "name": "Live Monitoring", "path": "/monitoring", "status": "Prototype", "description": "Live telemetry, route status, and alert feed."},
    {"id": "fire-prevention", "name": "AI Fire Prevention", "path": "/fire-prevention", "status": "Implemented", "description": "Flagship AI risk prediction and prevention module."},
    {"id": "incident-response", "name": "Incident Response", "path": "/incident-response", "status": "Prototype", "description": "Emergency workflows and active incident coordination."},
    {"id": "investigation", "name": "AI Investigation", "path": "/investigation", "status": "Prototype", "description": "Root cause analysis and investigation workspace."},
    {"id": "maintenance", "name": "Maintenance Intelligence", "path": "/maintenance", "status": "Prototype", "description": "Predictive maintenance and component risk planning."},
    {"id": "compliance", "name": "Compliance & Standards", "path": "/compliance", "status": "Prototype", "description": "CMVR/AIS compliance scoring and standards catalogue."},
    {"id": "analytics", "name": "Analytics & Reporting", "path": "/analytics", "status": "Prototype", "description": "Fleet trends, reports, and executive analytics."},
    {"id": "ai-assistant", "name": "AI Assistant", "path": "/ai-assistant", "status": "Prototype", "description": "Conversational fleet safety assistant preview."},
    {"id": "administration", "name": "Administration", "path": "/administration", "status": "Prototype", "description": "Users, roles, rules, thresholds, and integrations."},
]

DEPOTS = [
    {"id": "DEP-DEL", "name": "North Control Depot", "city": "New Delhi", "region": "North", "coordinate_x": 58, "coordinate_y": 37, "manager": "Ritika Sinha"},
    {"id": "DEP-GGN", "name": "Gurugram Safety Hub", "city": "Gurugram", "region": "North", "coordinate_x": 52, "coordinate_y": 58, "manager": "Anuj Mehta"},
    {"id": "DEP-BLR", "name": "Bengaluru EV Depot", "city": "Bengaluru", "region": "South", "coordinate_x": 54, "coordinate_y": 78, "manager": "Priya Nair"},
    {"id": "DEP-MUM", "name": "Mumbai Logistics Yard", "city": "Mumbai", "region": "West", "coordinate_x": 30, "coordinate_y": 64, "manager": "Karan Desai"},
    {"id": "DEP-VAD", "name": "Vadodara HazMat Base", "city": "Vadodara", "region": "West", "coordinate_x": 26, "coordinate_y": 52, "manager": "Hema Iyer"},
    {"id": "DEP-CHN", "name": "Chennai Cold Chain Park", "city": "Chennai", "region": "South", "coordinate_x": 62, "coordinate_y": 87, "manager": "Suresh Kumar"},
    {"id": "DEP-HYD", "name": "Hyderabad Fleet Center", "city": "Hyderabad", "region": "South", "coordinate_x": 48, "coordinate_y": 72, "manager": "Meera Rao"},
    {"id": "DEP-JAI", "name": "Jaipur Fuel Terminal", "city": "Jaipur", "region": "North", "coordinate_x": 43, "coordinate_y": 34, "manager": "Dev Malik"},
    {"id": "DEP-KOL", "name": "Kolkata Distribution Yard", "city": "Kolkata", "region": "East", "coordinate_x": 80, "coordinate_y": 55, "manager": "Arindam Sen"},
    {"id": "DEP-PUN", "name": "Pune Maintenance Base", "city": "Pune", "region": "West", "coordinate_x": 34, "coordinate_y": 68, "manager": "Nisha Patil"},
    {"id": "DEP-LKO", "name": "Lucknow Passenger Depot", "city": "Lucknow", "region": "North", "coordinate_x": 67, "coordinate_y": 42, "manager": "Vivek Tiwari"},
    {"id": "DEP-CJB", "name": "Coimbatore Industrial Yard", "city": "Coimbatore", "region": "South", "coordinate_x": 49, "coordinate_y": 90, "manager": "Ramesh Balan"},
]

DRIVERS = [
    {"id": "DRV-101", "name": "Aarav Sharma", "phone": "+91 98765 11001", "license_class": "HMV", "safety_score": 93, "assigned_vehicle_id": "BUS-104"},
    {"id": "DRV-102", "name": "Nikhil Verma", "phone": "+91 98765 11002", "license_class": "HazMat", "safety_score": 88, "assigned_vehicle_id": "TRK-221"},
    {"id": "DRV-103", "name": "Mehul Shah", "phone": "+91 98765 11003", "license_class": "HMV", "safety_score": 91, "assigned_vehicle_id": "VAN-309"},
    {"id": "DRV-104", "name": "Ravi Yadav", "phone": "+91 98765 11004", "license_class": "Passenger", "safety_score": 84, "assigned_vehicle_id": "BUS-187"},
    {"id": "DRV-105", "name": "Sanjay Rao", "phone": "+91 98765 11005", "license_class": "HMV", "safety_score": 89, "assigned_vehicle_id": "TRK-120"},
    {"id": "DRV-106", "name": "Imran Khan", "phone": "+91 98765 11006", "license_class": "HazMat", "safety_score": 78, "assigned_vehicle_id": "LPG-412"},
    {"id": "DRV-107", "name": "Leela Menon", "phone": "+91 98765 11007", "license_class": "EV", "safety_score": 95, "assigned_vehicle_id": "EVB-510"},
    {"id": "DRV-108", "name": "Deepak Singh", "phone": "+91 98765 11008", "license_class": "HMV", "safety_score": 81, "assigned_vehicle_id": "CHM-730"},
    {"id": "DRV-109", "name": "Farhan Ali", "phone": "+91 98765 11009", "license_class": "HazMat", "safety_score": 86, "assigned_vehicle_id": "FUEL-808"},
    {"id": "DRV-110", "name": "Kavya Reddy", "phone": "+91 98765 11010", "license_class": "Passenger", "safety_score": 92, "assigned_vehicle_id": "AMB-222"},
    {"id": "DRV-111", "name": "Manoj Kulkarni", "phone": "+91 98765 11011", "license_class": "HMV", "safety_score": 90, "assigned_vehicle_id": "COLD-330"},
    {"id": "DRV-112", "name": "Neeraj Bhat", "phone": "+91 98765 11012", "license_class": "HMV", "safety_score": 87, "assigned_vehicle_id": "MIN-611"},
]

VEHICLES = [
    {"id": "BUS-104", "registration": "KA-01-AA-104", "vehicle_type": "Electric Bus", "category": "Energy Storage", "cargo": "Passengers", "depot_id": "DEP-BLR", "driver_id": "DRV-101", "location": "Bengaluru Depot", "route": "Silk Board to Airport", "status": "Active", "risk_level": "Critical", "risk_score": 94, "last_updated_at": _minutes_ago(0), "asset_value_cr": 1.8, "compliance_score": 82, "coordinate_x": 54, "coordinate_y": 78},
    {"id": "TRK-221", "registration": "KA-01-BB-221", "vehicle_type": "Battery Truck", "category": "Energy Storage", "cargo": "Lithium Batteries", "depot_id": "DEP-GGN", "driver_id": "DRV-102", "location": "Tumkur Highway", "route": "Bengaluru to Pune", "status": "Active", "risk_level": "High", "risk_score": 87, "last_updated_at": _minutes_ago(2), "asset_value_cr": 1.4, "compliance_score": 76, "coordinate_x": 46, "coordinate_y": 64},
    {"id": "VAN-309", "registration": "KA-01-CC-309", "vehicle_type": "Pharma Van", "category": "High-Value Cargo", "cargo": "Pharmaceuticals", "depot_id": "DEP-CHN", "driver_id": "DRV-103", "location": "Mysore Road", "route": "Chennai to Bengaluru", "status": "Active", "risk_level": "Low", "risk_score": 22, "last_updated_at": _minutes_ago(4), "asset_value_cr": 0.9, "compliance_score": 94, "coordinate_x": 60, "coordinate_y": 82},
    {"id": "BUS-187", "registration": "KA-01-DD-187", "vehicle_type": "School Bus", "category": "Passenger Transport", "cargo": "Passengers", "depot_id": "DEP-LKO", "driver_id": "DRV-104", "location": "Sitapura Road", "route": "Lucknow City Loop", "status": "Incident", "risk_level": "Critical", "risk_score": 91, "last_updated_at": _minutes_ago(5), "asset_value_cr": 0.6, "compliance_score": 68, "coordinate_x": 68, "coordinate_y": 43},
    {"id": "TRK-120", "registration": "KA-01-EE-120", "vehicle_type": "General Cargo Truck", "category": "General Cargo", "cargo": "Consumer Goods", "depot_id": "DEP-MUM", "driver_id": "DRV-105", "location": "Nelamangala", "route": "Mumbai to Bengaluru", "status": "Active", "risk_level": "Medium", "risk_score": 58, "last_updated_at": _minutes_ago(7), "asset_value_cr": 0.5, "compliance_score": 88, "coordinate_x": 39, "coordinate_y": 66},
    {"id": "LPG-412", "registration": "DL-1LA-E-1234", "vehicle_type": "LPG Tanker", "category": "Explosive Cargo", "cargo": "LPG", "depot_id": "DEP-JAI", "driver_id": "DRV-106", "location": "NH44, Panipat", "route": "Jaipur to Panipat", "status": "Active", "risk_level": "Critical", "risk_score": 92, "last_updated_at": _minutes_ago(8), "asset_value_cr": 2.1, "compliance_score": 79, "coordinate_x": 48, "coordinate_y": 30},
    {"id": "EVB-510", "registration": "TN-09-EV-510", "vehicle_type": "Electric Bus", "category": "Energy Storage", "cargo": "Passengers", "depot_id": "DEP-CHN", "driver_id": "DRV-107", "location": "OMR Corridor", "route": "Chennai OMR", "status": "Active", "risk_level": "Medium", "risk_score": 49, "last_updated_at": _minutes_ago(11), "asset_value_cr": 1.7, "compliance_score": 91, "coordinate_x": 62, "coordinate_y": 88},
    {"id": "CHM-730", "registration": "GJ-05-BT-6789", "vehicle_type": "Chemical Tanker", "category": "Hazardous Chemicals", "cargo": "Industrial Solvent", "depot_id": "DEP-VAD", "driver_id": "DRV-108", "location": "NH48, Vadodara", "route": "Vadodara to Vapi", "status": "Active", "risk_level": "Critical", "risk_score": 89, "last_updated_at": _minutes_ago(12), "asset_value_cr": 2.4, "compliance_score": 74, "coordinate_x": 27, "coordinate_y": 52},
    {"id": "FUEL-808", "registration": "MH-12-FL-808", "vehicle_type": "Petrol Tanker", "category": "Flammable Liquids", "cargo": "Petrol", "depot_id": "DEP-PUN", "driver_id": "DRV-109", "location": "Pune Bypass", "route": "Pune to Nashik", "status": "Active", "risk_level": "High", "risk_score": 74, "last_updated_at": _minutes_ago(14), "asset_value_cr": 1.2, "compliance_score": 84, "coordinate_x": 35, "coordinate_y": 64},
    {"id": "AMB-222", "registration": "UP-32-AM-222", "vehicle_type": "Ambulance", "category": "Passenger Transport", "cargo": "Patients", "depot_id": "DEP-LKO", "driver_id": "DRV-110", "location": "Gomti Nagar", "route": "Hospital Response", "status": "Active", "risk_level": "High", "risk_score": 68, "last_updated_at": _minutes_ago(17), "asset_value_cr": 0.8, "compliance_score": 89, "coordinate_x": 69, "coordinate_y": 45},
    {"id": "COLD-330", "registration": "TN-09-CD-1357", "vehicle_type": "Cold Chain Truck", "category": "High-Value Cargo", "cargo": "Vaccines", "depot_id": "DEP-CHN", "driver_id": "DRV-111", "location": "NH45, Salem", "route": "Chennai to Coimbatore", "status": "Maintenance", "risk_level": "Medium", "risk_score": 55, "last_updated_at": _minutes_ago(20), "asset_value_cr": 1.1, "compliance_score": 86, "coordinate_x": 55, "coordinate_y": 90},
    {"id": "MIN-611", "registration": "OD-09-MD-611", "vehicle_type": "Mining Dumper", "category": "Heavy Equipment", "cargo": "Mining Material", "depot_id": "DEP-CJB", "driver_id": "DRV-112", "location": "Industrial Quarry", "route": "Mine Pit 4", "status": "Active", "risk_level": "High", "risk_score": 72, "last_updated_at": _minutes_ago(21), "asset_value_cr": 6.5, "compliance_score": 81, "coordinate_x": 50, "coordinate_y": 91},
]

SENSOR_READINGS = [
    {"vehicle_id": "BUS-104", "battery_temp": 91.2, "cell_temp_max": 92.4, "cell_temp_min": 88.1, "battery_voltage": 703.2, "current_amp": 312.4, "smoke_level": 86, "gas_ppm": 45, "soc": 68, "insulation_kohm": 120, "trend": [48, 54, 58, 64, 71, 69, 77, 83, 91, 94], "captured_at": _minutes_ago(0)},
    {"vehicle_id": "LPG-412", "battery_temp": 56.4, "cell_temp_max": 58.1, "cell_temp_min": 51.9, "battery_voltage": 24.8, "current_amp": 44.2, "smoke_level": 22, "gas_ppm": 76, "soc": 92, "insulation_kohm": 480, "trend": [42, 48, 55, 62, 69, 74, 80, 84, 89, 92], "captured_at": _minutes_ago(5)},
    {"vehicle_id": "TRK-221", "battery_temp": 78.7, "cell_temp_max": 80.5, "cell_temp_min": 74.9, "battery_voltage": 680.5, "current_amp": 266.1, "smoke_level": 72, "gas_ppm": 52, "soc": 61, "insulation_kohm": 190, "trend": [36, 44, 51, 57, 64, 69, 73, 79, 83, 87], "captured_at": _minutes_ago(12)},
    {"vehicle_id": "CHM-730", "battery_temp": 64.8, "cell_temp_max": 66.4, "cell_temp_min": 61.2, "battery_voltage": 25.2, "current_amp": 58.6, "smoke_level": 38, "gas_ppm": 62, "soc": 88, "insulation_kohm": 340, "trend": [48, 52, 56, 61, 64, 68, 74, 79, 85, 89], "captured_at": _minutes_ago(15)},
    {"vehicle_id": "FUEL-808", "battery_temp": 62.1, "cell_temp_max": 64.0, "cell_temp_min": 58.7, "battery_voltage": 24.4, "current_amp": 49.5, "smoke_level": 26, "gas_ppm": 68, "soc": 90, "insulation_kohm": 430, "trend": [32, 38, 43, 48, 53, 57, 64, 68, 72, 74], "captured_at": _minutes_ago(18)},
    {"vehicle_id": "TRK-120", "battery_temp": 48.3, "cell_temp_max": 50.1, "cell_temp_min": 45.6, "battery_voltage": 24.2, "current_amp": 33.7, "smoke_level": 12, "gas_ppm": 19, "soc": 84, "insulation_kohm": 520, "trend": [25, 28, 31, 33, 37, 41, 45, 49, 53, 58], "captured_at": _minutes_ago(22)},
]

ALERTS = [
    {"id": "ALT-001", "vehicle_id": "BUS-104", "title": "Battery Overheat Detected", "detail": "Cell temperature exceeded safe operating band.", "severity": "Critical", "detected_at": _minutes_ago(0), "acknowledged": False},
    {"id": "ALT-002", "vehicle_id": "LPG-412", "title": "High Fire Risk Detected", "detail": "Pressure variance and route heat exposure increased.", "severity": "Critical", "detected_at": _minutes_ago(5), "acknowledged": False},
    {"id": "ALT-003", "vehicle_id": "TRK-221", "title": "Smoke Detected", "detail": "Smoke sensor trend crossed threshold for 3 minutes.", "severity": "High", "detected_at": _minutes_ago(12), "acknowledged": True, "acknowledged_by": "EV Safety Cell", "acknowledged_at": _minutes_ago(9)},
    {"id": "ALT-004", "vehicle_id": "CHM-730", "title": "Chemical Tank Thermal Warning", "detail": "Tank surface temperature rising faster than expected.", "severity": "High", "detected_at": _minutes_ago(15), "acknowledged": False},
    {"id": "ALT-005", "vehicle_id": "FUEL-808", "title": "Fuel Line Pressure Drop", "detail": "Possible leak pattern detected near rear valve assembly.", "severity": "High", "detected_at": _minutes_ago(18), "acknowledged": False},
    {"id": "ALT-006", "vehicle_id": "AMB-222", "title": "Electrical Load Spike", "detail": "Medical equipment load and alternator current spike observed.", "severity": "Medium", "detected_at": _minutes_ago(22), "acknowledged": True, "acknowledged_by": "Control Center", "acknowledged_at": _minutes_ago(18)},
    {"id": "ALT-007", "vehicle_id": "COLD-330", "title": "Refrigeration Unit Heat", "detail": "Compressor heat is above expected operating range.", "severity": "Medium", "detected_at": _minutes_ago(28), "acknowledged": True, "acknowledged_by": "Cold Chain Ops", "acknowledged_at": _minutes_ago(24)},
]

INCIDENTS = [
    {"id": "INC-2401", "vehicle_id": "BUS-187", "title": "Passenger bus electrical fire risk", "status": "Ongoing", "started_at": _minutes_ago(42), "location": "Sitapura Road", "response_owner": "North Control Center", "estimated_loss_cr": 0.8},
    {"id": "INC-2402", "vehicle_id": "LPG-412", "title": "LPG tanker pressure escalation", "status": "Under Response", "started_at": _minutes_ago(35), "location": "NH44, Panipat", "response_owner": "HazMat Desk", "estimated_loss_cr": 3.2},
    {"id": "INC-2403", "vehicle_id": "TRK-221", "title": "Battery cargo smoke alert", "status": "Under Response", "started_at": _minutes_ago(22), "location": "Tumkur Highway", "response_owner": "EV Safety Cell", "estimated_loss_cr": 1.6},
    {"id": "INC-2404", "vehicle_id": "FUEL-808", "title": "Fuel system inspection", "status": "Resolved", "started_at": _minutes_ago(140), "resolved_at": _minutes_ago(40), "location": "Pune Bypass", "response_owner": "West Control", "estimated_loss_cr": 0.2},
    {"id": "INC-2405", "vehicle_id": "COLD-330", "title": "Refrigeration unit fire near miss", "status": "Resolved", "started_at": _minutes_ago(1440), "resolved_at": _minutes_ago(1260), "location": "NH45, Salem", "response_owner": "South Control", "estimated_loss_cr": 0.3},
]

RISK_ASSESSMENTS = [
    {
        "vehicle_id": "BUS-104",
        "overall_score": 94,
        "confidence": 92,
        "assessed_at": _minutes_ago(0),
        "top_factors": [
            {"name": "Battery Temperature", "score": 92, "severity": "Critical"},
            {"name": "Smoke Detected", "score": 87, "severity": "Critical"},
            {"name": "Cell Temperature Variation", "score": 81, "severity": "High"},
            {"name": "High Ambient Temperature", "score": 72, "severity": "High"},
        ],
        "recommendations": [
            {"action": "Stop vehicle operation", "priority": "Critical", "owner": "Driver"},
            {"action": "Move to safe zone", "priority": "High", "owner": "Driver"},
            {"action": "Inspect battery pack", "priority": "High", "owner": "Maintenance"},
            {"action": "Notify fleet control room", "priority": "Info", "owner": "Control Center"},
        ],
    },
    {
        "vehicle_id": "LPG-412",
        "overall_score": 92,
        "confidence": 89,
        "assessed_at": _minutes_ago(5),
        "top_factors": [
            {"name": "Tank Pressure Variance", "score": 91, "severity": "Critical"},
            {"name": "Route Heat Exposure", "score": 78, "severity": "High"},
            {"name": "Valve Inspection Overdue", "score": 70, "severity": "High"},
            {"name": "Cargo Explosion Severity", "score": 98, "severity": "Critical"},
        ],
        "recommendations": [
            {"action": "Reduce speed and avoid congestion", "priority": "High", "owner": "Driver"},
            {"action": "Route to isolation bay", "priority": "Critical", "owner": "Control Center"},
            {"action": "Prepare evacuation perimeter", "priority": "Critical", "owner": "Emergency Desk"},
            {"action": "Schedule valve inspection", "priority": "High", "owner": "Maintenance"},
        ],
    },
    {
        "vehicle_id": "TRK-221",
        "overall_score": 87,
        "confidence": 88,
        "assessed_at": _minutes_ago(12),
        "top_factors": [
            {"name": "Cargo Smoke Sensor", "score": 84, "severity": "High"},
            {"name": "Battery Cargo Temperature", "score": 79, "severity": "High"},
            {"name": "Ventilation Quality", "score": 66, "severity": "Medium"},
        ],
        "recommendations": [
            {"action": "Stop at nearest safe lay-by", "priority": "High", "owner": "Driver"},
            {"action": "Inspect cargo bay temperature", "priority": "High", "owner": "Maintenance"},
            {"action": "Notify EV safety team", "priority": "Info", "owner": "Control Center"},
        ],
    },
]

MAINTENANCE_RECORDS = [
    {"id": "MNT-001", "vehicle_id": "BUS-104", "component": "Battery cooling loop", "status": "Overdue", "due_date": _days_from_today(-3), "owner": "EV Safety Cell"},
    {"id": "MNT-002", "vehicle_id": "LPG-412", "component": "Tank pressure valve", "status": "Due Soon", "due_date": _days_from_today(1), "owner": "HazMat Maintenance"},
    {"id": "MNT-003", "vehicle_id": "TRK-221", "component": "Cargo smoke sensor", "status": "Scheduled", "due_date": _days_from_today(4), "owner": "Battery Logistics"},
    {"id": "MNT-004", "vehicle_id": "CHM-730", "component": "Thermal insulation", "status": "Due Soon", "due_date": _days_from_today(2), "owner": "Chemical Fleet"},
    {"id": "MNT-005", "vehicle_id": "FUEL-808", "component": "Fuel line inspection", "status": "Overdue", "due_date": _days_from_today(-2), "owner": "Fuel Fleet"},
    {"id": "MNT-006", "vehicle_id": "COLD-330", "component": "Refrigeration compressor", "status": "Scheduled", "due_date": _days_from_today(5), "owner": "Cold Chain Ops"},
]

NOTIFICATIONS = [
    {"id": "NOT-001", "title": "Critical fire risk", "message": "BUS-104 requires immediate driver action.", "severity": "Critical"},
    {"id": "NOT-002", "title": "HazMat route warning", "message": "LPG-412 entered a high-congestion segment.", "severity": "High"},
    {"id": "NOT-003", "title": "Maintenance due", "message": "Battery cooling inspection is overdue.", "severity": "Medium"},
    {"id": "NOT-004", "title": "Report ready", "message": "Daily Fire Risk Report generated.", "severity": "Info"},
]

REPORTS = [
    {"id": "RPT-001", "name": "Daily Risk Report", "category": "Operations", "generated_at": _minutes_ago(120), "owner": "Fleet Control"},
    {"id": "RPT-002", "name": "Weekly Risk Summary", "category": "Analytics", "generated_at": _minutes_ago(660), "owner": "Safety Ops"},
    {"id": "RPT-003", "name": "Monthly Incident Report", "category": "Compliance", "generated_at": _minutes_ago(1560), "owner": "Compliance"},
    {"id": "RPT-004", "name": "Standards Gap Assessment", "category": "Compliance", "generated_at": _minutes_ago(2400), "owner": "Audit Desk"},
]

ROLES = [
    {"id": "ROLE-ADMIN", "name": "Administrator", "description": "Full access to setup, users, rules, and integrations."},
    {"id": "ROLE-CONTROL", "name": "Control Center", "description": "Monitor fleet risk, acknowledge alerts, and coordinate response."},
    {"id": "ROLE-MAINT", "name": "Maintenance Lead", "description": "Own inspections, work orders, and preventive maintenance."},
    {"id": "ROLE-COMPLIANCE", "name": "Compliance Auditor", "description": "Review standards, checks, reports, and audit evidence."},
]

USERS = [
    {"id": "USR-001", "email": "control@fleetguardian.local", "full_name": "Fleet Control", "role_title": "Control Center", "status": "Active", "last_login_at": _minutes_ago(9)},
    {"id": "USR-002", "email": "maintenance@fleetguardian.local", "full_name": "Maintenance Lead", "role_title": "Maintenance Lead", "status": "Active", "last_login_at": _minutes_ago(44)},
    {"id": "USR-003", "email": "compliance@fleetguardian.local", "full_name": "Compliance Desk", "role_title": "Compliance Auditor", "status": "Active", "last_login_at": _minutes_ago(90)},
    {"id": "USR-004", "email": "admin@fleetguardian.local", "full_name": "System Admin", "role_title": "Administrator", "status": "Active", "last_login_at": _minutes_ago(15)},
]

USER_ROLES = [
    {"user_id": "USR-001", "role_id": "ROLE-CONTROL"},
    {"user_id": "USR-002", "role_id": "ROLE-MAINT"},
    {"user_id": "USR-003", "role_id": "ROLE-COMPLIANCE"},
    {"user_id": "USR-004", "role_id": "ROLE-ADMIN"},
]

COMPLIANCE_STANDARDS = [
    {"id": "STD-001", "code": "AIS-038", "title": "Electric power train safety", "regulator": "AIS", "category": "EV Safety", "description": "Safety checks for traction battery and electric drivetrain systems.", "effective_from": date(2024, 4, 1), "status": "Active"},
    {"id": "STD-002", "code": "CMVR-125C", "title": "Hazardous goods carriage", "regulator": "CMVR", "category": "HazMat", "description": "Vehicle and operator requirements for hazardous goods carriage.", "effective_from": date(2024, 1, 1), "status": "Active"},
    {"id": "STD-003", "code": "AIS-140", "title": "Vehicle location tracking", "regulator": "AIS", "category": "Telematics", "description": "Tracking and emergency button requirements for fleet vehicles.", "effective_from": date(2023, 10, 1), "status": "Active"},
    {"id": "STD-004", "code": "INTERNAL-FIRE-01", "title": "Fleet fire prevention checklist", "regulator": "FleetGuardian", "category": "Internal Safety", "description": "Internal fire prevention inspection baseline for high-risk vehicles.", "effective_from": _today_ist(), "status": "Draft"},
]

COMPLIANCE_CHECKS = [
    {"id": "CHK-001", "vehicle_id": "BUS-104", "standard_id": "STD-001", "score": 82, "status": "Needs Review", "checked_at": _minutes_ago(180), "owner": "Compliance Desk"},
    {"id": "CHK-002", "vehicle_id": "LPG-412", "standard_id": "STD-002", "score": 79, "status": "Needs Review", "checked_at": _minutes_ago(220), "owner": "HazMat Compliance"},
    {"id": "CHK-003", "vehicle_id": "TRK-221", "standard_id": "STD-001", "score": 76, "status": "Failed", "checked_at": _minutes_ago(260), "owner": "EV Safety Cell"},
    {"id": "CHK-004", "vehicle_id": "VAN-309", "standard_id": "STD-003", "score": 94, "status": "Passed", "checked_at": _minutes_ago(320), "owner": "Compliance Desk"},
    {"id": "CHK-005", "vehicle_id": None, "standard_id": "STD-004", "score": 88, "status": "Draft", "checked_at": _minutes_ago(480), "owner": "Safety Ops"},
]

RISK_RULES = [
    {"id": "RULE-001", "module": "AI Fire Prevention", "name": "Critical battery temperature", "parameter": "battery_temp", "operator": ">", "threshold_value": 85, "severity": "Critical", "enabled": True},
    {"id": "RULE-002", "module": "AI Fire Prevention", "name": "Smoke sensor high", "parameter": "smoke_level", "operator": ">", "threshold_value": 70, "severity": "Critical", "enabled": True},
    {"id": "RULE-003", "module": "Live Monitoring", "name": "Gas concentration warning", "parameter": "gas_ppm", "operator": ">", "threshold_value": 60, "severity": "High", "enabled": True},
    {"id": "RULE-004", "module": "Maintenance Intelligence", "name": "Inspection overdue", "parameter": "due_date_age_days", "operator": ">", "threshold_value": 0, "severity": "High", "enabled": True},
    {"id": "RULE-005", "module": "Compliance", "name": "Compliance score floor", "parameter": "compliance_score", "operator": "<", "threshold_value": 80, "severity": "High", "enabled": True},
]

INTEGRATIONS = [
    {"id": "INT-001", "name": "Vehicle Telematics Gateway", "system_type": "Telematics", "status": "Connected", "last_sync_at": _minutes_ago(1)},
    {"id": "INT-002", "name": "Maintenance ERP", "system_type": "ERP", "status": "Connected", "last_sync_at": _minutes_ago(18)},
    {"id": "INT-003", "name": "Emergency Dispatch", "system_type": "Response", "status": "Ready", "last_sync_at": _minutes_ago(6)},
    {"id": "INT-004", "name": "Compliance Document Store", "system_type": "Document", "status": "Pending", "last_sync_at": None},
]

AI_INVESTIGATIONS = [
    {"id": "INV-001", "incident_id": "INC-2401", "vehicle_id": "BUS-187", "status": "Open", "root_cause": "Likely electrical harness overheating near auxiliary load path.", "confidence": 74, "opened_at": _minutes_ago(38)},
    {"id": "INV-002", "incident_id": "INC-2402", "vehicle_id": "LPG-412", "status": "Open", "root_cause": "Tank pressure variance amplified by route heat exposure.", "confidence": 81, "opened_at": _minutes_ago(31)},
    {"id": "INV-003", "incident_id": "INC-2404", "vehicle_id": "FUEL-808", "status": "Closed", "root_cause": "Fuel line pressure drop traced to rear valve seal wear.", "confidence": 88, "opened_at": _minutes_ago(130), "closed_at": _minutes_ago(42)},
]

AI_ASSISTANT_SESSIONS = [
    {"id": "CHAT-001", "user_id": "USR-001", "title": "Critical risk triage", "status": "Open", "started_at": _minutes_ago(25), "last_message_at": _minutes_ago(3)},
    {"id": "CHAT-002", "user_id": "USR-003", "title": "Compliance report prep", "status": "Open", "started_at": _minutes_ago(75), "last_message_at": _minutes_ago(12)},
]


def seed_database(session: Session) -> dict[str, int]:
    inserted: dict[str, int] = {}

    _seed_records(session, "app_modules", AppModule, MODULES, lambda record: record["id"], inserted)
    _seed_records(session, "depots", Depot, DEPOTS, lambda record: record["id"], inserted)
    _seed_records(session, "drivers", Driver, DRIVERS, lambda record: record["id"], inserted)
    _seed_records(session, "vehicles", Vehicle, VEHICLES, lambda record: record["id"], inserted)
    _seed_records(session, "alerts", Alert, ALERTS, lambda record: record["id"], inserted)
    _seed_records(session, "incidents", Incident, INCIDENTS, lambda record: record["id"], inserted)
    _seed_records(session, "maintenance_records", MaintenanceRecord, MAINTENANCE_RECORDS, lambda record: record["id"], inserted)
    _seed_records(session, "notifications", Notification, NOTIFICATIONS, lambda record: record["id"], inserted)
    _seed_records(session, "reports", Report, REPORTS, lambda record: record["id"], inserted)
    _seed_records(session, "roles", Role, ROLES, lambda record: record["id"], inserted)
    _seed_records(session, "app_users", AppUser, USERS, lambda record: record["id"], inserted)
    _seed_records(session, "user_roles", UserRole, USER_ROLES, lambda record: (record["user_id"], record["role_id"]), inserted)
    _seed_records(session, "compliance_standards", ComplianceStandard, COMPLIANCE_STANDARDS, lambda record: record["id"], inserted)
    _seed_records(session, "compliance_checks", ComplianceCheck, COMPLIANCE_CHECKS, lambda record: record["id"], inserted)
    _seed_records(session, "risk_rules", RiskRule, RISK_RULES, lambda record: record["id"], inserted)
    _seed_records(session, "integrations", Integration, INTEGRATIONS, lambda record: record["id"], inserted)
    _seed_records(session, "ai_investigations", AIInvestigation, AI_INVESTIGATIONS, lambda record: record["id"], inserted)
    _seed_records(session, "ai_assistant_sessions", AIAssistantSession, AI_ASSISTANT_SESSIONS, lambda record: record["id"], inserted)

    for record in SENSOR_READINGS:
        if _add_if_missing(
            session,
            SensorReading,
            select(SensorReading.id).where(SensorReading.vehicle_id == record["vehicle_id"]),
            record,
        ):
            inserted["sensor_readings"] = inserted.get("sensor_readings", 0) + 1

    for record in RISK_ASSESSMENTS:
        if _add_if_missing(
            session,
            RiskAssessment,
            select(RiskAssessment.id).where(RiskAssessment.vehicle_id == record["vehicle_id"]),
            record,
        ):
            inserted["risk_assessments"] = inserted.get("risk_assessments", 0) + 1

    session.commit()
    return inserted
