#!/usr/bin/env node
/**
 * Render 2 stone-background carousels (5 slides each = 10 PNGs):
 *   intro    · General Resolve introduction → goes into AS-1
 *   arrears  · Mortgage Arrears             → goes into AS-2
 *
 * Mirrors the navy carousel structure (HOOK → CONTEXT → LIST/STRUCTURE →
 * PROMISE/THESIS → CTA) but on the stone surface — for A/B testing
 * against the navy carousels in the feed.
 *
 * HOUSING-compliant copy throughout — no personal-attribute assertions
 * on the viewer's mortgage state. Soft enough for Meta's automated
 * review under HOUSING Special Ad Category.
 *
 * Output:
 *   public/ads/carousels/stone-<carousel>-<NN>-<slug>.png
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

function buildHtml(slide) {
  let mainBlock = ''

  if (slide.type === 'hook' || slide.type === 'reframe' || slide.type === 'promise') {
    mainBlock = `
      <h2 class="hook">${slide.hook}</h2>
      <p class="sub">${slide.sub}</p>
    `
  } else if (slide.type === 'list') {
    mainBlock = `
      <h2 class="hook hook--smaller">${slide.hook}</h2>
      <p class="sub">${slide.sub}</p>
      <ol class="h-list">
        ${(slide.items || []).map((t, i) => `<li><span class="h-num">${String(i + 1).padStart(2, '0')}</span><p class="h-text">${t}</p></li>`).join('')}
      </ol>
    `
  } else if (slide.type === 'thesis') {
    mainBlock = `
      <h2 class="hook hook--triad">${slide.hook}</h2>
      <p class="sub">${slide.sub}</p>
    `
  } else if (slide.type === 'cta') {
    mainBlock = `
      <h2 class="hook hook--cta">${slide.hook}</h2>
      <div class="cta-button">${slide.ctaButton}</div>
      <p class="cta-url">${slide.ctaUrl}</p>
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
    font-size: 92px; line-height: 1.04;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 880px;
  }
  .hook--smaller { font-size: 72px; }
  .hook--triad { font-size: 100px; }
  .hook--cta { font-size: 86px; }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 52px; line-height: 1.08;
    margin: 32px 0 0;
    max-width: 820px;
  }
  ol.h-list {
    list-style: none;
    margin: 56px 0 0;
    padding: 0;
    max-width: 860px;
  }
  ol.h-list li {
    display: flex;
    gap: 28px;
    align-items: baseline;
    padding: 16px 0;
    border-top: 1px solid rgba(5, 26, 44, 0.18);
  }
  ol.h-list li:first-child { border-top: none; padding-top: 2px; }
  .h-num {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 400;
    font-size: 36px;
    color: ${BRONZE};
    line-height: 1;
    min-width: 50px; flex-shrink: 0;
  }
  .h-text {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 30px;
    color: ${NAVY};
    line-height: 1.32;
    margin: 0;
    max-width: 740px;
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
        <p class="eyebrow">${slide.eyebrow}</p>
        <span class="slide-counter">${String(slide.slideIndex).padStart(2, '0')} / ${String(slide.totalSlides).padStart(2, '0')}</span>
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

const CAROUSEL_INTRO = {
  prefix: 'stone-intro',
  eyebrow: 'Resolve · Seller Representation · Ontario',
  slides: [
    { type: 'hook',
      hook: 'Some sales<br />need more.',
      sub: 'We\'re the practice for the hard files.',
      slug: 'hook' },
    { type: 'reframe',
      hook: 'Six situations.',
      sub: 'Most listings can\'t carry them. We carry all six.',
      slug: 'context' },
    { type: 'list',
      hook: 'The six lanes.',
      sub: 'A different way through each one.',
      items: [
        'Mortgage arrears.',
        'Power of sale.',
        'Separation &amp; divorce.',
        'Estate &amp; probate.',
        'Ownership disputes.',
        'Time-sensitive sales.',
      ],
      slug: 'six-situations' },
    { type: 'thesis',
      hook: 'Document-first.<br />Position-driven.<br />Equity-led.',
      sub: 'How we read every file.',
      slug: 'thesis' },
    { type: 'cta',
      hook: 'Learn how<br />we help.',
      ctaButton: 'Learn More',
      ctaUrl: 'resolveproperty.ca',
      slug: 'cta' },
  ],
}

const CAROUSEL_ARREARS = {
  prefix: 'stone-arrears',
  eyebrow: 'Mortgage Arrears · Ontario',
  slides: [
    { type: 'hook',
      hook: 'Mortgage situations<br />have a window.',
      sub: 'Options live inside it.',
      slug: 'hook' },
    { type: 'reframe',
      hook: 'The bank wants<br />the loan repaid.',
      sub: 'Not your house.',
      slug: 'reframe' },
    { type: 'reframe',
      hook: 'Every week narrows<br />the options.',
      sub: 'Reading the file early is what holds them open.',
      slug: 'window' },
    { type: 'promise',
      hook: 'Quiet. Structured.<br />Equity-protective.',
      sub: 'A timeline that holds the equity.',
      slug: 'promise' },
    { type: 'cta',
      hook: 'Read about<br />mortgage arrears.',
      ctaButton: 'Learn More',
      ctaUrl: 'resolveproperty.ca/mortgage-arrears',
      slug: 'cta' },
  ],
}

const CAROUSELS = [CAROUSEL_INTRO, CAROUSEL_ARREARS]

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  console.log('[stone-carousels] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 })

  let total = 0
  for (const carousel of CAROUSELS) {
    console.log(`\n  ─ ${carousel.prefix} (${carousel.slides.length} slides)`)
    for (let i = 0; i < carousel.slides.length; i++) {
      const slide = {
        ...carousel.slides[i],
        eyebrow: carousel.eyebrow,
        slideIndex: i + 1,
        totalSlides: carousel.slides.length,
      }
      await page.setContent(buildHtml(slide), { waitUntil: 'load' })
      await page.evaluate(() => document.fonts.ready)
      await new Promise((r) => setTimeout(r, 600))

      const name = `${carousel.prefix}-${String(i + 1).padStart(2, '0')}-${slide.slug}.png`
      const outPath = path.join(OUT_DIR, name)
      const board = await page.$('.board')
      await board.screenshot({ path: outPath, omitBackground: false })
      const stat = await fs.stat(outPath)
      console.log(`    ✓ ${name} — ${(stat.size / 1024).toFixed(0)} KB`)
      total += 1
    }
  }
  await browser.close()
  console.log(`\n[stone-carousels] done — ${total} slides rendered`)
}

run().catch((err) => { console.error(err); process.exit(1) })
