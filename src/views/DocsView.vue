<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { docsGroups, docsProjectLinks, docsSections, type DocProjectLink, type DocSection } from '../data/docsSections'
import { useScrollSpy } from '../composables/useScrollSpy'
import CodeBlock from '../components/CodeBlock.vue'

const { t } = useI18n()

// Sidebar state: data-open toggles visibility on mobile; the '/' shortcut
// opens it and focuses the search box (js/quartzforge.js 140-195, 175-183).
const sideOpen = ref(false)
const q = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
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
  searchInput.value?.blur()
}

function onDocKeydown(ev: KeyboardEvent): void {
  if (ev.key !== '/' || ev.metaKey || ev.ctrlKey) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  ev.preventDefault()
  sideOpen.value = true
  searchInput.value?.focus()
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
  <div class="docs">
    <!-- ========================================================== sidebar -->
    <aside class="docs-side" :data-open="sideOpen">
      <div class="search">
        <svg class="s-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <label class="sr-only" for="docs-search">{{ t('docs.searchLabel') }}</label>
        <input
          id="docs-search"
          ref="searchInput"
          v-model="q"
          type="search"
          :placeholder="t('docs.searchPlaceholder')"
          autocomplete="off"
          @keydown.escape="clearSearch"
        >
        <kbd>/</kbd>
      </div>

      <nav class="docs-nav" :aria-label="t('docs.navLabel')">
        <div v-for="g in docsGroups" :key="g.id" class="grp" :hidden="!groupVisible(g)">
          <p>{{ t(g.titleKey) }}</p>
          <a
            v-for="s in groupSections(g)"
            :key="s.id"
            :href="`#${s.id}`"
            :data-keywords="s.keywords"
            :hidden="!sectionVisible(s)"
          >
            {{ t(s.headingKey) }}
          </a>
          <template v-if="g.id === 'referencia'">
            <RouterLink
              v-for="l in docsProjectLinks"
              :key="l.to"
              :to="l.to"
              :data-keywords="l.keywords"
              :hidden="!projectVisible(l)"
            >
              {{ t(l.textKey) }}
            </RouterLink>
            <RouterLink
              to="/ecosystem"
              data-keywords="matriz compatibilidade versões"
              :hidden="!ecosystemVisible()"
            >
              {{ t('nav.ecosystem') }}
            </RouterLink>
          </template>
        </div>

        <p class="empty" :hidden="hits > 0">{{ t('docs.searchEmpty', { query: trimmedQuery }) }}</p>
      </nav>
    </aside>

    <!-- ============================================================ conteúdo -->
    <main class="docs-main">
      <button
        class="btn btn-ghost btn-sm only-mobile"
        data-docs-toggle
        :aria-expanded="sideOpen"
        style="margin-bottom: 20px"
        @click="sideOpen = !sideOpen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        {{ t('docs.sidebarToggle') }}
      </button>

      <p class="crumb">
        <span>{{ t('docs.crumb') }}</span>
        <span aria-hidden="true">/</span>
        <span>{{ t(crumbGroup.titleKey) }}</span>
      </p>
      <h1>{{ t('docs.quickStart') }}</h1>
      <p class="lede">{{ t('docs.subtitle') }}</p>

      <section v-for="s in docsSections" :id="s.id" :key="s.id">
        <h2>{{ t(s.headingKey) }}</h2>
        <p>{{ t(s.bodyKey) }}</p>

        <CodeBlock v-if="s.code" :code="s.code.code" :file="s.code.file" />

        <!-- RFC 9457: the nine error types and a sample problem document. -->
        <template v-if="s.id === 'erros'">
          <div class="panel">
            <div class="panel-head">
              <span class="panel-file" style="margin-inline-start: 0">application/problem+json</span>
            </div>
            <pre class="code">{{ problemJson }}</pre>
          </div>
          <ul>
            <li v-for="type in problemTypes" :key="type">
              <code>quartzforge.org/errors/{{ type }}</code>
            </li>
          </ul>
        </template>
      </section>

      <nav class="pager" :aria-label="t('docs.pagerLabel')">
        <RouterLink to="/ecosystem">
          <span class="p-dir" aria-hidden="true">←</span>
          <span class="p-name">{{ t('docs.pager.prev') }}</span>
        </RouterLink>
        <RouterLink :to="docsProjectLinks[0].to" class="next">
          <span class="p-name">{{ t('docs.pager.next') }}</span>
          <span class="p-dir" aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </main>

    <!-- ============================================================== TOC -->
    <nav class="docs-toc" :aria-label="t('docs.onThisPage')">
      <p class="t-title">{{ t('docs.onThisPage') }}</p>
      <a
        v-for="s in docsSections"
        :key="s.id"
        :href="`#${s.id}`"
        :data-active="activeId === s.id ? 'true' : 'false'"
      >
        {{ t(s.headingKey) }}
      </a>
    </nav>
  </div>
</template>
