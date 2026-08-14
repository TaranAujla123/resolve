#!/usr/bin/env node
/**
 * Render v3 single-image ad creatives — option 1 overhaul.
 *
 * Per user direction (Brampton+25km radius = GTA reach):
 *  - Eyebrow: "GTA · SELLER REPRESENTATION" on every board so the role
 *    is unmistakable in the first half-second.
 *  - Hooks: plain conversational question-form, no numbers (RECO 5.1
 *    + we don't know the viewer's specific situation).
 *  - Sub: one short reassurance line under the hook.
 *  - No body paragraph — keeps the visual clean for scroll.
 *
 * 11 boards: 4 arrears + 4 power-of-sale + 3 general.
 * Mix of navy (#051A2C) and stone (#F5F1E8) backgrounds so the ad-set
 * rotation has visual contrast in feed.
 *
 * Output: 1080×1080 PNG @ 2x retina, public/ads/v3-*.png
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
const BRONZE_ON_NAVY = '#C8A56B'
const BRONZE_ON_STONE = '#AC8E5C'

function buildHtml(b) {
  const isNavy = b.bg === 'navy'
  const bg = isNavy ? NAVY : STONE
  const text = isNavy ? STONE : NAVY
  const bronze = isNavy ? BRONZE_ON_NAVY : BRONZE_ON_STONE
  const textSoft = isNavy ? 'rgba(245, 241, 232, 0.78)' : 'rgba(5, 26, 44, 0.78)'
  const textMute = isNavy ? 'rgba(245, 241, 232, 0.55)' : 'rgba(5, 26, 44, 0.55)'
  const dividerCol = isNavy ? 'rgba(200, 165, 107, 0.30)' : 'rgba(5, 26, 44, 0.18)'

  return `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${bg}; }
  .board {
    width: 1080px; height: 1080px;
    background: ${bg};
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
    color: ${bronze};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0 0 80px;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${text};
    font-size: ${b.hookSize || 100}px;
    line-height: 1.04;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 900px;
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${bronze};
    font-size: 48px; line-height: 1.18;
    margin: 48px 0 0;
    max-width: 820px;
  }

  /* Footer divider + wordmark + brokerage attribution */
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
    background: ${bronze};
    margin: 0 0.14em;
    vertical-align: 0.12em;
  }
  .wordmark__divider {
    height: 1px; background: ${bronze}; opacity: 0.5;
    width: 70%; margin: 6px 0;
  }
  .wordmark__descriptor {
    font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 11px;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: ${bronze};
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
    font-weight: 600; font-size: 22px; color: ${bronze}; letter-spacing: 0.02em;
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

const EYEBROW = 'GTA · SELLER REPRESENTATION'

const BOARDS = [
  // ─── ARREARS ────────────────────────────────────────────────────────
  {
    name: 'v3-arrears-missed-payment.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Missed a mortgage<br />payment?',
    sub: 'Sell on your terms. Before the bank steps in.',
  },
  {
    name: 'v3-arrears-behind-mortgage.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Behind on the<br />mortgage?',
    sub: 'Sell the home. Keep the equity.',
  },
  {
    name: 'v3-arrears-cash-out-equity.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Cash out the equity<br />before the bank does.',
    hookSize: 88,
    sub: 'We list. We sell. You keep what’s yours.',
  },
  {
    name: 'v3-arrears-worried-losing-house.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Worried about<br />losing the house?',
    sub: 'Sell first. Settle second.',
  },

  // ─── POWER OF SALE ──────────────────────────────────────────────────
  {
    name: 'v3-pos-notice-of-sale.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Got a Notice<br />of Sale?',
    sub: 'Sell on your terms. Before the bank lists it.',
  },
  {
    name: 'v3-pos-dont-let-bank.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Don’t let the bank<br />list your house.',
    sub: 'Sell on your terms instead.',
  },
  {
    name: 'v3-pos-bank-starting.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Bank starting a<br />Power of Sale?',
    sub: 'You can still sell it yourself.',
  },
  {
    name: 'v3-pos-keep-equity.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Power of Sale notice<br />from the bank?',
    hookSize: 88,
    sub: 'Sell the home. Keep the equity.',
  },

  // ─── GENERAL / CROSS-CUTTING ────────────────────────────────────────
  {
    name: 'v3-gen-sell-quietly.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Need to sell<br />quietly?',
    sub: 'Arrears, divorce, estate, deadlines — we handle the hard ones.',
  },
  {
    name: 'v3-gen-not-regular-sale.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Not a regular<br />home sale?',
    sub: 'We handle the ones that aren’t.',
  },
  {
    name: 'v3-gen-difficult-situation.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Going through<br />something difficult?',
    sub: 'We sell the home discreetly.',
  },
]

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  console.log('[v3-ads] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })

  for (const b of BOARDS) {
    await page.setContent(buildHtml(b), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 700))
    const outPath = path.join(OUT_DIR, b.name)
    const board = await page.$('.board')
    await board.screenshot({ path: outPath, omitBackground: false })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ ${b.name} — ${(stat.size / 1024).toFixed(0)} KB`)
  }
  await browser.close()
  console.log('[v3-ads] done')
}

run().catch((err) => { console.error(err); process.exit(1) })
