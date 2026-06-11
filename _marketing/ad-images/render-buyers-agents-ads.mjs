#!/usr/bin/env node
/**
 * Render the two new Phase 1 ad creatives — Buyers (B1) and Agents (A2).
 *
 * Both follow the same H-series register used by the seller creatives
 * (point-first hook + bronze italic sub + 3-item numbered list +
 * brokerage attribution footer) so the brand voice and visual rhythm
 * read as a single Phase 1 campaign across all three lanes.
 *
 * Output (2160x2160 PNG, transparent-chrome flat production assets):
 *   public/ads/b1-buyers-property-opportunities.png
 *   public/ads/a2-agents-relationship-file-work.png
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = path.join(REPO_ROOT, 'public', 'ads')

// V2 brand tokens — must mirror src/index.css :root.
const NAVY      = '#051A2C'
const BRONZE    = '#C8A56B'
const STONE     = '#F5F1E8'
const STONE_SOFT= 'rgba(245, 241, 232, 0.86)'
const STONE_MUTE= 'rgba(245, 241, 232, 0.62)'
const DIVIDER   = 'rgba(216, 210, 200, 0.40)'

/**
 * Build one 1080×1080 H-series concept board with the same CSS used by
 * concept-directions.html so the brand register matches the seller
 * deck pixel-for-pixel. board: { eyebrow, hook, hookBr, subItalic,
 * items, laneSignal, audienceTitle }.
 */
function buildHtml(board) {
  return `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,500&display=swap" rel="stylesheet" />
<style>
  :root {
    --navy:        ${NAVY};
    --bronze:      ${BRONZE};
    --stone:       ${STONE};
    --stone-soft:  ${STONE_SOFT};
    --stone-mute:  ${STONE_MUTE};
    --divider:     ${DIVIDER};
  }
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
    padding: 100px 100px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-stack {
    display: flex; flex-direction: column; gap: 36px;
    margin-bottom: 72px;
  }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 22px;
    color: ${BRONZE};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${STONE};
    font-size: 96px; line-height: 1.00;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 860px;
    text-shadow: 0 2px 24px rgba(5,26,44,0.55);
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 54px; line-height: 1.08;
    margin: 36px 0 0;
    max-width: 820px;
  }
  ol.h-list {
    list-style: none;
    margin: 60px 0 0;
    padding: 0;
    max-width: 860px;
  }
  ol.h-list li {
    display: flex;
    gap: 32px;
    align-items: baseline;
    padding: 16px 0;
    border-top: 1px solid ${DIVIDER};
  }
  ol.h-list li:first-child { border-top: none; padding-top: 2px; }
  .h-num {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 400;
    font-size: 42px;
    color: ${BRONZE};
    line-height: 1;
    min-width: 36px; flex-shrink: 0;
  }
  .h-text {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 22px;
    color: ${STONE};
    line-height: 1.48;
    margin: 0;
    max-width: 740px;
  }

  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid ${DIVIDER};
    margin-top: 16px;
  }
  /* Wordmark - shrunk to fit alongside content + brokerage attribution */
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
        <p class="eyebrow">${board.eyebrow}</p>
      </div>
      <div>
        <h2 class="hook">${board.hook}</h2>
        <p class="sub">${board.subItalic}</p>
        <ol class="h-list">
          ${board.items.map((t, i) => `<li><span class="h-num">${i + 1}.</span><p class="h-text">${t}</p></li>`).join('')}
        </ol>
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
        <div class="footer-lane-signal">${board.laneSignal}</div>
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

const BOARDS = [
  {
    name: 'b1-buyers-property-opportunities.png',
    eyebrow: 'Resolve · Buyer Network · Ontario',
    hook: 'Property opportunities<br />you won\'t see on MLS.',
    subItalic: 'Match-based notification. Disclosed representation.',
    items: [
      'A network of pre-qualified Ontario buyers, investors, and end-users.',
      'Sellers brief us first when the file is sensitive or time-sensitive.',
      'Matches go to your inbox. You decide. Multiple representation is always disclosed.',
    ],
    laneSignal: 'Real Estate Representation · Ontario',
  },
  {
    name: 'a2-agents-relationship-file-work.png',
    eyebrow: 'For Agents · Ontario',
    hook: 'You bring the<br />relationship.',
    subItalic: 'We bring the file work.',
    items: [
      'Brokerage-to-brokerage partnership under TRESA.',
      'You keep the client. Resolve handles the file.',
      'Refer or co-broker. You choose per file.',
    ],
    laneSignal: 'Real Estate Representation · Ontario',
  },
]

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  console.log('[buyers-agents] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  // 2x retina output
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
}

run().catch((err) => { console.error(err); process.exit(1) })
