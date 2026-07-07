# FleetGuardian AI Backend

Backend services for FleetGuardian AI – AI Fleet Fire Risk Management Platform.

## Technology Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Ollama
- LangChain (Phase 2)
- Redis
- Docker

## Run

```bash
uvicorn app.main:app --reload
```

Swagger

```
http://localhost:8000/docs
```

Health

```
http://localhost:8000/health
```