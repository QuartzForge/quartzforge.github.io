<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ items: string[] }>()
const { t } = useI18n()
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="kicker">{{ t('project.roadmapKicker') }}</p>
        <h2>{{ t('project.roadmapTitle') }}</h2>
      </div>
      <ul class="feature-list">
        <li v-for="item in items" :key="item">
          <span class="fl-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M5 8l7-5 7 5v8l-7 5-7-5Z"/></svg>
          </span>
          <span>
            <strong>{{ item }}</strong>
            <span>{{ t('project.roadmapPlanned') }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
