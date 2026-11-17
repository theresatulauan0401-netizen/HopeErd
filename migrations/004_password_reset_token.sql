-- 004: password reset tokens.
-- Only the HASH of the token is stored. The raw token is e-mailed once and never saved,
-- so a leaked database cannot be used to reset anyone's password.

CREATE TABLE password_reset_token (
    token_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    INT NOT NULL REFERENCES app_user(user_id),
    token_hash CHAR(64) NOT NULL UNIQUE,              -- SHA-256 (hex) of the raw token
    expires_at TIMESTAMPTZ NOT NULL,
    used       BOOLEAN NOT NULL DEFAULT FALSE,
    used_at    TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (expires_at > created_at),
    CHECK (used = (used_at IS NOT NULL))
);

CREATE INDEX idx_reset_token_user ON password_reset_token(user_id);

-- A token is valid when:  token_hash = sha256(raw token)  AND  used = FALSE  AND  expires_at > now()
-- Expired or used tokens can be cleaned up with a plain DELETE (this table is not soft-deleted).
