export default defineNuxtConfig({
  compatibilityDate: '2026-11-13',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/css/main.css'],
  typescript: { strict: true },
  app: {
    head: { htmlAttrs: { lang: 'en' } },
  },
})
