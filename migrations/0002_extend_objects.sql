-- Extend objects with public fields needed for rendering
ALTER TABLE objects ADD COLUMN material_text TEXT; -- space-joined list for search
ALTER TABLE objects ADD COLUMN description_long_en TEXT;
ALTER TABLE objects ADD COLUMN description_long_nl TEXT;
ALTER TABLE objects ADD COLUMN provenance TEXT;
ALTER TABLE objects ADD COLUMN condition TEXT;
ALTER TABLE objects ADD COLUMN dimensions_json TEXT; -- JSON string {h,w,d,unit,weight_kg}
ALTER TABLE objects ADD COLUMN pdf_factsheet_url TEXT;
ALTER TABLE objects ADD COLUMN featured INTEGER DEFAULT 0; -- 0/1
ALTER TABLE objects ADD COLUMN _demo_placeholder INTEGER DEFAULT 1; -- 0/1
ALTER TABLE objects ADD COLUMN _demo_source TEXT;

-- Images table
CREATE TABLE IF NOT EXISTS object_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  object_id TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_en TEXT,
  alt_nl TEXT,
  width INTEGER,
  height INTEGER,
  position INTEGER DEFAULT 0,
  FOREIGN KEY(object_id) REFERENCES objects(id)
);

CREATE INDEX IF NOT EXISTS idx_object_images_object ON object_images(object_id);
