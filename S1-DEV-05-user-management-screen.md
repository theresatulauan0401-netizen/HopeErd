# Sprint 1 - S1-DEV-05: User Management screen: user list, Add User, Edit User, Block/Unblock (full task name is cut off in the plan; confirm it)

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 2 of 8, due sprint day 8)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-05  
**Due:** sprint day 8  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As an admin, I want to manage user accounts, so I can control who uses the system.

## Acceptance criteria

- [ ] User list shows users with role and status
- [ ] Add User and Edit User forms save to `app_user`
- [ ] Block and Unblock change the blocked flag
- [ ] The screen is available only to admins and superadmins, checked on the server

## Depends on

- S1-DEV-03 (login and session)
- Roles from migration 006

## Notes

Deleting a user is a soft delete (`is_deleted`), not a real delete.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
