#!/usr/bin/env node
/**
 * Render 5 v3 cards for the stone-background General/Cross-cutting carousel.
 *
 * Replaces the existing two General carousels (one stone + one navy)
 * with a single, sharper stone carousel. The navy "Carousal General"
 * gets paused (separate Meta UI action by Taran).
 *
 * Voice: same direct/plain register as the v3 Arrears overhaul.
 * Plain language. Names the situations. No jargon ("lanes", "files",
 * "position-driven", "document-first"). Each card has one job.
 *
 * Output (1080×1080 PNG):
 *   public/ads/carousels/stone-general-v3-01-hook.png
 *   public/ads/carousels/stone-general-v3-02-situations.png
 *   public/ads/carousels/stone-general-v3-03-process.png
 *   public/ads/carousels/stone-general-v3-04-coordination.png
 *   public/ads/carousels/stone-general-v3-05-cta.png
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = path.join(REPO_ROOT, 'public', 'ads', 'carousels')

const NAVY      = '#051A2C'
const NAVY_MUTE = 'rgba(5, 26, 44, 0.55)'
const NAVY_SOFT = 'rgba(5, 26, 44, 0.78)'
const BRONZE    = '#AC8E5C'
const STONE     = '#F5F1E8'

const TOTAL = 5
const EYEBROW = 'GTA · Seller Representation'

const SLIDES = [
  {
    type: 'hook',
    hook: 'Not a regular<br />home sale?',
    sub: 'We handle the ones that aren’t.',
    outName: 'stone-general-v3-01-hook.png',
  },
  {
    type: 'hook',
    hook: 'Arrears. Power of Sale.<br />Estate. Deadlines.',
    sub: 'Four situations. We list them all.',
    hookSize: 76,
    outName: 'stone-general-v4-02-situations.png',
  },
  {
    type: 'hook',
    hook: 'Quiet listing.<br />Discreet marketing.<br />Clean close.',
    sub: 'Privacy is the strategy.',
    hookSize: 80,
    outName: 'stone-general-v3-03-process.png',
  },
  {
    type: 'hook',
    hook: 'We work with<br />your advisors.',
    sub: 'Lawyers, accountants, trustees, financial advisors.',
    hookSize: 88,
    outName: 'stone-general-v4-04-coordination.png',
  },
  {
    type: 'cta',
    hook: 'See how<br />we can help.',
    ctaButton: 'Learn more',
    ctaUrl: 'resolveproperty.ca',
    outName: 'stone-general-v3-05-cta.png',
  },
]

function buildHtml(slide, slideIndex) {
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
    width: 1080px; height: 1080px;
    background: ${STONE};
    color: ${NAVY};
    overflow: hidden;
    position: relative;
  }
  .content {
    height: 100%;
    padding: 96px 96px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 56px;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 20px;
    color: ${BRONZE};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0;
  }
  .slide-counter {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 14px;
    color: ${BRONZE};
    letter-spacing: 0.18em; text-transform: uppercase;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${NAVY};
    line-height: 1.04;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 900px;
  }
  .hook--cta { font-size: 92px; }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 48px; line-height: 1.12;
    margin: 32px 0 0;
    max-width: 820px;
  }
  .cta-button {
    display: inline-block;
    margin: 48px 0 0;
    padding: 22px 48px;
    background: ${BRONZE};
    color: ${STONE};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border-radius: 8px;
  }
  .cta-url {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 28px;
    color: ${BRONZE};
    letter-spacing: 0.02em;
    margin: 36px 0 0;
  }
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(5, 26, 44, 0.18);
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 42px;
    color: ${NAVY};
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
    font-weight: 700; font-size: 10px;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: ${BRONZE};
  }
  .footer-attribution {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: ${NAVY_SOFT};
    line-height: 1.5;
    margin-top: 6px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 14px; color: ${BRONZE}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 11px; color: ${NAVY_MUTE}; margin-top: 2px;
  }
</style></head>
<body>
<div class="board">
  <div class="content">
    <div>
      <div class="top-row">
        <p class="eyebrow">${EYEBROW}</p>
        <span class="slide-counter">${String(slideIndex).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span>
      </div>
      ${mainBlock}
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
  console.log('[stone-general-v3] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })

  let i = 1
  for (const slide of SLIDES) {
    await page.setContent(buildHtml(slide, i), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 700))
    const outPath = path.join(OUT_DIR, slide.outName)
    const board = await page.$('.board')
    await board.screenshot({ path: outPath, omitBackground: false })
    const stat = await fs.stat(outPath)
    console.log(`  ✓ ${slide.outName} — ${(stat.size / 1024).toFixed(0)} KB`)
    i++
  }
  await browser.close()
  console.log('[stone-general-v3] done')
}

run().catch((err) => { console.error(err); process.exit(1) })
