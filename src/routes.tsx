import { Hono } from 'hono'
import { t, defaultLocale } from './i18n'
import { HeaderNav, Grid, FilterBar } from './ui'
import { objects, searchObjects, getObjectBySlug } from './data'
import type { Locale } from './types'

export const router = new Hono()

router.get('/', (c) => c.redirect(`/${defaultLocale}`))

router.get('/:loc{en|nl}', (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  const featured = objects.filter((o) => o.featured)
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/'} />
      <section class="hero">
        <h1 style="font-size:2rem">{T.hero.title}</h1>
        <p>{T.hero.subtitle}</p>
        <a class="cta focus-ring" href={`/${loc}/collection`}>{T.cta_view_collection}</a>
        <a class="cta focus-ring" style="margin-left:.5rem;background:var(--ocher);color:#000;border-color:var(--gold)" href={`/${loc}/contact`}>{T.cta_contact}</a>
      </section>
      <h2 style="margin-top:1.5rem">{loc==='nl'?'Uitgelichte objecten':'Featured objects'}</h2>
      <Grid items={featured} loc={loc} />
    </>
  )
})

router.get('/:loc{en|nl}/collection', (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  const url = new URL(c.req.url)
  const params = url.searchParams
  const { items, total } = searchObjects({
    q: params.get('q') || undefined,
    category: params.get('category') || undefined,
    material: params.get('material') || undefined,
    maker: params.get('maker') || undefined,
    period: (params.get('period') as any) || undefined,
    sort: (params.get('sort') as any) || 'maker_az',
    page: parseInt(params.get('page') || '1'),
    pageSize: 24
  })

  return c.render(
    <>
      <HeaderNav loc={loc} path={'/collection'} />
      <h1>{T.nav.collection}</h1>
      <FilterBar loc={loc} values={params} />
      <Grid items={items} loc={loc} />
      <p style="margin-top:1rem;opacity:.7">{total} items</p>
    </>
  )
})

router.get('/:loc{en|nl}/categories', (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/categories'} />
      <h1>{T.nav.categories}</h1>
      <div class="grid">
        <a class="card" href={`/${loc}/collection?category=Drawings`}><div class="card-body"><h3>{T.categories.Drawings}</h3></div></a>
        <a class="card" href={`/${loc}/collection?category=Glasswork`}><div class="card-body"><h3>{T.categories.Glasswork}</h3></div></a>
        <a class="card" href={`/${loc}/collection?category=Bodemvondsten`}><div class="card-body"><h3>{T.categories.Bodemvondsten}</h3></div></a>
      </div>
    </>
  )
})

router.get('/:loc{en|nl}/about', (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/about'} />
      <h1>{T.nav.about}</h1>
      <p>Private collection focused on drawings, glasswork, and archaeological finds from the Low Countries, 1200–1850. Demo site — no prices, no sales.</p>
    </>
  )
})

router.get('/:loc{en|nl}/contact', (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  const url = new URL(c.req.url)
  const objectRef = url.searchParams.get('object') || ''
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/contact'} />
      <h1>{T.nav.contact}</h1>
      <p>{T.contact_intro}</p>
      <form method="POST" action={`/${loc}/api/contact`} class="card" style="padding:1rem">
        <input type="hidden" name="objectRef" value={objectRef} />
        <label>Name<input class="focus-ring" name="name" required /></label>
        <label>Email<input class="focus-ring" type="email" name="email" required /></label>
        <label>Phone (optional)<input class="focus-ring" name="phone" /></label>
        <label>Message<textarea class="focus-ring" name="message" required rows={5}></textarea></label>
        <input type="text" name="_hp" style="display:none" tabIndex={-1} autoComplete="off" />
        <button class="cta focus-ring" type="submit">{T.cta_contact}</button>
      </form>
    </>
  )
})

router.get('/:loc{en|nl}/object/:slug', (c) => {
  const loc = c.req.param('loc') as Locale
  const slug = c.req.param('slug')
  const obj = getObjectBySlug(slug)
  if (!obj) return c.notFound()
  const title = loc==='nl'?obj.title_nl:obj.title_en
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/collection'} />
      <article>
        <h1>{title}</h1>
        <div class="grid">
          <div>
            {obj.images.map((im) => (
              <a href="#" data-lightbox={im.url}><img class="card-img" src={im.url} alt={loc==='nl'?im.alt_nl:im.alt_en} loading="lazy" /></a>
            ))}
          </div>
          <div>
            <p><strong>{obj.maker || '—'}</strong></p>
            <p>{obj.period}{obj.year?` · ${obj.year}`:''} · {obj.region || ''}</p>
            <p><span class="badge">{obj.category}</span></p>
            <p>{loc==='nl'?obj.description_long_nl:obj.description_long_en}</p>
            {obj.pdf_factsheet_url ? <p><a class="focus-ring" href={obj.pdf_factsheet_url} target="_blank" rel="noopener">PDF factsheet</a></p> : null}
            <div class="contact-drawer"><a class="contact-button focus-ring" href={`/${loc}/contact?object=${encodeURIComponent(obj.id + '|' + obj.title_en)}`}>Contact about this object</a></div>
          </div>
        </div>
      </article>
    </>
  )
})

// Simple API endpoint (stub) for contact; in production integrate email + store
router.post('/:loc{en|nl}/api/contact', async (c) => {
  const form = await c.req.parseBody()
  const hp = form['_hp'] as string
  if (hp) return c.json({ ok: true })
  // time gate: ensure at least ~2s since navigation could be added with JS; skipping here
  console.log('Contact submission', JSON.stringify(form))
  return c.json({ ok: true })
})
