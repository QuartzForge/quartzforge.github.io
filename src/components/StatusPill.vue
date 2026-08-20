<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Badge } from './ui/badge'

defineProps<{ status: 'released' | 'design' }>()
const { t } = useI18n()
</script>

<template>
  <Badge :variant="status === 'released' ? 'outline' : 'secondary'">
    <span
      class="size-1.5 rounded-full"
      :class="status === 'released' ? 'bg-primary' : 'bg-muted-foreground/50'"
      aria-hidden="true"
    ></span>
    {{ status === 'released' ? t('status.stable') : t('status.development') }}
  </Badge>
</template>
