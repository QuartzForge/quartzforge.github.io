<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowRight, Target, TriangleAlert } from '@lucide/vue'
import { projects } from '../data/projects'
import { projectExamples } from '../data/projectExamples'
import versions from '../data/versions.json'
import CodeTabs from '../components/CodeTabs.vue'
import CmdPanel from '../components/CmdPanel.vue'
import VersionBadge from '../components/VersionBadge.vue'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import RoadmapSection from '../components/RoadmapSection.vue'

const props = defineProps<{ projectId: string }>()

const { t } = useI18n()

const project = computed(() => projects.find((p) => p.id === props.projectId))
const examples = computed(() => projectExamples[props.projectId])
const repoUrl = computed(() => `https://github.com/${project.value?.repo}`)

// The shard block mirrors versions.json: the recorded version when the
// build-time fetch succeeded, nothing when it degraded (offline, rate
// limit) — the site never fabricates a version number.
const shardYml = computed(() => {
  const info = versions[props.projectId as keyof typeof versions]
  if (!info.released || !info.version) return ''
  return `dependencies:\n  ${props.projectId}:\n    github: QuartzForge/${props.projectId}\n    version: ~> ${info.version}`
})

// Honest placeholder for design projects, shaped like a code panel: a
// comment and a string literal instead of invented examples.
const placeholderCode = computed(() => `# ${t('status.development')}\n"${t('project.notYet')}"`)
</script>

<template>
  <div v-if="project">
    <!-- ============================================================= hero -->
    <section class="border-b border-border">
      <div class="wrap grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card"
              :style="{ color: `var(--pkg-${project.id})` }"
              data-project-glyph
              aria-hidden="true"
            >
              <svg v-if="project.id === 'quartz'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-5"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
              <svg v-else-if="project.id === 'obsidian'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-5"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
              <svg v-else-if="project.id === 'pulse'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-5"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
              <svg v-else-if="project.id === 'facet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-5"><path d="m5 13 4 4L19 7"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="size-5"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            </span>
            <div>
              <p class="font-semibold leading-tight">{{ project.name }}</p>
              <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {{ t(`ecosystem.role.${project.id}`) }}
              </p>
            </div>
            <VersionBadge :project-id="project.id" />
          </div>

          <h1 class="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{{ project.tagline }}</h1>
          <p class="mt-5 max-w-[62ch] text-lg text-muted-foreground">{{ project.description }}</p>

          <div v-if="shardYml" class="mt-8">
            <CmdPanel :code="shardYml" file="shard.yml" />
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <Button as-child>
              <RouterLink to="/docs">
                {{ t('home.ctaDocs') }}
                <ArrowRight class="size-4" aria-hidden="true" />
              </RouterLink>
            </Button>
            <Button variant="outline" as-child>
              <RouterLink to="/ecosystem">{{ t('home.ctaEcosystem') }}</RouterLink>
            </Button>
          </div>

          <p data-hero-note class="mt-6 font-mono text-xs text-muted-foreground">
            <span>Crystal {{ versions[project.id as keyof typeof versions].crystal }}</span>
            <span aria-hidden="true"> · </span>
            <span>MIT</span>
            <span aria-hidden="true"> · </span>
            <a :href="repoUrl" class="underline-offset-4 hover:underline">{{ project.repo }}</a>
          </p>
        </div>

        <CodeTabs v-if="examples" v-reveal :tabs="examples" />
        <div
          v-else
          v-reveal
          data-placeholder
          class="overflow-hidden rounded-lg border border-border bg-card"
        >
          <div class="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
            <span class="font-mono text-xs text-muted-foreground">{{ t('project.inDevelopment') }}</span>
          </div>
          <pre class="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground/90">{{ placeholderCode }}</pre>
        </div>
      </div>
    </section>

    <!-- =========================================================== o vão -->
    <section class="border-b border-border">
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('project.gapKicker') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('project.gapTitle') }}</h2>
        </div>

        <div v-reveal class="mt-10 grid gap-4 lg:grid-cols-2">
          <Card v-for="item in project.gap" :key="item" class="h-full gap-3 p-5">
            <div class="flex items-start gap-3">
              <span
                class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted"
                :style="{ color: `var(--pkg-${project.id})` }"
                aria-hidden="true"
              >
                <Target class="size-3.5" />
              </span>
              <p class="text-sm text-muted-foreground">{{ item }}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- ========================================================== roadmap -->
    <RoadmapSection :items="project.roadmap" />

    <!-- ======================================= quando não usar · pager -->
    <section>
      <div class="wrap py-16">
        <Alert variant="warning" class="max-w-3xl">
          <TriangleAlert aria-hidden="true" />
          <AlertTitle>{{ t('project.whenNotTitle') }} {{ project.name }}</AlertTitle>
          <AlertDescription>{{ project.whenNotToUse }}</AlertDescription>
        </Alert>

        <nav class="mt-8 flex flex-wrap items-center justify-between gap-3" :aria-label="t('project.pagerLabel')" data-pager>
          <Button variant="outline" as-child>
            <RouterLink to="/ecosystem">
              <ArrowLeft class="size-4" aria-hidden="true" />
              {{ t('project.pager.prev') }}
            </RouterLink>
          </Button>
          <Button as-child>
            <RouterLink to="/docs">
              {{ t('project.pager.next') }}
              <ArrowRight class="size-4" aria-hidden="true" />
            </RouterLink>
          </Button>
        </nav>
      </div>
    </section>
  </div>

  <div v-else>
    <section class="border-b border-border">
      <div class="wrap py-16">
        <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">404</p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight">{{ t('project.notFound') }}</h1>
      </div>
    </section>
  </div>
</template>
