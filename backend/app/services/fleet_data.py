from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timedelta
from itertools import count
from typing import Any
from zoneinfo import ZoneInfo

WORK_ORDER_COUNTER = count(1001)
APP_TIME_ZONE = ZoneInfo("Asia/Kolkata")


def _now() -> datetime:
    return datetime.now(APP_TIME_ZONE)


def _clock(minutes_ago: int = 0) -> str:
    return (_now() - timedelta(minutes=minutes_ago)).strftime("%I:%M %p")


def _relative(minutes_ago: int) -> str:
    if minutes_ago < 1:
        return "Just now"
    if minutes_ago == 1:
        return "1 min ago"
    return f"{minutes_ago} min ago"


def _date(days_from_now: int = 0) -> str:
    return (_now() + timedelta(days=days_from_now)).strftime("%Y-%m-%d")


def _report_time(minutes_ago: int = 0) -> str:
    return (_now() - timedelta(minutes=minutes_ago)).strftime("%Y-%m-%d %I:%M %p")

DEPOTS: list[dict[str, Any]] = [
    {"id": "DEP-BLR", "name": "Bengaluru EV Depot", "city": "Bengaluru", "region": "South", "coordinates": {"x": 54, "y": 78}, "manager": "Ananya Rao"},
    {"id": "DEP-GGN", "name": "Gurugram Logistics Hub", "city": "Gurugram", "region": "North", "coordinates": {"x": 44, "y": 31}, "manager": "Rohit Mehra"},
    {"id": "DEP-CHN", "name": "Chennai Fleet Yard", "city": "Chennai", "region": "South", "coordinates": {"x": 62, "y": 88}, "manager": "Divya Raman"},
    {"id": "DEP-LKO", "name": "Lucknow Response Base", "city": "Lucknow", "region": "North", "coordinates": {"x": 69, "y": 45}, "manager": "Iqbal Khan"},
    {"id": "DEP-PUN", "name": "Pune Fuel Depot", "city": "Pune", "region": "West", "coordinates": {"x": 35, "y": 64}, "manager": "Mira Kulkarni"},
]

DRIVERS: list[dict[str, Any]] = [
    {"id": "DRV-101", "name": "Arjun Nair", "phone": "+91 90000 10101", "licenseClass": "HMV", "safetyScore": 91, "assignedVehicleId": "BUS-104"},
    {"id": "DRV-102", "name": "Kavya Singh", "phone": "+91 90000 10102", "licenseClass": "HazMat", "safetyScore": 86, "assignedVehicleId": "TRK-221"},
    {"id": "DRV-103", "name": "Suresh Menon", "phone": "+91 90000 10103", "licenseClass": "LMV", "safetyScore": 94, "assignedVehicleId": "VAN-309"},
    {"id": "DRV-104", "name": "Farhan Ali", "phone": "+91 90000 10104", "licenseClass": "Passenger", "safetyScore": 78, "assignedVehicleId": "BUS-187"},
    {"id": "DRV-105", "name": "Nisha Patil", "phone": "+91 90000 10105", "licenseClass": "HMV", "safetyScore": 88, "assignedVehicleId": "TRK-120"},
]

VEHICLES: list[dict[str, Any]] = [
    {"id": "BUS-104", "registration": "KA-01-AA-104", "type": "Electric Bus", "category": "Energy Storage", "cargo": "Passengers", "depotId": "DEP-BLR", "driverId": "DRV-101", "location": "Bengaluru Depot", "route": "Silk Board to Airport", "status": "Active", "riskLevel": "Critical", "riskScore": 94, "lastUpdated": "10:30 AM", "assetValueCr": 1.8, "complianceScore": 82, "coordinates": {"x": 54, "y": 78}},
    {"id": "TRK-221", "registration": "KA-01-BB-221", "type": "Battery Truck", "category": "Energy Storage", "cargo": "Lithium Batteries", "depotId": "DEP-GGN", "driverId": "DRV-102", "location": "Tumkur Highway", "route": "Bengaluru to Pune", "status": "Active", "riskLevel": "High", "riskScore": 87, "lastUpdated": "10:28 AM", "assetValueCr": 1.4, "complianceScore": 76, "coordinates": {"x": 46, "y": 64}},
    {"id": "VAN-309", "registration": "KA-01-CC-309", "type": "Pharma Van", "category": "High-Value Cargo", "cargo": "Pharmaceuticals", "depotId": "DEP-CHN", "driverId": "DRV-103", "location": "Mysore Road", "route": "Chennai to Bengaluru", "status": "Active", "riskLevel": "Low", "riskScore": 22, "lastUpdated": "10:26 AM", "assetValueCr": 0.9, "complianceScore": 94, "coordinates": {"x": 60, "y": 82}},
    {"id": "BUS-187", "registration": "KA-01-DD-187", "type": "School Bus", "category": "Passenger Transport", "cargo": "Passengers", "depotId": "DEP-LKO", "driverId": "DRV-104", "location": "Sitapura Road", "route": "Lucknow City Loop", "status": "Incident", "riskLevel": "Critical", "riskScore": 91, "lastUpdated": "10:25 AM", "assetValueCr": 0.6, "complianceScore": 68, "coordinates": {"x": 68, "y": 43}},
    {"id": "LPG-412", "registration": "DL-1LA-E-1234", "type": "LPG Tanker", "category": "Explosive Cargo", "cargo": "LPG", "depotId": "DEP-JAI", "driverId": "DRV-106", "location": "NH44, Panipat", "route": "Jaipur to Panipat", "status": "Active", "riskLevel": "Critical", "riskScore": 92, "lastUpdated": "10:22 AM", "assetValueCr": 2.1, "complianceScore": 79, "coordinates": {"x": 48, "y": 30}},
    {"id": "FUEL-808", "registration": "MH-12-FL-808", "type": "Petrol Tanker", "category": "Flammable Liquids", "cargo": "Petrol", "depotId": "DEP-PUN", "driverId": "DRV-109", "location": "Pune Bypass", "route": "Pune to Nashik", "status": "Active", "riskLevel": "High", "riskScore": 74, "lastUpdated": "10:16 AM", "assetValueCr": 1.2, "complianceScore": 84, "coordinates": {"x": 35, "y": 64}},
]

ALERTS: list[dict[str, Any]] = [
    {"id": "ALT-001", "vehicleId": "BUS-104", "title": "Battery Overheat Detected", "detail": "Cell temperature exceeded safe operating band.", "severity": "Critical", "time": "10:30 AM", "acknowledged": False},
    {"id": "ALT-002", "vehicleId": "LPG-412", "title": "High Fire Risk Detected", "detail": "Pressure variance and route heat exposure increased.", "severity": "Critical", "time": "10:25 AM", "acknowledged": False},
    {"id": "ALT-003", "vehicleId": "TRK-221", "title": "Smoke Detected", "detail": "Smoke sensor trend crossed threshold for 3 minutes.", "severity": "High", "time": "10:18 AM", "acknowledged": True},
    {"id": "ALT-004", "vehicleId": "FUEL-808", "title": "Fuel Line Pressure Drop", "detail": "Possible leak pattern detected near rear valve assembly.", "severity": "High", "time": "10:12 AM", "acknowledged": False},
]

INCIDENTS: list[dict[str, Any]] = [
    {"id": "INC-101", "vehicleId": "BUS-187", "title": "Passenger bus smoke event", "status": "Under Response", "startedAt": "10:25 AM", "location": "Sitapura Road", "responseOwner": "Lucknow Response Base", "estimatedLossCr": 0.12},
    {"id": "INC-102", "vehicleId": "BUS-104", "title": "Battery thermal warning", "status": "Ongoing", "startedAt": "10:30 AM", "location": "Bengaluru Depot", "responseOwner": "EV Safety Cell", "estimatedLossCr": 0.08},
]

RISK_ASSESSMENTS: list[dict[str, Any]] = [
    {
        "vehicleId": "BUS-104",
        "overallScore": 94,
        "confidence": 92,
        "updatedAt": "10:30 AM",
        "topFactors": [
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
        "vehicleId": "LPG-412",
        "overallScore": 92,
        "confidence": 89,
        "updatedAt": "10:25 AM",
        "topFactors": [
            {"name": "Tank Pressure Variance", "score": 91, "severity": "Critical"},
            {"name": "Route Heat Exposure", "score": 78, "severity": "High"},
            {"name": "Valve Inspection Overdue", "score": 70, "severity": "High"},
        ],
        "recommendations": [
            {"action": "Route to isolation bay", "priority": "Critical", "owner": "Control Center"},
            {"action": "Prepare evacuation perimeter", "priority": "Critical", "owner": "Emergency Desk"},
            {"action": "Schedule valve inspection", "priority": "High", "owner": "Maintenance"},
        ],
    },
    {
        "vehicleId": "TRK-221",
        "overallScore": 87,
        "confidence": 88,
        "updatedAt": "10:18 AM",
        "topFactors": [
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

MAINTENANCE_RECORDS: list[dict[str, Any]] = [
    {"id": "MNT-001", "vehicleId": "BUS-104", "component": "Battery cooling loop", "status": "Overdue", "dueDate": "2026-07-04", "owner": "EV Safety Cell"},
    {"id": "MNT-002", "vehicleId": "LPG-412", "component": "Tank pressure valve", "status": "Due Soon", "dueDate": "2026-07-08", "owner": "HazMat Maintenance"},
    {"id": "MNT-003", "vehicleId": "TRK-221", "component": "Cargo smoke sensor", "status": "Scheduled", "dueDate": "2026-07-10", "owner": "Battery Logistics"},
    {"id": "MNT-005", "vehicleId": "FUEL-808", "component": "Fuel line inspection", "status": "Overdue", "dueDate": "2026-07-03", "owner": "Fuel Fleet"},
]

SENSOR_READINGS: list[dict[str, Any]] = [
    {"vehicleId": "BUS-104", "batteryTemp": 91.2, "cellTempMax": 92.4, "cellTempMin": 88.1, "batteryVoltage": 703.2, "currentAmp": 312.4, "smokeLevel": 86, "gasPpm": 45, "soc": 68, "insulationKohm": 120, "trend": [48, 54, 58, 64, 71, 69, 77, 83, 91, 94]},
    {"vehicleId": "LPG-412", "batteryTemp": 56.4, "cellTempMax": 58.1, "cellTempMin": 51.9, "batteryVoltage": 24.8, "currentAmp": 44.2, "smokeLevel": 22, "gasPpm": 76, "soc": 92, "insulationKohm": 480, "trend": [42, 48, 55, 62, 69, 74, 80, 84, 89, 92]},
    {"vehicleId": "TRK-221", "batteryTemp": 78.7, "cellTempMax": 80.5, "cellTempMin": 74.9, "batteryVoltage": 680.5, "currentAmp": 266.1, "smokeLevel": 72, "gasPpm": 52, "soc": 61, "insulationKohm": 190, "trend": [36, 44, 51, 57, 64, 69, 73, 79, 83, 87]},
    {"vehicleId": "FUEL-808", "batteryTemp": 62.1, "cellTempMax": 64.0, "cellTempMin": 58.7, "batteryVoltage": 24.4, "currentAmp": 49.5, "smokeLevel": 26, "gasPpm": 68, "soc": 90, "insulationKohm": 430, "trend": [32, 38, 43, 48, 53, 57, 64, 68, 72, 74]},
]

NOTIFICATIONS: list[dict[str, Any]] = [
    {"id": "NOT-001", "title": "Critical alert", "message": "BUS-104 requires immediate inspection.", "time": "10:31 AM", "severity": "Critical"},
    {"id": "NOT-002", "title": "Maintenance due", "message": "Fuel line inspection overdue for FUEL-808.", "time": "10:14 AM", "severity": "High"},
]

REPORTS: list[dict[str, Any]] = [
    {"id": "RPT-001", "name": "Daily Fire Risk Summary", "category": "Risk", "generatedAt": "2026-07-10 10:35", "owner": "Control Center"},
    {"id": "RPT-002", "name": "Preventive Maintenance Queue", "category": "Maintenance", "generatedAt": "2026-07-10 10:20", "owner": "EV Safety Cell"},
]

WORK_ORDERS: list[dict[str, Any]] = []


def _with_current_times(name: str, records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if name == "vehicles":
        offsets = [0, 2, 4, 5, 8, 14]
        for index, record in enumerate(records):
            record["lastUpdated"] = _clock(offsets[index] if index < len(offsets) else index * 2)

    if name == "alerts":
        offsets = [0, 5, 12, 18]
        for index, record in enumerate(records):
            record["time"] = _clock(offsets[index] if index < len(offsets) else index * 3)

    if name == "incidents":
        offsets = [35, 0]
        for index, record in enumerate(records):
            record["startedAt"] = _clock(offsets[index] if index < len(offsets) else index * 10)

    if name == "risk-assessments":
        offsets = [0, 5, 12]
        for index, record in enumerate(records):
            record["updatedAt"] = _clock(offsets[index] if index < len(offsets) else index * 4)

    if name == "maintenance-records":
        for index, record in enumerate(records):
            if record["status"] == "Overdue":
                record["dueDate"] = _date(-(index + 1))
            elif record["status"] == "Due Soon":
                record["dueDate"] = _date(index + 1)
            else:
                record["dueDate"] = _date(index + 4)

    if name == "notifications":
        offsets = [2, 12]
        for index, record in enumerate(records):
            record["time"] = _relative(offsets[index] if index < len(offsets) else index * 5)

    if name == "reports":
        offsets = [120, 660]
        for index, record in enumerate(records):
            record["generatedAt"] = _report_time(offsets[index] if index < len(offsets) else index * 720)

    return records


def all_records(name: str) -> list[dict[str, Any]]:
    records = {
        "vehicles": VEHICLES,
        "drivers": DRIVERS,
        "depots": DEPOTS,
        "alerts": ALERTS,
        "incidents": INCIDENTS,
        "maintenance-records": MAINTENANCE_RECORDS,
        "risk-assessments": RISK_ASSESSMENTS,
        "sensor-readings": SENSOR_READINGS,
        "notifications": NOTIFICATIONS,
        "reports": REPORTS,
        "work-orders": WORK_ORDERS,
    }[name]
    return _with_current_times(name, deepcopy(records))


def find_by_id(records: list[dict[str, Any]], key: str, value: str) -> dict[str, Any] | None:
    return deepcopy(next((record for record in records if record.get(key) == value), None))


def create_work_order(payload: dict[str, Any]) -> dict[str, Any]:
    work_order = {
        "id": f"WO-{next(WORK_ORDER_COUNTER)}",
        "vehicleId": payload["vehicleId"],
        "priority": payload["priority"],
        "action": payload["action"],
        "owner": payload["owner"],
        "createdAt": _now().strftime("%d/%m/%Y, %I:%M:%S %p"),
    }
    WORK_ORDERS.append(work_order)
    return deepcopy(work_order)
