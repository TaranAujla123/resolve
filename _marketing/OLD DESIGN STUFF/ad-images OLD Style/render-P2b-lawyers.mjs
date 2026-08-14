#!/usr/bin/env node
/**
 * P2b — "Before their lawyers take over." single-image ad.
 *
 * Sibling ad to P2 (the workhorse "Don't let bank list your home"),
 * dropped into AS-5 Power of Sale alongside it. Same visual template
 * (1080×1350, stone/navy/bronze) so the A/B is on the message, not
 * the design.
 *
 * P2  hook = the CONSEQUENCE  ("Don't let bank list your home")
 * P2b hook = the MECHANISM    ("Before their lawyers take over")
 *
 * If P2b wins on CPLPV inside the ad set, we've upgraded the
 * mortgage/PoS workhorse. If P2 wins, cheap lesson — consequence
 * hooks still beat mechanism hooks on this audience.
 *
 * Compliance:
 *   - "Their lawyers take over" is descriptive of enforcement counsel
 *     being engaged; not a guarantee-of-outcome claim (RECO 5.3)
 *   - "Buy you the time" is a colloquial verb, not a purchase claim
 *   - Brokerage attribution per RECO 5.1 in footer
 *   - HOUSING category compliant (no personal-attribute claims)
 *
 * Output: public/ads/P2b-before-lawyers.png  (1080×1350, 4:5 Feed)
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')
const OUT_PATH = path.join(REPO_ROOT, 'public', 'ads', 'P2b-before-lawyers.png')

const NAVY      = '#051A2C'
const NAVY_MUTE = 'rgba(5, 26, 44, 0.55)'
const NAVY_SOFT = 'rgba(5, 26, 44, 0.78)'
const BRONZE    = '#AC8E5C'
const STONE     = '#F5F1E8'

const HTML = `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${STONE}; }
  .board {
    width: 1080px; height: 1350px;
    background: ${STONE};
    color: ${NAVY};
    overflow: hidden;
    position: relative;
  }
  .content {
    height: 100%;
    padding: 108px 96px 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 60px;
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
    color: ${NAVY};
    line-height: 1.03;
    letter-spacing: -0.018em;
    margin: 0;
    font-size: 112px;
    max-width: 940px;
  }
  .sub {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500; font-style: italic;
    color: ${BRONZE};
    font-size: 52px; line-height: 1.14;
    margin: 44px 0 0;
    max-width: 860px;
  }
  .body-copy {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 27px; line-height: 1.5;
    color: ${NAVY_SOFT};
    margin: 44px 0 0;
    max-width: 800px;
  }
  .cta-button {
    display: inline-block;
    margin: 56px 0 0;
    padding: 24px 52px;
    background: ${BRONZE};
    color: ${STONE};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: 10px;
  }
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding-top: 28px;
    border-top: 1px solid rgba(5, 26, 44, 0.18);
  }
  .wordmark__row {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 500;
    font-size: 44px;
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
    font-size: 12px;
    color: ${NAVY_SOFT};
    line-height: 1.5;
    margin-top: 8px;
  }
  .footer-right { text-align: right; font-family: 'Inter', sans-serif; }
  .footer-right .url {
    font-weight: 600; font-size: 15px; color: ${BRONZE}; letter-spacing: 0.02em;
  }
  .footer-right .phone {
    font-size: 12px; color: ${NAVY_MUTE}; margin-top: 3px;
  }
</style></head>
<body>
<div class="board">
  <div class="content">
    <div>
      <div class="top-row">
        <p class="eyebrow">GTA &middot; Seller Representation</p>
      </div>
      <h2 class="hook">Before their<br />lawyers take<br />over.</h2>
      <p class="sub">We buy you the time to sell it yourself.</p>
      <p class="body-copy">
        Once your lender&rsquo;s enforcement counsel is engaged, the cost
        calculus shifts and control shifts with it. We work directly with
        your lender and their lawyers before that happens &mdash; so you
        sell on your terms, not theirs.
      </p>
      <div class="cta-button">Free 15-min call</div>
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
        <div class="url">resolveproperty.ca/get-help</div>
        <div class="phone">(365) 645-7332</div>
      </div>
    </div>
  </div>
</div>
</body></html>`

async function run() {
  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true })
  console.log('[P2b-lawyers] launching puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 })
  await page.setContent(HTML, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 700))
  const board = await page.$('.board')
  await board.screenshot({ path: OUT_PATH, omitBackground: false })
  const stat = await fs.stat(OUT_PATH)
  console.log(`  ✓ ${path.basename(OUT_PATH)} — ${(stat.size / 1024).toFixed(0)} KB`)
  await browser.close()
  console.log('[P2b-lawyers] done')
}

run().catch((err) => { console.error(err); process.exit(1) })
