import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import EcosystemView from '../EcosystemView.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountEco() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(EcosystemView, {
    global: { plugins: [i18n], stubs: ['RouterLink', 'VersionBadge', 'StatusPill'], renderStubDefaultSlot: true },
  })
}

describe('EcosystemView', () => {
  it('renders chips, the live counter and the matrix', () => {
    const w = mountEco()
    expect(w.findAll('.chip').length).toBeGreaterThanOrEqual(6)
    expect(w.find('[data-filter-count]').exists()).toBe(true)
    expect(w.find('table').exists()).toBe(true)
  })

  it('filters the cards by scope and updates the counter', async () => {
    const w = mountEco()
    await w.find('[data-cat-filter="dados"]').trigger('click')
    const visible = w.findAll('.pkg:not([hidden])')
    expect(visible.length).toBeGreaterThan(0)
    expect(w.find('[data-filter-count]').text()).toContain(String(visible.length))
  })

  it('marks the active chip as pressed', async () => {
    const w = mountEco()
    await w.find('[data-cat-filter="dados"]').trigger('click')
    expect(w.find('[data-cat-filter="dados"]').attributes('aria-pressed')).toBe('true')
  })
})
