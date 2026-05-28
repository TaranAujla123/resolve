// -----------------------------------------------------------------------
// scripts/render-signature-mark.mjs
// -----------------------------------------------------------------------
// Renders the Resolve wordmark to a crisp PNG for use in email signatures.
// Output: public/signature-mark.png  (deployed at
// https://resolveproperty.ca/signature-mark.png)
//
// Uses Puppeteer so Poppins loads from Google Fonts (same as the live
// site), guaranteeing pixel-parity with the nav wordmark. Renders at 3x
// density so the image stays crisp on retina displays and when email
// clients scale it.
//
// Run: node scripts/render-signature-mark.mjs
// -----------------------------------------------------------------------

import puppeteer from 'puppeteer'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'signature-mark.png')

// Logical layout: 320 (w) x 90 (h). Render at 3x = 960 x 270 PNG.
const WIDTH = 320
const HEIGHT = 90
const DPR = 3

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Poppins:wght@700&display=swap"
    rel="stylesheet"
  />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: transparent;
    }
    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 4px;
      box-sizing: border-box;
    }
    .wordmark {
      font-family: 'Poppins', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 700;
      font-size: 44px;
      line-height: 1;
      color: #0A1F44;
      letter-spacing: -0.02em;
    }
    .dot {
      color: #1F8B5A;
    }
    .eyebrow {
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      font-size: 12px;
      line-height: 1;
      color: #475569;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="wordmark">Resolve<span class="dot">.</span></div>
  <div class="eyebrow">Seller Representation</div>
</body>
</html>
`

async function run() {
  console.log('[signature-mark] launching headless chromium')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: DPR,
  })

  await page.setContent(html, { waitUntil: 'networkidle0' })

  // Give the Google Fonts CSS one more beat to apply
  await new Promise((r) => setTimeout(r, 300))

  await mkdir(path.dirname(OUT), { recursive: true })
  await page.screenshot({
    path: OUT,
    type: 'png',
    omitBackground: true,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  })

  await browser.close()
  console.log(`[signature-mark] wrote ${path.relative(ROOT, OUT)}`)
  console.log(`[signature-mark] dimensions: ${WIDTH * DPR}x${HEIGHT * DPR} (display @ ${WIDTH}x${HEIGHT})`)
}

run().catch((err) => {
  console.error('[signature-mark] FAILED:', err)
  process.exit(1)
})
