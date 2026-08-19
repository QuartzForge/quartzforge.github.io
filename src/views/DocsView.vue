<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { docsSections } from '../data/docsSections'
import CodeBlock from '../components/CodeBlock.vue'

const { t } = useI18n()

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
</script>

<template>
  <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[240px_1fr]">
    <!-- Sidebar -->
    <aside class="hidden lg:block">
      <nav class="sticky top-20 space-y-1 text-sm" aria-label="Documentação">
        <a
          v-for="section in docsSections"
          :key="section.id"
          :href="`#${section.id}`"
          class="block rounded px-2 py-1 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
        >
          {{ t(section.headingKey) }}
        </a>
      </nav>
    </aside>

    <!-- Content -->
    <article class="min-w-0">
      <h1 class="font-display text-3xl font-bold">{{ t('docs.title') }}</h1>
      <p class="mt-2 text-neutral-400">{{ t('docs.subtitle') }}</p>

      <section
        v-for="(section, index) in docsSections"
        :id="section.id"
        :key="section.id"
        class="mt-12 scroll-mt-24"
      >
        <span class="text-xs uppercase tracking-wider text-neutral-500">
          {{ t('docs.step', { n: index + 1 }) }}
        </span>
        <h2 class="mt-1 font-display text-2xl font-semibold">{{ t(section.headingKey) }}</h2>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
          {{ t(section.bodyKey) }}
        </p>
        <div v-if="section.code" class="mt-4">
          <CodeBlock :code="section.code.code" :file="section.code.file" />
        </div>
      </section>

      <!-- RFC 9457 -->
      <section id="erros" class="mt-12 scroll-mt-24">
        <span class="text-xs uppercase tracking-wider text-neutral-500">{{ t('docs.step', { n: 7 }) }}</span>
        <h2 class="mt-1 font-display text-2xl font-semibold">{{ t('docs.errors') }}</h2>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">{{ t('docs.errorsBody') }}</p>

        <div class="mt-4 overflow-hidden rounded-lg border border-neutral-800">
          <div class="border-b border-neutral-800 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-500">
            application/problem+json
          </div>
          <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-neutral-300">{{
`{
  "type": "https://quartzforge.org/errors/bind-error",
  "title": "Invalid request parameters",
  "status": 400,
  "detail": "2 parameters failed validation",
  "instance": "/users/abc",
  "request_id": "01JD3K7XQ2M8N4P",
  "errors": [
    { "field": "id",   "in": "path",  "message": "expected Int64, got \\"abc\\"" }
  ]
}`}}</pre>
        </div>

        <ul class="mt-4 grid gap-2 sm:grid-cols-2">
          <li v-for="type in problemTypes" :key="type" class="font-mono text-xs text-neutral-400">
            quartzforge.org/errors/{{ type }}
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
