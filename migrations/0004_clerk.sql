-- Clerk auth: link D1 users to Clerk user ids.
ALTER TABLE users ADD COLUMN clerk_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_clerk ON users(clerk_id) WHERE clerk_id IS NOT NULL;
