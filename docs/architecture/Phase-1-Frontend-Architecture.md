# FleetGuardian AI

## AI Fleet Fire Risk Management Platform

**Document:** Phase 1 Frontend Architecture\
**Version:** 1.0

------------------------------------------------------------------------

# 1. Purpose

This document defines the frontend architecture for FleetGuardian AI. It
serves as the implementation blueprint for developers and AI coding
assistants.

------------------------------------------------------------------------

# 2. Architectural Principles

-   Enterprise-first design
-   Modular architecture
-   Reusable UI components
-   Feature-based organization
-   Responsive by default
-   Dark theme first
-   Backend-agnostic
-   API-ready
-   Easy to scale

------------------------------------------------------------------------

# 3. Technology Stack

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

# 4. Project Structure

``` text
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── charts/
│   │   ├── tables/
│   │   └── forms/
│   ├── layouts/
│   ├── modules/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

------------------------------------------------------------------------

# 5. Layout Architecture

Global Layout

``` text
+-------------------------------------------------------+
| Header                                                |
+---------+---------------------------------------------+
| Sidebar | Breadcrumb                                 |
|         +---------------------------------------------+
|         | Page Content                               |
|         |                                            |
|         |                                            |
+---------+---------------------------------------------+
```

The layout must remain identical across all modules.

------------------------------------------------------------------------

# 6. Navigation

## Sidebar Modules

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

Each module should contain child routes.

------------------------------------------------------------------------

# 7. Design System

Reusable components include:

-   AppShell
-   Sidebar
-   Header
-   Breadcrumb
-   PageHeader
-   KPICard
-   DashboardCard
-   StatusBadge
-   AlertCard
-   VehicleCard
-   ChartCard
-   DataTable
-   Timeline
-   FilterPanel
-   SearchBar
-   EmptyState
-   LoadingSpinner

All pages must reuse these components.

------------------------------------------------------------------------

# 8. Routing Strategy

``` text
/
├── dashboard
├── fleet
├── monitoring
├── fire-prevention
├── incident-response
├── investigation
├── maintenance
├── compliance
├── analytics
├── ai-assistant
└── administration
```

Every route must render successfully.

------------------------------------------------------------------------

# 9. Mock Data Strategy

Maintain a centralized mock dataset.

Example entities:

-   Vehicles
-   Drivers
-   Depots
-   Alerts
-   Incidents
-   Maintenance Records
-   Risk Scores

The same records should appear consistently throughout the application.

------------------------------------------------------------------------

# 10. State Management

Phase 1

-   Local component state
-   Shared mock data service

Future phases

-   API services
-   React Query
-   Authentication
-   Live updates

------------------------------------------------------------------------

# 11. Theme

Default theme:

-   Dark mode
-   Enterprise styling
-   Consistent spacing
-   Rounded cards
-   Accessible contrast
-   Responsive grid

------------------------------------------------------------------------

# 12. Future Backend Integration

Design every page to consume services through an abstraction layer.

Current

``` text
Page
 ↓
Mock Service
 ↓
Mock Data
```

Future

``` text
Page
 ↓
API Service
 ↓
FastAPI
 ↓
PostgreSQL / Redis / MCP
```

No page should directly depend on mock JSON files.

------------------------------------------------------------------------

# 13. Quality Standards

-   Strict TypeScript
-   No duplicated UI
-   Small reusable components
-   Clean imports
-   Consistent naming
-   Responsive layouts
-   Production-ready code

------------------------------------------------------------------------

# 14. Acceptance Criteria

The architecture is complete when:

-   All modules share one layout.
-   Navigation is fully functional.
-   Components are reusable.
-   Mock services can be replaced by APIs without redesign.
-   The frontend is scalable for future enterprise development.

------------------------------------------------------------------------

# Repository Location

Save this document as:

``` text
FleetGuardianAI/
└── docs/
    └── architecture/
        └── Phase-1-Frontend-Architecture.md
```
