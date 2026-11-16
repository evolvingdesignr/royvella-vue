<script setup lang="ts">
import projects from '~/data/projects.json'

const categories = [
  { id: 'ui-ux-dev', label: 'UI/UX Dev' },
  { id: 'motion-3d', label: 'Motion / 3D' },
  { id: 'drawings-sketches', label: 'Art & Design' },
] as const
const route = useRoute()
const router = useRouter()
const category = computed(() => categories.find(item => item.id === route.query.category) ?? categories[0])
const mediaId = computed(() => {
  const value = Array.isArray(route.query.media) ? route.query.media[0] : route.query.media
  return value ?? null
})
function changeCategory(value: string) {
  const query = { ...route.query }
  delete query.media
  if (value === 'ui-ux-dev') delete query.category
  else query.category = value
  return router.push({ path: '/work', query })
}
function changeMedia(id: string | null, replace = false) {
  const query = { ...route.query }
  if (id) query.media = id
  else delete query.media
  const destination = { path: '/work', query, hash: route.hash }
  return replace ? router.replace(destination) : router.push(destination)
}
definePageMeta({ scrollToTop: false })
useSeoMeta({ title: 'Selected Work | Roy Vella', description: 'Selected UI/UX, front-end, and e-commerce projects by Roy Vella.' })
</script>

<template>
  <div class="interior-page">
    <SiteHeader />
    <main id="main-content" class="work-page" tabindex="-1">
      <div class="container-fluid shell listing work-listing">
        <div class="work-intro">
          <p class="eyebrow">PORTFOLIO</p>
          <h1>Selected work<span class="muted">.</span></h1>
          <p class="lede">UI/UX, front-end, and e-commerce.</p>
        </div>
        <div class="work-filters d-flex flex-wrap" role="group" aria-label="Portfolio categories">
          <button v-for="item in categories" :key="item.id" type="button" :aria-pressed="category.id === item.id" aria-controls="work-results" @click="changeCategory(item.id)">{{ item.label }}</button>
        </div>
        <div id="work-results" role="region" :aria-label="`${category.label} collection`">
          <div v-if="category.id === 'ui-ux-dev'" class="row work-grid">
            <div v-for="project in projects" :key="project.id" class="col-12 work-project-column d-flex">
              <NuxtLink :href="`/work/${project.slug}`" class="project-card work-card d-flex flex-column">
                <div class="project-card-image"><img :src="project.cover" :alt="project.title" loading="lazy" width="800" height="600"></div>
                <div class="project-card-info d-flex justify-content-between align-items-start">
                  <div class="work-card-copy"><h2>{{ project.title }}</h2><p v-if="project.cardSubtitle">{{ project.cardSubtitle }}</p></div>
                  <span class="work-card-arrow flex-shrink-0" aria-hidden="true">↗</span>
                </div>
              </NuxtLink>
            </div>
          </div>
          <CreativeGallery v-else :key="category.id" :category="category.id" :media-id="mediaId" @media-change="changeMedia" />
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
