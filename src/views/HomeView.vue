<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import { quartzExample, facetExample } from '../data/examples'
import VersionBadge from '../components/VersionBadge.vue'
import StatusPill from '../components/StatusPill.vue'
import CodeTabs from '../components/CodeTabs.vue'
import InstallShard from '../components/InstallShard.vue'

const { t, tm } = useI18n()

const design = projects.filter((p) => p.status === 'design')

// t() returns the message key for non-string messages, so array messages
// must be read with tm(), which resolves the raw message of the active
// locale. Computed so a locale switch re-renders the section.
const principles = computed(
  () => tm('home.principles') as unknown as { title: string; body: string }[],
)

const heroTabs = [
  { label: 'quartz', file: 'src/app.cr', code: quartzExample },
  { label: 'facet', file: 'src/schemas/signup.cr', code: facetExample },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-neutral-800">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
        <div>
          <h1 class="font-display text-4xl font-bold leading-tight sm:text-5xl">
            {{ t('home.heroTitle') }}
          </h1>
          <p class="mt-4 max-w-md text-lg text-neutral-400">
            {{ t('home.heroSubtitle') }}
          </p>

          <div class="mt-8">
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {{ t('home.installLabel') }}
            </p>
            <InstallShard projectId="quartz" />
            <InstallShard projectId="facet" />
          </div>

          <div class="mt-8 flex gap-3">
            <RouterLink to="/docs" class="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-300">
              {{ t('home.ctaDocs') }}
            </RouterLink>
            <RouterLink to="/ecosystem" class="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-500">
              {{ t('home.ctaEcosystem') }}
            </RouterLink>
          </div>

          <p class="mt-6 text-xs text-neutral-500">
            MIT · Crystal ~> 1.21 · Linux · macOS · FreeBSD
          </p>
        </div>

        <CodeTabs :tabs="heroTabs" />
      </div>
    </section>

    <!-- Projects -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <h2 class="font-display text-2xl font-semibold">{{ t('home.projectsTitle') }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="p in projects"
          :key="p.id"
          :to="`/${p.id}`"
          class="group rounded-lg border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
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
      </div>
    </section>

    <!-- Principles -->
    <section class="border-t border-neutral-800 bg-neutral-900/40">
      <div class="mx-auto max-w-6xl px-6 py-16">
        <h2 class="font-display text-2xl font-semibold">{{ t('home.principlesTitle') }}</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <div v-for="principle in principles" :key="principle.title" class="rounded-lg border border-neutral-800 p-5">
            <h3 class="font-display font-semibold">{{ principle.title }}</h3>
            <p class="mt-2 text-sm text-neutral-400">{{ principle.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <h2 class="font-display text-2xl font-semibold">{{ t('home.roadmapTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-sm text-neutral-400">{{ t('home.roadmapSubtitle') }}</p>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <RouterLink
          v-for="p in design"
          :key="p.id"
          :to="`/${p.id}`"
          class="rounded-lg border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
        >
          <div class="flex items-center justify-between">
            <span class="font-display font-semibold">{{ p.name }}</span>
            <VersionBadge :project-id="p.id" />
          </div>
          <p class="mt-2 text-sm text-neutral-400">{{ p.tagline }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
