import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { findExcludedArtwork } from '../scripts/validate-creative-gallery.mjs'

const exclusions = JSON.parse(await readFile(new URL('../app/data/creative-gallery-exclusions.json', import.meta.url)))

test('all five historical records are rejected if restored from a gallery snapshot', () => {
  for (const excluded of exclusions) {
    const record = { id: excluded.id, title: excluded.title, category: 'drawings-sketches', type: 'image', src: `/creative/drawings/${excluded.assetStem}.webp` }
    assert.ok(findExcludedArtwork([record], exclusions).length > 0, excluded.title)
  }
})

test('renamed records remain excluded by title, asset reference, or original source', () => {
  for (const excluded of exclusions) {
    assert.ok(findExcludedArtwork([{ id: 'renamed', title: excluded.title.replace(/—/g, '-') }], exclusions).length)
    assert.ok(findExcludedArtwork([{ id: 'renamed', title: 'Different title', src: `/creative/drawings/${excluded.assetStem}-v2.webp` }], exclusions).length)
    assert.ok(findExcludedArtwork([{ id: 'renamed', sourceFile: excluded.sourceFiles[0] }], exclusions).length)
  }
})

test('orphaned excluded assets are rejected and unrelated artwork is allowed', () => {
  assert.equal(findExcludedArtwork([], exclusions, ['muppet-character-thumb.webp']).length, 1)
  assert.deepEqual(findExcludedArtwork([{ id: 'roys-art-000', title: 'Adam — Character Development', src: '/creative/drawings/roys-art-000-psd.webp' }], exclusions, ['slims-bbq.webp']), [])
})

test('the current rendered catalog contains no excluded records', async () => {
  const catalog = JSON.parse(await readFile(new URL('../app/data/creative-gallery.json', import.meta.url)))
  assert.deepEqual(findExcludedArtwork(catalog, exclusions), [])
})
