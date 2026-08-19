<script setup lang="ts">
import { computed } from 'vue'
import versions from '../data/versions.json'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{ projectId: string }>()

const info = computed(() => {
  const v = versions[props.projectId as keyof typeof versions]
  return v && 'released' in v && v.released ? v : null
})

const shardYml = computed(() => {
  if (!info.value) return ''
  return `dependencies:\n  ${props.projectId}:\n    github: QuartzForge/${props.projectId}\n    version: ~> ${info.value.version}`
})
</script>

<template>
  <CodeBlock v-if="info" :code="shardYml" file="shard.yml" />
</template>
