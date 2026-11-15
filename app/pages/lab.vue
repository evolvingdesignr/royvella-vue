<script setup lang="ts">
useSeoMeta({
  title: 'Lab — Coming Soon | Roy Vella',
  description: "A space for interactive projects, creative experiments, and things I'm building just because I can.",
})
</script>

<template>
  <div class="interior-page">
    <SiteHeader />
    <main id="main-content" class="container-fluid shell placeholder lab-page" aria-labelledby="lab-title">
      <div class="col-lg-9">
        <p class="eyebrow">STILL IN THE WORKS</p>
        <h1 id="lab-title">Ideas. Prototypes. Experiments.</h1>
        <p class="lede mt-4">I've got more than 20 years of sketches, experiments, half-finished ideas, and folders with names that made sense at the time. I'm digging through the good stuff and making room for what comes next.</p>
        <p class="lede mt-3">Coming soon. Assuming I remember which folder I put it in.</p>
      </div>
      <div class="lab-creative-collections d-grid">
        <section aria-labelledby="lab-motion-title">
          <div class="creative-section-heading d-flex align-items-baseline justify-content-between flex-wrap">
            <h2 id="lab-motion-title">Motion / 3D</h2>
            <NuxtLink href="/work?category=motion-3d">View in Work ↗</NuxtLink>
          </div>
          <CreativeGallery category="motion-3d" :show-empty-title="false" />
        </section>
        <section aria-labelledby="lab-drawings-title">
          <div class="creative-section-heading d-flex align-items-baseline justify-content-between flex-wrap">
            <h2 id="lab-drawings-title">Drawings &amp; Sketches</h2>
            <NuxtLink href="/work?category=drawings-sketches">View in Work ↗</NuxtLink>
          </div>
          <CreativeGallery category="drawings-sketches" :show-empty-title="false" />
        </section>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
