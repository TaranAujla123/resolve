#!/usr/bin/env node
/**
 * Resolve V2 — regenerate hero-stilllife.jpg with a warmer / sunnier
 * prompt that matches the reference mockup's mood (cream wall, golden
 * afternoon light, restrained branches) rather than the previous moody
 * navy version.
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

const PROMPT = `Editorial interior still-life photograph in warm afternoon sunlight. A tall, slim cream-toned ceramic vase holds slender dried branches with small papery leaves and seed pods. The vase sits on a polished warm honey-stone or pale travertine console table. Beside it, a small dark patinated bronze bowl rests on a closed leather-bound book. Behind the scene, a calm cream-beige textured wall catches dramatic but soft golden afternoon sunlight streaming in from a window to the right — long crisp window-shadows fall across the wall and table surface. Sophisticated, restrained, boutique advisory register — like the reception of a high-end estate or law practice. No people, no real-estate context, no clutter. Naturalistic depth of field, shot at eye-level, slightly off-axis. Color palette: warm cream, soft beige, honey stone, golden afternoon light, muted olive and bronze in the branches and bowl, deep navy only in the deepest shadows under the table. Calm and intentional, never staged. Landscape composition with the vase and table occupying the right two-thirds of the frame so the left side stays bright and uncluttered for text overlay.`

console.log('Regenerating hero-stilllife.jpg with warmer / sunlit prompt...')
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
