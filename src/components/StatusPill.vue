<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ status: 'released' | 'design' }>()
const { t } = useI18n()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="status === 'released'
      ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30'
      : 'bg-neutral-800 text-neutral-300 ring-1 ring-neutral-700'"
  >
    {{ status === 'released' ? t('status.released') : t('status.development') }}
  </span>
</template>
