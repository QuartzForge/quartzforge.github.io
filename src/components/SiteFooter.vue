<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import BrandMark from './BrandMark.vue'
import { Separator } from './ui/separator'

const { t } = useI18n()

// The quick-start entry is a router link; the remaining docs links are
// anchors into the guide page (section ids exist in DocsView).
const docAnchors = [
  { anchor: '#instalacao', key: 'footer.docs.installation' },
  { anchor: '#controller', key: 'footer.docs.controller' },
  { anchor: '#erros', key: 'footer.docs.errors' },
]

const communityLinks = [
  { href: 'https://github.com/QuartzForge', key: 'footer.github' },
  { href: 'https://github.com/orgs/QuartzForge/discussions', key: 'footer.discussions' },
  { href: 'https://github.com/QuartzForge/quartz/blob/develop/CONTRIBUTING.md', key: 'footer.contributing' },
]
</script>

<template>
  <footer class="border-t border-border">
    <div class="wrap py-12">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="footer-col">
          <RouterLink to="/" class="inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
            <BrandMark />
            Quartz<em class="not-italic font-medium text-muted-foreground">Forge</em>
          </RouterLink>
          <p class="mt-3 max-w-[28ch] text-sm text-muted-foreground">{{ t('footer.tagline') }}</p>
        </div>

        <div class="footer-col">
          <h4 class="mb-3 text-sm font-semibold">{{ t('footer.projects') }}</h4>
          <ul class="space-y-2">
            <li v-for="p in projects" :key="p.id">
              <RouterLink
                :to="`/${p.id}`"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ p.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="mb-3 text-sm font-semibold">{{ t('footer.documentation') }}</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/docs"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ t('footer.docs.quickStart') }}
              </RouterLink>
            </li>
            <li v-for="d in docAnchors" :key="d.anchor">
              <a :href="d.anchor" class="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {{ t(d.key) }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="mb-3 text-sm font-semibold">{{ t('footer.community') }}</h4>
          <ul class="space-y-2">
            <li v-for="c in communityLinks" :key="c.href">
              <a
                :href="c.href"
                target="_blank"
                rel="noopener"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {{ t(c.key) }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator class="my-8" />

      <div class="footer-bottom flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span class="mono">© <span data-year>{{ new Date().getFullYear() }}</span> QuartzForge · MIT</span>
        <span class="mono">{{ t('footer.madeIn') }}</span>
      </div>
    </div>
  </footer>
</template>
