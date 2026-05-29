/**
 * optimize-images.mjs
 * Converts all JPEG/PNG images in public/images/ to WebP (quality 82).
 * Also re-encodes JPEG originals at quality 82 to shrink fallback files.
 * Skips images that already have a .webp counterpart (safe to run on every build).
 * Run manually:  npm run optimize:images
 * Auto-runs via: prebuild (i.e. before every `npm run build`)
 */
import sharp from 'sharp'
import { access, readdir, stat, rename } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const INPUT_DIR  = join(__dirname, '../public/images')
const WEBP_QUALITY = 82
const JPEG_QUALITY = 82

function fmtBytes(n) {
  return n < 1024 ? `${n} B` : `${(n / 1024).toFixed(0)} KB`
}

async function processImage(file) {
  const inputPath = join(INPUT_DIR, file)
  const name      = basename(file, extname(file))
  const webpPath  = join(INPUT_DIR, `${name}.webp`)
  const tmpPath   = join(INPUT_DIR, `${name}.__tmp.jpg`)
  const isJpeg    = /\.jpe?g$/i.test(file)

  // Skip if WebP already exists (new photos won't have one yet)
  const alreadyDone = await access(webpPath).then(() => true).catch(() => false)
  if (alreadyDone) {
    console.log(`– ${file.padEnd(20)}  webp already exists, skipping`)
    return
  }

  const beforeStat = await stat(inputPath)

  // ── 1. Generate WebP ──────────────────────────────────────────────────────
  await sharp(inputPath)
    .rotate()                                // honour EXIF orientation
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(webpPath)

  const webpStat   = await stat(webpPath)
  const webpSaving = (((beforeStat.size - webpStat.size) / beforeStat.size) * 100).toFixed(0)

  // ── 2. Re-encode JPEG fallback (non-destructive: write tmp then replace) ──
  if (isJpeg) {
    await sharp(inputPath)
      .rotate()
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(tmpPath)

    const tmpStat   = await stat(tmpPath)
    const jpgSaving = (((beforeStat.size - tmpStat.size) / beforeStat.size) * 100).toFixed(0)

    if (tmpStat.size < beforeStat.size) {
      await rename(tmpPath, inputPath)        // replace only if smaller
      console.log(
        `✓ ${file.padEnd(20)} →  webp ${fmtBytes(webpStat.size)} (-${webpSaving}%)  |  jpg ${fmtBytes(tmpStat.size)} (-${jpgSaving}%)`
      )
    } else {
      // tmp is bigger (rare) – keep original, remove tmp
      const { unlink } = await import('fs/promises')
      await unlink(tmpPath)
      console.log(
        `✓ ${file.padEnd(20)} →  webp ${fmtBytes(webpStat.size)} (-${webpSaving}%)  |  jpg kept original`
      )
    }
  } else {
    console.log(
      `✓ ${file.padEnd(20)} →  webp ${fmtBytes(webpStat.size)} (-${webpSaving}%)`
    )
  }
}

async function main() {
  const files  = await readdir(INPUT_DIR)
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f))

  if (images.length === 0) {
    console.log('No images found in', INPUT_DIR)
    return
  }

  console.log(`\nChecking ${images.length} images in public/images/\n`)
  await Promise.all(images.map(processImage))
  console.log('\n✅  Done. Commit any new .webp files before deploying.\n')
}

main().catch(err => { console.error(err); process.exit(1) })
