<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { bundledLanguages, getSingletonHighlighter, type BundledLanguage } from 'shiki'

const props = defineProps<{
  code: string
  lang?: string
  file?: string
}>()

const { t } = useI18n()

const html = ref('')
const failed = ref(false)
let renderSeq = 0

// Shiki v4's codeToHtml is async and its highlighter does not auto-load
// grammars, so the highlighter is created once as a module-level singleton
// and languages are loaded on demand. Any failure (offline wasm, unknown
// language, ...) degrades to a plain <pre>.
async function render() {
  const seq = ++renderSeq
  const lang = props.lang ?? 'crystal'
  try {
    const highlighter = await getSingletonHighlighter({ themes: ['github-dark'] })
    const requested: BundledLanguage | 'text' =
      lang in bundledLanguages ? (lang as BundledLanguage) : 'text'
    if (!highlighter.getLoadedLanguages().includes(requested)) {
      await highlighter.loadLanguage(requested)
    }
    if (seq !== renderSeq) return
    html.value = highlighter.codeToHtml(props.code, { lang: requested, theme: 'github-dark' })
    failed.value = false
  } catch {
    if (seq !== renderSeq) return
    failed.value = true
  }
}

watch(() => [props.code, props.lang], render, { immediate: true })

function copy() {
  navigator.clipboard.writeText(props.code)
}
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
    <div v-if="file" class="flex items-center justify-between border-b border-neutral-800 px-4 py-2">
      <span class="font-mono text-xs text-neutral-500">{{ file }}</span>
      <button class="text-xs text-neutral-400 hover:text-neutral-100" @click="copy">{{ t('code.copy') }}</button>
    </div>
    <div v-if="!failed && html" class="overflow-x-auto text-sm" v-html="html" />
    <pre v-else class="p-4 text-sm">{{ code }}</pre>
  </div>
</template>
