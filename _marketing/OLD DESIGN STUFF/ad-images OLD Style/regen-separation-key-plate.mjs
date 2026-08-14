#!/usr/bin/env node
/**
 * Resolve Meta Ads — generate a "brass key on console" source plate
 * for the Separation creative (alternate to the portfolio + pen).
 *
 * The portfolio+pen image was reading as legal-document signing
 * (separation agreement closing). A single brass key on a quiet
 * console table is the cleanest possible real-estate handover
 * symbol — sale clears, title transfers, key changes hands.
 * Categorical clarity without any document register.
 *
 * Output:
 *   COWORK OUTPUT/Marketing/Meta-Ads/_concept-mockups/source-plates/separation-key-source.jpg
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, '..', '..')

const FAL_KEY = process.env.FAL_KEY
if (!FAL_KEY) { console.error('FAL_KEY missing.'); process.exit(1) }

const OUT_DIR = path.join(
  REPO_ROOT,
  'COWORK OUTPUT', 'Marketing', 'Meta-Ads', '_concept-mockups', 'source-plates',
)
await fs.mkdir(OUT_DIR, { recursive: true })

const PROMPT =
  'Editorial still-life photograph of a single antique brass key resting on a quiet console table or stone surface. Soft warm window light from upper left, deep shadows on the right side of the frame. The key is the only subject, photographed slightly off-centre with deep negative space around it for typography overlay. The surface is dark wood or warm stone, restrained, minimal, no other objects in frame. Color palette: deep navy in the shadows, warm bronze on the brass, calm stone and cream in the surface highlights. No people, no signage, no other props. Composition feels like a museum still-life, premium editorial register, never lifestyle stock.'

console.log('Generating separation-key-source (1:1)...')
const started = Date.now()
const res = await fetch('https://fal.run/fal-ai/nano-banana', {
  method: 'POST',
  headers: { Authorization: `Key ${FAL_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: PROMPT, aspect_ratio: '1:1', num_images: 1 }),
})
if (!res.ok) { console.error(`fal.ai ${res.status}: ${await res.text()}`); process.exit(1) }
const result = await res.json()
const imgUrl = result.images?.[0]?.url
if (!imgUrl) { console.error('No image URL:', JSON.stringify(result, null, 2)); process.exit(1) }
const imgRes = await fetch(imgUrl)
const imgBuf = Buffer.from(await imgRes.arrayBuffer())
const outPath = path.join(OUT_DIR, 'separation-key-source.jpg')
await fs.writeFile(outPath, imgBuf)
console.log(`  ✓ separation-key-source.jpg — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`)
