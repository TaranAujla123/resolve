#!/usr/bin/env node
/**
 * Render a transparent V2 Resolve signature logo for use in email
 * signatures (and any other context that needs the wordmark on a
 * light background without a baked-in stone field).
 *
 * Uses Puppeteer's omitBackground:true to produce a truly transparent
 * PNG. The HTML/CSS exactly mirrors the V2 .resolve-wordmark spec in
 * src/index.css so the output matches the site brand pixel-for-pixel.
 *
 * Output:
 *   public/signature-logo.png  (overwrites the V1 file)
 *
 * The deployed URL https://resolveproperty.ca/signature-logo.png is
 * referenced by every signature HTML in /signatures/, so all three
 * email signatures pick up the V2 mark automatically after the next
 * GitHub Pages deploy.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_PATH = path.join(REPO_ROOT, 'public', 'signature-logo.png')

// Locked V2 brand tokens — these MUST match src/index.css :root.
const NAVY   = '#051A2C'
const BRONZE = '#C8A56B'

// Render canvas. Output is 2x retina so the email display at width="200"
// renders crisp on hi-DPI displays. With deviceScaleFactor:2 below this
// becomes a 1600x640 PNG that displays sharp at 200x80 in the signature.
const CANVAS_W = 800
const CANVAS_H = 320

const HTML = `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Newsreader:wght@500&display=swap" rel="stylesheet" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .stage {
    width: ${CANVAS_W}px;
    height: ${CANVAS_H}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Host font-size drives every nested measurement via em — the entire
     mark scales proportionally if this number changes. 180px gives a
     visible descriptor at 17% (= ~30.6px before Inter's x-height drops
     to ~22px), readable in production email clients. */
  .resolve-wordmark {
    font-size: 180px;
    display: inline-block;
    text-align: center;
    line-height: 1;
  }
  .resolve-wordmark .wm {
    font-family: 'Newsreader', Georgia, ui-serif, serif;
    font-weight: 500;
    letter-spacing: -0.005em;
    /* line-height 0.82 — matches src/index.css. Resolve has no
       descending letters so the standard 1.0 leaves phantom space
       below the visible baseline. 0.82 pulls the box tight to the
       glyph bottom. */
    line-height: 0.82;
    font-size: inherit;
    color: ${NAVY};
    white-space: nowrap;
    display: inline-block;
  }
  .resolve-wordmark .wm .dot {
    display: inline-block;
    width: 0.2em;
    height: 0.2em;
    border-radius: 50%;
    background: ${BRONZE};
    /* x-height-centered per the live site spec. */
    margin: 0 0.14em;
    vertical-align: 0.12em;
  }
  .resolve-wordmark .divider {
    height: 1.5px;
    background: ${BRONZE};
    opacity: 0.5;
    width: 70%;
    margin: 0.12em auto 0.14em;
  }
  .resolve-wordmark .descriptor {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.17em;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${BRONZE};
    line-height: 1.2;
    white-space: nowrap;
  }
</style>
</head>
<body>
<div class="stage">
  <div class="resolve-wordmark" id="lockup">
    <div class="wm">Re<span class="dot"></span>solve</div>
    <div class="divider"></div>
    <div class="descriptor">Seller Representation</div>
  </div>
</div>
</body></html>`

async function run() {
  console.log('[signature-logo] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  // 2x device scale = sharp retina output. CANVAS_W*2 px wide in PNG.
  await page.setViewport({ width: CANVAS_W, height: CANVAS_H, deviceScaleFactor: 2 })
  await page.setContent(HTML, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  // Small settle so the fonts apply before screenshot.
  await new Promise((r) => setTimeout(r, 600))

  // Screenshot the inner stage with transparent background.
  const stage = await page.$('.stage')
  await stage.screenshot({
    path: OUT_PATH,
    omitBackground: true,
    type: 'png',
  })
  const stat = await fs.stat(OUT_PATH)
  console.log(`  ✓ ${OUT_PATH} — ${(stat.size / 1024).toFixed(0)} KB`)
  await browser.close()
}

run().catch((err) => { console.error(err); process.exit(1) })
