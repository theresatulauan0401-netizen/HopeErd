# Sprint 1 - Scrum Master Pack

**Project:** HOPE, Inc. ERP  
**Scrum Master:** Resa Tulauan  
**Sprint:** 1 of 4 (weeks 1-2 of 8, sprint days 1-10)  
**Sprint dates:** ____ to ____  
**Sprint goal:** Users can register, be approved, sign in, and be managed with per-action rights (User Management module).

> Source of truth for tasks and status: the HOPE Sprint Task Plan spreadsheet. Update the status tables in this file before each meeting.

## Scrum Master tasks covered by this file

| Task ID | Scrum Master task | Due (day) | Status in plan |
|---|---|---|---|
| S1-SM-01 | Repo setup: branch protection, PR and issue templates | 1 | Done |
| S1-SM-02 | Sprint 1 board: stories with acceptance criteria; map all six guide modules to sprints within the 8-week limit | 1 | Done |
| S1-SM-03 | Team working agreement, Definition of Done, role guide | 2 | Done |
| S1-SM-04 | Mid-sprint check notes and impediment log | 5 | Done |
| S1-SM-05 | Sprint 1 review and retrospective report | 10 | Not started |

## 1. Repo setup: branch protection, PR and issue templates (S1-SM-01)

The template files are in the `.github/` folder of this pack. Copy that folder to the root of the repository.

- [ ] Default branch is `main`
- [ ] Branch protection on `main` (Settings > Branches > Add rule):
  - [ ] Require a pull request before merging
  - [ ] Require at least 1 approval
  - [ ] Dismiss stale approvals when new commits are pushed
  - [ ] Require conversation resolution before merging
  - [ ] Do not allow direct pushes to `main`
  - [ ] Automatically delete head branches after merge
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` added
- [ ] `.github/ISSUE_TEMPLATE/` added (user story, bug report, impediment)
- [ ] All five team members added as collaborators
- [ ] Labels created: `sprint-1` to `sprint-4`; `dev`, `dba`, `tester`, `uiux`, `sm`; `story`, `bug`, `impediment`
- [ ] Milestones created: Sprint 1 to Sprint 4, each with a due date
- [ ] Project board created with columns Not started, In progress, In review, Merged
- [ ] `docs/scrum/` folder added with these files

**Naming rules used in the templates**

- Branch: `s1-dev-03-login-logout`
- PR title: `[S1-DEV-03] Login and logout with session handling`
- One task = one PR

## 2. Sprint 1 planning notes and board (S1-SM-02)

### Planning meeting

- **Date / time:** ____  
- **Attendees:** Resa Tulauan, Rhian Burasca, Katrice Bughaw, Archie Deloya, Cassandra Garbosa  
- **Capacity notes (absences, exams, other deadlines):** ____

### Sprint goal

Users can register, be approved, sign in, and be managed with per-action rights (User Management module).

### Scope

30 tasks, one PR each: Developer 8, DB Admin 6, Tester 6, UI/UX Designer 5, Scrum Master 5.

### Dependencies to watch

- DBA migrations (S1-DBA-03 app_user/roles/rights, S1-DBA-05 seed data) must land before the login, User Management and rights PRs (S1-DEV-03 to S1-DEV-08) can be fully tested.
- Wireframes (S1-UIX-02 day 3, S1-UIX-03 day 4) and hi-fi mockups (S1-UIX-04 day 6) should reach the developers before the User Management screen (S1-DEV-05, day 8).
- Tester work (S1-TST-02 to S1-TST-06) follows the dev PRs, so reviews must not wait.

### Module-to-sprint map (all six guide modules inside the 8-week limit)

| Module (from the guide) | Sprint | Weeks |
|---|---|---|
| User Management and sign-in (rights, approval, audit) | Sprint 1 | 1-2 |
| Customer | Sprint 2 | 3-4 |
| Product (with price history) | Sprint 2 | 3-4 |
| Human Resources (department, job, employee, job history) | Sprint 3 | 5-6 |
| Sales (with payments and balances) | Sprint 4 | 7-8 |
| Reports (7 reports) and audit log viewer | Sprint 4 | 7-8 |

### Sprint 1 board

| Task ID | Role | Owner | Task (one PR) | Due (day) | Status | PR |
|---|---|---|---|---|---|---|
| S1-DEV-01 | Developer | Rhian Burasca, Katrice Bughaw | Project scaffold: app skeleton, env config, DB connection | 2 | In review | - |
| S1-DEV-02 | Developer | Rhian Burasca, Katrice Bughaw | Register user form and API (new users start as pending) | 4 | In review | - |
| S1-DEV-03 | Developer | Rhian Burasca, Katrice Bughaw | Login and logout with session handling; password hashing and set-password on first login; blocked users cannot sign in | 6 | In review | - |
| S1-DEV-04 | Developer | Rhian Burasca, Katrice Bughaw | Reset password: request, emailed token, reset form | 7 | In review | - |
| S1-DEV-05 | Developer | Rhian Burasca, Katrice Bughaw | User Management screen: user list, Add User, Edit User, Block/Unblock; Admin manages Users only and Superadmin accounts are hidden | 8 | In review | - |
| S1-DEV-06 | Developer | Rhian Burasca, Katrice Bughaw | Superadmin: approve pending users and designate admins; block removing or disabling the last remaining superadmin | 8 | In review | - |
| S1-DEV-07 | Developer | Rhian Burasca, Katrice Bughaw | Rights dialog: admin/superadmin assign per-action rights by module (Customer, Product, Human Resources, Sales, Reports) with module checkbox and All/None; log every rights change in audit_log | 9 | In review | - |
| S1-DEV-08 | Developer | Rhian Burasca, Katrice Bughaw | Main page: sidebar and module tiles by role and rights, plus server-side permission check | 9 | In review | - |
| S1-DBA-01 | DB Admin | Archie Deloya | Team database setup, migration runner script, and student setup README (no Docker) | 2 | Merged | [#11](https://github.com/theresatulauan0401-netizen/HopeErd/pull/11) |
| S1-DBA-02 | DB Admin | Archie Deloya | Migration: HOPE base tables and sample data from HopeDB_audit.sql | 3 | Merged | [#12](https://github.com/theresatulauan0401-netizen/HopeErd/pull/12) |
| S1-DBA-03 | DB Admin | Archie Deloya | Migration: app_user (role, blocked flag), role, module, rights catalogue, user_permission (with soft delete) | 4 | Not started | - |
| S1-DBA-04 | DB Admin | Archie Deloya | Migration: password reset token table (hashed, expiry, used flag) | 5 | Merged | [#17](https://github.com/theresatulauan0401-netizen/HopeErd/pull/17) |
| S1-DBA-05 | DB Admin | Archie Deloya | Seed data: one superadmin account per team member, modules (Customer, Product, Human Resources, Sales, Reports), the per-action rights catalogue (36 rights, guide 3.8), default roles (no passwords in the repo; first password set via one-time set-password link) | 5 | Not started | [#19](https://github.com/theresatulauan0401-netizen/HopeErd/pull/19) |
| S1-DBA-06 | DB Admin | Archie Deloya | Make audit_user() record the logged-in user in audit_log; test it | 8 | Not started | [#18](https://github.com/theresatulauan0401-netizen/HopeErd/pull/18) |
| S1-TST-01 | Tester | Cassandra Garbosa | Sprint 1 test plan and acceptance criteria | 3 | Not started | - |
| S1-TST-02 | Tester | Cassandra Garbosa | Test cases: register, login and logout, set and reset password (expired and reused token) | 7 | Not started | - |
| S1-TST-03 | Tester | Cassandra Garbosa | Test cases: User Management (add, edit, block/unblock, approve, designate admin; Admin cannot see or edit Superadmin; last-superadmin guard) | 8 | Not started | - |
| S1-TST-04 | Tester | Cassandra Garbosa | Permission matrix tests (superadmin/admin/user x each right), using registered and approved test accounts; menu, buttons and server all follow the rights | 9 | Not started | - |
| S1-TST-05 | Tester | Cassandra Garbosa | Automated smoke test: login and main page | 9 | Not started | - |
| S1-TST-06 | Tester | Cassandra Garbosa | Bug reports and fix verification | 9 | Not started | - |
| S1-UIX-01 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Design system: colors, typography, core components | 2 | Done | - |
| S1-UIX-02 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: login, register, set/reset password | 3 | In progress | - |
| S1-UIX-03 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Wireframes: main page, User Management list and Rights dialog | 4 | In progress | - |
| S1-UIX-04 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Hi-fi mockups (login, register, main page, User Management, Rights dialog) and developer handoff notes | 6 | Not started | - |
| S1-UIX-05 | UI/UX Designer | Resa Tulauan, Katrice Bughaw, Rhian Burasca | Usability review of built screens and fix list | 9 | Not started | - |
| S1-SM-01 | Scrum Master | Resa Tulauan | Repo setup: branch protection, PR and issue templates | 1 | Done | - |
| S1-SM-02 | Scrum Master | Resa Tulauan | Sprint 1 board: stories with acceptance criteria; map all six guide modules to sprints within the 8-week limit | 1 | Done | - |
| S1-SM-03 | Scrum Master | Resa Tulauan | Team working agreement, Definition of Done, role guide | 2 | Done | - |
| S1-SM-04 | Scrum Master | Resa Tulauan | Mid-sprint check notes and impediment log | 5 | Done | - |
| S1-SM-05 | Scrum Master | Resa Tulauan | Sprint 1 review and retrospective report | 10 | Not started | - |

### User stories and acceptance criteria (Developer tasks)

**S1-DEV-01** - As a developer, I want a running app skeleton with environment config and a database connection, so the whole team builds on one base.

- [ ] App starts by following the README on a clean machine
- [ ] Database settings come from environment config; no credentials are committed
- [ ] A connection check succeeds against the team database

**S1-DEV-02** - As a new user, I want to register, so I can request access to the system.

- [ ] Form validates required fields and rejects a duplicate username or email
- [ ] The saved account has status pending
- [ ] A pending user cannot log in until approved

**S1-DEV-03** - As a registered user, I want to log in and out securely, so my account stays protected.

- [ ] Passwords are stored hashed, never as plain text
- [ ] First login goes through the set-password step
- [ ] Blocked users cannot sign in and see a clear message; logout ends the session

**S1-DEV-04** - As a user who forgot my password, I want to reset it by email, so I can get back in.

- [ ] Request creates a one-time token stored hashed with an expiry
- [ ] The emailed link opens the reset form
- [ ] Expired or already-used tokens are rejected

**S1-DEV-05** - As an admin, I want a User Management screen, so I can maintain user accounts.

- [ ] User list, Add User, Edit User and Block/Unblock work
- [ ] Admin manages Users only; Superadmin accounts are hidden from Admin
- [ ] The server rejects actions the account has no right for

**S1-DEV-06** - As a superadmin, I want to approve pending users and designate admins, so access stays controlled.

- [ ] Pending users can be approved and admins can be designated
- [ ] Removing or disabling the last remaining superadmin is refused with an error and nothing changes

**S1-DEV-07** - As an admin or superadmin, I want to assign per-action rights by module, so each user can only do what they are allowed to.

- [ ] Dialog lists rights for Customer, Product, Human Resources, Sales and Reports
- [ ] Module checkbox and All/None controls work
- [ ] Every rights change is written to audit_log

**S1-DEV-08** - As a user, I want a main page that matches my role and rights, so I only see what I can use.

- [ ] Sidebar and module tiles follow role and rights
- [ ] Opening a module URL without the right is blocked on the server, not only hidden

### Decisions made in planning

| # | Decision | Owner | Date |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## 3. Team working agreement, Definition of Done and role guide (S1-SM-03)

See [`team-working-agreement.md`](team-working-agreement.md).

## 4. Mid-sprint check and impediment log (S1-SM-04)

Held on sprint day 5. Compare each task due by day 5 with its real status.

### Tasks due by day 5

| Task ID | Role | Task | Due (day) | Status in plan | Status on day 5 |
|---|---|---|---|---|---|
| S1-DEV-01 | Developer | Project scaffold: app skeleton, env config, DB connection | 2 | In review |  |
| S1-DEV-02 | Developer | Register user form and API (new users start as pending) | 4 | In review |  |
| S1-DBA-01 | DB Admin | Team database setup, migration runner script, and student setup README (no Docker) | 2 | Merged |  |
| S1-DBA-02 | DB Admin | Migration: HOPE base tables and sample data from HopeDB_audit.sql | 3 | Merged |  |
| S1-DBA-03 | DB Admin | Migration: app_user (role, blocked flag), role, module, rights catalogue, user_permission (with soft delete) | 4 | Not started |  |
| S1-DBA-04 | DB Admin | Migration: password reset token table (hashed, expiry, used flag) | 5 | Merged |  |
| S1-DBA-05 | DB Admin | Seed data: one superadmin account per team member, modules (Customer, Product, Human Resources, Sales, Reports), the per-action rights catalogue (36 rights, guide 3.8), default roles (no passwords in the repo; first password set via one-time set-password link) | 5 | Not started |  |
| S1-TST-01 | Tester | Sprint 1 test plan and acceptance criteria | 3 | Not started |  |
| S1-UIX-01 | UI/UX Designer | Design system: colors, typography, core components | 2 | Done |  |
| S1-UIX-02 | UI/UX Designer | Wireframes: login, register, set/reset password | 3 | In progress |  |
| S1-UIX-03 | UI/UX Designer | Wireframes: main page, User Management list and Rights dialog | 4 | In progress |  |
| S1-SM-01 | Scrum Master | Repo setup: branch protection, PR and issue templates | 1 | Done |  |
| S1-SM-02 | Scrum Master | Sprint 1 board: stories with acceptance criteria; map all six guide modules to sprints within the 8-week limit | 1 | Done |  |
| S1-SM-03 | Scrum Master | Team working agreement, Definition of Done, role guide | 2 | Done |  |
| S1-SM-04 | Scrum Master | Mid-sprint check notes and impediment log | 5 | Done |  |

### Mid-sprint check notes

- **Date:** ____   **Attendees:** ____
- **On track / behind / ahead?** ____
- **Tasks at risk of missing their due day:** ____
- **Scope changes agreed (if any):** ____
- **Decisions:** ____

### Impediment log

| # | Date raised | Impediment | Affects (Task ID) | Owner | Action | Status | Resolved on |
|---|---|---|---|---|---|---|---|
| 1 |  | S1-DBA-03 (app_user, roles, rights tables) is Not started in the plan although it was due day 4; the login, User Management and rights PRs depend on those tables. *To confirm with the team.* | S1-DBA-03, S1-DEV-03 to 08 | Archie Deloya | Confirm status and ship the migration | Open |  |
| 2 |  | All eight Developer PRs are In review and no Tester task has started; reviews may be the bottleneck. *To confirm.* | S1-DEV-01 to 08, S1-TST-02 to 06 | Resa Tulauan | Agree a review turnaround (see working agreement) | Open |  |
| 3 |  | S1-DBA-05 and S1-DBA-06 have PR links but status Not started in the plan. Update the status so the board is accurate. | S1-DBA-05, S1-DBA-06 | Archie Deloya | Fix status in Task Plan | Open |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |

Status values: Open, In progress, Resolved. The Scrum Master follows up on every Open item at the next check.

## 5. Sprint 1 review and retrospective report (S1-SM-05)

Held on sprint day 10. Update the numbers below from the Task Plan before the meeting (the table below is the status at the time this file was generated).

### Sprint review

- **Date:** ____   **Attendees:** ____
- **Sprint goal met?** Yes / Partly / No - ____

**Task status by role**

| Role | Planned | Merged / Done | In review | In progress | Not started |
|---|---|---|---|---|---|
| Developer | 8 | 0 | 8 | 0 | 0 |
| DB Admin | 6 | 3 | 0 | 0 | 3 |
| Tester | 6 | 0 | 0 | 0 | 6 |
| UI/UX Designer | 5 | 1 | 0 | 2 | 2 |
| Scrum Master | 5 | 4 | 0 | 0 | 1 |
| **Team total** | **30** | **8** | **8** | **2** | **12** |

Note: the Summary sheet in the Task Plan counts only the status Merged as done. Scrum Master and UI/UX tasks use Done, so agree on one status word before reporting.

**What was demonstrated**

| Feature / screen | Task ID | Demoed by | Feedback |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**Not finished (carried over)**

| Task ID | What is left | Reason | Decision (finish / drop / move) |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Retrospective

| Went well | Did not go well | Try next sprint |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

**Action items**

| # | Action | Owner | Due | Status |
|---|---|---|---|---|
| 1 |  |  |  | Open |
| 2 |  |  |  | Open |
| 3 |  |  |  | Open |

