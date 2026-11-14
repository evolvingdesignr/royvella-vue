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

Keep everything as simple and maintainable as possible. Follow these conventions for all future development:

1. **Bootstrap 5 first:** Prefer existing Bootstrap classes for layout, grid, spacing, alignment, typography, responsive behavior, and utilities. Do not create custom CSS when Bootstrap provides an appropriate solution.
2. **Font Awesome first:** Use built-in Font Awesome CSS classes for standard UI icons, such as `fa-brands fa-linkedin`, `fa-brands fa-github`, and `fa-solid fa-envelope`. Do not create, download, or reference individual SVG files or use image elements for UI icons. Original logos, illustrations, project artwork, and custom reference icons are exempt; reuse the exact original assets when visual fidelity requires them.
3. **Global stylesheet:** Place necessary custom styling and overrides in `app/assets/css/styles.css`. Bootstrap loads first. Avoid `!important` unless an actual CSS conflict justifies it.
4. **Scoped style placeholder:** Every Vue page and component must include an empty `<style scoped>` block, even when no component-specific styling is required. Preserve it as a placeholder for future use; keep current custom styles in the master stylesheet.
5. **Minimal complexity:** Avoid unnecessary components, composables, abstractions, dependencies, JavaScript, and CSS. Do not add unnecessary JavaScript merely to populate the script section.
6. **Readable markup:** Prefer semantic HTML, straightforward Vue syntax, and Bootstrap classes. Keep code easy to understand for a developer transitioning from older Angular. Use Vue for behavior and Nuxt where useful for routing, layouts, SEO, and server functionality.
7. **Preserve existing designs:** Do not change appearance or functionality simply to enforce these conventions.

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

- Font Awesome 6.7.2 CSS and webfonts load once from cdnjs through `app.head.link` in `nuxt.config.ts`. Check the existing setup and icon availability before changes; do not add duplicate stylesheets or another Font Awesome package. Icons require access to the CDN.
- Give icon-only links an accessible `aria-label` and mark their decorative icons `aria-hidden="true"`.

This project uses Nuxt 4 with Vue 3 and TypeScript.

- `app/app.vue`: the outer application shell. `NuxtPage` displays the page matching the URL.
- `app/pages/index.vue`: the homepage at `/`. Nuxt creates routes from files in `pages/`; no manual router setup is needed. This page also sets its browser title and description.
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

Remaining work and verification limits:

- `/work`, project detail routes, `/about`, `/lab`, `/contact`, and `/changelog` are not implemented locally. Header, footer, and Lab links use those intended internal destinations; some project and About calls to action still use the live portfolio.
- The reference's Pro 7.3.1 JavaScript Kit has not been enabled in Nuxt. Nuxt currently uses one Font Awesome Free 6.7.2 CSS stylesheet. A separate Pro CSS-only Kit or licensed webfonts are needed for exact Pro icon styles; do not add SVG replacement or duplicate icon loaders.
- Dock targets match the reference, but CSS easing approximates its spring animation. The footer credit correctly identifies Vue + Nuxt; social entries without URLs remain hidden.
- Automated checks pass, but browser access was unavailable during development. Desktop/mobile visual parity and real browser interaction checks remain outstanding.

### Validation

- Nuxt 4.6.4, Vue 3.5.45, Bootstrap 5.3.9, and TypeScript 6.0.3.
- Dependency versions are pinned in `package.json` and `package-lock.json` for reproducible installation.
- `npm run typecheck` and `npm run build` pass.
- Local server checks verified the homepage and assets. Controlled-timer checks covered theme switching, ROYGBIV timing/cancellation/cleanup, and reduced motion; carousel checks covered wraparound and swipe reset behavior.
- The foundation audit reported 6 low and 4 moderate dependency findings. That historical audit has not been rerun for this milestone; dependency versions are unchanged.
