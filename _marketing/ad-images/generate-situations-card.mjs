#!/usr/bin/env node
/**
 * Resolve — Situations card generator (typographic, no portrait)
 *
 * Renders a 1080x1350 (4:5) typography-led ad image that puts the
 * situations Resolve handles at the centre, not the agent. The brief
 * was: less emphasis on the practitioner, more on the audience's
 * actual problem. Light background to match the site's page treatment
 * rather than the dark navy of the portrait-based ads.
 *
 * This one is rendered via HTML + Puppeteer (already in the repo's
 * tooling for the prerender pipeline) for pixel-perfect typography.
 * No AI generation, no text artifact risk.
 *
 * Brand spec:
 *   - Background: pale blue-gray (#E8EDF0)
 *   - Headline + eyebrows: Resolve navy (#0A1F44)
 *   - Situations list + dot accent: sage emerald (#1F8B5A)
 *   - Subtle text: ink mute gray (#64748B)
 *   - Font: Poppins (the site's display font), loaded from Google Fonts
 *
 * Usage:
 *   node _marketing/ad-images/generate-situations-card.mjs
 *
 * Output:
 *   _marketing/ad-images/output/situations-card-<timestamp>.png
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const OUTPUT_DIR = path.join(__dirname, 'output')
await fs.mkdir(OUTPUT_DIR, { recursive: true })

const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg:           #E8EDF0;
      --navy:         #0A1F44;
      --emerald:      #1F8B5A;
      --ink-mute:     #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1080px;
      height: 1350px;
      background: var(--bg);
      font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: var(--navy);
    }
    .card {
      width: 1080px;
      height: 1350px;
      padding: 100px 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .eyebrow {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--navy);
    }

    .headline {
      font-size: 96px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.015em;
      color: var(--navy);
      margin-top: 40px;
      max-width: 850px;
    }

    .situations {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .situations li {
      list-style: none;
      font-size: 56px;
      font-weight: 600;
      letter-spacing: 0.005em;
      line-height: 1.15;
      color: var(--emerald);
    }

    .dot {
      width: 28px;
      height: 28px;
      border-radius: 999px;
      background: var(--emerald);
      margin-top: 28px;
    }

    .footer {
      margin-top: auto;
    }
    .footer-eyebrow {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--navy);
    }
    .footer-row {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 24px;
      color: var(--ink-mute);
      font-weight: 400;
    }
    .footer-row .url {
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="card">
    <div>
      <p class="eyebrow">Resolve &middot; Seller Representation</p>
      <h1 class="headline">Facing a Difficult Property Situation?</h1>
      <ul class="situations">
        <li>Mortgage Arrears</li>
        <li>Power of Sale</li>
        <li>Separation</li>
        <li>Disputes</li>
        <li>Estate Sales</li>
      </ul>
      <div class="dot" aria-hidden="true"></div>
    </div>
    <div class="footer">
      <p class="footer-eyebrow">An Introduction</p>
      <div class="footer-row">
        <span>HomeLife G1 Realty Inc., Brokerage</span>
        <span class="url">resolveproperty.ca</span>
      </div>
    </div>
  </div>
</body>
</html>`

console.log('Launching headless chromium...')
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 })
  await page.setContent(HTML, { waitUntil: 'networkidle0' })

  // Belt-and-suspenders: give web fonts an extra moment to settle so
  // the captured image renders Poppins, not the system fallback.
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 200))

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outPath = path.join(OUTPUT_DIR, `situations-card-${stamp}.png`)
  await page.screenshot({
    path: outPath,
    type: 'png',
    omitBackground: false,
  })

  const stat = await fs.stat(outPath)
  console.log('')
  console.log('=== DONE ===')
  console.log(`  File:   ${path.relative(REPO_ROOT, outPath)}`)
  console.log(`  Size:   ${(stat.size / 1024).toFixed(1)} KB`)
  console.log(`  Pixels: 2160 x 2700 (1080x1350 @ 2x retina)`)
} finally {
  await browser.close()
}
