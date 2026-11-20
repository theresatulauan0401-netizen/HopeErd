-- 005: audit_user() records the LOGGED-IN APPLICATION USER in audit_log.
--
-- Before: audit_user() returned the value of  SET app.username  or, failing that, the
--         database login (session_user). Nothing tied it to an account in app_user.
-- Now:    the app calls   SELECT set_app_user(<user_id>);   once per request, inside the
--         same transaction as the INSERT/UPDATE. audit_user() then returns that account's
--         e-mail, and audit_log also stores the numeric user id (action_by_user_id).
--         Both values are transaction-local, so one user's id cannot leak into another request.
--
-- This runs BEFORE the seed data (006) so password hashes are never written to audit_log.

ALTER TABLE audit_log ADD COLUMN action_by_user_id INT REFERENCES app_user(user_id);
ALTER TABLE audit_log ALTER COLUMN action_by TYPE VARCHAR(100);   -- e-mails are longer than 50
CREATE INDEX idx_audit_log_user ON audit_log(action_by_user_id);

-- Id of the logged-in user, or NULL when nobody was set
CREATE OR REPLACE FUNCTION audit_user_id() RETURNS INT
LANGUAGE sql STABLE AS $$
    SELECT CASE WHEN current_setting('app.user_id', true) ~ '^[0-9]+$'
                THEN current_setting('app.user_id', true)::INT END;
$$;

-- Name recorded in stamp / audit_log.action_by:
--   1. the logged-in app user (set_app_user)  -> their e-mail
--   2. SET app.username = '...'               -> (old behaviour, still works)
--   3. otherwise the database login           -> e.g. postgres (migrations, manual SQL)
CREATE OR REPLACE FUNCTION audit_user() RETURNS TEXT
LANGUAGE plpgsql STABLE AS $$
DECLARE
    v_id    INT := audit_user_id();
    v_email TEXT;
BEGIN
    IF v_id IS NOT NULL THEN
        SELECT email INTO v_email FROM app_user WHERE user_id = v_id;
        IF v_email IS NOT NULL THEN
            RETURN v_email;
        END IF;
    END IF;
    RETURN COALESCE(NULLIF(current_setting('app.username', true), ''), session_user::text);
END;
$$;

-- Call this right after login / at the start of every request transaction
CREATE OR REPLACE FUNCTION set_app_user(p_user_id INT) RETURNS TEXT
LANGUAGE plpgsql AS $$
DECLARE
    v_email TEXT;
BEGIN
    SELECT email INTO v_email
      FROM app_user
     WHERE user_id = p_user_id AND NOT is_deleted AND NOT is_blocked;
    IF v_email IS NULL THEN
        RAISE EXCEPTION 'User % does not exist, is deleted, or is blocked.', p_user_id;
    END IF;
    PERFORM set_config('app.user_id', p_user_id::text, true);   -- true = this transaction only
    RETURN v_email;
END;
$$;

CREATE OR REPLACE FUNCTION clear_app_user() RETURNS void
LANGUAGE sql AS $$
    SELECT set_config('app.user_id', '', true), set_config('app.username', '', true);
$$;

-- The stamp must fit stamp VARCHAR(60): action (max 7) + user (max 30) + date/time (19) + spaces
CREATE OR REPLACE FUNCTION audit_stamp(p_action TEXT) RETURNS TEXT
LANGUAGE sql STABLE AS $$
    SELECT p_action || ' ' || left(audit_user(), 30) || ' ' ||
           to_char(now() AT TIME ZONE 'Asia/Manila', 'YYYY-MM-DD HH12:MI AM');
$$;

-- Same logic as migration 002, plus: stores action_by_user_id and never logs password_hash
CREATE OR REPLACE FUNCTION trg_audit_log() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
DECLARE
    v_action TEXT;
    v_key    TEXT;
    v_old    JSONB;
    v_new    JSONB;
BEGIN
    SELECT string_agg(to_jsonb(NEW) ->> k, '|' ORDER BY ord)
      INTO v_key
      FROM unnest(TG_ARGV) WITH ORDINALITY AS t(k, ord);

    v_new := to_jsonb(NEW) - 'password_hash';

    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, action, record_key, old_values, new_values, action_by, action_by_user_id)
        VALUES (TG_TABLE_NAME, 'ADD', v_key, NULL, v_new, audit_user(), audit_user_id());
    ELSE
        IF (to_jsonb(OLD) - 'stamp') = (to_jsonb(NEW) - 'stamp') THEN
            RETURN NULL;                             -- nothing changed, no log
        END IF;
        v_old := to_jsonb(OLD) - 'password_hash';
        v_action := CASE
                      WHEN NOT OLD.is_deleted AND NEW.is_deleted THEN 'DELETE'
                      WHEN OLD.is_deleted AND NOT NEW.is_deleted THEN 'RESTORE'
                      ELSE 'EDIT'
                    END;
        INSERT INTO audit_log (table_name, action, record_key, old_values, new_values, action_by, action_by_user_id)
        VALUES (TG_TABLE_NAME, v_action, v_key, v_old, v_new, audit_user(), audit_user_id());
    END IF;
    RETURN NULL;
END;
$$;
