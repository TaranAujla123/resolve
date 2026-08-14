#!/usr/bin/env node
/**
 * Resolve V2 — regenerate public/hero-stilllife.jpg with an
 * architectural / transition composition rather than the previous
 * warm still-life (which read as luxury home decor staging — too
 * generic for Resolve's audience of distressed sellers).
 *
 * New direction (per user art-direction note):
 *   - Doorway with daylight entering
 *   - Architectural passage / threshold
 *   - Cooler stone tones, not warm cream
 *   - Strong vertical and horizontal geometry
 *   - Reads as "way forward" / transition / next step
 *   - No people, no furniture clutter, no decorative objects
 *
 * Filename intentionally stays `hero-stilllife.jpg` so no
 * component import needs to change — the Hero.jsx pulls
 * `/hero-stilllife.jpg` directly.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const FAL_KEY = process.env.FAL_KEY
if (!FAL_KEY) {
  console.error('FAL_KEY missing.')
  process.exit(1)
}

const PROMPT = `Editorial architectural photograph. A modern minimalist interior passage viewed at slight angle — pale cool-stone walls with subtle textured plaster, leading toward a single rectangular doorway where warm afternoon daylight pools onto the polished stone floor from beyond. Strong architectural geometry: a clean vertical doorframe on the right third of the composition, a horizontal threshold, restrained ceiling line, deep navy-toned shadow on the side walls. The light enters as a single warm beam across the floor and lower portion of the threshold wall, then dissolves into the cool stone interior. Mood: restrained, contemplative, transitional — the visual sense of moving from a held position toward a clearer one. No people, no furniture, no decorative objects, no clutter, no signage. Naturalistic depth of field, shot at human eye level, the doorway and its warm light occupying the right two-thirds of the frame, the left third darker and more open for editorial type overlay. Editorial advertising photography in the register of Wallpaper or Cereal magazine. Color palette: cool pale stone gray, soft slate, deep navy shadow on the side walls, warm honey-amber bronze light only at the threshold and on the polished floor reflection.`

console.log('Generating new hero image (architectural / transition)...')
const started = Date.now()

const res = await fetch('https://fal.run/fal-ai/nano-banana', {
  method: 'POST',
  headers: {
    Authorization: `Key ${FAL_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: PROMPT,
    aspect_ratio: '4:3',
    num_images: 1,
  }),
})

if (!res.ok) {
  console.error(`fal.ai returned ${res.status}:`, await res.text())
  process.exit(1)
}

const result = await res.json()
const imageUrl = result.images?.[0]?.url
if (!imageUrl) {
  console.error('No image URL returned:', JSON.stringify(result, null, 2))
  process.exit(1)
}

const imgRes = await fetch(imageUrl)
const imgBuf = Buffer.from(await imgRes.arrayBuffer())
const outPath = path.join(REPO_ROOT, 'public', 'hero-stilllife.jpg')
await fs.writeFile(outPath, imgBuf)

console.log(
  `  ✓ public/hero-stilllife.jpg — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`,
)
