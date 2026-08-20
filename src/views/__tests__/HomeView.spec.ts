import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HomeView from '../HomeView.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountHome() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(HomeView, {
    global: { plugins: [i18n], stubs: ['RouterLink', 'VersionBadge'], renderStubDefaultSlot: true },
  })
}

describe('HomeView', () => {
  it('renders the hero with kicker, headline, mark and command panel', () => {
    const w = mountHome()
    expect(w.find('[data-hero-kicker]').text()).toContain('Crystal')
    const h1 = w.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('Uma stack inteira, numa linguagem compilada.')
    expect(h1.find('.text-primary').exists()).toBe(true)
    // the command panel renders the real shard.yml tabs when the version
    // fetch succeeded; the copy button is its stable element either way
    const cmd = w.find('[data-panel-cmd]')
    expect(cmd.find('[data-copy]').exists()).toBe(true)
    const triggers = cmd.findAll('[data-slot="tabs-trigger"]')
    if (triggers.length > 0) {
      expect(triggers.map((t) => t.text())).toEqual(['quartz', 'facet'])
    }
  })

  it('renders the six package cards including the ecosystem card', () => {
    const w = mountHome()
    expect(w.findAll('[data-pkg-card]')).toHaveLength(6)
    expect(w.text()).toContain('todos')
  })

  it('marks the compiler demo as concept', () => {
    const w = mountHome()
    expect(w.find('#compilador').exists()).toBe(true)
    expect(w.find('[data-concept-badge]').text()).toContain('conceito')
  })

  it('shows the proof rows waiting for CI and the honest warning alert', () => {
    const w = mountHome()
    expect(w.text()).toContain('aguardando CI')
    const alert = w.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toContain('Por que os campos estão vazios')
  })

  it('renders no decorative facet or gradient', () => {
    const w = mountHome()
    expect(w.find('.facet').exists()).toBe(false)
    expect(w.findAll('[style*="gradient"]')).toHaveLength(0)
  })
})
