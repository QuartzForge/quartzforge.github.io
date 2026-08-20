<script setup lang="ts">
import { computed, ref } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{ tabs: { label: string; file: string; code: string }[] }>()

const active = ref(props.tabs[0]?.label ?? '')
const activeTab = computed(() => props.tabs.find((t) => t.label === active.value) ?? props.tabs[0])
</script>

<template>
  <div class="border border-border bg-card rounded-lg overflow-hidden">
    <Tabs v-model="active" class="gap-0">
      <div class="flex items-center justify-between gap-2 px-4 py-2 border-b border-border">
        <TabsList class="font-mono text-xs">
          <TabsTrigger v-for="tab in tabs" :key="tab.label" :value="tab.label" :data-tab="tab.label">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
        <span
          v-if="activeTab"
          class="font-mono text-xs text-muted-foreground truncate"
          data-panel-label
        >
          {{ activeTab.file }}
        </span>
      </div>
      <TabsContent v-for="tab in tabs" :key="tab.label" :value="tab.label">
        <CodeBlock :code="tab.code" :file="tab.file" />
      </TabsContent>
    </Tabs>
  </div>
</template>
