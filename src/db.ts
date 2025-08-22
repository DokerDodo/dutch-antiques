export type DBObject = {
  id: string
  slug: string
  title_en: string
  title_nl: string
  maker: string | null
  period: string
  year: number | null
  region: string | null
  category: 'Drawings' | 'Glasswork' | 'Bodemvondsten'
  material: string // JSON array string
  status: 'Available' | 'Sold' | 'Archive'
  material_text: string | null
  description_long_en: string | null
  description_long_nl: string | null
  provenance: string | null
  condition: string | null
  dimensions_json: string | null
  pdf_factsheet_url: string | null
  featured: number
}

export async function listObjects(db: D1Database, opts: {
  q?: string
  category?: string
  material?: string
  maker?: string
  period?: string
  year_from?: number
  year_to?: number
  region?: string
  status?: 'Available' | 'Sold' | 'Archive' | 'All'
  sort?: 'maker_az' | 'year_asc' | 'year_desc'
  page?: number
  pageSize?: number
} = {}) {
  const {
    q, category, material, maker, period,
    year_from, year_to, region,
    status = 'All', sort = 'maker_az', page = 1, pageSize = 24
  } = opts

  const where: string[] = []
  const args: any[] = []
  if (q) { where.push('(lower(title_en) LIKE ? OR lower(title_nl) LIKE ? OR lower(coalesce(maker, "")) LIKE ? OR lower(coalesce(material_text, "")) LIKE ?)'); const s = `%${q.toLowerCase()}%`; args.push(s,s,s,s) }
  if (category) { where.push('category = ?'); args.push(category) }
  if (material) { where.push('material LIKE ?'); args.push(`%${material}%`) }
  if (maker) { where.push('maker LIKE ?'); args.push(`%${maker}%`) }
  if (period) { where.push('period = ?'); args.push(period) }
  if (region) { where.push('coalesce(region, "") = ?'); args.push(region) }
  if (year_from) { where.push('coalesce(year, 0) >= ?'); args.push(year_from) }
  if (year_to) { where.push('coalesce(year, 0) <= ?'); args.push(year_to) }
  if (status !== 'All') { where.push('status = ?'); args.push(status) }

  const orderBy = sort === 'maker_az' ? 'coalesce(maker, "") ASC'
    : sort === 'year_asc' ? 'coalesce(year, 0) ASC'
    : 'coalesce(year, 0) DESC'

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const offset = (page - 1) * pageSize
  const totalRow = await db.prepare(`SELECT COUNT(*) as cnt FROM objects ${whereSql}`).bind(...args).first<{cnt:number}>()
  const rows = await db.prepare(`
    SELECT o.*,
      (SELECT url FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_image_url,
      (SELECT alt_en FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_alt_en,
      (SELECT alt_nl FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_alt_nl
    FROM objects o
    ${whereSql}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `).bind(...args, pageSize, offset).all<any>()
  return { total: totalRow?.cnt || 0, items: rows.results || [] }
}

export async function listFeatured(db: D1Database, limit = 6) {
  const rows = await db.prepare(`
    SELECT o.*, 
      (SELECT url FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_image_url,
      (SELECT alt_en FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_alt_en,
      (SELECT alt_nl FROM object_images WHERE object_id = o.id ORDER BY position ASC LIMIT 1) AS lead_alt_nl
    FROM objects o
    WHERE featured = 1
    ORDER BY coalesce(year,0) DESC
    LIMIT ?
  `).bind(limit).all<any>()
  return rows.results || []
}

export async function getObjectBySlugDB(db: D1Database, slug: string) {
  const row = await db.prepare('SELECT * FROM objects WHERE slug = ?').bind(slug).first<DBObject>()
  if (!row) return null
  const images = await db.prepare('SELECT * FROM object_images WHERE object_id = ? ORDER BY position ASC').bind(row.id).all()
  return { row, images: images.results || [] }
}
