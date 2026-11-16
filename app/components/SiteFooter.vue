<script setup lang="ts">
const year = new Date().getFullYear()
const currentRelease = 'v0.0.0.1'
const socials: { name: string; icon: string; href?: string }[] = [
  { name: 'GitHub', icon: 'fa-brands fa-github' },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/roy-vella' },
  { name: 'Behance', icon: 'fa-brands fa-behance' },
]
const activeSocials = socials.filter(social => social.href?.trim())
</script>

<template>
  <footer id="contact" class="home-footer">
    <div class="site-container mx-auto footer-top d-flex flex-wrap align-items-center justify-content-between gap-4">
      <div class="footer-logo-group d-flex align-items-center">
        <NuxtLink href="/about" class="mini-avatar d-inline-flex rounded-circle overflow-hidden" aria-label="About Roy">
          <img class="d-block w-100 h-100 object-fit-cover" src="/assets/avatars/roy-avatar-mini.webp" alt="" width="40" height="40">
        </NuxtLink>
        <NuxtLink href="/" class="rv-brand d-flex align-items-center text-nowrap" aria-label="Roy Vella home">
          <img class="rv-logo-image d-block" src="/assets/branding/logo-rv-horizontal-white.svg" alt="" width="124" height="21">
        </NuxtLink>
      </div>
      <nav class="d-flex flex-wrap gap-4 small" aria-label="Footer navigation">
        <NuxtLink href="/work">Work</NuxtLink>
        <NuxtLink href="/about">About</NuxtLink>
        <NuxtLink href="/lab">Lab</NuxtLink>
        <NuxtLink href="/contact">Contact</NuxtLink>
        <NuxtLink href="/changelog" class="footer-changelog-link">
          Changelog · <span class="footer-changelog-version">{{ currentRelease }}</span>
        </NuxtLink>
      </nav>
      <div class="footer-socials d-flex" role="group" aria-label="Social profiles">
        <a v-for="social in activeSocials" class="d-block" :key="social.name" :href="social.href" :aria-label="social.name">
          <i :class="social.icon" class="footer-social-icon d-block text-center" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div class="site-container mx-auto footer-bottom">
      <p class="footer-branding-headline fw-semibold">Built on Country Roads.</p>
      <div class="footer-bottom-meta d-flex flex-wrap align-items-baseline justify-content-between gap-2">
        <span>© {{ year }} Roy Vella</span>
        <p class="footer-branding-detail m-0">Made in West Virginia <span class="footer-branding-heart d-inline-block">♥</span> Custom-built with Vue + Nuxt.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
