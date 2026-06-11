#!/usr/bin/env node
/**
 * Render 4 stone-background ad variants — one per priority seller lane.
 *
 * Follows the H8 "Before you reply to the lender's lawyer" stone template:
 *   Stone (#F5F1E8) background, navy headline + bronze italic sub +
 *   navy body with bronze italic emphasis, footer with wordmark and
 *   full brokerage attribution.
 *
 * Visual purpose: contrast against the navy-bg ads already running in
 * the same ad sets. Stone ads scroll-stop in feeds where most ads
 * are dark, and the editorial register reads more like correspondence
 * than display advertising.
 *
 * Output (1080×1080 PNG, 2x retina, public/ads/):
 *   s2-arrears-lender-first-call.png
 *   s3-tss-closing-frames-strategy.png
 *   s4-separation-matrimonial-public.png
 *   s5-pos-reply-lender-lawyer.png
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
const NAVY_MUTE = 'rgba(5, 26, 44, 0.55)'
const NAVY_SOFT = 'rgba(5, 26, 44, 0.78)'
const BRONZE    = '#AC8E5C'   // bronze-deep — readable on stone
const STONE     = '#F5F1E8'

function buildHtml(b) {
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
    padding: 110px 110px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 600; font-size: 22px;
    color: ${BRONZE};
    letter-spacing: 0.22em; text-transform: uppercase;
    margin: 0 0 96px;
  }
  .hook {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    color: ${NAVY};
    font-size: 110px; line-height: 1.00;
    letter-spacing: -0.018em;
    margin: 0;
    max-width: 880px;
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 62px; line-height: 1.08;
    margin: 44px 0 0;
    max-width: 820px;
  }
  .body {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: ${NAVY};
    font-size: 24px; line-height: 1.5;
    margin: 60px 0 0;
    max-width: 880px;
  }
  .body em {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-style: italic;
    color: ${BRONZE};
    font-size: 26px;
  }

  /* Footer divider + wordmark + brokerage attribution */
  .footer {
    padding-top: 28px;
    border-top: 1px solid rgba(5, 26, 44, 0.18);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 56px;
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
    font-weight: 700; font-size: 11px;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: ${BRONZE};
  }
  .footer-attribution {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${NAVY_SOFT};
    line-height: 1.5;
    margin-top: 12px;
  }
  .footer-lane {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${BRONZE};
    margin-top: 12px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 22px; color: ${BRONZE}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 14px;
    color: ${NAVY_MUTE};
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
      <p class="body">${b.body}</p>
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
        <div class="footer-lane">Real Estate Representation · Ontario</div>
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
    name: 's2-arrears-sell-on-your-terms.png',
    eyebrow: 'Mortgage Arrears · Ontario',
    hook: 'Sell on<br />your terms.',
    sub: 'Equity preserved.',
    body: 'A clean sale on your timeline protects the equity you have built. Resolve represents Ontario homeowners through complex mortgage situations — quietly, equity-first. <em>The way out is the right sale at the right time.</em>',
  },
  {
    name: 's3-tss-closing-frames-strategy.png',
    eyebrow: 'Time-Sensitive Sales · Ontario',
    hook: 'A clean sale<br />on your timeline.',
    sub: 'Closing date framed.',
    body: 'A close-by date does not change what the property is worth. It changes what the marketing plan has to do, week by week. <em>The deadline is the frame. The sale stays clean.</em>',
  },
  {
    name: 's4-separation-matrimonial-public.png',
    eyebrow: 'Separation · Divorce · Ontario',
    hook: 'Sell the matrimonial<br />home quietly.',
    sub: 'Privacy is the strategy.',
    body: 'Marketed with restraint. Coordinated with both lawyers from the listing agreement forward. <em>Closed cleanly, without the neighbourhood reading the story.</em>',
  },
  {
    name: 's5-pos-sell-inside-window.png',
    eyebrow: 'Power of Sale · Ontario',
    hook: 'Sell inside<br />the window.',
    sub: 'Equity protected.',
    body: 'Power of sale is a statutory process with a real timeline. Resolve runs a clean sale inside it — your terms, your equity, on schedule. <em>Move first. Stay in control of the close.</em>',
  },
]

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  console.log('[stone-ads] launching puppeteer')
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
}

run().catch((err) => { console.error(err); process.exit(1) })
