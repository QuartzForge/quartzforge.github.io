<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'

const { locale, t } = useI18n()
const open = ref(false)

const theme = ref<string>(localStorage.getItem('qf-theme') ?? 'dark')

watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value
    localStorage.setItem('qf-theme', value)
  },
  { immediate: true },
)

function setLocale(next: string) {
  locale.value = next
  localStorage.setItem('qf-locale', next)
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <RouterLink to="/" class="font-display text-lg font-semibold">
        Quartz<em class="text-amber-400 not-italic">Forge</em>
      </RouterLink>

      <nav class="hidden items-center gap-5 text-sm text-neutral-400 md:flex" aria-label="Principal">
        <RouterLink to="/">{{ t('nav.overview') }}</RouterLink>
        <RouterLink to="/ecosystem">{{ t('nav.ecosystem') }}</RouterLink>
        <RouterLink to="/docs">{{ t('nav.documentation') }}</RouterLink>
        <span class="mx-1 text-neutral-700">·</span>
        <RouterLink v-for="p in projects" :key="p.id" :to="`/${p.id}`">
          {{ p.name }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <select
          class="rounded border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs"
          :value="locale"
          @change="setLocale(($event.target as HTMLSelectElement).value)"
        >
          <option value="pt-BR">pt-BR</option>
          <option value="en">en</option>
        </select>

        <button
          class="rounded border border-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:text-neutral-100"
          :aria-label="t('theme.toggle')"
          @click="toggleTheme"
        >
          <svg
            v-if="theme !== 'light'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-4 w-4"
          ><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>

        <button
          class="rounded border border-neutral-800 px-2 py-1 text-xs md:hidden"
          @click="open = !open"
        >
          ☰
        </button>
      </div>
    </div>

    <nav v-if="open" class="border-t border-neutral-800 px-6 py-3 md:hidden" aria-label="Mobile">
      <RouterLink to="/" class="block py-1">{{ t('nav.overview') }}</RouterLink>
      <RouterLink to="/ecosystem" class="block py-1">{{ t('nav.ecosystem') }}</RouterLink>
      <RouterLink to="/docs" class="block py-1">{{ t('nav.documentation') }}</RouterLink>
      <RouterLink v-for="p in projects" :key="p.id" :to="`/${p.id}`" class="block py-1">
        {{ p.name }}
      </RouterLink>
    </nav>
  </header>
</template>
