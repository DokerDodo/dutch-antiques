import type { ObjectItem, PeriodLabel } from './types'

// Helper: ensure year between 1200 and 1850
const withinPeriod = (year?: number) => (year ? year >= 1200 && year <= 1850 : true)

export const objects: ObjectItem[] = [
  {
    id: 'obj-001',
    slug: 'ink-drawing-17th-century-ship',
    title_en: 'Ink Drawing of a Dutch Fluyt',
    title_nl: 'Inktekening van een Nederlandse Fluit',
    maker: 'Anonymous (Dutch school)',
    period: '17th c.',
    year: 1650,
    region: 'Netherlands',
    category: 'Drawings',
    material: ['Ink', 'Paper'],
    dimensions: { h: 21, w: 32, unit: 'cm' },
    condition: 'Minor foxing, edges toned',
    provenance: 'Demo item (placeholder). Source: Rijksmuseum open data.',
    description_long_en: 'Study of a Dutch fluyt ship in calm waters. Placeholder for demo purposes.',
    description_long_nl: 'Studie van een Nederlandse fluit in kalme wateren. Placeholder voor demo-doeleinden.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=80&auto=format&fit=crop',
        alt_en: 'Ink drawing of ship',
        alt_nl: 'Inktekening van schip',
        width: 1600,
        height: 1200
      }
    ],
    status: 'Available',
    _demo_placeholder: true,
    _demo_source: 'Unsplash/Rijksmuseum open data (placeholder)' ,
    featured: true
  },
  {
    id: 'obj-002',
    slug: '17th-century-wine-glass',
    title_en: '17th-Century Wine Glass',
    title_nl: '17e-eeuws Wijnglas',
    maker: 'Low Countries workshop',
    period: '17th c.',
    year: 1680,
    region: 'Low Countries',
    category: 'Glasswork',
    material: ['Glass'],
    dimensions: { h: 14, w: 7, unit: 'cm' },
    condition: 'Surface wear consistent with age',
    provenance: 'Demo item (placeholder). Source: public domain.',
    description_long_en: 'Bell-shaped bowl on a hollow stem. Placeholder description.',
    description_long_nl: 'Belvormige kelk op een holle stam. Placeholder beschrijving.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1520848315518-b991dd16a6cf?w=1600&q=80&auto=format&fit=crop',
        alt_en: 'Historic wine glass',
        alt_nl: 'Historisch wijnglas',
        width: 1600,
        height: 1200
      }
    ],
    status: 'Available',
    _demo_placeholder: true,
    _demo_source: 'Public domain placeholder',
    featured: true
  },
  {
    id: 'obj-003',
    slug: 'bodemvondst-plate-18th-century',
    title_en: 'Earthenware Plate (Bodemvondst)',
    title_nl: 'Aardewerken Bord (Bodemvondst)',
    maker: 'Unknown',
    period: '18th c.',
    year: 1750,
    region: 'Netherlands',
    category: 'Bodemvondsten',
    material: ['Earthenware', 'Glaze'],
    dimensions: { h: 3, w: 24, unit: 'cm' },
    condition: 'Fragmented and restored',
    provenance: 'Demo item (placeholder). Source: municipal archaeology records (placeholder).',
    description_long_en: 'Recovered plate fragment with tin glaze.',
    description_long_nl: 'Gevonden bordfragment met tinglazuur.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?w=1600&q=80&auto=format&fit=crop',
        alt_en: 'Archaeological earthenware plate',
        alt_nl: 'Archeologisch aardewerken bord',
        width: 1600,
        height: 1200
      }
    ],
    status: 'Archive',
    _demo_placeholder: true,
    _demo_source: 'Placeholder archaeology image'
  },
  {
    id: 'obj-004',
    slug: 'drawing-portrait-18th-century',
    title_en: 'Portrait Study in Red Chalk',
    title_nl: 'Portretstudie in Rood Krijt',
    maker: 'Workshop of Cornelis Troost (attrib.)',
    period: '18th c.',
    year: 1735,
    region: 'Amsterdam',
    category: 'Drawings',
    material: ['Red chalk', 'Paper'],
    dimensions: { h: 28, w: 19, unit: 'cm' },
    condition: 'Laid paper, minor creases',
    provenance: 'Demo item (placeholder). Source: public domain.',
    description_long_en: 'Classical study of a sitter facing left.',
    description_long_nl: 'Klassieke studie van een model naar links.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80&auto=format&fit=crop',
        alt_en: 'Red chalk portrait study',
        alt_nl: 'Portretstudie in rood krijt',
        width: 1600,
        height: 1200
      }
    ],
    status: 'Available',
    _demo_placeholder: true,
    _demo_source: 'Public domain placeholder'
  },
  {
    id: 'obj-005',
    slug: 'bodemvondst-cup-17th-century',
    title_en: 'Stoneware Cup (Bodemvondst)',
    title_nl: 'Steengoed Beker (Bodemvondst)',
    maker: 'Unknown',
    period: '17th c.',
    year: 1625,
    region: 'Rhine region',
    category: 'Bodemvondsten',
    material: ['Stoneware'],
    dimensions: { h: 10, w: 8, unit: 'cm' },
    condition: 'Chips and soil encrustation',
    provenance: 'Demo item (placeholder). Source: archaeological placeholder.',
    description_long_en: 'Grey stoneware cup, salt-glazed.',
    description_long_nl: 'Grijze steengoed beker, zoutglazuur.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582582429416-2b2a28d36f0e?w=1600&q=80&auto=format&fit=crop',
        alt_en: 'Stoneware cup',
        alt_nl: 'Steengoed beker',
        width: 1600,
        height: 1200
      }
    ],
    status: 'Available',
    _demo_placeholder: true,
    _demo_source: 'Placeholder archaeology image'
  }
]

export function getObjectBySlug(slug: string) {
  return objects.find((o) => o.slug === slug)
}

export function searchObjects(params: {
  q?: string
  category?: string
  material?: string
  maker?: string
  period?: PeriodLabel
  year_from?: number
  year_to?: number
  region?: string
  status?: 'Available' | 'Sold' | 'Archive' | 'All'
  sort?: 'maker_az' | 'year_asc' | 'year_desc'
  page?: number
  pageSize?: number
}) {
  const {
    q,
    category,
    material,
    maker,
    period,
    year_from,
    year_to,
    region,
    status = 'All',
    sort = 'maker_az',
    page = 1,
    pageSize = 24
  } = params

  let results = objects.slice()

  results = results.filter((o) => withinPeriod(o.year))

  if (q) {
    const qq = q.toLowerCase()
    results = results.filter((o) =>
      [o.title_en, o.title_nl, o.maker, o.material.join(' ')].some((f) =>
        (f || '').toLowerCase().includes(qq)
      )
    )
  }
  if (category) results = results.filter((o) => o.category === category)
  if (material) results = results.filter((o) => o.material.includes(material))
  if (maker) results = results.filter((o) => (o.maker || '').includes(maker))
  if (period) results = results.filter((o) => o.period === period)
  if (region) results = results.filter((o) => (o.region || '') === region)
  if (year_from) results = results.filter((o) => (o.year || 0) >= year_from)
  if (year_to) results = results.filter((o) => (o.year || 0) <= year_to)
  if (status !== 'All') results = results.filter((o) => o.status === status)

  if (sort === 'maker_az') results.sort((a, b) => (a.maker || '').localeCompare(b.maker || ''))
  if (sort === 'year_asc') results.sort((a, b) => (a.year || 0) - (b.year || 0))
  if (sort === 'year_desc') results.sort((a, b) => (b.year || 0) - (a.year || 0))

  const total = results.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageItems = results.slice(start, end)

  return { total, items: pageItems }
}
