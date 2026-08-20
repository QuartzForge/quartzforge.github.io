<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown, ArrowRight, Boxes, Clock, List, ShieldCheck, TriangleAlert } from '@lucide/vue'
import { projects, type Project } from '../data/projects'
import versions from '../data/versions.json'
import { quartzExample, facetExample } from '../data/examples'
import CmdPanel from '../components/CmdPanel.vue'
import CodeTabs from '../components/CodeTabs.vue'
import VersionBadge from '../components/VersionBadge.vue'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'

const { t, tm } = useI18n()

// t() returns the message key for non-string messages, so array messages
// must be read with tm(), which resolves the raw message of the active
// locale. Computed so a locale switch re-renders the section.
function listOf<T>(key: string): T {
  return tm(key) as unknown as T
}

const archPoints = computed(() => listOf<{ title: string; body: string }[]>('arch.points'))
const archArrows = computed(() => listOf<string[]>('arch.arrows'))
const principles = computed(() => listOf<{ title: string; body: string }[]>('principles.list'))
const proofRows = computed(() => listOf<string[]>('proof.rows'))

const heroTabs = [
  { label: 'quartz', file: 'src/app.cr', code: quartzExample },
  { label: 'facet', file: 'src/schemas/signup.cr', code: facetExample },
]

// The install panel shows real shard.yml snippets for the released projects
// only; when the version fetch degrades (offline, rate limit) nothing is
// fabricated — the panel renders empty instead of inventing a version.
const installTabs = computed(() => {
  const tabs: { id: string; label: string; code: string }[] = []
  for (const id of ['quartz', 'facet']) {
    const info = versions[id as keyof typeof versions]
    if (info.released && info.version) {
      tabs.push({
        id,
        label: id,
        code: `dependencies:\n  ${id}:\n    github: QuartzForge/${id}\n    version: ~> ${info.version}`,
      })
    }
  }
  return tabs
})

// Display order is release-first: quartz, then facet, then vault.
const pkgOrder = ['quartz', 'facet', 'vault'] as const
const pkgCards = computed(() =>
  pkgOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined),
)
</script>

<template>
  <div>
    <!-- ============================================================= hero -->
    <section class="border-b border-border">
      <div class="wrap grid gap-10 py-16 lg:grid-cols-2 lg:items-stretch lg:gap-14 lg:py-24">
        <div>
          <p data-hero-kicker class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('home.heroKicker') }}
          </p>
          <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {{ t('home.heroLead') }} <span class="text-primary">{{ t('home.markWord') }}</span>.
          </h1>
          <p class="mt-5 max-w-[62ch] text-lg text-muted-foreground">{{ t('home.heroBody') }}</p>

          <div data-panel-cmd class="mt-8">
            <CmdPanel :tabs="installTabs" />
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <Button as-child>
              <RouterLink to="/docs">
                {{ t('home.ctaDocs') }}
                <ArrowRight class="size-4" aria-hidden="true" />
              </RouterLink>
            </Button>
          </div>
        </div>

        <CodeTabs v-reveal class="h-full" :tabs="heroTabs" />
      </div>
    </section>

    <!-- ====================================================== os 3 projetos -->
    <section id="projetos" class="border-b border-border">
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('home.projectsKicker') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('home.projectsTitle') }}</h2>
          <p class="mt-3 text-muted-foreground">{{ t('home.projectsBody') }}</p>
        </div>

        <div v-reveal class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="p in pkgCards"
            :key="p.id"
            :to="`/${p.id}`"
            data-pkg-card
            class="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
            :style="{ '--pkg': `var(--pkg-${p.id})` }"
          >
            <span class="h-0.5 w-10 rounded-full" :style="{ background: 'var(--pkg)' }" aria-hidden="true"></span>
            <div>
              <p class="font-semibold">{{ p.name }}</p>
              <p class="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {{ t(`home.role.${p.id}`) }}
              </p>
            </div>
            <p class="text-sm text-muted-foreground">{{ p.description }}</p>
            <div class="mt-auto flex items-center gap-2">
              <VersionBadge :project-id="p.id" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ==================================================== como se encaixam -->
    <section id="arquitetura" class="border-b border-border">
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('arch.kicker') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('arch.title') }}</h2>
          <p class="mt-3 text-muted-foreground">{{ t('arch.body') }}</p>
        </div>

        <div v-reveal class="mt-10 grid gap-10 lg:grid-cols-2">
          <div class="mx-auto flex w-full max-w-md flex-col">
            <Card class="gap-0 border-primary/30 py-4">
              <CardContent class="py-0">
                <p class="font-mono text-sm font-semibold">quartz</p>
                <p class="mt-1 text-xs text-muted-foreground">{{ t('arch.diag.lead') }}</p>
              </CardContent>
            </Card>
            <div class="flex items-center gap-2 py-3 font-mono text-xs text-muted-foreground">
              <ArrowDown class="size-4" aria-hidden="true" />
              {{ archArrows[0] }}
            </div>
            <div class="grid grid-cols-2 gap-3">
              <Card class="gap-0 py-4">
                <CardContent class="py-0">
                  <p class="font-mono text-sm font-semibold">facet</p>
                  <p class="mt-1 text-xs text-muted-foreground">{{ t('arch.diag.facet') }}</p>
                </CardContent>
              </Card>
              <Card class="gap-0 py-4">
                <CardContent class="py-0">
                  <p class="font-mono text-sm font-semibold">vault</p>
                  <p class="mt-1 text-xs text-muted-foreground">{{ t('arch.diag.vault') }}</p>
                </CardContent>
              </Card>
            </div>
            <div class="flex items-center gap-2 py-3 font-mono text-xs text-muted-foreground">
              <ArrowDown class="size-4" aria-hidden="true" />
              {{ archArrows[1] }}
            </div>
            <Card class="gap-0 border-primary/30 py-4">
              <CardContent class="py-0">
                <p class="font-mono text-sm font-semibold">PostgreSQL</p>
                <p class="mt-1 text-xs text-muted-foreground">{{ t('arch.diag.pg') }}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <ul class="space-y-3">
              <li v-for="(point, i) in archPoints" :key="point.title" class="flex items-start gap-3">
                <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground" aria-hidden="true">
                  <Boxes v-if="i === 0" class="size-3.5" />
                  <ShieldCheck v-else-if="i === 1" class="size-3.5" />
                  <Clock v-else-if="i === 2" class="size-3.5" />
                  <List v-else class="size-3.5" />
                </span>
                <p class="text-sm text-muted-foreground">
                  <span class="font-medium text-foreground">{{ point.title }}.</span> {{ point.body }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ princípios -->
    <section class="border-b border-border bg-muted/40">
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('principles.kicker') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('principles.title') }}</h2>
        </div>

        <div v-reveal class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card v-for="principle in principles" :key="principle.title" class="gap-3 py-5">
            <CardHeader class="px-5">
              <p class="text-base font-semibold">{{ principle.title }}</p>
            </CardHeader>
            <CardContent class="px-5">
              <p class="text-sm text-muted-foreground">{{ principle.body }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- ================================================================ prova -->
    <section id="prova" class="border-b border-border">
      <div class="wrap py-16">
        <div class="max-w-2xl">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {{ t('proof.kicker') }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ t('proof.title') }}</h2>
          <p class="mt-3 text-muted-foreground">{{ t('proof.body') }}</p>
        </div>

        <div v-reveal class="mt-10 space-y-2">
          <Card v-for="row in proofRows" :key="row" class="flex-row items-center justify-between gap-4 py-0">
            <div class="px-6 py-3">
              <p class="text-sm font-medium">{{ row }}</p>
            </div>
            <p class="px-6 py-3 font-mono text-xs text-muted-foreground">{{ t('proof.pending') }}</p>
          </Card>
        </div>

        <Alert variant="warning" class="mt-8 max-w-3xl">
          <TriangleAlert aria-hidden="true" />
          <AlertTitle>{{ t('proof.noteTitle') }}</AlertTitle>
          <AlertDescription>{{ t('proof.noteBody') }}</AlertDescription>
        </Alert>
      </div>
    </section>

    <!-- ================================================================ CTA -->
    <section id="repositorios">
      <div class="wrap py-16">
        <div v-reveal class="mx-auto max-w-2xl">
          <Card class="items-center px-8 py-12 text-center">
            <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {{ t('cta.kicker') }}
            </p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight">{{ t('cta.title') }}</h2>
            <p class="mt-4 text-muted-foreground">{{ t('cta.body') }}</p>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
              <Button as-child>
                <RouterLink to="/docs">
                  {{ t('cta.primary') }}
                  <ArrowRight class="size-4" aria-hidden="true" />
                </RouterLink>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
