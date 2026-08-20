<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, TriangleAlert } from '@lucide/vue'
import { projects, type Project } from '../data/projects'
import versions from '../data/versions.json'
import VersionBadge from '../components/VersionBadge.vue'
import StatusPill from '../components/StatusPill.vue'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

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
    <section class="border-b border-border">
      <div class="wrap py-16 lg:py-24">
        <p data-hero-kicker class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {{ t('ecosystem.heroKicker') }}
        </p>
        <h1 class="mt-4 max-w-[18ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          {{ t('ecosystem.heroTitle') }}
        </h1>
        <p class="mt-5 max-w-[62ch] text-lg text-muted-foreground">{{ t('ecosystem.heroLede') }}</p>
      </div>
    </section>

    <!-- ================================================== os cinco projetos -->
    <section class="border-b border-border">
      <div class="wrap py-16">
        <div
          class="flex flex-wrap items-center gap-2"
          role="group"
          :aria-label="t('ecosystem.filterLabel')"
        >
          <Button
            v-for="f in filters"
            :key="f.id"
            :variant="active === f.id ? 'default' : 'outline'"
            size="sm"
            :data-cat-filter="f.id"
            :aria-pressed="active === f.id"
            @click="active = f.id"
          >
            {{ t(f.key) }}
          </Button>
          <span
            class="ml-auto font-mono text-xs text-muted-foreground"
            data-filter-count
          >
            {{ t('ecosystem.count', visibleCount) }}
          </span>
        </div>

        <div v-reveal class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="p in pkgCards"
            :key="p.id"
            :data-cat="scopeOf[p.id]"
            :hidden="!isVisible(p)"
            class="gap-0 p-0 transition-colors hover:border-primary/40"
            :style="{ '--pkg': `var(--pkg-${p.id})`, 'border-left': '2px solid var(--pkg)' }"
          >
            <CardHeader class="flex-row items-center gap-3">
              <span class="text-lg" :style="{ color: 'var(--pkg)' }" aria-hidden="true">
                <svg v-if="p.id === 'quartz'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
                <svg v-else-if="p.id === 'obsidian'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
                <svg v-else-if="p.id === 'pulse'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>
                <svg v-else-if="p.id === 'facet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 13 4 4L19 7"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
              </span>
              <div>
                <p class="font-semibold">{{ p.name }}</p>
                <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t(`ecosystem.role.${p.id}`) }}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">{{ p.description }}</p>
            </CardContent>
            <CardFooter class="justify-between">
              <VersionBadge :project-id="p.id" />
              <Button variant="ghost" size="sm" class="text-primary" as-child>
                <RouterLink :to="`/${p.id}`">
                  {{ t('ecosystem.open') }}
                  <ArrowRight class="size-3.5" aria-hidden="true" />
                </RouterLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- ==================================================== matriz de compatibilidade -->
    <section>
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('ecosystem.matrixTitle') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('ecosystem.matrixLead') }}</h2>
          <p class="mt-3 text-muted-foreground">{{ t('ecosystem.matrixNote') }}</p>
        </div>

        <div v-reveal class="mt-10">
          <Table>
            <TableCaption class="sr-only">{{ t('ecosystem.matrixCaption') }}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t('ecosystem.columnProject') }}
                </TableHead>
                <TableHead class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t('ecosystem.columnStatus') }}
                </TableHead>
                <TableHead class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t('ecosystem.columnCrystal') }}
                </TableHead>
                <TableHead class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t('ecosystem.columnLicense') }}
                </TableHead>
                <TableHead class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {{ t('ecosystem.columnDeps') }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="p in pkgCards" :key="p.id">
                <TableCell class="font-mono">{{ p.name }}</TableCell>
                <TableCell><StatusPill :status="p.status" /></TableCell>
                <TableCell class="font-mono">{{ versions[p.id as keyof typeof versions].crystal }}</TableCell>
                <TableCell>MIT</TableCell>
                <TableCell>{{ t(depsKey[p.id]) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Alert class="mt-10 max-w-3xl">
          <TriangleAlert aria-hidden="true" />
          <AlertTitle>{{ t('ecosystem.noteTitle') }}</AlertTitle>
          <AlertDescription>{{ t('ecosystem.noteBody') }}</AlertDescription>
        </Alert>
      </div>
    </section>
  </div>
</template>
