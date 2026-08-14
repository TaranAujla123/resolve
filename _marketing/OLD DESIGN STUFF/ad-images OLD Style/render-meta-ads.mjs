#!/usr/bin/env node
/**
 * Resolve Meta Ads — render concept-directions.html boards to production
 * PNG files for Meta upload.
 *
 * Pulls the boards out of the concept HTML by label-text matching (so
 * the source HTML doesn't need any extra IDs or render markers), strips
 * the preview chrome (rounded corners + drop shadow) so each PNG is a
 * clean 1080×1080 production asset, and saves them organised by pack.
 *
 * Output:
 *   COWORK OUTPUT/Marketing/Meta-Ads/_first-batch/renders/   (7 boards)
 *   COWORK OUTPUT/Marketing/Meta-Ads/_arrears-pack/renders/  (5 boards)
 *
 * Usage:
 *   node _marketing/ad-images/render-meta-ads.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const META_ADS_ROOT = path.join(REPO_ROOT, 'COWORK OUTPUT', 'Marketing', 'Meta-Ads')
const CONCEPT_HTML = path.join(META_ADS_ROOT, '_concept-mockups', 'concept-directions.html')

const FIRST_BATCH_OUT = path.join(META_ADS_ROOT, '_first-batch', 'renders')
const ARREARS_PACK_OUT = path.join(META_ADS_ROOT, '_arrears-pack', 'renders')

/**
 * Render manifest. labelMatch is the exact label text that uniquely
 * identifies the board in concept-directions.html — we match against
 * the .board-label element inside each .board-wrap. The name becomes
 * the output filename stem.
 */
const RENDERS = [
  // First batch (the 7 creatives spec'd in _first-batch/)
  { labelMatch: 'Board H1 ·',  name: '01-h1-arrears-missed-payment',    outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board H3 ·',  name: '02-h3-tss-60-day-close',           outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board H4 ·',  name: '03-h4-separation-matrimonial',     outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board H6 ·',  name: '04-h6-six-situations-cross',       outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board 09 ·',  name: '05-b1-tss-30-60-90',                outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board 02 ·',  name: '06-b1-pos-35-days',                 outDir: FIRST_BATCH_OUT },
  { labelMatch: 'Board A4 ·',  name: '07-a4-when-listing-isnt-strategy',  outDir: FIRST_BATCH_OUT },

  // Arrears A/B test pack (the 5 H14-H18 variants spec'd in _arrears-pack/)
  { labelMatch: 'Board H14 ·', name: '01-h14-arrears-two-payments-behind',  outDir: ARREARS_PACK_OUT },
  { labelMatch: 'Board H15 ·', name: '02-h15-arrears-before-next-payment',  outDir: ARREARS_PACK_OUT },
  { labelMatch: 'Board H16 ·', name: '03-h16-arrears-every-week-is-equity', outDir: ARREARS_PACK_OUT },
  { labelMatch: 'Board H17 ·', name: '04-h17-arrears-dont-reply-yet',       outDir: ARREARS_PACK_OUT },
  { labelMatch: 'Board H18 ·', name: '05-h18-arrears-three-months',         outDir: ARREARS_PACK_OUT },
]

async function run() {
  await fs.mkdir(FIRST_BATCH_OUT, { recursive: true })
  await fs.mkdir(ARREARS_PACK_OUT, { recursive: true })

  console.log('[render] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  // 1280px viewport keeps the .board at full 1080×1080
  // (the deck collapses to fluid width below the 1140px media query).
  // deviceScaleFactor: 2 produces sharp 2160×2160 PNGs — Meta will
  // downscale on display, but the asset is crisp for any placement.
  await page.setViewport({ width: 1280, height: 1280, deviceScaleFactor: 2 })

  const fileUrl = 'file:///' + CONCEPT_HTML.replace(/\\/g, '/')
  console.log(`[render] loading ${fileUrl}`)
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60_000 })

  // Wait for Google Fonts to finish loading so screenshots have the
  // production Newsreader + Inter typefaces, not the fallback.
  await page.evaluate(() => document.fonts.ready)
  // Small extra settle for any background images.
  await new Promise((r) => setTimeout(r, 800))

  // Strip the preview chrome (rounded corners + drop shadow) so each
  // PNG looks like the final flat asset Meta will display.
  await page.addStyleTag({
    content: `
      .board { border-radius: 0 !important; box-shadow: none !important; }
      body { background: #0A0A0A !important; }
    `,
  })

  // Hide the deck header so the JS that walks .board-wrap doesn't trip
  // on it. (Not strictly needed but cleaner.)
  await page.evaluate(() => {
    document.querySelectorAll('.deck-header').forEach((el) => (el.style.display = 'none'))
  })

  let succeeded = 0
  let failed = 0

  for (const r of RENDERS) {
    const elHandle = await page.evaluateHandle((labelMatch) => {
      const wraps = document.querySelectorAll('.board-wrap')
      for (const wrap of wraps) {
        const label = wrap.querySelector('.board-label')
        if (label && label.textContent.includes(labelMatch)) {
          return wrap.querySelector('.board')
        }
      }
      return null
    }, r.labelMatch)

    const element = elHandle.asElement()
    if (!element) {
      console.error(`  ✗ ${r.name} — label "${r.labelMatch}" not found`)
      failed += 1
      continue
    }

    // Scroll the element into view so it renders fully before screenshotting.
    await element.scrollIntoView()
    await new Promise((r) => setTimeout(r, 200))

    const outPath = path.join(r.outDir, `${r.name}_1x1.png`)
    await element.screenshot({
      path: outPath,
      omitBackground: false,
    })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ ${r.name}_1x1.png — ${(stat.size / 1024).toFixed(0)} KB`)
    succeeded += 1
  }

  await browser.close()
  console.log(`\n[render] done — ${succeeded} rendered, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('[render] FAILED:', err)
  process.exit(1)
})
