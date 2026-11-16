# Art & Design — missing and unwanted artwork correction

Historical local review. The released catalog and validation are documented in [v0.0.0.1 — Hello, World.](releases/v0.0.0.1.md). Older counts and approval holds below describe their original review stage.

Final collection: **59 Art & Design pieces, 118 generated WebP assets**. The count comes from 59 existing pieces minus five permanent removals plus five distinct additions. It is not an instruction to restore older exclusions.

Review: http://localhost:3000/work?category=drawings-sketches

## Permanent removals

| Removed title | Record ID |
|---|---|
| Blue-Shirt Cartoon Portrait | `muppet-character` |
| Two-Tone Portrait Study | `stencil-portrait` |
| NOPE — Poster Portrait | `nope-poster` |
| Portrait Apparel — Black | `portrait-shirt-black` |
| Zimmerman — Illustrated Apparel | `zimmerman-shirt` |

The five records were removed completely from the rendered JSON catalog. Their ten generated web files were removed from the project and production output; their old local URLs return 404. Desktop originals remain unchanged. No CSS hiding or runtime filtering was added.

## Why they returned and how recurrence is prevented

The repository has one rendered creative-gallery source: `app/data/creative-gallery.json`, imported directly by `CreativeGallery.vue`. No Desktop importer, seed process, or build-time generator was found. The unwanted entries were previously restored by one-off temporary snapshot-restoration helpers after requests to retain or restore a 59-piece count were confirmed. Historical reports are not rendered data sources.

`app/data/creative-gallery-exclusions.json` now records the permanent exclusions, their IDs, titles, asset stems, and original source filenames. `scripts/validate-creative-gallery.mjs` rejects excluded records, normalized-title aliases, old asset references, original-source aliases, and orphaned excluded assets. It fails validation rather than filtering the gallery. `prebuild` and `predev` run it automatically. `AGENTS.md` instructs future gallery work to honor the exclusions and never restore them from old snapshots merely to reach a prior count.

## Additions

| Source file | New title | Viewer dimensions / KiB | Thumbnail dimensions / KiB |
|---|---|---|---|
| `RoysArt016.jpg` | Character Clash — Graffiti Illustration | 2200 × 1524 / 699.9 | 960 × 665 / 119.8 |
| `RoysArt017.jpg` | New York — Graffiti & Caricatures | 2200 × 1654 / 880.4 | 960 × 722 / 126.5 |
| `RoysArt019.jpg` | Graffiti Wall — Lettering & Characters | 2200 × 1554 / 1051.4 | 960 × 678 / 169.8 |
| `RoysArt020.jpg` | Red Scroll — Lettering Study | 2200 × 1124 / 511.7 | 960 × 491 / 76.5 |
| `SlimsLogo.ai` | Slim’s BBQ — Restaurant Identity | 2200 × 2086 / 171.2 | 960 × 910 / 61.6 |

All new files live under `public/creative/drawings/` using their record IDs as stems, with `-thumb` variants. JPEG sources were exported to sRGB WebP at maximum long edges of 2200/960 px, quality 85/80, effort 6, without cropping or enlargement. The Illustrator logo was rendered from its PDF-compatible artwork bounds with a small white safety margin before WebP optimization.

## Source comparison

| Requested source | Result |
|---|---|
| RoysArt016.jpg | Added: distinct character/graffiti composition. |
| RoysArt017.jpg | Added: distinct New York caricature/graffiti composition. |
| RoysArt018.jpg | Already present as Mushroom Character — Graffiti Illustration (`roys-art-018`). No duplicate added. |
| RoysArt019.jpg | Added: distinct graffiti-wall composition. |
| RoysArt020.jpg | Added: distinct red-scroll lettering composition. |
| RoysArt021.jpg | Already present as Green and Purple — Lettering Study (`roys-art-021`). No duplicate added. |
| RoysArt022.jpg | Not found anywhere within the specified source directory. Could not inspect or restore an unavailable file. |
| SlimsLogo.ai | Selected for the one Slims BBQ identity entry. |
| SlimsLogo-res.ai | Visually the same logo at another scale/bounds; omitted as an alternate version. |

All four new JPEG compositions and both Illustrator versions were visually reviewed, followed by visual review of the final five web exports. No duplicate compositions were introduced. Full-image SHA-256 hashes are distinct across all 59 records; difference-hash comparisons also found no near matches for the five additions (a supplementary check, not a substitute for visual review).

## Organization and preservation

The continuous grid and styling are unchanged. Character studies and drawings lead, followed by illustrations, apparel/products, and branding/marketing. The new restaurant identity sits with other restaurant marks. The final seven entries are The Crowned Figure; Character Clash — Graffiti Illustration; New York — Graffiti & Caricatures; Graffiti Wall — Lettering & Characters; Mushroom Character — Graffiti Illustration; Red Scroll — Lettering Study; Green and Purple — Lettering Study.

The PCS Panthers trio is consecutive at positions 30–32: Basketball Uniform, Logo & Mascot Studies, and Panther Head Mark. All retained records, approved titles, captions, image URLs, image contents, and Motion / 3D data are unchanged.

## Validation

- `npm run test:gallery`: 4 regression tests passed, covering all five exclusions, renamed aliases, source aliases, excluded assets, and the current catalog.
- `npm run validate:gallery`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, including automatic `prebuild` exclusion validation.
- All 59 served card IDs match JSON display order; all 118 current image URLs return 200, match disk, and decode.
- All ten retired generated-asset URLs return 404. Excluded records and assets are absent from both the project catalog/assets and production output.
- All 118 production assets match the generated files.
- All 80 original files across the two audited Desktop source folders retain their audit checksums.
- `git diff --check`: passed.
- The unchanged lightbox navigates the same filtered JSON collection; its order matches the served grid. A new live interaction check could not complete because Chrome changed while native control was attempted.
- No commits, pushes, deployments, or Desktop original changes.

## Files changed in this correction

- `app/data/creative-gallery.json`
- `public/creative/drawings/`: ten retired files removed, ten new files generated.
- `app/data/creative-gallery-exclusions.json`
- `scripts/validate-creative-gallery.mjs`
- `tests/creative-gallery-exclusions.test.mjs`
- `package.json`: validation/test commands plus prebuild/predev hooks.
- `AGENTS.md`: durable curation instructions.
- `docs/gallery-correction-review.md`: this report.
