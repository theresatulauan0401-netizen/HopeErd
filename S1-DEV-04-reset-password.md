# Sprint 1 - S1-DEV-04: Reset password: request, emailed token, reset form

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 1 of 4 (week 2 of 8, due sprint day 7)  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S1-DEV-04  
**Due:** sprint day 7  
**Status:** Not started  
**PR:** -

> Task name, owners and due day come from the HOPE Sprint Task Plan. The task ID, story and acceptance criteria are drafts to confirm with the team.

## User story

As a user who forgot my password, I want to reset it through an e-mailed link, so I can get back in.

## Acceptance criteria

- [ ] A reset request creates a token and e-mails a link
- [ ] Only the hashed token is stored, with an expiry time and a used flag (migration 004)
- [ ] The reset form accepts a valid, unused, unexpired token only
- [ ] After a reset the token is marked used and cannot be reused
- [ ] The response does not reveal whether an e-mail address exists

## Depends on

- S1-DEV-03 (login and password hashing)
- Password reset token table from migration 004

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
