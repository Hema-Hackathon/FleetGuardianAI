from sqlalchemy import func, inspect, select

from app.core.config import settings
from app.db.base import Base
from app.db.seed import seed_database
from app.db.session import SessionLocal, engine
import app.models  # noqa: F401


def init_db() -> None:
    if settings.CREATE_DB_TABLES_ON_STARTUP:
        Base.metadata.create_all(bind=engine)

    if settings.SEED_DB_ON_STARTUP:
        with SessionLocal() as session:
            seed_database(session)


def database_summary() -> dict[str, int]:
    inspector = inspect(engine)
    existing_tables = set(inspector.get_table_names())
    summary: dict[str, int] = {}

    with SessionLocal() as session:
        for table in Base.metadata.sorted_tables:
            if table.name not in existing_tables:
                summary[table.name] = -1
                continue

            summary[table.name] = session.scalar(
                select(func.count()).select_from(table)
            ) or 0

    return summary


def main() -> None:
    init_db()
    print("FleetGuardian AI database is ready.")
    print(f"Database: {engine.url.render_as_string(hide_password=True)}")
    print("Tables:")
    for table_name, row_count in database_summary().items():
        print(f"- {table_name}: {row_count}")


if __name__ == "__main__":
    main()
