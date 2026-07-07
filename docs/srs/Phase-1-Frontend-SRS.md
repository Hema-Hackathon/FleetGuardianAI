# FleetGuardian AI

## AI Fleet Fire Risk Management Platform

**Tagline:** **Predict. Prevent. Protect.**

# Phase 1 Software Requirements Specification (SRS)

**Version:** 1.0\
**Phase:** Enterprise Frontend Foundation

------------------------------------------------------------------------

# 1. Vision

## Product Name

**FleetGuardian AI**

## Product Description

**AI Fleet Fire Risk Management Platform**

## Tagline

**Predict. Prevent. Protect.**

------------------------------------------------------------------------

# 2. Objective

Build an enterprise-grade frontend that looks and feels like a completed
commercial product.

Only the **AI Fire Prevention** module will be connected to live backend
services in later phases. All remaining modules will initially display
realistic prototype data while maintaining the appearance of a finished
enterprise application.

------------------------------------------------------------------------

# 3. Scope

This phase includes only the frontend.

**Do not implement:** - Backend - APIs - Database - Authentication
logic - AI Agents - Redis - PostgreSQL - MCP - Kubernetes

The frontend must be designed so these services can be integrated later
without redesigning the UI.

------------------------------------------------------------------------

# 4. Technology Stack

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   shadcn/ui
-   React Router
-   Lucide React
-   TanStack Table
-   Recharts
-   React Hook Form

------------------------------------------------------------------------

# 5. Design Principles

Design inspiration: - Microsoft Azure Portal - ServiceNow - SAP Fiori -
Datadog - Grafana

Guidelines: - Enterprise - Professional - Clean - Minimal - Responsive -
Dark theme first

------------------------------------------------------------------------

# 6. Navigation

## Sidebar

-   Dashboard
-   Fleet Management
-   Live Monitoring
-   AI Fire Prevention
-   Incident Response
-   AI Investigation
-   Maintenance Intelligence
-   Compliance & Standards
-   Analytics & Reporting
-   AI Assistant
-   Administration

## Top Header

-   Global Search
-   Notifications
-   User Profile
-   Breadcrumb
-   Theme Toggle

------------------------------------------------------------------------

# 7. Modules

Create prototype screens for:

1.  Dashboard
2.  Fleet Management
3.  Live Monitoring
4.  AI Fire Prevention
5.  Incident Response
6.  AI Investigation
7.  Maintenance Intelligence
8.  Compliance & Standards
9.  Analytics & Reporting
10. AI Assistant
11. Administration

Every module should contain multiple realistic pages with working
navigation.

------------------------------------------------------------------------

# 8. Prototype Strategy

The application should feel complete.

Prototype modules should include: - Sample KPIs - Charts - Tables -
Maps - Reports - Notifications - Realistic sample data

Only the AI Fire Prevention module will later connect to live APIs.

------------------------------------------------------------------------

# 9. UI Components

Create reusable components:

-   Sidebar
-   Header
-   Breadcrumb
-   KPI Card
-   Dashboard Card
-   Chart Card
-   Status Badge
-   Data Table
-   Vehicle Card
-   Alert Card
-   Timeline
-   Filter Panel
-   Search Bar
-   Empty State
-   Loading State

No duplicate UI code.

------------------------------------------------------------------------

# 10. Demo Dataset

Use a centralized mock dataset.

Example:

-   500 Vehicles
-   12 Depots
-   8 Cities
-   150 Drivers
-   25 Engineers
-   30 Historical Fire Incidents
-   5 Active Investigations
-   10 High Risk Vehicles

The same entities should appear consistently across all modules.

------------------------------------------------------------------------

# 11. Folder Structure

``` text
frontend/
    src/
        assets/
        components/
        layouts/
        modules/
        pages/
        routes/
        services/
        hooks/
        store/
        styles/
        types/
        utils/
```

------------------------------------------------------------------------

# 12. Coding Standards

-   Strict TypeScript
-   Functional Components
-   Reusable Components
-   Clean Folder Structure
-   Responsive Design
-   Accessible UI
-   No duplicate code
-   Easy backend integration

------------------------------------------------------------------------

# 13. Deliverables

The generated project must:

-   Compile successfully
-   Run using `npm run dev`
-   Include complete routing
-   Include all module pages
-   Display realistic prototype data
-   Present a production-quality UI

------------------------------------------------------------------------

# 14. Future Integration

The frontend must be designed for future integration with:

-   FastAPI
-   PostgreSQL
-   Redis
-   Sensor MCP
-   Risk Assessment Agent
-   LLM Orchestrator

No implementation is required during Phase 1.

------------------------------------------------------------------------

# 15. Acceptance Criteria

The frontend is considered complete when:

-   Every navigation item opens a valid page.
-   No page is empty.
-   The UI resembles a commercial enterprise application.
-   Components are reusable.
-   Mock data is realistic and consistent.
-   The project is ready for backend integration.

------------------------------------------------------------------------

# Repository Location

Save this document as:

``` text
FleetGuardianAI/
└── docs/
    └── srs/
        └── Phase-1-Frontend-SRS.md
```
