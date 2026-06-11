#!/usr/bin/env node
/**
 * Re-render the B1 Buyer Network ad with a simpler layout that
 * breathes at mobile preview size.
 *
 * Changes from the original:
 *   - Drops the 3-item numbered list (moved into Meta primary text)
 *   - Hook bumped from 96px → 116px so it reads at thumbnail scale
 *   - Italic sub bumped from 54px → 62px
 *   - More vertical breathing room around hook+sub
 *
 * Output:
 *   public/ads/b1-buyer-simple.png
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = path.join(REPO_ROOT, 'public', 'ads')

const NAVY      = '#051A2C'
const BRONZE    = '#C8A56B'
const STONE     = '#F5F1E8'
const STONE_MUTE= 'rgba(245, 241, 232, 0.62)'
const DIVIDER   = 'rgba(216, 210, 200, 0.40)'

const HTML = `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${NAVY}; }
  .board {
    width: 1080px; height: 1080px;
    background: ${NAVY};
    color: ${STONE};
    overflow: hidden;
    position: relative;
  }
  .content {
    height: 100%;
    padding: 110px 110px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-stack {
    display: flex; flex-direction: column; gap: 36px;
    margin-bottom: 110px;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 24px;
    color: ${BRONZE};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${STONE};
    font-size: 116px; line-height: 1.04;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 880px;
    text-shadow: 0 2px 24px rgba(5,26,44,0.55);
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 62px; line-height: 1.08;
    margin: 42px 0 0;
    max-width: 820px;
  }
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding-top: 28px;
    border-top: 1px solid ${DIVIDER};
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 46px;
    color: ${STONE};
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
    font-size: 12.5px;
    color: ${STONE_MUTE};
    line-height: 1.5;
    margin-top: 8px;
  }
  .footer-lane-signal {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${BRONZE};
    margin-top: 10px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 20px; color: ${BRONZE}; letter-spacing: 0.02em;
  }
  .footer-right .phone { font-size: 13px; color: ${STONE_MUTE}; margin-top: 4px; }
</style></head>
<body>
<div class="board">
  <div class="content">
    <div>
      <div class="top-stack">
        <p class="eyebrow">Resolve · Buyer Network · Ontario</p>
      </div>
      <div>
        <h2 class="hook">Property opportunities<br />you won't see on MLS.</h2>
        <p class="sub">Match-based notification. Disclosed representation.</p>
      </div>
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
        <div class="footer-lane-signal">Real Estate Representation · Ontario</div>
      </div>
      <div class="footer-right">
        <div class="url">resolveproperty.ca</div>
        <div class="phone">(365) 645-7332</div>
      </div>
    </div>
  </div>
</div>
</body></html>`

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })
  await page.setContent(HTML, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 800))
  const outPath = path.join(OUT_DIR, 'b1-buyer-simple.png')
  const board = await page.$('.board')
  await board.screenshot({ path: outPath, omitBackground: false })
  const stat = await fs.stat(outPath)
  console.log(`  ✓ b1-buyer-simple.png — ${(stat.size / 1024).toFixed(0)} KB`)
  await browser.close()
}

run().catch((err) => { console.error(err); process.exit(1) })
