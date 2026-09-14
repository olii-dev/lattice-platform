ALTER TABLE users ADD COLUMN verified_at TEXT;
CREATE TABLE IF NOT EXISTS email_codes (
  user_id TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_email_codes_user ON email_codes(user_id);
