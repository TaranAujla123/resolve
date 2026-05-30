#!/usr/bin/env node
/**
 * Resolve — Taran ad image generator (1080x1080 square)
 *
 * One-shot script that calls fal.ai's Nano Banana Pro (edit endpoint)
 * to compose a branded Resolve ad image. Input is the existing
 * src/portrait.jpg so Taran's face is preserved (Nano Banana Pro
 * outperforms FLUX Kontext on identity preservation per the user's
 * standing preference for personal-identity edits).
 *
 * Usage:
 *   FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) \
 *     node _marketing/ad-images/generate-taran-square.mjs
 *
 * Output: _marketing/ad-images/output/taran-square-<timestamp>.png
 *
 * Iteration notes:
 *   - If text comes back garbled, we drop to a two-pass approach:
 *     fal.ai generates the photo + branded environment only, then
 *     typography is composited via HTML+puppeteer for pixel-perfect
 *     text rendering. That branch lives in
 *     generate-taran-square-text-overlay.mjs (created on first text
 *     failure).
 *   - The model handles short, well-structured English text decently.
 *     The headline ("Facing a Difficult Property Situation?") is the
 *     most important to land cleanly.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const FAL_KEY = process.env.FAL_KEY
if (!FAL_KEY) {
  console.error('FAL_KEY env var is not set.')
  console.error('Source it from /c/Users/Owner/TaranAujla/.env and try again, e.g.:')
  console.error("  FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) node " + path.relative(REPO_ROOT, __filename))
  process.exit(1)
}

const PORTRAIT_PATH = path.join(REPO_ROOT, 'src', 'portrait.jpg')
const OUTPUT_DIR = path.join(__dirname, 'output')
await fs.mkdir(OUTPUT_DIR, { recursive: true })

console.log('Reading portrait:', path.relative(REPO_ROOT, PORTRAIT_PATH))
const portraitBuf = await fs.readFile(PORTRAIT_PATH)
const portraitDataUri = `data:image/jpeg;base64,${portraitBuf.toString('base64')}`
console.log(`  Portrait size: ${(portraitBuf.length / 1024).toFixed(1)} KB`)

const PROMPT = `Create a professional real estate marketing advertisement image, 1080x1080 square format.

SUBJECT: Use the man from the input image, preserving his face and expression exactly. Crop him from waist up so his head sits comfortably in the upper-middle area of the right third (NOT pushed to the very top of the frame). He looks confidently at the camera with a calm, professional expression. Do not alter his identity or facial features. Light, natural retouching only.

BACKGROUND: Solid deep navy color (#0A1F44) covering the entire 1080x1080 frame. A clearly visible vertical sage emerald (#1F8B5A) accent bar runs along the very left edge, about 16 to 20 pixels wide, fully saturated, distinct from the navy.

TOP BANNER (across the full width at the very top of the image, on the navy background):
  Small uppercase letter-spaced sans-serif text in sage emerald (#1F8B5A):
  "RESOLVE · SELLER REPRESENTATION"
  Slightly above center horizontally, with two short thin sage emerald horizontal lines flanking it on each side for editorial framing.

TEXT LAYOUT (left two thirds of the image, clean white sans-serif typography, Poppins or Inter style):

  Large extra-bold headline (heavy weight, strong presence), centered vertically in the upper-middle area:
  "Facing a Difficult Property Situation?"

  Below the headline in lighter weight, slightly smaller, regular weight:
  "Sell with a team that has spent more than a decade inside Ontario's most complex property files."

  Near the bottom of the left area, in small uppercase letter-spaced text in light gray:
  "TARAN AUJLA · SALESPERSON · HOMELIFE G1 REALTY INC., BROKERAGE"

  Phone number on its own line in sage emerald color (#1F8B5A) (NOT white), prominent and readable, medium weight:
  "(365) 645-7332"

STYLE: Modern editorial real estate aesthetic. Calm, restrained, professional. Generous whitespace. No drop shadows, no glow effects, no stock-photo look. The portrait and typography both feel intentional and balanced. Headline reads with strong hook energy; the rest reads quiet and trustworthy.`

const FAL_ENDPOINT = 'https://fal.run/fal-ai/nano-banana-pro/edit'

console.log('Calling fal.ai nano-banana-pro/edit...')
const startedAt = Date.now()

let res
try {
  res = await fetch(FAL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: PROMPT,
      image_urls: [portraitDataUri],
      aspect_ratio: '1:1',
      num_images: 1,
    }),
  })
} catch (err) {
  console.error('Network error calling fal.ai:', err.message)
  process.exit(1)
}

if (!res.ok) {
  const text = await res.text()
  console.error(`fal.ai returned ${res.status}: ${text}`)
  process.exit(1)
}

const result = await res.json()
console.log(`fal.ai responded in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)

const imageUrl = result.images?.[0]?.url
if (!imageUrl) {
  console.error('No image URL in fal.ai response. Full response:')
  console.error(JSON.stringify(result, null, 2))
  process.exit(1)
}

console.log('Downloading generated image...')
const imgRes = await fetch(imageUrl)
if (!imgRes.ok) {
  console.error(`Image download failed: ${imgRes.status}`)
  process.exit(1)
}
const imgBuf = Buffer.from(await imgRes.arrayBuffer())

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const outPath = path.join(OUTPUT_DIR, `taran-square-${stamp}.png`)
await fs.writeFile(outPath, imgBuf)

console.log('')
console.log('=== DONE ===')
console.log(`  File:    ${path.relative(REPO_ROOT, outPath)}`)
console.log(`  Size:    ${(imgBuf.length / 1024).toFixed(1)} KB`)
console.log(`  Total:   ${((Date.now() - startedAt) / 1000).toFixed(1)}s wall clock`)
