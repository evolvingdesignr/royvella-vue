# royvella-vue
Vue 3 + Nuxt version of RoyVella.com

## Local development

Use a compatible Node.js release (`nvm use` selects Node 24), then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Nuxt, normally http://localhost:3000.
The homepage includes the shared header/footer, illustrated hero, Featured Work carousel, Tools & Skills dock, Lab, and About sections.

```sh
npm run typecheck  # Check TypeScript and Vue templates
npm run build      # Build the application locally
npm run preview    # Serve the completed build locally
```

## Architecture guide

### Development conventions

Build this site as an experienced UI/UX designer and traditional front-end developer would: semantic HTML first, Bootstrap 5, CSS, and straightforward JavaScript. Favor the simplest maintainable solution that accomplishes the requirement. Do not overengineer the project or default to complex AI-generated architecture.

Follow these conventions for all future development:

1. **Bootstrap 5 first:** Prefer existing Bootstrap classes for layout, grid, spacing, alignment, typography, responsive behavior, and utilities. Do not create custom CSS when Bootstrap provides an appropriate solution.
2. **Font Awesome Pro first:** Use the existing Pro configuration and prefer the Sharp family for standard UI icons whenever the configured CSS/webfonts support it, for example `fa-sharp fa-solid fa-envelope` or `fa-sharp fa-light fa-bars`. Verify the exact family, style, and icon are available before using them. Keep `fa-brands` for brand icons; Sharp does not apply to Brands. When Sharp is unavailable, retain the closest supported icon rather than adding an unsupported class. Use built-in Font Awesome CSS classes, such as `fa-brands fa-linkedin`, `fa-brands fa-github`, and `fa-solid fa-envelope`. Do not create, download, or reference individual SVG files or use image elements for UI icons. Original logos, illustrations, project artwork, and custom reference icons are exempt; reuse the exact original assets when visual fidelity requires them.
3. **Global stylesheet:** Place necessary custom styling and overrides in `app/assets/css/styles.css`. Bootstrap loads first. Avoid `!important` unless an actual CSS conflict justifies it.
4. **Scoped style placeholder:** Every Vue page and component must include an empty `<style scoped>` block, even when no component-specific styling is required. Preserve it as a placeholder for future use; keep current custom styles in the master stylesheet.
5. **Minimal complexity:** Avoid unnecessary arrays, loops, computed properties, composables, components, abstractions, dependencies, JavaScript, and CSS. Keep JavaScript and TypeScript simple enough to understand and maintain. Do not add unnecessary JavaScript merely to populate the script section.
6. **Readable markup:** Write clean, readable semantic HTML first. Prefer explicit markup for simple, fixed layouts. Use Vue directives and reactive logic only when they provide a clear benefit, and Nuxt where useful for routing, layouts, SEO, and server functionality. Keep code easy to understand for a developer transitioning from older Angular.
7. **Preserve existing designs:** Preserve the Next.js site's appearance and functionality without copying unnecessary implementation complexity. Do not refactor working code merely to make it more abstract or technically sophisticated, or change its design simply to enforce these conventions.

The project navigation in `app/pages/work/[slug].vue` demonstrates the preferred style: one Bootstrap `row` with three explicit links using `col-4 text-start`, `col-4 text-center`, and `col-4 text-end`. Previous and next titles and destinations stay dynamic, with first/last wraparound, while the fixed layout needs no navigation array or `v-for`. Use this approach when explicit markup makes a simple layout easier to read.

Standard Vue file structure:

```vue
<script setup lang="ts">
// Logic when needed
</script>

<template>
  <!-- Markup -->
</template>

<style scoped>
</style>
```

- Font Awesome Pro 7.3.1 loads once from the existing `https://kit.fontawesome.com/3f7e6cfc2d.js` Kit through `app.head.script` in `nuxt.config.ts`. Keep simple `<i class="fa-sharp fa-light fa-bars" aria-hidden="true"></i>` markup. The Kit converts icons to SVG at runtime; CSS supports the resulting SVGs where sizing and hover effects require it. Do not also load the Free stylesheet, install another icon package, or copy private tokens into the project. Icons require access to the Kit and its resources.
- Give icon-only links an accessible `aria-label` and mark their decorative icons `aria-hidden="true"`.

This project uses Nuxt 4 with Vue 3 and TypeScript.

- `app/app.vue`: the outer application shell. `NuxtPage` displays the page matching the URL.
- `app/pages/index.vue`: the homepage at `/`. Nuxt creates routes from files in `pages/`; no manual router setup is needed. This page also sets its browser title and description.
- `app/pages/work/index.vue`: URL-driven portfolio categories and the project listing.
- `app/pages/work/[slug].vue`: one dynamic detail page for all eight records in `app/data/projects.json`; unknown slugs return 404.
- `app/components/ProjectGallery.vue`: shared detail-image gallery, grouped thumbnails, and native-dialog enlargement.
- `app/pages/lab.vue`: the reference Lab introduction, Motion / 3D collection, and Drawings & Sketches empty state.
- `app/components/SiteHeader.vue`: shared interior-page header for Work and Lab; the homepage keeps its distinct hero header.
- `app/components/CreativeGallery.vue`: shared native-dialog media viewer. Work controls selection through its query string; Lab uses local selection without changing the URL.
- `app/data/`: reference project listing and creative-gallery metadata; media files live under `public/`.
- `app/components/SiteFooter.vue`: shared footer with internal navigation and social profiles filtered to entries with URLs.
- `app/components/PortfolioWelcome.vue`: retained foundation demo with a reactive counter; it is no longer rendered on the homepage.
- `app/assets/artwork/hero-avatar.svg`: original illustration used for the hero’s wink and drag expressions. Nuxt automatically imports Vue helpers such as `ref` and `computed`.
- `app/assets/css/styles.css`: master custom stylesheet processed by Nuxt. Bootstrap's CSS loads first so our styles can extend it.
- `public/`: files served directly at their original paths, such as `robots.txt`, logos, and artwork. Standard UI icons use Font Awesome classes.
- `nuxt.config.ts`: application settings, global stylesheet imports, and strict TypeScript checking.
- `tsconfig.json`: references Nuxt's generated TypeScript configurations for browser, server, shared, and tooling code. Run `npm install` or `npx nuxt prepare` to regenerate them; do not edit `.nuxt/`.
- `package.json`: dependency versions and development commands.
- `package-lock.json`: the exact dependency tree, allowing `npm ci` to reproduce the installation.
- `.nvmrc`: selects the Node 24 release line.
- `.gitignore`: preserves the repository's original rules and excludes generated output, dependencies, local secrets, and OS files.

Each Vue Single-File Component has three clearly separated sections:

1. `<script setup lang="ts">` contains typed logic and reactive state.
2. `<template>` describes what appears on screen and binds it to that state.
3. `<style scoped>` remains an empty placeholder; necessary custom CSS belongs in the master stylesheet.

Bootstrap 5 CSS provides layout utilities, spacing, badges, and button styles. Vue handles the homepage interactions; Bootstrap JavaScript is not loaded.

As the application grows, add `app/layouts/` for shared page frames, `app/composables/` for reusable reactive logic, and `server/api/` for server endpoints when needed. These are intentionally not populated yet.

Nuxt generates `.nuxt/` during development and `.output/` during builds. Both remain untracked. The homepage content and artwork have been migrated from the read-only Next.js reference. No hosting or deployment configuration has been added.

## Development milestone 1: Homepage

The homepage now follows the existing RoyVella.com design and content. It includes carousel arrows, indicators and swipes; the product-artwork dock with neighboring magnification; mood selection and the seven-family ROYGBIV shuffle; avatar switching, wink and drag; and reduced-motion-aware section entrances. User preferences are stored locally in the browser.

## Development milestone 2: Work, Lab & Font Awesome Pro

Work and Lab now reuse the interior header, footer, gallery, and native-dialog viewer. The Work page includes eight real project cards and three categories. Lab matches the reference introduction and reuses the ten Motion / 3D entries. Drawings & Sketches intentionally displays the reference's empty state; no placeholder artwork has been invented.

The viewer supports previous/next wraparound, Escape/backdrop close, focus restoration, playback cleanup, and native-size media fitting. Work preserves category/media query navigation and browser history behavior; Lab selection stays local. Font Awesome Pro 7.3.1 is loaded through the existing JavaScript Kit, with exact Sharp classes and no duplicate Free stylesheet or added packages.

## Project detail pages

All eight published projects use one dynamic Nuxt detail page with the original copy and artwork. It preserves grouped storefront thumbnails and links, image enlargement, Bookt highlights, Kigo’s Adobe XD prototype, circular previous/next navigation, and Rimmer’s noindex metadata. Detail styling stays in the global stylesheet; the Work filters and query behavior are unchanged.

Remaining work and verification limits:

- `/about`, `/contact`, and `/changelog` are not implemented locally. The interior header uses the live portfolio where needed. Work cards and homepage featured projects now use local detail routes. Some homepage/footer links still target those unfinished local routes. The homepage Lab links, interior navigation, and Lab “View in Work” links now use the implemented local pages.
- The reference’s Pro 7.3.1 JavaScript Kit is now configured in Nuxt, replacing the Free 6.7.2 stylesheet. Sharp classes match the reference. Browser checks for rendered icons, Vue hydration, reactive updates, and client-side navigation remain required; no custom lifecycle integration has been added without an observed conflict.
- The shared interior header still lacks the reference’s mobile mood selector. Local Nitro serves full MP4 files rather than byte ranges; real-browser video seeking remains unverified.
- Dock targets match the reference, but CSS easing approximates its spring animation. The footer credit correctly identifies Vue + Nuxt; social entries without URLs remain hidden.
- Automated checks pass, but browser access was unavailable during development. Desktop/mobile visual parity and real browser interaction checks remain outstanding.

### Validation

- Nuxt 4.6.4, Vue 3.5.45, Bootstrap 5.3.9, and TypeScript 6.0.3.
- Dependency versions are pinned in `package.json` and `package-lock.json` for reproducible installation.
- `npm run typecheck` and `npm run build` pass.
- Local server checks verified `/`, `/work`, `/lab`, filtered/deep-link responses, shared chrome, one Pro Kit per page, and all referenced assets. Controlled behavior checks covered both gallery selection modes, query/history updates, wraparound, native sizing, playback/focus/scroll cleanup, ROYGBIV lifecycle, and carousel swipes. Browser console, hydration, runtime Pro rendering, and responsive visual checks remain unverified because browser access is unavailable.
- The foundation audit reported 6 low and 4 moderate dependency findings. That historical audit has not been rerun for this milestone; dependency versions are unchanged.
