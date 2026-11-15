<script setup lang="ts">
import entries from '~/data/projects.json'
import iconEntries from '~/data/project-tool-icons.json'
import type { Project, ProjectSection } from '~/types/project'

definePageMeta({ key: route => route.path })
const route = useRoute()
const records: Project[] = entries
const found = records.find(item => item.slug === route.params.slug && item.status === 'published')
if (!found) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
const project = found
const paragraphs = Array.isArray(project.summary) ? project.summary : [project.summary]
const sections = (project.sections ?? [
  { id: 'gallery', type: 'gallery' },
  ...(project.prototype ? [{ id: 'prototype', type: 'prototype', prototype: project.prototype }] : []),
] as ProjectSection[]).map(section => ({
  ...section,
  images: section.imageSources ? section.imageSources.map(src => project.gallery.find(item => item.src === src)!).filter(Boolean) : project.gallery,
}))
const legacyGallery = !project.sections && !project.prototype
const listed = records.filter(item => item.listed !== false)
const position = listed.findIndex(item => item.id === project.id)
const previous = listed[(position - 1 + listed.length) % listed.length]!
const next = listed[(position + 1) % listed.length]!
type ToolMapping = { aliases: string[]; classes?: string; src?: string; viewBox?: string; paths?: string[]; fillRule?: string; attribution?: string }
const toolMappings: ToolMapping[] = iconEntries
const tools = project.tools.map(label => ({ label, definition: toolMappings.find(item => item.aliases.includes(label.trim().toLowerCase().replace(/\s+/g, ' '))) }))
const highlightIcons: Record<string, string> = {
  'Branding & Marketing': 'fa-palette',
  'Application UI/UX': 'fa-desktop',
  'Websites & Templates': 'fa-laptop-mobile',
  'Platform Evolution': 'fa-code',
}
function emphasis(text: string) {
  const phrases = project.id === 'bookt-instamanager'
    ? ['one connected platform', 'creative identity and digital experiences from the ground up', 'acquired by RealPage']
    : project.summaryEmphasis ?? []
  if (!phrases.length) return [{ text, strong: false }]
  const pattern = phrases.map(phrase => [...phrase].map(char => '\\^$.*+?()[]{}|'.includes(char) ? '\\' + char : char).join('')).join('|')
  return text.split(new RegExp(`(${pattern})`, 'g')).map((text, i) => ({ text, strong: i % 2 === 1 }))
}
function prototypeLabel(section: ProjectSection) {
  const item = section.prototype!
  return `${item.buttonLabel ?? 'Launch Prototype'}: ${item.title}${item.platform ? ` on ${item.platform}` : ''} (opens in a new tab)`
}
useSeoMeta({
  title: `${project.title} | Roy Vella`,
  description: paragraphs.join(' ').trim(),
  robots: project.noIndex ? 'noindex, follow, noimageindex' : undefined,
})
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
})
</script>

<template>
  <div class="interior-page project-detail-layout">
    <SiteHeader />
    <main id="main-content" class="project-detail-page d-flex flex-column" tabindex="-1">
      <div class="container-fluid shell detail">
        <div class="product-layout">
          <ProjectGallery v-if="legacyGallery" :items="project.gallery" />
          <div v-else class="project-visuals project-sections">
            <template v-for="section in sections" :key="section.id">
              <section v-if="section.type === 'prototype' && section.prototype" class="project-prototype" :aria-label="section.prototype.title">
                <a v-if="section.prototype.preview" class="prototype-preview" :href="section.prototype.href" target="_blank" rel="noopener noreferrer" :aria-label="prototypeLabel(section)">
                  <img :src="section.prototype.preview.src" :alt="section.prototype.preview.alt">
                </a>
                <div class="prototype-copy">
                  <p v-if="section.prototype.eyebrow" class="prototype-eyebrow">{{ section.prototype.eyebrow }}</p>
                  <h4 class="prototype-title fw-bold">{{ section.prototype.title }}</h4>
                  <p v-if="section.prototype.description" class="prototype-description">{{ section.prototype.description }}</p>
                  <a class="prototype-cta" :href="section.prototype.href" target="_blank" rel="noopener noreferrer" :aria-label="prototypeLabel(section)">{{ section.prototype.buttonLabel ?? 'Launch Prototype' }} <span aria-hidden="true">↗</span></a>
                </div>
              </section>
              <section v-else-if="section.type === 'text'" class="project-content-text" :aria-labelledby="`project-section-${section.id}`">
                <h2 :id="`project-section-${section.id}`">{{ section.title }}</h2>
                <p v-for="(paragraph, i) in section.paragraphs" :key="i">{{ paragraph }}</p>
              </section>
              <section v-else-if="section.title" class="project-content-gallery" :aria-labelledby="`project-section-${section.id}`">
                <h2 :id="`project-section-${section.id}`">{{ section.title }}</h2><ProjectGallery :items="section.images" />
              </section>
              <ProjectGallery v-else :items="section.images" />
            </template>
          </div>
          <aside class="details">
            <header class="project-header">
              <h1>{{ project.title }}</h1>
              <p class="project-company d-flex align-items-baseline flex-wrap"><span>COMPANY</span> {{ project.company }}</p>
            </header>
            <div class="project-summary">
              <h2 v-if="project.id === 'bookt-instamanager'" class="bookt-intro-heading">FROM STARTUP TO ACQUISITION</h2>
              <p v-for="(paragraph, i) in paragraphs" :key="i" class="summary"><template v-for="(part, j) in emphasis(paragraph)" :key="j"><strong v-if="part.strong" :class="{ 'inline-emphasis': project.id !== 'bookt-instamanager' }">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></p>
            </div>
            <section v-if="project.problemsSolved?.length" class="problems-solved" aria-labelledby="problems-solved-heading">
              <h2 id="problems-solved-heading">Problems Solved</h2><ul><li v-for="(problem, i) in project.problemsSolved" :key="i">{{ problem }}</li></ul>
            </section>
            <section class="detail-section disciplines" aria-labelledby="disciplines-heading">
              <h2 id="disciplines-heading">DISCIPLINES</h2><p>{{ project.disciplines.join(' · ') }}</p>
            </section>
            <section class="detail-section detail-tools" aria-labelledby="tools-heading">
              <h2 id="tools-heading">TOOLS &amp; TECHNOLOGIES</h2>
              <ul class="tool-list d-flex flex-wrap list-unstyled m-0" aria-label="Tools and technologies">
                <li v-for="tool in tools" :key="tool.label" class="tool-item d-inline-flex align-items-center gap-2">
                  <img v-if="tool.definition?.src" class="tool-icon" :src="tool.definition.src" width="16" height="16" alt="" aria-hidden="true">
                  <i v-else-if="tool.definition?.classes" class="tool-icon" :class="tool.definition.classes" aria-hidden="true"></i>
                  <svg v-else-if="tool.definition?.viewBox" class="tool-icon" :viewBox="tool.definition.viewBox" aria-hidden="true" focusable="false" fill="currentColor">
                    <metadata>{{ tool.definition.attribution }}</metadata><path v-for="(path, i) in tool.definition.paths" :key="i" :d="path" :fill-rule="tool.definition.fillRule === 'evenodd' ? 'evenodd' : undefined" />
                  </svg>
                  <span>{{ tool.label }}</span>
                </li>
              </ul>
            </section>
            <section v-if="project.id === 'bookt-instamanager' && project.modules?.length" class="detail-section bookt-highlights" aria-labelledby="bookt-highlights-heading">
              <h2 id="bookt-highlights-heading">Key Highlights</h2>
              <div class="d-grid gap-3"><div v-for="module in project.modules" :key="module.title" class="bookt-highlight">
                <i class="fa-sharp fa-solid" :class="highlightIcons[module.title]" aria-hidden="true"></i>
                <div><h3>{{ module.title }}</h3><p>{{ module.summary }}</p></div>
              </div></div>
            </section>
            <section v-else-if="project.modules?.length" class="problems-solved" aria-labelledby="example-modules-heading">
              <h2 id="example-modules-heading">Example Modules</h2><div v-for="module in project.modules" :key="module.title"><h3>{{ module.title }}</h3><p class="summary">{{ module.summary }}</p></div>
            </section>
          </aside>
        </div>
      </div>
      <nav class="work-bottom" aria-label="Portfolio project navigation">
        <div class="work-bottom-inner row g-0 mx-auto">
          <NuxtLink class="col-4 text-start work-bottom-link d-flex align-items-center" :href="`/work/${previous.slug}`" :aria-label="`Previous project: ${previous.title}`">
            <i class="work-bottom-arrow fa-sharp fa-solid fa-arrow-left" aria-hidden="true"></i>
            <span class="work-bottom-copy d-flex flex-column">
              <span class="work-bottom-direction">Previous</span>
              <span class="work-bottom-title">{{ previous.title }}</span>
            </span>
          </NuxtLink>
          <NuxtLink class="col-4 text-center work-bottom-link all-work d-flex align-items-center justify-content-center" href="/work" aria-label="All Work">
            <i class="work-bottom-arrow fa-sharp fa-solid fa-grid" aria-hidden="true"></i>
            <span class="work-bottom-direction">All Work</span>
          </NuxtLink>
          <NuxtLink class="col-4 text-end work-bottom-link d-flex align-items-center flex-row-reverse" :href="`/work/${next.slug}`" :aria-label="`Next project: ${next.title}`">
            <i class="work-bottom-arrow fa-sharp fa-solid fa-arrow-right" aria-hidden="true"></i>
            <span class="work-bottom-copy d-flex flex-column">
              <span class="work-bottom-direction">Next</span>
              <span class="work-bottom-title">{{ next.title }}</span>
            </span>
          </NuxtLink>
        </div>
      </nav>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
