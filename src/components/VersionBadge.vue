<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import versions from '../data/versions.json'

const props = defineProps<{ projectId: string }>()

const { t } = useI18n()

const info = computed(() => {
  const v = versions[props.projectId as keyof typeof versions]
  return v && 'released' in v && v.released ? v : null
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs"
    :class="info
      ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
      : 'border-neutral-700 bg-neutral-900 text-neutral-400'"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="info ? 'bg-amber-400' : 'bg-neutral-600'" />
    <template v-if="info">
      v{{ info.version }}
    </template>
    <template v-else>
      {{ t('status.development') }}
    </template>
  </span>
</template>
