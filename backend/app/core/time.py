from datetime import datetime
from zoneinfo import ZoneInfo

APP_TIME_ZONE = ZoneInfo("Asia/Kolkata")


def now_ist() -> datetime:
    return datetime.now(APP_TIME_ZONE)


def now_ist_for_db() -> datetime:
    return now_ist().replace(tzinfo=None)


def as_ist(timestamp: datetime) -> datetime:
    if timestamp.tzinfo is None:
        return timestamp.replace(tzinfo=APP_TIME_ZONE)
    return timestamp.astimezone(APP_TIME_ZONE)


def format_ist(timestamp: datetime) -> str:
    return as_ist(timestamp).strftime("%d/%m/%Y, %I:%M:%S %p")
