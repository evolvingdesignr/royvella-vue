<script setup lang="ts">
import creativeEntries from '~/data/creative-gallery.json'

type CreativeItem = {
  id: string
  category: string
  type: string
  src: string
  alt: string
  title?: string
  caption?: string
  poster?: string
  captions?: { src: string; language: string; label: string }
}
const items: CreativeItem[] = creativeEntries
const props = withDefaults(defineProps<{
  category: string
  mediaId?: string | null
  showEmptyTitle?: boolean
}>(), { showEmptyTitle: true })
const emit = defineEmits<{ 'media-change': [id: string | null, replace: boolean] }>()
const localMediaId = ref<string | null>(null)
const label = computed(() => props.category === 'motion-3d' ? 'Motion / 3D' : 'Drawings & Sketches')
const collection = computed(() => items.filter(item => item.category === props.category))
const selected = computed(() => collection.value.find(item => item.id === (props.mediaId === undefined ? localMediaId.value : props.mediaId)))
const position = computed(() => collection.value.findIndex(item => item.id === selected.value?.id))
const dialog = ref<HTMLDialogElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const player = ref<HTMLVideoElement | null>(null)
const nativeSize = reactive({ width: 0, height: 0 })
const stageSize = reactive({ width: 0, height: 0 })
let opener: HTMLButtonElement | null = null
let previousOverflow: string | undefined
let resizeObserver: ResizeObserver | undefined
let viewerGeneration = 0

// Match the reference: fit inside the viewer without enlarging low-resolution media.
const mediaStyle = computed(() => {
  const scale = nativeSize.width > 0 && nativeSize.height > 0
    ? Math.min(1, stageSize.width / nativeSize.width, stageSize.height / nativeSize.height)
    : 0
  return {
    width: `${nativeSize.width * scale}px`,
    height: `${nativeSize.height * scale}px`,
    visibility: scale > 0 ? 'visible' as const : 'hidden' as const,
  }
})
function changeMedia(id: string | null, replace = false) {
  if (props.mediaId === undefined) localMediaId.value = id
  else emit('media-change', id, replace)
}
function openMedia(item: CreativeItem, event: MouseEvent) {
  opener = event.currentTarget as HTMLButtonElement
  return changeMedia(item.id)
}
function closeViewer() { return changeMedia(null, true) }
function moveMedia(direction: number) {
  const next = collection.value[(position.value + direction + collection.value.length) % collection.value.length]
  if (next) return changeMedia(next.id, true)
}
function measureStage() {
  const bounds = stage.value?.getBoundingClientRect()
  stageSize.width = bounds?.width ?? 0
  stageSize.height = bounds?.height ?? 0
}
function loadMediaSize(event: Event) {
  const element = event.currentTarget as HTMLImageElement | HTMLVideoElement
  nativeSize.width = element instanceof HTMLVideoElement ? element.videoWidth : element.naturalWidth
  nativeSize.height = element instanceof HTMLVideoElement ? element.videoHeight : element.naturalHeight
}
function restoreViewer() {
  dialog.value?.close()
  if (previousOverflow !== undefined) {
    document.body.style.overflow = previousOverflow
    previousOverflow = undefined
  }
  if (opener?.isConnected) opener.focus()
  opener = null
}
async function syncViewer() {
  if (!import.meta.client) return
  const generation = ++viewerGeneration
  player.value?.pause()
  nativeSize.width = nativeSize.height = 0
  await nextTick()
  if (generation !== viewerGeneration) return
  if (!selected.value) { restoreViewer(); return }
  if (!opener) opener = document.getElementById(`creative-open-${selected.value.id}`) as HTMLButtonElement | null
  if (dialog.value && !dialog.value.open) {
    previousOverflow = document.body.style.overflow
    dialog.value.showModal()
    document.body.style.overflow = 'hidden'
  }
  measureStage()
  player.value?.play().catch(() => { /* Controls remain available if autoplay is blocked. */ })
}
function clickBackdrop(event: MouseEvent) {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeViewer()
}
watch(selected, syncViewer, { flush: 'pre' })
onMounted(() => {
  resizeObserver = new ResizeObserver(measureStage)
  if (stage.value) resizeObserver.observe(stage.value)
  syncViewer()
})
onBeforeUnmount(() => {
  viewerGeneration++
  player.value?.pause()
  resizeObserver?.disconnect()
  restoreViewer()
})
</script>

<template>
  <div v-if="!collection.length" class="creative-empty" role="status">
    <p class="creative-preparation">COLLECTION IN PREPARATION</p>
    <h2 v-if="showEmptyTitle">{{ label }}</h2>
    <p>No artwork has been added yet. This space is reserved for the upcoming collection.</p>
  </div>
  <div v-else class="creative-grid" :class="{ 'creative-grid-motion': category === 'motion-3d' }" :aria-label="`${label} gallery`">
    <figure v-for="(item, i) in collection" :key="item.id" class="creative-card">
      <button :id="`creative-open-${item.id}`" type="button" class="creative-open" aria-haspopup="dialog" :aria-label="`${item.type === 'video' ? 'Play' : 'Enlarge'} ${item.title ?? item.alt}`" @click="openMedia(item, $event)">
        <img v-if="item.type === 'image' || item.poster" :src="item.poster || item.src" :alt="item.alt" loading="lazy" decoding="async">
        <span v-else class="creative-video-placeholder">Video {{ i + 1 }}</span>
        <span class="creative-open-hint" aria-hidden="true">{{ item.type === 'video' ? '▶ Play' : 'Enlarge ↗' }}</span>
      </button>
      <figcaption v-if="item.title || item.caption"><h3 v-if="item.title">{{ item.title }}</h3><p v-if="item.caption">{{ item.caption }}</p></figcaption>
    </figure>
  </div>
  <dialog ref="dialog" class="creative-viewer" :aria-label="selected?.title ? undefined : selected?.alt" :aria-labelledby="selected?.title ? 'creative-viewer-title' : undefined" :aria-describedby="selected?.caption ? 'creative-viewer-caption' : undefined" @cancel.prevent="closeViewer" @click="clickBackdrop">
    <button type="button" class="creative-close" aria-label="Close artwork viewer" autofocus @click="closeViewer">✕</button>
    <div ref="stage" class="creative-media-stage">
      <template v-if="selected">
        <video v-if="selected.type === 'video'" :key="selected.id" ref="player" :src="selected.src" :poster="selected.poster" controls playsinline preload="metadata" :aria-label="selected.alt" :style="mediaStyle" @loadedmetadata="loadMediaSize">
          <track v-if="selected.captions" kind="captions" :src="selected.captions.src" :srclang="selected.captions.language" :label="selected.captions.label" default>
          Your browser does not support video playback.
        </video>
        <img v-else :key="`image-${selected.id}`" :src="selected.src" :alt="selected.alt" :style="mediaStyle" @load="loadMediaSize">
      </template>
    </div>
    <div v-if="selected" class="creative-viewer-footer">
      <div v-if="selected.title || selected.caption" class="creative-viewer-description">
        <h3 v-if="selected.title" id="creative-viewer-title">{{ selected.title }}</h3>
        <p v-if="selected.caption" id="creative-viewer-caption">{{ selected.caption }}</p>
      </div>
      <nav v-if="collection.length > 1" class="creative-viewer-nav d-flex flex-column align-items-center gap-3" aria-label="Artwork navigation">
        <span role="status" aria-live="polite">{{ position + 1 }} / {{ collection.length }}</span>
        <div class="d-flex justify-content-center flex-wrap gap-3">
          <button type="button" class="btn btn-dark d-inline-flex align-items-center gap-2" aria-label="Previous artwork" @click="moveMedia(-1)"><i class="fa-sharp fa-light fa-arrow-left" aria-hidden="true"></i>Previous</button>
          <button type="button" class="btn btn-dark d-inline-flex align-items-center gap-2" aria-label="Next artwork" @click="moveMedia(1)">Next<i class="fa-sharp fa-light fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </nav>
    </div>
  </dialog>
</template>

<style scoped>
</style>
