<script setup lang="ts">
import type { GalleryItem } from '~/types/project'
const props = defineProps<{ items: GalleryItem[] }>()
const index = ref(0)
const image = computed(() => props.items[index.value] ?? props.items[0])
const groups = computed(() => [...new Set(props.items.map(item => item.section))].map(title => ({
  title,
  items: props.items.map((item, i) => ({ ...item, index: i })).filter(item => item.section === title),
})))
const grouped = computed(() => props.items.some(item => item.section))
const dialog = ref<HTMLDialogElement | null>(null)
const expandButton = ref<HTMLButtonElement | null>(null)
let previousOverflow: string | undefined
function move(direction: number) {
  if (props.items.length) index.value = (index.value + direction + props.items.length) % props.items.length
}
function expand() {
  if (!dialog.value || dialog.value.open) return
  previousOverflow = document.body.style.overflow
  dialog.value.showModal()
  document.body.style.overflow = 'hidden'
}
function finishClose() {
  // Native close events are queued; ignore one from a previous opening.
  if (dialog.value?.open || previousOverflow === undefined) return
  document.body.style.overflow = previousOverflow
  previousOverflow = undefined
  if (expandButton.value?.isConnected) expandButton.value.focus()
}
function close() {
  if (dialog.value?.open) dialog.value.close()
  finishClose()
}
function backdrop(event: MouseEvent) {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
}
watch(() => props.items, () => {
  if (index.value >= props.items.length) index.value = 0
  if (!props.items.length && import.meta.client) close()
})
onBeforeUnmount(() => { if (previousOverflow !== undefined) close() })
</script>

<template>
  <section v-if="image" class="gallery" aria-label="Project image gallery">
    <div class="gallery-main d-flex justify-content-center align-items-center">
      <button ref="expandButton" type="button" class="gallery-expand d-flex align-items-center justify-content-center" :aria-label="`Enlarge ${image.label}`" @click="expand">
        <img :src="image.src" :alt="image.alt">
        <span class="gallery-expand-hint">Click to enlarge ↗</span>
      </button>
      <div class="gallery-controls d-flex justify-content-between align-items-center">
        <button type="button" aria-label="Previous image" @click="move(-1)">←</button>
        <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}</span>
        <button type="button" aria-label="Next image" @click="move(1)">→</button>
      </div>
    </div>
    <div :class="{ 'gallery-sections': grouped }">
      <template v-for="group in groups" :key="group.title ?? 'images'">
        <component :is="grouped ? 'section' : 'div'" :aria-label="group.title">
          <h2 v-if="group.title">{{ group.title }}</h2>
          <div class="gallery-thumbs">
            <button v-for="item in group.items" :key="item.src" type="button" class="thumb" :class="{ active: index === item.index }" :aria-label="`Show ${item.label}`" :aria-pressed="index === item.index" @click="index = item.index">
              <span class="thumb-image"><img :src="item.src" alt="" loading="lazy"></span><small>{{ item.label }}</small>
            </button>
          </div>
          <ul v-if="group.items.some(item => item.href)" class="storefront-links d-flex flex-wrap">
            <template v-for="item in group.items" :key="item.src"><li v-if="item.href"><a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.label.replace(' · Existing capture', '') }} ↗</a></li></template>
          </ul>
        </component>
      </template>
    </div>
    <dialog ref="dialog" class="gallery-lightbox" aria-label="Enlarged project image" @cancel.prevent="close" @close="finishClose" @click="backdrop">
      <button type="button" class="lightbox-close" aria-label="Close enlarged image" autofocus @click="close">✕</button>
      <img :src="image.src" :alt="image.alt"><p>{{ image.label }}</p>
    </dialog>
  </section>
</template>

<style scoped>
</style>
