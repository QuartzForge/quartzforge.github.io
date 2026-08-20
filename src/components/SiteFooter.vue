<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '../data/projects'
import BrandMark from './BrandMark.vue'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-col">
          <RouterLink to="/" class="brand" style="margin-bottom:14px">
            <BrandMark />
            Quartz<em>Forge</em>
          </RouterLink>
          <p class="muted" style="font-size:13.5px; max-width:30ch">{{ t('footer.tagline') }}</p>
        </div>
        <div class="footer-col">
          <h4>{{ t('footer.projects') }}</h4>
          <RouterLink v-for="p in projects" :key="p.id" :to="`/${p.id}`">{{ p.name }}</RouterLink>
        </div>
        <div class="footer-col">
          <h4>{{ t('footer.documentation') }}</h4>
          <RouterLink to="/docs">{{ t('footer.docs.quickStart') }}</RouterLink>
          <a href="#instalacao">{{ t('footer.docs.installation') }}</a>
          <a href="#controller">{{ t('footer.docs.controller') }}</a>
          <a href="#erros">{{ t('footer.docs.errors') }}</a>
        </div>
        <div class="footer-col">
          <h4>{{ t('footer.community') }}</h4>
          <a href="https://github.com/QuartzForge" target="_blank" rel="noopener">{{ t('footer.github') }}</a>
          <a href="https://github.com/orgs/QuartzForge/discussions" target="_blank" rel="noopener">{{ t('footer.discussions') }}</a>
          <a href="https://github.com/QuartzForge/quartz/blob/develop/CONTRIBUTING.md" target="_blank" rel="noopener">{{ t('footer.contributing') }}</a>
          <RouterLink to="/ecosystem">{{ t('footer.versionPolicy') }}</RouterLink>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>{{ new Date().getFullYear() }}</span> QuartzForge</span>
        <span>MIT</span>
        <span class="sp">{{ t('footer.madeIn') }}</span>
      </div>
    </div>
  </footer>
</template>
