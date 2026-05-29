/**
 * optimize-videos.mjs
 * Requires ffmpeg to be installed and available on PATH.
 *   Windows:  winget install Gyan.FFmpeg
 *   Mac:      brew install ffmpeg
 *
 * What it does per video:
 *   1. Re-encodes MP4 with H.264 at CRF 28 (good quality, ~50-70% smaller)
 *   2. Generates a WebM/VP9 version (~40-60% smaller than original MP4)
 *   3. Extracts a poster frame (WebP) so the card shows a thumbnail before video loads
 *
 * Skips files that already have optimised output (safe to run on every build).
 * Run manually:  npm run optimize:videos
 * Auto-runs via: prebuild
 */
import { execFile } from 'child_process'
import { promisify } from 'util'
import { access, readdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const exec = promisify(execFile)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const INPUT_DIR = join(__dirname, '../public/videos')

// ── ffmpeg availability check ─────────────────────────────────────────────────
const FFMPEG_FALLBACK_PATHS = [
  'C:\\Users\\mohit\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe',
]

async function findFfmpeg() {
  // 1. Try PATH first
  try { await exec('ffmpeg', ['-version']); return 'ffmpeg' } catch {}
  // 2. Try known winget install locations
  for (const p of FFMPEG_FALLBACK_PATHS) {
    try { await exec(p, ['-version']); return p } catch {}
  }
  return null
}

let FFMPEG = 'ffmpeg' // resolved below in main()

function exists(p) {
  return access(p).then(() => true).catch(() => false)
}

async function processVideo(file) {
  const inputPath = join(INPUT_DIR, file)
  const name      = basename(file, extname(file))
  const mp4Out    = join(INPUT_DIR, `${name}.opt.mp4`)
  const webmOut   = join(INPUT_DIR, `${name}.webm`)
  const posterOut = join(INPUT_DIR, `${name}.poster.webp`)

  const [mp4Done, webmDone, posterDone] = await Promise.all([
    exists(mp4Out),
    exists(webmOut),
    exists(posterOut),
  ])

  const tasks = []

  // 1. Compressed MP4 (H.264, CRF 28, fast preset for reasonable speed)
  if (!mp4Done) {
    tasks.push(
      exec(FFMPEG, [
        '-i', inputPath,
        '-c:v', 'libx264', '-crf', '28', '-preset', 'fast',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',   // moov atom at front — starts playing faster
        '-y', mp4Out,
      ]).then(() => console.log(`  ✓ mp4  → ${name}.opt.mp4`))
    )
  } else {
    console.log(`  – mp4  already exists, skipping`)
  }

  // 2. WebM/VP9 (better compression, supported by all modern browsers incl. iOS 15.1+)
  if (!webmDone) {
    tasks.push(
      exec(FFMPEG, [
        '-i', inputPath,
        '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0',
        '-c:a', 'libopus', '-b:a', '96k',
        '-deadline', 'good', '-cpu-used', '2',
        '-y', webmOut,
      ]).then(() => console.log(`  ✓ webm → ${name}.webm`))
    )
  } else {
    console.log(`  – webm already exists, skipping`)
  }

  // 3. Poster frame (first frame as WebP — shown before video loads)
  if (!posterDone) {
    tasks.push(
      exec(FFMPEG, [
        '-i', inputPath,
        '-frames:v', '1',
        '-q:v', '80',
        '-y', posterOut,
      ]).then(() => console.log(`  ✓ poster → ${name}.poster.webp`))
    )
  } else {
    console.log(`  – poster already exists, skipping`)
  }

  if (tasks.length > 0) {
    console.log(`\nProcessing: ${file}`)
    await Promise.all(tasks)
  }
}

async function main() {
  FFMPEG = await findFfmpeg()
  if (!FFMPEG) {
    console.log('\n⚠️  ffmpeg not found — skipping video optimisation.')
    console.log('   Install it and re-run `npm run optimize:videos`:')
    console.log('   Windows:  winget install Gyan.FFmpeg')
    console.log('   Mac:      brew install ffmpeg\n')
    return   // non-fatal: build continues without video optimisation
  }
  console.log(`Using ffmpeg: ${FFMPEG}`)

  const files  = await readdir(INPUT_DIR)
  // Only process original files (skip already-generated .opt.mp4 / .webm / .poster.webp)
  const videos = files.filter(f => /\.mp4$/i.test(f) && !f.endsWith('.opt.mp4'))

  if (videos.length === 0) {
    console.log('No videos found in', INPUT_DIR)
    return
  }

  console.log(`\nChecking ${videos.length} videos in public/videos/\n`)
  for (const v of videos) await processVideo(v)   // sequential to avoid CPU overload
  console.log('\n✅  Video optimisation done.\n')
  console.log('Next step: update Reels.jsx to use .webm + .opt.mp4 sources and .poster.webp\n')
}

main().catch(err => { console.error(err); process.exit(1) })
