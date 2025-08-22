import { Hono } from 'hono'
import { renderer } from './renderer'
import { router } from './routes'
import { admin } from './admin_seed'
import { sitemap } from './sitemap'

const app = new Hono<{ Bindings: { DB: D1Database } }>()


app.use(renderer)

app.route('/', sitemap)
app.route('/', router)
app.route('/admin', admin)

export default app
