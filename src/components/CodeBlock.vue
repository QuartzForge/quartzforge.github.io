<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { bundledLanguages, getSingletonHighlighter, type BundledLanguage } from 'shiki'
import { Check, Copy } from '@lucide/vue'
import { Button } from './ui/button'
import { useCopy } from '../composables/useCopy'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{ code: string; lang?: string; file?: string; framed?: boolean }>(),
  { framed: true },
)

const html = ref('')
const failed = ref(false)
const { copied, copy } = useCopy()
let renderSeq = 0

// Shiki v4's codeToHtml is async and its highlighter does not auto-load
// grammars, so the highlighter is created once as a module-level singleton
// and languages are loaded on demand. Any failure (offline wasm, unknown
// language, ...) degrades to a plain <pre>. The theme is the neutral
// one-dark-pro (ruling S): code blocks keep their own dark palette and do
// not follow the site theme — the .shiki inline style carries its
// background, so the wrapping card stays on the site tokens.
async function render() {
  const seq = ++renderSeq
  const lang = props.lang ?? 'crystal'
  try {
    const highlighter = await getSingletonHighlighter({ themes: ['one-dark-pro'] })
    const requested: BundledLanguage | 'text' =
      lang in bundledLanguages ? (lang as BundledLanguage) : 'text'
    if (!highlighter.getLoadedLanguages().includes(requested)) {
      await highlighter.loadLanguage(requested)
    }
    if (seq !== renderSeq) return
    html.value = highlighter.codeToHtml(props.code, { lang: requested, theme: 'one-dark-pro' })
    failed.value = false
  } catch {
    if (seq !== renderSeq) return
    failed.value = true
  }
}

watch(() => [props.code, props.lang], render, { immediate: true })
</script>

<template>
  <template v-if="framed">
    <div class="border border-border bg-card rounded-lg overflow-hidden">
      <div class="flex items-center gap-2 px-5 py-3 border-b border-border" data-code-header>
        <span v-if="file" class="font-mono text-xs text-muted-foreground truncate">{{ file }}</span>
        <Button
          variant="ghost"
          size="sm"
          class="ms-auto"
          data-copy
          :data-copied="copied || undefined"
          :aria-label="copied ? t('code.copied') : t('code.copy')"
          @click="copy(code)"
        >
          <Check v-if="copied" aria-hidden="true" />
          <Copy v-else aria-hidden="true" />
          <span>{{ copied ? t('code.copied') : t('code.copy') }}</span>
        </Button>
      </div>
      <div v-if="!failed && html" data-code-body class="p-6 overflow-x-auto" v-html="html" />
      <pre v-else data-code-body class="p-6 overflow-x-auto bg-transparent font-mono text-sm text-foreground/90">{{ code }}</pre>
    </div>
  </template>
  <!-- Unframed: the caller owns the frame, the file label and the copy
       action (CodeTabs, shadcn Cards) — this renders the bare code body. -->
  <div v-else data-code-body class="overflow-x-auto p-6">
    <div v-if="!failed && html" v-html="html" />
    <pre v-else class="bg-transparent font-mono text-sm text-foreground/90">{{ code }}</pre>
  </div>
</template>
