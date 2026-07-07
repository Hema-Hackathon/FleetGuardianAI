from fastapi import FastAPI

from app.api.health import router as health_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Fleet Fire Risk Management Platform",
    version=settings.APP_VERSION,
)

app.include_router(health_router)


@app.get("/", tags=["Home"])
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "Running",
    }