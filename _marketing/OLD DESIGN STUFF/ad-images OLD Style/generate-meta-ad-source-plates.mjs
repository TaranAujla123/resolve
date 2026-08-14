#!/usr/bin/env node
/**
 * Resolve Meta Ads — atmospheric source plates for Track B performance creatives.
 *
 * Generates 4 editorial source photographs that will be composited under a
 * navy gradient + Newsreader headline + Resolve compliance footer to produce
 * the cold-prospecting performance ad variants for:
 *
 *   - Mortgage Arrears       (three letters on a desk surface)
 *   - Power of Sale          (calendar + closed folder + envelope)
 *   - Time-Sensitive Sales   (wall calendar with a circled date)
 *   - Separation & Divorce   (closed leather portfolio + fountain pen)
 *
 * Style brief for all four:
 *   - Editorial advertising still-life, restraint over drama
 *   - Color palette: deep navy shadows, warm bronze highlights, stone neutrals
 *   - No people. No real-estate signage. No readable text on documents.
 *   - Shallow depth of field, naturalistic warm window light
 *   - Reads as a high-end legal or advisory practice, never lifestyle stock
 *
 * Output: COWORK OUTPUT/Marketing/Meta-Ads/_concept-mockups/source-plates/*.jpg
 *
 * Usage:
 *   FAL_KEY=$(grep '^FAL_KEY=' /c/Users/Owner/TaranAujla/.env | cut -d'=' -f2) \
 *     node _marketing/ad-images/generate-meta-ad-source-plates.mjs
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

const OUT_DIR = path.join(
  REPO_ROOT,
  'COWORK OUTPUT',
  'Marketing',
  'Meta-Ads',
  '_concept-mockups',
  'source-plates',
)
await fs.mkdir(OUT_DIR, { recursive: true })

const SHARED_STYLE =
  ' Editorial advertising still-life photography. Restrained sophisticated mood, like the desk of a senior advisor at a boutique legal practice. Naturalistic warm late-afternoon window light from upper right casting long soft shadows. Shallow depth of field, slight angle. Color palette: deep navy in the shadows, warm bronze in the highlights from the sunlight, warm stone and cream in the mid-tones, no saturated colors. Premium editorial register. No people, no faces, no real-estate signage, no logos, no readable typography on documents, no clutter.'

const JOBS = [
  {
    name: 'arrears-mail-source',
    aspect: '1:1',
    prompt:
      'Overhead photograph of three pieces of business mail loosely overlapping on a honed dark walnut desk surface. The envelopes are plain cream and bone white, slightly rotated, suggesting an arrival sequence over several weeks. A small dark ceramic bowl sits to the upper left edge of frame. Negative space along the bottom half of the frame for typography overlay.' +
      SHARED_STYLE,
  },
  {
    name: 'pos-deadline-source',
    aspect: '1:1',
    prompt:
      'Editorial still-life. A closed leather portfolio in deep navy sits on a dark stone desk surface. Beside it, a torn-corner page of a desk calendar partially visible with a single date subtly circled in faded bronze ink. An unbranded cream business envelope rests at the lower edge of frame, just out of crisp focus. Negative space across the upper third of the frame for typography overlay.' +
      SHARED_STYLE,
  },
  {
    name: 'tss-deadline-source',
    aspect: '1:1',
    prompt:
      'Editorial close-up of an analog brass desk clock face on a calm deep navy wall, the hour hand sitting just before twelve, the second hand crisp. The clock is a restrained Bauhaus-era piece, not antique-ornate. To the side, the corner of a leather-bound planner is partially visible with a single bronze ribbon bookmark. The mood is composed and deliberate, not panicked. Negative space across the lower third of the frame for typography overlay.' +
      SHARED_STYLE,
  },
  {
    name: 'separation-folder-source',
    aspect: '1:1',
    prompt:
      'Overhead photograph of a closed leather portfolio in deep navy resting on a warm cream linen surface. A heavy black fountain pen with a bronze cap rests diagonally across one corner of the portfolio. Behind the portfolio, the soft blurred edge of a ceramic coffee cup is just visible. The composition is restrained, quiet, neutral, suggesting the moment after a serious conversation rather than the conversation itself. Negative space across the upper half of the frame for typography overlay.' +
      SHARED_STYLE,
  },
]

const FAL_ENDPOINT = 'https://fal.run/fal-ai/nano-banana'

const overallStart = Date.now()
for (const job of JOBS) {
  console.log(`\nGenerating ${job.name} (${job.aspect})...`)
  const started = Date.now()

  const res = await fetch(FAL_ENDPOINT, {
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

  if (!res.ok) {
    console.error(`fal.ai returned ${res.status}: ${await res.text()}`)
    process.exit(1)
  }
  const result = await res.json()
  const imageUrl = result.images?.[0]?.url
  if (!imageUrl) {
    console.error('No image URL. Payload:', JSON.stringify(result, null, 2))
    process.exit(1)
  }
  const imgRes = await fetch(imageUrl)
  const imgBuf = Buffer.from(await imgRes.arrayBuffer())
  const outPath = path.join(OUT_DIR, `${job.name}.jpg`)
  await fs.writeFile(outPath, imgBuf)
  console.log(
    `  ✓ ${job.name}.jpg — ${(imgBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`,
  )
}

console.log(`\n=== DONE in ${((Date.now() - overallStart) / 1000).toFixed(1)}s ===`)
