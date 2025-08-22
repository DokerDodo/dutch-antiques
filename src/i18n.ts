import type { Locale } from './types'

export const locales: Locale[] = ['en', 'nl']
export const defaultLocale: Locale = 'en'

export const t = (loc: Locale) => ({
  siteTitle: 'Dutch Antiques',
  ownerCredit: 'jeunes arbres',
  nav: {
    home: loc === 'nl' ? 'Home' : 'Home',
    collection: loc === 'nl' ? 'Collectie' : 'Collection',
    categories: loc === 'nl' ? 'Categorieën' : 'Categories',
    about: loc === 'nl' ? 'Over' : 'About',
    contact: loc === 'nl' ? 'Contact' : 'Contact',
  },
  cta_view_collection: loc === 'nl' ? 'Bekijk Collectie' : 'View Collection',
  cta_contact: loc === 'nl' ? 'Contact' : 'Contact',
  hero: {
    title: loc === 'nl' ? 'Dutch Antiques' : 'Dutch Antiques',
    subtitle: loc === 'nl'
      ? 'Gothische en klassieke stukken, 1200–1850. Demo items (placeholder).' 
      : 'Gothic and classical pieces, 1200–1850. Demo items (placeholder).',
  },
  filters: {
    search: loc === 'nl' ? 'Zoeken' : 'Search',
    category: loc === 'nl' ? 'Categorie' : 'Category',
    material: loc === 'nl' ? 'Materiaal' : 'Material',
    maker: loc === 'nl' ? 'Maker/Atelier' : 'Maker/Atelier',
    period: loc === 'nl' ? 'Periode' : 'Period',
    reset: loc === 'nl' ? 'Reset' : 'Reset',
    sort: loc === 'nl' ? 'Sorteren' : 'Sort',
    sort_maker: loc === 'nl' ? 'A→Z Maker' : 'A→Z Maker',
    sort_year_asc: loc === 'nl' ? 'Jaar ↑' : 'Year ↑',
    sort_year_desc: loc === 'nl' ? 'Jaar ↓' : 'Year ↓',
  },
  labels: {
    featured: loc === 'nl' ? 'Uitgelicht' : 'Featured',
    available: loc === 'nl' ? 'Beschikbaar' : 'Available',
    sold: loc === 'nl' ? 'Verkocht' : 'Sold',
    archive: loc === 'nl' ? 'Archief' : 'Archive'
  },
  categories: {
    Drawings: loc === 'nl' ? 'Tekeningen' : 'Drawings',
    Glasswork: loc === 'nl' ? 'Glaswerk' : 'Glasswork',
    Bodemvondsten: loc === 'nl' ? 'Bodemvondsten' : 'Bodemvondsten',
  },
  contact_intro: loc === 'nl' ? 'Neem contact op over dit object.' : 'Get in touch about this object.'
})
