CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  identity TEXT,
  contact TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  page TEXT NOT NULL DEFAULT '#/home',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected','applied','spam')),
  moderator_note TEXT,
  ip_hash TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_feedback_status_created
ON feedback(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_feedback_ip_created
ON feedback(ip_hash, created_at DESC);
