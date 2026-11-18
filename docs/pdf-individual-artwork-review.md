# PDF individual artwork review

Historical local review. The released catalog and validation are documented in [v0.0.0.1 — Hello, World.](releases/v0.0.0.1.md). Older counts and approval holds below describe their original review stage.

Asset rows for the seventeen works removed in the November 18, 2026 curation have been omitted; their generated image pairs are no longer shipped. Historical batch counts below are unchanged.

Local review only. No commit, push, or deployment.

Source: `/Users/royvella/Desktop/page--illustration-sketchs-more/mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` (the requested top-level path was absent; both nested copies are identical). PDF pages 3–11 were visually inspected. Original source SHA-256: `de591d4383709122ac838f72885e4e1dfed0bc1b3ef0872d89fd7efd679de2f1`.

Roy confirmed direct collaborative contribution. The 14 contribution captions were subsequently removed at his request; no individual authorship or specific-role claims are displayed.

## Result

59 previous entries − 5 presentation boards + 13 individual designs = **67 Art & Design entries**. NTICE retains its existing ID and title, with an individual menthol-package export replacing its board. Motion / 3D, styling, component behavior, approved artwork titles, and the permanent exclusions are unchanged.

All full-size exports have a 2200px long edge; thumbnails have a 960px long edge. Cropped directly from the native PDF with CoreGraphics, sRGB WebP quality 85 / thumbnail quality 80. Original design proportions are retained. The presentation footer is outside each extraction.

## Proposed titles and assets

| PDF page | Proposed title | Full size | Thumbnail | WebP bytes (full / thumb) | Asset stem |
|---|---|---|---|---|---|
| 3 | Grove at Grand Bay — Identity Study | 2200 × 2148 | 960 × 937 | 109,028 / 36,582 | `grove-grand-bay-identity-individual` |
| 6 | BBVA Compass — Household Selection Concept | 2200 × 1893 | 960 × 826 | 95,640 / 30,416 | `bbva-household-concept-individual` |
| 6 | BBVA Compass — Deposit Selection Concept | 2200 × 1894 | 960 × 826 | 127,052 / 40,658 | `bbva-deposit-concept-individual` |
| 8 | NTICE — Packaging Study | 1019 × 2200 | 445 × 960 | 113,456 / 34,474 | `ntice-packaging-individual` |

All assets are pairs under `public/creative/drawings/`: `<stem>.webp` and `<stem>-thumb.webp`. NTICE is the existing entry; the other 13 rows are new records.

## Replaced boards

- Brand Mark Studies → four individual identities (page 3).
- Music Poster Studies → two Visit Florida posters (page 4). The prior title misidentified the designs.
- Energy — Infographic Layouts → two BBVA Compass interface concepts (page 6). The prior title misidentified the designs.
- Hockey — Promotional Layouts → two distinct Florida Panthers posters (page 7). The second grayscale ticket template was omitted as a similar alternate.
- Theme Park — Illustrated Packaging → two Fright Fest posters and one Kraft package front (page 9). The package reverse was omitted as supporting production artwork.

The five superseded board records and their ten generated assets were removed. NTICE’s former asset pair was replaced. No Desktop originals were modified or deleted.

## Retained compositions

Pages 10 and 11 remain as High-Contrast Portrait Studies and Basketball Character Studies. Artwork overlaps within these compositions; individual rectangular crops would cut into another design. Their existing titles, images, and captions are unchanged.

## Ordering and validation

- Character studies/drawings remain first; new packaging is alongside NTICE in product design; new identities are in branding; posters and UI concepts follow in marketing; the existing seven graffiti/lettering entries remain last.
- PCS Panthers remain consecutive at positions 30–32. Florida Panthers posters are distinct from PCS Panthers.
- All 16 explicitly approved title mappings are unchanged; all five permanently excluded artworks remain absent.
- All 134 full-size/thumbnail URLs returned HTTP 200 and decoded successfully; 67 unique full-image hashes. Superseded board URLs return 404.
- Server-rendered gallery order matches the JSON catalog. Existing lightbox Previous/Next derives from the same category collection, preserving that order. Interactive browser behavior was not retested in this pass.
- `npm run test:gallery` (4 tests), `npm run validate:gallery`, `npm run typecheck`, and `npm run build` passed.

## Files changed in this pass

- `app/data/creative-gallery.json`
- `public/creative/drawings/`: 28 new WebPs, 12 superseded generated WebPs removed (net +16; 134 current files).
- `docs/pdf-individual-artwork-review.md` (this report).

Other pre-existing working-tree changes were preserved.
