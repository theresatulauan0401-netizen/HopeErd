# Sprint 1 - S1-DEV-01: Project scaffold: app skeleton, env config, DB connection

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 1 of 8, due sprint day 2)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-01  
**Due:** sprint day 2  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As a developer, I want a working app skeleton with environment config and a database connection, so the whole team builds on the same base.

## Acceptance criteria

- [ ] App skeleton runs locally with a documented start command
- [ ] Settings are read from `.env` (copy of `.env.example`); `.env` is never committed
- [ ] App connects to the `hope_erp` PostgreSQL database created by `run_migrations.py`
- [ ] README explains how to run the app

## Depends on

- Migrations 001-006 applied (`python run_migrations.py --test` passes)

## Notes

Every other developer task builds on this one, so merge it first.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
