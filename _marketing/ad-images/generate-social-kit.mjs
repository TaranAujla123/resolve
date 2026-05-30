#!/usr/bin/env node
/**
 * Resolve — Social media kit
 *
 * One Puppeteer-driven generator that produces the full set of branded
 * social assets in every aspect ratio a campaign needs: feed ads,
 * stories, link cards, platform cover banners, profile avatar, logo
 * lockups, and the Open Graph share card.
 *
 * Everything shares one design system so a viewer who sees the profile,
 * a feed ad and a story reads them as one brand:
 *   - pale blue-gray ground (#E8EDF0), Resolve navy ink (#0A1F44),
 *     sage emerald accents (#1F8B5A), Poppins display type.
 *   - the wordmark uses the approved "RE = Real Estate" treatment:
 *     Re (emerald) + solve (navy/white) + . (emerald).
 *   - a single emerald dot per surface; wide negative space.
 *
 * The "general ad" surfaces carry the full message the brief asked for:
 *   core question -> one-line copy -> situation list -> contact details.
 * The cover banners stay lighter (lockup + question + url) because the
 * platform crops them hard.
 *
 * Compliance posture (matches the site):
 *   - No outcome guarantees, no urgency/scarcity, no "we buy", no "!".
 *   - Brokerage attribution present on every ad surface.
 *
 * Output: _marketing/public/social-kit/  (PNG @ 2x retina unless noted)
 * Favicons (pure-shape SVGs) are rasterized with sharp into _marketing/public/.
 *
 * Usage:  node _marketing/ad-images/generate-social-kit.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const PUBLIC_DIR = path.join(REPO_ROOT, '_marketing', 'public')
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'social-kit')
await fs.mkdir(OUTPUT_DIR, { recursive: true })

// ---------------------------------------------------------------------
// Brand tokens — single source of truth (matches the live site).
// ---------------------------------------------------------------------
const T = {
  bg:       '#E8EDF0',
  navy:     '#0A1F44',
  emerald:  '#1F8B5A',
  emDeep:   '#126142',
  emSoft:   '#D7EBE0',
  inkMute:  '#64748B',
  inkSoft:  '#334155',
  white:    '#FFFFFF',
}

// Shared message (compliant copy).
const MSG = {
  eyebrow: 'For Ontario Homeowners',
  headline: 'Facing a Difficult Property Situation?',
  copy: 'Quiet, professional representation when selling your home has become complicated.',
  situations: ['Mortgage Arrears', 'Power of Sale', 'Separation & Divorce', 'Estate & Probate', 'Property Disputes'],
  phone: '(365) 645-7332',
  url: 'resolveproperty.ca',
  attribution: 'HomeLife G1 Realty Inc., Brokerage',
}

// ---------------------------------------------------------------------
// Wordmark lockup. Renders the brand mark (navy square + emerald dot)
// beside the "Resolve." wordmark with the approved green-Re treatment.
//   tone: 'ink'  -> solve is navy   (light backgrounds)
//         'white'-> solve is white  (dark backgrounds)
//   markPx: pixel size of the square mark; the type scales off it.
// ---------------------------------------------------------------------
function lockup({ tone = 'ink', markPx = 92, gap = 28, tagline = true } = {}) {
  const solveColor = tone === 'white' ? T.white : T.navy
  const tagColor = tone === 'white' ? 'rgba(255,255,255,0.72)' : T.inkMute
  const wordSize = Math.round(markPx * 0.62)
  const tagSize = Math.round(markPx * 0.165)
  const dotR = Math.round(markPx * 0.18)
  const radius = Math.round(markPx * 0.19)
  return `
    <div style="display:flex;align-items:center;gap:${gap}px;">
      <svg width="${markPx}" height="${markPx}" viewBox="0 0 64 64" style="display:block;flex:none;">
        <rect width="64" height="64" rx="${(radius / markPx) * 64}" fill="${T.navy}"/>
        <circle cx="32" cy="32" r="11" fill="${T.emerald}"/>
      </svg>
      <div style="display:flex;flex-direction:column;justify-content:center;line-height:1;">
        <div style="font-family:'Poppins';font-weight:700;font-size:${wordSize}px;letter-spacing:-0.02em;color:${solveColor};">
          <span style="color:${T.emerald};">Re</span>solve<span style="color:${T.emerald};">.</span>
        </div>
        ${tagline ? `<div style="font-family:'Poppins';font-weight:600;font-size:${tagSize}px;letter-spacing:0.16em;text-transform:uppercase;color:${tagColor};margin-top:${Math.round(markPx * 0.14)}px;">Seller Representation</div>` : ''}
      </div>
    </div>`
}

function dot(px, color = T.emerald) {
  return `<span style="display:inline-block;width:${px}px;height:${px}px;border-radius:999px;background:${color};"></span>`
}

const HEAD = (w, h, transparent = false) => `<!doctype html><html lang="en"><head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{width:${w}px;height:${h}px;overflow:hidden;font-family:'Poppins',system-ui,sans-serif;-webkit-font-smoothing:antialiased;${transparent ? '' : `background:${T.bg};`}color:${T.navy};}
  .eyebrow{font-weight:700;letter-spacing:0.18em;text-transform:uppercase;}
  .headline{font-weight:800;line-height:1.04;letter-spacing:-0.02em;color:${T.navy};}
  .copy{font-weight:400;line-height:1.4;color:${T.inkSoft};}
  .sits{list-style:none;}
  .sits li{font-weight:600;color:${T.emerald};line-height:1.18;}
  .foot{color:${T.inkMute};font-weight:400;}
  .foot .u{font-weight:600;color:${T.navy};}
  .phone{display:inline-block;background:${T.navy};color:#fff;font-weight:600;border-radius:12px;}
</style></head><body>`
const TAIL = `</body></html>`

// ---------------------------------------------------------------------
// Layout builders. Each returns a full HTML document.
// ---------------------------------------------------------------------

// Full "general ad": lockup + question + one-line copy + situations + contact.
function adVertical(w, h, { stack = false } = {}) {
  // Vertical rhythm scales with height so the square (shortest frame)
  // compresses enough to keep the contact footer above the fold.
  const v = h / 1350
  const pad = Math.round(w * 0.08)
  const hl = stack ? Math.round(w * 0.092) : Math.round(w * 0.078)
  const sit = Math.round(w * 0.043)
  return `${HEAD(w, h)}
  <div style="width:${w}px;height:${h}px;padding:${pad}px;display:flex;flex-direction:column;justify-content:space-between;">
    <div>
      ${lockup({ markPx: Math.round(w * 0.08) })}
      <div class="eyebrow" style="font-size:${Math.round(w * 0.02)}px;color:${T.emDeep};margin-top:${Math.round(58 * v)}px;">${MSG.eyebrow}</div>
      <h1 class="headline" style="font-size:${hl}px;margin-top:${Math.round(30 * v)}px;max-width:${Math.round(w * 0.86)}px;">${MSG.headline}</h1>
      <p class="copy" style="font-size:${Math.round(w * 0.028)}px;margin-top:${Math.round(30 * v)}px;max-width:${Math.round(w * 0.82)}px;">${MSG.copy}</p>
      <ul class="sits" style="margin-top:${Math.round(48 * v)}px;display:flex;flex-direction:column;gap:${Math.round(9 * v)}px;">
        ${MSG.situations.map((s) => `<li style="font-size:${sit}px;">${s}</li>`).join('')}
      </ul>
      <div style="margin-top:${Math.round(30 * v)}px;">${dot(Math.round(w * 0.02))}</div>
    </div>
    <div class="foot" style="font-size:${Math.round(w * 0.0215)}px;">
      <div style="display:flex;align-items:center;gap:${Math.round(w * 0.025)}px;flex-wrap:wrap;">
        <span class="phone" style="font-size:${Math.round(w * 0.026)}px;padding:${Math.round(w * 0.016)}px ${Math.round(w * 0.03)}px;">${MSG.phone}</span>
        <span class="u">${MSG.url}</span>
      </div>
      <div style="margin-top:${Math.round(24 * v)}px;">${MSG.attribution}</div>
    </div>
  </div>${TAIL}`
}

// Landscape link card: headline + copy left, situations right, contact footer.
function adLandscape(w, h) {
  const pad = Math.round(w * 0.055)
  return `${HEAD(w, h)}
  <div style="width:${w}px;height:${h}px;padding:${pad}px;display:flex;flex-direction:column;justify-content:space-between;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:${Math.round(w * 0.04)}px;">
      <div style="flex:1;">
        ${lockup({ markPx: Math.round(w * 0.05) })}
        <h1 class="headline" style="font-size:${Math.round(w * 0.05)}px;margin-top:${Math.round(h * 0.06)}px;max-width:${Math.round(w * 0.52)}px;">${MSG.headline}</h1>
        <p class="copy" style="font-size:${Math.round(w * 0.0205)}px;margin-top:${Math.round(h * 0.04)}px;max-width:${Math.round(w * 0.5)}px;">${MSG.copy}</p>
      </div>
      <ul class="sits" style="text-align:right;display:flex;flex-direction:column;gap:${Math.round(h * 0.012)}px;margin-top:${Math.round(h * 0.02)}px;">
        ${MSG.situations.map((s) => `<li style="font-size:${Math.round(w * 0.026)}px;">${s}</li>`).join('')}
      </ul>
    </div>
    <div class="foot" style="font-size:${Math.round(w * 0.0145)}px;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:${Math.round(w * 0.018)}px;">${dot(Math.round(w * 0.012))}<span class="u" style="font-weight:600;color:${T.navy};">${MSG.phone}</span><span>${MSG.url}</span></div>
      <span>${MSG.attribution}</span>
    </div>
  </div>${TAIL}`
}

// Wide cover banner (FB/LinkedIn/Twitter). Content held in a centered
// safe band so platform cropping never clips the message.
function bannerWide(w, h, safeW, safeH) {
  const sx = (w - safeW) / 2
  const sy = (h - safeH) / 2
  return `${HEAD(w, h)}
  <div style="position:absolute;left:${sx}px;top:${sy}px;width:${safeW}px;height:${safeH}px;display:flex;flex-direction:column;justify-content:center;gap:${Math.round(safeH * 0.07)}px;">
    ${lockup({ markPx: Math.round(safeH * 0.18) })}
    <h1 class="headline" style="font-size:${Math.round(safeH * 0.155)}px;max-width:${Math.round(safeW * 0.74)}px;">${MSG.headline}</h1>
    <div class="foot" style="font-size:${Math.round(safeH * 0.05)}px;display:flex;align-items:center;gap:${Math.round(safeW * 0.02)}px;flex-wrap:wrap;">
      ${dot(Math.round(safeH * 0.045))}
      <span style="color:${T.emerald};font-weight:600;">${MSG.situations.slice(0, 4).join('   ·   ')}</span>
    </div>
    <div class="foot" style="font-size:${Math.round(safeH * 0.045)}px;">${MSG.attribution}<span style="margin:0 ${Math.round(safeW * 0.012)}px;">·</span><span class="u">${MSG.url}</span></div>
  </div>${TAIL}`
}

// YouTube channel art: 2560x1440 frame, all content in the 1546x423
// TV/desktop safe area, centered.
function bannerYouTube(w, h) {
  const safeW = 1546
  const safeH = 423
  const sx = (w - safeW) / 2
  const sy = (h - safeH) / 2
  return `${HEAD(w, h)}
  <div style="position:absolute;left:${sx}px;top:${sy}px;width:${safeW}px;height:${safeH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:26px;">
    ${lockup({ markPx: 70 })}
    <h1 class="headline" style="font-size:64px;max-width:1320px;">${MSG.headline}</h1>
    <div style="display:flex;align-items:center;gap:18px;">${dot(16)}<span style="color:${T.emerald};font-weight:600;font-size:26px;">${MSG.situations.slice(0, 4).join('   ·   ')}</span></div>
    <div class="foot" style="font-size:22px;">${MSG.attribution}<span style="margin:0 14px;">·</span><span class="u">${MSG.url}</span></div>
  </div>${TAIL}`
}

// Square profile avatar. Platforms crop avatars to a circle, so the
// dot + wordmark are kept inside the central circle-safe zone and the
// tagline is dropped (it would clip on a round crop).
function profile(w, h) {
  return `${HEAD(w, h)}
  <div style="width:${w}px;height:${h}px;background:${T.navy};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(h * 0.07)}px;">
    <svg width="${Math.round(w * 0.2)}" height="${Math.round(w * 0.2)}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="${T.emerald}"/></svg>
    <div style="font-family:'Poppins';font-weight:700;font-size:${Math.round(w * 0.155)}px;letter-spacing:-0.02em;color:#fff;line-height:1;">
      <span style="color:${T.emerald};">Re</span>solve<span style="color:${T.emerald};">.</span>
    </div>
  </div>${TAIL}`
}

// Logo lockup on transparent ground (light or dark variant just changes tone).
function logoLockup(w, h, tone, stacked = false) {
  if (stacked) {
    const solveColor = tone === 'white' ? '#fff' : T.navy
    return `${HEAD(w, h, true)}
    <div style="width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(h * 0.07)}px;">
      <svg width="${Math.round(h * 0.42)}" height="${Math.round(h * 0.42)}" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${T.navy}"/><circle cx="32" cy="32" r="11" fill="${T.emerald}"/></svg>
      <div style="font-family:'Poppins';font-weight:700;font-size:${Math.round(h * 0.26)}px;letter-spacing:-0.02em;color:${solveColor};line-height:1;">
        <span style="color:${T.emerald};">Re</span>solve<span style="color:${T.emerald};">.</span>
      </div>
      <div style="font-family:'Poppins';font-weight:600;font-size:${Math.round(h * 0.058)}px;letter-spacing:0.16em;text-transform:uppercase;color:${tone === 'white' ? 'rgba(255,255,255,0.72)' : T.inkMute};">Seller Representation</div>
    </div>${TAIL}`
  }
  return `${HEAD(w, h, true)}
  <div style="width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;">
    ${lockup({ tone, markPx: Math.round(h * 0.5) })}
  </div>${TAIL}`
}

// Open Graph share card.
function ogCard(w, h) {
  return `${HEAD(w, h)}
  <div style="width:${w}px;height:${h}px;padding:80px;display:flex;flex-direction:column;justify-content:space-between;">
    ${lockup({ markPx: 90 })}
    <div>
      <div class="eyebrow" style="font-size:20px;color:${T.emDeep};">${MSG.eyebrow}</div>
      <h1 class="headline" style="font-size:74px;margin-top:18px;max-width:900px;">${MSG.headline}</h1>
      <p class="copy" style="font-size:26px;margin-top:24px;max-width:820px;">${MSG.copy}</p>
    </div>
    <div class="foot" style="font-size:20px;">${MSG.attribution}<span style="margin:0 12px;">·</span><span class="u">${MSG.url}</span></div>
  </div>${TAIL}`
}

// ---------------------------------------------------------------------
// Variant table.
// ---------------------------------------------------------------------
const VARIANTS = [
  // Feed / story ads (full message)
  { name: 'ad-square-1080',        w: 1080, h: 1080, transparent: false, html: () => adVertical(1080, 1080) },
  { name: 'ad-portrait-1080x1350', w: 1080, h: 1350, transparent: false, html: () => adVertical(1080, 1350, { stack: true }) },
  { name: 'ad-story-1080x1920',    w: 1080, h: 1920, transparent: false, html: () => adVertical(1080, 1920, { stack: true }) },
  { name: 'ad-landscape-1200x628', w: 1200, h: 628,  transparent: false, html: () => adLandscape(1200, 628) },

  // Platform cover banners (lighter copy, safe-area aware)
  { name: 'banner-facebook-cover-1640x624', w: 1640, h: 624,  transparent: false, html: () => bannerWide(1640, 624, 1100, 480) },
  { name: 'banner-linkedin-1584x396',       w: 1584, h: 396,  transparent: false, html: () => bannerWide(1584, 396, 1400, 340) },
  { name: 'banner-twitter-1500x500',        w: 1500, h: 500,  transparent: false, html: () => bannerWide(1500, 500, 1300, 420) },
  { name: 'banner-youtube-2560x1440',       w: 2560, h: 1440, transparent: false, html: () => bannerYouTube(2560, 1440) },

  // Profile avatar
  { name: 'profile-1080', w: 1080, h: 1080, transparent: false, html: () => profile(1080, 1080) },

  // Logo lockups (transparent)
  { name: 'logo-horizontal-light', w: 1400, h: 420, transparent: true, html: () => logoLockup(1400, 420, 'ink') },
  { name: 'logo-horizontal-dark',  w: 1400, h: 420, transparent: true, html: () => logoLockup(1400, 420, 'white') },
  { name: 'logo-stacked-light',    w: 1000, h: 1000, transparent: true, html: () => logoLockup(1000, 1000, 'ink', true) },
  { name: 'logo-stacked-dark',     w: 1000, h: 1000, transparent: true, html: () => logoLockup(1000, 1000, 'white', true) },

  // Open Graph (also written to _marketing/public/og-image.png at 1x)
  { name: 'og-image-1200x630', w: 1200, h: 630, transparent: false, dsf: 1, html: () => ogCard(1200, 630), alsoPublicOg: true },
]

// ---------------------------------------------------------------------
// Render loop.
// ---------------------------------------------------------------------
console.log(`Launching headless chromium (${VARIANTS.length} variants)...`)
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const generated = []
try {
  for (const v of VARIANTS) {
    const page = await browser.newPage()
    await page.setViewport({ width: v.w, height: v.h, deviceScaleFactor: v.dsf ?? 2 })
    await page.setContent(v.html(), { waitUntil: 'networkidle0' })
    await page.evaluate(async () => { await document.fonts.ready })
    await new Promise((r) => setTimeout(r, 180))

    const outPath = path.join(OUTPUT_DIR, `${v.name}.png`)
    await page.screenshot({ path: outPath, type: 'png', omitBackground: !!v.transparent })
    const stat = await fs.stat(outPath)
    generated.push({ name: v.name, size: stat.size, w: v.w, h: v.h })
    console.log(`  ✓ ${v.name.padEnd(32)} ${v.w}x${v.h}  ${(stat.size / 1024).toFixed(0)} KB`)

    if (v.alsoPublicOg) {
      await page.screenshot({ path: path.join(PUBLIC_DIR, 'og-image.png'), type: 'png' })
      console.log(`    -> also written to _marketing/public/og-image.png`)
    }
    await page.close()
  }
} finally {
  await browser.close()
}

// ---------------------------------------------------------------------
// Favicons: rasterize the pure-shape SVGs already in public/ via sharp.
// (No webfont needed — the favicon/apple icons are mark-only.)
// ---------------------------------------------------------------------
const faviconTasks = [
  { svg: 'favicon.svg', out: 'favicon-32.png', size: 32 },
  { svg: 'favicon.svg', out: 'favicon-16.png', size: 16 },
  { svg: 'apple-touch-icon.svg', out: 'apple-touch-icon.png', size: 180 },
]
for (const t of faviconTasks) {
  const svg = await fs.readFile(path.join(PUBLIC_DIR, t.svg))
  await sharp(svg, { density: 384 }).resize(t.size, t.size).png().toFile(path.join(PUBLIC_DIR, t.out))
  console.log(`  ✓ favicon ${t.out} (${t.size}px)`)
}

console.log('\n=== DONE ===')
console.log(`  ${generated.length} social variants + favicons + og-image`)
console.log(`  Social kit: ${path.relative(REPO_ROOT, OUTPUT_DIR)}`)
