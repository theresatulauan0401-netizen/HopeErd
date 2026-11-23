# Sprint 2 - S2-DEV-03: Customer soft delete and restore

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 2 of 4 (week 3 of 8, due sprint day 4)  
**Sprint goal:** Customer and Product modules work end to end, including soft delete and price history.  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S2-DEV-03  
**Due:** sprint day 4  
**Status:** Not started  
**PR:** -

> Task, owners, due day, user story and acceptance criteria come from the Sprint 2 pack and the HOPE Sprint Task Plan.

## User story

As a staff member, I want to delete and restore customers without losing data.

## Acceptance criteria

- [ ] Delete marks the customer as deleted instead of removing the row
- [ ] A deleted customer can be restored
- [ ] Delete is blocked while the customer has active child records

## Depends on

- S2-DEV-02 (customer form)
- S2-DBA-04 child-record delete checks (day 6)

## Notes

S2-DBA-04 is due two days after this PR. Agree with the DB Admin how the child-record check is available by day 4, or plan a follow-up fix.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] Rights are checked on the server, not only on screen
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
