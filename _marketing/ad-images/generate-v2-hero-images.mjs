#!/usr/bin/env node
/**
 * Resolve V2 — generate the two hero images for the rebranded site
 * via fal.ai (nano-banana model — no source image, pure text-to-image).
 *
 * Output:
 *   public/hero-stilllife.jpg         (~1600x1400, landscape)
 *   public/hero-architectural.jpg     (~1200x1600, portrait)
 *
 * Both target the Resolve V2 brand palette: warm stone background, deep
 * navy shadows, soft bronze accent light, editorial/advisory register.
 *
 * Usage:
 *   FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) \
 *     node _marketing/ad-images/generate-v2-hero-images.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const FAL_KEY = process.env.FAL_KEY
if (!FAL_KEY) {
  console.error('FAL_KEY missing. Run with:')
  console.error("  FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) node " + path.relative(REPO_ROOT, __filename))
  process.exit(1)
}

const PUBLIC_DIR = path.join(REPO_ROOT, 'public')
await fs.mkdir(PUBLIC_DIR, { recursive: true })

const JOBS = [
  {
    name: 'hero-stilllife',
    aspect: '4:3',
    outFile: 'hero-stilllife.jpg',
    prompt:
      'Editorial interior photograph. A tall stone-toned ceramic vase holding slim dried branches with small leaves sits on a honed dark stone console table. Behind it, a small dark ceramic bowl rests on a closed book. The wall behind is calm muted deep navy with subtle texture. Warm late-afternoon natural sunlight streams in from the right, casting long soft window-light shadows across the wall and the stone surface. Sophisticated boutique advisory mood, like the reception of a high-end legal practice or an architect studio. No people, no real-estate signage, no clutter. Naturalistic depth, shot from a slight angle. Color palette: warm cream and stone in the highlights, deep navy in the shadows, soft bronze sunlight, warm beige and stone gray throughout. Editorial advertising still-life style.',
  },
  {
    name: 'hero-architectural',
    aspect: '3:4',
    outFile: 'hero-architectural.jpg',
    prompt:
      'Editorial architectural photograph at twilight. Modern minimalist concrete and stone steps lead up between rough stone planters. A single tall ornamental tree with delicate small leaves catches warm twilight light. Restrained sophisticated mood, like a Dezeen or Wallpaper architectural feature. Calm gradient evening sky, almost monochrome. No signage, no real-estate context, no people. Composition is vertical, suitable as a tall left-panel background behind a darkening overlay. Color palette: deep stone, navy shadow, warm bronze glow from a hidden uplight, soft beige in the sky.',
  },
]

const FAL_ENDPOINT = 'https://fal.run/fal-ai/nano-banana'

for (const job of JOBS) {
  console.log(`\nGenerating ${job.name} (${job.aspect})...`)
  const started = Date.now()
  let res
  try {
    res = await fetch(FAL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: job.prompt,
        aspect_ratio: job.aspect,
        num_images: 1,
      }),
    })
  } catch (err) {
    console.error(`Network error: ${err.message}`)
    process.exit(1)
  }
  if (!res.ok) {
    const text = await res.text()
    console.error(`fal.ai returned ${res.status}: ${text}`)
    process.exit(1)
  }
  const result = await res.json()
  const imageUrl = result.images?.[0]?.url
  if (!imageUrl) {
    console.error('No image URL returned. Full payload:')
    console.error(JSON.stringify(result, null, 2))
    process.exit(1)
  }
  const imgRes = await fetch(imageUrl)
  const imgBuf = Buffer.from(await imgRes.arrayBuffer())
  const outPath = path.join(PUBLIC_DIR, job.outFile)
  await fs.writeFile(outPath, imgBuf)
  console.log(
    `  ✓ ${job.outFile} — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`,
  )
}

console.log('\n=== DONE ===')
