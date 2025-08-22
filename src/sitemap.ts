import { Hono } from 'hono'

export const sitemap = new Hono()

sitemap.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /
Sitemap: /sitemap.xml
`)
})

sitemap.get('/sitemap.xml', async (c) => {
  // For demo: statically list core pages and known slugs; in production query D1
  const url = new URL(c.req.url)
  const host = `${url.protocol}//${url.host}`
  const staticPaths = ['', '/collection', '/categories', '/about', '/contact']
  const locales = ['en', 'nl']
  const entries: string[] = []
  for (const loc of locales) {
    for (const p of staticPaths) {
      entries.push(`<url><loc>${host}/${loc}${p}</loc><changefreq>weekly</changefreq></url>`) 
    }
  }
  // Minimal: an empty object URL list; could be extended to pull from DB
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries.join('\n    ')}
  </urlset>`
  return c.text(xml, 200, { 'content-type': 'application/xml' })
})
