CREATE TABLE IF NOT EXISTS content_versions (
  scope TEXT PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO content_versions (scope, version) VALUES ('public-content', 1);
