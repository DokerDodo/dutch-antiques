import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title = 'Dutch Antiques' }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="theme-color" content="#F8F3E7" />
        <link href="/static/styles.css" rel="stylesheet" />
      </head>
      <body>
        <header class="header" role="banner">
          <div class="container brand">
            <div class="brand-title">Dutch Antiques</div>
            <div class="brand-credit" aria-label="owner credit">jeunes arbres</div>
          </div>
        </header>
        <main id="main" class="container" role="main">{children}</main>
        <footer class="footer" role="contentinfo">
          <div class="container">© Demo — 1200–1850 only. No prices.</div>
        </footer>
        <div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button id="lightbox-close" aria-label="Close" class="focus-ring" style="position:absolute;top:1rem;right:1rem;background:#fff;border:1px solid #ccc;border-radius:6px;padding:.4rem .6rem">✕</button>
          <img src="" alt="" />
        </div>
        <script src="/static/app.js" defer></script>
      </body>
    </html>
  )
})
