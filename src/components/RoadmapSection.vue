<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge } from './ui/badge'
import { Card } from './ui/card'

defineProps<{ items: string[] }>()
const { t } = useI18n()
</script>

<template>
  <section class="border-b border-border">
    <div class="wrap py-16">
      <div class="max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {{ t('project.roadmapKicker') }}
        </p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('project.roadmapTitle') }}</h2>
      </div>

      <ul v-reveal class="mt-10 max-w-3xl space-y-2">
        <li v-for="item in items" :key="item" data-roadmap-item class="font-mono text-sm">
          <Card class="flex-row items-center justify-between gap-4 py-0">
            <p class="px-6 py-3">{{ item }}</p>
            <div class="shrink-0 px-6 py-3">
              <Badge variant="secondary">{{ t('project.roadmapPlanned') }}</Badge>
            </div>
          </Card>
        </li>
      </ul>
    </div>
  </section>
</template>
