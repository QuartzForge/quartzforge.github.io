<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ status: 'released' | 'design' }>()
const { t } = useI18n()
</script>

<template>
  <span class="pill" :class="status === 'released' ? 'pill-ok' : ''">
    <span class="dot"></span>
    {{ status === 'released' ? t('status.stable') : t('status.development') }}
  </span>
</template>
