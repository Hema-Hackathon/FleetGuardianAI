from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8-sig",
        case_sensitive=True,
        extra="ignore",
    )

    APP_NAME: str = "FleetGuardian AI"
    APP_VERSION: str = "1.0.0"

    ENVIRONMENT: str = "development"

    API_PREFIX: str = "/api/v1"

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    DATABASE_URL: str = "sqlite:///./fleetguardian_ai.db"
    DB_ECHO: bool = False
    CREATE_DB_TABLES_ON_STARTUP: bool = True
    SEED_DB_ON_STARTUP: bool = True
    CORS_ORIGINS: str = "http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:5174,http://localhost:5174"

    OLLAMA_ENABLED: bool = True
    OLLAMA_BASE_URL: str = "http://127.0.0.1:11434"
    OLLAMA_MODEL: str = "phi3:mini"
    OLLAMA_TIMEOUT_SECONDS: float = 50.0

    LOG_LEVEL: str = "INFO"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
