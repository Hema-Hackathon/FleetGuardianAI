from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.time import now_ist_for_db


class AuditBase:

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=now_ist_for_db,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=now_ist_for_db,
        onupdate=now_ist_for_db,
        nullable=False
    )

    created_by: Mapped[str] = mapped_column(
        String(50),
        default="SYSTEM",
        nullable=False
    )

    updated_by: Mapped[str] = mapped_column(
        String(50),
        default="SYSTEM",
        nullable=False
    )
