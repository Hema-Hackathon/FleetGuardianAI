from uuid import uuid4

from sqlalchemy.orm import Session

from app.core.time import as_ist, now_ist
from app.core.risk_config import FireRiskConfig
from app.models.fire_risk_analysis import FireRiskAnalysis
from app.schemas.fire_risk import (
    FireRiskRequest,
    FireRiskResponse,
)
from app.services.ollama_service import OllamaSafetyService

class FireRiskService:

    @staticmethod
    def analyze(request: FireRiskRequest, db: Session | None = None) -> FireRiskResponse:

        score = 0
        factors = []
        recommendations = []

        if request.battery_temperature > FireRiskConfig.BATTERY_TEMP_HIGH:
            score += FireRiskConfig.BATTERY_TEMP_SCORE
            factors.append("High battery temperature")
            recommendations.append("Inspect battery cooling system.")

        if (
            request.cell_temperature is not None
            and request.cell_temperature > FireRiskConfig.CELL_TEMP_HIGH
        ):
            score += FireRiskConfig.CELL_TEMP_SCORE
            factors.append("High cell temperature")
            recommendations.append("Inspect cell temperature imbalance.")

        if request.ambient_temperature > FireRiskConfig.AMBIENT_TEMP_HIGH:
            score += FireRiskConfig.AMBIENT_TEMP_SCORE
            factors.append("Extreme ambient temperature")
            recommendations.append("Move vehicle to shaded area.")

        if (
            request.smoke_detected
            or (
                request.smoke_level is not None
                and request.smoke_level > FireRiskConfig.SMOKE_LEVEL_HIGH
            )
        ):
            score += FireRiskConfig.SMOKE_SCORE
            factors.append("Smoke detected")
            recommendations.append("Stop vehicle immediately.")

        if (
            request.gas_detected
            or (
                request.gas_concentration is not None
                and request.gas_concentration > FireRiskConfig.GAS_CONCENTRATION_HIGH
            )
        ):
            score += FireRiskConfig.GAS_SCORE
            factors.append("Gas concentration above safe threshold")
            recommendations.append("Move vehicle to isolation area and inspect leakage source.")

        if request.battery_current > FireRiskConfig.BATTERY_CURRENT_HIGH:
            score += FireRiskConfig.BATTERY_CURRENT_SCORE
            factors.append("High current draw")
            recommendations.append("Reduce load and inspect power electronics.")

        if request.battery_voltage > FireRiskConfig.BATTERY_VOLTAGE_HIGH:
            score += FireRiskConfig.BATTERY_VOLTAGE_SCORE
            factors.append("High battery voltage")
            recommendations.append("Review BMS voltage logs.")

        if request.coolant_level < FireRiskConfig.LOW_COOLANT_LEVEL:
            score += FireRiskConfig.COOLANT_SCORE
            factors.append("Low coolant level")
            recommendations.append("Refill battery coolant.")

        score = min(score, 100)

        if score < 25:
            level = "LOW"
        elif score < 50:
            level = "MEDIUM"
        elif score < 75:
            level = "HIGH"
        else:
            level = "CRITICAL"

        if not recommendations:
            recommendations.append(
                "Vehicle operating within safe limits."
            )

        llm_summary, llm_provider, llm_model, llm_status = OllamaSafetyService.explain(
            request,
            score,
            level,
            factors,
            recommendations,
        )

        response = FireRiskResponse(
            analysis_id=uuid4(),
            timestamp=now_ist(),
            vehicle_id=request.vehicle_id,
            risk_score=score,
            risk_level=level,
            contributing_factors=factors,
            recommendations=recommendations,
            llm_summary=llm_summary,
            llm_provider=llm_provider,
            llm_model=llm_model,
            llm_status=llm_status,
            status="SUCCESS",
        )

        if db is None:
            return response

        analysis = FireRiskAnalysis(
            id=response.analysis_id,
            vehicle_id=request.vehicle_id,
            battery_temperature=request.battery_temperature,
            cell_temperature=request.cell_temperature,
            ambient_temperature=request.ambient_temperature,
            battery_voltage=request.battery_voltage,
            battery_current=request.battery_current,
            smoke_detected=request.smoke_detected,
            smoke_level=request.smoke_level,
            gas_detected=request.gas_detected,
            gas_concentration=request.gas_concentration,
            coolant_level=request.coolant_level,
            risk_score=response.risk_score,
            risk_level=response.risk_level,
            contributing_factors=response.contributing_factors,
            recommendations=response.recommendations,
            status=response.status,
        )

        try:
            db.add(analysis)
            db.commit()
            db.refresh(analysis)
        except Exception:
            db.rollback()
            raise

        return FireRiskResponse(
            analysis_id=analysis.id,
            timestamp=as_ist(analysis.created_at),
            vehicle_id=analysis.vehicle_id,
            risk_score=analysis.risk_score,
            risk_level=analysis.risk_level,
            contributing_factors=analysis.contributing_factors,
            recommendations=analysis.recommendations,
            llm_summary=llm_summary,
            llm_provider=llm_provider,
            llm_model=llm_model,
            llm_status=llm_status,
            status=analysis.status,
        )
