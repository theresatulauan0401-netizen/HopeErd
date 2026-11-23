# Sprint 1 - S1-DEV-07: Rights dialog: admin/superadmin assign per-action rights by module

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 2 of 8, due sprint day 9)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-07  
**Due:** sprint day 9  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As an admin, I want to give each user per-action rights by module, so people can do only what they should.

## Acceptance criteria

- [ ] Dialog lists modules (Customer, Product, and the others seeded in migration 006) with their actions
- [ ] Admin or superadmin can grant and remove rights for a user
- [ ] Changes save to `user_permission` (soft delete when a right is removed)
- [ ] Only admins and superadmins can open the dialog, checked on the server

## Depends on

- S1-DEV-05 (User Management screen)
- `module`, `rights` and `user_permission` tables (36 rights seeded)

## Notes

These rights feed the permission checks in Sprints 2 and 3.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
