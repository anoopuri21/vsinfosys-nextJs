PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS content_items (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL CHECK(content_type IN ('page','service','industry','guide','site_settings')),
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published','archived')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body_json TEXT NOT NULL DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  canonical_path TEXT,
  og_image_media_id TEXT,
  author_name TEXT,
  reviewer_name TEXT,
  published_at TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(content_type, slug)
);

CREATE INDEX IF NOT EXISTS content_public_lookup ON content_items(content_type, slug, status);
CREATE INDEX IF NOT EXISTS content_status_updated ON content_items(status, updated_at DESC);

CREATE TABLE IF NOT EXISTS content_revisions (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL,
  snapshot_json TEXT NOT NULL,
  change_note TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(content_id, revision_number)
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK(byte_size >= 0),
  alt_text TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
