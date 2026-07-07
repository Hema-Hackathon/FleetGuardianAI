from pydantic import BaseModel, Field


class FireRiskRequest(BaseModel):
    vehicle_id: str = Field(..., description="Vehicle Identifier")

    battery_temperature: float
    cell_temperature: float
    battery_voltage: float
    battery_current: float

    smoke_level: float
    gas_concentration: float
    ambient_temperature: float

    humidity: float
    vehicle_age: int


class FireRiskResponse(BaseModel):
    risk_score: int
    risk_level: str
    confidence: int
    message: str