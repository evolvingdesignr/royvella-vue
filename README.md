# RoyVella.com · Vue / Nuxt

The official [RoyVella.com](https://www.royvella.com) portfolio, built with **Nuxt 4, Vue 3, TypeScript, Bootstrap 5, and Font Awesome Pro**.

**Release:** v0.0.0.1 · *Hello, World.*

The separate [React / Next.js experiment](https://royvella-next.netlify.app) lives in `evolvingdesignr/royvella-next`.

## Run locally

Use the Node.js version from `.nvmrc`:

```sh
nvm use
npm ci
npm run dev
```

Nuxt usually serves the site at http://localhost:3000.

## Check before publishing

```sh
npm test
npm run validate:gallery
npm run typecheck
npm run build
```

## Project structure

- `app/pages/` — Home, Work, project details, Lab, About, Contact, and Changelog
- `app/components/` — Shared navigation, footer, galleries, and interactive elements
- `app/data/projects.json` — Portfolio projects
- `app/data/creative-gallery.json` — Art & Design and Motion / 3D catalog
- `app/data/creative-gallery-exclusions.json` — Artwork that must remain excluded
- `app/assets/css/styles.css` — Main custom stylesheet
- `public/` — Published images, video, logos, and other static assets
- `tests/` and `scripts/` — Gallery checks

## Development approach

Keep the code easy to read and maintain:

- Prefer semantic HTML and Bootstrap 5 utilities before writing custom CSS.
- Use Font Awesome class-based icons, with the existing Pro Kit and Sharp styles where available.
- Keep custom styling in `app/assets/css/styles.css`; avoid unnecessary overrides.
- Prefer straightforward Vue and TypeScript over abstractions that add little value.
- Preserve accessibility, responsive behavior, existing artwork attribution, and approved visual design.
- Keep an empty `<style scoped>` block in Vue components as a placeholder for future local styles.

Gallery ordering and exclusion rules are documented in [AGENTS.md](AGENTS.md). Release background is in [docs/releases/v0.0.0.1.md](docs/releases/v0.0.0.1.md); older review documents are retained as history.

## Contact form

The Contact page uses Netlify Forms with a static form definition and accessible submission feedback. After publishing, Netlify **form detection**, verified test submissions, and notifications to roy@royvella.com must be configured and checked in the dashboard. See [Contact verification](docs/contact-netlify.md). This release does not promise an automatic visitor reply.

## Hosting

The `main` branch is connected to Netlify. The official site is [www.royvella.com](https://www.royvella.com); the Vue-specific address is [royvella-vue.netlify.app](https://royvella-vue.netlify.app).

## Author

[Roy Vella](https://www.royvella.com)
