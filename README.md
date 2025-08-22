# Dutch Antiques — Showcase & Contact Site

Owner credit: jeunes arbres

Stack: Hono + Cloudflare Pages (edge), TypeScript, minimal prototype in this repo. No prices, no sales.

Features implemented:
- Home, Collection with filters/search/sort, Categories, About, Contact
- NL/EN locale routing under /nl and /en
- Object detail page with gallery, optional PDF, and "Contact about this object" drawer
- Demo content strictly 1200–1850 and flagged as placeholder
- Basic accessibility: focus rings, alt text, semantic landmarks

Editing guide (prototype):
- Add objects in src/data.ts (see ObjectItem type in src/types.ts)
- Home hero text from src/i18n.ts (can be CMS-driven later)
- To feature an object on Home, set featured: true in data

Contact form:
- Sends to stub endpoint (logs only). Add email/R2/KV/D1 integration later.
- Honeypot field _hp is present; add time gate on client if needed.

Run locally (sandbox):
- npm run build
- pm2 start ecosystem.config.cjs
- curl http://localhost:3000

Deployment:
- Wrangler Pages deploy: npm run deploy

Notes:
- All public text available in EN & NL; fallback to EN
- Hidden fields (_inventory_id, _restoration_notes, _valuation_tax) exist in data type and are never rendered
