// Render brand SVG assets to PNG variants for platforms that require
// raster images (favicons, iOS home screen icons, OG/social cards).
// Run from project root: node scripts/_render_brand_pngs.mjs
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function renderPng(svgFile, outFile, density = 384) {
  const svg = await readFile(join(publicDir, svgFile))
  const buf = await sharp(svg, { density }).png().toBuffer()
  await writeFile(join(publicDir, outFile), buf)
  return outFile
}

const tasks = [
  // Favicons at common sizes; modern browsers prefer favicon.svg but
  // ico/png fallbacks help legacy clients.
  { svg: 'favicon.svg', out: 'favicon-32.png', size: 32 },
  { svg: 'favicon.svg', out: 'favicon-16.png', size: 16 },
  // iOS home-screen icon. 180x180 is Apple's recommended size.
  { svg: 'apple-touch-icon.svg', out: 'apple-touch-icon.png', size: 180 },
  // Open Graph share card. 1200x630 is the de facto standard for FB / LinkedIn / X.
  { svg: 'og-image.svg', out: 'og-image.png', size: 1200 },
]

for (const t of tasks) {
  const svg = await readFile(join(publicDir, t.svg))
  await sharp(svg)
    .resize(t.size, t.svg.startsWith('og-') ? 630 : t.size)
    .png()
    .toFile(join(publicDir, t.out))
  console.log('rendered', t.out)
}
