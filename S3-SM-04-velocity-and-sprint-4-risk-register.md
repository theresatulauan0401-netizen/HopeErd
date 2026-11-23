# Sprint 3 - S3-SM-04: Update velocity and Sprint 4 risk register

**Project:** HOPE, Inc. ERP  
**Scrum Master:** Resa Tulauan  
**Sprint:** 3 of 4 (week 6 of 8, due sprint day 8)  
**Sprint dates:** ____ to ____  
**Sprint goal:** Human Resources module works: departments, jobs, employees, job history and a profile timeline.  
**Task ID:** S3-SM-04  
**Due:** sprint day 8

> Source of truth for tasks and status: the HOPE Sprint Task Plan spreadsheet. Update the status tables in this file before each meeting.

## 4. Velocity update and Sprint 4 risk register (S3-SM-04)

**Velocity** = tasks (PRs) with status Merged or Done at the end of the sprint.

| Sprint | Planned | Merged / Done | Completion | Notes |
|---|---|---|---|---|
| Sprint 1 | 30 | 8 | 27% | (as of plan snapshot; update) |
| Sprint 2 | 30 |  |  |  |
| Sprint 3 | 30 |  |  |  |
| Sprint 4 | 30 |  |  |  |

**Sprint 3 burndown.** At the end of each sprint day, count the Sprint 3 tasks that are not yet Merged or Done. The ideal line drops 3 tasks per day (30 tasks over 10 days).

| Sprint day | Ideal remaining | Actual remaining |
|---|---|---|
| 0 | 30 |  |
| 1 | 27 |  |
| 2 | 24 |  |
| 3 | 21 |  |
| 4 | 18 |  |
| 5 | 15 |  |
| 6 | 12 |  |
| 7 | 9 |  |
| 8 | 6 |  |
| 9 | 3 |  |
| 10 | 0 |  |

Reading it: actual above ideal means behind plan, and a flat line means work is stuck (for example in review).

### Sprint 4 risk register

Risks below are proposed from the plan. Confirm or change them with the team, then review them at the Sprint 4 planning meeting.

| ID | Risk | Likelihood | Impact | Mitigation | Owner (proposed) | Status |
|---|---|---|---|---|---|---|
| R1 | Reports module is large (7 reports across S4-DBA-03, S4-DEV-04, S4-DEV-05, S4-UIX-03, S4-TST-03) and due late in the sprint. | Medium | High | Finish report queries by day 5; build the simplest reports first; test as each report lands. | Archie Deloya / Rhian Burasca | Open |
| R2 | Sales line items auto-fill price from Sprint 2 price history; a defect there blocks S4-DEV-02. | Medium | High | Re-test price-as-of-date in Sprint 3 mid-sprint check; fix before Sprint 4 starts. | Cassandra Garbosa | Open |
| R3 | Carryover from earlier sprints stacks up with no spare week (hard limit of 8 weeks). | High | High | Limit work in progress; review PRs within one day; decide carryover in the Sprint 3 review. | Resa Tulauan | Open |
| R4 | One tester carries all regression and the final sign-off (S4-TST-05, S4-TST-06 on day 9). | Medium | High | Start test cases from wireframes early; developers add smoke tests with their PRs. | Cassandra Garbosa | Open |
| R5 | Rhian Burasca and Katrice Bughaw are listed on both Developer and UI/UX tasks, so design work can compete with coding. | High | Medium | Do UI/UX tasks in the first days of the sprint (due days 2-5) before the big dev PRs. | Resa Tulauan | Open |
| R6 | Little slack at the end: final DB review and test sign-off on day 9, final report on day 10. | Medium | High | Feature freeze after day 8; use days 9-10 for fixes and the report only. | Resa Tulauan | Open |
