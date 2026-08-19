<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ items: string[] }>()
const { t } = useI18n()
</script>

<template>
  <section class="mt-10">
    <h2 class="font-display text-xl font-semibold">{{ t('roadmap.title') }}</h2>
    <ul class="mt-3 space-y-2">
      <li v-for="item in items" :key="item" class="flex items-start gap-2 text-sm text-neutral-300">
        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
        {{ item }}
      </li>
    </ul>
    <p class="mt-3 text-xs text-neutral-500">{{ t('roadmap.disclaimer') }}</p>
  </section>
</template>
