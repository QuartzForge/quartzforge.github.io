<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

defineProps<{
  tabs: { label: string; file: string; code: string }[]
}>()

const active = ref(0)
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-neutral-800">
    <div class="flex flex-wrap border-b border-neutral-800 bg-neutral-900">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        class="px-3 py-2 text-xs"
        :class="index === active
          ? 'border-b-2 border-amber-400 text-neutral-100'
          : 'text-neutral-500 hover:text-neutral-300'"
        @click="active = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <CodeBlock :code="tabs[active].code" :file="tabs[active].file" />
  </div>
</template>
