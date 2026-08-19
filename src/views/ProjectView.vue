<script setup lang="ts">
defineProps<{ projectId: string }>()
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-16">
    <h1 class="font-display text-4xl font-bold">{{ projectId }}</h1>
    <p class="mt-2 text-neutral-400">Projeto — em construção</p>
  </section>
</template>
