import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProjectView from '../ProjectView.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountProject(projectId: string) {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(ProjectView, {
    props: { projectId },
    global: {
      plugins: [i18n],
      stubs: ['RouterLink', 'CodeTabs', 'CmdPanel', 'VersionBadge', 'StatusPill', 'RoadmapSection'],
      renderStubDefaultSlot: true,
    },
  })
}

describe('ProjectView', () => {
  it('renders the hero with the hex package identity', () => {
    const w = mountProject('quartz')
    expect(w.find('.pkg-glyph').exists()).toBe(true)
    expect(w.find('h1').exists()).toBe(true)
    expect(w.find('.hero-note').exists()).toBe(true)
  })

  it('renders the when-not-to-use section as an alert', () => {
    const w = mountProject('quartz')
    expect(w.find('[role="alert"]').exists()).toBe(true)
  })

  it('shows an honest in-development panel for design projects', () => {
    const w = mountProject('obsidian')
    expect(w.text()).toContain('em desenvolvimento')
    expect(w.find('.panel').exists()).toBe(true)
  })

  it('renders the pager', () => {
    const w = mountProject('facet')
    expect(w.find('.pager').exists()).toBe(true)
  })

  it('keeps the 404 branch for an unknown project', () => {
    const w = mountProject('unknown')
    expect(w.text()).toContain('404')
  })
})
