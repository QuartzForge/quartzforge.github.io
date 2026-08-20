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
    expect(w.find('.docs-side').exists()).toBe(true)
    expect(w.findAll('.docs-nav .grp').length).toBeGreaterThanOrEqual(3)
    expect(w.find('.crumb').exists()).toBe(true)
    expect(w.find('.pager').exists()).toBe(true)
  })

  it('filters the sidebar nav by keywords and shows the empty state', async () => {
    const w = mountDocs()
    const input = w.find('#docs-search')
    await input.setValue('rota')
    const visible = w.findAll('.docs-nav a:not([hidden])')
    expect(visible.length).toBeGreaterThan(0)
    expect(visible.every((a) => a.isVisible())).toBe(true)
    await input.setValue('zzzz-nada')
    expect(w.find('.docs-nav .empty').isVisible()).toBe(true)
  })

  it('toggles the sidebar with the mobile button', async () => {
    const w = mountDocs()
    await w.find('[data-docs-toggle]').trigger('click')
    expect(w.find('.docs-side').attributes('data-open')).toBe('true')
  })

  it('renders the RFC 9457 section with the nine error types', () => {
    const w = mountDocs()
    expect(w.findAll('#erros code').length).toBeGreaterThanOrEqual(9)
  })
})
