<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCopy } from '../composables/useCopy'

const { t } = useI18n()

const props = defineProps<{
  tabs?: { id: string; label: string; code: string }[]
  code?: string
  file?: string
}>()

const active = ref(0)
const { copied, copy } = useCopy()
const list = computed(() =>
  props.tabs ?? (props.code ? [{ id: 'x', label: props.file ?? 'shard.yml', code: props.code }] : []),
)
const activeCode = computed(() => list.value[active.value]?.code ?? '')
// Line by line so every prompt gets its own amber prefix; a single <pre>
// with one .pfx would collapse a multi-line command into one line.
const lines = computed(() => activeCode.value.split('\n'))
</script>

<template>
  <div class="cmd">
    <div v-if="list.length > 1" class="cmd-tabs" role="tablist" aria-label="Formas de instalar">
      <button
        v-for="(tab, i) in list"
        :key="tab.id"
        role="tab"
        :aria-selected="i === active ? 'true' : 'false'"
        @click="active = i"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="cmd-body">
      <pre><template v-for="(line, i) in lines" :key="i"><span v-if="line.startsWith('$')" class="pfx">$</span>{{ line.startsWith('$') ? line.slice(1) : line }}{{ i < lines.length - 1 ? '\n' : '' }}</template></pre>
      <button class="copy" data-copy :data-copied="copied || undefined" @click="copy(activeCode)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
        <span>{{ copied ? t('code.copied') : t('code.copy') }}</span>
      </button>
    </div>
  </div>
</template>
