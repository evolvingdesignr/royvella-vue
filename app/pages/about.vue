<script setup lang="ts">
import milestones from '~/data/career-milestones.json'

// Desktop previews follow focus or hover; a click keeps a chapter selected.
const selected = ref(0)
const hovered = ref<number | null>(null)
const focused = ref<number | null>(null)
const expanded = ref<number | null>(0)
const active = computed(() => focused.value ?? hovered.value ?? selected.value)

function navigateCareer(event: KeyboardEvent, index: number) {
  let next: number
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % milestones.length
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + milestones.length) % milestones.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = milestones.length - 1
  else return
  event.preventDefault()
  hovered.value = null
  const button = event.currentTarget as HTMLButtonElement
  button.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
}
function previewCareer(event: PointerEvent, index: number) {
  if (event.pointerType === 'mouse' && (event.movementX || event.movementY)) {
    focused.value = null
    hovered.value = index
  }
}
useSeoMeta({
  title: 'About Roy | Roy Vella',
  description: 'Part designer. Part developer. Always creating. A little about Roy Vella, the work, and the road so far.',
})
</script>

<template>
  <div class="interior-page">
    <SiteHeader />
    <main id="main-content" class="about-page" tabindex="-1">
      <section class="about-intro" aria-labelledby="about-title">
        <div class="about-container container-fluid">
          <div class="row">
            <div class="about-hero-copy col-lg-6">
              <p class="about-kicker mb-2">A Little About Me</p>
              <h1 id="about-title" class="about-hero-title mb-3">PART DESIGNER.<br>PART DEVELOPER.<br><span>ALWAYS CREATING.</span></h1>
              <div class="about-introduction">
                <p class="mb-0">I sketch ideas, push pixels, write code, and occasionally get a little carried away with a new project. I've spent my career finding ways to turn creative thinking into things people can actually use.</p>
              </div>
              <div class="about-hero-actions d-flex flex-wrap gap-3 mt-3">
                <NuxtLink class="btn btn-dark rounded-pill px-4 py-2 fw-semibold" href="/contact">Let's Connect →</NuxtLink>
                <NuxtLink class="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" href="/work">View My Work →</NuxtLink>
              </div>
            </div>
          </div>
          <div class="about-portrait-panel">
            <img src="/images/about/hero-about-avatar.png" alt="Illustrated Roy beside a sketchbook of avatar ideas, showing the journey from sketch to digital illustration" width="995" height="640" fetchpriority="high" class="about-portrait">
          </div>
        </div>
        <svg class="about-hero-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 32 C320 30 650 112 930 106 C1150 100 1280 24 1440 18 V120 H0 Z" />
          <path class="about-hero-curve-edge" d="M0 32 C320 30 650 112 930 106 C1150 100 1280 24 1440 18" />
        </svg>
      </section>

      <section class="about-road" aria-labelledby="about-road-title">
        <div class="about-container container-fluid">
          <p class="about-kicker mb-2">The chapters that shaped the work</p>
          <h2 id="about-road-title" class="about-section-title mb-3">The Road So Far</h2>
          <div class="career-timeline">
            <p id="career-help" class="about-copy career-help mb-4">From my first web design job to building modern digital experiences, here's a look at the journey so far.</p>
            <div class="career-desktop d-none d-lg-block">
              <div class="career-track-scroll" tabindex="0" role="region" aria-label="Career timeline — scroll horizontally to explore all milestones">
                <div class="career-track" role="group" aria-label="Career milestones" aria-describedby="career-help" @pointerleave="hovered = null">
                  <button
                    v-for="(milestone, index) in milestones"
                    :key="milestone.id"
                    type="button"
                    class="career-marker"
                    :aria-pressed="selected === index"
                    :aria-controls="`career-panel-${milestones[active]!.id}`"
                    :data-active="active === index"
                    :data-neighbor="Math.abs(active - index) === 1"
                    @pointerenter="$event.pointerType === 'mouse' && (hovered = index)"
                    @pointermove="previewCareer($event, index)"
                    @focus="hovered = null; focused = index"
                    @blur="focused = null"
                    @click="selected = index"
                    @keydown="navigateCareer($event, index)"
                  >
                    <span class="career-year">{{ index === 0 ? 'Early 2000s' : index === milestones.length - 1 ? 'Present' : '' }}</span>
                    <span class="career-dot" aria-hidden="true"></span>
                    <span class="career-label">{{ milestone.label }}</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- Share each chapter's content between desktop previews and mobile expansion. -->
            <ol class="career-chapters list-unstyled mb-0 mt-lg-3">
              <li v-for="(milestone, index) in milestones" :key="milestone.id" :data-preview="active === index" :data-active="expanded === index">
                <button
                  type="button"
                  class="career-mobile-trigger d-flex d-lg-none align-items-center justify-content-between w-100 text-start"
                  :aria-expanded="expanded === index"
                  :aria-controls="`career-panel-${milestone.id}`"
                  @click="expanded = expanded === index ? null : index"
                >
                  <span>{{ milestone.label }}</span>
                  <span class="career-expand" aria-hidden="true">{{ expanded === index ? '−' : '+' }}</span>
                </button>
                <article :id="`career-panel-${milestone.id}`" class="career-card career-panel row g-0 overflow-hidden" :aria-labelledby="`career-title-${milestone.id}`">
                  <div class="p-3 px-md-4" :class="milestone.image ? 'col-lg-7' : 'col-12'">
                    <p v-if="milestone.date" class="about-kicker mb-2">{{ milestone.date.label ?? milestone.date.year }}</p>
                    <h3 :id="`career-title-${milestone.id}`" class="h3 fs-3 mb-2">{{ milestone.company }}</h3>
                    <p v-if="milestone.subtitle" class="small text-secondary mb-3">{{ milestone.subtitle }}</p>
                    <div v-if="milestone.dictionary" class="mb-3">
                      <p class="d-flex flex-wrap align-items-baseline gap-2 mb-1">
                        <span class="fw-medium">{{ milestone.dictionary.word }}</span>
                        <span class="small text-secondary">{{ milestone.dictionary.pronunciation }}</span>
                        <span class="small text-secondary fst-italic">{{ milestone.dictionary.partOfSpeech }}</span>
                      </p>
                      <p class="small text-secondary mb-0">{{ milestone.dictionary.definition }}</p>
                    </div>
                    <p class="career-role d-flex flex-column mb-2"><span>Work Focus</span>{{ milestone.role }}</p>
                    <p class="about-copy mb-0">{{ milestone.description }}</p>
                    <section v-if="milestone.highlights" class="mt-3" aria-label="Key Highlights">
                      <h4 class="h6 mb-2">Key Highlights</h4>
                      <ul class="about-copy ps-3 mb-0">
                        <li v-for="highlight in milestone.highlights" :key="highlight.label" class="mb-2">
                          <strong>{{ highlight.label }}:</strong>{{ ' ' }}
                          <template v-for="(part, i) in highlight.content" :key="i"><strong v-if="'strong' in part && part.strong">{{ part.text }}</strong><span v-else>{{ part.text }}</span></template>
                          <a v-if="highlight.source" class="about-text-link" :href="highlight.source.href" target="_blank" rel="noopener noreferrer" :aria-label="`${highlight.source.label} for ${highlight.label} (opens in a new tab)`"> Source ↗</a>
                        </li>
                      </ul>
                    </section>
                    <NuxtLink v-if="milestone.link" class="about-text-link d-inline-block mt-3" :href="milestone.link.href">{{ milestone.link.label }} <span aria-hidden="true">↗</span></NuxtLink>
                  </div>
                  <div v-if="milestone.image" class="col-lg-5 career-image d-flex align-items-center justify-content-center p-3">
                    <img :src="milestone.image.src" :alt="milestone.image.alt" width="800" height="600" loading="lazy">
                  </div>
                </article>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section class="about-personal about-container container-fluid" aria-labelledby="about-personal-title">
        <p class="about-kicker mb-2">Beyond the pixels</p>
        <h2 id="about-personal-title" class="about-section-title mb-4">When I'm Not Pushing Pixels...</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-4">
            <article class="about-interest-card h-100 overflow-hidden d-flex flex-column">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img src="/images/about/beyond-the-pixels-sketch.webp" alt="Sketchbook with hand-drawn RoyVella.com layouts and avatar ideas beside a pen" class="about-interest-image object-fit-cover" loading="lazy">
              </div>
              <div class="p-4 flex-grow-1">
                <h3 class="h5 fs-5 mb-3">Always Creating</h3>
                <p class="about-copy mb-0">From rough sketches to polished digital experiences, creativity rarely switches off.</p>
              </div>
            </article>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <article class="about-interest-card h-100 overflow-hidden d-flex flex-column">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img src="/images/about/beyond-the-pixels-garden.webp" alt="Before-and-after views of a backyard garden growing into flowers, vegetables, and sunflowers" class="about-interest-image object-fit-cover" loading="lazy">
              </div>
              <div class="p-4 flex-grow-1">
                <h3 class="h5 fs-5 mb-3">Growing Something Good</h3>
                <p class="about-copy mb-0">A little dirt, a lot of patience, and the satisfaction of watching something take shape.</p>
              </div>
            </article>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <article class="about-interest-card h-100 overflow-hidden d-flex flex-column">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img src="/images/about/beyond-the-pixels-curiosity.webp" alt="Home workspace with code and RoyVella.com experiments displayed on a monitor" class="about-interest-image object-fit-cover" loading="lazy">
              </div>
              <div class="p-4 flex-grow-1">
                <h3 class="h5 fs-5 mb-3">Curiosity Never Clocks Out</h3>
                <p class="about-copy mb-0">Always exploring new tools, experimenting with ideas, and finding better ways to design and build.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="about-toolbox about-container container-fluid" aria-labelledby="about-toolbox-title">
        <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
          <div>
            <p class="about-kicker mb-2">From the first sketch to the last commit</p>
            <h2 id="about-toolbox-title" class="about-section-title mb-0">My Toolbox</h2>
          </div>
          <p class="about-copy mb-0">A mix of familiar tools and new possibilities.</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <article class="about-tool-group h-100 p-4">
              <h3 class="h5 fs-5 mb-3">Design</h3>
              <ul class="d-flex flex-wrap gap-2 list-unstyled mb-0">
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Figma</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Adobe XD</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Photoshop</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Illustrator</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Sketch</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">After Effects</span></li>
              </ul>
            </article>
          </div>
          <div class="col-md-4">
            <article class="about-tool-group h-100 p-4">
              <h3 class="h5 fs-5 mb-3">Front-End Development</h3>
              <ul class="d-flex flex-wrap gap-2 list-unstyled mb-0">
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">HTML/CSS</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Bootstrap 5</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Angular</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">TypeScript</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">PrimeNG</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">React</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Next.js</span></li>
              </ul>
            </article>
          </div>
          <div class="col-md-4">
            <article class="about-tool-group h-100 p-4">
              <h3 class="h5 fs-5 mb-3">Workflow &amp; AI</h3>
              <ul class="d-flex flex-wrap gap-2 list-unstyled mb-0">
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">VS Code</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">Git</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">GitHub</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">GitHub Copilot</span></li>
                <li><span class="badge rounded-pill text-bg-light border fw-normal px-3 py-2">AI-Assisted Development</span></li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="about-closing about-container container-fluid" aria-labelledby="about-closing-title">
        <div class="about-cta text-center p-4 p-md-5">
          <p class="about-kicker mb-3">Good things start with a conversation</p>
          <h2 id="about-closing-title" class="about-section-title mb-4">Let's Make Something Happen.</h2>
          <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
            <NuxtLink class="btn btn-light rounded-pill px-4 py-2 fw-semibold" href="/contact">Get in Touch →</NuxtLink>
            <NuxtLink class="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold" href="/work">View My Work →</NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
