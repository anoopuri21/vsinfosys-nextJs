ALTER TABLE enquiries ADD COLUMN request_key TEXT;
CREATE INDEX IF NOT EXISTS enquiries_request_key_created ON enquiries(request_key, created_at DESC);
