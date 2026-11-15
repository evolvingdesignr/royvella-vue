export default defineNuxtConfig({
  compatibilityDate: '2026-11-13',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/css/styles.css'],
  typescript: { strict: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      script: [
        {
          src: 'https://kit.fontawesome.com/3f7e6cfc2d.js',
          crossorigin: 'anonymous',
          defer: true,
        },
      ],
    },
  },
})
