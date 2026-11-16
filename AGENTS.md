# Gallery curation

- `app/data/creative-gallery.json` is the only rendered creative-gallery catalog. Historical reports and temporary snapshots are not import sources.
- Respect `app/data/creative-gallery-exclusions.json`. Its five pieces were permanently removed by Roy. Never restore them or their generated assets to satisfy an older gallery count. Only an explicit reversal naming the excluded artwork can change that decision.
- Future gallery import or generation work must consult the exclusions before creating records or public assets. `npm run validate:gallery` fails on excluded records, aliases using the old assets/sources, and orphaned excluded web assets. Do not bypass that check or hide excluded artwork with runtime filtering.
- Preserve Desktop originals and approved titles. Keep the three PCS Panthers entries consecutive and the continuous order: character studies/drawings, illustrations, apparel/products, branding/graphic design/marketing, then graffiti/lettering.
- For gallery changes, run `npm run test:gallery`, `npm run validate:gallery`, `npm run typecheck`, and `npm run build`. Do not commit, push, or deploy without authorization.
