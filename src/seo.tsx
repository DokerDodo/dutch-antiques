import type { Locale } from './types'

export function absUrl(c: any, path: string) {
  const url = new URL(c.req.url)
  const base = `${url.protocol}//${url.host}`
  return base + path
}

export function alternates(loc: Locale, path: string) {
  return [
    { hrefLang: 'x-default', href: `/${'en'}${path}` },
    { hrefLang: 'en', href: `/${'en'}${path}` },
    { hrefLang: 'nl', href: `/${'nl'}${path}` }
  ]
}

export function defaultDescription(loc: Locale) {
  return loc === 'nl'
    ? 'Geselecteerde tekeningen, glaswerk en bodemvondsten (1200–1850). Demo-items, geen prijzen.'
    : 'Selected drawings, glasswork and archaeological finds (1200–1850). Demo items, no prices.'
}
