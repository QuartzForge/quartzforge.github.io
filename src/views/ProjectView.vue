<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import { projectExamples } from '../data/projectExamples'
import versions from '../data/versions.json'
import CodeTabs from '../components/CodeTabs.vue'
import CmdPanel from '../components/CmdPanel.vue'
import VersionBadge from '../components/VersionBadge.vue'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
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
    <section class="hero">
      <span class="facet" aria-hidden="true"></span>
      <div class="wrap hero-grid">
        <div>
          <div class="pkg-top" style="margin-bottom: 20px">
            <span
              class="pkg-glyph"
              aria-hidden="true"
              :style="{ '--pkg': `var(--pkg-${project.id})` }"
            >
              <svg v-if="project.id === 'quartz'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
              <svg v-else-if="project.id === 'obsidian'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
              <svg v-else-if="project.id === 'pulse'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
              <svg v-else-if="project.id === 'facet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 13 4 4L19 7"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            </span>
            <div>
              <div class="pkg-name" style="font-size: 17px">{{ project.name }}</div>
              <div class="pkg-role">{{ t(`ecosystem.role.${project.id}`) }}</div>
            </div>
            <span style="margin-inline-start: 12px">
              <VersionBadge :project-id="project.id" />
            </span>
          </div>

          <h1>{{ project.tagline }}</h1>
          <p class="lede">{{ project.description }}</p>

          <CmdPanel v-if="shardYml" :code="shardYml" file="shard.yml" />

          <div class="hero-actions">
            <RouterLink to="/docs" class="btn btn-primary">
              {{ t('home.ctaDocs') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </RouterLink>
            <RouterLink to="/ecosystem" class="btn btn-ghost">{{ t('home.ctaEcosystem') }}</RouterLink>
          </div>

          <p class="hero-note">
            <span>Crystal {{ versions[project.id].crystal }}</span><span>·</span><span>MIT</span><span>·</span>
            <a :href="repoUrl">{{ project.repo }}</a>
          </p>
        </div>

        <CodeTabs v-if="examples" v-reveal :tabs="examples" />
        <div v-else class="panel" v-reveal>
          <div class="panel-head">
            <span class="panel-file">{{ t('project.inDevelopment') }}</span>
          </div>
          <pre class="code">{{ placeholderCode }}</pre>
        </div>
      </div>
    </section>

    <!-- =========================================================== o vão -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('project.gapKicker') }}</p>
          <h2>{{ t('project.gapTitle') }}</h2>
        </div>
        <ul class="feature-list">
          <li v-for="item in project.gap" :key="item">
            <span class="fl-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M5 8l7-5 7 5v8l-7 5-7-5Z"/></svg>
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ========================================================== roadmap -->
    <RoadmapSection :items="project.roadmap" />

    <!-- ======================================= quando não usar · pager -->
    <section class="section">
      <div class="wrap">
        <Alert>
          <AlertTitle>{{ t('project.whenNotTitle') }} {{ project.name }}</AlertTitle>
          <AlertDescription>{{ project.whenNotToUse }}</AlertDescription>
        </Alert>

        <nav class="pager" :aria-label="t('project.pagerLabel')">
          <RouterLink to="/ecosystem">
            <span class="p-dir" aria-hidden="true">←</span>
            <span class="p-name">{{ t('project.pager.prev') }}</span>
          </RouterLink>
          <RouterLink to="/docs" class="next">
            <span class="p-name">{{ t('project.pager.next') }}</span>
            <span class="p-dir" aria-hidden="true">→</span>
          </RouterLink>
        </nav>
      </div>
    </section>
  </div>

  <div v-else>
    <section class="hero">
      <div class="wrap">
        <p class="kicker">404</p>
        <h1 style="font-size: clamp(28px, 3.6vw, 44px)">projeto não encontrado</h1>
      </div>
    </section>
  </div>
</template>
