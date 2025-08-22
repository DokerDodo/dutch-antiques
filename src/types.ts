export type Locale = 'en' | 'nl'

export type Status = 'Available' | 'Sold' | 'Archive'
export type Category = 'Drawings' | 'Glasswork' | 'Bodemvondsten'

export type PeriodLabel =
  | '13th c.'
  | '14th c.'
  | '15th c.'
  | '16th c.'
  | '17th c.'
  | '18th c.'
  | '19th c.'

export type Dimensions = {
  h?: number
  w?: number
  d?: number
  unit: 'cm' | 'mm'
  weight_kg?: number
}

export type ObjectImage = {
  url: string
  alt_en: string
  alt_nl: string
  width?: number
  height?: number
}

export type ObjectItem = {
  id: string
  slug: string
  title_en: string
  title_nl: string
  maker?: string
  period: PeriodLabel
  year?: number
  region?: string
  category: Category
  material: string[]
  dimensions?: Dimensions
  condition?: string
  provenance?: string
  description_long_en?: string
  description_long_nl?: string
  images: ObjectImage[]
  pdf_factsheet_url?: string
  status: Status
  // INTERNAL ONLY (never render publicly)
  _inventory_id?: string
  _restoration_notes?: string
  _valuation_tax?: string
  // demo flags
  _demo_placeholder: true
  _demo_source: string
  featured?: boolean
}

export type SearchQuery = {
  q?: string
  category?: Category
  material?: string
  maker?: string
  period?: PeriodLabel
  year_from?: number
  year_to?: number
  region?: string
  status?: Exclude<Status, 'Archive'> | 'All'
  sort?: 'maker_az' | 'year_asc' | 'year_desc'
  page?: number
  pageSize?: number
}
