from app.schemas.fire_risk import FireRiskRequest


class FireRiskEngine:

    @staticmethod
    def calculate(request: FireRiskRequest):

        score = 0

        if request.battery_temperature > 80:
            score += 25

        if request.cell_temperature > 85:
            score += 20

        if request.smoke_level > 50:
            score += 20

        if request.gas_concentration > 40:
            score += 15

        if request.battery_current > 250:
            score += 10

        if request.vehicle_age > 5:
            score += 10

        score = min(score, 100)

        if score < 30:
            level = "LOW"
        elif score < 60:
            level = "MEDIUM"
        elif score < 80:
            level = "HIGH"
        else:
            level = "CRITICAL"

        confidence = 95

        return {
            "risk_score": score,
            "risk_level": level,
            "confidence": confidence,
            "message": f"Vehicle Fire Risk is {level}"
        }