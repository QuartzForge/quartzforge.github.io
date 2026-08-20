<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Copy } from '@lucide/vue'
import { Button } from './ui/button'
import { useCopy } from '../composables/useCopy'
import { useHighlight } from '../composables/useHighlight'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{ code: string; lang?: string; file?: string; framed?: boolean }>(),
  { framed: true },
)

// Highlighting is delegated to the shared useHighlight composable, so code
// blocks follow the site theme (one-dark-pro in dark mode, one-light in
// light mode) and re-render when the header toggle flips. The .shiki inline
// style carries its background, keeping the wrapping card on the site
// tokens.
const lang = computed(() => props.lang ?? 'crystal')
const { html, failed } = useHighlight(toRef(props, 'code'), lang)
const { copied, copy } = useCopy()
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
