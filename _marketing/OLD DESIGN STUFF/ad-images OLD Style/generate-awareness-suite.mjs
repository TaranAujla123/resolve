#!/usr/bin/env node
/**
 * Resolve — Cold-traffic awareness ad suite
 *
 * One Puppeteer-driven generator that produces a coherent set of
 * typography-led ads (no portrait) for cold-traffic awareness campaigns
 * across IG/FB/LinkedIn. All variants share the same brand surface
 * (pale blue-gray ground, Resolve navy ink, sage emerald accents,
 * Poppins from Google Fonts) so a viewer who sees more than one
 * piece across a campaign reads them as a series.
 *
 * Output set (all PNG @ 2x retina):
 *
 *   AWARENESS SINGLES — for one-shot ads:
 *     awareness-square-1080.png      1080x1080  IG/FB feed, LinkedIn
 *     awareness-vertical-1920.png    1080x1920  IG/FB Stories, Reels, TikTok
 *     awareness-landscape-1200.png   1200x628   FB/LinkedIn link cards, X
 *
 *   CAROUSEL — four cards meant to be posted as a single IG/FB
 *   carousel ad. Each card is 1:1 so the carousel reads cleanly.
 *     carousel-1-open.png            1080x1080  Hook card with situation list
 *     carousel-2-power-of-sale.png   1080x1080  Power of sale beat
 *     carousel-3-mortgage-arrears.png 1080x1080 Mortgage arrears beat
 *     carousel-4-cta.png             1080x1080  Closing CTA card
 *
 * Compliance posture (matches the rest of the site):
 *   - No outcome guarantees, no "save your home", no "specialist".
 *   - Brokerage attribution present on every card.
 *   - URL + phone only on the explicit CTA card so other cards stay
 *     restrained.
 *
 * Usage:
 *   node _marketing/ad-images/generate-awareness-suite.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUTPUT_DIR = path.join(__dirname, 'output')
await fs.mkdir(OUTPUT_DIR, { recursive: true })

// ---------------------------------------------------------------------
// Brand tokens — single source of truth, used by every variant.
// ---------------------------------------------------------------------
const TOKENS = {
  bg:         '#E8EDF0',
  navy:       '#0A1F44',
  emerald:    '#1F8B5A',
  emeraldSoft:'#D7EBE0',
  inkMute:    '#64748B',
  inkSoft:    '#334155',
}

// ---------------------------------------------------------------------
// Shared style block. Every variant includes this so the visual rhythm
// (eyebrow weight, headline weight, footer style) is identical across
// the suite.
// ---------------------------------------------------------------------
const SHARED_CSS = `
  :root {
    --bg:           ${TOKENS.bg};
    --navy:         ${TOKENS.navy};
    --emerald:      ${TOKENS.emerald};
    --emerald-soft: ${TOKENS.emeraldSoft};
    --ink-mute:     ${TOKENS.inkMute};
    --ink-soft:     ${TOKENS.inkSoft};
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background: var(--bg);
    font-family: 'Poppins', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--navy);
  }
  .eyebrow {
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--navy);
  }
  .headline {
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.015em;
    color: var(--navy);
  }
  .lede {
    font-weight: 400;
    line-height: 1.35;
    color: var(--ink-soft);
  }
  .situation-list {
    list-style: none;
    color: var(--emerald);
  }
  .situation-list li {
    font-weight: 600;
    line-height: 1.15;
  }
  .dot {
    border-radius: 999px;
    background: var(--emerald);
  }
  .footer {
    font-size: 22px;
    color: var(--ink-mute);
    font-weight: 400;
  }
  .footer .url { font-weight: 500; }
  .cta-block {
    display: inline-block;
    background: var(--navy);
    color: white;
    font-weight: 600;
    padding: 22px 36px;
    border-radius: 12px;
    font-size: 30px;
    letter-spacing: 0.01em;
  }
  .cta-block .phone {
    color: white;
    font-weight: 600;
  }
`

// ---------------------------------------------------------------------
// Variant configs. Each describes one image to render. Layout-level
// differences (square vs vertical vs landscape) are handled by the
// `layout` field, which switches the HTML template inside `buildHtml`.
// Per-variant text changes are isolated to the config so iterating on
// a single card never requires touching shared CSS.
// ---------------------------------------------------------------------
const VARIANTS = [
  // ---- Awareness singles ----
  {
    name: 'awareness-square-1080',
    width: 1080,
    height: 1080,
    layout: 'situations-square',
    content: {
      eyebrow: 'Resolve · Seller Representation',
      headline: 'Facing a Difficult Property Situation?',
      situations: ['Mortgage Arrears', 'Power of Sale', 'Separation', 'Estate Sales'],
      footerEyebrow: 'An Introduction',
      attribution: 'HomeLife G1 Realty Inc., Brokerage',
      url: 'resolveproperty.ca',
    },
  },
  {
    name: 'awareness-vertical-1920',
    width: 1080,
    height: 1920,
    layout: 'situations-vertical',
    content: {
      eyebrow: 'Resolve · Seller Representation',
      headline: 'Facing a Difficult Property Situation?',
      situations: ['Mortgage Arrears', 'Power of Sale', 'Separation', 'Estate Sales'],
      footerEyebrow: 'An Introduction',
      attribution: 'HomeLife G1 Realty Inc., Brokerage',
      url: 'resolveproperty.ca',
    },
  },
  {
    name: 'awareness-landscape-1200',
    width: 1200,
    height: 628,
    layout: 'situations-landscape',
    content: {
      eyebrow: 'Resolve · Seller Representation',
      headline: 'Facing a Difficult Property Situation?',
      situations: ['Mortgage Arrears', 'Power of Sale', 'Separation', 'Estate Sales'],
      attribution: 'HomeLife G1 Realty Inc., Brokerage  ·  resolveproperty.ca',
    },
  },

  // ---- Carousel cards (4) ----
  {
    name: 'carousel-1-open',
    width: 1080,
    height: 1080,
    layout: 'situations-square',
    content: {
      eyebrow: 'Resolve · Seller Representation',
      headline: 'Facing a Difficult Property Situation?',
      situations: ['Mortgage Arrears', 'Power of Sale', 'Separation', 'Estate Sales'],
      footerEyebrow: 'An Introduction',
      attribution: 'HomeLife G1 Realty Inc., Brokerage',
      url: 'resolveproperty.ca',
    },
  },
  {
    name: 'carousel-2-power-of-sale',
    width: 1080,
    height: 1080,
    layout: 'situation-focus',
    content: {
      eyebrow: 'Power of Sale  ·  Ontario',
      headline: 'Notice of Sale in your hand?',
      lede: 'You still have time. And more options than the bank has shown you.',
      bottomLabel: 'Earlier is easier.',
      attribution: 'Resolve · HomeLife G1 Realty Inc., Brokerage',
      url: 'resolveproperty.ca',
    },
  },
  {
    name: 'carousel-3-mortgage-arrears',
    width: 1080,
    height: 1080,
    layout: 'situation-focus',
    content: {
      eyebrow: 'Mortgage Arrears  ·  Ontario',
      headline: 'Behind on your mortgage?',
      lede: 'There are more paths forward than the bank has shown you. The longer the file waits, the narrower they become.',
      bottomLabel: 'Move while the options are wide.',
      attribution: 'Resolve · HomeLife G1 Realty Inc., Brokerage',
      url: 'resolveproperty.ca',
    },
  },
  {
    name: 'carousel-4-cta',
    width: 1080,
    height: 1080,
    layout: 'cta-close',
    content: {
      eyebrow: 'A Quiet First Conversation',
      headline: 'Costs nothing. Commits to nothing.',
      lede: 'Private. Free. No pressure to list. The point is for you to see what is realistic and what options you actually have.',
      phone: '(365) 645-7332',
      url: 'resolveproperty.ca',
      attribution: 'Resolve · HomeLife G1 Realty Inc., Brokerage',
    },
  },
]

// ---------------------------------------------------------------------
// HTML template selector. Each layout is a self-contained function that
// returns the full <html>...</html> string. Keeping them as functions
// (not template strings of strings) lets each layout reason about its
// own typography scale relative to its frame size.
// ---------------------------------------------------------------------
function buildHtml(variant) {
  const { layout, content, width, height } = variant

  const head = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
    ${SHARED_CSS}
  </style>
</head>
<body>`

  const tail = `</body></html>`

  if (layout === 'situations-square') {
    return `${head}
      <div style="width:${width}px;height:${height}px;padding:90px 80px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <p class="eyebrow" style="font-size:20px;">${content.eyebrow}</p>
          <h1 class="headline" style="font-size:80px;margin-top:30px;max-width:880px;">
            ${content.headline}
          </h1>
          <ul class="situation-list" style="margin-top:40px;display:flex;flex-direction:column;gap:6px;">
            ${content.situations.map((s) => `<li style="font-size:46px;">${s}</li>`).join('')}
          </ul>
          <div class="dot" style="width:22px;height:22px;margin-top:24px;"></div>
        </div>
        <div class="footer">
          <p class="eyebrow" style="font-size:20px;">${content.footerEyebrow}</p>
          <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:baseline;">
            <span>${content.attribution}</span>
            <span class="url">${content.url}</span>
          </div>
        </div>
      </div>
    ${tail}`
  }

  if (layout === 'situations-vertical') {
    return `${head}
      <div style="width:${width}px;height:${height}px;padding:120px 90px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <p class="eyebrow" style="font-size:24px;">${content.eyebrow}</p>
          <h1 class="headline" style="font-size:104px;margin-top:40px;max-width:900px;">
            ${content.headline}
          </h1>
          <ul class="situation-list" style="margin-top:80px;display:flex;flex-direction:column;gap:12px;">
            ${content.situations.map((s) => `<li style="font-size:62px;">${s}</li>`).join('')}
          </ul>
          <div class="dot" style="width:30px;height:30px;margin-top:38px;"></div>
        </div>
        <div class="footer" style="font-size:26px;">
          <p class="eyebrow" style="font-size:24px;">${content.footerEyebrow}</p>
          <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:baseline;">
            <span>${content.attribution}</span>
            <span class="url">${content.url}</span>
          </div>
        </div>
      </div>
    ${tail}`
  }

  if (layout === 'situations-landscape') {
    return `${head}
      <div style="width:${width}px;height:${height}px;padding:62px 70px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <p class="eyebrow" style="font-size:14px;">${content.eyebrow}</p>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-top:24px;gap:60px;">
            <h1 class="headline" style="font-size:60px;max-width:580px;">
              ${content.headline}
            </h1>
            <ul class="situation-list" style="display:flex;flex-direction:column;gap:4px;text-align:right;">
              ${content.situations.map((s) => `<li style="font-size:34px;">${s}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="footer" style="font-size:16px;display:flex;align-items:center;justify-content:space-between;">
          <div class="dot" style="width:14px;height:14px;"></div>
          <span>${content.attribution}</span>
        </div>
      </div>
    ${tail}`
  }

  if (layout === 'situation-focus') {
    return `${head}
      <div style="width:${width}px;height:${height}px;padding:100px 80px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <p class="eyebrow" style="font-size:20px;color:${TOKENS.emerald};">${content.eyebrow}</p>
          <h1 class="headline" style="font-size:88px;margin-top:34px;max-width:880px;">
            ${content.headline}
          </h1>
          <p class="lede" style="font-size:30px;margin-top:36px;max-width:840px;">
            ${content.lede}
          </p>
          ${content.bottomLabel ? `
            <div style="display:flex;align-items:center;gap:18px;margin-top:54px;">
              <span class="dot" style="display:inline-block;width:18px;height:18px;"></span>
              <span style="font-size:24px;font-weight:600;color:${TOKENS.emerald};letter-spacing:0.02em;">
                ${content.bottomLabel}
              </span>
            </div>
          ` : ''}
        </div>
        <div class="footer" style="display:flex;justify-content:space-between;align-items:baseline;">
          <span>${content.attribution}</span>
          <span class="url">${content.url}</span>
        </div>
      </div>
    ${tail}`
  }

  if (layout === 'cta-close') {
    return `${head}
      <div style="width:${width}px;height:${height}px;padding:100px 80px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <p class="eyebrow" style="font-size:20px;color:${TOKENS.emerald};">${content.eyebrow}</p>
          <h1 class="headline" style="font-size:80px;margin-top:34px;max-width:880px;">
            ${content.headline}
          </h1>
          <p class="lede" style="font-size:28px;margin-top:32px;max-width:820px;">
            ${content.lede}
          </p>
          <div style="margin-top:60px;display:flex;align-items:center;gap:30px;flex-wrap:wrap;">
            <span class="cta-block">${content.phone}</span>
            <span style="font-size:28px;font-weight:500;color:${TOKENS.inkSoft};">
              ${content.url}
            </span>
          </div>
        </div>
        <div class="footer">
          <span>${content.attribution}</span>
        </div>
      </div>
    ${tail}`
  }

  throw new Error(`Unknown layout: ${layout}`)
}

// ---------------------------------------------------------------------
// Render loop. One browser instance, sequential page navigations for
// each variant. Each render takes well under a second; the total
// run is dominated by the headless Chrome startup.
// ---------------------------------------------------------------------
console.log(`Launching headless chromium (${VARIANTS.length} variants)...`)
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const stampShared = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const generated = []

try {
  for (const variant of VARIANTS) {
    const page = await browser.newPage()
    await page.setViewport({
      width: variant.width,
      height: variant.height,
      deviceScaleFactor: 2,
    })
    const html = buildHtml(variant)
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    await new Promise((r) => setTimeout(r, 150))

    const outPath = path.join(OUTPUT_DIR, `${variant.name}-${stampShared}.png`)
    await page.screenshot({ path: outPath, type: 'png', omitBackground: false })
    const stat = await fs.stat(outPath)
    generated.push({ name: variant.name, outPath, size: stat.size, width: variant.width, height: variant.height })
    console.log(`  ✓ ${variant.name.padEnd(34)}  ${variant.width}x${variant.height}  ${(stat.size / 1024).toFixed(0)} KB`)
    await page.close()
  }
} finally {
  await browser.close()
}

console.log('')
console.log('=== DONE ===')
console.log(`  ${generated.length} variants rendered`)
console.log(`  Output dir: ${path.relative(REPO_ROOT, OUTPUT_DIR)}`)
