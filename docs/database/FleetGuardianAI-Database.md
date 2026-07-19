# FleetGuardian AI Database

PostgreSQL database: `fleetguardian_ai`

The database is now ready for the full application data layer. Backend APIs can be wired later on top of these tables.

## Main Areas

- Fleet registry: `depots`, `drivers`, `vehicles`
- Live monitoring: `sensor_readings`, `alerts`, `notifications`
- AI fire prevention: `fire_risk_analysis`, `risk_assessments`, `risk_rules`
- Incident response: `incidents`, `ai_investigations`
- Maintenance: `maintenance_records`, `work_orders`
- Compliance: `compliance_standards`, `compliance_checks`
- Analytics: `reports`
- Administration: `app_modules`, `app_users`, `roles`, `user_roles`, `integrations`
- AI assistant: `ai_assistant_sessions`

## Show Current Database

From the backend folder:

```bash
python -m app.db.init_db
```

This command safely creates missing tables, keeps existing records, seeds only missing demo records, and prints row counts.
