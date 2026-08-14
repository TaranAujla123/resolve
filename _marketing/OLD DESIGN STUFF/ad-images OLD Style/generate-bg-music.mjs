#!/usr/bin/env node
/**
 * Generate a new confident-beat background music track for the Resolve
 * video pipeline via fal.ai's stable-audio model.
 *
 * The current bg-music.mp3 (carried over from Primegate) reads as too
 * sad / library-melancholic for the Resolve V2 brand video voice. The
 * brief: confident beat, not sad, not too happy. Editorial register.
 * Sits under voiceover.
 *
 * Output:
 *   _marketing/video-pipeline/assets/bg-music.mp3 (overwrites old)
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

const OUT_PATH = path.join(
  REPO_ROOT,
  '_marketing',
  'video-pipeline',
  'assets',
  'bg-music.mp3',
)

const PROMPT = [
  'Confident modern instrumental beat for a premium real estate brand video.',
  'Calm but progressive forward-moving pulse with subtle deep bass and a clean',
  'minimal rhythm. Restrained, editorial, professional. Sits comfortably under',
  'a measured male voiceover. No vocals, no melody dominance, no orchestral',
  'swells, no cinematic emotional builds. Not sad, not melancholic, not heroic,',
  'not playful or whimsical — a confident steady professional beat that says',
  '"we know what we are doing." Think modern fintech brand video bed, lo-fi',
  'house tempo around 90-100 bpm, warm analog texture.',
].join(' ')

console.log('[bg-music] generating via fal.ai stable-audio')
console.log('[bg-music] prompt:', PROMPT.substring(0, 80) + '...')
const started = Date.now()

const res = await fetch('https://fal.run/fal-ai/stable-audio', {
  method: 'POST',
  headers: {
    Authorization: `Key ${FAL_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: PROMPT,
    seconds_total: 30,
    steps: 100,
  }),
})

if (!res.ok) {
  console.error(`[bg-music] fal.ai ${res.status}: ${await res.text()}`)
  process.exit(1)
}

const result = await res.json()
const audioUrl = result.audio_file?.url || result.audio?.url || result.url
if (!audioUrl) {
  console.error('[bg-music] No audio URL in response:', JSON.stringify(result, null, 2))
  process.exit(1)
}

console.log(`[bg-music] downloading from ${audioUrl}`)
const audioRes = await fetch(audioUrl)
const audioBuf = Buffer.from(await audioRes.arrayBuffer())
await fs.writeFile(OUT_PATH, audioBuf)
console.log(`  ✓ ${OUT_PATH} — ${(audioBuf.length / 1024).toFixed(0)} KB — ${((Date.now() - started) / 1000).toFixed(1)}s`)
