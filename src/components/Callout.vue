<!-- eslint-disable vue/multi-word-component-names -- design-system atom name, mandated by the realign spec -->
<script setup lang="ts">
defineProps<{ variant?: 'warn' | 'ok' }>()
</script>

<template>
  <div class="callout" :class="variant === 'ok' ? 'callout-ok' : 'callout-warn'">
    <slot />
  </div>
</template>
