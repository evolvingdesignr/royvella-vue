# Additional graphics — local review

Historical local review. The released catalog and validation are documented in [v0.0.0.1 — Hello, World.](releases/v0.0.0.1.md). Older counts and approval holds below describe their original review stage.

Current curation is governed by [gallery-correction-review.md](gallery-correction-review.md) and `app/data/creative-gallery-exclusions.json`. Five artwork entries are permanently excluded. Do not restore records or assets from the historical tables below to meet an old count.

Latest curation: Roy requested removal of ten pieces. The current gallery contains **49 pieces and 98 WebP assets**. Earlier counts and asset tables below record previous implementation batches. Original source files remain untouched.

Current update: the gallery now contains 59 pieces. All 12 PSDs were converted natively through Photoshop; ten matching JPEG-derived sources were replaced and two pieces were added. See [psd-gallery-review.md](psd-gallery-review.md). The source decisions and asset tables below document the earlier batch.

Source folder: `/Users/royvella/Desktop/page--illustration-sketchs-more`.

The source contains 42 non-hidden files in four folders (root plus three nested folders), with 35 unique SHA-256 hashes and seven exact duplicate copies. The top-level `VFcharacters.ai` also matches the file in the first high-resolution artwork directory, but had not previously appeared in the gallery.

Roy explicitly confirmed that the nested graphics are also his work and approved including them after the Michael Jan Gagne attribution in the source portfolio was flagged. Original artwork credits embedded in presentation pages were retained.

Added 39 gallery entries: the VF family-character sheet and 38 selected nested graphics. The Drawings & Sketches collection now contains 57 entries with 114 generated WebP assets. Existing 18 entries, Motion / 3D data, and Work project pages remain unchanged.

Review at http://localhost:3000/work?category=drawings-sketches .

## Export choices

- Final derivatives use the same maximum long edges and WebP settings as the first batch: viewer 2200 px / quality 85; thumbnail 960 px / quality 80; effort 6; sRGB; no enlargement of raster sources.
- Selected PDF pages were rendered from vector page content at the target resolution using native CoreGraphics. Complete presentation pages, proportions, and embedded credits were preserved.
- The VF Illustrator file has artwork extending outside its PDF media box. Its art box was rendered with a small white safety margin so the baby and alternate character drawings are fully visible.
- Multi-page presentations contribute selected artwork pages, not every slide. Blank, cover, resume, contact, strategy, research, and planning pages were excluded.
- FriendZ final presentation variants were preferred where concepts overlap; ImageLab version 02 was chosen over the closely related version 01. Distinct apparel colors and illustrations remain separate entries.
- Personal photos, installation/documentation photos, the personal social-media screenshot, and contact-information image were excluded.
- EPS preview attempts through native image loading and Quick Look did not yield usable artwork. `JP.eps` and `JP2.eps` were not added; their appearance/relationship is unverified. `SuperSaleXLIV.eps` was not exported separately; the Super Sale design is represented using the PDF presentation’s mascot version. No original EPS was modified.

New assets total 5,840,160 bytes (5.57 MiB). The complete gallery assets total 17,888,296 bytes (17.06 MiB).

## New entries and assets

Files are under `public/creative/drawings/`. Each stem has `<stem>.webp` and `<stem>-thumb.webp`. Dimensions are pixels; sizes are KiB.

| Stem / temporary title | Viewer dimensions / KiB | Thumbnail dimensions / KiB | Original source / page |
|---|---|---|---|
| `vf-family-characters` — Family Characters — Vector Development | 2200 × 1095 / 151.2 | 960 × 478 / 45.4 | `VFcharacters.ai` |
| `muppet-character` — Blue-Shirt Cartoon Portrait | 965 × 1115 / 39.7 | 831 × 960 / 28.3 | `mg stuff/Mike Gagne Stuff/gag_muppet.jpg` |
| `stencil-portrait` — Two-Tone Portrait Study | 418 × 604 / 12.2 | 418 × 604 / 10.4 | `mg stuff/Mike Gagne Stuff/mike.jpg` |
| `nope-poster` — NOPE — Poster Portrait | 1424 × 2200 / 94.0 | 621 × 960 / 31.3 | `mg stuff/meBama.pdf` / page 1 |
| `contrast-portraits` — High-Contrast Portrait Studies | 2200 × 1424 / 68.7 | 960 × 621 / 25.3 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 10 |
| `basketball-characters` — Basketball Character Studies | 2200 × 1424 / 69.4 | 960 × 621 / 23.9 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 11 |
| `sky-apparel` — SKY — Apparel Concept | 2200 × 1208 / 44.3 | 960 × 527 / 15.0 | `mg stuff/Layer 1.png` |
| `portrait-shirt-black` — Portrait Apparel — Black | 2200 × 1424 / 30.7 | 960 × 621 / 9.7 | `mg stuff/Mike Gagne Stuff/BlackPre.pdf` / page 1 |
| `portrait-shirt-blue` — Portrait Apparel — Blue | 2200 × 1424 / 87.7 | 960 × 621 / 26.7 | `mg stuff/Mike Gagne Stuff/BluePre.pdf` / page 1 |
| `portrait-shirt-brown` — Portrait Apparel — Sand | 2200 × 1424 / 63.1 | 960 × 621 / 19.1 | `mg stuff/Mike Gagne Stuff/BrownPre.pdf` / page 1 |
| `portrait-shirt-white-study` — Portrait Apparel — Line Study | 612 × 792 / 27.7 | 612 × 792 / 23.8 | `mg stuff/Mike Gagne Stuff/FwayTee01.jpg` |
| `portrait-shirt-green` — Portrait Apparel — Green | 2200 × 1424 / 66.3 | 960 × 621 / 20.0 | `mg stuff/Mike Gagne Stuff/GreenPre.pdf` / page 1 |
| `portrait-shirt-pink` — Portrait Apparel — Pink | 2200 × 1424 / 65.4 | 960 × 621 / 19.6 | `mg stuff/Mike Gagne Stuff/PinkPre.pdf` / page 1 |
| `portrait-shirt-red` — Portrait Apparel — Red | 2200 × 1424 / 71.2 | 960 × 621 / 21.3 | `mg stuff/Mike Gagne Stuff/RedPre.pdf` / page 1 |
| `portrait-shirt-cap` — Portrait Apparel — Cap Character | 2200 × 1424 / 74.1 | 960 × 621 / 23.6 | `mg stuff/Mike Gagne Stuff/WhitePre.pdf` / page 1 |
| `zimmerman-shirt` — Zimmerman — Illustrated Apparel | 2200 × 1424 / 50.0 | 960 × 621 / 16.3 | `mg stuff/Mike Gagne Stuff/shirtLayout.ai` / page 1 |
| `panther-mark-studies` — PCS Panthers — Mark Studies | 915 × 550 / 34.2 | 915 × 550 / 29.9 | `mg stuff/Mike Gagne Stuff/pinecrest/Picture 4.png` |
| `panther-head` — Panther Head — Mascot Mark | 809 × 629 / 15.3 | 809 × 629 / 13.6 | `mg stuff/Mike Gagne Stuff/pinecrest/Picture 6.png` |
| `panthers-uniform` — PCS Panthers — Basketball Uniform | 757 × 846 / 27.6 | 757 × 846 / 24.2 | `mg stuff/Mike Gagne Stuff/pinecrest/Picture 5.png` |
| `friendz-script` — FriendZ — Script Logo Study | 1700 × 2200 / 128.0 | 742 × 960 / 43.9 | `mg stuff/FRIC-0788_FriendZcupDesign07.pdf` / page 1 |
| `friendz-splash` — FriendZ — Splash Logo Study | 1700 × 2200 / 229.9 | 742 × 960 / 67.1 | `mg stuff/FRIC-0788_FriendZcupDesign07.pdf` / page 2 |
| `friendz-cup` — FriendZ — Cup Logo Study | 1700 × 2200 / 95.0 | 742 × 960 / 32.2 | `mg stuff/FRIC-0788_FriendZcupDesign07.pdf` / page 3 |
| `friendz-lettering` — FriendZ — Bold Lettering Study | 1700 × 2200 / 140.9 | 742 × 960 / 46.4 | `mg stuff/FRIC-0788_FriendZcupDesign06.pdf` / page 3 |
| `papa-character-marks` — Papa’s in the House — Character Marks | 776 × 2200 / 106.0 | 339 × 960 / 32.3 | `mg stuff/PITH_Present copy.pdf` / page 2 |
| `imagelab-identity` — ImageLab — Identity Study | 2200 × 1700 / 52.9 | 960 × 742 / 18.7 | `mg stuff/Mike Gagne Stuff/IL_moc02.pdf` / page 1 |
| `super-sale-mascot` — Super Sale XLIV — Mascot Graphic | 1700 × 2200 / 138.8 | 742 × 960 / 43.2 | `mg stuff/Mike Gagne Stuff/SuperSaleXLIVlogo.pdf` / page 2 |
| `white-castle-marks` — White Castle — Mark Studies | 612 × 792 / 38.6 | 612 × 792 / 33.1 | `mg stuff/Mike Gagne Stuff/white_castle.jpg` |
| `brand-mark-board` — Brand Mark Studies | 2200 × 1424 / 125.8 | 960 × 621 / 36.4 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 3 |
| `music-posters` — Music Poster Studies | 2200 × 1424 / 308.8 | 960 × 621 / 71.1 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 4 |
| `burger-campaign` — Burger Campaign — Layout Studies | 2200 × 1424 / 251.4 | 960 × 621 / 67.0 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 5 |
| `energy-infographics` — Energy — Infographic Layouts | 2200 × 1424 / 157.2 | 960 × 621 / 45.4 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 6 |
| `hockey-promotion` — Hockey — Promotional Layouts | 2200 × 1424 / 239.2 | 960 × 621 / 75.8 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 7 |
| `ntice-packaging` — NTICE — Packaging Study | 2200 × 1424 / 131.2 | 960 × 621 / 37.7 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 8 |
| `theme-park-packaging` — Theme Park — Illustrated Packaging | 2200 × 1424 / 304.5 | 960 × 621 / 81.7 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` / page 9 |
| `aruba-wordmark` — Aruba — Wordmark Study | 2200 × 1700 / 28.4 | 960 × 742 / 9.7 | `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` / page 22 |
| `aruba-print-collage` — Aruba — Print Collage | 2200 × 1700 / 146.9 | 960 × 742 / 38.6 | `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` / page 40 |
| `aruba-web-concept` — Aruba — Website Concept | 2200 × 1700 / 314.0 | 960 × 742 / 84.3 | `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` / page 52 |
| `aruba-brand-applications` — Aruba — Brand Applications | 2200 × 1700 / 249.8 | 960 × 742 / 56.5 | `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` / page 74 |
| `aruba-apparel` — Aruba — Apparel Concepts | 2200 × 1700 / 55.6 | 960 × 742 / 19.2 | `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` / page 76 |

## Source inventory and duplicate copies

| Source path relative to folder | Bytes | Duplicate of |
|---|---:|---|
| `VFcharacters.ai` | 296,255 | — |
| `mg stuff/FRIC-0788_FriendZcupDesign06.pdf` | 3,328,088 | — |
| `mg stuff/FRIC-0788_FriendZcupDesign07.pdf` | 1,689,985 | — |
| `mg stuff/Layer 1.png` | 398,431 | — |
| `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` | 12,823,791 | — |
| `mg stuff/PITH_Present copy.pdf` | 3,660,619 | — |
| `mg stuff/SuperSaleXLIV.eps` | 2,700,693 | — |
| `mg stuff/meBama.pdf` | 890,461 | — |
| `mg stuff/photo.jpg` | 145,361 | — |
| `mg stuff/Mike Gagne Stuff/15941448_10155218470469026_7583020196352619570_n.jpg` | 73,738 | — |
| `mg stuff/Mike Gagne Stuff/1964796_10151907897682407_2055016459_n.jpg` | 43,525 | — |
| `mg stuff/Mike Gagne Stuff/Aruba presentation-LateniteFinal.pdf` | 61,456,549 | — |
| `mg stuff/Mike Gagne Stuff/BlackPre.pdf` | 457,263 | — |
| `mg stuff/Mike Gagne Stuff/BluePre.pdf` | 373,179 | — |
| `mg stuff/Mike Gagne Stuff/BrownPre.pdf` | 351,567 | — |
| `mg stuff/Mike Gagne Stuff/FRIC-0788_FriendZcupDesign06.pdf` | 3,328,088 | `mg stuff/FRIC-0788_FriendZcupDesign06.pdf` |
| `mg stuff/Mike Gagne Stuff/FRIC-0788_FriendZcupDesign07.pdf` | 1,689,985 | `mg stuff/FRIC-0788_FriendZcupDesign07.pdf` |
| `mg stuff/Mike Gagne Stuff/FwayTee01.jpg` | 42,506 | — |
| `mg stuff/Mike Gagne Stuff/GreenPre.pdf` | 384,997 | — |
| `mg stuff/Mike Gagne Stuff/IL_moc01.pdf` | 833,136 | — |
| `mg stuff/Mike Gagne Stuff/IL_moc02.pdf` | 1,342,250 | — |
| `mg stuff/Mike Gagne Stuff/JP.eps` | 419,905 | — |
| `mg stuff/Mike Gagne Stuff/JP2.eps` | 1,386,172 | — |
| `mg stuff/Mike Gagne Stuff/MichaelJanGagne_BOOKMOBILE.pdf` | 12,823,791 | `mg stuff/MichaelJanGagne_BOOKMOBILE.pdf` |
| `mg stuff/Mike Gagne Stuff/PITH_Present.pdf` | 3,660,619 | `mg stuff/PITH_Present copy.pdf` |
| `mg stuff/Mike Gagne Stuff/PinkPre.pdf` | 357,544 | — |
| `mg stuff/Mike Gagne Stuff/RedPre.pdf` | 334,082 | — |
| `mg stuff/Mike Gagne Stuff/Screen Shot 2017-10-23 at 10.52.43 AM.png` | 504,239 | — |
| `mg stuff/Mike Gagne Stuff/SuperSaleXLIV.eps` | 2,700,693 | `mg stuff/SuperSaleXLIV.eps` |
| `mg stuff/Mike Gagne Stuff/SuperSaleXLIVlogo.pdf` | 4,601,152 | — |
| `mg stuff/Mike Gagne Stuff/WhitePre.pdf` | 363,874 | — |
| `mg stuff/Mike Gagne Stuff/gag_muppet.jpg` | 60,843 | — |
| `mg stuff/Mike Gagne Stuff/meBama.pdf` | 890,461 | `mg stuff/meBama.pdf` |
| `mg stuff/Mike Gagne Stuff/mike.jpg` | 25,886 | — |
| `mg stuff/Mike Gagne Stuff/mikes_mom_contact_info.jpg` | 100,186 | — |
| `mg stuff/Mike Gagne Stuff/obama gag.jpg` | 37,480 | — |
| `mg stuff/Mike Gagne Stuff/photo.jpg` | 145,361 | `mg stuff/photo.jpg` |
| `mg stuff/Mike Gagne Stuff/shirtLayout.ai` | 503,341 | — |
| `mg stuff/Mike Gagne Stuff/white_castle.jpg` | 65,506 | — |
| `mg stuff/Mike Gagne Stuff/pinecrest/Picture 4.png` | 48,191 | — |
| `mg stuff/Mike Gagne Stuff/pinecrest/Picture 5.png` | 65,214 | — |
| `mg stuff/Mike Gagne Stuff/pinecrest/Picture 6.png` | 34,172 | — |

## Validation

- All 39 new compositions were visually reviewed from the final exports; white margins and source proportions remain intact.
- All 114 thumbnail/viewer URLs return HTTP 200, match their generated files, and decode successfully. The server-rendered category contains exactly 57 cards.
- SHA-256 checks confirm all 42 files in the new source folder and all 38 files in the original high-resolution source folder are unchanged.
- `npm run typecheck` and `npm run build`: passed. Production output contains all 114 matching generated assets.
- Motion / 3D entries match HEAD exactly; existing Work pages, project data, and Motion assets have no diff.
- `git diff --check`: passed.
- Browser interaction/responsive testing of the original gallery component was completed for the first 18 entries, as documented in `docs/drawings-gallery-review.md`. No additional Chrome UI automation was performed for this expansion because Roy is using Chrome. All expanded source paths and image decoding are checked independently.
- No commits, pushes, deployments, original-file modifications, or project dependency changes.

## Author-footer removal

At Roy’s request, the Michael Jan Gagne name and subordinate footer labels were excluded from new source-page renderings for Brand Mark Studies, Music Poster Studies, Energy — Infographic Layouts, NTICE — Packaging Study, and Theme Park — Illustrated Packaging. All five full-size images and thumbnails now use `-no-credit` WebP filenames to avoid stale cached assets. The previous ten generated derivatives were removed; originals remain untouched.

The source-page rendering changes are confined to pixels (1650, 1229)–(2071, 1298) on the 2200 × 1424 rendered pages; all artwork pixels outside that footer region match the prior source renderings exactly. Final exports were visually compared. Gallery count remains 49; dimensions, titles, alt text, order, and other entries are unchanged.

TypeScript checking and production build passed. All 98 local image URLs load and decode, the cleaned footer areas are blank, and all 80 source files retain their audit checksums. All 98 production-output assets match their generated files.
