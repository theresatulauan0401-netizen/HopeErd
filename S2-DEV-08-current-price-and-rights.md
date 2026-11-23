# Sprint 2 - S2-DEV-08: Current-price display on product page; per-action rights checks (Add/Edit/Delete) across both modules

**Project:** HOPE, Inc. ERP  
**Repository:** theresatulauan0401-netizen/HopeErd  
**Sprint:** 2 of 4 (week 4 of 8, due sprint day 9)  
**Sprint goal:** Customer and Product modules work end to end, including soft delete and price history.  
**Role:** Developer  
**Owner:** Rhian Burasca, Katrice Bughaw  
**Task ID:** S2-DEV-08  
**Due:** sprint day 9  
**Status:** Not started  
**PR:** -

> Task, owners, due day, user story and acceptance criteria come from the Sprint 2 pack and the HOPE Sprint Task Plan.

## User story

As a user, I want to see the current price on the product page, with buttons that follow my rights.

## Acceptance criteria

- [ ] The product page shows the price in effect today
- [ ] Add/Edit/Delete buttons and the server both follow each user's rights across Customer and Product

## Depends on

- S2-DEV-07 (price history)
- S2-DBA-02 current price query (day 4)
- Sprint 1 Rights dialog and rights catalogue

## Notes

This PR touches both Customer and Product, so tell the Tester (S2-TST-04, day 8) which rights to test.

## PR checklist

- [ ] One PR for this task only
- [ ] PR title starts with the task ID
- [ ] Acceptance criteria above are met
- [ ] Rights are checked on the server, not only on screen
- [ ] No secrets or `.env` committed
- [ ] Reviewed by a teammate before merge
