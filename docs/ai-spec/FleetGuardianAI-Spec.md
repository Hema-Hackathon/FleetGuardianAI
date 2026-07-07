# FleetGuardian AI Specification

## AI Spec-Driven Development Master Specification

**Product:** FleetGuardian AI\
**Subtitle:** AI Fleet Fire Risk Management Platform\
**Tagline:** **Predict. Prevent. Protect.**

**Version:** 1.0

------------------------------------------------------------------------

# Purpose

This document is the **single entry point** for all AI assistants
(ChatGPT, Codex, Claude, Gemini, GitHub Copilot) and human developers
working on FleetGuardian AI.

All implementation must follow this specification and the referenced
project documents.

------------------------------------------------------------------------

# Product Vision

FleetGuardian AI is an enterprise AI platform that enables organizations
to predict, prevent, investigate, and manage fleet fire risks through
AI-driven intelligence, real-time monitoring, and proactive decision
support.

------------------------------------------------------------------------

# Product Goals

-   Protect Human Life
-   Prevent Fire Incidents
-   Safeguard Fleet Assets
-   Reduce Financial Loss
-   Improve Operational Continuity
-   Enhance Fleet Visibility
-   Strengthen Compliance
-   Enable AI-driven Decision Making

------------------------------------------------------------------------

# Product Branding

**Product Name**

FleetGuardian AI

**Subtitle**

AI Fleet Fire Risk Management Platform

**Tagline**

Predict. Prevent. Protect.

------------------------------------------------------------------------

# AI Spec-Driven Development Principles

1.  Specifications are the source of truth.
2.  AI implements the specifications---it does not redefine them.
3.  Follow the approved architecture.
4.  Build reusable components.
5.  Do not redesign without approval.
6.  Prototype modules should look production-ready.
7.  Only AI Fire Prevention becomes fully functional in Phase 1.

------------------------------------------------------------------------

# Current Development Phase

## Phase 1 -- Enterprise Frontend

Goal:

Build a complete enterprise frontend shell.

Status:

In Progress

Only AI Fire Prevention will later integrate with backend services.

All other modules use realistic prototype data.

------------------------------------------------------------------------

# Functional Modules

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

------------------------------------------------------------------------

# Technology Stack

## Frontend

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   shadcn/ui
-   React Router
-   Lucide React
-   TanStack Table
-   Recharts

## Backend (Future)

-   FastAPI
-   PostgreSQL
-   Redis
-   MCP
-   AI Agents
-   LLM Orchestrator

## Deployment

-   Docker
-   Kubernetes

------------------------------------------------------------------------

# Repository Structure

``` text
FleetGuardianAI/
│
├── frontend/
├── backend/
├── docker/
├── kubernetes/
├── datasets/
├── design/
└── docs/
```

------------------------------------------------------------------------

# Required Reference Documents

Read these before implementing anything.

## Specifications

-   docs/srs/Phase-1-Frontend-SRS.md

## Architecture

-   docs/architecture/Phase-1-Frontend-Architecture.md
-   System Architecture
-   Data Architecture
-   Deployment Architecture
-   AI Agent Architecture
-   Fire Prevention Flow
-   MVP Object Mapping

## UI Reference Designs

-   design/ui-reference/Dashboard-With-Implementation-and-Prototype-Screens.png
-   design/ui-reference/Fleet-Operations-Dashboard.png

------------------------------------------------------------------------

# Development Rules

-   Build production-quality code.
-   No duplicate UI.
-   Use reusable components.
-   Keep architecture clean.
-   Use centralized mock data.
-   Every route must work.
-   Every page must feel complete.
-   Backend integration must be possible without UI redesign.

------------------------------------------------------------------------

# AI Assistant Instructions

If you are an AI coding assistant:

1.  Read this document first.
2.  Read the SRS.
3.  Read the Architecture document.
4.  Review the UI reference images.
5.  Continue implementation from the existing codebase.
6.  Never redesign the product unless explicitly instructed.
7.  Preserve project structure and coding standards.

------------------------------------------------------------------------

# Definition of Done

A milestone is complete when:

-   The application builds successfully.
-   Navigation works.
-   Components are reusable.
-   UI is enterprise quality.
-   Code follows project standards.
-   The implementation aligns with the specifications.

------------------------------------------------------------------------

# Project Philosophy

FleetGuardian AI is **not a demo**.

It is a production-oriented enterprise product developed using **AI
Spec-Driven Development**, where specifications guide implementation and
AI accelerates delivery without replacing architectural decisions.
