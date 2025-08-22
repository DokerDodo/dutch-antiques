import { t } from './i18n'
import type { Locale, ObjectItem, PeriodLabel } from './types'

export function HeaderNav({ loc, path }: { loc: Locale; path: string }) {
  const T = t(loc)
  const link = (href: string, label: string) => {
    const active = path === href ? 'active' : ''
    return <a class={`focus-ring ${active}`} href={`/${loc}${href}`}>{label}</a>
  }
  return (
    <nav class="nav container" aria-label="Primary">
      {link('/', T.nav.home)}
      {link('/collection', T.nav.collection)}
      {link('/categories', T.nav.categories)}
      {link('/about', T.nav.about)}
      {link('/contact', T.nav.contact)}
      <div style="margin-left:auto">
        <label htmlFor="lang-switch" class="sr-only">Language</label>
        <select id="lang-switch" class="focus-ring" aria-label="Language">
          <option value="en" selected={loc==='en'}>EN</option>
          <option value="nl" selected={loc==='nl'}>NL</option>
        </select>
      </div>
    </nav>
  )
}

export function Card({ o, loc }: { o: ObjectItem; loc: Locale }) {
  const title = loc === 'nl' ? o.title_nl : o.title_en
  return (
    <article class="card">
      <a href={`/${loc}/object/${o.slug}`} aria-label={title}>
        <img class="card-img" src={o.images[0]?.url} alt={loc==='nl'?o.images[0]?.alt_nl:o.images[0]?.alt_en} loading="lazy" />
      </a>
      <div class="card-body">
        <div class="badge" aria-label="category">{o.category}</div>
        <h3 style="margin:.3rem 0">{title}</h3>
        <div style="opacity:.8">{o.maker || '—'}</div>
        <div style="opacity:.8">{o.period}{o.year?` · ${o.year}`:''}</div>
      </div>
    </article>
  )
}

export function Grid({ items, loc }: { items: ObjectItem[]; loc: Locale }) {
  return (
    <section class="grid" aria-live="polite">
      {items.map((o) => <Card o={o} loc={loc} />)}
    </section>
  )
}

export function FilterBar({ loc, values }: { loc: Locale; values: URLSearchParams }) {
  const T = t(loc)
  const input = (name: string, node: any) => (
    <div>
      <label for={name} class="sr-only">{name}</label>
      {node}
    </div>
  )
  return (
    <form class="filterbar" method="GET" role="search" aria-label="{T.filters.search}">
      {input('q', <input id="q" name="q" placeholder={T.filters.search} defaultValue={values.get('q')||''} class="focus-ring" />)}
      {input('category', <select id="category" name="category" class="focus-ring"><option value="">{T.filters.category}</option><option>Drawings</option><option>Glasswork</option><option>Bodemvondsten</option></select>)}
      {input('material', <input id="material" name="material" placeholder={T.filters.material} defaultValue={values.get('material')||''} class="focus-ring" />)}
      {input('maker', <input id="maker" name="maker" placeholder={T.filters.maker} defaultValue={values.get('maker')||''} class="focus-ring" />)}
      {input('period', <select id="period" name="period" class="focus-ring"><option value="">{T.filters.period}</option><option>13th c.</option><option>14th c.</option><option>15th c.</option><option>16th c.</option><option>17th c.</option><option>18th c.</option><option>19th c.</option></select>)}
      <select id="sort" name="sort" class="focus-ring">
        <option value="maker_az">{T.filters.sort_maker}</option>
        <option value="year_asc">{T.filters.sort_year_asc}</option>
        <option value="year_desc">{T.filters.sort_year_desc}</option>
      </select>
      <button class="reset focus-ring" type="submit">{T.filters.sort}</button>
      <a class="reset focus-ring" href="?">{T.filters.reset}</a>
    </form>
  )
}
