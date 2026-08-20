import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import DocsView from '../DocsView.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountDocs() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(DocsView, {
    global: {
      plugins: [i18n],
      stubs: ['RouterLink', 'CodeBlock'],
      renderStubDefaultSlot: true,
    },
  })
}

describe('DocsView', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    })
  })

  it('renders the docs shell: sidebar groups, crumb, main and pager', () => {
    const w = mountDocs()
    expect(w.find('[data-docs-side]').exists()).toBe(true)
    expect(w.findAll('[data-docs-nav] [data-nav-group]').length).toBe(2)
    expect(w.find('[data-docs-nav]').attributes('aria-label')).toBe(ptBR.docs.navLabel)
    expect(w.find('[data-crumb]').exists()).toBe(true)
    expect(w.find('[data-pager]').exists()).toBe(true)
  })

  it('filters the sidebar nav by keywords and shows the exact empty state', async () => {
    const w = mountDocs()
    const input = w.find('#docs-search')
    await input.setValue('rota')
    const visible = w.findAll('[data-docs-nav] a:not([hidden])')
    expect(visible.length).toBeGreaterThan(0)
    expect(visible.every((a) => a.isVisible())).toBe(true)
    await input.setValue('  zzzz-nada  ')
    const empty = w.find('[data-search-empty]')
    expect(empty.exists()).toBe(true)
    expect(empty.text()).toBe('Nenhuma página para “zzzz-nada”.')
  })

  it('toggles the sidebar with the mobile button', async () => {
    const w = mountDocs()
    const toggle = w.find('[data-docs-toggle]')
    await toggle.trigger('click')
    expect(w.find('[data-docs-side]').attributes('data-open')).toBe('true')
    await toggle.trigger('click')
    expect(w.find('[data-docs-side]').attributes('data-open')).toBe('false')
  })

  it('renders the RFC 9457 section with the nine error types', () => {
    const w = mountDocs()
    expect(w.findAll('#erros code').length).toBeGreaterThanOrEqual(9)
  })

  it('keeps the sidebar to guide groups only, without project links', () => {
    const w = mountDocs()
    const sidebar = w.find('[data-docs-nav]')
    expect(sidebar.text()).not.toContain('quartz')
    expect(sidebar.text()).not.toContain('facet')
    expect(sidebar.text()).not.toContain('vault')
    expect(sidebar.text()).not.toContain('Ecossistema')
  })
})
