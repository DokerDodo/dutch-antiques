import { seed } from '../scripts/seed_objects'
import { Hono } from 'hono'

export const admin = new Hono<{ Bindings: { DB: D1Database } }>()

admin.get('/seed', async (c) => {
  // Unsafe in prod. Dev-only endpoint to seed DB from in-memory demo data
  // Add a query token in case someone hits it.
  const token = new URL(c.req.url).searchParams.get('token')
  if (!token) return c.text('Forbidden', 403)
  await seed(c.env.DB)
  return c.json({ ok: true })
})
