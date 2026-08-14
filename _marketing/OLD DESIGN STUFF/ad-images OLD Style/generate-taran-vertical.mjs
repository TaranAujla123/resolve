#!/usr/bin/env node
/**
 * Resolve — Taran ad image generator (1080x1920 vertical, 9:16)
 *
 * Sibling to generate-taran-square.mjs. Same fal.ai Nano Banana Pro
 * pipeline, same brand frame, but laid out top-to-bottom for Instagram
 * Stories, Reels, and TikTok placements.
 *
 * Layout (top to bottom):
 *   1. Top banner — "RESOLVE · SELLER REPRESENTATION" in sage emerald
 *      with horizontal flanking rules
 *   2. Portrait — Taran cropped chest-up, centered on the navy field
 *   3. Sage emerald horizontal divider
 *   4. Headline stack — hook question + trust line + brokerage attribution
 *   5. Phone CTA in sage emerald, prominent at the bottom
 *
 * Usage:
 *   FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) \
 *     node _marketing/ad-images/generate-taran-vertical.mjs
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

const PROMPT = `Create a professional real estate marketing advertisement image, 1080x1920 vertical format (9:16 ratio, intended for Instagram Stories, Reels, and TikTok placements).

SUBJECT: Use the man from the input image, preserving his face and expression exactly. Crop him from chest up, centered horizontally in the upper portion of the frame, looking confidently at the camera with a calm, professional expression. Do not alter his identity or facial features. Light, natural retouching only.

BACKGROUND: Solid deep navy color (#0A1F44) covering the entire 1080x1920 frame. A clearly visible vertical sage emerald (#1F8B5A) accent bar runs the full height along the very left edge, about 16 to 20 pixels wide, fully saturated.

LAYOUT FROM TOP TO BOTTOM:

1. TOP BANNER (about 5% from the top):
   Small uppercase letter-spaced sans-serif text in sage emerald (#1F8B5A):
   "RESOLVE · SELLER REPRESENTATION"
   With two short thin sage emerald horizontal lines flanking it on each side for editorial framing.

2. PORTRAIT (occupying the upper-middle 45% of the frame, roughly from 10% down to 55% down):
   The man from the input image, centered, cropped chest up, with generous breathing room above his head.

3. THIN SAGE EMERALD HORIZONTAL DIVIDER LINE (about 60% down the frame), spanning roughly the middle 70% of the width.

4. HEADLINE STACK (centered, on navy background, in the 60-90% vertical band):
   Large extra-bold white headline (Poppins or Inter style), split naturally across 2 or 3 lines:
   "Facing a Difficult Property Situation?"

   Below in lighter weight, regular white:
   "Sell with a team that has spent more than a decade inside Ontario's most complex property files."

   Below in small uppercase letter-spaced text in light gray:
   "TARAN AUJLA · SALESPERSON"
   "HOMELIFE G1 REALTY INC., BROKERAGE"

5. PHONE CTA (at about 93% down the frame, centered):
   In sage emerald (#1F8B5A), prominent, medium-bold weight:
   "(365) 645-7332"

STYLE: Modern editorial real estate aesthetic. Calm, restrained, professional. Generous whitespace between elements. No drop shadows, no glow effects, no stock-photo look. The portrait and typography both feel intentional and balanced. The headline reads with strong hook energy; the rest reads quiet and trustworthy. Vertical composition reads cleanly on a phone screen.`

const FAL_ENDPOINT = 'https://fal.run/fal-ai/nano-banana-pro/edit'

console.log('Calling fal.ai nano-banana-pro/edit (9:16 vertical)...')
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
      aspect_ratio: '9:16',
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
const outPath = path.join(OUTPUT_DIR, `taran-vertical-${stamp}.png`)
await fs.writeFile(outPath, imgBuf)

console.log('')
console.log('=== DONE ===')
console.log(`  File:    ${path.relative(REPO_ROOT, outPath)}`)
console.log(`  Size:    ${(imgBuf.length / 1024).toFixed(1)} KB`)
console.log(`  Total:   ${((Date.now() - startedAt) / 1000).toFixed(1)}s wall clock`)
