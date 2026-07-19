# FleetGuardian AI

FleetGuardian AI is an AI fleet fire-risk prevention prototype with a React frontend and a FastAPI backend.

## Structure

- `frontend/` - Vite, React, TypeScript, Tailwind UI
- `backend/` - FastAPI service for fleet data, fire-risk snapshots, risk analysis, and preventive work orders
- `docs/` - architecture, roadmap, SRS, and UI reference assets

Product image:

- Global top-left product image: `frontend/public/images/fleetguardian-product-mark.png`
- Full guard artwork: `frontend/public/images/fleetguardian-guard-hero.png`
- Reusable docs images: `docs/assets/fleetguardian-product-mark.png` and `docs/assets/fleetguardian-guard-hero.png`

## Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Useful endpoints:

- `GET http://127.0.0.1:8000/health`
- `GET http://127.0.0.1:8000/api/fleet/vehicles`
- `GET http://127.0.0.1:8000/api/fire-risk/snapshot/BUS-104`
- `POST http://127.0.0.1:8000/api/fire-risk/analyze`
- `POST http://127.0.0.1:8000/api/fire-risk/work-orders`
- `GET http://127.0.0.1:8000/docs`

The backend is configured through `backend/.env` to use PostgreSQL. The code still has a SQLite fallback only for cases where no `.env` is present.

Database summary:

- PostgreSQL database: `fleetguardian_ai`
- Database notes: `docs/database/FleetGuardianAI-Database.md`
- Show/create database tables and seed data: `python -m app.db.init_db` from the `backend/` folder

Current PostgreSQL format:

```env
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/fleetguardian_ai
```

The `fleetguardian_ai` database must exist in PostgreSQL before the backend starts. The MVP tables are created automatically on startup when `CREATE_DB_TABLES_ON_STARTUP=true`.

The backend now stores AI fire-risk analyses and preventive work orders in the configured database. Fleet, sensor, alert, and reference data are still seeded demo data for the MVP screen.

### Current implementation status

- The enterprise frontend shell is implemented for all navigation modules.
- AI Fire Prevention is the functional full-stack module.
- The AI Fire Prevention page now calls the backend fire-risk analysis API using the selected vehicle's live sensor values.
- Fire-risk analysis results and preventive work orders are persisted in the configured backend database.
- Preventive work-order creation posts to the backend and falls back locally if the backend is offline.
- Prototype modules continue to use realistic data while remaining ready for future API integration.

## Frontend

```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

The frontend calls `VITE_API_BASE_URL` when set, otherwise it uses `http://127.0.0.1:8000`. If the backend is offline, it falls back to the bundled mock data.

## Verification

```bash
cd backend
python -m compileall app
python test_connection.py

cd ..\frontend
npm run lint
npm run build
```
