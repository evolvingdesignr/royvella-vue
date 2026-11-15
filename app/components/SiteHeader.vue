<script setup lang="ts">
const mobileMenu = ref<HTMLDetailsElement | null>(null)
function closeMenu(restoreFocus = false) {
  if (!mobileMenu.value) return
  mobileMenu.value.open = false
  if (restoreFocus) mobileMenu.value.querySelector('summary')?.focus()
}
function leaveMenu(event: FocusEvent) {
  if (!mobileMenu.value?.contains(event.relatedTarget as Node | null)) closeMenu()
}
function outsideMenu(event: PointerEvent) {
  if (!mobileMenu.value?.contains(event.target as Node)) closeMenu()
}
onMounted(() => document.addEventListener('pointerdown', outsideMenu))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outsideMenu))
</script>

<template>
  <header class="site-header d-flex align-items-center justify-content-between">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <NuxtLink href="/" class="rv-brand d-flex align-items-center" aria-label="Roy Vella home">
      <img class="rv-logo-image" src="/assets/branding/logo-rv-horizontal-black.svg" alt="" width="124" height="21">
    </NuxtLink>
    <div class="inner-header-actions align-items-center ms-auto">
      <nav class="d-flex align-items-center" aria-label="Main navigation">
        <NuxtLink href="/work">Work</NuxtLink>
        <NuxtLink href="/lab">Lab</NuxtLink>
        <a href="https://www.royvella.com/about">About</a>
      </nav>
      <a class="inner-talk-button btn btn-outline-dark rounded-pill px-4 py-2 fw-bold text-nowrap" href="https://www.royvella.com/contact">Let’s Talk →</a>
      <a href="https://www.royvella.com/about" class="mini-avatar mini-avatar-header" aria-label="About Roy">
        <img src="/assets/avatars/roy-avatar-mini.webp" alt="" width="32" height="32">
      </a>
    </div>
    <details ref="mobileMenu" class="mobile-nav inner-mobile-nav" @keydown.esc.prevent="closeMenu(true)" @focusout="leaveMenu">
      <summary aria-label="Menu"><span class="inner-menu-label">Menu</span><span class="inner-menu-icon"><i class="fa-sharp fa-light fa-bars" aria-hidden="true"></i></span></summary>
      <nav class="d-flex flex-column gap-0" aria-label="Mobile navigation" @click="closeMenu()">
        <NuxtLink href="/work">Work</NuxtLink>
        <NuxtLink href="/lab">Lab</NuxtLink>
        <a href="https://www.royvella.com/about">About</a>
        <a href="https://www.royvella.com/contact">Let’s Talk →</a>
      </nav>
    </details>
  </header>
</template>

<style scoped>
</style>
