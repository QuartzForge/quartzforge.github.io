<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{ tabs: { label: string; file: string; code: string }[] }>()

const active = ref(0)
const activeTab = computed(() => props.tabs[active.value])
const buttons = ref<HTMLButtonElement[]>([])

function select(i: number) {
  active.value = (i + props.tabs.length) % props.tabs.length
}

// Template refs instead of a querySelector: the buttons are the source of
// truth for the roving focus, exactly like js/quartzforge.js tabs block.
function setButtonRef(i: number, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLButtonElement) buttons.value[i] = el
}

function onKeydown(i: number, event: KeyboardEvent) {
  const next =
    event.key === 'ArrowRight'
      ? (i + 1) % props.tabs.length
      : event.key === 'ArrowLeft'
        ? (i - 1 + props.tabs.length) % props.tabs.length
        : null
  if (next === null) return
  event.preventDefault()
  select(next)
  buttons.value[next]?.focus()
}
</script>

<template>
  <div class="panel">
    <div class="panel-head">
      <div class="panel-tabs" role="tablist" :aria-label="'Exemplos'">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.label"
          :ref="(el) => setButtonRef(i, el)"
          :data-tab="tab.label"
          role="tab"
          class="panel-tab"
          :class="{ 'panel-tab-active': i === active }"
          :aria-selected="i === active ? 'true' : 'false'"
          @click="active = i"
          @keydown="onKeydown(i, $event)"
        >
          {{ tab.label }}
        </button>
      </div>
      <span class="panel-file" data-panel-label>{{ activeTab.file }}</span>
    </div>
    <CodeBlock :code="activeTab.code" :file="activeTab.file" />
  </div>
</template>
