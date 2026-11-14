<script setup lang="ts">
const clicks = ref(0)
const message = computed(() =>
  clicks.value === 0
    ? 'Your Vue portfolio starts here.'
    : `Vue is working! Button clicked ${clicks.value} ${clicks.value === 1 ? 'time' : 'times'}.`,
)
</script>

<template>
  <section class="welcome card shadow-sm p-4 p-md-5" aria-labelledby="welcome-title">
    <h1 id="welcome-title" class="display-5 fw-bold mb-3">RoyVella.com | Vue Edition</h1>
    <p class="lead text-secondary mb-3">Built with Vue 3, Nuxt, TypeScript &amp; Bootstrap 5</p>
    <p class="lead text-secondary mb-4" aria-live="polite">{{ message }}</p>
    <div>
      <button type="button" class="btn btn-primary btn-lg" @click="clicks++">
        Try Vue
      </button>
    </div>
  </section>
</template>

<style scoped>
.welcome {
  width: 100%;
  max-width: 56rem;
  margin-inline: auto;
}
</style>
