<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowRight, Menu, Search } from '@lucide/vue'
import { docsGroups, docsProjectLinks, docsSections, type DocProjectLink, type DocSection } from '../data/docsSections'
import { useScrollSpy } from '../composables/useScrollSpy'
import CodeBlock from '../components/CodeBlock.vue'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'

const { t } = useI18n()

// Sidebar state: data-open toggles visibility on mobile; the '/' shortcut
// opens it and focuses the search box.
const sideOpen = ref(false)
const q = ref('')
// Display form of the query: trimmed, but not lowercased — the match form
// is `query`, the empty-state message shows what the user actually typed.
const trimmedQuery = computed(() => q.value.trim())
const query = computed(() => q.value.trim().toLowerCase())

const sectionsById = Object.fromEntries(docsSections.map((s) => [s.id, s])) as Record<string, DocSection>

// The crumb's second segment names the group of the first section.
const crumbGroup = computed(() => docsGroups.find((g) => g.id === docsSections[0].group)!)

function groupSections(group: (typeof docsGroups)[number]): DocSection[] {
  return group.sectionIds.map((id) => sectionsById[id]).filter((s): s is DocSection => Boolean(s))
}

function matches(hay: string): boolean {
  return !query.value || hay.toLowerCase().includes(query.value)
}

function sectionVisible(s: DocSection): boolean {
  return matches(`${t(s.headingKey)} ${s.keywords}`)
}

function projectVisible(l: DocProjectLink): boolean {
  return matches(`${t(l.textKey)} ${l.keywords}`)
}

// The ecosystem link carries its keywords inline in the template.
function ecosystemVisible(): boolean {
  return matches(`${t('nav.ecosystem')} matriz compatibilidade versões`)
}

function groupVisible(group: (typeof docsGroups)[number]): boolean {
  if (group.sectionIds.length > 0) return group.sectionIds.some((id) => sectionVisible(sectionsById[id]))
  return docsProjectLinks.some(projectVisible) || ecosystemVisible()
}

const hits = computed(() => {
  if (!query.value) return docsSections.length + docsProjectLinks.length + 1
  let n = docsSections.filter(sectionVisible).length
  n += docsProjectLinks.filter(projectVisible).length
  if (ecosystemVisible()) n += 1
  return n
})

function clearSearch(): void {
  q.value = ''
  document.getElementById('docs-search')?.blur()
}

function onDocKeydown(ev: KeyboardEvent): void {
  if (ev.key !== '/' || ev.metaKey || ev.ctrlKey) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  ev.preventDefault()
  sideOpen.value = true
  document.getElementById('docs-search')?.focus()
}

onMounted(() => document.addEventListener('keydown', onDocKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onDocKeydown))

const { activeId } = useScrollSpy(docsSections.map((s) => s.id))

const problemTypes = [
  'bad-request',
  'unauthorized',
  'forbidden',
  'not-found',
  'conflict',
  'unprocessable-entity',
  'timeout',
  'bind-error',
  'internal',
]

const problemJson = `{
  "type": "https://quartzforge.org/errors/bind-error",
  "title": "Invalid request parameters",
  "status": 400,
  "detail": "2 parameters failed validation",
  "instance": "/users/abc",
  "request_id": "01JD3K7XQ2M8N4P",
  "errors": [
    { "field": "id",   "in": "path",  "message": "expected Int64, got \\"abc\\"" }
  ]
}`
</script>

<template>
  <div class="wrap grid lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px]">
    <!-- ========================================================== sidebar -->
    <aside
      data-docs-side
      class="py-10 lg:sticky lg:top-[64px] lg:h-fit lg:max-h-[calc(100vh-64px)] lg:overflow-y-auto lg:border-r lg:border-border lg:py-14 lg:pr-8"
      :class="sideOpen ? 'block' : 'hidden lg:block'"
      :data-open="sideOpen"
    >
      <div class="relative">
        <Search
          class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label class="sr-only" for="docs-search">{{ t('docs.searchLabel') }}</label>
        <Input
          id="docs-search"
          v-model="q"
          type="search"
          :placeholder="t('docs.searchPlaceholder')"
          class="pl-8 pr-12"
          autocomplete="off"
          @keydown.escape="clearSearch"
        />
        <kbd
          class="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 font-mono text-[10px] text-muted-foreground"
        >/</kbd>
      </div>

      <nav data-docs-nav class="mt-6 flex flex-col gap-6" :aria-label="t('docs.navLabel')">
        <div v-for="g in docsGroups" :key="g.id" data-nav-group :hidden="!groupVisible(g)">
          <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">{{ t(g.titleKey) }}</p>
          <div class="mt-2 flex flex-col gap-0.5">
            <a
              v-for="s in groupSections(g)"
              :key="s.id"
              :href="`#${s.id}`"
              :hidden="!sectionVisible(s)"
              class="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              :class="activeId === s.id && 'bg-primary/10 font-medium text-primary'"
              :aria-current="activeId === s.id ? 'true' : undefined"
            >
              {{ t(s.headingKey) }}
            </a>
            <template v-if="g.id === 'referencia'">
              <RouterLink
                v-for="l in docsProjectLinks"
                :key="l.to"
                :to="l.to"
                :hidden="!projectVisible(l)"
                class="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {{ t(l.textKey) }}
              </RouterLink>
              <RouterLink
                to="/ecosystem"
                :hidden="!ecosystemVisible()"
                class="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {{ t('nav.ecosystem') }}
              </RouterLink>
            </template>
          </div>
        </div>

        <p
          v-if="hits === 0"
          data-search-empty
          class="rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted-foreground"
        >
          {{ t('docs.searchEmpty', { query: trimmedQuery }) }}
        </p>
      </nav>
    </aside>

    <!-- ============================================================ conteúdo -->
    <main class="min-w-0 py-10 lg:py-14 lg:pl-10">
      <Button
        variant="ghost"
        size="sm"
        data-docs-toggle
        :aria-expanded="sideOpen"
        class="mb-6 lg:hidden"
        @click="sideOpen = !sideOpen"
      >
        <Menu class="size-4" aria-hidden="true" />
        {{ t('docs.sidebarToggle') }}
      </Button>

      <p data-crumb class="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>{{ t('docs.crumb') }}</span>
        <span aria-hidden="true">/</span>
        <span>{{ t(crumbGroup.titleKey) }}</span>
      </p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{{ t('docs.quickStart') }}</h1>
      <p class="mt-3 max-w-[62ch] text-lg text-muted-foreground">{{ t('docs.subtitle') }}</p>

      <Separator class="my-10" />

      <section v-for="s in docsSections" :id="s.id" :key="s.id" class="mb-12 last:mb-0">
        <h2 class="text-2xl font-semibold tracking-tight">{{ t(s.headingKey) }}</h2>
        <p class="mt-3 max-w-[62ch] text-muted-foreground">{{ t(s.bodyKey) }}</p>

        <div v-if="s.code" class="mt-5">
          <CodeBlock :code="s.code.code" :file="s.code.file" />
        </div>

        <!-- RFC 9457: a sample problem document and the nine error types. -->
        <template v-if="s.id === 'erros'">
          <div class="mt-5">
            <CodeBlock :code="problemJson" lang="json" file="application/problem+json" />
          </div>
          <div class="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            <code
              v-for="type in problemTypes"
              :key="type"
              class="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs"
            >
              quartzforge.org/errors/{{ type }}
            </code>
          </div>
        </template>
      </section>

      <Separator class="mt-10" />

      <nav data-pager class="mt-8 flex items-center justify-between gap-4" :aria-label="t('docs.pagerLabel')">
        <Button as-child variant="outline" size="sm">
          <RouterLink to="/ecosystem" class="flex items-center gap-2">
            <ArrowLeft class="size-4" aria-hidden="true" />
            {{ t('docs.pager.prev') }}
          </RouterLink>
        </Button>
        <Button as-child size="sm">
          <RouterLink :to="docsProjectLinks[0].to" class="flex items-center gap-2">
            {{ t('docs.pager.next') }}
            <ArrowRight class="size-4" aria-hidden="true" />
          </RouterLink>
        </Button>
      </nav>
    </main>

    <!-- ============================================================== TOC -->
    <nav class="hidden xl:block" :aria-label="t('docs.onThisPage')">
      <div class="sticky top-[64px] max-h-[calc(100vh-64px)] overflow-y-auto py-14 pl-6">
        <p class="font-mono text-xs uppercase tracking-widest text-muted-foreground">{{ t('docs.onThisPage') }}</p>
        <div class="mt-3 flex flex-col border-l border-border">
          <a
            v-for="s in docsSections"
            :key="s.id"
            :href="`#${s.id}`"
            class="-ml-px border-l-2 border-transparent px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            :class="activeId === s.id && 'border-primary font-medium text-primary'"
            :aria-current="activeId === s.id ? 'true' : undefined"
          >
            {{ t(s.headingKey) }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
