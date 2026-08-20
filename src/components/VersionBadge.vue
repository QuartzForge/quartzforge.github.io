<script setup lang="ts">
import { computed } from 'vue'
import versions from '../data/versions.json'
import StatusPill from './StatusPill.vue'

const props = defineProps<{ projectId: string }>()

const info = computed(() => {
  const v = versions[props.projectId as keyof typeof versions]
  return v && 'released' in v && v.released ? v : null
})
const status = computed(() => (info.value ? 'released' : 'design'))
</script>

<template>
  <template v-if="info">
    <StatusPill :status="status" />
    <span class="mono version-text">v{{ info.version }}</span>
  </template>
  <StatusPill v-else :status="status" />
</template>
