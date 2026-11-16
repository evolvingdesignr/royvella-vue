# PSD conversions — local review

Historical local review. The released catalog and validation are documented in [v0.0.0.1 — Hello, World.](releases/v0.0.0.1.md). Older counts and approval holds below describe their original review stage.

Current curation is governed by [gallery-correction-review.md](gallery-correction-review.md) and `app/data/creative-gallery-exclusions.json`. Five artwork entries are permanently excluded. Do not restore records or assets from the historical tables below to meet an old count.

Latest curation: Roy requested removal of ten pieces. The current gallery contains **49 pieces and 98 WebP assets**. Earlier counts and asset tables below record previous implementation batches. Original source files remain untouched.

Current gallery: 59 pieces, 118 WebP assets. Review at http://localhost:3000/work?category=drawings-sketches .

Roy requested that matching JPEG-derived gallery images also be replaced by PSD conversions. All 12 PSD files in `/Users/royvella/Desktop/roys Portfolio Hi Res` were converted: ten existing pieces were replaced without duplicate entries, and `flaming.psd` plus `mcCup.psd` were added as static images to the same collection. Motion / 3D entries remain unchanged.

## Conversion and visual review

- Used temporary copies of the 12 PSDs, processed through Adobe Photoshop 2026’s native Image Processor. Original artwork was never saved or edited.
- Photoshop exported native-size LZW TIFFs with embedded ICC profiles, without resizing or running additional actions. This preserves Photoshop adjustment layers and blend modes that the temporary third-party compositor could not reproduce.
- TIFF merged pixels were transferred losslessly to temporary PNGs with their ICC profiles retained, avoiding a TIFF metadata memory limit in the WebP encoder.
- Final images were converted to sRGB WebP with Sharp: viewer long edge up to 2200 px, quality 85; thumbnail long edge up to 960 px, quality 80; effort 6; original proportions; no enlargement of smaller sources.
- Native rendering resolved the earlier missing flattened-image compatibility notices in 003, 005, and 013. Their larger PSD canvases now supply the gallery exports.
- All 12 final exports were visually reviewed. The PSDs include stronger contrast and brighter paper backgrounds than the original JPEGs in several works. These differences come from the saved Photoshop adjustments; no additional contrast, retouching, or cropping was applied.
- Existing gallery IDs, titles, and alt text were preserved for the ten replacements. New names include `-psd` in the URL to distinguish them from the superseded JPEG-derived assets. Their 20 unused prior web derivatives were removed from `public/creative/drawings/`; originals are untouched.
- The two new entries use temporary descriptive titles and meaningful alt text. MC Cup remains 640 × 510; it was not enlarged.

## PSD-derived web assets

All files below are under `public/creative/drawings/`. Each stem has `.webp` and `-thumb.webp` variants. Sizes are KiB.

| Source PSD | Gallery title / asset stem | Viewer dimensions / KiB | Thumbnail dimensions / KiB |
|---|---|---|---|
| `RoysArt000.psd` | Adam — Character Development / `roys-art-000-psd` | 1318 × 1103 / 147.4 | 960 × 803 / 72.0 |
| `RoysArt001.psd` | Sinny — Serpent Character Study / `roys-art-001-psd` | 1644 × 1333 / 160.7 | 960 × 778 / 61.1 |
| `RoysArt002.psd` | Moses — Character Development / `roys-art-002-psd` | 1581 × 1284 / 141.7 | 960 × 780 / 55.3 |
| `RoysArt003.psd` | Hooded Figures / `roys-art-003-psd` | 1754 × 2200 / 1246.8 | 765 × 960 / 99.6 |
| `RoysArt004.psd` | Keys and Cord — Still Life / `roys-art-004-psd` | 1451 × 2014 / 376.3 | 692 × 960 / 97.8 |
| `RoysArt005.psd` | Strongman and Sidekick / `roys-art-005-psd` | 1271 × 2200 / 346.2 | 554 × 960 / 49.0 |
| `RoysArt006.psd` | Surreal Character Sketch / `roys-art-006-psd` | 1265 × 1898 / 206.9 | 640 × 960 / 57.9 |
| `RoysArt007.psd` | Giraffe Beneath the Branches / `roys-art-007-psd` | 970 × 1624 / 409.1 | 573 × 960 / 126.8 |
| `RoysArt008.psd` | Seated Figure Study / `roys-art-008-psd` | 1113 × 1760 / 351.9 | 607 × 960 / 75.7 |
| `RoysArt013.psd` | Streetwear Character Study / `roys-art-013-psd` | 1807 × 2200 / 585.0 | 789 × 960 / 93.5 |
| `flaming.psd` | Flaming Idiots — Illustrated Poster / `flaming-idiots-poster` | 1476 × 2200 / 213.3 | 644 × 960 / 67.5 |
| `mcCup.psd` | MC Cup — Reflection and Refraction / `mc-cup-reflection-study` | 640 × 510 / 53.3 | 640 × 510 / 43.0 |

The 24 PSD-derived assets total 5,261,046 bytes (5.02 MiB). All 118 gallery assets total 16,939,346 bytes (16.15 MiB).

## Validation

- All 118 thumbnail/viewer URLs return HTTP 200, match files on disk, and decode successfully. The server-rendered category contains exactly 59 cards.
- Intrinsic dimensions match the new metadata; thumbnail and viewer proportions match within resize rounding.
- All 80 source files across both artwork folders retain their audit SHA-256 checksums.
- Ten existing image sources were replaced, two entries added, and all other entries are unchanged from the previous local gallery state.
- `npm run typecheck` and `npm run build`: passed.
- All 118 production-output assets match the generated files. `git diff --check`: passed.
- No additional Chrome interaction test was performed because Roy is using Chrome; the existing gallery/lightbox component was unchanged in this PSD update. Its earlier responsive and keyboard checks are documented in `drawings-gallery-review.md`.
- No commits, pushes, or deployments.

## Changed files

- `app/data/creative-gallery.json`
- `public/creative/drawings/` (24 native PSD-derived WebPs replacing 20 prior derivatives; net four additional assets)
- `docs/psd-gallery-review.md`
- Prior review reports now point to this superseding source-selection report.

## Removed during visual review

- Blue-Shirt Cartoon Portrait
- Two-Tone Portrait Study
- NOPE — Poster Portrait
- High-Contrast Portrait Studies
- Basketball Character Studies
- Portrait Apparel — Black
- Portrait Apparel — Red
- Zimmerman — Illustrated Apparel
- Burger Campaign — Layout Studies
- Hockey — Promotional Layouts

Their gallery entries and 20 generated web derivatives were removed. All remaining entries are unchanged.
