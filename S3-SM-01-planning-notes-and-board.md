# Sprint 3 - S3-SM-01: Sprint 3 planning notes and board

**Project:** HOPE, Inc. ERP  
**Scrum Master:** Resa Tulauan  
**Sprint:** 3 of 4 (week 5 of 8, due sprint day 1)  
**Sprint dates:** ____ to ____  
**Sprint goal:** Human Resources module works: departments, jobs, employees, job history and a profile timeline.  
**Task ID:** S3-SM-01  
**Due:** sprint day 1

> Source of truth for tasks and status: the HOPE Sprint Task Plan spreadsheet. Update the status tables in this file before each meeting.

## 1. Sprint 3 planning notes and board (S3-SM-01)

### Planning meeting

- **Date / time:** ____  
- **Attendees:** Resa Tulauan, Rhian Burasca, Katrice Bughaw, Archie Deloya, Cassandra Garbosa  
- **Capacity notes (absences, exams, other deadlines):** ____

### Sprint goal

Human Resources module works: departments, jobs, employees, job history and a profile timeline.

### Scope

30 tasks, one PR each: Developer 8, DB Admin 6, Tester 6, UI/UX Designer 5, Scrum Master 5.

### Dependencies to watch

- Department and Job CRUD (S3-DEV-01, S3-DEV-02, days 2-3) must exist before the Employee form (S3-DEV-04, day 5).
- Linking app_user.empno to employee (S3-DBA-03, day 5) depends on the Sprint 1 user tables.
- The job timeline design (S3-UIX-03, day 4) must reach developers before the employee profile (S3-DEV-07, day 8).
- Salary visibility (S3-DEV-08) reuses the Sprint 1 rights model.

### Sprint 3 board

| Task ID | Role | Owner | Task (one PR) | Due (day) | Status | PR |
|---|---|---|---|---|---|---|
| S3-DEV-01 | Developer | Rhian Burasca, Katrice Bughaw | Department list and CRUD | 2 | Not started | - |
| S3-DEV-02 | Developer | Rhian Burasca, Katrice Bughaw | Job list and CRUD | 3 | Not started | - |
| S3-DEV-03 | Developer | Rhian Burasca, Katrice Bughaw | Employee list with search and filter | 4 | Not started | - |
| S3-DEV-04 | Developer | Rhian Burasca, Katrice Bughaw | Employee create and edit form | 5 | Not started | - |
| S3-DEV-05 | Developer | Rhian Burasca, Katrice Bughaw | Employee soft delete/restore and separation date | 6 | Not started | - |
| S3-DEV-06 | Developer | Rhian Burasca, Katrice Bughaw | Job history: add, edit and delete promotion or transfer (effective date, salary) | 7 | Not started | - |
| S3-DEV-07 | Developer | Rhian Burasca, Katrice Bughaw | Employee profile with job timeline | 8 | Not started | - |
| S3-DEV-08 | Developer | Rhian Burasca, Katrice Bughaw | Restrict job history and salary visibility with the View Job History right | 9 | Not started | - |
| S3-DBA-01 | DB Admin | Archie Deloya | Views/queries: employee current job and department | 2 | Not started | - |
| S3-DBA-02 | DB Admin | Archie Deloya | Job history validation (no duplicate effective dates) | 4 | Not started | - |
| S3-DBA-03 | DB Admin | Archie Deloya | Link app_user.empno to employee | 5 | Not started | - |
| S3-DBA-04 | DB Admin | Archie Deloya | Verify child-record delete checks for employee, department, job | 6 | Not started | - |
| S3-DBA-05 | DB Admin | Archie Deloya | HR demo data | 7 | Not started | - |
| S3-DBA-06 | DB Admin | Archie Deloya | Indexes and backup/restore script | 9 | Not started | - |
| S3-TST-01 | Tester | Cassandra Garbosa | Test cases: department and job | 3 | Not started | - |
| S3-TST-02 | Tester | Cassandra Garbosa | Test cases: employee | 5 | Not started | - |
| S3-TST-03 | Tester | Cassandra Garbosa | Job history tests (effective date, salary) | 7 | Not started | - |
| S3-TST-04 | Tester | Cassandra Garbosa | Salary visibility and HR per-right permission tests | 8 | Not started | - |
| S3-TST-05 | Tester | Cassandra Garbosa | Regression test of Sprints 1-2 | 9 | Not started | - |
| S3-TST-06 | Tester | Cassandra Garbosa | Bug reports and fix verification | 9 | Not started | - |
| S3-UIX-01 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: department and job screens | 2 | Not started | - |
| S3-UIX-02 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: employee and profile screens | 3 | Not started | - |
| S3-UIX-03 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Job timeline component design | 4 | Not started | - |
| S3-UIX-04 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Hi-fi mockups and handoff notes | 5 | Not started | - |
| S3-UIX-05 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Usability review of built screens | 9 | Not started | - |
| S3-SM-01 | Scrum Master | Resa Tulauan | Sprint 3 planning notes and board | 1 | Not started | - |
| S3-SM-02 | Scrum Master | Resa Tulauan | Re-prioritize any Sprint 2 carryover | 3 | Not started | - |
| S3-SM-03 | Scrum Master | Resa Tulauan | Mid-sprint check and impediment log | 5 | Not started | - |
| S3-SM-04 | Scrum Master | Resa Tulauan | Update velocity and Sprint 4 risk register | 8 | Not started | - |
| S3-SM-05 | Scrum Master | Resa Tulauan | Sprint 3 review and retrospective report | 10 | Not started | - |

### User stories and acceptance criteria (Developer tasks)

**S3-DEV-01** - As an HR user, I want to manage departments, so employees can be placed in them.

- [ ] List, add, edit and delete departments
- [ ] Delete is blocked while employees are linked

**S3-DEV-02** - As an HR user, I want to manage jobs, so employees can be given a job.

- [ ] List, add, edit and delete jobs
- [ ] Delete is blocked while employees or job history use the job

**S3-DEV-03** - As an HR user, I want to search and filter employees, so I can find a record quickly.

- [ ] Search and filter return the matching employees
- [ ] The list is available only to users with the Human Resources view right

**S3-DEV-04** - As an HR user, I want to create and edit employees, so records stay current.

- [ ] Required fields are validated; department and job are chosen from lists
- [ ] Add and Edit rights are checked on the server

**S3-DEV-05** - As an HR user, I want to delete, restore and set a separation date, so leavers are tracked without losing data.

- [ ] Delete is a soft delete and can be restored
- [ ] A separation date can be saved and is shown on the employee record

**S3-DEV-06** - As an HR user, I want to record promotions and transfers, so job history is complete.

- [ ] Add, edit and delete a job history entry with effective date and salary
- [ ] Two entries for the same employee cannot share an effective date

**S3-DEV-07** - As an HR user, I want an employee profile with a job timeline, so I can see someone's career at a glance.

- [ ] Profile shows employee details and a job timeline in date order
- [ ] Current job and department come from the latest entry

**S3-DEV-08** - As a system owner, I want job history and salary hidden from users without the right.

- [ ] Job history and salary show only with the View Job History right
- [ ] The server withholds the data, not just the screen

### Decisions made in planning

| # | Decision | Owner | Date |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
