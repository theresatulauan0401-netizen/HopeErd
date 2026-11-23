# Sprint 2 - S2-SM-01: Sprint 2 planning notes and board

**Project:** HOPE, Inc. ERP  
**Scrum Master:** Resa Tulauan  
**Sprint:** 2 of 4 (week 3 of 8, due sprint day 1)  
**Sprint dates:** ____ to ____  
**Sprint goal:** Customer and Product modules work end to end, including soft delete and price history.  
**Task ID:** S2-SM-01  
**Due:** sprint day 1

> Source of truth for tasks and status: the HOPE Sprint Task Plan spreadsheet. Update the status tables in this file before each meeting.

## 1. Sprint 2 planning notes and board (S2-SM-01)

### Planning meeting

- **Date / time:** ____  
- **Attendees:** Resa Tulauan, Rhian Burasca, Katrice Bughaw, Archie Deloya, Cassandra Garbosa  
- **Capacity notes (absences, exams, other deadlines):** ____

### Sprint goal

Customer and Product modules work end to end, including soft delete and price history.

### Scope

30 tasks, one PR each: Developer 8, DB Admin 6, Tester 6, UI/UX Designer 5, Scrum Master 5.

### Dependencies to watch

- Customer and Product screens need the Sprint 1 rights catalogue and main page for permission checks.
- Price history (S2-DEV-07, day 8) needs the as-of-date query (S2-DBA-02, day 4).
- Soft delete (S2-DEV-03, S2-DEV-06) needs the child-record delete checks (S2-DBA-04, day 6).
- Customer wireframes (S2-UIX-01) land on day 2, one day before the form PR (S2-DEV-02, day 3).

### Sprint 2 board

| Task ID | Role | Owner | Task (one PR) | Due (day) | Status | PR |
|---|---|---|---|---|---|---|
| S2-DEV-01 | Developer | Rhian Burasca, Katrice Bughaw | Customer list with search and filter (permission-checked) | 2 | Not started | - |
| S2-DEV-02 | Developer | Rhian Burasca, Katrice Bughaw | Customer create and edit form | 3 | Not started | - |
| S2-DEV-03 | Developer | Rhian Burasca, Katrice Bughaw | Customer soft delete and restore | 4 | Not started | - |
| S2-DEV-04 | Developer | Rhian Burasca, Katrice Bughaw | Product list with search and filter | 5 | Not started | - |
| S2-DEV-05 | Developer | Rhian Burasca, Katrice Bughaw | Product create and edit form | 6 | Not started | - |
| S2-DEV-06 | Developer | Rhian Burasca, Katrice Bughaw | Product soft delete and restore | 7 | Not started | - |
| S2-DEV-07 | Developer | Rhian Burasca, Katrice Bughaw | Price history: add, edit and delete price with effective date | 8 | Not started | - |
| S2-DEV-08 | Developer | Rhian Burasca, Katrice Bughaw | Current-price display on product page; per-action rights checks (Add/Edit/Delete) across both modules | 9 | Not started | - |
| S2-DBA-01 | DB Admin | Archie Deloya | Customer and product active views, indexes | 2 | Not started | - |
| S2-DBA-02 | DB Admin | Archie Deloya | Query: current price as of a given date | 4 | Not started | - |
| S2-DBA-03 | DB Admin | Archie Deloya | Validation constraints (payTerms, unit) | 5 | Not started | - |
| S2-DBA-04 | DB Admin | Archie Deloya | Verify child-record delete checks for customer and product | 6 | Not started | - |
| S2-DBA-05 | DB Admin | Archie Deloya | Demo data for customer, product, price history | 7 | Not started | - |
| S2-DBA-06 | DB Admin | Archie Deloya | Search performance check and index tuning | 9 | Not started | - |
| S2-TST-01 | Tester | Cassandra Garbosa | Test cases: customer module | 3 | Not started | - |
| S2-TST-02 | Tester | Cassandra Garbosa | Test cases: product and price history | 5 | Not started | - |
| S2-TST-03 | Tester | Cassandra Garbosa | Soft delete/restore tests, incl. delete blocked by active children | 7 | Not started | - |
| S2-TST-04 | Tester | Cassandra Garbosa | Per-right permission tests for customer and product (Add/Edit/Delete, price rights) | 8 | Not started | - |
| S2-TST-05 | Tester | Cassandra Garbosa | Regression test of Sprint 1 | 9 | Not started | - |
| S2-TST-06 | Tester | Cassandra Garbosa | Bug reports and fix verification | 9 | Not started | - |
| S2-UIX-01 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: customer screens | 2 | Not started | - |
| S2-UIX-02 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: product and price history screens | 3 | Not started | - |
| S2-UIX-03 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Hi-fi mockups and handoff notes | 5 | Not started | - |
| S2-UIX-04 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Empty, error and confirm-delete states | 7 | Not started | - |
| S2-UIX-05 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Usability review of built screens | 9 | Not started | - |
| S2-SM-01 | Scrum Master | Resa Tulauan | Sprint 2 planning notes and board | 1 | Not started | - |
| S2-SM-02 | Scrum Master | Resa Tulauan | Follow up Sprint 1 retro actions | 3 | Not started | - |
| S2-SM-03 | Scrum Master | Resa Tulauan | Mid-sprint check and impediment log | 5 | Not started | - |
| S2-SM-04 | Scrum Master | Resa Tulauan | Update velocity and burndown | 8 | Not started | - |
| S2-SM-05 | Scrum Master | Resa Tulauan | Sprint 2 review and retrospective report | 10 | Not started | - |

### User stories and acceptance criteria (Developer tasks)

**S2-DEV-01** - As a staff member, I want to search and filter customers, so I can find a record quickly.

- [ ] Search and filter return the matching customers
- [ ] The list is available only to users with the Customer view right

**S2-DEV-02** - As a staff member, I want to create and edit customers, so records stay current.

- [ ] Required fields and payTerms are validated
- [ ] New and edited customers save and appear in the list
- [ ] Add and Edit rights are checked on the server

**S2-DEV-03** - As a staff member, I want to delete and restore customers without losing data.

- [ ] Delete marks the customer as deleted instead of removing the row
- [ ] A deleted customer can be restored
- [ ] Delete is blocked while the customer has active child records

**S2-DEV-04** - As a staff member, I want to search and filter products, so I can find a product quickly.

- [ ] Search and filter return the matching products
- [ ] The list is available only to users with the Product view right

**S2-DEV-05** - As a staff member, I want to create and edit products, so the catalogue stays current.

- [ ] Required fields and unit are validated
- [ ] New and edited products save and appear in the list
- [ ] Add and Edit rights are checked on the server

**S2-DEV-06** - As a staff member, I want to delete and restore products without losing data.

- [ ] Delete is a soft delete and can be restored
- [ ] Delete is blocked while the product has active child records

**S2-DEV-07** - As a staff member, I want to keep a price history with effective dates, so sales use the right price.

- [ ] Add, edit and delete a price with an effective date
- [ ] Prices are listed by effective date
- [ ] Price rights are checked on the server

**S2-DEV-08** - As a user, I want to see the current price on the product page, with buttons that follow my rights.

- [ ] The product page shows the price in effect today
- [ ] Add/Edit/Delete buttons and the server both follow each user's rights across Customer and Product

### Decisions made in planning

| # | Decision | Owner | Date |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
