-- 003: role, app_user (role + blocked flag), module, rights catalogue, user_permission.
-- Follows the same pattern as HopeDB_audit.sql: is_deleted (soft delete) + stamp on every
-- data table, with the same triggers (stamp, audit_log, no hard DELETE/TRUNCATE) and
-- a <table>_active view.

CREATE TABLE role (
    role_id    SERIAL PRIMARY KEY,
    role_name  VARCHAR(30) NOT NULL UNIQUE,          -- Superadmin / Admin / User
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp      VARCHAR(60)
);

CREATE TABLE app_user (
    user_id       SERIAL PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,             -- bcrypt/argon2 hash, never the password
    role_id       INT NOT NULL REFERENCES role(role_id),
    is_blocked    BOOLEAN NOT NULL DEFAULT FALSE,    -- a blocked account cannot sign in
    is_deleted    BOOLEAN NOT NULL DEFAULT FALSE,
    stamp         VARCHAR(60),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_app_user_email_lower ON app_user (lower(email));

-- Catalogue tables: fixed lists the app reads (no soft delete needed)
CREATE TABLE module (
    module_id   SERIAL PRIMARY KEY,
    module_name VARCHAR(50) NOT NULL UNIQUE,
    sort_order  INT NOT NULL DEFAULT 0
);

CREATE TABLE rights (                                 -- one row per checkbox in the Rights dialog
    right_code  VARCHAR(30) PRIMARY KEY,
    module_id   INT NOT NULL REFERENCES module(module_id),
    description VARCHAR(100) NOT NULL
);

-- A ticked box = a row with is_deleted = false.
-- Unticking = UPDATE ... SET is_deleted = true (soft delete); re-ticking sets it back to false.
CREATE TABLE user_permission (
    user_id    INT NOT NULL REFERENCES app_user(user_id),
    right_code VARCHAR(30) NOT NULL REFERENCES rights(right_code),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    stamp      VARCHAR(60),
    PRIMARY KEY (user_id, right_code)
);
CREATE INDEX idx_user_permission_user ON user_permission(user_id) WHERE NOT is_deleted;

-- A role cannot be soft-deleted while active users still have it
CREATE OR REPLACE FUNCTION trg_check_role_users() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
DECLARE
    v_n INT;
BEGIN
    IF NEW.is_deleted AND NOT OLD.is_deleted THEN
        SELECT count(*) INTO v_n FROM app_user WHERE role_id = OLD.role_id AND NOT is_deleted;
        IF v_n > 0 THEN
            RAISE EXCEPTION 'Cannot delete role: % active user(s) still have it.', v_n;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

-- Attach the same triggers that migration 002 attached to the Hope tables
DO $$
DECLARE
    r      RECORD;
    v_args TEXT;
BEGIN
    FOR r IN
        SELECT * FROM (VALUES
            ('role',            'role_id'),
            ('app_user',        'user_id'),
            ('user_permission', 'user_id,right_code')
        ) AS t(tbl, keycols)
    LOOP
        SELECT string_agg(quote_literal(k), ',') INTO v_args
          FROM unnest(string_to_array(r.keycols, ',')) AS k;

        EXECUTE format('CREATE TRIGGER %I BEFORE INSERT OR UPDATE ON %I
                        FOR EACH ROW EXECUTE FUNCTION trg_set_stamp()',
                       r.tbl || '_biu_stamp', r.tbl);
        EXECUTE format('CREATE TRIGGER %I BEFORE DELETE ON %I
                        FOR EACH ROW EXECUTE FUNCTION trg_block_hard_delete()',
                       r.tbl || '_bd_block', r.tbl);
        EXECUTE format('CREATE TRIGGER %I BEFORE TRUNCATE ON %I
                        FOR EACH STATEMENT EXECUTE FUNCTION trg_block_hard_delete()',
                       r.tbl || '_bt_block', r.tbl);
        EXECUTE format('CREATE TRIGGER %I AFTER INSERT OR UPDATE ON %I
                        FOR EACH ROW EXECUTE FUNCTION trg_audit_log(%s)',
                       r.tbl || '_aiu_audit', r.tbl, v_args);
        EXECUTE format('CREATE VIEW %I AS SELECT * FROM %I WHERE NOT is_deleted',
                       r.tbl || '_active', r.tbl);
    END LOOP;
END;
$$;

CREATE TRIGGER role_bu_check
    BEFORE UPDATE ON role
    FOR EACH ROW EXECUTE FUNCTION trg_check_role_users();
