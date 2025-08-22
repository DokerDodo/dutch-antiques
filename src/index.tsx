import { Hono } from 'hono'
import { renderer } from './renderer'
import { router } from './routes'

const app = new Hono()


app.use(renderer)

app.route('/', router)

export default app
