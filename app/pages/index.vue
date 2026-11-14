<script setup lang="ts">
useSeoMeta({
  title: 'RoyVella.com | Vue Edition',
  description: 'The starting point for the Vue edition of RoyVella.com.',
})
</script>

<template>
  <main class="container py-5">
    <PortfolioWelcome />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: grid;
  align-content: center;
}
</style>
