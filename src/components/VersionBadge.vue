<script setup lang="ts">
import { computed } from 'vue'
import versions from '../data/versions.json'
import StatusPill from './StatusPill.vue'
import { Badge } from './ui/badge'

const props = defineProps<{ projectId: string }>()

const info = computed(() => {
  const v = versions[props.projectId as keyof typeof versions]
  return v && 'released' in v && v.released ? v : null
})
</script>

<template>
  <Badge v-if="info" variant="outline">
    <span class="font-mono">v{{ info.version }}</span>
  </Badge>
  <StatusPill v-else status="design" />
</template>
