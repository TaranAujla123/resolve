#!/usr/bin/env node
/**
 * Resolve Meta Ads — render ALL 31 active concept boards to PNG.
 *
 * One renderer, one output folder (_all-creatives/), one consolidated
 * naming scheme. Sequential numbering 01-31 sorts the files
 * alphabetically into category groups for easy browsing alongside
 * AD-COPY-GUIDE.md.
 *
 * Output:
 *   COWORK OUTPUT/Marketing/Meta-Ads/_all-creatives/*.png
 *   (2160×2160 PNG — 2x retina of Meta's 1080×1080 minimum)
 *
 * Usage:
 *   node _marketing/ad-images/render-all-creatives.mjs
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
const OUT_DIR = path.join(META_ADS_ROOT, '_all-creatives')

/**
 * All 31 active concept boards. Sequential numbering groups them by
 * category alphabetically so the folder is easy to scan. The PNG
 * filename appears verbatim in AD-COPY-GUIDE.md.
 */
const RENDERS = [
  // Awareness (4) — top-of-funnel umbrella
  { labelMatch: 'Board A1 ·',  name: '01-awareness-a1-site-mirror' },
  { labelMatch: 'Board A2 ·',  name: '02-awareness-a2-open-question' },
  { labelMatch: 'Board A3 ·',  name: '03-awareness-a3-typography' },
  { labelMatch: 'Board A4 ·',  name: '04-awareness-a4-sharp-edge' },

  // Mortgage Arrears (9)
  { labelMatch: 'Board 01 ·',  name: '05-arrears-01-equity-still-yours' },
  { labelMatch: 'Board 05 ·',  name: '06-arrears-05-bank-doesnt-want-house' },
  { labelMatch: 'Board H1 ·',  name: '07-arrears-h1-missed-payment' },
  { labelMatch: 'Board H9 ·',  name: '08-arrears-h9-earlier-file-read' },
  { labelMatch: 'Board H14 ·', name: '09-arrears-h14-two-payments-behind' },
  { labelMatch: 'Board H15 ·', name: '10-arrears-h15-before-next-payment' },
  { labelMatch: 'Board H16 ·', name: '11-arrears-h16-every-week-equity' },
  { labelMatch: 'Board H17 ·', name: '12-arrears-h17-dont-reply-yet' },
  { labelMatch: 'Board H18 ·', name: '13-arrears-h18-three-months' },

  // Cross-cutting (1)
  { labelMatch: 'Board H6 ·',  name: '14-crosscutting-h6-six-situations' },

  // Property Disputes (1)
  { labelMatch: 'Board H7 ·',  name: '15-disputes-h7-co-owners' },

  // Estate Sales (2)
  { labelMatch: 'Board H5 ·',  name: '16-estate-h5-move-differently' },
  { labelMatch: 'Board H13 ·', name: '17-estate-h13-three-beneficiaries' },

  // Power of Sale (5)
  { labelMatch: 'Board 02 ·',  name: '18-pos-02-35-days' },
  { labelMatch: 'Board 07 ·',  name: '19-pos-07-not-the-end-deadline' },
  { labelMatch: 'Board H2 ·',  name: '20-pos-h2-notice-of-sale' },
  { labelMatch: 'Board H8 ·',  name: '21-pos-h8-before-you-reply-stone' },
  { labelMatch: 'Board H10 ·', name: '22-pos-h10-not-the-end-options' },

  // Separation & Divorce (4)
  { labelMatch: 'Board 04 ·',  name: '23-separation-04-both-names-key' },
  { labelMatch: 'Board 11 ·',  name: '24-separation-11-both-names-headline' },
  { labelMatch: 'Board H4 ·',  name: '25-separation-h4-matrimonial-quietly' },
  { labelMatch: 'Board H12 ·', name: '26-separation-h12-one-agent-both-names' },

  // Time-Sensitive Sales (5)
  { labelMatch: 'Board 03 ·',  name: '27-tss-03-clock-some-sales' },
  { labelMatch: 'Board 09 ·',  name: '28-tss-09-30-60-90-comparison' },
  { labelMatch: 'Board 10 ·',  name: '29-tss-10-some-sales-bluf' },
  { labelMatch: 'Board H3 ·',  name: '30-tss-h3-60-day-close' },
  { labelMatch: 'Board H11 ·', name: '31-tss-h11-not-sale-strategy' },
]

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  console.log(`[render-all] launching puppeteer · ${RENDERS.length} boards queued`)
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 1280, deviceScaleFactor: 2 })

  const fileUrl = 'file:///' + CONCEPT_HTML.replace(/\\/g, '/')
  console.log(`[render-all] loading ${fileUrl}`)
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60_000 })

  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 1200))

  // Strip preview chrome (rounded corners + drop shadow) so each PNG
  // is a flat production asset for Meta upload.
  await page.addStyleTag({
    content: `
      .board { border-radius: 0 !important; box-shadow: none !important; }
      body { background: #0A0A0A !important; }
      .deck-header, .strategy-note { display: none !important; }
    `,
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

    await element.scrollIntoView()
    await new Promise((r) => setTimeout(r, 200))

    const outPath = path.join(OUT_DIR, `${r.name}.png`)
    await element.screenshot({ path: outPath, omitBackground: false })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ ${r.name}.png — ${(stat.size / 1024).toFixed(0)} KB`)
    succeeded += 1
  }

  await browser.close()
  console.log(`\n[render-all] done — ${succeeded} rendered, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('[render-all] FAILED:', err)
  process.exit(1)
})
