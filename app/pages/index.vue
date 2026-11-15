<script setup lang="ts">
import avatarArtwork from '~/assets/artwork/hero-avatar.svg?raw'

const projects = [
  {
    "id": "ability-commerce-website",
    "slug": "ability-commerce-website",
    "title": "Ability | Corporate",
    "cover": "/projects/ability-commerce-website/cover-ability-corp.png",
    "company": "Ability Commerce",
    "disciplines": [
      "UI/UX Design",
      "Responsive Web Design",
      "Web Development"
    ],
    "cardSubtitle": "Modernizing the corporate website with responsive layouts and clearer calls to action."
  },
  {
    "id": "ability-oms-modernization",
    "slug": "ability-oms-modernization",
    "title": "Ability | OMS",
    "cover": "/projects/ability-oms-modernization/cover-ability-oms.png",
    "company": "Ability Commerce",
    "disciplines": [
      "UI/UX Design",
      "Responsive Design",
      "Front-End Development"
    ],
    "cardSubtitle": "Modernizing legacy enterprise workflows through UI redesign and responsive interfaces."
  },
  {
    "id": "bookt-instamanager",
    "slug": "bookt-instamanager",
    "title": "Bookt / InstaManager",
    "cover": "/projects/bookt-instamanager/cover-bookt-instamanager.png",
    "company": "Bookt / InstaManager",
    "disciplines": [
      "UI/UX Design",
      "Enterprise Application Design",
      "Website Design",
      "Branding & Marketing"
    ],
    "cardSubtitle": "UI/UX design for an all-in-one vacation rental management platform."
  }
]
const index = ref(0)
const project = computed(() => projects[index.value]!)
const roles = ['UI/UX Designer', 'Father', 'HTML/CSS Expert', 'Husband', 'Front-End Developer', 'Artist', 'Problem Solver', 'Creator', 'Always Evolving']
const roleIndex = ref(0)
const mood = ref('Color')
const avatarStyle = ref('2d')
const rainbowFamilies = [
  { id: 'red', hue: 1, start: '#E9514D', end: '#F17D7A', build: '#001117' },
  { id: 'orange', hue: 30, start: '#F78C1F', end: '#FAA951', build: '#080D24' },
  { id: 'yellow', hue: 43, start: '#FBCA4B', end: '#FDDC89', build: '#1D0324' },
  { id: 'green', hue: 123, start: '#5AAA5D', end: '#87C389', build: '#1F0419' },
  { id: 'blue', hue: 210, start: '#428FDA', end: '#77AFE5', build: '#1B0A00' },
  { id: 'indigo', hue: 232, start: '#8490CB', end: '#A2ABD9', build: '#200411' },
  { id: 'violet', hue: 288, start: '#B267C5', end: '#CA94D7', build: '#031209' },
]
const rainbowIndex = ref(4)
const previewIndex = ref<number | null>(null)
const rainbowFamily = computed(() => rainbowFamilies[rainbowIndex.value]!)
const previewFamily = computed(() => previewIndex.value === null ? undefined : rainbowFamilies[previewIndex.value])
const hue = computed(() => rainbowFamily.value.hue)
const moodIconAnimating = computed(() => previewIndex.value !== null)
const shuffleIntervals = [100, 130, 170, 220, 280, 350, 550]
let shuffleTimer: ReturnType<typeof setTimeout> | undefined
let pendingFamily: number | undefined
let motionPreference: MediaQueryList | undefined
const menu = ref<HTMLDetailsElement | null>(null)
const moodMenu = ref<HTMLDetailsElement | null>(null)
const avatar = ref<HTMLElement | null>(null)
const wink = ref(false)
const dragging = ref(false)
const offset = reactive({ x: 0, y: 0 })
let pointer: { id: number; x: number; y: number } | undefined
let touchStart: number | null = null
const featuredTabs = ref<HTMLElement | null>(null)
const activeFeaturedTooltip = ref<string | null>(null)
const featuredTooltipId = useId()
let featuredObserver: IntersectionObserver | undefined
let labObserver: IntersectionObserver | undefined
let roleTimer: ReturnType<typeof setInterval> | undefined
let winkTimer: ReturnType<typeof setTimeout> | undefined
let aboutObserver: IntersectionObserver | undefined
const artwork = computed(() => avatarArtwork
  .replace('id="eye-left-open"', `id="eye-left-open" style="display:${wink.value ? 'none' : 'inline'}"`)
  .replace('id="eye-left-closed" style="display:none"', `id="eye-left-closed" style="display:${wink.value ? 'inline' : 'none'}"`)
  .replace('id="mouth-normal"', `id="mouth-normal" style="display:${dragging.value ? 'none' : 'inline'}"`)
  .replace('id="mouth-drag-surprised" style="display:none"', `id="mouth-drag-surprised" style="display:${dragging.value ? 'inline' : 'none'}"`))
const tools = [
  { label: 'Figma', artwork: '/assets/brands/figma.svg' },
  { label: 'Adobe XD', artwork: '/assets/brands/adobe-xd.svg' },
  { label: 'Photoshop', artwork: '/assets/brands/photoshop.svg' },
  { label: 'Illustrator', artwork: '/assets/brands/illustrator.svg' },
  { label: 'Sketch', artwork: '/assets/brands/sketch.svg' },
  { label: 'Angular', artwork: '/assets/brands/angular.svg' },
  { label: 'TypeScript', artwork: '/assets/brands/typescript.svg' },
  { label: 'HTML / CSS', artwork: '/assets/brands/html5.svg' },
  { label: 'GitHub', artwork: '/assets/brands/github.svg' },
  { label: 'AI Tools', artwork: '/assets/brands/ai-tools.svg' },
]
// Match the reference's raised-cosine magnification without a spring engine.
const dockStrengths = ref(tools.map(() => 0))
function resetDock() { dockStrengths.value = tools.map(() => 0) }
function moveDock(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 541px) and (prefers-reduced-motion: no-preference)').matches) {
    resetDock()
    return
  }
  const items = Array.from((event.currentTarget as HTMLElement).children)
  const centers = items.map(item => {
    const bounds = item.getBoundingClientRect()
    return bounds.left + bounds.width / 2
  })
  dockStrengths.value = centers.map((center, i) => {
    const neighbor = centers[i === centers.length - 1 ? i - 1 : i + 1]!
    const gap = Math.abs(center - neighbor) || 68
    const distance = Math.min(2, Math.abs(event.clientX - center) / gap)
    return (1 + Math.cos(Math.PI * distance / 2)) / 2
  })
}

const specialties = [
  { label: 'UI/UX Design', icon: 'fa-sharp fa-light fa-paintbrush', description: 'Intuitive, user-centered experiences' },
  { label: 'Front-End Development', icon: 'fa-sharp fa-light fa-code', description: 'HTML, CSS, Angular, TypeScript' },
  { label: 'Product Strategy', icon: 'fa-sharp fa-light fa-lightbulb', description: 'Turning ideas into real solutions' },
  { label: 'Creative Problem Solving', icon: 'fa-sharp fa-light fa-wand-magic-sparkles', description: 'Bridging design and development' },
  { label: 'And So Much More!', icon: 'fa-sharp fa-light fa-rocket', description: 'Always learning and exploring' },
]
function finishFeaturedSwipe(event: TouchEvent) {
  const start = touchStart
  touchStart = null
  const end = event.changedTouches[0]?.clientX
  if (start === null || end === undefined) return
  const distance = start - end
  if (Math.abs(distance) > 50) change(distance > 0 ? 1 : -1)
}
function leaveFeaturedTooltip(event: PointerEvent) {
  if (event.pointerType === 'mouse' && document.activeElement !== event.currentTarget) activeFeaturedTooltip.value = null
}
function change(delta: number) { index.value = (index.value + delta + projects.length) % projects.length }
function cancelMoodShuffle() {
  clearTimeout(shuffleTimer)
  shuffleTimer = undefined
  previewIndex.value = null
  pendingFamily = undefined
}
function finishMoodShuffle() {
  const next = pendingFamily
  if (next === undefined) return
  cancelMoodShuffle()
  rainbowIndex.value = next
  mood.value = 'ROYGBIV'
  savePreferences()
}
function chooseMood(value: string) {
  if (value === 'ROYGBIV') {
    shuffleHeaderMood()
    return
  }
  cancelMoodShuffle()
  mood.value = value
  if (moodMenu.value) moodMenu.value.open = false
  savePreferences()
}
function chooseAvatar(value: string) {
  avatarStyle.value = value
  if (moodMenu.value) moodMenu.value.open = false
  savePreferences()
}
function savePreferences() {
  try { localStorage.setItem('royvella-vue-preferences', JSON.stringify({ mood: mood.value, hue: hue.value, family: rainbowFamily.value.id, avatarStyle: avatarStyle.value })) } catch { /* Storage is optional. */ }
}
function animateWink() {
  if (dragging.value) return
  wink.value = true
  clearTimeout(winkTimer)
  winkTimer = setTimeout(() => { wink.value = false }, 450)
}
function startDrag(event: PointerEvent) {
  if (event.button !== 0) return
  pointer = { id: event.pointerId, x: event.clientX - offset.x, y: event.clientY - offset.y }
  avatar.value?.setPointerCapture(event.pointerId)
}
function moveDrag(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) return
  const x = event.clientX - pointer.x
  const y = event.clientY - pointer.y
  if (!dragging.value && Math.hypot(x - offset.x, y - offset.y) < 6) return
  // Keep touch scrolling available when the gesture is predominantly vertical.
  if (!dragging.value && event.pointerType === 'touch' && Math.abs(y - offset.y) > Math.abs(x - offset.x)) { pointer = undefined; return }
  dragging.value = true
  offset.x = Math.max(-80, Math.min(80, x))
  offset.y = Math.max(-60, Math.min(60, y))
}
function endDrag() {
  const moved = dragging.value
  pointer = undefined
  dragging.value = false
  if (!moved) animateWink()
}
function avatarKey(event: KeyboardEvent) {
  if (event.key === 'Enter') { event.preventDefault(); animateWink() }
  if (event.code === 'Space') event.preventDefault()
  if (event.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.preventDefault()
    offset.x = Math.max(-80, Math.min(80, offset.x + (event.key === 'ArrowRight' ? 8 : event.key === 'ArrowLeft' ? -8 : 0)))
    offset.y = Math.max(-60, Math.min(60, offset.y + (event.key === 'ArrowDown' ? 8 : event.key === 'ArrowUp' ? -8 : 0)))
  }
}
// Native disclosures retain their semantics; these handlers match reference focus behavior.
function closeHeaderMenu(panel: HTMLDetailsElement | null, restoreFocus = false) {
  if (!panel) return
  panel.open = false
  if (restoreFocus) panel.querySelector<HTMLElement>('summary')?.focus()
}
function leaveHeaderMenu(event: FocusEvent, panel: HTMLDetailsElement | null) {
  if (panel && !panel.contains(event.relatedTarget as Node | null)) closeHeaderMenu(panel)
}
function shuffleHeaderMood() {
  if (moodIconAnimating.value) return
  const candidates = rainbowFamilies.map((_, i) => i).filter(i => mood.value !== 'ROYGBIV' || i !== rainbowIndex.value)
  pendingFamily = candidates[Math.floor(Math.random() * candidates.length)]!
  if (moodMenu.value) moodMenu.value.open = false
  if (motionPreference?.matches) {
    finishMoodShuffle()
    return
  }
  const first = mood.value === 'ROYGBIV' ? (rainbowIndex.value + 1) % rainbowFamilies.length : 0
  let step = 0
  function preview() {
    previewIndex.value = (first + step) % rainbowFamilies.length
    shuffleTimer = setTimeout(() => {
      step++
      if (step === shuffleIntervals.length) finishMoodShuffle()
      else preview()
    }, shuffleIntervals[step])
  }
  preview()
}
function updateMoodMotion() {
  if (motionPreference?.matches) finishMoodShuffle()
}
function focusMoodTrigger() { moodMenu.value?.querySelector<HTMLElement>('summary')?.focus() }
function moodKeyboard(event: KeyboardEvent) {
  const panel = moodMenu.value
  if (!panel) return
  const buttons = Array.from(panel.querySelectorAll<HTMLButtonElement>('.mood-options button'))
  const options = buttons.slice(0, 4)
  if (event.target === panel.querySelector('summary') && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault()
    panel.open = true
    nextTick(() => options[event.key === 'ArrowDown' ? 0 : options.length - 1]?.focus())
    return
  }
  const index = options.indexOf(event.target as HTMLButtonElement)
  if (index < 0 || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length
  options[next]?.focus()
}
function outside(event: PointerEvent) {
  const target = event.target as Node
  if (!featuredTabs.value?.contains(target)) activeFeaturedTooltip.value = null
  for (const panel of [menu.value, moodMenu.value]) if (panel && !panel.contains(target)) panel.open = false
}
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', updateMoodMotion)
  try {
    const saved = JSON.parse(localStorage.getItem('royvella-vue-preferences') || 'null')
    if (saved && ['Color', 'Light', 'Dark', 'ROYGBIV'].includes(saved.mood)) mood.value = saved.mood
    if (saved && ['2d', '3d'].includes(saved.avatarStyle)) avatarStyle.value = saved.avatarStyle
    if (saved) {
      const family = rainbowFamilies.findIndex(value => value.id === saved.family)
      // Migrate the earlier hue-only preference to the nearest reference family.
      const savedHue = Number.isFinite(saved.hue) ? ((saved.hue % 360) + 360) % 360 : 210
      const distance = (hue: number) => Math.min(Math.abs(hue - savedHue), 360 - Math.abs(hue - savedHue))
      rainbowIndex.value = family >= 0 ? family : rainbowFamilies.reduce((closest, value, i) => distance(value.hue) < distance(rainbowFamilies[closest]!.hue) ? i : closest, 0)
    }
  } catch { /* Use defaults if storage is unavailable. */ }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    roleTimer = setInterval(() => { if (!document.hidden) roleIndex.value = (roleIndex.value + 1) % roles.length }, 2500)
  }
  // The reference reveals About once as it enters the viewport.
  const about = document.getElementById('about')
  if (about && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aboutObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        about.classList.add('about-revealed')
        aboutObserver?.disconnect()
      }
    }, { threshold: .12 })
    aboutObserver.observe(about)
  }
  const featured = document.getElementById('work')
  if (featured && 'IntersectionObserver' in window && !motionPreference.matches) {
    featuredObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        featured.classList.add('featured-revealed')
        featuredObserver?.disconnect()
      }
    }, { threshold: .12 })
    featuredObserver.observe(featured)
  }
  const lab = document.getElementById('lab')
  if (lab && 'IntersectionObserver' in window && !motionPreference.matches) {
    labObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        lab.classList.add('lab-revealed')
        labObserver?.disconnect()
      }
    }, { threshold: .12 })
    labObserver.observe(lab)
  }
  document.addEventListener('pointerdown', outside)
  window.addEventListener('blur', resetDock)
  window.addEventListener('resize', resetDock)
  window.addEventListener('scroll', resetDock, { passive: true })
})
onBeforeUnmount(() => {
  aboutObserver?.disconnect()
  featuredObserver?.disconnect()
  labObserver?.disconnect()
  cancelMoodShuffle()
  motionPreference?.removeEventListener('change', updateMoodMotion)
  clearInterval(roleTimer)
  clearTimeout(winkTimer)
  document.removeEventListener('pointerdown', outside)
  window.removeEventListener('blur', resetDock)
  window.removeEventListener('resize', resetDock)
  window.removeEventListener('scroll', resetDock)
})
useSeoMeta({ title: 'Roy Vella | Selected Work', description: 'UI/UX design and front-end development portfolio of Roy Vella.' })
</script>

<template>
  <div
    class="reference-home"
    :data-mood="mood"
    :data-avatar-style="avatarStyle"
    :data-rainbow="mood === 'ROYGBIV' ? rainbowFamily.id : undefined"
    :data-rainbow-preview="previewFamily?.id"
    :style="{
      '--mood-hue': hue,
      '--rainbow-start': rainbowFamily.start,
      '--rainbow-end': rainbowFamily.end,
      '--rainbow-build': (previewFamily || rainbowFamily).build,
      '--shuffle-hero-start': previewFamily?.start,
      '--shuffle-hero-end': previewFamily?.end,
    }"
  >
    <header
      class="home-header d-flex align-items-center"
    >
      <a class="skip-link" href="#main-content">Skip to content</a>
      <NuxtLink href="/" class="rv-brand d-flex align-items-center" aria-label="Roy Vella home"><img class="rv-logo-image" src="/assets/branding/logo-rv-horizontal-white.svg" alt="" width="124" height="21"></NuxtLink>
      <nav
        class="desktop-nav ms-auto"
        aria-label="Main navigation"
      >
        <NuxtLink href="/work">Work</NuxtLink>
        <NuxtLink href="/about">About</NuxtLink>
        <NuxtLink href="/lab">Lab</NuxtLink>
      </nav>
      <NuxtLink class="talk-button" href="/contact">Let’s Talk →</NuxtLink>
      <details
        ref="moodMenu"
        class="mood-selector"
        @keydown.esc.prevent="closeHeaderMenu(moodMenu, true)"
        @keydown="moodKeyboard"
        @focusout="leaveHeaderMenu($event, moodMenu)"
      >
        <summary class="mood-pill" aria-controls="header-mood-options" :data-shuffling="moodIconAnimating">
          <button type="button" class="mood-icon-button d-grid flex-shrink-0 p-0 border-0 bg-transparent rounded-circle" :aria-label="mood === 'ROYGBIV' ? 'Shuffle ROYGBIV colors' : 'Open color themes'" :aria-disabled="moodIconAnimating" @click.stop.prevent="mood === 'ROYGBIV' ? shuffleHeaderMood() : (moodMenu!.open = !moodMenu!.open)">
            <img class="mood-trigger-icon d-block flex-shrink-0 object-fit-contain" src="/assets/icons/change-mood-icon.png" alt="" width="18" height="18">
          </button>
          <span>Change Mood</span><span class="mood-chevron" aria-hidden="true"></span>
        </summary>
        <div
          id="header-mood-options"
          class="mood-options"
          role="group"
          aria-label="Change mood"
        >
          <span class="mood-section-label">COLOR THEME</span>
          <button
            v-for="option in ['ROYGBIV', 'Color', 'Light', 'Dark']"
            :key="option"
            type="button"
            :aria-pressed="mood === option"
            :aria-disabled="option === 'ROYGBIV' && moodIconAnimating"
            @click="chooseMood(option); focusMoodTrigger()"
          >
            <span class="mood-option-name d-flex align-items-center">
              <span class="mood-option-art text-center" aria-hidden="true">
                <img v-if="option === 'ROYGBIV'" class="mood-option-icon d-block object-fit-contain" src="/assets/icons/roygbiv-icon.png" alt="" width="22" height="22">
                <template v-else>{{ option === 'Color' ? '🎨' : option === 'Light' ? '☀' : '☾' }}</template>
              </span>
              {{ option === 'Color' ? 'Default' : option }}
            </span>
            <span aria-hidden="true">{{ mood === option ? '✓' : '' }}</span>
          </button>
          <span class="mood-section-label mood-avatar-heading">AVATAR STYLE</span>
          <button
            v-for="style in ['2d', '3d']"
            :key="style"
            type="button"
            class="mood-avatar-option"
            :aria-pressed="avatarStyle === style"
            @click="chooseAvatar(style); focusMoodTrigger()"
          >
            <span>{{ style === '2d' ? '2D Illustration' : '3D Character' }}</span>
            <span aria-hidden="true">{{ avatarStyle === style ? '✓' : '' }}</span>
          </button>
        </div>
      </details>
      <details
        ref="menu"
        class="mobile-nav"
        @keydown.esc.prevent="closeHeaderMenu(menu, true)"
        @focusout="leaveHeaderMenu($event, menu)"
      >
        <summary class="home-menu-toggle" aria-label="Menu"><i class="fa-sharp fa-light fa-bars" aria-hidden="true"></i></summary>
        <nav
          class="d-flex flex-column gap-0"
          aria-label="Mobile navigation"
          @click="menu!.open = false"
        >
          <NuxtLink href="/work">Work</NuxtLink>
          <NuxtLink href="/about">About</NuxtLink>
          <NuxtLink href="/lab">Lab</NuxtLink>
          <NuxtLink href="/contact">Let’s Talk →</NuxtLink>
        </nav>
      </details>
    </header>
    <main
      id="main-content"
      class="homepage"
      tabindex="-1"
    >
      <section
        class="hero-section"
        aria-labelledby="hero-title"
      >
        <div
          class="home-container"
        >
          <div
            class="hero-grid"
          >
            <div
              class="hero-intro"
            >
              <h1 id="hero-title"><span>I DESIGN.</span><span>I <em>BUILD</em>.</span><span>I EVOLVE.</span></h1>
              <span class="hero-divider" aria-hidden="true"></span>
              <p class="hero-support"><span>CREATIVE SOLUTIONS FOR REAL PEOPLE.</span><span>FROM IDEAS TO INTERFACES AND BEYOND.</span></p>
            </div>
            <div
              class="hero-avatar-stage"
            >
              <div
                ref="avatar"
                class="hero-avatar"
                :class="{ 'is-dragging': dragging }"
                :style="{ '--avatar-drag-x': `${offset.x}px`, '--avatar-drag-y': `${offset.y}px` }"
                role="button"
                tabindex="0"
                aria-label="Roy’s avatar. Press Enter to wink. Hold Shift and use arrow keys to move, or drag."
                @pointerdown="startDrag"
                @pointermove="moveDrag"
                @pointerup="endDrag"
                @pointercancel="pointer = undefined; dragging = false"
                @keydown="avatarKey"
              >
                <div
                  class="hero-avatar-svg"
                  aria-hidden="true"
                  v-html="artwork"
                >

                </div>
              </div>
              <span
                class="avatar-interaction-hint"
              >
                <span class="avatar-instruction-desktop">{{ avatarStyle === '3d' ? 'See my ' : "Don't click. Don't drag. Wanna see " }}</span>
                <span class="avatar-instruction-mobile">{{ avatarStyle === '3d' ? 'See ' : "Don't click or drag me // Wanna see " }}</span>
                <button type="button" class="avatar-style-link fw-bold" @click="chooseAvatar(avatarStyle === '2d' ? '3d' : '2d')">{{ avatarStyle === '3d' ? 'rv2D' : 'rv3D' }}</button>
                <span class="avatar-instruction-desktop">{{ avatarStyle === '3d' ? ' mood' : '?' }}</span>
                <span class="avatar-instruction-mobile"> ?</span>
              </span>
            </div>
            <div
              class="animated-roles"
              aria-live="polite"
              aria-atomic="true"
            >
              <span class="roles-label">DESIGNED TO DO MORE.</span>
              <span class="roles-subtitle">A Swiss Army knife of skills.</span>
              <span :key="roleIndex" class="animated-role" :data-long="roles[roleIndex]!.length > 18">{{ roles[roleIndex] }}</span>
            </div>
          </div>
        </div>
        <div
          class="hero-avatar-3d-anchor"
          role="img"
          aria-label="Illustrated 3D portrait of Roy Vella"
        >
          <img src="/assets/avatars/hero-avatar-3d.svg" alt="" width="1024" height="496">
        </div>
        <svg
          class="hero-wave hero-wave-mobile"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path class="hero-wave-tablet-path" d="M0 40 Q720 160 1440 40 L1440 160 L0 160 Z"/>
          <path class="hero-wave-phone-path" d="M0 8 Q720 274 1440 8 L1440 160 L0 160 Z"/>
        </svg>
        <svg class="hero-wave hero-wave-desktop" viewBox="0 0 600 125" preserveAspectRatio="none" aria-hidden="true"><path d="M0 26 C160 42 190 112 300 112 C410 112 440 42 600 26 L600 125 L0 125Z"/></svg>
      </section>
      <section
        id="work"
        class="featured-content home-container"
        aria-label="Featured projects"
      >
        <div
          class="featured-toolbar d-flex justify-content-between"
        >
          <div
            ref="featuredTabs"
            class="category-tabs d-flex flex-nowrap"
            @keydown.esc="activeFeaturedTooltip = null"
            role="group"
            aria-label="Content categories"
          >
            <button type="button" class="selected" aria-pressed="true" aria-controls="featured-results">FEATURED</button>
            <span
              v-for="(label, tabIndex) in ['CASE STUDIES', 'NEW', 'TIPS & LABS']"
              :key="label"
              class="position-relative d-inline-flex flex-shrink-0"
            >
              <button
                type="button"
                aria-disabled="true"
                :aria-describedby="`${featuredTooltipId}-${tabIndex}`"
                @pointerenter="$event.pointerType === 'mouse' && (activeFeaturedTooltip = label)"
                @pointerleave="leaveFeaturedTooltip"
                @focus="activeFeaturedTooltip = label"
                @blur="activeFeaturedTooltip = null"
                @click.prevent="activeFeaturedTooltip = label"
              >{{ label }}</button>
              <span :id="`${featuredTooltipId}-${tabIndex}`" class="category-tooltip" role="tooltip" :data-visible="activeFeaturedTooltip === label">Coming Soon</span>
            </span>
          </div>
        </div>
        <div
          id="featured-results"
          class="featured-project"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabindex="0"
          @keydown.left.prevent="change(-1)"
          @keydown.right.prevent="change(1)"
          @touchstart.passive="touchStart = $event.touches[0]?.clientX ?? null"
          @touchend.passive="finishFeaturedSwipe"
          @touchcancel.passive="touchStart = null"
        >
          <a class="featured-art" :href="`https://www.royvella.com/work/${project.slug}`" :aria-label="`View ${project.title}`"><img :src="project.cover" :alt="project.title" width="800" height="600"></a>
          <div
            class="featured-copy"
          >
            <div
              class="featured-copy-header d-flex align-items-center justify-content-between"
            >
              <p class="section-label red">• FEATURED WORK</p>
              <div
                class="featured-controls d-flex align-items-center"
              >
                <span class="project-count">{{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
                <div
                  class="carousel-progress d-flex"
                  aria-label="Choose project"
                >
                  <button v-for="(item, i) in projects" :key="item.id" type="button" :aria-label="`Show ${item.title}`" :aria-pressed="index === i" @click="index = i"></button>
                </div>
                <div
                  class="carousel-arrows d-flex"
                >
                  <button type="button" :disabled="projects.length < 2" aria-label="Previous project" @click="change(-1)"><i class="fa-sharp fa-regular fa-angle-left" aria-hidden="true"></i></button>
                  <button type="button" :disabled="projects.length < 2" aria-label="Next project" @click="change(1)"><i class="fa-sharp fa-regular fa-angle-right" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <h2>REAL PROJECTS.<br>REAL <em>IMPACT<span>.</span></em></h2>
            <div
              aria-live="polite"
              aria-atomic="true"
            >
              <h3>{{ project.title }}</h3>
              <span class="visually-hidden">Featured projects, {{ index + 1 }} of {{ projects.length }}.</span>
              <p>{{ project.cardSubtitle }}</p>
            </div>
            <div
              class="company-tags d-flex flex-wrap gap-2"
            >
              <span v-for="tag in [project.company, ...project.disciplines.slice(0, 2)]" :key="tag" class="badge rounded-pill border bg-white fw-semibold text-uppercase">{{ tag }}</span>
            </div>
            <div
              class="featured-bottom d-flex align-items-center flex-wrap row-gap-3 column-gap-4"
            >
              <a class="btn btn-dark rounded-pill border-0 fw-bold text-nowrap" :href="`https://www.royvella.com/work/${project.slug}`">VIEW PROJECT →</a>
              <a class="all-work-link" href="https://www.royvella.com/work">VIEW ALL WORK ↗</a>
            </div>
          </div>
        </div>
      </section>
      <section
        class="tools-section home-container home-divided"
        aria-labelledby="tools-title"
      >
        <div>
          <p class="section-label">TOOLS &amp; SKILLS</p>
          <h2 id="tools-title">WHAT I USE<br>TO <em>CREATE<span>.</span></em></h2>
          <p class="home-copy">Design, develop &amp; experiment with the tools that bring ideas to life.</p>
        </div>
        <ul
          class="tools-grid tools-dock list-unstyled m-0"
          @pointermove="moveDock"
          @pointerleave="resetDock"
          @pointercancel="resetDock"
        >
          <li
            v-for="(tool, i) in tools"
            :key="tool.label"
            :style="{ zIndex: dockStrengths[i] ? 1 + Math.round(dockStrengths[i]! * 10) : undefined }"
          >
            <div
              class="app-icon"
              :style="{ '--dock-strength': dockStrengths[i] }"
            >
              <img :src="tool.artwork" class="d-block object-fit-contain" alt="" width="56" height="56" loading="lazy">
            </div>
            <span>{{ tool.label }}</span>
          </li>
        </ul>
      </section>
      <section
        id="lab"
        class="lab-section home-container home-divided"
        aria-labelledby="lab-title"
      >
        <div>
          <p class="section-label">THE LAB</p>
          <h2 id="lab-title">IDEAS. PROTOTYPES.<br><em>EXPERIMENTS<span>.</span></em></h2>
          <p class="home-copy">A space to explore new technologies, test ideas, and share what I learn.</p>
          <NuxtLink class="outline-link" href="/lab">EXPLORE THE LAB →</NuxtLink>
        </div>
        <div
          class="lab-cards"
        >
          <article
            class="lab-card"
          >
            <a
              class="lab-prototype-link"
              href="https://stackblitz.com/edit/stackblitz-starters-etwcqscq?file=package.json"
              target="_blank"
              rel="noopener noreferrer"
              aria-labelledby="lab-pen-title lab-pen-cta"
            >
              <div
                class="lab-card-art lab-prototype-art lab-labeled-art"
              >
                <img src="/images/lab/farneys-pens-stackblitz.png" alt="Angular code in StackBlitz beside the live Fahrney's Pens personalization demo." width="1241" height="640" loading="lazy">
                <span class="lab-media-category">Interactive Demo</span>
              </div>
              <h3 id="lab-pen-title">Ability | Fahrney's Pen Personalization Demo</h3>
              <p class="lab-card-category">Angular / TypeScript</p>
              <p>An interactive experiment exploring custom engraving, font selection, and real-time text previews.</p>
              <span id="lab-pen-cta" class="coming-soon">View Live Prototype <span aria-hidden="true">↗</span><span class="visually-hidden"> (opens in a new tab)</span></span>
            </a>
          </article>
          <article
            class="lab-card"
          >
            <NuxtLink
              class="lab-prototype-link h-auto"
              href="/work?category=motion-3d&amp;media=rockon"
              aria-labelledby="lab-motion-title"
            >
              <div
                class="lab-card-art lab-prototype-art lab-labeled-art lab-motion-art"
              >
                <img src="/creative/motion/rockon-poster.jpg" alt="RockOn! animation" loading="lazy">
                <span class="lab-media-category">Motion / 3D</span>
              </div>
              <h3 id="lab-motion-title">RockOn!</h3>
              <p>Animated promotional banner created for GuitarWorld.com.</p>
            </NuxtLink>
            <NuxtLink id="lab-motion-cta" class="coming-soon lab-prototype-link h-auto" href="/work?category=motion-3d">View Motion / 3D <span aria-hidden="true">↗</span></NuxtLink>
          </article>
          <article
            class="lab-card"
          >
            <div
              class="lab-card-art lavender"
            >
              <i class="fa-sharp fa-solid fa-flask-gear" aria-hidden="true"></i>
            </div>
            <h3>Something's Brewing</h3>
            <p>Experiments, happy accidents, and whatever comes next. Exploring new UI/UX ideas, interactive prototypes, animations, games, and creative coding.</p>
            <span class="coming-soon">Coming Soon</span>
          </article>
        </div>
      </section>
      <section
        id="about"
        class="about-section home-container home-divided"
        aria-labelledby="about-title"
      >
        <div>
          <p class="section-label">ABOUT</p>
          <h2 id="about-title">A CREATIVE MIND<br>WITH A <strong>DEVELOPER’S TOUCH</strong>.</h2>
          <p class="home-copy">I am a UI/UX designer and front-end developer who loves crafting intuitive, scalable and performant experiences. I enjoy the process — from ideation and design to clean, efficient code.</p>
          <div
            class="about-actions d-flex align-items-center flex-wrap row-gap-3 column-gap-4"
          >
            <a class="btn btn-dark rounded-pill border-0 fw-bold text-nowrap d-inline-flex align-items-center" href="https://www.royvella.com/contact">CONTACT ME →</a>
            <a class="all-work-link" href="https://www.linkedin.com/in/roy-vella" target="_blank" rel="noopener noreferrer">LINKEDIN ↗<span class="visually-hidden"> (opens in a new tab)</span></a>
          </div>
        </div>
        <ul
          class="about-skills list-unstyled"
        >
          <li
            v-for="specialty in specialties"
            :key="specialty.label"
          >
            <div
              class="specialty-heading d-flex align-items-center"
            >
              <i :class="specialty.icon" aria-hidden="true"></i>
              <h3>{{ specialty.label }}</h3>
            </div>
            <p class="specialty-description">{{ specialty.description }}</p>
          </li>
        </ul>
        <img class="about-avatar" src="/assets/avatars/about-avatar.png" alt="Full-body illustrated Roy in a black shirt, jeans and red sneakers" width="167" height="288" loading="lazy">
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
