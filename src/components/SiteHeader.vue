<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects'
import BrandMark from './BrandMark.vue'

const { locale, t } = useI18n()
const route = useRoute()
const open = ref(false)
const stuck = ref(false)

const theme = ref<string>(localStorage.getItem('qf-theme') ?? 'dark')

watch(theme, (value) => {
  if (value === 'light') document.documentElement.setAttribute('data-theme', 'light')
  else document.documentElement.removeAttribute('data-theme')
  localStorage.setItem('qf-theme', value)
}, { immediate: true })

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

watch(() => route.path, () => {
  open.value = false
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
function toggleLang() {
  locale.value = locale.value === 'en' ? 'pt-BR' : 'en'
  localStorage.setItem('qf-locale', locale.value)
}
function toggleDrawer() {
  open.value = !open.value
}

function onScroll() {
  stuck.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :data-stuck="stuck ? 'true' : 'false'">
    <div class="wrap nav-inner">
      <RouterLink to="/" class="brand">
        <BrandMark />
        Quartz<em>Forge</em>
      </RouterLink>

      <nav class="nav-links" aria-label="Principal">
        <RouterLink to="/" :aria-current="route.path === '/' ? 'page' : undefined">{{ t('nav.overview') }}</RouterLink>
        <RouterLink to="/ecosystem" :aria-current="route.path === '/ecosystem' ? 'page' : undefined">{{ t('nav.ecosystem') }}</RouterLink>
        <RouterLink to="/docs" :aria-current="route.path === '/docs' ? 'page' : undefined">{{ t('nav.documentation') }}</RouterLink>
      </nav>

      <div class="nav-end">
        <button class="icon-btn" data-theme-toggle :aria-label="t('theme.toggle')" @click="toggleTheme">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
        <a class="icon-btn" href="https://github.com/QuartzForge" target="_blank" rel="noopener" :aria-label="t('header.github')">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.750c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
        </a>
        <button class="icon-btn lang-btn" data-lang-toggle :aria-label="t('theme.lang')" @click="toggleLang">
          <span class="mono">{{ locale === 'en' ? 'pt' : 'en' }}</span>
        </button>
        <RouterLink to="/docs" class="btn btn-primary btn-sm nav-cta">{{ t('header.guide') }}</RouterLink>
        <button class="icon-btn nav-burger" data-burger :aria-expanded="open ? 'true' : 'false'" aria-controls="drawer" aria-label="Abrir menu" @click="toggleDrawer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <div class="drawer" id="drawer" :data-open="open ? 'true' : 'false'">
    <RouterLink to="/" @click="toggleDrawer">{{ t('nav.overview') }}</RouterLink>
    <RouterLink to="/ecosystem" @click="toggleDrawer">{{ t('nav.ecosystem') }}</RouterLink>
    <RouterLink to="/docs" @click="toggleDrawer">{{ t('nav.documentation') }}</RouterLink>
    <p class="drawer-label">{{ t('drawer.projects') }}</p>
    <RouterLink v-for="p in projects" :key="p.id" :to="`/${p.id}`" @click="toggleDrawer">
      {{ p.name }} — {{ p.role }}
    </RouterLink>
  </div>
</template>
