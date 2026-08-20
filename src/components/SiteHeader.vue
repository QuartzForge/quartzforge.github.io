<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Languages, Menu, Moon, Sun } from '@lucide/vue'
import { projects } from '../data/projects'
import BrandMark from './BrandMark.vue'
import { Button } from './ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'

const { locale, t } = useI18n()
const route = useRoute()
const open = ref(false)
const stuck = ref(false)

const topLinks = [
  { to: '/', key: 'nav.overview' },
  { to: '/ecosystem', key: 'nav.ecosystem' },
  { to: '/docs', key: 'nav.documentation' },
]

// The no-flash script in index.html put .dark on <html> before Vue mounted;
// the toggle flips that class (Ruling T: dark by default, light removes it)
// and persists the choice under qf-theme.
const dark = ref(document.documentElement.classList.contains('dark'))

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('qf-theme', dark.value ? 'dark' : 'light')
}

function toggleLang() {
  locale.value = locale.value === 'en' ? 'pt-BR' : 'en'
  localStorage.setItem('qf-locale', locale.value)
}

watch(() => route.path, () => {
  open.value = false
})

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
  <header
    class="sticky top-0 z-40 border-b border-transparent bg-background/90 backdrop-blur transition-[border-color]"
    :class="stuck && 'border-border'"
  >
    <div class="wrap flex h-16 items-center justify-between gap-4">
      <RouterLink to="/" class="flex shrink-0 items-center gap-2.5 text-[17px] font-semibold tracking-tight">
        <BrandMark />
        Quartz<em class="not-italic font-medium text-muted-foreground">Forge</em>
      </RouterLink>

      <nav class="nav-links hidden items-center gap-7 md:flex" :aria-label="t('header.navLabel')">
        <RouterLink
          v-for="link in topLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm transition-colors hover:text-foreground"
          :class="route.path === link.to ? 'text-foreground' : 'text-muted-foreground'"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          {{ t(link.key) }}
        </RouterLink>
      </nav>

      <div class="nav-end flex items-center gap-1">
        <Button variant="ghost" size="icon" data-theme-toggle :aria-label="t('theme.toggle')" @click="toggleTheme">
          <Sun v-if="dark" class="size-4" aria-hidden="true" />
          <Moon v-else class="size-4" aria-hidden="true" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          as="a"
          href="https://github.com/QuartzForge"
          target="_blank"
          rel="noopener"
          :aria-label="t('header.github')"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="size-4" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
        </Button>

        <Button
          variant="ghost"
          data-lang-toggle
          :aria-label="t('theme.lang')"
          class="gap-1.5 px-2.5"
          @click="toggleLang"
        >
          <Languages class="size-4" aria-hidden="true" />
          <span class="mono text-xs">{{ locale === 'en' ? 'pt' : 'en' }}</span>
        </Button>

        <Button as-child variant="default" size="sm" data-nav-cta class="hidden md:inline-flex">
          <RouterLink to="/docs">{{ t('header.guide') }}</RouterLink>
        </Button>

        <Sheet :open="open" @update:open="(v: boolean) => (open = v)">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" data-burger :aria-label="t('header.burger')" class="md:hidden">
              <Menu class="size-4" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72 sm:max-w-72" :close-label="t('sheet.close')">
            <SheetTitle class="sr-only">QuartzForge</SheetTitle>
            <SheetDescription class="sr-only">{{ t('drawer.projects') }}</SheetDescription>
            <div class="flex items-center gap-2.5 px-2 pt-2">
              <BrandMark />
              <span class="text-[17px] font-semibold tracking-tight">Quartz<em class="not-italic font-medium text-muted-foreground">Forge</em></span>
            </div>
            <nav class="flex flex-col gap-1 px-2" :aria-label="t('header.navLabel')">
              <SheetClose v-for="link in topLinks" :key="link.to" as-child>
                <RouterLink
                  :to="link.to"
                  class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {{ t(link.key) }}
                </RouterLink>
              </SheetClose>
              <p class="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground">{{ t('drawer.projects') }}</p>
              <SheetClose v-for="p in projects" :key="p.id" as-child>
                <RouterLink
                  :to="`/${p.id}`"
                  class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {{ t(`nav.${p.id}`) }}
                </RouterLink>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
