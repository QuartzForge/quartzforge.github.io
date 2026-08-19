<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import VersionBadge from '../components/VersionBadge.vue'
import StatusPill from '../components/StatusPill.vue'

const { t } = useI18n()
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-14">
    <h1 class="font-display text-3xl font-bold">{{ t('ecosystem.title') }}</h1>
    <p class="mt-2 max-w-2xl text-neutral-400">{{ t('ecosystem.subtitle') }}</p>

    <section class="mt-10 grid gap-4 md:grid-cols-2">
      <RouterLink
        v-for="p in projects"
        :key="p.id"
        :to="`/${p.id}`"
        class="rounded-lg border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
      >
        <div class="flex items-center justify-between">
          <span class="font-display text-lg font-semibold">{{ p.name }}</span>
          <VersionBadge :project-id="p.id" />
        </div>
        <p class="mt-1 text-xs uppercase tracking-wider text-neutral-500">{{ p.role }}</p>
        <p class="mt-3 text-sm text-neutral-400">{{ p.description }}</p>
        <div class="mt-4">
          <StatusPill :status="p.status" />
        </div>
      </RouterLink>
    </section>

    <section class="mt-14">
      <h2 class="font-display text-xl font-semibold">{{ t('ecosystem.matrixTitle') }}</h2>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-800 text-left text-xs uppercase tracking-wider text-neutral-500">
              <th class="py-2 pr-4">{{ t('ecosystem.columnProject') }}</th>
              <th class="py-2 pr-4">{{ t('ecosystem.columnStatus') }}</th>
              <th class="py-2 pr-4">{{ t('ecosystem.columnCrystal') }}</th>
              <th class="py-2 pr-4">{{ t('ecosystem.columnLicense') }}</th>
              <th class="py-2">{{ t('ecosystem.columnDeps') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in projects" :key="p.id" class="border-b border-neutral-800/60">
              <td class="py-2 pr-4 font-medium">{{ p.name }}</td>
              <td class="py-2 pr-4"><StatusPill :status="p.status" /></td>
              <td class="py-2 pr-4 font-mono text-xs text-neutral-400">~> 1.21</td>
              <td class="py-2 pr-4">MIT</td>
              <td class="py-2 font-mono text-xs text-neutral-400">
                {{ p.id === 'quartz' || p.id === 'facet' ? 'zero deps' : '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-14 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6">
      <h2 class="font-display text-lg font-semibold">{{ t('ecosystem.noteTitle') }}</h2>
      <p class="mt-2 text-sm text-neutral-400">{{ t('ecosystem.noteBody') }}</p>
    </section>
  </div>
</template>
