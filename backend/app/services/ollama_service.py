from __future__ import annotations

import json
import logging
import re
from threading import Lock
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.core.config import settings
from app.schemas.fire_risk import FireRiskRequest


logger = logging.getLogger(__name__)


class OllamaSafetyService:
    _cache: dict[tuple[object, ...], tuple[str, str, str, str]] = {}
    _lock = Lock()

    @staticmethod
    def explain(
        request: FireRiskRequest,
        risk_score: int,
        risk_level: str,
        factors: list[str],
        recommendations: list[str],
    ) -> tuple[str, str, str, str]:
        cache_key = (
            request.vehicle_id,
            risk_score,
            risk_level,
            tuple(factors),
            tuple(recommendations),
        )
        cached = OllamaSafetyService._cache.get(cache_key)
        if cached is not None:
            return cached

        with OllamaSafetyService._lock:
            cached = OllamaSafetyService._cache.get(cache_key)
            if cached is not None:
                return cached

            result = OllamaSafetyService._generate(
                request,
                risk_score,
                risk_level,
                factors,
                recommendations,
            )
            if result[3] in {"SUCCESS", "GUARDED"}:
                OllamaSafetyService._cache[cache_key] = result
            return result

    @staticmethod
    def _generate(
        request: FireRiskRequest,
        risk_score: int,
        risk_level: str,
        factors: list[str],
        recommendations: list[str],
    ) -> tuple[str, str, str, str]:
        fallback = OllamaSafetyService._fallback_summary(
            request.vehicle_id,
            risk_score,
            risk_level,
            factors,
            recommendations,
        )

        if not settings.OLLAMA_ENABLED:
            return fallback, "Ollama", settings.OLLAMA_MODEL, "DISABLED"

        top_factors = ", ".join(factors[:3]) if factors else "no unsafe threshold breaches"
        urgent_action = OllamaSafetyService._urgent_action(recommendations)
        prompt = (
            "Write exactly one complete fleet-alert sentence using only the supplied facts. "
            "Do not invent identifiers, registrations, places, causes, or actions. "
            f"The sentence must include exactly: vehicle {request.vehicle_id}, score {risk_score}/100, "
            f"and level {risk_level}. Causes: {top_factors}. Approved action: {urgent_action} "
            "Use no more than 30 words and end with a period."
        )
        payload = json.dumps(
            {
                "model": settings.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "keep_alive": "30m",
                "options": {
                    "temperature": 0.1,
                    "num_predict": 48,
                    "num_ctx": 512,
                    "stop": ["\n"],
                },
            }
        ).encode("utf-8")
        http_request = Request(
            f"{settings.OLLAMA_BASE_URL.rstrip('/')}/api/generate",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urlopen(http_request, timeout=settings.OLLAMA_TIMEOUT_SECONDS) as response:
                result = json.loads(response.read().decode("utf-8"))
            summary = " ".join(str(result.get("response", "")).split()).strip()
            if not summary:
                raise ValueError("Ollama returned an empty response")
            sentence_endings = [
                summary.find(mark)
                for mark in (".", "!", "?")
                if summary.find(mark) >= 20
            ]
            if sentence_endings:
                summary = summary[: min(sentence_endings) + 1]

            if OllamaSafetyService._is_grounded_summary(
                summary,
                request.vehicle_id,
                risk_score,
                risk_level,
            ):
                return summary, "Ollama", settings.OLLAMA_MODEL, "SUCCESS"

            logger.warning("Ollama response failed grounding validation: %s", summary)
            return fallback, "Ollama", settings.OLLAMA_MODEL, "GUARDED"
        except (HTTPError, URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as exc:
            logger.warning("Ollama safety explanation unavailable: %s", exc)
            return fallback, "Ollama", settings.OLLAMA_MODEL, "UNAVAILABLE"

    @staticmethod
    def _is_grounded_summary(
        summary: str,
        vehicle_id: str,
        risk_score: int,
        risk_level: str,
    ) -> bool:
        normalized = summary.upper()
        if not summary.endswith((".", "!", "?")):
            return False
        if normalized.count(vehicle_id.upper()) != 1:
            return False
        if f"{risk_score}/100" not in normalized:
            return False
        if risk_level.upper() not in normalized:
            return False

        identifier_tokens = re.findall(r"\b[A-Z0-9-]{5,}\b", normalized)
        unexpected_identifiers = [
            token
            for token in identifier_tokens
            if any(character.isdigit() for character in token)
            and token != vehicle_id.upper()
        ]
        return not unexpected_identifiers

    @staticmethod
    def _urgent_action(recommendations: list[str]) -> str:
        if not recommendations:
            return "Continue standard monitoring."

        for priority_phrase in ("stop vehicle", "isolation area", "inspect leakage"):
            matching_action = next(
                (
                    recommendation
                    for recommendation in recommendations
                    if priority_phrase in recommendation.lower()
                ),
                None,
            )
            if matching_action is not None:
                return matching_action
        return recommendations[0]

    @staticmethod
    def _fallback_summary(
        vehicle_id: str,
        risk_score: int,
        risk_level: str,
        factors: list[str],
        recommendations: list[str],
    ) -> str:
        reason = " and ".join(factors) if factors else "no unsafe threshold breaches"
        actions = "; ".join(recommendation.rstrip(".") for recommendation in recommendations)
        if not actions:
            actions = "Continue standard monitoring"
        return (
            f"{vehicle_id} has a verified rule score of {risk_score}/100 ({risk_level}). "
            f"Triggers: {reason}. Approved actions: {actions}."
        )
