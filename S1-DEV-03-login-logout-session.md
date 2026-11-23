# Sprint 1 - S1-DEV-03: Login and logout with session handling; password hashing and set-password on first login (full task name is cut off in the plan; confirm it)

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 2 of 8, due sprint day 6)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-03  
**Due:** sprint day 6  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As a registered user, I want to log in and out securely, so only approved users reach the system.

## Acceptance criteria

- [ ] Login checks the e-mail and hashed password
- [ ] Pending, blocked and deleted users cannot log in
- [ ] A successful login starts a session; logout ends it
- [ ] A user with a temporary password must set a new password on first login
- [ ] Passwords are hashed (bcrypt)

## Depends on

- S1-DEV-02 (registered users)
- Superadmin accounts seeded by migration 006

## Notes

Use `set_app_user(user_id)` inside each write transaction so `audit_log` records who made the change.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
