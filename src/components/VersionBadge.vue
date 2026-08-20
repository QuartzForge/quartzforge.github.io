<script setup lang="ts">
import { computed } from 'vue'
import { useVersions } from '../composables/useVersions'
import StatusPill from './StatusPill.vue'
import { Badge } from './ui/badge'

const props = defineProps<{ projectId: string }>()

const { versions } = useVersions()

const info = computed(() => {
  const v = versions.value[props.projectId]
  return v && v.released ? v : null
})
</script>

<template>
  <Badge v-if="info" variant="outline">
    <span class="font-mono">v{{ info.version }}</span>
  </Badge>
  <StatusPill v-else status="design" />
</template>
