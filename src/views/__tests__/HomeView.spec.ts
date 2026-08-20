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
  it('renders the hero with kicker, headline, mark, install block and example tabs', () => {
    const w = mountHome()
    expect(w.find('[data-hero-kicker]').text()).toContain('Crystal')
    const h1 = w.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('Uma stack inteira, numa linguagem compilada.')
    expect(h1.find('.text-primary').exists()).toBe(true)
    // the install block follows the docs pattern: file label + copy button
    const install = w.find('[data-install]')
    expect(install.exists()).toBe(true)
    expect(install.find('[data-code-header]').text()).toContain('shard.yml')
    expect(install.find('[data-copy]').exists()).toBe(true)
    expect(install.text()).toContain('dependencies:')
    // the example tabs (quartz + facet) render below the install block
    const triggers = w.findAll('[data-slot="tabs-trigger"]')
    expect(triggers.map((t) => t.text())).toEqual(['quartz', 'facet'])
    // the docs CTA renders after the install block: the shard.yml example
    // sits above the button (Button with as-child renders the link itself)
    const cta = w.findAllComponents({ name: 'RouterLink' }).find((l) => l.text().includes('Ler a documentação'))
    expect(cta).toBeDefined()
    expect(install.element.compareDocumentPosition(cta!.element) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  it('renders the three package cards and no ecosystem card', () => {
    const w = mountHome()
    expect(w.findAll('[data-pkg-card]')).toHaveLength(3)
    expect(w.text()).not.toContain('todos')
    expect(w.text()).not.toContain('Ecossistema')
  })

  it('no longer shows the obsidian compiler demo or the concept badge', () => {
    const w = mountHome()
    expect(w.find('[data-concept-badge]').exists()).toBe(false)
    expect(w.find('#compilador').exists()).toBe(false)
    expect(w.text()).not.toContain('conceito')
  })

  it('drops the hero note from the hero', () => {
    const w = mountHome()
    expect(w.text()).not.toContain('MIT ·')
  })

  it('renders no decorative facet or gradient', () => {
    const w = mountHome()
    expect(w.find('.facet').exists()).toBe(false)
    expect(w.findAll('[style*="gradient"]')).toHaveLength(0)
  })
})
