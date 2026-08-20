<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
