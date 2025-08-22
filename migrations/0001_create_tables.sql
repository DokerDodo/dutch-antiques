-- Contact submissions table (stores form submissions)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  object_ref TEXT
);

-- Objects index (optional) for private-link feature and status (no prices)
CREATE TABLE IF NOT EXISTS objects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title_en TEXT,
  title_nl TEXT,
  maker TEXT,
  period TEXT,
  year INTEGER,
  region TEXT,
  category TEXT,
  material TEXT,
  status TEXT,
  private_token TEXT -- for unlisted viewing (optional)
);

CREATE INDEX IF NOT EXISTS idx_objects_slug ON objects(slug);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at);
