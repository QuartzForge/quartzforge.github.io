<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects, type Project } from '../data/projects'
import versions from '../data/versions.json'
import VersionBadge from '../components/VersionBadge.vue'
import StatusPill from '../components/StatusPill.vue'

const { t } = useI18n()

// Display order comes from the handoff template: quartz, obsidian, pulse,
// facet, vault. Scope follows Ruling P — one identity per tool, and the chip
// set is exactly {web, dados, validacao, filas, oauth}.
const pkgOrder = ['quartz', 'obsidian', 'pulse', 'facet', 'vault'] as const
const scopeOf: Record<Project['id'], string> = {
  quartz: 'web',
  obsidian: 'dados',
  pulse: 'filas',
  facet: 'validacao',
  vault: 'oauth',
}

const pkgCards = computed(() =>
  pkgOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined),
)

const filters = [
  { id: 'all', key: 'ecosystem.chipsAll' },
  { id: 'web', key: 'ecosystem.scope.web' },
  { id: 'dados', key: 'ecosystem.scope.dados' },
  { id: 'validacao', key: 'ecosystem.scope.validacao' },
  { id: 'filas', key: 'ecosystem.scope.filas' },
  { id: 'oauth', key: 'ecosystem.scope.oauth' },
]

const active = ref('all')
const visibleCount = computed(() =>
  active.value === 'all' ? pkgCards.value.length : pkgCards.value.filter((p) => scopeOf[p.id] === active.value).length,
)

function isVisible(p: Project): boolean {
  return active.value === 'all' || scopeOf[p.id] === active.value
}

// The compatibility matrix keeps only real constraints: crystal constraint
// comes from versions.json, license is MIT across the org, and the
// dependency column reports what each project assumes about the environment
// (CONTEXT.md): quartz/facet need nothing beyond the stdlib, obsidian/pulse
// assume PostgreSQL, vault uses the stdlib HTTP client.
const depsKey: Record<Project['id'], string> = {
  quartz: 'ecosystem.deps.stdlib',
  facet: 'ecosystem.deps.stdlib',
  obsidian: 'ecosystem.deps.postgres',
  pulse: 'ecosystem.deps.postgres',
  vault: 'ecosystem.deps.http',
}
</script>

<template>
  <div>
    <!-- ============================================================= hero -->
    <section class="hero" style="padding-bottom: clamp(24px, 3vw, 40px)">
      <span class="facet" aria-hidden="true"></span>
      <div class="wrap">
        <p class="kicker">{{ t('ecosystem.heroKicker') }}</p>
        <h1 style="font-size: clamp(34px, 5.2vw, 60px); max-width: 18ch">{{ t('ecosystem.heroTitle') }}</h1>
        <p class="lede" style="max-width: 62ch">{{ t('ecosystem.heroLede') }}</p>
      </div>
    </section>

    <!-- ================================================== os cinco projetos -->
    <section class="section" style="padding-top: clamp(28px, 3.5vw, 48px)">
      <div class="wrap">
        <div class="chips" role="group" :aria-label="t('ecosystem.filterLabel')">
          <button
            v-for="f in filters"
            :key="f.id"
            class="chip"
            :data-cat-filter="f.id"
            :aria-pressed="active === f.id"
            @click="active = f.id"
          >
            {{ t(f.key) }}
          </button>
          <span class="pill" style="margin-inline-start: auto" data-filter-count>
            {{ t('ecosystem.count', visibleCount) }}
          </span>
        </div>

        <div v-reveal class="grid grid-3">
          <article
            v-for="p in pkgCards"
            :key="p.id"
            class="card pkg"
            :data-cat="scopeOf[p.id]"
            :hidden="!isVisible(p)"
            :style="{ '--pkg': `var(--pkg-${p.id})` }"
          >
            <div class="pkg-top">
              <span class="pkg-glyph" aria-hidden="true">
                <svg v-if="p.id === 'quartz'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
                <svg v-else-if="p.id === 'obsidian'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
                <svg v-else-if="p.id === 'pulse'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
                <svg v-else-if="p.id === 'facet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 13 4 4L19 7"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
              </span>
              <div>
                <div class="pkg-name">{{ p.name }}</div>
                <div class="pkg-role">{{ t(`ecosystem.role.${p.id}`) }}</div>
              </div>
            </div>
            <p>{{ p.description }}</p>
            <div class="pkg-meta">
              <VersionBadge :project-id="p.id" />
              <RouterLink :to="`/${p.id}`" class="link-arrow" style="margin-inline-start: auto">
                {{ t('ecosystem.open') }} <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==================================================== matriz de compatibilidade -->
    <section class="section section-tint">
      <div class="wrap">
        <div class="section-head">
          <p class="kicker">{{ t('ecosystem.matrixTitle') }}</p>
          <h2>{{ t('ecosystem.matrixLead') }}</h2>
          <p>{{ t('ecosystem.matrixNote') }}</p>
        </div>

        <div v-reveal class="table-wrap">
          <table>
            <caption class="sr-only">{{ t('ecosystem.matrixCaption') }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ t('ecosystem.columnProject') }}</th>
                <th scope="col">{{ t('ecosystem.columnStatus') }}</th>
                <th scope="col">{{ t('ecosystem.columnCrystal') }}</th>
                <th scope="col">{{ t('ecosystem.columnLicense') }}</th>
                <th scope="col">{{ t('ecosystem.columnDeps') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in pkgCards" :key="p.id">
                <td>{{ p.name }}</td>
                <td><StatusPill :status="p.status" /></td>
                <td>{{ versions[p.id as keyof typeof versions].crystal }}</td>
                <td>MIT</td>
                <td>{{ t(depsKey[p.id]) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout" style="margin-top: var(--gap)">
          <strong>{{ t('ecosystem.noteTitle') }}</strong>
          <p>{{ t('ecosystem.noteBody') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
