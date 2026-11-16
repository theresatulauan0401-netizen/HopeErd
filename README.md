# Hope, Inc. ERP – Database Setup (no Docker)

This repo builds the Hope, Inc. ERP database from **migrations** (numbered SQL files) using one
script, so every team member ends up with exactly the same database. It is based on the course's
`HopeDB_audit.sql`.

## What you need
- PostgreSQL 14+ installed locally (pgAdmin or `psql`)
- Python 3.10+

## Setup

1. **Get the code**: clone this repo, or click **Code → Download ZIP** on GitHub and extract it.
2. **Create an empty database** (once):
   ```
   psql -U postgres -c "CREATE DATABASE hope_erp;"
   ```
   (or create `hope_erp` in pgAdmin)
3. **Create your `.env`**: copy `.env.example` to `.env` and fill in your own PostgreSQL user and
   password. Never commit `.env`.
4. **Install dependencies**:
   ```
   python -m venv venv
   venv\Scripts\activate          # Windows
   source venv/bin/activate       # macOS / Linux
   pip install -r requirements.txt
   ```
5. **Run the migrations and the tests**:
   ```
   python run_migrations.py --test
   ```
   You should see `apply` for each of the 6 migrations, then `PASS` for both tests.
6. **Look around**:
   ```
   psql -U postgres -d hope_erp -c "\dt"
   psql -U postgres -d hope_erp -c "SELECT * FROM employee_active LIMIT 5;"
   ```

Running the script again is safe: migrations that already ran are skipped.

**Start over from zero:** the migrations never drop tables, so to reset, drop the database:
```
psql -U postgres -c "DROP DATABASE hope_erp;"
psql -U postgres -c "CREATE DATABASE hope_erp;"
python run_migrations.py --test
```

## The migrations

| File | What it does |
|------|--------------|
| `001_hope_base_tables_and_sample_data.sql` | The 10 Hope tables and all sample rows from `HopeDB_audit.sql` (without its `DROP TABLE` lines) |
| `002_audit_trail_and_soft_delete.sql` | Audit section of `HopeDB_audit.sql`: `is_deleted` + `stamp` columns, `audit_log`, triggers, `<table>_active` views |
| `003_user_management.sql` | `role`, `app_user` (role + blocked flag), `module`, `rights`, `user_permission` (soft delete), with the same stamp/audit triggers |
| `004_password_reset_token.sql` | Reset tokens: hashed, with expiry and used flag |
| `005_audit_user_logged_in_user.sql` | `audit_user()` now records the logged-in app user; adds `set_app_user()` |
| `006_seed_users_modules_rights.sql` | 3 roles, 5 modules, 36 rights, one superadmin per team member |

(`005` runs before the seed on purpose, so password hashes are never copied into `audit_log`.)

## Superadmin accounts
Migration 006 creates one superadmin per team member, each with the temporary password
`ChangeMe!2026` (stored only as a bcrypt hash). and change
the password after first login.

## Soft delete and the audit trail
- Rows are never really deleted. `UPDATE ... SET is_deleted = true` is a delete,
  `is_deleted = false` is a restore. Hard `DELETE` and `TRUNCATE` raise an error.
- Every row has a `stamp` like `EDIT archie.deloya@example.com 2026-11-16 11:18 AM`.
- `audit_log` keeps the full history (old and new values). It is append-only.
- Use `<table>_active` views (for example `customer_active`) to see only non-deleted rows.

## Recording the logged-in user
The backend must say who is logged in, **inside the same transaction** as the change:

```sql
BEGIN;
SELECT set_app_user(3);        -- user_id of the logged-in account (fails if blocked or deleted)
UPDATE customer SET custname = 'New Name' WHERE custno = 'C0001';
COMMIT;

SELECT table_name, record_key, action, action_by, action_by_user_id, action_at
FROM audit_log ORDER BY audit_id DESC LIMIT 5;
```

`audit_user()` returns that account's e-mail, and `audit_log.action_by_user_id` holds the id.
If nothing was set (migrations, manual SQL in pgAdmin) it falls back to the database login, such as `postgres`.
The database cannot verify the id by itself: your backend must be the only thing that connects to it.

## Troubleshooting
- **connection refused**: PostgreSQL isn't running, or the port in `.env` is wrong.
- **password authentication failed**: check `DB_USER` and `DB_PASSWORD` in `.env`.
- **permission denied to create extension "pgcrypto"**: run once as a superuser:
  `psql -U postgres -d hope_erp -c "CREATE EXTENSION pgcrypto;"`
- **A migration failed**: it was rolled back. Fix it (only if it hasn't been merged) and re-run.
