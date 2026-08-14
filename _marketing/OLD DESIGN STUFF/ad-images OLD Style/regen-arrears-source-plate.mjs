#!/usr/bin/env node
/**
 * Resolve Meta Ads — regenerate the Mortgage Arrears source plate.
 *
 * Replaces `arrears-mail-source.jpg` (which read as legal-document imagery
 * and risked being interpreted as legal-advice creative) with a clean
 * real-estate-coded image: a quiet Ontario suburban home exterior at
 * dusk with warm interior light. Pure real estate signal, no
 * correspondence or document register.
 *
 * Output:
 *   COWORK OUTPUT/Marketing/Meta-Ads/_concept-mockups/source-plates/arrears-home-source.jpg
 *
 * Usage:
 *   FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) \
 *     node _marketing/ad-images/regen-arrears-source-plate.mjs
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
  'COWORK OUTPUT',
  'Marketing',
  'Meta-Ads',
  '_concept-mockups',
  'source-plates',
)
await fs.mkdir(OUT_DIR, { recursive: true })

const PROMPT =
  'Editorial architectural photograph of a quiet upper-middle-class Ontario suburban single-family detached home at late dusk. Warm interior light spilling out of two ground-floor windows, the front lawn calm, a mature tree partially framing the right side. The sky is a calm deep navy-to-soft-bronze gradient. The home is restrained brick or stone construction, dignified, not ostentatious. No people, no FOR SALE sign, no signage of any kind, no cars, no clutter on the property. Composition emphasises the home as a considered asset, with deep negative space across the lower half of the frame for typography overlay. Color palette: deep navy in the sky and shadows, warm bronze in the interior light, calm stone and cream in the brick or stucco, no saturated colors. Premium editorial real-estate photography register, like the cover of a quiet architectural monograph, never bright lifestyle marketing.'

console.log('Generating arrears-home-source (1:1)...')
const started = Date.now()
const res = await fetch('https://fal.run/fal-ai/nano-banana', {
  method: 'POST',
  headers: {
    Authorization: `Key ${FAL_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prompt: PROMPT, aspect_ratio: '1:1', num_images: 1 }),
})
if (!res.ok) { console.error(`fal.ai ${res.status}: ${await res.text()}`); process.exit(1) }
const result = await res.json()
const imgUrl = result.images?.[0]?.url
if (!imgUrl) { console.error('No image URL:', JSON.stringify(result, null, 2)); process.exit(1) }
const imgRes = await fetch(imgUrl)
const imgBuf = Buffer.from(await imgRes.arrayBuffer())
const outPath = path.join(OUT_DIR, 'arrears-home-source.jpg')
await fs.writeFile(outPath, imgBuf)
console.log(`  ✓ arrears-home-source.jpg — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`)
