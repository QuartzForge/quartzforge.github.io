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

function visibleCards(w: ReturnType<typeof mountEco>) {
  return w.findAll('[data-cat]').filter((card) => card.attributes('hidden') === undefined)
}

describe('EcosystemView', () => {
  it('renders the shadcn filter chips, the live counter and the matrix', () => {
    const w = mountEco()

    const chips = w.findAll('[data-cat-filter]')
    expect(chips).toHaveLength(4)
    expect(chips.map((c) => c.text())).not.toContain('dados')
    expect(chips.map((c) => c.text())).not.toContain('filas')
    expect(chips.map((c) => c.attributes('aria-pressed')).every((p) => p === 'false' || p === 'true')).toBe(true)

    const counter = w.find('[data-filter-count]')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toContain('3')

    const table = w.find('[data-slot="table"]')
    expect(table.exists()).toBe(true)
    expect(table.find('[data-slot="table-caption"]').exists()).toBe(true)
  })

  it('filters the cards by scope and updates the counter', async () => {
    const w = mountEco()
    await w.find('[data-cat-filter="web"]').trigger('click')

    const visible = visibleCards(w)
    expect(visible).toHaveLength(1)
    expect(visible[0].attributes('data-cat')).toBe('web')

    const counter = w.find('[data-filter-count]')
    expect(counter.text()).toContain('1')
    expect(counter.text()).not.toContain('3')
  })

  it('marks exactly the active chip as pressed', async () => {
    const w = mountEco()
    await w.find('[data-cat-filter="validacao"]').trigger('click')

    const chips = w.findAll('[data-cat-filter]')
    expect(chips.filter((c) => c.attributes('aria-pressed') === 'true')).toHaveLength(1)
    expect(w.find('[data-cat-filter="validacao"]').attributes('aria-pressed')).toBe('true')

    await w.find('[data-cat-filter="oauth"]').trigger('click')
    expect(w.find('[data-cat-filter="validacao"]').attributes('aria-pressed')).toBe('false')
    expect(w.find('[data-cat-filter="oauth"]').attributes('aria-pressed')).toBe('true')
  })

  it('shows the compatibility matrix with real data', () => {
    const w = mountEco()
    const headers = w.findAll('[data-slot="table-head"]')
    expect(headers.map((h) => h.text())).toEqual([
      ptBR.ecosystem.columnProject,
      ptBR.ecosystem.columnStatus,
      ptBR.ecosystem.columnCrystal,
      ptBR.ecosystem.columnLicense,
      ptBR.ecosystem.columnDeps,
    ])

    const rows = w.findAll('[data-slot="table-body"] [data-slot="table-row"]')
    expect(rows).toHaveLength(3)
    const first = rows[0].findAll('[data-slot="table-cell"]')
    expect(first[0].text()).toBe('quartz')
    expect(first[0].attributes('class')).toContain('font-mono')
    expect(first[2].text()).toBe('~> 1.21')
    expect(first[3].text()).toBe('MIT')
  })
})
