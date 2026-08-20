<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Copy } from '@lucide/vue'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { useCopy } from '../composables/useCopy'

const { t } = useI18n()

const props = defineProps<{
  tabs?: { id: string; label: string; code: string }[]
  code?: string
  file?: string
}>()

const { copied, copy } = useCopy()
const list = computed(() =>
  props.tabs ?? (props.code ? [{ id: 'x', label: props.file ?? 'shard.yml', code: props.code }] : []),
)
const active = ref(list.value[0]?.id ?? '')
const activeCode = computed(
  () => list.value.find((tab) => tab.id === active.value)?.code ?? list.value[0]?.code ?? '',
)
// Line by line so every prompt gets its own muted prefix; a single <pre>
// with one prefix span would collapse a multi-line command into one line.
const lines = computed(() => activeCode.value.split('\n'))
</script>

<template>
  <div class="border border-border bg-card rounded-lg overflow-hidden">
    <div v-if="list.length > 1" class="px-5 py-3 border-b border-border">
      <Tabs v-model="active">
        <TabsList class="font-mono text-xs">
          <TabsTrigger v-for="tab in list" :key="tab.id" :value="tab.id">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <div class="flex items-start gap-3 p-6">
      <pre
        class="font-mono text-sm text-foreground/90 overflow-x-auto flex-1 min-w-0"
      ><template v-for="(line, i) in lines" :key="i"><span v-if="line.startsWith('$')" class="pfx text-muted-foreground">$</span>{{ line.startsWith('$') ? line.slice(1) : line }}{{ i < lines.length - 1 ? '\n' : '' }}</template></pre>
      <Button
        variant="ghost"
        size="sm"
        class="shrink-0"
        data-copy
        :data-copied="copied || undefined"
        :aria-label="copied ? t('code.copied') : t('code.copy')"
        @click="copy(activeCode)"
      >
        <Check v-if="copied" aria-hidden="true" />
        <Copy v-else aria-hidden="true" />
        <span>{{ copied ? t('code.copied') : t('code.copy') }}</span>
      </Button>
    </div>
  </div>
</template>
