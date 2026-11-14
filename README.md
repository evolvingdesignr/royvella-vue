# royvella-vue
Vue 3 + Nuxt version of RoyVella.com

## Local development

Use a compatible Node.js release (`nvm use` selects Node 24), then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Nuxt, normally http://localhost:3000.
The **Try Vue** button updates a counter to demonstrate Vue's reactive state.

```sh
npm run typecheck  # Check TypeScript and Vue templates
npm run build      # Build the application locally
npm run preview    # Serve the completed build locally
```

## Architecture guide

This project uses Nuxt 4 with Vue 3 and TypeScript.

- `app/app.vue`: the outer application shell. `NuxtPage` displays the page matching the URL.
- `app/pages/index.vue`: the homepage at `/`. Nuxt creates routes from files in `pages/`; no manual router setup is needed. This page also sets its browser title and description.
- `app/components/PortfolioWelcome.vue`: reusable welcome UI, including a Bootstrap button and a small reactive counter. Nuxt automatically imports components and Vue helpers such as `ref` and `computed`.
- `app/assets/css/main.css`: shared styles processed by Nuxt. Bootstrap's CSS loads first so our styles can extend it.
- `public/`: files served directly at their original paths, such as `robots.txt`. Put future static icons here.
- `nuxt.config.ts`: application settings, global stylesheet imports, and strict TypeScript checking.
- `tsconfig.json`: references Nuxt's generated TypeScript configurations for browser, server, shared, and tooling code. Run `npm install` or `npx nuxt prepare` to regenerate them; do not edit `.nuxt/`.
- `package.json`: dependency versions and development commands.
- `package-lock.json`: the exact dependency tree, allowing `npm ci` to reproduce the installation.
- `.nvmrc`: selects the Node 24 release line.
- `.gitignore`: preserves the repository's original rules and excludes generated output, dependencies, local secrets, and OS files.

Each Vue Single-File Component has three clearly separated sections:

1. `<script setup lang="ts">` contains typed logic and reactive state.
2. `<template>` describes what appears on screen and binds it to that state.
3. `<style scoped>` contains CSS limited to that component.

Bootstrap 5 CSS provides the grid, cards, spacing, and button styles. Its JavaScript is not needed by this starter's ordinary button; Vue handles the interaction.

As the application grows, add `app/layouts/` for shared page frames, `app/composables/` for reusable reactive logic, and `server/api/` for server endpoints when needed. These are intentionally not populated yet.

Nuxt generates `.nuxt/` during development and `.output/` during builds. Both remain untracked. No portfolio content has been migrated and no hosting or deployment configuration has been added.

## Verified baseline

- Nuxt 4.6.4, Vue 3.5.45, Bootstrap 5.3.9, and TypeScript 6.0.3.
- Dependency versions are pinned in `package.json` and `package-lock.json` for reproducible installation.
- `npm run typecheck` and `npm run build` pass.
- The local development server returns HTTP 200 with the required heading, subtitle, and Bootstrap button. Browser visual and interaction checks were unavailable in this session because the browser access host was unavailable.
- The dependency audit currently reports 6 low and 4 moderate findings in the Nuxt dependency tree. Its proposed automatic fix downgrades Nuxt; no forced downgrade or dependency overrides have been applied.
