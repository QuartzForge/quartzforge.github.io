<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'

const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-neutral-800 py-10">
    <div class="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-4">
      <div class="sm:col-span-2">
        <p class="font-display text-lg font-semibold">Quartz<em class="text-amber-400 not-italic">Forge</em></p>
        <p class="mt-2 max-w-xs text-sm text-neutral-400">{{ t('footer.tagline') }}</p>
      </div>

      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-500">{{ t('footer.projects') }}</h4>
        <ul class="mt-2 space-y-1 text-sm">
          <li v-for="p in projects" :key="p.id"><RouterLink :to="`/${p.id}`" class="text-neutral-400 hover:text-neutral-100">{{ p.name }}</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-neutral-500">{{ t('footer.documentation') }}</h4>
        <ul class="mt-2 space-y-1 text-sm">
          <li><RouterLink to="/docs" class="text-neutral-400 hover:text-neutral-100">{{ t('footer.quickStart') }}</RouterLink></li>
          <li><RouterLink to="/docs#instalacao" class="text-neutral-400 hover:text-neutral-100">{{ t('footer.installation') }}</RouterLink></li>
          <li><RouterLink to="/docs#controller" class="text-neutral-400 hover:text-neutral-100">{{ t('footer.firstRoute') }}</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="mx-auto mt-8 flex max-w-6xl items-center justify-between px-6 text-xs text-neutral-600">
      <span>© {{ new Date().getFullYear() }} QuartzForge</span>
      <span>MIT</span>
      <span>{{ t('footer.madeIn') }}</span>
    </div>
  </footer>
</template>
