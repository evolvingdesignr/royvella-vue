import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const normalize = value => String(value ?? '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '')
const filename = value => String(value ?? '').split(/[?#]/)[0].split(/[\\/]/).at(-1).toLowerCase()

// This fails validation; it never hides or filters artwork in the application.
export function findExcludedArtwork(entries, exclusions, assetFiles = []) {
  const errors = new Set()
  for (const excluded of exclusions) {
    const matchesAsset = value => {
      const stem = filename(value).replace(/\.[^.]+$/, '')
      return stem === excluded.assetStem || stem.startsWith(`${excluded.assetStem}-`)
    }
    for (const entry of entries) {
      const sourceNames = [entry.source, entry.sourceFile, entry.originalFile].filter(Boolean).map(filename)
      if (normalize(entry.id) === normalize(excluded.id)
        || normalize(entry.title) === normalize(excluded.title)
        || [entry.src, entry.thumbnail, entry.poster].some(matchesAsset)
        || sourceNames.some(name => excluded.sourceFiles.map(filename).includes(name))) {
        errors.add(`Permanently excluded artwork: ${excluded.title} (${entry.id}). Remove the record; do not restore it from an old snapshot.`)
      }
    }
    for (const asset of assetFiles) {
      if (matchesAsset(asset)) errors.add(`Remove generated asset for permanently excluded artwork: ${asset}`)
    }
  }
  return [...errors]
}

export async function validateCreativeGallery(root = resolve(fileURLToPath(new URL('..', import.meta.url)))) {
  const entries = JSON.parse(await readFile(resolve(root, 'app/data/creative-gallery.json'), 'utf8'))
  const exclusions = JSON.parse(await readFile(resolve(root, 'app/data/creative-gallery-exclusions.json'), 'utf8'))
  const assets = await readdir(resolve(root, 'public/creative/drawings'))
  const errors = findExcludedArtwork(entries, exclusions, assets)
  if (errors.length) throw new Error(errors.join('\n'))
  console.log(`Gallery exclusions passed: ${exclusions.length} permanently excluded pieces are absent.`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateCreativeGallery().catch(error => { console.error(error.message); process.exitCode = 1 })
}
