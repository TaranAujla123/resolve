// -----------------------------------------------------------------------
// scripts/prerender.mjs
// -----------------------------------------------------------------------
// Static site generation step that runs AFTER `vite build`.
//
// 1. Spins up `vite preview` against the freshly built `dist/` folder.
// 2. Launches a headless Chromium via Puppeteer.
// 3. For each route in ROUTES below, navigates, waits for hydration so
//    react-helmet-async has flushed all <title> / <meta> / <link> /
//    JSON-LD updates, then captures the full DOM.
// 4. Writes the captured HTML to `dist/<route>/index.html` (or
//    `dist/index.html` for `/`), overwriting the SPA shell.
//
// The result: each route ships as a real static HTML file with the
// correct per-route head — title, description, canonical, Open Graph,
// Twitter Card, and JSON-LD — so Google, social-preview bots, and
// non-JS crawlers see the right metadata for that route.
//
// To add a new route: append the path to ROUTES below.
// -----------------------------------------------------------------------

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/buyers',
  '/power-of-sale',
  '/mortgage-arrears',
  '/estate-sale',
  '/divorce-real-estate',
  '/property-disputes',
  '/time-sensitive-sales',
  '/for-agents',
  '/privacy',
  '/thanks',
  '/get-help',
  '/get-deals',
]
const PORT = 4321
const NAV_TIMEOUT_MS = 30_000
// Helmet flushes synchronously on mount but we give a small grace
// period for any animation / framer-motion deferred work to settle.
const SETTLE_MS = 250

async function run() {
  console.log('[prerender] starting vite preview server on port', PORT)
  const server = await preview({
    root: ROOT,
    preview: {
      port: PORT,
      host: '127.0.0.1',
      strictPort: true,
      open: false,
    },
  })

  console.log('[prerender] launching headless chromium')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    for (const route of ROUTES) {
      const url = `http://127.0.0.1:${PORT}${route}`
      console.log(`[prerender] capturing ${route}  ->  ${url}`)

      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS)
      // Quiet down noisy preview-mode logs so the CI output stays readable
      page.on('pageerror', (err) => console.error(`[prerender:${route}] pageerror:`, err.message))

      await page.goto(url, { waitUntil: 'networkidle0' })
      // Wait for the React root to exist (basic hydration check)
      await page.waitForSelector('#root > *', { timeout: NAV_TIMEOUT_MS })
      // Settle for animations / Helmet flush
      await new Promise((r) => setTimeout(r, SETTLE_MS))

      const html = await page.content()

      const outPath =
        route === '/'
          ? path.join(DIST, 'index.html')
          : path.join(DIST, route.replace(/^\//, ''), 'index.html')

      await fs.mkdir(path.dirname(outPath), { recursive: true })
      await fs.writeFile(outPath, html, 'utf-8')
      console.log(`[prerender] wrote ${path.relative(ROOT, outPath)}`)

      await page.close()
    }
  } finally {
    await browser.close()
    // vite preview server's underlying http server lives at server.httpServer
    await new Promise((resolve, reject) => {
      server.httpServer.close((err) => (err ? reject(err) : resolve()))
    })
    console.log('[prerender] done')
  }
}

run().catch((err) => {
  console.error('[prerender] FAILED:', err)
  process.exit(1)
})
