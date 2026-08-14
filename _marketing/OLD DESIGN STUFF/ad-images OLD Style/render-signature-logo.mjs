#!/usr/bin/env node
/**
 * Render the V2 Resolve signature marks for use in email signatures
 * (and any other context that needs the wordmark on a light
 * background without a baked-in stone field).
 *
 * Uses Puppeteer's omitBackground:true to produce truly transparent
 * PNGs. The HTML/CSS exactly mirrors the V2 .resolve-wordmark spec in
 * src/index.css so the output matches the site brand pixel-for-pixel.
 *
 * Two files are rendered in one pass:
 *
 *   public/signature-logo.png   FULL lockup — Re·solve wordmark +
 *                               bronze divider + SELLER REPRESENTATION
 *                               descriptor. Used by Dave's and Taran's
 *                               personal email signatures at width=200.
 *
 *   public/signature-mark.png   COMPACT lockup — Re·solve wordmark only.
 *                               No divider, no descriptor. Used by the
 *                               catchall info@ signature at width=160
 *                               where the descriptor would render too
 *                               small to be useful.
 *
 * Both URLs (https://resolveproperty.ca/signature-logo.png and
 * /signature-mark.png) are referenced by signature HTML files in
 * /signatures/, so every email signature picks up the V2 mark
 * automatically after the next GitHub Pages deploy.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const PUBLIC_DIR = path.join(REPO_ROOT, 'public')

// Locked V2 brand tokens — these MUST match src/index.css :root.
const NAVY   = '#051A2C'
const BRONZE = '#C8A56B'

// Render variants. Each produces a transparent PNG at 2x retina via
// deviceScaleFactor:2 below.
const VARIANTS = [
  {
    name: 'signature-logo.png',
    canvasW: 800,
    canvasH: 320,
    fontSizePx: 180,
    descriptor: true,    // include the SELLER REPRESENTATION line
    divider: true,
  },
  {
    name: 'signature-mark.png',
    canvasW: 800,
    canvasH: 200,
    fontSizePx: 200,
    descriptor: false,   // compact mark — wordmark only
    divider: false,
  },
]

function buildHtml({ canvasW, canvasH, fontSizePx, descriptor, divider }) {
  const dividerHtml    = divider    ? `<div class="divider"></div>`                         : ''
  const descriptorHtml = descriptor ? `<div class="descriptor">Seller Representation</div>` : ''
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Newsreader:wght@500&display=swap" rel="stylesheet" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .stage {
    width: ${canvasW}px;
    height: ${canvasH}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* Host font-size drives every nested measurement via em — the entire
     mark scales proportionally if this number changes. */
  .resolve-wordmark {
    font-size: ${fontSizePx}px;
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
  <div class="resolve-wordmark">
    <div class="wm">Re<span class="dot"></span>solve</div>
    ${dividerHtml}
    ${descriptorHtml}
  </div>
</div>
</body></html>`
}

async function run() {
  console.log('[signature-logo] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  for (const v of VARIANTS) {
    // 2x device scale = sharp retina output.
    await page.setViewport({ width: v.canvasW, height: v.canvasH, deviceScaleFactor: 2 })
    await page.setContent(buildHtml(v), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    // Small settle so the fonts apply before screenshot.
    await new Promise((r) => setTimeout(r, 600))

    const outPath = path.join(PUBLIC_DIR, v.name)
    const stage = await page.$('.stage')
    await stage.screenshot({
      path: outPath,
      omitBackground: true,
      type: 'png',
    })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ ${v.name} — ${v.canvasW * 2}x${v.canvasH * 2} — ${(stat.size / 1024).toFixed(0)} KB`)
  }
  await browser.close()
}

run().catch((err) => { console.error(err); process.exit(1) })
