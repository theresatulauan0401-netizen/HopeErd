# Sprint 1 - S1-DEV-02: Register user form and API (new users start as pending)

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 1 of 8, due sprint day 4)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-02  
**Due:** sprint day 4  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As a new user, I want to register an account, so an admin can approve my access.

## Acceptance criteria

- [ ] Register form collects the required fields and validates them
- [ ] The API stores the user in `app_user` with a status of pending
- [ ] The password is stored only as a hash, never as plain text
- [ ] A pending user cannot log in
- [ ] Duplicate e-mail addresses are rejected with a clear message

## Depends on

- S1-DEV-01 (scaffold, DB connection)
- `app_user` and `role` tables from migration 003

## Notes

Approval of pending users is done in S1-DEV-06.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
