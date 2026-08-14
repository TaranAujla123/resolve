#!/usr/bin/env node
/**
 * Render a replacement G1 single-image ad for AS-1 General.
 *
 * Original G1 v3 hook "Need to sell quietly?" pulled 0% CTR over 61
 * impressions — too generic, doesn't trigger a specific scenario in
 * the scroller's brain. Replacement names the off-MLS / discretion
 * lane explicitly.
 *
 * New hook: "Need to sell, but not publicly?"
 * New sub:  "We list discreetly. No neighbourhood drama."
 *
 * Style mirrors render-v3-ads.mjs navy register (eyebrow + Newsreader
 * hook + bronze italic sub + Resolve footer).
 *
 * Output (1080×1080 PNG):
 *   public/ads/v3-gen-need-sell-not-publicly.png
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = path.join(REPO_ROOT, 'public', 'ads')

const NAVY = '#051A2C'
const STONE = '#F5F1E8'
const BRONZE = '#C8A56B'

const BOARD = {
  name: 'v3-gen-need-sell-not-publicly.png',
  eyebrow: 'GTA · SELLER REPRESENTATION',
  hook: 'Need to sell,<br />but not publicly?',
  sub: 'We list discreetly. No neighbourhood drama.',
  hookSize: 92,
}

function buildHtml(b) {
  const text = STONE
  const textSoft = 'rgba(245, 241, 232, 0.78)'
  const textMute = 'rgba(245, 241, 232, 0.55)'
  const dividerCol = 'rgba(200, 165, 107, 0.30)'

  return `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${NAVY}; }
  .board {
    width: 1080px; height: 1080px;
    background: ${NAVY};
    color: ${text};
    overflow: hidden;
    position: relative;
  }
  .content {
    height: 100%;
    padding: 100px 100px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 22px;
    color: ${BRONZE};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0 0 80px;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${text};
    font-size: ${b.hookSize}px;
    line-height: 1.04;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 900px;
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 48px; line-height: 1.18;
    margin: 48px 0 0;
    max-width: 820px;
  }
  .footer {
    padding-top: 28px;
    border-top: 1px solid ${dividerCol};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 56px;
    color: ${text};
    line-height: 0.82;
    letter-spacing: -0.005em;
  }
  .wordmark__dot {
    display: inline-block;
    width: 0.2em; height: 0.2em;
    border-radius: 50%;
    background: ${BRONZE};
    margin: 0 0.14em;
    vertical-align: 0.12em;
  }
  .wordmark__divider {
    height: 1px; background: ${BRONZE}; opacity: 0.5;
    width: 70%; margin: 6px 0;
  }
  .wordmark__descriptor {
    font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 11px;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: ${BRONZE};
  }
  .footer-attribution {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${textSoft};
    line-height: 1.5;
    margin-top: 12px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 22px; color: ${BRONZE}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 14px;
    color: ${textMute};
    margin-top: 6px;
  }
</style></head>
<body>
<div class="board">
  <div class="content">
    <div>
      <p class="eyebrow">${b.eyebrow}</p>
      <h2 class="hook">${b.hook}</h2>
      <p class="sub">${b.sub}</p>
    </div>
    <div class="footer">
      <div>
        <div>
          <div class="wordmark__row">Re<span class="wordmark__dot"></span>solve</div>
          <div class="wordmark__divider"></div>
          <div class="wordmark__descriptor">Seller Representation</div>
        </div>
        <div class="footer-attribution">
          HomeLife G1 Realty Inc., Brokerage<br />
          Independently Owned &amp; Operated
        </div>
      </div>
      <div class="footer-right">
        <div class="url">resolveproperty.ca</div>
        <div class="phone">(365) 645-7332</div>
      </div>
    </div>
  </div>
</div>
</body></html>`
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  console.log('[g1-v3-2] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })
  await page.setContent(buildHtml(BOARD), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 700))
  const outPath = path.join(OUT_DIR, BOARD.name)
  const board = await page.$('.board')
  await board.screenshot({ path: outPath, omitBackground: false })
  const stat = await fs.stat(outPath)
  console.log(`  ✓ ${BOARD.name} — ${(stat.size / 1024).toFixed(0)} KB`)
  await browser.close()
}

run().catch((err) => { console.error(err); process.exit(1) })
