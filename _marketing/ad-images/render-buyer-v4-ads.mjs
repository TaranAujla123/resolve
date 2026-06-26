#!/usr/bin/env node
/**
 * Render v4 BUYER-SIDE ad creatives — 2 single-image + 3 carousel cards.
 *
 * Buyer-side equivalent of the v3 seller-rep ads (render-v3-ads.mjs).
 * Same visual register (navy + stone, Newsreader display + Inter,
 * bronze accents, GTA eyebrow) so feeds carrying both campaigns
 * look like one practice with two doors.
 *
 * Single-image (1080×1080):
 *   buyer-v4-mls-bidding-wars.png    — navy, contrarian hook
 *   buyer-v4-cash-buyer-criteria.png — stone, qualifier hook
 *
 * Carousel cards (1080×1080, 3 cards):
 *   buyer-carousel-v4-01-hook.png    — "Tired of MLS bidding wars?"
 *   buyer-carousel-v4-02-access.png  — "Off-market deals from motivated GTA sellers."
 *   buyer-carousel-v4-03-cta.png     — CTA card
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR_SINGLE = path.join(REPO_ROOT, 'public', 'ads')
const OUT_DIR_CAROUSEL = path.join(REPO_ROOT, 'public', 'ads', 'carousels')

const NAVY = '#051A2C'
const STONE = '#F5F1E8'
const BRONZE_ON_NAVY = '#C8A56B'
const BRONZE_ON_STONE = '#AC8E5C'

const EYEBROW = 'GTA · BUYER NETWORK'

// ─── SINGLE-IMAGE TEMPLATE (mirror render-v3-ads.mjs) ───────────────
function buildSingleHtml(b) {
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
    font-weight: 500; font-size: 56px; color: ${text};
    line-height: 0.82; letter-spacing: -0.005em;
  }
  .wordmark__dot {
    display: inline-block; width: 0.2em; height: 0.2em;
    border-radius: 50%; background: ${bronze};
    margin: 0 0.14em; vertical-align: 0.12em;
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
    font-size: 13px; color: ${textSoft};
    line-height: 1.5; margin-top: 12px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 22px; color: ${bronze}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 14px; color: ${textMute}; margin-top: 6px;
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
          <div class="wordmark__descriptor">Buyer Network</div>
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

// ─── CAROUSEL CARD TEMPLATE (matches stone carousel pattern) ─────────
function buildCarouselHtml(slide, slideIndex, totalSlides) {
  let mainBlock
  if (slide.type === 'cta') {
    mainBlock = `
      <h2 class="hook hook--cta">${slide.hook}</h2>
      <div class="cta-button">${slide.ctaButton}</div>
      <p class="cta-url">${slide.ctaUrl}</p>
    `
  } else {
    mainBlock = `
      <h2 class="hook" style="font-size:${slide.hookSize || 92}px">${slide.hook}</h2>
      ${slide.sub ? `<p class="sub">${slide.sub}</p>` : ''}
    `
  }

  return `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${STONE}; }
  .board {
    width: 1080px; height: 1080px; background: ${STONE};
    color: ${NAVY}; overflow: hidden; position: relative;
  }
  .content {
    height: 100%; padding: 96px 96px 64px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .top-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 56px;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 20px; color: ${BRONZE_ON_STONE};
    letter-spacing: 0.22em; text-transform: uppercase; margin: 0;
  }
  .slide-counter {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 14px; color: ${BRONZE_ON_STONE};
    letter-spacing: 0.18em; text-transform: uppercase;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; color: ${NAVY};
    line-height: 1.04; letter-spacing: -0.018em;
    margin: 0; max-width: 900px;
  }
  .hook--cta { font-size: 92px; }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE_ON_STONE};
    font-size: 48px; line-height: 1.12;
    margin: 32px 0 0; max-width: 820px;
  }
  .cta-button {
    display: inline-block; margin: 48px 0 0;
    padding: 22px 48px; background: ${BRONZE_ON_STONE}; color: ${STONE};
    font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 20px;
    letter-spacing: 0.16em; text-transform: uppercase;
    border-radius: 8px;
  }
  .cta-url {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 28px;
    color: ${BRONZE_ON_STONE};
    letter-spacing: 0.02em; margin: 36px 0 0;
  }
  .footer {
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 24px; padding-top: 24px;
    border-top: 1px solid rgba(5, 26, 44, 0.18);
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-size: 42px; color: ${NAVY};
    line-height: 0.82; letter-spacing: -0.005em;
  }
  .wordmark__dot {
    display: inline-block; width: 0.2em; height: 0.2em;
    border-radius: 50%; background: ${BRONZE_ON_STONE};
    margin: 0 0.14em; vertical-align: 0.12em;
  }
  .wordmark__divider {
    height: 1px; background: ${BRONZE_ON_STONE}; opacity: 0.5;
    width: 70%; margin: 6px 0;
  }
  .wordmark__descriptor {
    font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 10px;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: ${BRONZE_ON_STONE};
  }
  .footer-attribution {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: rgba(5, 26, 44, 0.78);
    line-height: 1.5; margin-top: 6px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 14px;
    color: ${BRONZE_ON_STONE}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 11px; color: rgba(5, 26, 44, 0.55); margin-top: 2px;
  }
</style></head>
<body>
<div class="board">
  <div class="content">
    <div>
      <div class="top-row">
        <p class="eyebrow">${EYEBROW}</p>
        <span class="slide-counter">${String(slideIndex).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}</span>
      </div>
      ${mainBlock}
    </div>
    <div class="footer">
      <div>
        <div>
          <div class="wordmark__row">Re<span class="wordmark__dot"></span>solve</div>
          <div class="wordmark__divider"></div>
          <div class="wordmark__descriptor">Buyer Network</div>
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

const SINGLE_BOARDS = [
  {
    name: 'buyer-v4-mls-bidding-wars.png',
    bg: 'navy',
    eyebrow: EYEBROW,
    hook: 'Tired of MLS<br />bidding wars?',
    sub: 'Off-market deals from motivated GTA sellers.',
  },
  {
    name: 'buyer-v4-cash-buyer-criteria.png',
    bg: 'stone',
    eyebrow: EYEBROW,
    hook: 'Cash buyer with<br />clear criteria?',
    sub: 'Distressed-seller files briefed before MLS.',
  },
]

const CAROUSEL_SLIDES = [
  {
    type: 'hook',
    hook: 'Tired of MLS<br />bidding wars?',
    sub: 'There is another door.',
    outName: 'buyer-carousel-v4-01-hook.png',
  },
  {
    type: 'hook',
    hook: 'Off-market deals.<br />Motivated GTA sellers.',
    sub: 'Power of Sale. Arrears. Estate. Deadlines.',
    hookSize: 80,
    outName: 'buyer-carousel-v4-02-access.png',
  },
  {
    type: 'cta',
    hook: 'Brief us.<br />We send matches.',
    ctaButton: 'Join the list',
    ctaUrl: 'resolveproperty.ca/get-deals',
    outName: 'buyer-carousel-v4-03-cta.png',
  },
]

async function run() {
  await fs.mkdir(OUT_DIR_SINGLE, { recursive: true })
  await fs.mkdir(OUT_DIR_CAROUSEL, { recursive: true })

  console.log('[buyer-v4] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })

  // Render single-image ads
  for (const b of SINGLE_BOARDS) {
    await page.setContent(buildSingleHtml(b), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 700))
    const outPath = path.join(OUT_DIR_SINGLE, b.name)
    const board = await page.$('.board')
    await board.screenshot({ path: outPath, omitBackground: false })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ single  ${b.name} — ${(stat.size / 1024).toFixed(0)} KB`)
  }

  // Render carousel cards
  let i = 1
  for (const slide of CAROUSEL_SLIDES) {
    await page.setContent(buildCarouselHtml(slide, i, CAROUSEL_SLIDES.length), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 700))
    const outPath = path.join(OUT_DIR_CAROUSEL, slide.outName)
    const board = await page.$('.board')
    await board.screenshot({ path: outPath, omitBackground: false })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ carousel ${slide.outName} — ${(stat.size / 1024).toFixed(0)} KB`)
    i++
  }

  await browser.close()
  console.log('[buyer-v4] done')
}

run().catch((err) => { console.error(err); process.exit(1) })
