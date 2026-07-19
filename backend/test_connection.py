from sqlalchemy import text

from app.db.session import engine


with engine.connect() as connection:
    result = connection.execute(text("SELECT 1"))

    print({
        "database": engine.url.render_as_string(hide_password=True),
        "result": result.scalar(),
    })
