import { Hono } from 'hono'
import { t, defaultLocale } from './i18n'
import { HeaderNav, Grid, FilterBar } from './ui'
import { listObjects, getObjectBySlugDB, listFeatured } from './db'
import { objects as seedObjects, searchObjects as searchInMemory, getObjectBySlug as getFromMemory } from './data'
import type { Locale } from './types'

export const router = new Hono<{ Bindings: { DB: D1Database } }>()

router.get('/', (c) => c.redirect(`/${defaultLocale}`))

router.get('/:loc{en|nl}', async (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  // Featured from D1
  // @ts-ignore
  const db = c.env.DB as D1Database
  const fr = await listFeatured(db, 6)
  const featured = fr.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title_en: r.title_en,
    title_nl: r.title_nl,
    maker: r.maker,
    period: r.period,
    year: r.year,
    region: r.region,
    category: r.category,
    material: JSON.parse(r.material || '[]'),
    images: r.lead_image_url ? [{ url: r.lead_image_url, alt_en: r.lead_alt_en, alt_nl: r.lead_alt_nl }] : []
  })) as any
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
    </>, {
      title: 'Dutch Antiques — Home',
      meta: {
        description: 'Selected drawings, glasswork and archaeological finds (1200–1850). Demo items, no prices.'
      },
      links: [
        { rel: 'canonical', href: `/${loc}` },
        { rel: 'alternate', href: `/en`, hrefLang: 'en' },
        { rel: 'alternate', href: `/nl`, hrefLang: 'nl' },
        { rel: 'alternate', href: `/en`, hrefLang: 'x-default' }
      ]
    }
  )
})

router.get('/:loc{en|nl}/collection', async (c) => {
  const loc = c.req.param('loc') as Locale
  const T = t(loc)
  const url = new URL(c.req.url)
  const params = url.searchParams
  // Switch collection listing to DB
  // @ts-ignore
  const db = c.env.DB as D1Database
  const { items, total } = await listObjects(db, {
    q: params.get('q') || undefined,
    category: params.get('category') || undefined,
    material: params.get('material') || undefined,
    maker: params.get('maker') || undefined,
    period: (params.get('period') as any) || undefined,
    sort: (params.get('sort') as any) || 'maker_az',
    page: parseInt(params.get('page') || '1'),
    pageSize: 24
  })

  // Map DB rows into the minimal shape needed for cards
  const mapped = items.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title_en: r.title_en,
    title_nl: r.title_nl,
    maker: r.maker,
    period: r.period,
    year: r.year,
    region: r.region,
    category: r.category,
    material: JSON.parse(r.material || '[]'),
    images: r.lead_image_url ? [{ url: r.lead_image_url, alt_en: r.lead_alt_en, alt_nl: r.lead_alt_nl }] : []
  }))

  return c.render(
    <>
      <HeaderNav loc={loc} path={'/collection'} />
      <h1>{T.nav.collection}</h1>
      <FilterBar loc={loc} values={params} />
      <Grid items={mapped as any} loc={loc} />
      <p style="margin-top:1rem;opacity:.7">{total} items</p>
    </>, {
      title: 'Dutch Antiques — Collection',
      meta: { description: 'Browse drawings, glasswork, and archaeological finds (1200–1850). No prices.' },
      links: [
        { rel: 'canonical', href: `/${loc}/collection` },
        { rel: 'alternate', href: `/en/collection`, hrefLang: 'en' },
        { rel: 'alternate', href: `/nl/collection`, hrefLang: 'nl' },
        { rel: 'alternate', href: `/en/collection`, hrefLang: 'x-default' }
      ]
    }
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
    </>, {
      title: 'Dutch Antiques — About',
      meta: { description: 'About the Dutch Antiques collection concept (demo, no prices).' },
      links: [
        { rel: 'canonical', href: `/${loc}/about` },
        { rel: 'alternate', href: `/en/about`, hrefLang: 'en' },
        { rel: 'alternate', href: `/nl/about`, hrefLang: 'nl' },
        { rel: 'alternate', href: `/en/about`, hrefLang: 'x-default' }
      ]
    }
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
    </>, {
      title: 'Dutch Antiques — Contact',
      meta: { description: 'Contact about an object. Demo site, no prices.' },
      links: [
        { rel: 'canonical', href: `/${loc}/contact` },
        { rel: 'alternate', href: `/en/contact`, hrefLang: 'en' },
        { rel: 'alternate', href: `/nl/contact`, hrefLang: 'nl' },
        { rel: 'alternate', href: `/en/contact`, hrefLang: 'x-default' }
      ]
    }
  )
})

router.get('/:loc{en|nl}/object/:slug', async (c) => {
  const loc = c.req.param('loc') as Locale
  const slug = c.req.param('slug')
  // @ts-ignore
  const db = c.env.DB as D1Database
  const data = await getObjectBySlugDB(db, slug)
  if (!data) return c.notFound()
  const obj = {
    id: data.row.id,
    slug: data.row.slug,
    title_en: data.row.title_en,
    title_nl: data.row.title_nl,
    maker: data.row.maker,
    period: data.row.period,
    year: data.row.year,
    region: data.row.region,
    category: data.row.category,
    material: JSON.parse(data.row.material || '[]'),
    description_long_en: data.row.description_long_en,
    description_long_nl: data.row.description_long_nl,
    pdf_factsheet_url: data.row.pdf_factsheet_url,
    images: data.images.map((im: any) => ({ url: im.url, alt_en: im.alt_en, alt_nl: im.alt_nl, width: im.width, height: im.height }))
  } as any
  if (!obj) return c.notFound()
  const title = loc==='nl'?obj.title_nl:obj.title_en
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    creator: obj.maker || undefined,
    inLanguage: loc,
    about: obj.material?.join(', '),
    temporalCoverage: obj.period,
    dateCreated: obj.year || undefined,
    contentLocation: obj.region || undefined,
    image: obj.images?.[0]?.url || undefined,
    isAccessibleForFree: true,
    description: (loc==='nl'?obj.description_long_nl:obj.description_long_en) || undefined
  }
  return c.render(
    <>
      <HeaderNav loc={loc} path={'/collection'} />
      <article>
        <h1>{title}</h1>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
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
    </>, {
      title,
      meta: {
        description: `${title} — ${obj.maker || ''} ${obj.period}${obj.year? ' ' + obj.year : ''}`.trim(),
        'og:title': title,
        'og:description': (loc==='nl'?obj.description_long_nl:obj.description_long_en) || title,
        'og:type': 'article',
        'og:image': obj.images?.[0]?.url || '',
        'twitter:card': 'summary_large_image',
        'twitter:image': obj.images?.[0]?.url || ''
      },
      links: [
        { rel: 'canonical', href: `/${loc}/object/${obj.slug}` },
        { rel: 'alternate', href: `/en/object/${obj.slug}`, hrefLang: 'en' },
        { rel: 'alternate', href: `/nl/object/${obj.slug}`, hrefLang: 'nl' },
        { rel: 'alternate', href: `/en/object/${obj.slug}`, hrefLang: 'x-default' }
      ]
    }
  )
})

// Simple API endpoint (stub) for contact; in production integrate email + store
router.post('/:loc{en|nl}/api/contact', async (c) => {
  const form = await c.req.parseBody()
  const hp = form['_hp'] as string
  if (hp) return c.json({ ok: true })
  const name = (form['name'] as string || '').trim()
  const email = (form['email'] as string || '').trim()
  const phone = (form['phone'] as string || '').trim()
  const message = (form['message'] as string || '').trim()
  const objectRef = (form['objectRef'] as string || '').trim()
  if (!name || !email || !message) return c.json({ ok: false }, 400)

  try {
    // Store to D1 (local in dev). No prices, minimal PII.
    // @ts-ignore
    const db = c.env.DB as D1Database
    await db.prepare(
      `INSERT INTO contact_submissions (name,email,phone,message,object_ref) VALUES (?, ?, ?, ?, ?)`
    ).bind(name, email, phone || null, message, objectRef || null).run()
  } catch (e) {
    console.log('D1 error', e)
    // still return ok:true to avoid leaking spam vectors
  }

  return c.json({ ok: true })
})
