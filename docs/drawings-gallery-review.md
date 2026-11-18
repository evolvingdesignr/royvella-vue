# Drawings & Sketches — local review report

Historical local review. The released catalog and validation are documented in [v0.0.0.1 — Hello, World.](releases/v0.0.0.1.md). Older counts and approval holds below describe their original review stage.

Asset rows for the ten works removed in the November 18, 2026 curation have been omitted; their generated image pairs are no longer shipped. Historical batch counts below are unchanged.

Current curation is governed by [gallery-correction-review.md](gallery-correction-review.md) and `app/data/creative-gallery-exclusions.json`. Five artwork entries are permanently excluded. Do not restore records or assets from the historical tables below to meet an old count.

Latest curation: Roy requested removal of ten pieces. The current gallery contains **49 pieces and 98 WebP assets**. Earlier counts and asset tables below record previous implementation batches. Original source files remain untouched.

Current update: the gallery now contains 59 pieces. All 12 PSDs were converted natively through Photoshop; ten matching JPEG-derived sources were replaced and two pieces were added. See [psd-gallery-review.md](psd-gallery-review.md). The source decisions and asset tables below document the earlier batch.

Initial implementation: the 18-piece shortlist from `/private/tmp/roy-artwork-audit.md`. Proposed titles are temporary and ready for visual review.

Review at http://localhost:3000/work?category=drawings-sketches (existing local Nuxt server). The same collection also appears in the existing Lab gallery. Nothing was committed, pushed, or deployed.

## Changed files

- `app/data/creative-gallery.json`: 18 image entries with descriptive titles, meaningful alt text, viewer/thumbnail paths, and intrinsic dimensions. Existing Motion / 3D entries are unchanged.
- `app/components/CreativeGallery.vue`: optional thumbnail and dimension support; full-composition 4:3 frames scoped to Drawings & Sketches; left/right arrow navigation scoped to this category. Existing native dialog, navigation buttons, Escape handling, URL state, and focus restoration are reused.
- `public/creative/drawings/`: 36 generated WebP assets.
- `docs/drawings-gallery-review.md`: this source-selection, asset, and verification report.

## Source selection

Original directory: `/Users/royvella/Desktop/roys Portfolio Hi Res`. All selected exports use the original JPEGs. No original files were edited, moved, renamed, or deleted. SHA-256 checks against the audit inventory confirm all 38 artwork files are unchanged.

The higher-resolution PSDs for 003, 005, and 013 were compared with their JPEG exports. Their native previews show the same compositions, but display an unreliable violet cast in the local renderer. Independently decoding the embedded RGB merged-image data revealed a Photoshop compatibility notice rather than a flattened artwork image in all three files. A larger canvas therefore does not provide a reliable ready-to-use export through the available pipeline. The existing JPEG exports preserve the reviewed appearance and are sufficient for these viewer sizes. This is not a finding that the PSD layers are damaged; a future Photoshop export could still use the larger masters.

| Artwork | JPEG source | PSD canvas | Selected source |
|---|---|---|---|
| 003 — Hooded Figures | 2103 × 2635 | 3392 × 4255 | JPEG |
| 005 — Strongman and Sidekick | 1896 × 3283 | 3375 × 5844 | JPEG |
| 013 — Streetwear Character Study | 2541 × 3093 | 5400 × 6573 | JPEG |

## Generated assets

WebP generation used Sharp 0.35.5 in a temporary tools directory; project dependencies and lockfile are unchanged. Images are converted to sRGB, metadata is stripped, and the full composition is retained. Long edges are capped at 2200 px for viewer images (quality 85) and 960 px for thumbnails (quality 80), effort 6, with no enlargement. No cropping, retouching, contrast adjustment, or rotation beyond source orientation was applied.

Names below are under `public/creative/drawings/`; each full image is `<stem>.webp` and each thumbnail is `<stem>-thumb.webp`. Sizes use KiB (1024 bytes).

| Stem / temporary title | Viewer dimensions | Viewer KiB | Thumbnail dimensions | Thumbnail KiB |
|---|---|---:|---|---:|
| `roys-art-000` — Adam — Character Development | 1318 × 1103 | 195.9 | 960 × 803 | 77.9 |
| `roys-art-001` — Sinny — Serpent Character Study | 1644 × 1333 | 472.6 | 960 × 778 | 95.5 |
| `roys-art-002` — Moses — Character Development | 1581 × 1284 | 294.4 | 960 × 780 | 68.2 |
| `roys-art-003` — Hooded Figures | 1756 × 2200 | 1529.6 | 766 × 960 | 125.0 |
| `roys-art-004` — Keys and Cord — Still Life | 1451 × 2014 | 313.2 | 692 × 960 | 79.1 |
| `roys-art-005` — Strongman and Sidekick | 1271 × 2200 | 515.7 | 555 × 960 | 47.5 |
| `roys-art-006` — Surreal Character Sketch | 1265 × 1898 | 448.2 | 640 × 960 | 64.0 |
| `roys-art-007` — Giraffe Beneath the Branches | 970 × 1624 | 350.1 | 573 × 960 | 108.2 |
| `roys-art-008` — Seated Figure Study | 1113 × 1760 | 292.6 | 607 × 960 | 56.9 |
| `roys-art-009` — Mushroom Characters | 2200 × 1522 | 580.8 | 960 × 664 | 84.5 |
| `roys-art-010` — Instant Noodles — Portrait | 1230 × 1611 | 251.6 | 733 × 960 | 81.8 |
| `roys-art-011` — The Crowned Figure | 1875 × 2200 | 1053.6 | 818 × 960 | 137.2 |
| `roys-art-013` — Streetwear Character Study | 1807 × 2200 | 832.4 | 789 × 960 | 97.3 |
| `roys-art-014` — Mushroom Garden | 1371 × 2184 | 558.9 | 603 × 960 | 143.4 |
| `roys-art-015` — Krimp — Fantasy Character | 2200 × 1500 | 906.6 | 960 × 655 | 120.0 |
| `roys-art-018` — Mushroom Character — Graffiti Illustration | 2200 × 1331 | 550.4 | 960 × 581 | 81.1 |
| `roys-art-021` — Green and Purple — Lettering Study | 2200 × 1106 | 426.1 | 960 × 482 | 82.4 |

Total viewer assets: 10,343,628 bytes (9.86 MiB). Total thumbnails: 1,704,508 bytes (1.63 MiB). Thumbnails are lazy-loaded; viewer assets load when selected.

## Validation

- `npm run typecheck` and `npm run build`: passed with the final WebP assets. Production output contains all 36 matching generated assets.
- All 18 thumbnails and 18 viewer images: HTTP 200 with `image/webp`; responses match the generated files and all 36 images decode successfully.
- All generated proportions match the originals within resize rounding; none are enlarged.
- Server-rendered Work category contains exactly 18 gallery cards.
- All 18 lightbox entries visited in Chrome; Next button, left/right keys, first/last wraparound, Escape close, keyboard reopening after focus restoration, and close-button activation passed.
- Desktop 1440 × 812: three-column gallery visually reviewed. Intermediate-width two-column layout also visually reviewed.
- Mobile 390 × 844: single-column gallery and portrait lightbox visually reviewed; full image, title, counter, Previous/Next controls, and close control fit. Mobile close button passed. Device emulation was disabled afterward and the local gallery was left available in Chrome.
- Motion / 3D entries match HEAD exactly; Motion assets and Work pages were not modified.
- `git diff --check`: passed.
- Development console: hydration warnings were observed in unchanged `SiteHeader` and `SiteFooter`, involving Font Awesome SVG replacements. This appears to be the existing icon-script/hydration timing issue; it was left outside this gallery change. The gallery itself remained usable throughout navigation and responsive checks.
- Browser testing used Chrome native UI and responsive emulation. No real mobile-device or cross-browser run was performed.

## Visual review notes

The faint pencil drawing (006), paper tones, uneven scan lighting, and source borders were intentionally retained for review. Narrow portrait drawings and wide lettering fit within the thumbnail frames using `object-fit: contain`; their full compositions remain visible.

## Additional graphics

The collection was subsequently expanded to 57 pieces with 39 additional graphics from `page--illustration-sketchs-more`, following Roy’s confirmation that the nested graphics are also his work. See [additional-graphics-review.md](additional-graphics-review.md) for source paths, page selections, exclusions, exact dimensions, sizes, and validation. The tables and interaction checks above describe the original 18-piece batch.
