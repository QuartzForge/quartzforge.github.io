<script setup lang="ts">
import { ref, watch } from 'vue'
import { bundledLanguages, getSingletonHighlighter, type BundledLanguage } from 'shiki'
import { crystalTheme } from '../theme/crystal'
import { useCopy } from '../composables/useCopy'

const props = defineProps<{ code: string; lang?: string; file?: string }>()

const html = ref('')
const failed = ref(false)
const { copied, copy } = useCopy()
let renderSeq = 0

// Shiki v4's codeToHtml is async and its highlighter does not auto-load
// grammars, so the highlighter is created once as a module-level singleton
// and languages are loaded on demand. Any failure (offline wasm, unknown
// language, ...) degrades to a plain <pre>.
async function render() {
  const seq = ++renderSeq
  const lang = props.lang ?? 'crystal'
  try {
    const highlighter = await getSingletonHighlighter({ themes: [crystalTheme] })
    const requested: BundledLanguage | 'text' =
      lang in bundledLanguages ? (lang as BundledLanguage) : 'text'
    if (!highlighter.getLoadedLanguages().includes(requested)) {
      await highlighter.loadLanguage(requested)
    }
    if (seq !== renderSeq) return
    html.value = highlighter.codeToHtml(props.code, { lang: requested, theme: 'quartzforge' })
    failed.value = false
  } catch {
    if (seq !== renderSeq) return
    failed.value = true
  }
}

watch(() => [props.code, props.lang], render, { immediate: true })
</script>

<template>
  <div class="panel">
    <div class="panel-head">
      <span v-if="file" class="panel-file">{{ file }}</span>
      <!-- Without a .panel-file span nothing pushes the copy button right,
           so the button takes the margin itself. -->
      <button
        class="copy"
        data-copy
        :data-copied="copied || undefined"
        :aria-label="copied ? 'copiado' : 'copiar'"
        :style="{ marginInlineStart: file ? undefined : 'auto' }"
        @click="copy(code)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
        <span>{{ copied ? 'copiado' : 'copiar' }}</span>
      </button>
    </div>
    <div v-if="!failed && html" class="overflow-x-auto" v-html="html" />
    <pre v-else class="code">{{ code }}</pre>
  </div>
</template>
