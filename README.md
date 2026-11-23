# RoyVella.com · Vue / Nuxt

A Vue 3 / Nuxt 4 implementation of [RoyVella.com](https://www.royvella.com), built to demonstrate hands-on front-end development alongside UI/UX design.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Bootstrap 5
- Font Awesome Pro
- Netlify

## About the Project

This version of my portfolio focuses on clean, readable front-end code, responsive design, accessibility, and straightforward component architecture.

The project was built as a second implementation of my portfolio to strengthen my hands-on experience with Vue and Nuxt while applying the same UI/UX and front-end principles I use in production work.

## Development Approach

- Prefer semantic HTML and Bootstrap 5 utilities before custom CSS.
- Keep components simple, readable, and easy to maintain.
- Use Vue and TypeScript only where they add meaningful behavior.
- Maintain responsive layouts and accessibility throughout the interface.
- Use reusable components without over-abstracting fixed layouts.
- Keep custom styling centralized in the main stylesheet where practical.

## Project Structure

- `app/pages/` — Main site pages and project detail routes
- `app/components/` — Shared navigation, galleries, footer, and interactive elements
- `app/data/` — Portfolio and gallery content
- `app/assets/css/styles.css` — Main custom stylesheet
- `public/` — Images, video, logos, and static assets

## Run Locally

```sh
nvm use
npm ci
npm run dev
