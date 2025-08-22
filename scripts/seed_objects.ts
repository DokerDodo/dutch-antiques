import { objects } from '../src/data'

export async function seed(db: D1Database) {
  // Insert objects
  for (const o of objects) {
    const material_text = o.material.join(' ')
    const dims = o.dimensions ? JSON.stringify(o.dimensions) : null
    await db
      .prepare(`INSERT OR REPLACE INTO objects (
        id, slug, title_en, title_nl, maker, period, year, region, category, material, status,
        material_text, description_long_en, description_long_nl, provenance, condition,
        dimensions_json, pdf_factsheet_url, featured, _demo_placeholder, _demo_source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        o.id, o.slug, o.title_en, o.title_nl, o.maker || null, o.period, o.year || null,
        o.region || null, o.category, JSON.stringify(o.material), o.status,
        material_text, o.description_long_en || null, o.description_long_nl || null,
        o.provenance || null, o.condition || null, dims, o.pdf_factsheet_url || null,
        o.featured ? 1 : 0, 1, o._demo_source
      )
      .run()

    // images
    await db.prepare(`DELETE FROM object_images WHERE object_id = ?`).bind(o.id).run()
    let pos = 0
    for (const im of o.images) {
      await db
        .prepare(`INSERT INTO object_images (object_id, url, alt_en, alt_nl, width, height, position)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(o.id, im.url, im.alt_en || null, im.alt_nl || null, im.width || null, im.height || null, pos++)
        .run()
    }
  }
}

export default { seed }
