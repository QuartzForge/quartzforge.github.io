<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import { projectExamples } from '../data/projectExamples'
import VersionBadge from '../components/VersionBadge.vue'
import StatusPill from '../components/StatusPill.vue'
import CodeTabs from '../components/CodeTabs.vue'
import InstallShard from '../components/InstallShard.vue'
import RoadmapSection from '../components/RoadmapSection.vue'

const props = defineProps<{ projectId: string }>()

const { t } = useI18n()

const project = computed(() => projects.find((p) => p.id === props.projectId))
const examples = computed(() => projectExamples[props.projectId])
</script>

<template>
  <div v-if="project" class="mx-auto max-w-6xl px-6 py-14">
    <!-- Hero -->
    <section class="grid gap-8 lg:grid-cols-2">
      <div>
        <div class="flex items-center gap-3">
          <span class="font-display text-xl font-semibold">{{ project.name }}</span>
          <VersionBadge :project-id="project.id" />
          <StatusPill :status="project.status" />
        </div>
        <p class="mt-2 text-sm uppercase tracking-wider text-neutral-500">{{ project.role }}</p>
        <h1 class="mt-4 font-display text-3xl font-bold">{{ project.tagline }}</h1>
        <p class="mt-4 text-neutral-300">{{ project.description }}</p>

        <div class="mt-6">
          <InstallShard :project-id="project.id" />
        </div>

        <p class="mt-6 text-xs text-neutral-500">
          Crystal {{ project.status === 'released' ? '~> 1.21' : '~> 1.21 (planejado)' }} · MIT
          · <a :href="`https://github.com/${project.repo}`" class="text-neutral-400 underline decoration-neutral-700 hover:text-neutral-200">{{ project.repo }}</a>
        </p>
      </div>

      <div v-if="examples">
        <CodeTabs :tabs="examples" />
      </div>
      <div v-else class="rounded-lg border border-dashed border-neutral-700 p-8">
        <p class="text-sm text-neutral-400">{{ t('project.inDevelopment') }}</p>
        <p class="mt-2 text-xs text-neutral-500">{{ t('project.noExamples') }}</p>
      </div>
    </section>

    <!-- The gap -->
    <section class="mt-14">
      <h2 class="font-display text-xl font-semibold">{{ t('project.gapTitle') }}</h2>
      <ul class="mt-3 space-y-2">
        <li v-for="item in project.gap" :key="item" class="flex items-start gap-2 text-sm text-neutral-300">
          <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
          {{ item }}
        </li>
      </ul>
    </section>

    <!-- Roadmap -->
    <RoadmapSection :items="project.roadmap" />

    <!-- When not to use -->
    <section class="mt-10 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6">
      <h2 class="font-display text-lg font-semibold">{{ t('project.whenNotTitle') }}</h2>
      <p class="mt-2 text-sm text-neutral-400">{{ project.whenNotToUse }}</p>
    </section>

    <!-- Pagination -->
    <nav class="mt-14 flex justify-between border-t border-neutral-800 pt-6 text-sm">
      <RouterLink to="/ecosystem" class="text-neutral-400 hover:text-neutral-200">← {{ t('nav.ecosystem') }}</RouterLink>
      <RouterLink to="/docs" class="text-neutral-400 hover:text-neutral-200">{{ t('nav.documentation') }} →</RouterLink>
    </nav>
  </div>

  <div v-else class="mx-auto max-w-6xl px-6 py-14">
    <p>404 — projeto não encontrado</p>
  </div>
</template>
