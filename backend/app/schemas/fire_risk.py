from datetime import datetime
from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class FireRiskRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    vehicle_id: str = Field(..., alias="vehicleId", example="BUS-102")
    battery_temperature: float = Field(..., alias="batteryTemperature", example=42.5)
    cell_temperature: float | None = Field(None, alias="cellTemperature", example=44.1)
    ambient_temperature: float = Field(32.0, alias="ambientTemperature", example=34.2)
    battery_voltage: float = Field(..., alias="batteryVoltage", example=410.4)
    battery_current: float = Field(..., alias="batteryCurrent", example=115.8)
    smoke_detected: bool = Field(False, alias="smokeDetected", example=False)
    smoke_level: float | None = Field(None, alias="smokeLevel", example=12.0)
    gas_detected: bool = Field(False, alias="gasDetected", example=False)
    gas_concentration: float | None = Field(None, alias="gasConcentration", example=18.0)
    coolant_level: float = Field(80.0, alias="coolantLevel", example=81.5)


class FireRiskResponse(BaseModel):
    analysis_id: UUID
    timestamp: datetime

    vehicle_id: str

    risk_score: int
    risk_level: str

    contributing_factors: List[str]

    recommendations: List[str]

    llm_summary: str
    llm_provider: str
    llm_model: str
    llm_status: str

    status: str


class CreateWorkOrderRequest(BaseModel):
    vehicle_id: str = Field(..., alias="vehicleId")
    priority: str
    action: str
    owner: str

    model_config = ConfigDict(populate_by_name=True)


class CreatedWorkOrder(BaseModel):
    id: str
    vehicle_id: str = Field(..., alias="vehicleId")
    priority: str
    action: str
    owner: str
    created_at: str = Field(..., alias="createdAt")

    model_config = ConfigDict(populate_by_name=True)
