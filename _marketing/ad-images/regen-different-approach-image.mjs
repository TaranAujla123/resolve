#!/usr/bin/env node
/**
 * Resolve V2 — regenerate public/hero-architectural.jpg used as the
 * navy-overlay background on the home page's "A Different Approach"
 * section. Cascades the new architectural / transition direction
 * from the hero so the two images read as one visual family rather
 * than the warm still-life + architectural twilight mismatch.
 *
 * Requirements specific to this image:
 *   - Image gets a deep navy semi-transparent overlay on top
 *   - So the photo needs to be inherently dark / dramatic / high
 *     contrast — soft-lit interiors won't survive the overlay
 *   - Vertical-friendly composition; ends up cropped to the left
 *     half of a desktop split layout
 *   - Same "passage / movement forward" semantic as the hero
 *
 * Output: public/hero-architectural.jpg (filename unchanged)
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

const PROMPT = `Editorial architectural photograph at low evening light. A dramatic modern stone staircase rising between deep-shadowed walls, photographed from below looking up so the steps and the narrow vertical band of sky above feel like a passage upward. The walls are cool pale stone with deep navy shadow filling most of the frame. A single shaft of warm honey-bronze light from the top of the frame catches the upper steps and the right-hand wall, creating strong vertical contrast. Mood: restrained, contemplative, transitional, the visual sense of a way forward through structure. No people, no furniture, no decorative objects, no signage. Naturalistic depth of field, shot at the foot of the staircase looking up at a slight angle. Editorial advertising photography register — Wallpaper, Cereal, Dezeen. Color palette: deep navy shadow as the dominant tone, cool pale stone gray on illuminated walls and steps, warm honey-bronze light at the top of the frame only. The composition should hold up under a 60-percent-opacity dark navy overlay, so the image needs to be inherently dramatic and high-contrast, not soft and even.`

console.log('Regenerating hero-architectural.jpg (passage / staircase upward)...')
const started = Date.now()

const res = await fetch('https://fal.run/fal-ai/nano-banana', {
  method: 'POST',
  headers: {
    Authorization: `Key ${FAL_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: PROMPT,
    aspect_ratio: '3:4',
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
const outPath = path.join(REPO_ROOT, 'public', 'hero-architectural.jpg')
await fs.writeFile(outPath, imgBuf)

console.log(
  `  ✓ public/hero-architectural.jpg — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`,
)
